const {
    textSignin,
    textTwitter,
    textGoogle
} = document.querySelector('.js-event-text').dataset;

const trackingEventProps = {
    cta_text: '',
    cta_type: 'internal link',
    destination_url: '',
    has_cta: true,
    target_user_id: '',
    toasty_text: 'Welcome to Dribbble',
    toasty_type: 'sign up',
};

const trackToastyShown = () => {
    Dribbble.Itly.toastyShown(trackingEventProps);
};

const trackToastyClicked = (clickedBtn) => {
    if (clickedBtn.classList.contains('js-twitter-btn')) {
        trackingEventProps.cta_text = textTwitter;
    } else if (clickedBtn.classList.contains('js-google-btn')) {
        trackingEventProps.cta_text = textGoogle;
    } else if (clickedBtn.classList.contains('js-sign-up-btn')) {
        trackingEventProps.cta_text = textSignin;
    }

    Dribbble.Itly.toastyClicked(trackingEventProps);
};

const trackToastyDismissed = () => {
    trackingEventProps.cta_text = '';
    Dribbble.Itly.toastyDismissed(trackingEventProps);
};

const removeToasty = (toastySignUp) => {
    toastySignUp.classList.remove('visible');
    localStorage.setItem('shouldHideToastySignUp', true);
    trackToastyDismissed();
};

const showToasty = (toastySignUp) => {
    toastySignUp.classList.add('visible');
};

const bindEventListeners = (toastySignUp) => {
    const closeBtn = document.querySelector('.js-dismiss');
    const socialSignUpButtons = document.querySelectorAll('.js-social-login-btn');

    closeBtn.addEventListener('click', () => {
        removeToasty(toastySignUp);
    });

    socialSignUpButtons.forEach((socialSignUpButton) => {
        socialSignUpButton.addEventListener('click', (event) => {
            event.preventDefault();

            trackToastyClicked(socialSignUpButton);

            const socialForm = socialSignUpButton.closest('.js-social-login-form');

            setTimeout(() => {
                // Allowing time for toastyClicked event to happen
                socialForm.submit();
            }, 2000);
        });
    });

    const signUpButton = document.querySelector('.js-sign-up-btn');

    signUpButton.addEventListener('click', (event) => {
        event.preventDefault();

        trackToastyClicked(signUpButton);

        setTimeout(() => {
            // Allowing time for toastyClicked event to happen
            window.location.href = '/signup/new';
        }, 2000);
    });
};

export const initializeToasty = () => {
    // Allowing time for Google One-Tap to load
    setTimeout(() => {
        const toastySignUp = document.querySelector('.js-toasty-sign-up');
        const googleOneTapContainer = document.querySelector('#credential_picker_container');
        const isGoogleOneTapHidden = !googleOneTapContainer || googleOneTapContainer.firstElementChild.style.display === 'none';

        if (toastySignUp && !localStorage.getItem('shouldHideToastySignUp') && isGoogleOneTapHidden) {
            bindEventListeners(toastySignUp);

            showToasty(toastySignUp);
            trackToastyShown();
        }
    }, 8000);
};

export default {
    initializeToasty
};