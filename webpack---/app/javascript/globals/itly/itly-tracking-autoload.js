class ItlyTracking {
    constructor() {
        this.globalSearchForm = document.querySelector('.js-site-nav-global-search');
        this.searchPageForm = document.querySelector('.js-search-input-form');
        this.isLoggedIn = Dribbble.JsConfig.user && Dribbble.JsConfig.user.isLoggedIn;
        this.authPageType = null;
        this.googleAuthFormButton = document.querySelector('.auth-google-form button');
        this.twitterAuthFormButton = document.querySelector('.auth-connections .auth-twitter');
        this.initialize();
    }

    initialize() {
        this.bindEventListeners();
        this.trackAuthEvents();
    }

    trackAuthEvents() {
        if (document.body.classList.contains('sign-in')) {
            this.authPageType = 'Sign In';
        }

        if (document.body.classList.contains('sign-up')) {
            this.authPageType = 'Sign Up';
        }

        if (this.authPageType) {
            Dribbble.Itly.authenticationViewed({
                object_type: 'Page',
                trigger: 'unknown',
                type: this.authPageType,
            });
        }
    }

    bindEventListeners() {
        if (this.globalSearchForm) {
            this.globalSearchForm.addEventListener('submit', ItlyTracking.onSubmitSearch.bind(this, this.globalSearchForm));
        }

        if (this.searchPageForm) {
            this.searchPageForm.addEventListener('submit', ItlyTracking.onSubmitSearch.bind(this, this.searchPageForm));
        }

        if (this.googleAuthFormButton) {
            this.googleAuthFormButton.addEventListener('click', ItlyTracking.onClickAuthGoogle.bind(this));
        }

        if (this.twitterAuthFormButton) {
            this.twitterAuthFormButton.addEventListener('click', ItlyTracking.onClickAuthTwitter.bind(this));
        }

        // User events.
        if (Dribbble.EventBus) {
            Dribbble.EventBus.$on('track:userFollowed', (data) => {
                const props = ItlyTracking.getUsersTrackProps(data);
                Dribbble.Itly.userFollowed(props);
            });

            Dribbble.EventBus.$on('track:userBlocked', (data) => {
                const props = ItlyTracking.getUsersTrackProps(data);
                Dribbble.Itly.userBlocked(props);
            });

            Dribbble.EventBus.$on('track:userMessaged', (data) => {
                Dribbble.Itly.userMessaged(data);
            });
        }
    }

    // Sanitize props for event.
    static getUsersTrackProps(data) {
        const coercedData = {
            user_id: data.user_id.toString(),
            user_type: Dribbble.String.capitalize(data.user_type),
        };

        if (data.following_id) {
            coercedData.following_id = data.following_id.toString();
        }

        return { ...data,
            ...coercedData
        };
    }

    static onSubmitSearch(formEl) {
        const searchInput = formEl.querySelector('input[type="search"]');
        const searchQuery = searchInput ? searchInput.value.trim() : null;

        if (searchQuery) {
            Dribbble.Itly.shotSearched({
                query: searchQuery,
            });
        }
    }

    static onClickAuthGoogle(e) {
        Dribbble.Itly.googleAuthenticationStarted({
            trigger: 'google',
            object_type: 'Page',
            type: e.target.dataset.authAction || 'Sign Up',
        });
    }

    static onClickAuthTwitter(e) {
        Dribbble.Itly.twitterAuthenticationStarted({
            trigger: 'twitter',
            object_type: 'Page',
            type: e.target.dataset.authAction || 'Sign Up',
        });
    }
}

export default new ItlyTracking();