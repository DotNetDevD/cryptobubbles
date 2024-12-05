!function() {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
            t(e);
        new MutationObserver((e => {
            for (const r of e)
                if ("childList" === r.type)
                    for (const e of r.addedNodes)
                        "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
        }
        )).observe(document, {
            childList: !0,
            subtree: !0
        })
    }
    function t(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const t = function(e) {
            const t = {};
            return e.integrity && (t.integrity = e.integrity),
            e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
            "use-credentials" === e.crossOrigin ? t.credentials = "include" : "anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin",
            t
        }(e);
        fetch(e.href, t)
    }
}();
const e = {
    context: void 0,
    registry: void 0
}
  , t = (e, t) => e === t
  , r = Symbol("solid-proxy")
  , n = Symbol("solid-track")
  , o = {
    equals: t
};
let i = P;
const a = 1
  , l = 2
  , s = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
};
var c = null;
let u = null
  , d = null
  , h = null
  , p = null
  , g = 0;
function f(e, t) {
    const r = d
      , n = c
      , o = 0 === e.length
      , i = void 0 === t ? n : t
      , a = o ? s : {
        owned: null,
        cleanups: null,
        context: i ? i.context : null,
        owner: i
    }
      , l = o ? e : () => e(( () => w(( () => F(a)))));
    c = a,
    d = null;
    try {
        return A(l, !0)
    } finally {
        d = r,
        c = n
    }
}
function v(e, t) {
    const r = {
        value: e,
        observers: null,
        observerSlots: null,
        comparator: (t = t ? Object.assign({}, o, t) : o).equals || void 0
    };
    return [M.bind(r), e => ("function" == typeof e && (e = e(r.value)),
    z(r, e))]
}
function m(e, t, r) {
    L(B(e, t, !1, a))
}
function b(e, t, r) {
    i = H;
    const n = B(e, t, !1, a);
    r && r.render || (n.user = !0),
    p ? p.push(n) : L(n)
}
function y(e, t, r) {
    r = r ? Object.assign({}, o, r) : o;
    const n = B(e, t, !0, 0);
    return n.observers = null,
    n.observerSlots = null,
    n.comparator = r.equals || void 0,
    L(n),
    M.bind(n)
}
function w(e) {
    if (null === d)
        return e();
    const t = d;
    d = null;
    try {
        return e()
    } finally {
        d = t
    }
}
function _(e) {
    b(( () => w(e)))
}
function C(e) {
    return null === c || (null === c.cleanups ? c.cleanups = [e] : c.cleanups.push(e)),
    e
}
function k() {
    return d
}
function x(e) {
    const t = y(e)
      , r = y(( () => E(t())));
    return r.toArray = () => {
        const e = r();
        return Array.isArray(e) ? e : null != e ? [e] : []
    }
    ,
    r
}
function M() {
    if (this.sources && this.state)
        if (this.state === a)
            L(this);
        else {
            const e = h;
            h = null,
            A(( () => T(this)), !1),
            h = e
        }
    if (d) {
        const e = this.observers ? this.observers.length : 0;
        d.sources ? (d.sources.push(this),
        d.sourceSlots.push(e)) : (d.sources = [this],
        d.sourceSlots = [e]),
        this.observers ? (this.observers.push(d),
        this.observerSlots.push(d.sources.length - 1)) : (this.observers = [d],
        this.observerSlots = [d.sources.length - 1])
    }
    return this.value
}
function z(e, t, r) {
    let n = e.value;
    return e.comparator && e.comparator(n, t) || (e.value = t,
    e.observers && e.observers.length && A(( () => {
        for (let t = 0; t < e.observers.length; t += 1) {
            const r = e.observers[t]
              , n = u && u.running;
            n && u.disposed.has(r),
            (n ? r.tState : r.state) || (r.pure ? h.push(r) : p.push(r),
            r.observers && $(r)),
            n || (r.state = a)
        }
        if (h.length > 1e6)
            throw h = [],
            new Error
    }
    ), !1)),
    t
}
function L(e) {
    if (!e.fn)
        return;
    F(e);
    const t = g;
    !function(e, t, r) {
        let n;
        const o = c
          , i = d;
        d = c = e;
        try {
            n = e.fn(t)
        } catch (l) {
            return e.pure && (e.state = a,
            e.owned && e.owned.forEach(F),
            e.owned = null),
            e.updatedAt = r + 1,
            D(l)
        } finally {
            d = i,
            c = o
        }
        (!e.updatedAt || e.updatedAt <= r) && (null != e.updatedAt && "observers"in e ? z(e, n) : e.value = n,
        e.updatedAt = r)
    }(e, e.value, t)
}
function B(e, t, r, n=a, o) {
    const i = {
        fn: e,
        state: n,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: c,
        context: c ? c.context : null,
        pure: r
    };
    return null === c || c !== s && (c.owned ? c.owned.push(i) : c.owned = [i]),
    i
}
function S(e) {
    if (0 === e.state)
        return;
    if (e.state === l)
        return T(e);
    if (e.suspense && w(e.suspense.inFallback))
        return e.suspense.effects.push(e);
    const t = [e];
    for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < g); )
        e.state && t.push(e);
    for (let r = t.length - 1; r >= 0; r--)
        if ((e = t[r]).state === a)
            L(e);
        else if (e.state === l) {
            const r = h;
            h = null,
            A(( () => T(e, t[0])), !1),
            h = r
        }
}
function A(e, t) {
    if (h)
        return e();
    let r = !1;
    t || (h = []),
    p ? r = !0 : p = [],
    g++;
    try {
        const t = e();
        return function(e) {
            h && (P(h),
            h = null);
            if (e)
                return;
            const t = p;
            p = null,
            t.length && A(( () => i(t)), !1)
        }(r),
        t
    } catch (n) {
        r || (p = null),
        h = null,
        D(n)
    }
}
function P(e) {
    for (let t = 0; t < e.length; t++)
        S(e[t])
}
function H(e) {
    let t, r = 0;
    for (t = 0; t < e.length; t++) {
        const n = e[t];
        n.user ? e[r++] = n : S(n)
    }
    for (t = 0; t < r; t++)
        S(e[t])
}
function T(e, t) {
    e.state = 0;
    for (let r = 0; r < e.sources.length; r += 1) {
        const n = e.sources[r];
        if (n.sources) {
            const e = n.state;
            e === a ? n !== t && (!n.updatedAt || n.updatedAt < g) && S(n) : e === l && T(n, t)
        }
    }
}
function $(e) {
    for (let t = 0; t < e.observers.length; t += 1) {
        const r = e.observers[t];
        r.state || (r.state = l,
        r.pure ? h.push(r) : p.push(r),
        r.observers && $(r))
    }
}
function F(e) {
    let t;
    if (e.sources)
        for (; e.sources.length; ) {
            const t = e.sources.pop()
              , r = e.sourceSlots.pop()
              , n = t.observers;
            if (n && n.length) {
                const e = n.pop()
                  , o = t.observerSlots.pop();
                r < n.length && (e.sourceSlots[o] = r,
                n[r] = e,
                t.observerSlots[r] = o)
            }
        }
    if (e.owned) {
        for (t = e.owned.length - 1; t >= 0; t--)
            F(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = e.cleanups.length - 1; t >= 0; t--)
            e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0
}
function D(e, t=c) {
    const r = function(e) {
        return e instanceof Error ? e : new Error("string" == typeof e ? e : "Unknown error",{
            cause: e
        })
    }(e);
    throw r
}
function E(e) {
    if ("function" == typeof e && !e.length)
        return E(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let r = 0; r < e.length; r++) {
            const n = E(e[r]);
            Array.isArray(n) ? t.push.apply(t, n) : t.push(n)
        }
        return t
    }
    return e
}
const V = Symbol("fallback");
function N(e) {
    for (let t = 0; t < e.length; t++)
        e[t]()
}
function O(e, t) {
    return w(( () => e(t || {})))
}
const R = e => `Stale read from <${e}>.`;
function j(e) {
    const t = "fallback"in e && {
        fallback: () => e.fallback
    };
    return y(function(e, t, r={}) {
        let o = []
          , i = []
          , a = []
          , l = 0
          , s = t.length > 1 ? [] : null;
        return C(( () => N(a))),
        () => {
            let c, u, d = e() || [];
            return d[n],
            w(( () => {
                let e, t, n, p, g, v, m, b, y, w = d.length;
                if (0 === w)
                    0 !== l && (N(a),
                    a = [],
                    o = [],
                    i = [],
                    l = 0,
                    s && (s = [])),
                    r.fallback && (o = [V],
                    i[0] = f((e => (a[0] = e,
                    r.fallback()))),
                    l = 1);
                else if (0 === l) {
                    for (i = new Array(w),
                    u = 0; u < w; u++)
                        o[u] = d[u],
                        i[u] = f(h);
                    l = w
                } else {
                    for (n = new Array(w),
                    p = new Array(w),
                    s && (g = new Array(w)),
                    v = 0,
                    m = Math.min(l, w); v < m && o[v] === d[v]; v++)
                        ;
                    for (m = l - 1,
                    b = w - 1; m >= v && b >= v && o[m] === d[b]; m--,
                    b--)
                        n[b] = i[m],
                        p[b] = a[m],
                        s && (g[b] = s[m]);
                    for (e = new Map,
                    t = new Array(b + 1),
                    u = b; u >= v; u--)
                        y = d[u],
                        c = e.get(y),
                        t[u] = void 0 === c ? -1 : c,
                        e.set(y, u);
                    for (c = v; c <= m; c++)
                        y = o[c],
                        u = e.get(y),
                        void 0 !== u && -1 !== u ? (n[u] = i[c],
                        p[u] = a[c],
                        s && (g[u] = s[c]),
                        u = t[u],
                        e.set(y, u)) : a[c]();
                    for (u = v; u < w; u++)
                        u in n ? (i[u] = n[u],
                        a[u] = p[u],
                        s && (s[u] = g[u],
                        s[u](u))) : i[u] = f(h);
                    i = i.slice(0, l = w),
                    o = d.slice(0)
                }
                return i
            }
            ));
            function h(e) {
                if (a[u] = e,
                s) {
                    const [e,r] = v(u);
                    return s[u] = r,
                    t(d[u], e)
                }
                return t(d[u])
            }
        }
    }(( () => e.each), e.children, t || void 0))
}
function U(e) {
    const t = e.keyed
      , r = y(( () => e.when), void 0, {
        equals: (e, r) => t ? e === r : !e == !r
    });
    return y(( () => {
        const n = r();
        if (n) {
            const o = e.children;
            return "function" == typeof o && o.length > 0 ? w(( () => o(t ? n : () => {
                if (!w(r))
                    throw R("Show");
                return e.when
            }
            ))) : o
        }
        return e.fallback
    }
    ), void 0, void 0)
}
function I(e) {
    let t = !1;
    const r = x(( () => e.children))
      , n = y(( () => {
        let e = r();
        Array.isArray(e) || (e = [e]);
        for (let r = 0; r < e.length; r++) {
            const n = e[r].when;
            if (n)
                return t = !!e[r].keyed,
                [r, n, e[r]]
        }
        return [-1]
    }
    ), void 0, {
        equals: (e, r) => (t ? e[1] === r[1] : !e[1] == !r[1]) && e[2] === r[2]
    });
    return y(( () => {
        const [r,o,i] = n();
        if (r < 0)
            return e.fallback;
        const a = i.children;
        return "function" == typeof a && a.length > 0 ? w(( () => a(t ? o : () => {
            if (w(n)[0] !== r)
                throw R("Match");
            return i.when
        }
        ))) : a
    }
    ), void 0, void 0)
}
function Z(e) {
    return e
}
const W = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"])
  , X = new Set(["innerHTML", "textContent", "innerText", "children"])
  , G = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for"
})
  , q = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: {
        $: "formNoValidate",
        BUTTON: 1,
        INPUT: 1
    },
    ismap: {
        $: "isMap",
        IMG: 1
    },
    nomodule: {
        $: "noModule",
        SCRIPT: 1
    },
    playsinline: {
        $: "playsInline",
        VIDEO: 1
    },
    readonly: {
        $: "readOnly",
        INPUT: 1,
        TEXTAREA: 1
    }
});
const Y = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"])
  , K = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
};
const J = "_$DX_DELEGATE";
function Q(e, t, r) {
    let n;
    const o = () => {
        const t = document.createElement("template");
        return t.innerHTML = e,
        r ? t.content.firstChild.firstChild : t.content.firstChild
    }
      , i = t ? () => w(( () => document.importNode(n || (n = o()), !0))) : () => (n || (n = o())).cloneNode(!0);
    return i.cloneNode = i,
    i
}
function ee(e, t=window.document) {
    const r = t[J] || (t[J] = new Set);
    for (let n = 0, o = e.length; n < o; n++) {
        const o = e[n];
        r.has(o) || (r.add(o),
        t.addEventListener(o, ce))
    }
}
function te(e, t, r) {
    null == r ? e.removeAttribute(t) : e.setAttribute(t, r)
}
function re(e, t) {
    null == t ? e.removeAttribute("class") : e.className = t
}
function ne(e, t, r) {
    if (!t)
        return r ? te(e, "style") : t;
    const n = e.style;
    if ("string" == typeof t)
        return n.cssText = t;
    let o, i;
    for (i in "string" == typeof r && (n.cssText = r = void 0),
    r || (r = {}),
    t || (t = {}),
    r)
        null == t[i] && n.removeProperty(i),
        delete r[i];
    for (i in t)
        o = t[i],
        o !== r[i] && (n.setProperty(i, o),
        r[i] = o);
    return r
}
function oe(e, t={}, r, n) {
    const o = {};
    return n || m(( () => o.children = ue(e, t.children, o.children))),
    m(( () => t.ref && t.ref(e))),
    m(( () => function(e, t, r, n, o={}, i=!1) {
        t || (t = {});
        for (const a in o)
            if (!(a in t)) {
                if ("children" === a)
                    continue;
                o[a] = se(e, a, null, o[a], r, i)
            }
        for (const a in t) {
            if ("children" === a) {
                n || ue(e, t.children);
                continue
            }
            const l = t[a];
            o[a] = se(e, a, l, o[a], r, i)
        }
    }(e, t, r, !0, o, !0))),
    o
}
function ie(e, t, r) {
    return w(( () => e(t, r)))
}
function ae(e, t, r, n) {
    if (void 0 === r || n || (n = []),
    "function" != typeof t)
        return ue(e, t, n, r);
    m((n => ue(e, t(), n, r)), n)
}
function le(e, t, r) {
    const n = t.trim().split(/\s+/);
    for (let o = 0, i = n.length; o < i; o++)
        e.classList.toggle(n[o], r)
}
function se(e, t, r, n, o, i) {
    let a, l, s, c, u;
    if ("style" === t)
        return ne(e, r, n);
    if ("classList" === t)
        return function(e, t, r={}) {
            const n = Object.keys(t || {})
              , o = Object.keys(r);
            let i, a;
            for (i = 0,
            a = o.length; i < a; i++) {
                const n = o[i];
                n && "undefined" !== n && !t[n] && (le(e, n, !1),
                delete r[n])
            }
            for (i = 0,
            a = n.length; i < a; i++) {
                const o = n[i]
                  , a = !!t[o];
                o && "undefined" !== o && r[o] !== a && a && (le(e, o, !0),
                r[o] = a)
            }
            return r
        }(e, r, n);
    if (r === n)
        return n;
    if ("ref" === t)
        i || r(e);
    else if ("on:" === t.slice(0, 3)) {
        const o = t.slice(3);
        n && e.removeEventListener(o, n),
        r && e.addEventListener(o, r)
    } else if ("oncapture:" === t.slice(0, 10)) {
        const o = t.slice(10);
        n && e.removeEventListener(o, n, !0),
        r && e.addEventListener(o, r, !0)
    } else if ("on" === t.slice(0, 2)) {
        const o = t.slice(2).toLowerCase()
          , i = Y.has(o);
        if (!i && n) {
            const t = Array.isArray(n) ? n[0] : n;
            e.removeEventListener(o, t)
        }
        (i || r) && (!function(e, t, r, n) {
            if (n)
                Array.isArray(r) ? (e[`$$${t}`] = r[0],
                e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
            else if (Array.isArray(r)) {
                const n = r[0];
                e.addEventListener(t, r[0] = t => n.call(e, r[1], t))
            } else
                e.addEventListener(t, r)
        }(e, o, r, i),
        i && ee([o]))
    } else if ("attr:" === t.slice(0, 5))
        te(e, t.slice(5), r);
    else if ((u = "prop:" === t.slice(0, 5)) || (s = X.has(t)) || !o && ((c = function(e, t) {
        const r = q[e];
        return "object" == typeof r ? r[t] ? r.$ : void 0 : r
    }(t, e.tagName)) || (l = W.has(t))) || (a = e.nodeName.includes("-")))
        u && (t = t.slice(5),
        l = !0),
        "class" === t || "className" === t ? re(e, r) : !a || l || s ? e[c || t] = r : e[(d = t,
        d.toLowerCase().replace(/-([a-z])/g, ( (e, t) => t.toUpperCase())))] = r;
    else {
        const n = o && t.indexOf(":") > -1 && K[t.split(":")[0]];
        n ? function(e, t, r, n) {
            null == n ? e.removeAttributeNS(t, r) : e.setAttributeNS(t, r, n)
        }(e, n, t, r) : te(e, G[t] || t, r)
    }
    var d;
    return r
}
function ce(e) {
    const t = `$$${e.type}`;
    let r = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== r && Object.defineProperty(e, "target", {
        configurable: !0,
        value: r
    }),
    Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get: () => r || document
    }); r; ) {
        const n = r[t];
        if (n && !r.disabled) {
            const o = r[`${t}Data`];
            if (void 0 !== o ? n.call(r, o, e) : n.call(r, e),
            e.cancelBubble)
                return
        }
        r = r._$host || r.parentNode || r.host
    }
}
function ue(e, t, r, n, o) {
    for (; "function" == typeof r; )
        r = r();
    if (t === r)
        return r;
    const i = typeof t
      , a = void 0 !== n;
    if (e = a && r[0] && r[0].parentNode || e,
    "string" === i || "number" === i)
        if ("number" === i && (t = t.toString()),
        a) {
            let o = r[0];
            o && 3 === o.nodeType ? o.data !== t && (o.data = t) : o = document.createTextNode(t),
            r = pe(e, r, n, o)
        } else
            r = "" !== r && "string" == typeof r ? e.firstChild.data = t : e.textContent = t;
    else if (null == t || "boolean" === i)
        r = pe(e, r, n);
    else {
        if ("function" === i)
            return m(( () => {
                let o = t();
                for (; "function" == typeof o; )
                    o = o();
                r = ue(e, o, r, n)
            }
            )),
            () => r;
        if (Array.isArray(t)) {
            const i = []
              , l = r && Array.isArray(r);
            if (de(i, t, r, o))
                return m(( () => r = ue(e, i, r, n, !0))),
                () => r;
            if (0 === i.length) {
                if (r = pe(e, r, n),
                a)
                    return r
            } else
                l ? 0 === r.length ? he(e, i, n) : function(e, t, r) {
                    let n = r.length
                      , o = t.length
                      , i = n
                      , a = 0
                      , l = 0
                      , s = t[o - 1].nextSibling
                      , c = null;
                    for (; a < o || l < i; )
                        if (t[a] !== r[l]) {
                            for (; t[o - 1] === r[i - 1]; )
                                o--,
                                i--;
                            if (o === a) {
                                const t = i < n ? l ? r[l - 1].nextSibling : r[i - l] : s;
                                for (; l < i; )
                                    e.insertBefore(r[l++], t)
                            } else if (i === l)
                                for (; a < o; )
                                    c && c.has(t[a]) || t[a].remove(),
                                    a++;
                            else if (t[a] === r[i - 1] && r[l] === t[o - 1]) {
                                const n = t[--o].nextSibling;
                                e.insertBefore(r[l++], t[a++].nextSibling),
                                e.insertBefore(r[--i], n),
                                t[o] = r[i]
                            } else {
                                if (!c) {
                                    c = new Map;
                                    let e = l;
                                    for (; e < i; )
                                        c.set(r[e], e++)
                                }
                                const n = c.get(t[a]);
                                if (null != n)
                                    if (l < n && n < i) {
                                        let s, u = a, d = 1;
                                        for (; ++u < o && u < i && null != (s = c.get(t[u])) && s === n + d; )
                                            d++;
                                        if (d > n - l) {
                                            const o = t[a];
                                            for (; l < n; )
                                                e.insertBefore(r[l++], o)
                                        } else
                                            e.replaceChild(r[l++], t[a++])
                                    } else
                                        a++;
                                else
                                    t[a++].remove()
                            }
                        } else
                            a++,
                            l++
                }(e, r, i) : (r && pe(e),
                he(e, i));
            r = i
        } else if (t.nodeType) {
            if (Array.isArray(r)) {
                if (a)
                    return r = pe(e, r, n, t);
                pe(e, r, null, t)
            } else
                null != r && "" !== r && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
            r = t
        }
    }
    return r
}
function de(e, t, r, n) {
    let o = !1;
    for (let i = 0, a = t.length; i < a; i++) {
        let a, l = t[i], s = r && r[i];
        if (null == l || !0 === l || !1 === l)
            ;
        else if ("object" == (a = typeof l) && l.nodeType)
            e.push(l);
        else if (Array.isArray(l))
            o = de(e, l, s) || o;
        else if ("function" === a)
            if (n) {
                for (; "function" == typeof l; )
                    l = l();
                o = de(e, Array.isArray(l) ? l : [l], Array.isArray(s) ? s : [s]) || o
            } else
                e.push(l),
                o = !0;
        else {
            const t = String(l);
            s && 3 === s.nodeType && s.data === t ? e.push(s) : e.push(document.createTextNode(t))
        }
    }
    return o
}
function he(e, t, r=null) {
    for (let n = 0, o = t.length; n < o; n++)
        e.insertBefore(t[n], r)
}
function pe(e, t, r, n) {
    if (void 0 === r)
        return e.textContent = "";
    const o = n || document.createTextNode("");
    if (t.length) {
        let n = !1;
        for (let i = t.length - 1; i >= 0; i--) {
            const a = t[i];
            if (o !== a) {
                const t = a.parentNode === e;
                n || i ? t && a.remove() : t ? e.replaceChild(o, a) : e.insertBefore(o, r)
            } else
                n = !0
        }
    } else
        e.insertBefore(o, r);
    return [o]
}
const ge = "http://www.w3.org/2000/svg";
function fe(t) {
    const {useShadow: r} = t
      , n = document.createTextNode("")
      , o = c;
    let i;
    return b(( () => {
        i || (i = function(e, t) {
            const r = c
              , n = d;
            c = e,
            d = null;
            try {
                return A(t, !0)
            } catch (o) {
                D(o)
            } finally {
                c = r,
                d = n
            }
        }(o, ( () => y(( () => t.children)))));
        const e = t.mount || document.body;
        if (e instanceof HTMLHeadElement) {
            const [t,r] = v(!1)
              , n = () => r(!0);
            f((r => ae(e, ( () => t() ? r() : i()), null))),
            C(n)
        } else {
            const o = function(e, t=!1) {
                return t ? document.createElementNS(ge, e) : document.createElement(e)
            }(t.isSVG ? "g" : "div", t.isSVG)
              , a = r && o.attachShadow ? o.attachShadow({
                mode: "open"
            }) : o;
            Object.defineProperty(o, "_$host", {
                get: () => n.parentNode,
                configurable: !0
            }),
            ae(a, i),
            e.appendChild(o),
            t.ref && t.ref(o),
            C(( () => e.removeChild(o)))
        }
    }
    ), void 0, {
        render: !!!e.context
    }),
    n
}
const ve = Symbol("store-raw")
  , me = Symbol("store-node")
  , be = Symbol("store-has")
  , ye = Symbol("store-self");
