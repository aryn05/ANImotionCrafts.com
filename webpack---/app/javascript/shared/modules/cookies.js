import axios from 'axios';
import {
    axiosOptions
} from 'shared/modules/axios_helper';

export function setServerCookie(cookieName, value) {
    return new Promise((resolve, reject) => {
        axios.put(
            `/client_app/states/${cookieName}?value=${value}`, {}, axiosOptions(),
        ).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function getCookie(cookieName) {
    return document.cookie.match(`(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`) ? .pop() || '';
}

export default {
    setServerCookie,
    getCookie,
};