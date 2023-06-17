import axios from 'axios';
import {
    axiosOptions
} from 'shared/modules/axios_helper';

// handles approving/declining collaborator requests across the site
// (e.g. notification dropdown, activity page, shot page)

Dribbble.CollaboratorRequests = {
    initialize() {
        document
            .querySelectorAll('[data-update-collab-status]')
            .forEach((actionLink) => actionLink.addEventListener('click', this.updateCollabStatus.bind(this)));
    },

    async updateCollabStatus(e) {
        e.preventDefault();

        const requestAction = e.currentTarget;
        const requestContainer = requestAction.closest('[data-collab-request]');
        if (!requestContainer) return;

        const targetStatus = requestAction.getAttribute('data-update-collab-status');
        const collabId = requestContainer.getAttribute('data-collab-request');

        this.toggleActionDisabledClass({
            collabId
        });

        await axios
            .put(requestAction.href, {}, axiosOptions())
            .then(() => {
                // We want to update all matching collab requests, not just the one we clicked on.
                document
                    .querySelectorAll(`[data-collab-request="${collabId}"]`)
                    .forEach((request) => request.setAttribute('data-collab-status', targetStatus));
            })
            .catch(() => {
                Dribbble.EventBus.$emit('siteNotifications:add', {
                    title: 'Collaboration request error ',
                    message: 'There was an issue sending your request',
                    id: 'collab-error',
                });
            });

        this.toggleActionDisabledClass({
            collabId,
            isDisabled: false
        });
    },

    toggleActionDisabledClass({
        collabId,
        isDisabled = true
    }) {
        document
            .querySelectorAll(`[data-collab-request="${collabId}"] [data-update-collab-status]`)
            .forEach((action) => action.classList.toggle('disabled', isDisabled));
    },
};