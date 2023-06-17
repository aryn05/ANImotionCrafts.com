class BoostedInFeedAutoload {
    constructor() {
        this.bindEventListeners();

        this.boostedInFeedModule = null;
    }

    bindEventListeners() {
        Dribbble.EventBus.$on('infinite-thumbnails:initialized', (data) => {
            this.initializeBoostedInFeed(data);
        });
    }

    async initializeBoostedInFeed(data) {
        if (!this.boostedInFeedModule) {
            this.boostedInFeedModule = (await
                import ('shared/modules/boosted-shots-in-feed')).default;
        }

        this.boostedInFeedModule.initialize(data);
    }
}

export default new BoostedInFeedAutoload();