/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import itly from 'itly';
import get from 'lodash/get';

function getMeta(name) {
    const itlyMeta = document.querySelector(`meta[name=itly-${name}]`);
    if (itlyMeta != null) {
        return itlyMeta.getAttribute('content');
    }
    return null;
}

class Itly {
    constructor() {
        this.initialize();
        this.axios = null;
    }

    initialize() {
        this.loadSnowplow();
        this.itly = itly;
        this.itly.load({
            environment: process.env.RAILS_ENV,
            destinations: {
                all: {
                    disabled: process.env.RAILS_ENV === 'test',
                },
                amplitude: {
                    includeUtm: true,
                    includeReferrer: true,
                },
                snowplow: {
                    url: process.env.SNOWPLOW_URL,
                },
                iteratively: {
                    disabled: false,
                },
            },
        });

        document.addEventListener('DOMContentLoaded', () => {
            window.setInterval(() => {
                if (window.amplitude && typeof window.amplitude.getSessionId === 'function') {
                    this.sessionId = amplitude.getSessionId();
                    if (!(Cookies.get('amplitudeSessionId') === this.sessionId)) {
                        Cookies.set('amplitudeSessionId', this.sessionId);
                        clearInterval();
                    }
                }
            }, 1000);
        });
    }

    loadSnowplow() {
        // Pulled from https://github.com/snowplow/snowplow/wiki/1-General-parameters-for-the-Javascript-tracker#loading
        // self-hosting at cdn.dribbble.com/js/snplw.js to avoid ad-blockers
        // eslint-disable-next-line
        (function(p, l, o, w, i, n, g) {
            if (!p[i]) {
                p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
                p.GlobalSnowplowNamespace.push(i);
                p[i] = function() {
                    (p[i].q = p[i].q || []).push(arguments)
                };
                p[i].q = p[i].q || [];
                n = l.createElement(o);
                g = l.getElementsByTagName(o)[0];
                n.async = 1;
                n.src = w;
                g.parentNode.insertBefore(n, g)
            }
        }(window, document, "script", "//cdn.dribbble.com/js/snplw.js", "snowplow"));
        window.snowplow('newTracker', 'tracker-name', process.env.SNOWPLOW_URL, {
            forceSecureTracker: true,
            postPath: '/com.dribbble/t'
        });
    }

    getDefaultProps(properties) {
        const props = { ...properties
        };
        const controller = props.controller || getMeta('controller');
        const action = props.action || getMeta('action');
        const loc = this.getLoc(props.url);

        delete props.controller;
        delete props.action;
        delete props.url;

        return {
            is_authenticated: !!get(Dribbble, ['JsConfig', 'user', 'isLoggedIn']),
            page_controller: controller,
            page_action: action,
            page_title: document.title,
            page_url: loc.href,
            page_path: loc.pathname,
            page_search: loc.search,
            page_referrer: document.referrer,
            ...props,
        };
    }

    getPageProps(properties) {
        const props = { ...properties
        };
        const loc = this.getLoc(props.url);
        const controller = props.controller || getMeta('controller');
        const action = props.action || getMeta('action');

        return {
            referer: document.referrer,
            search: loc.search,
            url: loc.href,
            title: document.title,
            path: loc.pathname,
            controller,
            action,
        };
    }

    getOptions(customOptions) {
        const DEFAULT_DESTINATION = 'snowplow';
        const options = {};

        if (customOptions) {
            options[DEFAULT_DESTINATION] = customOptions;
        }

        return options;
    }

    getLoc(url) {
        if (url) {
            return Dribbble.Url.parse(url);
        }

        return window.location;
    }

    identify(userId, props) {
        const properties = props || {};
        itly.identify(userId, properties);
    }

    pageViewed(props) {
        itly.pageViewed(this.getDefaultProps(props));
        itly.page(document.title, null, this.getPageProps(props));
    }

    signedIn(props) {
        itly.signedIn(this.getDefaultProps(props));
    }

    collectionCreated(props) {
        itly.collectionCreated(this.getDefaultProps(props));
    }

    boostedShotModalViewed(props) {
        itly.boostedShotModalViewed(this.getDefaultProps(props));
    }

    checkoutViewed(props) {
        itly.checkoutViewed(this.getDefaultProps(props));
    }

    checkoutCompleted(props, options) {
        itly.checkoutCompleted(this.getDefaultProps(props), this.getOptions(options));
    }

