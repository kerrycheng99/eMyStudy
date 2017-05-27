function link_open_with() {
    var t = prompt("链接地址", "http://");
    return null === t ? (window.abort_link_input = !0, "") : (window.abort_link_input = !1, t = $.trim(t), t = process_link_protocol(t), "[url=" + t + "]")
}

function link_close_with() {
    return window.abort_link_input === !0 ? "" : "[/url]"
}

function process_link_protocol(t) {
    return /^(http|https):\/\//.test(t) ? t : "http://" + t
}

function lazy_load_emoticon(t) {
    t = $(t), t.hasClass("emoticons_qq") ? change_emoticon_url(t, "http://forum.csdn.net/PointForum/ui/scripts/csdn/Plugin/001/face/", "qq") : t.hasClass("emoticons_onion") ? change_emoticon_url(t, "http://forum.csdn.net/PointForum/ui/scripts/csdn/Plugin/003/onion/", "onion") : t.hasClass("emoticons_monkey") && change_emoticon_url(t, "http://forum.csdn.net/PointForum/ui/scripts/csdn/Plugin/003/monkey/", "monkey")
}

function change_emoticon_url(t, e, n) {
    var i, o, a;
    $("ul > li", t).each(function() {
        i = $(this), o = i.prop("class").match(new RegExp("emoticon_" + n + "_(\\d+)"))[1], a = e + o + ".gif", i.find("a").css("background-image", 'url("' + a + '")')
    })
}

function yabao_input() {
    var t = prompt("请输入押宝ID\n押宝列表: http://" + location.host + "/bettings", "");
    return null === t ? "" : (t = $.trim(t), "" !== t && $.getJSON("/bettings/" + t + "/exist").success(function(t) {
        t.exist === !1 && alert("押宝ID不存在")
    }), "[yabao=" + t + "][/yabao]")
}

function online_preview(t) {
    t = $(t);
    var e = t.closest(".tab").next(".markItUpContainer"),
        n = !1;
    "none" == e.css("display") && (n = !0);
    var i = !1;
    if (t.hasClass("preview_btn_a") && (i = !0), n != i) {
        var o = e.find("textarea"),
            a = e.next(".preview_div");
        a.length || (a = $('<div class="preview_div"></div>'), a.hide(), e.after(a)), a.css("min-height", e.height() - 2);
        var r = e.prev(".tab").find("li");
        if (i) {
            if (r.last().addClass("hover"), r.first().removeClass("hover"), e.hide(), a.show(), t.data("processing")) return a.html("上次预览加载中..."), void 0;
            if ("" === $.trim(o.val())) return a.html(""), void 0;
            a.html("预览加载中..."), t.data("processing", !0), $.ajax({
                type: "POST",
                url: "/preview",
                data: {
                    body: o.val()
                }
            }).success(function(e) {
                a.html(e), a.find("fieldset+br").remove(), a.find("blockquote").each(function(t, e) {
                    var n = $(e).find(":first");
                    void 0 !== $(e).contents().get(0) && "br" === $(e).contents().get(0).nodeName.toLowerCase() && "br" === n.prop("tagName").toLowerCase() && n.remove()
                }), syntax_highlighter_with_compatible(), t.data("processing", !1)
            }).error(function() {
                t.data("processing", !1), alert("预览出错,请重试")
            })
        } else r.first().addClass("hover"), r.last().removeClass("hover"), a.hide(), e.show(), o.focus()
    }
}

function getFrameWindow(t) {
    return top.document.getElementById(t).contentWindow
}

function get_full_path(t) {
    return t = $.trim(t.toString()), t.replace(/^(http|https):\/\/([^\/]+)/i, "")
}

