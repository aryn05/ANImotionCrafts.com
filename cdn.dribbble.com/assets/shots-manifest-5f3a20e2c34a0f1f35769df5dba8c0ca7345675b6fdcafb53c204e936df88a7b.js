Dribbble.InfiniteScroll = {
        paginationContainerHTML: '<div class="loading-more"><span class="processing">Loading more\u2026</span></div>',
        genericLoadingIndicator: function() {
            return {
                retry: function(t) {
                    this.reset(), t.disabledNext = !1, t.fetchNextPage()
                },
                hide: $.noop,
                reset: $.noop,
                show: $.noop,
                showErrorEncountered: $.noop,
                showReachedEnd: $.noop,
                showThrottled: $.noop
            }
        },
        jqueryLoadingIndicator: function(t, e) {
            var i = $(t),
                n = function(t) {
                    i.html('<span class="null-message">' + t + "</span>").show()
                };
            return $.extend({}, new Dribbble.InfiniteScroll.genericLoadingIndicator, {
                $el: i,
                selector: t,
                originalContent: i.html(),
                show: function() {
                    i.show()
                },
                hide: function() {
                    i.hide()
                },
                reset: function() {
                    i.html(this.originalContent)
                },
                showCustomEnd: function(t) {
                    i.html(t)
                },
                showReachedEnd: function() {
                    n(e && e.text || "You\u2019ve reached the end of the list"), e && e.cb && e.cb()
                },
                showErrorEncountered: function() {
                    n("Something went wrong\u2026")
                },
                showThrottled: function(e) {
                    i.html('<div class="rate-limited"><a href="#" class="load-next-page">Load more\u2026</a> <span>You\u2019ve exceeded our rate limits, so you may need to wait a minute or so. <a href="https://help.dribbble.com/#rate-limits" target="_blank">(more info)</a><span></div>'), i.find("a.load-next-page").on("click", function(t) {
                        t.preventDefault(), this.retry(e)
                    }.bind(this))
                }
            })
        },
        horizontalScrollingIndicator: function(t) {
            return $.extend({}, new Dribbble.InfiniteScroll.genericLoadingIndicator, {
                show: function() {
                    t.append("<div class='processing' />")
                },
                hide: function() {
                    t.find(".processing").remove()
                },
                showReachedEnd: function() {
                    this.hide()
                },
                showErrorEncountered: function() {
                    this.hide()
                },
                reset: function() {
                    t.find(".rate-limited").remove(), this.hide()
                },
                showThrottled: function(e) {
                    this.hide(), t.append('<li class="rate-limited"><a href="#" class="load-next-page">Load more\u2026</a> <span>You\u2019ve exceeded our rate limits, so you may need to wait a minute or so. <a href="https://help.dribbble.com/#rate-limits" target="_blank">(more info)</a><span></li>'), t.find(".load-next-page").on("click", function(t) {
                        t.preventDefault(), this.retry(e)
                    }.bind(this))
                }
            })
        }
    }, Dribbble.InfiniteScroll.Generic = function(t) {
        this.initialize(t)
    }, Dribbble.InfiniteScroll.Generic.prototype = {
        $el: null,
        scrollable: null,
        itemSelector: null,
        perPage: null,
        buffer: null,
        baseUrl: document.location.toString(),
        autoLoadPageLimit: null,
        autofill: !0,
        disabledNext: !1,
        initiallyDisabled: !1,
        loading: !1,
        reachedEnd: !1,
        throttleTime: 25,
        lastPosition: 0,
        loadingIndicator: null,
        unique: !1,
        loadMoreCallback: null,
        pageLoadCallback: null,
        staticParams: {},
        responseDataKey: null,
        reachedEndText: null,
        reachedEndFn: null,
        blockDuplicates: !1,
        initialize: function(t) {
            for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
            this.$el = $(t.$el), this.scrollable = this.scrollable || this.$el, Dribbble.Globals.throttle().then(function(t) {
                this.isScrolling = t(this.isScrolling.bind(this), this.throttleTime)
            }.bind(this)), this.loadingIndicator = this.loadingIndicator || new Dribbble.InfiniteScroll.jqueryLoadingIndicator(this.loadingIndicatorSelector, {
                text: this.reachedEndText,
                cb: this.reachedEndFn
            }), this.initAppendedResults(), this.setPage(t.page), this.bindEventListeners()
        },
        initAppendedResults: function() {
            this.blockDuplicates && (this.appendedResults = new Set, $(this.itemSelector).each(function(t, e) {
                this.appendedResults.add(e.getAttribute("data-id"))
            }.bind(this)))
        },
        reset: function(t, e) {
            this.initAppendedResults();
            e = e || {};
            this.baseUrl = t || this.baseUrl, this.httpMethod = e.method || "GET", this.data = e.data, this.currentXhr && this.currentXhr.abort(), this.reachedEnd = !1, this.disabledNext = !1, this.initiallyDisabled = !1, this.$el.empty(), this.loaded = 0, this.resetPage(), this.setLoading(!1), this.fetchNextPage(function() {
                Dribbble.LargeShotViewRecorder && Dribbble.LargeShotViewRecorder.start()
            })
        },
        resetFromStart: function(t) {
            this.initAppendedResults(), this.baseUrl = t || this.baseUrl, this.reachedEnd = !1, this.disabledNext = !1, this.initiallyDisabled = !1, this.loaded = 0, this.setPage(1), this.setLoading(!1), this.loadingIndicator.reset(), Dribbble.LargeShotViewRecorder && Dribbble.LargeShotViewRecorder.start()
        },
        disable: function() {
            this.disabledNext = !0
        },
        bindEventListeners: function() {
            $(window).on("unload", this.onUnload.bind(this)).ready(this.onReady.bind(this))
        },
        onUnload: function() {
            $(window).scrollTop(0)
        },
        onReady: function() {
            if (this.unique && $(this.scrollable).off("scroll.infinite"), $(this.scrollable).on("scroll.infinite", this.isScrolling.bind(this)), this.deferredContentLoader) return this.deferredContentLoader();
            var t = this.$el.find(this.itemSelector);
            if (this._noMoreItemsToLoad(t)) return this.reachedEnd = !0, void this.setLoading(!1);
            this.initiallyDisabled || (this.disabledNext = !1), this.autofill && this.fetchNextPageIfNeeded()
        },
        isScrolling: function() {
            var t = this.scrollPosition();
            if (this.$el.toggleClass("is-scrolled", 0 < t), this.internalOnScroll && this.internalOnScroll(t), !this.reachedEnd) {
                this.onScroll && this.onScroll.apply(this, [t]);
                var e = t > this.lastPosition;
                this.lastPosition = t, this.loading || e && this.fetchNextPageIfNeeded(t)
            }
        },
        fetchNextPageIfNeeded: function(t) {
            this.initiallyDisabled || this.disabledNext || this.noLongerInDom() || this.containerNotVisible() || this.distanceToEnd(t) > this.buffer || this.fetchNextPage()
        },
        fetchNextPage: function(t) {
            if (!this.loading) return this.setLoading(!0), this.fetchPage(this.page.last + 1, t), !1
        },
        fetchPage: function(t, i) {
            var e = this.urlForPage(t);
            this.onFetchPage && this.onFetchPage(t, e);
            var n = function(t) {
                    var e = this.responseDataKey ? t[this.responseDataKey] : t;
                    202 == this.currentXhr.status ? (this.requestedShotCount = this._perPage(), this.delay = (this.delay || 0) + 150, setTimeout(function() {
                        this.fetchPage()
                    }.bind(this), this.delay)) : (this.showNextPage(e), i && i())
                }.bind(this),
                s = {
                    context: this,
                    success: n,
                    error: this.showError,
                    method: this.httpMethod || "GET",
                    data: {}
                };
            this.data && (s.data = this.data), this.searchParams && (s.data.search = JSON.stringify(this.searchParams)), this.currentXhr = $.ajax(e, s)
        },
        append: function(t) {
            this.$el.append(t)
        },
        noLongerInDom: function() {
            var t = $(this.scrollable)[0];
            return t != window && !$.contains(document.documentElement, t)
        },
        containerNotVisible: function() {
            return !this.$el.is(":visible")
        },
        showNextPage: function(t) {
            var e, i;
            if (this.page.last++, this.jsonItems ? (e = this.jsonItems(t), this.append(t, this.page.last)) : (e = $(t).filter(this.itemSelector), this.onBeforeAppend ? e = this.onBeforeAppend(e) : this.appendedResults && (i = e.filter(function(t, e) {
                    var i = e.getAttribute("data-id");
                    if (!this.appendedResults.has(i)) return e
                }.bind(this))), this.append(i || e, this.page.last), $("body").append($(t).filter("script")), Dribbble.MediaSwap && new Dribbble.MediaSwap("[data-video-teaser-small][data-video-teaser-large]")), this.loaded += e.length, this.emitAppendEvent(), this.appendedResults && e.each(function(t, e) {
                    this.appendedResults.add(e.getAttribute("data-id"))
                }.bind(this)), this.onAfterAppend && this.onAfterAppend(e), this.setLoading(!1), this._noMoreItemsToLoad(e)) this.disabledNext = !0, this.reachedEnd = !0, document.querySelector(this.itemSelector) && this.loadingIndicator.showReachedEnd(), $(this.loadNextButtonSelector).hide();
            else if (this._reachedAutoPageLimit()) {
                this.disabledNext = !0, $(this.loadNextButtonSelector).show(), this.nextButtonCanLoadMore && !this.nextButtonCanLoadMore() && (this.reachedEnd = !0), this.loadMoreCallback && this.loadMoreCallback(this)
            } else this.pageLoadCallback ? this.pageLoadCallback(this) : this.autofill && this.fetchNextPageIfNeeded()
        },
        emitAppendEvent: function() {
            var t = new Event("dribbble.infinitescroll.append", {
                bubbles: !0
            });
            document.dispatchEvent(t)
        },
        _fewerItemsThanRequested: function(t) {
            return t.length < this.requestedShotCount
        },
        _reachedAutoPageLimit: function() {
            return this.autoLoadPageLimit && this.page.last % this.autoLoadPageLimit == 0
        },
        _noMoreItemsToLoad: function(t) {
            var e = (this.$el && this.$el[0] ? this.$el[0] : document.querySelector(".js-thumbnail-grid")).children[0] !== t[0];
            return this.requestedShotCount && e ? t.length + 1 < this.requestedShotCount : this.requestedShotCount ? t.length < this.requestedShotCount : t.length < this._perPage()
        },
        _perPage: function() {
            return "function" == typeof this.perPage ? this.perPage() : this.perPage
        },
        setLoading: function(t) {
            (this.loading = t) && $(this.loadNextButtonSelector).hide(), this.loadingIndicator[t ? "show" : "hide"]()
        },
        resetPage: function() {
            this.setPage(0)
        },
        setPage: function(t) {
            t = void 0 !== t ? t : 1;
            var e = this.baseUrl.match(/page=(\d+)/);
            e && (t = parseInt(e[1], 10)), this.page = {
                first: t,
                last: t
            }
        },
        showError: function(t) {
            if ("abort" != (t = t || {}).statusText) {
                if (403 == t.status || 429 == t.status) return this.loading = !1, void this.loadingIndicator.showThrottled(this);
                404 == t.status ? this.loadingIndicator.showReachedEnd() : 401 == t.status ? this.loadingIndicator.showCustomEnd(t.responseText) : this.loadingIndicator.showErrorEncountered(t), this.disabledNext = !0, this.reachedEnd = !0, $(this.loadNextButtonSelector).hide()
            }
        },
        queryParamsForPage: function(t) {
            var e = {
                page: t,
                per_page: this._perPage()
            };
            return $.extend(e, this.extraParams(t), this.staticParams)
        },
        allowedParamsForPage: function() {
            var e = {},
                t = window.location.search.substring(1).split("&"),
                i = ["keyword", "color", "timeframe", "source_file"];
            return $.each(t, function() {
                var t = this.split("="); - 1 !== i.indexOf(t[0]) && (e[t[0]] = t[1])
            }), e
        },
        extraParams: function() {
            return {}
        },
        urlForPage: function(t) {
            var e = this.queryParamsForPage(t),
                i = this.baseUrl.split("#")[0];
            return $.extend(e, this.allowedParamsForPage()), -1 < i.indexOf("?") ? i + "&" + $.param(e) : i + "?" + $.param(e)
        }
    }, Dribbble.InfiniteScroll.Vertical = function(t) {
        this.initialize(t)
    }, Dribbble.InfiniteScroll.Vertical.prototype = $.extend({}, Dribbble.InfiniteScroll.Generic.prototype, {
        buffer: window.innerHeight,
        scrollable: window,
        bindEventListeners: function() {
            Dribbble.InfiniteScroll.Generic.prototype.bindEventListeners.apply(this), this.$backToTop && this.$backToTop.on("click", function() {
                $("html,body").animate({
                    scrollTop: 0,
                    display: "none"
                }, 500)
            })
        },
        distanceToEnd: function(t) {
            return this.$el.height() - $(this.scrollable).height() - (t || this.scrollPosition())
        },
        internalOnScroll: function(t) {
            this.$backToTop && !Dribbble.isMobile() && (50 < t ? this.$backToTop.fadeIn(100) : this.$backToTop.fadeOut(100));
            var e = document.querySelector(".js-site-footer");
            e && (t > e.offsetTop - window.innerHeight ? this.$backToTop.addClass("back-to-top-absolute") : this.$backToTop.removeClass("back-to-top-absolute"))
        },
        scrollPosition: function() {
            return $(this.scrollable).scrollTop()
        }
    }), Dribbble.InfiniteScroll.Horizontal = function(t) {
        this.initialize(t)
    }, Dribbble.InfiniteScroll.Horizontal.prototype = $.extend({}, Dribbble.InfiniteScroll.Generic.prototype, {
        initialize: function(t) {
            Dribbble.InfiniteScroll.Generic.prototype.initialize.apply(this, [t]), this.buffer = Math.min(.75 * this.$el.width(), 500), $(this.scrollable).on("click", ".scroll-backward a", this.scrollBackward.bind(this)), $(this.scrollable).on("click", ".scroll-forward a", this.scrollForward.bind(this))
        },
        distanceToEnd: function(t) {
            var e = (t || this.scrollPosition()) + $(this.scrollable).width();
            return this.$el[0].scrollWidth - e
        },
        scrollPosition: function() {
            return $(this.scrollable).scrollLeft()
        },
        scrollBackward: function(t) {
            this.scrollInDirection(t, -1)
        },
        scrollForward: function(t) {
            this.scrollInDirection(t, 1)
        },
        scrollInDirection: function(t, e) {
            t.preventDefault();
            var i = 80;
            $(this.scrollable).animate({
                scrollLeft: this.scrollPosition() + ($(this.scrollable).width() - i) * e
            }, 800)
        }
    }), Dribbble.InfiniteScroll.Vertical.Simple = function(t) {
        this.initialize(t)
    }, Dribbble.InfiniteScroll.Vertical.Simple.prototype = $.extend({}, Dribbble.InfiniteScroll.Vertical.prototype, {
        initialize: function(t) {
            $(t.paginationContainerSelector || "div.page").find(".pagination").hide(), $(Dribbble.InfiniteScroll.paginationContainerHTML).insertAfter(t.$el);
            var e = $.extend({}, t, {
                loadingIndicatorSelector: ".loading-more",
                $backToTop: t.$backToTop || $("div.back-to-top")
            });
            Dribbble.InfiniteScroll.Vertical.prototype.initialize.apply(this, [e])
        }
    }),
    function(t) {
        var e = !1;
        if ("function" == typeof define && define.amd && (define(t), e = !0), "object" == typeof exports && (module.exports = t(), e = !0), !e) {
            var i = window.Cookies,
                n = window.Cookies = t();
            n.noConflict = function() {
                return window.Cookies = i, n
            }
        }
    }(function() {
        function p() {
            for (var t = 0, e = {}; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) e[n] = i[n]
            }
            return e
        }

        function t(m) {
            function f(t, e, i) {
                var n;
                if ("undefined" != typeof document) {
                    if (1 < arguments.length) {
                        if ("number" == typeof(i = p({
                                path: "/"
                            }, f.defaults, i)).expires) {
                            var s = new Date;
                            s.setMilliseconds(s.getMilliseconds() + 864e5 * i.expires), i.expires = s
                        }
                        i.expires = i.expires ? i.expires.toUTCString() : "";
                        try {
                            n = JSON.stringify(e), /^[\{\[]/.test(n) && (e = n)
                        } catch (b) {}
                        e = m.write ? m.write(e, t) : encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                        var r = "";
                        for (var o in i) i[o] && (r += "; " + o, !0 !== i[o] && (r += "=" + i[o]));
                        return document.cookie = t + "=" + e + r
                    }
                    t || (n = {});
                    for (var a = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, h = 0; h < a.length; h++) {
                        var d = a[h].split("="),
                            c = d.slice(1).join("=");
                        '"' === c.charAt(0) && (c = c.slice(1, -1));
                        try {
                            var u = d[0].replace(l, decodeURIComponent);
                            if (c = m.read ? m.read(c, u) : m(c, u) || c.replace(l, decodeURIComponent), this.json) try {
                                c = JSON.parse(c)
                            } catch (b) {}
                            if (t === u) {
                                n = c;
                                break
                            }
                            t || (n[u] = c)
                        } catch (b) {}
                    }
                    return n
                }
            }
            return (f.set = f).get = function(t) {
                return f.call(f, t)
            }, f.getJSON = function() {
                return f.apply({
                    json: !0
                }, [].slice.call(arguments))
            }, f.defaults = {}, f.remove = function(t, e) {
                f(t, "", p(e, {
                    expires: -1
                }))
            }, f.withConverter = t, f
        }
        return t(function() {})
    }), Dribbble.ShotOverlay = {
        $el: null,
        active: !1,
        infiniteScroller: null,
        originalUrl: null,
        shotClickTargetSelector: null,
        shotElSelector: null,
        currentShotId: null,
        isRestictedNav: !1,
        scrollToId: null,
        isSimpleModal: !1,
        isOpen: !1,
        shotOverlay: document.querySelector(".js-shot-overlay"),
        closeOverlay: document.querySelector(".js-close-overlay"),
        overlayContent: document.querySelector(".js-overlay-content"),
        $currentShotEl: function() {
            return this.$el && this.$el.find("#screenshot-" + this.currentShotId).last()
        },
        $next: function() {
            return this.$currentShotEl() && this.$currentShotEl().nextAll(this.shotElSelector).first()
        },
        $prev: function() {
            return this.$currentShotEl() && this.$currentShotEl().prevAll(this.shotElSelector).first()
        },
        init: function(t) {
            t = t || {}, document.body.classList.contains("logged-out") && (this.isRestictedNav = !0), this.$nextButton = $(this.shotOverlay.querySelector(".shot-nav-next")), this.$prevButton = $(this.shotOverlay.querySelector(".shot-nav-prev")), t.infiniteScroller && this.setInfiniteScroller(t.infiniteScroller), this.isSimpleModal = t.isSimpleModal, this.isDesignerSearchCard = t.isDesignerSearchCard, this.isMinimalLayout = t.isMinimalLayout, this.showSimilarShots = t.showSimilarShots, this.originalUrl = t.originalUrl, this.shotClickTargetSelector = t.shotClickTargetSelector, this.shotElSelector = t.shotElSelector, this.onTrigger = t.onTrigger || $.noop, this.bindEventListeners(), this.active = !0
        },
        setInfiniteScroller: function(t) {
            this.infiniteScroller = t, this.infiniteScroller ? (this.$el = this.infiniteScroller.$el, this.infiniteScroller.onAfterAppend = this.addShotsToList.bind(this)) : this.$el = null
        },
        ignoreClick: function(t) {
            return t.shiftKey || t.ctrlKey || t.metaKey
        },
        isLightboxOpen: function() {
            return document.body.classList.contains("is-lightbox-open")
        },
        bindEventListeners: function() {
            this.boundNextEvent = this.nextEvent.bind(this), this.boundPrevEvent = this.prevEvent.bind(this), this.boundClose = this.close.bind(this), this.boundOpenRelatedShot = this.openRelatedShot.bind(this), this.boundOpenMoreByShot = this.openMoreByShot.bind(this), this.boundHandleModalClick = this.handleModalClick.bind(this), this.$mobileHiddenElements = $("#wrap, .js-site-nav, #footer"), $(document.body).on("click", this.shotClickTargetSelector, function(t) {
                if (this.onTrigger && this.onTrigger(t), !this.ignoreClick(t)) return this.open($(t.currentTarget), !1, null), !1
            }.bind(this)), Dribbble.Hotkeys.map("screenshots", {
                ESCAPE: function() {
                    this.isOpen && !this.isLightboxOpen() && this.close()
                }.bind(this)
            }, function() {
                return !Dribbble.Attachments.overlayVisible() && !Dribbble.Overlay.anyOpen()
            })
        },
        nextEvent: function(t) {
            this.isLightboxOpen() || (t.preventDefault(), t.stopPropagation(), this.setNavLink($(".shot-nav-next a"), this.isRestictedNav, this.$next()))
        },
        prevEvent: function(t) {
            this.isLightboxOpen() || (t.preventDefault(), t.stopPropagation(), this.setNavLink($(".shot-nav-prev a"), this.isRestictedNav, this.$prev()))
        },
        handleModalClick: function(t) {
            this.overlayContent.contains(t.target) || this.close()
        },
        openRelatedShot: function(t) {
            if (!this.ignoreClick(t)) return this.open($(t.currentTarget), !0), !1
        },
        openMoreByShot: function(t) {
            if (t.preventDefault(), this.ignoreClick(t) || !this.showSimilarShots) return this.open($(t.target), !0), !1;
            $.ajax("/client_app/states/show_similar_work?value=off", {
                method: "PUT",
                success: function() {
                    return this.open($(t.target), !0), !1
                }.bind(this),
                error: function() {
                    return this.open($(t.target), !0), !1
                }.bind(this),
                complete: function() {
                    $.ajax("/client_app/states/show_similar_work?value=on", {
                        method: "PUT"
                    })
                }
            })
        },
        removeOpenEventListeners: function() {
            this.$nextButton.off("click", this.boundNextEvent), this.$prevButton.off("click", this.boundPrevEvent), this.closeOverlay.removeEventListener("click", this.boundClose), this.shotOverlay.removeEventListener("click", this.boundHandleModalClick), $(document.body).off("click", ".rebound-title a, .more-thumbs li a, .js-similar-work .js-shot-link", this.boundOpenRelatedShot), $(document.body).off("click", ".js-more-by .js-shot-link", this.boundOpenMoreByShot)
        },
        addOpenEventListeners: function() {
            this.$nextButton.on("click", this.boundNextEvent), this.$prevButton.on("click", this.boundPrevEvent), this.closeOverlay.addEventListener("click", this.boundClose), this.shotOverlay.addEventListener("click", this.boundHandleModalClick), $(document.body).on("click", ".rebound-title a, .more-thumbs li a, .js-similar-work .js-shot-link", this.boundOpenRelatedShot), $(document.body).on("click", ".js-more-by .js-shot-link", this.boundOpenMoreByShot)
        },
        open: function(t, e, i) {
            this.isOpen || this.addOpenEventListeners(), this.isOpen = !0;
            var n = t.attr("href") || t.data("href"),
                s = {
                    "steps-from-list": this.stepsToListPage() + 1,
                    "disable-nav": !!e
                };
            this.scrollToId ? (s["scroll-to-id"] = this.scrollToId, this.scrollToId = null) : document.querySelector(".js-overlay-content").scrollTop = 0, Dribbble.Router.pushState(s, null, n), i && i()
        },
        close: function() {
            this.isOpen = !1, this.removeOpenEventListeners(), this.stepsToListPage() > window.history.length ? Dribbble.Router.pushState(null, null, this.originalUrl) : Dribbble.Router.go(-this.stepsToListPage())
        },
        show: function(t, e) {
            this.infiniteScroller && (this.infiniteScroller.autofill = !1), t.match(/shots\/(\d+)/) && (this.currentShotId = t.match(/shots\/(\d+)/)[1]), Dribbble.EventBus.$emit("shot-overlay:show", {
                shotId: this.currentShotId
            });
            var i = !1;
            (this.isDesignerSearchCard && (i = (i ? i + "&" : "") + "isDesignerSearchCard=true"), this.isMinimalLayout && (i = (i ? i + "&" : "") + "isMinimalLayout=true"), this.showSimilarShots && (i = (i ? i + "&" : "") + "showSimilarShots=true"), i && (t = t + "?" + i), this.hideNavArrows(), this.shotOverlay.classList.contains("lazyload") || this.shotOverlay.classList.contains("lazyloading") || this.shotOverlay.classList.contains("lazyloaded") || this.shotOverlay.classList.add("lazyload"), this.overlayContent.innerHTML = this.loadingTemplate().trim(), this.shotOverlay.classList.add("overlay-visible"), this.overlayContent.focus(), this.shotOverlay.classList.remove("overlay-hide"), $(".tipsy").remove(), Dribbble.HoverCards && Dribbble.HoverCards.dismiss(), Dribbble.isMobile()) ? (this.overlayContent.querySelectorAll("[rel=tipsy]").forEach(function(t) {
                t.setAttribute("original-title", "")
            }), this.lastScrollPosition = window.pageYOffset, window.scrollTo(0, 0), this.$mobileHiddenElements.hide()) : document.body.classList.add("noscroll");
            $.ajax(t, {
                dataType: "html",
                context: this,
                cache: !1,
                headers: {
                    "X-Alt-Referer": e
                },
                success: function(t) {
                    if (this.overlayContent.innerHTML = t, this.overlayContent.querySelectorAll("script").forEach(function(t) {
                            var e = document.createElement("script");
                            Array.from(t.attributes).forEach(function(t) {
                                e.setAttribute(t.name, t.value)
                            }), e.appendChild(document.createTextNode(t.innerHTML)), t.parentNode.replaceChild(e, t)
                        }), Dribbble.EventBus.$emit("shot-overlay:shown", {
                            shotId: this.currentShotId
                        }), User.loggedOut() && Dribbble.SignupModal.overlay.bindTrigger(), Dribbble.Hotkeys.TextAreaSubmission.fillShortcuts(), !this.isSimpleModal && this.shouldShowNav()) {
                        var e = this.$prev(),
                            i = this.$next();
                        i[0] || !this.infiniteScroller || this.infiniteScroller.reachedEnd || (this.infiniteScroller.disabledNext = !1, this.infiniteScroller.fetchNextPage()), e[0] && this.showPrevButton(e), i[0] && this.showNextButton(i)
                    }
                }
            })
        },
        hide: function() {
            Dribbble.EventBus.$emit("shot-overlay:hide"), this.infiniteScroller && (this.infiniteScroller.autofill = !0), this.$mobileHiddenElements.show(), document.body.classList.remove("noscroll"), Dribbble.isMobile() && window.scrollTo(this.lastScrollPosition, 0), this.shotOverlay.classList.add("overlay-hide"), this.shotOverlay.classList.remove("overlay-visible"), setTimeout(function() {
                this.overlayContent.innerHTML = "", Dribbble.EventBus.$emit("shot-overlay:hidden")
            }.bind(this), 400)
        },
        shouldShowNav: function() {
            return !History.getState().data["disable-nav"]
        },
        stepsToListPage: function() {
            return History.getState().data["steps-from-list"] || 0
        },
        showNextButton: function(t) {
            t[0] && this.$nextButton.show()
        },
        showPrevButton: function(t) {
            t[0] && this.$prevButton.show()
        },
        hideNavArrows: function() {
            this.$nextButton.hide(), this.$prevButton.hide()
        },
        setRestricted: function(t) {
            this.isRestictedNav = t || !1
        },
        setNavLink: function(t, e, i) {
            return Dribbble.EventBus.$emit("shot-overlay:navigate"), e ? (this.close(), Dribbble.SignupModal.open(t, {
                context: "shot-navigation"
            })) : (this.open(this.findSiblingLink(i)), !1)
        },
        findSiblingLink: function(t) {
            return t.attr("href") ? t : t.find(".js-shot-link")
        },
        addShotsToList: function(t) {
            t.length && this.showNextButton(this.$next())
        },
        loadingTemplate: function() {
            var t = Cookies.get("comments_sidebar_open");
            return '<div class="shot-loading-template-container ' + (t && "true" == t ? "has-sidebar" : "") + '"><div class="loading-template animate-translate field shot-heading-loading"></div><div class="shot-header-loading-container"><div class="loading-template animate-translate avatar"></div><div class="shot-attributes-loading-container"><div class="loading-template animate-translate bar"></div><div class="loading-template animate-translate bar"></div></div></div><div class="mobile-actions-loading-container"><div class="display-flex justify-center flex-grow-0"><div class="loading-template animate-translate button icon"></div><div class="loading-template animate-translate button margin-l-8 icon"></div></div><div class="display-flex justify-center flex-grow-0"><div class="loading-template animate-translate button icon"></div><div class="loading-template animate-translate button margin-l-8 icon"></div></div></div><div class="loading-template animate-translate shot"></div><div class="shot-description-loading-container"><div class="loading-template animate-translate bar"></div><div class="loading-template animate-translate bar"></div><div class="loading-template animate-translate bar"></div><div class="loading-template animate-translate bar"></div></div><div class="shot-sidebar-loading-container"><div class="display-flex justify-flex-end flex-grow-0 margin-b-48"><div class="loading-template animate-translate button margin-r-16 icon"></div><div class="loading-template animate-translate button icon"></div></div><div class="loading-template animate-translate bar w-50 h-large margin-b-12"></div><div class="loading-template animate-translate bar hx-60"></div></div></div>'
        }
    }, Dribbble.Thumbnails = {
        AUTOMATIC_LIMIT: 4,
        DEFAULT_PER_PAGE: 24,
        originalUrl: document.location.toString(),
        initialize: function(t) {
            if (t.showBoostedAds && Dribbble.EventBus.$emit("infinite-thumbnails:initialized", {
                    collection: this.thumbnailsArray(),
                    perPage: this.calculatePerPage(),
                    placement: t.boostedAdPlacement,
                    params: t.boostedAdParams,
                    numberOfAdsOnFirstPage: t.numberOfAdsOnFirstPage,
                    numberOfAdsOnSubsequentPages: t.numberOfAdsOnSubsequentPages,
                    adGroupPositions: t.boostedAdGroupPositions
                }), this.gridClass = ".js-thumbnail-grid", Dribbble.isHistorySupported() && document.querySelector(this.gridClass)) {
                this.findElements(), this.infiniteScroller = new Dribbble.InfiniteScroll.Vertical(this.scrollerOptions(t)), t.enable_shot_overlay && Dribbble.ShotOverlay.init({
                    infiniteScroller: this.infiniteScroller,
                    originalUrl: this.originalUrl,
                    showSimilarShots: t.showSimilarShots,
                    shotClickTargetSelector: ".js-thumbnail-grid:not(.selectable) .js-shot-link, .js-thumbnail-grid:not(.selectable) a.dribbble-over",
                    shotElSelector: ".js-thumbnail"
                });
                var e = ".js-thumbnail-placeholder";
                Dribbble.AnimatedGifSwap && Dribbble.AnimatedGifSwap.attach(".js-thumbnail-base.gif", {
                    parentSelector: ".js-thumbnail:first",
                    picSelector: e
                }), Dribbble.MediaSwap && new Dribbble.MediaSwap("[data-video-teaser-small][data-video-teaser-large]"), this.bindEventListeners()
            }
        },
        bindEventListeners: function() {
            this.loadNextButton.find(".load-more").on("click", function() {
                this.infiniteScroller.disabledNext = !1, this.infiniteScroller.fetchNextPage()
            }.bind(this))
        },
        onFetchPage: function(t, e) {
            Dribbble.Analytics.logDribbbleGAPageView(e), Dribbble.Itly && Dribbble.Itly.pageViewed({
                url: e
            })
        },
        findElements: function() {
            var t = $("#main"),
                e = Dribbble && Dribbble.JsConfig && Dribbble.JsConfig.isRobot;
            this.list = t.find(".js-thumbnail-grid"), this.loadNextButton = t.find(".infinite:not(.previous)"), this.footer = $(".secondary"), this.footer.is(":visible") || (this.footer = $("#footer")), e || t.find(".page").remove()
        },
        refreshList: function(t, e) {
            this.infiniteScroller.reset(t, e)
        },
        thumbnailsArray: function() {
            var t = document.querySelectorAll(".js-thumbnail-grid")[0],
                e = Array.prototype.slice.call(t.querySelectorAll(":scope > li[data-thumbnail-id]")),
                i = t.children[0];
            return i && i !== e[0] && e.unshift(i), e
        },
        calculatePerPage: function() {
            var t = this.thumbnailsArray();
            if (0 == t.length) return this.DEFAULT_PER_PAGE;
            var e = t.slice(0, 8),
                i = e[0].getBoundingClientRect().top,
                n = t.filter(function(t) {
                    return t.getBoundingClientRect().top == i
                }).length;
            2 <= e.length && e[0].offsetWidth > e[1].offsetWidth && n++;
            var s = Math.ceil((t.length + this.DEFAULT_PER_PAGE) / n) * n - t.length;
            return 2 <= e.length && e[0].offsetWidth > e[1].offsetWidth && s--, s
        },
        thumbnailsToOmit: function() {
            return {
                exclude_shot_ids: this.thumbnailsArray().map(function(t) {
                    return t.dataset.thumbnailId
                }).slice(-50).join(",")
            }
        },
        scrollerOptions: function(t) {
            var e = {
                $el: this.list,
                itemSelector: ".js-thumbnail[data-thumbnail-id]",
                loadNextButtonSelector: ".infinite:not(.previous)",
                loadingIndicatorSelector: ".loading-more:not(.previous)",
                perPage: this.calculatePerPage.bind(this),
                requestedShotCount: this.DEFAULT_PER_PAGE,
                extraParams: this.thumbnailsToOmit.bind(this),
                autoLoadPageLimit: t.page_limit || this.AUTOMATIC_LIMIT,
                onFetchPage: this.onFetchPage.bind(this),
                buffer: window.innerHeight - this.footer.height(),
                $backToTop: $("div.back-to-top"),
                unique: !0,
                staticParams: t.staticParams || {},
                nextButtonCanLoadMore: function() {
                    return !document.querySelector(".sign-up-to-continue")
                },
                append: function(t, e) {
                    var i = this.$el.find(this.itemSelector).map(function() {
                        return this.id
                    });
                    t = $.grep(t, function(t) {
                        return -1 === $.inArray(t.id, i)
                    }), this.$el.append(t), Dribbble.DowngradeHiddenTracking && (Dribbble.DowngradeHiddenTracking.removeEventListeners(), Dribbble.DowngradeHiddenTracking.bindEventListeners()), Dribbble.EventBus.$emit("infiniteScroll:appendedMore", {
                        scrollPage: e
                    })
                }
            };
            return t.deferredContent && (e = $.extend(e, {
                deferredContentLoader: this.refreshList.bind(this),
                extraParams: function(t) {
                    var e = {
                        cursor: Dribbble.Thumbnails.cursor,
                        page: t
                    };
                    return $.extend(e, this.thumbnailsToOmit())
                }.bind(this),
                resetPage: function() {
                    Dribbble.Thumbnails.cursor = null, this.setPage(0)
                }
            })), t.cursor && (e = $.extend(e, {
                noMoreItemsToLoad: function() {
                    return Dribbble.Thumbnails.noMoreItemsToLoad
                },
                extraParams: function(t) {
                    var e = {
                        cursor: Dribbble.Thumbnails.cursor,
                        page: t,
                        sig: Dribbble.Thumbnails.signature
                    };
                    return $.extend(e, this.thumbnailsToOmit())
                }.bind(this),
                resetPage: function() {
                    Dribbble.Thumbnails.cursor = null, this.setPage(0)
                }
            })), e
        }
    };
var Screenshot = {
        Like: {
            Shot: {
                toggle: function(t) {
                    function n(t) {
                        a ? t.addClass("current-user-likes highlighted").attr("href", t.data("unlikePath")) : t.removeClass("current-user-likes highlighted").attr("href", t.data("likePath"))
                    }

                    function s() {
                        if (u) {
                            var t = Number(u.textContent);
                            u.textContent = a ? t + 1 : t - 1
                        }
                    }
                    t.preventDefault();
                    var e = t.currentTarget === document ? t.target : t.currentTarget,
                        i = document.querySelector(".actions [data-primary-like=true]"),
                        r = "click" === t.type ? e : i;
                    if (document.querySelector(".logged-in") && null !== r) {
                        if (r.className.indexOf("processing")) {
                            var o = r.href,
                                a = !(0 <= r.className.indexOf("current-user-likes")),
                                l = a ? {} : {
                                    _method: "delete"
                                },
                                h = r.dataset.screenshotId,
                                d = "true" === r.dataset.isFromModal,
                                c = "true" === r.dataset.isCompact,
                                u = document.querySelector(".js-shot-page-like-count");
                            $.ajax({
                                type: "POST",
                                url: o,
                                data: l,
                                beforeSend: function() {
                                    r.classList.add("processing"), Dribbble.EventBus.$emit("shotLike:processing")
                                },
                                success: function(t) {
                                    if (d) {
                                        var e = $(".like-action-" + h + ".modal-true");
                                        $(e).replaceWith(t), n($(".like-action-" + h).not(".modal-true").find(".like-shot")), s()
                                    } else if (c) {
                                        e = $(".like-action-" + h + ".compact-true");
                                        $(e).replaceWith(t), n($(".like-action-" + h).not(".compact-true").find(".like-shot"))
                                    } else {
                                        e = $(".like-action-" + h).not(".compact-true");
                                        $(e).replaceWith(t), n($(".like-action-" + h + ".compact-true").find(".like-shot"))
                                    }
                                    var i = Dribbble.Shots.get(h);
                                    Dribbble.EventBus.$emit("shotLike:done", {
                                        isLike: a
                                    }), Dribbble.Shots.logAnalyticsView(i.id), Dribbble.Shots.logAnalyticsLike(i.id, {
                                        action: a ? "like" : "unlike"
                                    }), a && Dribbble.Itly.trackShotEvent({
                                        eventName: "shotLiked",
                                        shotId: h
                                    })
                                }
                            })
                        }
                        return !1
                    }
                }
            }
        },
        Flag: {
            showFlag: function() {
                var t = $(".js-flag-confirm");
                return t.is(":visible") ? t.slideUp() : t.slideDown(), !1
            },
            flag: function() {
                var t = $(this).attr("action"),
                    e = $(this).find("input#screenshot_id").val(),
                    i = $("#flag_note").val();
                return confirm("You are about to report this shot as abuse of Dribbble. Are you sure you wish to continue?") && $.ajax({
                    type: "POST",
                    url: t,
                    data: {
                        screenshot_id: e,
                        note: i
                    },
                    success: function(t) {
                        $("#flag-section").html(t), Dribbble.Itly.trackShotEvent({
                            eventName: "shotReported",
                            shotId: e,
                            additionalData: {
                                description: i
                            }
                        })
                    }
                }), !1
            },
            unflag: function() {
                var t = $(this).modelId();
                return $.ajax({
                    type: "POST",
                    url: this.href,
                    data: {
                        _method: "delete",
                        screenshot_id: t
                    },
                    success: function(t) {
                        $("#flag-section").html(t)
                    }
                }), !1
            }
        },
        Page: {
            next: function() {
                return $(".shot-nav-next a").trigger("click"), !0
            },
            prev: function() {
                return $(".shot-nav-prev a").trigger("click"), !0
            }
        },
        Shot: {
            twotimes: function() {
                if (window.matchMedia("screen and (max-width: " + DEVICE_WIDTH_BREAKPOINT + ")").matches) return !1;
                var t = $(".main-shot"),
                    e = "full-800",
                    i = window.matchMedia(HIDPI_BREAKPOINT).matches,
                    n = $(".the-shot .single-img");
                if (t.hasClass(e)) t.removeClass(e), !i && n.find("picture").length && (n.find("img").attr("src", n.find("img").attr("data-oldsrc")), n.find("source:not([media])").attr("srcset", n.find("source:not([media])").attr("data-oldsrc")));
                else if (t.addClass(e), !i && n.find("picture").length) {
                    var s = n.find("source[media]").attr("srcset"),
                        r = n.find("img");
                    r.attr("data-oldsrc", r.attr("src")), r.attr("src", s);
                    var o = n.find("source:not([media])");
                    o.attr("data-oldsrc", o.attr("srcset")), o.attr("srcset", s)
                }
            }
        },
        Bucket: {
            open: function(t) {
                "true" !== t.target.contentEditable && $("a[data-bucket-add]").trigger("click")
            }
        }
    },
    newLocation;
$(document.body).on("click", ".js-flag-link", Screenshot.Flag.showFlag), $(document.body).on("click", ".js-unflag-link", Screenshot.Flag.unflag), $(document.body).on("submit", ".js-flag-confirm", Screenshot.Flag.flag), $(document.body).on("click", "a[data-fav-toggle=shot]", Screenshot.Like.Shot.toggle), Dribbble.Hotkeys.map("screenshot", {
    B: Screenshot.Bucket.open,
    F: Screenshot.Like.Shot.toggle,
    L: Screenshot.Like.Shot.toggle,
    LEFT: Screenshot.Page.prev,
    RIGHT: Screenshot.Page.next
}, function() {
    return !Dribbble.Attachments.overlayVisible() && !Dribbble.Overlay.anyOpen()
});
var shorterTotal = function(t) {
    return 1e6 <= t ? t = (t / 1e6).toFixed(2) + "M" : 1e3 <= t && (t = (t / 1e3).toFixed(1) + "k"), t
};
! function(s) {
    s.fn.charCount = function(n) {
        function t(t) {
            var e = s(t).val().length,
                i = n.allowed - e;
            i <= n.warning && 0 <= i ? s(t).next().addClass(n.cssWarning) : s(t).next().removeClass(n.cssWarning), i < 0 ? s(t).next().addClass(n.cssExceeded) : s(t).next().removeClass(n.cssExceeded), s(t).next().html(n.counterText + i)
        }
        var e = {
            allowed: 140,
            warning: 20,
            css: "counter",
            counterElement: "span",
            cssWarning: "warning",
            cssExceeded: "exceeded",
            counterText: ""
        };
        n = s.extend(e, n);
        this.each(function() {
            s(this).after("<" + n.counterElement + ' class="' + n.css + '">' + n.counterText + "</" + n.counterElement + ">"), t(this), s(this).on("keyup", function() {
                t(this)
            }), s(this).on("change", function() {
                t(this)
            })
        })
    }
}(jQuery), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(t) {
        var e = this;
        do {
            if (e.matches(t)) return e;
            e = e.parentElement || e.parentNode
        } while (null !== e && 1 === e.nodeType);
        return null
    }), Dribbble.FormValidationUI = {
        build: function(t, e) {
            if (null !== t) {
                var i = "Validation Error",
                    n = '<div class="errorExplanation" id="errorExplanation">';
                return (e = e || {}).title && (i = e.title), e.noError || (n += "<h2>" + i + "</h2>"), Array.isArray(t) || (t = Array(t)), n += "<ul>", t.forEach(function(t) {
                        n += "<li>" + t + "</li>"
                    }),
                    n + "</ul></div>"
            }
        }
    }, $.fn.buildError = function(t, e) {
        if (null !== t) {
            var i = $(this).closest("fieldset");
            (i = i.length ? i : $(this)).find(".errorExplanation").remove();
            var n = Dribbble.FormValidationUI.build(t, e);
            i.prepend(n), i.addClass("fieldWithErrors")
        }
    }, Dribbble.Bucket = function(t) {
        this.options = t || {}, this.type = t.type || "bucket", this.target = t.target, this.accountId = t.accountId, this.activeTarget = null, this.overlayEl = null, this.selected = {}, this.init()
    }, Dribbble.Bucket.prototype = {
        init: function() {
            this.createOverlay(), this.bindEventListeners()
        },
        createOverlay: function() {
            if (!this.overlayEl) {
                this.overlayEl = $("<div />", {
                    id: this.type + "-overlay",
                    "class": "overlay"
                }).appendTo("body").append($("<div />", {
                    id: this.type + "-add",
                    "class": "lightbox"
                }).append($("<a />", {
                    href: "#",
                    "class": "close"
                }).append($("<img />", {
                    src: "/assets/icons/dribbble-one-five/close-circle-96a1edaa815656bd86a400cc299e37b48c4f4bbd4a41ab9050aa700e77c367e9.svg",
                    "class": "lazyload",
                    width: 24,
                    height: 24
                }))).append($("<div />", {
                    "class": "display"
                }).append($("<div />", {
                    "class": "processing",
                    text: "Loading\u2026"
                }))));
                var t = function() {
                        this.overlay.$el.find(".display").html($("<div />", {
                            "class": "processing",
                            text: "Loading\u2026"
                        })), Dribbble.isMobileSafari() || $("body").removeClass("noscroll")
                    }.bind(this),
                    e = function() {
                        screenshotId = this.activeTarget.dataset.screenshotId;
                        var t = "true" === this.activeTarget.dataset.isFromModal;
                        screenshotId && (url = "/shots/" + screenshotId + (t ? "/buckets_menu" : "/shots_thumbnail_buckets_menu"), $(this.activeTarget.parentElement).load(url, function(t) {
                            if ($(t && $(t)[0])) {
                                var e = $(t)[0].text.trim();
                                Dribbble.EventBus.$emit("shotCollection:done", {
                                    isSaved: "Saved" === e
                                })
                            }
                        }))
                    }.bind(this),
                    i = function() {
                        this.activeTarget = null
                    }.bind(this),
                    n = "bucket" == this.type ? [t, e, i] : [t, i];
                this.overlay = new Dribbble.Overlay.Simple({
                    $el: this.overlayEl,
                    onHide: n
                })
            }
        },
        bindEventListeners: function() {
            var t = "click." + this.type;
            $(this.options.parentTarget || document.body).off(t).on(t, this.target, this.show.bind(this)), this.overlay.$el.on("keyup", this.navigate.bind(this)).on("click", ".create form .cancel", this.hideCreate.bind(this)).on("submit", ".create form", this.create.bind(this)).on("click", ".add a.create", this.showCreate.bind(this)).on("click", "ol li a", this.toggleClicked.bind(this)).on("keyup", "#bucket_query", this.search.bind(this)).on("submit", "#bucket_search", function() {
                return !1
            }).on("mousemove", "ol li", this.onMouseMove.bind(this))
        },
        create: function(t) {
            var i = $(t.target);
            return $.ajax({
                context: this,
                type: "POST",
                url: i.attr("action"),
                data: i.serialize(),
                beforeSend: function() {
                    $("#bucket-add form input[type=submit]").addClass("processing").attr("disabled", "true").attr("value", "Processing, please wait\u2026")
                },
                statusCode: {
                    201: function(t) {
                        i.find("#bucket_name").length && Dribbble.Itly.collectionCreated({
                            collection_title: i.find("#bucket_name").val(),
                            collection_id: t.id.toString(),
                            collection_shot_count: 1,
                            collection_created_at: (new Date).toISOString()
                        }), this.refresh(t)
                    },
                    200: function(t) {
                        this.overlay.find(".create-bucket").html(t)
                    },
                    422: function(t) {
                        if (-1 < t.getResponseHeader("content-type").indexOf("json")) {
                            var e = JSON.parse(t.responseText);
                            i.buildError(e.message)
                        } else this.overlay.find(".create-good").html(t.responseText), $("#json-field").length || this.overlay.find(".create-good form").append($("<input>", {
                            id: "json-field",
                            type: "hidden",
                            name: "json",
                            value: !0
                        }))
                    }
                }
            }, "json"), !1
        },
        hasItems: function() {
            return 0 < this.overlay.find(".add ol li").length
        },
        hideCreate: function() {
            this.hasItems() ? this.showAdd() : this.overlay.hide()
        },
        navigate: function(t) {
            var e = $("#bucket_query");
            if (e.is(":visible")) {
                switch (t.which) {
                    case 13:
                        "project" == this.type && this.current && this.current.hasClass("bucketed") ? this.overlay.find("#bucket_form").trigger("submit") : this.toggle(this.current);
                        break;
                    case 27:
                        "" == $.trim(e.val()) ? this.overlay.hide() : e.val("").trigger("keyup");
                        break;
                    case 38:
                    case 40:
                        var i = 38 == t.which ? this.current.prev() : this.current.next();
                        this.select(i, {
                            scrollIntoView: !0
                        })
                }
                return !1
            }
        },
        onMouseMove: function(t) {
            if (!this.scrolling) {
                var e = $(t.target).closest("li");
                this.current && e.get(0) == this.current.get(0) || this.select(e)
            }
        },
        refresh: function(e) {
            var i = this,
                t = this.activeTarget.dataset.listUrl ? this.activeTarget.dataset.listUrl : this.activeTarget.href;
            this.accountId && (t = Dribbble.Url.addParams(t, {
                account_id: this.accountId
            })), e = e || {}, this.overlay.find(".display").load(t, function() {
                if (i.hasItems())
                    if (i.showAdd(), e.id) {
                        var t = "#" + i.type + "-" + e.id;
                        i.select(t), i.toggle(t)
                    } else i.select("ol.group li:first-child");
                else i.showCreate();
                i.overlay.$el.find("ol.group").on("scroll", function() {
                    clearTimeout(i.scrolling), i.scrolling = setTimeout(function() {
                        i.scrolling = !1
                    }, 250)
                })
            })
        },
        search: function(t) {
            if (t) switch (t.which) {
                case 13:
                case 27:
                case 38:
                case 40:
                    return void t.preventDefault()
            }
            var o = this.overlay.find("#bucket_query").val().toLowerCase();
            this.overlay.find("ol.group li").each(function() {
                var t = $(this); - 1 < t.find("a strong").text().toLowerCase().search(o) ? t.show() : t.hide()
            }).sort(function(t, e) {
                var i = $(t).find("a strong").text(),
                    n = $(e).find("a strong").text(),
                    s = i.toLowerCase().search(o),
                    r = n.toLowerCase().search(o);
                return s == r ? n < i ? 1 : -1 : r < s ? 1 : -1
            }).appendTo(this.overlay.find("ol.group")), this.select(this.overlay.find("ol.group li:visible").eq(0))
        },
        select: function(t, e) {
            var i = $(t);
            return 0 == i.length || (this.current && this.current.removeClass("current"), this.current = i, this.current.addClass("current"), e && e.scrollIntoView && i.get(0).scrollIntoView(!1)), !1
        },
        show: function(t) {
            return t.preventDefault(), this.activeTarget = "A" == t.target.tagName ? t.target : t.target.closest("a"), this.refresh(), this.overlay.show(), Dribbble.isMobileSafari() || $("body").addClass("noscroll"), !1
        },
        showAdd: function() {
            this.overlay.find(".add").show().end().find(".create-bucket, .create-good").hide().end(), Dribbble.isMobile() || $("#bucket_query").trigger("focus")
        },
        showCreate: function() {
            if ("good" == this.type) $("#json-field").length || this.overlay.find(".create-good form").append($("<input>", {
                id: "json-field",
                type: "hidden",
                name: "json",
                value: !0
            })), this.overlay.find(".add").hide().end().find(".create-good").show().end(), this.overlay.find("#good_title").trigger("focus");
            else {
                this.overlay.find(".add").hide().end().find(".create-bucket").show().end();
                var t = $("#" + this.type + "_name", this.overlay.$el),
                    e = $("#" + this.type + "_description", this.overlay.$el);
                t.next().hasClass("counter") || t.charCount({
                    allowed: 64,
                    warning: 10
                }), e.next().hasClass("counter") || e.charCount({
                    allowed: 160
                }), $("#bucket_name").trigger("focus")
            }
            return !1
        },
        toggle: function(t) {
            var e = this.overlay.find(t);
            if ("bucket" == this.type) {
                var i = $("#bucket_form").attr("action"),
                    n = function(t) {
                        e.replaceWith(t), this.select("#bucket-" + e.modelId())
                    }.bind(this),
                    s = function(t) {
                        Dribbble.Notify.error(t.responseText), this.overlay.hide()
                    }.bind(this);
                e.hasClass("bucketed") ? $.ajax(i + "/" + e.modelId(), {
                    type: "DELETE",
                    success: n
                }) : $.post(i, {
                    bucket_id: e.modelId(),
                    screenshot_id: e.data("thumbnailId"),
                    on_hover: $("#hover-status").attr("data-from-hover")
                }).done(function(t) {
                    n(t);
                    var e = $(t).data();
                    Dribbble.Itly.trackShotEvent({
                        eventName: "shotSaved",
                        shotId: e.thumbnailId,
                        additionalData: {
                            collection_id: e.collectionId.toString(),
                            collection_shot_count: e.collectionCount,
                            collection_title: e.title,
                            collection_created_at: e.createdAt
                        }
                    })
                }).fail(s), e.toggleClass("bucketed")
            } else if ("good" == this.type) $("ol.goods li.included").removeClass("included"), e.addClass("included"), this.overlay.find("input[name=good_id]").val(e.modelId()), this.overlay.find(".add form button.form-sub").attr("disabled", !1);
            else {
                t = ".bucketed:not(.team)";
                var r = this.overlay.find("#bucket_form");
                e.hasClass("team") && (t = ".bucketed.team"), e.addClass("bucketed"), e.siblings(t).addClass("unbucketed").removeClass("bucketed"), r.find("input[data-user-id=" + e.data("user-id") + "]").remove(), input = $("<input>", {
                    type: "hidden",
                    name: "bucket_id[]",
                    "data-user-id": e.data("user-id")
                }).appendTo(r), input.val(e.modelId()), this.overlay.find(".add form button.form-sub").attr("disabled", !1)
            }
            Dribbble.isMobile() || $("#bucket_query").trigger("focus");
            var o = e.get(0).classList;
            return o.contains("bucketed") || o.contains("included") ? this.selected = {
                id: e.modelId(),
                title: e.data("title")
            } : this.selected = {}, !1
        },
        toggleClicked: function(t) {
            return this.toggle($(t.target).closest("li"))
        }
    },
    function($) {
        $.fn.editable = function(t, e) {
            if ("disable" != t)
                if ("enable" != t) {
                    if ("destroy" != t) {
                        var h = $.extend({}, $.fn.editable.defaults, {
                                target: t
                            }, e),
                            d = $.editable.types[h.type].plugin || function() {},
                            c = $.editable.types[h.type].submit || function() {},
                            u = $.editable.types[h.type].buttons || $.editable.types.defaults.buttons,
                            b = $.editable.types[h.type].content || $.editable.types.defaults.content,
                            m = $.editable.types[h.type].element || $.editable.types.defaults.element,
                            f = $.editable.types[h.type].reset || $.editable.types.defaults.reset,
                            p = h.callback || function() {},
                            v = h.onedit || function() {},
                            g = h.onsubmit || function() {},
                            i = h.onreset || function() {},
                            y = h.onerror || f;
                        return h.tooltip && $(this).attr("title", h.tooltip), h.autowidth = "auto" == h.width, h.autoheight = "auto" == h.height, this.each(function() {
                            var a = this,
                                n = $(a).width(),
                                l = $(a).height();
                            $(this).data("event.editable", h.event), $.trim($(this).html()) || $(this).html(h.placeholder), $(this).on(h.event, function(t) {
                                if (!0 !== $(this).data("disabled.editable") && !a.editing && !1 !== v.apply(this, [h, a])) {
                                    t.preventDefault(), t.stopPropagation(), h.tooltip && $(a).removeAttr("title"), 0 == $(a).width() ? (h.width = n, h.height = l) : ("none" != h.width && (h.width = h.autowidth ? $(a).width() : h.width), "none" != h.height && (h.height = h.autoheight ? $(a).height() : h.height)), $(this).html().toLowerCase().replace(/(;|")/g, "") == h.placeholder.toLowerCase().replace(/(;|")/g, "") && $(this).html(""), a.editing = !0, a.revert = $(a).html(), $(a).html("");
                                    var s = $("<form />");
                                    h.cssclass && ("inherit" == h.cssclass ? s.attr("class", $(a).attr("class")) : s.attr("class", h.cssclass)), h.style && ("inherit" == h.style ? (s.attr("style", $(a).attr("style")), s.css("display", $(a).css("display"))) : s.attr("style", h.style));
                                    var e, r = m.apply(s, [h, a]);
                                    if (h.loadurl) {
                                        var o = setTimeout(function() {
                                                r.disabled = !0, b.apply(s, [h.loadtext, h, a])
                                            }, 100),
                                            i = {};
                                        null != h.id && (i[h.id] = a.id), $.isFunction(h.loaddata) ? $.extend(i, h.loaddata.apply(a, [a.revert, h])) : $.extend(i, h.loaddata), $.ajax({
                                            type: h.loadtype,
                                            url: h.loadurl,
                                            data: i,
                                            async: !1,
                                            success: function(t) {
                                                window.clearTimeout(o), e = t, r.disabled = !1
                                            }
                                        })
                                    } else h.data ? (e = h.data, $.isFunction(h.data) && (e = h.data.apply(a, [a.revert, h]))) : e = a.revert;
                                    b.apply(s, [e, h, a]), r.attr("name", h.name), u.apply(s, [h, a]), $(a).append(s), d.apply(s, [h, a]), $(":input:visible:enabled:first", s).focus(), h.select && r.select(), r.keydown(function(t) {
                                        27 == t.keyCode && (t.preventDefault(), f.apply(s, [h, a]))
                                    }), "cancel" == h.onblur ? r.blur(function() {
                                        o = setTimeout(function() {
                                            f.apply(s, [h, a])
                                        }, 500)
                                    }) : "submit" == h.onblur ? r.blur(function() {
                                        o = setTimeout(function() {
                                            s.submit()
                                        }, 200)
                                    }) : $.isFunction(h.onblur) ? r.blur(function() {
                                        h.onblur.apply(a, [r.val(), h])
                                    }) : r.blur(function() {}), s.submit(function(t) {
                                        if (o && clearTimeout(o), t.preventDefault(), !1 !== g.apply(s, [h, a]) && !1 !== c.apply(s, [h, a]))
                                            if ($.isFunction(h.target)) {
                                                var e = h.target.apply(a, [r.val(), h]);
                                                $(a).html(e), a.editing = !1, p.apply(a, [a.innerHTML, h]), $.trim($(a).html()) || $(a).html(h.placeholder)
                                            } else {
                                                var i = {};
                                                i[h.name] = r.val(), null != h.id && (i[h.id] = a.id), $.isFunction(h.submitdata) ? $.extend(i, h.submitdata.apply(a, [a.revert, h])) : $.extend(i, h.submitdata), "PUT" == h.method && (i._method = "put"), $(a).html(h.indicator);
                                                var n = {
                                                    type: "POST",
                                                    data: i,
                                                    dataType: "html",
                                                    url: h.target,
                                                    success: function(t) {
                                                        "html" == n.dataType && $(a).html(t), a.editing = !1, p.apply(a, [t, h]), $.trim($(a).html()) || $(a).html(h.placeholder)
                                                    },
                                                    error: function(t) {
                                                        y.apply(s, [h, a, t])
                                                    }
                                                };
                                                $.extend(n, h.ajaxoptions), $.ajax(n)
                                            }
                                        return $(a).attr("title", h.tooltip), !1
                                    })
                                }
                            }), this.reset = function(t) {
                                this.editing && !1 !== i.apply(t, [h, a]) && ($(a).html(a.revert), a.editing = !1, $.trim($(a).html()) || $(a).html(h.placeholder), h.tooltip && $(a).attr("title", h.tooltip))
                            }
                        })
                    }
                    $(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable")
                } else $(this).data("disabled.editable", !1);
            else $(this).data("disabled.editable", !0)
        }, $.editable = {
            types: {
                defaults: {
                    element: function() {
                        var t = $('<input type="hidden"></input>');
                        return $(this).append(t), t
                    },
                    content: function(t) {
                        $(":input:first", this).val(t)
                    },
                    reset: function(t, e) {
                        e.reset(this)
                    },
                    buttons: function(e, i) {
                        var n = this;
                        if (e.submit) {
                            if (e.submit.match(/>$/)) var t = $(e.submit).click(function() {
                                "submit" != t.attr("type") && n.submit()
                            });
                            else(t = $('<button type="submit" />')).html(e.submit);
                            $(this).append(t)
                        }
                        if (e.cancel) {
                            if (e.cancel.match(/>$/)) var s = $(e.cancel);
                            else(s = $('<button type="cancel" />')).html(e.cancel);
                            $(this).append(s), $(s).click(function() {
                                if ($.isFunction($.editable.types[e.type].reset)) var t = $.editable.types[e.type].reset;
                                else t = $.editable.types.defaults.reset;
                                return t.apply(n, [e, i]), !1
                            })
                        }
                    }
                },
                text: {
                    element: function(t) {
                        var e = $("<input />");
                        return "none" != t.width && e.width(t.width), "none" != t.height && e.height(t.height), e.attr("autocomplete", "off"), $(this).append(e), e
                    }
                },
                textarea: {
                    element: function(t) {
                        var e = $("<textarea />");
                        return t.rows ? e.attr("rows", t.rows) : "none" != t.height && e.height(t.height), t.cols ? e.attr("cols", t.cols) : "none" != t.width && e.width(t.width), $(this).append(e), e
                    }
                },
                select: {
                    element: function() {
                        var t = $("<select />");
                        return $(this).append(t), t
                    },
                    content: function(data, settings, original) {
                        if (String == data.constructor) eval("var json = " + data);
                        else var json = data;
                        for (var key in json)
                            if (json.hasOwnProperty(key) && "selected" != key) {
                                var option = $("<option />").val(key).append(json[key]);
                                $("select", this).append(option)
                            }
                        $("select", this).children().each(function() {
                            $(this).val() != json.selected && $(this).text() != $.trim(original.revert) || $(this).attr("selected", "selected")
                        })
                    }
                }
            },
            addInputType: function(t, e) {
                $.editable.types[t] = e
            }
        }, $.fn.editable.defaults = {
            name: "value",
            id: "id",
            type: "text",
            width: "auto",
            height: "auto",
            event: "click.editable",
            onblur: "cancel",
            loadtype: "GET",
            loadtext: "Loading...",
            placeholder: "Click to edit",
            loaddata: {},
            submitdata: {},
            ajaxoptions: {}
        }
    }(jQuery), Dribbble.imageOnLoad = function(t, e) {
        function i(t, e) {
            var i;
            return function() {
                return t && (i = t.apply(e || this, arguments), t = null), i
            }
        }
        var n = i(e);
        t.addEventListener("load", n), t.complete && 0 < t.naturalWidth && n()
    }, Dribbble.isMobile = function() {
        var t = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
            e = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
        return t && e
    }, Dribbble.isMobileSafari = function() {
        return !!navigator.userAgent.match(/(iPad|iPhone|iPod touch)/)
    }, Dribbble.isAndroidChrome = function() {
        var t = navigator.userAgent,
            e = /Android/i.test(t),
            i = /Chrome/i.test(t);
        return e && i
    }, Dribbble.isIosSafari = function(t) {
        var e, i = navigator.userAgent,
            n = "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints;
        switch (t) {
            case "iPhone":
                e = /(iPhone)/i.test(i);
                break;
            case "iPad":
                e = /(iPad)/i.test(i) || n;
                break;
            default:
                e = /(iPhone|iPad)/i.test(i) || n
        }
        var s = /WebKit/i.test(i),
            r = /CriOS/i.test(i),
            o = /FxiOS/i.test(i);
        return e && s && !r && !o
    }, Dribbble.isMobileViewport = function() {
        return window.matchMedia("screen and (max-width: 959px)").matches
    };
var Dribbble = Dribbble || {};
Dribbble.JsConfig = Dribbble.JsConfig || {}, Dribbble.VideoPlayer = function() {
        var s = function(t, e) {
                var i = null;
                return function() {
                    window.clearTimeout(i), i = window.setTimeout(function() {
                        t()
                    }, e)
                }
            },
            t = function(t) {
                this.videos = document.querySelectorAll(t), this.videos.forEach(function(e) {
                    container = e.parentElement, controls = container.querySelector(".video-controls"), hasAudio = "true" != e.dataset.silent, muteControls = controls.querySelector(".mute-controls"), e.muteControls = muteControls, muteControls.className = "mute-controls mute-mute", e.muted = !0;
                    var i = 0,
                        t = function() {
                            var t = e.dataset;
                            e.offsetWidth < 400 && 400 < i && t.videoSmall ? (e.src = t.videoSmall, i = 400) : e.offsetWidth < 800 && (800 < i || i <= 400) && t.videoMedium ? (e.src = t.videoMedium, i = 800) : t.videoLarge && i <= 800 ? (e.src = t.videoLarge, i = 801) : t.src && !e.src && (e.src = t.src)
                        },
                        n = s(t, 250);
                    window.addEventListener("resize", n), e.src || t(), Dribbble.isMobile() && (controls.classList.add("mobile"), muteControls.children.length && Array.prototype.forEach.call(muteControls.children, function(t) {
                        t.removeAttribute("rel"), t.removeAttribute("original-title")
                    })), hasAudio ? muteControls.addEventListener("click", r.togglemute(e)) : controls.style.display = "none", e.autoplay || (e.addEventListener("mouseenter", r.play(e)), e.addEventListener("mouseleave", r.pause(e)), controls.addEventListener("mouseenter", r.play(e)), controls.addEventListener("mouseleave", r.pause(e))), e.dataset.shotUrl && e.addEventListener("click", r.clicked(e))
                })
            },
            r = {
                togglemute: function(t) {
                    return function() {
                        t.muteControls.className = t.muted ? "mute-controls mute-unmute" : "mute-controls mute-mute", t.muted = !t.muted
                    }
                },
                play: function(t) {
                    return function() {
                        t.play()
                    }
                },
                pause: function(t) {
                    return function() {
                        t.pause()
                    }
                },
                clicked: function(t) {
                    return function() {
                        window.location = t.dataset.shotUrl
                    }
                }
            };
        return t
    }(), Dribbble.FullScreenViewer = {
        initialize: function() {
            this.fullScreenHeader = document.querySelector(".full-screen-header"), this.thumbnails = this.fullScreenHeader.querySelector(".header-thumbnails ul"), this.mainViewer = document.querySelector(".full-screen-main"), this.viewerMedia = this.mainViewer.querySelector("img, video"), this.mainViewer && this.viewerMedia ? (this.viewerSelectorKind = this.viewerMedia.tagName.toLowerCase(), this.setupViewer(), this.handleHeaderClasses(), this.checkThumbnailsScroll(), this.scrollthumbnails(), this.bindEventListeners()) : console.error("Could not find a media item inside the main viewer.")
        },
        setupViewer: function() {
            var t = this;
            if (this.ViewerWidth = this.mainViewer.clientWidth, this.mainViewer.classList.add("loading"), "video" === this.viewerSelectorKind) t.viewerMedia.onloadeddata = function() {
                t.mediaWidth = t.viewerMedia.videoWidth, t.mainViewer.classList.remove("loading"), t.mainViewer.querySelector(".video-controls").classList.add("show")
            }, new Dribbble.VideoPlayer("video");
            else if ("img" === this.viewerSelectorKind) {
                var e = function() {
                    t.mainViewer.classList.remove("loading"), t.mediaWidth = t.viewerMedia.naturalWidth, t.shouldZoom()
                };
                Dribbble.imageOnLoad(this.viewerMedia, e)
            }
        },
        handleHeaderClasses: function() {
            this.thumbnails && (this.fullScreenHeader.clientWidth === this.thumbnails.clientWidth ? this.fullScreenHeader.classList.add("is-full") : this.fullScreenHeader.classList.remove("is-full"))
        },
        checkThumbnailsScroll: function() {
            this.thumbnails && (this.thumbnailScrollable = !1, this.thumbnailsWidth = this.thumbnails.offsetWidth, this.thumbnailsScrollWidth = this.thumbnails.scrollWidth, this.thumbnailsScrollWidth > this.thumbnailsWidth ? (this.thumbnailScrollable = !0, this.thumbnails.classList.add("scrollable")) : (this.thumbnailScrollable = !1, this.thumbnails.classList.remove("scrollable")), this.updateScrollIndicators(), this.thumbnailScrollable && !this.hasScrollEvent && (Dribbble.Globals.debounce().then(function(t) {
                var e = t(this.handleThumbnailsScroll.bind(this), 100);
                this.thumbnails.addEventListener("scroll", e)
            }.bind(this)), this.hasScrollEvent = !0))
        },
        scrollthumbnails: function() {
            if (this.thumbnailScrollable) {
                var t = this.thumbnails.querySelector(".active"),
                    e = this.thumbnails.getBoundingClientRect().left,
                    i = Math.round(t.getBoundingClientRect().left - e);
                this.thumbnails.scrollLeft = i - 40
            }
        },
        shouldZoom: function() {
            this.canZoom = this.mediaWidth > this.ViewerWidth, "img" === this.viewerSelectorKind && (this.canZoom ? this.mainViewer.classList.add("can-zoom") : this.mainViewer.classList.remove("can-zoom"))
        },
        bindEventListeners: function() {
            window.addEventListener("resize", this.handleResize.bind(this)), "img" === this.viewerSelectorKind && this.viewerMedia.addEventListener("click", function() {
                this.canZoom && (this.mainViewer.classList.toggle("zoomed"), this.viewerMedia.classList.toggle("zoomed"))
            }.bind(this))
        },
        updateScrollIndicators: function() {
            var t = Math.ceil(this.thumbnails.scrollLeft),
                e = 0 < t,
                i = t + this.thumbnailsWidth >= this.thumbnailsScrollWidth;
            e ? this.thumbnails.classList.add("scrolled-left") : this.thumbnails.classList.remove("scrolled-left"), i ? this.thumbnails.classList.remove("scrolled-right") : this.thumbnails.classList.add("scrolled-right")
        },
        handleResize: function() {
            this.ViewerWidth = this.mainViewer.clientWidth, this.shouldZoom(), this.checkThumbnailsScroll(), this.handleHeaderClasses()
        },
        handleThumbnailsScroll: function() {
            this.updateScrollIndicators()
        }
    }, Dribbble.Attachments = {
        initialize: function() {
            this.findElements(), this.bindEventListeners(), this.swipeEnabled = !0, Dribbble.Hotkeys.map("attachments", {
                ESCAPE: Dribbble.Attachments.Keys.escape,
                RIGHT: Dribbble.Attachments.Keys.right,
                LEFT: Dribbble.Attachments.Keys.left
            }, Dribbble.Attachments.overlayVisible.bind(this))
        },
        bindEventListeners: function() {
            var e = this,
                t = ["a.full-screen-page", ".detail-shot a", ".attachments-list li a", "#attachments ul li a"].join(",");
            $(document.body).on("click", t, function(t) {
                if (!t.shiftKey && !t.ctrlKey && !t.metaKey) return e.openOverlay($(this)), !1
            }), $(document.body).on("click", ".close-attachments a", function() {
                return e.closeOverlay(), !1
            })
        },
        showOverlay: function(t) {
            var e = this;
            this.overlay.length && (e.overlay.show(), $.ajax(t, {
                dataType: "html",
                cache: !1,
                success: function(t) {
                    e.overlay.html(t), Dribbble.isMobile() ? $(".shot-overlay").is(":visible") ? ($(".shot-overlay").hide(), e.inShotOverlay = !0) : $(".js-site-nav, #wrap, #footer").hide() : $("body, .shot-overlay").addClass("attachment-noscroll"), e.overlay.trigger("focus"), Dribbble.FullScreenViewer.initialize()
                }
            }))
        },
        hideOverlay: function() {
            Dribbble.isMobile() ? this.inShotOverlay ? $(".shot-overlay").show() : $(".js-site-nav, #wrap, #footer").show() : $("body, .shot-overlay").removeClass("attachment-noscroll"), this.overlay.empty().hide()
        },
        closeOverlay: function() {
            Dribbble.Router.go(-this.stepsToShotPage())
        },
        openOverlay: function(t) {
            var e = t.attr("href"),
                i = t.data("title");
            e && Dribbble.Router.pushState({
                "steps-from-shot": this.stepsToShotPage() + 1
            }, i, e)
        },
        findElements: function() {
            this.overlay = $(".attachment-overlay")
        },
        overlayVisible: function() {
            return this.overlay && this.overlay.is(":visible")
        },
        stepsToShotPage: function() {
            return History.getState().data["steps-from-shot"] || 0
        },
        navigate: function(t) {
            var e = $("#attachments"),
                i = e.find("li.active"),
                n = t ? i.prev("li") : i.next("li");
            if (!n.length) {
                var s = t ? -1 : 0;
                n = e.find("li").eq(s)
            }
            var r = n.find("a");
            this.openOverlay(r)
        },
        Keys: {
            escape: function() {
                Dribbble.Attachments.closeOverlay()
            },
            left: function() {
                Dribbble.Attachments.navigate(!0)
            },
            right: function() {
                Dribbble.Attachments.navigate(!1)
            }
        }
    }, $(".attachment-overlay").length && Dribbble.isHistorySupported() && Dribbble.Attachments.initialize(), Dribbble.ShotFeed = {
        initialize: function() {
            this.updateSignupContext()
        },
        updateSignupContext: function() {
            var t = document.getElementById("more-user-shots"),
                e = document.getElementById("more-related-shots");
            void 0 === t && void 0 === e || (document.getElementsByClassName("bucket-shot")[0].setAttribute("data-context", "shot-page-feed"), document.getElementsByClassName("like-shot")[0].setAttribute("data-context", "shot-page-feed"), document.getElementsByClassName("follow")[0].setAttribute("data-context", "shot-page-feed"))
        }
    },
    function(a, l) {
        "use strict";

        function h(t) {
            this.time = t.time, this.target = t.target, this.rootBounds = t.rootBounds, this.boundingClientRect = t.boundingClientRect, this.intersectionRect = t.intersectionRect || r(), this.isIntersecting = !!t.intersectionRect;
            var e = this.boundingClientRect,
                i = e.width * e.height,
                n = this.intersectionRect,
                s = n.width * n.height;
            this.intersectionRatio = i ? Number((s / i).toFixed(4)) : this.isIntersecting ? 1 : 0
        }

        function t(t, e) {
            var i = e || {};
            if ("function" != typeof t) throw new Error("callback must be a function");
            if (i.root && 1 != i.root.nodeType) throw new Error("root must be an Element");
            this._checkForIntersections = n(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT), this._callback = t, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(i.rootMargin), this.thresholds = this._initThresholds(i.threshold), this.root = i.root || null, this.rootMargin = this._rootMarginValues.map(function(t) {
                return t.value + t.unit
            }).join(" ")
        }

        function d() {
            return a.performance && performance.now && performance.now()
        }

        function n(t, e) {
            var i = null;
            return function() {
                i || (i = setTimeout(function() {
                    t(), i = null
                }, e))
            }
        }

        function e(t, e, i, n) {
            "function" == typeof t.addEventListener ? t.addEventListener(e, i, n || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, i)
        }

        function i(t, e, i, n) {
            "function" == typeof t.removeEventListener ? t.removeEventListener(e, i, n || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, i)
        }

        function c(t, e) {
            var i = Math.max(t.top, e.top),
                n = Math.min(t.bottom, e.bottom),
                s = Math.max(t.left, e.left),
                r = Math.min(t.right, e.right),
                o = r - s,
                a = n - i;
            return 0 <= o && 0 <= a && {
                top: i,
                bottom: n,
                left: s,
                right: r,
                width: o,
                height: a
            }
        }

        function u(t) {
            var e;
            try {
                e = t.getBoundingClientRect()
            } catch (i) {}
            return e ? (e.width && e.height || (e = {
                top: e.top,
                right: e.right,
                bottom: e.bottom,
                left: e.left,
                width: e.right - e.left,
                height: e.bottom - e.top
            }), e) : r()
        }

        function r() {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
            }
        }

        function s(t, e) {
            for (var i = e; i;) {
                if (i == t) return !0;
                i = b(i)
            }
            return !1
        }

        function b(t) {
            var e = t.parentNode;
            return e && 11 == e.nodeType && e.host ? e.host : e && e.assignedSlot ? e.assignedSlot.parentNode : e
        }
        if ("IntersectionObserver" in a && "IntersectionObserverEntry" in a && "intersectionRatio" in a.IntersectionObserverEntry.prototype) "isIntersecting" in a.IntersectionObserverEntry.prototype || Object.defineProperty(a.IntersectionObserverEntry.prototype, "isIntersecting", {
            get: function() {
                return 0 < this.intersectionRatio
            }
        });
        else {
            var o = [];
            t.prototype.THROTTLE_TIMEOUT = 100, t.prototype.POLL_INTERVAL = null, t.prototype.USE_MUTATION_OBSERVER = !0, t.prototype.observe = function(e) {
                if (!this._observationTargets.some(function(t) {
                        return t.element == e
                    })) {
                    if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
                    this._registerInstance(), this._observationTargets.push({
                        element: e,
                        entry: null
                    }), this._monitorIntersections(), this._checkForIntersections()
                }
            }, t.prototype.unobserve = function(e) {
                this._observationTargets = this._observationTargets.filter(function(t) {
                    return t.element != e
                }), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance())
            }, t.prototype.disconnect = function() {
                this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance()
            }, t.prototype.takeRecords = function() {
                var t = this._queuedEntries.slice();
                return this._queuedEntries = [], t
            }, t.prototype._initThresholds = function(t) {
                var e = t || [0];
                return Array.isArray(e) || (e = [e]), e.sort().filter(function(t, e, i) {
                    if ("number" != typeof t || isNaN(t) || t < 0 || 1 < t) throw new Error("threshold must be a number between 0 and 1 inclusively");
                    return t !== i[e - 1]
                })
            }, t.prototype._parseRootMargin = function(t) {
                var e = (t || "0px").split(/\s+/).map(function(t) {
                    var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                    if (!e) throw new Error("rootMargin must be specified in pixels or percent");
                    return {
                        value: parseFloat(e[1]),
                        unit: e[2]
                    }
                });
                return e[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e
            }, t.prototype._monitorIntersections = function() {
                this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (e(a, "resize", this._checkForIntersections, !0), e(l, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in a && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(l, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }))))
            }, t.prototype._unmonitorIntersections = function() {
                this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, i(a, "resize", this._checkForIntersections, !0), i(l, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null))
            }, t.prototype._checkForIntersections = function() {
                var a = this._rootIsInDom(),
                    l = a ? this._getRootRect() : r();
                this._observationTargets.forEach(function(t) {
                    var e = t.element,
                        i = u(e),
                        n = this._rootContainsTarget(e),
                        s = t.entry,
                        r = a && n && this._computeTargetAndRootIntersection(e, l),
                        o = t.entry = new h({
                            time: d(),
                            target: e,
                            boundingClientRect: i,
                            rootBounds: l,
                            intersectionRect: r
                        });
                    s ? a && n ? this._hasCrossedThreshold(s, o) && this._queuedEntries.push(o) : s && s.isIntersecting && this._queuedEntries.push(o) : this._queuedEntries.push(o)
                }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
            }, t.prototype._computeTargetAndRootIntersection = function(t, e) {
                if ("none" != a.getComputedStyle(t).display) {
                    for (var i = u(t), n = b(t), s = !1; !s;) {
                        var r = null,
                            o = 1 == n.nodeType ? a.getComputedStyle(n) : {};
                        if ("none" == o.display) return;
                        if (n == this.root || n == l ? (s = !0, r = e) : n != l.body && n != l.documentElement && "visible" != o.overflow && (r = u(n)), r && !(i = c(r, i))) break;
                        n = b(n)
                    }
                    return i
                }
            }, t.prototype._getRootRect = function() {
                var t;
                if (this.root) t = u(this.root);
                else {
                    var e = l.documentElement,
                        i = l.body;
                    t = {
                        top: 0,
                        left: 0,
                        right: e.clientWidth || i.clientWidth,
                        width: e.clientWidth || i.clientWidth,
                        bottom: e.clientHeight || i.clientHeight,
                        height: e.clientHeight || i.clientHeight
                    }
                }
                return this._expandRectByRootMargin(t)
            }, t.prototype._expandRectByRootMargin = function(i) {
                var t = this._rootMarginValues.map(function(t, e) {
                        return "px" == t.unit ? t.value : t.value * (e % 2 ? i.width : i.height) / 100
                    }),
                    e = {
                        top: i.top - t[0],
                        right: i.right + t[1],
                        bottom: i.bottom + t[2],
                        left: i.left - t[3]
                    };
                return e.width = e.right - e.left, e.height = e.bottom - e.top, e
            }, t.prototype._hasCrossedThreshold = function(t, e) {
                var i = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                    n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                if (i !== n)
                    for (var s = 0; s < this.thresholds.length; s++) {
                        var r = this.thresholds[s];
                        if (r == i || r == n || r < i != r < n) return !0
                    }
            }, t.prototype._rootIsInDom = function() {
                return !this.root || s(l, this.root)
            }, t.prototype._rootContainsTarget = function(t) {
                return s(this.root || l, t)
            }, t.prototype._registerInstance = function() {
                o.indexOf(this) < 0 && o.push(this)
            }, t.prototype._unregisterInstance = function() {
                var t = o.indexOf(this); - 1 != t && o.splice(t, 1)
            }, a.IntersectionObserver = t, a.IntersectionObserverEntry = h
        }
    }(window, document), Dribbble.Media || (Dribbble.Media = {}), Dribbble.Media.Load = function(t, e) {
        if (this.mediaContainer = t, this.loadedCallback = e || null, (this.mediaType = null) === this.mediaContainer && this.mediaContainer.dataset.lazy) throw new Error("Something wrong with the mediaElement");
        if (this.imageElement = this.mediaContainer.querySelector("img"), this.videoElement = this.mediaContainer.querySelector("video"), this.imageElement && (this.mediaType = "image"), this.videoElement && (this.mediaType = "video"), !this.mediaType) throw new Error("Could not find images or videos inside mediaElement");
        this.replaceSource()
    }, Dribbble.Media.Load.prototype = {
        replaceSource: function() {
            this.mediaContainer.querySelectorAll("source, img, video").forEach(function(t) {
                var e = t.dataset.srcset || null,
                    i = t.dataset.src || null;
                e && (t.setAttribute("srcset", e), t.removeAttribute("data-srcset")), i && (t.setAttribute("src", i), t.removeAttribute("data-src"))
            }), this.handleImageLoad()
        },
        handleImageLoad: function() {
            var t = this;
            if ("image" === this.mediaType) {
                var e = function() {
                    t.mediaContainer.removeAttribute("data-lazy"), t.loadedCallback && t.loadedCallback(t.mediaContainer)
                };
                this.imageElement ? Dribbble.imageOnLoad(this.imageElement, e) : e()
            }
            "video" === this.mediaType && (this.videoElement.onloadstart = function() {
                t.mediaContainer.removeAttribute("data-lazy")
            })
        }
    }, Dribbble.Carousel = function(t) {
        this.create(t)
    }, Dribbble.Carousel.prototype = {
        create: function(t) {
            if (this.applyOptions(t), this.selector = "string" == typeof this.selector ? document.querySelector(this.selector) : this.selector, null === this.selector) throw new Error("Something wrong with your selector");
            this.activeBreakpoint = null, this.updateFromBreakpoint(), this.selectorWidth = this.selector.offsetWidth, this.innerElements = [].slice.call(this.selector.children), this.slidesCount = this.innerElements.length, this.currentSlideIndex = Math.max(0, Math.min(this.startIndex, this.slidesCount - this.perPage)), this.transformProperty = this.getTransformProperty(), this.resizeTimer = null, Dribbble.Globals.throttle().then(function(t) {
                this.resizeHandler = t(function() {
                    this.recalculateSlides()
                }.bind(this), 100), window.addEventListener("resize", this.resizeHandler)
            }.bind(this));
            var e = ["touchstartHandler", "touchendHandler", "touchmoveHandler", "mousedownHandler", "mouseupHandler", "mouseleaveHandler", "mousemoveHandler", "clickHandler"];
            this.resizeObserverSelector && this.observeResize();
            for (var i = 0; i < e.length; i++) this[e[i]] = this[e[i]].bind(this);
            this.initialize()
        },
        applyOptions: function(t) {
            var e = t || {},
                i = {
                    selector: ".dribbble-carousel",
                    wrapperClass: "dribbble-carousel-wrapper display-flex",
                    slideClass: "dribbble-carousel-slide",
                    disableAnimation: !1,
                    duration: 200,
                    easing: "ease-out",
                    perPage: 1,
                    spaceBetween: 0,
                    previewPadding: 0,
                    preventClickOnDrag: !1,
                    preview: !1,
                    breakpoints: {},
                    startIndex: 0,
                    draggable: !0,
                    multipleDrag: !0,
                    threshold: 20,
                    resizeObserverSelector: "",
                    onInit: function() {},
                    onBeforeChange: function() {},
                    onChange: function() {}
                };
            for (var n in i) this[n] = e.hasOwnProperty(n) ? e[n] : i[n];
            this.preview && (this.previewPadding = 2 * this.spaceBetween)
        },
        updateFromBreakpoint: function() {
            var t = this.activeBreakpoint;
            for (var e in this.breakpoints) window.innerWidth >= e && (this.activeBreakpoint = e);
            this.activeBreakpoint = null !== this.activeBreakpoint && window.innerWidth >= this.activeBreakpoint ? this.activeBreakpoint : null, t !== this.activeBreakpoint && (null !== t && null === this.activeBreakpoint ? this.updateOptions() : this.updateOptions(
                this.breakpoints[this.activeBreakpoint]))
        },
        updateOptions: function(t) {
            var e = t || {};
            for (var i in this.defaultSet || (this.defaultAllowedOptions = {
                    disableAnimation: this.disableAnimation,
                    duration: this.duration,
                    easing: this.easing,
                    perPage: this.perPage,
                    draggable: this.draggable,
                    multipleDrag: this.multipleDrag,
                    threshold: this.threshold,
                    spaceBetween: this.spaceBetween,
                    preview: this.preview
                }, this.defaultSet = !0), this.defaultAllowedOptions) this[i] = e.hasOwnProperty(i) ? e[i] : this.defaultAllowedOptions[i];
            this.eventsBinded && (this.draggable ? this.bindDragEvent() : this.removeDragEvents())
        },
        initialize: function() {
            this.bindEventListeners(), this.selector.style.overflow = "hidden", this.buildSliderFrame(), this.onInit(this)
        },
        bindEventListeners: function() {
            this.bindDragEvent(), this.eventsBinded = !0
        },
        bindDragEvent: function() {
            this.draggable && (this.pointerDown = !1, this.drag = {
                startX: 0,
                endX: 0,
                startY: 0,
                letItGo: null,
                preventClick: !1
            }, this.selector.addEventListener("touchstart", this.touchstartHandler, {
                passive: !0
            }), this.selector.addEventListener("touchend", this.touchendHandler), this.selector.addEventListener("touchmove", this.touchmoveHandler), this.selector.addEventListener("mousedown", this.mousedownHandler), this.selector.addEventListener("mouseup", this.mouseupHandler), this.selector.addEventListener("mouseleave", this.mouseleaveHandler), this.selector.addEventListener("mousemove", this.mousemoveHandler), this.selector.addEventListener("click", this.clickHandler))
        },
        removeDragEvents: function() {
            this.selector.removeEventListener("touchstart", this.touchstartHandler), this.selector.removeEventListener("touchend", this.touchendHandler), this.selector.removeEventListener("touchmove", this.touchmoveHandler), this.selector.removeEventListener("mousedown", this.mousedownHandler), this.selector.removeEventListener("mouseup", this.mouseupHandler), this.selector.removeEventListener("mouseleave", this.mouseleaveHandler), this.selector.removeEventListener("mousemove", this.mousemoveHandler), this.selector.removeEventListener("click", this.clickHandler)
        },
        removeAllEventListeners: function() {
            window.removeEventListener("resize", this.resizeHandler), this.removeDragEvents()
        },
        buildSliderFrame: function() {
            this.sliderFrame = document.createElement("div"), this.sliderFrame.className = this.wrapperClass, this.sliderFrame.style.width = this.getSlideWidth(!0) * this.slidesCount + this.previewPadding + "px", this.enableTransition(), this.selector.style.cursor = this.draggable ? "-webkit-grab" : "inherit";
            for (var t = document.createDocumentFragment(), e = 0; e < this.slidesCount; e++) {
                var i = this.buildSliderFrameItem(this.innerElements[e], 0 === e);
                t.appendChild(i)
            }
            this.sliderFrame.appendChild(t), this.selector.innerHTML = "", this.selector.appendChild(this.sliderFrame), this.slideToCurrent()
        },
        buildSliderFrameItem: function(t, e) {
            var i = document.createElement("div");
            return i.className = this.slideClass, this.spaceBetween ? (i.style.width = this.getSlideWidth() + "px", e && this.preview && (i.style.marginLeft = this.previewPadding + "px"), i.style.marginRight = this.spaceBetween + "px") : i.style.width = 100 / this.slidesCount + "%", i.appendChild(t), i
        },
        getSlideWidth: function(t) {
            var e = this.selectorWidth / this.perPage;
            if (this.spaceBetween) {
                if (this.preview) var i = this.perPage * (2 * this.previewPadding);
                else i = (this.perPage - 1) * this.spaceBetween;
                e = (this.selectorWidth - i) / this.perPage, t && (e += this.spaceBetween)
            }
            return e
        },
        slideToCurrent: function(t, e) {
            var i = -1 * this.currentSlideIndex * this.getSlideWidth(!0);
            if (this.disableAnimation && this.disableTransition(), this.sliderFrame.style[this.transformProperty] = "translate3d(" + i + "px, 0, 0)", t)
                if (this.onBeforeChange(e, this.currentSlideIndex), this.disableAnimation) this.onChange(e, this.currentSlideIndex);
                else {
                    var n = this;
                    window.setTimeout(function() {
                        n.onChange(e, n.currentSlideIndex)
                    }, n.duration)
                }
        },
        prev: function(t, e) {
            var i = t || 1;
            if (!(this.slidesCount <= this.perPage)) {
                var n = this.currentSlideIndex;
                this.currentSlideIndex = Math.max(this.currentSlideIndex - i, 0), isNaN(this.currentSlideIndex) || this.currentSlideIndex === n || (this.slideToCurrent(!0, n), e && e.call(this))
            }
        },
        next: function(t, e) {
            var i = t || 1;
            if (!(this.slidesCount <= this.perPage)) {
                var n = this.currentSlideIndex;
                this.currentSlideIndex = Math.min(this.currentSlideIndex + i, this.slidesCount - this.perPage), isNaN(this.currentSlideIndex) || this.currentSlideIndex === n || (this.slideToCurrent(!0, n), e && e.call(this))
            }
        },
        goTo: function(t, e) {
            if (!(this.slidesCount <= this.perPage)) {
                var i = this.currentSlideIndex;
                this.currentSlideIndex = Math.min(Math.max(t, 0), this.slidesCount - this.perPage), isNaN(this.currentSlideIndex) || this.currentSlideIndex === i || (this.slideToCurrent(!0, i), e && e.call(this))
            }
        },
        recalculateSlides: function() {
            this.updateFromBreakpoint(), this.currentSlideIndex + this.perPage > this.slidesCount && (this.currentSlideIndex = this.slidesCount <= this.perPage ? 0 : this.slidesCount - this.perPage), this.selectorWidth = this.selector.offsetWidth, this.buildSliderFrame()
        },
        observeResize: function() {
            var t = new ResizeObserver(function() {
                    this.recalculateSlides()
                }.bind(this)),
                e = document.querySelector(this.resizeObserverSelector);
            e && t.observe(e)
        },
        touchstartHandler: function(t) {
            -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(t.target.nodeName) || (t.stopPropagation(), this.pointerDown = !0, this.drag.startX = t.touches[0].pageX, this.drag.startY = t.touches[0].pageY)
        },
        touchendHandler: function(t) {
            t.stopPropagation(), this.pointerDown = !1, this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag()
        },
        touchmoveHandler: function(t) {
            if (t.stopPropagation(), null === this.drag.letItGo && (this.drag.letItGo = Math.abs(this.drag.startY - t.touches[0].pageY) < Math.abs(this.drag.startX - t.touches[0].pageX)), this.pointerDown && this.drag.letItGo) {
                t.preventDefault(), this.drag.endX = t.touches[0].pageX;
                var e = "all 0ms " + this.easing;
                this.sliderFrame.style.webkitTransition = e, this.sliderFrame.style.transition = e;
                var i = -1 * (this.currentSlideIndex * this.getSlideWidth(!0) - (this.drag.endX - this.drag.startX));
                this.sliderFrame.style[this.transformProperty] = "translate3d(" + i + "px, 0, 0)"
            }
        },
        mousedownHandler: function(t) {
            -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(t.target.nodeName) || (t.preventDefault(), t.stopPropagation(), this.pointerDown = !0, this.drag.startX = t.pageX)
        },
        mouseupHandler: function(t) {
            t.stopPropagation(), this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag()
        },
        mouseleaveHandler: function(t) {
            this.pointerDown && (this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", this.drag.endX = t.pageX, this.drag.preventClick = !1, this.enableTransition(), this.updateAfterDrag(), this.clearDrag())
        },
        mousemoveHandler: function(t) {
            if (t.preventDefault(), this.pointerDown) {
                ("A" === t.target.nodeName || this.preventClickOnDrag) && (this.drag.preventClick = !0), this.drag.endX = t.pageX, this.selector.style.cursor = "-webkit-grabbing";
                var e = "all 0ms " + this.easing;
                this.sliderFrame.style.webkitTransition = e, this.sliderFrame.style.transition = e;
                var i = -1 * (this.currentSlideIndex * this.getSlideWidth(!0) - (this.drag.endX - this.drag.startX));
                this.sliderFrame.style[this.transformProperty] = "translate3d(" + i + "px, 0, 0)"
            }
        },
        clickHandler: function(t) {
            this.drag.preventClick && t.preventDefault(), this.drag.preventClick = !1
        },
        updateAfterDrag: function() {
            var t = 1 * (this.drag.endX - this.drag.startX),
                e = Math.abs(t),
                i = this.multipleDrag ? Math.ceil(e / this.getSlideWidth(!0)) : 1;
            0 < t && e > this.threshold && this.slidesCount > this.perPage ? this.prev(i) : t < 0 && e > this.threshold && this.slidesCount > this.perPage && this.next(i), this.slideToCurrent()
        },
        remove: function(t, e) {
            if (t < 0 || t >= this.slidesCount) throw new Error("Item to remove doesn't exist");
            var i = t < this.currentSlideIndex,
                n = this.currentSlideIndex + this.perPage - 1 === t;
            (i || n) && this.currentSlideIndex--, this.innerElements.splice(t, 1), this.slidesCount = this.innerElements.length, this.buildSliderFrame(), e && e.call(this)
        },
        insert: function(t, e, i) {
            if (e < 0 || e > this.slidesCount + 1) throw new Error("Unable to inset it at this index");
            if (-1 !== this.innerElements.indexOf(t)) throw new Error("Can't insert the same item");
            var n = 0 < (e <= this.currentSlideIndex) && this.slidesCount;
            this.currentSlideIndex = n ? this.currentSlideIndex + 1 : this.currentSlideIndex, this.innerElements.splice(e, 0, t), this.slidesCount = this.innerElements.length, this.buildSliderFrame(), i && i.call(this)
        },
        prepend: function(t, e) {
            this.insert(t, 0), e && e.call(this)
        },
        append: function(t, e) {
            this.insert(t, this.slidesCount + 1), e && e.call(this)
        },
        destroy: function(t, e) {
            var i = t || !1;
            if (this.removeAllEventListeners(), this.selector.style.cursor = "auto", i) {
                for (var n = document.createDocumentFragment(), s = 0; s < this.slidesCount; s++) n.appendChild(this.innerElements[s]);
                this.selector.innerHTML = "", this.selector.appendChild(n), this.selector.removeAttribute("style")
            }
            e && e.call(this)
        },
        enableTransition: function() {
            var t = "transform " + this.duration + "ms " + this.easing;
            this.sliderFrame.style.webkitTransition = t, this.sliderFrame.style.transition = t
        },
        disableTransition: function() {
            var t = "transform 0ms " + this.easing;
            this.sliderFrame.style.webkitTransition = t, this.sliderFrame.style.transition = t
        },
        clearDrag: function() {
            this.drag = {
                startX: 0,
                endX: 0,
                startY: 0,
                letItGo: null,
                preventClick: this.drag.preventClick
            }
        },
        getTransformProperty: function() {
            return "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform"
        }
    }, Dribbble.MediaGallery = {
        initialize: function() {
            this.mediaContainer = document.querySelector(".js-media-container"), null !== this.mediaContainer && (this.media = this.mediaContainer.querySelectorAll(".js-media-shot") || [], this.hasGallery = this.mediaContainer.classList.contains("has-gallery"), this.galleryThumbnailsContainer = this.mediaContainer.querySelector(".js-media-gallery-thumbnails") || null, this.galleryThumbnailsMedia = this.galleryThumbnailsContainer ? this.galleryThumbnailsContainer.querySelectorAll(".js-media-shot-small") : [], this.previousButtonTarget = this.mediaContainer.querySelector(".js-media-gallery-navigation-target.previous"), this.nextButtonTarget = this.mediaContainer.querySelector(".js-media-gallery-navigation-target.next"), this.previousButton = this.mediaContainer.querySelector(".js-media-gallery-navigation.previous"), this.nextButton = this.mediaContainer.querySelector(".js-media-gallery-navigation.next"), this.intersectionObserver = null, this.hasGallery && (this.setupGallery(), this.galleryThumbnailsContainer && this.galleryThumbnailsMedia.length && this.setupGalleryThumbnails()), Dribbble.isMobile() && this.setupMobile())
        },
        setupGallery: function() {
            this.Gallery = new Dribbble.Carousel({
                selector: ".js-media-gallery",
                spaceBetween: 0,
                onInit: this.onGalleryInit.bind(this),
                onBeforeChange: this.onGalleryBeforeChange.bind(this),
                onChange: this.onGalleryChange.bind(this),
                resizeObserverSelector: ".js-media-content",
                breakpoints: {
                    1e3: {
                        spaceBetween: 0,
                        disableAnimation: !1,
                        draggable: !1
                    }
                }
            })
        },
        setupGalleryThumbnails: function() {
            this.galleryThumbnailsMedia.forEach(function(t) {
                var e = this;
                t.addEventListener("click", function() {
                    e.Gallery.goTo(this.dataset.index)
                })
            }.bind(this)), this.checkScroll(), Dribbble.Globals.debounce().then(function(t) {
                var e = t(this.handleResize.bind(this), 100);
                window.addEventListener("resize", e)
            }.bind(this))
        },
        onGalleryInit: function(t) {
            var e = t.currentSlideIndex + 1;
            this.media[t.currentSlideIndex].getAttribute("data-media-id");
            this.previousButtonTarget.addEventListener("click", function() {
                t.prev()
            }), this.nextButtonTarget.addEventListener("click", function() {
                t.next()
            }), this.previousButtonTarget.style.cursor = "pointer", this.nextButtonTarget.style.cursor = "pointer", 1 === e && (this.previousButton.classList.add("d-none"), this.previousButtonTarget.style.cursor = "default"), this.addActiveThumbnailClass(t.currentSlideIndex)
        },
        onGalleryBeforeChange: function(t, e) {
            this.removeActiveThumbnailClass(t), this.addActiveThumbnailClass(e), this.shouldScrollThumbnails(e);
            var i = this.media[t].querySelector("video");
            null !== i && i.pause()
        },
        onGalleryChange: function(t, e) {
            var i = this.media[e],
                n = this.media[e].querySelector("video"),
                s = e + 1;
            i.getAttribute("data-media-id");
            this.previousButton.classList.remove("d-none"), this.nextButton.classList.remove("d-none"), this.previousButtonTarget.style.cursor = "pointer", this.nextButtonTarget.style.cursor = "pointer", 1 === s && (this.previousButton.classList.add("d-none"), this.previousButtonTarget.style.cursor = "default"), s === this.media.length && (this.nextButton.classList.add("d-none"), this.previousButtonTarget.style.cursor = "default"), null === n || i.hasAttribute("data-lazy") || n.play()
        },
        addActiveThumbnailClass: function(t) {
            this.galleryThumbnailsMedia[t].classList.add("active")
        },
        removeActiveThumbnailClass: function(t) {
            this.galleryThumbnailsMedia[t].classList.remove("active")
        },
        shouldScrollThumbnails: function(t) {
            if (!0 === this.thumbnailScrollable) {
                var e = this.galleryThumbnailsMedia[t],
                    i = e.clientWidth,
                    n = this.galleryThumbnailsMedia[t - 1] || e,
                    s = this.galleryThumbnailsMedia[t + 1] || e,
                    r = 40,
                    o = this.galleryThumbnailsContainer.getBoundingClientRect().left,
                    a = Math.round(n.getBoundingClientRect().left - o),
                    l = Math.round(s.getBoundingClientRect().left - o),
                    h = Math.round(this.galleryThumbnailsContainer.scrollLeft);
                a < 0 && $(this.galleryThumbnailsContainer).stop(!0, !0).animate({
                    scrollLeft: a + (h - r)
                }, 200), l + i > this.thumbnailsContainerWidth && $(this.galleryThumbnailsContainer).stop(!0, !0).animate({
                    scrollLeft: l + (i + r) - (this.thumbnailsContainerWidth - h)
                }, 200)
            }
        },
        checkScroll: function() {
            this.thumbnailScrollable = !1, this.thumbnailsContainerWidth = this.galleryThumbnailsContainer.offsetWidth, this.thumbnailsContainerScrollWidth = this.galleryThumbnailsContainer.scrollWidth, this.thumbnailsContainerScrollWidth > this.thumbnailsContainerWidth ? (this.thumbnailScrollable = !0, this.galleryThumbnailsContainer.classList.add("scrollable")) : (this.thumbnailScrollable = !1, this.galleryThumbnailsContainer.classList.remove("scrollable")), this.updateScrollIndicators(), this.thumbnailScrollable && !this.hasScrollEvent && (Dribbble.Globals.debounce().then(function(t) {
                var e = t(this.handleThumbnailsScroll.bind(this), 100);
                this.galleryThumbnailsContainer.addEventListener("scroll", e)
            }.bind(this)), this.hasScrollEvent = !0)
        },
        updateScrollIndicators: function() {
            var t = this.mediaContainer.querySelector(".scroll-backward"),
                e = this.mediaContainer.querySelector(".scroll-forward"),
                i = Math.ceil(this.galleryThumbnailsContainer.scrollLeft),
                n = 0 < i,
                s = i + this.thumbnailsContainerWidth >= this.thumbnailsContainerScrollWidth;
            n ? t.classList.add("visible") : t.classList.remove("visible"), s ? e.classList.remove("visible") : e.classList.add("visible")
        },
        handleThumbnailsScroll: function() {
            this.updateScrollIndicators()
        },
        handleResize: function() {
            this.checkScroll()
        },
        setupMobile: function() {
            this.media.forEach(function(t) {
                var e = t.querySelector(".cropped-indicator");
                e && (e.removeAttribute("rel"), e.removeAttribute("original-title"))
            })
        }
    }, Dribbble.Viewport = {
        height: function() {
            return window.innerHeight || document.documentElement.clientHeight
        },
        isVerticallyVisible: function(t, e) {
            e = e || 0;
            var i = t.getBoundingClientRect();
            return i.top > -1 * e && i.bottom < this.height() + e
        }
    }, Dribbble.LargeShotViewRecorder = {
        start: function() {
            var t;
            $(window).off("scroll.largeShotViewRecorder"), $(window).on("scroll.largeShotViewRecorder", function() {
                clearTimeout(t), t = setTimeout(function() {
                    this.considerShotsViewed()
                }.bind(this), 500)
            }.bind(this)), setTimeout(this.considerShotsViewed.bind(this), 1e3)
        },
        getScreenshotsInViewPort: function() {
            return $(".js-thumbnail[id^=screenshot-]").filter(function() {
                return Dribbble.Viewport.isVerticallyVisible(this, 30)
            })
        },
        considerShotsViewed: function() {
            this.getScreenshotsInViewPort().each(function(t, e) {
                var i = parseInt(e.id.split("-")[1], 10);
                Dribbble.Shots.logView(i)
            })
        }
    }, Dribbble.LargeShotViewRecorder.start();