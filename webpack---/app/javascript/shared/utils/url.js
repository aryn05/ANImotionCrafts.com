export const getUrlParamByName = (name, url) => {
    // XXX: We need to use regex because 'new URL()' isn't supported by IE
    const currentUrl = url || window.location;
    const match = RegExp(`[?&]${name}=([^&]*)`).exec(currentUrl.search);

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

export const removeParamFromUrl = (url, param) => {
    const urlParts = url.split('?');

    if (urlParts.length >= 2) {
        const prefix = `${encodeURIComponent(param)}=`;
        const paramsArray = urlParts[1].split(/[&;]/g);

        for (let i = paramsArray.length; i-- > 0;) {
            if (paramsArray[i].lastIndexOf(prefix, 0) !== -1) {
                paramsArray.splice(i, 1);
            }
        }

        return urlParts[0] + (paramsArray.length > 0 ? `?${paramsArray.join('&')}` : '');
    }

    return url;
};

export const addParamsToUrl = (url, params) => {
    const urlObj = new URL(url);

    Object.keys(params).forEach((paramName) => {
        urlObj.searchParams.append(paramName, params[paramName]);
    });

    return `${url}${urlObj.search}`;
};