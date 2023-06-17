import {
    onNextRepaint
} from '~/shared/utils/animation';

export const AnnouncementsV2 = {
    // show/hide announcements widget
    showAnnouncements(shouldShow = true) {
        const containerEl = document.querySelector('[data-announcements]');
        if (!containerEl) return;

        containerEl.classList.toggle('announcements--visible', shouldShow);
    },

    nextAnnouncement() {
        const activeAnnouncement = document.querySelector('[data-announcement]:not(.announcement--hidden)');
        if (!activeAnnouncement) return;

        // send request to mark announcement as seen
        fetch(activeAnnouncement.getAttribute('data-announcement'), {
            method: 'POST',
        });

        // get next announcement
        const nextAnnouncement = activeAnnouncement ? .nextElementSibling;

        // close announcements widget if there are no more announcements
        if (!nextAnnouncement) {
            this.showAnnouncements(false);
            return;
        }

        // fade out current announcement
        activeAnnouncement.classList.add('announcement--fade-out');

        // wait for fade out to complete
        setTimeout(() => {
            // remove current announcement from DOM
            activeAnnouncement.remove();

            // show next announcement (but don't fade in yet)
            nextAnnouncement.classList.remove('announcement--hidden');
            nextAnnouncement.classList.add('announcement--fade-out');

            // wait for next repaint so that fade in transition is triggered
            onNextRepaint(() => {
                // fade in next announcement
                nextAnnouncement.classList.remove('announcement--fade-out');
            });
        }, 300);
    },

    init() {
        const containerEl = document.querySelector('[data-announcements]');
        const closeButton = document.querySelector('[data-announcements-close]');
        if (!containerEl || !closeButton) return;

        // move announcements widget to body as first child (so it becomes first focusable element)
        document.body.prepend(containerEl);

        // bind close button
        closeButton.addEventListener('click', this.nextAnnouncement.bind(this));

        // wait for next repaint so that fade in transition is triggered
        onNextRepaint(() => {
            this.showAnnouncements();
        });
    },
};