function we(e) {
    let t = e[r];
    if (!t && (Object.defineProperty(e, r, {
        value: t = new Proxy(e,ze)
    }),
    !Array.isArray(e))) {
        const r = Object.keys(e)
          , n = Object.getOwnPropertyDescriptors(e);
        for (let o = 0, i = r.length; o < i; o++) {
            const i = r[o];
            n[i].get && Object.defineProperty(e, i, {
                enumerable: n[i].enumerable,
                get: n[i].get.bind(t)
            })
        }
    }
    return t
}
function _e(e) {
    let t;
    return null != e && "object" == typeof e && (e[r] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
}
function Ce(e, t=new Set) {
    let r, n, o, i;
    if (r = null != e && e[ve])
        return r;
    if (!_e(e) || t.has(e))
        return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
        for (let r = 0, i = e.length; r < i; r++)
            o = e[r],
            (n = Ce(o, t)) !== o && (e[r] = n)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
        const r = Object.keys(e)
          , a = Object.getOwnPropertyDescriptors(e);
        for (let l = 0, s = r.length; l < s; l++)
            i = r[l],
            a[i].get || (o = e[i],
            (n = Ce(o, t)) !== o && (e[i] = n))
    }
    return e
}
function ke(e, t) {
    let r = e[t];
    return r || Object.defineProperty(e, t, {
        value: r = Object.create(null)
    }),
    r
}
function xe(e, t, r) {
    if (e[t])
        return e[t];
    const [n,o] = v(r, {
        equals: !1,
        internal: !0
    });
    return n.$ = o,
    e[t] = n
}
function Me(e) {
    k() && xe(ke(e, me), ye)()
}
const ze = {
    get(e, t, o) {
        if (t === ve)
            return e;
        if (t === r)
            return o;
        if (t === n)
            return Me(e),
            o;
        const i = ke(e, me)
          , a = i[t];
        let l = a ? a() : e[t];
        if (t === me || t === be || "__proto__" === t)
            return l;
        if (!a) {
            const r = Object.getOwnPropertyDescriptor(e, t);
            !k() || "function" == typeof l && !e.hasOwnProperty(t) || r && r.get || (l = xe(i, t, l)())
        }
        return _e(l) ? we(l) : l
    },
    has: (e, t) => t === ve || t === r || t === n || t === me || t === be || "__proto__" === t || (k() && xe(ke(e, be), t)(),
    t in e),
    set: () => !0,
    deleteProperty: () => !0,
    ownKeys: function(e) {
        return Me(e),
        Reflect.ownKeys(e)
    },
    getOwnPropertyDescriptor: function(e, t) {
        const n = Reflect.getOwnPropertyDescriptor(e, t);
        return n && !n.get && n.configurable && t !== r && t !== me ? (delete n.value,
        delete n.writable,
        n.get = () => e[r][t],
        n) : n
    }
};
function Le(e, t, r, n=!1) {
    if (!n && e[t] === r)
        return;
    const o = e[t]
      , i = e.length;
    void 0 === r ? (delete e[t],
    e[be] && e[be][t] && void 0 !== o && e[be][t].$()) : (e[t] = r,
    e[be] && e[be][t] && void 0 === o && e[be][t].$());
    let a, l = ke(e, me);
    if ((a = xe(l, t, o)) && a.$(( () => r)),
    Array.isArray(e) && e.length !== i) {
        for (let t = e.length; t < i; t++)
            (a = l[t]) && a.$();
        (a = xe(l, "length", i)) && a.$(e.length)
    }
    (a = l[ye]) && a.$()
}
function Be(e, t) {
    const r = Object.keys(t);
    for (let n = 0; n < r.length; n += 1) {
        const o = r[n];
        Le(e, o, t[o])
    }
}
function Se(e, t, r=[]) {
    let n, o = e;
    if (t.length > 1) {
        n = t.shift();
        const i = typeof n
          , a = Array.isArray(e);
        if (Array.isArray(n)) {
            for (let o = 0; o < n.length; o++)
                Se(e, [n[o]].concat(t), r);
            return
        }
        if (a && "function" === i) {
            for (let o = 0; o < e.length; o++)
                n(e[o], o) && Se(e, [o].concat(t), r);
            return
        }
        if (a && "object" === i) {
            const {from: o=0, to: i=e.length - 1, by: a=1} = n;
            for (let n = o; n <= i; n += a)
                Se(e, [n].concat(t), r);
            return
        }
        if (t.length > 1)
            return void Se(e[n], t, [n].concat(r));
        o = e[n],
        r = [n].concat(r)
    }
    let i = t[0];
    "function" == typeof i && (i = i(o, r),
    i === o) || void 0 === n && null == i || (i = Ce(i),
    void 0 === n || _e(o) && _e(i) && !Array.isArray(i) ? Be(o, i) : Le(e, n, i))
}
function Ae(...[e,t]) {
    const r = Ce(e || {})
      , n = Array.isArray(r);
    return [we(r), function(...e) {
        A(( () => {
            n && 1 === e.length ? function(e, t) {
                if ("function" == typeof t && (t = t(e)),
                t = Ce(t),
                Array.isArray(t)) {
                    if (e === t)
                        return;
                    let r = 0
                      , n = t.length;
                    for (; r < n; r++) {
                        const n = t[r];
                        e[r] !== n && Le(e, r, n)
                    }
                    Le(e, "length", n)
                } else
                    Be(e, t)
            }(r, e[0]) : Se(r, e)
        }
        ), !1)
    }
    ]
}
const Pe = Symbol("store-root");
function He(e, t, r, n, o) {
    const i = t[r];
    if (e === i)
        return;
    const a = Array.isArray(e);
    if (r !== Pe && (!_e(e) || !_e(i) || a !== Array.isArray(i) || o && e[o] !== i[o]))
        return void Le(t, r, e);
    if (a) {
        if (e.length && i.length && (!n || o && e[0] && null != e[0][o])) {
            let t, r, a, l, s, c, u, d;
            for (a = 0,
            l = Math.min(i.length, e.length); a < l && (i[a] === e[a] || o && i[a] && e[a] && i[a][o] === e[a][o]); a++)
                He(e[a], i, a, n, o);
            const h = new Array(e.length)
              , p = new Map;
            for (l = i.length - 1,
            s = e.length - 1; l >= a && s >= a && (i[l] === e[s] || o && i[a] && e[a] && i[l][o] === e[s][o]); l--,
            s--)
                h[s] = i[l];
            if (a > s || a > l) {
                for (r = a; r <= s; r++)
                    Le(i, r, e[r]);
                for (; r < e.length; r++)
                    Le(i, r, h[r]),
                    He(e[r], i, r, n, o);
                return void (i.length > e.length && Le(i, "length", e.length))
            }
            for (u = new Array(s + 1),
            r = s; r >= a; r--)
                c = e[r],
                d = o && c ? c[o] : c,
                t = p.get(d),
                u[r] = void 0 === t ? -1 : t,
                p.set(d, r);
            for (t = a; t <= l; t++)
                c = i[t],
                d = o && c ? c[o] : c,
                r = p.get(d),
                void 0 !== r && -1 !== r && (h[r] = i[t],
                r = u[r],
                p.set(d, r));
            for (r = a; r < e.length; r++)
                r in h ? (Le(i, r, h[r]),
                He(e[r], i, r, n, o)) : Le(i, r, e[r])
        } else
            for (let t = 0, r = e.length; t < r; t++)
                He(e[t], i, t, n, o);
        return void (i.length > e.length && Le(i, "length", e.length))
    }
    const l = Object.keys(e);
    for (let c = 0, u = l.length; c < u; c++)
        He(e[l[c]], i, l[c], n, o);
    const s = Object.keys(i);
    for (let c = 0, u = s.length; c < u; c++)
        void 0 === e[s[c]] && Le(i, s[c], void 0)
}
function Te(e, t={}) {
    const {merge: r, key: n="id"} = t
      , o = Ce(e);
    return e => {
        if (!_e(e) || !_e(o))
            return o;
        const t = He(o, {
            [Pe]: e
        }, Pe, r, n);
        return void 0 === t ? e : t
    }
}
let $e = Date.now();
function Fe() {
    return "" + $e++
}
function De(e, t) {
    return {
        id: Fe(),
        name: "",
        color: "performance",
        content: "performance",
        size: t,
        period: e
    }
}
var Ee = Q('<svg viewBox="0 0 2500 2500"><path fill=#fdd430 d=M764.48,1050.52,1250,565l485.75,485.73,282.5-282.5L1250,0,482,768l282.49,282.5M0,1250,282.51,967.45,565,1249.94,282.49,1532.45Zm764.48,199.51L1250,1935l485.74-485.72,282.65,282.35-.14.15L1250,2500,482,1732l-.4-.4,282.91-282.12M1935,1250.12l282.51-282.51L2500,1250.1,2217.5,1532.61Z></path><path fill=#fdd430 d=M1536.52,1249.85h.12L1250,963.19,1038.13,1175h0l-24.34,24.35-50.2,50.21-.4.39.4.41L1250,1536.81l286.66-286.66.14-.16-.26-.14>');
var Ve = Q('<svg viewBox="0 0 150 150"><defs><linearGradient id=d x1=17.68 y1=116.45 x2=132.14 y2=32.11 gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#2a54ff></stop><stop offset=.52 stop-color=#2143cb></stop><stop offset=1 stop-color=#2a54ff></stop></linearGradient></defs><path fill=url(#d) d=M140.2,22.33c-25.18-.09-49.79,10.83-66.63,29.47-6.06,6.27-10.1,13.95-14.96,21.06-11.64,15.93-29.81,25.14-49.5,25.13h0v28.65h0c25.17,.1,49.78-10.86,66.63-29.5,6.03-6.27,10.13-13.94,14.96-21.06,11.64-15.91,29.81-25.12,49.5-25.11V22.33h0Z></path><path fill=#2a54ff d=M140.2,97.99c-19.68,0-37.86-9.2-49.5-25.11-4.81-7.12-8.92-14.78-14.94-21.06C58.95,33.18,34.3,22.24,9.13,22.35h0v28.65h0c21.8-.11,42.05,11.62,53.01,30.46,3.22,5.62,7.06,10.9,11.45,15.74,16.83,18.63,41.46,29.59,66.63,29.5l-.02-28.7h0Z>');
var Ne = Q('<svg viewBox="0 0 40 40"><rect x=0 width=40 height=40 rx=8.7109404 fill=#00f0ff y=0></rect><path d="m 18.459617,15.7671 h 7.4686 l 7.6404,7.5916 c 0.497,0.4938 0.4996,1.2971 0.0051,1.7934 L 23.775317,35 h -7.6937 l 2.326,-2.2613 8.54,-8.4861 -8.4316,-8.4862"fill=#1b1b1b></path><path d="m 21.529217,24.2336 h -7.4686 l -7.64042,-7.5917 c -0.49702,-0.4938 -0.49956,-1.297 -0.00508,-1.7934 L 16.213517,5 h 7.6937 l -2.326,2.26132 -8.54,8.48608 8.4316,8.4862"fill=#1b1b1b>');
var Oe = Q('<svg viewBox="-20 0 267 267"><path d="M144.047 191.872H62.2373V199.02H144.047V191.872Z"fill=#000></path><path d="M82.7124 236.335H21.3479V243.484H82.7124V236.335Z"fill=#000></path><path d="M41.732 191.903H0.903076V199.051H41.732V191.903Z"fill=#000></path><path d="M144.047 171.215H82.6821V178.363H144.047V171.215Z"fill=#000></path><path d="M62.1768 171.215H21.3782V178.363H62.1768V171.215Z"fill=#000></path><path d="M144.046 78.8052H41.7622V85.9533H144.046V78.8052Z"fill=#000></path><path d="M62.1768 55.0293H21.3479V62.1774H62.1768V55.0293Z"fill=#000></path><path d="M198.293 123.753V123.572C205.417 111.129 209.151 97.0353 209.122 82.6979C209.093 68.3604 205.302 54.2817 198.128 41.8681C190.954 29.4546 180.648 19.141 168.24 11.9578C155.832 4.77458 141.756 0.973239 127.418 0.933594H41.7623V11.1711H127.661C138.664 11.2147 149.509 13.7924 159.354 18.7043C169.2 23.6162 177.782 30.7303 184.435 39.4946C191.087 48.259 195.631 58.438 197.714 69.2421C199.797 80.0462 199.363 91.185 196.446 101.794C198.583 92.6172 198.622 83.0763 196.56 73.8821C194.498 64.6879 190.388 56.0774 184.537 48.6918C178.685 41.3062 171.243 35.336 162.764 31.2257C154.285 27.1155 144.988 24.9711 135.566 24.9524H62.2374V35.1899H135.657C143.884 35.1927 151.995 37.1361 159.33 40.8623C166.665 44.5885 173.018 49.9923 177.872 56.6349C182.726 63.2775 185.945 70.9715 187.267 79.0918C188.589 87.2122 187.978 95.5299 185.481 103.369C187.086 97.3209 187.285 90.9853 186.062 84.8483C184.838 78.7113 182.226 72.9359 178.425 67.965C174.624 62.9941 169.734 58.9598 164.132 56.1714C158.53 53.383 152.364 51.9146 146.106 51.8788H82.5004V62.2072H145.803C151.18 62.2172 156.459 63.6355 161.117 66.3209C165.775 69.0063 169.647 72.865 172.35 77.5128C175.052 82.1606 176.489 87.4352 176.519 92.8114C176.548 98.1876 175.169 103.478 172.518 108.155C163.369 104.753 153.687 103.009 143.925 103.006H62.1465V113.243H143.925C160.607 113.246 176.765 119.068 189.614 129.706C202.464 140.343 211.2 155.131 214.316 171.518C211.207 157.983 203.603 145.901 192.745 137.243C181.886 128.585 168.414 123.862 154.526 123.844H41.7321V133.991H154.678C166.943 134.032 178.785 138.482 188.043 146.527C197.3 154.573 203.357 165.679 205.108 177.818C203.381 168.414 198.416 159.912 191.074 153.787C183.732 147.662 174.477 144.302 164.915 144.289H41.7926V154.527H164.885C173.023 154.527 180.827 157.759 186.581 163.513C192.335 169.267 195.567 177.071 195.567 185.209C195.567 193.346 192.335 201.15 186.581 206.904C180.827 212.658 173.023 215.891 164.885 215.891H21.3479V226.129H164.915C174.477 226.116 183.732 222.756 191.074 216.631C198.416 210.506 203.381 202.003 205.108 192.599C203.333 204.748 197.246 215.853 187.959 223.883C178.671 231.914 166.804 236.334 154.526 236.336H103.036V246.573H154.526C167.864 246.555 180.833 242.199 191.477 234.161C202.12 226.124 209.861 214.842 213.528 202.019C209.696 217.553 200.777 231.359 188.191 241.239C175.606 251.118 160.077 256.504 144.077 256.538H41.8835V266.776H143.925C160.566 266.856 176.835 261.858 190.561 252.448C204.286 243.039 214.814 229.666 220.739 214.116C226.664 198.566 227.705 181.578 223.721 165.421C219.737 149.264 210.919 134.707 198.445 123.693L198.293 123.753Z"fill=#000>');
var Re = Q('<svg viewBox="8 8 84 84"><path fill=#F7A600 d=m69.17248,54.28325l0,-22.3572l4.4939,0l0,22.3572l-4.4939,0z></path><path fill=white d="m16.79825,60.92435l-9.63407,0l0,-22.35719l9.24666,0c4.49394,0 7.11244,2.44919 7.11244,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.1679,2.0404 3.1679,5.0249c0,4.1749 -2.9407,6.4359 -7.04723,6.4359zm-0.74311,-18.4628l-4.39706,0l0,5.1497l4.39706,0c1.90714,0 2.97424,-1.0364 2.97424,-2.5757c0,-1.5376 -1.0671,-2.574 -2.97424,-2.574zm0.29055,9.0749l-4.68761,0l0,5.4952l4.68761,0c2.03739,0 3.00589,-1.2553 3.00589,-2.7638c0,-1.5068 -0.9703,-2.7314 -3.00589,-2.7314z"></path><path fill=white d=m37.55238,51.75535l0,9.169l-4.4622,0l0,-9.169l-6.9187,-13.18819l4.8813,0l4.3002,9.01159l4.2351,-9.01159l4.8813,0l-6.917,13.18819z></path><path fill=white d="m57.20988,60.92435l-9.6341,0l0,-22.35719l9.2467,0c4.4939,0 7.1124,2.44919 7.1124,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.168,2.0404 3.168,5.0249c0,4.1749 -2.9408,6.4359 -7.0473,6.4359zm-0.7431,-18.4628l-4.3971,0l0,5.1497l4.3971,0c1.9071,0 2.9742,-1.0364 2.9742,-2.5757c0,-1.5376 -1.0671,-2.574 -2.9742,-2.574zm0.2905,9.0749l-4.6876,0l0,5.4952l4.6876,0c2.0374,0 3.0059,-1.2553 3.0059,-2.7638c0,-1.5068 -0.9685,-2.7314 -3.0059,-2.7314z"></path><path fill=white d=m88.15018,42.46155l0,18.4645l-4.4939,0l0,-18.4645l-6.0136,0l0,-3.89439l16.5211,0l0,3.89439l-6.0136,0z>');
var je = Q('<svg viewBox="62 62 900 900"><path d="M512.147 692C412.697 692 332.146 611.45 332.146 512C332.146 412.55 412.697 332 512.147 332C601.247 332 675.197 396.95 689.447 482H870.797C855.497 297.2 700.846 152 512.147 152C313.396 152 152.146 313.25 152.146 512C152.146 710.75 313.396 872 512.147 872C700.846 872 855.497 726.8 870.797 542H689.297C675.047 627.05 601.247 692 512.147 692Z"fill=#fff>');
var Ue = Q('<svg viewBox="0 0 229 229"><path fill=#2354e6 d="M114.475154,177.475321 C79.7034538,177.475321 51.5151256,149.282841 51.5151256,114.500713 C51.5151256,79.7209602 79.7034538,51.5237291 114.475154,51.5237291 L114.475154,-0.000950201555 C51.2515057,-0.000950201555 -1.68750626e-14,51.2624237 -1.68750626e-14,114.500713 C-1.68750626e-14,177.736626 51.2515057,229 114.475154,229 C177.696428,229 228.950308,177.736626 228.950308,114.500713 L177.435183,114.500713 C177.435183,149.282841 149.246855,177.475321 114.475154,177.475321"></path><polygon fill=#17E6A1 points="114.474679 114.499287 177.434708 114.499287 177.434708 51.5246793 114.474679 51.5246793">');
var Ie = Q('<svg viewBox="0 0 24 24"><path fill=#24ae8f d="m7.9 12 7.1 6.5 4.5-4.1a2 1.9 0 1 1 2.9 2.6l-5.9 5.4a2.1 1.9 0 0 1-2.9 0l-8.5-7.8v4.7a2 1.9 0 1 1-4.1 0v-15a2 1.9 0 1 1 4.1 0v4.7l8.5-7.8a2.1 1.9 0 0 1 2.9 0l5.9 5.4a2 1.9 0 1 1-2.9 2.6l-4.5-4.1zm7.1-1.9a2 1.9 0 1 0 2 1.9 2 1.9 0 0 0-2-1.9z">');
var Ze = Q('<svg viewBox="0 0 2500 2500"><path d="M2459.7,1566.6l-540.6-937.7c-118.5-195.5-407.5-197.5-521.9,8.3l-567.6,975.2 c-106,178.8,25,403.3,237.1,403.3H2204C2418.1,2015.7,2578.2,1784.9,2459.7,1566.6z"fill=#003087></path><path d="M1680,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-457.4-794.3C971,439.7,690.3,425.1,571.8,647.6 L39.5,1568.7c-110.2,193.4,20.8,444.9,259.9,447h1131.1h482.4h286.9C1906.7,2017.8,1813.1,1866,1680,1639.4L1680,1639.4z"fill=#1972E2></path><linearGradient id=mexc-gradient gradientUnits=userSpaceOnUse x1=703.637 y1=1211.6566 x2=1935.647 y2=727.2267 gradientTransform="matrix(1 0 0 -1 0 2500)"><stop offset=0></stop><stop offset=1></stop></linearGradient><path d="M1680.1,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-295.3-519.8l-424.2,723.6 c-106,178.8,25,403.4,237,403.4h363.9h482.4h289C1904.6,2015.7,1813.1,1866,1680.1,1639.4L1680.1,1639.4z"fill=url(#mexc-gradient)>');
var We = Q('<svg viewBox="0 0 24 24"><rect x=1 y=1 width=22 height=22 fill=#000></rect><rect x=6 y=6 width=4 height=4 fill=#fff></rect><rect x=14 y=6 width=4 height=4 fill=#fff></rect><rect x=10 y=10 width=4 height=4 fill=#fff></rect><rect x=6 y=14 width=4 height=4 fill=#fff></rect><rect x=14 y=14 width=4 height=4 fill=#fff>');
var Xe = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#055e1c d="M0 85.333h512v341.333H0z"></path><g fill=#FFF><path d="M183.548 289.386c0 12.295 9.731 22.261 21.736 22.261h65.208c0 10.244 8.11 18.551 18.114 18.551h21.736c10.004 0 18.114-8.306 18.114-18.551v-22.261H183.548zM330.264 181.791v51.942c0 8.183-6.5 14.84-14.491 14.84v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.942h-21.735zM174.491 233.734c0 8.183-6.5 14.84-14.491 14.84v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.942H174.49v51.942z"></path><path d="M297.661 181.788h21.736v51.942h-21.736zM265.057 211.473c0 2.046-1.625 3.71-3.623 3.71-1.998 0-3.623-1.664-3.623-3.71v-29.682h-21.736v29.682c0 2.046-1.625 3.71-3.623 3.71s-3.623-1.664-3.623-3.71v-29.682h-21.736v29.682c0 14.32 11.376 25.971 25.358 25.971 5.385 0 10.38-1.733 14.491-4.677 4.11 2.944 9.106 4.677 14.491 4.677 1.084 0 2.15-.078 3.2-.215-1.54 6.499-7.255 11.345-14.068 11.345v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.943h-21.736l.002 29.682z"></path><path d="M207.093 248.57h32.601v22.261h-32.601z">');
const Ge = {
    id: "ar",
    flag: () => Xe(),
    name: "العربية",
    loading: "جاري تحميل المحتوى...",
    currencyName: "أسم",
    settings: "الإعدادات",
    currency: "عملة",
    language: "لغة",
    colors: "الألوان",
    red_green: "أحمر + أخضر",
    yellow_blue: "أصفر + أزرق",
    rank: "الرتبة",
    marketcap: "القيمة السوقية",
    volume: "الحجم س24",
    price: "السعر",
    dominance: "الهيمنة",
    performance: "الاداء",
    neutral: "طبيعي",
    period_hour: "ساعة",
    period_day: "يوم",
    period_week: "أسبوع",
    period_month: "شهر",
    period_year: "سنة",
    favorites: "المفضلة",
    add_favorite: "إضافة إلى المفضلة",
    remove_favorite: "حذف من المفضلة",
    search_crypto: "البحث عن العملة الرقمية",
    bubble_size: "حجم الفقاعة",
    bubble_content: "محتوى الفقاعة",
    bubble_color: "لون الفقاعة",
    period: "الوقت",
    support_my_work: "لدعم المشروع",
    window_close: "لون النافذة",
    window_toggleExpand: "تقليص التوسع",
    configuration_add: "إضافة السلة",
    configuration_edit: "تعديل السلة",
    copy: "نسخ",
    not_found: "ليس موجود في افضل 1000 عملة",
    links: "الروابط",
    exchanges: "التبادلات",
    pages: "الصفحات",
    empty_list: "القائمة فارغة",
    delete: "حذف",
    lists: "قوائم",
    show: "عرض",
    hide: "إخفاء",
    watchlist_add: "إضافة إلى قائمة المراقبة",
    add_to_list: "إضافة إلى قائمة",
    blocklist: "قائمة الحظر",
    watchlist: "قائمة المراقبة",
    watchlists: "قوائم المراقبة",
    cancel: "إلغاء",
    confirm: "تأكيد",
    trade: "تداول",
    info_tooltip: "عرض (currency) على (service)",
    trade_tooltip: "تداول (currency) على (exchange)",
    show_more: "عرض المزيد"
};
var qe = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#D80027 d="M0 0h513v342H0z"></path><path fill=#FFDA44 d="m226.8 239.2-9.7-15.6-17.9 4.4 11.9-14.1-9.7-15.6 17.1 6.9 11.8-14.1-1.3 18.4 17.1 6.9-17.9 4.4zM290.6 82l-10.1 15.4 11.6 14.3-17.7-4.8-10.1 15.5-1-18.4-17.7-4.8 17.2-6.6-1-18.4 11.6 14.3zM236.2 25.4l-2 18.3 16.8 7.6-18 3.8-2 18.3-9.2-16-17.9 3.8 12.3-13.7-9.2-15.9 16.8 7.5zM292.8 161.8l-14.9 10.9 5.8 17.5-14.9-10.8-14.9 11 5.6-17.6-14.9-10.7 18.4-.1 5.6-17.6 5.8 17.5zM115 46.3l17.3 53.5h56.2l-45.4 32.9 17.3 53.5-45.4-33-45.5 33 17.4-53.5-45.5-32.9h56.3z">');
const Ye = {
    id: "zh",
    flag: () => qe(),
    name: "简体中文",
    loading: "内容正在加载...",
    currencyName: "货币名称",
    settings: "设置",
    currency: "货币",
    language: "语言",
    colors: "颜色",
    red_green: "红+绿",
    yellow_blue: "黄色+蓝色",
    rank: "排名",
    marketcap: "市值",
    volume: "24小时成交量",
    price: "价格",
    dominance: "支配地位",
    performance: "性能",
    neutral: "中性",
    period_hour: "小时",
    period_day: "天",
    period_week: "周",
    period_month: "月",
    period_year: "年",
    favorites: "收藏夹",
    add_favorite: "添加到收藏夹",
    remove_favorite: "从收藏中删除",
    search_crypto: "搜索加密货币",
    bubble_size: "气泡大小",
    bubble_content: "气泡内容",
    bubble_color: "气泡颜色",
    period: "期间",
    support_my_work: "支持我的工作",
    window_close: "关闭窗口",
    window_toggleExpand: "切换扩展",
    configuration_add: "添加图表",
    configuration_edit: "编辑图表",
    copy: "复制",
    not_found: "在 TOP 1000 中找不到",
    links: "链接",
    exchanges: "交流",
    pages: "页面",
    empty_list: "清单为空",
    delete: "删除",
    lists: "列表",
    show: "显示",
    hide: "隐藏",
    watchlist_add: "添加监视列表",
    add_to_list: "添加到列表",
    blocklist: "屏蔽列表",
    watchlist: "监视列表",
    watchlists: "监视列表",
    cancel: "取消",
    confirm: "确认",
    trade: "交易",
    info_tooltip: "在(service)上查看(currency)",
    trade_tooltip: "在(exchange)上交易(currency)",
    show_more: "显示更多"
};
var Ke = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#11457e d="M0 0h513v342H0z"></path><path fill=#d7141a d="M513 171v171H0l215-171z"></path><path fill=#FFF d="M513 0v171H215.185L0 0z">');
const Je = {
    id: "cs",
    flag: () => Ke(),
    name: "Čeština",
    loading: "Obsah se načítá...",
    currencyName: "Název",
    settings: "Nastavení",
    currency: "Měna",
    language: "Jazyk",
    colors: "Barvy",
    red_green: "Červená + Zelená",
    yellow_blue: "Žlutá + Modrá",
    rank: "Pořadí",
    marketcap: "Tržní kapitalizace",
    volume: "Denní objem",
    price: "Cena",
    dominance: "Dominance",
    performance: "Výkon",
    neutral: "Neutrální",
    period_hour: "Hodina",
    period_day: "Den",
    period_week: "Týden",
    period_month: "Měsíc",
    period_year: "Rok",
    favorites: "Oblíbené",
    add_favorite: "Přidat do oblíbených",
    remove_favorite: "Odebrat z oblíbených",
    search_crypto: "Hledat kryptoměnu",
    bubble_size: "Velikost bubliny",
    bubble_content: "Obsah bubliny",
    bubble_color: "Barva bubliny",
    period: "Období",
    support_my_work: "Podpořte mou práci",
    window_close: "Zavřít okno",
    window_toggleExpand: "Přepnout rozšíření",
    configuration_add: "Přidat graf",
    configuration_edit: "Upravit graf",
    copy: "Kopírovat",
    not_found: "Nenalezeno v prvních 1000",
    links: "Odkazy",
    exchanges: "Burzy",
    pages: "Stránky",
    empty_list: "Seznam je prázdný",
    delete: "Smazat",
    lists: "Seznamy",
    show: "Zobrazit",
    hide: "Skrýt",
    watchlist_add: "Přidat do sledovaných",
    add_to_list: "Přidat do seznamu",
    blocklist: "Blokovací seznam",
    watchlist: "Sledované",
    watchlists: "Sledované seznamy",
    cancel: "Zrušit",
    confirm: "Potvrdit",
    trade: "Obchodovat",
    info_tooltip: "Zobrazit (currency) na (service)",
    trade_tooltip: "Obchodovat s (currency) na (exchange)",
    show_more: "Zobrazit více"
};
var Qe = Q('<svg class=flag viewBox="0 85.5 513 342"><path fill=#FFF d="M0 199.5h513v114H0z"></path><path fill=#cd1f2a d="M0 85.5h513v114H0z"></path><path fill=#1d4185 d="M0 312h513v114H0z">');
const et = {
    id: "nl",
    flag: () => Qe(),
    name: "Nederlands",
    loading: "Inhoud wordt geladen...",
    currencyName: "Naam",
    settings: "Instellingen",
    currency: "Valuta",
    language: "Taal",
    colors: "Kleuren",
    red_green: "Rood + Groen",
    yellow_blue: "Geel + Blauw",
    rank: "Rang",
    marketcap: "Marktkapitalisatie",
    volume: "24h Volume",
    price: "Prijs",
    dominance: "Dominantie",
    performance: "Prestatie",
    neutral: "Neutraal",
    period_hour: "Uur",
    period_day: "Dag",
    period_week: "Week",
    period_month: "Maand",
    period_year: "Jaar",
    favorites: "Favorieten",
    add_favorite: "Toevoegen aan favorieten",
    remove_favorite: "Verwijderen uit favorieten",
    search_crypto: "Zoek cryptocurrencies",
    bubble_size: "Bubble grote",
    bubble_content: "Bubble inhoud",
    bubble_color: "Bubble kleur",
    period: "Periode",
    support_my_work: "Ondersteun mijn werk",
    window_close: "Sluit venster",
    window_toggleExpand: "Meer/minder informatie",
    configuration_add: "Overzicht toevoegen",
    configuration_edit: "Overzicht bewerken",
    copy: "Kopiëren",
    not_found: "Niet gevonden in de TOP 1000",
    links: "Links",
    exchanges: "Beurzen",
    pages: "Pagina's",
    empty_list: "Lijst is leeg",
    delete: "Verwijderen",
    lists: "Lijsten",
    show: "Tonen",
    hide: "Verbergen",
    watchlist_add: "Toevoegen aan watchlist",
    add_to_list: "Toevoegen aan lijst",
    blocklist: "Blocklist",
    watchlist: "Watchlist",
    watchlists: "Watchlists",
    cancel: "Annuleren",
    confirm: "Bevestigen",
    trade: "Handelen",
    info_tooltip: "(currency) op (service) bekijken",
    trade_tooltip: "(currency) op (exchange) handelen",
    show_more: "Meer tonen"
};
var tt = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M0 0h513v342H0z"></path><path fill=#D80027 d="M0 0h513v26.3H0zM0 52.6h513v26.3H0zM0 105.2h513v26.3H0zM0 157.8h513v26.3H0zM0 210.5h513v26.3H0zM0 263.1h513v26.3H0zM0 315.7h513V342H0z"></path><path fill=#2E52B2 d="M0 0h256.5v184.1H0z"></path><path fill=#FFF d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zM104.1 138.9l-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zM160.6 138.9l-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zM216.8 138.9l-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zM43.8 75.3l-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zM156.3 75.3l-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zM212.8 75.3l-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zM43.8 24.7l-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zM100 24.7l-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zM156.3 24.7l-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zM212.8 24.7l-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z">');
const rt = {
    id: "en",
    flag: () => tt(),
    name: "English",
    loading: "Content is loading...",
    currencyName: "Name",
    settings: "Settings",
    currency: "Currency",
    language: "Language",
    colors: "Colors",
    red_green: "Red + Green",
    yellow_blue: "Yellow + Blue",
    rank: "Rank",
    marketcap: "Market Cap",
    volume: "24h Volume",
    price: "Price",
    dominance: "Dominance",
    performance: "Performance",
    neutral: "Neutral",
    period_hour: "Hour",
    period_day: "Day",
    period_week: "Week",
    period_month: "Month",
    period_year: "Year",
    favorites: "Favorites",
    add_favorite: "Add to favorites",
    remove_favorite: "Remove from favorites",
    search_crypto: "Search cryptocurrency",
    bubble_size: "Bubble size",
    bubble_content: "Bubble content",
    bubble_color: "Bubble color",
    period: "Period",
    support_my_work: "Support my work",
    window_close: "Close window",
    window_toggleExpand: "Toggle expansion",
    configuration_add: "Add chart",
    configuration_edit: "Edit chart",
    copy: "Copy",
    not_found: "Not found in the TOP 1000",
    links: "Links",
    exchanges: "Exchanges",
    pages: "Pages",
    empty_list: "List is empty",
    delete: "Delete",
    lists: "Lists",
    show: "Show",
    hide: "Hide",
    watchlist_add: "Add Watchlist",
    add_to_list: "Add to List",
    blocklist: "Blocklist",
    watchlist: "Watchlist",
    watchlists: "Watchlists",
    cancel: "Cancel",
    confirm: "Confirm",
    trade: "Trade",
    info_tooltip: "View (currency) on (service)",
    trade_tooltip: "Trade (currency) on (exchange)",
    show_more: "Show More"
};
var nt = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M171 0h171v342H171z"></path><path fill=#0052B4 d="M0 0h171v342H0z"></path><path fill=#D80027 d="M342 0h171v342H342z">');
const ot = {
    id: "fr",
    flag: () => nt(),
    name: "Français",
    loading: "Le contenu est en cours de chargement...",
    currencyName: "Nom",
    settings: "Paramètres",
    currency: "Monnaie",
    language: "Langue",
    colors: "Couleurs",
    red_green: "Rouge + Vert",
    yellow_blue: "Jaune + Bleu",
    rank: "Rank",
    marketcap: "Capitalisation",
    volume: "24h Volume",
    price: "Prix",
    dominance: "Dominance",
    performance: "Performance",
    neutral: "Neutre",
    period_hour: "Heure",
    period_day: "Jour",
    period_week: "Semaine",
    period_month: "Mois",
    period_year: "Année",
    favorites: "Favoris",
    add_favorite: "Ajouter aux favoris",
    remove_favorite: "Retirer des favoris",
    search_crypto: "Rechercher crypto-monnaie",
    bubble_size: "Taille de la bulle",
    bubble_content: "Contenu de bulle",
    bubble_color: "Couleur de la bulle",
    period: "Periode",
    support_my_work: "Soutenez mon travail",
    window_close: "Fermer la fenêtre",
    window_toggleExpand: "Basculer l'expansion",
    configuration_add: "Ajouter un graphique",
    configuration_edit: "Modifier le graphique",
    copy: "Copier",
    not_found: "Non trouvé dans le TOP 1000",
    links: "Liens",
    exchanges: "Bourses",
    pages: "Pages",
    empty_list: "La liste est vide",
    delete: "Supprimer",
    lists: "Listes",
    show: "Afficher",
    hide: "Masquer",
    watchlist_add: "Ajouter à la liste de surveillance",
    add_to_list: "Ajouter à une liste",
    blocklist: "Liste noire",
    watchlist: "Liste de surveillance",
    watchlists: "Listes de surveillance",
    cancel: "Annuler",
    confirm: "Confirmer",
    trade: "Trader",
    info_tooltip: "Voir (currency) sur (service)",
    trade_tooltip: "Trader (currency) sur (exchange)",
    show_more: "Afficher plus"
};
var it = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#D80027 d="M0 0h513v342H0z"></path><path fill=#000 d="M0 0h513v114H0z"></path><path fill=#FFDA44 d="M0 228h513v114H0z">');
const at = {
    id: "de",
    flag: () => it(),
    name: "Deutsch",
    loading: "Inhalte werden geladen...",
    currencyName: "Name",
    settings: "Einstellungen",
    currency: "Währung",
    language: "Sprache",
    colors: "Farben",
    red_green: "Rot + Grün",
    yellow_blue: "Gelb + Blau",
    rank: "Rang",
    marketcap: "Marktkap.",
    volume: "Tagesvolumen",
    price: "Kurs",
    dominance: "Dominanz",
    performance: "Performance",
    neutral: "Neutral",
    period_hour: "Stunde",
    period_day: "Tag",
    period_week: "Woche",
    period_month: "Monat",
    period_year: "Jahr",
    favorites: "Favoriten",
    add_favorite: "Zu Favoriten hinzufügen",
    remove_favorite: "Von Favoriten entfernen",
    search_crypto: "Kryptowährung suchen",
    bubble_size: "Bubble Größe",
    bubble_content: "Bubble Inhalt",
    bubble_color: "Bubble Farbe",
    period: "Zeitraum",
    support_my_work: "Unterstütze mein Projekt",
    window_close: "Dialog schließen",
    window_toggleExpand: "Dialog auf/zuklappen",
    configuration_add: "Chart hinzufügen",
    configuration_edit: "Chart bearbeiten",
    copy: "Kopieren",
    not_found: "Nicht in den TOP 1000 gefunden",
    links: "Links",
    exchanges: "Börsen",
    pages: "Seiten",
    empty_list: "Liste ist leer",
    delete: "Löschen",
    lists: "Listen",
    show: "Anzeigen",
    hide: "Ausblenden",
    watchlist_add: "Merkliste hinzufügen",
    add_to_list: "Zu einer Liste hinzufügen",
    blocklist: "Blockierliste",
    watchlist: "Merkliste",
    watchlists: "Merklisten",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    trade: "Handeln",
    info_tooltip: "(currency) auf (service) anschauen",
    trade_tooltip: "(currency) auf (exchange) handeln",
    show_more: "Mehr anzeigen"
};
var lt = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M342 0H0v341.3h512V0z"></path><path fill=#6DA544 d="M0 0h171v342H0z"></path><path fill=#D80027 d="M342 0h171v342H342z">');
const st = {
    id: "it",
    flag: () => lt(),
    name: "Italian",
    loading: "Caricamento in corso...",
    currencyName: "Nome",
    settings: "Impostazioni",
    currency: "Valuta",
    language: "Lingua",
    colors: "Colori",
    red_green: "Rosso + Verde",
    yellow_blue: "Giallo + Blu",
    rank: "Rank",
    marketcap: "Cap di mercato",
    volume: "Volume 24h",
    price: "Prezzo",
    dominance: "Dominance",
    performance: "Rendimento",
    neutral: "Neutrale",
    period_hour: "Ora",
    period_day: "Giorno",
    period_week: "Settimana",
    period_month: "Mese",
    period_year: "Anno",
    favorites: "Preferiti",
    add_favorite: "Aggiungi ai preferiti",
    remove_favorite: "Rimuovi dai preferiti",
    search_crypto: "Cerca criptovalute",
    bubble_size: "Grandezza bolla",
    bubble_content: "Contenuto bolla",
    bubble_color: "Colore bolla",
    period: "Periodo",
    support_my_work: "Supporta il mio lavoro",
    window_close: "Chiudi finestra",
    window_toggleExpand: "Espansione Toggle",
    configuration_add: "Aggiungi grafico",
    configuration_edit: "Modifica grafico",
    copy: "Copia",
    not_found: "Non si trova nella TOP 1000",
    links: "Link",
    exchanges: "Borse",
    pages: "Pagine",
    empty_list: "La lista è vuota",
    delete: "Elimina",
    lists: "Liste",
    show: "Mostra",
    hide: "Nascondi",
    watchlist_add: "Aggiungi alla lista di osservazione",
    add_to_list: "Aggiungi a una lista",
    blocklist: "Lista di blocco",
    watchlist: "Lista di osservazione",
    watchlists: "Liste di osservazione",
    cancel: "Annulla",
    confirm: "Conferma",
    trade: "Commercio",
    info_tooltip: "Visualizza (currency) su (service)",
    trade_tooltip: "Scambia (currency) su (exchange)",
    show_more: "Mostra di più"
};
var ct = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M0 0h512v342H0z"></path><circle fill=#D80027 cx=256.5 cy=171 r=96>');
const ut = {
    id: "ja",
    flag: () => ct(),
    name: "日本語",
    loading: "コンテンツをロード中…",
    currencyName: "名前",
    settings: "設定",
    currency: "通貨",
    language: "言語",
    colors: "カラー",
    red_green: "赤＋緑",
    yellow_blue: "黄＋青",
    rank: "順位",
    marketcap: "時価総額",
    volume: "24h 取引高",
    price: "値段",
    dominance: "占有率",
    performance: "変動率",
    neutral: "無彩色",
    period_hour: "時間",
    period_day: "日",
    period_week: "週間",
    period_month: "ヶ月",
    period_year: "年",
    favorites: "お気に入り",
    add_favorite: "お気に入りに加える",
    remove_favorite: "お気に入りから除く",
    search_crypto: "暗号通貨を探す",
    bubble_size: "バブル サイズ",
    bubble_content: "バブル コンテンツ",
    bubble_color: "バブル カラー",
    period: "期間",
    support_my_work: "私の仕事を支援する",
    window_close: "ウィンドウを閉じる",
    window_toggleExpand: "トグル 拡張",
    configuration_add: "チャートに加える",
    configuration_edit: "チャートを編集する",
    copy: "コピー",
    not_found: "TOP1000に入っていない",
    links: "リンク",
    exchanges: "証券取引所",
    pages: "ページ",
    empty_list: "リストは空です",
    delete: "削除",
    lists: "リスト",
    show: "表示する",
    hide: "非表示にする",
    watchlist_add: "ウォッチリストに追加",
    add_to_list: "リストに追加する",
    blocklist: "ブロックリスト",
    watchlist: "ウォッチリスト",
    watchlists: "ウォッチリスト",
    cancel: "キャンセル",
    confirm: "確認",
    trade: "取引する",
    info_tooltip: "(service)で(currency)を見る",
    trade_tooltip: "(exchange)で(currency)を取引する",
    show_more: "もっと見る"
};
var dt = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#FFF d="M0 0h512v342H0z"></path><path fill=#6DA544 d="M0 0h513v114H0z"></path><path fill=#D80027 d="M0 227.9h513v114H0zM278.8 134.8c.1 2 8.7 26.2 4.4 39.4-6.6 20.3-15.8 21.8-19.8 24.5V134l-6.9-4.2-6.9 4.2v64.7c-4-2.7-12.4-2.4-19.8-24.5-4.3-12.7 5.7-37.3 5.8-39.2 0 0-9.5 8.1-15.8 24-5.9 14.8 1.9 49.6 29.5 54.8 2.3.4 4.7 5.6 7.2 5.6 2.1 0 4.1-5.2 6-5.5 28.4-4.6 35-41.7 29.9-55.6-5.4-14.6-13.6-23.5-13.6-23.5z"></path><path fill=#FFF opacity=.5 d="M44.6 98.9h22.3v24.4H44.6zM0 98.9h22.3v24.4H0zM89.2 98.9h22.3v24.4H89.2zM133.8 98.9h22.3v24.4h-22.3zM178.4 98.9h22.3v24.4h-22.3zM223 98.9h22.3v24.4H223zM267.7 98.9H290v24.4h-22.3zM312.3 98.9h22.3v24.4h-22.3zM356.9 98.9h22.3v24.4h-22.3zM401.5 98.9h22.3v24.4h-22.3zM446.1 98.9h22.3v24.4h-22.3zM490.7 98.9H513v24.4h-22.3zM44.6 216.9h22.3v25.5H44.6zM0 216.9h22.3v25.5H0zM89.2 216.9h22.3v25.5H89.2zM133.8 216.9h22.3v25.5h-22.3zM178.4 216.9h22.3v25.5h-22.3zM223 216.9h22.3v25.5H223zM267.7 216.9H290v25.5h-22.3zM312.3 216.9h22.3v25.5h-22.3zM356.9 216.9h22.3v25.5h-22.3zM401.5 216.9h22.3v25.5h-22.3zM446.1 216.9h22.3v25.5h-22.3zM490.7 216.9H513v25.5h-22.3z">');
const ht = {
    id: "fa",
    flag: () => dt(),
    name: "فارسی",
    loading: "...در حال بارگیری محتوا",
    currencyName: "رمزارز",
    settings: "تنظیمات",
    currency: "واحد پول",
    language: "زبان",
    colors: "رنگها",
    red_green: "قرمز + سبز",
    yellow_blue: "زرد + آبی",
    rank: "رتبه بندی",
    marketcap: "سرمایه بازار",
    volume: "حجم روزانه",
    price: "قیمت",
    dominance: "تسلط",
    performance: "پرفورمنس",
    neutral: "خنثی",
    period_hour: "ساعت",
    period_day: "روز",
    period_week: "هفته",
    period_month: "ماه",
    period_year: "سال",
    favorites: "علاقه مندی ها",
    add_favorite: "افزودن به علاقه مندی ها",
    remove_favorite: "از علاقه مندی ها حذف شود",
    search_crypto: "رمز ارز را جستجو کنید",
    bubble_size: "اندازه حباب",
    bubble_content: "محتوای حباب",
    bubble_color: "رنگ حباب",
    period: "بازه زمانی",
    support_my_work: "از پروژه من حمایت کنید",
    window_close: "بستن پنجره",
    window_toggleExpand: "پنجره را باز / بسته کنید",
    configuration_add: "نمودار اضافه کنید",
    configuration_edit: "نمودار را ویرایش کنید",
    copy: "کپی",
    not_found: "در TOP 1000 یافت نشد",
    links: "پیوندها",
    exchanges: "مبادلات",
    pages: "صفحات",
    empty_list: "لیست خالی است",
    delete: "حذف",
    lists: "لیست ها",
    show: "نمایش",
    hide: "مخفی کردن",
    watchlist_add: "افزودن به لیست نظارت",
    add_to_list: "افزودن به لیست",
    blocklist: "لیست مسدود",
    watchlist: "لیست نظارت",
    watchlists: "لیست های نظارتی",
    cancel: "لغو",
    confirm: "تأیید",
    trade: "معامله",
    info_tooltip: "(currency) را در (service) مشاهده کنید",
    trade_tooltip: "(currency) را در (exchange) معامله کنید",
    show_more: "نمایش بیشتر"
};
var pt = Q('<svg class=flag viewBox="0 0 16 10"><path fill=#fff d="M0 0h16v10H0z"></path><path fill=#dc143c d="M0 5h16v5H0z">');
const gt = {
    id: "pl",
    flag: () => pt(),
    name: "Polski",
    loading: "Zawartość ładuje się...",
    currencyName: "Nazwa",
    settings: "Ustawienia",
    currency: "Waluta",
    language: "Języki",
    colors: "Kolory",
    red_green: "Czerwony + Zielony",
    yellow_blue: "Żółty + Niebieski",
    rank: "Miejsce",
    marketcap: "Kapitalizacja",
    volume: "Wolumen",
    price: "Cena",
    dominance: "Udział w rynku",
    performance: "Wydajność",
    neutral: "Neutralny",
    period_hour: "Godzina",
    period_day: "Dzień",
    period_week: "Tydzień",
    period_month: "Miesiąc",
    period_year: "Rok",
    favorites: "Ulubione",
    add_favorite: "Dodaj do ulubionych",
    remove_favorite: "Usuń z ulubionych",
    search_crypto: "Szukaj kryptowalut",
    bubble_size: "Rozmiar bąbelka",
    bubble_content: "Zawartość bąbelka",
    bubble_color: "Kolor bąbelka",
    period: "Okres",
    support_my_work: "Wesprzyj moją pracę",
    window_close: "Zamknij okno",
    window_toggleExpand: "Rozszerzenie Toogle",
    configuration_add: "Dodaj wykres",
    configuration_edit: "Edytuj wykres",
    copy: "Kopia",
    not_found: "Nie znalazł się w TOP 1000",
    links: "Linki",
    exchanges: "Giełdy",
    pages: "Strony",
    empty_list: "Lista jest pusta",
    delete: "Usuń",
    lists: "Listy",
    show: "Pokaż",
    hide: "Ukryj",
    watchlist_add: "Dodaj do obserwowanych",
    add_to_list: "Dodaj do listy",
    blocklist: "Lista blokowanych",
    watchlist: "Lista obserwowanych",
    watchlists: "Listy obserwowanych",
    cancel: "Anuluj",
    confirm: "Potwierdź",
    trade: "Handel",
    info_tooltip: "Zobacz (currency) na (service)",
    trade_tooltip: "Handluj (currency) na (exchange)",
    show_more: "Pokaż więcej"
};
var ft = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#D80027 d="M0 85.337h512v341.326H0z"></path><path fill=#006600 d="M196.641 85.337v341.326H0V85.337z"></path><circle fill=#FFDA44 cx=196.641 cy=256 r=64></circle><path fill=#D80027 d="M160.638 224v40.001c0 19.882 16.118 36 36 36s36-16.118 36-36V224h-72z"></path><path fill=#FFF d="M196.638 276c-6.617 0-12-5.383-12-12v-16h24.001v16c-.001 6.616-5.385 12-12.001 12z">');
const vt = {
    id: "pt",
    flag: () => ft(),
    name: "Portugues",
    loading: "O conteúdo está carregando...",
    currencyName: "Nome",
    settings: "Configurações",
    currency: "Moeda",
    language: "Idioma",
    colors: "Cores",
    red_green: "Vermelho + Verde",
    yellow_blue: "Amarelo + Azul",
    rank: "Posição",
    marketcap: "Cap de Mercado",
    volume: "Volume em 24h",
    price: "Valor",
    dominance: "Dominação",
    performance: "Desempenho",
    neutral: "Neutra",
    period_hour: "Hora",
    period_day: "Dia",
    period_week: "Semana",
    period_month: "Mês",
    period_year: "Ano",
    favorites: "Favoritos",
    add_favorite: "Adicionar aos Favoritos",
    remove_favorite: "Remover dos Favoritos",
    search_crypto: "Pesquisar Criptomoeda",
    bubble_size: "Tamanho da bolha",
    bubble_content: "Conteúdo de bolha",
    bubble_color: "Cor da bolha",
    period: "Período",
    support_my_work: "Apóie meu trabalho",
    window_close: "Fechar a janela",
    window_toggleExpand: "Alternar expansão",
    configuration_add: "Adicionar gráfico",
    configuration_edit: "Editar gráfico",
    copy: "Cópiar",
    not_found: "Não encontrado no TOP 1000",
    links: "Ligações",
    exchanges: "Bolsas",
    pages: "Páginas",
    empty_list: "Lista vazia",
    delete: "Excluir",
    lists: "Listas",
    show: "Mostrar",
    hide: "Ocultar",
    watchlist_add: "Adicionar à lista de observação",
    add_to_list: "Adicionar à lista",
    blocklist: "Lista de bloqueio",
    watchlist: "Lista de observação",
    watchlists: "Listas de observação",
    cancel: "Cancelar",
    confirm: "Confirmar",
    trade: "Negociar",
    info_tooltip: "Ver (currency) em (service)",
    trade_tooltip: "Negociar (currency) em (exchange)",
    show_more: "Mostrar mais"
};
var mt = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#FFF d="M0 85.33v341.332h512V85.33z"></path><path fill=#0052B4 d="M0 85.333h512V426.67H0z"></path><path fill=#FFF d="M0 85.333h512v113.775H0z"></path><path fill=#D80027 d="M0 312.884h512v113.775H0z">');
const rus = {
    id: "ru",
    flag: () => mt(),
    name: "Русский",
    loading: "Содержание загружается...",
    currencyName: "Имя",
    settings: "Настройки",
    currency: "Валюта",
    language: "Язык",
    colors: "Цвета",
    red_green: "Красный + Зеленый",
    yellow_blue: "Желтый + синий",
    rank: "Рейтинг",
    marketcap: "Объём рынка",
    volume: "24ч Объём",
    price: "Цена",
    dominance: "Доминирование",
    performance: "Производительность",
    neutral: "Нейтральный",
    period_hour: "час",
    period_day: "день",
    period_week: "неделя",
    period_hour6: "6 часов",
    period_month: "месяц",
    period_year: "год",
    period_min5: "5 мин",
    favorites: "Избранное",
    add_favorite: "Добавить в избранное",
    remove_favorite: "Удалить из избранное",
    search_crypto: "Поиск криптовалюты",
    bubble_size: "размер пузыря",
    bubble_content: "контент пузыря",
    bubble_color: "Цвет пузыря",
    period: "Период",
    support_my_work: "Поддержите мою работу",
    window_close: "Закрыть окно",
    window_toggleExpand: "Переключение расширения",
    configuration_add: "Добавить графика",
    configuration_edit: "Редактирование графика",
    copy: "Копировать",
    not_found: "Не найдено в ТОП-1000",
    links: "Ссылки",
    exchanges: "Биржи",
    pages: "Страницы",
    empty_list: "Список пуст",
    delete: "Удалить",
    lists: "Списки",
    show: "Показать",
    hide: "Скрыть",
    watchlist_add: "Добавить в список наблюдения",
    add_to_list: "Добавить в список",
    blocklist: "Список блокировки",
    watchlist: "Список наблюдения",
    watchlists: "Списки наблюдения",
    cancel: "Отменить",
    confirm: "Подтвердить",
    trade: "Торговля",
    info_tooltip: "Просмотр (currency) на (service)",
    trade_tooltip: "Торговля (currency) на (exchange)",
    show_more: "Показать больше"
};
var yt = Q('<svg class=flag viewBox="0 0 22.5 15"><path fill=#D03433 d="M0 0h22.5v4H0V0zm0 11h22.5v4H0v-4z"></path><path fill=#FBCA46 d="M0 4h22.5v7H0V4z"></path><path fill=#A41517 d="M7.2 8.5c0 .3.3.5.6.5s.6-.2.6-.5L8.5 7H7.1l.1 1.5zM6.6 7c0-.3.2-.5.4-.5h1.5c.3 0 .5.2.5.4V7l-.1 1.5c-.1.6-.5 1-1.1 1-.6 0-1-.4-1.1-1L6.6 7z"></path><path fill=#A41517 d="M6.8 7.5h2V8h-.5l-.5 1-.5-1h-.5v-.5zM5.3 6h1v3.5h-1V6zm4 0h1v3.5h-1V6zm-2.5-.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v.2c0 .2-.1.3-.3.3H7c-.1 0-.2-.1-.2-.2v-.3z">');
const wt = {
    id: "es",
    flag: () => yt(),
    name: "Español",
    loading: "Contenido está cargando...",
    currencyName: "Nombre",
    settings: "Configuración",
    currency: "Moneda",
    language: "Idioma",
    colors: "Colores",
    red_green: "Rojo + Verde",
    yellow_blue: "Amarillo + Azul",
    rank: "Rango",
    marketcap: "Cap de Mercado",
    volume: "Volumen en 24h",
    price: "Valor",
    dominance: "Dominación",
    performance: "Rendimiento",
    neutral: "Neutral",
    period_hour: "Hora",
    period_day: "Día",
    period_week: "Semana",
    period_month: "Mes",
    period_year: "Año",
    favorites: "Favoritos",
    add_favorite: "Agregar a favoritos",
    remove_favorite: "Retirar de favoritos",
    search_crypto: "Busque Criptomoneda",
    bubble_size: "Tamaño de Burbuja",
    bubble_content: "Contenido de Burbuja",
    bubble_color: "Color de Burbuja",
    period: "Período",
    support_my_work: "Apoya mi trabajo",
    window_close: "Cerrar ventana",
    window_toggleExpand: "Alternar Expansión",
    configuration_add: "Agregar gráfico",
    configuration_edit: "Editar gráfico",
    copy: "Copiar",
    not_found: "No se encuentra en el TOP 1000",
    links: "Enlaces",
    exchanges: "Bolsa",
    pages: "Páginas",
    empty_list: "La lista está vacía",
    delete: "Eliminar",
    lists: "Listas",
    show: "Mostrar",
    hide: "Ocultar",
    watchlist_add: "Añadir a lista de seguimiento",
    add_to_list: "Añadir a lista",
    blocklist: "Lista de bloqueados",
    watchlist: "Lista de seguimiento",
    watchlists: "Listas de seguimiento",
    cancel: "Cancelar",
    confirm: "Confirmar",
    trade: "Negociar",
    info_tooltip: "Ver (currency) en (service)",
    trade_tooltip: "Negociar (currency) en (exchange)",
    show_more: "Mostrar más"
};
var _t = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#FFF d="M0 85.334h512V426.66H0z"></path><path fill=#0052B4 d="M0 194.056h512v123.882H0z"></path><path fill=#D80027 d="M0 85.334h512v54.522H0zM0 372.143h512v54.522H0z">');
const Ct = {
    id: "th",
    flag: () => _t(),
    name: "ไทย",
    loading: "กำลังโหลดเนื้อหา...",
    currencyName: "ชื่อ",
    settings: "การตั้งค่า",
    currency: "สกุลเงิน",
    language: "ภาษา",
    colors: "สี",
    red_green: "สีแดง + สีเขียว",
    yellow_blue: "สีเหลือง + สีน้ำเงิน",
    rank: "อันดับ",
    marketcap: "มูลค่าตลาด",
    volume: "ปริมาณการเทรด",
    price: "ราคา",
    dominance: "ความสำคัญ",
    performance: "ผลงาน",
    neutral: "เป็นกลาง",
    period_hour: "ชั่วโมง",
    period_day: "วัน",
    period_week: "สัปดาห์",
    period_month: "เดือน",
    period_year: "ปี",
    favorites: "รายการโปรด",
    add_favorite: "เพิ่มในรายการโปรด",
    remove_favorite: "ลบออกจากรายการโปรด",
    search_crypto: "ค้นหาสกุลเงินดิจิทัล",
    bubble_size: "ขนาดบัลล์",
    bubble_content: "เนื้อหาบัลล์",
    bubble_color: "สีบัลล์",
    period: "ช่วงเวลา",
    support_my_work: "สนับสนุนงานของฉัน",
    window_close: "ปิดหน้าต่าง",
    window_toggleExpand: "สลับขยาย/ย่อหน้าต่าง",
    configuration_add: "เพิ่มแผนภูมิ",
    configuration_edit: "แก้ไขแผนภูมิ",
    copy: "คัดลอก",
    not_found: "ไม่พบใน TOP 1000",
    links: "ลิงก์",
    exchanges: "ตลาดซื้อขาย",
    pages: "หน้า",
    empty_list: "รายการว่างเปล่า",
    delete: "ลบ",
    lists: "รายการ",
    show: "แสดง",
    hide: "ซ่อน",
    watchlist_add: "เพิ่มลงในรายการดู",
    add_to_list: "เพิ่มลงในรายการ",
    blocklist: "รายการบล็อก",
    watchlist: "รายการดู",
    watchlists: "รายการดู",
    cancel: "ยกเลิก",
    confirm: "ยืนยัน",
    trade: "ซื้อขาย",
    info_tooltip: "ดู (currency) บน (service)",
    trade_tooltip: "ซื้อขาย (currency) บน (exchange)",
    show_more: "แสดงเพิ่มเติม"
};
var kt = Q('<svg class=flag viewBox="0 0 513 342"><path fill=#E30A17 d="M0 0h513v342H0z"></path><path fill=#FFF d="M259.7 118.6c-13.1-9.5-29-14.6-45.3-14.5-40.8 0-73.8 30.8-73.8 68.9s33.1 68.9 73.8 68.9c17.1 0 32.9-5.4 45.3-14.5-30 38.6-85.7 45.6-124.3 15.5s-45.6-85.7-15.5-124.3 85.7-45.6 124.3-15.5c5.8 4.5 11 9.8 15.5 15.5zm39.9 65.8-18.1 21.9 1.2-28.4-26.4-10.4 27.3-7.6 1.8-28.3 15.6 23.7 27.5-7.1-17.5 22 15.3 23.9-26.7-9.7z">');
const xt = {
    id: "tr",
    flag: () => kt(),
    name: "Türkçe",
    loading: "İçerik yükleniyor...",
    currencyName: "İsim",
    settings: "Ayarlar",
    currency: "Para birimi",
    language: "Dil",
    colors: "Renkler",
    red_green: "Kırmızı + Yeşil",
    yellow_blue: "Sarı + Mavi",
    rank: "Sıralama",
    marketcap: "Piyasa Değeri",
    volume: "24s Hacim",
    price: "Değer",
    dominance: "Pazar Hakimiyeti",
    performance: "Performans",
    neutral: "Nötr",
    period_hour: "Saat",
    period_day: "Gün",
    period_week: "Hafta",
    period_month: "Ay",
    period_year: "Yıl",
    favorites: "Favoriler",
    add_favorite: "Favorilere ekle",
    remove_favorite: "Favorilerden çıkar",
    search_crypto: "Kriptopara ara",
    bubble_size: "Baloncuk boyutu",
    bubble_content: "Baloncuk içeriği",
    bubble_color: "Baloncuk rengi",
    period: "Dönem",
    support_my_work: "Çalışmalarımızı destekleyin",
    window_close: "Pencereyi kapat",
    window_toggleExpand: "Geçiş genişlet",
    configuration_add: "Grafik ekle",
    configuration_edit: "Grafik düzenle",
    copy: "Kopya",
    not_found: "İlk 1000'de bulunamadı",
    links: "Bağlantılar",
    exchanges: "Takaslar",
    pages: "Sayfalar",
    empty_list: "listesi boş",
    delete: "Sil",
    lists: "Listeler",
    show: "Göster",
    hide: "Gizle",
    watchlist_add: "İzleme listesine ekle",
    add_to_list: "Listeye ekle",
    blocklist: "Engelleme listesi",
    watchlist: "İzleme listesi",
    watchlists: "İzleme listeleri",
    cancel: "İptal",
    confirm: "Onayla",
    trade: "İşlem yap",
    info_tooltip: "(currency) için (service)'te görüntüle",
    trade_tooltip: "(currency) için (exchange) borsasında işlem yap",
    show_more: "Daha fazla göster"
};
var Mt = Q('<svg class=flag viewBox="0 85.333 512 341.333"><path fill=#FFDA44 d="M0 85.337h512v341.326H0z"></path><path fill=#338AF3 d="M0 85.337h512V256H0z">');
const zt = {
    id: "uk",
    flag: () => Mt(),
    name: "Українська",
    loading: "Завантаження контенту...",
    currencyName: "Ім'я",
    settings: "Налаштування",
    currency: "Валюта",
    language: "Мова",
    colors: "Кольори",
    red_green: "Червоний + Зелений",
    yellow_blue: "Жовтий + Синій",
    rank: "Ранг",
    marketcap: "Капіталізація",
    volume: "Обсяг за 24 години",
    price: "Ціна",
    dominance: "Домінантність",
    performance: "Динаміка",
    neutral: "Нейтрально",
    period_hour: "Година",
    period_day: "День",
    period_week: "Тиждень",
    period_month: "Місяць",
    period_year: "Рік",
    favorites: "Вибрані",
    add_favorite: "Додати до обраного",
    remove_favorite: "Видалити з обраного",
    search_crypto: "Пошук криптовалюти",
    bubble_size: "Розмір бульбашки",
    bubble_content: "Зміст бульбашки",
    bubble_color: "Колір бульбашки",
    period: "Період",
    support_my_work: "Підтримайте мою роботу",
    window_close: "Закрити вікно",
    window_toggleExpand: "Розгорнути/згорнути вікно",
    configuration_add: "Додати графік",
    configuration_edit: "Редагувати графік",
    copy: "Копіювати",
    not_found: "Не знайдено в ТОП-1000",
    links: "Посилання",
    exchanges: "Біржі",
    pages: "Сторінки",
    empty_list: "Список порожній",
    delete: "Видалити",
    lists: "Списки",
    show: "Показати",
    hide: "Сховати",
    watchlist_add: "Додати в спостереження",
    add_to_list: "Додати до списку",
    blocklist: "Блок-список",
    watchlist: "Спостереження",
    watchlists: "Списки спостереження",
    cancel: "Скасувати",
    confirm: "Підтвердити",
    trade: "Торгувати",
    info_tooltip: "Переглянути (currency) на (service)",
    trade_tooltip: "Торгувати (currency) на (exchange)",
    show_more: "Показати більше"
}
  , Lt = class {
}
;
Lt.app = "Crypto Bubbles",
Lt.x = "CryptoBubbles",
Lt.telegram = "CryptoBubbles",
Lt.email = "contact@cryptobubbles.net",
Lt.logo = "/images/logo64.png",
Lt.playStore = "https://play.google.com/store/apps/details?id=net.cryptobubbles",
Lt.appStore = "https://apps.apple.com/app/id1599892658",
Lt.bubblePadding = Math.round(2 * window.devicePixelRatio),
Lt.bubbleBorder = Math.round(2 * window.devicePixelRatio),
Lt.bubbleHitbox = Math.round(4 * window.devicePixelRatio),
Lt.sliceFilters = [100].map((e => ({
    type: "slice",
    from: e - 99,
    to: e
}))),
Lt.baseCurrencies = [{
    id: "usd",
    symbol: "$",
    code: "USD"
}],
Lt.translations = [rt, rus, vt, ot, at, ht, gt, wt, et, st, xt, Ge, Ct, ut, Ye, zt, Je],
Lt.periods = ["min5", "hour", "hour6", "day"],
Lt.exchanges = [
    {
        id: "dex",
        name: "dex",
        isOnTradingView: !0,
        referralUrl: "https://dexscreener.com/",
        getSpotTradeUrl: e => `https://dexscreener.com/`,
        iconComponent: e => {
            return oe(t = Ee(), e, !0, !0),
            t;
            var t
        }
    }];
