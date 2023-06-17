import {
    getCookie
} from 'shared/modules/cookies';
import {
    getUrlParamByName,
    removeParamFromUrl
} from 'shared/utils/url';
import isFeatureGateEnabled from 'shared/utils/feature-gates';

class ShotPageAutoload {
    constructor() {
        this.bindEventListeners();
        this.initialize();

        this.shotPageModule = null;
        this.hiringCheckoutInitialized = false;
    }

    initialize() {
        // If shotData exists within the JsConfig, that means we are in a shot page and not a shot modal
        const {
            shotData
        } = Dribbble.JsConfig;
        if (shotData) {
            shotData.showSidebarFromServer = getCookie('comments_sidebar_open') === 'true';

            this.initializeShotPage(shotData);
        }
    }

    async initializeHiringCheckout() {
        const appElement = document.getElementById('checkoutApp');
        if (!appElement || this.hiringCheckoutInitialized) return;

        const {
            CheckoutApp
        } = await
        import ('checkout/main');

        CheckoutApp.init();
        this.hiringCheckoutInitialized = true;
    }

    bindEventListeners() {
        Dribbble.EventBus.$on('shot-overlay:shown', () => {
            const {
                shotData
            } = Dribbble.JsConfig;
            if (shotData) {
                shotData.showSidebarFromServer = getCookie('comments_sidebar_open') === 'true';

                this.initializeShotPage(shotData);
            }
        });

        if (isFeatureGateEnabled('messageFlowHiringTrial')) {
            // Listening on document to handle dynamic content in shot modal
            document.addEventListener('click', (e) => {
                const hireMeButton = e.target.closest('.js-contact-overlay-trigger');
                if (!hireMeButton) return;

                if (!this.hiringCheckoutInitialized) {
                    this.initializeHiringCheckout();
                }

                const location = hireMeButton.closest('.js-shot-header-action-links') ? 'Header' : 'Main Body';
                Dribbble.Itly.callToActionClicked({
                    location,
                    text: 'Hire me',
                });
            });
        }
    }

    async initializeShotPage(shotData, shouldDisplayAds) {
        if (!this.shotPageModule) {
            this.shotPageModule = (await
                import ('shared/modules/shot-page')).default;
        }

        this.shotPageModule.initialize(shotData, shouldDisplayAds);

        // set first shot notification
        const {
            user
        } = Dribbble.JsConfig;
        if (shotData.shotUser.username === user.username && getUrlParamByName('added_first_shot')) {
            Dribbble.EventBus.$emit('siteNotifications:add', {
                title: 'Apply for a Designer Account!',
                message: `You’ve just published your first shot on Dribbble & are now able to <a href="/${user.username}/about?apply_modal=true&from_modal_cta=true" class="color-white font-weight-500">apply</a>`,
                id: 'first-shot-added',
                type: 'info',
                willAutoClose: false,
            });
        }

        // remove any params set by shot uploads

        if (Dribbble.Url.getUrlParamByName('new_shot_upload')) {
            const strippedUrl = removeParamFromUrl(window.location.href, 'new_shot_upload');
            window.history.replaceState(null, null, strippedUrl);
        }
    }
}

export default new ShotPageAutoload();