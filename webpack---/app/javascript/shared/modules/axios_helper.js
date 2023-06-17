/**
 * Get CSRF toket from meta tag.
 */
const CSRF = (() => {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
        return metaTag.getAttribute('content') || '';
    }
    return '';
})();

export const axiosErrorStatus = (error) => {
    const hasStatus = error.response && error.response.status;
    return hasStatus ? error.response.status : '';
};

export const axiosErrorStatusText = (error) => {
    const hasStatusText = error.response && error.response.statusText;
    return hasStatusText ? error.response.statusText : '';
};

export const axiosErrorMessage = (error) => {
    const errorObject = error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors[0] ?
        error.response.data.errors[0] :
        {};

    return errorObject.detail || 'Something went wrong, please try again.';
};

export const axiosOptions = (tokenSource) => {
    const config = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': CSRF,
        },
    };

    if (tokenSource) {
        config.cancelToken = tokenSource.token;
    }

    return config;
};

export const axiosUploadFormData = (file, formData) => {
    const uploadFormData = new FormData();

    Object.keys(formData).forEach((key) => {
        uploadFormData.append(key, formData[key]);
    });

    uploadFormData.append('Content-Type', file.type);
    uploadFormData.append('file', file);

    return uploadFormData;
};

export const axiosFormData = (form) => {
    const formData = new FormData(form);

    Object.keys(formData).forEach((key) => {
        formData.append(key, formData[key]);
    });

    return formData;
};

export default {
    axiosErrorStatus,
    axiosErrorStatusText,
    axiosOptions,
    axiosFormData,
    axiosUploadFormData,
    axiosErrorMessage,
};