let Bt = Lt;
function St(e) {
    const t = {};
    for (const r of e)
        t[r] = !0;
    return t
}
function At(e) {
    const t = [];
    for (const r in e)
        e[r] && t.push(r);
    return t
}
const Pt = "settings";
let Ht = "";
class Tt {
    static generateSave() {
        const e = tr.map((e => ({
            id: e.id,
            name: e.name,
            items: At(e.record)
        })));
        return {
            baseCurrency: Nt(),
            translation: Ut(),
            configurations2: Xt,
            configurationId2: qt(),
            favoritesCMC: At(Kt),
            listBlock: At(Qt),
            listsWatch: e,
            currencyFilter: Rt(),
            colors: Zt(),
            hideStables: nr()
        }
    }
    static save(e) {
        const t = JSON.stringify(e);
        if (Ht !== t)
            try {
                localStorage.setItem(Pt, t),
                Ht = t
            } catch {}
    }
    static load() {
        try {
            const e = localStorage.getItem(Pt);
            if (e) {
                const t = JSON.parse(e);
                if (t) {
                    if (t.configurations2) {
                        let e = !0;
                        for (const r of t.configurations2)
                            if (!r.name.startsWith("Chart #")) {
                                e = !1;
                                break
                            }
                        e && (t.configurations2 = void 0)
                    }
                    return t
                }
            }
        } catch {}
        return null
    }
}
function $t() {
    return {
        id: Fe(),
        name: "",
        record: {}
    }
}
const Ft = Tt.load()
  , Dt = (null == (Et = Ft) ? void 0 : Et.configurations2) && Et.configurations2.length > 0 ? Et.configurations2 : [De("hour", "performance"), De("day", "performance"), De("week", "performance"), De("month", "performance"), De("year", "performance"), De("day", "marketcap")];