function iframe_height(t) {
    $(window).load(function() {
        var e = null;
        Number(t) > 0 ? e = Number(t) : (t = $(t), e = t.outerHeight(!0), e > 0 || (e = t.height())), $("iframe", parent.document).each(function() {
            get_full_path(this.src) == get_full_path(document.URL) && (this.height = e)
        })
    })
}
var CSDN = {
    appConfig: {
        csdn_passport_ssl_domain: "https://passport.csdn.net",
        main_domain: "bbs.csdn.net"
    }
};
/*!
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
! function(t, e) {
    function n(t) {
        var e, n, i = L[t] = {};
        for (t = t.split(/\s+/), e = 0, n = t.length; n > e; e++) i[t[e]] = !0;
        return i
    }

    function i(t, n, i) {
        if (i === e && 1 === t.nodeType) {
            var o = "data-" + n.replace(O, "-$1").toLowerCase();
            if (i = t.getAttribute(o), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : I.isNumeric(i) ? +i : M.test(i) ? I.parseJSON(i) : i
                } catch (a) {}
                I.data(t, n, i)
            } else i = e
        }
        return i
    }

    function o(t) {
        for (var e in t)
            if (("data" !== e || !I.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function a(t, e, n) {
        var i = e + "defer",
            o = e + "queue",
            a = e + "mark",
            r = I._data(t, i);
        !r || "queue" !== n && I._data(t, o) || "mark" !== n && I._data(t, a) || setTimeout(function() {
            I._data(t, o) || I._data(t, a) || (I.removeData(t, i, !0), r.fire())
        }, 0)
    }

    function r() {
        return !1
    }

    function s() {
        return !0
    }

    function l(t) {
        return !t || !t.parentNode || 11 === t.parentNode.nodeType
    }

    function c(t, e, n) {
        if (e = e || 0, I.isFunction(e)) return I.grep(t, function(t, i) {
            var o = !!e.call(t, i, t);
            return o === n
        });
        if (e.nodeType) return I.grep(t, function(t) {
            return t === e === n
        });
        if ("string" == typeof e) {
            var i = I.grep(t, function(t) {
                return 1 === t.nodeType
            });
            if (ue.test(e)) return I.filter(e, i, !n);
            e = I.filter(e, i)
        }
        return I.grep(t, function(t) {
            return I.inArray(t, e) >= 0 === n
        })
    }

    function u(t) {
        var e = he.split("|"),
            n = t.createDocumentFragment();
        if (n.createElement)
            for (; e.length;) n.createElement(e.pop());
        return n
    }

    function d(t) {
        return I.nodeName(t, "table") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function p(t, e) {
        if (1 === e.nodeType && I.hasData(t)) {
            var n, i, o, a = I._data(t),
                r = I._data(e, a),
                s = a.events;
            if (s) {
                delete r.handle, r.events = {};
                for (n in s)
                    for (i = 0, o = s[n].length; o > i; i++) I.event.add(e, n, s[n][i])
            }
            r.data && (r.data = I.extend({}, r.data))
        }
    }

    function f(t, e) {
        var n;
        1 === e.nodeType && (e.clearAttributes && e.clearAttributes(), e.mergeAttributes && e.mergeAttributes(t), n = e.nodeName.toLowerCase(), "object" === n ? e.outerHTML = t.outerHTML : "input" !== n || "checkbox" !== t.type && "radio" !== t.type ? "option" === n ? e.selected = t.defaultSelected : "input" === n || "textarea" === n ? e.defaultValue = t.defaultValue : "script" === n && e.text !== t.text && (e.text = t.text) : (t.checked && (e.defaultChecked = e.checked = t.checked), e.value !== t.value && (e.value = t.value)), e.removeAttribute(I.expando), e.removeAttribute("_submit_attached"), e.removeAttribute("_change_attached"))
    }

    function h(t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName("*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll("*") : []
    }

    function m(t) {
        ("checkbox" === t.type || "radio" === t.type) && (t.defaultChecked = t.checked)
    }

    function g(t) {
        var e = (t.nodeName || "").toLowerCase();
        "input" === e ? m(t) : "script" !== e && "undefined" != typeof t.getElementsByTagName && I.grep(t.getElementsByTagName("input"), m)
    }

    function v(t) {
        var e = j.createElement("div");
        return Se.appendChild(e), e.innerHTML = t.outerHTML, e.firstChild
    }

    function y(t, e, n) {
        var i = "width" === e ? t.offsetWidth : t.offsetHeight,
            o = "width" === e ? 1 : 0,
            a = 4;
        if (i > 0) {
            if ("border" !== n)
                for (; a > o; o += 2) n || (i -= parseFloat(I.css(t, "padding" + qe[o])) || 0), "margin" === n ? i += parseFloat(I.css(t, n + qe[o])) || 0 : i -= parseFloat(I.css(t, "border" + qe[o] + "Width")) || 0;
            return i + "px"
        }
        if (i = Ne(t, e), (0 > i || null == i) && (i = t.style[e]), Le.test(i)) return i;
        if (i = parseFloat(i) || 0, n)
            for (; a > o; o += 2) i += parseFloat(I.css(t, "padding" + qe[o])) || 0, "padding" !== n && (i += parseFloat(I.css(t, "border" + qe[o] + "Width")) || 0), "margin" === n && (i += parseFloat(I.css(t, n + qe[o])) || 0);
        return i + "px"
    }

    function b(t) {
        return function(e, n) {
            if ("string" != typeof e && (n = e, e = "*"), I.isFunction(n))
                for (var i, o, a, r = e.toLowerCase().split(en), s = 0, l = r.length; l > s; s++) i = r[s], a = /^\+/.test(i), a && (i = i.substr(1) || "*"), o = t[i] = t[i] || [], o[a ? "unshift" : "push"](n)
        }
    }

    function x(t, n, i, o, a, r) {
        a = a || n.dataTypes[0], r = r || {}, r[a] = !0;
        for (var s, l = t[a], c = 0, u = l ? l.length : 0, d = t === rn; u > c && (d || !s); c++) s = l[c](n, i, o), "string" == typeof s && (!d || r[s] ? s = e : (n.dataTypes.unshift(s), s = x(t, n, i, o, s, r)));
        return !d && s || r["*"] || (s = x(t, n, i, o, "*", r)), s
    }

    function w(t, n) {
        var i, o, a = I.ajaxSettings.flatOptions || {};
        for (i in n) n[i] !== e && ((a[i] ? t : o || (o = {}))[i] = n[i]);
        o && I.extend(!0, t, o)
    }

    function _(t, e, n, i) {
        if (I.isArray(e)) I.each(e, function(e, o) {
            n || ze.test(t) ? i(t, o) : _(t + "[" + ("object" == typeof o ? e : "") + "]", o, n, i)
        });
        else if (n || "object" !== I.type(e)) i(t, e);
        else
            for (var o in e) _(t + "[" + o + "]", e[o], n, i)
    }

    function $(t, n, i) {
        var o, a, r, s, l = t.contents,
            c = t.dataTypes,
            u = t.responseFields;
        for (a in u) a in i && (n[u[a]] = i[a]);
        for (;
            "*" === c[0];) c.shift(), o === e && (o = t.mimeType || n.getResponseHeader("content-type"));
        if (o)
            for (a in l)
                if (l[a] && l[a].test(o)) {
                    c.unshift(a);
                    break
                }
        if (c[0] in i) r = c[0];
        else {
            for (a in i) {
                if (!c[0] || t.converters[a + " " + c[0]]) {
                    r = a;
                    break
                }
                s || (s = a)
            }
            r = r || s
        }
        return r ? (r !== c[0] && c.unshift(r), i[r]) : void 0
    }

    function k(t, n) {
        t.dataFilter && (n = t.dataFilter(n, t.dataType));
        var i, o, a, r, s, l, c, u, d = t.dataTypes,
            p = {},
            f = d.length,
            h = d[0];
        for (i = 1; f > i; i++) {
            if (1 === i)
                for (o in t.converters) "string" == typeof o && (p[o.toLowerCase()] = t.converters[o]);
            if (r = h, h = d[i], "*" === h) h = r;
            else if ("*" !== r && r !== h) {
                if (s = r + " " + h, l = p[s] || p["* " + h], !l) {
                    u = e;
                    for (c in p)
                        if (a = c.split(" "), (a[0] === r || "*" === a[0]) && (u = p[a[1] + " " + h])) {
                            c = p[c], c === !0 ? l = u : u === !0 && (l = c);
                            break
                        }
                }
                l || u || I.error("No conversion from " + s.replace(" ", " to ")), l !== !0 && (n = l ? l(n) : u(c(n)))
            }
        }
        return n
    }

    function C() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {}
    }

    function F() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }

    function T() {
        return setTimeout(S, 0), yn = I.now()
    }

    function S() {
        yn = e
    }

    function N(t, e) {
        var n = {};
        return I.each(_n.concat.apply([], _n.slice(0, e)), function() {
            n[this] = t
        }), n
    }

    function D(t) {
        if (!bn[t]) {
            var e = j.body,
                n = I("<" + t + ">").appendTo(e),
                i = n.css("display");
            n.remove(), ("none" === i || "" === i) && (mn || (mn = j.createElement("iframe"), mn.frameBorder = mn.width = mn.height = 0), e.appendChild(mn), gn && mn.createElement || (gn = (mn.contentWindow || mn.contentDocument).document, gn.write((I.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), gn.close()), n = gn.createElement(t), gn.body.appendChild(n), i = I.css(n, "display"), e.removeChild(mn)), bn[t] = i
        }
        return bn[t]
    }

    function E(t) {
        return I.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var j = t.document,
        A = t.navigator,
        W = t.location,
        I = function() {
            function n() {
                if (!s.isReady) {
                    try {
                        j.documentElement.doScroll("left")
                    } catch (t) {
                        return setTimeout(n, 1), void 0
                    }
                    s.ready()
                }
            }
            var i, o, a, r, s = function(t, e) {
                    return new s.fn.init(t, e, i)
                },
                l = t.jQuery,
                c = t.$,
                u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                d = /\S/,
                p = /^\s+/,
                f = /\s+$/,
                h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                m = /^[\],:{}\s]*$/,
                g = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                y = /(?:^|:|,)(?:\s*\[)+/g,
                b = /(webkit)[ \/]([\w.]+)/,
                x = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                w = /(msie) ([\w.]+)/,
                _ = /(mozilla)(?:.*? rv:([\w.]+))?/,
                $ = /-([a-z]|[0-9])/gi,
                k = /^-ms-/,
                C = function(t, e) {
                    return (e + "").toUpperCase()
                },
                F = A.userAgent,
                T = Object.prototype.toString,
                S = Object.prototype.hasOwnProperty,
                N = Array.prototype.push,
                D = Array.prototype.slice,
                E = String.prototype.trim,
                W = Array.prototype.indexOf,
                I = {};
            return s.fn = s.prototype = {
                constructor: s,
                init: function(t, n, i) {
                    var o, a, r, l;
                    if (!t) return this;
                    if (t.nodeType) return this.context = this[0] = t, this.length = 1, this;
                    if ("body" === t && !n && j.body) return this.context = j, this[0] = j.body, this.selector = t, this.length = 1, this;
                    if ("string" == typeof t) {
                        if (o = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : u.exec(t), !o || !o[1] && n) return !n || n.jquery ? (n || i).find(t) : this.constructor(n).find(t);
                        if (o[1]) return n = n instanceof s ? n[0] : n, l = n ? n.ownerDocument || n : j, r = h.exec(t), r ? s.isPlainObject(n) ? (t = [j.createElement(r[1])], s.fn.attr.call(t, n, !0)) : t = [l.createElement(r[1])] : (r = s.buildFragment([o[1]], [l]), t = (r.cacheable ? s.clone(r.fragment) : r.fragment).childNodes), s.merge(this, t);
                        if (a = j.getElementById(o[2]), a && a.parentNode) {
                            if (a.id !== o[2]) return i.find(t);
                            this.length = 1, this[0] = a
                        }
                        return this.context = j, this.selector = t, this
                    }
                    return s.isFunction(t) ? i.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), s.makeArray(t, this))
                },
                selector: "",
                jquery: "1.7.2",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return D.call(this, 0)
                },
                get: function(t) {
                    return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
                },
                pushStack: function(t, e, n) {
                    var i = this.constructor();
                    return s.isArray(t) ? N.apply(i, t) : s.merge(i, t), i.prevObject = this, i.context = this.context, "find" === e ? i.selector = this.selector + (this.selector ? " " : "") + n : e && (i.selector = this.selector + "." + e + "(" + n + ")"), i
                },
                each: function(t, e) {
                    return s.each(this, t, e)
                },
                ready: function(t) {
                    return s.bindReady(), a.add(t), this
                },
                eq: function(t) {
                    return t = +t, -1 === t ? this.slice(t) : this.slice(t, t + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(D.apply(this, arguments), "slice", D.call(arguments).join(","))
                },
                map: function(t) {
                    return this.pushStack(s.map(this, function(e, n) {
                        return t.call(e, n, e)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: N,
                sort: [].sort,
                splice: [].splice
            }, s.fn.init.prototype = s.fn, s.extend = s.fn.extend = function() {
                var t, n, i, o, a, r, l = arguments[0] || {},
                    c = 1,
                    u = arguments.length,
                    d = !1;
                for ("boolean" == typeof l && (d = l, l = arguments[1] || {}, c = 2), "object" == typeof l || s.isFunction(l) || (l = {}), u === c && (l = this, --c); u > c; c++)
                    if (null != (t = arguments[c]))
                        for (n in t) i = l[n], o = t[n], l !== o && (d && o && (s.isPlainObject(o) || (a = s.isArray(o))) ? (a ? (a = !1, r = i && s.isArray(i) ? i : []) : r = i && s.isPlainObject(i) ? i : {}, l[n] = s.extend(d, r, o)) : o !== e && (l[n] = o));
                return l
            }, s.extend({
                noConflict: function(e) {
                    return t.$ === s && (t.$ = c), e && t.jQuery === s && (t.jQuery = l), s
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? s.readyWait++ : s.ready(!0)
                },
                ready: function(t) {
                    if (t === !0 && !--s.readyWait || t !== !0 && !s.isReady) {
                        if (!j.body) return setTimeout(s.ready, 1);
                        if (s.isReady = !0, t !== !0 && --s.readyWait > 0) return;
                        a.fireWith(j, [s]), s.fn.trigger && s(j).trigger("ready").off("ready")
                    }
                },
                bindReady: function() {
                    if (!a) {
                        if (a = s.Callbacks("once memory"), "complete" === j.readyState) return setTimeout(s.ready, 1);
                        if (j.addEventListener) j.addEventListener("DOMContentLoaded", r, !1), t.addEventListener("load", s.ready, !1);
                        else if (j.attachEvent) {
                            j.attachEvent("onreadystatechange", r), t.attachEvent("onload", s.ready);
                            var e = !1;
                            try {
                                e = null == t.frameElement
                            } catch (i) {}
                            j.documentElement.doScroll && e && n()
                        }
                    }
                },
                isFunction: function(t) {
                    return "function" === s.type(t)
                },
                isArray: Array.isArray || function(t) {
                    return "array" === s.type(t)
                },
                isWindow: function(t) {
                    return null != t && t == t.window
                },
                isNumeric: function(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                },
                type: function(t) {
                    return null == t ? String(t) : I[T.call(t)] || "object"
                },
                isPlainObject: function(t) {
                    if (!t || "object" !== s.type(t) || t.nodeType || s.isWindow(t)) return !1;
                    try {
                        if (t.constructor && !S.call(t, "constructor") && !S.call(t.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (n) {
                        return !1
                    }
                    var i;
                    for (i in t);
                    return i === e || S.call(t, i)
                },
                isEmptyObject: function(t) {
                    for (var e in t) return !1;
                    return !0
                },
                error: function(t) {
                    throw new Error(t)
                },
                parseJSON: function(e) {
                    return "string" == typeof e && e ? (e = s.trim(e), t.JSON && t.JSON.parse ? t.JSON.parse(e) : m.test(e.replace(g, "@").replace(v, "]").replace(y, "")) ? new Function("return " + e)() : (s.error("Invalid JSON: " + e), void 0)) : null
                },
                parseXML: function(n) {
                    if ("string" != typeof n || !n) return null;
                    var i, o;
                    try {
                        t.DOMParser ? (o = new DOMParser, i = o.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
                    } catch (a) {
                        i = e
                    }
                    return i && i.documentElement && !i.getElementsByTagName("parsererror").length || s.error("Invalid XML: " + n), i
                },
                noop: function() {},
                globalEval: function(e) {
                    e && d.test(e) && (t.execScript || function(e) {
                        t.eval.call(t, e)
                    })(e)
                },
                camelCase: function(t) {
                    return t.replace(k, "ms-").replace($, C)
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toUpperCase() === e.toUpperCase()
                },
                each: function(t, n, i) {
                    var o, a = 0,
                        r = t.length,
                        l = r === e || s.isFunction(t);
                    if (i)
                        if (l) {
                            for (o in t)
                                if (n.apply(t[o], i) === !1) break
                        } else
                            for (; r > a && n.apply(t[a++], i) !== !1;);
                    else if (l) {
                        for (o in t)
                            if (n.call(t[o], o, t[o]) === !1) break
                    } else
                        for (; r > a && n.call(t[a], a, t[a++]) !== !1;);
                    return t
                },
                trim: E ? function(t) {
                    return null == t ? "" : E.call(t)
                } : function(t) {
                    return null == t ? "" : t.toString().replace(p, "").replace(f, "")
                },
                makeArray: function(t, e) {
                    var n = e || [];
                    if (null != t) {
                        var i = s.type(t);
                        null == t.length || "string" === i || "function" === i || "regexp" === i || s.isWindow(t) ? N.call(n, t) : s.merge(n, t)
                    }
                    return n
                },
                inArray: function(t, e, n) {
                    var i;
                    if (e) {
                        if (W) return W.call(e, t, n);
                        for (i = e.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                            if (n in e && e[n] === t) return n
                    }
                    return -1
                },
                merge: function(t, n) {
                    var i = t.length,
                        o = 0;
                    if ("number" == typeof n.length)
                        for (var a = n.length; a > o; o++) t[i++] = n[o];
                    else
                        for (; n[o] !== e;) t[i++] = n[o++];
                    return t.length = i, t
                },
                grep: function(t, e, n) {
                    var i, o = [];
                    n = !!n;
                    for (var a = 0, r = t.length; r > a; a++) i = !!e(t[a], a), n !== i && o.push(t[a]);
                    return o
                },
                map: function(t, n, i) {
                    var o, a, r = [],
                        l = 0,
                        c = t.length,
                        u = t instanceof s || c !== e && "number" == typeof c && (c > 0 && t[0] && t[c - 1] || 0 === c || s.isArray(t));
                    if (u)
                        for (; c > l; l++) o = n(t[l], l, i), null != o && (r[r.length] = o);
                    else
                        for (a in t) o = n(t[a], a, i), null != o && (r[r.length] = o);
                    return r.concat.apply([], r)
                },
                guid: 1,
                proxy: function(t, n) {
                    if ("string" == typeof n) {
                        var i = t[n];
                        n = t, t = i
                    }
                    if (!s.isFunction(t)) return e;
                    var o = D.call(arguments, 2),
                        a = function() {
                            return t.apply(n, o.concat(D.call(arguments)))
                        };
                    return a.guid = t.guid = t.guid || a.guid || s.guid++, a
                },
                access: function(t, n, i, o, a, r, l) {
                    var c, u = null == i,
                        d = 0,
                        p = t.length;
                    if (i && "object" == typeof i) {
                        for (d in i) s.access(t, n, d, i[d], 1, r, o);
                        a = 1
                    } else if (o !== e) {
                        if (c = l === e && s.isFunction(o), u && (c ? (c = n, n = function(t, e, n) {
                                return c.call(s(t), n)
                            }) : (n.call(t, o), n = null)), n)
                            for (; p > d; d++) n(t[d], i, c ? o.call(t[d], d, n(t[d], i)) : o, l);
                        a = 1
                    }
                    return a ? t : u ? n.call(t) : p ? n(t[0], i) : r
                },
                now: function() {
                    return (new Date).getTime()
                },
                uaMatch: function(t) {
                    t = t.toLowerCase();
                    var e = b.exec(t) || x.exec(t) || w.exec(t) || t.indexOf("compatible") < 0 && _.exec(t) || [];
                    return {
                        browser: e[1] || "",
                        version: e[2] || "0"
                    }
                },
                sub: function() {
                    function t(e, n) {
                        return new t.fn.init(e, n)
                    }
                    s.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(n, i) {
                        return i && i instanceof s && !(i instanceof t) && (i = t(i)), s.fn.init.call(this, n, i, e)
                    }, t.fn.init.prototype = t.fn;
                    var e = t(j);
                    return t
                },
                browser: {}
            }), s.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(t, e) {
                I["[object " + e + "]"] = e.toLowerCase()
            }), o = s.uaMatch(F), o.browser && (s.browser[o.browser] = !0, s.browser.version = o.version), s.browser.webkit && (s.browser.safari = !0), d.test(" ") && (p = /^[\s\xA0]+/, f = /[\s\xA0]+$/), i = s(j), j.addEventListener ? r = function() {
                j.removeEventListener("DOMContentLoaded", r, !1), s.ready()
            } : j.attachEvent && (r = function() {
                "complete" === j.readyState && (j.detachEvent("onreadystatechange", r), s.ready())
            }), s
        }(),
        L = {};
    I.Callbacks = function(t) {
        t = t ? L[t] || n(t) : {};
        var i, o, a, r, s, l, c = [],
            u = [],
            d = function(e) {
                var n, i, o, a;
                for (n = 0, i = e.length; i > n; n++) o = e[n], a = I.type(o), "array" === a ? d(o) : "function" === a && (t.unique && f.has(o) || c.push(o))
            },
            p = function(e, n) {
                for (n = n || [], i = !t.memory || [e, n], o = !0, a = !0, l = r || 0, r = 0, s = c.length; c && s > l; l++)
                    if (c[l].apply(e, n) === !1 && t.stopOnFalse) {
                        i = !0;
                        break
                    }
                a = !1, c && (t.once ? i === !0 ? f.disable() : c = [] : u && u.length && (i = u.shift(), f.fireWith(i[0], i[1])))
            },
            f = {
                add: function() {
                    if (c) {
                        var t = c.length;
                        d(arguments), a ? s = c.length : i && i !== !0 && (r = t, p(i[0], i[1]))
                    }
                    return this
                },
                remove: function() {
                    if (c)
                        for (var e = arguments, n = 0, i = e.length; i > n; n++)
                            for (var o = 0; o < c.length && (e[n] !== c[o] || (a && s >= o && (s--, l >= o && l--), c.splice(o--, 1), !t.unique)); o++);
                    return this
                },
                has: function(t) {
                    if (c)
                        for (var e = 0, n = c.length; n > e; e++)
                            if (t === c[e]) return !0;
                    return !1
                },
                empty: function() {
                    return c = [], this
                },
                disable: function() {
                    return c = u = i = e, this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return u = e, i && i !== !0 || f.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, n) {
                    return u && (a ? t.once || u.push([e, n]) : t.once && i || p(e, n)), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return f
    };
    var P = [].slice;
    I.extend({
        Deferred: function(t) {
            var e, n = I.Callbacks("once memory"),
                i = I.Callbacks("once memory"),
                o = I.Callbacks("memory"),
                a = "pending",
                r = {
                    resolve: n,
                    reject: i,
                    notify: o
                },
                s = {
                    done: n.add,
                    fail: i.add,
                    progress: o.add,
                    state: function() {
                        return a
                    },
                    isResolved: n.fired,
                    isRejected: i.fired,
                    then: function(t, e, n) {
                        return l.done(t).fail(e).progress(n), this
                    },
                    always: function() {
                        return l.done.apply(l, arguments).fail.apply(l, arguments), this
                    },
                    pipe: function(t, e, n) {
                        return I.Deferred(function(i) {
                            I.each({
                                done: [t, "resolve"],
                                fail: [e, "reject"],
                                progress: [n, "notify"]
                            }, function(t, e) {
                                var n, o = e[0],
                                    a = e[1];
                                I.isFunction(o) ? l[t](function() {
                                    n = o.apply(this, arguments), n && I.isFunction(n.promise) ? n.promise().then(i.resolve, i.reject, i.notify) : i[a + "With"](this === l ? i : this, [n])
                                }) : l[t](i[a])
                            })
                        }).promise()
                    },
                    promise: function(t) {
                        if (null == t) t = s;
                        else
                            for (var e in s) t[e] = s[e];
                        return t
                    }
                },
                l = s.promise({});
            for (e in r) l[e] = r[e].fire, l[e + "With"] = r[e].fireWith;
            return l.done(function() {
                a = "resolved"
            }, i.disable, o.lock).fail(function() {
                a = "rejected"
            }, n.disable, o.lock), t && t.call(l, l), l
        },
        when: function(t) {
            function e(t) {
                return function(e) {
                    i[t] = arguments.length > 1 ? P.call(arguments, 0) : e, --s || l.resolveWith(l, i)
                }
            }

            function n(t) {
                return function(e) {
                    r[t] = arguments.length > 1 ? P.call(arguments, 0) : e, l.notifyWith(c, r)
                }
            }
            var i = P.call(arguments, 0),
                o = 0,
                a = i.length,
                r = new Array(a),
                s = a,
                l = 1 >= a && t && I.isFunction(t.promise) ? t : I.Deferred(),
                c = l.promise();
            if (a > 1) {
                for (; a > o; o++) i[o] && i[o].promise && I.isFunction(i[o].promise) ? i[o].promise().then(e(o), l.reject, n(o)) : --s;
                s || l.resolveWith(l, i)
            } else l !== t && l.resolveWith(l, a ? [t] : []);
            return c
        }
    }), I.support = function() {
        var e, n, i, o, a, r, s, l, c, u, d, p = j.createElement("div");
        if (j.documentElement, p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), i = p.getElementsByTagName("a")[0], !n || !n.length || !i) return {};
        o = j.createElement("select"), a = o.appendChild(j.createElement("option")), r = p.getElementsByTagName("input")[0], e = {
            leadingWhitespace: 3 === p.firstChild.nodeType,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(i.getAttribute("style")),
            hrefNormalized: "/a" === i.getAttribute("href"),
            opacity: /^0.55/.test(i.style.opacity),
            cssFloat: !!i.style.cssFloat,
            checkOn: "on" === r.value,
            optSelected: a.selected,
            getSetAttribute: "t" !== p.className,
            enctype: !!j.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== j.createElement("nav").cloneNode(!0).outerHTML,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, I.boxModel = e.boxModel = "CSS1Compat" === j.compatMode, r.checked = !0, e.noCloneChecked = r.cloneNode(!0).checked, o.disabled = !0, e.optDisabled = !a.disabled;
        try {
            delete p.test
        } catch (f) {
            e.deleteExpando = !1
        }
        if (!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function() {
                e.noCloneEvent = !1
            }), p.cloneNode(!0).fireEvent("onclick")), r = j.createElement("input"), r.value = "t", r.setAttribute("type", "radio"), e.radioValue = "t" === r.value, r.setAttribute("checked", "checked"), r.setAttribute("name", "t"), p.appendChild(r), s = j.createDocumentFragment(), s.appendChild(p.lastChild), e.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, e.appendChecked = r.checked, s.removeChild(r), s.appendChild(p), p.attachEvent)
            for (u in {
                    submit: 1,
                    change: 1,
                    focusin: 1
                }) c = "on" + u, d = c in p, d || (p.setAttribute(c, "return;"), d = "function" == typeof p[c]), e[u + "Bubbles"] = d;
        return s.removeChild(p), s = o = a = p = r = null, I(function() {
            var n, i, o, a, r, s, c, u, f, h, m, g, v = j.getElementsByTagName("body")[0];
            v && (c = 1, g = "padding:0;margin:0;border:", h = "position:absolute;top:0;left:0;width:1px;height:1px;", m = g + "0;visibility:hidden;", u = "style='" + h + g + "5px solid #000;", f = "<div " + u + "display:block;'><div style='" + g + "0;display:block;overflow:hidden;'></div></div>" + "<table " + u + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", n = j.createElement("div"), n.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + c + "px", v.insertBefore(n, v.firstChild), p = j.createElement("div"), n.appendChild(p), p.innerHTML = "<table><tr><td style='" + g + "0;display:none'></td><td>t</td></tr></table>", l = p.getElementsByTagName("td"), d = 0 === l[0].offsetHeight, l[0].style.display = "", l[1].style.display = "none", e.reliableHiddenOffsets = d && 0 === l[0].offsetHeight, t.getComputedStyle && (p.innerHTML = "", s = j.createElement("div"), s.style.width = "0", s.style.marginRight = "0", p.style.width = "2px", p.appendChild(s), e.reliableMarginRight = 0 === (parseInt((t.getComputedStyle(s, null) || {
                marginRight: 0
            }).marginRight, 10) || 0)), "undefined" != typeof p.style.zoom && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, e.inlineBlockNeedsLayout = 3 === p.offsetWidth, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", e.shrinkWrapBlocks = 3 !== p.offsetWidth), p.style.cssText = h + m, p.innerHTML = f, i = p.firstChild, o = i.firstChild, a = i.nextSibling.firstChild.firstChild, r = {
                doesNotAddBorder: 5 !== o.offsetTop,
                doesAddBorderForTableAndCells: 5 === a.offsetTop
            }, o.style.position = "fixed", o.style.top = "20px", r.fixedPosition = 20 === o.offsetTop || 15 === o.offsetTop, o.style.position = o.style.top = "", i.style.overflow = "hidden", i.style.position = "relative", r.subtractsBorderForOverflowNotVisible = -5 === o.offsetTop, r.doesNotIncludeMarginInBodyOffset = v.offsetTop !== c, t.getComputedStyle && (p.style.marginTop = "1%", e.pixelMargin = "1%" !== (t.getComputedStyle(p, null) || {
                marginTop: 0
            }).marginTop), "undefined" != typeof n.style.zoom && (n.style.zoom = 1), v.removeChild(n), s = p = n = null, I.extend(e, r))
        }), e
    }();
    var M = /^(?:\{.*\}|\[.*\])$/,
        O = /([A-Z])/g;
    I.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (I.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(t) {
            return t = t.nodeType ? I.cache[t[I.expando]] : t[I.expando], !!t && !o(t)
        },
        data: function(t, n, i, o) {
            if (I.acceptData(t)) {
                var a, r, s, l = I.expando,
                    c = "string" == typeof n,
                    u = t.nodeType,
                    d = u ? I.cache : t,
                    p = u ? t[l] : t[l] && l,
                    f = "events" === n;
                if (p && d[p] && (f || o || d[p].data) || !c || i !== e) return p || (u ? t[l] = p = ++I.uuid : p = l), d[p] || (d[p] = {}, u || (d[p].toJSON = I.noop)), ("object" == typeof n || "function" == typeof n) && (o ? d[p] = I.extend(d[p], n) : d[p].data = I.extend(d[p].data, n)), a = r = d[p], o || (r.data || (r.data = {}), r = r.data), i !== e && (r[I.camelCase(n)] = i), f && !r[n] ? a.events : (c ? (s = r[n], null == s && (s = r[I.camelCase(n)])) : s = r, s)
            }
        },
        removeData: function(t, e, n) {
            if (I.acceptData(t)) {
                var i, a, r, s = I.expando,
                    l = t.nodeType,
                    c = l ? I.cache : t,
                    u = l ? t[s] : s;
                if (c[u]) {
                    if (e && (i = n ? c[u] : c[u].data)) {
                        I.isArray(e) || (e in i ? e = [e] : (e = I.camelCase(e), e = e in i ? [e] : e.split(" ")));
                        for (a = 0, r = e.length; r > a; a++) delete i[e[a]];
                        if (!(n ? o : I.isEmptyObject)(i)) return
                    }(n || (delete c[u].data, o(c[u]))) && (I.support.deleteExpando || !c.setInterval ? delete c[u] : c[u] = null, l && (I.support.deleteExpando ? delete t[s] : t.removeAttribute ? t.removeAttribute(s) : t[s] = null))
                }
            }
        },
        _data: function(t, e, n) {
            return I.data(t, e, n, !0)
        },
        acceptData: function(t) {
            if (t.nodeName) {
                var e = I.noData[t.nodeName.toLowerCase()];
                if (e) return !(e === !0 || t.getAttribute("classid") !== e)
            }
            return !0
        }
    }), I.fn.extend({
        data: function(t, n) {
            var o, a, r, s, l, c = this[0],
                u = 0,
                d = null;
            if (t === e) {
                if (this.length && (d = I.data(c), 1 === c.nodeType && !I._data(c, "parsedAttrs"))) {
                    for (r = c.attributes, l = r.length; l > u; u++) s = r[u].name, 0 === s.indexOf("data-") && (s = I.camelCase(s.substring(5)), i(c, s, d[s]));
                    I._data(c, "parsedAttrs", !0)
                }
                return d
            }
            return "object" == typeof t ? this.each(function() {
                I.data(this, t)
            }) : (o = t.split(".", 2), o[1] = o[1] ? "." + o[1] : "", a = o[1] + "!", I.access(this, function(n) {
                return n === e ? (d = this.triggerHandler("getData" + a, [o[0]]), d === e && c && (d = I.data(c, t), d = i(c, t, d)), d === e && o[1] ? this.data(o[0]) : d) : (o[1] = n, this.each(function() {
                    var e = I(this);
                    e.triggerHandler("setData" + a, o), I.data(this, t, n), e.triggerHandler("changeData" + a, o)
                }), void 0)
            }, null, n, arguments.length > 1, null, !1))
        },
        removeData: function(t) {
            return this.each(function() {
                I.removeData(this, t)
            })
        }
    }), I.extend({
        _mark: function(t, e) {
            t && (e = (e || "fx") + "mark", I._data(t, e, (I._data(t, e) || 0) + 1))
        },
        _unmark: function(t, e, n) {
            if (t !== !0 && (n = e, e = t, t = !1), e) {
                n = n || "fx";
                var i = n + "mark",
                    o = t ? 0 : (I._data(e, i) || 1) - 1;
                o ? I._data(e, i, o) : (I.removeData(e, i, !0), a(e, n, "mark"))
            }
        },
        queue: function(t, e, n) {
            var i;
            return t ? (e = (e || "fx") + "queue", i = I._data(t, e), n && (!i || I.isArray(n) ? i = I._data(t, e, I.makeArray(n)) : i.push(n)), i || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = I.queue(t, e),
                i = n.shift(),
                o = {};
            "inprogress" === i && (i = n.shift()), i && ("fx" === e && n.unshift("inprogress"), I._data(t, e + ".run", o), i.call(t, function() {
                I.dequeue(t, e)
            }, o)), n.length || (I.removeData(t, e + "queue " + e + ".run", !0), a(t, e, "queue"))
        }
    }), I.fn.extend({
        queue: function(t, n) {
            var i = 2;
            return "string" != typeof t && (n = t, t = "fx", i--), arguments.length < i ? I.queue(this[0], t) : n === e ? this : this.each(function() {
                var e = I.queue(this, t, n);
                "fx" === t && "inprogress" !== e[0] && I.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                I.dequeue(this, t)
            })
        },
        delay: function(t, e) {
            return t = I.fx ? I.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                var i = setTimeout(e, t);
                n.stop = function() {
                    clearTimeout(i)
                }
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, n) {
            function i() {
                --l || a.resolveWith(r, [r])
            }
            "string" != typeof t && (n = t, t = e), t = t || "fx";
            for (var o, a = I.Deferred(), r = this, s = r.length, l = 1, c = t + "defer", u = t + "queue", d = t + "mark"; s--;)(o = I.data(r[s], c, e, !0) || (I.data(r[s], u, e, !0) || I.data(r[s], d, e, !0)) && I.data(r[s], c, I.Callbacks("once memory"), !0)) && (l++, o.add(i));
            return i(), a.promise(n)
        }
    });
    var q, B, H, R = /[\n\t\r]/g,
        z = /\s+/,
        U = /\r/g,
        X = /^(?:button|input)$/i,
        K = /^(?:button|input|object|select|textarea)$/i,
        Q = /^a(?:rea)?$/i,
        J = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Y = I.support.getSetAttribute;
    I.fn.extend({
        attr: function(t, e) {
            return I.access(this, I.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                I.removeAttr(this, t)
            })
        },
        prop: function(t, e) {
            return I.access(this, I.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = I.propFix[t] || t, this.each(function() {
                try {
                    this[t] = e, delete this[t]
                } catch (n) {}
            })
        },
        addClass: function(t) {
            var e, n, i, o, a, r, s;
            if (I.isFunction(t)) return this.each(function(e) {
                I(this).addClass(t.call(this, e, this.className))
            });
            if (t && "string" == typeof t)
                for (e = t.split(z), n = 0, i = this.length; i > n; n++)
                    if (o = this[n], 1 === o.nodeType)
                        if (o.className || 1 !== e.length) {
                            for (a = " " + o.className + " ", r = 0, s = e.length; s > r; r++) ~a.indexOf(" " + e[r] + " ") || (a += e[r] + " ");
                            o.className = I.trim(a)
                        } else o.className = t;
            return this
        },
        removeClass: function(t) {
            var n, i, o, a, r, s, l;
            if (I.isFunction(t)) return this.each(function(e) {
                I(this).removeClass(t.call(this, e, this.className))
            });
            if (t && "string" == typeof t || t === e)
                for (n = (t || "").split(z), i = 0, o = this.length; o > i; i++)
                    if (a = this[i], 1 === a.nodeType && a.className)
                        if (t) {
                            for (r = (" " + a.className + " ").replace(R, " "), s = 0, l = n.length; l > s; s++) r = r.replace(" " + n[s] + " ", " ");
                            a.className = I.trim(r)
                        } else a.className = "";
            return this
        },
        toggleClass: function(t, e) {
            var n = typeof t,
                i = "boolean" == typeof e;
            return I.isFunction(t) ? this.each(function(n) {
                I(this).toggleClass(t.call(this, n, this.className, e), e)
            }) : this.each(function() {
                if ("string" === n)
                    for (var o, a = 0, r = I(this), s = e, l = t.split(z); o = l[a++];) s = i ? s : !r.hasClass(o), r[s ? "addClass" : "removeClass"](o);
                else("undefined" === n || "boolean" === n) && (this.className && I._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : I._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", n = 0, i = this.length; i > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(R, " ").indexOf(e) > -1) return !0;
            return !1
        },
        val: function(t) {
            var n, i, o, a = this[0]; {
                if (arguments.length) return o = I.isFunction(t), this.each(function(i) {
                    var a, r = I(this);
                    1 === this.nodeType && (a = o ? t.call(this, i, r.val()) : t, null == a ? a = "" : "number" == typeof a ? a += "" : I.isArray(a) && (a = I.map(a, function(t) {
                        return null == t ? "" : t + ""
                    })), n = I.valHooks[this.type] || I.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, a, "value") !== e || (this.value = a))
                });
                if (a) return n = I.valHooks[a.type] || I.valHooks[a.nodeName.toLowerCase()], n && "get" in n && (i = n.get(a, "value")) !== e ? i : (i = a.value, "string" == typeof i ? i.replace(U, "") : null == i ? "" : i)
            }
        }
    }), I.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = t.attributes.value;
                    return !e || e.specified ? t.value : t.text
                }
            },
            select: {
                get: function(t) {
                    var e, n, i, o, a = t.selectedIndex,
                        r = [],
                        s = t.options,
                        l = "select-one" === t.type;
                    if (0 > a) return null;
                    for (n = l ? a : 0, i = l ? a + 1 : s.length; i > n; n++)
                        if (o = s[n], !(!o.selected || (I.support.optDisabled ? o.disabled : null !== o.getAttribute("disabled")) || o.parentNode.disabled && I.nodeName(o.parentNode, "optgroup"))) {
                            if (e = I(o).val(), l) return e;
                            r.push(e)
                        }
                    return l && !r.length && s.length ? I(s[a]).val() : r
                },
                set: function(t, e) {
                    var n = I.makeArray(e);
                    return I(t).find("option").each(function() {
                        this.selected = I.inArray(I(this).val(), n) >= 0
                    }), n.length || (t.selectedIndex = -1), n
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(t, n, i, o) {
            var a, r, s, l = t.nodeType;
            if (t && 3 !== l && 8 !== l && 2 !== l) return o && n in I.attrFn ? I(t)[n](i) : "undefined" == typeof t.getAttribute ? I.prop(t, n, i) : (s = 1 !== l || !I.isXMLDoc(t), s && (n = n.toLowerCase(), r = I.attrHooks[n] || (J.test(n) ? B : q)), i !== e ? null === i ? (I.removeAttr(t, n), void 0) : r && "set" in r && s && (a = r.set(t, i, n)) !== e ? a : (t.setAttribute(n, "" + i), i) : r && "get" in r && s && null !== (a = r.get(t, n)) ? a : (a = t.getAttribute(n), null === a ? e : a))
        },
        removeAttr: function(t, e) {
            var n, i, o, a, r, s = 0;
            if (e && 1 === t.nodeType)
                for (i = e.toLowerCase().split(z), a = i.length; a > s; s++) o = i[s], o && (n = I.propFix[o] || o, r = J.test(o), r || I.attr(t, o, ""), t.removeAttribute(Y ? o : n), r && n in t && (t[n] = !1))
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (X.test(t.nodeName) && t.parentNode) I.error("type property can't be changed");
                    else if (!I.support.radioValue && "radio" === e && I.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            },
            value: {
                get: function(t, e) {
                    return q && I.nodeName(t, "button") ? q.get(t, e) : e in t ? t.value : null
                },
                set: function(t, e, n) {
                    return q && I.nodeName(t, "button") ? q.set(t, e, n) : (t.value = e, void 0)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(t, n, i) {
            var o, a, r, s = t.nodeType;
            if (t && 3 !== s && 8 !== s && 2 !== s) return r = 1 !== s || !I.isXMLDoc(t), r && (n = I.propFix[n] || n, a = I.propHooks[n]), i !== e ? a && "set" in a && (o = a.set(t, i, n)) !== e ? o : t[n] = i : a && "get" in a && null !== (o = a.get(t, n)) ? o : t[n]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var n = t.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : K.test(t.nodeName) || Q.test(t.nodeName) && t.href ? 0 : e
                }
            }
        }
    }), I.attrHooks.tabindex = I.propHooks.tabIndex, B = {
        get: function(t, n) {
            var i, o = I.prop(t, n);
            return o === !0 || "boolean" != typeof o && (i = t.getAttributeNode(n)) && i.nodeValue !== !1 ? n.toLowerCase() : e
        },
        set: function(t, e, n) {
            var i;
            return e === !1 ? I.removeAttr(t, n) : (i = I.propFix[n] || n, i in t && (t[i] = !0), t.setAttribute(n, n.toLowerCase())), n
        }
    }, Y || (H = {
        name: !0,
        id: !0,
        coords: !0
    }, q = I.valHooks.button = {
        get: function(t, n) {
            var i;
            return i = t.getAttributeNode(n), i && (H[n] ? "" !== i.nodeValue : i.specified) ? i.nodeValue : e
        },
        set: function(t, e, n) {
            var i = t.getAttributeNode(n);
            return i || (i = j.createAttribute(n), t.setAttributeNode(i)), i.nodeValue = e + ""
        }
    }, I.attrHooks.tabindex.set = q.set, I.each(["width", "height"], function(t, e) {
        I.attrHooks[e] = I.extend(I.attrHooks[e], {
            set: function(t, n) {
                return "" === n ? (t.setAttribute(e, "auto"), n) : void 0
            }
        })
    }), I.attrHooks.contenteditable = {
        get: q.get,
        set: function(t, e, n) {
            "" === e && (e = "false"), q.set(t, e, n)
        }
    }), I.support.hrefNormalized || I.each(["href", "src", "width", "height"], function(t, n) {
        I.attrHooks[n] = I.extend(I.attrHooks[n], {
            get: function(t) {
                var i = t.getAttribute(n, 2);
                return null === i ? e : i
            }
        })
    }), I.support.style || (I.attrHooks.style = {
        get: function(t) {
            return t.style.cssText.toLowerCase() || e
        },
        set: function(t, e) {
            return t.style.cssText = "" + e
        }
    }), I.support.optSelected || (I.propHooks.selected = I.extend(I.propHooks.selected, {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    })), I.support.enctype || (I.propFix.enctype = "encoding"), I.support.checkOn || I.each(["radio", "checkbox"], function() {
        I.valHooks[this] = {
            get: function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            }
        }
    }), I.each(["radio", "checkbox"], function() {
        I.valHooks[this] = I.extend(I.valHooks[this], {
            set: function(t, e) {
                return I.isArray(e) ? t.checked = I.inArray(I(t).val(), e) >= 0 : void 0
            }
        })
    });
    var V = /^(?:textarea|input|select)$/i,
        G = /^([^\.]*)?(?:\.(.+))?$/,
        Z = /(?:^|\s)hover(\.\S+)?\b/,
        te = /^key/,
        ee = /^(?:mouse|contextmenu)|click/,
        ne = /^(?:focusinfocus|focusoutblur)$/,
        ie = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        oe = function(t) {
            var e = ie.exec(t);
            return e && (e[1] = (e[1] || "").toLowerCase(), e[3] = e[3] && new RegExp("(?:^|\\s)" + e[3] + "(?:\\s|$)")), e
        },
        ae = function(t, e) {
            var n = t.attributes || {};
            return !(e[1] && t.nodeName.toLowerCase() !== e[1] || e[2] && (n.id || {}).value !== e[2] || e[3] && !e[3].test((n["class"] || {}).value))
        },
        re = function(t) {
            return I.event.special.hover ? t : t.replace(Z, "mouseenter$1 mouseleave$1")
        };
    I.event = {
            add: function(t, n, i, o, a) {
                var r, s, l, c, u, d, p, f, h, m, g;
                if (3 !== t.nodeType && 8 !== t.nodeType && n && i && (r = I._data(t))) {
                    for (i.handler && (h = i, i = h.handler, a = h.selector), i.guid || (i.guid = I.guid++), l = r.events, l || (r.events = l = {}), s = r.handle, s || (r.handle = s = function(t) {
                            return "undefined" == typeof I || t && I.event.triggered === t.type ? e : I.event.dispatch.apply(s.elem, arguments)
                        }, s.elem = t), n = I.trim(re(n)).split(" "), c = 0; c < n.length; c++) u = G.exec(n[c]) || [], d = u[1], p = (u[2] || "").split(".").sort(), g = I.event.special[d] || {}, d = (a ? g.delegateType : g.bindType) || d, g = I.event.special[d] || {}, f = I.extend({
                        type: d,
                        origType: u[1],
                        data: o,
                        handler: i,
                        guid: i.guid,
                        selector: a,
                        quick: a && oe(a),
                        namespace: p.join(".")
                    }, h), m = l[d], m || (m = l[d] = [], m.delegateCount = 0, g.setup && g.setup.call(t, o, p, s) !== !1 || (t.addEventListener ? t.addEventListener(d, s, !1) : t.attachEvent && t.attachEvent("on" + d, s))), g.add && (g.add.call(t, f), f.handler.guid || (f.handler.guid = i.guid)), a ? m.splice(m.delegateCount++, 0, f) : m.push(f), I.event.global[d] = !0;
                    t = null
                }
            },
            global: {},
            remove: function(t, e, n, i, o) {
                var a, r, s, l, c, u, d, p, f, h, m, g, v = I.hasData(t) && I._data(t);
                if (v && (p = v.events)) {
                    for (e = I.trim(re(e || "")).split(" "), a = 0; a < e.length; a++)
                        if (r = G.exec(e[a]) || [], s = l = r[1], c = r[2], s) {
                            for (f = I.event.special[s] || {}, s = (i ? f.delegateType : f.bindType) || s, m = p[s] || [], u = m.length, c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null, d = 0; d < m.length; d++) g = m[d], !o && l !== g.origType || n && n.guid !== g.guid || c && !c.test(g.namespace) || i && i !== g.selector && ("**" !== i || !g.selector) || (m.splice(d--, 1), g.selector && m.delegateCount--, f.remove && f.remove.call(t, g));
                            0 === m.length && u !== m.length && (f.teardown && f.teardown.call(t, c) !== !1 || I.removeEvent(t, s, v.handle), delete p[s])
                        } else
                            for (s in p) I.event.remove(t, s + e[a], n, i, !0);
                    I.isEmptyObject(p) && (h = v.handle, h && (h.elem = null), I.removeData(t, ["events", "handle"], !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(n, i, o, a) {
                if (!o || 3 !== o.nodeType && 8 !== o.nodeType) {
                    var r, s, l, c, u, d, p, f, h, m, g = n.type || n,
                        v = [];
                    if (!ne.test(g + I.event.triggered) && (g.indexOf("!") >= 0 && (g = g.slice(0, -1), s = !0), g.indexOf(".") >= 0 && (v = g.split("."), g = v.shift(), v.sort()), o && !I.event.customEvent[g] || I.event.global[g]))
                        if (n = "object" == typeof n ? n[I.expando] ? n : new I.Event(g, n) : new I.Event(g), n.type = g, n.isTrigger = !0, n.exclusive = s, n.namespace = v.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, d = g.indexOf(":") < 0 ? "on" + g : "", o) {
                            if (n.result = e, n.target || (n.target = o), i = null != i ? I.makeArray(i) : [], i.unshift(n), p = I.event.special[g] || {}, !p.trigger || p.trigger.apply(o, i) !== !1) {
                                if (h = [
                                        [o, p.bindType || g]
                                    ], !a && !p.noBubble && !I.isWindow(o)) {
                                    for (m = p.delegateType || g, c = ne.test(m + g) ? o : o.parentNode, u = null; c; c = c.parentNode) h.push([c, m]), u = c;
                                    u && u === o.ownerDocument && h.push([u.defaultView || u.parentWindow || t, m])
                                }
                                for (l = 0; l < h.length && !n.isPropagationStopped(); l++) c = h[l][0], n.type = h[l][1], f = (I._data(c, "events") || {})[n.type] && I._data(c, "handle"), f && f.apply(c, i), f = d && c[d], f && I.acceptData(c) && f.apply(c, i) === !1 && n.preventDefault();
                                return n.type = g, a || n.isDefaultPrevented() || p._default && p._default.apply(o.ownerDocument, i) !== !1 || "click" === g && I.nodeName(o, "a") || !I.acceptData(o) || d && o[g] && ("focus" !== g && "blur" !== g || 0 !== n.target.offsetWidth) && !I.isWindow(o) && (u = o[d], u && (o[d] = null), I.event.triggered = g, o[g](), I.event.triggered = e, u && (o[d] = u)), n.result
                            }
                        } else {
                            r = I.cache;
                            for (l in r) r[l].events && r[l].events[g] && I.event.trigger(n, i, r[l].handle.elem, !0)
                        }
                }
            },
            dispatch: function(n) {
                n = I.event.fix(n || t.event);
                var i, o, a, r, s, l, c, u, d, p, f = (I._data(this, "events") || {})[n.type] || [],
                    h = f.delegateCount,
                    m = [].slice.call(arguments, 0),
                    g = !n.exclusive && !n.namespace,
                    v = I.event.special[n.type] || {},
                    y = [];
                if (m[0] = n, n.delegateTarget = this, !v.preDispatch || v.preDispatch.call(this, n) !== !1) {
                    if (h && (!n.button || "click" !== n.type))
                        for (r = I(this), r.context = this.ownerDocument || this, a = n.target; a != this; a = a.parentNode || this)
                            if (a.disabled !== !0) {
                                for (l = {}, u = [], r[0] = a, i = 0; h > i; i++) d = f[i], p = d.selector, l[p] === e && (l[p] = d.quick ? ae(a, d.quick) : r.is(p)), l[p] && u.push(d);
                                u.length && y.push({
                                    elem: a,
                                    matches: u
                                })
                            }
                    for (f.length > h && y.push({
                            elem: this,
                            matches: f.slice(h)
                        }), i = 0; i < y.length && !n.isPropagationStopped(); i++)
                        for (c = y[i], n.currentTarget = c.elem, o = 0; o < c.matches.length && !n.isImmediatePropagationStopped(); o++) d = c.matches[o], (g || !n.namespace && !d.namespace || n.namespace_re && n.namespace_re.test(d.namespace)) && (n.data = d.data, n.handleObj = d, s = ((I.event.special[d.origType] || {}).handle || d.handler).apply(c.elem, m), s !== e && (n.result = s, s === !1 && (n.preventDefault(), n.stopPropagation())));
                    return v.postDispatch && v.postDispatch.call(this, n), n.result
                }
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, n) {
                    var i, o, a, r = n.button,
                        s = n.fromElement;
                    return null == t.pageX && null != n.clientX && (i = t.target.ownerDocument || j, o = i.documentElement, a = i.body, t.pageX = n.clientX + (o && o.scrollLeft || a && a.scrollLeft || 0) - (o && o.clientLeft || a && a.clientLeft || 0), t.pageY = n.clientY + (o && o.scrollTop || a && a.scrollTop || 0) - (o && o.clientTop || a && a.clientTop || 0)), !t.relatedTarget && s && (t.relatedTarget = s === t.target ? n.toElement : s), t.which || r === e || (t.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), t
                }
            },
            fix: function(t) {
                if (t[I.expando]) return t;
                var n, i, o = t,
                    a = I.event.fixHooks[t.type] || {},
                    r = a.props ? this.props.concat(a.props) : this.props;
                for (t = I.Event(o), n = r.length; n;) i = r[--n], t[i] = o[i];
                return t.target || (t.target = o.srcElement || j), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey === e && (t.metaKey = t.ctrlKey), a.filter ? a.filter(t, o) : t
            },
            special: {
                ready: {
                    setup: I.bindReady
                },
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function(t, e, n) {
                        I.isWindow(this) && (this.onbeforeunload = n)
                    },
                    teardown: function(t, e) {
                        this.onbeforeunload === e && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function(t, e, n, i) {
                var o = I.extend(new I.Event, n, {
                    type: t,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? I.event.trigger(o, null, e) : I.event.dispatch.call(e, o), o.isDefaultPrevented() && n.preventDefault()
            }
        }, I.event.handle = I.event.dispatch, I.removeEvent = j.removeEventListener ? function(t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n, !1)
        } : function(t, e, n) {
            t.detachEvent && t.detachEvent("on" + e, n)
        }, I.Event = function(t, e) {
            return this instanceof I.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? s : r) : this.type = t, e && I.extend(this, e), this.timeStamp = t && t.timeStamp || I.now(), this[I.expando] = !0, void 0) : new I.Event(t, e)
        }, I.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = s;
                var t = this.originalEvent;
                t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function() {
                this.isPropagationStopped = s;
                var t = this.originalEvent;
                t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = s, this.stopPropagation()
            },
            isDefaultPrevented: r,
            isPropagationStopped: r,
            isImmediatePropagationStopped: r
        }, I.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(t, e) {
            I.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var n, i = this,
                        o = t.relatedTarget,
                        a = t.handleObj;
                    return a.selector, (!o || o !== i && !I.contains(i, o)) && (t.type = a.origType, n = a.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), I.support.submitBubbles || (I.event.special.submit = {
            setup: function() {
                return I.nodeName(this, "form") ? !1 : (I.event.add(this, "click._submit keypress._submit", function(t) {
                    var n = t.target,
                        i = I.nodeName(n, "input") || I.nodeName(n, "button") ? n.form : e;
                    i && !i._submit_attached && (I.event.add(i, "submit._submit", function(t) {
                        t._submit_bubble = !0
                    }), i._submit_attached = !0)
                }), void 0)
            },
            postDispatch: function(t) {
                t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && I.event.simulate("submit", this.parentNode, t, !0))
            },
            teardown: function() {
                return I.nodeName(this, "form") ? !1 : (I.event.remove(this, "._submit"), void 0)
            }
        }), I.support.changeBubbles || (I.event.special.change = {
            setup: function() {
                return V.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (I.event.add(this, "propertychange._change", function(t) {
                    "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                }), I.event.add(this, "click._change", function(t) {
                    this._just_changed && !t.isTrigger && (this._just_changed = !1, I.event.simulate("change", this, t, !0))
                })), !1) : (I.event.add(this, "beforeactivate._change", function(t) {
                    var e = t.target;
                    V.test(e.nodeName) && !e._change_attached && (I.event.add(e, "change._change", function(t) {
                        !this.parentNode || t.isSimulated || t.isTrigger || I.event.simulate("change", this.parentNode, t, !0)
                    }), e._change_attached = !0)
                }), void 0)
            },
            handle: function(t) {
                var e = t.target;
                return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return I.event.remove(this, "._change"), V.test(this.nodeName)
            }
        }), I.support.focusinBubbles || I.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var n = 0,
                i = function(t) {
                    I.event.simulate(e, t.target, I.event.fix(t), !0)
                };
            I.event.special[e] = {
                setup: function() {
                    0 === n++ && j.addEventListener(t, i, !0)
                },
                teardown: function() {
                    0 === --n && j.removeEventListener(t, i, !0)
                }
            }
        }), I.fn.extend({
            on: function(t, n, i, o, a) {
                var s, l;
                if ("object" == typeof t) {
                    "string" != typeof n && (i = i || n, n = e);
                    for (l in t) this.on(l, n, i, t[l], a);
                    return this
                }
                if (null == i && null == o ? (o = n, i = n = e) : null == o && ("string" == typeof n ? (o = i, i = e) : (o = i, i = n, n = e)), o === !1) o = r;
                else if (!o) return this;
                return 1 === a && (s = o, o = function(t) {
                    return I().off(t), s.apply(this, arguments)
                }, o.guid = s.guid || (s.guid = I.guid++)), this.each(function() {
                    I.event.add(this, t, o, i, n)
                })
            },
            one: function(t, e, n, i) {
                return this.on(t, e, n, i, 1)
            },
            off: function(t, n, i) {
                if (t && t.preventDefault && t.handleObj) {
                    var o = t.handleObj;
                    return I(t.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this
                }
                if ("object" == typeof t) {
                    for (var a in t) this.off(a, n, t[a]);
                    return this
                }
                return (n === !1 || "function" == typeof n) && (i = n, n = e), i === !1 && (i = r), this.each(function() {
                    I.event.remove(this, t, i, n)
                })
            },
            bind: function(t, e, n) {
                return this.on(t, null, e, n)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            live: function(t, e, n) {
                return I(this.context).on(t, this.selector, e, n), this
            },
            die: function(t, e) {
                return I(this.context).off(t, this.selector || "**", e), this
            },
            delegate: function(t, e, n, i) {
                return this.on(e, t, n, i)
            },
            undelegate: function(t, e, n) {
                return 1 == arguments.length ? this.off(t, "**") : this.off(e, t, n)
            },
            trigger: function(t, e) {
                return this.each(function() {
                    I.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                return this[0] ? I.event.trigger(t, e, this[0], !0) : void 0
            },
            toggle: function(t) {
                var e = arguments,
                    n = t.guid || I.guid++,
                    i = 0,
                    o = function(n) {
                        var o = (I._data(this, "lastToggle" + t.guid) || 0) % i;
                        return I._data(this, "lastToggle" + t.guid, o + 1), n.preventDefault(), e[o].apply(this, arguments) || !1
                    };
                for (o.guid = n; i < e.length;) e[i++].guid = n;
                return this.click(o)
            },
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), I.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            I.fn[e] = function(t, n) {
                return null == n && (n = t, t = null), arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }, I.attrFn && (I.attrFn[e] = !0), te.test(e) && (I.event.fixHooks[e] = I.event.keyHooks), ee.test(e) && (I.event.fixHooks[e] = I.event.mouseHooks)
        }),
        /*!
         * Sizzle CSS Selector Engine
         *  Copyright 2011, The Dojo Foundation
         *  Released under the MIT, BSD, and GPL Licenses.
         *  More information: http://sizzlejs.com/
         */
        function() {
            function t(t, e, n, i, a, r) {
                for (var s = 0, l = i.length; l > s; s++) {
                    var c = i[s];
                    if (c) {
                        var u = !1;
                        for (c = c[t]; c;) {
                            if (c[o] === n) {
                                u = i[c.sizset];
                                break
                            }
                            if (1 !== c.nodeType || r || (c[o] = n, c.sizset = s), c.nodeName.toLowerCase() === e) {
                                u = c;
                                break
                            }
                            c = c[t]
                        }
                        i[s] = u
                    }
                }
            }

            function n(t, e, n, i, a, r) {
                for (var s = 0, l = i.length; l > s; s++) {
                    var c = i[s];
                    if (c) {
                        var u = !1;
                        for (c = c[t]; c;) {
                            if (c[o] === n) {
                                u = i[c.sizset];
                                break
                            }
                            if (1 === c.nodeType)
                                if (r || (c[o] = n, c.sizset = s), "string" != typeof e) {
                                    if (c === e) {
                                        u = !0;
                                        break
                                    }
                                } else if (p.filter(e, [c]).length > 0) {
                                u = c;
                                break
                            }
                            c = c[t]
                        }
                        i[s] = u
                    }
                }
            }
            var i = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                o = "sizcache" + (Math.random() + "").replace(".", ""),
                a = 0,
                r = Object.prototype.toString,
                s = !1,
                l = !0,
                c = /\\/g,
                u = /\r\n/g,
                d = /\W/;
            [0, 0].sort(function() {
                return l = !1, 0
            });
            var p = function(t, e, n, o) {
                n = n || [], e = e || j;
                var a = e;
                if (1 !== e.nodeType && 9 !== e.nodeType) return [];
                if (!t || "string" != typeof t) return n;
                var s, l, c, u, d, f, g, v, b = !0,
                    x = p.isXML(e),
                    w = [],
                    $ = t;
                do
                    if (i.exec(""), s = i.exec($), s && ($ = s[3], w.push(s[1]), s[2])) {
                        u = s[3];
                        break
                    }
                while (s);
                if (w.length > 1 && m.exec(t))
                    if (2 === w.length && h.relative[w[0]]) l = _(w[0] + w[1], e, o);
                    else
                        for (l = h.relative[w[0]] ? [e] : p(w.shift(), e); w.length;) t = w.shift(), h.relative[t] && (t += w.shift()), l = _(t, l, o);
                else if (!o && w.length > 1 && 9 === e.nodeType && !x && h.match.ID.test(w[0]) && !h.match.ID.test(w[w.length - 1]) && (d = p.find(w.shift(), e, x), e = d.expr ? p.filter(d.expr, d.set)[0] : d.set[0]), e)
                    for (d = o ? {
                            expr: w.pop(),
                            set: y(o)
                        } : p.find(w.pop(), 1 !== w.length || "~" !== w[0] && "+" !== w[0] || !e.parentNode ? e : e.parentNode, x), l = d.expr ? p.filter(d.expr, d.set) : d.set, w.length > 0 ? c = y(l) : b = !1; w.length;) f = w.pop(), g = f, h.relative[f] ? g = w.pop() : f = "", null == g && (g = e), h.relative[f](c, g, x);
                else c = w = [];
                if (c || (c = l), c || p.error(f || t), "[object Array]" === r.call(c))
                    if (b)
                        if (e && 1 === e.nodeType)
                            for (v = 0; null != c[v]; v++) c[v] && (c[v] === !0 || 1 === c[v].nodeType && p.contains(e, c[v])) && n.push(l[v]);
                        else
                            for (v = 0; null != c[v]; v++) c[v] && 1 === c[v].nodeType && n.push(l[v]);
                else n.push.apply(n, c);
                else y(c, n);
                return u && (p(u, a, n, o), p.uniqueSort(n)), n
            };
            p.uniqueSort = function(t) {
                if (x && (s = l, t.sort(x), s))
                    for (var e = 1; e < t.length; e++) t[e] === t[e - 1] && t.splice(e--, 1);
                return t
            }, p.matches = function(t, e) {
                return p(t, null, null, e)
            }, p.matchesSelector = function(t, e) {
                return p(e, null, null, [t]).length > 0
            }, p.find = function(t, e, n) {
                var i, o, a, r, s, l;
                if (!t) return [];
                for (o = 0, a = h.order.length; a > o; o++)
                    if (s = h.order[o], (r = h.leftMatch[s].exec(t)) && (l = r[1], r.splice(1, 1), "\\" !== l.substr(l.length - 1) && (r[1] = (r[1] || "").replace(c, ""), i = h.find[s](r, e, n), null != i))) {
                        t = t.replace(h.match[s], "");
                        break
                    }
                return i || (i = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : []), {
                    set: i,
                    expr: t
                }
            }, p.filter = function(t, n, i, o) {
                for (var a, r, s, l, c, u, d, f, m, g = t, v = [], y = n, b = n && n[0] && p.isXML(n[0]); t && n.length;) {
                    for (s in h.filter)
                        if (null != (a = h.leftMatch[s].exec(t)) && a[2]) {
                            if (u = h.filter[s], d = a[1], r = !1, a.splice(1, 1), "\\" === d.substr(d.length - 1)) continue;
                            if (y === v && (v = []), h.preFilter[s])
                                if (a = h.preFilter[s](a, y, i, v, o, b)) {
                                    if (a === !0) continue
                                } else r = l = !0;
                            if (a)
                                for (f = 0; null != (c = y[f]); f++) c && (l = u(c, a, f, y), m = o ^ l, i && null != l ? m ? r = !0 : y[f] = !1 : m && (v.push(c), r = !0));
                            if (l !== e) {
                                if (i || (y = v), t = t.replace(h.match[s], ""), !r) return [];
                                break
                            }
                        }
                    if (t === g) {
                        if (null != r) break;
                        p.error(t)
                    }
                    g = t
                }
                return y
            }, p.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            };
            var f = p.getText = function(t) {
                    var e, n, i = t.nodeType,
                        o = "";
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            if ("string" == typeof t.innerText) return t.innerText.replace(u, "");
                            for (t = t.firstChild; t; t = t.nextSibling) o += f(t)
                        } else if (3 === i || 4 === i) return t.nodeValue
                    } else
                        for (e = 0; n = t[e]; e++) 8 !== n.nodeType && (o += f(n));
                    return o
                },
                h = p.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function(t) {
                            return t.getAttribute("href")
                        },
                        type: function(t) {
                            return t.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function(t, e) {
                            var n = "string" == typeof e,
                                i = n && !d.test(e),
                                o = n && !i;
                            i && (e = e.toLowerCase());
                            for (var a, r = 0, s = t.length; s > r; r++)
                                if (a = t[r]) {
                                    for (;
                                        (a = a.previousSibling) && 1 !== a.nodeType;);
                                    t[r] = o || a && a.nodeName.toLowerCase() === e ? a || !1 : a === e
                                }
                            o && p.filter(e, t, !0)
                        },
                        ">": function(t, e) {
                            var n, i = "string" == typeof e,
                                o = 0,
                                a = t.length;
                            if (i && !d.test(e)) {
                                for (e = e.toLowerCase(); a > o; o++)
                                    if (n = t[o]) {
                                        var r = n.parentNode;
                                        t[o] = r.nodeName.toLowerCase() === e ? r : !1
                                    }
                            } else {
                                for (; a > o; o++) n = t[o], n && (t[o] = i ? n.parentNode : n.parentNode === e);
                                i && p.filter(e, t, !0)
                            }
                        },
                        "": function(e, i, o) {
                            var r, s = a++,
                                l = n;
                            "string" != typeof i || d.test(i) || (i = i.toLowerCase(), r = i, l = t), l("parentNode", i, s, e, r, o)
                        },
                        "~": function(e, i, o) {
                            var r, s = a++,
                                l = n;
                            "string" != typeof i || d.test(i) || (i = i.toLowerCase(), r = i, l = t), l("previousSibling", i, s, e, r, o)
                        }
                    },
                    find: {
                        ID: function(t, e, n) {
                            if ("undefined" != typeof e.getElementById && !n) {
                                var i = e.getElementById(t[1]);
                                return i && i.parentNode ? [i] : []
                            }
                        },
                        NAME: function(t, e) {
                            if ("undefined" != typeof e.getElementsByName) {
                                for (var n = [], i = e.getElementsByName(t[1]), o = 0, a = i.length; a > o; o++) i[o].getAttribute("name") === t[1] && n.push(i[o]);
                                return 0 === n.length ? null : n
                            }
                        },
                        TAG: function(t, e) {
                            return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t[1]) : void 0
                        }
                    },
                    preFilter: {
                        CLASS: function(t, e, n, i, o, a) {
                            if (t = " " + t[1].replace(c, "") + " ", a) return t;
                            for (var r, s = 0; null != (r = e[s]); s++) r && (o ^ (r.className && (" " + r.className + " ").replace(/[\t\n\r]/g, " ").indexOf(t) >= 0) ? n || i.push(r) : n && (e[s] = !1));
                            return !1
                        },
                        ID: function(t) {
                            return t[1].replace(c, "")
                        },
                        TAG: function(t) {
                            return t[1].replace(c, "").toLowerCase()
                        },
                        CHILD: function(t) {
                            if ("nth" === t[1]) {
                                t[2] || p.error(t[0]), t[2] = t[2].replace(/^\+|\s*/g, "");
                                var e = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === t[2] && "2n" || "odd" === t[2] && "2n+1" || !/\D/.test(t[2]) && "0n+" + t[2] || t[2]);
                                t[2] = e[1] + (e[2] || 1) - 0, t[3] = e[3] - 0
                            } else t[2] && p.error(t[0]);
                            return t[0] = a++, t
                        },
                        ATTR: function(t, e, n, i, o, a) {
                            var r = t[1] = t[1].replace(c, "");
                            return !a && h.attrMap[r] && (t[1] = h.attrMap[r]), t[4] = (t[4] || t[5] || "").replace(c, ""), "~=" === t[2] && (t[4] = " " + t[4] + " "), t
                        },
                        PSEUDO: function(t, e, n, o, a) {
                            if ("not" === t[1]) {
                                if (!((i.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
                                    var r = p.filter(t[3], e, n, !0 ^ a);
                                    return n || o.push.apply(o, r), !1
                                }
                                t[3] = p(t[3], null, null, e)
                            } else if (h.match.POS.test(t[0]) || h.match.CHILD.test(t[0])) return !0;
                            return t
                        },
                        POS: function(t) {
                            return t.unshift(!0), t
                        }
                    },
                    filters: {
                        enabled: function(t) {
                            return t.disabled === !1 && "hidden" !== t.type
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            return t.checked === !0
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        parent: function(t) {
                            return !!t.firstChild
                        },
                        empty: function(t) {
                            return !t.firstChild
                        },
                        has: function(t, e, n) {
                            return !!p(n[3], t).length
                        },
                        header: function(t) {
                            return /h\d/i.test(t.nodeName)
                        },
                        text: function(t) {
                            var e = t.getAttribute("type"),
                                n = t.type;
                            return "input" === t.nodeName.toLowerCase() && "text" === n && (e === n || null === e)
                        },
                        radio: function(t) {
                            return "input" === t.nodeName.toLowerCase() && "radio" === t.type
                        },
                        checkbox: function(t) {
                            return "input" === t.nodeName.toLowerCase() && "checkbox" === t.type
                        },
                        file: function(t) {
                            return "input" === t.nodeName.toLowerCase() && "file" === t.type
                        },
                        password: function(t) {
                            return "input" === t.nodeName.toLowerCase() && "password" === t.type
                        },
                        submit: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return ("input" === e || "button" === e) && "submit" === t.type
                        },
                        image: function(t) {
                            return "input" === t.nodeName.toLowerCase() && "image" === t.type
                        },
                        reset: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return ("input" === e || "button" === e) && "reset" === t.type
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        input: function(t) {
                            return /input|select|textarea|button/i.test(t.nodeName)
                        },
                        focus: function(t) {
                            return t === t.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function(t, e) {
                            return 0 === e
                        },
                        last: function(t, e, n, i) {
                            return e === i.length - 1
                        },
                        even: function(t, e) {
                            return 0 === e % 2
                        },
                        odd: function(t, e) {
                            return 1 === e % 2
                        },
                        lt: function(t, e, n) {
                            return e < n[3] - 0
                        },
                        gt: function(t, e, n) {
                            return e > n[3] - 0
                        },
                        nth: function(t, e, n) {
                            return n[3] - 0 === e
                        },
                        eq: function(t, e, n) {
                            return n[3] - 0 === e
                        }
                    },
                    filter: {
                        PSEUDO: function(t, e, n, i) {
                            var o = e[1],
                                a = h.filters[o];
                            if (a) return a(t, n, e, i);
                            if ("contains" === o) return (t.textContent || t.innerText || f([t]) || "").indexOf(e[3]) >= 0;
                            if ("not" === o) {
                                for (var r = e[3], s = 0, l = r.length; l > s; s++)
                                    if (r[s] === t) return !1;
                                return !0
                            }
                            p.error(o)
                        },
                        CHILD: function(t, e) {
                            var n, i, a, r, s, l, c = e[1],
                                u = t;
                            switch (c) {
                                case "only":
                                case "first":
                                    for (; u = u.previousSibling;)
                                        if (1 === u.nodeType) return !1;
                                    if ("first" === c) return !0;
                                    u = t;
                                case "last":
                                    for (; u = u.nextSibling;)
                                        if (1 === u.nodeType) return !1;
                                    return !0;
                                case "nth":
                                    if (n = e[2], i = e[3], 1 === n && 0 === i) return !0;
                                    if (a = e[0], r = t.parentNode, r && (r[o] !== a || !t.nodeIndex)) {
                                        for (s = 0, u = r.firstChild; u; u = u.nextSibling) 1 === u.nodeType && (u.nodeIndex = ++s);
                                        r[o] = a
                                    }
                                    return l = t.nodeIndex - i, 0 === n ? 0 === l : 0 === l % n && l / n >= 0
                            }
                        },
                        ID: function(t, e) {
                            return 1 === t.nodeType && t.getAttribute("id") === e
                        },
                        TAG: function(t, e) {
                            return "*" === e && 1 === t.nodeType || !!t.nodeName && t.nodeName.toLowerCase() === e
                        },
                        CLASS: function(t, e) {
                            return (" " + (t.className || t.getAttribute("class")) + " ").indexOf(e) > -1
                        },
                        ATTR: function(t, e) {
                            var n = e[1],
                                i = p.attr ? p.attr(t, n) : h.attrHandle[n] ? h.attrHandle[n](t) : null != t[n] ? t[n] : t.getAttribute(n),
                                o = i + "",
                                a = e[2],
                                r = e[4];
                            return null == i ? "!=" === a : !a && p.attr ? null != i : "=" === a ? o === r : "*=" === a ? o.indexOf(r) >= 0 : "~=" === a ? (" " + o + " ").indexOf(r) >= 0 : r ? "!=" === a ? o !== r : "^=" === a ? 0 === o.indexOf(r) : "$=" === a ? o.substr(o.length - r.length) === r : "|=" === a ? o === r || o.substr(0, r.length + 1) === r + "-" : !1 : o && i !== !1
                        },
                        POS: function(t, e, n, i) {
                            var o = e[2],
                                a = h.setFilters[o];
                            return a ? a(t, n, e, i) : void 0
                        }
                    }
                },
                m = h.match.POS,
                g = function(t, e) {
                    return "\\" + (e - 0 + 1)
                };
            for (var v in h.match) h.match[v] = new RegExp(h.match[v].source + /(?![^\[]*\])(?![^\(]*\))/.source), h.leftMatch[v] = new RegExp(/(^(?:.|\r|\n)*?)/.source + h.match[v].source.replace(/\\(\d+)/g, g));
            h.match.globalPOS = m;
            var y = function(t, e) {
                return t = Array.prototype.slice.call(t, 0), e ? (e.push.apply(e, t), e) : t
            };
            try {
                Array.prototype.slice.call(j.documentElement.childNodes, 0)[0].nodeType
            } catch (b) {
                y = function(t, e) {
                    var n = 0,
                        i = e || [];
                    if ("[object Array]" === r.call(t)) Array.prototype.push.apply(i, t);
                    else if ("number" == typeof t.length)
                        for (var o = t.length; o > n; n++) i.push(t[n]);
                    else
                        for (; t[n]; n++) i.push(t[n]);
                    return i
                }
            }
            var x, w;
            j.documentElement.compareDocumentPosition ? x = function(t, e) {
                    return t === e ? (s = !0, 0) : t.compareDocumentPosition && e.compareDocumentPosition ? 4 & t.compareDocumentPosition(e) ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
                } : (x = function(t, e) {
                    if (t === e) return s = !0, 0;
                    if (t.sourceIndex && e.sourceIndex) return t.sourceIndex - e.sourceIndex;
                    var n, i, o = [],
                        a = [],
                        r = t.parentNode,
                        l = e.parentNode,
                        c = r;
                    if (r === l) return w(t, e);
                    if (!r) return -1;
                    if (!l) return 1;
                    for (; c;) o.unshift(c), c = c.parentNode;
                    for (c = l; c;) a.unshift(c), c = c.parentNode;
                    n = o.length, i = a.length;
                    for (var u = 0; n > u && i > u; u++)
                        if (o[u] !== a[u]) return w(o[u], a[u]);
                    return u === n ? w(t, a[u], -1) : w(o[u], e, 1)
                }, w = function(t, e, n) {
                    if (t === e) return n;
                    for (var i = t.nextSibling; i;) {
                        if (i === e) return -1;
                        i = i.nextSibling
                    }
                    return 1
                }),
                function() {
                    var t = j.createElement("div"),
                        n = "script" + (new Date).getTime(),
                        i = j.documentElement;
                    t.innerHTML = "<a name='" + n + "'/>", i.insertBefore(t, i.firstChild), j.getElementById(n) && (h.find.ID = function(t, n, i) {
                        if ("undefined" != typeof n.getElementById && !i) {
                            var o = n.getElementById(t[1]);
                            return o ? o.id === t[1] || "undefined" != typeof o.getAttributeNode && o.getAttributeNode("id").nodeValue === t[1] ? [o] : e : []
                        }
                    }, h.filter.ID = function(t, e) {
                        var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                        return 1 === t.nodeType && n && n.nodeValue === e
                    }), i.removeChild(t), i = t = null
                }(),
                function() {
                    var t = j.createElement("div");
                    t.appendChild(j.createComment("")), t.getElementsByTagName("*").length > 0 && (h.find.TAG = function(t, e) {
                        var n = e.getElementsByTagName(t[1]);
                        if ("*" === t[1]) {
                            for (var i = [], o = 0; n[o]; o++) 1 === n[o].nodeType && i.push(n[o]);
                            n = i
                        }
                        return n
                    }), t.innerHTML = "<a href='#'></a>", t.firstChild && "undefined" != typeof t.firstChild.getAttribute && "#" !== t.firstChild.getAttribute("href") && (h.attrHandle.href = function(t) {
                        return t.getAttribute("href", 2)
                    }), t = null
                }(), j.querySelectorAll && function() {
                    var t = p,
                        e = j.createElement("div"),
                        n = "__sizzle__";
                    if (e.innerHTML = "<p class='TEST'></p>", !e.querySelectorAll || 0 !== e.querySelectorAll(".TEST").length) {
                        p = function(e, i, o, a) {
                            if (i = i || j, !a && !p.isXML(i)) {
                                var r = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(e);
                                if (r && (1 === i.nodeType || 9 === i.nodeType)) {
                                    if (r[1]) return y(i.getElementsByTagName(e), o);
                                    if (r[2] && h.find.CLASS && i.getElementsByClassName) return y(i.getElementsByClassName(r[2]), o)
                                }
                                if (9 === i.nodeType) {
                                    if ("body" === e && i.body) return y([i.body], o);
                                    if (r && r[3]) {
                                        var s = i.getElementById(r[3]);
                                        if (!s || !s.parentNode) return y([], o);
                                        if (s.id === r[3]) return y([s], o)
                                    }
                                    try {
                                        return y(i.querySelectorAll(e), o)
                                    } catch (l) {}
                                } else if (1 === i.nodeType && "object" !== i.nodeName.toLowerCase()) {
                                    var c = i,
                                        u = i.getAttribute("id"),
                                        d = u || n,
                                        f = i.parentNode,
                                        m = /^\s*[+~]/.test(e);
                                    u ? d = d.replace(/'/g, "\\$&") : i.setAttribute("id", d), m && f && (i = i.parentNode);
                                    try {
                                        if (!m || f) return y(i.querySelectorAll("[id='" + d + "'] " + e), o)
                                    } catch (g) {} finally {
                                        u || c.removeAttribute("id")
                                    }
                                }
                            }
                            return t(e, i, o, a)
                        };
                        for (var i in t) p[i] = t[i];
                        e = null
                    }
                }(),
                function() {
                    var t = j.documentElement,
                        e = t.matchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.msMatchesSelector;
                    if (e) {
                        var n = !e.call(j.createElement("div"), "div"),
                            i = !1;
                        try {
                            e.call(j.documentElement, "[test!='']:sizzle")
                        } catch (o) {
                            i = !0
                        }
                        p.matchesSelector = function(t, o) {
                            if (o = o.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"), !p.isXML(t)) try {
                                if (i || !h.match.PSEUDO.test(o) && !/!=/.test(o)) {
                                    var a = e.call(t, o);
                                    if (a || !n || t.document && 11 !== t.document.nodeType) return a
                                }
                            } catch (r) {}
                            return p(o, null, null, [t]).length > 0
                        }
                    }
                }(),
                function() {
                    var t = j.createElement("div");
                    t.innerHTML = "<div class='test e'></div><div class='test'></div>", t.getElementsByClassName && 0 !== t.getElementsByClassName("e").length && (t.lastChild.className = "e", 1 !== t.getElementsByClassName("e").length && (h.order.splice(1, 0, "CLASS"), h.find.CLASS = function(t, e, n) {
                        return "undefined" == typeof e.getElementsByClassName || n ? void 0 : e.getElementsByClassName(t[1])
                    }, t = null))
                }(), p.contains = j.documentElement.contains ? function(t, e) {
                    return t !== e && (t.contains ? t.contains(e) : !0)
                } : j.documentElement.compareDocumentPosition ? function(t, e) {
                    return !!(16 & t.compareDocumentPosition(e))
                } : function() {
                    return !1
                }, p.isXML = function(t) {
                    var e = (t ? t.ownerDocument || t : 0).documentElement;
                    return e ? "HTML" !== e.nodeName : !1
                };
            var _ = function(t, e, n) {
                for (var i, o = [], a = "", r = e.nodeType ? [e] : e; i = h.match.PSEUDO.exec(t);) a += i[0], t = t.replace(h.match.PSEUDO, "");
                t = h.relative[t] ? t + "*" : t;
                for (var s = 0, l = r.length; l > s; s++) p(t, r[s], o, n);
                return p.filter(a, o)
            };
            p.attr = I.attr, p.selectors.attrMap = {}, I.find = p, I.expr = p.selectors, I.expr[":"] = I.expr.filters, I.unique = p.uniqueSort, I.text = p.getText, I.isXMLDoc = p.isXML, I.contains = p.contains
        }();
    var se = /Until$/,
        le = /^(?:parents|prevUntil|prevAll)/,
        ce = /,/,
        ue = /^.[^:#\[\.,]*$/,
        de = Array.prototype.slice,
        pe = I.expr.match.globalPOS,
        fe = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    I.fn.extend({
        find: function(t) {
            var e, n, i = this;
            if ("string" != typeof t) return I(t).filter(function() {
                for (e = 0, n = i.length; n > e; e++)
                    if (I.contains(i[e], this)) return !0
            });
            var o, a, r, s = this.pushStack("", "find", t);
            for (e = 0, n = this.length; n > e; e++)
                if (o = s.length, I.find(t, this[e], s), e > 0)
                    for (a = o; a < s.length; a++)
                        for (r = 0; o > r; r++)
                            if (s[r] === s[a]) {
                                s.splice(a--, 1);
                                break
                            }
            return s
        },
        has: function(t) {
            var e = I(t);
            return this.filter(function() {
                for (var t = 0, n = e.length; n > t; t++)
                    if (I.contains(this, e[t])) return !0
            })
        },
        not: function(t) {
            return this.pushStack(c(this, t, !1), "not", t)
        },
        filter: function(t) {
            return this.pushStack(c(this, t, !0), "filter", t)
        },
        is: function(t) {
            return !!t && ("string" == typeof t ? pe.test(t) ? I(t, this.context).index(this[0]) >= 0 : I.filter(t, this).length > 0 : this.filter(t).length > 0)
        },
        closest: function(t, e) {
            var n, i, o = [],
                a = this[0];
            if (I.isArray(t)) {
                for (var r = 1; a && a.ownerDocument && a !== e;) {
                    for (n = 0; n < t.length; n++) I(a).is(t[n]) && o.push({
                        selector: t[n],
                        elem: a,
                        level: r
                    });
                    a = a.parentNode, r++
                }
                return o
            }
            var s = pe.test(t) || "string" != typeof t ? I(t, e || this.context) : 0;
            for (n = 0, i = this.length; i > n; n++)
                for (a = this[n]; a;) {
                    if (s ? s.index(a) > -1 : I.find.matchesSelector(a, t)) {
                        o.push(a);
                        break
                    }
                    if (a = a.parentNode, !a || !a.ownerDocument || a === e || 11 === a.nodeType) break
                }
            return o = o.length > 1 ? I.unique(o) : o, this.pushStack(o, "closest", t)
        },
        index: function(t) {
            return t ? "string" == typeof t ? I.inArray(this[0], I(t)) : I.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(t, e) {
            var n = "string" == typeof t ? I(t, e) : I.makeArray(t && t.nodeType ? [t] : t),
                i = I.merge(this.get(), n);
            return this.pushStack(l(n[0]) || l(i[0]) ? i : I.unique(i))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }), I.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return I.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return I.dir(t, "parentNode", n)
        },
        next: function(t) {
            return I.nth(t, 2, "nextSibling")
        },
        prev: function(t) {
            return I.nth(t, 2, "previousSibling")
        },
        nextAll: function(t) {
            return I.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return I.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return I.dir(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return I.dir(t, "previousSibling", n)
        },
        siblings: function(t) {
            return I.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return I.sibling(t.firstChild)
        },
        contents: function(t) {
            return I.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : I.makeArray(t.childNodes)
        }
    }, function(t, e) {
        I.fn[t] = function(n, i) {
            var o = I.map(this, e, n);
            return se.test(t) || (i = n), i && "string" == typeof i && (o = I.filter(i, o)), o = this.length > 1 && !fe[t] ? I.unique(o) : o, (this.length > 1 || ce.test(i)) && le.test(t) && (o = o.reverse()), this.pushStack(o, t, de.call(arguments).join(","))
        }
    }), I.extend({
        filter: function(t, e, n) {
            return n && (t = ":not(" + t + ")"), 1 === e.length ? I.find.matchesSelector(e[0], t) ? [e[0]] : [] : I.find.matches(t, e)
        },
        dir: function(t, n, i) {
            for (var o = [], a = t[n]; a && 9 !== a.nodeType && (i === e || 1 !== a.nodeType || !I(a).is(i));) 1 === a.nodeType && o.push(a), a = a[n];
            return o
        },
        nth: function(t, e, n) {
            e = e || 1;
            for (var i = 0; t && (1 !== t.nodeType || ++i !== e); t = t[n]);
            return t
        },
        sibling: function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }
    });
    var he = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        me = / jQuery\d+="(?:\d+|null)"/g,
        ge = /^\s+/,
        ve = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ye = /<([\w:]+)/,
        be = /<tbody/i,
        xe = /<|&#?\w+;/,
        we = /<(?:script|style)/i,
        _e = /<(?:script|object|embed|option|style)/i,
        $e = new RegExp("<(?:" + he + ")[\\s/>]", "i"),
        ke = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ce = /\/(java|ecma)script/i,
        Fe = /^\s*<!(?:\[CDATA\[|\-\-)/,
        Te = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        Se = u(j);
    Te.optgroup = Te.option, Te.tbody = Te.tfoot = Te.colgroup = Te.caption = Te.thead, Te.th = Te.td, I.support.htmlSerialize || (Te._default = [1, "div<div>", "</div>"]), I.fn.extend({
        text: function(t) {
            return I.access(this, function(t) {
                return t === e ? I.text(this) : this.empty().append((this[0] && this[0].ownerDocument || j).createTextNode(t))
            }, null, t, arguments.length)
        },
        wrapAll: function(t) {
            if (I.isFunction(t)) return this.each(function(e) {
                I(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = I(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return I.isFunction(t) ? this.each(function(e) {
                I(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = I(this),
                    n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = I.isFunction(t);
            return this.each(function(n) {
                I(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                I.nodeName(this, "body") || I(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(t) {
                1 === this.nodeType && this.appendChild(t)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(t) {
                1 === this.nodeType && this.insertBefore(t, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(t) {
                this.parentNode.insertBefore(t, this)
            });
            if (arguments.length) {
                var t = I.clean(arguments);
                return t.push.apply(t, this.toArray()), this.pushStack(t, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(t) {
                this.parentNode.insertBefore(t, this.nextSibling)
            });
            if (arguments.length) {
                var t = this.pushStack(this, "after", arguments);
                return t.push.apply(t, I.clean(arguments)), t
            }
        },
        remove: function(t, e) {
            for (var n, i = 0; null != (n = this[i]); i++)(!t || I.filter(t, [n]).length) && (e || 1 !== n.nodeType || (I.cleanData(n.getElementsByTagName("*")), I.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++)
                for (1 === t.nodeType && I.cleanData(t.getElementsByTagName("*")); t.firstChild;) t.removeChild(t.firstChild);
            return this
        },
        clone: function(t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                return I.clone(this, t, e)
            })
        },
        html: function(t) {
            return I.access(this, function(t) {
                var n = this[0] || {},
                    i = 0,
                    o = this.length;
                if (t === e) return 1 === n.nodeType ? n.innerHTML.replace(me, "") : null;
                if (!("string" != typeof t || we.test(t) || !I.support.leadingWhitespace && ge.test(t) || Te[(ye.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(ve, "<$1></$2>");
                    try {
                        for (; o > i; i++) n = this[i] || {}, 1 === n.nodeType && (I.cleanData(n.getElementsByTagName("*")), n.innerHTML = t);
                        n = 0
                    } catch (a) {}
                }
                n && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function(t) {
            return this[0] && this[0].parentNode ? I.isFunction(t) ? this.each(function(e) {
                var n = I(this),
                    i = n.html();
                n.replaceWith(t.call(this, e, i))
            }) : ("string" != typeof t && (t = I(t).detach()), this.each(function() {
                var e = this.nextSibling,
                    n = this.parentNode;
                I(this).remove(), e ? I(e).before(t) : I(n).append(t)
            })) : this.length ? this.pushStack(I(I.isFunction(t) ? t() : t), "replaceWith", t) : this
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, n, i) {
            var o, a, r, s, l = t[0],
                c = [];
            if (!I.support.checkClone && 3 === arguments.length && "string" == typeof l && ke.test(l)) return this.each(function() {
                I(this).domManip(t, n, i, !0)
            });
            if (I.isFunction(l)) return this.each(function(o) {
                var a = I(this);
                t[0] = l.call(this, o, n ? a.html() : e), a.domManip(t, n, i)
            });
            if (this[0]) {
                if (s = l && l.parentNode, o = I.support.parentNode && s && 11 === s.nodeType && s.childNodes.length === this.length ? {
                        fragment: s
                    } : I.buildFragment(t, this, c), r = o.fragment, a = 1 === r.childNodes.length ? r = r.firstChild : r.firstChild) {
                    n = n && I.nodeName(a, "tr");
                    for (var u = 0, p = this.length, f = p - 1; p > u; u++) i.call(n ? d(this[u], a) : this[u], o.cacheable || p > 1 && f > u ? I.clone(r, !0, !0) : r)
                }
                c.length && I.each(c, function(t, e) {
                    e.src ? I.ajax({
                        type: "GET",
                        global: !1,
                        url: e.src,
                        async: !1,
                        dataType: "script"
                    }) : I.globalEval((e.text || e.textContent || e.innerHTML || "").replace(Fe, "/*$0*/")), e.parentNode && e.parentNode.removeChild(e)
                })
            }
            return this
        }
    }), I.buildFragment = function(t, e, n) {
        var i, o, a, r, s = t[0];
        return e && e[0] && (r = e[0].ownerDocument || e[0]), r.createDocumentFragment || (r = j), !(1 === t.length && "string" == typeof s && s.length < 512 && r === j && "<" === s.charAt(0)) || _e.test(s) || !I.support.checkClone && ke.test(s) || !I.support.html5Clone && $e.test(s) || (o = !0, a = I.fragments[s], a && 1 !== a && (i = a)), i || (i = r.createDocumentFragment(), I.clean(t, r, i, n)), o && (I.fragments[s] = a ? i : 1), {
            fragment: i,
            cacheable: o
        }
    }, I.fragments = {}, I.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        I.fn[t] = function(n) {
            var i = [],
                o = I(n),
                a = 1 === this.length && this[0].parentNode;
            if (a && 11 === a.nodeType && 1 === a.childNodes.length && 1 === o.length) return o[e](this[0]), this;
            for (var r = 0, s = o.length; s > r; r++) {
                var l = (r > 0 ? this.clone(!0) : this).get();
                I(o[r])[e](l), i = i.concat(l)
            }
            return this.pushStack(i, t, o.selector)
        }
    }), I.extend({
        clone: function(t, e, n) {
            var i, o, a, r = I.support.html5Clone || I.isXMLDoc(t) || !$e.test("<" + t.nodeName + ">") ? t.cloneNode(!0) : v(t);
            if (!(I.support.noCloneEvent && I.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || I.isXMLDoc(t)))
                for (f(t, r), i = h(t), o = h(r), a = 0; i[a]; ++a) o[a] && f(i[a], o[a]);
            if (e && (p(t, r), n))
                for (i = h(t), o = h(r), a = 0; i[a]; ++a) p(i[a], o[a]);
            return i = o = null, r
        },
        clean: function(t, e, n, i) {
            var o, a, r, s = [];
            e = e || j, "undefined" == typeof e.createElement && (e = e.ownerDocument || e[0] && e[0].ownerDocument || j);
            for (var l, c = 0; null != (l = t[c]); c++)
                if ("number" == typeof l && (l += ""), l) {
                    if ("string" == typeof l)
                        if (xe.test(l)) {
                            l = l.replace(ve, "<$1></$2>");
                            var d, p = (ye.exec(l) || ["", ""])[1].toLowerCase(),
                                f = Te[p] || Te._default,
                                h = f[0],
                                m = e.createElement("div"),
                                v = Se.childNodes;
                            for (e === j ? Se.appendChild(m) : u(e).appendChild(m), m.innerHTML = f[1] + l + f[2]; h--;) m = m.lastChild;
                            if (!I.support.tbody) {
                                var y = be.test(l),
                                    b = "table" !== p || y ? "<table>" !== f[1] || y ? [] : m.childNodes : m.firstChild && m.firstChild.childNodes;
                                for (r = b.length - 1; r >= 0; --r) I.nodeName(b[r], "tbody") && !b[r].childNodes.length && b[r].parentNode.removeChild(b[r])
                            }!I.support.leadingWhitespace && ge.test(l) && m.insertBefore(e.createTextNode(ge.exec(l)[0]), m.firstChild), l = m.childNodes, m && (m.parentNode.removeChild(m), v.length > 0 && (d = v[v.length - 1], d && d.parentNode && d.parentNode.removeChild(d)))
                        } else l = e.createTextNode(l);
                    var x;
                    if (!I.support.appendChecked)
                        if (l[0] && "number" == typeof(x = l.length))
                            for (r = 0; x > r; r++) g(l[r]);
                        else g(l);
                    l.nodeType ? s.push(l) : s = I.merge(s, l)
                }
            if (n)
                for (o = function(t) {
                        return !t.type || Ce.test(t.type)
                    }, c = 0; s[c]; c++)
                    if (a = s[c], i && I.nodeName(a, "script") && (!a.type || Ce.test(a.type))) i.push(a.parentNode ? a.parentNode.removeChild(a) : a);
                    else {
                        if (1 === a.nodeType) {
                            var w = I.grep(a.getElementsByTagName("script"), o);
                            s.splice.apply(s, [c + 1, 0].concat(w))
                        }
                        n.appendChild(a)
                    }
            return s
        },
        cleanData: function(t) {
            for (var e, n, i, o = I.cache, a = I.event.special, r = I.support.deleteExpando, s = 0; null != (i = t[s]); s++)
                if ((!i.nodeName || !I.noData[i.nodeName.toLowerCase()]) && (n = i[I.expando])) {
                    if (e = o[n], e && e.events) {
                        for (var l in e.events) a[l] ? I.event.remove(i, l) : I.removeEvent(i, l, e.handle);
                        e.handle && (e.handle.elem = null)
                    }
                    r ? delete i[I.expando] : i.removeAttribute && i.removeAttribute(I.expando), delete o[n]
                }
        }
    });
    var Ne, De, Ee, je = /alpha\([^)]*\)/i,
        Ae = /opacity=([^)]*)/,
        We = /([A-Z]|^ms)/g,
        Ie = /^[\-+]?(?:\d*\.)?\d+$/i,
        Le = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        Pe = /^([\-+])=([\-+.\de]+)/,
        Me = /^margin/,
        Oe = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        qe = ["Top", "Right", "Bottom", "Left"];
    I.fn.css = function(t, n) {
        return I.access(this, function(t, n, i) {
            return i !== e ? I.style(t, n, i) : I.css(t, n)
        }, t, n, arguments.length > 1)
    }, I.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = Ne(t, "opacity");
                        return "" === n ? "1" : n
                    }
                    return t.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": I.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, n, i, o) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var a, r, s = I.camelCase(n),
                    l = t.style,
                    c = I.cssHooks[s];
                if (n = I.cssProps[s] || s, i === e) return c && "get" in c && (a = c.get(t, !1, o)) !== e ? a : l[n];
                if (r = typeof i, "string" === r && (a = Pe.exec(i)) && (i = +(a[1] + 1) * +a[2] + parseFloat(I.css(t, n)), r = "number"), !(null == i || "number" === r && isNaN(i) || ("number" !== r || I.cssNumber[s] || (i += "px"), c && "set" in c && (i = c.set(t, i)) === e))) try {
                    l[n] = i
                } catch (u) {}
            }
        },
        css: function(t, n, i) {
            var o, a;
            return n = I.camelCase(n), a = I.cssHooks[n], n = I.cssProps[n] || n, "cssFloat" === n && (n = "float"), a && "get" in a && (o = a.get(t, !0, i)) !== e ? o : Ne ? Ne(t, n) : void 0
        },
        swap: function(t, e, n) {
            var i, o, a = {};
            for (o in e) a[o] = t.style[o], t.style[o] = e[o];
            i = n.call(t);
            for (o in e) t.style[o] = a[o];
            return i
        }
    }), I.curCSS = I.css, j.defaultView && j.defaultView.getComputedStyle && (De = function(t, e) {
        var n, i, o, a, r = t.style;
        return e = e.replace(We, "-$1").toLowerCase(), (i = t.ownerDocument.defaultView) && (o = i.getComputedStyle(t, null)) && (n = o.getPropertyValue(e), "" !== n || I.contains(t.ownerDocument.documentElement, t) || (n = I.style(t, e))), !I.support.pixelMargin && o && Me.test(e) && Le.test(n) && (a = r.width, r.width = n, n = o.width, r.width = a), n
    }), j.documentElement.currentStyle && (Ee = function(t, e) {
        var n, i, o, a = t.currentStyle && t.currentStyle[e],
            r = t.style;
        return null == a && r && (o = r[e]) && (a = o), Le.test(a) && (n = r.left, i = t.runtimeStyle && t.runtimeStyle.left, i && (t.runtimeStyle.left = t.currentStyle.left), r.left = "fontSize" === e ? "1em" : a, a = r.pixelLeft + "px", r.left = n, i && (t.runtimeStyle.left = i)), "" === a ? "auto" : a
    }), Ne = De || Ee, I.each(["height", "width"], function(t, e) {
        I.cssHooks[e] = {
            get: function(t, n, i) {
                return n ? 0 !== t.offsetWidth ? y(t, e, i) : I.swap(t, Oe, function() {
                    return y(t, e, i)
                }) : void 0
            },
            set: function(t, e) {
                return Ie.test(e) ? e + "px" : e
            }
        }
    }), I.support.opacity || (I.cssHooks.opacity = {
        get: function(t, e) {
            return Ae.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var n = t.style,
                i = t.currentStyle,
                o = I.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                a = i && i.filter || n.filter || "";
            n.zoom = 1, e >= 1 && "" === I.trim(a.replace(je, "")) && (n.removeAttribute("filter"), i && !i.filter) || (n.filter = je.test(a) ? a.replace(je, o) : a + " " + o)
        }
    }), I(function() {
        I.support.reliableMarginRight || (I.cssHooks.marginRight = {
            get: function(t, e) {
                return I.swap(t, {
                    display: "inline-block"
                }, function() {
                    return e ? Ne(t, "margin-right") : t.style.marginRight
                })
            }
        })
    }), I.expr && I.expr.filters && (I.expr.filters.hidden = function(t) {
        var e = t.offsetWidth,
            n = t.offsetHeight;
        return 0 === e && 0 === n || !I.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || I.css(t, "display"))
    }, I.expr.filters.visible = function(t) {
        return !I.expr.filters.hidden(t)
    }), I.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        I.cssHooks[t + e] = {
            expand: function(n) {
                var i, o = "string" == typeof n ? n.split(" ") : [n],
                    a = {};
                for (i = 0; 4 > i; i++) a[t + qe[i] + e] = o[i] || o[i - 2] || o[0];
                return a
            }
        }
    });
    var Be, He, Re = /%20/g,
        ze = /\[\]$/,
        Ue = /\r?\n/g,
        Xe = /#.*$/,
        Ke = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Qe = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Je = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Ye = /^(?:GET|HEAD)$/,
        Ve = /^\/\//,
        Ge = /\?/,
        Ze = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        tn = /^(?:select|textarea)/i,
        en = /\s+/,
        nn = /([?&])_=[^&]*/,
        on = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        an = I.fn.load,
        rn = {},
        sn = {},
        ln = ["*/"] + ["*"];
    try {
        Be = W.href
    } catch (cn) {
        Be = j.createElement("a"), Be.href = "", Be = Be.href
    }
    He = on.exec(Be.toLowerCase()) || [], I.fn.extend({
        load: function(t, n, i) {
            if ("string" != typeof t && an) return an.apply(this, arguments);
            if (!this.length) return this;
            var o = t.indexOf(" ");
            if (o >= 0) {
                var a = t.slice(o, t.length);
                t = t.slice(0, o)
            }
            var r = "GET";
            n && (I.isFunction(n) ? (i = n, n = e) : "object" == typeof n && (n = I.param(n, I.ajaxSettings.traditional), r = "POST"));
            var s = this;
            return I.ajax({
                url: t,
                type: r,
                dataType: "html",
                data: n,
                complete: function(t, e, n) {
                    n = t.responseText, t.isResolved() && (t.done(function(t) {
                        n = t
                    }), s.html(a ? I("<div>").append(n.replace(Ze, "")).find(a) : n)), i && s.each(i, [n, e, t])
                }
            }), this
        },
        serialize: function() {
            return I.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? I.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || tn.test(this.nodeName) || Qe.test(this.type))
            }).map(function(t, e) {
                var n = I(this).val();
                return null == n ? null : I.isArray(n) ? I.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Ue, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(Ue, "\r\n")
                }
            }).get()
        }
    }), I.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(t, e) {
        I.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), I.each(["get", "post"], function(t, n) {
        I[n] = function(t, i, o, a) {
            return I.isFunction(i) && (a = a || o, o = i, i = e), I.ajax({
                type: n,
                url: t,
                data: i,
                success: o,
                dataType: a
            })
        }
    }), I.extend({
        getScript: function(t, n) {
            return I.get(t, e, n, "script")
        },
        getJSON: function(t, e, n) {
            return I.get(t, e, n, "json")
        },
        ajaxSetup: function(t, e) {
            return e ? w(t, I.ajaxSettings) : (e = t, t = I.ajaxSettings), w(t, e), t
        },
        ajaxSettings: {
            url: Be,
            isLocal: Je.test(He[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": ln
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": t.String,
                "text html": !0,
                "text json": I.parseJSON,
                "text xml": I.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: b(rn),
        ajaxTransport: b(sn),
        ajax: function(t, n) {
            function i(t, n, i, r) {
                if (2 !== w) {
                    w = 2, l && clearTimeout(l), s = e, a = r || "", _.readyState = t > 0 ? 4 : 0;
                    var c, d, y, b, x, C = n,
                        F = i ? $(p, _, i) : e;
                    if (t >= 200 && 300 > t || 304 === t)
                        if (p.ifModified && ((b = _.getResponseHeader("Last-Modified")) && (I.lastModified[o] = b), (x = _.getResponseHeader("Etag")) && (I.etag[o] = x)), 304 === t) C = "notmodified", c = !0;
                        else try {
                            d = k(p, F), C = "success", c = !0
                        } catch (T) {
                            C = "parsererror", y = T
                        } else y = C, (!C || t) && (C = "error", 0 > t && (t = 0));
                    _.status = t, _.statusText = "" + (n || C), c ? m.resolveWith(f, [d, C, _]) : m.rejectWith(f, [_, C, y]), _.statusCode(v), v = e, u && h.trigger("ajax" + (c ? "Success" : "Error"), [_, p, c ? d : y]), g.fireWith(f, [_, C]), u && (h.trigger("ajaxComplete", [_, p]), --I.active || I.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof t && (n = t, t = e), n = n || {};
            var o, a, r, s, l, c, u, d, p = I.ajaxSetup({}, n),
                f = p.context || p,
                h = f !== p && (f.nodeType || f instanceof I) ? I(f) : I.event,
                m = I.Deferred(),
                g = I.Callbacks("once memory"),
                v = p.statusCode || {},
                y = {},
                b = {},
                w = 0,
                _ = {
                    readyState: 0,
                    setRequestHeader: function(t, e) {
                        if (!w) {
                            var n = t.toLowerCase();
                            t = b[n] = b[n] || t, y[t] = e
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    getResponseHeader: function(t) {
                        var n;
                        if (2 === w) {
                            if (!r)
                                for (r = {}; n = Ke.exec(a);) r[n[1].toLowerCase()] = n[2];
                            n = r[t.toLowerCase()]
                        }
                        return n === e ? null : n
                    },
                    overrideMimeType: function(t) {
                        return w || (p.mimeType = t), this
                    },
                    abort: function(t) {
                        return t = t || "abort", s && s.abort(t), i(0, t), this
                    }
                };
            if (m.promise(_), _.success = _.done, _.error = _.fail, _.complete = g.add, _.statusCode = function(t) {
                    if (t) {
                        var e;
                        if (2 > w)
                            for (e in t) v[e] = [v[e], t[e]];
                        else e = t[_.status], _.then(e, e)
                    }
                    return this
                }, p.url = ((t || p.url) + "").replace(Xe, "").replace(Ve, He[1] + "//"), p.dataTypes = I.trim(p.dataType || "*").toLowerCase().split(en), null == p.crossDomain && (c = on.exec(p.url.toLowerCase()), p.crossDomain = !(!c || c[1] == He[1] && c[2] == He[2] && (c[3] || ("http:" === c[1] ? 80 : 443)) == (He[3] || ("http:" === He[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = I.param(p.data, p.traditional)), x(rn, p, n, _), 2 === w) return !1;
            if (u = p.global, p.type = p.type.toUpperCase(), p.hasContent = !Ye.test(p.type), u && 0 === I.active++ && I.event.trigger("ajaxStart"), !p.hasContent && (p.data && (p.url += (Ge.test(p.url) ? "&" : "?") + p.data, delete p.data), o = p.url, p.cache === !1)) {
                var C = I.now(),
                    F = p.url.replace(nn, "$1_=" + C);
                p.url = F + (F === p.url ? (Ge.test(p.url) ? "&" : "?") + "_=" + C : "")
            }(p.data && p.hasContent && p.contentType !== !1 || n.contentType) && _.setRequestHeader("Content-Type", p.contentType), p.ifModified && (o = o || p.url, I.lastModified[o] && _.setRequestHeader("If-Modified-Since", I.lastModified[o]), I.etag[o] && _.setRequestHeader("If-None-Match", I.etag[o])), _.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + ln + "; q=0.01" : "") : p.accepts["*"]);
            for (d in p.headers) _.setRequestHeader(d, p.headers[d]);
            if (p.beforeSend && (p.beforeSend.call(f, _, p) === !1 || 2 === w)) return _.abort(), !1;
            for (d in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) _[d](p[d]);
            if (s = x(sn, p, n, _)) {
                _.readyState = 1, u && h.trigger("ajaxSend", [_, p]), p.async && p.timeout > 0 && (l = setTimeout(function() {
                    _.abort("timeout")
                }, p.timeout));
                try {
                    w = 1, s.send(y, i)
                } catch (T) {
                    if (!(2 > w)) throw T;
                    i(-1, T)
                }
            } else i(-1, "No Transport");
            return _
        },
        param: function(t, n) {
            var i = [],
                o = function(t, e) {
                    e = I.isFunction(e) ? e() : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (n === e && (n = I.ajaxSettings.traditional), I.isArray(t) || t.jquery && !I.isPlainObject(t)) I.each(t, function() {
                o(this.name, this.value)
            });
            else
                for (var a in t) _(a, t[a], n, o);
            return i.join("&").replace(Re, "+")
        }
    }), I.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var un = I.now(),
        dn = /(\=)\?(&|$)|\?\?/i;
    I.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return I.expando + "_" + un++
        }
    }), I.ajaxPrefilter("json jsonp", function(e, n, i) {
        var o = "string" == typeof e.data && /^application\/x\-www\-form\-urlencoded/.test(e.contentType);
        if ("jsonp" === e.dataTypes[0] || e.jsonp !== !1 && (dn.test(e.url) || o && dn.test(e.data))) {
            var a, r = e.jsonpCallback = I.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                s = t[r],
                l = e.url,
                c = e.data,
                u = "$1" + r + "$2";
            return e.jsonp !== !1 && (l = l.replace(dn, u), e.url === l && (o && (c = c.replace(dn, u)), e.data === c && (l += (/\?/.test(l) ? "&" : "?") + e.jsonp + "=" + r))), e.url = l, e.data = c, t[r] = function(t) {
                a = [t]
            }, i.always(function() {
                t[r] = s, a && I.isFunction(s) && t[r](a[0])
            }), e.converters["script json"] = function() {
                return a || I.error(r + " was not called"), a[0]
            }, e.dataTypes[0] = "json", "script"
        }
    }), I.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(t) {
                return I.globalEval(t), t
            }
        }
    }), I.ajaxPrefilter("script", function(t) {
        t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), I.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var n, i = j.head || j.getElementsByTagName("head")[0] || j.documentElement;
            return {
                send: function(o, a) {
                    n = j.createElement("script"), n.async = "async", t.scriptCharset && (n.charset = t.scriptCharset), n.src = t.url, n.onload = n.onreadystatechange = function(t, o) {
                        (o || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, i && n.parentNode && i.removeChild(n), n = e, o || a(200, "success"))
                    }, i.insertBefore(n, i.firstChild)
                },
                abort: function() {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var pn, fn = t.ActiveXObject ? function() {
            for (var t in pn) pn[t](0, 1)
        } : !1,
        hn = 0;
    I.ajaxSettings.xhr = t.ActiveXObject ? function() {
            return !this.isLocal && C() || F()
        } : C,
        function(t) {
            I.extend(I.support, {
                ajax: !!t,
                cors: !!t && "withCredentials" in t
            })
        }(I.ajaxSettings.xhr()), I.support.ajax && I.ajaxTransport(function(n) {
            if (!n.crossDomain || I.support.cors) {
                var i;
                return {
                    send: function(o, a) {
                        var r, s, l = n.xhr();
                        if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
                            for (s in n.xhrFields) l[s] = n.xhrFields[s];
                        n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (s in o) l.setRequestHeader(s, o[s])
                        } catch (c) {}
                        l.send(n.hasContent && n.data || null), i = function(t, o) {
                            var s, c, u, d, p;
                            try {
                                if (i && (o || 4 === l.readyState))
                                    if (i = e, r && (l.onreadystatechange = I.noop, fn && delete pn[r]), o) 4 !== l.readyState && l.abort();
                                    else {
                                        s = l.status, u = l.getAllResponseHeaders(), d = {}, p = l.responseXML, p && p.documentElement && (d.xml = p);
                                        try {
                                            d.text = l.responseText
                                        } catch (t) {}
                                        try {
                                            c = l.statusText
                                        } catch (f) {
                                            c = ""
                                        }
                                        s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                                    }
                            } catch (h) {
                                o || a(-1, h)
                            }
                            d && a(s, c, d, u)
                        }, n.async && 4 !== l.readyState ? (r = ++hn, fn && (pn || (pn = {}, I(t).unload(fn)), pn[r] = i), l.onreadystatechange = i) : i()
                    },
                    abort: function() {
                        i && i(0, 1)
                    }
                }
            }
        });
    var mn, gn, vn, yn, bn = {},
        xn = /^(?:toggle|show|hide)$/,
        wn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        _n = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    I.fn.extend({
        show: function(t, e, n) {
            var i, o;
            if (t || 0 === t) return this.animate(N("show", 3), t, e, n);
            for (var a = 0, r = this.length; r > a; a++) i = this[a], i.style && (o = i.style.display, I._data(i, "olddisplay") || "none" !== o || (o = i.style.display = ""), ("" === o && "none" === I.css(i, "display") || !I.contains(i.ownerDocument.documentElement, i)) && I._data(i, "olddisplay", D(i.nodeName)));
            for (a = 0; r > a; a++) i = this[a], i.style && (o = i.style.display, ("" === o || "none" === o) && (i.style.display = I._data(i, "olddisplay") || ""));
            return this
        },
        hide: function(t, e, n) {
            if (t || 0 === t) return this.animate(N("hide", 3), t, e, n);
            for (var i, o, a = 0, r = this.length; r > a; a++) i = this[a], i.style && (o = I.css(i, "display"), "none" === o || I._data(i, "olddisplay") || I._data(i, "olddisplay", o));
            for (a = 0; r > a; a++) this[a].style && (this[a].style.display = "none");
            return this
        },
        _toggle: I.fn.toggle,
        toggle: function(t, e, n) {
            var i = "boolean" == typeof t;
            return I.isFunction(t) && I.isFunction(e) ? this._toggle.apply(this, arguments) : null == t || i ? this.each(function() {
                var e = i ? t : I(this).is(":hidden");
                I(this)[e ? "show" : "hide"]()
            }) : this.animate(N("toggle", 3), t, e, n), this
        },
        fadeTo: function(t, e, n, i) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: e
            }, t, n, i)
        },
        animate: function(t, e, n, i) {
            function o() {
                a.queue === !1 && I._mark(this);
                var e, n, i, o, r, s, l, c, u, d, p, f = I.extend({}, a),
                    h = 1 === this.nodeType,
                    m = h && I(this).is(":hidden");
                f.animatedProperties = {};
                for (i in t)
                    if (e = I.camelCase(i), i !== e && (t[e] = t[i], delete t[i]), (r = I.cssHooks[e]) && "expand" in r) {
                        s = r.expand(t[e]), delete t[e];
                        for (i in s) i in t || (t[i] = s[i])
                    }
                for (e in t) {
                    if (n = t[e], I.isArray(n) ? (f.animatedProperties[e] = n[1], n = t[e] = n[0]) : f.animatedProperties[e] = f.specialEasing && f.specialEasing[e] || f.easing || "swing", "hide" === n && m || "show" === n && !m) return f.complete.call(this);
                    !h || "height" !== e && "width" !== e || (f.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], "inline" === I.css(this, "display") && "none" === I.css(this, "float") && (I.support.inlineBlockNeedsLayout && "inline" !== D(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"))
                }
                null != f.overflow && (this.style.overflow = "hidden");
                for (i in t) o = new I.fx(this, f, i), n = t[i], xn.test(n) ? (p = I._data(this, "toggle" + i) || ("toggle" === n ? m ? "show" : "hide" : 0), p ? (I._data(this, "toggle" + i, "show" === p ? "hide" : "show"), o[p]()) : o[n]()) : (l = wn.exec(n), c = o.cur(), l ? (u = parseFloat(l[2]), d = l[3] || (I.cssNumber[i] ? "" : "px"), "px" !== d && (I.style(this, i, (u || 1) + d), c = (u || 1) / o.cur() * c, I.style(this, i, c + d)), l[1] && (u = ("-=" === l[1] ? -1 : 1) * u + c), o.custom(c, u, d)) : o.custom(c, n, ""));
                return !0
            }
            var a = I.speed(e, n, i);
            return I.isEmptyObject(t) ? this.each(a.complete, [!1]) : (t = I.extend({}, t), a.queue === !1 ? this.each(o) : this.queue(a.queue, o))
        },
        stop: function(t, n, i) {
            return "string" != typeof t && (i = n, n = t, t = e), n && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                function e(t, e, n) {
                    var o = e[n];
                    I.removeData(t, n, !0), o.stop(i)
                }
                var n, o = !1,
                    a = I.timers,
                    r = I._data(this);
                if (i || I._unmark(!0, this), null == t)
                    for (n in r) r[n] && r[n].stop && n.indexOf(".run") === n.length - 4 && e(this, r, n);
                else r[n = t + ".run"] && r[n].stop && e(this, r, n);
                for (n = a.length; n--;) a[n].elem !== this || null != t && a[n].queue !== t || (i ? a[n](!0) : a[n].saveState(), o = !0, a.splice(n, 1));
                i && o || I.dequeue(this, t)
            })
        }
    }), I.each({
        slideDown: N("show", 1),
        slideUp: N("hide", 1),
        slideToggle: N("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        I.fn[t] = function(t, n, i) {
            return this.animate(e, t, n, i)
        }
    }), I.extend({
        speed: function(t, e, n) {
            var i = t && "object" == typeof t ? I.extend({}, t) : {
                complete: n || !n && e || I.isFunction(t) && t,
                duration: t,
                easing: n && e || e && !I.isFunction(e) && e
            };
            return i.duration = I.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in I.fx.speeds ? I.fx.speeds[i.duration] : I.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function(t) {
                I.isFunction(i.old) && i.old.call(this), i.queue ? I.dequeue(this, i.queue) : t !== !1 && I._unmark(this)
            }, i
        },
        easing: {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return -Math.cos(t * Math.PI) / 2 + .5
            }
        },
        timers: [],
        fx: function(t, e, n) {
            this.options = e, this.elem = t, this.prop = n, e.orig = e.orig || {}
        }
    }), I.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (I.fx.step[this.prop] || I.fx.step._default)(this)
        },
        cur: function() {
            if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) return this.elem[this.prop];
            var t, e = I.css(this.elem, this.prop);
            return isNaN(t = parseFloat(e)) ? e && "auto" !== e ? e : 0 : t
        },
        custom: function(t, n, i) {
            function o(t) {
                return a.step(t)
            }
            var a = this,
                r = I.fx;
            this.startTime = yn || T(), this.end = n, this.now = this.start = t, this.pos = this.state = 0, this.unit = i || this.unit || (I.cssNumber[this.prop] ? "" : "px"), o.queue = this.options.queue, o.elem = this.elem, o.saveState = function() {
                I._data(a.elem, "fxshow" + a.prop) === e && (a.options.hide ? I._data(a.elem, "fxshow" + a.prop, a.start) : a.options.show && I._data(a.elem, "fxshow" + a.prop, a.end))
            }, o() && I.timers.push(o) && !vn && (vn = setInterval(r.tick, r.interval))
        },
        show: function() {
            var t = I._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = t || I.style(this.elem, this.prop), this.options.show = !0, t !== e ? this.custom(this.cur(), t) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()), I(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = I._data(this.elem, "fxshow" + this.prop) || I.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function(t) {
            var e, n, i, o = yn || T(),
                a = !0,
                r = this.elem,
                s = this.options;
            if (t || o >= s.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), s.animatedProperties[this.prop] = !0;
                for (e in s.animatedProperties) s.animatedProperties[e] !== !0 && (a = !1);
                if (a) {
                    if (null == s.overflow || I.support.shrinkWrapBlocks || I.each(["", "X", "Y"], function(t, e) {
                            r.style["overflow" + e] = s.overflow[t]
                        }), s.hide && I(r).hide(), s.hide || s.show)
                        for (e in s.animatedProperties) I.style(r, e, s.orig[e]), I.removeData(r, "fxshow" + e, !0), I.removeData(r, "toggle" + e, !0);
                    i = s.complete, i && (s.complete = !1, i.call(r))
                }
                return !1
            }
            return 1 / 0 == s.duration ? this.now = o : (n = o - this.startTime, this.state = n / s.duration, this.pos = I.easing[s.animatedProperties[this.prop]](this.state, n, 0, 1, s.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, I.extend(I.fx, {
        tick: function() {
            for (var t, e = I.timers, n = 0; n < e.length; n++) t = e[n], t() || e[n] !== t || e.splice(n--, 1);
            e.length || I.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(vn), vn = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(t) {
                I.style(t.elem, "opacity", t.now)
            },
            _default: function(t) {
                t.elem.style && null != t.elem.style[t.prop] ? t.elem.style[t.prop] = t.now + t.unit : t.elem[t.prop] = t.now
            }
        }
    }), I.each(_n.concat.apply([], _n), function(t, e) {
        e.indexOf("margin") && (I.fx.step[e] = function(t) {
            I.style(t.elem, e, Math.max(0, t.now) + t.unit)
        })
    }), I.expr && I.expr.filters && (I.expr.filters.animated = function(t) {
        return I.grep(I.timers, function(e) {
            return t === e.elem
        }).length
    });
    var $n, kn = /^t(?:able|d|h)$/i,
        Cn = /^(?:body|html)$/i;
    $n = "getBoundingClientRect" in j.documentElement ? function(t, e, n, i) {
        try {
            i = t.getBoundingClientRect()
        } catch (o) {}
        if (!i || !I.contains(n, t)) return i ? {
            top: i.top,
            left: i.left
        } : {
            top: 0,
            left: 0
        };
        var a = e.body,
            r = E(e),
            s = n.clientTop || a.clientTop || 0,
            l = n.clientLeft || a.clientLeft || 0,
            c = r.pageYOffset || I.support.boxModel && n.scrollTop || a.scrollTop,
            u = r.pageXOffset || I.support.boxModel && n.scrollLeft || a.scrollLeft,
            d = i.top + c - s,
            p = i.left + u - l;
        return {
            top: d,
            left: p
        }
    } : function(t, e, n) {
        for (var i, o = t.offsetParent, a = t, r = e.body, s = e.defaultView, l = s ? s.getComputedStyle(t, null) : t.currentStyle, c = t.offsetTop, u = t.offsetLeft;
            (t = t.parentNode) && t !== r && t !== n && (!I.support.fixedPosition || "fixed" !== l.position);) i = s ? s.getComputedStyle(t, null) : t.currentStyle, c -= t.scrollTop, u -= t.scrollLeft, t === o && (c += t.offsetTop, u += t.offsetLeft, !I.support.doesNotAddBorder || I.support.doesAddBorderForTableAndCells && kn.test(t.nodeName) || (c += parseFloat(i.borderTopWidth) || 0, u += parseFloat(i.borderLeftWidth) || 0), a = o, o = t.offsetParent), I.support.subtractsBorderForOverflowNotVisible && "visible" !== i.overflow && (c += parseFloat(i.borderTopWidth) || 0, u += parseFloat(i.borderLeftWidth) || 0), l = i;
        return ("relative" === l.position || "static" === l.position) && (c += r.offsetTop, u += r.offsetLeft), I.support.fixedPosition && "fixed" === l.position && (c += Math.max(n.scrollTop, r.scrollTop), u += Math.max(n.scrollLeft, r.scrollLeft)), {
            top: c,
            left: u
        }
    }, I.fn.offset = function(t) {
        if (arguments.length) return t === e ? this : this.each(function(e) {
            I.offset.setOffset(this, t, e)
        });
        var n = this[0],
            i = n && n.ownerDocument;
        return i ? n === i.body ? I.offset.bodyOffset(n) : $n(n, i, i.documentElement) : null
    }, I.offset = {
        bodyOffset: function(t) {
            var e = t.offsetTop,
                n = t.offsetLeft;
            return I.support.doesNotIncludeMarginInBodyOffset && (e += parseFloat(I.css(t, "marginTop")) || 0, n += parseFloat(I.css(t, "marginLeft")) || 0), {
                top: e,
                left: n
            }
        },
        setOffset: function(t, e, n) {
            var i = I.css(t, "position");
            "static" === i && (t.style.position = "relative");
            var o, a, r = I(t),
                s = r.offset(),
                l = I.css(t, "top"),
                c = I.css(t, "left"),
                u = ("absolute" === i || "fixed" === i) && I.inArray("auto", [l, c]) > -1,
                d = {},
                p = {};
            u ? (p = r.position(), o = p.top, a = p.left) : (o = parseFloat(l) || 0, a = parseFloat(c) || 0), I.isFunction(e) && (e = e.call(t, n, s)), null != e.top && (d.top = e.top - s.top + o), null != e.left && (d.left = e.left - s.left + a), "using" in e ? e.using.call(t, d) : r.css(d)
        }
    }, I.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var t = this[0],
                e = this.offsetParent(),
                n = this.offset(),
                i = Cn.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : e.offset();
            return n.top -= parseFloat(I.css(t, "marginTop")) || 0, n.left -= parseFloat(I.css(t, "marginLeft")) || 0, i.top += parseFloat(I.css(e[0], "borderTopWidth")) || 0, i.left += parseFloat(I.css(e[0], "borderLeftWidth")) || 0, {
                top: n.top - i.top,
                left: n.left - i.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || j.body; t && !Cn.test(t.nodeName) && "static" === I.css(t, "position");) t = t.offsetParent;
                return t
            })
        }
    }), I.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var i = /Y/.test(n);
        I.fn[t] = function(o) {
            return I.access(this, function(t, o, a) {
                var r = E(t);
                return a === e ? r ? n in r ? r[n] : I.support.boxModel && r.document.documentElement[o] || r.document.body[o] : t[o] : (r ? r.scrollTo(i ? I(r).scrollLeft() : a, i ? a : I(r).scrollTop()) : t[o] = a, void 0)
            }, t, o, arguments.length, null)
        }
    }), I.each({
        Height: "height",
        Width: "width"
    }, function(t, n) {
        var i = "client" + t,
            o = "scroll" + t,
            a = "offset" + t;
        I.fn["inner" + t] = function() {
            var t = this[0];
            return t ? t.style ? parseFloat(I.css(t, n, "padding")) : this[n]() : null
        }, I.fn["outer" + t] = function(t) {
            var e = this[0];
            return e ? e.style ? parseFloat(I.css(e, n, t ? "margin" : "border")) : this[n]() : null
        }, I.fn[n] = function(t) {
            return I.access(this, function(t, n, r) {
                var s, l, c, u;
                return I.isWindow(t) ? (s = t.document, l = s.documentElement[i], I.support.boxModel && l || s.body && s.body[i] || l) : 9 === t.nodeType ? (s = t.documentElement, s[i] >= s[o] ? s[i] : Math.max(t.body[o], s[o], t.body[a], s[a])) : r === e ? (c = I.css(t, n), u = parseFloat(c), I.isNumeric(u) ? u : c) : (I(t).css(n, r), void 0)
            }, n, t, arguments.length, null)
        }
    }), t.jQuery = t.$ = I, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return I
    })
}(window),
function(t, e) {
    var n = function() {
        var e = t(document).data("events");
        return e && e.click && t.grep(e.click, function(t) {
            return "rails" === t.namespace
        }).length
    };
    n() && t.error("jquery-ujs has already been loaded!");
    var i;
    t.rails = i = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input:file",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function(e) {
            var n = t('meta[name="csrf-token"]').attr("content");
            n && e.setRequestHeader("X-CSRF-Token", n)
        },
        fire: function(e, n, i) {
            var o = t.Event(n);
            return e.trigger(o, i), o.result !== !1
        },
        confirm: function(t) {
            return confirm(t)
        },
        ajax: function(e) {
            return t.ajax(e)
        },
        href: function(t) {
            return t.attr("href")
        },
        handleRemote: function(n) {
            var o, a, r, s, l, c, u, d;
            if (i.fire(n, "ajax:before")) {
                if (s = n.data("cross-domain"), l = s === e ? null : s, c = n.data("with-credentials") || null, u = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                    o = n.attr("method"), a = n.attr("action"), r = n.serializeArray();
                    var p = n.data("ujs:submit-button");
                    p && (r.push(p), n.data("ujs:submit-button", null))
                } else n.is(i.inputChangeSelector) ? (o = n.data("method"), a = n.data("url"), r = n.serialize(), n.data("params") && (r = r + "&" + n.data("params"))) : (o = n.data("method"), a = i.href(n), r = n.data("params") || null);
                d = {
                    type: o || "GET",
                    data: r,
                    dataType: u,
                    beforeSend: function(t, o) {
                        return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), i.fire(n, "ajax:beforeSend", [t, o])
                    },
                    success: function(t, e, i) {
                        n.trigger("ajax:success", [t, e, i])
                    },
                    complete: function(t, e) {
                        n.trigger("ajax:complete", [t, e])
                    },
                    error: function(t, e, i) {
                        n.trigger("ajax:error", [t, e, i])
                    },
                    xhrFields: {
                        withCredentials: c
                    },
                    crossDomain: l
                }, a && (d.url = a);
                var f = i.ajax(d);
                return n.trigger("ajax:send", f), f
            }
            return !1
        },
        handleMethod: function(n) {
            var o = i.href(n),
                a = n.data("method"),
                r = n.attr("target"),
                s = t("meta[name=csrf-token]").attr("content"),
                l = t("meta[name=csrf-param]").attr("content"),
                c = t('<form method="post" action="' + o + '"></form>'),
                u = '<input name="_method" value="' + a + '" type="hidden" />';
            l !== e && s !== e && (u += '<input name="' + l + '" value="' + s + '" type="hidden" />'), r && c.attr("target", r), c.hide().append(u).appendTo("body"), c.submit()
        },
        disableFormElements: function(e) {
            e.find(i.disableSelector).each(function() {
                var e = t(this),
                    n = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with", e[n]()), e[n](e.data("disable-with")), e.prop("disabled", !0)
            })
        },
        enableFormElements: function(e) {
            e.find(i.enableSelector).each(function() {
                var e = t(this),
                    n = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with") && e[n](e.data("ujs:enable-with")), e.prop("disabled", !1)
            })
        },
        allowAction: function(t) {
            var e, n = t.data("confirm"),
                o = !1;
            return n ? (i.fire(t, "confirm") && (o = i.confirm(n), e = i.fire(t, "confirm:complete", [o])), o && e) : !0
        },
        blankInputs: function(e, n, i) {
            var o, a, r = t(),
                s = n || "input,textarea";
            return e.find(s).each(function() {
                o = t(this), a = o.is(":checkbox,:radio") ? o.is(":checked") : o.val(), a == !!i && (r = r.add(o))
            }), r.length ? r : !1
        },
        nonBlankInputs: function(t, e) {
            return i.blankInputs(t, e, !0)
        },
        stopEverything: function(e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        callFormSubmitBindings: function(n, i) {
            var o = n.data("events"),
                a = !0;
            return o !== e && o.submit !== e && t.each(o.submit, function(t, e) {
                return "function" == typeof e.handler ? a = e.handler(i) : void 0
            }), a
        },
        disableElement: function(t) {
            t.data("ujs:enable-with", t.html()), t.html(t.data("disable-with")), t.bind("click.railsDisable", function(t) {
                return i.stopEverything(t)
            })
        },
        enableElement: function(t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.data("ujs:enable-with", !1)), t.unbind("click.railsDisable")
        }
    }, i.fire(t(document), "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, n) {
        t.crossDomain || i.CSRFProtection(n)
    }), t(document).delegate(i.linkDisableSelector, "ajax:complete", function() {
        i.enableElement(t(this))
    }), t(document).delegate(i.linkClickSelector, "click.rails", function(n) {
        var o = t(this),
            a = o.data("method"),
            r = o.data("params");
        return i.allowAction(o) ? (o.is(i.linkDisableSelector) && i.disableElement(o), o.data("remote") !== e ? !n.metaKey && !n.ctrlKey || a && "GET" !== a || r ? (i.handleRemote(o) === !1 && i.enableElement(o), !1) : !0 : o.data("method") ? (i.handleMethod(o), !1) : void 0) : i.stopEverything(n)
    }), t(document).delegate(i.inputChangeSelector, "change.rails", function(e) {
        var n = t(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
    }), t(document).delegate(i.formSubmitSelector, "submit.rails", function(n) {
        var o = t(this),
            a = o.data("remote") !== e,
            r = i.blankInputs(o, i.requiredInputSelector),
            s = i.nonBlankInputs(o, i.fileInputSelector);
        return i.allowAction(o) ? r && o.attr("novalidate") == e && i.fire(o, "ajax:aborted:required", [r]) ? i.stopEverything(n) : a ? s ? (setTimeout(function() {
            i.disableFormElements(o)
        }, 13), i.fire(o, "ajax:aborted:file", [s])) : !t.support.submitBubbles && t().jquery < "1.7" && i.callFormSubmitBindings(o, n) === !1 ? i.stopEverything(n) : (i.handleRemote(o), !1) : (setTimeout(function() {
            i.disableFormElements(o)
        }, 13), void 0) : i.stopEverything(n)
    }), t(document).delegate(i.formInputClickSelector, "click.rails", function(e) {
        var n = t(this);
        if (!i.allowAction(n)) return i.stopEverything(e);
        var o = n.attr("name"),
            a = o ? {
                name: o,
                value: n.val()
            } : null;
        n.closest("form").data("ujs:submit-button", a)
    }), t(document).delegate(i.formSubmitSelector, "ajax:beforeSend.rails", function(e) {
        this == e.target && i.disableFormElements(t(this))
    }), t(document).delegate(i.formSubmitSelector, "ajax:complete.rails", function(e) {
        this == e.target && i.enableFormElements(t(this))
    }), t(function() {
        csrf_token = t("meta[name=csrf-token]").attr("content"), csrf_param = t("meta[name=csrf-param]").attr("content"), t('form input[name="' + csrf_param + '"]').val(csrf_token)
    }))
}(jQuery),
/* ===================================================
 * bootstrap-transition.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function(t) {
    "use strict";
    t(function() {
        t.support.transition = function() {
            var t = function() {
                var t, e = document.createElement("bootstrap"),
                    n = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (t in n)
                    if (void 0 !== e.style[t]) return n[t]
            }();
            return t && {
                end: t
            }
        }()
    })
}(window.jQuery),
/* ==========================================================
 * bootstrap-alert.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function(t) {
    "use strict";
    var e = '[data-dismiss="alert"]',
        n = function(n) {
            t(n).on("click", e, this.close)
        };
    n.prototype.close = function(e) {
        function n() {
            i.trigger("closed").remove()
        }
        var i, o = t(this),
            a = o.attr("data-target");
        a || (a = o.attr("href"), a = a && a.replace(/.*(?=#[^\s]*$)/, "")), i = t(a), e && e.preventDefault(), i.length || (i = o.hasClass("alert") ? o : o.parent()), i.trigger(e = t.Event("close")), e.isDefaultPrevented() || (i.removeClass("in"), t.support.transition && i.hasClass("fade") ? i.on(t.support.transition.end, n) : n())
    };
    var i = t.fn.alert;
    t.fn.alert = function(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("alert");
            o || i.data("alert", o = new n(this)), "string" == typeof e && o[e].call(i)
        })
    }, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function() {
        return t.fn.alert = i, this
    }, t(document).on("click.alert.data-api", e, n.prototype.close)
}(window.jQuery),
/* =========================================================
 * bootstrap-modal.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
! function(t) {
    "use strict";
    var e = function(e, n) {
        this.options = n, this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    e.prototype = {
        constructor: e,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var e = this,
                n = t.Event("show");
            this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                var n = t.support.transition && e.$element.hasClass("fade");
                e.$element.parent().length || e.$element.appendTo(document.body), e.$element.show(), n && e.$element[0].offsetWidth, e.$element.addClass("in").attr("aria-hidden", !1), e.enforceFocus(), n ? e.$element.one(t.support.transition.end, function() {
                    e.$element.focus().trigger("shown")
                }) : e.$element.focus().trigger("shown")
            }))
        },
        hide: function(e) {
            e && e.preventDefault(), e = t.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), t.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function() {
            var e = this;
            t(document).on("focusin.modal", function(t) {
                e.$element[0] === t.target || e.$element.has(t.target).length || e.$element.focus()
            })
        },
        escape: function() {
            var t = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(e) {
                27 == e.which && t.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var e = this,
                n = setTimeout(function() {
                    e.$element.off(t.support.transition.end), e.hideModal()
                }, 500);
            this.$element.one(t.support.transition.end, function() {
                clearTimeout(n), e.hideModal()
            })
        },
        hideModal: function() {
            this.$element.hide().trigger("hidden"), this.backdrop()
        },
        removeBackdrop: function() {
            this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(e) {
            var n = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = t.support.transition && n;
                this.$backdrop = t('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? t.proxy(this.$element[0].focus, this.$element[0]) : t.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(t.support.transition.end, e) : e()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, t.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : e && e()
        }
    };
    var n = t.fn.modal;
    t.fn.modal = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("modal"),
                a = t.extend({}, t.fn.modal.defaults, i.data(), "object" == typeof n && n);
            o || i.data("modal", o = new e(this, a)), "string" == typeof n ? o[n]() : a.show && o.show()
        })
    }, t.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
        return t.fn.modal = n, this
    }, t(document).on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
        var n = t(this),
            i = n.attr("href"),
            o = t(n.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")),
            a = o.data("modal") ? "toggle" : t.extend({
                remote: !/#/.test(i) && i
            }, o.data(), n.data());
        e.preventDefault(), o.modal(a).one("hide", function() {
            n.focus()
        })
    })
}(window.jQuery),
/* ============================================================
 * bootstrap-dropdown.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
! function(t) {
    "use strict";

    function e() {
        t(i).each(function() {
            n(t(this)).removeClass("open")
        })
    }

    function n(e) {
        var n, i = e.attr("data-target");
        return i || (i = e.attr("href"), i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), n = t(i), n.length || (n = e.parent()), n
    }
    var i = "[data-toggle=dropdown]",
        o = function(e) {
            var n = t(e).on("click.dropdown.data-api", this.toggle);
            t("html").on("click.dropdown.data-api", function() {
                n.parent().removeClass("open")
            })
        };
    o.prototype = {
        constructor: o,
        toggle: function() {
            var i, o, a = t(this);
            if (!a.is(".disabled, :disabled")) return i = n(a), o = i.hasClass("open"), e(), o || i.toggleClass("open"), a.focus(), !1
        },
        keydown: function(e) {
            var i, o, a, r, s;
            if (/(38|40|27)/.test(e.keyCode) && (i = t(this), e.preventDefault(), e.stopPropagation(), !i.is(".disabled, :disabled"))) {
                if (a = n(i), r = a.hasClass("open"), !r || r && 27 == e.keyCode) return i.click();
                o = t("[role=menu] li:not(.divider):visible a", a), o.length && (s = o.index(o.filter(":focus")), 38 == e.keyCode && s > 0 && s--, 40 == e.keyCode && s < o.length - 1 && s++, ~s || (s = 0), o.eq(s).focus())
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = function(e) {
        return this.each(function() {
            var n = t(this),
                i = n.data("dropdown");
            i || n.data("dropdown", i = new o(this)), "string" == typeof e && i[e].call(n)
        })
    }, t.fn.dropdown.Constructor = o, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a, this
    }, t(document).on("click.dropdown.data-api touchstart.dropdown.data-api", e).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("touchstart.dropdown.data-api", ".dropdown-menu", function(t) {
        t.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", i, o.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", i + ", [role=menu]", o.prototype.keydown)
}(window.jQuery),
/* =============================================================
 * bootstrap-scrollspy.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */
