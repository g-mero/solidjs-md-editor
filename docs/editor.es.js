var Hc = Object.defineProperty;
var Pc = (s, u, f) => u in s ? Hc(s, u, { enumerable: !0, configurable: !0, writable: !0, value: f }) : s[u] = f;
var si = (s, u, f) => (Pc(s, typeof u != "symbol" ? u + "" : u, f), f);
const Wc = (s, u) => s === u, Bc = Symbol("solid-track"), di = {
  equals: Wc
};
let _a = qa;
const Gt = 1, pi = 2, za = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var He = null;
let Bo = null, Se = null, _e = null, Dt = null, wi = 0;
function fi(s, u) {
  const f = Se, d = He, p = s.length === 0, v = p ? za : {
    owned: null,
    cleanups: null,
    context: null,
    owner: u === void 0 ? d : u
  }, m = p ? s : () => s(() => Mt(() => Si(v)));
  He = v, Se = null;
  try {
    return mr(m, !0);
  } finally {
    Se = f, He = d;
  }
}
function An(s, u) {
  u = u ? Object.assign({}, di, u) : di;
  const f = {
    value: s,
    observers: null,
    observerSlots: null,
    comparator: u.equals || void 0
  }, d = (p) => (typeof p == "function" && (p = p(f.value)), Ga(f, p));
  return [Ua.bind(f), d];
}
function ot(s, u, f) {
  const d = el(s, u, !1, Gt);
  yr(d);
}
function gi(s, u, f) {
  _a = Gc;
  const d = el(s, u, !1, Gt);
  (!f || !f.render) && (d.user = !0), Dt ? Dt.push(d) : yr(d);
}
function qo(s, u, f) {
  f = f ? Object.assign({}, di, f) : di;
  const d = el(s, u, !0, 0);
  return d.observers = null, d.observerSlots = null, d.comparator = f.equals || void 0, yr(d), Ua.bind(d);
}
function Mt(s) {
  if (Se === null)
    return s();
  const u = Se;
  Se = null;
  try {
    return s();
  } finally {
    Se = u;
  }
}
function vr(s) {
  gi(() => Mt(s));
}
function Rc(s) {
  return He === null || (He.cleanups === null ? He.cleanups = [s] : He.cleanups.push(s)), s;
}
function _c() {
  return He;
}
function Ua() {
  if (this.sources && this.state)
    if (this.state === Gt)
      yr(this);
    else {
      const s = _e;
      _e = null, mr(() => yi(this), !1), _e = s;
    }
  if (Se) {
    const s = this.observers ? this.observers.length : 0;
    Se.sources ? (Se.sources.push(this), Se.sourceSlots.push(s)) : (Se.sources = [this], Se.sourceSlots = [s]), this.observers ? (this.observers.push(Se), this.observerSlots.push(Se.sources.length - 1)) : (this.observers = [Se], this.observerSlots = [Se.sources.length - 1]);
  }
  return this.value;
}
function Ga(s, u, f) {
  let d = s.value;
  return (!s.comparator || !s.comparator(d, u)) && (s.value = u, s.observers && s.observers.length && mr(() => {
    for (let p = 0; p < s.observers.length; p += 1) {
      const v = s.observers[p], m = Bo && Bo.running;
      m && Bo.disposed.has(v), (m ? !v.tState : !v.state) && (v.pure ? _e.push(v) : Dt.push(v), v.observers && Ka(v)), m || (v.state = Gt);
    }
    if (_e.length > 1e6)
      throw _e = [], new Error();
  }, !1)), u;
}
function yr(s) {
  if (!s.fn)
    return;
  Si(s);
  const u = He, f = Se, d = wi;
  Se = He = s, zc(s, s.value, d), Se = f, He = u;
}
function zc(s, u, f) {
  let d;
  try {
    d = s.fn(u);
  } catch (p) {
    return s.pure && (s.state = Gt, s.owned && s.owned.forEach(Si), s.owned = null), s.updatedAt = f + 1, $a(p);
  }
  (!s.updatedAt || s.updatedAt <= f) && (s.updatedAt != null && "observers" in s ? Ga(s, d) : s.value = d, s.updatedAt = f);
}
function el(s, u, f, d = Gt, p) {
  const v = {
    fn: s,
    state: d,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: u,
    owner: He,
    context: null,
    pure: f
  };
  return He === null || He !== za && (He.owned ? He.owned.push(v) : He.owned = [v]), v;
}
function vi(s) {
  if (s.state === 0)
    return;
  if (s.state === pi)
    return yi(s);
  if (s.suspense && Mt(s.suspense.inFallback))
    return s.suspense.effects.push(s);
  const u = [s];
  for (; (s = s.owner) && (!s.updatedAt || s.updatedAt < wi); )
    s.state && u.push(s);
  for (let f = u.length - 1; f >= 0; f--)
    if (s = u[f], s.state === Gt)
      yr(s);
    else if (s.state === pi) {
      const d = _e;
      _e = null, mr(() => yi(s, u[0]), !1), _e = d;
    }
}
function mr(s, u) {
  if (_e)
    return s();
  let f = !1;
  u || (_e = []), Dt ? f = !0 : Dt = [], wi++;
  try {
    const d = s();
    return Uc(f), d;
  } catch (d) {
    f || (Dt = null), _e = null, $a(d);
  }
}
function Uc(s) {
  if (_e && (qa(_e), _e = null), s)
    return;
  const u = Dt;
  Dt = null, u.length && mr(() => _a(u), !1);
}
function qa(s) {
  for (let u = 0; u < s.length; u++)
    vi(s[u]);
}
function Gc(s) {
  let u, f = 0;
  for (u = 0; u < s.length; u++) {
    const d = s[u];
    d.user ? s[f++] = d : vi(d);
  }
  for (u = 0; u < f; u++)
    vi(s[u]);
}
function yi(s, u) {
  s.state = 0;
  for (let f = 0; f < s.sources.length; f += 1) {
    const d = s.sources[f];
    if (d.sources) {
      const p = d.state;
      p === Gt ? d !== u && (!d.updatedAt || d.updatedAt < wi) && vi(d) : p === pi && yi(d, u);
    }
  }
}
function Ka(s) {
  for (let u = 0; u < s.observers.length; u += 1) {
    const f = s.observers[u];
    f.state || (f.state = pi, f.pure ? _e.push(f) : Dt.push(f), f.observers && Ka(f));
  }
}
function Si(s) {
  let u;
  if (s.sources)
    for (; s.sources.length; ) {
      const f = s.sources.pop(), d = s.sourceSlots.pop(), p = f.observers;
      if (p && p.length) {
        const v = p.pop(), m = f.observerSlots.pop();
        d < p.length && (v.sourceSlots[m] = d, p[d] = v, f.observerSlots[d] = m);
      }
    }
  if (s.owned) {
    for (u = s.owned.length - 1; u >= 0; u--)
      Si(s.owned[u]);
    s.owned = null;
  }
  if (s.cleanups) {
    for (u = s.cleanups.length - 1; u >= 0; u--)
      s.cleanups[u]();
    s.cleanups = null;
  }
  s.state = 0, s.context = null;
}
function $a(s) {
  throw s;
}
const qc = Symbol("fallback");
function pa(s) {
  for (let u = 0; u < s.length; u++)
    s[u]();
}
function Kc(s, u, f = {}) {
  let d = [], p = [], v = [], m = 0, x = u.length > 1 ? [] : null;
  return Rc(() => pa(v)), () => {
    let S = s() || [], L, T;
    return S[Bc], Mt(() => {
      let H = S.length, j, $, Q, be, xe, J, te, ce, se;
      if (H === 0)
        m !== 0 && (pa(v), v = [], d = [], p = [], m = 0, x && (x = [])), f.fallback && (d = [qc], p[0] = fi((re) => (v[0] = re, f.fallback())), m = 1);
      else if (m === 0) {
        for (p = new Array(H), T = 0; T < H; T++)
          d[T] = S[T], p[T] = fi(E);
        m = H;
      } else {
        for (Q = new Array(H), be = new Array(H), x && (xe = new Array(H)), J = 0, te = Math.min(m, H); J < te && d[J] === S[J]; J++)
          ;
        for (te = m - 1, ce = H - 1; te >= J && ce >= J && d[te] === S[ce]; te--, ce--)
          Q[ce] = p[te], be[ce] = v[te], x && (xe[ce] = x[te]);
        for (j = /* @__PURE__ */ new Map(), $ = new Array(ce + 1), T = ce; T >= J; T--)
          se = S[T], L = j.get(se), $[T] = L === void 0 ? -1 : L, j.set(se, T);
        for (L = J; L <= te; L++)
          se = d[L], T = j.get(se), T !== void 0 && T !== -1 ? (Q[T] = p[L], be[T] = v[L], x && (xe[T] = x[L]), T = $[T], j.set(se, T)) : v[L]();
        for (T = J; T < H; T++)
          T in Q ? (p[T] = Q[T], v[T] = be[T], x && (x[T] = xe[T], x[T](T))) : p[T] = fi(E);
        p = p.slice(0, m = H), d = S.slice(0);
      }
      return p;
    });
    function E(H) {
      if (v[T] = H, x) {
        const [j, $] = An(T);
        return x[T] = $, u(S[T], j);
      }
      return u(S[T]);
    }
  };
}
let $c = !1;
function Re(s, u) {
  return Mt(() => s(u || {}));
}
const Xc = (s) => `Stale read from <${s}>.`;
function Xa(s) {
  const u = "fallback" in s && {
    fallback: () => s.fallback
  };
  return qo(Kc(() => s.each, s.children, u || void 0));
}
function ai(s) {
  const u = s.keyed, f = qo(() => s.when, void 0, {
    equals: (d, p) => u ? d === p : !d == !p
  });
  return qo(() => {
    const d = f();
    if (d) {
      const p = s.children;
      return typeof p == "function" && p.length > 0 ? Mt(() => p(u ? d : () => {
        if (!Mt(f))
          throw Xc("Show");
        return s.when;
      })) : p;
    }
    return s.fallback;
  }, void 0, void 0);
}
const Yc = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], jc = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Yc]), Zc = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), Qc = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), Jc = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function Vc(s, u) {
  const f = Jc[s];
  return typeof f == "object" ? f[u] ? f.$ : void 0 : f;
}
const eh = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), th = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function nh(s, u, f) {
  let d = f.length, p = u.length, v = d, m = 0, x = 0, S = u[p - 1].nextSibling, L = null;
  for (; m < p || x < v; ) {
    if (u[m] === f[x]) {
      m++, x++;
      continue;
    }
    for (; u[p - 1] === f[v - 1]; )
      p--, v--;
    if (p === m) {
      const T = v < d ? x ? f[x - 1].nextSibling : f[v - x] : S;
      for (; x < v; )
        s.insertBefore(f[x++], T);
    } else if (v === x)
      for (; m < p; )
        (!L || !L.has(u[m])) && u[m].remove(), m++;
    else if (u[m] === f[v - 1] && f[x] === u[p - 1]) {
      const T = u[--p].nextSibling;
      s.insertBefore(f[x++], u[m++].nextSibling), s.insertBefore(f[--v], T), u[p] = f[v];
    } else {
      if (!L) {
        L = /* @__PURE__ */ new Map();
        let E = x;
        for (; E < v; )
          L.set(f[E], E++);
      }
      const T = L.get(u[m]);
      if (T != null)
        if (x < T && T < v) {
          let E = m, H = 1, j;
          for (; ++E < p && E < v && !((j = L.get(u[E])) == null || j !== T + H); )
            H++;
          if (H > T - x) {
            const $ = u[m];
            for (; x < T; )
              s.insertBefore(f[x++], $);
          } else
            s.replaceChild(f[x++], u[m++]);
        } else
          m++;
      else
        u[m++].remove();
    }
  }
}
const ga = "_$DX_DELEGATE";
function rh(s, u, f, d = {}) {
  let p;
  return fi((v) => {
    p = v, u === document ? s() : zt(u, s(), u.firstChild ? null : void 0, f);
  }, d.owner), () => {
    p(), u.textContent = "";
  };
}
function Mn(s, u, f) {
  let d;
  const p = () => {
    const m = document.createElement("template");
    return m.innerHTML = s, f ? m.content.firstChild.firstChild : m.content.firstChild;
  }, v = u ? () => (d || (d = p())).cloneNode(!0) : () => Mt(() => document.importNode(d || (d = p()), !0));
  return v.cloneNode = v, v;
}
function Ya(s, u = window.document) {
  const f = u[ga] || (u[ga] = /* @__PURE__ */ new Set());
  for (let d = 0, p = s.length; d < p; d++) {
    const v = s[d];
    f.has(v) || (f.add(v), u.addEventListener(v, ch));
  }
}
function ft(s, u, f) {
  f == null ? s.removeAttribute(u) : s.setAttribute(u, f);
}
function ih(s, u, f, d) {
  d == null ? s.removeAttributeNS(u, f) : s.setAttributeNS(u, f, d);
}
function Ve(s, u) {
  u == null ? s.removeAttribute("class") : s.className = u;
}
function oh(s, u, f, d) {
  if (d)
    Array.isArray(f) ? (s[`$$${u}`] = f[0], s[`$$${u}Data`] = f[1]) : s[`$$${u}`] = f;
  else if (Array.isArray(f)) {
    const p = f[0];
    s.addEventListener(u, f[0] = (v) => p.call(s, f[1], v));
  } else
    s.addEventListener(u, f);
}
function lh(s, u, f = {}) {
  const d = Object.keys(u || {}), p = Object.keys(f);
  let v, m;
  for (v = 0, m = p.length; v < m; v++) {
    const x = p[v];
    !x || x === "undefined" || u[x] || (va(s, x, !1), delete f[x]);
  }
  for (v = 0, m = d.length; v < m; v++) {
    const x = d[v], S = !!u[x];
    !x || x === "undefined" || f[x] === S || !S || (va(s, x, !0), f[x] = S);
  }
  return f;
}
function sh(s, u, f) {
  if (!u)
    return f ? ft(s, "style") : u;
  const d = s.style;
  if (typeof u == "string")
    return d.cssText = u;
  typeof f == "string" && (d.cssText = f = void 0), f || (f = {}), u || (u = {});
  let p, v;
  for (v in f)
    u[v] == null && d.removeProperty(v), delete f[v];
  for (v in u)
    p = u[v], p !== f[v] && (d.setProperty(v, p), f[v] = p);
  return f;
}
function ah(s, u = {}, f, d) {
  const p = {};
  return d || ot(() => p.children = Dn(s, u.children, p.children)), ot(() => u.ref && u.ref(s)), ot(() => uh(s, u, f, !0, p, !0)), p;
}
function br(s, u, f) {
  return Mt(() => s(u, f));
}
function zt(s, u, f, d) {
  if (f !== void 0 && !d && (d = []), typeof u != "function")
    return Dn(s, u, d, f);
  ot((p) => Dn(s, u(), p, f), d);
}
function uh(s, u, f, d, p = {}, v = !1) {
  u || (u = {});
  for (const m in p)
    if (!(m in u)) {
      if (m === "children")
        continue;
      p[m] = ya(s, m, null, p[m], f, v);
    }
  for (const m in u) {
    if (m === "children") {
      d || Dn(s, u.children);
      continue;
    }
    const x = u[m];
    p[m] = ya(s, m, x, p[m], f, v);
  }
}
function fh(s) {
  return s.toLowerCase().replace(/-([a-z])/g, (u, f) => f.toUpperCase());
}
function va(s, u, f) {
  const d = u.trim().split(/\s+/);
  for (let p = 0, v = d.length; p < v; p++)
    s.classList.toggle(d[p], f);
}
function ya(s, u, f, d, p, v) {
  let m, x, S, L, T;
  if (u === "style")
    return sh(s, f, d);
  if (u === "classList")
    return lh(s, f, d);
  if (f === d)
    return d;
  if (u === "ref")
    v || f(s);
  else if (u.slice(0, 3) === "on:") {
    const E = u.slice(3);
    d && s.removeEventListener(E, d), f && s.addEventListener(E, f);
  } else if (u.slice(0, 10) === "oncapture:") {
    const E = u.slice(10);
    d && s.removeEventListener(E, d, !0), f && s.addEventListener(E, f, !0);
  } else if (u.slice(0, 2) === "on") {
    const E = u.slice(2).toLowerCase(), H = eh.has(E);
    if (!H && d) {
      const j = Array.isArray(d) ? d[0] : d;
      s.removeEventListener(E, j);
    }
    (H || f) && (oh(s, E, f, H), H && Ya([E]));
  } else if (u.slice(0, 5) === "attr:")
    ft(s, u.slice(5), f);
  else if ((T = u.slice(0, 5) === "prop:") || (S = Zc.has(u)) || !p && ((L = Vc(u, s.tagName)) || (x = jc.has(u))) || (m = s.nodeName.includes("-")))
    T && (u = u.slice(5), x = !0), u === "class" || u === "className" ? Ve(s, f) : m && !x && !S ? s[fh(u)] = f : s[L || u] = f;
  else {
    const E = p && u.indexOf(":") > -1 && th[u.split(":")[0]];
    E ? ih(s, E, u, f) : ft(s, Qc[u] || u, f);
  }
  return f;
}
function ch(s) {
  const u = `$$${s.type}`;
  let f = s.composedPath && s.composedPath()[0] || s.target;
  for (s.target !== f && Object.defineProperty(s, "target", {
    configurable: !0,
    value: f
  }), Object.defineProperty(s, "currentTarget", {
    configurable: !0,
    get() {
      return f || document;
    }
  }); f; ) {
    const d = f[u];
    if (d && !f.disabled) {
      const p = f[`${u}Data`];
      if (p !== void 0 ? d.call(f, p, s) : d.call(f, s), s.cancelBubble)
        return;
    }
    f = f._$host || f.parentNode || f.host;
  }
}
function Dn(s, u, f, d, p) {
  for (; typeof f == "function"; )
    f = f();
  if (u === f)
    return f;
  const v = typeof u, m = d !== void 0;
  if (s = m && f[0] && f[0].parentNode || s, v === "string" || v === "number")
    if (v === "number" && (u = u.toString()), m) {
      let x = f[0];
      x && x.nodeType === 3 ? x.data = u : x = document.createTextNode(u), f = Fn(s, f, d, x);
    } else
      f !== "" && typeof f == "string" ? f = s.firstChild.data = u : f = s.textContent = u;
  else if (u == null || v === "boolean")
    f = Fn(s, f, d);
  else {
    if (v === "function")
      return ot(() => {
        let x = u();
        for (; typeof x == "function"; )
          x = x();
        f = Dn(s, x, f, d);
      }), () => f;
    if (Array.isArray(u)) {
      const x = [], S = f && Array.isArray(f);
      if (Ko(x, u, f, p))
        return ot(() => f = Dn(s, x, f, d, !0)), () => f;
      if (x.length === 0) {
        if (f = Fn(s, f, d), m)
          return f;
      } else
        S ? f.length === 0 ? ma(s, x, d) : nh(s, f, x) : (f && Fn(s), ma(s, x));
      f = x;
    } else if (u instanceof Node) {
      if (Array.isArray(f)) {
        if (m)
          return f = Fn(s, f, d, u);
        Fn(s, f, null, u);
      } else
        f == null || f === "" || !s.firstChild ? s.appendChild(u) : s.replaceChild(u, s.firstChild);
      f = u;
    } else
      console.warn("Unrecognized value. Skipped inserting", u);
  }
  return f;
}
function Ko(s, u, f, d) {
  let p = !1;
  for (let v = 0, m = u.length; v < m; v++) {
    let x = u[v], S = f && f[v];
    if (x instanceof Node)
      s.push(x);
    else if (!(x == null || x === !0 || x === !1))
      if (Array.isArray(x))
        p = Ko(s, x, S) || p;
      else if (typeof x == "function")
        if (d) {
          for (; typeof x == "function"; )
            x = x();
          p = Ko(s, Array.isArray(x) ? x : [x], Array.isArray(S) ? S : [S]) || p;
        } else
          s.push(x), p = !0;
      else {
        const L = String(x);
        S && S.nodeType === 3 ? (S.data = L, s.push(S)) : s.push(document.createTextNode(L));
      }
  }
  return p;
}
function ma(s, u, f = null) {
  for (let d = 0, p = u.length; d < p; d++)
    s.insertBefore(u[d], f);
}
function Fn(s, u, f, d) {
  if (f === void 0)
    return s.textContent = "";
  const p = d || document.createTextNode("");
  if (u.length) {
    let v = !1;
    for (let m = u.length - 1; m >= 0; m--) {
      const x = u[m];
      if (p !== x) {
        const S = x.parentNode === s;
        !v && !m ? S ? s.replaceChild(p, x) : s.insertBefore(p, f) : S && x.remove();
      } else
        v = !0;
    }
  } else
    s.insertBefore(p, f);
  return [p];
}
var hh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ro = { exports: {} }, ba;
function ja() {
  return ba || (ba = 1, function(s, u) {
    (function(f, d) {
      s.exports = d();
    })(hh, function() {
      var f = navigator.userAgent, d = navigator.platform, p = /gecko\/\d/i.test(f), v = /MSIE \d/.test(f), m = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(f), x = /Edge\/(\d+)/.exec(f), S = v || m || x, L = S && (v ? document.documentMode || 6 : +(x || m)[1]), T = !x && /WebKit\//.test(f), E = T && /Qt\/\d+\.\d+/.test(f), H = !x && /Chrome\/(\d+)/.exec(f), j = H && +H[1], $ = /Opera\//.test(f), Q = /Apple Computer/.test(navigator.vendor), be = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(f), xe = /PhantomJS/.test(f), J = Q && (/Mobile\/\w+/.test(f) || navigator.maxTouchPoints > 2), te = /Android/.test(f), ce = J || te || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(f), se = J || /Mac/.test(d), re = /\bCrOS\b/.test(f), q = /win/i.test(d), ze = $ && f.match(/Version\/(\d*\.\d*)/);
      ze && (ze = Number(ze[1])), ze && ze >= 15 && ($ = !1, T = !0);
      var Ee = se && (E || $ && (ze == null || ze < 12.11)), je = p || S && L >= 9;
      function xt(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
      }
      var wt = function(e, t) {
        var r = e.className, n = xt(t).exec(r);
        if (n) {
          var i = r.slice(n.index + n[0].length);
          e.className = r.slice(0, n.index) + (i ? n[1] + i : "");
        }
      };
      function ht(e) {
        for (var t = e.childNodes.length; t > 0; --t)
          e.removeChild(e.firstChild);
        return e;
      }
      function Ue(e, t) {
        return ht(e).appendChild(t);
      }
      function z(e, t, r, n) {
        var i = document.createElement(e);
        if (r && (i.className = r), n && (i.style.cssText = n), typeof t == "string")
          i.appendChild(document.createTextNode(t));
        else if (t)
          for (var o = 0; o < t.length; ++o)
            i.appendChild(t[o]);
        return i;
      }
      function Et(e, t, r, n) {
        var i = z(e, t, r, n);
        return i.setAttribute("role", "presentation"), i;
      }
      var dt;
      document.createRange ? dt = function(e, t, r, n) {
        var i = document.createRange();
        return i.setEnd(n || e, r), i.setStart(e, t), i;
      } : dt = function(e, t, r) {
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
        xt(t).test(r) || (e.className += (r ? " " : "") + t);
      }
      function U(e, t) {
        for (var r = e.split(" "), n = 0; n < r.length; n++)
          r[n] && !xt(r[n]).test(t) && (t += " " + r[n]);
        return t;
      }
      var K = function(e) {
        e.select();
      };
      J ? K = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : S && (K = function(e) {
        try {
          e.select();
        } catch {
        }
      });
      function V(e) {
        return e.display.wrapper.ownerDocument;
      }
      function Ne(e) {
        return V(e).defaultView;
      }
      function Ze(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
          return e.apply(null, t);
        };
      }
      function Pe(e, t, r) {
        t || (t = {});
        for (var n in e)
          e.hasOwnProperty(n) && (r !== !1 || !t.hasOwnProperty(n)) && (t[n] = e[n]);
        return t;
      }
      function pe(e, t, r, n, i) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var o = n || 0, l = i || 0; ; ) {
          var a = e.indexOf("	", o);
          if (a < 0 || a >= t)
            return l + (t - o);
          l += a - o, l += r - l % r, o = a + 1;
        }
      }
      var Ce = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = Ze(this.onTimeout, this);
      };
      Ce.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +new Date() ? e.f() : setTimeout(e.handler, e.time - +new Date());
      }, Ce.prototype.set = function(e, t) {
        this.f = t;
        var r = +new Date() + e;
        (!this.id || r < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = r);
      };
      function ee(e, t) {
        for (var r = 0; r < e.length; ++r)
          if (e[r] == t)
            return r;
        return -1;
      }
      var Cr = 50, kr = { toString: function() {
        return "CodeMirror.Pass";
      } }, pt = { scroll: !1 }, Li = { origin: "*mouse" }, En = { origin: "+move" };
      function Ti(e, t, r) {
        for (var n = 0, i = 0; ; ) {
          var o = e.indexOf("	", n);
          o == -1 && (o = e.length);
          var l = o - n;
          if (o == e.length || i + l >= t)
            return n + Math.min(l, t - i);
          if (i += o - n, i += r - i % r, n = o + 1, i >= t)
            return n;
        }
      }
      var Lr = [""];
      function Fi(e) {
        for (; Lr.length <= e; )
          Lr.push(ie(Lr) + " ");
        return Lr[e];
      }
      function ie(e) {
        return e[e.length - 1];
      }
      function Tr(e, t) {
        for (var r = [], n = 0; n < e.length; n++)
          r[n] = t(e[n], n);
        return r;
      }
      function wu(e, t, r) {
        for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i; )
          n++;
        e.splice(n, 0, t);
      }
      function ll() {
      }
      function sl(e, t) {
        var r;
        return Object.create ? r = Object.create(e) : (ll.prototype = e, r = new ll()), t && Pe(t, r), r;
      }
      var Su = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function Ai(e) {
        return /\w/.test(e) || e > "\x80" && (e.toUpperCase() != e.toLowerCase() || Su.test(e));
      }
      function Fr(e, t) {
        return t ? t.source.indexOf("\\w") > -1 && Ai(e) ? !0 : t.test(e) : Ai(e);
      }
      function al(e) {
        for (var t in e)
          if (e.hasOwnProperty(t) && e[t])
            return !1;
        return !0;
      }
      var Cu = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function Di(e) {
        return e.charCodeAt(0) >= 768 && Cu.test(e);
      }
      function ul(e, t, r) {
        for (; (r < 0 ? t > 0 : t < e.length) && Di(e.charAt(t)); )
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
      function ku(e, t, r, n) {
        if (!e)
          return n(t, r, "ltr", 0);
        for (var i = !1, o = 0; o < e.length; ++o) {
          var l = e[o];
          (l.from < r && l.to > t || t == r && l.to == t) && (n(Math.max(l.from, t), Math.min(l.to, r), l.level == 1 ? "rtl" : "ltr", o), i = !0);
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
      var Lu = function() {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function r(h) {
          return h <= 247 ? e.charAt(h) : 1424 <= h && h <= 1524 ? "R" : 1536 <= h && h <= 1785 ? t.charAt(h - 1536) : 1774 <= h && h <= 2220 ? "r" : 8192 <= h && h <= 8203 ? "w" : h == 8204 ? "b" : "L";
        }
        var n = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, i = /[stwN]/, o = /[LRr]/, l = /[Lb1n]/, a = /[1n]/;
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
          for (var _ = 1, R = C[0]; _ < k - 1; ++_) {
            var Z = C[_];
            Z == "+" && R == "1" && C[_ + 1] == "1" ? C[_] = "1" : Z == "," && R == C[_ + 1] && (R == "1" || R == "n") && (C[_] = R), R = Z;
          }
          for (var ae = 0; ae < k; ++ae) {
            var Ae = C[ae];
            if (Ae == ",")
              C[ae] = "N";
            else if (Ae == "%") {
              var fe = void 0;
              for (fe = ae + 1; fe < k && C[fe] == "%"; ++fe)
                ;
              for (var Je = ae && C[ae - 1] == "!" || fe < k && C[fe] == "1" ? "1" : "N", $e = ae; $e < fe; ++$e)
                C[$e] = Je;
              ae = fe - 1;
            }
          }
          for (var ye = 0, Xe = b; ye < k; ++ye) {
            var Me = C[ye];
            Xe == "L" && Me == "1" ? C[ye] = "L" : o.test(Me) && (Xe = Me);
          }
          for (var we = 0; we < k; ++we)
            if (i.test(C[we])) {
              var me = void 0;
              for (me = we + 1; me < k && i.test(C[me]); ++me)
                ;
              for (var he = (we ? C[we - 1] : b) == "L", Ye = (me < k ? C[me] : b) == "L", Ln = he == Ye ? he ? "L" : "R" : b, _t = we; _t < me; ++_t)
                C[_t] = Ln;
              we = me - 1;
            }
          for (var Ie = [], bt, De = 0; De < k; )
            if (l.test(C[De])) {
              var Po = De;
              for (++De; De < k && l.test(C[De]); ++De)
                ;
              Ie.push(new c(0, Po, De));
            } else {
              var At = De, tn = Ie.length, nn = y == "rtl" ? 1 : 0;
              for (++De; De < k && C[De] != "L"; ++De)
                ;
              for (var Be = At; Be < De; )
                if (a.test(C[Be])) {
                  At < Be && (Ie.splice(tn, 0, new c(1, At, Be)), tn += nn);
                  var Tn = Be;
                  for (++Be; Be < De && a.test(C[Be]); ++Be)
                    ;
                  Ie.splice(tn, 0, new c(2, Tn, Be)), tn += nn, At = Be;
                } else
                  ++Be;
              At < De && Ie.splice(tn, 0, new c(1, At, De));
            }
          return y == "ltr" && (Ie[0].level == 1 && (bt = h.match(/^\s+/)) && (Ie[0].from = bt[0].length, Ie.unshift(new c(0, 0, bt[0].length))), ie(Ie).level == 1 && (bt = h.match(/\s+$/)) && (ie(Ie).to -= bt[0].length, Ie.push(new c(0, k - bt[0].length, k)))), y == "rtl" ? Ie.reverse() : Ie;
        };
      }();
      function St(e, t) {
        var r = e.order;
        return r == null && (r = e.order = Lu(e.text, t)), r;
      }
      var fl = [], G = function(e, t, r) {
        if (e.addEventListener)
          e.addEventListener(t, r, !1);
        else if (e.attachEvent)
          e.attachEvent("on" + t, r);
        else {
          var n = e._handlers || (e._handlers = {});
          n[t] = (n[t] || fl).concat(r);
        }
      };
      function Mi(e, t) {
        return e._handlers && e._handlers[t] || fl;
      }
      function et(e, t, r) {
        if (e.removeEventListener)
          e.removeEventListener(t, r, !1);
        else if (e.detachEvent)
          e.detachEvent("on" + t, r);
        else {
          var n = e._handlers, i = n && n[t];
          if (i) {
            var o = ee(i, r);
            o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)));
          }
        }
      }
      function ge(e, t) {
        var r = Mi(e, t);
        if (!!r.length)
          for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i)
            r[i].apply(null, n);
      }
      function ke(e, t, r) {
        return typeof t == "string" && (t = { type: t, preventDefault: function() {
          this.defaultPrevented = !0;
        } }), ge(e, r || t.type, e, t), Ei(t) || t.codemirrorIgnore;
      }
      function cl(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (!!t)
          for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n)
            ee(r, t[n]) == -1 && r.push(t[n]);
      }
      function rt(e, t) {
        return Mi(e, t).length > 0;
      }
      function on(e) {
        e.prototype.on = function(t, r) {
          G(this, t, r);
        }, e.prototype.off = function(t, r) {
          et(this, t, r);
        };
      }
      function Ge(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }
      function hl(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }
      function Ei(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == !1;
      }
      function Hn(e) {
        Ge(e), hl(e);
      }
      function Ni(e) {
        return e.target || e.srcElement;
      }
      function dl(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), se && e.ctrlKey && t == 1 && (t = 3), t;
      }
      var Tu = function() {
        if (S && L < 9)
          return !1;
        var e = z("div");
        return "draggable" in e || "dragDrop" in e;
      }(), Oi;
      function Fu(e) {
        if (Oi == null) {
          var t = z("span", "\u200B");
          Ue(e, z("span", [t, document.createTextNode("x")])), e.firstChild.offsetHeight != 0 && (Oi = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(S && L < 8));
        }
        var r = Oi ? z("span", "\u200B") : z("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
        return r.setAttribute("cm-text", ""), r;
      }
      var Ii;
      function Au(e) {
        if (Ii != null)
          return Ii;
        var t = Ue(e, document.createTextNode("A\u062EA")), r = dt(t, 0, 1).getBoundingClientRect(), n = dt(t, 1, 2).getBoundingClientRect();
        return ht(e), !r || r.left == r.right ? !1 : Ii = n.right - r.right < 3;
      }
      var Hi = `

b`.split(/\n/).length != 3 ? function(e) {
        for (var t = 0, r = [], n = e.length; t <= n; ) {
          var i = e.indexOf(`
`, t);
          i == -1 && (i = e.length);
          var o = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i), l = o.indexOf("\r");
          l != -1 ? (r.push(o.slice(0, l)), t += l + 1) : (r.push(o), t = i + 1);
        }
        return r;
      } : function(e) {
        return e.split(/\r\n?|\n/);
      }, Du = window.getSelection ? function(e) {
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
      }, Mu = function() {
        var e = z("div");
        return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), typeof e.oncopy == "function");
      }(), Pi = null;
      function Eu(e) {
        if (Pi != null)
          return Pi;
        var t = Ue(e, z("span", "x")), r = t.getBoundingClientRect(), n = dt(t, 0, 1).getBoundingClientRect();
        return Pi = Math.abs(r.left - n.left) > 1;
      }
      var Wi = {}, ln = {};
      function Nu(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Wi[e] = t;
      }
      function Ou(e, t) {
        ln[e] = t;
      }
      function Ar(e) {
        if (typeof e == "string" && ln.hasOwnProperty(e))
          e = ln[e];
        else if (e && typeof e.name == "string" && ln.hasOwnProperty(e.name)) {
          var t = ln[e.name];
          typeof t == "string" && (t = { name: t }), e = sl(t, e), e.name = t.name;
        } else {
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
            return Ar("application/xml");
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
            return Ar("application/json");
        }
        return typeof e == "string" ? { name: e } : e || { name: "null" };
      }
      function Bi(e, t) {
        t = Ar(t);
        var r = Wi[t.name];
        if (!r)
          return Bi(e, "text/plain");
        var n = r(e, t);
        if (sn.hasOwnProperty(t.name)) {
          var i = sn[t.name];
          for (var o in i)
            !i.hasOwnProperty(o) || (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o]);
        }
        if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps)
          for (var l in t.modeProps)
            n[l] = t.modeProps[l];
        return n;
      }
      var sn = {};
      function Iu(e, t) {
        var r = sn.hasOwnProperty(e) ? sn[e] : sn[e] = {};
        Pe(t, r);
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
      function Ri(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t), !(!r || r.mode == e)); )
          t = r.state, e = r.mode;
        return r || { mode: e, state: t };
      }
      function pl(e, t, r) {
        return e.startState ? e.startState(t, r) : !0;
      }
      var ve = function(e, t, r) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = r;
      };
      ve.prototype.eol = function() {
        return this.pos >= this.string.length;
      }, ve.prototype.sol = function() {
        return this.pos == this.lineStart;
      }, ve.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      }, ve.prototype.next = function() {
        if (this.pos < this.string.length)
          return this.string.charAt(this.pos++);
      }, ve.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos), r;
        if (typeof e == "string" ? r = t == e : r = t && (e.test ? e.test(t) : e(t)), r)
          return ++this.pos, t;
      }, ve.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e); )
          ;
        return this.pos > t;
      }, ve.prototype.eatSpace = function() {
        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
          ++this.pos;
        return this.pos > e;
      }, ve.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      }, ve.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1)
          return this.pos = t, !0;
      }, ve.prototype.backUp = function(e) {
        this.pos -= e;
      }, ve.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = pe(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? pe(this.string, this.lineStart, this.tabSize) : 0);
      }, ve.prototype.indentation = function() {
        return pe(this.string, null, this.tabSize) - (this.lineStart ? pe(this.string, this.lineStart, this.tabSize) : 0);
      }, ve.prototype.match = function(e, t, r) {
        if (typeof e == "string") {
          var n = function(l) {
            return r ? l.toLowerCase() : l;
          }, i = this.string.substr(this.pos, e.length);
          if (n(i) == n(e))
            return t !== !1 && (this.pos += e.length), !0;
        } else {
          var o = this.string.slice(this.pos).match(e);
          return o && o.index > 0 ? null : (o && t !== !1 && (this.pos += o[0].length), o);
        }
      }, ve.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      }, ve.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      }, ve.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
      }, ve.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
      };
      function B(e, t) {
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
          var l = o.text;
          i == r.line && (l = l.slice(0, r.ch)), i == t.line && (l = l.slice(t.ch)), n.push(l), ++i;
        }), n;
      }
      function _i(e, t, r) {
        var n = [];
        return e.iter(t, r, function(i) {
          n.push(i.text);
        }), n;
      }
      function gt(e, t) {
        var r = t - e.height;
        if (r)
          for (var n = e; n; n = n.parent)
            n.height += r;
      }
      function oe(e) {
        if (e.parent == null)
          return null;
        for (var t = e.parent, r = ee(t.lines, e), n = t.parent; n; t = n, n = n.parent)
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
        for (var l = 0; l < e.lines.length; ++l) {
          var a = e.lines[l], c = a.height;
          if (t < c)
            break;
          t -= c;
        }
        return r + l;
      }
      function Pn(e, t) {
        return t >= e.first && t < e.first + e.size;
      }
      function zi(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }
      function D(e, t, r) {
        if (r === void 0 && (r = null), !(this instanceof D))
          return new D(e, t, r);
        this.line = e, this.ch = t, this.sticky = r;
      }
      function X(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }
      function Ui(e, t) {
        return e.sticky == t.sticky && X(e, t) == 0;
      }
      function Gi(e) {
        return D(e.line, e.ch);
      }
      function Dr(e, t) {
        return X(e, t) < 0 ? t : e;
      }
      function Mr(e, t) {
        return X(e, t) < 0 ? e : t;
      }
      function gl(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }
      function Y(e, t) {
        if (t.line < e.first)
          return D(e.first, 0);
        var r = e.first + e.size - 1;
        return t.line > r ? D(r, B(e, r).text.length) : Hu(t, B(e, t.line).text.length);
      }
      function Hu(e, t) {
        var r = e.ch;
        return r == null || r > t ? D(e.line, t) : r < 0 ? D(e.line, 0) : e;
      }
      function vl(e, t) {
        for (var r = [], n = 0; n < t.length; n++)
          r[n] = Y(e, t[n]);
        return r;
      }
      var Er = function(e, t) {
        this.state = e, this.lookAhead = t;
      }, vt = function(e, t, r, n) {
        this.state = t, this.doc = e, this.line = r, this.maxLookAhead = n || 0, this.baseTokens = null, this.baseTokenPos = 1;
      };
      vt.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
      }, vt.prototype.baseToken = function(e) {
        if (!this.baseTokens)
          return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; )
          this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: t && t.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - e
        };
      }, vt.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }, vt.fromSaved = function(e, t, r) {
        return t instanceof Er ? new vt(e, qt(e.mode, t.state), r, t.lookAhead) : new vt(e, qt(e.mode, t), r);
      }, vt.prototype.save = function(e) {
        var t = e !== !1 ? qt(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new Er(t, this.maxLookAhead) : t;
      };
      function yl(e, t, r, n) {
        var i = [e.state.modeGen], o = {};
        Cl(
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
        for (var l = r.state, a = function(h) {
          r.baseTokens = i;
          var y = e.state.overlays[h], b = 1, k = 0;
          r.state = !0, Cl(e, t.text, y.mode, r, function(C, F) {
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
          }, o), r.state = l, r.baseTokens = null, r.baseTokenPos = 1;
        }, c = 0; c < e.state.overlays.length; ++c)
          a(c);
        return { styles: i, classes: o.bgClass || o.textClass ? o : null };
      }
      function ml(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var n = Wn(e, oe(t)), i = t.text.length > e.options.maxHighlightLength && qt(e.doc.mode, n.state), o = yl(e, t, n);
          i && (n.state = i), t.stateAfter = n.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        }
        return t.styles;
      }
      function Wn(e, t, r) {
        var n = e.doc, i = e.display;
        if (!n.mode.startState)
          return new vt(n, !0, t);
        var o = Pu(e, t, r), l = o > n.first && B(n, o - 1).stateAfter, a = l ? vt.fromSaved(n, l, o) : new vt(n, pl(n.mode), o);
        return n.iter(o, t, function(c) {
          qi(e, c.text, a);
          var h = a.line;
          c.stateAfter = h == t - 1 || h % 5 == 0 || h >= i.viewFrom && h < i.viewTo ? a.save() : null, a.nextLine();
        }), r && (n.modeFrontier = a.line), a;
      }
      function qi(e, t, r, n) {
        var i = e.doc.mode, o = new ve(t, e.options.tabSize, r);
        for (o.start = o.pos = n || 0, t == "" && bl(i, r.state); !o.eol(); )
          Ki(i, o, r.state), o.start = o.pos;
      }
      function bl(e, t) {
        if (e.blankLine)
          return e.blankLine(t);
        if (!!e.innerMode) {
          var r = Ri(e, t);
          if (r.mode.blankLine)
            return r.mode.blankLine(r.state);
        }
      }
      function Ki(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
          n && (n[0] = Ri(e, r).mode);
          var o = e.token(t, r);
          if (t.pos > t.start)
            return o;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
      }
      var xl = function(e, t, r) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = r;
      };
      function wl(e, t, r, n) {
        var i = e.doc, o = i.mode, l;
        t = Y(i, t);
        var a = B(i, t.line), c = Wn(e, t.line, r), h = new ve(a.text, e.options.tabSize, c), y;
        for (n && (y = []); (n || h.pos < t.ch) && !h.eol(); )
          h.start = h.pos, l = Ki(o, h, c.state), n && y.push(new xl(h, l, qt(i.mode, c.state)));
        return n ? y : new xl(h, l, c.state);
      }
      function Sl(e, t) {
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
      function Cl(e, t, r, n, i, o, l) {
        var a = r.flattenSpans;
        a == null && (a = e.options.flattenSpans);
        var c = 0, h = null, y = new ve(t, e.options.tabSize, n), b, k = e.options.addModeClass && [null];
        for (t == "" && Sl(bl(r, n.state), o); !y.eol(); ) {
          if (y.pos > e.options.maxHighlightLength ? (a = !1, l && qi(e, t, n, y.pos), y.pos = t.length, b = null) : b = Sl(Ki(r, y, n.state, k), o), k) {
            var C = k[0].name;
            C && (b = "m-" + (b ? C + " " + b : C));
          }
          if (!a || h != b) {
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
      function Pu(e, t, r) {
        for (var n, i, o = e.doc, l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > l; --a) {
          if (a <= o.first)
            return o.first;
          var c = B(o, a - 1), h = c.stateAfter;
          if (h && (!r || a + (h instanceof Er ? h.lookAhead : 0) <= o.modeFrontier))
            return a;
          var y = pe(c.text, null, e.options.tabSize);
          (i == null || n > y) && (i = a - 1, n = y);
        }
        return i;
      }
      function Wu(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
          for (var r = e.first, n = t - 1; n > r; n--) {
            var i = B(e, n).stateAfter;
            if (i && (!(i instanceof Er) || n + i.lookAhead < t)) {
              r = n + 1;
              break;
            }
          }
          e.highlightFrontier = Math.min(e.highlightFrontier, r);
        }
      }
      var kl = !1, Ct = !1;
      function Bu() {
        kl = !0;
      }
      function Ru() {
        Ct = !0;
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
      function _u(e, t) {
        for (var r, n = 0; n < e.length; ++n)
          e[n] != t && (r || (r = [])).push(e[n]);
        return r;
      }
      function zu(e, t, r) {
        var n = r && window.WeakSet && (r.markedSpans || (r.markedSpans = /* @__PURE__ */ new WeakSet()));
        n && e.markedSpans && n.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], n && n.add(e.markedSpans)), t.marker.attachLine(e);
      }
      function Uu(e, t, r) {
        var n;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], l = o.marker, a = o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
            if (a || o.from == t && l.type == "bookmark" && (!r || !o.marker.insertLeft)) {
              var c = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
              (n || (n = [])).push(new Nr(l, o.from, c ? null : o.to));
            }
          }
        return n;
      }
      function Gu(e, t, r) {
        var n;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], l = o.marker, a = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
            if (a || o.from == t && l.type == "bookmark" && (!r || o.marker.insertLeft)) {
              var c = o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
              (n || (n = [])).push(new Nr(
                l,
                c ? null : o.from - t,
                o.to == null ? null : o.to - t
              ));
            }
          }
        return n;
      }
      function $i(e, t) {
        if (t.full)
          return null;
        var r = Pn(e, t.from.line) && B(e, t.from.line).markedSpans, n = Pn(e, t.to.line) && B(e, t.to.line).markedSpans;
        if (!r && !n)
          return null;
        var i = t.from.ch, o = t.to.ch, l = X(t.from, t.to) == 0, a = Uu(r, i, l), c = Gu(n, o, l), h = t.text.length == 1, y = ie(t.text).length + (h ? i : 0);
        if (a)
          for (var b = 0; b < a.length; ++b) {
            var k = a[b];
            if (k.to == null) {
              var C = Bn(c, k.marker);
              C ? h && (k.to = C.to == null ? null : C.to + y) : k.to = i;
            }
          }
        if (c)
          for (var F = 0; F < c.length; ++F) {
            var A = c[F];
            if (A.to != null && (A.to += y), A.from == null) {
              var M = Bn(a, A.marker);
              M || (A.from = y, h && (a || (a = [])).push(A));
            } else
              A.from += y, h && (a || (a = [])).push(A);
          }
        a && (a = Ll(a)), c && c != a && (c = Ll(c));
        var N = [a];
        if (!h) {
          var I = t.text.length - 2, O;
          if (I > 0 && a)
            for (var P = 0; P < a.length; ++P)
              a[P].to == null && (O || (O = [])).push(new Nr(a[P].marker, null, null));
          for (var _ = 0; _ < I; ++_)
            N.push(O);
          N.push(c);
        }
        return N;
      }
      function Ll(e) {
        for (var t = 0; t < e.length; ++t) {
          var r = e[t];
          r.from != null && r.from == r.to && r.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
        }
        return e.length ? e : null;
      }
      function qu(e, t, r) {
        var n = null;
        if (e.iter(t.line, r.line + 1, function(C) {
          if (C.markedSpans)
            for (var F = 0; F < C.markedSpans.length; ++F) {
              var A = C.markedSpans[F].marker;
              A.readOnly && (!n || ee(n, A) == -1) && (n || (n = [])).push(A);
            }
        }), !n)
          return null;
        for (var i = [{ from: t, to: r }], o = 0; o < n.length; ++o)
          for (var l = n[o], a = l.find(0), c = 0; c < i.length; ++c) {
            var h = i[c];
            if (!(X(h.to, a.from) < 0 || X(h.from, a.to) > 0)) {
              var y = [c, 1], b = X(h.from, a.from), k = X(h.to, a.to);
              (b < 0 || !l.inclusiveLeft && !b) && y.push({ from: h.from, to: a.from }), (k > 0 || !l.inclusiveRight && !k) && y.push({ from: a.to, to: h.to }), i.splice.apply(i, y), c += y.length - 3;
            }
          }
        return i;
      }
      function Tl(e) {
        var t = e.markedSpans;
        if (!!t) {
          for (var r = 0; r < t.length; ++r)
            t[r].marker.detachLine(e);
          e.markedSpans = null;
        }
      }
      function Fl(e, t) {
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
        var n = e.find(), i = t.find(), o = X(n.from, i.from) || Or(e) - Or(t);
        if (o)
          return -o;
        var l = X(n.to, i.to) || Ir(e) - Ir(t);
        return l || t.id - e.id;
      }
      function Al(e, t) {
        var r = Ct && e.markedSpans, n;
        if (r)
          for (var i = void 0, o = 0; o < r.length; ++o)
            i = r[o], i.marker.collapsed && (t ? i.from : i.to) == null && (!n || Xi(n, i.marker) < 0) && (n = i.marker);
        return n;
      }
      function Dl(e) {
        return Al(e, !0);
      }
      function Hr(e) {
        return Al(e, !1);
      }
      function Ku(e, t) {
        var r = Ct && e.markedSpans, n;
        if (r)
          for (var i = 0; i < r.length; ++i) {
            var o = r[i];
            o.marker.collapsed && (o.from == null || o.from < t) && (o.to == null || o.to > t) && (!n || Xi(n, o.marker) < 0) && (n = o.marker);
          }
        return n;
      }
      function Ml(e, t, r, n, i) {
        var o = B(e, t), l = Ct && o.markedSpans;
        if (l)
          for (var a = 0; a < l.length; ++a) {
            var c = l[a];
            if (!!c.marker.collapsed) {
              var h = c.marker.find(0), y = X(h.from, r) || Or(c.marker) - Or(i), b = X(h.to, n) || Ir(c.marker) - Ir(i);
              if (!(y >= 0 && b <= 0 || y <= 0 && b >= 0) && (y <= 0 && (c.marker.inclusiveRight && i.inclusiveLeft ? X(h.to, r) >= 0 : X(h.to, r) > 0) || y >= 0 && (c.marker.inclusiveRight && i.inclusiveLeft ? X(h.from, n) <= 0 : X(h.from, n) < 0)))
                return !0;
            }
          }
      }
      function lt(e) {
        for (var t; t = Dl(e); )
          e = t.find(-1, !0).line;
        return e;
      }
      function $u(e) {
        for (var t; t = Hr(e); )
          e = t.find(1, !0).line;
        return e;
      }
      function Xu(e) {
        for (var t, r; t = Hr(e); )
          e = t.find(1, !0).line, (r || (r = [])).push(e);
        return r;
      }
      function Yi(e, t) {
        var r = B(e, t), n = lt(r);
        return r == n ? t : oe(n);
      }
      function El(e, t) {
        if (t > e.lastLine())
          return t;
        var r = B(e, t), n;
        if (!Nt(e, r))
          return t;
        for (; n = Hr(r); )
          r = n.find(1, !0).line;
        return oe(r) + 1;
      }
      function Nt(e, t) {
        var r = Ct && t.markedSpans;
        if (r) {
          for (var n = void 0, i = 0; i < r.length; ++i)
            if (n = r[i], !!n.marker.collapsed) {
              if (n.from == null)
                return !0;
              if (!n.marker.widgetNode && n.from == 0 && n.marker.inclusiveLeft && ji(e, t, n))
                return !0;
            }
        }
      }
      function ji(e, t, r) {
        if (r.to == null) {
          var n = r.marker.find(1, !0);
          return ji(e, n.line, Bn(n.line.markedSpans, r.marker));
        }
        if (r.marker.inclusiveRight && r.to == t.text.length)
          return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
          if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == r.to && (i.to == null || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && ji(e, t, i))
            return !0;
      }
      function kt(e) {
        e = lt(e);
        for (var t = 0, r = e.parent, n = 0; n < r.lines.length; ++n) {
          var i = r.lines[n];
          if (i == e)
            break;
          t += i.height;
        }
        for (var o = r.parent; o; r = o, o = r.parent)
          for (var l = 0; l < o.children.length; ++l) {
            var a = o.children[l];
            if (a == r)
              break;
            t += a.height;
          }
        return t;
      }
      function Pr(e) {
        if (e.height == 0)
          return 0;
        for (var t = e.text.length, r, n = e; r = Dl(n); ) {
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
        t.maxLine = B(r, r.first), t.maxLineLength = Pr(t.maxLine), t.maxLineChanged = !0, r.iter(function(n) {
          var i = Pr(n);
          i > t.maxLineLength && (t.maxLineLength = i, t.maxLine = n);
        });
      }
      var an = function(e, t, r) {
        this.text = e, Fl(this, t), this.height = r ? r(this) : 1;
      };
      an.prototype.lineNo = function() {
        return oe(this);
      }, on(an);
      function Yu(e, t, r, n) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), e.order != null && (e.order = null), Tl(e), Fl(e, r);
        var i = n ? n(e) : 1;
        i != e.height && gt(e, i);
      }
      function ju(e) {
        e.parent = null, Tl(e);
      }
      var Zu = {}, Qu = {};
      function Nl(e, t) {
        if (!e || /^\s*$/.test(e))
          return null;
        var r = t.addModeClass ? Qu : Zu;
        return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
      }
      function Ol(e, t) {
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
          var o = i ? t.rest[i - 1] : t.line, l = void 0;
          n.pos = 0, n.addToken = Vu, Au(e.display.measure) && (l = St(o, e.doc.direction)) && (n.addToken = tf(n.addToken, l)), n.map = [];
          var a = t != e.display.externalMeasured && oe(o);
          nf(o, n, ml(e, o, a)), o.styleClasses && (o.styleClasses.bgClass && (n.bgClass = U(o.styleClasses.bgClass, n.bgClass || "")), o.styleClasses.textClass && (n.textClass = U(o.styleClasses.textClass, n.textClass || ""))), n.map.length == 0 && n.map.push(0, 0, n.content.appendChild(Fu(e.display.measure))), i == 0 ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (T) {
          var c = n.content.lastChild;
          (/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack");
        }
        return ge(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = U(n.pre.className, n.textClass || "")), n;
      }
      function Ju(e) {
        var t = z("span", "\u2022", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }
      function Vu(e, t, r, n, i, o, l) {
        if (!!t) {
          var a = e.splitSpaces ? ef(t, e.trailingSpace) : t, c = e.cm.state.specialChars, h = !1, y;
          if (!c.test(t))
            e.col += t.length, y = document.createTextNode(a), e.map.push(e.pos, e.pos + t.length, y), S && L < 9 && (h = !0), e.pos += t.length;
          else {
            y = document.createDocumentFragment();
            for (var b = 0; ; ) {
              c.lastIndex = b;
              var k = c.exec(t), C = k ? k.index - b : t.length - b;
              if (C) {
                var F = document.createTextNode(a.slice(b, b + C));
                S && L < 9 ? y.appendChild(z("span", [F])) : y.appendChild(F), e.map.push(e.pos, e.pos + C, F), e.col += C, e.pos += C;
              }
              if (!k)
                break;
              b += C + 1;
              var A = void 0;
              if (k[0] == "	") {
                var M = e.cm.options.tabSize, N = M - e.col % M;
                A = y.appendChild(z("span", Fi(N), "cm-tab")), A.setAttribute("role", "presentation"), A.setAttribute("cm-text", "	"), e.col += N;
              } else
                k[0] == "\r" || k[0] == `
` ? (A = y.appendChild(z("span", k[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar")), A.setAttribute("cm-text", k[0]), e.col += 1) : (A = e.cm.options.specialCharPlaceholder(k[0]), A.setAttribute("cm-text", k[0]), S && L < 9 ? y.appendChild(z("span", [A])) : y.appendChild(A), e.col += 1);
              e.map.push(e.pos, e.pos + 1, A), e.pos++;
            }
          }
          if (e.trailingSpace = a.charCodeAt(t.length - 1) == 32, r || n || i || h || o || l) {
            var I = r || "";
            n && (I += n), i && (I += i);
            var O = z("span", [y], I, o);
            if (l)
              for (var P in l)
                l.hasOwnProperty(P) && P != "style" && P != "class" && O.setAttribute(P, l[P]);
            return e.content.appendChild(O);
          }
          e.content.appendChild(y);
        }
      }
      function ef(e, t) {
        if (e.length > 1 && !/  /.test(e))
          return e;
        for (var r = t, n = "", i = 0; i < e.length; i++) {
          var o = e.charAt(i);
          o == " " && r && (i == e.length - 1 || e.charCodeAt(i + 1) == 32) && (o = "\xA0"), n += o, r = o == " ";
        }
        return n;
      }
      function tf(e, t) {
        return function(r, n, i, o, l, a, c) {
          i = i ? i + " cm-force-border" : "cm-force-border";
          for (var h = r.pos, y = h + n.length; ; ) {
            for (var b = void 0, k = 0; k < t.length && (b = t[k], !(b.to > h && b.from <= h)); k++)
              ;
            if (b.to >= y)
              return e(r, n, i, o, l, a, c);
            e(r, n.slice(0, b.to - h), i, o, null, a, c), o = null, n = n.slice(b.to - h), h = b.to;
          }
        };
      }
      function Il(e, t, r, n) {
        var i = !n && r.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1;
      }
      function nf(e, t, r) {
        var n = e.markedSpans, i = e.text, o = 0;
        if (!n) {
          for (var l = 1; l < r.length; l += 2)
            t.addToken(t, i.slice(o, o = r[l]), Nl(r[l + 1], t.cm.options));
          return;
        }
        for (var a = i.length, c = 0, h = 1, y = "", b, k, C = 0, F, A, M, N, I; ; ) {
          if (C == c) {
            F = A = M = k = "", I = null, N = null, C = 1 / 0;
            for (var O = [], P = void 0, _ = 0; _ < n.length; ++_) {
              var R = n[_], Z = R.marker;
              if (Z.type == "bookmark" && R.from == c && Z.widgetNode)
                O.push(Z);
              else if (R.from <= c && (R.to == null || R.to > c || Z.collapsed && R.to == c && R.from == c)) {
                if (R.to != null && R.to != c && C > R.to && (C = R.to, A = ""), Z.className && (F += " " + Z.className), Z.css && (k = (k ? k + ";" : "") + Z.css), Z.startStyle && R.from == c && (M += " " + Z.startStyle), Z.endStyle && R.to == C && (P || (P = [])).push(Z.endStyle, R.to), Z.title && ((I || (I = {})).title = Z.title), Z.attributes)
                  for (var ae in Z.attributes)
                    (I || (I = {}))[ae] = Z.attributes[ae];
                Z.collapsed && (!N || Xi(N.marker, Z) < 0) && (N = R);
              } else
                R.from > c && C > R.from && (C = R.from);
            }
            if (P)
              for (var Ae = 0; Ae < P.length; Ae += 2)
                P[Ae + 1] == C && (A += " " + P[Ae]);
            if (!N || N.from == c)
              for (var fe = 0; fe < O.length; ++fe)
                Il(t, 0, O[fe]);
            if (N && (N.from || 0) == c) {
              if (Il(
                t,
                (N.to == null ? a + 1 : N.to) - c,
                N.marker,
                N.from == null
              ), N.to == null)
                return;
              N.to == c && (N = !1);
            }
          }
          if (c >= a)
            break;
          for (var Je = Math.min(a, C); ; ) {
            if (y) {
              var $e = c + y.length;
              if (!N) {
                var ye = $e > Je ? y.slice(0, Je - c) : y;
                t.addToken(
                  t,
                  ye,
                  b ? b + F : F,
                  M,
                  c + ye.length == C ? A : "",
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
            y = i.slice(o, o = r[h++]), b = Nl(r[h++], t.cm.options);
          }
        }
      }
      function Hl(e, t, r) {
        this.line = t, this.rest = Xu(t), this.size = this.rest ? oe(ie(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = Nt(e, t);
      }
      function Wr(e, t, r) {
        for (var n = [], i, o = t; o < r; o = i) {
          var l = new Hl(e.doc, B(e.doc, o), o);
          i = o + l.size, n.push(l);
        }
        return n;
      }
      var un = null;
      function rf(e) {
        un ? un.ops.push(e) : e.ownsGroup = un = {
          ops: [e],
          delayedCallbacks: []
        };
      }
      function of(e) {
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
      function lf(e, t) {
        var r = e.ownsGroup;
        if (!!r)
          try {
            of(r);
          } finally {
            un = null, t(r);
          }
      }
      var Rn = null;
      function Le(e, t) {
        var r = Mi(e, t);
        if (!!r.length) {
          var n = Array.prototype.slice.call(arguments, 2), i;
          un ? i = un.delayedCallbacks : Rn ? i = Rn : (i = Rn = [], setTimeout(sf, 0));
          for (var o = function(a) {
            i.push(function() {
              return r[a].apply(null, n);
            });
          }, l = 0; l < r.length; ++l)
            o(l);
        }
      }
      function sf() {
        var e = Rn;
        Rn = null;
        for (var t = 0; t < e.length; ++t)
          e[t]();
      }
      function Pl(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
          var o = t.changes[i];
          o == "text" ? uf(e, t) : o == "gutter" ? Bl(e, t, r, n) : o == "class" ? Qi(e, t) : o == "widget" && ff(e, t, n);
        }
        t.changes = null;
      }
      function _n(e) {
        return e.node == e.text && (e.node = z("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), S && L < 8 && (e.node.style.zIndex = 2)), e.node;
      }
      function af(e, t) {
        var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (r && (r += " CodeMirror-linebackground"), t.background)
          r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (r) {
          var n = _n(t);
          t.background = n.insertBefore(z("div", null, r), n.firstChild), e.display.input.setUneditable(t.background);
        }
      }
      function Wl(e, t) {
        var r = e.display.externalMeasured;
        return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : Ol(e, t);
      }
      function uf(e, t) {
        var r = t.text.className, n = Wl(e, t);
        t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, Qi(e, t)) : r && (t.text.className = r);
      }
      function Qi(e, t) {
        af(e, t), t.line.wrapClass ? _n(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = r || "";
      }
      function Bl(e, t, r, n) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var i = _n(t);
          t.gutterBackground = z(
            "div",
            null,
            "CodeMirror-gutter-background " + t.line.gutterClass,
            "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px; width: " + n.gutterTotalWidth + "px"
          ), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text);
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
          var l = _n(t), a = t.gutter = z("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px");
          if (a.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(a), l.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), e.options.lineNumbers && (!o || !o["CodeMirror-linenumbers"]) && (t.lineNumber = a.appendChild(
            z(
              "div",
              zi(e.options, r),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"
            )
          )), o)
            for (var c = 0; c < e.display.gutterSpecs.length; ++c) {
              var h = e.display.gutterSpecs[c].className, y = o.hasOwnProperty(h) && o[h];
              y && a.appendChild(z(
                "div",
                [y],
                "CodeMirror-gutter-elt",
                "left: " + n.gutterLeft[h] + "px; width: " + n.gutterWidth[h] + "px"
              ));
            }
        }
      }
      function ff(e, t, r) {
        t.alignable && (t.alignable = null);
        for (var n = xt("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o)
          o = i.nextSibling, n.test(i.className) && t.node.removeChild(i);
        Rl(e, t, r);
      }
      function cf(e, t, r, n) {
        var i = Wl(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), Qi(e, t), Bl(e, t, r, n), Rl(e, t, n), t.node;
      }
      function Rl(e, t, r) {
        if (_l(e, t.line, t, r, !0), t.rest)
          for (var n = 0; n < t.rest.length; n++)
            _l(e, t.rest[n], t, r, !1);
      }
      function _l(e, t, r, n, i) {
        if (!!t.widgets)
          for (var o = _n(r), l = 0, a = t.widgets; l < a.length; ++l) {
            var c = a[l], h = z("div", [c.node], "CodeMirror-linewidget" + (c.className ? " " + c.className : ""));
            c.handleMouseEvents || h.setAttribute("cm-ignore-events", "true"), hf(c, h, r, n), e.display.input.setUneditable(h), i && c.above ? o.insertBefore(h, r.gutter || r.text) : o.appendChild(h), Le(c, "redraw");
          }
      }
      function hf(e, t, r, n) {
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
          e.coverGutter && (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"), Ue(t.display.measure, z("div", [e.node], null, r));
        }
        return e.height = e.node.parentNode.offsetHeight;
      }
      function Lt(e, t) {
        for (var r = Ni(t); r != e.wrapper; r = r.parentNode)
          if (!r || r.nodeType == 1 && r.getAttribute("cm-ignore-events") == "true" || r.parentNode == e.sizer && r != e.mover)
            return !0;
      }
      function Br(e) {
        return e.lineSpace.offsetTop;
      }
      function Ji(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }
      function zl(e) {
        if (e.cachedPaddingH)
          return e.cachedPaddingH;
        var t = Ue(e.measure, z("pre", "x", "CodeMirror-line-like")), r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, n = { left: parseInt(r.paddingLeft), right: parseInt(r.paddingRight) };
        return !isNaN(n.left) && !isNaN(n.right) && (e.cachedPaddingH = n), n;
      }
      function yt(e) {
        return Cr - e.display.nativeBarWidth;
      }
      function Xt(e) {
        return e.display.scroller.clientWidth - yt(e) - e.display.barWidth;
      }
      function Vi(e) {
        return e.display.scroller.clientHeight - yt(e) - e.display.barHeight;
      }
      function df(e, t, r) {
        var n = e.options.lineWrapping, i = n && Xt(e);
        if (!t.measure.heights || n && t.measure.width != i) {
          var o = t.measure.heights = [];
          if (n) {
            t.measure.width = i;
            for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
              var c = l[a], h = l[a + 1];
              Math.abs(c.bottom - h.bottom) > 2 && o.push((c.bottom + h.top) / 2 - r.top);
            }
          }
          o.push(r.bottom - r.top);
        }
      }
      function Ul(e, t, r) {
        if (e.line == t)
          return { map: e.measure.map, cache: e.measure.cache };
        if (e.rest) {
          for (var n = 0; n < e.rest.length; n++)
            if (e.rest[n] == t)
              return { map: e.measure.maps[n], cache: e.measure.caches[n] };
          for (var i = 0; i < e.rest.length; i++)
            if (oe(e.rest[i]) > r)
              return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 };
        }
      }
      function pf(e, t) {
        t = lt(t);
        var r = oe(t), n = e.display.externalMeasured = new Hl(e.doc, t, r);
        n.lineN = r;
        var i = n.built = Ol(e, n);
        return n.text = i.pre, Ue(e.display.lineMeasure, i.pre), n;
      }
      function Gl(e, t, r, n) {
        return mt(e, fn(e, t), r, n);
      }
      function eo(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
          return e.display.view[Zt(e, t)];
        var r = e.display.externalMeasured;
        if (r && t >= r.lineN && t < r.lineN + r.size)
          return r;
      }
      function fn(e, t) {
        var r = oe(t), n = eo(e, r);
        n && !n.text ? n = null : n && n.changes && (Pl(e, n, r, oo(e)), e.curOp.forceUpdate = !0), n || (n = pf(e, t));
        var i = Ul(n, t, r);
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
      function mt(e, t, r, n, i) {
        t.before && (r = -1);
        var o = r + (n || ""), l;
        return t.cache.hasOwnProperty(o) ? l = t.cache[o] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (df(e, t.view, t.rect), t.hasHeights = !0), l = vf(e, t, r, n), l.bogus || (t.cache[o] = l)), {
          left: l.left,
          right: l.right,
          top: i ? l.rtop : l.top,
          bottom: i ? l.rbottom : l.bottom
        };
      }
      var ql = { left: 0, right: 0, top: 0, bottom: 0 };
      function Kl(e, t, r) {
        for (var n, i, o, l, a, c, h = 0; h < e.length; h += 3)
          if (a = e[h], c = e[h + 1], t < a ? (i = 0, o = 1, l = "left") : t < c ? (i = t - a, o = i + 1) : (h == e.length - 3 || t == c && e[h + 3] > t) && (o = c - a, i = o - 1, t >= c && (l = "right")), i != null) {
            if (n = e[h + 2], a == c && r == (n.insertLeft ? "left" : "right") && (l = r), r == "left" && i == 0)
              for (; h && e[h - 2] == e[h - 3] && e[h - 1].insertLeft; )
                n = e[(h -= 3) + 2], l = "left";
            if (r == "right" && i == c - a)
              for (; h < e.length - 3 && e[h + 3] == e[h + 4] && !e[h + 5].insertLeft; )
                n = e[(h += 3) + 2], l = "right";
            break;
          }
        return { node: n, start: i, end: o, collapse: l, coverStart: a, coverEnd: c };
      }
      function gf(e, t) {
        var r = ql;
        if (t == "left")
          for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++)
            ;
        else
          for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--)
            ;
        return r;
      }
      function vf(e, t, r, n) {
        var i = Kl(t.map, r, n), o = i.node, l = i.start, a = i.end, c = i.collapse, h;
        if (o.nodeType == 3) {
          for (var y = 0; y < 4; y++) {
            for (; l && Di(t.line.text.charAt(i.coverStart + l)); )
              --l;
            for (; i.coverStart + a < i.coverEnd && Di(t.line.text.charAt(i.coverStart + a)); )
              ++a;
            if (S && L < 9 && l == 0 && a == i.coverEnd - i.coverStart ? h = o.parentNode.getBoundingClientRect() : h = gf(dt(o, l, a).getClientRects(), n), h.left || h.right || l == 0)
              break;
            a = l, l = l - 1, c = "right";
          }
          S && L < 11 && (h = yf(e.display.measure, h));
        } else {
          l > 0 && (c = n = "right");
          var b;
          e.options.lineWrapping && (b = o.getClientRects()).length > 1 ? h = b[n == "right" ? b.length - 1 : 0] : h = o.getBoundingClientRect();
        }
        if (S && L < 9 && !l && (!h || !h.left && !h.right)) {
          var k = o.parentNode.getClientRects()[0];
          k ? h = { left: k.left, right: k.left + hn(e.display), top: k.top, bottom: k.bottom } : h = ql;
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
      function yf(e, t) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !Eu(e))
          return t;
        var r = screen.logicalXDPI / screen.deviceXDPI, n = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: t.left * r,
          right: t.right * r,
          top: t.top * n,
          bottom: t.bottom * n
        };
      }
      function $l(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
          for (var t = 0; t < e.rest.length; t++)
            e.measure.caches[t] = {};
      }
      function Xl(e) {
        e.display.externalMeasure = null, ht(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++)
          $l(e.display.view[t]);
      }
      function Un(e) {
        Xl(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
      }
      function Yl(e) {
        return H && te ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft)) : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
      }
      function jl(e) {
        return H && te ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop)) : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
      }
      function to(e) {
        var t = lt(e), r = t.widgets, n = 0;
        if (r)
          for (var i = 0; i < r.length; ++i)
            r[i].above && (n += zn(r[i]));
        return n;
      }
      function Rr(e, t, r, n, i) {
        if (!i) {
          var o = to(t);
          r.top += o, r.bottom += o;
        }
        if (n == "line")
          return r;
        n || (n = "local");
        var l = kt(t);
        if (n == "local" ? l += Br(e.display) : l -= e.display.viewOffset, n == "page" || n == "window") {
          var a = e.display.lineSpace.getBoundingClientRect();
          l += a.top + (n == "window" ? 0 : jl(V(e)));
          var c = a.left + (n == "window" ? 0 : Yl(V(e)));
          r.left += c, r.right += c;
        }
        return r.top += l, r.bottom += l, r;
      }
      function Zl(e, t, r) {
        if (r == "div")
          return t;
        var n = t.left, i = t.top;
        if (r == "page")
          n -= Yl(V(e)), i -= jl(V(e));
        else if (r == "local" || !r) {
          var o = e.display.sizer.getBoundingClientRect();
          n += o.left, i += o.top;
        }
        var l = e.display.lineSpace.getBoundingClientRect();
        return { left: n - l.left, top: i - l.top };
      }
      function _r(e, t, r, n, i) {
        return n || (n = B(e.doc, t.line)), Rr(e, n, Gl(e, n, t.ch, i), r);
      }
      function st(e, t, r, n, i, o) {
        n = n || B(e.doc, t.line), i || (i = fn(e, n));
        function l(F, A) {
          var M = mt(e, i, F, A ? "right" : "left", o);
          return A ? M.left = M.right : M.right = M.left, Rr(e, n, M, r);
        }
        var a = St(n, e.doc.direction), c = t.ch, h = t.sticky;
        if (c >= n.text.length ? (c = n.text.length, h = "before") : c <= 0 && (c = 0, h = "after"), !a)
          return l(h == "before" ? c - 1 : c, h == "before");
        function y(F, A, M) {
          var N = a[A], I = N.level == 1;
          return l(M ? F - 1 : F, I != M);
        }
        var b = In(a, c, h), k = On, C = y(c, b, h == "before");
        return k != null && (C.other = y(c, k, h != "before")), C;
      }
      function Ql(e, t) {
        var r = 0;
        t = Y(e.doc, t), e.options.lineWrapping || (r = hn(e.display) * t.ch);
        var n = B(e.doc, t.line), i = kt(n) + Br(e.display);
        return { left: r, right: r, top: i, bottom: i + n.height };
      }
      function no(e, t, r, n, i) {
        var o = D(e, t, r);
        return o.xRel = i, n && (o.outside = n), o;
      }
      function ro(e, t, r) {
        var n = e.doc;
        if (r += e.display.viewOffset, r < 0)
          return no(n.first, 0, null, -1, -1);
        var i = $t(n, r), o = n.first + n.size - 1;
        if (i > o)
          return no(n.first + n.size - 1, B(n, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var l = B(n, i); ; ) {
          var a = mf(e, l, i, t, r), c = Ku(l, a.ch + (a.xRel > 0 || a.outside > 0 ? 1 : 0));
          if (!c)
            return a;
          var h = c.find(1);
          if (h.line == i)
            return h;
          l = B(n, i = h.line);
        }
      }
      function Jl(e, t, r, n) {
        n -= to(t);
        var i = t.text.length, o = Nn(function(l) {
          return mt(e, r, l - 1).bottom <= n;
        }, i, 0);
        return i = Nn(function(l) {
          return mt(e, r, l).top > n;
        }, o, i), { begin: o, end: i };
      }
      function Vl(e, t, r, n) {
        r || (r = fn(e, t));
        var i = Rr(e, t, mt(e, r, n), "line").top;
        return Jl(e, t, r, i);
      }
      function io(e, t, r, n) {
        return e.bottom <= r ? !1 : e.top > r ? !0 : (n ? e.left : e.right) > t;
      }
      function mf(e, t, r, n, i) {
        i -= kt(t);
        var o = fn(e, t), l = to(t), a = 0, c = t.text.length, h = !0, y = St(t, e.doc.direction);
        if (y) {
          var b = (e.options.lineWrapping ? xf : bf)(e, t, r, o, y, n, i);
          h = b.level != 1, a = h ? b.from : b.to - 1, c = h ? b.to : b.from - 1;
        }
        var k = null, C = null, F = Nn(function(_) {
          var R = mt(e, o, _);
          return R.top += l, R.bottom += l, io(R, n, i, !1) ? (R.top <= i && R.left <= n && (k = _, C = R), !0) : !1;
        }, a, c), A, M, N = !1;
        if (C) {
          var I = n - C.left < C.right - n, O = I == h;
          F = k + (O ? 0 : 1), M = O ? "after" : "before", A = I ? C.left : C.right;
        } else {
          !h && (F == c || F == a) && F++, M = F == 0 ? "after" : F == t.text.length ? "before" : mt(e, o, F - (h ? 1 : 0)).bottom + l <= i == h ? "after" : "before";
          var P = st(e, D(r, F, M), "line", t, o);
          A = P.left, N = i < P.top ? -1 : i >= P.bottom ? 1 : 0;
        }
        return F = ul(t.text, F, 1), no(r, F, M, N, n - A);
      }
      function bf(e, t, r, n, i, o, l) {
        var a = Nn(function(b) {
          var k = i[b], C = k.level != 1;
          return io(st(
            e,
            D(r, C ? k.to : k.from, C ? "before" : "after"),
            "line",
            t,
            n
          ), o, l, !0);
        }, 0, i.length - 1), c = i[a];
        if (a > 0) {
          var h = c.level != 1, y = st(
            e,
            D(r, h ? c.from : c.to, h ? "after" : "before"),
            "line",
            t,
            n
          );
          io(y, o, l, !0) && y.top > l && (c = i[a - 1]);
        }
        return c;
      }
      function xf(e, t, r, n, i, o, l) {
        var a = Jl(e, t, n, l), c = a.begin, h = a.end;
        /\s/.test(t.text.charAt(h - 1)) && h--;
        for (var y = null, b = null, k = 0; k < i.length; k++) {
          var C = i[k];
          if (!(C.from >= h || C.to <= c)) {
            var F = C.level != 1, A = mt(e, n, F ? Math.min(h, C.to) - 1 : Math.max(c, C.from)).right, M = A < o ? o - A + 1e9 : A - o;
            (!y || b > M) && (y = C, b = M);
          }
        }
        return y || (y = i[i.length - 1]), y.from < c && (y = { from: c, to: y.to, level: y.level }), y.to > h && (y = { from: y.from, to: h, level: y.level }), y;
      }
      var Yt;
      function cn(e) {
        if (e.cachedTextHeight != null)
          return e.cachedTextHeight;
        if (Yt == null) {
          Yt = z("pre", null, "CodeMirror-line-like");
          for (var t = 0; t < 49; ++t)
            Yt.appendChild(document.createTextNode("x")), Yt.appendChild(z("br"));
          Yt.appendChild(document.createTextNode("x"));
        }
        Ue(e.measure, Yt);
        var r = Yt.offsetHeight / 50;
        return r > 3 && (e.cachedTextHeight = r), ht(e.measure), r || 1;
      }
      function hn(e) {
        if (e.cachedCharWidth != null)
          return e.cachedCharWidth;
        var t = z("span", "xxxxxxxxxx"), r = z("pre", [t], "CodeMirror-line-like");
        Ue(e.measure, r);
        var n = t.getBoundingClientRect(), i = (n.right - n.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10;
      }
      function oo(e) {
        for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) {
          var a = e.display.gutterSpecs[l].className;
          r[a] = o.offsetLeft + o.clientLeft + i, n[a] = o.clientWidth;
        }
        return {
          fixedPos: lo(t),
          gutterTotalWidth: t.gutters.offsetWidth,
          gutterLeft: r,
          gutterWidth: n,
          wrapperWidth: t.wrapper.clientWidth
        };
      }
      function lo(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }
      function es(e) {
        var t = cn(e.display), r = e.options.lineWrapping, n = r && Math.max(5, e.display.scroller.clientWidth / hn(e.display) - 3);
        return function(i) {
          if (Nt(e.doc, i))
            return 0;
          var o = 0;
          if (i.widgets)
            for (var l = 0; l < i.widgets.length; l++)
              i.widgets[l].height && (o += i.widgets[l].height);
          return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t;
        };
      }
      function so(e) {
        var t = e.doc, r = es(e);
        t.iter(function(n) {
          var i = r(n);
          i != n.height && gt(n, i);
        });
      }
      function jt(e, t, r, n) {
        var i = e.display;
        if (!r && Ni(t).getAttribute("cm-not-content") == "true")
          return null;
        var o, l, a = i.lineSpace.getBoundingClientRect();
        try {
          o = t.clientX - a.left, l = t.clientY - a.top;
        } catch {
          return null;
        }
        var c = ro(e, o, l), h;
        if (n && c.xRel > 0 && (h = B(e.doc, c.line).text).length == c.ch) {
          var y = pe(h, h.length, e.options.tabSize) - h.length;
          c = D(c.line, Math.max(0, Math.round((o - zl(e.display).left) / hn(e.display)) - y));
        }
        return c;
      }
      function Zt(e, t) {
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
          Ct && Yi(e.doc, t) < i.viewTo && It(e);
        else if (r <= i.viewFrom)
          Ct && El(e.doc, r + n) > i.viewFrom ? It(e) : (i.viewFrom += n, i.viewTo += n);
        else if (t <= i.viewFrom && r >= i.viewTo)
          It(e);
        else if (t <= i.viewFrom) {
          var o = zr(e, r, r + n, 1);
          o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : It(e);
        } else if (r >= i.viewTo) {
          var l = zr(e, t, t, -1);
          l ? (i.view = i.view.slice(0, l.index), i.viewTo = l.lineN) : It(e);
        } else {
          var a = zr(e, t, t, -1), c = zr(e, r, r + n, 1);
          a && c ? (i.view = i.view.slice(0, a.index).concat(Wr(e, a.lineN, c.lineN)).concat(i.view.slice(c.index)), i.viewTo += n) : It(e);
        }
        var h = i.externalMeasured;
        h && (r < h.lineN ? h.lineN += n : t < h.lineN + h.size && (i.externalMeasured = null));
      }
      function Ot(e, t, r) {
        e.curOp.viewChanged = !0;
        var n = e.display, i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
          var o = n.view[Zt(e, t)];
          if (o.node != null) {
            var l = o.changes || (o.changes = []);
            ee(l, r) == -1 && l.push(r);
          }
        }
      }
      function It(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }
      function zr(e, t, r, n) {
        var i = Zt(e, t), o, l = e.display.view;
        if (!Ct || r == e.doc.first + e.doc.size)
          return { index: i, lineN: r };
        for (var a = e.display.viewFrom, c = 0; c < i; c++)
          a += l[c].size;
        if (a != t) {
          if (n > 0) {
            if (i == l.length - 1)
              return null;
            o = a + l[i].size - t, i++;
          } else
            o = a - t;
          t += o, r += o;
        }
        for (; Yi(e.doc, r) != r; ) {
          if (i == (n < 0 ? 0 : l.length - 1))
            return null;
          r += n * l[i - (n < 0 ? 1 : 0)].size, i += n;
        }
        return { index: i, lineN: r };
      }
      function wf(e, t, r) {
        var n = e.display, i = n.view;
        i.length == 0 || t >= n.viewTo || r <= n.viewFrom ? (n.view = Wr(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = Wr(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(Zt(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(Wr(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, Zt(e, r)))), n.viewTo = r;
      }
      function ts(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
          var i = t[n];
          !i.hidden && (!i.node || i.changes) && ++r;
        }
        return r;
      }
      function Gn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }
      function ns(e, t) {
        t === void 0 && (t = !0);
        var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), l = e.options.$customCursor;
        l && (t = !0);
        for (var a = 0; a < r.sel.ranges.length; a++)
          if (!(!t && a == r.sel.primIndex)) {
            var c = r.sel.ranges[a];
            if (!(c.from().line >= e.display.viewTo || c.to().line < e.display.viewFrom)) {
              var h = c.empty();
              if (l) {
                var y = l(e, c);
                y && ao(e, y, i);
              } else
                (h || e.options.showCursorWhenSelecting) && ao(e, c.head, i);
              h || Sf(e, c, o);
            }
          }
        return n;
      }
      function ao(e, t, r) {
        var n = st(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = r.appendChild(z("div", "\xA0", "CodeMirror-cursor"));
        if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
          var o = _r(e, t, "div", null, null), l = o.right - o.left;
          i.style.width = (l > 0 ? l : e.defaultCharWidth()) + "px";
        }
        if (n.other) {
          var a = r.appendChild(z("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
          a.style.display = "", a.style.left = n.other.left + "px", a.style.top = n.other.top + "px", a.style.height = (n.other.bottom - n.other.top) * 0.85 + "px";
        }
      }
      function Ur(e, t) {
        return e.top - t.top || e.left - t.left;
      }
      function Sf(e, t, r) {
        var n = e.display, i = e.doc, o = document.createDocumentFragment(), l = zl(e.display), a = l.left, c = Math.max(n.sizerWidth, Xt(e) - n.sizer.offsetLeft) - l.right, h = i.direction == "ltr";
        function y(O, P, _, R) {
          P < 0 && (P = 0), P = Math.round(P), R = Math.round(R), o.appendChild(z("div", null, "CodeMirror-selected", "position: absolute; left: " + O + `px;
                             top: ` + P + "px; width: " + (_ == null ? c - O : _) + `px;
                             height: ` + (R - P) + "px"));
        }
        function b(O, P, _) {
          var R = B(i, O), Z = R.text.length, ae, Ae;
          function fe(ye, Xe) {
            return _r(e, D(O, ye), "div", R, Xe);
          }
          function Je(ye, Xe, Me) {
            var we = Vl(e, R, null, ye), me = Xe == "ltr" == (Me == "after") ? "left" : "right", he = Me == "after" ? we.begin : we.end - (/\s/.test(R.text.charAt(we.end - 1)) ? 2 : 1);
            return fe(he, me)[me];
          }
          var $e = St(R, i.direction);
          return ku($e, P || 0, _ == null ? Z : _, function(ye, Xe, Me, we) {
            var me = Me == "ltr", he = fe(ye, me ? "left" : "right"), Ye = fe(Xe - 1, me ? "right" : "left"), Ln = P == null && ye == 0, _t = _ == null && Xe == Z, Ie = we == 0, bt = !$e || we == $e.length - 1;
            if (Ye.top - he.top <= 3) {
              var De = (h ? Ln : _t) && Ie, Po = (h ? _t : Ln) && bt, At = De ? a : (me ? he : Ye).left, tn = Po ? c : (me ? Ye : he).right;
              y(At, he.top, tn - At, he.bottom);
            } else {
              var nn, Be, Tn, Wo;
              me ? (nn = h && Ln && Ie ? a : he.left, Be = h ? c : Je(ye, Me, "before"), Tn = h ? a : Je(Xe, Me, "after"), Wo = h && _t && bt ? c : Ye.right) : (nn = h ? Je(ye, Me, "before") : a, Be = !h && Ln && Ie ? c : he.right, Tn = !h && _t && bt ? a : Ye.left, Wo = h ? Je(Xe, Me, "after") : c), y(nn, he.top, Be - nn, he.bottom), he.bottom < Ye.top && y(a, he.bottom, null, Ye.top), y(Tn, Ye.top, Wo - Tn, Ye.bottom);
            }
            (!ae || Ur(he, ae) < 0) && (ae = he), Ur(Ye, ae) < 0 && (ae = Ye), (!Ae || Ur(he, Ae) < 0) && (Ae = he), Ur(Ye, Ae) < 0 && (Ae = Ye);
          }), { start: ae, end: Ae };
        }
        var k = t.from(), C = t.to();
        if (k.line == C.line)
          b(k.line, k.ch, C.ch);
        else {
          var F = B(i, k.line), A = B(i, C.line), M = lt(F) == lt(A), N = b(k.line, k.ch, M ? F.text.length + 1 : null).end, I = b(C.line, M ? 0 : null, C.ch).start;
          M && (N.top < I.top - 2 ? (y(N.right, N.top, null, N.bottom), y(a, I.top, I.left, I.bottom)) : y(N.right, N.top, I.left - N.right, N.bottom)), N.bottom < I.top && y(a, N.bottom, null, I.top);
        }
        r.appendChild(o);
      }
      function uo(e) {
        if (!!e.state.focused) {
          var t = e.display;
          clearInterval(t.blinker);
          var r = !0;
          t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
            e.hasFocus() || dn(e), t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }
      function rs(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || co(e));
      }
      function fo(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && dn(e));
        }, 100);
      }
      function co(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), e.options.readOnly != "nocursor" && (e.state.focused || (ge(e, "focus", e, t), e.state.focused = !0, W(e.display.wrapper, "CodeMirror-focused"), !e.curOp && e.display.selForContextMenu != e.doc.sel && (e.display.input.reset(), T && setTimeout(function() {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), uo(e));
      }
      function dn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (ge(e, "blur", e, t), e.state.focused = !1, wt(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }
      function Gr(e) {
        for (var t = e.display, r = t.lineDiv.offsetTop, n = Math.max(0, t.scroller.getBoundingClientRect().top), i = t.lineDiv.getBoundingClientRect().top, o = 0, l = 0; l < t.view.length; l++) {
          var a = t.view[l], c = e.options.lineWrapping, h = void 0, y = 0;
          if (!a.hidden) {
            if (i += a.line.height, S && L < 8) {
              var b = a.node.offsetTop + a.node.offsetHeight;
              h = b - r, r = b;
            } else {
              var k = a.node.getBoundingClientRect();
              h = k.bottom - k.top, !c && a.text.firstChild && (y = a.text.firstChild.getBoundingClientRect().right - k.left - 1);
            }
            var C = a.line.height - h;
            if ((C > 5e-3 || C < -5e-3) && (i < n && (o -= C), gt(a.line, h), is(a.line), a.rest))
              for (var F = 0; F < a.rest.length; F++)
                is(a.rest[F]);
            if (y > e.display.sizerWidth) {
              var A = Math.ceil(y / hn(e.display));
              A > e.display.maxLineLength && (e.display.maxLineLength = A, e.display.maxLine = a.line, e.display.maxLineChanged = !0);
            }
          }
        }
        Math.abs(o) > 2 && (t.scroller.scrollTop += o);
      }
      function is(e) {
        if (e.widgets)
          for (var t = 0; t < e.widgets.length; ++t) {
            var r = e.widgets[t], n = r.node.parentNode;
            n && (r.height = n.offsetHeight);
          }
      }
      function qr(e, t, r) {
        var n = r && r.top != null ? Math.max(0, r.top) : e.scroller.scrollTop;
        n = Math.floor(n - Br(e));
        var i = r && r.bottom != null ? r.bottom : n + e.wrapper.clientHeight, o = $t(t, n), l = $t(t, i);
        if (r && r.ensure) {
          var a = r.ensure.from.line, c = r.ensure.to.line;
          a < o ? (o = a, l = $t(t, kt(B(t, a)) + e.wrapper.clientHeight)) : Math.min(c, t.lastLine()) >= l && (o = $t(t, kt(B(t, c)) - e.wrapper.clientHeight), l = c);
        }
        return { from: o, to: Math.max(l, o + 1) };
      }
      function Cf(e, t) {
        if (!ke(e, "scrollCursorIntoView")) {
          var r = e.display, n = r.sizer.getBoundingClientRect(), i = null, o = r.wrapper.ownerDocument;
          if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (o.defaultView.innerHeight || o.documentElement.clientHeight) && (i = !1), i != null && !xe) {
            var l = z("div", "\u200B", null, `position: absolute;
                         top: ` + (t.top - r.viewOffset - Br(e.display)) + `px;
                         height: ` + (t.bottom - t.top + yt(e) + r.barHeight) + `px;
                         left: ` + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
            e.display.lineSpace.appendChild(l), l.scrollIntoView(i), e.display.lineSpace.removeChild(l);
          }
        }
      }
      function kf(e, t, r, n) {
        n == null && (n = 0);
        var i;
        !e.options.lineWrapping && t == r && (r = t.sticky == "before" ? D(t.line, t.ch + 1, "before") : t, t = t.ch ? D(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after") : t);
        for (var o = 0; o < 5; o++) {
          var l = !1, a = st(e, t), c = !r || r == t ? a : st(e, r);
          i = {
            left: Math.min(a.left, c.left),
            top: Math.min(a.top, c.top) - n,
            right: Math.max(a.left, c.left),
            bottom: Math.max(a.bottom, c.bottom) + n
          };
          var h = ho(e, i), y = e.doc.scrollTop, b = e.doc.scrollLeft;
          if (h.scrollTop != null && (Kn(e, h.scrollTop), Math.abs(e.doc.scrollTop - y) > 1 && (l = !0)), h.scrollLeft != null && (Qt(e, h.scrollLeft), Math.abs(e.doc.scrollLeft - b) > 1 && (l = !0)), !l)
            break;
        }
        return i;
      }
      function Lf(e, t) {
        var r = ho(e, t);
        r.scrollTop != null && Kn(e, r.scrollTop), r.scrollLeft != null && Qt(e, r.scrollLeft);
      }
      function ho(e, t) {
        var r = e.display, n = cn(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && e.curOp.scrollTop != null ? e.curOp.scrollTop : r.scroller.scrollTop, o = Vi(e), l = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var a = e.doc.height + Ji(r), c = t.top < n, h = t.bottom > a - n;
        if (t.top < i)
          l.scrollTop = c ? 0 : t.top;
        else if (t.bottom > i + o) {
          var y = Math.min(t.top, (h ? a : t.bottom) - o);
          y != i && (l.scrollTop = y);
        }
        var b = e.options.fixedGutter ? 0 : r.gutters.offsetWidth, k = e.curOp && e.curOp.scrollLeft != null ? e.curOp.scrollLeft : r.scroller.scrollLeft - b, C = Xt(e) - r.gutters.offsetWidth, F = t.right - t.left > C;
        return F && (t.right = t.left + C), t.left < 10 ? l.scrollLeft = 0 : t.left < k ? l.scrollLeft = Math.max(0, t.left + b - (F ? 0 : 10)) : t.right > C + k - 3 && (l.scrollLeft = t.right + (F ? 0 : 10) - C), l;
      }
      function po(e, t) {
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
      function Tf(e, t) {
        Kr(e), e.curOp.scrollToPos = t;
      }
      function Kr(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
          e.curOp.scrollToPos = null;
          var r = Ql(e, t.from), n = Ql(e, t.to);
          os(e, r, n, t.margin);
        }
      }
      function os(e, t, r, n) {
        var i = ho(e, {
          left: Math.min(t.left, r.left),
          top: Math.min(t.top, r.top) - n,
          right: Math.max(t.right, r.right),
          bottom: Math.max(t.bottom, r.bottom) + n
        });
        qn(e, i.scrollLeft, i.scrollTop);
      }
      function Kn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (p || vo(e, { top: t }), ls(e, t, !0), p && vo(e), Yn(e, 100));
      }
      function ls(e, t, r) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), !(e.display.scroller.scrollTop == t && !r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }
      function Qt(e, t, r, n) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), !((r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n) && (e.doc.scrollLeft = t, cs(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }
      function $n(e) {
        var t = e.display, r = t.gutters.offsetWidth, n = Math.round(e.doc.height + Ji(e.display));
        return {
          clientHeight: t.scroller.clientHeight,
          viewHeight: t.wrapper.clientHeight,
          scrollWidth: t.scroller.scrollWidth,
          clientWidth: t.scroller.clientWidth,
          viewWidth: t.wrapper.clientWidth,
          barLeft: e.options.fixedGutter ? r : 0,
          docHeight: n,
          scrollHeight: n + yt(e) + t.barHeight,
          nativeBarWidth: t.nativeBarWidth,
          gutterWidth: r
        };
      }
      var Jt = function(e, t, r) {
        this.cm = r;
        var n = this.vert = z("div", [z("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), i = this.horiz = z("div", [z("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        n.tabIndex = i.tabIndex = -1, e(n), e(i), G(n, "scroll", function() {
          n.clientHeight && t(n.scrollTop, "vertical");
        }), G(i, "scroll", function() {
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
        var e = se && !be ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new Ce(), this.disableVert = new Ce();
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
      var Xn = function() {
      };
      Xn.prototype.update = function() {
        return { bottom: 0, right: 0 };
      }, Xn.prototype.setScrollLeft = function() {
      }, Xn.prototype.setScrollTop = function() {
      }, Xn.prototype.clear = function() {
      };
      function gn(e, t) {
        t || (t = $n(e));
        var r = e.display.barWidth, n = e.display.barHeight;
        ss(e, t);
        for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++)
          r != e.display.barWidth && e.options.lineWrapping && Gr(e), ss(e, $n(e)), r = e.display.barWidth, n = e.display.barHeight;
      }
      function ss(e, t) {
        var r = e.display, n = r.scrollbars.update(t);
        r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = "";
      }
      var as = { native: Jt, null: Xn };
      function us(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && wt(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new as[e.options.scrollbarStyle](function(t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), G(t, "mousedown", function() {
            e.state.focused && setTimeout(function() {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function(t, r) {
          r == "horizontal" ? Qt(e, t) : Kn(e, t);
        }, e), e.display.scrollbars.addClass && W(e.display.wrapper, e.display.scrollbars.addClass);
      }
      var Ff = 0;
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
          id: ++Ff,
          markArrays: null
        }, rf(e.curOp);
      }
      function en(e) {
        var t = e.curOp;
        t && lf(t, function(r) {
          for (var n = 0; n < r.ops.length; n++)
            r.ops[n].cm.curOp = null;
          Af(r);
        });
      }
      function Af(e) {
        for (var t = e.ops, r = 0; r < t.length; r++)
          Df(t[r]);
        for (var n = 0; n < t.length; n++)
          Mf(t[n]);
        for (var i = 0; i < t.length; i++)
          Ef(t[i]);
        for (var o = 0; o < t.length; o++)
          Nf(t[o]);
        for (var l = 0; l < t.length; l++)
          Of(t[l]);
      }
      function Df(e) {
        var t = e.cm, r = t.display;
        Hf(t), e.updateMaxLine && Zi(t), e.mustUpdate = e.viewChanged || e.forceUpdate || e.scrollTop != null || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new $r(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }
      function Mf(e) {
        e.updatedDisplay = e.mustUpdate && go(e.cm, e.update);
      }
      function Ef(e) {
        var t = e.cm, r = t.display;
        e.updatedDisplay && Gr(t), e.barMeasure = $n(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Gl(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + yt(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - Xt(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection());
      }
      function Nf(e) {
        var t = e.cm;
        e.adjustWidthTo != null && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Qt(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var r = e.focus && e.focus == g(V(t));
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && gn(t, e.barMeasure), e.updatedDisplay && mo(t, e.barMeasure), e.selectionChanged && uo(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && rs(e.cm);
      }
      function Of(e) {
        var t = e.cm, r = t.display, n = t.doc;
        if (e.updatedDisplay && fs(t, e.update), r.wheelStartX != null && (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) && (r.wheelStartX = r.wheelStartY = null), e.scrollTop != null && ls(t, e.scrollTop, e.forceScroll), e.scrollLeft != null && Qt(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          var i = kf(
            t,
            Y(n, e.scrollToPos.from),
            Y(n, e.scrollToPos.to),
            e.scrollToPos.margin
          );
          Cf(t, i);
        }
        var o = e.maybeHiddenMarkers, l = e.maybeUnhiddenMarkers;
        if (o)
          for (var a = 0; a < o.length; ++a)
            o[a].lines.length || ge(o[a], "hide");
        if (l)
          for (var c = 0; c < l.length; ++c)
            l[c].lines.length && ge(l[c], "unhide");
        r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && ge(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }
      function Qe(e, t) {
        if (e.curOp)
          return t();
        Vt(e);
        try {
          return t();
        } finally {
          en(e);
        }
      }
      function Te(e, t) {
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
      function We(e) {
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
      function Fe(e) {
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
      function Yn(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, Ze(If, e));
      }
      function If(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
          var r = +new Date() + e.options.workTime, n = Wn(e, t.highlightFrontier), i = [];
          t.iter(n.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
            if (n.line >= e.display.viewFrom) {
              var l = o.styles, a = o.text.length > e.options.maxHighlightLength ? qt(t.mode, n.state) : null, c = yl(e, o, n, !0);
              a && (n.state = a), o.styles = c.styles;
              var h = o.styleClasses, y = c.classes;
              y ? o.styleClasses = y : h && (o.styleClasses = null);
              for (var b = !l || l.length != o.styles.length || h != y && (!h || !y || h.bgClass != y.bgClass || h.textClass != y.textClass), k = 0; !b && k < l.length; ++k)
                b = l[k] != o.styles[k];
              b && i.push(n.line), o.stateAfter = n.save(), n.nextLine();
            } else
              o.text.length <= e.options.maxHighlightLength && qi(e, o.text, n), o.stateAfter = n.line % 5 == 0 ? n.save() : null, n.nextLine();
            if (+new Date() > r)
              return Yn(e, e.options.workDelay), !0;
          }), t.highlightFrontier = n.line, t.modeFrontier = Math.max(t.modeFrontier, n.line), i.length && Qe(e, function() {
            for (var o = 0; o < i.length; o++)
              Ot(e, i[o], "text");
          });
        }
      }
      var $r = function(e, t, r) {
        var n = e.display;
        this.viewport = t, this.visible = qr(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = Xt(e), this.force = r, this.dims = oo(e), this.events = [];
      };
      $r.prototype.signal = function(e, t) {
        rt(e, t) && this.events.push(arguments);
      }, $r.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++)
          ge.apply(null, this.events[e]);
      };
      function Hf(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = yt(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = yt(e) + "px", t.scrollbarsClipped = !0);
      }
      function Pf(e) {
        if (e.hasFocus())
          return null;
        var t = g(V(e));
        if (!t || !w(e.display.lineDiv, t))
          return null;
        var r = { activeElt: t };
        if (window.getSelection) {
          var n = Ne(e).getSelection();
          n.anchorNode && n.extend && w(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset);
        }
        return r;
      }
      function Wf(e) {
        if (!(!e || !e.activeElt || e.activeElt == g(e.activeElt.ownerDocument)) && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && w(document.body, e.anchorNode) && w(document.body, e.focusNode))) {
          var t = e.activeElt.ownerDocument, r = t.defaultView.getSelection(), n = t.createRange();
          n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), r.removeAllRanges(), r.addRange(n), r.extend(e.focusNode, e.focusOffset);
        }
      }
      function go(e, t) {
        var r = e.display, n = e.doc;
        if (t.editorIsHidden)
          return It(e), !1;
        if (!t.force && t.visible.from >= r.viewFrom && t.visible.to <= r.viewTo && (r.updateLineNumbers == null || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && ts(e) == 0)
          return !1;
        hs(e) && (It(e), t.dims = oo(e));
        var i = n.first + n.size, o = Math.max(t.visible.from - e.options.viewportMargin, n.first), l = Math.min(i, t.visible.to + e.options.viewportMargin);
        r.viewFrom < o && o - r.viewFrom < 20 && (o = Math.max(n.first, r.viewFrom)), r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(i, r.viewTo)), Ct && (o = Yi(e.doc, o), l = El(e.doc, l));
        var a = o != r.viewFrom || l != r.viewTo || r.lastWrapHeight != t.wrapperHeight || r.lastWrapWidth != t.wrapperWidth;
        wf(e, o, l), r.viewOffset = kt(B(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
        var c = ts(e);
        if (!a && c == 0 && !t.force && r.renderedView == r.view && (r.updateLineNumbers == null || r.updateLineNumbers >= r.viewTo))
          return !1;
        var h = Pf(e);
        return c > 4 && (r.lineDiv.style.display = "none"), Bf(e, r.updateLineNumbers, t.dims), c > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view, Wf(h), ht(r.cursorDiv), ht(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, a && (r.lastWrapHeight = t.wrapperHeight, r.lastWrapWidth = t.wrapperWidth, Yn(e, 400)), r.updateLineNumbers = null, !0;
      }
      function fs(e, t) {
        for (var r = t.viewport, n = !0; ; n = !1) {
          if (!n || !e.options.lineWrapping || t.oldDisplayWidth == Xt(e)) {
            if (r && r.top != null && (r = { top: Math.min(e.doc.height + Ji(e.display) - Vi(e), r.top) }), t.visible = qr(e.display, e.doc, r), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
              break;
          } else
            n && (t.visible = qr(e.display, e.doc, r));
          if (!go(e, t))
            break;
          Gr(e);
          var i = $n(e);
          Gn(e), gn(e, i), mo(e, i), t.force = !1;
        }
        t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }
      function vo(e, t) {
        var r = new $r(e, t);
        if (go(e, r)) {
          Gr(e), fs(e, r);
          var n = $n(e);
          Gn(e), gn(e, n), mo(e, n), r.finish();
        }
      }
      function Bf(e, t, r) {
        var n = e.display, i = e.options.lineNumbers, o = n.lineDiv, l = o.firstChild;
        function a(F) {
          var A = F.nextSibling;
          return T && se && e.display.currentWheelTarget == F ? F.style.display = "none" : F.parentNode.removeChild(F), A;
        }
        for (var c = n.view, h = n.viewFrom, y = 0; y < c.length; y++) {
          var b = c[y];
          if (!b.hidden)
            if (!b.node || b.node.parentNode != o) {
              var k = cf(e, b, h, r);
              o.insertBefore(k, l);
            } else {
              for (; l != b.node; )
                l = a(l);
              var C = i && t != null && t <= h && b.lineNumber;
              b.changes && (ee(b.changes, "gutter") > -1 && (C = !1), Pl(e, b, h, r)), C && (ht(b.lineNumber), b.lineNumber.appendChild(document.createTextNode(zi(e.options, h)))), l = b.node.nextSibling;
            }
          h += b.size;
        }
        for (; l; )
          l = a(l);
      }
      function yo(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px", Le(e, "gutterChanged", e);
      }
      function mo(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + yt(e) + "px";
      }
      function cs(e) {
        var t = e.display, r = t.view;
        if (!(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))) {
          for (var n = lo(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", l = 0; l < r.length; l++)
            if (!r[l].hidden) {
              e.options.fixedGutter && (r[l].gutter && (r[l].gutter.style.left = o), r[l].gutterBackground && (r[l].gutterBackground.style.left = o));
              var a = r[l].alignable;
              if (a)
                for (var c = 0; c < a.length; c++)
                  a[c].style.left = o;
            }
          e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
        }
      }
      function hs(e) {
        if (!e.options.lineNumbers)
          return !1;
        var t = e.doc, r = zi(e.options, t.first + t.size - 1), n = e.display;
        if (r.length != n.lineNumChars) {
          var i = n.measure.appendChild(z(
            "div",
            [z("div", r)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          )), o = i.firstChild.offsetWidth, l = i.offsetWidth - o;
          return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l) + 1, n.lineNumWidth = n.lineNumInnerWidth + l, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", yo(e.display), !0;
        }
        return !1;
      }
      function bo(e, t) {
        for (var r = [], n = !1, i = 0; i < e.length; i++) {
          var o = e[i], l = null;
          if (typeof o != "string" && (l = o.style, o = o.className), o == "CodeMirror-linenumbers")
            if (t)
              n = !0;
            else
              continue;
          r.push({ className: o, style: l });
        }
        return t && !n && r.push({ className: "CodeMirror-linenumbers", style: null }), r;
      }
      function ds(e) {
        var t = e.gutters, r = e.gutterSpecs;
        ht(t), e.lineGutter = null;
        for (var n = 0; n < r.length; ++n) {
          var i = r[n], o = i.className, l = i.style, a = t.appendChild(z("div", null, "CodeMirror-gutter " + o));
          l && (a.style.cssText = l), o == "CodeMirror-linenumbers" && (e.lineGutter = a, a.style.width = (e.lineNumWidth || 1) + "px");
        }
        t.style.display = r.length ? "" : "none", yo(e);
      }
      function jn(e) {
        ds(e.display), qe(e), cs(e);
      }
      function Rf(e, t, r, n) {
        var i = this;
        this.input = r, i.scrollbarFiller = z("div", null, "CodeMirror-scrollbar-filler"), i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = z("div", null, "CodeMirror-gutter-filler"), i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = Et("div", null, "CodeMirror-code"), i.selectionDiv = z("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = z("div", null, "CodeMirror-cursors"), i.measure = z("div", null, "CodeMirror-measure"), i.lineMeasure = z("div", null, "CodeMirror-measure"), i.lineSpace = Et(
          "div",
          [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var o = Et("div", [i.lineSpace], "CodeMirror-lines");
        i.mover = z("div", [o], null, "position: relative"), i.sizer = z("div", [i.mover], "CodeMirror-sizer"), i.sizerWidth = null, i.heightForcer = z("div", null, null, "position: absolute; height: " + Cr + "px; width: 1px;"), i.gutters = z("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = z("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"), i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = z("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"), H && j >= 105 && (i.wrapper.style.clipPath = "inset(0px)"), i.wrapper.setAttribute("translate", "no"), S && L < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0), !T && !(p && ce) && (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)), i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first, i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0, i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0, i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null, i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null, i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null, i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, i.gutterSpecs = bo(n.gutters, n.lineNumbers), ds(i), r.init(i);
      }
      var Xr = 0, Tt = null;
      S ? Tt = -0.53 : p ? Tt = 15 : H ? Tt = -0.7 : Q && (Tt = -1 / 3);
      function ps(e) {
        var t = e.wheelDeltaX, r = e.wheelDeltaY;
        return t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), r == null && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : r == null && (r = e.wheelDelta), { x: t, y: r };
      }
      function _f(e) {
        var t = ps(e);
        return t.x *= Tt, t.y *= Tt, t;
      }
      function gs(e, t) {
        H && j == 102 && (e.display.chromeScrollHack == null ? e.display.sizer.style.pointerEvents = "none" : clearTimeout(e.display.chromeScrollHack), e.display.chromeScrollHack = setTimeout(function() {
          e.display.chromeScrollHack = null, e.display.sizer.style.pointerEvents = "";
        }, 100));
        var r = ps(t), n = r.x, i = r.y, o = Tt;
        t.deltaMode === 0 && (n = t.deltaX, i = t.deltaY, o = 1);
        var l = e.display, a = l.scroller, c = a.scrollWidth > a.clientWidth, h = a.scrollHeight > a.clientHeight;
        if (!!(n && c || i && h)) {
          if (i && se && T) {
            e:
              for (var y = t.target, b = l.view; y != a; y = y.parentNode)
                for (var k = 0; k < b.length; k++)
                  if (b[k].node == y) {
                    e.display.currentWheelTarget = y;
                    break e;
                  }
          }
          if (n && !p && !$ && o != null) {
            i && h && Kn(e, Math.max(0, a.scrollTop + i * o)), Qt(e, Math.max(0, a.scrollLeft + n * o)), (!i || i && h) && Ge(t), l.wheelStartX = null;
            return;
          }
          if (i && o != null) {
            var C = i * o, F = e.doc.scrollTop, A = F + l.wrapper.clientHeight;
            C < 0 ? F = Math.max(0, F + C - 50) : A = Math.min(e.doc.height, A + C + 50), vo(e, { top: F, bottom: A });
          }
          Xr < 20 && t.deltaMode !== 0 && (l.wheelStartX == null ? (l.wheelStartX = a.scrollLeft, l.wheelStartY = a.scrollTop, l.wheelDX = n, l.wheelDY = i, setTimeout(function() {
            if (l.wheelStartX != null) {
              var M = a.scrollLeft - l.wheelStartX, N = a.scrollTop - l.wheelStartY, I = N && l.wheelDY && N / l.wheelDY || M && l.wheelDX && M / l.wheelDX;
              l.wheelStartX = l.wheelStartY = null, I && (Tt = (Tt * Xr + I) / (Xr + 1), ++Xr);
            }
          }, 200)) : (l.wheelDX += n, l.wheelDY += i));
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
          if (!Ui(r.anchor, n.anchor) || !Ui(r.head, n.head))
            return !1;
        }
        return !0;
      }, tt.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new ne(Gi(this.ranges[t].anchor), Gi(this.ranges[t].head));
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
          if (X(t, n.from()) >= 0 && X(e, n.to()) <= 0)
            return r;
        }
        return -1;
      };
      var ne = function(e, t) {
        this.anchor = e, this.head = t;
      };
      ne.prototype.from = function() {
        return Mr(this.anchor, this.head);
      }, ne.prototype.to = function() {
        return Dr(this.anchor, this.head);
      }, ne.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function at(e, t, r) {
        var n = e && e.options.selectionsMayTouch, i = t[r];
        t.sort(function(k, C) {
          return X(k.from(), C.from());
        }), r = ee(t, i);
        for (var o = 1; o < t.length; o++) {
          var l = t[o], a = t[o - 1], c = X(a.to(), l.from());
          if (n && !l.empty() ? c > 0 : c >= 0) {
            var h = Mr(a.from(), l.from()), y = Dr(a.to(), l.to()), b = a.empty() ? l.from() == l.head : a.from() == a.head;
            o <= r && --r, t.splice(--o, 2, new ne(b ? y : h, b ? h : y));
          }
        }
        return new tt(t, r);
      }
      function Ht(e, t) {
        return new tt([new ne(e, t || e)], 0);
      }
      function Pt(e) {
        return e.text ? D(
          e.from.line + e.text.length - 1,
          ie(e.text).length + (e.text.length == 1 ? e.from.ch : 0)
        ) : e.to;
      }
      function vs(e, t) {
        if (X(e, t.from) < 0)
          return e;
        if (X(e, t.to) <= 0)
          return Pt(t);
        var r = e.line + t.text.length - (t.to.line - t.from.line) - 1, n = e.ch;
        return e.line == t.to.line && (n += Pt(t).ch - t.to.ch), D(r, n);
      }
      function xo(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
          var i = e.sel.ranges[n];
          r.push(new ne(
            vs(i.anchor, t),
            vs(i.head, t)
          ));
        }
        return at(e.cm, r, e.sel.primIndex);
      }
      function ys(e, t, r) {
        return e.line == t.line ? D(r.line, e.ch - t.ch + r.ch) : D(r.line + (e.line - t.line), e.ch);
      }
      function zf(e, t, r) {
        for (var n = [], i = D(e.first, 0), o = i, l = 0; l < t.length; l++) {
          var a = t[l], c = ys(a.from, i, o), h = ys(Pt(a), i, o);
          if (i = a.to, o = h, r == "around") {
            var y = e.sel.ranges[l], b = X(y.head, y.anchor) < 0;
            n[l] = new ne(b ? h : c, b ? c : h);
          } else
            n[l] = new ne(c, c);
        }
        return new tt(n, e.sel.primIndex);
      }
      function wo(e) {
        e.doc.mode = Bi(e.options, e.doc.modeOption), Zn(e);
      }
      function Zn(e) {
        e.doc.iter(function(t) {
          t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, Yn(e, 100), e.state.modeGen++, e.curOp && qe(e);
      }
      function ms(e, t) {
        return t.from.ch == 0 && t.to.ch == 0 && ie(t.text) == "" && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }
      function So(e, t, r, n) {
        function i(I) {
          return r ? r[I] : null;
        }
        function o(I, O, P) {
          Yu(I, O, P, n), Le(I, "change", I, t);
        }
        function l(I, O) {
          for (var P = [], _ = I; _ < O; ++_)
            P.push(new an(h[_], i(_), n));
          return P;
        }
        var a = t.from, c = t.to, h = t.text, y = B(e, a.line), b = B(e, c.line), k = ie(h), C = i(h.length - 1), F = c.line - a.line;
        if (t.full)
          e.insert(0, l(0, h.length)), e.remove(h.length, e.size - h.length);
        else if (ms(e, t)) {
          var A = l(0, h.length - 1);
          o(b, b.text, C), F && e.remove(a.line, F), A.length && e.insert(a.line, A);
        } else if (y == b)
          if (h.length == 1)
            o(y, y.text.slice(0, a.ch) + k + y.text.slice(c.ch), C);
          else {
            var M = l(1, h.length - 1);
            M.push(new an(k + y.text.slice(c.ch), C, n)), o(y, y.text.slice(0, a.ch) + h[0], i(0)), e.insert(a.line + 1, M);
          }
        else if (h.length == 1)
          o(y, y.text.slice(0, a.ch) + h[0] + b.text.slice(c.ch), i(0)), e.remove(a.line + 1, F);
        else {
          o(y, y.text.slice(0, a.ch) + h[0], i(0)), o(b, k + b.text.slice(c.ch), C);
          var N = l(1, h.length - 1);
          F > 1 && e.remove(a.line + 1, F - 1), e.insert(a.line + 1, N);
        }
        Le(e, "change", e, t);
      }
      function Wt(e, t, r) {
        function n(i, o, l) {
          if (i.linked)
            for (var a = 0; a < i.linked.length; ++a) {
              var c = i.linked[a];
              if (c.doc != o) {
                var h = l && c.sharedHist;
                r && !h || (t(c.doc, h), n(c.doc, i, h));
              }
            }
        }
        n(e, null, !0);
      }
      function bs(e, t) {
        if (t.cm)
          throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, so(e), wo(e), xs(e), e.options.direction = t.direction, e.options.lineWrapping || Zi(e), e.options.mode = t.modeOption, qe(e);
      }
      function xs(e) {
        (e.doc.direction == "rtl" ? W : wt)(e.display.lineDiv, "CodeMirror-rtl");
      }
      function Uf(e) {
        Qe(e, function() {
          xs(e), qe(e);
        });
      }
      function Yr(e) {
        this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1;
      }
      function Co(e, t) {
        var r = { from: Gi(t.from), to: Pt(t), text: Kt(e, t.from, t.to) };
        return Cs(e, r, t.from.line, t.to.line + 1), Wt(e, function(n) {
          return Cs(n, r, t.from.line, t.to.line + 1);
        }, !0), r;
      }
      function ws(e) {
        for (; e.length; ) {
          var t = ie(e);
          if (t.ranges)
            e.pop();
          else
            break;
        }
      }
      function Gf(e, t) {
        if (t)
          return ws(e.done), ie(e.done);
        if (e.done.length && !ie(e.done).ranges)
          return ie(e.done);
        if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
          return e.done.pop(), ie(e.done);
      }
      function Ss(e, t, r, n) {
        var i = e.history;
        i.undone.length = 0;
        var o = +new Date(), l, a;
        if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && i.lastModTime > o - (e.cm ? e.cm.options.historyEventDelay : 500) || t.origin.charAt(0) == "*")) && (l = Gf(i, i.lastOp == n)))
          a = ie(l.changes), X(t.from, t.to) == 0 && X(t.from, a.to) == 0 ? a.to = Pt(t) : l.changes.push(Co(e, t));
        else {
          var c = ie(i.done);
          for ((!c || !c.ranges) && jr(e.sel, i.done), l = {
            changes: [Co(e, t)],
            generation: i.generation
          }, i.done.push(l); i.done.length > i.undoDepth; )
            i.done.shift(), i.done[0].ranges || i.done.shift();
        }
        i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = o, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, a || ge(e, "historyAdded");
      }
      function qf(e, t, r, n) {
        var i = t.charAt(0);
        return i == "*" || i == "+" && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }
      function Kf(e, t, r, n) {
        var i = e.history, o = n && n.origin;
        r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || qf(e, o, ie(i.done), t)) ? i.done[i.done.length - 1] = t : jr(t, i.done), i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = r, n && n.clearRedo !== !1 && ws(i.undone);
      }
      function jr(e, t) {
        var r = ie(t);
        r && r.ranges && r.equals(e) || t.push(e);
      }
      function Cs(e, t, r, n) {
        var i = t["spans_" + e.id], o = 0;
        e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function(l) {
          l.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = l.markedSpans), ++o;
        });
      }
      function $f(e) {
        if (!e)
          return null;
        for (var t, r = 0; r < e.length; ++r)
          e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
        return t ? t.length ? t : null : e;
      }
      function Xf(e, t) {
        var r = t["spans_" + e.id];
        if (!r)
          return null;
        for (var n = [], i = 0; i < t.text.length; ++i)
          n.push($f(r[i]));
        return n;
      }
      function ks(e, t) {
        var r = Xf(e, t), n = $i(e, t);
        if (!r)
          return n;
        if (!n)
          return r;
        for (var i = 0; i < r.length; ++i) {
          var o = r[i], l = n[i];
          if (o && l) {
            e:
              for (var a = 0; a < l.length; ++a) {
                for (var c = l[a], h = 0; h < o.length; ++h)
                  if (o[h].marker == c.marker)
                    continue e;
                o.push(c);
              }
          } else
            l && (r[i] = l);
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
          var l = o.changes, a = [];
          n.push({ changes: a });
          for (var c = 0; c < l.length; ++c) {
            var h = l[c], y = void 0;
            if (a.push({ from: h.from, to: h.to, text: h.text }), t)
              for (var b in h)
                (y = b.match(/^spans_(\d+)$/)) && ee(t, Number(y[1])) > -1 && (ie(a)[b] = h[b], delete h[b]);
          }
        }
        return n;
      }
      function ko(e, t, r, n) {
        if (n) {
          var i = e.anchor;
          if (r) {
            var o = X(t, i) < 0;
            o != X(r, i) < 0 ? (i = t, t = r) : o != X(t, r) < 0 && (t = r);
          }
          return new ne(i, t);
        } else
          return new ne(r || t, t);
      }
      function Zr(e, t, r, n, i) {
        i == null && (i = e.cm && (e.cm.display.shift || e.extend)), Oe(e, new tt([ko(e.sel.primary(), t, r, i)], 0), n);
      }
      function Ls(e, t, r) {
        for (var n = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++)
          n[o] = ko(e.sel.ranges[o], t[o], null, i);
        var l = at(e.cm, n, e.sel.primIndex);
        Oe(e, l, r);
      }
      function Lo(e, t, r, n) {
        var i = e.sel.ranges.slice(0);
        i[t] = r, Oe(e, at(e.cm, i, e.sel.primIndex), n);
      }
      function Ts(e, t, r, n) {
        Oe(e, Ht(t, r), n);
      }
      function Yf(e, t, r) {
        var n = {
          ranges: t.ranges,
          update: function(i) {
            this.ranges = [];
            for (var o = 0; o < i.length; o++)
              this.ranges[o] = new ne(
                Y(e, i[o].anchor),
                Y(e, i[o].head)
              );
          },
          origin: r && r.origin
        };
        return ge(e, "beforeSelectionChange", e, n), e.cm && ge(e.cm, "beforeSelectionChange", e.cm, n), n.ranges != t.ranges ? at(e.cm, n.ranges, n.ranges.length - 1) : t;
      }
      function Fs(e, t, r) {
        var n = e.history.done, i = ie(n);
        i && i.ranges ? (n[n.length - 1] = t, Qr(e, t, r)) : Oe(e, t, r);
      }
      function Oe(e, t, r) {
        Qr(e, t, r), Kf(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r);
      }
      function Qr(e, t, r) {
        (rt(e, "beforeSelectionChange") || e.cm && rt(e.cm, "beforeSelectionChange")) && (t = Yf(e, t, r));
        var n = r && r.bias || (X(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        As(e, Ms(e, t, n, !0)), !(r && r.scroll === !1) && e.cm && e.cm.getOption("readOnly") != "nocursor" && pn(e.cm);
      }
      function As(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, cl(e.cm)), Le(e, "cursorActivity", e));
      }
      function Ds(e) {
        As(e, Ms(e, e.sel, null, !1));
      }
      function Ms(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
          var l = t.ranges[o], a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], c = Jr(e, l.anchor, a && a.anchor, r, n), h = l.head == l.anchor ? c : Jr(e, l.head, a && a.head, r, n);
          (i || c != l.anchor || h != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new ne(c, h));
        }
        return i ? at(e.cm, i, t.primIndex) : t;
      }
      function yn(e, t, r, n, i) {
        var o = B(e, t.line);
        if (o.markedSpans)
          for (var l = 0; l < o.markedSpans.length; ++l) {
            var a = o.markedSpans[l], c = a.marker, h = "selectLeft" in c ? !c.selectLeft : c.inclusiveLeft, y = "selectRight" in c ? !c.selectRight : c.inclusiveRight;
            if ((a.from == null || (h ? a.from <= t.ch : a.from < t.ch)) && (a.to == null || (y ? a.to >= t.ch : a.to > t.ch))) {
              if (i && (ge(c, "beforeCursorEnter"), c.explicitlyCleared))
                if (o.markedSpans) {
                  --l;
                  continue;
                } else
                  break;
              if (!c.atomic)
                continue;
              if (r) {
                var b = c.find(n < 0 ? 1 : -1), k = void 0;
                if ((n < 0 ? y : h) && (b = Es(e, b, -n, b && b.line == t.line ? o : null)), b && b.line == t.line && (k = X(b, r)) && (n < 0 ? k < 0 : k > 0))
                  return yn(e, b, t, n, i);
              }
              var C = c.find(n < 0 ? -1 : 1);
              return (n < 0 ? h : y) && (C = Es(e, C, n, C.line == t.line ? o : null)), C ? yn(e, C, t, n, i) : null;
            }
          }
        return t;
      }
      function Jr(e, t, r, n, i) {
        var o = n || 1, l = yn(e, t, r, o, i) || !i && yn(e, t, r, o, !0) || yn(e, t, r, -o, i) || !i && yn(e, t, r, -o, !0);
        return l || (e.cantEdit = !0, D(e.first, 0));
      }
      function Es(e, t, r, n) {
        return r < 0 && t.ch == 0 ? t.line > e.first ? Y(e, D(t.line - 1)) : null : r > 0 && t.ch == (n || B(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? D(t.line + 1, 0) : null : new D(t.line, t.ch + r);
      }
      function Ns(e) {
        e.setSelection(D(e.firstLine(), 0), D(e.lastLine()), pt);
      }
      function Os(e, t, r) {
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
        return r && (n.update = function(i, o, l, a) {
          i && (n.from = Y(e, i)), o && (n.to = Y(e, o)), l && (n.text = l), a !== void 0 && (n.origin = a);
        }), ge(e, "beforeChange", e, n), e.cm && ge(e.cm, "beforeChange", e.cm, n), n.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : { from: n.from, to: n.to, text: n.text, origin: n.origin };
      }
      function mn(e, t, r) {
        if (e.cm) {
          if (!e.cm.curOp)
            return Te(e.cm, mn)(e, t, r);
          if (e.cm.state.suppressEdits)
            return;
        }
        if (!((rt(e, "beforeChange") || e.cm && rt(e.cm, "beforeChange")) && (t = Os(e, t, !0), !t))) {
          var n = kl && !r && qu(e, t.from, t.to);
          if (n)
            for (var i = n.length - 1; i >= 0; --i)
              Is(e, { from: n[i].from, to: n[i].to, text: i ? [""] : t.text, origin: t.origin });
          else
            Is(e, t);
        }
      }
      function Is(e, t) {
        if (!(t.text.length == 1 && t.text[0] == "" && X(t.from, t.to) == 0)) {
          var r = xo(e, t);
          Ss(e, t, r, e.cm ? e.cm.curOp.id : NaN), Qn(e, t, r, $i(e, t));
          var n = [];
          Wt(e, function(i, o) {
            !o && ee(n, i.history) == -1 && (Bs(i.history, t), n.push(i.history)), Qn(i, t, null, $i(i, t));
          });
        }
      }
      function Vr(e, t, r) {
        var n = e.cm && e.cm.state.suppressEdits;
        if (!(n && !r)) {
          for (var i = e.history, o, l = e.sel, a = t == "undo" ? i.done : i.undone, c = t == "undo" ? i.undone : i.done, h = 0; h < a.length && (o = a[h], !(r ? o.ranges && !o.equals(e.sel) : !o.ranges)); h++)
            ;
          if (h != a.length) {
            for (i.lastOrigin = i.lastSelOrigin = null; ; )
              if (o = a.pop(), o.ranges) {
                if (jr(o, c), r && !o.equals(e.sel)) {
                  Oe(e, o, { clearRedo: !1 });
                  return;
                }
                l = o;
              } else if (n) {
                a.push(o);
                return;
              } else
                break;
            var y = [];
            jr(l, c), c.push({ changes: y, generation: i.generation }), i.generation = o.generation || ++i.maxGeneration;
            for (var b = rt(e, "beforeChange") || e.cm && rt(e.cm, "beforeChange"), k = function(A) {
              var M = o.changes[A];
              if (M.origin = t, b && !Os(e, M, !1))
                return a.length = 0, {};
              y.push(Co(e, M));
              var N = A ? xo(e, M) : ie(a);
              Qn(e, M, N, ks(e, M)), !A && e.cm && e.cm.scrollIntoView({ from: M.from, to: Pt(M) });
              var I = [];
              Wt(e, function(O, P) {
                !P && ee(I, O.history) == -1 && (Bs(O.history, M), I.push(O.history)), Qn(O, M, null, ks(O, M));
              });
            }, C = o.changes.length - 1; C >= 0; --C) {
              var F = k(C);
              if (F)
                return F.v;
            }
          }
        }
      }
      function Hs(e, t) {
        if (t != 0 && (e.first += t, e.sel = new tt(Tr(e.sel.ranges, function(i) {
          return new ne(
            D(i.anchor.line + t, i.anchor.ch),
            D(i.head.line + t, i.head.ch)
          );
        }), e.sel.primIndex), e.cm)) {
          qe(e.cm, e.first, e.first - t, t);
          for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++)
            Ot(e.cm, n, "gutter");
        }
      }
      function Qn(e, t, r, n) {
        if (e.cm && !e.cm.curOp)
          return Te(e.cm, Qn)(e, t, r, n);
        if (t.to.line < e.first) {
          Hs(e, t.text.length - 1 - (t.to.line - t.from.line));
          return;
        }
        if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var i = t.text.length - 1 - (e.first - t.from.line);
            Hs(e, i), t = {
              from: D(e.first, 0),
              to: D(t.to.line + i, t.to.ch),
              text: [ie(t.text)],
              origin: t.origin
            };
          }
          var o = e.lastLine();
          t.to.line > o && (t = {
            from: t.from,
            to: D(o, B(e, o).text.length),
            text: [t.text[0]],
            origin: t.origin
          }), t.removed = Kt(e, t.from, t.to), r || (r = xo(e, t)), e.cm ? jf(e.cm, t, n) : So(e, t, n), Qr(e, r, pt), e.cantEdit && Jr(e, D(e.firstLine(), 0)) && (e.cantEdit = !1);
        }
      }
      function jf(e, t, r) {
        var n = e.doc, i = e.display, o = t.from, l = t.to, a = !1, c = o.line;
        e.options.lineWrapping || (c = oe(lt(B(n, o.line))), n.iter(c, l.line + 1, function(C) {
          if (C == i.maxLine)
            return a = !0, !0;
        })), n.sel.contains(t.from, t.to) > -1 && cl(e), So(n, t, r, es(e)), e.options.lineWrapping || (n.iter(c, o.line + t.text.length, function(C) {
          var F = Pr(C);
          F > i.maxLineLength && (i.maxLine = C, i.maxLineLength = F, i.maxLineChanged = !0, a = !1);
        }), a && (e.curOp.updateMaxLine = !0)), Wu(n, o.line), Yn(e, 400);
        var h = t.text.length - (l.line - o.line) - 1;
        t.full ? qe(e) : o.line == l.line && t.text.length == 1 && !ms(e.doc, t) ? Ot(e, o.line, "text") : qe(e, o.line, l.line + 1, h);
        var y = rt(e, "changes"), b = rt(e, "change");
        if (b || y) {
          var k = {
            from: o,
            to: l,
            text: t.text,
            removed: t.removed,
            origin: t.origin
          };
          b && Le(e, "change", e, k), y && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(k);
        }
        e.display.selForContextMenu = null;
      }
      function bn(e, t, r, n, i) {
        var o;
        n || (n = r), X(n, r) < 0 && (o = [n, r], r = o[0], n = o[1]), typeof t == "string" && (t = e.splitLines(t)), mn(e, { from: r, to: n, text: t, origin: i });
      }
      function Ps(e, t, r, n) {
        r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0);
      }
      function Ws(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
          var o = e[i], l = !0;
          if (o.ranges) {
            o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
            for (var a = 0; a < o.ranges.length; a++)
              Ps(o.ranges[a].anchor, t, r, n), Ps(o.ranges[a].head, t, r, n);
            continue;
          }
          for (var c = 0; c < o.changes.length; ++c) {
            var h = o.changes[c];
            if (r < h.from.line)
              h.from = D(h.from.line + n, h.from.ch), h.to = D(h.to.line + n, h.to.ch);
            else if (t <= h.to.line) {
              l = !1;
              break;
            }
          }
          l || (e.splice(0, i + 1), i = 0);
        }
      }
      function Bs(e, t) {
        var r = t.from.line, n = t.to.line, i = t.text.length - (n - r) - 1;
        Ws(e.done, r, n, i), Ws(e.undone, r, n, i);
      }
      function Jn(e, t, r, n) {
        var i = t, o = t;
        return typeof t == "number" ? o = B(e, gl(e, t)) : i = oe(t), i == null ? null : (n(o, i) && e.cm && Ot(e.cm, i, r), o);
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
            this.height -= i.height, ju(i), Le(i, "delete");
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
              var o = Math.min(t, i - e), l = n.height;
              if (n.removeInner(e, o), this.height -= l - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), (t -= o) == 0)
                break;
              e = 0;
            } else
              e -= i;
          }
          if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Vn))) {
            var a = [];
            this.collapse(a), this.children = [new Vn(a)], this.children[0].parent = this;
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
                for (var l = i.lines.length % 25 + 25, a = l; a < i.lines.length; ) {
                  var c = new Vn(i.lines.slice(a, a += 25));
                  i.height -= c.height, this.children.splice(++n, 0, c), c.parent = this;
                }
                i.lines = i.lines.slice(0, l), this.maybeSpill();
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
                var i = ee(e.parent.children, e);
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
              var l = Math.min(t, o - e);
              if (i.iterN(e, l, r))
                return !0;
              if ((t -= l) == 0)
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
        var e = this.doc.cm, t = this.line.widgets, r = this.line, n = oe(r);
        if (!(n == null || !t)) {
          for (var i = 0; i < t.length; ++i)
            t[i] == this && t.splice(i--, 1);
          t.length || (r.widgets = null);
          var o = zn(this);
          gt(r, Math.max(0, r.height - o)), e && (Qe(e, function() {
            Rs(e, r, -o), Ot(e, n, "widget");
          }), Le(e, "lineWidgetCleared", e, this, n));
        }
      }, tr.prototype.changed = function() {
        var e = this, t = this.height, r = this.doc.cm, n = this.line;
        this.height = null;
        var i = zn(this) - t;
        !i || (Nt(this.doc, n) || gt(n, n.height + i), r && Qe(r, function() {
          r.curOp.forceUpdate = !0, Rs(r, n, i), Le(r, "lineWidgetChanged", r, e, oe(n));
        }));
      }, on(tr);
      function Rs(e, t, r) {
        kt(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && po(e, r);
      }
      function Zf(e, t, r, n) {
        var i = new tr(e, r, n), o = e.cm;
        return o && i.noHScroll && (o.display.alignWidgets = !0), Jn(e, t, "widget", function(l) {
          var a = l.widgets || (l.widgets = []);
          if (i.insertAt == null ? a.push(i) : a.splice(Math.min(a.length, Math.max(0, i.insertAt)), 0, i), i.line = l, o && !Nt(e, l)) {
            var c = kt(l) < e.scrollTop;
            gt(l, l.height + zn(i)), c && po(o, i.height), o.curOp.forceUpdate = !0;
          }
          return !0;
        }), o && Le(o, "lineWidgetAdded", o, i, typeof t == "number" ? t : oe(t)), i;
      }
      var _s = 0, Bt = function(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++_s;
      };
      Bt.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          var e = this.doc.cm, t = e && !e.curOp;
          if (t && Vt(e), rt(this, "clear")) {
            var r = this.find();
            r && Le(this, "clear", r.from, r.to);
          }
          for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
            var l = this.lines[o], a = Bn(l.markedSpans, this);
            e && !this.collapsed ? Ot(e, oe(l), "text") : e && (a.to != null && (i = oe(l)), a.from != null && (n = oe(l))), l.markedSpans = _u(l.markedSpans, a), a.from == null && this.collapsed && !Nt(this.doc, l) && e && gt(l, cn(e.display));
          }
          if (e && this.collapsed && !e.options.lineWrapping)
            for (var c = 0; c < this.lines.length; ++c) {
              var h = lt(this.lines[c]), y = Pr(h);
              y > e.display.maxLineLength && (e.display.maxLine = h, e.display.maxLineLength = y, e.display.maxLineChanged = !0);
            }
          n != null && e && this.collapsed && qe(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ds(e.doc)), e && Le(e, "markerCleared", e, this, n, i), t && en(e), this.parent && this.parent.clear();
        }
      }, Bt.prototype.find = function(e, t) {
        e == null && this.type == "bookmark" && (e = 1);
        for (var r, n, i = 0; i < this.lines.length; ++i) {
          var o = this.lines[i], l = Bn(o.markedSpans, this);
          if (l.from != null && (r = D(t ? o : oe(o), l.from), e == -1))
            return r;
          if (l.to != null && (n = D(t ? o : oe(o), l.to), e == 1))
            return n;
        }
        return r && { from: r, to: n };
      }, Bt.prototype.changed = function() {
        var e = this, t = this.find(-1, !0), r = this, n = this.doc.cm;
        !t || !n || Qe(n, function() {
          var i = t.line, o = oe(t.line), l = eo(n, o);
          if (l && ($l(l), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !Nt(r.doc, i) && r.height != null) {
            var a = r.height;
            r.height = null;
            var c = zn(r) - a;
            c && gt(i, i.height + c);
          }
          Le(n, "markerChanged", n, e);
        });
      }, Bt.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (!t.maybeHiddenMarkers || ee(t.maybeHiddenMarkers, this) == -1) && (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(e);
      }, Bt.prototype.detachLine = function(e) {
        if (this.lines.splice(ee(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, on(Bt);
      function xn(e, t, r, n, i) {
        if (n && n.shared)
          return Qf(e, t, r, n, i);
        if (e.cm && !e.cm.curOp)
          return Te(e.cm, xn)(e, t, r, n, i);
        var o = new Bt(e, i), l = X(t, r);
        if (n && Pe(n, o, !1), l > 0 || l == 0 && o.clearWhenEmpty !== !1)
          return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = Et("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
          if (Ml(e, t.line, t, r, o) || t.line != r.line && Ml(e, r.line, t, r, o))
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          Ru();
        }
        o.addToHistory && Ss(e, { from: t, to: r, origin: "markText" }, e.sel, NaN);
        var a = t.line, c = e.cm, h;
        if (e.iter(a, r.line + 1, function(b) {
          c && o.collapsed && !c.options.lineWrapping && lt(b) == c.display.maxLine && (h = !0), o.collapsed && a != t.line && gt(b, 0), zu(b, new Nr(
            o,
            a == t.line ? t.ch : null,
            a == r.line ? r.ch : null
          ), e.cm && e.cm.curOp), ++a;
        }), o.collapsed && e.iter(t.line, r.line + 1, function(b) {
          Nt(e, b) && gt(b, 0);
        }), o.clearOnEnter && G(o, "beforeCursorEnter", function() {
          return o.clear();
        }), o.readOnly && (Bu(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++_s, o.atomic = !0), c) {
          if (h && (c.curOp.updateMaxLine = !0), o.collapsed)
            qe(c, t.line, r.line + 1);
          else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
            for (var y = t.line; y <= r.line; y++)
              Ot(c, y, "text");
          o.atomic && Ds(c.doc), Le(c, "markerAdded", c, o);
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
          Le(this, "clear");
        }
      }, nr.prototype.find = function(e, t) {
        return this.primary.find(e, t);
      }, on(nr);
      function Qf(e, t, r, n, i) {
        n = Pe(n), n.shared = !1;
        var o = [xn(e, t, r, n, i)], l = o[0], a = n.widgetNode;
        return Wt(e, function(c) {
          a && (n.widgetNode = a.cloneNode(!0)), o.push(xn(c, Y(c, t), Y(c, r), n, i));
          for (var h = 0; h < c.linked.length; ++h)
            if (c.linked[h].isParent)
              return;
          l = ie(o);
        }), new nr(o, l);
      }
      function zs(e) {
        return e.findMarks(D(e.first, 0), e.clipPos(D(e.lastLine())), function(t) {
          return t.parent;
        });
      }
      function Jf(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r], i = n.find(), o = e.clipPos(i.from), l = e.clipPos(i.to);
          if (X(o, l)) {
            var a = xn(e, o, l, n.primary, n.primary.type);
            n.markers.push(a), a.parent = n;
          }
        }
      }
      function Vf(e) {
        for (var t = function(n) {
          var i = e[n], o = [i.primary.doc];
          Wt(i.primary.doc, function(c) {
            return o.push(c);
          });
          for (var l = 0; l < i.markers.length; l++) {
            var a = i.markers[l];
            ee(o, a.doc) == -1 && (a.parent = null, i.markers.splice(l--, 1));
          }
        }, r = 0; r < e.length; r++)
          t(r);
      }
      var ec = 0, Ke = function(e, t, r, n, i) {
        if (!(this instanceof Ke))
          return new Ke(e, t, r, n, i);
        r == null && (r = 0), er.call(this, [new Vn([new an("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = r;
        var o = D(r, 0);
        this.sel = Ht(o), this.history = new Yr(null), this.id = ++ec, this.modeOption = t, this.lineSep = n, this.direction = i == "rtl" ? "rtl" : "ltr", this.extend = !1, typeof e == "string" && (e = this.splitLines(e)), So(this, { from: o, to: o, text: e }), Oe(this, Ht(o), pt);
      };
      Ke.prototype = sl(er.prototype, {
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
          var t = _i(this, this.first, this.first + this.size);
          return e === !1 ? t : t.join(e || this.lineSeparator());
        },
        setValue: Fe(function(e) {
          var t = D(this.first, 0), r = this.first + this.size - 1;
          mn(this, {
            from: t,
            to: D(r, B(this, r).text.length),
            text: this.splitLines(e),
            origin: "setValue",
            full: !0
          }, !0), this.cm && qn(this.cm, 0, 0), Oe(this, Ht(t), pt);
        }),
        replaceRange: function(e, t, r, n) {
          t = Y(this, t), r = r ? Y(this, r) : t, bn(this, e, t, r, n);
        },
        getRange: function(e, t, r) {
          var n = Kt(this, Y(this, e), Y(this, t));
          return r === !1 ? n : r === "" ? n.join("") : n.join(r || this.lineSeparator());
        },
        getLine: function(e) {
          var t = this.getLineHandle(e);
          return t && t.text;
        },
        getLineHandle: function(e) {
          if (Pn(this, e))
            return B(this, e);
        },
        getLineNumber: function(e) {
          return oe(e);
        },
        getLineHandleVisualStart: function(e) {
          return typeof e == "number" && (e = B(this, e)), lt(e);
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
          return Y(this, e);
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
        setCursor: Fe(function(e, t, r) {
          Ts(this, Y(this, typeof e == "number" ? D(e, t || 0) : e), null, r);
        }),
        setSelection: Fe(function(e, t, r) {
          Ts(this, Y(this, e), Y(this, t || e), r);
        }),
        extendSelection: Fe(function(e, t, r) {
          Zr(this, Y(this, e), t && Y(this, t), r);
        }),
        extendSelections: Fe(function(e, t) {
          Ls(this, vl(this, e), t);
        }),
        extendSelectionsBy: Fe(function(e, t) {
          var r = Tr(this.sel.ranges, e);
          Ls(this, vl(this, r), t);
        }),
        setSelections: Fe(function(e, t, r) {
          if (!!e.length) {
            for (var n = [], i = 0; i < e.length; i++)
              n[i] = new ne(
                Y(this, e[i].anchor),
                Y(this, e[i].head || e[i].anchor)
              );
            t == null && (t = Math.min(e.length - 1, this.sel.primIndex)), Oe(this, at(this.cm, n, t), r);
          }
        }),
        addSelection: Fe(function(e, t, r) {
          var n = this.sel.ranges.slice(0);
          n.push(new ne(Y(this, e), Y(this, t || e))), Oe(this, at(this.cm, n, n.length - 1), r);
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
        replaceSelections: Fe(function(e, t, r) {
          for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
            var l = i.ranges[o];
            n[o] = { from: l.from(), to: l.to(), text: this.splitLines(e[o]), origin: r };
          }
          for (var a = t && t != "end" && zf(this, n, t), c = n.length - 1; c >= 0; c--)
            mn(this, n[c]);
          a ? Fs(this, a) : this.cm && pn(this.cm);
        }),
        undo: Fe(function() {
          Vr(this, "undo");
        }),
        redo: Fe(function() {
          Vr(this, "redo");
        }),
        undoSelection: Fe(function() {
          Vr(this, "undo", !0);
        }),
        redoSelection: Fe(function() {
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
          this.history = new Yr(this.history), Wt(this, function(t) {
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
          var t = this.history = new Yr(this.history);
          t.done = vn(e.done.slice(0), null, !0), t.undone = vn(e.undone.slice(0), null, !0);
        },
        setGutterMarker: Fe(function(e, t, r) {
          return Jn(this, e, "gutter", function(n) {
            var i = n.gutterMarkers || (n.gutterMarkers = {});
            return i[t] = r, !r && al(i) && (n.gutterMarkers = null), !0;
          });
        }),
        clearGutter: Fe(function(e) {
          var t = this;
          this.iter(function(r) {
            r.gutterMarkers && r.gutterMarkers[e] && Jn(t, r, "gutter", function() {
              return r.gutterMarkers[e] = null, al(r.gutterMarkers) && (r.gutterMarkers = null), !0;
            });
          });
        }),
        lineInfo: function(e) {
          var t;
          if (typeof e == "number") {
            if (!Pn(this, e) || (t = e, e = B(this, e), !e))
              return null;
          } else if (t = oe(e), t == null)
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
        addLineClass: Fe(function(e, t, r) {
          return Jn(this, e, t == "gutter" ? "gutter" : "class", function(n) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass";
            if (!n[i])
              n[i] = r;
            else {
              if (xt(r).test(n[i]))
                return !1;
              n[i] += " " + r;
            }
            return !0;
          });
        }),
        removeLineClass: Fe(function(e, t, r) {
          return Jn(this, e, t == "gutter" ? "gutter" : "class", function(n) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass", o = n[i];
            if (o)
              if (r == null)
                n[i] = null;
              else {
                var l = o.match(xt(r));
                if (!l)
                  return !1;
                var a = l.index + l[0].length;
                n[i] = o.slice(0, l.index) + (!l.index || a == o.length ? "" : " ") + o.slice(a) || null;
              }
            else
              return !1;
            return !0;
          });
        }),
        addLineWidget: Fe(function(e, t, r) {
          return Zf(this, e, t, r);
        }),
        removeLineWidget: function(e) {
          e.clear();
        },
        markText: function(e, t, r) {
          return xn(this, Y(this, e), Y(this, t), r, r && r.type || "range");
        },
        setBookmark: function(e, t) {
          var r = {
            replacedWith: t && (t.nodeType == null ? t.widget : t),
            insertLeft: t && t.insertLeft,
            clearWhenEmpty: !1,
            shared: t && t.shared,
            handleMouseEvents: t && t.handleMouseEvents
          };
          return e = Y(this, e), xn(this, e, e, r, "bookmark");
        },
        findMarksAt: function(e) {
          e = Y(this, e);
          var t = [], r = B(this, e.line).markedSpans;
          if (r)
            for (var n = 0; n < r.length; ++n) {
              var i = r[n];
              (i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
            }
          return t;
        },
        findMarks: function(e, t, r) {
          e = Y(this, e), t = Y(this, t);
          var n = [], i = e.line;
          return this.iter(e.line, t.line + 1, function(o) {
            var l = o.markedSpans;
            if (l)
              for (var a = 0; a < l.length; a++) {
                var c = l[a];
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
          }), Y(this, D(r, t));
        },
        indexFromPos: function(e) {
          e = Y(this, e);
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
            _i(this, this.first, this.first + this.size),
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
          var n = new Ke(_i(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);
          return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({ doc: n, sharedHist: e.sharedHist }), n.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], Jf(n, zs(this)), n;
        },
        unlinkDoc: function(e) {
          if (e instanceof ue && (e = e.doc), this.linked)
            for (var t = 0; t < this.linked.length; ++t) {
              var r = this.linked[t];
              if (r.doc == e) {
                this.linked.splice(t, 1), e.unlinkDoc(this), Vf(zs(this));
                break;
              }
            }
          if (e.history == this.history) {
            var n = [e.id];
            Wt(e, function(i) {
              return n.push(i.id);
            }, !0), e.history = new Yr(null), e.history.done = vn(this.history.done, n), e.history.undone = vn(this.history.undone, n);
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
          return this.lineSep ? e.split(this.lineSep) : Hi(e);
        },
        lineSeparator: function() {
          return this.lineSep || `
`;
        },
        setDirection: Fe(function(e) {
          e != "rtl" && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(t) {
            return t.order = null;
          }), this.cm && Uf(this.cm));
        })
      }), Ke.prototype.eachLine = Ke.prototype.iter;
      var Us = 0;
      function tc(e) {
        var t = this;
        if (Gs(t), !(ke(t, e) || Lt(t.display, e))) {
          Ge(e), S && (Us = +new Date());
          var r = jt(t, e, !0), n = e.dataTransfer.files;
          if (!(!r || t.isReadOnly()))
            if (n && n.length && window.FileReader && window.File)
              for (var i = n.length, o = Array(i), l = 0, a = function() {
                ++l == i && Te(t, function() {
                  r = Y(t.doc, r);
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
                  mn(t.doc, C), Fs(t.doc, Ht(Y(t.doc, r), Y(t.doc, Pt(C))));
                })();
              }, c = function(C, F) {
                if (t.options.allowDropFileTypes && ee(t.options.allowDropFileTypes, C.type) == -1) {
                  a();
                  return;
                }
                var A = new FileReader();
                A.onerror = function() {
                  return a();
                }, A.onload = function() {
                  var M = A.result;
                  if (/[\x00-\x08\x0e-\x1f]{2}/.test(M)) {
                    a();
                    return;
                  }
                  o[F] = M, a();
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
                  if (t.state.draggingText && !t.state.draggingText.copy && (b = t.listSelections()), Qr(t.doc, Ht(r, r)), b)
                    for (var k = 0; k < b.length; ++k)
                      bn(t.doc, "", b[k].anchor, b[k].head, "drag");
                  t.replaceSelection(y, "around", "paste"), t.display.input.focus();
                }
              } catch {
              }
            }
        }
      }
      function nc(e, t) {
        if (S && (!e.state.draggingText || +new Date() - Us < 100)) {
          Hn(t);
          return;
        }
        if (!(ke(e, t) || Lt(e.display, t)) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !Q)) {
          var r = z("img", null, null, "position: fixed; left: 0; top: 0;");
          r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", $ && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), $ && r.parentNode.removeChild(r);
        }
      }
      function rc(e, t) {
        var r = jt(e, t);
        if (!!r) {
          var n = document.createDocumentFragment();
          ao(e, r, n), e.display.dragCursor || (e.display.dragCursor = z("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), Ue(e.display.dragCursor, n);
        }
      }
      function Gs(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }
      function qs(e) {
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
      var Ks = !1;
      function ic() {
        Ks || (oc(), Ks = !0);
      }
      function oc() {
        var e;
        G(window, "resize", function() {
          e == null && (e = setTimeout(function() {
            e = null, qs(lc);
          }, 100));
        }), G(window, "blur", function() {
          return qs(dn);
        });
      }
      function lc(e) {
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
      var Ft = {};
      Ft.basic = {
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
      }, Ft.pcDefault = {
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
      }, Ft.emacsy = {
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
      }, Ft.macDefault = {
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
      }, Ft.default = se ? Ft.macDefault : Ft.pcDefault;
      function sc(e) {
        var t = e.split(/-(?!$)/);
        e = t[t.length - 1];
        for (var r, n, i, o, l = 0; l < t.length - 1; l++) {
          var a = t[l];
          if (/^(cmd|meta|m)$/i.test(a))
            o = !0;
          else if (/^a(lt)?$/i.test(a))
            r = !0;
          else if (/^(c|ctrl|control)$/i.test(a))
            n = !0;
          else if (/^s(hift)?$/i.test(a))
            i = !0;
          else
            throw new Error("Unrecognized modifier name: " + a);
        }
        return r && (e = "Alt-" + e), n && (e = "Ctrl-" + e), o && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
      }
      function ac(e) {
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
            for (var i = Tr(r.split(" "), sc), o = 0; o < i.length; o++) {
              var l = void 0, a = void 0;
              o == i.length - 1 ? (a = i.join(" "), l = n) : (a = i.slice(0, o + 1).join(" "), l = "...");
              var c = t[a];
              if (!c)
                t[a] = l;
              else if (c != l)
                throw new Error("Inconsistent bindings for " + a);
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
            var l = wn(e, t.fallthrough[o], r, n);
            if (l)
              return l;
          }
        }
      }
      function $s(e) {
        var t = typeof e == "string" ? e : Rt[e.keyCode];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
      }
      function Xs(e, t, r) {
        var n = e;
        return t.altKey && n != "Alt" && (e = "Alt-" + e), (Ee ? t.metaKey : t.ctrlKey) && n != "Ctrl" && (e = "Ctrl-" + e), (Ee ? t.ctrlKey : t.metaKey) && n != "Mod" && (e = "Cmd-" + e), !r && t.shiftKey && n != "Shift" && (e = "Shift-" + e), e;
      }
      function Ys(e, t) {
        if ($ && e.keyCode == 34 && e.char)
          return !1;
        var r = Rt[e.keyCode];
        return r == null || e.altGraphKey ? !1 : (e.keyCode == 3 && e.code && (r = e.code), Xs(r, e, t));
      }
      function ti(e) {
        return typeof e == "string" ? Ft[e] : e;
      }
      function Sn(e, t) {
        for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
          for (var o = t(r[i]); n.length && X(o.from, ie(n).to) <= 0; ) {
            var l = n.pop();
            if (X(l.from, o.from) < 0) {
              o.from = l.from;
              break;
            }
          }
          n.push(o);
        }
        Qe(e, function() {
          for (var a = n.length - 1; a >= 0; a--)
            bn(e.doc, "", n[a].from, n[a].to, "+delete");
          pn(e);
        });
      }
      function To(e, t, r) {
        var n = ul(e.text, t + r, r);
        return n < 0 || n > e.text.length ? null : n;
      }
      function Fo(e, t, r) {
        var n = To(e, t.ch, r);
        return n == null ? null : new D(t.line, n, r < 0 ? "after" : "before");
      }
      function Ao(e, t, r, n, i) {
        if (e) {
          t.doc.direction == "rtl" && (i = -i);
          var o = St(r, t.doc.direction);
          if (o) {
            var l = i < 0 ? ie(o) : o[0], a = i < 0 == (l.level == 1), c = a ? "after" : "before", h;
            if (l.level > 0 || t.doc.direction == "rtl") {
              var y = fn(t, r);
              h = i < 0 ? r.text.length - 1 : 0;
              var b = mt(t, y, h).top;
              h = Nn(function(k) {
                return mt(t, y, k).top == b;
              }, i < 0 == (l.level == 1) ? l.from : l.to - 1, h), c == "before" && (h = To(r, h, 1));
            } else
              h = i < 0 ? l.to : l.from;
            return new D(n, h, c);
          }
        }
        return new D(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after");
      }
      function uc(e, t, r, n) {
        var i = St(t, e.doc.direction);
        if (!i)
          return Fo(t, r, n);
        r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");
        var o = In(i, r.ch, r.sticky), l = i[o];
        if (e.doc.direction == "ltr" && l.level % 2 == 0 && (n > 0 ? l.to > r.ch : l.from < r.ch))
          return Fo(t, r, n);
        var a = function(N, I) {
          return To(t, N instanceof D ? N.ch : N, I);
        }, c, h = function(N) {
          return e.options.lineWrapping ? (c = c || fn(e, t), Vl(e, t, c, N)) : { begin: 0, end: t.text.length };
        }, y = h(r.sticky == "before" ? a(r, -1) : r.ch);
        if (e.doc.direction == "rtl" || l.level == 1) {
          var b = l.level == 1 == n < 0, k = a(r, b ? 1 : -1);
          if (k != null && (b ? k <= l.to && k <= y.end : k >= l.from && k >= y.begin)) {
            var C = b ? "before" : "after";
            return new D(r.line, k, C);
          }
        }
        var F = function(N, I, O) {
          for (var P = function(ae, Ae) {
            return Ae ? new D(r.line, a(ae, 1), "before") : new D(r.line, ae, "after");
          }; N >= 0 && N < i.length; N += I) {
            var _ = i[N], R = I > 0 == (_.level != 1), Z = R ? O.begin : a(O.end, -1);
            if (_.from <= Z && Z < _.to || (Z = R ? _.from : a(_.to, -1), O.begin <= Z && Z < O.end))
              return P(Z, R);
          }
        }, A = F(o + n, n, y);
        if (A)
          return A;
        var M = n > 0 ? y.end : a(y.begin, -1);
        return M != null && !(n > 0 && M == t.text.length) && (A = F(n > 0 ? 0 : i.length - 1, n, h(M)), A) ? A : null;
      }
      var or = {
        selectAll: Ns,
        singleSelection: function(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), pt);
        },
        killLine: function(e) {
          return Sn(e, function(t) {
            if (t.empty()) {
              var r = B(e.doc, t.head.line).text.length;
              return t.head.ch == r && t.head.line < e.lastLine() ? { from: t.head, to: D(t.head.line + 1, 0) } : { from: t.head, to: D(t.head.line, r) };
            } else
              return { from: t.from(), to: t.to() };
          });
        },
        deleteLine: function(e) {
          return Sn(e, function(t) {
            return {
              from: D(t.from().line, 0),
              to: Y(e.doc, D(t.to().line + 1, 0))
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
              return js(e, t.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return Zs(e, t.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return fc(e, t.head.line);
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
            return n.ch < e.getLine(n.line).search(/\S/) ? Zs(e, t.head) : n;
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
            var o = r[i].from(), l = pe(e.getLine(o.line), o.ch, n);
            t.push(Fi(n - l % n));
          }
          e.replaceSelections(t);
        },
        defaultTab: function(e) {
          e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
        },
        transposeChars: function(e) {
          return Qe(e, function() {
            for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++)
              if (!!t[n].empty()) {
                var i = t[n].head, o = B(e.doc, i.line).text;
                if (o) {
                  if (i.ch == o.length && (i = new D(i.line, i.ch - 1)), i.ch > 0)
                    i = new D(i.line, i.ch + 1), e.replaceRange(
                      o.charAt(i.ch - 1) + o.charAt(i.ch - 2),
                      D(i.line, i.ch - 2),
                      i,
                      "+transpose"
                    );
                  else if (i.line > e.doc.first) {
                    var l = B(e.doc, i.line - 1).text;
                    l && (i = new D(i.line, 1), e.replaceRange(
                      o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1),
                      D(i.line - 1, l.length - 1),
                      i,
                      "+transpose"
                    ));
                  }
                }
                r.push(new ne(i, i));
              }
            e.setSelections(r);
          });
        },
        newlineAndIndent: function(e) {
          return Qe(e, function() {
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
      function js(e, t) {
        var r = B(e.doc, t), n = lt(r);
        return n != r && (t = oe(n)), Ao(!0, e, n, t, 1);
      }
      function fc(e, t) {
        var r = B(e.doc, t), n = $u(r);
        return n != r && (t = oe(n)), Ao(!0, e, r, t, -1);
      }
      function Zs(e, t) {
        var r = js(e, t.line), n = B(e.doc, r.line), i = St(n, e.doc.direction);
        if (!i || i[0].level == 0) {
          var o = Math.max(r.ch, n.text.search(/\S/)), l = t.line == r.line && t.ch <= o && t.ch;
          return D(r.line, l ? 0 : o, r.sticky);
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
      function cc(e, t, r) {
        for (var n = 0; n < e.state.keyMaps.length; n++) {
          var i = wn(t, e.state.keyMaps[n], r, e);
          if (i)
            return i;
        }
        return e.options.extraKeys && wn(t, e.options.extraKeys, r, e) || wn(t, e.options.keyMap, r, e);
      }
      var hc = new Ce();
      function lr(e, t, r, n) {
        var i = e.state.keySeq;
        if (i) {
          if ($s(t))
            return "handled";
          if (/\'$/.test(t) ? e.state.keySeq = null : hc.set(50, function() {
            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
          }), Qs(e, i + " " + t, r, n))
            return !0;
        }
        return Qs(e, t, r, n);
      }
      function Qs(e, t, r, n) {
        var i = cc(e, t, n);
        return i == "multi" && (e.state.keySeq = t), i == "handled" && Le(e, "keyHandled", e, t, r), (i == "handled" || i == "multi") && (Ge(r), uo(e)), !!i;
      }
      function Js(e, t) {
        var r = Ys(t, !0);
        return r ? t.shiftKey && !e.state.keySeq ? lr(e, "Shift-" + r, t, function(n) {
          return ni(e, n, !0);
        }) || lr(e, r, t, function(n) {
          if (typeof n == "string" ? /^go[A-Z]/.test(n) : n.motion)
            return ni(e, n);
        }) : lr(e, r, t, function(n) {
          return ni(e, n);
        }) : !1;
      }
      function dc(e, t, r) {
        return lr(e, "'" + r + "'", t, function(n) {
          return ni(e, n, !0);
        });
      }
      var Do = null;
      function Vs(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && (t.curOp.focus = g(V(t)), !ke(t, e))) {
          S && L < 11 && e.keyCode == 27 && (e.returnValue = !1);
          var r = e.keyCode;
          t.display.shift = r == 16 || e.shiftKey;
          var n = Js(t, e);
          $ && (Do = n ? r : null, !n && r == 88 && !Mu && (se ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), p && !se && !n && r == 46 && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), r == 18 && !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) && pc(t);
        }
      }
      function pc(e) {
        var t = e.display.lineDiv;
        W(t, "CodeMirror-crosshair");
        function r(n) {
          (n.keyCode == 18 || !n.altKey) && (wt(t, "CodeMirror-crosshair"), et(document, "keyup", r), et(document, "mouseover", r));
        }
        G(document, "keyup", r), G(document, "mouseover", r);
      }
      function ea(e) {
        e.keyCode == 16 && (this.doc.sel.shift = !1), ke(this, e);
      }
      function ta(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && !(Lt(t.display, e) || ke(t, e) || e.ctrlKey && !e.altKey || se && e.metaKey)) {
          var r = e.keyCode, n = e.charCode;
          if ($ && r == Do) {
            Do = null, Ge(e);
            return;
          }
          if (!($ && (!e.which || e.which < 10) && Js(t, e))) {
            var i = String.fromCharCode(n == null ? r : n);
            i != "\b" && (dc(t, e, i) || t.display.input.onKeyPress(e));
          }
        }
      }
      var gc = 400, Mo = function(e, t, r) {
        this.time = e, this.pos = t, this.button = r;
      };
      Mo.prototype.compare = function(e, t, r) {
        return this.time + gc > e && X(t, this.pos) == 0 && r == this.button;
      };
      var sr, ar;
      function vc(e, t) {
        var r = +new Date();
        return ar && ar.compare(r, e, t) ? (sr = ar = null, "triple") : sr && sr.compare(r, e, t) ? (ar = new Mo(r, e, t), sr = null, "double") : (sr = new Mo(r, e, t), ar = null, "single");
      }
      function na(e) {
        var t = this, r = t.display;
        if (!(ke(t, e) || r.activeTouch && r.input.supportsTouch())) {
          if (r.input.ensurePolled(), r.shift = e.shiftKey, Lt(r, e)) {
            T || (r.scroller.draggable = !1, setTimeout(function() {
              return r.scroller.draggable = !0;
            }, 100));
            return;
          }
          if (!Eo(t, e)) {
            var n = jt(t, e), i = dl(e), o = n ? vc(n, i) : "single";
            Ne(t).focus(), i == 1 && t.state.selectingText && t.state.selectingText(e), !(n && yc(t, i, n, o, e)) && (i == 1 ? n ? bc(t, n, o, e) : Ni(e) == r.scroller && Ge(e) : i == 2 ? (n && Zr(t.doc, n), setTimeout(function() {
              return r.input.focus();
            }, 20)) : i == 3 && (je ? t.display.input.onContextMenu(e) : fo(t)));
          }
        }
      }
      function yc(e, t, r, n, i) {
        var o = "Click";
        return n == "double" ? o = "Double" + o : n == "triple" && (o = "Triple" + o), o = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + o, lr(e, Xs(o, i), i, function(l) {
          if (typeof l == "string" && (l = or[l]), !l)
            return !1;
          var a = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), a = l(e, r) != kr;
          } finally {
            e.state.suppressEdits = !1;
          }
          return a;
        });
      }
      function mc(e, t, r) {
        var n = e.getOption("configureMouse"), i = n ? n(e, t, r) : {};
        if (i.unit == null) {
          var o = re ? r.shiftKey && r.metaKey : r.altKey;
          i.unit = o ? "rectangle" : t == "single" ? "char" : t == "double" ? "word" : "line";
        }
        return (i.extend == null || e.doc.extend) && (i.extend = e.doc.extend || r.shiftKey), i.addNew == null && (i.addNew = se ? r.metaKey : r.ctrlKey), i.moveOnDrag == null && (i.moveOnDrag = !(se ? r.altKey : r.ctrlKey)), i;
      }
      function bc(e, t, r, n) {
        S ? setTimeout(Ze(rs, e), 0) : e.curOp.focus = g(V(e));
        var i = mc(e, r, n), o = e.doc.sel, l;
        e.options.dragDrop && Tu && !e.isReadOnly() && r == "single" && (l = o.contains(t)) > -1 && (X((l = o.ranges[l]).from(), t) < 0 || t.xRel > 0) && (X(l.to(), t) > 0 || t.xRel < 0) ? xc(e, n, t, i) : wc(e, n, t, i);
      }
      function xc(e, t, r, n) {
        var i = e.display, o = !1, l = Te(e, function(h) {
          T && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : fo(e)), et(i.wrapper.ownerDocument, "mouseup", l), et(i.wrapper.ownerDocument, "mousemove", a), et(i.scroller, "dragstart", c), et(i.scroller, "drop", l), o || (Ge(h), n.addNew || Zr(e.doc, r, null, null, n.extend), T && !Q || S && L == 9 ? setTimeout(function() {
            i.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), i.input.focus();
          }, 20) : i.input.focus());
        }), a = function(h) {
          o = o || Math.abs(t.clientX - h.clientX) + Math.abs(t.clientY - h.clientY) >= 10;
        }, c = function() {
          return o = !0;
        };
        T && (i.scroller.draggable = !0), e.state.draggingText = l, l.copy = !n.moveOnDrag, G(i.wrapper.ownerDocument, "mouseup", l), G(i.wrapper.ownerDocument, "mousemove", a), G(i.scroller, "dragstart", c), G(i.scroller, "drop", l), e.state.delayingBlurEvent = !0, setTimeout(function() {
          return i.input.focus();
        }, 20), i.scroller.dragDrop && i.scroller.dragDrop();
      }
      function ra(e, t, r) {
        if (r == "char")
          return new ne(t, t);
        if (r == "word")
          return e.findWordAt(t);
        if (r == "line")
          return new ne(D(t.line, 0), Y(e.doc, D(t.line + 1, 0)));
        var n = r(e, t);
        return new ne(n.from, n.to);
      }
      function wc(e, t, r, n) {
        S && fo(e);
        var i = e.display, o = e.doc;
        Ge(t);
        var l, a, c = o.sel, h = c.ranges;
        if (n.addNew && !n.extend ? (a = o.sel.contains(r), a > -1 ? l = h[a] : l = new ne(r, r)) : (l = o.sel.primary(), a = o.sel.primIndex), n.unit == "rectangle")
          n.addNew || (l = new ne(r, r)), r = jt(e, t, !0, !0), a = -1;
        else {
          var y = ra(e, r, n.unit);
          n.extend ? l = ko(l, y.anchor, y.head, n.extend) : l = y;
        }
        n.addNew ? a == -1 ? (a = h.length, Oe(
          o,
          at(e, h.concat([l]), a),
          { scroll: !1, origin: "*mouse" }
        )) : h.length > 1 && h[a].empty() && n.unit == "char" && !n.extend ? (Oe(
          o,
          at(e, h.slice(0, a).concat(h.slice(a + 1)), 0),
          { scroll: !1, origin: "*mouse" }
        ), c = o.sel) : Lo(o, a, l, Li) : (a = 0, Oe(o, new tt([l], 0), Li), c = o.sel);
        var b = r;
        function k(O) {
          if (X(b, O) != 0)
            if (b = O, n.unit == "rectangle") {
              for (var P = [], _ = e.options.tabSize, R = pe(B(o, r.line).text, r.ch, _), Z = pe(B(o, O.line).text, O.ch, _), ae = Math.min(R, Z), Ae = Math.max(R, Z), fe = Math.min(r.line, O.line), Je = Math.min(e.lastLine(), Math.max(r.line, O.line)); fe <= Je; fe++) {
                var $e = B(o, fe).text, ye = Ti($e, ae, _);
                ae == Ae ? P.push(new ne(D(fe, ye), D(fe, ye))) : $e.length > ye && P.push(new ne(D(fe, ye), D(fe, Ti($e, Ae, _))));
              }
              P.length || P.push(new ne(r, r)), Oe(
                o,
                at(e, c.ranges.slice(0, a).concat(P), a),
                { origin: "*mouse", scroll: !1 }
              ), e.scrollIntoView(O);
            } else {
              var Xe = l, Me = ra(e, O, n.unit), we = Xe.anchor, me;
              X(Me.anchor, we) > 0 ? (me = Me.head, we = Mr(Xe.from(), Me.anchor)) : (me = Me.anchor, we = Dr(Xe.to(), Me.head));
              var he = c.ranges.slice(0);
              he[a] = Sc(e, new ne(Y(o, we), me)), Oe(o, at(e, he, a), Li);
            }
        }
        var C = i.wrapper.getBoundingClientRect(), F = 0;
        function A(O) {
          var P = ++F, _ = jt(e, O, !0, n.unit == "rectangle");
          if (!!_)
            if (X(_, b) != 0) {
              e.curOp.focus = g(V(e)), k(_);
              var R = qr(i, o);
              (_.line >= R.to || _.line < R.from) && setTimeout(Te(e, function() {
                F == P && A(O);
              }), 150);
            } else {
              var Z = O.clientY < C.top ? -20 : O.clientY > C.bottom ? 20 : 0;
              Z && setTimeout(Te(e, function() {
                F == P && (i.scroller.scrollTop += Z, A(O));
              }), 50);
            }
        }
        function M(O) {
          e.state.selectingText = !1, F = 1 / 0, O && (Ge(O), i.input.focus()), et(i.wrapper.ownerDocument, "mousemove", N), et(i.wrapper.ownerDocument, "mouseup", I), o.history.lastSelOrigin = null;
        }
        var N = Te(e, function(O) {
          O.buttons === 0 || !dl(O) ? M(O) : A(O);
        }), I = Te(e, M);
        e.state.selectingText = I, G(i.wrapper.ownerDocument, "mousemove", N), G(i.wrapper.ownerDocument, "mouseup", I);
      }
      function Sc(e, t) {
        var r = t.anchor, n = t.head, i = B(e.doc, r.line);
        if (X(r, n) == 0 && r.sticky == n.sticky)
          return t;
        var o = St(i);
        if (!o)
          return t;
        var l = In(o, r.ch, r.sticky), a = o[l];
        if (a.from != r.ch && a.to != r.ch)
          return t;
        var c = l + (a.from == r.ch == (a.level != 1) ? 0 : 1);
        if (c == 0 || c == o.length)
          return t;
        var h;
        if (n.line != r.line)
          h = (n.line - r.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
        else {
          var y = In(o, n.ch, n.sticky), b = y - l || (n.ch - r.ch) * (a.level == 1 ? -1 : 1);
          y == c - 1 || y == c ? h = b < 0 : h = b > 0;
        }
        var k = o[c + (h ? -1 : 0)], C = h == (k.level == 1), F = C ? k.from : k.to, A = C ? "after" : "before";
        return r.ch == F && r.sticky == A ? t : new ne(new D(r.line, F, A), n);
      }
      function ia(e, t, r, n) {
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
        var l = e.display, a = l.lineDiv.getBoundingClientRect();
        if (o > a.bottom || !rt(e, r))
          return Ei(t);
        o -= a.top - l.viewOffset;
        for (var c = 0; c < e.display.gutterSpecs.length; ++c) {
          var h = l.gutters.childNodes[c];
          if (h && h.getBoundingClientRect().right >= i) {
            var y = $t(e.doc, o), b = e.display.gutterSpecs[c];
            return ge(e, r, e, y, b.className, t), Ei(t);
          }
        }
      }
      function Eo(e, t) {
        return ia(e, t, "gutterClick", !0);
      }
      function oa(e, t) {
        Lt(e.display, t) || Cc(e, t) || ke(e, t, "contextmenu") || je || e.display.input.onContextMenu(t);
      }
      function Cc(e, t) {
        return rt(e, "gutterContextMenu") ? ia(e, t, "gutterContextMenu", !1) : !1;
      }
      function la(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Un(e);
      }
      var Cn = { toString: function() {
        return "CodeMirror.Init";
      } }, sa = {}, ri = {};
      function kc(e) {
        var t = e.optionHandlers;
        function r(n, i, o, l) {
          e.defaults[n] = i, o && (t[n] = l ? function(a, c, h) {
            h != Cn && o(a, c, h);
          } : o);
        }
        e.defineOption = r, e.Init = Cn, r("value", "", function(n, i) {
          return n.setValue(i);
        }, !0), r("mode", null, function(n, i) {
          n.doc.modeOption = i, wo(n);
        }, !0), r("indentUnit", 2, wo, !0), r("indentWithTabs", !1), r("smartIndent", !0), r("tabSize", 4, function(n) {
          Zn(n), Un(n), qe(n);
        }, !0), r("lineSeparator", null, function(n, i) {
          if (n.doc.lineSep = i, !!i) {
            var o = [], l = n.doc.first;
            n.doc.iter(function(c) {
              for (var h = 0; ; ) {
                var y = c.text.indexOf(i, h);
                if (y == -1)
                  break;
                h = y + i.length, o.push(D(l, y));
              }
              l++;
            });
            for (var a = o.length - 1; a >= 0; a--)
              bn(n.doc, i, o[a], D(o[a].line, o[a].ch + i.length));
          }
        }), r("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(n, i, o) {
          n.state.specialChars = new RegExp(i.source + (i.test("	") ? "" : "|	"), "g"), o != Cn && n.refresh();
        }), r("specialCharPlaceholder", Ju, function(n) {
          return n.refresh();
        }, !0), r("electricChars", !0), r("inputStyle", ce ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), r("spellcheck", !1, function(n, i) {
          return n.getInputField().spellcheck = i;
        }, !0), r("autocorrect", !1, function(n, i) {
          return n.getInputField().autocorrect = i;
        }, !0), r("autocapitalize", !1, function(n, i) {
          return n.getInputField().autocapitalize = i;
        }, !0), r("rtlMoveVisually", !q), r("wholeLineUpdateBefore", !0), r("theme", "default", function(n) {
          la(n), jn(n);
        }, !0), r("keyMap", "default", function(n, i, o) {
          var l = ti(i), a = o != Cn && ti(o);
          a && a.detach && a.detach(n, l), l.attach && l.attach(n, a || null);
        }), r("extraKeys", null), r("configureMouse", null), r("lineWrapping", !1, Tc, !0), r("gutters", [], function(n, i) {
          n.display.gutterSpecs = bo(i, n.options.lineNumbers), jn(n);
        }, !0), r("fixedGutter", !0, function(n, i) {
          n.display.gutters.style.left = i ? lo(n.display) + "px" : "0", n.refresh();
        }, !0), r("coverGutterNextToScrollbar", !1, function(n) {
          return gn(n);
        }, !0), r("scrollbarStyle", "native", function(n) {
          us(n), gn(n), n.display.scrollbars.setScrollTop(n.doc.scrollTop), n.display.scrollbars.setScrollLeft(n.doc.scrollLeft);
        }, !0), r("lineNumbers", !1, function(n, i) {
          n.display.gutterSpecs = bo(n.options.gutters, i), jn(n);
        }, !0), r("firstLineNumber", 1, jn, !0), r("lineNumberFormatter", function(n) {
          return n;
        }, jn, !0), r("showCursorWhenSelecting", !1, Gn, !0), r("resetSelectionOnContextMenu", !0), r("lineWiseCopyCut", !0), r("pasteLinesPerSelection", !0), r("selectionsMayTouch", !1), r("readOnly", !1, function(n, i) {
          i == "nocursor" && (dn(n), n.display.input.blur()), n.display.input.readOnlyChanged(i);
        }), r("screenReaderLabel", null, function(n, i) {
          i = i === "" ? null : i, n.display.input.screenReaderLabelChanged(i);
        }), r("disableInput", !1, function(n, i) {
          i || n.display.input.reset();
        }, !0), r("dragDrop", !0, Lc), r("allowDropFileTypes", null), r("cursorBlinkRate", 530), r("cursorScrollMargin", 0), r("cursorHeight", 1, Gn, !0), r("singleCursorHeightPerLine", !0, Gn, !0), r("workTime", 100), r("workDelay", 100), r("flattenSpans", !0, Zn, !0), r("addModeClass", !1, Zn, !0), r("pollInterval", 100), r("undoDepth", 200, function(n, i) {
          return n.doc.history.undoDepth = i;
        }), r("historyEventDelay", 1250), r("viewportMargin", 10, function(n) {
          return n.refresh();
        }, !0), r("maxHighlightLength", 1e4, Zn, !0), r("moveInputWithCursor", !0, function(n, i) {
          i || n.display.input.resetPosition();
        }), r("tabindex", null, function(n, i) {
          return n.display.input.getField().tabIndex = i || "";
        }), r("autofocus", null), r("direction", "ltr", function(n, i) {
          return n.doc.setDirection(i);
        }, !0), r("phrases", null);
      }
      function Lc(e, t, r) {
        var n = r && r != Cn;
        if (!t != !n) {
          var i = e.display.dragFunctions, o = t ? G : et;
          o(e.display.scroller, "dragstart", i.start), o(e.display.scroller, "dragenter", i.enter), o(e.display.scroller, "dragover", i.over), o(e.display.scroller, "dragleave", i.leave), o(e.display.scroller, "drop", i.drop);
        }
      }
      function Tc(e) {
        e.options.lineWrapping ? (W(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (wt(e.display.wrapper, "CodeMirror-wrap"), Zi(e)), so(e), qe(e), Un(e), setTimeout(function() {
          return gn(e);
        }, 100);
      }
      function ue(e, t) {
        var r = this;
        if (!(this instanceof ue))
          return new ue(e, t);
        this.options = t = t ? Pe(t) : {}, Pe(sa, t, !1);
        var n = t.value;
        typeof n == "string" ? n = new Ke(n, t.mode, null, t.lineSeparator, t.direction) : t.mode && (n.modeOption = t.mode), this.doc = n;
        var i = new ue.inputStyles[t.inputStyle](this), o = this.display = new Rf(e, n, i, t);
        o.wrapper.CodeMirror = this, la(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), us(this), this.state = {
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
          highlight: new Ce(),
          keySeq: null,
          specialChars: null
        }, t.autofocus && !ce && o.input.focus(), S && L < 11 && setTimeout(function() {
          return r.display.input.reset(!0);
        }, 20), Fc(this), ic(), Vt(this), this.curOp.forceUpdate = !0, bs(this, n), t.autofocus && !ce || this.hasFocus() ? setTimeout(function() {
          r.hasFocus() && !r.state.focused && co(r);
        }, 20) : dn(this);
        for (var l in ri)
          ri.hasOwnProperty(l) && ri[l](this, t[l], Cn);
        hs(this), t.finishInit && t.finishInit(this);
        for (var a = 0; a < No.length; ++a)
          No[a](this);
        en(this), T && t.lineWrapping && getComputedStyle(o.lineDiv).textRendering == "optimizelegibility" && (o.lineDiv.style.textRendering = "auto");
      }
      ue.defaults = sa, ue.optionHandlers = ri;
      function Fc(e) {
        var t = e.display;
        G(t.scroller, "mousedown", Te(e, na)), S && L < 11 ? G(t.scroller, "dblclick", Te(e, function(c) {
          if (!ke(e, c)) {
            var h = jt(e, c);
            if (!(!h || Eo(e, c) || Lt(e.display, c))) {
              Ge(c);
              var y = e.findWordAt(h);
              Zr(e.doc, y.anchor, y.head);
            }
          }
        })) : G(t.scroller, "dblclick", function(c) {
          return ke(e, c) || Ge(c);
        }), G(t.scroller, "contextmenu", function(c) {
          return oa(e, c);
        }), G(t.input.getField(), "contextmenu", function(c) {
          t.scroller.contains(c.target) || oa(e, c);
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
        function l(c, h) {
          if (h.left == null)
            return !0;
          var y = h.left - c.left, b = h.top - c.top;
          return y * y + b * b > 20 * 20;
        }
        G(t.scroller, "touchstart", function(c) {
          if (!ke(e, c) && !o(c) && !Eo(e, c)) {
            t.input.ensurePolled(), clearTimeout(r);
            var h = +new Date();
            t.activeTouch = {
              start: h,
              moved: !1,
              prev: h - n.end <= 300 ? n : null
            }, c.touches.length == 1 && (t.activeTouch.left = c.touches[0].pageX, t.activeTouch.top = c.touches[0].pageY);
          }
        }), G(t.scroller, "touchmove", function() {
          t.activeTouch && (t.activeTouch.moved = !0);
        }), G(t.scroller, "touchend", function(c) {
          var h = t.activeTouch;
          if (h && !Lt(t, c) && h.left != null && !h.moved && new Date() - h.start < 300) {
            var y = e.coordsChar(t.activeTouch, "page"), b;
            !h.prev || l(h, h.prev) ? b = new ne(y, y) : !h.prev.prev || l(h, h.prev.prev) ? b = e.findWordAt(y) : b = new ne(D(y.line, 0), Y(e.doc, D(y.line + 1, 0))), e.setSelection(b.anchor, b.head), e.focus(), Ge(c);
          }
          i();
        }), G(t.scroller, "touchcancel", i), G(t.scroller, "scroll", function() {
          t.scroller.clientHeight && (Kn(e, t.scroller.scrollTop), Qt(e, t.scroller.scrollLeft, !0), ge(e, "scroll", e));
        }), G(t.scroller, "mousewheel", function(c) {
          return gs(e, c);
        }), G(t.scroller, "DOMMouseScroll", function(c) {
          return gs(e, c);
        }), G(t.wrapper, "scroll", function() {
          return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0;
        }), t.dragFunctions = {
          enter: function(c) {
            ke(e, c) || Hn(c);
          },
          over: function(c) {
            ke(e, c) || (rc(e, c), Hn(c));
          },
          start: function(c) {
            return nc(e, c);
          },
          drop: Te(e, tc),
          leave: function(c) {
            ke(e, c) || Gs(e);
          }
        };
        var a = t.input.getField();
        G(a, "keyup", function(c) {
          return ea.call(e, c);
        }), G(a, "keydown", Te(e, Vs)), G(a, "keypress", Te(e, ta)), G(a, "focus", function(c) {
          return co(e, c);
        }), G(a, "blur", function(c) {
          return dn(e, c);
        });
      }
      var No = [];
      ue.defineInitHook = function(e) {
        return No.push(e);
      };
      function ur(e, t, r, n) {
        var i = e.doc, o;
        r == null && (r = "add"), r == "smart" && (i.mode.indent ? o = Wn(e, t).state : r = "prev");
        var l = e.options.tabSize, a = B(i, t), c = pe(a.text, null, l);
        a.stateAfter && (a.stateAfter = null);
        var h = a.text.match(/^\s*/)[0], y;
        if (!n && !/\S/.test(a.text))
          y = 0, r = "not";
        else if (r == "smart" && (y = i.mode.indent(o, a.text.slice(h.length), a.text), y == kr || y > 150)) {
          if (!n)
            return;
          r = "prev";
        }
        r == "prev" ? t > i.first ? y = pe(B(i, t - 1).text, null, l) : y = 0 : r == "add" ? y = c + e.options.indentUnit : r == "subtract" ? y = c - e.options.indentUnit : typeof r == "number" && (y = c + r), y = Math.max(0, y);
        var b = "", k = 0;
        if (e.options.indentWithTabs)
          for (var C = Math.floor(y / l); C; --C)
            k += l, b += "	";
        if (k < y && (b += Fi(y - k)), b != h)
          return bn(i, b, D(t, 0), D(t, h.length), "+input"), a.stateAfter = null, !0;
        for (var F = 0; F < i.sel.ranges.length; F++) {
          var A = i.sel.ranges[F];
          if (A.head.line == t && A.head.ch < h.length) {
            var M = D(t, h.length);
            Lo(i, F, new ne(M, M));
            break;
          }
        }
      }
      var ut = null;
      function ii(e) {
        ut = e;
      }
      function Oo(e, t, r, n, i) {
        var o = e.doc;
        e.display.shift = !1, n || (n = o.sel);
        var l = +new Date() - 200, a = i == "paste" || e.state.pasteIncoming > l, c = Hi(t), h = null;
        if (a && n.ranges.length > 1)
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
          C.empty() && (r && r > 0 ? F = D(F.line, F.ch - r) : e.state.overwrite && !a ? A = D(A.line, Math.min(B(o, A.line).text.length, A.ch + ie(c).length)) : a && ut && ut.lineWise && ut.text.join(`
`) == c.join(`
`) && (F = A = D(F.line, 0)));
          var M = {
            from: F,
            to: A,
            text: h ? h[k % h.length] : c,
            origin: i || (a ? "paste" : e.state.cutIncoming > l ? "cut" : "+input")
          };
          mn(e.doc, M), Le(e, "inputRead", e, M);
        }
        t && !a && ua(e, t), pn(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = b), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
      }
      function aa(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");
        if (r)
          return e.preventDefault(), !t.isReadOnly() && !t.options.disableInput && t.hasFocus() && Qe(t, function() {
            return Oo(t, r, 0, null, "paste");
          }), !0;
      }
      function ua(e, t) {
        if (!(!e.options.electricChars || !e.options.smartIndent))
          for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
            var i = r.ranges[n];
            if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
              var o = e.getModeAt(i.head), l = !1;
              if (o.electricChars) {
                for (var a = 0; a < o.electricChars.length; a++)
                  if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                    l = ur(e, i.head.line, "smart");
                    break;
                  }
              } else
                o.electricInput && o.electricInput.test(B(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = ur(e, i.head.line, "smart"));
              l && Le(e, "electricInput", e, i.head.line);
            }
          }
      }
      function fa(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
          var i = e.doc.sel.ranges[n].head.line, o = { anchor: D(i, 0), head: D(i + 1, 0) };
          r.push(o), t.push(e.getRange(o.anchor, o.head));
        }
        return { text: t, ranges: r };
      }
      function Io(e, t, r, n) {
        e.setAttribute("autocorrect", r ? "on" : "off"), e.setAttribute("autocapitalize", n ? "on" : "off"), e.setAttribute("spellcheck", !!t);
      }
      function ca() {
        var e = z("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), t = z("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return T ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), J && (e.style.border = "1px solid black"), t;
      }
      function Ac(e) {
        var t = e.optionHandlers, r = e.helpers = {};
        e.prototype = {
          constructor: e,
          focus: function() {
            Ne(this).focus(), this.display.input.focus();
          },
          setOption: function(n, i) {
            var o = this.options, l = o[n];
            o[n] == i && n != "mode" || (o[n] = i, t.hasOwnProperty(n) && Te(this, t[n])(this, i, l), ge(this, "optionChange", this, n));
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
          addOverlay: We(function(n, i) {
            var o = n.token ? n : e.getMode(this.options, n);
            if (o.startState)
              throw new Error("Overlays may not be stateful.");
            wu(
              this.state.overlays,
              {
                mode: o,
                modeSpec: n,
                opaque: i && i.opaque,
                priority: i && i.priority || 0
              },
              function(l) {
                return l.priority;
              }
            ), this.state.modeGen++, qe(this);
          }),
          removeOverlay: We(function(n) {
            for (var i = this.state.overlays, o = 0; o < i.length; ++o) {
              var l = i[o].modeSpec;
              if (l == n || typeof n == "string" && l.name == n) {
                i.splice(o, 1), this.state.modeGen++, qe(this);
                return;
              }
            }
          }),
          indentLine: We(function(n, i, o) {
            typeof i != "string" && typeof i != "number" && (i == null ? i = this.options.smartIndent ? "smart" : "prev" : i = i ? "add" : "subtract"), Pn(this.doc, n) && ur(this, n, i, o);
          }),
          indentSelection: We(function(n) {
            for (var i = this.doc.sel.ranges, o = -1, l = 0; l < i.length; l++) {
              var a = i[l];
              if (a.empty())
                a.head.line > o && (ur(this, a.head.line, n, !0), o = a.head.line, l == this.doc.sel.primIndex && pn(this));
              else {
                var c = a.from(), h = a.to(), y = Math.max(o, c.line);
                o = Math.min(this.lastLine(), h.line - (h.ch ? 0 : 1)) + 1;
                for (var b = y; b < o; ++b)
                  ur(this, b, n);
                var k = this.doc.sel.ranges;
                c.ch == 0 && i.length == k.length && k[l].from().ch > 0 && Lo(this.doc, l, new ne(c, k[l].to()), pt);
              }
            }
          }),
          getTokenAt: function(n, i) {
            return wl(this, n, i);
          },
          getLineTokens: function(n, i) {
            return wl(this, D(n), i, !0);
          },
          getTokenTypeAt: function(n) {
            n = Y(this.doc, n);
            var i = ml(this, B(this.doc, n.line)), o = 0, l = (i.length - 1) / 2, a = n.ch, c;
            if (a == 0)
              c = i[2];
            else
              for (; ; ) {
                var h = o + l >> 1;
                if ((h ? i[h * 2 - 1] : 0) >= a)
                  l = h;
                else if (i[h * 2 + 1] < a)
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
            var l = r[i], a = this.getModeAt(n);
            if (typeof a[i] == "string")
              l[a[i]] && o.push(l[a[i]]);
            else if (a[i])
              for (var c = 0; c < a[i].length; c++) {
                var h = l[a[i][c]];
                h && o.push(h);
              }
            else
              a.helperType && l[a.helperType] ? o.push(l[a.helperType]) : l[a.name] && o.push(l[a.name]);
            for (var y = 0; y < l._global.length; y++) {
              var b = l._global[y];
              b.pred(a, this) && ee(o, b.val) == -1 && o.push(b.val);
            }
            return o;
          },
          getStateAfter: function(n, i) {
            var o = this.doc;
            return n = gl(o, n == null ? o.first + o.size - 1 : n), Wn(this, n + 1, i).state;
          },
          cursorCoords: function(n, i) {
            var o, l = this.doc.sel.primary();
            return n == null ? o = l.head : typeof n == "object" ? o = Y(this.doc, n) : o = n ? l.from() : l.to(), st(this, o, i || "page");
          },
          charCoords: function(n, i) {
            return _r(this, Y(this.doc, n), i || "page");
          },
          coordsChar: function(n, i) {
            return n = Zl(this, n, i || "page"), ro(this, n.left, n.top);
          },
          lineAtHeight: function(n, i) {
            return n = Zl(this, { top: n, left: 0 }, i || "page").top, $t(this.doc, n + this.display.viewOffset);
          },
          heightAtLine: function(n, i, o) {
            var l = !1, a;
            if (typeof n == "number") {
              var c = this.doc.first + this.doc.size - 1;
              n < this.doc.first ? n = this.doc.first : n > c && (n = c, l = !0), a = B(this.doc, n);
            } else
              a = n;
            return Rr(this, a, { top: 0, left: 0 }, i || "page", o || l).top + (l ? this.doc.height - kt(a) : 0);
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
          addWidget: function(n, i, o, l, a) {
            var c = this.display;
            n = st(this, Y(this.doc, n));
            var h = n.bottom, y = n.left;
            if (i.style.position = "absolute", i.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(i), c.sizer.appendChild(i), l == "over")
              h = n.top;
            else if (l == "above" || l == "near") {
              var b = Math.max(c.wrapper.clientHeight, this.doc.height), k = Math.max(c.sizer.clientWidth, c.lineSpace.clientWidth);
              (l == "above" || n.bottom + i.offsetHeight > b) && n.top > i.offsetHeight ? h = n.top - i.offsetHeight : n.bottom + i.offsetHeight <= b && (h = n.bottom), y + i.offsetWidth > k && (y = k - i.offsetWidth);
            }
            i.style.top = h + "px", i.style.left = i.style.right = "", a == "right" ? (y = c.sizer.clientWidth - i.offsetWidth, i.style.right = "0px") : (a == "left" ? y = 0 : a == "middle" && (y = (c.sizer.clientWidth - i.offsetWidth) / 2), i.style.left = y + "px"), o && Lf(this, { left: y, top: h, right: y + i.offsetWidth, bottom: h + i.offsetHeight });
          },
          triggerOnKeyDown: We(Vs),
          triggerOnKeyPress: We(ta),
          triggerOnKeyUp: ea,
          triggerOnMouseDown: We(na),
          execCommand: function(n) {
            if (or.hasOwnProperty(n))
              return or[n].call(null, this);
          },
          triggerElectric: We(function(n) {
            ua(this, n);
          }),
          findPosH: function(n, i, o, l) {
            var a = 1;
            i < 0 && (a = -1, i = -i);
            for (var c = Y(this.doc, n), h = 0; h < i && (c = Ho(this.doc, c, a, o, l), !c.hitSide); ++h)
              ;
            return c;
          },
          moveH: We(function(n, i) {
            var o = this;
            this.extendSelectionsBy(function(l) {
              return o.display.shift || o.doc.extend || l.empty() ? Ho(o.doc, l.head, n, i, o.options.rtlMoveVisually) : n < 0 ? l.from() : l.to();
            }, En);
          }),
          deleteH: We(function(n, i) {
            var o = this.doc.sel, l = this.doc;
            o.somethingSelected() ? l.replaceSelection("", null, "+delete") : Sn(this, function(a) {
              var c = Ho(l, a.head, n, i, !1);
              return n < 0 ? { from: c, to: a.head } : { from: a.head, to: c };
            });
          }),
          findPosV: function(n, i, o, l) {
            var a = 1, c = l;
            i < 0 && (a = -1, i = -i);
            for (var h = Y(this.doc, n), y = 0; y < i; ++y) {
              var b = st(this, h, "div");
              if (c == null ? c = b.left : b.left = c, h = ha(this, b, a, o), h.hitSide)
                break;
            }
            return h;
          },
          moveV: We(function(n, i) {
            var o = this, l = this.doc, a = [], c = !this.display.shift && !l.extend && l.sel.somethingSelected();
            if (l.extendSelectionsBy(function(y) {
              if (c)
                return n < 0 ? y.from() : y.to();
              var b = st(o, y.head, "div");
              y.goalColumn != null && (b.left = y.goalColumn), a.push(b.left);
              var k = ha(o, b, n, i);
              return i == "page" && y == l.sel.primary() && po(o, _r(o, k, "div").top - b.top), k;
            }, En), a.length)
              for (var h = 0; h < l.sel.ranges.length; h++)
                l.sel.ranges[h].goalColumn = a[h];
          }),
          findWordAt: function(n) {
            var i = this.doc, o = B(i, n.line).text, l = n.ch, a = n.ch;
            if (o) {
              var c = this.getHelper(n, "wordChars");
              (n.sticky == "before" || a == o.length) && l ? --l : ++a;
              for (var h = o.charAt(l), y = Fr(h, c) ? function(b) {
                return Fr(b, c);
              } : /\s/.test(h) ? function(b) {
                return /\s/.test(b);
              } : function(b) {
                return !/\s/.test(b) && !Fr(b);
              }; l > 0 && y(o.charAt(l - 1)); )
                --l;
              for (; a < o.length && y(o.charAt(a)); )
                ++a;
            }
            return new ne(D(n.line, l), D(n.line, a));
          },
          toggleOverwrite: function(n) {
            n != null && n == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? W(this.display.cursorDiv, "CodeMirror-overwrite") : wt(this.display.cursorDiv, "CodeMirror-overwrite"), ge(this, "overwriteToggle", this, this.state.overwrite));
          },
          hasFocus: function() {
            return this.display.input.getField() == g(V(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: We(function(n, i) {
            qn(this, n, i);
          }),
          getScrollInfo: function() {
            var n = this.display.scroller;
            return {
              left: n.scrollLeft,
              top: n.scrollTop,
              height: n.scrollHeight - yt(this) - this.display.barHeight,
              width: n.scrollWidth - yt(this) - this.display.barWidth,
              clientHeight: Vi(this),
              clientWidth: Xt(this)
            };
          },
          scrollIntoView: We(function(n, i) {
            n == null ? (n = { from: this.doc.sel.primary().head, to: null }, i == null && (i = this.options.cursorScrollMargin)) : typeof n == "number" ? n = { from: D(n, 0), to: null } : n.from == null && (n = { from: n, to: null }), n.to || (n.to = n.from), n.margin = i || 0, n.from.line != null ? Tf(this, n) : os(this, n.from, n.to, n.margin);
          }),
          setSize: We(function(n, i) {
            var o = this, l = function(c) {
              return typeof c == "number" || /^\d+$/.test(String(c)) ? c + "px" : c;
            };
            n != null && (this.display.wrapper.style.width = l(n)), i != null && (this.display.wrapper.style.height = l(i)), this.options.lineWrapping && Xl(this);
            var a = this.display.viewFrom;
            this.doc.iter(a, this.display.viewTo, function(c) {
              if (c.widgets) {
                for (var h = 0; h < c.widgets.length; h++)
                  if (c.widgets[h].noHScroll) {
                    Ot(o, a, "widget");
                    break;
                  }
              }
              ++a;
            }), this.curOp.forceUpdate = !0, ge(this, "refresh", this);
          }),
          operation: function(n) {
            return Qe(this, n);
          },
          startOperation: function() {
            return Vt(this);
          },
          endOperation: function() {
            return en(this);
          },
          refresh: We(function() {
            var n = this.display.cachedTextHeight;
            qe(this), this.curOp.forceUpdate = !0, Un(this), qn(this, this.doc.scrollLeft, this.doc.scrollTop), yo(this.display), (n == null || Math.abs(n - cn(this.display)) > 0.5 || this.options.lineWrapping) && so(this), ge(this, "refresh", this);
          }),
          swapDoc: We(function(n) {
            var i = this.doc;
            return i.cm = null, this.state.selectingText && this.state.selectingText(), bs(this, n), Un(this), this.display.input.reset(), qn(this, n.scrollLeft, n.scrollTop), this.curOp.forceScroll = !0, Le(this, "swapDoc", this, i), i;
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
        }, e.registerGlobalHelper = function(n, i, o, l) {
          e.registerHelper(n, i, l), r[n]._global.push({ pred: o, val: l });
        };
      }
      function Ho(e, t, r, n, i) {
        var o = t, l = r, a = B(e, t.line), c = i && e.direction == "rtl" ? -r : r;
        function h() {
          var I = t.line + c;
          return I < e.first || I >= e.first + e.size ? !1 : (t = new D(I, t.ch, t.sticky), a = B(e, I));
        }
        function y(I) {
          var O;
          if (n == "codepoint") {
            var P = a.text.charCodeAt(t.ch + (r > 0 ? 0 : -1));
            if (isNaN(P))
              O = null;
            else {
              var _ = r > 0 ? P >= 55296 && P < 56320 : P >= 56320 && P < 57343;
              O = new D(t.line, Math.max(0, Math.min(a.text.length, t.ch + r * (_ ? 2 : 1))), -r);
            }
          } else
            i ? O = uc(e.cm, a, t, r) : O = Fo(a, t, r);
          if (O == null)
            if (!I && h())
              t = Ao(i, e.cm, a, t.line, c);
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
            var A = a.text.charAt(t.ch) || `
`, M = Fr(A, C) ? "w" : k && A == `
` ? "n" : !k || /\s/.test(A) ? null : "p";
            if (k && !F && !M && (M = "s"), b && b != M) {
              r < 0 && (r = 1, y(), t.sticky = "after");
              break;
            }
            if (M && (b = M), r > 0 && !y(!F))
              break;
          }
        var N = Jr(e, t, o, l, !0);
        return Ui(o, N) && (N.hitSide = !0), N;
      }
      function ha(e, t, r, n) {
        var i = e.doc, o = t.left, l;
        if (n == "page") {
          var a = Math.min(e.display.wrapper.clientHeight, Ne(e).innerHeight || i(e).documentElement.clientHeight), c = Math.max(a - 0.5 * cn(e.display), 3);
          l = (r > 0 ? t.bottom : t.top) + r * c;
        } else
          n == "line" && (l = r > 0 ? t.bottom + 3 : t.top - 3);
        for (var h; h = ro(e, o, l), !!h.outside; ) {
          if (r < 0 ? l <= 0 : l >= i.height) {
            h.hitSide = !0;
            break;
          }
          l += r * 5;
        }
        return h;
      }
      var le = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Ce(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };
      le.prototype.init = function(e) {
        var t = this, r = this, n = r.cm, i = r.div = e.lineDiv;
        i.contentEditable = !0, Io(i, n.options.spellcheck, n.options.autocorrect, n.options.autocapitalize);
        function o(a) {
          for (var c = a.target; c; c = c.parentNode) {
            if (c == i)
              return !0;
            if (/\bCodeMirror-(?:line)?widget\b/.test(c.className))
              break;
          }
          return !1;
        }
        G(i, "paste", function(a) {
          !o(a) || ke(n, a) || aa(a, n) || L <= 11 && setTimeout(Te(n, function() {
            return t.updateFromDOM();
          }), 20);
        }), G(i, "compositionstart", function(a) {
          t.composing = { data: a.data, done: !1 };
        }), G(i, "compositionupdate", function(a) {
          t.composing || (t.composing = { data: a.data, done: !1 });
        }), G(i, "compositionend", function(a) {
          t.composing && (a.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
        }), G(i, "touchstart", function() {
          return r.forceCompositionEnd();
        }), G(i, "input", function() {
          t.composing || t.readFromDOMSoon();
        });
        function l(a) {
          if (!(!o(a) || ke(n, a))) {
            if (n.somethingSelected())
              ii({ lineWise: !1, text: n.getSelections() }), a.type == "cut" && n.replaceSelection("", null, "cut");
            else if (n.options.lineWiseCopyCut) {
              var c = fa(n);
              ii({ lineWise: !0, text: c.text }), a.type == "cut" && n.operation(function() {
                n.setSelections(c.ranges, 0, pt), n.replaceSelection("", null, "cut");
              });
            } else
              return;
            if (a.clipboardData) {
              a.clipboardData.clearData();
              var h = ut.text.join(`
`);
              if (a.clipboardData.setData("Text", h), a.clipboardData.getData("Text") == h) {
                a.preventDefault();
                return;
              }
            }
            var y = ca(), b = y.firstChild;
            Io(b), n.display.lineSpace.insertBefore(y, n.display.lineSpace.firstChild), b.value = ut.text.join(`
`);
            var k = g(i.ownerDocument);
            K(b), setTimeout(function() {
              n.display.lineSpace.removeChild(y), k.focus(), k == i && r.showPrimarySelection();
            }, 50);
          }
        }
        G(i, "copy", l), G(i, "cut", l);
      }, le.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label");
      }, le.prototype.prepareSelection = function() {
        var e = ns(this.cm, !1);
        return e.focus = g(this.div.ownerDocument) == this.div, e;
      }, le.prototype.showSelection = function(e, t) {
        !e || !this.cm.display.view.length || ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, le.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, le.prototype.showPrimarySelection = function() {
        var e = this.getSelection(), t = this.cm, r = t.doc.sel.primary(), n = r.from(), i = r.to();
        if (t.display.viewTo == t.display.viewFrom || n.line >= t.display.viewTo || i.line < t.display.viewFrom) {
          e.removeAllRanges();
          return;
        }
        var o = oi(t, e.anchorNode, e.anchorOffset), l = oi(t, e.focusNode, e.focusOffset);
        if (!(o && !o.bad && l && !l.bad && X(Mr(o, l), n) == 0 && X(Dr(o, l), i) == 0)) {
          var a = t.display.view, c = n.line >= t.display.viewFrom && da(t, n) || { node: a[0].measure.map[2], offset: 0 }, h = i.line < t.display.viewTo && da(t, i);
          if (!h) {
            var y = a[a.length - 1].measure, b = y.maps ? y.maps[y.maps.length - 1] : y.map;
            h = { node: b[b.length - 1], offset: b[b.length - 2] - b[b.length - 3] };
          }
          if (!c || !h) {
            e.removeAllRanges();
            return;
          }
          var k = e.rangeCount && e.getRangeAt(0), C;
          try {
            C = dt(c.node, c.offset, h.offset, h.node);
          } catch {
          }
          C && (!p && t.state.focused ? (e.collapse(c.node, c.offset), C.collapsed || (e.removeAllRanges(), e.addRange(C))) : (e.removeAllRanges(), e.addRange(C)), k && e.anchorNode == null ? e.addRange(k) : p && this.startGracePeriod()), this.rememberSelection();
        }
      }, le.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, le.prototype.showMultipleSelections = function(e) {
        Ue(this.cm.display.cursorDiv, e.cursors), Ue(this.cm.display.selectionDiv, e.selection);
      }, le.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, le.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount)
          return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return w(this.div, t);
      }, le.prototype.focus = function() {
        this.cm.options.readOnly != "nocursor" && ((!this.selectionInEditor() || g(this.div.ownerDocument) != this.div) && this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, le.prototype.blur = function() {
        this.div.blur();
      }, le.prototype.getField = function() {
        return this.div;
      }, le.prototype.supportsTouch = function() {
        return !0;
      }, le.prototype.receivedFocus = function() {
        var e = this, t = this;
        this.selectionInEditor() ? setTimeout(function() {
          return e.pollSelection();
        }, 20) : Qe(this.cm, function() {
          return t.cm.curOp.selectionChanged = !0;
        });
        function r() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, r));
        }
        this.polling.set(this.cm.options.pollInterval, r);
      }, le.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, le.prototype.pollSelection = function() {
        if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
          var e = this.getSelection(), t = this.cm;
          if (te && H && this.cm.display.gutterSpecs.length && Dc(e.anchorNode)) {
            this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var r = oi(t, e.anchorNode, e.anchorOffset), n = oi(t, e.focusNode, e.focusOffset);
            r && n && Qe(t, function() {
              Oe(t.doc, Ht(r, n), pt), (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, le.prototype.pollContent = function() {
        this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e = this.cm, t = e.display, r = e.doc.sel.primary(), n = r.from(), i = r.to();
        if (n.ch == 0 && n.line > e.firstLine() && (n = D(n.line - 1, B(e.doc, n.line - 1).length)), i.ch == B(e.doc, i.line).text.length && i.line < e.lastLine() && (i = D(i.line + 1, 0)), n.line < t.viewFrom || i.line > t.viewTo - 1)
          return !1;
        var o, l, a;
        n.line == t.viewFrom || (o = Zt(e, n.line)) == 0 ? (l = oe(t.view[0].line), a = t.view[0].node) : (l = oe(t.view[o].line), a = t.view[o - 1].node.nextSibling);
        var c = Zt(e, i.line), h, y;
        if (c == t.view.length - 1 ? (h = t.viewTo - 1, y = t.lineDiv.lastChild) : (h = oe(t.view[c + 1].line) - 1, y = t.view[c + 1].node.previousSibling), !a)
          return !1;
        for (var b = e.doc.splitLines(Mc(e, a, y, l, h)), k = Kt(e.doc, D(l, 0), D(h, B(e.doc, h).text.length)); b.length > 1 && k.length > 1; )
          if (ie(b) == ie(k))
            b.pop(), k.pop(), h--;
          else if (b[0] == k[0])
            b.shift(), k.shift(), l++;
          else
            break;
        for (var C = 0, F = 0, A = b[0], M = k[0], N = Math.min(A.length, M.length); C < N && A.charCodeAt(C) == M.charCodeAt(C); )
          ++C;
        for (var I = ie(b), O = ie(k), P = Math.min(
          I.length - (b.length == 1 ? C : 0),
          O.length - (k.length == 1 ? C : 0)
        ); F < P && I.charCodeAt(I.length - F - 1) == O.charCodeAt(O.length - F - 1); )
          ++F;
        if (b.length == 1 && k.length == 1 && l == n.line)
          for (; C && C > n.ch && I.charCodeAt(I.length - F - 1) == O.charCodeAt(O.length - F - 1); )
            C--, F++;
        b[b.length - 1] = I.slice(0, I.length - F).replace(/^\u200b+/, ""), b[0] = b[0].slice(C).replace(/\u200b+$/, "");
        var _ = D(l, C), R = D(h, k.length ? ie(k).length - F : 0);
        if (b.length > 1 || b[0] || X(_, R))
          return bn(e.doc, b, _, R, "+input"), !0;
      }, le.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      }, le.prototype.reset = function() {
        this.forceCompositionEnd();
      }, le.prototype.forceCompositionEnd = function() {
        !this.composing || (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, le.prototype.readFromDOMSoon = function() {
        var e = this;
        this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
          if (e.readDOMTimeout = null, e.composing)
            if (e.composing.done)
              e.composing = null;
            else
              return;
          e.updateFromDOM();
        }, 80));
      }, le.prototype.updateFromDOM = function() {
        var e = this;
        (this.cm.isReadOnly() || !this.pollContent()) && Qe(this.cm, function() {
          return qe(e.cm);
        });
      }, le.prototype.setUneditable = function(e) {
        e.contentEditable = "false";
      }, le.prototype.onKeyPress = function(e) {
        e.charCode == 0 || this.composing || (e.preventDefault(), this.cm.isReadOnly() || Te(this.cm, Oo)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0));
      }, le.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String(e != "nocursor");
      }, le.prototype.onContextMenu = function() {
      }, le.prototype.resetPosition = function() {
      }, le.prototype.needsContentAttribute = !0;
      function da(e, t) {
        var r = eo(e, t.line);
        if (!r || r.hidden)
          return null;
        var n = B(e.doc, t.line), i = Ul(r, n, t.line), o = St(n, e.doc.direction), l = "left";
        if (o) {
          var a = In(o, t.ch);
          l = a % 2 ? "right" : "left";
        }
        var c = Kl(i.map, t.ch, l);
        return c.offset = c.collapse == "right" ? c.end : c.start, c;
      }
      function Dc(e) {
        for (var t = e; t; t = t.parentNode)
          if (/CodeMirror-gutter-wrapper/.test(t.className))
            return !0;
        return !1;
      }
      function kn(e, t) {
        return t && (e.bad = !0), e;
      }
      function Mc(e, t, r, n, i) {
        var o = "", l = !1, a = e.doc.lineSeparator(), c = !1;
        function h(C) {
          return function(F) {
            return F.id == C;
          };
        }
        function y() {
          l && (o += a, c && (o += a), l = c = !1);
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
              N.length && (M = N[0].find(0)) && b(Kt(e.doc, M.from, M.to).join(a));
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
            /^(pre|p)$/i.test(C.nodeName) && (c = !0), I && (l = !0);
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
            return Ec(o, t, r);
        }
      }
      function Ec(e, t, r) {
        var n = e.text.firstChild, i = !1;
        if (!t || !w(n, t))
          return kn(D(oe(e.line), 0), !0);
        if (t == n && (i = !0, t = n.childNodes[r], r = 0, !t)) {
          var o = e.rest ? ie(e.rest) : e.line;
          return kn(D(oe(o), o.text.length), i);
        }
        var l = t.nodeType == 3 ? t : null, a = t;
        for (!l && t.childNodes.length == 1 && t.firstChild.nodeType == 3 && (l = t.firstChild, r && (r = l.nodeValue.length)); a.parentNode != n; )
          a = a.parentNode;
        var c = e.measure, h = c.maps;
        function y(M, N, I) {
          for (var O = -1; O < (h ? h.length : 0); O++)
            for (var P = O < 0 ? c.map : h[O], _ = 0; _ < P.length; _ += 3) {
              var R = P[_ + 2];
              if (R == M || R == N) {
                var Z = oe(O < 0 ? e.line : e.rest[O]), ae = P[_] + I;
                return (I < 0 || R != M) && (ae = P[_ + (I ? 1 : 0)]), D(Z, ae);
              }
            }
        }
        var b = y(l, a, r);
        if (b)
          return kn(b, i);
        for (var k = a.nextSibling, C = l ? l.nodeValue.length - r : 0; k; k = k.nextSibling) {
          if (b = y(k, k.firstChild, 0), b)
            return kn(D(b.line, b.ch - C), i);
          C += k.textContent.length;
        }
        for (var F = a.previousSibling, A = r; F; F = F.previousSibling) {
          if (b = y(F, F.firstChild, -1), b)
            return kn(D(b.line, b.ch + A), i);
          A += F.textContent.length;
        }
      }
      var de = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Ce(), this.hasSelection = !1, this.composing = null, this.resetting = !1;
      };
      de.prototype.init = function(e) {
        var t = this, r = this, n = this.cm;
        this.createField(e);
        var i = this.textarea;
        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), J && (i.style.width = "0px"), G(i, "input", function() {
          S && L >= 9 && t.hasSelection && (t.hasSelection = null), r.poll();
        }), G(i, "paste", function(l) {
          ke(n, l) || aa(l, n) || (n.state.pasteIncoming = +new Date(), r.fastPoll());
        });
        function o(l) {
          if (!ke(n, l)) {
            if (n.somethingSelected())
              ii({ lineWise: !1, text: n.getSelections() });
            else if (n.options.lineWiseCopyCut) {
              var a = fa(n);
              ii({ lineWise: !0, text: a.text }), l.type == "cut" ? n.setSelections(a.ranges, null, pt) : (r.prevInput = "", i.value = a.text.join(`
`), K(i));
            } else
              return;
            l.type == "cut" && (n.state.cutIncoming = +new Date());
          }
        }
        G(i, "cut", o), G(i, "copy", o), G(e.scroller, "paste", function(l) {
          if (!(Lt(e, l) || ke(n, l))) {
            if (!i.dispatchEvent) {
              n.state.pasteIncoming = +new Date(), r.focus();
              return;
            }
            var a = new Event("paste");
            a.clipboardData = l.clipboardData, i.dispatchEvent(a);
          }
        }), G(e.lineSpace, "selectstart", function(l) {
          Lt(e, l) || Ge(l);
        }), G(i, "compositionstart", function() {
          var l = n.getCursor("from");
          r.composing && r.composing.range.clear(), r.composing = {
            start: l,
            range: n.markText(l, n.getCursor("to"), { className: "CodeMirror-composing" })
          };
        }), G(i, "compositionend", function() {
          r.composing && (r.poll(), r.composing.range.clear(), r.composing = null);
        });
      }, de.prototype.createField = function(e) {
        this.wrapper = ca(), this.textarea = this.wrapper.firstChild;
        var t = this.cm.options;
        Io(this.textarea, t.spellcheck, t.autocorrect, t.autocapitalize);
      }, de.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label");
      }, de.prototype.prepareSelection = function() {
        var e = this.cm, t = e.display, r = e.doc, n = ns(e);
        if (e.options.moveInputWithCursor) {
          var i = st(e, r.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), l = t.lineDiv.getBoundingClientRect();
          n.teTop = Math.max(0, Math.min(
            t.wrapper.clientHeight - 10,
            i.top + l.top - o.top
          )), n.teLeft = Math.max(0, Math.min(
            t.wrapper.clientWidth - 10,
            i.left + l.left - o.left
          ));
        }
        return n;
      }, de.prototype.showSelection = function(e) {
        var t = this.cm, r = t.display;
        Ue(r.cursorDiv, e.cursors), Ue(r.selectionDiv, e.selection), e.teTop != null && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, de.prototype.reset = function(e) {
        if (!(this.contextMenuPending || this.composing && e)) {
          var t = this.cm;
          if (this.resetting = !0, t.somethingSelected()) {
            this.prevInput = "";
            var r = t.getSelection();
            this.textarea.value = r, t.state.focused && K(this.textarea), S && L >= 9 && (this.hasSelection = r);
          } else
            e || (this.prevInput = this.textarea.value = "", S && L >= 9 && (this.hasSelection = null));
          this.resetting = !1;
        }
      }, de.prototype.getField = function() {
        return this.textarea;
      }, de.prototype.supportsTouch = function() {
        return !1;
      }, de.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!ce || g(this.textarea.ownerDocument) != this.textarea))
          try {
            this.textarea.focus();
          } catch {
          }
      }, de.prototype.blur = function() {
        this.textarea.blur();
      }, de.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, de.prototype.receivedFocus = function() {
        this.slowPoll();
      }, de.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, de.prototype.fastPoll = function() {
        var e = !1, t = this;
        t.pollingFast = !0;
        function r() {
          var n = t.poll();
          !n && !e ? (e = !0, t.polling.set(60, r)) : (t.pollingFast = !1, t.slowPoll());
        }
        t.polling.set(20, r);
      }, de.prototype.poll = function() {
        var e = this, t = this.cm, r = this.textarea, n = this.prevInput;
        if (this.contextMenuPending || this.resetting || !t.state.focused || Du(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq)
          return !1;
        var i = r.value;
        if (i == n && !t.somethingSelected())
          return !1;
        if (S && L >= 9 && this.hasSelection === i || se && /[\uf700-\uf7ff]/.test(i))
          return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
          var o = i.charCodeAt(0);
          if (o == 8203 && !n && (n = "\u200B"), o == 8666)
            return this.reset(), this.cm.execCommand("undo");
        }
        for (var l = 0, a = Math.min(n.length, i.length); l < a && n.charCodeAt(l) == i.charCodeAt(l); )
          ++l;
        return Qe(t, function() {
          Oo(
            t,
            i.slice(l),
            n.length - l,
            null,
            e.composing ? "*compose" : null
          ), i.length > 1e3 || i.indexOf(`
`) > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(
            e.composing.start,
            t.getCursor("to"),
            { className: "CodeMirror-composing" }
          ));
        }), !0;
      }, de.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, de.prototype.onKeyPress = function() {
        S && L >= 9 && (this.hasSelection = null), this.fastPoll();
      }, de.prototype.onContextMenu = function(e) {
        var t = this, r = t.cm, n = r.display, i = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var o = jt(r, e), l = n.scroller.scrollTop;
        if (!o || $)
          return;
        var a = r.options.resetSelectionOnContextMenu;
        a && r.doc.sel.contains(o) == -1 && Te(r, Oe)(r.doc, Ht(o), pt);
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
          if (t.contextMenuPending == C && (t.contextMenuPending = !1, t.wrapper.style.cssText = h, i.style.cssText = c, S && L < 9 && n.scrollbars.setScrollTop(n.scroller.scrollTop = l), i.selectionStart != null)) {
            (!S || S && L < 9) && k();
            var A = 0, M = function() {
              n.selForContextMenu == r.doc.sel && i.selectionStart == 0 && i.selectionEnd > 0 && t.prevInput == "\u200B" ? Te(r, Ns)(r) : A++ < 10 ? n.detectingSelectAll = setTimeout(M, 500) : (n.selForContextMenu = null, n.input.reset());
            };
            n.detectingSelectAll = setTimeout(M, 200);
          }
        }
        if (S && L >= 9 && k(), je) {
          Hn(e);
          var F = function() {
            et(window, "mouseup", F), setTimeout(C, 20);
          };
          G(window, "mouseup", F);
        } else
          setTimeout(C, 50);
      }, de.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = e == "nocursor", this.textarea.readOnly = !!e;
      }, de.prototype.setUneditable = function() {
      }, de.prototype.needsContentAttribute = !1;
      function Nc(e, t) {
        if (t = t ? Pe(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), t.autofocus == null) {
          var r = g(e.ownerDocument);
          t.autofocus = r == e || e.getAttribute("autofocus") != null && r == document.body;
        }
        function n() {
          e.value = a.getValue();
        }
        var i;
        if (e.form && (G(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
          var o = e.form;
          i = o.submit;
          try {
            var l = o.submit = function() {
              n(), o.submit = i, o.submit(), o.submit = l;
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
        var a = ue(
          function(c) {
            return e.parentNode.insertBefore(c, e.nextSibling);
          },
          t
        );
        return a;
      }
      function Oc(e) {
        e.off = et, e.on = G, e.wheelEventPixels = _f, e.Doc = Ke, e.splitLines = Hi, e.countColumn = pe, e.findColumn = Ti, e.isWordChar = Ai, e.Pass = kr, e.signal = ge, e.Line = an, e.changeEnd = Pt, e.scrollbarModel = as, e.Pos = D, e.cmpPos = X, e.modes = Wi, e.mimeModes = ln, e.resolveMode = Ar, e.getMode = Bi, e.modeExtensions = sn, e.extendMode = Iu, e.copyState = qt, e.startState = pl, e.innerMode = Ri, e.commands = or, e.keyMap = Ft, e.keyName = Ys, e.isModifierKey = $s, e.lookupKey = wn, e.normalizeKeyMap = ac, e.StringStream = ve, e.SharedTextMarker = nr, e.TextMarker = Bt, e.LineWidget = tr, e.e_preventDefault = Ge, e.e_stopPropagation = hl, e.e_stop = Hn, e.addClass = W, e.contains = w, e.rmClass = wt, e.keyNames = Rt;
      }
      kc(ue), Ac(ue);
      var Ic = "iter insert remove copy getEditor constructor".split(" ");
      for (var li in Ke.prototype)
        Ke.prototype.hasOwnProperty(li) && ee(Ic, li) < 0 && (ue.prototype[li] = function(e) {
          return function() {
            return e.apply(this.doc, arguments);
          };
        }(Ke.prototype[li]));
      return on(Ke), ue.inputStyles = { textarea: de, contenteditable: le }, ue.defineMode = function(e) {
        !ue.defaults.mode && e != "null" && (ue.defaults.mode = e), Nu.apply(this, arguments);
      }, ue.defineMIME = Ou, ue.defineMode("null", function() {
        return { token: function(e) {
          return e.skipToEnd();
        } };
      }), ue.defineMIME("text/plain", "null"), ue.defineExtension = function(e, t) {
        ue.prototype[e] = t;
      }, ue.defineDocExtension = function(e, t) {
        Ke.prototype[e] = t;
      }, ue.fromTextArea = Nc, Oc(ue), ue.version = "5.65.12", ue;
    });
  }(Ro)), Ro.exports;
}
var nt = ja();
(function(s, u) {
  (function(f) {
    f(ja());
  })(function(f) {
    function d(m, x, S) {
      this.orientation = x, this.scroll = S, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = m + "-" + x, this.inner = this.node.appendChild(document.createElement("div"));
      var L = this;
      f.on(this.inner, "mousedown", function(E) {
        if (E.which != 1)
          return;
        f.e_preventDefault(E);
        var H = L.orientation == "horizontal" ? "pageX" : "pageY", j = E[H], $ = L.pos;
        function Q() {
          f.off(document, "mousemove", be), f.off(document, "mouseup", Q);
        }
        function be(xe) {
          if (xe.which != 1)
            return Q();
          L.moveTo($ + (xe[H] - j) * (L.total / L.size));
        }
        f.on(document, "mousemove", be), f.on(document, "mouseup", Q);
      }), f.on(this.node, "click", function(E) {
        f.e_preventDefault(E);
        var H = L.inner.getBoundingClientRect(), j;
        L.orientation == "horizontal" ? j = E.clientX < H.left ? -1 : E.clientX > H.right ? 1 : 0 : j = E.clientY < H.top ? -1 : E.clientY > H.bottom ? 1 : 0, L.moveTo(L.pos + j * L.screen);
      });
      function T(E) {
        var H = f.wheelEventPixels(E)[L.orientation == "horizontal" ? "x" : "y"], j = L.pos;
        L.moveTo(L.pos + H), L.pos != j && f.e_preventDefault(E);
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
nt.defineMode("markdown", (s, u) => {
  const f = nt.getMode(s, "text/html"), d = f.name === "null";
  function p(w) {
    const g = nt.getMode(s, w);
    return g.name === "null" ? null : g;
  }
  u.highlightFormatting === void 0 && (u.highlightFormatting = !1), u.maxBlockquoteDepth === void 0 && (u.maxBlockquoteDepth = 0), u.taskLists === void 0 && (u.taskLists = !1), u.strikethrough === void 0 && (u.strikethrough = !1), u.emoji === void 0 && (u.emoji = !1), u.fencedCodeBlockHighlighting === void 0 && (u.fencedCodeBlockHighlighting = !0), u.fencedCodeBlockDefaultMode === void 0 && (u.fencedCodeBlockDefaultMode = "text/plain"), u.xml === void 0 && (u.xml = !0), u.tokenTypeOverrides === void 0 && (u.tokenTypeOverrides = {});
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
    Object.prototype.hasOwnProperty.call(v, w) && u.tokenTypeOverrides[w] && (v[w] = u.tokenTypeOverrides[w]);
  const m = /^([*_-])(?:\s*\1){2,}\s*$/, x = /^(?:[*+-]|^\d+([).]))\s+/, S = /^\[(x| )](?=\s)/i, L = u.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, T = /^ {0,3}(?:=+|-{2,})\s*$/, E = /^[^ !"#'(*:<>[\\\]_`~]+/, H = /^(~~~+|```+)[\t ]*([\w#+/-]*)[^\n`]*$/, j = /^\s*\[[^\]]+?]:.*$/, $ = /[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65-]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/, Q = "    ";
  function be(w, g, W) {
    return g.f = g.inline = W, W(w, g);
  }
  function xe(w, g, W) {
    return g.f = g.block = W, W(w, g);
  }
  function J(w) {
    return !w || !/\S/.test(w.string);
  }
  function te(w) {
    if (w.linkTitle = !1, w.linkHref = !1, w.linkText = !1, w.em = !1, w.strong = !1, w.strikethrough = !1, w.quote = 0, w.indentedCode = !1, w.f === se) {
      let g = d;
      if (!g) {
        const W = nt.innerMode(f, w.htmlState);
        g = W.mode.name === "xml" && W.state.tagStart === null && !W.state.context && W.state.tokenize.isInText;
      }
      g && (w.f = Ee, w.block = ce, w.htmlState = null);
    }
    return w.trailingSpace = 0, w.trailingSpaceNewLine = !1, w.prevLine = w.thisLine, w.thisLine = { stream: null }, null;
  }
  function ce(w, g) {
    const W = w.column() === g.indentation, U = J(g.prevLine.stream), K = g.indentedCode, V = g.prevLine.hr, Ne = g.list !== !1, Ze = (g.listStack[g.listStack.length - 1] || 0) + 3;
    g.indentedCode = !1;
    const Pe = g.indentation;
    if (g.indentationDiff === null && (g.indentationDiff = g.indentation, Ne)) {
      for (g.list = null; Pe < g.listStack[g.listStack.length - 1]; )
        g.listStack.pop(), g.listStack.length > 0 ? g.indentation = g.listStack[g.listStack.length - 1] : g.list = !1;
      g.list !== !1 && (g.indentationDiff = Pe - g.listStack[g.listStack.length - 1]);
    }
    const pe = !U && !V && !g.prevLine.header && (!Ne || !K) && !g.prevLine.fencedCodeEnd, Ce = (g.list === !1 || V || U) && g.indentation <= Ze && w.match(m);
    let ee = null;
    if (g.indentationDiff >= 4 && (K || g.prevLine.fencedCodeEnd || g.prevLine.header || U))
      return w.skipToEnd(), g.indentedCode = !0, v.code;
    if (w.eatSpace())
      return null;
    if (W && g.indentation <= Ze && (ee = w.match(L)) && ee[1].length <= 6)
      return g.quote = 0, g.header = ee[1].length, g.thisLine.header = !0, u.highlightFormatting && (g.formatting = "header"), g.f = g.inline, q(g);
    if (g.indentation <= Ze && w.eat(">"))
      return (["i", "!", "@", "y", "x"].includes(w.string[1]) && w.string[2] === " " || w.string[1] === " ") && (g.quote = W ? 1 : g.quote + 1), u.highlightFormatting && (g.formatting = "quote"), w.eatSpace(), q(g);
    if (!Ce && !g.setext && W && g.indentation <= Ze && (ee = w.match(x))) {
      const Cr = ee[1] ? "ol" : "ul";
      return g.indentation = Pe + w.current().length, g.list = !0, g.quote = 0, g.listStack.push(g.indentation), g.em = !1, g.strong = !1, g.code = !1, g.strikethrough = !1, u.taskLists && w.match(S, !1) && (g.taskList = !0), g.f = g.inline, u.highlightFormatting && (g.formatting = ["list", `list-${Cr}`]), q(g);
    } else {
      if (W && g.indentation <= Ze && (ee = w.match(H, !0)))
        return g.quote = 0, g.fencedEndRE = new RegExp(`${ee[1]}+ *$`), g.localMode = u.fencedCodeBlockHighlighting && p(ee[2] || u.fencedCodeBlockDefaultMode), g.localMode && (g.localState = nt.startState(g.localMode)), g.f = g.block = re, u.highlightFormatting && (g.formatting = "code-block"), g.code = -1, q(g);
      if (g.setext || (!pe || !Ne) && !g.quote && g.list === !1 && !g.code && !Ce && !j.test(w.string) && (ee = w.lookAhead(1)) && (ee = ee.match(T)))
        return !g.setext && ee ? (g.header = ee[0].charAt(0) === "=" ? 1 : 2, g.setext = g.header) : (g.header = g.setext, g.setext = 0, w.skipToEnd(), u.highlightFormatting && (g.formatting = "header")), g.thisLine.header = !0, g.f = g.inline, q(g);
      if (Ce)
        return w.skipToEnd(), g.hr = !0, g.thisLine.hr = !0, v.hr;
      if (w.peek() === "[")
        return be(w, g, Ue);
    }
    return be(w, g, g.inline);
  }
  function se(w, g) {
    const W = f.token(w, g.htmlState);
    if (!d) {
      const U = nt.innerMode(f, g.htmlState);
      (U.mode.name === "xml" && U.state.tagStart === null && !U.state.context && U.state.tokenize.isInText || g.md_inside && w.current().includes(">")) && (g.f = Ee, g.block = ce, g.htmlState = null);
    }
    return W;
  }
  function re(w, g) {
    const W = g.listStack[g.listStack.length - 1] || 0, U = g.indentation < W, K = W + 3;
    if (g.fencedEndRE && g.indentation <= K && (U || w.match(g.fencedEndRE))) {
      u.highlightFormatting && (g.formatting = "code-block");
      let V;
      return U || (V = q(g)), g.localMode = g.localState = null, g.block = ce, g.f = Ee, g.fencedEndRE = null, g.code = 0, g.thisLine.fencedCodeEnd = !0, U ? xe(w, g, g.block) : V;
    } else
      return g.localMode ? g.localMode.token(w, g.localState) : (w.skipToEnd(), v.code);
  }
  function q(w) {
    const g = [];
    if (w.formatting) {
      g.push(v.formatting), typeof w.formatting == "string" && (w.formatting = [w.formatting]);
      for (let W = 0; W < w.formatting.length; W++)
        g.push(`${v.formatting}-${w.formatting[W]}`), w.formatting[W] === "header" && g.push(
          `${v.formatting}-${w.formatting[W]}-${w.header}`
        ), w.formatting[W] === "quote" && (!u.maxBlockquoteDepth || u.maxBlockquoteDepth >= w.quote ? g.push(
          `${v.formatting}-${w.formatting[W]}-${w.quote}`
        ) : g.push("error"));
    }
    if (w.taskOpen)
      return g.push("meta"), g.length > 0 ? g.join(" ") : null;
    if (w.taskClosed)
      return g.push("property"), g.length > 0 ? g.join(" ") : null;
    if (w.linkHref ? g.push(v.linkHref, "url") : (w.strong && g.push(v.strong), w.em && g.push(v.em), w.strikethrough && g.push(v.strikethrough), w.emoji && g.push(v.emoji), w.linkText && g.push(v.linkText), w.code && g.push(v.code), w.image && g.push(v.image), w.imageAltText && g.push(v.imageAltText, "link"), w.imageMarker && g.push(v.imageMarker)), w.header && g.push(v.header, `${v.header}-${w.header}`), w.quote && (g.push(v.quote), !u.maxBlockquoteDepth || u.maxBlockquoteDepth >= w.quote ? g.push(`${v.quote}-${w.quote}`) : g.push(`${v.quote}-${u.maxBlockquoteDepth}`)), w.list !== !1) {
      const W = (w.listStack.length - 1) % 3;
      W ? W === 1 ? g.push(v.list2) : g.push(v.list3) : g.push(v.list1);
    }
    return w.trailingSpaceNewLine ? g.push("trailing-space-new-line") : w.trailingSpace && g.push(`trailing-space-${w.trailingSpace % 2 ? "a" : "b"}`), g.length > 0 ? g.join(" ") : null;
  }
  function ze(w, g) {
    if (w.match(E, !0))
      return q(g);
  }
  function Ee(w, g) {
    const W = g.text(w, g);
    if (typeof W < "u")
      return W;
    if (g.list)
      return g.list = null, q(g);
    if (g.taskList)
      return w.match(S, !0)[1] === " " ? g.taskOpen = !0 : g.taskClosed = !0, u.highlightFormatting && (g.formatting = "task"), g.taskList = !1, q(g);
    if (g.taskOpen = !1, g.taskClosed = !1, g.header && w.match(/^#+$/, !0))
      return u.highlightFormatting && (g.formatting = "header"), q(g);
    const U = w.next();
    if (g.linkTitle) {
      g.linkTitle = !1;
      let K = U;
      U === "(" && (K = ")"), K = `${K}`.replace(/([()*+.?[\\\]^{|}-])/g, "\\$1");
      const V = `^\\s*(?:[^${K}\\\\]+|\\\\\\\\|\\\\.)${K}`;
      if (w.match(new RegExp(V), !0))
        return v.linkHref;
    }
    if (U === "`") {
      const K = g.formatting;
      u.highlightFormatting && (g.formatting = "code"), w.eatWhile("`");
      const V = w.current().length;
      if (g.code === 0 && (!g.quote || V === 1))
        return g.code = V, q(g);
      if (V === g.code) {
        const Ne = q(g);
        return g.code = 0, Ne;
      } else
        return g.formatting = K, q(g);
    } else if (g.code)
      return q(g);
    if (U === "\\" && (w.next(), u.highlightFormatting)) {
      const K = q(g), V = `${v.formatting}-escape`;
      return K ? `${K} ${V}` : V;
    }
    if (U === "!" && w.match(/\[[^\]]*] ?[([]/, !1))
      return g.imageMarker = !0, g.image = !0, u.highlightFormatting && (g.formatting = "image"), q(g);
    if (U === "[" && g.imageMarker && w.match(/[^\]]*](\(.*?\)| ?\[.*?])/, !1))
      return g.imageMarker = !1, g.imageAltText = !0, u.highlightFormatting && (g.formatting = "image"), q(g);
    if (U === "]" && g.imageAltText) {
      u.highlightFormatting && (g.formatting = "image");
      const K = q(g);
      return g.imageAltText = !1, g.image = !1, g.inline = g.f = xt, K;
    }
    if (U === "[" && !g.image)
      return g.linkText && w.match(/^.*?]/) || (g.linkText = !0, u.highlightFormatting && (g.formatting = "link")), q(g);
    if (U === "]" && g.linkText) {
      u.highlightFormatting && (g.formatting = "link");
      const K = q(g);
      return g.linkText = !1, g.inline = g.f = w.match(/\(.*?\)| ?\[.*?]/, !1) ? xt : Ee, K;
    }
    if (U === "<" && w.match(/^(https?|ftps?):\/\/(?:[^>\\]|\\.)+>/, !1)) {
      g.f = g.inline = je, u.highlightFormatting && (g.formatting = "link");
      let K = q(g);
      return K ? K += " " : K = "", K + v.linkInline;
    }
    if (U === "<" && w.match(/^[^ >\\]+@(?:[^>\\]|\\.)+>/, !1)) {
      g.f = g.inline = je, u.highlightFormatting && (g.formatting = "link");
      let K = q(g);
      return K ? K += " " : K = "", K + v.linkEmail;
    }
    if (u.xml && U === "<" && w.match(
      /^(!--|\?|!\[cdata\[|[a-z][\da-z-]*(?:\s+[.:_a-z-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
      !1
    )) {
      const K = w.string.indexOf(">", w.pos);
      if (K !== -1) {
        const V = w.string.slice(w.start, K);
        /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(V) && (g.md_inside = !0);
      }
      return w.backUp(1), g.htmlState = nt.startState(f), xe(w, g, se);
    }
    if (u.xml && U === "<" && w.match(/^\/\w*?>/))
      return g.md_inside = !1, "tag";
    if (U === "*" || U === "_") {
      let K = 1;
      const V = w.pos === 1 ? " " : w.string.charAt(w.pos - 2);
      for (; K < 3 && w.eat(U); )
        K++;
      const Ne = w.peek() || " ", Ze = !/\s/.test(Ne) && (!$.test(Ne) || /\s/.test(V) || $.test(V)), Pe = !/\s/.test(V) && (!$.test(V) || /\s/.test(Ne) || $.test(Ne));
      let pe = null, Ce = null;
      if (K % 2 && (!g.em && Ze && (U === "*" || !Pe || $.test(V)) ? pe = !0 : g.em === U && Pe && (U === "*" || !Ze || $.test(Ne)) && (pe = !1)), K > 1 && (!g.strong && Ze && (U === "*" || !Pe || $.test(V)) ? Ce = !0 : g.strong === U && Pe && (U === "*" || !Ze || $.test(Ne)) && (Ce = !1)), Ce != null || pe != null) {
        u.highlightFormatting && (g.formatting = pe == null ? "strong" : Ce == null ? "em" : "strong em"), pe === !0 && (g.em = U), Ce === !0 && (g.strong = U);
        const ee = q(g);
        return pe === !1 && (g.em = !1), Ce === !1 && (g.strong = !1), ee;
      }
    } else if (U === " " && (w.eat("*") || w.eat("_"))) {
      if (w.peek() === " ")
        return q(g);
      w.backUp(1);
    }
    if (u.strikethrough) {
      if (U === "~" && w.eatWhile(U)) {
        if (g.strikethrough) {
          u.highlightFormatting && (g.formatting = "strikethrough");
          const K = q(g);
          return g.strikethrough = !1, K;
        } else if (w.match(/^\S/, !1))
          return g.strikethrough = !0, u.highlightFormatting && (g.formatting = "strikethrough"), q(g);
      } else if (U === " " && w.match("~~", !0)) {
        if (w.peek() === " ")
          return q(g);
        w.backUp(2);
      }
    }
    if (u.emoji && U === ":" && w.match(/^(?:[\d+_a-z][\d+_a-z-]*|-[\d+_a-z][\d+_a-z-]*):/)) {
      g.emoji = !0, u.highlightFormatting && (g.formatting = "emoji");
      const K = q(g);
      return g.emoji = !1, K;
    }
    return U === " " && (w.match(/^ +$/, !1) ? g.trailingSpace++ : g.trailingSpace && (g.trailingSpaceNewLine = !0)), q(g);
  }
  function je(w, g) {
    if (w.next() === ">") {
      g.f = g.inline = Ee, u.highlightFormatting && (g.formatting = "link");
      let U = q(g);
      return U ? U += " " : U = "", U + v.linkInline;
    }
    return w.match(/^[^>]+/, !0), v.linkInline;
  }
  function xt(w, g) {
    if (w.eatSpace())
      return null;
    const W = w.next();
    return W === "(" || W === "[" ? (g.f = g.inline = ht(W === "(" ? ")" : "]"), u.highlightFormatting && (g.formatting = "link-string"), g.linkHref = !0, q(g)) : "error";
  }
  const wt = {
    ")": /^(?:[^()\\]|\\.|\((?:[^()\\]|\\.)*\))*?(?=\))/,
    "]": /^(?:[^[\\\]]|\\.|\[(?:[^[\\\]]|\\.)*])*?(?=])/
  };
  function ht(w) {
    return function(g, W) {
      if (g.next() === w) {
        W.f = W.inline = Ee, u.highlightFormatting && (W.formatting = "link-string");
        const K = q(W);
        return W.linkHref = !1, K;
      }
      return g.match(wt[w]), W.linkHref = !0, q(W);
    };
  }
  function Ue(w, g) {
    return w.match(/^([^\\\]]|\\.)*]:/, !1) ? (g.f = z, w.next(), u.highlightFormatting && (g.formatting = "link"), g.linkText = !0, q(g)) : be(w, g, Ee);
  }
  function z(w, g) {
    if (w.match("]:", !0)) {
      g.f = g.inline = Et, u.highlightFormatting && (g.formatting = "link");
      const W = q(g);
      return g.linkText = !1, W;
    }
    return w.match(/^([^\\\]]|\\.)+/, !0), v.linkText;
  }
  function Et(w, g) {
    return w.eatSpace() ? null : (w.match(/^\S+/, !0), w.peek() === void 0 ? g.linkTitle = !0 : w.match(
      /^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/,
      !0
    ), g.f = g.inline = Ee, `${v.linkHref} url`);
  }
  const dt = {
    startState() {
      return {
        f: ce,
        prevLine: { stream: null },
        thisLine: { stream: null },
        block: ce,
        htmlState: null,
        indentation: 0,
        inline: Ee,
        text: ze,
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
        if (g.prevLine = g.thisLine, g.thisLine = { stream: w }, g.taskList = !1, g.trailingSpace = 0, g.trailingSpaceNewLine = !1, !g.localState && (g.f = g.block, g.f !== se)) {
          const W = w.match(/^\s*/, !0)[0].replace(/\t/g, Q).length;
          if (g.indentation = W, g.indentationDiff = null, W > 0)
            return null;
        }
      }
      return g.f(w, g);
    },
    innerMode(w) {
      return w.block === se ? { state: w.htmlState, mode: f } : w.localState ? { state: w.localState, mode: w.localMode } : { state: w, mode: dt };
    },
    indent(w, g, W) {
      return w.block === se && f.indent ? f.indent(w.htmlState, g, W) : w.localState && w.localMode.indent ? w.localMode.indent(w.localState, g, W) : nt.Pass;
    },
    blankLine: te,
    getType: q,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",
    closeBrackets: "()[]{}''\"\"``",
    fold: "markdown"
  };
  return dt;
});
nt.defineMIME("text/markdown", "markdown");
nt.defineMIME("text/x-markdown", "markdown");
const dh = "gedi_409d3", ph = "gedi_8863d", gh = "gedi_77ff2", vh = "gedi_7503c", it = {
  "out-wrapper": "gedi_0cacc",
  dark: dh,
  "show-preview": "gedi_057f0",
  editor: ph,
  preview: gh,
  toolbar: vh,
  "editor-wrapper": "gedi_a19e0",
  "preview-content": "gedi_0e920"
};
var yh = Array.isArray;
const xa = yh, mh = "gedi_56241", bh = "gedi_dc161", xh = "gedi_1009b", wh = "gedi_55c98", ct = {
  "toolbar-wrapper": "gedi_00985",
  "toolbar-item-wrapper": "gedi_2d5fe",
  "toolbar-item": "gedi_f1fa7",
  tooltip: mh,
  active: bh,
  disable: xh,
  vr: wh
}, Sh = "gedi_e6842", Ch = "gedi_ad0ba", cr = {
  dropdown: Sh,
  open: Ch,
  "dropdown-content": "gedi_8d625"
}, kh = /* @__PURE__ */ Mn("<div><div>");
function wa(s, u, f = !0) {
  if (f)
    s.style.maxHeight = "0", s.classList.remove(cr.open), Sa(s, !1), u.classList.remove(ct.active);
  else {
    s.style.maxHeight = "";
    const d = s.scrollHeight;
    s.style.maxHeight = "0", s.classList.add(cr.open), setTimeout(() => {
      s.style.maxHeight = `${d}px`;
    }, 10), u.classList.add(ct.active), Sa(s);
  }
}
function Sa(s, u = !0) {
  const f = s.previousElementSibling;
  f && (f.style.display = u ? "none" : "");
}
function Lh(s) {
  let u;
  const f = (d) => d.classList.contains(cr.open);
  return vr(() => {
    u.style.maxHeight = "0", s.trigger.addEventListener("click", () => {
      wa(u, s.trigger, f(u));
    }), document.addEventListener("click", (d) => {
      const p = d.target;
      s.trigger.contains(p) || wa(u, s.trigger, !0);
    });
  }), (() => {
    const d = kh(), p = d.firstChild, v = u;
    return typeof v == "function" ? br(v, d) : u = d, zt(p, () => s.children), ot((m) => {
      const x = cr.dropdown, S = cr["dropdown-content"];
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
const Za = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), mi = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), xr = Object.freeze({
  ...Za,
  ...mi
}), $o = Object.freeze({
  ...xr,
  body: "",
  hidden: !1
}), Th = Object.freeze({
  width: null,
  height: null
}), Qa = Object.freeze({
  ...Th,
  ...mi
});
function Fh(s, u = 0) {
  const f = s.replace(/^-?[0-9.]*/, "");
  function d(p) {
    for (; p < 0; )
      p += 4;
    return p % 4;
  }
  if (f === "") {
    const p = parseInt(s);
    return isNaN(p) ? 0 : d(p);
  } else if (f !== s) {
    let p = 0;
    switch (f) {
      case "%":
        p = 25;
        break;
      case "deg":
        p = 90;
    }
    if (p) {
      let v = parseFloat(s.slice(0, s.length - f.length));
      return isNaN(v) ? 0 : (v = v / p, v % 1 === 0 ? d(v) : 0);
    }
  }
  return u;
}
const Ah = /[\s,]+/;
function Dh(s, u) {
  u.split(Ah).forEach((f) => {
    switch (f.trim()) {
      case "horizontal":
        s.hFlip = !0;
        break;
      case "vertical":
        s.vFlip = !0;
        break;
    }
  });
}
const Ja = {
  ...Qa,
  preserveAspectRatio: ""
};
function Ca(s) {
  const u = {
    ...Ja
  }, f = (d, p) => s.getAttribute(d) || p;
  return u.width = f("width", null), u.height = f("height", null), u.rotate = Fh(f("rotate", "")), Dh(u, f("flip", "")), u.preserveAspectRatio = f("preserveAspectRatio", f("preserveaspectratio", "")), u;
}
function Mh(s, u) {
  for (const f in Ja)
    if (s[f] !== u[f])
      return !0;
  return !1;
}
const hr = /^[a-z0-9]+(-[a-z0-9]+)*$/, wr = (s, u, f, d = "") => {
  const p = s.split(":");
  if (s.slice(0, 1) === "@") {
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
    return u && !ci(L) ? null : L;
  }
  const v = p[0], m = v.split("-");
  if (m.length > 1) {
    const x = {
      provider: d,
      prefix: m.shift(),
      name: m.join("-")
    };
    return u && !ci(x) ? null : x;
  }
  if (f && d === "") {
    const x = {
      provider: d,
      prefix: "",
      name: v
    };
    return u && !ci(x, f) ? null : x;
  }
  return null;
}, ci = (s, u) => s ? !!((s.provider === "" || s.provider.match(hr)) && (u && s.prefix === "" || s.prefix.match(hr)) && s.name.match(hr)) : !1;
function Eh(s, u) {
  const f = {};
  !s.hFlip != !u.hFlip && (f.hFlip = !0), !s.vFlip != !u.vFlip && (f.vFlip = !0);
  const d = ((s.rotate || 0) + (u.rotate || 0)) % 4;
  return d && (f.rotate = d), f;
}
function ka(s, u) {
  const f = Eh(s, u);
  for (const d in $o)
    d in mi ? d in s && !(d in f) && (f[d] = mi[d]) : d in u ? f[d] = u[d] : d in s && (f[d] = s[d]);
  return f;
}
function Nh(s, u) {
  const f = s.icons, d = s.aliases || /* @__PURE__ */ Object.create(null), p = /* @__PURE__ */ Object.create(null);
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
  return (u || Object.keys(f).concat(Object.keys(d))).forEach(v), p;
}
function Oh(s, u, f) {
  const d = s.icons, p = s.aliases || /* @__PURE__ */ Object.create(null);
  let v = {};
  function m(x) {
    v = ka(
      d[x] || p[x],
      v
    );
  }
  return m(u), f.forEach(m), ka(s, v);
}
function Va(s, u) {
  const f = [];
  if (typeof s != "object" || typeof s.icons != "object")
    return f;
  s.not_found instanceof Array && s.not_found.forEach((p) => {
    u(p, null), f.push(p);
  });
  const d = Nh(s);
  for (const p in d) {
    const v = d[p];
    v && (u(p, Oh(s, p, v)), f.push(p));
  }
  return f;
}
const Ih = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Za
};
function _o(s, u) {
  for (const f in u)
    if (f in s && typeof s[f] != typeof u[f])
      return !1;
  return !0;
}
function eu(s) {
  if (typeof s != "object" || s === null)
    return null;
  const u = s;
  if (typeof u.prefix != "string" || !s.icons || typeof s.icons != "object" || !_o(s, Ih))
    return null;
  const f = u.icons;
  for (const p in f) {
    const v = f[p];
    if (!p.match(hr) || typeof v.body != "string" || !_o(
      v,
      $o
    ))
      return null;
  }
  const d = u.aliases || /* @__PURE__ */ Object.create(null);
  for (const p in d) {
    const v = d[p], m = v.parent;
    if (!p.match(hr) || typeof m != "string" || !f[m] && !d[m] || !_o(
      v,
      $o
    ))
      return null;
  }
  return u;
}
const bi = /* @__PURE__ */ Object.create(null);
function Hh(s, u) {
  return {
    provider: s,
    prefix: u,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Ut(s, u) {
  const f = bi[s] || (bi[s] = /* @__PURE__ */ Object.create(null));
  return f[u] || (f[u] = Hh(s, u));
}
function tl(s, u) {
  return eu(u) ? Va(u, (f, d) => {
    d ? s.icons[f] = d : s.missing.add(f);
  }) : [];
}
function Ph(s, u, f) {
  try {
    if (typeof f.body == "string")
      return s.icons[u] = { ...f }, !0;
  } catch {
  }
  return !1;
}
function Wh(s, u) {
  let f = [];
  return (typeof s == "string" ? [s] : Object.keys(bi)).forEach((p) => {
    (typeof p == "string" && typeof u == "string" ? [u] : Object.keys(bi[p] || {})).forEach((m) => {
      const x = Ut(p, m);
      f = f.concat(
        Object.keys(x.icons).map(
          (S) => (p !== "" ? "@" + p + ":" : "") + m + ":" + S
        )
      );
    });
  }), f;
}
let dr = !1;
function tu(s) {
  return typeof s == "boolean" && (dr = s), dr;
}
function pr(s) {
  const u = typeof s == "string" ? wr(s, !0, dr) : s;
  if (u) {
    const f = Ut(u.provider, u.prefix), d = u.name;
    return f.icons[d] || (f.missing.has(d) ? null : void 0);
  }
}
function nu(s, u) {
  const f = wr(s, !0, dr);
  if (!f)
    return !1;
  const d = Ut(f.provider, f.prefix);
  return Ph(d, f.name, u);
}
function La(s, u) {
  if (typeof s != "object")
    return !1;
  if (typeof u != "string" && (u = s.provider || ""), dr && !u && !s.prefix) {
    let p = !1;
    return eu(s) && (s.prefix = "", Va(s, (v, m) => {
      m && nu(v, m) && (p = !0);
    })), p;
  }
  const f = s.prefix;
  if (!ci({
    provider: u,
    prefix: f,
    name: "a"
  }))
    return !1;
  const d = Ut(u, f);
  return !!tl(d, s);
}
function Bh(s) {
  return !!pr(s);
}
function Rh(s) {
  const u = pr(s);
  return u ? {
    ...xr,
    ...u
  } : null;
}
function _h(s) {
  const u = {
    loaded: [],
    missing: [],
    pending: []
  }, f = /* @__PURE__ */ Object.create(null);
  s.sort((p, v) => p.provider !== v.provider ? p.provider.localeCompare(v.provider) : p.prefix !== v.prefix ? p.prefix.localeCompare(v.prefix) : p.name.localeCompare(v.name));
  let d = {
    provider: "",
    prefix: "",
    name: ""
  };
  return s.forEach((p) => {
    if (d.name === p.name && d.prefix === p.prefix && d.provider === p.provider)
      return;
    d = p;
    const v = p.provider, m = p.prefix, x = p.name, S = f[v] || (f[v] = /* @__PURE__ */ Object.create(null)), L = S[m] || (S[m] = Ut(v, m));
    let T;
    x in L.icons ? T = u.loaded : m === "" || L.missing.has(x) ? T = u.missing : T = u.pending;
    const E = {
      provider: v,
      prefix: m,
      name: x
    };
    T.push(E);
  }), u;
}
function ru(s, u) {
  s.forEach((f) => {
    const d = f.loaderCallbacks;
    d && (f.loaderCallbacks = d.filter((p) => p.id !== u));
  });
}
function zh(s) {
  s.pendingCallbacksFlag || (s.pendingCallbacksFlag = !0, setTimeout(() => {
    s.pendingCallbacksFlag = !1;
    const u = s.loaderCallbacks ? s.loaderCallbacks.slice(0) : [];
    if (!u.length)
      return;
    let f = !1;
    const d = s.provider, p = s.prefix;
    u.forEach((v) => {
      const m = v.icons, x = m.pending.length;
      m.pending = m.pending.filter((S) => {
        if (S.prefix !== p)
          return !0;
        const L = S.name;
        if (s.icons[L])
          m.loaded.push({
            provider: d,
            prefix: p,
            name: L
          });
        else if (s.missing.has(L))
          m.missing.push({
            provider: d,
            prefix: p,
            name: L
          });
        else
          return f = !0, !0;
        return !1;
      }), m.pending.length !== x && (f || ru([s], v.id), v.callback(
        m.loaded.slice(0),
        m.missing.slice(0),
        m.pending.slice(0),
        v.abort
      ));
    });
  }));
}
let Uh = 0;
function Gh(s, u, f) {
  const d = Uh++, p = ru.bind(null, f, d);
  if (!u.pending.length)
    return p;
  const v = {
    id: d,
    icons: u,
    callback: s,
    abort: p
  };
  return f.forEach((m) => {
    (m.loaderCallbacks || (m.loaderCallbacks = [])).push(v);
  }), p;
}
const Xo = /* @__PURE__ */ Object.create(null);
function Ta(s, u) {
  Xo[s] = u;
}
function Yo(s) {
  return Xo[s] || Xo[""];
}
function qh(s, u = !0, f = !1) {
  const d = [];
  return s.forEach((p) => {
    const v = typeof p == "string" ? wr(p, u, f) : p;
    v && d.push(v);
  }), d;
}
var Kh = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function $h(s, u, f, d) {
  const p = s.resources.length, v = s.random ? Math.floor(Math.random() * p) : s.index;
  let m;
  if (s.random) {
    let re = s.resources.slice(0);
    for (m = []; re.length > 1; ) {
      const q = Math.floor(Math.random() * re.length);
      m.push(re[q]), re = re.slice(0, q).concat(re.slice(q + 1));
    }
    m = m.concat(re);
  } else
    m = s.resources.slice(v).concat(s.resources.slice(0, v));
  const x = Date.now();
  let S = "pending", L = 0, T, E = null, H = [], j = [];
  typeof d == "function" && j.push(d);
  function $() {
    E && (clearTimeout(E), E = null);
  }
  function Q() {
    S === "pending" && (S = "aborted"), $(), H.forEach((re) => {
      re.status === "pending" && (re.status = "aborted");
    }), H = [];
  }
  function be(re, q) {
    q && (j = []), typeof re == "function" && j.push(re);
  }
  function xe() {
    return {
      startTime: x,
      payload: u,
      status: S,
      queriesSent: L,
      queriesPending: H.length,
      subscribe: be,
      abort: Q
    };
  }
  function J() {
    S = "failed", j.forEach((re) => {
      re(void 0, T);
    });
  }
  function te() {
    H.forEach((re) => {
      re.status === "pending" && (re.status = "aborted");
    }), H = [];
  }
  function ce(re, q, ze) {
    const Ee = q !== "success";
    switch (H = H.filter((je) => je !== re), S) {
      case "pending":
        break;
      case "failed":
        if (Ee || !s.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (q === "abort") {
      T = ze, J();
      return;
    }
    if (Ee) {
      T = ze, H.length || (m.length ? se() : J());
      return;
    }
    if ($(), te(), !s.random) {
      const je = s.resources.indexOf(re.resource);
      je !== -1 && je !== s.index && (s.index = je);
    }
    S = "completed", j.forEach((je) => {
      je(ze);
    });
  }
  function se() {
    if (S !== "pending")
      return;
    $();
    const re = m.shift();
    if (re === void 0) {
      if (H.length) {
        E = setTimeout(() => {
          $(), S === "pending" && (te(), J());
        }, s.timeout);
        return;
      }
      J();
      return;
    }
    const q = {
      status: "pending",
      resource: re,
      callback: (ze, Ee) => {
        ce(q, ze, Ee);
      }
    };
    H.push(q), L++, E = setTimeout(se, s.rotate), f(re, u, q.callback);
  }
  return setTimeout(se), xe;
}
function iu(s) {
  const u = {
    ...Kh,
    ...s
  };
  let f = [];
  function d() {
    f = f.filter((x) => x().status === "pending");
  }
  function p(x, S, L) {
    const T = $h(
      u,
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
      u.index = x;
    },
    getIndex: () => u.index,
    cleanup: d
  };
}
function nl(s) {
  let u;
  if (typeof s.resources == "string")
    u = [s.resources];
  else if (u = s.resources, !(u instanceof Array) || !u.length)
    return null;
  return {
    resources: u,
    path: s.path || "/",
    maxURL: s.maxURL || 500,
    rotate: s.rotate || 750,
    timeout: s.timeout || 5e3,
    random: s.random === !0,
    index: s.index || 0,
    dataAfterTimeout: s.dataAfterTimeout !== !1
  };
}
const Ci = /* @__PURE__ */ Object.create(null), fr = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], hi = [];
for (; fr.length > 0; )
  fr.length === 1 || Math.random() > 0.5 ? hi.push(fr.shift()) : hi.push(fr.pop());
Ci[""] = nl({
  resources: ["https://api.iconify.design"].concat(hi)
});
function Fa(s, u) {
  const f = nl(u);
  return f === null ? !1 : (Ci[s] = f, !0);
}
function ki(s) {
  return Ci[s];
}
function Xh() {
  return Object.keys(Ci);
}
function Aa() {
}
const zo = /* @__PURE__ */ Object.create(null);
function Yh(s) {
  if (!zo[s]) {
    const u = ki(s);
    if (!u)
      return;
    const f = iu(u), d = {
      config: u,
      redundancy: f
    };
    zo[s] = d;
  }
  return zo[s];
}
function ou(s, u, f) {
  let d, p;
  if (typeof s == "string") {
    const v = Yo(s);
    if (!v)
      return f(void 0, 424), Aa;
    p = v.send;
    const m = Yh(s);
    m && (d = m.redundancy);
  } else {
    const v = nl(s);
    if (v) {
      d = iu(v);
      const m = s.resources ? s.resources[0] : "", x = Yo(m);
      x && (p = x.send);
    }
  }
  return !d || !p ? (f(void 0, 424), Aa) : d.query(u, p, f)().abort;
}
const Da = "iconify2", gr = "iconify", lu = gr + "-count", Ma = gr + "-version", su = 36e5, jh = 168;
function jo(s, u) {
  try {
    return s.getItem(u);
  } catch {
  }
}
function rl(s, u, f) {
  try {
    return s.setItem(u, f), !0;
  } catch {
  }
}
function Ea(s, u) {
  try {
    s.removeItem(u);
  } catch {
  }
}
function Zo(s, u) {
  return rl(s, lu, u.toString());
}
function Qo(s) {
  return parseInt(jo(s, lu)) || 0;
}
const rn = {
  local: !0,
  session: !0
}, au = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let il = !1;
function Zh(s) {
  il = s;
}
let ui = typeof window > "u" ? {} : window;
function uu(s) {
  const u = s + "Storage";
  try {
    if (ui && ui[u] && typeof ui[u].length == "number")
      return ui[u];
  } catch {
  }
  rn[s] = !1;
}
function fu(s, u) {
  const f = uu(s);
  if (!f)
    return;
  const d = jo(f, Ma);
  if (d !== Da) {
    if (d) {
      const x = Qo(f);
      for (let S = 0; S < x; S++)
        Ea(f, gr + S.toString());
    }
    rl(f, Ma, Da), Zo(f, 0);
    return;
  }
  const p = Math.floor(Date.now() / su) - jh, v = (x) => {
    const S = gr + x.toString(), L = jo(f, S);
    if (typeof L == "string") {
      try {
        const T = JSON.parse(L);
        if (typeof T == "object" && typeof T.cached == "number" && T.cached > p && typeof T.provider == "string" && typeof T.data == "object" && typeof T.data.prefix == "string" && u(T, x))
          return !0;
      } catch {
      }
      Ea(f, S);
    }
  };
  let m = Qo(f);
  for (let x = m - 1; x >= 0; x--)
    v(x) || (x === m - 1 ? (m--, Zo(f, m)) : au[s].add(x));
}
function cu() {
  if (!il) {
    Zh(!0);
    for (const s in rn)
      fu(s, (u) => {
        const f = u.data, d = u.provider, p = f.prefix, v = Ut(
          d,
          p
        );
        if (!tl(v, f).length)
          return !1;
        const m = f.lastModified || -1;
        return v.lastModifiedCached = v.lastModifiedCached ? Math.min(v.lastModifiedCached, m) : m, !0;
      });
  }
}
function Qh(s, u) {
  const f = s.lastModifiedCached;
  if (f && f >= u)
    return f === u;
  if (s.lastModifiedCached = u, f)
    for (const d in rn)
      fu(d, (p) => {
        const v = p.data;
        return p.provider !== s.provider || v.prefix !== s.prefix || v.lastModified === u;
      });
  return !0;
}
function Jh(s, u) {
  il || cu();
  function f(d) {
    let p;
    if (!rn[d] || !(p = uu(d)))
      return;
    const v = au[d];
    let m;
    if (v.size)
      v.delete(m = Array.from(v).shift());
    else if (m = Qo(p), !Zo(p, m + 1))
      return;
    const x = {
      cached: Math.floor(Date.now() / su),
      provider: s.provider,
      data: u
    };
    return rl(
      p,
      gr + m.toString(),
      JSON.stringify(x)
    );
  }
  u.lastModified && !Qh(s, u.lastModified) || !Object.keys(u.icons).length || (u.not_found && (u = Object.assign({}, u), delete u.not_found), f("local") || f("session"));
}
function Na() {
}
function Vh(s) {
  s.iconsLoaderFlag || (s.iconsLoaderFlag = !0, setTimeout(() => {
    s.iconsLoaderFlag = !1, zh(s);
  }));
}
function ed(s, u) {
  s.iconsToLoad ? s.iconsToLoad = s.iconsToLoad.concat(u).sort() : s.iconsToLoad = u, s.iconsQueueFlag || (s.iconsQueueFlag = !0, setTimeout(() => {
    s.iconsQueueFlag = !1;
    const { provider: f, prefix: d } = s, p = s.iconsToLoad;
    delete s.iconsToLoad;
    let v;
    if (!p || !(v = Yo(f)))
      return;
    v.prepare(f, d, p).forEach((x) => {
      ou(f, x, (S) => {
        if (typeof S != "object")
          x.icons.forEach((L) => {
            s.missing.add(L);
          });
        else
          try {
            const L = tl(
              s,
              S
            );
            if (!L.length)
              return;
            const T = s.pendingIcons;
            T && L.forEach((E) => {
              T.delete(E);
            }), Jh(s, S);
          } catch (L) {
            console.error(L);
          }
        Vh(s);
      });
    });
  }));
}
const ol = (s, u) => {
  const f = qh(s, !0, tu()), d = _h(f);
  if (!d.pending.length) {
    let S = !0;
    return u && setTimeout(() => {
      S && u(
        d.loaded,
        d.missing,
        d.pending,
        Na
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
    const { provider: L, prefix: T, name: E } = S, H = Ut(L, T), j = H.pendingIcons || (H.pendingIcons = /* @__PURE__ */ new Set());
    j.has(E) || (j.add(E), p[L][T].push(E));
  }), v.forEach((S) => {
    const { provider: L, prefix: T } = S;
    p[L][T].length && ed(S, p[L][T]);
  }), u ? Gh(u, d, v) : Na;
}, td = (s) => new Promise((u, f) => {
  const d = typeof s == "string" ? wr(s, !0) : s;
  if (!d) {
    f(s);
    return;
  }
  ol([d || s], (p) => {
    if (p.length && d) {
      const v = pr(d);
      if (v) {
        u({
          ...xr,
          ...v
        });
        return;
      }
    }
    f(s);
  });
});
function nd(s) {
  try {
    const u = typeof s == "string" ? JSON.parse(s) : s;
    if (typeof u.body == "string")
      return {
        ...u
      };
  } catch {
  }
}
function rd(s, u) {
  const f = typeof s == "string" ? wr(s, !0, !0) : null;
  if (!f) {
    const v = nd(s);
    return {
      value: s,
      data: v
    };
  }
  const d = pr(f);
  if (d !== void 0 || !f.prefix)
    return {
      value: s,
      name: f,
      data: d
    };
  const p = ol([f], () => u(s, f, pr(f)));
  return {
    value: s,
    name: f,
    loading: p
  };
}
function Uo(s) {
  return s.hasAttribute("inline");
}
let hu = !1;
try {
  hu = navigator.vendor.indexOf("Apple") === 0;
} catch {
}
function id(s, u) {
  switch (u) {
    case "svg":
    case "bg":
    case "mask":
      return u;
  }
  return u !== "style" && (hu || s.indexOf("<a") === -1) ? "svg" : s.indexOf("currentColor") === -1 ? "bg" : "mask";
}
const od = /(-?[0-9.]*[0-9]+[0-9.]*)/g, ld = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Jo(s, u, f) {
  if (u === 1)
    return s;
  if (f = f || 100, typeof s == "number")
    return Math.ceil(s * u * f) / f;
  if (typeof s != "string")
    return s;
  const d = s.split(od);
  if (d === null || !d.length)
    return s;
  const p = [];
  let v = d.shift(), m = ld.test(v);
  for (; ; ) {
    if (m) {
      const x = parseFloat(v);
      isNaN(x) ? p.push(v) : p.push(Math.ceil(x * u * f) / f);
    } else
      p.push(v);
    if (v = d.shift(), v === void 0)
      return p.join("");
    m = !m;
  }
}
const sd = (s) => s === "unset" || s === "undefined" || s === "none";
function du(s, u) {
  const f = {
    ...xr,
    ...s
  }, d = {
    ...Qa,
    ...u
  }, p = {
    left: f.left,
    top: f.top,
    width: f.width,
    height: f.height
  };
  let v = f.body;
  [f, d].forEach(($) => {
    const Q = [], be = $.hFlip, xe = $.vFlip;
    let J = $.rotate;
    be ? xe ? J += 2 : (Q.push(
      "translate(" + (p.width + p.left).toString() + " " + (0 - p.top).toString() + ")"
    ), Q.push("scale(-1 1)"), p.top = p.left = 0) : xe && (Q.push(
      "translate(" + (0 - p.left).toString() + " " + (p.height + p.top).toString() + ")"
    ), Q.push("scale(1 -1)"), p.top = p.left = 0);
    let te;
    switch (J < 0 && (J -= Math.floor(J / 4) * 4), J = J % 4, J) {
      case 1:
        te = p.height / 2 + p.top, Q.unshift(
          "rotate(90 " + te.toString() + " " + te.toString() + ")"
        );
        break;
      case 2:
        Q.unshift(
          "rotate(180 " + (p.width / 2 + p.left).toString() + " " + (p.height / 2 + p.top).toString() + ")"
        );
        break;
      case 3:
        te = p.width / 2 + p.left, Q.unshift(
          "rotate(-90 " + te.toString() + " " + te.toString() + ")"
        );
        break;
    }
    J % 2 === 1 && (p.left !== p.top && (te = p.left, p.left = p.top, p.top = te), p.width !== p.height && (te = p.width, p.width = p.height, p.height = te)), Q.length && (v = '<g transform="' + Q.join(" ") + '">' + v + "</g>");
  });
  const m = d.width, x = d.height, S = p.width, L = p.height;
  let T, E;
  m === null ? (E = x === null ? "1em" : x === "auto" ? L : x, T = Jo(E, S / L)) : (T = m === "auto" ? S : m, E = x === null ? Jo(T, L / S) : x === "auto" ? L : x);
  const H = {}, j = ($, Q) => {
    sd(Q) || (H[$] = Q.toString());
  };
  return j("width", T), j("height", E), H.viewBox = p.left.toString() + " " + p.top.toString() + " " + S.toString() + " " + L.toString(), {
    attributes: H,
    body: v
  };
}
const ad = () => {
  let s;
  try {
    if (s = fetch, typeof s == "function")
      return s;
  } catch {
  }
};
let xi = ad();
function ud(s) {
  xi = s;
}
function fd() {
  return xi;
}
function cd(s, u) {
  const f = ki(s);
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
    const v = u + ".json?icons=";
    d = f.maxURL - p - f.path.length - v.length;
  }
  return d;
}
function hd(s) {
  return s === 404;
}
const dd = (s, u, f) => {
  const d = [], p = cd(s, u), v = "icons";
  let m = {
    type: v,
    provider: s,
    prefix: u,
    icons: []
  }, x = 0;
  return f.forEach((S, L) => {
    x += S.length + 1, x >= p && L > 0 && (d.push(m), m = {
      type: v,
      provider: s,
      prefix: u,
      icons: []
    }, x = S.length), m.icons.push(S);
  }), d.push(m), d;
};
function pd(s) {
  if (typeof s == "string") {
    const u = ki(s);
    if (u)
      return u.path;
  }
  return "/";
}
const gd = (s, u, f) => {
  if (!xi) {
    f("abort", 424);
    return;
  }
  let d = pd(u.provider);
  switch (u.type) {
    case "icons": {
      const v = u.prefix, x = u.icons.join(","), S = new URLSearchParams({
        icons: x
      });
      d += v + ".json?" + S.toString();
      break;
    }
    case "custom": {
      const v = u.uri;
      d += v.slice(0, 1) === "/" ? v.slice(1) : v;
      break;
    }
    default:
      f("abort", 400);
      return;
  }
  let p = 503;
  xi(s + d).then((v) => {
    const m = v.status;
    if (m !== 200) {
      setTimeout(() => {
        f(hd(m) ? "abort" : "next", m);
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
}, vd = {
  prepare: dd,
  send: gd
};
function Oa(s, u) {
  switch (s) {
    case "local":
    case "session":
      rn[s] = u;
      break;
    case "all":
      for (const f in rn)
        rn[f] = u;
      break;
  }
}
const Go = "data-style";
let pu = "";
function yd(s) {
  pu = s;
}
function Ia(s, u) {
  let f = Array.from(s.childNodes).find((d) => d.hasAttribute && d.hasAttribute(Go));
  f || (f = document.createElement("style"), f.setAttribute(Go, Go), s.appendChild(f)), f.textContent = ":host{display:inline-block;vertical-align:" + (u ? "-0.125em" : "0") + "}span,svg{display:block}" + pu;
}
function gu() {
  Ta("", vd), tu(!0);
  let s;
  try {
    s = window;
  } catch {
  }
  if (s) {
    if (cu(), s.IconifyPreload !== void 0) {
      const f = s.IconifyPreload, d = "Invalid IconifyPreload syntax.";
      typeof f == "object" && f !== null && (f instanceof Array ? f : [f]).forEach((p) => {
        try {
          (typeof p != "object" || p === null || p instanceof Array || typeof p.icons != "object" || typeof p.prefix != "string" || !La(p)) && console.error(d);
        } catch {
          console.error(d);
        }
      });
    }
    if (s.IconifyProviders !== void 0) {
      const f = s.IconifyProviders;
      if (typeof f == "object" && f !== null)
        for (const d in f) {
          const p = "IconifyProviders[" + d + "] is invalid.";
          try {
            const v = f[d];
            if (typeof v != "object" || !v || v.resources === void 0)
              continue;
            Fa(d, v) || console.error(p);
          } catch {
            console.error(p);
          }
        }
    }
  }
  return {
    enableCache: (f) => Oa(f, !0),
    disableCache: (f) => Oa(f, !1),
    iconExists: Bh,
    getIcon: Rh,
    listIcons: Wh,
    addIcon: nu,
    addCollection: La,
    calculateSize: Jo,
    buildIcon: du,
    loadIcons: ol,
    loadIcon: td,
    addAPIProvider: Fa,
    appendCustomStyle: yd,
    _api: {
      getAPIConfig: ki,
      setAPIModule: Ta,
      sendAPIQuery: ou,
      setFetch: ud,
      getFetch: fd,
      listAPIProviders: Xh
    }
  };
}
function vu(s, u) {
  let f = s.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const d in u)
    f += " " + d + '="' + u[d] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + f + ">" + s + "</svg>";
}
function md(s) {
  return s.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function bd(s) {
  return 'url("data:image/svg+xml,' + md(s) + '")';
}
const Vo = {
  "background-color": "currentColor"
}, yu = {
  "background-color": "transparent"
}, Ha = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
}, Pa = {
  "-webkit-mask": Vo,
  mask: Vo,
  background: yu
};
for (const s in Pa) {
  const u = Pa[s];
  for (const f in Ha)
    u[s + "-" + f] = Ha[f];
}
function Wa(s) {
  return s ? s + (s.match(/^[-0-9.]+$/) ? "px" : "") : "inherit";
}
function xd(s, u, f) {
  const d = document.createElement("span");
  let p = s.body;
  p.indexOf("<a") !== -1 && (p += "<!-- " + Date.now() + " -->");
  const v = s.attributes, m = vu(p, {
    ...v,
    width: u.width + "",
    height: u.height + ""
  }), x = bd(m), S = d.style, L = {
    "--svg": x,
    width: Wa(v.width),
    height: Wa(v.height),
    ...f ? Vo : yu
  };
  for (const T in L)
    S.setProperty(T, L[T]);
  return d;
}
function wd(s) {
  const u = document.createElement("span"), f = s.attributes;
  let d = "";
  return f.width || (d = "width: inherit;"), f.height || (d += "height: inherit;"), d && (f.style = d), u.innerHTML = vu(s.body, f), u.firstChild;
}
function Ba(s, u) {
  const f = u.icon.data, d = u.customisations, p = du(f, d);
  d.preserveAspectRatio && (p.attributes.preserveAspectRatio = d.preserveAspectRatio);
  const v = u.renderedMode;
  let m;
  switch (v) {
    case "svg":
      m = wd(p);
      break;
    default:
      m = xd(p, {
        ...xr,
        ...f
      }, v === "mask");
  }
  const x = Array.from(s.childNodes).find((S) => {
    const L = S.tagName && S.tagName.toUpperCase();
    return L === "SPAN" || L === "SVG";
  });
  x ? m.tagName === "SPAN" && x.tagName === m.tagName ? x.setAttribute("style", m.getAttribute("style")) : s.replaceChild(m, x) : s.appendChild(m);
}
function Ra(s, u, f) {
  const d = f && (f.rendered ? f : f.lastRender);
  return {
    rendered: !1,
    inline: u,
    icon: s,
    lastRender: d
  };
}
function Sd(s = "iconify-icon") {
  let u, f;
  try {
    u = window.customElements, f = window.HTMLElement;
  } catch {
    return;
  }
  if (!u || !f)
    return;
  const d = u.get(s);
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
      }), L = Uo(this);
      Ia(S, L), this._state = Ra({
        value: ""
      }, L), this._queueCheck();
    }
    static get observedAttributes() {
      return p.slice(0);
    }
    attributeChangedCallback(S) {
      if (S === "inline") {
        const L = Uo(this), T = this._state;
        L !== T.inline && (T.inline = L, Ia(this._shadowRoot, L));
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
      return Uo(this);
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
        Ba(L, S);
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
      const T = this.getAttribute("mode"), E = Ca(this);
      (S.attrMode !== T || Mh(S.customisations, E)) && this._renderIcon(S.icon, E, T);
    }
    _iconChanged(S) {
      const L = rd(S, (T, E, H) => {
        const j = this._state;
        if (j.rendered || this.getAttribute("icon") !== T)
          return;
        const $ = {
          value: T,
          name: E,
          data: H
        };
        $.data ? this._gotIconData($) : j.icon = $;
      });
      L.data ? this._gotIconData(L) : this._state = Ra(L, this._state.inline, this._state);
    }
    _gotIconData(S) {
      this._checkQueued = !1, this._renderIcon(S, Ca(this), this.getAttribute("mode"));
    }
    _renderIcon(S, L, T) {
      const E = id(S.data.body, T), H = this._state.inline;
      Ba(this._shadowRoot, this._state = {
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
  const m = gu();
  for (const x in m)
    v[x] = v.prototype[x] = m[x];
  return u.define(s, v), v;
}
const Cd = Sd() || gu(), { enableCache: Qd, disableCache: Jd, iconExists: Vd, getIcon: ep, listIcons: tp, addIcon: Sr, addCollection: np, calculateSize: rp, buildIcon: ip, loadIcons: op, loadIcon: lp, addAPIProvider: sp, _api: ap } = Cd, kd = /* @__PURE__ */ Mn("<iconify-icon>", !0, !1);
function Ld(s) {
  let {
    icon: u,
    mode: f,
    inline: d,
    rotate: p,
    flip: v,
    width: m,
    height: x,
    preserveAspectRatio: S
  } = s;
  return typeof u == "object" && (u = JSON.stringify(u)), (() => {
    const L = kd();
    return ft(L, "icon", u), ft(L, "mode", f), ft(L, "inline", d), ft(L, "rotate", p), ft(L, "flip", v), ft(L, "width", m), ft(L, "height", x), ft(L, "preserveaspectratio", S), ah(L, s, !1, !1), L._$owner = _c(), L;
  })();
}
const Td = {
  width: 24,
  height: 24,
  body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-4.182 0-7.028-2.5-8.725-4.704Z"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g>'
}, Fd = {
  width: 24,
  height: 24,
  body: '<g fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M8.913 15.934c1.258.315 2.685.315 4.122-.07c1.437-.385 2.673-1.099 3.605-2.001"/><ellipse cx="14.509" cy="9.774" fill="currentColor" rx="1" ry="1.5" transform="rotate(-15 14.51 9.774)"/><ellipse cx="8.714" cy="11.328" fill="currentColor" rx="1" ry="1.5" transform="rotate(-15 8.714 11.328)"/><path stroke="currentColor" stroke-width="1.5" d="m13 16l.478.974a1.5 1.5 0 1 0 2.693-1.322l-.46-.935"/></g>'
}, Ad = {
  width: 24,
  height: 24,
  body: '<g fill="none"><path fill="currentColor" d="m5.505 11.41l.53.53l-.53-.53ZM3 14.952h-.75H3ZM9.048 21v.75V21ZM11.41 5.505l-.53-.53l.53.53Zm1.831 12.34a.75.75 0 0 0 1.06-1.061l-1.06 1.06ZM7.216 9.697a.75.75 0 1 0-1.06 1.061l1.06-1.06Zm10.749 2.362l-5.905 5.905l1.06 1.06l5.905-5.904l-1.06-1.06Zm-11.93-.12l5.905-5.905l-1.06-1.06l-5.905 5.904l1.06 1.06Zm0 6.025c-.85-.85-1.433-1.436-1.812-1.933c-.367-.481-.473-.79-.473-1.08h-1.5c0 .749.312 1.375.78 1.99c.455.596 1.125 1.263 1.945 2.083l1.06-1.06Zm-1.06-7.086c-.82.82-1.49 1.488-1.945 2.084c-.468.614-.78 1.24-.78 1.99h1.5c0-.29.106-.6.473-1.08c.38-.498.962-1.083 1.812-1.933l-1.06-1.06Zm7.085 7.086c-.85.85-1.435 1.433-1.933 1.813c-.48.366-.79.472-1.08.472v1.5c.75 0 1.376-.312 1.99-.78c.596-.455 1.264-1.125 2.084-1.945l-1.06-1.06Zm-7.085 1.06c.82.82 1.487 1.49 2.084 1.945c.614.468 1.24.78 1.989.78v-1.5c-.29 0-.599-.106-1.08-.473c-.497-.38-1.083-.962-1.933-1.812l-1.06 1.06Zm12.99-12.99c.85.85 1.433 1.436 1.813 1.933c.366.481.472.79.472 1.08h1.5c0-.749-.312-1.375-.78-1.99c-.455-.596-1.125-1.263-1.945-2.083l-1.06 1.06Zm1.06 7.086c.82-.82 1.49-1.488 1.945-2.084c.468-.614.78-1.24.78-1.99h-1.5c0 .29-.106.6-.473 1.08c-.38.498-.962 1.083-1.812 1.933l1.06 1.06Zm0-8.146c-.82-.82-1.487-1.49-2.084-1.945c-.614-.468-1.24-.78-1.989-.78v1.5c.29 0 .599.106 1.08.473c.497.38 1.083.962 1.933 1.812l1.06-1.06Zm-7.085 1.06c.85-.85 1.435-1.433 1.933-1.812c.48-.367.79-.473 1.08-.473v-1.5c-.75 0-1.376.312-1.99.78c-.596.455-1.264 1.125-2.084 1.945l1.06 1.06Zm2.362 10.749L7.216 9.698l-1.06 1.061l7.085 7.085l1.06-1.06Z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M9 21h12"/></g>'
}, Dd = {
  width: 24,
  height: 24,
  body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h11a5 5 0 0 1 0 10H8M4 7l3-3M4 7l3 3"/>'
}, Md = {
  width: 24,
  height: 24,
  body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7H9a5 5 0 1 0 0 10h7m4-10l-3-3m3 3l-3 3"/>'
}, Ed = "gedi_3c34e", Nd = {
  icon: Ed
};
Sr("solar:eye-linear", Td);
Sr("solar:undo-left-round-linear", Dd);
Sr("solar:undo-right-round-linear", Md);
Sr("solar:eraser-linear", Ad);
Sr("solar:emoji-funny-circle-linear", Fd);
function Od(s) {
  return Re(Ld, {
    get icon() {
      return s.icon;
    },
    width: "1.3em",
    get class() {
      return Nd.icon;
    }
  });
}
const Id = `<ul id="g-panel-emotions-TyUh" class="g-panel-content-emotion"><li>\u{1F600}</li><li>\u{1F603}</li><li>\u{1F604}</li><li>\u{1F601}</li><li>\u{1F606}</li><li>\u{1F605}</li><li>\u{1F602}</li><li>\u{1F923}</li><li>\u{1F60A}</li><li>\u{1F607}</li><li>\u{1F642}</li><li>\u{1F643}</li><li>\u{1F609}</li><li>\u{1F60C}</li><li>\u{1F60D}</li><li>\u{1F618}</li><li>\u{1F617}</li><li>\u{1F619}</li><li>\u{1F61A}</li><li>\u{1F60B}</li><li>\u{1F61B}</li><li>\u{1F61D}</li><li>\u{1F61C}</li><li>\u{1F913}</li><li>\u{1F60E}</li><li>\u{1F60F}</li><li>\u{1F612}</li><li>\u{1F61E}</li><li>\u{1F614}</li><li>\u{1F61F}</li><li>\u{1F615}</li><li>\u{1F641}</li><li>\u{1F623}</li><li>\u{1F616}</li><li>\u{1F62B}</li><li>\u{1F629}</li><li>\u{1F622}</li><li>\u{1F62D}</li><li>\u{1F624}</li><li>\u{1F620}</li><li>\u{1F621}</li><li>\u{1F633}</li><li>\u{1F631}</li><li>\u{1F628}</li><li>\u{1F917}</li><li>\u{1F914}</li><li>\u{1F636}</li><li>\u{1F611}</li><li>\u{1F62C}</li><li>\u{1F644}</li><li>\u{1F62F}</li><li>\u{1F634}</li><li>\u{1F637}</li><li>\u{1F911}</li><li>\u{1F608}</li><li>\u{1F921}</li><li>\u{1F4A9}</li><li>\u{1F47B}</li><li>\u{1F480}</li><li>\u{1F440}</li><li>\u{1F463}</li><li>\u{1F450}</li><li>\u{1F64C}</li><li>\u{1F44F}</li><li>\u{1F91D}</li><li>\u{1F44D}</li><li>\u{1F44E}</li><li>\u{1F44A}</li><li>\u270A</li><li>\u{1F91B}</li><li>\u{1F91C}</li><li>\u{1F91E}</li><li>\u270C\uFE0F</li><li>\u{1F918}</li><li>\u{1F44C}</li><li>\u{1F448}</li><li>\u{1F449}</li><li>\u{1F446}</li><li>\u{1F447}</li><li>\u261D\uFE0F</li><li>\u270B</li><li>\u{1F91A}</li><li>\u{1F590}</li><li>\u{1F596}</li><li>\u{1F44B}</li><li>\u{1F919}</li><li>\u{1F4AA}</li><li>\u{1F595}</li><li>\u270D\uFE0F</li><li>\u{1F64F}</li>
</ul>`, Hd = {
  title: "\u8868\u60C5",
  icon: "solar:emoji-funny-circle-linear",
  menu: {
    innerHTML: Id,
    onMount(s) {
      const u = s.cm, f = s.$element.querySelector(
        "#g-panel-emotions-TyUh"
      );
      f && f.addEventListener("click", (d) => {
        const p = d.target;
        p.tagName === "LI" && (u.replaceSelection(p.textContent || ""), u.refresh(), u.focus());
      });
    }
  }
};
function Pd(s, u) {
  s.$element.classList.contains(it["show-preview"]) ? (s.$element.classList.remove(it["show-preview"]), u.changeTitle("\u9884\u89C8"), u.active(!1)) : (s.$preview.innerHTML = s.getPreview(), s.$element.classList.add(it["show-preview"]), u.changeTitle("\u53D6\u6D88\u9884\u89C8"), u.active(!0));
}
const Wd = {
  title: "\u9884\u89C8",
  icon: "solar:eye-linear",
  action: Pd
}, Bd = {
  title: "\u56DE\u9000",
  icon: "solar:undo-left-round-linear",
  action(s) {
    const u = s.cm;
    u.undo(), u.refresh(), u.focus();
  }
}, Rd = {
  title: "\u91CD\u505A",
  icon: "solar:undo-right-round-linear",
  action(s) {
    const u = s.cm;
    u.redo(), u.refresh(), u.focus();
  }
}, _d = {
  title: "\u6E05\u7A7A",
  icon: "solar:eraser-linear",
  action(s) {
    const u = s.cm;
    u.setValue(""), u.refresh(), u.focus();
  }
}, zd = {
  title: "",
  icon: ""
}, Ud = [
  Hd,
  "|",
  Bd,
  Rd,
  "|",
  _d,
  "|",
  Wd
], Gd = /* @__PURE__ */ Mn("<div>");
function qd(s) {
  let u;
  return vr(() => {
    gi(() => {
      u.style.bottom = s.pos[0], u.style.right = s.pos[1];
    });
  }), (() => {
    const f = Gd(), d = u;
    return typeof d == "function" ? br(d, f) : u = f, zt(f, () => s.content), ot(() => Ve(f, ct.tooltip)), f;
  })();
}
const mu = /* @__PURE__ */ Mn("<div><div>"), bu = /* @__PURE__ */ Mn("<div>");
function xu(s) {
  const u = s.item;
  let f;
  const [d, p] = An(u.title), [v, m] = An({
    $element: f,
    active(x) {
      x ? v().$element.classList.add(ct.active) : v().$element.classList.remove(ct.active);
    },
    changeTitle(x) {
      p(x);
    },
    disable(x) {
      x ? v().$element.classList.add(ct.disable) : v().$element.classList.remove(ct.disable);
    }
  });
  return vr(() => {
    const x = v();
    x.$element = f, m(x);
  }), Re(ai, {
    get when() {
      return u.title;
    },
    get fallback() {
      return Re($d, {});
    },
    get children() {
      const x = mu(), S = x.firstChild, L = f;
      return typeof L == "function" ? br(L, S) : f = S, S.$$click = () => {
        const T = s.item.action;
        T && s.inst && !s.item.menu && T(s.inst, v());
      }, zt(S, Re(Od, {
        get icon() {
          return s.item.icon;
        }
      })), zt(x, Re(qd, {
        get content() {
          return d();
        },
        pos: ["-140%", "-50%"]
      }), null), zt(x, Re(ai, {
        get when() {
          return u.menu;
        },
        get children() {
          return Re(Lh, {
            trigger: f,
            get children() {
              return [Re(ai, {
                get when() {
                  return xa(u.menu);
                },
                get children() {
                  return Re(Xa, {
                    get each() {
                      return u.menu;
                    },
                    children: (T) => Re(xu, {
                      item: T,
                      get inst() {
                        return s.inst;
                      }
                    })
                  });
                }
              }), Re(ai, {
                get when() {
                  return !xa(u.menu);
                },
                get children() {
                  return Re(Kd, {
                    get item() {
                      return u.menu;
                    },
                    get inst() {
                      return s.inst;
                    }
                  });
                }
              })];
            }
          });
        }
      }), null), ot((T) => {
        const E = ct["toolbar-item-wrapper"], H = ct["toolbar-item"];
        return E !== T._v$ && Ve(x, T._v$ = E), H !== T._v$2 && Ve(S, T._v$2 = H), T;
      }, {
        _v$: void 0,
        _v$2: void 0
      }), x;
    }
  });
}
function Kd(s) {
  let u;
  return vr(() => {
    u.innerHTML = s.item.innerHTML, s.inst && s.item.onMount(s.inst);
  }), (() => {
    const f = bu(), d = u;
    return typeof d == "function" ? br(d, f) : u = f, f;
  })();
}
function $d() {
  return (() => {
    const s = bu();
    return ot(() => Ve(s, ct.vr)), s;
  })();
}
function Xd(s) {
  return (() => {
    const u = mu(), f = u.firstChild;
    return zt(f, Re(Xa, {
      get each() {
        return s.items || Ud;
      },
      children: (d) => (d === "|" && (d = zd), Re(xu, {
        item: d,
        get inst() {
          return s.inst;
        }
      }))
    })), ot(() => Ve(u, ct["toolbar-wrapper"])), u;
  })();
}
Ya(["click"]);
const Yd = /* @__PURE__ */ Mn("<div><div></div><div><div></div><div><div>");
function jd(s) {
  const [u, f] = An();
  let d;
  return vr(() => {
    if (!d)
      return;
    const p = d.querySelector(`.${it.editor}`), v = d.querySelector(`.${it["preview-content"]}`);
    if (p && v) {
      const m = nt(p, {
        mode: "markdown",
        lineWrapping: !0,
        value: s.value,
        scrollbarStyle: "overlay"
      });
      f({
        cm: m,
        $element: d,
        $editor: p,
        $preview: v,
        getPreview() {
          const S = m.getValue();
          return s.handelPreview ? s.handelPreview(S) : S;
        }
      }), m.on("change", () => {
        const S = m.getValue();
        s.onChange(S);
      }), gi(() => {
        s.theme === "dark" ? m.setOption("theme", "blackboard") : m.setOption("theme", "default");
      }), gi(() => {
        s.value !== m.getValue() && (m.setValue(s.value), m.refresh(), m.focus());
      });
    }
  }), (() => {
    const p = Yd(), v = p.firstChild, m = v.nextSibling, x = m.firstChild, S = x.nextSibling, L = S.firstChild, T = d;
    return typeof T == "function" ? br(T, p) : d = p, zt(v, Re(Xd, {
      get inst() {
        return u();
      }
    })), ot((E) => {
      const H = `${it["out-wrapper"]} ${s.theme === "dark" ? it.dark : ""}`, j = it.toolbar, $ = it["editor-wrapper"], Q = s.height || "300px", be = it.editor, xe = it.preview, J = `${it["preview-content"]} markdown-body`;
      return H !== E._v$ && Ve(p, E._v$ = H), j !== E._v$2 && Ve(v, E._v$2 = j), $ !== E._v$3 && Ve(m, E._v$3 = $), Q !== E._v$4 && ((E._v$4 = Q) != null ? m.style.setProperty("height", Q) : m.style.removeProperty("height")), be !== E._v$5 && Ve(x, E._v$5 = be), xe !== E._v$6 && Ve(S, E._v$6 = xe), J !== E._v$7 && Ve(L, E._v$7 = J), E;
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
function up(s) {
  if (!s.target)
    return;
  const [u, f] = An(s.theme), [d, p] = An(""), v = (m) => {
    p(m), s.onChange(m);
  };
  return rh(() => Re(jd, {
    onChange: v,
    get handelPreview() {
      return s.handelPreview;
    },
    get height() {
      return s.height;
    },
    get theme() {
      return u();
    },
    get value() {
      return d();
    }
  }), s.target), {
    setTheme: (m) => {
      f(m);
    },
    setVal: (m) => {
      p(m);
    },
    getVal: () => d()
  };
}
export {
  up as Editor,
  jd as MdEditor
};
