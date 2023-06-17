import axios from 'axios';
import {
    axiosOptions
} from 'shared/modules/axios_helper';

export const initializeSignUpToasty = async () => {
    const {
        referrer
    } = document;
    if (!referrer) return;
    const {
        hostname
    } = new URL(referrer);
    const fromGoogle = hostname.match(/^(www\.)?google\.\w+$/);

    if (fromGoogle) {
        const toastyContainer = document.createElement('div');
        toastyContainer.classList.add('js-toasty-sign-up-container');
        document.body.prepend(toastyContainer);
        const response = await axios.get('/signup/toasty', {
            headers: axiosOptions().headers
        });

        if (response) {
            toastyContainer.innerHTML = response.data;

            const toastyModule = (await
                import ('shared/modules/toasty-sign-up')).default;
            toastyModule.initializeToasty();
        }
    }
};

export default {
    initializeSignUpToasty,
};