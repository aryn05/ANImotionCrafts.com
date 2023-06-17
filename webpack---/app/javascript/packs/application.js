/* eslint no-console:0 */

/**
 * This file is automatically compiled by Webpack, along with any other files
 * present in this directory. You're encouraged to place your actual application logic in
 * a relevant structure within app/javascript and only use these pack files to reference
 * that code so it'll be compiled. TL;DR; Files inside "app/javascript/packs" will be actually output to a view and watched by
 * To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
 * layout file, like app/views/layouts/application.html.erb
 *
 * This file should be included on ANY rails base template that require using webpack bundles.
 */

/**
 * Add core-js to polyfill ES6 features in the older browsers
 * - https://github.com/rails/webpacker/blob/master/docs/es6.md#babel
 */

import 'core-js';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import 'lazysizes/plugins/include/ls.include';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import 'lazysizes/plugins/rias/ls.rias';
import lazySizes from 'lazysizes';
import '../shared/modules/event_bus';
import 'globals/notify';
import 'globals/analytics';
import 'globals/itly/itly-autoload';
import 'globals/itly/itly-tracking-autoload';
import 'globals/globals'; // TODO: Remove this once all legacy JS has been ported over
import 'boosted-shots/boosted-shots-autoload';
import 'boosted-shots/boosted-in-feed-autoload';
import 'shot/shot-page-autoload';
import 'globals/dom-content-loaded';

(async () => {
    if (Dribbble.JsConfig.user.hasPro || Dribbble.JsConfig.user.hasProBusiness || Dribbble.JsConfig.user.isTeam) {
        await
        import ('introductions-upload-modal/introductions-upload-modal-autoload');
    }
})();

/**
 * Configuration for lazy load images using lazySizes:
 * https://github.com/aFarkas/lazysizes
 *
 * This is our new image lazy-load library recommended by the Google team:
 * https://web.dev/offscreen-images
 * https://web.dev/codelab-use-lazysizes-to-lazyload-images/
 *
 * To make lazy load work for videos, we need to use the lazysizes unveilhooks plugin
 * https://github.com/aFarkas/lazysizes/blob/bce35e58dc3cdd6793ecd4cf47349ede240199e6/plugins/unveilhooks/ls.unveilhooks.js
 *
 */
lazySizes.cfg.expand = 300;

lazySizes.cfg.rias.widths = [
    320,
    400,
    640,
    752,
    1024,
    1200,
    1504,
    2048,
];

const addRiasWidth = (widths, width) => {
    if (!widths.includes(width)) widths.push(width);
    if (!widths.includes(width * 2)) widths.push(width * 2);
};

// add exact widths to rias dynamic urls
lazySizes.cfg.rias.modifyOptions = (data) => {
    const exactWidth = data.target ? .clientWidth;
    if (Number.isNaN(exactWidth)) return;

    addRiasWidth(data.detail.widths, exactWidth);
};

// Chrome seems to round fractional pixel widths down at .5. For example,
// 752.5px would get rendered at 752px. To render the most exact image width,
// we can add a custom rounding function to the lazySizes callback
if (typeof window !== 'undefined') {
    document.addEventListener('lazybeforesizes', (e) => {
        if (!e.detail.width) return;

        const decimalRemainder = e.detail.width % 1;
        e.detail.width = decimalRemainder > 0.5 ? Math.ceil(e.detail.width) : Math.floor(e.detail.width);
    });
}

// propograte lazyloaded class to parent element (assist w/ custom reveal animations)
if (typeof window !== 'undefined') {
    document.addEventListener('lazyloaded', (e) => {
        const lazyParent = e.target.closest('[data-lazy-parent]');
        if (lazyParent) lazyParent.classList.add('lazyloaded');
    });
}