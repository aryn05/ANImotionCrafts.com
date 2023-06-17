function memberContainer(e) {
    var t = $(e).closest("li.player, .floating-sidebar-container, .shot-byline .attribution, .js-hover-card .js-hover-card-follow, .hover-card .profile-head, .screenshot-meta, .overlay, .user-card .profile-head, .user-card-container .buttons-container, .profile-masthead, js-resume-card, .js-designer-card, .js-shot-header-action-links, .js-follow-prompt-container, [data-collaborators-dropdown-item], .js-followed"),
        i = $("." + t.attr("class").match(/user-row-\d+/));
    return i.length ? i : t
}

function numberWithDelimiter(e) {
    return e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
$D = {
        addClass: function(e, t) {
            "function" == typeof e.addClass ? e.addClass(t) : e.classList.add(t)
        },
        removeClass: function(e, t) {
            "function" == typeof e.removeClass ? e.removeClass(t) : e.classList.remove(t)
        },
        hide: function(e) {
            $D.addClass(e, "d-none")
        },
        show: function(e) {
            $D.removeClass(e, "d-none")
        },
        hasClass: function(e, t) {
            e.classList.contains(t)
        },
        toggleClass: function(e, t) {
            e.classList.toggle(t)
        },
        setValue: function(e, t) {
            "string" == typeof e ? els = Array.prototype.slice.call(document.querySelectorAll(e)) : Array.isArray(e) ? els = e : els = Array.of(e), els.forEach(function(e) {
                e.value = t
            })
        },
        createElement: function(e, t) {
            t = t || {};
            var i = document.createElement(e);
            return t.text && (i.textContent = t.text, delete t.text), t["class"] && (t["class"].split(" ").forEach(function(e) {
                i.classList.add(e)
            }), delete t["class"]), Object.keys(t).forEach(function(e) {
                i.setAttribute(e, t[e])
            }), i
        }
    },
    function() {
        "use strict";
        var e = function(c, l) {
            var d;
            c.rails !== l && c.error("jquery-ujs has already been loaded!");
            var e = c(document);
            c.rails = d = {
                linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
                inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                formSubmitSelector: "form",
                formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
                fileInputSelector: "input[name][type=file]:not([disabled])",
                linkDisableSelector: "a[data-disable-with], a[data-disable]",
                buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
                csrfToken: function() {
                    return c("meta[name=csrf-token]").attr("content")
                },
                csrfParam: function() {
                    return c("meta[name=csrf-param]").attr("content")
                },
                CSRFProtection: function(e) {
                    var t = d.csrfToken();
                    t && e.setRequestHeader("X-CSRF-Token", t)
                },
                refreshCSRFTokens: function() {
                    c('form input[name="' + d.csrfParam() + '"]').val(d.csrfToken())
                },
                fire: function(e, t, i) {
                    var n = c.Event(t);
                    return e.trigger(n, i), !1 !== n.result
                },
                confirm: function(e) {
                    return confirm(e)
                },
                ajax: function(e) {
                    return c.ajax(e)
                },
                href: function(e) {
                    return e[0].href
                },
                isRemote: function(e) {
                    return e.data("remote") !== l && !1 !== e.data("remote")
                },
                handleRemote: function(n) {
                    var e, t, i, o, a, r;
                    if (d.fire(n, "ajax:before")) {
                        if (o = n.data("with-credentials") || null, a = n.data("type") || c.ajaxSettings && c.ajaxSettings.dataType, n.is("form")) {
                            e = n.data("ujs:submit-button-formmethod") || n.attr("method"), t = n.data("ujs:submit-button-formaction") || n.attr("action"), i = c(n[0]).serializeArray();
                            var s = n.data("ujs:submit-button");
                            s && (i.push(s), n.data("ujs:submit-button", null)), n.data("ujs:submit-button-formmethod", null), n.data("ujs:submit-button-formaction", null)
                        } else n.is(d.inputChangeSelector) ? (e = n.data("method"), t = n.data("url"), i = n.serialize(), n.data("params") && (i = i + "&" + n.data("params"))) : n.is(d.buttonClickSelector) ? (e = n.data("method") || "get", t = n.data("url"), i = n.serialize(), n.data("params") && (i = i + "&" + n.data("params"))) : (e = n.data("method"), t = d.href(n), i = n.data("params") || null);
                        return r = {
                            type: e || "GET",
                            data: i,
                            dataType: a,
                            beforeSend: function(e, t) {
                                if (t.dataType === l && e.setRequestHeader("accept", "*/*;q=0.5, " + t.accepts.script), !d.fire(n, "ajax:beforeSend", [e, t])) return !1;
                                n.trigger("ajax:send", e)
                            },
                            success: function(e, t, i) {
                                n.trigger("ajax:success", [e, t, i])
                            },
                            complete: function(e, t) {
                                n.trigger("ajax:complete", [e, t])
                            },
                            error: function(e, t, i) {
                                n.trigger("ajax:error", [e, t, i])
                            },
                            crossDomain: d.isCrossDomain(t)
                        }, o && (r.xhrFields = {
                            withCredentials: o
                        }), t && (r.url = t), d.ajax(r)
                    }
                    return !1
                },
                isCrossDomain: function(e) {
                    var t = document.createElement("a");
                    t.href = location.href;
                    var i = document.createElement("a");
                    try {
                        return i.href = e, i.href = i.href, !((!i.protocol || ":" === i.protocol) && !i.host || t.protocol + "//" + t.host == i.protocol + "//" + i.host)
                    } catch (n) {
                        return !0
                    }
                },
                handleMethod: function(e) {
                    var t = d.href(e),
                        i = e.data("method"),
                        n = e.attr("target"),
                        o = d.csrfToken(),
                        a = d.csrfParam(),
                        r = c('<form method="post" action="' + t + '"></form>'),
                        s = '<input name="_method" value="' + i + '" type="hidden" />';
                    a === l || o === l || d.isCrossDomain(t) || (s += '<input name="' + a + '" value="' + o + '" type="hidden" />'), n && r.attr("target", n), r.hide().append(s).appendTo("body"), r.trigger("submit")
                },
                formElements: function(e, t) {
                    return e.is("form") ? c(e[0].elements).filter(t) : e.find(t)
                },
                disableFormElements: function(e) {
                    d.formElements(e, d.disableSelector).each(function() {
                        d.disableFormElement(c(this))
                    })
                },
                disableFormElement: function(e) {
                    var t, i;
                    t = e.is("button") ? "html" : "val", (i = e.data("disable-with")) !== l && (e.data("ujs:enable-with", e[t]()), e[t](i)), e.prop("disabled", !0), e.data("ujs:disabled", !0)
                },
                enableFormElements: function(e) {
                    d.formElements(e, d.enableSelector).each(function() {
                        d.enableFormElement(c(this))
                    })
                },
                enableFormElement: function(e) {
                    var t = e.is("button") ? "html" : "val";
                    e.data("ujs:enable-with") !== l && (e[t](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.prop("disabled", !1), e.removeData("ujs:disabled")
                },
                allowAction: function(e) {
                    var t, i = e.data("confirm"),
                        n = !1;
                    if (!i) return !0;
                    if (d.fire(e, "confirm")) {
                        try {
                            n = d.confirm(i)
                        } catch (o) {
                            (console.error || console.log).call(console, o.stack || o)
                        }
                        t = d.fire(e, "confirm:complete", [n])
                    }
                    return n && t
                },
                blankInputs: function(e, t, i) {
                    var n, o, a, r = c(),
                        s = t || "input,textarea",
                        l = e.find(s),
                        d = {};
                    return l.each(function() {
                        (n = c(this)).is("input[type=radio]") ? (a = n.attr("name"), d[a] || (0 === e.find('input[type=radio]:checked[name="' + a + '"]').length && (o = e.find('input[type=radio][name="' + a + '"]'), r = r.add(o)), d[a] = a)) : (n.is("input[type=checkbox],input[type=radio]") ? n.is(":checked") : !!n.val()) === i && (r = r.add(n))
                    }), !!r.length && r
                },
                nonBlankInputs: function(e, t) {
                    return d.blankInputs(e, t, !0)
                },
                stopEverything: function(e) {
                    return c(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
                },
                disableElement: function(e) {
                    var t = e.data("disable-with");
                    t !== l && (e.data("ujs:enable-with", e.html()), e.html(t)), e.bind("click.railsDisable", function(e) {
                        return d.stopEverything(e)
                    }), e.data("ujs:disabled", !0)
                },
                enableElement: function(e) {
                    e.data("ujs:enable-with") !== l && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable"), e.removeData("ujs:disabled")
                }
            }, d.fire(e, "rails:attachBindings") && (c.ajaxPrefilter(function(e, t, i) {
                e.crossDomain || d.CSRFProtection(i)
            }), c(window).on("pageshow.rails", function() {
                c(c.rails.enableSelector).each(function() {
                    var e = c(this);
                    e.data("ujs:disabled") && c.rails.enableFormElement(e)
                }), c(c.rails.linkDisableSelector).each(function() {
                    var e = c(this);
                    e.data("ujs:disabled") && c.rails.enableElement(e)
                })
            }), e.on("ajax:complete", d.linkDisableSelector, function() {
                d.enableElement(c(this))
            }), e.on("ajax:complete", d.buttonDisableSelector, function() {
                d.enableFormElement(c(this))
            }), e.on("click.rails", d.linkClickSelector, function(e) {
                var t = c(this),
                    i = t.data("method"),
                    n = t.data("params"),
                    o = e.metaKey || e.ctrlKey;
                if (!d.allowAction(t)) return d.stopEverything(e);
                if (!o && t.is(d.linkDisableSelector) && d.disableElement(t), d.isRemote(t)) {
                    if (o && (!i || "GET" === i) && !n) return !0;
                    var a = d.handleRemote(t);
                    return !1 === a ? d.enableElement(t) : a.fail(function() {
                        d.enableElement(t)
                    }), !1
                }
                return i ? (d.handleMethod(t), !1) : void 0
            }), e.on("click.rails", d.buttonClickSelector, function(e) {
                var t = c(this);
                if (!d.allowAction(t) || !d.isRemote(t)) return d.stopEverything(e);
                t.is(d.buttonDisableSelector) && d.disableFormElement(t);
                var i = d.handleRemote(t);
                return !1 === i ? d.enableFormElement(t) : i.fail(function() {
                    d.enableFormElement(t)
                }), !1
            }), e.on("change.rails", d.inputChangeSelector, function(e) {
                var t = c(this);
                return d.allowAction(t) && d.isRemote(t) ? (d.handleRemote(t), !1) : d.stopEverything(e)
            }), e.on("submit.rails", d.formSubmitSelector, function(e) {
                var t, i, n = c(this),
                    o = d.isRemote(n);
                if (!d.allowAction(n)) return d.stopEverything(e);
                if (n.attr("novalidate") === l)
                    if (n.data("ujs:formnovalidate-button") === l) {
                        if ((t = d.blankInputs(n, d.requiredInputSelector, !1)) && d.fire(n, "ajax:aborted:required", [t])) return d.stopEverything(e)
                    } else n.data("ujs:formnovalidate-button", l);
                if (o) {
                    if (i = d.nonBlankInputs(n, d.fileInputSelector)) {
                        setTimeout(function() {
                            d.disableFormElements(n)
                        }, 13);
                        var a = d.fire(n, "ajax:aborted:file", [i]);
                        return a || setTimeout(function() {
                            d.enableFormElements(n)
                        }, 13), a
                    }
                    return d.handleRemote(n), !1
                }
                setTimeout(function() {
                    d.disableFormElements(n)
                }, 13)
            }), e.on("click.rails", d.formInputClickSelector, function(e) {
                var t = c(this);
                if (!d.allowAction(t)) return d.stopEverything(e);
                var i = t.attr("name"),
                    n = i ? {
                        name: i,
                        value: t.val()
                    } : null,
                    o = t.closest("form");
                0 === o.length && (o = c("#" + t.attr("form"))), o.data("ujs:submit-button", n), o.data("ujs:formnovalidate-button", t.attr("formnovalidate")), o.data("ujs:submit-button-formaction", t.attr("formaction")), o.data("ujs:submit-button-formmethod", t.attr("formmethod"))
            }), e.on("ajax:send.rails", d.formSubmitSelector, function(e) {
                this === e.target && d.disableFormElements(c(this))
            }), e.on("ajax:complete.rails", d.formSubmitSelector, function(e) {
                this === e.target && d.enableFormElements(c(this))
            }), c(function() {
                d.refreshCSRFTokens()
            }))
        };
        window.jQuery ? e(jQuery) : "object" == typeof exports && "object" == typeof module && (module.exports = e)
    }(),
    function(s) {
        function l(e, t) {
            return "function" == typeof e ? e.call(t) : e
        }

        function t(e) {
            for (; e = e.parentNode;)
                if (e == document) return !0;
            return !1
        }

        function d(e, t) {
            this.$element = s(e), this.options = t, this.enabled = !0, this.fixTitle()
        }
        d.prototype = {
            show: function() {
                var e = this.getTitle();
                if (e && this.enabled) {
                    var t = this.tip();
                    t.find(".tipsy-inner")[this.options.html ? "html" : "text"](e), t[0].className = "tipsy", t.remove().css({
                        top: 0,
                        left: 0,
                        visibility: "hidden",
                        display: "block"
                    }).prependTo(document.body);
                    var i, n = s.extend({}, this.$element.offset(), {
                            width: this.$element[0].offsetWidth,
                            height: this.$element[0].offsetHeight
                        }),
                        o = t[0].offsetWidth,
                        a = t[0].offsetHeight,
                        r = l(this.options.gravity, this.$element[0]);
                    switch (r.charAt(0)) {
                        case "n":
                            i = {
                                top: n.top + n.height + this.options.offset,
                                left: n.left + n.width / 2 - o / 2
                            };
                            break;
                        case "s":
                            i = {
                                top: n.top - a - this.options.offset,
                                left: n.left + n.width / 2 - o / 2
                            };
                            break;
                        case "e":
                            i = {
                                top: n.top + n.height / 2 - a / 2,
                                left: n.left - o - this.options.offset
                            };
                            break;
                        case "w":
                            i = {
                                top: n.top + n.height / 2 - a / 2,
                                left: n.left + n.width + this.options.offset
                            }
                    }
                    2 == r.length && ("w" == r.charAt(1) ? i.left = n.left + n.width / 2 - 15 : i.left = n.left + n.width / 2 - o + 15), t.css(i).addClass("tipsy-" + r), t.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + r.charAt(0), this.options.className && t.addClass(l(this.options.className, this.$element[0])), this.options.fade ? t.stop().css({
                        opacity: 0,
                        display: "block",
                        visibility: "visible"
                    }).animate({
                        opacity: this.options.opacity
                    }) : t.css({
                        visibility: "visible",
                        opacity: this.options.opacity
                    })
                }
            },
            hide: function() {
                this.options.fade ? this.tip().stop().fadeOut(function() {
                    s(this).remove()
                }) : this.tip().remove()
            },
            fixTitle: function() {
                var e = this.$element;
                (e.attr("title") || "string" != typeof e.attr("original-title")) && e.attr("original-title", e.attr("title") || "").removeAttr("title")
            },
            getTitle: function() {
                if (this.enabled) {
                    var e, t = this.$element,
                        i = this.options;
                    return this.fixTitle(), "string" == typeof(i = this.options).title ? e = t.attr("title" == i.title ? "original-title" : i.title) : "function" == typeof i.title && (e = i.title.call(t[0])), (e = ("" + e).replace(/(^\s*|\s*$)/, "")) || i.fallback
                }
            },
            tip: function() {
                return this.$tip || (this.$tip = s('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), this.$tip.data("tipsy-pointee", this.$element[0])), this.$tip
            },
            validate: function() {
                this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
            },
            enable: function() {
                this.enabled = !0
            },
            disable: function() {
                this.enabled = !1
            },
            toggleEnabled: function() {
                this.enabled = !this.enabled
            }
        }, s.fn.tipsy = function(i) {
            function t(e) {
                var t = s.data(e, "tipsy");
                return t || (t = new d(e, s.fn.tipsy.elementOptions(e, i)), s.data(e, "tipsy", t)), t
            }

            function e() {
                var e = t(this);
                e.hoverState = "in", 0 == i.delayIn ? e.show() : (e.fixTitle(), setTimeout(function() {
                    "in" == e.hoverState && e.show()
                }, i.delayIn))
            }

            function n() {
                var e = t(this);
                e.hoverState = "out", 0 == i.delayOut ? e.hide() : setTimeout(function() {
                    "out" == e.hoverState && e.hide()
                }, i.delayOut)
            }
            if (!0 === i) return this.data("tipsy");
            if ("string" == typeof i) {
                var o = this.data("tipsy");
                return o && o[i](), this
            }
            if ((i = s.extend({}, s.fn.tipsy.defaults, i)).live || this.each(function() {
                    t(this)
                }), "manual" != i.trigger) {
                var a = "hover" == i.trigger ? "mouseenter" : "focus",
                    r = "hover" == i.trigger ? "mouseleave" : "blur";
                this.on(a, e).on(r, n)
            }
            return this
        }, s.fn.tipsy.defaults = {
            className: null,
            delayIn: 0,
            delayOut: 0,
            fade: !1,
            fallback: "",
            gravity: "n",
            html: !1,
            live: !1,
            offset: 0,
            opacity: .8,
            title: "title",
            trigger: "hover"
        }, s.fn.tipsy.revalidate = function() {
            s(".tipsy").each(function() {
                var e = s.data(this, "tipsy-pointee");
                e && t(e) || s(this).remove()
            })
        }, s.fn.tipsy.elementOptions = function(e, t) {
            return s.metadata ? s.extend({}, t, s(e).metadata()) : t
        }, s.fn.tipsy.autoNS = function() {
            return s(this).offset().top > s(document).scrollTop() + s(window).height() / 2 ? "s" : "n"
        }, s.fn.tipsy.autoWE = function() {
            return s(this).offset().left > s(document).scrollLeft() + s(window).width() / 2 ? "e" : "w"
        }, s.fn.tipsy.autoBounds = function(o, a) {
            return function() {
                var e = {
                        ns: a[0],
                        ew: 1 < a.length && a[1]
                    },
                    t = s(document).scrollTop() + o,
                    i = s(document).scrollLeft() + o,
                    n = s(this);
                return n.offset().top < t && (e.ns = "n"), n.offset().left < i && (e.ew = "w"), s(window).width() + s(document).scrollLeft() - n.offset().left < o && (e.ew = "e"), s(window).height() + s(document).scrollTop() - n.offset().top < o && (e.ns = "s"), e.ns + (e.ew ? e.ew : "")
            }
        }
    }(jQuery),
    function(e, n) {
        "use strict";
        var t = e.History = e.History || {},
            o = e.jQuery;
        if ("undefined" != typeof t.Adapter) throw new Error("History.js Adapter has already been loaded...");
        t.Adapter = {
            bind: function(e, t, i) {
                o(e).on(t, i)
            },
            trigger: function(e, t, i) {
                o(e).trigger(t, i)
            },
            extractEventData: function(e, t, i) {
                return t && t.originalEvent && t.originalEvent[e] || i && i[e] || n
            },
            onDomLoad: function(e) {
                o(e)
            }
        }, "undefined" != typeof t.init && t.init()
    }(window),
    function(r, i) {
        "use strict";
        var l = r.console || i,
            d = r.document,
            n = r.navigator,
            o = !1,
            a = r.setTimeout,
            s = r.clearTimeout,
            c = r.setInterval,
            u = r.clearInterval,
            h = r.JSON,
            b = r.alert,
            f = r.History = r.History || {},
            p = r.history;
        try {
            (o = r.sessionStorage).setItem("TEST", "1"), o.removeItem("TEST")
        } catch (e) {
            o = !1
        }
        if (h.stringify = h.stringify || h.encode, h.parse = h.parse || h.decode, "undefined" != typeof f.init) throw new Error("History.js Core has already been loaded...");
        f.init = function() {
            return "undefined" != typeof f.Adapter && ("undefined" != typeof f.initCore && f.initCore(), "undefined" != typeof f.initHtml4 && f.initHtml4(), !0)
        }, f.initCore = function() {
            if ("undefined" != typeof f.initCore.initialized) return !1;
            if (f.initCore.initialized = !0, f.options = f.options || {}, f.options.hashChangeInterval = f.options.hashChangeInterval || 100, f.options.safariPollInterval = f.options.safariPollInterval || 500, f.options.doubleCheckInterval = f.options.doubleCheckInterval || 500, f.options.disableSuid = f.options.disableSuid || !1, f.options.storeInterval = f.options.storeInterval || 1e3, f.options.busyDelay = f.options.busyDelay || 250, f.options.debug = f.options.debug || !1, f.options.initialTitle = f.options.initialTitle || d.title, f.options.html4Mode = f.options.html4Mode || !1, f.options.delayInit = f.options.delayInit || !1, f.intervalList = [], f.clearAllIntervals = function() {
                    var e, t = f.intervalList;
                    if (null != t) {
                        for (e = 0; e < t.length; e++) u(t[e]);
                        f.intervalList = null
                    }
                }, f.debug = function() {
                    f.options.debug && f.log.apply(f, arguments)
                }, f.log = function(e) {
                    var t, i, n, o, a, r = void 0 !== l && "undefined" != typeof l.log && "undefined" != typeof l.log.apply,
                        s = d.getElementById("log");
                    for (r ? (t = (o = Array.prototype.slice.call(arguments)).shift(), "undefined" != typeof l.debug ? l.debug.apply(l, [t, o]) : l.log.apply(l, [t, o])) : t = "\n" + e + "\n", i = 1, n = arguments.length; i < n; ++i) {
                        if ("object" == typeof(a = arguments[i]) && void 0 !== h) try {
                            a = h.stringify(a)
                        } catch (u) {}
                        t += "\n" + a + "\n"
                    }
                    return s ? (s.value += t + "\n-----\n", s.scrollTop = s.scrollHeight - s.clientHeight) : r || b(t), !0
                }, f.getInternetExplorerMajorVersion = function() {
                    return f.getInternetExplorerMajorVersion.cached = "undefined" != typeof f.getInternetExplorerMajorVersion.cached ? f.getInternetExplorerMajorVersion.cached : function() {
                        for (var e = 3, t = d.createElement("div"), i = t.getElementsByTagName("i");
                            (t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && i[0];);
                        return 4 < e && e
                    }()
                }, f.isInternetExplorer = function() {
                    return f.isInternetExplorer.cached = "undefined" != typeof f.isInternetExplorer.cached ? f.isInternetExplorer.cached : Boolean(f.getInternetExplorerMajorVersion())
                }, f.options.html4Mode ? f.emulated = {
                    pushState: !0,
                    hashChange: !0
                } : f.emulated = {
                    pushState: !Boolean(r.history && r.history.pushState && r.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(n.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(n.userAgent)),
                    hashChange: Boolean(!("onhashchange" in r || "onhashchange" in d) || f.isInternetExplorer() && f.getInternetExplorerMajorVersion() < 8)
                }, f.enabled = !f.emulated.pushState, f.bugs = {
                    setHash: Boolean(!f.emulated.pushState && "Apple Computer, Inc." === n.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)),
                    safariPoll: Boolean(!f.emulated.pushState && "Apple Computer, Inc." === n.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)),
                    ieDoubleCheck: Boolean(f.isInternetExplorer() && f.getInternetExplorerMajorVersion() < 8),
                    hashEscape: Boolean(f.isInternetExplorer() && f.getInternetExplorerMajorVersion() < 7)
                }, f.isEmptyObject = function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                }, f.cloneObject = function(e) {
                    var t, i;
                    return e ? (t = h.stringify(e), i = h.parse(t)) : i = {}, i
                }, f.getRootUrl = function() {
                    var e = d.location.protocol + "//" + (d.location.hostname || d.location.host);
                    return d.location.port && (e += ":" + d.location.port), e += "/"
                }, f.getBaseHref = function() {
                    var e = d.getElementsByTagName("base"),
                        t = "";
                    return 1 === e.length && (t = e[0].href.replace(/[^\/]+$/, "")), (t = t.replace(/\/+$/, "")) && (t += "/"), t
                }, f.getBaseUrl = function() {
                    return f.getBaseHref() || f.getBasePageUrl() || f.getRootUrl()
                }, f.getPageUrl = function() {
                    return ((f.getState(!1, !1) || {}).url || f.getLocationHref()).replace(/\/+$/, "").replace(/[^\/]+$/, function(e) {
                        return /\./.test(e) ? e : e + "/"
                    })
                }, f.getBasePageUrl = function() {
                    return f.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e) {
                        return /[^\/]$/.test(e) ? "" : e
                    }).replace(/\/+$/, "") + "/"
                }, f.getFullUrl = function(e, t) {
                    var i = e,
                        n = e.substring(0, 1);
                    return t = void 0 === t || t, /[a-z]+\:\/\//.test(e) || (i = "/" === n ? f.getRootUrl() + e.replace(/^\/+/, "") : "#" === n ? f.getPageUrl().replace(/#.*/, "") + e : "?" === n ? f.getPageUrl().replace(/[\?#].*/, "") + e : t ? f.getBaseUrl() + e.replace(/^(\.\/)+/, "") : f.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), i.replace(/\#$/, "")
                }, f.getShortUrl = function(e) {
                    var t = e,
                        i = f.getBaseUrl(),
                        n = f.getRootUrl();
                    return f.emulated.pushState && (t = t.replace(i, "")), t = t.replace(n, "/"), f.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
                }, f.getLocationHref = function(e) {
                    return (e = e || d).URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : -1 == e.URL.indexOf("#") && -1 != e.location.href.indexOf("#") ? e.location.href : e.URL || e.location.href
                }, f.store = {}, f.idToState = f.idToState || {}, f.stateToId = f.stateToId || {}, f.urlToId = f.urlToId || {}, f.storedStates = f.storedStates || [], f.savedStates = f.savedStates || [], f.normalizeStore = function() {
                    f.store.idToState = f.store.idToState || {}, f.store.urlToId = f.store.urlToId || {}, f.store.stateToId = f.store.stateToId || {}
                }, f.getState = function(e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0);
                    var i = f.getLastSavedState();
                    return !i && t && (i = f.createStateObject()), e && ((i = f.cloneObject(i)).url = i.cleanUrl || i.url), i
                }, f.getIdByState = function(e) {
                    var t, i = f.extractId(e.url);
                    if (!i)
                        if (t = f.getStateString(e), "undefined" != typeof f.stateToId[t]) i = f.stateToId[t];
                        else if ("undefined" != typeof f.store.stateToId[t]) i = f.store.stateToId[t];
                    else {
                        for (; i = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" != typeof f.idToState[i] || "undefined" != typeof f.store.idToState[i];);
                        f.stateToId[t] = i, f.idToState[i] = e
                    }
                    return i
                }, f.normalizeState = function(e) {
                    var t, i;
                    return e && "object" == typeof e || (e = {}), "undefined" != typeof e.normalized ? e : (e.data && "object" == typeof e.data || (e.data = {}), (t = {
                        normalized: !0
                    }).title = e.title || "", t.url = f.getFullUrl(e.url ? e.url : f.getLocationHref()), t.hash = f.getShortUrl(t.url), t.data = f.cloneObject(e.data), t.id = f.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, i = !f.isEmptyObject(t.data), (t.title || i) && !0 !== f.options.disableSuid && (t.hash = f.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = f.getFullUrl(t.hash), (f.emulated.pushState || f.bugs.safariPoll) && f.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t)
                }, f.createStateObject = function(e, t, i) {
                    var n = {
                        data: e,
                        title: t,
                        url: i
                    };
                    return n = f.normalizeState(n)
                }, f.getStateById = function(e) {
                    return e = String(e), f.idToState[e] || f.store.idToState[e] || i
                }, f.getStateString = function(e) {
                    var t;
                    return t = {
                        data: f.normalizeState(e).data,
                        title: e.title,
                        url: e.url
                    }, h.stringify(t)
                }, f.getStateId = function(e) {
                    return f.normalizeState(e).id
                }, f.getHashByState = function(e) {
                    return f.normalizeState(e).hash
                }, f.extractId = function(e) {
                    var t, i;
                    return i = -1 != e.indexOf("#") ? e.split("#")[0] : e, (t = /(.*)\&_suid=([0-9]+)$/.exec(i)) && t[1] || e, (t ? String(t[2] || "") : "") || !1
                }, f.isTraditionalAnchor = function(e) {
                    return !/[\/\?\.]/.test(e)
                }, f.extractState = function(e, t) {
                    var i, n, o = null;
                    return t = t || !1, (i = f.extractId(e)) && (o = f.getStateById(i)), o || (n = f.getFullUrl(e), (i = f.getIdByUrl(n) || !1) && (o = f.getStateById(i)), !o && t && !f.isTraditionalAnchor(e) && (o = f.createStateObject(null, null, n))), o
                }, f.getIdByUrl = function(e) {
                    return f.urlToId[e] || f.store.urlToId[e] || i
                }, f.getLastSavedState = function() {
                    return f.savedStates[f.savedStates.length - 1] || i
                }, f.getLastStoredState = function() {
                    return f.storedStates[f.storedStates.length - 1] || i
                }, f.hasUrlDuplicate = function(e) {
                    var t;
                    return (t = f.extractState(e.url)) && t.id !== e.id
                }, f.storeState = function(e) {
                    return f.urlToId[e.url] = e.id, f.storedStates.push(f.cloneObject(e)), e
                }, f.isLastSavedState = function(e) {
                    var t = !1;
                    return f.savedStates.length && (t = e.id === f.getLastSavedState().id), t
                }, f.saveState = function(e) {
                    return !f.isLastSavedState(e) && (f.savedStates.push(f.cloneObject(e)), !0)
                }, f.getStateByIndex = function(e) {
                    return void 0 === e ? f.savedStates[f.savedStates.length - 1] : e < 0 ? f.savedStates[f.savedStates.length + e] : f.savedStates[e]
                }, f.getCurrentIndex = function() {
                    return f.savedStates.length < 1 ? 0 : f.savedStates.length - 1
                }, f.getHash = function(e) {
                    var t = f.getLocationHref(e);
                    return f.getHashByUrl(t)
                }, f.unescapeHash = function(e) {
                    var t = f.normalizeHash(e);
                    return t = decodeURIComponent(t)
                }, f.normalizeHash = function(e) {
                    return e.replace(/[^#]*#/, "").replace(/#.*/, "")
                }, f.setHash = function(e, t) {
                    var i, n;
                    return !1 !== t && f.busy() ? (f.pushQueue({
                        scope: f,
                        callback: f.setHash,
                        args: arguments,
                        queue: t
                    }), !1) : (f.busy(!0), (i = f.extractState(e, !0)) && !f.emulated.pushState ? f.pushState(i.data, i.title, i.url, !1) : f.getHash() !== e && (f.bugs.setHash ? (n = f.getPageUrl(), f.pushState(null, null, n + "#" + e, !1)) : d.location.hash = e), f)
                }, f.escapeHash = function(e) {
                    var t = f.normalizeHash(e);
                    return t = r.encodeURIComponent(t), f.bugs.hashEscape || (t = t.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), t
                }, f.getHashByUrl = function(e) {
                    var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                    return t = f.unescapeHash(t)
                }, f.setTitle = function(e) {
                    var t, i = e.title;
                    i || (t = f.getStateByIndex(0)) && t.url === e.url && (i = t.title || f.options.initialTitle);
                    try {
                        d.getElementsByTagName("title")[0].innerHTML = i.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                    } catch (n) {}
                    return d.title = i, f
                }, f.queues = [], f.busy = function(e) {
                    if (void 0 !== e ? f.busy.flag = e : "undefined" == typeof f.busy.flag && (f.busy.flag = !1), !f.busy.flag) {
                        s(f.busy.timeout);
                        var n = function() {
                            var e, t, i;
                            if (!f.busy.flag)
                                for (e = f.queues.length - 1; 0 <= e; --e) 0 !== (t = f.queues[e]).length && (i = t.shift(), f.fireQueueItem(i), f.busy.timeout = a(n, f.options.busyDelay))
                        };
                        f.busy.timeout = a(n, f.options.busyDelay)
                    }
                    return f.busy.flag
                }, f.busy.flag = !1, f.fireQueueItem = function(e) {
                    return e.callback.apply(e.scope || f, e.args || [])
                }, f.pushQueue = function(e) {
                    return f.queues[e.queue || 0] = f.queues[e.queue || 0] || [], f.queues[e.queue || 0].push(e), f
                }, f.queue = function(e, t) {
                    return "function" == typeof e && (e = {
                        callback: e
                    }), void 0 !== t && (e.queue = t), f.busy() ? f.pushQueue(e) : f.fireQueueItem(e), f
                }, f.clearQueue = function() {
                    return f.busy.flag = !1, f.queues = [], f
                }, f.stateChanged = !1, f.doubleChecker = !1, f.doubleCheckComplete = function() {
                    return f.stateChanged = !0, f.doubleCheckClear(), f
                }, f.doubleCheckClear = function() {
                    return f.doubleChecker && (s(f.doubleChecker), f.doubleChecker = !1), f
                }, f.doubleCheck = function(e) {
                    return f.stateChanged = !1, f.doubleCheckClear(), f.bugs.ieDoubleCheck && (f.doubleChecker = a(function() {
                        return f.doubleCheckClear(), f.stateChanged || e(), !0
                    }, f.options.doubleCheckInterval)), f
                }, f.safariStatePoll = function() {
                    var e = f.extractState(f.getLocationHref());
                    if (!f.isLastSavedState(e)) return e || f.createStateObject(), f.Adapter.trigger(r, "popstate"), f
                }, f.back = function(e) {
                    return !1 !== e && f.busy() ? (f.pushQueue({
                        scope: f,
                        callback: f.back,
                        args: arguments,
                        queue: e
                    }), !1) : (f.busy(!0), f.doubleCheck(function() {
                        f.back(!1)
                    }), p.go(-1), !0)
                }, f.forward = function(e) {
                    return !1 !== e && f.busy() ? (f.pushQueue({
                        scope: f,
                        callback: f.forward,
                        args: arguments,
                        queue: e
                    }), !1) : (f.busy(!0), f.doubleCheck(function() {
                        f.forward(!1)
                    }), p.go(1), !0)
                }, f.go = function(e, t) {
                    var i;
                    if (0 < e)
                        for (i = 1; i <= e; ++i) f.forward(t);
                    else {
                        if (!(e < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                        for (i = -1; e <= i; --i) f.back(t)
                    }
                    return f
                }, f.emulated.pushState) {
                var e = function() {};
                f.pushState = f.pushState || e, f.replaceState = f.replaceState || e
            } else f.onPopState = function(e, t) {
                var i, n, o = !1,
                    a = !1;
                return f.doubleCheckComplete(), (i = f.getHash()) ? ((n = f.extractState(i || f.getLocationHref(), !0)) ? f.replaceState(n.data, n.title, n.url, !1) : (f.Adapter.trigger(r, "anchorchange"), f.busy(!1)), f.expectedStateId = !1) : ((a = (o = f.Adapter.extractEventData("state", e, t) || !1) ? f.getStateById(o) : f.expectedStateId ? f.getStateById(f.expectedStateId) : f.extractState(f.getLocationHref())) || (a = f.createStateObject(null, null, f.getLocationHref())), f.expectedStateId = !1, f.isLastSavedState(a) ? (f.busy(!1), !1) : (f.storeState(a), f.saveState(a), f.setTitle(a), f.Adapter.trigger(r, "statechange"), f.busy(!1), !0))
            }, f.Adapter.bind(r, "popstate", f.onPopState), f.pushState = function(e, t, i, n) {
                if (f.getHashByUrl(i) && f.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (!1 !== n && f.busy()) return f.pushQueue({
                    scope: f,
                    callback: f.pushState,
                    args: arguments,
                    queue: n
                }), !1;
                f.busy(!0);
                var o = f.createStateObject(e, t, i);
                return f.isLastSavedState(o) ? f.busy(!1) : (f.storeState(o), f.expectedStateId = o.id, p.pushState(o.id, o.title, o.url), f.Adapter.trigger(r, "popstate")), !0
            }, f.replaceState = function(e, t, i, n) {
                if (f.getHashByUrl(i) && f.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (!1 !== n && f.busy()) return f.pushQueue({
                    scope: f,
                    callback: f.replaceState,
                    args: arguments,
                    queue: n
                }), !1;
                f.busy(!0);
                var o = f.createStateObject(e, t, i);
                return f.isLastSavedState(o) ? f.busy(!1) : (f.storeState(o), f.expectedStateId = o.id, p.replaceState(o.id, o.title, o.url), f.Adapter.trigger(r, "popstate")), !0
            };
            if (o) {
                try {
                    f.store = h.parse(o.getItem("History.store")) || {}
                } catch (t) {
                    f.store = {}
                }
                f.normalizeStore()
            } else f.store = {}, f.normalizeStore();
            f.Adapter.bind(r, "unload", f.clearAllIntervals), f.saveState(f.storeState(f.extractState(f.getLocationHref(), !0))), o && (f.onUnload = function() {
                var e, t, i;
                try {
                    e = h.parse(o.getItem("History.store")) || {}
                } catch (d) {
                    e = {}
                }
                for (t in e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {}, f.idToState) f.idToState.hasOwnProperty(t) && (e.idToState[t] = f.idToState[t]);
                for (t in f.urlToId) f.urlToId.hasOwnProperty(t) && (e.urlToId[t] = f.urlToId[t]);
                for (t in f.stateToId) f.stateToId.hasOwnProperty(t) && (e.stateToId[t] = f.stateToId[t]);
                f.store = e, f.normalizeStore(), i = h.stringify(e);
                try {
                    o.setItem("History.store", i)
                } catch (n) {
                    if (n.code !== DOMException.QUOTA_EXCEEDED_ERR) throw n;
                    o.length && (o.removeItem("History.store"), o.setItem("History.store", i))
                }
            }, f.intervalList.push(c(f.onUnload, f.options.storeInterval)), f.Adapter.bind(r, "beforeunload", f.onUnload), f.Adapter.bind(r, "unload", f.onUnload)), f.emulated.pushState || (f.bugs.safariPoll && f.intervalList.push(c(f.safariStatePoll, f.options.safariPollInterval)), "Apple Computer, Inc." !== n.vendor && "Mozilla" !== (n.appCodeName || "") || (f.Adapter.bind(r, "hashchange", function() {
                f.Adapter.trigger(r, "popstate")
            }), f.getHash() && f.Adapter.onDomLoad(function() {
                f.Adapter.trigger(r, "hashchange")
            })))
        }, (!f.options || !f.options.delayInit) && f.init()
    }(window);
var Dribbble = Dribbble || {};
Dribbble.JsConfig = Dribbble.JsConfig || {}, Dribbble.isMobile = function() {
    var e = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        t = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
    return e && t
}, Dribbble.isMobileSafari = function() {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod touch)/)
}, Dribbble.isAndroidChrome = function() {
    var e = navigator.userAgent,
        t = /Android/i.test(e),
        i = /Chrome/i.test(e);
    return t && i
}, Dribbble.isIosSafari = function(e) {
    var t, i = navigator.userAgent,
        n = "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints;
    switch (e) {
        case "iPhone":
            t = /(iPhone)/i.test(i);
            break;
        case "iPad":
            t = /(iPad)/i.test(i) || n;
            break;
        default:
            t = /(iPhone|iPad)/i.test(i) || n
    }
    var o = /WebKit/i.test(i),
        a = /CriOS/i.test(i),
        r = /FxiOS/i.test(i);
    return t && o && !a && !r
}, Dribbble.isMobileViewport = function() {
    return window.matchMedia("screen and (max-width: 959px)").matches
}, $(document).ajaxSend(function(e, t, i) {
    var n = $('meta[name="csrf-token"]').attr("content");
    i.noCSRF != undefined && 0 != i.noCSRF || t.setRequestHeader("X-CSRF-Token", n)
});
var notificationSelectors = [".subscribe-to-notification-target", ".subscribe-to-notification"],
    notificationLinkSelectors = $(notificationSelectors).map(function(e, t) {
        return t + " a[data-method]"
    }).get();
$(document).on("ajax:success", notificationLinkSelectors.join(", "), function(e, t) {
        var i = $(e.target);
        $(i.parents(".subscribe-to-notification-target")[0] || i.closest(notificationSelectors.join(", "))).addClass("subscribe-to-notification").html(t)
    }), jQuery.fn.showAndHide = function(e) {
        return $(e).hide(), this.show()
    }, jQuery.fn.modelId = function() {
        var e = $(this).attr("id");
        if (null == e) return null;
        var t = e.split(/[-_]/g);
        return 1 < t.length ? t[t.length - 1] : null
    }, ShowAndHideControl = function(e) {
        var t = $(e.target),
            i = $(e.showControl),
            n = $(e.hideControl);
        i.on("click", function() {
            return t.showAndHide(i), !1
        }), n.on("click", function() {
            return t.hide(), i.show(), !1
        })
    }, $("a[data-hover]").on("hover", function() {
        var e = $(this);
        e.attr("data-hover-out", e.text()).text(e.attr("data-hover"))
    }, function() {
        var e = $(this);
        e.text(e.attr("data-hover-out")), e.removeAttr("data-hover-out")
    }), $(document).on("click", "a.block", function(e) {
        var t = this;
        $.post(t.href, function(e) {
            memberContainer(t).addClass("blocked-by-current-user").removeClass("followed-by-current-user listed-by-current-user"), e && e.data && Dribbble.EventBus.$emit("track:userBlocked", e.data)
        }), e.preventDefault()
    }), $(document).on("click", "a.unblock", function(e) {
        var t = this;
        $.ajax(t.href, {
            type: "DELETE",
            success: function() {
                memberContainer(t).removeClass("blocked-by-current-user")
            }
        }), e.preventDefault()
    }), $([".remove-from-team a", ".leave-team a", ".js-remove-from-team-link"]).each(function(e, t) {
        $(document).on("click", ".actions-list " + t, function(e) {
            var t = this;
            $.ajax(t.href, {
                type: "DELETE",
                success: function(e) {
                    e.error ? Dribbble.Notify.error(e.error) : Dribbble.Notify.alert(e.success)
                }
            }), e.preventDefault()
        })
    }), window.matchMedia("screen and (min-width: " + DEVICE_WIDTH_BREAKPOINT + ")").matches || $("#main .tabs > li.has-dd > a, div.full-tabs ul.full-tabs-links > li.more > a").on("click", function() {
        var e = $(this).parent();
        return e.hasClass("hover") ? e.removeClass("hover") : ($("#main .tabs > li.hover, div.full-tabs ul.full-tabs-links > li.hover").removeClass("hover"), e.addClass("hover")), !1
    }), $(document).on("click", "a.action.draft", function() {
        var e = $(this).parent("form");
        return confirm($(this).data("message") + " " + e.data().userName + "?") && $(this).parent("form").trigger("submit"), !1
    }), $(document).on("ajax:success", ".draft-form", function(e, t, i, n) {
        $(this).replaceWith(n.responseText)
    }).on("ajax:error", ".draft-form", function(e, t) {
        var i = "Hrm\u2026 Something went wrong. If this persists, try refreshing the page.";
        406 == t.status && (i = "This designer has already been invited. Find another designer to draft!", $(this).replaceWith(t.responseText)), Dribbble.Notify.alert(i)
    }), Dribbble.ActionMenu = {
        bindEventListeners: function() {
            $("body").on({
                mouseenter: this.show.bind(this),
                mouseleave: this.hide.bind(this)
            }, ".actions-menu"), $(".action.settings, .action.grid").on("touchstart", this.toggle.bind(this)), $(".actions-list li a").on("click", function(e) {
                this.hide(e)
            }.bind(this))
        },
        show: function(e) {
            Dribbble.HoverCards && Dribbble.HoverCards.dismiss(), $(e.target).closest(".actions-menu").addClass("active").find(".actions-list").show()
        },
        hide: function(e) {
            $(e.target).closest(".actions-menu").removeClass("active").find(".actions-list").hide()
        },
        toggle: function(e) {
            $(e.target).closest(".actions-menu").hasClass("active") ? this.hide(e) : this.show(e)
        }
    }, Dribbble.ActionMenu.bindEventListeners(), Dribbble.defaultTipsyOptions = {
        fade: !1,
        opacity: 1,
        className: function() {
            return this.getAttribute("data-tipsy-class")
        },
        gravity: function() {
            var e = $(this);
            if (e.data("tipsy-gravity")) return e.data("tipsy-gravity");
            var t = 100,
                i = e.offset(),
                n = i.left,
                o = i.top;
            return n < t ? "sw" : n > $(window).width() - t ? o < t ? "ne" : "se" : o < t ? "n" : "s"
        },
        html: !0
    }, Dribbble.tipsyInit = function() {
        Dribbble.isMobile() ? $("[rel*=tipsy]:not(.tipsy-mobile-disabled)").tipsy(Dribbble.defaultTipsyOptions) : $("[rel*=tipsy]").tipsy(Dribbble.defaultTipsyOptions)
    }, Dribbble.tipsyInit(), $(document).ajaxSuccess(function() {
        $(".tipsy").hide(), Dribbble.tipsyInit()
    }), Dribbble.FollowButton = function(e, r) {
        return r = r || function() {
            return null
        }, {
            initialize: function() {
                this.bindEventListeners()
            },
            bindEventListeners: function() {
                User.loggedIn() && (e.on("click.follow-buttton", ".follow-prompt a.follow", this.follow.bind(this)), e.on("click.follow-buttton", ".follow-prompt a.unfollow", this.unfollow.bind(this)))
            },
            container: function(e) {
                return e.data("container") ? $(e.data("container")) : memberContainer(e)
            },
            follow: function(e) {
                var t = $(e.currentTarget),
                    i = this.container(t);
                return i.hasClass("blocking-current-user") ? Dribbble.Notify.alert("You have been blocked from following this account at the request of the member.") : $.ajax(t.attr("href"), {
                    type: "POST",
                    beforeSend: function() {
                        t.addClass("processing")
                    }
                }).done(function(e) {
                    i.addClass("followed-by-current-user"), this.modifyFollowerCount(1, i), this.logAnalyticsFollow(t, {
                        action: "follow"
                    }), t.data("notify") && Dribbble.Notify.success(t.data("notify")), Dribbble.EventBus && Dribbble.EventBus.$emit("userFollow", {
                        isFollowing: !0,
                        username: t.attr("href").split("/")[1]
                    }), e && e.data && Dribbble.EventBus.$emit("track:userFollowed", e.data)
                }.bind(this)).fail(function(e) {
                    Dribbble.Notify.alert(e.responseText)
                }).always(function() {
                    t.removeClass("processing")
                }), !1
            },
            unfollow: function(e) {
                var t = $(e.currentTarget),
                    i = this.container(t);
                return $.ajax(t.attr("href"), {
                    type: "DELETE",
                    beforeSend: function() {
                        t.addClass("processing")
                    }
                }).done(function() {
                    i.removeClass("followed-by-current-user"), this.modifyFollowerCount(-1, i), this.logAnalyticsFollow(t, {
                        action: "unfollow"
                    }), t.data("notify") && Dribbble.Notify.success(t.data("notify")), Dribbble.EventBus && Dribbble.EventBus.$emit("userFollow", {
                        isFollowing: !1,
                        username: t.attr("href").split("/")[1]
                    })
                }.bind(this)).always(function() {
                    t.removeClass("processing")
                }), !1
            },
            modifyFollowerCount: function(e, t) {
                var i = r(t);
                if (i) {
                    var n = i.find(".meta"),
                        o = i.find(".count"),
                        a = parseInt(o.first().text().replace(",", ""), 10) + e;
                    o.text(numberWithDelimiter(a)), 1 == a ? n.text("Follower") : n.text("Followers")
                }
            },
            getAnalyticsInfo: function(e) {
                return $container = e.closest(".follow-prompt"), [$container.data("ga-name"), $container.data("ga-key")]
            },
            logAnalyticsFollow: function(e, t) {
                var i = this.getAnalyticsInfo(e);
                i[0] !== undefined && Dribbble.Analytics.log(i[1], i[0], "event", {
                    event_category: "Followers",
                    event_action: t.action || "follow"
                })
            }
        }
    }, new Dribbble.FollowButton($("#wrap")).initialize(), new Dribbble.FollowButton($(".player-cards .player-info"), function(e) {
        return e.find(".stat-followers")
    }).initialize(), new Dribbble.FollowButton($(".shot-overlay")).initialize(), new Dribbble.FollowButton($(".profile-essentials"), function() {
        return $(".full-tabs .full-tabs-links .followers")
    }).initialize(), Dribbble.Overlay = {
        overlays: [],
        anyOpen: function() {
            for (var e = 0; e < this.overlays.length; e++)
                if (this.overlays[e].isOpen) return !0;
            return !1
        },
        find: function(e) {
            for (var t = null, i = 0; i < this.overlays.length; i++) this.overlays[i].$el && this.overlays[i].$el.attr("id") && this.overlays[i].$el.attr("id") === e && (t = this.overlays[i]);
            return t
        },
        applyOptions: function(e, t) {
            var i = function(e) {
                return [].concat(e || [])
            };
            return e.$el = t.$el, t.trigger && (e.trigger = t.trigger, e.bindTrigger()), e.beforeShow = i(t.beforeShow), e.onShow = i(t.onShow), e.beforeHide = i(t.beforeHide), e.onHide = i(t.onHide), t.remoteContent && (e.remoteContent = t.remoteContent, e.beforeShow.push(t.loadRemoteContent || e.defaultLoadRemoteContent.bind(e)), e.onHide.push(t.hideRemoteContent || e.defaultHideRemoteContent.bind(e))), e.suppressClickToClose = t.suppressClickToClose, e.suppressEscToClose = t.suppressEscToClose, e
        }
    }, Dribbble.Overlay.Simple = function(e) {
        Dribbble.Overlay.applyOptions(this, e), Dribbble.Overlay.overlays.push(this)
    }, Dribbble.Overlay.Simple.prototype = {
        isOpen: !1,
        currentTarget: null,
        _runCallbacks: function(e) {
            var i = !0;
            return $.each(e, function(e, t) {
                i && 0 == t() && (i = !1)
            }.bind(this)), i
        },
        triggerHandler: function(e) {
            e.preventDefault(), this.currentTarget = e.currentTarget, this.currentTarget.classList.contains("disabled") || this.show()
        },
        bindTrigger: function() {
            $(this.trigger).on("click", function(e) {
                this.triggerHandler(e)
            }.bind(this))
        },
        find: function(e) {
            return this.$el.find(e)
        },
        defaultOnComplete: function(e) {
            e.redirect ? window.location = e.redirect : $(this.remoteContent.el).html(e), $(document).trigger("overlay:ajaxComplete", this.remoteContent.el)
        },
        defaultLoadRemoteContent: function() {
            var e = this.remoteContent.url || $(this.currentTarget || this.trigger).attr("href");
            $.isFunction(e) && (e = e.apply(this));
            var t = {
                context: this,
                type: this.remoteContent.verb || "GET",
                url: e,
                success: this.defaultOnComplete.bind(this),
                complete: function(e, t) {
                    (this.remoteContent.onComplete || function() {}).call(this, e.responseText, t, e)
                }
            };
            this.remoteContent.data && ($.isFunction(this.remoteContent.data) ? t.data = this.remoteContent.data.apply(this) : t.data = this.remoteContent.data), $.ajax(t)
        },
        defaultHideRemoteContent: function() {
            $(this.remoteContent.el).html('<div class="processing">Loading\u2026</div>')
        },
        listenForEvents: function() {
            this.$el.on("click.overlay", ".close", this.hide.bind(this)), this.$el.on("click.overlay", ".cancel", this.hide.bind(this)), this.suppressClickToClose || this.$el.on("click.overlay", function(e) {
                $(e.target).is(this.$el) && this.hide()
            }.bind(this)), this.suppressEscToClose || (this.keyListeners = Dribbble.Hotkeys.map("overlay", {
                ESCAPE: this.hide.bind(this)
            }))
        },
        stopListeningForEvents: function() {
            this.$el.off("click.overlay"), this.keyListeners && this.keyListeners.off()
        },
        show: function(e) {
            return this._runCallbacks(this.beforeShow) && (this.listenForEvents(), this.$el.css("height", "100%"), this.$el.addClass("overlay-visible").one(this.whichTransitionEvent(), function() {
                this.$el.trigger("focus"), this._runCallbacks(this.onShow)
            }.bind(this)), this.isOpen = !0, e && (this.modalClass = e, this.$el.addClass(e))), !1
        },
        hide: function() {
            return this._runCallbacks(this.beforeHide) && (this.stopListeningForEvents(), this.$el.removeClass("overlay-visible").one(this.whichTransitionEvent(), function() {
                this._runCallbacks(this.onHide)
            }.bind(this)), this.isOpen = !1, this.modalClass && (this.$el.removeClass(this.modalClass), this.modalClass = null)), !1
        },
        whichTransitionEvent: function() {
            if (this.transitionEvent) return this.transitionEvent;
            var e, t = document.createElement("fakeelement"),
                i = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (e in i)
                if (t.style[e] !== undefined) return this.transitionEvent = i[e], i[e]
        }
    }, Dribbble.Overlay.RemoteForm = function(e) {
        Dribbble.Overlay.applyOptions(this, e), this.form = e.form, this.verb = e.verb || "POST", this.onSubmit = e.onSubmit || this.defaultOnSubmit.bind(this), this.onSuccess = e.onSuccess || this.defaultOnSuccess.bind(this), this.onError = e.onError || this.defaultOnError.bind(this), this.containerToUpdateOnSuccess = e.containerToUpdateOnSuccess, this.containerToUpdateOnFailure = e.containerToUpdateOnFailure, this.successNotification = e.successNotification, Dribbble.Overlay.overlays.push(this)
    }, Dribbble.Overlay.RemoteForm.prototype = $.extend({}, Dribbble.Overlay.Simple.prototype, {
        defaultOnError: function(e) {
            422 == e.status ? $(this.containerToUpdateOnFailure).html(e.responseText) : Dribbble.Notify.alert(e.responseText)
        },
        listenForEvents: function() {
            Dribbble.Overlay.Simple.prototype.listenForEvents.apply(this), this.$el.on("submit.remoteOverlay", this.form || "form", this.onSubmit)
        },
        stopListeningForEvents: function() {
            Dribbble.Overlay.Simple.prototype.stopListeningForEvents.apply(this), this.$el.off("submit.remoteOverlay")
        },
        defaultOnSuccess: function(e) {
            0 == this.$el.find(this.containerToUpdateOnSuccess).length && this.hide(), $(this.containerToUpdateOnSuccess).html(e), this.successNotification && Dribbble.Notify.success(this.successNotification)
        },
        defaultOnSubmit: function(e) {
            var t;
            e && e.preventDefault(), t = e && "FORM" == e.currentTarget.tagName ? $(e.currentTarget) : this.find(this.form || "form"), $.ajax({
                context: this,
                type: this.verb,
                url: t.attr("action"),
                data: t.serialize(),
                success: this.onSuccess,
                error: this.onError
            })
        }
    }), Dribbble.Overlay.Adapters = {
        bind: function(e, t) {
            var i = e.data(),
                n = {
                    $el: $(i.overlay || "#overlay"),
                    trigger: e,
                    form: i.form,
                    containerToUpdateOnFailure: i.failureContainer || i.remoteContent && i.remoteContent.container,
                    containerToUpdateOnSuccess: i.successContainer,
                    successNotification: i.notification,
                    suppressClickToClose: i.suppressClickToClose,
                    suppressEscToClose: i.suppressEscToClose
                };
            i.remoteContent && (n.remoteContent = {
                el: i.remoteContent.container,
                url: i.remoteContent.url
            }), e.data().overlayObj = new t(n), i.trackingData && (e.data().overlayObj.trackingData = i.trackingData)
        },
        SimpleTrigger: function(e) {
            Dribbble.Overlay.Adapters.bind(e, Dribbble.Overlay.Simple)
        },
        RemoteFormTrigger: function(e) {
            Dribbble.Overlay.Adapters.bind(e, Dribbble.Overlay.RemoteForm)
        },
        bindAll: function() {
            $(".overlay-trigger").each(function() {
                $(this).data().overlayObj || new Dribbble.Overlay.Adapters.SimpleTrigger($(this))
            }), $(".overlay-form-trigger").each(function() {
                $(this).data().overlayObj || new Dribbble.Overlay.Adapters.RemoteFormTrigger($(this))
            })
        }
    }, Dribbble.Overlay.Adapters.bindAll(), $(document).ajaxComplete(function() {
        setTimeout(function() {
            Dribbble.Overlay.Adapters.bindAll()
        })
    }), $(".psst .close").on("click", function() {
        var e = $(this).next(),
            t = e.next();
        $.post(e.data("url")), 0 == t.length ? $(".psst").slideUp() : e.fadeOut(function() {
            e.remove(), t.fadeIn()
        })
    }), Dribbble.Shots = {
        data: {},
        loggingEnabled: !0,
        gaLoggingEnabled: !0,
        get: function(e) {
            return this.data[e]
        },
        add: function(e) {
            $(e).each(function(e, t) {
                this.data[t.id] ? this.update(t.id, t) : this.data[t.id] = t
            }.bind(this))
        },
        update: function(e, t) {
            var i = this.data[e];
            if (i) {
                for (var n in t) i[n] = t[n];
                i.likeCount && i.likeCount.render()
            }
        },
        clear: function() {
            this.data = {}
        },
        idFromShotDiv: function(e) {
            return e[0].id.split("-")[1]
        },
        logView: function(e) {
            this.loggingEnabled && (Dribbble.ShotViewRecorder.queueView(e), this.logAnalyticsView(e))
        },
        logViewForShotInDiv: function(e) {
            this.logView(this.idFromShotDiv(e))
        },
        analyticsKeys: function(e) {
            return this.gaLoggingEnabled && this.data[e] ? this.data[e].ga : []
        },
        logAnalyticsView: function(e) {
            for (var t = this.analyticsKeys(e), i = 0; i < t.length; i++) {
                var n = t[i],
                    o = this.data[e];
                Dribbble.Analytics.logPageView(n[1], n[0], o.path, o.title)
            }
        },
        logAnalyticsLike: function(e, t) {
            for (var i = this.analyticsKeys(e), n = 0; n < i.length; n++) {
                var o = i[n];
                Dribbble.Analytics.log(o[1], o[0], "event", {
                    event_category: "Shots",
                    event_action: t.action || "like",
                    event_label: "Shot: " + e
                })
            }
        }
    }, Dribbble.TeaserStats = {
        init: function(e) {
            var t = $("#main ol.dribbbles>li");
            $(e).each(function(e, t) {
                var i = $("ol.dribbbles li#screenshot-" + t.id);
                0 < t.rebounds_count ? i.find(".has-rebounds").html(numberWithDelimiter(t.rebounds_count)).closest("a").show() : t.is_rebound && i.find(".is-rebound").closest("a").show(), 0 < t.attachments_count && i.find(".attachments-mark").show(), i.find(".js-shot-views-container .js-shot-views-count").html(numberWithDelimiter(t.view_count)), i.find(".js-shot-comments-container").each(function() {
                    $(this).find(".js-shot-comments-count").html(numberWithDelimiter(t.comments_count)).tipsy(Dribbble.defaultTipsyOptions)
                }), i.find(".timestamp").html(t.published_at), t.likeCount = new Dribbble.TeaserStats.LikeCount(t, i), t.likeCount.render()
            }), t.find(".js-shot-details-container").css({
                visibility: "visible"
            })
        }
    }, Dribbble.TeaserStats.LikeCount = function(e, t) {
        var i;
        return {
            initialized: !1,
            init: function() {
                this.initialized || (i = t.find(".js-shot-likes-container"), User.loggedIn() || t.find("a.like-shot").attr({
                    "data-signup-trigger": "",
                    "data-context": "like-shot"
                }), this.initialized = !0)
            },
            render: function() {
                this.init(), i.find(".js-shot-likes-count").html(numberWithDelimiter(e.likes_count)), i.toggleClass("marked", e.liked)
            }
        }
    }, "undefined" != typeof newShots && (Dribbble.Shots.add(newShots), Dribbble.TeaserStats.init(newShots)), Dribbble.String = {
        capitalize: function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        },
        kebabCaseToTitleCase: function(e) {
            return e.split("-").join(" ").replace(/\w\S*/g, function(e) {
                return this.capitalize(e)
            }.bind(this))
        }
    }, Dribbble.AdNetworks = Dribbble.AdNetworks || {}, Dribbble.AdNetworks.Boost = {
        load: function(e) {
            var t = {
                impression_id: e.requestId,
                placement: Dribbble.String.kebabCaseToTitleCase(e.placement),
                provider: "Dribbble",
                unit_type: "Boosted Shots"
            };
            Dribbble.Itly.adRequested(t);
            var i = document.querySelector(".js-shot-page-ad-boosted");
            if (i) {
                var n = i.dataset.boostUrl || "/screenshot_boost?request_source=Similar Work";
                $.ajax({
                    type: "GET",
                    url: n,
                    success: function(e) {
                        $(".boosted-shot-container").html(e), Dribbble.AdNetworks.Ad.init({
                            itlyTrackingEventProperties: t,
                            adElement: i
                        }), Dribbble.EventBus.$emit("boostedShotsAd:initialize")
                    },
                    error: function() {
                        Dribbble.Itly.adRequestFailed(Object.assign(t, {
                            reason: "No boosted shots available."
                        })), i.style.display = "none";
                        var e = document.querySelector('.js-thumbnail[data-is-boost-fallback="true"]');
                        e && e.classList.remove("hidden-shot")
                    }.bind(this)
                })
            }
        },
        logBoostedAdEvent: function(e, t) {
            if (t && t.ad_link) {
                var i = t.ad_id;
                $.ajax({
                    type: "POST",
                    url: "/client_app/screenshot_boost_ad_events",
                    data: {
                        event_name: e,
                        screenshot_boost_id: i,
                        request_source: "Similar Work"
                    }
                })
            }
        }
    }, Dribbble.AdNetworks.Ad = {
        init: function(e) {
            if (this.adElement = e.adElement, this.hasBeenScrolledIntoView = !1, this.itlyTrackingEventProperties = e.itlyTrackingEventProperties, this.adElement) {
                var t = this.adElement.querySelector("[data-ad-data]");
                if (t) {
                    var i;
                    switch (this.adData = JSON.parse(t.dataset.adData), this.adData.ad_link_type) {
                        case "shot-page":
                            i = "Shot";
                            break;
                        case "profile":
                            i = "Profile";
                            break;
                        case "custom":
                        default:
                            i = "Custom URL"
                    }
                    this.itlyAdData = {
                        ad_id: this.adData.ad_id.toString(),
                        ad_link: this.adData.ad_link,
                        ad_link_type: i,
                        ad_text: this.adData.ad_text || "",
                        has_cta: !1
                    }
                }
                Dribbble.Itly.adServed(Object.assign(this.itlyTrackingEventProperties, this.itlyAdData)), Dribbble.AdNetworks.Boost.logBoostedAdEvent("ad_served", this.adData), this.bindEvents()
            } else Dribbble.Itly.adRequestFailed(Object.assign(this.itlyTrackingEventProperties, {
                reason: "Ad element was not found."
            }))
        },
        bindEvents: function() {
            this.adElement.querySelectorAll(".js-boosted-shot-link").forEach(function(e) {
                e.onclick = this.onClickAd.bind(this)
            }, this);
            var e = document.querySelector(".shot-overlay.overlay-visible .overlay-content");
            e ? e.onscroll = function() {
                this.onScroll(e)
            }.bind(this) : window.onscroll = function() {
                this.onScroll()
            }.bind(this)
        },
        onClickAd: function() {
            Dribbble.Itly.adClicked(Object.assign(this.itlyTrackingEventProperties, this.itlyAdData))
        },
        onScroll: function() {
            this.adElement && (this.adElement.getBoundingClientRect().bottom <= window.innerHeight && !this.hasBeenScrolledIntoView && (this.hasBeenScrolledIntoView = !0, Dribbble.Itly.adImpressionViewed(Object.assign(this.itlyTrackingEventProperties, this.itlyAdData)), Dribbble.AdNetworks.Boost.logBoostedAdEvent("ad_impression_viewed", this.adData)))
        }
    }, Dribbble.Hotkeys = {
        listeners: {},
        KEY_ALIASES: {
            LEFT: 37,
            RIGHT: 39,
            ESCAPE: 27,
            ENTER: 13
        },
        initialize: function() {
            this.bindKeys()
        },
        bindKeys: function() {
            $(document).on("keyup", function(e) {
                if (!this.isFormField(e.target.tagName) && !this.isModifierKey(e)) {
                    var t = this.keyName(e.which);
                    this.keyName && this.trigger(t, e)
                }
            }.bind(this))
        },
        isFormField: function(e) {
            return "INPUT" == e || "TEXTAREA" == e
        },
        isModifierKey: function(e) {
            return e.ctrlKey || e.altKey || e.shiftKey || e.metaKey
        },
        keyName: function(e) {
            var t = Dribbble.Hotkeys.KEY_ALIASES;
            for (var i in t)
                if (t[i] === e) return i;
            return String.fromCharCode(e)
        },
        map: function(e, t, i) {
            return this.listeners[e] && this.listeners[e].off(), this.listeners[e] = t, this.listeners[e].isApplicable = i || function() {
                return !0
            }, this.listeners[e].off = function() {
                delete this.listeners[e]
            }.bind(this), this.listeners[e]
        },
        trigger: function(e, t) {
            for (var i in this.listeners) {
                var n = this.listeners[i];
                n[e] && n.isApplicable() && n[e](t)
            }
        }
    }, Dribbble.Hotkeys.TextAreaSubmission = {
        eventName: "keydown.keyboardSubmit",
        shortcutCopy: (navigator.userAgent.match(/Macintosh/) ? "\u2318" : "ctrl") + "+enter",
        enable: function() {
            $(document).off(this.eventName).on(this.eventName, "textarea", function(e) {
                (e.metaKey || e.ctrlKey) && e.keyCode == Dribbble.Hotkeys.KEY_ALIASES.ENTER && (e.preventDefault(), $(this).closest("form").trigger("submit"))
            }), this.fillShortcuts()
        },
        fillShortcuts: function() {
            $(".keyboard-submit-shortcut").text(this.shortcutCopy)
        }
    }, Dribbble.Hotkeys.initialize(), Dribbble.Hotkeys.TextAreaSubmission.enable(),
    function() {
        var i, e = function(e) {
            var t = $.trim($(".pagination:last").find(e).attr("href"));
            t && (i.off(), document.location = t)
        };
        i = Dribbble.Hotkeys.map("list", {
            LEFT: function() {
                e(".previous_page")
            },
            RIGHT: function() {
                e(".next_page")
            }
        }, function() {
            return !(!(0 < $(".previous_page:visible, .next_page:visible").length) || Dribbble.Overlay && Dribbble.Overlay.anyOpen() || Dribbble.ShotOverlay && Dribbble.ShotOverlay.isOpen)
        })
    }(), Dribbble.Router = {
        initialize: function() {
            Dribbble.isHistorySupported && History.Adapter.bind(window, "statechange", function() {
                var e = document.location.pathname,
                    t = /\/attachments(\/|$)/;
                $(".attachment-overlay").is(":visible") ? e.match(t) ? Dribbble.Attachments.showOverlay(document.location.toString()) : Dribbble.Attachments.hideOverlay() : e.match(t) ? void 0 !== Dribbble && Dribbble.Attachments ? Dribbble.Attachments.showOverlay(document.location.toString()) : window.location.reload(!0) : $("#viewer").length ? window.location.reload(!0) : Dribbble.GoodOverlay || Dribbble.ShotOverlay && Dribbble.ShotOverlay.active ? e.match(/^\/shots\/\d+[^/]+$/) ? Dribbble.ShotOverlay.show(document.location.toString(), Dribbble.Router.referer) : e.match(/^\/goods\/\d+[^/]+$/) ? Dribbble.GoodOverlay.show(document.location.toString(), Dribbble.Router.referer) : Dribbble.GoodOverlay && Dribbble.GoodOverlay.isOpen() ? Dribbble.GoodOverlay.hide() : Dribbble.ShotOverlay.hide() : Dribbble.ShotOverlayModal && Dribbble.ShotOverlayModal.active ? e.match(/^\/shots\/\d+[^/]+$/) ? Dribbble.ShotOverlayModal.show(document.location.toString()) : Dribbble.ShotOverlayModal.hide() : e.match(/\/scout/) ? window.location.reload(!0) : e.match(/^\/admin\/talent/) ? $(document).scrollTop(0) : ($(document).scrollTop(0), window.location.reload(!0)), history.state != undefined && history.state.title != undefined && (document.title = history.state.title)
            })
        },
        go: function(e) {
            history.go(e)
        },
        pushState: function(e, t, i) {
            this.referer = window.location.toString(), History.pushState(e, t, i)
        },
        replaceState: function(e, t, i) {
            history.replaceState(e, t, i), document.title = t
        }
    }, Dribbble.Router.initialize(),
    function(e) {
        var t = !1;
        if ("function" == typeof define && define.amd && (define(e), t = !0), "object" == typeof exports && (module.exports = e(), t = !0), !t) {
            var i = window.Cookies,
                n = window.Cookies = e();
            n.noConflict = function() {
                return window.Cookies = i, n
            }
        }
    }(function() {
        function m() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var i = arguments[e];
                for (var n in i) t[n] = i[n]
            }
            return t
        }

        function e(f) {
            function p(e, t, i) {
                var n;
                if ("undefined" != typeof document) {
                    if (1 < arguments.length) {
                        if ("number" == typeof(i = m({
                                path: "/"
                            }, p.defaults, i)).expires) {
                            var o = new Date;
                            o.setMilliseconds(o.getMilliseconds() + 864e5 * i.expires), i.expires = o
                        }
                        i.expires = i.expires ? i.expires.toUTCString() : "";
                        try {
                            n = JSON.stringify(t), /^[\{\[]/.test(n) && (t = n)
                        } catch (b) {}
                        t = f.write ? f.write(t, e) : encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = (e = (e = encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                        var a = "";
                        for (var r in i) i[r] && (a += "; " + r, !0 !== i[r] && (a += "=" + i[r]));
                        return document.cookie = e + "=" + t + a
                    }
                    e || (n = {});
                    for (var s = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, d = 0; d < s.length; d++) {
                        var c = s[d].split("="),
                            u = c.slice(1).join("=");
                        '"' === u.charAt(0) && (u = u.slice(1, -1));
                        try {
                            var h = c[0].replace(l, decodeURIComponent);
                            if (u = f.read ? f.read(u, h) : f(u, h) || u.replace(l, decodeURIComponent), this.json) try {
                                u = JSON.parse(u)
                            } catch (b) {}
                            if (e === h) {
                                n = u;
                                break
                            }
                            e || (n[h] = u)
                        } catch (b) {}
                    }
                    return n
                }
            }
            return (p.set = p).get = function(e) {
                return p.call(p, e)
            }, p.getJSON = function() {
                return p.apply({
                    json: !0
                }, [].slice.call(arguments))
            }, p.defaults = {}, p.remove = function(e, t) {
                p(e, "", m(t, {
                    expires: -1
                }))
            }, p.withConverter = e, p
        }
        return e(function() {})
    }), Dribbble.ShotViewRecorder = {
        seenShotIds: [],
        recordedIds: [],
        recordingDelay: 3e3,
        recordingMaxQueueDepth: 10,
        recordingTimeoutId: null,
        submitting: !1,
        queueView: function(e) {
            -1 == this.seenShotIds.indexOf(e) && this.seenShotIds.push(e), this.queueRecordViewedShots()
        },
        queueRecordViewedShots: function() {
            clearTimeout(this.recordingTimeoutId);
            var e = this.recordingDelay;
            this.seenShotIds.length - this.recordedIds.length >= this.recordingMaxQueueDepth && (e = 0), this.recordingTimeoutId = setTimeout(function() {
                this.submitting ? this.queueRecordViewedShots() : this.recordViewedShots()
            }.bind(this), e)
        },
        recordViewedShots: function() {
            this.submitting = !0;
            var e = $(this.seenShotIds).not(this.recordedIds).get();
            if (0 < e.length) {
                var t = $.post("/shots/log_views", {
                    ids: e
                });
                t.done(function() {
                    this.recordedIds = this.recordedIds.concat(e)
                }.bind(this)), t.always(function() {
                    this.submitting = !1
                }.bind(this))
            } else this.submitting = !1
        },
        getFeedLocation: function() {
            var e = window.location.pathname,
                t = {
                    list: document.body.id
                };
            switch (t.list) {
                case "home":
                    t.list = "following";
                    break;
                case "colors":
                    t.color = e.slice(1).split("/")[1];
                    break;
                case "places":
                    t.place = e.slice(1).split("/")[1];
                    break;
                case "page":
                    0 < e.indexOf("lists") && (t.list = "list");
                    break;
                case "shots":
                    params = window.location.search.slice(1), params.length && params.split("&").forEach(function(e) {
                        e = e.split("="), -1 < ["list", "sort", "timeframe"].indexOf(e[0]) && (t[e[0]] = e[1])
                    }), t.sort || (t.sort = "popular");
                    break;
                case "profile-secondary":
                    0 < e.indexOf("buckets") ? t.list = "bucket" : 0 < e.indexOf("goods") ? t.list = "goods" : 0 < e.indexOf("likes") && (t.list = "likes")
            }
            return t
        }
    }, Dribbble.ButtonDropdown = {
        buttonDropdowns: document.querySelectorAll(".btn-dropdown"),
        buttonDropdownLinks: document.querySelectorAll(".btn-dropdown-link"),
        initialize: function() {
            this.buttonDropdowns.length && this.buttonDropdownLinks.length && (this.bindEventListeners(), this.buttonDropdownLinks.forEach(function(e) {
                var t = e.querySelector("span");
                e.dataset.dropdownState = "closed", t && t.dataset.fadeDefault && t.innerText.trim() == t.dataset.prompt && t.classList.add("default-option")
            }))
        },
        bindEventListeners: function() {
            0 !== this.buttonDropdownLinks.length && this.buttonDropdownLinks.forEach(this._bindEachDropdown.bind(this))
        },
        addLinks: function(e, t) {
            this.buttonDropdownLinks = Array.prototype.slice.call(this.buttonDropdownLinks).concat(t), this.buttonDropdowns = Array.prototype.slice.call(this.buttonDropdowns).concat(e), t.forEach(this._bindEachDropdown.bind(this))
        },
        closeAll: function() {
            this.buttonDropdowns.forEach(function(e) {
                e.classList.contains("open") && (e.classList.remove("open"), e.querySelector(".btn-dropdown-link").dataset.dropdownState = "closed")
            })
        },
        closeAllWhenClickedOutside: function(t) {
            var i = !1;
            this.buttonDropdownLinks.forEach(function(e) {
                e.contains(t.target) && (i = !0)
            }), i || this.closeAll()
        },
        resetDropdown: function(e, t) {
            e.querySelectorAll(".active").forEach(function(e) {
                e.classList.remove("active")
            });
            var i = e.querySelector(".btn-dropdown-link span");
            i.dataset.fadeDefault && i.classList.add("default-option"), i.innerText = t || i.dataset.prompt, e.querySelector(".btn-dropdown-options .default-filter-option").classList.add("active")
        },
        updateDropdown: function(e, t) {
            if (t) {
                var i = e.querySelector('[data-value="' + t + '"] a');
                i && this._selectOption({
                    target: i
                })
            } else this.resetDropdown(e)
        },
        click: function(e, t) {
            t || (t = {
                bubbles: !0,
                cancelable: !1
            });
            var i = document.querySelector(e);
            i && (event = new MouseEvent("click", t), i.dispatchEvent(event))
        },
        _bindEachDropdown: function(e) {
            e.addEventListener("click", this._openDropdown.bind(this)), e.nextElementSibling.querySelectorAll("a").forEach(this._bindEachOption.bind(this))
        },
        _bindEachOption: function(e) {
            e.addEventListener("click", this._selectOption.bind(this))
        },
        _selectOption: function(e, t) {
            var i = e.target,
                n = i.closest(".btn-dropdown"),
                o = n.querySelector("span"),
                a = n.querySelector(".active");
            a && a.classList.remove("active"), o && (o.innerHTML = t || i.innerHTML, o.dataset.fadeDefault && o.innerText.trim() == o.dataset.prompt ? o.classList.add("default-option") : o.classList.remove("default-option")), i.parentNode.classList.add("active")
        },
        _openDropdown: function(e) {
            e.preventDefault(), e.currentTarget.dataset.dropdownState = "open" == e.currentTarget.dataset.dropdownState ? "closed" : "open";
            var t = e.target.closest(".btn-dropdown-link"),
                i = t.parentNode.classList.contains("open");
            this.closeAll(), i || (document.addEventListener("click", this.closeAllWhenClickedOutside.bind(this)), t.parentNode.classList.add("open"))
        }
    }, Dribbble.Media || (Dribbble.Media = {}), Dribbble.Media.LoadingIndicator = function(e) {
        var t = [24, 48, 72, 96],
            i = t.length,
            n = !1;
        return {
            activate: function() {
                n = !0, this.show(), this.progress()
            },
            deactivate: function() {
                n = !1, e.style.backgroundPositionY = "0px"
            },
            hide: function() {
                e.style.display = "none"
            },
            progress: function() {
                n && (0 < i ? i -= 1 : i = t.length, e.style.backgroundPositionY = t[i] + "px", setTimeout(this.progress.bind(this), 250))
            },
            show: function() {
                e.style.display = "block"
            }
        }
    }, Dribbble.AnimatedGifSwap = {
        animatedUrl: function(e) {
            return e.replace(/(.*)_(1x|still_2x|still|teaser)(.*?)$/, "$1$3")
        },
        attach: function(e, t) {
            $(document).on({
                mouseenter: function(e) {
                    this.swapperFor($(e.currentTarget), t).activate()
                }.bind(this),
                mouseleave: function(e) {
                    this.swapperFor($(e.currentTarget)).deactivate()
                }.bind(this)
            }, e)
        },
        swapperFor: function(e, t) {
            if (!e.data("gif-swapper")) {
                var i = e;
                t.parentSelector && (i = e.parents(t.parentSelector)), e.data("gif-swapper", new Dribbble.AnimatedGifSwap.Swapper(i, t.picSelector))
            }
            return e.data("gif-swapper")
        }
    }, Dribbble.AnimatedGifSwap.Swapper = function(e, t) {
        var i = e.find(t),
            n = i.find("img"),
            o = n.data("animated-url") || null,
            a = new Dribbble.Media.LoadingIndicator(e.find(".loading-indicator")[0]);
        return {
            $shot: e,
            $imageContainer: i,
            $image: n,
            loaded: !1,
            hovering: !1,
            animatedSrc: o || Dribbble.AnimatedGifSwap.animatedUrl(i.find("img").attr("src")),
            activate: function() {
                this.hovering = !0, this.swapImage()
            },
            deactivate: function() {
                this.hovering = !1, this.restoreImage(), a.deactivate(), a.show()
            },
            loadImageInBackground: function(e, t) {
                var i = new Image;
                i.onload = function() {
                    this.loaded = !0, t()
                }.bind(this), i.src = e
            },
            restoreImage: function() {
                this.$imageContainer.find("source, img").each(function(e, t) {
                    this.revertSrc($(t))
                }.bind(this)), "undefined" !== n.data("srcset") && this.loaded && this.revertSrcset(n.data("srcset"))
            },
            swapImage: function() {
                this.loaded ? (this.$imageContainer.find("source, img").each(function(e, t) {
                    this.updateSrc($(t))
                }.bind(this)), Dribbble.Shots.logViewForShotInDiv(e), a.deactivate(), a.hide()) : (a.activate(), this.loadImageInBackground(this.animatedSrc, function() {
                    this.hovering && this.swapImage()
                }.bind(this)))
            },
            updateSrc: function(e) {
                var t = this.srcAttr(e),
                    i = e.attr(t);
                (e.is("img") && e.attr("srcset") ? e.attr("srcset") : null) && e.removeAttr("srcset"), void 0 === e.attr("data-originalsrc") && e.attr("data-originalsrc", i), e.attr(t, this.animatedSrc)
            },
            revertSrc: function(e) {
                e.attr(this.srcAttr(e), e.attr("data-originalsrc"))
            },
            revertSrcset: function(e) {
                this.$image.attr("srcset", e)
            },
            srcAttr: function(e) {
                return e.is("img") ? "src" : "srcset"
            }
        }
    }, Dribbble.MediaSwap = function() {
        var e = function(e) {
                if (this.selector = e, this.elements = document.querySelectorAll(e), this.active = !1, !Dribbble.isMobile()) {
                    for (var t = 0; t < this.elements.length; t++) el = this.elements[t], el.triggerTarget || (el.loaded = !1, el.triggerTarget = el, el.triggerTarget.parentContainer = el, el.triggerTarget.loadingIndicator = new Dribbble.Media.LoadingIndicator(el.querySelector(".loading-indicator")), el.triggerTarget.addEventListener("mouseenter", i.mouseenter), el.triggerTarget.addEventListener("mouseleave", i.mouseleave));
                    this.active = !0
                }
            },
            i = {
                mouseenter: function() {
                    var e = function() {
                        this.loaded = !0, this.loadingIndicator.deactivate(), this.loadingIndicator.hide()
                    };
                    if (!this.parentContainer.video) {
                        var t = document.createElement("video");
                        (this.parentContainer.video = t).className = "dribbble-video", t.muted = !0, t.autoplay = !0, t.loop = !0, this.parentContainer.offsetWidth < 400 ? t.src = this.parentContainer.dataset.videoTeaserSmall : this.parentContainer.offsetWidth < 800 ? t.src = this.parentContainer.dataset.videoTeaserMedium : t.src = this.parentContainer.dataset.videoTeaserLarge, this.loaded || t.addEventListener("canplaythrough", e.bind(this)), this.parentContainer.appendChild(t), this.parentContainer.insertBefore(t, this.parentContainer.firstChild)
                    }
                    this.parentContainer.video.paused && this.parentContainer.video.play()["catch"](function() {}), this.parentContainer.video.style.display = "block", this.parentContainer.video.style.visibility = "visible", this.loaded ? (this.loadingIndicator.deactivate(), this.loadingIndicator.hide()) : this.loadingIndicator.activate()
                },
                mouseleave: function() {
                    if (!this.parentContainer.video.paused) try {
                        this.parentContainer.video.pause()
                    } catch (e) {}
                    this.parentContainer.video.style.display = "none", this.parentContainer.video.style.visibility = "hidden", this.loadingIndicator.deactivate(), this.loadingIndicator.show()
                }
            };
        return e
    }(), Dribbble.HoverCards = {
        fetchDelay: 500,
        displayDelay: 1e3,
        pendingDisplayId: null,
        pendingFetchId: null,
        tooCloseToTop: 350,
        cache: {},
        displayedURL: null,
        dismissed: !1,
        cardBoundaries: null,
        wrapper: null,
        initialize: function(e) {
            this.scopeSelector = e, this.bindEventListeners()
        },
        bindEventListeners: function() {
            $(this.scopeSelector).on("mouseenter.hovercard", "a.hoverable", this.mouseenter.bind(this))
        },
        findCard: function() {
            var e = "new-hover-card",
                t = $("." + e);
            return 0 < t.length ? t : ($("body").prepend('<div class="' + e + '"></div>'), new Dribbble.FollowButton($("." + e), function(e) {
                return e.parent().find(".followers")
            }).initialize(), this.findCard())
        },
        mouseenter: function(e) {
            if (!e.ctrlKey && !e.metaKey) {
                var t = $(e.currentTarget),
                    i = (t.data("card") || t.attr("href")) + "/hover_card",
                    n = this.displayedURL != i;
                if (this.displayedURL)
                    if (n) this.dismiss();
                    else if (!this.dismissed) return !1;
                this.displayedURL = i, this.dismissed = !1;
                var o = +new Date,
                    a = this.findCard();
                return this.wrapper = t.closest(".hover-card-parent"), 0 == this.wrapper.length && (this.wrapper = t.parent()), this.addHandlerForDismissal(), this.cache[i] ? (n && a.html(this.cache[i]), this.delayedShow(a, o)) : this.delayedFetch(a, i, o), !1
            }
        },
        dismiss: function() {
            this.dismissed && !this.pendingDisplayId || (this.dismissed = !0, clearTimeout(this.pendingFetchId), clearTimeout(this.pendingDisplayId), this.pendingFetchId = this.pendingDisplayId = null, this.cardBoundaries = null, $(this.scopeSelector).off("mousemove.hovercard"), this.findCard().hide())
        },
        delayedShow: function(e, t) {
            var i = this.displayDelay - (+new Date - t);
            this.triggerBoundaries = this.getBoundariesForElement(this.wrapper);
            var n = this.triggerBoundaries.left + e.outerWidth(),
                o = this.wrapper[0].getBoundingClientRect().top;
            e.toggleClass("center", n > document.documentElement.clientWidth), e.toggleClass("top", o < this.tooCloseToTop);
            var a = {
                left: this.triggerBoundaries.left,
                bottom: "",
                top: ""
            };
            o < this.tooCloseToTop ? a.top = this.triggerBoundaries.top + this.wrapper.outerHeight() : a.bottom = $(window).height() - this.triggerBoundaries.top, e.css(a), clearTimeout(this.pendingDisplayId), this.pendingDisplayId = setTimeout(function() {
                User.loggedOut() && Dribbble.SignupModal.overlay.bindTrigger(), e.show(), this.cardBoundaries = this.getBoundariesForElement(e), o < this.tooCloseToTop ? this.cardBoundaries.top -= this.wrapper.outerHeight() : this.cardBoundaries.bottom += this.wrapper.outerHeight()
            }.bind(this), i)
        },
        delayedFetch: function(t, i, n) {
            clearTimeout(this.pendingFetchId), this.pendingFetchId = setTimeout(function() {
                this.dismissed || $.get(i, function(e) {
                    this.dismissed || (t.html(e).find("[rel=tipsy]").removeAttr("rel"), this.cache[i] = t.html(), this.delayedShow(t, n))
                }.bind(this))
            }.bind(this), this.fetchDelay)
        },
        checkShouldDismissOnMouseMove: function(e) {
            this.mouseIn(e, this.cardBoundaries) || this.wrapper.is(":hover") || this.dismiss()
        },
        getBoundariesForElement: function(e) {
            var t = e.offset();
            return t.right = e.outerWidth() + t.left, t.bottom = e.outerHeight() + t.top, t
        },
        mouseIn: function(e, t) {
            return null != t && e.pageX >= t.left && e.pageX <= t.right && e.pageY >= t.top && e.pageY <= t.bottom
        },
        addHandlerForDismissal: function() {
            this.removeHandlerForDismissal(), $(this.scopeSelector).on("mousemove.hovercard", this.checkShouldDismissOnMouseMove.bind(this))
        },
        removeHandlerForDismissal: function() {
            $(this.scopeSelector).off("mousemove.hovercard")
        }
    }, Dribbble.isMobile() || Dribbble.HoverCards.initialize("body"), Dribbble.Url = {
        addParams: function(e, t) {
            var i = e.split("#"),
                n = i[0] + this.urlJoinCharacter(e),
                o = i[1],
                a = [];
            ($.isArray(t) ? t : Object.keys(t).map(function(e) {
                return [e, t[e]]
            })).forEach(function(e) {
                var t = e[0],
                    i = e[1];
                $.isArray(i) ? i.forEach(function(e) {
                    a.push(t + "[]=" + encodeURIComponent(e))
                }) : a.push(t + "=" + encodeURIComponent(i))
            });
            var r = n + a.join("&");
            return o && (r += "#" + o), r
        },
        parse: function(e) {
            var t = document.createElement("a");
            return t.href = e, t
        },
        urlJoinCharacter: function(e) {
            return -1 == e.indexOf("?") ? "?" : "&"
        },
        extractParams: function(e) {
            return e.split("?")[1]
        },
        getUrlParamByName: function(e, t) {
            t = t || window.location;
            var i = RegExp("[?&]" + e + "=([^&]*)").exec(t.search);
            return i && decodeURIComponent(i[1].replace(/\+/g, " "))
        }
    }, Dribbble.SingleSubmit = {}, Dribbble.SingleSubmit.disableForm = function(e, t) {
        t = t || "Processing\u2026", e.attr("disabled", "disabled"), e.find("button[type=submit], input[type=submit]").attr("disabled", "disabled"), e.find("button[type=submit]").each(function(e, t) {
            $(t).data("original-preprocessing-text", $(t).text())
        }).text(t), e.find("input[type=submit]").each(function(e, t) {
            $(t).data("original-preprocessing-text", $(t).val())
        }).val(t)
    }, Dribbble.SingleSubmit.enableForm = function(e) {
        e.removeAttr("disabled"), e.find("button[type=submit], input[type=submit]").removeAttr("disabled", "disabled"), e.find("button[type=submit]").each(function(e, t) {
            $(t).text($(t).data("original-preprocessing-text") || "Submit")
        }), e.find("input[type=submit]").each(function(e, t) {
            $(t).val($(t).data("original-preprocessing-text") || "Submit")
        })
    }, Dribbble.SingleSubmit.bind = function(e, i) {
        var t = $(e);
        t.data("single-submit") || (t.on("submit.singleSubmit", function(e) {
            var t = $(e.currentTarget);
            Dribbble.SingleSubmit.disableForm(t, i)
        }), t.data("single-submit", !0))
    }, Dribbble.Autocomplete = function(e, o, a) {
        var r, s = $(e),
            t = function() {
                if (s.autocomplete(o), r = s.data("uiAutocomplete"), o.renderer && (r._renderItem = o.renderer), o.keypress && s.on("keypress.autocomplete", o.keypress), o.stayOpenOnMetaSelect) {
                    var t, i = r.menu.select;
                    r.menu.select = function(e) {
                        t = e.shiftKey || e.ctrlKey || e.metaKey, i.apply(this, arguments)
                    };
                    var n = r._close;
                    r._close = function(e) {
                        return !t && n.apply(this, arguments)
                    }
                }
                a && a(r)
            };
        if (s.autocomplete) t(s);
        else {
            var i = "keypress.autocomplete.preload";
            s.on(i, function() {
                s.off(i), $.getScript("/assets/jquery-ui-1.12.1-d981b6dbbbd74051ddbc7410e3794192a3f41b948ad0fc28bad142287d811f6b.js", function() {
                    t(), s.autocomplete("search", s.val())
                })
            })
        }
    }, Dribbble.AutocompleteCache = function() {
        this.content = {}
    }, Dribbble.AutocompleteCache.prototype = {
        lookup: function(t, i, e) {
            if (this.content.hasOwnProperty(t)) i(this.content[t]);
            else {
                var n = function(e) {
                    this.content[t] = e, i(e)
                }.bind(this);
                e(t, n)
            }
        },
        termHasNoResults: function(e) {
            return this.content[e] != undefined && 0 == this.content[e].length
        },
        isDeadEnd: function(e) {
            if (this.termHasNoResults(e)) return !0;
            for (var t = 1; t < e.length + 1; t++)
                if (this.termHasNoResults(e.substring(0, t))) return !0;
            return !1
        }
    }, Dribbble.Recaptcha = {
        initialized: !1,
        initialize: function() {
            if (!this.initialized) {
                var e = setTimeout(function() {
                    this.loaded() || this.showLoadError()
                }.bind(this), 1e4);
                this.hideCaptchaNotLoaded = function() {
                    clearInterval(e), $(".captcha-not-loaded").hide()
                }, $.getScript("https://www.google.com/recaptcha/api.js", this.hideCaptchaNotLoaded), Dribbble.captchaSuccess = Dribbble.captchaSuccess || function(e) {
                    e.currentTarget.submit()
                }, this.initialized = !0, this.bindEventListeners()
            }
        },
        bindEventListeners: function() {
            var t = $(".g-recaptcha").parents("form");
            t.one("submit.recaptcha", function(e) {
                e.preventDefault(), window.captchaCallback = function() {
                    this.hideCaptchaNotLoaded(), t.off("submit.recaptcha").on("submit", Dribbble.captchaSuccess), Dribbble.captchaSuccess(e)
                }.bind(this), this.loaded() ? grecaptcha.execute() : this.showLoadError()
            }.bind(this))
        },
        loaded: function() {
            return "undefined" != typeof grecaptcha
        },
        showLoadError: function() {
            $(".captcha-not-loaded").show()
        }
    }, Dribbble.SignupModalForm = function(e) {
        this.$el = e, this.$errorContainer = this.$el.children(".errorExplanation"), this.$errorsList = this.$errorContainer.children("ul"), this.$submitButton = $("#signup-submit")
    }, Dribbble.SignupModalForm.prototype = {
        show: function() {
            this.$el.show()
        },
        submit: function(e) {
            this.resetErrors();
            var t = this.$el.serializeArray();
            for (var i in e) e.hasOwnProperty(i) && t.push({
                name: i,
                value: e[i]
            });
            var n = $.post(this.$el.attr("action"), t);
            n.done(this.onSuccess.bind(this)), n.fail(this.onFailure.bind(this))
        },
        onSuccess: function(e) {
            window.location = e.redirect_to
        },
        onFailure: function(e) {
            var t = JSON.parse(e.responseText).errors.map(function(e) {
                return $("<li />").text(e)
            });
            this.$errorsList.append(t), this.$errorContainer.show(), this.$submitButton.prop("disabled", !1)
        },
        resetErrors: function() {
            this.$errorsList.html(""), this.$errorContainer.hide()
        }
    }, Dribbble.SignupModal = {
        overlay: null,
        originalPitchContent: null,
        defaultParams: {
            signup: !0
        },
        variant: null,
        triggerData: {},
        signupReasons: {
            "like-shot": "To like a shot, please create an account.",
            "view-shot": "To view this shot in detail, please create an account.",
            "member-profile": "To view this profile, please create an account.",
            "more-from-user": "To view more shots from this user, please create an account.",
            "bucket-shot": "To save a shot, please create an account.",
            "follow-user": "To follow this user, please create an account.",
            "message-user": "To message this user, please create an account.",
            "list-user": "To add this user to a list, please create an account.",
            "share-overtime": "Keep up with the latest Overtime episodes by joining Dribbble today!",
            "share-courtside": "Keep up with the latest Courtside posts by joining Dribbble today!",
            "create-team": "Before purchasing a team, please create an account.",
            "shot-navigation": "To browse more shots, please create an account.",
            "more-profile-shots": "To view more shots from this user, please create an account.",
            "logged-out-message": "To send this inquiry, please sign in or create an account.",
            "new-pro-logged-out": "To sign up as a pro, please sign in or create an account.",
            "shot-page-feed": "To like shots, follow users, and more, please create an account.",
            "download-attachment": "To download attachments, please sign in or create an account.",
            "global-survey-2019": "To download this report, please sign in or create an account.",
            "calendly-meeting": "To schedule a call with this user, please sign in or create an account."
        },
        initialize: function() {
            this.resetParams(), this.$el = $("#signup-overlay"), this.originalPitchContent = this.getPitch(), this.overlay = new Dribbble.Overlay.Simple({
                $el: this.$el,
                onHide: this.onHide.bind(this),
                remoteContent: {
                    el: this.$el.find(".display"),
                    url: "/signup/modal?return_to=" + window.location.href,
                    onComplete: function(e, t, i) {
                        Dribbble.Recaptcha.initialize(), Dribbble.captchaSuccess = function(e) {
                            e.preventDefault(), this.form.submit(this.additionalParams)
                        }.bind(this), 200 == i.status ? this.bindFormEventListeners() : 205 == i.status ? (this.$el.find(".display").html("Signing you in, please wait\u2026"), window.location.reload()) : window.location = "/signup"
                    }.bind(this)
                }
            }), this.bindEventListeners()
        },
        open: function(e) {
            this.triggerData = e, this.overlay.show(), this.triggerData = {}
        },
        bindEventListeners: function() {
            0 != this.$el.length && this.bindOnceListeners()
        },
        bindFormEventListeners: function() {
            var t = this.$el.find("#new_user"),
                i = this.$el.find(".email-signup-toggle");
            this.form = new Dribbble.SignupModalForm(t), i.on("click", function(e) {
                e.preventDefault(), i.addClass("on")
            }), t.on("click", function(e) {
                i.addClass("on"), $(e.currentTarget).hasClass("ab-2") || t.off("click")
            }), this.$el.find(".auth-google").on("click", function(e) {
                Dribbble.Itly.googleAuthenticationStarted({
                    trigger: "google",
                    object_type: "Modal",
                    type: e.currentTarget.authAction || "Sign Up"
                })
            }), this.$el.find(".auth-twitter").on("click", function(e) {
                Dribbble.Itly.twitterAuthenticationStarted({
                    trigger: "twitter",
                    object_type: "Modal",
                    type: e.currentTarget.dataset.authAction || "Sign Up"
                })
            }), this.$el.find("#already-a-member").on("click", function() {
                $("#signup-fields").addClass("hide"), $("#signin-fields").removeClass("hide")
            }), this.$el.find("#not-a-member").on("click", function() {
                $("#signin-fields").addClass("hide"), $("#signup-fields").removeClass("hide")
            });
            var e = this.getTriggerData();
            if (e.signupPitchContent) {
                var n = $("#" + e.signupPitchContent).html();
                this.setPitch(n)
            }
            var o = e.returnTo || window.location;
            if (this.setParam("return_to", o), e.params)
                for (var a in e.params) e.params.hasOwnProperty(a) && this.setParam(a, e.params[a]);
            var r = e.reason || this.signupReasons[e.context];
            r ? this.$el.find(".signup-reason").attr("data-reason", e.reason).text(r).addClass("visible") : this.$el.find(".signup-reason").removeAttr("data-reason").empty().removeClass("visible"), this.updateSocialAuthLinks(), this.overlay.trackingData = {
                name: "sign up",
                context: e.context
            }, Dribbble.Itly.authenticationViewed({
                object_type: "Modal",
                trigger: e.context || "unknown",
                type: window.returningVisitor ? "Sign In" : "Sign Up"
            })
        },
        bindOnceListeners: function() {
            this.isBound || (this.isBound = !0, $(document.body).on("click", "[data-signup-trigger]", this.overlay.triggerHandler.bind(this.overlay)))
        },
        getTriggerData: function() {
            return $(this.overlay.currentTarget).data() || this.triggerData
        },
        onHide: function() {
            this.restoreContent(), this.bindEventListeners(), this.$el.find(".signup-reason").removeClass("visible")
        },
        setParam: function(e, t) {
            this.additionalParams[e] = t
        },
        setPitch: function(e) {
            this.$el.find(".pitch-column").html(e)
        },
        getPitch: function() {
            return this.$el.find(".pitch-column").html()
        },
        resetParams: function() {
            this.additionalParams = this.defaultParams
        },
        restoreContent: function() {
            this.setPitch(this.originalPitchContent), this.resetParams()
        },
        setContext: function() {
            var e = document.querySelector(".signup-reason").innerText;
            if (e !== undefined)
                for (var t in this.signupReasons)
                    if (this.signupReasons[t] == e) return t
        },
        updateSocialAuthLinks: function() {
            this.$el.find("a.social-signup").each(function(e, t) {
                var i = $(t);
                i.data().originalUrl || i.data("originalUrl", i.attr("href"));
                var n = i.data().originalUrl;
                i.attr("href", Dribbble.Url.addParams(n, this.additionalParams))
            }.bind(this))
        }
    }, Dribbble.SignupModal.initialize(), Dribbble.MessageDraft = {
        notice: $("#draft-message"),
        purgeableAfter: 3600,
        draftMessage: null,
        save: function(e) {
            var t = {
                data: e,
                storedAt: (new Date).getTime()
            };
            localStorage.setItem("draft_message", JSON.stringify(t))
        },
        init: function() {
            var e = Dribbble && Dribbble.JsConfig && Dribbble.JsConfig.features && Dribbble.JsConfig.features.messageFlowHiringTrial;
            !this.draftMessage && Cookies.get("draft_message") && e ? (this.draftMessage = {
                message: JSON.parse(Cookies.get("draft_message")),
                storedAt: (new Date).getTime()
            }, this.draftMessage.message && this.draftMessage.message.body && (this.draftMessage.message.body = this.draftMessage.message.body.replaceAll("+", " "))) : this.draftMessage = JSON.parse(localStorage.getItem("draft_message")), this.purge(), this.toggleNotice(), this.bindAll()
        },
        send: function(e) {
            var t;
            t = Dribbble && Dribbble.JsConfig && Dribbble.JsConfig.features && Dribbble.JsConfig.features.messageFlowHiringTrial ? this.draftMessage : this.draftMessage.data, e.preventDefault(), t && (this.notice.html("Processing..."), $.post("/messages", t, this.onSuccess.bind(this)).fail(this.onFailure.bind(this)))
        },
        cancel: function(e) {
            this["delete"](), this.notice.hide(), e.preventDefault()
        },
        "delete": function() {
            Cookies.remove("draft_message"), localStorage.removeItem("draft_message"), this.draftMessage = undefined
        },
        purge: function() {
            this.draftMessage && (((new Date).getTime() - this.draftMessage.storedAt) / 1e3 > this.purgeableAfter && this["delete"]())
        },
        onSuccess: function(e, t, i) {
            201 == i.status ? (this.notice.html(e.text), this["delete"]()) : this.onFailure()
        },
        onFailure: function() {
            this.notice.html("Oops, something went wrong."), this["delete"]()
        },
        toggleNotice: function() {
            this.draftMessage || Cookies.get("draft_message") ? this.notice.show() : this.notice.hide()
        },
        bindAll: function() {
            $('[data-draft-message="send"]').on("click", this.send.bind(this)), $('[data-draft-message="cancel"]').on("click", this.cancel.bind(this))
        }
    }, Dribbble.MessageDraft.init(), Dribbble.MessageModalNew = function MessageModalNew() {
        this.init = function(e) {
            e = e || {}, this.form = $("form.message"), this.maxLength = e.maxLength
        }, this.bindEventListeners = function() {
            this.form = $("form.message"), Dribbble.SingleSubmit.bind(this.form), this.form.on("change", function(e) {
                this.submitToggle(e.target.closest("form"))
            }.bind(this)), this.form.trigger("change")
        }, this.onSubmit = function(e) {
            e.preventDefault();
            var t = $(e.target),
                i = t.serialize();
            if (!this.validate(e.target)) return !1;
            $.post(t.attr("action"), i, this.onSuccess.bind(this)), !(Dribbble && Dribbble.JsConfig && Dribbble.JsConfig.features && Dribbble.JsConfig.features.messageFlowHiringTrial) && User.loggedOut() && Dribbble.MessageDraft.save(i)
        }, this.onSuccess = function(e, t, i) {
            if (Dribbble && Dribbble.JsConfig && Dribbble.JsConfig.features && Dribbble.JsConfig.features.messageFlowHiringTrial)
                if (201 == i.status) {
                    if (Dribbble.JsConfig.user.hasDesignerSearch) {
                        if (!Dribbble.JsConfig.user.isVerified) return void window.location.reload();
                        Dribbble.EventBus.$emit("MessageSent", {
                            userId: document.getElementById("message_recipient_id").value,
                            messageThreadId: e.message_thread_id
                        });
                        var n = document.getElementById("work_type_fulltime") ? document.getElementById("work_type_fulltime").value : undefined,
                            o = document.getElementById("is_remote_position") ? document.getElementById("is_remote_position").value : undefined;
                        Dribbble.EventBus.$emit("track:userMessaged", {
                            message_body: document.getElementById("message_body").value,
                            message_recipient_id: document.getElementById("message_recipient_id").value,
                            message_thread_id: e.message_thread_id.toString(),
                            message_id: e.message_id.toString(),
                            job_work_type: n ? "Full-time" : "Freelance",
                            budget: document.getElementById("budget") ? document.getElementById("budget").value : undefined,
                            job_location: document.getElementById("location") ? document.getElementById("location").value : undefined,
                            job_timeline: document.getElementById("timeline") ? document.getElementById("timeline").value : undefined,
                            remote_friendly: !(!o || "true" !== o.value),
                            salary_range: document.getElementById("salary_range") ? document.getElementById("salary_range").value : undefined
                        }), this.messageAttemptOverlay.hide(), Dribbble.EventBus.$emit("openMessageSentModal", {
                            recipientName: e.recipient,
                            messageThreadURL: "/messages"
                        })
                    } else if (this.messageAttemptOverlay.hide(), Dribbble.EventBus.$emit("openCheckoutModal", {
                            productType: "hiring",
                            billingType: "monthly",
                            closeButtonGoesBack: !1,
                            showHiringTrialFlow: !!User.loggedOut() || Dribbble.JsConfig.user.isHiringTrialEligible,
                            showCheckoutInModal: !0,
                            messageSentData: {
                                recipientName: e.recipient,
                                messageThreadURL: "/messages"
                            }
                        }), Dribbble && Dribbble.JsConfig && Dribbble.JsConfig.user && Dribbble.JsConfig.user.freeMessagesCount) {
                        Dribbble.EventBus.$emit("MessageSent", {
                            userId: document.getElementById("message_recipient_id").value,
                            messageThreadId: e.message_thread_id
                        });
                        n = document.getElementById("work_type_fulltime") ? document.getElementById("work_type_fulltime").value : undefined, o = document.getElementById("is_remote_position") ? document.getElementById("is_remote_position").value : undefined;
                        Dribbble.EventBus.$emit("track:userMessaged", {
                            message_body: document.getElementById("message_body").value,
                            message_recipient_id: document.getElementById("message_recipient_id").value,
                            message_thread_id: e.message_thread_id.toString(),
                            message_id: e.message_id.toString(),
                            job_work_type: n ? "Full-time" : "Freelance",
                            budget: document.getElementById("budget") ? document.getElementById("budget").value : undefined,
                            job_location: document.getElementById("location") ? document.getElementById("location").value : undefined,
                            job_timeline: document.getElementById("timeline") ? document.getElementById("timeline").value : undefined,
                            remote_friendly: "true" === o.value,
                            salary_range: document.getElementById("salary_range") ? document.getElementById("salary_range").value : undefined
                        })
                    }
                } else this.form.parents(".display").html(e), this.bindEventListeners();
            else 201 == i.status ? User.loggedOut() ? (this.messageAttemptOverlay.hide(), Dribbble.SignupModal.open({
                context: "logged-out-message"
            })) : (Dribbble.EventBus.$emit("MessageSent", {
                userId: document.getElementById("message_recipient_id").value,
                messageThreadId: e.message_thread_id
            }), Dribbble.EventBus.$emit("track:userMessaged", {
                message_body: document.getElementById("message_body").value,
                message_recipient_id: document.getElementById("message_recipient_id").value,
                message_thread_id: e.message_thread_id.toString(),
                message_id: e.message_id.toString()
            }), $(this.messageAttemptOverlay.remoteContent.el).html("<p class='response-text'>" + e.text + "</p>"), setTimeout(function() {
                this.messageAttemptOverlay.hide()
            }.bind(this), 2e3)) : (this.form.parents(".display").html(e), this.bindEventListeners())
        }, this.overlayLoaded = function(e, t) {
            if ("error" == t) {
                var i;
                try {
                    i = $.parseJSON(e).path
                } catch (n) {
                    console.warn(n)
                }
                return i ? window.location = i : $(this.messageAttemptOverlay.remoteContent.el).empty().html('<p class="error">Something went wrong. Please refresh the page and try again.</p>'), !1
            }
            this.bindEventListeners()
        }, this.characterCounter = function(e, t, i) {
            function n() {
                i.innerHTML = "Characters left: " + (t - e.value.length), e.value.length > t ? (i.innerHTML = "You have exceeded the character limit", i.classList.add("text-red")) : i.classList.remove("text-red"), e.addEventListener("blur", function() {
                    i.style.display = "none"
                }), e.addEventListener("focus", function() {
                    i.style.display = "block"
                })
            }
            e && (e.addEventListener("keyup", function() {
                n()
            }), e.addEventListener("change", function() {
                n()
            }))
        }, this.validate = function(e) {
            var t, i = $(e),
                n = this.maxLength,
                o = i.find('[name="message[body]"]').val();
            return o ? o.length > n && (t = {
                title: "Message too long",
                message: "Your message is " + o.length + " characters. Please limit your message to " + n + " characters or less.",
                id: "message-length"
            }) : t = {
                title: "Must include a message",
                message: "Please enter a message before sending.",
                id: "message-required"
            }, !t || (Dribbble.EventBus.$emit("siteNotifications:add", {
                title: t.title,
                message: t.message,
                id: "form-error"
            }), Dribbble.SingleSubmit.enableForm(i), !1)
        }, this.submitToggle = function(e) {
            this.submitBtn = e.querySelector(".js-submit"), this.textArea = e.querySelector(".js-message-text-area"), this.formElement = e, this.textArea && this.enableSubmit(this.textArea, this.submitBtn)
        }, this.enableSubmit = function(e, t) {
            0 < e.value.length && t.removeAttribute("disabled"), e.addEventListener("keyup", this.toggleDisabled.bind(this))
        }, this.toggleDisabled = function() {
            this.textArea && 0 < this.textArea.value.length ? this.submitBtn.removeAttribute("disabled") : this.submitBtn.setAttribute("disabled", "true")
        }
    }, Dribbble.uuidv4 = function() {
        return "undefined" != typeof crypto ? ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(e) {
            return (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16)
        }) : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16)
        })
    };