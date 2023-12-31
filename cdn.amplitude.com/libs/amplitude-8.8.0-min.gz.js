var amplitude = function() {
    "use strict";

    function t(e) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function i(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function y(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {},
                i = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable
            }))), i.forEach(function(e) {
                r(t, e, n[e])
            })
        }
        return t
    }

    function n(e) {
        return function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
        }(e) || function(e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
        }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    var e, o, s, a, u, c;
    (e = {}).SET = "$set", e.SET_ONCE = "$setOnce", e.ADD = "$add", e.APPEND = "$append", e.PREPEND = "$prepend", e.REMOVE = "$remove", e.PREINSERT = "$preinsert", e.POSTINSERT = "$postinsert", e.UNSET = "$unset", e.CLEAR_ALL = "$clearAll", (s = o = o || {})[s.None = 0] = "None", s[s.Error = 1] = "Error", s[s.Warn = 2] = "Warn", s[s.Verbose = 3] = "Verbose", (u = a = a || {}).Unknown = "unknown", u.Skipped = "skipped", u.Success = "success", u.RateLimit = "rate_limit", u.PayloadTooLarge = "payload_too_large", u.Invalid = "invalid", u.Failed = "failed", (c = a = a || {}).fromHttpCode = function(e) {
        return 200 <= e && e < 300 ? c.Success : 429 === e ? c.RateLimit : 413 === e ? c.PayloadTooLarge : 400 <= e && e < 500 ? c.Invalid : 500 <= e ? c.Failed : c.Unknown
    };
    a.Skipped;

    function p() {
        return "object" == typeof window && void 0 !== (null === window || void 0 === window ? void 0 : window.document)
    }
    var l, d = {},
        h = ((l = function() {
            return "object" == typeof process && void 0 !== (null === (e = null === process || void 0 === process ? void 0 : process.versions) || void 0 === e ? void 0 : e.node) ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : d;
            var e
        }()).__AMPLITUDE__ = l.__AMPLITUDE__ || {}, l.__AMPLITUDE__),
        f = "Amplitude Logger ",
        v = (g.prototype.disable = function() {
            this._logLevel = 0
        }, g.prototype.enable = function(e) {
            void 0 === e && (e = o.Warn), this._logLevel = e
        }, g.prototype.log = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            this._logLevel < o.Verbose || global.console.log(f + "[Log]: " + e.join(" "))
        }, g.prototype.warn = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            this._logLevel < o.Warn || global.console.warn(f + "[Warn]: " + e.join(" "))
        }, g.prototype.error = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            this._logLevel < o.Error || global.console.error(f + "[Error]: " + e.join(" "))
        }, g);

    function g() {
        this._logLevel = 0
    }
    h.logger || (h.logger = new v);
    var m = {
            DEFAULT_INSTANCE: "$default_instance",
            API_VERSION: 2,
            MAX_STRING_LENGTH: 4096,
            MAX_PROPERTY_KEYS: 1e3,
            IDENTIFY_EVENT: "$identify",
            GROUP_IDENTIFY_EVENT: "$groupidentify",
            LAST_EVENT_ID: "amplitude_lastEventId",
            LAST_EVENT_TIME: "amplitude_lastEventTime",
            LAST_IDENTIFY_ID: "amplitude_lastIdentifyId",
            LAST_SEQUENCE_NUMBER: "amplitude_lastSequenceNumber",
            SESSION_ID: "amplitude_sessionId",
            DEVICE_ID: "amplitude_deviceId",
            OPT_OUT: "amplitude_optOut",
            USER_ID: "amplitude_userId",
            DEVICE_ID_INDEX: 0,
            USER_ID_INDEX: 1,
            OPT_OUT_INDEX: 2,
            SESSION_ID_INDEX: 3,
            LAST_EVENT_TIME_INDEX: 4,
            EVENT_ID_INDEX: 5,
            IDENTIFY_ID_INDEX: 6,
            SEQUENCE_NUMBER_INDEX: 7,
            COOKIE_TEST_PREFIX: "amp_cookie_test",
            COOKIE_PREFIX: "amp",
            STORAGE_DEFAULT: "",
            STORAGE_COOKIES: "cookies",
            STORAGE_NONE: "none",
            STORAGE_LOCAL: "localStorage",
            STORAGE_SESSION: "sessionStorage",
            REVENUE_EVENT: "revenue_amount",
            REVENUE_PRODUCT_ID: "$productId",
            REVENUE_QUANTITY: "$quantity",
            REVENUE_PRICE: "$price",
            REVENUE_REVENUE_TYPE: "$revenueType",
            AMP_DEVICE_ID_PARAM: "amp_device_id",
            REFERRER: "referrer",
            UTM_SOURCE: "utm_source",
            UTM_MEDIUM: "utm_medium",
            UTM_CAMPAIGN: "utm_campaign",
            UTM_TERM: "utm_term",
            UTM_CONTENT: "utm_content",
            ATTRIBUTION_EVENT: "[Amplitude] Attribution Captured",
            TRANSPORT_HTTP: "http",
            TRANSPORT_BEACON: "beacon"
        },
        _ = function(e) {
            for (var t = "", n = 0; n < e.length; n++) {
                var i = e.charCodeAt(n);
                i < 128 ? t += String.fromCharCode(i) : (127 < i && i < 2048 ? t += String.fromCharCode(i >> 6 | 192) : (t += String.fromCharCode(i >> 12 | 224), t += String.fromCharCode(i >> 6 & 63 | 128)), t += String.fromCharCode(63 & i | 128))
            }
            return t
        },
        b = function(e) {
            for (var t, n, i = "", o = 0, r = 0; o < e.length;)(t = e.charCodeAt(o)) < 128 ? (i += String.fromCharCode(t), o++) : 191 < t && t < 224 ? (r = e.charCodeAt(o + 1), i += String.fromCharCode((31 & t) << 6 | 63 & r), o += 2) : (r = e.charCodeAt(o + 1), n = e.charCodeAt(o + 2), i += String.fromCharCode((15 & t) << 12 | (63 & r) << 6 | 63 & n), o += 3);
            return i
        },
        w = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(e) {
                try {
                    if (window.btoa && window.atob) return window.btoa(unescape(encodeURIComponent(e)))
                } catch (e) {}
                return w._encode(e)
            },
            _encode: function(e) {
                var t, n, i, o, r, s, a, u = "",
                    c = 0;
                for (e = _(e); c < e.length;) o = (t = e.charCodeAt(c++)) >> 2, r = (3 & t) << 4 | (n = e.charCodeAt(c++)) >> 4, s = (15 & n) << 2 | (i = e.charCodeAt(c++)) >> 6, a = 63 & i, isNaN(n) ? s = a = 64 : isNaN(i) && (a = 64), u = u + w._keyStr.charAt(o) + w._keyStr.charAt(r) + w._keyStr.charAt(s) + w._keyStr.charAt(a);
                return u
            },
            decode: function(e) {
                try {
                    if (window.btoa && window.atob) return decodeURIComponent(escape(window.atob(e)))
                } catch (e) {}
                return w._decode(e)
            },
            _decode: function(e) {
                var t, n, i, o, r, s, a = "",
                    u = 0;
                for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); u < e.length;) t = w._keyStr.indexOf(e.charAt(u++)) << 2 | (o = w._keyStr.indexOf(e.charAt(u++))) >> 4, n = (15 & o) << 4 | (r = w._keyStr.indexOf(e.charAt(u++))) >> 2, i = (3 & r) << 6 | (s = w._keyStr.indexOf(e.charAt(u++))), a += String.fromCharCode(t), 64 !== r && (a += String.fromCharCode(n)), 64 !== s && (a += String.fromCharCode(i));
                return a = b(a)
            }
        },
        E = Object.prototype.toString;

    function I(e) {
        switch (E.call(e)) {
            case "[object Date]":
                return "date";
            case "[object RegExp]":
                return "regexp";
            case "[object Arguments]":
                return "arguments";
            case "[object Array]":
                return "array";
            case "[object Error]":
                return "error"
        }
        return null === e ? "null" : void 0 === e ? "undefined" : e != e ? "nan" : e && 1 === e.nodeType ? "element" : "undefined" != typeof Buffer && "function" == typeof Buffer.isBuffer && Buffer.isBuffer(e) ? "buffer" : t(e = e.valueOf ? e.valueOf() : Object.prototype.valueOf.apply(e))
    }

    function S(e, t, n) {
        return I(e) === n || (q.error("Invalid " + t + " input type. Expected " + n + " but received " + I(e)), !1)
    }

    function O(e) {
        var t = I(e);
        if ("object" !== t) return q.error("Error: invalid properties format. Expecting Javascript object, received " + t + ", ignoring"), {};
        if (Object.keys(e).length > m.MAX_PROPERTY_KEYS) return q.error("Error: too many properties (more than 1000), ignoring"), {};
        var n, i, o, r = {};
        for (var s in e) {
            Object.prototype.hasOwnProperty.call(e, s) && ("string" !== (i = I(n = s)) && (n = String(n), q.warn("WARNING: Non-string property key, received type " + i + ', coercing to string "' + n + '"')), null !== (o = G(n, e[s])) && (r[n] = o))
        }
        return r
    }

    function N() {
        for (var e = "", t = 0; t < 22; ++t) e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(Math.floor(64 * Math.random()));
        return e
    }

    function T(e) {
        try {
            for (var t = document.cookie.split(";"), n = null, i = 0; i < t.length; i++) {
                for (var o = t[i];
                    " " === o.charAt(0);) o = o.substring(1, o.length);
                if (0 === o.indexOf(e)) {
                    n = o.substring(e.length, o.length);
                    break
                }
            }
            return n
        } catch (e) {
            return null
        }
    }

    function k(e, t, n) {
        var i, o = null !== t ? n.expirationDays : -1;
        o && ((i = new Date).setTime(i.getTime() + 24 * o * 60 * 60 * 1e3), o = i);
        var r = e + "=" + t;
        o && (r += "; expires=" + o.toUTCString()), r += "; path=/", n.domain && (r += "; domain=" + n.domain), n.secure && (r += "; Secure"), n.sameSite && (r += "; SameSite=" + n.sameSite), document.cookie = r
    }

    function A(e) {
        var t, n = 0 < arguments.length && void 0 !== e ? e : "",
            i = n.split(".")[m.LAST_EVENT_TIME_INDEX];
        return i && (t = parseInt(i, 32)), t || (z.warn("unable to parse malformed cookie: ".concat(n)), 0)
    }

    function R(e) {
        var t = document.createElement("a");
        return t.href = e, t.hostname || location.hostname
    }

    function C(e) {
        var t = "";
        return ne.domain && (t = "." === ne.domain.charAt(0) ? ne.domain.substring(1) : ne.domain), e + t
    }
    var x, P, D, U = {
            DISABLE: 0,
            ERROR: 1,
            WARN: 2,
            INFO: 3
        },
        j = U.WARN,
        q = {
            error: function(e) {
                U.ERROR <= j && M(e)
            },
            warn: function(e) {
                U.WARN <= j && M(e)
            },
            info: function(e) {
                U.INFO <= j && M(e)
            }
        },
        M = function(e) {
            try {
                console.log("[Amplitude] " + e)
            } catch (e) {}
        },
        V = function(e) {
            return "string" === I(e) && e.length > m.MAX_STRING_LENGTH ? e.substring(0, m.MAX_STRING_LENGTH) : e
        },
        L = ["nan", "function", "arguments", "regexp", "element"],
        G = function e(t, n) {
            var i = I(n);
            if (-1 !== L.indexOf(i)) q.warn('WARNING: Property key "' + t + '" with invalid value type ' + i + ", ignoring"), n = null;
            else if ("undefined" === i) n = null;
            else if ("error" === i) n = String(n), q.warn('WARNING: Property key "' + t + '" with value type error, coercing to ' + n);
            else if ("array" === i) {
                for (var o = [], r = 0; r < n.length; r++) {
                    var s = n[r],
                        a = I(s);
                    "array" !== a ? "object" === a ? o.push(O(s)) : o.push(e(t, s)) : q.warn("WARNING: Cannot have " + a + " nested in an array property value, skipping")
                }
                n = o
            } else "object" === i && (n = O(n));
            return n
        },
        K = function(e, t) {
            var n = I(t);
            if ("string" === n) return t;
            if ("date" === n || "number" === n || "boolean" === n) return t = String(t), q.warn("WARNING: Non-string groupName, received type " + n + ', coercing to string "' + t + '"'), t;
            if ("array" === n) {
                for (var i = [], o = 0; o < t.length; o++) {
                    var r = t[o],
                        s = I(r);
                    "array" !== s && "object" !== s ? "string" === s ? i.push(r) : "date" !== s && "number" !== s && "boolean" !== s || (r = String(r), q.warn("WARNING: Non-string groupName, received type " + s + ', coercing to string "' + r + '"'), i.push(r)) : q.warn("WARNING: Skipping nested " + s + " in array groupName")
                }
                return i
            }
            q.warn("WARNING: Non-string groupName, received type " + n + ". Please use strings or array of strings for groupName")
        },
        F = function(e) {
            Object.prototype.hasOwnProperty.call(U, e) && (j = U[e])
        },
        z = q,
        B = function(e) {
            return !e || 0 === e.length
        },
        X = function(e, t) {
            e = e.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
            var n = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(t);
            return null === n ? void 0 : decodeURIComponent(n[1].replace(/\+/g, " "))
        },
        W = function e(t) {
            if ("array" === I(t))
                for (var n = 0; n < t.length; n++) t[n] = e(t[n]);
            else if ("object" === I(t))
                for (var i in t) i in t && (t[i] = e(t[i]));
            else t = V(t);
            return t
        },
        $ = function(e) {
            var t = I(e);
            if ("object" !== t) return q.error("Error: invalid groups format. Expecting Javascript object, received " + t + ", ignoring"), {};
            var n, i, o, r = {};
            for (var s in e) {
                Object.prototype.hasOwnProperty.call(e, s) && ("string" !== (i = I(n = s)) && (n = String(n), q.warn("WARNING: Non-string groupType, received type " + i + ', coercing to string "' + n + '"')), null !== (o = K(n, e[s])) && (r[n] = o))
            }
            return r
        },
        H = S,
        Y = O,
        J = function(e) {
            return !!S(e, "deviceId", "string") && (!e.includes(".") || (q.error("Device IDs may not contain '.' characters. Value will be ignored: \"".concat(e, '"')), !1))
        },
        Q = function(e) {
            return !!S(e, "transport", "string") && (e !== m.TRANSPORT_HTTP && e !== m.TRANSPORT_BEACON ? (q.error("transport value must be one of '".concat(m.TRANSPORT_BEACON, "' or '").concat(m.TRANSPORT_HTTP, "'")), !1) : !(e !== m.TRANSPORT_HTTP && !navigator.sendBeacon) || (q.error("browser does not support sendBeacon, so transport must be HTTP"), !1))
        },
        Z = function() {
            return window.location
        },
        ee = {
            set: k,
            get: T,
            getAll: function(e) {
                try {
                    var t = document.cookie.split(";").map(function(e) {
                            return e.trimStart()
                        }),
                        n = [],
                        i = !0,
                        o = !1,
                        r = void 0;
                    try {
                        for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done); i = !0) {
                            for (var u = s.value;
                                " " === u.charAt(0);) u = u.substring(1);
                            0 === u.indexOf(e) && n.push(u.substring(e.length))
                        }
                    } catch (e) {
                        o = !0, r = e
                    } finally {
                        try {
                            i || null == a.return || a.return()
                        } finally {
                            if (o) throw r
                        }
                    }
                    return n
                } catch (e) {
                    return []
                }
            },
            getLastEventTime: A,
            sortByEventTime: function(e) {
                return n(e).sort(function(e, t) {
                    var n = A(e);
                    return A(t) - n
                })
            },
            areCookiesEnabled: function(e) {
                var t = 0 < arguments.length && void 0 !== e ? e : {},
                    n = m.COOKIE_TEST_PREFIX + N(),
                    i = !1;
                try {
                    var o = String(new Date);
                    k(n, o, t), z.info("Testing if cookies available"), i = T(n + "=") === o
                } catch (e) {
                    z.warn('Error thrown when checking for cookies. Reason: "'.concat(e, '"'))
                } finally {
                    z.info("Cleaning up cookies availability test"), k(n, null, t)
                }
                return i
            }
        },
        te = function(e) {
            for (var t = R(e).split("."), n = [], i = "_tldtest_" + N(), o = t.length - 2; 0 <= o; --o) n.push(t.slice(o).join("."));
            for (var r = 0; r < n.length; ++r) {
                var s = n[r],
                    a = {
                        domain: "." + s
                    };
                if (ee.set(i, 1, a), ee.get(i)) return ee.set(i, null, a), s
            }
            return ""
        },
        ne = {
            expirationDays: void 0,
            domain: void 0
        },
        ie = function(e) {
            var t = C(e) + "=",
                n = ee.get(t);
            try {
                if (n) return JSON.parse(w.decode(n))
            } catch (e) {
                return null
            }
            return null
        },
        oe = function(e, t) {
            try {
                return ee.set(C(e), w.encode(JSON.stringify(t)), ne), !0
            } catch (e) {
                return !1
            }
        },
        re = function(e) {
            try {
                return ee.set(C(e), null, ne), !0
            } catch (e) {
                return !1
            }
        },
        se = {
            reset: function() {
                ne = {
                    expirationDays: void 0,
                    domain: void 0
                }
            },
            options: function(e) {
                if (0 === arguments.length) return ne;
                e = e || {}, ne.expirationDays = e.expirationDays, ne.secure = e.secure, ne.sameSite = e.sameSite;
                var t = B(e.domain) ? "." + te(Z().href) : e.domain,
                    n = Math.random();
                ne.domain = t, oe("amplitude_test", n);
                var i = ie("amplitude_test");
                return i && i === n || (t = null), re("amplitude_test"), ne.domain = t, ne
            },
            get: ie,
            set: oe,
            remove: re,
            setRaw: function(e, t) {
                try {
                    return ee.set(C(e), t, ne), !0
                } catch (e) {
                    return !1
                }
            },
            getRaw: function(e) {
                var t = C(e) + "=";
                return ee.get(t)
            }
        };
    if (function() {
            var e, t = new Date;
            try {
                return window.localStorage.setItem(t, t), e = window.localStorage.getItem(t) === String(t), window.localStorage.removeItem(t), e
            } catch (e) {}
            return !1
        }()) x = window.localStorage;
    else if (window.globalStorage) try {
        x = window.globalStorage[window.location.hostname]
    } catch (e) {} else {
        "undefined" != typeof document && (P = document.createElement("div"), D = "localStorage", P.style.display = "none", document.getElementsByTagName("head")[0].appendChild(P), P.addBehavior && (P.addBehavior("#default#userdata"), x = {
            length: 0,
            setItem: function(e, t) {
                P.load(D), P.getAttribute(e) || this.length++, P.setAttribute(e, t), P.save(D)
            },
            getItem: function(e) {
                return P.load(D), P.getAttribute(e)
            },
            removeItem: function(e) {
                P.load(D), P.getAttribute(e) && this.length--, P.removeAttribute(e), P.save(D)
            },
            clear: function() {
                P.load(D);
                for (var e, t = 0; e = P.XMLDocument.documentElement.attributes[t++];) P.removeAttribute(e.name);
                P.save(D), this.length = 0
            },
            key: function(e) {
                return P.load(D), P.XMLDocument.documentElement.attributes[e]
            }
        }, P.load(D), x.length = P.XMLDocument.documentElement.attributes.length))
    }

    function ae() {
        this.storage = null
    }
    var ue, ce = x = x || {
        length: 0,
        setItem: function() {},
        getItem: function() {},
        removeItem: function() {},
        clear: function() {},
        key: function() {}
    };
    ae.prototype.getStorage = function() {
        return null !== this.storage || (ee.areCookiesEnabled() ? this.storage = se : (n = "amp_cookiestore_", this.storage = {
            _options: {
                expirationDays: void 0,
                domain: void 0,
                secure: !1
            },
            reset: function() {
                this._options = {
                    expirationDays: void 0,
                    domain: void 0,
                    secure: !1
                }
            },
            options: function(e) {
                return 0 === arguments.length ? this._options : (e = e || {}, this._options.expirationDays = e.expirationDays || this._options.expirationDays, this._options.domain = e.domain || this._options.domain || window && window.location && window.location.hostname, this._options.secure = e.secure || !1)
            },
            get: function(e) {
                try {
                    return JSON.parse(ce.getItem(n + e))
                } catch (e) {}
                return null
            },
            set: function(e, t) {
                try {
                    return ce.setItem(n + e, JSON.stringify(t)), !0
                } catch (e) {}
                return !1
            },
            remove: function(e) {
                try {
                    ce.removeItem(n + e)
                } catch (e) {
                    return !1
                }
            }
        })), this.storage;
        var n
    };

    function pe(e, t) {
        function n(e, t, n, i) {
            return X(e, t) || X(n, i)
        }

        function i(e, t) {
            B(t) || (p[e] = t)
        }
        var o = e ? "?" + e.split(".").slice(-1)[0].replace(/\|/g, "&") : "",
            r = n(m.UTM_SOURCE, t, "utmcsr", o),
            s = n(m.UTM_MEDIUM, t, "utmcmd", o),
            a = n(m.UTM_CAMPAIGN, t, "utmccn", o),
            u = n(m.UTM_TERM, t, "utmctr", o),
            c = n(m.UTM_CONTENT, t, "utmcct", o),
            p = {};
        return i(m.UTM_SOURCE, r), i(m.UTM_MEDIUM, s), i(m.UTM_CAMPAIGN, a), i(m.UTM_TERM, u), i(m.UTM_CONTENT, c), p
    }

    function le() {
        this.userPropertiesOperations = {}, this.properties = []
    }
    var de = (r(ue = {}, m.STORAGE_COOKIES, !0), r(ue, m.STORAGE_NONE, !0), r(ue, m.STORAGE_LOCAL, !0), r(ue, m.STORAGE_SESSION, !0), ue),
        he = function() {
            function p(e) {
                var t = e.storageKey,
                    n = e.disableCookies,
                    i = e.domain,
                    o = e.secure,
                    r = e.sameSite,
                    s = e.expirationDays,
                    a = e.storage;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, p), this.storageKey = t, this.domain = i, this.secure = o, this.sameSite = r, this.expirationDays = s, this.cookieDomain = "";
                var u, c = te(Z().href);
                this.cookieDomain = i || (c ? "." + c : null), de[a] ? this.storage = a : (u = n || !ee.areCookiesEnabled({
                    domain: this.cookieDomain,
                    secure: this.secure,
                    sameSite: this.sameSite,
                    expirationDays: this.expirationDays
                }), this.storage = u ? m.STORAGE_LOCAL : m.STORAGE_COOKIES)
            }
            var e, t, n;
            return e = p, (t = [{
                key: "getCookieStorageKey",
                value: function() {
                    if (!this.domain) return this.storageKey;
                    var e = "." === this.domain.charAt(0) ? this.domain.substring(1) : this.domain;
                    return "".concat(this.storageKey).concat(e ? "_".concat(e) : "")
                }
            }, {
                key: "save",
                value: function(e) {
                    var t = e.deviceId,
                        n = e.userId,
                        i = e.optOut,
                        o = e.sessionId,
                        r = e.lastEventTime,
                        s = e.eventId,
                        a = e.identifyId,
                        u = e.sequenceNumber;
                    if (this.storage !== m.STORAGE_NONE) {
                        var c = [t, w.encode(n || ""), i ? "1" : "", o ? o.toString(32) : "0", r ? r.toString(32) : "0", s ? s.toString(32) : "0", a ? a.toString(32) : "0", u ? u.toString(32) : "0"].join(".");
                        switch (this.storage) {
                            case m.STORAGE_SESSION:
                                window.sessionStorage && window.sessionStorage.setItem(this.storageKey, c);
                                break;
                            case m.STORAGE_LOCAL:
                                ce.setItem(this.storageKey, c);
                                break;
                            case m.STORAGE_COOKIES:
                                this.saveCookie(c)
                        }
                    }
                }
            }, {
                key: "saveCookie",
                value: function(e) {
                    ee.set(this.getCookieStorageKey(), e, {
                        domain: this.cookieDomain,
                        secure: this.secure,
                        sameSite: this.sameSite,
                        expirationDays: this.expirationDays
                    })
                }
            }, {
                key: "load",
                value: function() {
                    var e, t, n, i, o = this;
                    if (this.storage === m.STORAGE_COOKIES && (e = this.getCookieStorageKey() + "=", i = 0 === (t = ee.getAll(e)).length || 1 === t.length ? t[0] : (n = ee.sortByEventTime(t)[0], t.forEach(function() {
                            return ee.set(o.getCookieStorageKey(), null, {})
                        }), this.saveCookie(n), ee.get(e))), !(i = i || ce.getItem(this.storageKey))) try {
                        i = window.sessionStorage && window.sessionStorage.getItem(this.storageKey)
                    } catch (e) {
                        z.info('window.sessionStorage unavailable. Reason: "'.concat(e, '"'))
                    }
                    if (!i) return null;
                    var r = i.split("."),
                        s = null;
                    if (r[m.USER_ID_INDEX]) try {
                        s = w.decode(r[m.USER_ID_INDEX])
                    } catch (e) {
                        s = null
                    }
                    return {
                        deviceId: r[m.DEVICE_ID_INDEX],
                        userId: s,
                        optOut: "1" === r[m.OPT_OUT_INDEX],
                        sessionId: parseInt(r[m.SESSION_ID_INDEX], 32),
                        lastEventTime: parseInt(r[m.LAST_EVENT_TIME_INDEX], 32),
                        eventId: parseInt(r[m.EVENT_ID_INDEX], 32),
                        identifyId: parseInt(r[m.IDENTIFY_ID_INDEX], 32),
                        sequenceNumber: parseInt(r[m.SEQUENCE_NUMBER_INDEX], 32)
                    }
                }
            }, {
                key: "clear",
                value: function() {
                    var e;
                    if (this.storage === m.STORAGE_COOKIES && (e = ee.get(this.getCookieStorageKey() + "="), ee.set(this.getCookieStorageKey(), null, {
                            domain: this.cookieDomain,
                            secure: this.secure,
                            sameSite: this.sameSite,
                            expirationDays: 0
                        })), e || (e = ce.getItem(this.storageKey), ce.clear()), !e) try {
                        e = window.sessionStorage && window.sessionStorage.getItem(this.storageKey), window.sessionStorage.clear()
                    } catch (e) {
                        z.info('window.sessionStorage unavailable. Reason: "'.concat(e, '"'))
                    }
                    return !!e
                }
            }]) && i(e.prototype, t), n && i(e, n), p
        }(),
        fe = "$clearAll";
    le.prototype.add = function(e, t) {
        return "number" === I(t) || "string" === I(t) ? this._addOperation("$add", e, t) : z.error("Unsupported type for value: " + I(t) + ", expecting number or string"), this
    }, le.prototype.append = function(e, t) {
        return this._addOperation("$append", e, t), this
    }, le.prototype.clearAll = function() {
        return 0 < Object.keys(this.userPropertiesOperations).length ? Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, fe) || z.error("Need to send $clearAll on its own Identify object without any other operations, skipping $clearAll") : this.userPropertiesOperations[fe] = "-", this
    }, le.prototype.prepend = function(e, t) {
        return this._addOperation("$prepend", e, t), this
    }, le.prototype.set = function(e, t) {
        return this._addOperation("$set", e, t), this
    }, le.prototype.setOnce = function(e, t) {
        return this._addOperation("$setOnce", e, t), this
    }, le.prototype.unset = function(e) {
        return this._addOperation("$unset", e, "-"), this
    }, le.prototype.preInsert = function(e, t) {
        return this._addOperation("$preInsert", e, t), this
    }, le.prototype.postInsert = function(e, t) {
        return this._addOperation("$postInsert", e, t), this
    }, le.prototype.remove = function(e, t) {
        return this._addOperation("$remove", e, t), this
    }, le.prototype._addOperation = function(e, t, n) {
        Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, fe) ? z.error("This identify already contains a $clearAll operation, skipping operation " + e) : -1 === this.properties.indexOf(t) ? (Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, e) || (this.userPropertiesOperations[e] = {}), this.userPropertiesOperations[e][t] = n, this.properties.push(t)) : z.error('User property "' + t + '" already used in this identify, skipping operation ' + e)
    };
    var ve = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function ge(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var _e = ge(function(e) {
            function l(e, t) {
                var n = (65535 & e) + (65535 & t);
                return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
            }

            function a(e, t, n, i, o, r) {
                return l((s = l(l(t, e), l(i, r))) << (a = o) | s >>> 32 - a, n);
                var s, a
            }

            function d(e, t, n, i, o, r, s) {
                return a(t & n | ~t & i, e, t, o, r, s)
            }

            function h(e, t, n, i, o, r, s) {
                return a(t & i | n & ~i, e, t, o, r, s)
            }

            function f(e, t, n, i, o, r, s) {
                return a(t ^ n ^ i, e, t, o, r, s)
            }

            function v(e, t, n, i, o, r, s) {
                return a(n ^ (t | ~i), e, t, o, r, s)
            }

            function u(e, t) {
                var n, i, o, r;
                e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
                for (var s = 1732584193, a = -271733879, u = -1732584194, c = 271733878, p = 0; p < e.length; p += 16) s = d(n = s, i = a, o = u, r = c, e[p], 7, -680876936), c = d(c, s, a, u, e[p + 1], 12, -389564586), u = d(u, c, s, a, e[p + 2], 17, 606105819), a = d(a, u, c, s, e[p + 3], 22, -1044525330), s = d(s, a, u, c, e[p + 4], 7, -176418897), c = d(c, s, a, u, e[p + 5], 12, 1200080426), u = d(u, c, s, a, e[p + 6], 17, -1473231341), a = d(a, u, c, s, e[p + 7], 22, -45705983), s = d(s, a, u, c, e[p + 8], 7, 1770035416), c = d(c, s, a, u, e[p + 9], 12, -1958414417), u = d(u, c, s, a, e[p + 10], 17, -42063), a = d(a, u, c, s, e[p + 11], 22, -1990404162), s = d(s, a, u, c, e[p + 12], 7, 1804603682), c = d(c, s, a, u, e[p + 13], 12, -40341101), u = d(u, c, s, a, e[p + 14], 17, -1502002290), s = h(s, a = d(a, u, c, s, e[p + 15], 22, 1236535329), u, c, e[p + 1], 5, -165796510), c = h(c, s, a, u, e[p + 6], 9, -1069501632), u = h(u, c, s, a, e[p + 11], 14, 643717713), a = h(a, u, c, s, e[p], 20, -373897302), s = h(s, a, u, c, e[p + 5], 5, -701558691), c = h(c, s, a, u, e[p + 10], 9, 38016083), u = h(u, c, s, a, e[p + 15], 14, -660478335), a = h(a, u, c, s, e[p + 4], 20, -405537848), s = h(s, a, u, c, e[p + 9], 5, 568446438), c = h(c, s, a, u, e[p + 14], 9, -1019803690), u = h(u, c, s, a, e[p + 3], 14, -187363961), a = h(a, u, c, s, e[p + 8], 20, 1163531501), s = h(s, a, u, c, e[p + 13], 5, -1444681467), c = h(c, s, a, u, e[p + 2], 9, -51403784), u = h(u, c, s, a, e[p + 7], 14, 1735328473), s = f(s, a = h(a, u, c, s, e[p + 12], 20, -1926607734), u, c, e[p + 5], 4, -378558), c = f(c, s, a, u, e[p + 8], 11, -2022574463), u = f(u, c, s, a, e[p + 11], 16, 1839030562), a = f(a, u, c, s, e[p + 14], 23, -35309556), s = f(s, a, u, c, e[p + 1], 4, -1530992060), c = f(c, s, a, u, e[p + 4], 11, 1272893353), u = f(u, c, s, a, e[p + 7], 16, -155497632), a = f(a, u, c, s, e[p + 10], 23, -1094730640), s = f(s, a, u, c, e[p + 13], 4, 681279174), c = f(c, s, a, u, e[p], 11, -358537222), u = f(u, c, s, a, e[p + 3], 16, -722521979), a = f(a, u, c, s, e[p + 6], 23, 76029189), s = f(s, a, u, c, e[p + 9], 4, -640364487), c = f(c, s, a, u, e[p + 12], 11, -421815835), u = f(u, c, s, a, e[p + 15], 16, 530742520), s = v(s, a = f(a, u, c, s, e[p + 2], 23, -995338651), u, c, e[p], 6, -198630844), c = v(c, s, a, u, e[p + 7], 10, 1126891415), u = v(u, c, s, a, e[p + 14], 15, -1416354905), a = v(a, u, c, s, e[p + 5], 21, -57434055), s = v(s, a, u, c, e[p + 12], 6, 1700485571), c = v(c, s, a, u, e[p + 3], 10, -1894986606), u = v(u, c, s, a, e[p + 10], 15, -1051523), a = v(a, u, c, s, e[p + 1], 21, -2054922799), s = v(s, a, u, c, e[p + 8], 6, 1873313359), c = v(c, s, a, u, e[p + 15], 10, -30611744), u = v(u, c, s, a, e[p + 6], 15, -1560198380), a = v(a, u, c, s, e[p + 13], 21, 1309151649), s = v(s, a, u, c, e[p + 4], 6, -145523070), c = v(c, s, a, u, e[p + 11], 10, -1120210379), u = v(u, c, s, a, e[p + 2], 15, 718787259), a = v(a, u, c, s, e[p + 9], 21, -343485551), s = l(s, n), a = l(a, i), u = l(u, o), c = l(c, r);
                return [s, a, u, c]
            }

            function c(e) {
                for (var t = "", n = 32 * e.length, i = 0; i < n; i += 8) t += String.fromCharCode(e[i >> 5] >>> i % 32 & 255);
                return t
            }

            function p(e) {
                var t = [];
                for (t[(e.length >> 2) - 1] = void 0, i = 0; i < t.length; i += 1) t[i] = 0;
                for (var n = 8 * e.length, i = 0; i < n; i += 8) t[i >> 5] |= (255 & e.charCodeAt(i / 8)) << i % 32;
                return t
            }

            function i(e) {
                for (var t, n = "0123456789abcdef", i = "", o = 0; o < e.length; o += 1) t = e.charCodeAt(o), i += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
                return i
            }

            function n(e) {
                return unescape(encodeURIComponent(e))
            }

            function o(e) {
                return c(u(p(t = n(e)), 8 * t.length));
                var t
            }

            function r(e, t) {
                return function(e, t) {
                    var n, i, o = p(e),
                        r = [],
                        s = [];
                    for (r[15] = s[15] = void 0, 16 < o.length && (o = u(o, 8 * e.length)), n = 0; n < 16; n += 1) r[n] = 909522486 ^ o[n], s[n] = 1549556828 ^ o[n];
                    return i = u(r.concat(p(t)), 512 + 8 * t.length), c(u(s.concat(i), 640))
                }(n(e), n(t))
            }

            function t(e, t, n) {
                return t ? n ? r(t, e) : i(r(t, e)) : n ? o(e) : i(o(e))
            }
            var s;
            s = ve, e.exports ? e.exports = t : s.md5 = t
        }),
        ye = function(e) {
            return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
                return "%" + e.charCodeAt(0).toString(16).toUpperCase()
            })
        },
        me = Object.getOwnPropertySymbols,
        be = Object.prototype.hasOwnProperty,
        we = Object.prototype.propertyIsEnumerable;
    var Ee = function() {
            try {
                if (!Object.assign) return;
                var e = new String("abc");
                if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return;
                for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
                if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                        return t[e]
                    }).join("")) return;
                var i = {};
                return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                    i[e] = e
                }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, i)).join("") ? void 0 : 1
            } catch (e) {
                return
            }
        }() ? Object.assign : function(e, t) {
            for (var n, i, o = function(e) {
                    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                    return Object(e)
                }(e), r = 1; r < arguments.length; r++) {
                for (var s in n = Object(arguments[r])) be.call(n, s) && (o[s] = n[s]);
                if (me) {
                    i = me(n);
                    for (var a = 0; a < i.length; a++) we.call(n, i[a]) && (o[i[a]] = n[i[a]])
                }
            }
            return o
        },
        Ie = "%[a-f0-9]{2}";
    new RegExp(Ie, "gi"), new RegExp("(" + Ie + ")+", "gi");

    function Se(e, t) {
        return t.encode ? (t.strict ? ye : encodeURIComponent)(e) : e
    }

    function Oe(e, t, n) {
        this.url = e, this.data = t || {}, this.headers = n
    }
    var Ne = function(i, o) {
        !1 === (o = Ee({
            encode: !0,
            strict: !0,
            arrayFormat: "none"
        }, o)).sort && (o.sort = function() {});
        var r = function(i) {
            switch (i.arrayFormat) {
                case "index":
                    return function(e, t, n) {
                        return null === t ? [Se(e, i), "[", n, "]"].join("") : [Se(e, i), "[", Se(n, i), "]=", Se(t, i)].join("")
                    };
                case "bracket":
                    return function(e, t) {
                        return null === t ? Se(e, i) : [Se(e, i), "[]=", Se(t, i)].join("")
                    };
                default:
                    return function(e, t) {
                        return null === t ? Se(e, i) : [Se(e, i), "=", Se(t, i)].join("")
                    }
            }
        }(o);
        return i ? Object.keys(i).sort(o.sort).map(function(t) {
            var e = i[t];
            if (void 0 === e) return "";
            if (null === e) return Se(t, o);
            if (Array.isArray(e)) {
                var n = [];
                return e.slice().forEach(function(e) {
                    void 0 !== e && n.push(r(t, e, n.length))
                }), n.join("&")
            }
            return Se(t, o) + "=" + Se(e, o)
        }).filter(function(e) {
            return 0 < e.length
        }).join("&") : ""
    };
    Oe.prototype.send = function(e) {
        var t, n;
        !!window.XDomainRequest ? ((t = new window.XDomainRequest).open("POST", this.url, !0), t.onload = function() {
            e(200, t.responseText)
        }, t.onerror = function() {
            "Request Entity Too Large" === t.responseText ? e(413, t.responseText) : e(500, t.responseText)
        }, t.ontimeout = function() {}, t.onprogress = function() {}, t.send(Ne(this.data))) : ((n = new XMLHttpRequest).open("POST", this.url, !0), n.onreadystatechange = function() {
            4 === n.readyState && e(n.status, n.responseText)
        }, function(e, t) {
            for (var n in t) e.setRequestHeader(n, t[n])
        }(n, this.headers), n.send(Ne(this.data)))
    };

    function Te() {
        this._price = null, this._productId = null, this._quantity = 1, this._revenueType = null, this._properties = null
    }
    Te.prototype.setProductId = function(e) {
        return "string" !== I(e) ? z.error("Unsupported type for productId: " + I(e) + ", expecting string") : B(e) ? z.error("Invalid empty productId") : this._productId = e, this
    }, Te.prototype.setQuantity = function(e) {
        return "number" !== I(e) ? z.error("Unsupported type for quantity: " + I(e) + ", expecting number") : this._quantity = parseInt(e), this
    }, Te.prototype.setPrice = function(e) {
        return "number" !== I(e) ? z.error("Unsupported type for price: " + I(e) + ", expecting number") : this._price = e, this
    }, Te.prototype.setRevenueType = function(e) {
        return "string" !== I(e) ? z.error("Unsupported type for revenueType: " + I(e) + ", expecting string") : this._revenueType = e, this
    }, Te.prototype.setEventProperties = function(e) {
        return "object" !== I(e) ? z.error("Unsupported type for eventProperties: " + I(e) + ", expecting object") : this._properties = Y(e), this
    }, Te.prototype._isValidRevenue = function() {
        return "number" === I(this._price) || (z.error("Invalid revenue, need to set price field"), !1)
    }, Te.prototype._toJSONObject = function() {
        var e = "object" === I(this._properties) ? this._properties : {};
        return null !== this._productId && (e[m.REVENUE_PRODUCT_ID] = this._productId), null !== this._quantity && (e[m.REVENUE_QUANTITY] = this._quantity), null !== this._price && (e[m.REVENUE_PRICE] = this._price), null !== this._revenueType && (e[m.REVENUE_REVENUE_TYPE] = this._revenueType), e
    };

    function ke(e) {
        p() || z.warn("amplitude-js will not work in a non-browser environment. If you are planning to add Amplitude to a node environment, please use @amplitude/node"), this._instanceName = B(e) ? m.DEFAULT_INSTANCE : e.toLowerCase(), this._unsentEvents = [], this._unsentIdentifys = [], this._ua = new Ae(navigator.userAgent).getResult(), this.options = y({}, Ce, {
            trackingOptions: y({}, Ce.trackingOptions)
        }), this.cookieStorage = (new ae).getStorage(), this._q = [], this._sending = !1, this._updateScheduled = !1, this._onInit = [], this._eventId = 0, this._identifyId = 0, this._lastEventTime = null, this._newSession = !1, this._sequenceNumber = 0, this._sessionId = null, this._isInitialized = !1, this._userAgent = navigator && navigator.userAgent || null
    }
    var Ae = ge(function(K, F) {
            ! function(o, l) {
                function e(e) {
                    var t = {};
                    for (var n in e) t[e[n].toUpperCase()] = e[n];
                    return t
                }

                function r(e, t) {
                    return typeof e == c && -1 !== j(t).indexOf(j(e))
                }

                function s(e, t) {
                    if (typeof e == c) return e = e.replace(/^\s+|\s+$/g, ""), typeof t == u ? e : e.substring(0, 255)
                }

                function a(e, t) {
                    for (var n, i, o, r, s, a = 0; a < t.length && !r;) {
                        for (var u = t[a], c = t[a + 1], p = n = 0; p < u.length && !r;)
                            if (r = u[p++].exec(e))
                                for (i = 0; i < c.length; i++) s = r[++n], typeof(o = c[i]) == h && 0 < o.length ? 2 == o.length ? typeof o[1] == d ? this[o[0]] = o[1].call(this, s) : this[o[0]] = o[1] : 3 == o.length ? typeof o[1] != d || o[1].exec && o[1].test ? this[o[0]] = s ? s.replace(o[1], o[2]) : l : this[o[0]] = s ? o[1].call(this, s, o[2]) : l : 4 == o.length && (this[o[0]] = s ? o[3].call(this, s.replace(o[1], o[2])) : l) : this[o] = s || l;
                        a += 2
                    }
                }

                function t(e, t) {
                    for (var n in t)
                        if (typeof t[n] == h && 0 < t[n].length) {
                            for (var i = 0; i < t[n].length; i++)
                                if (r(t[n][i], e)) return "?" === n ? l : n
                        } else if (r(t[n], e)) return "?" === n ? l : n;
                    return e
                }
                var d = "function",
                    u = "undefined",
                    h = "object",
                    c = "string",
                    p = "model",
                    f = "name",
                    v = "type",
                    g = "vendor",
                    _ = "version",
                    y = "architecture",
                    n = "console",
                    i = "mobile",
                    m = "tablet",
                    b = "smarttv",
                    w = "wearable",
                    E = "embedded",
                    I = "Amazon",
                    S = "Apple",
                    O = "BlackBerry",
                    N = "Browser",
                    T = "Chrome",
                    k = "Firefox",
                    A = "Google",
                    R = "Microsoft",
                    C = "Motorola",
                    x = "Opera",
                    P = "Samsung",
                    D = "Sony",
                    U = "Zebra",
                    j = function(e) {
                        return e.toLowerCase()
                    },
                    q = {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        10: ["NT 6.4", "NT 10.0"],
                        RT: "ARM"
                    },
                    M = {
                        browser: [
                            [/\b(?:crmo|crios)\/([\w\.]+)/i],
                            [_, [f, "Chrome"]],
                            [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                            [_, [f, "Edge"]],
                            [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],
                            [f, _],
                            [/opios[\/ ]+([\w\.]+)/i],
                            [_, [f, x + " Mini"]],
                            [/\bopr\/([\w\.]+)/i],
                            [_, [f, x]],
                            [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i],
                            [f, _],
                            [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                            [_, [f, "UC" + N]],
                            [/\bqbcore\/([\w\.]+)/i],
                            [_, [f, "WeChat(Win) Desktop"]],
                            [/micromessenger\/([\w\.]+)/i],
                            [_, [f, "WeChat"]],
                            [/konqueror\/([\w\.]+)/i],
                            [_, [f, "Konqueror"]],
                            [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                            [_, [f, "IE"]],
                            [/yabrowser\/([\w\.]+)/i],
                            [_, [f, "Yandex"]],
                            [/(avast|avg)\/([\w\.]+)/i],
                            [
                                [f, /(.+)/, "$1 Secure " + N], _
                            ],
                            [/\bfocus\/([\w\.]+)/i],
                            [_, [f, k + " Focus"]],
                            [/\bopt\/([\w\.]+)/i],
                            [_, [f, x + " Touch"]],
                            [/coc_coc\w+\/([\w\.]+)/i],
                            [_, [f, "Coc Coc"]],
                            [/dolfin\/([\w\.]+)/i],
                            [_, [f, "Dolphin"]],
                            [/coast\/([\w\.]+)/i],
                            [_, [f, x + " Coast"]],
                            [/miuibrowser\/([\w\.]+)/i],
                            [_, [f, "MIUI " + N]],
                            [/fxios\/([-\w\.]+)/i],
                            [_, [f, k]],
                            [/\bqihu|(qi?ho?o?|360)browser/i],
                            [
                                [f, "360 " + N]
                            ],
                            [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],
                            [
                                [f, /(.+)/, "$1 " + N], _
                            ],
                            [/(comodo_dragon)\/([\w\.]+)/i],
                            [
                                [f, /_/g, " "], _
                            ],
                            [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],
                            [f, _],
                            [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i],
                            [f],
                            [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                            [
                                [f, "Facebook"], _
                            ],
                            [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i],
                            [f, _],
                            [/\bgsa\/([\w\.]+) .*safari\//i],
                            [_, [f, "GSA"]],
                            [/headlesschrome(?:\/([\w\.]+)| )/i],
                            [_, [f, T + " Headless"]],
                            [/ wv\).+(chrome)\/([\w\.]+)/i],
                            [
                                [f, T + " WebView"], _
                            ],
                            [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                            [_, [f, "Android " + N]],
                            [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                            [f, _],
                            [/version\/([\w\.]+) .*mobile\/\w+ (safari)/i],
                            [_, [f, "Mobile Safari"]],
                            [/version\/([\w\.]+) .*(mobile ?safari|safari)/i],
                            [_, f],
                            [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                            [f, [_, t, {
                                "1.0": "/8",
                                1.2: "/1",
                                1.3: "/3",
                                "2.0": "/412",
                                "2.0.2": "/416",
                                "2.0.3": "/417",
                                "2.0.4": "/419",
                                "?": "/"
                            }]],
                            [/(webkit|khtml)\/([\w\.]+)/i],
                            [f, _],
                            [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                            [
                                [f, "Netscape"], _
                            ],
                            [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                            [_, [f, k + " Reality"]],
                            [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i],
                            [f, _]
                        ],
                        cpu: [
                            [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                            [
                                [y, "amd64"]
                            ],
                            [/(ia32(?=;))/i],
                            [
                                [y, j]
                            ],
                            [/((?:i[346]|x)86)[;\)]/i],
                            [
                                [y, "ia32"]
                            ],
                            [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                            [
                                [y, "arm64"]
                            ],
                            [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                            [
                                [y, "armhf"]
                            ],
                            [/windows (ce|mobile); ppc;/i],
                            [
                                [y, "arm"]
                            ],
                            [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                            [
                                [y, /ower/, "", j]
                            ],
                            [/(sun4\w)[;\)]/i],
                            [
                                [y, "sparc"]
                            ],
                            [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],
                            [
                                [y, j]
                            ]
                        ],
                        device: [
                            [/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
                            [p, [g, P],
                                [v, m]
                            ],
                            [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
                            [p, [g, P],
                                [v, i]
                            ],
                            [/((ipod|iphone)\d+,\d+)/i],
                            [p, [g, S],
                                [v, i]
                            ],
                            [/(ipad\d+,\d+)/i],
                            [p, [g, S],
                                [v, m]
                            ],
                            [/\((ip(?:hone|od)[\w ]*);/i],
                            [p, [g, S],
                                [v, i]
                            ],
                            [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i],
                            [p, [g, S],
                                [v, m]
                            ],
                            [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                            [p, [g, "Huawei"],
                                [v, m]
                            ],
                            [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i],
                            [p, [g, "Huawei"],
                                [v, i]
                            ],
                            [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],
                            [
                                [p, /_/g, " "],
                                [g, "Xiaomi"],
                                [v, i]
                            ],
                            [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                            [
                                [p, /_/g, " "],
                                [g, "Xiaomi"],
                                [v, m]
                            ],
                            [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i],
                            [p, [g, "OPPO"],
                                [v, i]
                            ],
                            [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                            [p, [g, "Vivo"],
                                [v, i]
                            ],
                            [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                            [p, [g, "Realme"],
                                [v, i]
                            ],
                            [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],
                            [p, [g, C],
                                [v, i]
                            ],
                            [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                            [p, [g, C],
                                [v, m]
                            ],
                            [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
                            [p, [g, "LG"],
                                [v, m]
                            ],
                            [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i],
                            [p, [g, "LG"],
                                [v, i]
                            ],
                            [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
                            [p, [g, "Lenovo"],
                                [v, m]
                            ],
                            [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
                            [
                                [p, /_/g, " "],
                                [g, "Nokia"],
                                [v, i]
                            ],
                            [/(pixel c)\b/i],
                            [p, [g, A],
                                [v, m]
                            ],
                            [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                            [p, [g, A],
                                [v, i]
                            ],
                            [/droid.+ ([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                            [p, [g, D],
                                [v, i]
                            ],
                            [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                            [
                                [p, "Xperia Tablet"],
                                [g, D],
                                [v, m]
                            ],
                            [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
                            [p, [g, "OnePlus"],
                                [v, i]
                            ],
                            [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
                            [p, [g, I],
                                [v, m]
                            ],
                            [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                            [
                                [p, /(.+)/g, "Fire Phone $1"],
                                [g, I],
                                [v, i]
                            ],
                            [/(playbook);[-\w\),; ]+(rim)/i],
                            [p, g, [v, m]],
                            [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                            [p, [g, O],
                                [v, i]
                            ],
                            [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
                            [p, [g, "ASUS"],
                                [v, m]
                            ],
                            [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                            [p, [g, "ASUS"],
                                [v, i]
                            ],
                            [/(nexus 9)/i],
                            [p, [g, "HTC"],
                                [v, m]
                            ],
                            [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i],
                            [g, [p, /_/g, " "],
                                [v, i]
                            ],
                            [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                            [p, [g, "Acer"],
                                [v, m]
                            ],
                            [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                            [p, [g, "Meizu"],
                                [v, i]
                            ],
                            [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                            [p, [g, "Sharp"],
                                [v, i]
                            ],
                            [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i],
                            [g, p, [v, i]],
                            [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i],
                            [g, p, [v, m]],
                            [/(surface duo)/i],
                            [p, [g, R],
                                [v, m]
                            ],
                            [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                            [p, [g, "Fairphone"],
                                [v, i]
                            ],
                            [/(u304aa)/i],
                            [p, [g, "AT&T"],
                                [v, i]
                            ],
                            [/\bsie-(\w*)/i],
                            [p, [g, "Siemens"],
                                [v, i]
                            ],
                            [/\b(rct\w+) b/i],
                            [p, [g, "RCA"],
                                [v, m]
                            ],
                            [/\b(venue[\d ]{2,7}) b/i],
                            [p, [g, "Dell"],
                                [v, m]
                            ],
                            [/\b(q(?:mv|ta)\w+) b/i],
                            [p, [g, "Verizon"],
                                [v, m]
                            ],
                            [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                            [p, [g, "Barnes & Noble"],
                                [v, m]
                            ],
                            [/\b(tm\d{3}\w+) b/i],
                            [p, [g, "NuVision"],
                                [v, m]
                            ],
                            [/\b(k88) b/i],
                            [p, [g, "ZTE"],
                                [v, m]
                            ],
                            [/\b(nx\d{3}j) b/i],
                            [p, [g, "ZTE"],
                                [v, i]
                            ],
                            [/\b(gen\d{3}) b.+49h/i],
                            [p, [g, "Swiss"],
                                [v, i]
                            ],
                            [/\b(zur\d{3}) b/i],
                            [p, [g, "Swiss"],
                                [v, m]
                            ],
                            [/\b((zeki)?tb.*\b) b/i],
                            [p, [g, "Zeki"],
                                [v, m]
                            ],
                            [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                            [
                                [g, "Dragon Touch"], p, [v, m]
                            ],
                            [/\b(ns-?\w{0,9}) b/i],
                            [p, [g, "Insignia"],
                                [v, m]
                            ],
                            [/\b((nxa|next)-?\w{0,9}) b/i],
                            [p, [g, "NextBook"],
                                [v, m]
                            ],
                            [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                            [
                                [g, "Voice"], p, [v, i]
                            ],
                            [/\b(lvtel\-)?(v1[12]) b/i],
                            [
                                [g, "LvTel"], p, [v, i]
                            ],
                            [/\b(ph-1) /i],
                            [p, [g, "Essential"],
                                [v, i]
                            ],
                            [/\b(v(100md|700na|7011|917g).*\b) b/i],
                            [p, [g, "Envizen"],
                                [v, m]
                            ],
                            [/\b(trio[-\w\. ]+) b/i],
                            [p, [g, "MachSpeed"],
                                [v, m]
                            ],
                            [/\btu_(1491) b/i],
                            [p, [g, "Rotor"],
                                [v, m]
                            ],
                            [/(shield[\w ]+) b/i],
                            [p, [g, "Nvidia"],
                                [v, m]
                            ],
                            [/(sprint) (\w+)/i],
                            [g, p, [v, i]],
                            [/(kin\.[onetw]{3})/i],
                            [
                                [p, /\./g, " "],
                                [g, R],
                                [v, i]
                            ],
                            [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                            [p, [g, U],
                                [v, m]
                            ],
                            [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                            [p, [g, U],
                                [v, i]
                            ],
                            [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                            [g, p, [v, n]],
                            [/droid.+; (shield) bui/i],
                            [p, [g, "Nvidia"],
                                [v, n]
                            ],
                            [/(playstation [345portablevi]+)/i],
                            [p, [g, D],
                                [v, n]
                            ],
                            [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                            [p, [g, R],
                                [v, n]
                            ],
                            [/smart-tv.+(samsung)/i],
                            [g, [v, b]],
                            [/hbbtv.+maple;(\d+)/i],
                            [
                                [p, /^/, "SmartTV"],
                                [g, P],
                                [v, b]
                            ],
                            [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                            [
                                [g, "LG"],
                                [v, b]
                            ],
                            [/(apple) ?tv/i],
                            [g, [p, S + " TV"],
                                [v, b]
                            ],
                            [/crkey/i],
                            [
                                [p, T + "cast"],
                                [g, A],
                                [v, b]
                            ],
                            [/droid.+aft(\w)( bui|\))/i],
                            [p, [g, I],
                                [v, b]
                            ],
                            [/\(dtv[\);].+(aquos)/i],
                            [p, [g, "Sharp"],
                                [v, b]
                            ],
                            [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],
                            [
                                [g, s],
                                [p, s],
                                [v, b]
                            ],
                            [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                            [
                                [v, b]
                            ],
                            [/((pebble))app/i],
                            [g, p, [v, w]],
                            [/droid.+; (glass) \d/i],
                            [p, [g, A],
                                [v, w]
                            ],
                            [/droid.+; (wt63?0{2,3})\)/i],
                            [p, [g, U],
                                [v, w]
                            ],
                            [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                            [g, [v, E]],
                            [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                            [p, [v, i]],
                            [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                            [p, [v, m]],
                            [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                            [
                                [v, m]
                            ],
                            [/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i],
                            [
                                [v, i]
                            ],
                            [/(android[-\w\. ]{0,9});.+buil/i],
                            [p, [g, "Generic"]]
                        ],
                        engine: [
                            [/windows.+ edge\/([\w\.]+)/i],
                            [_, [f, "EdgeHTML"]],
                            [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                            [_, [f, "Blink"]],
                            [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i],
                            [f, _],
                            [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                            [_, f]
                        ],
                        os: [
                            [/microsoft (windows) (vista|xp)/i],
                            [f, _],
                            [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],
                            [f, [_, t, q]],
                            [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                            [
                                [f, "Windows"],
                                [_, t, q]
                            ],
                            [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i],
                            [
                                [_, /_/g, "."],
                                [f, "iOS"]
                            ],
                            [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
                            [
                                [f, "Mac OS"],
                                [_, /_/g, "."]
                            ],
                            [/droid ([\w\.]+)\b.+(android[- ]x86)/i],
                            [_, f],
                            [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i],
                            [f, _],
                            [/\(bb(10);/i],
                            [_, [f, O]],
                            [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                            [_, [f, "Symbian"]],
                            [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
                            [_, [f, k + " OS"]],
                            [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                            [_, [f, "webOS"]],
                            [/crkey\/([\d\.]+)/i],
                            [_, [f, T + "cast"]],
                            [/(cros) [\w]+ ([\w\.]+\w)/i],
                            [
                                [f, "Chromium OS"], _
                            ],
                            [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i],
                            [f, _],
                            [/(sunos) ?([\w\.\d]*)/i],
                            [
                                [f, "Solaris"], _
                            ],
                            [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i],
                            [f, _]
                        ]
                    },
                    V = function(e, t) {
                        if (typeof e == h && (t = e, e = l), !(this instanceof V)) return new V(e, t).getResult();
                        var n = e || (typeof o != u && o.navigator && o.navigator.userAgent ? o.navigator.userAgent : ""),
                            i = t ? function(e, t) {
                                var n = {};
                                for (var i in e) t[i] && t[i].length % 2 == 0 ? n[i] = t[i].concat(e[i]) : n[i] = e[i];
                                return n
                            }(M, t) : M;
                        return this.getBrowser = function() {
                            var e, t = {};
                            return t[f] = l, t[_] = l, a.call(t, n, i.browser), t.major = typeof(e = t.version) == c ? e.replace(/[^\d\.]/g, "").split(".")[0] : l, t
                        }, this.getCPU = function() {
                            var e = {};
                            return e[y] = l, a.call(e, n, i.cpu), e
                        }, this.getDevice = function() {
                            var e = {};
                            return e[g] = l, e[p] = l, e[v] = l, a.call(e, n, i.device), e
                        }, this.getEngine = function() {
                            var e = {};
                            return e[f] = l, e[_] = l, a.call(e, n, i.engine), e
                        }, this.getOS = function() {
                            var e = {};
                            return e[f] = l, e[_] = l, a.call(e, n, i.os), e
                        }, this.getResult = function() {
                            return {
                                ua: this.getUA(),
                                browser: this.getBrowser(),
                                engine: this.getEngine(),
                                os: this.getOS(),
                                device: this.getDevice(),
                                cpu: this.getCPU()
                            }
                        }, this.getUA = function() {
                            return n
                        }, this.setUA = function(e) {
                            return n = typeof e == c && 255 < e.length ? s(e, 255) : e, this
                        }, this.setUA(n), this
                    };
                V.VERSION = "0.7.28", V.BROWSER = e([f, _, "major"]), V.CPU = e([y]), V.DEVICE = e([p, g, v, n, i, b, m, w, E]), V.ENGINE = V.OS = e([f, _]), K.exports && (F = K.exports = V), F.UAParser = V;
                var L, G = typeof o != u && (o.jQuery || o.Zepto);
                G && !G.ua && (L = new V, G.ua = L.getResult(), G.ua.get = function() {
                    return L.getUA()
                }, G.ua.set = function(e) {
                    L.setUA(e);
                    var t = L.getResult();
                    for (var n in t) G.ua[n] = t[n]
                })
            }("object" == typeof window ? window : ve)
        }),
        Re = (Ae.UAParser, "8.8.0"),
        Ce = {
            apiEndpoint: "api.amplitude.com",
            batchEvents: !1,
            cookieExpiration: 365,
            cookieName: "amplitude_id",
            sameSiteCookie: "Lax",
            cookieForceUpgrade: !1,
            deferInitialization: !1,
            disableCookies: !1,
            deviceIdFromUrlParam: !1,
            domain: "",
            eventUploadPeriodMillis: 3e4,
            eventUploadThreshold: 30,
            forceHttps: !0,
            includeFbclid: !1,
            includeGclid: !1,
            includeReferrer: !1,
            includeUtm: !1,
            language: function() {
                return navigator && (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage) || ""
            }(),
            logLevel: "WARN",
            logAttributionCapturedEvent: !1,
            optOut: !1,
            onError: function() {},
            onExitPage: function() {},
            plan: {
                branch: "",
                source: "",
                version: ""
            },
            platform: "Web",
            savedMaxCount: 1e3,
            saveEvents: !0,
            saveParamsReferrerOncePerSession: !0,
            secureCookie: !1,
            sessionTimeout: 18e5,
            storage: m.STORAGE_DEFAULT,
            trackingOptions: {
                city: !0,
                country: !0,
                carrier: !0,
                device_manufacturer: !0,
                device_model: !0,
                dma: !0,
                ip_address: !0,
                language: !0,
                os_name: !0,
                os_version: !0,
                platform: !0,
                region: !0,
                version_name: !0
            },
            transport: m.TRANSPORT_HTTP,
            unsetParamsReferrerOnNewSession: !1,
            unsentKey: "amplitude_unsent",
            unsentIdentifyKey: "amplitude_unsent_identify",
            uploadBatchSize: 100,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cross-Origin-Resource-Policy": "cross-origin"
            }
        };
    ke.prototype.Identify = le, ke.prototype.Revenue = Te, ke.prototype.init = function(e, i, o, t) {
        var r = this;
        if ("string" !== I(e) || B(e)) z.error("Invalid apiKey. Please re-initialize with a valid apiKey");
        else try {
            Pe(this.options, o), p() && void 0 !== window.Prototype && Array.prototype.toJSON && (function() {
                var e;
                if (p()) {
                    var t = window,
                        n = Array;
                    if (void 0 !== t.Prototype && void 0 !== (null === (e = n.prototype) || void 0 === e ? void 0 : e.toJSON)) return delete n.prototype.toJSON
                }
            }(), z.warn("Prototype.js injected Array.prototype.toJSON. Deleting Array.prototype.toJSON to prevent double-stringify")), this.options.cookieName !== Ce.cookieName && z.warn("The cookieName option is deprecated. We will be ignoring it for newer cookies"), this.options.apiKey = e, this._storageSuffix = "_" + e + (this._instanceName === m.DEFAULT_INSTANCE ? "" : "_" + this._instanceName), this._storageSuffixV5 = e.slice(0, 6), this._oldCookiename = this.options.cookieName + this._storageSuffix, this._unsentKey = this.options.unsentKey + this._storageSuffix, this._unsentIdentifyKey = this.options.unsentIdentifyKey + this._storageSuffix, this._cookieName = m.COOKIE_PREFIX + "_" + this._storageSuffixV5, this.cookieStorage.options({
                expirationDays: this.options.cookieExpiration,
                domain: this.options.domain,
                secure: this.options.secureCookie,
                sameSite: this.options.sameSiteCookie
            }), this._metadataStorage = new he({
                storageKey: this._cookieName,
                disableCookies: this.options.disableCookies,
                expirationDays: this.options.cookieExpiration,
                domain: this.options.domain,
                secure: this.options.secureCookie,
                sameSite: this.options.sameSiteCookie,
                storage: this.options.storage
            });
            var n = !!this.cookieStorage.get(this._oldCookiename),
                s = !!this._metadataStorage.load();
            this._useOldCookie = !s && n && !this.options.cookieForceUpgrade;
            var a = s || n;
            if (this.options.domain = this.cookieStorage.options().domain, this.options.deferInitialization && !a) return void this._deferInitialization(e, i, o, t);
            "string" === I(this.options.logLevel) && F(this.options.logLevel);
            var u = Ke(this);
            this._apiPropertiesTrackingOptions = 0 < Object.keys(u).length ? {
                tracking_options: u
            } : {}, this.options.cookieForceUpgrade && n && (s || Ue(this), this.cookieStorage.remove(this._oldCookiename)), De(this), this._pendingReadStorage = !0;
            this.options.saveEvents && (this._unsentEvents = this._loadSavedUnsentEvents(this.options.unsentKey).map(function(e) {
                    return {
                        event: e
                    }
                }).concat(this._unsentEvents), this._unsentIdentifys = this._loadSavedUnsentEvents(this.options.unsentIdentifyKey).map(function(e) {
                    return {
                        event: e
                    }
                }).concat(this._unsentIdentifys)),
                function(e) {
                    o && o.deviceId && !J(o.deviceId) && (z.error('Invalid device ID rejected. Randomly generated UUID will be used instead of "'.concat(o.deviceId, '"')), delete o.deviceId), r.options.deviceId = r._getInitialDeviceId(o && o.deviceId, e), r.options.userId = "string" === I(i) && !B(i) && i || "number" === I(i) && i.toString() || r.options.userId || null;
                    var t = (new Date).getTime();
                    r._sessionId && r._lastEventTime && !(t - r._lastEventTime > r.options.sessionTimeout) || (r.options.unsetParamsReferrerOnNewSession && r._unsetUTMParams(), r._newSession = !0, r._sessionId = t, r.options.saveParamsReferrerOncePerSession && r._trackParamsAndReferrer()), r.options.saveParamsReferrerOncePerSession || r._trackParamsAndReferrer(), r.options.saveEvents && (xe(r._unsentEvents), xe(r._unsentIdentifys)), r._lastEventTime = t, qe(r), r._pendingReadStorage = !1, r._sendEventsIfReady();
                    for (var n = 0; n < r._onInit.length; n++) r._onInit[n](r);
                    r._onInit = [], r._isInitialized = !0
                }(), this.runQueuedFunctions(), "function" === I(t) && t(this);
            var c = this.options.onExitPage;
            "function" === I(c) && (this.pageHandlersAdded || (this.pageHandlersAdded = !0, window.addEventListener("pagehide", function() {
                var e;
                e = r.options.transport, r.setTransport(m.TRANSPORT_BEACON), c(), r.setTransport(e)
            }, !1)))
        } catch (e) {
            z.error(e), "function" === I(o.onError) && o.onError(e)
        }
    }, ke.prototype.deleteLowerLevelDomainCookies = function() {
        var e = R(),
            t = this.options.domain && "." === this.options.domain[0] ? this.options.domain.slice(1) : this.options.domain;
        if (t && e !== t && new RegExp(t + "$").test(e)) {
            for (var n = e.split("."), i = t.split("."), o = n.length; o > i.length; --o) {
                var r = n.slice(n.length - o).join(".");
                ee.set(this._cookieName, null, {
                    domain: "." + r
                })
            }
            ee.set(this._cookieName, null, {})
        }
    }, ke.prototype._getInitialDeviceId = function(e, t) {
        if (e) return e;
        if (this.options.deviceIdFromUrlParam) {
            var n = this._getDeviceIdFromUrlParam(this._getUrlParams());
            if (n) return n
        }
        return this.options.deviceId ? this.options.deviceId : t || N()
    };
    var xe = function(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t].event.user_properties,
                i = e[t].event.event_properties,
                o = e[t].event.groups;
            e[t].event.user_properties = Y(n), e[t].event.event_properties = Y(i), e[t].event.groups = $(o)
        }
    };
    ke.prototype._trackParamsAndReferrer = function() {
        var e, t, n, i, o;
        this.options.includeUtm && (e = this._initUtmData()), this.options.includeReferrer && (t = this._saveReferrer(this._getReferrer())), this.options.includeGclid && (n = this._saveGclid(this._getUrlParams())), this.options.includeFbclid && (i = this._saveFbclid(this._getUrlParams())), this.options.logAttributionCapturedEvent && (o = y({}, e, t, n, i), 0 < Object.keys(o).length && this.logEvent(m.ATTRIBUTION_EVENT, o))
    };
    var Pe = function e(t, n) {
        if ("object" === I(n)) {
            var i, o, r, s = new Set(["headers"]);
            for (var a in n) s.has(a) ? t[a] = y({}, t[a], n[a]) : Object.prototype.hasOwnProperty.call(n, a) && (i = a, r = o = void 0, Object.prototype.hasOwnProperty.call(t, i) && (o = n[i], r = I(t[i]), ("transport" !== i || Q(o)) && H(o, i + " option", r) && ("boolean" === r ? t[i] = !!o : "string" === r && !B(o) || "number" === r && 0 < o || "function" === r ? t[i] = o : "object" === r && e(t[i], o))))
        }
    };
    ke.prototype.runQueuedFunctions = function() {
        var e = this._q;
        this._q = [];
        for (var t = 0; t < e.length; t++) {
            var n = this[e[t][0]];
            "function" === I(n) && n.apply(this, e[t].slice(1))
        }
    }, ke.prototype._apiKeySet = function(e) {
        return !B(this.options.apiKey) || (z.error("Invalid apiKey. Please set a valid apiKey with init() before calling " + e), !1)
    }, ke.prototype._loadSavedUnsentEvents = function(e) {
        var t = this._getFromStorage(ce, e),
            n = this._parseSavedUnsentEventsString(t, e);
        return this._setInStorage(ce, e, JSON.stringify(n)), n
    }, ke.prototype._parseSavedUnsentEventsString = function(e, t) {
        if (B(e)) return [];
        if ("string" === I(e)) try {
            var n = JSON.parse(e);
            if ("array" === I(n)) return n
        } catch (e) {}
        return z.error("Unable to load " + t + " events. Restart with a new empty queue."), []
    }, ke.prototype.isNewSession = function() {
        return this._newSession
    }, ke.prototype.onInit = function(e) {
        this._isInitialized ? e(this) : this._onInit.push(e)
    }, ke.prototype.getSessionId = function() {
        return this._sessionId
    }, ke.prototype.nextEventId = function() {
        return this._eventId++, this._eventId
    }, ke.prototype.nextIdentifyId = function() {
        return this._identifyId++, this._identifyId
    }, ke.prototype.nextSequenceNumber = function() {
        return this._sequenceNumber++, this._sequenceNumber
    }, ke.prototype._unsentCount = function() {
        return this._unsentEvents.length + this._unsentIdentifys.length
    }, ke.prototype._sendEventsIfReady = function() {
        return 0 !== this._unsentCount() && (!this.options.batchEvents || this._unsentCount() >= this.options.eventUploadThreshold || this.options.transport === m.TRANSPORT_BEACON ? (this.sendEvents(), !0) : (this._updateScheduled || (this._updateScheduled = !0, setTimeout(function() {
            this._updateScheduled = !1, this.sendEvents()
        }.bind(this), this.options.eventUploadPeriodMillis)), !1))
    }, ke.prototype.clearStorage = function() {
        return this._metadataStorage.clear()
    }, ke.prototype._getFromStorage = function(e, t) {
        return e.getItem(t + this._storageSuffix)
    }, ke.prototype._setInStorage = function(e, t, n) {
        e.setItem(t + this._storageSuffix, n)
    };
    var De = function(e) {
            var t, n;
            e._useOldCookie ? "object" !== I(t = e.cookieStorage.get(e._oldCookiename)) || je(e, t) : "object" === I(n = e._metadataStorage.load()) && je(e, n)
        },
        Ue = function(e) {
            var t = e.cookieStorage.get(e._oldCookiename);
            "object" === I(t) && (je(e, t), qe(e))
        },
        je = function(e, t) {
            t.deviceId && (e.options.deviceId = t.deviceId), t.userId && (e.options.userId = t.userId), null !== t.optOut && void 0 !== t.optOut && !1 !== t.optOut && (e.options.optOut = t.optOut), t.sessionId && (e._sessionId = parseInt(t.sessionId, 10)), t.lastEventTime && (e._lastEventTime = parseInt(t.lastEventTime, 10)), t.eventId && (e._eventId = parseInt(t.eventId, 10)), t.identifyId && (e._identifyId = parseInt(t.identifyId, 10)), t.sequenceNumber && (e._sequenceNumber = parseInt(t.sequenceNumber, 10))
        },
        qe = function(e) {
            var t = {
                deviceId: e.options.deviceId,
                userId: e.options.userId,
                optOut: e.options.optOut,
                sessionId: e._sessionId,
                lastEventTime: e._lastEventTime,
                eventId: e._eventId,
                identifyId: e._identifyId,
                sequenceNumber: e._sequenceNumber
            };
            e._useOldCookie ? e.cookieStorage.set(e.options.cookieName + e._storageSuffix, t) : e._metadataStorage.save(t)
        };
    ke.prototype._initUtmData = function(e, t) {
        e = e || this._getUrlParams(), t = t || this.cookieStorage.get("__utmz");
        var n = pe(t, e);
        return Me(this, n), n
    }, ke.prototype._unsetUTMParams = function() {
        var e = new le;
        e.unset(m.REFERRER), e.unset(m.UTM_SOURCE), e.unset(m.UTM_MEDIUM), e.unset(m.UTM_CAMPAIGN), e.unset(m.UTM_TERM), e.unset(m.UTM_CONTENT), this.identify(e)
    };
    var Me = function(e, t) {
        if ("object" === I(t) && 0 !== Object.keys(t).length) {
            var n = new le;
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (n.setOnce("initial_" + i, t[i]), n.set(i, t[i]));
            e.identify(n)
        }
    };
    ke.prototype._getReferrer = function() {
        return document.referrer
    }, ke.prototype._getUrlParams = function() {
        return location.search
    }, ke.prototype._saveGclid = function(e) {
        var t = X("gclid", e);
        if (!B(t)) {
            var n = {
                gclid: t
            };
            return Me(this, n), n
        }
    }, ke.prototype._saveFbclid = function(e) {
        var t = X("fbclid", e);
        if (!B(t)) {
            var n = {
                fbclid: t
            };
            return Me(this, n), n
        }
    }, ke.prototype._getDeviceIdFromUrlParam = function(e) {
        return X(m.AMP_DEVICE_ID_PARAM, e)
    }, ke.prototype._getReferringDomain = function(e) {
        if (B(e)) return null;
        var t = e.split("/");
        return 3 <= t.length ? t[2] : null
    }, ke.prototype._saveReferrer = function(e) {
        if (!B(e)) {
            var t = {
                referrer: e,
                referring_domain: this._getReferringDomain(e)
            };
            return Me(this, t), t
        }
    }, ke.prototype.saveEvents = function() {
        try {
            var e = JSON.stringify(this._unsentEvents.map(function(e) {
                return e.event
            }));
            this._setInStorage(ce, this.options.unsentKey, e)
        } catch (e) {}
        try {
            var t = JSON.stringify(this._unsentIdentifys.map(function(e) {
                return e.event
            }));
            this._setInStorage(ce, this.options.unsentIdentifyKey, t)
        } catch (e) {}
    }, ke.prototype.setDomain = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["setDomain"].concat(Array.prototype.slice.call(arguments, 0)));
        if (H(e, "domain", "string")) try {
            this.cookieStorage.options({
                expirationDays: this.options.cookieExpiration,
                secure: this.options.secureCookie,
                domain: e,
                sameSite: this.options.sameSiteCookie
            }), this.options.domain = this.cookieStorage.options().domain, De(this), qe(this)
        } catch (e) {
            z.error(e)
        }
    }, ke.prototype.setUserId = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["setUserId"].concat(Array.prototype.slice.call(arguments, 0)));
        try {
            this.options.userId = null != e && "" + e || null, qe(this)
        } catch (e) {
            z.error(e)
        }
    }, ke.prototype.setGroup = function(e, t) {
        if (this._shouldDeferCall()) return this._q.push(["setGroup"].concat(Array.prototype.slice.call(arguments, 0)));
        var n, i;
        this._apiKeySet("setGroup()") && H(e, "groupType", "string") && !B(e) && ((n = {})[e] = t, i = (new le).set(e, t), this._logEvent(m.IDENTIFY_EVENT, null, null, i.userPropertiesOperations, n, null, null, null))
    }, ke.prototype.setOptOut = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["setOptOut"].concat(Array.prototype.slice.call(arguments, 0)));
        if (H(e, "enable", "boolean")) try {
            this.options.optOut = e, qe(this)
        } catch (e) {
            z.error(e)
        }
    }, ke.prototype.setSessionId = function(e) {
        if (H(e, "sessionId", "number")) try {
            this._sessionId = e, qe(this)
        } catch (e) {
            z.error(e)
        }
    }, ke.prototype.resetSessionId = function() {
        this.setSessionId((new Date).getTime())
    }, ke.prototype.regenerateDeviceId = function() {
        if (this._shouldDeferCall()) return this._q.push(["regenerateDeviceId"].concat(Array.prototype.slice.call(arguments, 0)));
        this.setDeviceId(N())
    }, ke.prototype.setDeviceId = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["setDeviceId"].concat(Array.prototype.slice.call(arguments, 0)));
        if (J(e)) try {
            B(e) || (this.options.deviceId = "" + e, qe(this))
        } catch (e) {
            z.error(e)
        }
    }, ke.prototype.setTransport = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["setTransport"].concat(Array.prototype.slice.call(arguments, 0)));
        Q(e) && (this.options.transport = e)
    }, ke.prototype.setUserProperties = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["setUserProperties"].concat(Array.prototype.slice.call(arguments, 0)));
        if (this._apiKeySet("setUserProperties()") && H(e, "userProperties", "object")) {
            var t = W(Y(e));
            if (0 !== Object.keys(t).length) {
                var n = new le;
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && n.set(i, t[i]);
                this.identify(n)
            }
        }
    }, ke.prototype.clearUserProperties = function() {
        if (this._shouldDeferCall()) return this._q.push(["clearUserProperties"].concat(Array.prototype.slice.call(arguments, 0)));
        var e;
        this._apiKeySet("clearUserProperties()") && ((e = new le).clearAll(), this.identify(e))
    };

    function Ve(e, t) {
        for (var n = 0; n < t._q.length; n++) {
            var i = e[t._q[n][0]];
            "function" === I(i) && i.apply(e, t._q[n].slice(1))
        }
        return e
    }
    ke.prototype.identify = function(e, t, n) {
        if (this._shouldDeferCall()) return this._q.push(["identify"].concat(Array.prototype.slice.call(arguments, 0)));
        if (this._apiKeySet("identify()"))
            if ("object" === I(e) && Object.prototype.hasOwnProperty.call(e, "_q") && (e = Ve(new le, e)), e instanceof le) {
                if (0 < Object.keys(e.userPropertiesOperations).length) return this._logEvent(m.IDENTIFY_EVENT, null, null, e.userPropertiesOperations, null, null, null, t, n);
                ze(t, n, 0, "No request sent", {
                    reason: "No user property operations"
                })
            } else z.error("Invalid identify input type. Expected Identify object but saw " + I(e)), ze(t, n, 0, "No request sent", {
                reason: "Invalid identify input type"
            });
        else ze(t, n, 0, "No request sent", {
            reason: "API key is not set"
        })
    }, ke.prototype.groupIdentify = function(e, t, n, i, o) {
        if (this._shouldDeferCall()) return this._q.push(["groupIdentify"].concat(Array.prototype.slice.call(arguments, 0)));
        if (this._apiKeySet("groupIdentify()"))
            if (H(e, "group_type", "string") && !B(e))
                if (null != t)
                    if ("object" === I(n) && Object.prototype.hasOwnProperty.call(n, "_q") && (n = Ve(new le, n)), n instanceof le) {
                        if (0 < Object.keys(n.userPropertiesOperations).length) return this._logEvent(m.GROUP_IDENTIFY_EVENT, null, null, null, r({}, e, t), n.userPropertiesOperations, null, i, o);
                        ze(i, o, 0, "No request sent", {
                            reason: "No group property operations"
                        })
                    } else z.error("Invalid identify input type. Expected Identify object but saw " + I(n)), ze(i, o, 0, "No request sent", {
                        reason: "Invalid identify input type"
                    });
        else ze(i, o, 0, "No request sent", {
            reason: "Invalid group name"
        });
        else ze(i, o, 0, "No request sent", {
            reason: "Invalid group type"
        });
        else ze(i, o, 0, "No request sent", {
            reason: "API key is not set"
        })
    }, ke.prototype.setVersionName = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["setVersionName"].concat(Array.prototype.slice.call(arguments, 0)));
        H(e, "versionName", "string") && (this.options.versionName = e)
    }, ke.prototype._logEvent = function(e, t, n, i, o, r, s, a, u) {
        if (De(this), e)
            if (this.options.optOut) ze(a, u, 0, "No request sent", {
                reason: "optOut is set to true"
            });
            else try {
                var c = e === m.IDENTIFY_EVENT || e === m.GROUP_IDENTIFY_EVENT ? this.nextIdentifyId() : this.nextEventId(),
                    p = this.nextSequenceNumber(),
                    l = "number" === I(s) ? s : (new Date).getTime();
                this._sessionId && this._lastEventTime && !(l - this._lastEventTime > this.options.sessionTimeout) || (this._sessionId = l), this._lastEventTime = l, qe(this);
                var d = this._ua.browser.name,
                    h = this._ua.browser.major,
                    f = this._ua.device.model || this._ua.os.name,
                    v = this._ua.device.vendor;
                i = i || {};
                var g = y({}, this._apiPropertiesTrackingOptions);
                n = y({}, n || {}, g), t = t || {}, o = o || {}, r = r || {};
                var _ = {
                    device_id: this.options.deviceId,
                    user_id: this.options.userId,
                    timestamp: l,
                    event_id: c,
                    session_id: this._sessionId || -1,
                    event_type: e,
                    version_name: this.options.versionName || null,
                    platform: Ge(this, "platform") ? this.options.platform : null,
                    os_name: Ge(this, "os_name") && d || null,
                    os_version: Ge(this, "os_version") && h || null,
                    device_model: Ge(this, "device_model") && f || null,
                    device_manufacturer: Ge(this, "device_manufacturer") && v || null,
                    language: Ge(this, "language") ? this.options.language : null,
                    api_properties: n,
                    event_properties: W(Y(t)),
                    user_properties: W(Y(i)),
                    uuid: function e(t) {
                        return t ? (t ^ 16 * Math.random() >> t / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e)
                    }(),
                    library: {
                        name: "amplitude-js",
                        version: Re
                    },
                    sequence_number: p,
                    groups: W($(o)),
                    group_properties: W(Y(r)),
                    user_agent: this._userAgent
                };
                return Le(this) && (_.plan = {
                    branch: this.options.plan.branch || void 0,
                    source: this.options.plan.source || void 0,
                    version: this.options.plan.version || void 0
                }), e === m.IDENTIFY_EVENT || e === m.GROUP_IDENTIFY_EVENT ? (this._unsentIdentifys.push({
                    event: _,
                    callback: a,
                    errorCallback: u
                }), this._limitEventsQueued(this._unsentIdentifys)) : (this._unsentEvents.push({
                    event: _,
                    callback: a,
                    errorCallback: u
                }), this._limitEventsQueued(this._unsentEvents)), this.options.saveEvents && this.saveEvents(), this._sendEventsIfReady(), c
            } catch (e) {
                z.error(e)
            } else ze(a, u, 0, "No request sent", {
                reason: "Missing eventType"
            })
    };
    var Le = function(e) {
            return e.options.plan && (e.options.plan.source || e.options.plan.branch || e.options.plan.version)
        },
        Ge = function(e, t) {
            return !!e.options.trackingOptions[t]
        },
        Ke = function(e) {
            for (var t = ["city", "country", "dma", "ip_address", "region"], n = {}, i = 0; i < t.length; i++) {
                var o = t[i];
                Ge(e, o) || (n[o] = !1)
            }
            return n
        };
    ke.prototype._limitEventsQueued = function(e) {
        e.length > this.options.savedMaxCount && e.splice(0, e.length - this.options.savedMaxCount).forEach(function(e) {
            ze(e.callback, e.errorCallback, 0, "No request sent", {
                reason: "Event dropped because options.savedMaxCount exceeded. User may be offline or have a content blocker"
            })
        })
    }, ke.prototype.logEvent = function(e, t, n, i) {
        return this._shouldDeferCall() ? this._q.push(["logEvent"].concat(Array.prototype.slice.call(arguments, 0))) : this.logEventWithTimestamp(e, t, null, n, i)
    }, ke.prototype.logEventWithTimestamp = function(e, t, n, i, o) {
        return this._shouldDeferCall() ? this._q.push(["logEventWithTimestamp"].concat(Array.prototype.slice.call(arguments, 0))) : this._apiKeySet("logEvent()") ? H(e, "eventType", "string") ? B(e) ? (ze(i, o, 0, "No request sent", {
            reason: "Missing eventType"
        }), -1) : this._logEvent(e, t, null, null, null, null, n, i, o) : (ze(i, o, 0, "No request sent", {
            reason: "Invalid type for eventType"
        }), -1) : (ze(i, o, 0, "No request sent", {
            reason: "API key not set"
        }), -1)
    }, ke.prototype.logEventWithGroups = function(e, t, n, i, o) {
        return this._shouldDeferCall() ? this._q.push(["logEventWithGroups"].concat(Array.prototype.slice.call(arguments, 0))) : this._apiKeySet("logEventWithGroups()") ? H(e, "eventType", "string") ? this._logEvent(e, t, null, null, n, null, null, i, o) : (ze(event.callback, event.errorCallback, 0, "No request sent", {
            reason: "Invalid type for eventType"
        }), -1) : (ze(event.callback, event.errorCallback, 0, "No request sent", {
            reason: "API key not set"
        }), -1)
    };

    function Fe(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    }
    var ze = function(e, t, n, i, o) {
        "function" === I(e) && e(n, i, o), "function" === I(t) && t(n, i, o)
    };
    ke.prototype.logRevenueV2 = function(e) {
        if (this._shouldDeferCall()) return this._q.push(["logRevenueV2"].concat(Array.prototype.slice.call(arguments, 0)));
        if (this._apiKeySet("logRevenueV2()"))
            if ("object" === I(e) && Object.prototype.hasOwnProperty.call(e, "_q") && (e = Ve(new Te, e)), e instanceof Te) {
                if (e && e._isValidRevenue()) return this.logEvent(m.REVENUE_EVENT, e._toJSONObject())
            } else z.error("Invalid revenue input type. Expected Revenue object but saw " + I(e))
    }, ke.prototype.logRevenue = function(e, t, n) {
        return this._shouldDeferCall() ? this._q.push(["logRevenue"].concat(Array.prototype.slice.call(arguments, 0))) : this._apiKeySet("logRevenue()") && Fe(e) && (void 0 === t || Fe(t)) ? this._logEvent(m.REVENUE_EVENT, {}, {
            productId: n,
            special: "revenue_amount",
            quantity: t || 1,
            price: e
        }, null, null, null, null, null) : -1
    }, ke.prototype._logErrorsOnEvents = function(e, t, n, i) {
        for (var o = ["_unsentEvents", "_unsentIdentifys"], r = 0; r < o.length; r++)
            for (var s = o[r], a = "_unsentEvents" === s ? e : t, u = 0; u < this[s].length; u++) {
                var c = this[s][u];
                c.event.event_id <= a && c.errorCallback && c.errorCallback(n, i)
            }
    }, ke.prototype.removeEvents = function(e, t, n, i) {
        Be(this, "_unsentEvents", e, n, i), Be(this, "_unsentIdentifys", t, n, i)
    };
    var Be = function(e, t, n, i, o) {
        if (!(n < 0)) {
            for (var r = [], s = 0; s < e[t].length; s++) {
                var a = e[t][s];
                a.event.event_id > n ? r.push(a) : a.callback && a.callback(i, o)
            }
            e[t] = r
        }
    };
    ke.prototype.sendEvents = function() {
        if (this._apiKeySet("sendEvents()")) {
            if (this.options.optOut) this.removeEvents(1 / 0, 1 / 0, 0, "No request sent", {
                reason: "Opt out is set to true"
            });
            else if (0 !== this._unsentCount()) {
                if (this.options.transport !== m.TRANSPORT_BEACON) {
                    if (this._sending) return;
                    this._sending = !0
                }
                var n, e = (this.options.forceHttps || "https:" === window.location.protocol ? "https" : "http") + "://" + this.options.apiEndpoint,
                    i = Math.min(this._unsentCount(), this.options.uploadBatchSize),
                    t = this._mergeEventsAndIdentifys(i),
                    o = t.maxEventId,
                    r = t.maxIdentifyId,
                    s = JSON.stringify(t.eventsToSend.map(function(e) {
                        return e.event
                    })),
                    a = (new Date).getTime(),
                    u = {
                        client: this.options.apiKey,
                        e: s,
                        v: m.API_VERSION,
                        upload_time: a,
                        checksum: _e(m.API_VERSION + this.options.apiKey + s + a)
                    };
                this.options.transport !== m.TRANSPORT_BEACON ? new Oe(e, u, (n = this).options.headers).send(function(e, t) {
                    n._sending = !1;
                    try {
                        200 === e && "success" === t ? (n.removeEvents(o, r, e, t), n.options.saveEvents && n.saveEvents(), n._sendEventsIfReady()) : (n._logErrorsOnEvents(o, r, e, t), 413 === e && (1 === n.options.uploadBatchSize && n.removeEvents(o, r, e, t), n.options.uploadBatchSize = Math.ceil(i / 2), n.sendEvents()))
                    } catch (e) {}
                }) : navigator.sendBeacon(e, new URLSearchParams(u)) ? (this.removeEvents(o, r, 200, "success"), this.options.saveEvents && this.saveEvents()) : this._logErrorsOnEvents(o, r, 0, "")
            }
        } else this.removeEvents(1 / 0, 1 / 0, 0, "No request sent", {
            reason: "API key not set"
        })
    }, ke.prototype._mergeEventsAndIdentifys = function(e) {
        for (var t = [], n = 0, i = -1, o = 0, r = -1; t.length < e;) {
            var s = void 0,
                a = o >= this._unsentIdentifys.length,
                u = n >= this._unsentEvents.length;
            if (u && a) {
                z.error("Merging Events and Identifys, less events and identifys than expected");
                break
            }
            a || !u && (!("sequence_number" in this._unsentEvents[n].event) || this._unsentEvents[n].event.sequence_number < this._unsentIdentifys[o].event.sequence_number) ? i = (s = this._unsentEvents[n++]).event.event_id : r = (s = this._unsentIdentifys[o++]).event.event_id, t.push(s)
        }
        return {
            eventsToSend: t,
            maxEventId: i,
            maxIdentifyId: r
        }
    }, ke.prototype.setGlobalUserProperties = function(e) {
        this.setUserProperties(e)
    }, ke.prototype.__VERSION__ = Re, ke.prototype._shouldDeferCall = function() {
        return this._pendingReadStorage || this._initializationDeferred
    }, ke.prototype._deferInitialization = function() {
        this._initializationDeferred = !0, this._q.push(["init"].concat(Array.prototype.slice.call(arguments, 0)))
    }, ke.prototype.enableTracking = function() {
        this._initializationDeferred = !1, qe(this), this.runQueuedFunctions()
    };

    function Xe() {
        this.options = y({}, Ce), this._q = [], this._instances = {}
    }
    Xe.prototype.Identify = le, Xe.prototype.Revenue = Te, Xe.prototype.getInstance = function(e) {
        e = B(e) ? m.DEFAULT_INSTANCE : e.toLowerCase();
        var t = this._instances[e];
        return void 0 === t && (t = new ke(e), this._instances[e] = t), t
    }, Xe.prototype.runQueuedFunctions = function() {
        for (var e = 0; e < this._q.length; e++) {
            var t = this[this._q[e][0]];
            "function" === I(t) && t.apply(this, this._q[e].slice(1))
        }
        for (var n in this._q = [], this._instances) Object.prototype.hasOwnProperty.call(this._instances, n) && this._instances[n].runQueuedFunctions()
    }, Xe.prototype.init = function(e, t, n, i) {
        this.getInstance().init(e, t, n, function(e) {
            this.options = e.options, "function" === I(i) && i(e)
        }.bind(this))
    }, Xe.prototype.isNewSession = function() {
        return this.getInstance().isNewSession()
    }, Xe.prototype.getSessionId = function() {
        return this.getInstance().getSessionId()
    }, Xe.prototype.nextEventId = function() {
        return this.getInstance().nextEventId()
    }, Xe.prototype.nextIdentifyId = function() {
        return this.getInstance().nextIdentifyId()
    }, Xe.prototype.nextSequenceNumber = function() {
        return this.getInstance().nextSequenceNumber()
    }, Xe.prototype.saveEvents = function() {
        this.getInstance().saveEvents()
    }, Xe.prototype.setDomain = function(e) {
        this.getInstance().setDomain(e)
    }, Xe.prototype.setUserId = function(e) {
        this.getInstance().setUserId(e)
    }, Xe.prototype.setGroup = function(e, t) {
        this.getInstance().setGroup(e, t)
    }, Xe.prototype.setOptOut = function(e) {
        this.getInstance().setOptOut(e)
    }, Xe.prototype.regenerateDeviceId = function() {
        this.getInstance().regenerateDeviceId()
    }, Xe.prototype.setDeviceId = function(e) {
        this.getInstance().setDeviceId(e)
    }, Xe.prototype.setUserProperties = function(e) {
        this.getInstance().setUserProperties(e)
    }, Xe.prototype.clearUserProperties = function() {
        this.getInstance().clearUserProperties()
    }, Xe.prototype.identify = function(e, t) {
        this.getInstance().identify(e, t)
    }, Xe.prototype.setVersionName = function(e) {
        this.getInstance().setVersionName(e)
    }, Xe.prototype.logEvent = function(e, t, n) {
        return this.getInstance().logEvent(e, t, n)
    }, Xe.prototype.logEventWithGroups = function(e, t, n, i) {
        return this.getInstance().logEventWithGroups(e, t, n, i)
    }, Xe.prototype.logRevenueV2 = function(e) {
        return this.getInstance().logRevenueV2(e)
    }, Xe.prototype.logRevenue = function(e, t, n) {
        return this.getInstance().logRevenue(e, t, n)
    }, Xe.prototype.removeEvents = function(e, t) {
        this.getInstance().removeEvents(e, t)
    }, Xe.prototype.sendEvents = function(e) {
        this.getInstance().sendEvents(e)
    }, Xe.prototype.setGlobalUserProperties = function(e) {
        this.getInstance().setUserProperties(e)
    }, Xe.prototype.__VERSION__ = Re;
    var We = window.amplitude || {},
        $e = new Xe;
    for (var He in $e._q = We._q || [], We._iq) Object.prototype.hasOwnProperty.call(We._iq, He) && ($e.getInstance(He)._q = We._iq[He]._q || []);
    return $e.runQueuedFunctions(), $e
}();