var Et;
const Vt = (null == Ft ? void 0 : Ft.baseCurrency) || Bt.baseCurrencies[0].id
  , [Nt,Ot] = v(Vt)
  , [Rt,jt] = v((null == Ft ? void 0 : Ft.currencyFilter) || Bt.sliceFilters[0])
  , [Ut,It] = v(function(e) {
    if (null == e ? void 0 : e.translation)
        return e.translation;
    if (navigator.language) {
        const e = navigator.language.toLowerCase();
        for (const t of Bt.translations)
            if (e.startsWith(t.id.toLowerCase()))
                return t.id
    }
    return Bt.translations[0].id
}(Ft))
  , [Zt,Wt] = v((null == Ft ? void 0 : Ft.colors) || "red-green")
  , [Xt,Gt] = Ae(Dt)
  , [qt,Yt] = v(function(e, t) {
    return (null == e ? void 0 : e.configurationId2) ? e.configurationId2 : (t.find((e => "day" === e.period && "performance" === e.size)) || t[0]).id
}(Ft, Dt))
  , [Kt,Jt] = Ae(function(e) {
    return (null == e ? void 0 : e.favoritesCMC) ? St(e.favoritesCMC) : {}
}(Ft))
  , [Qt,er] = Ae(function(e) {
    return (null == e ? void 0 : e.listBlock) ? St(e.listBlock) : {}
}(Ft))
  , [tr,rr] = Ae(function(e) {
    return (null == e ? void 0 : e.listsWatch) ? e.listsWatch.map((e => ({
        id: e.id,
        name: e.name,
        record: St(e.items)
    }))) : [$t()]
}(Ft))
  , [nr,or] = v((null == Ft ? void 0 : Ft.hideStables) || !1)
  , [ir,ar] = Ae([])
  , [lr,sr] = v("bubbles")
  , [cr,ur] = v(null)
  , [dr,hr] = v("loading")
  , [pr,gr] = v(null)
  , [fr,vr] = v(Vt)
  , [mr,br] = v("");
function yr(e, t) {
    return fetch("/backend/" + e, t)
}
async function wr(e, t) {
    return yr(e, {
        method: "GET",
        signal: null == t ? void 0 : t.signal
    }).then((e => e.json()))
}
async function _r(e, t) {
    return yr(e, {
        method: "POST",
        body: t
    })
}
let Cr = null;
function kr() {
    Cr && (Cr.abort(),
    Cr = null);
    const e = new AbortController;
    Cr = e;
    const t = fr();
    wr(`data/bubbles1000.${t}.json`, e).then((e => {
        for (const t of e)
            t.image = "/backend/" + t.image,
            t.nameUpper = t.name.toUpperCase();
        Ot(t),
        ar(Te(e)),
        hr("loaded")
    }
    )).catch(( () => {
        e.signal.aborted || (hr("loading-failed"),
        vr(( () => Nt())))
    }
    ))
}
class xr {
    constructor() {
        this.listeners = []
    }
    register(e) {
        this.listeners.push(e)
    }
    unregister(e) {
        this.listeners = this.listeners.filter((t => t !== e))
    }
    fire(e) {
        for (const t of this.listeners)
            t(e)
    }
}
const Mr = "abcdefghjiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  , zr = class {
    static create(e) {
        const t = navigator.userAgent.toLowerCase()
          , r = t.includes("android")
          , n = t.includes("iphone") || t.includes("ipad");
        this.env = e,
        this.isWeb = "web" === e || "pwa" === e,
        this.isMobile = r || n || "android" === e || "ios" === e,
        this.isMissingAndroidApp = "web" === e && r,
        this.isMissingIosApp = "web" === e && n,
        this.isEmbedded = window !== window.parent,
        this.generateId(),
        this.addListeners(),
        this.postAccess(e)
    }
    static generateId() {
        for (let e = 0; e < 6; e++)
            this.id += Mr[Math.floor(62 * Math.random())]
    }
    static addListeners() {
        window.onCryptoBubblesBack = () => this.closeWindow(),
        window.addEventListener("error", (e => this.handleError(e))),
        window.addEventListener("keydown", (e => {
            "Escape" === e.key && this.closeWindow()
        }
        ))
    }
    static postAccess(e) {
        const t = new FormData;
        t.append("session", this.id),
        t.append("isMobile", this.isMobile ? "1" : "0"),
        t.append("translation", Ut()),
        t.append("basecurrency", Nt()),
        t.append("env", `${e}-2024-11-26-20-11`),
        document.referrer && t.append("referer", document.referrer)
        //,
       // _r("access.php", t)
    }
    static closeWindow() {
        return !this.closeListener || (this.closeListener(),
        this.closeListener = null,
        !1)
    }
    static handleError(e) {
        if (this.errorsLeft > 0) {
            const {filename: t, lineno: r, colno: n, message: o} = e;
            this.errorsLeft--,
            this.logAction("ERROR", `${t}:${r}:${n} ${o}`)
        }
    }
    static logAction(e, t=null) {
        const r = new FormData;
        r.append("session", this.id),
        r.append("type", e),
        null !== t && r.append("extra", t),
        _r("action.php", r)
    }
    static registerCloseListener(e) {
        this.closeListener && this.closeListener !== e && this.closeListener(),
        this.closeListener = e
    }
    static unregisterCloseListener(e) {
        this.closeListener === e && (this.closeListener = null)
    }
    static updateData() {
        kr(),
        this.eventUpdateData.fire()
    }
}
;
zr.eventUpdateData = new xr,
zr.errorsLeft = 3,
zr.id = "",
zr.closeListener = null;
let Lr = zr;
var Br = Q('<svg viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z">');
const Sr = e => {
    return oe(t = Br(), e, !0, !0),
    t;
    var t
}
;
var Ar = Q("<a target=_blank rel=noopener>");
function Pr(e) {
    return (t = Ar()).$$click = () => Lr.logAction("CLICK_LINK", e.name),
    ae(t, ( () => e.children)),
    m((r => {
        var n = e.href
          , o = e.title
          , i = e.class;
        return n !== r.e && te(t, "href", r.e = n),
        o !== r.t && te(t, "title", r.t = o),
        i !== r.a && re(t, r.a = i),
        r
    }
    ), {
        e: void 0,
        t: void 0,
        a: void 0
    }),
    t;
    var t
}
ee(["click"]);
var Hr = Q("<span>Download App");
function Tr() {
    return O(Pr, {
        class: "banner",
        get href() {
            return Bt.playStore
        },
        title: "Download App",
        name: "GooglePlay_Banner",
        get children() {
            return [Hr(), O(Sr, {})]
        }
    })
}
var $r = Q('<svg viewBox="4 4 42 42"><path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 14 5.9902344 L 36 5.9902344 C 40.430666 5.9902344 44 9.5595687 44 13.990234 L 44 35.990234 C 44 40.4209 40.430666 43.990234 36 43.990234 L 14 43.990234 C 9.5693339 43.990234 6 40.4209 6 35.990234 L 6 13.990234 C 6 9.5595687 9.5693339 5.9902344 14 5.9902344 z M 22.572266 11.892578 C 22.187855 11.867986 21.790969 11.952859 21.433594 12.162109 C 20.480594 12.721109 20.161703 13.947391 20.720703 14.900391 L 22.53125 17.990234 L 16.666016 28 L 12 28 C 10.896 28 10 28.896 10 30 C 10 31.104 10.896 32 12 32 L 27.412109 32 C 27.569109 31.237 27.473203 30.409531 27.033203 29.644531 L 27.029297 29.640625 C 26.642297 28.966625 26.105469 28.416 25.480469 28 L 21.302734 28 L 28.978516 14.898438 C 29.536516 13.945438 29.216672 12.720109 28.263672 12.162109 C 27.309672 11.604109 26.085344 11.923953 25.527344 12.876953 L 24.849609 14.033203 L 24.171875 12.876953 C 23.8225 12.281328 23.212949 11.933564 22.572266 11.892578 z M 28.310547 19.941406 L 27.484375 21.314453 C 26.572375 22.830453 26.542953 24.706859 27.376953 26.255859 L 33.673828 37.001953 C 34.045828 37.637953 34.713391 37.990234 35.400391 37.990234 C 35.743391 37.990234 36.092156 37.902797 36.410156 37.716797 C 37.363156 37.158797 37.682047 35.933469 37.123047 34.980469 L 35.376953 32 L 38 32 C 39.104 32 40 31.104 40 30 C 40 28.896 39.104 28 38 28 L 33.033203 28 L 28.310547 19.941406 z M 14.625 34.003906 C 14.068 33.987906 13.526719 34.074328 13.011719 34.236328 L 12.566406 34.994141 C 12.007406 35.946141 12.32825 37.172469 13.28125 37.730469 C 13.59925 37.917469 13.946063 38.005859 14.289062 38.005859 C 14.976062 38.005859 15.644578 37.650625 16.017578 37.015625 L 17.09375 35.179688 C 16.50875 34.496688 15.653859 34.033906 14.630859 34.003906 L 14.625 34.003906 z">');
const Fr = e => {
    return oe(t = $r(), e, !0, !0),
    t;
    var t
}
;
var Dr = Q("<span>Download App");
function Er() {
    return O(Pr, {
        class: "banner",
        get href() {
            return Bt.appStore
        },
        title: "Download App",
        name: "AppStore_Banner",
        get children() {
            return [Dr(), O(Fr, {})]
        }
    })
}
function Vr() {
    return O(U, {
        get when() {
            return !Lr.isEmbedded
        },
        get children() {
            return O(I, {
                get children() {
                    return [O(Z, {
                        get when() {
                            return Lr.isMissingAndroidApp
                        },
                        get children() {
                            return O(Tr, {})
                        }
                    }), O(Z, {
                        get when() {
                            return Lr.isMissingIosApp
                        },
                        get children() {
                            return O(Er, {})
                        }
                    })]
                }
            })
        }
    })
}
function Nr(e) {
    switch (e.type) {
    case "list":
        {
            const t = function(e) {
                switch (e.list[0]) {
                case "block":
                    return Qt;
                case "watch":
                    {
                        const t = e.list[1]
                          , r = tr.find((e => e.id === t));
                        if (r)
                            return r.record
                    }
                }
                return Kt
            }(e);
            return e => Boolean(t[e.id])
        }
    case "slice":
        return t => t.rank >= e.from && t.rank <= e.to;
    case "exchange":
        return t => Boolean(t.symbols[e.exchange]);
    default:
        return e => e.rank > 0 && e.rank <= 100
    }
}
function Or(e, t) {
    return !0 === t[e.id]
}
function Rr(e) {
    return Or(e, Qt)
}
let jr = null;
if (location.hash && location.hash.length > 0) {
    const e = location.hash.substring(1).split("&").map((e => e.split("=")))[0];
    if (e) {
        const [t,r] = e;
        "currencies" === t && r && (jr = St(r.split(",")))
    }
}
function Ur(e) {
    return !jr || jr[e.id]
}
const {visibleCurrencies: Ir, selectedConfiguration: Zr, selectedCurrency: Wr, searchResults: Xr, baseCurrency: Gr, translation: qr} = f(( () => ({
    visibleCurrencies: y(( () => {
        if (jr)
            return ir.filter(Ur);
        const e = Rt()
          , t = Nr(e);
        let r = t;
        return "list" !== e.type && (r = nr() ? e => !e.stable && !Rr(e) && t(e) : e => !Rr(e) && t(e)),
        ir.filter(r)
    }
    )),
    selectedConfiguration: y(( () => {
        const e = qt();
        return Xt.find((t => t.id === e)) || Xt[0]
    }
    )),
    selectedCurrency: y(( () => {
        const e = cr();
        return e && ir.find((t => t.id === e)) || null
    }
    )),
    searchResults: () => {
        const e = mr().trim().toUpperCase()
          , t = [];
        for (const r of ir)
            if (Ur(r) && (r.nameUpper.includes(e) || r.symbol.includes(e)) && (t.push(r),
            10 === t.length))
                break;
        return t
    }
    ,
    baseCurrency: () => {
        const e = Nt();
        return Bt.baseCurrencies.find((t => t.id === e)) || Bt.baseCurrencies[0]
    }
    ,
    translation: () => {
        const e = Ut();
        return Bt.translations.find((t => t.id === e)) || Bt.translations[0]
    }
})));
function Yr(...e) {
    return e.filter((e => Boolean(e))).join(" ")
}
var Kr = Q("<button>");
function Jr(e) {
    return (t = Kr()).$$click = t => e.onClick(t),
    ae(t, ( () => e.children)),
    m((r => {
        var n = Yr("icon-button", e.active && "active", e.hidden && "hidden", e.class)
          , o = e.title
          , i = e.hidden ? -1 : void 0;
        return n !== r.e && re(t, r.e = n),
        o !== r.t && te(t, "title", r.t = o),
        i !== r.a && te(t, "tabindex", r.a = i),
        r
    }
    ), {
        e: void 0,
        t: void 0,
        a: void 0
    }),
    t;
    var t
}
ee(["click"]);
var Qr = Q("<div class=data-updater>");
function en() {
    let e;
    const t = () => {
        window.clearTimeout(e),
        e = window.setTimeout(( () => requestAnimationFrame(t)), 7e4),
        Lr.updateData()
    }
    ;
    return (r = Qr()).addEventListener("animationiteration", t),
    r;
    var r
}
var tn = Q('<svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z">');
const rn = e => {
    return oe(t = tn(), e, !0, !0),
    t;
    var t
}
;
var nn = Q('<svg width=24 height=12 viewBox="0 6 24 12"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z">');
const on = e => {
    return oe(t = nn(), e, !0, !0),
    t;
    var t
}
;
var an = Q('<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">');
const ln = e => {
    return oe(t = an(), e, !0, !0),
    t;
    var t
}
;
var sn = Q('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z">');
const cn = e => {
    return oe(t = sn(), e, !0, !0),
    t;
    var t
}
;
function un() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight)
}
var dn = Q("<div>");
function hn(e) {
    const [t,r] = v(!1);
    let n;
    window.setTimeout(( () => r(!0)), 20),
    b(( () => {
        if (e.onClose) {
            const t = e.onClose;
            document.addEventListener("click", t),
            C(( () => document.removeEventListener("click", t)))
        }
    }
    ));
    const o = y(( () => {
        const r = document.documentElement.clientWidth
          , n = un()
          , o = e.anchor.getBoundingClientRect()
          , i = o.x + o.width / 2
          , a = o.y + o.height / 2 > n / 2
          , l = [i > r / 2 ? `right: ${Math.max(0, Math.round(r - o.right))}px` : `left: ${Math.max(0, Math.round(o.left))}px`, a ? `bottom: ${Math.round(n - o.top)}px` : `top: ${Math.round(o.bottom)}px`, `transform: scaleY(${t() ? 1 : .6})`, "opacity: " + (t() ? 1 : 0), "transform-origin: 0% " + (a ? "100%" : "0%")]
          , s = e.width ? "inherit-from-anchor" === e.width ? o.width : e.width : void 0;
        return s && l.push(`width:${s}px`),
        l.join(";")
    }
    ));
    return O(fe, {
        get children() {
            var t = dn();
            return "function" == typeof n ? ie(n, t) : n = t,
            ae(t, ( () => e.children)),
            m((r => {
                var n = Yr("popup", e.class)
                  , i = o();
                return n !== r.e && re(t, r.e = n),
                r.t = ne(t, i, r.t),
                r
            }
            ), {
                e: void 0,
                t: void 0
            }),
            t
        }
    })
}
function pn(e) {
    const t = () => e.options[e.index];
    return O(Jr, {
        class: "select-navigator",
        get hidden() {
            return !t()
        },
        get title() {
            var e;
            return null == (e = t()) ? void 0 : e.label
        },
        onClick: () => e.onChange(t().value),
        get children() {
            return e.children
        }
    })
}
var gn = Q("<button>");
function fn(e) {
    return (t = gn()).$$click = t => e.onClick(t),
    ae(t, ( () => e.children)),
    m((r => {
        var n = Yr("solid-button", e.active && "active", e.class)
          , o = e.title;
        return n !== r.e && re(t, r.e = n),
        o !== r.t && te(t, "title", r.t = o),
        r
    }
    ), {
        e: void 0,
        t: void 0
    }),
    t;
    var t
}
function vn() {
    return window.innerWidth >= 1100
}
ee(["click"]);
const [mn,bn] = v(vn());
window.addEventListener("resize", ( () => {
    bn(vn())
}
));
var yn = Q('<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">');
const wn = e => {
    return oe(t = yn(), e, !0, !0),
    t;
    var t
}
;
var _n = Q('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">');
const Cn = e => {
    return oe(t = _n(), e, !0, !0),
    t;
    var t
}
;
var kn = Q("<span>")
  , xn = Q("<li>")
  , Mn = Q("<li><span class=grow>");
