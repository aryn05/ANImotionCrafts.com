import {
    isTouchDevice
} from '../shared/utils/is_touch_device';
import 'globals/work-availability-loader';
import 'globals/collaborator-requests';

class DOMContentLoaded {
    constructor() {
        this.siteNotificationInitialized = null;
        this.initialize();
    }

    initialize() {
        DOMContentLoaded.setIsTouchDeviceClass();
        DOMContentLoaded.disableEmptyLinks();
        DOMContentLoaded.setSiteNav();
        DOMContentLoaded.initSiteNavV2();
        DOMContentLoaded.setUnsavedChangesEvents();

        if (Dribbble.ButtonDropdown) {
            Dribbble.ButtonDropdown.initialize();
        }

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.setVueNotifications();
        Dribbble.WorkAvailability.initialize();
        Dribbble.CollaboratorRequests.initialize();
    }

    setVueNotifications() {
        const siteNotificationsElement = document.getElementById('site-notifications');
        if (Dribbble.EventBus && siteNotificationsElement) {
            Dribbble.EventBus.$on('siteNotifications:add', async (data) => {
                if (!this.siteNotificationInitialized) {
                    const vue = await
                    import ('vue/dist/vue.runtime.esm');
                    const Vue = vue.default;
                    const SiteNotificationsApp = await
                    import ('globals/site-notifications/App');
                    this.siteNotificationInitialized = new Vue({
                        el: siteNotificationsElement,
                        render: (h) => h(SiteNotificationsApp.default),
                    });

                    Dribbble.EventBus.$emit('siteNotifications:add', data);
                }
            });
        }
    }

    static setIsTouchDeviceClass() {
        if (isTouchDevice()) {
            document.body.classList.add('touch-device-enabled');
        }
    }

    static disableEmptyLinks() {
        // Disable links that simply trigger some JavaScript action.
        // we should not need this, all links should have a destination
        const emptyLinks = document.querySelectorAll("a[href='#']");
        emptyLinks.forEach((link) => {
            link.addEventListener('click', (e) => e.preventDefault());
        });
    }

    static async setSiteNav() {
        // Initialize the nav if on the page
        const nav = document.querySelector('.js-site-nav');
        if (nav) {
            const {
                initNav
            } = await
            import ('globals/site-nav');
            initNav(nav);
        }
    }

    static async initSiteNavV2() {
        const nav = document.querySelector('[data-site-nav-v2]');
        if (!nav) return;

        const {
            SiteNavV2
        } = await
        import ('globals/site-nav-v2');
        SiteNavV2.init();
    }

    static setUnsavedChangesEvents() {
        // the is needed for legacy forms behaviour. remove when possible
        // used for freelance, accounts. jobs, stories and messages forms
        const unsavedTriggerInputs = document.querySelectorAll('form[data-warn-unsaved] input');
        const unsavedTriggerTextAreas = document.querySelectorAll('form[data-warn-unsaved] textarea');
        const triggers = [...unsavedTriggerInputs, ...unsavedTriggerTextAreas];

        triggers.forEach((el) => {
            el.addEventListener('keydown', () => {
                window.onbeforeunload = () => 'You have unsaved changes.';
            });
        });

        const unsavedTriggers = document.querySelectorAll('form[data-warn-unsaved]');
        unsavedTriggers.forEach((form) => {
            form.addEventListener('submit', () => {
                window.onbeforeunload = null;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DOMContentLoaded();
});