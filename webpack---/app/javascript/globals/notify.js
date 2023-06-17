// this is for the site notifications that pop up at the top of the site
Dribbble.Notify = {
    success(message) {
        this.notify('success', message);
    },

    warning(message) {
        this.notify('warning', message);
    },

    error(message) {
        this.notify('error', message);
    },

    onScroll() {
        const alert = document.querySelector('.notice-alert');
        const mainNav = document.querySelector('.js-site-nav');
        const mainNavHeight = mainNav.getBoundingClientRect().height;
        const scrollPosition = window.scrollY;
        if (scrollPosition > mainNavHeight) {
            alert.style.position = 'fixed';
            alert.style.top = 0;
        } else {
            alert.style.position = 'relative';
        }
    },

    alert(message, options) {
        const props = options || {};
        const alert = document.querySelector('.notice-alert');

        window.addEventListener('scroll', this.onScroll);

        const hideAlert = () => {
            alert.style.display = 'none';
            window.removeEventListener('scroll', this.onScroll);
        };

        document.addEventListener('keyup', (e) => {
            if (e.key === 27) hideAlert();
        });

        alert.querySelector('h3').innerHTML = message;
        alert.querySelector('.close').addEventListener('click', hideAlert);
        alert.style.display = 'block';

        if (props.timeout) {
            alert.querySelector('.close').style.display = 'none';

            let {
                timeout
            } = props;
            timeout = (typeof timeout === 'number') ? timeout : 3000;
            setTimeout(hideAlert, timeout);
        }
    },

    clear() {
        // Also clears case where there's a redirect-style flash message
        const notice = document.querySelector('.notice');
        notice.style.display = 'none';
        notice.classList.remove('success');
        notice.classList.remove('warning');
        notice.classList.remove('error');
        notice.querySelector('h2').innerHTML = '';
    },

    notify(typeOfNoticeClass, message) {
        this.clear();
        const notice = document.querySelector('.ajax.notice');
        notice.querySelector('h2').innerHTML = message;
        const closeBtn = notice.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', this.clear);
        }
        notice.classList.add(typeOfNoticeClass);
        notice.style.display = 'block';
    },

    scrollTo() {
        $('html, body').scrollTop($('.notice').offset().top);
    },
};