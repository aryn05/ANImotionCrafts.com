(window.webpackJsonp = window.webpackJsonp || []).push([
    [183], {
        578: function(t, e, n) {
            "use strict";
            n.r(e), n.d(e, "initializeToasty", (function() {
                return u
            }));
            var i = document.querySelector(".js-event-text").dataset,
                s = i.textSignin,
                o = i.textTwitter,
                c = i.textGoogle,
                a = {
                    cta_text: "",
                    cta_type: "internal link",
                    destination_url: "",
                    has_cta: !0,
                    target_user_id: "",
                    toasty_text: "Welcome to Dribbble",
                    toasty_type: "sign up"
                },
                l = function(t) {
                    t.classList.contains("js-twitter-btn") ? a.cta_text = o : t.classList.contains("js-google-btn") ? a.cta_text = c : t.classList.contains("js-sign-up-btn") && (a.cta_text = s), Dribbble.Itly.toastyClicked(a)
                },
                r = function(t) {
                    t.classList.remove("visible"), localStorage.setItem("shouldHideToastySignUp", !0), a.cta_text = "", Dribbble.Itly.toastyDismissed(a)
                },
                u = function() {
                    setTimeout((function() {
                        var t = document.querySelector(".js-toasty-sign-up"),
                            e = document.querySelector("#credential_picker_container"),
                            n = !e || "none" === e.firstElementChild.style.display;
                        t && !localStorage.getItem("shouldHideToastySignUp") && n && (! function(t) {
                            var e = document.querySelector(".js-dismiss"),
                                n = document.querySelectorAll(".js-social-login-btn");
                            e.addEventListener("click", (function() {
                                r(t)
                            })), n.forEach((function(t) {
                                t.addEventListener("click", (function(e) {
                                    e.preventDefault(), l(t);
                                    var n = t.closest(".js-social-login-form");
                                    setTimeout((function() {
                                        n.submit()
                                    }), 2e3)
                                }))
                            }));
                            var i = document.querySelector(".js-sign-up-btn");
                            i.addEventListener("click", (function(t) {
                                t.preventDefault(), l(i), setTimeout((function() {
                                    window.location.href = "/signup/new"
                                }), 2e3)
                            }))
                        }(t), function(t) {
                            t.classList.add("visible")
                        }(t), Dribbble.Itly.toastyShown(a))
                    }), 8e3)
                };
            e.default = {
                initializeToasty: u
            }
        }
    }
]);
//# sourceMappingURL=183.6378502176e6b8cbb25f.js.map