function zn(e) {
    return [O(U, {
        get when() {
            return e.group.label
        },
        get children() {
            var t = xn();
            return ae(t, ( () => e.group.label), null),
            ae(t, O(U, {
                get when() {
                    return e.group.labelSecondary
                },
                get children() {
                    var t = kn();
                    return ae(t, ( () => e.group.labelSecondary)),
                    t
                }
            }), null),
            m(( () => re(t, Yr("menu-item-header color-secondary", e.stickyHeader && "sticky")))),
            t
        }
    }), O(j, {
        get each() {
            return e.group.options
        },
        children: t => {
            return r = Mn(),
            n = r.firstChild,
            r.$$click = () => e.onChange(t.value),
            ae(r, O(U, {
                get when() {
                    return t.value === e.value
                },
                get fallback() {
                    return O(Cn, {})
                },
                get children() {
                    return O(wn, {})
                }
            }), n),
            ae(r, O(U, {
                keyed: !0,
                get when() {
                    return t.iconComponent
                },
                children: e => O(e, {})
            }), n),
            ae(n, ( () => t.label)),
            ae(r, ( () => t.annotation), null),
            m(( () => re(r, Yr("menu-item", t.value === e.value && "selected")))),
            r;
            var r, n
        }
    })]
}
ee(["click"]);
var Ln = Q("<ul class=menu>");
function Bn(e) {
    const [t,r] = v(null)
      , n = y(( () => {
        const t = [];
        for (const r of e.children)
            for (const e of r.options)
                t.push(e);
        return t
    }
    ))
      , o = y(( () => {
        let t = 0;
        for (const r of e.children)
            for (const n of r.options) {
                if (n.value === e.value)
                    return {
                        index: t,
                        option: n
                    };
                t++
            }
        return {
            index: 0,
            option: e.children[0].options[0]
        }
    }
    ))
      , i = () => e.children.length > 1 && mn()
      , a = y(( () => t() && !i()));
    return b(( () => {
        if (a()) {
            const e = document.querySelector(".menu-item.selected");
            e && e.scrollIntoView({
                block: "center"
            })
        }
    }
    )),
    [O(U, {
        get when() {
            return e.withNavigator
        },
        get children() {
            return O(pn, {
                get index() {
                    return o().index - 1
                },
                get options() {
                    return n()
                },
                get onChange() {
                    return e.onChange
                },
                get children() {
                    return O(ln, {})
                }
            })
        }
    }), O(fn, {
        get class() {
            return Yr("select-button", `${e.type}-select`, t() && "active")
        },
        onClick: e => r(e.currentTarget),
        get children() {
            return [O(U, {
                keyed: !0,
                get when() {
                    return o().option.iconComponent
                },
                children: e => O(e, {})
            }), y(( () => o().option.label)), O(on, {
                class: "select-button-arrow color-secondary"
            })]
        }
    }), O(U, {
        get when() {
            return e.withNavigator
        },
        get children() {
            return O(pn, {
                get index() {
                    return o().index + 1
                },
                get options() {
                    return n()
                },
                get onChange() {
                    return e.onChange
                },
                get children() {
                    return O(cn, {})
                }
            })
        }
    }), O(U, {
        keyed: !0,
        get when() {
            return t()
        },
        children: t => O(hn, {
            get class() {
                return `select-popup ${e.type}-select-popup`
            },
            anchor: t,
            onClose: () => r(null),
            get children() {
                return O(U, {
                    get when() {
                        return i()
                    },
                    get fallback() {
                        return ae(t = Ln(), O(j, {
                            get each() {
                                return e.children
                            },
                            children: t => O(zn, {
                                get value() {
                                    return e.value
                                },
                                group: t,
                                get onChange() {
                                    return e.onChange
                                },
                                stickyHeader: !0
                            })
                        })),
                        t;
                        var t
                    },
                    get children() {
                        return O(j, {
                            get each() {
                                return e.children
                            },
                            children: t => {
                                return ae(r = Ln(), O(zn, {
                                    get value() {
                                        return e.value
                                    },
                                    group: t,
                                    get onChange() {
                                        return e.onChange
                                    },
                                    stickyHeader: !1
                                })),
                                r;
                                var r
                            }
                        })
                    }
                })
            }
        })
    })]
}
var Sn = Q('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z">');
const An = e => {
    return oe(t = Sn(), e, !0, !0),
    t;
    var t
}
;
var Pn = Q('<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">');
const Hn = e => {
    return oe(t = Pn(), e, !0, !0),
    t;
    var t
}
;
var Tn = Q('<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z">');
const $n = e => {
    return oe(t = Tn(), e, !0, !0),
    t;
    var t
}
;
function Fn(e) {
    return `${qr().watchlist} ${e + 1}`
}
function Dn(e, t) {
    return e.name.trim().length > 0 ? e.name : Fn(t)
}
function En() {
    return [{
        name: qr().favorites,
        filter: {
            type: "list",
            list: ["favorite"]
        },
        record: Kt,
        iconComponent: Hn,
        toggleCurrency: e => Jt(e.id, (e => !e))
    }, ...tr.map(( (e, t) => ({
        name: Dn(e, t),
        filter: {
            type: "list",
            list: ["watch", e.id]
        },
        record: e.record,
        iconComponent: $n,
        toggleCurrency: e => rr(t, "record", e.id, (e => !e))
    }))), {
        name: qr().blocklist,
        filter: {
            type: "list",
            list: ["block"]
        },
        record: Qt,
        iconComponent: An,
        toggleCurrency: e => er(e.id, (e => !e))
    }]
}
function Vn(e, t) {
    if (e)
        return e > 0 ? "yellow-blue" === t ? "#4af" : "#3f3" : "yellow-blue" === t ? "#fb1" : "#f66"
}
function Nn(e, t) {
    if (e)
        return e > 0 ? "yellow-blue" === t ? "#16d" : "#282" : "yellow-blue" === t ? "#c81" : "#a33"
}
function On(e, t={}) {
    if (null === e)
        return "-";
    const {hideSign: r} = t
      , n = {
        style: "percent",
        signDisplay: r ? "never" : "exceptZero",
        minimumFractionDigits: 0,
        maximumFractionDigits: Rn(e)
    };
    return (.01 * e).toLocaleString(void 0, n).replace(/\u00a0/, "")
}
function Rn(e) {
    const t = Math.abs(e);
    return t >= 100 ? 0 : t >= 1 ? 1 : 2
}
function jn(e, t) {
    switch (e) {
    case "hour":
        return t.period_hour;
    case "day":
        return t.period_day;
    case "hour6":
        return t.period_hour6;
    case "min5":
        return t.period_min5;
    default:
        return t.hour;
    }
}
var Un = Q("<span>");
function In(e) {
    const t = function(e, t) {
        const r = Nr(e)
          , n = ir.filter(r);
        let o = 0
          , i = 0;
        for (const a of n) {
            const e = a.performance[t];
            null !== e && (o += e,
            i += 1)
        }
        return i > 0 ? o / i : null
    }(e, Zr().period)
      , r = Vn(t, Zt()) || "";
    return n = Un(),
    null != r ? n.style.setProperty("color", r) : n.style.removeProperty("color"),
    ae(n, ( () => On(t))),
    n;
    var n
}
function Zn(e) {
    const t = () => jn(Zr().period, qr());
    return O(U, {
        when: !jr,
        get children() {
            return O(Bn, {
                type: "filter",
                get value() {
                    return JSON.stringify(Rt())
                },
                onChange: e => jt(JSON.parse(e)),
                get withNavigator() {
                    return e.withNavigator
                },
                get children() {
                    return [{
                        label: qr().pages,
                        labelSecondary: t(),
                        options: Bt.sliceFilters.map((e => ({
                            label: `${e.from} - ${e.to}`,
                            value: JSON.stringify(e),
                            annotation: In(e)
                        })))
                    }, {
                        label: qr().lists,
                        labelSecondary: t(),
                        options: En().map((e => ({
                            label: e.name,
                            value: JSON.stringify(e.filter),
                            iconComponent: e.iconComponent,
                            annotation: In(e.filter)
                        })))
                    }, {
                        label: qr().exchanges,
                        labelSecondary: t(),
                        options: Bt.exchanges.map((e => {
                            const t = {
                                type: "exchange",
                                exchange: e.id
                            };
                            return {
                                label: e.name,
                                value: JSON.stringify(t),
                                iconComponent: e.iconComponent,
                                annotation: In(t)
                            }
                        }
                        ))
                    }]
                }
            })
        }
    })
}
var Wn = Q('<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">');
const Xn = e => {
    return oe(t = Wn(), e, !0, !0),
    t;
    var t
}
;
var Gn = Q('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z">');
const qn = e => {
    return oe(t = Gn(), e, !0, !0),
    t;
    var t
}
;
var Yn = Q("<div class=window-content>")
  , Kn = Q('<section><header class="flex-row gap-m">');
function Jn(e) {
    const [t,r] = v(!0);
    return b(( () => {
        Lr.registerCloseListener(e.onClose),
        C(( () => Lr.unregisterCloseListener(e.onClose)))
    }
    )),
    n = Kn(),
    ae(o = n.firstChild, O(Jr, {
        get class() {
            return Yr("expand-button", t() && "expanded")
        },
        onClick: () => r(!t()),
        get title() {
            return qr().window_toggleExpand
        },
        get children() {
            return O(qn, {})
        }
    }), null),
    ae(o, ( () => e.header), null),
    ae(o, O(Jr, {
        get onClick() {
            return e.onClose
        },
        get title() {
            return qr().window_close
        },
        get children() {
            return O(Xn, {})
        }
    }), null),
    ae(n, O(U, {
        get when() {
            return t()
        },
        get children() {
            var t = Yn();
            return ae(t, ( () => e.children)),
            t
        }
    }), null),
    m(( () => re(n, Yr("window", e.class)))),
    n;
    var n, o
}
var Qn = Q('<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z">');
const eo = e => {
    return oe(t = Qn(), e, !0, !0),
    t;
    var t
}
;
var to = Q("<button>");
function ro(e) {
    const [t,r] = v(null);
    return [(n = to(),
    n.$$click = e => r(e.currentTarget),
    ae(n, ( () => e.content)),
    m((r => {
        var o = Yr(e.solid ? "solid-button" : "icon-button", t() && "active", e.class)
          , i = e.title;
        return o !== r.e && re(n, r.e = o),
        i !== r.t && te(n, "title", r.t = i),
        r
    }
    ), {
        e: void 0,
        t: void 0
    }),
    n), O(U, {
        keyed: !0,
        get when() {
            return t()
        },
        children: t => O(hn, {
            get width() {
                return e.popupWidth
            },
            anchor: t,
            onClose: () => r(null),
            get children() {
                return e.children
            }
        })
    })];
    var n
}
ee(["click"]);
var no = Q("<ul class=menu><li class=menu-item><span></span></li><li class=menu-item>");
function oo(e) {
    return O(ro, {
        get title() {
            return qr().delete
        },
        get content() {
            return O(eo, {})
        },
        get children() {
            var t = no()
              , r = t.firstChild
              , n = r.firstChild
              , o = r.nextSibling;
            return r.$$click = () => e.onDelete(),
            ae(r, O(eo, {}), n),
            ae(n, ( () => qr().confirm)),
            ae(o, O(Xn, {}), null),
            ae(o, ( () => qr().cancel), null),
            t
        }
    })
}
ee(["click"]);
var io = Q('<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z">');
const ao = e => {
    return oe(t = io(), e, !0, !0),
    t;
    var t
}
;
var lo = Q('<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">');
const so = e => {
    return oe(t = lo(), e, !0, !0),
    t;
    var t
}
;
var co = Q('<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z">');
const uo = e => {
    return oe(t = co(), e, !0, !0),
    t;
    var t
}
;
var ho = Q("<div><input size=1>");
function po(e) {
    const [t,r] = v(!1);
    let n;
    function o() {
        document.execCommand("copy") && r(!0)
    }
    function i() {
        if (n) {
            const {value: e} = n;
            if (e) {
                n.select();
                try {
                    navigator.clipboard.writeText(e).then(( () => r(!0))).catch(o)
                } catch {
                    o()
                }
            }
        }
    }
    function a(t) {
        e.onInput && e.onInput(t)
    }
    function l() {
        n && (n.focus(),
        e.readonly && n.select())
    }
    b(( () => {
        e.autoFocus && n && n.focus()
    }
    ));
    const s = () => 0 === e.value.length;
    return ( () => {
        var r = ho()
          , o = r.firstChild;
        r.$$click = l,
        ae(r, O(U, {
            keyed: !0,
            get when() {
                return e.iconComponent
            },
            children: e => O(e, {
                class: "input-icon"
            })
        }), o),
        o.$$keydown = t => {
            e.onKeyDown && e.onKeyDown(t)
        }
        ,
        o.addEventListener("blur", (t => {
            e.onBlur && e.onBlur(t)
        }
        )),
        o.addEventListener("focus", (t => {
            e.onFocus && e.onFocus(t)
        }
        )),
        o.$$input = e => a(e.currentTarget.value);
        return "function" == typeof n ? ie(n, o) : n = o,
        ae(r, O(I, {
            get children() {
                return [O(Z, {
                    get when() {
                        return "clear" === e.action
                    },
                    get children() {
                        return O(Jr, {
                            title: "Clear",
                            get hidden() {
                                return s()
                            },
                            class: "input-action",
                            get active() {
                                return t()
                            },
                            onClick: () => a(""),
                            get children() {
                                return O(Xn, {})
                            }
                        })
                    }
                }), O(Z, {
                    get when() {
                        return "copy" === e.action
                    },
                    get children() {
                        return O(Jr, {
                            get title() {
                                return qr().copy
                            },
                            get hidden() {
                                return s()
                            },
                            class: "input-action",
                            get active() {
                                return t()
                            },
                            onClick: i,
                            get children() {
                                return O(uo, {})
                            }
                        })
                    }
                })]
            }
        }), null),
        m((t => {
            var n = Yr("input", e.class)
              , i = e.type
              , a = e.placeholder
              , l = e.readonly;
            return n !== t.e && re(r, t.e = n),
            i !== t.t && te(o, "type", t.t = i),
            a !== t.a && te(o, "placeholder", t.a = a),
            l !== t.o && (o.readOnly = t.o = l),
            t
        }
        ), {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
        }),
        m(( () => o.value = e.value)),
        r
    }
    )()
}
ee(["click", "input", "keydown"]);
const go = St(["BTC", "ETH"]);
function fo() {
    return O(Bn, {
        type: "basecurrency",
        get value() {
            return fr()
        },
        onChange: vr,
        get children() {
            return [{
                label: "Fiat",
                options: Bt.baseCurrencies.filter((e => !go[e.code])).map((e => ({
                    value: e.id,
                    label: `${e.symbol} ${e.code}`
                })))
            }]
        }
    })
}
function vo() {
    return O(Bn, {
        type: "colors",
        get value() {
            return Zt()
        },
        onChange: Wt,
        get children() {
            return [{
                label: "",
                options: [{
                    value: "red-green",
                    label: qr().red_green
                }, {
                    value: "yellow-blue",
                    label: qr().yellow_blue
                }]
            }]
        }
    })
}
function mo() {
    return O(Bn, {
        type: "translation",
        get value() {
            return Ut()
        },
        onChange: It,
        get children() {
            return [{
                label: "",
                options: Bt.translations.map((e => ({
                    value: e.id,
                    label: e.name,
                    iconComponent: e.flag
                })))
            }]
        }
    })
}
var bo = Q('<svg viewBox="0 0 24 24"><path d="M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z">');
const yo = e => {
    return oe(t = bo(), e, !0, !0),
    t;
    var t
}
;
var wo = Q('<svg viewBox="0 0 24 24"><path d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z">');
const _o = e => {
    return oe(t = wo(), e, !0, !0),
    t;
    var t
}
;
var Co = Q('<svg viewBox="0 0 24 24"><path d=M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z>');
const ko = e => {
    return oe(t = Co(), e, !0, !0),
    t;
    var t
}
;
var xo = Q("<div class=popup-content>");
function Mo(e) {
    return (t = xo()).$$click = e => e.stopImmediatePropagation(),
    ae(t, ( () => e.children)),
    t;
    var t
}
ee(["click"]);
var zo = Q("<p>This will import the exported data and <strong>DELETE</strong> your current data.")
  , Lo = Q("<button class=solid-button>")
  , Bo = Q("<button class=solid-button>Import");
function So() {
    const [e,t] = v("")
      , r = y(( () => {
        try {
            const t = JSON.parse(e());
            if (null == t ? void 0 : t.translation)
                return t
        } catch {}
        return null
    }
    ));
    return O(Mo, {
        get children() {
            return [zo(), O(po, {
                get value() {
                    return e()
                },
                onInput: t,
                placeholder: "Paste exported data here"
            }), O(U, {
                keyed: !0,
                get when() {
                    return r()
                },
                get fallback() {
                    return ae(t = Lo(), ( () => "" === e() ? "Data is empty" : "Data is invalid")),
                    t;
                    var t
                },
                children: e => {
                    return t = Bo(),
                    r = t.firstChild,
                    t.$$click = () => {
                        Tt.save(e),
                        location.reload()
                    }
                    ,
                    ae(t, O(_o, {}), r),
                    t;
                    var t, r
                }
            })]
        }
    })
}
ee(["click"]);
var Ao = Q("<p class=no-margin-bottom>Full experience")
  , Po = Q("<p>You can also generate the HTML widget for one of your lists. But currently all your lists are empty.")
  , Ho = Q('<p class="flex-row gap-m no-margin-bottom">');
function To() {
    const e = "https://cryptobubbles.net"
      , t = 'width="1300px" height="800px" style="border: none" loading="lazy"';
    return O(Mo, {
        get children() {
            return [Ao(), O(po, {
                readonly: !0,
                action: "copy",
                value: `<iframe src="${e}" ${t}></iframe>`
            }), O(j, {
                get each() {
                    return En().filter((e => At(e.record).length > 0))
                },
                get fallback() {
                    return Po()
                },
                children: r => {
                    const n = At(r.record).join(",");
                    return [(o = Ho(),
                    ae(o, O(r.iconComponent, {}), null),
                    ae(o, ( () => r.name), null),
                    o), O(po, {
                        readonly: !0,
                        action: "copy",
                        value: `<iframe src="${e}#currencies=${n}" ${t}></iframe>`
                    })];
                    var o
                }
            })]
        }
    })
}
function $o() {
    return O(Bn, {
        type: "hidestables",
        get value() {
            return nr() ? "1" : "0"
        },
        onChange: e => or("1" === e),
        get children() {
            return [{
                label: "",
                options: [{
                    value: "0",
                    label: qr().show
                }, {
                    value: "1",
                    label: qr().hide
                }]
            }]
        }
    })
}
var Fo = Q('<li class=flex-row><span class="grow color-secondary">Stablecoins')
  , Do = Q('<li class=settings-watchlists><div class="settings-watchlists-header flex-row color-secondary"><span></span></div><ul class=settings-watchlists-list>')
  , Eo = Q("<p>This contains your settings and lists. Use it as a backup or to import your data to another device.")
  , Vo = Q("<li class=settings-buttons>")
  , No = Q('<ul class=settings-page><li class=flex-row><span class="grow color-secondary"></span></li><li class=flex-row><span class="grow color-secondary"></span></li><li class=flex-row><span class="grow color-secondary">')
  , Oo = Q('<li class="flex-row gap-m">');
function Ro() {
    return e = No(),
    t = e.firstChild,
    r = t.firstChild,
    n = t.nextSibling,
    o = n.firstChild,
    i = n.nextSibling,
    a = i.firstChild,
    ae(r, ( () => qr().currency)),
    ae(t, O(fo, {}), null),
    ae(o, ( () => qr().language)),
    ae(n, O(mo, {}), null),
    ae(a, ( () => qr().colors)),
    ae(i, O(vo, {}), null),
    ae(e, O(U, {
        when: !jr,
        get children() {
            return [(i = Fo(),
            i.firstChild,
            ae(i, O($o, {}), null),
            i), (t = Do(),
            r = t.firstChild,
            n = r.firstChild,
            o = r.nextSibling,
            ae(n, ( () => qr().watchlists)),
            ae(r, O(Jr, {
                class: "button-add",
                get title() {
                    return qr().watchlist_add
                },
                onClick: () => rr((e => [...e, $t()])),
                get children() {
                    return O(ao, {})
                }
            }), null),
            ae(o, O(j, {
                each: tr,
                children: (e, t) => {
                    return ae(r = Oo(), O(po, {
                        get value() {
                            return e.name
                        },
                        action: "clear",
                        class: "grow",
                        iconComponent: so,
                        get placeholder() {
                            return Fn(t())
                        },
                        onInput: e => rr(t(), "name", e)
                    }), null),
                    ae(r, O(oo, {
                        onDelete: () => function(e) {
                            rr((t => t.filter((t => t.id !== e.id)))),
                            jt((t => "list" === t.type && "watch" === t.list[0] && t.list[1] === e.id ? Bt.sliceFilters[0] : t))
                        }(e)
                    }), null),
                    r;
                    var r
                }
            })),
            t), (e = Vo(),
            ae(e, O(ro, {
                solid: !0,
                popupWidth: 400,
                get content() {
                    return [O(yo, {}), "Export settings + lists"]
                },
                get children() {
                    return O(Mo, {
                        get children() {
                            return [Eo(), O(po, {
                                readonly: !0,
                                action: "copy",
                                get value() {
                                    return JSON.stringify(Tt.generateSave())
                                }
                            })]
                        }
                    })
                }
            }), null),
            ae(e, O(ro, {
                solid: !0,
                popupWidth: 400,
                get content() {
                    return [O(_o, {}), "Import settings + lists"]
                },
                get children() {
                    return O(So, {})
                }
            }), null),
            ae(e, O(ro, {
                solid: !0,
                popupWidth: 400,
                get content() {
                    return [O(ko, {}), "Generate HTML widget"]
                },
                get children() {
                    return O(To, {})
                }
            }), null),
            e)];
            var e, t, r, n, o, i
        }
    }), null),
    e;
    var e, t, r, n, o, i, a
}
var jo = Q("<span class=grow>");
function Uo(e) {
    return O(Jn, {
        class: "settings-window",
        get onClose() {
            return e.onClose
        },
        get header() {
            return [O(rn, {}), (e = jo(),
            ae(e, ( () => qr().settings)),
            e)];
            var e
        },
        get children() {
            return O(Ro, {})
        }
    })
}
var Io = Q("<div>");
function Zo(e) {
    const [t,r] = v("")
      , [n,o] = v(null);
    b(( () => {
        e.value ? (window.setTimeout(( () => r("in")), 20),
        o(( () => e.value))) : (r("out"),
        window.setTimeout(( () => o(null)), 400))
    }
    ));
    const i = y(( () => e.value || n()));
    return O(U, {
        get when() {
            return i()
        },
        children: r => O(fe, {
            get children() {
                var n = Io();
                return ae(n, O(e.component, {
                    get value() {
                        return r()
                    },
                    get onClose() {
                        return e.onClose
                    }
                })),
                m(( () => re(n, Yr("window-host", t())))),
                n
            }
        })
    })
}
var Wo = Q('<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">');
const Xo = e => {
    return oe(t = Wo(), e, !0, !0),
    t;
    var t
}
;
var Go = Q("<div><img height=24><span>");
function qo(e) {
    return t = Go(),
    ae((r = t.firstChild).nextSibling, ( () => e.currency.name)),
    m((n => {
        var o = Yr("flex-row gap-m", e.class)
          , i = e.currency.image
          , a = e.currency.name
          , l = `Logo of ${e.currency.name}`;
        return o !== n.e && re(t, n.e = o),
        i !== n.t && te(r, "src", n.t = i),
        a !== n.a && te(r, "alt", n.a = a),
        l !== n.o && te(r, "title", n.o = l),
        n
    }
    ), {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
    }),
    t;
    var t, r
}
var Yo = Q('<ul class="menu search-results">')
  , Ko = Q("<p class=center>")
  , Jo = Q('<li><span class="color-secondary right"></span><span class=color-secondary>');
function Qo(e) {
    return O(U, {
        get when() {
            return Xr().length > 0
        },
        get fallback() {
            return ae(e = Ko(), ( () => qr().not_found)),
            e;
            var e
        },
        get children() {
            var t = Yo();
            return t.$$mousedown = e => {
                e.preventDefault()
            }
            ,
            ae(t, O(j, {
                get each() {
                    return Xr()
                },
                children: (t, r) => {
                    return n = Jo(),
                    o = n.firstChild,
                    i = o.nextSibling,
                    n.$$click = () => e.onSelect(t),
                    o.style.setProperty("width", "2.5em"),
                    ae(o, ( () => t.rank)),
                    ae(n, O(qo, {
                        currency: t,
                        class: "grow"
                    }), i),
                    ae(i, ( () => t.symbol)),
                    m(( () => re(n, Yr("menu-item", r() === e.focusIndex && "focused")))),
                    n;
                    var n, o, i
                }
            })),
            t
        }
    })
}
function ei() {
    document.activeElement instanceof HTMLElement && document.activeElement.blur()
}
function ti(e) {
    const [t,r] = v(null)
      , [n,o] = v(0);
    function i(e) {
        ur(e.id),
        sr((e => "settings" === e ? "bubbles" : e));
        if (!Ir().some((t => e.id === t.id))) {
            const t = Bt.sliceFilters.find((t => e.rank >= t.from && e.rank <= t.to));
            t && jt(t)
        }
        ei()
    }
    return [O(po, {
        get value() {
            return mr()
        },
        get autoFocus() {
            return !mn()
        },
        iconComponent: Xo,
        get placeholder() {
            return qr().search_crypto
        },
        onInput: e => {
            br(e),
            o(0)
        }
        ,
        onFocus: e => {
            r(e.currentTarget.parentElement)
        }
        ,
        onBlur: () => {
            r(null),
            br(""),
            o(0),
            e.onBlur && e.onBlur()
        }
        ,
        onKeyDown: e => {
            let t = !0;
            switch (e.key) {
            case "ArrowDown":
                o((e => {
                    const t = e + 1;
                    return t >= Xr().length ? 0 : t
                }
                ));
                break;
            case "ArrowUp":
                o((e => {
                    const t = e - 1;
                    return t < 0 ? Xr().length - 1 : t
                }
                ));
                break;
            case "Enter":
                {
                    const e = Xr()[n()];
                    e && i(e);
                    break
                }
            case "Escape":
                ei();
                break;
            default:
                t = !1
            }
            t && e.preventDefault()
        }
    }), O(U, {
        keyed: !0,
        get when() {
            return t()
        },
        children: e => O(hn, {
            width: "inherit-from-anchor",
            anchor: e,
            get children() {
                return O(Qo, {
                    get focusIndex() {
                        return n()
                    },
                    onSelect: i
                })
            }
        })
    })]
}
ee(["mousedown", "click"]);
var ri = Q('<svg viewBox="0 -960 960 960"><path d=M120-200v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z>');
const ni = e => {
    return oe(t = ri(), e, !0, !0),
    t;
    var t
}
;
function oi() {
    const e = () => window.innerHeight / 2
      , t = () => window.scrollY >= e() / 2
      , [r,n] = v(t());
    function o() {
        n(t())
    }
    return window.addEventListener("scroll", o),
    C(( () => {
        window.removeEventListener("scroll", o)
    }
    )),
    O(Jr, {
        onClick: function() {
            r() ? function() {
                try {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                } catch {
                    window.scrollTo(0, 0)
                }
            }() : function() {
                try {
                    window.scrollBy({
                        top: e(),
                        behavior: "smooth"
                    })
                } catch {
                    window.scrollBy(0, e())
                }
            }()
        },
        get active() {
            return r()
        },
        get children() {
            return O(ni, {})
        }
    })
}
var ii = Q('<div class="flex-row gap-m header-padded">')
  , ai = Q("<header><img class=logo><h1></h1><div class=grow>");
