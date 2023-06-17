import axios from 'axios';
import {
    axiosOptions
} from 'shared/modules/axios_helper';

class BoostedShotsInFeed {
    async initialize({
        collection,
        perPage,
        placement,
        params,
        numberOfAdsOnFirstPage,
        numberOfAdsOnSubsequentPages,
        adGroupPositions,
    }) {
        [
            this.collection,
            this.perPage,
            this.placement,
            this.numberOfAdsOnFirstPage,
            this.numberOfAdsOnSubsequentPages,
            this.adGroupPositions,
        ] = [collection, perPage, placement, numberOfAdsOnFirstPage, numberOfAdsOnSubsequentPages, adGroupPositions];
        this.setCurrentPageElements();
        this.cachedItems = [];
        this.params = params || {};
        this.servedShotIds = [];
        this.currentPage = 1;
        this.hasMoreThanOnePageOfShots = this.collection.length >= this.perPage;
        this.onScrollFunction = this.onScroll.bind(this);
        this.boostsOnPage = {};

        this.collection.filter((element) => element instanceof Element || element instanceof HTMLDocument);

        // We only want to run this script if there are screenshot items.
        // The length needs to be bigger than/equal to 1 instead of 0 because the first
        // element in this.collection is a <script> tag
        if (this.collection.length <= 1) return;

        await this.injectCurrentPage();
        this.bindEventListeners();
    }

    bindEventListeners() {
        const injectNewPage = () => {
            const collection = Dribbble.Thumbnails.thumbnailsArray();
            if (collection.length <= 1) return;
            this.setAndInjectNewPage(collection);
        };

        const injectNewPageAndResetTrackingData = () => {
            this.boostsOnPage = {};
            injectNewPage();
        };

        document.addEventListener('dribbble.infinitescroll.append', injectNewPage);
        document.addEventListener('dribbble.filterShotResults', injectNewPageAndResetTrackingData);

        Dribbble.EventBus.$on('shotFilters:updatedLocation', ({
            category,
            tag
        }) => {
            this.params.category = category;
            this.params.tag = tag;
        });
    }

    setCurrentPageElements() {
        this.currentPageElements = this.collection.length == this.perPage ? this.collection : this.collection.slice(-this.perPage);
    }

    setAndInjectNewPage(collection) {
        this.currentPage++;

        this.collection = collection;
        this.setCurrentPageElements();
        this.addCachedItem();
        this.injectCurrentPage();
    }

    async injectCurrentPage() {
        const boosts = await this.fetchBoosts();

        // We only need to cache items if there is more than 1 page of shots, otherwise we will show them all.
        if (this.hasMoreThanOnePageOfShots) {
            this.cacheExtraItems();
        }

        boosts.forEach((boost) => {
            // if no boost available, do nothing
            if (!boost.boostPartial) return this.collection;

            let siblingElement;

            if (this.hasMoreThanOnePageOfShots) {
                // If there is a full page of shots, we want to insert the boost somewhere in the second quarter
                siblingElement = this.currentPageElements[boost.boostIndex - 1];
            } else {
                // Otherwise we'll just show it at the end of the shots.
                siblingElement = this.collection[boost.boostIndex];
            }

            if (siblingElement) {
                siblingElement.insertAdjacentHTML('afterend', boost.boostPartial);

                Dribbble.EventBus.$emit('boostedShotsAd:initialize');

                this.bindBoostedAdEvents(boost.boostId, boost.trackingData, boost.itlyTrackingData);
            }
        });
    }

    addCachedItem() {
        for (let i = 0; i < this.getNumberOfBoosts(); i++) {
            if (this.cachedItems.length) {
                this.currentPageElements[0].insertAdjacentElement('beforebegin', this.cachedItems[0]);
                this.cachedItems.shift();
            }
        }
    }

    // This gets called once per boost. If there are two boosts injected into a page, we will call this twice.
    cacheExtraItems() {
        // In the first page, we need to cache and remove x elements from the DOM where x is the number of boosts we injected.
        // In all other pages, we need to cache and remove 2x elements from the DOM where x is the number of boosts we injected.
        // We need to multiply it by 2 because we are also inserting x number of items from the cached items array into the dom.
        const numberOfItemsToCache = this.currentPage === 1 ? this.getNumberOfBoosts() : this.getNumberOfBoosts() * 2;
        const newCachedItems = this.collection.slice(this.collection.length - numberOfItemsToCache, this.collection.length);

        // We are using a set to remove duplicates from the array
        this.cachedItems = [...this.cachedItems, ...newCachedItems];

        // Remove the new cached items from the DOM
        newCachedItems.forEach((item) => item.remove());
    }

    getNewBoostIndex(numberOfGroups, desiredGroup) {
        const {
            length
        } = this.currentPageElements;
        const groupLength = length / numberOfGroups;

        const min = groupLength * desiredGroup - groupLength;
        const adjustedMin = min < 2 ? 2 : min; // We never want a boosted shot to show up in the 1st or 2nd position on the page so we're adjusting the min value

        const max = groupLength * desiredGroup;

        return Math.floor(Math.random() * (max - adjustedMin) + adjustedMin);
    }

    getNumberOfBoosts() {
        // If there are less than 24 shots on the page, always only return 1 boost.
        if (this.collection.length < this.perPage) {
            return 1;
        }

        if (this.currentPage === 1) {
            return this.numberOfAdsOnFirstPage;
        }

        return this.numberOfAdsOnSubsequentPages;
    }

