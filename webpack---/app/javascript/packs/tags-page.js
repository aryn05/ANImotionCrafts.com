import {
    initializeSignUpToasty
} from 'shared/modules/toasty-sign-up-initializer';

document.addEventListener('DOMContentLoaded', () => {
    if (!Dribbble.JsConfig.user.isLoggedIn) {
        initializeSignUpToasty();
    }
});