    purchaseCallToActionClicked(props, options) {
        itly.purchaseCallToActionClicked(this.getDefaultProps(props), this.getOptions(options));
    }

    callToActionClicked(props) {
        itly.callToActionClicked(this.getDefaultProps(props));
    }

    workAvailabilityUpdated(props) {
        itly.workAvailabilityUpdated(this.getDefaultProps(props));
    }

    customDomainPurchased(props) {
        itly.customDomainPurchased(this.getDefaultProps(props));
    }

    // Upsell events
    upsellFlowStepCompleted(props) {
        itly.upsellFlowStepCompleted(this.getDefaultProps(props));
    }

    upsellFlowEntered(props) {
        itly.upsellFlowEntered(this.getDefaultProps(props));
    }

    // User events
    userFollowed(props) {
        itly.userFollowed(this.getDefaultProps(props));
    }

    userBlocked(props) {
        itly.userBlocked(this.getDefaultProps(props));
    }

    userMessaged(props) {
        itly.userMessaged(this.getDefaultProps(props));
    }

    // Auth events
    authenticationViewed(props) {
        itly.authenticationViewed(this.getDefaultProps(props));
    }

    googleAuthenticationStarted(props) {
        itly.googleAuthenticationStarted(this.getDefaultProps(props));
    }

    twitterAuthenticationStarted(props) {
        itly.twitterAuthenticationStarted(this.getDefaultProps(props));
    }

    // Shot events
    shotSearched(props) {
        itly.shotSearched(this.getDefaultProps(props));
    }

    shotFeedFiltered(props) {
        itly.shotFeedFiltered(this.getDefaultProps(props));
    }

    async trackShotEvent({
        shotId,
        eventName,
        additionalData = {}
    }) {
        if (typeof itly[eventName] !== 'undefined' && typeof itly[eventName] === 'function') {
            let props = await this.getShotData(shotId);

            if (props) {
                props = this.getDefaultProps({ ...props,
                    ...additionalData
                });

                /**
                 * We have do a switch statement here because itly events need to be explicitly called
                 * in order for the verify command to work(`bin/itly verify`).
                 * Ideally we will do something like this: `itly[eventName](props)`
                 * */
                switch (eventName) {
                    case 'shotLiked':
                        itly.shotLiked(props);
                        break;

                    case 'shotSaved':
                        itly.shotSaved(props);
                        break;

                    case 'shotShared':
                        itly.shotShared(props);
                        break;

                    case 'shotCommented':
                        itly.shotCommented(props);
                        break;

                    case 'shotReported':
                        itly.shotReported(props);
                        break;

                    default:
                        console.warn('eventName does not match any itly event', eventName);
                }
            }
        }
    }

    async getShotData(shotId) {
        try {
            if (!this.axios) {
                this.axios = (await
                    import ('axios')).default;
            }

            const results = await this.axios.get('/client_app/js_config/shot_data', {
                params: {
                    shot_id: shotId,
                },
            });

            const data = get(results, 'data.data', {});

            return {
                shot_attachment_count: data.attachmentCount,
                shot_comments_count: data.commentsCount,
                shot_has_download: data.hasDownloads,
                shot_has_good: data.hasGood,
                shot_id: data.shotId.toString(),
                shot_is_multishot: data.isMultiShot,
                shot_is_published_by_team: data.isPublishedByTeam,
                shot_likes_count: data.likesCount,
                shot_published_at: data.postedOn,
                shot_saves_count: data.savesCount,
                shot_views_count: data.viewsCount,
                shot_format: data.shotFormat,
                shot_title: data.title,
                shot_has_pro_features: data.hasProFeatures,
                shot_is_case_study: data.isCaseStudy,
            };
        } catch (error) {
            console.error('Error fetching shot properties', error);
        }
    }

    // Nav events
    headerNavigationClicked(props) {
        itly.headerNavigationClicked(this.getDefaultProps(props));
    }

    // Social events
    socialClicked(props) {
        itly.socialClicked(this.getDefaultProps(props));
    }

    // Job board index
    jobSearched(props) {
        itly.jobSearched(this.getDefaultProps(props));
    }

    jobApplied(props) {
        itly.jobApplied(this.getDefaultProps(props));
    }

    jobViewed(props) {
        itly.jobViewed(this.getDefaultProps(props));
    }

    // Onboarding flow
    onboardingProfileCompleted(props) {
        itly.onboardingProfileCompleted(this.getDefaultProps(props));
    }