    async fetchBoosts() {
        const boosts = [];
        const requestIds = [];

        if (this.params.q) {
            this.params.keyword = this.params.q;
            delete this.params.q;
        }

        const trackingEventProperties = {
            placement: this.placement,
            provider: 'Dribbble',
            pagePosition: null,
            searchRequest: JSON.stringify(this.params),
        };

        const itlyTrackingEventProperties = {
            placement: this.placement,
            provider: 'Dribbble',
            unit_type: 'Boosted Shots',
        };

        // Fire Ad requested events for each ad.
        for (let i = 0; i < this.getNumberOfBoosts(); i++) {
            requestIds.push(Dribbble.uuidv4());
        }

        requestIds.forEach((id) => {
            itlyTrackingEventProperties.impression_id = id;
            Dribbble.Itly.adRequested(itlyTrackingEventProperties);
        });

        await axios.get('/screenshot_boost?render_in_list=true', {
                params: {
                    original_params: this.params,
                    served_shot_ids: this.servedShotIds,
                    request_source: this.placement,
                    number_of_boosts: this.getNumberOfBoosts(),
                    current_page: this.currentPage,
                },
            })
            .then((data) => {
                const boostData = data.data.data;

                boostData.forEach(({
                    searchData,
                    viewData
                }, index) => {
                    let boostIndex;

                    // When there are less than 24 shots per page, just add the boost to the end of the page.
                    if (this.hasMoreThanOnePageOfShots) {
                        // this.adGroupPositions returns an array of boosted shot positions based on groups of 3
                        // eg. when this.adGroupPositions = [2, 6], the first ad on the page will be in the second group and the second ad will be positioned in the third group
                        boostIndex = this.getNewBoostIndex(8, this.adGroupPositions[index]);
                    } else {
                        boostIndex = this.collection.length - 1;
                    }

                    this.servedShotIds.push(searchData.screenshotId);

                    const trackingData = {
                        ...trackingEventProperties,
                        requestId: requestIds[index],
                        pagePosition: boostIndex,
                        adData: {
                            ad_id: searchData.adId,
                            ad_link: searchData.adLink,
                            ad_link_type: searchData.adLinkType,
                            ad_text: searchData.adText,
                            has_pixel_tracking: searchData.has_pixel_tracking,
                        },
                    };

                    let itlyAdLinkType;

                    switch (searchData.adLinkType) {
                        case 'shot-page':
                            itlyAdLinkType = 'Shot';
                            break;
                        case 'profile':
                            itlyAdLinkType = 'Profile';
                            break;
                        case 'custom':
                        default:
                            itlyAdLinkType = 'Custom URL';
                    }

                    const itlyTrackingData = {
                        ...itlyTrackingEventProperties,
                        impression_id: requestIds[index],
                        ad_id: searchData.adId.toString(),
                        ad_link: searchData.adLink,
                        ad_link_type: itlyAdLinkType,
                        ad_text: searchData.adText || '',
                        has_cta: false,
                    };

                    Dribbble.Itly.adServed(itlyTrackingData);

                    boosts.push({
                        trackingData,
                        itlyTrackingData,
                        boostIndex,
                        boostId: searchData.adId,
                        boostPartial: viewData,
                    });
                });
            })
            .catch(() => {
                Dribbble.Itly.adRequestFailed({ ...itlyTrackingEventProperties,
                    reason: 'No boosted shots available.'
                });
            });

        return boosts;
    }

    onScroll() {
        Object.keys(this.boostsOnPage).forEach((boostId) => {
            const adIsInView = this.boostsOnPage[boostId].adElement.getBoundingClientRect().bottom <= window.innerHeight;

            if (adIsInView && !this.boostsOnPage[boostId].hasBeenScrolledIntoView) {
                this.boostsOnPage[boostId].hasBeenScrolledIntoView = true;
                Dribbble.Itly.adImpressionViewed(this.boostsOnPage[boostId].itlyTrackingData);
            }
        });
    }

    // This code is mostly duplicated from ads.js because we're on a time crunch. This should be cleaned up and made more modular.
    bindBoostedAdEvents(boostId, trackingData, itlyTrackingData) {
        if (!this.boostsOnPage[boostId]) {
            this.boostsOnPage[boostId] = {
                trackingData,
                itlyTrackingData,
                hasBeenScrolledIntoView: false,
                adElement: document.querySelector(`.js-ad-boosted[data-boost-id="${boostId}"]`),
            };
        }

        if (this.boostsOnPage[boostId] && this.boostsOnPage[boostId].adElement) {
            this.boostsOnPage[boostId].adElement.addEventListener('click', () => {
                Dribbble.Itly.adClicked(this.boostsOnPage[boostId].itlyTrackingData);

                // TODO (Jan): replicate this call in ads.js before launching the shot reskin for boosted shots
                axios.get('/screenshot_boost/click', {
                        params: {
                            id: boostId,
                            request_source: this.boostsOnPage[boostId].adElement.dataset.requestSource,
                        },
                    },
                    axiosOptions());
            });
        }

        window.removeEventListener('scroll', this.onScrollFunction);
        window.addEventListener('scroll', this.onScrollFunction);
    }
}

export default new BoostedShotsInFeed();