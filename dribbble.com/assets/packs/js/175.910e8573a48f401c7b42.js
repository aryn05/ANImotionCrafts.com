(window.webpackJsonp = window.webpackJsonp || []).push([
    [175], {
        1120: function(n, e, t) {
            "use strict";
            t.r(e), t.d(e, "SiteNavV2", (function() {
                return c
            }));
            var a = function(n) {
                    requestAnimationFrame((function() {
                        requestAnimationFrame((function() {
                            n()
                        }))
                    }))
                },
                o = {
                    showAnnouncements: function() {
                        var n = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                            e = document.querySelector("[data-announcements]");
                        e && e.classList.toggle("announcements--visible", n)
                    },
                    nextAnnouncement: function() {
                        var n = document.querySelector("[data-announcement]:not(.announcement--hidden)");
                        if (n) {
                            fetch(n.getAttribute("data-announcement"), {
                                method: "POST"
                            });
                            var e = null == n ? void 0 : n.nextElementSibling;
                            e ? (n.classList.add("announcement--fade-out"), setTimeout((function() {
                                n.remove(), e.classList.remove("announcement--hidden"), e.classList.add("announcement--fade-out"), a((function() {
                                    e.classList.remove("announcement--fade-out")
                                }))
                            }), 300)) : this.showAnnouncements(!1)
                        }
                    },
                    init: function() {
                        var n = this,
                            e = document.querySelector("[data-announcements]"),
                            t = document.querySelector("[data-announcements-close]");
                        e && t && (document.body.prepend(e), t.addEventListener("click", this.nextAnnouncement.bind(this)), a((function() {
                            n.showAnnouncements()
                        })))
                    }
                },
                i = function() {
                    var n, e = !(null == (n = document.querySelector("[data-nav-v2-profile]")) || !n.classList.contains("nav-v2-profile--open")),
                        t = document.body.classList.contains("nav-v2-mobile-menu-open");
                    document.body.classList.toggle("nav-v2-lock-scroll", e || t)
                },
                c = {
                    bindTrackingEvents: function(n) {
                        var e = function(e, t) {
                            try {
                                if (n) {
                                    if ("function" !== typeof trackAmpliEvent) throw new Error("trackAmpliEvent() method not found");
                                    trackAmpliEvent(e, t)
                                } else {
                                    if ("function" !== typeof Dribbble.Itly[e]) throw new Error("Itly event '".concat(e, "' doesn't exist"));
                                    Dribbble.Itly[e](t)
                                }
                            } catch (a) {
                                console.warn("Error tracking nav event", a)
                            }
                        };
                        document.querySelectorAll("[data-nav-event-clicked]").forEach((function(n) {
                            n.addEventListener("click", (function() {
                                var t, a = {
                                    category: (null == (t = n.closest("[data-nav-event-category]")) ? void 0 : t.getAttribute("data-nav-event-category")) || "Top Nav",
                                    item: n.getAttribute("data-nav-event-clicked")
                                };
                                e("headerNavigationClicked", a)
                            }))
                        })), document.querySelectorAll("[data-nav-event-cta-clicked]").forEach((function(n) {
                            n.addEventListener("click", (function() {
                                var t, a, o, i, c, r = {
                                    currency: null != (t = null == (a = Dribbble) || null == (o = a.JsConfig) || null == (i = o.purchase) || null == (c = i.currency_conversion) ? void 0 : c.abbreviation) ? t : "USD",
                                    location: "Site Nav",
                                    product_name: n.getAttribute("data-nav-event-product-name") || "Pro",
                                    text: n.getAttribute("data-nav-event-cta-clicked") || n.textContent.trim()
                                };
                                e("purchaseCallToActionClicked", r)
                            }))
                        }))
                    },
                    bindMobileMenu: function() {
                        var n = document.querySelector("[data-nav-v2-burger]");
                        if (n) {
                            var e = function() {
                                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                                document.body.classList.toggle("nav-v2-mobile-menu-open", n), i()
                            };
                            n.addEventListener("click", (function(n) {
                                n.preventDefault(), e()
                            })), document.body.addEventListener("click", (function(n) {
                                var t = n.target.closest("[data-nav-v2-burger]"),
                                    a = n.target.closest("[data-nav-v2-mobile]");
                                t || a || e(!1)
                            }))
                        }
                    },
                    bindProfileDropdown: function() {
                        var n = document.querySelector("[data-nav-v2-profile]"),
                            e = document.querySelector("[data-nav-v2-avatar]");
                        if (n && e) {
                            var t = function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                                n.classList.toggle("nav-v2-profile--open", e), i()
                            };
                            e.addEventListener("click", (function(n) {
                                window.matchMedia("(min-width: 950px)").matches || (n.preventDefault(), t())
                            })), document.body.addEventListener("click", (function(n) {
                                var e = n.target.closest("[data-nav-v2-avatar]"),
                                    a = n.target.closest("[data-nav-v2-profile-wrapper]");
                                e || a || t(!1)
                            }))
                        }
                    },
                    fadeInDynamicNav: function() {
                        var n = document.querySelector("[data-nav-v2-dynamic]");
                        n && setTimeout((function() {
                            n.classList.add("nav-v2-dynamic--loaded")
                        }), 0)
                    },
                    init: function() {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            e = n.isFramer,
                            t = void 0 !== e && e;
                        this.fadeInDynamicNav(), this.bindProfileDropdown(), this.bindTrackingEvents(t), o.init(), t || this.bindMobileMenu()
                    }
                };
            e.default = c
        }
    }
]);
//# sourceMappingURL=175.910e8573a48f401c7b42.js.map