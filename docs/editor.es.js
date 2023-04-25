var _c = Object.defineProperty;
var Rc = (s, f, a) => f in s ? _c(s, f, { enumerable: !0, configurable: !0, writable: !0, value: a }) : s[f] = a;
var Xi = (s, f, a) => (Rc(s, typeof f != "symbol" ? f + "" : f, a), a);
const jc = (s, f) => s === f, qc = Symbol("solid-track"), eo = {
  equals: jc
};
let ou = uu;
const Or = 1, to = 2, lu = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var dt = null;
let ul = null, tt = null, bt = null, gr = null, so = 0;
function Qi(s, f) {
  const a = tt, p = dt, d = s.length === 0, m = d ? lu : {
    owned: null,
    cleanups: null,
    context: null,
    owner: f === void 0 ? p : f
  }, x = d ? s : () => s(() => vr(() => uo(m)));
  dt = m, tt = null;
  try {
    return ai(x, !0);
  } finally {
    tt = a, dt = p;
  }
}
function mn(s, f) {
  f = f ? Object.assign({}, eo, f) : eo;
  const a = {
    value: s,
    observers: null,
    observerSlots: null,
    comparator: f.equals || void 0
  }, p = (d) => (typeof d == "function" && (d = d(a.value)), su(a, d));
  return [au.bind(a), p];
}
function Rt(s, f, a) {
  const p = Ll(s, f, !1, Or);
  li(p);
}
function ro(s, f, a) {
  ou = Xc;
  const p = Ll(s, f, !1, Or);
  (!a || !a.render) && (p.user = !0), gr ? gr.push(p) : li(p);
}
function gl(s, f, a) {
  a = a ? Object.assign({}, eo, a) : eo;
  const p = Ll(s, f, !0, 0);
  return p.observers = null, p.observerSlots = null, p.comparator = a.equals || void 0, li(p), au.bind(p);
}
function vr(s) {
  if (tt === null)
    return s();
  const f = tt;
  tt = null;
  try {
    return s();
  } finally {
    tt = f;
  }
}
function oi(s) {
  ro(() => vr(s));
}
function Kc(s) {
  return dt === null || (dt.cleanups === null ? dt.cleanups = [s] : dt.cleanups.push(s)), s;
}
function Uc() {
  return dt;
}
function au() {
  if (this.sources && this.state)
    if (this.state === Or)
      li(this);
    else {
      const s = bt;
      bt = null, ai(() => io(this), !1), bt = s;
    }
  if (tt) {
    const s = this.observers ? this.observers.length : 0;
    tt.sources ? (tt.sources.push(this), tt.sourceSlots.push(s)) : (tt.sources = [this], tt.sourceSlots = [s]), this.observers ? (this.observers.push(tt), this.observerSlots.push(tt.sources.length - 1)) : (this.observers = [tt], this.observerSlots = [tt.sources.length - 1]);
  }
  return this.value;
}
function su(s, f, a) {
  let p = s.value;
  return (!s.comparator || !s.comparator(p, f)) && (s.value = f, s.observers && s.observers.length && ai(() => {
    for (let d = 0; d < s.observers.length; d += 1) {
      const m = s.observers[d], x = ul && ul.running;
      x && ul.disposed.has(m), (x ? !m.tState : !m.state) && (m.pure ? bt.push(m) : gr.push(m), m.observers && fu(m)), x || (m.state = Or);
    }
    if (bt.length > 1e6)
      throw bt = [], new Error();
  }, !1)), f;
}
function li(s) {
  if (!s.fn)
    return;
  uo(s);
  const f = dt, a = tt, p = so;
  tt = dt = s, Gc(s, s.value, p), tt = a, dt = f;
}
function Gc(s, f, a) {
  let p;
  try {
    p = s.fn(f);
  } catch (d) {
    return s.pure && (s.state = Or, s.owned && s.owned.forEach(uo), s.owned = null), s.updatedAt = a + 1, cu(d);
  }
  (!s.updatedAt || s.updatedAt <= a) && (s.updatedAt != null && "observers" in s ? su(s, p) : s.value = p, s.updatedAt = a);
}
function Ll(s, f, a, p = Or, d) {
  const m = {
    fn: s,
    state: p,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: f,
    owner: dt,
    context: null,
    pure: a
  };
  return dt === null || dt !== lu && (dt.owned ? dt.owned.push(m) : dt.owned = [m]), m;
}
function no(s) {
  if (s.state === 0)
    return;
  if (s.state === to)
    return io(s);
  if (s.suspense && vr(s.suspense.inFallback))
    return s.suspense.effects.push(s);
  const f = [s];
  for (; (s = s.owner) && (!s.updatedAt || s.updatedAt < so); )
    s.state && f.push(s);
  for (let a = f.length - 1; a >= 0; a--)
    if (s = f[a], s.state === Or)
      li(s);
    else if (s.state === to) {
      const p = bt;
      bt = null, ai(() => io(s, f[0]), !1), bt = p;
    }
}
function ai(s, f) {
  if (bt)
    return s();
  let a = !1;
  f || (bt = []), gr ? a = !0 : gr = [], so++;
  try {
    const p = s();
    return $c(a), p;
  } catch (p) {
    a || (gr = null), bt = null, cu(p);
  }
}
function $c(s) {
  if (bt && (uu(bt), bt = null), s)
    return;
  const f = gr;
  gr = null, f.length && ai(() => ou(f), !1);
}
function uu(s) {
  for (let f = 0; f < s.length; f++)
    no(s[f]);
}
function Xc(s) {
  let f, a = 0;
  for (f = 0; f < s.length; f++) {
    const p = s[f];
    p.user ? s[a++] = p : no(p);
  }
  for (f = 0; f < a; f++)
    no(s[f]);
}
function io(s, f) {
  s.state = 0;
  for (let a = 0; a < s.sources.length; a += 1) {
    const p = s.sources[a];
    if (p.sources) {
      const d = p.state;
      d === Or ? p !== f && (!p.updatedAt || p.updatedAt < so) && no(p) : d === to && io(p, f);
    }
  }
}
function fu(s) {
  for (let f = 0; f < s.observers.length; f += 1) {
    const a = s.observers[f];
    a.state || (a.state = to, a.pure ? bt.push(a) : gr.push(a), a.observers && fu(a));
  }
}
function uo(s) {
  let f;
  if (s.sources)
    for (; s.sources.length; ) {
      const a = s.sources.pop(), p = s.sourceSlots.pop(), d = a.observers;
      if (d && d.length) {
        const m = d.pop(), x = a.observerSlots.pop();
        p < d.length && (m.sourceSlots[x] = p, d[p] = m, a.observerSlots[p] = x);
      }
    }
  if (s.owned) {
    for (f = s.owned.length - 1; f >= 0; f--)
      uo(s.owned[f]);
    s.owned = null;
  }
  if (s.cleanups) {
    for (f = s.cleanups.length - 1; f >= 0; f--)
      s.cleanups[f]();
    s.cleanups = null;
  }
  s.state = 0, s.context = null;
}
function cu(s) {
  throw s;
}
const Yc = Symbol("fallback");
function Ds(s) {
  for (let f = 0; f < s.length; f++)
    s[f]();
}
function Zc(s, f, a = {}) {
  let p = [], d = [], m = [], x = 0, k = f.length > 1 ? [] : null;
  return Kc(() => Ds(m)), () => {
    let S = s() || [], T, w;
    return S[qc], vr(() => {
      let D = S.length, z, j, Y, re, P, F, N, H, K;
      if (D === 0)
        x !== 0 && (Ds(m), m = [], p = [], d = [], x = 0, k && (k = [])), a.fallback && (p = [Yc], d[0] = Qi(($) => (m[0] = $, a.fallback())), x = 1);
      else if (x === 0) {
        for (d = new Array(D), w = 0; w < D; w++)
          p[w] = S[w], d[w] = Qi(O);
        x = D;
      } else {
        for (Y = new Array(D), re = new Array(D), k && (P = new Array(D)), F = 0, N = Math.min(x, D); F < N && p[F] === S[F]; F++)
          ;
        for (N = x - 1, H = D - 1; N >= F && H >= F && p[N] === S[H]; N--, H--)
          Y[H] = d[N], re[H] = m[N], k && (P[H] = k[N]);
        for (z = /* @__PURE__ */ new Map(), j = new Array(H + 1), w = H; w >= F; w--)
          K = S[w], T = z.get(K), j[w] = T === void 0 ? -1 : T, z.set(K, w);
        for (T = F; T <= N; T++)
          K = p[T], w = z.get(K), w !== void 0 && w !== -1 ? (Y[w] = d[T], re[w] = m[T], k && (P[w] = k[T]), w = j[w], z.set(K, w)) : m[T]();
        for (w = F; w < D; w++)
          w in Y ? (d[w] = Y[w], m[w] = re[w], k && (k[w] = P[w], k[w](w))) : d[w] = Qi(O);
        d = d.slice(0, x = D), p = S.slice(0);
      }
      return d;
    });
    function O(D) {
      if (m[w] = D, k) {
        const [z, j] = mn(w);
        return k[w] = j, f(S[w], z);
      }
      return f(S[w]);
    }
  };
}
let Qc = !1;
function xt(s, f) {
  return vr(() => s(f || {}));
}
const Jc = (s) => `Stale read from <${s}>.`;
function hu(s) {
  const f = "fallback" in s && {
    fallback: () => s.fallback
  };
  return gl(Zc(() => s.each, s.children, f || void 0));
}
function Yi(s) {
  const f = s.keyed, a = gl(() => s.when, void 0, {
    equals: (p, d) => f ? p === d : !p == !d
  });
  return gl(() => {
    const p = a();
    if (p) {
      const d = s.children;
      return typeof d == "function" && d.length > 0 ? vr(() => d(f ? p : () => {
        if (!vr(a))
          throw Jc("Show");
        return s.when;
      })) : d;
    }
    return s.fallback;
  }, void 0, void 0);
}
const Vc = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], eh = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Vc]), th = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), rh = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), nh = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function ih(s, f) {
  const a = nh[s];
  return typeof a == "object" ? a[f] ? a.$ : void 0 : a;
}
const oh = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), lh = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function ah(s, f, a) {
  let p = a.length, d = f.length, m = p, x = 0, k = 0, S = f[d - 1].nextSibling, T = null;
  for (; x < d || k < m; ) {
    if (f[x] === a[k]) {
      x++, k++;
      continue;
    }
    for (; f[d - 1] === a[m - 1]; )
      d--, m--;
    if (d === x) {
      const w = m < p ? k ? a[k - 1].nextSibling : a[m - k] : S;
      for (; k < m; )
        s.insertBefore(a[k++], w);
    } else if (m === k)
      for (; x < d; )
        (!T || !T.has(f[x])) && f[x].remove(), x++;
    else if (f[x] === a[m - 1] && a[k] === f[d - 1]) {
      const w = f[--d].nextSibling;
      s.insertBefore(a[k++], f[x++].nextSibling), s.insertBefore(a[--m], w), f[d] = a[m];
    } else {
      if (!T) {
        T = /* @__PURE__ */ new Map();
        let O = k;
        for (; O < m; )
          T.set(a[O], O++);
      }
      const w = T.get(f[x]);
      if (w != null)
        if (k < w && w < m) {
          let O = x, D = 1, z;
          for (; ++O < d && O < m && !((z = T.get(f[O])) == null || z !== w + D); )
            D++;
          if (D > w - k) {
            const j = f[x];
            for (; k < w; )
              s.insertBefore(a[k++], j);
          } else
            s.replaceChild(a[k++], f[x++]);
        } else
          x++;
      else
        f[x++].remove();
    }
  }
}
const Ms = "_$DX_DELEGATE";
function sh(s, f, a, p = {}) {
  let d;
  return Qi((m) => {
    d = m, f === document ? s() : Mr(f, s(), f.firstChild ? null : void 0, a);
  }, p.owner), () => {
    d(), f.textContent = "";
  };
}
function xn(s, f, a) {
  let p;
  const d = () => {
    const x = document.createElement("template");
    return x.innerHTML = s, a ? x.content.firstChild.firstChild : x.content.firstChild;
  }, m = f ? () => (p || (p = d())).cloneNode(!0) : () => vr(() => document.importNode(p || (p = d()), !0));
  return m.cloneNode = m, m;
}
function du(s, f = window.document) {
  const a = f[Ms] || (f[Ms] = /* @__PURE__ */ new Set());
  for (let p = 0, d = s.length; p < d; p++) {
    const m = s[p];
    a.has(m) || (a.add(m), f.addEventListener(m, vh));
  }
}
function $t(s, f, a) {
  a == null ? s.removeAttribute(f) : s.setAttribute(f, a);
}
function uh(s, f, a, p) {
  p == null ? s.removeAttributeNS(f, a) : s.setAttributeNS(f, a, p);
}
function Ot(s, f) {
  f == null ? s.removeAttribute("class") : s.className = f;
}
function fh(s, f, a, p) {
  if (p)
    Array.isArray(a) ? (s[`$$${f}`] = a[0], s[`$$${f}Data`] = a[1]) : s[`$$${f}`] = a;
  else if (Array.isArray(a)) {
    const d = a[0];
    s.addEventListener(f, a[0] = (m) => d.call(s, a[1], m));
  } else
    s.addEventListener(f, a);
}
function ch(s, f, a = {}) {
  const p = Object.keys(f || {}), d = Object.keys(a);
  let m, x;
  for (m = 0, x = d.length; m < x; m++) {
    const k = d[m];
    !k || k === "undefined" || f[k] || (Es(s, k, !1), delete a[k]);
  }
  for (m = 0, x = p.length; m < x; m++) {
    const k = p[m], S = !!f[k];
    !k || k === "undefined" || a[k] === S || !S || (Es(s, k, !0), a[k] = S);
  }
  return a;
}
function hh(s, f, a) {
  if (!f)
    return a ? $t(s, "style") : f;
  const p = s.style;
  if (typeof f == "string")
    return p.cssText = f;
  typeof a == "string" && (p.cssText = a = void 0), a || (a = {}), f || (f = {});
  let d, m;
  for (m in a)
    f[m] == null && p.removeProperty(m), delete a[m];
  for (m in f)
    d = f[m], d !== a[m] && (p.setProperty(m, d), a[m] = d);
  return a;
}
function dh(s, f = {}, a, p) {
  const d = {};
  return p || Rt(() => d.children = yn(s, f.children, d.children)), Rt(() => f.ref && f.ref(s)), Rt(() => ph(s, f, a, !0, d, !0)), d;
}
function si(s, f, a) {
  return vr(() => s(f, a));
}
function Mr(s, f, a, p) {
  if (a !== void 0 && !p && (p = []), typeof f != "function")
    return yn(s, f, p, a);
  Rt((d) => yn(s, f(), d, a), p);
}
function ph(s, f, a, p, d = {}, m = !1) {
  f || (f = {});
  for (const x in d)
    if (!(x in f)) {
      if (x === "children")
        continue;
      d[x] = Os(s, x, null, d[x], a, m);
    }
  for (const x in f) {
    if (x === "children") {
      p || yn(s, f.children);
      continue;
    }
    const k = f[x];
    d[x] = Os(s, x, k, d[x], a, m);
  }
}
function gh(s) {
  return s.toLowerCase().replace(/-([a-z])/g, (f, a) => a.toUpperCase());
}
function Es(s, f, a) {
  const p = f.trim().split(/\s+/);
  for (let d = 0, m = p.length; d < m; d++)
    s.classList.toggle(p[d], a);
}
function Os(s, f, a, p, d, m) {
  let x, k, S, T, w;
  if (f === "style")
    return hh(s, a, p);
  if (f === "classList")
    return ch(s, a, p);
  if (a === p)
    return p;
  if (f === "ref")
    m || a(s);
  else if (f.slice(0, 3) === "on:") {
    const O = f.slice(3);
    p && s.removeEventListener(O, p), a && s.addEventListener(O, a);
  } else if (f.slice(0, 10) === "oncapture:") {
    const O = f.slice(10);
    p && s.removeEventListener(O, p, !0), a && s.addEventListener(O, a, !0);
  } else if (f.slice(0, 2) === "on") {
    const O = f.slice(2).toLowerCase(), D = oh.has(O);
    if (!D && p) {
      const z = Array.isArray(p) ? p[0] : p;
      s.removeEventListener(O, z);
    }
    (D || a) && (fh(s, O, a, D), D && du([O]));
  } else if (f.slice(0, 5) === "attr:")
    $t(s, f.slice(5), a);
  else if ((w = f.slice(0, 5) === "prop:") || (S = th.has(f)) || !d && ((T = ih(f, s.tagName)) || (k = eh.has(f))) || (x = s.nodeName.includes("-")))
    w && (f = f.slice(5), k = !0), f === "class" || f === "className" ? Ot(s, a) : x && !k && !S ? s[gh(f)] = a : s[T || f] = a;
  else {
    const O = d && f.indexOf(":") > -1 && lh[f.split(":")[0]];
    O ? uh(s, O, f, a) : $t(s, rh[f] || f, a);
  }
  return a;
}
function vh(s) {
  const f = `$$${s.type}`;
  let a = s.composedPath && s.composedPath()[0] || s.target;
  for (s.target !== a && Object.defineProperty(s, "target", {
    configurable: !0,
    value: a
  }), Object.defineProperty(s, "currentTarget", {
    configurable: !0,
    get() {
      return a || document;
    }
  }); a; ) {
    const p = a[f];
    if (p && !a.disabled) {
      const d = a[`${f}Data`];
      if (d !== void 0 ? p.call(a, d, s) : p.call(a, s), s.cancelBubble)
        return;
    }
    a = a._$host || a.parentNode || a.host;
  }
}
function yn(s, f, a, p, d) {
  for (; typeof a == "function"; )
    a = a();
  if (f === a)
    return a;
  const m = typeof f, x = p !== void 0;
  if (s = x && a[0] && a[0].parentNode || s, m === "string" || m === "number")
    if (m === "number" && (f = f.toString()), x) {
      let k = a[0];
      k && k.nodeType === 3 ? k.data = f : k = document.createTextNode(f), a = vn(s, a, p, k);
    } else
      a !== "" && typeof a == "string" ? a = s.firstChild.data = f : a = s.textContent = f;
  else if (f == null || m === "boolean")
    a = vn(s, a, p);
  else {
    if (m === "function")
      return Rt(() => {
        let k = f();
        for (; typeof k == "function"; )
          k = k();
        a = yn(s, k, a, p);
      }), () => a;
    if (Array.isArray(f)) {
      const k = [], S = a && Array.isArray(a);
      if (vl(k, f, a, d))
        return Rt(() => a = yn(s, k, a, p, !0)), () => a;
      if (k.length === 0) {
        if (a = vn(s, a, p), x)
          return a;
      } else
        S ? a.length === 0 ? Is(s, k, p) : ah(s, a, k) : (a && vn(s), Is(s, k));
      a = k;
    } else if (f instanceof Node) {
      if (Array.isArray(a)) {
        if (x)
          return a = vn(s, a, p, f);
        vn(s, a, null, f);
      } else
        a == null || a === "" || !s.firstChild ? s.appendChild(f) : s.replaceChild(f, s.firstChild);
      a = f;
    } else
      console.warn("Unrecognized value. Skipped inserting", f);
  }
  return a;
}
function vl(s, f, a, p) {
  let d = !1;
  for (let m = 0, x = f.length; m < x; m++) {
    let k = f[m], S = a && a[m];
    if (k instanceof Node)
      s.push(k);
    else if (!(k == null || k === !0 || k === !1))
      if (Array.isArray(k))
        d = vl(s, k, S) || d;
      else if (typeof k == "function")
        if (p) {
          for (; typeof k == "function"; )
            k = k();
          d = vl(s, Array.isArray(k) ? k : [k], Array.isArray(S) ? S : [S]) || d;
        } else
          s.push(k), d = !0;
      else {
        const T = String(k);
        S && S.nodeType === 3 ? (S.data = T, s.push(S)) : s.push(document.createTextNode(T));
      }
  }
  return d;
}
function Is(s, f, a = null) {
  for (let p = 0, d = f.length; p < d; p++)
    s.insertBefore(f[p], a);
}
function vn(s, f, a, p) {
  if (a === void 0)
    return s.textContent = "";
  const d = p || document.createTextNode("");
  if (f.length) {
    let m = !1;
    for (let x = f.length - 1; x >= 0; x--) {
      const k = f[x];
      if (d !== k) {
        const S = k.parentNode === s;
        !m && !x ? S ? s.replaceChild(d, k) : s.insertBefore(d, a) : S && k.remove();
      } else
        m = !0;
    }
  } else
    s.insertBefore(d, a);
  return [d];
}
var mh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, fl = { exports: {} }, Ns;
function Bt() {
  return Ns || (Ns = 1, function(s, f) {
    (function(a, p) {
      s.exports = p();
    })(mh, function() {
      var a = navigator.userAgent, p = navigator.platform, d = /gecko\/\d/i.test(a), m = /MSIE \d/.test(a), x = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(a), k = /Edge\/(\d+)/.exec(a), S = m || x || k, T = S && (m ? document.documentMode || 6 : +(k || x)[1]), w = !k && /WebKit\//.test(a), O = w && /Qt\/\d+\.\d+/.test(a), D = !k && /Chrome\/(\d+)/.exec(a), z = D && +D[1], j = /Opera\//.test(a), Y = /Apple Computer/.test(navigator.vendor), re = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(a), P = /PhantomJS/.test(a), F = Y && (/Mobile\/\w+/.test(a) || navigator.maxTouchPoints > 2), N = /Android/.test(a), H = F || N || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(a), K = F || /Mac/.test(p), $ = /\bCrOS\b/.test(a), le = /win/i.test(p), G = j && a.match(/Version\/(\d*\.\d*)/);
      G && (G = Number(G[1])), G && G >= 15 && (j = !1, w = !0);
      var pe = K && (O || j && (G == null || G < 12.11)), ie = d || S && T >= 9;
      function ue(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
      }
      var Ae = function(e, t) {
        var n = e.className, r = ue(t).exec(n);
        if (r) {
          var i = n.slice(r.index + r[0].length);
          e.className = n.slice(0, r.index) + (i ? r[1] + i : "");
        }
      };
      function q(e) {
        for (var t = e.childNodes.length; t > 0; --t)
          e.removeChild(e.firstChild);
        return e;
      }
      function J(e, t) {
        return q(e).appendChild(t);
      }
      function y(e, t, n, r) {
        var i = document.createElement(e);
        if (n && (i.className = n), r && (i.style.cssText = r), typeof t == "string")
          i.appendChild(document.createTextNode(t));
        else if (t)
          for (var o = 0; o < t.length; ++o)
            i.appendChild(t[o]);
        return i;
      }
      function V(e, t, n, r) {
        var i = y(e, t, n, r);
        return i.setAttribute("role", "presentation"), i;
      }
      var X;
      document.createRange ? X = function(e, t, n, r) {
        var i = document.createRange();
        return i.setEnd(r || e, n), i.setStart(e, t), i;
      } : X = function(e, t, n) {
        var r = document.body.createTextRange();
        try {
          r.moveToElementText(e.parentNode);
        } catch {
          return r;
        }
        return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r;
      };
      function ce(e, t) {
        if (t.nodeType == 3 && (t = t.parentNode), e.contains)
          return e.contains(t);
        do
          if (t.nodeType == 11 && (t = t.host), t == e)
            return !0;
        while (t = t.parentNode);
      }
      function A(e) {
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
      function v(e, t) {
        var n = e.className;
        ue(t).test(n) || (e.className += (n ? " " : "") + t);
      }
      function ae(e, t) {
        for (var n = e.split(" "), r = 0; r < n.length; r++)
          n[r] && !ue(n[r]).test(t) && (t += " " + n[r]);
        return t;
      }
      var Me = function(e) {
        e.select();
      };
      F ? Me = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : S && (Me = function(e) {
        try {
          e.select();
        } catch {
        }
      });
      function ge(e) {
        return e.display.wrapper.ownerDocument;
      }
      function je(e) {
        return ge(e).defaultView;
      }
      function Pe(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
          return e.apply(null, t);
        };
      }
      function me(e, t, n) {
        t || (t = {});
        for (var r in e)
          e.hasOwnProperty(r) && (n !== !1 || !t.hasOwnProperty(r)) && (t[r] = e[r]);
        return t;
      }
      function fe(e, t, n, r, i) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var o = r || 0, l = i || 0; ; ) {
          var u = e.indexOf("	", o);
          if (u < 0 || u >= t)
            return l + (t - o);
          l += u - o, l += n - l % n, o = u + 1;
        }
      }
      var be = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = Pe(this.onTimeout, this);
      };
      be.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +new Date() ? e.f() : setTimeout(e.handler, e.time - +new Date());
      }, be.prototype.set = function(e, t) {
        this.f = t;
        var n = +new Date() + e;
        (!this.id || n < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = n);
      };
      function de(e, t) {
        for (var n = 0; n < e.length; ++n)
          if (e[n] == t)
            return n;
        return -1;
      }
      var xe = 50, we = { toString: function() {
        return "CodeMirror.Pass";
      } }, Be = { scroll: !1 }, wt = { origin: "*mouse" }, st = { origin: "+move" };
      function Je(e, t, n) {
        for (var r = 0, i = 0; ; ) {
          var o = e.indexOf("	", r);
          o == -1 && (o = e.length);
          var l = o - r;
          if (o == e.length || i + l >= t)
            return r + Math.min(l, t - i);
          if (i += o - r, i += n - i % n, r = o + 1, i >= t)
            return r;
        }
      }
      var Fe = [""];
      function _e(e) {
        for (; Fe.length <= e; )
          Fe.push(ke(Fe) + " ");
        return Fe[e];
      }
      function ke(e) {
        return e[e.length - 1];
      }
      function Ye(e, t) {
        for (var n = [], r = 0; r < e.length; r++)
          n[r] = t(e[r], r);
        return n;
      }
      function ir(e, t, n) {
        for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i; )
          r++;
        e.splice(r, 0, t);
      }
      function ze() {
      }
      function B(e, t) {
        var n;
        return Object.create ? n = Object.create(e) : (ze.prototype = e, n = new ze()), t && me(t, n), n;
      }
      var Q = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function R(e) {
        return /\w/.test(e) || e > "\x80" && (e.toUpperCase() != e.toLowerCase() || Q.test(e));
      }
      function Te(e, t) {
        return t ? t.source.indexOf("\\w") > -1 && R(e) ? !0 : t.test(e) : R(e);
      }
      function pt(e) {
        for (var t in e)
          if (e.hasOwnProperty(t) && e[t])
            return !1;
        return !0;
      }
      var Gr = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function bn(e) {
        return e.charCodeAt(0) >= 768 && Gr.test(e);
      }
      function Yt(e, t, n) {
        for (; (n < 0 ? t > 0 : t < e.length) && bn(e.charAt(t)); )
          t += n;
        return t;
      }
      function Ke(e, t, n) {
        for (var r = t > n ? -1 : 1; ; ) {
          if (t == n)
            return t;
          var i = (t + n) / 2, o = r < 0 ? Math.ceil(i) : Math.floor(i);
          if (o == t)
            return e(o) ? t : n;
          e(o) ? n = o : t = o + r;
        }
      }
      function Ir(e, t, n, r) {
        if (!e)
          return r(t, n, "ltr", 0);
        for (var i = !1, o = 0; o < e.length; ++o) {
          var l = e[o];
          (l.from < n && l.to > t || t == n && l.to == t) && (r(Math.max(l.from, t), Math.min(l.to, n), l.level == 1 ? "rtl" : "ltr", o), i = !0);
        }
        i || r(t, n, "ltr");
      }
      var Zt = null;
      function Ht(e, t, n) {
        var r;
        Zt = null;
        for (var i = 0; i < e.length; ++i) {
          var o = e[i];
          if (o.from < t && o.to > t)
            return i;
          o.to == t && (o.from != o.to && n == "before" ? r = i : Zt = i), o.from == t && (o.from != o.to && n != "before" ? r = i : Zt = i);
        }
        return r != null ? r : Zt;
      }
      var ho = function() {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function n(h) {
          return h <= 247 ? e.charAt(h) : 1424 <= h && h <= 1524 ? "R" : 1536 <= h && h <= 1785 ? t.charAt(h - 1536) : 1774 <= h && h <= 2220 ? "r" : 8192 <= h && h <= 8203 ? "w" : h == 8204 ? "b" : "L";
        }
        var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, i = /[stwN]/, o = /[LRr]/, l = /[Lb1n]/, u = /[1n]/;
        function c(h, b, C) {
          this.level = h, this.from = b, this.to = C;
        }
        return function(h, b) {
          var C = b == "ltr" ? "L" : "R";
          if (h.length == 0 || b == "ltr" && !r.test(h))
            return !1;
          for (var I = h.length, E = [], _ = 0; _ < I; ++_)
            E.push(n(h.charCodeAt(_)));
          for (var U = 0, Z = C; U < I; ++U) {
            var ee = E[U];
            ee == "m" ? E[U] = Z : Z = ee;
          }
          for (var oe = 0, te = C; oe < I; ++oe) {
            var se = E[oe];
            se == "1" && te == "r" ? E[oe] = "n" : o.test(se) && (te = se, se == "r" && (E[oe] = "R"));
          }
          for (var ye = 1, ve = E[0]; ye < I - 1; ++ye) {
            var Le = E[ye];
            Le == "+" && ve == "1" && E[ye + 1] == "1" ? E[ye] = "1" : Le == "," && ve == E[ye + 1] && (ve == "1" || ve == "n") && (E[ye] = ve), ve = Le;
          }
          for (var He = 0; He < I; ++He) {
            var ot = E[He];
            if (ot == ",")
              E[He] = "N";
            else if (ot == "%") {
              var qe = void 0;
              for (qe = He + 1; qe < I && E[qe] == "%"; ++qe)
                ;
              for (var Et = He && E[He - 1] == "!" || qe < I && E[qe] == "1" ? "1" : "N", Lt = He; Lt < qe; ++Lt)
                E[Lt] = Et;
              He = qe - 1;
            }
          }
          for (var Ze = 0, Tt = C; Ze < I; ++Ze) {
            var at = E[Ze];
            Tt == "L" && at == "1" ? E[Ze] = "L" : o.test(at) && (Tt = at);
          }
          for (var et = 0; et < I; ++et)
            if (i.test(E[et])) {
              var Qe = void 0;
              for (Qe = et + 1; Qe < I && i.test(E[Qe]); ++Qe)
                ;
              for (var $e = (et ? E[et - 1] : C) == "L", At = (Qe < I ? E[Qe] : C) == "L", pn = $e == At ? $e ? "L" : "R" : C, Dr = et; Dr < Qe; ++Dr)
                E[Dr] = pn;
              et = Qe - 1;
            }
          for (var ht = [], nr, lt = 0; lt < I; )
            if (l.test(E[lt])) {
              var al = lt;
              for (++lt; lt < I && l.test(E[lt]); ++lt)
                ;
              ht.push(new c(0, al, lt));
            } else {
              var pr = lt, qr = ht.length, Kr = b == "rtl" ? 1 : 0;
              for (++lt; lt < I && E[lt] != "L"; ++lt)
                ;
              for (var yt = pr; yt < lt; )
                if (u.test(E[yt])) {
                  pr < yt && (ht.splice(qr, 0, new c(1, pr, yt)), qr += Kr);
                  var gn = yt;
                  for (++yt; yt < lt && u.test(E[yt]); ++yt)
                    ;
                  ht.splice(qr, 0, new c(2, gn, yt)), qr += Kr, pr = yt;
                } else
                  ++yt;
              pr < lt && ht.splice(qr, 0, new c(1, pr, lt));
            }
          return b == "ltr" && (ht[0].level == 1 && (nr = h.match(/^\s+/)) && (ht[0].from = nr[0].length, ht.unshift(new c(0, 0, nr[0].length))), ke(ht).level == 1 && (nr = h.match(/\s+$/)) && (ke(ht).to -= nr[0].length, ht.push(new c(0, I - nr[0].length, I)))), b == "rtl" ? ht.reverse() : ht;
        };
      }();
      function zt(e, t) {
        var n = e.order;
        return n == null && (n = e.order = ho(e.text, t)), n;
      }
      var hi = [], ne = function(e, t, n) {
        if (e.addEventListener)
          e.addEventListener(t, n, !1);
        else if (e.attachEvent)
          e.attachEvent("on" + t, n);
        else {
          var r = e._handlers || (e._handlers = {});
          r[t] = (r[t] || hi).concat(n);
        }
      };
      function wn(e, t) {
        return e._handlers && e._handlers[t] || hi;
      }
      function ut(e, t, n) {
        if (e.removeEventListener)
          e.removeEventListener(t, n, !1);
        else if (e.detachEvent)
          e.detachEvent("on" + t, n);
        else {
          var r = e._handlers, i = r && r[t];
          if (i) {
            var o = de(i, n);
            o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)));
          }
        }
      }
      function We(e, t) {
        var n = wn(e, t);
        if (!!n.length)
          for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i)
            n[i].apply(null, r);
      }
      function Ue(e, t, n) {
        return typeof t == "string" && (t = { type: t, preventDefault: function() {
          this.defaultPrevented = !0;
        } }), We(e, n || t.type, e, t), kn(t) || t.codemirrorIgnore;
      }
      function di(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (!!t)
          for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r)
            de(n, t[r]) == -1 && n.push(t[r]);
      }
      function gt(e, t) {
        return wn(e, t).length > 0;
      }
      function vt(e) {
        e.prototype.on = function(t, n) {
          ne(this, t, n);
        }, e.prototype.off = function(t, n) {
          ut(this, t, n);
        };
      }
      function ft(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }
      function Nr(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }
      function kn(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == !1;
      }
      function or(e) {
        ft(e), Nr(e);
      }
      function kt(e) {
        return e.target || e.srcElement;
      }
      function Sn(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), K && e.ctrlKey && t == 1 && (t = 3), t;
      }
      var po = function() {
        if (S && T < 9)
          return !1;
        var e = y("div");
        return "draggable" in e || "dragDrop" in e;
      }(), Wt;
      function go(e) {
        if (Wt == null) {
          var t = y("span", "\u200B");
          J(e, y("span", [t, document.createTextNode("x")])), e.firstChild.offsetHeight != 0 && (Wt = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(S && T < 8));
        }
        var n = Wt ? y("span", "\u200B") : y("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
        return n.setAttribute("cm-text", ""), n;
      }
      var $r;
      function pi(e) {
        if ($r != null)
          return $r;
        var t = J(e, document.createTextNode("A\u062EA")), n = X(t, 0, 1).getBoundingClientRect(), r = X(t, 1, 2).getBoundingClientRect();
        return q(e), !n || n.left == n.right ? !1 : $r = r.right - n.right < 3;
      }
      var Cn = `

b`.split(/\n/).length != 3 ? function(e) {
        for (var t = 0, n = [], r = e.length; t <= r; ) {
          var i = e.indexOf(`
`, t);
          i == -1 && (i = e.length);
          var o = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i), l = o.indexOf("\r");
          l != -1 ? (n.push(o.slice(0, l)), t += l + 1) : (n.push(o), t = i + 1);
        }
        return n;
      } : function(e) {
        return e.split(/\r\n?|\n/);
      }, mr = window.getSelection ? function(e) {
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
      }, Qt = function() {
        var e = y("div");
        return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), typeof e.oncopy == "function");
      }(), Jt = null;
      function gi(e) {
        if (Jt != null)
          return Jt;
        var t = J(e, y("span", "x")), n = t.getBoundingClientRect(), r = X(t, 0, 1).getBoundingClientRect();
        return Jt = Math.abs(n.left - r.left) > 1;
      }
      var jt = {}, yr = {};
      function vi(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), jt[e] = t;
      }
      function Xr(e, t) {
        yr[e] = t;
      }
      function Dt(e) {
        if (typeof e == "string" && yr.hasOwnProperty(e))
          e = yr[e];
        else if (e && typeof e.name == "string" && yr.hasOwnProperty(e.name)) {
          var t = yr[e.name];
          typeof t == "string" && (t = { name: t }), e = B(t, e), e.name = t.name;
        } else {
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
            return Dt("application/xml");
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
            return Dt("application/json");
        }
        return typeof e == "string" ? { name: e } : e || { name: "null" };
      }
      function lr(e, t) {
        t = Dt(t);
        var n = jt[t.name];
        if (!n)
          return lr(e, "text/plain");
        var r = n(e, t);
        if (xr.hasOwnProperty(t.name)) {
          var i = xr[t.name];
          for (var o in i)
            !i.hasOwnProperty(o) || (r.hasOwnProperty(o) && (r["_" + o] = r[o]), r[o] = i[o]);
        }
        if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
          for (var l in t.modeProps)
            r[l] = t.modeProps[l];
        return r;
      }
      var xr = {};
      function mi(e, t) {
        var n = xr.hasOwnProperty(e) ? xr[e] : xr[e] = {};
        me(t, n);
      }
      function ar(e, t) {
        if (t === !0)
          return t;
        if (e.copyState)
          return e.copyState(t);
        var n = {};
        for (var r in t) {
          var i = t[r];
          i instanceof Array && (i = i.concat([])), n[r] = i;
        }
        return n;
      }
      function br(e, t) {
        for (var n; e.innerMode && (n = e.innerMode(t), !(!n || n.mode == e)); )
          t = n.state, e = n.mode;
        return n || { mode: e, state: t };
      }
      function Ln(e, t, n) {
        return e.startState ? e.startState(t, n) : !0;
      }
      var Ge = function(e, t, n) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = n;
      };
      Ge.prototype.eol = function() {
        return this.pos >= this.string.length;
      }, Ge.prototype.sol = function() {
        return this.pos == this.lineStart;
      }, Ge.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      }, Ge.prototype.next = function() {
        if (this.pos < this.string.length)
          return this.string.charAt(this.pos++);
      }, Ge.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos), n;
        if (typeof e == "string" ? n = t == e : n = t && (e.test ? e.test(t) : e(t)), n)
          return ++this.pos, t;
      }, Ge.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e); )
          ;
        return this.pos > t;
      }, Ge.prototype.eatSpace = function() {
        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
          ++this.pos;
        return this.pos > e;
      }, Ge.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      }, Ge.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1)
          return this.pos = t, !0;
      }, Ge.prototype.backUp = function(e) {
        this.pos -= e;
      }, Ge.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = fe(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? fe(this.string, this.lineStart, this.tabSize) : 0);
      }, Ge.prototype.indentation = function() {
        return fe(this.string, null, this.tabSize) - (this.lineStart ? fe(this.string, this.lineStart, this.tabSize) : 0);
      }, Ge.prototype.match = function(e, t, n) {
        if (typeof e == "string") {
          var r = function(l) {
            return n ? l.toLowerCase() : l;
          }, i = this.string.substr(this.pos, e.length);
          if (r(i) == r(e))
            return t !== !1 && (this.pos += e.length), !0;
        } else {
          var o = this.string.slice(this.pos).match(e);
          return o && o.index > 0 ? null : (o && t !== !1 && (this.pos += o[0].length), o);
        }
      }, Ge.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      }, Ge.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      }, Ge.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
      }, Ge.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
      };
      function he(e, t) {
        if (t -= e.first, t < 0 || t >= e.size)
          throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; !n.lines; )
          for (var r = 0; ; ++r) {
            var i = n.children[r], o = i.chunkSize();
            if (t < o) {
              n = i;
              break;
            }
            t -= o;
          }
        return n.lines[t];
      }
      function sr(e, t, n) {
        var r = [], i = t.line;
        return e.iter(t.line, n.line + 1, function(o) {
          var l = o.text;
          i == n.line && (l = l.slice(0, n.ch)), i == t.line && (l = l.slice(t.ch)), r.push(l), ++i;
        }), r;
      }
      function Yr(e, t, n) {
        var r = [];
        return e.iter(t, n, function(i) {
          r.push(i.text);
        }), r;
      }
      function _t(e, t) {
        var n = t - e.height;
        if (n)
          for (var r = e; r; r = r.parent)
            r.height += n;
      }
      function Oe(e) {
        if (e.parent == null)
          return null;
        for (var t = e.parent, n = de(t.lines, e), r = t.parent; r; t = r, r = r.parent)
          for (var i = 0; r.children[i] != t; ++i)
            n += r.children[i].chunkSize();
        return n + t.first;
      }
      function Vt(e, t) {
        var n = e.first;
        e:
          do {
            for (var r = 0; r < e.children.length; ++r) {
              var i = e.children[r], o = i.height;
              if (t < o) {
                e = i;
                continue e;
              }
              t -= o, n += i.chunkSize();
            }
            return n;
          } while (!e.lines);
        for (var l = 0; l < e.lines.length; ++l) {
          var u = e.lines[l], c = u.height;
          if (t < c)
            break;
          t -= c;
        }
        return n + l;
      }
      function g(e, t) {
        return t >= e.first && t < e.first + e.size;
      }
      function L(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }
      function M(e, t, n) {
        if (n === void 0 && (n = null), !(this instanceof M))
          return new M(e, t, n);
        this.line = e, this.ch = t, this.sticky = n;
      }
      function W(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }
      function Se(e, t) {
        return e.sticky == t.sticky && W(e, t) == 0;
      }
      function De(e) {
        return M(e.line, e.ch);
      }
      function Ee(e, t) {
        return W(e, t) < 0 ? t : e;
      }
      function Ve(e, t) {
        return W(e, t) < 0 ? e : t;
      }
      function It(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }
      function Ce(e, t) {
        if (t.line < e.first)
          return M(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? M(n, he(e, n).text.length) : _u(t, he(e, t.line).text.length);
      }
      function _u(e, t) {
        var n = e.ch;
        return n == null || n > t ? M(e.line, t) : n < 0 ? M(e.line, 0) : e;
      }
      function El(e, t) {
        for (var n = [], r = 0; r < t.length; r++)
          n[r] = Ce(e, t[r]);
        return n;
      }
      var yi = function(e, t) {
        this.state = e, this.lookAhead = t;
      }, er = function(e, t, n, r) {
        this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1;
      };
      er.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
      }, er.prototype.baseToken = function(e) {
        if (!this.baseTokens)
          return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; )
          this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: t && t.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - e
        };
      }, er.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }, er.fromSaved = function(e, t, n) {
        return t instanceof yi ? new er(e, ar(e.mode, t.state), n, t.lookAhead) : new er(e, ar(e.mode, t), n);
      }, er.prototype.save = function(e) {
        var t = e !== !1 ? ar(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new yi(t, this.maxLookAhead) : t;
      };
      function Ol(e, t, n, r) {
        var i = [e.state.modeGen], o = {};
        zl(
          e,
          t.text,
          e.doc.mode,
          n,
          function(h, b) {
            return i.push(h, b);
          },
          o,
          r
        );
        for (var l = n.state, u = function(h) {
          n.baseTokens = i;
          var b = e.state.overlays[h], C = 1, I = 0;
          n.state = !0, zl(e, t.text, b.mode, n, function(E, _) {
            for (var U = C; I < E; ) {
              var Z = i[C];
              Z > E && i.splice(C, 1, E, i[C + 1], Z), C += 2, I = Math.min(E, Z);
            }
            if (!!_)
              if (b.opaque)
                i.splice(U, C - U, E, "overlay " + _), C = U + 2;
              else
                for (; U < C; U += 2) {
                  var ee = i[U + 1];
                  i[U + 1] = (ee ? ee + " " : "") + "overlay " + _;
                }
          }, o), n.state = l, n.baseTokens = null, n.baseTokenPos = 1;
        }, c = 0; c < e.state.overlays.length; ++c)
          u(c);
        return { styles: i, classes: o.bgClass || o.textClass ? o : null };
      }
      function Il(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var r = Tn(e, Oe(t)), i = t.text.length > e.options.maxHighlightLength && ar(e.doc.mode, r.state), o = Ol(e, t, r);
          i && (r.state = i), t.stateAfter = r.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        }
        return t.styles;
      }
      function Tn(e, t, n) {
        var r = e.doc, i = e.display;
        if (!r.mode.startState)
          return new er(r, !0, t);
        var o = Ru(e, t, n), l = o > r.first && he(r, o - 1).stateAfter, u = l ? er.fromSaved(r, l, o) : new er(r, Ln(r.mode), o);
        return r.iter(o, t, function(c) {
          vo(e, c.text, u);
          var h = u.line;
          c.stateAfter = h == t - 1 || h % 5 == 0 || h >= i.viewFrom && h < i.viewTo ? u.save() : null, u.nextLine();
        }), n && (r.modeFrontier = u.line), u;
      }
      function vo(e, t, n, r) {
        var i = e.doc.mode, o = new Ge(t, e.options.tabSize, n);
        for (o.start = o.pos = r || 0, t == "" && Nl(i, n.state); !o.eol(); )
          mo(i, o, n.state), o.start = o.pos;
      }
      function Nl(e, t) {
        if (e.blankLine)
          return e.blankLine(t);
        if (!!e.innerMode) {
          var n = br(e, t);
          if (n.mode.blankLine)
            return n.mode.blankLine(n.state);
        }
      }
      function mo(e, t, n, r) {
        for (var i = 0; i < 10; i++) {
          r && (r[0] = br(e, n).mode);
          var o = e.token(t, n);
          if (t.pos > t.start)
            return o;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
      }
      var Pl = function(e, t, n) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = n;
      };
      function Bl(e, t, n, r) {
        var i = e.doc, o = i.mode, l;
        t = Ce(i, t);
        var u = he(i, t.line), c = Tn(e, t.line, n), h = new Ge(u.text, e.options.tabSize, c), b;
        for (r && (b = []); (r || h.pos < t.ch) && !h.eol(); )
          h.start = h.pos, l = mo(o, h, c.state), r && b.push(new Pl(h, l, ar(i.mode, c.state)));
        return r ? b : new Pl(h, l, c.state);
      }
      function Hl(e, t) {
        if (e)
          for (; ; ) {
            var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!n)
              break;
            e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
            var r = n[1] ? "bgClass" : "textClass";
            t[r] == null ? t[r] = n[2] : new RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + n[2]);
          }
        return e;
      }
      function zl(e, t, n, r, i, o, l) {
        var u = n.flattenSpans;
        u == null && (u = e.options.flattenSpans);
        var c = 0, h = null, b = new Ge(t, e.options.tabSize, r), C, I = e.options.addModeClass && [null];
        for (t == "" && Hl(Nl(n, r.state), o); !b.eol(); ) {
          if (b.pos > e.options.maxHighlightLength ? (u = !1, l && vo(e, t, r, b.pos), b.pos = t.length, C = null) : C = Hl(mo(n, b, r.state, I), o), I) {
            var E = I[0].name;
            E && (C = "m-" + (C ? E + " " + C : E));
          }
          if (!u || h != C) {
            for (; c < b.start; )
              c = Math.min(b.start, c + 5e3), i(c, h);
            h = C;
          }
          b.start = b.pos;
        }
        for (; c < b.pos; ) {
          var _ = Math.min(b.pos, c + 5e3);
          i(_, h), c = _;
        }
      }
      function Ru(e, t, n) {
        for (var r, i, o = e.doc, l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), u = t; u > l; --u) {
          if (u <= o.first)
            return o.first;
          var c = he(o, u - 1), h = c.stateAfter;
          if (h && (!n || u + (h instanceof yi ? h.lookAhead : 0) <= o.modeFrontier))
            return u;
          var b = fe(c.text, null, e.options.tabSize);
          (i == null || r > b) && (i = u - 1, r = b);
        }
        return i;
      }
      function ju(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
          for (var n = e.first, r = t - 1; r > n; r--) {
            var i = he(e, r).stateAfter;
            if (i && (!(i instanceof yi) || r + i.lookAhead < t)) {
              n = r + 1;
              break;
            }
          }
          e.highlightFrontier = Math.min(e.highlightFrontier, n);
        }
      }
      var Wl = !1, ur = !1;
      function qu() {
        Wl = !0;
      }
      function Ku() {
        ur = !0;
      }
      function xi(e, t, n) {
        this.marker = e, this.from = t, this.to = n;
      }
      function An(e, t) {
        if (e)
          for (var n = 0; n < e.length; ++n) {
            var r = e[n];
            if (r.marker == t)
              return r;
          }
      }
      function Uu(e, t) {
        for (var n, r = 0; r < e.length; ++r)
          e[r] != t && (n || (n = [])).push(e[r]);
        return n;
      }
      function Gu(e, t, n) {
        var r = n && window.WeakSet && (n.markedSpans || (n.markedSpans = /* @__PURE__ */ new WeakSet()));
        r && e.markedSpans && r.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], r && r.add(e.markedSpans)), t.marker.attachLine(e);
      }
      function $u(e, t, n) {
        var r;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], l = o.marker, u = o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
            if (u || o.from == t && l.type == "bookmark" && (!n || !o.marker.insertLeft)) {
              var c = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
              (r || (r = [])).push(new xi(l, o.from, c ? null : o.to));
            }
          }
        return r;
      }
      function Xu(e, t, n) {
        var r;
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var o = e[i], l = o.marker, u = o.to == null || (l.inclusiveRight ? o.to >= t : o.to > t);
            if (u || o.from == t && l.type == "bookmark" && (!n || o.marker.insertLeft)) {
              var c = o.from == null || (l.inclusiveLeft ? o.from <= t : o.from < t);
              (r || (r = [])).push(new xi(
                l,
                c ? null : o.from - t,
                o.to == null ? null : o.to - t
              ));
            }
          }
        return r;
      }
      function yo(e, t) {
        if (t.full)
          return null;
        var n = g(e, t.from.line) && he(e, t.from.line).markedSpans, r = g(e, t.to.line) && he(e, t.to.line).markedSpans;
        if (!n && !r)
          return null;
        var i = t.from.ch, o = t.to.ch, l = W(t.from, t.to) == 0, u = $u(n, i, l), c = Xu(r, o, l), h = t.text.length == 1, b = ke(t.text).length + (h ? i : 0);
        if (u)
          for (var C = 0; C < u.length; ++C) {
            var I = u[C];
            if (I.to == null) {
              var E = An(c, I.marker);
              E ? h && (I.to = E.to == null ? null : E.to + b) : I.to = i;
            }
          }
        if (c)
          for (var _ = 0; _ < c.length; ++_) {
            var U = c[_];
            if (U.to != null && (U.to += b), U.from == null) {
              var Z = An(u, U.marker);
              Z || (U.from = b, h && (u || (u = [])).push(U));
            } else
              U.from += b, h && (u || (u = [])).push(U);
          }
        u && (u = _l(u)), c && c != u && (c = _l(c));
        var ee = [u];
        if (!h) {
          var oe = t.text.length - 2, te;
          if (oe > 0 && u)
            for (var se = 0; se < u.length; ++se)
              u[se].to == null && (te || (te = [])).push(new xi(u[se].marker, null, null));
          for (var ye = 0; ye < oe; ++ye)
            ee.push(te);
          ee.push(c);
        }
        return ee;
      }
      function _l(e) {
        for (var t = 0; t < e.length; ++t) {
          var n = e[t];
          n.from != null && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
        }
        return e.length ? e : null;
      }
      function Yu(e, t, n) {
        var r = null;
        if (e.iter(t.line, n.line + 1, function(E) {
          if (E.markedSpans)
            for (var _ = 0; _ < E.markedSpans.length; ++_) {
              var U = E.markedSpans[_].marker;
              U.readOnly && (!r || de(r, U) == -1) && (r || (r = [])).push(U);
            }
        }), !r)
          return null;
        for (var i = [{ from: t, to: n }], o = 0; o < r.length; ++o)
          for (var l = r[o], u = l.find(0), c = 0; c < i.length; ++c) {
            var h = i[c];
            if (!(W(h.to, u.from) < 0 || W(h.from, u.to) > 0)) {
              var b = [c, 1], C = W(h.from, u.from), I = W(h.to, u.to);
              (C < 0 || !l.inclusiveLeft && !C) && b.push({ from: h.from, to: u.from }), (I > 0 || !l.inclusiveRight && !I) && b.push({ from: u.to, to: h.to }), i.splice.apply(i, b), c += b.length - 3;
            }
          }
        return i;
      }
      function Rl(e) {
        var t = e.markedSpans;
        if (!!t) {
          for (var n = 0; n < t.length; ++n)
            t[n].marker.detachLine(e);
          e.markedSpans = null;
        }
      }
      function jl(e, t) {
        if (!!t) {
          for (var n = 0; n < t.length; ++n)
            t[n].marker.attachLine(e);
          e.markedSpans = t;
        }
      }
      function bi(e) {
        return e.inclusiveLeft ? -1 : 0;
      }
      function wi(e) {
        return e.inclusiveRight ? 1 : 0;
      }
      function xo(e, t) {
        var n = e.lines.length - t.lines.length;
        if (n != 0)
          return n;
        var r = e.find(), i = t.find(), o = W(r.from, i.from) || bi(e) - bi(t);
        if (o)
          return -o;
        var l = W(r.to, i.to) || wi(e) - wi(t);
        return l || t.id - e.id;
      }
      function ql(e, t) {
        var n = ur && e.markedSpans, r;
        if (n)
          for (var i = void 0, o = 0; o < n.length; ++o)
            i = n[o], i.marker.collapsed && (t ? i.from : i.to) == null && (!r || xo(r, i.marker) < 0) && (r = i.marker);
        return r;
      }
      function Kl(e) {
        return ql(e, !0);
      }
      function ki(e) {
        return ql(e, !1);
      }
      function Zu(e, t) {
        var n = ur && e.markedSpans, r;
        if (n)
          for (var i = 0; i < n.length; ++i) {
            var o = n[i];
            o.marker.collapsed && (o.from == null || o.from < t) && (o.to == null || o.to > t) && (!r || xo(r, o.marker) < 0) && (r = o.marker);
          }
        return r;
      }
      function Ul(e, t, n, r, i) {
        var o = he(e, t), l = ur && o.markedSpans;
        if (l)
          for (var u = 0; u < l.length; ++u) {
            var c = l[u];
            if (!!c.marker.collapsed) {
              var h = c.marker.find(0), b = W(h.from, n) || bi(c.marker) - bi(i), C = W(h.to, r) || wi(c.marker) - wi(i);
              if (!(b >= 0 && C <= 0 || b <= 0 && C >= 0) && (b <= 0 && (c.marker.inclusiveRight && i.inclusiveLeft ? W(h.to, n) >= 0 : W(h.to, n) > 0) || b >= 0 && (c.marker.inclusiveRight && i.inclusiveLeft ? W(h.from, r) <= 0 : W(h.from, r) < 0)))
                return !0;
            }
          }
      }
      function qt(e) {
        for (var t; t = Kl(e); )
          e = t.find(-1, !0).line;
        return e;
      }
      function Qu(e) {
        for (var t; t = ki(e); )
          e = t.find(1, !0).line;
        return e;
      }
      function Ju(e) {
        for (var t, n; t = ki(e); )
          e = t.find(1, !0).line, (n || (n = [])).push(e);
        return n;
      }
      function bo(e, t) {
        var n = he(e, t), r = qt(n);
        return n == r ? t : Oe(r);
      }
      function Gl(e, t) {
        if (t > e.lastLine())
          return t;
        var n = he(e, t), r;
        if (!wr(e, n))
          return t;
        for (; r = ki(n); )
          n = r.find(1, !0).line;
        return Oe(n) + 1;
      }
      function wr(e, t) {
        var n = ur && t.markedSpans;
        if (n) {
          for (var r = void 0, i = 0; i < n.length; ++i)
            if (r = n[i], !!r.marker.collapsed) {
              if (r.from == null)
                return !0;
              if (!r.marker.widgetNode && r.from == 0 && r.marker.inclusiveLeft && wo(e, t, r))
                return !0;
            }
        }
      }
      function wo(e, t, n) {
        if (n.to == null) {
          var r = n.marker.find(1, !0);
          return wo(e, r.line, An(r.line.markedSpans, n.marker));
        }
        if (n.marker.inclusiveRight && n.to == t.text.length)
          return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
          if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (i.to == null || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && wo(e, t, i))
            return !0;
      }
      function fr(e) {
        e = qt(e);
        for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
          var i = n.lines[r];
          if (i == e)
            break;
          t += i.height;
        }
        for (var o = n.parent; o; n = o, o = n.parent)
          for (var l = 0; l < o.children.length; ++l) {
            var u = o.children[l];
            if (u == n)
              break;
            t += u.height;
          }
        return t;
      }
      function Si(e) {
        if (e.height == 0)
          return 0;
        for (var t = e.text.length, n, r = e; n = Kl(r); ) {
          var i = n.find(0, !0);
          r = i.from.line, t += i.from.ch - i.to.ch;
        }
        for (r = e; n = ki(r); ) {
          var o = n.find(0, !0);
          t -= r.text.length - o.from.ch, r = o.to.line, t += r.text.length - o.to.ch;
        }
        return t;
      }
      function ko(e) {
        var t = e.display, n = e.doc;
        t.maxLine = he(n, n.first), t.maxLineLength = Si(t.maxLine), t.maxLineChanged = !0, n.iter(function(r) {
          var i = Si(r);
          i > t.maxLineLength && (t.maxLineLength = i, t.maxLine = r);
        });
      }
      var Zr = function(e, t, n) {
        this.text = e, jl(this, t), this.height = n ? n(this) : 1;
      };
      Zr.prototype.lineNo = function() {
        return Oe(this);
      }, vt(Zr);
      function Vu(e, t, n, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), e.order != null && (e.order = null), Rl(e), jl(e, n);
        var i = r ? r(e) : 1;
        i != e.height && _t(e, i);
      }
      function ef(e) {
        e.parent = null, Rl(e);
      }
      var tf = {}, rf = {};
      function $l(e, t) {
        if (!e || /^\s*$/.test(e))
          return null;
        var n = t.addModeClass ? rf : tf;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
      }
      function Xl(e, t) {
        var n = V("span", null, null, w ? "padding-right: .1px" : null), r = {
          pre: V("pre", [n], "CodeMirror-line"),
          content: n,
          col: 0,
          pos: 0,
          cm: e,
          trailingSpace: !1,
          splitSpaces: e.getOption("lineWrapping")
        };
        t.measure = {};
        for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
          var o = i ? t.rest[i - 1] : t.line, l = void 0;
          r.pos = 0, r.addToken = of, pi(e.display.measure) && (l = zt(o, e.doc.direction)) && (r.addToken = af(r.addToken, l)), r.map = [];
          var u = t != e.display.externalMeasured && Oe(o);
          sf(o, r, Il(e, o, u)), o.styleClasses && (o.styleClasses.bgClass && (r.bgClass = ae(o.styleClasses.bgClass, r.bgClass || "")), o.styleClasses.textClass && (r.textClass = ae(o.styleClasses.textClass, r.textClass || ""))), r.map.length == 0 && r.map.push(0, 0, r.content.appendChild(go(e.display.measure))), i == 0 ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (w) {
          var c = r.content.lastChild;
          (/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack");
        }
        return We(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = ae(r.pre.className, r.textClass || "")), r;
      }
      function nf(e) {
        var t = y("span", "\u2022", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }
      function of(e, t, n, r, i, o, l) {
        if (!!t) {
          var u = e.splitSpaces ? lf(t, e.trailingSpace) : t, c = e.cm.state.specialChars, h = !1, b;
          if (!c.test(t))
            e.col += t.length, b = document.createTextNode(u), e.map.push(e.pos, e.pos + t.length, b), S && T < 9 && (h = !0), e.pos += t.length;
          else {
            b = document.createDocumentFragment();
            for (var C = 0; ; ) {
              c.lastIndex = C;
              var I = c.exec(t), E = I ? I.index - C : t.length - C;
              if (E) {
                var _ = document.createTextNode(u.slice(C, C + E));
                S && T < 9 ? b.appendChild(y("span", [_])) : b.appendChild(_), e.map.push(e.pos, e.pos + E, _), e.col += E, e.pos += E;
              }
              if (!I)
                break;
              C += E + 1;
              var U = void 0;
              if (I[0] == "	") {
                var Z = e.cm.options.tabSize, ee = Z - e.col % Z;
                U = b.appendChild(y("span", _e(ee), "cm-tab")), U.setAttribute("role", "presentation"), U.setAttribute("cm-text", "	"), e.col += ee;
              } else
                I[0] == "\r" || I[0] == `
` ? (U = b.appendChild(y("span", I[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar")), U.setAttribute("cm-text", I[0]), e.col += 1) : (U = e.cm.options.specialCharPlaceholder(I[0]), U.setAttribute("cm-text", I[0]), S && T < 9 ? b.appendChild(y("span", [U])) : b.appendChild(U), e.col += 1);
              e.map.push(e.pos, e.pos + 1, U), e.pos++;
            }
          }
          if (e.trailingSpace = u.charCodeAt(t.length - 1) == 32, n || r || i || h || o || l) {
            var oe = n || "";
            r && (oe += r), i && (oe += i);
            var te = y("span", [b], oe, o);
            if (l)
              for (var se in l)
                l.hasOwnProperty(se) && se != "style" && se != "class" && te.setAttribute(se, l[se]);
            return e.content.appendChild(te);
          }
          e.content.appendChild(b);
        }
      }
      function lf(e, t) {
        if (e.length > 1 && !/  /.test(e))
          return e;
        for (var n = t, r = "", i = 0; i < e.length; i++) {
          var o = e.charAt(i);
          o == " " && n && (i == e.length - 1 || e.charCodeAt(i + 1) == 32) && (o = "\xA0"), r += o, n = o == " ";
        }
        return r;
      }
      function af(e, t) {
        return function(n, r, i, o, l, u, c) {
          i = i ? i + " cm-force-border" : "cm-force-border";
          for (var h = n.pos, b = h + r.length; ; ) {
            for (var C = void 0, I = 0; I < t.length && (C = t[I], !(C.to > h && C.from <= h)); I++)
              ;
            if (C.to >= b)
              return e(n, r, i, o, l, u, c);
            e(n, r.slice(0, C.to - h), i, o, null, u, c), o = null, r = r.slice(C.to - h), h = C.to;
          }
        };
      }
      function Yl(e, t, n, r) {
        var i = !r && n.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1;
      }
      function sf(e, t, n) {
        var r = e.markedSpans, i = e.text, o = 0;
        if (!r) {
          for (var l = 1; l < n.length; l += 2)
            t.addToken(t, i.slice(o, o = n[l]), $l(n[l + 1], t.cm.options));
          return;
        }
        for (var u = i.length, c = 0, h = 1, b = "", C, I, E = 0, _, U, Z, ee, oe; ; ) {
          if (E == c) {
            _ = U = Z = I = "", oe = null, ee = null, E = 1 / 0;
            for (var te = [], se = void 0, ye = 0; ye < r.length; ++ye) {
              var ve = r[ye], Le = ve.marker;
              if (Le.type == "bookmark" && ve.from == c && Le.widgetNode)
                te.push(Le);
              else if (ve.from <= c && (ve.to == null || ve.to > c || Le.collapsed && ve.to == c && ve.from == c)) {
                if (ve.to != null && ve.to != c && E > ve.to && (E = ve.to, U = ""), Le.className && (_ += " " + Le.className), Le.css && (I = (I ? I + ";" : "") + Le.css), Le.startStyle && ve.from == c && (Z += " " + Le.startStyle), Le.endStyle && ve.to == E && (se || (se = [])).push(Le.endStyle, ve.to), Le.title && ((oe || (oe = {})).title = Le.title), Le.attributes)
                  for (var He in Le.attributes)
                    (oe || (oe = {}))[He] = Le.attributes[He];
                Le.collapsed && (!ee || xo(ee.marker, Le) < 0) && (ee = ve);
              } else
                ve.from > c && E > ve.from && (E = ve.from);
            }
            if (se)
              for (var ot = 0; ot < se.length; ot += 2)
                se[ot + 1] == E && (U += " " + se[ot]);
            if (!ee || ee.from == c)
              for (var qe = 0; qe < te.length; ++qe)
                Yl(t, 0, te[qe]);
            if (ee && (ee.from || 0) == c) {
              if (Yl(
                t,
                (ee.to == null ? u + 1 : ee.to) - c,
                ee.marker,
                ee.from == null
              ), ee.to == null)
                return;
              ee.to == c && (ee = !1);
            }
          }
          if (c >= u)
            break;
          for (var Et = Math.min(u, E); ; ) {
            if (b) {
              var Lt = c + b.length;
              if (!ee) {
                var Ze = Lt > Et ? b.slice(0, Et - c) : b;
                t.addToken(
                  t,
                  Ze,
                  C ? C + _ : _,
                  Z,
                  c + Ze.length == E ? U : "",
                  I,
                  oe
                );
              }
              if (Lt >= Et) {
                b = b.slice(Et - c), c = Et;
                break;
              }
              c = Lt, Z = "";
            }
            b = i.slice(o, o = n[h++]), C = $l(n[h++], t.cm.options);
          }
        }
      }
      function Zl(e, t, n) {
        this.line = t, this.rest = Ju(t), this.size = this.rest ? Oe(ke(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = wr(e, t);
      }
      function Ci(e, t, n) {
        for (var r = [], i, o = t; o < n; o = i) {
          var l = new Zl(e.doc, he(e.doc, o), o);
          i = o + l.size, r.push(l);
        }
        return r;
      }
      var Qr = null;
      function uf(e) {
        Qr ? Qr.ops.push(e) : e.ownsGroup = Qr = {
          ops: [e],
          delayedCallbacks: []
        };
      }
      function ff(e) {
        var t = e.delayedCallbacks, n = 0;
        do {
          for (; n < t.length; n++)
            t[n].call(null);
          for (var r = 0; r < e.ops.length; r++) {
            var i = e.ops[r];
            if (i.cursorActivityHandlers)
              for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
                i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
          }
        } while (n < t.length);
      }
      function cf(e, t) {
        var n = e.ownsGroup;
        if (!!n)
          try {
            ff(n);
          } finally {
            Qr = null, t(n);
          }
      }
      var Fn = null;
      function rt(e, t) {
        var n = wn(e, t);
        if (!!n.length) {
          var r = Array.prototype.slice.call(arguments, 2), i;
          Qr ? i = Qr.delayedCallbacks : Fn ? i = Fn : (i = Fn = [], setTimeout(hf, 0));
          for (var o = function(u) {
            i.push(function() {
              return n[u].apply(null, r);
            });
          }, l = 0; l < n.length; ++l)
            o(l);
        }
      }
      function hf() {
        var e = Fn;
        Fn = null;
        for (var t = 0; t < e.length; ++t)
          e[t]();
      }
      function Ql(e, t, n, r) {
        for (var i = 0; i < t.changes.length; i++) {
          var o = t.changes[i];
          o == "text" ? pf(e, t) : o == "gutter" ? Vl(e, t, n, r) : o == "class" ? So(e, t) : o == "widget" && gf(e, t, r);
        }
        t.changes = null;
      }
      function Dn(e) {
        return e.node == e.text && (e.node = y("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), S && T < 8 && (e.node.style.zIndex = 2)), e.node;
      }
      function df(e, t) {
        var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (n && (n += " CodeMirror-linebackground"), t.background)
          n ? t.background.className = n : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (n) {
          var r = Dn(t);
          t.background = r.insertBefore(y("div", null, n), r.firstChild), e.display.input.setUneditable(t.background);
        }
      }
      function Jl(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : Xl(e, t);
      }
      function pf(e, t) {
        var n = t.text.className, r = Jl(e, t);
        t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, So(e, t)) : n && (t.text.className = n);
      }
      function So(e, t) {
        df(e, t), t.line.wrapClass ? Dn(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = n || "";
      }
      function Vl(e, t, n, r) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var i = Dn(t);
          t.gutterBackground = y(
            "div",
            null,
            "CodeMirror-gutter-background " + t.line.gutterClass,
            "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"
          ), e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text);
        }
        var o = t.line.gutterMarkers;
        if (e.options.lineNumbers || o) {
          var l = Dn(t), u = t.gutter = y("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
          if (u.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(u), l.insertBefore(u, t.text), t.line.gutterClass && (u.className += " " + t.line.gutterClass), e.options.lineNumbers && (!o || !o["CodeMirror-linenumbers"]) && (t.lineNumber = u.appendChild(
            y(
              "div",
              L(e.options, n),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"
            )
          )), o)
            for (var c = 0; c < e.display.gutterSpecs.length; ++c) {
              var h = e.display.gutterSpecs[c].className, b = o.hasOwnProperty(h) && o[h];
              b && u.appendChild(y(
                "div",
                [b],
                "CodeMirror-gutter-elt",
                "left: " + r.gutterLeft[h] + "px; width: " + r.gutterWidth[h] + "px"
              ));
            }
        }
      }
      function gf(e, t, n) {
        t.alignable && (t.alignable = null);
        for (var r = ue("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o)
          o = i.nextSibling, r.test(i.className) && t.node.removeChild(i);
        ea(e, t, n);
      }
      function vf(e, t, n, r) {
        var i = Jl(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), So(e, t), Vl(e, t, n, r), ea(e, t, r), t.node;
      }
      function ea(e, t, n) {
        if (ta(e, t.line, t, n, !0), t.rest)
          for (var r = 0; r < t.rest.length; r++)
            ta(e, t.rest[r], t, n, !1);
      }
      function ta(e, t, n, r, i) {
        if (!!t.widgets)
          for (var o = Dn(n), l = 0, u = t.widgets; l < u.length; ++l) {
            var c = u[l], h = y("div", [c.node], "CodeMirror-linewidget" + (c.className ? " " + c.className : ""));
            c.handleMouseEvents || h.setAttribute("cm-ignore-events", "true"), mf(c, h, n, r), e.display.input.setUneditable(h), i && c.above ? o.insertBefore(h, n.gutter || n.text) : o.appendChild(h), rt(c, "redraw");
          }
      }
      function mf(e, t, n, r) {
        if (e.noHScroll) {
          (n.alignable || (n.alignable = [])).push(t);
          var i = r.wrapperWidth;
          t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px";
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
      }
      function Mn(e) {
        if (e.height != null)
          return e.height;
        var t = e.doc.cm;
        if (!t)
          return 0;
        if (!ce(document.body, e.node)) {
          var n = "position: relative;";
          e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), J(t.display.measure, y("div", [e.node], null, n));
        }
        return e.height = e.node.parentNode.offsetHeight;
      }
      function cr(e, t) {
        for (var n = kt(t); n != e.wrapper; n = n.parentNode)
          if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == e.sizer && n != e.mover)
            return !0;
      }
      function Li(e) {
        return e.lineSpace.offsetTop;
      }
      function Co(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }
      function ra(e) {
        if (e.cachedPaddingH)
          return e.cachedPaddingH;
        var t = J(e.measure, y("pre", "x", "CodeMirror-line-like")), n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, r = { left: parseInt(n.paddingLeft), right: parseInt(n.paddingRight) };
        return !isNaN(r.left) && !isNaN(r.right) && (e.cachedPaddingH = r), r;
      }
      function tr(e) {
        return xe - e.display.nativeBarWidth;
      }
      function Pr(e) {
        return e.display.scroller.clientWidth - tr(e) - e.display.barWidth;
      }
      function Lo(e) {
        return e.display.scroller.clientHeight - tr(e) - e.display.barHeight;
      }
      function yf(e, t, n) {
        var r = e.options.lineWrapping, i = r && Pr(e);
        if (!t.measure.heights || r && t.measure.width != i) {
          var o = t.measure.heights = [];
          if (r) {
            t.measure.width = i;
            for (var l = t.text.firstChild.getClientRects(), u = 0; u < l.length - 1; u++) {
              var c = l[u], h = l[u + 1];
              Math.abs(c.bottom - h.bottom) > 2 && o.push((c.bottom + h.top) / 2 - n.top);
            }
          }
          o.push(n.bottom - n.top);
        }
      }
      function na(e, t, n) {
        if (e.line == t)
          return { map: e.measure.map, cache: e.measure.cache };
        if (e.rest) {
          for (var r = 0; r < e.rest.length; r++)
            if (e.rest[r] == t)
              return { map: e.measure.maps[r], cache: e.measure.caches[r] };
          for (var i = 0; i < e.rest.length; i++)
            if (Oe(e.rest[i]) > n)
              return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 };
        }
      }
      function xf(e, t) {
        t = qt(t);
        var n = Oe(t), r = e.display.externalMeasured = new Zl(e.doc, t, n);
        r.lineN = n;
        var i = r.built = Xl(e, r);
        return r.text = i.pre, J(e.display.lineMeasure, i.pre), r;
      }
      function ia(e, t, n, r) {
        return rr(e, Jr(e, t), n, r);
      }
      function To(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
          return e.display.view[zr(e, t)];
        var n = e.display.externalMeasured;
        if (n && t >= n.lineN && t < n.lineN + n.size)
          return n;
      }
      function Jr(e, t) {
        var n = Oe(t), r = To(e, n);
        r && !r.text ? r = null : r && r.changes && (Ql(e, r, n, Eo(e)), e.curOp.forceUpdate = !0), r || (r = xf(e, t));
        var i = na(r, t, n);
        return {
          line: t,
          view: r,
          rect: null,
          map: i.map,
          cache: i.cache,
          before: i.before,
          hasHeights: !1
        };
      }
      function rr(e, t, n, r, i) {
        t.before && (n = -1);
        var o = n + (r || ""), l;
        return t.cache.hasOwnProperty(o) ? l = t.cache[o] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (yf(e, t.view, t.rect), t.hasHeights = !0), l = wf(e, t, n, r), l.bogus || (t.cache[o] = l)), {
          left: l.left,
          right: l.right,
          top: i ? l.rtop : l.top,
          bottom: i ? l.rbottom : l.bottom
        };
      }
      var oa = { left: 0, right: 0, top: 0, bottom: 0 };
      function la(e, t, n) {
        for (var r, i, o, l, u, c, h = 0; h < e.length; h += 3)
          if (u = e[h], c = e[h + 1], t < u ? (i = 0, o = 1, l = "left") : t < c ? (i = t - u, o = i + 1) : (h == e.length - 3 || t == c && e[h + 3] > t) && (o = c - u, i = o - 1, t >= c && (l = "right")), i != null) {
            if (r = e[h + 2], u == c && n == (r.insertLeft ? "left" : "right") && (l = n), n == "left" && i == 0)
              for (; h && e[h - 2] == e[h - 3] && e[h - 1].insertLeft; )
                r = e[(h -= 3) + 2], l = "left";
            if (n == "right" && i == c - u)
              for (; h < e.length - 3 && e[h + 3] == e[h + 4] && !e[h + 5].insertLeft; )
                r = e[(h += 3) + 2], l = "right";
            break;
          }
        return { node: r, start: i, end: o, collapse: l, coverStart: u, coverEnd: c };
      }
      function bf(e, t) {
        var n = oa;
        if (t == "left")
          for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++)
            ;
        else
          for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--)
            ;
        return n;
      }
      function wf(e, t, n, r) {
        var i = la(t.map, n, r), o = i.node, l = i.start, u = i.end, c = i.collapse, h;
        if (o.nodeType == 3) {
          for (var b = 0; b < 4; b++) {
            for (; l && bn(t.line.text.charAt(i.coverStart + l)); )
              --l;
            for (; i.coverStart + u < i.coverEnd && bn(t.line.text.charAt(i.coverStart + u)); )
              ++u;
            if (S && T < 9 && l == 0 && u == i.coverEnd - i.coverStart ? h = o.parentNode.getBoundingClientRect() : h = bf(X(o, l, u).getClientRects(), r), h.left || h.right || l == 0)
              break;
            u = l, l = l - 1, c = "right";
          }
          S && T < 11 && (h = kf(e.display.measure, h));
        } else {
          l > 0 && (c = r = "right");
          var C;
          e.options.lineWrapping && (C = o.getClientRects()).length > 1 ? h = C[r == "right" ? C.length - 1 : 0] : h = o.getBoundingClientRect();
        }
        if (S && T < 9 && !l && (!h || !h.left && !h.right)) {
          var I = o.parentNode.getClientRects()[0];
          I ? h = { left: I.left, right: I.left + en(e.display), top: I.top, bottom: I.bottom } : h = oa;
        }
        for (var E = h.top - t.rect.top, _ = h.bottom - t.rect.top, U = (E + _) / 2, Z = t.view.measure.heights, ee = 0; ee < Z.length - 1 && !(U < Z[ee]); ee++)
          ;
        var oe = ee ? Z[ee - 1] : 0, te = Z[ee], se = {
          left: (c == "right" ? h.right : h.left) - t.rect.left,
          right: (c == "left" ? h.left : h.right) - t.rect.left,
          top: oe,
          bottom: te
        };
        return !h.left && !h.right && (se.bogus = !0), e.options.singleCursorHeightPerLine || (se.rtop = E, se.rbottom = _), se;
      }
      function kf(e, t) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !gi(e))
          return t;
        var n = screen.logicalXDPI / screen.deviceXDPI, r = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: t.left * n,
          right: t.right * n,
          top: t.top * r,
          bottom: t.bottom * r
        };
      }
      function aa(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
          for (var t = 0; t < e.rest.length; t++)
            e.measure.caches[t] = {};
      }
      function sa(e) {
        e.display.externalMeasure = null, q(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++)
          aa(e.display.view[t]);
      }
      function En(e) {
        sa(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
      }
      function ua(e) {
        return D && N ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft)) : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
      }
      function fa(e) {
        return D && N ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop)) : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
      }
      function Ao(e) {
        var t = qt(e), n = t.widgets, r = 0;
        if (n)
          for (var i = 0; i < n.length; ++i)
            n[i].above && (r += Mn(n[i]));
        return r;
      }
      function Ti(e, t, n, r, i) {
        if (!i) {
          var o = Ao(t);
          n.top += o, n.bottom += o;
        }
        if (r == "line")
          return n;
        r || (r = "local");
        var l = fr(t);
        if (r == "local" ? l += Li(e.display) : l -= e.display.viewOffset, r == "page" || r == "window") {
          var u = e.display.lineSpace.getBoundingClientRect();
          l += u.top + (r == "window" ? 0 : fa(ge(e)));
          var c = u.left + (r == "window" ? 0 : ua(ge(e)));
          n.left += c, n.right += c;
        }
        return n.top += l, n.bottom += l, n;
      }
      function ca(e, t, n) {
        if (n == "div")
          return t;
        var r = t.left, i = t.top;
        if (n == "page")
          r -= ua(ge(e)), i -= fa(ge(e));
        else if (n == "local" || !n) {
          var o = e.display.sizer.getBoundingClientRect();
          r += o.left, i += o.top;
        }
        var l = e.display.lineSpace.getBoundingClientRect();
        return { left: r - l.left, top: i - l.top };
      }
      function Ai(e, t, n, r, i) {
        return r || (r = he(e.doc, t.line)), Ti(e, r, ia(e, r, t.ch, i), n);
      }
      function Kt(e, t, n, r, i, o) {
        r = r || he(e.doc, t.line), i || (i = Jr(e, r));
        function l(_, U) {
          var Z = rr(e, i, _, U ? "right" : "left", o);
          return U ? Z.left = Z.right : Z.right = Z.left, Ti(e, r, Z, n);
        }
        var u = zt(r, e.doc.direction), c = t.ch, h = t.sticky;
        if (c >= r.text.length ? (c = r.text.length, h = "before") : c <= 0 && (c = 0, h = "after"), !u)
          return l(h == "before" ? c - 1 : c, h == "before");
        function b(_, U, Z) {
          var ee = u[U], oe = ee.level == 1;
          return l(Z ? _ - 1 : _, oe != Z);
        }
        var C = Ht(u, c, h), I = Zt, E = b(c, C, h == "before");
        return I != null && (E.other = b(c, I, h != "before")), E;
      }
      function ha(e, t) {
        var n = 0;
        t = Ce(e.doc, t), e.options.lineWrapping || (n = en(e.display) * t.ch);
        var r = he(e.doc, t.line), i = fr(r) + Li(e.display);
        return { left: n, right: n, top: i, bottom: i + r.height };
      }
      function Fo(e, t, n, r, i) {
        var o = M(e, t, n);
        return o.xRel = i, r && (o.outside = r), o;
      }
      function Do(e, t, n) {
        var r = e.doc;
        if (n += e.display.viewOffset, n < 0)
          return Fo(r.first, 0, null, -1, -1);
        var i = Vt(r, n), o = r.first + r.size - 1;
        if (i > o)
          return Fo(r.first + r.size - 1, he(r, o).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var l = he(r, i); ; ) {
          var u = Sf(e, l, i, t, n), c = Zu(l, u.ch + (u.xRel > 0 || u.outside > 0 ? 1 : 0));
          if (!c)
            return u;
          var h = c.find(1);
          if (h.line == i)
            return h;
          l = he(r, i = h.line);
        }
      }
      function da(e, t, n, r) {
        r -= Ao(t);
        var i = t.text.length, o = Ke(function(l) {
          return rr(e, n, l - 1).bottom <= r;
        }, i, 0);
        return i = Ke(function(l) {
          return rr(e, n, l).top > r;
        }, o, i), { begin: o, end: i };
      }
      function pa(e, t, n, r) {
        n || (n = Jr(e, t));
        var i = Ti(e, t, rr(e, n, r), "line").top;
        return da(e, t, n, i);
      }
      function Mo(e, t, n, r) {
        return e.bottom <= n ? !1 : e.top > n ? !0 : (r ? e.left : e.right) > t;
      }
      function Sf(e, t, n, r, i) {
        i -= fr(t);
        var o = Jr(e, t), l = Ao(t), u = 0, c = t.text.length, h = !0, b = zt(t, e.doc.direction);
        if (b) {
          var C = (e.options.lineWrapping ? Lf : Cf)(e, t, n, o, b, r, i);
          h = C.level != 1, u = h ? C.from : C.to - 1, c = h ? C.to : C.from - 1;
        }
        var I = null, E = null, _ = Ke(function(ye) {
          var ve = rr(e, o, ye);
          return ve.top += l, ve.bottom += l, Mo(ve, r, i, !1) ? (ve.top <= i && ve.left <= r && (I = ye, E = ve), !0) : !1;
        }, u, c), U, Z, ee = !1;
        if (E) {
          var oe = r - E.left < E.right - r, te = oe == h;
          _ = I + (te ? 0 : 1), Z = te ? "after" : "before", U = oe ? E.left : E.right;
        } else {
          !h && (_ == c || _ == u) && _++, Z = _ == 0 ? "after" : _ == t.text.length ? "before" : rr(e, o, _ - (h ? 1 : 0)).bottom + l <= i == h ? "after" : "before";
          var se = Kt(e, M(n, _, Z), "line", t, o);
          U = se.left, ee = i < se.top ? -1 : i >= se.bottom ? 1 : 0;
        }
        return _ = Yt(t.text, _, 1), Fo(n, _, Z, ee, r - U);
      }
      function Cf(e, t, n, r, i, o, l) {
        var u = Ke(function(C) {
          var I = i[C], E = I.level != 1;
          return Mo(Kt(
            e,
            M(n, E ? I.to : I.from, E ? "before" : "after"),
            "line",
            t,
            r
          ), o, l, !0);
        }, 0, i.length - 1), c = i[u];
        if (u > 0) {
          var h = c.level != 1, b = Kt(
            e,
            M(n, h ? c.from : c.to, h ? "after" : "before"),
            "line",
            t,
            r
          );
          Mo(b, o, l, !0) && b.top > l && (c = i[u - 1]);
        }
        return c;
      }
      function Lf(e, t, n, r, i, o, l) {
        var u = da(e, t, r, l), c = u.begin, h = u.end;
        /\s/.test(t.text.charAt(h - 1)) && h--;
        for (var b = null, C = null, I = 0; I < i.length; I++) {
          var E = i[I];
          if (!(E.from >= h || E.to <= c)) {
            var _ = E.level != 1, U = rr(e, r, _ ? Math.min(h, E.to) - 1 : Math.max(c, E.from)).right, Z = U < o ? o - U + 1e9 : U - o;
            (!b || C > Z) && (b = E, C = Z);
          }
        }
        return b || (b = i[i.length - 1]), b.from < c && (b = { from: c, to: b.to, level: b.level }), b.to > h && (b = { from: b.from, to: h, level: b.level }), b;
      }
      var Br;
      function Vr(e) {
        if (e.cachedTextHeight != null)
          return e.cachedTextHeight;
        if (Br == null) {
          Br = y("pre", null, "CodeMirror-line-like");
          for (var t = 0; t < 49; ++t)
            Br.appendChild(document.createTextNode("x")), Br.appendChild(y("br"));
          Br.appendChild(document.createTextNode("x"));
        }
        J(e.measure, Br);
        var n = Br.offsetHeight / 50;
        return n > 3 && (e.cachedTextHeight = n), q(e.measure), n || 1;
      }
      function en(e) {
        if (e.cachedCharWidth != null)
          return e.cachedCharWidth;
        var t = y("span", "xxxxxxxxxx"), n = y("pre", [t], "CodeMirror-line-like");
        J(e.measure, n);
        var r = t.getBoundingClientRect(), i = (r.right - r.left) / 10;
        return i > 2 && (e.cachedCharWidth = i), i || 10;
      }
      function Eo(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) {
          var u = e.display.gutterSpecs[l].className;
          n[u] = o.offsetLeft + o.clientLeft + i, r[u] = o.clientWidth;
        }
        return {
          fixedPos: Oo(t),
          gutterTotalWidth: t.gutters.offsetWidth,
          gutterLeft: n,
          gutterWidth: r,
          wrapperWidth: t.wrapper.clientWidth
        };
      }
      function Oo(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }
      function ga(e) {
        var t = Vr(e.display), n = e.options.lineWrapping, r = n && Math.max(5, e.display.scroller.clientWidth / en(e.display) - 3);
        return function(i) {
          if (wr(e.doc, i))
            return 0;
          var o = 0;
          if (i.widgets)
            for (var l = 0; l < i.widgets.length; l++)
              i.widgets[l].height && (o += i.widgets[l].height);
          return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t;
        };
      }
      function Io(e) {
        var t = e.doc, n = ga(e);
        t.iter(function(r) {
          var i = n(r);
          i != r.height && _t(r, i);
        });
      }
      function Hr(e, t, n, r) {
        var i = e.display;
        if (!n && kt(t).getAttribute("cm-not-content") == "true")
          return null;
        var o, l, u = i.lineSpace.getBoundingClientRect();
        try {
          o = t.clientX - u.left, l = t.clientY - u.top;
        } catch {
          return null;
        }
        var c = Do(e, o, l), h;
        if (r && c.xRel > 0 && (h = he(e.doc, c.line).text).length == c.ch) {
          var b = fe(h, h.length, e.options.tabSize) - h.length;
          c = M(c.line, Math.max(0, Math.round((o - ra(e.display).left) / en(e.display)) - b));
        }
        return c;
      }
      function zr(e, t) {
        if (t >= e.display.viewTo || (t -= e.display.viewFrom, t < 0))
          return null;
        for (var n = e.display.view, r = 0; r < n.length; r++)
          if (t -= n[r].size, t < 0)
            return r;
      }
      function St(e, t, n, r) {
        t == null && (t = e.doc.first), n == null && (n = e.doc.first + e.doc.size), r || (r = 0);
        var i = e.display;
        if (r && n < i.viewTo && (i.updateLineNumbers == null || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo)
          ur && bo(e.doc, t) < i.viewTo && Sr(e);
        else if (n <= i.viewFrom)
          ur && Gl(e.doc, n + r) > i.viewFrom ? Sr(e) : (i.viewFrom += r, i.viewTo += r);
        else if (t <= i.viewFrom && n >= i.viewTo)
          Sr(e);
        else if (t <= i.viewFrom) {
          var o = Fi(e, n, n + r, 1);
          o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : Sr(e);
        } else if (n >= i.viewTo) {
          var l = Fi(e, t, t, -1);
          l ? (i.view = i.view.slice(0, l.index), i.viewTo = l.lineN) : Sr(e);
        } else {
          var u = Fi(e, t, t, -1), c = Fi(e, n, n + r, 1);
          u && c ? (i.view = i.view.slice(0, u.index).concat(Ci(e, u.lineN, c.lineN)).concat(i.view.slice(c.index)), i.viewTo += r) : Sr(e);
        }
        var h = i.externalMeasured;
        h && (n < h.lineN ? h.lineN += r : t < h.lineN + h.size && (i.externalMeasured = null));
      }
      function kr(e, t, n) {
        e.curOp.viewChanged = !0;
        var r = e.display, i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
          var o = r.view[zr(e, t)];
          if (o.node != null) {
            var l = o.changes || (o.changes = []);
            de(l, n) == -1 && l.push(n);
          }
        }
      }
      function Sr(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }
      function Fi(e, t, n, r) {
        var i = zr(e, t), o, l = e.display.view;
        if (!ur || n == e.doc.first + e.doc.size)
          return { index: i, lineN: n };
        for (var u = e.display.viewFrom, c = 0; c < i; c++)
          u += l[c].size;
        if (u != t) {
          if (r > 0) {
            if (i == l.length - 1)
              return null;
            o = u + l[i].size - t, i++;
          } else
            o = u - t;
          t += o, n += o;
        }
        for (; bo(e.doc, n) != n; ) {
          if (i == (r < 0 ? 0 : l.length - 1))
            return null;
          n += r * l[i - (r < 0 ? 1 : 0)].size, i += r;
        }
        return { index: i, lineN: n };
      }
      function Tf(e, t, n) {
        var r = e.display, i = r.view;
        i.length == 0 || t >= r.viewTo || n <= r.viewFrom ? (r.view = Ci(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = Ci(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(zr(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(Ci(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, zr(e, n)))), r.viewTo = n;
      }
      function va(e) {
        for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
          var i = t[r];
          !i.hidden && (!i.node || i.changes) && ++n;
        }
        return n;
      }
      function On(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }
      function ma(e, t) {
        t === void 0 && (t = !0);
        var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), l = e.options.$customCursor;
        l && (t = !0);
        for (var u = 0; u < n.sel.ranges.length; u++)
          if (!(!t && u == n.sel.primIndex)) {
            var c = n.sel.ranges[u];
            if (!(c.from().line >= e.display.viewTo || c.to().line < e.display.viewFrom)) {
              var h = c.empty();
              if (l) {
                var b = l(e, c);
                b && No(e, b, i);
              } else
                (h || e.options.showCursorWhenSelecting) && No(e, c.head, i);
              h || Af(e, c, o);
            }
          }
        return r;
      }
      function No(e, t, n) {
        var r = Kt(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = n.appendChild(y("div", "\xA0", "CodeMirror-cursor"));
        if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
          var o = Ai(e, t, "div", null, null), l = o.right - o.left;
          i.style.width = (l > 0 ? l : e.defaultCharWidth()) + "px";
        }
        if (r.other) {
          var u = n.appendChild(y("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
          u.style.display = "", u.style.left = r.other.left + "px", u.style.top = r.other.top + "px", u.style.height = (r.other.bottom - r.other.top) * 0.85 + "px";
        }
      }
      function Di(e, t) {
        return e.top - t.top || e.left - t.left;
      }
      function Af(e, t, n) {
        var r = e.display, i = e.doc, o = document.createDocumentFragment(), l = ra(e.display), u = l.left, c = Math.max(r.sizerWidth, Pr(e) - r.sizer.offsetLeft) - l.right, h = i.direction == "ltr";
        function b(te, se, ye, ve) {
          se < 0 && (se = 0), se = Math.round(se), ve = Math.round(ve), o.appendChild(y("div", null, "CodeMirror-selected", "position: absolute; left: " + te + `px;
                             top: ` + se + "px; width: " + (ye == null ? c - te : ye) + `px;
                             height: ` + (ve - se) + "px"));
        }
        function C(te, se, ye) {
          var ve = he(i, te), Le = ve.text.length, He, ot;
          function qe(Ze, Tt) {
            return Ai(e, M(te, Ze), "div", ve, Tt);
          }
          function Et(Ze, Tt, at) {
            var et = pa(e, ve, null, Ze), Qe = Tt == "ltr" == (at == "after") ? "left" : "right", $e = at == "after" ? et.begin : et.end - (/\s/.test(ve.text.charAt(et.end - 1)) ? 2 : 1);
            return qe($e, Qe)[Qe];
          }
          var Lt = zt(ve, i.direction);
          return Ir(Lt, se || 0, ye == null ? Le : ye, function(Ze, Tt, at, et) {
            var Qe = at == "ltr", $e = qe(Ze, Qe ? "left" : "right"), At = qe(Tt - 1, Qe ? "right" : "left"), pn = se == null && Ze == 0, Dr = ye == null && Tt == Le, ht = et == 0, nr = !Lt || et == Lt.length - 1;
            if (At.top - $e.top <= 3) {
              var lt = (h ? pn : Dr) && ht, al = (h ? Dr : pn) && nr, pr = lt ? u : (Qe ? $e : At).left, qr = al ? c : (Qe ? At : $e).right;
              b(pr, $e.top, qr - pr, $e.bottom);
            } else {
              var Kr, yt, gn, sl;
              Qe ? (Kr = h && pn && ht ? u : $e.left, yt = h ? c : Et(Ze, at, "before"), gn = h ? u : Et(Tt, at, "after"), sl = h && Dr && nr ? c : At.right) : (Kr = h ? Et(Ze, at, "before") : u, yt = !h && pn && ht ? c : $e.right, gn = !h && Dr && nr ? u : At.left, sl = h ? Et(Tt, at, "after") : c), b(Kr, $e.top, yt - Kr, $e.bottom), $e.bottom < At.top && b(u, $e.bottom, null, At.top), b(gn, At.top, sl - gn, At.bottom);
            }
            (!He || Di($e, He) < 0) && (He = $e), Di(At, He) < 0 && (He = At), (!ot || Di($e, ot) < 0) && (ot = $e), Di(At, ot) < 0 && (ot = At);
          }), { start: He, end: ot };
        }
        var I = t.from(), E = t.to();
        if (I.line == E.line)
          C(I.line, I.ch, E.ch);
        else {
          var _ = he(i, I.line), U = he(i, E.line), Z = qt(_) == qt(U), ee = C(I.line, I.ch, Z ? _.text.length + 1 : null).end, oe = C(E.line, Z ? 0 : null, E.ch).start;
          Z && (ee.top < oe.top - 2 ? (b(ee.right, ee.top, null, ee.bottom), b(u, oe.top, oe.left, oe.bottom)) : b(ee.right, ee.top, oe.left - ee.right, ee.bottom)), ee.bottom < oe.top && b(u, ee.bottom, null, oe.top);
        }
        n.appendChild(o);
      }
      function Po(e) {
        if (!!e.state.focused) {
          var t = e.display;
          clearInterval(t.blinker);
          var n = !0;
          t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
            e.hasFocus() || tn(e), t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }
      function ya(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || Ho(e));
      }
      function Bo(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && tn(e));
        }, 100);
      }
      function Ho(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), e.options.readOnly != "nocursor" && (e.state.focused || (We(e, "focus", e, t), e.state.focused = !0, v(e.display.wrapper, "CodeMirror-focused"), !e.curOp && e.display.selForContextMenu != e.doc.sel && (e.display.input.reset(), w && setTimeout(function() {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), Po(e));
      }
      function tn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (We(e, "blur", e, t), e.state.focused = !1, Ae(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }
      function Mi(e) {
        for (var t = e.display, n = t.lineDiv.offsetTop, r = Math.max(0, t.scroller.getBoundingClientRect().top), i = t.lineDiv.getBoundingClientRect().top, o = 0, l = 0; l < t.view.length; l++) {
          var u = t.view[l], c = e.options.lineWrapping, h = void 0, b = 0;
          if (!u.hidden) {
            if (i += u.line.height, S && T < 8) {
              var C = u.node.offsetTop + u.node.offsetHeight;
              h = C - n, n = C;
            } else {
              var I = u.node.getBoundingClientRect();
              h = I.bottom - I.top, !c && u.text.firstChild && (b = u.text.firstChild.getBoundingClientRect().right - I.left - 1);
            }
            var E = u.line.height - h;
            if ((E > 5e-3 || E < -5e-3) && (i < r && (o -= E), _t(u.line, h), xa(u.line), u.rest))
              for (var _ = 0; _ < u.rest.length; _++)
                xa(u.rest[_]);
            if (b > e.display.sizerWidth) {
              var U = Math.ceil(b / en(e.display));
              U > e.display.maxLineLength && (e.display.maxLineLength = U, e.display.maxLine = u.line, e.display.maxLineChanged = !0);
            }
          }
        }
        Math.abs(o) > 2 && (t.scroller.scrollTop += o);
      }
      function xa(e) {
        if (e.widgets)
          for (var t = 0; t < e.widgets.length; ++t) {
            var n = e.widgets[t], r = n.node.parentNode;
            r && (n.height = r.offsetHeight);
          }
      }
      function Ei(e, t, n) {
        var r = n && n.top != null ? Math.max(0, n.top) : e.scroller.scrollTop;
        r = Math.floor(r - Li(e));
        var i = n && n.bottom != null ? n.bottom : r + e.wrapper.clientHeight, o = Vt(t, r), l = Vt(t, i);
        if (n && n.ensure) {
          var u = n.ensure.from.line, c = n.ensure.to.line;
          u < o ? (o = u, l = Vt(t, fr(he(t, u)) + e.wrapper.clientHeight)) : Math.min(c, t.lastLine()) >= l && (o = Vt(t, fr(he(t, c)) - e.wrapper.clientHeight), l = c);
        }
        return { from: o, to: Math.max(l, o + 1) };
      }
      function Ff(e, t) {
        if (!Ue(e, "scrollCursorIntoView")) {
          var n = e.display, r = n.sizer.getBoundingClientRect(), i = null, o = n.wrapper.ownerDocument;
          if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (o.defaultView.innerHeight || o.documentElement.clientHeight) && (i = !1), i != null && !P) {
            var l = y("div", "\u200B", null, `position: absolute;
                         top: ` + (t.top - n.viewOffset - Li(e.display)) + `px;
                         height: ` + (t.bottom - t.top + tr(e) + n.barHeight) + `px;
                         left: ` + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
            e.display.lineSpace.appendChild(l), l.scrollIntoView(i), e.display.lineSpace.removeChild(l);
          }
        }
      }
      function Df(e, t, n, r) {
        r == null && (r = 0);
        var i;
        !e.options.lineWrapping && t == n && (n = t.sticky == "before" ? M(t.line, t.ch + 1, "before") : t, t = t.ch ? M(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after") : t);
        for (var o = 0; o < 5; o++) {
          var l = !1, u = Kt(e, t), c = !n || n == t ? u : Kt(e, n);
          i = {
            left: Math.min(u.left, c.left),
            top: Math.min(u.top, c.top) - r,
            right: Math.max(u.left, c.left),
            bottom: Math.max(u.bottom, c.bottom) + r
          };
          var h = zo(e, i), b = e.doc.scrollTop, C = e.doc.scrollLeft;
          if (h.scrollTop != null && (Nn(e, h.scrollTop), Math.abs(e.doc.scrollTop - b) > 1 && (l = !0)), h.scrollLeft != null && (Wr(e, h.scrollLeft), Math.abs(e.doc.scrollLeft - C) > 1 && (l = !0)), !l)
            break;
        }
        return i;
      }
      function Mf(e, t) {
        var n = zo(e, t);
        n.scrollTop != null && Nn(e, n.scrollTop), n.scrollLeft != null && Wr(e, n.scrollLeft);
      }
      function zo(e, t) {
        var n = e.display, r = Vr(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && e.curOp.scrollTop != null ? e.curOp.scrollTop : n.scroller.scrollTop, o = Lo(e), l = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var u = e.doc.height + Co(n), c = t.top < r, h = t.bottom > u - r;
        if (t.top < i)
          l.scrollTop = c ? 0 : t.top;
        else if (t.bottom > i + o) {
          var b = Math.min(t.top, (h ? u : t.bottom) - o);
          b != i && (l.scrollTop = b);
        }
        var C = e.options.fixedGutter ? 0 : n.gutters.offsetWidth, I = e.curOp && e.curOp.scrollLeft != null ? e.curOp.scrollLeft : n.scroller.scrollLeft - C, E = Pr(e) - n.gutters.offsetWidth, _ = t.right - t.left > E;
        return _ && (t.right = t.left + E), t.left < 10 ? l.scrollLeft = 0 : t.left < I ? l.scrollLeft = Math.max(0, t.left + C - (_ ? 0 : 10)) : t.right > E + I - 3 && (l.scrollLeft = t.right + (_ ? 0 : 10) - E), l;
      }
      function Wo(e, t) {
        t != null && (Oi(e), e.curOp.scrollTop = (e.curOp.scrollTop == null ? e.doc.scrollTop : e.curOp.scrollTop) + t);
      }
      function rn(e) {
        Oi(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin };
      }
      function In(e, t, n) {
        (t != null || n != null) && Oi(e), t != null && (e.curOp.scrollLeft = t), n != null && (e.curOp.scrollTop = n);
      }
      function Ef(e, t) {
        Oi(e), e.curOp.scrollToPos = t;
      }
      function Oi(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
          e.curOp.scrollToPos = null;
          var n = ha(e, t.from), r = ha(e, t.to);
          ba(e, n, r, t.margin);
        }
      }
      function ba(e, t, n, r) {
        var i = zo(e, {
          left: Math.min(t.left, n.left),
          top: Math.min(t.top, n.top) - r,
          right: Math.max(t.right, n.right),
          bottom: Math.max(t.bottom, n.bottom) + r
        });
        In(e, i.scrollLeft, i.scrollTop);
      }
      function Nn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (d || Ro(e, { top: t }), wa(e, t, !0), d && Ro(e), Hn(e, 100));
      }
      function wa(e, t, n) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), !(e.display.scroller.scrollTop == t && !n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }
      function Wr(e, t, n, r) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), !((n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r) && (e.doc.scrollLeft = t, Ta(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }
      function Pn(e) {
        var t = e.display, n = t.gutters.offsetWidth, r = Math.round(e.doc.height + Co(e.display));
        return {
          clientHeight: t.scroller.clientHeight,
          viewHeight: t.wrapper.clientHeight,
          scrollWidth: t.scroller.scrollWidth,
          clientWidth: t.scroller.clientWidth,
          viewWidth: t.wrapper.clientWidth,
          barLeft: e.options.fixedGutter ? n : 0,
          docHeight: r,
          scrollHeight: r + tr(e) + t.barHeight,
          nativeBarWidth: t.nativeBarWidth,
          gutterWidth: n
        };
      }
      var _r = function(e, t, n) {
        this.cm = n;
        var r = this.vert = y("div", [y("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), i = this.horiz = y("div", [y("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        r.tabIndex = i.tabIndex = -1, e(r), e(i), ne(r, "scroll", function() {
          r.clientHeight && t(r.scrollTop, "vertical");
        }), ne(i, "scroll", function() {
          i.clientWidth && t(i.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = !1, S && T < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };
      _r.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1, n = e.scrollHeight > e.clientHeight + 1, r = e.nativeBarWidth;
        if (n) {
          this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
          var i = e.viewHeight - (t ? r : 0);
          this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else
          this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
          this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
          var o = e.viewWidth - e.barLeft - (n ? r : 0);
          this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
        } else
          this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (r == 0 && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: n ? r : 0, bottom: t ? r : 0 };
      }, _r.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, _r.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, _r.prototype.zeroWidthHack = function() {
        var e = K && !re ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new be(), this.disableVert = new be();
      }, _r.prototype.enableZeroWidthBar = function(e, t, n) {
        e.style.visibility = "";
        function r() {
          var i = e.getBoundingClientRect(), o = n == "vert" ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1);
          o != e ? e.style.visibility = "hidden" : t.set(1e3, r);
        }
        t.set(1e3, r);
      }, _r.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
      };
      var Bn = function() {
      };
      Bn.prototype.update = function() {
        return { bottom: 0, right: 0 };
      }, Bn.prototype.setScrollLeft = function() {
      }, Bn.prototype.setScrollTop = function() {
      }, Bn.prototype.clear = function() {
      };
      function nn(e, t) {
        t || (t = Pn(e));
        var n = e.display.barWidth, r = e.display.barHeight;
        ka(e, t);
        for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++)
          n != e.display.barWidth && e.options.lineWrapping && Mi(e), ka(e, Pn(e)), n = e.display.barWidth, r = e.display.barHeight;
      }
      function ka(e, t) {
        var n = e.display, r = n.scrollbars.update(t);
        n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = "";
      }
      var Sa = { native: _r, null: Bn };
      function Ca(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && Ae(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new Sa[e.options.scrollbarStyle](function(t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), ne(t, "mousedown", function() {
            e.state.focused && setTimeout(function() {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function(t, n) {
          n == "horizontal" ? Wr(e, t) : Nn(e, t);
        }, e), e.display.scrollbars.addClass && v(e.display.wrapper, e.display.scrollbars.addClass);
      }
      var Of = 0;
      function Rr(e) {
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
          id: ++Of,
          markArrays: null
        }, uf(e.curOp);
      }
      function jr(e) {
        var t = e.curOp;
        t && cf(t, function(n) {
          for (var r = 0; r < n.ops.length; r++)
            n.ops[r].cm.curOp = null;
          If(n);
        });
      }
      function If(e) {
        for (var t = e.ops, n = 0; n < t.length; n++)
          Nf(t[n]);
        for (var r = 0; r < t.length; r++)
          Pf(t[r]);
        for (var i = 0; i < t.length; i++)
          Bf(t[i]);
        for (var o = 0; o < t.length; o++)
          Hf(t[o]);
        for (var l = 0; l < t.length; l++)
          zf(t[l]);
      }
      function Nf(e) {
        var t = e.cm, n = t.display;
        _f(t), e.updateMaxLine && ko(t), e.mustUpdate = e.viewChanged || e.forceUpdate || e.scrollTop != null || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new Ii(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }
      function Pf(e) {
        e.updatedDisplay = e.mustUpdate && _o(e.cm, e.update);
      }
      function Bf(e) {
        var t = e.cm, n = t.display;
        e.updatedDisplay && Mi(t), e.barMeasure = Pn(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = ia(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + tr(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Pr(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection());
      }
      function Hf(e) {
        var t = e.cm;
        e.adjustWidthTo != null && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Wr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var n = e.focus && e.focus == A(ge(t));
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && nn(t, e.barMeasure), e.updatedDisplay && qo(t, e.barMeasure), e.selectionChanged && Po(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && ya(e.cm);
      }
      function zf(e) {
        var t = e.cm, n = t.display, r = t.doc;
        if (e.updatedDisplay && La(t, e.update), n.wheelStartX != null && (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) && (n.wheelStartX = n.wheelStartY = null), e.scrollTop != null && wa(t, e.scrollTop, e.forceScroll), e.scrollLeft != null && Wr(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          var i = Df(
            t,
            Ce(r, e.scrollToPos.from),
            Ce(r, e.scrollToPos.to),
            e.scrollToPos.margin
          );
          Ff(t, i);
        }
        var o = e.maybeHiddenMarkers, l = e.maybeUnhiddenMarkers;
        if (o)
          for (var u = 0; u < o.length; ++u)
            o[u].lines.length || We(o[u], "hide");
        if (l)
          for (var c = 0; c < l.length; ++c)
            l[c].lines.length && We(l[c], "unhide");
        n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && We(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }
      function Mt(e, t) {
        if (e.curOp)
          return t();
        Rr(e);
        try {
          return t();
        } finally {
          jr(e);
        }
      }
      function nt(e, t) {
        return function() {
          if (e.curOp)
            return t.apply(e, arguments);
          Rr(e);
          try {
            return t.apply(e, arguments);
          } finally {
            jr(e);
          }
        };
      }
      function mt(e) {
        return function() {
          if (this.curOp)
            return e.apply(this, arguments);
          Rr(this);
          try {
            return e.apply(this, arguments);
          } finally {
            jr(this);
          }
        };
      }
      function it(e) {
        return function() {
          var t = this.cm;
          if (!t || t.curOp)
            return e.apply(this, arguments);
          Rr(t);
          try {
            return e.apply(this, arguments);
          } finally {
            jr(t);
          }
        };
      }
      function Hn(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, Pe(Wf, e));
      }
      function Wf(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
          var n = +new Date() + e.options.workTime, r = Tn(e, t.highlightFrontier), i = [];
          t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
            if (r.line >= e.display.viewFrom) {
              var l = o.styles, u = o.text.length > e.options.maxHighlightLength ? ar(t.mode, r.state) : null, c = Ol(e, o, r, !0);
              u && (r.state = u), o.styles = c.styles;
              var h = o.styleClasses, b = c.classes;
              b ? o.styleClasses = b : h && (o.styleClasses = null);
              for (var C = !l || l.length != o.styles.length || h != b && (!h || !b || h.bgClass != b.bgClass || h.textClass != b.textClass), I = 0; !C && I < l.length; ++I)
                C = l[I] != o.styles[I];
              C && i.push(r.line), o.stateAfter = r.save(), r.nextLine();
            } else
              o.text.length <= e.options.maxHighlightLength && vo(e, o.text, r), o.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
            if (+new Date() > n)
              return Hn(e, e.options.workDelay), !0;
          }), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), i.length && Mt(e, function() {
            for (var o = 0; o < i.length; o++)
              kr(e, i[o], "text");
          });
        }
      }
      var Ii = function(e, t, n) {
        var r = e.display;
        this.viewport = t, this.visible = Ei(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = Pr(e), this.force = n, this.dims = Eo(e), this.events = [];
      };
      Ii.prototype.signal = function(e, t) {
        gt(e, t) && this.events.push(arguments);
      }, Ii.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++)
          We.apply(null, this.events[e]);
      };
      function _f(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = tr(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = tr(e) + "px", t.scrollbarsClipped = !0);
      }
      function Rf(e) {
        if (e.hasFocus())
          return null;
        var t = A(ge(e));
        if (!t || !ce(e.display.lineDiv, t))
          return null;
        var n = { activeElt: t };
        if (window.getSelection) {
          var r = je(e).getSelection();
          r.anchorNode && r.extend && ce(e.display.lineDiv, r.anchorNode) && (n.anchorNode = r.anchorNode, n.anchorOffset = r.anchorOffset, n.focusNode = r.focusNode, n.focusOffset = r.focusOffset);
        }
        return n;
      }
      function jf(e) {
        if (!(!e || !e.activeElt || e.activeElt == A(e.activeElt.ownerDocument)) && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && ce(document.body, e.anchorNode) && ce(document.body, e.focusNode))) {
          var t = e.activeElt.ownerDocument, n = t.defaultView.getSelection(), r = t.createRange();
          r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), n.removeAllRanges(), n.addRange(r), n.extend(e.focusNode, e.focusOffset);
        }
      }
      function _o(e, t) {
        var n = e.display, r = e.doc;
        if (t.editorIsHidden)
          return Sr(e), !1;
        if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && va(e) == 0)
          return !1;
        Aa(e) && (Sr(e), t.dims = Eo(e));
        var i = r.first + r.size, o = Math.max(t.visible.from - e.options.viewportMargin, r.first), l = Math.min(i, t.visible.to + e.options.viewportMargin);
        n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(i, n.viewTo)), ur && (o = bo(e.doc, o), l = Gl(e.doc, l));
        var u = o != n.viewFrom || l != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
        Tf(e, o, l), n.viewOffset = fr(he(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
        var c = va(e);
        if (!u && c == 0 && !t.force && n.renderedView == n.view && (n.updateLineNumbers == null || n.updateLineNumbers >= n.viewTo))
          return !1;
        var h = Rf(e);
        return c > 4 && (n.lineDiv.style.display = "none"), qf(e, n.updateLineNumbers, t.dims), c > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, jf(h), q(n.cursorDiv), q(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, u && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, Hn(e, 400)), n.updateLineNumbers = null, !0;
      }
      function La(e, t) {
        for (var n = t.viewport, r = !0; ; r = !1) {
          if (!r || !e.options.lineWrapping || t.oldDisplayWidth == Pr(e)) {
            if (n && n.top != null && (n = { top: Math.min(e.doc.height + Co(e.display) - Lo(e), n.top) }), t.visible = Ei(e.display, e.doc, n), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
              break;
          } else
            r && (t.visible = Ei(e.display, e.doc, n));
          if (!_o(e, t))
            break;
          Mi(e);
          var i = Pn(e);
          On(e), nn(e, i), qo(e, i), t.force = !1;
        }
        t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }
      function Ro(e, t) {
        var n = new Ii(e, t);
        if (_o(e, n)) {
          Mi(e), La(e, n);
          var r = Pn(e);
          On(e), nn(e, r), qo(e, r), n.finish();
        }
      }
      function qf(e, t, n) {
        var r = e.display, i = e.options.lineNumbers, o = r.lineDiv, l = o.firstChild;
        function u(_) {
          var U = _.nextSibling;
          return w && K && e.display.currentWheelTarget == _ ? _.style.display = "none" : _.parentNode.removeChild(_), U;
        }
        for (var c = r.view, h = r.viewFrom, b = 0; b < c.length; b++) {
          var C = c[b];
          if (!C.hidden)
            if (!C.node || C.node.parentNode != o) {
              var I = vf(e, C, h, n);
              o.insertBefore(I, l);
            } else {
              for (; l != C.node; )
                l = u(l);
              var E = i && t != null && t <= h && C.lineNumber;
              C.changes && (de(C.changes, "gutter") > -1 && (E = !1), Ql(e, C, h, n)), E && (q(C.lineNumber), C.lineNumber.appendChild(document.createTextNode(L(e.options, h)))), l = C.node.nextSibling;
            }
          h += C.size;
        }
        for (; l; )
          l = u(l);
      }
      function jo(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px", rt(e, "gutterChanged", e);
      }
      function qo(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + tr(e) + "px";
      }
      function Ta(e) {
        var t = e.display, n = t.view;
        if (!(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))) {
          for (var r = Oo(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", l = 0; l < n.length; l++)
            if (!n[l].hidden) {
              e.options.fixedGutter && (n[l].gutter && (n[l].gutter.style.left = o), n[l].gutterBackground && (n[l].gutterBackground.style.left = o));
              var u = n[l].alignable;
              if (u)
                for (var c = 0; c < u.length; c++)
                  u[c].style.left = o;
            }
          e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
        }
      }
      function Aa(e) {
        if (!e.options.lineNumbers)
          return !1;
        var t = e.doc, n = L(e.options, t.first + t.size - 1), r = e.display;
        if (n.length != r.lineNumChars) {
          var i = r.measure.appendChild(y(
            "div",
            [y("div", n)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          )), o = i.firstChild.offsetWidth, l = i.offsetWidth - o;
          return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - l) + 1, r.lineNumWidth = r.lineNumInnerWidth + l, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", jo(e.display), !0;
        }
        return !1;
      }
      function Ko(e, t) {
        for (var n = [], r = !1, i = 0; i < e.length; i++) {
          var o = e[i], l = null;
          if (typeof o != "string" && (l = o.style, o = o.className), o == "CodeMirror-linenumbers")
            if (t)
              r = !0;
            else
              continue;
          n.push({ className: o, style: l });
        }
        return t && !r && n.push({ className: "CodeMirror-linenumbers", style: null }), n;
      }
      function Fa(e) {
        var t = e.gutters, n = e.gutterSpecs;
        q(t), e.lineGutter = null;
        for (var r = 0; r < n.length; ++r) {
          var i = n[r], o = i.className, l = i.style, u = t.appendChild(y("div", null, "CodeMirror-gutter " + o));
          l && (u.style.cssText = l), o == "CodeMirror-linenumbers" && (e.lineGutter = u, u.style.width = (e.lineNumWidth || 1) + "px");
        }
        t.style.display = n.length ? "" : "none", jo(e);
      }
      function zn(e) {
        Fa(e.display), St(e), Ta(e);
      }
      function Kf(e, t, n, r) {
        var i = this;
        this.input = n, i.scrollbarFiller = y("div", null, "CodeMirror-scrollbar-filler"), i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = y("div", null, "CodeMirror-gutter-filler"), i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = V("div", null, "CodeMirror-code"), i.selectionDiv = y("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = y("div", null, "CodeMirror-cursors"), i.measure = y("div", null, "CodeMirror-measure"), i.lineMeasure = y("div", null, "CodeMirror-measure"), i.lineSpace = V(
          "div",
          [i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var o = V("div", [i.lineSpace], "CodeMirror-lines");
        i.mover = y("div", [o], null, "position: relative"), i.sizer = y("div", [i.mover], "CodeMirror-sizer"), i.sizerWidth = null, i.heightForcer = y("div", null, null, "position: absolute; height: " + xe + "px; width: 1px;"), i.gutters = y("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = y("div", [i.sizer, i.heightForcer, i.gutters], "CodeMirror-scroll"), i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = y("div", [i.scrollbarFiller, i.gutterFiller, i.scroller], "CodeMirror"), D && z >= 105 && (i.wrapper.style.clipPath = "inset(0px)"), i.wrapper.setAttribute("translate", "no"), S && T < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0), !w && !(d && H) && (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)), i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first, i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0, i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0, i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null, i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null, i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null, i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, i.gutterSpecs = Ko(r.gutters, r.lineNumbers), Fa(i), n.init(i);
      }
      var Ni = 0, hr = null;
      S ? hr = -0.53 : d ? hr = 15 : D ? hr = -0.7 : Y && (hr = -1 / 3);
      function Da(e) {
        var t = e.wheelDeltaX, n = e.wheelDeltaY;
        return t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), n == null && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : n == null && (n = e.wheelDelta), { x: t, y: n };
      }
      function Uf(e) {
        var t = Da(e);
        return t.x *= hr, t.y *= hr, t;
      }
      function Ma(e, t) {
        D && z == 102 && (e.display.chromeScrollHack == null ? e.display.sizer.style.pointerEvents = "none" : clearTimeout(e.display.chromeScrollHack), e.display.chromeScrollHack = setTimeout(function() {
          e.display.chromeScrollHack = null, e.display.sizer.style.pointerEvents = "";
        }, 100));
        var n = Da(t), r = n.x, i = n.y, o = hr;
        t.deltaMode === 0 && (r = t.deltaX, i = t.deltaY, o = 1);
        var l = e.display, u = l.scroller, c = u.scrollWidth > u.clientWidth, h = u.scrollHeight > u.clientHeight;
        if (!!(r && c || i && h)) {
          if (i && K && w) {
            e:
              for (var b = t.target, C = l.view; b != u; b = b.parentNode)
                for (var I = 0; I < C.length; I++)
                  if (C[I].node == b) {
                    e.display.currentWheelTarget = b;
                    break e;
                  }
          }
          if (r && !d && !j && o != null) {
            i && h && Nn(e, Math.max(0, u.scrollTop + i * o)), Wr(e, Math.max(0, u.scrollLeft + r * o)), (!i || i && h) && ft(t), l.wheelStartX = null;
            return;
          }
          if (i && o != null) {
            var E = i * o, _ = e.doc.scrollTop, U = _ + l.wrapper.clientHeight;
            E < 0 ? _ = Math.max(0, _ + E - 50) : U = Math.min(e.doc.height, U + E + 50), Ro(e, { top: _, bottom: U });
          }
          Ni < 20 && t.deltaMode !== 0 && (l.wheelStartX == null ? (l.wheelStartX = u.scrollLeft, l.wheelStartY = u.scrollTop, l.wheelDX = r, l.wheelDY = i, setTimeout(function() {
            if (l.wheelStartX != null) {
              var Z = u.scrollLeft - l.wheelStartX, ee = u.scrollTop - l.wheelStartY, oe = ee && l.wheelDY && ee / l.wheelDY || Z && l.wheelDX && Z / l.wheelDX;
              l.wheelStartX = l.wheelStartY = null, oe && (hr = (hr * Ni + oe) / (Ni + 1), ++Ni);
            }
          }, 200)) : (l.wheelDX += r, l.wheelDY += i));
        }
      }
      var Nt = function(e, t) {
        this.ranges = e, this.primIndex = t;
      };
      Nt.prototype.primary = function() {
        return this.ranges[this.primIndex];
      }, Nt.prototype.equals = function(e) {
        if (e == this)
          return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
          return !1;
        for (var t = 0; t < this.ranges.length; t++) {
          var n = this.ranges[t], r = e.ranges[t];
          if (!Se(n.anchor, r.anchor) || !Se(n.head, r.head))
            return !1;
        }
        return !0;
      }, Nt.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new Ie(De(this.ranges[t].anchor), De(this.ranges[t].head));
        return new Nt(e, this.primIndex);
      }, Nt.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
          if (!this.ranges[e].empty())
            return !0;
        return !1;
      }, Nt.prototype.contains = function(e, t) {
        t || (t = e);
        for (var n = 0; n < this.ranges.length; n++) {
          var r = this.ranges[n];
          if (W(t, r.from()) >= 0 && W(e, r.to()) <= 0)
            return n;
        }
        return -1;
      };
      var Ie = function(e, t) {
        this.anchor = e, this.head = t;
      };
      Ie.prototype.from = function() {
        return Ve(this.anchor, this.head);
      }, Ie.prototype.to = function() {
        return Ee(this.anchor, this.head);
      }, Ie.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function Ut(e, t, n) {
        var r = e && e.options.selectionsMayTouch, i = t[n];
        t.sort(function(I, E) {
          return W(I.from(), E.from());
        }), n = de(t, i);
        for (var o = 1; o < t.length; o++) {
          var l = t[o], u = t[o - 1], c = W(u.to(), l.from());
          if (r && !l.empty() ? c > 0 : c >= 0) {
            var h = Ve(u.from(), l.from()), b = Ee(u.to(), l.to()), C = u.empty() ? l.from() == l.head : u.from() == u.head;
            o <= n && --n, t.splice(--o, 2, new Ie(C ? b : h, C ? h : b));
          }
        }
        return new Nt(t, n);
      }
      function Cr(e, t) {
        return new Nt([new Ie(e, t || e)], 0);
      }
      function Lr(e) {
        return e.text ? M(
          e.from.line + e.text.length - 1,
          ke(e.text).length + (e.text.length == 1 ? e.from.ch : 0)
        ) : e.to;
      }
      function Ea(e, t) {
        if (W(e, t.from) < 0)
          return e;
        if (W(e, t.to) <= 0)
          return Lr(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1, r = e.ch;
        return e.line == t.to.line && (r += Lr(t).ch - t.to.ch), M(n, r);
      }
      function Uo(e, t) {
        for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
          var i = e.sel.ranges[r];
          n.push(new Ie(
            Ea(i.anchor, t),
            Ea(i.head, t)
          ));
        }
        return Ut(e.cm, n, e.sel.primIndex);
      }
      function Oa(e, t, n) {
        return e.line == t.line ? M(n.line, e.ch - t.ch + n.ch) : M(n.line + (e.line - t.line), e.ch);
      }
      function Gf(e, t, n) {
        for (var r = [], i = M(e.first, 0), o = i, l = 0; l < t.length; l++) {
          var u = t[l], c = Oa(u.from, i, o), h = Oa(Lr(u), i, o);
          if (i = u.to, o = h, n == "around") {
            var b = e.sel.ranges[l], C = W(b.head, b.anchor) < 0;
            r[l] = new Ie(C ? h : c, C ? c : h);
          } else
            r[l] = new Ie(c, c);
        }
        return new Nt(r, e.sel.primIndex);
      }
      function Go(e) {
        e.doc.mode = lr(e.options, e.doc.modeOption), Wn(e);
      }
      function Wn(e) {
        e.doc.iter(function(t) {
          t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, Hn(e, 100), e.state.modeGen++, e.curOp && St(e);
      }
      function Ia(e, t) {
        return t.from.ch == 0 && t.to.ch == 0 && ke(t.text) == "" && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }
      function $o(e, t, n, r) {
        function i(oe) {
          return n ? n[oe] : null;
        }
        function o(oe, te, se) {
          Vu(oe, te, se, r), rt(oe, "change", oe, t);
        }
        function l(oe, te) {
          for (var se = [], ye = oe; ye < te; ++ye)
            se.push(new Zr(h[ye], i(ye), r));
          return se;
        }
        var u = t.from, c = t.to, h = t.text, b = he(e, u.line), C = he(e, c.line), I = ke(h), E = i(h.length - 1), _ = c.line - u.line;
        if (t.full)
          e.insert(0, l(0, h.length)), e.remove(h.length, e.size - h.length);
        else if (Ia(e, t)) {
          var U = l(0, h.length - 1);
          o(C, C.text, E), _ && e.remove(u.line, _), U.length && e.insert(u.line, U);
        } else if (b == C)
          if (h.length == 1)
            o(b, b.text.slice(0, u.ch) + I + b.text.slice(c.ch), E);
          else {
            var Z = l(1, h.length - 1);
            Z.push(new Zr(I + b.text.slice(c.ch), E, r)), o(b, b.text.slice(0, u.ch) + h[0], i(0)), e.insert(u.line + 1, Z);
          }
        else if (h.length == 1)
          o(b, b.text.slice(0, u.ch) + h[0] + C.text.slice(c.ch), i(0)), e.remove(u.line + 1, _);
        else {
          o(b, b.text.slice(0, u.ch) + h[0], i(0)), o(C, I + C.text.slice(c.ch), E);
          var ee = l(1, h.length - 1);
          _ > 1 && e.remove(u.line + 1, _ - 1), e.insert(u.line + 1, ee);
        }
        rt(e, "change", e, t);
      }
      function Tr(e, t, n) {
        function r(i, o, l) {
          if (i.linked)
            for (var u = 0; u < i.linked.length; ++u) {
              var c = i.linked[u];
              if (c.doc != o) {
                var h = l && c.sharedHist;
                n && !h || (t(c.doc, h), r(c.doc, i, h));
              }
            }
        }
        r(e, null, !0);
      }
      function Na(e, t) {
        if (t.cm)
          throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, Io(e), Go(e), Pa(e), e.options.direction = t.direction, e.options.lineWrapping || ko(e), e.options.mode = t.modeOption, St(e);
      }
      function Pa(e) {
        (e.doc.direction == "rtl" ? v : Ae)(e.display.lineDiv, "CodeMirror-rtl");
      }
      function $f(e) {
        Mt(e, function() {
          Pa(e), St(e);
        });
      }
      function Pi(e) {
        this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1;
      }
      function Xo(e, t) {
        var n = { from: De(t.from), to: Lr(t), text: sr(e, t.from, t.to) };
        return za(e, n, t.from.line, t.to.line + 1), Tr(e, function(r) {
          return za(r, n, t.from.line, t.to.line + 1);
        }, !0), n;
      }
      function Ba(e) {
        for (; e.length; ) {
          var t = ke(e);
          if (t.ranges)
            e.pop();
          else
            break;
        }
      }
      function Xf(e, t) {
        if (t)
          return Ba(e.done), ke(e.done);
        if (e.done.length && !ke(e.done).ranges)
          return ke(e.done);
        if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
          return e.done.pop(), ke(e.done);
      }
      function Ha(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var o = +new Date(), l, u;
        if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && i.lastModTime > o - (e.cm ? e.cm.options.historyEventDelay : 500) || t.origin.charAt(0) == "*")) && (l = Xf(i, i.lastOp == r)))
          u = ke(l.changes), W(t.from, t.to) == 0 && W(t.from, u.to) == 0 ? u.to = Lr(t) : l.changes.push(Xo(e, t));
        else {
          var c = ke(i.done);
          for ((!c || !c.ranges) && Bi(e.sel, i.done), l = {
            changes: [Xo(e, t)],
            generation: i.generation
          }, i.done.push(l); i.done.length > i.undoDepth; )
            i.done.shift(), i.done[0].ranges || i.done.shift();
        }
        i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = o, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, u || We(e, "historyAdded");
      }
      function Yf(e, t, n, r) {
        var i = t.charAt(0);
        return i == "*" || i == "+" && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }
      function Zf(e, t, n, r) {
        var i = e.history, o = r && r.origin;
        n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || Yf(e, o, ke(i.done), t)) ? i.done[i.done.length - 1] = t : Bi(t, i.done), i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = n, r && r.clearRedo !== !1 && Ba(i.undone);
      }
      function Bi(e, t) {
        var n = ke(t);
        n && n.ranges && n.equals(e) || t.push(e);
      }
      function za(e, t, n, r) {
        var i = t["spans_" + e.id], o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(l) {
          l.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = l.markedSpans), ++o;
        });
      }
      function Qf(e) {
        if (!e)
          return null;
        for (var t, n = 0; n < e.length; ++n)
          e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t : null : e;
      }
      function Jf(e, t) {
        var n = t["spans_" + e.id];
        if (!n)
          return null;
        for (var r = [], i = 0; i < t.text.length; ++i)
          r.push(Qf(n[i]));
        return r;
      }
      function Wa(e, t) {
        var n = Jf(e, t), r = yo(e, t);
        if (!n)
          return r;
        if (!r)
          return n;
        for (var i = 0; i < n.length; ++i) {
          var o = n[i], l = r[i];
          if (o && l) {
            e:
              for (var u = 0; u < l.length; ++u) {
                for (var c = l[u], h = 0; h < o.length; ++h)
                  if (o[h].marker == c.marker)
                    continue e;
                o.push(c);
              }
          } else
            l && (n[i] = l);
        }
        return n;
      }
      function on(e, t, n) {
        for (var r = [], i = 0; i < e.length; ++i) {
          var o = e[i];
          if (o.ranges) {
            r.push(n ? Nt.prototype.deepCopy.call(o) : o);
            continue;
          }
          var l = o.changes, u = [];
          r.push({ changes: u });
          for (var c = 0; c < l.length; ++c) {
            var h = l[c], b = void 0;
            if (u.push({ from: h.from, to: h.to, text: h.text }), t)
              for (var C in h)
                (b = C.match(/^spans_(\d+)$/)) && de(t, Number(b[1])) > -1 && (ke(u)[C] = h[C], delete h[C]);
          }
        }
        return r;
      }
      function Yo(e, t, n, r) {
        if (r) {
          var i = e.anchor;
          if (n) {
            var o = W(t, i) < 0;
            o != W(n, i) < 0 ? (i = t, t = n) : o != W(t, n) < 0 && (t = n);
          }
          return new Ie(i, t);
        } else
          return new Ie(n || t, t);
      }
      function Hi(e, t, n, r, i) {
        i == null && (i = e.cm && (e.cm.display.shift || e.extend)), ct(e, new Nt([Yo(e.sel.primary(), t, n, i)], 0), r);
      }
      function _a(e, t, n) {
        for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++)
          r[o] = Yo(e.sel.ranges[o], t[o], null, i);
        var l = Ut(e.cm, r, e.sel.primIndex);
        ct(e, l, n);
      }
      function Zo(e, t, n, r) {
        var i = e.sel.ranges.slice(0);
        i[t] = n, ct(e, Ut(e.cm, i, e.sel.primIndex), r);
      }
      function Ra(e, t, n, r) {
        ct(e, Cr(t, n), r);
      }
      function Vf(e, t, n) {
        var r = {
          ranges: t.ranges,
          update: function(i) {
            this.ranges = [];
            for (var o = 0; o < i.length; o++)
              this.ranges[o] = new Ie(
                Ce(e, i[o].anchor),
                Ce(e, i[o].head)
              );
          },
          origin: n && n.origin
        };
        return We(e, "beforeSelectionChange", e, r), e.cm && We(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? Ut(e.cm, r.ranges, r.ranges.length - 1) : t;
      }
      function ja(e, t, n) {
        var r = e.history.done, i = ke(r);
        i && i.ranges ? (r[r.length - 1] = t, zi(e, t, n)) : ct(e, t, n);
      }
      function ct(e, t, n) {
        zi(e, t, n), Zf(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
      }
      function zi(e, t, n) {
        (gt(e, "beforeSelectionChange") || e.cm && gt(e.cm, "beforeSelectionChange")) && (t = Vf(e, t, n));
        var r = n && n.bias || (W(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        qa(e, Ua(e, t, r, !0)), !(n && n.scroll === !1) && e.cm && e.cm.getOption("readOnly") != "nocursor" && rn(e.cm);
      }
      function qa(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, di(e.cm)), rt(e, "cursorActivity", e));
      }
      function Ka(e) {
        qa(e, Ua(e, e.sel, null, !1));
      }
      function Ua(e, t, n, r) {
        for (var i, o = 0; o < t.ranges.length; o++) {
          var l = t.ranges[o], u = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], c = Wi(e, l.anchor, u && u.anchor, n, r), h = l.head == l.anchor ? c : Wi(e, l.head, u && u.head, n, r);
          (i || c != l.anchor || h != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new Ie(c, h));
        }
        return i ? Ut(e.cm, i, t.primIndex) : t;
      }
      function ln(e, t, n, r, i) {
        var o = he(e, t.line);
        if (o.markedSpans)
          for (var l = 0; l < o.markedSpans.length; ++l) {
            var u = o.markedSpans[l], c = u.marker, h = "selectLeft" in c ? !c.selectLeft : c.inclusiveLeft, b = "selectRight" in c ? !c.selectRight : c.inclusiveRight;
            if ((u.from == null || (h ? u.from <= t.ch : u.from < t.ch)) && (u.to == null || (b ? u.to >= t.ch : u.to > t.ch))) {
              if (i && (We(c, "beforeCursorEnter"), c.explicitlyCleared))
                if (o.markedSpans) {
                  --l;
                  continue;
                } else
                  break;
              if (!c.atomic)
                continue;
              if (n) {
                var C = c.find(r < 0 ? 1 : -1), I = void 0;
                if ((r < 0 ? b : h) && (C = Ga(e, C, -r, C && C.line == t.line ? o : null)), C && C.line == t.line && (I = W(C, n)) && (r < 0 ? I < 0 : I > 0))
                  return ln(e, C, t, r, i);
              }
              var E = c.find(r < 0 ? -1 : 1);
              return (r < 0 ? h : b) && (E = Ga(e, E, r, E.line == t.line ? o : null)), E ? ln(e, E, t, r, i) : null;
            }
          }
        return t;
      }
      function Wi(e, t, n, r, i) {
        var o = r || 1, l = ln(e, t, n, o, i) || !i && ln(e, t, n, o, !0) || ln(e, t, n, -o, i) || !i && ln(e, t, n, -o, !0);
        return l || (e.cantEdit = !0, M(e.first, 0));
      }
      function Ga(e, t, n, r) {
        return n < 0 && t.ch == 0 ? t.line > e.first ? Ce(e, M(t.line - 1)) : null : n > 0 && t.ch == (r || he(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? M(t.line + 1, 0) : null : new M(t.line, t.ch + n);
      }
      function $a(e) {
        e.setSelection(M(e.firstLine(), 0), M(e.lastLine()), Be);
      }
      function Xa(e, t, n) {
        var r = {
          canceled: !1,
          from: t.from,
          to: t.to,
          text: t.text,
          origin: t.origin,
          cancel: function() {
            return r.canceled = !0;
          }
        };
        return n && (r.update = function(i, o, l, u) {
          i && (r.from = Ce(e, i)), o && (r.to = Ce(e, o)), l && (r.text = l), u !== void 0 && (r.origin = u);
        }), We(e, "beforeChange", e, r), e.cm && We(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : { from: r.from, to: r.to, text: r.text, origin: r.origin };
      }
      function an(e, t, n) {
        if (e.cm) {
          if (!e.cm.curOp)
            return nt(e.cm, an)(e, t, n);
          if (e.cm.state.suppressEdits)
            return;
        }
        if (!((gt(e, "beforeChange") || e.cm && gt(e.cm, "beforeChange")) && (t = Xa(e, t, !0), !t))) {
          var r = Wl && !n && Yu(e, t.from, t.to);
          if (r)
            for (var i = r.length - 1; i >= 0; --i)
              Ya(e, { from: r[i].from, to: r[i].to, text: i ? [""] : t.text, origin: t.origin });
          else
            Ya(e, t);
        }
      }
      function Ya(e, t) {
        if (!(t.text.length == 1 && t.text[0] == "" && W(t.from, t.to) == 0)) {
          var n = Uo(e, t);
          Ha(e, t, n, e.cm ? e.cm.curOp.id : NaN), _n(e, t, n, yo(e, t));
          var r = [];
          Tr(e, function(i, o) {
            !o && de(r, i.history) == -1 && (Va(i.history, t), r.push(i.history)), _n(i, t, null, yo(i, t));
          });
        }
      }
      function _i(e, t, n) {
        var r = e.cm && e.cm.state.suppressEdits;
        if (!(r && !n)) {
          for (var i = e.history, o, l = e.sel, u = t == "undo" ? i.done : i.undone, c = t == "undo" ? i.undone : i.done, h = 0; h < u.length && (o = u[h], !(n ? o.ranges && !o.equals(e.sel) : !o.ranges)); h++)
            ;
          if (h != u.length) {
            for (i.lastOrigin = i.lastSelOrigin = null; ; )
              if (o = u.pop(), o.ranges) {
                if (Bi(o, c), n && !o.equals(e.sel)) {
                  ct(e, o, { clearRedo: !1 });
                  return;
                }
                l = o;
              } else if (r) {
                u.push(o);
                return;
              } else
                break;
            var b = [];
            Bi(l, c), c.push({ changes: b, generation: i.generation }), i.generation = o.generation || ++i.maxGeneration;
            for (var C = gt(e, "beforeChange") || e.cm && gt(e.cm, "beforeChange"), I = function(U) {
              var Z = o.changes[U];
              if (Z.origin = t, C && !Xa(e, Z, !1))
                return u.length = 0, {};
              b.push(Xo(e, Z));
              var ee = U ? Uo(e, Z) : ke(u);
              _n(e, Z, ee, Wa(e, Z)), !U && e.cm && e.cm.scrollIntoView({ from: Z.from, to: Lr(Z) });
              var oe = [];
              Tr(e, function(te, se) {
                !se && de(oe, te.history) == -1 && (Va(te.history, Z), oe.push(te.history)), _n(te, Z, null, Wa(te, Z));
              });
            }, E = o.changes.length - 1; E >= 0; --E) {
              var _ = I(E);
              if (_)
                return _.v;
            }
          }
        }
      }
      function Za(e, t) {
        if (t != 0 && (e.first += t, e.sel = new Nt(Ye(e.sel.ranges, function(i) {
          return new Ie(
            M(i.anchor.line + t, i.anchor.ch),
            M(i.head.line + t, i.head.ch)
          );
        }), e.sel.primIndex), e.cm)) {
          St(e.cm, e.first, e.first - t, t);
          for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++)
            kr(e.cm, r, "gutter");
        }
      }
      function _n(e, t, n, r) {
        if (e.cm && !e.cm.curOp)
          return nt(e.cm, _n)(e, t, n, r);
        if (t.to.line < e.first) {
          Za(e, t.text.length - 1 - (t.to.line - t.from.line));
          return;
        }
        if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var i = t.text.length - 1 - (e.first - t.from.line);
            Za(e, i), t = {
              from: M(e.first, 0),
              to: M(t.to.line + i, t.to.ch),
              text: [ke(t.text)],
              origin: t.origin
            };
          }
          var o = e.lastLine();
          t.to.line > o && (t = {
            from: t.from,
            to: M(o, he(e, o).text.length),
            text: [t.text[0]],
            origin: t.origin
          }), t.removed = sr(e, t.from, t.to), n || (n = Uo(e, t)), e.cm ? ec(e.cm, t, r) : $o(e, t, r), zi(e, n, Be), e.cantEdit && Wi(e, M(e.firstLine(), 0)) && (e.cantEdit = !1);
        }
      }
      function ec(e, t, n) {
        var r = e.doc, i = e.display, o = t.from, l = t.to, u = !1, c = o.line;
        e.options.lineWrapping || (c = Oe(qt(he(r, o.line))), r.iter(c, l.line + 1, function(E) {
          if (E == i.maxLine)
            return u = !0, !0;
        })), r.sel.contains(t.from, t.to) > -1 && di(e), $o(r, t, n, ga(e)), e.options.lineWrapping || (r.iter(c, o.line + t.text.length, function(E) {
          var _ = Si(E);
          _ > i.maxLineLength && (i.maxLine = E, i.maxLineLength = _, i.maxLineChanged = !0, u = !1);
        }), u && (e.curOp.updateMaxLine = !0)), ju(r, o.line), Hn(e, 400);
        var h = t.text.length - (l.line - o.line) - 1;
        t.full ? St(e) : o.line == l.line && t.text.length == 1 && !Ia(e.doc, t) ? kr(e, o.line, "text") : St(e, o.line, l.line + 1, h);
        var b = gt(e, "changes"), C = gt(e, "change");
        if (C || b) {
          var I = {
            from: o,
            to: l,
            text: t.text,
            removed: t.removed,
            origin: t.origin
          };
          C && rt(e, "change", e, I), b && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(I);
        }
        e.display.selForContextMenu = null;
      }
      function sn(e, t, n, r, i) {
        var o;
        r || (r = n), W(r, n) < 0 && (o = [r, n], n = o[0], r = o[1]), typeof t == "string" && (t = e.splitLines(t)), an(e, { from: n, to: r, text: t, origin: i });
      }
      function Qa(e, t, n, r) {
        n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
      }
      function Ja(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
          var o = e[i], l = !0;
          if (o.ranges) {
            o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
            for (var u = 0; u < o.ranges.length; u++)
              Qa(o.ranges[u].anchor, t, n, r), Qa(o.ranges[u].head, t, n, r);
            continue;
          }
          for (var c = 0; c < o.changes.length; ++c) {
            var h = o.changes[c];
            if (n < h.from.line)
              h.from = M(h.from.line + r, h.from.ch), h.to = M(h.to.line + r, h.to.ch);
            else if (t <= h.to.line) {
              l = !1;
              break;
            }
          }
          l || (e.splice(0, i + 1), i = 0);
        }
      }
      function Va(e, t) {
        var n = t.from.line, r = t.to.line, i = t.text.length - (r - n) - 1;
        Ja(e.done, n, r, i), Ja(e.undone, n, r, i);
      }
      function Rn(e, t, n, r) {
        var i = t, o = t;
        return typeof t == "number" ? o = he(e, It(e, t)) : i = Oe(t), i == null ? null : (r(o, i) && e.cm && kr(e.cm, i, n), o);
      }
      function jn(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, n = 0; n < e.length; ++n)
          e[n].parent = this, t += e[n].height;
        this.height = t;
      }
      jn.prototype = {
        chunkSize: function() {
          return this.lines.length;
        },
        removeInner: function(e, t) {
          for (var n = e, r = e + t; n < r; ++n) {
            var i = this.lines[n];
            this.height -= i.height, ef(i), rt(i, "delete");
          }
          this.lines.splice(e, t);
        },
        collapse: function(e) {
          e.push.apply(e, this.lines);
        },
        insertInner: function(e, t, n) {
          this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
          for (var r = 0; r < t.length; ++r)
            t[r].parent = this;
        },
        iterN: function(e, t, n) {
          for (var r = e + t; e < r; ++e)
            if (n(this.lines[e]))
              return !0;
        }
      };
      function qn(e) {
        this.children = e;
        for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
          var i = e[r];
          t += i.chunkSize(), n += i.height, i.parent = this;
        }
        this.size = t, this.height = n, this.parent = null;
      }
      qn.prototype = {
        chunkSize: function() {
          return this.size;
        },
        removeInner: function(e, t) {
          this.size -= t;
          for (var n = 0; n < this.children.length; ++n) {
            var r = this.children[n], i = r.chunkSize();
            if (e < i) {
              var o = Math.min(t, i - e), l = r.height;
              if (r.removeInner(e, o), this.height -= l - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), (t -= o) == 0)
                break;
              e = 0;
            } else
              e -= i;
          }
          if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof jn))) {
            var u = [];
            this.collapse(u), this.children = [new jn(u)], this.children[0].parent = this;
          }
        },
        collapse: function(e) {
          for (var t = 0; t < this.children.length; ++t)
            this.children[t].collapse(e);
        },
        insertInner: function(e, t, n) {
          this.size += t.length, this.height += n;
          for (var r = 0; r < this.children.length; ++r) {
            var i = this.children[r], o = i.chunkSize();
            if (e <= o) {
              if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
                for (var l = i.lines.length % 25 + 25, u = l; u < i.lines.length; ) {
                  var c = new jn(i.lines.slice(u, u += 25));
                  i.height -= c.height, this.children.splice(++r, 0, c), c.parent = this;
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
              var t = e.children.splice(e.children.length - 5, 5), n = new qn(t);
              if (e.parent) {
                e.size -= n.size, e.height -= n.height;
                var i = de(e.parent.children, e);
                e.parent.children.splice(i + 1, 0, n);
              } else {
                var r = new qn(e.children);
                r.parent = e, e.children = [r, n], e = r;
              }
              n.parent = e.parent;
            } while (e.children.length > 10);
            e.parent.maybeSpill();
          }
        },
        iterN: function(e, t, n) {
          for (var r = 0; r < this.children.length; ++r) {
            var i = this.children[r], o = i.chunkSize();
            if (e < o) {
              var l = Math.min(t, o - e);
              if (i.iterN(e, l, n))
                return !0;
              if ((t -= l) == 0)
                break;
              e = 0;
            } else
              e -= o;
          }
        }
      };
      var Kn = function(e, t, n) {
        if (n)
          for (var r in n)
            n.hasOwnProperty(r) && (this[r] = n[r]);
        this.doc = e, this.node = t;
      };
      Kn.prototype.clear = function() {
        var e = this.doc.cm, t = this.line.widgets, n = this.line, r = Oe(n);
        if (!(r == null || !t)) {
          for (var i = 0; i < t.length; ++i)
            t[i] == this && t.splice(i--, 1);
          t.length || (n.widgets = null);
          var o = Mn(this);
          _t(n, Math.max(0, n.height - o)), e && (Mt(e, function() {
            es(e, n, -o), kr(e, r, "widget");
          }), rt(e, "lineWidgetCleared", e, this, r));
        }
      }, Kn.prototype.changed = function() {
        var e = this, t = this.height, n = this.doc.cm, r = this.line;
        this.height = null;
        var i = Mn(this) - t;
        !i || (wr(this.doc, r) || _t(r, r.height + i), n && Mt(n, function() {
          n.curOp.forceUpdate = !0, es(n, r, i), rt(n, "lineWidgetChanged", n, e, Oe(r));
        }));
      }, vt(Kn);
      function es(e, t, n) {
        fr(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Wo(e, n);
      }
      function tc(e, t, n, r) {
        var i = new Kn(e, n, r), o = e.cm;
        return o && i.noHScroll && (o.display.alignWidgets = !0), Rn(e, t, "widget", function(l) {
          var u = l.widgets || (l.widgets = []);
          if (i.insertAt == null ? u.push(i) : u.splice(Math.min(u.length, Math.max(0, i.insertAt)), 0, i), i.line = l, o && !wr(e, l)) {
            var c = fr(l) < e.scrollTop;
            _t(l, l.height + Mn(i)), c && Wo(o, i.height), o.curOp.forceUpdate = !0;
          }
          return !0;
        }), o && rt(o, "lineWidgetAdded", o, i, typeof t == "number" ? t : Oe(t)), i;
      }
      var ts = 0, Ar = function(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++ts;
      };
      Ar.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          var e = this.doc.cm, t = e && !e.curOp;
          if (t && Rr(e), gt(this, "clear")) {
            var n = this.find();
            n && rt(this, "clear", n.from, n.to);
          }
          for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
            var l = this.lines[o], u = An(l.markedSpans, this);
            e && !this.collapsed ? kr(e, Oe(l), "text") : e && (u.to != null && (i = Oe(l)), u.from != null && (r = Oe(l))), l.markedSpans = Uu(l.markedSpans, u), u.from == null && this.collapsed && !wr(this.doc, l) && e && _t(l, Vr(e.display));
          }
          if (e && this.collapsed && !e.options.lineWrapping)
            for (var c = 0; c < this.lines.length; ++c) {
              var h = qt(this.lines[c]), b = Si(h);
              b > e.display.maxLineLength && (e.display.maxLine = h, e.display.maxLineLength = b, e.display.maxLineChanged = !0);
            }
          r != null && e && this.collapsed && St(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ka(e.doc)), e && rt(e, "markerCleared", e, this, r, i), t && jr(e), this.parent && this.parent.clear();
        }
      }, Ar.prototype.find = function(e, t) {
        e == null && this.type == "bookmark" && (e = 1);
        for (var n, r, i = 0; i < this.lines.length; ++i) {
          var o = this.lines[i], l = An(o.markedSpans, this);
          if (l.from != null && (n = M(t ? o : Oe(o), l.from), e == -1))
            return n;
          if (l.to != null && (r = M(t ? o : Oe(o), l.to), e == 1))
            return r;
        }
        return n && { from: n, to: r };
      }, Ar.prototype.changed = function() {
        var e = this, t = this.find(-1, !0), n = this, r = this.doc.cm;
        !t || !r || Mt(r, function() {
          var i = t.line, o = Oe(t.line), l = To(r, o);
          if (l && (aa(l), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !wr(n.doc, i) && n.height != null) {
            var u = n.height;
            n.height = null;
            var c = Mn(n) - u;
            c && _t(i, i.height + c);
          }
          rt(r, "markerChanged", r, e);
        });
      }, Ar.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (!t.maybeHiddenMarkers || de(t.maybeHiddenMarkers, this) == -1) && (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(e);
      }, Ar.prototype.detachLine = function(e) {
        if (this.lines.splice(de(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, vt(Ar);
      function un(e, t, n, r, i) {
        if (r && r.shared)
          return rc(e, t, n, r, i);
        if (e.cm && !e.cm.curOp)
          return nt(e.cm, un)(e, t, n, r, i);
        var o = new Ar(e, i), l = W(t, n);
        if (r && me(r, o, !1), l > 0 || l == 0 && o.clearWhenEmpty !== !1)
          return o;
        if (o.replacedWith && (o.collapsed = !0, o.widgetNode = V("span", [o.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
          if (Ul(e, t.line, t, n, o) || t.line != n.line && Ul(e, n.line, t, n, o))
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          Ku();
        }
        o.addToHistory && Ha(e, { from: t, to: n, origin: "markText" }, e.sel, NaN);
        var u = t.line, c = e.cm, h;
        if (e.iter(u, n.line + 1, function(C) {
          c && o.collapsed && !c.options.lineWrapping && qt(C) == c.display.maxLine && (h = !0), o.collapsed && u != t.line && _t(C, 0), Gu(C, new xi(
            o,
            u == t.line ? t.ch : null,
            u == n.line ? n.ch : null
          ), e.cm && e.cm.curOp), ++u;
        }), o.collapsed && e.iter(t.line, n.line + 1, function(C) {
          wr(e, C) && _t(C, 0);
        }), o.clearOnEnter && ne(o, "beforeCursorEnter", function() {
          return o.clear();
        }), o.readOnly && (qu(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++ts, o.atomic = !0), c) {
          if (h && (c.curOp.updateMaxLine = !0), o.collapsed)
            St(c, t.line, n.line + 1);
          else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
            for (var b = t.line; b <= n.line; b++)
              kr(c, b, "text");
          o.atomic && Ka(c.doc), rt(c, "markerAdded", c, o);
        }
        return o;
      }
      var Un = function(e, t) {
        this.markers = e, this.primary = t;
        for (var n = 0; n < e.length; ++n)
          e[n].parent = this;
      };
      Un.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          this.explicitlyCleared = !0;
          for (var e = 0; e < this.markers.length; ++e)
            this.markers[e].clear();
          rt(this, "clear");
        }
      }, Un.prototype.find = function(e, t) {
        return this.primary.find(e, t);
      }, vt(Un);
      function rc(e, t, n, r, i) {
        r = me(r), r.shared = !1;
        var o = [un(e, t, n, r, i)], l = o[0], u = r.widgetNode;
        return Tr(e, function(c) {
          u && (r.widgetNode = u.cloneNode(!0)), o.push(un(c, Ce(c, t), Ce(c, n), r, i));
          for (var h = 0; h < c.linked.length; ++h)
            if (c.linked[h].isParent)
              return;
          l = ke(o);
        }), new Un(o, l);
      }
      function rs(e) {
        return e.findMarks(M(e.first, 0), e.clipPos(M(e.lastLine())), function(t) {
          return t.parent;
        });
      }
      function nc(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n], i = r.find(), o = e.clipPos(i.from), l = e.clipPos(i.to);
          if (W(o, l)) {
            var u = un(e, o, l, r.primary, r.primary.type);
            r.markers.push(u), u.parent = r;
          }
        }
      }
      function ic(e) {
        for (var t = function(r) {
          var i = e[r], o = [i.primary.doc];
          Tr(i.primary.doc, function(c) {
            return o.push(c);
          });
          for (var l = 0; l < i.markers.length; l++) {
            var u = i.markers[l];
            de(o, u.doc) == -1 && (u.parent = null, i.markers.splice(l--, 1));
          }
        }, n = 0; n < e.length; n++)
          t(n);
      }
      var oc = 0, Ct = function(e, t, n, r, i) {
        if (!(this instanceof Ct))
          return new Ct(e, t, n, r, i);
        n == null && (n = 0), qn.call(this, [new jn([new Zr("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = n;
        var o = M(n, 0);
        this.sel = Cr(o), this.history = new Pi(null), this.id = ++oc, this.modeOption = t, this.lineSep = r, this.direction = i == "rtl" ? "rtl" : "ltr", this.extend = !1, typeof e == "string" && (e = this.splitLines(e)), $o(this, { from: o, to: o, text: e }), ct(this, Cr(o), Be);
      };
      Ct.prototype = B(qn.prototype, {
        constructor: Ct,
        iter: function(e, t, n) {
          n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e);
        },
        insert: function(e, t) {
          for (var n = 0, r = 0; r < t.length; ++r)
            n += t[r].height;
          this.insertInner(e - this.first, t, n);
        },
        remove: function(e, t) {
          this.removeInner(e - this.first, t);
        },
        getValue: function(e) {
          var t = Yr(this, this.first, this.first + this.size);
          return e === !1 ? t : t.join(e || this.lineSeparator());
        },
        setValue: it(function(e) {
          var t = M(this.first, 0), n = this.first + this.size - 1;
          an(this, {
            from: t,
            to: M(n, he(this, n).text.length),
            text: this.splitLines(e),
            origin: "setValue",
            full: !0
          }, !0), this.cm && In(this.cm, 0, 0), ct(this, Cr(t), Be);
        }),
        replaceRange: function(e, t, n, r) {
          t = Ce(this, t), n = n ? Ce(this, n) : t, sn(this, e, t, n, r);
        },
        getRange: function(e, t, n) {
          var r = sr(this, Ce(this, e), Ce(this, t));
          return n === !1 ? r : n === "" ? r.join("") : r.join(n || this.lineSeparator());
        },
        getLine: function(e) {
          var t = this.getLineHandle(e);
          return t && t.text;
        },
        getLineHandle: function(e) {
          if (g(this, e))
            return he(this, e);
        },
        getLineNumber: function(e) {
          return Oe(e);
        },
        getLineHandleVisualStart: function(e) {
          return typeof e == "number" && (e = he(this, e)), qt(e);
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
          return Ce(this, e);
        },
        getCursor: function(e) {
          var t = this.sel.primary(), n;
          return e == null || e == "head" ? n = t.head : e == "anchor" ? n = t.anchor : e == "end" || e == "to" || e === !1 ? n = t.to() : n = t.from(), n;
        },
        listSelections: function() {
          return this.sel.ranges;
        },
        somethingSelected: function() {
          return this.sel.somethingSelected();
        },
        setCursor: it(function(e, t, n) {
          Ra(this, Ce(this, typeof e == "number" ? M(e, t || 0) : e), null, n);
        }),
        setSelection: it(function(e, t, n) {
          Ra(this, Ce(this, e), Ce(this, t || e), n);
        }),
        extendSelection: it(function(e, t, n) {
          Hi(this, Ce(this, e), t && Ce(this, t), n);
        }),
        extendSelections: it(function(e, t) {
          _a(this, El(this, e), t);
        }),
        extendSelectionsBy: it(function(e, t) {
          var n = Ye(this.sel.ranges, e);
          _a(this, El(this, n), t);
        }),
        setSelections: it(function(e, t, n) {
          if (!!e.length) {
            for (var r = [], i = 0; i < e.length; i++)
              r[i] = new Ie(
                Ce(this, e[i].anchor),
                Ce(this, e[i].head || e[i].anchor)
              );
            t == null && (t = Math.min(e.length - 1, this.sel.primIndex)), ct(this, Ut(this.cm, r, t), n);
          }
        }),
        addSelection: it(function(e, t, n) {
          var r = this.sel.ranges.slice(0);
          r.push(new Ie(Ce(this, e), Ce(this, t || e))), ct(this, Ut(this.cm, r, r.length - 1), n);
        }),
        getSelection: function(e) {
          for (var t = this.sel.ranges, n, r = 0; r < t.length; r++) {
            var i = sr(this, t[r].from(), t[r].to());
            n = n ? n.concat(i) : i;
          }
          return e === !1 ? n : n.join(e || this.lineSeparator());
        },
        getSelections: function(e) {
          for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
            var i = sr(this, n[r].from(), n[r].to());
            e !== !1 && (i = i.join(e || this.lineSeparator())), t[r] = i;
          }
          return t;
        },
        replaceSelection: function(e, t, n) {
          for (var r = [], i = 0; i < this.sel.ranges.length; i++)
            r[i] = e;
          this.replaceSelections(r, t, n || "+input");
        },
        replaceSelections: it(function(e, t, n) {
          for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
            var l = i.ranges[o];
            r[o] = { from: l.from(), to: l.to(), text: this.splitLines(e[o]), origin: n };
          }
          for (var u = t && t != "end" && Gf(this, r, t), c = r.length - 1; c >= 0; c--)
            an(this, r[c]);
          u ? ja(this, u) : this.cm && rn(this.cm);
        }),
        undo: it(function() {
          _i(this, "undo");
        }),
        redo: it(function() {
          _i(this, "redo");
        }),
        undoSelection: it(function() {
          _i(this, "undo", !0);
        }),
        redoSelection: it(function() {
          _i(this, "redo", !0);
        }),
        setExtending: function(e) {
          this.extend = e;
        },
        getExtending: function() {
          return this.extend;
        },
        historySize: function() {
          for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++)
            e.done[r].ranges || ++t;
          for (var i = 0; i < e.undone.length; i++)
            e.undone[i].ranges || ++n;
          return { undo: t, redo: n };
        },
        clearHistory: function() {
          var e = this;
          this.history = new Pi(this.history), Tr(this, function(t) {
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
            done: on(this.history.done),
            undone: on(this.history.undone)
          };
        },
        setHistory: function(e) {
          var t = this.history = new Pi(this.history);
          t.done = on(e.done.slice(0), null, !0), t.undone = on(e.undone.slice(0), null, !0);
        },
        setGutterMarker: it(function(e, t, n) {
          return Rn(this, e, "gutter", function(r) {
            var i = r.gutterMarkers || (r.gutterMarkers = {});
            return i[t] = n, !n && pt(i) && (r.gutterMarkers = null), !0;
          });
        }),
        clearGutter: it(function(e) {
          var t = this;
          this.iter(function(n) {
            n.gutterMarkers && n.gutterMarkers[e] && Rn(t, n, "gutter", function() {
              return n.gutterMarkers[e] = null, pt(n.gutterMarkers) && (n.gutterMarkers = null), !0;
            });
          });
        }),
        lineInfo: function(e) {
          var t;
          if (typeof e == "number") {
            if (!g(this, e) || (t = e, e = he(this, e), !e))
              return null;
          } else if (t = Oe(e), t == null)
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
        addLineClass: it(function(e, t, n) {
          return Rn(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass";
            if (!r[i])
              r[i] = n;
            else {
              if (ue(n).test(r[i]))
                return !1;
              r[i] += " " + n;
            }
            return !0;
          });
        }),
        removeLineClass: it(function(e, t, n) {
          return Rn(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var i = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass", o = r[i];
            if (o)
              if (n == null)
                r[i] = null;
              else {
                var l = o.match(ue(n));
                if (!l)
                  return !1;
                var u = l.index + l[0].length;
                r[i] = o.slice(0, l.index) + (!l.index || u == o.length ? "" : " ") + o.slice(u) || null;
              }
            else
              return !1;
            return !0;
          });
        }),
        addLineWidget: it(function(e, t, n) {
          return tc(this, e, t, n);
        }),
        removeLineWidget: function(e) {
          e.clear();
        },
        markText: function(e, t, n) {
          return un(this, Ce(this, e), Ce(this, t), n, n && n.type || "range");
        },
        setBookmark: function(e, t) {
          var n = {
            replacedWith: t && (t.nodeType == null ? t.widget : t),
            insertLeft: t && t.insertLeft,
            clearWhenEmpty: !1,
            shared: t && t.shared,
            handleMouseEvents: t && t.handleMouseEvents
          };
          return e = Ce(this, e), un(this, e, e, n, "bookmark");
        },
        findMarksAt: function(e) {
          e = Ce(this, e);
          var t = [], n = he(this, e.line).markedSpans;
          if (n)
            for (var r = 0; r < n.length; ++r) {
              var i = n[r];
              (i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
            }
          return t;
        },
        findMarks: function(e, t, n) {
          e = Ce(this, e), t = Ce(this, t);
          var r = [], i = e.line;
          return this.iter(e.line, t.line + 1, function(o) {
            var l = o.markedSpans;
            if (l)
              for (var u = 0; u < l.length; u++) {
                var c = l[u];
                !(c.to != null && i == e.line && e.ch >= c.to || c.from == null && i != e.line || c.from != null && i == t.line && c.from >= t.ch) && (!n || n(c.marker)) && r.push(c.marker.parent || c.marker);
              }
            ++i;
          }), r;
        },
        getAllMarks: function() {
          var e = [];
          return this.iter(function(t) {
            var n = t.markedSpans;
            if (n)
              for (var r = 0; r < n.length; ++r)
                n[r].from != null && e.push(n[r].marker);
          }), e;
        },
        posFromIndex: function(e) {
          var t, n = this.first, r = this.lineSeparator().length;
          return this.iter(function(i) {
            var o = i.text.length + r;
            if (o > e)
              return t = e, !0;
            e -= o, ++n;
          }), Ce(this, M(n, t));
        },
        indexFromPos: function(e) {
          e = Ce(this, e);
          var t = e.ch;
          if (e.line < this.first || e.ch < 0)
            return 0;
          var n = this.lineSeparator().length;
          return this.iter(this.first, e.line, function(r) {
            t += r.text.length + n;
          }), t;
        },
        copy: function(e) {
          var t = new Ct(
            Yr(this, this.first, this.first + this.size),
            this.modeOption,
            this.first,
            this.lineSep,
            this.direction
          );
          return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
        },
        linkedDoc: function(e) {
          e || (e = {});
          var t = this.first, n = this.first + this.size;
          e.from != null && e.from > t && (t = e.from), e.to != null && e.to < n && (n = e.to);
          var r = new Ct(Yr(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
          return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }), r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], nc(r, rs(this)), r;
        },
        unlinkDoc: function(e) {
          if (e instanceof Re && (e = e.doc), this.linked)
            for (var t = 0; t < this.linked.length; ++t) {
              var n = this.linked[t];
              if (n.doc == e) {
                this.linked.splice(t, 1), e.unlinkDoc(this), ic(rs(this));
                break;
              }
            }
          if (e.history == this.history) {
            var r = [e.id];
            Tr(e, function(i) {
              return r.push(i.id);
            }, !0), e.history = new Pi(null), e.history.done = on(this.history.done, r), e.history.undone = on(this.history.undone, r);
          }
        },
        iterLinkedDocs: function(e) {
          Tr(this, e);
        },
        getMode: function() {
          return this.mode;
        },
        getEditor: function() {
          return this.cm;
        },
        splitLines: function(e) {
          return this.lineSep ? e.split(this.lineSep) : Cn(e);
        },
        lineSeparator: function() {
          return this.lineSep || `
`;
        },
        setDirection: it(function(e) {
          e != "rtl" && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(t) {
            return t.order = null;
          }), this.cm && $f(this.cm));
        })
      }), Ct.prototype.eachLine = Ct.prototype.iter;
      var ns = 0;
      function lc(e) {
        var t = this;
        if (is(t), !(Ue(t, e) || cr(t.display, e))) {
          ft(e), S && (ns = +new Date());
          var n = Hr(t, e, !0), r = e.dataTransfer.files;
          if (!(!n || t.isReadOnly()))
            if (r && r.length && window.FileReader && window.File)
              for (var i = r.length, o = Array(i), l = 0, u = function() {
                ++l == i && nt(t, function() {
                  n = Ce(t.doc, n);
                  var E = {
                    from: n,
                    to: n,
                    text: t.doc.splitLines(
                      o.filter(function(_) {
                        return _ != null;
                      }).join(t.doc.lineSeparator())
                    ),
                    origin: "paste"
                  };
                  an(t.doc, E), ja(t.doc, Cr(Ce(t.doc, n), Ce(t.doc, Lr(E))));
                })();
              }, c = function(E, _) {
                if (t.options.allowDropFileTypes && de(t.options.allowDropFileTypes, E.type) == -1) {
                  u();
                  return;
                }
                var U = new FileReader();
                U.onerror = function() {
                  return u();
                }, U.onload = function() {
                  var Z = U.result;
                  if (/[\x00-\x08\x0e-\x1f]{2}/.test(Z)) {
                    u();
                    return;
                  }
                  o[_] = Z, u();
                }, U.readAsText(E);
              }, h = 0; h < r.length; h++)
                c(r[h], h);
            else {
              if (t.state.draggingText && t.doc.sel.contains(n) > -1) {
                t.state.draggingText(e), setTimeout(function() {
                  return t.display.input.focus();
                }, 20);
                return;
              }
              try {
                var b = e.dataTransfer.getData("Text");
                if (b) {
                  var C;
                  if (t.state.draggingText && !t.state.draggingText.copy && (C = t.listSelections()), zi(t.doc, Cr(n, n)), C)
                    for (var I = 0; I < C.length; ++I)
                      sn(t.doc, "", C[I].anchor, C[I].head, "drag");
                  t.replaceSelection(b, "around", "paste"), t.display.input.focus();
                }
              } catch {
              }
            }
        }
      }
      function ac(e, t) {
        if (S && (!e.state.draggingText || +new Date() - ns < 100)) {
          or(t);
          return;
        }
        if (!(Ue(e, t) || cr(e.display, t)) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !Y)) {
          var n = y("img", null, null, "position: fixed; left: 0; top: 0;");
          n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", j && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), j && n.parentNode.removeChild(n);
        }
      }
      function sc(e, t) {
        var n = Hr(e, t);
        if (!!n) {
          var r = document.createDocumentFragment();
          No(e, n, r), e.display.dragCursor || (e.display.dragCursor = y("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), J(e.display.dragCursor, r);
        }
      }
      function is(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }
      function os(e) {
        if (!!document.getElementsByClassName) {
          for (var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < t.length; r++) {
            var i = t[r].CodeMirror;
            i && n.push(i);
          }
          n.length && n[0].operation(function() {
            for (var o = 0; o < n.length; o++)
              e(n[o]);
          });
        }
      }
      var ls = !1;
      function uc() {
        ls || (fc(), ls = !0);
      }
      function fc() {
        var e;
        ne(window, "resize", function() {
          e == null && (e = setTimeout(function() {
            e = null, os(cc);
          }, 100));
        }), ne(window, "blur", function() {
          return os(tn);
        });
      }
      function cc(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize();
      }
      for (var Fr = {
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
      }, Gn = 0; Gn < 10; Gn++)
        Fr[Gn + 48] = Fr[Gn + 96] = String(Gn);
      for (var Ri = 65; Ri <= 90; Ri++)
        Fr[Ri] = String.fromCharCode(Ri);
      for (var $n = 1; $n <= 12; $n++)
        Fr[$n + 111] = Fr[$n + 63235] = "F" + $n;
      var dr = {};
      dr.basic = {
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
      }, dr.pcDefault = {
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
      }, dr.emacsy = {
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
      }, dr.macDefault = {
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
      }, dr.default = K ? dr.macDefault : dr.pcDefault;
      function hc(e) {
        var t = e.split(/-(?!$)/);
        e = t[t.length - 1];
        for (var n, r, i, o, l = 0; l < t.length - 1; l++) {
          var u = t[l];
          if (/^(cmd|meta|m)$/i.test(u))
            o = !0;
          else if (/^a(lt)?$/i.test(u))
            n = !0;
          else if (/^(c|ctrl|control)$/i.test(u))
            r = !0;
          else if (/^s(hift)?$/i.test(u))
            i = !0;
          else
            throw new Error("Unrecognized modifier name: " + u);
        }
        return n && (e = "Alt-" + e), r && (e = "Ctrl-" + e), o && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
      }
      function dc(e) {
        var t = {};
        for (var n in e)
          if (e.hasOwnProperty(n)) {
            var r = e[n];
            if (/^(name|fallthrough|(de|at)tach)$/.test(n))
              continue;
            if (r == "...") {
              delete e[n];
              continue;
            }
            for (var i = Ye(n.split(" "), hc), o = 0; o < i.length; o++) {
              var l = void 0, u = void 0;
              o == i.length - 1 ? (u = i.join(" "), l = r) : (u = i.slice(0, o + 1).join(" "), l = "...");
              var c = t[u];
              if (!c)
                t[u] = l;
              else if (c != l)
                throw new Error("Inconsistent bindings for " + u);
            }
            delete e[n];
          }
        for (var h in t)
          e[h] = t[h];
        return e;
      }
      function fn(e, t, n, r) {
        t = ji(t);
        var i = t.call ? t.call(e, r) : t[e];
        if (i === !1)
          return "nothing";
        if (i === "...")
          return "multi";
        if (i != null && n(i))
          return "handled";
        if (t.fallthrough) {
          if (Object.prototype.toString.call(t.fallthrough) != "[object Array]")
            return fn(e, t.fallthrough, n, r);
          for (var o = 0; o < t.fallthrough.length; o++) {
            var l = fn(e, t.fallthrough[o], n, r);
            if (l)
              return l;
          }
        }
      }
      function as(e) {
        var t = typeof e == "string" ? e : Fr[e.keyCode];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
      }
      function ss(e, t, n) {
        var r = e;
        return t.altKey && r != "Alt" && (e = "Alt-" + e), (pe ? t.metaKey : t.ctrlKey) && r != "Ctrl" && (e = "Ctrl-" + e), (pe ? t.ctrlKey : t.metaKey) && r != "Mod" && (e = "Cmd-" + e), !n && t.shiftKey && r != "Shift" && (e = "Shift-" + e), e;
      }
      function us(e, t) {
        if (j && e.keyCode == 34 && e.char)
          return !1;
        var n = Fr[e.keyCode];
        return n == null || e.altGraphKey ? !1 : (e.keyCode == 3 && e.code && (n = e.code), ss(n, e, t));
      }
      function ji(e) {
        return typeof e == "string" ? dr[e] : e;
      }
      function cn(e, t) {
        for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
          for (var o = t(n[i]); r.length && W(o.from, ke(r).to) <= 0; ) {
            var l = r.pop();
            if (W(l.from, o.from) < 0) {
              o.from = l.from;
              break;
            }
          }
          r.push(o);
        }
        Mt(e, function() {
          for (var u = r.length - 1; u >= 0; u--)
            sn(e.doc, "", r[u].from, r[u].to, "+delete");
          rn(e);
        });
      }
      function Qo(e, t, n) {
        var r = Yt(e.text, t + n, n);
        return r < 0 || r > e.text.length ? null : r;
      }
      function Jo(e, t, n) {
        var r = Qo(e, t.ch, n);
        return r == null ? null : new M(t.line, r, n < 0 ? "after" : "before");
      }
      function Vo(e, t, n, r, i) {
        if (e) {
          t.doc.direction == "rtl" && (i = -i);
          var o = zt(n, t.doc.direction);
          if (o) {
            var l = i < 0 ? ke(o) : o[0], u = i < 0 == (l.level == 1), c = u ? "after" : "before", h;
            if (l.level > 0 || t.doc.direction == "rtl") {
              var b = Jr(t, n);
              h = i < 0 ? n.text.length - 1 : 0;
              var C = rr(t, b, h).top;
              h = Ke(function(I) {
                return rr(t, b, I).top == C;
              }, i < 0 == (l.level == 1) ? l.from : l.to - 1, h), c == "before" && (h = Qo(n, h, 1));
            } else
              h = i < 0 ? l.to : l.from;
            return new M(r, h, c);
          }
        }
        return new M(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after");
      }
      function pc(e, t, n, r) {
        var i = zt(t, e.doc.direction);
        if (!i)
          return Jo(t, n, r);
        n.ch >= t.text.length ? (n.ch = t.text.length, n.sticky = "before") : n.ch <= 0 && (n.ch = 0, n.sticky = "after");
        var o = Ht(i, n.ch, n.sticky), l = i[o];
        if (e.doc.direction == "ltr" && l.level % 2 == 0 && (r > 0 ? l.to > n.ch : l.from < n.ch))
          return Jo(t, n, r);
        var u = function(ee, oe) {
          return Qo(t, ee instanceof M ? ee.ch : ee, oe);
        }, c, h = function(ee) {
          return e.options.lineWrapping ? (c = c || Jr(e, t), pa(e, t, c, ee)) : { begin: 0, end: t.text.length };
        }, b = h(n.sticky == "before" ? u(n, -1) : n.ch);
        if (e.doc.direction == "rtl" || l.level == 1) {
          var C = l.level == 1 == r < 0, I = u(n, C ? 1 : -1);
          if (I != null && (C ? I <= l.to && I <= b.end : I >= l.from && I >= b.begin)) {
            var E = C ? "before" : "after";
            return new M(n.line, I, E);
          }
        }
        var _ = function(ee, oe, te) {
          for (var se = function(He, ot) {
            return ot ? new M(n.line, u(He, 1), "before") : new M(n.line, He, "after");
          }; ee >= 0 && ee < i.length; ee += oe) {
            var ye = i[ee], ve = oe > 0 == (ye.level != 1), Le = ve ? te.begin : u(te.end, -1);
            if (ye.from <= Le && Le < ye.to || (Le = ve ? ye.from : u(ye.to, -1), te.begin <= Le && Le < te.end))
              return se(Le, ve);
          }
        }, U = _(o + r, r, b);
        if (U)
          return U;
        var Z = r > 0 ? b.end : u(b.begin, -1);
        return Z != null && !(r > 0 && Z == t.text.length) && (U = _(r > 0 ? 0 : i.length - 1, r, h(Z)), U) ? U : null;
      }
      var Xn = {
        selectAll: $a,
        singleSelection: function(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Be);
        },
        killLine: function(e) {
          return cn(e, function(t) {
            if (t.empty()) {
              var n = he(e.doc, t.head.line).text.length;
              return t.head.ch == n && t.head.line < e.lastLine() ? { from: t.head, to: M(t.head.line + 1, 0) } : { from: t.head, to: M(t.head.line, n) };
            } else
              return { from: t.from(), to: t.to() };
          });
        },
        deleteLine: function(e) {
          return cn(e, function(t) {
            return {
              from: M(t.from().line, 0),
              to: Ce(e.doc, M(t.to().line + 1, 0))
            };
          });
        },
        delLineLeft: function(e) {
          return cn(e, function(t) {
            return {
              from: M(t.from().line, 0),
              to: t.from()
            };
          });
        },
        delWrappedLineLeft: function(e) {
          return cn(e, function(t) {
            var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: n }, "div");
            return { from: r, to: t.from() };
          });
        },
        delWrappedLineRight: function(e) {
          return cn(e, function(t) {
            var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
            return { from: t.from(), to: r };
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
          return e.extendSelection(M(e.firstLine(), 0));
        },
        goDocEnd: function(e) {
          return e.extendSelection(M(e.lastLine()));
        },
        goLineStart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return fs(e, t.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return cs(e, t.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return gc(e, t.head.line);
            },
            { origin: "+move", bias: -1 }
          );
        },
        goLineRight: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div");
          }, st);
        },
        goLineLeft: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: 0, top: n }, "div");
          }, st);
        },
        goLineLeftSmart: function(e) {
          return e.extendSelectionsBy(function(t) {
            var n = e.cursorCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: n }, "div");
            return r.ch < e.getLine(r.line).search(/\S/) ? cs(e, t.head) : r;
          }, st);
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
          for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
            var o = n[i].from(), l = fe(e.getLine(o.line), o.ch, r);
            t.push(_e(r - l % r));
          }
          e.replaceSelections(t);
        },
        defaultTab: function(e) {
          e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
        },
        transposeChars: function(e) {
          return Mt(e, function() {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
              if (!!t[r].empty()) {
                var i = t[r].head, o = he(e.doc, i.line).text;
                if (o) {
                  if (i.ch == o.length && (i = new M(i.line, i.ch - 1)), i.ch > 0)
                    i = new M(i.line, i.ch + 1), e.replaceRange(
                      o.charAt(i.ch - 1) + o.charAt(i.ch - 2),
                      M(i.line, i.ch - 2),
                      i,
                      "+transpose"
                    );
                  else if (i.line > e.doc.first) {
                    var l = he(e.doc, i.line - 1).text;
                    l && (i = new M(i.line, 1), e.replaceRange(
                      o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1),
                      M(i.line - 1, l.length - 1),
                      i,
                      "+transpose"
                    ));
                  }
                }
                n.push(new Ie(i, i));
              }
            e.setSelections(n);
          });
        },
        newlineAndIndent: function(e) {
          return Mt(e, function() {
            for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--)
              e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input");
            t = e.listSelections();
            for (var r = 0; r < t.length; r++)
              e.indentLine(t[r].from().line, null, !0);
            rn(e);
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
      function fs(e, t) {
        var n = he(e.doc, t), r = qt(n);
        return r != n && (t = Oe(r)), Vo(!0, e, r, t, 1);
      }
      function gc(e, t) {
        var n = he(e.doc, t), r = Qu(n);
        return r != n && (t = Oe(r)), Vo(!0, e, n, t, -1);
      }
      function cs(e, t) {
        var n = fs(e, t.line), r = he(e.doc, n.line), i = zt(r, e.doc.direction);
        if (!i || i[0].level == 0) {
          var o = Math.max(n.ch, r.text.search(/\S/)), l = t.line == n.line && t.ch <= o && t.ch;
          return M(n.line, l ? 0 : o, n.sticky);
        }
        return n;
      }
      function qi(e, t, n) {
        if (typeof t == "string" && (t = Xn[t], !t))
          return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift, i = !1;
        try {
          e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != we;
        } finally {
          e.display.shift = r, e.state.suppressEdits = !1;
        }
        return i;
      }
      function vc(e, t, n) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
          var i = fn(t, e.state.keyMaps[r], n, e);
          if (i)
            return i;
        }
        return e.options.extraKeys && fn(t, e.options.extraKeys, n, e) || fn(t, e.options.keyMap, n, e);
      }
      var mc = new be();
      function Yn(e, t, n, r) {
        var i = e.state.keySeq;
        if (i) {
          if (as(t))
            return "handled";
          if (/\'$/.test(t) ? e.state.keySeq = null : mc.set(50, function() {
            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
          }), hs(e, i + " " + t, n, r))
            return !0;
        }
        return hs(e, t, n, r);
      }
      function hs(e, t, n, r) {
        var i = vc(e, t, r);
        return i == "multi" && (e.state.keySeq = t), i == "handled" && rt(e, "keyHandled", e, t, n), (i == "handled" || i == "multi") && (ft(n), Po(e)), !!i;
      }
      function ds(e, t) {
        var n = us(t, !0);
        return n ? t.shiftKey && !e.state.keySeq ? Yn(e, "Shift-" + n, t, function(r) {
          return qi(e, r, !0);
        }) || Yn(e, n, t, function(r) {
          if (typeof r == "string" ? /^go[A-Z]/.test(r) : r.motion)
            return qi(e, r);
        }) : Yn(e, n, t, function(r) {
          return qi(e, r);
        }) : !1;
      }
      function yc(e, t, n) {
        return Yn(e, "'" + n + "'", t, function(r) {
          return qi(e, r, !0);
        });
      }
      var el = null;
      function ps(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && (t.curOp.focus = A(ge(t)), !Ue(t, e))) {
          S && T < 11 && e.keyCode == 27 && (e.returnValue = !1);
          var n = e.keyCode;
          t.display.shift = n == 16 || e.shiftKey;
          var r = ds(t, e);
          j && (el = r ? n : null, !r && n == 88 && !Qt && (K ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), d && !K && !r && n == 46 && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), n == 18 && !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) && xc(t);
        }
      }
      function xc(e) {
        var t = e.display.lineDiv;
        v(t, "CodeMirror-crosshair");
        function n(r) {
          (r.keyCode == 18 || !r.altKey) && (Ae(t, "CodeMirror-crosshair"), ut(document, "keyup", n), ut(document, "mouseover", n));
        }
        ne(document, "keyup", n), ne(document, "mouseover", n);
      }
      function gs(e) {
        e.keyCode == 16 && (this.doc.sel.shift = !1), Ue(this, e);
      }
      function vs(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && !(cr(t.display, e) || Ue(t, e) || e.ctrlKey && !e.altKey || K && e.metaKey)) {
          var n = e.keyCode, r = e.charCode;
          if (j && n == el) {
            el = null, ft(e);
            return;
          }
          if (!(j && (!e.which || e.which < 10) && ds(t, e))) {
            var i = String.fromCharCode(r == null ? n : r);
            i != "\b" && (yc(t, e, i) || t.display.input.onKeyPress(e));
          }
        }
      }
      var bc = 400, tl = function(e, t, n) {
        this.time = e, this.pos = t, this.button = n;
      };
      tl.prototype.compare = function(e, t, n) {
        return this.time + bc > e && W(t, this.pos) == 0 && n == this.button;
      };
      var Zn, Qn;
      function wc(e, t) {
        var n = +new Date();
        return Qn && Qn.compare(n, e, t) ? (Zn = Qn = null, "triple") : Zn && Zn.compare(n, e, t) ? (Qn = new tl(n, e, t), Zn = null, "double") : (Zn = new tl(n, e, t), Qn = null, "single");
      }
      function ms(e) {
        var t = this, n = t.display;
        if (!(Ue(t, e) || n.activeTouch && n.input.supportsTouch())) {
          if (n.input.ensurePolled(), n.shift = e.shiftKey, cr(n, e)) {
            w || (n.scroller.draggable = !1, setTimeout(function() {
              return n.scroller.draggable = !0;
            }, 100));
            return;
          }
          if (!rl(t, e)) {
            var r = Hr(t, e), i = Sn(e), o = r ? wc(r, i) : "single";
            je(t).focus(), i == 1 && t.state.selectingText && t.state.selectingText(e), !(r && kc(t, i, r, o, e)) && (i == 1 ? r ? Cc(t, r, o, e) : kt(e) == n.scroller && ft(e) : i == 2 ? (r && Hi(t.doc, r), setTimeout(function() {
              return n.input.focus();
            }, 20)) : i == 3 && (ie ? t.display.input.onContextMenu(e) : Bo(t)));
          }
        }
      }
      function kc(e, t, n, r, i) {
        var o = "Click";
        return r == "double" ? o = "Double" + o : r == "triple" && (o = "Triple" + o), o = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + o, Yn(e, ss(o, i), i, function(l) {
          if (typeof l == "string" && (l = Xn[l]), !l)
            return !1;
          var u = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), u = l(e, n) != we;
          } finally {
            e.state.suppressEdits = !1;
          }
          return u;
        });
      }
      function Sc(e, t, n) {
        var r = e.getOption("configureMouse"), i = r ? r(e, t, n) : {};
        if (i.unit == null) {
          var o = $ ? n.shiftKey && n.metaKey : n.altKey;
          i.unit = o ? "rectangle" : t == "single" ? "char" : t == "double" ? "word" : "line";
        }
        return (i.extend == null || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey), i.addNew == null && (i.addNew = K ? n.metaKey : n.ctrlKey), i.moveOnDrag == null && (i.moveOnDrag = !(K ? n.altKey : n.ctrlKey)), i;
      }
      function Cc(e, t, n, r) {
        S ? setTimeout(Pe(ya, e), 0) : e.curOp.focus = A(ge(e));
        var i = Sc(e, n, r), o = e.doc.sel, l;
        e.options.dragDrop && po && !e.isReadOnly() && n == "single" && (l = o.contains(t)) > -1 && (W((l = o.ranges[l]).from(), t) < 0 || t.xRel > 0) && (W(l.to(), t) > 0 || t.xRel < 0) ? Lc(e, r, t, i) : Tc(e, r, t, i);
      }
      function Lc(e, t, n, r) {
        var i = e.display, o = !1, l = nt(e, function(h) {
          w && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : Bo(e)), ut(i.wrapper.ownerDocument, "mouseup", l), ut(i.wrapper.ownerDocument, "mousemove", u), ut(i.scroller, "dragstart", c), ut(i.scroller, "drop", l), o || (ft(h), r.addNew || Hi(e.doc, n, null, null, r.extend), w && !Y || S && T == 9 ? setTimeout(function() {
            i.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), i.input.focus();
          }, 20) : i.input.focus());
        }), u = function(h) {
          o = o || Math.abs(t.clientX - h.clientX) + Math.abs(t.clientY - h.clientY) >= 10;
        }, c = function() {
          return o = !0;
        };
        w && (i.scroller.draggable = !0), e.state.draggingText = l, l.copy = !r.moveOnDrag, ne(i.wrapper.ownerDocument, "mouseup", l), ne(i.wrapper.ownerDocument, "mousemove", u), ne(i.scroller, "dragstart", c), ne(i.scroller, "drop", l), e.state.delayingBlurEvent = !0, setTimeout(function() {
          return i.input.focus();
        }, 20), i.scroller.dragDrop && i.scroller.dragDrop();
      }
      function ys(e, t, n) {
        if (n == "char")
          return new Ie(t, t);
        if (n == "word")
          return e.findWordAt(t);
        if (n == "line")
          return new Ie(M(t.line, 0), Ce(e.doc, M(t.line + 1, 0)));
        var r = n(e, t);
        return new Ie(r.from, r.to);
      }
      function Tc(e, t, n, r) {
        S && Bo(e);
        var i = e.display, o = e.doc;
        ft(t);
        var l, u, c = o.sel, h = c.ranges;
        if (r.addNew && !r.extend ? (u = o.sel.contains(n), u > -1 ? l = h[u] : l = new Ie(n, n)) : (l = o.sel.primary(), u = o.sel.primIndex), r.unit == "rectangle")
          r.addNew || (l = new Ie(n, n)), n = Hr(e, t, !0, !0), u = -1;
        else {
          var b = ys(e, n, r.unit);
          r.extend ? l = Yo(l, b.anchor, b.head, r.extend) : l = b;
        }
        r.addNew ? u == -1 ? (u = h.length, ct(
          o,
          Ut(e, h.concat([l]), u),
          { scroll: !1, origin: "*mouse" }
        )) : h.length > 1 && h[u].empty() && r.unit == "char" && !r.extend ? (ct(
          o,
          Ut(e, h.slice(0, u).concat(h.slice(u + 1)), 0),
          { scroll: !1, origin: "*mouse" }
        ), c = o.sel) : Zo(o, u, l, wt) : (u = 0, ct(o, new Nt([l], 0), wt), c = o.sel);
        var C = n;
        function I(te) {
          if (W(C, te) != 0)
            if (C = te, r.unit == "rectangle") {
              for (var se = [], ye = e.options.tabSize, ve = fe(he(o, n.line).text, n.ch, ye), Le = fe(he(o, te.line).text, te.ch, ye), He = Math.min(ve, Le), ot = Math.max(ve, Le), qe = Math.min(n.line, te.line), Et = Math.min(e.lastLine(), Math.max(n.line, te.line)); qe <= Et; qe++) {
                var Lt = he(o, qe).text, Ze = Je(Lt, He, ye);
                He == ot ? se.push(new Ie(M(qe, Ze), M(qe, Ze))) : Lt.length > Ze && se.push(new Ie(M(qe, Ze), M(qe, Je(Lt, ot, ye))));
              }
              se.length || se.push(new Ie(n, n)), ct(
                o,
                Ut(e, c.ranges.slice(0, u).concat(se), u),
                { origin: "*mouse", scroll: !1 }
              ), e.scrollIntoView(te);
            } else {
              var Tt = l, at = ys(e, te, r.unit), et = Tt.anchor, Qe;
              W(at.anchor, et) > 0 ? (Qe = at.head, et = Ve(Tt.from(), at.anchor)) : (Qe = at.anchor, et = Ee(Tt.to(), at.head));
              var $e = c.ranges.slice(0);
              $e[u] = Ac(e, new Ie(Ce(o, et), Qe)), ct(o, Ut(e, $e, u), wt);
            }
        }
        var E = i.wrapper.getBoundingClientRect(), _ = 0;
        function U(te) {
          var se = ++_, ye = Hr(e, te, !0, r.unit == "rectangle");
          if (!!ye)
            if (W(ye, C) != 0) {
              e.curOp.focus = A(ge(e)), I(ye);
              var ve = Ei(i, o);
              (ye.line >= ve.to || ye.line < ve.from) && setTimeout(nt(e, function() {
                _ == se && U(te);
              }), 150);
            } else {
              var Le = te.clientY < E.top ? -20 : te.clientY > E.bottom ? 20 : 0;
              Le && setTimeout(nt(e, function() {
                _ == se && (i.scroller.scrollTop += Le, U(te));
              }), 50);
            }
        }
        function Z(te) {
          e.state.selectingText = !1, _ = 1 / 0, te && (ft(te), i.input.focus()), ut(i.wrapper.ownerDocument, "mousemove", ee), ut(i.wrapper.ownerDocument, "mouseup", oe), o.history.lastSelOrigin = null;
        }
        var ee = nt(e, function(te) {
          te.buttons === 0 || !Sn(te) ? Z(te) : U(te);
        }), oe = nt(e, Z);
        e.state.selectingText = oe, ne(i.wrapper.ownerDocument, "mousemove", ee), ne(i.wrapper.ownerDocument, "mouseup", oe);
      }
      function Ac(e, t) {
        var n = t.anchor, r = t.head, i = he(e.doc, n.line);
        if (W(n, r) == 0 && n.sticky == r.sticky)
          return t;
        var o = zt(i);
        if (!o)
          return t;
        var l = Ht(o, n.ch, n.sticky), u = o[l];
        if (u.from != n.ch && u.to != n.ch)
          return t;
        var c = l + (u.from == n.ch == (u.level != 1) ? 0 : 1);
        if (c == 0 || c == o.length)
          return t;
        var h;
        if (r.line != n.line)
          h = (r.line - n.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
        else {
          var b = Ht(o, r.ch, r.sticky), C = b - l || (r.ch - n.ch) * (u.level == 1 ? -1 : 1);
          b == c - 1 || b == c ? h = C < 0 : h = C > 0;
        }
        var I = o[c + (h ? -1 : 0)], E = h == (I.level == 1), _ = E ? I.from : I.to, U = E ? "after" : "before";
        return n.ch == _ && n.sticky == U ? t : new Ie(new M(n.line, _, U), r);
      }
      function xs(e, t, n, r) {
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
        r && ft(t);
        var l = e.display, u = l.lineDiv.getBoundingClientRect();
        if (o > u.bottom || !gt(e, n))
          return kn(t);
        o -= u.top - l.viewOffset;
        for (var c = 0; c < e.display.gutterSpecs.length; ++c) {
          var h = l.gutters.childNodes[c];
          if (h && h.getBoundingClientRect().right >= i) {
            var b = Vt(e.doc, o), C = e.display.gutterSpecs[c];
            return We(e, n, e, b, C.className, t), kn(t);
          }
        }
      }
      function rl(e, t) {
        return xs(e, t, "gutterClick", !0);
      }
      function bs(e, t) {
        cr(e.display, t) || Fc(e, t) || Ue(e, t, "contextmenu") || ie || e.display.input.onContextMenu(t);
      }
      function Fc(e, t) {
        return gt(e, "gutterContextMenu") ? xs(e, t, "gutterContextMenu", !1) : !1;
      }
      function ws(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), En(e);
      }
      var hn = { toString: function() {
        return "CodeMirror.Init";
      } }, ks = {}, Ki = {};
      function Dc(e) {
        var t = e.optionHandlers;
        function n(r, i, o, l) {
          e.defaults[r] = i, o && (t[r] = l ? function(u, c, h) {
            h != hn && o(u, c, h);
          } : o);
        }
        e.defineOption = n, e.Init = hn, n("value", "", function(r, i) {
          return r.setValue(i);
        }, !0), n("mode", null, function(r, i) {
          r.doc.modeOption = i, Go(r);
        }, !0), n("indentUnit", 2, Go, !0), n("indentWithTabs", !1), n("smartIndent", !0), n("tabSize", 4, function(r) {
          Wn(r), En(r), St(r);
        }, !0), n("lineSeparator", null, function(r, i) {
          if (r.doc.lineSep = i, !!i) {
            var o = [], l = r.doc.first;
            r.doc.iter(function(c) {
              for (var h = 0; ; ) {
                var b = c.text.indexOf(i, h);
                if (b == -1)
                  break;
                h = b + i.length, o.push(M(l, b));
              }
              l++;
            });
            for (var u = o.length - 1; u >= 0; u--)
              sn(r.doc, i, o[u], M(o[u].line, o[u].ch + i.length));
          }
        }), n("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(r, i, o) {
          r.state.specialChars = new RegExp(i.source + (i.test("	") ? "" : "|	"), "g"), o != hn && r.refresh();
        }), n("specialCharPlaceholder", nf, function(r) {
          return r.refresh();
        }, !0), n("electricChars", !0), n("inputStyle", H ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), n("spellcheck", !1, function(r, i) {
          return r.getInputField().spellcheck = i;
        }, !0), n("autocorrect", !1, function(r, i) {
          return r.getInputField().autocorrect = i;
        }, !0), n("autocapitalize", !1, function(r, i) {
          return r.getInputField().autocapitalize = i;
        }, !0), n("rtlMoveVisually", !le), n("wholeLineUpdateBefore", !0), n("theme", "default", function(r) {
          ws(r), zn(r);
        }, !0), n("keyMap", "default", function(r, i, o) {
          var l = ji(i), u = o != hn && ji(o);
          u && u.detach && u.detach(r, l), l.attach && l.attach(r, u || null);
        }), n("extraKeys", null), n("configureMouse", null), n("lineWrapping", !1, Ec, !0), n("gutters", [], function(r, i) {
          r.display.gutterSpecs = Ko(i, r.options.lineNumbers), zn(r);
        }, !0), n("fixedGutter", !0, function(r, i) {
          r.display.gutters.style.left = i ? Oo(r.display) + "px" : "0", r.refresh();
        }, !0), n("coverGutterNextToScrollbar", !1, function(r) {
          return nn(r);
        }, !0), n("scrollbarStyle", "native", function(r) {
          Ca(r), nn(r), r.display.scrollbars.setScrollTop(r.doc.scrollTop), r.display.scrollbars.setScrollLeft(r.doc.scrollLeft);
        }, !0), n("lineNumbers", !1, function(r, i) {
          r.display.gutterSpecs = Ko(r.options.gutters, i), zn(r);
        }, !0), n("firstLineNumber", 1, zn, !0), n("lineNumberFormatter", function(r) {
          return r;
        }, zn, !0), n("showCursorWhenSelecting", !1, On, !0), n("resetSelectionOnContextMenu", !0), n("lineWiseCopyCut", !0), n("pasteLinesPerSelection", !0), n("selectionsMayTouch", !1), n("readOnly", !1, function(r, i) {
          i == "nocursor" && (tn(r), r.display.input.blur()), r.display.input.readOnlyChanged(i);
        }), n("screenReaderLabel", null, function(r, i) {
          i = i === "" ? null : i, r.display.input.screenReaderLabelChanged(i);
        }), n("disableInput", !1, function(r, i) {
          i || r.display.input.reset();
        }, !0), n("dragDrop", !0, Mc), n("allowDropFileTypes", null), n("cursorBlinkRate", 530), n("cursorScrollMargin", 0), n("cursorHeight", 1, On, !0), n("singleCursorHeightPerLine", !0, On, !0), n("workTime", 100), n("workDelay", 100), n("flattenSpans", !0, Wn, !0), n("addModeClass", !1, Wn, !0), n("pollInterval", 100), n("undoDepth", 200, function(r, i) {
          return r.doc.history.undoDepth = i;
        }), n("historyEventDelay", 1250), n("viewportMargin", 10, function(r) {
          return r.refresh();
        }, !0), n("maxHighlightLength", 1e4, Wn, !0), n("moveInputWithCursor", !0, function(r, i) {
          i || r.display.input.resetPosition();
        }), n("tabindex", null, function(r, i) {
          return r.display.input.getField().tabIndex = i || "";
        }), n("autofocus", null), n("direction", "ltr", function(r, i) {
          return r.doc.setDirection(i);
        }, !0), n("phrases", null);
      }
      function Mc(e, t, n) {
        var r = n && n != hn;
        if (!t != !r) {
          var i = e.display.dragFunctions, o = t ? ne : ut;
          o(e.display.scroller, "dragstart", i.start), o(e.display.scroller, "dragenter", i.enter), o(e.display.scroller, "dragover", i.over), o(e.display.scroller, "dragleave", i.leave), o(e.display.scroller, "drop", i.drop);
        }
      }
      function Ec(e) {
        e.options.lineWrapping ? (v(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Ae(e.display.wrapper, "CodeMirror-wrap"), ko(e)), Io(e), St(e), En(e), setTimeout(function() {
          return nn(e);
        }, 100);
      }
      function Re(e, t) {
        var n = this;
        if (!(this instanceof Re))
          return new Re(e, t);
        this.options = t = t ? me(t) : {}, me(ks, t, !1);
        var r = t.value;
        typeof r == "string" ? r = new Ct(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
        var i = new Re.inputStyles[t.inputStyle](this), o = this.display = new Kf(e, r, i, t);
        o.wrapper.CodeMirror = this, ws(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), Ca(this), this.state = {
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
          highlight: new be(),
          keySeq: null,
          specialChars: null
        }, t.autofocus && !H && o.input.focus(), S && T < 11 && setTimeout(function() {
          return n.display.input.reset(!0);
        }, 20), Oc(this), uc(), Rr(this), this.curOp.forceUpdate = !0, Na(this, r), t.autofocus && !H || this.hasFocus() ? setTimeout(function() {
          n.hasFocus() && !n.state.focused && Ho(n);
        }, 20) : tn(this);
        for (var l in Ki)
          Ki.hasOwnProperty(l) && Ki[l](this, t[l], hn);
        Aa(this), t.finishInit && t.finishInit(this);
        for (var u = 0; u < nl.length; ++u)
          nl[u](this);
        jr(this), w && t.lineWrapping && getComputedStyle(o.lineDiv).textRendering == "optimizelegibility" && (o.lineDiv.style.textRendering = "auto");
      }
      Re.defaults = ks, Re.optionHandlers = Ki;
      function Oc(e) {
        var t = e.display;
        ne(t.scroller, "mousedown", nt(e, ms)), S && T < 11 ? ne(t.scroller, "dblclick", nt(e, function(c) {
          if (!Ue(e, c)) {
            var h = Hr(e, c);
            if (!(!h || rl(e, c) || cr(e.display, c))) {
              ft(c);
              var b = e.findWordAt(h);
              Hi(e.doc, b.anchor, b.head);
            }
          }
        })) : ne(t.scroller, "dblclick", function(c) {
          return Ue(e, c) || ft(c);
        }), ne(t.scroller, "contextmenu", function(c) {
          return bs(e, c);
        }), ne(t.input.getField(), "contextmenu", function(c) {
          t.scroller.contains(c.target) || bs(e, c);
        });
        var n, r = { end: 0 };
        function i() {
          t.activeTouch && (n = setTimeout(function() {
            return t.activeTouch = null;
          }, 1e3), r = t.activeTouch, r.end = +new Date());
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
          var b = h.left - c.left, C = h.top - c.top;
          return b * b + C * C > 20 * 20;
        }
        ne(t.scroller, "touchstart", function(c) {
          if (!Ue(e, c) && !o(c) && !rl(e, c)) {
            t.input.ensurePolled(), clearTimeout(n);
            var h = +new Date();
            t.activeTouch = {
              start: h,
              moved: !1,
              prev: h - r.end <= 300 ? r : null
            }, c.touches.length == 1 && (t.activeTouch.left = c.touches[0].pageX, t.activeTouch.top = c.touches[0].pageY);
          }
        }), ne(t.scroller, "touchmove", function() {
          t.activeTouch && (t.activeTouch.moved = !0);
        }), ne(t.scroller, "touchend", function(c) {
          var h = t.activeTouch;
          if (h && !cr(t, c) && h.left != null && !h.moved && new Date() - h.start < 300) {
            var b = e.coordsChar(t.activeTouch, "page"), C;
            !h.prev || l(h, h.prev) ? C = new Ie(b, b) : !h.prev.prev || l(h, h.prev.prev) ? C = e.findWordAt(b) : C = new Ie(M(b.line, 0), Ce(e.doc, M(b.line + 1, 0))), e.setSelection(C.anchor, C.head), e.focus(), ft(c);
          }
          i();
        }), ne(t.scroller, "touchcancel", i), ne(t.scroller, "scroll", function() {
          t.scroller.clientHeight && (Nn(e, t.scroller.scrollTop), Wr(e, t.scroller.scrollLeft, !0), We(e, "scroll", e));
        }), ne(t.scroller, "mousewheel", function(c) {
          return Ma(e, c);
        }), ne(t.scroller, "DOMMouseScroll", function(c) {
          return Ma(e, c);
        }), ne(t.wrapper, "scroll", function() {
          return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0;
        }), t.dragFunctions = {
          enter: function(c) {
            Ue(e, c) || or(c);
          },
          over: function(c) {
            Ue(e, c) || (sc(e, c), or(c));
          },
          start: function(c) {
            return ac(e, c);
          },
          drop: nt(e, lc),
          leave: function(c) {
            Ue(e, c) || is(e);
          }
        };
        var u = t.input.getField();
        ne(u, "keyup", function(c) {
          return gs.call(e, c);
        }), ne(u, "keydown", nt(e, ps)), ne(u, "keypress", nt(e, vs)), ne(u, "focus", function(c) {
          return Ho(e, c);
        }), ne(u, "blur", function(c) {
          return tn(e, c);
        });
      }
      var nl = [];
      Re.defineInitHook = function(e) {
        return nl.push(e);
      };
      function Jn(e, t, n, r) {
        var i = e.doc, o;
        n == null && (n = "add"), n == "smart" && (i.mode.indent ? o = Tn(e, t).state : n = "prev");
        var l = e.options.tabSize, u = he(i, t), c = fe(u.text, null, l);
        u.stateAfter && (u.stateAfter = null);
        var h = u.text.match(/^\s*/)[0], b;
        if (!r && !/\S/.test(u.text))
          b = 0, n = "not";
        else if (n == "smart" && (b = i.mode.indent(o, u.text.slice(h.length), u.text), b == we || b > 150)) {
          if (!r)
            return;
          n = "prev";
        }
        n == "prev" ? t > i.first ? b = fe(he(i, t - 1).text, null, l) : b = 0 : n == "add" ? b = c + e.options.indentUnit : n == "subtract" ? b = c - e.options.indentUnit : typeof n == "number" && (b = c + n), b = Math.max(0, b);
        var C = "", I = 0;
        if (e.options.indentWithTabs)
          for (var E = Math.floor(b / l); E; --E)
            I += l, C += "	";
        if (I < b && (C += _e(b - I)), C != h)
          return sn(i, C, M(t, 0), M(t, h.length), "+input"), u.stateAfter = null, !0;
        for (var _ = 0; _ < i.sel.ranges.length; _++) {
          var U = i.sel.ranges[_];
          if (U.head.line == t && U.head.ch < h.length) {
            var Z = M(t, h.length);
            Zo(i, _, new Ie(Z, Z));
            break;
          }
        }
      }
      var Gt = null;
      function Ui(e) {
        Gt = e;
      }
      function il(e, t, n, r, i) {
        var o = e.doc;
        e.display.shift = !1, r || (r = o.sel);
        var l = +new Date() - 200, u = i == "paste" || e.state.pasteIncoming > l, c = Cn(t), h = null;
        if (u && r.ranges.length > 1)
          if (Gt && Gt.text.join(`
`) == t) {
            if (r.ranges.length % Gt.text.length == 0) {
              h = [];
              for (var b = 0; b < Gt.text.length; b++)
                h.push(o.splitLines(Gt.text[b]));
            }
          } else
            c.length == r.ranges.length && e.options.pasteLinesPerSelection && (h = Ye(c, function(ee) {
              return [ee];
            }));
        for (var C = e.curOp.updateInput, I = r.ranges.length - 1; I >= 0; I--) {
          var E = r.ranges[I], _ = E.from(), U = E.to();
          E.empty() && (n && n > 0 ? _ = M(_.line, _.ch - n) : e.state.overwrite && !u ? U = M(U.line, Math.min(he(o, U.line).text.length, U.ch + ke(c).length)) : u && Gt && Gt.lineWise && Gt.text.join(`
`) == c.join(`
`) && (_ = U = M(_.line, 0)));
          var Z = {
            from: _,
            to: U,
            text: h ? h[I % h.length] : c,
            origin: i || (u ? "paste" : e.state.cutIncoming > l ? "cut" : "+input")
          };
          an(e.doc, Z), rt(e, "inputRead", e, Z);
        }
        t && !u && Cs(e, t), rn(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = C), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
      }
      function Ss(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("Text");
        if (n)
          return e.preventDefault(), !t.isReadOnly() && !t.options.disableInput && t.hasFocus() && Mt(t, function() {
            return il(t, n, 0, null, "paste");
          }), !0;
      }
      function Cs(e, t) {
        if (!(!e.options.electricChars || !e.options.smartIndent))
          for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
            var i = n.ranges[r];
            if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
              var o = e.getModeAt(i.head), l = !1;
              if (o.electricChars) {
                for (var u = 0; u < o.electricChars.length; u++)
                  if (t.indexOf(o.electricChars.charAt(u)) > -1) {
                    l = Jn(e, i.head.line, "smart");
                    break;
                  }
              } else
                o.electricInput && o.electricInput.test(he(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = Jn(e, i.head.line, "smart"));
              l && rt(e, "electricInput", e, i.head.line);
            }
          }
      }
      function Ls(e) {
        for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
          var i = e.doc.sel.ranges[r].head.line, o = { anchor: M(i, 0), head: M(i + 1, 0) };
          n.push(o), t.push(e.getRange(o.anchor, o.head));
        }
        return { text: t, ranges: n };
      }
      function ol(e, t, n, r) {
        e.setAttribute("autocorrect", n ? "on" : "off"), e.setAttribute("autocapitalize", r ? "on" : "off"), e.setAttribute("spellcheck", !!t);
      }
      function Ts() {
        var e = y("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), t = y("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return w ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), F && (e.style.border = "1px solid black"), t;
      }
      function Ic(e) {
        var t = e.optionHandlers, n = e.helpers = {};
        e.prototype = {
          constructor: e,
          focus: function() {
            je(this).focus(), this.display.input.focus();
          },
          setOption: function(r, i) {
            var o = this.options, l = o[r];
            o[r] == i && r != "mode" || (o[r] = i, t.hasOwnProperty(r) && nt(this, t[r])(this, i, l), We(this, "optionChange", this, r));
          },
          getOption: function(r) {
            return this.options[r];
          },
          getDoc: function() {
            return this.doc;
          },
          addKeyMap: function(r, i) {
            this.state.keyMaps[i ? "push" : "unshift"](ji(r));
          },
          removeKeyMap: function(r) {
            for (var i = this.state.keyMaps, o = 0; o < i.length; ++o)
              if (i[o] == r || i[o].name == r)
                return i.splice(o, 1), !0;
          },
          addOverlay: mt(function(r, i) {
            var o = r.token ? r : e.getMode(this.options, r);
            if (o.startState)
              throw new Error("Overlays may not be stateful.");
            ir(
              this.state.overlays,
              {
                mode: o,
                modeSpec: r,
                opaque: i && i.opaque,
                priority: i && i.priority || 0
              },
              function(l) {
                return l.priority;
              }
            ), this.state.modeGen++, St(this);
          }),
          removeOverlay: mt(function(r) {
            for (var i = this.state.overlays, o = 0; o < i.length; ++o) {
              var l = i[o].modeSpec;
              if (l == r || typeof r == "string" && l.name == r) {
                i.splice(o, 1), this.state.modeGen++, St(this);
                return;
              }
            }
          }),
          indentLine: mt(function(r, i, o) {
            typeof i != "string" && typeof i != "number" && (i == null ? i = this.options.smartIndent ? "smart" : "prev" : i = i ? "add" : "subtract"), g(this.doc, r) && Jn(this, r, i, o);
          }),
          indentSelection: mt(function(r) {
            for (var i = this.doc.sel.ranges, o = -1, l = 0; l < i.length; l++) {
              var u = i[l];
              if (u.empty())
                u.head.line > o && (Jn(this, u.head.line, r, !0), o = u.head.line, l == this.doc.sel.primIndex && rn(this));
              else {
                var c = u.from(), h = u.to(), b = Math.max(o, c.line);
                o = Math.min(this.lastLine(), h.line - (h.ch ? 0 : 1)) + 1;
                for (var C = b; C < o; ++C)
                  Jn(this, C, r);
                var I = this.doc.sel.ranges;
                c.ch == 0 && i.length == I.length && I[l].from().ch > 0 && Zo(this.doc, l, new Ie(c, I[l].to()), Be);
              }
            }
          }),
          getTokenAt: function(r, i) {
            return Bl(this, r, i);
          },
          getLineTokens: function(r, i) {
            return Bl(this, M(r), i, !0);
          },
          getTokenTypeAt: function(r) {
            r = Ce(this.doc, r);
            var i = Il(this, he(this.doc, r.line)), o = 0, l = (i.length - 1) / 2, u = r.ch, c;
            if (u == 0)
              c = i[2];
            else
              for (; ; ) {
                var h = o + l >> 1;
                if ((h ? i[h * 2 - 1] : 0) >= u)
                  l = h;
                else if (i[h * 2 + 1] < u)
                  o = h + 1;
                else {
                  c = i[h * 2 + 2];
                  break;
                }
              }
            var b = c ? c.indexOf("overlay ") : -1;
            return b < 0 ? c : b == 0 ? null : c.slice(0, b - 1);
          },
          getModeAt: function(r) {
            var i = this.doc.mode;
            return i.innerMode ? e.innerMode(i, this.getTokenAt(r).state).mode : i;
          },
          getHelper: function(r, i) {
            return this.getHelpers(r, i)[0];
          },
          getHelpers: function(r, i) {
            var o = [];
            if (!n.hasOwnProperty(i))
              return o;
            var l = n[i], u = this.getModeAt(r);
            if (typeof u[i] == "string")
              l[u[i]] && o.push(l[u[i]]);
            else if (u[i])
              for (var c = 0; c < u[i].length; c++) {
                var h = l[u[i][c]];
                h && o.push(h);
              }
            else
              u.helperType && l[u.helperType] ? o.push(l[u.helperType]) : l[u.name] && o.push(l[u.name]);
            for (var b = 0; b < l._global.length; b++) {
              var C = l._global[b];
              C.pred(u, this) && de(o, C.val) == -1 && o.push(C.val);
            }
            return o;
          },
          getStateAfter: function(r, i) {
            var o = this.doc;
            return r = It(o, r == null ? o.first + o.size - 1 : r), Tn(this, r + 1, i).state;
          },
          cursorCoords: function(r, i) {
            var o, l = this.doc.sel.primary();
            return r == null ? o = l.head : typeof r == "object" ? o = Ce(this.doc, r) : o = r ? l.from() : l.to(), Kt(this, o, i || "page");
          },
          charCoords: function(r, i) {
            return Ai(this, Ce(this.doc, r), i || "page");
          },
          coordsChar: function(r, i) {
            return r = ca(this, r, i || "page"), Do(this, r.left, r.top);
          },
          lineAtHeight: function(r, i) {
            return r = ca(this, { top: r, left: 0 }, i || "page").top, Vt(this.doc, r + this.display.viewOffset);
          },
          heightAtLine: function(r, i, o) {
            var l = !1, u;
            if (typeof r == "number") {
              var c = this.doc.first + this.doc.size - 1;
              r < this.doc.first ? r = this.doc.first : r > c && (r = c, l = !0), u = he(this.doc, r);
            } else
              u = r;
            return Ti(this, u, { top: 0, left: 0 }, i || "page", o || l).top + (l ? this.doc.height - fr(u) : 0);
          },
          defaultTextHeight: function() {
            return Vr(this.display);
          },
          defaultCharWidth: function() {
            return en(this.display);
          },
          getViewport: function() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          },
          addWidget: function(r, i, o, l, u) {
            var c = this.display;
            r = Kt(this, Ce(this.doc, r));
            var h = r.bottom, b = r.left;
            if (i.style.position = "absolute", i.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(i), c.sizer.appendChild(i), l == "over")
              h = r.top;
            else if (l == "above" || l == "near") {
              var C = Math.max(c.wrapper.clientHeight, this.doc.height), I = Math.max(c.sizer.clientWidth, c.lineSpace.clientWidth);
              (l == "above" || r.bottom + i.offsetHeight > C) && r.top > i.offsetHeight ? h = r.top - i.offsetHeight : r.bottom + i.offsetHeight <= C && (h = r.bottom), b + i.offsetWidth > I && (b = I - i.offsetWidth);
            }
            i.style.top = h + "px", i.style.left = i.style.right = "", u == "right" ? (b = c.sizer.clientWidth - i.offsetWidth, i.style.right = "0px") : (u == "left" ? b = 0 : u == "middle" && (b = (c.sizer.clientWidth - i.offsetWidth) / 2), i.style.left = b + "px"), o && Mf(this, { left: b, top: h, right: b + i.offsetWidth, bottom: h + i.offsetHeight });
          },
          triggerOnKeyDown: mt(ps),
          triggerOnKeyPress: mt(vs),
          triggerOnKeyUp: gs,
          triggerOnMouseDown: mt(ms),
          execCommand: function(r) {
            if (Xn.hasOwnProperty(r))
              return Xn[r].call(null, this);
          },
          triggerElectric: mt(function(r) {
            Cs(this, r);
          }),
          findPosH: function(r, i, o, l) {
            var u = 1;
            i < 0 && (u = -1, i = -i);
            for (var c = Ce(this.doc, r), h = 0; h < i && (c = ll(this.doc, c, u, o, l), !c.hitSide); ++h)
              ;
            return c;
          },
          moveH: mt(function(r, i) {
            var o = this;
            this.extendSelectionsBy(function(l) {
              return o.display.shift || o.doc.extend || l.empty() ? ll(o.doc, l.head, r, i, o.options.rtlMoveVisually) : r < 0 ? l.from() : l.to();
            }, st);
          }),
          deleteH: mt(function(r, i) {
            var o = this.doc.sel, l = this.doc;
            o.somethingSelected() ? l.replaceSelection("", null, "+delete") : cn(this, function(u) {
              var c = ll(l, u.head, r, i, !1);
              return r < 0 ? { from: c, to: u.head } : { from: u.head, to: c };
            });
          }),
          findPosV: function(r, i, o, l) {
            var u = 1, c = l;
            i < 0 && (u = -1, i = -i);
            for (var h = Ce(this.doc, r), b = 0; b < i; ++b) {
              var C = Kt(this, h, "div");
              if (c == null ? c = C.left : C.left = c, h = As(this, C, u, o), h.hitSide)
                break;
            }
            return h;
          },
          moveV: mt(function(r, i) {
            var o = this, l = this.doc, u = [], c = !this.display.shift && !l.extend && l.sel.somethingSelected();
            if (l.extendSelectionsBy(function(b) {
              if (c)
                return r < 0 ? b.from() : b.to();
              var C = Kt(o, b.head, "div");
              b.goalColumn != null && (C.left = b.goalColumn), u.push(C.left);
              var I = As(o, C, r, i);
              return i == "page" && b == l.sel.primary() && Wo(o, Ai(o, I, "div").top - C.top), I;
            }, st), u.length)
              for (var h = 0; h < l.sel.ranges.length; h++)
                l.sel.ranges[h].goalColumn = u[h];
          }),
          findWordAt: function(r) {
            var i = this.doc, o = he(i, r.line).text, l = r.ch, u = r.ch;
            if (o) {
              var c = this.getHelper(r, "wordChars");
              (r.sticky == "before" || u == o.length) && l ? --l : ++u;
              for (var h = o.charAt(l), b = Te(h, c) ? function(C) {
                return Te(C, c);
              } : /\s/.test(h) ? function(C) {
                return /\s/.test(C);
              } : function(C) {
                return !/\s/.test(C) && !Te(C);
              }; l > 0 && b(o.charAt(l - 1)); )
                --l;
              for (; u < o.length && b(o.charAt(u)); )
                ++u;
            }
            return new Ie(M(r.line, l), M(r.line, u));
          },
          toggleOverwrite: function(r) {
            r != null && r == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? v(this.display.cursorDiv, "CodeMirror-overwrite") : Ae(this.display.cursorDiv, "CodeMirror-overwrite"), We(this, "overwriteToggle", this, this.state.overwrite));
          },
          hasFocus: function() {
            return this.display.input.getField() == A(ge(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: mt(function(r, i) {
            In(this, r, i);
          }),
          getScrollInfo: function() {
            var r = this.display.scroller;
            return {
              left: r.scrollLeft,
              top: r.scrollTop,
              height: r.scrollHeight - tr(this) - this.display.barHeight,
              width: r.scrollWidth - tr(this) - this.display.barWidth,
              clientHeight: Lo(this),
              clientWidth: Pr(this)
            };
          },
          scrollIntoView: mt(function(r, i) {
            r == null ? (r = { from: this.doc.sel.primary().head, to: null }, i == null && (i = this.options.cursorScrollMargin)) : typeof r == "number" ? r = { from: M(r, 0), to: null } : r.from == null && (r = { from: r, to: null }), r.to || (r.to = r.from), r.margin = i || 0, r.from.line != null ? Ef(this, r) : ba(this, r.from, r.to, r.margin);
          }),
          setSize: mt(function(r, i) {
            var o = this, l = function(c) {
              return typeof c == "number" || /^\d+$/.test(String(c)) ? c + "px" : c;
            };
            r != null && (this.display.wrapper.style.width = l(r)), i != null && (this.display.wrapper.style.height = l(i)), this.options.lineWrapping && sa(this);
            var u = this.display.viewFrom;
            this.doc.iter(u, this.display.viewTo, function(c) {
              if (c.widgets) {
                for (var h = 0; h < c.widgets.length; h++)
                  if (c.widgets[h].noHScroll) {
                    kr(o, u, "widget");
                    break;
                  }
              }
              ++u;
            }), this.curOp.forceUpdate = !0, We(this, "refresh", this);
          }),
          operation: function(r) {
            return Mt(this, r);
          },
          startOperation: function() {
            return Rr(this);
          },
          endOperation: function() {
            return jr(this);
          },
          refresh: mt(function() {
            var r = this.display.cachedTextHeight;
            St(this), this.curOp.forceUpdate = !0, En(this), In(this, this.doc.scrollLeft, this.doc.scrollTop), jo(this.display), (r == null || Math.abs(r - Vr(this.display)) > 0.5 || this.options.lineWrapping) && Io(this), We(this, "refresh", this);
          }),
          swapDoc: mt(function(r) {
            var i = this.doc;
            return i.cm = null, this.state.selectingText && this.state.selectingText(), Na(this, r), En(this), this.display.input.reset(), In(this, r.scrollLeft, r.scrollTop), this.curOp.forceScroll = !0, rt(this, "swapDoc", this, i), i;
          }),
          phrase: function(r) {
            var i = this.options.phrases;
            return i && Object.prototype.hasOwnProperty.call(i, r) ? i[r] : r;
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
        }, vt(e), e.registerHelper = function(r, i, o) {
          n.hasOwnProperty(r) || (n[r] = e[r] = { _global: [] }), n[r][i] = o;
        }, e.registerGlobalHelper = function(r, i, o, l) {
          e.registerHelper(r, i, l), n[r]._global.push({ pred: o, val: l });
        };
      }
      function ll(e, t, n, r, i) {
        var o = t, l = n, u = he(e, t.line), c = i && e.direction == "rtl" ? -n : n;
        function h() {
          var oe = t.line + c;
          return oe < e.first || oe >= e.first + e.size ? !1 : (t = new M(oe, t.ch, t.sticky), u = he(e, oe));
        }
        function b(oe) {
          var te;
          if (r == "codepoint") {
            var se = u.text.charCodeAt(t.ch + (n > 0 ? 0 : -1));
            if (isNaN(se))
              te = null;
            else {
              var ye = n > 0 ? se >= 55296 && se < 56320 : se >= 56320 && se < 57343;
              te = new M(t.line, Math.max(0, Math.min(u.text.length, t.ch + n * (ye ? 2 : 1))), -n);
            }
          } else
            i ? te = pc(e.cm, u, t, n) : te = Jo(u, t, n);
          if (te == null)
            if (!oe && h())
              t = Vo(i, e.cm, u, t.line, c);
            else
              return !1;
          else
            t = te;
          return !0;
        }
        if (r == "char" || r == "codepoint")
          b();
        else if (r == "column")
          b(!0);
        else if (r == "word" || r == "group")
          for (var C = null, I = r == "group", E = e.cm && e.cm.getHelper(t, "wordChars"), _ = !0; !(n < 0 && !b(!_)); _ = !1) {
            var U = u.text.charAt(t.ch) || `
`, Z = Te(U, E) ? "w" : I && U == `
` ? "n" : !I || /\s/.test(U) ? null : "p";
            if (I && !_ && !Z && (Z = "s"), C && C != Z) {
              n < 0 && (n = 1, b(), t.sticky = "after");
              break;
            }
            if (Z && (C = Z), n > 0 && !b(!_))
              break;
          }
        var ee = Wi(e, t, o, l, !0);
        return Se(o, ee) && (ee.hitSide = !0), ee;
      }
      function As(e, t, n, r) {
        var i = e.doc, o = t.left, l;
        if (r == "page") {
          var u = Math.min(e.display.wrapper.clientHeight, je(e).innerHeight || i(e).documentElement.clientHeight), c = Math.max(u - 0.5 * Vr(e.display), 3);
          l = (n > 0 ? t.bottom : t.top) + n * c;
        } else
          r == "line" && (l = n > 0 ? t.bottom + 3 : t.top - 3);
        for (var h; h = Do(e, o, l), !!h.outside; ) {
          if (n < 0 ? l <= 0 : l >= i.height) {
            h.hitSide = !0;
            break;
          }
          l += n * 5;
        }
        return h;
      }
      var Ne = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new be(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };
      Ne.prototype.init = function(e) {
        var t = this, n = this, r = n.cm, i = n.div = e.lineDiv;
        i.contentEditable = !0, ol(i, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize);
        function o(u) {
          for (var c = u.target; c; c = c.parentNode) {
            if (c == i)
              return !0;
            if (/\bCodeMirror-(?:line)?widget\b/.test(c.className))
              break;
          }
          return !1;
        }
        ne(i, "paste", function(u) {
          !o(u) || Ue(r, u) || Ss(u, r) || T <= 11 && setTimeout(nt(r, function() {
            return t.updateFromDOM();
          }), 20);
        }), ne(i, "compositionstart", function(u) {
          t.composing = { data: u.data, done: !1 };
        }), ne(i, "compositionupdate", function(u) {
          t.composing || (t.composing = { data: u.data, done: !1 });
        }), ne(i, "compositionend", function(u) {
          t.composing && (u.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
        }), ne(i, "touchstart", function() {
          return n.forceCompositionEnd();
        }), ne(i, "input", function() {
          t.composing || t.readFromDOMSoon();
        });
        function l(u) {
          if (!(!o(u) || Ue(r, u))) {
            if (r.somethingSelected())
              Ui({ lineWise: !1, text: r.getSelections() }), u.type == "cut" && r.replaceSelection("", null, "cut");
            else if (r.options.lineWiseCopyCut) {
              var c = Ls(r);
              Ui({ lineWise: !0, text: c.text }), u.type == "cut" && r.operation(function() {
                r.setSelections(c.ranges, 0, Be), r.replaceSelection("", null, "cut");
              });
            } else
              return;
            if (u.clipboardData) {
              u.clipboardData.clearData();
              var h = Gt.text.join(`
`);
              if (u.clipboardData.setData("Text", h), u.clipboardData.getData("Text") == h) {
                u.preventDefault();
                return;
              }
            }
            var b = Ts(), C = b.firstChild;
            ol(C), r.display.lineSpace.insertBefore(b, r.display.lineSpace.firstChild), C.value = Gt.text.join(`
`);
            var I = A(i.ownerDocument);
            Me(C), setTimeout(function() {
              r.display.lineSpace.removeChild(b), I.focus(), I == i && n.showPrimarySelection();
            }, 50);
          }
        }
        ne(i, "copy", l), ne(i, "cut", l);
      }, Ne.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label");
      }, Ne.prototype.prepareSelection = function() {
        var e = ma(this.cm, !1);
        return e.focus = A(this.div.ownerDocument) == this.div, e;
      }, Ne.prototype.showSelection = function(e, t) {
        !e || !this.cm.display.view.length || ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, Ne.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, Ne.prototype.showPrimarySelection = function() {
        var e = this.getSelection(), t = this.cm, n = t.doc.sel.primary(), r = n.from(), i = n.to();
        if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || i.line < t.display.viewFrom) {
          e.removeAllRanges();
          return;
        }
        var o = Gi(t, e.anchorNode, e.anchorOffset), l = Gi(t, e.focusNode, e.focusOffset);
        if (!(o && !o.bad && l && !l.bad && W(Ve(o, l), r) == 0 && W(Ee(o, l), i) == 0)) {
          var u = t.display.view, c = r.line >= t.display.viewFrom && Fs(t, r) || { node: u[0].measure.map[2], offset: 0 }, h = i.line < t.display.viewTo && Fs(t, i);
          if (!h) {
            var b = u[u.length - 1].measure, C = b.maps ? b.maps[b.maps.length - 1] : b.map;
            h = { node: C[C.length - 1], offset: C[C.length - 2] - C[C.length - 3] };
          }
          if (!c || !h) {
            e.removeAllRanges();
            return;
          }
          var I = e.rangeCount && e.getRangeAt(0), E;
          try {
            E = X(c.node, c.offset, h.offset, h.node);
          } catch {
          }
          E && (!d && t.state.focused ? (e.collapse(c.node, c.offset), E.collapsed || (e.removeAllRanges(), e.addRange(E))) : (e.removeAllRanges(), e.addRange(E)), I && e.anchorNode == null ? e.addRange(I) : d && this.startGracePeriod()), this.rememberSelection();
        }
      }, Ne.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, Ne.prototype.showMultipleSelections = function(e) {
        J(this.cm.display.cursorDiv, e.cursors), J(this.cm.display.selectionDiv, e.selection);
      }, Ne.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, Ne.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount)
          return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return ce(this.div, t);
      }, Ne.prototype.focus = function() {
        this.cm.options.readOnly != "nocursor" && ((!this.selectionInEditor() || A(this.div.ownerDocument) != this.div) && this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, Ne.prototype.blur = function() {
        this.div.blur();
      }, Ne.prototype.getField = function() {
        return this.div;
      }, Ne.prototype.supportsTouch = function() {
        return !0;
      }, Ne.prototype.receivedFocus = function() {
        var e = this, t = this;
        this.selectionInEditor() ? setTimeout(function() {
          return e.pollSelection();
        }, 20) : Mt(this.cm, function() {
          return t.cm.curOp.selectionChanged = !0;
        });
        function n() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, n));
        }
        this.polling.set(this.cm.options.pollInterval, n);
      }, Ne.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, Ne.prototype.pollSelection = function() {
        if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
          var e = this.getSelection(), t = this.cm;
          if (N && D && this.cm.display.gutterSpecs.length && Nc(e.anchorNode)) {
            this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var n = Gi(t, e.anchorNode, e.anchorOffset), r = Gi(t, e.focusNode, e.focusOffset);
            n && r && Mt(t, function() {
              ct(t.doc, Cr(n, r), Be), (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, Ne.prototype.pollContent = function() {
        this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e = this.cm, t = e.display, n = e.doc.sel.primary(), r = n.from(), i = n.to();
        if (r.ch == 0 && r.line > e.firstLine() && (r = M(r.line - 1, he(e.doc, r.line - 1).length)), i.ch == he(e.doc, i.line).text.length && i.line < e.lastLine() && (i = M(i.line + 1, 0)), r.line < t.viewFrom || i.line > t.viewTo - 1)
          return !1;
        var o, l, u;
        r.line == t.viewFrom || (o = zr(e, r.line)) == 0 ? (l = Oe(t.view[0].line), u = t.view[0].node) : (l = Oe(t.view[o].line), u = t.view[o - 1].node.nextSibling);
        var c = zr(e, i.line), h, b;
        if (c == t.view.length - 1 ? (h = t.viewTo - 1, b = t.lineDiv.lastChild) : (h = Oe(t.view[c + 1].line) - 1, b = t.view[c + 1].node.previousSibling), !u)
          return !1;
        for (var C = e.doc.splitLines(Pc(e, u, b, l, h)), I = sr(e.doc, M(l, 0), M(h, he(e.doc, h).text.length)); C.length > 1 && I.length > 1; )
          if (ke(C) == ke(I))
            C.pop(), I.pop(), h--;
          else if (C[0] == I[0])
            C.shift(), I.shift(), l++;
          else
            break;
        for (var E = 0, _ = 0, U = C[0], Z = I[0], ee = Math.min(U.length, Z.length); E < ee && U.charCodeAt(E) == Z.charCodeAt(E); )
          ++E;
        for (var oe = ke(C), te = ke(I), se = Math.min(
          oe.length - (C.length == 1 ? E : 0),
          te.length - (I.length == 1 ? E : 0)
        ); _ < se && oe.charCodeAt(oe.length - _ - 1) == te.charCodeAt(te.length - _ - 1); )
          ++_;
        if (C.length == 1 && I.length == 1 && l == r.line)
          for (; E && E > r.ch && oe.charCodeAt(oe.length - _ - 1) == te.charCodeAt(te.length - _ - 1); )
            E--, _++;
        C[C.length - 1] = oe.slice(0, oe.length - _).replace(/^\u200b+/, ""), C[0] = C[0].slice(E).replace(/\u200b+$/, "");
        var ye = M(l, E), ve = M(h, I.length ? ke(I).length - _ : 0);
        if (C.length > 1 || C[0] || W(ye, ve))
          return sn(e.doc, C, ye, ve, "+input"), !0;
      }, Ne.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      }, Ne.prototype.reset = function() {
        this.forceCompositionEnd();
      }, Ne.prototype.forceCompositionEnd = function() {
        !this.composing || (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, Ne.prototype.readFromDOMSoon = function() {
        var e = this;
        this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
          if (e.readDOMTimeout = null, e.composing)
            if (e.composing.done)
              e.composing = null;
            else
              return;
          e.updateFromDOM();
        }, 80));
      }, Ne.prototype.updateFromDOM = function() {
        var e = this;
        (this.cm.isReadOnly() || !this.pollContent()) && Mt(this.cm, function() {
          return St(e.cm);
        });
      }, Ne.prototype.setUneditable = function(e) {
        e.contentEditable = "false";
      }, Ne.prototype.onKeyPress = function(e) {
        e.charCode == 0 || this.composing || (e.preventDefault(), this.cm.isReadOnly() || nt(this.cm, il)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0));
      }, Ne.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String(e != "nocursor");
      }, Ne.prototype.onContextMenu = function() {
      }, Ne.prototype.resetPosition = function() {
      }, Ne.prototype.needsContentAttribute = !0;
      function Fs(e, t) {
        var n = To(e, t.line);
        if (!n || n.hidden)
          return null;
        var r = he(e.doc, t.line), i = na(n, r, t.line), o = zt(r, e.doc.direction), l = "left";
        if (o) {
          var u = Ht(o, t.ch);
          l = u % 2 ? "right" : "left";
        }
        var c = la(i.map, t.ch, l);
        return c.offset = c.collapse == "right" ? c.end : c.start, c;
      }
      function Nc(e) {
        for (var t = e; t; t = t.parentNode)
          if (/CodeMirror-gutter-wrapper/.test(t.className))
            return !0;
        return !1;
      }
      function dn(e, t) {
        return t && (e.bad = !0), e;
      }
      function Pc(e, t, n, r, i) {
        var o = "", l = !1, u = e.doc.lineSeparator(), c = !1;
        function h(E) {
          return function(_) {
            return _.id == E;
          };
        }
        function b() {
          l && (o += u, c && (o += u), l = c = !1);
        }
        function C(E) {
          E && (b(), o += E);
        }
        function I(E) {
          if (E.nodeType == 1) {
            var _ = E.getAttribute("cm-text");
            if (_) {
              C(_);
              return;
            }
            var U = E.getAttribute("cm-marker"), Z;
            if (U) {
              var ee = e.findMarks(M(r, 0), M(i + 1, 0), h(+U));
              ee.length && (Z = ee[0].find(0)) && C(sr(e.doc, Z.from, Z.to).join(u));
              return;
            }
            if (E.getAttribute("contenteditable") == "false")
              return;
            var oe = /^(pre|div|p|li|table|br)$/i.test(E.nodeName);
            if (!/^br$/i.test(E.nodeName) && E.textContent.length == 0)
              return;
            oe && b();
            for (var te = 0; te < E.childNodes.length; te++)
              I(E.childNodes[te]);
            /^(pre|p)$/i.test(E.nodeName) && (c = !0), oe && (l = !0);
          } else
            E.nodeType == 3 && C(E.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
        for (; I(t), t != n; )
          t = t.nextSibling, c = !1;
        return o;
      }
      function Gi(e, t, n) {
        var r;
        if (t == e.display.lineDiv) {
          if (r = e.display.lineDiv.childNodes[n], !r)
            return dn(e.clipPos(M(e.display.viewTo - 1)), !0);
          t = null, n = 0;
        } else
          for (r = t; ; r = r.parentNode) {
            if (!r || r == e.display.lineDiv)
              return null;
            if (r.parentNode && r.parentNode == e.display.lineDiv)
              break;
          }
        for (var i = 0; i < e.display.view.length; i++) {
          var o = e.display.view[i];
          if (o.node == r)
            return Bc(o, t, n);
        }
      }
      function Bc(e, t, n) {
        var r = e.text.firstChild, i = !1;
        if (!t || !ce(r, t))
          return dn(M(Oe(e.line), 0), !0);
        if (t == r && (i = !0, t = r.childNodes[n], n = 0, !t)) {
          var o = e.rest ? ke(e.rest) : e.line;
          return dn(M(Oe(o), o.text.length), i);
        }
        var l = t.nodeType == 3 ? t : null, u = t;
        for (!l && t.childNodes.length == 1 && t.firstChild.nodeType == 3 && (l = t.firstChild, n && (n = l.nodeValue.length)); u.parentNode != r; )
          u = u.parentNode;
        var c = e.measure, h = c.maps;
        function b(Z, ee, oe) {
          for (var te = -1; te < (h ? h.length : 0); te++)
            for (var se = te < 0 ? c.map : h[te], ye = 0; ye < se.length; ye += 3) {
              var ve = se[ye + 2];
              if (ve == Z || ve == ee) {
                var Le = Oe(te < 0 ? e.line : e.rest[te]), He = se[ye] + oe;
                return (oe < 0 || ve != Z) && (He = se[ye + (oe ? 1 : 0)]), M(Le, He);
              }
            }
        }
        var C = b(l, u, n);
        if (C)
          return dn(C, i);
        for (var I = u.nextSibling, E = l ? l.nodeValue.length - n : 0; I; I = I.nextSibling) {
          if (C = b(I, I.firstChild, 0), C)
            return dn(M(C.line, C.ch - E), i);
          E += I.textContent.length;
        }
        for (var _ = u.previousSibling, U = n; _; _ = _.previousSibling) {
          if (C = b(_, _.firstChild, -1), C)
            return dn(M(C.line, C.ch + U), i);
          U += _.textContent.length;
        }
      }
      var Xe = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new be(), this.hasSelection = !1, this.composing = null, this.resetting = !1;
      };
      Xe.prototype.init = function(e) {
        var t = this, n = this, r = this.cm;
        this.createField(e);
        var i = this.textarea;
        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), F && (i.style.width = "0px"), ne(i, "input", function() {
          S && T >= 9 && t.hasSelection && (t.hasSelection = null), n.poll();
        }), ne(i, "paste", function(l) {
          Ue(r, l) || Ss(l, r) || (r.state.pasteIncoming = +new Date(), n.fastPoll());
        });
        function o(l) {
          if (!Ue(r, l)) {
            if (r.somethingSelected())
              Ui({ lineWise: !1, text: r.getSelections() });
            else if (r.options.lineWiseCopyCut) {
              var u = Ls(r);
              Ui({ lineWise: !0, text: u.text }), l.type == "cut" ? r.setSelections(u.ranges, null, Be) : (n.prevInput = "", i.value = u.text.join(`
`), Me(i));
            } else
              return;
            l.type == "cut" && (r.state.cutIncoming = +new Date());
          }
        }
        ne(i, "cut", o), ne(i, "copy", o), ne(e.scroller, "paste", function(l) {
          if (!(cr(e, l) || Ue(r, l))) {
            if (!i.dispatchEvent) {
              r.state.pasteIncoming = +new Date(), n.focus();
              return;
            }
            var u = new Event("paste");
            u.clipboardData = l.clipboardData, i.dispatchEvent(u);
          }
        }), ne(e.lineSpace, "selectstart", function(l) {
          cr(e, l) || ft(l);
        }), ne(i, "compositionstart", function() {
          var l = r.getCursor("from");
          n.composing && n.composing.range.clear(), n.composing = {
            start: l,
            range: r.markText(l, r.getCursor("to"), { className: "CodeMirror-composing" })
          };
        }), ne(i, "compositionend", function() {
          n.composing && (n.poll(), n.composing.range.clear(), n.composing = null);
        });
      }, Xe.prototype.createField = function(e) {
        this.wrapper = Ts(), this.textarea = this.wrapper.firstChild;
        var t = this.cm.options;
        ol(this.textarea, t.spellcheck, t.autocorrect, t.autocapitalize);
      }, Xe.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label");
      }, Xe.prototype.prepareSelection = function() {
        var e = this.cm, t = e.display, n = e.doc, r = ma(e);
        if (e.options.moveInputWithCursor) {
          var i = Kt(e, n.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), l = t.lineDiv.getBoundingClientRect();
          r.teTop = Math.max(0, Math.min(
            t.wrapper.clientHeight - 10,
            i.top + l.top - o.top
          )), r.teLeft = Math.max(0, Math.min(
            t.wrapper.clientWidth - 10,
            i.left + l.left - o.left
          ));
        }
        return r;
      }, Xe.prototype.showSelection = function(e) {
        var t = this.cm, n = t.display;
        J(n.cursorDiv, e.cursors), J(n.selectionDiv, e.selection), e.teTop != null && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, Xe.prototype.reset = function(e) {
        if (!(this.contextMenuPending || this.composing && e)) {
          var t = this.cm;
          if (this.resetting = !0, t.somethingSelected()) {
            this.prevInput = "";
            var n = t.getSelection();
            this.textarea.value = n, t.state.focused && Me(this.textarea), S && T >= 9 && (this.hasSelection = n);
          } else
            e || (this.prevInput = this.textarea.value = "", S && T >= 9 && (this.hasSelection = null));
          this.resetting = !1;
        }
      }, Xe.prototype.getField = function() {
        return this.textarea;
      }, Xe.prototype.supportsTouch = function() {
        return !1;
      }, Xe.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!H || A(this.textarea.ownerDocument) != this.textarea))
          try {
            this.textarea.focus();
          } catch {
          }
      }, Xe.prototype.blur = function() {
        this.textarea.blur();
      }, Xe.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, Xe.prototype.receivedFocus = function() {
        this.slowPoll();
      }, Xe.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, Xe.prototype.fastPoll = function() {
        var e = !1, t = this;
        t.pollingFast = !0;
        function n() {
          var r = t.poll();
          !r && !e ? (e = !0, t.polling.set(60, n)) : (t.pollingFast = !1, t.slowPoll());
        }
        t.polling.set(20, n);
      }, Xe.prototype.poll = function() {
        var e = this, t = this.cm, n = this.textarea, r = this.prevInput;
        if (this.contextMenuPending || this.resetting || !t.state.focused || mr(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq)
          return !1;
        var i = n.value;
        if (i == r && !t.somethingSelected())
          return !1;
        if (S && T >= 9 && this.hasSelection === i || K && /[\uf700-\uf7ff]/.test(i))
          return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
          var o = i.charCodeAt(0);
          if (o == 8203 && !r && (r = "\u200B"), o == 8666)
            return this.reset(), this.cm.execCommand("undo");
        }
        for (var l = 0, u = Math.min(r.length, i.length); l < u && r.charCodeAt(l) == i.charCodeAt(l); )
          ++l;
        return Mt(t, function() {
          il(
            t,
            i.slice(l),
            r.length - l,
            null,
            e.composing ? "*compose" : null
          ), i.length > 1e3 || i.indexOf(`
`) > -1 ? n.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(
            e.composing.start,
            t.getCursor("to"),
            { className: "CodeMirror-composing" }
          ));
        }), !0;
      }, Xe.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, Xe.prototype.onKeyPress = function() {
        S && T >= 9 && (this.hasSelection = null), this.fastPoll();
      }, Xe.prototype.onContextMenu = function(e) {
        var t = this, n = t.cm, r = n.display, i = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var o = Hr(n, e), l = r.scroller.scrollTop;
        if (!o || j)
          return;
        var u = n.options.resetSelectionOnContextMenu;
        u && n.doc.sel.contains(o) == -1 && nt(n, ct)(n.doc, Cr(o), Be);
        var c = i.style.cssText, h = t.wrapper.style.cssText, b = t.wrapper.offsetParent.getBoundingClientRect();
        t.wrapper.style.cssText = "position: static", i.style.cssText = `position: absolute; width: 30px; height: 30px;
      top: ` + (e.clientY - b.top - 5) + "px; left: " + (e.clientX - b.left - 5) + `px;
      z-index: 1000; background: ` + (S ? "rgba(255, 255, 255, .05)" : "transparent") + `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;
        var C;
        w && (C = i.ownerDocument.defaultView.scrollY), r.input.focus(), w && i.ownerDocument.defaultView.scrollTo(null, C), r.input.reset(), n.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = E, r.selForContextMenu = n.doc.sel, clearTimeout(r.detectingSelectAll);
        function I() {
          if (i.selectionStart != null) {
            var U = n.somethingSelected(), Z = "\u200B" + (U ? i.value : "");
            i.value = "\u21DA", i.value = Z, t.prevInput = U ? "" : "\u200B", i.selectionStart = 1, i.selectionEnd = Z.length, r.selForContextMenu = n.doc.sel;
          }
        }
        function E() {
          if (t.contextMenuPending == E && (t.contextMenuPending = !1, t.wrapper.style.cssText = h, i.style.cssText = c, S && T < 9 && r.scrollbars.setScrollTop(r.scroller.scrollTop = l), i.selectionStart != null)) {
            (!S || S && T < 9) && I();
            var U = 0, Z = function() {
              r.selForContextMenu == n.doc.sel && i.selectionStart == 0 && i.selectionEnd > 0 && t.prevInput == "\u200B" ? nt(n, $a)(n) : U++ < 10 ? r.detectingSelectAll = setTimeout(Z, 500) : (r.selForContextMenu = null, r.input.reset());
            };
            r.detectingSelectAll = setTimeout(Z, 200);
          }
        }
        if (S && T >= 9 && I(), ie) {
          or(e);
          var _ = function() {
            ut(window, "mouseup", _), setTimeout(E, 20);
          };
          ne(window, "mouseup", _);
        } else
          setTimeout(E, 50);
      }, Xe.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = e == "nocursor", this.textarea.readOnly = !!e;
      }, Xe.prototype.setUneditable = function() {
      }, Xe.prototype.needsContentAttribute = !1;
      function Hc(e, t) {
        if (t = t ? me(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), t.autofocus == null) {
          var n = A(e.ownerDocument);
          t.autofocus = n == e || e.getAttribute("autofocus") != null && n == document.body;
        }
        function r() {
          e.value = u.getValue();
        }
        var i;
        if (e.form && (ne(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
          var o = e.form;
          i = o.submit;
          try {
            var l = o.submit = function() {
              r(), o.submit = i, o.submit(), o.submit = l;
            };
          } catch {
          }
        }
        t.finishInit = function(c) {
          c.save = r, c.getTextArea = function() {
            return e;
          }, c.toTextArea = function() {
            c.toTextArea = isNaN, r(), e.parentNode.removeChild(c.getWrapperElement()), e.style.display = "", e.form && (ut(e.form, "submit", r), !t.leaveSubmitMethodAlone && typeof e.form.submit == "function" && (e.form.submit = i));
          };
        }, e.style.display = "none";
        var u = Re(
          function(c) {
            return e.parentNode.insertBefore(c, e.nextSibling);
          },
          t
        );
        return u;
      }
      function zc(e) {
        e.off = ut, e.on = ne, e.wheelEventPixels = Uf, e.Doc = Ct, e.splitLines = Cn, e.countColumn = fe, e.findColumn = Je, e.isWordChar = R, e.Pass = we, e.signal = We, e.Line = Zr, e.changeEnd = Lr, e.scrollbarModel = Sa, e.Pos = M, e.cmpPos = W, e.modes = jt, e.mimeModes = yr, e.resolveMode = Dt, e.getMode = lr, e.modeExtensions = xr, e.extendMode = mi, e.copyState = ar, e.startState = Ln, e.innerMode = br, e.commands = Xn, e.keyMap = dr, e.keyName = us, e.isModifierKey = as, e.lookupKey = fn, e.normalizeKeyMap = dc, e.StringStream = Ge, e.SharedTextMarker = Un, e.TextMarker = Ar, e.LineWidget = Kn, e.e_preventDefault = ft, e.e_stopPropagation = Nr, e.e_stop = or, e.addClass = v, e.contains = ce, e.rmClass = Ae, e.keyNames = Fr;
      }
      Dc(Re), Ic(Re);
      var Wc = "iter insert remove copy getEditor constructor".split(" ");
      for (var $i in Ct.prototype)
        Ct.prototype.hasOwnProperty($i) && de(Wc, $i) < 0 && (Re.prototype[$i] = function(e) {
          return function() {
            return e.apply(this.doc, arguments);
          };
        }(Ct.prototype[$i]));
      return vt(Ct), Re.inputStyles = { textarea: Xe, contenteditable: Ne }, Re.defineMode = function(e) {
        !Re.defaults.mode && e != "null" && (Re.defaults.mode = e), vi.apply(this, arguments);
      }, Re.defineMIME = Xr, Re.defineMode("null", function() {
        return { token: function(e) {
          return e.skipToEnd();
        } };
      }), Re.defineMIME("text/plain", "null"), Re.defineExtension = function(e, t) {
        Re.prototype[e] = t;
      }, Re.defineDocExtension = function(e, t) {
        Ct.prototype[e] = t;
      }, Re.fromTextArea = Hc, zc(Re), Re.version = "5.65.12", Re;
    });
  }(fl)), fl.exports;
}
var Ft = Bt();
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    function p(x, k, S) {
      this.orientation = k, this.scroll = S, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = x + "-" + k, this.inner = this.node.appendChild(document.createElement("div"));
      var T = this;
      a.on(this.inner, "mousedown", function(O) {
        if (O.which != 1)
          return;
        a.e_preventDefault(O);
        var D = T.orientation == "horizontal" ? "pageX" : "pageY", z = O[D], j = T.pos;
        function Y() {
          a.off(document, "mousemove", re), a.off(document, "mouseup", Y);
        }
        function re(P) {
          if (P.which != 1)
            return Y();
          T.moveTo(j + (P[D] - z) * (T.total / T.size));
        }
        a.on(document, "mousemove", re), a.on(document, "mouseup", Y);
      }), a.on(this.node, "click", function(O) {
        a.e_preventDefault(O);
        var D = T.inner.getBoundingClientRect(), z;
        T.orientation == "horizontal" ? z = O.clientX < D.left ? -1 : O.clientX > D.right ? 1 : 0 : z = O.clientY < D.top ? -1 : O.clientY > D.bottom ? 1 : 0, T.moveTo(T.pos + z * T.screen);
      });
      function w(O) {
        var D = a.wheelEventPixels(O)[T.orientation == "horizontal" ? "x" : "y"], z = T.pos;
        T.moveTo(T.pos + D), T.pos != z && a.e_preventDefault(O);
      }
      a.on(this.node, "mousewheel", w), a.on(this.node, "DOMMouseScroll", w);
    }
    p.prototype.setPos = function(x, k) {
      return x < 0 && (x = 0), x > this.total - this.screen && (x = this.total - this.screen), !k && x == this.pos ? !1 : (this.pos = x, this.inner.style[this.orientation == "horizontal" ? "left" : "top"] = x * (this.size / this.total) + "px", !0);
    }, p.prototype.moveTo = function(x) {
      this.setPos(x) && this.scroll(x, this.orientation);
    };
    var d = 10;
    p.prototype.update = function(x, k, S) {
      var T = this.screen != k || this.total != x || this.size != S;
      T && (this.screen = k, this.total = x, this.size = S);
      var w = this.screen * (this.size / this.total);
      w < d && (this.size -= d - w, w = d), this.inner.style[this.orientation == "horizontal" ? "width" : "height"] = w + "px", this.setPos(this.pos, T);
    };
    function m(x, k, S) {
      this.addClass = x, this.horiz = new p(x, "horizontal", S), k(this.horiz.node), this.vert = new p(x, "vertical", S), k(this.vert.node), this.width = null;
    }
    m.prototype.update = function(x) {
      if (this.width == null) {
        var k = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
        k && (this.width = parseInt(k.height));
      }
      var S = this.width || 0, T = x.scrollWidth > x.clientWidth + 1, w = x.scrollHeight > x.clientHeight + 1;
      return this.vert.node.style.display = w ? "block" : "none", this.horiz.node.style.display = T ? "block" : "none", w && (this.vert.update(
        x.scrollHeight,
        x.clientHeight,
        x.viewHeight - (T ? S : 0)
      ), this.vert.node.style.bottom = T ? S + "px" : "0"), T && (this.horiz.update(
        x.scrollWidth,
        x.clientWidth,
        x.viewWidth - (w ? S : 0) - x.barLeft
      ), this.horiz.node.style.right = w ? S + "px" : "0", this.horiz.node.style.left = x.barLeft + "px"), { right: w ? S : 0, bottom: T ? S : 0 };
    }, m.prototype.setScrollTop = function(x) {
      this.vert.setPos(x);
    }, m.prototype.setScrollLeft = function(x) {
      this.horiz.setPos(x);
    }, m.prototype.clear = function() {
      var x = this.horiz.node.parentNode;
      x.removeChild(this.horiz.node), x.removeChild(this.vert.node);
    }, a.scrollbarModel.simple = function(x, k) {
      return new m("CodeMirror-simplescroll", x, k);
    }, a.scrollbarModel.overlay = function(x, k) {
      return new m("CodeMirror-overlayscroll", x, k);
    };
  });
})();
var yh = { exports: {} };
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    var p = {
      autoSelfClosers: {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        frame: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
        menuitem: !0
      },
      implicitlyClosed: {
        dd: !0,
        li: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rp: !0,
        rt: !0,
        tbody: !0,
        td: !0,
        tfoot: !0,
        th: !0,
        tr: !0
      },
      contextGrabbers: {
        dd: { dd: !0, dt: !0 },
        dt: { dd: !0, dt: !0 },
        li: { li: !0 },
        option: { option: !0, optgroup: !0 },
        optgroup: { optgroup: !0 },
        p: {
          address: !0,
          article: !0,
          aside: !0,
          blockquote: !0,
          dir: !0,
          div: !0,
          dl: !0,
          fieldset: !0,
          footer: !0,
          form: !0,
          h1: !0,
          h2: !0,
          h3: !0,
          h4: !0,
          h5: !0,
          h6: !0,
          header: !0,
          hgroup: !0,
          hr: !0,
          menu: !0,
          nav: !0,
          ol: !0,
          p: !0,
          pre: !0,
          section: !0,
          table: !0,
          ul: !0
        },
        rp: { rp: !0, rt: !0 },
        rt: { rp: !0, rt: !0 },
        tbody: { tbody: !0, tfoot: !0 },
        td: { td: !0, th: !0 },
        tfoot: { tbody: !0 },
        th: { td: !0, th: !0 },
        thead: { tbody: !0, tfoot: !0 },
        tr: { tr: !0 }
      },
      doNotIndent: { pre: !0 },
      allowUnquoted: !0,
      allowMissing: !0,
      caseFold: !0
    }, d = {
      autoSelfClosers: {},
      implicitlyClosed: {},
      contextGrabbers: {},
      doNotIndent: {},
      allowUnquoted: !1,
      allowMissing: !1,
      allowMissingTagName: !1,
      caseFold: !1
    };
    a.defineMode("xml", function(m, x) {
      var k = m.indentUnit, S = {}, T = x.htmlMode ? p : d;
      for (var w in T)
        S[w] = T[w];
      for (var w in x)
        S[w] = x[w];
      var O, D;
      function z(y, V) {
        function X(v) {
          return V.tokenize = v, v(y, V);
        }
        var ce = y.next();
        if (ce == "<")
          return y.eat("!") ? y.eat("[") ? y.match("CDATA[") ? X(re("atom", "]]>")) : null : y.match("--") ? X(re("comment", "-->")) : y.match("DOCTYPE", !0, !0) ? (y.eatWhile(/[\w\._\-]/), X(P(1))) : null : y.eat("?") ? (y.eatWhile(/[\w\._\-]/), V.tokenize = re("meta", "?>"), "meta") : (O = y.eat("/") ? "closeTag" : "openTag", V.tokenize = j, "tag bracket");
        if (ce == "&") {
          var A;
          return y.eat("#") ? y.eat("x") ? A = y.eatWhile(/[a-fA-F\d]/) && y.eat(";") : A = y.eatWhile(/[\d]/) && y.eat(";") : A = y.eatWhile(/[\w\.\-:]/) && y.eat(";"), A ? "atom" : "error";
        } else
          return y.eatWhile(/[^&<]/), null;
      }
      z.isInText = !0;
      function j(y, V) {
        var X = y.next();
        if (X == ">" || X == "/" && y.eat(">"))
          return V.tokenize = z, O = X == ">" ? "endTag" : "selfcloseTag", "tag bracket";
        if (X == "=")
          return O = "equals", null;
        if (X == "<") {
          V.tokenize = z, V.state = $, V.tagName = V.tagStart = null;
          var ce = V.tokenize(y, V);
          return ce ? ce + " tag error" : "tag error";
        } else
          return /[\'\"]/.test(X) ? (V.tokenize = Y(X), V.stringStartCol = y.column(), V.tokenize(y, V)) : (y.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word");
      }
      function Y(y) {
        var V = function(X, ce) {
          for (; !X.eol(); )
            if (X.next() == y) {
              ce.tokenize = j;
              break;
            }
          return "string";
        };
        return V.isInAttribute = !0, V;
      }
      function re(y, V) {
        return function(X, ce) {
          for (; !X.eol(); ) {
            if (X.match(V)) {
              ce.tokenize = z;
              break;
            }
            X.next();
          }
          return y;
        };
      }
      function P(y) {
        return function(V, X) {
          for (var ce; (ce = V.next()) != null; ) {
            if (ce == "<")
              return X.tokenize = P(y + 1), X.tokenize(V, X);
            if (ce == ">")
              if (y == 1) {
                X.tokenize = z;
                break;
              } else
                return X.tokenize = P(y - 1), X.tokenize(V, X);
          }
          return "meta";
        };
      }
      function F(y) {
        return y && y.toLowerCase();
      }
      function N(y, V, X) {
        this.prev = y.context, this.tagName = V || "", this.indent = y.indented, this.startOfLine = X, (S.doNotIndent.hasOwnProperty(V) || y.context && y.context.noIndent) && (this.noIndent = !0);
      }
      function H(y) {
        y.context && (y.context = y.context.prev);
      }
      function K(y, V) {
        for (var X; ; ) {
          if (!y.context || (X = y.context.tagName, !S.contextGrabbers.hasOwnProperty(F(X)) || !S.contextGrabbers[F(X)].hasOwnProperty(F(V))))
            return;
          H(y);
        }
      }
      function $(y, V, X) {
        return y == "openTag" ? (X.tagStart = V.column(), le) : y == "closeTag" ? G : $;
      }
      function le(y, V, X) {
        return y == "word" ? (X.tagName = V.current(), D = "tag", ue) : S.allowMissingTagName && y == "endTag" ? (D = "tag bracket", ue(y, V, X)) : (D = "error", le);
      }
      function G(y, V, X) {
        if (y == "word") {
          var ce = V.current();
          return X.context && X.context.tagName != ce && S.implicitlyClosed.hasOwnProperty(F(X.context.tagName)) && H(X), X.context && X.context.tagName == ce || S.matchClosing === !1 ? (D = "tag", pe) : (D = "tag error", ie);
        } else
          return S.allowMissingTagName && y == "endTag" ? (D = "tag bracket", pe(y, V, X)) : (D = "error", ie);
      }
      function pe(y, V, X) {
        return y != "endTag" ? (D = "error", pe) : (H(X), $);
      }
      function ie(y, V, X) {
        return D = "error", pe(y, V, X);
      }
      function ue(y, V, X) {
        if (y == "word")
          return D = "attribute", Ae;
        if (y == "endTag" || y == "selfcloseTag") {
          var ce = X.tagName, A = X.tagStart;
          return X.tagName = X.tagStart = null, y == "selfcloseTag" || S.autoSelfClosers.hasOwnProperty(F(ce)) ? K(X, ce) : (K(X, ce), X.context = new N(X, ce, A == X.indented)), $;
        }
        return D = "error", ue;
      }
      function Ae(y, V, X) {
        return y == "equals" ? q : (S.allowMissing || (D = "error"), ue(y, V, X));
      }
      function q(y, V, X) {
        return y == "string" ? J : y == "word" && S.allowUnquoted ? (D = "string", ue) : (D = "error", ue(y, V, X));
      }
      function J(y, V, X) {
        return y == "string" ? J : ue(y, V, X);
      }
      return {
        startState: function(y) {
          var V = {
            tokenize: z,
            state: $,
            indented: y || 0,
            tagName: null,
            tagStart: null,
            context: null
          };
          return y != null && (V.baseIndent = y), V;
        },
        token: function(y, V) {
          if (!V.tagName && y.sol() && (V.indented = y.indentation()), y.eatSpace())
            return null;
          O = null;
          var X = V.tokenize(y, V);
          return (X || O) && X != "comment" && (D = null, V.state = V.state(O || X, y, V), D && (X = D == "error" ? X + " error" : D)), X;
        },
        indent: function(y, V, X) {
          var ce = y.context;
          if (y.tokenize.isInAttribute)
            return y.tagStart == y.indented ? y.stringStartCol + 1 : y.indented + k;
          if (ce && ce.noIndent)
            return a.Pass;
          if (y.tokenize != j && y.tokenize != z)
            return X ? X.match(/^(\s*)/)[0].length : 0;
          if (y.tagName)
            return S.multilineTagIndentPastTag !== !1 ? y.tagStart + y.tagName.length + 2 : y.tagStart + k * (S.multilineTagIndentFactor || 1);
          if (S.alignCDATA && /<!\[CDATA\[/.test(V))
            return 0;
          var A = V && /^<(\/)?([\w_:\.-]*)/.exec(V);
          if (A && A[1])
            for (; ce; )
              if (ce.tagName == A[2]) {
                ce = ce.prev;
                break;
              } else if (S.implicitlyClosed.hasOwnProperty(F(ce.tagName)))
                ce = ce.prev;
              else
                break;
          else if (A)
            for (; ce; ) {
              var v = S.contextGrabbers[F(ce.tagName)];
              if (v && v.hasOwnProperty(F(A[2])))
                ce = ce.prev;
              else
                break;
            }
          for (; ce && ce.prev && !ce.startOfLine; )
            ce = ce.prev;
          return ce ? ce.indent + k : y.baseIndent || 0;
        },
        electricInput: /<\/[\s\w:]+>$/,
        blockCommentStart: "<!--",
        blockCommentEnd: "-->",
        configuration: S.htmlMode ? "html" : "xml",
        helperType: S.htmlMode ? "html" : "xml",
        skipAttribute: function(y) {
          y.state == q && (y.state = ue);
        },
        xmlCurrentTag: function(y) {
          return y.tagName ? { name: y.tagName, close: y.type == "closeTag" } : null;
        },
        xmlCurrentContext: function(y) {
          for (var V = [], X = y.context; X; X = X.prev)
            V.push(X.tagName);
          return V.reverse();
        }
      };
    }), a.defineMIME("text/xml", "xml"), a.defineMIME("application/xml", "xml"), a.mimeModes.hasOwnProperty("text/html") || a.defineMIME("text/html", { name: "xml", htmlMode: !0 });
  });
})();
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    a.modeInfo = [
      { name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"] },
      { name: "PGP", mimes: ["application/pgp", "application/pgp-encrypted", "application/pgp-keys", "application/pgp-signature"], mode: "asciiarmor", ext: ["asc", "pgp", "sig"] },
      { name: "ASN.1", mime: "text/x-ttcn-asn", mode: "asn.1", ext: ["asn", "asn1"] },
      { name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk", file: /^extensions\.conf$/i },
      { name: "Brainfuck", mime: "text/x-brainfuck", mode: "brainfuck", ext: ["b", "bf"] },
      { name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h", "ino"] },
      { name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"] },
      { name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy", "cbl"] },
      { name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp", "cs"] },
      { name: "Clojure", mime: "text/x-clojure", mode: "clojure", ext: ["clj", "cljc", "cljx"] },
      { name: "ClojureScript", mime: "text/x-clojurescript", mode: "clojure", ext: ["cljs"] },
      { name: "Closure Stylesheets (GSS)", mime: "text/x-gss", mode: "css", ext: ["gss"] },
      { name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists\.txt$/ },
      { name: "CoffeeScript", mimes: ["application/vnd.coffeescript", "text/coffeescript", "text/x-coffeescript"], mode: "coffeescript", ext: ["coffee"], alias: ["coffee", "coffee-script"] },
      { name: "Common Lisp", mime: "text/x-common-lisp", mode: "commonlisp", ext: ["cl", "lisp", "el"], alias: ["lisp"] },
      { name: "Cypher", mime: "application/x-cypher-query", mode: "cypher", ext: ["cyp", "cypher"] },
      { name: "Cython", mime: "text/x-cython", mode: "python", ext: ["pyx", "pxd", "pxi"] },
      { name: "Crystal", mime: "text/x-crystal", mode: "crystal", ext: ["cr"] },
      { name: "CSS", mime: "text/css", mode: "css", ext: ["css"] },
      { name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"] },
      { name: "D", mime: "text/x-d", mode: "d", ext: ["d"] },
      { name: "Dart", mimes: ["application/dart", "text/x-dart"], mode: "dart", ext: ["dart"] },
      { name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"] },
      { name: "Django", mime: "text/x-django", mode: "django" },
      { name: "Dockerfile", mime: "text/x-dockerfile", mode: "dockerfile", file: /^Dockerfile$/ },
      { name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"] },
      { name: "Dylan", mime: "text/x-dylan", mode: "dylan", ext: ["dylan", "dyl", "intr"] },
      { name: "EBNF", mime: "text/x-ebnf", mode: "ebnf" },
      { name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"] },
      { name: "edn", mime: "application/edn", mode: "clojure", ext: ["edn"] },
      { name: "Eiffel", mime: "text/x-eiffel", mode: "eiffel", ext: ["e"] },
      { name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"] },
      { name: "Embedded JavaScript", mime: "application/x-ejs", mode: "htmlembedded", ext: ["ejs"] },
      { name: "Embedded Ruby", mime: "application/x-erb", mode: "htmlembedded", ext: ["erb"] },
      { name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"] },
      { name: "Esper", mime: "text/x-esper", mode: "sql" },
      { name: "Factor", mime: "text/x-factor", mode: "factor", ext: ["factor"] },
      { name: "FCL", mime: "text/x-fcl", mode: "fcl" },
      { name: "Forth", mime: "text/x-forth", mode: "forth", ext: ["forth", "fth", "4th"] },
      { name: "Fortran", mime: "text/x-fortran", mode: "fortran", ext: ["f", "for", "f77", "f90", "f95"] },
      { name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"] },
      { name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"] },
      { name: "Gherkin", mime: "text/x-feature", mode: "gherkin", ext: ["feature"] },
      { name: "GitHub Flavored Markdown", mime: "text/x-gfm", mode: "gfm", file: /^(readme|contributing|history)\.md$/i },
      { name: "Go", mime: "text/x-go", mode: "go", ext: ["go"] },
      { name: "Groovy", mime: "text/x-groovy", mode: "groovy", ext: ["groovy", "gradle"], file: /^Jenkinsfile$/ },
      { name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"] },
      { name: "Haskell", mime: "text/x-haskell", mode: "haskell", ext: ["hs"] },
      { name: "Haskell (Literate)", mime: "text/x-literate-haskell", mode: "haskell-literate", ext: ["lhs"] },
      { name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"] },
      { name: "HXML", mime: "text/x-hxml", mode: "haxe", ext: ["hxml"] },
      { name: "ASP.NET", mime: "application/x-aspx", mode: "htmlembedded", ext: ["aspx"], alias: ["asp", "aspx"] },
      { name: "HTML", mime: "text/html", mode: "htmlmixed", ext: ["html", "htm", "handlebars", "hbs"], alias: ["xhtml"] },
      { name: "HTTP", mime: "message/http", mode: "http" },
      { name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"] },
      { name: "Pug", mime: "text/x-pug", mode: "pug", ext: ["jade", "pug"], alias: ["jade"] },
      { name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"] },
      { name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"] },
      {
        name: "JavaScript",
        mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
        mode: "javascript",
        ext: ["js"],
        alias: ["ecmascript", "js", "node"]
      },
      { name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"] },
      { name: "JSON-LD", mime: "application/ld+json", mode: "javascript", ext: ["jsonld"], alias: ["jsonld"] },
      { name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"] },
      { name: "Jinja2", mime: "text/jinja2", mode: "jinja2", ext: ["j2", "jinja", "jinja2"] },
      { name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"], alias: ["jl"] },
      { name: "Kotlin", mime: "text/x-kotlin", mode: "clike", ext: ["kt"] },
      { name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"] },
      { name: "LiveScript", mime: "text/x-livescript", mode: "livescript", ext: ["ls"], alias: ["ls"] },
      { name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"] },
      { name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"] },
      { name: "mIRC", mime: "text/mirc", mode: "mirc" },
      { name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql" },
      { name: "Mathematica", mime: "text/x-mathematica", mode: "mathematica", ext: ["m", "nb", "wl", "wls"] },
      { name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"] },
      { name: "MUMPS", mime: "text/x-mumps", mode: "mumps", ext: ["mps"] },
      { name: "MS SQL", mime: "text/x-mssql", mode: "sql" },
      { name: "mbox", mime: "application/mbox", mode: "mbox", ext: ["mbox"] },
      { name: "MySQL", mime: "text/x-mysql", mode: "sql" },
      { name: "Nginx", mime: "text/x-nginx-conf", mode: "nginx", file: /nginx.*\.conf$/i },
      { name: "NSIS", mime: "text/x-nsis", mode: "nsis", ext: ["nsh", "nsi"] },
      {
        name: "NTriples",
        mimes: ["application/n-triples", "application/n-quads", "text/n-triples"],
        mode: "ntriples",
        ext: ["nt", "nq"]
      },
      { name: "Objective-C", mime: "text/x-objectivec", mode: "clike", ext: ["m"], alias: ["objective-c", "objc"] },
      { name: "Objective-C++", mime: "text/x-objectivec++", mode: "clike", ext: ["mm"], alias: ["objective-c++", "objc++"] },
      { name: "OCaml", mime: "text/x-ocaml", mode: "mllike", ext: ["ml", "mli", "mll", "mly"] },
      { name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"] },
      { name: "Oz", mime: "text/x-oz", mode: "oz", ext: ["oz"] },
      { name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"] },
      { name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"] },
      { name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"] },
      { name: "PHP", mimes: ["text/x-php", "application/x-httpd-php", "application/x-httpd-php-open"], mode: "php", ext: ["php", "php3", "php4", "php5", "php7", "phtml"] },
      { name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"] },
      { name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"] },
      { name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"] },
      { name: "PostgreSQL", mime: "text/x-pgsql", mode: "sql" },
      { name: "PowerShell", mime: "application/x-powershell", mode: "powershell", ext: ["ps1", "psd1", "psm1"] },
      { name: "Properties files", mime: "text/x-properties", mode: "properties", ext: ["properties", "ini", "in"], alias: ["ini", "properties"] },
      { name: "ProtoBuf", mime: "text/x-protobuf", mode: "protobuf", ext: ["proto"] },
      { name: "Python", mime: "text/x-python", mode: "python", ext: ["BUILD", "bzl", "py", "pyw"], file: /^(BUCK|BUILD)$/ },
      { name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"] },
      { name: "Q", mime: "text/x-q", mode: "q", ext: ["q"] },
      { name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r", "R"], alias: ["rscript"] },
      { name: "reStructuredText", mime: "text/x-rst", mode: "rst", ext: ["rst"], alias: ["rst"] },
      { name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm" },
      { name: "RPM Spec", mime: "text/x-rpm-spec", mode: "rpm", ext: ["spec"] },
      { name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"] },
      { name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"] },
      { name: "SAS", mime: "text/x-sas", mode: "sas", ext: ["sas"] },
      { name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"] },
      { name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"] },
      { name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"] },
      { name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"] },
      { name: "Shell", mimes: ["text/x-sh", "application/x-sh"], mode: "shell", ext: ["sh", "ksh", "bash"], alias: ["bash", "sh", "zsh"], file: /^PKGBUILD$/ },
      { name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"] },
      { name: "Slim", mimes: ["text/x-slim", "application/x-slim"], mode: "slim", ext: ["slim"] },
      { name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"] },
      { name: "Smarty", mime: "text/x-smarty", mode: "smarty", ext: ["tpl"] },
      { name: "Solr", mime: "text/x-solr", mode: "solr" },
      { name: "SML", mime: "text/x-sml", mode: "mllike", ext: ["sml", "sig", "fun", "smackspec"] },
      { name: "Soy", mime: "text/x-soy", mode: "soy", ext: ["soy"], alias: ["closure template"] },
      { name: "SPARQL", mime: "application/sparql-query", mode: "sparql", ext: ["rq", "sparql"], alias: ["sparul"] },
      { name: "Spreadsheet", mime: "text/x-spreadsheet", mode: "spreadsheet", alias: ["excel", "formula"] },
      { name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"] },
      { name: "SQLite", mime: "text/x-sqlite", mode: "sql" },
      { name: "Squirrel", mime: "text/x-squirrel", mode: "clike", ext: ["nut"] },
      { name: "Stylus", mime: "text/x-styl", mode: "stylus", ext: ["styl"] },
      { name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"] },
      { name: "sTeX", mime: "text/x-stex", mode: "stex" },
      { name: "LaTeX", mime: "text/x-latex", mode: "stex", ext: ["text", "ltx", "tex"], alias: ["tex"] },
      { name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v", "sv", "svh"] },
      { name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"] },
      { name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"] },
      { name: "TiddlyWiki", mime: "text/x-tiddlywiki", mode: "tiddlywiki" },
      { name: "Tiki wiki", mime: "text/tiki", mode: "tiki" },
      { name: "TOML", mime: "text/x-toml", mode: "toml", ext: ["toml"] },
      { name: "Tornado", mime: "text/x-tornado", mode: "tornado" },
      { name: "troff", mime: "text/troff", mode: "troff", ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
      { name: "TTCN", mime: "text/x-ttcn", mode: "ttcn", ext: ["ttcn", "ttcn3", "ttcnpp"] },
      { name: "TTCN_CFG", mime: "text/x-ttcn-cfg", mode: "ttcn-cfg", ext: ["cfg"] },
      { name: "Turtle", mime: "text/turtle", mode: "turtle", ext: ["ttl"] },
      { name: "TypeScript", mime: "application/typescript", mode: "javascript", ext: ["ts"], alias: ["ts"] },
      { name: "TypeScript-JSX", mime: "text/typescript-jsx", mode: "jsx", ext: ["tsx"], alias: ["tsx"] },
      { name: "Twig", mime: "text/x-twig", mode: "twig" },
      { name: "Web IDL", mime: "text/x-webidl", mode: "webidl", ext: ["webidl"] },
      { name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"] },
      { name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"] },
      { name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"] },
      { name: "Verilog", mime: "text/x-verilog", mode: "verilog", ext: ["v"] },
      { name: "VHDL", mime: "text/x-vhdl", mode: "vhdl", ext: ["vhd", "vhdl"] },
      { name: "Vue.js Component", mimes: ["script/x-vue", "text/x-vue"], mode: "vue", ext: ["vue"] },
      { name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd", "svg"], alias: ["rss", "wsdl", "xsd"] },
      { name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"] },
      { name: "Yacas", mime: "text/x-yacas", mode: "yacas", ext: ["ys"] },
      { name: "YAML", mimes: ["text/x-yaml", "text/yaml"], mode: "yaml", ext: ["yaml", "yml"], alias: ["yml"] },
      { name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"] },
      { name: "mscgen", mime: "text/x-mscgen", mode: "mscgen", ext: ["mscgen", "mscin", "msc"] },
      { name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"] },
      { name: "msgenny", mime: "text/x-msgenny", mode: "mscgen", ext: ["msgenny"] },
      { name: "WebAssembly", mime: "text/webassembly", mode: "wast", ext: ["wat", "wast"] }
    ];
    for (var p = 0; p < a.modeInfo.length; p++) {
      var d = a.modeInfo[p];
      d.mimes && (d.mime = d.mimes[0]);
    }
    a.findModeByMIME = function(m) {
      m = m.toLowerCase();
      for (var x = 0; x < a.modeInfo.length; x++) {
        var k = a.modeInfo[x];
        if (k.mime == m)
          return k;
        if (k.mimes) {
          for (var S = 0; S < k.mimes.length; S++)
            if (k.mimes[S] == m)
              return k;
        }
      }
      if (/\+xml$/.test(m))
        return a.findModeByMIME("application/xml");
      if (/\+json$/.test(m))
        return a.findModeByMIME("application/json");
    }, a.findModeByExtension = function(m) {
      m = m.toLowerCase();
      for (var x = 0; x < a.modeInfo.length; x++) {
        var k = a.modeInfo[x];
        if (k.ext) {
          for (var S = 0; S < k.ext.length; S++)
            if (k.ext[S] == m)
              return k;
        }
      }
    }, a.findModeByFileName = function(m) {
      for (var x = 0; x < a.modeInfo.length; x++) {
        var k = a.modeInfo[x];
        if (k.file && k.file.test(m))
          return k;
      }
      var S = m.lastIndexOf("."), T = S > -1 && m.substring(S + 1, m.length);
      if (T)
        return a.findModeByExtension(T);
    }, a.findModeByName = function(m) {
      m = m.toLowerCase();
      for (var x = 0; x < a.modeInfo.length; x++) {
        var k = a.modeInfo[x];
        if (k.name.toLowerCase() == m)
          return k;
        if (k.alias) {
          for (var S = 0; S < k.alias.length; S++)
            if (k.alias[S].toLowerCase() == m)
              return k;
        }
      }
    };
  });
})();
var Ps = { exports: {} }, Bs;
function pu() {
  return Bs || (Bs = 1, function(s, f) {
    (function(a) {
      a(Bt());
    })(function(a) {
      a.defineMode("javascript", function(p, d) {
        var m = p.indentUnit, x = d.statementIndent, k = d.jsonld, S = d.json || k, T = d.trackScope !== !1, w = d.typescript, O = d.wordCharacters || /[\w$\xa1-\uffff]/, D = function() {
          function g(Ve) {
            return { type: Ve, style: "keyword" };
          }
          var L = g("keyword a"), M = g("keyword b"), W = g("keyword c"), Se = g("keyword d"), De = g("operator"), Ee = { type: "atom", style: "atom" };
          return {
            if: g("if"),
            while: L,
            with: L,
            else: M,
            do: M,
            try: M,
            finally: M,
            return: Se,
            break: Se,
            continue: Se,
            new: g("new"),
            delete: W,
            void: W,
            throw: W,
            debugger: g("debugger"),
            var: g("var"),
            const: g("var"),
            let: g("var"),
            function: g("function"),
            catch: g("catch"),
            for: g("for"),
            switch: g("switch"),
            case: g("case"),
            default: g("default"),
            in: De,
            typeof: De,
            instanceof: De,
            true: Ee,
            false: Ee,
            null: Ee,
            undefined: Ee,
            NaN: Ee,
            Infinity: Ee,
            this: g("this"),
            class: g("class"),
            super: g("atom"),
            yield: W,
            export: g("export"),
            import: g("import"),
            extends: W,
            await: W
          };
        }(), z = /[+\-*&%=<>!?|~^@]/, j = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
        function Y(g) {
          for (var L = !1, M, W = !1; (M = g.next()) != null; ) {
            if (!L) {
              if (M == "/" && !W)
                return;
              M == "[" ? W = !0 : W && M == "]" && (W = !1);
            }
            L = !L && M == "\\";
          }
        }
        var re, P;
        function F(g, L, M) {
          return re = g, P = M, L;
        }
        function N(g, L) {
          var M = g.next();
          if (M == '"' || M == "'")
            return L.tokenize = H(M), L.tokenize(g, L);
          if (M == "." && g.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))
            return F("number", "number");
          if (M == "." && g.match(".."))
            return F("spread", "meta");
          if (/[\[\]{}\(\),;\:\.]/.test(M))
            return F(M);
          if (M == "=" && g.eat(">"))
            return F("=>", "operator");
          if (M == "0" && g.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))
            return F("number", "number");
          if (/\d/.test(M))
            return g.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), F("number", "number");
          if (M == "/")
            return g.eat("*") ? (L.tokenize = K, K(g, L)) : g.eat("/") ? (g.skipToEnd(), F("comment", "comment")) : Vt(g, L, 1) ? (Y(g), g.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), F("regexp", "string-2")) : (g.eat("="), F("operator", "operator", g.current()));
          if (M == "`")
            return L.tokenize = $, $(g, L);
          if (M == "#" && g.peek() == "!")
            return g.skipToEnd(), F("meta", "meta");
          if (M == "#" && g.eatWhile(O))
            return F("variable", "property");
          if (M == "<" && g.match("!--") || M == "-" && g.match("->") && !/\S/.test(g.string.slice(0, g.start)))
            return g.skipToEnd(), F("comment", "comment");
          if (z.test(M))
            return (M != ">" || !L.lexical || L.lexical.type != ">") && (g.eat("=") ? (M == "!" || M == "=") && g.eat("=") : /[<>*+\-|&?]/.test(M) && (g.eat(M), M == ">" && g.eat(M))), M == "?" && g.eat(".") ? F(".") : F("operator", "operator", g.current());
          if (O.test(M)) {
            g.eatWhile(O);
            var W = g.current();
            if (L.lastType != ".") {
              if (D.propertyIsEnumerable(W)) {
                var Se = D[W];
                return F(Se.type, Se.style, W);
              }
              if (W == "async" && g.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1))
                return F("async", "keyword", W);
            }
            return F("variable", "variable", W);
          }
        }
        function H(g) {
          return function(L, M) {
            var W = !1, Se;
            if (k && L.peek() == "@" && L.match(j))
              return M.tokenize = N, F("jsonld-keyword", "meta");
            for (; (Se = L.next()) != null && !(Se == g && !W); )
              W = !W && Se == "\\";
            return W || (M.tokenize = N), F("string", "string");
          };
        }
        function K(g, L) {
          for (var M = !1, W; W = g.next(); ) {
            if (W == "/" && M) {
              L.tokenize = N;
              break;
            }
            M = W == "*";
          }
          return F("comment", "comment");
        }
        function $(g, L) {
          for (var M = !1, W; (W = g.next()) != null; ) {
            if (!M && (W == "`" || W == "$" && g.eat("{"))) {
              L.tokenize = N;
              break;
            }
            M = !M && W == "\\";
          }
          return F("quasi", "string-2", g.current());
        }
        var le = "([{}])";
        function G(g, L) {
          L.fatArrowAt && (L.fatArrowAt = null);
          var M = g.string.indexOf("=>", g.start);
          if (!(M < 0)) {
            if (w) {
              var W = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(g.string.slice(g.start, M));
              W && (M = W.index);
            }
            for (var Se = 0, De = !1, Ee = M - 1; Ee >= 0; --Ee) {
              var Ve = g.string.charAt(Ee), It = le.indexOf(Ve);
              if (It >= 0 && It < 3) {
                if (!Se) {
                  ++Ee;
                  break;
                }
                if (--Se == 0) {
                  Ve == "(" && (De = !0);
                  break;
                }
              } else if (It >= 3 && It < 6)
                ++Se;
              else if (O.test(Ve))
                De = !0;
              else if (/["'\/`]/.test(Ve))
                for (; ; --Ee) {
                  if (Ee == 0)
                    return;
                  var Ce = g.string.charAt(Ee - 1);
                  if (Ce == Ve && g.string.charAt(Ee - 2) != "\\") {
                    Ee--;
                    break;
                  }
                }
              else if (De && !Se) {
                ++Ee;
                break;
              }
            }
            De && !Se && (L.fatArrowAt = Ee);
          }
        }
        var pe = {
          atom: !0,
          number: !0,
          variable: !0,
          string: !0,
          regexp: !0,
          this: !0,
          import: !0,
          "jsonld-keyword": !0
        };
        function ie(g, L, M, W, Se, De) {
          this.indented = g, this.column = L, this.type = M, this.prev = Se, this.info = De, W != null && (this.align = W);
        }
        function ue(g, L) {
          if (!T)
            return !1;
          for (var M = g.localVars; M; M = M.next)
            if (M.name == L)
              return !0;
          for (var W = g.context; W; W = W.prev)
            for (var M = W.vars; M; M = M.next)
              if (M.name == L)
                return !0;
        }
        function Ae(g, L, M, W, Se) {
          var De = g.cc;
          for (q.state = g, q.stream = Se, q.marked = null, q.cc = De, q.style = L, g.lexical.hasOwnProperty("align") || (g.lexical.align = !0); ; ) {
            var Ee = De.length ? De.pop() : S ? we : de;
            if (Ee(M, W)) {
              for (; De.length && De[De.length - 1].lex; )
                De.pop()();
              return q.marked ? q.marked : M == "variable" && ue(g, W) ? "variable-2" : L;
            }
          }
        }
        var q = { state: null, column: null, marked: null, cc: null };
        function J() {
          for (var g = arguments.length - 1; g >= 0; g--)
            q.cc.push(arguments[g]);
        }
        function y() {
          return J.apply(null, arguments), !0;
        }
        function V(g, L) {
          for (var M = L; M; M = M.next)
            if (M.name == g)
              return !0;
          return !1;
        }
        function X(g) {
          var L = q.state;
          if (q.marked = "def", !!T) {
            if (L.context) {
              if (L.lexical.info == "var" && L.context && L.context.block) {
                var M = ce(g, L.context);
                if (M != null) {
                  L.context = M;
                  return;
                }
              } else if (!V(g, L.localVars)) {
                L.localVars = new ae(g, L.localVars);
                return;
              }
            }
            d.globalVars && !V(g, L.globalVars) && (L.globalVars = new ae(g, L.globalVars));
          }
        }
        function ce(g, L) {
          if (L)
            if (L.block) {
              var M = ce(g, L.prev);
              return M ? M == L.prev ? L : new v(M, L.vars, !0) : null;
            } else
              return V(g, L.vars) ? L : new v(L.prev, new ae(g, L.vars), !1);
          else
            return null;
        }
        function A(g) {
          return g == "public" || g == "private" || g == "protected" || g == "abstract" || g == "readonly";
        }
        function v(g, L, M) {
          this.prev = g, this.vars = L, this.block = M;
        }
        function ae(g, L) {
          this.name = g, this.next = L;
        }
        var Me = new ae("this", new ae("arguments", null));
        function ge() {
          q.state.context = new v(q.state.context, q.state.localVars, !1), q.state.localVars = Me;
        }
        function je() {
          q.state.context = new v(q.state.context, q.state.localVars, !0), q.state.localVars = null;
        }
        ge.lex = je.lex = !0;
        function Pe() {
          q.state.localVars = q.state.context.vars, q.state.context = q.state.context.prev;
        }
        Pe.lex = !0;
        function me(g, L) {
          var M = function() {
            var W = q.state, Se = W.indented;
            if (W.lexical.type == "stat")
              Se = W.lexical.indented;
            else
              for (var De = W.lexical; De && De.type == ")" && De.align; De = De.prev)
                Se = De.indented;
            W.lexical = new ie(Se, q.stream.column(), g, null, W.lexical, L);
          };
          return M.lex = !0, M;
        }
        function fe() {
          var g = q.state;
          g.lexical.prev && (g.lexical.type == ")" && (g.indented = g.lexical.indented), g.lexical = g.lexical.prev);
        }
        fe.lex = !0;
        function be(g) {
          function L(M) {
            return M == g ? y() : g == ";" || M == "}" || M == ")" || M == "]" ? J() : y(L);
          }
          return L;
        }
        function de(g, L) {
          return g == "var" ? y(me("vardef", L), or, be(";"), fe) : g == "keyword a" ? y(me("form"), wt, de, fe) : g == "keyword b" ? y(me("form"), de, fe) : g == "keyword d" ? q.stream.match(/^\s*$/, !1) ? y() : y(me("stat"), Je, be(";"), fe) : g == "debugger" ? y(be(";")) : g == "{" ? y(me("}"), je, Zt, fe, Pe) : g == ";" ? y() : g == "if" ? (q.state.lexical.info == "else" && q.state.cc[q.state.cc.length - 1] == fe && q.state.cc.pop()(), y(me("form"), wt, de, fe, $r)) : g == "function" ? y(Qt) : g == "for" ? y(me("form"), je, pi, de, Pe, fe) : g == "class" || w && L == "interface" ? (q.marked = "keyword", y(me("form", g == "class" ? g : L), vi, fe)) : g == "variable" ? w && L == "declare" ? (q.marked = "keyword", y(de)) : w && (L == "module" || L == "enum" || L == "type") && q.stream.match(/^\s*\w/, !1) ? (q.marked = "keyword", L == "enum" ? y(Yr) : L == "type" ? y(gi, be("operator"), ne, be(";")) : y(me("form"), kt, be("{"), me("}"), Zt, fe, fe)) : w && L == "namespace" ? (q.marked = "keyword", y(me("form"), we, de, fe)) : w && L == "abstract" ? (q.marked = "keyword", y(de)) : y(me("stat"), Te) : g == "switch" ? y(
            me("form"),
            wt,
            be("{"),
            me("}", "switch"),
            je,
            Zt,
            fe,
            fe,
            Pe
          ) : g == "case" ? y(we, be(":")) : g == "default" ? y(be(":")) : g == "catch" ? y(me("form"), ge, xe, de, fe, Pe) : g == "export" ? y(me("stat"), xr, fe) : g == "import" ? y(me("stat"), ar, fe) : g == "async" ? y(de) : L == "@" ? y(we, de) : J(me("stat"), we, be(";"), fe);
        }
        function xe(g) {
          if (g == "(")
            return y(jt, be(")"));
        }
        function we(g, L) {
          return st(g, L, !1);
        }
        function Be(g, L) {
          return st(g, L, !0);
        }
        function wt(g) {
          return g != "(" ? J() : y(me(")"), Je, be(")"), fe);
        }
        function st(g, L, M) {
          if (q.state.fatArrowAt == q.stream.start) {
            var W = M ? ze : ir;
            if (g == "(")
              return y(ge, me(")"), Ke(jt, ")"), fe, be("=>"), W, Pe);
            if (g == "variable")
              return J(ge, kt, be("=>"), W, Pe);
          }
          var Se = M ? _e : Fe;
          return pe.hasOwnProperty(g) ? y(Se) : g == "function" ? y(Qt, Se) : g == "class" || w && L == "interface" ? (q.marked = "keyword", y(me("form"), yr, fe)) : g == "keyword c" || g == "async" ? y(M ? Be : we) : g == "(" ? y(me(")"), Je, be(")"), fe, Se) : g == "operator" || g == "spread" ? y(M ? Be : we) : g == "[" ? y(me("]"), sr, fe, Se) : g == "{" ? Ir(Gr, "}", null, Se) : g == "quasi" ? J(ke, Se) : g == "new" ? y(B(M)) : y();
        }
        function Je(g) {
          return g.match(/[;\}\)\],]/) ? J() : J(we);
        }
        function Fe(g, L) {
          return g == "," ? y(Je) : _e(g, L, !1);
        }
        function _e(g, L, M) {
          var W = M == !1 ? Fe : _e, Se = M == !1 ? we : Be;
          if (g == "=>")
            return y(ge, M ? ze : ir, Pe);
          if (g == "operator")
            return /\+\+|--/.test(L) || w && L == "!" ? y(W) : w && L == "<" && q.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1) ? y(me(">"), Ke(ne, ">"), fe, W) : L == "?" ? y(we, be(":"), Se) : y(Se);
          if (g == "quasi")
            return J(ke, W);
          if (g != ";") {
            if (g == "(")
              return Ir(Be, ")", "call", W);
            if (g == ".")
              return y(pt, W);
            if (g == "[")
              return y(me("]"), Je, be("]"), fe, W);
            if (w && L == "as")
              return q.marked = "keyword", y(ne, W);
            if (g == "regexp")
              return q.state.lastType = q.marked = "operator", q.stream.backUp(q.stream.pos - q.stream.start - 1), y(Se);
          }
        }
        function ke(g, L) {
          return g != "quasi" ? J() : L.slice(L.length - 2) != "${" ? y(ke) : y(Je, Ye);
        }
        function Ye(g) {
          if (g == "}")
            return q.marked = "string-2", q.state.tokenize = $, y(ke);
        }
        function ir(g) {
          return G(q.stream, q.state), J(g == "{" ? de : we);
        }
        function ze(g) {
          return G(q.stream, q.state), J(g == "{" ? de : Be);
        }
        function B(g) {
          return function(L) {
            return L == "." ? y(g ? R : Q) : L == "variable" && w ? y(ft, g ? _e : Fe) : J(g ? Be : we);
          };
        }
        function Q(g, L) {
          if (L == "target")
            return q.marked = "keyword", y(Fe);
        }
        function R(g, L) {
          if (L == "target")
            return q.marked = "keyword", y(_e);
        }
        function Te(g) {
          return g == ":" ? y(fe, de) : J(Fe, be(";"), fe);
        }
        function pt(g) {
          if (g == "variable")
            return q.marked = "property", y();
        }
        function Gr(g, L) {
          if (g == "async")
            return q.marked = "property", y(Gr);
          if (g == "variable" || q.style == "keyword") {
            if (q.marked = "property", L == "get" || L == "set")
              return y(bn);
            var M;
            return w && q.state.fatArrowAt == q.stream.start && (M = q.stream.match(/^\s*:\s*/, !1)) && (q.state.fatArrowAt = q.stream.pos + M[0].length), y(Yt);
          } else {
            if (g == "number" || g == "string")
              return q.marked = k ? "property" : q.style + " property", y(Yt);
            if (g == "jsonld-keyword")
              return y(Yt);
            if (w && A(L))
              return q.marked = "keyword", y(Gr);
            if (g == "[")
              return y(we, Ht, be("]"), Yt);
            if (g == "spread")
              return y(Be, Yt);
            if (L == "*")
              return q.marked = "keyword", y(Gr);
            if (g == ":")
              return J(Yt);
          }
        }
        function bn(g) {
          return g != "variable" ? J(Yt) : (q.marked = "property", y(Qt));
        }
        function Yt(g) {
          if (g == ":")
            return y(Be);
          if (g == "(")
            return J(Qt);
        }
        function Ke(g, L, M) {
          function W(Se, De) {
            if (M ? M.indexOf(Se) > -1 : Se == ",") {
              var Ee = q.state.lexical;
              return Ee.info == "call" && (Ee.pos = (Ee.pos || 0) + 1), y(function(Ve, It) {
                return Ve == L || It == L ? J() : J(g);
              }, W);
            }
            return Se == L || De == L ? y() : M && M.indexOf(";") > -1 ? J(g) : y(be(L));
          }
          return function(Se, De) {
            return Se == L || De == L ? y() : J(g, W);
          };
        }
        function Ir(g, L, M) {
          for (var W = 3; W < arguments.length; W++)
            q.cc.push(arguments[W]);
          return y(me(L, M), Ke(g, L), fe);
        }
        function Zt(g) {
          return g == "}" ? y() : J(de, Zt);
        }
        function Ht(g, L) {
          if (w) {
            if (g == ":")
              return y(ne);
            if (L == "?")
              return y(Ht);
          }
        }
        function ho(g, L) {
          if (w && (g == ":" || L == "in"))
            return y(ne);
        }
        function zt(g) {
          if (w && g == ":")
            return q.stream.match(/^\s*\w+\s+is\b/, !1) ? y(we, hi, ne) : y(ne);
        }
        function hi(g, L) {
          if (L == "is")
            return q.marked = "keyword", y();
        }
        function ne(g, L) {
          if (L == "keyof" || L == "typeof" || L == "infer" || L == "readonly")
            return q.marked = "keyword", y(L == "typeof" ? Be : ne);
          if (g == "variable" || L == "void")
            return q.marked = "type", y(vt);
          if (L == "|" || L == "&")
            return y(ne);
          if (g == "string" || g == "number" || g == "atom")
            return y(vt);
          if (g == "[")
            return y(me("]"), Ke(ne, "]", ","), fe, vt);
          if (g == "{")
            return y(me("}"), ut, fe, vt);
          if (g == "(")
            return y(Ke(gt, ")"), wn, vt);
          if (g == "<")
            return y(Ke(ne, ">"), ne);
          if (g == "quasi")
            return J(Ue, vt);
        }
        function wn(g) {
          if (g == "=>")
            return y(ne);
        }
        function ut(g) {
          return g.match(/[\}\)\]]/) ? y() : g == "," || g == ";" ? y(ut) : J(We, ut);
        }
        function We(g, L) {
          if (g == "variable" || q.style == "keyword")
            return q.marked = "property", y(We);
          if (L == "?" || g == "number" || g == "string")
            return y(We);
          if (g == ":")
            return y(ne);
          if (g == "[")
            return y(be("variable"), ho, be("]"), We);
          if (g == "(")
            return J(Jt, We);
          if (!g.match(/[;\}\)\],]/))
            return y();
        }
        function Ue(g, L) {
          return g != "quasi" ? J() : L.slice(L.length - 2) != "${" ? y(Ue) : y(ne, di);
        }
        function di(g) {
          if (g == "}")
            return q.marked = "string-2", q.state.tokenize = $, y(Ue);
        }
        function gt(g, L) {
          return g == "variable" && q.stream.match(/^\s*[?:]/, !1) || L == "?" ? y(gt) : g == ":" ? y(ne) : g == "spread" ? y(gt) : J(ne);
        }
        function vt(g, L) {
          if (L == "<")
            return y(me(">"), Ke(ne, ">"), fe, vt);
          if (L == "|" || g == "." || L == "&")
            return y(ne);
          if (g == "[")
            return y(ne, be("]"), vt);
          if (L == "extends" || L == "implements")
            return q.marked = "keyword", y(ne);
          if (L == "?")
            return y(ne, be(":"), ne);
        }
        function ft(g, L) {
          if (L == "<")
            return y(me(">"), Ke(ne, ">"), fe, vt);
        }
        function Nr() {
          return J(ne, kn);
        }
        function kn(g, L) {
          if (L == "=")
            return y(ne);
        }
        function or(g, L) {
          return L == "enum" ? (q.marked = "keyword", y(Yr)) : J(kt, Ht, Wt, go);
        }
        function kt(g, L) {
          if (w && A(L))
            return q.marked = "keyword", y(kt);
          if (g == "variable")
            return X(L), y();
          if (g == "spread")
            return y(kt);
          if (g == "[")
            return Ir(po, "]");
          if (g == "{")
            return Ir(Sn, "}");
        }
        function Sn(g, L) {
          return g == "variable" && !q.stream.match(/^\s*:/, !1) ? (X(L), y(Wt)) : (g == "variable" && (q.marked = "property"), g == "spread" ? y(kt) : g == "}" ? J() : g == "[" ? y(we, be("]"), be(":"), Sn) : y(be(":"), kt, Wt));
        }
        function po() {
          return J(kt, Wt);
        }
        function Wt(g, L) {
          if (L == "=")
            return y(Be);
        }
        function go(g) {
          if (g == ",")
            return y(or);
        }
        function $r(g, L) {
          if (g == "keyword b" && L == "else")
            return y(me("form", "else"), de, fe);
        }
        function pi(g, L) {
          if (L == "await")
            return y(pi);
          if (g == "(")
            return y(me(")"), Cn, fe);
        }
        function Cn(g) {
          return g == "var" ? y(or, mr) : g == "variable" ? y(mr) : J(mr);
        }
        function mr(g, L) {
          return g == ")" ? y() : g == ";" ? y(mr) : L == "in" || L == "of" ? (q.marked = "keyword", y(we, mr)) : J(we, mr);
        }
        function Qt(g, L) {
          if (L == "*")
            return q.marked = "keyword", y(Qt);
          if (g == "variable")
            return X(L), y(Qt);
          if (g == "(")
            return y(ge, me(")"), Ke(jt, ")"), fe, zt, de, Pe);
          if (w && L == "<")
            return y(me(">"), Ke(Nr, ">"), fe, Qt);
        }
        function Jt(g, L) {
          if (L == "*")
            return q.marked = "keyword", y(Jt);
          if (g == "variable")
            return X(L), y(Jt);
          if (g == "(")
            return y(ge, me(")"), Ke(jt, ")"), fe, zt, Pe);
          if (w && L == "<")
            return y(me(">"), Ke(Nr, ">"), fe, Jt);
        }
        function gi(g, L) {
          if (g == "keyword" || g == "variable")
            return q.marked = "type", y(gi);
          if (L == "<")
            return y(me(">"), Ke(Nr, ">"), fe);
        }
        function jt(g, L) {
          return L == "@" && y(we, jt), g == "spread" ? y(jt) : w && A(L) ? (q.marked = "keyword", y(jt)) : w && g == "this" ? y(Ht, Wt) : J(kt, Ht, Wt);
        }
        function yr(g, L) {
          return g == "variable" ? vi(g, L) : Xr(g, L);
        }
        function vi(g, L) {
          if (g == "variable")
            return X(L), y(Xr);
        }
        function Xr(g, L) {
          if (L == "<")
            return y(me(">"), Ke(Nr, ">"), fe, Xr);
          if (L == "extends" || L == "implements" || w && g == ",")
            return L == "implements" && (q.marked = "keyword"), y(w ? ne : we, Xr);
          if (g == "{")
            return y(me("}"), Dt, fe);
        }
        function Dt(g, L) {
          if (g == "async" || g == "variable" && (L == "static" || L == "get" || L == "set" || w && A(L)) && q.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
            return q.marked = "keyword", y(Dt);
          if (g == "variable" || q.style == "keyword")
            return q.marked = "property", y(lr, Dt);
          if (g == "number" || g == "string")
            return y(lr, Dt);
          if (g == "[")
            return y(we, Ht, be("]"), lr, Dt);
          if (L == "*")
            return q.marked = "keyword", y(Dt);
          if (w && g == "(")
            return J(Jt, Dt);
          if (g == ";" || g == ",")
            return y(Dt);
          if (g == "}")
            return y();
          if (L == "@")
            return y(we, Dt);
        }
        function lr(g, L) {
          if (L == "!" || L == "?")
            return y(lr);
          if (g == ":")
            return y(ne, Wt);
          if (L == "=")
            return y(Be);
          var M = q.state.lexical.prev, W = M && M.info == "interface";
          return J(W ? Jt : Qt);
        }
        function xr(g, L) {
          return L == "*" ? (q.marked = "keyword", y(he, be(";"))) : L == "default" ? (q.marked = "keyword", y(we, be(";"))) : g == "{" ? y(Ke(mi, "}"), he, be(";")) : J(de);
        }
        function mi(g, L) {
          if (L == "as")
            return q.marked = "keyword", y(be("variable"));
          if (g == "variable")
            return J(Be, mi);
        }
        function ar(g) {
          return g == "string" ? y() : g == "(" ? J(we) : g == "." ? J(Fe) : J(br, Ln, he);
        }
        function br(g, L) {
          return g == "{" ? Ir(br, "}") : (g == "variable" && X(L), L == "*" && (q.marked = "keyword"), y(Ge));
        }
        function Ln(g) {
          if (g == ",")
            return y(br, Ln);
        }
        function Ge(g, L) {
          if (L == "as")
            return q.marked = "keyword", y(br);
        }
        function he(g, L) {
          if (L == "from")
            return q.marked = "keyword", y(we);
        }
        function sr(g) {
          return g == "]" ? y() : J(Ke(Be, "]"));
        }
        function Yr() {
          return J(me("form"), kt, be("{"), me("}"), Ke(_t, "}"), fe, fe);
        }
        function _t() {
          return J(kt, Wt);
        }
        function Oe(g, L) {
          return g.lastType == "operator" || g.lastType == "," || z.test(L.charAt(0)) || /[,.]/.test(L.charAt(0));
        }
        function Vt(g, L, M) {
          return L.tokenize == N && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(L.lastType) || L.lastType == "quasi" && /\{\s*$/.test(g.string.slice(0, g.pos - (M || 0)));
        }
        return {
          startState: function(g) {
            var L = {
              tokenize: N,
              lastType: "sof",
              cc: [],
              lexical: new ie((g || 0) - m, 0, "block", !1),
              localVars: d.localVars,
              context: d.localVars && new v(null, null, !1),
              indented: g || 0
            };
            return d.globalVars && typeof d.globalVars == "object" && (L.globalVars = d.globalVars), L;
          },
          token: function(g, L) {
            if (g.sol() && (L.lexical.hasOwnProperty("align") || (L.lexical.align = !1), L.indented = g.indentation(), G(g, L)), L.tokenize != K && g.eatSpace())
              return null;
            var M = L.tokenize(g, L);
            return re == "comment" ? M : (L.lastType = re == "operator" && (P == "++" || P == "--") ? "incdec" : re, Ae(L, M, re, P, g));
          },
          indent: function(g, L) {
            if (g.tokenize == K || g.tokenize == $)
              return a.Pass;
            if (g.tokenize != N)
              return 0;
            var M = L && L.charAt(0), W = g.lexical, Se;
            if (!/^\s*else\b/.test(L))
              for (var De = g.cc.length - 1; De >= 0; --De) {
                var Ee = g.cc[De];
                if (Ee == fe)
                  W = W.prev;
                else if (Ee != $r && Ee != Pe)
                  break;
              }
            for (; (W.type == "stat" || W.type == "form") && (M == "}" || (Se = g.cc[g.cc.length - 1]) && (Se == Fe || Se == _e) && !/^[,\.=+\-*:?[\(]/.test(L)); )
              W = W.prev;
            x && W.type == ")" && W.prev.type == "stat" && (W = W.prev);
            var Ve = W.type, It = M == Ve;
            return Ve == "vardef" ? W.indented + (g.lastType == "operator" || g.lastType == "," ? W.info.length + 1 : 0) : Ve == "form" && M == "{" ? W.indented : Ve == "form" ? W.indented + m : Ve == "stat" ? W.indented + (Oe(g, L) ? x || m : 0) : W.info == "switch" && !It && d.doubleIndentSwitch != !1 ? W.indented + (/^(?:case|default)\b/.test(L) ? m : 2 * m) : W.align ? W.column + (It ? 0 : 1) : W.indented + (It ? 0 : m);
          },
          electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
          blockCommentStart: S ? null : "/*",
          blockCommentEnd: S ? null : "*/",
          blockCommentContinue: S ? null : " * ",
          lineComment: S ? null : "//",
          fold: "brace",
          closeBrackets: "()[]{}''\"\"``",
          helperType: S ? "json" : "javascript",
          jsonldMode: k,
          jsonMode: S,
          expressionAllowed: Vt,
          skipExpression: function(g) {
            Ae(g, "atom", "atom", "true", new a.StringStream("", 2, null));
          }
        };
      }), a.registerHelper("wordChars", "javascript", /[\w$]/), a.defineMIME("text/javascript", "javascript"), a.defineMIME("text/ecmascript", "javascript"), a.defineMIME("application/javascript", "javascript"), a.defineMIME("application/x-javascript", "javascript"), a.defineMIME("application/ecmascript", "javascript"), a.defineMIME("application/json", { name: "javascript", json: !0 }), a.defineMIME("application/x-json", { name: "javascript", json: !0 }), a.defineMIME("application/manifest+json", { name: "javascript", json: !0 }), a.defineMIME("application/ld+json", { name: "javascript", jsonld: !0 }), a.defineMIME("text/typescript", { name: "javascript", typescript: !0 }), a.defineMIME("application/typescript", { name: "javascript", typescript: !0 });
    });
  }()), Ps.exports;
}
pu();
var xh = { exports: {} };
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    a.defineMode("css", function(ie, ue) {
      var Ae = ue.inline;
      ue.propertyKeywords || (ue = a.resolveMode("text/css"));
      var q = ie.indentUnit, J = ue.tokenHooks, y = ue.documentTypes || {}, V = ue.mediaTypes || {}, X = ue.mediaFeatures || {}, ce = ue.mediaValueKeywords || {}, A = ue.propertyKeywords || {}, v = ue.nonStandardPropertyKeywords || {}, ae = ue.fontProperties || {}, Me = ue.counterDescriptors || {}, ge = ue.colorKeywords || {}, je = ue.valueKeywords || {}, Pe = ue.allowNested, me = ue.lineComment, fe = ue.supportsAtComponent === !0, be = ie.highlightNonStandardPropertyKeywords !== !1, de, xe;
      function we(B, Q) {
        return de = Q, B;
      }
      function Be(B, Q) {
        var R = B.next();
        if (J[R]) {
          var Te = J[R](B, Q);
          if (Te !== !1)
            return Te;
        }
        if (R == "@")
          return B.eatWhile(/[\w\\\-]/), we("def", B.current());
        if (R == "=" || (R == "~" || R == "|") && B.eat("="))
          return we(null, "compare");
        if (R == '"' || R == "'")
          return Q.tokenize = wt(R), Q.tokenize(B, Q);
        if (R == "#")
          return B.eatWhile(/[\w\\\-]/), we("atom", "hash");
        if (R == "!")
          return B.match(/^\s*\w*/), we("keyword", "important");
        if (/\d/.test(R) || R == "." && B.eat(/\d/))
          return B.eatWhile(/[\w.%]/), we("number", "unit");
        if (R === "-") {
          if (/[\d.]/.test(B.peek()))
            return B.eatWhile(/[\w.%]/), we("number", "unit");
          if (B.match(/^-[\w\\\-]*/))
            return B.eatWhile(/[\w\\\-]/), B.match(/^\s*:/, !1) ? we("variable-2", "variable-definition") : we("variable-2", "variable");
          if (B.match(/^\w+-/))
            return we("meta", "meta");
        } else
          return /[,+>*\/]/.test(R) ? we(null, "select-op") : R == "." && B.match(/^-?[_a-z][_a-z0-9-]*/i) ? we("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(R) ? we(null, R) : B.match(/^[\w-.]+(?=\()/) ? (/^(url(-prefix)?|domain|regexp)$/i.test(B.current()) && (Q.tokenize = st), we("variable callee", "variable")) : /[\w\\\-]/.test(R) ? (B.eatWhile(/[\w\\\-]/), we("property", "word")) : we(null, null);
      }
      function wt(B) {
        return function(Q, R) {
          for (var Te = !1, pt; (pt = Q.next()) != null; ) {
            if (pt == B && !Te) {
              B == ")" && Q.backUp(1);
              break;
            }
            Te = !Te && pt == "\\";
          }
          return (pt == B || !Te && B != ")") && (R.tokenize = null), we("string", "string");
        };
      }
      function st(B, Q) {
        return B.next(), B.match(/^\s*[\"\')]/, !1) ? Q.tokenize = null : Q.tokenize = wt(")"), we(null, "(");
      }
      function Je(B, Q, R) {
        this.type = B, this.indent = Q, this.prev = R;
      }
      function Fe(B, Q, R, Te) {
        return B.context = new Je(R, Q.indentation() + (Te === !1 ? 0 : q), B.context), R;
      }
      function _e(B) {
        return B.context.prev && (B.context = B.context.prev), B.context.type;
      }
      function ke(B, Q, R) {
        return ze[R.context.type](B, Q, R);
      }
      function Ye(B, Q, R, Te) {
        for (var pt = Te || 1; pt > 0; pt--)
          R.context = R.context.prev;
        return ke(B, Q, R);
      }
      function ir(B) {
        var Q = B.current().toLowerCase();
        je.hasOwnProperty(Q) ? xe = "atom" : ge.hasOwnProperty(Q) ? xe = "keyword" : xe = "variable";
      }
      var ze = {};
      return ze.top = function(B, Q, R) {
        if (B == "{")
          return Fe(R, Q, "block");
        if (B == "}" && R.context.prev)
          return _e(R);
        if (fe && /@component/i.test(B))
          return Fe(R, Q, "atComponentBlock");
        if (/^@(-moz-)?document$/i.test(B))
          return Fe(R, Q, "documentTypes");
        if (/^@(media|supports|(-moz-)?document|import)$/i.test(B))
          return Fe(R, Q, "atBlock");
        if (/^@(font-face|counter-style)/i.test(B))
          return R.stateArg = B, "restricted_atBlock_before";
        if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(B))
          return "keyframes";
        if (B && B.charAt(0) == "@")
          return Fe(R, Q, "at");
        if (B == "hash")
          xe = "builtin";
        else if (B == "word")
          xe = "tag";
        else {
          if (B == "variable-definition")
            return "maybeprop";
          if (B == "interpolation")
            return Fe(R, Q, "interpolation");
          if (B == ":")
            return "pseudo";
          if (Pe && B == "(")
            return Fe(R, Q, "parens");
        }
        return R.context.type;
      }, ze.block = function(B, Q, R) {
        if (B == "word") {
          var Te = Q.current().toLowerCase();
          return A.hasOwnProperty(Te) ? (xe = "property", "maybeprop") : v.hasOwnProperty(Te) ? (xe = be ? "string-2" : "property", "maybeprop") : Pe ? (xe = Q.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag", "block") : (xe += " error", "maybeprop");
        } else
          return B == "meta" ? "block" : !Pe && (B == "hash" || B == "qualifier") ? (xe = "error", "block") : ze.top(B, Q, R);
      }, ze.maybeprop = function(B, Q, R) {
        return B == ":" ? Fe(R, Q, "prop") : ke(B, Q, R);
      }, ze.prop = function(B, Q, R) {
        if (B == ";")
          return _e(R);
        if (B == "{" && Pe)
          return Fe(R, Q, "propBlock");
        if (B == "}" || B == "{")
          return Ye(B, Q, R);
        if (B == "(")
          return Fe(R, Q, "parens");
        if (B == "hash" && !/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(Q.current()))
          xe += " error";
        else if (B == "word")
          ir(Q);
        else if (B == "interpolation")
          return Fe(R, Q, "interpolation");
        return "prop";
      }, ze.propBlock = function(B, Q, R) {
        return B == "}" ? _e(R) : B == "word" ? (xe = "property", "maybeprop") : R.context.type;
      }, ze.parens = function(B, Q, R) {
        return B == "{" || B == "}" ? Ye(B, Q, R) : B == ")" ? _e(R) : B == "(" ? Fe(R, Q, "parens") : B == "interpolation" ? Fe(R, Q, "interpolation") : (B == "word" && ir(Q), "parens");
      }, ze.pseudo = function(B, Q, R) {
        return B == "meta" ? "pseudo" : B == "word" ? (xe = "variable-3", R.context.type) : ke(B, Q, R);
      }, ze.documentTypes = function(B, Q, R) {
        return B == "word" && y.hasOwnProperty(Q.current()) ? (xe = "tag", R.context.type) : ze.atBlock(B, Q, R);
      }, ze.atBlock = function(B, Q, R) {
        if (B == "(")
          return Fe(R, Q, "atBlock_parens");
        if (B == "}" || B == ";")
          return Ye(B, Q, R);
        if (B == "{")
          return _e(R) && Fe(R, Q, Pe ? "block" : "top");
        if (B == "interpolation")
          return Fe(R, Q, "interpolation");
        if (B == "word") {
          var Te = Q.current().toLowerCase();
          Te == "only" || Te == "not" || Te == "and" || Te == "or" ? xe = "keyword" : V.hasOwnProperty(Te) ? xe = "attribute" : X.hasOwnProperty(Te) ? xe = "property" : ce.hasOwnProperty(Te) ? xe = "keyword" : A.hasOwnProperty(Te) ? xe = "property" : v.hasOwnProperty(Te) ? xe = be ? "string-2" : "property" : je.hasOwnProperty(Te) ? xe = "atom" : ge.hasOwnProperty(Te) ? xe = "keyword" : xe = "error";
        }
        return R.context.type;
      }, ze.atComponentBlock = function(B, Q, R) {
        return B == "}" ? Ye(B, Q, R) : B == "{" ? _e(R) && Fe(R, Q, Pe ? "block" : "top", !1) : (B == "word" && (xe = "error"), R.context.type);
      }, ze.atBlock_parens = function(B, Q, R) {
        return B == ")" ? _e(R) : B == "{" || B == "}" ? Ye(B, Q, R, 2) : ze.atBlock(B, Q, R);
      }, ze.restricted_atBlock_before = function(B, Q, R) {
        return B == "{" ? Fe(R, Q, "restricted_atBlock") : B == "word" && R.stateArg == "@counter-style" ? (xe = "variable", "restricted_atBlock_before") : ke(B, Q, R);
      }, ze.restricted_atBlock = function(B, Q, R) {
        return B == "}" ? (R.stateArg = null, _e(R)) : B == "word" ? (R.stateArg == "@font-face" && !ae.hasOwnProperty(Q.current().toLowerCase()) || R.stateArg == "@counter-style" && !Me.hasOwnProperty(Q.current().toLowerCase()) ? xe = "error" : xe = "property", "maybeprop") : "restricted_atBlock";
      }, ze.keyframes = function(B, Q, R) {
        return B == "word" ? (xe = "variable", "keyframes") : B == "{" ? Fe(R, Q, "top") : ke(B, Q, R);
      }, ze.at = function(B, Q, R) {
        return B == ";" ? _e(R) : B == "{" || B == "}" ? Ye(B, Q, R) : (B == "word" ? xe = "tag" : B == "hash" && (xe = "builtin"), "at");
      }, ze.interpolation = function(B, Q, R) {
        return B == "}" ? _e(R) : B == "{" || B == ";" ? Ye(B, Q, R) : (B == "word" ? xe = "variable" : B != "variable" && B != "(" && B != ")" && (xe = "error"), "interpolation");
      }, {
        startState: function(B) {
          return {
            tokenize: null,
            state: Ae ? "block" : "top",
            stateArg: null,
            context: new Je(Ae ? "block" : "top", B || 0, null)
          };
        },
        token: function(B, Q) {
          if (!Q.tokenize && B.eatSpace())
            return null;
          var R = (Q.tokenize || Be)(B, Q);
          return R && typeof R == "object" && (de = R[1], R = R[0]), xe = R, de != "comment" && (Q.state = ze[Q.state](de, B, Q)), xe;
        },
        indent: function(B, Q) {
          var R = B.context, Te = Q && Q.charAt(0), pt = R.indent;
          return R.type == "prop" && (Te == "}" || Te == ")") && (R = R.prev), R.prev && (Te == "}" && (R.type == "block" || R.type == "top" || R.type == "interpolation" || R.type == "restricted_atBlock") ? (R = R.prev, pt = R.indent) : (Te == ")" && (R.type == "parens" || R.type == "atBlock_parens") || Te == "{" && (R.type == "at" || R.type == "atBlock")) && (pt = Math.max(0, R.indent - q))), pt;
        },
        electricChars: "}",
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        blockCommentContinue: " * ",
        lineComment: me,
        fold: "brace"
      };
    });
    function p(ie) {
      for (var ue = {}, Ae = 0; Ae < ie.length; ++Ae)
        ue[ie[Ae].toLowerCase()] = !0;
      return ue;
    }
    var d = [
      "domain",
      "regexp",
      "url",
      "url-prefix"
    ], m = p(d), x = [
      "all",
      "aural",
      "braille",
      "handheld",
      "print",
      "projection",
      "screen",
      "tty",
      "tv",
      "embossed"
    ], k = p(x), S = [
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "device-width",
      "min-device-width",
      "max-device-width",
      "device-height",
      "min-device-height",
      "max-device-height",
      "aspect-ratio",
      "min-aspect-ratio",
      "max-aspect-ratio",
      "device-aspect-ratio",
      "min-device-aspect-ratio",
      "max-device-aspect-ratio",
      "color",
      "min-color",
      "max-color",
      "color-index",
      "min-color-index",
      "max-color-index",
      "monochrome",
      "min-monochrome",
      "max-monochrome",
      "resolution",
      "min-resolution",
      "max-resolution",
      "scan",
      "grid",
      "orientation",
      "device-pixel-ratio",
      "min-device-pixel-ratio",
      "max-device-pixel-ratio",
      "pointer",
      "any-pointer",
      "hover",
      "any-hover",
      "prefers-color-scheme",
      "dynamic-range",
      "video-dynamic-range"
    ], T = p(S), w = [
      "landscape",
      "portrait",
      "none",
      "coarse",
      "fine",
      "on-demand",
      "hover",
      "interlace",
      "progressive",
      "dark",
      "light",
      "standard",
      "high"
    ], O = p(w), D = [
      "align-content",
      "align-items",
      "align-self",
      "alignment-adjust",
      "alignment-baseline",
      "all",
      "anchor-point",
      "animation",
      "animation-delay",
      "animation-direction",
      "animation-duration",
      "animation-fill-mode",
      "animation-iteration-count",
      "animation-name",
      "animation-play-state",
      "animation-timing-function",
      "appearance",
      "azimuth",
      "backdrop-filter",
      "backface-visibility",
      "background",
      "background-attachment",
      "background-blend-mode",
      "background-clip",
      "background-color",
      "background-image",
      "background-origin",
      "background-position",
      "background-position-x",
      "background-position-y",
      "background-repeat",
      "background-size",
      "baseline-shift",
      "binding",
      "bleed",
      "block-size",
      "bookmark-label",
      "bookmark-level",
      "bookmark-state",
      "bookmark-target",
      "border",
      "border-bottom",
      "border-bottom-color",
      "border-bottom-left-radius",
      "border-bottom-right-radius",
      "border-bottom-style",
      "border-bottom-width",
      "border-collapse",
      "border-color",
      "border-image",
      "border-image-outset",
      "border-image-repeat",
      "border-image-slice",
      "border-image-source",
      "border-image-width",
      "border-left",
      "border-left-color",
      "border-left-style",
      "border-left-width",
      "border-radius",
      "border-right",
      "border-right-color",
      "border-right-style",
      "border-right-width",
      "border-spacing",
      "border-style",
      "border-top",
      "border-top-color",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-top-style",
      "border-top-width",
      "border-width",
      "bottom",
      "box-decoration-break",
      "box-shadow",
      "box-sizing",
      "break-after",
      "break-before",
      "break-inside",
      "caption-side",
      "caret-color",
      "clear",
      "clip",
      "color",
      "color-profile",
      "column-count",
      "column-fill",
      "column-gap",
      "column-rule",
      "column-rule-color",
      "column-rule-style",
      "column-rule-width",
      "column-span",
      "column-width",
      "columns",
      "contain",
      "content",
      "counter-increment",
      "counter-reset",
      "crop",
      "cue",
      "cue-after",
      "cue-before",
      "cursor",
      "direction",
      "display",
      "dominant-baseline",
      "drop-initial-after-adjust",
      "drop-initial-after-align",
      "drop-initial-before-adjust",
      "drop-initial-before-align",
      "drop-initial-size",
      "drop-initial-value",
      "elevation",
      "empty-cells",
      "fit",
      "fit-content",
      "fit-position",
      "flex",
      "flex-basis",
      "flex-direction",
      "flex-flow",
      "flex-grow",
      "flex-shrink",
      "flex-wrap",
      "float",
      "float-offset",
      "flow-from",
      "flow-into",
      "font",
      "font-family",
      "font-feature-settings",
      "font-kerning",
      "font-language-override",
      "font-optical-sizing",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-synthesis",
      "font-variant",
      "font-variant-alternates",
      "font-variant-caps",
      "font-variant-east-asian",
      "font-variant-ligatures",
      "font-variant-numeric",
      "font-variant-position",
      "font-variation-settings",
      "font-weight",
      "gap",
      "grid",
      "grid-area",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-column",
      "grid-column-end",
      "grid-column-gap",
      "grid-column-start",
      "grid-gap",
      "grid-row",
      "grid-row-end",
      "grid-row-gap",
      "grid-row-start",
      "grid-template",
      "grid-template-areas",
      "grid-template-columns",
      "grid-template-rows",
      "hanging-punctuation",
      "height",
      "hyphens",
      "icon",
      "image-orientation",
      "image-rendering",
      "image-resolution",
      "inline-box-align",
      "inset",
      "inset-block",
      "inset-block-end",
      "inset-block-start",
      "inset-inline",
      "inset-inline-end",
      "inset-inline-start",
      "isolation",
      "justify-content",
      "justify-items",
      "justify-self",
      "left",
      "letter-spacing",
      "line-break",
      "line-height",
      "line-height-step",
      "line-stacking",
      "line-stacking-ruby",
      "line-stacking-shift",
      "line-stacking-strategy",
      "list-style",
      "list-style-image",
      "list-style-position",
      "list-style-type",
      "margin",
      "margin-bottom",
      "margin-left",
      "margin-right",
      "margin-top",
      "marks",
      "marquee-direction",
      "marquee-loop",
      "marquee-play-count",
      "marquee-speed",
      "marquee-style",
      "mask-clip",
      "mask-composite",
      "mask-image",
      "mask-mode",
      "mask-origin",
      "mask-position",
      "mask-repeat",
      "mask-size",
      "mask-type",
      "max-block-size",
      "max-height",
      "max-inline-size",
      "max-width",
      "min-block-size",
      "min-height",
      "min-inline-size",
      "min-width",
      "mix-blend-mode",
      "move-to",
      "nav-down",
      "nav-index",
      "nav-left",
      "nav-right",
      "nav-up",
      "object-fit",
      "object-position",
      "offset",
      "offset-anchor",
      "offset-distance",
      "offset-path",
      "offset-position",
      "offset-rotate",
      "opacity",
      "order",
      "orphans",
      "outline",
      "outline-color",
      "outline-offset",
      "outline-style",
      "outline-width",
      "overflow",
      "overflow-style",
      "overflow-wrap",
      "overflow-x",
      "overflow-y",
      "padding",
      "padding-bottom",
      "padding-left",
      "padding-right",
      "padding-top",
      "page",
      "page-break-after",
      "page-break-before",
      "page-break-inside",
      "page-policy",
      "pause",
      "pause-after",
      "pause-before",
      "perspective",
      "perspective-origin",
      "pitch",
      "pitch-range",
      "place-content",
      "place-items",
      "place-self",
      "play-during",
      "position",
      "presentation-level",
      "punctuation-trim",
      "quotes",
      "region-break-after",
      "region-break-before",
      "region-break-inside",
      "region-fragment",
      "rendering-intent",
      "resize",
      "rest",
      "rest-after",
      "rest-before",
      "richness",
      "right",
      "rotate",
      "rotation",
      "rotation-point",
      "row-gap",
      "ruby-align",
      "ruby-overhang",
      "ruby-position",
      "ruby-span",
      "scale",
      "scroll-behavior",
      "scroll-margin",
      "scroll-margin-block",
      "scroll-margin-block-end",
      "scroll-margin-block-start",
      "scroll-margin-bottom",
      "scroll-margin-inline",
      "scroll-margin-inline-end",
      "scroll-margin-inline-start",
      "scroll-margin-left",
      "scroll-margin-right",
      "scroll-margin-top",
      "scroll-padding",
      "scroll-padding-block",
      "scroll-padding-block-end",
      "scroll-padding-block-start",
      "scroll-padding-bottom",
      "scroll-padding-inline",
      "scroll-padding-inline-end",
      "scroll-padding-inline-start",
      "scroll-padding-left",
      "scroll-padding-right",
      "scroll-padding-top",
      "scroll-snap-align",
      "scroll-snap-type",
      "shape-image-threshold",
      "shape-inside",
      "shape-margin",
      "shape-outside",
      "size",
      "speak",
      "speak-as",
      "speak-header",
      "speak-numeral",
      "speak-punctuation",
      "speech-rate",
      "stress",
      "string-set",
      "tab-size",
      "table-layout",
      "target",
      "target-name",
      "target-new",
      "target-position",
      "text-align",
      "text-align-last",
      "text-combine-upright",
      "text-decoration",
      "text-decoration-color",
      "text-decoration-line",
      "text-decoration-skip",
      "text-decoration-skip-ink",
      "text-decoration-style",
      "text-emphasis",
      "text-emphasis-color",
      "text-emphasis-position",
      "text-emphasis-style",
      "text-height",
      "text-indent",
      "text-justify",
      "text-orientation",
      "text-outline",
      "text-overflow",
      "text-rendering",
      "text-shadow",
      "text-size-adjust",
      "text-space-collapse",
      "text-transform",
      "text-underline-position",
      "text-wrap",
      "top",
      "touch-action",
      "transform",
      "transform-origin",
      "transform-style",
      "transition",
      "transition-delay",
      "transition-duration",
      "transition-property",
      "transition-timing-function",
      "translate",
      "unicode-bidi",
      "user-select",
      "vertical-align",
      "visibility",
      "voice-balance",
      "voice-duration",
      "voice-family",
      "voice-pitch",
      "voice-range",
      "voice-rate",
      "voice-stress",
      "voice-volume",
      "volume",
      "white-space",
      "widows",
      "width",
      "will-change",
      "word-break",
      "word-spacing",
      "word-wrap",
      "writing-mode",
      "z-index",
      "clip-path",
      "clip-rule",
      "mask",
      "enable-background",
      "filter",
      "flood-color",
      "flood-opacity",
      "lighting-color",
      "stop-color",
      "stop-opacity",
      "pointer-events",
      "color-interpolation",
      "color-interpolation-filters",
      "color-rendering",
      "fill",
      "fill-opacity",
      "fill-rule",
      "image-rendering",
      "marker",
      "marker-end",
      "marker-mid",
      "marker-start",
      "paint-order",
      "shape-rendering",
      "stroke",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-rendering",
      "baseline-shift",
      "dominant-baseline",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "text-anchor",
      "writing-mode"
    ], z = p(D), j = [
      "accent-color",
      "aspect-ratio",
      "border-block",
      "border-block-color",
      "border-block-end",
      "border-block-end-color",
      "border-block-end-style",
      "border-block-end-width",
      "border-block-start",
      "border-block-start-color",
      "border-block-start-style",
      "border-block-start-width",
      "border-block-style",
      "border-block-width",
      "border-inline",
      "border-inline-color",
      "border-inline-end",
      "border-inline-end-color",
      "border-inline-end-style",
      "border-inline-end-width",
      "border-inline-start",
      "border-inline-start-color",
      "border-inline-start-style",
      "border-inline-start-width",
      "border-inline-style",
      "border-inline-width",
      "content-visibility",
      "margin-block",
      "margin-block-end",
      "margin-block-start",
      "margin-inline",
      "margin-inline-end",
      "margin-inline-start",
      "overflow-anchor",
      "overscroll-behavior",
      "padding-block",
      "padding-block-end",
      "padding-block-start",
      "padding-inline",
      "padding-inline-end",
      "padding-inline-start",
      "scroll-snap-stop",
      "scrollbar-3d-light-color",
      "scrollbar-arrow-color",
      "scrollbar-base-color",
      "scrollbar-dark-shadow-color",
      "scrollbar-face-color",
      "scrollbar-highlight-color",
      "scrollbar-shadow-color",
      "scrollbar-track-color",
      "searchfield-cancel-button",
      "searchfield-decoration",
      "searchfield-results-button",
      "searchfield-results-decoration",
      "shape-inside",
      "zoom"
    ], Y = p(j), re = [
      "font-display",
      "font-family",
      "src",
      "unicode-range",
      "font-variant",
      "font-feature-settings",
      "font-stretch",
      "font-weight",
      "font-style"
    ], P = p(re), F = [
      "additive-symbols",
      "fallback",
      "negative",
      "pad",
      "prefix",
      "range",
      "speak-as",
      "suffix",
      "symbols",
      "system"
    ], N = p(F), H = [
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkgrey",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkslategrey",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "grey",
      "green",
      "greenyellow",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightgrey",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightslategrey",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "magenta",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "rebeccapurple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "slategrey",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen"
    ], K = p(H), $ = [
      "above",
      "absolute",
      "activeborder",
      "additive",
      "activecaption",
      "afar",
      "after-white-space",
      "ahead",
      "alias",
      "all",
      "all-scroll",
      "alphabetic",
      "alternate",
      "always",
      "amharic",
      "amharic-abegede",
      "antialiased",
      "appworkspace",
      "arabic-indic",
      "armenian",
      "asterisks",
      "attr",
      "auto",
      "auto-flow",
      "avoid",
      "avoid-column",
      "avoid-page",
      "avoid-region",
      "axis-pan",
      "background",
      "backwards",
      "baseline",
      "below",
      "bidi-override",
      "binary",
      "bengali",
      "blink",
      "block",
      "block-axis",
      "blur",
      "bold",
      "bolder",
      "border",
      "border-box",
      "both",
      "bottom",
      "break",
      "break-all",
      "break-word",
      "brightness",
      "bullets",
      "button",
      "buttonface",
      "buttonhighlight",
      "buttonshadow",
      "buttontext",
      "calc",
      "cambodian",
      "capitalize",
      "caps-lock-indicator",
      "caption",
      "captiontext",
      "caret",
      "cell",
      "center",
      "checkbox",
      "circle",
      "cjk-decimal",
      "cjk-earthly-branch",
      "cjk-heavenly-stem",
      "cjk-ideographic",
      "clear",
      "clip",
      "close-quote",
      "col-resize",
      "collapse",
      "color",
      "color-burn",
      "color-dodge",
      "column",
      "column-reverse",
      "compact",
      "condensed",
      "conic-gradient",
      "contain",
      "content",
      "contents",
      "content-box",
      "context-menu",
      "continuous",
      "contrast",
      "copy",
      "counter",
      "counters",
      "cover",
      "crop",
      "cross",
      "crosshair",
      "cubic-bezier",
      "currentcolor",
      "cursive",
      "cyclic",
      "darken",
      "dashed",
      "decimal",
      "decimal-leading-zero",
      "default",
      "default-button",
      "dense",
      "destination-atop",
      "destination-in",
      "destination-out",
      "destination-over",
      "devanagari",
      "difference",
      "disc",
      "discard",
      "disclosure-closed",
      "disclosure-open",
      "document",
      "dot-dash",
      "dot-dot-dash",
      "dotted",
      "double",
      "down",
      "drop-shadow",
      "e-resize",
      "ease",
      "ease-in",
      "ease-in-out",
      "ease-out",
      "element",
      "ellipse",
      "ellipsis",
      "embed",
      "end",
      "ethiopic",
      "ethiopic-abegede",
      "ethiopic-abegede-am-et",
      "ethiopic-abegede-gez",
      "ethiopic-abegede-ti-er",
      "ethiopic-abegede-ti-et",
      "ethiopic-halehame-aa-er",
      "ethiopic-halehame-aa-et",
      "ethiopic-halehame-am-et",
      "ethiopic-halehame-gez",
      "ethiopic-halehame-om-et",
      "ethiopic-halehame-sid-et",
      "ethiopic-halehame-so-et",
      "ethiopic-halehame-ti-er",
      "ethiopic-halehame-ti-et",
      "ethiopic-halehame-tig",
      "ethiopic-numeric",
      "ew-resize",
      "exclusion",
      "expanded",
      "extends",
      "extra-condensed",
      "extra-expanded",
      "fantasy",
      "fast",
      "fill",
      "fill-box",
      "fixed",
      "flat",
      "flex",
      "flex-end",
      "flex-start",
      "footnotes",
      "forwards",
      "from",
      "geometricPrecision",
      "georgian",
      "grayscale",
      "graytext",
      "grid",
      "groove",
      "gujarati",
      "gurmukhi",
      "hand",
      "hangul",
      "hangul-consonant",
      "hard-light",
      "hebrew",
      "help",
      "hidden",
      "hide",
      "higher",
      "highlight",
      "highlighttext",
      "hiragana",
      "hiragana-iroha",
      "horizontal",
      "hsl",
      "hsla",
      "hue",
      "hue-rotate",
      "icon",
      "ignore",
      "inactiveborder",
      "inactivecaption",
      "inactivecaptiontext",
      "infinite",
      "infobackground",
      "infotext",
      "inherit",
      "initial",
      "inline",
      "inline-axis",
      "inline-block",
      "inline-flex",
      "inline-grid",
      "inline-table",
      "inset",
      "inside",
      "intrinsic",
      "invert",
      "italic",
      "japanese-formal",
      "japanese-informal",
      "justify",
      "kannada",
      "katakana",
      "katakana-iroha",
      "keep-all",
      "khmer",
      "korean-hangul-formal",
      "korean-hanja-formal",
      "korean-hanja-informal",
      "landscape",
      "lao",
      "large",
      "larger",
      "left",
      "level",
      "lighter",
      "lighten",
      "line-through",
      "linear",
      "linear-gradient",
      "lines",
      "list-item",
      "listbox",
      "listitem",
      "local",
      "logical",
      "loud",
      "lower",
      "lower-alpha",
      "lower-armenian",
      "lower-greek",
      "lower-hexadecimal",
      "lower-latin",
      "lower-norwegian",
      "lower-roman",
      "lowercase",
      "ltr",
      "luminosity",
      "malayalam",
      "manipulation",
      "match",
      "matrix",
      "matrix3d",
      "media-play-button",
      "media-slider",
      "media-sliderthumb",
      "media-volume-slider",
      "media-volume-sliderthumb",
      "medium",
      "menu",
      "menulist",
      "menulist-button",
      "menutext",
      "message-box",
      "middle",
      "min-intrinsic",
      "mix",
      "mongolian",
      "monospace",
      "move",
      "multiple",
      "multiple_mask_images",
      "multiply",
      "myanmar",
      "n-resize",
      "narrower",
      "ne-resize",
      "nesw-resize",
      "no-close-quote",
      "no-drop",
      "no-open-quote",
      "no-repeat",
      "none",
      "normal",
      "not-allowed",
      "nowrap",
      "ns-resize",
      "numbers",
      "numeric",
      "nw-resize",
      "nwse-resize",
      "oblique",
      "octal",
      "opacity",
      "open-quote",
      "optimizeLegibility",
      "optimizeSpeed",
      "oriya",
      "oromo",
      "outset",
      "outside",
      "outside-shape",
      "overlay",
      "overline",
      "padding",
      "padding-box",
      "painted",
      "page",
      "paused",
      "persian",
      "perspective",
      "pinch-zoom",
      "plus-darker",
      "plus-lighter",
      "pointer",
      "polygon",
      "portrait",
      "pre",
      "pre-line",
      "pre-wrap",
      "preserve-3d",
      "progress",
      "push-button",
      "radial-gradient",
      "radio",
      "read-only",
      "read-write",
      "read-write-plaintext-only",
      "rectangle",
      "region",
      "relative",
      "repeat",
      "repeating-linear-gradient",
      "repeating-radial-gradient",
      "repeating-conic-gradient",
      "repeat-x",
      "repeat-y",
      "reset",
      "reverse",
      "rgb",
      "rgba",
      "ridge",
      "right",
      "rotate",
      "rotate3d",
      "rotateX",
      "rotateY",
      "rotateZ",
      "round",
      "row",
      "row-resize",
      "row-reverse",
      "rtl",
      "run-in",
      "running",
      "s-resize",
      "sans-serif",
      "saturate",
      "saturation",
      "scale",
      "scale3d",
      "scaleX",
      "scaleY",
      "scaleZ",
      "screen",
      "scroll",
      "scrollbar",
      "scroll-position",
      "se-resize",
      "searchfield",
      "searchfield-cancel-button",
      "searchfield-decoration",
      "searchfield-results-button",
      "searchfield-results-decoration",
      "self-start",
      "self-end",
      "semi-condensed",
      "semi-expanded",
      "separate",
      "sepia",
      "serif",
      "show",
      "sidama",
      "simp-chinese-formal",
      "simp-chinese-informal",
      "single",
      "skew",
      "skewX",
      "skewY",
      "skip-white-space",
      "slide",
      "slider-horizontal",
      "slider-vertical",
      "sliderthumb-horizontal",
      "sliderthumb-vertical",
      "slow",
      "small",
      "small-caps",
      "small-caption",
      "smaller",
      "soft-light",
      "solid",
      "somali",
      "source-atop",
      "source-in",
      "source-out",
      "source-over",
      "space",
      "space-around",
      "space-between",
      "space-evenly",
      "spell-out",
      "square",
      "square-button",
      "start",
      "static",
      "status-bar",
      "stretch",
      "stroke",
      "stroke-box",
      "sub",
      "subpixel-antialiased",
      "svg_masks",
      "super",
      "sw-resize",
      "symbolic",
      "symbols",
      "system-ui",
      "table",
      "table-caption",
      "table-cell",
      "table-column",
      "table-column-group",
      "table-footer-group",
      "table-header-group",
      "table-row",
      "table-row-group",
      "tamil",
      "telugu",
      "text",
      "text-bottom",
      "text-top",
      "textarea",
      "textfield",
      "thai",
      "thick",
      "thin",
      "threeddarkshadow",
      "threedface",
      "threedhighlight",
      "threedlightshadow",
      "threedshadow",
      "tibetan",
      "tigre",
      "tigrinya-er",
      "tigrinya-er-abegede",
      "tigrinya-et",
      "tigrinya-et-abegede",
      "to",
      "top",
      "trad-chinese-formal",
      "trad-chinese-informal",
      "transform",
      "translate",
      "translate3d",
      "translateX",
      "translateY",
      "translateZ",
      "transparent",
      "ultra-condensed",
      "ultra-expanded",
      "underline",
      "unidirectional-pan",
      "unset",
      "up",
      "upper-alpha",
      "upper-armenian",
      "upper-greek",
      "upper-hexadecimal",
      "upper-latin",
      "upper-norwegian",
      "upper-roman",
      "uppercase",
      "urdu",
      "url",
      "var",
      "vertical",
      "vertical-text",
      "view-box",
      "visible",
      "visibleFill",
      "visiblePainted",
      "visibleStroke",
      "visual",
      "w-resize",
      "wait",
      "wave",
      "wider",
      "window",
      "windowframe",
      "windowtext",
      "words",
      "wrap",
      "wrap-reverse",
      "x-large",
      "x-small",
      "xor",
      "xx-large",
      "xx-small"
    ], le = p($), G = d.concat(x).concat(S).concat(w).concat(D).concat(j).concat(H).concat($);
    a.registerHelper("hintWords", "css", G);
    function pe(ie, ue) {
      for (var Ae = !1, q; (q = ie.next()) != null; ) {
        if (Ae && q == "/") {
          ue.tokenize = null;
          break;
        }
        Ae = q == "*";
      }
      return ["comment", "comment"];
    }
    a.defineMIME("text/css", {
      documentTypes: m,
      mediaTypes: k,
      mediaFeatures: T,
      mediaValueKeywords: O,
      propertyKeywords: z,
      nonStandardPropertyKeywords: Y,
      fontProperties: P,
      counterDescriptors: N,
      colorKeywords: K,
      valueKeywords: le,
      tokenHooks: {
        "/": function(ie, ue) {
          return ie.eat("*") ? (ue.tokenize = pe, pe(ie, ue)) : !1;
        }
      },
      name: "css"
    }), a.defineMIME("text/x-scss", {
      mediaTypes: k,
      mediaFeatures: T,
      mediaValueKeywords: O,
      propertyKeywords: z,
      nonStandardPropertyKeywords: Y,
      colorKeywords: K,
      valueKeywords: le,
      fontProperties: P,
      allowNested: !0,
      lineComment: "//",
      tokenHooks: {
        "/": function(ie, ue) {
          return ie.eat("/") ? (ie.skipToEnd(), ["comment", "comment"]) : ie.eat("*") ? (ue.tokenize = pe, pe(ie, ue)) : ["operator", "operator"];
        },
        ":": function(ie) {
          return ie.match(/^\s*\{/, !1) ? [null, null] : !1;
        },
        $: function(ie) {
          return ie.match(/^[\w-]+/), ie.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"];
        },
        "#": function(ie) {
          return ie.eat("{") ? [null, "interpolation"] : !1;
        }
      },
      name: "css",
      helperType: "scss"
    }), a.defineMIME("text/x-less", {
      mediaTypes: k,
      mediaFeatures: T,
      mediaValueKeywords: O,
      propertyKeywords: z,
      nonStandardPropertyKeywords: Y,
      colorKeywords: K,
      valueKeywords: le,
      fontProperties: P,
      allowNested: !0,
      lineComment: "//",
      tokenHooks: {
        "/": function(ie, ue) {
          return ie.eat("/") ? (ie.skipToEnd(), ["comment", "comment"]) : ie.eat("*") ? (ue.tokenize = pe, pe(ie, ue)) : ["operator", "operator"];
        },
        "@": function(ie) {
          return ie.eat("{") ? [null, "interpolation"] : ie.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, !1) ? !1 : (ie.eatWhile(/[\w\\\-]/), ie.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]);
        },
        "&": function() {
          return ["atom", "atom"];
        }
      },
      name: "css",
      helperType: "less"
    }), a.defineMIME("text/x-gss", {
      documentTypes: m,
      mediaTypes: k,
      mediaFeatures: T,
      propertyKeywords: z,
      nonStandardPropertyKeywords: Y,
      fontProperties: P,
      counterDescriptors: N,
      colorKeywords: K,
      valueKeywords: le,
      supportsAtComponent: !0,
      tokenHooks: {
        "/": function(ie, ue) {
          return ie.eat("*") ? (ue.tokenize = pe, pe(ie, ue)) : !1;
        }
      },
      name: "css",
      helperType: "gss"
    });
  });
})();
(function(s, f) {
  (function(a) {
    a(Bt(), yh.exports, pu(), xh.exports);
  })(function(a) {
    var p = {
      script: [
        ["lang", /(javascript|babel)/i, "javascript"],
        ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
        ["type", /./, "text/plain"],
        [null, null, "javascript"]
      ],
      style: [
        ["lang", /^css$/i, "css"],
        ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
        ["type", /./, "text/plain"],
        [null, null, "css"]
      ]
    };
    function d(O, D, z) {
      var j = O.current(), Y = j.search(D);
      return Y > -1 ? O.backUp(j.length - Y) : j.match(/<\/?$/) && (O.backUp(j.length), O.match(D, !1) || O.match(j)), z;
    }
    var m = {};
    function x(O) {
      var D = m[O];
      return D || (m[O] = new RegExp("\\s+" + O + `\\s*=\\s*('|")?([^'"]+)('|")?\\s*`));
    }
    function k(O, D) {
      var z = O.match(x(D));
      return z ? /^\s*(.*?)\s*$/.exec(z[2])[1] : "";
    }
    function S(O, D) {
      return new RegExp((D ? "^" : "") + "</\\s*" + O + "\\s*>", "i");
    }
    function T(O, D) {
      for (var z in O)
        for (var j = D[z] || (D[z] = []), Y = O[z], re = Y.length - 1; re >= 0; re--)
          j.unshift(Y[re]);
    }
    function w(O, D) {
      for (var z = 0; z < O.length; z++) {
        var j = O[z];
        if (!j[0] || j[1].test(k(D, j[0])))
          return j[2];
      }
    }
    a.defineMode("htmlmixed", function(O, D) {
      var z = a.getMode(O, {
        name: "xml",
        htmlMode: !0,
        multilineTagIndentFactor: D.multilineTagIndentFactor,
        multilineTagIndentPastTag: D.multilineTagIndentPastTag,
        allowMissingTagName: D.allowMissingTagName
      }), j = {}, Y = D && D.tags, re = D && D.scriptTypes;
      if (T(p, j), Y && T(Y, j), re)
        for (var P = re.length - 1; P >= 0; P--)
          j.script.unshift(["type", re[P].matches, re[P].mode]);
      function F(N, H) {
        var K = z.token(N, H.htmlState), $ = /\btag\b/.test(K), le;
        if ($ && !/[<>\s\/]/.test(N.current()) && (le = H.htmlState.tagName && H.htmlState.tagName.toLowerCase()) && j.hasOwnProperty(le))
          H.inTag = le + " ";
        else if (H.inTag && $ && />$/.test(N.current())) {
          var G = /^([\S]+) (.*)/.exec(H.inTag);
          H.inTag = null;
          var pe = N.current() == ">" && w(j[G[1]], G[2]), ie = a.getMode(O, pe), ue = S(G[1], !0), Ae = S(G[1], !1);
          H.token = function(q, J) {
            return q.match(ue, !1) ? (J.token = F, J.localState = J.localMode = null, null) : d(q, Ae, J.localMode.token(q, J.localState));
          }, H.localMode = ie, H.localState = a.startState(ie, z.indent(H.htmlState, "", ""));
        } else
          H.inTag && (H.inTag += N.current(), N.eol() && (H.inTag += " "));
        return K;
      }
      return {
        startState: function() {
          var N = a.startState(z);
          return { token: F, inTag: null, localMode: null, localState: null, htmlState: N };
        },
        copyState: function(N) {
          var H;
          return N.localState && (H = a.copyState(N.localMode, N.localState)), {
            token: N.token,
            inTag: N.inTag,
            localMode: N.localMode,
            localState: H,
            htmlState: a.copyState(z, N.htmlState)
          };
        },
        token: function(N, H) {
          return H.token(N, H);
        },
        indent: function(N, H, K) {
          return !N.localMode || /^\s*<\//.test(H) ? z.indent(N.htmlState, H, K) : N.localMode.indent ? N.localMode.indent(N.localState, H, K) : a.Pass;
        },
        innerMode: function(N) {
          return { state: N.localState || N.htmlState, mode: N.localMode || z };
        }
      };
    }, "xml", "javascript", "css"), a.defineMIME("text/html", "htmlmixed");
  });
})();
Ft.defineMode(
  "markdown",
  function(s, f) {
    var a = Ft.getMode(s, "text/html"), p = a.name == "null";
    function d(A) {
      if (Ft.findModeByName) {
        var v = Ft.findModeByName(A);
        v && (A = v.mime || v.mimes[0]);
      }
      var ae = Ft.getMode(s, A);
      return ae.name == "null" ? null : ae;
    }
    f.highlightFormatting === void 0 && (f.highlightFormatting = !1), f.maxBlockquoteDepth === void 0 && (f.maxBlockquoteDepth = 0), f.taskLists === void 0 && (f.taskLists = !1), f.strikethrough === void 0 && (f.strikethrough = !1), f.emoji === void 0 && (f.emoji = !1), f.fencedCodeBlockHighlighting === void 0 && (f.fencedCodeBlockHighlighting = !0), f.fencedCodeBlockDefaultMode === void 0 && (f.fencedCodeBlockDefaultMode = "text/plain"), f.xml === void 0 && (f.xml = !0), f.tokenTypeOverrides === void 0 && (f.tokenTypeOverrides = {});
    var m = {
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
    for (var x in m)
      m.hasOwnProperty(x) && f.tokenTypeOverrides[x] && (m[x] = f.tokenTypeOverrides[x]);
    var k = /^([*\-_])(?:\s*\1){2,}\s*$/, S = /^(?:[*\-+]|^[0-9]+([.)]))\s+/, T = /^\[(x| )\](?=\s)/i, w = f.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, O = /^ {0,3}(?:\={1,}|-{2,})\s*$/, D = /^[^#!\[\]*_\\<>` "'(~:]+/, z = /^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/, j = /^\s*\[[^\]]+?\]:.*$/, Y = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/, re = "    ";
    function P(A, v, ae) {
      return v.f = v.inline = ae, ae(A, v);
    }
    function F(A, v, ae) {
      return v.f = v.block = ae, ae(A, v);
    }
    function N(A) {
      return !A || !/\S/.test(A.string);
    }
    function H(A) {
      if (A.linkTitle = !1, A.linkHref = !1, A.linkText = !1, A.em = !1, A.strong = !1, A.strikethrough = !1, A.quote = 0, A.indentedCode = !1, A.f == $) {
        var v = p;
        if (!v) {
          var ae = Ft.innerMode(a, A.htmlState);
          v = ae.mode.name == "xml" && ae.state.tagStart === null && !ae.state.context && ae.state.tokenize.isInText;
        }
        v && (A.f = ie, A.block = K, A.htmlState = null);
      }
      return A.trailingSpace = 0, A.trailingSpaceNewLine = !1, A.prevLine = A.thisLine, A.thisLine = { stream: null }, null;
    }
    function K(A, v) {
      var ae = A.column() === v.indentation, Me = N(v.prevLine.stream), ge = v.indentedCode, je = v.prevLine.hr, Pe = v.list !== !1, me = (v.listStack[v.listStack.length - 1] || 0) + 3;
      v.indentedCode = !1;
      var fe = v.indentation;
      if (v.indentationDiff === null && (v.indentationDiff = v.indentation, Pe)) {
        for (v.list = null; fe < v.listStack[v.listStack.length - 1]; )
          v.listStack.pop(), v.listStack.length ? v.indentation = v.listStack[v.listStack.length - 1] : v.list = !1;
        v.list !== !1 && (v.indentationDiff = fe - v.listStack[v.listStack.length - 1]);
      }
      var be = !Me && !je && !v.prevLine.header && (!Pe || !ge) && !v.prevLine.fencedCodeEnd, de = (v.list === !1 || je || Me) && v.indentation <= me && A.match(k), xe = null;
      if (v.indentationDiff >= 4 && (ge || v.prevLine.fencedCodeEnd || v.prevLine.header || Me))
        return A.skipToEnd(), v.indentedCode = !0, m.code;
      if (A.eatSpace())
        return null;
      if (ae && v.indentation <= me && (xe = A.match(w)) && xe[1].length <= 6)
        return v.quote = 0, v.header = xe[1].length, v.thisLine.header = !0, f.highlightFormatting && (v.formatting = "header"), v.f = v.inline, G(v);
      if (v.indentation <= me && A.eat(">"))
        return (["i", "!", "@", "y", "x"].includes(A.string[1]) && A.string[2] === " " || A.string[1] === " ") && (v.quote = ae ? 1 : v.quote + 1), f.highlightFormatting && (v.formatting = "quote"), A.eatSpace(), G(v);
      if (!de && !v.setext && ae && v.indentation <= me && (xe = A.match(S))) {
        var we = xe[1] ? "ol" : "ul";
        return v.indentation = fe + A.current().length, v.list = !0, v.quote = 0, v.listStack.push(v.indentation), v.em = !1, v.strong = !1, v.code = !1, v.strikethrough = !1, f.taskLists && A.match(T, !1) && (v.taskList = !0), v.f = v.inline, f.highlightFormatting && (v.formatting = ["list", "list-" + we]), G(v);
      } else {
        if (ae && v.indentation <= me && (xe = A.match(z, !0)))
          return v.quote = 0, v.fencedEndRE = new RegExp(xe[1] + "+ *$"), v.localMode = f.fencedCodeBlockHighlighting && d(xe[2] || f.fencedCodeBlockDefaultMode), v.localMode && (v.localState = Ft.startState(v.localMode)), v.f = v.block = le, f.highlightFormatting && (v.formatting = "code-block"), v.code = -1, G(v);
        if (v.setext || (!be || !Pe) && !v.quote && v.list === !1 && !v.code && !de && !j.test(A.string) && (xe = A.lookAhead(1)) && (xe = xe.match(O)))
          return v.setext ? (v.header = v.setext, v.setext = 0, A.skipToEnd(), f.highlightFormatting && (v.formatting = "header")) : (v.header = xe[0].charAt(0) == "=" ? 1 : 2, v.setext = v.header), v.thisLine.header = !0, v.f = v.inline, G(v);
        if (de)
          return A.skipToEnd(), v.hr = !0, v.thisLine.hr = !0, m.hr;
        if (A.peek() === "[")
          return P(A, v, y);
      }
      return P(A, v, v.inline);
    }
    function $(A, v) {
      var ae = a.token(A, v.htmlState);
      if (!p) {
        var Me = Ft.innerMode(a, v.htmlState);
        (Me.mode.name == "xml" && Me.state.tagStart === null && !Me.state.context && Me.state.tokenize.isInText || v.md_inside && A.current().indexOf(">") > -1) && (v.f = ie, v.block = K, v.htmlState = null);
      }
      return ae;
    }
    function le(A, v) {
      var ae = v.listStack[v.listStack.length - 1] || 0, Me = v.indentation < ae, ge = ae + 3;
      if (v.fencedEndRE && v.indentation <= ge && (Me || A.match(v.fencedEndRE))) {
        f.highlightFormatting && (v.formatting = "code-block");
        var je;
        return Me || (je = G(v)), v.localMode = v.localState = null, v.block = K, v.f = ie, v.fencedEndRE = null, v.code = 0, v.thisLine.fencedCodeEnd = !0, Me ? F(A, v, v.block) : je;
      } else
        return v.localMode ? v.localMode.token(A, v.localState) : (A.skipToEnd(), m.code);
    }
    function G(A) {
      var v = [];
      if (A.formatting) {
        v.push(m.formatting), typeof A.formatting == "string" && (A.formatting = [A.formatting]);
        for (var ae = 0; ae < A.formatting.length; ae++)
          v.push(m.formatting + "-" + A.formatting[ae]), A.formatting[ae] === "header" && v.push(
            m.formatting + "-" + A.formatting[ae] + "-" + A.header
          ), A.formatting[ae] === "quote" && (!f.maxBlockquoteDepth || f.maxBlockquoteDepth >= A.quote ? v.push(
            m.formatting + "-" + A.formatting[ae] + "-" + A.quote
          ) : v.push("error"));
      }
      if (A.taskOpen)
        return v.push("meta"), v.length ? v.join(" ") : null;
      if (A.taskClosed)
        return v.push("property"), v.length ? v.join(" ") : null;
      if (A.linkHref ? v.push(m.linkHref, "url") : (A.strong && v.push(m.strong), A.em && v.push(m.em), A.strikethrough && v.push(m.strikethrough), A.emoji && v.push(m.emoji), A.linkText && v.push(m.linkText), A.code && v.push(m.code), A.image && v.push(m.image), A.imageAltText && v.push(m.imageAltText, "link"), A.imageMarker && v.push(m.imageMarker)), A.header && v.push(m.header, m.header + "-" + A.header), A.quote && (v.push(m.quote), !f.maxBlockquoteDepth || f.maxBlockquoteDepth >= A.quote ? v.push(m.quote + "-" + A.quote) : v.push(m.quote + "-" + f.maxBlockquoteDepth)), A.list !== !1) {
        var Me = (A.listStack.length - 1) % 3;
        Me ? Me === 1 ? v.push(m.list2) : v.push(m.list3) : v.push(m.list1);
      }
      return A.trailingSpaceNewLine ? v.push("trailing-space-new-line") : A.trailingSpace && v.push("trailing-space-" + (A.trailingSpace % 2 ? "a" : "b")), v.length ? v.join(" ") : null;
    }
    function pe(A, v) {
      if (A.match(D, !0))
        return G(v);
    }
    function ie(A, v) {
      var ae = v.text(A, v);
      if (typeof ae < "u")
        return ae;
      if (v.list)
        return v.list = null, G(v);
      if (v.taskList) {
        var Me = A.match(T, !0)[1] === " ";
        return Me ? v.taskOpen = !0 : v.taskClosed = !0, f.highlightFormatting && (v.formatting = "task"), v.taskList = !1, G(v);
      }
      if (v.taskOpen = !1, v.taskClosed = !1, v.header && A.match(/^#+$/, !0))
        return f.highlightFormatting && (v.formatting = "header"), G(v);
      var ge = A.next();
      if (v.linkTitle) {
        v.linkTitle = !1;
        var je = ge;
        ge === "(" && (je = ")"), je = (je + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1");
        var Pe = "^\\s*(?:[^" + je + "\\\\]+|\\\\\\\\|\\\\.)" + je;
        if (A.match(new RegExp(Pe), !0))
          return m.linkHref;
      }
      if (ge === "`") {
        var me = v.formatting;
        f.highlightFormatting && (v.formatting = "code"), A.eatWhile("`");
        var fe = A.current().length;
        if (v.code == 0 && (!v.quote || fe == 1))
          return v.code = fe, G(v);
        if (fe == v.code) {
          var be = G(v);
          return v.code = 0, be;
        } else
          return v.formatting = me, G(v);
      } else if (v.code)
        return G(v);
      if (ge === "\\" && (A.next(), f.highlightFormatting)) {
        var de = G(v), xe = m.formatting + "-escape";
        return de ? de + " " + xe : xe;
      }
      if (ge === "!" && A.match(/\[[^\]]*\] ?(?:\(|\[)/, !1))
        return v.imageMarker = !0, v.image = !0, f.highlightFormatting && (v.formatting = "image"), G(v);
      if (ge === "[" && v.imageMarker && A.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1))
        return v.imageMarker = !1, v.imageAltText = !0, f.highlightFormatting && (v.formatting = "image"), G(v);
      if (ge === "]" && v.imageAltText) {
        f.highlightFormatting && (v.formatting = "image");
        var de = G(v);
        return v.imageAltText = !1, v.image = !1, v.inline = v.f = Ae, de;
      }
      if (ge === "[" && !v.image)
        return v.linkText && A.match(/^.*?\]/) || (v.linkText = !0, f.highlightFormatting && (v.formatting = "link")), G(v);
      if (ge === "]" && v.linkText) {
        f.highlightFormatting && (v.formatting = "link");
        var de = G(v);
        return v.linkText = !1, v.inline = v.f = A.match(/\(.*?\)| ?\[.*?\]/, !1) ? Ae : ie, de;
      }
      if (ge === "<" && A.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
        v.f = v.inline = ue, f.highlightFormatting && (v.formatting = "link");
        var de = G(v);
        return de ? de += " " : de = "", de + m.linkInline;
      }
      if (ge === "<" && A.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
        v.f = v.inline = ue, f.highlightFormatting && (v.formatting = "link");
        var de = G(v);
        return de ? de += " " : de = "", de + m.linkEmail;
      }
      if (f.xml && ge === "<" && A.match(
        /^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
        !1
      )) {
        var we = A.string.indexOf(">", A.pos);
        if (we != -1) {
          var Be = A.string.substring(A.start, we);
          /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(Be) && (v.md_inside = !0);
        }
        return A.backUp(1), v.htmlState = Ft.startState(a), F(A, v, $);
      }
      if (f.xml && ge === "<" && A.match(/^\/\w*?>/))
        return v.md_inside = !1, "tag";
      if (ge === "*" || ge === "_") {
        for (var wt = 1, st = A.pos == 1 ? " " : A.string.charAt(A.pos - 2); wt < 3 && A.eat(ge); )
          wt++;
        var Je = A.peek() || " ", Fe = !/\s/.test(Je) && (!Y.test(Je) || /\s/.test(st) || Y.test(st)), _e = !/\s/.test(st) && (!Y.test(st) || /\s/.test(Je) || Y.test(Je)), ke = null, Ye = null;
        if (wt % 2 && (!v.em && Fe && (ge === "*" || !_e || Y.test(st)) ? ke = !0 : v.em == ge && _e && (ge === "*" || !Fe || Y.test(Je)) && (ke = !1)), wt > 1 && (!v.strong && Fe && (ge === "*" || !_e || Y.test(st)) ? Ye = !0 : v.strong == ge && _e && (ge === "*" || !Fe || Y.test(Je)) && (Ye = !1)), Ye != null || ke != null) {
          f.highlightFormatting && (v.formatting = ke == null ? "strong" : Ye == null ? "em" : "strong em"), ke === !0 && (v.em = ge), Ye === !0 && (v.strong = ge);
          var be = G(v);
          return ke === !1 && (v.em = !1), Ye === !1 && (v.strong = !1), be;
        }
      } else if (ge === " " && (A.eat("*") || A.eat("_"))) {
        if (A.peek() === " ")
          return G(v);
        A.backUp(1);
      }
      if (f.strikethrough) {
        if (ge === "~" && A.eatWhile(ge)) {
          if (v.strikethrough) {
            f.highlightFormatting && (v.formatting = "strikethrough");
            var be = G(v);
            return v.strikethrough = !1, be;
          } else if (A.match(/^[^\s]/, !1))
            return v.strikethrough = !0, f.highlightFormatting && (v.formatting = "strikethrough"), G(v);
        } else if (ge === " " && A.match("~~", !0)) {
          if (A.peek() === " ")
            return G(v);
          A.backUp(2);
        }
      }
      if (f.emoji && ge === ":" && A.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)) {
        v.emoji = !0, f.highlightFormatting && (v.formatting = "emoji");
        var ir = G(v);
        return v.emoji = !1, ir;
      }
      return ge === " " && (A.match(/^ +$/, !1) ? v.trailingSpace++ : v.trailingSpace && (v.trailingSpaceNewLine = !0)), G(v);
    }
    function ue(A, v) {
      var ae = A.next();
      if (ae === ">") {
        v.f = v.inline = ie, f.highlightFormatting && (v.formatting = "link");
        var Me = G(v);
        return Me ? Me += " " : Me = "", Me + m.linkInline;
      }
      return A.match(/^[^>]+/, !0), m.linkInline;
    }
    function Ae(A, v) {
      if (A.eatSpace())
        return null;
      var ae = A.next();
      return ae === "(" || ae === "[" ? (v.f = v.inline = J(ae === "(" ? ")" : "]"), f.highlightFormatting && (v.formatting = "link-string"), v.linkHref = !0, G(v)) : "error";
    }
    var q = {
      ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
      "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/
    };
    function J(A) {
      return function(v, ae) {
        var Me = v.next();
        if (Me === A) {
          ae.f = ae.inline = ie, f.highlightFormatting && (ae.formatting = "link-string");
          var ge = G(ae);
          return ae.linkHref = !1, ge;
        }
        return v.match(q[A]), ae.linkHref = !0, G(ae);
      };
    }
    function y(A, v) {
      return A.match(/^([^\]\\]|\\.)*\]:/, !1) ? (v.f = V, A.next(), f.highlightFormatting && (v.formatting = "link"), v.linkText = !0, G(v)) : P(A, v, ie);
    }
    function V(A, v) {
      if (A.match("]:", !0)) {
        v.f = v.inline = X, f.highlightFormatting && (v.formatting = "link");
        var ae = G(v);
        return v.linkText = !1, ae;
      }
      return A.match(/^([^\]\\]|\\.)+/, !0), m.linkText;
    }
    function X(A, v) {
      return A.eatSpace() ? null : (A.match(/^[^\s]+/, !0), A.peek() === void 0 ? v.linkTitle = !0 : A.match(
        /^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/,
        !0
      ), v.f = v.inline = ie, m.linkHref + " url");
    }
    var ce = {
      startState: function() {
        return {
          f: K,
          prevLine: { stream: null },
          thisLine: { stream: null },
          block: K,
          htmlState: null,
          indentation: 0,
          inline: ie,
          text: pe,
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
      copyState: function(A) {
        return {
          f: A.f,
          prevLine: A.prevLine,
          thisLine: A.thisLine,
          block: A.block,
          htmlState: A.htmlState && Ft.copyState(a, A.htmlState),
          indentation: A.indentation,
          localMode: A.localMode,
          localState: A.localMode ? Ft.copyState(A.localMode, A.localState) : null,
          inline: A.inline,
          text: A.text,
          formatting: !1,
          linkText: A.linkText,
          linkTitle: A.linkTitle,
          linkHref: A.linkHref,
          code: A.code,
          em: A.em,
          strong: A.strong,
          strikethrough: A.strikethrough,
          emoji: A.emoji,
          header: A.header,
          setext: A.setext,
          hr: A.hr,
          taskList: A.taskList,
          list: A.list,
          listStack: A.listStack.slice(0),
          quote: A.quote,
          indentedCode: A.indentedCode,
          trailingSpace: A.trailingSpace,
          trailingSpaceNewLine: A.trailingSpaceNewLine,
          md_inside: A.md_inside,
          fencedEndRE: A.fencedEndRE
        };
      },
      token: function(A, v) {
        if (v.formatting = !1, A != v.thisLine.stream) {
          if (v.header = 0, v.hr = !1, A.match(/^\s*$/, !0))
            return H(v), null;
          if (v.prevLine = v.thisLine, v.thisLine = { stream: A }, v.taskList = !1, v.trailingSpace = 0, v.trailingSpaceNewLine = !1, !v.localState && (v.f = v.block, v.f != $)) {
            var ae = A.match(/^\s*/, !0)[0].replace(/\t/g, re).length;
            if (v.indentation = ae, v.indentationDiff = null, ae > 0)
              return null;
          }
        }
        return v.f(A, v);
      },
      innerMode: function(A) {
        return A.block == $ ? { state: A.htmlState, mode: a } : A.localState ? { state: A.localState, mode: A.localMode } : { state: A, mode: ce };
      },
      indent: function(A, v, ae) {
        return A.block == $ && a.indent ? a.indent(A.htmlState, v, ae) : A.localState && A.localMode.indent ? A.localMode.indent(A.localState, v, ae) : Ft.Pass;
      },
      blankLine: H,
      getType: G,
      blockCommentStart: "<!--",
      blockCommentEnd: "-->",
      closeBrackets: "()[]{}''\"\"``",
      fold: "markdown"
    };
    return ce;
  },
  "xml"
);
Ft.defineMIME("text/markdown", "markdown");
Ft.defineMIME("text/x-markdown", "markdown");
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    var p = {
      pairs: `()[]{}''""`,
      closeBefore: `)]}'":;>`,
      triples: "",
      explode: "[]{}"
    }, d = a.Pos;
    a.defineOption("autoCloseBrackets", !1, function(P, F, N) {
      N && N != a.Init && (P.removeKeyMap(x), P.state.closeBrackets = null), F && (k(m(F, "pairs")), P.state.closeBrackets = F, P.addKeyMap(x));
    });
    function m(P, F) {
      return F == "pairs" && typeof P == "string" ? P : typeof P == "object" && P[F] != null ? P[F] : p[F];
    }
    var x = { Backspace: w, Enter: O };
    function k(P) {
      for (var F = 0; F < P.length; F++) {
        var N = P.charAt(F), H = "'" + N + "'";
        x[H] || (x[H] = S(N));
      }
    }
    k(p.pairs + "`");
    function S(P) {
      return function(F) {
        return j(F, P);
      };
    }
    function T(P) {
      var F = P.state.closeBrackets;
      if (!F || F.override)
        return F;
      var N = P.getModeAt(P.getCursor());
      return N.closeBrackets || F;
    }
    function w(P) {
      var F = T(P);
      if (!F || P.getOption("disableInput"))
        return a.Pass;
      for (var N = m(F, "pairs"), H = P.listSelections(), K = 0; K < H.length; K++) {
        if (!H[K].empty())
          return a.Pass;
        var $ = Y(P, H[K].head);
        if (!$ || N.indexOf($) % 2 != 0)
          return a.Pass;
      }
      for (var K = H.length - 1; K >= 0; K--) {
        var le = H[K].head;
        P.replaceRange("", d(le.line, le.ch - 1), d(le.line, le.ch + 1), "+delete");
      }
    }
    function O(P) {
      var F = T(P), N = F && m(F, "explode");
      if (!N || P.getOption("disableInput"))
        return a.Pass;
      for (var H = P.listSelections(), K = 0; K < H.length; K++) {
        if (!H[K].empty())
          return a.Pass;
        var $ = Y(P, H[K].head);
        if (!$ || N.indexOf($) % 2 != 0)
          return a.Pass;
      }
      P.operation(function() {
        var le = P.lineSeparator() || `
`;
        P.replaceSelection(le + le, null), D(P, -1), H = P.listSelections();
        for (var G = 0; G < H.length; G++) {
          var pe = H[G].head.line;
          P.indentLine(pe, null, !0), P.indentLine(pe + 1, null, !0);
        }
      });
    }
    function D(P, F) {
      for (var N = [], H = P.listSelections(), K = 0, $ = 0; $ < H.length; $++) {
        var le = H[$];
        le.head == P.getCursor() && (K = $);
        var G = le.head.ch || F > 0 ? { line: le.head.line, ch: le.head.ch + F } : { line: le.head.line - 1 };
        N.push({ anchor: G, head: G });
      }
      P.setSelections(N, K);
    }
    function z(P) {
      var F = a.cmpPos(P.anchor, P.head) > 0;
      return {
        anchor: new d(P.anchor.line, P.anchor.ch + (F ? -1 : 1)),
        head: new d(P.head.line, P.head.ch + (F ? 1 : -1))
      };
    }
    function j(P, F) {
      var N = T(P);
      if (!N || P.getOption("disableInput"))
        return a.Pass;
      var H = m(N, "pairs"), K = H.indexOf(F);
      if (K == -1)
        return a.Pass;
      for (var $ = m(N, "closeBefore"), le = m(N, "triples"), G = H.charAt(K + 1) == F, pe = P.listSelections(), ie = K % 2 == 0, ue, Ae = 0; Ae < pe.length; Ae++) {
        var q = pe[Ae], J = q.head, y, V = P.getRange(J, d(J.line, J.ch + 1));
        if (ie && !q.empty())
          y = "surround";
        else if ((G || !ie) && V == F)
          G && re(P, J) ? y = "both" : le.indexOf(F) >= 0 && P.getRange(J, d(J.line, J.ch + 3)) == F + F + F ? y = "skipThree" : y = "skip";
        else if (G && J.ch > 1 && le.indexOf(F) >= 0 && P.getRange(d(J.line, J.ch - 2), J) == F + F) {
          if (J.ch > 2 && /\bstring/.test(P.getTokenTypeAt(d(J.line, J.ch - 2))))
            return a.Pass;
          y = "addFour";
        } else if (G) {
          var X = J.ch == 0 ? " " : P.getRange(d(J.line, J.ch - 1), J);
          if (!a.isWordChar(V) && X != F && !a.isWordChar(X))
            y = "both";
          else
            return a.Pass;
        } else if (ie && (V.length === 0 || /\s/.test(V) || $.indexOf(V) > -1))
          y = "both";
        else
          return a.Pass;
        if (!ue)
          ue = y;
        else if (ue != y)
          return a.Pass;
      }
      var ce = K % 2 ? H.charAt(K - 1) : F, A = K % 2 ? F : H.charAt(K + 1);
      P.operation(function() {
        if (ue == "skip")
          D(P, 1);
        else if (ue == "skipThree")
          D(P, 3);
        else if (ue == "surround") {
          for (var v = P.getSelections(), ae = 0; ae < v.length; ae++)
            v[ae] = ce + v[ae] + A;
          P.replaceSelections(v, "around"), v = P.listSelections().slice();
          for (var ae = 0; ae < v.length; ae++)
            v[ae] = z(v[ae]);
          P.setSelections(v);
        } else
          ue == "both" ? (P.replaceSelection(ce + A, null), P.triggerElectric(ce + A), D(P, -1)) : ue == "addFour" && (P.replaceSelection(ce + ce + ce + ce, "before"), D(P, 1));
      });
    }
    function Y(P, F) {
      var N = P.getRange(
        d(F.line, F.ch - 1),
        d(F.line, F.ch + 1)
      );
      return N.length == 2 ? N : null;
    }
    function re(P, F) {
      var N = P.getTokenAt(d(F.line, F.ch + 1));
      return /\bstring/.test(N.type) && N.start == F.ch && (F.ch == 0 || !/\bstring/.test(P.getTokenTypeAt(F)));
    }
  });
})();
var Hs = { exports: {} }, zs;
function bh() {
  return zs || (zs = 1, function(s, f) {
    (function(a) {
      a(Bt());
    })(function(a) {
      var p = a.Pos;
      function d(F, N) {
        return F.line - N.line || F.ch - N.ch;
      }
      var m = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", x = m + "-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", k = new RegExp("<(/?)([" + m + "][" + x + "]*)", "g");
      function S(F, N, H, K) {
        this.line = N, this.ch = H, this.cm = F, this.text = F.getLine(N), this.min = K ? Math.max(K.from, F.firstLine()) : F.firstLine(), this.max = K ? Math.min(K.to - 1, F.lastLine()) : F.lastLine();
      }
      function T(F, N) {
        var H = F.cm.getTokenTypeAt(p(F.line, N));
        return H && /\btag\b/.test(H);
      }
      function w(F) {
        if (!(F.line >= F.max))
          return F.ch = 0, F.text = F.cm.getLine(++F.line), !0;
      }
      function O(F) {
        if (!(F.line <= F.min))
          return F.text = F.cm.getLine(--F.line), F.ch = F.text.length, !0;
      }
      function D(F) {
        for (; ; ) {
          var N = F.text.indexOf(">", F.ch);
          if (N == -1) {
            if (w(F))
              continue;
            return;
          }
          if (!T(F, N + 1)) {
            F.ch = N + 1;
            continue;
          }
          var H = F.text.lastIndexOf("/", N), K = H > -1 && !/\S/.test(F.text.slice(H + 1, N));
          return F.ch = N + 1, K ? "selfClose" : "regular";
        }
      }
      function z(F) {
        for (; ; ) {
          var N = F.ch ? F.text.lastIndexOf("<", F.ch - 1) : -1;
          if (N == -1) {
            if (O(F))
              continue;
            return;
          }
          if (!T(F, N + 1)) {
            F.ch = N;
            continue;
          }
          k.lastIndex = N, F.ch = N;
          var H = k.exec(F.text);
          if (H && H.index == N)
            return H;
        }
      }
      function j(F) {
        for (; ; ) {
          k.lastIndex = F.ch;
          var N = k.exec(F.text);
          if (!N) {
            if (w(F))
              continue;
            return;
          }
          if (!T(F, N.index + 1)) {
            F.ch = N.index + 1;
            continue;
          }
          return F.ch = N.index + N[0].length, N;
        }
      }
      function Y(F) {
        for (; ; ) {
          var N = F.ch ? F.text.lastIndexOf(">", F.ch - 1) : -1;
          if (N == -1) {
            if (O(F))
              continue;
            return;
          }
          if (!T(F, N + 1)) {
            F.ch = N;
            continue;
          }
          var H = F.text.lastIndexOf("/", N), K = H > -1 && !/\S/.test(F.text.slice(H + 1, N));
          return F.ch = N + 1, K ? "selfClose" : "regular";
        }
      }
      function re(F, N) {
        for (var H = []; ; ) {
          var K = j(F), $, le = F.line, G = F.ch - (K ? K[0].length : 0);
          if (!K || !($ = D(F)))
            return;
          if ($ != "selfClose")
            if (K[1]) {
              for (var pe = H.length - 1; pe >= 0; --pe)
                if (H[pe] == K[2]) {
                  H.length = pe;
                  break;
                }
              if (pe < 0 && (!N || N == K[2]))
                return {
                  tag: K[2],
                  from: p(le, G),
                  to: p(F.line, F.ch)
                };
            } else
              H.push(K[2]);
        }
      }
      function P(F, N) {
        for (var H = []; ; ) {
          var K = Y(F);
          if (!K)
            return;
          if (K == "selfClose") {
            z(F);
            continue;
          }
          var $ = F.line, le = F.ch, G = z(F);
          if (!G)
            return;
          if (G[1])
            H.push(G[2]);
          else {
            for (var pe = H.length - 1; pe >= 0; --pe)
              if (H[pe] == G[2]) {
                H.length = pe;
                break;
              }
            if (pe < 0 && (!N || N == G[2]))
              return {
                tag: G[2],
                from: p(F.line, F.ch),
                to: p($, le)
              };
          }
        }
      }
      a.registerHelper("fold", "xml", function(F, N) {
        for (var H = new S(F, N.line, 0); ; ) {
          var K = j(H);
          if (!K || H.line != N.line)
            return;
          var $ = D(H);
          if (!$)
            return;
          if (!K[1] && $ != "selfClose") {
            var le = p(H.line, H.ch), G = re(H, K[2]);
            return G && d(G.from, le) > 0 ? { from: le, to: G.from } : null;
          }
        }
      }), a.findMatchingTag = function(F, N, H) {
        var K = new S(F, N.line, N.ch, H);
        if (!(K.text.indexOf(">") == -1 && K.text.indexOf("<") == -1)) {
          var $ = D(K), le = $ && p(K.line, K.ch), G = $ && z(K);
          if (!(!$ || !G || d(K, N) > 0)) {
            var pe = { from: p(K.line, K.ch), to: le, tag: G[2] };
            return $ == "selfClose" ? { open: pe, close: null, at: "open" } : G[1] ? { open: P(K, G[2]), close: pe, at: "close" } : (K = new S(F, le.line, le.ch, H), { open: pe, close: re(K, G[2]), at: "open" });
          }
        }
      }, a.findEnclosingTag = function(F, N, H, K) {
        for (var $ = new S(F, N.line, N.ch, H); ; ) {
          var le = P($, K);
          if (!le)
            break;
          var G = new S(F, N.line, N.ch, H), pe = re(G, le.tag);
          if (pe)
            return { open: le, close: pe };
        }
      }, a.scanForClosingTag = function(F, N, H, K) {
        var $ = new S(F, N.line, N.ch, K ? { from: 0, to: K } : null);
        return re($, H);
      };
    });
  }()), Hs.exports;
}
(function(s, f) {
  (function(a) {
    a(Bt(), bh());
  })(function(a) {
    a.defineOption("autoCloseTags", !1, function(w, O, D) {
      if (D != a.Init && D && w.removeKeyMap("autoCloseTags"), !!O) {
        var z = { name: "autoCloseTags" };
        (typeof O != "object" || O.whenClosing !== !1) && (z["'/'"] = function(j) {
          return k(j);
        }), (typeof O != "object" || O.whenOpening !== !1) && (z["'>'"] = function(j) {
          return m(j);
        }), w.addKeyMap(z);
      }
    });
    var p = [
      "area",
      "base",
      "br",
      "col",
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr"
    ], d = [
      "applet",
      "blockquote",
      "body",
      "button",
      "div",
      "dl",
      "fieldset",
      "form",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "html",
      "iframe",
      "layer",
      "legend",
      "object",
      "ol",
      "p",
      "select",
      "table",
      "ul"
    ];
    function m(w) {
      if (w.getOption("disableInput"))
        return a.Pass;
      for (var O = w.listSelections(), D = [], z = w.getOption("autoCloseTags"), j = 0; j < O.length; j++) {
        if (!O[j].empty())
          return a.Pass;
        var Y = O[j].head, re = w.getTokenAt(Y), P = a.innerMode(w.getMode(), re.state), F = P.state, N = P.mode.xmlCurrentTag && P.mode.xmlCurrentTag(F), H = N && N.name;
        if (!H)
          return a.Pass;
        var K = P.mode.configuration == "html", $ = typeof z == "object" && z.dontCloseTags || K && p, le = typeof z == "object" && z.indentTags || K && d;
        re.end > Y.ch && (H = H.slice(0, H.length - re.end + Y.ch));
        var G = H.toLowerCase();
        if (!H || re.type == "string" && (re.end != Y.ch || !/[\"\']/.test(re.string.charAt(re.string.length - 1)) || re.string.length == 1) || re.type == "tag" && N.close || re.string.indexOf("/") == Y.ch - re.start - 1 || $ && S($, G) > -1 || T(w, P.mode.xmlCurrentContext && P.mode.xmlCurrentContext(F) || [], H, Y, !0))
          return a.Pass;
        var pe = typeof z == "object" && z.emptyTags;
        if (pe && S(pe, H) > -1) {
          D[j] = { text: "/>", newPos: a.Pos(Y.line, Y.ch + 2) };
          continue;
        }
        var ie = le && S(le, G) > -1;
        D[j] = {
          indent: ie,
          text: ">" + (ie ? `

` : "") + "</" + H + ">",
          newPos: ie ? a.Pos(Y.line + 1, 0) : a.Pos(Y.line, Y.ch + 1)
        };
      }
      for (var ue = typeof z == "object" && z.dontIndentOnAutoClose, j = O.length - 1; j >= 0; j--) {
        var Ae = D[j];
        w.replaceRange(Ae.text, O[j].head, O[j].anchor, "+insert");
        var q = w.listSelections().slice(0);
        q[j] = { head: Ae.newPos, anchor: Ae.newPos }, w.setSelections(q), !ue && Ae.indent && (w.indentLine(Ae.newPos.line, null, !0), w.indentLine(Ae.newPos.line + 1, null, !0));
      }
    }
    function x(w, O) {
      for (var D = w.listSelections(), z = [], j = O ? "/" : "</", Y = w.getOption("autoCloseTags"), re = typeof Y == "object" && Y.dontIndentOnSlash, P = 0; P < D.length; P++) {
        if (!D[P].empty())
          return a.Pass;
        var F = D[P].head, N = w.getTokenAt(F), H = a.innerMode(w.getMode(), N.state), K = H.state;
        if (O && (N.type == "string" || N.string.charAt(0) != "<" || N.start != F.ch - 1))
          return a.Pass;
        var $, le = H.mode.name != "xml" && w.getMode().name == "htmlmixed";
        if (le && H.mode.name == "javascript")
          $ = j + "script";
        else if (le && H.mode.name == "css")
          $ = j + "style";
        else {
          var G = H.mode.xmlCurrentContext && H.mode.xmlCurrentContext(K), pe = G.length ? G[G.length - 1] : "";
          if (!G || G.length && T(w, G, pe, F))
            return a.Pass;
          $ = j + pe;
        }
        w.getLine(F.line).charAt(N.end) != ">" && ($ += ">"), z[P] = $;
      }
      if (w.replaceSelections(z), D = w.listSelections(), !re)
        for (var P = 0; P < D.length; P++)
          (P == D.length - 1 || D[P].head.line < D[P + 1].head.line) && w.indentLine(D[P].head.line);
    }
    function k(w) {
      return w.getOption("disableInput") ? a.Pass : x(w, !0);
    }
    a.commands.closeTag = function(w) {
      return x(w);
    };
    function S(w, O) {
      if (w.indexOf)
        return w.indexOf(O);
      for (var D = 0, z = w.length; D < z; ++D)
        if (w[D] == O)
          return D;
      return -1;
    }
    function T(w, O, D, z, j) {
      if (!a.scanForClosingTag)
        return !1;
      var Y = Math.min(w.lastLine() + 1, z.line + 500), re = a.scanForClosingTag(w, z, null, Y);
      if (!re || re.tag != D)
        return !1;
      for (var P = j ? 1 : 0, F = O.length - 1; F >= 0 && O[F] == D; F--)
        ++P;
      z = re.to;
      for (var F = 1; F < P; F++) {
        var N = a.scanForClosingTag(w, z, null, Y);
        if (!N || N.tag != D)
          return !1;
        z = N.to;
      }
      return !0;
    }
  });
})();
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    var p = /MSIE \d/.test(navigator.userAgent) && (document.documentMode == null || document.documentMode < 8), d = a.Pos, m = { "(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<", "<": ">>", ">": "<<" };
    function x(D) {
      return D && D.bracketRegex || /[(){}[\]]/;
    }
    function k(D, z, j) {
      var Y = D.getLineHandle(z.line), re = z.ch - 1, P = j && j.afterCursor;
      P == null && (P = /(^| )cm-fat-cursor($| )/.test(D.getWrapperElement().className));
      var F = x(j), N = !P && re >= 0 && F.test(Y.text.charAt(re)) && m[Y.text.charAt(re)] || F.test(Y.text.charAt(re + 1)) && m[Y.text.charAt(++re)];
      if (!N)
        return null;
      var H = N.charAt(1) == ">" ? 1 : -1;
      if (j && j.strict && H > 0 != (re == z.ch))
        return null;
      var K = D.getTokenTypeAt(d(z.line, re + 1)), $ = S(D, d(z.line, re + (H > 0 ? 1 : 0)), H, K, j);
      return $ == null ? null : {
        from: d(z.line, re),
        to: $ && $.pos,
        match: $ && $.ch == N.charAt(0),
        forward: H > 0
      };
    }
    function S(D, z, j, Y, re) {
      for (var P = re && re.maxScanLineLength || 1e4, F = re && re.maxScanLines || 1e3, N = [], H = x(re), K = j > 0 ? Math.min(z.line + F, D.lastLine() + 1) : Math.max(D.firstLine() - 1, z.line - F), $ = z.line; $ != K; $ += j) {
        var le = D.getLine($);
        if (!!le) {
          var G = j > 0 ? 0 : le.length - 1, pe = j > 0 ? le.length : -1;
          if (!(le.length > P))
            for ($ == z.line && (G = z.ch - (j < 0 ? 1 : 0)); G != pe; G += j) {
              var ie = le.charAt(G);
              if (H.test(ie) && (Y === void 0 || (D.getTokenTypeAt(d($, G + 1)) || "") == (Y || ""))) {
                var ue = m[ie];
                if (ue && ue.charAt(1) == ">" == j > 0)
                  N.push(ie);
                else if (N.length)
                  N.pop();
                else
                  return { pos: d($, G), ch: ie };
              }
            }
        }
      }
      return $ - j == (j > 0 ? D.lastLine() : D.firstLine()) ? !1 : null;
    }
    function T(D, z, j) {
      for (var Y = D.state.matchBrackets.maxHighlightLineLength || 1e3, re = j && j.highlightNonMatching, P = [], F = D.listSelections(), N = 0; N < F.length; N++) {
        var H = F[N].empty() && k(D, F[N].head, j);
        if (H && (H.match || re !== !1) && D.getLine(H.from.line).length <= Y) {
          var K = H.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
          P.push(D.markText(H.from, d(H.from.line, H.from.ch + 1), { className: K })), H.to && D.getLine(H.to.line).length <= Y && P.push(D.markText(H.to, d(H.to.line, H.to.ch + 1), { className: K }));
        }
      }
      if (P.length) {
        p && D.state.focused && D.focus();
        var $ = function() {
          D.operation(function() {
            for (var le = 0; le < P.length; le++)
              P[le].clear();
          });
        };
        if (z)
          setTimeout($, 800);
        else
          return $;
      }
    }
    function w(D) {
      D.operation(function() {
        D.state.matchBrackets.currentlyHighlighted && (D.state.matchBrackets.currentlyHighlighted(), D.state.matchBrackets.currentlyHighlighted = null), D.state.matchBrackets.currentlyHighlighted = T(D, !1, D.state.matchBrackets);
      });
    }
    function O(D) {
      D.state.matchBrackets && D.state.matchBrackets.currentlyHighlighted && (D.state.matchBrackets.currentlyHighlighted(), D.state.matchBrackets.currentlyHighlighted = null);
    }
    a.defineOption("matchBrackets", !1, function(D, z, j) {
      j && j != a.Init && (D.off("cursorActivity", w), D.off("focus", w), D.off("blur", O), O(D)), z && (D.state.matchBrackets = typeof z == "object" ? z : {}, D.on("cursorActivity", w), D.on("focus", w), D.on("blur", O));
    }), a.defineExtension("matchBrackets", function() {
      T(this, !0);
    }), a.defineExtension("findMatchingBracket", function(D, z, j) {
      return (j || typeof z == "boolean") && (j ? (j.strict = z, z = j) : z = z ? { strict: !0 } : null), k(this, D, z);
    }), a.defineExtension("scanForBracket", function(D, z, j, Y) {
      return S(this, D, z, j, Y);
    });
  });
})();
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    a.defineOption("placeholder", "", function(T, w, O) {
      var D = O && O != a.Init;
      if (w && !D)
        T.on("blur", x), T.on("change", k), T.on("swapDoc", k), a.on(T.getInputField(), "compositionupdate", T.state.placeholderCompose = function() {
          m(T);
        }), k(T);
      else if (!w && D) {
        T.off("blur", x), T.off("change", k), T.off("swapDoc", k), a.off(T.getInputField(), "compositionupdate", T.state.placeholderCompose), p(T);
        var z = T.getWrapperElement();
        z.className = z.className.replace(" CodeMirror-empty", "");
      }
      w && !T.hasFocus() && x(T);
    });
    function p(T) {
      T.state.placeholder && (T.state.placeholder.parentNode.removeChild(T.state.placeholder), T.state.placeholder = null);
    }
    function d(T) {
      p(T);
      var w = T.state.placeholder = document.createElement("pre");
      w.style.cssText = "height: 0; overflow: visible", w.style.direction = T.getOption("direction"), w.className = "CodeMirror-placeholder CodeMirror-line-like";
      var O = T.getOption("placeholder");
      typeof O == "string" && (O = document.createTextNode(O)), w.appendChild(O), T.display.lineSpace.insertBefore(w, T.display.lineSpace.firstChild);
    }
    function m(T) {
      setTimeout(function() {
        var w = !1;
        if (T.lineCount() == 1) {
          var O = T.getInputField();
          w = O.nodeName == "TEXTAREA" ? !T.getLine(0).length : !/[^\u200b]/.test(O.querySelector(".CodeMirror-line").textContent);
        }
        w ? d(T) : p(T);
      }, 20);
    }
    function x(T) {
      S(T) && d(T);
    }
    function k(T) {
      var w = T.getWrapperElement(), O = S(T);
      w.className = w.className.replace(" CodeMirror-empty", "") + (O ? " CodeMirror-empty" : ""), O ? d(T) : p(T);
    }
    function S(T) {
      return T.lineCount() === 1 && T.getLine(0) === "";
    }
  });
})();
(function(s, f) {
  (function(a) {
    a(Bt());
  })(function(a) {
    var p = "CodeMirror-activeline", d = "CodeMirror-activeline-background", m = "CodeMirror-activeline-gutter";
    a.defineOption("styleActiveLine", !1, function(w, O, D) {
      var z = D == a.Init ? !1 : D;
      O != z && (z && (w.off("beforeSelectionChange", T), x(w), delete w.state.activeLines), O && (w.state.activeLines = [], S(w, w.listSelections()), w.on("beforeSelectionChange", T)));
    });
    function x(w) {
      for (var O = 0; O < w.state.activeLines.length; O++)
        w.removeLineClass(w.state.activeLines[O], "wrap", p), w.removeLineClass(w.state.activeLines[O], "background", d), w.removeLineClass(w.state.activeLines[O], "gutter", m);
    }
    function k(w, O) {
      if (w.length != O.length)
        return !1;
      for (var D = 0; D < w.length; D++)
        if (w[D] != O[D])
          return !1;
      return !0;
    }
    function S(w, O) {
      for (var D = [], z = 0; z < O.length; z++) {
        var j = O[z], Y = w.getOption("styleActiveLine");
        if (!(typeof Y == "object" && Y.nonEmpty ? j.anchor.line != j.head.line : !j.empty())) {
          var re = w.getLineHandleVisualStart(j.head.line);
          D[D.length - 1] != re && D.push(re);
        }
      }
      k(w.state.activeLines, D) || w.operation(function() {
        x(w);
        for (var P = 0; P < D.length; P++)
          w.addLineClass(D[P], "wrap", p), w.addLineClass(D[P], "background", d), w.addLineClass(D[P], "gutter", m);
        w.state.activeLines = D;
      });
    }
    function T(w, O) {
      S(w, O.ranges);
    }
  });
})();
const wh = "gedi_409d3", kh = "gedi_7503c", Sh = "gedi_8863d", Ch = "gedi_77ff2", Pt = {
  "out-wrapper": "gedi_0cacc",
  dark: wh,
  toolbar: kh,
  "editor-wrapper": "gedi_a19e0",
  "show-preview": "gedi_057f0",
  editor: Sh,
  preview: Ch,
  "preview-content": "gedi_0e920"
};
var Lh = Array.isArray;
const Ws = Lh, Th = "gedi_56241", Ah = "gedi_dc161", Fh = "gedi_1009b", Dh = "gedi_55c98", Xt = {
  "toolbar-wrapper": "gedi_00985",
  "toolbar-item-wrapper": "gedi_2d5fe",
  "toolbar-item": "gedi_f1fa7",
  tooltip: Th,
  active: Ah,
  disable: Fh,
  vr: Dh
}, Mh = "gedi_e6842", Eh = "gedi_ad0ba", ei = {
  dropdown: Mh,
  open: Eh,
  "dropdown-content": "gedi_8d625"
}, Oh = /* @__PURE__ */ xn("<div><div>");
function _s(s, f, a = !0) {
  if (a)
    s.style.maxHeight = "0", s.classList.remove(ei.open), Rs(s, !1), f.classList.remove(Xt.active);
  else {
    s.style.maxHeight = "";
    const p = s.scrollHeight;
    s.style.maxHeight = "0", s.classList.add(ei.open), setTimeout(() => {
      s.style.maxHeight = `${p}px`;
    }, 10), f.classList.add(Xt.active), Rs(s);
  }
}
function Rs(s, f = !0) {
  const a = s.previousElementSibling;
  a && (a.style.display = f ? "none" : "");
}
function Ih(s) {
  let f;
  const a = (p) => p.classList.contains(ei.open);
  return oi(() => {
    f.style.maxHeight = "0", s.trigger.addEventListener("click", () => {
      _s(f, s.trigger, a(f));
    }), document.addEventListener("click", (p) => {
      const d = p.target;
      s.trigger.contains(d) || _s(f, s.trigger, !0);
    });
  }), (() => {
    const p = Oh(), d = p.firstChild, m = f;
    return typeof m == "function" ? si(m, p) : f = p, Mr(d, () => s.children), Rt((x) => {
      const k = ei.dropdown, S = ei["dropdown-content"];
      return k !== x._v$ && Ot(p, x._v$ = k), S !== x._v$2 && Ot(d, x._v$2 = S), x;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), p;
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
const gu = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), oo = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), ui = Object.freeze({
  ...gu,
  ...oo
}), ml = Object.freeze({
  ...ui,
  body: "",
  hidden: !1
}), Nh = Object.freeze({
  width: null,
  height: null
}), vu = Object.freeze({
  ...Nh,
  ...oo
});
function Ph(s, f = 0) {
  const a = s.replace(/^-?[0-9.]*/, "");
  function p(d) {
    for (; d < 0; )
      d += 4;
    return d % 4;
  }
  if (a === "") {
    const d = parseInt(s);
    return isNaN(d) ? 0 : p(d);
  } else if (a !== s) {
    let d = 0;
    switch (a) {
      case "%":
        d = 25;
        break;
      case "deg":
        d = 90;
    }
    if (d) {
      let m = parseFloat(s.slice(0, s.length - a.length));
      return isNaN(m) ? 0 : (m = m / d, m % 1 === 0 ? p(m) : 0);
    }
  }
  return f;
}
const Bh = /[\s,]+/;
function Hh(s, f) {
  f.split(Bh).forEach((a) => {
    switch (a.trim()) {
      case "horizontal":
        s.hFlip = !0;
        break;
      case "vertical":
        s.vFlip = !0;
        break;
    }
  });
}
const mu = {
  ...vu,
  preserveAspectRatio: ""
};
function js(s) {
  const f = {
    ...mu
  }, a = (p, d) => s.getAttribute(p) || d;
  return f.width = a("width", null), f.height = a("height", null), f.rotate = Ph(a("rotate", "")), Hh(f, a("flip", "")), f.preserveAspectRatio = a("preserveAspectRatio", a("preserveaspectratio", "")), f;
}
function zh(s, f) {
  for (const a in mu)
    if (s[a] !== f[a])
      return !0;
  return !1;
}
const ti = /^[a-z0-9]+(-[a-z0-9]+)*$/, fi = (s, f, a, p = "") => {
  const d = s.split(":");
  if (s.slice(0, 1) === "@") {
    if (d.length < 2 || d.length > 3)
      return null;
    p = d.shift().slice(1);
  }
  if (d.length > 3 || !d.length)
    return null;
  if (d.length > 1) {
    const k = d.pop(), S = d.pop(), T = {
      provider: d.length > 0 ? d[0] : p,
      prefix: S,
      name: k
    };
    return f && !Ji(T) ? null : T;
  }
  const m = d[0], x = m.split("-");
  if (x.length > 1) {
    const k = {
      provider: p,
      prefix: x.shift(),
      name: x.join("-")
    };
    return f && !Ji(k) ? null : k;
  }
  if (a && p === "") {
    const k = {
      provider: p,
      prefix: "",
      name: m
    };
    return f && !Ji(k, a) ? null : k;
  }
  return null;
}, Ji = (s, f) => s ? !!((s.provider === "" || s.provider.match(ti)) && (f && s.prefix === "" || s.prefix.match(ti)) && s.name.match(ti)) : !1;
function Wh(s, f) {
  const a = {};
  !s.hFlip != !f.hFlip && (a.hFlip = !0), !s.vFlip != !f.vFlip && (a.vFlip = !0);
  const p = ((s.rotate || 0) + (f.rotate || 0)) % 4;
  return p && (a.rotate = p), a;
}
function qs(s, f) {
  const a = Wh(s, f);
  for (const p in ml)
    p in oo ? p in s && !(p in a) && (a[p] = oo[p]) : p in f ? a[p] = f[p] : p in s && (a[p] = s[p]);
  return a;
}
function _h(s, f) {
  const a = s.icons, p = s.aliases || /* @__PURE__ */ Object.create(null), d = /* @__PURE__ */ Object.create(null);
  function m(x) {
    if (a[x])
      return d[x] = [];
    if (!(x in d)) {
      d[x] = null;
      const k = p[x] && p[x].parent, S = k && m(k);
      S && (d[x] = [k].concat(S));
    }
    return d[x];
  }
  return (f || Object.keys(a).concat(Object.keys(p))).forEach(m), d;
}
function Rh(s, f, a) {
  const p = s.icons, d = s.aliases || /* @__PURE__ */ Object.create(null);
  let m = {};
  function x(k) {
    m = qs(
      p[k] || d[k],
      m
    );
  }
  return x(f), a.forEach(x), qs(s, m);
}
function yu(s, f) {
  const a = [];
  if (typeof s != "object" || typeof s.icons != "object")
    return a;
  s.not_found instanceof Array && s.not_found.forEach((d) => {
    f(d, null), a.push(d);
  });
  const p = _h(s);
  for (const d in p) {
    const m = p[d];
    m && (f(d, Rh(s, d, m)), a.push(d));
  }
  return a;
}
const jh = {
  provider: "",
  aliases: {},
  not_found: {},
  ...gu
};
function cl(s, f) {
  for (const a in f)
    if (a in s && typeof s[a] != typeof f[a])
      return !1;
  return !0;
}
function xu(s) {
  if (typeof s != "object" || s === null)
    return null;
  const f = s;
  if (typeof f.prefix != "string" || !s.icons || typeof s.icons != "object" || !cl(s, jh))
    return null;
  const a = f.icons;
  for (const d in a) {
    const m = a[d];
    if (!d.match(ti) || typeof m.body != "string" || !cl(
      m,
      ml
    ))
      return null;
  }
  const p = f.aliases || /* @__PURE__ */ Object.create(null);
  for (const d in p) {
    const m = p[d], x = m.parent;
    if (!d.match(ti) || typeof x != "string" || !a[x] && !p[x] || !cl(
      m,
      ml
    ))
      return null;
  }
  return f;
}
const lo = /* @__PURE__ */ Object.create(null);
function qh(s, f) {
  return {
    provider: s,
    prefix: f,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Er(s, f) {
  const a = lo[s] || (lo[s] = /* @__PURE__ */ Object.create(null));
  return a[f] || (a[f] = qh(s, f));
}
function Tl(s, f) {
  return xu(f) ? yu(f, (a, p) => {
    p ? s.icons[a] = p : s.missing.add(a);
  }) : [];
}
function Kh(s, f, a) {
  try {
    if (typeof a.body == "string")
      return s.icons[f] = { ...a }, !0;
  } catch {
  }
  return !1;
}
function Uh(s, f) {
  let a = [];
  return (typeof s == "string" ? [s] : Object.keys(lo)).forEach((d) => {
    (typeof d == "string" && typeof f == "string" ? [f] : Object.keys(lo[d] || {})).forEach((x) => {
      const k = Er(d, x);
      a = a.concat(
        Object.keys(k.icons).map(
          (S) => (d !== "" ? "@" + d + ":" : "") + x + ":" + S
        )
      );
    });
  }), a;
}
let ri = !1;
function bu(s) {
  return typeof s == "boolean" && (ri = s), ri;
}
function ni(s) {
  const f = typeof s == "string" ? fi(s, !0, ri) : s;
  if (f) {
    const a = Er(f.provider, f.prefix), p = f.name;
    return a.icons[p] || (a.missing.has(p) ? null : void 0);
  }
}
function wu(s, f) {
  const a = fi(s, !0, ri);
  if (!a)
    return !1;
  const p = Er(a.provider, a.prefix);
  return Kh(p, a.name, f);
}
function Ks(s, f) {
  if (typeof s != "object")
    return !1;
  if (typeof f != "string" && (f = s.provider || ""), ri && !f && !s.prefix) {
    let d = !1;
    return xu(s) && (s.prefix = "", yu(s, (m, x) => {
      x && wu(m, x) && (d = !0);
    })), d;
  }
  const a = s.prefix;
  if (!Ji({
    provider: f,
    prefix: a,
    name: "a"
  }))
    return !1;
  const p = Er(f, a);
  return !!Tl(p, s);
}
function Gh(s) {
  return !!ni(s);
}
function $h(s) {
  const f = ni(s);
  return f ? {
    ...ui,
    ...f
  } : null;
}
function Xh(s) {
  const f = {
    loaded: [],
    missing: [],
    pending: []
  }, a = /* @__PURE__ */ Object.create(null);
  s.sort((d, m) => d.provider !== m.provider ? d.provider.localeCompare(m.provider) : d.prefix !== m.prefix ? d.prefix.localeCompare(m.prefix) : d.name.localeCompare(m.name));
  let p = {
    provider: "",
    prefix: "",
    name: ""
  };
  return s.forEach((d) => {
    if (p.name === d.name && p.prefix === d.prefix && p.provider === d.provider)
      return;
    p = d;
    const m = d.provider, x = d.prefix, k = d.name, S = a[m] || (a[m] = /* @__PURE__ */ Object.create(null)), T = S[x] || (S[x] = Er(m, x));
    let w;
    k in T.icons ? w = f.loaded : x === "" || T.missing.has(k) ? w = f.missing : w = f.pending;
    const O = {
      provider: m,
      prefix: x,
      name: k
    };
    w.push(O);
  }), f;
}
function ku(s, f) {
  s.forEach((a) => {
    const p = a.loaderCallbacks;
    p && (a.loaderCallbacks = p.filter((d) => d.id !== f));
  });
}
function Yh(s) {
  s.pendingCallbacksFlag || (s.pendingCallbacksFlag = !0, setTimeout(() => {
    s.pendingCallbacksFlag = !1;
    const f = s.loaderCallbacks ? s.loaderCallbacks.slice(0) : [];
    if (!f.length)
      return;
    let a = !1;
    const p = s.provider, d = s.prefix;
    f.forEach((m) => {
      const x = m.icons, k = x.pending.length;
      x.pending = x.pending.filter((S) => {
        if (S.prefix !== d)
          return !0;
        const T = S.name;
        if (s.icons[T])
          x.loaded.push({
            provider: p,
            prefix: d,
            name: T
          });
        else if (s.missing.has(T))
          x.missing.push({
            provider: p,
            prefix: d,
            name: T
          });
        else
          return a = !0, !0;
        return !1;
      }), x.pending.length !== k && (a || ku([s], m.id), m.callback(
        x.loaded.slice(0),
        x.missing.slice(0),
        x.pending.slice(0),
        m.abort
      ));
    });
  }));
}
let Zh = 0;
function Qh(s, f, a) {
  const p = Zh++, d = ku.bind(null, a, p);
  if (!f.pending.length)
    return d;
  const m = {
    id: p,
    icons: f,
    callback: s,
    abort: d
  };
  return a.forEach((x) => {
    (x.loaderCallbacks || (x.loaderCallbacks = [])).push(m);
  }), d;
}
const yl = /* @__PURE__ */ Object.create(null);
function Us(s, f) {
  yl[s] = f;
}
function xl(s) {
  return yl[s] || yl[""];
}
function Jh(s, f = !0, a = !1) {
  const p = [];
  return s.forEach((d) => {
    const m = typeof d == "string" ? fi(d, f, a) : d;
    m && p.push(m);
  }), p;
}
var Vh = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function ed(s, f, a, p) {
  const d = s.resources.length, m = s.random ? Math.floor(Math.random() * d) : s.index;
  let x;
  if (s.random) {
    let $ = s.resources.slice(0);
    for (x = []; $.length > 1; ) {
      const le = Math.floor(Math.random() * $.length);
      x.push($[le]), $ = $.slice(0, le).concat($.slice(le + 1));
    }
    x = x.concat($);
  } else
    x = s.resources.slice(m).concat(s.resources.slice(0, m));
  const k = Date.now();
  let S = "pending", T = 0, w, O = null, D = [], z = [];
  typeof p == "function" && z.push(p);
  function j() {
    O && (clearTimeout(O), O = null);
  }
  function Y() {
    S === "pending" && (S = "aborted"), j(), D.forEach(($) => {
      $.status === "pending" && ($.status = "aborted");
    }), D = [];
  }
  function re($, le) {
    le && (z = []), typeof $ == "function" && z.push($);
  }
  function P() {
    return {
      startTime: k,
      payload: f,
      status: S,
      queriesSent: T,
      queriesPending: D.length,
      subscribe: re,
      abort: Y
    };
  }
  function F() {
    S = "failed", z.forEach(($) => {
      $(void 0, w);
    });
  }
  function N() {
    D.forEach(($) => {
      $.status === "pending" && ($.status = "aborted");
    }), D = [];
  }
  function H($, le, G) {
    const pe = le !== "success";
    switch (D = D.filter((ie) => ie !== $), S) {
      case "pending":
        break;
      case "failed":
        if (pe || !s.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (le === "abort") {
      w = G, F();
      return;
    }
    if (pe) {
      w = G, D.length || (x.length ? K() : F());
      return;
    }
    if (j(), N(), !s.random) {
      const ie = s.resources.indexOf($.resource);
      ie !== -1 && ie !== s.index && (s.index = ie);
    }
    S = "completed", z.forEach((ie) => {
      ie(G);
    });
  }
  function K() {
    if (S !== "pending")
      return;
    j();
    const $ = x.shift();
    if ($ === void 0) {
      if (D.length) {
        O = setTimeout(() => {
          j(), S === "pending" && (N(), F());
        }, s.timeout);
        return;
      }
      F();
      return;
    }
    const le = {
      status: "pending",
      resource: $,
      callback: (G, pe) => {
        H(le, G, pe);
      }
    };
    D.push(le), T++, O = setTimeout(K, s.rotate), a($, f, le.callback);
  }
  return setTimeout(K), P;
}
function Su(s) {
  const f = {
    ...Vh,
    ...s
  };
  let a = [];
  function p() {
    a = a.filter((k) => k().status === "pending");
  }
  function d(k, S, T) {
    const w = ed(
      f,
      k,
      S,
      (O, D) => {
        p(), T && T(O, D);
      }
    );
    return a.push(w), w;
  }
  function m(k) {
    return a.find((S) => k(S)) || null;
  }
  return {
    query: d,
    find: m,
    setIndex: (k) => {
      f.index = k;
    },
    getIndex: () => f.index,
    cleanup: p
  };
}
function Al(s) {
  let f;
  if (typeof s.resources == "string")
    f = [s.resources];
  else if (f = s.resources, !(f instanceof Array) || !f.length)
    return null;
  return {
    resources: f,
    path: s.path || "/",
    maxURL: s.maxURL || 500,
    rotate: s.rotate || 750,
    timeout: s.timeout || 5e3,
    random: s.random === !0,
    index: s.index || 0,
    dataAfterTimeout: s.dataAfterTimeout !== !1
  };
}
const fo = /* @__PURE__ */ Object.create(null), Vn = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], Vi = [];
for (; Vn.length > 0; )
  Vn.length === 1 || Math.random() > 0.5 ? Vi.push(Vn.shift()) : Vi.push(Vn.pop());
fo[""] = Al({
  resources: ["https://api.iconify.design"].concat(Vi)
});
function Gs(s, f) {
  const a = Al(f);
  return a === null ? !1 : (fo[s] = a, !0);
}
function co(s) {
  return fo[s];
}
function td() {
  return Object.keys(fo);
}
function $s() {
}
const hl = /* @__PURE__ */ Object.create(null);
function rd(s) {
  if (!hl[s]) {
    const f = co(s);
    if (!f)
      return;
    const a = Su(f), p = {
      config: f,
      redundancy: a
    };
    hl[s] = p;
  }
  return hl[s];
}
function Cu(s, f, a) {
  let p, d;
  if (typeof s == "string") {
    const m = xl(s);
    if (!m)
      return a(void 0, 424), $s;
    d = m.send;
    const x = rd(s);
    x && (p = x.redundancy);
  } else {
    const m = Al(s);
    if (m) {
      p = Su(m);
      const x = s.resources ? s.resources[0] : "", k = xl(x);
      k && (d = k.send);
    }
  }
  return !p || !d ? (a(void 0, 424), $s) : p.query(f, d, a)().abort;
}
const Xs = "iconify2", ii = "iconify", Lu = ii + "-count", Ys = ii + "-version", Tu = 36e5, nd = 168;
function bl(s, f) {
  try {
    return s.getItem(f);
  } catch {
  }
}
function Fl(s, f, a) {
  try {
    return s.setItem(f, a), !0;
  } catch {
  }
}
function Zs(s, f) {
  try {
    s.removeItem(f);
  } catch {
  }
}
function wl(s, f) {
  return Fl(s, Lu, f.toString());
}
function kl(s) {
  return parseInt(bl(s, Lu)) || 0;
}
const Ur = {
  local: !0,
  session: !0
}, Au = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let Dl = !1;
function id(s) {
  Dl = s;
}
let Zi = typeof window > "u" ? {} : window;
function Fu(s) {
  const f = s + "Storage";
  try {
    if (Zi && Zi[f] && typeof Zi[f].length == "number")
      return Zi[f];
  } catch {
  }
  Ur[s] = !1;
}
function Du(s, f) {
  const a = Fu(s);
  if (!a)
    return;
  const p = bl(a, Ys);
  if (p !== Xs) {
    if (p) {
      const k = kl(a);
      for (let S = 0; S < k; S++)
        Zs(a, ii + S.toString());
    }
    Fl(a, Ys, Xs), wl(a, 0);
    return;
  }
  const d = Math.floor(Date.now() / Tu) - nd, m = (k) => {
    const S = ii + k.toString(), T = bl(a, S);
    if (typeof T == "string") {
      try {
        const w = JSON.parse(T);
        if (typeof w == "object" && typeof w.cached == "number" && w.cached > d && typeof w.provider == "string" && typeof w.data == "object" && typeof w.data.prefix == "string" && f(w, k))
          return !0;
      } catch {
      }
      Zs(a, S);
    }
  };
  let x = kl(a);
  for (let k = x - 1; k >= 0; k--)
    m(k) || (k === x - 1 ? (x--, wl(a, x)) : Au[s].add(k));
}
function Mu() {
  if (!Dl) {
    id(!0);
    for (const s in Ur)
      Du(s, (f) => {
        const a = f.data, p = f.provider, d = a.prefix, m = Er(
          p,
          d
        );
        if (!Tl(m, a).length)
          return !1;
        const x = a.lastModified || -1;
        return m.lastModifiedCached = m.lastModifiedCached ? Math.min(m.lastModifiedCached, x) : x, !0;
      });
  }
}
function od(s, f) {
  const a = s.lastModifiedCached;
  if (a && a >= f)
    return a === f;
  if (s.lastModifiedCached = f, a)
    for (const p in Ur)
      Du(p, (d) => {
        const m = d.data;
        return d.provider !== s.provider || m.prefix !== s.prefix || m.lastModified === f;
      });
  return !0;
}
function ld(s, f) {
  Dl || Mu();
  function a(p) {
    let d;
    if (!Ur[p] || !(d = Fu(p)))
      return;
    const m = Au[p];
    let x;
    if (m.size)
      m.delete(x = Array.from(m).shift());
    else if (x = kl(d), !wl(d, x + 1))
      return;
    const k = {
      cached: Math.floor(Date.now() / Tu),
      provider: s.provider,
      data: f
    };
    return Fl(
      d,
      ii + x.toString(),
      JSON.stringify(k)
    );
  }
  f.lastModified && !od(s, f.lastModified) || !Object.keys(f.icons).length || (f.not_found && (f = Object.assign({}, f), delete f.not_found), a("local") || a("session"));
}
function Qs() {
}
function ad(s) {
  s.iconsLoaderFlag || (s.iconsLoaderFlag = !0, setTimeout(() => {
    s.iconsLoaderFlag = !1, Yh(s);
  }));
}
function sd(s, f) {
  s.iconsToLoad ? s.iconsToLoad = s.iconsToLoad.concat(f).sort() : s.iconsToLoad = f, s.iconsQueueFlag || (s.iconsQueueFlag = !0, setTimeout(() => {
    s.iconsQueueFlag = !1;
    const { provider: a, prefix: p } = s, d = s.iconsToLoad;
    delete s.iconsToLoad;
    let m;
    if (!d || !(m = xl(a)))
      return;
    m.prepare(a, p, d).forEach((k) => {
      Cu(a, k, (S) => {
        if (typeof S != "object")
          k.icons.forEach((T) => {
            s.missing.add(T);
          });
        else
          try {
            const T = Tl(
              s,
              S
            );
            if (!T.length)
              return;
            const w = s.pendingIcons;
            w && T.forEach((O) => {
              w.delete(O);
            }), ld(s, S);
          } catch (T) {
            console.error(T);
          }
        ad(s);
      });
    });
  }));
}
const Ml = (s, f) => {
  const a = Jh(s, !0, bu()), p = Xh(a);
  if (!p.pending.length) {
    let S = !0;
    return f && setTimeout(() => {
      S && f(
        p.loaded,
        p.missing,
        p.pending,
        Qs
      );
    }), () => {
      S = !1;
    };
  }
  const d = /* @__PURE__ */ Object.create(null), m = [];
  let x, k;
  return p.pending.forEach((S) => {
    const { provider: T, prefix: w } = S;
    if (w === k && T === x)
      return;
    x = T, k = w, m.push(Er(T, w));
    const O = d[T] || (d[T] = /* @__PURE__ */ Object.create(null));
    O[w] || (O[w] = []);
  }), p.pending.forEach((S) => {
    const { provider: T, prefix: w, name: O } = S, D = Er(T, w), z = D.pendingIcons || (D.pendingIcons = /* @__PURE__ */ new Set());
    z.has(O) || (z.add(O), d[T][w].push(O));
  }), m.forEach((S) => {
    const { provider: T, prefix: w } = S;
    d[T][w].length && sd(S, d[T][w]);
  }), f ? Qh(f, p, m) : Qs;
}, ud = (s) => new Promise((f, a) => {
  const p = typeof s == "string" ? fi(s, !0) : s;
  if (!p) {
    a(s);
    return;
  }
  Ml([p || s], (d) => {
    if (d.length && p) {
      const m = ni(p);
      if (m) {
        f({
          ...ui,
          ...m
        });
        return;
      }
    }
    a(s);
  });
});
function fd(s) {
  try {
    const f = typeof s == "string" ? JSON.parse(s) : s;
    if (typeof f.body == "string")
      return {
        ...f
      };
  } catch {
  }
}
function cd(s, f) {
  const a = typeof s == "string" ? fi(s, !0, !0) : null;
  if (!a) {
    const m = fd(s);
    return {
      value: s,
      data: m
    };
  }
  const p = ni(a);
  if (p !== void 0 || !a.prefix)
    return {
      value: s,
      name: a,
      data: p
    };
  const d = Ml([a], () => f(s, a, ni(a)));
  return {
    value: s,
    name: a,
    loading: d
  };
}
function dl(s) {
  return s.hasAttribute("inline");
}
let Eu = !1;
try {
  Eu = navigator.vendor.indexOf("Apple") === 0;
} catch {
}
function hd(s, f) {
  switch (f) {
    case "svg":
    case "bg":
    case "mask":
      return f;
  }
  return f !== "style" && (Eu || s.indexOf("<a") === -1) ? "svg" : s.indexOf("currentColor") === -1 ? "bg" : "mask";
}
const dd = /(-?[0-9.]*[0-9]+[0-9.]*)/g, pd = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Sl(s, f, a) {
  if (f === 1)
    return s;
  if (a = a || 100, typeof s == "number")
    return Math.ceil(s * f * a) / a;
  if (typeof s != "string")
    return s;
  const p = s.split(dd);
  if (p === null || !p.length)
    return s;
  const d = [];
  let m = p.shift(), x = pd.test(m);
  for (; ; ) {
    if (x) {
      const k = parseFloat(m);
      isNaN(k) ? d.push(m) : d.push(Math.ceil(k * f * a) / a);
    } else
      d.push(m);
    if (m = p.shift(), m === void 0)
      return d.join("");
    x = !x;
  }
}
const gd = (s) => s === "unset" || s === "undefined" || s === "none";
function Ou(s, f) {
  const a = {
    ...ui,
    ...s
  }, p = {
    ...vu,
    ...f
  }, d = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let m = a.body;
  [a, p].forEach((j) => {
    const Y = [], re = j.hFlip, P = j.vFlip;
    let F = j.rotate;
    re ? P ? F += 2 : (Y.push(
      "translate(" + (d.width + d.left).toString() + " " + (0 - d.top).toString() + ")"
    ), Y.push("scale(-1 1)"), d.top = d.left = 0) : P && (Y.push(
      "translate(" + (0 - d.left).toString() + " " + (d.height + d.top).toString() + ")"
    ), Y.push("scale(1 -1)"), d.top = d.left = 0);
    let N;
    switch (F < 0 && (F -= Math.floor(F / 4) * 4), F = F % 4, F) {
      case 1:
        N = d.height / 2 + d.top, Y.unshift(
          "rotate(90 " + N.toString() + " " + N.toString() + ")"
        );
        break;
      case 2:
        Y.unshift(
          "rotate(180 " + (d.width / 2 + d.left).toString() + " " + (d.height / 2 + d.top).toString() + ")"
        );
        break;
      case 3:
        N = d.width / 2 + d.left, Y.unshift(
          "rotate(-90 " + N.toString() + " " + N.toString() + ")"
        );
        break;
    }
    F % 2 === 1 && (d.left !== d.top && (N = d.left, d.left = d.top, d.top = N), d.width !== d.height && (N = d.width, d.width = d.height, d.height = N)), Y.length && (m = '<g transform="' + Y.join(" ") + '">' + m + "</g>");
  });
  const x = p.width, k = p.height, S = d.width, T = d.height;
  let w, O;
  x === null ? (O = k === null ? "1em" : k === "auto" ? T : k, w = Sl(O, S / T)) : (w = x === "auto" ? S : x, O = k === null ? Sl(w, T / S) : k === "auto" ? T : k);
  const D = {}, z = (j, Y) => {
    gd(Y) || (D[j] = Y.toString());
  };
  return z("width", w), z("height", O), D.viewBox = d.left.toString() + " " + d.top.toString() + " " + S.toString() + " " + T.toString(), {
    attributes: D,
    body: m
  };
}
const vd = () => {
  let s;
  try {
    if (s = fetch, typeof s == "function")
      return s;
  } catch {
  }
};
let ao = vd();
function md(s) {
  ao = s;
}
function yd() {
  return ao;
}
function xd(s, f) {
  const a = co(s);
  if (!a)
    return 0;
  let p;
  if (!a.maxURL)
    p = 0;
  else {
    let d = 0;
    a.resources.forEach((x) => {
      d = Math.max(d, x.length);
    });
    const m = f + ".json?icons=";
    p = a.maxURL - d - a.path.length - m.length;
  }
  return p;
}
function bd(s) {
  return s === 404;
}
const wd = (s, f, a) => {
  const p = [], d = xd(s, f), m = "icons";
  let x = {
    type: m,
    provider: s,
    prefix: f,
    icons: []
  }, k = 0;
  return a.forEach((S, T) => {
    k += S.length + 1, k >= d && T > 0 && (p.push(x), x = {
      type: m,
      provider: s,
      prefix: f,
      icons: []
    }, k = S.length), x.icons.push(S);
  }), p.push(x), p;
};
function kd(s) {
  if (typeof s == "string") {
    const f = co(s);
    if (f)
      return f.path;
  }
  return "/";
}
const Sd = (s, f, a) => {
  if (!ao) {
    a("abort", 424);
    return;
  }
  let p = kd(f.provider);
  switch (f.type) {
    case "icons": {
      const m = f.prefix, k = f.icons.join(","), S = new URLSearchParams({
        icons: k
      });
      p += m + ".json?" + S.toString();
      break;
    }
    case "custom": {
      const m = f.uri;
      p += m.slice(0, 1) === "/" ? m.slice(1) : m;
      break;
    }
    default:
      a("abort", 400);
      return;
  }
  let d = 503;
  ao(s + p).then((m) => {
    const x = m.status;
    if (x !== 200) {
      setTimeout(() => {
        a(bd(x) ? "abort" : "next", x);
      });
      return;
    }
    return d = 501, m.json();
  }).then((m) => {
    if (typeof m != "object" || m === null) {
      setTimeout(() => {
        m === 404 ? a("abort", m) : a("next", d);
      });
      return;
    }
    setTimeout(() => {
      a("success", m);
    });
  }).catch(() => {
    a("next", d);
  });
}, Cd = {
  prepare: wd,
  send: Sd
};
function Js(s, f) {
  switch (s) {
    case "local":
    case "session":
      Ur[s] = f;
      break;
    case "all":
      for (const a in Ur)
        Ur[a] = f;
      break;
  }
}
const pl = "data-style";
let Iu = "";
function Ld(s) {
  Iu = s;
}
function Vs(s, f) {
  let a = Array.from(s.childNodes).find((p) => p.hasAttribute && p.hasAttribute(pl));
  a || (a = document.createElement("style"), a.setAttribute(pl, pl), s.appendChild(a)), a.textContent = ":host{display:inline-block;vertical-align:" + (f ? "-0.125em" : "0") + "}span,svg{display:block}" + Iu;
}
function Nu() {
  Us("", Cd), bu(!0);
  let s;
  try {
    s = window;
  } catch {
  }
  if (s) {
    if (Mu(), s.IconifyPreload !== void 0) {
      const a = s.IconifyPreload, p = "Invalid IconifyPreload syntax.";
      typeof a == "object" && a !== null && (a instanceof Array ? a : [a]).forEach((d) => {
        try {
          (typeof d != "object" || d === null || d instanceof Array || typeof d.icons != "object" || typeof d.prefix != "string" || !Ks(d)) && console.error(p);
        } catch {
          console.error(p);
        }
      });
    }
    if (s.IconifyProviders !== void 0) {
      const a = s.IconifyProviders;
      if (typeof a == "object" && a !== null)
        for (const p in a) {
          const d = "IconifyProviders[" + p + "] is invalid.";
          try {
            const m = a[p];
            if (typeof m != "object" || !m || m.resources === void 0)
              continue;
            Gs(p, m) || console.error(d);
          } catch {
            console.error(d);
          }
        }
    }
  }
  return {
    enableCache: (a) => Js(a, !0),
    disableCache: (a) => Js(a, !1),
    iconExists: Gh,
    getIcon: $h,
    listIcons: Uh,
    addIcon: wu,
    addCollection: Ks,
    calculateSize: Sl,
    buildIcon: Ou,
    loadIcons: Ml,
    loadIcon: ud,
    addAPIProvider: Gs,
    appendCustomStyle: Ld,
    _api: {
      getAPIConfig: co,
      setAPIModule: Us,
      sendAPIQuery: Cu,
      setFetch: md,
      getFetch: yd,
      listAPIProviders: td
    }
  };
}
function Pu(s, f) {
  let a = s.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const p in f)
    a += " " + p + '="' + f[p] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + a + ">" + s + "</svg>";
}
function Td(s) {
  return s.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Ad(s) {
  return 'url("data:image/svg+xml,' + Td(s) + '")';
}
const Cl = {
  "background-color": "currentColor"
}, Bu = {
  "background-color": "transparent"
}, eu = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
}, tu = {
  "-webkit-mask": Cl,
  mask: Cl,
  background: Bu
};
for (const s in tu) {
  const f = tu[s];
  for (const a in eu)
    f[s + "-" + a] = eu[a];
}
function ru(s) {
  return s ? s + (s.match(/^[-0-9.]+$/) ? "px" : "") : "inherit";
}
function Fd(s, f, a) {
  const p = document.createElement("span");
  let d = s.body;
  d.indexOf("<a") !== -1 && (d += "<!-- " + Date.now() + " -->");
  const m = s.attributes, x = Pu(d, {
    ...m,
    width: f.width + "",
    height: f.height + ""
  }), k = Ad(x), S = p.style, T = {
    "--svg": k,
    width: ru(m.width),
    height: ru(m.height),
    ...a ? Cl : Bu
  };
  for (const w in T)
    S.setProperty(w, T[w]);
  return p;
}
function Dd(s) {
  const f = document.createElement("span"), a = s.attributes;
  let p = "";
  return a.width || (p = "width: inherit;"), a.height || (p += "height: inherit;"), p && (a.style = p), f.innerHTML = Pu(s.body, a), f.firstChild;
}
function nu(s, f) {
  const a = f.icon.data, p = f.customisations, d = Ou(a, p);
  p.preserveAspectRatio && (d.attributes.preserveAspectRatio = p.preserveAspectRatio);
  const m = f.renderedMode;
  let x;
  switch (m) {
    case "svg":
      x = Dd(d);
      break;
    default:
      x = Fd(d, {
        ...ui,
        ...a
      }, m === "mask");
  }
  const k = Array.from(s.childNodes).find((S) => {
    const T = S.tagName && S.tagName.toUpperCase();
    return T === "SPAN" || T === "SVG";
  });
  k ? x.tagName === "SPAN" && k.tagName === x.tagName ? k.setAttribute("style", x.getAttribute("style")) : s.replaceChild(x, k) : s.appendChild(x);
}
function iu(s, f, a) {
  const p = a && (a.rendered ? a : a.lastRender);
  return {
    rendered: !1,
    inline: f,
    icon: s,
    lastRender: p
  };
}
function Md(s = "iconify-icon") {
  let f, a;
  try {
    f = window.customElements, a = window.HTMLElement;
  } catch {
    return;
  }
  if (!f || !a)
    return;
  const p = f.get(s);
  if (p)
    return p;
  const d = [
    "icon",
    "mode",
    "inline",
    "width",
    "height",
    "rotate",
    "flip"
  ], m = class extends a {
    constructor() {
      super();
      Xi(this, "_shadowRoot");
      Xi(this, "_state");
      Xi(this, "_checkQueued", !1);
      const S = this._shadowRoot = this.attachShadow({
        mode: "open"
      }), T = dl(this);
      Vs(S, T), this._state = iu({
        value: ""
      }, T), this._queueCheck();
    }
    static get observedAttributes() {
      return d.slice(0);
    }
    attributeChangedCallback(S) {
      if (S === "inline") {
        const T = dl(this), w = this._state;
        T !== w.inline && (w.inline = T, Vs(this._shadowRoot, T));
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
      return dl(this);
    }
    set inline(S) {
      S ? this.setAttribute("inline", "true") : this.removeAttribute("inline");
    }
    restartAnimation() {
      const S = this._state;
      if (S.rendered) {
        const T = this._shadowRoot;
        if (S.renderedMode === "svg")
          try {
            T.lastChild.setCurrentTime(0);
            return;
          } catch {
          }
        nu(T, S);
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
      const S = this._state, T = this.getAttribute("icon");
      if (T !== S.icon.value) {
        this._iconChanged(T);
        return;
      }
      if (!S.rendered)
        return;
      const w = this.getAttribute("mode"), O = js(this);
      (S.attrMode !== w || zh(S.customisations, O)) && this._renderIcon(S.icon, O, w);
    }
    _iconChanged(S) {
      const T = cd(S, (w, O, D) => {
        const z = this._state;
        if (z.rendered || this.getAttribute("icon") !== w)
          return;
        const j = {
          value: w,
          name: O,
          data: D
        };
        j.data ? this._gotIconData(j) : z.icon = j;
      });
      T.data ? this._gotIconData(T) : this._state = iu(T, this._state.inline, this._state);
    }
    _gotIconData(S) {
      this._checkQueued = !1, this._renderIcon(S, js(this), this.getAttribute("mode"));
    }
    _renderIcon(S, T, w) {
      const O = hd(S.data.body, w), D = this._state.inline;
      nu(this._shadowRoot, this._state = {
        rendered: !0,
        icon: S,
        inline: D,
        customisations: T,
        attrMode: w,
        renderedMode: O
      });
    }
  };
  d.forEach((k) => {
    k in m.prototype || Object.defineProperty(m.prototype, k, {
      get: function() {
        return this.getAttribute(k);
      },
      set: function(S) {
        S !== null ? this.setAttribute(k, S) : this.removeAttribute(k);
      }
    });
  });
  const x = Nu();
  for (const k in x)
    m[k] = m.prototype[k] = x[k];
  return f.define(s, m), m;
}
const Ed = Md() || Nu(), { enableCache: op, disableCache: lp, iconExists: ap, getIcon: sp, listIcons: up, addIcon: ci, addCollection: fp, calculateSize: cp, buildIcon: hp, loadIcons: dp, loadIcon: pp, addAPIProvider: gp, _api: vp } = Ed, Od = /* @__PURE__ */ xn("<iconify-icon>", !0, !1);
function Id(s) {
  let {
    icon: f,
    mode: a,
    inline: p,
    rotate: d,
    flip: m,
    width: x,
    height: k,
    preserveAspectRatio: S
  } = s;
  return typeof f == "object" && (f = JSON.stringify(f)), (() => {
    const T = Od();
    return $t(T, "icon", f), $t(T, "mode", a), $t(T, "inline", p), $t(T, "rotate", d), $t(T, "flip", m), $t(T, "width", x), $t(T, "height", k), $t(T, "preserveaspectratio", S), dh(T, s, !1, !1), T._$owner = Uc(), T;
  })();
}
const Nd = {
  width: 24,
  height: 24,
  body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-4.182 0-7.028-2.5-8.725-4.704Z"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g>'
}, Pd = {
  width: 24,
  height: 24,
  body: '<g fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M8.913 15.934c1.258.315 2.685.315 4.122-.07c1.437-.385 2.673-1.099 3.605-2.001"/><ellipse cx="14.509" cy="9.774" fill="currentColor" rx="1" ry="1.5" transform="rotate(-15 14.51 9.774)"/><ellipse cx="8.714" cy="11.328" fill="currentColor" rx="1" ry="1.5" transform="rotate(-15 8.714 11.328)"/><path stroke="currentColor" stroke-width="1.5" d="m13 16l.478.974a1.5 1.5 0 1 0 2.693-1.322l-.46-.935"/></g>'
}, Bd = {
  width: 24,
  height: 24,
  body: '<g fill="none"><path fill="currentColor" d="m5.505 11.41l.53.53l-.53-.53ZM3 14.952h-.75H3ZM9.048 21v.75V21ZM11.41 5.505l-.53-.53l.53.53Zm1.831 12.34a.75.75 0 0 0 1.06-1.061l-1.06 1.06ZM7.216 9.697a.75.75 0 1 0-1.06 1.061l1.06-1.06Zm10.749 2.362l-5.905 5.905l1.06 1.06l5.905-5.904l-1.06-1.06Zm-11.93-.12l5.905-5.905l-1.06-1.06l-5.905 5.904l1.06 1.06Zm0 6.025c-.85-.85-1.433-1.436-1.812-1.933c-.367-.481-.473-.79-.473-1.08h-1.5c0 .749.312 1.375.78 1.99c.455.596 1.125 1.263 1.945 2.083l1.06-1.06Zm-1.06-7.086c-.82.82-1.49 1.488-1.945 2.084c-.468.614-.78 1.24-.78 1.99h1.5c0-.29.106-.6.473-1.08c.38-.498.962-1.083 1.812-1.933l-1.06-1.06Zm7.085 7.086c-.85.85-1.435 1.433-1.933 1.813c-.48.366-.79.472-1.08.472v1.5c.75 0 1.376-.312 1.99-.78c.596-.455 1.264-1.125 2.084-1.945l-1.06-1.06Zm-7.085 1.06c.82.82 1.487 1.49 2.084 1.945c.614.468 1.24.78 1.989.78v-1.5c-.29 0-.599-.106-1.08-.473c-.497-.38-1.083-.962-1.933-1.812l-1.06 1.06Zm12.99-12.99c.85.85 1.433 1.436 1.813 1.933c.366.481.472.79.472 1.08h1.5c0-.749-.312-1.375-.78-1.99c-.455-.596-1.125-1.263-1.945-2.083l-1.06 1.06Zm1.06 7.086c.82-.82 1.49-1.488 1.945-2.084c.468-.614.78-1.24.78-1.99h-1.5c0 .29-.106.6-.473 1.08c-.38.498-.962 1.083-1.812 1.933l1.06 1.06Zm0-8.146c-.82-.82-1.487-1.49-2.084-1.945c-.614-.468-1.24-.78-1.989-.78v1.5c.29 0 .599.106 1.08.473c.497.38 1.083.962 1.933 1.812l1.06-1.06Zm-7.085 1.06c.85-.85 1.435-1.433 1.933-1.812c.48-.367.79-.473 1.08-.473v-1.5c-.75 0-1.376.312-1.99.78c-.596.455-1.264 1.125-2.084 1.945l1.06 1.06Zm2.362 10.749L7.216 9.698l-1.06 1.061l7.085 7.085l1.06-1.06Z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M9 21h12"/></g>'
}, Hd = {
  width: 24,
  height: 24,
  body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h11a5 5 0 0 1 0 10H8M4 7l3-3M4 7l3 3"/>'
}, zd = {
  width: 24,
  height: 24,
  body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7H9a5 5 0 1 0 0 10h7m4-10l-3-3m3 3l-3 3"/>'
}, Wd = "gedi_3c34e", _d = {
  icon: Wd
};
ci("solar:eye-linear", Nd);
ci("solar:undo-left-round-linear", Hd);
ci("solar:undo-right-round-linear", zd);
ci("solar:eraser-linear", Bd);
ci("solar:emoji-funny-circle-linear", Pd);
function Rd(s) {
  return xt(Id, {
    get icon() {
      return s.icon;
    },
    width: "1.3em",
    get class() {
      return _d.icon;
    }
  });
}
const jd = `<ul id="g-panel-emotions-TyUh" class="g-panel-content-emotion"><li>\u{1F600}</li><li>\u{1F603}</li><li>\u{1F604}</li><li>\u{1F601}</li><li>\u{1F606}</li><li>\u{1F605}</li><li>\u{1F602}</li><li>\u{1F923}</li><li>\u{1F60A}</li><li>\u{1F607}</li><li>\u{1F642}</li><li>\u{1F643}</li><li>\u{1F609}</li><li>\u{1F60C}</li><li>\u{1F60D}</li><li>\u{1F618}</li><li>\u{1F617}</li><li>\u{1F619}</li><li>\u{1F61A}</li><li>\u{1F60B}</li><li>\u{1F61B}</li><li>\u{1F61D}</li><li>\u{1F61C}</li><li>\u{1F913}</li><li>\u{1F60E}</li><li>\u{1F60F}</li><li>\u{1F612}</li><li>\u{1F61E}</li><li>\u{1F614}</li><li>\u{1F61F}</li><li>\u{1F615}</li><li>\u{1F641}</li><li>\u{1F623}</li><li>\u{1F616}</li><li>\u{1F62B}</li><li>\u{1F629}</li><li>\u{1F622}</li><li>\u{1F62D}</li><li>\u{1F624}</li><li>\u{1F620}</li><li>\u{1F621}</li><li>\u{1F633}</li><li>\u{1F631}</li><li>\u{1F628}</li><li>\u{1F917}</li><li>\u{1F914}</li><li>\u{1F636}</li><li>\u{1F611}</li><li>\u{1F62C}</li><li>\u{1F644}</li><li>\u{1F62F}</li><li>\u{1F634}</li><li>\u{1F637}</li><li>\u{1F911}</li><li>\u{1F608}</li><li>\u{1F921}</li><li>\u{1F4A9}</li><li>\u{1F47B}</li><li>\u{1F480}</li><li>\u{1F440}</li><li>\u{1F463}</li><li>\u{1F450}</li><li>\u{1F64C}</li><li>\u{1F44F}</li><li>\u{1F91D}</li><li>\u{1F44D}</li><li>\u{1F44E}</li><li>\u{1F44A}</li><li>\u270A</li><li>\u{1F91B}</li><li>\u{1F91C}</li><li>\u{1F91E}</li><li>\u270C\uFE0F</li><li>\u{1F918}</li><li>\u{1F44C}</li><li>\u{1F448}</li><li>\u{1F449}</li><li>\u{1F446}</li><li>\u{1F447}</li><li>\u261D\uFE0F</li><li>\u270B</li><li>\u{1F91A}</li><li>\u{1F590}</li><li>\u{1F596}</li><li>\u{1F44B}</li><li>\u{1F919}</li><li>\u{1F4AA}</li><li>\u{1F595}</li><li>\u270D\uFE0F</li><li>\u{1F64F}</li>
</ul>`, qd = {
  title: "\u8868\u60C5",
  icon: "solar:emoji-funny-circle-linear",
  menu: {
    innerHTML: jd,
    onMount(s) {
      const f = s.cm, a = s.$element.querySelector(
        "#g-panel-emotions-TyUh"
      );
      a && a.addEventListener("click", (p) => {
        const d = p.target;
        d.tagName === "LI" && (f.replaceSelection(d.textContent || ""), f.refresh(), f.focus());
      });
    }
  }
};
function Kd(s, f) {
  const a = s.$element.querySelector(
    `.${Pt["editor-wrapper"]}`
  );
  if (a == null ? void 0 : a.classList.contains(Pt["show-preview"]))
    a == null || a.classList.remove(Pt["show-preview"]), f.changeTitle("\u9884\u89C8"), f.active(!1);
  else {
    const d = s.getPreview();
    d ? s.$preview.innerHTML = d : s.$preview.innerHTML = '<p style="opacity: .7;font-size: .9em;">\u60A8\u597D\u50CF\u4EC0\u4E48\u90FD\u6CA1\u6709\u8F93\u5165</p>', a == null || a.classList.add(Pt["show-preview"]), f.changeTitle("\u53D6\u6D88\u9884\u89C8"), f.active(!0);
  }
}
const Ud = {
  title: "\u9884\u89C8",
  icon: "solar:eye-linear",
  action: Kd
}, Gd = {
  title: "\u56DE\u9000",
  icon: "solar:undo-left-round-linear",
  action(s) {
    const f = s.cm;
    f.undo(), f.refresh(), f.focus();
  }
}, $d = {
  title: "\u91CD\u505A",
  icon: "solar:undo-right-round-linear",
  action(s) {
    const f = s.cm;
    f.redo(), f.refresh(), f.focus();
  }
}, Xd = {
  title: "\u6E05\u7A7A",
  icon: "solar:eraser-linear",
  action(s) {
    const f = s.cm;
    f.setValue(""), f.refresh(), f.focus();
  }
}, Yd = {
  title: "",
  icon: ""
}, Zd = [
  qd,
  "|",
  Gd,
  $d,
  "|",
  Xd,
  "|",
  Ud
], Qd = /* @__PURE__ */ xn("<div>");
function Jd(s) {
  let f;
  return oi(() => {
    ro(() => {
      f.style.bottom = s.pos[0], f.style.right = s.pos[1];
    });
  }), (() => {
    const a = Qd(), p = f;
    return typeof p == "function" ? si(p, a) : f = a, Mr(a, () => s.content), Rt(() => Ot(a, Xt.tooltip)), a;
  })();
}
const Hu = /* @__PURE__ */ xn("<div><div>"), zu = /* @__PURE__ */ xn("<div>");
function Wu(s) {
  const f = s.item;
  let a;
  const [p, d] = mn(f.title), [m, x] = mn({
    $element: a,
    active(k) {
      k ? m().$element.classList.add(Xt.active) : m().$element.classList.remove(Xt.active);
    },
    changeTitle(k) {
      d(k);
    },
    disable(k) {
      k ? m().$element.classList.add(Xt.disable) : m().$element.classList.remove(Xt.disable);
    }
  });
  return oi(() => {
    const k = m();
    k.$element = a, x(k);
  }), xt(Yi, {
    get when() {
      return f.title;
    },
    get fallback() {
      return xt(ep, {});
    },
    get children() {
      const k = Hu(), S = k.firstChild, T = a;
      return typeof T == "function" ? si(T, S) : a = S, S.$$click = () => {
        const w = s.item.action;
        w && s.inst && !s.item.menu && w(s.inst, m());
      }, Mr(S, xt(Rd, {
        get icon() {
          return s.item.icon;
        }
      })), Mr(k, xt(Jd, {
        get content() {
          return p();
        },
        pos: ["-140%", "-50%"]
      }), null), Mr(k, xt(Yi, {
        get when() {
          return f.menu;
        },
        get children() {
          return xt(Ih, {
            trigger: a,
            get children() {
              return [xt(Yi, {
                get when() {
                  return Ws(f.menu);
                },
                get children() {
                  return xt(hu, {
                    get each() {
                      return f.menu;
                    },
                    children: (w) => xt(Wu, {
                      item: w,
                      get inst() {
                        return s.inst;
                      }
                    })
                  });
                }
              }), xt(Yi, {
                get when() {
                  return !Ws(f.menu);
                },
                get children() {
                  return xt(Vd, {
                    get item() {
                      return f.menu;
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
      }), null), Rt((w) => {
        const O = Xt["toolbar-item-wrapper"], D = Xt["toolbar-item"];
        return O !== w._v$ && Ot(k, w._v$ = O), D !== w._v$2 && Ot(S, w._v$2 = D), w;
      }, {
        _v$: void 0,
        _v$2: void 0
      }), k;
    }
  });
}
function Vd(s) {
  let f;
  return oi(() => {
    f.innerHTML = s.item.innerHTML, s.inst && s.item.onMount(s.inst);
  }), (() => {
    const a = zu(), p = f;
    return typeof p == "function" ? si(p, a) : f = a, a;
  })();
}
function ep() {
  return (() => {
    const s = zu();
    return Rt(() => Ot(s, Xt.vr)), s;
  })();
}
function tp(s) {
  return (() => {
    const f = Hu(), a = f.firstChild;
    return Mr(a, xt(hu, {
      get each() {
        return s.items || Zd;
      },
      children: (p) => (p === "|" && (p = Yd), xt(Wu, {
        item: p,
        get inst() {
          return s.inst;
        }
      }))
    })), Rt(() => Ot(f, Xt["toolbar-wrapper"])), f;
  })();
}
du(["click"]);
const rp = /* @__PURE__ */ xn("<div><div></div><div><div></div><div><div>");
function np(s) {
  const [f, a] = mn();
  let p;
  return oi(() => {
    if (!p)
      return;
    const d = p.querySelector(`.${Pt.editor}`), m = p.querySelector(`.${Pt["preview-content"]}`);
    if (d && m) {
      const x = Ft(d, {
        mode: "markdown",
        lineWrapping: !0,
        value: s.value,
        scrollbarStyle: "overlay",
        autoCloseTags: !0,
        styleActiveLine: !0,
        matchBrackets: !0,
        indentWithTabs: !0
      });
      a({
        cm: x,
        $element: p,
        $editor: d,
        $preview: m,
        getPreview() {
          const S = x.getValue();
          return s.handelPreview ? s.handelPreview(S) : S;
        }
      }), x.on("change", () => {
        const S = x.getValue();
        s.onChange(S);
      }), ro(() => {
        s.theme === "dark" ? x.setOption("theme", "blackboard") : x.setOption("theme", "default");
      }), ro(() => {
        s.value !== x.getValue() && (x.setValue(s.value), x.refresh(), x.focus());
      });
    }
  }), (() => {
    const d = rp(), m = d.firstChild, x = m.nextSibling, k = x.firstChild, S = k.nextSibling, T = S.firstChild, w = p;
    return typeof w == "function" ? si(w, d) : p = d, Mr(m, xt(tp, {
      get inst() {
        return f();
      }
    })), Rt((O) => {
      const D = `${Pt["out-wrapper"]} ${s.theme === "dark" ? `${Pt.dark} dark` : ""}`, z = Pt.toolbar, j = Pt["editor-wrapper"], Y = s.height || "300px", re = Pt.editor, P = Pt.preview, F = `${Pt["preview-content"]} markdown-body`;
      return D !== O._v$ && Ot(d, O._v$ = D), z !== O._v$2 && Ot(m, O._v$2 = z), j !== O._v$3 && Ot(x, O._v$3 = j), Y !== O._v$4 && ((O._v$4 = Y) != null ? x.style.setProperty("height", Y) : x.style.removeProperty("height")), re !== O._v$5 && Ot(k, O._v$5 = re), P !== O._v$6 && Ot(S, O._v$6 = P), F !== O._v$7 && Ot(T, O._v$7 = F), O;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0,
      _v$7: void 0
    }), d;
  })();
}
function mp(s) {
  if (!s.target)
    return;
  const [f, a] = mn(s.theme), [p, d] = mn(""), m = (x) => {
    d(x), s.onChange(x);
  };
  return sh(() => xt(np, {
    onChange: m,
    get handelPreview() {
      return s.handelPreview;
    },
    get height() {
      return s.height;
    },
    get theme() {
      return f();
    },
    get value() {
      return p();
    }
  }), s.target), {
    setTheme: (x) => {
      a(x);
    },
    setVal: (x) => {
      d(x);
    },
    getVal: () => p()
  };
}
export {
  mp as Editor,
  np as MdEditor
};