! function(t) {
    "use strict";

    function e(e, n) {
        var i, o = t.proxy(this.process, this),
            a = t(e).is("body") ? t(window) : t(e);
        this.options = t.extend({}, t.fn.scrollspy.defaults, n), this.$scrollElement = a.on("scroll.scroll-spy.data-api", o), this.selector = (this.options.target || (i = t(e).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = t("body"), this.refresh(), this.process()
    }
    e.prototype = {
        constructor: e,
        refresh: function() {
            var e, n = this;
            this.offsets = t([]), this.targets = t([]), e = this.$body.find(this.selector).map(function() {
                var e = t(this),
                    i = e.data("target") || e.attr("href"),
                    o = /^#\w/.test(i) && t(i);
                return o && o.length && [
                    [o.position().top + n.$scrollElement.scrollTop(), i]
                ] || null
            }).sort(function(t, e) {
                return t[0] - e[0]
            }).each(function() {
                n.offsets.push(this[0]), n.targets.push(this[1])
            })
        },
        process: function() {
            var t, e = this.$scrollElement.scrollTop() + this.options.offset,
                n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                i = n - this.$scrollElement.height(),
                o = this.offsets,
                a = this.targets,
                r = this.activeTarget;
            if (e >= i) return r != (t = a.last()[0]) && this.activate(t);
            for (t = o.length; t--;) r != a[t] && e >= o[t] && (!o[t + 1] || e <= o[t + 1]) && this.activate(a[t])
        },
        activate: function(e) {
            var n, i;
            this.activeTarget = e, t(this.selector).parent(".active").removeClass("active"), i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', n = t(i).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    };
    var n = t.fn.scrollspy;
    t.fn.scrollspy = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("scrollspy"),
                a = "object" == typeof n && n;
            o || i.data("scrollspy", o = new e(this, a)), "string" == typeof n && o[n]()
        })
    }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.defaults = {
        offset: 10
    }, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = n, this
    }, t(window).on("load", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            e.scrollspy(e.data())
        })
    })
}(window.jQuery),
/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */
! function(t) {
    "use strict";
    var e = function(e) {
        this.element = t(e)
    };
    e.prototype = {
        constructor: e,
        show: function() {
            var e, n, i, o = this.element,
                a = o.closest("ul:not(.dropdown-menu)"),
                r = o.attr("data-target");
            r || (r = o.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), o.parent("li").hasClass("active") || (e = a.find(".active:last a")[0], i = t.Event("show", {
                relatedTarget: e
            }), o.trigger(i), i.isDefaultPrevented() || (n = t(r), this.activate(o.parent("li"), a), this.activate(n, n.parent(), function() {
                o.trigger({
                    type: "shown",
                    relatedTarget: e
                })
            })))
        },
        activate: function(e, n, i) {
            function o() {
                a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), i && i()
            }
            var a = n.find("> .active"),
                r = i && t.support.transition && a.hasClass("fade");
            r ? a.one(t.support.transition.end, o) : o(), a.removeClass("in")
        }
    };
    var n = t.fn.tab;
    t.fn.tab = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("tab");
            o || i.data("tab", o = new e(this)), "string" == typeof n && o[n]()
        })
    }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
        return t.fn.tab = n, this
    }, t(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault(), t(this).tab("show")
    })
}(window.jQuery),
/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {
        constructor: e,
        init: function(e, n, i) {
            var o, a;
            this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.enabled = !0, "click" == this.options.trigger ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != this.options.trigger && (o = "hover" == this.options.trigger ? "mouseenter" : "focus", a = "hover" == this.options.trigger ? "mouseleave" : "blur", this.$element.on(o + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.leave, this))), this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(e) {
            return e = t.extend({}, t.fn[this.type].defaults, e, this.$element.data()), e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }), e
        },
        enter: function(e) {
            var n = t(e.currentTarget)[this.type](this._options).data(this.type);
            return n.options.delay && n.options.delay.show ? (clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function() {
                "in" == n.hoverState && n.show()
            }, n.options.delay.show), void 0) : n.show()
        },
        leave: function(e) {
            var n = t(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), n.options.delay && n.options.delay.hide ? (n.hoverState = "out", this.timeout = setTimeout(function() {
                "out" == n.hoverState && n.hide()
            }, n.options.delay.hide), void 0) : n.hide()
        },
        show: function() {
            var t, e, n, i, o, a, r;
            if (this.hasContent() && this.enabled) {
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), a = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, e = /in/.test(a), t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), n = this.getPosition(e), i = t[0].offsetWidth, o = t[0].offsetHeight, e ? a.split(" ")[1] : a) {
                    case "bottom":
                        r = {
                            top: n.top + n.height,
                            left: n.left + n.width / 2 - i / 2
                        };
                        break;
                    case "top":
                        r = {
                            top: n.top - o,
                            left: n.left + n.width / 2 - i / 2
                        };
                        break;
                    case "left":
                        r = {
                            top: n.top + n.height / 2 - o / 2,
                            left: n.left - i
                        };
                        break;
                    case "right":
                        r = {
                            top: n.top + n.height / 2 - o / 2,
                            left: n.left + n.width
                        }
                }
                t.offset(r).addClass(a).addClass("in")
            }
        },
        setContent: function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function e() {
                var e = setTimeout(function() {
                    n.off(t.support.transition.end).detach()
                }, 500);
                n.one(t.support.transition.end, function() {
                    clearTimeout(e), n.detach()
                })
            }
            var n = this.tip();
            return n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? e() : n.detach(), this
        },
        fixTitle: function() {
            var t = this.$element;
            (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").removeAttr("title")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function(e) {
            return t.extend({}, e ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function() {
            var t, e = this.$element,
                n = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
        },
        tip: function() {
            return this.$tip = this.$tip || t(this.options.template)
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
        },
        toggle: function(e) {
            var n = t(e.currentTarget)[this.type](this._options).data(this.type);
            n[n.tip().hasClass("in") ? "hide" : "show"]()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("tooltip"),
                a = "object" == typeof n && n;
            o || i.data("tooltip", o = new e(this, a)), "string" == typeof n && o[n]()
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = n, this
    }
}(window.jQuery),
/* ===========================================================
 * bootstrap-popover.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
! function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("popover", t, e)
    };
    e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype, {
        constructor: e,
        setContent: function() {
            var t = this.tip(),
                e = this.getTitle(),
                n = this.getContent();
            t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](n), t.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var t, e = this.$element,
                n = this.options;
            return t = e.attr("data-content") || ("function" == typeof n.content ? n.content.call(e[0]) : n.content)
        },
        tip: function() {
            return this.$tip || (this.$tip = t(this.options.template)), this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var n = t.fn.popover;
    t.fn.popover = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("popover"),
                a = "object" == typeof n && n;
            o || i.data("popover", o = new e(this, a)), "string" == typeof n && o[n]()
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.defaults = t.extend({}, t.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
    }), t.fn.popover.noConflict = function() {
        return t.fn.popover = n, this
    }
}(window.jQuery),
/* ============================================================
 * bootstrap-button.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
! function(t) {
    "use strict";
    var e = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, t.fn.button.defaults, n)
    };
    e.prototype.setState = function(t) {
        var e = "disabled",
            n = this.$element,
            i = n.data(),
            o = n.is("input") ? "val" : "html";
        t += "Text", i.resetText || n.data("resetText", n[o]()), n[o](i[t] || this.options[t]), setTimeout(function() {
            "loadingText" == t ? n.addClass(e).attr(e, e) : n.removeClass(e).removeAttr(e)
        }, 0)
    }, e.prototype.toggle = function() {
        var t = this.$element.closest('[data-toggle="buttons-radio"]');
        t && t.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("button"),
                a = "object" == typeof n && n;
            o || i.data("button", o = new e(this, a)), "toggle" == n ? o.toggle() : n && o.setState(n)
        })
    }, t.fn.button.defaults = {
        loadingText: "loading..."
    }, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
        return t.fn.button = n, this
    }, t(document).on("click.button.data-api", "[data-toggle^=button]", function(e) {
        var n = t(e.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery),
/* =============================================================
 * bootstrap-collapse.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
! function(t) {
    "use strict";
    var e = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, t.fn.collapse.defaults, n), this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.prototype = {
        constructor: e,
        dimension: function() {
            var t = this.$element.hasClass("width");
            return t ? "width" : "height"
        },
        show: function() {
            var e, n, i, o;
            if (!this.transitioning) {
                if (e = this.dimension(), n = t.camelCase(["scroll", e].join("-")), i = this.$parent && this.$parent.find("> .accordion-group > .in"), i && i.length) {
                    if (o = i.data("collapse"), o && o.transitioning) return;
                    i.collapse("hide"), o || i.data("collapse", null)
                }
                this.$element[e](0), this.transition("addClass", t.Event("show"), "shown"), t.support.transition && this.$element[e](this.$element[0][n])
            }
        },
        hide: function() {
            var e;
            this.transitioning || (e = this.dimension(), this.reset(this.$element[e]()), this.transition("removeClass", t.Event("hide"), "hidden"), this.$element[e](0))
        },
        reset: function(t) {
            var e = this.dimension();
            return this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth, this.$element[null !== t ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function(e, n, i) {
            var o = this,
                a = function() {
                    "show" == n.type && o.reset(), o.transitioning = 0, o.$element.trigger(i)
                };
            this.$element.trigger(n), n.isDefaultPrevented() || (this.transitioning = 1, this.$element[e]("in"), t.support.transition && this.$element.hasClass("collapse") ? this.$element.one(t.support.transition.end, a) : a())
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var n = t.fn.collapse;
    t.fn.collapse = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("collapse"),
                a = "object" == typeof n && n;
            o || i.data("collapse", o = new e(this, a)), "string" == typeof n && o[n]()
        })
    }, t.fn.collapse.defaults = {
        toggle: !0
    }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n, this
    }, t(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var n, i = t(this),
            o = i.attr("data-target") || e.preventDefault() || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
            a = t(o).data("collapse") ? "toggle" : i.data();
        i[t(o).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), t(o).collapse(a)
    })
}(window.jQuery),
/* ==========================================================
 * bootstrap-carousel.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function(t) {
    "use strict";
    var e = function(e, n) {
        this.$element = t(e), this.options = n, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.prototype = {
        cycle: function(e) {
            return e || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        },
        to: function(e) {
            var n = this.$element.find(".item.active"),
                i = n.parent().children(),
                o = i.index(n),
                a = this;
            if (!(e > i.length - 1 || 0 > e)) return this.sliding ? this.$element.one("slid", function() {
                a.to(e)
            }) : o == e ? this.pause().cycle() : this.slide(e > o ? "next" : "prev", t(i[e]))
        },
        pause: function(e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        },
        next: function() {
            return this.sliding ? void 0 : this.slide("next")
        },
        prev: function() {
            return this.sliding ? void 0 : this.slide("prev")
        },
        slide: function(e, n) {
            var i, o = this.$element.find(".item.active"),
                a = n || o[e](),
                r = this.interval,
                s = "next" == e ? "left" : "right",
                l = "next" == e ? "first" : "last",
                c = this;
            if (this.sliding = !0, r && this.pause(), a = a.length ? a : this.$element.find(".item")[l](), i = t.Event("slide", {
                    relatedTarget: a[0]
                }), !a.hasClass("active")) {
                if (t.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(i), i.isDefaultPrevented()) return;
                    a.addClass(e), a[0].offsetWidth, o.addClass(s), a.addClass(s), this.$element.one(t.support.transition.end, function() {
                        a.removeClass([e, s].join(" ")).addClass("active"), o.removeClass(["active", s].join(" ")), c.sliding = !1, setTimeout(function() {
                            c.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(i), i.isDefaultPrevented()) return;
                    o.removeClass("active"), a.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return r && this.cycle(), this
            }
        }
    };
    var n = t.fn.carousel;
    t.fn.carousel = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("carousel"),
                a = t.extend({}, t.fn.carousel.defaults, "object" == typeof n && n),
                r = "string" == typeof n ? n : a.slide;
            o || i.data("carousel", o = new e(this, a)), "number" == typeof n ? o.to(n) : r ? o[r]() : a.interval && o.cycle()
        })
    }, t.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = n, this
    }, t(document).on("click.carousel.data-api", "[data-slide]", function(e) {
        var n, i = t(this),
            o = t(i.attr("data-target") || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
            a = t.extend({}, o.data(), i.data());
        o.carousel(a), e.preventDefault()
    })
}(window.jQuery),
/* =============================================================
 * bootstrap-typeahead.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
! function(t) {
    "use strict";
    var e = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = t(this.options.menu), this.shown = !1, this.listen()
    };
    e.prototype = {
        constructor: e,
        select: function() {
            var t = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(t)).change(), this.hide()
        },
        updater: function(t) {
            return t
        },
        show: function() {
            var e = t.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: e.top + e.height,
                left: e.left
            }).show(), this.shown = !0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function() {
            var e;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (e = t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source, e ? this.process(e) : this)
        },
        process: function(e) {
            var n = this;
            return e = t.grep(e, function(t) {
                return n.matcher(t)
            }), e = this.sorter(e), e.length ? this.render(e.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(t) {
            return ~t.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(t) {
            for (var e, n = [], i = [], o = []; e = t.shift();) e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? i.push(e) : o.push(e) : n.push(e);
            return n.concat(i, o)
        },
        highlighter: function(t) {
            var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return t.replace(new RegExp("(" + e + ")", "ig"), function(t, e) {
                return "<strong>" + e + "</strong>"
            })
        },
        render: function(e) {
            var n = this;
            return e = t(e).map(function(e, i) {
                return e = t(n.options.item).attr("data-value", i), e.find("a").html(n.highlighter(i)), e[0]
            }), e.first().addClass("active"), this.$menu.html(e), this
        },
        next: function() {
            var e = this.$menu.find(".active").removeClass("active"),
                n = e.next();
            n.length || (n = t(this.$menu.find("li")[0])), n.addClass("active")
        },
        prev: function() {
            var t = this.$menu.find(".active").removeClass("active"),
                e = t.prev();
            e.length || (e = this.$menu.find("li").last()), e.addClass("active")
        },
        listen: function() {
            this.$element.on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this))
        },
        eventSupported: function(t) {
            var e = t in this.$element;
            return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
        },
        move: function(t) {
            if (this.shown) {
                switch (t.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        t.preventDefault();
                        break;
                    case 38:
                        t.preventDefault(), this.prev();
                        break;
                    case 40:
                        t.preventDefault(), this.next()
                }
                t.stopPropagation()
            }
        },
        keydown: function(e) {
            this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
        },
        keypress: function(t) {
            this.suppressKeyPressRepeat || this.move(t)
        },
        keyup: function(t) {
            switch (t.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            t.stopPropagation(), t.preventDefault()
        },
        blur: function() {
            var t = this;
            setTimeout(function() {
                t.hide()
            }, 150)
        },
        click: function(t) {
            t.stopPropagation(), t.preventDefault(), this.select()
        },
        mouseenter: function(e) {
            this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active")
        }
    };
    var n = t.fn.typeahead;
    t.fn.typeahead = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("typeahead"),
                a = "object" == typeof n && n;
            o || i.data("typeahead", o = new e(this, a)), "string" == typeof n && o[n]()
        })
    }, t.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function() {
        return t.fn.typeahead = n, this
    }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
        var n = t(this);
        n.data("typeahead") || (e.preventDefault(), n.typeahead(n.data()))
    })
}(window.jQuery),
/* ==========================================================
 * bootstrap-affix.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function(t) {
    "use strict";
    var e = function(e, n) {
        this.options = t.extend({}, t.fn.affix.defaults, n), this.$window = t(window).on("scroll.affix.data-api", t.proxy(this.checkPosition, this)).on("click.affix.data-api", t.proxy(function() {
            setTimeout(t.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = t(e), this.checkPosition()
    };
    e.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e, n = t(document).height(),
                i = this.$window.scrollTop(),
                o = this.$element.offset(),
                a = this.options.offset,
                r = a.bottom,
                s = a.top,
                l = "affix affix-top affix-bottom";
            "object" != typeof a && (r = s = a), "function" == typeof s && (s = a.top()), "function" == typeof r && (r = a.bottom()), e = null != this.unpin && i + this.unpin <= o.top ? !1 : null != r && o.top + this.$element.height() >= n - r ? "bottom" : null != s && s >= i ? "top" : !1, this.affixed !== e && (this.affixed = e, this.unpin = "bottom" == e ? o.top - i : null, this.$element.removeClass(l).addClass("affix" + (e ? "-" + e : "")))
        }
    };
    var n = t.fn.affix;
    t.fn.affix = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("affix"),
                a = "object" == typeof n && n;
            o || i.data("affix", o = new e(this, a)), "string" == typeof n && o[n]()
        })
    }, t.fn.affix.Constructor = e, t.fn.affix.defaults = {
        offset: 0
    }, t.fn.affix.noConflict = function() {
        return t.fn.affix = n, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var e = t(this),
                n = e.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), e.affix(n)
        })
    })
}(window.jQuery),
/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
function(t) {
    function e(e, n, i, o) {
        var a = {
            data: o || 0 === o || o === !1 ? o : n ? n.data : {},
            _wrap: n ? n._wrap : null,
            tmpl: null,
            parent: n || null,
            nodes: [],
            calls: c,
            nest: u,
            wrap: d,
            html: p,
            update: f
        };
        return e && t.extend(a, e, {
            nodes: [],
            parent: n
        }), i && (a.tmpl = i, a._ctnt = a._ctnt || a.tmpl(t, a), a.key = ++w, ($.length ? b : y)[w] = a), a
    }

    function n(e, o, a) {
        var r, s = a ? t.map(a, function(t) {
            return "string" == typeof t ? e.key ? t.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + g + '="' + e.key + '" $2') : t : n(t, e, t._ctnt)
        }) : e;
        return o ? s : (s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(e, n, o, a) {
            r = t(o).get(), l(r), n && (r = i(n).concat(r)), a && (r = r.concat(i(a)))
        }), r ? r : i(s))
    }

    function i(e) {
        var n = document.createElement("div");
        return n.innerHTML = e, t.makeArray(n.childNodes)
    }

    function o(e) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + t.trim(e).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(e, n, i, o, a, s, l) {
            var c, u, d, p = t.tmpl.tag[i];
            if (!p) throw "Unknown template tag: " + i;
            return c = p._default || [], s && !/\w$/.test(a) && (a += s, s = ""), a ? (a = r(a), l = l ? "," + r(l) + ")" : s ? ")" : "", u = s ? a.indexOf(".") > -1 ? a + r(s) : "(" + a + ").call($item" + l : a, d = s ? u : "(typeof(" + a + ")==='function'?(" + a + ").call($item):(" + a + "))") : d = u = c.$1 || "null", o = r(o), "');" + p[n ? "close" : "open"].split("$notnull_1").join(a ? "typeof(" + a + ")!=='undefined' && (" + a + ")!=null" : "true").split("$1a").join(d).split("$1").join(u).split("$2").join(o || c.$2 || "") + "__.push('"
        }) + "');}return __;")
    }

    function a(e, i) {
        e._wrap = n(e, !0, t.isArray(i) ? i : [v.test(i) ? i : t(i).html()]).join("")
    }

    function r(t) {
        return t ? t.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function s(t) {
        var e = document.createElement("div");
        return e.appendChild(t.cloneNode(!0)), e.innerHTML
    }

    function l(n) {
        function i(n) {
            function i(t) {
                t += c, r = u[t] = u[t] || e(r, y[r.parent.key + c] || r.parent)
            }
            var o, a, r, s, l = n;
            if (s = n.getAttribute(g)) {
                for (; l.parentNode && 1 === (l = l.parentNode).nodeType && !(o = l.getAttribute(g)););
                o !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 : l.getAttribute(g) || 0 : 0, (r = y[s]) || (r = b[s], r = e(r, y[l] || b[l]), r.key = ++w, y[w] = r), _ && i(s)), n.removeAttribute(g)
            } else _ && (r = t.data(n, "tmplItem")) && (i(r.key), y[r.key] = r, l = t.data(n.parentNode, "tmplItem"), l = l ? l.key : 0);
            if (r) {
                for (a = r; a && a.key != l;) a.nodes.push(n), a = a.parent;
                delete r._ctnt, delete r._wrap, t.data(n, "tmplItem", r)
            }
        }
        var o, a, r, s, l, c = "_" + _,
            u = {};
        for (r = 0, s = n.length; s > r; r++)
            if (1 === (o = n[r]).nodeType) {
                for (a = o.getElementsByTagName("*"), l = a.length - 1; l >= 0; l--) i(a[l]);
                i(o)
            }
    }

    function c(t, e, n, i) {
        return t ? ($.push({
            _: t,
            tmpl: e,
            item: this,
            data: n,
            options: i
        }), void 0) : $.pop()
    }

    function u(e, n, i) {
        return t.tmpl(t.template(e), n, i, this)
    }

    function d(e, n) {
        var i = e.options || {};
        return i.wrapped = n, t.tmpl(t.template(e.tmpl), e.data, i, e.item)
    }

    function p(e, n) {
        var i = this._wrap;
        return t.map(t(t.isArray(i) ? i.join("") : i).filter(e || "*"), function(t) {
            return n ? t.innerText || t.textContent : t.outerHTML || s(t)
        })
    }

    function f() {
        var e = this.nodes;
        t.tmpl(null, null, null, this).insertBefore(e[0]), t(e).remove()
    }
    var h, m = t.fn.domManip,
        g = "_tmplitem",
        v = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        y = {},
        b = {},
        x = {
            key: 0,
            data: {}
        },
        w = 0,
        _ = 0,
        $ = [];
    t.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, n) {
        t.fn[e] = function(i) {
            var o, a, r, s, l = [],
                c = t(i),
                u = 1 === this.length && this[0].parentNode;
            if (h = y || {}, u && 11 === u.nodeType && 1 === u.childNodes.length && 1 === c.length) c[n](this[0]), l = this;
            else {
                for (a = 0, r = c.length; r > a; a++) _ = a, o = (a > 0 ? this.clone(!0) : this).get(), t(c[a])[n](o), l = l.concat(o);
                _ = 0, l = this.pushStack(l, e, c.selector)
            }
            return s = h, h = null, t.tmpl.complete(s), l
        }
    }), t.fn.extend({
        tmpl: function(e, n, i) {
            return t.tmpl(this[0], e, n, i)
        },
        tmplItem: function() {
            return t.tmplItem(this[0])
        },
        template: function(e) {
            return t.template(e, this[0])
        },
        domManip: function(e, n, i) {
            if (e[0] && t.isArray(e[0])) {
                for (var o, a = t.makeArray(arguments), r = e[0], s = r.length, l = 0; s > l && !(o = t.data(r[l++], "tmplItem")););
                o && _ && (a[2] = function(e) {
                    t.tmpl.afterManip(this, e, i)
                }), m.apply(this, a)
            } else m.apply(this, arguments);
            return _ = 0, h || t.tmpl.complete(y), this
        }
    }), t.extend({
        tmpl: function(i, o, r, s) {
            var l, c = !s;
            if (c) s = x, i = t.template[i] || t.template(null, i), b = {};
            else if (!i) return i = s.tmpl, y[s.key] = s, s.nodes = [], s.wrapped && a(s, s.wrapped), t(n(s, null, s.tmpl(t, s)));
            return i ? ("function" == typeof o && (o = o.call(s || {})), r && r.wrapped && a(r, r.wrapped), l = t.isArray(o) ? t.map(o, function(t) {
                return t ? e(r, s, i, t) : null
            }) : [e(r, s, i, o)], c ? t(n(s, null, l)) : l) : []
        },
        tmplItem: function(e) {
            var n;
            for (e instanceof t && (e = e[0]); e && 1 === e.nodeType && !(n = t.data(e, "tmplItem")) && (e = e.parentNode););
            return n || x
        },
        template: function(e, n) {
            return n ? ("string" == typeof n ? n = o(n) : n instanceof t && (n = n[0] || {}), n.nodeType && (n = t.data(n, "tmpl") || t.data(n, "tmpl", o(n.innerHTML))), "string" == typeof e ? t.template[e] = n : n) : e ? "string" != typeof e ? t.template(null, e) : t.template[e] || t.template(null, v.test(e) ? e : t(e)) : null
        },
        encode: function(t) {
            return ("" + t).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    }), t.extend(t.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function() {
            y = {}
        },
        afterManip: function(e, n, i) {
            var o = 11 === n.nodeType ? t.makeArray(n.childNodes) : 1 === n.nodeType ? [n] : [];
            i.call(e, n), l(o), _++
        }
    })
}(jQuery), jQuery.fn.extend({
        insertAtCaret: function(t) {
            return this.each(function() {
                if (document.selection) this.focus(), sel = document.selection.createRange(), sel.text = t, this.focus();
                else if (this.selectionStart || "0" == this.selectionStart) {
                    var e = this.selectionStart,
                        n = this.selectionEnd,
                        i = this.scrollTop;
                    this.value = this.value.substring(0, e) + t + this.value.substring(n, this.value.length), this.focus(), this.selectionStart = e + t.length, this.selectionEnd = e + t.length, this.scrollTop = i
                } else this.value += t, this.focus()
            })
        }
    }),
    function(t) {
        "use strict";

        function e(e) {
            var n = e.data;
            e.isDefaultPrevented() || (e.preventDefault(), t(this).ajaxSubmit(n))
        }

        function n(e) {
            var n = e.target,
                i = t(n);
            if (!i.is(":submit,input:image")) {
                var o = i.closest(":submit");
                if (0 === o.length) return;
                n = o[0]
            }
            var a = this;
            if (a.clk = n, "image" == n.type)
                if (void 0 !== e.offsetX) a.clk_x = e.offsetX, a.clk_y = e.offsetY;
                else if ("function" == typeof t.fn.offset) {
                var r = i.offset();
                a.clk_x = e.pageX - r.left, a.clk_y = e.pageY - r.top
            } else a.clk_x = e.pageX - n.offsetLeft, a.clk_y = e.pageY - n.offsetTop;
            setTimeout(function() {
                a.clk = a.clk_x = a.clk_y = null
            }, 100)
        }

        function i() {
            if (t.fn.ajaxSubmit.debug) {
                var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e)
            }
        }
        var o = {};
        o.fileapi = void 0 !== t("<input type='file'/>").get(0).files, o.formdata = void 0 !== window.FormData, t.fn.ajaxSubmit = function(e) {
            function n(e) {
                var n, i, o = t.param(e).split("&"),
                    a = o.length,
                    r = {};
                for (n = 0; a > n; n++) i = o[n].split("="), r[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
                return r
            }

            function a(i) {
                for (var o = new FormData, a = 0; a < i.length; a++) o.append(i[a].name, i[a].value);
                if (e.extraData) {
                    var r = n(e.extraData);
                    for (var s in r) r.hasOwnProperty(s) && o.append(s, r[s])
                }
                e.data = null;
                var l = t.extend(!0, {}, t.ajaxSettings, e, {
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    type: "POST"
                });
                e.uploadProgress && (l.xhr = function() {
                    var t = jQuery.ajaxSettings.xhr();
                    return t.upload && (t.upload.onprogress = function(t) {
                        var n = 0,
                            i = t.loaded || t.position,
                            o = t.total;
                        t.lengthComputable && (n = Math.ceil(100 * (i / o))), e.uploadProgress(t, i, o, n)
                    }), t
                }), l.data = null;
                var c = l.beforeSend;
                l.beforeSend = function(t, e) {
                    e.data = o, c && c.call(this, t, e)
                }, t.ajax(l)
            }

            function r(n) {
                function o(t) {
                    var e = t.contentWindow ? t.contentWindow.document : t.contentDocument ? t.contentDocument : t.document;
                    return e
                }

                function a() {
                    function e() {
                        try {
                            var t = o(g).readyState;
                            i("state = " + t), t && "uninitialized" == t.toLowerCase() && setTimeout(e, 50)
                        } catch (n) {
                            i("Server abort: ", n, " (", n.name, ")"), r(C), w && clearTimeout(w), w = void 0
                        }
                    }
                    var n = u.attr("target"),
                        a = u.attr("action");
                    _.setAttribute("target", f), s || _.setAttribute("method", "POST"), a != d.url && _.setAttribute("action", d.url), d.skipEncodingOverride || s && !/post/i.test(s) || u.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    }), d.timeout && (w = setTimeout(function() {
                        x = !0, r(k)
                    }, d.timeout));
                    var l = [];
                    try {
                        if (d.extraData)
                            for (var c in d.extraData) d.extraData.hasOwnProperty(c) && (t.isPlainObject(d.extraData[c]) && d.extraData[c].hasOwnProperty("name") && d.extraData[c].hasOwnProperty("value") ? l.push(t('<input type="hidden" name="' + d.extraData[c].name + '">').attr("value", d.extraData[c].value).appendTo(_)[0]) : l.push(t('<input type="hidden" name="' + c + '">').attr("value", d.extraData[c]).appendTo(_)[0]));
                        d.iframeTarget || (m.appendTo("body"), g.attachEvent ? g.attachEvent("onload", r) : g.addEventListener("load", r, !1)), setTimeout(e, 15), _.submit()
                    } finally {
                        _.setAttribute("action", a), n ? _.setAttribute("target", n) : u.removeAttr("target"), t(l).remove()
                    }
                }

                function r(e) {
                    if (!v.aborted && !D) {
                        try {
                            N = o(g)
                        } catch (n) {
                            i("cannot access response document: ", n), e = C
                        }
                        if (e === k && v) return v.abort("timeout"), void 0;
                        if (e == C && v) return v.abort("server abort"), void 0;
                        if (N && N.location.href != d.iframeSrc || x) {
                            g.detachEvent ? g.detachEvent("onload", r) : g.removeEventListener("load", r, !1);
                            var a, s = "success";
                            try {
                                if (x) throw "timeout";
                                var l = "xml" == d.dataType || N.XMLDocument || t.isXMLDoc(N);
                                if (i("isXml=" + l), !l && window.opera && (null === N.body || !N.body.innerHTML) && --E) return i("requeing onLoad callback, DOM not available"), setTimeout(r, 250), void 0;
                                var c = N.body ? N.body : N.documentElement;
                                v.responseText = c ? c.innerHTML : null, v.responseXML = N.XMLDocument ? N.XMLDocument : N, l && (d.dataType = "xml"), v.getResponseHeader = function(t) {
                                    var e = {
                                        "content-type": d.dataType
                                    };
                                    return e[t]
                                }, c && (v.status = Number(c.getAttribute("status")) || v.status, v.statusText = c.getAttribute("statusText") || v.statusText);
                                var u = (d.dataType || "").toLowerCase(),
                                    f = /(json|script|text)/.test(u);
                                if (f || d.textarea) {
                                    var h = N.getElementsByTagName("textarea")[0];
                                    if (h) v.responseText = h.value, v.status = Number(h.getAttribute("status")) || v.status, v.statusText = h.getAttribute("statusText") || v.statusText;
                                    else if (f) {
                                        var y = N.getElementsByTagName("pre")[0],
                                            b = N.getElementsByTagName("body")[0];
                                        y ? v.responseText = y.textContent ? y.textContent : y.innerText : b && (v.responseText = b.textContent ? b.textContent : b.innerText)
                                    }
                                } else "xml" == u && !v.responseXML && v.responseText && (v.responseXML = j(v.responseText));
                                try {
                                    S = W(v, u, d)
                                } catch (e) {
                                    s = "parsererror", v.error = a = e || s
                                }
                            } catch (e) {
                                i("error caught: ", e), s = "error", v.error = a = e || s
                            }
                            v.aborted && (i("upload aborted"), s = null), v.status && (s = v.status >= 200 && v.status < 300 || 304 === v.status ? "success" : "error"), "success" === s ? (d.success && d.success.call(d.context, S, "success", v), p && t.event.trigger("ajaxSuccess", [v, d])) : s && (void 0 === a && (a = v.statusText), d.error && d.error.call(d.context, v, s, a), p && t.event.trigger("ajaxError", [v, d, a])), p && t.event.trigger("ajaxComplete", [v, d]), p && !--t.active && t.event.trigger("ajaxStop"), d.complete && d.complete.call(d.context, v, s), D = !0, d.timeout && clearTimeout(w), setTimeout(function() {
                                d.iframeTarget || m.remove(), v.responseXML = null
                            }, 100)
                        }
                    }
                }
                var l, c, d, p, f, m, g, v, y, b, x, w, _ = u[0],
                    $ = !!t.fn.prop;
                if (t(":input[name=submit],:input[id=submit]", _).length) return alert('Error: Form elements must not have name or id of "submit".'), void 0;
                if (n)
                    for (c = 0; c < h.length; c++) l = t(h[c]), $ ? l.prop("disabled", !1) : l.removeAttr("disabled");
                if (d = t.extend(!0, {}, t.ajaxSettings, e), d.context = d.context || d, f = "jqFormIO" + (new Date).getTime(), d.iframeTarget ? (m = t(d.iframeTarget), b = m.attr("name"), b ? f = b : m.attr("name", f)) : (m = t('<iframe name="' + f + '" src="' + d.iframeSrc + '" />'), m.css({
                        position: "absolute",
                        top: "-1000px",
                        left: "-1000px"
                    })), g = m[0], v = {
                        aborted: 0,
                        responseText: null,
                        responseXML: null,
                        status: 0,
                        statusText: "n/a",
                        getAllResponseHeaders: function() {},
                        getResponseHeader: function() {},
                        setRequestHeader: function() {},
                        abort: function(e) {
                            var n = "timeout" === e ? "timeout" : "aborted";
                            if (i("aborting upload... " + n), this.aborted = 1, g.contentWindow.document.execCommand) try {
                                g.contentWindow.document.execCommand("Stop")
                            } catch (o) {}
                            m.attr("src", d.iframeSrc), v.error = n, d.error && d.error.call(d.context, v, n, e), p && t.event.trigger("ajaxError", [v, d, n]), d.complete && d.complete.call(d.context, v, n)
                        }
                    }, p = d.global, p && 0 === t.active++ && t.event.trigger("ajaxStart"), p && t.event.trigger("ajaxSend", [v, d]), d.beforeSend && d.beforeSend.call(d.context, v, d) === !1) return d.global && t.active--, void 0;
                if (!v.aborted) {
                    y = _.clk, y && (b = y.name, b && !y.disabled && (d.extraData = d.extraData || {}, d.extraData[b] = y.value, "image" == y.type && (d.extraData[b + ".x"] = _.clk_x, d.extraData[b + ".y"] = _.clk_y)));
                    var k = 1,
                        C = 2,
                        F = t("meta[name=csrf-token]").attr("content"),
                        T = t("meta[name=csrf-param]").attr("content");
                    T && F && (d.extraData = d.extraData || {}, d.extraData[T] = F), d.forceSync ? a() : setTimeout(a, 10);
                    var S, N, D, E = 50,
                        j = t.parseXML || function(t, e) {
                            return window.ActiveXObject ? (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(t)) : e = (new DOMParser).parseFromString(t, "text/xml"), e && e.documentElement && "parsererror" != e.documentElement.nodeName ? e : null
                        },
                        A = t.parseJSON || function(t) {
                            return window.eval("(" + t + ")")
                        },
                        W = function(e, n, i) {
                            var o = e.getResponseHeader("content-type") || "",
                                a = "xml" === n || !n && o.indexOf("xml") >= 0,
                                r = a ? e.responseXML : e.responseText;
                            return a && "parsererror" === r.documentElement.nodeName && t.error && t.error("parsererror"), i && i.dataFilter && (r = i.dataFilter(r, n)), "string" == typeof r && ("json" === n || !n && o.indexOf("json") >= 0 ? r = A(r) : ("script" === n || !n && o.indexOf("javascript") >= 0) && t.globalEval(r)), r
                        }
                }
            }
            if (!this.length) return i("ajaxSubmit: skipping submit process - no element selected"), this;
            var s, l, c, u = this;
            "function" == typeof e && (e = {
                success: e
            }), s = this.attr("method"), l = this.attr("action"), c = "string" == typeof l ? t.trim(l) : "", c = c || window.location.href || "", c && (c = (c.match(/^([^#]+)/) || [])[1]), e = t.extend(!0, {
                url: c,
                success: t.ajaxSettings.success,
                type: s || "GET",
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, e);
            var d = {};
            if (this.trigger("form-pre-serialize", [this, e, d]), d.veto) return i("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (e.beforeSerialize && e.beforeSerialize(this, e) === !1) return i("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            var p = e.traditional;
            void 0 === p && (p = t.ajaxSettings.traditional);
            var f, h = [],
                m = this.formToArray(e.semantic, h);
            if (e.data && (e.extraData = e.data, f = t.param(e.data, p)), e.beforeSubmit && e.beforeSubmit(m, this, e) === !1) return i("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            if (this.trigger("form-submit-validate", [m, this, e, d]), d.veto) return i("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            var g = t.param(m, p);
            f && (g = g ? g + "&" + f : f), "GET" == e.type.toUpperCase() ? (e.url += (e.url.indexOf("?") >= 0 ? "&" : "?") + g, e.data = null) : e.data = g;
            var v = [];
            if (e.resetForm && v.push(function() {
                    u.resetForm()
                }), e.clearForm && v.push(function() {
                    u.clearForm(e.includeHidden)
                }), !e.dataType && e.target) {
                var y = e.success || function() {};
                v.push(function(n) {
                    var i = e.replaceTarget ? "replaceWith" : "html";
                    t(e.target)[i](n).each(y, arguments)
                })
            } else e.success && v.push(e.success);
            e.success = function(t, n, i) {
                for (var o = e.context || this, a = 0, r = v.length; r > a; a++) v[a].apply(o, [t, n, i || u, u])
            };
            var b = t("input:file:enabled[value]", this),
                x = b.length > 0,
                w = "multipart/form-data",
                _ = u.attr("enctype") == w || u.attr("encoding") == w,
                $ = o.fileapi && o.formdata;
            i("fileAPI :" + $);
            var k = (x || _) && !$;
            e.iframe !== !1 && (e.iframe || k) ? e.closeKeepAlive ? t.get(e.closeKeepAlive, function() {
                r(m)
            }) : r(m) : (x || _) && $ ? a(m) : t.ajax(e);
            for (var C = 0; C < h.length; C++) h[C] = null;
            return this.trigger("form-submit-notify", [this, e]), this
        }, t.fn.ajaxForm = function(o) {
            if (o = o || {}, o.delegation = o.delegation && t.isFunction(t.fn.on), !o.delegation && 0 === this.length) {
                var a = {
                    s: this.selector,
                    c: this.context
                };
                return !t.isReady && a.s ? (i("DOM not ready, queuing ajaxForm"), t(function() {
                    t(a.s, a.c).ajaxForm(o)
                }), this) : (i("terminating; zero elements found by selector" + (t.isReady ? "" : " (DOM not ready)")), this)
            }
            return o.delegation ? (t(document).off("submit.form-plugin", this.selector, e).off("click.form-plugin", this.selector, n).on("submit.form-plugin", this.selector, o, e).on("click.form-plugin", this.selector, o, n), this) : this.ajaxFormUnbind().bind("submit.form-plugin", o, e).bind("click.form-plugin", o, n)
        }, t.fn.ajaxFormUnbind = function() {
            return this.unbind("submit.form-plugin click.form-plugin")
        }, t.fn.formToArray = function(e, n) {
            var i = [];
            if (0 === this.length) return i;
            var a = this[0],
                r = e ? a.getElementsByTagName("*") : a.elements;
            if (!r) return i;
            var s, l, c, u, d, p, f;
            for (s = 0, p = r.length; p > s; s++)
                if (d = r[s], c = d.name)
                    if (e && a.clk && "image" == d.type) d.disabled || a.clk != d || (i.push({
                        name: c,
                        value: t(d).val(),
                        type: d.type
                    }), i.push({
                        name: c + ".x",
                        value: a.clk_x
                    }, {
                        name: c + ".y",
                        value: a.clk_y
                    }));
                    else if (u = t.fieldValue(d, !0), u && u.constructor == Array)
                for (n && n.push(d), l = 0, f = u.length; f > l; l++) i.push({
                    name: c,
                    value: u[l]
                });
            else if (o.fileapi && "file" == d.type && !d.disabled) {
                n && n.push(d);
                var h = d.files;
                if (h.length)
                    for (l = 0; l < h.length; l++) i.push({
                        name: c,
                        value: h[l],
                        type: d.type
                    });
                else i.push({
                    name: c,
                    value: "",
                    type: d.type
                })
            } else null !== u && "undefined" != typeof u && (n && n.push(d), i.push({
                name: c,
                value: u,
                type: d.type,
                required: d.required
            }));
            if (!e && a.clk) {
                var m = t(a.clk),
                    g = m[0];
                c = g.name, c && !g.disabled && "image" == g.type && (i.push({
                    name: c,
                    value: m.val()
                }), i.push({
                    name: c + ".x",
                    value: a.clk_x
                }, {
                    name: c + ".y",
                    value: a.clk_y
                }))
            }
            return i
        }, t.fn.formSerialize = function(e) {
            return t.param(this.formToArray(e))
        }, t.fn.fieldSerialize = function(e) {
            var n = [];
            return this.each(function() {
                var i = this.name;
                if (i) {
                    var o = t.fieldValue(this, e);
                    if (o && o.constructor == Array)
                        for (var a = 0, r = o.length; r > a; a++) n.push({
                            name: i,
                            value: o[a]
                        });
                    else null !== o && "undefined" != typeof o && n.push({
                        name: this.name,
                        value: o
                    })
                }
            }), t.param(n)
        }, t.fn.fieldValue = function(e) {
            for (var n = [], i = 0, o = this.length; o > i; i++) {
                var a = this[i],
                    r = t.fieldValue(a, e);
                null === r || "undefined" == typeof r || r.constructor == Array && !r.length || (r.constructor == Array ? t.merge(n, r) : n.push(r))
            }
            return n
        }, t.fieldValue = function(e, n) {
            var i = e.name,
                o = e.type,
                a = e.tagName.toLowerCase();
            if (void 0 === n && (n = !0), n && (!i || e.disabled || "reset" == o || "button" == o || ("checkbox" == o || "radio" == o) && !e.checked || ("submit" == o || "image" == o) && e.form && e.form.clk != e || "select" == a && -1 == e.selectedIndex)) return null;
            if ("select" == a) {
                var r = e.selectedIndex;
                if (0 > r) return null;
                for (var s = [], l = e.options, c = "select-one" == o, u = c ? r + 1 : l.length, d = c ? r : 0; u > d; d++) {
                    var p = l[d];
                    if (p.selected) {
                        var f = p.value;
                        if (f || (f = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text : p.value), c) return f;
                        s.push(f)
                    }
                }
                return s
            }
            return t(e).val()
        }, t.fn.clearForm = function(e) {
            return this.each(function() {
                t("input,select,textarea", this).clearFields(e)
            })
        }, t.fn.clearFields = t.fn.clearInputs = function(e) {
            var n = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function() {
                var i = this.type,
                    o = this.tagName.toLowerCase();
                n.test(i) || "textarea" == o ? this.value = "" : "checkbox" == i || "radio" == i ? this.checked = !1 : "select" == o ? this.selectedIndex = -1 : e && (e === !0 && /hidden/.test(i) || "string" == typeof e && t(this).is(e)) && (this.value = "")
            })
        }, t.fn.resetForm = function() {
            return this.each(function() {
                ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
            })
        }, t.fn.enable = function(t) {
            return void 0 === t && (t = !0), this.each(function() {
                this.disabled = !t
            })
        }, t.fn.selected = function(e) {
            return void 0 === e && (e = !0), this.each(function() {
                var n = this.type;
                if ("checkbox" == n || "radio" == n) this.checked = e;
                else if ("option" == this.tagName.toLowerCase()) {
                    var i = t(this).parent("select");
                    e && i[0] && "select-one" == i[0].type && i.find("option").selected(!1), this.selected = e
                }
            })
        }, t.fn.ajaxSubmit.debug = !1
    }(jQuery), // Copyright (C) 2007-2012 Jay Salvat
    // The above copyright notice and this permission notice shall be included in
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    function($) {
        $.fn.markItUp = function(settings, extraSettings) {
            var method, params, options, ctrlKey, shiftKey, altKey;
            return ctrlKey = shiftKey = altKey = !1, "string" == typeof settings && (method = settings, params = extraSettings), options = {
                id: "",
                nameSpace: "",
                root: "",
                previewHandler: !1,
                previewInWindow: "",
                previewInElement: "",
                previewAutoRefresh: !0,
                previewPosition: "after",
                previewTemplatePath: "~/templates/preview.html",
                previewParser: !1,
                previewParserPath: "",
                previewParserVar: "data",
                resizeHandle: !0,
                beforeInsert: "",
                afterInsert: "",
                onEnter: {},
                onShiftEnter: {},
                onCtrlEnter: {},
                onTab: {},
                markupSet: [{}]
            }, $.extend(options, settings, extraSettings), options.root || $("script").each(function(t, e) {
                miuScript = $(e).get(0).src.match(/(.*)jquery\.markitup(\.pack)?\.js$/), null !== miuScript && (options.root = miuScript[1])
            }), this.each(function() {
                function localize(t, e) {
                    return e ? t.replace(/("|')~\//g, "$1" + options.root) : t.replace(/^~\//, options.root)
                }

                function init() {
                    id = "", nameSpace = "", options.id ? id = 'id="' + options.id + '"' : $$.attr("id") && (id = 'id="markItUp' + $$.attr("id").substr(0, 1).toUpperCase() + $$.attr("id").substr(1) + '"'), options.nameSpace && (nameSpace = 'class="' + options.nameSpace + '"'), $$.wrap("<div " + nameSpace + "></div>"), $$.wrap("<div " + id + ' class="markItUp"></div>'), $$.wrap('<div class="markItUpContainer"></div>'), $$.addClass("markItUpEditor");
                    var t = $('<div class="tab"> <ul> <li class="hover"><a class="edit_btn_a" href="javascript:void(0);"><span>编辑</span></a></li> <li><a class="preview_btn_a" href="javascript:void(0);"><span>预览</span></a></li> </ul> </div>');
                    t.find("a").on("click", function() {
                        online_preview(this)
                    }), t.insertBefore($$.parent(".markItUpContainer")), header = $('<div class="markItUpHeader"></div>').insertBefore($$), $(dropMenus(options.markupSet)).appendTo(header), footer = $('<div class="markItUpFooter"></div>').insertAfter($$), options.resizeHandle === !0 && $.browser.safari !== !0 && (resizeHandle = $('<div class="markItUpResizeHandle"></div>').insertAfter($$).bind("mousedown.markItUp", function(t) {
                        var e, n, i = $$.height(),
                            o = t.clientY;
                        e = function(t) {
                            return $$.css("height", Math.max(20, t.clientY + i - o) + "px"), !1
                        }, n = function() {
                            return $("html").unbind("mousemove.markItUp", e).unbind("mouseup.markItUp", n), !1
                        }, $("html").bind("mousemove.markItUp", e).bind("mouseup.markItUp", n)
                    }), footer.append(resizeHandle)), $$.bind("keydown.markItUp", keyPressed).bind("keyup", keyPressed), $$.bind("insertion.markItUp", function(t, e) {
                        e.target !== !1 && get(), textarea === $.markItUp.focused && markup(e)
                    }), $$.bind("focus.markItUp", function() {
                        $.markItUp.focused = this
                    }), options.previewInElement && refreshPreview()
                }

                function dropMenus(markupSet) {
                    var ul = $("<ul></ul>"),
                        i = 0;
                    return $("li:hover > ul", ul).css("display", "block"), $.each(markupSet, function() {
                        var button = this,
                            t = "",
                            title, li, j;
                        if (title = button.key ? (button.name || "") + " [Ctrl+" + button.key + "]" : button.name || "", key = button.key ? 'accesskey="' + button.key + '"' : "", button.separator) li = $('<li class="markItUpSeparator">' + (button.separator || "") + "</li>").appendTo(ul);
                        else {
                            for (i++, j = levels.length - 1; j >= 0; j--) t += levels[j] + "-";
                            li = $('<li class="markItUpButton markItUpButton' + t + i + " " + (button.className || "") + '"><a href="" ' + key + ' title="' + title + '">' + (button.name || "") + "</a></li>").bind("contextmenu.markItUp", function() {
                                return !1
                            }).bind("click.markItUp", function() {
                                return $(this).closest(".markItUpDropMenu > ul").hide(), !1
                            }).bind("focusin.markItUp", function() {
                                $$.focus()
                            }).bind("mouseup", function() {
                                button.call && eval(button.call)(this);
                                var click_elem = $(this);
                                return click_elem.hasClass("not_prompt") ? !1 : (setTimeout(function() {
                                    markup(button)
                                }, 1), !1)
                            }).bind("mouseenter.markItUp", function() {
                                $("> ul", this).show(), $(document).one("click", function() {
                                    $("ul ul", header).hide()
                                })
                            }).bind("mouseleave.markItUp", function() {
                                $("> ul", this).hide()
                            }).appendTo(ul), li.hasClass("emoticons") && li.one("mouseenter", function() {
                                lazy_load_emoticon(this)
                            }), button.dropMenu && (levels.push(i), $(li).addClass("markItUpDropMenu").append(dropMenus(button.dropMenu)))
                        }
                    }), levels.pop(), ul
                }

                function magicMarkups(t) {
                    return t ? (t = t.toString(), t = t.replace(/\(\!\(([\s\S]*?)\)\!\)/g, function(t, e) {
                        var n = e.split("|!|");
                        return altKey === !0 ? void 0 !== n[1] ? n[1] : n[0] : void 0 === n[1] ? "" : n[0]
                    }), t = t.replace(/\[\!\[([\s\S]*?)\]\!\]/g, function(t, e) {
                        var n = e.split(":!:");
                        return abort === !0 ? !1 : (value = prompt(n[0], n[1] ? n[1] : ""), null === value && (abort = !0), value)
                    })) : ""
                }

                function prepare(t) {
                    return $.isFunction(t) && (t = t(hash)), magicMarkups(t)
                }

                function build(t) {
                    var e = prepare(clicked.openWith),
                        n = prepare(clicked.placeHolder),
                        i = prepare(clicked.replaceWith),
                        o = prepare(clicked.closeWith),
                        a = prepare(clicked.openBlockWith),
                        r = prepare(clicked.closeBlockWith),
                        s = clicked.multiline;
                    if ("" !== i) block = e + i + o;
                    else if ("" === selection && "" !== n) block = e + n + o;
                    else {
                        t = t || selection;
                        var l = [t],
                            c = [];
                        s === !0 && (l = t.split(/\r?\n/));
                        for (var u = 0; u < l.length; u++) {
                            line = l[u];
                            var d;
                            (d = line.match(/ *$/)) ? c.push(e + line.replace(/ *$/g, "") + o + d): c.push(e + line + o)
                        }
                        block = c.join("\n")
                    }
                    return block = a + block + r, {
                        block: block,
                        openWith: e,
                        replaceWith: i,
                        placeHolder: n,
                        closeWith: o
                    }
                }

                function markup(t) {
                    var e, n, i, o;
                    if (hash = clicked = t, get(), $.extend(hash, {
                            line: "",
                            root: options.root,
                            textarea: textarea,
                            selection: selection || "",
                            caretPosition: caretPosition,
                            ctrlKey: ctrlKey,
                            shiftKey: shiftKey,
                            altKey: altKey
                        }), prepare(options.beforeInsert), prepare(clicked.beforeInsert), (ctrlKey === !0 && shiftKey === !0 || t.multiline === !0) && prepare(clicked.beforeMultiInsert), $.extend(hash, {
                            line: 1
                        }), ctrlKey === !0 && shiftKey === !0) {
                        for (lines = selection.split(/\r?\n/), n = 0, i = lines.length, o = 0; i > o; o++) "" !== $.trim(lines[o]) ? ($.extend(hash, {
                            line: ++n,
                            selection: lines[o]
                        }), lines[o] = build(lines[o]).block) : lines[o] = "";
                        string = {
                            block: lines.join("\n")
                        }, start = caretPosition, e = string.block.length + ($.browser.opera ? i - 1 : 0)
                    } else ctrlKey === !0 ? (string = build(selection), start = caretPosition + string.openWith.length, e = string.block.length - string.openWith.length - string.closeWith.length, e -= string.block.match(/ $/) ? 1 : 0, e -= fixIeBug(string.block)) : shiftKey === !0 ? (string = build(selection), start = caretPosition, e = string.block.length, e -= fixIeBug(string.block)) : (string = build(selection), start = caretPosition + string.block.length, e = 0, start -= fixIeBug(string.block));
                    "" === selection && "" === string.replaceWith && (caretOffset += fixOperaBug(string.block), start = caretPosition + string.openWith.length, e = string.block.length - string.openWith.length - string.closeWith.length, caretOffset = $$.val().substring(caretPosition, $$.val().length).length, caretOffset -= fixOperaBug($$.val().substring(0, caretPosition))), $.extend(hash, {
                        caretPosition: caretPosition,
                        scrollPosition: scrollPosition
                    }), string.block !== selection && abort === !1 ? (insert(string.block), set(start, e)) : caretOffset = -1, get(), $.extend(hash, {
                        line: "",
                        selection: selection
                    }), (ctrlKey === !0 && shiftKey === !0 || t.multiline === !0) && prepare(clicked.afterMultiInsert), prepare(clicked.afterInsert), prepare(options.afterInsert), previewWindow && options.previewAutoRefresh && refreshPreview(), shiftKey = altKey = ctrlKey = abort = !1
                }

                function fixOperaBug(t) {
                    return $.browser.opera ? t.length - t.replace(/\n*/g, "").length : 0
                }

                function fixIeBug(t) {
                    return $.browser.msie ? t.length - t.replace(/\r*/g, "").length : 0
                }

                function insert(t) {
                    if (document.selection) {
                        var e = document.selection.createRange();
                        e.text = t
                    } else textarea.value = textarea.value.substring(0, caretPosition) + t + textarea.value.substring(caretPosition + selection.length, textarea.value.length)
                }

                function set(t, e) {
                    if (textarea.createTextRange) {
                        if ($.browser.opera && $.browser.version >= 9.5 && 0 == e) return !1;
                        range = textarea.createTextRange(), range.collapse(!0), range.moveStart("character", t), range.moveEnd("character", e), range.select()
                    } else textarea.setSelectionRange && textarea.setSelectionRange(t, t + e);
                    textarea.scrollTop = scrollPosition, textarea.focus()
                }

                function get() {
                    if (textarea.focus(), scrollPosition = textarea.scrollTop, document.selection)
                        if (selection = document.selection.createRange().text, $.browser.msie) {
                            var t = document.selection.createRange(),
                                e = t.duplicate();
                            for (e.moveToElementText(textarea), caretPosition = -1; e.inRange(t);) e.moveStart("character"), caretPosition++
                        } else caretPosition = textarea.selectionStart;
                    else caretPosition = textarea.selectionStart, selection = textarea.value.substring(caretPosition, textarea.selectionEnd);
                    return selection
                }

                function preview() {
                    "function" == typeof options.previewHandler ? previewWindow = !0 : options.previewInElement ? previewWindow = $(options.previewInElement) : !previewWindow || previewWindow.closed ? options.previewInWindow ? (previewWindow = window.open("", "preview", options.previewInWindow), $(window).unload(function() {
                        previewWindow.close()
                    })) : (iFrame = $('<iframe class="markItUpPreviewFrame"></iframe>'), "after" == options.previewPosition ? iFrame.insertAfter(footer) : iFrame.insertBefore(header), previewWindow = iFrame[iFrame.length - 1].contentWindow || frame[iFrame.length - 1]) : altKey === !0 && (iFrame ? iFrame.remove() : previewWindow.close(), previewWindow = iFrame = !1), options.previewAutoRefresh || refreshPreview(), options.previewInWindow && previewWindow.focus()
                }

                function refreshPreview() {
                    renderPreview()
                }

                function renderPreview() {
                    if (options.previewHandler && "function" == typeof options.previewHandler) options.previewHandler($$.val());
                    else if (options.previewParser && "function" == typeof options.previewParser) {
                        var t = options.previewParser($$.val());
                        writeInPreview(localize(t, 1))
                    } else "" !== options.previewParserPath ? $.ajax({
                        type: "POST",
                        dataType: "text",
                        global: !1,
                        url: options.previewParserPath,
                        data: options.previewParserVar + "=" + encodeURIComponent($$.val()),
                        success: function(t) {
                            writeInPreview(localize(t, 1))
                        }
                    }) : template || $.ajax({
                        url: options.previewTemplatePath,
                        dataType: "text",
                        global: !1,
                        success: function(t) {
                            writeInPreview(localize(t, 1).replace(/<!-- content -->/g, $$.val()))
                        }
                    });
                    return !1
                }

                function writeInPreview(t) {
                    if (options.previewInElement) $(options.previewInElement).html(t);
                    else if (previewWindow && previewWindow.document) {
                        try {
                            sp = previewWindow.document.documentElement.scrollTop
                        } catch (e) {
                            sp = 0
                        }
                        previewWindow.document.open(), previewWindow.document.write(t), previewWindow.document.close(), previewWindow.document.documentElement.scrollTop = sp
                    }
                }

                function keyPressed(t) {
                    if (shiftKey = t.shiftKey, altKey = t.altKey, ctrlKey = t.altKey && t.ctrlKey ? !1 : t.ctrlKey || t.metaKey, "keydown" === t.type) {
                        if (ctrlKey === !0 && (li = $('a[accesskey="' + (13 == t.keyCode ? "\\n" : String.fromCharCode(t.keyCode)) + '"]', header).parent("li"), 0 !== li.length)) return ctrlKey = !1, setTimeout(function() {
                            li.triggerHandler("mouseup")
                        }, 1), !1;
                        if (13 === t.keyCode || 10 === t.keyCode) return ctrlKey === !0 ? (ctrlKey = !1, markup(options.onCtrlEnter), options.onCtrlEnter.keepDefault) : shiftKey === !0 ? (shiftKey = !1, markup(options.onShiftEnter), options.onShiftEnter.keepDefault) : (markup(options.onEnter), options.onEnter.keepDefault);
                        if (9 === t.keyCode) return 1 == shiftKey || 1 == ctrlKey || 1 == altKey ? !1 : -1 !== caretOffset ? (get(), caretOffset = $$.val().length - caretOffset, set(caretOffset, 0), caretOffset = -1, !1) : (markup(options.onTab), options.onTab.keepDefault)
                    }
                }

                function remove() {
                    $$.unbind(".markItUp").removeClass("markItUpEditor"), $$.parent("div").parent("div.markItUp").parent("div").replaceWith($$), $$.data("markItUp", null)
                }
                var $$, textarea, levels, scrollPosition, caretPosition, caretOffset, clicked, hash, header, footer, previewWindow, template, iFrame, abort;
                if ($$ = $(this), textarea = this, levels = [], abort = !1, scrollPosition = caretPosition = 0, caretOffset = -1, options.previewParserPath = localize(options.previewParserPath), options.previewTemplatePath = localize(options.previewTemplatePath), method) switch (method) {
                    case "remove":
                        remove();
                        break;
                    case "insert":
                        markup(params);
                        break;
                    default:
                        $.error("Method " + method + " does not exist on jQuery.markItUp")
                } else init()
            })
        }, $.fn.markItUpRemove = function() {
            return this.each(function() {
                $(this).markItUp("remove")
            })
        }, $.markItUp = function(t) {
            var e = {
                target: !1
            };
            return $.extend(e, t), e.target ? $(e.target).each(function() {
                $(this).focus(), $(this).trigger("insertion", [e])
            }) : ($("textarea").trigger("insertion", [e]), void 0)
        }
    }(jQuery);
