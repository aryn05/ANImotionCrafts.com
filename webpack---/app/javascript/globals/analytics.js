/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

// legacy analytics code copied over from the old `app/assets/javascripts/analytics.js`
// to work with webpack.
Dribbble.Analytics = {
    existingProperties: [],
    sentEvents: [],

    reset() {
        this.existingProperties = [];
        this.sentEvents = [];
        this.namedRoot = null;
        this.googleAnalyticsKey = null;
    },

    logDribbbleGAPageView(page) {
        // Measure pageviews with the default tracker
        gtag('config', this.googleAnalyticsKey);
    },

    logPageView(propertyId, propertyName, path, title) {
        this.log(propertyId, 'page_view', 'event', {
            page_path: path,
            page_title: title,
        });
    },

    log(propertyId, propertyName, event, options, delay) {
        // if google analytics hasn't loaded yet, queue this to fire again after some delay
        if (typeof ga === 'undefined' && typeof gtag === 'undefined') {
            delay = (delay || 50) * 2; // 100ms, 200ms, 400ms, etc.
            // give up eventually
            if (delay < 10000) {
                setTimeout(() => {
                    this.log(propertyId, propertyName, event, options, delay);
                }, delay);
            }
        } else {
            const defaultOptions = {
                send_to: propertyId,
                name: propertyName,
            };
            gtag(event, propertyName, Object.assign(defaultOptions, options));
        }
    },
};