/**
 * @description JavaScript tracker for Snowplow
 * @version     2.17.3
 * @copyright   Anthon Pang, Snowplow Analytics Ltd
 * @license     Simplified BSD
 * 
 * Documentation: http://bit.ly/sp-js
 */

'use strict';
(function() {
    function D(a) {
        "@babel/helpers - typeof";
        D = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(a) {
            return typeof a
        } : function(a) {
            return a && "function" === typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        };
        return D(a)
    }

    function Sb(a, b) {
        var c = Object.keys(a);
        if (Object.getOwnPropertySymbols) {
            var e = Object.getOwnPropertySymbols(a);
            b && (e = e.filter(function(b) {
                return Object.getOwnPropertyDescriptor(a, b).enumerable
            }));
            c.push.apply(c, e)
        }
        return c
    }

    function nd(a) {
        for (var b = 1; b < arguments.length; b++) {
            var c = null != arguments[b] ? arguments[b] : {};
            b % 2 ? Sb(Object(c), !0).forEach(function(b) {
                var d = c[b];
                b in a ? Object.defineProperty(a, b, {
                    value: d,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : a[b] = d
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : Sb(Object(c)).forEach(function(b) {
                Object.defineProperty(a, b, Object.getOwnPropertyDescriptor(c, b))
            })
        }
        return a
    }

    function qa(a) {
        var b = Array.isArray(a) ? jb(a) : void 0;
        b || (b =
            "undefined" !== typeof Symbol && Symbol.iterator in Object(a) ? Array.from(a) : void 0);
        if (!(a = b || fc(a))) throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        return a
    }

    function fc(a, b) {
        if (a) {
            if ("string" === typeof a) return jb(a, b);
            var c = Object.prototype.toString.call(a).slice(8, -1);
            "Object" === c && a.constructor && (c = a.constructor.name);
            if ("Map" === c || "Set" === c) return Array.from(a);
            if ("Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)) return jb(a,
                b)
        }
    }

    function jb(a, b) {
        if (null == b || b > a.length) b = a.length;
        for (var c = 0, e = Array(b); c < b; c++) e[c] = a[c];
        return e
    }

    function kb(a, b) {
        var c;
        if ("undefined" === typeof Symbol || null == a[Symbol.iterator]) {
            if (Array.isArray(a) || (c = fc(a)) || b && a && "number" === typeof a.length) {
                c && (a = c);
                var e = 0;
                b = function() {};
                return {
                    s: b,
                    n: function() {
                        return e >= a.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: a[e++]
                        }
                    },
                    e: function(a) {
                        throw a;
                    },
                    f: b
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var d = !0,
            f = !1,
            h;
        return {
            s: function() {
                c = a[Symbol.iterator]()
            },
            n: function() {
                var a = c.next();
                d = a.done;
                return a
            },
            e: function(a) {
                f = !0;
                h = a
            },
            f: function() {
                try {
                    d || null == c.return || c.return()
                } finally {
                    if (f) throw h;
                }
            }
        }
    }

    function ra(a) {
        var b = {
            exports: {}
        };
        return a(b, b.exports), b.exports
    }

    function sa(a) {
        var b = -1,
            c = null == a ? 0 : a.length;
        for (this.clear(); ++b < c;) {
            var e = a[b];
            this.set(e[0], e[1])
        }
    }

    function ba(a) {
        var b = -1,
            c = null == a ? 0 : a.length;
        for (this.clear(); ++b < c;) {
            var e = a[b];
            this.set(e[0], e[1])
        }
    }

    function ta(a) {
        var b = -1,
            c = null ==
            a ? 0 : a.length;
        for (this.clear(); ++b < c;) {
            var e = a[b];
            this.set(e[0], e[1])
        }
    }

    function ua(a) {
        this.size = (this.__data__ = new lb(a)).size
    }

    function Ha(a) {
        var b = -1,
            c = null == a ? 0 : a.length;
        for (this.__data__ = new va; ++b < c;) this.add(a[b])
    }

    function Ia(a, b, c, e, d) {
        if (a === b) b = !0;
        else if (null == a || null == b || !Q(a) && !Q(b)) b = a !== a && b !== b;
        else a: {
            var f = u(a),
                h = u(b),
                g = f ? "[object Array]" : gc(a),
                k = h ? "[object Array]" : gc(b);g = "[object Arguments]" == g ? "[object Object]" : g;k = "[object Arguments]" == k ? "[object Object]" : k;
            var p = "[object Object]" ==
                g;h = "[object Object]" == k;
            if ((k = g == k) && Ja(a)) {
                if (!Ja(b)) {
                    b = !1;
                    break a
                }
                f = !0;
                p = !1
            }
            if (k && !p) d || (d = new Ka),
            b = f || hc(a) ? ic(a, b, c, e, Ia, d) : od(a, b, g, c, e, Ia, d);
            else {
                if (!(c & 1) && (f = p && jc.call(a, "__wrapped__"), g = h && jc.call(b, "__wrapped__"), f || g)) {
                    a = f ? a.value() : a;
                    b = g ? b.value() : b;
                    d || (d = new Ka);
                    b = Ia(a, b, c, e, d);
                    break a
                }
                if (k) b: if (d || (d = new Ka), f = c & 1, g = kc(a, La, lc), h = g.length, k = kc(b, La, lc).length, h == k || f) {
                    for (k = h; k--;) {
                        var v = g[k];
                        if (!(f ? v in b : pd.call(b, v))) {
                            b = !1;
                            break b
                        }
                    }
                    p = d.get(a);
                    v = d.get(b);
                    if (p && v) b = p == b && v == a;
                    else {
                        p = !0;
                        d.set(a, b);
                        d.set(b, a);
                        for (var M = f; ++k < h;) {
                            v = g[k];
                            var m = a[v],
                                r = b[v];
                            if (e) var N = f ? e(r, m, v, b, a, d) : e(m, r, v, a, b, d);
                            if (void 0 === N ? m !== r && !Ia(m, r, c, e, d) : !N) {
                                p = !1;
                                break
                            }
                            M || (M = "constructor" == v)
                        }
                        p && !M && (c = a.constructor, e = b.constructor, c != e && "constructor" in a && "constructor" in b && !("function" == typeof c && c instanceof c && "function" == typeof e && e instanceof e) && (p = !1));
                        d["delete"](a);
                        d["delete"](b);
                        b = p
                    }
                } else b = !1;
                else b = !1
            }
        }
        return b
    }

    function Fb(a, b) {
        if ("function" != typeof a || null != b && "function" != typeof b) throw new TypeError("Expected a function");
        var c = function d() {
            var c = arguments,
                h = b ? b.apply(this, c) : c[0],
                g = d.cache;
            if (g.has(h)) return g.get(h);
            c = a.apply(this, c);
            d.cache = g.set(h, c) || g;
            return c
        };
        c.cache = new(Fb.Cache || va);
        return c
    }

    function mc(a) {
        if ("string" == typeof a) return a;
        if (u(a)) return nc(a, mc) + "";
        if (Ma(a)) return oc ? oc.call(a) : "";
        var b = a + "";
        return "0" == b && 1 / a == -qd ? "-0" : b
    }

    function pc(a) {
        if (!qc(a)) {
            a = a.text || "";
            var b = wa.getElementsByTagName("title");
            b && void 0 !== b[0] && (a = b[0].text)
        }
        return a
    }

    function Tb(a) {
        var b = /^(?:(?:https?|ftp):)\/*(?:[^@]+@)?([^:/#]+)/.exec(a);
        return b ? b[1] : a
    }

    function cc(a) {
        var b = a.length;
        "." === a.charAt(--b) && (a = a.slice(0, b));
        "*." === a.slice(0, 2) && (a = a.slice(1));
        return a
    }

    function dc(a) {
        var b = "",
            c = Gb("referrer", Z.location.href) || Gb("referer", Z.location.href);
        if (c) return c;
        if (a) return a;
        try {
            b = Z.top.document.referrer
        } catch (e) {
            if (Z.parent) try {
                b = Z.parent.document.referrer
            } catch (d) {
                b = ""
            }
        }
        "" === b && (b = wa.referrer);
        return b
    }

    function q(a, b, c, e) {
        if (a.addEventListener) return a.addEventListener(b, c, e), !0;
        if (a.attachEvent) return a.attachEvent("on" + b, c);
        a["on" + b] = c
    }

    function Gb(a, b) {
        return (a = (new RegExp("^[^#]*[?&]" + a + "=([^&#]*)")).exec(b)) ? decodeURIComponent(a[1].replace(/\+/g, " ")) : null
    }

    function mb(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return rd(ca(a, function(a) {
            if ("function" === typeof a) try {
                return a.apply(null, b)
            } catch (e) {} else return a
        }))
    }

    function y(a) {
        "undefined" !== typeof console && console.warn("Snowplow: " + a)
    }

    function da(a) {
        return a.className.match(/\S+/g) || []
    }

    function Hb(a, b) {
        if (Array.isArray(a) || !I(a)) return function() {
            return !0
        };
        if (a.hasOwnProperty("filter")) return a.filter;
        var c = a.hasOwnProperty("whitelist");
        a = a.whitelist || a.blacklist;
        Array.isArray(a) || (a = [a]);
        for (var e = {}, d = 0; d < a.length; d++) e[a[d]] = !0;
        return b ? function(a) {
            a: {
                a = da(a);
                var b;
                for (b = 0; b < a.length; b++)
                    if (e[a[b]]) {
                        a = !0;
                        break a
                    }
                a = !1
            }
            return a === c
        } : function(a) {
            return a.name in e === c
        }
    }

    function sd(a) {
        return I(a) ? a.hasOwnProperty("transform") ? a.transform : function(a) {
            return a
        } : function(a) {
            return a
        }
    }

    function Ub(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] :
            63072E3;
        try {
            var e = Date.now() + 1E3 * c;
            xa.setItem("".concat(a, ".expires"), e);
            xa.setItem(a, b);
            return !0
        } catch (d) {
            return !1
        }
    }

    function rc(a) {
        try {
            return xa.removeItem(a), xa.removeItem(a + ".expires"), !0
        } catch (b) {
            return !1
        }
    }

    function td(a, b) {
        for (var c = "_sp_root_domain_test_" + (new Date).getTime(), e = "_test_value_" + (new Date).getTime(), d = Z.location.hostname.split("."), f = d.length - 1; 0 <= f;) {
            var h = d.slice(f, d.length).join(".");
            J(c, e, 0, "/", h, a, b);
            if (J(c) === e) {
                J(c, "", -1, "/", h, a, b);
                c = wa.cookie.split("; ");
                e = [];
                for (d = 0; d <
                    c.length; d++) "_sp_root_domain_test_" === c[d].substring(0, 21) && e.push(c[d]);
                c = e;
                for (e = 0; e < c.length; e++) J(c[e], "", -1, "/", h, a, b);
                return h
            }--f
        }
        return Z.location.hostname
    }

    function sc(a, b) {
        for (var c = 0; c < b.length; c++)
            if (b[c] === a) return !0;
        return !1
    }

    function J(a, b, c, e, d, f, h) {
        return 1 < arguments.length ? wa.cookie = a + "=" + encodeURIComponent(b) + (c ? "; Expires=" + (new Date(+new Date + 1E3 * c)).toUTCString() : "") + (e ? "; Path=" + e : "") + (d ? "; Domain=" + d : "") + (f ? "; SameSite=" + f : "") + (h ? "; Secure" : "") : decodeURIComponent((("; " + wa.cookie).split("; " +
            a + "=")[1] || "").split(";")[0])
    }

    function nb(a) {
        a = parseInt(a);
        return isNaN(a) ? void 0 : a
    }

    function Ib(a) {
        a = parseFloat(a);
        return isNaN(a) ? void 0 : a
    }

    function ob(a) {
        return a && "function" === typeof a ? !0 : !1
    }

    function ud(a, b, c, e, d) {
        function f(e, f, h) {
            h = h || {};
            g.hasOwnProperty(e) ? y("Tracker namespace " + e + " already exists.") : (g[e] = new a(d, e, b, c, h), g[e].setCollectorUrl(f))
        }

        function h() {
            var a;
            for (a = 0; a < arguments.length; a += 1) {
                var b = arguments[a];
                var c = Array.prototype.shift.call(b);
                if (ob(c)) try {
                    c.apply(g, b)
                } catch (C) {
                    y("Custom callback error - ".concat(C))
                } finally {
                    continue
                }
                var d =
                    c.split(":");
                c = d[0];
                d = 1 < d.length ? d[1].split(";") : [];
                d = [c, d];
                c = d[0];
                d = d[1];
                if ("newTracker" === c) f(b[0], b[1], b[2]);
                else if ("setCollectorCf" !== c && "setCollectorUrl" !== c || d && 0 !== d.length) {
                    var e = [];
                    if (d && 0 !== d.length)
                        for (var h = 0; h < d.length; h++) g.hasOwnProperty(d[h]) ? e.push(g[d[h]]) : y('Warning: Tracker namespace "' + d[h] + '" not configured');
                    else e = ca(g);
                    0 === e.length && y("Warning: No tracker configured");
                    for (d = 0; d < e.length; d++) e[d][c].apply(e[d], b)
                } else d = b[0], b = b[1], y(c + " is deprecated. Set the collector when a new tracker instance using newTracker."),
                    b = void 0 === b ? "sp" : b, f(b), g[b][c](d)
            }
        }
        for (var g = {}, k = 0; k < e.length; k++) h(e[k]);
        return {
            push: h
        }
    }

    function tc(a, b, c) {
        if ("translate.googleusercontent.com" === a) "" === c && (c = b), a = /^(?:https?|ftp)(?::\/*(?:[^?]+))([?][^#]+)/.exec(b), b = Gb("u", a[1]), a = Tb(b);
        else {
            var e;
            if (!(e = "cc.bingj.com" === a || "webcache.googleusercontent.com" === a)) a: {
                if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(a)) try {
                    var d =
                        document.body.children[0].children[0].children[0].children[0].children[0].children[0].innerHTML;
                    e = "You have reached the cached page for" === d.slice(0, 36);
                    break a
                } catch (f) {
                    e = !1;
                    break a
                }
                e = void 0
            }
            e && (b = document.links[0].href, a = Tb(b))
        }
        return [a, b, c]
    }

    function vd() {
        try {
            var a = !!ya.localStorage
        } catch (b) {
            a = !0
        }
        if (!a) return !1;
        try {
            return ya.localStorage.setItem("modernizr", "modernizr"), ya.localStorage.removeItem("modernizr"), !0
        } catch (b) {
            return !1
        }
    }

    function wd() {
        var a = ya,
            b = "inner";
        "innerWidth" in ya || (b = "client",
            a = pb.documentElement || pb.body);
        var c = a[b + "Width"];
        a = a[b + "Height"];
        return 0 <= c && 0 <= a ? c + "x" + a : null
    }

    function xd() {
        var a = pb.documentElement,
            b = pb.body,
            c = Math.max(a.clientWidth, a.offsetWidth, a.scrollWidth);
        a = Math.max(a.clientHeight, a.offsetHeight, a.scrollHeight, b ? Math.max(b.offsetHeight, b.scrollHeight) : 0);
        return isNaN(c) || isNaN(a) ? "" : c + "x" + a
    }

    function yd() {
        var a, b = {
                pdf: "application/pdf",
                qt: "video/quicktime",
                realp: "audio/x-pn-realaudio-plugin",
                wma: "application/x-mplayer2",
                dir: "application/x-director",
                fla: "application/x-shockwave-flash",
                java: "application/x-java-vm",
                gears: "application/x-googlegears",
                ag: "application/x-silverlight"
            },
            c = {};
        if (R.mimeTypes && R.mimeTypes.length)
            for (a in b)
                if (Object.prototype.hasOwnProperty.call(b, a)) {
                    var e = R.mimeTypes[b[a]];
                    c[a] = e && e.enabledPlugin ? "1" : "0"
                }
        R.constructor === window.Navigator && "unknown" !== typeof R.javaEnabled && void 0 !== R.javaEnabled && R.javaEnabled() && (c.java = "1");
        ob(ya.GearsFactory) && (c.gears = "1");
        c.res = qb.width + "x" + qb.height;
        c.cd = qb.colorDepth;
        c.cookie = R.cookieEnabled ? "1" : "0";
        return c
    }

    function zd(a,
        b, c) {
        function e(b, d) {
            for (var e, f, h, k; null !== (e = b.parentNode) && void 0 !== e && "A" !== (f = b.tagName.toUpperCase()) && "AREA" !== f;) b = e;
            if (void 0 !== b.href) {
                e = b.hostname || Tb(b.href);
                f = e.toLowerCase();
                var p = b.href.replace(e, f);
                /^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):/i.test(p) || (e = b.id, f = da(b), h = b.target, k = g ? b.innerHTML : null, p = unescape(p), a.trackLinkClick(p, e, f, h, k, c(mb(d, b))))
            }
        }

        function d(a) {
            return function(b) {
                b = b || window.event;
                var c = b.which || b.button;
                var d = b.target || b.srcElement;
                "click" ===
                b.type ? d && e(d, a) : "mousedown" === b.type ? 1 !== c && 2 !== c || !d ? p = v = null : (p = c, v = d) : "mouseup" === b.type && (c === p && d === v && e(d, a), p = v = null)
            }
        }
        var f, h, g, k, p, v;
        return {
            configureLinkClickTracking: function(a, b, c, d) {
                g = c;
                k = d;
                h = b;
                f = Hb(a, !0)
            },
            addClickListeners: function() {
                var a = document.links,
                    c;
                for (c = 0; c < a.length; c++)
                    if (f(a[c]) && !a[c][b]) {
                        var e = a[c];
                        h ? (q(e, "mouseup", d(k), !1), q(e, "mousedown", d(k), !1)) : q(e, "click", d(k), !1);
                        a[c][b] = !0
                    }
            }
        }
    }

    function Ad(a, b, c) {
        function e(a) {
            return a[Bd(["name", "id", "type", "nodeName"], function(b) {
                return a[b] &&
                    "string" === typeof a[b]
            })]
        }

        function d(a) {
            for (; a && a.nodeName && "HTML" !== a.nodeName.toUpperCase() && "FORM" !== a.nodeName.toUpperCase();) a = a.parentNode;
            if (a && a.nodeName && "FORM" === a.nodeName.toUpperCase()) return e(a)
        }

        function f(a) {
            var b = [];
            O(k, function(c) {
                c = Array.prototype.filter.call(a.getElementsByTagName(c), function(a) {
                    return a.hasOwnProperty(p)
                });
                O(c, function(a) {
                    if ("submit" !== a.type) {
                        var c = {
                            name: e(a),
                            value: a.value,
                            nodeName: a.nodeName
                        };
                        a.type && "INPUT" === a.nodeName.toUpperCase() && (c.type = a.type);
                        "checkbox" !==
                        a.type && "radio" !== a.type || a.checked || (c.value = null);
                        b.push(c)
                    }
                })
            });
            return b
        }

        function h(b, f) {
            return function(g) {
                g = g.target;
                var h = g.nodeName && "INPUT" === g.nodeName.toUpperCase() ? g.type : null,
                    k = "checkbox" !== g.type || g.checked ? m(g.value, g) : null;
                ("change_form" === b || "checkbox" !== h && "radio" !== h) && a.trackFormFocusOrChange(b, d(g), e(g), g.nodeName, h, da(g), k, c(mb(f, g, h, k)))
            }
        }

        function g(b) {
            return function(d) {
                d = d.target;
                var g = f(d);
                O(g, function(a) {
                    a.value = m(a.value, a)
                });
                a.trackFormSubmission(e(d), da(d), g, c(mb(b, d,
                    g)))
            }
        }
        var k = ["textarea", "input", "select"],
            p = b + "form",
            v = function() {
                return !0
            },
            M = function() {
                return !0
            },
            m = function(a) {
                return a
            };
        return {
            configureFormTracking: function(a) {
                a && (v = Hb(a.forms, !0), M = Hb(a.fields, !1), m = sd(a.fields))
            },
            addFormListeners: function(a) {
                O(document.getElementsByTagName("form"), function(b) {
                    v(b) && !b[p] && (O(k, function(c) {
                            O(b.getElementsByTagName(c), function(b) {
                                M(b) && !b[p] && "password" !== b.type.toLowerCase() && (q(b, "focus", h("focus_form", a), !1), q(b, "change", h("change_form", a), !1), b[p] = !0)
                            })
                        }),
                        q(b, "submit", g(a)), b[p] = !0)
                })
            }
        }
    }

    function Cd(a) {
        function b(b, e, d, f, h, g) {
            a.trackSelfDescribingEvent({
                schema: "iglu:com.snowplowanalytics.snowplow/application_error/jsonschema/1-0-1",
                data: {
                    programmingLanguage: "JAVASCRIPT",
                    message: b || "JS Exception. Browser doesn't support ErrorEvent API",
                    stackTrace: h && h.stack ? h.stack : null,
                    lineNumber: d,
                    lineColumn: f,
                    fileName: e
                }
            }, g)
        }
        return {
            trackError: b,
            enableErrorTracking: function(a, e, d) {
                q(Dd, "error", function(c) {
                    if (ob(a) && a(c) || null == a) {
                        var f = ob(e) ? d.concat(e(c)) : d;
                        b(c.message,
                            c.filename, c.lineno, c.colno, c.error, f)
                    }
                }, !0)
            }
        }
    }

    function Ed(a, b, c, e, d, f, h, g, k, p, v, M) {
        function m(a) {
            var b = "?",
                c = {
                    co: !0,
                    cx: !0
                },
                d = !0,
                e;
            for (e in a) a.hasOwnProperty(e) && !c.hasOwnProperty(e) && (d ? d = !1 : b += "&", b += encodeURIComponent(e) + "=" + encodeURIComponent(a[e]));
            for (var g in c) a.hasOwnProperty(g) && c.hasOwnProperty(g) && (b += "&" + g + "=" + encodeURIComponent(a[g]));
            return b
        }

        function r(a) {
            a = Fd(a, function(a) {
                return a.toString()
            });
            return {
                evt: a,
                bytes: N(JSON.stringify(a))
            }
        }

        function N(a) {
            for (var b = 0, c = 0; c < a.length; c++) {
                var d =
                    a.charCodeAt(c);
                127 >= d ? b += 1 : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, c++) : b = 65535 > d ? b + 3 : b + 4
            }
            return b
        }

        function C() {
            for (; E.length && "string" !== typeof E[0] && "object" !== D(E[0]);) E.shift();
            if (1 > E.length) q = !1;
            else {
                if (!qc(u)) throw "No collector configured";
                q = !0;
                var a = E[0];
                if (P) {
                    var b = function(a) {
                            for (var b = 0, c = 0; b < a.length && !(c += a[b].bytes, c >= g);) b += 1;
                            return b
                        },
                        c = function(a) {
                            for (var b = 0; b < a; b++) E.shift();
                            e && Ub(L, JSON.stringify(E.slice(0, p)));
                            C()
                        };
                    if (F) {
                        a = vc(a);
                        var d = n(a, !1);
                        var f = 1
                    } else a = u, d = n(a, !0), f = b(E);
                    var h =
                        setTimeout(function() {
                            d.abort();
                            q = !1
                        }, v);
                    d.onreadystatechange = function() {
                        if (4 === d.readyState && 200 <= d.status && 400 > d.status) {
                            clearTimeout(h);
                            if (x && !J) try {
                                wc.setItem(Q, !0)
                            } catch (uc) {}
                            c(f)
                        } else 4 === d.readyState && 400 <= d.status && (clearTimeout(h), q = !1)
                    };
                    if (F) d.send();
                    else if (b = E.slice(0, f), 0 < b.length) {
                        var k;
                        if (!(k = J) && (k = x)) try {
                            k = wc.getItem(Q)
                        } catch (uc) {
                            k = void 0
                        }
                        J = k;
                        b = ca(b, function(a) {
                            return a.evt
                        });
                        if (J) {
                            k = new Blob([Jb(w(b))], {
                                type: "application/json"
                            });
                            try {
                                var m = navigator.sendBeacon(a, k)
                            } catch (uc) {
                                m = !1
                            }
                        }!0 ===
                            m && c(f);
                        x && m || d.send(Jb(w(b)))
                    }
                } else if (M) q = !1;
                else {
                    m = new Image(1, 1);
                    var r = !0;
                    m.onload = function() {
                        r && (r = !1, E.shift(), e && Ub(L, JSON.stringify(E.slice(0, p))), C())
                    };
                    m.onerror = function() {
                        r && (q = r = !1)
                    };
                    m.src = vc(a);
                    setTimeout(function() {
                        r && q && (r = !1, C())
                    }, v)
                }
            }
        }

        function n(a, b) {
            var c = new XMLHttpRequest;
            b ? (c.open("POST", a, !0), c.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : c.open("GET", a, !0);
            c.withCredentials = !0;
            M && c.setRequestHeader("SP-Anonymous", "*");
            return c
        }

        function Jb(a) {
            return JSON.stringify({
                schema: "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4",
                data: a
            })
        }

        function w(a) {
            for (var b = (new Date).getTime().toString(), c = 0; c < a.length; c++) a[c].stm = b;
            return a
        }

        function vc(a) {
            return k ? u + a.replace("?", "?stm=" + (new Date).getTime() + "&") : u + a
        }
        var B = window.localStorage,
            q = !1,
            u, J;
        d = d.toLowerCase ? d.toLowerCase() : d;
        var O = null === d || !0 === d || "beacon" === d || "true" === d,
            x = !!(O && navigator && navigator.sendBeacon) && O,
            F = "get" === d,
            P = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
            I = !F && P && ("post" === d || O),
            U = I ? f : "/i";
        h = vd() && e && I && h || 1;
        var L = "snowplowOutQueue_".concat(a,
            "_").concat(b, "_").concat(I ? "post2" : "get");
        var Q = "spBeaconPreflight_".concat(a, "_").concat(b);
        if (e) try {
            var E = JSON.parse(B.getItem(L))
        } catch (df) {}
        Array.isArray(E) || (E = []);
        c.outQueues.push(E);
        P && 1 < h && c.bufferFlushers.push(function() {
            q || C()
        });
        return {
            enqueueRequest: function(a, b) {
                u = b + U;
                if (I) {
                    a = r(a);
                    if (a.bytes >= g) {
                        y("Event (" + a.bytes + "B) too big, max is " + g);
                        n(u, !0).send(Jb(w([a.evt])));
                        return
                    }
                    E.push(a)
                } else E.push(m(a));
                a = !1;
                e && (a = Ub(L, JSON.stringify(E.slice(0, p))));
                q || a && !(E.length >= h) || C()
            },
            executeQueue: function() {
                q ||
                    C()
            },
            setUseLocalStorage: function(a) {
                e = a
            },
            setAnonymousTracking: function(a) {
                M = a
            },
            setCollectorUrl: function(a) {
                u = a + U
            }
        }
    }

    function Gd(a) {
        var b = {};
        "object" === D(a) && null !== a && Object.getOwnPropertyNames(a).forEach(function(c, e, d) {
            "function" === typeof a[c] && (b[c] = Hd(a[c]))
        });
        return b
    }

    function Id(a) {
        if (!a) return a;
        switch (4 - a.length % 4) {
            case 2:
                a += "==";
                break;
            case 3:
                a += "="
        }
        a = a.replace(/-/g, "+").replace(/_/g, "/");
        return Jd(a)
    }

    function Jd(a) {
        var b = 0,
            c = 0;
        var e = "";
        var d = [];
        if (!a) return a;
        a += "";
        do {
            var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(b++));
            var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(b++));
            e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(b++));
            var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(b++));
            var k = f << 18 | h << 12 | e << 6 | g;
            f = k >> 16 & 255;
            h = k >> 8 & 255;
            k &= 255;
            64 === e ? d[c++] = String.fromCharCode(f) : 64 === g ? d[c++] = String.fromCharCode(f, h) : d[c++] = String.fromCharCode(f, h, k)
        } while (b < a.length);
        e = d.join("");
        return function(a) {
            return decodeURIComponent(a.split("").map(function(a) {
                return "%" +
                    ("00" + a.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        }(e.replace(/\0+$/, ""))
    }

    function Na(a) {
        if (!xc(a)) return !1;
        for (var b in a)
            if (Object.prototype.hasOwnProperty.call(a, b)) return !0;
        return !1
    }

    function xc(a) {
        return "undefined" !== typeof a && null !== a && (a.constructor === {}.constructor || a.constructor === [].constructor)
    }

    function za(a) {
        var b = {},
            c = function(a, c) {
                null != c && "" !== c && (b[a] = c)
            };
        return {
            add: c,
            addDict: function(a) {
                for (var b in a) Object.prototype.hasOwnProperty.call(a, b) && c(b, a[b])
            },
            addJson: function(b,
                d, f) {
                if (f && Na(f))
                    if (f = JSON.stringify(f), a) {
                        if (f) {
                            d = f;
                            var e = f = 0,
                                g = [];
                            if (d) {
                                d = unescape(encodeURIComponent(d));
                                do {
                                    var k = d.charCodeAt(f++);
                                    var p = d.charCodeAt(f++);
                                    var v = d.charCodeAt(f++);
                                    var M = k << 16 | p << 8 | v;
                                    k = M >> 18 & 63;
                                    p = M >> 12 & 63;
                                    v = M >> 6 & 63;
                                    M &= 63;
                                    g[e++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(p) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(v) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(M)
                                } while (f <
                                    d.length);
                                f = g.join("");
                                d = d.length % 3;
                                d = (d ? f.slice(0, d - 3) : f) + "===".slice(d || 3)
                            }
                            d = d.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
                        } else d = f;
                        c(b, d)
                    } else c(d, f)
            },
            build: function() {
                return b
            }
        }
    }

    function Kd() {
        var a = [],
            b = [];
        return {
            getGlobalPrimitives: function() {
                return a
            },
            getConditionalProviders: function() {
                return b
            },
            addGlobalContexts: function(c) {
                var e = [],
                    d = [];
                c = kb(c);
                var f;
                try {
                    for (c.s(); !(f = c.n()).done;) {
                        var h = f.value;
                        yc(h) ? e.push(h) : ea(h) && d.push(h)
                    }
                } catch (g) {
                    c.e(g)
                } finally {
                    c.f()
                }
                a = a.concat(d);
                b = b.concat(e)
            },
            clearGlobalContexts: function() {
                b = [];
                a = []
            },
            removeGlobalContexts: function(c) {
                c = kb(c);
                var e;
                try {
                    var d = function() {
                        var c = e.value;
                        yc(c) ? b = b.filter(function(a) {
                            return !rb(a, c)
                        }) : ea(c) && (a = a.filter(function(a) {
                            return !rb(a, c)
                        }))
                    };
                    for (c.s(); !(e = c.n()).done;) d()
                } catch (f) {
                    c.e(f)
                } finally {
                    c.f()
                }
            },
            getApplicableContexts: function(c) {
                c = c.build();
                var e = Na(c) && "e" in c ? "string" === typeof c.e : !1;
                if (e) {
                    c = nd({}, c);
                    try {
                        null != c && sb(c, "ue_px", Kb) && (c.ue_px = JSON.parse(Id(F(c, ["ue_px"]))));
                        var d = c
                    } catch (g) {
                        d = c
                    }
                    c = d;
                    e = "string" ===
                        typeof F(c, "ue_px.data.schema") ? F(c, "ue_px.data.schema") : "string" === typeof F(c, "ue_pr.data.schema") ? F(c, "ue_pr.data.schema") : "string" === typeof F(c, "schema") ? F(c, "schema") : "";
                    var f = F(c, "e", "");
                    d = [];
                    var h = tb(a, c, f, e);
                    d.push.apply(d, qa(h));
                    c = Ld(b, c, f, e);
                    d.push.apply(d, qa(c));
                    return d
                }
                return []
            }
        }
    }

    function Md(a) {
        if ("*" === a[0] || "*" === a[1]) return !1;
        if (0 < a.slice(2).length) {
            var b = !1;
            a = kb(a.slice(2));
            var c;
            try {
                for (a.s(); !(c = a.n()).done;)
                    if ("*" === c.value) b = !0;
                    else if (b) return !1
            } catch (e) {
                a.e(e)
            } finally {
                a.f()
            }
            return !0
        }
        return 2 ==
            a.length ? !0 : !1
    }

    function zc(a) {
        return (a = a.split(".")) && 1 < a.length ? Md(a) : !1
    }

    function Ac(a) {
        a = /^iglu:((?:(?:[a-zA-Z0-9-_]+|\*).)+(?:[a-zA-Z0-9-_]+|\*))\/([a-zA-Z0-9-_.]+|\*)\/jsonschema\/([1-9][0-9]*|\*)-(0|[1-9][0-9]*|\*)-(0|[1-9][0-9]*|\*)$/.exec(a);
        if (null !== a && zc(a[1])) return a.slice(1, 6)
    }

    function Oa(a) {
        if (a = Ac(a)) {
            var b = a[0];
            return 5 === a.length && zc(b)
        }
        return !1
    }

    function Nd(a) {
        return Array.isArray(a) && a.every(function(a) {
            return "string" === typeof a
        })
    }

    function Bc(a) {
        return Nd(a) ? a.every(function(a) {
                return Oa(a)
            }) :
            "string" === typeof a ? Oa(a) : !1
    }

    function Pa(a) {
        return Na(a) && "schema" in a && "data" in a ? "string" === typeof a.schema && "object" === D(a.data) : !1
    }

    function Od(a) {
        var b = 0;
        if (Q(a) && "[object Object]" == W(a)) {
            var c = Pd(a);
            null === c ? c = !0 : (c = Qd.call(c, "constructor") && c.constructor, c = "function" == typeof c && c instanceof c && Cc.call(c) == Rd)
        } else c = !1;
        if (c) {
            if (null != a && sb(a, "accept", Kb))
                if (Bc(a.accept)) b += 1;
                else return !1;
            if (null != a && sb(a, "reject", Kb))
                if (Bc(a.reject)) b += 1;
                else return !1;
            return 0 < b && 2 >= b
        }
        return !1
    }

    function Dc(a) {
        return "function" ===
            typeof a && 1 >= a.length
    }

    function ea(a) {
        return "function" === typeof a && 1 >= a.length || Pa(a)
    }

    function Ec(a) {
        return Array.isArray(a) && 2 === a.length ? Array.isArray(a[1]) ? Dc(a[0]) && Lb(a[1], ea) : Dc(a[0]) && ea(a[1]) : !1
    }

    function Fc(a) {
        return Array.isArray(a) && 2 === a.length ? Od(a[0]) ? Array.isArray(a[1]) ? Lb(a[1], ea) : ea(a[1]) : !1 : !1
    }

    function yc(a) {
        return Ec(a) || Fc(a)
    }

    function Sd(a, b) {
        var c = 0,
            e = 0,
            d = F(a, "accept");
        Array.isArray(d) ? a.accept.some(function(a) {
            return ub(a, b)
        }) && e++ : "string" === typeof d && ub(d, b) && e++;
        d = F(a, "reject");
        Array.isArray(d) ? a.reject.some(function(a) {
            return ub(a, b)
        }) && c++ : "string" === typeof d && ub(d, b) && c++;
        return 0 < e && 0 === c ? !0 : !1
    }

    function ub(a, b) {
        if (!Oa(a)) return !1;
        a = Ac(a);
        b = /^iglu:([a-zA-Z0-9-_.]+)\/([a-zA-Z0-9-_]+)\/jsonschema\/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$/.exec(b);
        b = null !== b ? b.slice(1, 6) : void 0;
        if (a && b) {
            if (!Td(a[0], b[0])) return !1;
            for (var c = 1; 5 > c; c++)
                if (!Gc(a[c], b[c])) return !1;
            return !0
        }
        return !1
    }

    function Td(a, b) {
        b = b.split(".");
        a = a.split(".");
        if (b && a) {
            if (b.length !== a.length) return !1;
            for (var c = 0; c < a.length; c++)
                if (!Gc(b[c], a[c])) return !1;
            return !0
        }
        return !1
    }

    function Gc(a, b) {
        return a && b && "*" === a || a === b
    }

    function Hc(a) {
        return Array.isArray(a) ? a : [a]
    }

    function tb(a, b, c, e) {
        var d;
        a = Hc(a);
        a = ca(a, function(a) {
            a: if (Pa(a)) a = [a];
                else {
                    if ("function" === typeof a && 1 >= a.length) {
                        b: {
                            var d = void 0;
                            try {
                                d = a({
                                    event: b,
                                    eventType: c,
                                    eventSchema: e
                                });
                                if (Pa(d) || Array.isArray(d) && Lb(d, Pa)) {
                                    var g = d;
                                    break b
                                }
                                g = void 0;
                                break b
                            } catch (k) {}
                            g = void 0
                        }
                        if (Pa(g)) {
                            a = [g];
                            break a
                        } else if (Array.isArray(g)) {
                            a = g;
                            break a
                        }
                    }
                    a = void 0
                }if (a &&
                0 !== a.length) return a
        });
        return (d = []).concat.apply(d, qa(Ic(a)))
    }

    function Ld(a, b, c, e) {
        var d;
        a = Hc(a);
        a = ca(a, function(a) {
            a: {
                if (Ec(a)) {
                    var d = a[0],
                        g = !1;
                    try {
                        g = d({
                            event: b,
                            eventType: c,
                            eventSchema: e
                        })
                    } catch (k) {
                        g = !1
                    }
                    if (!0 === g) {
                        a = tb(a[1], b, c, e);
                        break a
                    }
                } else if (Fc(a) && Sd(a[0], e)) {
                    a = tb(a[1], b, c, e);
                    break a
                }
                a = []
            }
            if (a && 0 !== a.length) return a
        });
        return (d = []).concat.apply(d, qa(Ic(a)))
    }

    function Ud(a, b) {
        var c = Kd(),
            e = {};
        "undefined" === typeof a && (a = !0);
        var d = function(a, b) {
                var c = {};
                b = b || {};
                for (var d in a)
                    if (b[d] || null !== a[d] &&
                        "undefined" !== typeof a[d]) c[d] = a[d];
                return c
            },
            f = function(a, d, f, h) {
                a.addDict(e);
                a.add("eid", Vd.v4());
                f = null == f ? {
                    type: "dtm",
                    value: (new Date).getTime()
                } : "number" === typeof f ? {
                    type: "dtm",
                    value: f
                } : "ttm" === f.type ? {
                    type: "ttm",
                    value: f.value
                } : {
                    type: "dtm",
                    value: f.value || (new Date).getTime()
                };
                a.add(f.type, f.value.toString());
                f = c.getApplicableContexts(a);
                var g = [];
                d && d.length && g.push.apply(g, qa(d));
                f && f.length && g.push.apply(g, qa(f));
                d = g && g.length ? {
                    schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                    data: g
                } : void 0;
                void 0 !== d && a.addJson("cx", "co", d);
                "function" === typeof b && b(a);
                try {
                    h && h(a.build())
                } catch (m) {
                    console.warn("Snowplow: error running custom callback")
                }
                return a
            },
            h = function(b, c, d, e) {
                var g = za(a);
                b = {
                    schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
                    data: b
                };
                g.add("e", "ue");
                g.addJson("ue_px", "ue_pr", b);
                return f(g, c, d, e)
            };
        return {
            addPayloadPair: function(a, b) {
                e[a] = b
            },
            setBase64Encoding: function(b) {
                a = b
            },
            addPayloadDict: function(a) {
                for (var b in a) Object.prototype.hasOwnProperty.call(a,
                    b) && (e[b] = a[b])
            },
            resetPayloadPairs: function(a) {
                e = xc(a) ? a : {}
            },
            setTrackerVersion: function(a) {
                e.tv = a
            },
            setTrackerNamespace: function(a) {
                e.tna = a
            },
            setAppId: function(a) {
                e.aid = a
            },
            setPlatform: function(a) {
                e.p = a
            },
            setUserId: function(a) {
                e.uid = a
            },
            setScreenResolution: function(a, b) {
                e.res = a + "x" + b
            },
            setViewport: function(a, b) {
                e.vp = a + "x" + b
            },
            setColorDepth: function(a) {
                e.cd = a
            },
            setTimezone: function(a) {
                e.tz = a
            },
            setLang: function(a) {
                e.lang = a
            },
            setIpAddress: function(a) {
                e.ip = a
            },
            setUseragent: function(a) {
                e.ua = a
            },
            trackUnstructEvent: h,
            trackSelfDescribingEvent: h,
            trackPageView: function(b, c, d, e, h, m) {
                var g = za(a);
                g.add("e", "pv");
                g.add("url", b);
                g.add("page", c);
                g.add("refr", d);
                return f(g, e, h, m)
            },
            trackPagePing: function(b, c, d, e, h, m, r, N, C, n) {
                var g = za(a);
                g.add("e", "pp");
                g.add("url", b);
                g.add("page", c);
                g.add("refr", d);
                g.add("pp_mix", e.toString());
                g.add("pp_max", h.toString());
                g.add("pp_miy", m.toString());
                g.add("pp_may", r.toString());
                return f(g, N, C, n)
            },
            trackStructEvent: function(b, c, d, e, h, m, r, N) {
                var g = za(a);
                g.add("e", "se");
                g.add("se_ca", b);
                g.add("se_ac",
                    c);
                g.add("se_la", d);
                g.add("se_pr", e);
                g.add("se_va", null == h ? void 0 : h.toString());
                return f(g, m, r, N)
            },
            trackEcommerceTransaction: function(b, c, d, e, h, m, r, N, C, n, Jb, w) {
                var g = za(a);
                g.add("e", "tr");
                g.add("tr_id", b);
                g.add("tr_af", c);
                g.add("tr_tt", d);
                g.add("tr_tx", e);
                g.add("tr_sh", h);
                g.add("tr_ci", m);
                g.add("tr_st", r);
                g.add("tr_co", N);
                g.add("tr_cu", C);
                return f(g, n, Jb, w)
            },
            trackEcommerceTransactionItem: function(b, c, d, e, h, m, r, N, C, n) {
                var g = za(a);
                g.add("e", "ti");
                g.add("ti_id", b);
                g.add("ti_sk", c);
                g.add("ti_nm", d);
                g.add("ti_ca",
                    e);
                g.add("ti_pr", h);
                g.add("ti_qu", m);
                g.add("ti_cu", r);
                return f(g, N, C, n)
            },
            trackScreenView: function(a, b, c, e, f) {
                return h({
                    schema: "iglu:com.snowplowanalytics.snowplow/screen_view/jsonschema/1-0-0",
                    data: d({
                        name: a,
                        id: b
                    })
                }, c, e, f)
            },
            trackLinkClick: function(a, b, c, e, f, m, r, N) {
                a = {
                    schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
                    data: d({
                        targetUrl: a,
                        elementId: b,
                        elementClasses: c,
                        elementTarget: e,
                        elementContent: f
                    })
                };
                return h(a, m, r, N)
            },
            trackAdImpression: function(a, b, c, e, f, m, r, N, n, q, u) {
                a = {
                    schema: "iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0",
                    data: d({
                        impressionId: a,
                        costModel: b,
                        cost: c,
                        targetUrl: e,
                        bannerId: f,
                        zoneId: m,
                        advertiserId: r,
                        campaignId: N
                    })
                };
                return h(a, n, q, u)
            },
            trackAdClick: function(a, b, c, e, f, m, r, n, C, q, u, w) {
                a = {
                    schema: "iglu:com.snowplowanalytics.snowplow/ad_click/jsonschema/1-0-0",
                    data: d({
                        targetUrl: a,
                        clickId: b,
                        costModel: c,
                        cost: e,
                        bannerId: f,
                        zoneId: m,
                        impressionId: r,
                        advertiserId: n,
                        campaignId: C
                    })
                };
                return h(a, q, u, w)
            },
            trackAdConversion: function(a, b, c, e, f, m, r, n, C, q, u, w) {
                a = {
                    schema: "iglu:com.snowplowanalytics.snowplow/ad_conversion/jsonschema/1-0-0",
                    data: d({
                        conversionId: a,
                        costModel: b,
                        cost: c,
                        category: e,
                        action: f,
                        property: m,
                        initialValue: r,
                        advertiserId: n,
                        campaignId: C
                    })
                };
                return h(a, q, u, w)
            },
            trackSocialInteraction: function(a, b, c, e, f, m) {
                a = {
                    schema: "iglu:com.snowplowanalytics.snowplow/social_interaction/jsonschema/1-0-0",
                    data: d({
                        action: a,
                        network: b,
                        target: c
                    })
                };
                return h(a, e, f, m)
            },
            trackAddToCart: function(a, b, c, e, f, m, r, n, q) {
                return h({
                    schema: "iglu:com.snowplowanalytics.snowplow/add_to_cart/jsonschema/1-0-0",
                    data: d({
                        sku: a,
                        name: b,
                        category: c,
                        unitPrice: e,
                        quantity: f,
                        currency: m
                    })
                }, r, n, q)
            },
            trackRemoveFromCart: function(a, b, c, e, f, m, r, n, q) {
                return h({
                    schema: "iglu:com.snowplowanalytics.snowplow/remove_from_cart/jsonschema/1-0-0",
                    data: d({
                        sku: a,
                        name: b,
                        category: c,
                        unitPrice: e,
                        quantity: f,
                        currency: m
                    })
                }, r, n, q)
            },
            trackFormFocusOrChange: function(a, b, c, e, f, m, r, n, q, u) {
                var g = "";
                b = {
                    formId: b,
                    elementId: c,
                    nodeName: e,
                    elementClasses: m,
                    value: r
                };
                "change_form" === a ? (g = "iglu:com.snowplowanalytics.snowplow/change_form/jsonschema/1-0-0", b.type = f) : "focus_form" === a && (g = "iglu:com.snowplowanalytics.snowplow/focus_form/jsonschema/1-0-0",
                    b.elementType = f);
                return h({
                    schema: g,
                    data: d(b, {
                        value: !0
                    })
                }, n, q, u)
            },
            trackFormSubmission: function(a, b, c, e, f, m) {
                return h({
                    schema: "iglu:com.snowplowanalytics.snowplow/submit_form/jsonschema/1-0-0",
                    data: d({
                        formId: a,
                        formClasses: b,
                        elements: c
                    })
                }, e, f, m)
            },
            trackSiteSearch: function(a, b, c, e, f, m, r) {
                return h({
                    schema: "iglu:com.snowplowanalytics.snowplow/site_search/jsonschema/1-0-0",
                    data: d({
                        terms: a,
                        filters: b,
                        totalResults: c,
                        pageResults: e
                    })
                }, f, m, r)
            },
            trackConsentWithdrawn: function(a, b, c, e, f, m, r, n) {
                b = {
                    schema: "iglu:com.snowplowanalytics.snowplow/consent_document/jsonschema/1-0-0",
                    data: d({
                        id: b,
                        version: c,
                        name: e,
                        description: f
                    })
                };
                return h({
                    schema: "iglu:com.snowplowanalytics.snowplow/consent_withdrawn/jsonschema/1-0-0",
                    data: d({
                        all: a
                    })
                }, b.data && m ? m.concat([b]) : m, r, n)
            },
            trackConsentGranted: function(a, b, c, e, f, m, r, n) {
                a = {
                    schema: "iglu:com.snowplowanalytics.snowplow/consent_document/jsonschema/1-0-0",
                    data: d({
                        id: a,
                        version: b,
                        name: c,
                        description: e
                    })
                };
                return h({
                    schema: "iglu:com.snowplowanalytics.snowplow/consent_granted/jsonschema/1-0-0",
                    data: d({
                        expiry: f
                    })
                }, m ? m.concat([a]) : [a], r, n)
            },
            addGlobalContexts: function(a) {
                c.addGlobalContexts(a)
            },
            clearGlobalContexts: function() {
                c.clearGlobalContexts()
            },
            removeGlobalContexts: function(a) {
                c.removeGlobalContexts(a)
            }
        }
    }

    function Qa(a, b, c, e, d) {
        function f(a) {
            return -1 < Sb.map(function(a) {
                return a.toLowerCase()
            }).indexOf(a.toLowerCase())
        }

        function h() {
            Ra = tc(z.domain, A.location.href, dc());
            Ra[1] !== Aa && (Mb = dc(Aa));
            Ma = cc(Ra[0]);
            Aa = Ra[1]
        }

        function g() {
            var a = (new Date).getTime();
            if (this.href) {
                a = "_sp=" + (Nb + "." + a);
                var b = this.href.split("#"),
                    c = b[0].split("?"),
                    d = c.shift();
                if (c = c.join("?")) {
                    for (var e = !0, f = c.split("&"),
                            g = 0; g < f.length; g++)
                        if ("_sp=" === f[g].substr(0, 4)) {
                            e = !1;
                            f[g] = a;
                            c = f.join("&");
                            break
                        }
                    e && (c = a + "&" + c)
                } else c = a;
                b[0] = d + "?" + c;
                this.href = b.join("#")
            }
        }

        function k(a) {
            for (var b = 0; b < z.links.length; b++) {
                var c = z.links[b];
                !c.spDecorationEnabled && a(c) && (q(c, "click", g, !0), q(c, "mousedown", g, !0), c.spDecorationEnabled = !0)
            }
        }

        function p(a) {
            if (Qa) {
                var b = /#.*/;
                a = a.replace(b, "")
            }
            Wa && (b = /[{}]/g, a = a.replace(b, ""));
            return a
        }

        function v(a) {
            return (a = /^([a-z]+):/.exec(a)) ? a[1] : null
        }

        function n(a) {
            a = Sa + a + "." + Ta;
            if ("localStorage" == G) {
                a: {
                    try {
                        var b =
                            xa.getItem(a + ".expires");
                        if (null === b || +b > Date.now()) {
                            var c = xa.getItem(a);
                            break a
                        } else xa.removeItem(a), xa.removeItem(a + ".expires");
                        c = void 0;
                        break a
                    } catch (ef) {}
                    c = void 0
                }
                return c
            }
            if ("cookie" == G || "cookieAndLocalStorage" == G) return J(a)
        }

        function m() {
            h();
            Ta = Lb((vb || Ma) + (Ea || "/")).slice(0, 4)
        }

        function r() {
            Vb = (new Date).getTime()
        }

        function u() {
            var a = C(),
                b = a[0];
            b < Wb ? Wb = b : b > Xb && (Xb = b);
            a = a[1];
            a < Yb ? Yb = a : a > Zb && (Zb = a);
            r()
        }

        function C() {
            var a = z.compatMode && "BackCompat" !== z.compatMode ? z.documentElement : z.body;
            return [a.scrollLeft ||
                A.pageXOffset, a.scrollTop || A.pageYOffset
            ]
        }

        function B() {
            var a = C(),
                b = a[0];
            Xb = Wb = b;
            Zb = Yb = a = a[1]
        }

        function D(a) {
            a = Math.round(a);
            if (!isNaN(a)) return a
        }

        function w() {
            I(Sa + "ses." + Ta, "*", Ja)
        }

        function F(a, b, c, d, e, f) {
            I(Sa + "id." + Ta, a + "." + b + "." + c + "." + d + "." + e + "." + f, kb)
        }

        function I(a, b, c) {
            if (!fa || Ua) "localStorage" == G ? Ub(a, b, c) : ("cookie" == G || "cookieAndLocalStorage" == G) && J(a, b, c, Ea, vb, ja, oa)
        }

        function L() {
            var a = Sa + "id." + Ta,
                b = Sa + "ses." + Ta;
            rc(a);
            rc(b);
            J(a, "", -1, "/", vb, ja, oa);
            J(b, "", -1, "/", vb, ja, oa)
        }

        function Q() {
            if (!fa ||
                Ua) {
                var a = "none" != G && !!n("ses"),
                    b = R();
                b[1] ? Nb = b[1] : (Nb = fa ? "" : P(), b[1] = Nb);
                T = b[6];
                a || (b[3]++, T = P(), b[6] = T, b[5] = b[4]);
                "none" != G && (w(), b[4] = Math.round((new Date).getTime() / 1E3), b.shift(), F.apply(null, b))
            }
        }

        function R() {
            if ("none" == G) return [];
            var a = Math.round((new Date).getTime() / 1E3),
                b = n("id");
            b ? (a = b.split("."), a.unshift("0")) : a = ["1", Nb, a, 0, a, ""];
            a[6] || (a[6] = P());
            return a
        }

        function W(a) {
            return mb ? "https://" + a : Hb ? "http://" + a : ("https:" === z.location.protocol ? "https" : "http") + "://" + a
        }

        function x(a) {
            var b = ib.concat(a || []);
            H.webPage && b.push({
                schema: "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
                data: {
                    id: V()
                }
            });
            H.performanceTiming && (a = ba()) && b.push(a);
            if (A.optimizely) {
                H.optimizelySummary && (a = ua(), O(a, function(a) {
                    b.push(a)
                }));
                H.optimizelyXSummary && (a = ya(), O(a, function(a) {
                    b.push(a)
                }));
                if (H.optimizelyExperiments) {
                    var c = la();
                    for (a = 0; a < c.length; a++) b.push(c[a])
                }
                if (H.optimizelyStates)
                    for (c = pa(), a = 0; a < c.length; a++) b.push(c[a]);
                if (H.optimizelyVariations)
                    for (c = qa(), a = 0; a < c.length; a++) b.push(c[a]);
                H.optimizelyVisitor &&
                    (a = ra()) && b.push(a);
                if (H.optimizelyAudiences)
                    for (c = sa(), a = 0; a < c.length; a++) b.push(c[a]);
                if (H.optimizelyDimensions)
                    for (c = ta(), a = 0; a < c.length; a++) b.push(c[a])
            }
            H.parrable && (a = za()) && b.push(a);
            H.gdprBasis && Va.gdprBasis && (a = Va.gdprBasis ? {
                schema: "iglu:com.snowplowanalytics.snowplow/gdpr/jsonschema/1-0-0",
                data: {
                    basisForProcessing: Va.gdprBasis,
                    documentId: Va.gdprDocId || null,
                    documentVersion: Va.gdprDocVer || null,
                    documentDescription: Va.gdprDocDesc || null
                }
            } : void 0, a && b.push(a));
            H.clientHints && Ba && b.push({
                schema: "iglu:org.ietf/http_client_hints/jsonschema/1-0-0",
                data: Ba
            });
            return b
        }

        function Y() {
            Db && null != e.pageViewId || (e.pageViewId = P())
        }

        function V() {
            null == e.pageViewId && (e.pageViewId = P());
            return e.pageViewId
        }

        function ba() {
            var a = "navigationStart redirectStart redirectEnd fetchStart domainLookupStart domainLookupEnd connectStart secureConnectionStart connectEnd requestStart responseStart responseEnd unloadEventStart unloadEventEnd domLoading domInteractive domContentLoadedEventStart domContentLoadedEventEnd domComplete loadEventStart loadEventEnd msFirstPaint chromeFirstPaint requestEnd proxyStart proxyEnd".split(" "),
                b = A.performance || A.mozPerformance || A.msPerformance || A.webkitPerformance;
            if (b) {
                var c = {},
                    d;
                for (d in b.timing) sc(d, a) && null !== b.timing[d] && (c[d] = b.timing[d]);
                delete c.requestEnd;
                return {
                    schema: "iglu:org.w3/PerformanceTiming/jsonschema/1-0-0",
                    data: c
                }
            }
        }

        function U(a, b) {
            if (A.optimizely && A.optimizely.data) {
                var c = A.optimizely.data[a];
                "undefined" !== typeof b && void 0 !== c && (c = c[b])
            }
            return c
        }

        function Z(a, b) {
            if (A.optimizely && "function" === typeof A.optimizely.get) {
                var c = A.optimizely.get(a);
                "undefined" !== typeof b &&
                    void 0 !== c && (c = c[b])
            }
            return c
        }

        function ka() {
            var a = U("state"),
                b = U("experiments");
            return ca(a && b && a.activeExperiments, function(c) {
                var d = b[c];
                return {
                    activeExperimentId: c.toString(),
                    variation: a.variationIdsMap[c][0].toString(),
                    conditional: d && d.conditional,
                    manual: d && d.manual,
                    name: d && d.name
                }
            })
        }

        function E() {
            var a = Z("state"),
                b = a && a.getActiveExperimentIds(),
                c = a && a.getVariationMap(),
                d = Z("visitor");
            return ca(b, function(a) {
                var b = c[a],
                    e = b && b.name && b.name.toString() || null;
                b = b && b.id;
                var f = d && d.visitorId && d.visitorId.toString() ||
                    null;
                return {
                    experimentId: nb(a) || null,
                    variationName: e,
                    variation: nb(b) || null,
                    visitorId: f
                }
            })
        }

        function la() {
            var a = U("experiments");
            if (a) {
                var b = [],
                    c;
                for (c in a)
                    if (a.hasOwnProperty(c)) {
                        var d = {};
                        d.id = c;
                        var e = a[c];
                        d.code = e.code;
                        d.manual = e.manual;
                        d.conditional = e.conditional;
                        d.name = e.name;
                        d.variationIds = e.variation_ids;
                        b.push({
                            schema: "iglu:com.optimizely/experiment/jsonschema/1-0-0",
                            data: d
                        })
                    }
                return b
            }
            return []
        }

        function pa() {
            var a = [],
                b = U("experiments");
            if (b)
                for (var c in b) b.hasOwnProperty(c) && a.push(c);
            if (b =
                U("state")) {
                c = [];
                for (var d = b.activeExperiments || [], e = 0; e < a.length; e++) {
                    var f = a[e],
                        g = {};
                    g.experimentId = f;
                    g.isActive = sc(a[e], d);
                    g.variationIndex = (b.variationMap || {})[f];
                    g.variationName = (b.variationNamesMap || {})[f];
                    var h = b.variationIdsMap || {};
                    h[f] && 1 === h[f].length && (g.variationId = h[f][0]);
                    c.push({
                        schema: "iglu:com.optimizely/state/jsonschema/1-0-0",
                        data: g
                    })
                }
                return c
            }
            return []
        }

        function qa() {
            var a = U("variations");
            if (a) {
                var b = [],
                    c;
                for (c in a)
                    if (a.hasOwnProperty(c)) {
                        var d = {};
                        d.id = c;
                        var e = a[c];
                        d.name = e.name;
                        d.code = e.code;
                        b.push({
                            schema: "iglu:com.optimizely/variation/jsonschema/1-0-0",
                            data: d
                        })
                    }
                return b
            }
            return []
        }

        function ra() {
            var a = U("visitor");
            if (a) {
                var b = {};
                b.browser = a.browser;
                b.browserVersion = a.browserVersion;
                b.device = a.device;
                b.deviceType = a.deviceType;
                b.ip = a.ip;
                var c = a.platform || {};
                b.platformId = c.id;
                b.platformVersion = c.version;
                c = a.location || {};
                b.locationCity = c.city;
                b.locationRegion = c.region;
                b.locationCountry = c.country;
                b.mobile = a.mobile;
                b.mobileId = a.mobileId;
                b.referrer = a.referrer;
                b.os = a.os;
                return {
                    schema: "iglu:com.optimizely/visitor/jsonschema/1-0-0",
                    data: b
                }
            }
        }

        function sa() {
            var a = U("visitor", "audiences");
            if (a) {
                var b = [],
                    c;
                for (c in a) a.hasOwnProperty(c) && b.push({
                    schema: "iglu:com.optimizely/visitor_audience/jsonschema/1-0-0",
                    data: {
                        id: c,
                        isMember: a[c]
                    }
                });
                return b
            }
            return []
        }

        function ta() {
            var a = U("visitor", "dimensions");
            if (a) {
                var b = [],
                    c;
                for (c in a) a.hasOwnProperty(c) && b.push({
                    schema: "iglu:com.optimizely/visitor_dimension/jsonschema/1-0-0",
                    data: {
                        id: c,
                        value: a[c]
                    }
                });
                return b
            }
            return []
        }

        function ua() {
            return ca(ka(), function(a) {
                return {
                    schema: "iglu:com.optimizely.snowplow/optimizely_summary/jsonschema/1-0-0",
                    data: a
                }
            })
        }

        function ya() {
            return ca(E(), function(a) {
                return {
                    schema: "iglu:com.optimizely.optimizelyx/summary/jsonschema/1-0-0",
                    data: a
                }
            })
        }

        function za() {
            var a = window._hawk;
            if (a) {
                var b = {
                    encryptedId: null,
                    optout: null
                };
                b.encryptedId = a.browserid;
                a = new RegExp("(?:^|;)\\s?" + "_parrable_hawk_optout".replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=(.*?)(?:;|$)", "i");
                a = document.cookie.match(a);
                b.optout = a && decodeURIComponent(a[1]) ? a && decodeURIComponent(a[1]) : "false";
                return {
                    schema: "iglu:com.parrable/encrypted_payload/jsonschema/1-0-0",
                    data: b
                }
            }
        }

        function ea() {
            !Cb && S.geolocation && S.geolocation.getCurrentPosition && (Cb = !0, S.geolocation.getCurrentPosition(function(a) {
                var b = a.coords;
                ib.push({
                    schema: "iglu:com.snowplowanalytics.snowplow/geolocation_context/jsonschema/1-1-0",
                    data: {
                        latitude: b.latitude,
                        longitude: b.longitude,
                        latitudeLongitudeAccuracy: b.accuracy,
                        altitude: b.altitude,
                        altitudeAccuracy: b.altitudeAccuracy,
                        bearing: b.heading,
                        speed: b.speed,
                        timestamp: Math.round(a.timestamp)
                    }
                })
            }))
        }

        function Fa() {
            var a = {};
            O("__utma __utmb __utmc __utmv __utmz _ga".split(" "),
                function(b) {
                    var c = J(b);
                    c && (a[b] = c)
                });
            return {
                schema: "iglu:com.google.analytics/cookies/jsonschema/1-0-0",
                data: a
            }
        }

        function Ia(a, b, c, d, e) {
            h();
            Eb && Y();
            Eb = !0;
            wb = z.title;
            Ob = a;
            a = pc(Ob || wb);
            t.trackPageView(p(xb || Aa), a, p(da || Mb), x((b || []).concat(c ? c() : [])), d, e);
            d = new Date;
            e = !1;
            if (X.enabled && !X.installed) {
                e = X.installed = !0;
                var f = {
                    update: function() {
                        if ("undefined" !== typeof window && "function" === typeof window.addEventListener) {
                            var a = !1,
                                b = Object.defineProperty({}, "passive", {
                                    get: function() {
                                        a = !0
                                    }
                                }),
                                c = function() {};
                            window.addEventListener("testPassiveEventSupport", c, b);
                            window.removeEventListener("testPassiveEventSupport", c, b);
                            f.hasSupport = a
                        }
                    }
                };
                f.update();
                a = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                Object.prototype.hasOwnProperty.call(f, "hasSupport") ? q(z, a, r, {
                    passive: !0
                }) : q(z, a, r);
                B();
                a = function(a) {
                    var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : r;
                    return function(a) {
                        return q(z, a, b)
                    }
                };
                O("click mouseup mousedown mousemove keypress keydown keyup".split(" "),
                    a(z));
                O(["resize", "focus", "blur"], a(A));
                a(A, u)("scroll")
            }
            if (X.enabled && (ub || e)) {
                Vb = d.getTime();
                for (var g in X.configurations) X.configurations.hasOwnProperty(g) && (d = X.configurations[g], clearInterval(d.activityInterval), La(d, b, c))
            }
        }

        function La(a, b, c) {
            var d = function(a, b) {
                    h();
                    a({
                        context: b,
                        pageViewId: V(),
                        minXOffset: Wb,
                        minYOffset: Yb,
                        maxXOffset: Xb,
                        maxYOffset: Zb
                    });
                    B()
                },
                e = function() {
                    Vb + a.configHeartBeatTimer > (new Date).getTime() && d(a.callback, (b || []).concat(c ? c() : []))
                };
            a.activityInterval = 0 != a.configMinimumVisitLength ?
                setTimeout(function() {
                    Vb + a.configMinimumVisitLength > (new Date).getTime() && d(a.callback, (b || []).concat(c ? c() : []));
                    a.activityInterval = setInterval(e, a.configHeartBeatTimer)
                }, a.configMinimumVisitLength) : setInterval(e, a.configHeartBeatTimer)
        }

        function wa(a, b, c) {
            if ("number" == typeof a && a == ec(a) && "number" == typeof b && b == ec(b)) return {
                configMinimumVisitLength: 1E3 * a,
                configHeartBeatTimer: 1E3 * b,
                activityInterval: null,
                callback: c
            };
            y("Activity tracking not enabled, please provide integer values for minimumVisitLength and heartBeatDelay.");
            return {}
        }

        function Pa(a) {
            var b = a.context,
                c = a.minXOffset,
                d = a.minYOffset,
                e = a.maxXOffset;
            a = a.maxYOffset;
            var f = z.title;
            f !== wb && (wb = f, Ob = null);
            t.trackPagePing(p(xb || Aa), pc(Ob || wb), p(da || Mb), D(c), D(e), D(d), D(a), x(b))
        }

        function ia(a, b) {
            return "" !== a ? a + b.charAt(0).toUpperCase() + b.slice(1) : b
        }

        function K(a) {
            var b, c, d = ["", "webkit", "ms", "moz"];
            if (!jb)
                for (c = 0; c < d.length; c++) {
                    var e = d[c];
                    if (z[ia(e, "hidden")]) {
                        "prerender" === z[ia(e, "visibilityState")] && (b = !0);
                        break
                    } else if (!1 === z[ia(e, "hidden")]) break
                }
            b ? q(z, e + "visibilitychange",
                function Xd() {
                    z.removeEventListener(e + "visibilitychange", Xd, !1);
                    a()
                }) : a()
        }
        d = d || {};
        d.hasOwnProperty("post") ? d.eventMethod = !0 === d.post ? "post" : "get" : d.eventMethod = d.eventMethod || "post";
        d.hasOwnProperty("useStm") || (d.useStm = !0);
        var Da = function(a) {
                return a.hasOwnProperty("stateStorageStrategy") ? a.stateStorageStrategy : Na || qb ? Na && qb ? "cookieAndLocalStorage" : Na ? "cookie" : "localStorage" : "none"
            },
            ma = function(a) {
                return a.hasOwnProperty("anonymousTracking") ? !0 === a.anonymousTracking.withSessionTracking : !1
            },
            na = function(a) {
                return a.hasOwnProperty("anonymousTracking") ?
                    !0 === a.anonymousTracking.withServerAnonymisation : !1
            },
            lb = Object.freeze({
                consent: "consent",
                contract: "contract",
                legalObligation: "legal_obligation",
                vitalInterests: "vital_interests",
                publicTask: "public_task",
                legitimateInterests: "legitimate_interests"
            }),
            t = Ud(!0, function(a) {
                var b = Math.round((new Date).getTime() / 1E3),
                    c = n("ses"),
                    d = R(),
                    f = d[0],
                    g = d[1],
                    Wd = d[2],
                    k = d[3],
                    l = d[4],
                    m = d[5];
                d = d[6];
                var v = Pb ? !!J(Pb) : !1;
                Ga || v ? L() : ("0" === f ? (T = d, c || "none" == G || (k++, m = l, T = P()), ha = k) : (new Date).getTime() - Oa > 1E3 * Ja && (T = P(), ha++),
                    a.add("vp", wd()), a.add("ds", xd()), a.add("vid", Ua ? ha : fa ? null : ha), a.add("sid", Ua ? T : fa ? null : T), a.add("duid", fa ? null : g), a.add("uid", fa ? null : yb), h(), a.add("refr", p(da || Mb)), a.add("url", p(xb || Aa)), "none" != G && (F(g, Wd, ha, b, m, T), w()), Oa = (new Date).getTime());
                b = sb;
                c = new Date;
                f = Pb ? !!J(Pb) : !1;
                Ga || f || (Ca.enqueueRequest(a.build(), Qb), e.expireDateTime = c.getTime() + b)
            }),
            Ha = !1,
            l = {},
            va = {},
            Ka = {},
            z = document,
            A = window,
            S = navigator,
            Ra = tc(z.domain, A.location.href, dc()),
            Ma = cc(Ra[0]),
            Aa = Ra[1],
            Mb = Ra[2],
            da, ob = d.hasOwnProperty("platform") ?
            d.platform : "web",
            Qb, pb = d.hasOwnProperty("postPath") ? d.postPath : "/com.snowplowanalytics.snowplow/tp2",
            rb = d.hasOwnProperty("appId") ? d.appId : "",
            xb, wb = z.title,
            Ob, sb = d.hasOwnProperty("pageUnloadTimer") ? d.pageUnloadTimer : 500,
            ub = d.hasOwnProperty("resetActivityTrackingOnPageView") ? d.resetActivityTrackingOnPageView : !0,
            Qa, Wa, Sa = d.hasOwnProperty("cookieName") ? d.cookieName : "_sp_",
            vb = d.hasOwnProperty("cookieDomain") ? d.cookieDomain : null,
            Ea = "/",
            ja = d.hasOwnProperty("cookieSameSite") ? d.cookieSameSite : "None",
            oa = d.hasOwnProperty("cookieSecure") ?
            d.cookieSecure : !0,
            gb = S.doNotTrack || S.msDoNotTrack || A.doNotTrack,
            Ga = d.hasOwnProperty("respectDoNotTrack") ? d.respectDoNotTrack && ("yes" === gb || "1" === gb) : !1,
            Pb, jb, kb = d.hasOwnProperty("cookieLifetime") ? d.cookieLifetime : 63072E3,
            Ja = d.hasOwnProperty("sessionCookieTimeout") ? d.sessionCookieTimeout : 1800,
            Fb = z.characterSet || z.charset,
            mb = d.hasOwnProperty("forceSecureTracker") ? !0 === d.forceSecureTracker : !1,
            Hb = !mb && d.hasOwnProperty("forceUnsecureTracker") ? !0 === d.forceUnsecureTracker : !1,
            Ua = ma(d),
            Rb = na(d),
            fa = !!d.anonymousTracking,
            qb = d.hasOwnProperty("useLocalStorage") ? (y("argmap.useLocalStorage is deprecated. Use argmap.stateStorageStrategy instead."), d.useLocalStorage) : !0,
            Na = d.hasOwnProperty("useCookies") ? (y("argmap.useCookies is deprecated. Use argmap.stateStorageStrategy instead."), d.useCookies) : !0,
            G = Da(d),
            Kb = S.userLanguage || S.language,
            $b = yd(),
            tb = a + "_" + b,
            Vb, Oa = (new Date).getTime(),
            Wb, Xb, Yb, Zb, Lb = Yd,
            Ta, Nb, T, ha = 1,
            yb, Xa, Ya, Za, $a, ab, bb, cb, db, eb, fb, hb, ac = [],
            zb = new zd(t, tb, x),
            bc = new Ad(t, tb, x),
            Bb = new Cd(t),
            Ca = new Ed(a, b, e, "localStorage" ==
                G || "cookieAndLocalStorage" == G, d.eventMethod, pb, d.bufferSize, d.maxPostBytes || 4E4, d.useStm, d.maxLocalStorageQueueSize || 1E3, d.connectionTimeout || 5E3, Rb),
            Cb = !1,
            H = d.contexts || {},
            ib = [],
            Ab = [],
            Db = !1,
            Eb = !1,
            X = {
                enabled: !1,
                installed: !1,
                configurations: {}
            },
            Ba = null;
        H.clientHints && S.userAgentData && (Ba = {
            isMobile: S.userAgentData.mobile,
            brands: S.userAgentData.brands
        }, H.clientHints.includeHighEntropy && S.userAgentData.getHighEntropyValues && S.userAgentData.getHighEntropyValues(["platform", "platformVersion", "architecture",
            "model", "uaFullVersion"
        ]).then(function(a) {
            Ba.architecture = a.architecture;
            Ba.model = a.model;
            Ba.platform = a.platform;
            Ba.uaFullVersion = a.uaFullVersion;
            Ba.platformVersion = a.platformVersion
        }));
        var Sb = d.skippedBrowserFeatures || [],
            Va = {};
        d.hasOwnProperty("discoverRootDomain") && d.discoverRootDomain && (vb = td(ja, oa));
        H.gaCookies && ib.push(Fa());
        H.geolocation && ea();
        t.setBase64Encoding(d.hasOwnProperty("encodeBase64") ? d.encodeBase64 : !0);
        t.setTrackerVersion(c);
        t.setTrackerNamespace(b);
        t.setAppId(rb);
        t.setPlatform(ob);
        t.setTimezone(Zd.jstz.determine().name());
        t.addPayloadPair("lang", Kb);
        t.addPayloadPair("cs", Fb);
        for (var aa in $b) Object.prototype.hasOwnProperty.call($b, aa) && ("res" !== aa && "cd" !== aa && "cookie" !== aa || f(aa) ? f(aa) || t.addPayloadPair("f_" + aa, $b[aa]) : t.addPayloadPair(aa, $b[aa]));
        m();
        Q();
        d.crossDomainLinker && k(d.crossDomainLinker);
        l.getDomainSessionIndex = function() {
            return ha
        };
        l.getPageViewId = function() {
            return V()
        };
        l.newSession = function() {
            var a = Math.round((new Date).getTime() / 1E3),
                b = R(),
                c = b[1],
                d = b[2],
                e = b[3],
                f = b[4],
                g = b[5],
                h = b[6];
            "0" === b[0] ? (T = h, "none" != G && (e++, g = f, T = P()), ha = e, w()) : (T = P(), ha++);
            "none" != G && (F(c, d, ha, a, g, T), w());
            Oa = (new Date).getTime()
        };
        l.getCookieName = function(a) {
            return Sa + a + "." + Ta
        };
        l.getUserId = function() {
            return yb
        };
        l.getDomainUserId = function() {
            return R()[1]
        };
        l.getDomainUserInfo = function() {
            return R()
        };
        l.getUserFingerprint = function() {
            y("User Fingerprinting is no longer supported. This function will be removed in a future release.");
            return 0
        };
        l.setAppId = function(a) {
            y("setAppId is deprecated. Instead use the argmap argument on tracker initialisation: appId");
            t.setAppId(a)
        };
        l.setReferrerUrl = function(a) {
            da = a
        };
        l.setCustomUrl = function(a) {
            h();
            var b = Aa,
                c;
            v(a) ? xb = a : "/" === a.slice(0, 1) ? xb = v(b) + "://" + Tb(b) + a : (b = p(b), 0 <= (c = b.indexOf("?")) && (b = b.slice(0, c)), (c = b.lastIndexOf("/")) !== b.length - 1 && (b = b.slice(0, c + 1)), xb = b + a)
        };
        l.setDocumentTitle = function(a) {
            wb = z.title;
            Ob = a
        };
        l.discardHashTag = function(a) {
            Qa = a
        };
        l.discardBrace = function(a) {
            Wa = a
        };
        l.setCookieNamePrefix = function(a) {
            y("setCookieNamePrefix is deprecated. Instead use the argmap argument on tracker initialisation: cookieName");
            Sa = a
        };
        l.setCookieDomain = function(a) {
            y("setCookieDomain is deprecated. Instead use the argmap argument on tracker initialisation: cookieDomain");
            vb = cc(a);
            m()
        };
        l.setCookiePath = function(a) {
            Ea = a;
            m()
        };
        l.setVisitorCookieTimeout = function(a) {
            kb = a
        };
        l.setSessionCookieTimeout = function(a) {
            y("setSessionCookieTimeout is deprecated. Instead use the argmap argument on tracker initialisation: sessionCookieTimeout");
            Ja = a
        };
        l.setUserFingerprintSeed = function() {
            y("User Fingerprinting is no longer supported. This function will be removed in a future release.")
        };
        l.enableUserFingerprint = function() {
            y("User Fingerprinting is no longer supported. This function will be removed in a future release.")
        };
        l.respectDoNotTrack = function(a) {
            y("respectDoNotTrack is deprecated. Instead use the argmap argument on tracker initialisation: respectDoNotTrack");
            var b = S.doNotTrack || S.msDoNotTrack;
            Ga = a && ("yes" === b || "1" === b)
        };
        l.crossDomainLinker = function(a) {
            k(a)
        };
        l.enableLinkClickTracking = function(a, b, c, d) {
            e.hasLoaded ? (zb.configureLinkClickTracking(a, b, c, d), zb.addClickListeners()) :
                e.registeredOnLoadHandlers.push(function() {
                    zb.configureLinkClickTracking(a, b, c, d);
                    zb.addClickListeners()
                })
        };
        l.refreshLinkClickTracking = function() {
            e.hasLoaded ? zb.addClickListeners() : e.registeredOnLoadHandlers.push(function() {
                zb.addClickListeners()
            })
        };
        l.enableActivityTracking = function(a, b) {
            X.enabled = !0;
            X.configurations.pagePing = wa(a, b, Pa)
        };
        l.enableActivityTrackingCallback = function(a, b, c) {
            X.enabled = !0;
            X.configurations.callback = wa(a, b, c)
        };
        l.updatePageActivity = function() {
            r()
        };
        l.enableFormTracking = function(a,
            b) {
            e.hasLoaded ? (bc.configureFormTracking(a), bc.addFormListeners(b)) : e.registeredOnLoadHandlers.push(function() {
                bc.configureFormTracking(a);
                bc.addFormListeners(b)
            })
        };
        l.killFrame = function() {
            A.location !== A.top.location && (A.top.location = A.location)
        };
        l.redirectFile = function(a) {
            "file:" === A.location.protocol && (A.location = a)
        };
        l.setOptOutCookie = function(a) {
            Pb = a
        };
        l.setCountPreRendered = function(a) {
            jb = a
        };
        l.setUserId = function(a) {
            yb = a
        };
        l.identifyUser = function(a) {
            l.setUserId(a)
        };
        l.setUserIdFromLocation = function(a) {
            h();
            yb = Gb(a, Aa)
        };
        l.setUserIdFromReferrer = function(a) {
            h();
            yb = Gb(a, Mb)
        };
        l.setUserIdFromCookie = function(a) {
            yb = J(a)
        };
        l.setCollectorCf = function(a) {
            Qb = W(a + ".cloudfront.net");
            Ca.setCollectorUrl(Qb)
        };
        l.setCollectorUrl = function(a) {
            Qb = W(a);
            Ca.setCollectorUrl(Qb)
        };
        l.setPlatform = function(a) {
            y("setPlatform is deprecated. Instead use the argmap argument on tracker initialisation: platform");
            t.setPlatform(a)
        };
        l.encodeBase64 = function(a) {
            y("encodeBase64 is deprecated. Instead use the argmap argument on tracker initialisation: encodeBase64");
            t.setBase64Encoding(a)
        };
        l.flushBuffer = function() {
            Ca.executeQueue()
        };
        l.enableGeolocationContext = ea;
        l.trackPageView = function(a, b, c, d, e) {
            K(function() {
                Ia(a, b, c, d, e)
            })
        };
        l.trackStructEvent = function(a, b, c, d, e, f, g, h) {
            K(function() {
                t.trackStructEvent(a, b, c, d, e, x(f), g, h)
            })
        };
        l.trackSelfDescribingEvent = function(a, b, c, d) {
            K(function() {
                t.trackSelfDescribingEvent(a, x(b), c, d)
            })
        };
        l.trackUnstructEvent = function(a, b, c) {
            K(function() {
                t.trackSelfDescribingEvent(a, x(b), c)
            })
        };
        l.addTrans = function(a, b, c, d, e, f, g, h, k, l, p) {
            Xa = a;
            Ya = b;
            Za = c;
            $a = d;
            ab = e;
            bb = f;
            cb = g;
            db = h;
            eb = k;
            fb = l;
            hb = p
        };
        l.addItem = function(a, b, c, d, e, f, g, h, k) {
            ac.push({
                orderId: a,
                sku: b,
                name: c,
                category: d,
                price: e,
                quantity: f,
                currency: g,
                context: h,
                tstamp: k
            })
        };
        l.trackTrans = function() {
            K(function() {
                var a = hb;
                t.trackEcommerceTransaction(Xa, Ya, Za, $a, ab, bb, cb, db, eb, x(fb), a);
                for (a = 0; a < ac.length; a++) {
                    var b = ac[a],
                        c = b.tstamp;
                    t.trackEcommerceTransactionItem(b.orderId, b.sku, b.name, b.category, b.price, b.quantity, b.currency, x(b.context), c)
                }
                hb = fb = eb = db = cb = bb = ab = $a = Za = Ya = Xa = void 0;
                ac = []
            })
        };
        l.trackLinkClick = function(a, b, c, d, e, f, g) {
            K(function() {
                t.trackLinkClick(a, b, c, d, e, x(f), g)
            })
        };
        l.trackAdImpression = function(a, b, c, d, e, f, g, h, k, l) {
            K(function() {
                t.trackAdImpression(a, b, c, d, e, f, g, h, x(k), l)
            })
        };
        l.trackAdClick = function(a, b, c, d, e, f, g, h, k, l, p) {
            K(function() {
                t.trackAdClick(a, b, c, d, e, f, g, h, k, x(l), p)
            })
        };
        l.trackAdConversion = function(a, b, c, d, e, f, g, h, k, l, p) {
            K(function() {
                t.trackAdConversion(a, b, c, d, e, f, g, h, k, x(l), p)
            })
        };
        l.trackSocialInteraction = function(a, b, c, d, e) {
            K(function() {
                t.trackSocialInteraction(a,
                    b, c, x(d), e)
            })
        };
        l.trackAddToCart = function(a, b, c, d, e, f, g, h) {
            K(function() {
                t.trackAddToCart(a, b, c, d, e, f, x(g), h)
            })
        };
        l.trackRemoveFromCart = function(a, b, c, d, e, f, g, h) {
            K(function() {
                t.trackRemoveFromCart(a, b, c, d, e, f, x(g), h)
            })
        };
        l.trackSiteSearch = function(a, b, c, d, e, f) {
            K(function() {
                t.trackSiteSearch(a, b, c, d, x(e), f)
            })
        };
        l.trackTiming = function(a, b, c, d, e, f) {
            K(function() {
                t.trackSelfDescribingEvent({
                        schema: "iglu:com.snowplowanalytics.snowplow/timing/jsonschema/1-0-0",
                        data: {
                            category: a,
                            variable: b,
                            timing: c,
                            label: d
                        }
                    }, x(e),
                    f)
            })
        };
        l.trackConsentWithdrawn = function(a, b, c, d, e, f, g) {
            K(function() {
                t.trackConsentWithdrawn(a, b, c, d, e, x(f), g)
            })
        };
        l.trackConsentGranted = function(a, b, c, d, e, f, g) {
            K(function() {
                t.trackConsentGranted(a, b, c, d, e, x(f), g)
            })
        };
        l.trackEnhancedEcommerceAction = function(a, b, c) {
            var d = Ab.concat(b || []);
            Ab.length = 0;
            K(function() {
                t.trackSelfDescribingEvent({
                    schema: "iglu:com.google.analytics.enhanced-ecommerce/action/jsonschema/1-0-0",
                    data: {
                        action: a
                    }
                }, x(d), c)
            })
        };
        l.addEnhancedEcommerceActionContext = function(a, b, c, d, e, f, g,
            h, k, l) {
            Ab.push({
                schema: "iglu:com.google.analytics.enhanced-ecommerce/actionFieldObject/jsonschema/1-0-0",
                data: {
                    id: a,
                    affiliation: b,
                    revenue: Ib(c),
                    tax: Ib(d),
                    shipping: Ib(e),
                    coupon: f,
                    list: g,
                    step: nb(h),
                    option: k,
                    currency: l
                }
            })
        };
        l.addEnhancedEcommerceImpressionContext = function(a, b, c, d, e, f, g, h, k) {
            Ab.push({
                schema: "iglu:com.google.analytics.enhanced-ecommerce/impressionFieldObject/jsonschema/1-0-0",
                data: {
                    id: a,
                    name: b,
                    list: c,
                    brand: d,
                    category: e,
                    variant: f,
                    position: nb(g),
                    price: Ib(h),
                    currency: k
                }
            })
        };
        l.addEnhancedEcommerceProductContext =
            function(a, b, c, d, e, f, g, h, k, l, p) {
                Ab.push({
                    schema: "iglu:com.google.analytics.enhanced-ecommerce/productFieldObject/jsonschema/1-0-0",
                    data: {
                        id: a,
                        name: b,
                        list: c,
                        brand: d,
                        category: e,
                        variant: f,
                        price: Ib(g),
                        quantity: nb(h),
                        coupon: k,
                        position: nb(l),
                        currency: p
                    }
                })
            };
        l.addEnhancedEcommercePromoContext = function(a, b, c, d, e) {
            Ab.push({
                schema: "iglu:com.google.analytics.enhanced-ecommerce/promoFieldObject/jsonschema/1-0-0",
                data: {
                    id: a,
                    name: b,
                    creative: c,
                    position: d,
                    currency: e
                }
            })
        };
        l.enableGdprContext = function(a) {
            var b = 1 < arguments.length &&
                void 0 !== arguments[1] ? arguments[1] : null,
                c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
                d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
                e = lb[a];
            e ? (H.gdprBasis = !0, Va = {
                gdprBasis: e,
                gdprDocId: b,
                gdprDocVer: c,
                gdprDocDesc: d
            }) : y("enableGdprContext failed. basisForProcessing must be set to one of: consent, legalObligation, vitalInterests publicTask, legitimateInterests")
        };
        l.addGlobalContexts = function(a) {
            t.addGlobalContexts(a)
        };
        l.removeGlobalContexts = function(a) {
            t.removeGlobalContexts(a)
        };
        l.clearGlobalContexts = function() {
            t.clearGlobalContexts()
        };
        l.enableErrorTracking = function(a, b) {
            Bb.enableErrorTracking(a, b, x())
        };
        l.trackError = function(a, b, c, d, e, f) {
            f = x(f);
            Bb.trackError(a, b, c, d, e, f)
        };
        l.preservePageViewId = function() {
            Db = !0
        };
        l.disableAnonymousTracking = function(a) {
            a ? (d.stateStorageStrategy = a, d.anonymousTracking = !1, G = Da(d)) : d.anonymousTracking = !1;
            fa = !!d.anonymousTracking;
            Ua = ma(d);
            Rb = na(d);
            Ca.setUseLocalStorage("localStorage" == G || "cookieAndLocalStorage" == G);
            Ca.setAnonymousTracking(Rb);
            Q();
            Ca.executeQueue()
        };
        l.enableAnonymousTracking = function(a) {
            d.anonymousTracking = a || !0;
            fa = !!d.anonymousTracking;
            Ua = ma(d);
            Rb = na(d);
            Ua || Y();
            Ca.setAnonymousTracking(Rb)
        };
        l.clearUserData = L;
        l.setDebug = function(a) {
            Ka = (Ha = (!!a).valueOf()) ? l : va
        };
        va = Gd(l);
        return Ka = Ha ? l : va
    }

    function Jc(a, b) {
        function c() {
            var a;
            if (!f.hasLoaded)
                for (f.hasLoaded = !0, a = 0; a < f.registeredOnLoadHandlers.length; a++) f.registeredOnLoadHandlers[a]();
            return !0
        }
        var e = document,
            d = window,
            f = {
                outQueues: [],
                bufferFlushers: [],
                expireDateTime: null,
                hasLoaded: !1,
                registeredOnLoadHandlers: [],
                pageViewId: null
            };
        d.Snowplow = {
            getTrackerCf: function(a) {
                var c = new Qa(b, "", "js-2.17.3", f, {});
                c.setCollectorCf(a);
                return c
            },
            getTrackerUrl: function(a) {
                var c = new Qa(b, "", "js-2.17.3", f, {});
                c.setCollectorUrl(a);
                return c
            },
            getAsyncTracker: function() {
                return new Qa(b, "", "js-2.17.3", f, {})
            }
        };
        q(d, "beforeunload", function() {
            O(f.bufferFlushers, function(a) {
                a()
            });
            if (f.expireDateTime) {
                do {
                    var a = new Date;
                    if (0 === Array.prototype.filter.call(f.outQueues, function(a) {
                            return 0 < a.length
                        }).length) break
                } while (a.getTime() <
                    f.expireDateTime)
            }
        }, !1);
        (function() {
            var a;
            e.addEventListener ? q(e, "DOMContentLoaded", function k() {
                e.removeEventListener("DOMContentLoaded", k, !1);
                c()
            }) : e.attachEvent && (e.attachEvent("onreadystatechange", function k() {
                "complete" === e.readyState && (e.detachEvent("onreadystatechange", k), c())
            }), e.documentElement.doScroll && d === d.top && function p() {
                if (!f.hasLoaded) {
                    try {
                        e.documentElement.doScroll("left")
                    } catch (v) {
                        setTimeout(p, 0);
                        return
                    }
                    c()
                }
            }());
            /WebKit/.test(navigator.userAgent) && (a = setInterval(function() {
                if (f.hasLoaded ||
                    /loaded|complete/.test(e.readyState)) clearInterval(a), c()
            }, 10));
            q(d, "load", c, !1)
        })();
        return new ud(Qa, "js-2.17.3", f, a, b)
    }
    var $d = function(a, b) {
            for (var c = -1, e = null == a ? 0 : a.length; ++c < e && !1 !== b(a[c], c, a););
            return a
        },
        ae = function(a) {
            return function(b, c, e) {
                var d = -1,
                    f = Object(b);
                e = e(b);
                for (var h = e.length; h--;) {
                    var g = e[a ? h : ++d];
                    if (!1 === c(f[g], g, f)) break
                }
                return b
            }
        }(),
        Wa = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ?
        self : {},
        Kc = "object" == D(Wa) && Wa && Wa.Object === Object && Wa,
        be = "object" == ("undefined" === typeof self ? "undefined" : D(self)) && self && self.Object === Object && self,
        L = Kc || be || Function("return this")(),
        Y = L.Symbol,
        Lc = Object.prototype,
        ce = Lc.hasOwnProperty,
        de = Lc.toString,
        ia = Y ? Y.toStringTag : void 0,
        ee = Object.prototype.toString,
        Mc = Y ? Y.toStringTag : void 0,
        W = function(a) {
            if (null == a) a = void 0 === a ? "[object Undefined]" : "[object Null]";
            else if (Mc && Mc in Object(a)) {
                var b = ce.call(a, ia),
                    c = a[ia];
                try {
                    a[ia] = void 0;
                    var e = !0
                } catch (f) {}
                var d =
                    de.call(a);
                e && (b ? a[ia] = c : delete a[ia]);
                a = d
            } else a = ee.call(a);
            return a
        },
        Q = function(a) {
            return null != a && "object" == D(a)
        },
        Nc = function(a) {
            return Q(a) && "[object Arguments]" == W(a)
        },
        Oc = Object.prototype,
        fe = Oc.hasOwnProperty,
        ge = Oc.propertyIsEnumerable,
        Pc = Nc(function() {
            return arguments
        }()) ? Nc : function(a) {
            return Q(a) && fe.call(a, "callee") && !ge.call(a, "callee")
        },
        u = Array.isArray,
        he = function() {
            return !1
        },
        Ja = ra(function(a, b) {
            var c = (b = b && !b.nodeType && b) && a && !a.nodeType && a;
            b = c && c.exports === b ? L.Buffer : void 0;
            a.exports =
                (b ? b.isBuffer : void 0) || he
        }),
        ie = /^(?:0|[1-9]\d*)$/,
        Xa = function(a, b) {
            var c = D(a);
            b = null == b ? 9007199254740991 : b;
            return !!b && ("number" == c || "symbol" != c && ie.test(a)) && -1 < a && 0 == a % 1 && a < b
        },
        Ya = function(a) {
            return "number" == typeof a && -1 < a && 0 == a % 1 && 9007199254740991 >= a
        },
        n = {};
    n["[object Float32Array]"] = n["[object Float64Array]"] = n["[object Int8Array]"] = n["[object Int16Array]"] = n["[object Int32Array]"] = n["[object Uint8Array]"] = n["[object Uint8ClampedArray]"] = n["[object Uint16Array]"] = n["[object Uint32Array]"] = !0;
    n["[object Arguments]"] =
        n["[object Array]"] = n["[object ArrayBuffer]"] = n["[object Boolean]"] = n["[object DataView]"] = n["[object Date]"] = n["[object Error]"] = n["[object Function]"] = n["[object Map]"] = n["[object Number]"] = n["[object Object]"] = n["[object RegExp]"] = n["[object Set]"] = n["[object String]"] = n["[object WeakMap]"] = !1;
    var je = function(a) {
            return Q(a) && Ya(a.length) && !!n[W(a)]
        },
        ke = function(a) {
            return function(b) {
                return a(b)
            }
        },
        Qc = ra(function(a, b) {
            var c = b && !b.nodeType && b;
            c = (b = c && a && !a.nodeType && a) && b.exports === c && Kc.process;
            a: {
                try {
                    var e = b && b.require && b.require("util").types;
                    if (e) {
                        var d = e;
                        break a
                    }
                    d = c && c.binding && c.binding("util");
                    break a
                } catch (f) {}
                d = void 0
            }
            a.exports = d
        }),
        Rc = Qc && Qc.isTypedArray,
        hc = Rc ? ke(Rc) : je,
        le = Object.prototype.hasOwnProperty,
        me = Object.prototype,
        Sc = function(a, b) {
            return function(c) {
                return a(b(c))
            }
        },
        ne = Sc(Object.keys, Object),
        oe = Object.prototype.hasOwnProperty,
        I = function(a) {
            var b = D(a);
            return null != a && ("object" == b || "function" == b)
        },
        Tc = function(a) {
            if (!I(a)) return !1;
            a = W(a);
            return "[object Function]" == a || "[object GeneratorFunction]" ==
                a || "[object AsyncFunction]" == a || "[object Proxy]" == a
        },
        Da = function(a) {
            return null != a && Ya(a.length) && !Tc(a)
        },
        La = function(a) {
            if (Da(a)) {
                var b = u(a),
                    c = !b && Pc(a),
                    e = !b && !c && Ja(a),
                    d = !b && !c && !e && hc(a);
                if (b = b || c || e || d) {
                    c = a.length;
                    for (var f = String, h = -1, g = Array(c); ++h < c;) g[h] = f(h);
                    c = g
                } else c = [];
                f = c.length;
                for (var k in a) !le.call(a, k) || b && ("length" == k || e && ("offset" == k || "parent" == k) || d && ("buffer" == k || "byteLength" == k || "byteOffset" == k) || Xa(k, f)) || c.push(k);
                a = c
            } else if (k = a && a.constructor, a === ("function" == typeof k &&
                    k.prototype || me)) {
                k = [];
                for (e in Object(a)) oe.call(a, e) && "constructor" != e && k.push(e);
                a = k
            } else a = ne(a);
            return a
        },
        Uc = function(a, b) {
            return a && ae(a, b, La)
        },
        Ea = function(a, b) {
            return function(c, e) {
                if (null == c) return c;
                if (!Da(c)) return a(c, e);
                for (var d = c.length, f = b ? d : -1, h = Object(c);
                    (b ? f-- : ++f < d) && !1 !== e(h[f], f, h););
                return c
            }
        }(Uc),
        Vc = function(a) {
            return a
        },
        O = function(a, b) {
            return (u(a) ? $d : Ea)(a, "function" == typeof b ? b : Vc)
        },
        Wc = function(a, b) {
            for (var c = -1, e = null == a ? 0 : a.length, d = 0, f = []; ++c < e;) {
                var h = a[c];
                b(h, c, a) && (f[d++] =
                    h)
            }
            return f
        },
        pe = function(a, b) {
            var c = [];
            Ea(a, function(a, d, f) {
                b(a, d, f) && c.push(a)
            });
            return c
        },
        Za = function(a, b) {
            return a === b || a !== a && b !== b
        },
        ja = function(a, b) {
            for (var c = a.length; c--;)
                if (Za(a[c][0], b)) return c;
            return -1
        },
        qe = Array.prototype.splice;
    sa.prototype.clear = function() {
        this.__data__ = [];
        this.size = 0
    };
    sa.prototype["delete"] = function(a) {
        var b = this.__data__;
        a = ja(b, a);
        if (0 > a) return !1;
        a == b.length - 1 ? b.pop() : qe.call(b, a, 1);
        --this.size;
        return !0
    };
    sa.prototype.get = function(a) {
        var b = this.__data__;
        a = ja(b, a);
        return 0 >
            a ? void 0 : b[a][1]
    };
    sa.prototype.has = function(a) {
        return -1 < ja(this.__data__, a)
    };
    sa.prototype.set = function(a, b) {
        var c = this.__data__,
            e = ja(c, a);
        0 > e ? (++this.size, c.push([a, b])) : c[e][1] = b;
        return this
    };
    var lb = sa,
        $a = L["__core-js_shared__"],
        Xc = function() {
            var a = /[^.]+$/.exec($a && $a.keys && $a.keys.IE_PROTO || "");
            return a ? "Symbol(src)_1." + a : ""
        }(),
        re = Function.prototype.toString,
        ka = function(a) {
            if (null != a) {
                try {
                    return re.call(a)
                } catch (b) {}
                return a + ""
            }
            return ""
        },
        se = /^\[object .+?Constructor\]$/,
        te = RegExp("^" + Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,
            "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        la = function(a, b) {
            a = null == a ? void 0 : a[b];
            return (!I(a) || Xc && Xc in a ? 0 : (Tc(a) ? te : se).test(ka(a))) ? a : void 0
        },
        ma = la(L, "Map"),
        na = la(Object, "create"),
        ue = Object.prototype.hasOwnProperty,
        ve = Object.prototype.hasOwnProperty;
    ba.prototype.clear = function() {
        this.__data__ = na ? na(null) : {};
        this.size = 0
    };
    ba.prototype["delete"] = function(a) {
        a = this.has(a) && delete this.__data__[a];
        this.size -= a ? 1 : 0;
        return a
    };
    ba.prototype.get = function(a) {
        var b =
            this.__data__;
        return na ? (a = b[a], "__lodash_hash_undefined__" === a ? void 0 : a) : ue.call(b, a) ? b[a] : void 0
    };
    ba.prototype.has = function(a) {
        var b = this.__data__;
        return na ? void 0 !== b[a] : ve.call(b, a)
    };
    ba.prototype.set = function(a, b) {
        var c = this.__data__;
        this.size += this.has(a) ? 0 : 1;
        c[a] = na && void 0 === b ? "__lodash_hash_undefined__" : b;
        return this
    };
    var oa = function(a, b) {
        a = a.__data__;
        var c = D(b);
        return ("string" == c || "number" == c || "symbol" == c || "boolean" == c ? "__proto__" !== b : null === b) ? a["string" == typeof b ? "string" : "hash"] : a.map
    };
    ta.prototype.clear = function() {
        this.size = 0;
        this.__data__ = {
            hash: new ba,
            map: new(ma || lb),
            string: new ba
        }
    };
    ta.prototype["delete"] = function(a) {
        a = oa(this, a)["delete"](a);
        this.size -= a ? 1 : 0;
        return a
    };
    ta.prototype.get = function(a) {
        return oa(this, a).get(a)
    };
    ta.prototype.has = function(a) {
        return oa(this, a).has(a)
    };
    ta.prototype.set = function(a, b) {
        var c = oa(this, a),
            e = c.size;
        c.set(a, b);
        this.size += c.size == e ? 0 : 1;
        return this
    };
    var va = ta;
    ua.prototype.clear = function() {
        this.__data__ = new lb;
        this.size = 0
    };
    ua.prototype["delete"] =
        function(a) {
            var b = this.__data__;
            a = b["delete"](a);
            this.size = b.size;
            return a
        };
    ua.prototype.get = function(a) {
        return this.__data__.get(a)
    };
    ua.prototype.has = function(a) {
        return this.__data__.has(a)
    };
    ua.prototype.set = function(a, b) {
        var c = this.__data__;
        if (c instanceof lb) {
            var e = c.__data__;
            if (!ma || 199 > e.length) return e.push([a, b]), this.size = ++c.size, this;
            c = this.__data__ = new va(e)
        }
        c.set(a, b);
        this.size = c.size;
        return this
    };
    var Ka = ua;
    Ha.prototype.add = Ha.prototype.push = function(a) {
        this.__data__.set(a, "__lodash_hash_undefined__");
        return this
    };
    Ha.prototype.has = function(a) {
        return this.__data__.has(a)
    };
    var we = function(a, b) {
            for (var c = -1, e = null == a ? 0 : a.length; ++c < e;)
                if (b(a[c], c, a)) return !0;
            return !1
        },
        ic = function(a, b, c, e, d, f) {
            var h = c & 1,
                g = a.length,
                k = b.length;
            if (g != k && !(h && k > g)) return !1;
            k = f.get(a);
            var p = f.get(b);
            if (k && p) return k == b && p == a;
            k = -1;
            p = !0;
            var n = c & 2 ? new Ha : void 0;
            f.set(a, b);
            for (f.set(b, a); ++k < g;) {
                var q = a[k],
                    m = b[k];
                if (e) var r = h ? e(m, q, k, b, a, f) : e(q, m, k, a, b, f);
                if (void 0 !== r) {
                    if (r) continue;
                    p = !1;
                    break
                }
                if (n) {
                    if (!we(b, function(a, b) {
                            if (!n.has(b) &&
                                (q === a || d(q, a, c, e, f))) return n.push(b)
                        })) {
                        p = !1;
                        break
                    }
                } else if (q !== m && !d(q, m, c, e, f)) {
                    p = !1;
                    break
                }
            }
            f["delete"](a);
            f["delete"](b);
            return p
        },
        Yc = L.Uint8Array,
        xe = function(a) {
            var b = -1,
                c = Array(a.size);
            a.forEach(function(a, d) {
                c[++b] = [d, a]
            });
            return c
        },
        ye = function(a) {
            var b = -1,
                c = Array(a.size);
            a.forEach(function(a) {
                c[++b] = a
            });
            return c
        },
        Zc = Y ? Y.prototype : void 0,
        ab = Zc ? Zc.valueOf : void 0,
        od = function(a, b, c, e, d, f, h) {
            switch (c) {
                case "[object DataView]":
                    if (a.byteLength != b.byteLength || a.byteOffset != b.byteOffset) break;
                    a = a.buffer;
                    b = b.buffer;
                case "[object ArrayBuffer]":
                    if (a.byteLength != b.byteLength || !f(new Yc(a), new Yc(b))) break;
                    return !0;
                case "[object Boolean]":
                case "[object Date]":
                case "[object Number]":
                    return Za(+a, +b);
                case "[object Error]":
                    return a.name == b.name && a.message == b.message;
                case "[object RegExp]":
                case "[object String]":
                    return a == b + "";
                case "[object Map]":
                    var g = xe;
                case "[object Set]":
                    g || (g = ye);
                    if (a.size != b.size && !(e & 1)) break;
                    if (c = h.get(a)) return c == b;
                    e |= 2;
                    h.set(a, b);
                    b = ic(g(a), g(b), e, d, f, h);
                    h["delete"](a);
                    return b;
                case "[object Symbol]":
                    if (ab) return ab.call(a) == ab.call(b)
            }
            return !1
        },
        kc = function(a, b, c) {
            b = b(a);
            if (!u(a)) {
                a = c(a);
                c = -1;
                for (var e = a.length, d = b.length; ++c < e;) b[d + c] = a[c]
            }
            return b
        },
        ze = function() {
            return []
        },
        Ae = Object.prototype.propertyIsEnumerable,
        $c = Object.getOwnPropertySymbols,
        lc = $c ? function(a) {
            if (null == a) return [];
            a = Object(a);
            return Wc($c(a), function(b) {
                return Ae.call(a, b)
            })
        } : ze,
        pd = Object.prototype.hasOwnProperty,
        bb = la(L, "DataView"),
        cb = la(L, "Promise"),
        db = la(L, "Set"),
        eb = la(L, "WeakMap"),
        Be = ka(bb),
        Ce = ka(ma),
        De = ka(cb),
        Ee = ka(db),
        Fe = ka(eb),
        pa = W;
    if (bb && "[object DataView]" != pa(new bb(new ArrayBuffer(1))) || ma && "[object Map]" != pa(new ma) || cb && "[object Promise]" != pa(cb.resolve()) || db && "[object Set]" != pa(new db) || eb && "[object WeakMap]" != pa(new eb)) pa = function(a) {
        var b = W(a);
        if (a = (a = "[object Object]" == b ? a.constructor : void 0) ? ka(a) : "") switch (a) {
            case Be:
                return "[object DataView]";
            case Ce:
                return "[object Map]";
            case De:
                return "[object Promise]";
            case Ee:
                return "[object Set]";
            case Fe:
                return "[object WeakMap]"
        }
        return b
    };
    var gc =
        pa,
        jc = Object.prototype.hasOwnProperty,
        rb = Ia,
        Ge = function(a, b, c, e) {
            var d = c.length,
                f = d,
                h = !e;
            if (null == a) return !f;
            for (a = Object(a); d--;) {
                var g = c[d];
                if (h && g[2] ? g[1] !== a[g[0]] : !(g[0] in a)) return !1
            }
            for (; ++d < f;) {
                g = c[d];
                var k = g[0],
                    p = a[k],
                    n = g[1];
                if (h && g[2]) {
                    if (void 0 === p && !(k in a)) return !1
                } else {
                    g = new Ka;
                    if (e) var q = e(p, n, k, a, b, g);
                    if (void 0 === q ? !rb(n, p, 3, e, g) : !q) return !1
                }
            }
            return !0
        },
        He = function(a) {
            for (var b = La(a), c = b.length; c--;) {
                var e = b[c],
                    d = a[e];
                b[c] = [e, d, d === d && !I(d)]
            }
            return b
        },
        ad = function(a, b) {
            return function(c) {
                return null ==
                    c ? !1 : c[a] === b && (void 0 !== b || a in Object(c))
            }
        },
        Ie = function(a) {
            var b = He(a);
            return 1 == b.length && b[0][2] ? ad(b[0][0], b[0][1]) : function(c) {
                return c === a || Ge(c, a, b)
            }
        },
        Ma = function(a) {
            return "symbol" == D(a) || Q(a) && "[object Symbol]" == W(a)
        },
        Je = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        Ke = /^\w*$/,
        fb = function(a, b) {
            if (u(a)) return !1;
            var c = D(a);
            return "number" == c || "symbol" == c || "boolean" == c || null == a || Ma(a) ? !0 : Ke.test(a) || !Je.test(a) || null != b && a in Object(b)
        };
    Fb.Cache = va;
    var Le = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        Me = /\\(\\)?/g,
        Ne = function(a) {
            a = Fb(a, function(a) {
                500 === b.size && b.clear();
                return a
            });
            var b = a.cache;
            return a
        }(function(a) {
            var b = [];
            46 === a.charCodeAt(0) && b.push("");
            a.replace(Le, function(a, e, d, f) {
                b.push(d ? f.replace(Me, "$1") : e || a)
            });
            return b
        }),
        nc = function(a, b) {
            for (var c = -1, e = null == a ? 0 : a.length, d = Array(e); ++c < e;) d[c] = b(a[c], c, a);
            return d
        },
        qd = 1 / 0,
        bd = Y ? Y.prototype : void 0,
        oc = bd ? bd.toString : void 0,
        cd = function(a, b) {
            return u(a) ? a : fb(a, b) ? [a] : Ne(null == a ? "" : mc(a))
        },
        Oe = 1 / 0,
        gb = function(a) {
            if ("string" == typeof a ||
                Ma(a)) return a;
            var b = a + "";
            return "0" == b && 1 / a == -Oe ? "-0" : b
        },
        dd = function(a, b) {
            b = cd(b, a);
            for (var c = 0, e = b.length; null != a && c < e;) a = a[gb(b[c++])];
            return c && c == e ? a : void 0
        },
        F = function(a, b, c) {
            a = null == a ? void 0 : dd(a, b);
            return void 0 === a ? c : a
        },
        Pe = function(a, b) {
            return null != a && b in Object(a)
        },
        sb = function(a, b, c) {
            b = cd(b, a);
            for (var e = -1, d = b.length, f = !1; ++e < d;) {
                var h = gb(b[e]);
                if (!(f = null != a && c(a, h))) break;
                a = a[h]
            }
            if (f || ++e != d) return f;
            d = null == a ? 0 : a.length;
            return !!d && Ya(d) && Xa(h, d) && (u(a) || Pc(a))
        },
        Qe = function(a, b) {
            return fb(a) &&
                b === b && !I(b) ? ad(gb(a), b) : function(c) {
                    var e = F(c, a);
                    return void 0 === e && e === b ? null != c && sb(c, a, Pe) : rb(b, e, 3)
                }
        },
        Re = function(a) {
            return function(b) {
                return null == b ? void 0 : b[a]
            }
        },
        Se = function(a) {
            return function(b) {
                return dd(b, a)
            }
        },
        Fa = function(a) {
            return "function" == typeof a ? a : null == a ? Vc : "object" == D(a) ? u(a) ? Qe(a[0], a[1]) : Ie(a) : fb(a) ? Re(gb(a)) : Se(a)
        },
        rd = function(a, b) {
            return (u(a) ? Wc : pe)(a, Fa(b))
        },
        qc = function(a) {
            return "string" == typeof a || !u(a) && Q(a) && "[object String]" == W(a)
        },
        Te = function(a, b) {
            var c = -1,
                e = Da(a) ? Array(a.length) : [];
            Ea(a, function(a, f, h) {
                e[++c] = b(a, f, h)
            });
            return e
        },
        ca = function(a, b) {
            return (u(a) ? nc : Te)(a, Fa(b))
        },
        Z = window,
        wa = document,
        xa = window.localStorage,
        wc = window.sessionStorage,
        ed = 0 / 0,
        Ue = /^\s+|\s+$/g,
        Ve = /^[-+]0x[0-9a-f]+$/i,
        We = /^0b[01]+$/i,
        Xe = /^0o[0-7]+$/i,
        Ye = parseInt,
        Ze = function(a) {
            if ("number" == typeof a) return a;
            if (Ma(a)) return ed;
            I(a) && (a = "function" == typeof a.valueOf ? a.valueOf() : a, a = I(a) ? a + "" : a);
            if ("string" != typeof a) return 0 === a ? a : +a;
            a = a.replace(Ue, "");
            var b = We.test(a);
            return b || Xe.test(a) ? Ye(a.slice(2),
                b ? 2 : 8) : Ve.test(a) ? ed : +a
        },
        fd = 1 / 0,
        ec = function(a) {
            a ? (a = Ze(a), a = a === fd || a === -fd ? 1.7976931348623157E308 * (0 > a ? -1 : 1) : a === a ? a : 0) : a = 0 === a ? a : 0;
            var b = a % 1;
            return a === a ? b ? a - b : a : 0
        },
        Zd = ra(function(a, b) {
            (function(a) {
                var c = function() {
                    var a = function(a) {
                            a = -a.getTimezoneOffset();
                            return null !== a ? a : 0
                        },
                        b = function(a, b, c) {
                            var d = new Date;
                            void 0 !== a && d.setFullYear(a);
                            d.setMonth(b);
                            d.setDate(c);
                            return d
                        };
                    return {
                        determine: function() {
                            var d = a(b(void 0, 0, 2)),
                                e = a(b(void 0, 5, 2)),
                                f = d - e;
                            return new c.TimeZone(c.olson.timezones[0 > f ? d +
                                ",1" : 0 < f ? e + ",1,s" : d + ",0"])
                        },
                        date_is_dst: function(c) {
                            var d = 7 < c.getMonth(),
                                e = d ? a(b(c.getFullYear(), 5, 2)) : a(b(c.getFullYear(), 0, 2));
                            c = a(c);
                            c = e - c;
                            return 0 > e || d ? 0 !== c : 0 > c
                        },
                        dst_start_for: function(a) {
                            var b = new Date(2010, 6, 15, 1, 0, 0, 0);
                            return {
                                "America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0),
                                "America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0),
                                "America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0),
                                "America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0),
                                "America/Asuncion": new Date(2012, 9, 7, 3, 0, 0, 0),
                                "America/Santiago": new Date(2012, 9,
                                    3, 3, 0, 0, 0),
                                "America/Campo_Grande": new Date(2012, 9, 21, 5, 0, 0, 0),
                                "America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0),
                                "America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0),
                                "America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0),
                                "America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0),
                                "America/Havana": new Date(2012, 2, 10, 2, 0, 0, 0),
                                "America/New_York": new Date(2012, 2, 10, 7, 0, 0, 0),
                                "Europe/Helsinki": new Date(2013, 2, 31, 5, 0, 0, 0),
                                "Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0),
                                "America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0),
                                "America/Goose_Bay": new Date(2011,
                                    2, 13, 2, 1, 0, 0),
                                "America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0),
                                "America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0),
                                "Europe/Moscow": b,
                                "Asia/Amman": new Date(2013, 2, 29, 1, 0, 0, 0),
                                "Asia/Beirut": new Date(2013, 2, 31, 2, 0, 0, 0),
                                "Asia/Damascus": new Date(2013, 3, 6, 2, 0, 0, 0),
                                "Asia/Jerusalem": new Date(2013, 2, 29, 5, 0, 0, 0),
                                "Asia/Yekaterinburg": b,
                                "Asia/Omsk": b,
                                "Asia/Krasnoyarsk": b,
                                "Asia/Irkutsk": b,
                                "Asia/Yakutsk": b,
                                "Asia/Vladivostok": b,
                                "Asia/Baku": new Date(2013, 2, 31, 4, 0, 0),
                                "Asia/Yerevan": new Date(2013, 2, 31, 3, 0, 0),
                                "Asia/Kamchatka": b,
                                "Asia/Gaza": new Date(2010, 2, 27, 4, 0, 0),
                                "Africa/Cairo": new Date(2010, 4, 1, 3, 0, 0),
                                "Europe/Minsk": b,
                                "Pacific/Apia": new Date(2010, 10, 1, 1, 0, 0, 0),
                                "Pacific/Fiji": new Date(2010, 11, 1, 0, 0, 0),
                                "Australia/Perth": new Date(2008, 10, 1, 1, 0, 0, 0)
                            }[a]
                        }
                    }
                }();
                c.TimeZone = function(a) {
                    var b = {
                            "America/Denver": ["America/Denver", "America/Mazatlan"],
                            "America/Chicago": ["America/Chicago", "America/Mexico_City"],
                            "America/Santiago": ["America/Santiago", "America/Asuncion", "America/Campo_Grande"],
                            "America/Montevideo": ["America/Montevideo",
                                "America/Sao_Paulo"
                            ],
                            "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Asia/Beirut", "Europe/Helsinki", "Asia/Damascus"],
                            "Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"],
                            "America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"],
                            "America/New_York": ["America/Havana", "America/New_York"],
                            "America/Halifax": ["America/Goose_Bay", "America/Halifax"],
                            "America/Godthab": ["America/Miquelon", "America/Godthab"],
                            "Asia/Dubai": ["Europe/Moscow"],
                            "Asia/Dhaka": ["Asia/Yekaterinburg"],
                            "Asia/Jakarta": ["Asia/Omsk"],
                            "Asia/Shanghai": ["Asia/Krasnoyarsk", "Australia/Perth"],
                            "Asia/Tokyo": ["Asia/Irkutsk"],
                            "Australia/Brisbane": ["Asia/Yakutsk"],
                            "Pacific/Noumea": ["Asia/Vladivostok"],
                            "Pacific/Tarawa": ["Asia/Kamchatka", "Pacific/Fiji"],
                            "Pacific/Tongatapu": ["Pacific/Apia"],
                            "Asia/Baghdad": ["Europe/Minsk"],
                            "Asia/Baku": ["Asia/Yerevan", "Asia/Baku"],
                            "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
                        },
                        d = a;
                    a = function() {
                        for (var a = b[d], e = a.length, f = 0, h; f < e; f += 1)
                            if (h = a[f], c.date_is_dst(c.dst_start_for(h))) {
                                d = h;
                                break
                            }
                    };
                    "undefined" !==
                    typeof b[d] && a();
                    return {
                        name: function() {
                            return d
                        }
                    }
                };
                c.olson = {};
                c.olson.timezones = {
                    "-720,0": "Pacific/Majuro",
                    "-660,0": "Pacific/Pago_Pago",
                    "-600,1": "America/Adak",
                    "-600,0": "Pacific/Honolulu",
                    "-570,0": "Pacific/Marquesas",
                    "-540,0": "Pacific/Gambier",
                    "-540,1": "America/Anchorage",
                    "-480,1": "America/Los_Angeles",
                    "-480,0": "Pacific/Pitcairn",
                    "-420,0": "America/Phoenix",
                    "-420,1": "America/Denver",
                    "-360,0": "America/Guatemala",
                    "-360,1": "America/Chicago",
                    "-360,1,s": "Pacific/Easter",
                    "-300,0": "America/Bogota",
                    "-300,1": "America/New_York",
                    "-270,0": "America/Caracas",
                    "-240,1": "America/Halifax",
                    "-240,0": "America/Santo_Domingo",
                    "-240,1,s": "America/Santiago",
                    "-210,1": "America/St_Johns",
                    "-180,1": "America/Godthab",
                    "-180,0": "America/Argentina/Buenos_Aires",
                    "-180,1,s": "America/Montevideo",
                    "-120,0": "America/Noronha",
                    "-120,1": "America/Noronha",
                    "-60,1": "Atlantic/Azores",
                    "-60,0": "Atlantic/Cape_Verde",
                    "0,0": "UTC",
                    "0,1": "Europe/London",
                    "60,1": "Europe/Berlin",
                    "60,0": "Africa/Lagos",
                    "60,1,s": "Africa/Windhoek",
                    "120,1": "Asia/Beirut",
                    "120,0": "Africa/Johannesburg",
                    "180,0": "Asia/Baghdad",
                    "180,1": "Europe/Moscow",
                    "210,1": "Asia/Tehran",
                    "240,0": "Asia/Dubai",
                    "240,1": "Asia/Baku",
                    "270,0": "Asia/Kabul",
                    "300,1": "Asia/Yekaterinburg",
                    "300,0": "Asia/Karachi",
                    "330,0": "Asia/Kolkata",
                    "345,0": "Asia/Kathmandu",
                    "360,0": "Asia/Dhaka",
                    "360,1": "Asia/Omsk",
                    "390,0": "Asia/Rangoon",
                    "420,1": "Asia/Krasnoyarsk",
                    "420,0": "Asia/Jakarta",
                    "480,0": "Asia/Shanghai",
                    "480,1": "Asia/Irkutsk",
                    "525,0": "Australia/Eucla",
                    "525,1,s": "Australia/Eucla",
                    "540,1": "Asia/Yakutsk",
                    "540,0": "Asia/Tokyo",
                    "570,0": "Australia/Darwin",
                    "570,1,s": "Australia/Adelaide",
                    "600,0": "Australia/Brisbane",
                    "600,1": "Asia/Vladivostok",
                    "600,1,s": "Australia/Sydney",
                    "630,1,s": "Australia/Lord_Howe",
                    "660,1": "Asia/Kamchatka",
                    "660,0": "Pacific/Noumea",
                    "690,0": "Pacific/Norfolk",
                    "720,1,s": "Pacific/Auckland",
                    "720,0": "Pacific/Tarawa",
                    "765,1,s": "Pacific/Chatham",
                    "780,0": "Pacific/Tongatapu",
                    "780,1,s": "Pacific/Apia",
                    "840,0": "Pacific/Kiritimati"
                };
                b.jstz = c
            })()
        }),
        ya = window,
        R = navigator,
        qb = screen,
        pb = document,
        hb = ra(function(a) {
            (function() {
                var b = {
                    rotl: function(a,
                        b) {
                        return a << b | a >>> 32 - b
                    },
                    rotr: function(a, b) {
                        return a << 32 - b | a >>> b
                    },
                    endian: function(a) {
                        if (a.constructor == Number) return b.rotl(a, 8) & 16711935 | b.rotl(a, 24) & 4278255360;
                        for (var c = 0; c < a.length; c++) a[c] = b.endian(a[c]);
                        return a
                    },
                    randomBytes: function(a) {
                        for (var b = []; 0 < a; a--) b.push(Math.floor(256 * Math.random()));
                        return b
                    },
                    bytesToWords: function(a) {
                        for (var b = [], c = 0, f = 0; c < a.length; c++, f += 8) b[f >>> 5] |= a[c] << 24 - f % 32;
                        return b
                    },
                    wordsToBytes: function(a) {
                        for (var b = [], c = 0; c < 32 * a.length; c += 8) b.push(a[c >>> 5] >>> 24 - c % 32 & 255);
                        return b
                    },
                    bytesToHex: function(a) {
                        for (var b = [], c = 0; c < a.length; c++) b.push((a[c] >>> 4).toString(16)), b.push((a[c] & 15).toString(16));
                        return b.join("")
                    },
                    hexToBytes: function(a) {
                        for (var b = [], c = 0; c < a.length; c += 2) b.push(parseInt(a.substr(c, 2), 16));
                        return b
                    },
                    bytesToBase64: function(a) {
                        for (var b = [], c = 0; c < a.length; c += 3)
                            for (var f = a[c] << 16 | a[c + 1] << 8 | a[c + 2], h = 0; 4 > h; h++) 8 * c + 6 * h <= 8 * a.length ? b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f >>> 6 * (3 - h) & 63)) : b.push("=");
                        return b.join("")
                    },
                    base64ToBytes: function(a) {
                        a = a.replace(/[^A-Z0-9+\/]/ig, "");
                        for (var b = [], c = 0, f = 0; c < a.length; f = ++c % 4) 0 != f && b.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c - 1)) & Math.pow(2, -2 * f + 8) - 1) << 2 * f | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c)) >>> 6 - 2 * f);
                        return b
                    }
                };
                a.exports = b
            })()
        }),
        Bb = {
            utf8: {
                stringToBytes: function(a) {
                    return Bb.bin.stringToBytes(unescape(encodeURIComponent(a)))
                },
                bytesToString: function(a) {
                    return decodeURIComponent(escape(Bb.bin.bytesToString(a)))
                }
            },
            bin: {
                stringToBytes: function(a) {
                    for (var b = [], c = 0; c < a.length; c++) b.push(a.charCodeAt(c) & 255);
                    return b
                },
                bytesToString: function(a) {
                    for (var b = [], c = 0; c < a.length; c++) b.push(String.fromCharCode(a[c]));
                    return b.join("")
                }
            }
        },
        gd = Bb,
        Yd = ra(function(a) {
            (function() {
                var b = gd.utf8,
                    c = gd.bin,
                    e = function(a) {
                        a.constructor == String && (a = b.stringToBytes(a));
                        var c = hb.bytesToWords(a),
                            d = 8 * a.length;
                        a = [];
                        var e = 1732584193,
                            f = -271733879,
                            n = -1732584194,
                            q = 271733878,
                            m = -1009589776;
                        c[d >> 5] |= 128 << 24 - d % 32;
                        c[(d + 64 >>> 9 << 4) + 15] = d;
                        for (d = 0; d < c.length; d +=
                            16) {
                            for (var r = e, u = f, C = n, B = q, D = m, w = 0; 80 > w; w++) {
                                if (16 > w) a[w] = c[d + w];
                                else {
                                    var y = a[w - 3] ^ a[w - 8] ^ a[w - 14] ^ a[w - 16];
                                    a[w] = y << 1 | y >>> 31
                                }
                                y = (e << 5 | e >>> 27) + m + (a[w] >>> 0) + (20 > w ? (f & n | ~f & q) + 1518500249 : 40 > w ? (f ^ n ^ q) + 1859775393 : 60 > w ? (f & n | f & q | n & q) - 1894007588 : (f ^ n ^ q) - 899497514);
                                m = q;
                                q = n;
                                n = f << 30 | f >>> 2;
                                f = e;
                                e = y
                            }
                            e += r;
                            f += u;
                            n += C;
                            q += B;
                            m += D
                        }
                        return [e, f, n, q, m]
                    },
                    d = function(a, b) {
                        a = hb.wordsToBytes(e(a));
                        return b && b.asBytes ? a : b && b.asString ? c.bytesToString(a) : hb.bytesToHex(a)
                    };
                d._blocksize = 16;
                d._digestsize = 20;
                a.exports = d
            })()
        }),
        $e = Math.max,
        Bd = function(a) {
            return function(b, c, e) {
                var d = Object(b);
                if (!Da(b)) {
                    var f = Fa(c);
                    b = La(b);
                    c = function(a) {
                        return f(d[a], a, d)
                    }
                }
                c = a(b, c, e);
                return -1 < c ? d[f ? b[c] : c] : void 0
            }
        }(function(a, b, c) {
            var e = null == a ? 0 : a.length;
            if (!e) return -1;
            c = null == c ? 0 : ec(c);
            0 > c && (c = $e(e + c, 0));
            a: {
                b = Fa(b);e = a.length;
                for (c += -1; ++c < e;)
                    if (b(a[c], c, a)) {
                        a = c;
                        break a
                    }
                a = -1
            }
            return a
        }),
        Dd = window,
        hd = function() {
            try {
                var a = la(Object, "defineProperty");
                a({}, "", {});
                return a
            } catch (b) {}
        }(),
        Fd = function(a, b) {
            var c = {};
            b = Fa(b);
            Uc(a, function(a, d, f) {
                a = b(a, d, f);
                "__proto__" == d && hd ? hd(c, d, {
                    configurable: !0,
                    enumerable: !0,
                    value: a,
                    writable: !0
                }) : c[d] = a
            });
            return c
        },
        Hd = function(a) {
            return function() {
                try {
                    return a.apply(this, arguments)
                } catch (b) {}
            }
        },
        id = ra(function(a) {
            var b = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
            if (b) {
                var c = new Uint8Array(16);
                a.exports = function() {
                    b(c);
                    return c
                }
            } else {
                var e = Array(16);
                a.exports = function() {
                    for (var a = 0, b; 16 > a; a++) 0 === (a & 3) && (b = 4294967296 * Math.random()), e[a] = b >>> ((a & 3) << 3) & 255;
                    return e
                }
            }
        }),
        B = [],
        Ga = 0;
    for (; 256 > Ga; ++Ga) B[Ga] = (Ga + 256).toString(16).substr(1);
    var jd = function(a, b) {
            b = b || 0;
            return [B[a[b++]], B[a[b++]], B[a[b++]], B[a[b++]], "-", B[a[b++]], B[a[b++]], "-", B[a[b++]], B[a[b++]], "-", B[a[b++]], B[a[b++]], "-", B[a[b++]], B[a[b++]], B[a[b++]], B[a[b++]], B[a[b++]], B[a[b++]]].join("")
        },
        kd, Cb, ib = 0,
        Db = 0,
        P = function(a, b, c) {
            c = b && c || 0;
            "string" == typeof a && (b = "binary" === a ? Array(16) : null,
                a = null);
            a = a || {};
            a = a.random || (a.rng || id)();
            a[6] = a[6] & 15 | 64;
            a[8] = a[8] & 63 | 128;
            if (b)
                for (var e = 0; 16 > e; ++e) b[c + e] = a[e];
            return b || jd(a)
        },
        Eb = P;
    Eb.v1 = function(a, b, c) {
        c = b && c || 0;
        var e = b || [];
        a = a || {};
        var d = a.node || kd,
            f = void 0 !== a.clockseq ? a.clockseq : Cb;
        if (null == d || null == f) {
            var h = id();
            null == d && (d = kd = [h[0] | 1, h[1], h[2], h[3], h[4], h[5]]);
            null == f && (f = Cb = (h[6] << 8 | h[7]) & 16383)
        }
        h = void 0 !== a.msecs ? a.msecs : (new Date).getTime();
        var g = void 0 !== a.nsecs ? a.nsecs : Db + 1,
            k = h - ib + (g - Db) / 1E4;
        0 > k && void 0 === a.clockseq && (f = f + 1 & 16383);
        (0 > k || h > ib) && void 0 === a.nsecs && (g = 0);
        if (1E4 <= g) throw Error("uuid.v1(): Can't create more than 10M uuids/sec");
        ib = h;
        Db = g;
        Cb = f;
        h += 122192928E5;
        a = (1E4 * (h & 268435455) + g) % 4294967296;
        e[c++] = a >>> 24 & 255;
        e[c++] = a >>> 16 & 255;
        e[c++] = a >>> 8 & 255;
        e[c++] = a & 255;
        a = h / 4294967296 * 1E4 & 268435455;
        e[c++] = a >>> 8 & 255;
        e[c++] = a & 255;
        e[c++] = a >>> 24 & 15 | 16;
        e[c++] = a >>> 16 & 255;
        e[c++] = f >>> 8 | 128;
        e[c++] = f & 255;
        for (f = 0; 6 > f; ++f) e[c + f] = d[f];
        return b ? b : jd(e)
    };
    Eb.v4 = P;
    var Vd = Eb,
        af = Object.prototype.hasOwnProperty,
        Kb = function(a, b) {
            return null != a && af.call(a,
                b)
        },
        bf = function(a, b) {
            for (var c = -1, e = null == a ? 0 : a.length; ++c < e;)
                if (!b(a[c], c, a)) return !1;
            return !0
        },
        cf = function(a, b) {
            var c = !0;
            Ea(a, function(a, d, f) {
                return c = !!b(a, d, f)
            });
            return c
        },
        Lb = function(a, b, c) {
            var e = u(a) ? bf : cf,
                d;
            if (d = c)
                if (d = b, I(c)) {
                    var f = D(d);
                    d = ("number" == f ? Da(c) && Xa(d, c.length) : "string" == f && d in c) ? Za(c[d], a) : !1
                } else d = !1;
            d && (b = void 0);
            return e(a, Fa(b))
        },
        Ic = function(a) {
            for (var b = -1, c = null == a ? 0 : a.length, e = 0, d = []; ++b < c;) {
                var f = a[b];
                f && (d[e++] = f)
            }
            return d
        },
        Pd = Sc(Object.getPrototypeOf, Object),
        Cc = Function.prototype.toString,
        Qd = Object.prototype.hasOwnProperty,
        Rd = Cc.call(Object),
        V = window;
    if (V.GlobalSnowplowNamespace && 0 < V.GlobalSnowplowNamespace.length) {
        var ld = V.GlobalSnowplowNamespace.shift();
        var md = V[ld];
        md.q = new Jc(md.q, ld)
    } else V._snaq = V._snaq || [], V._snaq = new Jc(V._snaq, "_snaq")
})()