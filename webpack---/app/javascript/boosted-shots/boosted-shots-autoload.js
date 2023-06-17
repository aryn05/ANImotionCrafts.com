import {
    getUrlParamByName
} from 'shared/utils/url';

class BoostedShotsAutoload {
    constructor() {
        // By binding 'this' here, we'll be able to easily remove the event listener without losing the refrence to the function if we decide to do that.
        this.onMouseoverFunction = this.onMouseOver.bind(this);
        this.boostedShotElement = document.getElementById('boosted-shots-app');
        this.initialize();

        this.boostedShotsModule = null;
    }

    initialize() {
        if (Dribbble.JsConfig.user.isLoggedIn) {
            document.addEventListener('mouseover', this.onMouseoverFunction);

            if (getUrlParamByName('boost') === 'true' && this.boostedShotElement && Dribbble.JsConfig.user.hasShots) {
                this.initializeBoostedShots(true);
            }
        }
    }

    onMouseOver(event) {
        const {
            hasShots
        } = event.target.dataset;
        if (event.target.classList.contains('js-boost-shot-button') || (event.target.classList.contains('js-boost-shot-ad-button') && hasShots === 'true')) {
            this.initializeBoostedShots();
        }
    }

    async initializeBoostedShots(userHasShots) {
        if (!this.boostedShotsModule) {
            this.boostedShotsModule = (await
                import ('shared/modules/boosted-shots')).default;
        }

        this.boostedShotsModule.initialize({
            userHasShots
        });
    }
}

export default new BoostedShotsAutoload();