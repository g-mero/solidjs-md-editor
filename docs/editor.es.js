var Gc = Object.defineProperty;
var qc = (l, a, f) => a in l ? Gc(l, a, { enumerable: !0, configurable: !0, writable: !0, value: f }) : l[a] = f;
var si = (l, a, f) => (qc(l, typeof a != "symbol" ? a + "" : a, f), f);
const Kc = (l, a) => l === a, $c = Symbol("solid-track"), di = {
  equals: Kc
};
let $a = Qa;
const Gt = 1, pi = 2, ja = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Pe = null;
let Ro = null, ke = null, ze = null, Dt = null, Si = 0;
function fi(l, a) {
  const f = ke, d = Pe, p = l.length === 0, v = p ? ja : {
    owned: null,
    cleanups: null,
    context: null,
    owner: a === void 0 ? d : a
  }, m = p ? l : () => l(() => Mt(() => Ci(v)));
  Pe = v, ke = null;
  try {
    return br(m, !0);
  } finally {
    ke = f, Pe = d;
  }
}
function An(l, a) {
  a = a ? Object.assign({}, di, a) : di;
  const f = {
    value: l,
    observers: null,
    observerSlots: null,
    comparator: a.equals || void 0
  }, d = (p) => (typeof p == "function" && (p = p(f.value)), Ya(f, p));
  return [Xa.bind(f), d];
}
function ot(l, a, f) {
  const d = rl(l, a, !1, Gt);
  mr(d);
}
function gi(l, a, f) {
  $a = Zc;
  const d = rl(l, a, !1, Gt);
  (!f || !f.render) && (d.user = !0), Dt ? Dt.push(d) : mr(d);
}
function $o(l, a, f) {
  f = f ? Object.assign({}, di, f) : di;
  const d = rl(l, a, !0, 0);
  return d.observers = null, d.observerSlots = null, d.comparator = f.equals || void 0, mr(d), Xa.bind(d);
}
function Mt(l) {
  if (ke === null)
    return l();
  const a = ke;
  ke = null;
  try {
    return l();
  } finally {
    ke = a;
  }
}
function yr(l) {
  gi(() => Mt(l));
}
function jc(l) {
  return Pe === null || (Pe.cleanups === null ? Pe.cleanups = [l] : Pe.cleanups.push(l)), l;
}
function Xc() {
  return Pe;
}
function Xa() {
  if (this.sources && this.state)
    if (this.state === Gt)
      mr(this);
    else {
      const l = ze;
      ze = null, br(() => yi(this), !1), ze = l;
    }
  if (ke) {
    const l = this.observers ? this.observers.length : 0;
    ke.sources ? (ke.sources.push(this), ke.sourceSlots.push(l)) : (ke.sources = [this], ke.sourceSlots = [l]), this.observers ? (this.observers.push(ke), this.observerSlots.push(ke.sources.length - 1)) : (this.observers = [ke], this.observerSlots = [ke.sources.length - 1]);
  }
  return this.value;
}
function Ya(l, a, f) {
  let d = l.value;
  return (!l.comparator || !l.comparator(d, a)) && (l.value = a, l.observers && l.observers.length && br(() => {
    for (let p = 0; p < l.observers.length; p += 1) {
      const v = l.observers[p], m = Ro && Ro.running;
      m && Ro.disposed.has(v), (m ? !v.tState : !v.state) && (v.pure ? ze.push(v) : Dt.push(v), v.observers && Za(v)), m || (v.state = Gt);
    }
    if (ze.length > 1e6)
      throw ze = [], new Error();
  }, !1)), a;
}
function mr(l) {
  if (!l.fn)
    return;
  Ci(l);
  const a = Pe, f = ke, d = Si;
  ke = Pe = l, Yc(l, l.value, d), ke = f, Pe = a;
}
function Yc(l, a, f) {
  let d;
  try {
    d = l.fn(a);
  } catch (p) {
    return l.pure && (l.state = Gt, l.owned && l.owned.forEach(Ci), l.owned = null), l.updatedAt = f + 1, Ja(p);
  }
  (!l.updatedAt || l.updatedAt <= f) && (l.updatedAt != null && "observers" in l ? Ya(l, d) : l.value = d, l.updatedAt = f);
}
function rl(l, a, f, d = Gt, p) {
  const v = {
    fn: l,
    state: d,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: a,
    owner: Pe,
    context: null,
    pure: f
  };
  return Pe === null || Pe !== ja && (Pe.owned ? Pe.owned.push(v) : Pe.owned = [v]), v;
}
function vi(l) {
  if (l.state === 0)
    return;
  if (l.state === pi)
    return yi(l);
  if (l.suspense && Mt(l.suspense.inFallback))
    return l.suspense.effects.push(l);
  const a = [l];
  for (; (l = l.owner) && (!l.updatedAt || l.updatedAt < Si); )
    l.state && a.push(l);
  for (let f = a.length - 1; f >= 0; f--)
    if (l = a[f], l.state === Gt)
      mr(l);
    else if (l.state === pi) {
      const d = ze;
      ze = null, br(() => yi(l, a[0]), !1), ze = d;
    }
}
function br(l, a) {
  if (ze)
    return l();
  let f = !1;
  a || (ze = []), Dt ? f = !0 : Dt = [], Si++;
  try {
    const d = l();
    return Qc(f), d;
  } catch (d) {
    f || (Dt = null), ze = null, Ja(d);
  }
}
function Qc(l) {
  if (ze && (Qa(ze), ze = null), l)
    return;
  const a = Dt;
  Dt = null, a.length && br(() => $a(a), !1);
}
function Qa(l) {
  for (let a = 0; a < l.length; a++)
    vi(l[a]);
}
function Zc(l) {
  let a, f = 0;
  for (a = 0; a < l.length; a++) {
    const d = l[a];
    d.user ? l[f++] = d : vi(d);
  }
  for (a = 0; a < f; a++)
    vi(l[a]);
}
function yi(l, a) {
  l.state = 0;
  for (let f = 0; f < l.sources.length; f += 1) {
    const d = l.sources[f];
    if (d.sources) {
      const p = d.state;
      p === Gt ? d !== a && (!d.updatedAt || d.updatedAt < Si) && vi(d) : p === pi && yi(d, a);
    }
  }
}
function Za(l) {
  for (let a = 0; a < l.observers.length; a += 1) {
    const f = l.observers[a];
    f.state || (f.state = pi, f.pure ? ze.push(f) : Dt.push(f), f.observers && Za(f));
  }
}
function Ci(l) {
  let a;
  if (l.sources)
    for (; l.sources.length; ) {
      const f = l.sources.pop(), d = l.sourceSlots.pop(), p = f.observers;
      if (p && p.length) {
        const v = p.pop(), m = f.observerSlots.pop();
        d < p.length && (v.sourceSlots[m] = d, p[d] = v, f.observerSlots[d] = m);
      }
    }
  if (l.owned) {
    for (a = l.owned.length - 1; a >= 0; a--)
      Ci(l.owned[a]);
    l.owned = null;
  }
  if (l.cleanups) {
    for (a = l.cleanups.length - 1; a >= 0; a--)
      l.cleanups[a]();
    l.cleanups = null;
  }
  l.state = 0, l.context = null;
}
function Ja(l) {
  throw l;
}
const Jc = Symbol("fallback");
function ya(l) {
  for (let a = 0; a < l.length; a++)
    l[a]();
}
function Vc(l, a, f = {}) {
  let d = [], p = [], v = [], m = 0, x = a.length > 1 ? [] : null;
  return jc(() => ya(v)), () => {
    let S = l() || [], L, T;
    return S[$c], Mt(() => {
      let H = S.length, X, $, V, de, ue, J, te, fe, ne;
      if (H === 0)
        m !== 0 && (ya(v), v = [], d = [], p = [], m = 0, x && (x = [])), f.fallback && (d = [Jc], p[0] = fi((K) => (v[0] = K, f.fallback())), m = 1);
      else if (m === 0) {
        for (p = new Array(H), T = 0; T < H; T++)
          d[T] = S[T], p[T] = fi(E);
        m = H;
      } else {
        for (V = new Array(H), de = new Array(H), x && (ue = new Array(H)), J = 0, te = Math.min(m, H); J < te && d[J] === S[J]; J++)
          ;
        for (te = m - 1, fe = H - 1; te >= J && fe >= J && d[te] === S[fe]; te--, fe--)
          V[fe] = p[te], de[fe] = v[te], x && (ue[fe] = x[te]);
        for (X = /* @__PURE__ */ new Map(), $ = new Array(fe + 1), T = fe; T >= J; T--)
          ne = S[T], L = X.get(ne), $[T] = L === void 0 ? -1 : L, X.set(ne, T);
        for (L = J; L <= te; L++)
          ne = d[L], T = X.get(ne), T !== void 0 && T !== -1 ? (V[T] = p[L], de[T] = v[L], x && (ue[T] = x[L]), T = $[T], X.set(ne, T)) : v[L]();
        for (T = J; T < H; T++)
          T in V ? (p[T] = V[T], v[T] = de[T], x && (x[T] = ue[T], x[T](T))) : p[T] = fi(E);
        p = p.slice(0, m = H), d = S.slice(0);
      }
      return p;
    });
    function E(H) {
      if (v[T] = H, x) {
        const [X, $] = An(T);
        return x[T] = $, a(S[T], X);
      }
      return a(S[T]);
    }
  };
}
let eh = !1;
function _e(l, a) {
  return Mt(() => l(a || {}));
}
const th = (l) => `Stale read from <${l}>.`;
function Va(l) {
  const a = "fallback" in l && {
    fallback: () => l.fallback
  };
  return $o(Vc(() => l.each, l.children, a || void 0));
}
function ai(l) {
  const a = l.keyed, f = $o(() => l.when, void 0, {
    equals: (d, p) => a ? d === p : !d == !p
  });
  return $o(() => {
    const d = f();
    if (d) {
      const p = l.children;
      return typeof p == "function" && p.length > 0 ? Mt(() => p(a ? d : () => {
        if (!Mt(f))
          throw th("Show");
        return l.when;
      })) : p;
    }
    return l.fallback;
  }, void 0, void 0);
}
const nh = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], rh = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...nh]), ih = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), oh = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), lh = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function sh(l, a) {
  const f = lh[l];
  return typeof f == "object" ? f[a] ? f.$ : void 0 : f;
}
const ah = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), uh = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function fh(l, a, f) {
  let d = f.length, p = a.length, v = d, m = 0, x = 0, S = a[p - 1].nextSibling, L = null;
  for (; m < p || x < v; ) {
    if (a[m] === f[x]) {
      m++, x++;
      continue;
    }
    for (; a[p - 1] === f[v - 1]; )
      p--, v--;
    if (p === m) {
      const T = v < d ? x ? f[x - 1].nextSibling : f[v - x] : S;
      for (; x < v; )
        l.insertBefore(f[x++], T);
    } else if (v === x)
      for (; m < p; )
        (!L || !L.has(a[m])) && a[m].remove(), m++;
    else if (a[m] === f[v - 1] && f[x] === a[p - 1]) {
      const T = a[--p].nextSibling;
      l.insertBefore(f[x++], a[m++].nextSibling), l.insertBefore(f[--v], T), a[p] = f[v];
    } else {
      if (!L) {
        L = /* @__PURE__ */ new Map();
        let E = x;
        for (; E < v; )
          L.set(f[E], E++);
      }
      const T = L.get(a[m]);
      if (T != null)
        if (x < T && T < v) {
          let E = m, H = 1, X;
          for (; ++E < p && E < v && !((X = L.get(a[E])) == null || X !== T + H); )
            H++;
          if (H > T - x) {
            const $ = a[m];
            for (; x < T; )
              l.insertBefore(f[x++], $);
          } else
            l.replaceChild(f[x++], a[m++]);
        } else
          m++;
      else
        a[m++].remove();
    }
  }
}
const ma = "_$DX_DELEGATE";
function ch(l, a, f, d = {}) {
  let p;
  return fi((v) => {
    p = v, a === document ? l() : zt(a, l(), a.firstChild ? null : void 0, f);
  }, d.owner), () => {
    p(), a.textContent = "";
  };
}
function Mn(l, a, f) {
  let d;
  const p = () => {
    const m = document.createElement("template");
    return m.innerHTML = l, f ? m.content.firstChild.firstChild : m.content.firstChild;
  }, v = a ? () => (d || (d = p())).cloneNode(!0) : () => Mt(() => document.importNode(d || (d = p()), !0));
  return v.cloneNode = v, v;
}
function eu(l, a = window.document) {
  const f = a[ma] || (a[ma] = /* @__PURE__ */ new Set());
  for (let d = 0, p = l.length; d < p; d++) {
    const v = l[d];
    f.has(v) || (f.add(v), a.addEventListener(v, bh));
  }
}
function ft(l, a, f) {
  f == null ? l.removeAttribute(a) : l.setAttribute(a, f);
}
function hh(l, a, f, d) {
  d == null ? l.removeAttributeNS(a, f) : l.setAttributeNS(a, f, d);
}
function Ve(l, a) {
  a == null ? l.removeAttribute("class") : l.className = a;
}
function dh(l, a, f, d) {
  if (d)
    Array.isArray(f) ? (l[`$$${a}`] = f[0], l[`$$${a}Data`] = f[1]) : l[`$$${a}`] = f;
  else if (Array.isArray(f)) {
    const p = f[0];
    l.addEventListener(a, f[0] = (v) => p.call(l, f[1], v));
  } else
    l.addEventListener(a, f);
}
function ph(l, a, f = {}) {
  const d = Object.keys(a || {}), p = Object.keys(f);
  let v, m;
  for (v = 0, m = p.length; v < m; v++) {
    const x = p[v];
    !x || x === "undefined" || a[x] || (ba(l, x, !1), delete f[x]);
  }
  for (v = 0, m = d.length; v < m; v++) {
    const x = d[v], S = !!a[x];
    !x || x === "undefined" || f[x] === S || !S || (ba(l, x, !0), f[x] = S);
  }
  return f;
}
function gh(l, a, f) {
  if (!a)
    return f ? ft(l, "style") : a;
  const d = l.style;
  if (typeof a == "string")
    return d.cssText = a;
  typeof f == "string" && (d.cssText = f = void 0), f || (f = {}), a || (a = {});
  let p, v;
  for (v in f)
    a[v] == null && d.removeProperty(v), delete f[v];
  for (v in a)
    p = a[v], p !== f[v] && (d.setProperty(v, p), f[v] = p);
  return f;
}
function vh(l, a = {}, f, d) {
  const p = {};
  return d || ot(() => p.children = Dn(l, a.children, p.children)), ot(() => a.ref && a.ref(l)), ot(() => yh(l, a, f, !0, p, !0)), p;
}
function xr(l, a, f) {
  return Mt(() => l(a, f));
}
function zt(l, a, f, d) {
  if (f !== void 0 && !d && (d = []), typeof a != "function")
    return Dn(l, a, d, f);
  ot((p) => Dn(l, a(), p, f), d);
}
function yh(l, a, f, d, p = {}, v = !1) {
  a || (a = {});
  for (const m in p)
    if (!(m in a)) {
      if (m === "children")
        continue;
      p[m] = xa(l, m, null, p[m], f, v);
    }
  for (const m in a) {
    if (m === "children") {
      d || Dn(l, a.children);
      continue;
    }
    const x = a[m];
    p[m] = xa(l, m, x, p[m], f, v);
  }
}
function mh(l) {
  return l.toLowerCase().replace(/-([a-z])/g, (a, f) => f.toUpperCase());
}
function ba(l, a, f) {
  const d = a.trim().split(/\s+/);
  for (let p = 0, v = d.length; p < v; p++)
    l.classList.toggle(d[p], f);
}
function xa(l, a, f, d, p, v) {
  let m, x, S, L, T;
  if (a === "style")
    return gh(l, f, d);
  if (a === "classList")
    return ph(l, f, d);
  if (f === d)
    return d;
  if (a === "ref")
    v || f(l);
  else if (a.slice(0, 3) === "on:") {
    const E = a.slice(3);
    d && l.removeEventListener(E, d), f && l.addEventListener(E, f);
  } else if (a.slice(0, 10) === "oncapture:") {
    const E = a.slice(10);
    d && l.removeEventListener(E, d, !0), f && l.addEventListener(E, f, !0);
  } else if (a.slice(0, 2) === "on") {
    const E = a.slice(2).toLowerCase(), H = ah.has(E);
    if (!H && d) {
      const X = Array.isArray(d) ? d[0] : d;
      l.removeEventListener(E, X);
    }
    (H || f) && (dh(l, E, f, H), H && eu([E]));
  } else if (a.slice(0, 5) === "attr:")
    ft(l, a.slice(5), f);
  else if ((T = a.slice(0, 5) === "prop:") || (S = ih.has(a)) || !p && ((L = sh(a, l.tagName)) || (x = rh.has(a))) || (m = l.nodeName.includes("-")))
    T && (a = a.slice(5), x = !0), a === "class" || a === "className" ? Ve(l, f) : m && !x && !S ? l[mh(a)] = f : l[L || a] = f;
  else {
    const E = p && a.indexOf(":") > -1 && uh[a.split(":")[0]];
    E ? hh(l, E, a, f) : ft(l, oh[a] || a, f);
  }
  return f;
}
function bh(l) {
  const a = `$$${l.type}`;
  let f = l.composedPath && l.composedPath()[0] || l.target;
  for (l.target !== f && Object.defineProperty(l, "target", {
    configurable: !0,
    value: f
  }), Object.defineProperty(l, "currentTarget", {
    configurable: !0,
    get() {
      return f || document;
    }
  }); f; ) {
    const d = f[a];
    if (d && !f.disabled) {
      const p = f[`${a}Data`];
      if (p !== void 0 ? d.call(f, p, l) : d.call(f, l), l.cancelBubble)
        return;
    }
    f = f._$host || f.parentNode || f.host;
  }
}
function Dn(l, a, f, d, p) {
  for (; typeof f == "function"; )
    f = f();
  if (a === f)
    return f;
  const v = typeof a, m = d !== void 0;
  if (l = m && f[0] && f[0].parentNode || l, v === "string" || v === "number")
    if (v === "number" && (a = a.toString()), m) {
      let x = f[0];
      x && x.nodeType === 3 ? x.data = a : x = document.createTextNode(a), f = Fn(l, f, d, x);
    } else
      f !== "" && typeof f == "string" ? f = l.firstChild.data = a : f = l.textContent = a;
  else if (a == null || v === "boolean")
    f = Fn(l, f, d);
  else {
    if (v === "function")
      return ot(() => {
        let x = a();
        for (; typeof x == "function"; )
          x = x();
        f = Dn(l, x, f, d);
      }), () => f;
    if (Array.isArray(a)) {
      const x = [], S = f && Array.isArray(f);
      if (jo(x, a, f, p))
        return ot(() => f = Dn(l, x, f, d, !0)), () => f;
      if (x.length === 0) {
        if (f = Fn(l, f, d), m)
          return f;
      } else
        S ? f.length === 0 ? wa(l, x, d) : fh(l, f, x) : (f && Fn(l), wa(l, x));
      f = x;
    } else if (a instanceof Node) {
      if (Array.isArray(f)) {
        if (m)
          return f = Fn(l, f, d, a);
        Fn(l, f, null, a);
      } else
        f == null || f === "" || !l.firstChild ? l.appendChild(a) : l.replaceChild(a, l.firstChild);
      f = a;
    } else
      console.warn("Unrecognized value. Skipped inserting", a);
  }
  return f;
}
function jo(l, a, f, d) {
  let p = !1;
  for (let v = 0, m = a.length; v < m; v++) {
    let x = a[v], S = f && f[v];
    if (x instanceof Node)
      l.push(x);
    else if (!(x == null || x === !0 || x === !1))
      if (Array.isArray(x))
        p = jo(l, x, S) || p;
      else if (typeof x == "function")
        if (d) {
          for (; typeof x == "function"; )
            x = x();
          p = jo(l, Array.isArray(x) ? x : [x], Array.isArray(S) ? S : [S]) || p;
        } else
          l.push(x), p = !0;
      else {
        const L = String(x);
        S && S.nodeType === 3 ? (S.data = L, l.push(S)) : l.push(document.createTextNode(L));
      }
  }
  return p;
}
function wa(l, a, f = null) {
  for (let d = 0, p = a.length; d < p; d++)
    l.insertBefore(a[d], f);
}
function Fn(l, a, f, d) {
  if (f === void 0)
    return l.textContent = "";
  const p = d || document.createTextNode("");
  if (a.length) {
    let v = !1;
    for (let m = a.length - 1; m >= 0; m--) {
      const x = a[m];
      if (p !== x) {
        const S = x.parentNode === l;
        !v && !m ? S ? l.replaceChild(p, x) : l.insertBefore(p, f) : S && x.remove();
      } else
        v = !0;
    }
  } else
    l.insertBefore(p, f);
  return [p];
}
var xh = typeof global == "object" && global && global.Object === Object && global;
const wh = xh;
var Sh = typeof self == "object" && self && self.Object === Object && self, Ch = wh || Sh || Function("return this")();
const tu = Ch;
var kh = tu.Symbol;
const mi = kh;
var nu = Object.prototype, Lh = nu.hasOwnProperty, Th = nu.toString, fr = mi ? mi.toStringTag : void 0;
function Fh(l) {
  var a = Lh.call(l, fr), f = l[fr];
  try {
    l[fr] = void 0;
    var d = !0;
  } catch {
  }
  var p = Th.call(l);
  return d && (a ? l[fr] = f : delete l[fr]), p;
}
var Ah = Object.prototype, Dh = Ah.toString;
function Mh(l) {
  return Dh.call(l);
}
var Eh = "[object Null]", Nh = "[object Undefined]", Sa = mi ? mi.toStringTag : void 0;
function Oh(l) {
  return l == null ? l === void 0 ? Nh : Eh : Sa && Sa in Object(l) ? Fh(l) : Mh(l);
}
function Ih(l) {
  return l != null && typeof l == "object";
}
var Hh = "[object Symbol]";
function Ph(l) {
  return typeof l == "symbol" || Ih(l) && Oh(l) == Hh;
}
var Wh = Array.isArray;
const Ca = Wh;
var Bh = /\s/;
function Rh(l) {
  for (var a = l.length; a-- && Bh.test(l.charAt(a)); )
    ;
  return a;
}
var _h = /^\s+/;
function zh(l) {
  return l && l.slice(0, Rh(l) + 1).replace(_h, "");
}
function Xo(l) {
  var a = typeof l;
  return l != null && (a == "object" || a == "function");
}
var ka = 0 / 0, Uh = /^[-+]0x[0-9a-f]+$/i, Gh = /^0b[01]+$/i, qh = /^0o[0-7]+$/i, Kh = parseInt;
function La(l) {
  if (typeof l == "number")
    return l;
  if (Ph(l))
    return ka;
  if (Xo(l)) {
    var a = typeof l.valueOf == "function" ? l.valueOf() : l;
    l = Xo(a) ? a + "" : a;
  }
  if (typeof l != "string")
    return l === 0 ? l : +l;
  l = zh(l);
  var f = Gh.test(l);
  return f || qh.test(l) ? Kh(l.slice(2), f ? 2 : 8) : Uh.test(l) ? ka : +l;
}
var $h = function() {
  return tu.Date.now();
};
const _o = $h;
var jh = "Expected a function", Xh = Math.max, Yh = Math.min;
function Qh(l, a, f) {
  var d, p, v, m, x, S, L = 0, T = !1, E = !1, H = !0;
  if (typeof l != "function")
    throw new TypeError(jh);
  a = La(a) || 0, Xo(f) && (T = !!f.leading, E = "maxWait" in f, v = E ? Xh(La(f.maxWait) || 0, a) : v, H = "trailing" in f ? !!f.trailing : H);
  function X(K) {
    var B = d, ve = p;
    return d = p = void 0, L = K, m = l.apply(ve, B), m;
  }
  function $(K) {
    return L = K, x = setTimeout(ue, a), T ? X(K) : m;
  }
  function V(K) {
    var B = K - S, ve = K - L, Se = a - B;
    return E ? Yh(Se, v - ve) : Se;
  }
  function de(K) {
    var B = K - S, ve = K - L;
    return S === void 0 || B >= a || B < 0 || E && ve >= v;
  }
  function ue() {
    var K = _o();
    if (de(K))
      return J(K);
    x = setTimeout(ue, V(K));
  }
  function J(K) {
    return x = void 0, H && d ? X(K) : (d = p = void 0, m);
  }
  function te() {
    x !== void 0 && clearTimeout(x), L = 0, d = S = p = x = void 0;
  }
  function fe() {
    return x === void 0 ? m : J(_o());
  }
  function ne() {
    var K = _o(), B = de(K);
    if (d = arguments, p = this, S = K, B) {
      if (x === void 0)
        return $(S);
      if (E)
        return clearTimeout(x), x = setTimeout(ue, a), X(S);
    }
    return x === void 0 && (x = setTimeout(ue, a)), m;
  }
  return ne.cancel = te, ne.flush = fe, ne;
}
var Zh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, zo = { exports: {} }, Ta;
function ru() {
  return Ta || (Ta = 1, function(l, a) {
    (function(f, d) {
      l.exports = d();
    })(Zh, function() {
      var f = navigator.userAgent, d = navigator.platform, p = /gecko\/\d/i.test(f), v = /MSIE \d/.test(f), m = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(f), x = /Edge\/(\d+)/.exec(f), S = v || m || x, L = S && (v ? document.documentMode || 6 : +(x || m)[1]), T = !x && /WebKit\//.test(f), E = T && /Qt\/\d+\.\d+/.test(f), H = !x && /Chrome\/(\d+)/.exec(f), X = H && +H[1], $ = /Opera\//.test(f), V = /Apple Computer/.test(navigator.vendor), de = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(f), ue = /PhantomJS/.test(f), J = V && (/Mobile\/\w+/.test(f) || navigator.maxTouchPoints > 2), te = /Android/.test(f), fe = J || te || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(f), ne = J || /Mac/.test(d), K = /\bCrOS\b/.test(f), B = /win/i.test(d), ve = $ && f.match(/Version\/(\d*\.\d*)/);
      ve && (ve = Number(ve[1])), ve && ve >= 15 && ($ = !1, T = !0);
      var Se = ne && (E || $ && (ve == null || ve < 12.11)), Ye = p || S && L >= 9;
      function bt(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
      }
      var xt = function(e, t) {
        var r = e.className, n = bt(t).exec(r);
        if (n) {
          var i = r.slice(n.index + n[0].length);
          e.className = r.slice(0, n.index) + (i ? n[1] + i : "");
        }
      };
      function ct(e) {
        for (var t = e.childNodes.length; t > 0; --t)
          e.removeChild(e.firstChild);
        return e;
      }
      function Ue(e, t) {
        return ct(e).appendChild(t);
      }
      function U(e, t, r, n) {
        var i = document.createElement(e);
        if (r && (i.className = r), n && (i.style.cssText = n), typeof t == "string")
          i.appendChild(document.createTextNode(t));
        else if (t)
          for (var o = 0; o < t.length; ++o)
            i.appendChild(t[o]);
        return i;
      }
      function Et(e, t, r, n) {
        var i = U(e, t, r, n);
        return i.setAttribute("role", "presentation"), i;
      }
      var ht;
      document.createRange ? ht = function(e, t, r, n) {
        var i = document.createRange();
        return i.setEnd(n || e, r), i.setStart(e, t), i;
      } : ht = function(e, t, r) {
        var n = document.body.createTextRange();
        try {
          n.moveToElementText(e.parentNode);
        } catch {
          return n;
        }
        return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n;
      };
      function w(e, t) {
        if (t.nodeType == 3 && (t = t.parentNode), e.contains)
          return e.contains(t);
        do
          if (t.nodeType == 11 && (t = t.host), t == e)
            return !0;
        while (t = t.parentNode);
      }
      function g(e) {
        var t;
        try {
          t = e.activeElement;
        } catch {
          t = e.body || null;
        }
        for (; t && t.shadowRoot && t.shadowRoot.activeElement; )
          t = t.shadowRoot.activeElement;
        return t;
      }
      function W(e, t) {
        var r = e.className;
        bt(t).test(r) || (e.className += (r ? " " : "") + t);
      }
      function G(e, t) {
        for (var r = e.split(" "), n = 0; n < r.length; n++)
          r[n] && !bt(r[n]).test(t) && (t += " " + r[n]);
        return t;
      }
      var j = function(e) {
        e.select();
      };
      J ? j = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : S && (j = function(e) {
        try {
          e.select();
        } catch {
        }
      });
      function ee(e) {
        return e.display.wrapper.ownerDocument;
      }
      function Oe(e) {
        return ee(e).defaultView;
      }
      function Qe(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
          return e.apply(null, t);
        };
      }
      function We(e, t, r) {
        t || (t = {});
        for (var n in e)
          e.hasOwnProperty(n) && (r !== !1 || !t.hasOwnProperty(n)) && (t[n] = e[n]);
        return t;
      }
      function ye(e, t, r, n, i) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var o = n || 0, s = i || 0; ; ) {
          var u = e.indexOf("	", o);
          if (u < 0 || u >= t)
            return s + (t - o);
          s += u - o, s += r - s % r, o = u + 1;
        }
      }
      var Le = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = Qe(this.onTimeout, this);
      };
      Le.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +new Date() ? e.f() : setTimeout(e.handler, e.time - +new Date());
      }, Le.prototype.set = function(e, t) {
        this.f = t;
        var r = +new Date() + e;
        (!this.id || r < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = r);
      };
      function re(e, t) {
        for (var r = 0; r < e.length; ++r)
          if (e[r] == t)
            return r;
        return -1;
      }
      var Cr = 50, kr = { toString: function() {
        return "CodeMirror.Pass";
      } }, dt = { scroll: !1 }, Ti = { origin: "*mouse" }, En = { origin: "+move" };
      function Fi(e, t, r) {
        for (var n = 0, i = 0; ; ) {
          var o = e.indexOf("	", n);
          o == -1 && (o = e.length);
          var s = o - n;
          if (o == e.length || i + s >= t)
            return n + Math.min(s, t - i);
          if (i += o - n, i += r - i % r, n = o + 1, i >= t)
            return n;
        }
      }
      var Lr = [""];
      function Ai(e) {
        for (; Lr.length <= e; )
          Lr.push(oe(Lr) + " ");
        return Lr[e];
      }
      function oe(e) {
        return e[e.length - 1];
      }
      function Tr(e, t) {
        for (var r = [], n = 0; n < e.length; n++)
          r[n] = t(e[n], n);
        return r;
      }
      function Du(e, t, r) {
        for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i; )
          n++;
        e.splice(n, 0, t);
      }
      function ul() {
      }
      function fl(e, t) {
        var r;
        return Object.create ? r = Object.create(e) : (ul.prototype = e, r = new ul()), t && We(t, r), r;
      }
      var Mu = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function Di(e) {
        return /\w/.test(e) || e > "\x80" && (e.toUpperCase() != e.toLowerCase() || Mu.test(e));
      }
      function Fr(e, t) {
        return t ? t.source.indexOf("\\w") > -1 && Di(e) ? !0 : t.test(e) : Di(e);
      }
      function cl(e) {
        for (var t in e)
          if (e.hasOwnProperty(t) && e[t])
            return !1;
        return !0;
      }
      var Eu = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function Mi(e) {
        return e.charCodeAt(0) >= 768 && Eu.test(e);
      }
      function hl(e, t, r) {
        for (; (r < 0 ? t > 0 : t < e.length) && Mi(e.charAt(t)); )
          t += r;
        return t;
      }
      function Nn(e, t, r) {
        for (var n = t > r ? -1 : 1; ; ) {
          if (t == r)
            return t;
          var i = (t + r) / 2, o = n < 0 ? Math.ceil(i) : Math.floor(i);
          if (o == t)
            return e(o) ? t : r;
          e(o) ? r = o : t = o + n;
        }
      }
      function Nu(e, t, r, n) {
        if (!e)
          return n(t, r, "ltr", 0);
        for (var i = !1, o = 0; o < e.length; ++o) {
          var s = e[o];
          (s.from < r && s.to > t || t == r && s.to == t) && (n(Math.max(s.from, t), Math.min(s.to, r), s.level == 1 ? "rtl" : "ltr", o), i = !0);
        }
        i || n(t, r, "ltr");
      }
      var On = null;
      function In(e, t, r) {
        var n;
        On = null;
        for (var i = 0; i < e.length; ++i) {
          var o = e[i];
          if (o.from < t && o.to > t)
            return i;
          o.to == t && (o.from != o.to && r == "before" ? n = i : On = i), o.from == t && (o.from != o.to && r != "before" ? n = i : On = i);
        }
        return n != null ? n : On;
      }
      var Ou = function() {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function r(h) {
          return h <= 247 ? e.charAt(h) : 1424 <= h && h <= 1524 ? "R" : 1536 <= h && h <= 1785 ? t.charAt(h - 1536) : 1774 <= h && h <= 2220 ? "r" : 8192 <= h && h <= 8203 ? "w" : h == 8204 ? "b" : "L";
        }
        var n = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, i = /[stwN]/, o = /[LRr]/, s = /[Lb1n]/, u = /[1n]/;
        function c(h, y, b) {
          this.level = h, this.from = y, this.to = b;
        }
        return function(h, y) {
          var b = y == "ltr" ? "L" : "R";
          if (h.length == 0 || y == "ltr" && !n.test(h))
            return !1;
          for (var k = h.length, C = [], F = 0; F < k; ++F)
            C.push(r(h.charCodeAt(F)));
          for (var A = 0, M = b; A < k; ++A) {
            var N = C[A];
            N == "m" ? C[A] = M : M = N;
          }
          for (var I = 0, O = b; I < k; ++I) {
            var P = C[I];
            P == "1" && O == "r" ? C[I] = "n" : o.test(P) && (O = P, P == "r" && (C[I] = "R"));
          }
          for (var z = 1, _ = C[0]; z < k - 1; ++z) {
            var Z = C[z];
            Z == "+" && _ == "1" && C[z + 1] == "1" ? C[z] = "1" : Z == "," && _ == C[z + 1] && (_ == "1" || _ == "n") && (C[z] = _), _ = Z;
          }
          for (var ae = 0; ae < k; ++ae) {
            var Me = C[ae];
            if (Me == ",")
              C[ae] = "N";
            else if (Me == "%") {
              var he = void 0;
              for (he = ae + 1; he < k && C[he] == "%"; ++he)
                ;
              for (var Je = ae && C[ae - 1] == "!" || he < k && C[he] == "1" ? "1" : "N", $e = ae; $e < he; ++$e)
                C[$e] = Je;
              ae = he - 1;
            }
          }
          for (var xe = 0, je = b; xe < k; ++xe) {
            var Ne = C[xe];
            je == "L" && Ne == "1" ? C[xe] = "L" : o.test(Ne) && (je = Ne);
          }
          for (var Ce = 0; Ce < k; ++Ce)
            if (i.test(C[Ce])) {
              var we = void 0;
              for (we = Ce + 1; we < k && i.test(C[we]); ++we)
                ;
              for (var pe = (Ce ? C[Ce - 1] : b) == "L", Xe = (we < k ? C[we] : b) == "L", Ln = pe == Xe ? pe ? "L" : "R" : b, _t = Ce; _t < we; ++_t)
                C[_t] = Ln;
              Ce = we - 1;
            }
          for (var He = [], mt, Ee = 0; Ee < k; )
            if (s.test(C[Ee])) {
              var Wo = Ee;
              for (++Ee; Ee < k && s.test(C[Ee]); ++Ee)
                ;
              He.push(new c(0, Wo, Ee));
            } else {
              var Ft = Ee, tn = He.length, nn = y == "rtl" ? 1 : 0;
              for (++Ee; Ee < k && C[Ee] != "L"; ++Ee)
                ;
              for (var Re = Ft; Re < Ee; )
                if (u.test(C[Re])) {
                  Ft < Re && (He.splice(tn, 0, new c(1, Ft, Re)), tn += nn);
                  var Tn = Re;
                  for (++Re; Re < Ee && u.test(C[Re]); ++Re)
                    ;
                  He.splice(tn, 0, new c(2, Tn, Re)), tn += nn, Ft = Re;
                } else
                  ++Re;
              Ft < Ee && He.splice(tn, 0, new c(1, Ft, Ee));
            }
          return y == "ltr" && (He[0].level == 1 && (mt = h.match(/^\s+/)) && (He[0].from = mt[0].length, He.unshift(new c(0, 0, mt[0].length))), oe(He).level == 1 && (mt = h.match(/\s+$/)) && (oe(He).to -= mt[0].length, He.push(new c(0, k - mt[0].length, k)))), y == "rtl" ? He.reverse() : He;
        };
      }();
      function wt(e, t) {
        var r = e.order;
        return r == null && (r = e.order = Ou(e.text, t)), r;
      }
      var dl = [], q = function(e, t, r) {
        if (e.addEventListener)
          e.addEventListener(t, r, !1);
        else if (e.attachEvent)
          e.attachEvent("on" + t, r);
        else {
          var n = e._handlers || (e._handlers = {});
          n[t] = (n[t] || dl).concat(r);
        }
      };
      function Ei(e, t) {
        return e._handlers && e._handlers[t] || dl;
      }
      function et(e, t, r) {
        if (e.removeEventListener)
          e.removeEventListener(t, r, !1);
        else if (e.detachEvent)
          e.detachEvent("on" + t, r);
        else {
          var n = e._handlers, i = n && n[t];
          if (i) {
            var o = re(i, r);
            o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)));
          }
        }
      }
      function me(e, t) {
        var r = Ei(e, t);
        if (!!r.length)
          for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i)
            r[i].apply(null, n);
      }
      function Te(e, t, r) {
        return typeof t == "string" && (t = { type: t, preventDefault: function() {
          this.defaultPrevented = !0;
        } }), me(e, r || t.type, e, t), Ni(t) || t.codemirrorIgnore;
      }
      function pl(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (!!t)
          for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n)
            re(r, t[n]) == -1 && r.push(t[n]);
      }
      function rt(e, t) {
        return Ei(e, t).length > 0;
      }
      function on(e) {
        e.prototype.on = function(t, r) {
          q(this, t, r);
        }, e.prototype.off = function(t, r) {
          et(this, t, r);
        };
      }
      function Ge(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }
      function gl(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }
      function Ni(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == !1;
      }
      function Hn(e) {
        Ge(e), gl(e);
      }
      function Oi(e) {
        return e.target || e.srcElement;
      }
      function vl(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), ne && e.ctrlKey && t == 1 && (t = 3), t;
      }
      var Iu = function() {
        if (S && L < 9)
          return !1;
        var e = U("div");
        return "draggable" in e || "dragDrop" in e;
      }(), Ii;
      function Hu(e) {
        if (Ii == null) {
          var t = U("span", "\u200B");
          Ue(e, U("span", [t, document.createTextNode("x")])), e.firstChild.offsetHeight != 0 && (Ii = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(S && L < 8));
        }
        var r = Ii ? U("span", "\u200B") : U("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
        return r.setAttribute("cm-text", ""), r;
      }
      var Hi;
      function Pu(e) {
        if (Hi != null)
          return Hi;
        var t = Ue(e, document.createTextNode("A\u062EA")), r = ht(t, 0, 1).getBoundingClientRect(), n = ht(t, 1, 2).getBoundingClientRect();
        return ct(e), !r || r.left == r.right ? !1 : Hi = n.right - r.right < 3;
      }
      var Pi = `

b`.split(/\n/).length != 3 ? function(e) {
        for (var t = 0, r = [], n = e.length; t <= n; ) {
          var i = e.indexOf(`
`, t);
          i == -1 && (i = e.length);
          var o = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i), s = o.indexOf("\r");
          s != -1 ? (r.push(o.slice(0, s)), t += s + 1) : (r.push(o), t = i + 1);
        }
        return r;
      } : function(e) {
        return e.split(/\r\n?|\n/);
      }, Wu = window.getSelection ? function(e) {
        try {
          return e.selectionStart != e.selectionEnd;
        } catch {
          return !1;
        }
      } : function(e) {
        var t;
        try {
          t = e.ownerDocument.selection.createRange();
        } catch {
        }
        return !t || t.parentElement() != e ? !1 : t.compareEndPoints("StartToEnd", t) != 0;
      }, Bu = function() {
        var e = U("div");
        return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), typeof e.oncopy == "function");
      }(), Wi = null;
      function Ru(e) {
        if (Wi != null)
          return Wi;
        var t = Ue(e, U("span", "x")), r = t.getBoundingClientRect(), n = ht(t, 0, 1).getBoundingClientRect();
        return Wi = Math.abs(r.left - n.left) > 1;
      }
      var Bi = {}, ln = {};
      function _u(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Bi[e] = t;
      }
      function zu(e, t) {
        ln[e] = t;
      }
      function Ar(e) {
        if (typeof e == "string" && ln.hasOwnProperty(e))
          e = ln[e];
        else if (e && typeof e.name == "string" && ln.hasOwnProperty(e.name)) {
          var t = ln[e.name];
          typeof t == "string" && (t = { name: t }), e = fl(t, e), e.name = t.name;
        } else {
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
            return Ar("application/xml");
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
            return Ar("application/json");
        }
        return typeof e == "string" ? { name: e } : e || { name: "null" };
      }
      function Ri(e, t) {
        t = Ar(t);
        var r = Bi[t.name];
        if (!r)
          return Ri(e, "text/plain");
        var n = r(e, t);
        if (sn.hasOwnProperty(t.name)) {
          var i = sn[t.name];
          for (var o in i)
            !i.hasOwnProperty(o) || (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o]);
        }
        if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps)
          for (var s in t.modeProps)
            n[s] = t.modeProps[s];
        return n;
      }
      var sn = {};
      function Uu(e, t) {
        var r = sn.hasOwnProperty(e) ? sn[e] : sn[e] = {};
        We(t, r);
      }
      function qt(e, t) {
        if (t === !0)
          return t;
        if (e.copyState)
          return e.copyState(t);
        var r = {};
        for (var n in t) {
          var i = t[n];
          i instanceof Array && (i = i.concat([])), r[n] = i;
        }
        return r;
      }
      function _i(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t), !(!r || r.mode == e)); )
          t = r.state, e = r.mode;
        return r || { mode: e, state: t };
      }
      function yl(e, t, r) {
        return e.startState ? e.startState(t, r) : !0;
      }
      var be = function(e, t, r) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r;
      };
      be.prototype.eol = function() {
        return this.pos >= this.string.length;
      }, be.prototype.sol = function() {
        return this.pos == this.lineStart;
      }, be.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      }, be.prototype.next = function() {
        if (this.pos < this.string.length)
          return this.string.charAt(this.pos++);
      }, be.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos), r;
        if (typeof e == "string" ? r = t == e : r = t && (e.test ? e.test(t) : e(t)), r)
          return ++this.pos, t;
      }, be.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e); )
          ;
        return this.pos > t;
      }, be.prototype.eatSpace = function() {
        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
          ++this.pos;
        return this.pos > e;
      }, be.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      }, be.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1)
          return this.pos = t, !0;
      }, be.prototype.backUp = function(e) {
        this.pos -= e;
      }, be.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = ye(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? ye(this.string, this.lineStart, this.tabSize) : 0);
      }, be.prototype.indentation = function() {
        return ye(this.string, null, this.tabSize) - (this.lineStart ? ye(this.string, this.lineStart, this.tabSize) : 0);
      }, be.prototype.match = function(e, t, r) {
        if (typeof e == "string") {
          var n = function(s) {
            return r ? s.toLowerCase() : s;
          }, i = this.string.substr(this.pos, e.length);
          if (n(i) == n(e))
            return t !== !1 && (this.pos += e.length), !0;
        } else {
          var o = this.string.slice(this.pos).match(e);
          return o && o.index > 0 ? null : (o && t !== !1 && (this.pos += o[0].length), o);
        }
      }, be.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      }, be.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      }, be.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
      }, be.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
      };
      function R(e, t) {
        if (t -= e.first, t < 0 || t >= e.size)
          throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var r = e; !r.lines; )
          for (var n = 0; ; ++n) {
            var i = r.children[n], o = i.chunkSize();
            if (t < o) {
              r = i;
              break;
            }
            t -= o;
          }
        return r.lines[t];
      }
      function Kt(e, t, r) {
        var n = [], i = t.line;
        return e.iter(t.line, r.line + 1, function(o) {
          var s = o.text;
          i == r.line && (s = s.slice(0, r.ch)), i == t.line && (s = s.slice(t.ch)), n.push(s), ++i;
        }), n;
      }
      function zi(e, t, r) {
        var n = [];
        return e.iter(t, r, function(i) {
          n.push(i.text);
        }), n;
      }
      function pt(e, t) {
        var r = t - e.height;
        if (r)
          for (var n = e; n; n = n.parent)
            n.height += r;
      }
      function le(e) {
        if (e.parent == null)
          return null;
        for (var t = e.parent, r = re(t.lines, e), n = t.parent; n; t = n, n = n.parent)
          for (var i = 0; n.children[i] != t; ++i)
            r += n.children[i].chunkSize();
        return r + t.first;
      }
      function $t(e, t) {
        var r = e.first;
        e:
          do {
            for (var n = 0; n < e.children.length; ++n) {
              var i = e.children[n], o = i.height;
              if (t < o) {
                e = i;
                continue e;
              }
              t -= o, r += i.chunkSize();
            }
            return r;
          } while (!e.lines);
        for (var s = 0; s < e.lines.length; ++s) {
          var u = e.lines[s], c = u.height;
          if (t < c)
            break;
          t -= c;
        }
        return r + s;
      }
      function Pn(e, t) {
        return t >= e.first && t < e.first + e.size;
      }
      function Ui(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }
      function D(e, t, r) {
        if (r === void 0 && (r = null), !(this instanceof D))
          return new D(e, t, r);
        this.line = e, this.ch = t, this.sticky = r;
      }
      function Y(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }
      function Gi(e, t) {
        return e.sticky == t.sticky && Y(e, t) == 0;
      }
      function qi(e) {
        return D(e.line, e.ch);
      }
      function Dr(e, t) {
        return Y(e, t) < 0 ? t : e;
      }
      function Mr(e, t) {
        return Y(e, t) < 0 ? e : t;
      }
      function ml(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }
      function Q(e, t) {
        if (t.line < e.first)
          return D(e.first, 0);
        var r = e.first + e.size - 1;
        return t.line > r ? D(r, R(e, r).text.length) : Gu(t, R(e, t.line).text.length);
      }
      function Gu(e, t) {
        var r = e.ch;
        return r == null || r > t ? D(e.line, t) : r < 0 ? D(e.line, 0) : e;
      }
      function bl(e, t) {
        for (var r = [], n = 0; n < t.length; n++)
          r[n] = Q(e, t[n]);
        return r;
      }
      var Er = function(e, t) {
        this.state = e, this.lookAhead = t;
      }, gt = function(e, t, r, n) {
        this.state = t, this.doc = e, this.line = r, this.maxLookAhead = n || 0, this.baseTokens = null, this.baseTokenPos = 1;
      };
      gt.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
      }, gt.prototype.baseToken = function(e) {
        if (!this.baseTokens)
          return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; )
          this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: t && t.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - e
        };
      }, gt.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }, gt.fromSaved = function(e, t, r) {
        return t instanceof Er ? new gt(e, qt(e.mode, t.state), r, t.lookAhead) : new gt(e, qt(e.mode, t), r);
      }, gt.prototype.save = function(e) {
        var t = e !== !1 ? qt(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new Er(t, this.maxLookAhead) : t;
      };
      function xl(e, t, r, n) {
        var i = [e.state.modeGen], o = {};
        Tl(
          e,
          t.text,
          e.doc.mode,
          r,
          function(h, y) {
            return i.push(h, y);
          },
          o,
          n
        );
        for (var s = r.state, u = function(h) {
          r.baseTokens = i;
          var y = e.state.overlays[h], b = 1, k = 0;
          r.state = !0, Tl(e, t.text, y.mode, r, function(C, F) {
            for (var A = b; k < C; ) {
              var M = i[b];
              M > C && i.splice(b, 1, C, i[b + 1], M), b += 2, k = Math.min(C, M);
            }
            if (!!F)
              if (y.opaque)
                i.splice(A, b - A, C, "overlay " + F), b = A + 2;
              else
                for (; A < b; A += 2) {
                  var N = i[A + 1];
                  i[A + 1] = (N ? N + " " : "") + "overlay " + F;
                }
          }, o), r.state = s, r.baseTokens = null, r.baseTokenPos = 1;
        }, c = 0; c < e.state.overlays.length; ++c)
          u(c);
        return { styles: i, classes: o.bgClass || o.textClass ? o : null };
      }
      function wl(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var n = Wn(e, le(t)), i = t.text.length > e.options.maxHighlightLength && qt(e.doc.mode, n.state), o = xl(e, t, n);
          i && (n.state = i), t.stateAfter = n.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        }
        return t.styles;
      }
      function Wn(e, t, r) {
        var n = e.doc, i = e.display;
        if (!n.mode.startState)
          return new gt(n, !0, t);
        var o = qu(e, t, r), s = o > n.first && R(n, o - 1).stateAfter, u = s ? gt.fromSaved(n, s, o) : new gt(n, yl(n.mode), o);
        return n.iter(o, t, function(c) {
          Ki(e, c.text, u);
          var h = u.line;
          c.stateAfter = h == t - 1 || h % 5 == 0 || h >= i.viewFrom && h < i.viewTo ? u.save() : null, u.nextLine();
        }), r && (n.modeFrontier = u.line), u;
      }
      function Ki(e, t, r, n) {
        var i = e.doc.mode, o = new be(t, e.options.tabSize, r);
        for (o.start = o.pos = n || 0, t == "" && Sl(i, r.state); !o.eol(); )
          $i(i, o, r.state), o.start = o.pos;
      }
      function Sl(e, t) {
        if (e.blankLine)
          return e.blankLine(t);
        if (!!e.innerMode) {
          var r = _i(e, t);
          if (r.mode.blankLine)
            return r.mode.blankLine(r.state);
        }
      }
      function $i(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
          n && (n[0] = _i(e, r).mode);
          var o = e.token(t, r);
          if (t.pos > t.start)
            return o;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
      }
      var Cl = function(e, t, r) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = r;
      };
      function kl(e, t, r, n) {
        var i = e.doc, o = i.mode, s;
        t = Q(i, t);
        var u = R(i, t.line), c = Wn(e, t.line, r), h = new be(u.text, e.options.tabSize, c), y;
        for (n && (y = []); (n || h.pos < t.ch) && !h.eol(); )
          h.start = h.pos, s = $i(o, h, c.state), n && y.push(new Cl(h, s, qt(i.mode, c.state)));
        return n ? y : new Cl(h, s, c.state);
      }
      function Ll(e, t) {
        if (e)
          for (; ; ) {
            var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!r)
              break;
            e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
            var n = r[1] ? "bgClass" : "textClass";
            t[n] == null ? t[n] = r[2] : new RegExp("(?:^|\\s)" + r[2] + "(?:$|\\s)").test(t[n]) || (t[n] += " " + r[2]);
          }
        return e;
      }
      function Tl(e, t, r, n, i, o, s) {
        var u = r.flattenSpans;
        u == null && (u = e.options.flattenSpans);
        var c = 0, h = null, y = new be(t, e.options.tabSize, n), b, k = e.options.addModeClass && [null];
        for (t == "" && Ll(Sl(r, n.state), o); !y.eol(); ) {
          if (y.pos > e.options.maxHighlightLength ? (u = !1, s && Ki(e, t, n, y.pos), y.pos = t.length, b = null) : b = Ll($i(r, y, n.state, k), o), k) {
            var C = k[0].name;
            C && (b = "m-" + (b ? C + " " + b : C));
          }
          if (!u || h != b) {
            for (; c < y.start; )
              c = Math.min(y.start, c + 5e3), i(c, h);
            h = b;
          }
          y.start = y.pos;
        }
        for (; c < y.pos; ) {
          var F = Math.min(y.pos, c + 5e3);
          i(F, h), c = F;
        }
      }
      function qu(e, t, r) {
        for (var n, i, o = e.doc, s = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), u = t; u > s; --u) {
          if (u <= o.first)
            return o.first;
          var c = R(o, u - 1), h = c.stateAfter;
          if (h && (!r || u + (h instanceof Er ? h.lookAhead : 0) <= o.modeFrontier))
            return u;
          var y = ye(c.text, null, e.options.tabSize);
          (i == null || n > y) && (i = u - 1, n = y);
        }
        return i;
      }
      function Ku(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
          for (var r = e.first, n = t - 1; n > r; n--) {
            var i = R(e, n).stateAfter;
            if (i && (!(i instanceof Er) || n + i.lookAhead < t)) {
              r = n + 1;
              break;
            }
          }
          e.highlightFrontier = Math.min(e.highlightFrontier, r);
        }
      }
      var Fl = !1, St = !1;
      function $u() {
        Fl = !0;
      }
      function ju() {
        St = !0;
      }
      function Nr(e, t, r) {
        this.marker = e, this.from = t, this.to = r;
      }
      function Bn(e, t) {
        if (e)
          for (var r = 0; r < e.length; ++r) {
            var n = e[r];
            if (n.marker == t)
              return n;
          }
      }
      function Xu(e, t) {
        for (var r, n = 0; n < e.length; ++n)
          e[n] != t && (r || (r = [])).push(e[n]);
        return r;
      }
      function Yu(e, t, r) {
        var n = r && window.WeakSet && (r.markedSpans || (r.markedSpans = /* @__PURE__ */ new WeakSet()));
        n && e.markedSpans && n.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], n && n.add(e.markedSpans)), t.marker.attachLine(e);
      }
      function Qu(e, t, r) {
        var n;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], s = o.marker, u = o.from == null || (s.inclusiveLeft ? o.from <= t : o.from < t);
            if (u || o.from == t && s.type == "bookmark" && (!r || !o.marker.insertLeft)) {
              var c = o.to == null || (s.inclusiveRight ? o.to >= t : o.to > t);
              (n || (n = [])).push(new Nr(s, o.from, c ? null : o.to));
            }
          }
        return n;
      }
      function Zu(e, t, r) {
        var n;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], s = o.marker, u = o.to == null || (s.inclusiveRight ? o.to >= t : o.to > t);
            if (u || o.from == t && s.type == "bookmark" && (!r || o.marker.insertLeft)) {
              var c = o.from == null || (s.inclusiveLeft ? o.from <= t : o.from < t);
              (n || (n = [])).push(new Nr(
                s,
                c ? null : o.from - t,
                o.to == null ? null : o.to - t
              ));
            }
          }
        return n;
      }
      function ji(e, t) {
        if (t.full)
          return null;
        var r = Pn(e, t.from.line) && R(e, t.from.line).markedSpans, n = Pn(e, t.to.line) && R(e, t.to.line).markedSpans;
        if (!r && !n)
          return null;
        var i = t.from.ch, o = t.to.ch, s = Y(t.from, t.to) == 0, u = Qu(r, i, s), c = Zu(n, o, s), h = t.text.length == 1, y = oe(t.text).length + (h ? i : 0);
        if (u)
          for (var b = 0; b < u.length; ++b) {
            var k = u[b];
            if (k.to == null) {
              var C = Bn(c, k.marker);
              C ? h && (k.to = C.to == null ? null : C.to + y) : k.to = i;
            }
          }
        if (c)
          for (var F = 0; F < c.length; ++F) {
            var A = c[F];
            if (A.to != null && (A.to += y), A.from == null) {
              var M = Bn(u, A.marker);
              M || (A.from = y, h && (u || (u = [])).push(A));
            } else
              A.from += y, h && (u || (u = [])).push(A);
          }
        u && (u = Al(u)), c && c != u && (c = Al(c));
        var N = [u];
        if (!h) {
          var I = t.text.length - 2, O;
          if (I > 0 && u)
            for (var P = 0; P < u.length; ++P)
              u[P].to == null && (O || (O = [])).push(new Nr(u[P].marker, null, null));
          for (var z = 0; z < I; ++z)
            N.push(O);
          N.push(c);
        }
        return N;
      }
      function Al(e) {
        for (var t = 0; t < e.length; ++t) {
          var r = e[t];
          r.from != null && r.from == r.to && r.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
        }
        return e.length ? e : null;
      }
      function Ju(e, t, r) {
        var n = null;
        if (e.iter(t.line, r.line + 1, function(C) {
          if (C.markedSpans)
            for (var F = 0; F < C.markedSpans.length; ++F) {
              var A = C.markedSpans[F].marker;
              A.readOnly && (!n || re(n, A) == -1) && (n || (n = [])).push(A);
            }
        }), !n)
          return null;
        for (var i = [{ from: t, to: r }], o = 0; o < n.length; ++o)
          for (var s = n[o], u = s.find(0), c = 0; c < i.length; ++c) {
            var h = i[c];
            if (!(Y(h.to, u.from) < 0 || Y(h.from, u.to) > 0)) {
              var y = [c, 1], b = Y(h.from, u.from), k = Y(h.to, u.to);
              (b < 0 || !s.inclusiveLeft && !b) && y.push({ from: h.from, to: u.from }), (k > 0 || !s.inclusiveRight && !k) && y.push({ from: u.to, to: h.to }), i.splice.apply(i, y), c += y.length - 3;
            }
          }
        return i;
      }
      function Dl(e) {
        var t = e.markedSpans;
        if (!!t) {
          for (var r = 0; r < t.length; ++r)
            t[r].marker.detachLine(e);
          e.markedSpans = null;
        }
      }
      function Ml(e, t) {
        if (!!t) {
          for (var r = 0; r < t.length; ++r)
            t[r].marker.attachLine(e);
          e.markedSpans = t;
        }
      }
      function Or(e) {
        return e.inclusiveLeft ? -1 : 0;
      }
      function Ir(e) {
        return e.inclusiveRight ? 1 : 0;
      }
      function Xi(e, t) {
        var r = e.lines.length - t.lines.length;
        if (r != 0)
          return r;
        var n = e.find(), i = t.find(), o = Y(n.from, i.from) || Or(e) - Or(t);
        if (o)
          return -o;
        var s = Y(n.to, i.to) || Ir(e) - Ir(t);
        return s || t.id - e.id;
      }
      function El(e, t) {
        var r = St && e.markedSpans, n;
        if (r)
          for (var i = void 0, o = 0; o < r.length; ++o)
            i = r[o], i.marker.collapsed && (t ? i.from : i.to) == null && (!n || Xi(n, i.marker) < 0) && (n = i.marker);
        return n;
      }
      function Nl(e) {
        return El(e, !0);
      }
      function Hr(e) {
        return El(e, !1);
      }
      function Vu(e, t) {
        var r = St && e.markedSpans, n;
        if (r)
          for (var i = 0; i < r.length; ++i) {
            var o = r[i];
            o.marker.collapsed && (o.from == null || o.from < t) && (o.to == null || o.to > t) && (!n || Xi(n, o.marker) < 0) && (n = o.marker);
          }
        return n;
      }
      function Ol(e, t, r, n, i) {
        var o = R(e, t), s = St && o.markedSpans;
        if (s)
          for (var u = 0; u < s.length; ++u) {
            var c = s[u];
            if (!!c.marker.collapsed) {
              var h = c.marker.find(0), y = Y(h.from, r) || Or(c.marker) - Or(i), b = Y(h.to, n) || Ir(c.marker) - Ir(i);
              if (!(y >= 0 && b <= 0 || y <= 0 && b >= 0) && (y <= 0 && (c.marker.inclusiveRight && i.inclusiveLeft ? Y(h.to, r) >= 0 : Y(h.to, r) > 0) || y >= 0 && (c.marker.inclusiveRight && i.inclusiveLeft ? Y(h.from, n) <= 0 : Y(h.from, n) < 0)))
                return !0;
            }
          }
      }
      function lt(e) {
        for (var t; t = Nl(e); )
          e = t.find(-1, !0).line;
        return e;
      }
      function ef(e) {
        for (var t; t = Hr(e); )
          e = t.find(1, !0).line;
        return e;
      }
      function tf(e) {
        for (var t, r; t = Hr(e); )
          e = t.find(1, !0).line, (r || (r = [])).push(e);
        return r;
      }
      function Yi(e, t) {
        var r = R(e, t), n = lt(r);
        return r == n ? t : le(n);
      }
      function Il(e, t) {
        if (t > e.lastLine())
          return t;
        var r = R(e, t), n;
        if (!Nt(e, r))
          return t;
        for (; n = Hr(r); )
          r = n.find(1, !0).line;
        return le(r) + 1;
      }
      function Nt(e, t) {
        var r = St && t.markedSpans;
        if (r) {
          for (var n = void 0, i = 0; i < r.length; ++i)
            if (n = r[i], !!n.marker.collapsed) {
              if (n.from == null)
                return !0;
              if (!n.marker.widgetNode && n.from == 0 && n.marker.inclusiveLeft && Qi(e, t, n))
                return !0;
            }
        }
      }
      function Qi(e, t, r) {
        if (r.to == null) {
          var n = r.marker.find(1, !0);
          return Qi(e, n.line, Bn(n.line.markedSpans, r.marker));
        }
        if (r.marker.inclusiveRight && r.to == t.text.length)
          return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
          if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == r.to && (i.to == null || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && Qi(e, t, i))
            return !0;
      }
      function Ct(e) {
        e = lt(e);
        for (var t = 0, r = e.parent, n = 0; n < r.lines.length; ++n) {
          var i = r.lines[n];
          if (i == e)
            break;
          t += i.height;
        }
        for (var o = r.parent; o; r = o, o = r.parent)
          for (var s = 0; s < o.children.length; ++s) {
            var u = o.children[s];
            if (u == r)
              break;
            t += u.height;
          }
        return t;
      }
      function Pr(e) {
        if (e.height == 0)
          return 0;
        for (var t = e.text.length, r, n = e; r = Nl(n); ) {
          var i = r.find(0, !0);
          n = i.from.line, t += i.from.ch - i.to.ch;
        }
        for (n = e; r = Hr(n); ) {
          var o = r.find(0, !0);
          t -= n.text.length - o.from.ch, n = o.to.line, t += n.text.length - o.to.ch;
        }
        return t;
      }
      function Zi(e) {
        var t = e.display, r = e.doc;
        t.maxLine = R(r, r.first), t.maxLineLength = Pr(t.maxLine), t.maxLineChanged = !0, r.iter(function(n) {
          var i = Pr(n);
          i > t.maxLineLength && (t.maxLineLength = i, t.maxLine = n);
        });
      }
      var an = function(e, t, r) {
        this.text = e, Ml(this, t), this.height = r ? r(this) : 1;
      };
      an.prototype.lineNo = function() {
        return le(this);
      }, on(an);
      function nf(e, t, r, n) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), e.order != null && (e.order = null), Dl(e), Ml(e, r);
        var i = n ? n(e) : 1;
        i != e.height && pt(e, i);
      }
      function rf(e) {
        e.parent = null, Dl(e);
      }
      var of = {}, lf = {};
      function Hl(e, t) {
        if (!e || /^\s*$/.test(e))
          return null;
        var r = t.addModeClass ? lf : of;
        return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
      }
      function Pl(e, t) {
        var r = Et("span", null, null, T ? "padding-right: .1px" : null), n = {
          pre: Et("pre", [r], "CodeMirror-line"),
          content: r,
          col: 0,
          pos: 0,
          cm: e,
          trailingSpace: !1,
          splitSpaces: e.getOption("lineWrapping")
        };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
          var o = i ? t.rest[i - 1] : t.line, s = void 0;
          n.pos = 0, n.addToken = af, Pu(e.display.measure) && (s = wt(o, e.doc.direction)) && (n.addToken = ff(n.addToken, s)), n.map = [];
          var u = t != e.display.externalMeasured && le(o);
          cf(o, n, wl(e, o, u)), o.styleClasses && (o.styleClasses.bgClass && (n.bgClass = G(o.styleClasses.bgClass, n.bgClass || "")), o.styleClasses.textClass && (n.textClass = G(o.styleClasses.textClass, n.textClass || ""))), n.map.length == 0 && n.map.push(0, 0, n.content.appendChild(Hu(e.display.measure))), i == 0 ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (T) {
          var c = n.content.lastChild;
          (/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack");
        }
        return me(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = G(n.pre.className, n.textClass || "")), n;
      }
      function sf(e) {
        var t = U("span", "\u2022", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }
      function af(e, t, r, n, i, o, s) {
        if (!!t) {
          var u = e.splitSpaces ? uf(t, e.trailingSpace) : t, c = e.cm.state.specialChars, h = !1, y;
          if (!c.test(t))
            e.col += t.length, y = document.createTextNode(u), e.map.push(e.pos, e.pos + t.length, y), S && L < 9 && (h = !0), e.pos += t.length;
          else {
            y = document.createDocumentFragment();
            for (var b = 0; ; ) {
              c.lastIndex = b;
              var k = c.exec(t), C = k ? k.index - b : t.length - b;
              if (C) {
                var F = document.createTextNode(u.slice(b, b + C));
                S && L < 9 ? y.appendChild(U("span", [F])) : y.appendChild(F), e.map.push(e.pos, e.pos + C, F), e.col += C, e.pos += C;
              }
              if (!k)
                break;
              b += C + 1;
              var A = void 0;
              if (k[0] == "	") {
                var M = e.cm.options.tabSize, N = M - e.col % M;
                A = y.appendChild(U("span", Ai(N), "cm-tab")), A.setAttribute("role", "presentation"), A.setAttribute("cm-text", "	"), e.col += N;
              } else
                k[0] == "\r" || k[0] == `
` ? (A = y.appendChild(U("span", k[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar")), A.setAttribute("cm-text", k[0]), e.col += 1) : (A = e.cm.options.specialCharPlaceholder(k[0]), A.setAttribute("cm-text", k[0]), S && L < 9 ? y.appendChild(U("span", [A])) : y.appendChild(A), e.col += 1);
              e.map.push(e.pos, e.pos + 1, A), e.pos++;
            }
          }
          if (e.trailingSpace = u.charCodeAt(t.length - 1) == 32, r || n || i || h || o || s) {
            var I = r || "";
            n && (I += n), i && (I += i);
            var O = U("span", [y], I, o);
            if (s)
              for (var P in s)
                s.hasOwnProperty(P) && P != "style" && P != "class" && O.setAttribute(P, s[P]);
            return e.content.appendChild(O);
          }
          e.content.appendChild(y);
        }
      }
      function uf(e, t) {
        if (e.length > 1 && !/  /.test(e))
          return e;
        for (var r = t, n = "", i = 0; i < e.length; i++) {
          var o = e.charAt(i);
          o == " " && r && (i == e.length - 1 || e.charCodeAt(i + 1) == 32) && (o = "\xA0"), n += o, r = o == " ";
        }
        return n;
      }
      function ff(e, t) {
        return function(r, n, i, o, s, u, c) {
          i = i ? i + " cm-force-border" : "cm-force-border";
          for (var h = r.pos, y = h + n.length; ; ) {
            for (var b = void 0, k = 0; k < t.length && (b = t[k], !(b.to > h && b.from <= h)); k++)
              ;
            if (b.to >= y)
              return e(r, n, i, o, s, u, c);
            e(r, n.slice(0, b.to - h), i, o, null, u, c), o = null, n = n.slice(b.to - h), h = b.to;
          }
        };
      }
      function Wl(e, t, r, n) {
        var i = !n && r.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1;
      }
      function cf(e, t, r) {
        var n = e.markedSpans, i = e.text, o = 0;
        if (!n) {
          for (var s = 1; s < r.length; s += 2)
            t.addToken(t, i.slice(o, o = r[s]), Hl(r[s + 1], t.cm.options));
          return;
        }
        for (var u = i.length, c = 0, h = 1, y = "", b, k, C = 0, F, A, M, N, I; ; ) {
          if (C == c) {
            F = A = M = k = "", I = null, N = null, C = 1 / 0;
            for (var O = [], P = void 0, z = 0; z < n.length; ++z) {
              var _ = n[z], Z = _.marker;
              if (Z.type == "bookmark" && _.from == c && Z.widgetNode)
                O.push(Z);
              else if (_.from <= c && (_.to == null || _.to > c || Z.collapsed && _.to == c && _.from == c)) {
                if (_.to != null && _.to != c && C > _.to && (C = _.to, A = ""), Z.className && (F += " " + Z.className), Z.css && (k = (k ? k + ";" : "") + Z.css), Z.startStyle && _.from == c && (M += " " + Z.startStyle), Z.endStyle && _.to == C && (P || (P = [])).push(Z.endStyle, _.to), Z.title && ((I || (I = {})).title = Z.title), Z.attributes)
                  for (var ae in Z.attributes)
                    (I || (I = {}))[ae] = Z.attributes[ae];
                Z.collapsed && (!N || Xi(N.marker, Z) < 0) && (N = _);
              } else
                _.from > c && C > _.from && (C = _.from);
            }
            if (P)
              for (var Me = 0; Me < P.length; Me += 2)
                P[Me + 1] == C && (A += " " + P[Me]);
            if (!N || N.from == c)
              for (var he = 0; he < O.length; ++he)
                Wl(t, 0, O[he]);
            if (N && (N.from || 0) == c) {
              if (Wl(
                t,
                (N.to == null ? u + 1 : N.to) - c,
                N.marker,
                N.from == null
              ), N.to == null)
                return;
              N.to == c && (N = !1);
            }
          }
          if (c >= u)
            break;
          for (var Je = Math.min(u, C); ; ) {
            if (y) {
              var $e = c + y.length;
              if (!N) {
                var xe = $e > Je ? y.slice(0, Je - c) : y;
                t.addToken(
                  t,
                  xe,
                  b ? b + F : F,
                  M,
                  c + xe.length == C ? A : "",
                  k,
                  I
                );
              }
              if ($e >= Je) {
                y = y.slice(Je - c), c = Je;
                break;
              }
              c = $e, M = "";
            }
            y = i.slice(o, o = r[h++]), b = Hl(r[h++], t.cm.options);
          }
        }
      }
      function Bl(e, t, r) {
        this.line = t, this.rest = tf(t), this.size = this.rest ? le(oe(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = Nt(e, t);
      }
      function Wr(e, t, r) {
        for (var n = [], i, o = t; o < r; o = i) {
          var s = new Bl(e.doc, R(e.doc, o), o);
          i = o + s.size, n.push(s);
        }
        return n;
      }
      var un = null;
      function hf(e) {
        un ? un.ops.push(e) : e.ownsGroup = un = {
          ops: [e],
          delayedCallbacks: []
        };
      }
      function df(e) {
        var t = e.delayedCallbacks, r = 0;
        do {
          for (; r < t.length; r++)
            t[r].call(null);
          for (var n = 0; n < e.ops.length; n++) {
            var i = e.ops[n];
            if (i.cursorActivityHandlers)
              for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
                i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
          }
        } while (r < t.length);
      }
      function pf(e, t) {
        var r = e.ownsGroup;
        if (!!r)
          try {
            df(r);
          } finally {
            un = null, t(r);
          }
      }
      var Rn = null;
      function Fe(e, t) {
        var r = Ei(e, t);
        if (!!r.length) {
          var n = Array.prototype.slice.call(arguments, 2), i;
          un ? i = un.delayedCallbacks : Rn ? i = Rn : (i = Rn = [], setTimeout(gf, 0));
          for (var o = function(u) {
            i.push(function() {
              return r[u].apply(null, n);
            });
          }, s = 0; s < r.length; ++s)
            o(s);
        }
      }
      function gf() {
        var e = Rn;
        Rn = null;
        for (var t = 0; t < e.length; ++t)
          e[t]();
      }
      function Rl(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
          var o = t.changes[i];
          o == "text" ? yf(e, t) : o == "gutter" ? zl(e, t, r, n) : o == "class" ? Ji(e, t) : o == "widget" && mf(e, t, n);
        }
        t.changes = null;
      }
      function _n(e) {
        return e.node == e.text && (e.node = U("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), S && L < 8 && (e.node.style.zIndex = 2)), e.node;
      }
      function vf(e, t) {
        var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (r && (r += " CodeMirror-linebackground"), t.background)
          r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (r) {
          var n = _n(t);
          t.background = n.insertBefore(U("div", null, r), n.firstChild), e.display.input.setUneditable(t.background);
        }
      }
      function _l(e, t) {
        var r = e.display.externalMeasured;
        return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : Pl(e, t);
      }
      function yf(e, t) {
        var r = t.text.className, n = _l(e, t);
        t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, Ji(e, t)) : r && (t.text.className = r);
      }
      function Ji(e, t) {
        vf(e, t), t.line.wrapClass ? _n(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = r || "";
      }
      function zl(e, t, r, n) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var i = _n(t);
          t.gutterBackground = U(
            "div",
            null,
            "CodeMirror-gutter-background " + t.line.gutterClass,
            "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px; width: " + n.gutterTotalWidth + "px"
          ), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text);
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
          var s = _n(t), u = t.gutter = U("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px");
          if (u.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(u), s.insertBefore(u, t.text), t.line.gutterClass && (u.className += " " + t.line.gutterClass), e.options.lineNumbers && (!o || !o["CodeMirror-linenumbers"]) && (t.lineNumber = u.appendChild(
            U(
              "div",
              Ui(e.options, r),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"
            )
          )), o)
            for (var c = 0; c < e.display.gutterSpecs.length; ++c) {
              var h = e.display.gutterSpecs[c].className, y = o.hasOwnProperty(h) && o[h];
              y && u.appendChild(U(
                "div",
                [y],
                "CodeMirror-gutter-elt",
                "left: " + n.gutterLeft[h] + "px; width: " + n.gutterWidth[h] + "px"
              ));
            }
        }
      }
      function mf(e, t, r) {
        t.alignable && (t.alignable = null);
        for (var n = bt("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o)
          o = i.nextSibling, n.test(i.className) && t.node.removeChild(i);
        Ul(e, t, r);
      }
      function bf(e, t, r, n) {
        var i = _l(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), Ji(e, t), zl(e, t, r, n), Ul(e, t, n), t.node;
      }
      function Ul(e, t, r) {
        if (Gl(e, t.line, t, r, !0), t.rest)
          for (var n = 0; n < t.rest.length; n++)
            Gl(e, t.rest[n], t, r, !1);
      }
      function Gl(e, t, r, n, i) {
        if (!!t.widgets)
          for (var o = _n(r), s = 0, u = t.widgets; s < u.length; ++s) {
            var c = u[s], h = U("div", [c.node], "CodeMirror-linewidget" + (c.className ? " " + c.className : ""));
            c.handleMouseEvents || h.setAttribute("cm-ignore-events", "true"), xf(c, h, r, n), e.display.input.setUneditable(h), i && c.above ? o.insertBefore(h, r.gutter || r.text) : o.appendChild(h), Fe(c, "redraw");
          }
      }
      function xf(e, t, r, n) {
        if (e.noHScroll) {
          (r.alignable || (r.alignable = [])).push(t);
          var i = n.wrapperWidth;
          t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px";
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"));
      }
      function zn(e) {
        if (e.height != null)
          return e.height;
        var t = e.doc.cm;
        if (!t)
          return 0;
        if (!w(document.body, e.node)) {
          var r = "position: relative;";
          e.coverGutter && (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"), Ue(t.display.measure, U("div", [e.node], null, r));
        }
        return e.height = e.node.parentNode.offsetHeight;
      }
      function kt(e, t) {
        for (var r = Oi(t); r != e.wrapper; r = r.parentNode)
          if (!r || r.nodeType == 1 && r.getAttribute("cm-ignore-events") == "true" || r.parentNode == e.sizer && r != e.mover)
            return !0;
      }
      function Br(e) {
        return e.lineSpace.offsetTop;
      }
      function Vi(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }
      function ql(e) {
        if (e.cachedPaddingH)
          return e.cachedPaddingH;
        var t = Ue(e.measure, U("pre", "x", "CodeMirror-line-like")), r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, n = { left: parseInt(r.paddingLeft), right: parseInt(r.paddingRight) };
        return !isNaN(n.left) && !isNaN(n.right) && (e.cachedPaddingH = n), n;
      }
      function vt(e) {
        return Cr - e.display.nativeBarWidth;
      }
      function jt(e) {
        return e.display.scroller.clientWidth - vt(e) - e.display.barWidth;
      }
      function eo(e) {
        return e.display.scroller.clientHeight - vt(e) - e.display.barHeight;
      }
      function wf(e, t, r) {
        var n = e.options.lineWrapping, i = n && jt(e);
        if (!t.measure.heights || n && t.measure.width != i) {
          var o = t.measure.heights = [];
          if (n) {
            t.measure.width = i;
            for (var s = t.text.firstChild.getClientRects(), u = 0; u < s.length - 1; u++) {
              var c = s[u], h = s[u + 1];
              Math.abs(c.bottom - h.bottom) > 2 && o.push((c.bottom + h.top) / 2 - r.top);
            }
          }
          o.push(r.bottom - r.top);
        }
      }
      function Kl(e, t, r) {
        if (e.line == t)
          return { map: e.measure.map, cache: e.measure.cache };
        if (e.rest) {
          for (var n = 0; n < e.rest.length; n++)
            if (e.rest[n] == t)
              return { map: e.measure.maps[n], cache: e.measure.caches[n] };
          for (var i = 0; i < e.rest.length; i++)
            if (le(e.rest[i]) > r)
              return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 };
        }
      }
      function Sf(e, t) {
        t = lt(t);
        var r = le(t), n = e.display.externalMeasured = new Bl(e.doc, t, r);
        n.lineN = r;
        var i = n.built = Pl(e, n);
        return n.text = i.pre, Ue(e.display.lineMeasure, i.pre), n;
      }
      function $l(e, t, r, n) {
        return yt(e, fn(e, t), r, n);
      }
      function to(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
          return e.display.view[Qt(e, t)];
        var r = e.display.externalMeasured;
        if (r && t >= r.lineN && t < r.lineN + r.size)
          return r;
      }
      function fn(e, t) {
        var r = le(t), n = to(e, r);
        n && !n.text ? n = null : n && n.changes && (Rl(e, n, r, lo(e)), e.curOp.forceUpdate = !0), n || (n = Sf(e, t));
        var i = Kl(n, t, r);
        return {
          line: t,
          view: n,
          rect: null,
          map: i.map,
          cache: i.cache,
          before: i.before,
          hasHeights: !1
        };
      }
      function yt(e, t, r, n, i) {
        t.before && (r = -1);
        var o = r + (n || ""), s;
        return t.cache.hasOwnProperty(o) ? s = t.cache[o] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (wf(e, t.view, t.rect), t.hasHeights = !0), s = kf(e, t, r, n), s.bogus || (t.cache[o] = s)), {
          left: s.left,
          right: s.right,
          top: i ? s.rtop : s.top,
          bottom: i ? s.rbottom : s.bottom
        };
      }
      var jl = { left: 0, right: 0, top: 0, bottom: 0 };
      function Xl(e, t, r) {
        for (var n, i, o, s, u, c, h = 0; h < e.length; h += 3)
          if (u = e[h], c = e[h + 1], t < u ? (i = 0, o = 1, s = "left") : t < c ? (i = t - u, o = i + 1) : (h == e.length - 3 || t == c && e[h + 3] > t) && (o = c - u, i = o - 1, t >= c && (s = "right")), i != null) {
            if (n = e[h + 2], u == c && r == (n.insertLeft ? "left" : "right") && (s = r), r == "left" && i == 0)
              for (; h && e[h - 2] == e[h - 3] && e[h - 1].insertLeft; )
                n = e[(h -= 3) + 2], s = "left";
            if (r == "right" && i == c - u)
              for (; h < e.length - 3 && e[h + 3] == e[h + 4] && !e[h + 5].insertLeft; )
                n = e[(h += 3) + 2], s = "right";
            break;
          }
        return { node: n, start: i, end: o, collapse: s, coverStart: u, coverEnd: c };
      }
      function Cf(e, t) {
        var r = jl;
        if (t == "left")
          for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++)
            ;
        else
          for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--)
            ;
        return r;
      }
      function kf(e, t, r, n) {
        var i = Xl(t.map, r, n), o = i.node, s = i.start, u = i.end, c = i.collapse, h;
        if (o.nodeType == 3) {
          for (var y = 0; y < 4; y++) {
            for (; s && Mi(t.line.text.charAt(i.coverStart + s)); )
              --s;
            for (; i.coverStart + u < i.coverEnd && Mi(t.line.text.charAt(i.coverStart + u)); )
              ++u;
            if (S && L < 9 && s == 0 && u == i.coverEnd - i.coverStart ? h = o.parentNode.getBoundingClientRect() : h = Cf(ht(o, s, u).getClientRects(), n), h.left || h.right || s == 0)
              break;
            u = s, s = s - 1, c = "right";
          }
          S && L < 11 && (h = Lf(e.display.measure, h));
        } else {
          s > 0 && (c = n = "right");
          var b;
          e.options.lineWrapping && (b = o.getClientRects()).length > 1 ? h = b[n == "right" ? b.length - 1 : 0] : h = o.getBoundingClientRect();
        }
        if (S && L < 9 && !s && (!h || !h.left && !h.right)) {
          var k = o.parentNode.getClientRects()[0];
          k ? h = { left: k.left, right: k.left + hn(e.display), top: k.top, bottom: k.bottom } : h = jl;
        }
        for (var C = h.top - t.rect.top, F = h.bottom - t.rect.top, A = (C + F) / 2, M = t.view.measure.heights, N = 0; N < M.length - 1 && !(A < M[N]); N++)
          ;
        var I = N ? M[N - 1] : 0, O = M[N], P = {
          left: (c == "right" ? h.right : h.left) - t.rect.left,
          right: (c == "left" ? h.left : h.right) - t.rect.left,
          top: I,
          bottom: O
        };
        return !h.left && !h.right && (P.bogus = !0), e.options.singleCursorHeightPerLine || (P.rtop = C, P.rbottom = F), P;
      }
      function Lf(e, t) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !Ru(e))
          return t;
        var r = screen.logicalXDPI / screen.deviceXDPI, n = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: t.left * r,
          right: t.right * r,
          top: t.top * n,
          bottom: t.bottom * n
        };
      }
      function Yl(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
          for (var t = 0; t < e.rest.length; t++)
            e.measure.caches[t] = {};
      }
      function Ql(e) {
        e.display.externalMeasure = null, ct(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++)
          Yl(e.display.view[t]);
      }
      function Un(e) {
        Ql(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
      }
      function Zl(e) {
        return H && te ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft)) : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
      }
      function Jl(e) {
        return H && te ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop)) : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
      }
      function no(e) {
        var t = lt(e), r = t.widgets, n = 0;
        if (r)
          for (var i = 0; i < r.length; ++i)
            r[i].above && (n += zn(r[i]));
        return n;
      }
      function Rr(e, t, r, n, i) {
        if (!i) {
          var o = no(t);
          r.top += o, r.bottom += o;
        }
        if (n == "line")
          return r;
        n || (n = "local");
        var s = Ct(t);
        if (n == "local" ? s += Br(e.display) : s -= e.display.viewOffset, n == "page" || n == "window") {
          var u = e.display.lineSpace.getBoundingClientRect();
          s += u.top + (n == "window" ? 0 : Jl(ee(e)));
          var c = u.left + (n == "window" ? 0 : Zl(ee(e)));
          r.left += c, r.right += c;
        }
        return r.top += s, r.bottom += s, r;
      }
      function Vl(e, t, r) {
        if (r == "div")
          return t;
        var n = t.left, i = t.top;
        if (r == "page")
          n -= Zl(ee(e)), i -= Jl(ee(e));
        else if (r == "local" || !r) {
          var o = e.display.sizer.getBoundingClientRect();
          n += o.left, i += o.top;
        }
        var s = e.display.lineSpace.getBoundingClientRect();
        return { left: n - s.left, top: i - s.top };
      }
      function _r(e, t, r, n, i) {
        return n || (n = R(e.doc, t.line)), Rr(e, n, $l(e, n, t.ch, i), r);
      }
      function st(e, t, r, n, i, o) {
        n = n || R(e.doc, t.line), i || (i = fn(e, n));
        function s(F, A) {
          var M = yt(e, i, F, A ? "right" : "left", o);
          return A ? M.left = M.right : M.right = M.left, Rr(e, n, M, r);
        }
        var u = wt(n, e.doc.direction), c = t.ch, h = t.sticky;
        if (c >= n.text.length ? (c = n.text.length, h = "before") : c <= 0 && (c = 0, h = "after"), !u)
          return s(h == "before" ? c - 1 : c, h == "before");
        function y(F, A, M) {
          var N = u[A], I = N.level == 1;
          return s(M ? F - 1 : F, I != M);
        }
        var b = In(u, c, h), k = On, C = y(c, b, h == "before");
        return k != null && (C.other = y(c, k, h != "before")), C;
      }
      function es(e, t) {
        var r = 0;
        t = Q(e.doc, t), e.options.lineWrapping || (r = hn(e.display) * t.ch);
        var n = R(e.doc, t.line), i = Ct(n) + Br(e.display);
        return { left: r, right: r, top: i, bottom: i + n.height };
      }
      function ro(e, t, r, n, i) {
        var o = D(e, t, r);
        return o.xRel = i, n && (o.outside = n), o;
      }
      function io(e, t, r) {
        var n = e.doc;
        if (r += e.display.viewOffset, r < 0)
          return ro(n.first, 0, null, -1, -1);
        var i = $t(n, r), o = n.first + n.size - 1;
        if (i > o)
          return ro(n.first + n.size - 1, R(n, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var s = R(n, i); ; ) {
          var u = Tf(e, s, i, t, r), c = Vu(s, u.ch + (u.xRel > 0 || u.outside > 0 ? 1 : 0));
          if (!c)
            return u;
          var h = c.find(1);
          if (h.line == i)
            return h;
          s = R(n, i = h.line);
        }
      }
      function ts(e, t, r, n) {
        n -= no(t);
        var i = t.text.length, o = Nn(function(s) {
          return yt(e, r, s - 1).bottom <= n;
        }, i, 0);
        return i = Nn(function(s) {
          return yt(e, r, s).top > n;
        }, o, i), { begin: o, end: i };
      }
      function ns(e, t, r, n) {
        r || (r = fn(e, t));
        var i = Rr(e, t, yt(e, r, n), "line").top;
        return ts(e, t, r, i);
      }
      function oo(e, t, r, n) {
        return e.bottom <= r ? !1 : e.top > r ? !0 : (n ? e.left : e.right) > t;
      }
      function Tf(e, t, r, n, i) {
        i -= Ct(t);
        var o = fn(e, t), s = no(t), u = 0, c = t.text.length, h = !0, y = wt(t, e.doc.direction);
        if (y) {
          var b = (e.options.lineWrapping ? Af : Ff)(e, t, r, o, y, n, i);
          h = b.level != 1, u = h ? b.from : b.to - 1, c = h ? b.to : b.from - 1;
        }
        var k = null, C = null, F = Nn(function(z) {
          var _ = yt(e, o, z);
          return _.top += s, _.bottom += s, oo(_, n, i, !1) ? (_.top <= i && _.left <= n && (k = z, C = _), !0) : !1;
        }, u, c), A, M, N = !1;
        if (C) {
          var I = n - C.left < C.right - n, O = I == h;
          F = k + (O ? 0 : 1), M = O ? "after" : "before", A = I ? C.left : C.right;
        } else {
          !h && (F == c || F == u) && F++, M = F == 0 ? "after" : F == t.text.length ? "before" : yt(e, o, F - (h ? 1 : 0)).bottom + s <= i == h ? "after" : "before";
          var P = st(e, D(r, F, M), "line", t, o);
          A = P.left, N = i < P.top ? -1 : i >= P.bottom ? 1 : 0;
        }
        return F = hl(t.text, F, 1), ro(r, F, M, N, n - A);
      }
      function Ff(e, t, r, n, i, o, s) {
        var u = Nn(function(b) {
          var k = i[b], C = k.level != 1;
          return oo(st(
            e,
            D(r, C ? k.to : k.from, C ? "before" : "after"),
            "line",
            t,
            n
          ), o, s, !0);
        }, 0, i.length - 1), c = i[u];
        if (u > 0) {
          var h = c.level != 1, y = st(
            e,
            D(r, h ? c.from : c.to, h ? "after" : "before"),
            "line",
            t,
            n
          );
          oo(y, o, s, !0) && y.top > s && (c = i[u - 1]);
        }
        return c;
      }
      function Af(e, t, r, n, i, o, s) {
        var u = ts(e, t, n, s), c = u.begin, h = u.end;
        /\s/.test(t.text.charAt(h - 1)) && h--;
        for (var y = null, b = null, k = 0; k < i.length; k++) {
          var C = i[k];
          if (!(C.from >= h || C.to <= c)) {
            var F = C.level != 1, A = yt(e, n, F ? Math.min(h, C.to) - 1 : Math.max(c, C.from)).right, M = A < o ? o - A + 1e9 : A - o;
            (!y || b > M) && (y = C, b = M);
          }
        }
        return y || (y = i[i.length - 1]), y.from < c && (y = { from: c, to: y.to, level: y.level }), y.to > h && (y = { from: y.from, to: h, level: y.level }), y;
      }
      var Xt;
      function cn(e) {
        if (e.cachedTextHeight != null)
          return e.cachedTextHeight;
        if (Xt == null) {
          Xt = U("pre", null, "CodeMirror-line-like");
          for (var t = 0; t < 49; ++t)
            Xt.appendChild(document.createTextNode("x")), Xt.appendChild(U("br"));
          Xt.appendChild(document.createTextNode("x"));
        }
        Ue(e.measure, Xt);
        var r = Xt.offsetHeight / 50;
        return r > 3 && (e.cachedTextHeight = r), ct(e.measure), r || 1;
      }
      function hn(e) {
        if (e.cachedCharWidth != null)
          return e.cachedCharWidth;
        var t = U("span", "xxxxxxxxxx"), r = U("pre", [t], "CodeMirror-line-like");
        Ue(e.measure, r);
        var n = t.getBoundingClientRect(), i = (n.right - n.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10;
      }
      function lo(e) {
        for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, s = 0; o; o = o.nextSibling, ++s) {
          var u = e.display.gutterSpecs[s].className;
          r[u] = o.offsetLeft + o.clientLeft + i, n[u] = o.clientWidth;
        }
        return {
          fixedPos: so(t),
          gutterTotalWidth: t.gutters.offsetWidth,
          gutterLeft: r,
          gutterWidth: n,
          wrapperWidth: t.wrapper.clientWidth
        };
      }
      function so(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }
      function rs(e) {
        var t = cn(e.display), r = e.options.lineWrapping, n = r && Math.max(5, e.display.scroller.clientWidth / hn(e.display) - 3);
        return function(i) {
          if (Nt(e.doc, i))
            return 0;
          var o = 0;
          if (i.widgets)
            for (var s = 0; s < i.widgets.length; s++)
              i.widgets[s].height && (o += i.widgets[s].height);
          return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t;
        };
      }
      function ao(e) {
        var t = e.doc, r = rs(e);
        t.iter(function(n) {
          var i = r(n);
          i != n.height && pt(n, i);
        });
      }
      function Yt(e, t, r, n) {
        var i = e.display;
        if (!r && Oi(t).getAttribute("cm-not-content") == "true")
          return null;
        var o, s, u = i.lineSpace.getBoundingClientRect();
        try {
          o = t.clientX - u.left, s = t.clientY - u.top;
        } catch {
          return null;
        }
        var c = io(e, o, s), h;
        if (n && c.xRel > 0 && (h = R(e.doc, c.line).text).length == c.ch) {
          var y = ye(h, h.length, e.options.tabSize) - h.length;
          c = D(c.line, Math.max(0, Math.round((o - ql(e.display).left) / hn(e.display)) - y));
        }
        return c;
      }
      function Qt(e, t) {
        if (t >= e.display.viewTo || (t -= e.display.viewFrom, t < 0))
          return null;
        for (var r = e.display.view, n = 0; n < r.length; n++)
          if (t -= r[n].size, t < 0)
            return n;
      }
      function qe(e, t, r, n) {
        t == null && (t = e.doc.first), r == null && (r = e.doc.first + e.doc.size), n || (n = 0);
        var i = e.display;
        if (n && r < i.viewTo && (i.updateLineNumbers == null || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo)
          St && Yi(e.doc, t) < i.viewTo && It(e);
        else if (r <= i.viewFrom)
          St && Il(e.doc, r + n) > i.viewFrom ? It(e) : (i.viewFrom += n, i.viewTo += n);
        else if (t <= i.viewFrom && r >= i.viewTo)
          It(e);
        else if (t <= i.viewFrom) {
          var o = zr(e, r, r + n, 1);
          o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : It(e);
        } else if (r >= i.viewTo) {
          var s = zr(e, t, t, -1);
          s ? (i.view = i.view.slice(0, s.index), i.viewTo = s.lineN) : It(e);
        } else {
          var u = zr(e, t, t, -1), c = zr(e, r, r + n, 1);
          u && c ? (i.view = i.view.slice(0, u.index).concat(Wr(e, u.lineN, c.lineN)).concat(i.view.slice(c.index)), i.viewTo += n) : It(e);
        }
        var h = i.externalMeasured;
        h && (r < h.lineN ? h.lineN += n : t < h.lineN + h.size && (i.externalMeasured = null));
      }
      function Ot(e, t, r) {
        e.curOp.viewChanged = !0;
        var n = e.display, i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
          var o = n.view[Qt(e, t)];
          if (o.node != null) {
            var s = o.changes || (o.changes = []);
            re(s, r) == -1 && s.push(r);
          }
        }
      }
      function It(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }
      function zr(e, t, r, n) {
        var i = Qt(e, t), o, s = e.display.view;
        if (!St || r == e.doc.first + e.doc.size)
          return { index: i, lineN: r };
        for (var u = e.display.viewFrom, c = 0; c < i; c++)
          u += s[c].size;
        if (u != t) {
          if (n > 0) {
            if (i == s.length - 1)
              return null;
            o = u + s[i].size - t, i++;
          } else
            o = u - t;
          t += o, r += o;
        }
        for (; Yi(e.doc, r) != r; ) {
          if (i == (n < 0 ? 0 : s.length - 1))
            return null;
          r += n * s[i - (n < 0 ? 1 : 0)].size, i += n;
        }
        return { index: i, lineN: r };
      }
      function Df(e, t, r) {
        var n = e.display, i = n.view;
        i.length == 0 || t >= n.viewTo || r <= n.viewFrom ? (n.view = Wr(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = Wr(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(Qt(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(Wr(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, Qt(e, r)))), n.viewTo = r;
      }
      function is(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
          var i = t[n];
          !i.hidden && (!i.node || i.changes) && ++r;
        }
        return r;
      }
      function Gn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }
      function os(e, t) {
        t === void 0 && (t = !0);
        var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), s = e.options.$customCursor;
        s && (t = !0);
        for (var u = 0; u < r.sel.ranges.length; u++)
          if (!(!t && u == r.sel.primIndex)) {
            var c = r.sel.ranges[u];
            if (!(c.from().line >= e.display.viewTo || c.to().line < e.display.viewFrom)) {
              var h = c.empty();
              if (s) {
                var y = s(e, c);
                y && uo(e, y, i);
              } else
                (h || e.options.showCursorWhenSelecting) && uo(e, c.head, i);
              h || Mf(e, c, o);
            }
          }
        return n;
      }
      function uo(e, t, r) {
        var n = st(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = r.appendChild(U("div", "\xA0", "CodeMirror-cursor"));
        if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
          var o = _r(e, t, "div", null, null), s = o.right - o.left;
          i.style.width = (s > 0 ? s : e.defaultCharWidth()) + "px";
        }
        if (n.other) {
          var u = r.appendChild(U("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
          u.style.display = "", u.style.left = n.other.left + "px", u.style.top = n.other.top + "px", u.style.height = (n.other.bottom - n.other.top) * 0.85 + "px";
        }
      }
      function Ur(e, t) {
        return e.top - t.top || e.left - t.left;
      }
      function Mf(e, t, r) {
        var n = e.display, i = e.doc, o = document.createDocumentFragment(), s = ql(e.display), u = s.left, c = Math.max(n.sizerWidth, jt(e) - n.sizer.offsetLeft) - s.right, h = i.direction == "ltr";
        function y(O, P, z, _) {
          P < 0 && (P = 0), P = Math.round(P), _ = Math.round(_), o.appendChild(U("div", null, "CodeMirror-selected", "position: absolute; left: " + O + `px;
                             top: ` + P + "px; width: " + (z == null ? c - O : z) + `px;
                             height: ` + (_ - P) + "px"));
        }
        function b(O, P, z) {
          var _ = R(i, O), Z = _.text.length, ae, Me;
          function he(xe, je) {
            return _r(e, D(O, xe), "div", _, je);
          }
          function Je(xe, je, Ne) {
            var Ce = ns(e, _, null, xe), we = je == "ltr" == (Ne == "after") ? "left" : "right", pe = Ne == "after" ? Ce.begin : Ce.end - (/\s/.test(_.text.charAt(Ce.end - 1)) ? 2 : 1);
            return he(pe, we)[we];
          }
          var $e = wt(_, i.direction);
          return Nu($e, P || 0, z == null ? Z : z, function(xe, je, Ne, Ce) {
            var we = Ne == "ltr", pe = he(xe, we ? "left" : "right"), Xe = he(je - 1, we ? "right" : "left"), Ln = P == null && xe == 0, _t = z == null && je == Z, He = Ce == 0, mt = !$e || Ce == $e.length - 1;
            if (Xe.top - pe.top <= 3) {
              var Ee = (h ? Ln : _t) && He, Wo = (h ? _t : Ln) && mt, Ft = Ee ? u : (we ? pe : Xe).left, tn = Wo ? c : (we ? Xe : pe).right;
              y(Ft, pe.top, tn - Ft, pe.bottom);
            } else {
              var nn, Re, Tn, Bo;
              we ? (nn = h && Ln && He ? u : pe.left, Re = h ? c : Je(xe, Ne, "before"), Tn = h ? u : Je(je, Ne, "after"), Bo = h && _t && mt ? c : Xe.right) : (nn = h ? Je(xe, Ne, "before") : u, Re = !h && Ln && He ? c : pe.right, Tn = !h && _t && mt ? u : Xe.left, Bo = h ? Je(je, Ne, "after") : c), y(nn, pe.top, Re - nn, pe.bottom), pe.bottom < Xe.top && y(u, pe.bottom, null, Xe.top), y(Tn, Xe.top, Bo - Tn, Xe.bottom);
            }
            (!ae || Ur(pe, ae) < 0) && (ae = pe), Ur(Xe, ae) < 0 && (ae = Xe), (!Me || Ur(pe, Me) < 0) && (Me = pe), Ur(Xe, Me) < 0 && (Me = Xe);
          }), { start: ae, end: Me };
        }
        var k = t.from(), C = t.to();
        if (k.line == C.line)
          b(k.line, k.ch, C.ch);
        else {
          var F = R(i, k.line), A = R(i, C.line), M = lt(F) == lt(A), N = b(k.line, k.ch, M ? F.text.length + 1 : null).end, I = b(C.line, M ? 0 : null, C.ch).start;
          M && (N.top < I.top - 2 ? (y(N.right, N.top, null, N.bottom), y(u, I.top, I.left, I.bottom)) : y(N.right, N.top, I.left - N.right, N.bottom)), N.bottom < I.top && y(u, N.bottom, null, I.top);
        }
        r.appendChild(o);
      }
      function fo(e) {
        if (!!e.state.focused) {
          var t = e.display;
          clearInterval(t.blinker);
          var r = !0;
          t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
            e.hasFocus() || dn(e), t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }
      function ls(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || ho(e));
      }
      function co(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && dn(e));
        }, 100);
      }
      function ho(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), e.options.readOnly != "nocursor" && (e.state.focused || (me(e, "focus", e, t), e.state.focused = !0, W(e.display.wrapper, "CodeMirror-focused"), !e.curOp && e.display.selForContextMenu != e.doc.sel && (e.display.input.reset(), T && setTimeout(function() {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), fo(e));
      }
      function dn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (me(e, "blur", e, t), e.state.focused = !1, xt(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }
      function Gr(e) {
        for (var t = e.display, r = t.lineDiv.offsetTop, n = Math.max(0, t.scroller.getBoundingClientRect().top), i = t.lineDiv.getBoundingClientRect().top, o = 0, s = 0; s < t.view.length; s++) {
          var u = t.view[s], c = e.options.lineWrapping, h = void 0, y = 0;
          if (!u.hidden) {
            if (i += u.line.height, S && L < 8) {
              var b = u.node.offsetTop + u.node.offsetHeight;
              h = b - r, r = b;
            } else {
              var k = u.node.getBoundingClientRect();
              h = k.bottom - k.top, !c && u.text.firstChild && (y = u.text.firstChild.getBoundingClientRect().right - k.left - 1);
            }
            var C = u.line.height - h;
            if ((C > 5e-3 || C < -5e-3) && (i < n && (o -= C), pt(u.line, h), ss(u.line), u.rest))
              for (var F = 0; F < u.rest.length; F++)
                ss(u.rest[F]);
            if (y > e.display.sizerWidth) {
              var A = Math.ceil(y / hn(e.display));
              A > e.display.maxLineLength && (e.display.maxLineLength = A, e.display.maxLine = u.line, e.display.maxLineChanged = !0);
            }
          }
        }
        Math.abs(o) > 2 && (t.scroller.scrollTop += o);
      }
      function ss(e) {
        if (e.widgets)
          for (var t = 0; t < e.widgets.length; ++t) {
            var r = e.widgets[t], n = r.node.parentNode;
            n && (r.height = n.offsetHeight);
          }
      }
      function qr(e, t, r) {
        var n = r && r.top != null ? Math.max(0, r.top) : e.scroller.scrollTop;
        n = Math.floor(n - Br(e));
        var i = r && r.bottom != null ? r.bottom : n + e.wrapper.clientHeight, o = $t(t, n), s = $t(t, i);
        if (r && r.ensure) {
          var u = r.ensure.from.line, c = r.ensure.to.line;
          u < o ? (o = u, s = $t(t, Ct(R(t, u)) + e.wrapper.clientHeight)) : Math.min(c, t.lastLine()) >= s && (o = $t(t, Ct(R(t, c)) - e.wrapper.clientHeight), s = c);
        }
        return { from: o, to: Math.max(s, o + 1) };
      }
      function Ef(e, t) {
        if (!Te(e, "scrollCursorIntoView")) {
          var r = e.display, n = r.sizer.getBoundingClientRect(), i = null, o = r.wrapper.ownerDocument;
          if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (o.defaultView.innerHeight || o.documentElement.clientHeight) && (i = !1), i != null && !ue) {
            var s = U("div", "\u200B", null, `position: absolute;
                         top: ` + (t.top - r.viewOffset - Br(e.display)) + `px;
                         height: ` + (t.bottom - t.top + vt(e) + r.barHeight) + `px;
                         left: ` + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
            e.display.lineSpace.appendChild(s), s.scrollIntoView(i), e.display.lineSpace.removeChild(s);
          }
        }
      }
      function Nf(e, t, r, n) {
        n == null && (n = 0);
        var i;
        !e.options.lineWrapping && t == r && (r = t.sticky == "before" ? D(t.line, t.ch + 1, "before") : t, t = t.ch ? D(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after") : t);
        for (var o = 0; o < 5; o++) {
          var s = !1, u = st(e, t), c = !r || r == t ? u : st(e, r);
          i = {
            left: Math.min(u.left, c.left),
            top: Math.min(u.top, c.top) - n,
            right: Math.max(u.left, c.left),
            bottom: Math.max(u.bottom, c.bottom) + n
          };
          var h = po(e, i), y = e.doc.scrollTop, b = e.doc.scrollLeft;
          if (h.scrollTop != null && (Kn(e, h.scrollTop), Math.abs(e.doc.scrollTop - y) > 1 && (s = !0)), h.scrollLeft != null && (Zt(e, h.scrollLeft), Math.abs(e.doc.scrollLeft - b) > 1 && (s = !0)), !s)
            break;
        }
        return i;
      }
      function Of(e, t) {
        var r = po(e, t);
        r.scrollTop != null && Kn(e, r.scrollTop), r.scrollLeft != null && Zt(e, r.scrollLeft);
      }
      function po(e, t) {
        var r = e.display, n = cn(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && e.curOp.scrollTop != null ? e.curOp.scrollTop : r.scroller.scrollTop, o = eo(e), s = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var u = e.doc.height + Vi(r), c = t.top < n, h = t.bottom > u - n;
        if (t.top < i)
          s.scrollTop = c ? 0 : t.top;
        else if (t.bottom > i + o) {
          var y = Math.min(t.top, (h ? u : t.bottom) - o);
          y != i && (s.scrollTop = y);
        }
        var b = e.options.fixedGutter ? 0 : r.gutters.offsetWidth, k = e.curOp && e.curOp.scrollLeft != null ? e.curOp.scrollLeft : r.scroller.scrollLeft - b, C = jt(e) - r.gutters.offsetWidth, F = t.right - t.left > C;
        return F && (t.right = t.left + C), t.left < 10 ? s.scrollLeft = 0 : t.left < k ? s.scrollLeft = Math.max(0, t.left + b - (F ? 0 : 10)) : t.right > C + k - 3 && (s.scrollLeft = t.right + (F ? 0 : 10) - C), s;
      }
      function go(e, t) {
        t != null && (Kr(e), e.curOp.scrollTop = (e.curOp.scrollTop == null ? e.doc.scrollTop : e.curOp.scrollTop) + t);
      }
      function pn(e) {
        Kr(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin };
      }
      function qn(e, t, r) {
        (t != null || r != null) && Kr(e), t != null && (e.curOp.scrollLeft = t), r != null && (e.curOp.scrollTop = r);
      }
      function If(e, t) {
        Kr(e), e.curOp.scrollToPos = t;
      }
      function Kr(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
          e.curOp.scrollToPos = null;
          var r = es(e, t.from), n = es(e, t.to);
          as(e, r, n, t.margin);
        }
      }
      function as(e, t, r, n) {
        var i = po(e, {
          left: Math.min(t.left, r.left),
          top: Math.min(t.top, r.top) - n,
          right: Math.max(t.right, r.right),
          bottom: Math.max(t.bottom, r.bottom) + n
        });
        qn(e, i.scrollLeft, i.scrollTop);
      }
      function Kn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (p || yo(e, { top: t }), us(e, t, !0), p && yo(e), Xn(e, 100));
      }
      function us(e, t, r) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), !(e.display.scroller.scrollTop == t && !r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }
      function Zt(e, t, r, n) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), !((r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n) && (e.doc.scrollLeft = t, ps(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }
      function $n(e) {
        var t = e.display, r = t.gutters.offsetWidth, n = Math.round(e.doc.height + Vi(e.display));
        return {
          clientHeight: t.scroller.clientHeight,
          viewHeight: t.wrapper.clientHeight,
          scrollWidth: t.scroller.scrollWidth,
          clientWidth: t.scroller.clientWidth,
          viewWidth: t.wrapper.clientWidth,
          barLeft: e.options.fixedGutter ? r : 0,
          docHeight: n,
          scrollHeight: n + vt(e) + t.barHeight,
          nativeBarWidth: t.nativeBarWidth,
          gutterWidth: r
        };
      }
      var Jt = function(e, t, r) {
        this.cm = r;
        var n = this.vert = U("div", [U("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), i = this.horiz = U("div", [U("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        n.tabIndex = i.tabIndex = -1, e(n), e(i), q(n, "scroll", function() {
          n.clientHeight && t(n.scrollTop, "vertical");
        }), q(i, "scroll", function() {
          i.clientWidth && t(i.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = !1, S && L < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };
      Jt.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1, r = e.scrollHeight > e.clientHeight + 1, n = e.nativeBarWidth;
        if (r) {
          this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";
          var i = e.viewHeight - (t ? n : 0);
          this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else
          this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
          this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", this.horiz.style.left = e.barLeft + "px";
          var o = e.viewWidth - e.barLeft - (r ? n : 0);
          this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
        } else
          this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (n == 0 && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: r ? n : 0, bottom: t ? n : 0 };
      }, Jt.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, Jt.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, Jt.prototype.zeroWidthHack = function() {
        var e = ne && !de ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new Le(), this.disableVert = new Le();
      }, Jt.prototype.enableZeroWidthBar = function(e, t, r) {
        e.style.visibility = "";
        function n() {
          var i = e.getBoundingClientRect(), o = r == "vert" ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1);
          o != e ? e.style.visibility = "hidden" : t.set(1e3, n);
        }
        t.set(1e3, n);
      }, Jt.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
      };
      var jn = function() {
      };
      jn.prototype.update = function() {
        return { bottom: 0, right: 0 };
      }, jn.prototype.setScrollLeft = function() {
      }, jn.prototype.setScrollTop = function() {
      }, jn.prototype.clear = function() {
      };
      function gn(e, t) {
        t || (t = $n(e));
        var r = e.display.barWidth, n = e.display.barHeight;
        fs(e, t);
        for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++)
          r != e.display.barWidth && e.options.lineWrapping && Gr(e), fs(e, $n(e)), r = e.display.barWidth, n = e.display.barHeight;
      }
      function fs(e, t) {
        var r = e.display, n = r.scrollbars.update(t);
        r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = "";
      }
      var cs = { native: Jt, null: jn };
      function hs(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && xt(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new cs[e.options.scrollbarStyle](function(t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), q(t, "mousedown", function() {
            e.state.focused && setTimeout(function() {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function(t, r) {
          r == "horizontal" ? Zt(e, t) : Kn(e, t);
        }, e), e.display.scrollbars.addClass && W(e.display.wrapper, e.display.scrollbars.addClass);
      }
      var Hf = 0;
      function Vt(e) {
        e.curOp = {
          cm: e,
          viewChanged: !1,
          startHeight: e.doc.height,
          forceUpdate: !1,
          updateInput: 0,
          typing: !1,
          changeObjs: null,
          cursorActivityHandlers: null,
          cursorActivityCalled: 0,
          selectionChanged: !1,
          updateMaxLine: !1,
          scrollLeft: null,
          scrollTop: null,
          scrollToPos: null,
          focus: !1,
          id: ++Hf,
          markArrays: null
        }, hf(e.curOp);
      }
      function en(e) {
        var t = e.curOp;
        t && pf(t, function(r) {
          for (var n = 0; n < r.ops.length; n++)
            r.ops[n].cm.curOp = null;
          Pf(r);
        });
      }
      function Pf(e) {
        for (var t = e.ops, r = 0; r < t.length; r++)
          Wf(t[r]);
        for (var n = 0; n < t.length; n++)
          Bf(t[n]);
        for (var i = 0; i < t.length; i++)
          Rf(t[i]);
        for (var o = 0; o < t.length; o++)
          _f(t[o]);
        for (var s = 0; s < t.length; s++)
          zf(t[s]);
      }
      function Wf(e) {
        var t = e.cm, r = t.display;
        Gf(t), e.updateMaxLine && Zi(t), e.mustUpdate = e.viewChanged || e.forceUpdate || e.scrollTop != null || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new $r(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }
      function Bf(e) {
        e.updatedDisplay = e.mustUpdate && vo(e.cm, e.update);
      }
      function Rf(e) {
        var t = e.cm, r = t.display;
        e.updatedDisplay && Gr(t), e.barMeasure = $n(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = $l(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + vt(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - jt(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection());
      }
      function _f(e) {
        var t = e.cm;
        e.adjustWidthTo != null && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Zt(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var r = e.focus && e.focus == g(ee(t));
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && gn(t, e.barMeasure), e.updatedDisplay && bo(t, e.barMeasure), e.selectionChanged && fo(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && ls(e.cm);
      }
      function zf(e) {
        var t = e.cm, r = t.display, n = t.doc;
        if (e.updatedDisplay && ds(t, e.update), r.wheelStartX != null && (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) && (r.wheelStartX = r.wheelStartY = null), e.scrollTop != null && us(t, e.scrollTop, e.forceScroll), e.scrollLeft != null && Zt(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          var i = Nf(
            t,
            Q(n, e.scrollToPos.from),
            Q(n, e.scrollToPos.to),
            e.scrollToPos.margin
          );
          Ef(t, i);
        }
        var o = e.maybeHiddenMarkers, s = e.maybeUnhiddenMarkers;
        if (o)
          for (var u = 0; u < o.length; ++u)
            o[u].lines.length || me(o[u], "hide");
        if (s)
          for (var c = 0; c < s.length; ++c)
            s[c].lines.length && me(s[c], "unhide");
        r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && me(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }
      function Ze(e, t) {
        if (e.curOp)
          return t();
        Vt(e);
        try {
          return t();
        } finally {
          en(e);
        }
      }
      function Ae(e, t) {
        return function() {
          if (e.curOp)
            return t.apply(e, arguments);
          Vt(e);
          try {
            return t.apply(e, arguments);
          } finally {
            en(e);
          }
        };
      }
      function Be(e) {
        return function() {
          if (this.curOp)
            return e.apply(this, arguments);
          Vt(this);
          try {
            return e.apply(this, arguments);
          } finally {
            en(this);
          }
        };
      }
      function De(e) {
        return function() {
          var t = this.cm;
          if (!t || t.curOp)
            return e.apply(this, arguments);
          Vt(t);
          try {
            return e.apply(this, arguments);
          } finally {
            en(t);
          }
        };
      }
      function Xn(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, Qe(Uf, e));
      }
      function Uf(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
          var r = +new Date() + e.options.workTime, n = Wn(e, t.highlightFrontier), i = [];
          t.iter(n.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
            if (n.line >= e.display.viewFrom) {
              var s = o.styles, u = o.text.length > e.options.maxHighlightLength ? qt(t.mode, n.state) : null, c = xl(e, o, n, !0);
              u && (n.state = u), o.styles = c.styles;
              var h = o.styleClasses, y = c.classes;
              y ? o.styleClasses = y : h && (o.styleClasses = null);
              for (var b = !s || s.length != o.styles.length || h != y && (!h || !y || h.bgClass != y.bgClass || h.textClass != y.textClass), k = 0; !b && k < s.length; ++k)
                b = s[k] != o.styles[k];
              b && i.push(n.line), o.stateAfter = n.save(), n.nextLine();
            } else
              o.text.length <= e.options.maxHighlightLength && Ki(e, o.text, n), o.stateAfter = n.line % 5 == 0 ? n.save() : null, n.nextLine();
            if (+new Date() > r)
              return Xn(e, e.options.workDelay), !0;
          }), t.highlightFrontier = n.line, t.modeFrontier = Math.max(t.modeFrontier, n.line), i.length && Ze(e, function() {
            for (var o = 0; o < i.length; o++)
              Ot(e, i[o], "text");
          });
        }
      }
      var $r = function(e, t, r) {
        var n = e.display;
        this.viewport = t, this.visible = qr(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = jt(e), this.force = r, this.dims = lo(e), this.events = [];
      };
      $r.prototype.signal = function(e, t) {
        rt(e, t) && this.events.push(arguments);
      }, $r.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++)
          me.apply(null, this.events[e]);
      };
      function Gf(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = vt(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = vt(e) + "px", t.scrollbarsClipped = !0);
      }
      function qf(e) {
        if (e.hasFocus())
          return null;
        var t = g(ee(e));
        if (!t || !w(e.display.lineDiv, t))
          return null;
        var r = { activeElt: t };
        if (window.getSelection) {
          var n = Oe(e).getSelection();
          n.anchorNode && n.extend && w(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset);
        }
        return r;
      }
      function Kf(e) {
        if (!(!e || !e.activeElt || e.activeElt == g(e.activeElt.ownerDocument)) && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && w(document.body, e.anchorNode) && w(document.body, e.focusNode))) {
          var t = e.activeElt.ownerDocument, r = t.defaultView.getSelection(), n = t.createRange();
          n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), r.removeAllRanges(), r.addRange(n), r.extend(e.focusNode, e.focusOffset);
        }
      }
      function vo(e, t) {
        var r = e.display, n = e.doc;
        if (t.editorIsHidden)
          return It(e), !1;
        if (!t.force && t.visible.from >= r.viewFrom && t.visible.to <= r.viewTo && (r.updateLineNumbers == null || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && is(e) == 0)
          return !1;
        gs(e) && (It(e), t.dims = lo(e));
        var i = n.first + n.size, o = Math.max(t.visible.from - e.options.viewportMargin, n.first), s = Math.min(i, t.visible.to + e.options.viewportMargin);
        r.viewFrom < o && o - r.viewFrom < 20 && (o = Math.max(n.first, r.viewFrom)), r.viewTo > s && r.viewTo - s < 20 && (s = Math.min(i, r.viewTo)), St && (o = Yi(e.doc, o), s = Il(e.doc, s));
        var u = o != r.viewFrom || s != r.viewTo || r.lastWrapHeight != t.wrapperHeight || r.lastWrapWidth != t.wrapperWidth;
        Df(e, o, s), r.viewOffset = Ct(R(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
        var c = is(e);
        if (!u && c == 0 && !t.force && r.renderedView == r.view && (r.updateLineNumbers == null || r.updateLineNumbers >= r.viewTo))
          return !1;
        var h = qf(e);
        return c > 4 && (r.lineDiv.style.display = "none"), $f(e, r.updateLineNumbers, t.dims), c > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view, Kf(h), ct(r.cursorDiv), ct(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, u && (r.lastWrapHeight = t.wrapperHeight, r.lastWrapWidth = t.wrapperWidth, Xn(e, 400)), r.updateLineNumbers = null, !0;
      }
      function ds(e, t) {
        for (var r = t.viewport, n = !0; ; n = !1) {
          if (!n || !e.options.lineWrapping || t.oldDisplayWidth == jt(e)) {
            if (r && r.top != null && (r = { top: Math.min(e.doc.height + Vi(e.display) - eo(e), r.top) }), t.visible = qr(e.display, e.doc, r), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
              break;
          } else
            n && (t.visible = qr(e.display, e.doc, r));
          if (!vo(e, t))
            break;
          Gr(e);
          var i = $n(e);
          Gn(e), gn(e, i), bo(e, i), t.force = !1;
        }
        t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }
      function yo(e, t) {
        var r = new $r(e, t);
        if (vo(e, r)) {
          Gr(e), ds(e, r);
          var n = $n(e);
          Gn(e), gn(e, n), bo(e, n), r.finish();
        }
      }
      function $f(e, t, r) {
        var n = e.display, i = e.options.lineNumbers, o = n.lineDiv, s = o.firstChild;
        function u(F) {
          var A = F.nextSibling;
          return T && ne && e.display.currentWheelTarget == F ? F.style.display = "none" : F.parentNode.removeChild(F), A;
        }
        for (var c = n.view, h = n.viewFrom, y = 0; y < c.length; y++) {
          var b = c[y];
          if (!b.hidden)
            if (!b.node || b.node.parentNode != o) {
              var k = bf(e, b, h, r);
              o.insertBefore(k, s);
            } else {
              for (; s != b.node; )
                s = u(s);
              var C = i && t != null && t <= h && b.lineNumber;
              b.changes && (re(b.changes, "gutter") > -1 && (C = !1), Rl(e, b, h, r)), C && (ct(b.lineNumber), b.lineNumber.appendChild(document.createTextNode(Ui(e.options, h)))), s = b.node.nextSibling;
            }
          h += b.size;
        }
        for (; s; )
          s = u(s);
      }
      function mo(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px", Fe(e, "gutterChanged", e);
      }
      function bo(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + vt(e) + "px";
      }
      function ps(e) {
        var t = e.display, r = t.view;
        if (!(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))) {
          for (var n = so(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", s = 0; s < r.length; s++)
            if (!r[s].hidden) {
              e.options.fixedGutter && (r[s].gutter && (r[s].gutter.style.left = o), r[s].gutterBackground && (r[s].gutterBackground.style.left = o));
              var u = r[s].alignable;
              if (u)
                for (var c = 0; c < u.length; c++)
                  u[c].style.left = o;
            }
          e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
        }
      }
      function gs(e) {
        if (!e.options.lineNumbers)
          return !1;
        var t = e.doc, r = Ui(e.options, t.first + t.size - 1), n = e.display;
        if (r.length != n.lineNumChars) {
          var i = n.measure.appendChild(U(
            "div",
            [U("div", r)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          )), o = i.firstChild.offsetWidth, s = i.offsetWidth - o;
          return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - s) + 1, n.lineNumWidth = n.lineNumInnerWidth + s, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", mo(e.display), !0;
        }
        return !1;
      }
      function xo(e, t) {
        for (var r = [], n = !1, i = 0; i < e.length; i++) {
          var o = e[i], s = null;
          if (typeof o != "string" && (s = o.style, o = o.className), o == "CodeMirror-linenumbers")
            if (t)
              n = !0;
            else
              continue;
          r.push({ className: o, style: s });
        }
        return t && !n && r.push({ className: "CodeMirror-linenumbers", style: null }), r;
      }
      function vs(e) {
        var t = e.gutters, r = e.gutterSpecs;
        ct(t), e.lineGutter = null;
        for (var n = 0; n < r.length; ++n) {
          var i = r[n], o = i.className, s = i.style, u = t.appendChild(U("div", null, "CodeMirror-gutter " + o));
          s && (u.style.cssText = s), o == "CodeMirror-linenumbers" && (e.lineGutter = u, u.style.width = (e.lineNumWidth || 1) + "px");
        }
        t.style.display = r.length ? "" : "none", mo(e);
      }
      function Yn(e) {
        vs(e.display), qe(e), ps(e);
      }
      function jf(e, t, r, n) {
        var i = this;
        this.input = r, i.scrollbarFiller = U("div", null, "CodeMirror-scrollbar-filler"), i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = U("div", null, "CodeMirror-gutter-filler"), i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = Et("div", null, "CodeMirror-code"), i.selectionDiv = U("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = U("div", null, "CodeMirror-cursors"), i.measure = U("div", null, "CodeMirror-measure"), i.lineMeasure = U("div", null, "CodeMirror-measure"), i.lineSpace = Et(
          "div",
          [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var o = Et("div", [i.lineSpace], "CodeMirror-lines");
        i.mover = U("div", [o], null, "position: relative"), i.sizer = U("div", [i.mover], "CodeMirror-sizer"), i.sizerWidth = null, i.heightForcer = U("div", null, null, "position: absolute; height: " + Cr + "px; width: 1px;"), i.gutters = U("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = U("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"), i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = U("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"), H && X >= 105 && (i.wrapper.style.clipPath = "inset(0px)"), i.wrapper.setAttribute("translate", "no"), S && L < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0), !T && !(p && fe) && (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)), i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first, i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0, i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0, i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null, i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null, i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null, i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, i.gutterSpecs = xo(n.gutters, n.lineNumbers), vs(i), r.init(i);
      }
      var jr = 0, Lt = null;
      S ? Lt = -0.53 : p ? Lt = 15 : H ? Lt = -0.7 : V && (Lt = -1 / 3);
      function ys(e) {
        var t = e.wheelDeltaX, r = e.wheelDeltaY;
        return t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), r == null && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : r == null && (r = e.wheelDelta), { x: t, y: r };
      }
      function Xf(e) {
        var t = ys(e);
        return t.x *= Lt, t.y *= Lt, t;
      }
      function ms(e, t) {
        H && X == 102 && (e.display.chromeScrollHack == null ? e.display.sizer.style.pointerEvents = "none" : clearTimeout(e.display.chromeScrollHack), e.display.chromeScrollHack = setTimeout(function() {
          e.display.chromeScrollHack = null, e.display.sizer.style.pointerEvents = "";
        }, 100));
        var r = ys(t), n = r.x, i = r.y, o = Lt;
        t.deltaMode === 0 && (n = t.deltaX, i = t.deltaY, o = 1);
        var s = e.display, u = s.scroller, c = u.scrollWidth > u.clientWidth, h = u.scrollHeight > u.clientHeight;
        if (!!(n && c || i && h)) {
          if (i && ne && T) {
            e:
              for (var y = t.target, b = s.view; y != u; y = y.parentNode)
                for (var k = 0; k < b.length; k++)
                  if (b[k].node == y) {
                    e.display.currentWheelTarget = y;
                    break e;
                  }
          }
          if (n && !p && !$ && o != null) {
            i && h && Kn(e, Math.max(0, u.scrollTop + i * o)), Zt(e, Math.max(0, u.scrollLeft + n * o)), (!i || i && h) && Ge(t), s.wheelStartX = null;
            return;
          }
          if (i && o != null) {
            var C = i * o, F = e.doc.scrollTop, A = F + s.wrapper.clientHeight;
            C < 0 ? F = Math.max(0, F + C - 50) : A = Math.min(e.doc.height, A + C + 50), yo(e, { top: F, bottom: A });
          }
          jr < 20 && t.deltaMode !== 0 && (s.wheelStartX == null ? (s.wheelStartX = u.scrollLeft, s.wheelStartY = u.scrollTop, s.wheelDX = n, s.wheelDY = i, setTimeout(function() {
            if (s.wheelStartX != null) {
              var M = u.scrollLeft - s.wheelStartX, N = u.scrollTop - s.wheelStartY, I = N && s.wheelDY && N / s.wheelDY || M && s.wheelDX && M / s.wheelDX;
              s.wheelStartX = s.wheelStartY = null, I && (Lt = (Lt * jr + I) / (jr + 1), ++jr);
            }
          }, 200)) : (s.wheelDX += n, s.wheelDY += i));
        }
      }
      var tt = function(e, t) {
        this.ranges = e, this.primIndex = t;
      };
      tt.prototype.primary = function() {
        return this.ranges[this.primIndex];
      }, tt.prototype.equals = function(e) {
        if (e == this)
          return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
          return !1;
        for (var t = 0; t < this.ranges.length; t++) {
          var r = this.ranges[t], n = e.ranges[t];
          if (!Gi(r.anchor, n.anchor) || !Gi(r.head, n.head))
            return !1;
        }
        return !0;
      }, tt.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new ie(qi(this.ranges[t].anchor), qi(this.ranges[t].head));
        return new tt(e, this.primIndex);
      }, tt.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
          if (!this.ranges[e].empty())
            return !0;
        return !1;
      }, tt.prototype.contains = function(e, t) {
        t || (t = e);
        for (var r = 0; r < this.ranges.length; r++) {
          var n = this.ranges[r];
          if (Y(t, n.from()) >= 0 && Y(e, n.to()) <= 0)
            return r;
        }
        return -1;
      };
      var ie = function(e, t) {
        this.anchor = e, this.head = t;
      };
      ie.prototype.from = function() {
        return Mr(this.anchor, this.head);
      }, ie.prototype.to = function() {
        return Dr(this.anchor, this.head);
      }, ie.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function at(e, t, r) {
        var n = e && e.options.selectionsMayTouch, i = t[r];
        t.sort(function(k, C) {
          return Y(k.from(), C.from());
        }), r = re(t, i);
        for (var o = 1; o < t.length; o++) {
          var s = t[o], u = t[o - 1], c = Y(u.to(), s.from());
          if (n && !s.empty() ? c > 0 : c >= 0) {
            var h = Mr(u.from(), s.from()), y = Dr(u.to(), s.to()), b = u.empty() ? s.from() == s.head : u.from() == u.head;
            o <= r && --r, t.splice(--o, 2, new ie(b ? y : h, b ? h : y));
          }
        }
        return new tt(t, r);
      }
      function Ht(e, t) {
        return new tt([new ie(e, t || e)], 0);
      }
      function Pt(e) {
        return e.text ? D(
          e.from.line + e.text.length - 1,
          oe(e.text).length + (e.text.length == 1 ? e.from.ch : 0)
        ) : e.to;
      }
      function bs(e, t) {
        if (Y(e, t.from) < 0)
          return e;
        if (Y(e, t.to) <= 0)
          return Pt(t);
        var r = e.line + t.text.length - (t.to.line - t.from.line) - 1, n = e.ch;
        return e.line == t.to.line && (n += Pt(t).ch - t.to.ch), D(r, n);
      }
      function wo(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
          var i = e.sel.ranges[n];
          r.push(new ie(
            bs(i.anchor, t),
            bs(i.head, t)
          ));
        }
        return at(e.cm, r, e.sel.primIndex);
      }
      function xs(e, t, r) {
        return e.line == t.line ? D(r.line, e.ch - t.ch + r.ch) : D(r.line + (e.line - t.line), e.ch);
      }
      function Yf(e, t, r) {
        for (var n = [], i = D(e.first, 0), o = i, s = 0; s < t.length; s++) {
          var u = t[s], c = xs(u.from, i, o), h = xs(Pt(u), i, o);
          if (i = u.to, o = h, r == "around") {
            var y = e.sel.ranges[s], b = Y(y.head, y.anchor) < 0;
            n[s] = new ie(b ? h : c, b ? c : h);
          } else
            n[s] = new ie(c, c);
        }
        return new tt(n, e.sel.primIndex);
      }
      function So(e) {
        e.doc.mode = Ri(e.options, e.doc.modeOption), Qn(e);
      }
      function Qn(e) {
        e.doc.iter(function(t) {
          t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, Xn(e, 100), e.state.modeGen++, e.curOp && qe(e);
      }
      function ws(e, t) {
        return t.from.ch == 0 && t.to.ch == 0 && oe(t.text) == "" && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }
      function Co(e, t, r, n) {
        function i(I) {
          return r ? r[I] : null;
        }
        function o(I, O, P) {
          nf(I, O, P, n), Fe(I, "change", I, t);
        }
        function s(I, O) {
          for (var P = [], z = I; z < O; ++z)
            P.push(new an(h[z], i(z), n));
          return P;
        }
        var u = t.from, c = t.to, h = t.text, y = R(e, u.line), b = R(e, c.line), k = oe(h), C = i(h.length - 1), F = c.line - u.line;
        if (t.full)
          e.insert(0, s(0, h.length)), e.remove(h.length, e.size - h.length);
        else if (ws(e, t)) {
          var A = s(0, h.length - 1);
          o(b, b.text, C), F && e.remove(u.line, F), A.length && e.insert(u.line, A);
        } else if (y == b)
          if (h.length == 1)
            o(y, y.text.slice(0, u.ch) + k + y.text.slice(c.ch), C);
          else {
            var M = s(1, h.length - 1);
            M.push(new an(k + y.text.slice(c.ch), C, n)), o(y, y.text.slice(0, u.ch) + h[0], i(0)), e.insert(u.line + 1, M);
          }
        else if (h.length == 1)
          o(y, y.text.slice(0, u.ch) + h[0] + b.text.slice(c.ch), i(0)), e.remove(u.line + 1, F);
        else {
          o(y, y.text.slice(0, u.ch) + h[0], i(0)), o(b, k + b.text.slice(c.ch), C);
          var N = s(1, h.length - 1);
          F > 1 && e.remove(u.line + 1, F - 1), e.insert(u.line + 1, N);
        }
        Fe(e, "change", e, t);
      }
      function Wt(e, t, r) {
        function n(i, o, s) {
          if (i.linked)
            for (var u = 0; u < i.linked.length; ++u) {
              var c = i.linked[u];
              if (c.doc != o) {
                var h = s && c.sharedHist;
                r && !h || (t(c.doc, h), n(c.doc, i, h));
              }
            }
        }
        n(e, null, !0);
      }
      function Ss(e, t) {
        if (t.cm)
          throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, ao(e), So(e), Cs(e), e.options.direction = t.direction, e.options.lineWrapping || Zi(e), e.options.mode = t.modeOption, qe(e);
      }
      function Cs(e) {
        (e.doc.direction == "rtl" ? W : xt)(e.display.lineDiv, "CodeMirror-rtl");
      }
      function Qf(e) {
        Ze(e, function() {
          Cs(e), qe(e);
        });
      }
      function Xr(e) {
        this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1;
      }
      function ko(e, t) {
        var r = { from: qi(t.from), to: Pt(t), text: Kt(e, t.from, t.to) };
        return Ts(e, r, t.from.line, t.to.line + 1), Wt(e, function(n) {
          return Ts(n, r, t.from.line, t.to.line + 1);
        }, !0), r;
      }
      function ks(e) {
        for (; e.length; ) {
          var t = oe(e);
          if (t.ranges)
            e.pop();
          else
            break;
        }
      }
      function Zf(e, t) {
        if (t)
          return ks(e.done), oe(e.done);
        if (e.done.length && !oe(e.done).ranges)
          return oe(e.done);
        if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
          return e.done.pop(), oe(e.done);
      }
      function Ls(e, t, r, n) {
        var i = e.history;
        i.undone.length = 0;
        var o = +new Date(), s, u;
        if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && i.lastModTime > o - (e.cm ? e.cm.options.historyEventDelay : 500) || t.origin.charAt(0) == "*")) && (s = Zf(i, i.lastOp == n)))
          u = oe(s.changes), Y(t.from, t.to) == 0 && Y(t.from, u.to) == 0 ? u.to = Pt(t) : s.changes.push(ko(e, t));
        else {
          var c = oe(i.done);
          for ((!c || !c.ranges) && Yr(e.sel, i.done), s = {
            changes: [ko(e, t)],
            generation: i.generation
          }, i.done.push(s); i.done.length > i.undoDepth; )
            i.done.shift(), i.done[0].ranges || i.done.shift();
        }
        i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = o, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, u || me(e, "historyAdded");
      }
      function Jf(e, t, r, n) {
        var i = t.charAt(0);
        return i == "*" || i == "+" && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }
      function Vf(e, t, r, n) {
        var i = e.history, o = n && n.origin;
        r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || Jf(e, o, oe(i.done), t)) ? i.done[i.done.length - 1] = t : Yr(t, i.done), i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = r, n && n.clearRedo !== !1 && ks(i.undone);
      }
      function Yr(e, t) {
        var r = oe(t);
        r && r.ranges && r.equals(e) || t.push(e);
      }
      function Ts(e, t, r, n) {
        var i = t["spans_" + e.id], o = 0;
        e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function(s) {
          s.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = s.markedSpans), ++o;
        });
      }
      function ec(e) {
        if (!e)
          return null;
        for (var t, r = 0; r < e.length; ++r)
          e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
        return t ? t.length ? t : null : e;
      }
      function tc(e, t) {
        var r = t["spans_" + e.id];
        if (!r)
          return null;
        for (var n = [], i = 0; i < t.text.length; ++i)
          n.push(ec(r[i]));
        return n;
      }
      function Fs(e, t) {
        var r = tc(e, t), n = ji(e, t);
        if (!r)
          return n;
        if (!n)
          return r;
        for (var i = 0; i < r.length; ++i) {
          var o = r[i], s = n[i];
          if (o && s) {
            e:
              for (var u = 0; u < s.length; ++u) {
                for (var c = s[u], h = 0; h < o.length; ++h)
                  if (o[h].marker == c.marker)
                    continue e;
                o.push(c);
              }
          } else
            s && (r[i] = s);
        }
        return r;
      }
      function vn(e, t, r) {
        for (var n = [], i = 0; i < e.length; ++i) {
          var o = e[i];
          if (o.ranges) {
            n.push(r ? tt.prototype.deepCopy.call(o) : o);
            continue;
          }
          var s = o.changes, u = [];
          n.push({ changes: u });
          for (var c = 0; c < s.length; ++c) {
            var h = s[c], y = void 0;
            if (u.push({ from: h.from, to: h.to, text: h.text }), t)
              for (var b in h)
                (y = b.match(/^spans_(\d+)$/)) && re(t, Number(y[1])) > -1 && (oe(u)[b] = h[b], delete h[b]);
          }
        }
        return n;
      }
      function Lo(e, t, r, n) {
        if (n) {
          var i = e.anchor;
          if (r) {
            var o = Y(t, i) < 0;
            o != Y(r, i) < 0 ? (i = t, t = r) : o != Y(t, r) < 0 && (t = r);
          }
          return new ie(i, t);
        } else
          return new ie(r || t, t);
      }
      function Qr(e, t, r, n, i) {
        i == null && (i = e.cm && (e.cm.display.shift || e.extend)), Ie(e, new tt([Lo(e.sel.primary(), t, r, i)], 0), n);
      }
      function As(e, t, r) {
        for (var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++)
          n[o] = Lo(e.sel.ranges[o], t[o], null, i);
        var s = at(e.cm, n, e.sel.primIndex);
        Ie(e, s, r);
      }
      function To(e, t, r, n) {
        var i = e.sel.ranges.slice(0);
        i[t] = r, Ie(e, at(e.cm, i, e.sel.primIndex), n);
      }
      function Ds(e, t, r, n) {
        Ie(e, Ht(t, r), n);
      }
      function nc(e, t, r) {
        var n = {
          ranges: t.ranges,
          update: function(i) {
            this.ranges = [];
            for (var o = 0; o < i.length; o++)
              this.ranges[o] = new ie(
                Q(e, i[o].anchor),
                Q(e, i[o].head)
              );
          },
          origin: r && r.origin
        };
        return me(e, "beforeSelectionChange", e, n), e.cm && me(e.cm, "beforeSelectionChange", e.cm, n), n.ranges != t.ranges ? at(e.cm, n.ranges, n.ranges.length - 1) : t;
      }
      function Ms(e, t, r) {
        var n = e.history.done, i = oe(n);
        i && i.ranges ? (n[n.length - 1] = t, Zr(e, t, r)) : Ie(e, t, r);
      }
      function Ie(e, t, r) {
        Zr(e, t, r), Vf(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r);
      }
      function Zr(e, t, r) {
        (rt(e, "beforeSelectionChange") || e.cm && rt(e.cm, "beforeSelectionChange")) && (t = nc(e, t, r));
        var n = r && r.bias || (Y(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        Es(e, Os(e, t, n, !0)), !(r && r.scroll === !1) && e.cm && e.cm.getOption("readOnly") != "nocursor" && pn(e.cm);
      }
      function Es(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, pl(e.cm)), Fe(e, "cursorActivity", e));
      }
      function Ns(e) {
        Es(e, Os(e, e.sel, null, !1));
      }
      function Os(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
          var s = t.ranges[o], u = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], c = Jr(e, s.anchor, u && u.anchor, r, n), h = s.head == s.anchor ? c : Jr(e, s.head, u && u.head, r, n);
          (i || c != s.anchor || h != s.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new ie(c, h));
        }
        return i ? at(e.cm, i, t.primIndex) : t;
      }
      function yn(e, t, r, n, i) {
        var o = R(e, t.line);
        if (o.markedSpans)
          for (var s = 0; s < o.markedSpans.length; ++s) {
            var u = o.markedSpans[s], c = u.marker, h = "selectLeft" in c ? !c.selectLeft : c.inclusiveLeft, y = "selectRight" in c ? !c.selectRight : c.inclusiveRight;
            if ((u.from == null || (h ? u.from <= t.ch : u.from < t.ch)) && (u.to == null || (y ? u.to >= t.ch : u.to > t.ch))) {
              if (i && (me(c, "beforeCursorEnter"), c.explicitlyCleared))
                if (o.markedSpans) {
                  --s;
                  continue;
                } else
                  break;
              if (!c.atomic)
                continue;
              if (r) {
                var b = c.find(n < 0 ? 1 : -1), k = void 0;
                if ((n < 0 ? y : h) && (b = Is(e, b, -n, b && b.line == t.line ? o : null)), b && b.line == t.line && (k = Y(b, r)) && (n < 0 ? k < 0 : k > 0))
                  return yn(e, b, t, n, i);
              }
              var C = c.find(n < 0 ? -1 : 1);
              return (n < 0 ? h : y) && (C = Is(e, C, n, C.line == t.line ? o : null)), C ? yn(e, C, t, n, i) : null;
            }
          }
        return t;
      }
      function Jr(e, t, r, n, i) {
        var o = n || 1, s = yn(e, t, r, o, i) || !i && yn(e, t, r, o, !0) || yn(e, t, r, -o, i) || !i && yn(e, t, r, -o, !0);
        return s || (e.cantEdit = !0, D(e.first, 0));
      }
      function Is(e, t, r, n) {
        return r < 0 && t.ch == 0 ? t.line > e.first ? Q(e, D(t.line - 1)) : null : r > 0 && t.ch == (n || R(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? D(t.line + 1, 0) : null : new D(t.line, t.ch + r);
      }
      function Hs(e) {
        e.setSelection(D(e.firstLine(), 0), D(e.lastLine()), dt);
      }
      function Ps(e, t, r) {
        var n = {
          canceled: !1,
          from: t.from,
          to: t.to,
          text: t.text,
          origin: t.origin,
          cancel: function() {
            return n.canceled = !0;
          }
        };
        return r && (n.update = function(i, o, s, u) {
          i && (n.from = Q(e, i)), o && (n.to = Q(e, o)), s && (n.text = s), u !== void 0 && (n.origin = u);
        }), me(e, "beforeChange", e, n), e.cm && me(e.cm, "beforeChange", e.cm, n), n.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : { from: n.from, to: n.to, text: n.text, origin: n.origin };
      }
      function mn(e, t, r) {
        if (e.cm) {
          if (!e.cm.curOp)
            return Ae(e.cm, mn)(e, t, r);
          if (e.cm.state.suppressEdits)
            return;
        }
        if (!((rt(e, "beforeChange") || e.cm && rt(e.cm, "beforeChange")) && (t = Ps(e, t, !0), !t))) {
          var n = Fl && !r && Ju(e, t.from, t.to);
          if (n)
            for (var i = n.length - 1; i >= 0; --i)
              Ws(e, { from: n[i].from, to: n[i].to, text: i ? [""] : t.text, origin: t.origin });
          else
            Ws(e, t);
        }
      }
      function Ws(e, t) {
        if (!(t.text.length == 1 && t.text[0] == "" && Y(t.from, t.to) == 0)) {
          var r = wo(e, t);
          Ls(e, t, r, e.cm ? e.cm.curOp.id : NaN), Zn(e, t, r, ji(e, t));
          var n = [];
          Wt(e, function(i, o) {
            !o && re(n, i.history) == -1 && (zs(i.history, t), n.push(i.history)), Zn(i, t, null, ji(i, t));
          });
        }
      }
      function Vr(e, t, r) {
        var n = e.cm && e.cm.state.suppressEdits;
        if (!(n && !r)) {
          for (var i = e.history, o, s = e.sel, u = t == "undo" ? i.done : i.undone, c = t == "undo" ? i.undone : i.done, h = 0; h < u.length && (o = u[h], !(r ? o.ranges && !o.equals(e.sel) : !o.ranges)); h++)
            ;
          if (h != u.length) {
            for (i.lastOrigin = i.lastSelOrigin = null; ; )
              if (o = u.pop(), o.ranges) {
                if (Yr(o, c), r && !o.equals(e.sel)) {
                  Ie(e, o, { clearRedo: !1 });
                  return;
                }
                s = o;
              } else if (n) {
                u.push(o);
                return;
              } else
                break;
            var y = [];
            Yr(s, c), c.push({ changes: y, generation: i.generation }), i.generation = o.generation || ++i.maxGeneration;
            for (var b = rt(e, "beforeChange") || e.cm && rt(e.cm, "beforeChange"), k = function(A) {
              var M = o.changes[A];
              if (M.origin = t, b && !Ps(e, M, !1))
                return u.length = 0, {};
              y.push(ko(e, M));
              var N = A ? wo(e, M) : oe(u);
              Zn(e, M, N, Fs(e, M)), !A && e.cm && e.cm.scrollIntoView({ from: M.from, to: Pt(M) });
              var I = [];
              Wt(e, function(O, P) {
                !P && re(I, O.history) == -1 && (zs(O.history, M), I.push(O.history)), Zn(O, M, null, Fs(O, M));
              });
            }, C = o.changes.length - 1; C >= 0; --C) {
              var F = k(C);
              if (F)
                return F.v;
            }
          }
        }
      }
      function Bs(e, t) {
        if (t != 0 && (e.first += t, e.sel = new tt(Tr(e.sel.ranges, function(i) {
          return new ie(
            D(i.anchor.line + t, i.anchor.ch),
            D(i.head.line + t, i.head.ch)
          );
        }), e.sel.primIndex), e.cm)) {
          qe(e.cm, e.first, e.first - t, t);
          for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++)
            Ot(e.cm, n, "gutter");
        }
      }
      function Zn(e, t, r, n) {
        if (e.cm && !e.cm.curOp)
          return Ae(e.cm, Zn)(e, t, r, n);
        if (t.to.line < e.first) {
          Bs(e, t.text.length - 1 - (t.to.line - t.from.line));
          return;
        }
        if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var i = t.text.length - 1 - (e.first - t.from.line);
            Bs(e, i), t = {
              from: D(e.first, 0),
              to: D(t.to.line + i, t.to.ch),
              text: [oe(t.text)],
              origin: t.origin
            };
          }
          var o = e.lastLine();
          t.to.line > o && (t = {
            from: t.from,
            to: D(o, R(e, o).text.length),
            text: [t.text[0]],
            origin: t.origin
          }), t.removed = Kt(e, t.from, t.to), r || (r = wo(e, t)), e.cm ? rc(e.cm, t, n) : Co(e, t, n), Zr(e, r, dt), e.cantEdit && Jr(e, D(e.firstLine(), 0)) && (e.cantEdit = !1);
        }
      }
      function rc(e, t, r) {
        var n = e.doc, i = e.display, o = t.from, s = t.to, u = !1, c = o.line;
        e.options.lineWrapping || (c = le(lt(R(n, o.line))), n.iter(c, s.line + 1, function(C) {
          if (C == i.maxLine)
            return u = !0, !0;
        })), n.sel.contains(t.from, t.to) > -1 && pl(e), Co(n, t, r, rs(e)), e.options.lineWrapping || (n.iter(c, o.line + t.text.length, function(C) {
          var F = Pr(C);
          F > i.maxLineLength && (i.maxLine = C, i.maxLineLength = F, i.maxLineChanged = !0, u = !1);
        }), u && (e.curOp.updateMaxLine = !0)), Ku(n, o.line), Xn(e, 400);
        var h = t.text.length - (s.line - o.line) - 1;
        t.full ? qe(e) : o.line == s.line && t.text.length == 1 && !ws(e.doc, t) ? Ot(e, o.line, "text") : qe(e, o.line, s.line + 1, h);
        var y = rt(e, "changes"), b = rt(e, "change");
        if (b || y) {
          var k = {
            from: o,
            to: s,
            text: t.text,
            removed: t.removed,
            origin: t.origin
          };
          b && Fe(e, "change", e, k), y && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(k);
        }
        e.display.selForContextMenu = null;
      }
      function bn(e, t, r, n, i) {
        var o;
        n || (n = r), Y(n, r) < 0 && (o = [n, r], r = o[0], n = o[1]), typeof t == "string" && (t = e.splitLines(t)), mn(e, { from: r, to: n, text: t, origin: i });
      }
      function Rs(e, t, r, n) {
        r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0);
      }
      function _s(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
          var o = e[i], s = !0;
          if (o.ranges) {
            o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
            for (var u = 0; u < o.ranges.length; u++)
              Rs(o.ranges[u].anchor, t, r, n), Rs(o.ranges[u].head, t, r, n);
            continue;
          }
          for (var c = 0; c < o.changes.length; ++c) {
            var h = o.changes[c];
            if (r < h.from.line)
              h.from = D(h.from.line + n, h.from.ch), h.to = D(h.to.line + n, h.to.ch);
            else if (t <= h.to.line) {
              s = !1;
              break;
            }
          }
          s || (e.splice(0, i + 1), i = 0);
        }
      }
      function zs(e, t) {
        var r = t.from.line, n = t.to.line, i = t.text.length - (n - r) - 1;
        _s(e.done, r, n, i), _s(e.undone, r, n, i);
      }
      function Jn(e, t, r, n) {
        var i = t, o = t;
        return typeof t == "number" ? o = R(e, ml(e, t)) : i = le(t), i == null ? null : (n(o, i) && e.cm && Ot(e.cm, i, r), o);
      }
      function Vn(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, r = 0; r < e.length; ++r)
          e[r].parent = this, t += e[r].height;
        this.height = t;
      }
      Vn.prototype = {
        chunkSize: function() {
          return this.lines.length;
        },
        removeInner: function(e, t) {
          for (var r = e, n = e + t; r < n; ++r) {
            var i = this.lines[r];
            this.height -= i.height, rf(i), Fe(i, "delete");
          }
          this.lines.splice(e, t);
        },
        collapse: function(e) {
          e.push.apply(e, this.lines);
        },
        insertInner: function(e, t, r) {
          this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
          for (var n = 0; n < t.length; ++n)
            t[n].parent = this;
        },
        iterN: function(e, t, r) {
          for (var n = e + t; e < n; ++e)
            if (r(this.lines[e]))
              return !0;
        }
      };
      function er(e) {
        this.children = e;
        for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
          var i = e[n];
          t += i.chunkSize(), r += i.height, i.parent = this;
        }
        this.size = t, this.height = r, this.parent = null;
      }
      er.prototype = {
        chunkSize: function() {
          return this.size;
        },
        removeInner: function(e, t) {
          this.size -= t;
          for (var r = 0; r < this.children.length; ++r) {
            var n = this.children[r], i = n.chunkSize();
            if (e < i) {
              var o = Math.min(t, i - e), s = n.height;
              if (n.removeInner(e, o), this.height -= s - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), (t -= o) == 0)
                break;
              e = 0;
            } else
              e -= i;
          }
          if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Vn))) {
            var u = [];
            this.collapse(u), this.children = [new Vn(u)], this.children[0].parent = this;
          }
        },
        collapse: function(e) {
          for (var t = 0; t < this.children.length; ++t)
            this.children[t].collapse(e);
        },
        insertInner: function(e, t, r) {
          this.size += t.length, this.height += r;
          for (var n = 0; n < this.children.length; ++n) {
            var i = this.children[n], o = i.chunkSize();
            if (e <= o) {
              if (i.insertInner(e, t, r), i.lines && i.lines.length > 50) {
                for (var s = i.lines.length % 25 + 25, u = s; u < i.lines.length; ) {
                  var c = new Vn(i.lines.slice(u, u += 25));
                  i.height -= c.height, this.children.splice(++n, 0, c), c.parent = this;
                }
                i.lines = i.lines.slice(0, s), this.maybeSpill();
              }
              break;
            }
            e -= o;
          }
        },
        maybeSpill: function() {
          if (!(this.children.length <= 10)) {
            var e = this;
            do {
              var t = e.children.splice(e.children.length - 5, 5), r = new er(t);
              if (e.parent) {
                e.size -= r.size, e.height -= r.height;
                var i = re(e.parent.children, e);
                e.parent.children.splice(i + 1, 0, r);
              } else {
                var n = new er(e.children);
                n.parent = e, e.children = [n, r], e = n;
              }
              r.parent = e.parent;
            } while (e.children.length > 10);
            e.parent.maybeSpill();
          }
        },
        iterN: function(e, t, r) {
          for (var n = 0; n < this.children.length; ++n) {
            var i = this.children[n], o = i.chunkSize();
            if (e < o) {
              var s = Math.min(t, o - e);
              if (i.iterN(e, s, r))
                return !0;
              if ((t -= s) == 0)
                break;
              e = 0;
            } else
              e -= o;
          }
        }
      };
      var tr = function(e, t, r) {
        if (r)
          for (var n in r)
            r.hasOwnProperty(n) && (this[n] = r[n]);
        this.doc = e, this.node = t;
      };
      tr.prototype.clear = function() {
        var e = this.doc.cm, t = this.line.widgets, r = this.line, n = le(r);
        if (!(n == null || !t)) {
          for (var i = 0; i < t.length; ++i)
            t[i] == this && t.splice(i--, 1);
          t.length || (r.widgets = null);
          var o = zn(this);
          pt(r, Math.max(0, r.height - o)), e && (Ze(e, function() {
            Us(e, r, -o), Ot(e, n, "widget");
          }), Fe(e, "lineWidgetCleared", e, this, n));
        }
      }, tr.prototype.changed = function() {
        var e = this, t = this.height, r = this.doc.cm, n = this.line;
        this.height = null;
        var i = zn(this) - t;
        !i || (Nt(this.doc, n) || pt(n, n.height + i), r && Ze(r, function() {
          r.curOp.forceUpdate = !0, Us(r, n, i), Fe(r, "lineWidgetChanged", r, e, le(n));
        }));
      }, on(tr);
      function Us(e, t, r) {
        Ct(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && go(e, r);
      }
      function ic(e, t, r, n) {
        var i = new tr(e, r, n), o = e.cm;
        return o && i.noHScroll && (o.display.alignWidgets = !0), Jn(e, t, "widget", function(s) {
          var u = s.widgets || (s.widgets = []);
          if (i.insertAt == null ? u.push(i) : u.splice(Math.min(u.length, Math.max(0, i.insertAt)), 0, i), i.line = s, o && !Nt(e, s)) {
            var c = Ct(s) < e.scrollTop;
            pt(s, s.height + zn(i)), c && go(o, i.height), o.curOp.forceUpdate = !0;
          }
          return !0;
        }), o && Fe(o, "lineWidgetAdded", o, i, typeof t == "number" ? t : le(t)), i;
      }
      var Gs = 0, Bt = function(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++Gs;
      };
      Bt.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          var e = this.doc.cm, t = e && !e.curOp;
          if (t && Vt(e), rt(this, "clear")) {
            var r = this.find();
            r && Fe(this, "clear", r.from, r.to);
          }
          for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
            var s = this.lines[o], u = Bn(s.markedSpans, this);
            e && !this.collapsed ? Ot(e, le(s), "text") : e && (u.to != null && (i = le(s)), u.from != null && (n = le(s))), s.markedSpans = Xu(s.markedSpans, u), u.from == null && this.collapsed && !Nt(this.doc, s) && e && pt(s, cn(e.display));
          }
          if (e && this.collapsed && !e.options.lineWrapping)
            for (var c = 0; c < this.lines.length; ++c) {
              var h = lt(this.lines[c]), y = Pr(h);
              y > e.display.maxLineLength && (e.display.maxLine = h, e.display.maxLineLength = y, e.display.maxLineChanged = !0);
            }
          n != null && e && this.collapsed && qe(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ns(e.doc)), e && Fe(e, "markerCleared", e, this, n, i), t && en(e), this.parent && this.parent.clear();
        }
      }, Bt.prototype.find = function(e, t) {
        e == null && this.type == "bookmark" && (e = 1);
        for (var r, n, i = 0; i < this.lines.length; ++i) {
          var o = this.lines[i], s = Bn(o.markedSpans, this);
          if (s.from != null && (r = D(t ? o : le(o), s.from), e == -1))
            return r;
          if (s.to != null && (n = D(t ? o : le(o), s.to), e == 1))
            return n;
        }
        return r && { from: r, to: n };
      }, Bt.prototype.changed = function() {
        var e = this, t = this.find(-1, !0), r = this, n = this.doc.cm;
        !t || !n || Ze(n, function() {
          var i = t.line, o = le(t.line), s = to(n, o);
          if (s && (Yl(s), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !Nt(r.doc, i) && r.height != null) {
            var u = r.height;
            r.height = null;
            var c = zn(r) - u;
            c && pt(i, i.height + c);
          }
          Fe(n, "markerChanged", n, e);
        });
      }, Bt.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (!t.maybeHiddenMarkers || re(t.maybeHiddenMarkers, this) == -1) && (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(e);
      }, Bt.prototype.detachLine = function(e) {
        if (this.lines.splice(re(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, on(Bt);
      function xn(e, t, r, n, i) {
        if (n && n.shared)
          return oc(e, t, r, n, i);
        if (e.cm && !e.cm.curOp)
          return Ae(e.cm, xn)(e, t, r, n, i);
        var o = new Bt(e, i), s = Y(t, r);
        if (n && We(n, o, !1), s > 0 || s == 0 && o.clearWhenEmpty !== !1)
          return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = Et("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
          if (Ol(e, t.line, t, r, o) || t.line != r.line && Ol(e, r.line, t, r, o))
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          ju();
        }
        o.addToHistory && Ls(e, { from: t, to: r, origin: "markText" }, e.sel, NaN);
        var u = t.line, c = e.cm, h;
        if (e.iter(u, r.line + 1, function(b) {
          c && o.collapsed && !c.options.lineWrapping && lt(b) == c.display.maxLine && (h = !0), o.collapsed && u != t.line && pt(b, 0), Yu(b, new Nr(
            o,
            u == t.line ? t.ch : null,
            u == r.line ? r.ch : null
          ), e.cm && e.cm.curOp), ++u;
        }), o.collapsed && e.iter(t.line, r.line + 1, function(b) {
          Nt(e, b) && pt(b, 0);
        }), o.clearOnEnter && q(o, "beforeCursorEnter", function() {
          return o.clear();
        }), o.readOnly && ($u(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++Gs, o.atomic = !0), c) {
          if (h && (c.curOp.updateMaxLine = !0), o.collapsed)
            qe(c, t.line, r.line + 1);
          else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
            for (var y = t.line; y <= r.line; y++)
              Ot(c, y, "text");
          o.atomic && Ns(c.doc), Fe(c, "markerAdded", c, o);
        }
        return o;
      }
      var nr = function(e, t) {
        this.markers = e, this.primary = t;
        for (var r = 0; r < e.length; ++r)
          e[r].parent = this;
      };
      nr.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          this.explicitlyCleared = !0;
          for (var e = 0; e < this.markers.length; ++e)
            this.markers[e].clear();
          Fe(this, "clear");
        }
      }, nr.prototype.find = function(e, t) {
        return this.primary.find(e, t);
      }, on(nr);
      function oc(e, t, r, n, i) {
        n = We(n), n.shared = !1;
        var o = [xn(e, t, r, n, i)], s = o[0], u = n.widgetNode;
        return Wt(e, function(c) {
          u && (n.widgetNode = u.cloneNode(!0)), o.push(xn(c, Q(c, t), Q(c, r), n, i));
          for (var h = 0; h < c.linked.length; ++h)
            if (c.linked[h].isParent)
              return;
          s = oe(o);
        }), new nr(o, s);
      }
      function qs(e) {
        return e.findMarks(D(e.first, 0), e.clipPos(D(e.lastLine())), function(t) {
          return t.parent;
        });
      }
      function lc(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r], i = n.find(), o = e.clipPos(i.from), s = e.clipPos(i.to);
          if (Y(o, s)) {
            var u = xn(e, o, s, n.primary, n.primary.type);
            n.markers.push(u), u.parent = n;
          }
        }
      }
      function sc(e) {
        for (var t = function(n) {
          var i = e[n], o = [i.primary.doc];
          Wt(i.primary.doc, function(c) {
            return o.push(c);
          });
          for (var s = 0; s < i.markers.length; s++) {
            var u = i.markers[s];
            re(o, u.doc) == -1 && (u.parent = null, i.markers.splice(s--, 1));
          }
        }, r = 0; r < e.length; r++)
          t(r);
      }
      var ac = 0, Ke = function(e, t, r, n, i) {
        if (!(this instanceof Ke))
          return new Ke(e, t, r, n, i);
        r == null && (r = 0), er.call(this, [new Vn([new an("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r;
        var o = D(r, 0);
        this.sel = Ht(o), this.history = new Xr(null), this.id = ++ac, this.modeOption = t, this.lineSep = n, this.direction = i == "rtl" ? "rtl" : "ltr", this.extend = !1, typeof e == "string" && (e = this.splitLines(e)), Co(this, { from: o, to: o, text: e }), Ie(this, Ht(o), dt);
      };
      Ke.prototype = fl(er.prototype, {
        constructor: Ke,
        iter: function(e, t, r) {
          r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e);
        },
        insert: function(e, t) {
          for (var r = 0, n = 0; n < t.length; ++n)
            r += t[n].height;
          this.insertInner(e - this.first, t, r);
        },
        remove: function(e, t) {
          this.removeInner(e - this.first, t);
        },
        getValue: function(e) {
          var t = zi(this, this.first, this.first + this.size);
          return e === !1 ? t : t.join(e || this.lineSeparator());
        },
        setValue: De(function(e) {
          var t = D(this.first, 0), r = this.first + this.size - 1;
          mn(this, {
            from: t,
            to: D(r, R(this, r).text.length),
            text: this.splitLines(e),
            origin: "setValue",
            full: !0
          }, !0), this.cm && qn(this.cm, 0, 0), Ie(this, Ht(t), dt);
        }),
        replaceRange: function(e, t, r, n) {
          t = Q(this, t), r = r ? Q(this, r) : t, bn(this, e, t, r, n);
        },
        getRange: function(e, t, r) {
          var n = Kt(this, Q(this, e), Q(this, t));
          return r === !1 ? n : r === "" ? n.join("") : n.join(r || this.lineSeparator());
        },
        getLine: function(e) {
          var t = this.getLineHandle(e);
          return t && t.text;
        },
        getLineHandle: function(e) {
          if (Pn(this, e))
            return R(this, e);
        },
        getLineNumber: function(e) {
          return le(e);
        },
        getLineHandleVisualStart: function(e) {
          return typeof e == "number" && (e = R(this, e)), lt(e);
        },
        lineCount: function() {
          return this.size;
        },
        firstLine: function() {
          return this.first;
        },
        lastLine: function() {
          return this.first + this.size - 1;
        },
        clipPos: function(e) {
          return Q(this, e);
        },
        getCursor: function(e) {
          var t = this.sel.primary(), r;
          return e == null || e == "head" ? r = t.head : e == "anchor" ? r = t.anchor : e == "end" || e == "to" || e === !1 ? r = t.to() : r = t.from(), r;
        },
        listSelections: function() {
          return this.sel.ranges;
        },
        somethingSelected: function() {
          return this.sel.somethingSelected();
        },
        setCursor: De(function(e, t, r) {
          Ds(this, Q(this, typeof e == "number" ? D(e, t || 0) : e), null, r);
        }),
        setSelection: De(function(e, t, r) {
          Ds(this, Q(this, e), Q(this, t || e), r);
        }),
        extendSelection: De(function(e, t, r) {
          Qr(this, Q(this, e), t && Q(this, t), r);
        }),
        extendSelections: De(function(e, t) {
          As(this, bl(this, e), t);
        }),
        extendSelectionsBy: De(function(e, t) {
          var r = Tr(this.sel.ranges, e);
          As(this, bl(this, r), t);
        }),
        setSelections: De(function(e, t, r) {
          if (!!e.length) {
            for (var n = [], i = 0; i < e.length; i++)
              n[i] = new ie(
                Q(this, e[i].anchor),
                Q(this, e[i].head || e[i].anchor)
              );
            t == null && (t = Math.min(e.length - 1, this.sel.primIndex)), Ie(this, at(this.cm, n, t), r);
          }
        }),
        addSelection: De(function(e, t, r) {
          var n = this.sel.ranges.slice(0);
          n.push(new ie(Q(this, e), Q(this, t || e))), Ie(this, at(this.cm, n, n.length - 1), r);
        }),
        getSelection: function(e) {
          for (var t = this.sel.ranges, r, n = 0; n < t.length; n++) {
            var i = Kt(this, t[n].from(), t[n].to());
            r = r ? r.concat(i) : i;
          }
          return e === !1 ? r : r.join(e || this.lineSeparator());
        },
        getSelections: function(e) {
          for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
            var i = Kt(this, r[n].from(), r[n].to());
            e !== !1 && (i = i.join(e || this.lineSeparator())), t[n] = i;
          }
          return t;
        },
        replaceSelection: function(e, t, r) {
          for (var n = [], i = 0; i < this.sel.ranges.length; i++)
            n[i] = e;
          this.replaceSelections(n, t, r || "+input");
        },
        replaceSelections: De(function(e, t, r) {
          for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
            var s = i.ranges[o];
            n[o] = { from: s.from(), to: s.to(), text: this.splitLines(e[o]), origin: r };
          }
          for (var u = t && t != "end" && Yf(this, n, t), c = n.length - 1; c >= 0; c--)
            mn(this, n[c]);
          u ? Ms(this, u) : this.cm && pn(this.cm);
        }),
        undo: De(function() {
          Vr(this, "undo");
        }),
        redo: De(function() {
          Vr(this, "redo");
        }),
        undoSelection: De(function() {
          Vr(this, "undo", !0);
        }),
        redoSelection: De(function() {
          Vr(this, "redo", !0);
        }),
        setExtending: function(e) {
          this.extend = e;
        },
        getExtending: function() {
          return this.extend;
        },
        historySize: function() {
          for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++)
            e.done[n].ranges || ++t;
          for (var i = 0; i < e.undone.length; i++)
            e.undone[i].ranges || ++r;
          return { undo: t, redo: r };
        },
        clearHistory: function() {
          var e = this;
          this.history = new Xr(this.history), Wt(this, function(t) {
            return t.history = e.history;
          }, !0);
        },
        markClean: function() {
          this.cleanGeneration = this.changeGeneration(!0);
        },
        changeGeneration: function(e) {
          return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
        },
        isClean: function(e) {
          return this.history.generation == (e || this.cleanGeneration);
        },
        getHistory: function() {
          return {
            done: vn(this.history.done),
            undone: vn(this.history.undone)
          };
        },
        setHistory: function(e) {
          var t = this.history = new Xr(this.history);
          t.done = vn(e.done.slice(0), null, !0), t.undone = vn(e.undone.slice(0), null, !0);
        },
        setGutterMarker: De(function(e, t, r) {
          return Jn(this, e, "gutter", function(n) {
            var i = n.gutterMarkers || (n.gutterMarkers = {});
            return i[t] = r, !r && cl(i) && (n.gutterMarkers = null), !0;
          });
        }),
        clearGutter: De(function(e) {
          var t = this;
          this.iter(function(r) {
            r.gutterMarkers && r.gutterMarkers[e] && Jn(t, r, "gutter", function() {
              return r.gutterMarkers[e] = null, cl(r.gutterMarkers) && (r.gutterMarkers = null), !0;
            });
          });
        }),
        lineInfo: function(e) {
          var t;
          if (typeof e == "number") {
            if (!Pn(this, e) || (t = e, e = R(this, e), !e))
              return null;
          } else if (t = le(e), t == null)
            return null;
          return {
            line: t,
            handle: e,
            text: e.text,
            gutterMarkers: e.gutterMarkers,
            textClass: e.textClass,
            bgClass: e.bgClass,
            wrapClass: e.wrapClass,
            widgets: e.widgets
          };
        },
        addLineClass: De(function(e, t, r) {
          return Jn(this, e, t == "gutter" ? "gutter" : "class", function(n) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass";
            if (!n[i])
              n[i] = r;
            else {
              if (bt(r).test(n[i]))
                return !1;
              n[i] += " " + r;
            }
            return !0;
          });
        }),
        removeLineClass: De(function(e, t, r) {
          return Jn(this, e, t == "gutter" ? "gutter" : "class", function(n) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass", o = n[i];
            if (o)
              if (r == null)
                n[i] = null;
              else {
                var s = o.match(bt(r));
                if (!s)
                  return !1;
                var u = s.index + s[0].length;
                n[i] = o.slice(0, s.index) + (!s.index || u == o.length ? "" : " ") + o.slice(u) || null;
              }
            else
              return !1;
            return !0;
          });
        }),
        addLineWidget: De(function(e, t, r) {
          return ic(this, e, t, r);
        }),
        removeLineWidget: function(e) {
          e.clear();
        },
        markText: function(e, t, r) {
          return xn(this, Q(this, e), Q(this, t), r, r && r.type || "range");
        },
        setBookmark: function(e, t) {
          var r = {
            replacedWith: t && (t.nodeType == null ? t.widget : t),
            insertLeft: t && t.insertLeft,
            clearWhenEmpty: !1,
            shared: t && t.shared,
            handleMouseEvents: t && t.handleMouseEvents
          };
          return e = Q(this, e), xn(this, e, e, r, "bookmark");
        },
        findMarksAt: function(e) {
          e = Q(this, e);
          var t = [], r = R(this, e.line).markedSpans;
          if (r)
            for (var n = 0; n < r.length; ++n) {
              var i = r[n];
              (i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
            }
          return t;
        },
        findMarks: function(e, t, r) {
          e = Q(this, e), t = Q(this, t);
          var n = [], i = e.line;
          return this.iter(e.line, t.line + 1, function(o) {
            var s = o.markedSpans;
            if (s)
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                !(c.to != null && i == e.line && e.ch >= c.to || c.from == null && i != e.line || c.from != null && i == t.line && c.from >= t.ch) && (!r || r(c.marker)) && n.push(c.marker.parent || c.marker);
              }
            ++i;
          }), n;
        },
        getAllMarks: function() {
          var e = [];
          return this.iter(function(t) {
            var r = t.markedSpans;
            if (r)
              for (var n = 0; n < r.length; ++n)
                r[n].from != null && e.push(r[n].marker);
          }), e;
        },
        posFromIndex: function(e) {
          var t, r = this.first, n = this.lineSeparator().length;
          return this.iter(function(i) {
            var o = i.text.length + n;
            if (o > e)
              return t = e, !0;
            e -= o, ++r;
          }), Q(this, D(r, t));
        },
        indexFromPos: function(e) {
          e = Q(this, e);
          var t = e.ch;
          if (e.line < this.first || e.ch < 0)
            return 0;
          var r = this.lineSeparator().length;
          return this.iter(this.first, e.line, function(n) {
            t += n.text.length + r;
          }), t;
        },
        copy: function(e) {
          var t = new Ke(
            zi(this, this.first, this.first + this.size),
            this.modeOption,
            this.first,
            this.lineSep,
            this.direction
          );
          return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
        },
        linkedDoc: function(e) {
          e || (e = {});
          var t = this.first, r = this.first + this.size;
          e.from != null && e.from > t && (t = e.from), e.to != null && e.to < r && (r = e.to);
          var n = new Ke(zi(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);
          return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({ doc: n, sharedHist: e.sharedHist }), n.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], lc(n, qs(this)), n;
        },
        unlinkDoc: function(e) {
          if (e instanceof ce && (e = e.doc), this.linked)
            for (var t = 0; t < this.linked.length; ++t) {
              var r = this.linked[t];
              if (r.doc == e) {
                this.linked.splice(t, 1), e.unlinkDoc(this), sc(qs(this));
                break;
              }
            }
          if (e.history == this.history) {
            var n = [e.id];
            Wt(e, function(i) {
              return n.push(i.id);
            }, !0), e.history = new Xr(null), e.history.done = vn(this.history.done, n), e.history.undone = vn(this.history.undone, n);
          }
        },
        iterLinkedDocs: function(e) {
          Wt(this, e);
        },
        getMode: function() {
          return this.mode;
        },
        getEditor: function() {
          return this.cm;
        },
        splitLines: function(e) {
          return this.lineSep ? e.split(this.lineSep) : Pi(e);
        },
        lineSeparator: function() {
          return this.lineSep || `
`;
        },
        setDirection: De(function(e) {
          e != "rtl" && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(t) {
            return t.order = null;
          }), this.cm && Qf(this.cm));
        })
      }), Ke.prototype.eachLine = Ke.prototype.iter;
      var Ks = 0;
      function uc(e) {
        var t = this;
        if ($s(t), !(Te(t, e) || kt(t.display, e))) {
          Ge(e), S && (Ks = +new Date());
          var r = Yt(t, e, !0), n = e.dataTransfer.files;
          if (!(!r || t.isReadOnly()))
            if (n && n.length && window.FileReader && window.File)
              for (var i = n.length, o = Array(i), s = 0, u = function() {
                ++s == i && Ae(t, function() {
                  r = Q(t.doc, r);
                  var C = {
                    from: r,
                    to: r,
                    text: t.doc.splitLines(
                      o.filter(function(F) {
                        return F != null;
                      }).join(t.doc.lineSeparator())
                    ),
                    origin: "paste"
                  };
                  mn(t.doc, C), Ms(t.doc, Ht(Q(t.doc, r), Q(t.doc, Pt(C))));
                })();
              }, c = function(C, F) {
                if (t.options.allowDropFileTypes && re(t.options.allowDropFileTypes, C.type) == -1) {
                  u();
                  return;
                }
                var A = new FileReader();
                A.onerror = function() {
                  return u();
                }, A.onload = function() {
                  var M = A.result;
                  if (/[\x00-\x08\x0e-\x1f]{2}/.test(M)) {
                    u();
                    return;
                  }
                  o[F] = M, u();
                }, A.readAsText(C);
              }, h = 0; h < n.length; h++)
                c(n[h], h);
            else {
              if (t.state.draggingText && t.doc.sel.contains(r) > -1) {
                t.state.draggingText(e), setTimeout(function() {
                  return t.display.input.focus();
                }, 20);
                return;
              }
              try {
                var y = e.dataTransfer.getData("Text");
                if (y) {
                  var b;
                  if (t.state.draggingText && !t.state.draggingText.copy && (b = t.listSelections()), Zr(t.doc, Ht(r, r)), b)
                    for (var k = 0; k < b.length; ++k)
                      bn(t.doc, "", b[k].anchor, b[k].head, "drag");
                  t.replaceSelection(y, "around", "paste"), t.display.input.focus();
                }
              } catch {
              }
            }
        }
      }
      function fc(e, t) {
        if (S && (!e.state.draggingText || +new Date() - Ks < 100)) {
          Hn(t);
          return;
        }
        if (!(Te(e, t) || kt(e.display, t)) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !V)) {
          var r = U("img", null, null, "position: fixed; left: 0; top: 0;");
          r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", $ && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), $ && r.parentNode.removeChild(r);
        }
      }
      function cc(e, t) {
        var r = Yt(e, t);
        if (!!r) {
          var n = document.createDocumentFragment();
          uo(e, r, n), e.display.dragCursor || (e.display.dragCursor = U("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), Ue(e.display.dragCursor, n);
        }
      }
      function $s(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }
      function js(e) {
        if (!!document.getElementsByClassName) {
          for (var t = document.getElementsByClassName("CodeMirror"), r = [], n = 0; n < t.length; n++) {
            var i = t[n].CodeMirror;
            i && r.push(i);
          }
          r.length && r[0].operation(function() {
            for (var o = 0; o < r.length; o++)
              e(r[o]);
          });
        }
      }
      var Xs = !1;
      function hc() {
        Xs || (dc(), Xs = !0);
      }
      function dc() {
        var e;
        q(window, "resize", function() {
          e == null && (e = setTimeout(function() {
            e = null, js(pc);
          }, 100));
        }), q(window, "blur", function() {
          return js(dn);
        });
      }
      function pc(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize();
      }
      for (var Rt = {
        3: "Pause",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        106: "*",
        107: "=",
        109: "-",
        110: ".",
        111: "/",
        145: "ScrollLock",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        224: "Mod",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
      }, rr = 0; rr < 10; rr++)
        Rt[rr + 48] = Rt[rr + 96] = String(rr);
      for (var ei = 65; ei <= 90; ei++)
        Rt[ei] = String.fromCharCode(ei);
      for (var ir = 1; ir <= 12; ir++)
        Rt[ir + 111] = Rt[ir + 63235] = "F" + ir;
      var Tt = {};
      Tt.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
      }, Tt.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
      }, Tt.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
      }, Tt.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
      }, Tt.default = ne ? Tt.macDefault : Tt.pcDefault;
      function gc(e) {
        var t = e.split(/-(?!$)/);
        e = t[t.length - 1];
        for (var r, n, i, o, s = 0; s < t.length - 1; s++) {
          var u = t[s];
          if (/^(cmd|meta|m)$/i.test(u))
            o = !0;
          else if (/^a(lt)?$/i.test(u))
            r = !0;
          else if (/^(c|ctrl|control)$/i.test(u))
            n = !0;
          else if (/^s(hift)?$/i.test(u))
            i = !0;
          else
            throw new Error("Unrecognized modifier name: " + u);
        }
        return r && (e = "Alt-" + e), n && (e = "Ctrl-" + e), o && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
      }
      function vc(e) {
        var t = {};
        for (var r in e)
          if (e.hasOwnProperty(r)) {
            var n = e[r];
            if (/^(name|fallthrough|(de|at)tach)$/.test(r))
              continue;
            if (n == "...") {
              delete e[r];
              continue;
            }
            for (var i = Tr(r.split(" "), gc), o = 0; o < i.length; o++) {
              var s = void 0, u = void 0;
              o == i.length - 1 ? (u = i.join(" "), s = n) : (u = i.slice(0, o + 1).join(" "), s = "...");
              var c = t[u];
              if (!c)
                t[u] = s;
              else if (c != s)
                throw new Error("Inconsistent bindings for " + u);
            }
            delete e[r];
          }
        for (var h in t)
          e[h] = t[h];
        return e;
      }
      function wn(e, t, r, n) {
        t = ti(t);
        var i = t.call ? t.call(e, n) : t[e];
        if (i === !1)
          return "nothing";
        if (i === "...")
          return "multi";
        if (i != null && r(i))
          return "handled";
        if (t.fallthrough) {
          if (Object.prototype.toString.call(t.fallthrough) != "[object Array]")
            return wn(e, t.fallthrough, r, n);
          for (var o = 0; o < t.fallthrough.length; o++) {
            var s = wn(e, t.fallthrough[o], r, n);
            if (s)
              return s;
          }
        }
      }
      function Ys(e) {
        var t = typeof e == "string" ? e : Rt[e.keyCode];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
      }
      function Qs(e, t, r) {
        var n = e;
        return t.altKey && n != "Alt" && (e = "Alt-" + e), (Se ? t.metaKey : t.ctrlKey) && n != "Ctrl" && (e = "Ctrl-" + e), (Se ? t.ctrlKey : t.metaKey) && n != "Mod" && (e = "Cmd-" + e), !r && t.shiftKey && n != "Shift" && (e = "Shift-" + e), e;
      }
      function Zs(e, t) {
        if ($ && e.keyCode == 34 && e.char)
          return !1;
        var r = Rt[e.keyCode];
        return r == null || e.altGraphKey ? !1 : (e.keyCode == 3 && e.code && (r = e.code), Qs(r, e, t));
      }
      function ti(e) {
        return typeof e == "string" ? Tt[e] : e;
      }
      function Sn(e, t) {
        for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
          for (var o = t(r[i]); n.length && Y(o.from, oe(n).to) <= 0; ) {
            var s = n.pop();
            if (Y(s.from, o.from) < 0) {
              o.from = s.from;
              break;
            }
          }
          n.push(o);
        }
        Ze(e, function() {
          for (var u = n.length - 1; u >= 0; u--)
            bn(e.doc, "", n[u].from, n[u].to, "+delete");
          pn(e);
        });
      }
      function Fo(e, t, r) {
        var n = hl(e.text, t + r, r);
        return n < 0 || n > e.text.length ? null : n;
      }
      function Ao(e, t, r) {
        var n = Fo(e, t.ch, r);
        return n == null ? null : new D(t.line, n, r < 0 ? "after" : "before");
      }
      function Do(e, t, r, n, i) {
        if (e) {
          t.doc.direction == "rtl" && (i = -i);
          var o = wt(r, t.doc.direction);
          if (o) {
            var s = i < 0 ? oe(o) : o[0], u = i < 0 == (s.level == 1), c = u ? "after" : "before", h;
            if (s.level > 0 || t.doc.direction == "rtl") {
              var y = fn(t, r);
              h = i < 0 ? r.text.length - 1 : 0;
              var b = yt(t, y, h).top;
              h = Nn(function(k) {
                return yt(t, y, k).top == b;
              }, i < 0 == (s.level == 1) ? s.from : s.to - 1, h), c == "before" && (h = Fo(r, h, 1));
            } else
              h = i < 0 ? s.to : s.from;
            return new D(n, h, c);
          }
        }
        return new D(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after");
      }
      function yc(e, t, r, n) {
        var i = wt(t, e.doc.direction);
        if (!i)
          return Ao(t, r, n);
        r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");
        var o = In(i, r.ch, r.sticky), s = i[o];
        if (e.doc.direction == "ltr" && s.level % 2 == 0 && (n > 0 ? s.to > r.ch : s.from < r.ch))
          return Ao(t, r, n);
        var u = function(N, I) {
          return Fo(t, N instanceof D ? N.ch : N, I);
        }, c, h = function(N) {
          return e.options.lineWrapping ? (c = c || fn(e, t), ns(e, t, c, N)) : { begin: 0, end: t.text.length };
        }, y = h(r.sticky == "before" ? u(r, -1) : r.ch);
        if (e.doc.direction == "rtl" || s.level == 1) {
          var b = s.level == 1 == n < 0, k = u(r, b ? 1 : -1);
          if (k != null && (b ? k <= s.to && k <= y.end : k >= s.from && k >= y.begin)) {
            var C = b ? "before" : "after";
            return new D(r.line, k, C);
          }
        }
        var F = function(N, I, O) {
          for (var P = function(ae, Me) {
            return Me ? new D(r.line, u(ae, 1), "before") : new D(r.line, ae, "after");
          }; N >= 0 && N < i.length; N += I) {
            var z = i[N], _ = I > 0 == (z.level != 1), Z = _ ? O.begin : u(O.end, -1);
            if (z.from <= Z && Z < z.to || (Z = _ ? z.from : u(z.to, -1), O.begin <= Z && Z < O.end))
              return P(Z, _);
          }
        }, A = F(o + n, n, y);
        if (A)
          return A;
        var M = n > 0 ? y.end : u(y.begin, -1);
        return M != null && !(n > 0 && M == t.text.length) && (A = F(n > 0 ? 0 : i.length - 1, n, h(M)), A) ? A : null;
      }
      var or = {
        selectAll: Hs,
        singleSelection: function(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), dt);
        },
        killLine: function(e) {
          return Sn(e, function(t) {
            if (t.empty()) {
              var r = R(e.doc, t.head.line).text.length;
              return t.head.ch == r && t.head.line < e.lastLine() ? { from: t.head, to: D(t.head.line + 1, 0) } : { from: t.head, to: D(t.head.line, r) };
            } else
              return { from: t.from(), to: t.to() };
          });
        },
        deleteLine: function(e) {
          return Sn(e, function(t) {
            return {
              from: D(t.from().line, 0),
              to: Q(e.doc, D(t.to().line + 1, 0))
            };
          });
        },
        delLineLeft: function(e) {
          return Sn(e, function(t) {
            return {
              from: D(t.from().line, 0),
              to: t.from()
            };
          });
        },
        delWrappedLineLeft: function(e) {
          return Sn(e, function(t) {
            var r = e.charCoords(t.head, "div").top + 5, n = e.coordsChar({ left: 0, top: r }, "div");
            return { from: n, to: t.from() };
          });
        },
        delWrappedLineRight: function(e) {
          return Sn(e, function(t) {
            var r = e.charCoords(t.head, "div").top + 5, n = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: r }, "div");
            return { from: t.from(), to: n };
          });
        },
        undo: function(e) {
          return e.undo();
        },
        redo: function(e) {
          return e.redo();
        },
        undoSelection: function(e) {
          return e.undoSelection();
        },
        redoSelection: function(e) {
          return e.redoSelection();
        },
        goDocStart: function(e) {
          return e.extendSelection(D(e.firstLine(), 0));
        },
        goDocEnd: function(e) {
          return e.extendSelection(D(e.lastLine()));
        },
        goLineStart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Js(e, t.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Vs(e, t.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return mc(e, t.head.line);
            },
            { origin: "+move", bias: -1 }
          );
        },
        goLineRight: function(e) {
          return e.extendSelectionsBy(function(t) {
            var r = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: r }, "div");
          }, En);
        },
        goLineLeft: function(e) {
          return e.extendSelectionsBy(function(t) {
            var r = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: 0, top: r }, "div");
          }, En);
        },
        goLineLeftSmart: function(e) {
          return e.extendSelectionsBy(function(t) {
            var r = e.cursorCoords(t.head, "div").top + 5, n = e.coordsChar({ left: 0, top: r }, "div");
            return n.ch < e.getLine(n.line).search(/\S/) ? Vs(e, t.head) : n;
          }, En);
        },
        goLineUp: function(e) {
          return e.moveV(-1, "line");
        },
        goLineDown: function(e) {
          return e.moveV(1, "line");
        },
        goPageUp: function(e) {
          return e.moveV(-1, "page");
        },
        goPageDown: function(e) {
          return e.moveV(1, "page");
        },
        goCharLeft: function(e) {
          return e.moveH(-1, "char");
        },
        goCharRight: function(e) {
          return e.moveH(1, "char");
        },
        goColumnLeft: function(e) {
          return e.moveH(-1, "column");
        },
        goColumnRight: function(e) {
          return e.moveH(1, "column");
        },
        goWordLeft: function(e) {
          return e.moveH(-1, "word");
        },
        goGroupRight: function(e) {
          return e.moveH(1, "group");
        },
        goGroupLeft: function(e) {
          return e.moveH(-1, "group");
        },
        goWordRight: function(e) {
          return e.moveH(1, "word");
        },
        delCharBefore: function(e) {
          return e.deleteH(-1, "codepoint");
        },
        delCharAfter: function(e) {
          return e.deleteH(1, "char");
        },
        delWordBefore: function(e) {
          return e.deleteH(-1, "word");
        },
        delWordAfter: function(e) {
          return e.deleteH(1, "word");
        },
        delGroupBefore: function(e) {
          return e.deleteH(-1, "group");
        },
        delGroupAfter: function(e) {
          return e.deleteH(1, "group");
        },
        indentAuto: function(e) {
          return e.indentSelection("smart");
        },
        indentMore: function(e) {
          return e.indentSelection("add");
        },
        indentLess: function(e) {
          return e.indentSelection("subtract");
        },
        insertTab: function(e) {
          return e.replaceSelection("	");
        },
        insertSoftTab: function(e) {
          for (var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0; i < r.length; i++) {
            var o = r[i].from(), s = ye(e.getLine(o.line), o.ch, n);
            t.push(Ai(n - s % n));
          }
          e.replaceSelections(t);
        },
        defaultTab: function(e) {
          e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
        },
        transposeChars: function(e) {
          return Ze(e, function() {
            for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++)
              if (!!t[n].empty()) {
                var i = t[n].head, o = R(e.doc, i.line).text;
                if (o) {
                  if (i.ch == o.length && (i = new D(i.line, i.ch - 1)), i.ch > 0)
                    i = new D(i.line, i.ch + 1), e.replaceRange(
                      o.charAt(i.ch - 1) + o.charAt(i.ch - 2),
                      D(i.line, i.ch - 2),
                      i,
                      "+transpose"
                    );
                  else if (i.line > e.doc.first) {
                    var s = R(e.doc, i.line - 1).text;
                    s && (i = new D(i.line, 1), e.replaceRange(
                      o.charAt(0) + e.doc.lineSeparator() + s.charAt(s.length - 1),
                      D(i.line - 1, s.length - 1),
                      i,
                      "+transpose"
                    ));
                  }
                }
                r.push(new ie(i, i));
              }
            e.setSelections(r);
          });
        },
        newlineAndIndent: function(e) {
          return Ze(e, function() {
            for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--)
              e.replaceRange(e.doc.lineSeparator(), t[r].anchor, t[r].head, "+input");
            t = e.listSelections();
            for (var n = 0; n < t.length; n++)
              e.indentLine(t[n].from().line, null, !0);
            pn(e);
          });
        },
        openLine: function(e) {
          return e.replaceSelection(`
`, "start");
        },
        toggleOverwrite: function(e) {
          return e.toggleOverwrite();
        }
      };
      function Js(e, t) {
        var r = R(e.doc, t), n = lt(r);
        return n != r && (t = le(n)), Do(!0, e, n, t, 1);
      }
      function mc(e, t) {
        var r = R(e.doc, t), n = ef(r);
        return n != r && (t = le(n)), Do(!0, e, r, t, -1);
      }
      function Vs(e, t) {
        var r = Js(e, t.line), n = R(e.doc, r.line), i = wt(n, e.doc.direction);
        if (!i || i[0].level == 0) {
          var o = Math.max(r.ch, n.text.search(/\S/)), s = t.line == r.line && t.ch <= o && t.ch;
          return D(r.line, s ? 0 : o, r.sticky);
        }
        return r;
      }
      function ni(e, t, r) {
        if (typeof t == "string" && (t = or[t], !t))
          return !1;
        e.display.input.ensurePolled();
        var n = e.display.shift, i = !1;
        try {
          e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != kr;
        } finally {
          e.display.shift = n, e.state.suppressEdits = !1;
        }
        return i;
      }
      function bc(e, t, r) {
        for (var n = 0; n < e.state.keyMaps.length; n++) {
          var i = wn(t, e.state.keyMaps[n], r, e);
          if (i)
            return i;
        }
        return e.options.extraKeys && wn(t, e.options.extraKeys, r, e) || wn(t, e.options.keyMap, r, e);
      }
      var xc = new Le();
      function lr(e, t, r, n) {
        var i = e.state.keySeq;
        if (i) {
          if (Ys(t))
            return "handled";
          if (/\'$/.test(t) ? e.state.keySeq = null : xc.set(50, function() {
            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
          }), ea(e, i + " " + t, r, n))
            return !0;
        }
        return ea(e, t, r, n);
      }
      function ea(e, t, r, n) {
        var i = bc(e, t, n);
        return i == "multi" && (e.state.keySeq = t), i == "handled" && Fe(e, "keyHandled", e, t, r), (i == "handled" || i == "multi") && (Ge(r), fo(e)), !!i;
      }
      function ta(e, t) {
        var r = Zs(t, !0);
        return r ? t.shiftKey && !e.state.keySeq ? lr(e, "Shift-" + r, t, function(n) {
          return ni(e, n, !0);
        }) || lr(e, r, t, function(n) {
          if (typeof n == "string" ? /^go[A-Z]/.test(n) : n.motion)
            return ni(e, n);
        }) : lr(e, r, t, function(n) {
          return ni(e, n);
        }) : !1;
      }
      function wc(e, t, r) {
        return lr(e, "'" + r + "'", t, function(n) {
          return ni(e, n, !0);
        });
      }
      var Mo = null;
      function na(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && (t.curOp.focus = g(ee(t)), !Te(t, e))) {
          S && L < 11 && e.keyCode == 27 && (e.returnValue = !1);
          var r = e.keyCode;
          t.display.shift = r == 16 || e.shiftKey;
          var n = ta(t, e);
          $ && (Mo = n ? r : null, !n && r == 88 && !Bu && (ne ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), p && !ne && !n && r == 46 && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), r == 18 && !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) && Sc(t);
        }
      }
      function Sc(e) {
        var t = e.display.lineDiv;
        W(t, "CodeMirror-crosshair");
        function r(n) {
          (n.keyCode == 18 || !n.altKey) && (xt(t, "CodeMirror-crosshair"), et(document, "keyup", r), et(document, "mouseover", r));
        }
        q(document, "keyup", r), q(document, "mouseover", r);
      }
      function ra(e) {
        e.keyCode == 16 && (this.doc.sel.shift = !1), Te(this, e);
      }
      function ia(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && !(kt(t.display, e) || Te(t, e) || e.ctrlKey && !e.altKey || ne && e.metaKey)) {
          var r = e.keyCode, n = e.charCode;
          if ($ && r == Mo) {
            Mo = null, Ge(e);
            return;
          }
          if (!($ && (!e.which || e.which < 10) && ta(t, e))) {
            var i = String.fromCharCode(n == null ? r : n);
            i != "\b" && (wc(t, e, i) || t.display.input.onKeyPress(e));
          }
        }
      }
      var Cc = 400, Eo = function(e, t, r) {
        this.time = e, this.pos = t, this.button = r;
      };
      Eo.prototype.compare = function(e, t, r) {
        return this.time + Cc > e && Y(t, this.pos) == 0 && r == this.button;
      };
      var sr, ar;
      function kc(e, t) {
        var r = +new Date();
        return ar && ar.compare(r, e, t) ? (sr = ar = null, "triple") : sr && sr.compare(r, e, t) ? (ar = new Eo(r, e, t), sr = null, "double") : (sr = new Eo(r, e, t), ar = null, "single");
      }
      function oa(e) {
        var t = this, r = t.display;
        if (!(Te(t, e) || r.activeTouch && r.input.supportsTouch())) {
          if (r.input.ensurePolled(), r.shift = e.shiftKey, kt(r, e)) {
            T || (r.scroller.draggable = !1, setTimeout(function() {
              return r.scroller.draggable = !0;
            }, 100));
            return;
          }
          if (!No(t, e)) {
            var n = Yt(t, e), i = vl(e), o = n ? kc(n, i) : "single";
            Oe(t).focus(), i == 1 && t.state.selectingText && t.state.selectingText(e), !(n && Lc(t, i, n, o, e)) && (i == 1 ? n ? Fc(t, n, o, e) : Oi(e) == r.scroller && Ge(e) : i == 2 ? (n && Qr(t.doc, n), setTimeout(function() {
              return r.input.focus();
            }, 20)) : i == 3 && (Ye ? t.display.input.onContextMenu(e) : co(t)));
          }
        }
      }
      function Lc(e, t, r, n, i) {
        var o = "Click";
        return n == "double" ? o = "Double" + o : n == "triple" && (o = "Triple" + o), o = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + o, lr(e, Qs(o, i), i, function(s) {
          if (typeof s == "string" && (s = or[s]), !s)
            return !1;
          var u = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), u = s(e, r) != kr;
          } finally {
            e.state.suppressEdits = !1;
          }
          return u;
        });
      }
      function Tc(e, t, r) {
        var n = e.getOption("configureMouse"), i = n ? n(e, t, r) : {};
        if (i.unit == null) {
          var o = K ? r.shiftKey && r.metaKey : r.altKey;
          i.unit = o ? "rectangle" : t == "single" ? "char" : t == "double" ? "word" : "line";
        }
        return (i.extend == null || e.doc.extend) && (i.extend = e.doc.extend || r.shiftKey), i.addNew == null && (i.addNew = ne ? r.metaKey : r.ctrlKey), i.moveOnDrag == null && (i.moveOnDrag = !(ne ? r.altKey : r.ctrlKey)), i;
      }
      function Fc(e, t, r, n) {
        S ? setTimeout(Qe(ls, e), 0) : e.curOp.focus = g(ee(e));
        var i = Tc(e, r, n), o = e.doc.sel, s;
        e.options.dragDrop && Iu && !e.isReadOnly() && r == "single" && (s = o.contains(t)) > -1 && (Y((s = o.ranges[s]).from(), t) < 0 || t.xRel > 0) && (Y(s.to(), t) > 0 || t.xRel < 0) ? Ac(e, n, t, i) : Dc(e, n, t, i);
      }
      function Ac(e, t, r, n) {
        var i = e.display, o = !1, s = Ae(e, function(h) {
          T && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : co(e)), et(i.wrapper.ownerDocument, "mouseup", s), et(i.wrapper.ownerDocument, "mousemove", u), et(i.scroller, "dragstart", c), et(i.scroller, "drop", s), o || (Ge(h), n.addNew || Qr(e.doc, r, null, null, n.extend), T && !V || S && L == 9 ? setTimeout(function() {
            i.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), i.input.focus();
          }, 20) : i.input.focus());
        }), u = function(h) {
          o = o || Math.abs(t.clientX - h.clientX) + Math.abs(t.clientY - h.clientY) >= 10;
        }, c = function() {
          return o = !0;
        };
        T && (i.scroller.draggable = !0), e.state.draggingText = s, s.copy = !n.moveOnDrag, q(i.wrapper.ownerDocument, "mouseup", s), q(i.wrapper.ownerDocument, "mousemove", u), q(i.scroller, "dragstart", c), q(i.scroller, "drop", s), e.state.delayingBlurEvent = !0, setTimeout(function() {
          return i.input.focus();
        }, 20), i.scroller.dragDrop && i.scroller.dragDrop();
      }
      function la(e, t, r) {
        if (r == "char")
          return new ie(t, t);
        if (r == "word")
          return e.findWordAt(t);
        if (r == "line")
          return new ie(D(t.line, 0), Q(e.doc, D(t.line + 1, 0)));
        var n = r(e, t);
        return new ie(n.from, n.to);
      }
      function Dc(e, t, r, n) {
        S && co(e);
        var i = e.display, o = e.doc;
        Ge(t);
        var s, u, c = o.sel, h = c.ranges;
        if (n.addNew && !n.extend ? (u = o.sel.contains(r), u > -1 ? s = h[u] : s = new ie(r, r)) : (s = o.sel.primary(), u = o.sel.primIndex), n.unit == "rectangle")
          n.addNew || (s = new ie(r, r)), r = Yt(e, t, !0, !0), u = -1;
        else {
          var y = la(e, r, n.unit);
          n.extend ? s = Lo(s, y.anchor, y.head, n.extend) : s = y;
        }
        n.addNew ? u == -1 ? (u = h.length, Ie(
          o,
          at(e, h.concat([s]), u),
          { scroll: !1, origin: "*mouse" }
        )) : h.length > 1 && h[u].empty() && n.unit == "char" && !n.extend ? (Ie(
          o,
          at(e, h.slice(0, u).concat(h.slice(u + 1)), 0),
          { scroll: !1, origin: "*mouse" }
        ), c = o.sel) : To(o, u, s, Ti) : (u = 0, Ie(o, new tt([s], 0), Ti), c = o.sel);
        var b = r;
        function k(O) {
          if (Y(b, O) != 0)
            if (b = O, n.unit == "rectangle") {
              for (var P = [], z = e.options.tabSize, _ = ye(R(o, r.line).text, r.ch, z), Z = ye(R(o, O.line).text, O.ch, z), ae = Math.min(_, Z), Me = Math.max(_, Z), he = Math.min(r.line, O.line), Je = Math.min(e.lastLine(), Math.max(r.line, O.line)); he <= Je; he++) {
                var $e = R(o, he).text, xe = Fi($e, ae, z);
                ae == Me ? P.push(new ie(D(he, xe), D(he, xe))) : $e.length > xe && P.push(new ie(D(he, xe), D(he, Fi($e, Me, z))));
              }
              P.length || P.push(new ie(r, r)), Ie(
                o,
                at(e, c.ranges.slice(0, u).concat(P), u),
                { origin: "*mouse", scroll: !1 }
              ), e.scrollIntoView(O);
            } else {
              var je = s, Ne = la(e, O, n.unit), Ce = je.anchor, we;
              Y(Ne.anchor, Ce) > 0 ? (we = Ne.head, Ce = Mr(je.from(), Ne.anchor)) : (we = Ne.anchor, Ce = Dr(je.to(), Ne.head));
              var pe = c.ranges.slice(0);
              pe[u] = Mc(e, new ie(Q(o, Ce), we)), Ie(o, at(e, pe, u), Ti);
            }
        }
        var C = i.wrapper.getBoundingClientRect(), F = 0;
        function A(O) {
          var P = ++F, z = Yt(e, O, !0, n.unit == "rectangle");
          if (!!z)
            if (Y(z, b) != 0) {
              e.curOp.focus = g(ee(e)), k(z);
              var _ = qr(i, o);
              (z.line >= _.to || z.line < _.from) && setTimeout(Ae(e, function() {
                F == P && A(O);
              }), 150);
            } else {
              var Z = O.clientY < C.top ? -20 : O.clientY > C.bottom ? 20 : 0;
              Z && setTimeout(Ae(e, function() {
                F == P && (i.scroller.scrollTop += Z, A(O));
              }), 50);
            }
        }
        function M(O) {
          e.state.selectingText = !1, F = 1 / 0, O && (Ge(O), i.input.focus()), et(i.wrapper.ownerDocument, "mousemove", N), et(i.wrapper.ownerDocument, "mouseup", I), o.history.lastSelOrigin = null;
        }
        var N = Ae(e, function(O) {
          O.buttons === 0 || !vl(O) ? M(O) : A(O);
        }), I = Ae(e, M);
        e.state.selectingText = I, q(i.wrapper.ownerDocument, "mousemove", N), q(i.wrapper.ownerDocument, "mouseup", I);
      }
      function Mc(e, t) {
        var r = t.anchor, n = t.head, i = R(e.doc, r.line);
        if (Y(r, n) == 0 && r.sticky == n.sticky)
          return t;
        var o = wt(i);
        if (!o)
          return t;
        var s = In(o, r.ch, r.sticky), u = o[s];
        if (u.from != r.ch && u.to != r.ch)
          return t;
        var c = s + (u.from == r.ch == (u.level != 1) ? 0 : 1);
        if (c == 0 || c == o.length)
          return t;
        var h;
        if (n.line != r.line)
          h = (n.line - r.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
        else {
          var y = In(o, n.ch, n.sticky), b = y - s || (n.ch - r.ch) * (u.level == 1 ? -1 : 1);
          y == c - 1 || y == c ? h = b < 0 : h = b > 0;
        }
        var k = o[c + (h ? -1 : 0)], C = h == (k.level == 1), F = C ? k.from : k.to, A = C ? "after" : "before";
        return r.ch == F && r.sticky == A ? t : new ie(new D(r.line, F, A), n);
      }
      function sa(e, t, r, n) {
        var i, o;
        if (t.touches)
          i = t.touches[0].clientX, o = t.touches[0].clientY;
        else
          try {
            i = t.clientX, o = t.clientY;
          } catch {
            return !1;
          }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right))
          return !1;
        n && Ge(t);
        var s = e.display, u = s.lineDiv.getBoundingClientRect();
        if (o > u.bottom || !rt(e, r))
          return Ni(t);
        o -= u.top - s.viewOffset;
        for (var c = 0; c < e.display.gutterSpecs.length; ++c) {
          var h = s.gutters.childNodes[c];
          if (h && h.getBoundingClientRect().right >= i) {
            var y = $t(e.doc, o), b = e.display.gutterSpecs[c];
            return me(e, r, e, y, b.className, t), Ni(t);
          }
        }
      }
      function No(e, t) {
        return sa(e, t, "gutterClick", !0);
      }
      function aa(e, t) {
        kt(e.display, t) || Ec(e, t) || Te(e, t, "contextmenu") || Ye || e.display.input.onContextMenu(t);
      }
      function Ec(e, t) {
        return rt(e, "gutterContextMenu") ? sa(e, t, "gutterContextMenu", !1) : !1;
      }
      function ua(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Un(e);
      }
      var Cn = { toString: function() {
        return "CodeMirror.Init";
      } }, fa = {}, ri = {};
      function Nc(e) {
        var t = e.optionHandlers;
        function r(n, i, o, s) {
          e.defaults[n] = i, o && (t[n] = s ? function(u, c, h) {
            h != Cn && o(u, c, h);
          } : o);
        }
        e.defineOption = r, e.Init = Cn, r("value", "", function(n, i) {
          return n.setValue(i);
        }, !0), r("mode", null, function(n, i) {
          n.doc.modeOption = i, So(n);
        }, !0), r("indentUnit", 2, So, !0), r("indentWithTabs", !1), r("smartIndent", !0), r("tabSize", 4, function(n) {
          Qn(n), Un(n), qe(n);
        }, !0), r("lineSeparator", null, function(n, i) {
          if (n.doc.lineSep = i, !!i) {
            var o = [], s = n.doc.first;
            n.doc.iter(function(c) {
              for (var h = 0; ; ) {
                var y = c.text.indexOf(i, h);
                if (y == -1)
                  break;
                h = y + i.length, o.push(D(s, y));
              }
              s++;
            });
            for (var u = o.length - 1; u >= 0; u--)
              bn(n.doc, i, o[u], D(o[u].line, o[u].ch + i.length));
          }
        }), r("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(n, i, o) {
          n.state.specialChars = new RegExp(i.source + (i.test("	") ? "" : "|	"), "g"), o != Cn && n.refresh();
        }), r("specialCharPlaceholder", sf, function(n) {
          return n.refresh();
        }, !0), r("electricChars", !0), r("inputStyle", fe ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), r("spellcheck", !1, function(n, i) {
          return n.getInputField().spellcheck = i;
        }, !0), r("autocorrect", !1, function(n, i) {
          return n.getInputField().autocorrect = i;
        }, !0), r("autocapitalize", !1, function(n, i) {
          return n.getInputField().autocapitalize = i;
        }, !0), r("rtlMoveVisually", !B), r("wholeLineUpdateBefore", !0), r("theme", "default", function(n) {
          ua(n), Yn(n);
        }, !0), r("keyMap", "default", function(n, i, o) {
          var s = ti(i), u = o != Cn && ti(o);
          u && u.detach && u.detach(n, s), s.attach && s.attach(n, u || null);
        }), r("extraKeys", null), r("configureMouse", null), r("lineWrapping", !1, Ic, !0), r("gutters", [], function(n, i) {
          n.display.gutterSpecs = xo(i, n.options.lineNumbers), Yn(n);
        }, !0), r("fixedGutter", !0, function(n, i) {
          n.display.gutters.style.left = i ? so(n.display) + "px" : "0", n.refresh();
        }, !0), r("coverGutterNextToScrollbar", !1, function(n) {
          return gn(n);
        }, !0), r("scrollbarStyle", "native", function(n) {
          hs(n), gn(n), n.display.scrollbars.setScrollTop(n.doc.scrollTop), n.display.scrollbars.setScrollLeft(n.doc.scrollLeft);
        }, !0), r("lineNumbers", !1, function(n, i) {
          n.display.gutterSpecs = xo(n.options.gutters, i), Yn(n);
        }, !0), r("firstLineNumber", 1, Yn, !0), r("lineNumberFormatter", function(n) {
          return n;
        }, Yn, !0), r("showCursorWhenSelecting", !1, Gn, !0), r("resetSelectionOnContextMenu", !0), r("lineWiseCopyCut", !0), r("pasteLinesPerSelection", !0), r("selectionsMayTouch", !1), r("readOnly", !1, function(n, i) {
          i == "nocursor" && (dn(n), n.display.input.blur()), n.display.input.readOnlyChanged(i);
        }), r("screenReaderLabel", null, function(n, i) {
          i = i === "" ? null : i, n.display.input.screenReaderLabelChanged(i);
        }), r("disableInput", !1, function(n, i) {
          i || n.display.input.reset();
        }, !0), r("dragDrop", !0, Oc), r("allowDropFileTypes", null), r("cursorBlinkRate", 530), r("cursorScrollMargin", 0), r("cursorHeight", 1, Gn, !0), r("singleCursorHeightPerLine", !0, Gn, !0), r("workTime", 100), r("workDelay", 100), r("flattenSpans", !0, Qn, !0), r("addModeClass", !1, Qn, !0), r("pollInterval", 100), r("undoDepth", 200, function(n, i) {
          return n.doc.history.undoDepth = i;
        }), r("historyEventDelay", 1250), r("viewportMargin", 10, function(n) {
          return n.refresh();
        }, !0), r("maxHighlightLength", 1e4, Qn, !0), r("moveInputWithCursor", !0, function(n, i) {
          i || n.display.input.resetPosition();
        }), r("tabindex", null, function(n, i) {
          return n.display.input.getField().tabIndex = i || "";
        }), r("autofocus", null), r("direction", "ltr", function(n, i) {
          return n.doc.setDirection(i);
        }, !0), r("phrases", null);
      }
      function Oc(e, t, r) {
        var n = r && r != Cn;
        if (!t != !n) {
          var i = e.display.dragFunctions, o = t ? q : et;
          o(e.display.scroller, "dragstart", i.start), o(e.display.scroller, "dragenter", i.enter), o(e.display.scroller, "dragover", i.over), o(e.display.scroller, "dragleave", i.leave), o(e.display.scroller, "drop", i.drop);
        }
      }
      function Ic(e) {
        e.options.lineWrapping ? (W(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (xt(e.display.wrapper, "CodeMirror-wrap"), Zi(e)), ao(e), qe(e), Un(e), setTimeout(function() {
          return gn(e);
        }, 100);
      }
      function ce(e, t) {
        var r = this;
        if (!(this instanceof ce))
          return new ce(e, t);
        this.options = t = t ? We(t) : {}, We(fa, t, !1);
        var n = t.value;
        typeof n == "string" ? n = new Ke(n, t.mode, null, t.lineSeparator, t.direction) : t.mode && (n.modeOption = t.mode), this.doc = n;
        var i = new ce.inputStyles[t.inputStyle](this), o = this.display = new jf(e, n, i, t);
        o.wrapper.CodeMirror = this, ua(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), hs(this), this.state = {
          keyMaps: [],
          overlays: [],
          modeGen: 0,
          overwrite: !1,
          delayingBlurEvent: !1,
          focused: !1,
          suppressEdits: !1,
          pasteIncoming: -1,
          cutIncoming: -1,
          selectingText: !1,
          draggingText: !1,
          highlight: new Le(),
          keySeq: null,
          specialChars: null
        }, t.autofocus && !fe && o.input.focus(), S && L < 11 && setTimeout(function() {
          return r.display.input.reset(!0);
        }, 20), Hc(this), hc(), Vt(this), this.curOp.forceUpdate = !0, Ss(this, n), t.autofocus && !fe || this.hasFocus() ? setTimeout(function() {
          r.hasFocus() && !r.state.focused && ho(r);
        }, 20) : dn(this);
        for (var s in ri)
          ri.hasOwnProperty(s) && ri[s](this, t[s], Cn);
        gs(this), t.finishInit && t.finishInit(this);
        for (var u = 0; u < Oo.length; ++u)
          Oo[u](this);
        en(this), T && t.lineWrapping && getComputedStyle(o.lineDiv).textRendering == "optimizelegibility" && (o.lineDiv.style.textRendering = "auto");
      }
      ce.defaults = fa, ce.optionHandlers = ri;
      function Hc(e) {
        var t = e.display;
        q(t.scroller, "mousedown", Ae(e, oa)), S && L < 11 ? q(t.scroller, "dblclick", Ae(e, function(c) {
          if (!Te(e, c)) {
            var h = Yt(e, c);
            if (!(!h || No(e, c) || kt(e.display, c))) {
              Ge(c);
              var y = e.findWordAt(h);
              Qr(e.doc, y.anchor, y.head);
            }
          }
        })) : q(t.scroller, "dblclick", function(c) {
          return Te(e, c) || Ge(c);
        }), q(t.scroller, "contextmenu", function(c) {
          return aa(e, c);
        }), q(t.input.getField(), "contextmenu", function(c) {
          t.scroller.contains(c.target) || aa(e, c);
        });
        var r, n = { end: 0 };
        function i() {
          t.activeTouch && (r = setTimeout(function() {
            return t.activeTouch = null;
          }, 1e3), n = t.activeTouch, n.end = +new Date());
        }
        function o(c) {
          if (c.touches.length != 1)
            return !1;
          var h = c.touches[0];
          return h.radiusX <= 1 && h.radiusY <= 1;
        }
        function s(c, h) {
          if (h.left == null)
            return !0;
          var y = h.left - c.left, b = h.top - c.top;
          return y * y + b * b > 20 * 20;
        }
        q(t.scroller, "touchstart", function(c) {
          if (!Te(e, c) && !o(c) && !No(e, c)) {
            t.input.ensurePolled(), clearTimeout(r);
            var h = +new Date();
            t.activeTouch = {
              start: h,
              moved: !1,
              prev: h - n.end <= 300 ? n : null
            }, c.touches.length == 1 && (t.activeTouch.left = c.touches[0].pageX, t.activeTouch.top = c.touches[0].pageY);
          }
        }), q(t.scroller, "touchmove", function() {
          t.activeTouch && (t.activeTouch.moved = !0);
        }), q(t.scroller, "touchend", function(c) {
          var h = t.activeTouch;
          if (h && !kt(t, c) && h.left != null && !h.moved && new Date() - h.start < 300) {
            var y = e.coordsChar(t.activeTouch, "page"), b;
            !h.prev || s(h, h.prev) ? b = new ie(y, y) : !h.prev.prev || s(h, h.prev.prev) ? b = e.findWordAt(y) : b = new ie(D(y.line, 0), Q(e.doc, D(y.line + 1, 0))), e.setSelection(b.anchor, b.head), e.focus(), Ge(c);
          }
          i();
        }), q(t.scroller, "touchcancel", i), q(t.scroller, "scroll", function() {
          t.scroller.clientHeight && (Kn(e, t.scroller.scrollTop), Zt(e, t.scroller.scrollLeft, !0), me(e, "scroll", e));
        }), q(t.scroller, "mousewheel", function(c) {
          return ms(e, c);
        }), q(t.scroller, "DOMMouseScroll", function(c) {
          return ms(e, c);
        }), q(t.wrapper, "scroll", function() {
          return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0;
        }), t.dragFunctions = {
          enter: function(c) {
            Te(e, c) || Hn(c);
          },
          over: function(c) {
            Te(e, c) || (cc(e, c), Hn(c));
          },
          start: function(c) {
            return fc(e, c);
          },
          drop: Ae(e, uc),
          leave: function(c) {
            Te(e, c) || $s(e);
          }
        };
        var u = t.input.getField();
        q(u, "keyup", function(c) {
          return ra.call(e, c);
        }), q(u, "keydown", Ae(e, na)), q(u, "keypress", Ae(e, ia)), q(u, "focus", function(c) {
          return ho(e, c);
        }), q(u, "blur", function(c) {
          return dn(e, c);
        });
      }
      var Oo = [];
      ce.defineInitHook = function(e) {
        return Oo.push(e);
      };
      function ur(e, t, r, n) {
        var i = e.doc, o;
        r == null && (r = "add"), r == "smart" && (i.mode.indent ? o = Wn(e, t).state : r = "prev");
        var s = e.options.tabSize, u = R(i, t), c = ye(u.text, null, s);
        u.stateAfter && (u.stateAfter = null);
        var h = u.text.match(/^\s*/)[0], y;
        if (!n && !/\S/.test(u.text))
          y = 0, r = "not";
        else if (r == "smart" && (y = i.mode.indent(o, u.text.slice(h.length), u.text), y == kr || y > 150)) {
          if (!n)
            return;
          r = "prev";
        }
        r == "prev" ? t > i.first ? y = ye(R(i, t - 1).text, null, s) : y = 0 : r == "add" ? y = c + e.options.indentUnit : r == "subtract" ? y = c - e.options.indentUnit : typeof r == "number" && (y = c + r), y = Math.max(0, y);
        var b = "", k = 0;
        if (e.options.indentWithTabs)
          for (var C = Math.floor(y / s); C; --C)
            k += s, b += "	";
        if (k < y && (b += Ai(y - k)), b != h)
          return bn(i, b, D(t, 0), D(t, h.length), "+input"), u.stateAfter = null, !0;
        for (var F = 0; F < i.sel.ranges.length; F++) {
          var A = i.sel.ranges[F];
          if (A.head.line == t && A.head.ch < h.length) {
            var M = D(t, h.length);
            To(i, F, new ie(M, M));
            break;
          }
        }
      }
      var ut = null;
      function ii(e) {
        ut = e;
      }
      function Io(e, t, r, n, i) {
        var o = e.doc;
        e.display.shift = !1, n || (n = o.sel);
        var s = +new Date() - 200, u = i == "paste" || e.state.pasteIncoming > s, c = Pi(t), h = null;
        if (u && n.ranges.length > 1)
          if (ut && ut.text.join(`
`) == t) {
            if (n.ranges.length % ut.text.length == 0) {
              h = [];
              for (var y = 0; y < ut.text.length; y++)
                h.push(o.splitLines(ut.text[y]));
            }
          } else
            c.length == n.ranges.length && e.options.pasteLinesPerSelection && (h = Tr(c, function(N) {
              return [N];
            }));
        for (var b = e.curOp.updateInput, k = n.ranges.length - 1; k >= 0; k--) {
          var C = n.ranges[k], F = C.from(), A = C.to();
          C.empty() && (r && r > 0 ? F = D(F.line, F.ch - r) : e.state.overwrite && !u ? A = D(A.line, Math.min(R(o, A.line).text.length, A.ch + oe(c).length)) : u && ut && ut.lineWise && ut.text.join(`
`) == c.join(`
`) && (F = A = D(F.line, 0)));
          var M = {
            from: F,
            to: A,
            text: h ? h[k % h.length] : c,
            origin: i || (u ? "paste" : e.state.cutIncoming > s ? "cut" : "+input")
          };
          mn(e.doc, M), Fe(e, "inputRead", e, M);
        }
        t && !u && ha(e, t), pn(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = b), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
      }
      function ca(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");
        if (r)
          return e.preventDefault(), !t.isReadOnly() && !t.options.disableInput && t.hasFocus() && Ze(t, function() {
            return Io(t, r, 0, null, "paste");
          }), !0;
      }
      function ha(e, t) {
        if (!(!e.options.electricChars || !e.options.smartIndent))
          for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
            var i = r.ranges[n];
            if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
              var o = e.getModeAt(i.head), s = !1;
              if (o.electricChars) {
                for (var u = 0; u < o.electricChars.length; u++)
                  if (t.indexOf(o.electricChars.charAt(u)) > -1) {
                    s = ur(e, i.head.line, "smart");
                    break;
                  }
              } else
                o.electricInput && o.electricInput.test(R(e.doc, i.head.line).text.slice(0, i.head.ch)) && (s = ur(e, i.head.line, "smart"));
              s && Fe(e, "electricInput", e, i.head.line);
            }
          }
      }
      function da(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
          var i = e.doc.sel.ranges[n].head.line, o = { anchor: D(i, 0), head: D(i + 1, 0) };
          r.push(o), t.push(e.getRange(o.anchor, o.head));
        }
        return { text: t, ranges: r };
      }
      function Ho(e, t, r, n) {
        e.setAttribute("autocorrect", r ? "on" : "off"), e.setAttribute("autocapitalize", n ? "on" : "off"), e.setAttribute("spellcheck", !!t);
      }
      function pa() {
        var e = U("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), t = U("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return T ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), J && (e.style.border = "1px solid black"), t;
      }
      function Pc(e) {
        var t = e.optionHandlers, r = e.helpers = {};
        e.prototype = {
          constructor: e,
          focus: function() {
            Oe(this).focus(), this.display.input.focus();
          },
          setOption: function(n, i) {
            var o = this.options, s = o[n];
            o[n] == i && n != "mode" || (o[n] = i, t.hasOwnProperty(n) && Ae(this, t[n])(this, i, s), me(this, "optionChange", this, n));
          },
          getOption: function(n) {
            return this.options[n];
          },
          getDoc: function() {
            return this.doc;
          },
          addKeyMap: function(n, i) {
            this.state.keyMaps[i ? "push" : "unshift"](ti(n));
          },
          removeKeyMap: function(n) {
            for (var i = this.state.keyMaps, o = 0; o < i.length; ++o)
              if (i[o] == n || i[o].name == n)
                return i.splice(o, 1), !0;
          },
          addOverlay: Be(function(n, i) {
            var o = n.token ? n : e.getMode(this.options, n);
            if (o.startState)
              throw new Error("Overlays may not be stateful.");
            Du(
              this.state.overlays,
              {
                mode: o,
                modeSpec: n,
                opaque: i && i.opaque,
                priority: i && i.priority || 0
              },
              function(s) {
                return s.priority;
              }
            ), this.state.modeGen++, qe(this);
          }),
          removeOverlay: Be(function(n) {
            for (var i = this.state.overlays, o = 0; o < i.length; ++o) {
              var s = i[o].modeSpec;
              if (s == n || typeof n == "string" && s.name == n) {
                i.splice(o, 1), this.state.modeGen++, qe(this);
                return;
              }
            }
          }),
          indentLine: Be(function(n, i, o) {
            typeof i != "string" && typeof i != "number" && (i == null ? i = this.options.smartIndent ? "smart" : "prev" : i = i ? "add" : "subtract"), Pn(this.doc, n) && ur(this, n, i, o);
          }),
          indentSelection: Be(function(n) {
            for (var i = this.doc.sel.ranges, o = -1, s = 0; s < i.length; s++) {
              var u = i[s];
              if (u.empty())
                u.head.line > o && (ur(this, u.head.line, n, !0), o = u.head.line, s == this.doc.sel.primIndex && pn(this));
              else {
                var c = u.from(), h = u.to(), y = Math.max(o, c.line);
                o = Math.min(this.lastLine(), h.line - (h.ch ? 0 : 1)) + 1;
                for (var b = y; b < o; ++b)
                  ur(this, b, n);
                var k = this.doc.sel.ranges;
                c.ch == 0 && i.length == k.length && k[s].from().ch > 0 && To(this.doc, s, new ie(c, k[s].to()), dt);
              }
            }
          }),
          getTokenAt: function(n, i) {
            return kl(this, n, i);
          },
          getLineTokens: function(n, i) {
            return kl(this, D(n), i, !0);
          },
          getTokenTypeAt: function(n) {
            n = Q(this.doc, n);
            var i = wl(this, R(this.doc, n.line)), o = 0, s = (i.length - 1) / 2, u = n.ch, c;
            if (u == 0)
              c = i[2];
            else
              for (; ; ) {
                var h = o + s >> 1;
                if ((h ? i[h * 2 - 1] : 0) >= u)
                  s = h;
                else if (i[h * 2 + 1] < u)
                  o = h + 1;
                else {
                  c = i[h * 2 + 2];
                  break;
                }
              }
            var y = c ? c.indexOf("overlay ") : -1;
            return y < 0 ? c : y == 0 ? null : c.slice(0, y - 1);
          },
          getModeAt: function(n) {
            var i = this.doc.mode;
            return i.innerMode ? e.innerMode(i, this.getTokenAt(n).state).mode : i;
          },
          getHelper: function(n, i) {
            return this.getHelpers(n, i)[0];
          },
          getHelpers: function(n, i) {
            var o = [];
            if (!r.hasOwnProperty(i))
              return o;
            var s = r[i], u = this.getModeAt(n);
            if (typeof u[i] == "string")
              s[u[i]] && o.push(s[u[i]]);
            else if (u[i])
              for (var c = 0; c < u[i].length; c++) {
                var h = s[u[i][c]];
                h && o.push(h);
              }
            else
              u.helperType && s[u.helperType] ? o.push(s[u.helperType]) : s[u.name] && o.push(s[u.name]);
            for (var y = 0; y < s._global.length; y++) {
              var b = s._global[y];
              b.pred(u, this) && re(o, b.val) == -1 && o.push(b.val);
            }
            return o;
          },
          getStateAfter: function(n, i) {
            var o = this.doc;
            return n = ml(o, n == null ? o.first + o.size - 1 : n), Wn(this, n + 1, i).state;
          },
          cursorCoords: function(n, i) {
            var o, s = this.doc.sel.primary();
            return n == null ? o = s.head : typeof n == "object" ? o = Q(this.doc, n) : o = n ? s.from() : s.to(), st(this, o, i || "page");
          },
          charCoords: function(n, i) {
            return _r(this, Q(this.doc, n), i || "page");
          },
          coordsChar: function(n, i) {
            return n = Vl(this, n, i || "page"), io(this, n.left, n.top);
          },
          lineAtHeight: function(n, i) {
            return n = Vl(this, { top: n, left: 0 }, i || "page").top, $t(this.doc, n + this.display.viewOffset);
          },
          heightAtLine: function(n, i, o) {
            var s = !1, u;
            if (typeof n == "number") {
              var c = this.doc.first + this.doc.size - 1;
              n < this.doc.first ? n = this.doc.first : n > c && (n = c, s = !0), u = R(this.doc, n);
            } else
              u = n;
            return Rr(this, u, { top: 0, left: 0 }, i || "page", o || s).top + (s ? this.doc.height - Ct(u) : 0);
          },
          defaultTextHeight: function() {
            return cn(this.display);
          },
          defaultCharWidth: function() {
            return hn(this.display);
          },
          getViewport: function() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          },
          addWidget: function(n, i, o, s, u) {
            var c = this.display;
            n = st(this, Q(this.doc, n));
            var h = n.bottom, y = n.left;
            if (i.style.position = "absolute", i.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(i), c.sizer.appendChild(i), s == "over")
              h = n.top;
            else if (s == "above" || s == "near") {
              var b = Math.max(c.wrapper.clientHeight, this.doc.height), k = Math.max(c.sizer.clientWidth, c.lineSpace.clientWidth);
              (s == "above" || n.bottom + i.offsetHeight > b) && n.top > i.offsetHeight ? h = n.top - i.offsetHeight : n.bottom + i.offsetHeight <= b && (h = n.bottom), y + i.offsetWidth > k && (y = k - i.offsetWidth);
            }
            i.style.top = h + "px", i.style.left = i.style.right = "", u == "right" ? (y = c.sizer.clientWidth - i.offsetWidth, i.style.right = "0px") : (u == "left" ? y = 0 : u == "middle" && (y = (c.sizer.clientWidth - i.offsetWidth) / 2), i.style.left = y + "px"), o && Of(this, { left: y, top: h, right: y + i.offsetWidth, bottom: h + i.offsetHeight });
          },
          triggerOnKeyDown: Be(na),
          triggerOnKeyPress: Be(ia),
          triggerOnKeyUp: ra,
          triggerOnMouseDown: Be(oa),
          execCommand: function(n) {
            if (or.hasOwnProperty(n))
              return or[n].call(null, this);
          },
          triggerElectric: Be(function(n) {
            ha(this, n);
          }),
          findPosH: function(n, i, o, s) {
            var u = 1;
            i < 0 && (u = -1, i = -i);
            for (var c = Q(this.doc, n), h = 0; h < i && (c = Po(this.doc, c, u, o, s), !c.hitSide); ++h)
              ;
            return c;
          },
          moveH: Be(function(n, i) {
            var o = this;
            this.extendSelectionsBy(function(s) {
              return o.display.shift || o.doc.extend || s.empty() ? Po(o.doc, s.head, n, i, o.options.rtlMoveVisually) : n < 0 ? s.from() : s.to();
            }, En);
          }),
          deleteH: Be(function(n, i) {
            var o = this.doc.sel, s = this.doc;
            o.somethingSelected() ? s.replaceSelection("", null, "+delete") : Sn(this, function(u) {
              var c = Po(s, u.head, n, i, !1);
              return n < 0 ? { from: c, to: u.head } : { from: u.head, to: c };
            });
          }),
          findPosV: function(n, i, o, s) {
            var u = 1, c = s;
            i < 0 && (u = -1, i = -i);
            for (var h = Q(this.doc, n), y = 0; y < i; ++y) {
              var b = st(this, h, "div");
              if (c == null ? c = b.left : b.left = c, h = ga(this, b, u, o), h.hitSide)
                break;
            }
            return h;
          },
          moveV: Be(function(n, i) {
            var o = this, s = this.doc, u = [], c = !this.display.shift && !s.extend && s.sel.somethingSelected();
            if (s.extendSelectionsBy(function(y) {
              if (c)
                return n < 0 ? y.from() : y.to();
              var b = st(o, y.head, "div");
              y.goalColumn != null && (b.left = y.goalColumn), u.push(b.left);
              var k = ga(o, b, n, i);
              return i == "page" && y == s.sel.primary() && go(o, _r(o, k, "div").top - b.top), k;
            }, En), u.length)
              for (var h = 0; h < s.sel.ranges.length; h++)
                s.sel.ranges[h].goalColumn = u[h];
          }),
          findWordAt: function(n) {
            var i = this.doc, o = R(i, n.line).text, s = n.ch, u = n.ch;
            if (o) {
              var c = this.getHelper(n, "wordChars");
              (n.sticky == "before" || u == o.length) && s ? --s : ++u;
              for (var h = o.charAt(s), y = Fr(h, c) ? function(b) {
                return Fr(b, c);
              } : /\s/.test(h) ? function(b) {
                return /\s/.test(b);
              } : function(b) {
                return !/\s/.test(b) && !Fr(b);
              }; s > 0 && y(o.charAt(s - 1)); )
                --s;
              for (; u < o.length && y(o.charAt(u)); )
                ++u;
            }
            return new ie(D(n.line, s), D(n.line, u));
          },
          toggleOverwrite: function(n) {
            n != null && n == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? W(this.display.cursorDiv, "CodeMirror-overwrite") : xt(this.display.cursorDiv, "CodeMirror-overwrite"), me(this, "overwriteToggle", this, this.state.overwrite));
          },
          hasFocus: function() {
            return this.display.input.getField() == g(ee(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: Be(function(n, i) {
            qn(this, n, i);
          }),
          getScrollInfo: function() {
            var n = this.display.scroller;
            return {
              left: n.scrollLeft,
              top: n.scrollTop,
              height: n.scrollHeight - vt(this) - this.display.barHeight,
              width: n.scrollWidth - vt(this) - this.display.barWidth,
              clientHeight: eo(this),
              clientWidth: jt(this)
            };
          },
          scrollIntoView: Be(function(n, i) {
            n == null ? (n = { from: this.doc.sel.primary().head, to: null }, i == null && (i = this.options.cursorScrollMargin)) : typeof n == "number" ? n = { from: D(n, 0), to: null } : n.from == null && (n = { from: n, to: null }), n.to || (n.to = n.from), n.margin = i || 0, n.from.line != null ? If(this, n) : as(this, n.from, n.to, n.margin);
          }),
          setSize: Be(function(n, i) {
            var o = this, s = function(c) {
              return typeof c == "number" || /^\d+$/.test(String(c)) ? c + "px" : c;
            };
            n != null && (this.display.wrapper.style.width = s(n)), i != null && (this.display.wrapper.style.height = s(i)), this.options.lineWrapping && Ql(this);
            var u = this.display.viewFrom;
            this.doc.iter(u, this.display.viewTo, function(c) {
              if (c.widgets) {
                for (var h = 0; h < c.widgets.length; h++)
                  if (c.widgets[h].noHScroll) {
                    Ot(o, u, "widget");
                    break;
                  }
              }
              ++u;
            }), this.curOp.forceUpdate = !0, me(this, "refresh", this);
          }),
          operation: function(n) {
            return Ze(this, n);
          },
          startOperation: function() {
            return Vt(this);
          },
          endOperation: function() {
            return en(this);
          },
          refresh: Be(function() {
            var n = this.display.cachedTextHeight;
            qe(this), this.curOp.forceUpdate = !0, Un(this), qn(this, this.doc.scrollLeft, this.doc.scrollTop), mo(this.display), (n == null || Math.abs(n - cn(this.display)) > 0.5 || this.options.lineWrapping) && ao(this), me(this, "refresh", this);
          }),
          swapDoc: Be(function(n) {
            var i = this.doc;
            return i.cm = null, this.state.selectingText && this.state.selectingText(), Ss(this, n), Un(this), this.display.input.reset(), qn(this, n.scrollLeft, n.scrollTop), this.curOp.forceScroll = !0, Fe(this, "swapDoc", this, i), i;
          }),
          phrase: function(n) {
            var i = this.options.phrases;
            return i && Object.prototype.hasOwnProperty.call(i, n) ? i[n] : n;
          },
          getInputField: function() {
            return this.display.input.getField();
          },
          getWrapperElement: function() {
            return this.display.wrapper;
          },
          getScrollerElement: function() {
            return this.display.scroller;
          },
          getGutterElement: function() {
            return this.display.gutters;
          }
        }, on(e), e.registerHelper = function(n, i, o) {
          r.hasOwnProperty(n) || (r[n] = e[n] = { _global: [] }), r[n][i] = o;
        }, e.registerGlobalHelper = function(n, i, o, s) {
          e.registerHelper(n, i, s), r[n]._global.push({ pred: o, val: s });
        };
      }
      function Po(e, t, r, n, i) {
        var o = t, s = r, u = R(e, t.line), c = i && e.direction == "rtl" ? -r : r;
        function h() {
          var I = t.line + c;
          return I < e.first || I >= e.first + e.size ? !1 : (t = new D(I, t.ch, t.sticky), u = R(e, I));
        }
        function y(I) {
          var O;
          if (n == "codepoint") {
            var P = u.text.charCodeAt(t.ch + (r > 0 ? 0 : -1));
            if (isNaN(P))
              O = null;
            else {
              var z = r > 0 ? P >= 55296 && P < 56320 : P >= 56320 && P < 57343;
              O = new D(t.line, Math.max(0, Math.min(u.text.length, t.ch + r * (z ? 2 : 1))), -r);
            }
          } else
            i ? O = yc(e.cm, u, t, r) : O = Ao(u, t, r);
          if (O == null)
            if (!I && h())
              t = Do(i, e.cm, u, t.line, c);
            else
              return !1;
          else
            t = O;
          return !0;
        }
        if (n == "char" || n == "codepoint")
          y();
        else if (n == "column")
          y(!0);
        else if (n == "word" || n == "group")
          for (var b = null, k = n == "group", C = e.cm && e.cm.getHelper(t, "wordChars"), F = !0; !(r < 0 && !y(!F)); F = !1) {
            var A = u.text.charAt(t.ch) || `
`, M = Fr(A, C) ? "w" : k && A == `
` ? "n" : !k || /\s/.test(A) ? null : "p";
            if (k && !F && !M && (M = "s"), b && b != M) {
              r < 0 && (r = 1, y(), t.sticky = "after");
              break;
            }
            if (M && (b = M), r > 0 && !y(!F))
              break;
          }
        var N = Jr(e, t, o, s, !0);
        return Gi(o, N) && (N.hitSide = !0), N;
      }
      function ga(e, t, r, n) {
        var i = e.doc, o = t.left, s;
        if (n == "page") {
          var u = Math.min(e.display.wrapper.clientHeight, Oe(e).innerHeight || i(e).documentElement.clientHeight), c = Math.max(u - 0.5 * cn(e.display), 3);
          s = (r > 0 ? t.bottom : t.top) + r * c;
        } else
          n == "line" && (s = r > 0 ? t.bottom + 3 : t.top - 3);
        for (var h; h = io(e, o, s), !!h.outside; ) {
          if (r < 0 ? s <= 0 : s >= i.height) {
            h.hitSide = !0;
            break;
          }
          s += r * 5;
        }
        return h;
      }
      var se = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Le(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };
      se.prototype.init = function(e) {
        var t = this, r = this, n = r.cm, i = r.div = e.lineDiv;
        i.contentEditable = !0, Ho(i, n.options.spellcheck, n.options.autocorrect, n.options.autocapitalize);
        function o(u) {
          for (var c = u.target; c; c = c.parentNode) {
            if (c == i)
              return !0;
            if (/\bCodeMirror-(?:line)?widget\b/.test(c.className))
              break;
          }
          return !1;
        }
        q(i, "paste", function(u) {
          !o(u) || Te(n, u) || ca(u, n) || L <= 11 && setTimeout(Ae(n, function() {
            return t.updateFromDOM();
          }), 20);
        }), q(i, "compositionstart", function(u) {
          t.composing = { data: u.data, done: !1 };
        }), q(i, "compositionupdate", function(u) {
          t.composing || (t.composing = { data: u.data, done: !1 });
        }), q(i, "compositionend", function(u) {
          t.composing && (u.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
        }), q(i, "touchstart", function() {
          return r.forceCompositionEnd();
        }), q(i, "input", function() {
          t.composing || t.readFromDOMSoon();
        });
        function s(u) {
          if (!(!o(u) || Te(n, u))) {
            if (n.somethingSelected())
              ii({ lineWise: !1, text: n.getSelections() }), u.type == "cut" && n.replaceSelection("", null, "cut");
            else if (n.options.lineWiseCopyCut) {
              var c = da(n);
              ii({ lineWise: !0, text: c.text }), u.type == "cut" && n.operation(function() {
                n.setSelections(c.ranges, 0, dt), n.replaceSelection("", null, "cut");
              });
            } else
              return;
            if (u.clipboardData) {
              u.clipboardData.clearData();
              var h = ut.text.join(`
`);
              if (u.clipboardData.setData("Text", h), u.clipboardData.getData("Text") == h) {
                u.preventDefault();
                return;
              }
            }
            var y = pa(), b = y.firstChild;
            Ho(b), n.display.lineSpace.insertBefore(y, n.display.lineSpace.firstChild), b.value = ut.text.join(`
`);
            var k = g(i.ownerDocument);
            j(b), setTimeout(function() {
              n.display.lineSpace.removeChild(y), k.focus(), k == i && r.showPrimarySelection();
            }, 50);
          }
        }
        q(i, "copy", s), q(i, "cut", s);
      }, se.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label");
      }, se.prototype.prepareSelection = function() {
        var e = os(this.cm, !1);
        return e.focus = g(this.div.ownerDocument) == this.div, e;
      }, se.prototype.showSelection = function(e, t) {
        !e || !this.cm.display.view.length || ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, se.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, se.prototype.showPrimarySelection = function() {
        var e = this.getSelection(), t = this.cm, r = t.doc.sel.primary(), n = r.from(), i = r.to();
        if (t.display.viewTo == t.display.viewFrom || n.line >= t.display.viewTo || i.line < t.display.viewFrom) {
          e.removeAllRanges();
          return;
        }
        var o = oi(t, e.anchorNode, e.anchorOffset), s = oi(t, e.focusNode, e.focusOffset);
        if (!(o && !o.bad && s && !s.bad && Y(Mr(o, s), n) == 0 && Y(Dr(o, s), i) == 0)) {
          var u = t.display.view, c = n.line >= t.display.viewFrom && va(t, n) || { node: u[0].measure.map[2], offset: 0 }, h = i.line < t.display.viewTo && va(t, i);
          if (!h) {
            var y = u[u.length - 1].measure, b = y.maps ? y.maps[y.maps.length - 1] : y.map;
            h = { node: b[b.length - 1], offset: b[b.length - 2] - b[b.length - 3] };
          }
          if (!c || !h) {
            e.removeAllRanges();
            return;
          }
          var k = e.rangeCount && e.getRangeAt(0), C;
          try {
            C = ht(c.node, c.offset, h.offset, h.node);
          } catch {
          }
          C && (!p && t.state.focused ? (e.collapse(c.node, c.offset), C.collapsed || (e.removeAllRanges(), e.addRange(C))) : (e.removeAllRanges(), e.addRange(C)), k && e.anchorNode == null ? e.addRange(k) : p && this.startGracePeriod()), this.rememberSelection();
        }
      }, se.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, se.prototype.showMultipleSelections = function(e) {
        Ue(this.cm.display.cursorDiv, e.cursors), Ue(this.cm.display.selectionDiv, e.selection);
      }, se.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, se.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount)
          return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return w(this.div, t);
      }, se.prototype.focus = function() {
        this.cm.options.readOnly != "nocursor" && ((!this.selectionInEditor() || g(this.div.ownerDocument) != this.div) && this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, se.prototype.blur = function() {
        this.div.blur();
      }, se.prototype.getField = function() {
        return this.div;
      }, se.prototype.supportsTouch = function() {
        return !0;
      }, se.prototype.receivedFocus = function() {
        var e = this, t = this;
        this.selectionInEditor() ? setTimeout(function() {
          return e.pollSelection();
        }, 20) : Ze(this.cm, function() {
          return t.cm.curOp.selectionChanged = !0;
        });
        function r() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, r));
        }
        this.polling.set(this.cm.options.pollInterval, r);
      }, se.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, se.prototype.pollSelection = function() {
        if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
          var e = this.getSelection(), t = this.cm;
          if (te && H && this.cm.display.gutterSpecs.length && Wc(e.anchorNode)) {
            this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var r = oi(t, e.anchorNode, e.anchorOffset), n = oi(t, e.focusNode, e.focusOffset);
            r && n && Ze(t, function() {
              Ie(t.doc, Ht(r, n), dt), (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, se.prototype.pollContent = function() {
        this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e = this.cm, t = e.display, r = e.doc.sel.primary(), n = r.from(), i = r.to();
        if (n.ch == 0 && n.line > e.firstLine() && (n = D(n.line - 1, R(e.doc, n.line - 1).length)), i.ch == R(e.doc, i.line).text.length && i.line < e.lastLine() && (i = D(i.line + 1, 0)), n.line < t.viewFrom || i.line > t.viewTo - 1)
          return !1;
        var o, s, u;
        n.line == t.viewFrom || (o = Qt(e, n.line)) == 0 ? (s = le(t.view[0].line), u = t.view[0].node) : (s = le(t.view[o].line), u = t.view[o - 1].node.nextSibling);
        var c = Qt(e, i.line), h, y;
        if (c == t.view.length - 1 ? (h = t.viewTo - 1, y = t.lineDiv.lastChild) : (h = le(t.view[c + 1].line) - 1, y = t.view[c + 1].node.previousSibling), !u)
          return !1;
        for (var b = e.doc.splitLines(Bc(e, u, y, s, h)), k = Kt(e.doc, D(s, 0), D(h, R(e.doc, h).text.length)); b.length > 1 && k.length > 1; )
          if (oe(b) == oe(k))
            b.pop(), k.pop(), h--;
          else if (b[0] == k[0])
            b.shift(), k.shift(), s++;
          else
            break;
        for (var C = 0, F = 0, A = b[0], M = k[0], N = Math.min(A.length, M.length); C < N && A.charCodeAt(C) == M.charCodeAt(C); )
          ++C;
        for (var I = oe(b), O = oe(k), P = Math.min(
          I.length - (b.length == 1 ? C : 0),
          O.length - (k.length == 1 ? C : 0)
        ); F < P && I.charCodeAt(I.length - F - 1) == O.charCodeAt(O.length - F - 1); )
          ++F;
        if (b.length == 1 && k.length == 1 && s == n.line)
          for (; C && C > n.ch && I.charCodeAt(I.length - F - 1) == O.charCodeAt(O.length - F - 1); )
            C--, F++;
        b[b.length - 1] = I.slice(0, I.length - F).replace(/^\u200b+/, ""), b[0] = b[0].slice(C).replace(/\u200b+$/, "");
        var z = D(s, C), _ = D(h, k.length ? oe(k).length - F : 0);
        if (b.length > 1 || b[0] || Y(z, _))
          return bn(e.doc, b, z, _, "+input"), !0;
      }, se.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      }, se.prototype.reset = function() {
        this.forceCompositionEnd();
      }, se.prototype.forceCompositionEnd = function() {
        !this.composing || (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, se.prototype.readFromDOMSoon = function() {
        var e = this;
        this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
          if (e.readDOMTimeout = null, e.composing)
            if (e.composing.done)
              e.composing = null;
            else
              return;
          e.updateFromDOM();
        }, 80));
      }, se.prototype.updateFromDOM = function() {
        var e = this;
        (this.cm.isReadOnly() || !this.pollContent()) && Ze(this.cm, function() {
          return qe(e.cm);
        });
      }, se.prototype.setUneditable = function(e) {
        e.contentEditable = "false";
      }, se.prototype.onKeyPress = function(e) {
        e.charCode == 0 || this.composing || (e.preventDefault(), this.cm.isReadOnly() || Ae(this.cm, Io)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0));
      }, se.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String(e != "nocursor");
      }, se.prototype.onContextMenu = function() {
      }, se.prototype.resetPosition = function() {
      }, se.prototype.needsContentAttribute = !0;
      function va(e, t) {
        var r = to(e, t.line);
        if (!r || r.hidden)
          return null;
        var n = R(e.doc, t.line), i = Kl(r, n, t.line), o = wt(n, e.doc.direction), s = "left";
        if (o) {
          var u = In(o, t.ch);
          s = u % 2 ? "right" : "left";
        }
        var c = Xl(i.map, t.ch, s);
        return c.offset = c.collapse == "right" ? c.end : c.start, c;
      }
      function Wc(e) {
        for (var t = e; t; t = t.parentNode)
          if (/CodeMirror-gutter-wrapper/.test(t.className))
            return !0;
        return !1;
      }
      function kn(e, t) {
        return t && (e.bad = !0), e;
      }
      function Bc(e, t, r, n, i) {
        var o = "", s = !1, u = e.doc.lineSeparator(), c = !1;
        function h(C) {
          return function(F) {
            return F.id == C;
          };
        }
        function y() {
          s && (o += u, c && (o += u), s = c = !1);
        }
        function b(C) {
          C && (y(), o += C);
        }
        function k(C) {
          if (C.nodeType == 1) {
            var F = C.getAttribute("cm-text");
            if (F) {
              b(F);
              return;
            }
            var A = C.getAttribute("cm-marker"), M;
            if (A) {
              var N = e.findMarks(D(n, 0), D(i + 1, 0), h(+A));
              N.length && (M = N[0].find(0)) && b(Kt(e.doc, M.from, M.to).join(u));
              return;
            }
            if (C.getAttribute("contenteditable") == "false")
              return;
            var I = /^(pre|div|p|li|table|br)$/i.test(C.nodeName);
            if (!/^br$/i.test(C.nodeName) && C.textContent.length == 0)
              return;
            I && y();
            for (var O = 0; O < C.childNodes.length; O++)
              k(C.childNodes[O]);
            /^(pre|p)$/i.test(C.nodeName) && (c = !0), I && (s = !0);
          } else
            C.nodeType == 3 && b(C.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
        for (; k(t), t != r; )
          t = t.nextSibling, c = !1;
        return o;
      }
      function oi(e, t, r) {
        var n;
        if (t == e.display.lineDiv) {
          if (n = e.display.lineDiv.childNodes[r], !n)
            return kn(e.clipPos(D(e.display.viewTo - 1)), !0);
          t = null, r = 0;
        } else
          for (n = t; ; n = n.parentNode) {
            if (!n || n == e.display.lineDiv)
              return null;
            if (n.parentNode && n.parentNode == e.display.lineDiv)
              break;
          }
        for (var i = 0; i < e.display.view.length; i++) {
          var o = e.display.view[i];
          if (o.node == n)
            return Rc(o, t, r);
        }
      }
      function Rc(e, t, r) {
        var n = e.text.firstChild, i = !1;
        if (!t || !w(n, t))
          return kn(D(le(e.line), 0), !0);
        if (t == n && (i = !0, t = n.childNodes[r], r = 0, !t)) {
          var o = e.rest ? oe(e.rest) : e.line;
          return kn(D(le(o), o.text.length), i);
        }
        var s = t.nodeType == 3 ? t : null, u = t;
        for (!s && t.childNodes.length == 1 && t.firstChild.nodeType == 3 && (s = t.firstChild, r && (r = s.nodeValue.length)); u.parentNode != n; )
          u = u.parentNode;
        var c = e.measure, h = c.maps;
        function y(M, N, I) {
          for (var O = -1; O < (h ? h.length : 0); O++)
            for (var P = O < 0 ? c.map : h[O], z = 0; z < P.length; z += 3) {
              var _ = P[z + 2];
              if (_ == M || _ == N) {
                var Z = le(O < 0 ? e.line : e.rest[O]), ae = P[z] + I;
                return (I < 0 || _ != M) && (ae = P[z + (I ? 1 : 0)]), D(Z, ae);
              }
            }
        }
        var b = y(s, u, r);
        if (b)
          return kn(b, i);
        for (var k = u.nextSibling, C = s ? s.nodeValue.length - r : 0; k; k = k.nextSibling) {
          if (b = y(k, k.firstChild, 0), b)
            return kn(D(b.line, b.ch - C), i);
          C += k.textContent.length;
        }
        for (var F = u.previousSibling, A = r; F; F = F.previousSibling) {
          if (b = y(F, F.firstChild, -1), b)
            return kn(D(b.line, b.ch + A), i);
          A += F.textContent.length;
        }
      }
      var ge = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Le(), this.hasSelection = !1, this.composing = null, this.resetting = !1;
      };
      ge.prototype.init = function(e) {
        var t = this, r = this, n = this.cm;
        this.createField(e);
        var i = this.textarea;
        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), J && (i.style.width = "0px"), q(i, "input", function() {
          S && L >= 9 && t.hasSelection && (t.hasSelection = null), r.poll();
        }), q(i, "paste", function(s) {
          Te(n, s) || ca(s, n) || (n.state.pasteIncoming = +new Date(), r.fastPoll());
        });
        function o(s) {
          if (!Te(n, s)) {
            if (n.somethingSelected())
              ii({ lineWise: !1, text: n.getSelections() });
            else if (n.options.lineWiseCopyCut) {
              var u = da(n);
              ii({ lineWise: !0, text: u.text }), s.type == "cut" ? n.setSelections(u.ranges, null, dt) : (r.prevInput = "", i.value = u.text.join(`
`), j(i));
            } else
              return;
            s.type == "cut" && (n.state.cutIncoming = +new Date());
          }
        }
        q(i, "cut", o), q(i, "copy", o), q(e.scroller, "paste", function(s) {
          if (!(kt(e, s) || Te(n, s))) {
            if (!i.dispatchEvent) {
              n.state.pasteIncoming = +new Date(), r.focus();
              return;
            }
            var u = new Event("paste");
            u.clipboardData = s.clipboardData, i.dispatchEvent(u);
          }
        }), q(e.lineSpace, "selectstart", function(s) {
          kt(e, s) || Ge(s);
        }), q(i, "compositionstart", function() {
          var s = n.getCursor("from");
          r.composing && r.composing.range.clear(), r.composing = {
            start: s,
            range: n.markText(s, n.getCursor("to"), { className: "CodeMirror-composing" })
          };
        }), q(i, "compositionend", function() {
          r.composing && (r.poll(), r.composing.range.clear(), r.composing = null);
        });
      }, ge.prototype.createField = function(e) {
        this.wrapper = pa(), this.textarea = this.wrapper.firstChild;
        var t = this.cm.options;
        Ho(this.textarea, t.spellcheck, t.autocorrect, t.autocapitalize);
      }, ge.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label");
      }, ge.prototype.prepareSelection = function() {
        var e = this.cm, t = e.display, r = e.doc, n = os(e);
        if (e.options.moveInputWithCursor) {
          var i = st(e, r.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), s = t.lineDiv.getBoundingClientRect();
          n.teTop = Math.max(0, Math.min(
            t.wrapper.clientHeight - 10,
            i.top + s.top - o.top
          )), n.teLeft = Math.max(0, Math.min(
            t.wrapper.clientWidth - 10,
            i.left + s.left - o.left
          ));
        }
        return n;
      }, ge.prototype.showSelection = function(e) {
        var t = this.cm, r = t.display;
        Ue(r.cursorDiv, e.cursors), Ue(r.selectionDiv, e.selection), e.teTop != null && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, ge.prototype.reset = function(e) {
        if (!(this.contextMenuPending || this.composing && e)) {
          var t = this.cm;
          if (this.resetting = !0, t.somethingSelected()) {
            this.prevInput = "";
            var r = t.getSelection();
            this.textarea.value = r, t.state.focused && j(this.textarea), S && L >= 9 && (this.hasSelection = r);
          } else
            e || (this.prevInput = this.textarea.value = "", S && L >= 9 && (this.hasSelection = null));
          this.resetting = !1;
        }
      }, ge.prototype.getField = function() {
        return this.textarea;
      }, ge.prototype.supportsTouch = function() {
        return !1;
      }, ge.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!fe || g(this.textarea.ownerDocument) != this.textarea))
          try {
            this.textarea.focus();
          } catch {
          }
      }, ge.prototype.blur = function() {
        this.textarea.blur();
      }, ge.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, ge.prototype.receivedFocus = function() {
        this.slowPoll();
      }, ge.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, ge.prototype.fastPoll = function() {
        var e = !1, t = this;
        t.pollingFast = !0;
        function r() {
          var n = t.poll();
          !n && !e ? (e = !0, t.polling.set(60, r)) : (t.pollingFast = !1, t.slowPoll());
        }
        t.polling.set(20, r);
      }, ge.prototype.poll = function() {
        var e = this, t = this.cm, r = this.textarea, n = this.prevInput;
        if (this.contextMenuPending || this.resetting || !t.state.focused || Wu(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq)
          return !1;
        var i = r.value;
        if (i == n && !t.somethingSelected())
          return !1;
        if (S && L >= 9 && this.hasSelection === i || ne && /[\uf700-\uf7ff]/.test(i))
          return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
          var o = i.charCodeAt(0);
          if (o == 8203 && !n && (n = "\u200B"), o == 8666)
            return this.reset(), this.cm.execCommand("undo");
        }
        for (var s = 0, u = Math.min(n.length, i.length); s < u && n.charCodeAt(s) == i.charCodeAt(s); )
          ++s;
        return Ze(t, function() {
          Io(
            t,
            i.slice(s),
            n.length - s,
            null,
            e.composing ? "*compose" : null
          ), i.length > 1e3 || i.indexOf(`
`) > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(
            e.composing.start,
            t.getCursor("to"),
            { className: "CodeMirror-composing" }
          ));
        }), !0;
      }, ge.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, ge.prototype.onKeyPress = function() {
        S && L >= 9 && (this.hasSelection = null), this.fastPoll();
      }, ge.prototype.onContextMenu = function(e) {
        var t = this, r = t.cm, n = r.display, i = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var o = Yt(r, e), s = n.scroller.scrollTop;
        if (!o || $)
          return;
        var u = r.options.resetSelectionOnContextMenu;
        u && r.doc.sel.contains(o) == -1 && Ae(r, Ie)(r.doc, Ht(o), dt);
        var c = i.style.cssText, h = t.wrapper.style.cssText, y = t.wrapper.offsetParent.getBoundingClientRect();
        t.wrapper.style.cssText = "position: static", i.style.cssText = `position: absolute; width: 30px; height: 30px;
      top: ` + (e.clientY - y.top - 5) + "px; left: " + (e.clientX - y.left - 5) + `px;
      z-index: 1000; background: ` + (S ? "rgba(255, 255, 255, .05)" : "transparent") + `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;
        var b;
        T && (b = i.ownerDocument.defaultView.scrollY), n.input.focus(), T && i.ownerDocument.defaultView.scrollTo(null, b), n.input.reset(), r.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = C, n.selForContextMenu = r.doc.sel, clearTimeout(n.detectingSelectAll);
        function k() {
          if (i.selectionStart != null) {
            var A = r.somethingSelected(), M = "\u200B" + (A ? i.value : "");
            i.value = "\u21DA", i.value = M, t.prevInput = A ? "" : "\u200B", i.selectionStart = 1, i.selectionEnd = M.length, n.selForContextMenu = r.doc.sel;
          }
        }
        function C() {
          if (t.contextMenuPending == C && (t.contextMenuPending = !1, t.wrapper.style.cssText = h, i.style.cssText = c, S && L < 9 && n.scrollbars.setScrollTop(n.scroller.scrollTop = s), i.selectionStart != null)) {
            (!S || S && L < 9) && k();
            var A = 0, M = function() {
              n.selForContextMenu == r.doc.sel && i.selectionStart == 0 && i.selectionEnd > 0 && t.prevInput == "\u200B" ? Ae(r, Hs)(r) : A++ < 10 ? n.detectingSelectAll = setTimeout(M, 500) : (n.selForContextMenu = null, n.input.reset());
            };
            n.detectingSelectAll = setTimeout(M, 200);
          }
        }
        if (S && L >= 9 && k(), Ye) {
          Hn(e);
          var F = function() {
            et(window, "mouseup", F), setTimeout(C, 20);
          };
          q(window, "mouseup", F);
        } else
          setTimeout(C, 50);
      }, ge.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = e == "nocursor", this.textarea.readOnly = !!e;
      }, ge.prototype.setUneditable = function() {
      }, ge.prototype.needsContentAttribute = !1;
      function _c(e, t) {
        if (t = t ? We(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), t.autofocus == null) {
          var r = g(e.ownerDocument);
          t.autofocus = r == e || e.getAttribute("autofocus") != null && r == document.body;
        }
        function n() {
          e.value = u.getValue();
        }
        var i;
        if (e.form && (q(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
          var o = e.form;
          i = o.submit;
          try {
            var s = o.submit = function() {
              n(), o.submit = i, o.submit(), o.submit = s;
            };
          } catch {
          }
        }
        t.finishInit = function(c) {
          c.save = n, c.getTextArea = function() {
            return e;
          }, c.toTextArea = function() {
            c.toTextArea = isNaN, n(), e.parentNode.removeChild(c.getWrapperElement()), e.style.display = "", e.form && (et(e.form, "submit", n), !t.leaveSubmitMethodAlone && typeof e.form.submit == "function" && (e.form.submit = i));
          };
        }, e.style.display = "none";
        var u = ce(
          function(c) {
            return e.parentNode.insertBefore(c, e.nextSibling);
          },
          t
        );
        return u;
      }
      function zc(e) {
        e.off = et, e.on = q, e.wheelEventPixels = Xf, e.Doc = Ke, e.splitLines = Pi, e.countColumn = ye, e.findColumn = Fi, e.isWordChar = Di, e.Pass = kr, e.signal = me, e.Line = an, e.changeEnd = Pt, e.scrollbarModel = cs, e.Pos = D, e.cmpPos = Y, e.modes = Bi, e.mimeModes = ln, e.resolveMode = Ar, e.getMode = Ri, e.modeExtensions = sn, e.extendMode = Uu, e.copyState = qt, e.startState = yl, e.innerMode = _i, e.commands = or, e.keyMap = Tt, e.keyName = Zs, e.isModifierKey = Ys, e.lookupKey = wn, e.normalizeKeyMap = vc, e.StringStream = be, e.SharedTextMarker = nr, e.TextMarker = Bt, e.LineWidget = tr, e.e_preventDefault = Ge, e.e_stopPropagation = gl, e.e_stop = Hn, e.addClass = W, e.contains = w, e.rmClass = xt, e.keyNames = Rt;
      }
      Nc(ce), Pc(ce);
      var Uc = "iter insert remove copy getEditor constructor".split(" ");
      for (var li in Ke.prototype)
        Ke.prototype.hasOwnProperty(li) && re(Uc, li) < 0 && (ce.prototype[li] = function(e) {
          return function() {
            return e.apply(this.doc, arguments);
          };
        }(Ke.prototype[li]));
      return on(Ke), ce.inputStyles = { textarea: ge, contenteditable: se }, ce.defineMode = function(e) {
        !ce.defaults.mode && e != "null" && (ce.defaults.mode = e), _u.apply(this, arguments);
      }, ce.defineMIME = zu, ce.defineMode("null", function() {
        return { token: function(e) {
          return e.skipToEnd();
        } };
      }), ce.defineMIME("text/plain", "null"), ce.defineExtension = function(e, t) {
        ce.prototype[e] = t;
      }, ce.defineDocExtension = function(e, t) {
        Ke.prototype[e] = t;
      }, ce.fromTextArea = _c, zc(ce), ce.version = "5.65.12", ce;
    });
  }(zo)), zo.exports;
}
var nt = ru();
(function(l, a) {
  (function(f) {
    f(ru());
  })(function(f) {
    function d(m, x, S) {
      this.orientation = x, this.scroll = S, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = m + "-" + x, this.inner = this.node.appendChild(document.createElement("div"));
      var L = this;
      f.on(this.inner, "mousedown", function(E) {
        if (E.which != 1)
          return;
        f.e_preventDefault(E);
        var H = L.orientation == "horizontal" ? "pageX" : "pageY", X = E[H], $ = L.pos;
        function V() {
          f.off(document, "mousemove", de), f.off(document, "mouseup", V);
        }
        function de(ue) {
          if (ue.which != 1)
            return V();
          L.moveTo($ + (ue[H] - X) * (L.total / L.size));
        }
        f.on(document, "mousemove", de), f.on(document, "mouseup", V);
      }), f.on(this.node, "click", function(E) {
        f.e_preventDefault(E);
        var H = L.inner.getBoundingClientRect(), X;
        L.orientation == "horizontal" ? X = E.clientX < H.left ? -1 : E.clientX > H.right ? 1 : 0 : X = E.clientY < H.top ? -1 : E.clientY > H.bottom ? 1 : 0, L.moveTo(L.pos + X * L.screen);
      });
      function T(E) {
        var H = f.wheelEventPixels(E)[L.orientation == "horizontal" ? "x" : "y"], X = L.pos;
        L.moveTo(L.pos + H), L.pos != X && f.e_preventDefault(E);
      }
      f.on(this.node, "mousewheel", T), f.on(this.node, "DOMMouseScroll", T);
    }
    d.prototype.setPos = function(m, x) {
      return m < 0 && (m = 0), m > this.total - this.screen && (m = this.total - this.screen), !x && m == this.pos ? !1 : (this.pos = m, this.inner.style[this.orientation == "horizontal" ? "left" : "top"] = m * (this.size / this.total) + "px", !0);
    }, d.prototype.moveTo = function(m) {
      this.setPos(m) && this.scroll(m, this.orientation);
    };
    var p = 10;
    d.prototype.update = function(m, x, S) {
      var L = this.screen != x || this.total != m || this.size != S;
      L && (this.screen = x, this.total = m, this.size = S);
      var T = this.screen * (this.size / this.total);
      T < p && (this.size -= p - T, T = p), this.inner.style[this.orientation == "horizontal" ? "width" : "height"] = T + "px", this.setPos(this.pos, L);
    };
    function v(m, x, S) {
      this.addClass = m, this.horiz = new d(m, "horizontal", S), x(this.horiz.node), this.vert = new d(m, "vertical", S), x(this.vert.node), this.width = null;
    }
    v.prototype.update = function(m) {
      if (this.width == null) {
        var x = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
        x && (this.width = parseInt(x.height));
      }
      var S = this.width || 0, L = m.scrollWidth > m.clientWidth + 1, T = m.scrollHeight > m.clientHeight + 1;
      return this.vert.node.style.display = T ? "block" : "none", this.horiz.node.style.display = L ? "block" : "none", T && (this.vert.update(
        m.scrollHeight,
        m.clientHeight,
        m.viewHeight - (L ? S : 0)
      ), this.vert.node.style.bottom = L ? S + "px" : "0"), L && (this.horiz.update(
        m.scrollWidth,
        m.clientWidth,
        m.viewWidth - (T ? S : 0) - m.barLeft
      ), this.horiz.node.style.right = T ? S + "px" : "0", this.horiz.node.style.left = m.barLeft + "px"), { right: T ? S : 0, bottom: L ? S : 0 };
    }, v.prototype.setScrollTop = function(m) {
      this.vert.setPos(m);
    }, v.prototype.setScrollLeft = function(m) {
      this.horiz.setPos(m);
    }, v.prototype.clear = function() {
      var m = this.horiz.node.parentNode;
      m.removeChild(this.horiz.node), m.removeChild(this.vert.node);
    }, f.scrollbarModel.simple = function(m, x) {
      return new v("CodeMirror-simplescroll", m, x);
    }, f.scrollbarModel.overlay = function(m, x) {
      return new v("CodeMirror-overlayscroll", m, x);
    };
  });
})();
nt.defineMode("markdown", (l, a) => {
  const f = nt.getMode(l, "text/html"), d = f.name === "null";
  function p(w) {
    const g = nt.getMode(l, w);
    return g.name === "null" ? null : g;
  }
  a.highlightFormatting === void 0 && (a.highlightFormatting = !1), a.maxBlockquoteDepth === void 0 && (a.maxBlockquoteDepth = 0), a.taskLists === void 0 && (a.taskLists = !1), a.strikethrough === void 0 && (a.strikethrough = !1), a.emoji === void 0 && (a.emoji = !1), a.fencedCodeBlockHighlighting === void 0 && (a.fencedCodeBlockHighlighting = !0), a.fencedCodeBlockDefaultMode === void 0 && (a.fencedCodeBlockDefaultMode = "text/plain"), a.xml === void 0 && (a.xml = !0), a.tokenTypeOverrides === void 0 && (a.tokenTypeOverrides = {});
  const v = {
    header: "header",
    code: "comment",
    quote: "quote",
    list1: "variable-2",
    list2: "variable-3",
    list3: "keyword",
    hr: "hr",
    image: "image",
    imageAltText: "image-alt-text",
    imageMarker: "image-marker",
    formatting: "formatting",
    linkInline: "link",
    linkEmail: "link",
    linkText: "link",
    linkHref: "string",
    em: "em",
    strong: "strong",
    strikethrough: "strikethrough",
    emoji: "builtin"
  };
  for (const w in v)
    Object.prototype.hasOwnProperty.call(v, w) && a.tokenTypeOverrides[w] && (v[w] = a.tokenTypeOverrides[w]);
  const m = /^([*_-])(?:\s*\1){2,}\s*$/, x = /^(?:[*+-]|^\d+([).]))\s+/, S = /^\[(x| )](?=\s)/i, L = a.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, T = /^ {0,3}(?:=+|-{2,})\s*$/, E = /^[^ !"#'(*:<>[\\\]_`~]+/, H = /^(~~~+|```+)[\t ]*([\w#+/-]*)[^\n`]*$/, X = /^\s*\[[^\]]+?]:.*$/, $ = /[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65-]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/, V = "    ";
  function de(w, g, W) {
    return g.f = g.inline = W, W(w, g);
  }
  function ue(w, g, W) {
    return g.f = g.block = W, W(w, g);
  }
  function J(w) {
    return !w || !/\S/.test(w.string);
  }
  function te(w) {
    if (w.linkTitle = !1, w.linkHref = !1, w.linkText = !1, w.em = !1, w.strong = !1, w.strikethrough = !1, w.quote = 0, w.indentedCode = !1, w.f === ne) {
      let g = d;
      if (!g) {
        const W = nt.innerMode(f, w.htmlState);
        g = W.mode.name === "xml" && W.state.tagStart === null && !W.state.context && W.state.tokenize.isInText;
      }
      g && (w.f = Se, w.block = fe, w.htmlState = null);
    }
    return w.trailingSpace = 0, w.trailingSpaceNewLine = !1, w.prevLine = w.thisLine, w.thisLine = { stream: null }, null;
  }
  function fe(w, g) {
    const W = w.column() === g.indentation, G = J(g.prevLine.stream), j = g.indentedCode, ee = g.prevLine.hr, Oe = g.list !== !1, Qe = (g.listStack[g.listStack.length - 1] || 0) + 3;
    g.indentedCode = !1;
    const We = g.indentation;
    if (g.indentationDiff === null && (g.indentationDiff = g.indentation, Oe)) {
      for (g.list = null; We < g.listStack[g.listStack.length - 1]; )
        g.listStack.pop(), g.listStack.length > 0 ? g.indentation = g.listStack[g.listStack.length - 1] : g.list = !1;
      g.list !== !1 && (g.indentationDiff = We - g.listStack[g.listStack.length - 1]);
    }
    const ye = !G && !ee && !g.prevLine.header && (!Oe || !j) && !g.prevLine.fencedCodeEnd, Le = (g.list === !1 || ee || G) && g.indentation <= Qe && w.match(m);
    let re = null;
    if (g.indentationDiff >= 4 && (j || g.prevLine.fencedCodeEnd || g.prevLine.header || G))
      return w.skipToEnd(), g.indentedCode = !0, v.code;
    if (w.eatSpace())
      return null;
    if (W && g.indentation <= Qe && (re = w.match(L)) && re[1].length <= 6)
      return g.quote = 0, g.header = re[1].length, g.thisLine.header = !0, a.highlightFormatting && (g.formatting = "header"), g.f = g.inline, B(g);
    if (g.indentation <= Qe && w.eat(">"))
      return (["i", "!", "@", "y", "x"].includes(w.string[1]) && w.string[2] === " " || w.string[1] === " ") && (g.quote = W ? 1 : g.quote + 1), a.highlightFormatting && (g.formatting = "quote"), w.eatSpace(), B(g);
    if (!Le && !g.setext && W && g.indentation <= Qe && (re = w.match(x))) {
      const Cr = re[1] ? "ol" : "ul";
      return g.indentation = We + w.current().length, g.list = !0, g.quote = 0, g.listStack.push(g.indentation), g.em = !1, g.strong = !1, g.code = !1, g.strikethrough = !1, a.taskLists && w.match(S, !1) && (g.taskList = !0), g.f = g.inline, a.highlightFormatting && (g.formatting = ["list", `list-${Cr}`]), B(g);
    } else {
      if (W && g.indentation <= Qe && (re = w.match(H, !0)))
        return g.quote = 0, g.fencedEndRE = new RegExp(`${re[1]}+ *$`), g.localMode = a.fencedCodeBlockHighlighting && p(re[2] || a.fencedCodeBlockDefaultMode), g.localMode && (g.localState = nt.startState(g.localMode)), g.f = g.block = K, a.highlightFormatting && (g.formatting = "code-block"), g.code = -1, B(g);
      if (g.setext || (!ye || !Oe) && !g.quote && g.list === !1 && !g.code && !Le && !X.test(w.string) && (re = w.lookAhead(1)) && (re = re.match(T)))
        return !g.setext && re ? (g.header = re[0].charAt(0) === "=" ? 1 : 2, g.setext = g.header) : (g.header = g.setext, g.setext = 0, w.skipToEnd(), a.highlightFormatting && (g.formatting = "header")), g.thisLine.header = !0, g.f = g.inline, B(g);
      if (Le)
        return w.skipToEnd(), g.hr = !0, g.thisLine.hr = !0, v.hr;
      if (w.peek() === "[")
        return de(w, g, Ue);
    }
    return de(w, g, g.inline);
  }
  function ne(w, g) {
    const W = f.token(w, g.htmlState);
    if (!d) {
      const G = nt.innerMode(f, g.htmlState);
      (G.mode.name === "xml" && G.state.tagStart === null && !G.state.context && G.state.tokenize.isInText || g.md_inside && w.current().includes(">")) && (g.f = Se, g.block = fe, g.htmlState = null);
    }
    return W;
  }
  function K(w, g) {
    const W = g.listStack[g.listStack.length - 1] || 0, G = g.indentation < W, j = W + 3;
    if (g.fencedEndRE && g.indentation <= j && (G || w.match(g.fencedEndRE))) {
      a.highlightFormatting && (g.formatting = "code-block");
      let ee;
      return G || (ee = B(g)), g.localMode = g.localState = null, g.block = fe, g.f = Se, g.fencedEndRE = null, g.code = 0, g.thisLine.fencedCodeEnd = !0, G ? ue(w, g, g.block) : ee;
    } else
      return g.localMode ? g.localMode.token(w, g.localState) : (w.skipToEnd(), v.code);
  }
  function B(w) {
    const g = [];
    if (w.formatting) {
      g.push(v.formatting), typeof w.formatting == "string" && (w.formatting = [w.formatting]);
      for (let W = 0; W < w.formatting.length; W++)
        g.push(`${v.formatting}-${w.formatting[W]}`), w.formatting[W] === "header" && g.push(
          `${v.formatting}-${w.formatting[W]}-${w.header}`
        ), w.formatting[W] === "quote" && (!a.maxBlockquoteDepth || a.maxBlockquoteDepth >= w.quote ? g.push(
          `${v.formatting}-${w.formatting[W]}-${w.quote}`
        ) : g.push("error"));
    }
    if (w.taskOpen)
      return g.push("meta"), g.length > 0 ? g.join(" ") : null;
    if (w.taskClosed)
      return g.push("property"), g.length > 0 ? g.join(" ") : null;
    if (w.linkHref ? g.push(v.linkHref, "url") : (w.strong && g.push(v.strong), w.em && g.push(v.em), w.strikethrough && g.push(v.strikethrough), w.emoji && g.push(v.emoji), w.linkText && g.push(v.linkText), w.code && g.push(v.code), w.image && g.push(v.image), w.imageAltText && g.push(v.imageAltText, "link"), w.imageMarker && g.push(v.imageMarker)), w.header && g.push(v.header, `${v.header}-${w.header}`), w.quote && (g.push(v.quote), !a.maxBlockquoteDepth || a.maxBlockquoteDepth >= w.quote ? g.push(`${v.quote}-${w.quote}`) : g.push(`${v.quote}-${a.maxBlockquoteDepth}`)), w.list !== !1) {
      const W = (w.listStack.length - 1) % 3;
      W ? W === 1 ? g.push(v.list2) : g.push(v.list3) : g.push(v.list1);
    }
    return w.trailingSpaceNewLine ? g.push("trailing-space-new-line") : w.trailingSpace && g.push(`trailing-space-${w.trailingSpace % 2 ? "a" : "b"}`), g.length > 0 ? g.join(" ") : null;
  }
  function ve(w, g) {
    if (w.match(E, !0))
      return B(g);
  }
  function Se(w, g) {
    const W = g.text(w, g);
    if (typeof W < "u")
      return W;
    if (g.list)
      return g.list = null, B(g);
    if (g.taskList)
      return w.match(S, !0)[1] === " " ? g.taskOpen = !0 : g.taskClosed = !0, a.highlightFormatting && (g.formatting = "task"), g.taskList = !1, B(g);
    if (g.taskOpen = !1, g.taskClosed = !1, g.header && w.match(/^#+$/, !0))
      return a.highlightFormatting && (g.formatting = "header"), B(g);
    const G = w.next();
    if (g.linkTitle) {
      g.linkTitle = !1;
      let j = G;
      G === "(" && (j = ")"), j = `${j}`.replace(/([()*+.?[\\\]^{|}-])/g, "\\$1");
      const ee = `^\\s*(?:[^${j}\\\\]+|\\\\\\\\|\\\\.)${j}`;
      if (w.match(new RegExp(ee), !0))
        return v.linkHref;
    }
    if (G === "`") {
      const j = g.formatting;
      a.highlightFormatting && (g.formatting = "code"), w.eatWhile("`");
      const ee = w.current().length;
      if (g.code === 0 && (!g.quote || ee === 1))
        return g.code = ee, B(g);
      if (ee === g.code) {
        const Oe = B(g);
        return g.code = 0, Oe;
      } else
        return g.formatting = j, B(g);
    } else if (g.code)
      return B(g);
    if (G === "\\" && (w.next(), a.highlightFormatting)) {
      const j = B(g), ee = `${v.formatting}-escape`;
      return j ? `${j} ${ee}` : ee;
    }
    if (G === "!" && w.match(/\[[^\]]*] ?[([]/, !1))
      return g.imageMarker = !0, g.image = !0, a.highlightFormatting && (g.formatting = "image"), B(g);
    if (G === "[" && g.imageMarker && w.match(/[^\]]*](\(.*?\)| ?\[.*?])/, !1))
      return g.imageMarker = !1, g.imageAltText = !0, a.highlightFormatting && (g.formatting = "image"), B(g);
    if (G === "]" && g.imageAltText) {
      a.highlightFormatting && (g.formatting = "image");
      const j = B(g);
      return g.imageAltText = !1, g.image = !1, g.inline = g.f = bt, j;
    }
    if (G === "[" && !g.image)
      return g.linkText && w.match(/^.*?]/) || (g.linkText = !0, a.highlightFormatting && (g.formatting = "link")), B(g);
    if (G === "]" && g.linkText) {
      a.highlightFormatting && (g.formatting = "link");
      const j = B(g);
      return g.linkText = !1, g.inline = g.f = w.match(/\(.*?\)| ?\[.*?]/, !1) ? bt : Se, j;
    }
    if (G === "<" && w.match(/^(https?|ftps?):\/\/(?:[^>\\]|\\.)+>/, !1)) {
      g.f = g.inline = Ye, a.highlightFormatting && (g.formatting = "link");
      let j = B(g);
      return j ? j += " " : j = "", j + v.linkInline;
    }
    if (G === "<" && w.match(/^[^ >\\]+@(?:[^>\\]|\\.)+>/, !1)) {
      g.f = g.inline = Ye, a.highlightFormatting && (g.formatting = "link");
      let j = B(g);
      return j ? j += " " : j = "", j + v.linkEmail;
    }
    if (a.xml && G === "<" && w.match(
      /^(!--|\?|!\[cdata\[|[a-z][\da-z-]*(?:\s+[.:_a-z-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
      !1
    )) {
      const j = w.string.indexOf(">", w.pos);
      if (j !== -1) {
        const ee = w.string.slice(w.start, j);
        /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(ee) && (g.md_inside = !0);
      }
      return w.backUp(1), g.htmlState = nt.startState(f), ue(w, g, ne);
    }
    if (a.xml && G === "<" && w.match(/^\/\w*?>/))
      return g.md_inside = !1, "tag";
    if (G === "*" || G === "_") {
      let j = 1;
      const ee = w.pos === 1 ? " " : w.string.charAt(w.pos - 2);
      for (; j < 3 && w.eat(G); )
        j++;
      const Oe = w.peek() || " ", Qe = !/\s/.test(Oe) && (!$.test(Oe) || /\s/.test(ee) || $.test(ee)), We = !/\s/.test(ee) && (!$.test(ee) || /\s/.test(Oe) || $.test(Oe));
      let ye = null, Le = null;
      if (j % 2 && (!g.em && Qe && (G === "*" || !We || $.test(ee)) ? ye = !0 : g.em === G && We && (G === "*" || !Qe || $.test(Oe)) && (ye = !1)), j > 1 && (!g.strong && Qe && (G === "*" || !We || $.test(ee)) ? Le = !0 : g.strong === G && We && (G === "*" || !Qe || $.test(Oe)) && (Le = !1)), Le != null || ye != null) {
        a.highlightFormatting && (g.formatting = ye == null ? "strong" : Le == null ? "em" : "strong em"), ye === !0 && (g.em = G), Le === !0 && (g.strong = G);
        const re = B(g);
        return ye === !1 && (g.em = !1), Le === !1 && (g.strong = !1), re;
      }
    } else if (G === " " && (w.eat("*") || w.eat("_"))) {
      if (w.peek() === " ")
        return B(g);
      w.backUp(1);
    }
    if (a.strikethrough) {
      if (G === "~" && w.eatWhile(G)) {
        if (g.strikethrough) {
          a.highlightFormatting && (g.formatting = "strikethrough");
          const j = B(g);
          return g.strikethrough = !1, j;
        } else if (w.match(/^\S/, !1))
          return g.strikethrough = !0, a.highlightFormatting && (g.formatting = "strikethrough"), B(g);
      } else if (G === " " && w.match("~~", !0)) {
        if (w.peek() === " ")
          return B(g);
        w.backUp(2);
      }
    }
    if (a.emoji && G === ":" && w.match(/^(?:[\d+_a-z][\d+_a-z-]*|-[\d+_a-z][\d+_a-z-]*):/)) {
      g.emoji = !0, a.highlightFormatting && (g.formatting = "emoji");
      const j = B(g);
      return g.emoji = !1, j;
    }
    return G === " " && (w.match(/^ +$/, !1) ? g.trailingSpace++ : g.trailingSpace && (g.trailingSpaceNewLine = !0)), B(g);
  }
  function Ye(w, g) {
    if (w.next() === ">") {
      g.f = g.inline = Se, a.highlightFormatting && (g.formatting = "link");
      let G = B(g);
      return G ? G += " " : G = "", G + v.linkInline;
    }
    return w.match(/^[^>]+/, !0), v.linkInline;
  }
  function bt(w, g) {
    if (w.eatSpace())
      return null;
    const W = w.next();
    return W === "(" || W === "[" ? (g.f = g.inline = ct(W === "(" ? ")" : "]"), a.highlightFormatting && (g.formatting = "link-string"), g.linkHref = !0, B(g)) : "error";
  }
  const xt = {
    ")": /^(?:[^()\\]|\\.|\((?:[^()\\]|\\.)*\))*?(?=\))/,
    "]": /^(?:[^[\\\]]|\\.|\[(?:[^[\\\]]|\\.)*])*?(?=])/
  };
  function ct(w) {
    return function(g, W) {
      if (g.next() === w) {
        W.f = W.inline = Se, a.highlightFormatting && (W.formatting = "link-string");
        const j = B(W);
        return W.linkHref = !1, j;
      }
      return g.match(xt[w]), W.linkHref = !0, B(W);
    };
  }
  function Ue(w, g) {
    return w.match(/^([^\\\]]|\\.)*]:/, !1) ? (g.f = U, w.next(), a.highlightFormatting && (g.formatting = "link"), g.linkText = !0, B(g)) : de(w, g, Se);
  }
  function U(w, g) {
    if (w.match("]:", !0)) {
      g.f = g.inline = Et, a.highlightFormatting && (g.formatting = "link");
      const W = B(g);
      return g.linkText = !1, W;
    }
    return w.match(/^([^\\\]]|\\.)+/, !0), v.linkText;
  }
  function Et(w, g) {
    return w.eatSpace() ? null : (w.match(/^\S+/, !0), w.peek() === void 0 ? g.linkTitle = !0 : w.match(
      /^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/,
      !0
    ), g.f = g.inline = Se, `${v.linkHref} url`);
  }
  const ht = {
    startState() {
      return {
        f: fe,
        prevLine: { stream: null },
        thisLine: { stream: null },
        block: fe,
        htmlState: null,
        indentation: 0,
        inline: Se,
        text: ve,
        formatting: !1,
        linkText: !1,
        linkHref: !1,
        linkTitle: !1,
        code: 0,
        em: !1,
        strong: !1,
        header: 0,
        setext: 0,
        hr: !1,
        taskList: !1,
        list: !1,
        listStack: [],
        quote: 0,
        trailingSpace: 0,
        trailingSpaceNewLine: !1,
        strikethrough: !1,
        emoji: !1,
        fencedEndRE: null
      };
    },
    copyState(w) {
      return {
        f: w.f,
        prevLine: w.prevLine,
        thisLine: w.thisLine,
        block: w.block,
        htmlState: w.htmlState && nt.copyState(f, w.htmlState),
        indentation: w.indentation,
        localMode: w.localMode,
        localState: w.localMode ? nt.copyState(w.localMode, w.localState) : null,
        inline: w.inline,
        text: w.text,
        formatting: !1,
        linkText: w.linkText,
        linkTitle: w.linkTitle,
        linkHref: w.linkHref,
        code: w.code,
        em: w.em,
        strong: w.strong,
        strikethrough: w.strikethrough,
        emoji: w.emoji,
        header: w.header,
        setext: w.setext,
        hr: w.hr,
        taskList: w.taskList,
        list: w.list,
        listStack: w.listStack.slice(0),
        quote: w.quote,
        indentedCode: w.indentedCode,
        trailingSpace: w.trailingSpace,
        trailingSpaceNewLine: w.trailingSpaceNewLine,
        md_inside: w.md_inside,
        fencedEndRE: w.fencedEndRE
      };
    },
    token(w, g) {
      if (g.formatting = !1, w !== g.thisLine.stream) {
        if (g.header = 0, g.hr = !1, w.match(/^\s*$/, !0))
          return te(g), null;
        if (g.prevLine = g.thisLine, g.thisLine = { stream: w }, g.taskList = !1, g.trailingSpace = 0, g.trailingSpaceNewLine = !1, !g.localState && (g.f = g.block, g.f !== ne)) {
          const W = w.match(/^\s*/, !0)[0].replace(/\t/g, V).length;
          if (g.indentation = W, g.indentationDiff = null, W > 0)
            return null;
        }
      }
      return g.f(w, g);
    },
    innerMode(w) {
      return w.block === ne ? { state: w.htmlState, mode: f } : w.localState ? { state: w.localState, mode: w.localMode } : { state: w, mode: ht };
    },
    indent(w, g, W) {
      return w.block === ne && f.indent ? f.indent(w.htmlState, g, W) : w.localState && w.localMode.indent ? w.localMode.indent(w.localState, g, W) : nt.Pass;
    },
    blankLine: te,
    getType: B,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",
    closeBrackets: "()[]{}''\"\"``",
    fold: "markdown"
  };
  return ht;
});
nt.defineMIME("text/markdown", "markdown");
nt.defineMIME("text/x-markdown", "markdown");
const Jh = "gedi_409d3", Vh = "gedi_8863d", ed = "gedi_77ff2", td = "gedi_7503c", it = {
  "out-wrapper": "gedi_0cacc",
  dark: Jh,
  "show-preview": "gedi_057f0",
  editor: Vh,
  preview: ed,
  toolbar: td,
  "editor-wrapper": "gedi_a19e0",
  "preview-content": "gedi_0e920"
}, nd = "gedi_56241", rd = "gedi_dc161", id = "gedi_55c98", At = {
  "toolbar-wrapper": "gedi_00985",
  "toolbar-item-wrapper": "gedi_2d5fe",
  "toolbar-item": "gedi_f1fa7",
  tooltip: nd,
  active: rd,
  vr: id
}, od = "gedi_e6842", ld = "gedi_ad0ba", hr = {
  dropdown: od,
  open: ld,
  "dropdown-content": "gedi_8d625"
}, sd = /* @__PURE__ */ Mn("<div><div>");
function Fa(l, a, f = !0) {
  if (f)
    l.style.maxHeight = "0", l.classList.remove(hr.open), Aa(l, !1), a.classList.remove(At.active);
  else {
    l.style.maxHeight = "";
    const d = l.scrollHeight;
    l.style.maxHeight = "0", l.classList.add(hr.open), setTimeout(() => {
      l.style.maxHeight = `${d}px`;
    }, 10), a.classList.add(At.active), Aa(l);
  }
}
function Aa(l, a = !0) {
  const f = l.previousElementSibling;
  f && (f.style.display = a ? "none" : "");
}
function ad(l) {
  let a;
  const f = (d) => d.classList.contains(hr.open);
  return yr(() => {
    a.style.maxHeight = "0", l.trigger.addEventListener("click", () => {
      Fa(a, l.trigger, f(a));
    }), document.addEventListener("click", (d) => {
      const p = d.target;
      l.trigger.contains(p) || Fa(a, l.trigger, !0);
    });
  }), (() => {
    const d = sd(), p = d.firstChild, v = a;
    return typeof v == "function" ? xr(v, d) : a = d, zt(p, () => l.children), ot((m) => {
      const x = hr.dropdown, S = hr["dropdown-content"];
      return x !== m._v$ && Ve(d, m._v$ = x), S !== m._v$2 && Ve(p, m._v$2 = S), m;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), d;
  })();
}
/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 1.0.7
*/
const iu = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), bi = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), wr = Object.freeze({
  ...iu,
  ...bi
}), Yo = Object.freeze({
  ...wr,
  body: "",
  hidden: !1
}), ud = Object.freeze({
  width: null,
  height: null
}), ou = Object.freeze({
  ...ud,
  ...bi
});
function fd(l, a = 0) {
  const f = l.replace(/^-?[0-9.]*/, "");
  function d(p) {
    for (; p < 0; )
      p += 4;
    return p % 4;
  }
  if (f === "") {
    const p = parseInt(l);
    return isNaN(p) ? 0 : d(p);
  } else if (f !== l) {
    let p = 0;
    switch (f) {
      case "%":
        p = 25;
        break;
      case "deg":
        p = 90;
    }
    if (p) {
      let v = parseFloat(l.slice(0, l.length - f.length));
      return isNaN(v) ? 0 : (v = v / p, v % 1 === 0 ? d(v) : 0);
    }
  }
  return a;
}
const cd = /[\s,]+/;
function hd(l, a) {
  a.split(cd).forEach((f) => {
    switch (f.trim()) {
      case "horizontal":
        l.hFlip = !0;
        break;
      case "vertical":
        l.vFlip = !0;
        break;
    }
  });
}
const lu = {
  ...ou,
  preserveAspectRatio: ""
};
function Da(l) {
  const a = {
    ...lu
  }, f = (d, p) => l.getAttribute(d) || p;
  return a.width = f("width", null), a.height = f("height", null), a.rotate = fd(f("rotate", "")), hd(a, f("flip", "")), a.preserveAspectRatio = f("preserveAspectRatio", f("preserveaspectratio", "")), a;
}
function dd(l, a) {
  for (const f in lu)
    if (l[f] !== a[f])
      return !0;
  return !1;
}
const dr = /^[a-z0-9]+(-[a-z0-9]+)*$/, Sr = (l, a, f, d = "") => {
  const p = l.split(":");
  if (l.slice(0, 1) === "@") {
    if (p.length < 2 || p.length > 3)
      return null;
    d = p.shift().slice(1);
  }
  if (p.length > 3 || !p.length)
    return null;
  if (p.length > 1) {
    const x = p.pop(), S = p.pop(), L = {
      provider: p.length > 0 ? p[0] : d,
      prefix: S,
      name: x
    };
    return a && !ci(L) ? null : L;
  }
  const v = p[0], m = v.split("-");
  if (m.length > 1) {
    const x = {
      provider: d,
      prefix: m.shift(),
      name: m.join("-")
    };
    return a && !ci(x) ? null : x;
  }
  if (f && d === "") {
    const x = {
      provider: d,
      prefix: "",
      name: v
    };
    return a && !ci(x, f) ? null : x;
  }
  return null;
}, ci = (l, a) => l ? !!((l.provider === "" || l.provider.match(dr)) && (a && l.prefix === "" || l.prefix.match(dr)) && l.name.match(dr)) : !1;
function pd(l, a) {
  const f = {};
  !l.hFlip != !a.hFlip && (f.hFlip = !0), !l.vFlip != !a.vFlip && (f.vFlip = !0);
  const d = ((l.rotate || 0) + (a.rotate || 0)) % 4;
  return d && (f.rotate = d), f;
}
function Ma(l, a) {
  const f = pd(l, a);
  for (const d in Yo)
    d in bi ? d in l && !(d in f) && (f[d] = bi[d]) : d in a ? f[d] = a[d] : d in l && (f[d] = l[d]);
  return f;
}
function gd(l, a) {
  const f = l.icons, d = l.aliases || /* @__PURE__ */ Object.create(null), p = /* @__PURE__ */ Object.create(null);
  function v(m) {
    if (f[m])
      return p[m] = [];
    if (!(m in p)) {
      p[m] = null;
      const x = d[m] && d[m].parent, S = x && v(x);
      S && (p[m] = [x].concat(S));
    }
    return p[m];
  }
  return (a || Object.keys(f).concat(Object.keys(d))).forEach(v), p;
}
function vd(l, a, f) {
  const d = l.icons, p = l.aliases || /* @__PURE__ */ Object.create(null);
  let v = {};
  function m(x) {
    v = Ma(
      d[x] || p[x],
      v
    );
  }
  return m(a), f.forEach(m), Ma(l, v);
}
function su(l, a) {
  const f = [];
  if (typeof l != "object" || typeof l.icons != "object")
    return f;
  l.not_found instanceof Array && l.not_found.forEach((p) => {
    a(p, null), f.push(p);
  });
  const d = gd(l);
  for (const p in d) {
    const v = d[p];
    v && (a(p, vd(l, p, v)), f.push(p));
  }
  return f;
}
const yd = {
  provider: "",
  aliases: {},
  not_found: {},
  ...iu
};
function Uo(l, a) {
  for (const f in a)
    if (f in l && typeof l[f] != typeof a[f])
      return !1;
  return !0;
}
function au(l) {
  if (typeof l != "object" || l === null)
    return null;
  const a = l;
  if (typeof a.prefix != "string" || !l.icons || typeof l.icons != "object" || !Uo(l, yd))
    return null;
  const f = a.icons;
  for (const p in f) {
    const v = f[p];
    if (!p.match(dr) || typeof v.body != "string" || !Uo(
      v,
      Yo
    ))
      return null;
  }
  const d = a.aliases || /* @__PURE__ */ Object.create(null);
  for (const p in d) {
    const v = d[p], m = v.parent;
    if (!p.match(dr) || typeof m != "string" || !f[m] && !d[m] || !Uo(
      v,
      Yo
    ))
      return null;
  }
  return a;
}
const xi = /* @__PURE__ */ Object.create(null);
function md(l, a) {
  return {
    provider: l,
    prefix: a,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Ut(l, a) {
  const f = xi[l] || (xi[l] = /* @__PURE__ */ Object.create(null));
  return f[a] || (f[a] = md(l, a));
}
function il(l, a) {
  return au(a) ? su(a, (f, d) => {
    d ? l.icons[f] = d : l.missing.add(f);
  }) : [];
}
function bd(l, a, f) {
  try {
    if (typeof f.body == "string")
      return l.icons[a] = { ...f }, !0;
  } catch {
  }
  return !1;
}
function xd(l, a) {
  let f = [];
  return (typeof l == "string" ? [l] : Object.keys(xi)).forEach((p) => {
    (typeof p == "string" && typeof a == "string" ? [a] : Object.keys(xi[p] || {})).forEach((m) => {
      const x = Ut(p, m);
      f = f.concat(
        Object.keys(x.icons).map(
          (S) => (p !== "" ? "@" + p + ":" : "") + m + ":" + S
        )
      );
    });
  }), f;
}
let pr = !1;
function uu(l) {
  return typeof l == "boolean" && (pr = l), pr;
}
function gr(l) {
  const a = typeof l == "string" ? Sr(l, !0, pr) : l;
  if (a) {
    const f = Ut(a.provider, a.prefix), d = a.name;
    return f.icons[d] || (f.missing.has(d) ? null : void 0);
  }
}
function fu(l, a) {
  const f = Sr(l, !0, pr);
  if (!f)
    return !1;
  const d = Ut(f.provider, f.prefix);
  return bd(d, f.name, a);
}
function Ea(l, a) {
  if (typeof l != "object")
    return !1;
  if (typeof a != "string" && (a = l.provider || ""), pr && !a && !l.prefix) {
    let p = !1;
    return au(l) && (l.prefix = "", su(l, (v, m) => {
      m && fu(v, m) && (p = !0);
    })), p;
  }
  const f = l.prefix;
  if (!ci({
    provider: a,
    prefix: f,
    name: "a"
  }))
    return !1;
  const d = Ut(a, f);
  return !!il(d, l);
}
function wd(l) {
  return !!gr(l);
}
function Sd(l) {
  const a = gr(l);
  return a ? {
    ...wr,
    ...a
  } : null;
}
function Cd(l) {
  const a = {
    loaded: [],
    missing: [],
    pending: []
  }, f = /* @__PURE__ */ Object.create(null);
  l.sort((p, v) => p.provider !== v.provider ? p.provider.localeCompare(v.provider) : p.prefix !== v.prefix ? p.prefix.localeCompare(v.prefix) : p.name.localeCompare(v.name));
  let d = {
    provider: "",
    prefix: "",
    name: ""
  };
  return l.forEach((p) => {
    if (d.name === p.name && d.prefix === p.prefix && d.provider === p.provider)
      return;
    d = p;
    const v = p.provider, m = p.prefix, x = p.name, S = f[v] || (f[v] = /* @__PURE__ */ Object.create(null)), L = S[m] || (S[m] = Ut(v, m));
    let T;
    x in L.icons ? T = a.loaded : m === "" || L.missing.has(x) ? T = a.missing : T = a.pending;
    const E = {
      provider: v,
      prefix: m,
      name: x
    };
    T.push(E);
  }), a;
}
function cu(l, a) {
  l.forEach((f) => {
    const d = f.loaderCallbacks;
    d && (f.loaderCallbacks = d.filter((p) => p.id !== a));
  });
}
function kd(l) {
  l.pendingCallbacksFlag || (l.pendingCallbacksFlag = !0, setTimeout(() => {
    l.pendingCallbacksFlag = !1;
    const a = l.loaderCallbacks ? l.loaderCallbacks.slice(0) : [];
    if (!a.length)
      return;
    let f = !1;
    const d = l.provider, p = l.prefix;
    a.forEach((v) => {
      const m = v.icons, x = m.pending.length;
      m.pending = m.pending.filter((S) => {
        if (S.prefix !== p)
          return !0;
        const L = S.name;
        if (l.icons[L])
          m.loaded.push({
            provider: d,
            prefix: p,
            name: L
          });
        else if (l.missing.has(L))
          m.missing.push({
            provider: d,
            prefix: p,
            name: L
          });
        else
          return f = !0, !0;
        return !1;
      }), m.pending.length !== x && (f || cu([l], v.id), v.callback(
        m.loaded.slice(0),
        m.missing.slice(0),
        m.pending.slice(0),
        v.abort
      ));
    });
  }));
}
let Ld = 0;
function Td(l, a, f) {
  const d = Ld++, p = cu.bind(null, f, d);
  if (!a.pending.length)
    return p;
  const v = {
    id: d,
    icons: a,
    callback: l,
    abort: p
  };
  return f.forEach((m) => {
    (m.loaderCallbacks || (m.loaderCallbacks = [])).push(v);
  }), p;
}
const Qo = /* @__PURE__ */ Object.create(null);
function Na(l, a) {
  Qo[l] = a;
}
function Zo(l) {
  return Qo[l] || Qo[""];
}
function Fd(l, a = !0, f = !1) {
  const d = [];
  return l.forEach((p) => {
    const v = typeof p == "string" ? Sr(p, a, f) : p;
    v && d.push(v);
  }), d;
}
var Ad = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Dd(l, a, f, d) {
  const p = l.resources.length, v = l.random ? Math.floor(Math.random() * p) : l.index;
  let m;
  if (l.random) {
    let K = l.resources.slice(0);
    for (m = []; K.length > 1; ) {
      const B = Math.floor(Math.random() * K.length);
      m.push(K[B]), K = K.slice(0, B).concat(K.slice(B + 1));
    }
    m = m.concat(K);
  } else
    m = l.resources.slice(v).concat(l.resources.slice(0, v));
  const x = Date.now();
  let S = "pending", L = 0, T, E = null, H = [], X = [];
  typeof d == "function" && X.push(d);
  function $() {
    E && (clearTimeout(E), E = null);
  }
  function V() {
    S === "pending" && (S = "aborted"), $(), H.forEach((K) => {
      K.status === "pending" && (K.status = "aborted");
    }), H = [];
  }
  function de(K, B) {
    B && (X = []), typeof K == "function" && X.push(K);
  }
  function ue() {
    return {
      startTime: x,
      payload: a,
      status: S,
      queriesSent: L,
      queriesPending: H.length,
      subscribe: de,
      abort: V
    };
  }
  function J() {
    S = "failed", X.forEach((K) => {
      K(void 0, T);
    });
  }
  function te() {
    H.forEach((K) => {
      K.status === "pending" && (K.status = "aborted");
    }), H = [];
  }
  function fe(K, B, ve) {
    const Se = B !== "success";
    switch (H = H.filter((Ye) => Ye !== K), S) {
      case "pending":
        break;
      case "failed":
        if (Se || !l.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (B === "abort") {
      T = ve, J();
      return;
    }
    if (Se) {
      T = ve, H.length || (m.length ? ne() : J());
      return;
    }
    if ($(), te(), !l.random) {
      const Ye = l.resources.indexOf(K.resource);
      Ye !== -1 && Ye !== l.index && (l.index = Ye);
    }
    S = "completed", X.forEach((Ye) => {
      Ye(ve);
    });
  }
  function ne() {
    if (S !== "pending")
      return;
    $();
    const K = m.shift();
    if (K === void 0) {
      if (H.length) {
        E = setTimeout(() => {
          $(), S === "pending" && (te(), J());
        }, l.timeout);
        return;
      }
      J();
      return;
    }
    const B = {
      status: "pending",
      resource: K,
      callback: (ve, Se) => {
        fe(B, ve, Se);
      }
    };
    H.push(B), L++, E = setTimeout(ne, l.rotate), f(K, a, B.callback);
  }
  return setTimeout(ne), ue;
}
function hu(l) {
  const a = {
    ...Ad,
    ...l
  };
  let f = [];
  function d() {
    f = f.filter((x) => x().status === "pending");
  }
  function p(x, S, L) {
    const T = Dd(
      a,
      x,
      S,
      (E, H) => {
        d(), L && L(E, H);
      }
    );
    return f.push(T), T;
  }
  function v(x) {
    return f.find((S) => x(S)) || null;
  }
  return {
    query: p,
    find: v,
    setIndex: (x) => {
      a.index = x;
    },
    getIndex: () => a.index,
    cleanup: d
  };
}
function ol(l) {
  let a;
  if (typeof l.resources == "string")
    a = [l.resources];
  else if (a = l.resources, !(a instanceof Array) || !a.length)
    return null;
  return {
    resources: a,
    path: l.path || "/",
    maxURL: l.maxURL || 500,
    rotate: l.rotate || 750,
    timeout: l.timeout || 5e3,
    random: l.random === !0,
    index: l.index || 0,
    dataAfterTimeout: l.dataAfterTimeout !== !1
  };
}
const ki = /* @__PURE__ */ Object.create(null), cr = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], hi = [];
for (; cr.length > 0; )
  cr.length === 1 || Math.random() > 0.5 ? hi.push(cr.shift()) : hi.push(cr.pop());
ki[""] = ol({
  resources: ["https://api.iconify.design"].concat(hi)
});
function Oa(l, a) {
  const f = ol(a);
  return f === null ? !1 : (ki[l] = f, !0);
}
function Li(l) {
  return ki[l];
}
function Md() {
  return Object.keys(ki);
}
function Ia() {
}
const Go = /* @__PURE__ */ Object.create(null);
function Ed(l) {
  if (!Go[l]) {
    const a = Li(l);
    if (!a)
      return;
    const f = hu(a), d = {
      config: a,
      redundancy: f
    };
    Go[l] = d;
  }
  return Go[l];
}
function du(l, a, f) {
  let d, p;
  if (typeof l == "string") {
    const v = Zo(l);
    if (!v)
      return f(void 0, 424), Ia;
    p = v.send;
    const m = Ed(l);
    m && (d = m.redundancy);
  } else {
    const v = ol(l);
    if (v) {
      d = hu(v);
      const m = l.resources ? l.resources[0] : "", x = Zo(m);
      x && (p = x.send);
    }
  }
  return !d || !p ? (f(void 0, 424), Ia) : d.query(a, p, f)().abort;
}
const Ha = "iconify2", vr = "iconify", pu = vr + "-count", Pa = vr + "-version", gu = 36e5, Nd = 168;
function Jo(l, a) {
  try {
    return l.getItem(a);
  } catch {
  }
}
function ll(l, a, f) {
  try {
    return l.setItem(a, f), !0;
  } catch {
  }
}
function Wa(l, a) {
  try {
    l.removeItem(a);
  } catch {
  }
}
function Vo(l, a) {
  return ll(l, pu, a.toString());
}
function el(l) {
  return parseInt(Jo(l, pu)) || 0;
}
const rn = {
  local: !0,
  session: !0
}, vu = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let sl = !1;
function Od(l) {
  sl = l;
}
let ui = typeof window > "u" ? {} : window;
function yu(l) {
  const a = l + "Storage";
  try {
    if (ui && ui[a] && typeof ui[a].length == "number")
      return ui[a];
  } catch {
  }
  rn[l] = !1;
}
function mu(l, a) {
  const f = yu(l);
  if (!f)
    return;
  const d = Jo(f, Pa);
  if (d !== Ha) {
    if (d) {
      const x = el(f);
      for (let S = 0; S < x; S++)
        Wa(f, vr + S.toString());
    }
    ll(f, Pa, Ha), Vo(f, 0);
    return;
  }
  const p = Math.floor(Date.now() / gu) - Nd, v = (x) => {
    const S = vr + x.toString(), L = Jo(f, S);
    if (typeof L == "string") {
      try {
        const T = JSON.parse(L);
        if (typeof T == "object" && typeof T.cached == "number" && T.cached > p && typeof T.provider == "string" && typeof T.data == "object" && typeof T.data.prefix == "string" && a(T, x))
          return !0;
      } catch {
      }
      Wa(f, S);
    }
  };
  let m = el(f);
  for (let x = m - 1; x >= 0; x--)
    v(x) || (x === m - 1 ? (m--, Vo(f, m)) : vu[l].add(x));
}
function bu() {
  if (!sl) {
    Od(!0);
    for (const l in rn)
      mu(l, (a) => {
        const f = a.data, d = a.provider, p = f.prefix, v = Ut(
          d,
          p
        );
        if (!il(v, f).length)
          return !1;
        const m = f.lastModified || -1;
        return v.lastModifiedCached = v.lastModifiedCached ? Math.min(v.lastModifiedCached, m) : m, !0;
      });
  }
}
function Id(l, a) {
  const f = l.lastModifiedCached;
  if (f && f >= a)
    return f === a;
  if (l.lastModifiedCached = a, f)
    for (const d in rn)
      mu(d, (p) => {
        const v = p.data;
        return p.provider !== l.provider || v.prefix !== l.prefix || v.lastModified === a;
      });
  return !0;
}
function Hd(l, a) {
  sl || bu();
  function f(d) {
    let p;
    if (!rn[d] || !(p = yu(d)))
      return;
    const v = vu[d];
    let m;
    if (v.size)
      v.delete(m = Array.from(v).shift());
    else if (m = el(p), !Vo(p, m + 1))
      return;
    const x = {
      cached: Math.floor(Date.now() / gu),
      provider: l.provider,
      data: a
    };
    return ll(
      p,
      vr + m.toString(),
      JSON.stringify(x)
    );
  }
  a.lastModified && !Id(l, a.lastModified) || !Object.keys(a.icons).length || (a.not_found && (a = Object.assign({}, a), delete a.not_found), f("local") || f("session"));
}
function Ba() {
}
function Pd(l) {
  l.iconsLoaderFlag || (l.iconsLoaderFlag = !0, setTimeout(() => {
    l.iconsLoaderFlag = !1, kd(l);
  }));
}
function Wd(l, a) {
  l.iconsToLoad ? l.iconsToLoad = l.iconsToLoad.concat(a).sort() : l.iconsToLoad = a, l.iconsQueueFlag || (l.iconsQueueFlag = !0, setTimeout(() => {
    l.iconsQueueFlag = !1;
    const { provider: f, prefix: d } = l, p = l.iconsToLoad;
    delete l.iconsToLoad;
    let v;
    if (!p || !(v = Zo(f)))
      return;
    v.prepare(f, d, p).forEach((x) => {
      du(f, x, (S) => {
        if (typeof S != "object")
          x.icons.forEach((L) => {
            l.missing.add(L);
          });
        else
          try {
            const L = il(
              l,
              S
            );
            if (!L.length)
              return;
            const T = l.pendingIcons;
            T && L.forEach((E) => {
              T.delete(E);
            }), Hd(l, S);
          } catch (L) {
            console.error(L);
          }
        Pd(l);
      });
    });
  }));
}
const al = (l, a) => {
  const f = Fd(l, !0, uu()), d = Cd(f);
  if (!d.pending.length) {
    let S = !0;
    return a && setTimeout(() => {
      S && a(
        d.loaded,
        d.missing,
        d.pending,
        Ba
      );
    }), () => {
      S = !1;
    };
  }
  const p = /* @__PURE__ */ Object.create(null), v = [];
  let m, x;
  return d.pending.forEach((S) => {
    const { provider: L, prefix: T } = S;
    if (T === x && L === m)
      return;
    m = L, x = T, v.push(Ut(L, T));
    const E = p[L] || (p[L] = /* @__PURE__ */ Object.create(null));
    E[T] || (E[T] = []);
  }), d.pending.forEach((S) => {
    const { provider: L, prefix: T, name: E } = S, H = Ut(L, T), X = H.pendingIcons || (H.pendingIcons = /* @__PURE__ */ new Set());
    X.has(E) || (X.add(E), p[L][T].push(E));
  }), v.forEach((S) => {
    const { provider: L, prefix: T } = S;
    p[L][T].length && Wd(S, p[L][T]);
  }), a ? Td(a, d, v) : Ba;
}, Bd = (l) => new Promise((a, f) => {
  const d = typeof l == "string" ? Sr(l, !0) : l;
  if (!d) {
    f(l);
    return;
  }
  al([d || l], (p) => {
    if (p.length && d) {
      const v = gr(d);
      if (v) {
        a({
          ...wr,
          ...v
        });
        return;
      }
    }
    f(l);
  });
});
function Rd(l) {
  try {
    const a = typeof l == "string" ? JSON.parse(l) : l;
    if (typeof a.body == "string")
      return {
        ...a
      };
  } catch {
  }
}
function _d(l, a) {
  const f = typeof l == "string" ? Sr(l, !0, !0) : null;
  if (!f) {
    const v = Rd(l);
    return {
      value: l,
      data: v
    };
  }
  const d = gr(f);
  if (d !== void 0 || !f.prefix)
    return {
      value: l,
      name: f,
      data: d
    };
  const p = al([f], () => a(l, f, gr(f)));
  return {
    value: l,
    name: f,
    loading: p
  };
}
function qo(l) {
  return l.hasAttribute("inline");
}
let xu = !1;
try {
  xu = navigator.vendor.indexOf("Apple") === 0;
} catch {
}
function zd(l, a) {
  switch (a) {
    case "svg":
    case "bg":
    case "mask":
      return a;
  }
  return a !== "style" && (xu || l.indexOf("<a") === -1) ? "svg" : l.indexOf("currentColor") === -1 ? "bg" : "mask";
}
const Ud = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Gd = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function tl(l, a, f) {
  if (a === 1)
    return l;
  if (f = f || 100, typeof l == "number")
    return Math.ceil(l * a * f) / f;
  if (typeof l != "string")
    return l;
  const d = l.split(Ud);
  if (d === null || !d.length)
    return l;
  const p = [];
  let v = d.shift(), m = Gd.test(v);
  for (; ; ) {
    if (m) {
      const x = parseFloat(v);
      isNaN(x) ? p.push(v) : p.push(Math.ceil(x * a * f) / f);
    } else
      p.push(v);
    if (v = d.shift(), v === void 0)
      return p.join("");
    m = !m;
  }
}
const qd = (l) => l === "unset" || l === "undefined" || l === "none";
function wu(l, a) {
  const f = {
    ...wr,
    ...l
  }, d = {
    ...ou,
    ...a
  }, p = {
    left: f.left,
    top: f.top,
    width: f.width,
    height: f.height
  };
  let v = f.body;
  [f, d].forEach(($) => {
    const V = [], de = $.hFlip, ue = $.vFlip;
    let J = $.rotate;
    de ? ue ? J += 2 : (V.push(
      "translate(" + (p.width + p.left).toString() + " " + (0 - p.top).toString() + ")"
    ), V.push("scale(-1 1)"), p.top = p.left = 0) : ue && (V.push(
      "translate(" + (0 - p.left).toString() + " " + (p.height + p.top).toString() + ")"
    ), V.push("scale(1 -1)"), p.top = p.left = 0);
    let te;
    switch (J < 0 && (J -= Math.floor(J / 4) * 4), J = J % 4, J) {
      case 1:
        te = p.height / 2 + p.top, V.unshift(
          "rotate(90 " + te.toString() + " " + te.toString() + ")"
        );
        break;
      case 2:
        V.unshift(
          "rotate(180 " + (p.width / 2 + p.left).toString() + " " + (p.height / 2 + p.top).toString() + ")"
        );
        break;
      case 3:
        te = p.width / 2 + p.left, V.unshift(
          "rotate(-90 " + te.toString() + " " + te.toString() + ")"
        );
        break;
    }
    J % 2 === 1 && (p.left !== p.top && (te = p.left, p.left = p.top, p.top = te), p.width !== p.height && (te = p.width, p.width = p.height, p.height = te)), V.length && (v = '<g transform="' + V.join(" ") + '">' + v + "</g>");
  });
  const m = d.width, x = d.height, S = p.width, L = p.height;
  let T, E;
  m === null ? (E = x === null ? "1em" : x === "auto" ? L : x, T = tl(E, S / L)) : (T = m === "auto" ? S : m, E = x === null ? tl(T, L / S) : x === "auto" ? L : x);
  const H = {}, X = ($, V) => {
    qd(V) || (H[$] = V.toString());
  };
  return X("width", T), X("height", E), H.viewBox = p.left.toString() + " " + p.top.toString() + " " + S.toString() + " " + L.toString(), {
    attributes: H,
    body: v
  };
}
const Kd = () => {
  let l;
  try {
    if (l = fetch, typeof l == "function")
      return l;
  } catch {
  }
};
let wi = Kd();
function $d(l) {
  wi = l;
}
function jd() {
  return wi;
}
function Xd(l, a) {
  const f = Li(l);
  if (!f)
    return 0;
  let d;
  if (!f.maxURL)
    d = 0;
  else {
    let p = 0;
    f.resources.forEach((m) => {
      p = Math.max(p, m.length);
    });
    const v = a + ".json?icons=";
    d = f.maxURL - p - f.path.length - v.length;
  }
  return d;
}
function Yd(l) {
  return l === 404;
}
const Qd = (l, a, f) => {
  const d = [], p = Xd(l, a), v = "icons";
  let m = {
    type: v,
    provider: l,
    prefix: a,
    icons: []
  }, x = 0;
  return f.forEach((S, L) => {
    x += S.length + 1, x >= p && L > 0 && (d.push(m), m = {
      type: v,
      provider: l,
      prefix: a,
      icons: []
    }, x = S.length), m.icons.push(S);
  }), d.push(m), d;
};
function Zd(l) {
  if (typeof l == "string") {
    const a = Li(l);
    if (a)
      return a.path;
  }
  return "/";
}
const Jd = (l, a, f) => {
  if (!wi) {
    f("abort", 424);
    return;
  }
  let d = Zd(a.provider);
  switch (a.type) {
    case "icons": {
      const v = a.prefix, x = a.icons.join(","), S = new URLSearchParams({
        icons: x
      });
      d += v + ".json?" + S.toString();
      break;
    }
    case "custom": {
      const v = a.uri;
      d += v.slice(0, 1) === "/" ? v.slice(1) : v;
      break;
    }
    default:
      f("abort", 400);
      return;
  }
  let p = 503;
  wi(l + d).then((v) => {
    const m = v.status;
    if (m !== 200) {
      setTimeout(() => {
        f(Yd(m) ? "abort" : "next", m);
      });
      return;
    }
    return p = 501, v.json();
  }).then((v) => {
    if (typeof v != "object" || v === null) {
      setTimeout(() => {
        v === 404 ? f("abort", v) : f("next", p);
      });
      return;
    }
    setTimeout(() => {
      f("success", v);
    });
  }).catch(() => {
    f("next", p);
  });
}, Vd = {
  prepare: Qd,
  send: Jd
};
function Ra(l, a) {
  switch (l) {
    case "local":
    case "session":
      rn[l] = a;
      break;
    case "all":
      for (const f in rn)
        rn[f] = a;
      break;
  }
}
const Ko = "data-style";
let Su = "";
function ep(l) {
  Su = l;
}
function _a(l, a) {
  let f = Array.from(l.childNodes).find((d) => d.hasAttribute && d.hasAttribute(Ko));
  f || (f = document.createElement("style"), f.setAttribute(Ko, Ko), l.appendChild(f)), f.textContent = ":host{display:inline-block;vertical-align:" + (a ? "-0.125em" : "0") + "}span,svg{display:block}" + Su;
}
function Cu() {
  Na("", Vd), uu(!0);
  let l;
  try {
    l = window;
  } catch {
  }
  if (l) {
    if (bu(), l.IconifyPreload !== void 0) {
      const f = l.IconifyPreload, d = "Invalid IconifyPreload syntax.";
      typeof f == "object" && f !== null && (f instanceof Array ? f : [f]).forEach((p) => {
        try {
          (typeof p != "object" || p === null || p instanceof Array || typeof p.icons != "object" || typeof p.prefix != "string" || !Ea(p)) && console.error(d);
        } catch {
          console.error(d);
        }
      });
    }
    if (l.IconifyProviders !== void 0) {
      const f = l.IconifyProviders;
      if (typeof f == "object" && f !== null)
        for (const d in f) {
          const p = "IconifyProviders[" + d + "] is invalid.";
          try {
            const v = f[d];
            if (typeof v != "object" || !v || v.resources === void 0)
              continue;
            Oa(d, v) || console.error(p);
          } catch {
            console.error(p);
          }
        }
    }
  }
  return {
    enableCache: (f) => Ra(f, !0),
    disableCache: (f) => Ra(f, !1),
    iconExists: wd,
    getIcon: Sd,
    listIcons: xd,
    addIcon: fu,
    addCollection: Ea,
    calculateSize: tl,
    buildIcon: wu,
    loadIcons: al,
    loadIcon: Bd,
    addAPIProvider: Oa,
    appendCustomStyle: ep,
    _api: {
      getAPIConfig: Li,
      setAPIModule: Na,
      sendAPIQuery: du,
      setFetch: $d,
      getFetch: jd,
      listAPIProviders: Md
    }
  };
}
function ku(l, a) {
  let f = l.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const d in a)
    f += " " + d + '="' + a[d] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + f + ">" + l + "</svg>";
}
function tp(l) {
  return l.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function np(l) {
  return 'url("data:image/svg+xml,' + tp(l) + '")';
}
const nl = {
  "background-color": "currentColor"
}, Lu = {
  "background-color": "transparent"
}, za = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
}, Ua = {
  "-webkit-mask": nl,
  mask: nl,
  background: Lu
};
for (const l in Ua) {
  const a = Ua[l];
  for (const f in za)
    a[l + "-" + f] = za[f];
}
function Ga(l) {
  return l ? l + (l.match(/^[-0-9.]+$/) ? "px" : "") : "inherit";
}
function rp(l, a, f) {
  const d = document.createElement("span");
  let p = l.body;
  p.indexOf("<a") !== -1 && (p += "<!-- " + Date.now() + " -->");
  const v = l.attributes, m = ku(p, {
    ...v,
    width: a.width + "",
    height: a.height + ""
  }), x = np(m), S = d.style, L = {
    "--svg": x,
    width: Ga(v.width),
    height: Ga(v.height),
    ...f ? nl : Lu
  };
  for (const T in L)
    S.setProperty(T, L[T]);
  return d;
}
function ip(l) {
  const a = document.createElement("span"), f = l.attributes;
  let d = "";
  return f.width || (d = "width: inherit;"), f.height || (d += "height: inherit;"), d && (f.style = d), a.innerHTML = ku(l.body, f), a.firstChild;
}
function qa(l, a) {
  const f = a.icon.data, d = a.customisations, p = wu(f, d);
  d.preserveAspectRatio && (p.attributes.preserveAspectRatio = d.preserveAspectRatio);
  const v = a.renderedMode;
  let m;
  switch (v) {
    case "svg":
      m = ip(p);
      break;
    default:
      m = rp(p, {
        ...wr,
        ...f
      }, v === "mask");
  }
  const x = Array.from(l.childNodes).find((S) => {
    const L = S.tagName && S.tagName.toUpperCase();
    return L === "SPAN" || L === "SVG";
  });
  x ? m.tagName === "SPAN" && x.tagName === m.tagName ? x.setAttribute("style", m.getAttribute("style")) : l.replaceChild(m, x) : l.appendChild(m);
}
function Ka(l, a, f) {
  const d = f && (f.rendered ? f : f.lastRender);
  return {
    rendered: !1,
    inline: a,
    icon: l,
    lastRender: d
  };
}
function op(l = "iconify-icon") {
  let a, f;
  try {
    a = window.customElements, f = window.HTMLElement;
  } catch {
    return;
  }
  if (!a || !f)
    return;
  const d = a.get(l);
  if (d)
    return d;
  const p = [
    "icon",
    "mode",
    "inline",
    "width",
    "height",
    "rotate",
    "flip"
  ], v = class extends f {
    constructor() {
      super();
      si(this, "_shadowRoot");
      si(this, "_state");
      si(this, "_checkQueued", !1);
      const S = this._shadowRoot = this.attachShadow({
        mode: "open"
      }), L = qo(this);
      _a(S, L), this._state = Ka({
        value: ""
      }, L), this._queueCheck();
    }
    static get observedAttributes() {
      return p.slice(0);
    }
    attributeChangedCallback(S) {
      if (S === "inline") {
        const L = qo(this), T = this._state;
        L !== T.inline && (T.inline = L, _a(this._shadowRoot, L));
      } else
        this._queueCheck();
    }
    get icon() {
      const S = this.getAttribute("icon");
      if (S && S.slice(0, 1) === "{")
        try {
          return JSON.parse(S);
        } catch {
        }
      return S;
    }
    set icon(S) {
      typeof S == "object" && (S = JSON.stringify(S)), this.setAttribute("icon", S);
    }
    get inline() {
      return qo(this);
    }
    set inline(S) {
      S ? this.setAttribute("inline", "true") : this.removeAttribute("inline");
    }
    restartAnimation() {
      const S = this._state;
      if (S.rendered) {
        const L = this._shadowRoot;
        if (S.renderedMode === "svg")
          try {
            L.lastChild.setCurrentTime(0);
            return;
          } catch {
          }
        qa(L, S);
      }
    }
    get status() {
      const S = this._state;
      return S.rendered ? "rendered" : S.icon.data === null ? "failed" : "loading";
    }
    _queueCheck() {
      this._checkQueued || (this._checkQueued = !0, setTimeout(() => {
        this._check();
      }));
    }
    _check() {
      if (!this._checkQueued)
        return;
      this._checkQueued = !1;
      const S = this._state, L = this.getAttribute("icon");
      if (L !== S.icon.value) {
        this._iconChanged(L);
        return;
      }
      if (!S.rendered)
        return;
      const T = this.getAttribute("mode"), E = Da(this);
      (S.attrMode !== T || dd(S.customisations, E)) && this._renderIcon(S.icon, E, T);
    }
    _iconChanged(S) {
      const L = _d(S, (T, E, H) => {
        const X = this._state;
        if (X.rendered || this.getAttribute("icon") !== T)
          return;
        const $ = {
          value: T,
          name: E,
          data: H
        };
        $.data ? this._gotIconData($) : X.icon = $;
      });
      L.data ? this._gotIconData(L) : this._state = Ka(L, this._state.inline, this._state);
    }
    _gotIconData(S) {
      this._checkQueued = !1, this._renderIcon(S, Da(this), this.getAttribute("mode"));
    }
    _renderIcon(S, L, T) {
      const E = zd(S.data.body, T), H = this._state.inline;
      qa(this._shadowRoot, this._state = {
        rendered: !0,
        icon: S,
        inline: H,
        customisations: L,
        attrMode: T,
        renderedMode: E
      });
    }
  };
  p.forEach((x) => {
    x in v.prototype || Object.defineProperty(v.prototype, x, {
      get: function() {
        return this.getAttribute(x);
      },
      set: function(S) {
        S !== null ? this.setAttribute(x, S) : this.removeAttribute(x);
      }
    });
  });
  const m = Cu();
  for (const x in m)
    v[x] = v.prototype[x] = m[x];
  return a.define(l, v), v;
}
const lp = op() || Cu(), { enableCache: Ep, disableCache: Np, iconExists: Op, getIcon: Ip, listIcons: Hp, addIcon: sp, addCollection: Pp, calculateSize: Wp, buildIcon: Bp, loadIcons: Rp, loadIcon: _p, addAPIProvider: zp, _api: Up } = lp, ap = /* @__PURE__ */ Mn("<iconify-icon>", !0, !1);
function up(l) {
  let {
    icon: a,
    mode: f,
    inline: d,
    rotate: p,
    flip: v,
    width: m,
    height: x,
    preserveAspectRatio: S
  } = l;
  return typeof a == "object" && (a = JSON.stringify(a)), (() => {
    const L = ap();
    return ft(L, "icon", a), ft(L, "mode", f), ft(L, "inline", d), ft(L, "rotate", p), ft(L, "flip", v), ft(L, "width", m), ft(L, "height", x), ft(L, "preserveaspectratio", S), vh(L, l, !1, !1), L._$owner = Xc(), L;
  })();
}
const fp = {
  width: 24,
  height: 24,
  body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-4.182 0-7.028-2.5-8.725-4.704Z"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g>'
}, cp = "gedi_3c34e", hp = {
  icon: cp
};
sp("solar:eye", fp);
function dp(l) {
  return _e(up, {
    get icon() {
      return l.icon;
    },
    width: "1.3em",
    get class() {
      return hp.icon;
    }
  });
}
const pp = `<ul id="g-panel-emotions-TyUh" class="g-panel-content-emotion"><li>\u{1F600}</li><li>\u{1F603}</li><li>\u{1F604}</li><li>\u{1F601}</li><li>\u{1F606}</li><li>\u{1F605}</li><li>\u{1F602}</li><li>\u{1F923}</li><li>\u{1F60A}</li><li>\u{1F607}</li><li>\u{1F642}</li><li>\u{1F643}</li><li>\u{1F609}</li><li>\u{1F60C}</li><li>\u{1F60D}</li><li>\u{1F618}</li><li>\u{1F617}</li><li>\u{1F619}</li><li>\u{1F61A}</li><li>\u{1F60B}</li><li>\u{1F61B}</li><li>\u{1F61D}</li><li>\u{1F61C}</li><li>\u{1F913}</li><li>\u{1F60E}</li><li>\u{1F60F}</li><li>\u{1F612}</li><li>\u{1F61E}</li><li>\u{1F614}</li><li>\u{1F61F}</li><li>\u{1F615}</li><li>\u{1F641}</li><li>\u{1F623}</li><li>\u{1F616}</li><li>\u{1F62B}</li><li>\u{1F629}</li><li>\u{1F622}</li><li>\u{1F62D}</li><li>\u{1F624}</li><li>\u{1F620}</li><li>\u{1F621}</li><li>\u{1F633}</li><li>\u{1F631}</li><li>\u{1F628}</li><li>\u{1F917}</li><li>\u{1F914}</li><li>\u{1F636}</li><li>\u{1F611}</li><li>\u{1F62C}</li><li>\u{1F644}</li><li>\u{1F62F}</li><li>\u{1F634}</li><li>\u{1F637}</li><li>\u{1F911}</li><li>\u{1F608}</li><li>\u{1F921}</li><li>\u{1F4A9}</li><li>\u{1F47B}</li><li>\u{1F480}</li><li>\u{1F440}</li><li>\u{1F463}</li><li>\u{1F450}</li><li>\u{1F64C}</li><li>\u{1F44F}</li><li>\u{1F91D}</li><li>\u{1F44D}</li><li>\u{1F44E}</li><li>\u{1F44A}</li><li>\u270A</li><li>\u{1F91B}</li><li>\u{1F91C}</li><li>\u{1F91E}</li><li>\u270C\uFE0F</li><li>\u{1F918}</li><li>\u{1F44C}</li><li>\u{1F448}</li><li>\u{1F449}</li><li>\u{1F446}</li><li>\u{1F447}</li><li>\u261D\uFE0F</li><li>\u270B</li><li>\u{1F91A}</li><li>\u{1F590}</li><li>\u{1F596}</li><li>\u{1F44B}</li><li>\u{1F919}</li><li>\u{1F4AA}</li><li>\u{1F595}</li><li>\u270D\uFE0F</li><li>\u{1F64F}</li>
</ul>`, gp = {
  title: "\u8868\u60C5",
  icon: "solar:emoji-funny-circle-linear",
  menu: {
    innerHTML: pp,
    onMount(l) {
      const a = l.cm, f = l.$element.querySelector(
        "#g-panel-emotions-TyUh"
      );
      f && f.addEventListener("click", (d) => {
        const p = d.target;
        p.tagName === "LI" && (a.replaceSelection(p.textContent || ""), a.refresh(), a.focus());
      });
    }
  }
};
function vp(l, a) {
  l.$element.classList.contains(it["show-preview"]) ? (l.$element.classList.remove(it["show-preview"]), a.changeTitle("\u9884\u89C8"), a.active(!1)) : (l.$preview.innerHTML = l.getPreview(), l.$element.classList.add(it["show-preview"]), a.changeTitle("\u53D6\u6D88\u9884\u89C8"), a.active(!0));
}
const yp = {
  title: "\u9884\u89C8",
  icon: "solar:eye-linear",
  action: vp
}, mp = {
  title: "\u56DE\u9000",
  icon: "solar:undo-left-round-linear",
  action(l) {
    const a = l.cm;
    a.undo(), a.refresh(), a.focus();
  }
}, bp = {
  title: "\u91CD\u505A",
  icon: "solar:undo-right-round-linear",
  action(l) {
    const a = l.cm;
    a.redo(), a.refresh(), a.focus();
  }
}, xp = {
  title: "\u6E05\u7A7A",
  icon: "solar:eraser-linear",
  action(l) {
    const a = l.cm;
    a.setValue(""), a.refresh(), a.focus();
  }
}, wp = {
  title: "",
  icon: ""
}, Sp = [
  gp,
  "|",
  mp,
  bp,
  "|",
  xp,
  "|",
  yp
], Cp = /* @__PURE__ */ Mn("<div>");
function kp(l) {
  let a;
  return yr(() => {
    gi(() => {
      a.style.bottom = l.pos[0], a.style.right = l.pos[1];
    });
  }), (() => {
    const f = Cp(), d = a;
    return typeof d == "function" ? xr(d, f) : a = f, zt(f, () => l.content), ot(() => Ve(f, At.tooltip)), f;
  })();
}
const Tu = /* @__PURE__ */ Mn("<div><div>"), Fu = /* @__PURE__ */ Mn("<div>");
function Au(l) {
  const a = l.item;
  let f;
  const [d, p] = An(a.title), [v, m] = An({
    $element: f,
    active(x) {
      x ? v().$element.classList.add(At.active) : v().$element.classList.remove(At.active);
    },
    changeTitle(x) {
      p(x);
    }
  });
  return yr(() => {
    const x = v();
    x.$element = f, m(x);
  }), _e(ai, {
    get when() {
      return a.title;
    },
    get fallback() {
      return _e(Tp, {});
    },
    get children() {
      const x = Tu(), S = x.firstChild, L = f;
      return typeof L == "function" ? xr(L, S) : f = S, S.$$click = () => {
        const T = l.item.action;
        T && l.inst && !l.item.menu && T(l.inst, v());
      }, zt(S, _e(dp, {
        get icon() {
          return l.item.icon;
        }
      })), zt(x, _e(kp, {
        get content() {
          return d();
        },
        pos: ["-140%", "-50%"]
      }), null), zt(x, _e(ai, {
        get when() {
          return a.menu;
        },
        get children() {
          return _e(ad, {
            trigger: f,
            get children() {
              return [_e(ai, {
                get when() {
                  return Ca(a.menu);
                },
                get children() {
                  return _e(Va, {
                    get each() {
                      return a.menu;
                    },
                    children: (T) => _e(Au, {
                      item: T,
                      get inst() {
                        return l.inst;
                      }
                    })
                  });
                }
              }), _e(ai, {
                get when() {
                  return !Ca(a.menu);
                },
                get children() {
                  return _e(Lp, {
                    get item() {
                      return a.menu;
                    },
                    get inst() {
                      return l.inst;
                    }
                  });
                }
              })];
            }
          });
        }
      }), null), ot((T) => {
        const E = At["toolbar-item-wrapper"], H = At["toolbar-item"];
        return E !== T._v$ && Ve(x, T._v$ = E), H !== T._v$2 && Ve(S, T._v$2 = H), T;
      }, {
        _v$: void 0,
        _v$2: void 0
      }), x;
    }
  });
}
function Lp(l) {
  let a;
  return yr(() => {
    a.innerHTML = l.item.innerHTML, l.inst && l.item.onMount(l.inst);
  }), (() => {
    const f = Fu(), d = a;
    return typeof d == "function" ? xr(d, f) : a = f, f;
  })();
}
function Tp() {
  return (() => {
    const l = Fu();
    return ot(() => Ve(l, At.vr)), l;
  })();
}
function Fp(l) {
  return (() => {
    const a = Tu(), f = a.firstChild;
    return zt(f, _e(Va, {
      get each() {
        return l.items || Sp;
      },
      children: (d) => (d === "|" && (d = wp), _e(Au, {
        item: d,
        get inst() {
          return l.inst;
        }
      }))
    })), ot(() => Ve(a, At["toolbar-wrapper"])), a;
  })();
}
eu(["click"]);
const Ap = /* @__PURE__ */ Mn("<div><div></div><div><div></div><div><div>");
function Dp(l) {
  const [a, f] = An();
  let d;
  return yr(() => {
    if (!d)
      return;
    const p = d.querySelector(`.${it.editor}`), v = d.querySelector(`.${it["preview-content"]}`);
    if (p && v) {
      const m = nt(p, {
        mode: "markdown",
        lineWrapping: !0,
        value: l.value,
        scrollbarStyle: "overlay"
      });
      f({
        cm: m,
        $element: d,
        $editor: p,
        $preview: v,
        getPreview() {
          const S = m.getValue();
          return l.handelPreview ? l.handelPreview(S) : S;
        }
      }), m.on("change", Qh(() => {
        const S = m.getValue();
        l.onChange(S);
      }, 200)), gi(() => {
        l.theme === "dark" ? m.setOption("theme", "blackboard") : m.setOption("theme", "default");
      }), gi(() => {
        m.setValue(l.value), m.refresh(), m.focus();
      });
    }
  }), (() => {
    const p = Ap(), v = p.firstChild, m = v.nextSibling, x = m.firstChild, S = x.nextSibling, L = S.firstChild, T = d;
    return typeof T == "function" ? xr(T, p) : d = p, zt(v, _e(Fp, {
      get inst() {
        return a();
      }
    })), ot((E) => {
      const H = `${it["out-wrapper"]} ${l.theme === "dark" ? it.dark : ""}`, X = it.toolbar, $ = it["editor-wrapper"], V = l.height || "300px", de = it.editor, ue = it.preview, J = `${it["preview-content"]} markdown-body`;
      return H !== E._v$ && Ve(p, E._v$ = H), X !== E._v$2 && Ve(v, E._v$2 = X), $ !== E._v$3 && Ve(m, E._v$3 = $), V !== E._v$4 && ((E._v$4 = V) != null ? m.style.setProperty("height", V) : m.style.removeProperty("height")), de !== E._v$5 && Ve(x, E._v$5 = de), ue !== E._v$6 && Ve(S, E._v$6 = ue), J !== E._v$7 && Ve(L, E._v$7 = J), E;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0,
      _v$7: void 0
    }), p;
  })();
}
function Gp(l) {
  if (!l.target)
    return;
  const [a, f] = An(l.theme), [d, p] = An("");
  return ch(() => _e(Dp, {
    get onChange() {
      return l.onChange;
    },
    get handelPreview() {
      return l.handelPreview;
    },
    get height() {
      return l.height;
    },
    get theme() {
      return a();
    },
    get value() {
      return d();
    }
  }), l.target), {
    setTheme: f,
    setVal: p
  };
}
export {
  Gp as Editor,
  Dp as MdEditor
};