function li() {
    const [e,t] = v(!1)
      , [r,n] = v(!1);
    return o = ai(),
    i = o.firstChild,
    (a = i.nextSibling).nextSibling,
    ae(a, ( () => Bt.app)),
    ae(o, O(U, {
        get when() {
            return mn()
        },
        get fallback() {
            return O(U, {
                get when() {
                    return r()
                },
                get fallback() {
                    return O(Jr, {
                        get title() {
                            return qr().search_crypto
                        },
                        onClick: () => n(!0),
                        get children() {
                            return O(Xo, {})
                        }
                    })
                },
                get children() {
                    return O(ti, {
                        onBlur: () => n(!1)
                    })
                }
            })
        },
        get children() {
            return [O(ti, {}), (r = ii(),
            ae(r, O(Zn, {
                withNavigator: !0
            })),
            r), O(fo, {}), O(oi, {}), O(Jr, {
                get active() {
                    return e()
                },
                onClick: () => t((e => !e)),
                get title() {
                    return qr().settings
                },
                get children() {
                    return O(rn, {})
                }
            }), O(Zo, {
                get value() {
                    return e()
                },
                component: Uo,
                onClose: () => t(!1)
            })];
            var r
        }
    }), null),
    ae(o, O(en, {}), null),
    m((e => {
        var t = Yr("header flex-row gap-m", r() && "mobile-search-open")
          , n = Bt.logo
          , a = Bt.app
          , l = `Logo of ${Bt.app}`;
        return t !== e.e && re(o, e.e = t),
        n !== e.t && te(i, "src", e.t = n),
        a !== e.a && te(i, "alt", e.a = a),
        l !== e.o && te(i, "title", e.o = l),
        e
    }
    ), {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
    }),
    o;
    var o, i, a
}
var si = Q('<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z">');
const ci = e => {
    return oe(t = si(), e, !0, !0),
    t;
    var t
}
;
var ui = Q('<svg viewBox="0 0 300 271"width=24 height=24><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z">');
const di = e => {
    return oe(t = ui(), e, !0, !0),
    t;
    var t
}
;
var hi = Q("<div class=support-crypto><div class=support-crypto-options>");
const pi = [];
function gi() {
    const [e,t] = v(null);
    return ae((r = hi()).firstChild, O(j, {
        each: pi,
        children: r => O(fn, {
            get active() {
                return e() === r
            },
            onClick: () => t((e => e === r ? null : r)),
            get children() {
                return r.name
            }
        })
    })),
    ae(r, O(U, {
        keyed: !0,
        get when() {
            return e()
        },
        children: e => O(po, {
            readonly: !0,
            action: "copy",
            get value() {
                return e.address
            }
        })
    }), null),
    r;
    var r
}
var fi = Q('<svg viewBox="0 0 512 512"><path d="m484.689 98.231-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L271.2 365.631l-51.034 49.086c-5.647 5.647-10.372 10.372-21.256 10.372l7.598-107.722L402.539 140.23c8.523-7.598-1.848-11.809-13.247-4.21L146.95 288.614 42.619 255.96c-22.694-7.086-23.104-22.695 4.723-33.579L455.423 65.166c18.893-7.085 35.427 4.209 29.266 33.065z">');
const vi = e => {
    return oe(t = fi(), e, !0, !0),
    t;
    var t
}
;
var mi = Q("<span class=grow>");
function bi() {
    return O(ro, {
        solid: !0,
        get content() {
            return ["Register on", O(j, {
                get each() {
                    return Bt.exchanges
                },
                children: e => O(U, {
                    get when() {
                        return e.referralUrl
                    },
                    get children() {
                        return O(e.iconComponent, {
                            style: {
                                "margin-right": "-6px"
                            }
                        })
                    }
                })
            })]
        },
        get children() {
            return O(j, {
                get each() {
                    return Bt.exchanges
                },
                children: e => O(U, {
                    keyed: !0,
                    get when() {
                        return e.referralUrl
                    },
                    children: t => O(Pr, {
                        class: "menu-item",
                        href: t,
                        get title() {
                            return `Register on ${e.name}`
                        },
                        get name() {
                            return `${e.name}_Register`
                        },
                        get children() {
                            return [O(e.iconComponent, {}), (t = mi(),
                            ae(t, ( () => e.name)),
                            t), O(cn, {})];
                            var t
                        }
                    })
                })
            })
        }
    })
}
var yi = Q('<svg viewBox="0 -960 960 960"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z">');
const wi = e => {
    return oe(t = yi(), e, !0, !0),
    t;
    var t
}
;
var _i = Q('<footer><section><h2 class="flex-row gap-m"><img width=32 height=32><span></span></h2><p>Crypto Bubbles is available as a website at cryptobubbles.net and as an app for your phone.</p><p>No financial advice. Do your own research!</p><p>Ulrich Stark, 92637 Weiden, Germany<br></p><p class=color-secondary>Version </p></section><section><h2></h2><nav class="flex-row flex-wrap gap-m"></nav></section><section class="flex-column gap-m"><h2>');
function Ci() {
    return ( () => {
        var e = _i()
          , t = e.firstChild
          , r = t.firstChild
          , n = r.firstChild
          , o = n.nextSibling
          , i = r.nextSibling.nextSibling.nextSibling;
        i.firstChild.nextSibling;
        var a = i.nextSibling;
        a.firstChild;
        var l = t.nextSibling
          , s = l.firstChild
          , c = s.nextSibling
          , u = l.nextSibling
          , d = u.firstChild;
        return ae(o, ( () => Bt.app)),
        ae(i, ( () => Bt.email), null),
        ae(a, "2024-11-26-20-11", null),
        ae(s, ( () => qr().links)),
        ae(c, O(Pr, {
            class: "solid-button",
            get href() {
                return `mailto:${Bt.email}`
            },
            get title() {
                return `Send E-Mail to ${Bt.email}`
            },
            name: "Mail",
            get children() {
                return [O(ci, {}), " E-Mail"]
            }
        }), null),
        ae(c, O(Pr, {
            class: "solid-button",
            get href() {
                return `https://x.com/${Bt.x}`
            },
            get title() {
                return `@${Bt.x} on X`
            },
            name: "X",
            get children() {
                return [O(di, {}), " X"]
            }
        }), null),
        ae(c, O(Pr, {
            class: "solid-button",
            get href() {
                return `https://t.me/${Bt.telegram}`
            },
            get title() {
                return `@${Bt.telegram} on Telegram`
            },
            name: "Telegram",
            get children() {
                return [O(vi, {}), " Telegram"]
            }
        }), null),
        ae(c, O(U, {
            get when() {
                return Lr.isWeb
            },
            get children() {
                return [O(Pr, {
                    class: "solid-button",
                    get href() {
                        return Bt.playStore
                    },
                    title: "Crypto Bubbles App on Google Play",
                    name: "GooglePlay",
                    get children() {
                        return [O(Sr, {}), " Google Play"]
                    }
                }), O(Pr, {
                    class: "solid-button",
                    get href() {
                        return Bt.appStore
                    },
                    title: "Crypto Bubbles App on App Store",
                    name: "AppStore",
                    get children() {
                        return [O(Fr, {}), " App Store"]
                    }
                }), O(Pr, {
                    class: "solid-button",
                    href: "/mediakit.zip",
                    title: "Download Media Kit of Crypto Bubbles",
                    name: "MediaKit",
                    get children() {
                        return [O(wi, {}), " Media Kit"]
                    }
                })]
            }
        }), null),
        ae(d, ( () => qr().support_my_work)),
        ae(u, O(U, {
            get when() {
                return "ios" === Lr.env
            },
            get children() {
                return O(Pr, {
                    class: "solid-button",
                    get href() {
                        return Bt.appStore
                    },
                    name: "AppStore_Rate",
                    get children() {
                        return ["Rate App on App Store ", O(Fr, {})]
                    }
                })
            }
        }), null),
        ae(u, O(U, {
            get when() {
                return "android" === Lr.env
            },
            get children() {
                return O(Pr, {
                    class: "solid-button",
                    get href() {
                        return Bt.playStore
                    },
                    name: "GooglePlay_Rate",
                    get children() {
                        return ["Rate App on Google Play ", O(Sr, {})]
                    }
                })
            }
        }), null),
        ae(u, O(Pr, {
            class: "solid-button",
            get href() {
                return `https://x.com/intent/follow?screen_name=${Bt.x}`
            },
            name: "X_Follow",
            get children() {
                return ["Follow Crypto Bubbles on ", O(di, {})]
            }
        }), null),
        ae(u, O(bi, {}), null),
        ae(u, O(gi, {}), null),
        m((e => {
            var t = Bt.logo
              , r = Bt.app
              , o = `Logo of ${Bt.app}`;
            return t !== e.e && te(n, "src", e.e = t),
            r !== e.t && te(n, "alt", e.t = r),
            o !== e.a && te(n, "title", e.a = o),
            e
        }
        ), {
            e: void 0,
            t: void 0,
            a: void 0
        }),
        e
    }
    )()
}
function ki(e) {
    ur((t => t === e ? null : e))
}
function xi(e, t) {
    const r = function(e) {
        if (e > 1e6)
            return 2;
        {
            const t = 4 - Math.ceil(Math.log10(e));
            return !Number.isFinite(t) || t < 0 ? 0 : t > 12 ? 12 : 1 === t ? 2 : t
        }
    }(e)
      , n = {
        style: "currency",
        currency: t.code,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: r,
        maximumFractionDigits: r
    };
    e > 1e6 && (n.notation = "compact");
    try {
        return e.toLocaleString(void 0, n)
    } catch {
        return n.currencyDisplay = "symbol",
        e.toLocaleString(void 0, n)
    }
}
function Mi(e) {
    return Or(e, Kt)
}
var zi = Q('<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z">');
const Li = e => {
    return oe(t = zi(), e, !0, !0),
    t;
    var t
}
;
var Bi = Q("<ul class=menu>")
  , Si = Q("<li><span class=grow>");
function Ai(e) {
    return O(U, {
        when: !jr,
        get children() {
            return O(ro, {
                class: "button-lists",
                get title() {
                    return qr().add_to_list
                },
                get content() {
                    return [O(ao, {}), O(j, {
                        get each() {
                            return ( () => {
                                const t = [];
                                Rr(e.currency) && t.push(An),
                                Mi(e.currency) && t.push(Hn);
                                for (const r of tr)
                                    if (Or(e.currency, r.record)) {
                                        t.push($n);
                                        break
                                    }
                                return t
                            }
                            )()
                        },
                        children: e => O(e, {
                            class: "color-secondary"
                        })
                    })]
                },
                get children() {
                    var t = Bi();
                    return ae(t, O(j, {
                        get each() {
                            return En()
                        },
                        children: t => {
                            return r = Si(),
                            n = r.firstChild,
                            r.$$click = r => {
                                t.toggleCurrency(e.currency),
                                r.stopImmediatePropagation()
                            }
                            ,
                            ae(r, O(t.iconComponent, {}), n),
                            ae(n, ( () => t.name)),
                            ae(r, O(U, {
                                get when() {
                                    return Or(e.currency, t.record)
                                },
                                get fallback() {
                                    return O(ao, {})
                                },
                                get children() {
                                    return O(Li, {})
                                }
                            }), null),
                            m(( () => re(r, Yr("menu-item", Or(e.currency, t.record) && "selected")))),
                            r;
                            var r, n
                        }
                    })),
                    t
                }
            })
        }
    })
}
ee(["click"]);
var Pi = Q('<svg viewBox="-7 -7 55 55"><rect x=-7 y=-7 width=55 height=55 fill=#3861fb rx=12></rect><path d="m35.124 24.5c-0.715 0.452-1.557 0.508-2.197 0.147-0.813-0.459-1.26-1.534-1.26-3.029v-4.473c0-2.16-0.854-3.697-2.282-4.112-2.42-0.705-4.24 2.256-4.924 3.368l-4.268 6.92v-8.458c-0.048-1.946-0.68-3.11-1.88-3.461-0.794-0.232-1.982-0.139-3.136 1.627l-9.562 15.354c-1.2801-2.4302-1.9475-5.1363-1.944-7.883 0-9.249 7.412-16.773 16.522-16.773s16.521 7.524 16.521 16.773c0 0.016 4e-3 0.03 5e-3 0.045 0 0.016-3e-3 0.03-2e-3 0.046 0.086 1.791-0.494 3.216-1.593 3.91zm5.261-3.999v-0.047l-1e-3 -0.046c-0.051-11.264-9.088-20.408-20.192-20.408-11.133 0-20.192 9.196-20.192 20.5 0 11.303 9.059 20.5 20.193 20.5 5.109 0 9.985-1.942 13.728-5.467 0.744-0.7 0.788-1.879 0.098-2.633-0.68394-0.7542-1.854-0.79931-2.594-0.1-3.0339 2.873-7.0536 4.4738-11.232 4.473-4.878 0-9.267-2.159-12.294-5.583l8.623-13.846v6.383c0 3.066 1.189 4.057 2.186 4.347 0.998 0.29 2.523 0.092 4.124-2.508l4.743-7.689c0.152-0.248 0.292-0.462 0.42-0.647v3.888c0 2.866 1.148 5.158 3.149 6.287 1.804 1.018 4.072 0.926 5.92-0.24 2.24-1.415 3.447-4.022 3.321-7.164z"fill=#fff>');
const Hi = e => {
    return (t = Pi()).firstChild,
    oe(t, e, !0, !0),
    t;
    var t
}
;
var Ti = Q("<div class=icon-button-dummy>");
function $i(e) {
    return O(U, {
        keyed: !0,
        get when() {
            return e.currency.slug
        },
        get fallback() {
            return O(U, {
                get when() {
                    return e.insertUnlistedDummy
                },
                get children() {
                    return Ti()
                }
            })
        },
        children: t => O(Pr, {
            href: `https://coinmarketcap.com/currencies/${t}`,
            get title() {
                return qr().info_tooltip.replace("(currency)", e.currency.name).replace("(service)", "CoinMarketCap")
            },
            name: "CMC",
            class: "icon-button",
            get children() {
                return O(Hi, {})
            }
        })
    })
}
var Fi = Q('<svg viewBox="0 0 96 96"><path d="M95.3201 47.7848C95.437 74.2931 74.1955 95.8818 47.8757 95.9995C21.5525 96.1172 0.120677 74.7236 0.00047986 48.2152C-0.116378 21.7035 21.1251 0.118179 47.445 0.000483373C73.7681 -0.117212 95.2 21.2731 95.3168 47.7848H95.3201Z"fill=#8DC63F></path><path d="M91.7276 47.7979C91.8378 72.3122 72.1955 92.2733 47.859 92.3843C23.519 92.4953 3.69988 72.7124 3.58969 48.1981C3.47951 23.6839 23.1217 3.72273 47.4616 3.61177C71.7982 3.50416 91.6174 23.2837 91.7276 47.7979Z"fill=#F9E988></path><path d="M70.0087 32.1144C66.8101 31.183 63.498 29.8581 60.1392 28.5231C59.9455 27.6756 59.201 26.6198 57.6918 25.3251C55.4982 23.4083 51.3781 23.4588 47.819 24.3062C43.8892 23.3747 40.0062 23.0418 36.2801 23.943C5.81008 32.4003 23.0851 53.0239 11.8967 73.7618C13.4893 77.1615 30.6475 97.0083 55.4749 91.6817C55.4749 91.6817 46.9843 71.1321 66.1457 61.2659C81.6879 53.266 92.9163 38.4095 70.0054 32.1111L70.0087 32.1144Z"fill=#8BC53F></path><path d="M49.9291 37.0607C49.9291 41.8022 46.1128 45.6424 41.4085 45.6424C36.7041 45.6424 32.8878 41.8022 32.8878 37.0607C32.8878 32.3193 36.7041 28.4824 41.4085 28.4824C46.1128 28.4824 49.9291 32.3227 49.9291 37.0607Z"fill=white></path><path d="M47.4049 37.1416C47.4049 40.474 44.7205 43.1776 41.4117 43.1776C38.103 43.1776 35.4186 40.4774 35.4186 37.1416C35.4186 33.8057 38.103 31.1055 41.4117 31.1055C44.7205 31.1055 47.4049 33.8091 47.4049 37.1416Z"fill=#58595B></path><path d="M80.6726 49.4091C73.7713 54.3086 65.9151 58.0244 54.7802 58.0244C49.5683 58.0244 48.5099 52.4457 45.0643 55.1796C43.2847 56.5919 37.0144 59.7495 32.0362 59.5108C27.0146 59.2687 18.9982 56.3296 16.7445 45.6328C15.853 56.3296 15.3989 64.2119 11.4091 73.2441C19.3521 86.0527 38.2865 95.9324 55.4747 91.6853C53.6283 78.6951 64.9001 65.9739 71.2505 59.4637C73.6545 56.9988 78.262 52.9736 80.6726 49.4091Z"fill=#8BC53F></path><path d="M80.4024 49.7321C78.2588 51.6993 75.708 53.1587 73.1104 54.4432C70.4861 55.6908 67.7516 56.7063 64.927 57.4428C62.1124 58.1759 59.1709 58.7273 56.1927 58.4583C53.2679 58.1994 50.1761 57.1637 48.2029 54.9207L48.2964 54.8131C50.7304 56.3936 53.5049 56.9485 56.2795 57.0292C59.054 57.1032 61.882 56.8947 64.6699 56.3264C67.4511 55.748 70.1823 54.8838 72.8233 53.7875C75.4576 52.6913 78.0619 51.4235 80.3089 49.6211L80.399 49.7287L80.4024 49.7321Z"fill=#58595B>');
const Di = e => {
    return oe(t = Fi(), e, !0, !0),
    t;
    var t
}
;
var Ei = Q("<div class=icon-button-dummy>");
function Vi(e) {
    return O(U, {
        keyed: !0,
        get when() {
            return e.currency.cg_id
        },
        get fallback() {
            return O(U, {
                get when() {
                    return e.insertUnlistedDummy
                },
                get children() {
                    return Ei()
                }
            })
        },
        children: t => O(Pr, {
            href: `https://www.coingecko.com/coins/${t}`,
            get title() {
                return qr().info_tooltip.replace("(currency)", e.currency.name).replace("(service)", "CoinGecko")
            },
            name: "CoinGecko",
            class: "icon-button",
            get children() {
                return O(Di, {})
            }
        })
    })
}
class Ni {
    constructor(e, t) {
        this.duration = t,
        this.startValue = 0,
        this.endValue = e,
        this.startTime = null
    }
    get() {
        if (null === this.startTime)
            return this.endValue;
        {
            const e = Date.now() - this.startTime;
            if (e >= this.duration)
                return this.startTime = null,
                this.endValue;
            const t = e / this.duration;
            return function(e, t, r) {
                return e + (t - e) * r
            }(this.startValue, this.endValue, t)
        }
    }
    set(e, t=!1) {
        t ? this.startTime = null : (this.startValue = this.get(),
        this.startTime = Date.now()),
        this.endValue = e
    }
    isDone() {
        return null === this.startTime || Date.now() >= this.startTime + this.duration && (this.startTime = null,
        !0)
    }
}
function Oi(e, t) {
    const r = function(e) {
        return e > 1e6 ? 2 : 0
    }(e)
      , n = {
        style: "currency",
        currency: t.code,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: r,
        maximumFractionDigits: r
    };
    e > 1e6 && (n.notation = "compact");
    try {
        return e.toLocaleString(void 0, n)
    } catch {
        return n.currencyDisplay = "symbol",
        e.toLocaleString(void 0, n)
    }
}
var Ri = Q("<span class=number>");
function ji(e) {
    const t = e.children
      , [r,n] = v(t)
      , [o,i] = v(t)
      , [a,l] = v("")
      , s = new Ni(t,500);
    let c = null;
    const u = () => {
        s.isDone() ? (i(r()),
        l(""),
        c = null) : (i(s.get()),
        c = requestAnimationFrame(u))
    }
    ;
    b(( () => {
        const t = r()
          , o = e.children;
        if (t !== o) {
            n(o),
            s.set(o);
            const r = o - t
              , i = Vn(e.reverseColor ? -r : r, Zt());
            l(i ? `color: ${i}` : ""),
            c = requestAnimationFrame(u)
        }
    }
    )),
    C(( () => {
        null !== c && (cancelAnimationFrame(c),
        c = null)
    }
    ));
    const d = () => {
        switch (e.format) {
        case "currency-amount":
            return Oi(o(), Gr());
        case "currency-price":
            return xi(o(), Gr());
        default:
            return Math.round(o())
        }
    }
    ;
    return ae(h = Ri(), d),
    m((e => ne(h, a(), e))),
    h;
    var h
}
var Ui = Q("<div class=icon-box>")
  , Ii = Q("<div>")
  , Zi = Q('<span class="grow color-secondary">');