var openPictureDialog = function(t) {
    var e = $(t.textarea).prev(".markItUpHeader").find(".picture_dialog");
    if (0 === e.length) {
        var n = function(e) {
                $(t.textarea).insertAtCaret("[img=" + e + "][/img]")
            },
            i = $('<div class="picture_dialog"></div>');
        i.append('<input name="close" class="thickbox_close picture_dialog_close" type="button" />');
        var o = $('<div class="publish"><label><a href="#" id="local-upload">本地上传</a><span style="font-weight:normal"> 或 </span><a href="#" id="remote-upload">网络上传</a> </label><input type="file" class="file_input" name="file" /><input type="text" class="text" name="url" value="http://" /><a href="#upload" class="btn_1 submit"><span>上传</span></a><p><small style="font-weight: normal;">(最大2MB，JPG、JPEG、GIF或PNG文件)</small></p></div>'),
            a = o.find("#local-upload"),
            r = o.find("#remote-upload"),
            s = o.find('input[type="file"][name="file"]'),
            l = o.find('input[type="text"][name="url"]'),
            c = "#306ab3",
            u = "#000";
        r.css("font-weight", "normal"), r.css("color", c), l.hide(), a.on("click", function(t) {
            t.preventDefault(), $(this).css("font-weight", "bold"), $(this).css("color", u), r.css("font-weight", "normal"), r.css("color", c), s.show(), l.hide()
        }), r.on("click", function(t) {
            t.preventDefault(), $(this).css("font-weight", "bold"), $(this).css("color", u), a.css("font-weight", "normal"), a.css("color", c), s.hide(), l.show()
        }), upload_submit = o.find(".submit"), upload_submit.click(function(t) {
            if (t.preventDefault(), "" === CSDN.getUserName()) return alert("请先登录"), void 0;
            if (!upload_submit.data("uploading")) {
                var e = $(this).closest("form"),
                    a = '<img src="/assets/icon_loading.gif" class="icon_loading" />';
                upload_submit.after(a), upload_submit.data("uploading", !0);
                var r = e.find('input[type="hidden"][name="_method"]');
                r.attr("disabled", !0), e.ajaxSubmit({
                    url: "/upload_picture",
                    type: "post",
                    dataType: "json",
                    success: function(t) {
                        t.url ? (n(t.url), i.hide(), s.val(""), l.val("http://")) : alert("上传失败：" + t.msg), o.find(".icon_loading").remove(), upload_submit.data("uploading", !1)
                    },
                    error: function(t) {
                        data = $.parseJSON(t.responseText), o.find(".icon_loading").remove(), upload_submit.data("uploading", !1), alert("上传失败：" + data.msg)
                    }
                }), r.attr("disabled", !1)
            }
        }), i.append(o), i.appendTo($(t.textarea).prev(".markItUpHeader")), $(t.textarea).on("click", function() {
            i.hide()
        }), $(".picture_dialog_close", i).on("click", function() {
            i.hide()
        })
    } else e.toggle()
};
for (bbcodeSettings = {
        previewParserPath: "",
        markupSet: [{
            name: "粗体",
            openWith: "[b]",
            closeWith: "[/b]",
            className: "bbtn_bold"
        }, {
            name: "斜体",
            openWith: "[i]",
            closeWith: "[/i]",
            className: "bbtn_italic"
        }, {
            name: "下划线",
            openWith: "[u]",
            closeWith: "[/u]",
            className: "bbtn_underline"
        }, {
            separator: "---------------"
        }, {
            name: "字体大小",
            openWith: "[size=[![Text size]!]]",
            closeWith: "[/size]",
            className: "bbtn_size not_prompt",
            dropMenu: [{
                name: "12px",
                openWith: "[size=12px]",
                closeWith: "[/size]",
                className: "col1-1"
            }, {
                name: "13px",
                openWith: "[size=13px]",
                closeWith: "[/size]",
                className: "col1-2"
            }, {
                name: "14px",
                openWith: "[size=14px]",
                closeWith: "[/size]",
                className: "col1-3"
            }, {
                name: "16px",
                openWith: "[size=16px]",
                closeWith: "[/size]",
                className: "col2-1"
            }, {
                name: "18px",
                openWith: "[size=18px]",
                closeWith: "[/size]",
                className: "col2-2"
            }, {
                name: "24px",
                openWith: "[size=24px]",
                closeWith: "[/size]",
                className: "col2-3"
            }]
        }, {
            name: "字体颜色",
            openWith: "[color=[![Color]!]]",
            closeWith: "[/color]",
            className: "bbtn_color not_prompt",
            dropMenu: [{
                name: "黑色",
                openWith: "[color=#000000]",
                closeWith: "[/color]",
                className: "col1-1"
            }, {
                name: "褐色",
                openWith: "[color=#993300]",
                closeWith: "[/color]",
                className: "col1-2"
            }, {
                name: "橄榄色",
                openWith: "[color=#333300]",
                closeWith: "[/color]",
                className: "col1-3"
            }, {
                name: "深绿",
                openWith: "[color=#003300]",
                closeWith: "[/color]",
                className: "col1-4"
            }, {
                name: "深青",
                openWith: "[color=#003366]",
                closeWith: "[/color]",
                className: "col1-5"
            }, {
                name: "深蓝",
                openWith: "[color=#000080]",
                closeWith: "[/color]",
                className: "col1-6"
            }, {
                name: "靛蓝",
                openWith: "[color=#333399]",
                closeWith: "[/color]",
                className: "col1-7"
            }, {
                name: "灰色-80%",
                openWith: "[color=#333333]",
                closeWith: "[/color]",
                className: "col1-8"
            }, {
                name: "深红",
                openWith: "[color=#800000]",
                closeWith: "[/color]",
                className: "col2-1"
            }, {
                name: "橙色",
                openWith: "[color=#FF6600]",
                closeWith: "[/color]",
                className: "col2-2"
            }, {
                name: "深黄",
                openWith: "[color=#808000]",
                closeWith: "[/color]",
                className: "col2-3"
            }, {
                name: "绿色",
                openWith: "[color=#008000]",
                closeWith: "[/color]",
                className: "col2-4"
            }, {
                name: "绿色",
                openWith: "[color=#008080]",
                closeWith: "[/color]",
                className: "col2-5"
            }, {
                name: "蓝色",
                openWith: "[color=#0000FF]",
                closeWith: "[/color]",
                className: "col2-6"
            }, {
                name: "蓝-灰",
                openWith: "[color=#666699]",
                closeWith: "[/color]",
                className: "col2-7"
            }, {
                name: "灰色-50%",
                openWith: "[color=#808080]",
                closeWith: "[/color]",
                className: "col2-8"
            }, {
                name: "红色",
                openWith: "[color=#FF0000]",
                closeWith: "[/color]",
                className: "col3-1"
            }, {
                name: "浅橙",
                openWith: "[color=#FF9900]",
                closeWith: "[/color]",
                className: "col3-2"
            }, {
                name: "酸橙",
                openWith: "[color=#99CC00]",
                closeWith: "[/color]",
                className: "col3-3"
            }, {
                name: "海绿",
                openWith: "[color=#339966]",
                closeWith: "[/color]",
                className: "col3-4"
            }, {
                name: "水绿色",
                openWith: "[color=#33CCCC]",
                closeWith: "[/color]",
                className: "col3-5"
            }, {
                name: "浅蓝",
                openWith: "[color=#3366FF]",
                closeWith: "[/color]",
                className: "col3-6"
            }, {
                name: "紫罗兰",
                openWith: "[color=#800080]",
                closeWith: "[/color]",
                className: "col3-7"
            }, {
                name: "灰色-40%",
                openWith: "[color=#999999]",
                closeWith: "[/color]",
                className: "col3-8"
            }, {
                name: "粉红",
                openWith: "[color=#FF00FF]",
                closeWith: "[/color]",
                className: "col4-1"
            }, {
                name: "金色",
                openWith: "[color=#FFCC00]",
                closeWith: "[/color]",
                className: "col4-2"
            }, {
                name: "黄色",
                openWith: "[color=#FFFF00]",
                closeWith: "[/color]",
                className: "col4-3"
            }, {
                name: "鲜绿",
                openWith: "[color=#00FF00]",
                closeWith: "[/color]",
                className: "col4-4"
            }, {
                name: "青绿",
                openWith: "[color=#00FFFF]",
                closeWith: "[/color]",
                className: "col4-5"
            }, {
                name: "天蓝",
                openWith: "[color=#00CCFF]",
                closeWith: "[/color]",
                className: "col4-6"
            }, {
                name: "梅红",
                openWith: "[color=#993366]",
                closeWith: "[/color]",
                className: "col4-7"
            }, {
                name: "灰色-25%",
                openWith: "[color=#C0C0C0]",
                closeWith: "[/color]",
                className: "col4-8"
            }, {
                name: "玖瑰红",
                openWith: "[color=#FF99CC]",
                closeWith: "[/color]",
                className: "col5-1"
            }, {
                name: "茶色",
                openWith: "[color=#FFCC99]",
                closeWith: "[/color]",
                className: "col5-2"
            }, {
                name: "浅黄",
                openWith: "[color=#FFFF99]",
                closeWith: "[/color]",
                className: "col5-3"
            }, {
                name: "浅绿",
                openWith: "[color=#CCFFCC]",
                closeWith: "[/color]",
                className: "col5-4"
            }, {
                name: "浅青绿",
                openWith: "[color=#CCFFFF]",
                closeWith: "[/color]",
                className: "col5-5"
            }, {
                name: "淡蓝",
                openWith: "[color=#99CCFF]",
                closeWith: "[/color]",
                className: "col5-6"
            }, {
                name: "淡紫",
                openWith: "[color=#CC99FF]",
                closeWith: "[/color]",
                className: "col5-7"
            }, {
                name: "白色",
                openWith: "[color=#FFFFFF]",
                closeWith: "[/color]",
                className: "col5-8"
            }]
        }, {
            separator: "---------------"
        }, {
            name: "图片",
            beforeInsert: openPictureDialog,
            className: "picture bbtn_picture"
        }, {
            name: "链接",
            openWith: link_open_with,
            closeWith: link_close_with,
            placeHolder: "",
            className: "bbtn_link"
        }, {
            separator: "---------------"
        }, {
            name: "左对齐",
            openWith: "[align=left]",
            closeWith: "[/align]",
            className: "bbtn_align_left"
        }, {
            name: "居中对齐",
            openWith: "[align=center]",
            closeWith: "[/align]",
            className: "bbtn_align_center"
        }, {
            name: "右对齐",
            openWith: "[align=right]",
            closeWith: "[/align]",
            className: "bbtn_align_right"
        }, {
            separator: "---------------"
        }, {
            name: "引用",
            openWith: "[quote]",
            closeWith: "[/quote]",
            className: "bbtn_quotes"
        }, {
            name: "代码",
            openWith: "[code=[![Code lang]!]]",
            closeWith: "[/code]",
            className: "bbtn_code not_prompt",
            dropMenu: [{
                name: "C#",
                openWith: "[code=csharp]",
                closeWith: "[/code]"
            }, {
                name: "C/C++",
                openWith: "[code=c]",
                closeWith: "[/code]"
            }, {
                name: "CSS",
                openWith: "[code=css]",
                closeWith: "[/code]"
            }, {
                name: "Delphi/Pascal",
                openWith: "[code=delphi]",
                closeWith: "[/code]"
            }, {
                name: "JavaScript",
                openWith: "[code=javascript]",
                closeWith: "[/code]"
            }, {
                name: "Java",
                openWith: "[code=java]",
                closeWith: "[/code]"
            }, {
                name: "Objective C",
                openWith: "[code=objc]",
                closeWith: "[/code]"
            }, {
                name: "Perl",
                openWith: "[code=perl]",
                closeWith: "[/code]"
            }, {
                name: "PHP",
                openWith: "[code=php]",
                closeWith: "[/code]"
            }, {
                name: "Python",
                openWith: "[code=python]",
                closeWith: "[/code]"
            }, {
                name: "Ruby",
                openWith: "[code=ruby]",
                closeWith: "[/code]"
            }, {
                name: "SQL",
                openWith: "[code=sql]",
                closeWith: "[/code]"
            }, {
                name: "Visual Basic",
                openWith: "[code=vb]",
                closeWith: "[/code]"
            }, {
                name: "HTML",
                openWith: "[code=html]",
                closeWith: "[/code]"
            }, {
                name: "其他",
                openWith: "[code=text]",
                closeWith: "[/code]"
            }]
        }]
    }, bbcodeSettings.markupSet.push({
        separator: "---------------"
    }), qqMarkupSet = {
        name: "QQ",
        className: "emoticons emoticons_qq",
        dropMenu: []
    }, i = 1; 134 >= i; i++) {
    var url = "http://forum.csdn.net/PointForum/ui/scripts/csdn/Plugin/001/face/" + i + ".gif";
    qqMarkupSet.dropMenu.push({
        replaceWith: "[img=" + url + "][/img]",
        className: "emoticon emoticon_qq_" + i
    })
}
for (bbcodeSettings.markupSet.push(qqMarkupSet), monkeyMarkupSet = {
        name: "monkey",
        className: "emoticons emoticons_monkey",
        dropMenu: []
    }, i = 1; 51 >= i; i++) {
    var url = "http://forum.csdn.net/PointForum/ui/scripts/csdn/Plugin/003/monkey/" + i + ".gif";
    monkeyMarkupSet.dropMenu.push({
        replaceWith: "[img=" + url + "][/img]",
        className: "emoticon emoticon_monkey_" + i
    })
}
for (bbcodeSettings.markupSet.push(monkeyMarkupSet), onionMarkupSet = {
        name: "onion",
        className: "emoticons emoticons_onion",
        dropMenu: []
    }, i = 1; 86 >= i; i++) {
    var url = "http://forum.csdn.net/PointForum/ui/scripts/csdn/Plugin/003/onion/" + i + ".gif";
    onionMarkupSet.dropMenu.push({
        replaceWith: "[img=" + url + "][/img]",
        className: "emoticon emoticon_onion_" + i
    })
}
bbcodeSettings.markupSet.push(onionMarkupSet), bbcodeSettings.markupSet.push({
        separator: "---------------"
    }), bbcodeSettings.markupSet.push({
        name: "押宝",
        openWith: yabao_input,
        className: "bbtn_yabao"
    }), bbcodeSettings.markupSet.push({
        separator: "---------------"
    }), bbcodeSettings.markupSet.push({
        name: "清除格式",
        replaceWith: function(t) {
            return t.selection.replace(/\[(.*?)\]/g, "")
        },
        className: "clean bbtn_clean"
    }),
    /**
     * jQuery Validation Plugin @VERSION
     *
     * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
     * http://docs.jquery.com/Plugins/Validation
     *
     * Copyright (c) 2012 Jörn Zaefferer
     *
     * Dual licensed under the MIT and GPL licenses:
     *   http://www.opensource.org/licenses/mit-license.php
     *   http://www.gnu.org/licenses/gpl.html
     */
    function(t) {
        t.extend(t.fn, {
            validate: function(e) {
                if (!this.length) return e && e.debug && window.console && console.warn("nothing selected, can't validate, returning nothing"), void 0;
                var n = t.data(this[0], "validator");
                return n ? n : (this.attr("novalidate", "novalidate"), n = new t.validator(e, this[0]), t.data(this[0], "validator", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                    n.settings.submitHandler && (n.submitButton = e.target), t(e.target).hasClass("cancel") && (n.cancelSubmit = !0)
                }), this.submit(function(e) {
                    function i() {
                        var i;
                        return n.settings.submitHandler ? (n.submitButton && (i = t("<input type='hidden'/>").attr("name", n.submitButton.name).val(n.submitButton.value).appendTo(n.currentForm)), n.settings.submitHandler.call(n, n.currentForm, e), n.submitButton && i.remove(), !1) : !0
                    }
                    return n.settings.debug && e.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, i()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : i() : (n.focusInvalid(), !1)
                })), n)
            },
            valid: function() {
                if (t(this[0]).is("form")) return this.validate().form();
                var e = !0,
                    n = t(this[0].form).validate();
                return this.each(function() {
                    e &= n.element(this)
                }), e
            },
            removeAttrs: function(e) {
                var n = {},
                    i = this;
                return t.each(e.split(/\s/), function(t, e) {
                    n[e] = i.attr(e), i.removeAttr(e)
                }), n
            },
            rules: function(e, n) {
                var i = this[0];
                if (e) {
                    var o = t.data(i.form, "validator").settings,
                        a = o.rules,
                        r = t.validator.staticRules(i);
                    switch (e) {
                        case "add":
                            t.extend(r, t.validator.normalizeRule(n)), a[i.name] = r, n.messages && (o.messages[i.name] = t.extend(o.messages[i.name], n.messages));
                            break;
                        case "remove":
                            if (!n) return delete a[i.name], r;
                            var s = {};
                            return t.each(n.split(/\s/), function(t, e) {
                                s[e] = r[e], delete r[e]
                            }), s
                    }
                }
                var l = t.validator.normalizeRules(t.extend({}, t.validator.metadataRules(i), t.validator.classRules(i), t.validator.attributeRules(i), t.validator.staticRules(i)), i);
                if (l.required) {
                    var c = l.required;
                    delete l.required, l = t.extend({
                        required: c
                    }, l)
                }
                return l
            }
        }), t.extend(t.expr[":"], {
            blank: function(e) {
                return !t.trim("" + e.value)
            },
            filled: function(e) {
                return !!t.trim("" + e.value)
            },
            unchecked: function(t) {
                return !t.checked
            }
        }), t.validator = function(e, n) {
            this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = n, this.init()
        }, t.validator.format = function(e, n) {
            return 1 === arguments.length ? function() {
                var n = t.makeArray(arguments);
                return n.unshift(e), t.validator.format.apply(this, n)
            } : (arguments.length > 2 && n.constructor !== Array && (n = t.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), t.each(n, function(t, n) {
                e = e.replace(new RegExp("\\{" + t + "\\}", "g"), n)
            }), e)
        }, t.extend(t.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: t([]),
                errorLabelContainer: t([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function(t) {
                    this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
                },
                onfocusout: function(t) {
                    this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
                },
                onkeyup: function(t, e) {
                    (9 != e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastActive) && this.element(t)
                },
                onclick: function(t) {
                    t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
                },
                highlight: function(e, n, i) {
                    "radio" === e.type ? this.findByName(e.name).addClass(n).removeClass(i) : t(e).addClass(n).removeClass(i)
                },
                unhighlight: function(e, n, i) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(n).addClass(i) : t(e).removeClass(n).addClass(i)
                }
            },
            setDefaults: function(e) {
                t.extend(t.validator.defaults, e)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: t.validator.format("Please enter no more than {0} characters."),
                minlength: t.validator.format("Please enter at least {0} characters."),
                rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                range: t.validator.format("Please enter a value between {0} and {1}."),
                max: t.validator.format("Please enter a value less than or equal to {0}."),
                min: t.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    function e(e) {
                        var n = t.data(this[0].form, "validator"),
                            i = "on" + e.type.replace(/^validate/, "");
                        n.settings[i] && n.settings[i].call(n, this[0], e)
                    }
                    this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var n = this.groups = {};
                    t.each(this.settings.groups, function(e, i) {
                        t.each(i.split(/\s/), function(t, i) {
                            n[i] = e
                        })
                    });
                    var i = this.settings.rules;
                    t.each(i, function(e, n) {
                        i[e] = t.validator.normalizeRule(n)
                    }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function() {
                    return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                    return this.valid()
                },
                element: function(e) {
                    e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                    var n = this.check(e) !== !1;
                    return n ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n
                },
                showErrors: function(e) {
                    if (e) {
                        t.extend(this.errorMap, e), this.errorList = [];
                        for (var n in e) this.errorList.push({
                            message: e[n],
                            element: this.findByName(n)[0]
                        });
                        this.successList = t.grep(this.successList, function(t) {
                            return !(t.name in e)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(t) {
                    var e = 0;
                    for (var n in t) e++;
                    return e
                },
                hideErrors: function() {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (e) {}
                },
                findLastActive: function() {
                    var e = this.lastActive;
                    return e && 1 === t.grep(this.errorList, function(t) {
                        return t.element.name === e.name
                    }).length && e
                },
                elements: function() {
                    var e = this,
                        n = {};
                    return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in n || !e.objectLength(t(this).rules()) ? !1 : (n[this.name] = !0, !0)
                    })
                },
                clean: function(e) {
                    return t(e)[0]
                },
                errors: function() {
                    var e = this.settings.errorClass.replace(" ", ".");
                    return t(this.settings.errorElement + "." + e, this.errorContext)
                },
                reset: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(t) {
                    this.reset(), this.toHide = this.errorsFor(t)
                },
                elementValue: function(e) {
                    var n = t(e).attr("type"),
                        i = t(e).val();
                    return "radio" === n || "checkbox" === n ? t('input[name="' + t(e).attr("name") + '"]:checked').val() : "string" == typeof i ? i.replace(/\r/g, "") : i
                },
                check: function(e) {
                    e = this.validationTargetFor(this.clean(e));
                    var n, i = t(e).rules(),
                        o = !1,
                        a = this.elementValue(e);
                    for (var r in i) {
                        var s = {
                            method: r,
                            parameters: i[r]
                        };
                        try {
                            if (n = t.validator.methods[r].call(this, a, e, s.parameters), "dependency-mismatch" === n) {
                                o = !0;
                                continue
                            }
                            if (o = !1, "pending" === n) return this.toHide = this.toHide.not(this.errorsFor(e)), void 0;
                            if (!n) return this.formatAndAdd(e, s), !1
                        } catch (l) {
                            throw this.settings.debug && window.console && console.log("exception occured when checking element " + e.id + ", check the '" + s.method + "' method", l), l
                        }
                    }
                    return o ? void 0 : (this.objectLength(i) && this.successList.push(e), !0)
                },
                customMetaMessage: function(e, n) {
                    if (t.metadata) {
                        var i = this.settings.meta ? t(e).metadata()[this.settings.meta] : t(e).metadata();
                        return i && i.messages && i.messages[n]
                    }
                },
                customDataMessage: function(e, n) {
                    return t(e).data("msg-" + n.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + n.toLowerCase())
                },
                customMessage: function(t, e) {
                    var n = this.settings.messages[t];
                    return n && (n.constructor === String ? n : n[e])
                },
                findDefined: function() {
                    for (var t = 0; t < arguments.length; t++)
                        if (void 0 !== arguments[t]) return arguments[t];
                    return void 0
                },
                defaultMessage: function(e, n) {
                    return this.findDefined(this.customMessage(e.name, n), this.customDataMessage(e, n), this.customMetaMessage(e, n), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[n], "<strong>Warning: No message defined for " + e.name + "</strong>")
                },
                formatAndAdd: function(e, n) {
                    var i = this.defaultMessage(e, n.method),
                        o = /\$?\{(\d+)\}/g;
                    "function" == typeof i ? i = i.call(this, n.parameters, e) : o.test(i) && (i = t.validator.format(i.replace(o, "{$1}"), n.parameters)), this.errorList.push({
                        message: i,
                        element: e
                    }), this.errorMap[e.name] = i, this.submitted[e.name] = i
                },
                addWrapper: function(t) {
                    return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
                },
                defaultShowErrors: function() {
                    var t, e;
                    for (t = 0; this.errorList[t]; t++) {
                        var n = this.errorList[t];
                        this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message)
                    }
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                    if (this.settings.unhighlight)
                        for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return t(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(e, n) {
                    var i = this.errorsFor(e);
                    i.length ? (i.removeClass(this.settings.validClass).addClass(this.settings.errorClass), i.attr("generated") && i.html(n)) : (i = t("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(e),
                        generated: !0
                    }).addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, t(e)) : i.insertAfter(e))), !n && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) : this.settings.success(i, e)), this.toShow = this.toShow.add(i)
                },
                errorsFor: function(e) {
                    var n = this.idOrName(e);
                    return this.errors().filter(function() {
                        return t(this).attr("for") === n
                    })
                },
                idOrName: function(t) {
                    return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
                },
                validationTargetFor: function(t) {
                    return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
                },
                checkable: function(t) {
                    return /radio|checkbox/i.test(t.type)
                },
                findByName: function(e) {
                    return t(this.currentForm).find('[name="' + e + '"]')
                },
                getLength: function(e, n) {
                    switch (n.nodeName.toLowerCase()) {
                        case "select":
                            return t("option:selected", n).length;
                        case "input":
                            if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                    }
                    return e.length
                },
                depend: function(t, e) {
                    return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
                },
                dependTypes: {
                    "boolean": function(t) {
                        return t
                    },
                    string: function(e, n) {
                        return !!t(e, n.form).length
                    },
                    "function": function(t, e) {
                        return t(e)
                    }
                },
                optional: function(e) {
                    var n = this.elementValue(e);
                    return !t.validator.methods.required.call(this, n, e) && "dependency-mismatch"
                },
                startRequest: function(t) {
                    this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
                },
                stopRequest: function(e, n) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !n && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function(e) {
                    return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(e, n) {
                e.constructor === String ? this.classRuleSettings[e] = n : t.extend(this.classRuleSettings, e)
            },
            classRules: function(e) {
                var n = {},
                    i = t(e).attr("class");
                return i && t.each(i.split(" "), function() {
                    this in t.validator.classRuleSettings && t.extend(n, t.validator.classRuleSettings[this])
                }), n
            },
            attributeRules: function(e) {
                var n = {},
                    i = t(e);
                for (var o in t.validator.methods) {
                    var a;
                    "required" === o ? (a = i.get(0).getAttribute(o), "" === a && (a = !0), a = !!a) : a = i.attr(o), a ? n[o] = a : i[0].getAttribute("type") === o && (n[o] = !0)
                }
                return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength, n
            },
            metadataRules: function(e) {
                if (!t.metadata) return {};
                var n = t.data(e.form, "validator").settings.meta;
                return n ? t(e).metadata()[n] : t(e).metadata()
            },
            staticRules: function(e) {
                var n = {},
                    i = t.data(e.form, "validator");
                return i.settings.rules && (n = t.validator.normalizeRule(i.settings.rules[e.name]) || {}), n
            },
            normalizeRules: function(e, n) {
                return t.each(e, function(i, o) {
                    if (o === !1) return delete e[i], void 0;
                    if (o.param || o.depends) {
                        var a = !0;
                        switch (typeof o.depends) {
                            case "string":
                                a = !!t(o.depends, n.form).length;
                                break;
                            case "function":
                                a = o.depends.call(n, n)
                        }
                        a ? e[i] = void 0 !== o.param ? o.param : !0 : delete e[i]
                    }
                }), t.each(e, function(i, o) {
                    e[i] = t.isFunction(o) ? o(n) : o
                }), t.each(["minlength", "maxlength", "min", "max"], function() {
                    e[this] && (e[this] = Number(e[this]))
                }), t.each(["rangelength", "range"], function() {
                    e[this] && (e[this] = [Number(e[this][0]), Number(e[this][1])])
                }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e.messages && delete e.messages, e
            },
            normalizeRule: function(e) {
                if ("string" == typeof e) {
                    var n = {};
                    t.each(e.split(/\s/), function() {
                        n[this] = !0
                    }), e = n
                }
                return e
            },
            addMethod: function(e, n, i) {
                t.validator.methods[e] = n, t.validator.messages[e] = void 0 !== i ? i : t.validator.messages[e], n.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
            },
            methods: {
                required: function(e, n, i) {
                    if (!this.depend(i, n)) return "dependency-mismatch";
                    if ("select" === n.nodeName.toLowerCase()) {
                        var o = t(n).val();
                        return o && o.length > 0
                    }
                    return this.checkable(n) ? this.getLength(e, n) > 0 : t.trim(e).length > 0
                },
                remote: function(e, n, i) {
                    if (this.optional(n)) return "dependency-mismatch";
                    var o = this.previousValue(n);
                    if (this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), o.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = o.message, i = "string" == typeof i && {
                            url: i
                        } || i, this.pending[n.name]) return "pending";
                    if (o.old === e) return o.valid;
                    o.old = e;
                    var a = this;
                    this.startRequest(n);
                    var r = {};
                    return r[n.name] = e, t.ajax(t.extend(!0, {
                        url: i,
                        mode: "abort",
                        port: "validate" + n.name,
                        dataType: "json",
                        data: r,
                        success: function(i) {
                            a.settings.messages[n.name].remote = o.originalMessage;
                            var r = i === !0 || "true" === i;
                            if (r) {
                                var s = a.formSubmitted;
                                a.prepareElement(n), a.formSubmitted = s, a.successList.push(n), delete a.invalid[n.name], a.showErrors()
                            } else {
                                var l = {},
                                    c = i || a.defaultMessage(n, "remote");
                                l[n.name] = o.message = t.isFunction(c) ? c(e) : c, a.invalid[n.name] = !0, a.showErrors(l)
                            }
                            o.valid = r, a.stopRequest(n, r)
                        }
                    }, i)), "pending"
                },
                minlength: function(e, n, i) {
                    var o = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || o >= i
                },
                maxlength: function(e, n, i) {
                    var o = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || i >= o
                },
                rangelength: function(e, n, i) {
                    var o = t.isArray(e) ? e.length : this.getLength(t.trim(e), n);
                    return this.optional(n) || o >= i[0] && o <= i[1]
                },
                min: function(t, e, n) {
                    return this.optional(e) || t >= n
                },
                max: function(t, e, n) {
                    return this.optional(e) || n >= t
                },
                range: function(t, e, n) {
                    return this.optional(e) || t >= n[0] && t <= n[1]
                },
                email: function(t, e) {
                    return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
                },
                url: function(t, e) {
                    return this.optional(e) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
                },
                date: function(t, e) {
                    return this.optional(e) || !/Invalid|NaN/.test(new Date(t))
                },
                dateISO: function(t, e) {
                    return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
                },
                number: function(t, e) {
                    return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                },
                digits: function(t, e) {
                    return this.optional(e) || /^\d+$/.test(t)
                },
                creditcard: function(t, e) {
                    if (this.optional(e)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(t)) return !1;
                    var n = 0,
                        i = 0,
                        o = !1;
                    t = t.replace(/\D/g, "");
                    for (var a = t.length - 1; a >= 0; a--) {
                        var r = t.charAt(a);
                        i = parseInt(r, 10), o && (i *= 2) > 9 && (i -= 9), n += i, o = !o
                    }
                    return 0 === n % 10
                },
                equalTo: function(e, n, i) {
                    var o = t(i);
                    return this.settings.onfocusout && o.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        t(n).valid()
                    }), e === o.val()
                }
            }
        }), t.format = t.validator.format
    }(jQuery),
    function(t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, n, i) {
            var o = t.port;
            "abort" === t.mode && (e[o] && e[o].abort(), e[o] = i)
        });
        else {
            var n = t.ajax;
            t.ajax = function(i) {
                var o = ("mode" in i ? i : t.ajaxSettings).mode,
                    a = ("port" in i ? i : t.ajaxSettings).port;
                return "abort" === o ? (e[a] && e[a].abort(), e[a] = n.apply(this, arguments)) : n.apply(this, arguments)
            }
        }
    }(jQuery),
    function(t) {
        jQuery.event.special.focusin || jQuery.event.special.focusout || !document.addEventListener || t.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, n) {
            function i(e) {
                return e = t.event.fix(e), e.type = n, t.event.handle.call(this, e)
            }
            t.event.special[n] = {
                setup: function() {
                    this.addEventListener(e, i, !0)
                },
                teardown: function() {
                    this.removeEventListener(e, i, !0)
                },
                handler: function(e) {
                    var i = arguments;
                    return i[0] = t.event.fix(e), i[0].type = n, t.event.handle.apply(this, i)
                }
            }
        }), t.extend(t.fn, {
            validateDelegate: function(e, n, i) {
                return this.bind(n, function(n) {
                    var o = t(n.target);
                    return o.is(e) ? i.apply(o, arguments) : void 0
                })
            }
        })
    }(jQuery),
    function() {
        function t(t) {
            var n = /^\d{15}(\d{2}[0-9X])?$/i;
            if (!n.test(t)) return !1;
            if (15 == t.length) {
                var o = new Date,
                    a = o.getFullYear();
                if (parseInt("19" + t.substr(6, 2)) < 1900 || parseInt("19" + t.substr(6, 2)) > a) return !1;
                var r = "19" + t.substr(6, 2) + "-" + t.substr(8, 2) + "-" + t.substr(10, 2);
                if (!e(r)) return !1
            }
            if (18 == t.length) {
                var o = new Date,
                    a = o.getFullYear();
                if (parseInt(t.substr(6, 4)) < 1900 || parseInt(t.substr(6, 4)) > a) return !1;
                var r = t.substr(6, 4) + "-" + t.substr(10, 2) + "-" + t.substr(12, 2);
                if (!e(r)) return !1;
                for (iW = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1), iSum = 0, i = 0; 17 > i; i++) iC = t.charAt(i), iVal = parseInt(iC), iSum += iVal * iW[i];
                iJYM = iSum % 11, 0 == iJYM ? sJYM = "1" : 1 == iJYM ? sJYM = "0" : 2 == iJYM ? sJYM = "x" : 3 == iJYM ? sJYM = "9" : 4 == iJYM ? sJYM = "8" : 5 == iJYM ? sJYM = "7" : 6 == iJYM ? sJYM = "6" : 7 == iJYM ? sJYM = "5" : 8 == iJYM ? sJYM = "4" : 9 == iJYM ? sJYM = "3" : 10 == iJYM && (sJYM = "2");
                var s = t.charAt(17).toLowerCase();
                if (s != sJYM) return !1
            }
            try {
                var l = t.substr(0, 2);
                return "11" == l || "12" == l || "13" == l || "14" == l || "15" == l || "21" == l || "22" == l || "23" == l || "31" == l || "32" == l || "33" == l || "34" == l || "35" == l || "36" == l || "37" == l || "41" == l || "42" == l || "43" == l || "44" == l || "45" == l || "46" == l || "50" == l || "51" == l || "52" == l || "53" == l || "54" == l || "61" == l || "62" == l || "63" == l || "64" == l || "65" == l || "71" == l || "82" == l || "82" == l
            } catch (c) {}
            return !0
        }

        function e(t) {
            var e, n, i, o, a, r = "-";
            if (e = t.split(r), 3 != e.length) return !1;
            if (n = parseInt(e[0], 10), i = parseInt(e[1], 10), o = parseInt(e[2], 10), isNaN(n) || isNaN(i) || isNaN(o)) return !1;
            if (i > 12 || 1 > i) return !1;
            if ((1 == i || 3 == i || 5 == i || 7 == i || 8 == i || 10 == i || 12 == i) && (o > 31 || 1 > o)) return !1;
            if ((4 == i || 6 == i || 9 == i || 11 == i) && (o > 30 || 1 > o)) return !1;
            if (2 == i) {
                if (1 > o) return !1;
                if (a = !1, 0 == n % 100 ? 0 == n % 400 && (a = !0) : 0 == n % 4 && (a = !0), a) {
                    if (o > 29) return !1
                } else if (o > 28) return !1
            }
            return !0
        }
        jQuery.validator.addMethod("idCard", function(e, n) {
            return this.optional(n) || t(e)
        }, "请输入合法的身份证号");
        var n = $.extend({}, jQuery.validator.defaults);
        jQuery.extend(jQuery.validator.defaults, {
            onfocusout: function() {
                this.numberOfInvalids() > 0 && n.onfocusout.apply(this, arguments)
            },
            onkeyup: function() {
                this.numberOfInvalids() > 0 && n.onfocusout.apply(this, arguments)
            },
            onclick: function() {
                this.numberOfInvalids() > 0 && n.onfocusout.apply(this, arguments)
            }
        })
    }(), jQuery.extend(jQuery.validator.messages, {
        required: "必填字段",
        remote: "请修正该字段",
        email: "请输入正确格式的电子邮件",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
        minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
        rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
        min: jQuery.validator.format("请输入一个最小为 {0} 的值")
    }),
    function(t) {
        var e, n, i, o, a, r, s, l, c, u, d, p, f, h = 0,
            m = {},
            g = [],
            v = 0,
            y = {},
            b = [],
            x = null,
            w = new Image,
            _ = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
            $ = /[^\.]\.(swf)\s*$/i,
            k = 1,
            C = 0,
            F = "",
            T = !1,
            S = t.extend(t("<div/>")[0], {
                prop: 0
            }),
            N = t.browser.msie && t.browser.version < 7 && !window.XMLHttpRequest,
            D = function() {
                n.hide(), w.onerror = w.onload = null, x && x.abort(), e.empty()
            },
            E = function() {
                return !1 === m.onError(g, h, m) ? (n.hide(), T = !1, void 0) : (m.titleShow = !1, m.width = "auto", m.height = "auto", e.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'), A(), void 0)
            },
            j = function() {
                var i, o, a, s, l, c, u = g[h];
                if (D(), m = t.extend({}, t.fn.fancybox.defaults, "undefined" == typeof t(u).data("fancybox") ? m : t(u).data("fancybox")), c = m.onStart(g, h, m), c === !1) return T = !1, void 0;
                if ("object" == typeof c && (m = t.extend(m, c)), a = m.title || (u.nodeName ? t(u).attr("title") : u.title) || "", u.nodeName && !m.orig && (m.orig = t(u).children("img:first").length ? t(u).children("img:first") : t(u)), "" === a && m.orig && m.titleFromAlt && (a = m.orig.attr("alt")), i = m.href || (u.nodeName ? t(u).attr("href") : u.href) || null, (/^(?:javascript)/i.test(i) || "#" == i) && (i = null), m.type ? (o = m.type, i || (i = m.content)) : m.content ? o = "html" : i && (o = i.match(_) ? "image" : i.match($) ? "swf" : t(u).hasClass("iframe") ? "iframe" : 0 === i.indexOf("#") ? "inline" : "ajax"), !o) return E(), void 0;
                switch ("inline" == o && (u = i.substr(i.indexOf("#")), o = t(u).length > 0 ? "inline" : "ajax"), m.type = o, m.href = i, m.title = a, m.autoDimensions && ("html" == m.type || "inline" == m.type || "ajax" == m.type ? (m.width = "auto", m.height = "auto") : m.autoDimensions = !1), m.modal && (m.overlayShow = !0, m.hideOnOverlayClick = !1, m.hideOnContentClick = !1, m.enableEscapeButton = !1, m.showCloseButton = !1), m.padding = parseInt(m.padding, 10), m.margin = parseInt(m.margin, 10), e.css("padding", m.padding + m.margin), t(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
                    t(this).replaceWith(r.children())
                }), o) {
                    case "html":
                        e.html(m.content), A();
                        break;
                    case "inline":
                        if (t(u).parent().is("#fancybox-content") === !0) return T = !1, void 0;
                        t('<div class="fancybox-inline-tmp" />').hide().insertBefore(t(u)).bind("fancybox-cleanup", function() {
                            t(this).replaceWith(r.children())
                        }).bind("fancybox-cancel", function() {
                            t(this).replaceWith(e.children())
                        }), t(u).appendTo(e), A();
                        break;
                    case "image":
                        T = !1, t.fancybox.showActivity(), w = new Image, w.onerror = function() {
                            E()
                        }, w.onload = function() {
                            T = !0, w.onerror = w.onload = null, W()
                        }, w.src = i;
                        break;
                    case "swf":
                        m.scrolling = "no", s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + m.width + '" height="' + m.height + '"><param name="movie" value="' + i + '"></param>', l = "", t.each(m.swf, function(t, e) {
                            s += '<param name="' + t + '" value="' + e + '"></param>', l += " " + t + '="' + e + '"'
                        }), s += '<embed src="' + i + '" type="application/x-shockwave-flash" width="' + m.width + '" height="' + m.height + '"' + l + "></embed></object>", e.html(s), A();
                        break;
                    case "ajax":
                        T = !1, t.fancybox.showActivity(), m.ajax.win = m.ajax.success, x = t.ajax(t.extend({}, m.ajax, {
                            url: i,
                            data: m.ajax.data || {},
                            error: function(t) {
                                t.status > 0 && E()
                            },
                            success: function(t, o, a) {
                                var r = "object" == typeof a ? a : x;
                                if (200 == r.status) {
                                    if ("function" == typeof m.ajax.win) {
                                        if (c = m.ajax.win(i, t, o, a), c === !1) return n.hide(), void 0;
                                        ("string" == typeof c || "object" == typeof c) && (t = c)
                                    }
                                    e.html(t), A()
                                }
                            }
                        }));
                        break;
                    case "iframe":
                        I()
                }
            },
            A = function() {
                var n = m.width,
                    i = m.height;
                n = n.toString().indexOf("%") > -1 ? parseInt((t(window).width() - 2 * m.margin) * parseFloat(n) / 100, 10) + "px" : "auto" == n ? "auto" : n + "px", i = i.toString().indexOf("%") > -1 ? parseInt((t(window).height() - 2 * m.margin) * parseFloat(i) / 100, 10) + "px" : "auto" == i ? "auto" : i + "px", e.wrapInner('<div style="width:' + n + ";height:" + i + ";overflow: " + ("auto" == m.scrolling ? "auto" : "yes" == m.scrolling ? "scroll" : "hidden") + ';position:relative;"></div>'), m.width = e.width(), m.height = e.height(), I()
            },
            W = function() {
                m.width = w.width, m.height = w.height, t("<img />").attr({
                    id: "fancybox-img",
                    src: w.src,
                    alt: m.title
                }).appendTo(e), I()
            },
            I = function() {
                var a, d;
                return n.hide(), o.is(":visible") && !1 === y.onCleanup(b, v, y) ? (t.event.trigger("fancybox-cancel"), T = !1, void 0) : (T = !0, t(r.add(i)).unbind(), t(window).unbind("resize.fb scroll.fb"), t(document).unbind("keydown.fb"), o.is(":visible") && "outside" !== y.titlePosition && o.css("height", o.height()), b = g, v = h, y = m, y.overlayShow ? (i.css({
                    "background-color": y.overlayColor,
                    opacity: y.overlayOpacity,
                    cursor: y.hideOnOverlayClick ? "pointer" : "auto",
                    height: t(document).height()
                }), i.is(":visible") || (N && t("select:not(#fancybox-tmp select)").filter(function() {
                    return "hidden" !== this.style.visibility
                }).css({
                    visibility: "hidden"
                }).one("fancybox-cleanup", function() {
                    this.style.visibility = "inherit"
                }), i.show())) : i.hide(), f = R(), P(), o.is(":visible") ? (t(s.add(c).add(u)).hide(), a = o.position(), p = {
                    top: a.top,
                    left: a.left,
                    width: o.width(),
                    height: o.height()
                }, d = p.width == f.width && p.height == f.height, r.fadeTo(y.changeFade, .3, function() {
                    var n = function() {
                        r.html(e.contents()).fadeTo(y.changeFade, 1, O)
                    };
                    t.event.trigger("fancybox-change"), r.empty().removeAttr("filter").css({
                        "border-width": y.padding,
                        width: f.width - 2 * y.padding,
                        height: m.autoDimensions ? "auto" : f.height - C - 2 * y.padding
                    }), d ? n() : (S.prop = 0, t(S).animate({
                        prop: 1
                    }, {
                        duration: y.changeSpeed,
                        easing: y.easingChange,
                        step: B,
                        complete: n
                    }))
                }), void 0) : (o.removeAttr("style"), r.css("border-width", y.padding), "elastic" == y.transitionIn ? (p = U(), r.html(e.contents()), o.show(), y.opacity && (f.opacity = 0), S.prop = 0, t(S).animate({
                    prop: 1
                }, {
                    duration: y.speedIn,
                    easing: y.easingIn,
                    step: B,
                    complete: O
                }), void 0) : ("inside" == y.titlePosition && C > 0 && l.show(), r.css({
                    width: f.width - 2 * y.padding,
                    height: m.autoDimensions ? "auto" : f.height - C - 2 * y.padding
                }).html(e.contents()), o.css(f).fadeIn("none" == y.transitionIn ? 0 : y.speedIn, O), void 0)))
            },
            L = function(t) {
                return t && t.length ? "float" == y.titlePosition ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + t + '</td><td id="fancybox-title-float-right"></td></tr></table>' : '<div id="fancybox-title-' + y.titlePosition + '">' + t + "</div>" : !1
            },
            P = function() {
                if (F = y.title || "", C = 0, l.empty().removeAttr("style").removeClass(), y.titleShow === !1) return l.hide(), void 0;
                if (F = t.isFunction(y.titleFormat) ? y.titleFormat(F, b, v, y) : L(F), !F || "" === F) return l.hide(), void 0;
                switch (l.addClass("fancybox-title-" + y.titlePosition).html(F).appendTo("body").show(), y.titlePosition) {
                    case "inside":
                        l.css({
                            width: f.width - 2 * y.padding,
                            marginLeft: y.padding,
                            marginRight: y.padding
                        }), C = l.outerHeight(!0), l.appendTo(a), f.height += C;
                        break;
                    case "over":
                        l.css({
                            marginLeft: y.padding,
                            width: f.width - 2 * y.padding,
                            bottom: y.padding
                        }).appendTo(a);
                        break;
                    case "float":
                        l.css("left", -1 * parseInt((l.width() - f.width - 40) / 2, 10)).appendTo(o);
                        break;
                    default:
                        l.css({
                            width: f.width - 2 * y.padding,
                            paddingLeft: y.padding,
                            paddingRight: y.padding
                        }).appendTo(o)
                }
                l.hide()
            },
            M = function() {
                return (y.enableEscapeButton || y.enableKeyboardNav) && t(document).bind("keydown.fb", function(e) {
                    27 == e.keyCode && y.enableEscapeButton ? (e.preventDefault(), t.fancybox.close()) : 37 != e.keyCode && 39 != e.keyCode || !y.enableKeyboardNav || "INPUT" === e.target.tagName || "TEXTAREA" === e.target.tagName || "SELECT" === e.target.tagName || (e.preventDefault(), t.fancybox[37 == e.keyCode ? "prev" : "next"]())
                }), y.showNavArrows ? ((y.cyclic && b.length > 1 || 0 !== v) && c.show(), (y.cyclic && b.length > 1 || v != b.length - 1) && u.show(), void 0) : (c.hide(), u.hide(), void 0)
            },
            O = function() {
                t.support.opacity || (r.get(0).style.removeAttribute("filter"), o.get(0).style.removeAttribute("filter")), m.autoDimensions && r.css("height", "auto"), o.css("height", "auto"), F && F.length && l.show(), y.showCloseButton && s.show(), M(), y.hideOnContentClick && r.bind("click", t.fancybox.close), y.hideOnOverlayClick && i.bind("click", t.fancybox.close), t(window).bind("resize.fb", t.fancybox.resize), y.centerOnScroll && t(window).bind("scroll.fb", t.fancybox.center), "iframe" == y.type && t('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (t.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="' + m.scrolling + '" src="' + y.href + '"></iframe>').appendTo(r), o.show(), T = !1, t.fancybox.center(), y.onComplete(b, v, y), q()
            },
            q = function() {
                var t, e;
                b.length - 1 > v && (t = b[v + 1].href, "undefined" != typeof t && t.match(_) && (e = new Image, e.src = t)), v > 0 && (t = b[v - 1].href, "undefined" != typeof t && t.match(_) && (e = new Image, e.src = t))
            },
            B = function(t) {
                var e = {
                    width: parseInt(p.width + (f.width - p.width) * t, 10),
                    height: parseInt(p.height + (f.height - p.height) * t, 10),
                    top: parseInt(p.top + (f.top - p.top) * t, 10),
                    left: parseInt(p.left + (f.left - p.left) * t, 10)
                };
                "undefined" != typeof f.opacity && (e.opacity = .5 > t ? .5 : t), o.css(e), r.css({
                    width: e.width - 2 * y.padding,
                    height: e.height - C * t - 2 * y.padding
                })
            },
            H = function() {
                return [t(window).width() - 2 * y.margin, t(window).height() - 2 * y.margin, t(document).scrollLeft() + y.margin, t(document).scrollTop() + y.margin]
            },
            R = function() {
                var t, e = H(),
                    n = {},
                    i = y.autoScale,
                    o = 2 * y.padding;
                return n.width = y.width.toString().indexOf("%") > -1 ? parseInt(e[0] * parseFloat(y.width) / 100, 10) : y.width + o, n.height = y.height.toString().indexOf("%") > -1 ? parseInt(e[1] * parseFloat(y.height) / 100, 10) : y.height + o, i && (n.width > e[0] || n.height > e[1]) && ("image" == m.type || "swf" == m.type ? (t = y.width / y.height, n.width > e[0] && (n.width = e[0], n.height = parseInt((n.width - o) / t + o, 10)), n.height > e[1] && (n.height = e[1], n.width = parseInt((n.height - o) * t + o, 10))) : (n.width = Math.min(n.width, e[0]), n.height = Math.min(n.height, e[1]))), n.top = parseInt(Math.max(e[3] - 20, e[3] + .5 * (e[1] - n.height - 40)), 10), n.left = parseInt(Math.max(e[2] - 20, e[2] + .5 * (e[0] - n.width - 40)), 10), n
            },
            z = function(t) {
                var e = t.offset();
                return e.top += parseInt(t.css("paddingTop"), 10) || 0, e.left += parseInt(t.css("paddingLeft"), 10) || 0, e.top += parseInt(t.css("border-top-width"), 10) || 0, e.left += parseInt(t.css("border-left-width"), 10) || 0, e.width = t.width(), e.height = t.height(), e
            },
            U = function() {
                var e, n, i = m.orig ? t(m.orig) : !1,
                    o = {};
                return i && i.length ? (e = z(i), o = {
                    width: e.width + 2 * y.padding,
                    height: e.height + 2 * y.padding,
                    top: e.top - y.padding - 20,
                    left: e.left - y.padding - 20
                }) : (n = H(), o = {
                    width: 2 * y.padding,
                    height: 2 * y.padding,
                    top: parseInt(n[3] + .5 * n[1], 10),
                    left: parseInt(n[2] + .5 * n[0], 10)
                }), o
            },
            X = function() {
                return n.is(":visible") ? (t("div", n).css("top", -40 * k + "px"), k = (k + 1) % 12, void 0) : (clearInterval(d), void 0)
            };
        t.fn.fancybox = function(e) {
            return t(this).length ? (t(this).data("fancybox", t.extend({}, e, t.metadata ? t(this).metadata() : {})).unbind("click.fb").bind("click.fb", function(e) {
                if (e.preventDefault(), !T) {
                    T = !0, t(this).blur(), g = [], h = 0;
                    var n = t(this).attr("rel") || "";
                    n && "" != n && "nofollow" !== n ? (g = t("a[rel=" + n + "], area[rel=" + n + "]"), h = g.index(this)) : g.push(this), j()
                }
            }), this) : this
        }, t.fancybox = function(e) {
            var n;
            if (!T) {
                if (T = !0, n = "undefined" != typeof arguments[1] ? arguments[1] : {}, g = [], h = parseInt(n.index, 10) || 0, t.isArray(e)) {
                    for (var i = 0, o = e.length; o > i; i++) "object" == typeof e[i] ? t(e[i]).data("fancybox", t.extend({}, n, e[i])) : e[i] = t({}).data("fancybox", t.extend({
                        content: e[i]
                    }, n));
                    g = jQuery.merge(g, e)
                } else "object" == typeof e ? t(e).data("fancybox", t.extend({}, n, e)) : e = t({}).data("fancybox", t.extend({
                    content: e
                }, n)), g.push(e);
                (h > g.length || 0 > h) && (h = 0), j()
            }
        }, t.fancybox.showActivity = function() {
            clearInterval(d), n.show(), d = setInterval(X, 66)
        }, t.fancybox.hideActivity = function() {
            n.hide()
        }, t.fancybox.next = function() {
            return t.fancybox.pos(v + 1)
        }, t.fancybox.prev = function() {
            return t.fancybox.pos(v - 1)
        }, t.fancybox.pos = function(t) {
            T || (t = parseInt(t), g = b, t > -1 && t < b.length ? (h = t, j()) : y.cyclic && b.length > 1 && (h = t >= b.length ? 0 : b.length - 1, j()))
        }, t.fancybox.cancel = function() {
            T || (T = !0, t.event.trigger("fancybox-cancel"), D(), m.onCancel(g, h, m), T = !1)
        }, t.fancybox.close = function() {
            function e() {
                i.fadeOut("fast"), l.empty().hide(), o.hide(), t.event.trigger("fancybox-cleanup"), r.empty(), y.onClosed(b, v, y), b = m = [], v = h = 0, y = m = {}, T = !1
            }
            if (!T && !o.is(":hidden")) {
                if (T = !0, y && !1 === y.onCleanup(b, v, y)) return T = !1, void 0;
                if (D(), t(s.add(c).add(u)).hide(), t(r.add(i)).unbind(), t(window).unbind("resize.fb scroll.fb"), t(document).unbind("keydown.fb"), r.find("iframe").attr("src", N && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank"), "inside" !== y.titlePosition && l.empty(), o.stop(), "elastic" == y.transitionOut) {
                    p = U();
                    var n = o.position();
                    f = {
                        top: n.top,
                        left: n.left,
                        width: o.width(),
                        height: o.height()
                    }, y.opacity && (f.opacity = 1), l.empty().hide(), S.prop = 1, t(S).animate({
                        prop: 0
                    }, {
                        duration: y.speedOut,
                        easing: y.easingOut,
                        step: B,
                        complete: e
                    })
                } else o.fadeOut("none" == y.transitionOut ? 0 : y.speedOut, e)
            }
        }, t.fancybox.resize = function() {
            i.is(":visible") && i.css("height", t(document).height()), t.fancybox.center(!0)
        }, t.fancybox.center = function() {
            var t, e;
            T || (e = arguments[0] === !0 ? 1 : 0, t = H(), (e || !(o.width() > t[0] || o.height() > t[1])) && o.stop().animate({
                top: parseInt(Math.max(t[3] - 20, t[3] + .5 * (t[1] - r.height() - 40) - y.padding)),
                left: parseInt(Math.max(t[2] - 20, t[2] + .5 * (t[0] - r.width() - 40) - y.padding))
            }, "number" == typeof arguments[0] ? arguments[0] : 200))
        }, t.fancybox.init = function() {
            t("#fancybox-wrap").length || (t("body").append(e = t('<div id="fancybox-tmp"></div>'), n = t('<div id="fancybox-loading"><div></div></div>'), i = t('<div id="fancybox-overlay"></div>'), o = t('<div id="fancybox-wrap"></div>')), a = t('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(o), a.append(r = t('<div id="fancybox-content"></div>'), s = t('<a id="fancybox-close"></a>'), l = t('<div id="fancybox-title"></div>'), c = t('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), u = t('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')), s.click(t.fancybox.close), n.click(t.fancybox.cancel), c.click(function(e) {
                e.preventDefault(), t.fancybox.prev()
            }), u.click(function(e) {
                e.preventDefault(), t.fancybox.next()
            }), t.fn.mousewheel && o.bind("mousewheel.fb", function(e, n) {
                T ? e.preventDefault() : (0 == t(e.target).get(0).clientHeight || t(e.target).get(0).scrollHeight === t(e.target).get(0).clientHeight) && (e.preventDefault(), t.fancybox[n > 0 ? "prev" : "next"]())
            }), t.support.opacity || o.addClass("fancybox-ie"), N && (n.addClass("fancybox-ie6"), o.addClass("fancybox-ie6"), t('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(a)))
        }, t.fn.fancybox.defaults = {
            padding: 10,
            margin: 40,
            opacity: !1,
            modal: !1,
            cyclic: !1,
            scrolling: "auto",
            width: 560,
            height: 340,
            autoScale: !0,
            autoDimensions: !0,
            centerOnScroll: !1,
            ajax: {},
            swf: {
                wmode: "transparent"
            },
            hideOnOverlayClick: !0,
            hideOnContentClick: !1,
            overlayShow: !0,
            overlayOpacity: .7,
            overlayColor: "#777",
            titleShow: !0,
            titlePosition: "float",
            titleFormat: null,
            titleFromAlt: !1,
            transitionIn: "fade",
            transitionOut: "fade",
            speedIn: 300,
            speedOut: 300,
            changeSpeed: 300,
            changeFade: "fast",
            easingIn: "swing",
            easingOut: "swing",
            showCloseButton: !0,
            showNavArrows: !0,
            enableEscapeButton: !0,
            enableKeyboardNav: !0,
            onStart: function() {},
            onCancel: function() {},
            onComplete: function() {},
            onCleanup: function() {},
            onClosed: function() {},
            onError: function() {}
        }, t(document).ready(function() {
            t.fancybox.init()
        })
    }(jQuery),
    function(t) {
        function e(e) {
            p.parent || (p.parent = t('<div id="' + e.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide(), t.fn.bgiframe && p.parent.bgiframe(), p.title = t("h3", p.parent), p.body = t("div.body", p.parent), p.url = t("div.url", p.parent))
        }

        function n(e) {
            return t.data(e, "tooltip")
        }

        function i(e) {
            n(this).delay ? d = setTimeout(a, n(this).delay) : a(), h = !!n(this).track, t(document.body).bind("mousemove", r), r(e)
        }

        function o() {
            if (!t.tooltip.blocked && this != c && (this.tooltipText || n(this).bodyHandler)) {
                if (c = this, u = this.tooltipText, n(this).bodyHandler) {
                    p.title.hide();
                    var e = n(this).bodyHandler.call(this);
                    e.nodeType || e.jquery ? p.body.empty().append(e) : p.body.html(e), p.body.show()
                } else if (n(this).showBody) {
                    var o = u.split(n(this).showBody);
                    p.title.html(o.shift()).show(), p.body.empty();
                    for (var a, r = 0; a = o[r]; r++) r > 0 && p.body.append("<br/>"), p.body.append(a);
                    p.body.hideWhenEmpty()
                } else p.title.html(u).show(), p.body.hide();
                n(this).showURL && t(this).url() ? p.url.html(t(this).url().replace("http://", "")).show() : p.url.hide(), p.parent.addClass(n(this).extraClass), n(this).fixPNG && p.parent.fixPNG(), i.apply(this, arguments)
            }
        }

        function a() {
            d = null, f && t.fn.bgiframe || !n(c).fade ? p.parent.show() : p.parent.is(":animated") ? p.parent.stop().show().fadeTo(n(c).fade, c.tOpacity) : p.parent.is(":visible") ? p.parent.fadeTo(n(c).fade, c.tOpacity) : p.parent.fadeIn(n(c).fade), r()
        }

        function r(e) {
            if (!(t.tooltip.blocked || e && "OPTION" == e.target.tagName)) {
                if (!h && p.parent.is(":visible") && t(document.body).unbind("mousemove", r), null === c) return t(document.body).unbind("mousemove", r), void 0;
                p.parent.removeClass("viewport-right").removeClass("viewport-bottom");
                var i = p.parent[0].offsetLeft,
                    o = p.parent[0].offsetTop;
                if (e) {
                    i = e.pageX + n(c).left, o = e.pageY + n(c).top;
                    var a = "auto";
                    n(c).positionLeft && (a = t(window).width() - i, i = "auto"), p.parent.css({
                        left: i,
                        right: a,
                        top: o
                    })
                }
                var l = s(),
                    u = p.parent[0];
                l.x + l.cx < u.offsetLeft + u.offsetWidth && (i -= u.offsetWidth + 20 + n(c).left, p.parent.css({
                    left: i + "px"
                }).addClass("viewport-right")), l.y + l.cy < u.offsetTop + u.offsetHeight && (o -= u.offsetHeight + 20 + n(c).top, p.parent.css({
                    top: o + "px"
                }).addClass("viewport-bottom"))
            }
        }

        function s() {
            return {
                x: t(window).scrollLeft(),
                y: t(window).scrollTop(),
                cx: t(window).width(),
                cy: t(window).height()
            }
        }

        function l() {
            function e() {
                p.parent.removeClass(i.extraClass).hide().css("opacity", "")
            }
            if (!t.tooltip.blocked) {
                d && clearTimeout(d), c = null;
                var i = n(this);
                void 0 !== i && (f && t.fn.bgiframe || !i.fade ? e() : p.parent.is(":animated") ? p.parent.stop().fadeTo(i.fade, 0, e) : p.parent.stop().fadeOut(i.fade, e), n(this).fixPNG && p.parent.unfixPNG())
            }
        }
        var c, u, d, p = {},
            f = t.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent),
            h = !1;
        t.tooltip = {
            blocked: !1,
            defaults: {
                delay: 200,
                fade: !1,
                showURL: !0,
                extraClass: "",
                top: 15,
                left: 15,
                id: "tooltip"
            },
            block: function() {
                t.tooltip.blocked = !t.tooltip.blocked
            }
        }, t.fn.extend({
            tooltip: function(n) {
                return n = t.extend({}, t.tooltip.defaults, n), e(n), this.each(function() {
                    t.data(this, "tooltip", n), this.tOpacity = p.parent.css("opacity"), this.tooltipText = n.text || this.title, t(this).removeAttr("title"), this.alt = ""
                }).on("mouseover.tooltip", o).on("mouseout.tooltip", l)
            },
            tooltipStop: function() {
                return this.off(".tooltip"), this.each(function() {
                    l.call(this)
                }), this
            },
            fixPNG: f ? function() {
                return this.each(function() {
                    var e = t(this).css("backgroundImage");
                    e.match(/^url\(["']?(.*\.png)["']?\)$/i) && (e = RegExp.$1, t(this).css({
                        backgroundImage: "none",
                        filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + e + "')"
                    }).each(function() {
                        var e = t(this).css("position");
                        "absolute" != e && "relative" != e && t(this).css("position", "relative")
                    }))
                })
            } : function() {
                return this
            },
            unfixPNG: f ? function() {
                return this.each(function() {
                    t(this).css({
                        filter: "",
                        backgroundImage: ""
                    })
                })
            } : function() {
                return this
            },
            hideWhenEmpty: function() {
                return this.each(function() {
                    t(this)[t(this).html() ? "show" : "hide"]()
                })
            },
            url: function() {
                return this.attr("href") || this.attr("src")
            }
        })
    }(jQuery), $.validator.setDefaults({
        errorPlacement: function(t, e) {
            $(e).tooltip({
                text: t
            }).removeClass("validation-passed").addClass("validation-failed")
        },
        success: function(t, e) {
            $(e).tooltipStop().addClass("validation-passed").removeClass("validation-failed")
        }
    }), $(document).ready(function() {
        ! function() {
            if (!($("#topics-show").length < 1)) {
                var t = $("#post_body");
                if (!(t.length < 1)) {
                    var e = $('<button id="quick-reply" class="btn btn-top bbs-btn-gray28 bbs-btn-replay" title="快速回复">快速回复</button>');
                    e.css({
                        cursor: "pointer",
                        border: "0px none",
                        bottom: "101px",
                        width: "80px",
                        height: "28px",
                        margin: "0px",
                        padding: "0px",
                        position: "fixed",
                        right: "40px",
                        display: "block",
                        "padding-right": "13px"
                    }), $("body").append(e), $(window).scroll(function() {
                        $(this).scrollTop() + $(window).height() > t.offset().top ? $(e).fadeOut(400) : $(e).fadeIn(400)
                    }), $("body,html").scroll(function() {
                        $(this).scrollTop() + $(window).height() > t.offset().top ? $(e).fadeOut(400) : $(e).fadeIn(400)
                    }), $(e).click(function() {
                        var e = t.offset().top + t.height();
                        return $("body,html").animate({
                            scrollTop: e
                        }, 400), t.focus(), !1
                    })
                }
            }
        }()
    });
var topics_page_js = {};
topics_page_js.new_page = function(t) {
    $("#select_parent_forum, #select_child_forum").change(function() {
        $(this).find(":selected").data("tech-forum") ? ($("#min_point").text("20"), $("#topic_point").attr("min", 20), 20 > t && alert("您没有足够的可用分在技术区发帖")) : ($("#min_point").text("0"), $("#topic_point").attr("min", 0))
    }), $("#select_child_forum").change(function() {
        var t = $(this).find(":selected").data("max-point");
        $("#max_point").text(t), $("#topic_point").attr("max", t)
    });
    var e = '<img src="/assets/icon_loading.gif" class="icon_loading" />';
    $("#new_topic").validate({
        rules: {
            "topic[body]": {
                maxlength: 1e4,
                minlength: 10
            }
        },
        submitHandler: function(t) {
            var n = $(t);
            if (!n.data("load_submitted")) {
                n.data("load_submitted", !0);
                var i = n.find(".submit_load_icon");
                i.after(e), t.submit()
            }
        }
    }), $(".tag_input input").rules("add", {
        tagCheck: !0
    });
    var n = $(".open_topics_fancybox");
    n.length && ($.fancybox(n.html(), {
        autoDimensions: !1,
        width: 350,
        height: "auto",
        transitionIn: "none",
        transitionOut: "none"
    }), $(".close_open_topics_fancybox").click(function() {
        $.fancybox.close()
    }))
}, topics_page_js.show_page = function() {
    function t(t) {
        var e = CSDN.getUserName();
        if ("" !== e) {
            var n = t.find(".follow_btn"),
                i = n.data("username");
            if (i == e) return n.removeClass("add").addClass("btn_grey").text("自己"), void 0;
            var o = "http://my.csdn.net/index.php/follow/check_is_followed/" + encodeURIComponent(e) + "/" + encodeURIComponent(i) + "?jsonpcallback=?";
            $.getJSON(o, function(t) {
                1 == t.succ && n.removeClass("add").addClass("btn_grey").text("已关注")
            })
        }
    }

    function e() {
        iframe_login_success_flag === !0 && location.reload()
    }
    $(".post_body img").each(function() {
        $(this).attr("src") && $(this).attr("src").match(new RegExp("http://forum.csdn.net/PointForum/ui/scripts/csdn/Plugin")) || $(this).addClass("image_border")
    }), $(".drop_menu_wrap").mouseenter(function() {
        $(this).find(".drop_menu").show()
    }).mouseleave(function() {
        $(this).find(".drop_menu").hide()
    }), $(".control .manage-toggle").hover(function() {
        $(this).children(".manage").show()
    }, function() {
        $(this).children(".manage").hide()
    }), $('select[name="filter_posts"]').change(function() {
        switch ($(this).val()) {
            case "default":
                $(".post_info:not(.deleted)").closest(".post").show(), $(".post_info.deleted").closest(".post").hide();
                break;
            case "all":
                $(".post").show();
                break;
            case "star":
                $(".post_info:not(.deleted)").closest(".post").show(), $(".post_info:not(.star, .topic)").closest(".post").hide();
                break;
            case "pointed":
                $(".post_info:not(.deleted)").closest(".post").show(), $(".post_info:not(.pointed, .topic)").closest(".post").hide();
                break;
            case "lz":
                window.location.href = window.location.pathname + "?list=lz";
                break;
            case "unlz":
                window.location.href = window.location.pathname
        }
    }), $("#fav").click(function() {
        var t = 595,
            e = 333,
            n = parseInt(screen.availWidth / 2 - t / 2, 0),
            i = parseInt(screen.availHeight / 2 - e / 2, 0);
        return window.open(this.href, "_blank", "width=" + t + ",height=" + e + ",top=" + i + ",left=" + n + ",screenX=" + n + ",screenY=" + i + ",location=no,menubar=no,scrollbars=no,status=no,titlebar=no,toolbar=no,directories=no"), !1
    }), $(".control .fancybox").fancybox({
        hideOnOverlayClick: !1
    }), $(".detailed").on("click", ".control .quote", function(t) {
        var e = $(this).closest(".post");
        if (!e.data().isTopicLocked) {
            t.preventDefault();
            var n = $(this).parents("table").data("postId");
            $.getJSON("/posts/" + n + ".json", function(t) {
                var n = t.content,
                    i = e.find(".post_info"),
                    o = $("#post_body");
                n = i.hasClass("topic") ? "[quote=引用 楼主 " + i.data("username") + " 的回复:]\n" + n + "[/quote]" : "[quote=引用 " + i.data("floor") + " 楼 " + i.data("username") + " 的回复:]\n" + n + "[/quote]", "" !== o.val() && (n = "\n\n" + n), o.focus().val(o.val() + n)
            })
        }
    }), $("dt.user_head").hover(function() {
        var e = $(this);
        e.data("allow_show", !0);
        var n = e.find(".user_material");
        if (n.length) n.show();
        else if (!e.data("fetched")) {
            e.data("fetched", !0);
            var i = "/users/" + e.data("username") + "/info";
            $.ajax({
                url: i
            }).success(function(n) {
                n = $(n);
                var i = "user_meterial_" + Date.now();
                n.attr("id", i), t(n), e.data("allow_show") || n.hide(), e.append(n), new CNick("#" + i + " .name2nick").showNickname()
            })
        }
    }, function() {
        var t = $(this);
        t.data("allow_show", !1);
        var e = t.find(".user_material");
        e.hide()
    }), $(document).on("click", ".follow_btn", function() {
        if ("" === CSDN.getUserName()) return alert("请先登录"), void 0;
        var t = $(this);
        if (t.hasClass("add") && !t.data("follow_process")) {
            t.data("follow_process", !0);
            var e = "http://my.csdn.net/index.php/follow/do_follow?jsonpcallback=?",
                n = t.data("username");
            $.getJSON(e, {
                username: n
            }, function(e) {
                1 == e.succ ? (t.removeClass("add").addClass("btn_grey").text("已关注"), alert("关注成功")) : alert(e.msg)
            })
        }
    }), window.open_embeded_betting_iframe_login = function(t) {
        $.fancybox(CSDN.appConfig.csdn_passport_ssl_domain + "/account/loginbox?from=" + t, {
            type: "iframe",
            width: 350,
            height: 240,
            autoScale: !1,
            onClosed: e,
            hideOnOverlayClick: !1
        })
    }, window.iframe_login_success_flag = !1, $(".post_body img").each(function(t, e) {
        (e.width >= 750 || e.height >= 750) && (e.title = "点击查看原始大小图片", $(e).addClass("magplus"), $(e).click(function() {
            window.open(e.src, "_blank")
        }))
    })
}, topics_page_js._form_page = function() {
    var t = function() {
        $("#title_count_notice").html($("#countTemplate").tmpl({
            count: 80 - $("#topic_title").val().length
        }))
    };
    t();
    var e = function() {
        $("#topic_body_count_notice").html($("#countTemplate").tmpl({
            count: 1e4 - $("#topic_body").val().length
        }))
    };
    e(), $("#topic_title").keyup(t), $("#topic_body").keyup(e), $("#topic_body").markItUp(bbcodeSettings), window.tags_default_conf = {
        wraper: $("#tags"),
        inst: "tags",
        deftags: "",
        componentsUrl: "/assets/componet.js",
        toolkitUrl: "/assets/toolkit.js",
        maxTextLen: 20,
        maxCount: 5,
        title: "",
        content: "",
        proxyId: "proxyId",
        proxy: "http://recommend.api.csdn.net/proxy.html?X-ACL-TOKEN=tag_suggest_kdfjkqwuiplkajmncbsb_token",
        onValidate: function(t) {
            t === !0 ? ($(".tag_input").removeClass("validation-failed"), $(".tag_input input").removeClass("tag-failed")) : ($(".tag_input").addClass("validation-failed"), $(".tag_input input").addClass("tag-failed"))
        }
    };
    var n = $.extend({}, tags_default_conf, {
        deftags: $("#topic_cached_tag_list").val(),
        title: $("#topic_title").val(),
        content: $("#topic_body").val()
    });
    window.tags = new csdn.tags(n);
    var i = function() {
        var t = $("#topic_title").val(),
            e = $("#topic_body").val();
        tags.initTags(t, e)
    };
    $("#topic_title").blur(i), $("#topic_body").blur(i), $(":submit").click(function() {
        $("#topic_cached_tag_list").val(tags.tagsDataArr.join(","))
    }), $.validator.addMethod("tagCheck", function(t, e) {
        return this.optional(e) || !$(e).hasClass("tag-failed")
    }, "")
}, topics_page_js._select_forum_page = function() {
    var t = $.map(forum_tree, function(t) {
        return t
    });
    $("#select_parent_forum").html($("#selectForumTemplate").tmpl({
        notice: "-选择大版块-",
        forums: t
    })), $("#select_parent_forum").change(function() {
        var t = forum_tree[$(this).val()] ? forum_tree[$(this).val()].child_forums : [];
        $("#select_child_forum").html($("#selectForumTemplate").tmpl({
            notice: "-选择小版块-",
            forums: t
        }))
    })
}, topics_page_js.close_edit_page = function(t) {
    var e = t,
        n = e,
        i = function() {
            n = e, $.each($("input.post_point"), function() {
                $(this).val().match(/\d+/) && (n -= parseInt($(this).val(), 0))
            }), $("#point_notice").replaceWith($("#pointNoticeTemplate").tmpl({
                total: e,
                last: n
            })), 0 === n && $(".checkTotalNotice").remove()
        };
    $("input.post_point").mouseover(function() {
        $("#pointNoticeTemplate").tmpl({
            total: e,
            last: n
        }).insertAfter($(this)), $(this).select()
    }).mouseout(function() {
        $("#point_notice").remove()
    }).keyup(function() {
        $(this).valid() && i()
    }), $("#close_topic_form").validate({
        submitHandler: function(t) {
            0 === n ? ($(".close_submit").val("结帖给分...").prop("disabled", !0), t.submit()) : alert("给分与总分不符，请重新分配！")
        }
    }), $("a.average").click(function(t) {
        t.preventDefault();
        var e = $("input.post_point[value!=0]").map(function(t, e) {
                return $(e).data("username")
            }),
            o = [];
        $("input.post_point").each(function(t, n) {
            var i = $(n).data("username"); - 1 == $.inArray(i, e) && -1 == $.inArray(i, o) && o.push(i)
        });
        var a = o.length,
            r = parseInt(n / a, 0),
            s = n % a;
        $.each(o, function(t, e) {
            var n = $("input.post_point[data-username=" + e + "]").first();
            s > 0 ? (n.val(r + 1), s--) : n.val(r)
        }), i()
    })
}, topics_page_js.top_edit_page = function() {
    $("#search_parent_forum").click(function(t) {
        t.preventDefault(), "" !== $("#select_parent_forum").val() ? $("#select_parent_forum :selected").data("moderator") ? ($("input[name=forum_id]").val($("#select_parent_forum").val()), $("#top_topic_form").submit()) : alert("没有该版管理权限") : alert("请选择大版块")
    }), $("#search_child_forum").click(function(t) {
        t.preventDefault(), "" !== $("#select_child_forum").val() ? $("#select_child_forum :selected").data("moderator") ? ($("input[name=forum_id]").val($("#select_child_forum").val()), $("#top_topic_form").submit()) : alert("没有该版管理权限") : alert("请选择小版块")
    })
};
var posts_page_js = {};
posts_page_js._form_page = function() {
    function t(t) {
        var e = /^\s*\[quote.*\][\s\S]*\[\/quote\]\s*$/im.exec(t);
        return null === e ? !0 : t != e[0]
    }
    $("#post_body").markItUp(bbcodeSettings), $("#post_body").keypress(function(t) {
        var e = t.which ? t.which : t.keyCode;
        if (10 === e || 13 == e && t.ctrlKey) {
            var n = $(this).closest("form"),
                i = n.find("#submit_new_post_form");
            i.prop("disabled") !== !0 && n.submit()
        }
    });
    var e = function() {
        $("#body_count_notice").html($("#countTemplate").tmpl({
            count: 1e4 - $("#post_body").val().length
        }))
    };
    e(), $("#post_body").keyup(e), jQuery.validator.addMethod("quoteOnly", function(e, n) {
        return this.optional(n) || t(e)
    }, "只有引用的内容不允许回复！");
    var n = '<img src="/assets/icon_loading.gif" class="icon_loading" />';
    $("#new_post").validate({
        rules: {
            "post[body]": {
                maxlength: 1e4,
                minlength: 6
            }
        },
        submitHandler: function(t) {
            var e = $("#submit_new_post_form"),
                i = e[0];
            i.disabled = !0, e.after(n);
            var o = {
                dataType: "json",
                clearForm: !0,
                error: function(n) {
                    i.disabled = !1, e.next(".icon_loading").remove(), 403 == n.status && "需要登录" == n.responseText ? csdn.showLogin(function() {
                        $(t).find(".login").remove(), $(t).submit()
                    }) : n.status >= 400 && n.status < 500 ? alert(n.responseText) : alert("添加回复失败,请重试")
                },
                success: function(t) {
                    i.disabled = !1, e.next(".icon_loading").remove(), location.href = t.redirect_to
                }
            };
            $(t).ajaxSubmit(o)
        }
    }), window.iframe_login_success_flag = !1, $(".bbs_topic_loginbox_link").on("click", function(t) {
        t.preventDefault();
        var e = this;
        csdn.showLogin(function() {
            $(e).parent().remove()
        })
    })
}, posts_page_js.edit_page = function() {
    $("#post_edit .body").markItUp(bbcodeSettings), $("form.publish").validate();
    var t = function() {
        $("#edit_body_count_notice").html($("#countTemplate").tmpl({
            count: 1e4 - $("#post_edit .body").val().length
        }))
    };
    t(), $("#post_edit .body").keyup(t)
};
var main_page_js = {};
main_page_js.home_page = function() {
    function t() {
        var t = $("#scrollDiv"),
            e = !1;
        t.mouseover(function() {
            e = !0
        }), t.mouseout(function() {
            e = !1
        }), setInterval(function() {
            e || t.find("li:first").slideUp(function() {
                $(this).appendTo(t.find("ul")).show()
            })
        }, 3e3)
    }
    t(), $(".tab li").mouseenter(function() {
        $(this).addClass("hover").siblings().removeClass("hover");
        var t = $(this).closest(".tab").siblings(".list").find($(this).find("a").attr("href"));
        t.addClass("hover").show().siblings().hide().removeClass("hover")
    }), CSDN.activeAttLink(".recom_neter"), $(".tab li a").click(function(t) {
        t.preventDefault()
    })
}, main_page_js.index_page = function() {
    $("#leftFrame").load(function() {
        $('<a class="hidden_side"></a>').prependTo($("body", getFrameWindow("leftFrame").document)).click(function() {
            $("body", getFrameWindow("leftFrame").document).hide(), $("a.show_side", getFrameWindow("mainFrame").document).show(), $("frameset").attr("cols", "0,*"), $(this).hide()
        })
    }), $("#mainFrame").load(function() {
        var t = "left: 0;display: inline-block;position: fixed;top: 50%;z-index: 999;width: 21px;height: 100px;margin-top: -50px;cursor: pointer;",
            e = $('<a class="show_side" style="' + t + '"></a>').hide().prependTo($("body", getFrameWindow("mainFrame").document)).click(function() {
                $("body", getFrameWindow("leftFrame").document).show(), $("frameset").attr("cols", "230,*"), $("a.hidden_side", getFrameWindow("leftFrame").document).show(), $(this).hide()
            });
        "0,*" == $("frameset").attr("cols") && e.show()
    })
}, main_page_js.rank_page = function() {
    CSDN.activeAttLink(".bor_bot"), $(".bor_bot").on("click", "div.pic img", function() {
        var t = $(this).siblings("input[type=checkbox]");
        t.prop("disabled") || t.prop("checked", !t.is(":checked")).change()
    }), $(".bor_bot").on("change", "input[type=checkbox]", function() {
        var t = $(this).closest(".bor_bot");
        t.find("span.count").text(t.find("input[name=username]:checked").length)
    }), $(".bor_bot input[name=select_all]").change(function() {
        $(this).closest(".bor_bot").find("input[name=username]:not(:disabled)").prop("checked", $(this).is(":checked"))
    }), $(".bor_bot .follow_selected").click(function(t) {
        if (t.preventDefault(), CSDN.getUserName()) {
            var e = $(this).closest(".bor_bot"),
                n = e.find("input[name=username]:checked").length,
                i = 0;
            e.find("input[name=username]:checked").each(function(t, o) {
                var a = "http://my.csdn.net/index.php/follow/do_follow?jsonpcallback=?",
                    r = $(o).val();
                $.getJSON(a, {
                    username: r
                }, function(t) {
                    1 == t.succ ? (e.find("a.att[data-username=" + r + "]").addClass("followed").text("已关注"), e.find("input[value=" + r + "]").prop("checked", !1).change().prop("disabled", !0), i += 1, i == n && alert("关注成功")) : alert(t.msg)
                })
            })
        } else alert("请先登录")
    }), $(".bor_bot input[name=select_all]").prop("checked", !0).change(), $(".expert_point_main").hover(function() {
        $(this).find(".expert_point_details").show()
    }, function() {
        $(this).find(".expert_point_details").hide()
    })
}, main_page_js.medal_page = function() {
    $(".table_medals").on("click", "ul ~ a", function() {
        var t = $(this).prev("ul");
        $(t).is(":hidden") ? (t.slideDown(), this.innerHTML = "<<收起") : (t.slideUp(), this.innerHTML = "查看更多>>")
    })
};
var forums_page_js = {};
forums_page_js.rank_page = function() {
    var t = $.map(forum_tree, function(t) {
        return t
    });
    $("#select_parent_forum").html($("#selectForumTemplate").tmpl({
        notice: "-选择大论坛-",
        forums: t
    })), $("#select_parent_forum").change(function() {
        var t = forum_tree[$(this).val()] ? forum_tree[$(this).val()].child_forums : [];
        $("#select_child_forum").html($("#selectForumTemplate").tmpl({
            notice: "-选择小论坛-",
            forums: t
        }))
    }), $("#search_rank input[type=submit]").click(function() {
        $("#type").val($(this).attr("id"))
    }), $("#parent_month, #parent_total").click(function(t) {
        var e = $("#select_parent_forum").val();
        e ? $("#forum_id").val(e) : (t.preventDefault(), alert("请选择大论坛"))
    }), $("#child_month").click(function(t) {
        var e = $("#select_child_forum").val();
        e ? $("#forum_id").val(e) : (t.preventDefault(), alert("请选择小论坛"))
    })
}, forums_page_js.show_page = function() {
    function t() {
        var t = $("#annbody");
        if (t.length > 0) {
            var e = !0;
            t.mouseover(function() {
                e = !1
            }), t.mouseout(function() {
                e = !0
            }), setInterval(function() {
                if (e) {
                    var n = t.find("li:lt(3)");
                    t.append(n.clone()), t.find("li").each(function(t, e) {
                        1 == (t + 1) % 3 ? $(e).removeClass().addClass("left") : 2 === (t + 1) % 3 ? $(e).removeClass().addClass("center") : 0 === (t + 1) % 3 && $(e).removeClass().addClass("right")
                    }), n.slideUp(function() {
                        $(this).remove()
                    })
                }
            }, 5e3)
        }
    }
    t()
};
var bettings_page_js = {};
bettings_page_js.new_page = function() {
    $.validator.addMethod("optionsCountBetween2And10", function() {
        var t = $(".betting-option-content:filled").length;
        return t >= 2 && 10 >= t
    }, "押宝选项数目必须大于2个小于10个"), jQuery.validator.classRuleSettings.IP4Checker = {
        optionsCountBetween2And10: !0
    }, $("#new_betting").validate(), $("#add-option-btn").on("click", function(t) {
        t.preventDefault();
        var e = $(".betting-option").last(),
            n = parseInt(e.attr("index"), 0);
        if (10 === n) return alert("最多只能设置10个选项"), !1;
        var i = '<tr id="betting-option-3" class="betting-option" index="' + (n + 1) + '">' + "<th>" + String.fromCharCode("A".charCodeAt(0) + n) + ":</th>" + "<td>" + '<input class="text" id="betting_betting_options_attributes_' + n + '_content" ' + 'name="betting[betting_options_attributes][' + n + '][content]" size="30" type="text">' + "</td>" + "</tr>";
        e.after($(i))
    }), $("#remove-option-btn").on("click", function(t) {
        t.preventDefault();
        var e = $(".betting-option").last(),
            n = parseInt(e.attr("index"), 0);
        return 2 === n ? (alert("最少需要设置2个选项"), !1) : (e.remove(), void 0)
    })
};
var moderator_page_js = {};
moderator_page_js.main_index_page = function() {
        $(".submit").click(function(t) {
            t.preventDefault(), $(this).closest("form").submit()
        }), $("#checkout-management-form").on("submit", function(t) {
            return t.preventDefault(), "" === this.child_forum_urlname.value ? (alert("请选择小版块"), void 0) : (this.submit(), void 0)
        })
    }, moderator_page_js._moderators_select_forum_page = function() {
        var t = $.map(forum_tree, function(t) {
            return t
        });
        $("#select_parent_forum").html($("#selectForumTemplate").tmpl({
            notice: "-选择大版块-",
            forums: t
        })), $("#select_parent_forum").change(function() {
            var t = forum_tree[$(this).val()] ? forum_tree[$(this).val()].child_forums : [];
            $("#select_child_forum").html($("#selectForumTemplate").tmpl({
                notice: "-选择小版块-",
                forums: t
            }))
        })
    }, moderator_page_js.moderators_index_page = function() {
        $("#moderator_form").validate(), $("#moderator_form .btn_b").click(function(t) {
            t.preventDefault(), "" === $("#select_child_forum").val() ? alert("请选择小版") : ($("input[name=forum_id]").val($("#select_child_forum").val()), $("#moderator_form").submit())
        })
    }, moderator_page_js._posts_post_list_page = function() {
        $("input[name=select_all]").change(function() {
            $(this).is(":checked") ? $("input[name^=ids]").prop("checked", !0) : $("input[name^=ids]").prop("checked", !1)
        }), $("a.delete_submit").click(function(t) {
            t.preventDefault(), 0 === $("input[name^=ids]:checked").length ? alert("请选择要删除的帖子") : $("#batch_form").attr("action", $(this).attr("href")).submit()
        })
    }, moderator_page_js.posts_batch_delete_edit_page = function() {
        $('input[name="reason_type"]').click(function() {
            0 === this.value ? $("#reason").addClass("required") : $("#reason").removeClass("required").removeClass("validation-failed").tooltipStop()
        }), $("form.publish").validate()
    }, moderator_page_js.posts_search_page = function() {
        $("#search_parent_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_parent_forum").val() ? ($("input[name=forum_id]").val($("#select_parent_forum").val()), $("#moderator_search_form").submit()) : alert("请选择大版块")
        }), $("#search_child_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_child_forum").val() ? ($("input[name=forum_id]").val($("#select_child_forum").val()), $("#moderator_search_form").submit()) : alert("请选择小版块")
        }), $("input[name=point]").change(function() {
            $("input[name=point_min], input[name=point_max]").prop("disabled", !$(this).is(":checked"))
        })
    }, moderator_page_js.posts_search_pointed = function() {
        $("#search_parent_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_parent_forum").val() ? ($("input[name=forum_id]").val($("#select_parent_forum").val()), $("#moderator_search_form").submit()) : alert("请选择大版块")
        }), $("#search_child_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_child_forum").val() ? ($("input[name=forum_id]").val($("#select_child_forum").val()), $("#moderator_search_form").submit()) : alert("请选择小版块")
        }), $("input[name=point]").change(function() {
            $("input[name=point_min], input[name=point_max]").prop("disabled", !$(this).is(":checked"))
        })
    }, moderator_page_js.prisoners_new_page = function() {
        $("#search_parent_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_parent_forum").val() ? $("#select_parent_forum :selected").data("moderator") ? ($("input[name=forum_id]").val($("#select_parent_forum").val()), $("#new_prisoner_form").submit()) : alert("没有该版管理权限") : alert("请选择大版块")
        }), $("#search_child_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_child_forum").val() ? $("#select_child_forum :selected").data("moderator") ? ($("input[name=forum_id]").val($("#select_child_forum").val()), $("#new_prisoner_form").submit()) : alert("没有该版管理权限") : alert("请选择小版块")
        }), $('input[name="reason_type"]').click(function() {
            0 === this.value ? $("#reason").addClass("required") : $("#reason").removeClass("required").removeClass("validation-failed").tooltipStop()
        }), $("#new_prisoner_form").validate(), $("a.release").click(function(t) {
            t.preventDefault();
            var e = $(this).siblings("input").val();
            "" !== e ? $.ajax($(this).prop("href"), {
                type: "DELETE",
                dataType: "script",
                data: {
                    note: e
                }
            }) : alert("请填写理由")
        })
    }, moderator_page_js.prisoners_search_page = function() {
        $("#search_parent_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_parent_forum").val() ? ($("input[name=forum_id]").val($("#select_parent_forum").val()), $("#moderator_search_form").submit()) : alert("请选择大版块")
        }), $("#search_child_forum").click(function(t) {
            t.preventDefault(), "" !== $("#select_child_forum").val() ? ($("input[name=forum_id]").val($("#select_child_forum").val()), $("#moderator_search_form").submit()) : alert("请选择小版块")
        })
    }, moderator_page_js._moderator_select_forum_page = function() {
        var t = $.map(forum_tree, function(t) {
            return t
        });
        $("#select_parent_forum").html($("#selectForumTemplate").tmpl({
            notice: "-选择大版块-",
            forums: t
        })), $("#select_parent_forum").change(function() {
            var t = forum_tree[$(this).val()] ? forum_tree[$(this).val()].child_forums : [];
            $("#select_child_forum").html($("#selectForumTemplate").tmpl({
                notice: "-选择小版块-",
                forums: t
            }))
        })
    }, moderator_page_js._select_forum_page = function() {
        var t = $.map(forum_tree, function(t) {
            return t
        });
        $("#select_parent_forum").html($("#selectForumTemplate").tmpl({
            notice: "-选择大版块-",
            forums: t
        })), $("#select_parent_forum").change(function() {
            var t = forum_tree[$(this).val()] ? forum_tree[$(this).val()].child_forums : [];
            $("#select_child_forum").html($("#selectForumTemplate").tmpl({
                notice: "-选择小版块-",
                forums: t
            }))
        })
    }, moderator_page_js._topic_list_page = function() {
        $("input[name=select_all]").change(function() {
            $(this).is(":checked") ? $("input[name^=ids]").prop("checked", !0) : $("input[name^=ids]").prop("checked", !1)
        }), $("a.delete_submit").click(function(t) {
            t.preventDefault(), 0 === $("input[name^=ids]:checked").length ? alert("请选择要删除的帖子") : $("#batch_form").attr("action", $(this).attr("href")).submit()
        }), $("#search_user .btn_1").click(function(t) {
            t.preventDefault(), $("#search_user").attr("action", $(this).attr("href")).submit()
        })
    }, $(document).ready(function() {
        ! function() {
            var t = $("a#fav"),
                e = $("a.digg"),
                n = $("a.bury"),
                i = $("a.quote"),
                o = $("a.report_spam"),
                a = $("button#scroll-top"),
                r = $("button#quick-reply"),
                s = $(".fr select"),
                l = $("a.close_topic"),
                c = $("a.create_topic"),
                u = $("a.reply_topic"),
                d = $(".bottom .control a.close_topic"),
                p = $(".bottom .control a.create_topic"),
                f = $(".bottom .control a.reply_topic"),
                h = $("#submit_new_post_form"),
                m = $("#topic-suggest .related-tags a"),
                g = $("#topic-suggest .related-topics a"),
                v = $(".news-nav .nav-bar a"),
                y = $(".wraper .bread_nav a");
            t.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_shoucang"])
            }), e.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_dongwoyouyong"])
            }), n.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_banzhuan"])
            }), i.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_yinyong"])
            }), o.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_jubao"])
            }), a.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_huidaodingbu"])
            }), r.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_youhuifu"])
            }), l.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_jietie"])
            }), c.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_fatie"])
            }), u.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_huifu"])
            }), d.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_jietie-di"])
            }), p.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_fatie-di"])
            }), f.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_huifu-di"])
            }), h.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_tijiaohuifu"])
            }), $("body").on("click", ".preview_btn_a", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_yulan"])
            }), $("body").on("click", ".edit_btn_a", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_bianji"])
            }), m.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_xiangguantag"])
            }), g.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_xiangguanyuedong"])
            }), v.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_daohang"])
            }), y.on("click", function() {
                _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_mianbaoxie"])
            }), s.change(function() {
                var t = $(this).children("option:selected").val();
                "lz" == t ? _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_xianshilouzhu"]) : "star" == t ? _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_xianshixingjihuifu"]) : "pointed" == t ? _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_xianshidefenhuifu"]) : "all" == t ? _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_xianshisuoyouhuifu"]) : "default" == t && _gaq.push(["_trackEvent", "function", "onclick", "BBS_articles_buxianshishanchuhuifu"])
            })
        }()
    }),
    function(t) {
        function e(t) {
            var e = "";
            return 0 == t.length ? "" : (e = t.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = e.replace(/ /g, "&nbsp;"), e = e.replace(/\'/g, "&#39;"), e = e.replace(/\"/g, "&quot;"))
        }
        var n = t.csdn || {},
            i = "",
            o = "",
            a = -1;
        n.tags = function(t) {
            this.init.apply(this, [t])
        }, n.tags.prototype = {
            init: function(t) {
                this.conf = t, this.initGlobal(), this.initTpl(), this.tookit = !1, this.comp = !1, this.tagsDataArr = [], this.initToolkit(), this.initComponent(), this.getDoms(), this.addEvent(), this.addDefault(), this.initTags()
            },
            initGlobal: function() {
                i = this.conf.maxTextLen, o = this.conf.maxCount
            },
            initTpl: function() {
                var t = '              <input type="text" value="" size="1">              <div class="tag tag_reco">                <table>                <tr>                  <th>推荐标签：</th>                  <td class="tagWrap"></td>                </tr>               </table>              </div>              <em class="content"></em>';
                $(this.conf.wraper).addClass("tag_input tag"), $(this.conf.wraper).html(t)
            },
            getDoms: function() {
                this.Dom = {};
                var t = this.conf.wraper;
                this.Dom.wraper = t, this.Dom.input = t.find("input"), this.Dom.suggestion = t.find(".tag_reco"), this.Dom.tagWrap = t.find(".tagWrap")
            },
            addEvent: function() {
                var t = this;
                this.Dom.wraper.bind("dblclick click", function(e) {
                    return t.Dom.input.show(), t.Dom.input.focus(), ($(e.target).hasClass("del") || "dblclick" == e.type && "SPAN" == e.target.tagName) && t.delTag(e), !1
                }), this.Dom.suggestion.bind("click", function(e) {
                    var n = e.target;
                    return "A" == n.tagName && t.validate($(n).text(), e, function(n) {
                        n !== !0 ? t.comp && t.comp.tip(t.Dom.input.parent(), n) : t.addTags(e)
                    }), !1
                }), this.Dom.input.bind("keyup keydown", function(e) {
                    t.showSuggestions(), t.eventHandler(e), t.autoWidth(t.Dom.input[0])
                }), this.Dom.input.bind("blur", function(e) {
                    t.Dom.input.prev().filter("span").length > 0 && (setTimeout(function() {
                        "" == t.Dom.input.val() && t.Dom.input.hide()
                    }, 0), t.showSuggestions()), t.eventHandler(e)
                }), $(document).bind("click", function(e) {
                    var n = e.target;
                    return 0 != $(n).parents().filter(".tag_input").length || $(n).hasClass("tag_input") ? !1 : (t.hideSuggestions(), void 0)
                }), this.Dom.suggestion.hide(), this.Dom.input.bind("focus", function() {
                    t.showSuggestions()
                })
            },
            addDefault: function(t) {
                if (t = t || this.conf.deftags) {
                    t = t.split(",");
                    for (var e = 0, n = t.length; n > e; e++) this.addTags("", t[e])
                }
            },
            initTags: function(t, e) {
                function n(t, e) {
                    var n = document.createElement("IFRAME");
                    return n.src = t, n.id = e, n
                }
                this.getDoms(), document.domain = "csdn.net";
                var i = this.conf.inst,
                    o = this.conf.proxyId || "proxyId",
                    a = this.conf.proxy || "http://recommend.api.csdn.net/proxy.html?X-ACL-TOKEN=tag_suggest_kdfjkqwuiplkajmncbsb_token";
                this.title = t || this.conf.title, this.content = e || this.conf.content, this.onGetTag = function(t) {
                    for (var e = 0, n = "", i = "", o = t.length; o > e; e++) n = t[e], i += '<a href="#">' + n.name + "</a>";
                    this.Dom.tagWrap.html(i)
                }, a += "&contentId=" + i;
                var r = document.getElementById(o);
                r && $(r).remove(), r = $(n(a, o)), r.appendTo($("body")), $(r).hide()
            },
            initToolkit: function() {
                var t = this,
                    e = this.conf.toolkitUrl;
                $.getScript(e, function() {
                    t.toolkit = n.toolkit
                })
            },
            initComponent: function() {
                var t = this,
                    e = this.conf.componentsUrl;
                $.getScript(e, function() {
                    t.comp = n.comp
                })
            },
            eventHandler: function(t) {
                var e = this,
                    n = t.type,
                    i = t.target,
                    o = i.value,
                    a = i === this.Dom.input[0] ? this.Dom.input.parent() : "";
                "blur" == n && i === this.Dom.input[0] && "" !== this.Dom.input.val() && (this.validate(o, t, function(n) {
                    n !== !0 ? e.comp.tip(a, n) : e.addTags(t)
                }), "" == this.Dom.input.val() && (this.Dom.input[0].style.background = "")), "keyup" == n && i === this.Dom.input[0] && this.validate(o, t, function(n) {
                    n !== !0 ? e.comp.tip(a, n) : e.addTags(t)
                }), "keydown" == n && i === this.Dom.input[0] && "" == o && 8 == t.keyCode && this.delTag(t)
            },
            validate: function(t, n, a) {
                function r(t) {
                    t && "" != p.Dom.input.val() ? (p.Dom.input.addClass("pink"), h = !0) : (p.Dom.input.removeClass("pink"), h = !1)
                }

                function s(t) {
                    t.length > i ? (r(1), m = "最多不要超过" + i + "字", h = !0) : r()
                }

                function l() {
                    p.tagsDataArr.length >= o && (m = "最多不要超过" + o + "个", h = !0)
                }

                function c(t) {
                    $.inArray(e(t.replace(/,*/g, "")), p.tagsDataArr) >= 0 && (m = "tag请不要重复", h = !0)
                }

                function u() {
                    h = !1, r(0), f(!0), a(!0)
                }
                var d = n.type,
                    p = this;
                n.target;
                var f = this.conf.onValidate,
                    h = !1,
                    m = "";
                if ("" == t) return u(), void 0;
                if ("blur" == d) {
                    var g = t.replace(/,*/g, "");
                    this.Dom.input.val(g)
                }
                if (s(t.replace(/,*/g, "")), l(), c(t), "keyup" == d) {
                    if (t.indexOf(",") < 0) return;
                    var g = t.replace(/,*/g, "");
                    this.Dom.input.val(g)
                }
                return h && m ? (r(1), f(m), a(m), void 0) : (u(), void 0)
            },
            addTags: function(t, n) {
                var i = this.Dom.input[0],
                    o = t && t.target,
                    r = "";
                if ("INPUT" != o.tagName && (r = $(o).text()), n = n || r || i.value, n = e(n.replace(/,*/g, "")), !n) return $(i).val(""), void 0;
                var s = $("<span lang=" + a++ +">" + n + '<a class="del" href="#"></a></span>');
                s.insertBefore(i), this.addTagsData(n), i.size = 1, i.value = "", this.showSuggestions(), this.Dom.input.show().focus()
            },
            delTag: function(t) {
                var n = t.type,
                    i = $(t.target);
                i.lang;
                var o = "";
                e(i.text()), 8 == t.keyCode && (o = $(i).prev(), this.delTagData(o.text()), o.remove()), "click" == n && i.hasClass("del") && (o = i.parent().filter("span"), this.delTagData(o.text()), o.remove()), "dblclick" == n && i.children().filter(".del").length > 0 && (o = i, this.delTagData(o.text()), i.remove()), this.showSuggestions()
            },
            addTagsData: function(t) {
                this.tagsDataArr.push(t)
            },
            delTagData: function(t) {
                t = e(t);
                for (var n = this.tagsDataArr, i = 0, o = n.length, a = "", r = []; o > i;) a = n[i], a != t && r.push(a), i++;
                this.tagsDataArr = r
            },
            hideSuggestions: function() {
                "" == this.Dom.input.val() && "none" != this.Dom.suggestion[0].style.display && this.validate(this.Dom.input.val(), "", function() {}), this.Dom.suggestion.css({
                    top: this.conf.wraper.height()
                }), this.Dom.suggestion.fadeOut("slow")
            },
            showSuggestions: function() {
                var t = this;
                setTimeout(function() {
                    t.Dom.suggestion.css({
                        top: t.conf.wraper.height()
                    })
                }, 100), this.Dom.suggestion.fadeIn("fast")
            },
            autoWidth: function(t) {
                var e = 100,
                    n = t.value.replace(/[^\u0000-\u00ff]/g, "xx").length;
                e >= n && (t.size = n + 2)
            }
        }, t.csdn = n
    }(window), $(document).ready(function() {
        ! function() {
            if (!($("#main-left_menu").length > 0)) {
                var t = $('<button id="scroll-top" class="btn btn-top bbs-btn-gray28 bbs-btn-backtop" title="回到顶部">回到顶部</button>');
                t.css({
                    cursor: "pointer",
                    border: "0px none",
                    bottom: "134px",
                    width: "80px",
                    height: "28px",
                    margin: "0px",
                    padding: "0px",
                    position: "fixed",
                    right: "40px",
                    display: "block",
                    "padding-right": "13px"
                }), $("body").append(t), $(window).scroll(function() {
                    $(window).scrollTop() > 20 ? $(t).fadeIn(400) : $(t).fadeOut(400)
                }), $("body,html").scroll(function() {
                    $("body, html").scrollTop() > 20 ? $(t).fadeIn(400) : $(t).fadeOut(400)
                }), $(t).click(function() {
                    return $("body,html").animate({
                        scrollTop: 0
                    }, 400), !1
                })
            }
        }()
    }), $.extend(CSDN, {
        getUserName: function() {
            var t = document.cookie.match(new RegExp("(^| )UserName=([^;]*)(;|$)"));
            return t ? t[2] : ""
        },
        activeAttLink: function(t) {
            this.checkFollow(t);
            var e = $(t);
            e.on("click", "a.att", function(t) {
                t.preventDefault();
                var n = $(this);
                if (!n.hasClass("followed")) {
                    var i = "http://my.csdn.net/index.php/follow/do_follow?jsonpcallback=?",
                        o = n.data("username");
                    $.getJSON(i, {
                        username: o
                    }, function(t) {
                        1 == t.succ ? (alert("关注成功！"), n.addClass("followed").text("已关注"), e.find("input[value=" + o + "]").prop("checked", !1).change().prop("disabled", !0)) : alert(t.msg)
                    })
                }
            })
        },
        checkFollow: function(t) {
            var e = CSDN.getUserName().toLowerCase(),
                n = $(t);
            if ("" !== e) {
                var i = n.find("a.att").map(function(t, e) {
                        return encodeURIComponent($(e).data("username"))
                    }).get().join(),
                    o = "http://my.csdn.net/index.php/follow/check_is_followed_m/" + encodeURIComponent(e) + "/" + i + "?jsonpcallback=?";
                $.getJSON(o, {}, function(t) {
                    $.each(t, function(t, e) {
                        1 == e && (n.find("a.att[data-username=" + t + "]").addClass("followed").text("已关注"), n.find("input[value=" + t + "]").prop("checked", !1).change().prop("disabled", !0))
                    })
                }), n.find("a.att[data-username=" + e + "]").addClass("followed").text("自己")
            }
        }
    }), $(function() {
        $("select.jumpMenu").change(function() {
            var t = $(this).val();
            window.location.href = 1 != t ? window.location.pathname + "?page=" + t : window.location.pathname
        }), $("table.table_list").length > 0 && $("table.table_list tr:even").addClass("zebra"), "undefined" != typeof CNick && new CNick(".name2nick").showNickname()
    });
