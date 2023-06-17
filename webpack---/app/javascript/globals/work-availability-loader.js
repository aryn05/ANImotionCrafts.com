import {
    getUrlParamByName
} from 'shared/utils/url';

Dribbble.WorkAvailability = {
    async initialize() {
        this.workAvailabilityNavLink = document.getElementById('work-availability-widget-app');
        this.workAvailabilityLinks = document.querySelectorAll('[data-open-availability-modal]');
        this.getWorkAvailabilityApp = () =>
            import ('globals/work-availability/main');
        this.appInitialized = false;
        /**
         * Initialize global Vue app for work availability widget.
         * - Only initialize if work-availability-widget-app element is available in the nav.
         * - Lazy load the Vue app only when user hovers on the availability icon.
         */
        if (this.workAvailabilityNavLink) {
            const loadWorkAvailability = () => {
                this.initApp();
                this.workAvailabilityNavLink.removeEventListener('mouseover', loadWorkAvailability, false);
            };

            this.workAvailabilityNavLink.addEventListener('mouseover', loadWorkAvailability, false);
        }

        // Init app when clicking on other links. Ej: Shot page, profile dropdown.
        if (this.workAvailabilityLinks.length) {
            this.workAvailabilityLinks.forEach((link) => {
                link.addEventListener('mouseover', this.initApp.bind(this), false);
            });
        }

        // see if url needs to open the modal
        const openWorkAvailabilityModal = getUrlParamByName('work_availability_modal');
        if (openWorkAvailabilityModal) {
            await this.initializeWorkAvailability();
            Dribbble.EventBus.$emit('set-workspace-availability-modal', true);
        }
    },

    async initializeWorkAvailability() {
        this.appInitialized = true;
        const {
            workAvailabilityApp
        } = await this.getWorkAvailabilityApp();
        workAvailabilityApp.init();
        this.removeListeners();
    },

    removeListeners() {
        this.workAvailabilityLinks.forEach((link) => {
            link.removeEventListener('mouseover', this.initApp.bind(this), false);
        });
    },

    initApp() {
        if (!this.appInitialized) {
            this.initializeWorkAvailability();
        }
    },
};