function Wi(e) {
    function t(t) {
        return qr().trade_tooltip.replace("(currency)", e.currency.name).replace("(exchange)", t)
    }
    const r = y(( () => {
        const t = [];
        let r = 0;
        for (const n of Bt.exchanges) {
            const o = e.currency.symbols[n.id];
            t.push({
                exchange: n,
                symbol: o
            }),
            o && r++
        }
        return {
            items: t,
            count: r
        }
    }
    ));
    return O(U, {
        get when() {
            return r().count > 0
        },
        get children() {
            return O(ro, {
                solid: !0,
                get title() {
                    return t(r().items.filter((e => e.symbol)).map((e => e.exchange.name)).join(", "))
                },
                get class() {
                    return e.tabular ? void 0 : "dense-link-trade"
                },
                get content() {
                    return O(U, {
                        get when() {
                            return e.tabular
                        },
                        get fallback() {
                            return [y(( () => qr().trade)), (e = Ui(),
                            ae(e, O(j, {
                                get each() {
                                    return r().items
                                },
                                children: e => O(U, {
                                    get when() {
                                        return e.symbol
                                    },
                                    get fallback() {
                                        return Ii()
                                    },
                                    get children() {
                                        return O(e.exchange.iconComponent, {})
                                    }
                                })
                            })),
                            e)];
                            var e
                        },
                        get children() {
                            return O(j, {
                                get each() {
                                    return r().items
                                },
                                children: e => O(U, {
                                    get when() {
                                        return e.symbol
                                    },
                                    get fallback() {
                                        return (e = Ii()).style.setProperty("width", "18px"),
                                        e;
                                        var e
                                    },
                                    get children() {
                                        return O(e.exchange.iconComponent, {
                                            style: {
                                                "margin-right": "-6px"
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    })
                },
                get children() {
                    return O(j, {
                        get each() {
                            return r().items
                        },
                        children: r => O(U, {
                            keyed: !0,
                            get when() {
                                return r.symbol
                            },
                            children: n => O(Pr, {
                                class: "menu-item",
                                get href() {
                                    return r.exchange.getSpotTradeUrl(n)
                                },
                                get title() {
                                    return t(r.exchange.name)
                                },
                                get name() {
                                    return `${r.exchange.name}_Trade`
                                },
                                get children() {
                                    return [O(r.exchange.iconComponent, {}), (t = Zi(),
                                    ae(t, ( () => r.exchange.name)),
                                    t), O(U, {
                                        get when() {
                                            return e.currency.exchangePrices[r.exchange.id]
                                        },
                                        children: e => O(ji, {
                                            format: "currency-price",
                                            get children() {
                                                return e()
                                            }
                                        })
                                    }), O(cn, {})];
                                    var t
                                }
                            })
                        })
                    })
                }
            })
        }
    })
}
var Xi = Q('<svg viewBox="0 0 180 180"><rect width=180 height=180 fill=black></rect><path d="M115.055 72.5C115.055 79.8638 109.086 85.8333 101.722 85.8333C94.3583 85.8333 88.3888 79.8638 88.3888 72.5C88.3888 65.1362 94.3583 59.1667 101.722 59.1667C109.086 59.1667 115.055 65.1362 115.055 72.5ZM81.9999 59.7778H28.6667L28.6665 86.4444H55.3332V125.556H81.9999V59.7778ZM128.755 59.7778H159.333L131.778 125.556H101.111L128.755 59.7778Z"fill=white>');
const Gi = e => {
    return oe(t = Xi(), e, !0, !0),
    t;
    var t
}
;
var qi = Q("<div class=icon-button-dummy>");
function Yi(e) {
    return O(U, {
        keyed: !0,
        get when() {
            return function(e) {
                for (const t of Bt.exchanges)
                    if (t.isOnTradingView) {
                        const r = e.symbols[t.id];
                        if (r) {
                            const e = r.replace("_", "").replace("/", "").replace("-", "");
                            return `${t.id.toUpperCase()}:${e}`
                        }
                    }
                return null
            }(e.currency)
        },
        get fallback() {
            return O(U, {
                get when() {
                    return e.insertUnlistedDummy
                },
                get children() {
                    return qi()
                }
            })
        },
        children: t => O(Pr, {
            href: `https://www.tradingview.com/chart/?symbol=${t}&aff_id=143493`,
            get title() {
                return qr().info_tooltip.replace("(currency)", e.currency.name).replace("(service)", "TradingView")
            },
            name: "TradingView",
            class: "icon-button",
            get children() {
                return O(Gi, {})
            }
        })
    })
}
var Ki = Q('<div class="currency-links flex-row gap-m">');
function Ji(e) {
    return ae(t = Ki(), O($i, {
        get currency() {
            return e.currency
        },
        get insertUnlistedDummy() {
            return e.tabular
        }
    }), null),
    ae(t, O(Vi, {
        get currency() {
            return e.currency
        },
        get insertUnlistedDummy() {
            return e.tabular
        }
    }), null),
    ae(t, O(Yi, {
        get currency() {
            return e.currency
        },
        get insertUnlistedDummy() {
            return e.tabular
        }
    }), null),
    ae(t, O(Wi, {
        get currency() {
            return e.currency
        },
        get tabular() {
            return e.tabular
        }
    }), null),
    t;
    var t
}
var Qi = Q('<svg width=24 height=12 viewBox="0 6 24 12"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z">');
const ea = e => {
    return oe(t = Qi(), e, !0, !0),
    t;
    var t
}
;
var ta = Q('<span class="currency-rank-change flex-column">')
  , ra = Q("<span class=currency-rank>");
function na(e) {
    const t = () => e.currency.rankDiffs[e.period]
      , r = () => Vn(t(), Zt());
    return ae(n = ra(), O(U, {
        get when() {
            return t() < 0
        },
        get children() {
            var e = ta();
            return ae(e, ( () => Math.abs(t())), null),
            ae(e, O(on, {}), null),
            m(( () => null != r() ? e.style.setProperty("color", r()) : e.style.removeProperty("color"))),
            e
        }
    }), null),
    ae(n, O(U, {
        get when() {
            return t() > 0
        },
        get children() {
            var e = ta();
            return ae(e, O(ea, {}), null),
            ae(e, t, null),
            m(( () => null != r() ? e.style.setProperty("color", r()) : e.style.removeProperty("color"))),
            e
        }
    }), null),
    ae(n, O(U, {
        get when() {
            return e.animate
        },
        get fallback() {
            return e.currency.rank
        },
        get children() {
            return O(ji, {
                format: "integer",
                reverseColor: !0,
                get children() {
                    return e.currency.rank
                }
            })
        }
    }), null),
    n;
    var n
}
var oa = Q("<td class=center>")
  , ia = Q('<tr><td class=right></td><td><div class="flex-row gap-m"></div></td><td class=right></td><td class=right></td><td class="right padding-right"></td><td>');
function aa(e) {
    function t(e) {
        return ae(t = oa(), ( () => On(e))),
        m(( () => null != Nn(e, Zt()) ? t.style.setProperty("background-color", Nn(e, Zt())) : t.style.removeProperty("background-color"))),
        t;
        var t
    }
    return r = ia(),
    n = r.firstChild,
    o = n.nextSibling,
    i = o.firstChild,
    a = o.nextSibling,
    l = a.nextSibling,
    s = l.nextSibling,
    c = s.nextSibling,
    ae(n, O(na, {
        get currency() {
            return e.currency
        },
        period: "day"
    })),
    ae(i, O(Ai, {
        get currency() {
            return e.currency
        }
    }), null),
    ae(i, O(fn, {
        class: "currency-name",
        onClick: () => ki(e.currency.id),
        get active() {
            return cr() === e.currency.id
        },
        get children() {
            return O(qo, {
                get currency() {
                    return e.currency
                }
            })
        }
    }), null),
    ae(a, ( () => xi(e.currency.price, Gr()))),
    ae(l, ( () => Oi(e.currency.marketcap, Gr()))),
    ae(s, ( () => Oi(e.currency.volume, Gr()))),
    ae(r, ( () => t(e.currency.performance.min5)), c),
    ae(r, ( () => t(e.currency.performance.hour)), c),
    ae(r, ( () => t(e.currency.performance.hour6)), c),
    ae(r, ( () => t(e.currency.performance.day)), c),
    ae(c, O(Ji, {
        get currency() {
            return e.currency
        },
        tabular: !0
    })),
    r;
    var r, n, o, i, a, l, s, c
}
var la = Q('<svg viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z">');
const sa = e => {
    return oe(t = la(), e, !0, !0),
    t;
    var t
}
;
var ca = Q("<div class=scroll-container><table><thead><tr><th> & </th></tr></thead><tbody>")
  , ua = Q("<th><div><span>");
const da = [{
    label: () => "#",
    sortComparator: (e, t) => t.rank - e.rank
}, {
    label: () => qr().currencyName,
    sortComparator: (e, t) => t.name.localeCompare(e.name)
}, {
    class: "justify-end",
    label: () => qr().price,
    sortComparator: (e, t) => t.price - e.price
}, {
    label: () => qr().marketcap,
    sortComparator: (e, t) => t.marketcap - e.marketcap
}, {
    label: () => qr().volume,
    sortComparator: (e, t) => t.volume - e.volume
},
{
    label: () => qr().period_min5,
    sortComparator: (e, t) => (t.performance.min5 || 0) - (e.performance.min5 || 0)
},
{
    label: () => qr().period_hour,
    sortComparator: (e, t) => (t.performance.hour || 0) - (e.performance.hour || 0)
},
 {
    label: () => qr().period_hour6,
    sortComparator: (e, t) => (t.performance.hour6 || 0) - (e.performance.hour6 || 0)
},
{
    label: () => qr().period_day,
    sortComparator: (e, t) => (t.performance.day || 0) - (e.performance.day || 0)
}
//, {
//    label: () => qr().period_month,
//    sortComparator: (e, t) => (t.performance.month || 0) - (e.performance.month || 0)
//}
//, {
//    label: () => qr().period_year,
//    sortComparator: (e, t) => (t.performance.year || 0) - (e.performance.year || 0)
//}
];
function ha(e) {
    const [r,n] = v("");
    let o, i;
    const l = function(e, r=t, n) {
        const o = new Map
          , i = B((t => {
            const n = e();
            for (const [e,i] of o.entries())
                if (r(e, n) !== r(e, t))
                    for (const t of i.values())
                        t.state = a,
                        t.pure ? h.push(t) : p.push(t);
            return n
        }
        ), void 0, !0, a);
        return L(i),
        e => {
            const t = d;
            if (t) {
                let r;
                (r = o.get(e)) ? r.add(t) : o.set(e, r = new Set([t])),
                C(( () => {
                    r.delete(t),
                    !r.size && o.delete(e)
                }
                ))
            }
            return r(e, i.value)
        }
    }(( () => {
        var e;
        return null == (e = pr()) ? void 0 : e.column
    }
    ));
    function s() {
        if (!o) {
            const e = document.querySelector("header");
            e && (o = e.offsetHeight - 2)
        }
        if (i && o) {
            const e = -1 * i.getBoundingClientRect().top
              , t = Math.max(0, Math.round(e + o));
            n(`transform:translateY(${t}px)`)
        }
    }
    return window.addEventListener("scroll", s),
    C(( () => window.removeEventListener("scroll", s))),
    c = ca(),
    u = c.firstChild,
    g = u.firstChild,
    f = g.firstChild,
    b = f.firstChild,
    y = b.firstChild,
    w = g.nextSibling,
    "function" == typeof i ? ie(i, u) : i = u,
    ae(f, O(j, {
        each: da,
        children: e => {
            return t = ua(),
            r = t.firstChild,
            n = r.firstChild,
            t.$$click = () => function(e) {
                gr((t => t && t.column === e ? "asc" === t.direction ? null : {
                    ...t,
                    direction: "asc"
                } : {
                    column: e,
                    direction: "desc"
                }))
            }(e),
            ae(r, O(sa, {}), n),
            ae(n, ( () => e.label())),
            m((n => {
                var o, i = Yr("sortable", l(e) && `sorted-${null == (o = pr()) ? void 0 : o.direction}`), a = Yr("flex-row", e.class);
                return i !== n.e && re(t, n.e = i),
                a !== n.t && re(r, n.t = a),
                n
            }
            ), {
                e: void 0,
                t: void 0
            }),
            t;
            var t, r, n
        }
    }), b),
    ae(b, ( () => qr().links), y),
    ae(b, ( () => qr().trade), null),
    ae(w, O(j, {
        get each() {
            return e.rows
        },
        children: e => O(aa, {
            currency: e
        })
    })),
    m((e => ne(g, r(), e))),
    c;
    var c, u, g, f, b, y, w
}
ee(["click"]);
var pa = Q("<div class=center-container>");
const ga = 100
  , fa = 100;
function va() {
    const [e,t] = v(ga);
    b(function(e, t, r) {
        const n = Array.isArray(e);
        let o, i = r && r.defer;
        return r => {
            let a;
            if (n) {
                a = Array(e.length);
                for (let t = 0; t < e.length; t++)
                    a[t] = e[t]()
            } else
                a = e();
            if (i)
                return void (i = !1);
            const l = w(( () => t(a, o, r)));
            return o = a,
            l
        }
    }(Rt, ( () => {
        t(ga)
    }
    )));
    const r = y(( () => {
        const t = pr();
        let r = Ir();
        if (t) {
            const {sortComparator: e} = t.column;
            r = [...r].sort("asc" === t.direction ? (t, r) => e(r, t) : e)
        }
        return r.slice(0, e())
    }
    ));
    return O(U, {
        get when() {
            return y(( () => "loaded" === dr()))() && r().length > 0
        },
        get children() {
            return [O(ha, {
                get rows() {
                    return r()
                }
            }), O(U, {
                get when() {
                    return Ir().length > e()
                },
                get children() {
                    var e = pa();
                    return ae(e, O(fn, {
                        onClick: () => t((e => e + fa)),
                        get children() {
                            return [O(sa, {}), y(( () => qr().show_more))]
                        }
                    })),
                    e
                }
            })]
        }
    })
}
function ma(e, t, r) {
    return e < t ? t : e > r ? r : e
}
const ba = {
    red: 127,
    green: 127,
    blue: 127
};
function ya(e, t, r) {
    if (0 === e || 0 === r)
        return ba;
    const n = ma(Math.abs(e / r), .2, 1)
      , o = Math.floor(127 * (1 - n))
      , i = Math.floor(155 + 100 * n);
    return e > 0 ? "yellow-blue" === t ? {
        red: o,
        green: o + 70,
        blue: i
    } : {
        red: o,
        green: i,
        blue: o
    } : "yellow-blue" === t ? {
        red: i,
        green: i,
        blue: o
    } : {
        red: i,
        green: o,
        blue: o
    }
}
function wa(e) {
    return "min1" !== e && "min5" !== e && "min15" !== e
}
function _a(e, t, r) {
    switch (t) {
    case "neutral":
        return 0;
    case "performance":
        return e.performance[r] || 0;
    case "rank-diff":
        return wa(r) ? e.rankDiffs[r] : 0
    }
}
function Ca(e, t, r, n) {
    switch (t) {
    case "name":
        return e.name;
    case "price":
        return xi(e.price, n);
    case "marketcap":
        return Oi(e.marketcap, n);
    case "volume":
        return Oi(e.volume, n);
    case "performance":
        return On(e.performance[r]);
    case "rank":
        return e.rank.toString();
    case "dominance":
        return `${(100 * e.dominance).toFixed(2)}%`;
    case "rank-diff":
        {
            const t = wa(r) ? e.rankDiffs[r] : 0;
            return 0 === t ? "-" : t.toLocaleString(void 0, {
                signDisplay: "always"
            })
        }
    }
}
function ka(e) {
    return Math.pow(e, .8)
}
function xa(e, t, r) {
    switch (t) {
    case "marketcap":
        return ka(e.marketcap);
    case "volume":
        return ka(e.volume);
    case "performance":
        {
            const t = Math.abs(e.performance[r] || 0);
            return ka(Math.min(1e3, t))
        }
    case "rank-diff":
        return wa(r) ? ka(Math.abs(e.rankDiffs[r])) : 1
    }
}
function Ma() {
    return 2 * Math.random() - 1
}
const za = class {
    static get(e) {
        let t = this.images[e];
        if (!t) {
            const r = document.createElement("img");
            let n = !1;
            r.addEventListener("load", ( () => {
                n = !0
            }
            )),
            r.src = e,
            t = () => n ? r : null,
            this.images[e] = t
        }
        return t
    }
}
;
za.images = {};
let La = za;
class Ba {
    constructor(e) {
        this.size = null,
        this.imageBitmap = null,
        this.canvas = document.createElement("canvas"),
        this.context = this.canvas.getContext("2d"),
        this.padding = e
    }
    begin(e) {
        const t = e + 2 * this.padding;
        this.size !== t ? (this.size = t,
        this.canvas.width = t,
        this.canvas.height = t) : this.context.clearRect(0, 0, t, t)
    }
    end() {
        this.imageBitmap = null;
        try {
            createImageBitmap(this.canvas).then((e => this.imageBitmap = e)).catch(( () => {}
            ))
        } catch {}
    }
    createRadialGradient(e, t, r, n, o, i) {
        return this.context.createRadialGradient(e + this.padding, t + this.padding, r, n + this.padding, o + this.padding, i)
    }
    circle(e, t, r) {
        this.context.beginPath(),
        this.context.arc(e + this.padding, t + this.padding, r, 0, 2 * Math.PI),
        this.context.closePath()
    }
    stroke(e, t) {
        this.context.lineWidth = t,
        this.context.strokeStyle = e,
        this.context.stroke()
    }
    fill(e) {
        this.context.fillStyle = e,
        this.context.fill()
    }
    fillText(e, t, r, n) {
        this.context.font = `${Math.ceil(n)}px Arial`,
        this.context.fillText(e, t + this.padding, r + this.padding)
    }
    drawImage(e, t, r, n, o) {
        this.context.drawImage(e, t + this.padding, r + this.padding, n, o)
    }
    getImage() {
        return this.imageBitmap || this.canvas
    }
}
const Sa = new Date
  , Aa = Sa.getDate()
  , Pa = 11 === Sa.getMonth() && Aa >= 19 && Aa <= 25 ? [La.get("/images/christmas1.png"), La.get("/images/christmas2.png"), La.get("/images/christmas3.png")] : [];
class Ha {
    constructor(e) {
        this.lastFingerprint = "",
        this.radiusTween = new Ni(0,1e3),
        this.color = "",
        this.transitionRadius = null,
        this.posX = 0,
        this.posY = 0,
        this.speedX = 0,
        this.speedY = 0,
        this.size = 0,
        this.radius = 0,
        this.content = "",
        this.visible = !1,
        this.latestPush = 0,
        this.renderFavoriteBorder = !0,
        this.currency = e,
        this.canvas = new Ba(Bt.bubblePadding),
        this.lazyImage = La.get(e.image)
    }
    applyForce(e, t) {
        this.speedX += e,
        this.speedY += t
    }
    setRadius(e, t) {
        e = Number.isFinite(e) ? e : 0,
        this.radiusTween.set(e, t),
        t || (this.transitionRadius = Math.max(e, this.radius))
    }
    setColor(e) {
        const {red: t, green: r, blue: n} = e;
        this.color = `${Math.round(t)}, ${Math.round(r)}, ${Math.round(n)}`
    }
    setContent(e) {
        this.content = e
    }
    update() {
        this.radius = this.radiusTween.get(),
        this.visible = this.radius > 0
    }
    rerender(e) {
        const t = this.lazyImage()
          , r = Math.round(e)
          , n = this.renderFavoriteBorder && Mi(this.currency)
          , o = `${this.color} ${r} ${this.content} ${Boolean(t)} ${n}`;
        if (o !== this.lastFingerprint) {
            this.lastFingerprint = o;
            const e = 2 * r;
            this.canvas.begin(e);
            const i = this.canvas.createRadialGradient(r, r, 0, r, r, r);
            if (i.addColorStop(0, `rgba(${this.color}, 0.05)`),
            i.addColorStop(.8, `rgba(${this.color}, 0.1)`),
            i.addColorStop(.9, `rgba(${this.color}, 0.4)`),
            i.addColorStop(1, `rgb(${this.color})`),
            this.canvas.circle(r, r, r),
            this.canvas.fill(i),
            n) {
                const e = "red-green" === Zt() ? "yellow" : "#f4a";
                this.canvas.circle(r, r, r),
                this.canvas.stroke(e, Bt.bubbleBorder)
            }
            const a = r > 30
              , l = r * (a ? .55 : 1.2)
              , s = l * (t ? t.width / t.height : 1)
              , c = .5 * (e - s)
              , u = (e - l) * (a ? .14 : .5);
            if (t)
                this.canvas.drawImage(t, c, u, s, l);
            else {
                const e = .5 * l;
                this.canvas.circle(c + e, u + e, e),
                this.canvas.stroke("white", 1)
            }
            if (a) {
                this.canvas.context.textAlign = "center",
                this.canvas.context.fillStyle = "white";
                const t = r * (this.currency.symbol.length < 5 ? .55 : .35);
                this.canvas.fillText(this.currency.symbol, r, 1.25 * r, t);
                const n = r * (this.content.length > 8 ? .24 : .3);
                this.canvas.fillText(this.content, r, 1.65 * r, n),
                Pa.forEach(( (t, r) => {
                    if ((this.currency.rank + Aa + r) % 2 == 0) {
                        const r = t();
                        r && this.canvas.context.drawImage(r, 0, 0, e, e)
                    }
                }
                ))
            }
            this.canvas.end()
        }
    }
    render(e) {
        const t = this.radius + Bt.bubblePadding
          , r = this.posX - t
          , n = this.posY - t;
        if (null !== this.transitionRadius) {
            this.rerender(this.transitionRadius);
            const o = 2 * t;
            e.drawImage(this.canvas.getImage(), r, n, o, o),
            this.radiusTween.isDone() && (this.transitionRadius = null)
        } else
            this.rerender(this.radius),
            e.drawImage(this.canvas.getImage(), r, n)
    }
}
class Ta {
    constructor(e) {
        this.frameHandle = null,
        this.lastTime = null,
        this.elementWidth = 0,
        this.elementHeight = 0,
        this.nextContainerFill = 0,
        this.width = 0,
        this.height = 0,
        this.eventResize = new xr,
        this.eventFrame = new xr,
        this.frame = e => {
            this.frameHandle = null;
            let t = 0;
            null !== this.lastTime && (t = Math.min(.001 * (e - this.lastTime), .1)),
            this.lastTime = e,
            this.nextContainerFill < Date.now() && this.fillContainer(),
            this.eventFrame.fire(t)
        }
        ,
        this.fillContainer = () => {
            this.nextContainerFill = Date.now() + 1e3;
            const e = this.container.clientWidth - 1
              , t = this.container.clientHeight - 1
              , r = Math.floor(e * window.devicePixelRatio)
              , n = Math.floor(t * window.devicePixelRatio);
            this.elementWidth === e && this.elementHeight === t || (this.canvas.style.width = `${e}px`,
            this.canvas.style.height = `${t}px`,
            this.elementWidth = e,
            this.elementHeight = t),
            this.width === r && this.height === n || (this.canvas.width = r,
            this.canvas.height = n,
            this.width = r,
            this.height = n,
            this.eventResize.fire())
        }
        ,
        this.canvas = e,
        this.container = e.parentElement,
        this.context = e.getContext("2d")
    }
    start() {
        window.addEventListener("resize", this.fillContainer),
        this.fillContainer(),
        this.requestFrame()
    }
    stop() {
        window.removeEventListener("resize", this.fillContainer),
        null !== this.frameHandle && cancelAnimationFrame(this.frameHandle)
    }
    clear() {
        const {context: e, width: t, height: r} = this;
        e.clearRect(0, 0, t, r)
    }
    requestFrame() {
        null === this.frameHandle && (this.frameHandle = requestAnimationFrame(this.frame))
    }
}
class $a extends Ta {
    constructor(e, t) {
        super(e),
        this.needsRecalculation = !1,
        this.recalculationCount = 0,
        this.latestPush = 0,
        this.bubbles = [],
        this.bubblesDict = {},
        this.pointerX = -1,
        this.pointerY = -1,
        this.hoveredBubble = null,
        this.draggedBubble = null,
        this.possibleSelectedBubble = null,
        this.timePointerDown = 0,
        this.timeLastWakeUp = Date.now(),
        this.selectedCurrencyId = null,
        this.renderFavoriteBorder = !0,
        this.eventSelect = new xr,
        this.eventResize.register(( () => {
            this.needsRecalculation = !0,
            this.requestFrame()
        }
        )),
        this.eventFrame.register((e => {
            this.needsRecalculation && this.recalculcate(),
            this.update(e),
            this.render();
            const t = Date.now() - this.timeLastWakeUp
              , r = ma(Math.round(t / 150 - 20), 0, 80);
            r > 0 && !Lr.isEmbedded ? window.setTimeout(( () => this.requestFrame()), r) : this.requestFrame()
        }
        )),
        this.properties = t,
        e.addEventListener("pointerdown", (e => this.handlePointerDown(e)), {
            passive: !1
        }),
        e.addEventListener("pointermove", (e => this.handlePointerMove(e))),
        e.addEventListener("touchmove", (e => this.handleTouchMove(e)), {
            passive: !1
        }),
        e.addEventListener("pointerup", (e => this.handlePointerUp(e))),
        e.addEventListener("pointercancel", ( () => this.handlePointerCancel()))
    }
    updatePointerPosition(e) {
        this.pointerX = e.offsetX * window.devicePixelRatio,
        this.pointerY = e.offsetY * window.devicePixelRatio
    }
    wakeUp() {
        this.timeLastWakeUp = Date.now()
    }
    getFocusedBubble() {
        for (let e = this.bubbles.length - 1; e >= 0; e--) {
            const t = this.bubbles[e];
            if (t.visible) {
                const e = t.posX - this.pointerX
                  , r = t.posY - this.pointerY
                  , n = e * e + r * r
                  , o = t.radius + Bt.bubbleHitbox;
                if (o * o >= n)
                    return t
            }
        }
        return null
    }
    handlePointerDown(e) {
        e.isPrimary && (this.timePointerDown = Date.now(),
        this.canvas.setPointerCapture(e.pointerId),
        "mouse" === e.pointerType ? this.draggedBubble = this.hoveredBubble : (this.updatePointerPosition(e),
        this.draggedBubble = this.getFocusedBubble()),
        this.draggedBubble ? this.possibleSelectedBubble = this.draggedBubble : this.launchExplosion())
    }
    handlePointerMove(e) {
        if (!e.isPrimary)
            return;
        this.updatePointerPosition(e);
        const t = this.getFocusedBubble();
        if ("mouse" === e.pointerType) {
            this.hoveredBubble = t;
            const e = this.draggedBubble || this.hoveredBubble;
            this.canvas.style.cursor = e ? "pointer" : "auto"
        }
        this.possibleSelectedBubble !== t && (this.possibleSelectedBubble = null)
    }
    handleTouchMove(e) {
        this.draggedBubble && e.preventDefault()
    }
    handlePointerUp(e) {
        if (e.isPrimary) {
            if (this.possibleSelectedBubble) {
                if (Date.now() - this.timePointerDown < 1e3) {
                    const {currency: e} = this.possibleSelectedBubble;
                    this.possibleSelectedBubble = null,
                    this.eventSelect.fire(e.id)
                }
            }
            this.draggedBubble = null
        }
    }
    handlePointerCancel() {
        this.hoveredBubble = null,
        this.draggedBubble = null
    }
    launchExplosion() {
        for (const e of this.bubbles) {
            const t = e.posX - this.pointerX
              , r = e.posY - this.pointerY
              , n = Math.max(1, Math.sqrt(t * t + r * r))
              , o = 5e3 / n / n;
            e.applyForce(t * o, r * o)
        }
        this.wakeUp()
    }
    update(e) {
        const t = Math.pow(.5, e)
          , r = .001 * Math.min(this.width, this.height);
        for (const n of this.bubbles)
            n.update();
        for (let n = 0; n < this.bubbles.length; n++) {
            const e = this.bubbles[n];
            if (e.visible) {
                for (let t = n + 1; t < this.bubbles.length; t++) {
                    const r = this.bubbles[t];
                    if (!r.visible)
                        continue;
                    const n = e.posX - r.posX
                      , o = e.posY - r.posY
                      , i = Math.max(1, Math.sqrt(n * n + o * o))
                      , a = e.radius + r.radius;
                    if (i < a) {
                        const t = 6 / i
                          , l = n * t
                          , s = o * t
                          , c = 1 - e.radius / a
                          , u = r.radius / a - 1;
                        e.applyForce(l * c, s * c),
                        r.applyForce(l * u, s * u)
                    }
                }
                e.applyForce(Ma() * r, Ma() * r)
            }
        }
        if (this.draggedBubble) {
            const e = this.pointerX - this.draggedBubble.posX
              , t = this.pointerY - this.draggedBubble.posY
              , r = 5 / Math.max(1, Math.sqrt(e * e + t * t));
            this.draggedBubble.applyForce(e * r, t * r),
            this.wakeUp()
        }
        for (const n of this.bubbles)
            n.speedX *= t,
            n.speedY *= t,
            n.posX += n.speedX * e,
            n.posY += n.speedY * e,
            n.posX < n.radius && (n.posX = n.radius,
            n.speedX *= -.7),
            n.posY < n.radius && (n.posY = n.radius,
            n.speedY *= -.7),
            n.posX > this.width - n.radius && (n.posX = this.width - n.radius,
            n.speedX *= -.7),
            n.posY > this.height - n.radius && (n.posY = this.height - n.radius,
            n.speedY *= -.7)
    }
    renderBubbleBorder(e, t, r) {
        this.context.beginPath(),
        this.context.arc(e.posX, e.posY, e.radius, 0, 2 * Math.PI),
        this.context.closePath(),
        this.context.lineWidth = Bt.bubbleBorder * r,
        this.context.strokeStyle = t,
        this.context.stroke()
    }
    render() {
        this.clear();
        let e = null;
        for (const t of this.bubbles)
            if (t.renderFavoriteBorder = this.renderFavoriteBorder,
            t.visible) {
                if (t.currency.id === this.selectedCurrencyId) {
                    e = t;
                    continue
                }
                if (this.draggedBubble === t)
                    continue;
                t.render(this.context)
            }
        if (this.draggedBubble ? this.draggedBubble !== e && (this.draggedBubble.render(this.context),
        this.renderBubbleBorder(this.draggedBubble, "white", 1)) : this.hoveredBubble && this.renderBubbleBorder(this.hoveredBubble, "white", 1),
        e) {
            e.render(this.context);
            const t = .5 * Math.sin(.008 * Date.now()) + .5
              , r = t + 2
              , n = `rgb(${Math.floor(255 * t)}, ${Math.floor(160 * t) + 95}, 255)`;
            this.renderBubbleBorder(e, n, r)
        }
    }
    recalculcate() {
        if (this.needsRecalculation = !1,
        0 === this.bubbles.length)
            return;
        const {size: e, color: t, colors: r, period: n, content: o, baseCurrency: i} = this.properties
          , a = 0 === this.recalculationCount;
        let l = 0
          , s = 0;
        for (const d of this.bubbles) {
            const r = d.latestPush === this.latestPush;
            if (d.size = r ? xa(d.currency, e, n) : 0,
            d.size > 0) {
                l += d.size;
                const e = Math.abs(_a(d.currency, t, n));
                e > s && (s = e)
            }
        }
        s = Math.min(20, s);
        const c = this.width * this.height
          , u = 0 === l ? 0 : c / l * .6;
        for (const d of this.bubbles) {
            const e = Math.sqrt(d.size * u / Math.PI);
            d.setRadius(e, a);
            const l = _a(d.currency, t, n);
            d.setColor(ya(l, r, s)),
            d.setContent(Ca(d.currency, o, n, i)),
            d.posX = ma(d.posX, e, this.width - e),
            d.posY = ma(d.posY, e, this.height - e)
        }
        this.recalculationCount++,
        this.wakeUp()
    }
    setProperties(e) {
        this.properties = e,
        this.needsRecalculation = !0
    }
    pushCurrencies(e) {
        this.latestPush++;
        for (const t of e) {
            const {id: e} = t;
            let r = this.bubblesDict[e];
            r ? r.currency = t : (r = new Ha(t),
            r.posX = Math.random() * this.width,
            r.posY = Math.random() * this.height,
            this.bubbles.push(r),
            this.bubblesDict[e] = r),
            r.latestPush = this.latestPush
        }
        this.recalculcate()
    }
}
var Fa = Q("<div class=bubble-chart><canvas>");
function Da() {
    let e, t, r;
    const n = y(( () => ({
        size: Zr().size,
        color: Zr().color,
        content: Zr().content,
        period: Zr().period,
        baseCurrency: Gr(),
        colors: Zt()
    })))
      , o = () => {
        if (e) {
            const t = mn() ? 0 : 54
              , r = Math.floor(un() - e.offsetTop - t);
            e.style.height = `${r}px`
        }
    }
      , i = () => {
        r && r.wakeUp()
    }
    ;
    return _(( () => {
        if (window.addEventListener("focus", i),
        window.addEventListener("resize", o),
        o(),
        "ios" === Lr.env)
            for (let e = 0; e <= 1200; e += 400)
                window.setTimeout(o, e);
        t && (r = new $a(t,n()),
        r.eventSelect.register((e => ki(e))),
        r.start())
    }
    )),
    C(( () => {
        window.removeEventListener("focus", i),
        window.removeEventListener("resize", o),
        r && r.stop()
    }
    )),
    b(( () => {
        r && r.pushCurrencies(Ir())
    }
    )),
    b(( () => {
        r && r.setProperties(n())
    }
    )),
    b(( () => {
        r && (r.selectedCurrencyId = cr())
    }
    )),
    b(( () => {
        r && (r.renderFavoriteBorder = !function() {
            const e = Rt();
            return "list" === e.type && "favorite" === e.list[0]
        }() && !jr)
    }
    )),
    ( () => {
        var r = Fa()
          , n = r.firstChild;
        "function" == typeof e ? ie(e, r) : e = r;
        return "function" == typeof t ? ie(t, n) : t = n,
        r
    }
    )()
}
function Ea(e) {
    return `${e.rank} ⇅`
}
function Va(e, t) {
    const r = function(e, t) {
        switch (e.size) {
        case "marketcap":
            return t.marketcap;
        case "volume":
            return t.volume;
        case "performance":
            return jn(e.period, t);
        case "rank-diff":
            return `${jn(e.period, t)} ${Ea(t)}`
        }
    }(e, t)
      , n = function(e, t) {
        switch (e.content) {
        case "dominance":
            return t.dominance;
        case "marketcap":
            return t.marketcap;
        case "volume":
            return t.volume;
        case "name":
            return t.currencyName;
        case "price":
            return t.price;
        case "rank":
            return t.rank;
        case "performance":
            return jn(e.period, t);
        case "rank-diff":
            return `${jn(e.period, t)} ${Ea(t)}`
        }
    }(e, t);
    return r === n ? r : `${r} & ${n}`
}
var Na = Q("<fieldset><legend>");
function Oa(e) {
    return ae((t = Na()).firstChild, ( () => e.label)),
    ae(t, O(j, {
        get each() {
            return e.options
        },
        children: t => O(fn, {
            get active() {
                return t.value === e.value
            },
            class: "select-option",
            onClick: () => e.onChange(t.value),
            get children() {
                return [O(U, {
                    keyed: !0,
                    get when() {
                        return t.iconComponent
                    },
                    children: e => O(e, {})
                }), y(( () => t.label))]
            }
        })
    }), null),
    t;
    var t
}
function Ra(e) {
    const t = () => Xt.findIndex((t => t.id === e.value.id))
      , r = () => {
        const r = t()
          , n = e.value
          , o = Xt[Math.max(r - 1, 0)];
        e.onClose(),
        Yt(o.id),
        Gt((e => e.filter((e => e.id !== n.id))))
    }
    ;
    return O(Jn, {
        class: "configuration-window",
        get onClose() {
            return e.onClose
        },
        get header() {
            return [O(po, {
                get value() {
                    return e.value.name
                },
                action: "clear",
                class: "grow",
                iconComponent: so,
                get placeholder() {
                    return Va(e.value, qr())
                },
                onInput: e => Gt(t(), "name", e)
            }), O(U, {
                get when() {
                    return Xt.length >= 2
                },
                get children() {
                    return O(oo, {
                        onDelete: r
                    })
                }
            })]
        },
        get children() {
            return [O(Oa, {
                get label() {
                    return qr().period
                },
                get value() {
                    return e.value.period
                },
                onChange: e => Gt(t(), "period", e),
                get options() {
                    return Bt.periods.map((e => ({
                        value: e,
                        label: jn(e, qr())
                    })))
                }
            }), O(Oa, {
                get label() {
                    return qr().bubble_size
                },
                get value() {
                    return e.value.size
                },
                onChange: e => Gt(t(), "size", e),
                get options() {
                    return [{
                        value: "performance",
                        label: qr().performance
                    }, {
                        value: "rank-diff",
                        label: Ea(qr())
                    }, {
                        value: "marketcap",
                        label: qr().marketcap
                    }, {
                        value: "volume",
                        label: qr().volume
                    }]
                }
            }), O(Oa, {
                get label() {
                    return qr().bubble_content
                },
                get value() {
                    return e.value.content
                },
                onChange: e => Gt(t(), "content", e),
                get options() {
                    return [{
                        value: "performance",
                        label: qr().performance
                    }, {
                        value: "rank-diff",
                        label: Ea(qr())
                    }, {
                        value: "marketcap",
                        label: qr().marketcap
                    }, {
                        value: "volume",
                        label: qr().volume
                    }, {
                        value: "price",
                        label: qr().price
                    }, {
                        value: "rank",
                        label: qr().rank
                    }, {
                        value: "name",
                        label: qr().currencyName
                    }, {
                        value: "dominance",
                        label: qr().dominance
                    }]
                }
            }), O(Oa, {
                get label() {
                    return qr().bubble_color
                },
                get value() {
                    return e.value.color
                },
                onChange: e => Gt(t(), "color", e),
                get options() {
                    return [{
                        value: "performance",
                        label: qr().performance
                    }, {
                        value: "rank-diff",
                        label: Ea(qr())
                    }, {
                        value: "neutral",
                        label: qr().neutral
                    }]
                }
            })]
        }
    })
}
function ja(e) {
    const {color: t, period: r} = e;
    return Ir().reduce(( (e, n) => e + _a(n, t, r)), 0)
}
var Ua = Q("<button>");
function Ia(e) {
    let t;
    const r = () => Zr().id === e.configuration.id;
    return b(( () => {
        r() && t && e.onScrollTo(t)
    }
    )),
    ( () => {
        var n = Ua();
        n.addEventListener("drop", (t => {
            if (t.preventDefault(),
            t.currentTarget.classList.remove("drop"),
            t.dataTransfer) {
                !function(e, t) {
                    const r = Xt.find((t => t.id === e))
                      , n = Xt.find((e => e.id === t));
                    r && n && Gt(Xt.map((o => o.id === e ? n : o.id === t ? r : o)))
                }(t.dataTransfer.getData("text/plain"), e.configuration.id)
            }
        }
        )),
        n.addEventListener("dragleave", (e => e.currentTarget.classList.remove("drop"))),
        n.addEventListener("dragenter", (e => e.currentTarget.classList.add("drop"))),
        n.addEventListener("dragover", (e => e.preventDefault())),
        n.addEventListener("dragend", (e => e.currentTarget.classList.remove("drag"))),
        n.addEventListener("dragstart", (t => {
            t.dataTransfer && (t.dataTransfer.setData("text/plain", e.configuration.id),
            t.currentTarget.classList.add("drag"))
        }
        )),
        n.$$click = () => e.onClick(e.configuration);
        return "function" == typeof t ? ie(t, n) : t = n,
        te(n, "draggable", !0),
        ae(n, ( () => {
            return t = e.configuration,
            r = qr(),
            t.name && t.name.trim().length > 0 ? t.name : Va(t, r);
            var t, r
        }
        )),
        m((t => {
            var o = Yr("tab", r() && "selected")
              , i = Vn(ja(e.configuration), Zt());
            return o !== t.e && re(n, t.e = o),
            i !== t.t && (null != (t.t = i) ? n.style.setProperty("border-color", i) : n.style.removeProperty("border-color")),
            t
        }
        ), {
            e: void 0,
            t: void 0
        }),
        n
    }
    )()
}
ee(["click"]);
var Za = Q('<div class="bubble-chart-header flex-row"><div class="configuration-tabs scroll-container">');
function Wa() {
    let e;
    const [t,r] = v(!1)
      , n = e => {
        qt() === e.id ? r(!t()) : Yt(e.id)
    }
      , o = t => {
        e && function(e, t, r) {
            const n = {
                left: t,
                top: r,
                behavior: "smooth"
            };
            try {
                e.scrollTo(n)
            } catch {
                try {
                    e.scrollTo(t, r)
                } catch {
                    try {
                        e.scroll(n)
                    } catch {
                        try {
                            e.scroll(t, r)
                        } catch {}
                    }
                }
            }
        }(e, t.offsetLeft - 64, 0)
    }
      , i = () => {
        const e = De("day", "performance");
        Gt((t => [...t, e])),
        Yt(e.id),
        r(!0)
    }
    ;
    return a = Za(),
    l = a.firstChild,
    "function" == typeof e ? ie(e, l) : e = l,
    ae(l, O(j, {
        each: Xt,
        children: e => O(Ia, {
            configuration: e,
            onClick: n,
            onScrollTo: o
        })
    })),
    ae(a, O(Jr, {
        get active() {
            return t()
        },
        onClick: () => r(!t()),
        get title() {
            return qr().configuration_edit
        },
        get children() {
            return O(so, {})
        }
    }), null),
    ae(a, O(Jr, {
        onClick: i,
        get title() {
            return qr().configuration_add
        },
        get children() {
            return O(ao, {})
        }
    }), null),
    ae(a, O(Zo, {
        get value() {
            return y(( () => !!t()))() ? Zr() : null
        },
        component: Ra,
        onClose: () => r(!1)
    }), null),
    a;
    var a, l
}
function Xa() {
    return [O(Wa, {}), O(Da, {})]
}
var Ga = Q("<main>")
  , qa = Q("<div class=nav-filler>");
function Ya() {
    return O(I, {
        get children() {
            return [O(Z, {
                get when() {
                    return mn()
                },
                get children() {
                    return [(e = Ga(),
                    ae(e, O(Xa, {}), null),
                    ae(e, O(va, {}), null),
                    e), O(Ci, {})];
                    var e
                }
            }), O(Z, {
                get when() {
                    return "bubbles" === lr()
                },
                get children() {
                    var e = Ga();
                    return ae(e, O(Xa, {})),
                    e
                }
            }), O(Z, {
                get when() {
                    return "list" === lr()
                },
                get children() {
                    return [(e = Ga(),
                    ae(e, O(va, {})),
                    e), qa()];
                    var e
                }
            }), O(Z, {
                get when() {
                    return "settings" === lr()
                },
                get children() {
                    return [(e = Ga(),
                    ae(e, O(Ro, {})),
                    e), O(Ci, {}), qa()];
                    var e
                }
            })]
        }
    })
}
class Ka extends Ta {
    constructor(e) {
        super(e),
        this.quotes = null,
        this.baseCurrency = null,
        this.period = null,
        this.colors = "red-green",
        this.pointerX = null,
        this.eventFrame.register(( () => this.render())),
        this.eventResize.register(( () => this.render())),
        this.canvas.addEventListener("pointermove", (e => this.handlePointerUpdate(e))),
        this.canvas.addEventListener("pointerdown", (e => this.handlePointerUpdate(e))),
        this.canvas.addEventListener("pointerout", (e => this.handlePointerOut(e)))
    }
    handlePointerUpdate(e) {
        if (e.isPrimary) {
            const t = Math.round(e.offsetX * window.devicePixelRatio);
            t !== this.pointerX && (this.pointerX = t,
            this.render())
        }
    }
    handlePointerOut(e) {
        e.isPrimary && null !== this.pointerX && (this.pointerX = null,
        this.render())
    }
    drawPointOnChart(e, t, r, n) {
        const {context: o, width: i, height: a} = this
          , {x: l, y: s} = t
          , c = window.devicePixelRatio
          , u = .5 * i
          , d = .5 * a
          , h = xi(e, r);
        o.beginPath(),
        o.arc(l, s, 5 * c, 0, 2 * Math.PI),
        o.fillStyle = n,
        o.fill(),
        o.textAlign = l < u ? "left" : "right",
        o.fillText(h, l + (l < u ? 8 : -8) * c, s + (s < d ? -10 : 10) * c)
    }
    render() {
        const {quotes: e, baseCurrency: t, period: r, context: n, width: o, height: i, pointerX: a} = this
          , l = window.devicePixelRatio;
        this.clear();
        const s = null == e ? void 0 : e[0];
        if (!t || !r || !s)
            return;
        const c = o / (e.length - 1);
        let u = s.p
          , d = s.p;
        for (const C of e)
            C.p > d && (d = C.p),
            C.p < u && (u = C.p);
        const h = d - u;
        let p = 0;
        const g = {
            x: 0,
            y: 0
        }
          , f = {
            x: 0,
            y: 0
        };
        let v = null
          , m = null;
        n.beginPath();
        for (const C of e) {
            const e = C.p
              , t = (.8 - .7 * ((e - u) / h)) * i;
            e === u && (g.x = p,
            g.y = t),
            e === d && (f.x = p,
            f.y = t),
            a && !v && a < p + c / 2 && (v = {
                x: p,
                y: t
            },
            m = C),
            0 === p ? n.moveTo(p, t + 1) : n.lineTo(p, t + 1),
            p += c
        }
        n.lineWidth = 2 * l,
        n.strokeStyle = "white",
        n.lineJoin = "round",
        n.stroke(),
        n.lineTo(p, i),
        n.lineTo(0, i),
        n.closePath();
        const b = n.createLinearGradient(0, 0, 0, i);
        b.addColorStop(0, "rgba(0, 100, 255, 1)"),
        b.addColorStop(1, "rgba(0, 100, 255, 0)"),
        n.fillStyle = b,
        n.fill();
        const y = Math.round(20 * l);
        n.font = `${y}px Arial`,
        n.textBaseline = "middle";
        const w = Vn(1, this.colors)
          , _ = Vn(-1, this.colors);
        if (this.drawPointOnChart(u, g, t, _),
        this.drawPointOnChart(d, f, t, w),
        v && m) {
            const {p: e, t: a} = m
              , s = xi(e, t);
            let c = 0;
            try {
                c = n.measureText(s).width
            } catch {}
            c = c || 150;
            const u = 6 * l
              , d = 4 * l
              , h = c + 2 * u
              , p = y + 2 * d
              , g = ma(v.x - h / 2, 0, o - h)
              , f = 0;
            n.strokeStyle = "#666",
            n.beginPath(),
            n.moveTo(v.x, 0),
            n.lineTo(v.x, i),
            n.moveTo(0, v.y),
            n.lineTo(o, v.y),
            n.closePath(),
            n.stroke(),
            n.fillStyle = "white",
            n.beginPath(),
            n.arc(v.x, v.y, 5 * l, 0, 2 * Math.PI),
            n.closePath(),
            n.fill(),
            n.fillStyle = "#666",
            n.fillRect(g, f, h, p),
            n.textAlign = "left",
            n.textBaseline = "top",
            n.fillStyle = "white",
            n.fillText(s, g + u, f + d);
            const b = new Date(1e3 * a);
            b.setSeconds(0),
            "week" !== r && "month" !== r || b.setMinutes(0);
            let w = b.toLocaleString();
            if ("year" === r)
                w = b.toLocaleDateString();
            else
                try {
                    w = b.toLocaleString(void 0, {
                        dateStyle: "medium",
                        timeStyle: "short"
                    })
                } catch {}
            n.textAlign = "right",
            n.textBaseline = "bottom",
            n.fillStyle = "#ccc",
            n.fillText(w, o - 6 * l, i - 6 * l)
        }
    }
}
var Ja = Q("<div><canvas></canvas><img><span class=color-secondary>");
function Qa(e) {
    let t, r, n = null;
    const [o,i] = v(null)
      , a = () => {
        n && (n.abort(),
        n = null)
    }
      , l = () => {
        a(),
        n = new AbortController;
        wr(`data/charts/${e.period}/${e.currency.id}/${Gr().id.toUpperCase()}.json`, n).then(i).catch(( () => {}
        ))
    }
    ;
    return _(( () => {
        t && (r = new Ka(t),
        r.start()),
        Lr.eventUpdateData.register(l)
    }
    )),
    C(( () => {
        r && r.stop(),
        Lr.eventUpdateData.unregister(l),
        a()
    }
    )),
    b(( () => {
        i(null),
        l()
    }
    )),
    b(( () => {
        r && (r.quotes = o(),
        r.quotes && "hour" !== e.period && (r.quotes = [...r.quotes, {
            p: e.currency.price,
            t: Date.now() / 1e3
        }]),
        r.colors = Zt(),
        r.baseCurrency = Gr(),
        r.period = e.period,
        r.requestFrame())
    }
    )),
    s = Ja(),
    c = s.firstChild,
    u = c.nextSibling,
    d = u.nextSibling,
    "function" == typeof t ? ie(t, c) : t = c,
    ae(d, ( () => jn(e.period, qr()))),
    m((t => {
        var r = Yr("price-chart", o() && "loaded")
          , n = e.currency.image
          , i = e.currency.name;
        return r !== t.e && re(s, t.e = r),
        n !== t.t && te(u, "src", t.t = n),
        i !== t.a && te(u, "alt", t.a = i),
        t
    }
    ), {
        e: void 0,
        t: void 0,
        a: void 0
    }),
    s;
    var s, c, u, d
}
var el = Q('<span class="bubble-window-price flex-row gap-m"><span class=color-secondary>');
const tl = 1;
function rl(e) {
    const [t,r] = v(tl.toString())
      , n = () => {
        let r = function(e, t) {
            try {
                const t = Number.parseFloat(e);
                if (Number.isFinite(t) && !Number.isNaN(t))
                    return t
            } catch {}
            return t
        }(t(), tl);
        return r < 0 && (r = tl),
        e.currency.price * r
    }
    ;
    return o = el(),
    i = o.firstChild,
    ae(o, O(po, {
        get value() {
            return tl.toString()
        },
        iconComponent: so,
        placeholder: "Amount",
        type: "number",
        onInput: r
    }), i),
    ae(i, ( () => `${e.currency.symbol} =`)),
    ae(o, O(ji, {
        format: "currency-price",
        get children() {
            return n()
        }
    }), null),
    o;
    var o, i
}
var nl = Q('<div class=bubble-window-details><div class="flex-column gap-s grow"><span class=color-secondary></span></div><div class="flex-column gap-s grow"><span class=color-secondary></span></div><div class="flex-column gap-s grow"><span class=color-secondary>')
  , ol = Q("<div class=bubble-window-performance>")
  , il = Q("<div><span class=color-secondary></span><span>");
const al = ["hour", "day", "week", "month", "year"];
function chartCompent(e) {
    const t = () => {
        const {period: e} = Zr();
        return "min1" === e || "min5" === e || "min15" === e ? "hour" : e
    }
      , [r,n] = v(t());
    return b(( () => n(t()))),
    O(Jn, {
        class: "bubble-window",
        get onClose() {
            return e.onClose
        },
        get header() {
            return [O(Ai, {
                get currency() {
                    return e.value
                }
            }), O(qo, {
                get currency() {
                    return e.value
                },
                class: "grow"
            })]
        },
        get children() {
            return O(U, {
                keyed: !0,
                get when() {
                    return e.value.id
                },
                get children() {
                    return [O(Ji, {
                        get currency() {
                            return e.value
                        }
                    }), O(rl, {
                        get currency() {
                            return e.value
                        }
                    }), (o = nl(),
                    i = o.firstChild,
                    a = i.firstChild,
                    l = i.nextSibling,
                    s = l.firstChild,
                    c = l.nextSibling,
                    u = c.firstChild,
                    ae(a, ( () => qr().rank)),
                    ae(i, O(na, {
                        animate: !0,
                        get currency() {
                            return e.value
                        },
                        get period() {
                            return r()
                        }
                    }), null),
                    ae(s, ( () => qr().marketcap)),
                    ae(l, O(ji, {
                        format: "currency-amount",
                        get children() {
                            return e.value.marketcap
                        }
                    }), null),
                    ae(u, ( () => qr().volume)),
                    ae(c, O(ji, {
                        format: "currency-amount",
                        get children() {
                            return e.value.volume
                        }
                    }), null),
                    o), O(Qa, {
                        get period() {
                            return r()
                        },
                        get currency() {
                            return e.value
                        }
                    }), (t = ol(),
                    ae(t, O(j, {
                        each: al,
                        children: t => {
                            const o = () => e.value.performance[t];
                            return i = il(),
                            a = i.firstChild,
                            l = a.nextSibling,
                            i.$$click = () => n(t),
                            ae(a, ( () => jn(t, qr()))),
                            ae(l, ( () => On(o(), {
                                hideSign: !0
                            }))),
                            m((e => {
                                var n = Yr("flex-column grow", t === r() && "selected")
                                  , a = ( () => {
                                    const e = Vn(o(), Zt())
                                      , t = Nn(o(), Zt());
                                    return e && t ? `--color-light: ${e}; --color-dark: ${t}` : ""
                                }
                                )();
                                return n !== e.e && re(i, e.e = n),
                                e.t = ne(i, a, e.t),
                                e
                            }
                            ), {
                                e: void 0,
                                t: void 0
                            }),
                            i;
                            var i, a, l
                        }
                    })),
                    t)];
                    var t, o, i, a, l, s, c, u
                }
            })
        }
    })
}
ee(["click"]);
var sl = Q('<svg viewBox="0 0 24 24"><circle cx=7.2 cy=14.4 r=3.2></circle><circle cx=14.8 cy=18 r=2></circle><circle cx=15.2 cy=8.8 r=4.8>');
const cl = e => {
    return oe(t = sl(), e, !0, !0),
    t;
    var t
}
;
var ul = Q("<div class=navigation><div class=navigation-filter></div><div class=navigation-pages>");
function dl() {
    function e(e) {
        lr() !== e && (sr(e),
        window.scroll(0, 0))
    }
    return t = ul(),
    r = t.firstChild,
    n = r.nextSibling,
    ae(r, O(Zn, {})),
    ae(n, O(fn, {
        get active() {
            return "bubbles" === lr()
        },
        onClick: () => e("bubbles"),
        get children() {
            return O(cl, {})
        }
    }), null),
    ae(n, O(fn, {
        get active() {
            return "list" === lr()
        },
        onClick: () => e("list"),
        get children() {
            return O(ni, {})
        }
    }), null),
    ae(n, O(fn, {
        get active() {
            return "settings" === lr()
        },
        onClick: () => e("settings"),
        get children() {
            return O(rn, {})
        }
    }), null),
    t;
    var t, r, n
}
var hl = Q('<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">');
const pl = e => {
    return oe(t = hl(), e, !0, !0),
    t;
    var t
}
;
var gl = Q("<div class=status><img class=logo width=64 height=64><span>")
  , fl = Q("<div class=status><span>No internet connection")
  , vl = Q('<div class=status><div class="flex-column color-secondary"><span></span></div><span>');
function ml() {
    hr("loading"),
    kr()
}
function bl() {
    return O(I, {
        get children() {
            return [O(Z, {
                get when() {
                    return "loading" === dr()
                },
                get children() {
                    var e = gl()
                      , t = e.firstChild;
                    return ae(t.nextSibling, ( () => qr().loading)),
                    m((e => {
                        var r = Bt.logo
                          , n = Bt.app
                          , o = `Logo of ${Bt.app}`;
                        return r !== e.e && te(t, "src", e.e = r),
                        n !== e.t && te(t, "alt", e.t = n),
                        o !== e.a && te(t, "title", e.a = o),
                        e
                    }
                    ), {
                        e: void 0,
                        t: void 0,
                        a: void 0
                    }),
                    e
                }
            }), O(Z, {
                get when() {
                    return "loading-failed" === dr()
                },
                get children() {
                    var e = fl()
                      , t = e.firstChild;
                    return e.$$click = ml,
                    ae(e, O(pl, {}), t),
                    e
                }
            }), O(Z, {
                get when() {
                    return "loaded" === dr()
                },
                get children() {
                    return O(U, {
                        get when() {
                            return 0 === Ir().length
                        },
                        get children() {
                            return O(U, {
                                keyed: !0,
                                get when() {
                                    return function() {
                                        const e = Rt();
                                        if ("list" === e.type)
                                            return En().find((t => {
                                                return r = e.list,
                                                n = t.filter.list,
                                                r.length === n.length && r.every(( (e, t) => e === n[t]));
                                                var r, n
                                            }
                                            ))
                                    }()
                                },
                                children: e => {
                                    return t = vl(),
                                    r = t.firstChild,
                                    n = r.firstChild,
                                    o = r.nextSibling,
                                    ae(r, O(e.iconComponent, {}), n),
                                    ae(n, ( () => e.name)),
                                    ae(o, ( () => qr().empty_list)),
                                    t;
                                    var t, r, n, o
                                }
                            })
                        }
                    })
                }
            })]
        }
    })
}
function yl() {
    return b(( () => Tt.save(Tt.generateSave()))),
    b(( () => kr())),
    b(( () => {
        const e = ja(Zr())
          , t = Vn(e, Zt())
          , r = Nn(e, Zt());
        document.documentElement.style.setProperty("--color-theme-light", t || null),
        document.documentElement.style.setProperty("--color-theme-dark", r || null)
    }
    )),
    [O(Vr, {}), O(li, {}), O(Ya, {}), O(U, {
        get when() {
            return !mn()
        },
        get children() {
            return O(dl, {})
        }
    }), O(U, {
        get when() {
            return "settings" !== lr() || mn()
        },
        get children() {
            return O(bl, {})
        }
    }), O(Zo, {
        get value() {
            return Wr()
        },
       component: chartCompent,
        onClose: () => ur(null)
    })]
}
ee(["click"]);
const wl = window.matchMedia("(display-mode: standalone)").matches
  , _l = document.getElementById("app")
  , Cl = wl ? "pwa" : _l.className;
Lr.create(Cl),
window.addEventListener("load", ( () => {
    !function(e, t, r, n={}) {
        let o;
        f((n => {
            o = n,
            t === document ? e() : ae(t, e(), t.firstChild ? null : void 0, r)
        }
        ), n.owner)
    }(( () => O(yl, {})), _l),
    "ios" !== Lr.env && "serviceWorker"in navigator && navigator.serviceWorker.register("./sw.js")
}
));
