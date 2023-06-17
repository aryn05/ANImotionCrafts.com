import {
    AnnouncementsV2
} from '~/globals/announcements-v2';

// should match 'medium' value in `app/assets/stylesheets/site-nav-v2/_mixins.scss`
const isNavSmallScreen = () => !window.matchMedia('(min-width: 950px)').matches;

const updateBodyScrollLock = () => {
    const isProfileOpen = !!document.querySelector('[data-nav-v2-profile]') ? .classList.contains('nav-v2-profile--open');
    const isMobileMenuOpen = document.body.classList.contains('nav-v2-mobile-menu-open');
    document.body.classList.toggle('nav-v2-lock-scroll', isProfileOpen || isMobileMenuOpen);
};

export const SiteNavV2 = {
    bindTrackingEvents(isFramer) {
        const trackNavEvent = (eventName, properties) => {
            try {
                if (!isFramer) {
                    // `app` events
                    if (typeof Dribbble.Itly[eventName] !== 'function') throw new Error(`Itly event '${eventName}' doesn't exist`);
                    Dribbble.Itly[eventName](properties);
                } else {
                    // `framer` events
                    if (typeof trackAmpliEvent !== 'function') throw new Error('trackAmpliEvent() method not found');
                    // eslint-disable-next-line no-undef
                    trackAmpliEvent(eventName, properties);
                }
            } catch (error) {
                console.warn('Error tracking nav event', error);
            }
        };

        // track nav `headerNavigationClicked` events
        document.querySelectorAll('[data-nav-event-clicked]').forEach((el) => {
            el.addEventListener('click', () => {
                const properties = {
                    category: el.closest('[data-nav-event-category]') ? .getAttribute('data-nav-event-category') || 'Top Nav',
                    item: el.getAttribute('data-nav-event-clicked'),
                };

                trackNavEvent('headerNavigationClicked', properties);
            });
        });

        // track nav `purchaseCallToActionClicked` events
        document.querySelectorAll('[data-nav-event-cta-clicked]').forEach((el) => {
            el.addEventListener('click', () => {
                const properties = {
                    currency: Dribbble ? .JsConfig ? .purchase ? .currency_conversion ? .abbreviation ? ? 'USD',
                    location: 'Site Nav',
                    product_name: el.getAttribute('data-nav-event-product-name') || 'Pro',
                    text: el.getAttribute('data-nav-event-cta-clicked') || el.textContent.trim(),
                };

                trackNavEvent('purchaseCallToActionClicked', properties);
            });
        });
    },

    bindMobileMenu() {
        const burger = document.querySelector('[data-nav-v2-burger]');
        if (!burger) return;

        const toggleMobileMenu = (force = undefined) => {
            document.body.classList.toggle('nav-v2-mobile-menu-open', force);
            updateBodyScrollLock();
        };

        // toggle mobile menu when clicking hamburger button
        burger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });

        // close mobile menu when clicking outside of it (ignoring burger)
        document.body.addEventListener('click', (e) => {
            const clickedBurger = e.target.closest('[data-nav-v2-burger]');
            const clickedInsideMobileNav = e.target.closest('[data-nav-v2-mobile]');
            if (clickedBurger || clickedInsideMobileNav) return;

            toggleMobileMenu(false);
        });
    },

    bindProfileDropdown() {
        const profileDropdown = document.querySelector('[data-nav-v2-profile]');
        const avatar = document.querySelector('[data-nav-v2-avatar]');
        if (!profileDropdown || !avatar) return;

        // show/hide profile dropdown and lock/unlock body scroll
        const toggleProfileDropdown = (force = undefined) => {
            profileDropdown.classList.toggle('nav-v2-profile--open', force);
            updateBodyScrollLock();
        };

        // toggle profile dropdown on mobile when clicking avatar
        avatar.addEventListener('click', (e) => {
            if (!isNavSmallScreen()) return;

            e.preventDefault();
            toggleProfileDropdown();
        });

        // close profile dropdown when clicking outside of it (ignoring avatar)
        document.body.addEventListener('click', (e) => {
            const clickedAvatar = e.target.closest('[data-nav-v2-avatar]');
            const clickedInsideProfile = e.target.closest('[data-nav-v2-profile-wrapper]');
            if (clickedAvatar || clickedInsideProfile) return;

            toggleProfileDropdown(false);
        });
    },

    fadeInDynamicNav() {
        const dynamicNav = document.querySelector('[data-nav-v2-dynamic]');
        if (!dynamicNav) return;

        // delay by a frame to ensure transition is triggered
        setTimeout(() => {
            dynamicNav.classList.add('nav-v2-dynamic--loaded');
        }, 0);
    },

    init({
        isFramer = false
    } = {}) {
        // trigger on both the app and framer
        this.fadeInDynamicNav();
        this.bindProfileDropdown();
        this.bindTrackingEvents(isFramer);
        AnnouncementsV2.init();

        if (isFramer) {
            // trigger only in framer
        } else {
            // trigger only on the app
            this.bindMobileMenu();
        }
    },
};

export default SiteNavV2;