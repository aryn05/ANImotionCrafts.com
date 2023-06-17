// This file is for porting over any modules and utils from legacy global.js that are still being used by other legacy JS files
// Once we've ported everything over to our new JS, we can delete this file and call the shared modules directly.

import isFeatureGateEnabled from 'shared/utils/feature-gates';
import hasPermission from 'shared/utils/has-permission';
import {
    format,
    truncate
} from 'shared/utils/pricing';

Dribbble.Globals = {
    isFeatureGateEnabled(featureGate) {
        return isFeatureGateEnabled(featureGate);
    },

    hasPermission(permission, permissionGroup = 'userPermissions') {
        return hasPermission(permission, permissionGroup);
    },

    async debounce() {
        const {
            default: debounce
        } = await
        import ('lodash/debounce');
        return debounce;
    },

    async throttle() {
        const {
            default: throttle
        } = await
        import ('lodash/throttle');
        return throttle;
    },

    formatPrice(price) {
        return format(price);
    },

    truncatePrice(price, decimalPlaces) {
        return truncate(price, decimalPlaces);
    },
};