    onboardingHiringScopeCompleted(props) {
        itly.onboardingHiringScopeCompleted(this.getDefaultProps(props));
    }

    onboardingHiringWorkTypeCompleted(props) {
        itly.onboardingHiringWorkTypeCompleted(this.getDefaultProps(props));
    }

    onboardingIntentionsCompleted(props) {
        itly.onboardingIntentionsCompleted(this.getDefaultProps(props));
    }

    // Designer search
    designerSearched(props) {
        itly.designerSearched(this.getDefaultProps(props));
    }

    designerSearchResultBookmarked(props) {
        itly.designerSearchResultBookmarked(this.getDefaultProps(props));
    }

    designerSearchResultUnbookmarked(props) {
        itly.designerSearchResultUnbookmarked(this.getDefaultProps(props));
    }

    designerSearchResultExpanded(props) {
        itly.designerSearchResultExpanded(this.getDefaultProps(props));
    }

    designerSearchSaved(props) {
        itly.designerSearchSaved(this.getDefaultProps(props));
    }

    // Designer applications

    designerApplicationSubmitted(props) {
        itly.designerApplicationSubmitted(this.getDefaultProps(props));
    }

    designerApplicationViewed(props) {
        itly.designerApplicationViewed(this.getDefaultProps(props));
    }

    // Ads

    adRequested(props) {
        itly.adRequested(this.getDefaultProps(props));
    }

    adRequestFailed(props) {
        itly.adRequestFailed(this.getDefaultProps(props));
    }

    adServed(props) {
        itly.adServed(this.getDefaultProps(props));
    }

    adImpressionViewed(props) {
        itly.adImpressionViewed(this.getDefaultProps(props));
    }

    adClicked(props) {
        itly.adClicked(this.getDefaultProps(props));
    }

    uploadCallToActionClicked(props) {
        itly.uploadCallToActionClicked(this.getDefaultProps(props));
    }

    // toasty events
    toastyClicked(props) {
        itly.toastyClicked(this.getDefaultProps(props));
    }

    toastyDismissed(props) {
        itly.toastyDismissed(this.getDefaultProps(props));
    }

    toastyShown(props) {
        itly.toastyShown(this.getDefaultProps(props));
    }

    affiliateLinkClicked(props) {
        itly.affiliateLinkClicked(this.getDefaultProps(props));
    }

    // freelance project events
    freelanceProjectViewed(props) {
        itly.freelanceProjectViewed(this.getDefaultProps(props));
    }

    freelanceProjectSubmitted(props) {
        itly.freelanceProjectSubmitted(this.getDefaultProps(props));
    }

    freelanceProjectMessaged(props) {
        itly.freelanceProjectMessaged(this.getDefaultProps(props));
    }

    freelanceProjectSearched(props) {
        itly.freelanceProjectSearched(this.getDefaultProps(props));
    }

    // Pro Switch events
    upgradeCallToActionClicked(props, options) {
        itly.upgradeCallToActionClicked(this.getDefaultProps(props), this.getOptions(options));
    }

    // Pitch events

    introVideoDisplayed(props) {
        itly.introVideoDisplayed(this.getDefaultProps(props));
    }

    introVideoDismissed(props) {
        itly.introVideoDismissed(this.getDefaultProps(props));
    }

    introVideoExpanded(props) {
        itly.introVideoExpanded(this.getDefaultProps(props));
    }

    introVideoCallToActionClicked(props) {
        itly.introVideoCallToActionClicked(this.getDefaultProps(props));
    }

    educationInformationFormCompleted(props) {
        itly.educationInformationFormCompleted(this.getDefaultProps(props));
    }

    // abandon checkout modal events

    modalClicked(props, options) {
        itly.modalClicked(this.getDefaultProps(props), this.getOptions(options));
    }

    modalDismissed(props) {
        itly.modalDismissed(this.getDefaultProps(props));
    }

    modalShown(props) {
        itly.modalShown(this.getDefaultProps(props));
    }

    // Application flow

    applicationFlowEntered(props) {
        itly.applicationFlowEntered(this.getDefaultProps(props));
    }

    applicationFlowStepCompleted(props) {
        itly.applicationFlowStepCompleted(this.getDefaultProps(props));
    }
}

const ItlyInstance = new Itly();

if (typeof Dribbble.Itly === 'undefined') {
    Dribbble.Itly = ItlyInstance;
}

export default ItlyInstance;