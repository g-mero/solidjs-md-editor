var A0 = Object.defineProperty;
var k0 = (c, p, a) => p in c ? A0(c, p, { enumerable: !0, configurable: !0, writable: !0, value: a }) : c[p] = a;
var Ja = (c, p, a) => (k0(c, typeof p != "symbol" ? p + "" : p, a), a);
const F0 = (c, p) => c === p, D0 = Symbol("solid-track"), rf = {
  equals: F0
};
let $h = Qh;
const ji = 1, of = 2, Xh = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Zt = null;
let Sc = null, Et = null, jt = null, xi = null, hf = 0;
function ef(c, p) {
  const a = Et, x = Zt, w = c.length === 0, C = w ? Xh : {
    owned: null,
    cleanups: null,
    context: null,
    owner: p === void 0 ? x : p
  }, L = w ? c : () => c(() => wi(() => df(C)));
  Zt = C, Et = null;
  try {
    return wu(L, !0);
  } finally {
    Et = a, Zt = x;
  }
}
function Zl(c, p) {
  p = p ? Object.assign({}, rf, p) : rf;
  const a = {
    value: c,
    observers: null,
    observerSlots: null,
    comparator: p.equals || void 0
  }, x = (w) => (typeof w == "function" && (w = w(a.value)), Zh(a, w));
  return [Yh.bind(a), x];
}
function Yn(c, p, a) {
  const x = Wc(c, p, !1, ji);
  xu(x);
}
function lf(c, p, a) {
  $h = N0;
  const x = Wc(c, p, !1, ji);
  (!a || !a.render) && (x.user = !0), xi ? xi.push(x) : xu(x);
}
function kc(c, p, a) {
  a = a ? Object.assign({}, rf, a) : rf;
  const x = Wc(c, p, !0, 0);
  return x.observers = null, x.observerSlots = null, x.comparator = a.equals || void 0, xu(x), Yh.bind(x);
}
function wi(c) {
  if (Et === null)
    return c();
  const p = Et;
  Et = null;
  try {
    return c();
  } finally {
    Et = p;
  }
}
function mu(c) {
  lf(() => wi(c));
}
function E0(c) {
  return Zt === null || (Zt.cleanups === null ? Zt.cleanups = [c] : Zt.cleanups.push(c)), c;
}
function M0() {
  return Zt;
}
function Yh() {
  if (this.sources && this.state)
    if (this.state === ji)
      xu(this);
    else {
      const c = jt;
      jt = null, wu(() => uf(this), !1), jt = c;
    }
  if (Et) {
    const c = this.observers ? this.observers.length : 0;
    Et.sources ? (Et.sources.push(this), Et.sourceSlots.push(c)) : (Et.sources = [this], Et.sourceSlots = [c]), this.observers ? (this.observers.push(Et), this.observerSlots.push(Et.sources.length - 1)) : (this.observers = [Et], this.observerSlots = [Et.sources.length - 1]);
  }
  return this.value;
}
function Zh(c, p, a) {
  let x = c.value;
  return (!c.comparator || !c.comparator(x, p)) && (c.value = p, c.observers && c.observers.length && wu(() => {
    for (let w = 0; w < c.observers.length; w += 1) {
      const C = c.observers[w], L = Sc && Sc.running;
      L && Sc.disposed.has(C), (L ? !C.tState : !C.state) && (C.pure ? jt.push(C) : xi.push(C), C.observers && Jh(C)), L || (C.state = ji);
    }
    if (jt.length > 1e6)
      throw jt = [], new Error();
  }, !1)), p;
}
function xu(c) {
  if (!c.fn)
    return;
  df(c);
  const p = Zt, a = Et, x = hf;
  Et = Zt = c, I0(c, c.value, x), Et = a, Zt = p;
}
function I0(c, p, a) {
  let x;
  try {
    x = c.fn(p);
  } catch (w) {
    return c.pure && (c.state = ji, c.owned && c.owned.forEach(df), c.owned = null), c.updatedAt = a + 1, Vh(w);
  }
  (!c.updatedAt || c.updatedAt <= a) && (c.updatedAt != null && "observers" in c ? Zh(c, x) : c.value = x, c.updatedAt = a);
}
function Wc(c, p, a, x = ji, w) {
  const C = {
    fn: c,
    state: x,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: p,
    owner: Zt,
    context: null,
    pure: a
  };
  return Zt === null || Zt !== Xh && (Zt.owned ? Zt.owned.push(C) : Zt.owned = [C]), C;
}
function sf(c) {
  if (c.state === 0)
    return;
  if (c.state === of)
    return uf(c);
  if (c.suspense && wi(c.suspense.inFallback))
    return c.suspense.effects.push(c);
  const p = [c];
  for (; (c = c.owner) && (!c.updatedAt || c.updatedAt < hf); )
    c.state && p.push(c);
  for (let a = p.length - 1; a >= 0; a--)
    if (c = p[a], c.state === ji)
      xu(c);
    else if (c.state === of) {
      const x = jt;
      jt = null, wu(() => uf(c, p[0]), !1), jt = x;
    }
}
function wu(c, p) {
  if (jt)
    return c();
  let a = !1;
  p || (jt = []), xi ? a = !0 : xi = [], hf++;
  try {
    const x = c();
    return O0(a), x;
  } catch (x) {
    a || (xi = null), jt = null, Vh(x);
  }
}
function O0(c) {
  if (jt && (Qh(jt), jt = null), c)
    return;
  const p = xi;
  xi = null, p.length && wu(() => $h(p), !1);
}
function Qh(c) {
  for (let p = 0; p < c.length; p++)
    sf(c[p]);
}
function N0(c) {
  let p, a = 0;
  for (p = 0; p < c.length; p++) {
    const x = c[p];
    x.user ? c[a++] = x : sf(x);
  }
  for (p = 0; p < a; p++)
    sf(c[p]);
}
function uf(c, p) {
  c.state = 0;
  for (let a = 0; a < c.sources.length; a += 1) {
    const x = c.sources[a];
    if (x.sources) {
      const w = x.state;
      w === ji ? x !== p && (!x.updatedAt || x.updatedAt < hf) && sf(x) : w === of && uf(x, p);
    }
  }
}
function Jh(c) {
  for (let p = 0; p < c.observers.length; p += 1) {
    const a = c.observers[p];
    a.state || (a.state = of, a.pure ? jt.push(a) : xi.push(a), a.observers && Jh(a));
  }
}
function df(c) {
  let p;
  if (c.sources)
    for (; c.sources.length; ) {
      const a = c.sources.pop(), x = c.sourceSlots.pop(), w = a.observers;
      if (w && w.length) {
        const C = w.pop(), L = a.observerSlots.pop();
        x < w.length && (C.sourceSlots[L] = x, w[x] = C, a.observerSlots[x] = L);
      }
    }
  if (c.owned) {
    for (p = c.owned.length - 1; p >= 0; p--)
      df(c.owned[p]);
    c.owned = null;
  }
  if (c.cleanups) {
    for (p = c.cleanups.length - 1; p >= 0; p--)
      c.cleanups[p]();
    c.cleanups = null;
  }
  c.state = 0, c.context = null;
}
function Vh(c) {
  throw c;
}
const P0 = Symbol("fallback");
function bh(c) {
  for (let p = 0; p < c.length; p++)
    c[p]();
}
function R0(c, p, a = {}) {
  let x = [], w = [], C = [], L = 0, F = p.length > 1 ? [] : null;
  return E0(() => bh(C)), () => {
    let D = c() || [], P, R;
    return D[D0], wi(() => {
      let V = D.length, pe, ce, Le, We, Ze, De, we, Ke, Te;
      if (V === 0)
        L !== 0 && (bh(C), C = [], x = [], w = [], L = 0, F && (F = [])), a.fallback && (x = [P0], w[0] = ef((Ee) => (C[0] = Ee, a.fallback())), L = 1);
      else if (L === 0) {
        for (w = new Array(V), R = 0; R < V; R++)
          x[R] = D[R], w[R] = ef($);
        L = V;
      } else {
        for (Le = new Array(V), We = new Array(V), F && (Ze = new Array(V)), De = 0, we = Math.min(L, V); De < we && x[De] === D[De]; De++)
          ;
        for (we = L - 1, Ke = V - 1; we >= De && Ke >= De && x[we] === D[Ke]; we--, Ke--)
          Le[Ke] = w[we], We[Ke] = C[we], F && (Ze[Ke] = F[we]);
        for (pe = /* @__PURE__ */ new Map(), ce = new Array(Ke + 1), R = Ke; R >= De; R--)
          Te = D[R], P = pe.get(Te), ce[R] = P === void 0 ? -1 : P, pe.set(Te, R);
        for (P = De; P <= we; P++)
          Te = x[P], R = pe.get(Te), R !== void 0 && R !== -1 ? (Le[R] = w[P], We[R] = C[P], F && (Ze[R] = F[P]), R = ce[R], pe.set(Te, R)) : C[P]();
        for (R = De; R < V; R++)
          R in Le ? (w[R] = Le[R], C[R] = We[R], F && (F[R] = Ze[R], F[R](R))) : w[R] = ef($);
        w = w.slice(0, L = V), x = D.slice(0);
      }
      return w;
    });
    function $(V) {
      if (C[R] = V, F) {
        const [pe, ce] = Zl(R);
        return F[R] = ce, p(D[R], pe);
      }
      return p(D[R]);
    }
  };
}
let W0 = !1;
function Vt(c, p) {
  return wi(() => c(p || {}));
}
const B0 = (c) => `Stale read from <${c}>.`;
function jh(c) {
  const p = "fallback" in c && {
    fallback: () => c.fallback
  };
  return kc(R0(() => c.each, c.children, p || void 0));
}
function Va(c) {
  const p = c.keyed, a = kc(() => c.when, void 0, {
    equals: (x, w) => p ? x === w : !x == !w
  });
  return kc(() => {
    const x = a();
    if (x) {
      const w = c.children;
      return typeof w == "function" && w.length > 0 ? wi(() => w(p ? x : () => {
        if (!wi(a))
          throw B0("Show");
        return c.when;
      })) : w;
    }
    return c.fallback;
  }, void 0, void 0);
}
const H0 = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], z0 = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...H0]), U0 = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), G0 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), q0 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
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
function K0(c, p) {
  const a = q0[c];
  return typeof a == "object" ? a[p] ? a.$ : void 0 : a;
}
const $0 = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), X0 = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function Y0(c, p, a) {
  let x = a.length, w = p.length, C = x, L = 0, F = 0, D = p[w - 1].nextSibling, P = null;
  for (; L < w || F < C; ) {
    if (p[L] === a[F]) {
      L++, F++;
      continue;
    }
    for (; p[w - 1] === a[C - 1]; )
      w--, C--;
    if (w === L) {
      const R = C < x ? F ? a[F - 1].nextSibling : a[C - F] : D;
      for (; F < C; )
        c.insertBefore(a[F++], R);
    } else if (C === F)
      for (; L < w; )
        (!P || !P.has(p[L])) && p[L].remove(), L++;
    else if (p[L] === a[C - 1] && a[F] === p[w - 1]) {
      const R = p[--w].nextSibling;
      c.insertBefore(a[F++], p[L++].nextSibling), c.insertBefore(a[--C], R), p[w] = a[C];
    } else {
      if (!P) {
        P = /* @__PURE__ */ new Map();
        let $ = F;
        for (; $ < C; )
          P.set(a[$], $++);
      }
      const R = P.get(p[L]);
      if (R != null)
        if (F < R && R < C) {
          let $ = L, V = 1, pe;
          for (; ++$ < w && $ < C && !((pe = P.get(p[$])) == null || pe !== R + V); )
            V++;
          if (V > R - F) {
            const ce = p[L];
            for (; F < R; )
              c.insertBefore(a[F++], ce);
          } else
            c.replaceChild(a[F++], p[L++]);
        } else
          L++;
      else
        p[L++].remove();
    }
  }
}
const Sh = "_$DX_DELEGATE";
function Z0(c, p, a, x = {}) {
  let w;
  return ef((C) => {
    w = C, p === document ? c() : Ji(p, c(), p.firstChild ? null : void 0, a);
  }, x.owner), () => {
    w(), p.textContent = "";
  };
}
function Jl(c, p, a) {
  let x;
  const w = () => {
    const L = document.createElement("template");
    return L.innerHTML = c, a ? L.content.firstChild.firstChild : L.content.firstChild;
  }, C = p ? () => (x || (x = w())).cloneNode(!0) : () => wi(() => document.importNode(x || (x = w()), !0));
  return C.cloneNode = C, C;
}
function ed(c, p = window.document) {
  const a = p[Sh] || (p[Sh] = /* @__PURE__ */ new Set());
  for (let x = 0, w = c.length; x < w; x++) {
    const C = c[x];
    a.has(C) || (a.add(C), p.addEventListener(C, ry));
  }
}
function mr(c, p, a) {
  a == null ? c.removeAttribute(p) : c.setAttribute(p, a);
}
function Q0(c, p, a, x) {
  x == null ? c.removeAttributeNS(p, a) : c.setAttributeNS(p, a, x);
}
function wn(c, p) {
  p == null ? c.removeAttribute("class") : c.className = p;
}
function J0(c, p, a, x) {
  if (x)
    Array.isArray(a) ? (c[`$$${p}`] = a[0], c[`$$${p}Data`] = a[1]) : c[`$$${p}`] = a;
  else if (Array.isArray(a)) {
    const w = a[0];
    c.addEventListener(p, a[0] = (C) => w.call(c, a[1], C));
  } else
    c.addEventListener(p, a);
}
function V0(c, p, a = {}) {
  const x = Object.keys(p || {}), w = Object.keys(a);
  let C, L;
  for (C = 0, L = w.length; C < L; C++) {
    const F = w[C];
    !F || F === "undefined" || p[F] || (Ch(c, F, !1), delete a[F]);
  }
  for (C = 0, L = x.length; C < L; C++) {
    const F = x[C], D = !!p[F];
    !F || F === "undefined" || a[F] === D || !D || (Ch(c, F, !0), a[F] = D);
  }
  return a;
}
function j0(c, p, a) {
  if (!p)
    return a ? mr(c, "style") : p;
  const x = c.style;
  if (typeof p == "string")
    return x.cssText = p;
  typeof a == "string" && (x.cssText = a = void 0), a || (a = {}), p || (p = {});
  let w, C;
  for (C in a)
    p[C] == null && x.removeProperty(C), delete a[C];
  for (C in p)
    w = p[C], w !== a[C] && (x.setProperty(C, w), a[C] = w);
  return a;
}
function ey(c, p = {}, a, x) {
  const w = {};
  return x || Yn(() => w.children = Ql(c, p.children, w.children)), Yn(() => p.ref && p.ref(c)), Yn(() => ty(c, p, a, !0, w, !0)), w;
}
function bu(c, p, a) {
  return wi(() => c(p, a));
}
function Ji(c, p, a, x) {
  if (a !== void 0 && !x && (x = []), typeof p != "function")
    return Ql(c, p, x, a);
  Yn((w) => Ql(c, p(), w, a), x);
}
function ty(c, p, a, x, w = {}, C = !1) {
  p || (p = {});
  for (const L in w)
    if (!(L in p)) {
      if (L === "children")
        continue;
      w[L] = _h(c, L, null, w[L], a, C);
    }
  for (const L in p) {
    if (L === "children") {
      x || Ql(c, p.children);
      continue;
    }
    const F = p[L];
    w[L] = _h(c, L, F, w[L], a, C);
  }
}
function ny(c) {
  return c.toLowerCase().replace(/-([a-z])/g, (p, a) => a.toUpperCase());
}
function Ch(c, p, a) {
  const x = p.trim().split(/\s+/);
  for (let w = 0, C = x.length; w < C; w++)
    c.classList.toggle(x[w], a);
}
function _h(c, p, a, x, w, C) {
  let L, F, D, P, R;
  if (p === "style")
    return j0(c, a, x);
  if (p === "classList")
    return V0(c, a, x);
  if (a === x)
    return x;
  if (p === "ref")
    C || a(c);
  else if (p.slice(0, 3) === "on:") {
    const $ = p.slice(3);
    x && c.removeEventListener($, x), a && c.addEventListener($, a);
  } else if (p.slice(0, 10) === "oncapture:") {
    const $ = p.slice(10);
    x && c.removeEventListener($, x, !0), a && c.addEventListener($, a, !0);
  } else if (p.slice(0, 2) === "on") {
    const $ = p.slice(2).toLowerCase(), V = $0.has($);
    if (!V && x) {
      const pe = Array.isArray(x) ? x[0] : x;
      c.removeEventListener($, pe);
    }
    (V || a) && (J0(c, $, a, V), V && ed([$]));
  } else if (p.slice(0, 5) === "attr:")
    mr(c, p.slice(5), a);
  else if ((R = p.slice(0, 5) === "prop:") || (D = U0.has(p)) || !w && ((P = K0(p, c.tagName)) || (F = z0.has(p))) || (L = c.nodeName.includes("-")))
    R && (p = p.slice(5), F = !0), p === "class" || p === "className" ? wn(c, a) : L && !F && !D ? c[ny(p)] = a : c[P || p] = a;
  else {
    const $ = w && p.indexOf(":") > -1 && X0[p.split(":")[0]];
    $ ? Q0(c, $, p, a) : mr(c, G0[p] || p, a);
  }
  return a;
}
function ry(c) {
  const p = `$$${c.type}`;
  let a = c.composedPath && c.composedPath()[0] || c.target;
  for (c.target !== a && Object.defineProperty(c, "target", {
    configurable: !0,
    value: a
  }), Object.defineProperty(c, "currentTarget", {
    configurable: !0,
    get() {
      return a || document;
    }
  }); a; ) {
    const x = a[p];
    if (x && !a.disabled) {
      const w = a[`${p}Data`];
      if (w !== void 0 ? x.call(a, w, c) : x.call(a, c), c.cancelBubble)
        return;
    }
    a = a._$host || a.parentNode || a.host;
  }
}
function Ql(c, p, a, x, w) {
  for (; typeof a == "function"; )
    a = a();
  if (p === a)
    return a;
  const C = typeof p, L = x !== void 0;
  if (c = L && a[0] && a[0].parentNode || c, C === "string" || C === "number")
    if (C === "number" && (p = p.toString()), L) {
      let F = a[0];
      F && F.nodeType === 3 ? F.data = p : F = document.createTextNode(p), a = Xl(c, a, x, F);
    } else
      a !== "" && typeof a == "string" ? a = c.firstChild.data = p : a = c.textContent = p;
  else if (p == null || C === "boolean")
    a = Xl(c, a, x);
  else {
    if (C === "function")
      return Yn(() => {
        let F = p();
        for (; typeof F == "function"; )
          F = F();
        a = Ql(c, F, a, x);
      }), () => a;
    if (Array.isArray(p)) {
      const F = [], D = a && Array.isArray(a);
      if (Fc(F, p, a, w))
        return Yn(() => a = Ql(c, F, a, x, !0)), () => a;
      if (F.length === 0) {
        if (a = Xl(c, a, x), L)
          return a;
      } else
        D ? a.length === 0 ? Lh(c, F, x) : Y0(c, a, F) : (a && Xl(c), Lh(c, F));
      a = F;
    } else if (p instanceof Node) {
      if (Array.isArray(a)) {
        if (L)
          return a = Xl(c, a, x, p);
        Xl(c, a, null, p);
      } else
        a == null || a === "" || !c.firstChild ? c.appendChild(p) : c.replaceChild(p, c.firstChild);
      a = p;
    } else
      console.warn("Unrecognized value. Skipped inserting", p);
  }
  return a;
}
function Fc(c, p, a, x) {
  let w = !1;
  for (let C = 0, L = p.length; C < L; C++) {
    let F = p[C], D = a && a[C];
    if (F instanceof Node)
      c.push(F);
    else if (!(F == null || F === !0 || F === !1))
      if (Array.isArray(F))
        w = Fc(c, F, D) || w;
      else if (typeof F == "function")
        if (x) {
          for (; typeof F == "function"; )
            F = F();
          w = Fc(c, Array.isArray(F) ? F : [F], Array.isArray(D) ? D : [D]) || w;
        } else
          c.push(F), w = !0;
      else {
        const P = String(F);
        D && D.nodeType === 3 ? (D.data = P, c.push(D)) : c.push(document.createTextNode(P));
      }
  }
  return w;
}
function Lh(c, p, a = null) {
  for (let x = 0, w = p.length; x < w; x++)
    c.insertBefore(p[x], a);
}
function Xl(c, p, a, x) {
  if (a === void 0)
    return c.textContent = "";
  const w = x || document.createTextNode("");
  if (p.length) {
    let C = !1;
    for (let L = p.length - 1; L >= 0; L--) {
      const F = p[L];
      if (w !== F) {
        const D = F.parentNode === c;
        !C && !L ? D ? c.replaceChild(w, F) : c.insertBefore(w, a) : D && F.remove();
      } else
        C = !0;
    }
  } else
    c.insertBefore(w, a);
  return [w];
}
var Yl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, pu = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(c, p) {
  (function() {
    var a, x = "4.17.21", w = 200, C = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", L = "Expected a function", F = "Invalid `variable` option passed into `_.template`", D = "__lodash_hash_undefined__", P = 500, R = "__lodash_placeholder__", $ = 1, V = 2, pe = 4, ce = 1, Le = 2, We = 1, Ze = 2, De = 4, we = 8, Ke = 16, Te = 32, Ee = 64, le = 128, yt = 256, mt = 512, Qt = 30, Zn = "...", Qn = 800, Pn = 16, Wt = 1, ae = 2, xr = 3, Bt = 1 / 0, k = 9007199254740991, b = 17976931348623157e292, ne = 0 / 0, re = 4294967295, he = re - 1, Me = re >>> 1, Mt = [
      ["ary", le],
      ["bind", We],
      ["bindKey", Ze],
      ["curry", we],
      ["curryRight", Ke],
      ["flip", mt],
      ["partial", Te],
      ["partialRight", Ee],
      ["rearg", yt]
    ], xt = "[object Arguments]", wt = "[object Array]", nt = "[object AsyncFunction]", et = "[object Boolean]", ke = "[object Date]", qo = "[object DOMException]", zr = "[object Error]", en = "[object Function]", Ko = "[object GeneratorFunction]", Gt = "[object Map]", Ur = "[object Number]", $o = "[object Null]", bn = "[object Object]", Ne = "[object Promise]", Xo = "[object Proxy]", eo = "[object RegExp]", an = "[object Set]", bi = "[object String]", Yo = "[object Symbol]", Vl = "[object Undefined]", wr = "[object WeakMap]", _u = "[object WeakSet]", to = "[object ArrayBuffer]", br = "[object DataView]", Zo = "[object Float32Array]", Gr = "[object Float64Array]", jl = "[object Int8Array]", qr = "[object Int16Array]", Kr = "[object Int32Array]", es = "[object Uint8Array]", Sn = "[object Uint8ClampedArray]", Qo = "[object Uint16Array]", fe = "[object Uint32Array]", ts = /\b__p \+= '';/g, tn = /\b(__p \+=) '' \+/g, rt = /(__e\(.*?\)|\b__t\)) \+\n'';/g, ct = /&(?:amp|lt|gt|quot|#39);/g, ns = /[&<>"']/g, fn = RegExp(ct.source), Si = RegExp(ns.source), qt = /<%-([\s\S]+?)%>/g, Lu = /<%([\s\S]+?)%>/g, Jo = /<%=([\s\S]+?)%>/g, no = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, rs = /^\w*$/, Tu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, is = /[\\^$.*+?()[\]{}|]/g, os = RegExp(is.source), ls = /^\s+/, ss = /\s/, vf = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, us = /\{\n\/\* \[wrapped with (.+)\] \*/, yf = /,? & /, mf = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, as = /[()=,{}\[\]\/\s]/, xf = /\\(\\)?/g, fs = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, $r = /\w*$/, wf = /^[-+]0x[0-9a-f]+$/i, bf = /^0b[01]+$/i, Vo = /^\[object .+?Constructor\]$/, cs = /^0o[0-7]+$/i, Ci = /^(?:0|[1-9]\d*)$/, Sf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Rn = /($^)/, hs = /['\n\r\u2028\u2029\\]/g, ro = "\\ud800-\\udfff", it = "\\u0300-\\u036f", ie = "\\ufe20-\\ufe2f", Xr = "\\u20d0-\\u20ff", jo = it + ie + Xr, Cn = "\\u2700-\\u27bf", Be = "a-z\\xdf-\\xf6\\xf8-\\xff", Yr = "\\xac\\xb1\\xd7\\xf7", io = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ds = "\\u2000-\\u206f", q = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ge = "A-Z\\xc0-\\xd6\\xd8-\\xde", el = "\\ufe0e\\ufe0f", tl = Yr + io + ds + q, _i = "['\u2019]", nl = "[" + ro + "]", ps = "[" + tl + "]", de = "[" + jo + "]", Au = "\\d+", ku = "[" + Cn + "]", oo = "[" + Be + "]", _n = "[^" + ro + tl + Au + Cn + Be + ge + "]", rl = "\\ud83c[\\udffb-\\udfff]", Fu = "(?:" + de + "|" + rl + ")", Li = "[^" + ro + "]", lo = "(?:\\ud83c[\\udde6-\\uddff]){2}", il = "[\\ud800-\\udbff][\\udc00-\\udfff]", Sr = "[" + ge + "]", gs = "\\u200d", vs = "(?:" + oo + "|" + _n + ")", Du = "(?:" + Sr + "|" + _n + ")", ys = "(?:" + _i + "(?:d|ll|m|re|s|t|ve))?", Eu = "(?:" + _i + "(?:D|LL|M|RE|S|T|VE))?", Mu = Fu + "?", ms = "[" + el + "]?", Jn = "(?:" + gs + "(?:" + [Li, lo, il].join("|") + ")" + ms + Mu + ")*", Cf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", _f = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", so = ms + Mu + Jn, uo = "(?:" + [ku, lo, il].join("|") + ")" + so, Lf = "(?:" + [Li + de + "?", de, lo, il, nl].join("|") + ")", Tf = RegExp(_i, "g"), Af = RegExp(de, "g"), xs = RegExp(rl + "(?=" + rl + ")|" + Lf + so, "g"), ws = RegExp([
      Sr + "?" + oo + "+" + ys + "(?=" + [ps, Sr, "$"].join("|") + ")",
      Du + "+" + Eu + "(?=" + [ps, Sr + vs, "$"].join("|") + ")",
      Sr + "?" + vs + "+" + ys,
      Sr + "+" + Eu,
      _f,
      Cf,
      Au,
      uo
    ].join("|"), "g"), Iu = RegExp("[" + gs + ro + jo + el + "]"), kf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Ou = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], Nu = -1, $e = {};
    $e[Zo] = $e[Gr] = $e[jl] = $e[qr] = $e[Kr] = $e[es] = $e[Sn] = $e[Qo] = $e[fe] = !0, $e[xt] = $e[wt] = $e[to] = $e[et] = $e[br] = $e[ke] = $e[zr] = $e[en] = $e[Gt] = $e[Ur] = $e[bn] = $e[eo] = $e[an] = $e[bi] = $e[wr] = !1;
    var qe = {};
    qe[xt] = qe[wt] = qe[to] = qe[br] = qe[et] = qe[ke] = qe[Zo] = qe[Gr] = qe[jl] = qe[qr] = qe[Kr] = qe[Gt] = qe[Ur] = qe[bn] = qe[eo] = qe[an] = qe[bi] = qe[Yo] = qe[es] = qe[Sn] = qe[Qo] = qe[fe] = !0, qe[zr] = qe[en] = qe[wr] = !1;
    var bs = {
      \u00C0: "A",
      \u00C1: "A",
      \u00C2: "A",
      \u00C3: "A",
      \u00C4: "A",
      \u00C5: "A",
      \u00E0: "a",
      \u00E1: "a",
      \u00E2: "a",
      \u00E3: "a",
      \u00E4: "a",
      \u00E5: "a",
      \u00C7: "C",
      \u00E7: "c",
      \u00D0: "D",
      \u00F0: "d",
      \u00C8: "E",
      \u00C9: "E",
      \u00CA: "E",
      \u00CB: "E",
      \u00E8: "e",
      \u00E9: "e",
      \u00EA: "e",
      \u00EB: "e",
      \u00CC: "I",
      \u00CD: "I",
      \u00CE: "I",
      \u00CF: "I",
      \u00EC: "i",
      \u00ED: "i",
      \u00EE: "i",
      \u00EF: "i",
      \u00D1: "N",
      \u00F1: "n",
      \u00D2: "O",
      \u00D3: "O",
      \u00D4: "O",
      \u00D5: "O",
      \u00D6: "O",
      \u00D8: "O",
      \u00F2: "o",
      \u00F3: "o",
      \u00F4: "o",
      \u00F5: "o",
      \u00F6: "o",
      \u00F8: "o",
      \u00D9: "U",
      \u00DA: "U",
      \u00DB: "U",
      \u00DC: "U",
      \u00F9: "u",
      \u00FA: "u",
      \u00FB: "u",
      \u00FC: "u",
      \u00DD: "Y",
      \u00FD: "y",
      \u00FF: "y",
      \u00C6: "Ae",
      \u00E6: "ae",
      \u00DE: "Th",
      \u00FE: "th",
      \u00DF: "ss",
      \u0100: "A",
      \u0102: "A",
      \u0104: "A",
      \u0101: "a",
      \u0103: "a",
      \u0105: "a",
      \u0106: "C",
      \u0108: "C",
      \u010A: "C",
      \u010C: "C",
      \u0107: "c",
      \u0109: "c",
      \u010B: "c",
      \u010D: "c",
      \u010E: "D",
      \u0110: "D",
      \u010F: "d",
      \u0111: "d",
      \u0112: "E",
      \u0114: "E",
      \u0116: "E",
      \u0118: "E",
      \u011A: "E",
      \u0113: "e",
      \u0115: "e",
      \u0117: "e",
      \u0119: "e",
      \u011B: "e",
      \u011C: "G",
      \u011E: "G",
      \u0120: "G",
      \u0122: "G",
      \u011D: "g",
      \u011F: "g",
      \u0121: "g",
      \u0123: "g",
      \u0124: "H",
      \u0126: "H",
      \u0125: "h",
      \u0127: "h",
      \u0128: "I",
      \u012A: "I",
      \u012C: "I",
      \u012E: "I",
      \u0130: "I",
      \u0129: "i",
      \u012B: "i",
      \u012D: "i",
      \u012F: "i",
      \u0131: "i",
      \u0134: "J",
      \u0135: "j",
      \u0136: "K",
      \u0137: "k",
      \u0138: "k",
      \u0139: "L",
      \u013B: "L",
      \u013D: "L",
      \u013F: "L",
      \u0141: "L",
      \u013A: "l",
      \u013C: "l",
      \u013E: "l",
      \u0140: "l",
      \u0142: "l",
      \u0143: "N",
      \u0145: "N",
      \u0147: "N",
      \u014A: "N",
      \u0144: "n",
      \u0146: "n",
      \u0148: "n",
      \u014B: "n",
      \u014C: "O",
      \u014E: "O",
      \u0150: "O",
      \u014D: "o",
      \u014F: "o",
      \u0151: "o",
      \u0154: "R",
      \u0156: "R",
      \u0158: "R",
      \u0155: "r",
      \u0157: "r",
      \u0159: "r",
      \u015A: "S",
      \u015C: "S",
      \u015E: "S",
      \u0160: "S",
      \u015B: "s",
      \u015D: "s",
      \u015F: "s",
      \u0161: "s",
      \u0162: "T",
      \u0164: "T",
      \u0166: "T",
      \u0163: "t",
      \u0165: "t",
      \u0167: "t",
      \u0168: "U",
      \u016A: "U",
      \u016C: "U",
      \u016E: "U",
      \u0170: "U",
      \u0172: "U",
      \u0169: "u",
      \u016B: "u",
      \u016D: "u",
      \u016F: "u",
      \u0171: "u",
      \u0173: "u",
      \u0174: "W",
      \u0175: "w",
      \u0176: "Y",
      \u0177: "y",
      \u0178: "Y",
      \u0179: "Z",
      \u017B: "Z",
      \u017D: "Z",
      \u017A: "z",
      \u017C: "z",
      \u017E: "z",
      \u0132: "IJ",
      \u0133: "ij",
      \u0152: "Oe",
      \u0153: "oe",
      \u0149: "'n",
      \u017F: "s"
    }, Pu = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, Ru = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, ol = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Ff = parseFloat, Wu = parseInt, cn = typeof Yl == "object" && Yl && Yl.Object === Object && Yl, Df = typeof self == "object" && self && self.Object === Object && self, It = cn || Df || Function("return this")(), ao = p && !p.nodeType && p, Cr = ao && !0 && c && !c.nodeType && c, Vn = Cr && Cr.exports === ao, fo = Vn && cn.process, ht = function() {
      try {
        var I = Cr && Cr.require && Cr.require("util").types;
        return I || fo && fo.binding && fo.binding("util");
      } catch {
      }
    }(), co = ht && ht.isArrayBuffer, ll = ht && ht.isDate, Zr = ht && ht.isMap, Bu = ht && ht.isRegExp, Hu = ht && ht.isSet, zu = ht && ht.isTypedArray;
    function nn(I, H, W) {
      switch (W.length) {
        case 0:
          return I.call(H);
        case 1:
          return I.call(H, W[0]);
        case 2:
          return I.call(H, W[0], W[1]);
        case 3:
          return I.call(H, W[0], W[1], W[2]);
      }
      return I.apply(H, W);
    }
    function Uu(I, H, W, te) {
      for (var xe = -1, Pe = I == null ? 0 : I.length; ++xe < Pe; ) {
        var ot = I[xe];
        H(te, ot, W(ot), I);
      }
      return te;
    }
    function rn(I, H) {
      for (var W = -1, te = I == null ? 0 : I.length; ++W < te && H(I[W], W, I) !== !1; )
        ;
      return I;
    }
    function Ef(I, H) {
      for (var W = I == null ? 0 : I.length; W-- && H(I[W], W, I) !== !1; )
        ;
      return I;
    }
    function Gu(I, H) {
      for (var W = -1, te = I == null ? 0 : I.length; ++W < te; )
        if (!H(I[W], W, I))
          return !1;
      return !0;
    }
    function _r(I, H) {
      for (var W = -1, te = I == null ? 0 : I.length, xe = 0, Pe = []; ++W < te; ) {
        var ot = I[W];
        H(ot, W, I) && (Pe[xe++] = ot);
      }
      return Pe;
    }
    function sl(I, H) {
      var W = I == null ? 0 : I.length;
      return !!W && Qr(I, H, 0) > -1;
    }
    function ul(I, H, W) {
      for (var te = -1, xe = I == null ? 0 : I.length; ++te < xe; )
        if (W(H, I[te]))
          return !0;
      return !1;
    }
    function Ve(I, H) {
      for (var W = -1, te = I == null ? 0 : I.length, xe = Array(te); ++W < te; )
        xe[W] = H(I[W], W, I);
      return xe;
    }
    function jn(I, H) {
      for (var W = -1, te = H.length, xe = I.length; ++W < te; )
        I[xe + W] = H[W];
      return I;
    }
    function Ti(I, H, W, te) {
      var xe = -1, Pe = I == null ? 0 : I.length;
      for (te && Pe && (W = I[++xe]); ++xe < Pe; )
        W = H(W, I[xe], xe, I);
      return W;
    }
    function Ai(I, H, W, te) {
      var xe = I == null ? 0 : I.length;
      for (te && xe && (W = I[--xe]); xe--; )
        W = H(W, I[xe], xe, I);
      return W;
    }
    function Ss(I, H) {
      for (var W = -1, te = I == null ? 0 : I.length; ++W < te; )
        if (H(I[W], W, I))
          return !0;
      return !1;
    }
    var Mf = _s("length");
    function If(I) {
      return I.split("");
    }
    function ho(I) {
      return I.match(mf) || [];
    }
    function dt(I, H, W) {
      var te;
      return W(I, function(xe, Pe, ot) {
        if (H(xe, Pe, ot))
          return te = Pe, !1;
      }), te;
    }
    function al(I, H, W, te) {
      for (var xe = I.length, Pe = W + (te ? 1 : -1); te ? Pe-- : ++Pe < xe; )
        if (H(I[Pe], Pe, I))
          return Pe;
      return -1;
    }
    function Qr(I, H, W) {
      return H === H ? Rf(I, H, W) : al(I, qu, W);
    }
    function po(I, H, W, te) {
      for (var xe = W - 1, Pe = I.length; ++xe < Pe; )
        if (te(I[xe], H))
          return xe;
      return -1;
    }
    function qu(I) {
      return I !== I;
    }
    function Cs(I, H) {
      var W = I == null ? 0 : I.length;
      return W ? Ts(I, H) / W : ne;
    }
    function _s(I) {
      return function(H) {
        return H == null ? a : H[I];
      };
    }
    function go(I) {
      return function(H) {
        return I == null ? a : I[H];
      };
    }
    function Ls(I, H, W, te, xe) {
      return xe(I, function(Pe, ot, Ye) {
        W = te ? (te = !1, Pe) : H(W, Pe, ot, Ye);
      }), W;
    }
    function Of(I, H) {
      var W = I.length;
      for (I.sort(H); W--; )
        I[W] = I[W].value;
      return I;
    }
    function Ts(I, H) {
      for (var W, te = -1, xe = I.length; ++te < xe; ) {
        var Pe = H(I[te]);
        Pe !== a && (W = W === a ? Pe : W + Pe);
      }
      return W;
    }
    function fl(I, H) {
      for (var W = -1, te = Array(I); ++W < I; )
        te[W] = H(W);
      return te;
    }
    function Ku(I, H) {
      return Ve(H, function(W) {
        return [W, I[W]];
      });
    }
    function $u(I) {
      return I && I.slice(0, Fi(I) + 1).replace(ls, "");
    }
    function Ot(I) {
      return function(H) {
        return I(H);
      };
    }
    function Ln(I, H) {
      return Ve(H, function(W) {
        return I[W];
      });
    }
    function Lr(I, H) {
      return I.has(H);
    }
    function cl(I, H) {
      for (var W = -1, te = I.length; ++W < te && Qr(H, I[W], 0) > -1; )
        ;
      return W;
    }
    function As(I, H) {
      for (var W = I.length; W-- && Qr(H, I[W], 0) > -1; )
        ;
      return W;
    }
    function Wn(I, H) {
      for (var W = I.length, te = 0; W--; )
        I[W] === H && ++te;
      return te;
    }
    var Jr = go(bs), ks = go(Pu);
    function Nf(I) {
      return "\\" + ol[I];
    }
    function Xu(I, H) {
      return I == null ? a : I[H];
    }
    function ki(I) {
      return Iu.test(I);
    }
    function Yu(I) {
      return kf.test(I);
    }
    function Fs(I) {
      for (var H, W = []; !(H = I.next()).done; )
        W.push(H.value);
      return W;
    }
    function Tr(I) {
      var H = -1, W = Array(I.size);
      return I.forEach(function(te, xe) {
        W[++H] = [xe, te];
      }), W;
    }
    function Tn(I, H) {
      return function(W) {
        return I(H(W));
      };
    }
    function er(I, H) {
      for (var W = -1, te = I.length, xe = 0, Pe = []; ++W < te; ) {
        var ot = I[W];
        (ot === H || ot === R) && (I[W] = R, Pe[xe++] = W);
      }
      return Pe;
    }
    function vo(I) {
      var H = -1, W = Array(I.size);
      return I.forEach(function(te) {
        W[++H] = te;
      }), W;
    }
    function Pf(I) {
      var H = -1, W = Array(I.size);
      return I.forEach(function(te) {
        W[++H] = [te, te];
      }), W;
    }
    function Rf(I, H, W) {
      for (var te = W - 1, xe = I.length; ++te < xe; )
        if (I[te] === H)
          return te;
      return -1;
    }
    function Wf(I, H, W) {
      for (var te = W + 1; te--; )
        if (I[te] === H)
          return te;
      return te;
    }
    function Vr(I) {
      return ki(I) ? Qu(I) : Mf(I);
    }
    function hn(I) {
      return ki(I) ? Ds(I) : If(I);
    }
    function Fi(I) {
      for (var H = I.length; H-- && ss.test(I.charAt(H)); )
        ;
      return H;
    }
    var Zu = go(Ru);
    function Qu(I) {
      for (var H = xs.lastIndex = 0; xs.test(I); )
        ++H;
      return H;
    }
    function Ds(I) {
      return I.match(xs) || [];
    }
    function hl(I) {
      return I.match(ws) || [];
    }
    var Ju = function I(H) {
      H = H == null ? It : tr.defaults(It.Object(), H, tr.pick(It, Ou));
      var W = H.Array, te = H.Date, xe = H.Error, Pe = H.Function, ot = H.Math, Ye = H.Object, Es = H.RegExp, Bf = H.String, At = H.TypeError, nr = W.prototype, Di = Pe.prototype, Ar = Ye.prototype, Ei = H["__core-js_shared__"], yo = Di.toString, He = Ar.hasOwnProperty, jr = 0, kr = function() {
        var n = /[^.]+$/.exec(Ei && Ei.keys && Ei.keys.IE_PROTO || "");
        return n ? "Symbol(src)_1." + n : "";
      }(), kt = Ar.toString, Fr = yo.call(Ye), Dr = It._, dl = Es(
        "^" + yo.call(He).replace(is, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), pl = Vn ? H.Buffer : a, rr = H.Symbol, Er = H.Uint8Array, Ms = pl ? pl.allocUnsafe : a, Mi = Tn(Ye.getPrototypeOf, Ye), mo = Ye.create, Vu = Ar.propertyIsEnumerable, Ii = nr.splice, Is = rr ? rr.isConcatSpreadable : a, ei = rr ? rr.iterator : a, ir = rr ? rr.toStringTag : a, or = function() {
        try {
          var n = vn(Ye, "defineProperty");
          return n({}, "", {}), n;
        } catch {
        }
      }(), gl = H.clearTimeout !== It.clearTimeout && H.clearTimeout, ju = te && te.now !== It.Date.now && te.now, vl = H.setTimeout !== It.setTimeout && H.setTimeout, yl = ot.ceil, ml = ot.floor, Os = Ye.getOwnPropertySymbols, Ns = pl ? pl.isBuffer : a, xl = H.isFinite, Oi = nr.join, xo = Tn(Ye.keys, Ye), bt = ot.max, St = ot.min, ea = te.now, wo = H.parseInt, Ps = ot.random, ti = nr.reverse, ni = vn(H, "DataView"), An = vn(H, "Map"), ri = vn(H, "Promise"), kn = vn(H, "Set"), Ni = vn(H, "WeakMap"), Pi = vn(Ye, "create"), bo = Ni && new Ni(), Ri = {}, ii = st(ni), oi = st(An), Hf = st(ri), zf = st(kn), Uf = st(Ni), wl = rr ? rr.prototype : a, So = wl ? wl.valueOf : a, ta = wl ? wl.toString : a;
      function m(n) {
        if (vt(n) && !be(n) && !(n instanceof Se)) {
          if (n instanceof ze)
            return n;
          if (He.call(n, "__wrapped__"))
            return ut(n);
        }
        return new ze(n);
      }
      var je = function() {
        function n() {
        }
        return function(o) {
          if (!ft(o))
            return {};
          if (mo)
            return mo(o);
          n.prototype = o;
          var s = new n();
          return n.prototype = a, s;
        };
      }();
      function Ct() {
      }
      function ze(n, o) {
        this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!o, this.__index__ = 0, this.__values__ = a;
      }
      m.templateSettings = {
        escape: qt,
        evaluate: Lu,
        interpolate: Jo,
        variable: "",
        imports: {
          _: m
        }
      }, m.prototype = Ct.prototype, m.prototype.constructor = m, ze.prototype = je(Ct.prototype), ze.prototype.constructor = ze;
      function Se(n) {
        this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = re, this.__views__ = [];
      }
      function Gf() {
        var n = new Se(this.__wrapped__);
        return n.__actions__ = Xt(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = Xt(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = Xt(this.__views__), n;
      }
      function bl() {
        if (this.__filtered__) {
          var n = new Se(this);
          n.__dir__ = -1, n.__filtered__ = !0;
        } else
          n = this.clone(), n.__dir__ *= -1;
        return n;
      }
      function qf() {
        var n = this.__wrapped__.value(), o = this.__dir__, s = be(n), h = o < 0, y = s ? n.length : 0, S = oc(0, y, this.__views__), A = S.start, E = S.end, N = E - A, U = h ? E : A - 1, G = this.__iteratees__, K = G.length, ee = 0, ue = St(N, this.__takeCount__);
        if (!s || !h && y == N && ue == N)
          return Nl(n, this.__actions__);
        var ve = [];
        e:
          for (; N-- && ee < ue; ) {
            U += o;
            for (var Ae = -1, ye = n[U]; ++Ae < K; ) {
              var Ie = G[Ae], Oe = Ie.iteratee, In = Ie.type, un = Oe(ye);
              if (In == ae)
                ye = un;
              else if (!un) {
                if (In == Wt)
                  continue e;
                break e;
              }
            }
            ve[ee++] = ye;
          }
        return ve;
      }
      Se.prototype = je(Ct.prototype), Se.prototype.constructor = Se;
      function li(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.clear(); ++o < s; ) {
          var h = n[o];
          this.set(h[0], h[1]);
        }
      }
      function Kf() {
        this.__data__ = Pi ? Pi(null) : {}, this.size = 0;
      }
      function Rs(n) {
        var o = this.has(n) && delete this.__data__[n];
        return this.size -= o ? 1 : 0, o;
      }
      function na(n) {
        var o = this.__data__;
        if (Pi) {
          var s = o[n];
          return s === D ? a : s;
        }
        return He.call(o, n) ? o[n] : a;
      }
      function Ws(n) {
        var o = this.__data__;
        return Pi ? o[n] !== a : He.call(o, n);
      }
      function $f(n, o) {
        var s = this.__data__;
        return this.size += this.has(n) ? 0 : 1, s[n] = Pi && o === a ? D : o, this;
      }
      li.prototype.clear = Kf, li.prototype.delete = Rs, li.prototype.get = na, li.prototype.has = Ws, li.prototype.set = $f;
      function Fn(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.clear(); ++o < s; ) {
          var h = n[o];
          this.set(h[0], h[1]);
        }
      }
      function Bs() {
        this.__data__ = [], this.size = 0;
      }
      function ra(n) {
        var o = this.__data__, s = Lo(o, n);
        if (s < 0)
          return !1;
        var h = o.length - 1;
        return s == h ? o.pop() : Ii.call(o, s, 1), --this.size, !0;
      }
      function ia(n) {
        var o = this.__data__, s = Lo(o, n);
        return s < 0 ? a : o[s][1];
      }
      function Hs(n) {
        return Lo(this.__data__, n) > -1;
      }
      function oa(n, o) {
        var s = this.__data__, h = Lo(s, n);
        return h < 0 ? (++this.size, s.push([n, o])) : s[h][1] = o, this;
      }
      Fn.prototype.clear = Bs, Fn.prototype.delete = ra, Fn.prototype.get = ia, Fn.prototype.has = Hs, Fn.prototype.set = oa;
      function on(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.clear(); ++o < s; ) {
          var h = n[o];
          this.set(h[0], h[1]);
        }
      }
      function Xf() {
        this.size = 0, this.__data__ = {
          hash: new li(),
          map: new (An || Fn)(),
          string: new li()
        };
      }
      function Sl(n) {
        var o = zo(this, n).delete(n);
        return this.size -= o ? 1 : 0, o;
      }
      function lr(n) {
        return zo(this, n).get(n);
      }
      function la(n) {
        return zo(this, n).has(n);
      }
      function Yf(n, o) {
        var s = zo(this, n), h = s.size;
        return s.set(n, o), this.size += s.size == h ? 0 : 1, this;
      }
      on.prototype.clear = Xf, on.prototype.delete = Sl, on.prototype.get = lr, on.prototype.has = la, on.prototype.set = Yf;
      function Mr(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.__data__ = new on(); ++o < s; )
          this.add(n[o]);
      }
      function ln(n) {
        return this.__data__.set(n, D), this;
      }
      function Re(n) {
        return this.__data__.has(n);
      }
      Mr.prototype.add = Mr.prototype.push = ln, Mr.prototype.has = Re;
      function lt(n) {
        var o = this.__data__ = new Fn(n);
        this.size = o.size;
      }
      function Ir() {
        this.__data__ = new Fn(), this.size = 0;
      }
      function Or(n) {
        var o = this.__data__, s = o.delete(n);
        return this.size = o.size, s;
      }
      function sa(n) {
        return this.__data__.get(n);
      }
      function zs(n) {
        return this.__data__.has(n);
      }
      function ua(n, o) {
        var s = this.__data__;
        if (s instanceof Fn) {
          var h = s.__data__;
          if (!An || h.length < w - 1)
            return h.push([n, o]), this.size = ++s.size, this;
          s = this.__data__ = new on(h);
        }
        return s.set(n, o), this.size = s.size, this;
      }
      lt.prototype.clear = Ir, lt.prototype.delete = Or, lt.prototype.get = sa, lt.prototype.has = zs, lt.prototype.set = ua;
      function aa(n, o) {
        var s = be(n), h = !s && Uo(n), y = !s && !h && Qi(n), S = !s && !h && !y && Kl(n), A = s || h || y || S, E = A ? fl(n.length, Bf) : [], N = E.length;
        for (var U in n)
          (o || He.call(n, U)) && !(A && (U == "length" || y && (U == "offset" || U == "parent") || S && (U == "buffer" || U == "byteLength" || U == "byteOffset") || l(U, N))) && E.push(U);
        return E;
      }
      function Cl(n) {
        var o = n.length;
        return o ? n[Qs(0, o - 1)] : a;
      }
      function Co(n, o) {
        return Nt(Xt(n), si(o, 0, n.length));
      }
      function fa(n) {
        return Nt(Xt(n));
      }
      function _o(n, o, s) {
        (s !== a && !vr(n[o], s) || s === a && !(o in n)) && Dn(n, o, s);
      }
      function dn(n, o, s) {
        var h = n[o];
        (!(He.call(n, o) && vr(h, s)) || s === a && !(o in n)) && Dn(n, o, s);
      }
      function Lo(n, o) {
        for (var s = n.length; s--; )
          if (vr(n[s][0], o))
            return s;
        return -1;
      }
      function ca(n, o, s, h) {
        return Nr(n, function(y, S, A) {
          o(h, y, s(y), A);
        }), h;
      }
      function ha(n, o) {
        return n && Un(o, Ut(o), n);
      }
      function _l(n, o) {
        return n && Un(o, mn(o), n);
      }
      function Dn(n, o, s) {
        o == "__proto__" && or ? or(n, o, {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0
        }) : n[o] = s;
      }
      function Ll(n, o) {
        for (var s = -1, h = o.length, y = W(h), S = n == null; ++s < h; )
          y[s] = S ? a : dc(n, o[s]);
        return y;
      }
      function si(n, o, s) {
        return n === n && (s !== a && (n = n <= s ? n : s), o !== a && (n = n >= o ? n : o)), n;
      }
      function sn(n, o, s, h, y, S) {
        var A, E = o & $, N = o & V, U = o & pe;
        if (s && (A = y ? s(n, h, y, S) : s(n)), A !== a)
          return A;
        if (!ft(n))
          return n;
        var G = be(n);
        if (G) {
          if (A = ql(n), !E)
            return Xt(n, A);
        } else {
          var K = Fe(n), ee = K == en || K == Ko;
          if (Qi(n))
            return Aa(n, E);
          if (K == bn || K == xt || ee && !y) {
            if (A = N || ee ? {} : e(n), !E)
              return N ? Wo(n, _l(A, n)) : tu(n, ha(A, n));
          } else {
            if (!qe[K])
              return y ? n : {};
            A = t(n, K, E);
          }
        }
        S || (S = new lt());
        var ue = S.get(n);
        if (ue)
          return ue;
        S.set(n, A), lh(n) ? n.forEach(function(ye) {
          A.add(sn(ye, o, s, ye, n, S));
        }) : ih(n) && n.forEach(function(ye, Ie) {
          A.set(Ie, sn(ye, o, s, Ie, n, S));
        });
        var ve = U ? N ? Gl : Ho : N ? mn : Ut, Ae = G ? a : ve(n);
        return rn(Ae || n, function(ye, Ie) {
          Ae && (Ie = ye, ye = n[Ie]), dn(A, Ie, sn(ye, o, s, Ie, n, S));
        }), A;
      }
      function Zf(n) {
        var o = Ut(n);
        return function(s) {
          return da(s, n, o);
        };
      }
      function da(n, o, s) {
        var h = s.length;
        if (n == null)
          return !h;
        for (n = Ye(n); h--; ) {
          var y = s[h], S = o[y], A = n[y];
          if (A === a && !(y in n) || !S(A))
            return !1;
        }
        return !0;
      }
      function To(n, o, s) {
        if (typeof n != "function")
          throw new At(L);
        return me(function() {
          n.apply(a, s);
        }, o);
      }
      function Wi(n, o, s, h) {
        var y = -1, S = sl, A = !0, E = n.length, N = [], U = o.length;
        if (!E)
          return N;
        s && (o = Ve(o, Ot(s))), h ? (S = ul, A = !1) : o.length >= w && (S = Lr, A = !1, o = new Mr(o));
        e:
          for (; ++y < E; ) {
            var G = n[y], K = s == null ? G : s(G);
            if (G = h || G !== 0 ? G : 0, A && K === K) {
              for (var ee = U; ee--; )
                if (o[ee] === K)
                  continue e;
              N.push(G);
            } else
              S(o, K, h) || N.push(G);
          }
        return N;
      }
      var Nr = nu(Bn), pa = nu(Tl, !0);
      function ga(n, o) {
        var s = !0;
        return Nr(n, function(h, y, S) {
          return s = !!o(h, y, S), s;
        }), s;
      }
      function sr(n, o, s) {
        for (var h = -1, y = n.length; ++h < y; ) {
          var S = n[h], A = o(S);
          if (A != null && (E === a ? A === A && !Mn(A) : s(A, E)))
            var E = A, N = S;
        }
        return N;
      }
      function Us(n, o, s, h) {
        var y = n.length;
        for (s = _e(s), s < 0 && (s = -s > y ? 0 : y + s), h = h === a || h > y ? y : _e(h), h < 0 && (h += y), h = s > h ? 0 : uh(h); s < h; )
          n[s++] = o;
        return n;
      }
      function Ao(n, o) {
        var s = [];
        return Nr(n, function(h, y, S) {
          o(h, y, S) && s.push(h);
        }), s;
      }
      function Ft(n, o, s, h, y) {
        var S = -1, A = n.length;
        for (s || (s = r), y || (y = []); ++S < A; ) {
          var E = n[S];
          o > 0 && s(E) ? o > 1 ? Ft(E, o - 1, s, h, y) : jn(y, E) : h || (y[y.length] = E);
        }
        return y;
      }
      var ko = Ia(), Gs = Ia(!0);
      function Bn(n, o) {
        return n && ko(n, o, Ut);
      }
      function Tl(n, o) {
        return n && Gs(n, o, Ut);
      }
      function pt(n, o) {
        return _r(o, function(s) {
          return gi(n[s]);
        });
      }
      function Hn(n, o) {
        o = hr(o, n);
        for (var s = 0, h = o.length; n != null && s < h; )
          n = n[Ge(o[s++])];
        return s && s == h ? n : a;
      }
      function qs(n, o, s) {
        var h = o(n);
        return be(n) ? h : jn(h, s(n));
      }
      function Ht(n) {
        return n == null ? n === a ? Vl : $o : ir && ir in Ye(n) ? ic(n) : Z(n);
      }
      function Al(n, o) {
        return n > o;
      }
      function Bi(n, o) {
        return n != null && He.call(n, o);
      }
      function kl(n, o) {
        return n != null && o in Ye(n);
      }
      function va(n, o, s) {
        return n >= St(o, s) && n < bt(o, s);
      }
      function Fl(n, o, s) {
        for (var h = s ? ul : sl, y = n[0].length, S = n.length, A = S, E = W(S), N = 1 / 0, U = []; A--; ) {
          var G = n[A];
          A && o && (G = Ve(G, Ot(o))), N = St(G.length, N), E[A] = !s && (o || y >= 120 && G.length >= 120) ? new Mr(A && G) : a;
        }
        G = n[0];
        var K = -1, ee = E[0];
        e:
          for (; ++K < y && U.length < N; ) {
            var ue = G[K], ve = o ? o(ue) : ue;
            if (ue = s || ue !== 0 ? ue : 0, !(ee ? Lr(ee, ve) : h(U, ve, s))) {
              for (A = S; --A; ) {
                var Ae = E[A];
                if (!(Ae ? Lr(Ae, ve) : h(n[A], ve, s)))
                  continue e;
              }
              ee && ee.push(ve), U.push(ue);
            }
          }
        return U;
      }
      function ya(n, o, s, h) {
        return Bn(n, function(y, S, A) {
          o(h, s(y), S, A);
        }), h;
      }
      function zn(n, o, s) {
        o = hr(o, n), n = Y(n, o);
        var h = n == null ? n : n[Ge(Kn(o))];
        return h == null ? a : nn(h, n, s);
      }
      function Ks(n) {
        return vt(n) && Ht(n) == xt;
      }
      function Dl(n) {
        return vt(n) && Ht(n) == to;
      }
      function ma(n) {
        return vt(n) && Ht(n) == ke;
      }
      function ur(n, o, s, h, y) {
        return n === o ? !0 : n == null || o == null || !vt(n) && !vt(o) ? n !== n && o !== o : Qf(n, o, s, h, ur, y);
      }
      function Qf(n, o, s, h, y, S) {
        var A = be(n), E = be(o), N = A ? wt : Fe(n), U = E ? wt : Fe(o);
        N = N == xt ? bn : N, U = U == xt ? bn : U;
        var G = N == bn, K = U == bn, ee = N == U;
        if (ee && Qi(n)) {
          if (!Qi(o))
            return !1;
          A = !0, G = !1;
        }
        if (ee && !G)
          return S || (S = new lt()), A || Kl(n) ? Ul(n, o, s, h, y, S) : Ba(n, o, N, s, h, y, S);
        if (!(s & ce)) {
          var ue = G && He.call(n, "__wrapped__"), ve = K && He.call(o, "__wrapped__");
          if (ue || ve) {
            var Ae = ue ? n.value() : n, ye = ve ? o.value() : o;
            return S || (S = new lt()), y(Ae, ye, s, h, S);
          }
        }
        return ee ? (S || (S = new lt()), Ha(n, o, s, h, y, S)) : !1;
      }
      function Hi(n) {
        return vt(n) && Fe(n) == Gt;
      }
      function El(n, o, s, h) {
        var y = s.length, S = y, A = !h;
        if (n == null)
          return !S;
        for (n = Ye(n); y--; ) {
          var E = s[y];
          if (A && E[2] ? E[1] !== n[E[0]] : !(E[0] in n))
            return !1;
        }
        for (; ++y < S; ) {
          E = s[y];
          var N = E[0], U = n[N], G = E[1];
          if (A && E[2]) {
            if (U === a && !(N in n))
              return !1;
          } else {
            var K = new lt();
            if (h)
              var ee = h(U, G, N, n, o, K);
            if (!(ee === a ? ur(G, U, ce | Le, h, K) : ee))
              return !1;
          }
        }
        return !0;
      }
      function $s(n) {
        if (!ft(n) || v(n))
          return !1;
        var o = gi(n) ? dl : Vo;
        return o.test(st(n));
      }
      function xa(n) {
        return vt(n) && Ht(n) == eo;
      }
      function Fo(n) {
        return vt(n) && Fe(n) == an;
      }
      function Do(n) {
        return vt(n) && Ya(n.length) && !!$e[Ht(n)];
      }
      function zi(n) {
        return typeof n == "function" ? n : n == null ? xn : typeof n == "object" ? be(n) ? ai(n[0], n[1]) : ar(n) : xh(n);
      }
      function ui(n) {
        if (!T(n))
          return xo(n);
        var o = [];
        for (var s in Ye(n))
          He.call(n, s) && s != "constructor" && o.push(s);
        return o;
      }
      function wa(n) {
        if (!ft(n))
          return X(n);
        var o = T(n), s = [];
        for (var h in n)
          h == "constructor" && (o || !He.call(n, h)) || s.push(h);
        return s;
      }
      function Xs(n, o) {
        return n < o;
      }
      function Ys(n, o) {
        var s = -1, h = yn(n) ? W(n.length) : [];
        return Nr(n, function(y, S, A) {
          h[++s] = o(y, S, A);
        }), h;
      }
      function ar(n) {
        var o = su(n);
        return o.length == 1 && o[0][2] ? M(o[0][0], o[0][1]) : function(s) {
          return s === n || El(s, n, o);
        };
      }
      function ai(n, o) {
        return f(n) && O(o) ? M(Ge(n), o) : function(s) {
          var h = dc(s, n);
          return h === a && h === o ? pc(s, n) : ur(o, h, ce | Le);
        };
      }
      function Pr(n, o, s, h, y) {
        n !== o && ko(o, function(S, A) {
          if (y || (y = new lt()), ft(S))
            Jf(n, o, A, s, Pr, h, y);
          else {
            var E = h ? h(se(n, A), S, A + "", n, o, y) : a;
            E === a && (E = S), _o(n, A, E);
          }
        }, mn);
      }
      function Jf(n, o, s, h, y, S, A) {
        var E = se(n, s), N = se(o, s), U = A.get(N);
        if (U) {
          _o(n, s, U);
          return;
        }
        var G = S ? S(E, N, s + "", n, o, A) : a, K = G === a;
        if (K) {
          var ee = be(N), ue = !ee && Qi(N), ve = !ee && !ue && Kl(N);
          G = N, ee || ue || ve ? be(E) ? G = E : Lt(E) ? G = Xt(E) : ue ? (K = !1, G = Aa(N, !0)) : ve ? (K = !1, G = Da(N, !0)) : G = [] : fu(N) || Uo(N) ? (G = E, Uo(E) ? G = ah(E) : (!ft(E) || gi(E)) && (G = e(N))) : K = !1;
        }
        K && (A.set(N, G), y(G, N, h, S, A), A.delete(N)), _o(n, s, G);
      }
      function Zs(n, o) {
        var s = n.length;
        if (!!s)
          return o += o < 0 ? s : 0, l(o, s) ? n[o] : a;
      }
      function ba(n, o, s) {
        o.length ? o = Ve(o, function(S) {
          return be(S) ? function(A) {
            return Hn(A, S.length === 1 ? S[0] : S);
          } : S;
        }) : o = [xn];
        var h = -1;
        o = Ve(o, Ot(Q()));
        var y = Ys(n, function(S, A, E) {
          var N = Ve(o, function(U) {
            return U(S);
          });
          return { criteria: N, index: ++h, value: S };
        });
        return Of(y, function(S, A) {
          return Ea(S, A, s);
        });
      }
      function Vf(n, o) {
        return Sa(n, o, function(s, h) {
          return pc(n, h);
        });
      }
      function Sa(n, o, s) {
        for (var h = -1, y = o.length, S = {}; ++h < y; ) {
          var A = o[h], E = Hn(n, A);
          s(E, A) && Eo(S, hr(A, n), E);
        }
        return S;
      }
      function Kt(n) {
        return function(o) {
          return Hn(o, n);
        };
      }
      function Ml(n, o, s, h) {
        var y = h ? po : Qr, S = -1, A = o.length, E = n;
        for (n === o && (o = Xt(o)), s && (E = Ve(n, Ot(s))); ++S < A; )
          for (var N = 0, U = o[S], G = s ? s(U) : U; (N = y(E, G, N, h)) > -1; )
            E !== n && Ii.call(E, N, 1), Ii.call(n, N, 1);
        return n;
      }
      function Ca(n, o) {
        for (var s = n ? o.length : 0, h = s - 1; s--; ) {
          var y = o[s];
          if (s == h || y !== S) {
            var S = y;
            l(y) ? Ii.call(n, y, 1) : Ol(n, y);
          }
        }
        return n;
      }
      function Qs(n, o) {
        return n + ml(Ps() * (o - n + 1));
      }
      function jf(n, o, s, h) {
        for (var y = -1, S = bt(yl((o - n) / (s || 1)), 0), A = W(S); S--; )
          A[h ? S : ++y] = n, n += s;
        return A;
      }
      function Il(n, o) {
        var s = "";
        if (!n || o < 1 || o > k)
          return s;
        do
          o % 2 && (s += n), o = ml(o / 2), o && (n += n);
        while (o);
        return s;
      }
      function Ce(n, o) {
        return Ue(J(n, o, xn), n + "");
      }
      function _a(n) {
        return Cl($l(n));
      }
      function ec(n, o) {
        var s = $l(n);
        return Nt(s, si(o, 0, s.length));
      }
      function Eo(n, o, s, h) {
        if (!ft(n))
          return n;
        o = hr(o, n);
        for (var y = -1, S = o.length, A = S - 1, E = n; E != null && ++y < S; ) {
          var N = Ge(o[y]), U = s;
          if (N === "__proto__" || N === "constructor" || N === "prototype")
            return n;
          if (y != A) {
            var G = E[N];
            U = h ? h(G, N, E) : a, U === a && (U = ft(G) ? G : l(o[y + 1]) ? [] : {});
          }
          dn(E, N, U), E = E[N];
        }
        return n;
      }
      var La = bo ? function(n, o) {
        return bo.set(n, o), n;
      } : xn, Rr = or ? function(n, o) {
        return or(n, "toString", {
          configurable: !0,
          enumerable: !1,
          value: vc(o),
          writable: !0
        });
      } : xn;
      function Mo(n) {
        return Nt($l(n));
      }
      function $t(n, o, s) {
        var h = -1, y = n.length;
        o < 0 && (o = -o > y ? 0 : y + o), s = s > y ? y : s, s < 0 && (s += y), y = o > s ? 0 : s - o >>> 0, o >>>= 0;
        for (var S = W(y); ++h < y; )
          S[h] = n[h + o];
        return S;
      }
      function Io(n, o) {
        var s;
        return Nr(n, function(h, y, S) {
          return s = o(h, y, S), !s;
        }), !!s;
      }
      function pn(n, o, s) {
        var h = 0, y = n == null ? h : n.length;
        if (typeof o == "number" && o === o && y <= Me) {
          for (; h < y; ) {
            var S = h + y >>> 1, A = n[S];
            A !== null && !Mn(A) && (s ? A <= o : A < o) ? h = S + 1 : y = S;
          }
          return y;
        }
        return Js(n, o, xn, s);
      }
      function Js(n, o, s, h) {
        var y = 0, S = n == null ? 0 : n.length;
        if (S === 0)
          return 0;
        o = s(o);
        for (var A = o !== o, E = o === null, N = Mn(o), U = o === a; y < S; ) {
          var G = ml((y + S) / 2), K = s(n[G]), ee = K !== a, ue = K === null, ve = K === K, Ae = Mn(K);
          if (A)
            var ye = h || ve;
          else
            U ? ye = ve && (h || ee) : E ? ye = ve && ee && (h || !ue) : N ? ye = ve && ee && !ue && (h || !Ae) : ue || Ae ? ye = !1 : ye = h ? K <= o : K < o;
          ye ? y = G + 1 : S = G;
        }
        return St(S, he);
      }
      function Ta(n, o) {
        for (var s = -1, h = n.length, y = 0, S = []; ++s < h; ) {
          var A = n[s], E = o ? o(A) : A;
          if (!s || !vr(E, N)) {
            var N = E;
            S[y++] = A === 0 ? 0 : A;
          }
        }
        return S;
      }
      function fi(n) {
        return typeof n == "number" ? n : Mn(n) ? ne : +n;
      }
      function Jt(n) {
        if (typeof n == "string")
          return n;
        if (be(n))
          return Ve(n, Jt) + "";
        if (Mn(n))
          return ta ? ta.call(n) : "";
        var o = n + "";
        return o == "0" && 1 / n == -Bt ? "-0" : o;
      }
      function fr(n, o, s) {
        var h = -1, y = sl, S = n.length, A = !0, E = [], N = E;
        if (s)
          A = !1, y = ul;
        else if (S >= w) {
          var U = o ? null : Qe(n);
          if (U)
            return vo(U);
          A = !1, y = Lr, N = new Mr();
        } else
          N = o ? [] : E;
        e:
          for (; ++h < S; ) {
            var G = n[h], K = o ? o(G) : G;
            if (G = s || G !== 0 ? G : 0, A && K === K) {
              for (var ee = N.length; ee--; )
                if (N[ee] === K)
                  continue e;
              o && N.push(K), E.push(G);
            } else
              y(N, K, s) || (N !== E && N.push(K), E.push(G));
          }
        return E;
      }
      function Ol(n, o) {
        return o = hr(o, n), n = Y(n, o), n == null || delete n[Ge(Kn(o))];
      }
      function Oo(n, o, s, h) {
        return Eo(n, o, s(Hn(n, o)), h);
      }
      function cr(n, o, s, h) {
        for (var y = n.length, S = h ? y : -1; (h ? S-- : ++S < y) && o(n[S], S, n); )
          ;
        return s ? $t(n, h ? 0 : S, h ? S + 1 : y) : $t(n, h ? S + 1 : 0, h ? y : S);
      }
      function Nl(n, o) {
        var s = n;
        return s instanceof Se && (s = s.value()), Ti(o, function(h, y) {
          return y.func.apply(y.thisArg, jn([h], y.args));
        }, s);
      }
      function No(n, o, s) {
        var h = n.length;
        if (h < 2)
          return h ? fr(n[0]) : [];
        for (var y = -1, S = W(h); ++y < h; )
          for (var A = n[y], E = -1; ++E < h; )
            E != y && (S[y] = Wi(S[y] || A, n[E], o, s));
        return fr(Ft(S, 1), o, s);
      }
      function Pl(n, o, s) {
        for (var h = -1, y = n.length, S = o.length, A = {}; ++h < y; ) {
          var E = h < S ? o[h] : a;
          s(A, n[h], E);
        }
        return A;
      }
      function Vs(n) {
        return Lt(n) ? n : [];
      }
      function ci(n) {
        return typeof n == "function" ? n : xn;
      }
      function hr(n, o) {
        return be(n) ? n : f(n, o) ? [n] : zt(Xe(n));
      }
      var tc = Ce;
      function dr(n, o, s) {
        var h = n.length;
        return s = s === a ? h : s, !o && s >= h ? n : $t(n, o, s);
      }
      var Po = gl || function(n) {
        return It.clearTimeout(n);
      };
      function Aa(n, o) {
        if (o)
          return n.slice();
        var s = n.length, h = Ms ? Ms(s) : new n.constructor(s);
        return n.copy(h), h;
      }
      function js(n) {
        var o = new n.constructor(n.byteLength);
        return new Er(o).set(new Er(n)), o;
      }
      function Ro(n, o) {
        var s = o ? js(n.buffer) : n.buffer;
        return new n.constructor(s, n.byteOffset, n.byteLength);
      }
      function ka(n) {
        var o = new n.constructor(n.source, $r.exec(n));
        return o.lastIndex = n.lastIndex, o;
      }
      function Fa(n) {
        return So ? Ye(So.call(n)) : {};
      }
      function Da(n, o) {
        var s = o ? js(n.buffer) : n.buffer;
        return new n.constructor(s, n.byteOffset, n.length);
      }
      function Rl(n, o) {
        if (n !== o) {
          var s = n !== a, h = n === null, y = n === n, S = Mn(n), A = o !== a, E = o === null, N = o === o, U = Mn(o);
          if (!E && !U && !S && n > o || S && A && N && !E && !U || h && A && N || !s && N || !y)
            return 1;
          if (!h && !S && !U && n < o || U && s && y && !h && !S || E && s && y || !A && y || !N)
            return -1;
        }
        return 0;
      }
      function Ea(n, o, s) {
        for (var h = -1, y = n.criteria, S = o.criteria, A = y.length, E = s.length; ++h < A; ) {
          var N = Rl(y[h], S[h]);
          if (N) {
            if (h >= E)
              return N;
            var U = s[h];
            return N * (U == "desc" ? -1 : 1);
          }
        }
        return n.index - o.index;
      }
      function Ma(n, o, s, h) {
        for (var y = -1, S = n.length, A = s.length, E = -1, N = o.length, U = bt(S - A, 0), G = W(N + U), K = !h; ++E < N; )
          G[E] = o[E];
        for (; ++y < A; )
          (K || y < S) && (G[s[y]] = n[y]);
        for (; U--; )
          G[E++] = n[y++];
        return G;
      }
      function eu(n, o, s, h) {
        for (var y = -1, S = n.length, A = -1, E = s.length, N = -1, U = o.length, G = bt(S - E, 0), K = W(G + U), ee = !h; ++y < G; )
          K[y] = n[y];
        for (var ue = y; ++N < U; )
          K[ue + N] = o[N];
        for (; ++A < E; )
          (ee || y < S) && (K[ue + s[A]] = n[y++]);
        return K;
      }
      function Xt(n, o) {
        var s = -1, h = n.length;
        for (o || (o = W(h)); ++s < h; )
          o[s] = n[s];
        return o;
      }
      function Un(n, o, s, h) {
        var y = !s;
        s || (s = {});
        for (var S = -1, A = o.length; ++S < A; ) {
          var E = o[S], N = h ? h(s[E], n[E], E, s, n) : a;
          N === a && (N = n[E]), y ? Dn(s, E, N) : dn(s, E, N);
        }
        return s;
      }
      function tu(n, o) {
        return Un(n, Yi(n), o);
      }
      function Wo(n, o) {
        return Un(n, za(n), o);
      }
      function Wr(n, o) {
        return function(s, h) {
          var y = be(s) ? Uu : ca, S = o ? o() : {};
          return y(s, n, Q(h, 2), S);
        };
      }
      function Ui(n) {
        return Ce(function(o, s) {
          var h = -1, y = s.length, S = y > 1 ? s[y - 1] : a, A = y > 2 ? s[2] : a;
          for (S = n.length > 3 && typeof S == "function" ? (y--, S) : a, A && u(s[0], s[1], A) && (S = y < 3 ? a : S, y = 1), o = Ye(o); ++h < y; ) {
            var E = s[h];
            E && n(o, E, h, S);
          }
          return o;
        });
      }
      function nu(n, o) {
        return function(s, h) {
          if (s == null)
            return s;
          if (!yn(s))
            return n(s, h);
          for (var y = s.length, S = o ? y : -1, A = Ye(s); (o ? S-- : ++S < y) && h(A[S], S, A) !== !1; )
            ;
          return s;
        };
      }
      function Ia(n) {
        return function(o, s, h) {
          for (var y = -1, S = Ye(o), A = h(o), E = A.length; E--; ) {
            var N = A[n ? E : ++y];
            if (s(S[N], N, S) === !1)
              break;
          }
          return o;
        };
      }
      function nc(n, o, s) {
        var h = o & We, y = qi(n);
        function S() {
          var A = this && this !== It && this instanceof S ? y : n;
          return A.apply(h ? s : this, arguments);
        }
        return S;
      }
      function Oa(n) {
        return function(o) {
          o = Xe(o);
          var s = ki(o) ? hn(o) : a, h = s ? s[0] : o.charAt(0), y = s ? dr(s, 1).join("") : o.slice(1);
          return h[n]() + y;
        };
      }
      function Gi(n) {
        return function(o) {
          return Ti(yh(vh(o).replace(Tf, "")), n, "");
        };
      }
      function qi(n) {
        return function() {
          var o = arguments;
          switch (o.length) {
            case 0:
              return new n();
            case 1:
              return new n(o[0]);
            case 2:
              return new n(o[0], o[1]);
            case 3:
              return new n(o[0], o[1], o[2]);
            case 4:
              return new n(o[0], o[1], o[2], o[3]);
            case 5:
              return new n(o[0], o[1], o[2], o[3], o[4]);
            case 6:
              return new n(o[0], o[1], o[2], o[3], o[4], o[5]);
            case 7:
              return new n(o[0], o[1], o[2], o[3], o[4], o[5], o[6]);
          }
          var s = je(n.prototype), h = n.apply(s, o);
          return ft(h) ? h : s;
        };
      }
      function rc(n, o, s) {
        var h = qi(n);
        function y() {
          for (var S = arguments.length, A = W(S), E = S, N = hi(y); E--; )
            A[E] = arguments[E];
          var U = S < 3 && A[0] !== N && A[S - 1] !== N ? [] : er(A, N);
          if (S -= U.length, S < s)
            return Ra(
              n,
              o,
              Ki,
              y.placeholder,
              a,
              A,
              U,
              a,
              a,
              s - S
            );
          var G = this && this !== It && this instanceof y ? h : n;
          return nn(G, this, A);
        }
        return y;
      }
      function Na(n) {
        return function(o, s, h) {
          var y = Ye(o);
          if (!yn(o)) {
            var S = Q(s, 3);
            o = Ut(o), s = function(E) {
              return S(y[E], E, y);
            };
          }
          var A = n(o, s, h);
          return A > -1 ? y[S ? o[A] : A] : a;
        };
      }
      function ru(n) {
        return Gn(function(o) {
          var s = o.length, h = s, y = ze.prototype.thru;
          for (n && o.reverse(); h--; ) {
            var S = o[h];
            if (typeof S != "function")
              throw new At(L);
            if (y && !A && Xi(S) == "wrapper")
              var A = new ze([], !0);
          }
          for (h = A ? h : s; ++h < s; ) {
            S = o[h];
            var E = Xi(S), N = E == "wrapper" ? lu(S) : a;
            N && g(N[0]) && N[1] == (le | we | Te | yt) && !N[4].length && N[9] == 1 ? A = A[Xi(N[0])].apply(A, N[3]) : A = S.length == 1 && g(S) ? A[E]() : A.thru(S);
          }
          return function() {
            var U = arguments, G = U[0];
            if (A && U.length == 1 && be(G))
              return A.plant(G).value();
            for (var K = 0, ee = s ? o[K].apply(this, U) : G; ++K < s; )
              ee = o[K].call(this, ee);
            return ee;
          };
        });
      }
      function Ki(n, o, s, h, y, S, A, E, N, U) {
        var G = o & le, K = o & We, ee = o & Ze, ue = o & (we | Ke), ve = o & mt, Ae = ee ? a : qi(n);
        function ye() {
          for (var Ie = arguments.length, Oe = W(Ie), In = Ie; In--; )
            Oe[In] = arguments[In];
          if (ue)
            var un = hi(ye), On = Wn(Oe, un);
          if (h && (Oe = Ma(Oe, h, y, ue)), S && (Oe = eu(Oe, S, A, ue)), Ie -= On, ue && Ie < U) {
            var Tt = er(Oe, un);
            return Ra(
              n,
              o,
              Ki,
              ye.placeholder,
              s,
              Oe,
              Tt,
              E,
              N,
              U - Ie
            );
          }
          var yr = K ? s : this, yi = ee ? yr[n] : n;
          return Ie = Oe.length, E ? Oe = j(Oe, E) : ve && Ie > 1 && Oe.reverse(), G && N < Ie && (Oe.length = N), this && this !== It && this instanceof ye && (yi = Ae || qi(yi)), yi.apply(yr, Oe);
        }
        return ye;
      }
      function iu(n, o) {
        return function(s, h) {
          return ya(s, n, o(h), {});
        };
      }
      function Wl(n, o) {
        return function(s, h) {
          var y;
          if (s === a && h === a)
            return o;
          if (s !== a && (y = s), h !== a) {
            if (y === a)
              return h;
            typeof s == "string" || typeof h == "string" ? (s = Jt(s), h = Jt(h)) : (s = fi(s), h = fi(h)), y = n(s, h);
          }
          return y;
        };
      }
      function Bl(n) {
        return Gn(function(o) {
          return o = Ve(o, Ot(Q())), Ce(function(s) {
            var h = this;
            return n(o, function(y) {
              return nn(y, h, s);
            });
          });
        });
      }
      function pr(n, o) {
        o = o === a ? " " : Jt(o);
        var s = o.length;
        if (s < 2)
          return s ? Il(o, n) : o;
        var h = Il(o, yl(n / Vr(o)));
        return ki(o) ? dr(hn(h), 0, n).join("") : h.slice(0, n);
      }
      function Pa(n, o, s, h) {
        var y = o & We, S = qi(n);
        function A() {
          for (var E = -1, N = arguments.length, U = -1, G = h.length, K = W(G + N), ee = this && this !== It && this instanceof A ? S : n; ++U < G; )
            K[U] = h[U];
          for (; N--; )
            K[U++] = arguments[++E];
          return nn(ee, y ? s : this, K);
        }
        return A;
      }
      function Bo(n) {
        return function(o, s, h) {
          return h && typeof h != "number" && u(o, s, h) && (s = h = a), o = vi(o), s === a ? (s = o, o = 0) : s = vi(s), h = h === a ? o < s ? 1 : -1 : vi(h), jf(o, s, h, n);
        };
      }
      function Hl(n) {
        return function(o, s) {
          return typeof o == "string" && typeof s == "string" || (o = $n(o), s = $n(s)), n(o, s);
        };
      }
      function Ra(n, o, s, h, y, S, A, E, N, U) {
        var G = o & we, K = G ? A : a, ee = G ? a : A, ue = G ? S : a, ve = G ? a : S;
        o |= G ? Te : Ee, o &= ~(G ? Ee : Te), o & De || (o &= ~(We | Ze));
        var Ae = [
          n,
          o,
          y,
          ue,
          K,
          ve,
          ee,
          E,
          N,
          U
        ], ye = s.apply(a, Ae);
        return g(n) && oe(ye, Ae), ye.placeholder = h, gt(ye, n, o);
      }
      function ou(n) {
        var o = ot[n];
        return function(s, h) {
          if (s = $n(s), h = h == null ? 0 : St(_e(h), 292), h && xl(s)) {
            var y = (Xe(s) + "e").split("e"), S = o(y[0] + "e" + (+y[1] + h));
            return y = (Xe(S) + "e").split("e"), +(y[0] + "e" + (+y[1] - h));
          }
          return o(s);
        };
      }
      var Qe = kn && 1 / vo(new kn([, -0]))[1] == Bt ? function(n) {
        return new kn(n);
      } : xc;
      function Wa(n) {
        return function(o) {
          var s = Fe(o);
          return s == Gt ? Tr(o) : s == an ? Pf(o) : Ku(o, n(o));
        };
      }
      function En(n, o, s, h, y, S, A, E) {
        var N = o & Ze;
        if (!N && typeof n != "function")
          throw new At(L);
        var U = h ? h.length : 0;
        if (U || (o &= ~(Te | Ee), h = y = a), A = A === a ? A : bt(_e(A), 0), E = E === a ? E : _e(E), U -= y ? y.length : 0, o & Ee) {
          var G = h, K = y;
          h = y = a;
        }
        var ee = N ? a : lu(n), ue = [
          n,
          o,
          s,
          h,
          y,
          G,
          K,
          S,
          A,
          E
        ];
        if (ee && z(ue, ee), n = ue[0], o = ue[1], s = ue[2], h = ue[3], y = ue[4], E = ue[9] = ue[9] === a ? N ? 0 : n.length : bt(ue[9] - U, 0), !E && o & (we | Ke) && (o &= ~(we | Ke)), !o || o == We)
          var ve = nc(n, o, s);
        else
          o == we || o == Ke ? ve = rc(n, o, E) : (o == Te || o == (We | Te)) && !y.length ? ve = Pa(n, o, s, h) : ve = Ki.apply(a, ue);
        var Ae = ee ? La : oe;
        return gt(Ae(ve, ue), n, o);
      }
      function $i(n, o, s, h) {
        return n === a || vr(n, Ar[s]) && !He.call(h, s) ? o : n;
      }
      function gn(n, o, s, h, y, S) {
        return ft(n) && ft(o) && (S.set(o, n), Pr(n, o, a, gn, S), S.delete(o)), n;
      }
      function zl(n) {
        return fu(n) ? a : n;
      }
      function Ul(n, o, s, h, y, S) {
        var A = s & ce, E = n.length, N = o.length;
        if (E != N && !(A && N > E))
          return !1;
        var U = S.get(n), G = S.get(o);
        if (U && G)
          return U == o && G == n;
        var K = -1, ee = !0, ue = s & Le ? new Mr() : a;
        for (S.set(n, o), S.set(o, n); ++K < E; ) {
          var ve = n[K], Ae = o[K];
          if (h)
            var ye = A ? h(Ae, ve, K, o, n, S) : h(ve, Ae, K, n, o, S);
          if (ye !== a) {
            if (ye)
              continue;
            ee = !1;
            break;
          }
          if (ue) {
            if (!Ss(o, function(Ie, Oe) {
              if (!Lr(ue, Oe) && (ve === Ie || y(ve, Ie, s, h, S)))
                return ue.push(Oe);
            })) {
              ee = !1;
              break;
            }
          } else if (!(ve === Ae || y(ve, Ae, s, h, S))) {
            ee = !1;
            break;
          }
        }
        return S.delete(n), S.delete(o), ee;
      }
      function Ba(n, o, s, h, y, S, A) {
        switch (s) {
          case br:
            if (n.byteLength != o.byteLength || n.byteOffset != o.byteOffset)
              return !1;
            n = n.buffer, o = o.buffer;
          case to:
            return !(n.byteLength != o.byteLength || !S(new Er(n), new Er(o)));
          case et:
          case ke:
          case Ur:
            return vr(+n, +o);
          case zr:
            return n.name == o.name && n.message == o.message;
          case eo:
          case bi:
            return n == o + "";
          case Gt:
            var E = Tr;
          case an:
            var N = h & ce;
            if (E || (E = vo), n.size != o.size && !N)
              return !1;
            var U = A.get(n);
            if (U)
              return U == o;
            h |= Le, A.set(n, o);
            var G = Ul(E(n), E(o), h, y, S, A);
            return A.delete(n), G;
          case Yo:
            if (So)
              return So.call(n) == So.call(o);
        }
        return !1;
      }
      function Ha(n, o, s, h, y, S) {
        var A = s & ce, E = Ho(n), N = E.length, U = Ho(o), G = U.length;
        if (N != G && !A)
          return !1;
        for (var K = N; K--; ) {
          var ee = E[K];
          if (!(A ? ee in o : He.call(o, ee)))
            return !1;
        }
        var ue = S.get(n), ve = S.get(o);
        if (ue && ve)
          return ue == o && ve == n;
        var Ae = !0;
        S.set(n, o), S.set(o, n);
        for (var ye = A; ++K < N; ) {
          ee = E[K];
          var Ie = n[ee], Oe = o[ee];
          if (h)
            var In = A ? h(Oe, Ie, ee, o, n, S) : h(Ie, Oe, ee, n, o, S);
          if (!(In === a ? Ie === Oe || y(Ie, Oe, s, h, S) : In)) {
            Ae = !1;
            break;
          }
          ye || (ye = ee == "constructor");
        }
        if (Ae && !ye) {
          var un = n.constructor, On = o.constructor;
          un != On && "constructor" in n && "constructor" in o && !(typeof un == "function" && un instanceof un && typeof On == "function" && On instanceof On) && (Ae = !1);
        }
        return S.delete(n), S.delete(o), Ae;
      }
      function Gn(n) {
        return Ue(J(n, a, pi), n + "");
      }
      function Ho(n) {
        return qs(n, Ut, Yi);
      }
      function Gl(n) {
        return qs(n, mn, za);
      }
      var lu = bo ? function(n) {
        return bo.get(n);
      } : xc;
      function Xi(n) {
        for (var o = n.name + "", s = Ri[o], h = He.call(Ri, o) ? s.length : 0; h--; ) {
          var y = s[h], S = y.func;
          if (S == null || S == n)
            return y.name;
        }
        return o;
      }
      function hi(n) {
        var o = He.call(m, "placeholder") ? m : n;
        return o.placeholder;
      }
      function Q() {
        var n = m.iteratee || yc;
        return n = n === yc ? zi : n, arguments.length ? n(arguments[0], arguments[1]) : n;
      }
      function zo(n, o) {
        var s = n.__data__;
        return d(o) ? s[typeof o == "string" ? "string" : "hash"] : s.map;
      }
      function su(n) {
        for (var o = Ut(n), s = o.length; s--; ) {
          var h = o[s], y = n[h];
          o[s] = [h, y, O(y)];
        }
        return o;
      }
      function vn(n, o) {
        var s = Xu(n, o);
        return $s(s) ? s : a;
      }
      function ic(n) {
        var o = He.call(n, ir), s = n[ir];
        try {
          n[ir] = a;
          var h = !0;
        } catch {
        }
        var y = kt.call(n);
        return h && (o ? n[ir] = s : delete n[ir]), y;
      }
      var Yi = Os ? function(n) {
        return n == null ? [] : (n = Ye(n), _r(Os(n), function(o) {
          return Vu.call(n, o);
        }));
      } : wc, za = Os ? function(n) {
        for (var o = []; n; )
          jn(o, Yi(n)), n = Mi(n);
        return o;
      } : wc, Fe = Ht;
      (ni && Fe(new ni(new ArrayBuffer(1))) != br || An && Fe(new An()) != Gt || ri && Fe(ri.resolve()) != Ne || kn && Fe(new kn()) != an || Ni && Fe(new Ni()) != wr) && (Fe = function(n) {
        var o = Ht(n), s = o == bn ? n.constructor : a, h = s ? st(s) : "";
        if (h)
          switch (h) {
            case ii:
              return br;
            case oi:
              return Gt;
            case Hf:
              return Ne;
            case zf:
              return an;
            case Uf:
              return wr;
          }
        return o;
      });
      function oc(n, o, s) {
        for (var h = -1, y = s.length; ++h < y; ) {
          var S = s[h], A = S.size;
          switch (S.type) {
            case "drop":
              n += A;
              break;
            case "dropRight":
              o -= A;
              break;
            case "take":
              o = St(o, n + A);
              break;
            case "takeRight":
              n = bt(n, o - A);
              break;
          }
        }
        return { start: n, end: o };
      }
      function lc(n) {
        var o = n.match(us);
        return o ? o[1].split(yf) : [];
      }
      function Ua(n, o, s) {
        o = hr(o, n);
        for (var h = -1, y = o.length, S = !1; ++h < y; ) {
          var A = Ge(o[h]);
          if (!(S = n != null && s(n, A)))
            break;
          n = n[A];
        }
        return S || ++h != y ? S : (y = n == null ? 0 : n.length, !!y && Ya(y) && l(A, y) && (be(n) || Uo(n)));
      }
      function ql(n) {
        var o = n.length, s = new n.constructor(o);
        return o && typeof n[0] == "string" && He.call(n, "index") && (s.index = n.index, s.input = n.input), s;
      }
      function e(n) {
        return typeof n.constructor == "function" && !T(n) ? je(Mi(n)) : {};
      }
      function t(n, o, s) {
        var h = n.constructor;
        switch (o) {
          case to:
            return js(n);
          case et:
          case ke:
            return new h(+n);
          case br:
            return Ro(n, s);
          case Zo:
          case Gr:
          case jl:
          case qr:
          case Kr:
          case es:
          case Sn:
          case Qo:
          case fe:
            return Da(n, s);
          case Gt:
            return new h();
          case Ur:
          case bi:
            return new h(n);
          case eo:
            return ka(n);
          case an:
            return new h();
          case Yo:
            return Fa(n);
        }
      }
      function i(n, o) {
        var s = o.length;
        if (!s)
          return n;
        var h = s - 1;
        return o[h] = (s > 1 ? "& " : "") + o[h], o = o.join(s > 2 ? ", " : " "), n.replace(vf, `{
/* [wrapped with ` + o + `] */
`);
      }
      function r(n) {
        return be(n) || Uo(n) || !!(Is && n && n[Is]);
      }
      function l(n, o) {
        var s = typeof n;
        return o = o == null ? k : o, !!o && (s == "number" || s != "symbol" && Ci.test(n)) && n > -1 && n % 1 == 0 && n < o;
      }
      function u(n, o, s) {
        if (!ft(s))
          return !1;
        var h = typeof o;
        return (h == "number" ? yn(s) && l(o, s.length) : h == "string" && o in s) ? vr(s[o], n) : !1;
      }
      function f(n, o) {
        if (be(n))
          return !1;
        var s = typeof n;
        return s == "number" || s == "symbol" || s == "boolean" || n == null || Mn(n) ? !0 : rs.test(n) || !no.test(n) || o != null && n in Ye(o);
      }
      function d(n) {
        var o = typeof n;
        return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? n !== "__proto__" : n === null;
      }
      function g(n) {
        var o = Xi(n), s = m[o];
        if (typeof s != "function" || !(o in Se.prototype))
          return !1;
        if (n === s)
          return !0;
        var h = lu(s);
        return !!h && n === h[0];
      }
      function v(n) {
        return !!kr && kr in n;
      }
      var _ = Ei ? gi : bc;
      function T(n) {
        var o = n && n.constructor, s = typeof o == "function" && o.prototype || Ar;
        return n === s;
      }
      function O(n) {
        return n === n && !ft(n);
      }
      function M(n, o) {
        return function(s) {
          return s == null ? !1 : s[n] === o && (o !== a || n in Ye(s));
        };
      }
      function B(n) {
        var o = $a(n, function(h) {
          return s.size === P && s.clear(), h;
        }), s = o.cache;
        return o;
      }
      function z(n, o) {
        var s = n[1], h = o[1], y = s | h, S = y < (We | Ze | le), A = h == le && s == we || h == le && s == yt && n[7].length <= o[8] || h == (le | yt) && o[7].length <= o[8] && s == we;
        if (!(S || A))
          return n;
        h & We && (n[2] = o[2], y |= s & We ? 0 : De);
        var E = o[3];
        if (E) {
          var N = n[3];
          n[3] = N ? Ma(N, E, o[4]) : E, n[4] = N ? er(n[3], R) : o[4];
        }
        return E = o[5], E && (N = n[5], n[5] = N ? eu(N, E, o[6]) : E, n[6] = N ? er(n[5], R) : o[6]), E = o[7], E && (n[7] = E), h & le && (n[8] = n[8] == null ? o[8] : St(n[8], o[8])), n[9] == null && (n[9] = o[9]), n[0] = o[0], n[1] = y, n;
      }
      function X(n) {
        var o = [];
        if (n != null)
          for (var s in Ye(n))
            o.push(s);
        return o;
      }
      function Z(n) {
        return kt.call(n);
      }
      function J(n, o, s) {
        return o = bt(o === a ? n.length - 1 : o, 0), function() {
          for (var h = arguments, y = -1, S = bt(h.length - o, 0), A = W(S); ++y < S; )
            A[y] = h[o + y];
          y = -1;
          for (var E = W(o + 1); ++y < o; )
            E[y] = h[y];
          return E[o] = s(A), nn(n, this, E);
        };
      }
      function Y(n, o) {
        return o.length < 2 ? n : Hn(n, $t(o, 0, -1));
      }
      function j(n, o) {
        for (var s = n.length, h = St(o.length, s), y = Xt(n); h--; ) {
          var S = o[h];
          n[h] = l(S, s) ? y[S] : a;
        }
        return n;
      }
      function se(n, o) {
        if (!(o === "constructor" && typeof n[o] == "function") && o != "__proto__")
          return n[o];
      }
      var oe = Je(La), me = vl || function(n, o) {
        return It.setTimeout(n, o);
      }, Ue = Je(Rr);
      function gt(n, o, s) {
        var h = o + "";
        return Ue(n, i(h, Dt(lc(h), s)));
      }
      function Je(n) {
        var o = 0, s = 0;
        return function() {
          var h = ea(), y = Pn - (h - s);
          if (s = h, y > 0) {
            if (++o >= Qn)
              return arguments[0];
          } else
            o = 0;
          return n.apply(a, arguments);
        };
      }
      function Nt(n, o) {
        var s = -1, h = n.length, y = h - 1;
        for (o = o === a ? h : o; ++s < o; ) {
          var S = Qs(s, y), A = n[S];
          n[S] = n[s], n[s] = A;
        }
        return n.length = o, n;
      }
      var zt = B(function(n) {
        var o = [];
        return n.charCodeAt(0) === 46 && o.push(""), n.replace(Tu, function(s, h, y, S) {
          o.push(y ? S.replace(xf, "$1") : h || s);
        }), o;
      });
      function Ge(n) {
        if (typeof n == "string" || Mn(n))
          return n;
        var o = n + "";
        return o == "0" && 1 / n == -Bt ? "-0" : o;
      }
      function st(n) {
        if (n != null) {
          try {
            return yo.call(n);
          } catch {
          }
          try {
            return n + "";
          } catch {
          }
        }
        return "";
      }
      function Dt(n, o) {
        return rn(Mt, function(s) {
          var h = "_." + s[0];
          o & s[1] && !sl(n, h) && n.push(h);
        }), n.sort();
      }
      function ut(n) {
        if (n instanceof Se)
          return n.clone();
        var o = new ze(n.__wrapped__, n.__chain__);
        return o.__actions__ = Xt(n.__actions__), o.__index__ = n.__index__, o.__values__ = n.__values__, o;
      }
      function at(n, o, s) {
        (s ? u(n, o, s) : o === a) ? o = 1 : o = bt(_e(o), 0);
        var h = n == null ? 0 : n.length;
        if (!h || o < 1)
          return [];
        for (var y = 0, S = 0, A = W(yl(h / o)); y < h; )
          A[S++] = $t(n, y, y += o);
        return A;
      }
      function tt(n) {
        for (var o = -1, s = n == null ? 0 : n.length, h = 0, y = []; ++o < s; ) {
          var S = n[o];
          S && (y[h++] = S);
        }
        return y;
      }
      function Yt() {
        var n = arguments.length;
        if (!n)
          return [];
        for (var o = W(n - 1), s = arguments[0], h = n; h--; )
          o[h - 1] = arguments[h];
        return jn(be(s) ? Xt(s) : [s], Ft(o, 1));
      }
      var Zi = Ce(function(n, o) {
        return Lt(n) ? Wi(n, Ft(o, 1, Lt, !0)) : [];
      }), Br = Ce(function(n, o) {
        var s = Kn(o);
        return Lt(s) && (s = a), Lt(n) ? Wi(n, Ft(o, 1, Lt, !0), Q(s, 2)) : [];
      }), Pt = Ce(function(n, o) {
        var s = Kn(o);
        return Lt(s) && (s = a), Lt(n) ? Wi(n, Ft(o, 1, Lt, !0), a, s) : [];
      });
      function qn(n, o, s) {
        var h = n == null ? 0 : n.length;
        return h ? (o = s || o === a ? 1 : _e(o), $t(n, o < 0 ? 0 : o, h)) : [];
      }
      function _t(n, o, s) {
        var h = n == null ? 0 : n.length;
        return h ? (o = s || o === a ? 1 : _e(o), o = h - o, $t(n, 0, o < 0 ? 0 : o)) : [];
      }
      function uu(n, o) {
        return n && n.length ? cr(n, Q(o, 3), !0, !0) : [];
      }
      function gr(n, o) {
        return n && n.length ? cr(n, Q(o, 3), !0) : [];
      }
      function di(n, o, s, h) {
        var y = n == null ? 0 : n.length;
        return y ? (s && typeof s != "number" && u(n, o, s) && (s = 0, h = y), Us(n, o, s, h)) : [];
      }
      function Hr(n, o, s) {
        var h = n == null ? 0 : n.length;
        if (!h)
          return -1;
        var y = s == null ? 0 : _e(s);
        return y < 0 && (y = bt(h + y, 0)), al(n, Q(o, 3), y);
      }
      function Rt(n, o, s) {
        var h = n == null ? 0 : n.length;
        if (!h)
          return -1;
        var y = h - 1;
        return s !== a && (y = _e(s), y = s < 0 ? bt(h + y, 0) : St(y, h - 1)), al(n, Q(o, 3), y, !0);
      }
      function pi(n) {
        var o = n == null ? 0 : n.length;
        return o ? Ft(n, 1) : [];
      }
      function au(n) {
        var o = n == null ? 0 : n.length;
        return o ? Ft(n, Bt) : [];
      }
      function Ad(n, o) {
        var s = n == null ? 0 : n.length;
        return s ? (o = o === a ? 1 : _e(o), Ft(n, o)) : [];
      }
      function kd(n) {
        for (var o = -1, s = n == null ? 0 : n.length, h = {}; ++o < s; ) {
          var y = n[o];
          h[y[0]] = y[1];
        }
        return h;
      }
      function qc(n) {
        return n && n.length ? n[0] : a;
      }
      function Fd(n, o, s) {
        var h = n == null ? 0 : n.length;
        if (!h)
          return -1;
        var y = s == null ? 0 : _e(s);
        return y < 0 && (y = bt(h + y, 0)), Qr(n, o, y);
      }
      function Dd(n) {
        var o = n == null ? 0 : n.length;
        return o ? $t(n, 0, -1) : [];
      }
      var Ed = Ce(function(n) {
        var o = Ve(n, Vs);
        return o.length && o[0] === n[0] ? Fl(o) : [];
      }), Md = Ce(function(n) {
        var o = Kn(n), s = Ve(n, Vs);
        return o === Kn(s) ? o = a : s.pop(), s.length && s[0] === n[0] ? Fl(s, Q(o, 2)) : [];
      }), Id = Ce(function(n) {
        var o = Kn(n), s = Ve(n, Vs);
        return o = typeof o == "function" ? o : a, o && s.pop(), s.length && s[0] === n[0] ? Fl(s, a, o) : [];
      });
      function Od(n, o) {
        return n == null ? "" : Oi.call(n, o);
      }
      function Kn(n) {
        var o = n == null ? 0 : n.length;
        return o ? n[o - 1] : a;
      }
      function Nd(n, o, s) {
        var h = n == null ? 0 : n.length;
        if (!h)
          return -1;
        var y = h;
        return s !== a && (y = _e(s), y = y < 0 ? bt(h + y, 0) : St(y, h - 1)), o === o ? Wf(n, o, y) : al(n, qu, y, !0);
      }
      function Pd(n, o) {
        return n && n.length ? Zs(n, _e(o)) : a;
      }
      var Rd = Ce(Kc);
      function Kc(n, o) {
        return n && n.length && o && o.length ? Ml(n, o) : n;
      }
      function Wd(n, o, s) {
        return n && n.length && o && o.length ? Ml(n, o, Q(s, 2)) : n;
      }
      function Bd(n, o, s) {
        return n && n.length && o && o.length ? Ml(n, o, a, s) : n;
      }
      var Hd = Gn(function(n, o) {
        var s = n == null ? 0 : n.length, h = Ll(n, o);
        return Ca(n, Ve(o, function(y) {
          return l(y, s) ? +y : y;
        }).sort(Rl)), h;
      });
      function zd(n, o) {
        var s = [];
        if (!(n && n.length))
          return s;
        var h = -1, y = [], S = n.length;
        for (o = Q(o, 3); ++h < S; ) {
          var A = n[h];
          o(A, h, n) && (s.push(A), y.push(h));
        }
        return Ca(n, y), s;
      }
      function sc(n) {
        return n == null ? n : ti.call(n);
      }
      function Ud(n, o, s) {
        var h = n == null ? 0 : n.length;
        return h ? (s && typeof s != "number" && u(n, o, s) ? (o = 0, s = h) : (o = o == null ? 0 : _e(o), s = s === a ? h : _e(s)), $t(n, o, s)) : [];
      }
      function Gd(n, o) {
        return pn(n, o);
      }
      function qd(n, o, s) {
        return Js(n, o, Q(s, 2));
      }
      function Kd(n, o) {
        var s = n == null ? 0 : n.length;
        if (s) {
          var h = pn(n, o);
          if (h < s && vr(n[h], o))
            return h;
        }
        return -1;
      }
      function $d(n, o) {
        return pn(n, o, !0);
      }
      function Xd(n, o, s) {
        return Js(n, o, Q(s, 2), !0);
      }
      function Yd(n, o) {
        var s = n == null ? 0 : n.length;
        if (s) {
          var h = pn(n, o, !0) - 1;
          if (vr(n[h], o))
            return h;
        }
        return -1;
      }
      function Zd(n) {
        return n && n.length ? Ta(n) : [];
      }
      function Qd(n, o) {
        return n && n.length ? Ta(n, Q(o, 2)) : [];
      }
      function Jd(n) {
        var o = n == null ? 0 : n.length;
        return o ? $t(n, 1, o) : [];
      }
      function Vd(n, o, s) {
        return n && n.length ? (o = s || o === a ? 1 : _e(o), $t(n, 0, o < 0 ? 0 : o)) : [];
      }
      function jd(n, o, s) {
        var h = n == null ? 0 : n.length;
        return h ? (o = s || o === a ? 1 : _e(o), o = h - o, $t(n, o < 0 ? 0 : o, h)) : [];
      }
      function ep(n, o) {
        return n && n.length ? cr(n, Q(o, 3), !1, !0) : [];
      }
      function tp(n, o) {
        return n && n.length ? cr(n, Q(o, 3)) : [];
      }
      var np = Ce(function(n) {
        return fr(Ft(n, 1, Lt, !0));
      }), rp = Ce(function(n) {
        var o = Kn(n);
        return Lt(o) && (o = a), fr(Ft(n, 1, Lt, !0), Q(o, 2));
      }), ip = Ce(function(n) {
        var o = Kn(n);
        return o = typeof o == "function" ? o : a, fr(Ft(n, 1, Lt, !0), a, o);
      });
      function op(n) {
        return n && n.length ? fr(n) : [];
      }
      function lp(n, o) {
        return n && n.length ? fr(n, Q(o, 2)) : [];
      }
      function sp(n, o) {
        return o = typeof o == "function" ? o : a, n && n.length ? fr(n, a, o) : [];
      }
      function uc(n) {
        if (!(n && n.length))
          return [];
        var o = 0;
        return n = _r(n, function(s) {
          if (Lt(s))
            return o = bt(s.length, o), !0;
        }), fl(o, function(s) {
          return Ve(n, _s(s));
        });
      }
      function $c(n, o) {
        if (!(n && n.length))
          return [];
        var s = uc(n);
        return o == null ? s : Ve(s, function(h) {
          return nn(o, a, h);
        });
      }
      var up = Ce(function(n, o) {
        return Lt(n) ? Wi(n, o) : [];
      }), ap = Ce(function(n) {
        return No(_r(n, Lt));
      }), fp = Ce(function(n) {
        var o = Kn(n);
        return Lt(o) && (o = a), No(_r(n, Lt), Q(o, 2));
      }), cp = Ce(function(n) {
        var o = Kn(n);
        return o = typeof o == "function" ? o : a, No(_r(n, Lt), a, o);
      }), hp = Ce(uc);
      function dp(n, o) {
        return Pl(n || [], o || [], dn);
      }
      function pp(n, o) {
        return Pl(n || [], o || [], Eo);
      }
      var gp = Ce(function(n) {
        var o = n.length, s = o > 1 ? n[o - 1] : a;
        return s = typeof s == "function" ? (n.pop(), s) : a, $c(n, s);
      });
      function Xc(n) {
        var o = m(n);
        return o.__chain__ = !0, o;
      }
      function vp(n, o) {
        return o(n), n;
      }
      function Ga(n, o) {
        return o(n);
      }
      var yp = Gn(function(n) {
        var o = n.length, s = o ? n[0] : 0, h = this.__wrapped__, y = function(S) {
          return Ll(S, n);
        };
        return o > 1 || this.__actions__.length || !(h instanceof Se) || !l(s) ? this.thru(y) : (h = h.slice(s, +s + (o ? 1 : 0)), h.__actions__.push({
          func: Ga,
          args: [y],
          thisArg: a
        }), new ze(h, this.__chain__).thru(function(S) {
          return o && !S.length && S.push(a), S;
        }));
      });
      function mp() {
        return Xc(this);
      }
      function xp() {
        return new ze(this.value(), this.__chain__);
      }
      function wp() {
        this.__values__ === a && (this.__values__ = sh(this.value()));
        var n = this.__index__ >= this.__values__.length, o = n ? a : this.__values__[this.__index__++];
        return { done: n, value: o };
      }
      function bp() {
        return this;
      }
      function Sp(n) {
        for (var o, s = this; s instanceof Ct; ) {
          var h = ut(s);
          h.__index__ = 0, h.__values__ = a, o ? y.__wrapped__ = h : o = h;
          var y = h;
          s = s.__wrapped__;
        }
        return y.__wrapped__ = n, o;
      }
      function Cp() {
        var n = this.__wrapped__;
        if (n instanceof Se) {
          var o = n;
          return this.__actions__.length && (o = new Se(this)), o = o.reverse(), o.__actions__.push({
            func: Ga,
            args: [sc],
            thisArg: a
          }), new ze(o, this.__chain__);
        }
        return this.thru(sc);
      }
      function _p() {
        return Nl(this.__wrapped__, this.__actions__);
      }
      var Lp = Wr(function(n, o, s) {
        He.call(n, s) ? ++n[s] : Dn(n, s, 1);
      });
      function Tp(n, o, s) {
        var h = be(n) ? Gu : ga;
        return s && u(n, o, s) && (o = a), h(n, Q(o, 3));
      }
      function Ap(n, o) {
        var s = be(n) ? _r : Ao;
        return s(n, Q(o, 3));
      }
      var kp = Na(Hr), Fp = Na(Rt);
      function Dp(n, o) {
        return Ft(qa(n, o), 1);
      }
      function Ep(n, o) {
        return Ft(qa(n, o), Bt);
      }
      function Mp(n, o, s) {
        return s = s === a ? 1 : _e(s), Ft(qa(n, o), s);
      }
      function Yc(n, o) {
        var s = be(n) ? rn : Nr;
        return s(n, Q(o, 3));
      }
      function Zc(n, o) {
        var s = be(n) ? Ef : pa;
        return s(n, Q(o, 3));
      }
      var Ip = Wr(function(n, o, s) {
        He.call(n, s) ? n[s].push(o) : Dn(n, s, [o]);
      });
      function Op(n, o, s, h) {
        n = yn(n) ? n : $l(n), s = s && !h ? _e(s) : 0;
        var y = n.length;
        return s < 0 && (s = bt(y + s, 0)), Za(n) ? s <= y && n.indexOf(o, s) > -1 : !!y && Qr(n, o, s) > -1;
      }
      var Np = Ce(function(n, o, s) {
        var h = -1, y = typeof o == "function", S = yn(n) ? W(n.length) : [];
        return Nr(n, function(A) {
          S[++h] = y ? nn(o, A, s) : zn(A, o, s);
        }), S;
      }), Pp = Wr(function(n, o, s) {
        Dn(n, s, o);
      });
      function qa(n, o) {
        var s = be(n) ? Ve : Ys;
        return s(n, Q(o, 3));
      }
      function Rp(n, o, s, h) {
        return n == null ? [] : (be(o) || (o = o == null ? [] : [o]), s = h ? a : s, be(s) || (s = s == null ? [] : [s]), ba(n, o, s));
      }
      var Wp = Wr(function(n, o, s) {
        n[s ? 0 : 1].push(o);
      }, function() {
        return [[], []];
      });
      function Bp(n, o, s) {
        var h = be(n) ? Ti : Ls, y = arguments.length < 3;
        return h(n, Q(o, 4), s, y, Nr);
      }
      function Hp(n, o, s) {
        var h = be(n) ? Ai : Ls, y = arguments.length < 3;
        return h(n, Q(o, 4), s, y, pa);
      }
      function zp(n, o) {
        var s = be(n) ? _r : Ao;
        return s(n, Xa(Q(o, 3)));
      }
      function Up(n) {
        var o = be(n) ? Cl : _a;
        return o(n);
      }
      function Gp(n, o, s) {
        (s ? u(n, o, s) : o === a) ? o = 1 : o = _e(o);
        var h = be(n) ? Co : ec;
        return h(n, o);
      }
      function qp(n) {
        var o = be(n) ? fa : Mo;
        return o(n);
      }
      function Kp(n) {
        if (n == null)
          return 0;
        if (yn(n))
          return Za(n) ? Vr(n) : n.length;
        var o = Fe(n);
        return o == Gt || o == an ? n.size : ui(n).length;
      }
      function $p(n, o, s) {
        var h = be(n) ? Ss : Io;
        return s && u(n, o, s) && (o = a), h(n, Q(o, 3));
      }
      var Xp = Ce(function(n, o) {
        if (n == null)
          return [];
        var s = o.length;
        return s > 1 && u(n, o[0], o[1]) ? o = [] : s > 2 && u(o[0], o[1], o[2]) && (o = [o[0]]), ba(n, Ft(o, 1), []);
      }), Ka = ju || function() {
        return It.Date.now();
      };
      function Yp(n, o) {
        if (typeof o != "function")
          throw new At(L);
        return n = _e(n), function() {
          if (--n < 1)
            return o.apply(this, arguments);
        };
      }
      function Qc(n, o, s) {
        return o = s ? a : o, o = n && o == null ? n.length : o, En(n, le, a, a, a, a, o);
      }
      function Jc(n, o) {
        var s;
        if (typeof o != "function")
          throw new At(L);
        return n = _e(n), function() {
          return --n > 0 && (s = o.apply(this, arguments)), n <= 1 && (o = a), s;
        };
      }
      var ac = Ce(function(n, o, s) {
        var h = We;
        if (s.length) {
          var y = er(s, hi(ac));
          h |= Te;
        }
        return En(n, h, o, s, y);
      }), Vc = Ce(function(n, o, s) {
        var h = We | Ze;
        if (s.length) {
          var y = er(s, hi(Vc));
          h |= Te;
        }
        return En(o, h, n, s, y);
      });
      function jc(n, o, s) {
        o = s ? a : o;
        var h = En(n, we, a, a, a, a, a, o);
        return h.placeholder = jc.placeholder, h;
      }
      function eh(n, o, s) {
        o = s ? a : o;
        var h = En(n, Ke, a, a, a, a, a, o);
        return h.placeholder = eh.placeholder, h;
      }
      function th(n, o, s) {
        var h, y, S, A, E, N, U = 0, G = !1, K = !1, ee = !0;
        if (typeof n != "function")
          throw new At(L);
        o = $n(o) || 0, ft(s) && (G = !!s.leading, K = "maxWait" in s, S = K ? bt($n(s.maxWait) || 0, o) : S, ee = "trailing" in s ? !!s.trailing : ee);
        function ue(Tt) {
          var yr = h, yi = y;
          return h = y = a, U = Tt, A = n.apply(yi, yr), A;
        }
        function ve(Tt) {
          return U = Tt, E = me(Ie, o), G ? ue(Tt) : A;
        }
        function Ae(Tt) {
          var yr = Tt - N, yi = Tt - U, wh = o - yr;
          return K ? St(wh, S - yi) : wh;
        }
        function ye(Tt) {
          var yr = Tt - N, yi = Tt - U;
          return N === a || yr >= o || yr < 0 || K && yi >= S;
        }
        function Ie() {
          var Tt = Ka();
          if (ye(Tt))
            return Oe(Tt);
          E = me(Ie, Ae(Tt));
        }
        function Oe(Tt) {
          return E = a, ee && h ? ue(Tt) : (h = y = a, A);
        }
        function In() {
          E !== a && Po(E), U = 0, h = N = y = E = a;
        }
        function un() {
          return E === a ? A : Oe(Ka());
        }
        function On() {
          var Tt = Ka(), yr = ye(Tt);
          if (h = arguments, y = this, N = Tt, yr) {
            if (E === a)
              return ve(N);
            if (K)
              return Po(E), E = me(Ie, o), ue(N);
          }
          return E === a && (E = me(Ie, o)), A;
        }
        return On.cancel = In, On.flush = un, On;
      }
      var Zp = Ce(function(n, o) {
        return To(n, 1, o);
      }), Qp = Ce(function(n, o, s) {
        return To(n, $n(o) || 0, s);
      });
      function Jp(n) {
        return En(n, mt);
      }
      function $a(n, o) {
        if (typeof n != "function" || o != null && typeof o != "function")
          throw new At(L);
        var s = function() {
          var h = arguments, y = o ? o.apply(this, h) : h[0], S = s.cache;
          if (S.has(y))
            return S.get(y);
          var A = n.apply(this, h);
          return s.cache = S.set(y, A) || S, A;
        };
        return s.cache = new ($a.Cache || on)(), s;
      }
      $a.Cache = on;
      function Xa(n) {
        if (typeof n != "function")
          throw new At(L);
        return function() {
          var o = arguments;
          switch (o.length) {
            case 0:
              return !n.call(this);
            case 1:
              return !n.call(this, o[0]);
            case 2:
              return !n.call(this, o[0], o[1]);
            case 3:
              return !n.call(this, o[0], o[1], o[2]);
          }
          return !n.apply(this, o);
        };
      }
      function Vp(n) {
        return Jc(2, n);
      }
      var jp = tc(function(n, o) {
        o = o.length == 1 && be(o[0]) ? Ve(o[0], Ot(Q())) : Ve(Ft(o, 1), Ot(Q()));
        var s = o.length;
        return Ce(function(h) {
          for (var y = -1, S = St(h.length, s); ++y < S; )
            h[y] = o[y].call(this, h[y]);
          return nn(n, this, h);
        });
      }), fc = Ce(function(n, o) {
        var s = er(o, hi(fc));
        return En(n, Te, a, o, s);
      }), nh = Ce(function(n, o) {
        var s = er(o, hi(nh));
        return En(n, Ee, a, o, s);
      }), eg = Gn(function(n, o) {
        return En(n, yt, a, a, a, o);
      });
      function tg(n, o) {
        if (typeof n != "function")
          throw new At(L);
        return o = o === a ? o : _e(o), Ce(n, o);
      }
      function ng(n, o) {
        if (typeof n != "function")
          throw new At(L);
        return o = o == null ? 0 : bt(_e(o), 0), Ce(function(s) {
          var h = s[o], y = dr(s, 0, o);
          return h && jn(y, h), nn(n, this, y);
        });
      }
      function rg(n, o, s) {
        var h = !0, y = !0;
        if (typeof n != "function")
          throw new At(L);
        return ft(s) && (h = "leading" in s ? !!s.leading : h, y = "trailing" in s ? !!s.trailing : y), th(n, o, {
          leading: h,
          maxWait: o,
          trailing: y
        });
      }
      function ig(n) {
        return Qc(n, 1);
      }
      function og(n, o) {
        return fc(ci(o), n);
      }
      function lg() {
        if (!arguments.length)
          return [];
        var n = arguments[0];
        return be(n) ? n : [n];
      }
      function sg(n) {
        return sn(n, pe);
      }
      function ug(n, o) {
        return o = typeof o == "function" ? o : a, sn(n, pe, o);
      }
      function ag(n) {
        return sn(n, $ | pe);
      }
      function fg(n, o) {
        return o = typeof o == "function" ? o : a, sn(n, $ | pe, o);
      }
      function cg(n, o) {
        return o == null || da(n, o, Ut(o));
      }
      function vr(n, o) {
        return n === o || n !== n && o !== o;
      }
      var hg = Hl(Al), dg = Hl(function(n, o) {
        return n >= o;
      }), Uo = Ks(function() {
        return arguments;
      }()) ? Ks : function(n) {
        return vt(n) && He.call(n, "callee") && !Vu.call(n, "callee");
      }, be = W.isArray, pg = co ? Ot(co) : Dl;
      function yn(n) {
        return n != null && Ya(n.length) && !gi(n);
      }
      function Lt(n) {
        return vt(n) && yn(n);
      }
      function gg(n) {
        return n === !0 || n === !1 || vt(n) && Ht(n) == et;
      }
      var Qi = Ns || bc, vg = ll ? Ot(ll) : ma;
      function yg(n) {
        return vt(n) && n.nodeType === 1 && !fu(n);
      }
      function mg(n) {
        if (n == null)
          return !0;
        if (yn(n) && (be(n) || typeof n == "string" || typeof n.splice == "function" || Qi(n) || Kl(n) || Uo(n)))
          return !n.length;
        var o = Fe(n);
        if (o == Gt || o == an)
          return !n.size;
        if (T(n))
          return !ui(n).length;
        for (var s in n)
          if (He.call(n, s))
            return !1;
        return !0;
      }
      function xg(n, o) {
        return ur(n, o);
      }
      function wg(n, o, s) {
        s = typeof s == "function" ? s : a;
        var h = s ? s(n, o) : a;
        return h === a ? ur(n, o, a, s) : !!h;
      }
      function cc(n) {
        if (!vt(n))
          return !1;
        var o = Ht(n);
        return o == zr || o == qo || typeof n.message == "string" && typeof n.name == "string" && !fu(n);
      }
      function bg(n) {
        return typeof n == "number" && xl(n);
      }
      function gi(n) {
        if (!ft(n))
          return !1;
        var o = Ht(n);
        return o == en || o == Ko || o == nt || o == Xo;
      }
      function rh(n) {
        return typeof n == "number" && n == _e(n);
      }
      function Ya(n) {
        return typeof n == "number" && n > -1 && n % 1 == 0 && n <= k;
      }
      function ft(n) {
        var o = typeof n;
        return n != null && (o == "object" || o == "function");
      }
      function vt(n) {
        return n != null && typeof n == "object";
      }
      var ih = Zr ? Ot(Zr) : Hi;
      function Sg(n, o) {
        return n === o || El(n, o, su(o));
      }
      function Cg(n, o, s) {
        return s = typeof s == "function" ? s : a, El(n, o, su(o), s);
      }
      function _g(n) {
        return oh(n) && n != +n;
      }
      function Lg(n) {
        if (_(n))
          throw new xe(C);
        return $s(n);
      }
      function Tg(n) {
        return n === null;
      }
      function Ag(n) {
        return n == null;
      }
      function oh(n) {
        return typeof n == "number" || vt(n) && Ht(n) == Ur;
      }
      function fu(n) {
        if (!vt(n) || Ht(n) != bn)
          return !1;
        var o = Mi(n);
        if (o === null)
          return !0;
        var s = He.call(o, "constructor") && o.constructor;
        return typeof s == "function" && s instanceof s && yo.call(s) == Fr;
      }
      var hc = Bu ? Ot(Bu) : xa;
      function kg(n) {
        return rh(n) && n >= -k && n <= k;
      }
      var lh = Hu ? Ot(Hu) : Fo;
      function Za(n) {
        return typeof n == "string" || !be(n) && vt(n) && Ht(n) == bi;
      }
      function Mn(n) {
        return typeof n == "symbol" || vt(n) && Ht(n) == Yo;
      }
      var Kl = zu ? Ot(zu) : Do;
      function Fg(n) {
        return n === a;
      }
      function Dg(n) {
        return vt(n) && Fe(n) == wr;
      }
      function Eg(n) {
        return vt(n) && Ht(n) == _u;
      }
      var Mg = Hl(Xs), Ig = Hl(function(n, o) {
        return n <= o;
      });
      function sh(n) {
        if (!n)
          return [];
        if (yn(n))
          return Za(n) ? hn(n) : Xt(n);
        if (ei && n[ei])
          return Fs(n[ei]());
        var o = Fe(n), s = o == Gt ? Tr : o == an ? vo : $l;
        return s(n);
      }
      function vi(n) {
        if (!n)
          return n === 0 ? n : 0;
        if (n = $n(n), n === Bt || n === -Bt) {
          var o = n < 0 ? -1 : 1;
          return o * b;
        }
        return n === n ? n : 0;
      }
      function _e(n) {
        var o = vi(n), s = o % 1;
        return o === o ? s ? o - s : o : 0;
      }
      function uh(n) {
        return n ? si(_e(n), 0, re) : 0;
      }
      function $n(n) {
        if (typeof n == "number")
          return n;
        if (Mn(n))
          return ne;
        if (ft(n)) {
          var o = typeof n.valueOf == "function" ? n.valueOf() : n;
          n = ft(o) ? o + "" : o;
        }
        if (typeof n != "string")
          return n === 0 ? n : +n;
        n = $u(n);
        var s = bf.test(n);
        return s || cs.test(n) ? Wu(n.slice(2), s ? 2 : 8) : wf.test(n) ? ne : +n;
      }
      function ah(n) {
        return Un(n, mn(n));
      }
      function Og(n) {
        return n ? si(_e(n), -k, k) : n === 0 ? n : 0;
      }
      function Xe(n) {
        return n == null ? "" : Jt(n);
      }
      var Ng = Ui(function(n, o) {
        if (T(o) || yn(o)) {
          Un(o, Ut(o), n);
          return;
        }
        for (var s in o)
          He.call(o, s) && dn(n, s, o[s]);
      }), fh = Ui(function(n, o) {
        Un(o, mn(o), n);
      }), Qa = Ui(function(n, o, s, h) {
        Un(o, mn(o), n, h);
      }), Pg = Ui(function(n, o, s, h) {
        Un(o, Ut(o), n, h);
      }), Rg = Gn(Ll);
      function Wg(n, o) {
        var s = je(n);
        return o == null ? s : ha(s, o);
      }
      var Bg = Ce(function(n, o) {
        n = Ye(n);
        var s = -1, h = o.length, y = h > 2 ? o[2] : a;
        for (y && u(o[0], o[1], y) && (h = 1); ++s < h; )
          for (var S = o[s], A = mn(S), E = -1, N = A.length; ++E < N; ) {
            var U = A[E], G = n[U];
            (G === a || vr(G, Ar[U]) && !He.call(n, U)) && (n[U] = S[U]);
          }
        return n;
      }), Hg = Ce(function(n) {
        return n.push(a, gn), nn(ch, a, n);
      });
      function zg(n, o) {
        return dt(n, Q(o, 3), Bn);
      }
      function Ug(n, o) {
        return dt(n, Q(o, 3), Tl);
      }
      function Gg(n, o) {
        return n == null ? n : ko(n, Q(o, 3), mn);
      }
      function qg(n, o) {
        return n == null ? n : Gs(n, Q(o, 3), mn);
      }
      function Kg(n, o) {
        return n && Bn(n, Q(o, 3));
      }
      function $g(n, o) {
        return n && Tl(n, Q(o, 3));
      }
      function Xg(n) {
        return n == null ? [] : pt(n, Ut(n));
      }
      function Yg(n) {
        return n == null ? [] : pt(n, mn(n));
      }
      function dc(n, o, s) {
        var h = n == null ? a : Hn(n, o);
        return h === a ? s : h;
      }
      function Zg(n, o) {
        return n != null && Ua(n, o, Bi);
      }
      function pc(n, o) {
        return n != null && Ua(n, o, kl);
      }
      var Qg = iu(function(n, o, s) {
        o != null && typeof o.toString != "function" && (o = kt.call(o)), n[o] = s;
      }, vc(xn)), Jg = iu(function(n, o, s) {
        o != null && typeof o.toString != "function" && (o = kt.call(o)), He.call(n, o) ? n[o].push(s) : n[o] = [s];
      }, Q), Vg = Ce(zn);
      function Ut(n) {
        return yn(n) ? aa(n) : ui(n);
      }
      function mn(n) {
        return yn(n) ? aa(n, !0) : wa(n);
      }
      function jg(n, o) {
        var s = {};
        return o = Q(o, 3), Bn(n, function(h, y, S) {
          Dn(s, o(h, y, S), h);
        }), s;
      }
      function ev(n, o) {
        var s = {};
        return o = Q(o, 3), Bn(n, function(h, y, S) {
          Dn(s, y, o(h, y, S));
        }), s;
      }
      var tv = Ui(function(n, o, s) {
        Pr(n, o, s);
      }), ch = Ui(function(n, o, s, h) {
        Pr(n, o, s, h);
      }), nv = Gn(function(n, o) {
        var s = {};
        if (n == null)
          return s;
        var h = !1;
        o = Ve(o, function(S) {
          return S = hr(S, n), h || (h = S.length > 1), S;
        }), Un(n, Gl(n), s), h && (s = sn(s, $ | V | pe, zl));
        for (var y = o.length; y--; )
          Ol(s, o[y]);
        return s;
      });
      function rv(n, o) {
        return hh(n, Xa(Q(o)));
      }
      var iv = Gn(function(n, o) {
        return n == null ? {} : Vf(n, o);
      });
      function hh(n, o) {
        if (n == null)
          return {};
        var s = Ve(Gl(n), function(h) {
          return [h];
        });
        return o = Q(o), Sa(n, s, function(h, y) {
          return o(h, y[0]);
        });
      }
      function ov(n, o, s) {
        o = hr(o, n);
        var h = -1, y = o.length;
        for (y || (y = 1, n = a); ++h < y; ) {
          var S = n == null ? a : n[Ge(o[h])];
          S === a && (h = y, S = s), n = gi(S) ? S.call(n) : S;
        }
        return n;
      }
      function lv(n, o, s) {
        return n == null ? n : Eo(n, o, s);
      }
      function sv(n, o, s, h) {
        return h = typeof h == "function" ? h : a, n == null ? n : Eo(n, o, s, h);
      }
      var dh = Wa(Ut), ph = Wa(mn);
      function uv(n, o, s) {
        var h = be(n), y = h || Qi(n) || Kl(n);
        if (o = Q(o, 4), s == null) {
          var S = n && n.constructor;
          y ? s = h ? new S() : [] : ft(n) ? s = gi(S) ? je(Mi(n)) : {} : s = {};
        }
        return (y ? rn : Bn)(n, function(A, E, N) {
          return o(s, A, E, N);
        }), s;
      }
      function av(n, o) {
        return n == null ? !0 : Ol(n, o);
      }
      function fv(n, o, s) {
        return n == null ? n : Oo(n, o, ci(s));
      }
      function cv(n, o, s, h) {
        return h = typeof h == "function" ? h : a, n == null ? n : Oo(n, o, ci(s), h);
      }
      function $l(n) {
        return n == null ? [] : Ln(n, Ut(n));
      }
      function hv(n) {
        return n == null ? [] : Ln(n, mn(n));
      }
      function dv(n, o, s) {
        return s === a && (s = o, o = a), s !== a && (s = $n(s), s = s === s ? s : 0), o !== a && (o = $n(o), o = o === o ? o : 0), si($n(n), o, s);
      }
      function pv(n, o, s) {
        return o = vi(o), s === a ? (s = o, o = 0) : s = vi(s), n = $n(n), va(n, o, s);
      }
      function gv(n, o, s) {
        if (s && typeof s != "boolean" && u(n, o, s) && (o = s = a), s === a && (typeof o == "boolean" ? (s = o, o = a) : typeof n == "boolean" && (s = n, n = a)), n === a && o === a ? (n = 0, o = 1) : (n = vi(n), o === a ? (o = n, n = 0) : o = vi(o)), n > o) {
          var h = n;
          n = o, o = h;
        }
        if (s || n % 1 || o % 1) {
          var y = Ps();
          return St(n + y * (o - n + Ff("1e-" + ((y + "").length - 1))), o);
        }
        return Qs(n, o);
      }
      var vv = Gi(function(n, o, s) {
        return o = o.toLowerCase(), n + (s ? gh(o) : o);
      });
      function gh(n) {
        return gc(Xe(n).toLowerCase());
      }
      function vh(n) {
        return n = Xe(n), n && n.replace(Sf, Jr).replace(Af, "");
      }
      function yv(n, o, s) {
        n = Xe(n), o = Jt(o);
        var h = n.length;
        s = s === a ? h : si(_e(s), 0, h);
        var y = s;
        return s -= o.length, s >= 0 && n.slice(s, y) == o;
      }
      function mv(n) {
        return n = Xe(n), n && Si.test(n) ? n.replace(ns, ks) : n;
      }
      function xv(n) {
        return n = Xe(n), n && os.test(n) ? n.replace(is, "\\$&") : n;
      }
      var wv = Gi(function(n, o, s) {
        return n + (s ? "-" : "") + o.toLowerCase();
      }), bv = Gi(function(n, o, s) {
        return n + (s ? " " : "") + o.toLowerCase();
      }), Sv = Oa("toLowerCase");
      function Cv(n, o, s) {
        n = Xe(n), o = _e(o);
        var h = o ? Vr(n) : 0;
        if (!o || h >= o)
          return n;
        var y = (o - h) / 2;
        return pr(ml(y), s) + n + pr(yl(y), s);
      }
      function _v(n, o, s) {
        n = Xe(n), o = _e(o);
        var h = o ? Vr(n) : 0;
        return o && h < o ? n + pr(o - h, s) : n;
      }
      function Lv(n, o, s) {
        n = Xe(n), o = _e(o);
        var h = o ? Vr(n) : 0;
        return o && h < o ? pr(o - h, s) + n : n;
      }
      function Tv(n, o, s) {
        return s || o == null ? o = 0 : o && (o = +o), wo(Xe(n).replace(ls, ""), o || 0);
      }
      function Av(n, o, s) {
        return (s ? u(n, o, s) : o === a) ? o = 1 : o = _e(o), Il(Xe(n), o);
      }
      function kv() {
        var n = arguments, o = Xe(n[0]);
        return n.length < 3 ? o : o.replace(n[1], n[2]);
      }
      var Fv = Gi(function(n, o, s) {
        return n + (s ? "_" : "") + o.toLowerCase();
      });
      function Dv(n, o, s) {
        return s && typeof s != "number" && u(n, o, s) && (o = s = a), s = s === a ? re : s >>> 0, s ? (n = Xe(n), n && (typeof o == "string" || o != null && !hc(o)) && (o = Jt(o), !o && ki(n)) ? dr(hn(n), 0, s) : n.split(o, s)) : [];
      }
      var Ev = Gi(function(n, o, s) {
        return n + (s ? " " : "") + gc(o);
      });
      function Mv(n, o, s) {
        return n = Xe(n), s = s == null ? 0 : si(_e(s), 0, n.length), o = Jt(o), n.slice(s, s + o.length) == o;
      }
      function Iv(n, o, s) {
        var h = m.templateSettings;
        s && u(n, o, s) && (o = a), n = Xe(n), o = Qa({}, o, h, $i);
        var y = Qa({}, o.imports, h.imports, $i), S = Ut(y), A = Ln(y, S), E, N, U = 0, G = o.interpolate || Rn, K = "__p += '", ee = Es(
          (o.escape || Rn).source + "|" + G.source + "|" + (G === Jo ? fs : Rn).source + "|" + (o.evaluate || Rn).source + "|$",
          "g"
        ), ue = "//# sourceURL=" + (He.call(o, "sourceURL") ? (o.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Nu + "]") + `
`;
        n.replace(ee, function(ye, Ie, Oe, In, un, On) {
          return Oe || (Oe = In), K += n.slice(U, On).replace(hs, Nf), Ie && (E = !0, K += `' +
__e(` + Ie + `) +
'`), un && (N = !0, K += `';
` + un + `;
__p += '`), Oe && (K += `' +
((__t = (` + Oe + `)) == null ? '' : __t) +
'`), U = On + ye.length, ye;
        }), K += `';
`;
        var ve = He.call(o, "variable") && o.variable;
        if (!ve)
          K = `with (obj) {
` + K + `
}
`;
        else if (as.test(ve))
          throw new xe(F);
        K = (N ? K.replace(ts, "") : K).replace(tn, "$1").replace(rt, "$1;"), K = "function(" + (ve || "obj") + `) {
` + (ve ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (E ? ", __e = _.escape" : "") + (N ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + K + `return __p
}`;
        var Ae = mh(function() {
          return Pe(S, ue + "return " + K).apply(a, A);
        });
        if (Ae.source = K, cc(Ae))
          throw Ae;
        return Ae;
      }
      function Ov(n) {
        return Xe(n).toLowerCase();
      }
      function Nv(n) {
        return Xe(n).toUpperCase();
      }
      function Pv(n, o, s) {
        if (n = Xe(n), n && (s || o === a))
          return $u(n);
        if (!n || !(o = Jt(o)))
          return n;
        var h = hn(n), y = hn(o), S = cl(h, y), A = As(h, y) + 1;
        return dr(h, S, A).join("");
      }
      function Rv(n, o, s) {
        if (n = Xe(n), n && (s || o === a))
          return n.slice(0, Fi(n) + 1);
        if (!n || !(o = Jt(o)))
          return n;
        var h = hn(n), y = As(h, hn(o)) + 1;
        return dr(h, 0, y).join("");
      }
      function Wv(n, o, s) {
        if (n = Xe(n), n && (s || o === a))
          return n.replace(ls, "");
        if (!n || !(o = Jt(o)))
          return n;
        var h = hn(n), y = cl(h, hn(o));
        return dr(h, y).join("");
      }
      function Bv(n, o) {
        var s = Qt, h = Zn;
        if (ft(o)) {
          var y = "separator" in o ? o.separator : y;
          s = "length" in o ? _e(o.length) : s, h = "omission" in o ? Jt(o.omission) : h;
        }
        n = Xe(n);
        var S = n.length;
        if (ki(n)) {
          var A = hn(n);
          S = A.length;
        }
        if (s >= S)
          return n;
        var E = s - Vr(h);
        if (E < 1)
          return h;
        var N = A ? dr(A, 0, E).join("") : n.slice(0, E);
        if (y === a)
          return N + h;
        if (A && (E += N.length - E), hc(y)) {
          if (n.slice(E).search(y)) {
            var U, G = N;
            for (y.global || (y = Es(y.source, Xe($r.exec(y)) + "g")), y.lastIndex = 0; U = y.exec(G); )
              var K = U.index;
            N = N.slice(0, K === a ? E : K);
          }
        } else if (n.indexOf(Jt(y), E) != E) {
          var ee = N.lastIndexOf(y);
          ee > -1 && (N = N.slice(0, ee));
        }
        return N + h;
      }
      function Hv(n) {
        return n = Xe(n), n && fn.test(n) ? n.replace(ct, Zu) : n;
      }
      var zv = Gi(function(n, o, s) {
        return n + (s ? " " : "") + o.toUpperCase();
      }), gc = Oa("toUpperCase");
      function yh(n, o, s) {
        return n = Xe(n), o = s ? a : o, o === a ? Yu(n) ? hl(n) : ho(n) : n.match(o) || [];
      }
      var mh = Ce(function(n, o) {
        try {
          return nn(n, a, o);
        } catch (s) {
          return cc(s) ? s : new xe(s);
        }
      }), Uv = Gn(function(n, o) {
        return rn(o, function(s) {
          s = Ge(s), Dn(n, s, ac(n[s], n));
        }), n;
      });
      function Gv(n) {
        var o = n == null ? 0 : n.length, s = Q();
        return n = o ? Ve(n, function(h) {
          if (typeof h[1] != "function")
            throw new At(L);
          return [s(h[0]), h[1]];
        }) : [], Ce(function(h) {
          for (var y = -1; ++y < o; ) {
            var S = n[y];
            if (nn(S[0], this, h))
              return nn(S[1], this, h);
          }
        });
      }
      function qv(n) {
        return Zf(sn(n, $));
      }
      function vc(n) {
        return function() {
          return n;
        };
      }
      function Kv(n, o) {
        return n == null || n !== n ? o : n;
      }
      var $v = ru(), Xv = ru(!0);
      function xn(n) {
        return n;
      }
      function yc(n) {
        return zi(typeof n == "function" ? n : sn(n, $));
      }
      function Yv(n) {
        return ar(sn(n, $));
      }
      function Zv(n, o) {
        return ai(n, sn(o, $));
      }
      var Qv = Ce(function(n, o) {
        return function(s) {
          return zn(s, n, o);
        };
      }), Jv = Ce(function(n, o) {
        return function(s) {
          return zn(n, s, o);
        };
      });
      function mc(n, o, s) {
        var h = Ut(o), y = pt(o, h);
        s == null && !(ft(o) && (y.length || !h.length)) && (s = o, o = n, n = this, y = pt(o, Ut(o)));
        var S = !(ft(s) && "chain" in s) || !!s.chain, A = gi(n);
        return rn(y, function(E) {
          var N = o[E];
          n[E] = N, A && (n.prototype[E] = function() {
            var U = this.__chain__;
            if (S || U) {
              var G = n(this.__wrapped__), K = G.__actions__ = Xt(this.__actions__);
              return K.push({ func: N, args: arguments, thisArg: n }), G.__chain__ = U, G;
            }
            return N.apply(n, jn([this.value()], arguments));
          });
        }), n;
      }
      function Vv() {
        return It._ === this && (It._ = Dr), this;
      }
      function xc() {
      }
      function jv(n) {
        return n = _e(n), Ce(function(o) {
          return Zs(o, n);
        });
      }
      var e0 = Bl(Ve), t0 = Bl(Gu), n0 = Bl(Ss);
      function xh(n) {
        return f(n) ? _s(Ge(n)) : Kt(n);
      }
      function r0(n) {
        return function(o) {
          return n == null ? a : Hn(n, o);
        };
      }
      var i0 = Bo(), o0 = Bo(!0);
      function wc() {
        return [];
      }
      function bc() {
        return !1;
      }
      function l0() {
        return {};
      }
      function s0() {
        return "";
      }
      function u0() {
        return !0;
      }
      function a0(n, o) {
        if (n = _e(n), n < 1 || n > k)
          return [];
        var s = re, h = St(n, re);
        o = Q(o), n -= re;
        for (var y = fl(h, o); ++s < n; )
          o(s);
        return y;
      }
      function f0(n) {
        return be(n) ? Ve(n, Ge) : Mn(n) ? [n] : Xt(zt(Xe(n)));
      }
      function c0(n) {
        var o = ++jr;
        return Xe(n) + o;
      }
      var h0 = Wl(function(n, o) {
        return n + o;
      }, 0), d0 = ou("ceil"), p0 = Wl(function(n, o) {
        return n / o;
      }, 1), g0 = ou("floor");
      function v0(n) {
        return n && n.length ? sr(n, xn, Al) : a;
      }
      function y0(n, o) {
        return n && n.length ? sr(n, Q(o, 2), Al) : a;
      }
      function m0(n) {
        return Cs(n, xn);
      }
      function x0(n, o) {
        return Cs(n, Q(o, 2));
      }
      function w0(n) {
        return n && n.length ? sr(n, xn, Xs) : a;
      }
      function b0(n, o) {
        return n && n.length ? sr(n, Q(o, 2), Xs) : a;
      }
      var S0 = Wl(function(n, o) {
        return n * o;
      }, 1), C0 = ou("round"), _0 = Wl(function(n, o) {
        return n - o;
      }, 0);
      function L0(n) {
        return n && n.length ? Ts(n, xn) : 0;
      }
      function T0(n, o) {
        return n && n.length ? Ts(n, Q(o, 2)) : 0;
      }
      return m.after = Yp, m.ary = Qc, m.assign = Ng, m.assignIn = fh, m.assignInWith = Qa, m.assignWith = Pg, m.at = Rg, m.before = Jc, m.bind = ac, m.bindAll = Uv, m.bindKey = Vc, m.castArray = lg, m.chain = Xc, m.chunk = at, m.compact = tt, m.concat = Yt, m.cond = Gv, m.conforms = qv, m.constant = vc, m.countBy = Lp, m.create = Wg, m.curry = jc, m.curryRight = eh, m.debounce = th, m.defaults = Bg, m.defaultsDeep = Hg, m.defer = Zp, m.delay = Qp, m.difference = Zi, m.differenceBy = Br, m.differenceWith = Pt, m.drop = qn, m.dropRight = _t, m.dropRightWhile = uu, m.dropWhile = gr, m.fill = di, m.filter = Ap, m.flatMap = Dp, m.flatMapDeep = Ep, m.flatMapDepth = Mp, m.flatten = pi, m.flattenDeep = au, m.flattenDepth = Ad, m.flip = Jp, m.flow = $v, m.flowRight = Xv, m.fromPairs = kd, m.functions = Xg, m.functionsIn = Yg, m.groupBy = Ip, m.initial = Dd, m.intersection = Ed, m.intersectionBy = Md, m.intersectionWith = Id, m.invert = Qg, m.invertBy = Jg, m.invokeMap = Np, m.iteratee = yc, m.keyBy = Pp, m.keys = Ut, m.keysIn = mn, m.map = qa, m.mapKeys = jg, m.mapValues = ev, m.matches = Yv, m.matchesProperty = Zv, m.memoize = $a, m.merge = tv, m.mergeWith = ch, m.method = Qv, m.methodOf = Jv, m.mixin = mc, m.negate = Xa, m.nthArg = jv, m.omit = nv, m.omitBy = rv, m.once = Vp, m.orderBy = Rp, m.over = e0, m.overArgs = jp, m.overEvery = t0, m.overSome = n0, m.partial = fc, m.partialRight = nh, m.partition = Wp, m.pick = iv, m.pickBy = hh, m.property = xh, m.propertyOf = r0, m.pull = Rd, m.pullAll = Kc, m.pullAllBy = Wd, m.pullAllWith = Bd, m.pullAt = Hd, m.range = i0, m.rangeRight = o0, m.rearg = eg, m.reject = zp, m.remove = zd, m.rest = tg, m.reverse = sc, m.sampleSize = Gp, m.set = lv, m.setWith = sv, m.shuffle = qp, m.slice = Ud, m.sortBy = Xp, m.sortedUniq = Zd, m.sortedUniqBy = Qd, m.split = Dv, m.spread = ng, m.tail = Jd, m.take = Vd, m.takeRight = jd, m.takeRightWhile = ep, m.takeWhile = tp, m.tap = vp, m.throttle = rg, m.thru = Ga, m.toArray = sh, m.toPairs = dh, m.toPairsIn = ph, m.toPath = f0, m.toPlainObject = ah, m.transform = uv, m.unary = ig, m.union = np, m.unionBy = rp, m.unionWith = ip, m.uniq = op, m.uniqBy = lp, m.uniqWith = sp, m.unset = av, m.unzip = uc, m.unzipWith = $c, m.update = fv, m.updateWith = cv, m.values = $l, m.valuesIn = hv, m.without = up, m.words = yh, m.wrap = og, m.xor = ap, m.xorBy = fp, m.xorWith = cp, m.zip = hp, m.zipObject = dp, m.zipObjectDeep = pp, m.zipWith = gp, m.entries = dh, m.entriesIn = ph, m.extend = fh, m.extendWith = Qa, mc(m, m), m.add = h0, m.attempt = mh, m.camelCase = vv, m.capitalize = gh, m.ceil = d0, m.clamp = dv, m.clone = sg, m.cloneDeep = ag, m.cloneDeepWith = fg, m.cloneWith = ug, m.conformsTo = cg, m.deburr = vh, m.defaultTo = Kv, m.divide = p0, m.endsWith = yv, m.eq = vr, m.escape = mv, m.escapeRegExp = xv, m.every = Tp, m.find = kp, m.findIndex = Hr, m.findKey = zg, m.findLast = Fp, m.findLastIndex = Rt, m.findLastKey = Ug, m.floor = g0, m.forEach = Yc, m.forEachRight = Zc, m.forIn = Gg, m.forInRight = qg, m.forOwn = Kg, m.forOwnRight = $g, m.get = dc, m.gt = hg, m.gte = dg, m.has = Zg, m.hasIn = pc, m.head = qc, m.identity = xn, m.includes = Op, m.indexOf = Fd, m.inRange = pv, m.invoke = Vg, m.isArguments = Uo, m.isArray = be, m.isArrayBuffer = pg, m.isArrayLike = yn, m.isArrayLikeObject = Lt, m.isBoolean = gg, m.isBuffer = Qi, m.isDate = vg, m.isElement = yg, m.isEmpty = mg, m.isEqual = xg, m.isEqualWith = wg, m.isError = cc, m.isFinite = bg, m.isFunction = gi, m.isInteger = rh, m.isLength = Ya, m.isMap = ih, m.isMatch = Sg, m.isMatchWith = Cg, m.isNaN = _g, m.isNative = Lg, m.isNil = Ag, m.isNull = Tg, m.isNumber = oh, m.isObject = ft, m.isObjectLike = vt, m.isPlainObject = fu, m.isRegExp = hc, m.isSafeInteger = kg, m.isSet = lh, m.isString = Za, m.isSymbol = Mn, m.isTypedArray = Kl, m.isUndefined = Fg, m.isWeakMap = Dg, m.isWeakSet = Eg, m.join = Od, m.kebabCase = wv, m.last = Kn, m.lastIndexOf = Nd, m.lowerCase = bv, m.lowerFirst = Sv, m.lt = Mg, m.lte = Ig, m.max = v0, m.maxBy = y0, m.mean = m0, m.meanBy = x0, m.min = w0, m.minBy = b0, m.stubArray = wc, m.stubFalse = bc, m.stubObject = l0, m.stubString = s0, m.stubTrue = u0, m.multiply = S0, m.nth = Pd, m.noConflict = Vv, m.noop = xc, m.now = Ka, m.pad = Cv, m.padEnd = _v, m.padStart = Lv, m.parseInt = Tv, m.random = gv, m.reduce = Bp, m.reduceRight = Hp, m.repeat = Av, m.replace = kv, m.result = ov, m.round = C0, m.runInContext = I, m.sample = Up, m.size = Kp, m.snakeCase = Fv, m.some = $p, m.sortedIndex = Gd, m.sortedIndexBy = qd, m.sortedIndexOf = Kd, m.sortedLastIndex = $d, m.sortedLastIndexBy = Xd, m.sortedLastIndexOf = Yd, m.startCase = Ev, m.startsWith = Mv, m.subtract = _0, m.sum = L0, m.sumBy = T0, m.template = Iv, m.times = a0, m.toFinite = vi, m.toInteger = _e, m.toLength = uh, m.toLower = Ov, m.toNumber = $n, m.toSafeInteger = Og, m.toString = Xe, m.toUpper = Nv, m.trim = Pv, m.trimEnd = Rv, m.trimStart = Wv, m.truncate = Bv, m.unescape = Hv, m.uniqueId = c0, m.upperCase = zv, m.upperFirst = gc, m.each = Yc, m.eachRight = Zc, m.first = qc, mc(m, function() {
        var n = {};
        return Bn(m, function(o, s) {
          He.call(m.prototype, s) || (n[s] = o);
        }), n;
      }(), { chain: !1 }), m.VERSION = x, rn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
        m[n].placeholder = m;
      }), rn(["drop", "take"], function(n, o) {
        Se.prototype[n] = function(s) {
          s = s === a ? 1 : bt(_e(s), 0);
          var h = this.__filtered__ && !o ? new Se(this) : this.clone();
          return h.__filtered__ ? h.__takeCount__ = St(s, h.__takeCount__) : h.__views__.push({
            size: St(s, re),
            type: n + (h.__dir__ < 0 ? "Right" : "")
          }), h;
        }, Se.prototype[n + "Right"] = function(s) {
          return this.reverse()[n](s).reverse();
        };
      }), rn(["filter", "map", "takeWhile"], function(n, o) {
        var s = o + 1, h = s == Wt || s == xr;
        Se.prototype[n] = function(y) {
          var S = this.clone();
          return S.__iteratees__.push({
            iteratee: Q(y, 3),
            type: s
          }), S.__filtered__ = S.__filtered__ || h, S;
        };
      }), rn(["head", "last"], function(n, o) {
        var s = "take" + (o ? "Right" : "");
        Se.prototype[n] = function() {
          return this[s](1).value()[0];
        };
      }), rn(["initial", "tail"], function(n, o) {
        var s = "drop" + (o ? "" : "Right");
        Se.prototype[n] = function() {
          return this.__filtered__ ? new Se(this) : this[s](1);
        };
      }), Se.prototype.compact = function() {
        return this.filter(xn);
      }, Se.prototype.find = function(n) {
        return this.filter(n).head();
      }, Se.prototype.findLast = function(n) {
        return this.reverse().find(n);
      }, Se.prototype.invokeMap = Ce(function(n, o) {
        return typeof n == "function" ? new Se(this) : this.map(function(s) {
          return zn(s, n, o);
        });
      }), Se.prototype.reject = function(n) {
        return this.filter(Xa(Q(n)));
      }, Se.prototype.slice = function(n, o) {
        n = _e(n);
        var s = this;
        return s.__filtered__ && (n > 0 || o < 0) ? new Se(s) : (n < 0 ? s = s.takeRight(-n) : n && (s = s.drop(n)), o !== a && (o = _e(o), s = o < 0 ? s.dropRight(-o) : s.take(o - n)), s);
      }, Se.prototype.takeRightWhile = function(n) {
        return this.reverse().takeWhile(n).reverse();
      }, Se.prototype.toArray = function() {
        return this.take(re);
      }, Bn(Se.prototype, function(n, o) {
        var s = /^(?:filter|find|map|reject)|While$/.test(o), h = /^(?:head|last)$/.test(o), y = m[h ? "take" + (o == "last" ? "Right" : "") : o], S = h || /^find/.test(o);
        !y || (m.prototype[o] = function() {
          var A = this.__wrapped__, E = h ? [1] : arguments, N = A instanceof Se, U = E[0], G = N || be(A), K = function(Ie) {
            var Oe = y.apply(m, jn([Ie], E));
            return h && ee ? Oe[0] : Oe;
          };
          G && s && typeof U == "function" && U.length != 1 && (N = G = !1);
          var ee = this.__chain__, ue = !!this.__actions__.length, ve = S && !ee, Ae = N && !ue;
          if (!S && G) {
            A = Ae ? A : new Se(this);
            var ye = n.apply(A, E);
            return ye.__actions__.push({ func: Ga, args: [K], thisArg: a }), new ze(ye, ee);
          }
          return ve && Ae ? n.apply(this, E) : (ye = this.thru(K), ve ? h ? ye.value()[0] : ye.value() : ye);
        });
      }), rn(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
        var o = nr[n], s = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", h = /^(?:pop|shift)$/.test(n);
        m.prototype[n] = function() {
          var y = arguments;
          if (h && !this.__chain__) {
            var S = this.value();
            return o.apply(be(S) ? S : [], y);
          }
          return this[s](function(A) {
            return o.apply(be(A) ? A : [], y);
          });
        };
      }), Bn(Se.prototype, function(n, o) {
        var s = m[o];
        if (s) {
          var h = s.name + "";
          He.call(Ri, h) || (Ri[h] = []), Ri[h].push({ name: o, func: s });
        }
      }), Ri[Ki(a, Ze).name] = [{
        name: "wrapper",
        func: a
      }], Se.prototype.clone = Gf, Se.prototype.reverse = bl, Se.prototype.value = qf, m.prototype.at = yp, m.prototype.chain = mp, m.prototype.commit = xp, m.prototype.next = wp, m.prototype.plant = Sp, m.prototype.reverse = Cp, m.prototype.toJSON = m.prototype.valueOf = m.prototype.value = _p, m.prototype.first = m.prototype.head, ei && (m.prototype[ei] = bp), m;
    }, tr = Ju();
    Cr ? ((Cr.exports = tr)._ = tr, ao._ = tr) : It._ = tr;
  }).call(Yl);
})(pu, pu.exports);
var Cc = { exports: {} }, Th;
function td() {
  return Th || (Th = 1, function(c, p) {
    (function(a, x) {
      c.exports = x();
    })(Yl, function() {
      var a = navigator.userAgent, x = navigator.platform, w = /gecko\/\d/i.test(a), C = /MSIE \d/.test(a), L = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(a), F = /Edge\/(\d+)/.exec(a), D = C || L || F, P = D && (C ? document.documentMode || 6 : +(F || L)[1]), R = !F && /WebKit\//.test(a), $ = R && /Qt\/\d+\.\d+/.test(a), V = !F && /Chrome\/(\d+)/.exec(a), pe = V && +V[1], ce = /Opera\//.test(a), Le = /Apple Computer/.test(navigator.vendor), We = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(a), Ze = /PhantomJS/.test(a), De = Le && (/Mobile\/\w+/.test(a) || navigator.maxTouchPoints > 2), we = /Android/.test(a), Ke = De || we || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(a), Te = De || /Mac/.test(x), Ee = /\bCrOS\b/.test(a), le = /win/i.test(x), yt = ce && a.match(/Version\/(\d*\.\d*)/);
      yt && (yt = Number(yt[1])), yt && yt >= 15 && (ce = !1, R = !0);
      var mt = Te && ($ || ce && (yt == null || yt < 12.11)), Qt = w || D && P >= 9;
      function Zn(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
      }
      var Qn = function(e, t) {
        var i = e.className, r = Zn(t).exec(i);
        if (r) {
          var l = i.slice(r.index + r[0].length);
          e.className = i.slice(0, r.index) + (l ? r[1] + l : "");
        }
      };
      function Pn(e) {
        for (var t = e.childNodes.length; t > 0; --t)
          e.removeChild(e.firstChild);
        return e;
      }
      function Wt(e, t) {
        return Pn(e).appendChild(t);
      }
      function ae(e, t, i, r) {
        var l = document.createElement(e);
        if (i && (l.className = i), r && (l.style.cssText = r), typeof t == "string")
          l.appendChild(document.createTextNode(t));
        else if (t)
          for (var u = 0; u < t.length; ++u)
            l.appendChild(t[u]);
        return l;
      }
      function xr(e, t, i, r) {
        var l = ae(e, t, i, r);
        return l.setAttribute("role", "presentation"), l;
      }
      var Bt;
      document.createRange ? Bt = function(e, t, i, r) {
        var l = document.createRange();
        return l.setEnd(r || e, i), l.setStart(e, t), l;
      } : Bt = function(e, t, i) {
        var r = document.body.createTextRange();
        try {
          r.moveToElementText(e.parentNode);
        } catch {
          return r;
        }
        return r.collapse(!0), r.moveEnd("character", i), r.moveStart("character", t), r;
      };
      function k(e, t) {
        if (t.nodeType == 3 && (t = t.parentNode), e.contains)
          return e.contains(t);
        do
          if (t.nodeType == 11 && (t = t.host), t == e)
            return !0;
        while (t = t.parentNode);
      }
      function b(e) {
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
      function ne(e, t) {
        var i = e.className;
        Zn(t).test(i) || (e.className += (i ? " " : "") + t);
      }
      function re(e, t) {
        for (var i = e.split(" "), r = 0; r < i.length; r++)
          i[r] && !Zn(i[r]).test(t) && (t += " " + i[r]);
        return t;
      }
      var he = function(e) {
        e.select();
      };
      De ? he = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : D && (he = function(e) {
        try {
          e.select();
        } catch {
        }
      });
      function Me(e) {
        return e.display.wrapper.ownerDocument;
      }
      function Mt(e) {
        return Me(e).defaultView;
      }
      function xt(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
          return e.apply(null, t);
        };
      }
      function wt(e, t, i) {
        t || (t = {});
        for (var r in e)
          e.hasOwnProperty(r) && (i !== !1 || !t.hasOwnProperty(r)) && (t[r] = e[r]);
        return t;
      }
      function nt(e, t, i, r, l) {
        t == null && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
        for (var u = r || 0, f = l || 0; ; ) {
          var d = e.indexOf("	", u);
          if (d < 0 || d >= t)
            return f + (t - u);
          f += d - u, f += i - f % i, u = d + 1;
        }
      }
      var et = function() {
        this.id = null, this.f = null, this.time = 0, this.handler = xt(this.onTimeout, this);
      };
      et.prototype.onTimeout = function(e) {
        e.id = 0, e.time <= +new Date() ? e.f() : setTimeout(e.handler, e.time - +new Date());
      }, et.prototype.set = function(e, t) {
        this.f = t;
        var i = +new Date() + e;
        (!this.id || i < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = i);
      };
      function ke(e, t) {
        for (var i = 0; i < e.length; ++i)
          if (e[i] == t)
            return i;
        return -1;
      }
      var qo = 50, zr = { toString: function() {
        return "CodeMirror.Pass";
      } }, en = { scroll: !1 }, Ko = { origin: "*mouse" }, Gt = { origin: "+move" };
      function Ur(e, t, i) {
        for (var r = 0, l = 0; ; ) {
          var u = e.indexOf("	", r);
          u == -1 && (u = e.length);
          var f = u - r;
          if (u == e.length || l + f >= t)
            return r + Math.min(f, t - l);
          if (l += u - r, l += i - l % i, r = u + 1, l >= t)
            return r;
        }
      }
      var $o = [""];
      function bn(e) {
        for (; $o.length <= e; )
          $o.push(Ne($o) + " ");
        return $o[e];
      }
      function Ne(e) {
        return e[e.length - 1];
      }
      function Xo(e, t) {
        for (var i = [], r = 0; r < e.length; r++)
          i[r] = t(e[r], r);
        return i;
      }
      function eo(e, t, i) {
        for (var r = 0, l = i(t); r < e.length && i(e[r]) <= l; )
          r++;
        e.splice(r, 0, t);
      }
      function an() {
      }
      function bi(e, t) {
        var i;
        return Object.create ? i = Object.create(e) : (an.prototype = e, i = new an()), t && wt(t, i), i;
      }
      var Yo = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function Vl(e) {
        return /\w/.test(e) || e > "\x80" && (e.toUpperCase() != e.toLowerCase() || Yo.test(e));
      }
      function wr(e, t) {
        return t ? t.source.indexOf("\\w") > -1 && Vl(e) ? !0 : t.test(e) : Vl(e);
      }
      function _u(e) {
        for (var t in e)
          if (e.hasOwnProperty(t) && e[t])
            return !1;
        return !0;
      }
      var to = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function br(e) {
        return e.charCodeAt(0) >= 768 && to.test(e);
      }
      function Zo(e, t, i) {
        for (; (i < 0 ? t > 0 : t < e.length) && br(e.charAt(t)); )
          t += i;
        return t;
      }
      function Gr(e, t, i) {
        for (var r = t > i ? -1 : 1; ; ) {
          if (t == i)
            return t;
          var l = (t + i) / 2, u = r < 0 ? Math.ceil(l) : Math.floor(l);
          if (u == t)
            return e(u) ? t : i;
          e(u) ? i = u : t = u + r;
        }
      }
      function jl(e, t, i, r) {
        if (!e)
          return r(t, i, "ltr", 0);
        for (var l = !1, u = 0; u < e.length; ++u) {
          var f = e[u];
          (f.from < i && f.to > t || t == i && f.to == t) && (r(Math.max(f.from, t), Math.min(f.to, i), f.level == 1 ? "rtl" : "ltr", u), l = !0);
        }
        l || r(t, i, "ltr");
      }
      var qr = null;
      function Kr(e, t, i) {
        var r;
        qr = null;
        for (var l = 0; l < e.length; ++l) {
          var u = e[l];
          if (u.from < t && u.to > t)
            return l;
          u.to == t && (u.from != u.to && i == "before" ? r = l : qr = l), u.from == t && (u.from != u.to && i != "before" ? r = l : qr = l);
        }
        return r != null ? r : qr;
      }
      var es = function() {
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", t = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function i(v) {
          return v <= 247 ? e.charAt(v) : 1424 <= v && v <= 1524 ? "R" : 1536 <= v && v <= 1785 ? t.charAt(v - 1536) : 1774 <= v && v <= 2220 ? "r" : 8192 <= v && v <= 8203 ? "w" : v == 8204 ? "b" : "L";
        }
        var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, l = /[stwN]/, u = /[LRr]/, f = /[Lb1n]/, d = /[1n]/;
        function g(v, _, T) {
          this.level = v, this.from = _, this.to = T;
        }
        return function(v, _) {
          var T = _ == "ltr" ? "L" : "R";
          if (v.length == 0 || _ == "ltr" && !r.test(v))
            return !1;
          for (var O = v.length, M = [], B = 0; B < O; ++B)
            M.push(i(v.charCodeAt(B)));
          for (var z = 0, X = T; z < O; ++z) {
            var Z = M[z];
            Z == "m" ? M[z] = X : X = Z;
          }
          for (var J = 0, Y = T; J < O; ++J) {
            var j = M[J];
            j == "1" && Y == "r" ? M[J] = "n" : u.test(j) && (Y = j, j == "r" && (M[J] = "R"));
          }
          for (var se = 1, oe = M[0]; se < O - 1; ++se) {
            var me = M[se];
            me == "+" && oe == "1" && M[se + 1] == "1" ? M[se] = "1" : me == "," && oe == M[se + 1] && (oe == "1" || oe == "n") && (M[se] = oe), oe = me;
          }
          for (var Ue = 0; Ue < O; ++Ue) {
            var gt = M[Ue];
            if (gt == ",")
              M[Ue] = "N";
            else if (gt == "%") {
              var Je = void 0;
              for (Je = Ue + 1; Je < O && M[Je] == "%"; ++Je)
                ;
              for (var Nt = Ue && M[Ue - 1] == "!" || Je < O && M[Je] == "1" ? "1" : "N", zt = Ue; zt < Je; ++zt)
                M[zt] = Nt;
              Ue = Je - 1;
            }
          }
          for (var Ge = 0, st = T; Ge < O; ++Ge) {
            var Dt = M[Ge];
            st == "L" && Dt == "1" ? M[Ge] = "L" : u.test(Dt) && (st = Dt);
          }
          for (var ut = 0; ut < O; ++ut)
            if (l.test(M[ut])) {
              var at = void 0;
              for (at = ut + 1; at < O && l.test(M[at]); ++at)
                ;
              for (var tt = (ut ? M[ut - 1] : T) == "L", Yt = (at < O ? M[at] : T) == "L", Zi = tt == Yt ? tt ? "L" : "R" : T, Br = ut; Br < at; ++Br)
                M[Br] = Zi;
              ut = at - 1;
            }
          for (var Pt = [], qn, _t = 0; _t < O; )
            if (f.test(M[_t])) {
              var uu = _t;
              for (++_t; _t < O && f.test(M[_t]); ++_t)
                ;
              Pt.push(new g(0, uu, _t));
            } else {
              var gr = _t, di = Pt.length, Hr = _ == "rtl" ? 1 : 0;
              for (++_t; _t < O && M[_t] != "L"; ++_t)
                ;
              for (var Rt = gr; Rt < _t; )
                if (d.test(M[Rt])) {
                  gr < Rt && (Pt.splice(di, 0, new g(1, gr, Rt)), di += Hr);
                  var pi = Rt;
                  for (++Rt; Rt < _t && d.test(M[Rt]); ++Rt)
                    ;
                  Pt.splice(di, 0, new g(2, pi, Rt)), di += Hr, gr = Rt;
                } else
                  ++Rt;
              gr < _t && Pt.splice(di, 0, new g(1, gr, _t));
            }
          return _ == "ltr" && (Pt[0].level == 1 && (qn = v.match(/^\s+/)) && (Pt[0].from = qn[0].length, Pt.unshift(new g(0, 0, qn[0].length))), Ne(Pt).level == 1 && (qn = v.match(/\s+$/)) && (Ne(Pt).to -= qn[0].length, Pt.push(new g(0, O - qn[0].length, O)))), _ == "rtl" ? Pt.reverse() : Pt;
        };
      }();
      function Sn(e, t) {
        var i = e.order;
        return i == null && (i = e.order = es(e.text, t)), i;
      }
      var Qo = [], fe = function(e, t, i) {
        if (e.addEventListener)
          e.addEventListener(t, i, !1);
        else if (e.attachEvent)
          e.attachEvent("on" + t, i);
        else {
          var r = e._handlers || (e._handlers = {});
          r[t] = (r[t] || Qo).concat(i);
        }
      };
      function ts(e, t) {
        return e._handlers && e._handlers[t] || Qo;
      }
      function tn(e, t, i) {
        if (e.removeEventListener)
          e.removeEventListener(t, i, !1);
        else if (e.detachEvent)
          e.detachEvent("on" + t, i);
        else {
          var r = e._handlers, l = r && r[t];
          if (l) {
            var u = ke(l, i);
            u > -1 && (r[t] = l.slice(0, u).concat(l.slice(u + 1)));
          }
        }
      }
      function rt(e, t) {
        var i = ts(e, t);
        if (!!i.length)
          for (var r = Array.prototype.slice.call(arguments, 2), l = 0; l < i.length; ++l)
            i[l].apply(null, r);
      }
      function ct(e, t, i) {
        return typeof t == "string" && (t = { type: t, preventDefault: function() {
          this.defaultPrevented = !0;
        } }), rt(e, i || t.type, e, t), Jo(t) || t.codemirrorIgnore;
      }
      function ns(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (!!t)
          for (var i = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r)
            ke(i, t[r]) == -1 && i.push(t[r]);
      }
      function fn(e, t) {
        return ts(e, t).length > 0;
      }
      function Si(e) {
        e.prototype.on = function(t, i) {
          fe(this, t, i);
        }, e.prototype.off = function(t, i) {
          tn(this, t, i);
        };
      }
      function qt(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }
      function Lu(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }
      function Jo(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == !1;
      }
      function no(e) {
        qt(e), Lu(e);
      }
      function rs(e) {
        return e.target || e.srcElement;
      }
      function Tu(e) {
        var t = e.which;
        return t == null && (e.button & 1 ? t = 1 : e.button & 2 ? t = 3 : e.button & 4 && (t = 2)), Te && e.ctrlKey && t == 1 && (t = 3), t;
      }
      var is = function() {
        if (D && P < 9)
          return !1;
        var e = ae("div");
        return "draggable" in e || "dragDrop" in e;
      }(), os;
      function ls(e) {
        if (os == null) {
          var t = ae("span", "\u200B");
          Wt(e, ae("span", [t, document.createTextNode("x")])), e.firstChild.offsetHeight != 0 && (os = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(D && P < 8));
        }
        var i = os ? ae("span", "\u200B") : ae("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
        return i.setAttribute("cm-text", ""), i;
      }
      var ss;
      function vf(e) {
        if (ss != null)
          return ss;
        var t = Wt(e, document.createTextNode("A\u062EA")), i = Bt(t, 0, 1).getBoundingClientRect(), r = Bt(t, 1, 2).getBoundingClientRect();
        return Pn(e), !i || i.left == i.right ? !1 : ss = r.right - i.right < 3;
      }
      var us = `

b`.split(/\n/).length != 3 ? function(e) {
        for (var t = 0, i = [], r = e.length; t <= r; ) {
          var l = e.indexOf(`
`, t);
          l == -1 && (l = e.length);
          var u = e.slice(t, e.charAt(l - 1) == "\r" ? l - 1 : l), f = u.indexOf("\r");
          f != -1 ? (i.push(u.slice(0, f)), t += f + 1) : (i.push(u), t = l + 1);
        }
        return i;
      } : function(e) {
        return e.split(/\r\n?|\n/);
      }, yf = window.getSelection ? function(e) {
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
      }, mf = function() {
        var e = ae("div");
        return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), typeof e.oncopy == "function");
      }(), as = null;
      function xf(e) {
        if (as != null)
          return as;
        var t = Wt(e, ae("span", "x")), i = t.getBoundingClientRect(), r = Bt(t, 0, 1).getBoundingClientRect();
        return as = Math.abs(i.left - r.left) > 1;
      }
      var fs = {}, $r = {};
      function wf(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), fs[e] = t;
      }
      function bf(e, t) {
        $r[e] = t;
      }
      function Vo(e) {
        if (typeof e == "string" && $r.hasOwnProperty(e))
          e = $r[e];
        else if (e && typeof e.name == "string" && $r.hasOwnProperty(e.name)) {
          var t = $r[e.name];
          typeof t == "string" && (t = { name: t }), e = bi(t, e), e.name = t.name;
        } else {
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
            return Vo("application/xml");
          if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(e))
            return Vo("application/json");
        }
        return typeof e == "string" ? { name: e } : e || { name: "null" };
      }
      function cs(e, t) {
        t = Vo(t);
        var i = fs[t.name];
        if (!i)
          return cs(e, "text/plain");
        var r = i(e, t);
        if (Ci.hasOwnProperty(t.name)) {
          var l = Ci[t.name];
          for (var u in l)
            !l.hasOwnProperty(u) || (r.hasOwnProperty(u) && (r["_" + u] = r[u]), r[u] = l[u]);
        }
        if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
          for (var f in t.modeProps)
            r[f] = t.modeProps[f];
        return r;
      }
      var Ci = {};
      function Sf(e, t) {
        var i = Ci.hasOwnProperty(e) ? Ci[e] : Ci[e] = {};
        wt(t, i);
      }
      function Rn(e, t) {
        if (t === !0)
          return t;
        if (e.copyState)
          return e.copyState(t);
        var i = {};
        for (var r in t) {
          var l = t[r];
          l instanceof Array && (l = l.concat([])), i[r] = l;
        }
        return i;
      }
      function hs(e, t) {
        for (var i; e.innerMode && (i = e.innerMode(t), !(!i || i.mode == e)); )
          t = i.state, e = i.mode;
        return i || { mode: e, state: t };
      }
      function ro(e, t, i) {
        return e.startState ? e.startState(t, i) : !0;
      }
      var it = function(e, t, i) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = i;
      };
      it.prototype.eol = function() {
        return this.pos >= this.string.length;
      }, it.prototype.sol = function() {
        return this.pos == this.lineStart;
      }, it.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      }, it.prototype.next = function() {
        if (this.pos < this.string.length)
          return this.string.charAt(this.pos++);
      }, it.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos), i;
        if (typeof e == "string" ? i = t == e : i = t && (e.test ? e.test(t) : e(t)), i)
          return ++this.pos, t;
      }, it.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e); )
          ;
        return this.pos > t;
      }, it.prototype.eatSpace = function() {
        for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
          ++this.pos;
        return this.pos > e;
      }, it.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      }, it.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1)
          return this.pos = t, !0;
      }, it.prototype.backUp = function(e) {
        this.pos -= e;
      }, it.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = nt(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? nt(this.string, this.lineStart, this.tabSize) : 0);
      }, it.prototype.indentation = function() {
        return nt(this.string, null, this.tabSize) - (this.lineStart ? nt(this.string, this.lineStart, this.tabSize) : 0);
      }, it.prototype.match = function(e, t, i) {
        if (typeof e == "string") {
          var r = function(f) {
            return i ? f.toLowerCase() : f;
          }, l = this.string.substr(this.pos, e.length);
          if (r(l) == r(e))
            return t !== !1 && (this.pos += e.length), !0;
        } else {
          var u = this.string.slice(this.pos).match(e);
          return u && u.index > 0 ? null : (u && t !== !1 && (this.pos += u[0].length), u);
        }
      }, it.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      }, it.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      }, it.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e);
      }, it.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos);
      };
      function ie(e, t) {
        if (t -= e.first, t < 0 || t >= e.size)
          throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var i = e; !i.lines; )
          for (var r = 0; ; ++r) {
            var l = i.children[r], u = l.chunkSize();
            if (t < u) {
              i = l;
              break;
            }
            t -= u;
          }
        return i.lines[t];
      }
      function Xr(e, t, i) {
        var r = [], l = t.line;
        return e.iter(t.line, i.line + 1, function(u) {
          var f = u.text;
          l == i.line && (f = f.slice(0, i.ch)), l == t.line && (f = f.slice(t.ch)), r.push(f), ++l;
        }), r;
      }
      function jo(e, t, i) {
        var r = [];
        return e.iter(t, i, function(l) {
          r.push(l.text);
        }), r;
      }
      function Cn(e, t) {
        var i = t - e.height;
        if (i)
          for (var r = e; r; r = r.parent)
            r.height += i;
      }
      function Be(e) {
        if (e.parent == null)
          return null;
        for (var t = e.parent, i = ke(t.lines, e), r = t.parent; r; t = r, r = r.parent)
          for (var l = 0; r.children[l] != t; ++l)
            i += r.children[l].chunkSize();
        return i + t.first;
      }
      function Yr(e, t) {
        var i = e.first;
        e:
          do {
            for (var r = 0; r < e.children.length; ++r) {
              var l = e.children[r], u = l.height;
              if (t < u) {
                e = l;
                continue e;
              }
              t -= u, i += l.chunkSize();
            }
            return i;
          } while (!e.lines);
        for (var f = 0; f < e.lines.length; ++f) {
          var d = e.lines[f], g = d.height;
          if (t < g)
            break;
          t -= g;
        }
        return i + f;
      }
      function io(e, t) {
        return t >= e.first && t < e.first + e.size;
      }
      function ds(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }
      function q(e, t, i) {
        if (i === void 0 && (i = null), !(this instanceof q))
          return new q(e, t, i);
        this.line = e, this.ch = t, this.sticky = i;
      }
      function ge(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }
      function el(e, t) {
        return e.sticky == t.sticky && ge(e, t) == 0;
      }
      function tl(e) {
        return q(e.line, e.ch);
      }
      function _i(e, t) {
        return ge(e, t) < 0 ? t : e;
      }
      function nl(e, t) {
        return ge(e, t) < 0 ? e : t;
      }
      function ps(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }
      function de(e, t) {
        if (t.line < e.first)
          return q(e.first, 0);
        var i = e.first + e.size - 1;
        return t.line > i ? q(i, ie(e, i).text.length) : Au(t, ie(e, t.line).text.length);
      }
      function Au(e, t) {
        var i = e.ch;
        return i == null || i > t ? q(e.line, t) : i < 0 ? q(e.line, 0) : e;
      }
      function ku(e, t) {
        for (var i = [], r = 0; r < t.length; r++)
          i[r] = de(e, t[r]);
        return i;
      }
      var oo = function(e, t) {
        this.state = e, this.lookAhead = t;
      }, _n = function(e, t, i, r) {
        this.state = t, this.doc = e, this.line = i, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1;
      };
      _n.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return t != null && e > this.maxLookAhead && (this.maxLookAhead = e), t;
      }, _n.prototype.baseToken = function(e) {
        if (!this.baseTokens)
          return null;
        for (; this.baseTokens[this.baseTokenPos] <= e; )
          this.baseTokenPos += 2;
        var t = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: t && t.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - e
        };
      }, _n.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
      }, _n.fromSaved = function(e, t, i) {
        return t instanceof oo ? new _n(e, Rn(e.mode, t.state), i, t.lookAhead) : new _n(e, Rn(e.mode, t), i);
      }, _n.prototype.save = function(e) {
        var t = e !== !1 ? Rn(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new oo(t, this.maxLookAhead) : t;
      };
      function rl(e, t, i, r) {
        var l = [e.state.modeGen], u = {};
        ys(
          e,
          t.text,
          e.doc.mode,
          i,
          function(v, _) {
            return l.push(v, _);
          },
          u,
          r
        );
        for (var f = i.state, d = function(v) {
          i.baseTokens = l;
          var _ = e.state.overlays[v], T = 1, O = 0;
          i.state = !0, ys(e, t.text, _.mode, i, function(M, B) {
            for (var z = T; O < M; ) {
              var X = l[T];
              X > M && l.splice(T, 1, M, l[T + 1], X), T += 2, O = Math.min(M, X);
            }
            if (!!B)
              if (_.opaque)
                l.splice(z, T - z, M, "overlay " + B), T = z + 2;
              else
                for (; z < T; z += 2) {
                  var Z = l[z + 1];
                  l[z + 1] = (Z ? Z + " " : "") + "overlay " + B;
                }
          }, u), i.state = f, i.baseTokens = null, i.baseTokenPos = 1;
        }, g = 0; g < e.state.overlays.length; ++g)
          d(g);
        return { styles: l, classes: u.bgClass || u.textClass ? u : null };
      }
      function Fu(e, t, i) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var r = Li(e, Be(t)), l = t.text.length > e.options.maxHighlightLength && Rn(e.doc.mode, r.state), u = rl(e, t, r);
          l && (r.state = l), t.stateAfter = r.save(!l), t.styles = u.styles, u.classes ? t.styleClasses = u.classes : t.styleClasses && (t.styleClasses = null), i === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
        }
        return t.styles;
      }
      function Li(e, t, i) {
        var r = e.doc, l = e.display;
        if (!r.mode.startState)
          return new _n(r, !0, t);
        var u = Eu(e, t, i), f = u > r.first && ie(r, u - 1).stateAfter, d = f ? _n.fromSaved(r, f, u) : new _n(r, ro(r.mode), u);
        return r.iter(u, t, function(g) {
          lo(e, g.text, d);
          var v = d.line;
          g.stateAfter = v == t - 1 || v % 5 == 0 || v >= l.viewFrom && v < l.viewTo ? d.save() : null, d.nextLine();
        }), i && (r.modeFrontier = d.line), d;
      }
      function lo(e, t, i, r) {
        var l = e.doc.mode, u = new it(t, e.options.tabSize, i);
        for (u.start = u.pos = r || 0, t == "" && il(l, i.state); !u.eol(); )
          Sr(l, u, i.state), u.start = u.pos;
      }
      function il(e, t) {
        if (e.blankLine)
          return e.blankLine(t);
        if (!!e.innerMode) {
          var i = hs(e, t);
          if (i.mode.blankLine)
            return i.mode.blankLine(i.state);
        }
      }
      function Sr(e, t, i, r) {
        for (var l = 0; l < 10; l++) {
          r && (r[0] = hs(e, i).mode);
          var u = e.token(t, i);
          if (t.pos > t.start)
            return u;
        }
        throw new Error("Mode " + e.name + " failed to advance stream.");
      }
      var gs = function(e, t, i) {
        this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = i;
      };
      function vs(e, t, i, r) {
        var l = e.doc, u = l.mode, f;
        t = de(l, t);
        var d = ie(l, t.line), g = Li(e, t.line, i), v = new it(d.text, e.options.tabSize, g), _;
        for (r && (_ = []); (r || v.pos < t.ch) && !v.eol(); )
          v.start = v.pos, f = Sr(u, v, g.state), r && _.push(new gs(v, f, Rn(l.mode, g.state)));
        return r ? _ : new gs(v, f, g.state);
      }
      function Du(e, t) {
        if (e)
          for (; ; ) {
            var i = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!i)
              break;
            e = e.slice(0, i.index) + e.slice(i.index + i[0].length);
            var r = i[1] ? "bgClass" : "textClass";
            t[r] == null ? t[r] = i[2] : new RegExp("(?:^|\\s)" + i[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + i[2]);
          }
        return e;
      }
      function ys(e, t, i, r, l, u, f) {
        var d = i.flattenSpans;
        d == null && (d = e.options.flattenSpans);
        var g = 0, v = null, _ = new it(t, e.options.tabSize, r), T, O = e.options.addModeClass && [null];
        for (t == "" && Du(il(i, r.state), u); !_.eol(); ) {
          if (_.pos > e.options.maxHighlightLength ? (d = !1, f && lo(e, t, r, _.pos), _.pos = t.length, T = null) : T = Du(Sr(i, _, r.state, O), u), O) {
            var M = O[0].name;
            M && (T = "m-" + (T ? M + " " + T : M));
          }
          if (!d || v != T) {
            for (; g < _.start; )
              g = Math.min(_.start, g + 5e3), l(g, v);
            v = T;
          }
          _.start = _.pos;
        }
        for (; g < _.pos; ) {
          var B = Math.min(_.pos, g + 5e3);
          l(B, v), g = B;
        }
      }
      function Eu(e, t, i) {
        for (var r, l, u = e.doc, f = i ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), d = t; d > f; --d) {
          if (d <= u.first)
            return u.first;
          var g = ie(u, d - 1), v = g.stateAfter;
          if (v && (!i || d + (v instanceof oo ? v.lookAhead : 0) <= u.modeFrontier))
            return d;
          var _ = nt(g.text, null, e.options.tabSize);
          (l == null || r > _) && (l = d - 1, r = _);
        }
        return l;
      }
      function Mu(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
          for (var i = e.first, r = t - 1; r > i; r--) {
            var l = ie(e, r).stateAfter;
            if (l && (!(l instanceof oo) || r + l.lookAhead < t)) {
              i = r + 1;
              break;
            }
          }
          e.highlightFrontier = Math.min(e.highlightFrontier, i);
        }
      }
      var ms = !1, Jn = !1;
      function Cf() {
        ms = !0;
      }
      function _f() {
        Jn = !0;
      }
      function so(e, t, i) {
        this.marker = e, this.from = t, this.to = i;
      }
      function uo(e, t) {
        if (e)
          for (var i = 0; i < e.length; ++i) {
            var r = e[i];
            if (r.marker == t)
              return r;
          }
      }
      function Lf(e, t) {
        for (var i, r = 0; r < e.length; ++r)
          e[r] != t && (i || (i = [])).push(e[r]);
        return i;
      }
      function Tf(e, t, i) {
        var r = i && window.WeakSet && (i.markedSpans || (i.markedSpans = /* @__PURE__ */ new WeakSet()));
        r && e.markedSpans && r.has(e.markedSpans) ? e.markedSpans.push(t) : (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], r && r.add(e.markedSpans)), t.marker.attachLine(e);
      }
      function Af(e, t, i) {
        var r;
        if (e)
          for (var l = 0; l < e.length; ++l) {
            var u = e[l], f = u.marker, d = u.from == null || (f.inclusiveLeft ? u.from <= t : u.from < t);
            if (d || u.from == t && f.type == "bookmark" && (!i || !u.marker.insertLeft)) {
              var g = u.to == null || (f.inclusiveRight ? u.to >= t : u.to > t);
              (r || (r = [])).push(new so(f, u.from, g ? null : u.to));
            }
          }
        return r;
      }
      function xs(e, t, i) {
        var r;
        if (e)
          for (var l = 0; l < e.length; ++l) {
            var u = e[l], f = u.marker, d = u.to == null || (f.inclusiveRight ? u.to >= t : u.to > t);
            if (d || u.from == t && f.type == "bookmark" && (!i || u.marker.insertLeft)) {
              var g = u.from == null || (f.inclusiveLeft ? u.from <= t : u.from < t);
              (r || (r = [])).push(new so(
                f,
                g ? null : u.from - t,
                u.to == null ? null : u.to - t
              ));
            }
          }
        return r;
      }
      function ws(e, t) {
        if (t.full)
          return null;
        var i = io(e, t.from.line) && ie(e, t.from.line).markedSpans, r = io(e, t.to.line) && ie(e, t.to.line).markedSpans;
        if (!i && !r)
          return null;
        var l = t.from.ch, u = t.to.ch, f = ge(t.from, t.to) == 0, d = Af(i, l, f), g = xs(r, u, f), v = t.text.length == 1, _ = Ne(t.text).length + (v ? l : 0);
        if (d)
          for (var T = 0; T < d.length; ++T) {
            var O = d[T];
            if (O.to == null) {
              var M = uo(g, O.marker);
              M ? v && (O.to = M.to == null ? null : M.to + _) : O.to = l;
            }
          }
        if (g)
          for (var B = 0; B < g.length; ++B) {
            var z = g[B];
            if (z.to != null && (z.to += _), z.from == null) {
              var X = uo(d, z.marker);
              X || (z.from = _, v && (d || (d = [])).push(z));
            } else
              z.from += _, v && (d || (d = [])).push(z);
          }
        d && (d = Iu(d)), g && g != d && (g = Iu(g));
        var Z = [d];
        if (!v) {
          var J = t.text.length - 2, Y;
          if (J > 0 && d)
            for (var j = 0; j < d.length; ++j)
              d[j].to == null && (Y || (Y = [])).push(new so(d[j].marker, null, null));
          for (var se = 0; se < J; ++se)
            Z.push(Y);
          Z.push(g);
        }
        return Z;
      }
      function Iu(e) {
        for (var t = 0; t < e.length; ++t) {
          var i = e[t];
          i.from != null && i.from == i.to && i.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
        }
        return e.length ? e : null;
      }
      function kf(e, t, i) {
        var r = null;
        if (e.iter(t.line, i.line + 1, function(M) {
          if (M.markedSpans)
            for (var B = 0; B < M.markedSpans.length; ++B) {
              var z = M.markedSpans[B].marker;
              z.readOnly && (!r || ke(r, z) == -1) && (r || (r = [])).push(z);
            }
        }), !r)
          return null;
        for (var l = [{ from: t, to: i }], u = 0; u < r.length; ++u)
          for (var f = r[u], d = f.find(0), g = 0; g < l.length; ++g) {
            var v = l[g];
            if (!(ge(v.to, d.from) < 0 || ge(v.from, d.to) > 0)) {
              var _ = [g, 1], T = ge(v.from, d.from), O = ge(v.to, d.to);
              (T < 0 || !f.inclusiveLeft && !T) && _.push({ from: v.from, to: d.from }), (O > 0 || !f.inclusiveRight && !O) && _.push({ from: d.to, to: v.to }), l.splice.apply(l, _), g += _.length - 3;
            }
          }
        return l;
      }
      function Ou(e) {
        var t = e.markedSpans;
        if (!!t) {
          for (var i = 0; i < t.length; ++i)
            t[i].marker.detachLine(e);
          e.markedSpans = null;
        }
      }
      function Nu(e, t) {
        if (!!t) {
          for (var i = 0; i < t.length; ++i)
            t[i].marker.attachLine(e);
          e.markedSpans = t;
        }
      }
      function $e(e) {
        return e.inclusiveLeft ? -1 : 0;
      }
      function qe(e) {
        return e.inclusiveRight ? 1 : 0;
      }
      function bs(e, t) {
        var i = e.lines.length - t.lines.length;
        if (i != 0)
          return i;
        var r = e.find(), l = t.find(), u = ge(r.from, l.from) || $e(e) - $e(t);
        if (u)
          return -u;
        var f = ge(r.to, l.to) || qe(e) - qe(t);
        return f || t.id - e.id;
      }
      function Pu(e, t) {
        var i = Jn && e.markedSpans, r;
        if (i)
          for (var l = void 0, u = 0; u < i.length; ++u)
            l = i[u], l.marker.collapsed && (t ? l.from : l.to) == null && (!r || bs(r, l.marker) < 0) && (r = l.marker);
        return r;
      }
      function Ru(e) {
        return Pu(e, !0);
      }
      function ol(e) {
        return Pu(e, !1);
      }
      function Ff(e, t) {
        var i = Jn && e.markedSpans, r;
        if (i)
          for (var l = 0; l < i.length; ++l) {
            var u = i[l];
            u.marker.collapsed && (u.from == null || u.from < t) && (u.to == null || u.to > t) && (!r || bs(r, u.marker) < 0) && (r = u.marker);
          }
        return r;
      }
      function Wu(e, t, i, r, l) {
        var u = ie(e, t), f = Jn && u.markedSpans;
        if (f)
          for (var d = 0; d < f.length; ++d) {
            var g = f[d];
            if (!!g.marker.collapsed) {
              var v = g.marker.find(0), _ = ge(v.from, i) || $e(g.marker) - $e(l), T = ge(v.to, r) || qe(g.marker) - qe(l);
              if (!(_ >= 0 && T <= 0 || _ <= 0 && T >= 0) && (_ <= 0 && (g.marker.inclusiveRight && l.inclusiveLeft ? ge(v.to, i) >= 0 : ge(v.to, i) > 0) || _ >= 0 && (g.marker.inclusiveRight && l.inclusiveLeft ? ge(v.from, r) <= 0 : ge(v.from, r) < 0)))
                return !0;
            }
          }
      }
      function cn(e) {
        for (var t; t = Ru(e); )
          e = t.find(-1, !0).line;
        return e;
      }
      function Df(e) {
        for (var t; t = ol(e); )
          e = t.find(1, !0).line;
        return e;
      }
      function It(e) {
        for (var t, i; t = ol(e); )
          e = t.find(1, !0).line, (i || (i = [])).push(e);
        return i;
      }
      function ao(e, t) {
        var i = ie(e, t), r = cn(i);
        return i == r ? t : Be(r);
      }
      function Cr(e, t) {
        if (t > e.lastLine())
          return t;
        var i = ie(e, t), r;
        if (!Vn(e, i))
          return t;
        for (; r = ol(i); )
          i = r.find(1, !0).line;
        return Be(i) + 1;
      }
      function Vn(e, t) {
        var i = Jn && t.markedSpans;
        if (i) {
          for (var r = void 0, l = 0; l < i.length; ++l)
            if (r = i[l], !!r.marker.collapsed) {
              if (r.from == null)
                return !0;
              if (!r.marker.widgetNode && r.from == 0 && r.marker.inclusiveLeft && fo(e, t, r))
                return !0;
            }
        }
      }
      function fo(e, t, i) {
        if (i.to == null) {
          var r = i.marker.find(1, !0);
          return fo(e, r.line, uo(r.line.markedSpans, i.marker));
        }
        if (i.marker.inclusiveRight && i.to == t.text.length)
          return !0;
        for (var l = void 0, u = 0; u < t.markedSpans.length; ++u)
          if (l = t.markedSpans[u], l.marker.collapsed && !l.marker.widgetNode && l.from == i.to && (l.to == null || l.to != i.from) && (l.marker.inclusiveLeft || i.marker.inclusiveRight) && fo(e, t, l))
            return !0;
      }
      function ht(e) {
        e = cn(e);
        for (var t = 0, i = e.parent, r = 0; r < i.lines.length; ++r) {
          var l = i.lines[r];
          if (l == e)
            break;
          t += l.height;
        }
        for (var u = i.parent; u; i = u, u = i.parent)
          for (var f = 0; f < u.children.length; ++f) {
            var d = u.children[f];
            if (d == i)
              break;
            t += d.height;
          }
        return t;
      }
      function co(e) {
        if (e.height == 0)
          return 0;
        for (var t = e.text.length, i, r = e; i = Ru(r); ) {
          var l = i.find(0, !0);
          r = l.from.line, t += l.from.ch - l.to.ch;
        }
        for (r = e; i = ol(r); ) {
          var u = i.find(0, !0);
          t -= r.text.length - u.from.ch, r = u.to.line, t += r.text.length - u.to.ch;
        }
        return t;
      }
      function ll(e) {
        var t = e.display, i = e.doc;
        t.maxLine = ie(i, i.first), t.maxLineLength = co(t.maxLine), t.maxLineChanged = !0, i.iter(function(r) {
          var l = co(r);
          l > t.maxLineLength && (t.maxLineLength = l, t.maxLine = r);
        });
      }
      var Zr = function(e, t, i) {
        this.text = e, Nu(this, t), this.height = i ? i(this) : 1;
      };
      Zr.prototype.lineNo = function() {
        return Be(this);
      }, Si(Zr);
      function Bu(e, t, i, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), e.order != null && (e.order = null), Ou(e), Nu(e, i);
        var l = r ? r(e) : 1;
        l != e.height && Cn(e, l);
      }
      function Hu(e) {
        e.parent = null, Ou(e);
      }
      var zu = {}, nn = {};
      function Uu(e, t) {
        if (!e || /^\s*$/.test(e))
          return null;
        var i = t.addModeClass ? nn : zu;
        return i[e] || (i[e] = e.replace(/\S+/g, "cm-$&"));
      }
      function rn(e, t) {
        var i = xr("span", null, null, R ? "padding-right: .1px" : null), r = {
          pre: xr("pre", [i], "CodeMirror-line"),
          content: i,
          col: 0,
          pos: 0,
          cm: e,
          trailingSpace: !1,
          splitSpaces: e.getOption("lineWrapping")
        };
        t.measure = {};
        for (var l = 0; l <= (t.rest ? t.rest.length : 0); l++) {
          var u = l ? t.rest[l - 1] : t.line, f = void 0;
          r.pos = 0, r.addToken = Gu, vf(e.display.measure) && (f = Sn(u, e.doc.direction)) && (r.addToken = sl(r.addToken, f)), r.map = [];
          var d = t != e.display.externalMeasured && Be(u);
          Ve(u, r, Fu(e, u, d)), u.styleClasses && (u.styleClasses.bgClass && (r.bgClass = re(u.styleClasses.bgClass, r.bgClass || "")), u.styleClasses.textClass && (r.textClass = re(u.styleClasses.textClass, r.textClass || ""))), r.map.length == 0 && r.map.push(0, 0, r.content.appendChild(ls(e.display.measure))), l == 0 ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }
        if (R) {
          var g = r.content.lastChild;
          (/\bcm-tab\b/.test(g.className) || g.querySelector && g.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack");
        }
        return rt(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = re(r.pre.className, r.textClass || "")), r;
      }
      function Ef(e) {
        var t = ae("span", "\u2022", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }
      function Gu(e, t, i, r, l, u, f) {
        if (!!t) {
          var d = e.splitSpaces ? _r(t, e.trailingSpace) : t, g = e.cm.state.specialChars, v = !1, _;
          if (!g.test(t))
            e.col += t.length, _ = document.createTextNode(d), e.map.push(e.pos, e.pos + t.length, _), D && P < 9 && (v = !0), e.pos += t.length;
          else {
            _ = document.createDocumentFragment();
            for (var T = 0; ; ) {
              g.lastIndex = T;
              var O = g.exec(t), M = O ? O.index - T : t.length - T;
              if (M) {
                var B = document.createTextNode(d.slice(T, T + M));
                D && P < 9 ? _.appendChild(ae("span", [B])) : _.appendChild(B), e.map.push(e.pos, e.pos + M, B), e.col += M, e.pos += M;
              }
              if (!O)
                break;
              T += M + 1;
              var z = void 0;
              if (O[0] == "	") {
                var X = e.cm.options.tabSize, Z = X - e.col % X;
                z = _.appendChild(ae("span", bn(Z), "cm-tab")), z.setAttribute("role", "presentation"), z.setAttribute("cm-text", "	"), e.col += Z;
              } else
                O[0] == "\r" || O[0] == `
` ? (z = _.appendChild(ae("span", O[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar")), z.setAttribute("cm-text", O[0]), e.col += 1) : (z = e.cm.options.specialCharPlaceholder(O[0]), z.setAttribute("cm-text", O[0]), D && P < 9 ? _.appendChild(ae("span", [z])) : _.appendChild(z), e.col += 1);
              e.map.push(e.pos, e.pos + 1, z), e.pos++;
            }
          }
          if (e.trailingSpace = d.charCodeAt(t.length - 1) == 32, i || r || l || v || u || f) {
            var J = i || "";
            r && (J += r), l && (J += l);
            var Y = ae("span", [_], J, u);
            if (f)
              for (var j in f)
                f.hasOwnProperty(j) && j != "style" && j != "class" && Y.setAttribute(j, f[j]);
            return e.content.appendChild(Y);
          }
          e.content.appendChild(_);
        }
      }
      function _r(e, t) {
        if (e.length > 1 && !/  /.test(e))
          return e;
        for (var i = t, r = "", l = 0; l < e.length; l++) {
          var u = e.charAt(l);
          u == " " && i && (l == e.length - 1 || e.charCodeAt(l + 1) == 32) && (u = "\xA0"), r += u, i = u == " ";
        }
        return r;
      }
      function sl(e, t) {
        return function(i, r, l, u, f, d, g) {
          l = l ? l + " cm-force-border" : "cm-force-border";
          for (var v = i.pos, _ = v + r.length; ; ) {
            for (var T = void 0, O = 0; O < t.length && (T = t[O], !(T.to > v && T.from <= v)); O++)
              ;
            if (T.to >= _)
              return e(i, r, l, u, f, d, g);
            e(i, r.slice(0, T.to - v), l, u, null, d, g), u = null, r = r.slice(T.to - v), v = T.to;
          }
        };
      }
      function ul(e, t, i, r) {
        var l = !r && i.widgetNode;
        l && e.map.push(e.pos, e.pos + t, l), !r && e.cm.display.input.needsContentAttribute && (l || (l = e.content.appendChild(document.createElement("span"))), l.setAttribute("cm-marker", i.id)), l && (e.cm.display.input.setUneditable(l), e.content.appendChild(l)), e.pos += t, e.trailingSpace = !1;
      }
      function Ve(e, t, i) {
        var r = e.markedSpans, l = e.text, u = 0;
        if (!r) {
          for (var f = 1; f < i.length; f += 2)
            t.addToken(t, l.slice(u, u = i[f]), Uu(i[f + 1], t.cm.options));
          return;
        }
        for (var d = l.length, g = 0, v = 1, _ = "", T, O, M = 0, B, z, X, Z, J; ; ) {
          if (M == g) {
            B = z = X = O = "", J = null, Z = null, M = 1 / 0;
            for (var Y = [], j = void 0, se = 0; se < r.length; ++se) {
              var oe = r[se], me = oe.marker;
              if (me.type == "bookmark" && oe.from == g && me.widgetNode)
                Y.push(me);
              else if (oe.from <= g && (oe.to == null || oe.to > g || me.collapsed && oe.to == g && oe.from == g)) {
                if (oe.to != null && oe.to != g && M > oe.to && (M = oe.to, z = ""), me.className && (B += " " + me.className), me.css && (O = (O ? O + ";" : "") + me.css), me.startStyle && oe.from == g && (X += " " + me.startStyle), me.endStyle && oe.to == M && (j || (j = [])).push(me.endStyle, oe.to), me.title && ((J || (J = {})).title = me.title), me.attributes)
                  for (var Ue in me.attributes)
                    (J || (J = {}))[Ue] = me.attributes[Ue];
                me.collapsed && (!Z || bs(Z.marker, me) < 0) && (Z = oe);
              } else
                oe.from > g && M > oe.from && (M = oe.from);
            }
            if (j)
              for (var gt = 0; gt < j.length; gt += 2)
                j[gt + 1] == M && (z += " " + j[gt]);
            if (!Z || Z.from == g)
              for (var Je = 0; Je < Y.length; ++Je)
                ul(t, 0, Y[Je]);
            if (Z && (Z.from || 0) == g) {
              if (ul(
                t,
                (Z.to == null ? d + 1 : Z.to) - g,
                Z.marker,
                Z.from == null
              ), Z.to == null)
                return;
              Z.to == g && (Z = !1);
            }
          }
          if (g >= d)
            break;
          for (var Nt = Math.min(d, M); ; ) {
            if (_) {
              var zt = g + _.length;
              if (!Z) {
                var Ge = zt > Nt ? _.slice(0, Nt - g) : _;
                t.addToken(
                  t,
                  Ge,
                  T ? T + B : B,
                  X,
                  g + Ge.length == M ? z : "",
                  O,
                  J
                );
              }
              if (zt >= Nt) {
                _ = _.slice(Nt - g), g = Nt;
                break;
              }
              g = zt, X = "";
            }
            _ = l.slice(u, u = i[v++]), T = Uu(i[v++], t.cm.options);
          }
        }
      }
      function jn(e, t, i) {
        this.line = t, this.rest = It(t), this.size = this.rest ? Be(Ne(this.rest)) - i + 1 : 1, this.node = this.text = null, this.hidden = Vn(e, t);
      }
      function Ti(e, t, i) {
        for (var r = [], l, u = t; u < i; u = l) {
          var f = new jn(e.doc, ie(e.doc, u), u);
          l = u + f.size, r.push(f);
        }
        return r;
      }
      var Ai = null;
      function Ss(e) {
        Ai ? Ai.ops.push(e) : e.ownsGroup = Ai = {
          ops: [e],
          delayedCallbacks: []
        };
      }
      function Mf(e) {
        var t = e.delayedCallbacks, i = 0;
        do {
          for (; i < t.length; i++)
            t[i].call(null);
          for (var r = 0; r < e.ops.length; r++) {
            var l = e.ops[r];
            if (l.cursorActivityHandlers)
              for (; l.cursorActivityCalled < l.cursorActivityHandlers.length; )
                l.cursorActivityHandlers[l.cursorActivityCalled++].call(null, l.cm);
          }
        } while (i < t.length);
      }
      function If(e, t) {
        var i = e.ownsGroup;
        if (!!i)
          try {
            Mf(i);
          } finally {
            Ai = null, t(i);
          }
      }
      var ho = null;
      function dt(e, t) {
        var i = ts(e, t);
        if (!!i.length) {
          var r = Array.prototype.slice.call(arguments, 2), l;
          Ai ? l = Ai.delayedCallbacks : ho ? l = ho : (l = ho = [], setTimeout(al, 0));
          for (var u = function(d) {
            l.push(function() {
              return i[d].apply(null, r);
            });
          }, f = 0; f < i.length; ++f)
            u(f);
        }
      }
      function al() {
        var e = ho;
        ho = null;
        for (var t = 0; t < e.length; ++t)
          e[t]();
      }
      function Qr(e, t, i, r) {
        for (var l = 0; l < t.changes.length; l++) {
          var u = t.changes[l];
          u == "text" ? _s(e, t) : u == "gutter" ? Ls(e, t, i, r) : u == "class" ? go(e, t) : u == "widget" && Of(e, t, r);
        }
        t.changes = null;
      }
      function po(e) {
        return e.node == e.text && (e.node = ae("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), D && P < 8 && (e.node.style.zIndex = 2)), e.node;
      }
      function qu(e, t) {
        var i = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (i && (i += " CodeMirror-linebackground"), t.background)
          i ? t.background.className = i : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (i) {
          var r = po(t);
          t.background = r.insertBefore(ae("div", null, i), r.firstChild), e.display.input.setUneditable(t.background);
        }
      }
      function Cs(e, t) {
        var i = e.display.externalMeasured;
        return i && i.line == t.line ? (e.display.externalMeasured = null, t.measure = i.measure, i.built) : rn(e, t);
      }
      function _s(e, t) {
        var i = t.text.className, r = Cs(e, t);
        t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, go(e, t)) : i && (t.text.className = i);
      }
      function go(e, t) {
        qu(e, t), t.line.wrapClass ? po(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var i = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = i || "";
      }
      function Ls(e, t, i, r) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var l = po(t);
          t.gutterBackground = ae(
            "div",
            null,
            "CodeMirror-gutter-background " + t.line.gutterClass,
            "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"
          ), e.display.input.setUneditable(t.gutterBackground), l.insertBefore(t.gutterBackground, t.text);
        }
        var u = t.line.gutterMarkers;
        if (e.options.lineNumbers || u) {
          var f = po(t), d = t.gutter = ae("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
          if (d.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(d), f.insertBefore(d, t.text), t.line.gutterClass && (d.className += " " + t.line.gutterClass), e.options.lineNumbers && (!u || !u["CodeMirror-linenumbers"]) && (t.lineNumber = d.appendChild(
            ae(
              "div",
              ds(e.options, i),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"
            )
          )), u)
            for (var g = 0; g < e.display.gutterSpecs.length; ++g) {
              var v = e.display.gutterSpecs[g].className, _ = u.hasOwnProperty(v) && u[v];
              _ && d.appendChild(ae(
                "div",
                [_],
                "CodeMirror-gutter-elt",
                "left: " + r.gutterLeft[v] + "px; width: " + r.gutterWidth[v] + "px"
              ));
            }
        }
      }
      function Of(e, t, i) {
        t.alignable && (t.alignable = null);
        for (var r = Zn("CodeMirror-linewidget"), l = t.node.firstChild, u = void 0; l; l = u)
          u = l.nextSibling, r.test(l.className) && t.node.removeChild(l);
        fl(e, t, i);
      }
      function Ts(e, t, i, r) {
        var l = Cs(e, t);
        return t.text = t.node = l.pre, l.bgClass && (t.bgClass = l.bgClass), l.textClass && (t.textClass = l.textClass), go(e, t), Ls(e, t, i, r), fl(e, t, r), t.node;
      }
      function fl(e, t, i) {
        if (Ku(e, t.line, t, i, !0), t.rest)
          for (var r = 0; r < t.rest.length; r++)
            Ku(e, t.rest[r], t, i, !1);
      }
      function Ku(e, t, i, r, l) {
        if (!!t.widgets)
          for (var u = po(i), f = 0, d = t.widgets; f < d.length; ++f) {
            var g = d[f], v = ae("div", [g.node], "CodeMirror-linewidget" + (g.className ? " " + g.className : ""));
            g.handleMouseEvents || v.setAttribute("cm-ignore-events", "true"), $u(g, v, i, r), e.display.input.setUneditable(v), l && g.above ? u.insertBefore(v, i.gutter || i.text) : u.appendChild(v), dt(g, "redraw");
          }
      }
      function $u(e, t, i, r) {
        if (e.noHScroll) {
          (i.alignable || (i.alignable = [])).push(t);
          var l = r.wrapperWidth;
          t.style.left = r.fixedPos + "px", e.coverGutter || (l -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = l + "px";
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
      }
      function Ot(e) {
        if (e.height != null)
          return e.height;
        var t = e.doc.cm;
        if (!t)
          return 0;
        if (!k(document.body, e.node)) {
          var i = "position: relative;";
          e.coverGutter && (i += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (i += "width: " + t.display.wrapper.clientWidth + "px;"), Wt(t.display.measure, ae("div", [e.node], null, i));
        }
        return e.height = e.node.parentNode.offsetHeight;
      }
      function Ln(e, t) {
        for (var i = rs(t); i != e.wrapper; i = i.parentNode)
          if (!i || i.nodeType == 1 && i.getAttribute("cm-ignore-events") == "true" || i.parentNode == e.sizer && i != e.mover)
            return !0;
      }
      function Lr(e) {
        return e.lineSpace.offsetTop;
      }
      function cl(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }
      function As(e) {
        if (e.cachedPaddingH)
          return e.cachedPaddingH;
        var t = Wt(e.measure, ae("pre", "x", "CodeMirror-line-like")), i = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, r = { left: parseInt(i.paddingLeft), right: parseInt(i.paddingRight) };
        return !isNaN(r.left) && !isNaN(r.right) && (e.cachedPaddingH = r), r;
      }
      function Wn(e) {
        return qo - e.display.nativeBarWidth;
      }
      function Jr(e) {
        return e.display.scroller.clientWidth - Wn(e) - e.display.barWidth;
      }
      function ks(e) {
        return e.display.scroller.clientHeight - Wn(e) - e.display.barHeight;
      }
      function Nf(e, t, i) {
        var r = e.options.lineWrapping, l = r && Jr(e);
        if (!t.measure.heights || r && t.measure.width != l) {
          var u = t.measure.heights = [];
          if (r) {
            t.measure.width = l;
            for (var f = t.text.firstChild.getClientRects(), d = 0; d < f.length - 1; d++) {
              var g = f[d], v = f[d + 1];
              Math.abs(g.bottom - v.bottom) > 2 && u.push((g.bottom + v.top) / 2 - i.top);
            }
          }
          u.push(i.bottom - i.top);
        }
      }
      function Xu(e, t, i) {
        if (e.line == t)
          return { map: e.measure.map, cache: e.measure.cache };
        if (e.rest) {
          for (var r = 0; r < e.rest.length; r++)
            if (e.rest[r] == t)
              return { map: e.measure.maps[r], cache: e.measure.caches[r] };
          for (var l = 0; l < e.rest.length; l++)
            if (Be(e.rest[l]) > i)
              return { map: e.measure.maps[l], cache: e.measure.caches[l], before: !0 };
        }
      }
      function ki(e, t) {
        t = cn(t);
        var i = Be(t), r = e.display.externalMeasured = new jn(e.doc, t, i);
        r.lineN = i;
        var l = r.built = rn(e, r);
        return r.text = l.pre, Wt(e.display.lineMeasure, l.pre), r;
      }
      function Yu(e, t, i, r) {
        return Tn(e, Tr(e, t), i, r);
      }
      function Fs(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo)
          return e.display.view[kr(e, t)];
        var i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size)
          return i;
      }
      function Tr(e, t) {
        var i = Be(t), r = Fs(e, i);
        r && !r.text ? r = null : r && r.changes && (Qr(e, r, i, Ar(e)), e.curOp.forceUpdate = !0), r || (r = ki(e, t));
        var l = Xu(r, t, i);
        return {
          line: t,
          view: r,
          rect: null,
          map: l.map,
          cache: l.cache,
          before: l.before,
          hasHeights: !1
        };
      }
      function Tn(e, t, i, r, l) {
        t.before && (i = -1);
        var u = i + (r || ""), f;
        return t.cache.hasOwnProperty(u) ? f = t.cache[u] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Nf(e, t.view, t.rect), t.hasHeights = !0), f = Rf(e, t, i, r), f.bogus || (t.cache[u] = f)), {
          left: f.left,
          right: f.right,
          top: l ? f.rtop : f.top,
          bottom: l ? f.rbottom : f.bottom
        };
      }
      var er = { left: 0, right: 0, top: 0, bottom: 0 };
      function vo(e, t, i) {
        for (var r, l, u, f, d, g, v = 0; v < e.length; v += 3)
          if (d = e[v], g = e[v + 1], t < d ? (l = 0, u = 1, f = "left") : t < g ? (l = t - d, u = l + 1) : (v == e.length - 3 || t == g && e[v + 3] > t) && (u = g - d, l = u - 1, t >= g && (f = "right")), l != null) {
            if (r = e[v + 2], d == g && i == (r.insertLeft ? "left" : "right") && (f = i), i == "left" && l == 0)
              for (; v && e[v - 2] == e[v - 3] && e[v - 1].insertLeft; )
                r = e[(v -= 3) + 2], f = "left";
            if (i == "right" && l == g - d)
              for (; v < e.length - 3 && e[v + 3] == e[v + 4] && !e[v + 5].insertLeft; )
                r = e[(v += 3) + 2], f = "right";
            break;
          }
        return { node: r, start: l, end: u, collapse: f, coverStart: d, coverEnd: g };
      }
      function Pf(e, t) {
        var i = er;
        if (t == "left")
          for (var r = 0; r < e.length && (i = e[r]).left == i.right; r++)
            ;
        else
          for (var l = e.length - 1; l >= 0 && (i = e[l]).left == i.right; l--)
            ;
        return i;
      }
      function Rf(e, t, i, r) {
        var l = vo(t.map, i, r), u = l.node, f = l.start, d = l.end, g = l.collapse, v;
        if (u.nodeType == 3) {
          for (var _ = 0; _ < 4; _++) {
            for (; f && br(t.line.text.charAt(l.coverStart + f)); )
              --f;
            for (; l.coverStart + d < l.coverEnd && br(t.line.text.charAt(l.coverStart + d)); )
              ++d;
            if (D && P < 9 && f == 0 && d == l.coverEnd - l.coverStart ? v = u.parentNode.getBoundingClientRect() : v = Pf(Bt(u, f, d).getClientRects(), r), v.left || v.right || f == 0)
              break;
            d = f, f = f - 1, g = "right";
          }
          D && P < 11 && (v = Wf(e.display.measure, v));
        } else {
          f > 0 && (g = r = "right");
          var T;
          e.options.lineWrapping && (T = u.getClientRects()).length > 1 ? v = T[r == "right" ? T.length - 1 : 0] : v = u.getBoundingClientRect();
        }
        if (D && P < 9 && !f && (!v || !v.left && !v.right)) {
          var O = u.parentNode.getClientRects()[0];
          O ? v = { left: O.left, right: O.left + Di(e.display), top: O.top, bottom: O.bottom } : v = er;
        }
        for (var M = v.top - t.rect.top, B = v.bottom - t.rect.top, z = (M + B) / 2, X = t.view.measure.heights, Z = 0; Z < X.length - 1 && !(z < X[Z]); Z++)
          ;
        var J = Z ? X[Z - 1] : 0, Y = X[Z], j = {
          left: (g == "right" ? v.right : v.left) - t.rect.left,
          right: (g == "left" ? v.left : v.right) - t.rect.left,
          top: J,
          bottom: Y
        };
        return !v.left && !v.right && (j.bogus = !0), e.options.singleCursorHeightPerLine || (j.rtop = M, j.rbottom = B), j;
      }
      function Wf(e, t) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !xf(e))
          return t;
        var i = screen.logicalXDPI / screen.deviceXDPI, r = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: t.left * i,
          right: t.right * i,
          top: t.top * r,
          bottom: t.bottom * r
        };
      }
      function Vr(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
          for (var t = 0; t < e.rest.length; t++)
            e.measure.caches[t] = {};
      }
      function hn(e) {
        e.display.externalMeasure = null, Pn(e.display.lineMeasure);
        for (var t = 0; t < e.display.view.length; t++)
          Vr(e.display.view[t]);
      }
      function Fi(e) {
        hn(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
      }
      function Zu(e) {
        return V && we ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft)) : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft;
      }
      function Qu(e) {
        return V && we ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop)) : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop;
      }
      function Ds(e) {
        var t = cn(e), i = t.widgets, r = 0;
        if (i)
          for (var l = 0; l < i.length; ++l)
            i[l].above && (r += Ot(i[l]));
        return r;
      }
      function hl(e, t, i, r, l) {
        if (!l) {
          var u = Ds(t);
          i.top += u, i.bottom += u;
        }
        if (r == "line")
          return i;
        r || (r = "local");
        var f = ht(t);
        if (r == "local" ? f += Lr(e.display) : f -= e.display.viewOffset, r == "page" || r == "window") {
          var d = e.display.lineSpace.getBoundingClientRect();
          f += d.top + (r == "window" ? 0 : Qu(Me(e)));
          var g = d.left + (r == "window" ? 0 : Zu(Me(e)));
          i.left += g, i.right += g;
        }
        return i.top += f, i.bottom += f, i;
      }
      function Ju(e, t, i) {
        if (i == "div")
          return t;
        var r = t.left, l = t.top;
        if (i == "page")
          r -= Zu(Me(e)), l -= Qu(Me(e));
        else if (i == "local" || !i) {
          var u = e.display.sizer.getBoundingClientRect();
          r += u.left, l += u.top;
        }
        var f = e.display.lineSpace.getBoundingClientRect();
        return { left: r - f.left, top: l - f.top };
      }
      function tr(e, t, i, r, l) {
        return r || (r = ie(e.doc, t.line)), hl(e, r, Yu(e, r, t.ch, l), i);
      }
      function I(e, t, i, r, l, u) {
        r = r || ie(e.doc, t.line), l || (l = Tr(e, r));
        function f(B, z) {
          var X = Tn(e, l, B, z ? "right" : "left", u);
          return z ? X.left = X.right : X.right = X.left, hl(e, r, X, i);
        }
        var d = Sn(r, e.doc.direction), g = t.ch, v = t.sticky;
        if (g >= r.text.length ? (g = r.text.length, v = "before") : g <= 0 && (g = 0, v = "after"), !d)
          return f(v == "before" ? g - 1 : g, v == "before");
        function _(B, z, X) {
          var Z = d[z], J = Z.level == 1;
          return f(X ? B - 1 : B, J != X);
        }
        var T = Kr(d, g, v), O = qr, M = _(g, T, v == "before");
        return O != null && (M.other = _(g, O, v != "before")), M;
      }
      function H(e, t) {
        var i = 0;
        t = de(e.doc, t), e.options.lineWrapping || (i = Di(e.display) * t.ch);
        var r = ie(e.doc, t.line), l = ht(r) + Lr(e.display);
        return { left: i, right: i, top: l, bottom: l + r.height };
      }
      function W(e, t, i, r, l) {
        var u = q(e, t, i);
        return u.xRel = l, r && (u.outside = r), u;
      }
      function te(e, t, i) {
        var r = e.doc;
        if (i += e.display.viewOffset, i < 0)
          return W(r.first, 0, null, -1, -1);
        var l = Yr(r, i), u = r.first + r.size - 1;
        if (l > u)
          return W(r.first + r.size - 1, ie(r, u).text.length, null, 1, 1);
        t < 0 && (t = 0);
        for (var f = ie(r, l); ; ) {
          var d = Ye(e, f, l, t, i), g = Ff(f, d.ch + (d.xRel > 0 || d.outside > 0 ? 1 : 0));
          if (!g)
            return d;
          var v = g.find(1);
          if (v.line == l)
            return v;
          f = ie(r, l = v.line);
        }
      }
      function xe(e, t, i, r) {
        r -= Ds(t);
        var l = t.text.length, u = Gr(function(f) {
          return Tn(e, i, f - 1).bottom <= r;
        }, l, 0);
        return l = Gr(function(f) {
          return Tn(e, i, f).top > r;
        }, u, l), { begin: u, end: l };
      }
      function Pe(e, t, i, r) {
        i || (i = Tr(e, t));
        var l = hl(e, t, Tn(e, i, r), "line").top;
        return xe(e, t, i, l);
      }
      function ot(e, t, i, r) {
        return e.bottom <= i ? !1 : e.top > i ? !0 : (r ? e.left : e.right) > t;
      }
      function Ye(e, t, i, r, l) {
        l -= ht(t);
        var u = Tr(e, t), f = Ds(t), d = 0, g = t.text.length, v = !0, _ = Sn(t, e.doc.direction);
        if (_) {
          var T = (e.options.lineWrapping ? Bf : Es)(e, t, i, u, _, r, l);
          v = T.level != 1, d = v ? T.from : T.to - 1, g = v ? T.to : T.from - 1;
        }
        var O = null, M = null, B = Gr(function(se) {
          var oe = Tn(e, u, se);
          return oe.top += f, oe.bottom += f, ot(oe, r, l, !1) ? (oe.top <= l && oe.left <= r && (O = se, M = oe), !0) : !1;
        }, d, g), z, X, Z = !1;
        if (M) {
          var J = r - M.left < M.right - r, Y = J == v;
          B = O + (Y ? 0 : 1), X = Y ? "after" : "before", z = J ? M.left : M.right;
        } else {
          !v && (B == g || B == d) && B++, X = B == 0 ? "after" : B == t.text.length ? "before" : Tn(e, u, B - (v ? 1 : 0)).bottom + f <= l == v ? "after" : "before";
          var j = I(e, q(i, B, X), "line", t, u);
          z = j.left, Z = l < j.top ? -1 : l >= j.bottom ? 1 : 0;
        }
        return B = Zo(t.text, B, 1), W(i, B, X, Z, r - z);
      }
      function Es(e, t, i, r, l, u, f) {
        var d = Gr(function(T) {
          var O = l[T], M = O.level != 1;
          return ot(I(
            e,
            q(i, M ? O.to : O.from, M ? "before" : "after"),
            "line",
            t,
            r
          ), u, f, !0);
        }, 0, l.length - 1), g = l[d];
        if (d > 0) {
          var v = g.level != 1, _ = I(
            e,
            q(i, v ? g.from : g.to, v ? "after" : "before"),
            "line",
            t,
            r
          );
          ot(_, u, f, !0) && _.top > f && (g = l[d - 1]);
        }
        return g;
      }
      function Bf(e, t, i, r, l, u, f) {
        var d = xe(e, t, r, f), g = d.begin, v = d.end;
        /\s/.test(t.text.charAt(v - 1)) && v--;
        for (var _ = null, T = null, O = 0; O < l.length; O++) {
          var M = l[O];
          if (!(M.from >= v || M.to <= g)) {
            var B = M.level != 1, z = Tn(e, r, B ? Math.min(v, M.to) - 1 : Math.max(g, M.from)).right, X = z < u ? u - z + 1e9 : z - u;
            (!_ || T > X) && (_ = M, T = X);
          }
        }
        return _ || (_ = l[l.length - 1]), _.from < g && (_ = { from: g, to: _.to, level: _.level }), _.to > v && (_ = { from: _.from, to: v, level: _.level }), _;
      }
      var At;
      function nr(e) {
        if (e.cachedTextHeight != null)
          return e.cachedTextHeight;
        if (At == null) {
          At = ae("pre", null, "CodeMirror-line-like");
          for (var t = 0; t < 49; ++t)
            At.appendChild(document.createTextNode("x")), At.appendChild(ae("br"));
          At.appendChild(document.createTextNode("x"));
        }
        Wt(e.measure, At);
        var i = At.offsetHeight / 50;
        return i > 3 && (e.cachedTextHeight = i), Pn(e.measure), i || 1;
      }
      function Di(e) {
        if (e.cachedCharWidth != null)
          return e.cachedCharWidth;
        var t = ae("span", "xxxxxxxxxx"), i = ae("pre", [t], "CodeMirror-line-like");
        Wt(e.measure, i);
        var r = t.getBoundingClientRect(), l = (r.right - r.left) / 10;
        return l > 2 && (e.cachedCharWidth = l), l || 10;
      }
      function Ar(e) {
        for (var t = e.display, i = {}, r = {}, l = t.gutters.clientLeft, u = t.gutters.firstChild, f = 0; u; u = u.nextSibling, ++f) {
          var d = e.display.gutterSpecs[f].className;
          i[d] = u.offsetLeft + u.clientLeft + l, r[d] = u.clientWidth;
        }
        return {
          fixedPos: Ei(t),
          gutterTotalWidth: t.gutters.offsetWidth,
          gutterLeft: i,
          gutterWidth: r,
          wrapperWidth: t.wrapper.clientWidth
        };
      }
      function Ei(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }
      function yo(e) {
        var t = nr(e.display), i = e.options.lineWrapping, r = i && Math.max(5, e.display.scroller.clientWidth / Di(e.display) - 3);
        return function(l) {
          if (Vn(e.doc, l))
            return 0;
          var u = 0;
          if (l.widgets)
            for (var f = 0; f < l.widgets.length; f++)
              l.widgets[f].height && (u += l.widgets[f].height);
          return i ? u + (Math.ceil(l.text.length / r) || 1) * t : u + t;
        };
      }
      function He(e) {
        var t = e.doc, i = yo(e);
        t.iter(function(r) {
          var l = i(r);
          l != r.height && Cn(r, l);
        });
      }
      function jr(e, t, i, r) {
        var l = e.display;
        if (!i && rs(t).getAttribute("cm-not-content") == "true")
          return null;
        var u, f, d = l.lineSpace.getBoundingClientRect();
        try {
          u = t.clientX - d.left, f = t.clientY - d.top;
        } catch {
          return null;
        }
        var g = te(e, u, f), v;
        if (r && g.xRel > 0 && (v = ie(e.doc, g.line).text).length == g.ch) {
          var _ = nt(v, v.length, e.options.tabSize) - v.length;
          g = q(g.line, Math.max(0, Math.round((u - As(e.display).left) / Di(e.display)) - _));
        }
        return g;
      }
      function kr(e, t) {
        if (t >= e.display.viewTo || (t -= e.display.viewFrom, t < 0))
          return null;
        for (var i = e.display.view, r = 0; r < i.length; r++)
          if (t -= i[r].size, t < 0)
            return r;
      }
      function kt(e, t, i, r) {
        t == null && (t = e.doc.first), i == null && (i = e.doc.first + e.doc.size), r || (r = 0);
        var l = e.display;
        if (r && i < l.viewTo && (l.updateLineNumbers == null || l.updateLineNumbers > t) && (l.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= l.viewTo)
          Jn && ao(e.doc, t) < l.viewTo && Dr(e);
        else if (i <= l.viewFrom)
          Jn && Cr(e.doc, i + r) > l.viewFrom ? Dr(e) : (l.viewFrom += r, l.viewTo += r);
        else if (t <= l.viewFrom && i >= l.viewTo)
          Dr(e);
        else if (t <= l.viewFrom) {
          var u = dl(e, i, i + r, 1);
          u ? (l.view = l.view.slice(u.index), l.viewFrom = u.lineN, l.viewTo += r) : Dr(e);
        } else if (i >= l.viewTo) {
          var f = dl(e, t, t, -1);
          f ? (l.view = l.view.slice(0, f.index), l.viewTo = f.lineN) : Dr(e);
        } else {
          var d = dl(e, t, t, -1), g = dl(e, i, i + r, 1);
          d && g ? (l.view = l.view.slice(0, d.index).concat(Ti(e, d.lineN, g.lineN)).concat(l.view.slice(g.index)), l.viewTo += r) : Dr(e);
        }
        var v = l.externalMeasured;
        v && (i < v.lineN ? v.lineN += r : t < v.lineN + v.size && (l.externalMeasured = null));
      }
      function Fr(e, t, i) {
        e.curOp.viewChanged = !0;
        var r = e.display, l = e.display.externalMeasured;
        if (l && t >= l.lineN && t < l.lineN + l.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
          var u = r.view[kr(e, t)];
          if (u.node != null) {
            var f = u.changes || (u.changes = []);
            ke(f, i) == -1 && f.push(i);
          }
        }
      }
      function Dr(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }
      function dl(e, t, i, r) {
        var l = kr(e, t), u, f = e.display.view;
        if (!Jn || i == e.doc.first + e.doc.size)
          return { index: l, lineN: i };
        for (var d = e.display.viewFrom, g = 0; g < l; g++)
          d += f[g].size;
        if (d != t) {
          if (r > 0) {
            if (l == f.length - 1)
              return null;
            u = d + f[l].size - t, l++;
          } else
            u = d - t;
          t += u, i += u;
        }
        for (; ao(e.doc, i) != i; ) {
          if (l == (r < 0 ? 0 : f.length - 1))
            return null;
          i += r * f[l - (r < 0 ? 1 : 0)].size, l += r;
        }
        return { index: l, lineN: i };
      }
      function pl(e, t, i) {
        var r = e.display, l = r.view;
        l.length == 0 || t >= r.viewTo || i <= r.viewFrom ? (r.view = Ti(e, t, i), r.viewFrom = t) : (r.viewFrom > t ? r.view = Ti(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(kr(e, t))), r.viewFrom = t, r.viewTo < i ? r.view = r.view.concat(Ti(e, r.viewTo, i)) : r.viewTo > i && (r.view = r.view.slice(0, kr(e, i)))), r.viewTo = i;
      }
      function rr(e) {
        for (var t = e.display.view, i = 0, r = 0; r < t.length; r++) {
          var l = t[r];
          !l.hidden && (!l.node || l.changes) && ++i;
        }
        return i;
      }
      function Er(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }
      function Ms(e, t) {
        t === void 0 && (t = !0);
        var i = e.doc, r = {}, l = r.cursors = document.createDocumentFragment(), u = r.selection = document.createDocumentFragment(), f = e.options.$customCursor;
        f && (t = !0);
        for (var d = 0; d < i.sel.ranges.length; d++)
          if (!(!t && d == i.sel.primIndex)) {
            var g = i.sel.ranges[d];
            if (!(g.from().line >= e.display.viewTo || g.to().line < e.display.viewFrom)) {
              var v = g.empty();
              if (f) {
                var _ = f(e, g);
                _ && Mi(e, _, l);
              } else
                (v || e.options.showCursorWhenSelecting) && Mi(e, g.head, l);
              v || Vu(e, g, u);
            }
          }
        return r;
      }
      function Mi(e, t, i) {
        var r = I(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), l = i.appendChild(ae("div", "\xA0", "CodeMirror-cursor"));
        if (l.style.left = r.left + "px", l.style.top = r.top + "px", l.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", /\bcm-fat-cursor\b/.test(e.getWrapperElement().className)) {
          var u = tr(e, t, "div", null, null), f = u.right - u.left;
          l.style.width = (f > 0 ? f : e.defaultCharWidth()) + "px";
        }
        if (r.other) {
          var d = i.appendChild(ae("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
          d.style.display = "", d.style.left = r.other.left + "px", d.style.top = r.other.top + "px", d.style.height = (r.other.bottom - r.other.top) * 0.85 + "px";
        }
      }
      function mo(e, t) {
        return e.top - t.top || e.left - t.left;
      }
      function Vu(e, t, i) {
        var r = e.display, l = e.doc, u = document.createDocumentFragment(), f = As(e.display), d = f.left, g = Math.max(r.sizerWidth, Jr(e) - r.sizer.offsetLeft) - f.right, v = l.direction == "ltr";
        function _(Y, j, se, oe) {
          j < 0 && (j = 0), j = Math.round(j), oe = Math.round(oe), u.appendChild(ae("div", null, "CodeMirror-selected", "position: absolute; left: " + Y + `px;
                             top: ` + j + "px; width: " + (se == null ? g - Y : se) + `px;
                             height: ` + (oe - j) + "px"));
        }
        function T(Y, j, se) {
          var oe = ie(l, Y), me = oe.text.length, Ue, gt;
          function Je(Ge, st) {
            return tr(e, q(Y, Ge), "div", oe, st);
          }
          function Nt(Ge, st, Dt) {
            var ut = Pe(e, oe, null, Ge), at = st == "ltr" == (Dt == "after") ? "left" : "right", tt = Dt == "after" ? ut.begin : ut.end - (/\s/.test(oe.text.charAt(ut.end - 1)) ? 2 : 1);
            return Je(tt, at)[at];
          }
          var zt = Sn(oe, l.direction);
          return jl(zt, j || 0, se == null ? me : se, function(Ge, st, Dt, ut) {
            var at = Dt == "ltr", tt = Je(Ge, at ? "left" : "right"), Yt = Je(st - 1, at ? "right" : "left"), Zi = j == null && Ge == 0, Br = se == null && st == me, Pt = ut == 0, qn = !zt || ut == zt.length - 1;
            if (Yt.top - tt.top <= 3) {
              var _t = (v ? Zi : Br) && Pt, uu = (v ? Br : Zi) && qn, gr = _t ? d : (at ? tt : Yt).left, di = uu ? g : (at ? Yt : tt).right;
              _(gr, tt.top, di - gr, tt.bottom);
            } else {
              var Hr, Rt, pi, au;
              at ? (Hr = v && Zi && Pt ? d : tt.left, Rt = v ? g : Nt(Ge, Dt, "before"), pi = v ? d : Nt(st, Dt, "after"), au = v && Br && qn ? g : Yt.right) : (Hr = v ? Nt(Ge, Dt, "before") : d, Rt = !v && Zi && Pt ? g : tt.right, pi = !v && Br && qn ? d : Yt.left, au = v ? Nt(st, Dt, "after") : g), _(Hr, tt.top, Rt - Hr, tt.bottom), tt.bottom < Yt.top && _(d, tt.bottom, null, Yt.top), _(pi, Yt.top, au - pi, Yt.bottom);
            }
            (!Ue || mo(tt, Ue) < 0) && (Ue = tt), mo(Yt, Ue) < 0 && (Ue = Yt), (!gt || mo(tt, gt) < 0) && (gt = tt), mo(Yt, gt) < 0 && (gt = Yt);
          }), { start: Ue, end: gt };
        }
        var O = t.from(), M = t.to();
        if (O.line == M.line)
          T(O.line, O.ch, M.ch);
        else {
          var B = ie(l, O.line), z = ie(l, M.line), X = cn(B) == cn(z), Z = T(O.line, O.ch, X ? B.text.length + 1 : null).end, J = T(M.line, X ? 0 : null, M.ch).start;
          X && (Z.top < J.top - 2 ? (_(Z.right, Z.top, null, Z.bottom), _(d, J.top, J.left, J.bottom)) : _(Z.right, Z.top, J.left - Z.right, Z.bottom)), Z.bottom < J.top && _(d, Z.bottom, null, J.top);
        }
        i.appendChild(u);
      }
      function Ii(e) {
        if (!!e.state.focused) {
          var t = e.display;
          clearInterval(t.blinker);
          var i = !0;
          t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
            e.hasFocus() || or(e), t.cursorDiv.style.visibility = (i = !i) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }
      function Is(e) {
        e.hasFocus() || (e.display.input.focus(), e.state.focused || ir(e));
      }
      function ei(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && or(e));
        }, 100);
      }
      function ir(e, t) {
        e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), e.options.readOnly != "nocursor" && (e.state.focused || (rt(e, "focus", e, t), e.state.focused = !0, ne(e.display.wrapper, "CodeMirror-focused"), !e.curOp && e.display.selForContextMenu != e.doc.sel && (e.display.input.reset(), R && setTimeout(function() {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), Ii(e));
      }
      function or(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (rt(e, "blur", e, t), e.state.focused = !1, Qn(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }
      function gl(e) {
        for (var t = e.display, i = t.lineDiv.offsetTop, r = Math.max(0, t.scroller.getBoundingClientRect().top), l = t.lineDiv.getBoundingClientRect().top, u = 0, f = 0; f < t.view.length; f++) {
          var d = t.view[f], g = e.options.lineWrapping, v = void 0, _ = 0;
          if (!d.hidden) {
            if (l += d.line.height, D && P < 8) {
              var T = d.node.offsetTop + d.node.offsetHeight;
              v = T - i, i = T;
            } else {
              var O = d.node.getBoundingClientRect();
              v = O.bottom - O.top, !g && d.text.firstChild && (_ = d.text.firstChild.getBoundingClientRect().right - O.left - 1);
            }
            var M = d.line.height - v;
            if ((M > 5e-3 || M < -5e-3) && (l < r && (u -= M), Cn(d.line, v), ju(d.line), d.rest))
              for (var B = 0; B < d.rest.length; B++)
                ju(d.rest[B]);
            if (_ > e.display.sizerWidth) {
              var z = Math.ceil(_ / Di(e.display));
              z > e.display.maxLineLength && (e.display.maxLineLength = z, e.display.maxLine = d.line, e.display.maxLineChanged = !0);
            }
          }
        }
        Math.abs(u) > 2 && (t.scroller.scrollTop += u);
      }
      function ju(e) {
        if (e.widgets)
          for (var t = 0; t < e.widgets.length; ++t) {
            var i = e.widgets[t], r = i.node.parentNode;
            r && (i.height = r.offsetHeight);
          }
      }
      function vl(e, t, i) {
        var r = i && i.top != null ? Math.max(0, i.top) : e.scroller.scrollTop;
        r = Math.floor(r - Lr(e));
        var l = i && i.bottom != null ? i.bottom : r + e.wrapper.clientHeight, u = Yr(t, r), f = Yr(t, l);
        if (i && i.ensure) {
          var d = i.ensure.from.line, g = i.ensure.to.line;
          d < u ? (u = d, f = Yr(t, ht(ie(t, d)) + e.wrapper.clientHeight)) : Math.min(g, t.lastLine()) >= f && (u = Yr(t, ht(ie(t, g)) - e.wrapper.clientHeight), f = g);
        }
        return { from: u, to: Math.max(f, u + 1) };
      }
      function yl(e, t) {
        if (!ct(e, "scrollCursorIntoView")) {
          var i = e.display, r = i.sizer.getBoundingClientRect(), l = null, u = i.wrapper.ownerDocument;
          if (t.top + r.top < 0 ? l = !0 : t.bottom + r.top > (u.defaultView.innerHeight || u.documentElement.clientHeight) && (l = !1), l != null && !Ze) {
            var f = ae("div", "\u200B", null, `position: absolute;
                         top: ` + (t.top - i.viewOffset - Lr(e.display)) + `px;
                         height: ` + (t.bottom - t.top + Wn(e) + i.barHeight) + `px;
                         left: ` + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
            e.display.lineSpace.appendChild(f), f.scrollIntoView(l), e.display.lineSpace.removeChild(f);
          }
        }
      }
      function ml(e, t, i, r) {
        r == null && (r = 0);
        var l;
        !e.options.lineWrapping && t == i && (i = t.sticky == "before" ? q(t.line, t.ch + 1, "before") : t, t = t.ch ? q(t.line, t.sticky == "before" ? t.ch - 1 : t.ch, "after") : t);
        for (var u = 0; u < 5; u++) {
          var f = !1, d = I(e, t), g = !i || i == t ? d : I(e, i);
          l = {
            left: Math.min(d.left, g.left),
            top: Math.min(d.top, g.top) - r,
            right: Math.max(d.left, g.left),
            bottom: Math.max(d.bottom, g.bottom) + r
          };
          var v = Ns(e, l), _ = e.doc.scrollTop, T = e.doc.scrollLeft;
          if (v.scrollTop != null && (wo(e, v.scrollTop), Math.abs(e.doc.scrollTop - _) > 1 && (f = !0)), v.scrollLeft != null && (ti(e, v.scrollLeft), Math.abs(e.doc.scrollLeft - T) > 1 && (f = !0)), !f)
            break;
        }
        return l;
      }
      function Os(e, t) {
        var i = Ns(e, t);
        i.scrollTop != null && wo(e, i.scrollTop), i.scrollLeft != null && ti(e, i.scrollLeft);
      }
      function Ns(e, t) {
        var i = e.display, r = nr(e.display);
        t.top < 0 && (t.top = 0);
        var l = e.curOp && e.curOp.scrollTop != null ? e.curOp.scrollTop : i.scroller.scrollTop, u = ks(e), f = {};
        t.bottom - t.top > u && (t.bottom = t.top + u);
        var d = e.doc.height + cl(i), g = t.top < r, v = t.bottom > d - r;
        if (t.top < l)
          f.scrollTop = g ? 0 : t.top;
        else if (t.bottom > l + u) {
          var _ = Math.min(t.top, (v ? d : t.bottom) - u);
          _ != l && (f.scrollTop = _);
        }
        var T = e.options.fixedGutter ? 0 : i.gutters.offsetWidth, O = e.curOp && e.curOp.scrollLeft != null ? e.curOp.scrollLeft : i.scroller.scrollLeft - T, M = Jr(e) - i.gutters.offsetWidth, B = t.right - t.left > M;
        return B && (t.right = t.left + M), t.left < 10 ? f.scrollLeft = 0 : t.left < O ? f.scrollLeft = Math.max(0, t.left + T - (B ? 0 : 10)) : t.right > M + O - 3 && (f.scrollLeft = t.right + (B ? 0 : 10) - M), f;
      }
      function xl(e, t) {
        t != null && (St(e), e.curOp.scrollTop = (e.curOp.scrollTop == null ? e.doc.scrollTop : e.curOp.scrollTop) + t);
      }
      function Oi(e) {
        St(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin };
      }
      function xo(e, t, i) {
        (t != null || i != null) && St(e), t != null && (e.curOp.scrollLeft = t), i != null && (e.curOp.scrollTop = i);
      }
      function bt(e, t) {
        St(e), e.curOp.scrollToPos = t;
      }
      function St(e) {
        var t = e.curOp.scrollToPos;
        if (t) {
          e.curOp.scrollToPos = null;
          var i = H(e, t.from), r = H(e, t.to);
          ea(e, i, r, t.margin);
        }
      }
      function ea(e, t, i, r) {
        var l = Ns(e, {
          left: Math.min(t.left, i.left),
          top: Math.min(t.top, i.top) - r,
          right: Math.max(t.right, i.right),
          bottom: Math.max(t.bottom, i.bottom) + r
        });
        xo(e, l.scrollLeft, l.scrollTop);
      }
      function wo(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (w || Ws(e, { top: t }), Ps(e, t, !0), w && Ws(e), Se(e, 100));
      }
      function Ps(e, t, i) {
        t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), !(e.display.scroller.scrollTop == t && !i) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }
      function ti(e, t, i, r) {
        t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), !((i ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r) && (e.doc.scrollLeft = t, ra(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }
      function ni(e) {
        var t = e.display, i = t.gutters.offsetWidth, r = Math.round(e.doc.height + cl(e.display));
        return {
          clientHeight: t.scroller.clientHeight,
          viewHeight: t.wrapper.clientHeight,
          scrollWidth: t.scroller.scrollWidth,
          clientWidth: t.scroller.clientWidth,
          viewWidth: t.wrapper.clientWidth,
          barLeft: e.options.fixedGutter ? i : 0,
          docHeight: r,
          scrollHeight: r + Wn(e) + t.barHeight,
          nativeBarWidth: t.nativeBarWidth,
          gutterWidth: i
        };
      }
      var An = function(e, t, i) {
        this.cm = i;
        var r = this.vert = ae("div", [ae("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), l = this.horiz = ae("div", [ae("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        r.tabIndex = l.tabIndex = -1, e(r), e(l), fe(r, "scroll", function() {
          r.clientHeight && t(r.scrollTop, "vertical");
        }), fe(l, "scroll", function() {
          l.clientWidth && t(l.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = !1, D && P < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };
      An.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1, i = e.scrollHeight > e.clientHeight + 1, r = e.nativeBarWidth;
        if (i) {
          this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
          var l = e.viewHeight - (t ? r : 0);
          this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + l) + "px";
        } else
          this.vert.scrollTop = 0, this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
          this.horiz.style.display = "block", this.horiz.style.right = i ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
          var u = e.viewWidth - e.barLeft - (i ? r : 0);
          this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + u) + "px";
        } else
          this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (r == 0 && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: i ? r : 0, bottom: t ? r : 0 };
      }, An.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, An.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, An.prototype.zeroWidthHack = function() {
        var e = Te && !We ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.visibility = this.vert.style.visibility = "hidden", this.disableHoriz = new et(), this.disableVert = new et();
      }, An.prototype.enableZeroWidthBar = function(e, t, i) {
        e.style.visibility = "";
        function r() {
          var l = e.getBoundingClientRect(), u = i == "vert" ? document.elementFromPoint(l.right - 1, (l.top + l.bottom) / 2) : document.elementFromPoint((l.right + l.left) / 2, l.bottom - 1);
          u != e ? e.style.visibility = "hidden" : t.set(1e3, r);
        }
        t.set(1e3, r);
      }, An.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
      };
      var ri = function() {
      };
      ri.prototype.update = function() {
        return { bottom: 0, right: 0 };
      }, ri.prototype.setScrollLeft = function() {
      }, ri.prototype.setScrollTop = function() {
      }, ri.prototype.clear = function() {
      };
      function kn(e, t) {
        t || (t = ni(e));
        var i = e.display.barWidth, r = e.display.barHeight;
        Ni(e, t);
        for (var l = 0; l < 4 && i != e.display.barWidth || r != e.display.barHeight; l++)
          i != e.display.barWidth && e.options.lineWrapping && gl(e), Ni(e, ni(e)), i = e.display.barWidth, r = e.display.barHeight;
      }
      function Ni(e, t) {
        var i = e.display, r = i.scrollbars.update(t);
        i.sizer.style.paddingRight = (i.barWidth = r.right) + "px", i.sizer.style.paddingBottom = (i.barHeight = r.bottom) + "px", i.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (i.scrollbarFiller.style.display = "block", i.scrollbarFiller.style.height = r.bottom + "px", i.scrollbarFiller.style.width = r.right + "px") : i.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (i.gutterFiller.style.display = "block", i.gutterFiller.style.height = r.bottom + "px", i.gutterFiller.style.width = t.gutterWidth + "px") : i.gutterFiller.style.display = "";
      }
      var Pi = { native: An, null: ri };
      function bo(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && Qn(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new Pi[e.options.scrollbarStyle](function(t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), fe(t, "mousedown", function() {
            e.state.focused && setTimeout(function() {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function(t, i) {
          i == "horizontal" ? ti(e, t) : wo(e, t);
        }, e), e.display.scrollbars.addClass && ne(e.display.wrapper, e.display.scrollbars.addClass);
      }
      var Ri = 0;
      function ii(e) {
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
          id: ++Ri,
          markArrays: null
        }, Ss(e.curOp);
      }
      function oi(e) {
        var t = e.curOp;
        t && If(t, function(i) {
          for (var r = 0; r < i.ops.length; r++)
            i.ops[r].cm.curOp = null;
          Hf(i);
        });
      }
      function Hf(e) {
        for (var t = e.ops, i = 0; i < t.length; i++)
          zf(t[i]);
        for (var r = 0; r < t.length; r++)
          Uf(t[r]);
        for (var l = 0; l < t.length; l++)
          wl(t[l]);
        for (var u = 0; u < t.length; u++)
          So(t[u]);
        for (var f = 0; f < t.length; f++)
          ta(t[f]);
      }
      function zf(e) {
        var t = e.cm, i = t.display;
        qf(t), e.updateMaxLine && ll(t), e.mustUpdate = e.viewChanged || e.forceUpdate || e.scrollTop != null || e.scrollToPos && (e.scrollToPos.from.line < i.viewFrom || e.scrollToPos.to.line >= i.viewTo) || i.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new bl(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }
      function Uf(e) {
        e.updatedDisplay = e.mustUpdate && Rs(e.cm, e.update);
      }
      function wl(e) {
        var t = e.cm, i = t.display;
        e.updatedDisplay && gl(t), e.barMeasure = ni(t), i.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Yu(t, i.maxLine, i.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(i.scroller.clientWidth, i.sizer.offsetLeft + e.adjustWidthTo + Wn(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, i.sizer.offsetLeft + e.adjustWidthTo - Jr(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = i.input.prepareSelection());
      }
      function So(e) {
        var t = e.cm;
        e.adjustWidthTo != null && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && ti(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var i = e.focus && e.focus == b(Me(t));
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, i), (e.updatedDisplay || e.startHeight != t.doc.height) && kn(t, e.barMeasure), e.updatedDisplay && Bs(t, e.barMeasure), e.selectionChanged && Ii(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), i && Is(e.cm);
      }
      function ta(e) {
        var t = e.cm, i = t.display, r = t.doc;
        if (e.updatedDisplay && na(t, e.update), i.wheelStartX != null && (e.scrollTop != null || e.scrollLeft != null || e.scrollToPos) && (i.wheelStartX = i.wheelStartY = null), e.scrollTop != null && Ps(t, e.scrollTop, e.forceScroll), e.scrollLeft != null && ti(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          var l = ml(
            t,
            de(r, e.scrollToPos.from),
            de(r, e.scrollToPos.to),
            e.scrollToPos.margin
          );
          yl(t, l);
        }
        var u = e.maybeHiddenMarkers, f = e.maybeUnhiddenMarkers;
        if (u)
          for (var d = 0; d < u.length; ++d)
            u[d].lines.length || rt(u[d], "hide");
        if (f)
          for (var g = 0; g < f.length; ++g)
            f[g].lines.length && rt(f[g], "unhide");
        i.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && rt(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }
      function m(e, t) {
        if (e.curOp)
          return t();
        ii(e);
        try {
          return t();
        } finally {
          oi(e);
        }
      }
      function je(e, t) {
        return function() {
          if (e.curOp)
            return t.apply(e, arguments);
          ii(e);
          try {
            return t.apply(e, arguments);
          } finally {
            oi(e);
          }
        };
      }
      function Ct(e) {
        return function() {
          if (this.curOp)
            return e.apply(this, arguments);
          ii(this);
          try {
            return e.apply(this, arguments);
          } finally {
            oi(this);
          }
        };
      }
      function ze(e) {
        return function() {
          var t = this.cm;
          if (!t || t.curOp)
            return e.apply(this, arguments);
          ii(t);
          try {
            return e.apply(this, arguments);
          } finally {
            oi(t);
          }
        };
      }
      function Se(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, xt(Gf, e));
      }
      function Gf(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
          var i = +new Date() + e.options.workTime, r = Li(e, t.highlightFrontier), l = [];
          t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(u) {
            if (r.line >= e.display.viewFrom) {
              var f = u.styles, d = u.text.length > e.options.maxHighlightLength ? Rn(t.mode, r.state) : null, g = rl(e, u, r, !0);
              d && (r.state = d), u.styles = g.styles;
              var v = u.styleClasses, _ = g.classes;
              _ ? u.styleClasses = _ : v && (u.styleClasses = null);
              for (var T = !f || f.length != u.styles.length || v != _ && (!v || !_ || v.bgClass != _.bgClass || v.textClass != _.textClass), O = 0; !T && O < f.length; ++O)
                T = f[O] != u.styles[O];
              T && l.push(r.line), u.stateAfter = r.save(), r.nextLine();
            } else
              u.text.length <= e.options.maxHighlightLength && lo(e, u.text, r), u.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
            if (+new Date() > i)
              return Se(e, e.options.workDelay), !0;
          }), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), l.length && m(e, function() {
            for (var u = 0; u < l.length; u++)
              Fr(e, l[u], "text");
          });
        }
      }
      var bl = function(e, t, i) {
        var r = e.display;
        this.viewport = t, this.visible = vl(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = Jr(e), this.force = i, this.dims = Ar(e), this.events = [];
      };
      bl.prototype.signal = function(e, t) {
        fn(e, t) && this.events.push(arguments);
      }, bl.prototype.finish = function() {
        for (var e = 0; e < this.events.length; e++)
          rt.apply(null, this.events[e]);
      };
      function qf(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Wn(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Wn(e) + "px", t.scrollbarsClipped = !0);
      }
      function li(e) {
        if (e.hasFocus())
          return null;
        var t = b(Me(e));
        if (!t || !k(e.display.lineDiv, t))
          return null;
        var i = { activeElt: t };
        if (window.getSelection) {
          var r = Mt(e).getSelection();
          r.anchorNode && r.extend && k(e.display.lineDiv, r.anchorNode) && (i.anchorNode = r.anchorNode, i.anchorOffset = r.anchorOffset, i.focusNode = r.focusNode, i.focusOffset = r.focusOffset);
        }
        return i;
      }
      function Kf(e) {
        if (!(!e || !e.activeElt || e.activeElt == b(e.activeElt.ownerDocument)) && (e.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) && e.anchorNode && k(document.body, e.anchorNode) && k(document.body, e.focusNode))) {
          var t = e.activeElt.ownerDocument, i = t.defaultView.getSelection(), r = t.createRange();
          r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), i.removeAllRanges(), i.addRange(r), i.extend(e.focusNode, e.focusOffset);
        }
      }
      function Rs(e, t) {
        var i = e.display, r = e.doc;
        if (t.editorIsHidden)
          return Dr(e), !1;
        if (!t.force && t.visible.from >= i.viewFrom && t.visible.to <= i.viewTo && (i.updateLineNumbers == null || i.updateLineNumbers >= i.viewTo) && i.renderedView == i.view && rr(e) == 0)
          return !1;
        ia(e) && (Dr(e), t.dims = Ar(e));
        var l = r.first + r.size, u = Math.max(t.visible.from - e.options.viewportMargin, r.first), f = Math.min(l, t.visible.to + e.options.viewportMargin);
        i.viewFrom < u && u - i.viewFrom < 20 && (u = Math.max(r.first, i.viewFrom)), i.viewTo > f && i.viewTo - f < 20 && (f = Math.min(l, i.viewTo)), Jn && (u = ao(e.doc, u), f = Cr(e.doc, f));
        var d = u != i.viewFrom || f != i.viewTo || i.lastWrapHeight != t.wrapperHeight || i.lastWrapWidth != t.wrapperWidth;
        pl(e, u, f), i.viewOffset = ht(ie(e.doc, i.viewFrom)), e.display.mover.style.top = i.viewOffset + "px";
        var g = rr(e);
        if (!d && g == 0 && !t.force && i.renderedView == i.view && (i.updateLineNumbers == null || i.updateLineNumbers >= i.viewTo))
          return !1;
        var v = li(e);
        return g > 4 && (i.lineDiv.style.display = "none"), $f(e, i.updateLineNumbers, t.dims), g > 4 && (i.lineDiv.style.display = ""), i.renderedView = i.view, Kf(v), Pn(i.cursorDiv), Pn(i.selectionDiv), i.gutters.style.height = i.sizer.style.minHeight = 0, d && (i.lastWrapHeight = t.wrapperHeight, i.lastWrapWidth = t.wrapperWidth, Se(e, 400)), i.updateLineNumbers = null, !0;
      }
      function na(e, t) {
        for (var i = t.viewport, r = !0; ; r = !1) {
          if (!r || !e.options.lineWrapping || t.oldDisplayWidth == Jr(e)) {
            if (i && i.top != null && (i = { top: Math.min(e.doc.height + cl(e.display) - ks(e), i.top) }), t.visible = vl(e.display, e.doc, i), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
              break;
          } else
            r && (t.visible = vl(e.display, e.doc, i));
          if (!Rs(e, t))
            break;
          gl(e);
          var l = ni(e);
          Er(e), kn(e, l), Bs(e, l), t.force = !1;
        }
        t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }
      function Ws(e, t) {
        var i = new bl(e, t);
        if (Rs(e, i)) {
          gl(e), na(e, i);
          var r = ni(e);
          Er(e), kn(e, r), Bs(e, r), i.finish();
        }
      }
      function $f(e, t, i) {
        var r = e.display, l = e.options.lineNumbers, u = r.lineDiv, f = u.firstChild;
        function d(B) {
          var z = B.nextSibling;
          return R && Te && e.display.currentWheelTarget == B ? B.style.display = "none" : B.parentNode.removeChild(B), z;
        }
        for (var g = r.view, v = r.viewFrom, _ = 0; _ < g.length; _++) {
          var T = g[_];
          if (!T.hidden)
            if (!T.node || T.node.parentNode != u) {
              var O = Ts(e, T, v, i);
              u.insertBefore(O, f);
            } else {
              for (; f != T.node; )
                f = d(f);
              var M = l && t != null && t <= v && T.lineNumber;
              T.changes && (ke(T.changes, "gutter") > -1 && (M = !1), Qr(e, T, v, i)), M && (Pn(T.lineNumber), T.lineNumber.appendChild(document.createTextNode(ds(e.options, v)))), f = T.node.nextSibling;
            }
          v += T.size;
        }
        for (; f; )
          f = d(f);
      }
      function Fn(e) {
        var t = e.gutters.offsetWidth;
        e.sizer.style.marginLeft = t + "px", dt(e, "gutterChanged", e);
      }
      function Bs(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Wn(e) + "px";
      }
      function ra(e) {
        var t = e.display, i = t.view;
        if (!(!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter))) {
          for (var r = Ei(t) - t.scroller.scrollLeft + e.doc.scrollLeft, l = t.gutters.offsetWidth, u = r + "px", f = 0; f < i.length; f++)
            if (!i[f].hidden) {
              e.options.fixedGutter && (i[f].gutter && (i[f].gutter.style.left = u), i[f].gutterBackground && (i[f].gutterBackground.style.left = u));
              var d = i[f].alignable;
              if (d)
                for (var g = 0; g < d.length; g++)
                  d[g].style.left = u;
            }
          e.options.fixedGutter && (t.gutters.style.left = r + l + "px");
        }
      }
      function ia(e) {
        if (!e.options.lineNumbers)
          return !1;
        var t = e.doc, i = ds(e.options, t.first + t.size - 1), r = e.display;
        if (i.length != r.lineNumChars) {
          var l = r.measure.appendChild(ae(
            "div",
            [ae("div", i)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          )), u = l.firstChild.offsetWidth, f = l.offsetWidth - u;
          return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(u, r.lineGutter.offsetWidth - f) + 1, r.lineNumWidth = r.lineNumInnerWidth + f, r.lineNumChars = r.lineNumInnerWidth ? i.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", Fn(e.display), !0;
        }
        return !1;
      }
      function Hs(e, t) {
        for (var i = [], r = !1, l = 0; l < e.length; l++) {
          var u = e[l], f = null;
          if (typeof u != "string" && (f = u.style, u = u.className), u == "CodeMirror-linenumbers")
            if (t)
              r = !0;
            else
              continue;
          i.push({ className: u, style: f });
        }
        return t && !r && i.push({ className: "CodeMirror-linenumbers", style: null }), i;
      }
      function oa(e) {
        var t = e.gutters, i = e.gutterSpecs;
        Pn(t), e.lineGutter = null;
        for (var r = 0; r < i.length; ++r) {
          var l = i[r], u = l.className, f = l.style, d = t.appendChild(ae("div", null, "CodeMirror-gutter " + u));
          f && (d.style.cssText = f), u == "CodeMirror-linenumbers" && (e.lineGutter = d, d.style.width = (e.lineNumWidth || 1) + "px");
        }
        t.style.display = i.length ? "" : "none", Fn(e);
      }
      function on(e) {
        oa(e.display), kt(e), ra(e);
      }
      function Xf(e, t, i, r) {
        var l = this;
        this.input = i, l.scrollbarFiller = ae("div", null, "CodeMirror-scrollbar-filler"), l.scrollbarFiller.setAttribute("cm-not-content", "true"), l.gutterFiller = ae("div", null, "CodeMirror-gutter-filler"), l.gutterFiller.setAttribute("cm-not-content", "true"), l.lineDiv = xr("div", null, "CodeMirror-code"), l.selectionDiv = ae("div", null, null, "position: relative; z-index: 1"), l.cursorDiv = ae("div", null, "CodeMirror-cursors"), l.measure = ae("div", null, "CodeMirror-measure"), l.lineMeasure = ae("div", null, "CodeMirror-measure"), l.lineSpace = xr(
          "div",
          [l.measure, l.lineMeasure, l.selectionDiv, l.cursorDiv, l.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var u = xr("div", [l.lineSpace], "CodeMirror-lines");
        l.mover = ae("div", [u], null, "position: relative"), l.sizer = ae("div", [l.mover], "CodeMirror-sizer"), l.sizerWidth = null, l.heightForcer = ae("div", null, null, "position: absolute; height: " + qo + "px; width: 1px;"), l.gutters = ae("div", null, "CodeMirror-gutters"), l.lineGutter = null, l.scroller = ae("div", [l.sizer, l.heightForcer, l.gutters], "CodeMirror-scroll"), l.scroller.setAttribute("tabIndex", "-1"), l.wrapper = ae("div", [l.scrollbarFiller, l.gutterFiller, l.scroller], "CodeMirror"), V && pe >= 105 && (l.wrapper.style.clipPath = "inset(0px)"), l.wrapper.setAttribute("translate", "no"), D && P < 8 && (l.gutters.style.zIndex = -1, l.scroller.style.paddingRight = 0), !R && !(w && Ke) && (l.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(l.wrapper) : e(l.wrapper)), l.viewFrom = l.viewTo = t.first, l.reportedViewFrom = l.reportedViewTo = t.first, l.view = [], l.renderedView = null, l.externalMeasured = null, l.viewOffset = 0, l.lastWrapHeight = l.lastWrapWidth = 0, l.updateLineNumbers = null, l.nativeBarWidth = l.barHeight = l.barWidth = 0, l.scrollbarsClipped = !1, l.lineNumWidth = l.lineNumInnerWidth = l.lineNumChars = null, l.alignWidgets = !1, l.cachedCharWidth = l.cachedTextHeight = l.cachedPaddingH = null, l.maxLine = null, l.maxLineLength = 0, l.maxLineChanged = !1, l.wheelDX = l.wheelDY = l.wheelStartX = l.wheelStartY = null, l.shift = !1, l.selForContextMenu = null, l.activeTouch = null, l.gutterSpecs = Hs(r.gutters, r.lineNumbers), oa(l), i.init(l);
      }
      var Sl = 0, lr = null;
      D ? lr = -0.53 : w ? lr = 15 : V ? lr = -0.7 : Le && (lr = -1 / 3);
      function la(e) {
        var t = e.wheelDeltaX, i = e.wheelDeltaY;
        return t == null && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), i == null && e.detail && e.axis == e.VERTICAL_AXIS ? i = e.detail : i == null && (i = e.wheelDelta), { x: t, y: i };
      }
      function Yf(e) {
        var t = la(e);
        return t.x *= lr, t.y *= lr, t;
      }
      function Mr(e, t) {
        V && pe == 102 && (e.display.chromeScrollHack == null ? e.display.sizer.style.pointerEvents = "none" : clearTimeout(e.display.chromeScrollHack), e.display.chromeScrollHack = setTimeout(function() {
          e.display.chromeScrollHack = null, e.display.sizer.style.pointerEvents = "";
        }, 100));
        var i = la(t), r = i.x, l = i.y, u = lr;
        t.deltaMode === 0 && (r = t.deltaX, l = t.deltaY, u = 1);
        var f = e.display, d = f.scroller, g = d.scrollWidth > d.clientWidth, v = d.scrollHeight > d.clientHeight;
        if (!!(r && g || l && v)) {
          if (l && Te && R) {
            e:
              for (var _ = t.target, T = f.view; _ != d; _ = _.parentNode)
                for (var O = 0; O < T.length; O++)
                  if (T[O].node == _) {
                    e.display.currentWheelTarget = _;
                    break e;
                  }
          }
          if (r && !w && !ce && u != null) {
            l && v && wo(e, Math.max(0, d.scrollTop + l * u)), ti(e, Math.max(0, d.scrollLeft + r * u)), (!l || l && v) && qt(t), f.wheelStartX = null;
            return;
          }
          if (l && u != null) {
            var M = l * u, B = e.doc.scrollTop, z = B + f.wrapper.clientHeight;
            M < 0 ? B = Math.max(0, B + M - 50) : z = Math.min(e.doc.height, z + M + 50), Ws(e, { top: B, bottom: z });
          }
          Sl < 20 && t.deltaMode !== 0 && (f.wheelStartX == null ? (f.wheelStartX = d.scrollLeft, f.wheelStartY = d.scrollTop, f.wheelDX = r, f.wheelDY = l, setTimeout(function() {
            if (f.wheelStartX != null) {
              var X = d.scrollLeft - f.wheelStartX, Z = d.scrollTop - f.wheelStartY, J = Z && f.wheelDY && Z / f.wheelDY || X && f.wheelDX && X / f.wheelDX;
              f.wheelStartX = f.wheelStartY = null, J && (lr = (lr * Sl + J) / (Sl + 1), ++Sl);
            }
          }, 200)) : (f.wheelDX += r, f.wheelDY += l));
        }
      }
      var ln = function(e, t) {
        this.ranges = e, this.primIndex = t;
      };
      ln.prototype.primary = function() {
        return this.ranges[this.primIndex];
      }, ln.prototype.equals = function(e) {
        if (e == this)
          return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
          return !1;
        for (var t = 0; t < this.ranges.length; t++) {
          var i = this.ranges[t], r = e.ranges[t];
          if (!el(i.anchor, r.anchor) || !el(i.head, r.head))
            return !1;
        }
        return !0;
      }, ln.prototype.deepCopy = function() {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new Re(tl(this.ranges[t].anchor), tl(this.ranges[t].head));
        return new ln(e, this.primIndex);
      }, ln.prototype.somethingSelected = function() {
        for (var e = 0; e < this.ranges.length; e++)
          if (!this.ranges[e].empty())
            return !0;
        return !1;
      }, ln.prototype.contains = function(e, t) {
        t || (t = e);
        for (var i = 0; i < this.ranges.length; i++) {
          var r = this.ranges[i];
          if (ge(t, r.from()) >= 0 && ge(e, r.to()) <= 0)
            return i;
        }
        return -1;
      };
      var Re = function(e, t) {
        this.anchor = e, this.head = t;
      };
      Re.prototype.from = function() {
        return nl(this.anchor, this.head);
      }, Re.prototype.to = function() {
        return _i(this.anchor, this.head);
      }, Re.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function lt(e, t, i) {
        var r = e && e.options.selectionsMayTouch, l = t[i];
        t.sort(function(O, M) {
          return ge(O.from(), M.from());
        }), i = ke(t, l);
        for (var u = 1; u < t.length; u++) {
          var f = t[u], d = t[u - 1], g = ge(d.to(), f.from());
          if (r && !f.empty() ? g > 0 : g >= 0) {
            var v = nl(d.from(), f.from()), _ = _i(d.to(), f.to()), T = d.empty() ? f.from() == f.head : d.from() == d.head;
            u <= i && --i, t.splice(--u, 2, new Re(T ? _ : v, T ? v : _));
          }
        }
        return new ln(t, i);
      }
      function Ir(e, t) {
        return new ln([new Re(e, t || e)], 0);
      }
      function Or(e) {
        return e.text ? q(
          e.from.line + e.text.length - 1,
          Ne(e.text).length + (e.text.length == 1 ? e.from.ch : 0)
        ) : e.to;
      }
      function sa(e, t) {
        if (ge(e, t.from) < 0)
          return e;
        if (ge(e, t.to) <= 0)
          return Or(t);
        var i = e.line + t.text.length - (t.to.line - t.from.line) - 1, r = e.ch;
        return e.line == t.to.line && (r += Or(t).ch - t.to.ch), q(i, r);
      }
      function zs(e, t) {
        for (var i = [], r = 0; r < e.sel.ranges.length; r++) {
          var l = e.sel.ranges[r];
          i.push(new Re(
            sa(l.anchor, t),
            sa(l.head, t)
          ));
        }
        return lt(e.cm, i, e.sel.primIndex);
      }
      function ua(e, t, i) {
        return e.line == t.line ? q(i.line, e.ch - t.ch + i.ch) : q(i.line + (e.line - t.line), e.ch);
      }
      function aa(e, t, i) {
        for (var r = [], l = q(e.first, 0), u = l, f = 0; f < t.length; f++) {
          var d = t[f], g = ua(d.from, l, u), v = ua(Or(d), l, u);
          if (l = d.to, u = v, i == "around") {
            var _ = e.sel.ranges[f], T = ge(_.head, _.anchor) < 0;
            r[f] = new Re(T ? v : g, T ? g : v);
          } else
            r[f] = new Re(g, g);
        }
        return new ln(r, e.sel.primIndex);
      }
      function Cl(e) {
        e.doc.mode = cs(e.options, e.doc.modeOption), Co(e);
      }
      function Co(e) {
        e.doc.iter(function(t) {
          t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null);
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, Se(e, 100), e.state.modeGen++, e.curOp && kt(e);
      }
      function fa(e, t) {
        return t.from.ch == 0 && t.to.ch == 0 && Ne(t.text) == "" && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }
      function _o(e, t, i, r) {
        function l(J) {
          return i ? i[J] : null;
        }
        function u(J, Y, j) {
          Bu(J, Y, j, r), dt(J, "change", J, t);
        }
        function f(J, Y) {
          for (var j = [], se = J; se < Y; ++se)
            j.push(new Zr(v[se], l(se), r));
          return j;
        }
        var d = t.from, g = t.to, v = t.text, _ = ie(e, d.line), T = ie(e, g.line), O = Ne(v), M = l(v.length - 1), B = g.line - d.line;
        if (t.full)
          e.insert(0, f(0, v.length)), e.remove(v.length, e.size - v.length);
        else if (fa(e, t)) {
          var z = f(0, v.length - 1);
          u(T, T.text, M), B && e.remove(d.line, B), z.length && e.insert(d.line, z);
        } else if (_ == T)
          if (v.length == 1)
            u(_, _.text.slice(0, d.ch) + O + _.text.slice(g.ch), M);
          else {
            var X = f(1, v.length - 1);
            X.push(new Zr(O + _.text.slice(g.ch), M, r)), u(_, _.text.slice(0, d.ch) + v[0], l(0)), e.insert(d.line + 1, X);
          }
        else if (v.length == 1)
          u(_, _.text.slice(0, d.ch) + v[0] + T.text.slice(g.ch), l(0)), e.remove(d.line + 1, B);
        else {
          u(_, _.text.slice(0, d.ch) + v[0], l(0)), u(T, O + T.text.slice(g.ch), M);
          var Z = f(1, v.length - 1);
          B > 1 && e.remove(d.line + 1, B - 1), e.insert(d.line + 1, Z);
        }
        dt(e, "change", e, t);
      }
      function dn(e, t, i) {
        function r(l, u, f) {
          if (l.linked)
            for (var d = 0; d < l.linked.length; ++d) {
              var g = l.linked[d];
              if (g.doc != u) {
                var v = f && g.sharedHist;
                i && !v || (t(g.doc, v), r(g.doc, l, v));
              }
            }
        }
        r(e, null, !0);
      }
      function Lo(e, t) {
        if (t.cm)
          throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, He(e), Cl(e), ca(e), e.options.direction = t.direction, e.options.lineWrapping || ll(e), e.options.mode = t.modeOption, kt(e);
      }
      function ca(e) {
        (e.doc.direction == "rtl" ? ne : Qn)(e.display.lineDiv, "CodeMirror-rtl");
      }
      function ha(e) {
        m(e, function() {
          ca(e), kt(e);
        });
      }
      function _l(e) {
        this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1;
      }
      function Dn(e, t) {
        var i = { from: tl(t.from), to: Or(t), text: Xr(e, t.from, t.to) };
        return Wi(e, i, t.from.line, t.to.line + 1), dn(e, function(r) {
          return Wi(r, i, t.from.line, t.to.line + 1);
        }, !0), i;
      }
      function Ll(e) {
        for (; e.length; ) {
          var t = Ne(e);
          if (t.ranges)
            e.pop();
          else
            break;
        }
      }
      function si(e, t) {
        if (t)
          return Ll(e.done), Ne(e.done);
        if (e.done.length && !Ne(e.done).ranges)
          return Ne(e.done);
        if (e.done.length > 1 && !e.done[e.done.length - 2].ranges)
          return e.done.pop(), Ne(e.done);
      }
      function sn(e, t, i, r) {
        var l = e.history;
        l.undone.length = 0;
        var u = +new Date(), f, d;
        if ((l.lastOp == r || l.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && l.lastModTime > u - (e.cm ? e.cm.options.historyEventDelay : 500) || t.origin.charAt(0) == "*")) && (f = si(l, l.lastOp == r)))
          d = Ne(f.changes), ge(t.from, t.to) == 0 && ge(t.from, d.to) == 0 ? d.to = Or(t) : f.changes.push(Dn(e, t));
        else {
          var g = Ne(l.done);
          for ((!g || !g.ranges) && To(e.sel, l.done), f = {
            changes: [Dn(e, t)],
            generation: l.generation
          }, l.done.push(f); l.done.length > l.undoDepth; )
            l.done.shift(), l.done[0].ranges || l.done.shift();
        }
        l.done.push(i), l.generation = ++l.maxGeneration, l.lastModTime = l.lastSelTime = u, l.lastOp = l.lastSelOp = r, l.lastOrigin = l.lastSelOrigin = t.origin, d || rt(e, "historyAdded");
      }
      function Zf(e, t, i, r) {
        var l = t.charAt(0);
        return l == "*" || l == "+" && i.ranges.length == r.ranges.length && i.somethingSelected() == r.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }
      function da(e, t, i, r) {
        var l = e.history, u = r && r.origin;
        i == l.lastSelOp || u && l.lastSelOrigin == u && (l.lastModTime == l.lastSelTime && l.lastOrigin == u || Zf(e, u, Ne(l.done), t)) ? l.done[l.done.length - 1] = t : To(t, l.done), l.lastSelTime = +new Date(), l.lastSelOrigin = u, l.lastSelOp = i, r && r.clearRedo !== !1 && Ll(l.undone);
      }
      function To(e, t) {
        var i = Ne(t);
        i && i.ranges && i.equals(e) || t.push(e);
      }
      function Wi(e, t, i, r) {
        var l = t["spans_" + e.id], u = 0;
        e.iter(Math.max(e.first, i), Math.min(e.first + e.size, r), function(f) {
          f.markedSpans && ((l || (l = t["spans_" + e.id] = {}))[u] = f.markedSpans), ++u;
        });
      }
      function Nr(e) {
        if (!e)
          return null;
        for (var t, i = 0; i < e.length; ++i)
          e[i].marker.explicitlyCleared ? t || (t = e.slice(0, i)) : t && t.push(e[i]);
        return t ? t.length ? t : null : e;
      }
      function pa(e, t) {
        var i = t["spans_" + e.id];
        if (!i)
          return null;
        for (var r = [], l = 0; l < t.text.length; ++l)
          r.push(Nr(i[l]));
        return r;
      }
      function ga(e, t) {
        var i = pa(e, t), r = ws(e, t);
        if (!i)
          return r;
        if (!r)
          return i;
        for (var l = 0; l < i.length; ++l) {
          var u = i[l], f = r[l];
          if (u && f) {
            e:
              for (var d = 0; d < f.length; ++d) {
                for (var g = f[d], v = 0; v < u.length; ++v)
                  if (u[v].marker == g.marker)
                    continue e;
                u.push(g);
              }
          } else
            f && (i[l] = f);
        }
        return i;
      }
      function sr(e, t, i) {
        for (var r = [], l = 0; l < e.length; ++l) {
          var u = e[l];
          if (u.ranges) {
            r.push(i ? ln.prototype.deepCopy.call(u) : u);
            continue;
          }
          var f = u.changes, d = [];
          r.push({ changes: d });
          for (var g = 0; g < f.length; ++g) {
            var v = f[g], _ = void 0;
            if (d.push({ from: v.from, to: v.to, text: v.text }), t)
              for (var T in v)
                (_ = T.match(/^spans_(\d+)$/)) && ke(t, Number(_[1])) > -1 && (Ne(d)[T] = v[T], delete v[T]);
          }
        }
        return r;
      }
      function Us(e, t, i, r) {
        if (r) {
          var l = e.anchor;
          if (i) {
            var u = ge(t, l) < 0;
            u != ge(i, l) < 0 ? (l = t, t = i) : u != ge(t, i) < 0 && (t = i);
          }
          return new Re(l, t);
        } else
          return new Re(i || t, t);
      }
      function Ao(e, t, i, r, l) {
        l == null && (l = e.cm && (e.cm.display.shift || e.extend)), pt(e, new ln([Us(e.sel.primary(), t, i, l)], 0), r);
      }
      function Ft(e, t, i) {
        for (var r = [], l = e.cm && (e.cm.display.shift || e.extend), u = 0; u < e.sel.ranges.length; u++)
          r[u] = Us(e.sel.ranges[u], t[u], null, l);
        var f = lt(e.cm, r, e.sel.primIndex);
        pt(e, f, i);
      }
      function ko(e, t, i, r) {
        var l = e.sel.ranges.slice(0);
        l[t] = i, pt(e, lt(e.cm, l, e.sel.primIndex), r);
      }
      function Gs(e, t, i, r) {
        pt(e, Ir(t, i), r);
      }
      function Bn(e, t, i) {
        var r = {
          ranges: t.ranges,
          update: function(l) {
            this.ranges = [];
            for (var u = 0; u < l.length; u++)
              this.ranges[u] = new Re(
                de(e, l[u].anchor),
                de(e, l[u].head)
              );
          },
          origin: i && i.origin
        };
        return rt(e, "beforeSelectionChange", e, r), e.cm && rt(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? lt(e.cm, r.ranges, r.ranges.length - 1) : t;
      }
      function Tl(e, t, i) {
        var r = e.history.done, l = Ne(r);
        l && l.ranges ? (r[r.length - 1] = t, Hn(e, t, i)) : pt(e, t, i);
      }
      function pt(e, t, i) {
        Hn(e, t, i), da(e, e.sel, e.cm ? e.cm.curOp.id : NaN, i);
      }
      function Hn(e, t, i) {
        (fn(e, "beforeSelectionChange") || e.cm && fn(e.cm, "beforeSelectionChange")) && (t = Bn(e, t, i));
        var r = i && i.bias || (ge(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
        qs(e, Al(e, t, r, !0)), !(i && i.scroll === !1) && e.cm && e.cm.getOption("readOnly") != "nocursor" && Oi(e.cm);
      }
      function qs(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, ns(e.cm)), dt(e, "cursorActivity", e));
      }
      function Ht(e) {
        qs(e, Al(e, e.sel, null, !1));
      }
      function Al(e, t, i, r) {
        for (var l, u = 0; u < t.ranges.length; u++) {
          var f = t.ranges[u], d = t.ranges.length == e.sel.ranges.length && e.sel.ranges[u], g = kl(e, f.anchor, d && d.anchor, i, r), v = f.head == f.anchor ? g : kl(e, f.head, d && d.head, i, r);
          (l || g != f.anchor || v != f.head) && (l || (l = t.ranges.slice(0, u)), l[u] = new Re(g, v));
        }
        return l ? lt(e.cm, l, t.primIndex) : t;
      }
      function Bi(e, t, i, r, l) {
        var u = ie(e, t.line);
        if (u.markedSpans)
          for (var f = 0; f < u.markedSpans.length; ++f) {
            var d = u.markedSpans[f], g = d.marker, v = "selectLeft" in g ? !g.selectLeft : g.inclusiveLeft, _ = "selectRight" in g ? !g.selectRight : g.inclusiveRight;
            if ((d.from == null || (v ? d.from <= t.ch : d.from < t.ch)) && (d.to == null || (_ ? d.to >= t.ch : d.to > t.ch))) {
              if (l && (rt(g, "beforeCursorEnter"), g.explicitlyCleared))
                if (u.markedSpans) {
                  --f;
                  continue;
                } else
                  break;
              if (!g.atomic)
                continue;
              if (i) {
                var T = g.find(r < 0 ? 1 : -1), O = void 0;
                if ((r < 0 ? _ : v) && (T = va(e, T, -r, T && T.line == t.line ? u : null)), T && T.line == t.line && (O = ge(T, i)) && (r < 0 ? O < 0 : O > 0))
                  return Bi(e, T, t, r, l);
              }
              var M = g.find(r < 0 ? -1 : 1);
              return (r < 0 ? v : _) && (M = va(e, M, r, M.line == t.line ? u : null)), M ? Bi(e, M, t, r, l) : null;
            }
          }
        return t;
      }
      function kl(e, t, i, r, l) {
        var u = r || 1, f = Bi(e, t, i, u, l) || !l && Bi(e, t, i, u, !0) || Bi(e, t, i, -u, l) || !l && Bi(e, t, i, -u, !0);
        return f || (e.cantEdit = !0, q(e.first, 0));
      }
      function va(e, t, i, r) {
        return i < 0 && t.ch == 0 ? t.line > e.first ? de(e, q(t.line - 1)) : null : i > 0 && t.ch == (r || ie(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? q(t.line + 1, 0) : null : new q(t.line, t.ch + i);
      }
      function Fl(e) {
        e.setSelection(q(e.firstLine(), 0), q(e.lastLine()), en);
      }
      function ya(e, t, i) {
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
        return i && (r.update = function(l, u, f, d) {
          l && (r.from = de(e, l)), u && (r.to = de(e, u)), f && (r.text = f), d !== void 0 && (r.origin = d);
        }), rt(e, "beforeChange", e, r), e.cm && rt(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : { from: r.from, to: r.to, text: r.text, origin: r.origin };
      }
      function zn(e, t, i) {
        if (e.cm) {
          if (!e.cm.curOp)
            return je(e.cm, zn)(e, t, i);
          if (e.cm.state.suppressEdits)
            return;
        }
        if (!((fn(e, "beforeChange") || e.cm && fn(e.cm, "beforeChange")) && (t = ya(e, t, !0), !t))) {
          var r = ms && !i && kf(e, t.from, t.to);
          if (r)
            for (var l = r.length - 1; l >= 0; --l)
              Ks(e, { from: r[l].from, to: r[l].to, text: l ? [""] : t.text, origin: t.origin });
          else
            Ks(e, t);
        }
      }
      function Ks(e, t) {
        if (!(t.text.length == 1 && t.text[0] == "" && ge(t.from, t.to) == 0)) {
          var i = zs(e, t);
          sn(e, t, i, e.cm ? e.cm.curOp.id : NaN), ur(e, t, i, ws(e, t));
          var r = [];
          dn(e, function(l, u) {
            !u && ke(r, l.history) == -1 && (xa(l.history, t), r.push(l.history)), ur(l, t, null, ws(l, t));
          });
        }
      }
      function Dl(e, t, i) {
        var r = e.cm && e.cm.state.suppressEdits;
        if (!(r && !i)) {
          for (var l = e.history, u, f = e.sel, d = t == "undo" ? l.done : l.undone, g = t == "undo" ? l.undone : l.done, v = 0; v < d.length && (u = d[v], !(i ? u.ranges && !u.equals(e.sel) : !u.ranges)); v++)
            ;
          if (v != d.length) {
            for (l.lastOrigin = l.lastSelOrigin = null; ; )
              if (u = d.pop(), u.ranges) {
                if (To(u, g), i && !u.equals(e.sel)) {
                  pt(e, u, { clearRedo: !1 });
                  return;
                }
                f = u;
              } else if (r) {
                d.push(u);
                return;
              } else
                break;
            var _ = [];
            To(f, g), g.push({ changes: _, generation: l.generation }), l.generation = u.generation || ++l.maxGeneration;
            for (var T = fn(e, "beforeChange") || e.cm && fn(e.cm, "beforeChange"), O = function(z) {
              var X = u.changes[z];
              if (X.origin = t, T && !ya(e, X, !1))
                return d.length = 0, {};
              _.push(Dn(e, X));
              var Z = z ? zs(e, X) : Ne(d);
              ur(e, X, Z, ga(e, X)), !z && e.cm && e.cm.scrollIntoView({ from: X.from, to: Or(X) });
              var J = [];
              dn(e, function(Y, j) {
                !j && ke(J, Y.history) == -1 && (xa(Y.history, X), J.push(Y.history)), ur(Y, X, null, ga(Y, X));
              });
            }, M = u.changes.length - 1; M >= 0; --M) {
              var B = O(M);
              if (B)
                return B.v;
            }
          }
        }
      }
      function ma(e, t) {
        if (t != 0 && (e.first += t, e.sel = new ln(Xo(e.sel.ranges, function(l) {
          return new Re(
            q(l.anchor.line + t, l.anchor.ch),
            q(l.head.line + t, l.head.ch)
          );
        }), e.sel.primIndex), e.cm)) {
          kt(e.cm, e.first, e.first - t, t);
          for (var i = e.cm.display, r = i.viewFrom; r < i.viewTo; r++)
            Fr(e.cm, r, "gutter");
        }
      }
      function ur(e, t, i, r) {
        if (e.cm && !e.cm.curOp)
          return je(e.cm, ur)(e, t, i, r);
        if (t.to.line < e.first) {
          ma(e, t.text.length - 1 - (t.to.line - t.from.line));
          return;
        }
        if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var l = t.text.length - 1 - (e.first - t.from.line);
            ma(e, l), t = {
              from: q(e.first, 0),
              to: q(t.to.line + l, t.to.ch),
              text: [Ne(t.text)],
              origin: t.origin
            };
          }
          var u = e.lastLine();
          t.to.line > u && (t = {
            from: t.from,
            to: q(u, ie(e, u).text.length),
            text: [t.text[0]],
            origin: t.origin
          }), t.removed = Xr(e, t.from, t.to), i || (i = zs(e, t)), e.cm ? Qf(e.cm, t, r) : _o(e, t, r), Hn(e, i, en), e.cantEdit && kl(e, q(e.firstLine(), 0)) && (e.cantEdit = !1);
        }
      }
      function Qf(e, t, i) {
        var r = e.doc, l = e.display, u = t.from, f = t.to, d = !1, g = u.line;
        e.options.lineWrapping || (g = Be(cn(ie(r, u.line))), r.iter(g, f.line + 1, function(M) {
          if (M == l.maxLine)
            return d = !0, !0;
        })), r.sel.contains(t.from, t.to) > -1 && ns(e), _o(r, t, i, yo(e)), e.options.lineWrapping || (r.iter(g, u.line + t.text.length, function(M) {
          var B = co(M);
          B > l.maxLineLength && (l.maxLine = M, l.maxLineLength = B, l.maxLineChanged = !0, d = !1);
        }), d && (e.curOp.updateMaxLine = !0)), Mu(r, u.line), Se(e, 400);
        var v = t.text.length - (f.line - u.line) - 1;
        t.full ? kt(e) : u.line == f.line && t.text.length == 1 && !fa(e.doc, t) ? Fr(e, u.line, "text") : kt(e, u.line, f.line + 1, v);
        var _ = fn(e, "changes"), T = fn(e, "change");
        if (T || _) {
          var O = {
            from: u,
            to: f,
            text: t.text,
            removed: t.removed,
            origin: t.origin
          };
          T && dt(e, "change", e, O), _ && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(O);
        }
        e.display.selForContextMenu = null;
      }
      function Hi(e, t, i, r, l) {
        var u;
        r || (r = i), ge(r, i) < 0 && (u = [r, i], i = u[0], r = u[1]), typeof t == "string" && (t = e.splitLines(t)), zn(e, { from: i, to: r, text: t, origin: l });
      }
      function El(e, t, i, r) {
        i < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
      }
      function $s(e, t, i, r) {
        for (var l = 0; l < e.length; ++l) {
          var u = e[l], f = !0;
          if (u.ranges) {
            u.copied || (u = e[l] = u.deepCopy(), u.copied = !0);
            for (var d = 0; d < u.ranges.length; d++)
              El(u.ranges[d].anchor, t, i, r), El(u.ranges[d].head, t, i, r);
            continue;
          }
          for (var g = 0; g < u.changes.length; ++g) {
            var v = u.changes[g];
            if (i < v.from.line)
              v.from = q(v.from.line + r, v.from.ch), v.to = q(v.to.line + r, v.to.ch);
            else if (t <= v.to.line) {
              f = !1;
              break;
            }
          }
          f || (e.splice(0, l + 1), l = 0);
        }
      }
      function xa(e, t) {
        var i = t.from.line, r = t.to.line, l = t.text.length - (r - i) - 1;
        $s(e.done, i, r, l), $s(e.undone, i, r, l);
      }
      function Fo(e, t, i, r) {
        var l = t, u = t;
        return typeof t == "number" ? u = ie(e, ps(e, t)) : l = Be(t), l == null ? null : (r(u, l) && e.cm && Fr(e.cm, l, i), u);
      }
      function Do(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, i = 0; i < e.length; ++i)
          e[i].parent = this, t += e[i].height;
        this.height = t;
      }
      Do.prototype = {
        chunkSize: function() {
          return this.lines.length;
        },
        removeInner: function(e, t) {
          for (var i = e, r = e + t; i < r; ++i) {
            var l = this.lines[i];
            this.height -= l.height, Hu(l), dt(l, "delete");
          }
          this.lines.splice(e, t);
        },
        collapse: function(e) {
          e.push.apply(e, this.lines);
        },
        insertInner: function(e, t, i) {
          this.height += i, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
          for (var r = 0; r < t.length; ++r)
            t[r].parent = this;
        },
        iterN: function(e, t, i) {
          for (var r = e + t; e < r; ++e)
            if (i(this.lines[e]))
              return !0;
        }
      };
      function zi(e) {
        this.children = e;
        for (var t = 0, i = 0, r = 0; r < e.length; ++r) {
          var l = e[r];
          t += l.chunkSize(), i += l.height, l.parent = this;
        }
        this.size = t, this.height = i, this.parent = null;
      }
      zi.prototype = {
        chunkSize: function() {
          return this.size;
        },
        removeInner: function(e, t) {
          this.size -= t;
          for (var i = 0; i < this.children.length; ++i) {
            var r = this.children[i], l = r.chunkSize();
            if (e < l) {
              var u = Math.min(t, l - e), f = r.height;
              if (r.removeInner(e, u), this.height -= f - r.height, l == u && (this.children.splice(i--, 1), r.parent = null), (t -= u) == 0)
                break;
              e = 0;
            } else
              e -= l;
          }
          if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Do))) {
            var d = [];
            this.collapse(d), this.children = [new Do(d)], this.children[0].parent = this;
          }
        },
        collapse: function(e) {
          for (var t = 0; t < this.children.length; ++t)
            this.children[t].collapse(e);
        },
        insertInner: function(e, t, i) {
          this.size += t.length, this.height += i;
          for (var r = 0; r < this.children.length; ++r) {
            var l = this.children[r], u = l.chunkSize();
            if (e <= u) {
              if (l.insertInner(e, t, i), l.lines && l.lines.length > 50) {
                for (var f = l.lines.length % 25 + 25, d = f; d < l.lines.length; ) {
                  var g = new Do(l.lines.slice(d, d += 25));
                  l.height -= g.height, this.children.splice(++r, 0, g), g.parent = this;
                }
                l.lines = l.lines.slice(0, f), this.maybeSpill();
              }
              break;
            }
            e -= u;
          }
        },
        maybeSpill: function() {
          if (!(this.children.length <= 10)) {
            var e = this;
            do {
              var t = e.children.splice(e.children.length - 5, 5), i = new zi(t);
              if (e.parent) {
                e.size -= i.size, e.height -= i.height;
                var l = ke(e.parent.children, e);
                e.parent.children.splice(l + 1, 0, i);
              } else {
                var r = new zi(e.children);
                r.parent = e, e.children = [r, i], e = r;
              }
              i.parent = e.parent;
            } while (e.children.length > 10);
            e.parent.maybeSpill();
          }
        },
        iterN: function(e, t, i) {
          for (var r = 0; r < this.children.length; ++r) {
            var l = this.children[r], u = l.chunkSize();
            if (e < u) {
              var f = Math.min(t, u - e);
              if (l.iterN(e, f, i))
                return !0;
              if ((t -= f) == 0)
                break;
              e = 0;
            } else
              e -= u;
          }
        }
      };
      var ui = function(e, t, i) {
        if (i)
          for (var r in i)
            i.hasOwnProperty(r) && (this[r] = i[r]);
        this.doc = e, this.node = t;
      };
      ui.prototype.clear = function() {
        var e = this.doc.cm, t = this.line.widgets, i = this.line, r = Be(i);
        if (!(r == null || !t)) {
          for (var l = 0; l < t.length; ++l)
            t[l] == this && t.splice(l--, 1);
          t.length || (i.widgets = null);
          var u = Ot(this);
          Cn(i, Math.max(0, i.height - u)), e && (m(e, function() {
            wa(e, i, -u), Fr(e, r, "widget");
          }), dt(e, "lineWidgetCleared", e, this, r));
        }
      }, ui.prototype.changed = function() {
        var e = this, t = this.height, i = this.doc.cm, r = this.line;
        this.height = null;
        var l = Ot(this) - t;
        !l || (Vn(this.doc, r) || Cn(r, r.height + l), i && m(i, function() {
          i.curOp.forceUpdate = !0, wa(i, r, l), dt(i, "lineWidgetChanged", i, e, Be(r));
        }));
      }, Si(ui);
      function wa(e, t, i) {
        ht(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && xl(e, i);
      }
      function Xs(e, t, i, r) {
        var l = new ui(e, i, r), u = e.cm;
        return u && l.noHScroll && (u.display.alignWidgets = !0), Fo(e, t, "widget", function(f) {
          var d = f.widgets || (f.widgets = []);
          if (l.insertAt == null ? d.push(l) : d.splice(Math.min(d.length, Math.max(0, l.insertAt)), 0, l), l.line = f, u && !Vn(e, f)) {
            var g = ht(f) < e.scrollTop;
            Cn(f, f.height + Ot(l)), g && xl(u, l.height), u.curOp.forceUpdate = !0;
          }
          return !0;
        }), u && dt(u, "lineWidgetAdded", u, l, typeof t == "number" ? t : Be(t)), l;
      }
      var Ys = 0, ar = function(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++Ys;
      };
      ar.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          var e = this.doc.cm, t = e && !e.curOp;
          if (t && ii(e), fn(this, "clear")) {
            var i = this.find();
            i && dt(this, "clear", i.from, i.to);
          }
          for (var r = null, l = null, u = 0; u < this.lines.length; ++u) {
            var f = this.lines[u], d = uo(f.markedSpans, this);
            e && !this.collapsed ? Fr(e, Be(f), "text") : e && (d.to != null && (l = Be(f)), d.from != null && (r = Be(f))), f.markedSpans = Lf(f.markedSpans, d), d.from == null && this.collapsed && !Vn(this.doc, f) && e && Cn(f, nr(e.display));
          }
          if (e && this.collapsed && !e.options.lineWrapping)
            for (var g = 0; g < this.lines.length; ++g) {
              var v = cn(this.lines[g]), _ = co(v);
              _ > e.display.maxLineLength && (e.display.maxLine = v, e.display.maxLineLength = _, e.display.maxLineChanged = !0);
            }
          r != null && e && this.collapsed && kt(e, r, l + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ht(e.doc)), e && dt(e, "markerCleared", e, this, r, l), t && oi(e), this.parent && this.parent.clear();
        }
      }, ar.prototype.find = function(e, t) {
        e == null && this.type == "bookmark" && (e = 1);
        for (var i, r, l = 0; l < this.lines.length; ++l) {
          var u = this.lines[l], f = uo(u.markedSpans, this);
          if (f.from != null && (i = q(t ? u : Be(u), f.from), e == -1))
            return i;
          if (f.to != null && (r = q(t ? u : Be(u), f.to), e == 1))
            return r;
        }
        return i && { from: i, to: r };
      }, ar.prototype.changed = function() {
        var e = this, t = this.find(-1, !0), i = this, r = this.doc.cm;
        !t || !r || m(r, function() {
          var l = t.line, u = Be(t.line), f = Fs(r, u);
          if (f && (Vr(f), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !Vn(i.doc, l) && i.height != null) {
            var d = i.height;
            i.height = null;
            var g = Ot(i) - d;
            g && Cn(l, l.height + g);
          }
          dt(r, "markerChanged", r, e);
        });
      }, ar.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (!t.maybeHiddenMarkers || ke(t.maybeHiddenMarkers, this) == -1) && (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(e);
      }, ar.prototype.detachLine = function(e) {
        if (this.lines.splice(ke(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;
          (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, Si(ar);
      function ai(e, t, i, r, l) {
        if (r && r.shared)
          return Jf(e, t, i, r, l);
        if (e.cm && !e.cm.curOp)
          return je(e.cm, ai)(e, t, i, r, l);
        var u = new ar(e, l), f = ge(t, i);
        if (r && wt(r, u, !1), f > 0 || f == 0 && u.clearWhenEmpty !== !1)
          return u;
        if (u.replacedWith && (u.collapsed = !0, u.widgetNode = xr("span", [u.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || u.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (u.widgetNode.insertLeft = !0)), u.collapsed) {
          if (Wu(e, t.line, t, i, u) || t.line != i.line && Wu(e, i.line, t, i, u))
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          _f();
        }
        u.addToHistory && sn(e, { from: t, to: i, origin: "markText" }, e.sel, NaN);
        var d = t.line, g = e.cm, v;
        if (e.iter(d, i.line + 1, function(T) {
          g && u.collapsed && !g.options.lineWrapping && cn(T) == g.display.maxLine && (v = !0), u.collapsed && d != t.line && Cn(T, 0), Tf(T, new so(
            u,
            d == t.line ? t.ch : null,
            d == i.line ? i.ch : null
          ), e.cm && e.cm.curOp), ++d;
        }), u.collapsed && e.iter(t.line, i.line + 1, function(T) {
          Vn(e, T) && Cn(T, 0);
        }), u.clearOnEnter && fe(u, "beforeCursorEnter", function() {
          return u.clear();
        }), u.readOnly && (Cf(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), u.collapsed && (u.id = ++Ys, u.atomic = !0), g) {
          if (v && (g.curOp.updateMaxLine = !0), u.collapsed)
            kt(g, t.line, i.line + 1);
          else if (u.className || u.startStyle || u.endStyle || u.css || u.attributes || u.title)
            for (var _ = t.line; _ <= i.line; _++)
              Fr(g, _, "text");
          u.atomic && Ht(g.doc), dt(g, "markerAdded", g, u);
        }
        return u;
      }
      var Pr = function(e, t) {
        this.markers = e, this.primary = t;
        for (var i = 0; i < e.length; ++i)
          e[i].parent = this;
      };
      Pr.prototype.clear = function() {
        if (!this.explicitlyCleared) {
          this.explicitlyCleared = !0;
          for (var e = 0; e < this.markers.length; ++e)
            this.markers[e].clear();
          dt(this, "clear");
        }
      }, Pr.prototype.find = function(e, t) {
        return this.primary.find(e, t);
      }, Si(Pr);
      function Jf(e, t, i, r, l) {
        r = wt(r), r.shared = !1;
        var u = [ai(e, t, i, r, l)], f = u[0], d = r.widgetNode;
        return dn(e, function(g) {
          d && (r.widgetNode = d.cloneNode(!0)), u.push(ai(g, de(g, t), de(g, i), r, l));
          for (var v = 0; v < g.linked.length; ++v)
            if (g.linked[v].isParent)
              return;
          f = Ne(u);
        }), new Pr(u, f);
      }
      function Zs(e) {
        return e.findMarks(q(e.first, 0), e.clipPos(q(e.lastLine())), function(t) {
          return t.parent;
        });
      }
      function ba(e, t) {
        for (var i = 0; i < t.length; i++) {
          var r = t[i], l = r.find(), u = e.clipPos(l.from), f = e.clipPos(l.to);
          if (ge(u, f)) {
            var d = ai(e, u, f, r.primary, r.primary.type);
            r.markers.push(d), d.parent = r;
          }
        }
      }
      function Vf(e) {
        for (var t = function(r) {
          var l = e[r], u = [l.primary.doc];
          dn(l.primary.doc, function(g) {
            return u.push(g);
          });
          for (var f = 0; f < l.markers.length; f++) {
            var d = l.markers[f];
            ke(u, d.doc) == -1 && (d.parent = null, l.markers.splice(f--, 1));
          }
        }, i = 0; i < e.length; i++)
          t(i);
      }
      var Sa = 0, Kt = function(e, t, i, r, l) {
        if (!(this instanceof Kt))
          return new Kt(e, t, i, r, l);
        i == null && (i = 0), zi.call(this, [new Do([new Zr("", null)])]), this.first = i, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = i;
        var u = q(i, 0);
        this.sel = Ir(u), this.history = new _l(null), this.id = ++Sa, this.modeOption = t, this.lineSep = r, this.direction = l == "rtl" ? "rtl" : "ltr", this.extend = !1, typeof e == "string" && (e = this.splitLines(e)), _o(this, { from: u, to: u, text: e }), pt(this, Ir(u), en);
      };
      Kt.prototype = bi(zi.prototype, {
        constructor: Kt,
        iter: function(e, t, i) {
          i ? this.iterN(e - this.first, t - e, i) : this.iterN(this.first, this.first + this.size, e);
        },
        insert: function(e, t) {
          for (var i = 0, r = 0; r < t.length; ++r)
            i += t[r].height;
          this.insertInner(e - this.first, t, i);
        },
        remove: function(e, t) {
          this.removeInner(e - this.first, t);
        },
        getValue: function(e) {
          var t = jo(this, this.first, this.first + this.size);
          return e === !1 ? t : t.join(e || this.lineSeparator());
        },
        setValue: ze(function(e) {
          var t = q(this.first, 0), i = this.first + this.size - 1;
          zn(this, {
            from: t,
            to: q(i, ie(this, i).text.length),
            text: this.splitLines(e),
            origin: "setValue",
            full: !0
          }, !0), this.cm && xo(this.cm, 0, 0), pt(this, Ir(t), en);
        }),
        replaceRange: function(e, t, i, r) {
          t = de(this, t), i = i ? de(this, i) : t, Hi(this, e, t, i, r);
        },
        getRange: function(e, t, i) {
          var r = Xr(this, de(this, e), de(this, t));
          return i === !1 ? r : i === "" ? r.join("") : r.join(i || this.lineSeparator());
        },
        getLine: function(e) {
          var t = this.getLineHandle(e);
          return t && t.text;
        },
        getLineHandle: function(e) {
          if (io(this, e))
            return ie(this, e);
        },
        getLineNumber: function(e) {
          return Be(e);
        },
        getLineHandleVisualStart: function(e) {
          return typeof e == "number" && (e = ie(this, e)), cn(e);
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
          return de(this, e);
        },
        getCursor: function(e) {
          var t = this.sel.primary(), i;
          return e == null || e == "head" ? i = t.head : e == "anchor" ? i = t.anchor : e == "end" || e == "to" || e === !1 ? i = t.to() : i = t.from(), i;
        },
        listSelections: function() {
          return this.sel.ranges;
        },
        somethingSelected: function() {
          return this.sel.somethingSelected();
        },
        setCursor: ze(function(e, t, i) {
          Gs(this, de(this, typeof e == "number" ? q(e, t || 0) : e), null, i);
        }),
        setSelection: ze(function(e, t, i) {
          Gs(this, de(this, e), de(this, t || e), i);
        }),
        extendSelection: ze(function(e, t, i) {
          Ao(this, de(this, e), t && de(this, t), i);
        }),
        extendSelections: ze(function(e, t) {
          Ft(this, ku(this, e), t);
        }),
        extendSelectionsBy: ze(function(e, t) {
          var i = Xo(this.sel.ranges, e);
          Ft(this, ku(this, i), t);
        }),
        setSelections: ze(function(e, t, i) {
          if (!!e.length) {
            for (var r = [], l = 0; l < e.length; l++)
              r[l] = new Re(
                de(this, e[l].anchor),
                de(this, e[l].head || e[l].anchor)
              );
            t == null && (t = Math.min(e.length - 1, this.sel.primIndex)), pt(this, lt(this.cm, r, t), i);
          }
        }),
        addSelection: ze(function(e, t, i) {
          var r = this.sel.ranges.slice(0);
          r.push(new Re(de(this, e), de(this, t || e))), pt(this, lt(this.cm, r, r.length - 1), i);
        }),
        getSelection: function(e) {
          for (var t = this.sel.ranges, i, r = 0; r < t.length; r++) {
            var l = Xr(this, t[r].from(), t[r].to());
            i = i ? i.concat(l) : l;
          }
          return e === !1 ? i : i.join(e || this.lineSeparator());
        },
        getSelections: function(e) {
          for (var t = [], i = this.sel.ranges, r = 0; r < i.length; r++) {
            var l = Xr(this, i[r].from(), i[r].to());
            e !== !1 && (l = l.join(e || this.lineSeparator())), t[r] = l;
          }
          return t;
        },
        replaceSelection: function(e, t, i) {
          for (var r = [], l = 0; l < this.sel.ranges.length; l++)
            r[l] = e;
          this.replaceSelections(r, t, i || "+input");
        },
        replaceSelections: ze(function(e, t, i) {
          for (var r = [], l = this.sel, u = 0; u < l.ranges.length; u++) {
            var f = l.ranges[u];
            r[u] = { from: f.from(), to: f.to(), text: this.splitLines(e[u]), origin: i };
          }
          for (var d = t && t != "end" && aa(this, r, t), g = r.length - 1; g >= 0; g--)
            zn(this, r[g]);
          d ? Tl(this, d) : this.cm && Oi(this.cm);
        }),
        undo: ze(function() {
          Dl(this, "undo");
        }),
        redo: ze(function() {
          Dl(this, "redo");
        }),
        undoSelection: ze(function() {
          Dl(this, "undo", !0);
        }),
        redoSelection: ze(function() {
          Dl(this, "redo", !0);
        }),
        setExtending: function(e) {
          this.extend = e;
        },
        getExtending: function() {
          return this.extend;
        },
        historySize: function() {
          for (var e = this.history, t = 0, i = 0, r = 0; r < e.done.length; r++)
            e.done[r].ranges || ++t;
          for (var l = 0; l < e.undone.length; l++)
            e.undone[l].ranges || ++i;
          return { undo: t, redo: i };
        },
        clearHistory: function() {
          var e = this;
          this.history = new _l(this.history), dn(this, function(t) {
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
            done: sr(this.history.done),
            undone: sr(this.history.undone)
          };
        },
        setHistory: function(e) {
          var t = this.history = new _l(this.history);
          t.done = sr(e.done.slice(0), null, !0), t.undone = sr(e.undone.slice(0), null, !0);
        },
        setGutterMarker: ze(function(e, t, i) {
          return Fo(this, e, "gutter", function(r) {
            var l = r.gutterMarkers || (r.gutterMarkers = {});
            return l[t] = i, !i && _u(l) && (r.gutterMarkers = null), !0;
          });
        }),
        clearGutter: ze(function(e) {
          var t = this;
          this.iter(function(i) {
            i.gutterMarkers && i.gutterMarkers[e] && Fo(t, i, "gutter", function() {
              return i.gutterMarkers[e] = null, _u(i.gutterMarkers) && (i.gutterMarkers = null), !0;
            });
          });
        }),
        lineInfo: function(e) {
          var t;
          if (typeof e == "number") {
            if (!io(this, e) || (t = e, e = ie(this, e), !e))
              return null;
          } else if (t = Be(e), t == null)
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
        addLineClass: ze(function(e, t, i) {
          return Fo(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var l = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass";
            if (!r[l])
              r[l] = i;
            else {
              if (Zn(i).test(r[l]))
                return !1;
              r[l] += " " + i;
            }
            return !0;
          });
        }),
        removeLineClass: ze(function(e, t, i) {
          return Fo(this, e, t == "gutter" ? "gutter" : "class", function(r) {
            var l = t == "text" ? "textClass" : t == "background" ? "bgClass" : t == "gutter" ? "gutterClass" : "wrapClass", u = r[l];
            if (u)
              if (i == null)
                r[l] = null;
              else {
                var f = u.match(Zn(i));
                if (!f)
                  return !1;
                var d = f.index + f[0].length;
                r[l] = u.slice(0, f.index) + (!f.index || d == u.length ? "" : " ") + u.slice(d) || null;
              }
            else
              return !1;
            return !0;
          });
        }),
        addLineWidget: ze(function(e, t, i) {
          return Xs(this, e, t, i);
        }),
        removeLineWidget: function(e) {
          e.clear();
        },
        markText: function(e, t, i) {
          return ai(this, de(this, e), de(this, t), i, i && i.type || "range");
        },
        setBookmark: function(e, t) {
          var i = {
            replacedWith: t && (t.nodeType == null ? t.widget : t),
            insertLeft: t && t.insertLeft,
            clearWhenEmpty: !1,
            shared: t && t.shared,
            handleMouseEvents: t && t.handleMouseEvents
          };
          return e = de(this, e), ai(this, e, e, i, "bookmark");
        },
        findMarksAt: function(e) {
          e = de(this, e);
          var t = [], i = ie(this, e.line).markedSpans;
          if (i)
            for (var r = 0; r < i.length; ++r) {
              var l = i[r];
              (l.from == null || l.from <= e.ch) && (l.to == null || l.to >= e.ch) && t.push(l.marker.parent || l.marker);
            }
          return t;
        },
        findMarks: function(e, t, i) {
          e = de(this, e), t = de(this, t);
          var r = [], l = e.line;
          return this.iter(e.line, t.line + 1, function(u) {
            var f = u.markedSpans;
            if (f)
              for (var d = 0; d < f.length; d++) {
                var g = f[d];
                !(g.to != null && l == e.line && e.ch >= g.to || g.from == null && l != e.line || g.from != null && l == t.line && g.from >= t.ch) && (!i || i(g.marker)) && r.push(g.marker.parent || g.marker);
              }
            ++l;
          }), r;
        },
        getAllMarks: function() {
          var e = [];
          return this.iter(function(t) {
            var i = t.markedSpans;
            if (i)
              for (var r = 0; r < i.length; ++r)
                i[r].from != null && e.push(i[r].marker);
          }), e;
        },
        posFromIndex: function(e) {
          var t, i = this.first, r = this.lineSeparator().length;
          return this.iter(function(l) {
            var u = l.text.length + r;
            if (u > e)
              return t = e, !0;
            e -= u, ++i;
          }), de(this, q(i, t));
        },
        indexFromPos: function(e) {
          e = de(this, e);
          var t = e.ch;
          if (e.line < this.first || e.ch < 0)
            return 0;
          var i = this.lineSeparator().length;
          return this.iter(this.first, e.line, function(r) {
            t += r.text.length + i;
          }), t;
        },
        copy: function(e) {
          var t = new Kt(
            jo(this, this.first, this.first + this.size),
            this.modeOption,
            this.first,
            this.lineSep,
            this.direction
          );
          return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
        },
        linkedDoc: function(e) {
          e || (e = {});
          var t = this.first, i = this.first + this.size;
          e.from != null && e.from > t && (t = e.from), e.to != null && e.to < i && (i = e.to);
          var r = new Kt(jo(this, t, i), e.mode || this.modeOption, t, this.lineSep, this.direction);
          return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }), r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], ba(r, Zs(this)), r;
        },
        unlinkDoc: function(e) {
          if (e instanceof Qe && (e = e.doc), this.linked)
            for (var t = 0; t < this.linked.length; ++t) {
              var i = this.linked[t];
              if (i.doc == e) {
                this.linked.splice(t, 1), e.unlinkDoc(this), Vf(Zs(this));
                break;
              }
            }
          if (e.history == this.history) {
            var r = [e.id];
            dn(e, function(l) {
              return r.push(l.id);
            }, !0), e.history = new _l(null), e.history.done = sr(this.history.done, r), e.history.undone = sr(this.history.undone, r);
          }
        },
        iterLinkedDocs: function(e) {
          dn(this, e);
        },
        getMode: function() {
          return this.mode;
        },
        getEditor: function() {
          return this.cm;
        },
        splitLines: function(e) {
          return this.lineSep ? e.split(this.lineSep) : us(e);
        },
        lineSeparator: function() {
          return this.lineSep || `
`;
        },
        setDirection: ze(function(e) {
          e != "rtl" && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(t) {
            return t.order = null;
          }), this.cm && ha(this.cm));
        })
      }), Kt.prototype.eachLine = Kt.prototype.iter;
      var Ml = 0;
      function Ca(e) {
        var t = this;
        if (Il(t), !(ct(t, e) || Ln(t.display, e))) {
          qt(e), D && (Ml = +new Date());
          var i = jr(t, e, !0), r = e.dataTransfer.files;
          if (!(!i || t.isReadOnly()))
            if (r && r.length && window.FileReader && window.File)
              for (var l = r.length, u = Array(l), f = 0, d = function() {
                ++f == l && je(t, function() {
                  i = de(t.doc, i);
                  var M = {
                    from: i,
                    to: i,
                    text: t.doc.splitLines(
                      u.filter(function(B) {
                        return B != null;
                      }).join(t.doc.lineSeparator())
                    ),
                    origin: "paste"
                  };
                  zn(t.doc, M), Tl(t.doc, Ir(de(t.doc, i), de(t.doc, Or(M))));
                })();
              }, g = function(M, B) {
                if (t.options.allowDropFileTypes && ke(t.options.allowDropFileTypes, M.type) == -1) {
                  d();
                  return;
                }
                var z = new FileReader();
                z.onerror = function() {
                  return d();
                }, z.onload = function() {
                  var X = z.result;
                  if (/[\x00-\x08\x0e-\x1f]{2}/.test(X)) {
                    d();
                    return;
                  }
                  u[B] = X, d();
                }, z.readAsText(M);
              }, v = 0; v < r.length; v++)
                g(r[v], v);
            else {
              if (t.state.draggingText && t.doc.sel.contains(i) > -1) {
                t.state.draggingText(e), setTimeout(function() {
                  return t.display.input.focus();
                }, 20);
                return;
              }
              try {
                var _ = e.dataTransfer.getData("Text");
                if (_) {
                  var T;
                  if (t.state.draggingText && !t.state.draggingText.copy && (T = t.listSelections()), Hn(t.doc, Ir(i, i)), T)
                    for (var O = 0; O < T.length; ++O)
                      Hi(t.doc, "", T[O].anchor, T[O].head, "drag");
                  t.replaceSelection(_, "around", "paste"), t.display.input.focus();
                }
              } catch {
              }
            }
        }
      }
      function Qs(e, t) {
        if (D && (!e.state.draggingText || +new Date() - Ml < 100)) {
          no(t);
          return;
        }
        if (!(ct(e, t) || Ln(e.display, t)) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !Le)) {
          var i = ae("img", null, null, "position: fixed; left: 0; top: 0;");
          i.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", ce && (i.width = i.height = 1, e.display.wrapper.appendChild(i), i._top = i.offsetTop), t.dataTransfer.setDragImage(i, 0, 0), ce && i.parentNode.removeChild(i);
        }
      }
      function jf(e, t) {
        var i = jr(e, t);
        if (!!i) {
          var r = document.createDocumentFragment();
          Mi(e, i, r), e.display.dragCursor || (e.display.dragCursor = ae("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), Wt(e.display.dragCursor, r);
        }
      }
      function Il(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }
      function Ce(e) {
        if (!!document.getElementsByClassName) {
          for (var t = document.getElementsByClassName("CodeMirror"), i = [], r = 0; r < t.length; r++) {
            var l = t[r].CodeMirror;
            l && i.push(l);
          }
          i.length && i[0].operation(function() {
            for (var u = 0; u < i.length; u++)
              e(i[u]);
          });
        }
      }
      var _a = !1;
      function ec() {
        _a || (Eo(), _a = !0);
      }
      function Eo() {
        var e;
        fe(window, "resize", function() {
          e == null && (e = setTimeout(function() {
            e = null, Ce(La);
          }, 100));
        }), fe(window, "blur", function() {
          return Ce(or);
        });
      }
      function La(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize();
      }
      for (var Rr = {
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
      }, Mo = 0; Mo < 10; Mo++)
        Rr[Mo + 48] = Rr[Mo + 96] = String(Mo);
      for (var $t = 65; $t <= 90; $t++)
        Rr[$t] = String.fromCharCode($t);
      for (var Io = 1; Io <= 12; Io++)
        Rr[Io + 111] = Rr[Io + 63235] = "F" + Io;
      var pn = {};
      pn.basic = {
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
      }, pn.pcDefault = {
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
      }, pn.emacsy = {
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
      }, pn.macDefault = {
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
      }, pn.default = Te ? pn.macDefault : pn.pcDefault;
      function Js(e) {
        var t = e.split(/-(?!$)/);
        e = t[t.length - 1];
        for (var i, r, l, u, f = 0; f < t.length - 1; f++) {
          var d = t[f];
          if (/^(cmd|meta|m)$/i.test(d))
            u = !0;
          else if (/^a(lt)?$/i.test(d))
            i = !0;
          else if (/^(c|ctrl|control)$/i.test(d))
            r = !0;
          else if (/^s(hift)?$/i.test(d))
            l = !0;
          else
            throw new Error("Unrecognized modifier name: " + d);
        }
        return i && (e = "Alt-" + e), r && (e = "Ctrl-" + e), u && (e = "Cmd-" + e), l && (e = "Shift-" + e), e;
      }
      function Ta(e) {
        var t = {};
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var r = e[i];
            if (/^(name|fallthrough|(de|at)tach)$/.test(i))
              continue;
            if (r == "...") {
              delete e[i];
              continue;
            }
            for (var l = Xo(i.split(" "), Js), u = 0; u < l.length; u++) {
              var f = void 0, d = void 0;
              u == l.length - 1 ? (d = l.join(" "), f = r) : (d = l.slice(0, u + 1).join(" "), f = "...");
              var g = t[d];
              if (!g)
                t[d] = f;
              else if (g != f)
                throw new Error("Inconsistent bindings for " + d);
            }
            delete e[i];
          }
        for (var v in t)
          e[v] = t[v];
        return e;
      }
      function fi(e, t, i, r) {
        t = Oo(t);
        var l = t.call ? t.call(e, r) : t[e];
        if (l === !1)
          return "nothing";
        if (l === "...")
          return "multi";
        if (l != null && i(l))
          return "handled";
        if (t.fallthrough) {
          if (Object.prototype.toString.call(t.fallthrough) != "[object Array]")
            return fi(e, t.fallthrough, i, r);
          for (var u = 0; u < t.fallthrough.length; u++) {
            var f = fi(e, t.fallthrough[u], i, r);
            if (f)
              return f;
          }
        }
      }
      function Jt(e) {
        var t = typeof e == "string" ? e : Rr[e.keyCode];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod";
      }
      function fr(e, t, i) {
        var r = e;
        return t.altKey && r != "Alt" && (e = "Alt-" + e), (mt ? t.metaKey : t.ctrlKey) && r != "Ctrl" && (e = "Ctrl-" + e), (mt ? t.ctrlKey : t.metaKey) && r != "Mod" && (e = "Cmd-" + e), !i && t.shiftKey && r != "Shift" && (e = "Shift-" + e), e;
      }
      function Ol(e, t) {
        if (ce && e.keyCode == 34 && e.char)
          return !1;
        var i = Rr[e.keyCode];
        return i == null || e.altGraphKey ? !1 : (e.keyCode == 3 && e.code && (i = e.code), fr(i, e, t));
      }
      function Oo(e) {
        return typeof e == "string" ? pn[e] : e;
      }
      function cr(e, t) {
        for (var i = e.doc.sel.ranges, r = [], l = 0; l < i.length; l++) {
          for (var u = t(i[l]); r.length && ge(u.from, Ne(r).to) <= 0; ) {
            var f = r.pop();
            if (ge(f.from, u.from) < 0) {
              u.from = f.from;
              break;
            }
          }
          r.push(u);
        }
        m(e, function() {
          for (var d = r.length - 1; d >= 0; d--)
            Hi(e.doc, "", r[d].from, r[d].to, "+delete");
          Oi(e);
        });
      }
      function Nl(e, t, i) {
        var r = Zo(e.text, t + i, i);
        return r < 0 || r > e.text.length ? null : r;
      }
      function No(e, t, i) {
        var r = Nl(e, t.ch, i);
        return r == null ? null : new q(t.line, r, i < 0 ? "after" : "before");
      }
      function Pl(e, t, i, r, l) {
        if (e) {
          t.doc.direction == "rtl" && (l = -l);
          var u = Sn(i, t.doc.direction);
          if (u) {
            var f = l < 0 ? Ne(u) : u[0], d = l < 0 == (f.level == 1), g = d ? "after" : "before", v;
            if (f.level > 0 || t.doc.direction == "rtl") {
              var _ = Tr(t, i);
              v = l < 0 ? i.text.length - 1 : 0;
              var T = Tn(t, _, v).top;
              v = Gr(function(O) {
                return Tn(t, _, O).top == T;
              }, l < 0 == (f.level == 1) ? f.from : f.to - 1, v), g == "before" && (v = Nl(i, v, 1));
            } else
              v = l < 0 ? f.to : f.from;
            return new q(r, v, g);
          }
        }
        return new q(r, l < 0 ? i.text.length : 0, l < 0 ? "before" : "after");
      }
      function Vs(e, t, i, r) {
        var l = Sn(t, e.doc.direction);
        if (!l)
          return No(t, i, r);
        i.ch >= t.text.length ? (i.ch = t.text.length, i.sticky = "before") : i.ch <= 0 && (i.ch = 0, i.sticky = "after");
        var u = Kr(l, i.ch, i.sticky), f = l[u];
        if (e.doc.direction == "ltr" && f.level % 2 == 0 && (r > 0 ? f.to > i.ch : f.from < i.ch))
          return No(t, i, r);
        var d = function(Z, J) {
          return Nl(t, Z instanceof q ? Z.ch : Z, J);
        }, g, v = function(Z) {
          return e.options.lineWrapping ? (g = g || Tr(e, t), Pe(e, t, g, Z)) : { begin: 0, end: t.text.length };
        }, _ = v(i.sticky == "before" ? d(i, -1) : i.ch);
        if (e.doc.direction == "rtl" || f.level == 1) {
          var T = f.level == 1 == r < 0, O = d(i, T ? 1 : -1);
          if (O != null && (T ? O <= f.to && O <= _.end : O >= f.from && O >= _.begin)) {
            var M = T ? "before" : "after";
            return new q(i.line, O, M);
          }
        }
        var B = function(Z, J, Y) {
          for (var j = function(Ue, gt) {
            return gt ? new q(i.line, d(Ue, 1), "before") : new q(i.line, Ue, "after");
          }; Z >= 0 && Z < l.length; Z += J) {
            var se = l[Z], oe = J > 0 == (se.level != 1), me = oe ? Y.begin : d(Y.end, -1);
            if (se.from <= me && me < se.to || (me = oe ? se.from : d(se.to, -1), Y.begin <= me && me < Y.end))
              return j(me, oe);
          }
        }, z = B(u + r, r, _);
        if (z)
          return z;
        var X = r > 0 ? _.end : d(_.begin, -1);
        return X != null && !(r > 0 && X == t.text.length) && (z = B(r > 0 ? 0 : l.length - 1, r, v(X)), z) ? z : null;
      }
      var ci = {
        selectAll: Fl,
        singleSelection: function(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), en);
        },
        killLine: function(e) {
          return cr(e, function(t) {
            if (t.empty()) {
              var i = ie(e.doc, t.head.line).text.length;
              return t.head.ch == i && t.head.line < e.lastLine() ? { from: t.head, to: q(t.head.line + 1, 0) } : { from: t.head, to: q(t.head.line, i) };
            } else
              return { from: t.from(), to: t.to() };
          });
        },
        deleteLine: function(e) {
          return cr(e, function(t) {
            return {
              from: q(t.from().line, 0),
              to: de(e.doc, q(t.to().line + 1, 0))
            };
          });
        },
        delLineLeft: function(e) {
          return cr(e, function(t) {
            return {
              from: q(t.from().line, 0),
              to: t.from()
            };
          });
        },
        delWrappedLineLeft: function(e) {
          return cr(e, function(t) {
            var i = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: i }, "div");
            return { from: r, to: t.from() };
          });
        },
        delWrappedLineRight: function(e) {
          return cr(e, function(t) {
            var i = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: i }, "div");
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
          return e.extendSelection(q(e.firstLine(), 0));
        },
        goDocEnd: function(e) {
          return e.extendSelection(q(e.lastLine()));
        },
        goLineStart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return hr(e, t.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return dr(e, t.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(e) {
          return e.extendSelectionsBy(
            function(t) {
              return tc(e, t.head.line);
            },
            { origin: "+move", bias: -1 }
          );
        },
        goLineRight: function(e) {
          return e.extendSelectionsBy(function(t) {
            var i = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: i }, "div");
          }, Gt);
        },
        goLineLeft: function(e) {
          return e.extendSelectionsBy(function(t) {
            var i = e.cursorCoords(t.head, "div").top + 5;
            return e.coordsChar({ left: 0, top: i }, "div");
          }, Gt);
        },
        goLineLeftSmart: function(e) {
          return e.extendSelectionsBy(function(t) {
            var i = e.cursorCoords(t.head, "div").top + 5, r = e.coordsChar({ left: 0, top: i }, "div");
            return r.ch < e.getLine(r.line).search(/\S/) ? dr(e, t.head) : r;
          }, Gt);
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
          for (var t = [], i = e.listSelections(), r = e.options.tabSize, l = 0; l < i.length; l++) {
            var u = i[l].from(), f = nt(e.getLine(u.line), u.ch, r);
            t.push(bn(r - f % r));
          }
          e.replaceSelections(t);
        },
        defaultTab: function(e) {
          e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
        },
        transposeChars: function(e) {
          return m(e, function() {
            for (var t = e.listSelections(), i = [], r = 0; r < t.length; r++)
              if (!!t[r].empty()) {
                var l = t[r].head, u = ie(e.doc, l.line).text;
                if (u) {
                  if (l.ch == u.length && (l = new q(l.line, l.ch - 1)), l.ch > 0)
                    l = new q(l.line, l.ch + 1), e.replaceRange(
                      u.charAt(l.ch - 1) + u.charAt(l.ch - 2),
                      q(l.line, l.ch - 2),
                      l,
                      "+transpose"
                    );
                  else if (l.line > e.doc.first) {
                    var f = ie(e.doc, l.line - 1).text;
                    f && (l = new q(l.line, 1), e.replaceRange(
                      u.charAt(0) + e.doc.lineSeparator() + f.charAt(f.length - 1),
                      q(l.line - 1, f.length - 1),
                      l,
                      "+transpose"
                    ));
                  }
                }
                i.push(new Re(l, l));
              }
            e.setSelections(i);
          });
        },
        newlineAndIndent: function(e) {
          return m(e, function() {
            for (var t = e.listSelections(), i = t.length - 1; i >= 0; i--)
              e.replaceRange(e.doc.lineSeparator(), t[i].anchor, t[i].head, "+input");
            t = e.listSelections();
            for (var r = 0; r < t.length; r++)
              e.indentLine(t[r].from().line, null, !0);
            Oi(e);
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
      function hr(e, t) {
        var i = ie(e.doc, t), r = cn(i);
        return r != i && (t = Be(r)), Pl(!0, e, r, t, 1);
      }
      function tc(e, t) {
        var i = ie(e.doc, t), r = Df(i);
        return r != i && (t = Be(r)), Pl(!0, e, i, t, -1);
      }
      function dr(e, t) {
        var i = hr(e, t.line), r = ie(e.doc, i.line), l = Sn(r, e.doc.direction);
        if (!l || l[0].level == 0) {
          var u = Math.max(i.ch, r.text.search(/\S/)), f = t.line == i.line && t.ch <= u && t.ch;
          return q(i.line, f ? 0 : u, i.sticky);
        }
        return i;
      }
      function Po(e, t, i) {
        if (typeof t == "string" && (t = ci[t], !t))
          return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift, l = !1;
        try {
          e.isReadOnly() && (e.state.suppressEdits = !0), i && (e.display.shift = !1), l = t(e) != zr;
        } finally {
          e.display.shift = r, e.state.suppressEdits = !1;
        }
        return l;
      }
      function Aa(e, t, i) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
          var l = fi(t, e.state.keyMaps[r], i, e);
          if (l)
            return l;
        }
        return e.options.extraKeys && fi(t, e.options.extraKeys, i, e) || fi(t, e.options.keyMap, i, e);
      }
      var js = new et();
      function Ro(e, t, i, r) {
        var l = e.state.keySeq;
        if (l) {
          if (Jt(t))
            return "handled";
          if (/\'$/.test(t) ? e.state.keySeq = null : js.set(50, function() {
            e.state.keySeq == l && (e.state.keySeq = null, e.display.input.reset());
          }), ka(e, l + " " + t, i, r))
            return !0;
        }
        return ka(e, t, i, r);
      }
      function ka(e, t, i, r) {
        var l = Aa(e, t, r);
        return l == "multi" && (e.state.keySeq = t), l == "handled" && dt(e, "keyHandled", e, t, i), (l == "handled" || l == "multi") && (qt(i), Ii(e)), !!l;
      }
      function Fa(e, t) {
        var i = Ol(t, !0);
        return i ? t.shiftKey && !e.state.keySeq ? Ro(e, "Shift-" + i, t, function(r) {
          return Po(e, r, !0);
        }) || Ro(e, i, t, function(r) {
          if (typeof r == "string" ? /^go[A-Z]/.test(r) : r.motion)
            return Po(e, r);
        }) : Ro(e, i, t, function(r) {
          return Po(e, r);
        }) : !1;
      }
      function Da(e, t, i) {
        return Ro(e, "'" + i + "'", t, function(r) {
          return Po(e, r, !0);
        });
      }
      var Rl = null;
      function Ea(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && (t.curOp.focus = b(Me(t)), !ct(t, e))) {
          D && P < 11 && e.keyCode == 27 && (e.returnValue = !1);
          var i = e.keyCode;
          t.display.shift = i == 16 || e.shiftKey;
          var r = Fa(t, e);
          ce && (Rl = r ? i : null, !r && i == 88 && !mf && (Te ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), w && !Te && !r && i == 46 && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), i == 18 && !/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) && Ma(t);
        }
      }
      function Ma(e) {
        var t = e.display.lineDiv;
        ne(t, "CodeMirror-crosshair");
        function i(r) {
          (r.keyCode == 18 || !r.altKey) && (Qn(t, "CodeMirror-crosshair"), tn(document, "keyup", i), tn(document, "mouseover", i));
        }
        fe(document, "keyup", i), fe(document, "mouseover", i);
      }
      function eu(e) {
        e.keyCode == 16 && (this.doc.sel.shift = !1), ct(this, e);
      }
      function Xt(e) {
        var t = this;
        if (!(e.target && e.target != t.display.input.getField()) && !(Ln(t.display, e) || ct(t, e) || e.ctrlKey && !e.altKey || Te && e.metaKey)) {
          var i = e.keyCode, r = e.charCode;
          if (ce && i == Rl) {
            Rl = null, qt(e);
            return;
          }
          if (!(ce && (!e.which || e.which < 10) && Fa(t, e))) {
            var l = String.fromCharCode(r == null ? i : r);
            l != "\b" && (Da(t, e, l) || t.display.input.onKeyPress(e));
          }
        }
      }
      var Un = 400, tu = function(e, t, i) {
        this.time = e, this.pos = t, this.button = i;
      };
      tu.prototype.compare = function(e, t, i) {
        return this.time + Un > e && ge(t, this.pos) == 0 && i == this.button;
      };
      var Wo, Wr;
      function Ui(e, t) {
        var i = +new Date();
        return Wr && Wr.compare(i, e, t) ? (Wo = Wr = null, "triple") : Wo && Wo.compare(i, e, t) ? (Wr = new tu(i, e, t), Wo = null, "double") : (Wo = new tu(i, e, t), Wr = null, "single");
      }
      function nu(e) {
        var t = this, i = t.display;
        if (!(ct(t, e) || i.activeTouch && i.input.supportsTouch())) {
          if (i.input.ensurePolled(), i.shift = e.shiftKey, Ln(i, e)) {
            R || (i.scroller.draggable = !1, setTimeout(function() {
              return i.scroller.draggable = !0;
            }, 100));
            return;
          }
          if (!Ki(t, e)) {
            var r = jr(t, e), l = Tu(e), u = r ? Ui(r, l) : "single";
            Mt(t).focus(), l == 1 && t.state.selectingText && t.state.selectingText(e), !(r && Ia(t, l, r, u, e)) && (l == 1 ? r ? Oa(t, r, u, e) : rs(e) == i.scroller && qt(e) : l == 2 ? (r && Ao(t.doc, r), setTimeout(function() {
              return i.input.focus();
            }, 20)) : l == 3 && (Qt ? t.display.input.onContextMenu(e) : ei(t)));
          }
        }
      }
      function Ia(e, t, i, r, l) {
        var u = "Click";
        return r == "double" ? u = "Double" + u : r == "triple" && (u = "Triple" + u), u = (t == 1 ? "Left" : t == 2 ? "Middle" : "Right") + u, Ro(e, fr(u, l), l, function(f) {
          if (typeof f == "string" && (f = ci[f]), !f)
            return !1;
          var d = !1;
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), d = f(e, i) != zr;
          } finally {
            e.state.suppressEdits = !1;
          }
          return d;
        });
      }
      function nc(e, t, i) {
        var r = e.getOption("configureMouse"), l = r ? r(e, t, i) : {};
        if (l.unit == null) {
          var u = Ee ? i.shiftKey && i.metaKey : i.altKey;
          l.unit = u ? "rectangle" : t == "single" ? "char" : t == "double" ? "word" : "line";
        }
        return (l.extend == null || e.doc.extend) && (l.extend = e.doc.extend || i.shiftKey), l.addNew == null && (l.addNew = Te ? i.metaKey : i.ctrlKey), l.moveOnDrag == null && (l.moveOnDrag = !(Te ? i.altKey : i.ctrlKey)), l;
      }
      function Oa(e, t, i, r) {
        D ? setTimeout(xt(Is, e), 0) : e.curOp.focus = b(Me(e));
        var l = nc(e, i, r), u = e.doc.sel, f;
        e.options.dragDrop && is && !e.isReadOnly() && i == "single" && (f = u.contains(t)) > -1 && (ge((f = u.ranges[f]).from(), t) < 0 || t.xRel > 0) && (ge(f.to(), t) > 0 || t.xRel < 0) ? Gi(e, r, t, l) : rc(e, r, t, l);
      }
      function Gi(e, t, i, r) {
        var l = e.display, u = !1, f = je(e, function(v) {
          R && (l.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : ei(e)), tn(l.wrapper.ownerDocument, "mouseup", f), tn(l.wrapper.ownerDocument, "mousemove", d), tn(l.scroller, "dragstart", g), tn(l.scroller, "drop", f), u || (qt(v), r.addNew || Ao(e.doc, i, null, null, r.extend), R && !Le || D && P == 9 ? setTimeout(function() {
            l.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), l.input.focus();
          }, 20) : l.input.focus());
        }), d = function(v) {
          u = u || Math.abs(t.clientX - v.clientX) + Math.abs(t.clientY - v.clientY) >= 10;
        }, g = function() {
          return u = !0;
        };
        R && (l.scroller.draggable = !0), e.state.draggingText = f, f.copy = !r.moveOnDrag, fe(l.wrapper.ownerDocument, "mouseup", f), fe(l.wrapper.ownerDocument, "mousemove", d), fe(l.scroller, "dragstart", g), fe(l.scroller, "drop", f), e.state.delayingBlurEvent = !0, setTimeout(function() {
          return l.input.focus();
        }, 20), l.scroller.dragDrop && l.scroller.dragDrop();
      }
      function qi(e, t, i) {
        if (i == "char")
          return new Re(t, t);
        if (i == "word")
          return e.findWordAt(t);
        if (i == "line")
          return new Re(q(t.line, 0), de(e.doc, q(t.line + 1, 0)));
        var r = i(e, t);
        return new Re(r.from, r.to);
      }
      function rc(e, t, i, r) {
        D && ei(e);
        var l = e.display, u = e.doc;
        qt(t);
        var f, d, g = u.sel, v = g.ranges;
        if (r.addNew && !r.extend ? (d = u.sel.contains(i), d > -1 ? f = v[d] : f = new Re(i, i)) : (f = u.sel.primary(), d = u.sel.primIndex), r.unit == "rectangle")
          r.addNew || (f = new Re(i, i)), i = jr(e, t, !0, !0), d = -1;
        else {
          var _ = qi(e, i, r.unit);
          r.extend ? f = Us(f, _.anchor, _.head, r.extend) : f = _;
        }
        r.addNew ? d == -1 ? (d = v.length, pt(
          u,
          lt(e, v.concat([f]), d),
          { scroll: !1, origin: "*mouse" }
        )) : v.length > 1 && v[d].empty() && r.unit == "char" && !r.extend ? (pt(
          u,
          lt(e, v.slice(0, d).concat(v.slice(d + 1)), 0),
          { scroll: !1, origin: "*mouse" }
        ), g = u.sel) : ko(u, d, f, Ko) : (d = 0, pt(u, new ln([f], 0), Ko), g = u.sel);
        var T = i;
        function O(Y) {
          if (ge(T, Y) != 0)
            if (T = Y, r.unit == "rectangle") {
              for (var j = [], se = e.options.tabSize, oe = nt(ie(u, i.line).text, i.ch, se), me = nt(ie(u, Y.line).text, Y.ch, se), Ue = Math.min(oe, me), gt = Math.max(oe, me), Je = Math.min(i.line, Y.line), Nt = Math.min(e.lastLine(), Math.max(i.line, Y.line)); Je <= Nt; Je++) {
                var zt = ie(u, Je).text, Ge = Ur(zt, Ue, se);
                Ue == gt ? j.push(new Re(q(Je, Ge), q(Je, Ge))) : zt.length > Ge && j.push(new Re(q(Je, Ge), q(Je, Ur(zt, gt, se))));
              }
              j.length || j.push(new Re(i, i)), pt(
                u,
                lt(e, g.ranges.slice(0, d).concat(j), d),
                { origin: "*mouse", scroll: !1 }
              ), e.scrollIntoView(Y);
            } else {
              var st = f, Dt = qi(e, Y, r.unit), ut = st.anchor, at;
              ge(Dt.anchor, ut) > 0 ? (at = Dt.head, ut = nl(st.from(), Dt.anchor)) : (at = Dt.anchor, ut = _i(st.to(), Dt.head));
              var tt = g.ranges.slice(0);
              tt[d] = Na(e, new Re(de(u, ut), at)), pt(u, lt(e, tt, d), Ko);
            }
        }
        var M = l.wrapper.getBoundingClientRect(), B = 0;
        function z(Y) {
          var j = ++B, se = jr(e, Y, !0, r.unit == "rectangle");
          if (!!se)
            if (ge(se, T) != 0) {
              e.curOp.focus = b(Me(e)), O(se);
              var oe = vl(l, u);
              (se.line >= oe.to || se.line < oe.from) && setTimeout(je(e, function() {
                B == j && z(Y);
              }), 150);
            } else {
              var me = Y.clientY < M.top ? -20 : Y.clientY > M.bottom ? 20 : 0;
              me && setTimeout(je(e, function() {
                B == j && (l.scroller.scrollTop += me, z(Y));
              }), 50);
            }
        }
        function X(Y) {
          e.state.selectingText = !1, B = 1 / 0, Y && (qt(Y), l.input.focus()), tn(l.wrapper.ownerDocument, "mousemove", Z), tn(l.wrapper.ownerDocument, "mouseup", J), u.history.lastSelOrigin = null;
        }
        var Z = je(e, function(Y) {
          Y.buttons === 0 || !Tu(Y) ? X(Y) : z(Y);
        }), J = je(e, X);
        e.state.selectingText = J, fe(l.wrapper.ownerDocument, "mousemove", Z), fe(l.wrapper.ownerDocument, "mouseup", J);
      }
      function Na(e, t) {
        var i = t.anchor, r = t.head, l = ie(e.doc, i.line);
        if (ge(i, r) == 0 && i.sticky == r.sticky)
          return t;
        var u = Sn(l);
        if (!u)
          return t;
        var f = Kr(u, i.ch, i.sticky), d = u[f];
        if (d.from != i.ch && d.to != i.ch)
          return t;
        var g = f + (d.from == i.ch == (d.level != 1) ? 0 : 1);
        if (g == 0 || g == u.length)
          return t;
        var v;
        if (r.line != i.line)
          v = (r.line - i.line) * (e.doc.direction == "ltr" ? 1 : -1) > 0;
        else {
          var _ = Kr(u, r.ch, r.sticky), T = _ - f || (r.ch - i.ch) * (d.level == 1 ? -1 : 1);
          _ == g - 1 || _ == g ? v = T < 0 : v = T > 0;
        }
        var O = u[g + (v ? -1 : 0)], M = v == (O.level == 1), B = M ? O.from : O.to, z = M ? "after" : "before";
        return i.ch == B && i.sticky == z ? t : new Re(new q(i.line, B, z), r);
      }
      function ru(e, t, i, r) {
        var l, u;
        if (t.touches)
          l = t.touches[0].clientX, u = t.touches[0].clientY;
        else
          try {
            l = t.clientX, u = t.clientY;
          } catch {
            return !1;
          }
        if (l >= Math.floor(e.display.gutters.getBoundingClientRect().right))
          return !1;
        r && qt(t);
        var f = e.display, d = f.lineDiv.getBoundingClientRect();
        if (u > d.bottom || !fn(e, i))
          return Jo(t);
        u -= d.top - f.viewOffset;
        for (var g = 0; g < e.display.gutterSpecs.length; ++g) {
          var v = f.gutters.childNodes[g];
          if (v && v.getBoundingClientRect().right >= l) {
            var _ = Yr(e.doc, u), T = e.display.gutterSpecs[g];
            return rt(e, i, e, _, T.className, t), Jo(t);
          }
        }
      }
      function Ki(e, t) {
        return ru(e, t, "gutterClick", !0);
      }
      function iu(e, t) {
        Ln(e.display, t) || Wl(e, t) || ct(e, t, "contextmenu") || Qt || e.display.input.onContextMenu(t);
      }
      function Wl(e, t) {
        return fn(e, "gutterContextMenu") ? ru(e, t, "gutterContextMenu", !1) : !1;
      }
      function Bl(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Fi(e);
      }
      var pr = { toString: function() {
        return "CodeMirror.Init";
      } }, Pa = {}, Bo = {};
      function Hl(e) {
        var t = e.optionHandlers;
        function i(r, l, u, f) {
          e.defaults[r] = l, u && (t[r] = f ? function(d, g, v) {
            v != pr && u(d, g, v);
          } : u);
        }
        e.defineOption = i, e.Init = pr, i("value", "", function(r, l) {
          return r.setValue(l);
        }, !0), i("mode", null, function(r, l) {
          r.doc.modeOption = l, Cl(r);
        }, !0), i("indentUnit", 2, Cl, !0), i("indentWithTabs", !1), i("smartIndent", !0), i("tabSize", 4, function(r) {
          Co(r), Fi(r), kt(r);
        }, !0), i("lineSeparator", null, function(r, l) {
          if (r.doc.lineSep = l, !!l) {
            var u = [], f = r.doc.first;
            r.doc.iter(function(g) {
              for (var v = 0; ; ) {
                var _ = g.text.indexOf(l, v);
                if (_ == -1)
                  break;
                v = _ + l.length, u.push(q(f, _));
              }
              f++;
            });
            for (var d = u.length - 1; d >= 0; d--)
              Hi(r.doc, l, u[d], q(u[d].line, u[d].ch + l.length));
          }
        }), i("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(r, l, u) {
          r.state.specialChars = new RegExp(l.source + (l.test("	") ? "" : "|	"), "g"), u != pr && r.refresh();
        }), i("specialCharPlaceholder", Ef, function(r) {
          return r.refresh();
        }, !0), i("electricChars", !0), i("inputStyle", Ke ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), i("spellcheck", !1, function(r, l) {
          return r.getInputField().spellcheck = l;
        }, !0), i("autocorrect", !1, function(r, l) {
          return r.getInputField().autocorrect = l;
        }, !0), i("autocapitalize", !1, function(r, l) {
          return r.getInputField().autocapitalize = l;
        }, !0), i("rtlMoveVisually", !le), i("wholeLineUpdateBefore", !0), i("theme", "default", function(r) {
          Bl(r), on(r);
        }, !0), i("keyMap", "default", function(r, l, u) {
          var f = Oo(l), d = u != pr && Oo(u);
          d && d.detach && d.detach(r, f), f.attach && f.attach(r, d || null);
        }), i("extraKeys", null), i("configureMouse", null), i("lineWrapping", !1, ou, !0), i("gutters", [], function(r, l) {
          r.display.gutterSpecs = Hs(l, r.options.lineNumbers), on(r);
        }, !0), i("fixedGutter", !0, function(r, l) {
          r.display.gutters.style.left = l ? Ei(r.display) + "px" : "0", r.refresh();
        }, !0), i("coverGutterNextToScrollbar", !1, function(r) {
          return kn(r);
        }, !0), i("scrollbarStyle", "native", function(r) {
          bo(r), kn(r), r.display.scrollbars.setScrollTop(r.doc.scrollTop), r.display.scrollbars.setScrollLeft(r.doc.scrollLeft);
        }, !0), i("lineNumbers", !1, function(r, l) {
          r.display.gutterSpecs = Hs(r.options.gutters, l), on(r);
        }, !0), i("firstLineNumber", 1, on, !0), i("lineNumberFormatter", function(r) {
          return r;
        }, on, !0), i("showCursorWhenSelecting", !1, Er, !0), i("resetSelectionOnContextMenu", !0), i("lineWiseCopyCut", !0), i("pasteLinesPerSelection", !0), i("selectionsMayTouch", !1), i("readOnly", !1, function(r, l) {
          l == "nocursor" && (or(r), r.display.input.blur()), r.display.input.readOnlyChanged(l);
        }), i("screenReaderLabel", null, function(r, l) {
          l = l === "" ? null : l, r.display.input.screenReaderLabelChanged(l);
        }), i("disableInput", !1, function(r, l) {
          l || r.display.input.reset();
        }, !0), i("dragDrop", !0, Ra), i("allowDropFileTypes", null), i("cursorBlinkRate", 530), i("cursorScrollMargin", 0), i("cursorHeight", 1, Er, !0), i("singleCursorHeightPerLine", !0, Er, !0), i("workTime", 100), i("workDelay", 100), i("flattenSpans", !0, Co, !0), i("addModeClass", !1, Co, !0), i("pollInterval", 100), i("undoDepth", 200, function(r, l) {
          return r.doc.history.undoDepth = l;
        }), i("historyEventDelay", 1250), i("viewportMargin", 10, function(r) {
          return r.refresh();
        }, !0), i("maxHighlightLength", 1e4, Co, !0), i("moveInputWithCursor", !0, function(r, l) {
          l || r.display.input.resetPosition();
        }), i("tabindex", null, function(r, l) {
          return r.display.input.getField().tabIndex = l || "";
        }), i("autofocus", null), i("direction", "ltr", function(r, l) {
          return r.doc.setDirection(l);
        }, !0), i("phrases", null);
      }
      function Ra(e, t, i) {
        var r = i && i != pr;
        if (!t != !r) {
          var l = e.display.dragFunctions, u = t ? fe : tn;
          u(e.display.scroller, "dragstart", l.start), u(e.display.scroller, "dragenter", l.enter), u(e.display.scroller, "dragover", l.over), u(e.display.scroller, "dragleave", l.leave), u(e.display.scroller, "drop", l.drop);
        }
      }
      function ou(e) {
        e.options.lineWrapping ? (ne(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Qn(e.display.wrapper, "CodeMirror-wrap"), ll(e)), He(e), kt(e), Fi(e), setTimeout(function() {
          return kn(e);
        }, 100);
      }
      function Qe(e, t) {
        var i = this;
        if (!(this instanceof Qe))
          return new Qe(e, t);
        this.options = t = t ? wt(t) : {}, wt(Pa, t, !1);
        var r = t.value;
        typeof r == "string" ? r = new Kt(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
        var l = new Qe.inputStyles[t.inputStyle](this), u = this.display = new Xf(e, r, l, t);
        u.wrapper.CodeMirror = this, Bl(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), bo(this), this.state = {
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
          highlight: new et(),
          keySeq: null,
          specialChars: null
        }, t.autofocus && !Ke && u.input.focus(), D && P < 11 && setTimeout(function() {
          return i.display.input.reset(!0);
        }, 20), Wa(this), ec(), ii(this), this.curOp.forceUpdate = !0, Lo(this, r), t.autofocus && !Ke || this.hasFocus() ? setTimeout(function() {
          i.hasFocus() && !i.state.focused && ir(i);
        }, 20) : or(this);
        for (var f in Bo)
          Bo.hasOwnProperty(f) && Bo[f](this, t[f], pr);
        ia(this), t.finishInit && t.finishInit(this);
        for (var d = 0; d < En.length; ++d)
          En[d](this);
        oi(this), R && t.lineWrapping && getComputedStyle(u.lineDiv).textRendering == "optimizelegibility" && (u.lineDiv.style.textRendering = "auto");
      }
      Qe.defaults = Pa, Qe.optionHandlers = Bo;
      function Wa(e) {
        var t = e.display;
        fe(t.scroller, "mousedown", je(e, nu)), D && P < 11 ? fe(t.scroller, "dblclick", je(e, function(g) {
          if (!ct(e, g)) {
            var v = jr(e, g);
            if (!(!v || Ki(e, g) || Ln(e.display, g))) {
              qt(g);
              var _ = e.findWordAt(v);
              Ao(e.doc, _.anchor, _.head);
            }
          }
        })) : fe(t.scroller, "dblclick", function(g) {
          return ct(e, g) || qt(g);
        }), fe(t.scroller, "contextmenu", function(g) {
          return iu(e, g);
        }), fe(t.input.getField(), "contextmenu", function(g) {
          t.scroller.contains(g.target) || iu(e, g);
        });
        var i, r = { end: 0 };
        function l() {
          t.activeTouch && (i = setTimeout(function() {
            return t.activeTouch = null;
          }, 1e3), r = t.activeTouch, r.end = +new Date());
        }
        function u(g) {
          if (g.touches.length != 1)
            return !1;
          var v = g.touches[0];
          return v.radiusX <= 1 && v.radiusY <= 1;
        }
        function f(g, v) {
          if (v.left == null)
            return !0;
          var _ = v.left - g.left, T = v.top - g.top;
          return _ * _ + T * T > 20 * 20;
        }
        fe(t.scroller, "touchstart", function(g) {
          if (!ct(e, g) && !u(g) && !Ki(e, g)) {
            t.input.ensurePolled(), clearTimeout(i);
            var v = +new Date();
            t.activeTouch = {
              start: v,
              moved: !1,
              prev: v - r.end <= 300 ? r : null
            }, g.touches.length == 1 && (t.activeTouch.left = g.touches[0].pageX, t.activeTouch.top = g.touches[0].pageY);
          }
        }), fe(t.scroller, "touchmove", function() {
          t.activeTouch && (t.activeTouch.moved = !0);
        }), fe(t.scroller, "touchend", function(g) {
          var v = t.activeTouch;
          if (v && !Ln(t, g) && v.left != null && !v.moved && new Date() - v.start < 300) {
            var _ = e.coordsChar(t.activeTouch, "page"), T;
            !v.prev || f(v, v.prev) ? T = new Re(_, _) : !v.prev.prev || f(v, v.prev.prev) ? T = e.findWordAt(_) : T = new Re(q(_.line, 0), de(e.doc, q(_.line + 1, 0))), e.setSelection(T.anchor, T.head), e.focus(), qt(g);
          }
          l();
        }), fe(t.scroller, "touchcancel", l), fe(t.scroller, "scroll", function() {
          t.scroller.clientHeight && (wo(e, t.scroller.scrollTop), ti(e, t.scroller.scrollLeft, !0), rt(e, "scroll", e));
        }), fe(t.scroller, "mousewheel", function(g) {
          return Mr(e, g);
        }), fe(t.scroller, "DOMMouseScroll", function(g) {
          return Mr(e, g);
        }), fe(t.wrapper, "scroll", function() {
          return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0;
        }), t.dragFunctions = {
          enter: function(g) {
            ct(e, g) || no(g);
          },
          over: function(g) {
            ct(e, g) || (jf(e, g), no(g));
          },
          start: function(g) {
            return Qs(e, g);
          },
          drop: je(e, Ca),
          leave: function(g) {
            ct(e, g) || Il(e);
          }
        };
        var d = t.input.getField();
        fe(d, "keyup", function(g) {
          return eu.call(e, g);
        }), fe(d, "keydown", je(e, Ea)), fe(d, "keypress", je(e, Xt)), fe(d, "focus", function(g) {
          return ir(e, g);
        }), fe(d, "blur", function(g) {
          return or(e, g);
        });
      }
      var En = [];
      Qe.defineInitHook = function(e) {
        return En.push(e);
      };
      function $i(e, t, i, r) {
        var l = e.doc, u;
        i == null && (i = "add"), i == "smart" && (l.mode.indent ? u = Li(e, t).state : i = "prev");
        var f = e.options.tabSize, d = ie(l, t), g = nt(d.text, null, f);
        d.stateAfter && (d.stateAfter = null);
        var v = d.text.match(/^\s*/)[0], _;
        if (!r && !/\S/.test(d.text))
          _ = 0, i = "not";
        else if (i == "smart" && (_ = l.mode.indent(u, d.text.slice(v.length), d.text), _ == zr || _ > 150)) {
          if (!r)
            return;
          i = "prev";
        }
        i == "prev" ? t > l.first ? _ = nt(ie(l, t - 1).text, null, f) : _ = 0 : i == "add" ? _ = g + e.options.indentUnit : i == "subtract" ? _ = g - e.options.indentUnit : typeof i == "number" && (_ = g + i), _ = Math.max(0, _);
        var T = "", O = 0;
        if (e.options.indentWithTabs)
          for (var M = Math.floor(_ / f); M; --M)
            O += f, T += "	";
        if (O < _ && (T += bn(_ - O)), T != v)
          return Hi(l, T, q(t, 0), q(t, v.length), "+input"), d.stateAfter = null, !0;
        for (var B = 0; B < l.sel.ranges.length; B++) {
          var z = l.sel.ranges[B];
          if (z.head.line == t && z.head.ch < v.length) {
            var X = q(t, v.length);
            ko(l, B, new Re(X, X));
            break;
          }
        }
      }
      var gn = null;
      function zl(e) {
        gn = e;
      }
      function Ul(e, t, i, r, l) {
        var u = e.doc;
        e.display.shift = !1, r || (r = u.sel);
        var f = +new Date() - 200, d = l == "paste" || e.state.pasteIncoming > f, g = us(t), v = null;
        if (d && r.ranges.length > 1)
          if (gn && gn.text.join(`
`) == t) {
            if (r.ranges.length % gn.text.length == 0) {
              v = [];
              for (var _ = 0; _ < gn.text.length; _++)
                v.push(u.splitLines(gn.text[_]));
            }
          } else
            g.length == r.ranges.length && e.options.pasteLinesPerSelection && (v = Xo(g, function(Z) {
              return [Z];
            }));
        for (var T = e.curOp.updateInput, O = r.ranges.length - 1; O >= 0; O--) {
          var M = r.ranges[O], B = M.from(), z = M.to();
          M.empty() && (i && i > 0 ? B = q(B.line, B.ch - i) : e.state.overwrite && !d ? z = q(z.line, Math.min(ie(u, z.line).text.length, z.ch + Ne(g).length)) : d && gn && gn.lineWise && gn.text.join(`
`) == g.join(`
`) && (B = z = q(B.line, 0)));
          var X = {
            from: B,
            to: z,
            text: v ? v[O % v.length] : g,
            origin: l || (d ? "paste" : e.state.cutIncoming > f ? "cut" : "+input")
          };
          zn(e.doc, X), dt(e, "inputRead", e, X);
        }
        t && !d && Ha(e, t), Oi(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = T), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
      }
      function Ba(e, t) {
        var i = e.clipboardData && e.clipboardData.getData("Text");
        if (i)
          return e.preventDefault(), !t.isReadOnly() && !t.options.disableInput && t.hasFocus() && m(t, function() {
            return Ul(t, i, 0, null, "paste");
          }), !0;
      }
      function Ha(e, t) {
        if (!(!e.options.electricChars || !e.options.smartIndent))
          for (var i = e.doc.sel, r = i.ranges.length - 1; r >= 0; r--) {
            var l = i.ranges[r];
            if (!(l.head.ch > 100 || r && i.ranges[r - 1].head.line == l.head.line)) {
              var u = e.getModeAt(l.head), f = !1;
              if (u.electricChars) {
                for (var d = 0; d < u.electricChars.length; d++)
                  if (t.indexOf(u.electricChars.charAt(d)) > -1) {
                    f = $i(e, l.head.line, "smart");
                    break;
                  }
              } else
                u.electricInput && u.electricInput.test(ie(e.doc, l.head.line).text.slice(0, l.head.ch)) && (f = $i(e, l.head.line, "smart"));
              f && dt(e, "electricInput", e, l.head.line);
            }
          }
      }
      function Gn(e) {
        for (var t = [], i = [], r = 0; r < e.doc.sel.ranges.length; r++) {
          var l = e.doc.sel.ranges[r].head.line, u = { anchor: q(l, 0), head: q(l + 1, 0) };
          i.push(u), t.push(e.getRange(u.anchor, u.head));
        }
        return { text: t, ranges: i };
      }
      function Ho(e, t, i, r) {
        e.setAttribute("autocorrect", i ? "on" : "off"), e.setAttribute("autocapitalize", r ? "on" : "off"), e.setAttribute("spellcheck", !!t);
      }
      function Gl() {
        var e = ae("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"), t = ae("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return R ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), De && (e.style.border = "1px solid black"), t;
      }
      function lu(e) {
        var t = e.optionHandlers, i = e.helpers = {};
        e.prototype = {
          constructor: e,
          focus: function() {
            Mt(this).focus(), this.display.input.focus();
          },
          setOption: function(r, l) {
            var u = this.options, f = u[r];
            u[r] == l && r != "mode" || (u[r] = l, t.hasOwnProperty(r) && je(this, t[r])(this, l, f), rt(this, "optionChange", this, r));
          },
          getOption: function(r) {
            return this.options[r];
          },
          getDoc: function() {
            return this.doc;
          },
          addKeyMap: function(r, l) {
            this.state.keyMaps[l ? "push" : "unshift"](Oo(r));
          },
          removeKeyMap: function(r) {
            for (var l = this.state.keyMaps, u = 0; u < l.length; ++u)
              if (l[u] == r || l[u].name == r)
                return l.splice(u, 1), !0;
          },
          addOverlay: Ct(function(r, l) {
            var u = r.token ? r : e.getMode(this.options, r);
            if (u.startState)
              throw new Error("Overlays may not be stateful.");
            eo(
              this.state.overlays,
              {
                mode: u,
                modeSpec: r,
                opaque: l && l.opaque,
                priority: l && l.priority || 0
              },
              function(f) {
                return f.priority;
              }
            ), this.state.modeGen++, kt(this);
          }),
          removeOverlay: Ct(function(r) {
            for (var l = this.state.overlays, u = 0; u < l.length; ++u) {
              var f = l[u].modeSpec;
              if (f == r || typeof r == "string" && f.name == r) {
                l.splice(u, 1), this.state.modeGen++, kt(this);
                return;
              }
            }
          }),
          indentLine: Ct(function(r, l, u) {
            typeof l != "string" && typeof l != "number" && (l == null ? l = this.options.smartIndent ? "smart" : "prev" : l = l ? "add" : "subtract"), io(this.doc, r) && $i(this, r, l, u);
          }),
          indentSelection: Ct(function(r) {
            for (var l = this.doc.sel.ranges, u = -1, f = 0; f < l.length; f++) {
              var d = l[f];
              if (d.empty())
                d.head.line > u && ($i(this, d.head.line, r, !0), u = d.head.line, f == this.doc.sel.primIndex && Oi(this));
              else {
                var g = d.from(), v = d.to(), _ = Math.max(u, g.line);
                u = Math.min(this.lastLine(), v.line - (v.ch ? 0 : 1)) + 1;
                for (var T = _; T < u; ++T)
                  $i(this, T, r);
                var O = this.doc.sel.ranges;
                g.ch == 0 && l.length == O.length && O[f].from().ch > 0 && ko(this.doc, f, new Re(g, O[f].to()), en);
              }
            }
          }),
          getTokenAt: function(r, l) {
            return vs(this, r, l);
          },
          getLineTokens: function(r, l) {
            return vs(this, q(r), l, !0);
          },
          getTokenTypeAt: function(r) {
            r = de(this.doc, r);
            var l = Fu(this, ie(this.doc, r.line)), u = 0, f = (l.length - 1) / 2, d = r.ch, g;
            if (d == 0)
              g = l[2];
            else
              for (; ; ) {
                var v = u + f >> 1;
                if ((v ? l[v * 2 - 1] : 0) >= d)
                  f = v;
                else if (l[v * 2 + 1] < d)
                  u = v + 1;
                else {
                  g = l[v * 2 + 2];
                  break;
                }
              }
            var _ = g ? g.indexOf("overlay ") : -1;
            return _ < 0 ? g : _ == 0 ? null : g.slice(0, _ - 1);
          },
          getModeAt: function(r) {
            var l = this.doc.mode;
            return l.innerMode ? e.innerMode(l, this.getTokenAt(r).state).mode : l;
          },
          getHelper: function(r, l) {
            return this.getHelpers(r, l)[0];
          },
          getHelpers: function(r, l) {
            var u = [];
            if (!i.hasOwnProperty(l))
              return u;
            var f = i[l], d = this.getModeAt(r);
            if (typeof d[l] == "string")
              f[d[l]] && u.push(f[d[l]]);
            else if (d[l])
              for (var g = 0; g < d[l].length; g++) {
                var v = f[d[l][g]];
                v && u.push(v);
              }
            else
              d.helperType && f[d.helperType] ? u.push(f[d.helperType]) : f[d.name] && u.push(f[d.name]);
            for (var _ = 0; _ < f._global.length; _++) {
              var T = f._global[_];
              T.pred(d, this) && ke(u, T.val) == -1 && u.push(T.val);
            }
            return u;
          },
          getStateAfter: function(r, l) {
            var u = this.doc;
            return r = ps(u, r == null ? u.first + u.size - 1 : r), Li(this, r + 1, l).state;
          },
          cursorCoords: function(r, l) {
            var u, f = this.doc.sel.primary();
            return r == null ? u = f.head : typeof r == "object" ? u = de(this.doc, r) : u = r ? f.from() : f.to(), I(this, u, l || "page");
          },
          charCoords: function(r, l) {
            return tr(this, de(this.doc, r), l || "page");
          },
          coordsChar: function(r, l) {
            return r = Ju(this, r, l || "page"), te(this, r.left, r.top);
          },
          lineAtHeight: function(r, l) {
            return r = Ju(this, { top: r, left: 0 }, l || "page").top, Yr(this.doc, r + this.display.viewOffset);
          },
          heightAtLine: function(r, l, u) {
            var f = !1, d;
            if (typeof r == "number") {
              var g = this.doc.first + this.doc.size - 1;
              r < this.doc.first ? r = this.doc.first : r > g && (r = g, f = !0), d = ie(this.doc, r);
            } else
              d = r;
            return hl(this, d, { top: 0, left: 0 }, l || "page", u || f).top + (f ? this.doc.height - ht(d) : 0);
          },
          defaultTextHeight: function() {
            return nr(this.display);
          },
          defaultCharWidth: function() {
            return Di(this.display);
          },
          getViewport: function() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          },
          addWidget: function(r, l, u, f, d) {
            var g = this.display;
            r = I(this, de(this.doc, r));
            var v = r.bottom, _ = r.left;
            if (l.style.position = "absolute", l.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(l), g.sizer.appendChild(l), f == "over")
              v = r.top;
            else if (f == "above" || f == "near") {
              var T = Math.max(g.wrapper.clientHeight, this.doc.height), O = Math.max(g.sizer.clientWidth, g.lineSpace.clientWidth);
              (f == "above" || r.bottom + l.offsetHeight > T) && r.top > l.offsetHeight ? v = r.top - l.offsetHeight : r.bottom + l.offsetHeight <= T && (v = r.bottom), _ + l.offsetWidth > O && (_ = O - l.offsetWidth);
            }
            l.style.top = v + "px", l.style.left = l.style.right = "", d == "right" ? (_ = g.sizer.clientWidth - l.offsetWidth, l.style.right = "0px") : (d == "left" ? _ = 0 : d == "middle" && (_ = (g.sizer.clientWidth - l.offsetWidth) / 2), l.style.left = _ + "px"), u && Os(this, { left: _, top: v, right: _ + l.offsetWidth, bottom: v + l.offsetHeight });
          },
          triggerOnKeyDown: Ct(Ea),
          triggerOnKeyPress: Ct(Xt),
          triggerOnKeyUp: eu,
          triggerOnMouseDown: Ct(nu),
          execCommand: function(r) {
            if (ci.hasOwnProperty(r))
              return ci[r].call(null, this);
          },
          triggerElectric: Ct(function(r) {
            Ha(this, r);
          }),
          findPosH: function(r, l, u, f) {
            var d = 1;
            l < 0 && (d = -1, l = -l);
            for (var g = de(this.doc, r), v = 0; v < l && (g = Xi(this.doc, g, d, u, f), !g.hitSide); ++v)
              ;
            return g;
          },
          moveH: Ct(function(r, l) {
            var u = this;
            this.extendSelectionsBy(function(f) {
              return u.display.shift || u.doc.extend || f.empty() ? Xi(u.doc, f.head, r, l, u.options.rtlMoveVisually) : r < 0 ? f.from() : f.to();
            }, Gt);
          }),
          deleteH: Ct(function(r, l) {
            var u = this.doc.sel, f = this.doc;
            u.somethingSelected() ? f.replaceSelection("", null, "+delete") : cr(this, function(d) {
              var g = Xi(f, d.head, r, l, !1);
              return r < 0 ? { from: g, to: d.head } : { from: d.head, to: g };
            });
          }),
          findPosV: function(r, l, u, f) {
            var d = 1, g = f;
            l < 0 && (d = -1, l = -l);
            for (var v = de(this.doc, r), _ = 0; _ < l; ++_) {
              var T = I(this, v, "div");
              if (g == null ? g = T.left : T.left = g, v = hi(this, T, d, u), v.hitSide)
                break;
            }
            return v;
          },
          moveV: Ct(function(r, l) {
            var u = this, f = this.doc, d = [], g = !this.display.shift && !f.extend && f.sel.somethingSelected();
            if (f.extendSelectionsBy(function(_) {
              if (g)
                return r < 0 ? _.from() : _.to();
              var T = I(u, _.head, "div");
              _.goalColumn != null && (T.left = _.goalColumn), d.push(T.left);
              var O = hi(u, T, r, l);
              return l == "page" && _ == f.sel.primary() && xl(u, tr(u, O, "div").top - T.top), O;
            }, Gt), d.length)
              for (var v = 0; v < f.sel.ranges.length; v++)
                f.sel.ranges[v].goalColumn = d[v];
          }),
          findWordAt: function(r) {
            var l = this.doc, u = ie(l, r.line).text, f = r.ch, d = r.ch;
            if (u) {
              var g = this.getHelper(r, "wordChars");
              (r.sticky == "before" || d == u.length) && f ? --f : ++d;
              for (var v = u.charAt(f), _ = wr(v, g) ? function(T) {
                return wr(T, g);
              } : /\s/.test(v) ? function(T) {
                return /\s/.test(T);
              } : function(T) {
                return !/\s/.test(T) && !wr(T);
              }; f > 0 && _(u.charAt(f - 1)); )
                --f;
              for (; d < u.length && _(u.charAt(d)); )
                ++d;
            }
            return new Re(q(r.line, f), q(r.line, d));
          },
          toggleOverwrite: function(r) {
            r != null && r == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? ne(this.display.cursorDiv, "CodeMirror-overwrite") : Qn(this.display.cursorDiv, "CodeMirror-overwrite"), rt(this, "overwriteToggle", this, this.state.overwrite));
          },
          hasFocus: function() {
            return this.display.input.getField() == b(Me(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: Ct(function(r, l) {
            xo(this, r, l);
          }),
          getScrollInfo: function() {
            var r = this.display.scroller;
            return {
              left: r.scrollLeft,
              top: r.scrollTop,
              height: r.scrollHeight - Wn(this) - this.display.barHeight,
              width: r.scrollWidth - Wn(this) - this.display.barWidth,
              clientHeight: ks(this),
              clientWidth: Jr(this)
            };
          },
          scrollIntoView: Ct(function(r, l) {
            r == null ? (r = { from: this.doc.sel.primary().head, to: null }, l == null && (l = this.options.cursorScrollMargin)) : typeof r == "number" ? r = { from: q(r, 0), to: null } : r.from == null && (r = { from: r, to: null }), r.to || (r.to = r.from), r.margin = l || 0, r.from.line != null ? bt(this, r) : ea(this, r.from, r.to, r.margin);
          }),
          setSize: Ct(function(r, l) {
            var u = this, f = function(g) {
              return typeof g == "number" || /^\d+$/.test(String(g)) ? g + "px" : g;
            };
            r != null && (this.display.wrapper.style.width = f(r)), l != null && (this.display.wrapper.style.height = f(l)), this.options.lineWrapping && hn(this);
            var d = this.display.viewFrom;
            this.doc.iter(d, this.display.viewTo, function(g) {
              if (g.widgets) {
                for (var v = 0; v < g.widgets.length; v++)
                  if (g.widgets[v].noHScroll) {
                    Fr(u, d, "widget");
                    break;
                  }
              }
              ++d;
            }), this.curOp.forceUpdate = !0, rt(this, "refresh", this);
          }),
          operation: function(r) {
            return m(this, r);
          },
          startOperation: function() {
            return ii(this);
          },
          endOperation: function() {
            return oi(this);
          },
          refresh: Ct(function() {
            var r = this.display.cachedTextHeight;
            kt(this), this.curOp.forceUpdate = !0, Fi(this), xo(this, this.doc.scrollLeft, this.doc.scrollTop), Fn(this.display), (r == null || Math.abs(r - nr(this.display)) > 0.5 || this.options.lineWrapping) && He(this), rt(this, "refresh", this);
          }),
          swapDoc: Ct(function(r) {
            var l = this.doc;
            return l.cm = null, this.state.selectingText && this.state.selectingText(), Lo(this, r), Fi(this), this.display.input.reset(), xo(this, r.scrollLeft, r.scrollTop), this.curOp.forceScroll = !0, dt(this, "swapDoc", this, l), l;
          }),
          phrase: function(r) {
            var l = this.options.phrases;
            return l && Object.prototype.hasOwnProperty.call(l, r) ? l[r] : r;
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
        }, Si(e), e.registerHelper = function(r, l, u) {
          i.hasOwnProperty(r) || (i[r] = e[r] = { _global: [] }), i[r][l] = u;
        }, e.registerGlobalHelper = function(r, l, u, f) {
          e.registerHelper(r, l, f), i[r]._global.push({ pred: u, val: f });
        };
      }
      function Xi(e, t, i, r, l) {
        var u = t, f = i, d = ie(e, t.line), g = l && e.direction == "rtl" ? -i : i;
        function v() {
          var J = t.line + g;
          return J < e.first || J >= e.first + e.size ? !1 : (t = new q(J, t.ch, t.sticky), d = ie(e, J));
        }
        function _(J) {
          var Y;
          if (r == "codepoint") {
            var j = d.text.charCodeAt(t.ch + (i > 0 ? 0 : -1));
            if (isNaN(j))
              Y = null;
            else {
              var se = i > 0 ? j >= 55296 && j < 56320 : j >= 56320 && j < 57343;
              Y = new q(t.line, Math.max(0, Math.min(d.text.length, t.ch + i * (se ? 2 : 1))), -i);
            }
          } else
            l ? Y = Vs(e.cm, d, t, i) : Y = No(d, t, i);
          if (Y == null)
            if (!J && v())
              t = Pl(l, e.cm, d, t.line, g);
            else
              return !1;
          else
            t = Y;
          return !0;
        }
        if (r == "char" || r == "codepoint")
          _();
        else if (r == "column")
          _(!0);
        else if (r == "word" || r == "group")
          for (var T = null, O = r == "group", M = e.cm && e.cm.getHelper(t, "wordChars"), B = !0; !(i < 0 && !_(!B)); B = !1) {
            var z = d.text.charAt(t.ch) || `
`, X = wr(z, M) ? "w" : O && z == `
` ? "n" : !O || /\s/.test(z) ? null : "p";
            if (O && !B && !X && (X = "s"), T && T != X) {
              i < 0 && (i = 1, _(), t.sticky = "after");
              break;
            }
            if (X && (T = X), i > 0 && !_(!B))
              break;
          }
        var Z = kl(e, t, u, f, !0);
        return el(u, Z) && (Z.hitSide = !0), Z;
      }
      function hi(e, t, i, r) {
        var l = e.doc, u = t.left, f;
        if (r == "page") {
          var d = Math.min(e.display.wrapper.clientHeight, Mt(e).innerHeight || l(e).documentElement.clientHeight), g = Math.max(d - 0.5 * nr(e.display), 3);
          f = (i > 0 ? t.bottom : t.top) + i * g;
        } else
          r == "line" && (f = i > 0 ? t.bottom + 3 : t.top - 3);
        for (var v; v = te(e, u, f), !!v.outside; ) {
          if (i < 0 ? f <= 0 : f >= l.height) {
            v.hitSide = !0;
            break;
          }
          f += i * 5;
        }
        return v;
      }
      var Q = function(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new et(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };
      Q.prototype.init = function(e) {
        var t = this, i = this, r = i.cm, l = i.div = e.lineDiv;
        l.contentEditable = !0, Ho(l, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize);
        function u(d) {
          for (var g = d.target; g; g = g.parentNode) {
            if (g == l)
              return !0;
            if (/\bCodeMirror-(?:line)?widget\b/.test(g.className))
              break;
          }
          return !1;
        }
        fe(l, "paste", function(d) {
          !u(d) || ct(r, d) || Ba(d, r) || P <= 11 && setTimeout(je(r, function() {
            return t.updateFromDOM();
          }), 20);
        }), fe(l, "compositionstart", function(d) {
          t.composing = { data: d.data, done: !1 };
        }), fe(l, "compositionupdate", function(d) {
          t.composing || (t.composing = { data: d.data, done: !1 });
        }), fe(l, "compositionend", function(d) {
          t.composing && (d.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
        }), fe(l, "touchstart", function() {
          return i.forceCompositionEnd();
        }), fe(l, "input", function() {
          t.composing || t.readFromDOMSoon();
        });
        function f(d) {
          if (!(!u(d) || ct(r, d))) {
            if (r.somethingSelected())
              zl({ lineWise: !1, text: r.getSelections() }), d.type == "cut" && r.replaceSelection("", null, "cut");
            else if (r.options.lineWiseCopyCut) {
              var g = Gn(r);
              zl({ lineWise: !0, text: g.text }), d.type == "cut" && r.operation(function() {
                r.setSelections(g.ranges, 0, en), r.replaceSelection("", null, "cut");
              });
            } else
              return;
            if (d.clipboardData) {
              d.clipboardData.clearData();
              var v = gn.text.join(`
`);
              if (d.clipboardData.setData("Text", v), d.clipboardData.getData("Text") == v) {
                d.preventDefault();
                return;
              }
            }
            var _ = Gl(), T = _.firstChild;
            Ho(T), r.display.lineSpace.insertBefore(_, r.display.lineSpace.firstChild), T.value = gn.text.join(`
`);
            var O = b(l.ownerDocument);
            he(T), setTimeout(function() {
              r.display.lineSpace.removeChild(_), O.focus(), O == l && i.showPrimarySelection();
            }, 50);
          }
        }
        fe(l, "copy", f), fe(l, "cut", f);
      }, Q.prototype.screenReaderLabelChanged = function(e) {
        e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label");
      }, Q.prototype.prepareSelection = function() {
        var e = Ms(this.cm, !1);
        return e.focus = b(this.div.ownerDocument) == this.div, e;
      }, Q.prototype.showSelection = function(e, t) {
        !e || !this.cm.display.view.length || ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, Q.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      }, Q.prototype.showPrimarySelection = function() {
        var e = this.getSelection(), t = this.cm, i = t.doc.sel.primary(), r = i.from(), l = i.to();
        if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || l.line < t.display.viewFrom) {
          e.removeAllRanges();
          return;
        }
        var u = Yi(t, e.anchorNode, e.anchorOffset), f = Yi(t, e.focusNode, e.focusOffset);
        if (!(u && !u.bad && f && !f.bad && ge(nl(u, f), r) == 0 && ge(_i(u, f), l) == 0)) {
          var d = t.display.view, g = r.line >= t.display.viewFrom && zo(t, r) || { node: d[0].measure.map[2], offset: 0 }, v = l.line < t.display.viewTo && zo(t, l);
          if (!v) {
            var _ = d[d.length - 1].measure, T = _.maps ? _.maps[_.maps.length - 1] : _.map;
            v = { node: T[T.length - 1], offset: T[T.length - 2] - T[T.length - 3] };
          }
          if (!g || !v) {
            e.removeAllRanges();
            return;
          }
          var O = e.rangeCount && e.getRangeAt(0), M;
          try {
            M = Bt(g.node, g.offset, v.offset, v.node);
          } catch {
          }
          M && (!w && t.state.focused ? (e.collapse(g.node, g.offset), M.collapsed || (e.removeAllRanges(), e.addRange(M))) : (e.removeAllRanges(), e.addRange(M)), O && e.anchorNode == null ? e.addRange(O) : w && this.startGracePeriod()), this.rememberSelection();
        }
      }, Q.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, Q.prototype.showMultipleSelections = function(e) {
        Wt(this.cm.display.cursorDiv, e.cursors), Wt(this.cm.display.selectionDiv, e.selection);
      }, Q.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, Q.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount)
          return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return k(this.div, t);
      }, Q.prototype.focus = function() {
        this.cm.options.readOnly != "nocursor" && ((!this.selectionInEditor() || b(this.div.ownerDocument) != this.div) && this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, Q.prototype.blur = function() {
        this.div.blur();
      }, Q.prototype.getField = function() {
        return this.div;
      }, Q.prototype.supportsTouch = function() {
        return !0;
      }, Q.prototype.receivedFocus = function() {
        var e = this, t = this;
        this.selectionInEditor() ? setTimeout(function() {
          return e.pollSelection();
        }, 20) : m(this.cm, function() {
          return t.cm.curOp.selectionChanged = !0;
        });
        function i() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, i));
        }
        this.polling.set(this.cm.options.pollInterval, i);
      }, Q.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, Q.prototype.pollSelection = function() {
        if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
          var e = this.getSelection(), t = this.cm;
          if (we && V && this.cm.display.gutterSpecs.length && su(e.anchorNode)) {
            this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), this.focus();
            return;
          }
          if (!this.composing) {
            this.rememberSelection();
            var i = Yi(t, e.anchorNode, e.anchorOffset), r = Yi(t, e.focusNode, e.focusOffset);
            i && r && m(t, function() {
              pt(t.doc, Ir(i, r), en), (i.bad || r.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, Q.prototype.pollContent = function() {
        this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e = this.cm, t = e.display, i = e.doc.sel.primary(), r = i.from(), l = i.to();
        if (r.ch == 0 && r.line > e.firstLine() && (r = q(r.line - 1, ie(e.doc, r.line - 1).length)), l.ch == ie(e.doc, l.line).text.length && l.line < e.lastLine() && (l = q(l.line + 1, 0)), r.line < t.viewFrom || l.line > t.viewTo - 1)
          return !1;
        var u, f, d;
        r.line == t.viewFrom || (u = kr(e, r.line)) == 0 ? (f = Be(t.view[0].line), d = t.view[0].node) : (f = Be(t.view[u].line), d = t.view[u - 1].node.nextSibling);
        var g = kr(e, l.line), v, _;
        if (g == t.view.length - 1 ? (v = t.viewTo - 1, _ = t.lineDiv.lastChild) : (v = Be(t.view[g + 1].line) - 1, _ = t.view[g + 1].node.previousSibling), !d)
          return !1;
        for (var T = e.doc.splitLines(ic(e, d, _, f, v)), O = Xr(e.doc, q(f, 0), q(v, ie(e.doc, v).text.length)); T.length > 1 && O.length > 1; )
          if (Ne(T) == Ne(O))
            T.pop(), O.pop(), v--;
          else if (T[0] == O[0])
            T.shift(), O.shift(), f++;
          else
            break;
        for (var M = 0, B = 0, z = T[0], X = O[0], Z = Math.min(z.length, X.length); M < Z && z.charCodeAt(M) == X.charCodeAt(M); )
          ++M;
        for (var J = Ne(T), Y = Ne(O), j = Math.min(
          J.length - (T.length == 1 ? M : 0),
          Y.length - (O.length == 1 ? M : 0)
        ); B < j && J.charCodeAt(J.length - B - 1) == Y.charCodeAt(Y.length - B - 1); )
          ++B;
        if (T.length == 1 && O.length == 1 && f == r.line)
          for (; M && M > r.ch && J.charCodeAt(J.length - B - 1) == Y.charCodeAt(Y.length - B - 1); )
            M--, B++;
        T[T.length - 1] = J.slice(0, J.length - B).replace(/^\u200b+/, ""), T[0] = T[0].slice(M).replace(/\u200b+$/, "");
        var se = q(f, M), oe = q(v, O.length ? Ne(O).length - B : 0);
        if (T.length > 1 || T[0] || ge(se, oe))
          return Hi(e.doc, T, se, oe, "+input"), !0;
      }, Q.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      }, Q.prototype.reset = function() {
        this.forceCompositionEnd();
      }, Q.prototype.forceCompositionEnd = function() {
        !this.composing || (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, Q.prototype.readFromDOMSoon = function() {
        var e = this;
        this.readDOMTimeout == null && (this.readDOMTimeout = setTimeout(function() {
          if (e.readDOMTimeout = null, e.composing)
            if (e.composing.done)
              e.composing = null;
            else
              return;
          e.updateFromDOM();
        }, 80));
      }, Q.prototype.updateFromDOM = function() {
        var e = this;
        (this.cm.isReadOnly() || !this.pollContent()) && m(this.cm, function() {
          return kt(e.cm);
        });
      }, Q.prototype.setUneditable = function(e) {
        e.contentEditable = "false";
      }, Q.prototype.onKeyPress = function(e) {
        e.charCode == 0 || this.composing || (e.preventDefault(), this.cm.isReadOnly() || je(this.cm, Ul)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0));
      }, Q.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String(e != "nocursor");
      }, Q.prototype.onContextMenu = function() {
      }, Q.prototype.resetPosition = function() {
      }, Q.prototype.needsContentAttribute = !0;
      function zo(e, t) {
        var i = Fs(e, t.line);
        if (!i || i.hidden)
          return null;
        var r = ie(e.doc, t.line), l = Xu(i, r, t.line), u = Sn(r, e.doc.direction), f = "left";
        if (u) {
          var d = Kr(u, t.ch);
          f = d % 2 ? "right" : "left";
        }
        var g = vo(l.map, t.ch, f);
        return g.offset = g.collapse == "right" ? g.end : g.start, g;
      }
      function su(e) {
        for (var t = e; t; t = t.parentNode)
          if (/CodeMirror-gutter-wrapper/.test(t.className))
            return !0;
        return !1;
      }
      function vn(e, t) {
        return t && (e.bad = !0), e;
      }
      function ic(e, t, i, r, l) {
        var u = "", f = !1, d = e.doc.lineSeparator(), g = !1;
        function v(M) {
          return function(B) {
            return B.id == M;
          };
        }
        function _() {
          f && (u += d, g && (u += d), f = g = !1);
        }
        function T(M) {
          M && (_(), u += M);
        }
        function O(M) {
          if (M.nodeType == 1) {
            var B = M.getAttribute("cm-text");
            if (B) {
              T(B);
              return;
            }
            var z = M.getAttribute("cm-marker"), X;
            if (z) {
              var Z = e.findMarks(q(r, 0), q(l + 1, 0), v(+z));
              Z.length && (X = Z[0].find(0)) && T(Xr(e.doc, X.from, X.to).join(d));
              return;
            }
            if (M.getAttribute("contenteditable") == "false")
              return;
            var J = /^(pre|div|p|li|table|br)$/i.test(M.nodeName);
            if (!/^br$/i.test(M.nodeName) && M.textContent.length == 0)
              return;
            J && _();
            for (var Y = 0; Y < M.childNodes.length; Y++)
              O(M.childNodes[Y]);
            /^(pre|p)$/i.test(M.nodeName) && (g = !0), J && (f = !0);
          } else
            M.nodeType == 3 && T(M.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
        for (; O(t), t != i; )
          t = t.nextSibling, g = !1;
        return u;
      }
      function Yi(e, t, i) {
        var r;
        if (t == e.display.lineDiv) {
          if (r = e.display.lineDiv.childNodes[i], !r)
            return vn(e.clipPos(q(e.display.viewTo - 1)), !0);
          t = null, i = 0;
        } else
          for (r = t; ; r = r.parentNode) {
            if (!r || r == e.display.lineDiv)
              return null;
            if (r.parentNode && r.parentNode == e.display.lineDiv)
              break;
          }
        for (var l = 0; l < e.display.view.length; l++) {
          var u = e.display.view[l];
          if (u.node == r)
            return za(u, t, i);
        }
      }
      function za(e, t, i) {
        var r = e.text.firstChild, l = !1;
        if (!t || !k(r, t))
          return vn(q(Be(e.line), 0), !0);
        if (t == r && (l = !0, t = r.childNodes[i], i = 0, !t)) {
          var u = e.rest ? Ne(e.rest) : e.line;
          return vn(q(Be(u), u.text.length), l);
        }
        var f = t.nodeType == 3 ? t : null, d = t;
        for (!f && t.childNodes.length == 1 && t.firstChild.nodeType == 3 && (f = t.firstChild, i && (i = f.nodeValue.length)); d.parentNode != r; )
          d = d.parentNode;
        var g = e.measure, v = g.maps;
        function _(X, Z, J) {
          for (var Y = -1; Y < (v ? v.length : 0); Y++)
            for (var j = Y < 0 ? g.map : v[Y], se = 0; se < j.length; se += 3) {
              var oe = j[se + 2];
              if (oe == X || oe == Z) {
                var me = Be(Y < 0 ? e.line : e.rest[Y]), Ue = j[se] + J;
                return (J < 0 || oe != X) && (Ue = j[se + (J ? 1 : 0)]), q(me, Ue);
              }
            }
        }
        var T = _(f, d, i);
        if (T)
          return vn(T, l);
        for (var O = d.nextSibling, M = f ? f.nodeValue.length - i : 0; O; O = O.nextSibling) {
          if (T = _(O, O.firstChild, 0), T)
            return vn(q(T.line, T.ch - M), l);
          M += O.textContent.length;
        }
        for (var B = d.previousSibling, z = i; B; B = B.previousSibling) {
          if (T = _(B, B.firstChild, -1), T)
            return vn(q(T.line, T.ch + z), l);
          z += B.textContent.length;
        }
      }
      var Fe = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new et(), this.hasSelection = !1, this.composing = null, this.resetting = !1;
      };
      Fe.prototype.init = function(e) {
        var t = this, i = this, r = this.cm;
        this.createField(e);
        var l = this.textarea;
        e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), De && (l.style.width = "0px"), fe(l, "input", function() {
          D && P >= 9 && t.hasSelection && (t.hasSelection = null), i.poll();
        }), fe(l, "paste", function(f) {
          ct(r, f) || Ba(f, r) || (r.state.pasteIncoming = +new Date(), i.fastPoll());
        });
        function u(f) {
          if (!ct(r, f)) {
            if (r.somethingSelected())
              zl({ lineWise: !1, text: r.getSelections() });
            else if (r.options.lineWiseCopyCut) {
              var d = Gn(r);
              zl({ lineWise: !0, text: d.text }), f.type == "cut" ? r.setSelections(d.ranges, null, en) : (i.prevInput = "", l.value = d.text.join(`
`), he(l));
            } else
              return;
            f.type == "cut" && (r.state.cutIncoming = +new Date());
          }
        }
        fe(l, "cut", u), fe(l, "copy", u), fe(e.scroller, "paste", function(f) {
          if (!(Ln(e, f) || ct(r, f))) {
            if (!l.dispatchEvent) {
              r.state.pasteIncoming = +new Date(), i.focus();
              return;
            }
            var d = new Event("paste");
            d.clipboardData = f.clipboardData, l.dispatchEvent(d);
          }
        }), fe(e.lineSpace, "selectstart", function(f) {
          Ln(e, f) || qt(f);
        }), fe(l, "compositionstart", function() {
          var f = r.getCursor("from");
          i.composing && i.composing.range.clear(), i.composing = {
            start: f,
            range: r.markText(f, r.getCursor("to"), { className: "CodeMirror-composing" })
          };
        }), fe(l, "compositionend", function() {
          i.composing && (i.poll(), i.composing.range.clear(), i.composing = null);
        });
      }, Fe.prototype.createField = function(e) {
        this.wrapper = Gl(), this.textarea = this.wrapper.firstChild;
        var t = this.cm.options;
        Ho(this.textarea, t.spellcheck, t.autocorrect, t.autocapitalize);
      }, Fe.prototype.screenReaderLabelChanged = function(e) {
        e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label");
      }, Fe.prototype.prepareSelection = function() {
        var e = this.cm, t = e.display, i = e.doc, r = Ms(e);
        if (e.options.moveInputWithCursor) {
          var l = I(e, i.sel.primary().head, "div"), u = t.wrapper.getBoundingClientRect(), f = t.lineDiv.getBoundingClientRect();
          r.teTop = Math.max(0, Math.min(
            t.wrapper.clientHeight - 10,
            l.top + f.top - u.top
          )), r.teLeft = Math.max(0, Math.min(
            t.wrapper.clientWidth - 10,
            l.left + f.left - u.left
          ));
        }
        return r;
      }, Fe.prototype.showSelection = function(e) {
        var t = this.cm, i = t.display;
        Wt(i.cursorDiv, e.cursors), Wt(i.selectionDiv, e.selection), e.teTop != null && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, Fe.prototype.reset = function(e) {
        if (!(this.contextMenuPending || this.composing && e)) {
          var t = this.cm;
          if (this.resetting = !0, t.somethingSelected()) {
            this.prevInput = "";
            var i = t.getSelection();
            this.textarea.value = i, t.state.focused && he(this.textarea), D && P >= 9 && (this.hasSelection = i);
          } else
            e || (this.prevInput = this.textarea.value = "", D && P >= 9 && (this.hasSelection = null));
          this.resetting = !1;
        }
      }, Fe.prototype.getField = function() {
        return this.textarea;
      }, Fe.prototype.supportsTouch = function() {
        return !1;
      }, Fe.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!Ke || b(this.textarea.ownerDocument) != this.textarea))
          try {
            this.textarea.focus();
          } catch {
          }
      }, Fe.prototype.blur = function() {
        this.textarea.blur();
      }, Fe.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, Fe.prototype.receivedFocus = function() {
        this.slowPoll();
      }, Fe.prototype.slowPoll = function() {
        var e = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, Fe.prototype.fastPoll = function() {
        var e = !1, t = this;
        t.pollingFast = !0;
        function i() {
          var r = t.poll();
          !r && !e ? (e = !0, t.polling.set(60, i)) : (t.pollingFast = !1, t.slowPoll());
        }
        t.polling.set(20, i);
      }, Fe.prototype.poll = function() {
        var e = this, t = this.cm, i = this.textarea, r = this.prevInput;
        if (this.contextMenuPending || this.resetting || !t.state.focused || yf(i) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq)
          return !1;
        var l = i.value;
        if (l == r && !t.somethingSelected())
          return !1;
        if (D && P >= 9 && this.hasSelection === l || Te && /[\uf700-\uf7ff]/.test(l))
          return t.display.input.reset(), !1;
        if (t.doc.sel == t.display.selForContextMenu) {
          var u = l.charCodeAt(0);
          if (u == 8203 && !r && (r = "\u200B"), u == 8666)
            return this.reset(), this.cm.execCommand("undo");
        }
        for (var f = 0, d = Math.min(r.length, l.length); f < d && r.charCodeAt(f) == l.charCodeAt(f); )
          ++f;
        return m(t, function() {
          Ul(
            t,
            l.slice(f),
            r.length - f,
            null,
            e.composing ? "*compose" : null
          ), l.length > 1e3 || l.indexOf(`
`) > -1 ? i.value = e.prevInput = "" : e.prevInput = l, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(
            e.composing.start,
            t.getCursor("to"),
            { className: "CodeMirror-composing" }
          ));
        }), !0;
      }, Fe.prototype.ensurePolled = function() {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, Fe.prototype.onKeyPress = function() {
        D && P >= 9 && (this.hasSelection = null), this.fastPoll();
      }, Fe.prototype.onContextMenu = function(e) {
        var t = this, i = t.cm, r = i.display, l = t.textarea;
        t.contextMenuPending && t.contextMenuPending();
        var u = jr(i, e), f = r.scroller.scrollTop;
        if (!u || ce)
          return;
        var d = i.options.resetSelectionOnContextMenu;
        d && i.doc.sel.contains(u) == -1 && je(i, pt)(i.doc, Ir(u), en);
        var g = l.style.cssText, v = t.wrapper.style.cssText, _ = t.wrapper.offsetParent.getBoundingClientRect();
        t.wrapper.style.cssText = "position: static", l.style.cssText = `position: absolute; width: 30px; height: 30px;
      top: ` + (e.clientY - _.top - 5) + "px; left: " + (e.clientX - _.left - 5) + `px;
      z-index: 1000; background: ` + (D ? "rgba(255, 255, 255, .05)" : "transparent") + `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;
        var T;
        R && (T = l.ownerDocument.defaultView.scrollY), r.input.focus(), R && l.ownerDocument.defaultView.scrollTo(null, T), r.input.reset(), i.somethingSelected() || (l.value = t.prevInput = " "), t.contextMenuPending = M, r.selForContextMenu = i.doc.sel, clearTimeout(r.detectingSelectAll);
        function O() {
          if (l.selectionStart != null) {
            var z = i.somethingSelected(), X = "\u200B" + (z ? l.value : "");
            l.value = "\u21DA", l.value = X, t.prevInput = z ? "" : "\u200B", l.selectionStart = 1, l.selectionEnd = X.length, r.selForContextMenu = i.doc.sel;
          }
        }
        function M() {
          if (t.contextMenuPending == M && (t.contextMenuPending = !1, t.wrapper.style.cssText = v, l.style.cssText = g, D && P < 9 && r.scrollbars.setScrollTop(r.scroller.scrollTop = f), l.selectionStart != null)) {
            (!D || D && P < 9) && O();
            var z = 0, X = function() {
              r.selForContextMenu == i.doc.sel && l.selectionStart == 0 && l.selectionEnd > 0 && t.prevInput == "\u200B" ? je(i, Fl)(i) : z++ < 10 ? r.detectingSelectAll = setTimeout(X, 500) : (r.selForContextMenu = null, r.input.reset());
            };
            r.detectingSelectAll = setTimeout(X, 200);
          }
        }
        if (D && P >= 9 && O(), Qt) {
          no(e);
          var B = function() {
            tn(window, "mouseup", B), setTimeout(M, 20);
          };
          fe(window, "mouseup", B);
        } else
          setTimeout(M, 50);
      }, Fe.prototype.readOnlyChanged = function(e) {
        e || this.reset(), this.textarea.disabled = e == "nocursor", this.textarea.readOnly = !!e;
      }, Fe.prototype.setUneditable = function() {
      }, Fe.prototype.needsContentAttribute = !1;
      function oc(e, t) {
        if (t = t ? wt(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), t.autofocus == null) {
          var i = b(e.ownerDocument);
          t.autofocus = i == e || e.getAttribute("autofocus") != null && i == document.body;
        }
        function r() {
          e.value = d.getValue();
        }
        var l;
        if (e.form && (fe(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
          var u = e.form;
          l = u.submit;
          try {
            var f = u.submit = function() {
              r(), u.submit = l, u.submit(), u.submit = f;
            };
          } catch {
          }
        }
        t.finishInit = function(g) {
          g.save = r, g.getTextArea = function() {
            return e;
          }, g.toTextArea = function() {
            g.toTextArea = isNaN, r(), e.parentNode.removeChild(g.getWrapperElement()), e.style.display = "", e.form && (tn(e.form, "submit", r), !t.leaveSubmitMethodAlone && typeof e.form.submit == "function" && (e.form.submit = l));
          };
        }, e.style.display = "none";
        var d = Qe(
          function(g) {
            return e.parentNode.insertBefore(g, e.nextSibling);
          },
          t
        );
        return d;
      }
      function lc(e) {
        e.off = tn, e.on = fe, e.wheelEventPixels = Yf, e.Doc = Kt, e.splitLines = us, e.countColumn = nt, e.findColumn = Ur, e.isWordChar = Vl, e.Pass = zr, e.signal = rt, e.Line = Zr, e.changeEnd = Or, e.scrollbarModel = Pi, e.Pos = q, e.cmpPos = ge, e.modes = fs, e.mimeModes = $r, e.resolveMode = Vo, e.getMode = cs, e.modeExtensions = Ci, e.extendMode = Sf, e.copyState = Rn, e.startState = ro, e.innerMode = hs, e.commands = ci, e.keyMap = pn, e.keyName = Ol, e.isModifierKey = Jt, e.lookupKey = fi, e.normalizeKeyMap = Ta, e.StringStream = it, e.SharedTextMarker = Pr, e.TextMarker = ar, e.LineWidget = ui, e.e_preventDefault = qt, e.e_stopPropagation = Lu, e.e_stop = no, e.addClass = ne, e.contains = k, e.rmClass = Qn, e.keyNames = Rr;
      }
      Hl(Qe), lu(Qe);
      var Ua = "iter insert remove copy getEditor constructor".split(" ");
      for (var ql in Kt.prototype)
        Kt.prototype.hasOwnProperty(ql) && ke(Ua, ql) < 0 && (Qe.prototype[ql] = function(e) {
          return function() {
            return e.apply(this.doc, arguments);
          };
        }(Kt.prototype[ql]));
      return Si(Kt), Qe.inputStyles = { textarea: Fe, contenteditable: Q }, Qe.defineMode = function(e) {
        !Qe.defaults.mode && e != "null" && (Qe.defaults.mode = e), wf.apply(this, arguments);
      }, Qe.defineMIME = bf, Qe.defineMode("null", function() {
        return { token: function(e) {
          return e.skipToEnd();
        } };
      }), Qe.defineMIME("text/plain", "null"), Qe.defineExtension = function(e, t) {
        Qe.prototype[e] = t;
      }, Qe.defineDocExtension = function(e, t) {
        Kt.prototype[e] = t;
      }, Qe.fromTextArea = oc, lc(Qe), Qe.version = "5.65.12", Qe;
    });
  }(Cc)), Cc.exports;
}
var Nn = td();
(function(c, p) {
  (function(a) {
    a(td());
  })(function(a) {
    function x(L, F, D) {
      this.orientation = F, this.scroll = D, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = L + "-" + F, this.inner = this.node.appendChild(document.createElement("div"));
      var P = this;
      a.on(this.inner, "mousedown", function($) {
        if ($.which != 1)
          return;
        a.e_preventDefault($);
        var V = P.orientation == "horizontal" ? "pageX" : "pageY", pe = $[V], ce = P.pos;
        function Le() {
          a.off(document, "mousemove", We), a.off(document, "mouseup", Le);
        }
        function We(Ze) {
          if (Ze.which != 1)
            return Le();
          P.moveTo(ce + (Ze[V] - pe) * (P.total / P.size));
        }
        a.on(document, "mousemove", We), a.on(document, "mouseup", Le);
      }), a.on(this.node, "click", function($) {
        a.e_preventDefault($);
        var V = P.inner.getBoundingClientRect(), pe;
        P.orientation == "horizontal" ? pe = $.clientX < V.left ? -1 : $.clientX > V.right ? 1 : 0 : pe = $.clientY < V.top ? -1 : $.clientY > V.bottom ? 1 : 0, P.moveTo(P.pos + pe * P.screen);
      });
      function R($) {
        var V = a.wheelEventPixels($)[P.orientation == "horizontal" ? "x" : "y"], pe = P.pos;
        P.moveTo(P.pos + V), P.pos != pe && a.e_preventDefault($);
      }
      a.on(this.node, "mousewheel", R), a.on(this.node, "DOMMouseScroll", R);
    }
    x.prototype.setPos = function(L, F) {
      return L < 0 && (L = 0), L > this.total - this.screen && (L = this.total - this.screen), !F && L == this.pos ? !1 : (this.pos = L, this.inner.style[this.orientation == "horizontal" ? "left" : "top"] = L * (this.size / this.total) + "px", !0);
    }, x.prototype.moveTo = function(L) {
      this.setPos(L) && this.scroll(L, this.orientation);
    };
    var w = 10;
    x.prototype.update = function(L, F, D) {
      var P = this.screen != F || this.total != L || this.size != D;
      P && (this.screen = F, this.total = L, this.size = D);
      var R = this.screen * (this.size / this.total);
      R < w && (this.size -= w - R, R = w), this.inner.style[this.orientation == "horizontal" ? "width" : "height"] = R + "px", this.setPos(this.pos, P);
    };
    function C(L, F, D) {
      this.addClass = L, this.horiz = new x(L, "horizontal", D), F(this.horiz.node), this.vert = new x(L, "vertical", D), F(this.vert.node), this.width = null;
    }
    C.prototype.update = function(L) {
      if (this.width == null) {
        var F = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
        F && (this.width = parseInt(F.height));
      }
      var D = this.width || 0, P = L.scrollWidth > L.clientWidth + 1, R = L.scrollHeight > L.clientHeight + 1;
      return this.vert.node.style.display = R ? "block" : "none", this.horiz.node.style.display = P ? "block" : "none", R && (this.vert.update(
        L.scrollHeight,
        L.clientHeight,
        L.viewHeight - (P ? D : 0)
      ), this.vert.node.style.bottom = P ? D + "px" : "0"), P && (this.horiz.update(
        L.scrollWidth,
        L.clientWidth,
        L.viewWidth - (R ? D : 0) - L.barLeft
      ), this.horiz.node.style.right = R ? D + "px" : "0", this.horiz.node.style.left = L.barLeft + "px"), { right: R ? D : 0, bottom: P ? D : 0 };
    }, C.prototype.setScrollTop = function(L) {
      this.vert.setPos(L);
    }, C.prototype.setScrollLeft = function(L) {
      this.horiz.setPos(L);
    }, C.prototype.clear = function() {
      var L = this.horiz.node.parentNode;
      L.removeChild(this.horiz.node), L.removeChild(this.vert.node);
    }, a.scrollbarModel.simple = function(L, F) {
      return new C("CodeMirror-simplescroll", L, F);
    }, a.scrollbarModel.overlay = function(L, F) {
      return new C("CodeMirror-overlayscroll", L, F);
    };
  });
})();
Nn.defineMode("markdown", (c, p) => {
  const a = Nn.getMode(c, "text/html"), x = a.name === "null";
  function w(k) {
    const b = Nn.getMode(c, k);
    return b.name === "null" ? null : b;
  }
  p.highlightFormatting === void 0 && (p.highlightFormatting = !1), p.maxBlockquoteDepth === void 0 && (p.maxBlockquoteDepth = 0), p.taskLists === void 0 && (p.taskLists = !1), p.strikethrough === void 0 && (p.strikethrough = !1), p.emoji === void 0 && (p.emoji = !1), p.fencedCodeBlockHighlighting === void 0 && (p.fencedCodeBlockHighlighting = !0), p.fencedCodeBlockDefaultMode === void 0 && (p.fencedCodeBlockDefaultMode = "text/plain"), p.xml === void 0 && (p.xml = !0), p.tokenTypeOverrides === void 0 && (p.tokenTypeOverrides = {});
  const C = {
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
  for (const k in C)
    Object.prototype.hasOwnProperty.call(C, k) && p.tokenTypeOverrides[k] && (C[k] = p.tokenTypeOverrides[k]);
  const L = /^([*_-])(?:\s*\1){2,}\s*$/, F = /^(?:[*+-]|^\d+([).]))\s+/, D = /^\[(x| )](?=\s)/i, P = p.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, R = /^ {0,3}(?:=+|-{2,})\s*$/, $ = /^[^ !"#'(*:<>[\\\]_`~]+/, V = /^(~~~+|```+)[\t ]*([\w#+/-]*)[^\n`]*$/, pe = /^\s*\[[^\]]+?]:.*$/, ce = /[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65-]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/, Le = "    ";
  function We(k, b, ne) {
    return b.f = b.inline = ne, ne(k, b);
  }
  function Ze(k, b, ne) {
    return b.f = b.block = ne, ne(k, b);
  }
  function De(k) {
    return !k || !/\S/.test(k.string);
  }
  function we(k) {
    if (k.linkTitle = !1, k.linkHref = !1, k.linkText = !1, k.em = !1, k.strong = !1, k.strikethrough = !1, k.quote = 0, k.indentedCode = !1, k.f === Te) {
      let b = x;
      if (!b) {
        const ne = Nn.innerMode(a, k.htmlState);
        b = ne.mode.name === "xml" && ne.state.tagStart === null && !ne.state.context && ne.state.tokenize.isInText;
      }
      b && (k.f = mt, k.block = Ke, k.htmlState = null);
    }
    return k.trailingSpace = 0, k.trailingSpaceNewLine = !1, k.prevLine = k.thisLine, k.thisLine = { stream: null }, null;
  }
  function Ke(k, b) {
    const ne = k.column() === b.indentation, re = De(b.prevLine.stream), he = b.indentedCode, Me = b.prevLine.hr, Mt = b.list !== !1, xt = (b.listStack[b.listStack.length - 1] || 0) + 3;
    b.indentedCode = !1;
    const wt = b.indentation;
    if (b.indentationDiff === null && (b.indentationDiff = b.indentation, Mt)) {
      for (b.list = null; wt < b.listStack[b.listStack.length - 1]; )
        b.listStack.pop(), b.listStack.length > 0 ? b.indentation = b.listStack[b.listStack.length - 1] : b.list = !1;
      b.list !== !1 && (b.indentationDiff = wt - b.listStack[b.listStack.length - 1]);
    }
    const nt = !re && !Me && !b.prevLine.header && (!Mt || !he) && !b.prevLine.fencedCodeEnd, et = (b.list === !1 || Me || re) && b.indentation <= xt && k.match(L);
    let ke = null;
    if (b.indentationDiff >= 4 && (he || b.prevLine.fencedCodeEnd || b.prevLine.header || re))
      return k.skipToEnd(), b.indentedCode = !0, C.code;
    if (k.eatSpace())
      return null;
    if (ne && b.indentation <= xt && (ke = k.match(P)) && ke[1].length <= 6)
      return b.quote = 0, b.header = ke[1].length, b.thisLine.header = !0, p.highlightFormatting && (b.formatting = "header"), b.f = b.inline, le(b);
    if (b.indentation <= xt && k.eat(">"))
      return (["i", "!", "@", "y", "x"].includes(k.string[1]) && k.string[2] === " " || k.string[1] === " ") && (b.quote = ne ? 1 : b.quote + 1), p.highlightFormatting && (b.formatting = "quote"), k.eatSpace(), le(b);
    if (!et && !b.setext && ne && b.indentation <= xt && (ke = k.match(F))) {
      const qo = ke[1] ? "ol" : "ul";
      return b.indentation = wt + k.current().length, b.list = !0, b.quote = 0, b.listStack.push(b.indentation), b.em = !1, b.strong = !1, b.code = !1, b.strikethrough = !1, p.taskLists && k.match(D, !1) && (b.taskList = !0), b.f = b.inline, p.highlightFormatting && (b.formatting = ["list", `list-${qo}`]), le(b);
    } else {
      if (ne && b.indentation <= xt && (ke = k.match(V, !0)))
        return b.quote = 0, b.fencedEndRE = new RegExp(`${ke[1]}+ *$`), b.localMode = p.fencedCodeBlockHighlighting && w(ke[2] || p.fencedCodeBlockDefaultMode), b.localMode && (b.localState = Nn.startState(b.localMode)), b.f = b.block = Ee, p.highlightFormatting && (b.formatting = "code-block"), b.code = -1, le(b);
      if (b.setext || (!nt || !Mt) && !b.quote && b.list === !1 && !b.code && !et && !pe.test(k.string) && (ke = k.lookAhead(1)) && (ke = ke.match(R)))
        return !b.setext && ke ? (b.header = ke[0].charAt(0) === "=" ? 1 : 2, b.setext = b.header) : (b.header = b.setext, b.setext = 0, k.skipToEnd(), p.highlightFormatting && (b.formatting = "header")), b.thisLine.header = !0, b.f = b.inline, le(b);
      if (et)
        return k.skipToEnd(), b.hr = !0, b.thisLine.hr = !0, C.hr;
      if (k.peek() === "[")
        return We(k, b, Wt);
    }
    return We(k, b, b.inline);
  }
  function Te(k, b) {
    const ne = a.token(k, b.htmlState);
    if (!x) {
      const re = Nn.innerMode(a, b.htmlState);
      (re.mode.name === "xml" && re.state.tagStart === null && !re.state.context && re.state.tokenize.isInText || b.md_inside && k.current().includes(">")) && (b.f = mt, b.block = Ke, b.htmlState = null);
    }
    return ne;
  }
  function Ee(k, b) {
    const ne = b.listStack[b.listStack.length - 1] || 0, re = b.indentation < ne, he = ne + 3;
    if (b.fencedEndRE && b.indentation <= he && (re || k.match(b.fencedEndRE))) {
      p.highlightFormatting && (b.formatting = "code-block");
      let Me;
      return re || (Me = le(b)), b.localMode = b.localState = null, b.block = Ke, b.f = mt, b.fencedEndRE = null, b.code = 0, b.thisLine.fencedCodeEnd = !0, re ? Ze(k, b, b.block) : Me;
    } else
      return b.localMode ? b.localMode.token(k, b.localState) : (k.skipToEnd(), C.code);
  }
  function le(k) {
    const b = [];
    if (k.formatting) {
      b.push(C.formatting), typeof k.formatting == "string" && (k.formatting = [k.formatting]);
      for (let ne = 0; ne < k.formatting.length; ne++)
        b.push(`${C.formatting}-${k.formatting[ne]}`), k.formatting[ne] === "header" && b.push(
          `${C.formatting}-${k.formatting[ne]}-${k.header}`
        ), k.formatting[ne] === "quote" && (!p.maxBlockquoteDepth || p.maxBlockquoteDepth >= k.quote ? b.push(
          `${C.formatting}-${k.formatting[ne]}-${k.quote}`
        ) : b.push("error"));
    }
    if (k.taskOpen)
      return b.push("meta"), b.length > 0 ? b.join(" ") : null;
    if (k.taskClosed)
      return b.push("property"), b.length > 0 ? b.join(" ") : null;
    if (k.linkHref ? b.push(C.linkHref, "url") : (k.strong && b.push(C.strong), k.em && b.push(C.em), k.strikethrough && b.push(C.strikethrough), k.emoji && b.push(C.emoji), k.linkText && b.push(C.linkText), k.code && b.push(C.code), k.image && b.push(C.image), k.imageAltText && b.push(C.imageAltText, "link"), k.imageMarker && b.push(C.imageMarker)), k.header && b.push(C.header, `${C.header}-${k.header}`), k.quote && (b.push(C.quote), !p.maxBlockquoteDepth || p.maxBlockquoteDepth >= k.quote ? b.push(`${C.quote}-${k.quote}`) : b.push(`${C.quote}-${p.maxBlockquoteDepth}`)), k.list !== !1) {
      const ne = (k.listStack.length - 1) % 3;
      ne ? ne === 1 ? b.push(C.list2) : b.push(C.list3) : b.push(C.list1);
    }
    return k.trailingSpaceNewLine ? b.push("trailing-space-new-line") : k.trailingSpace && b.push(`trailing-space-${k.trailingSpace % 2 ? "a" : "b"}`), b.length > 0 ? b.join(" ") : null;
  }
  function yt(k, b) {
    if (k.match($, !0))
      return le(b);
  }
  function mt(k, b) {
    const ne = b.text(k, b);
    if (typeof ne < "u")
      return ne;
    if (b.list)
      return b.list = null, le(b);
    if (b.taskList)
      return k.match(D, !0)[1] === " " ? b.taskOpen = !0 : b.taskClosed = !0, p.highlightFormatting && (b.formatting = "task"), b.taskList = !1, le(b);
    if (b.taskOpen = !1, b.taskClosed = !1, b.header && k.match(/^#+$/, !0))
      return p.highlightFormatting && (b.formatting = "header"), le(b);
    const re = k.next();
    if (b.linkTitle) {
      b.linkTitle = !1;
      let he = re;
      re === "(" && (he = ")"), he = `${he}`.replace(/([()*+.?[\\\]^{|}-])/g, "\\$1");
      const Me = `^\\s*(?:[^${he}\\\\]+|\\\\\\\\|\\\\.)${he}`;
      if (k.match(new RegExp(Me), !0))
        return C.linkHref;
    }
    if (re === "`") {
      const he = b.formatting;
      p.highlightFormatting && (b.formatting = "code"), k.eatWhile("`");
      const Me = k.current().length;
      if (b.code === 0 && (!b.quote || Me === 1))
        return b.code = Me, le(b);
      if (Me === b.code) {
        const Mt = le(b);
        return b.code = 0, Mt;
      } else
        return b.formatting = he, le(b);
    } else if (b.code)
      return le(b);
    if (re === "\\" && (k.next(), p.highlightFormatting)) {
      const he = le(b), Me = `${C.formatting}-escape`;
      return he ? `${he} ${Me}` : Me;
    }
    if (re === "!" && k.match(/\[[^\]]*] ?[([]/, !1))
      return b.imageMarker = !0, b.image = !0, p.highlightFormatting && (b.formatting = "image"), le(b);
    if (re === "[" && b.imageMarker && k.match(/[^\]]*](\(.*?\)| ?\[.*?])/, !1))
      return b.imageMarker = !1, b.imageAltText = !0, p.highlightFormatting && (b.formatting = "image"), le(b);
    if (re === "]" && b.imageAltText) {
      p.highlightFormatting && (b.formatting = "image");
      const he = le(b);
      return b.imageAltText = !1, b.image = !1, b.inline = b.f = Zn, he;
    }
    if (re === "[" && !b.image)
      return b.linkText && k.match(/^.*?]/) || (b.linkText = !0, p.highlightFormatting && (b.formatting = "link")), le(b);
    if (re === "]" && b.linkText) {
      p.highlightFormatting && (b.formatting = "link");
      const he = le(b);
      return b.linkText = !1, b.inline = b.f = k.match(/\(.*?\)| ?\[.*?]/, !1) ? Zn : mt, he;
    }
    if (re === "<" && k.match(/^(https?|ftps?):\/\/(?:[^>\\]|\\.)+>/, !1)) {
      b.f = b.inline = Qt, p.highlightFormatting && (b.formatting = "link");
      let he = le(b);
      return he ? he += " " : he = "", he + C.linkInline;
    }
    if (re === "<" && k.match(/^[^ >\\]+@(?:[^>\\]|\\.)+>/, !1)) {
      b.f = b.inline = Qt, p.highlightFormatting && (b.formatting = "link");
      let he = le(b);
      return he ? he += " " : he = "", he + C.linkEmail;
    }
    if (p.xml && re === "<" && k.match(
      /^(!--|\?|!\[cdata\[|[a-z][\da-z-]*(?:\s+[.:_a-z-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
      !1
    )) {
      const he = k.string.indexOf(">", k.pos);
      if (he !== -1) {
        const Me = k.string.slice(k.start, he);
        /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(Me) && (b.md_inside = !0);
      }
      return k.backUp(1), b.htmlState = Nn.startState(a), Ze(k, b, Te);
    }
    if (p.xml && re === "<" && k.match(/^\/\w*?>/))
      return b.md_inside = !1, "tag";
    if (re === "*" || re === "_") {
      let he = 1;
      const Me = k.pos === 1 ? " " : k.string.charAt(k.pos - 2);
      for (; he < 3 && k.eat(re); )
        he++;
      const Mt = k.peek() || " ", xt = !/\s/.test(Mt) && (!ce.test(Mt) || /\s/.test(Me) || ce.test(Me)), wt = !/\s/.test(Me) && (!ce.test(Me) || /\s/.test(Mt) || ce.test(Mt));
      let nt = null, et = null;
      if (he % 2 && (!b.em && xt && (re === "*" || !wt || ce.test(Me)) ? nt = !0 : b.em === re && wt && (re === "*" || !xt || ce.test(Mt)) && (nt = !1)), he > 1 && (!b.strong && xt && (re === "*" || !wt || ce.test(Me)) ? et = !0 : b.strong === re && wt && (re === "*" || !xt || ce.test(Mt)) && (et = !1)), et != null || nt != null) {
        p.highlightFormatting && (b.formatting = nt == null ? "strong" : et == null ? "em" : "strong em"), nt === !0 && (b.em = re), et === !0 && (b.strong = re);
        const ke = le(b);
        return nt === !1 && (b.em = !1), et === !1 && (b.strong = !1), ke;
      }
    } else if (re === " " && (k.eat("*") || k.eat("_"))) {
      if (k.peek() === " ")
        return le(b);
      k.backUp(1);
    }
    if (p.strikethrough) {
      if (re === "~" && k.eatWhile(re)) {
        if (b.strikethrough) {
          p.highlightFormatting && (b.formatting = "strikethrough");
          const he = le(b);
          return b.strikethrough = !1, he;
        } else if (k.match(/^\S/, !1))
          return b.strikethrough = !0, p.highlightFormatting && (b.formatting = "strikethrough"), le(b);
      } else if (re === " " && k.match("~~", !0)) {
        if (k.peek() === " ")
          return le(b);
        k.backUp(2);
      }
    }
    if (p.emoji && re === ":" && k.match(/^(?:[\d+_a-z][\d+_a-z-]*|-[\d+_a-z][\d+_a-z-]*):/)) {
      b.emoji = !0, p.highlightFormatting && (b.formatting = "emoji");
      const he = le(b);
      return b.emoji = !1, he;
    }
    return re === " " && (k.match(/^ +$/, !1) ? b.trailingSpace++ : b.trailingSpace && (b.trailingSpaceNewLine = !0)), le(b);
  }
  function Qt(k, b) {
    if (k.next() === ">") {
      b.f = b.inline = mt, p.highlightFormatting && (b.formatting = "link");
      let re = le(b);
      return re ? re += " " : re = "", re + C.linkInline;
    }
    return k.match(/^[^>]+/, !0), C.linkInline;
  }
  function Zn(k, b) {
    if (k.eatSpace())
      return null;
    const ne = k.next();
    return ne === "(" || ne === "[" ? (b.f = b.inline = Pn(ne === "(" ? ")" : "]"), p.highlightFormatting && (b.formatting = "link-string"), b.linkHref = !0, le(b)) : "error";
  }
  const Qn = {
    ")": /^(?:[^()\\]|\\.|\((?:[^()\\]|\\.)*\))*?(?=\))/,
    "]": /^(?:[^[\\\]]|\\.|\[(?:[^[\\\]]|\\.)*])*?(?=])/
  };
  function Pn(k) {
    return function(b, ne) {
      if (b.next() === k) {
        ne.f = ne.inline = mt, p.highlightFormatting && (ne.formatting = "link-string");
        const he = le(ne);
        return ne.linkHref = !1, he;
      }
      return b.match(Qn[k]), ne.linkHref = !0, le(ne);
    };
  }
  function Wt(k, b) {
    return k.match(/^([^\\\]]|\\.)*]:/, !1) ? (b.f = ae, k.next(), p.highlightFormatting && (b.formatting = "link"), b.linkText = !0, le(b)) : We(k, b, mt);
  }
  function ae(k, b) {
    if (k.match("]:", !0)) {
      b.f = b.inline = xr, p.highlightFormatting && (b.formatting = "link");
      const ne = le(b);
      return b.linkText = !1, ne;
    }
    return k.match(/^([^\\\]]|\\.)+/, !0), C.linkText;
  }
  function xr(k, b) {
    return k.eatSpace() ? null : (k.match(/^\S+/, !0), k.peek() === void 0 ? b.linkTitle = !0 : k.match(
      /^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/,
      !0
    ), b.f = b.inline = mt, `${C.linkHref} url`);
  }
  const Bt = {
    startState() {
      return {
        f: Ke,
        prevLine: { stream: null },
        thisLine: { stream: null },
        block: Ke,
        htmlState: null,
        indentation: 0,
        inline: mt,
        text: yt,
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
    copyState(k) {
      return {
        f: k.f,
        prevLine: k.prevLine,
        thisLine: k.thisLine,
        block: k.block,
        htmlState: k.htmlState && Nn.copyState(a, k.htmlState),
        indentation: k.indentation,
        localMode: k.localMode,
        localState: k.localMode ? Nn.copyState(k.localMode, k.localState) : null,
        inline: k.inline,
        text: k.text,
        formatting: !1,
        linkText: k.linkText,
        linkTitle: k.linkTitle,
        linkHref: k.linkHref,
        code: k.code,
        em: k.em,
        strong: k.strong,
        strikethrough: k.strikethrough,
        emoji: k.emoji,
        header: k.header,
        setext: k.setext,
        hr: k.hr,
        taskList: k.taskList,
        list: k.list,
        listStack: k.listStack.slice(0),
        quote: k.quote,
        indentedCode: k.indentedCode,
        trailingSpace: k.trailingSpace,
        trailingSpaceNewLine: k.trailingSpaceNewLine,
        md_inside: k.md_inside,
        fencedEndRE: k.fencedEndRE
      };
    },
    token(k, b) {
      if (b.formatting = !1, k !== b.thisLine.stream) {
        if (b.header = 0, b.hr = !1, k.match(/^\s*$/, !0))
          return we(b), null;
        if (b.prevLine = b.thisLine, b.thisLine = { stream: k }, b.taskList = !1, b.trailingSpace = 0, b.trailingSpaceNewLine = !1, !b.localState && (b.f = b.block, b.f !== Te)) {
          const ne = k.match(/^\s*/, !0)[0].replace(/\t/g, Le).length;
          if (b.indentation = ne, b.indentationDiff = null, ne > 0)
            return null;
        }
      }
      return b.f(k, b);
    },
    innerMode(k) {
      return k.block === Te ? { state: k.htmlState, mode: a } : k.localState ? { state: k.localState, mode: k.localMode } : { state: k, mode: Bt };
    },
    indent(k, b, ne) {
      return k.block === Te && a.indent ? a.indent(k.htmlState, b, ne) : k.localState && k.localMode.indent ? k.localMode.indent(k.localState, b, ne) : Nn.Pass;
    },
    blankLine: we,
    getType: le,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",
    closeBrackets: "()[]{}''\"\"``",
    fold: "markdown"
  };
  return Bt;
});
Nn.defineMIME("text/markdown", "markdown");
Nn.defineMIME("text/x-markdown", "markdown");
const iy = "gedi_409d3", oy = "gedi_8863d", ly = "gedi_77ff2", sy = "gedi_7503c", Xn = {
  "out-wrapper": "gedi_0cacc",
  dark: iy,
  "show-preview": "gedi_057f0",
  editor: oy,
  preview: ly,
  toolbar: sy,
  "editor-wrapper": "gedi_a19e0",
  "preview-content": "gedi_0e920"
}, uy = "gedi_56241", ay = "gedi_dc161", fy = "gedi_55c98", mi = {
  "toolbar-wrapper": "gedi_00985",
  "toolbar-item-wrapper": "gedi_2d5fe",
  "toolbar-item": "gedi_f1fa7",
  tooltip: uy,
  active: ay,
  vr: fy
}, cy = "gedi_e6842", hy = "gedi_ad0ba", hu = {
  dropdown: cy,
  open: hy,
  "dropdown-content": "gedi_8d625"
}, dy = /* @__PURE__ */ Jl("<div><div>");
function Ah(c, p, a = !0) {
  if (a)
    c.style.maxHeight = "0", c.classList.remove(hu.open), kh(c, !1), p.classList.remove(mi.active);
  else {
    c.style.maxHeight = "";
    const x = c.scrollHeight;
    c.style.maxHeight = "0", c.classList.add(hu.open), setTimeout(() => {
      c.style.maxHeight = `${x}px`;
    }, 10), p.classList.add(mi.active), kh(c);
  }
}
function kh(c, p = !0) {
  const a = c.previousElementSibling;
  a && (a.style.display = p ? "none" : "");
}
function py(c) {
  let p;
  const a = (x) => x.classList.contains(hu.open);
  return mu(() => {
    p.style.maxHeight = "0", c.trigger.addEventListener("click", () => {
      Ah(p, c.trigger, a(p));
    }), document.addEventListener("click", (x) => {
      const w = x.target;
      c.trigger.contains(w) || Ah(p, c.trigger, !0);
    });
  }), (() => {
    const x = dy(), w = x.firstChild, C = p;
    return typeof C == "function" ? bu(C, x) : p = x, Ji(w, () => c.children), Yn((L) => {
      const F = hu.dropdown, D = hu["dropdown-content"];
      return F !== L._v$ && wn(x, L._v$ = F), D !== L._v$2 && wn(w, L._v$2 = D), L;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), x;
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
const nd = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), af = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Su = Object.freeze({
  ...nd,
  ...af
}), Dc = Object.freeze({
  ...Su,
  body: "",
  hidden: !1
}), gy = Object.freeze({
  width: null,
  height: null
}), rd = Object.freeze({
  ...gy,
  ...af
});
function vy(c, p = 0) {
  const a = c.replace(/^-?[0-9.]*/, "");
  function x(w) {
    for (; w < 0; )
      w += 4;
    return w % 4;
  }
  if (a === "") {
    const w = parseInt(c);
    return isNaN(w) ? 0 : x(w);
  } else if (a !== c) {
    let w = 0;
    switch (a) {
      case "%":
        w = 25;
        break;
      case "deg":
        w = 90;
    }
    if (w) {
      let C = parseFloat(c.slice(0, c.length - a.length));
      return isNaN(C) ? 0 : (C = C / w, C % 1 === 0 ? x(C) : 0);
    }
  }
  return p;
}
const yy = /[\s,]+/;
function my(c, p) {
  p.split(yy).forEach((a) => {
    switch (a.trim()) {
      case "horizontal":
        c.hFlip = !0;
        break;
      case "vertical":
        c.vFlip = !0;
        break;
    }
  });
}
const id = {
  ...rd,
  preserveAspectRatio: ""
};
function Fh(c) {
  const p = {
    ...id
  }, a = (x, w) => c.getAttribute(x) || w;
  return p.width = a("width", null), p.height = a("height", null), p.rotate = vy(a("rotate", "")), my(p, a("flip", "")), p.preserveAspectRatio = a("preserveAspectRatio", a("preserveaspectratio", "")), p;
}
function xy(c, p) {
  for (const a in id)
    if (c[a] !== p[a])
      return !0;
  return !1;
}
const du = /^[a-z0-9]+(-[a-z0-9]+)*$/, Cu = (c, p, a, x = "") => {
  const w = c.split(":");
  if (c.slice(0, 1) === "@") {
    if (w.length < 2 || w.length > 3)
      return null;
    x = w.shift().slice(1);
  }
  if (w.length > 3 || !w.length)
    return null;
  if (w.length > 1) {
    const F = w.pop(), D = w.pop(), P = {
      provider: w.length > 0 ? w[0] : x,
      prefix: D,
      name: F
    };
    return p && !tf(P) ? null : P;
  }
  const C = w[0], L = C.split("-");
  if (L.length > 1) {
    const F = {
      provider: x,
      prefix: L.shift(),
      name: L.join("-")
    };
    return p && !tf(F) ? null : F;
  }
  if (a && x === "") {
    const F = {
      provider: x,
      prefix: "",
      name: C
    };
    return p && !tf(F, a) ? null : F;
  }
  return null;
}, tf = (c, p) => c ? !!((c.provider === "" || c.provider.match(du)) && (p && c.prefix === "" || c.prefix.match(du)) && c.name.match(du)) : !1;
function wy(c, p) {
  const a = {};
  !c.hFlip != !p.hFlip && (a.hFlip = !0), !c.vFlip != !p.vFlip && (a.vFlip = !0);
  const x = ((c.rotate || 0) + (p.rotate || 0)) % 4;
  return x && (a.rotate = x), a;
}
function Dh(c, p) {
  const a = wy(c, p);
  for (const x in Dc)
    x in af ? x in c && !(x in a) && (a[x] = af[x]) : x in p ? a[x] = p[x] : x in c && (a[x] = c[x]);
  return a;
}
function by(c, p) {
  const a = c.icons, x = c.aliases || /* @__PURE__ */ Object.create(null), w = /* @__PURE__ */ Object.create(null);
  function C(L) {
    if (a[L])
      return w[L] = [];
    if (!(L in w)) {
      w[L] = null;
      const F = x[L] && x[L].parent, D = F && C(F);
      D && (w[L] = [F].concat(D));
    }
    return w[L];
  }
  return (p || Object.keys(a).concat(Object.keys(x))).forEach(C), w;
}
function Sy(c, p, a) {
  const x = c.icons, w = c.aliases || /* @__PURE__ */ Object.create(null);
  let C = {};
  function L(F) {
    C = Dh(
      x[F] || w[F],
      C
    );
  }
  return L(p), a.forEach(L), Dh(c, C);
}
function od(c, p) {
  const a = [];
  if (typeof c != "object" || typeof c.icons != "object")
    return a;
  c.not_found instanceof Array && c.not_found.forEach((w) => {
    p(w, null), a.push(w);
  });
  const x = by(c);
  for (const w in x) {
    const C = x[w];
    C && (p(w, Sy(c, w, C)), a.push(w));
  }
  return a;
}
const Cy = {
  provider: "",
  aliases: {},
  not_found: {},
  ...nd
};
function _c(c, p) {
  for (const a in p)
    if (a in c && typeof c[a] != typeof p[a])
      return !1;
  return !0;
}
function ld(c) {
  if (typeof c != "object" || c === null)
    return null;
  const p = c;
  if (typeof p.prefix != "string" || !c.icons || typeof c.icons != "object" || !_c(c, Cy))
    return null;
  const a = p.icons;
  for (const w in a) {
    const C = a[w];
    if (!w.match(du) || typeof C.body != "string" || !_c(
      C,
      Dc
    ))
      return null;
  }
  const x = p.aliases || /* @__PURE__ */ Object.create(null);
  for (const w in x) {
    const C = x[w], L = C.parent;
    if (!w.match(du) || typeof L != "string" || !a[L] && !x[L] || !_c(
      C,
      Dc
    ))
      return null;
  }
  return p;
}
const ff = /* @__PURE__ */ Object.create(null);
function _y(c, p) {
  return {
    provider: c,
    prefix: p,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Vi(c, p) {
  const a = ff[c] || (ff[c] = /* @__PURE__ */ Object.create(null));
  return a[p] || (a[p] = _y(c, p));
}
function Bc(c, p) {
  return ld(p) ? od(p, (a, x) => {
    x ? c.icons[a] = x : c.missing.add(a);
  }) : [];
}
function Ly(c, p, a) {
  try {
    if (typeof a.body == "string")
      return c.icons[p] = { ...a }, !0;
  } catch {
  }
  return !1;
}
function Ty(c, p) {
  let a = [];
  return (typeof c == "string" ? [c] : Object.keys(ff)).forEach((w) => {
    (typeof w == "string" && typeof p == "string" ? [p] : Object.keys(ff[w] || {})).forEach((L) => {
      const F = Vi(w, L);
      a = a.concat(
        Object.keys(F.icons).map(
          (D) => (w !== "" ? "@" + w + ":" : "") + L + ":" + D
        )
      );
    });
  }), a;
}
let gu = !1;
function sd(c) {
  return typeof c == "boolean" && (gu = c), gu;
}
function vu(c) {
  const p = typeof c == "string" ? Cu(c, !0, gu) : c;
  if (p) {
    const a = Vi(p.provider, p.prefix), x = p.name;
    return a.icons[x] || (a.missing.has(x) ? null : void 0);
  }
}
function ud(c, p) {
  const a = Cu(c, !0, gu);
  if (!a)
    return !1;
  const x = Vi(a.provider, a.prefix);
  return Ly(x, a.name, p);
}
function Eh(c, p) {
  if (typeof c != "object")
    return !1;
  if (typeof p != "string" && (p = c.provider || ""), gu && !p && !c.prefix) {
    let w = !1;
    return ld(c) && (c.prefix = "", od(c, (C, L) => {
      L && ud(C, L) && (w = !0);
    })), w;
  }
  const a = c.prefix;
  if (!tf({
    provider: p,
    prefix: a,
    name: "a"
  }))
    return !1;
  const x = Vi(p, a);
  return !!Bc(x, c);
}
function Ay(c) {
  return !!vu(c);
}
function ky(c) {
  const p = vu(c);
  return p ? {
    ...Su,
    ...p
  } : null;
}
function Fy(c) {
  const p = {
    loaded: [],
    missing: [],
    pending: []
  }, a = /* @__PURE__ */ Object.create(null);
  c.sort((w, C) => w.provider !== C.provider ? w.provider.localeCompare(C.provider) : w.prefix !== C.prefix ? w.prefix.localeCompare(C.prefix) : w.name.localeCompare(C.name));
  let x = {
    provider: "",
    prefix: "",
    name: ""
  };
  return c.forEach((w) => {
    if (x.name === w.name && x.prefix === w.prefix && x.provider === w.provider)
      return;
    x = w;
    const C = w.provider, L = w.prefix, F = w.name, D = a[C] || (a[C] = /* @__PURE__ */ Object.create(null)), P = D[L] || (D[L] = Vi(C, L));
    let R;
    F in P.icons ? R = p.loaded : L === "" || P.missing.has(F) ? R = p.missing : R = p.pending;
    const $ = {
      provider: C,
      prefix: L,
      name: F
    };
    R.push($);
  }), p;
}
function ad(c, p) {
  c.forEach((a) => {
    const x = a.loaderCallbacks;
    x && (a.loaderCallbacks = x.filter((w) => w.id !== p));
  });
}
function Dy(c) {
  c.pendingCallbacksFlag || (c.pendingCallbacksFlag = !0, setTimeout(() => {
    c.pendingCallbacksFlag = !1;
    const p = c.loaderCallbacks ? c.loaderCallbacks.slice(0) : [];
    if (!p.length)
      return;
    let a = !1;
    const x = c.provider, w = c.prefix;
    p.forEach((C) => {
      const L = C.icons, F = L.pending.length;
      L.pending = L.pending.filter((D) => {
        if (D.prefix !== w)
          return !0;
        const P = D.name;
        if (c.icons[P])
          L.loaded.push({
            provider: x,
            prefix: w,
            name: P
          });
        else if (c.missing.has(P))
          L.missing.push({
            provider: x,
            prefix: w,
            name: P
          });
        else
          return a = !0, !0;
        return !1;
      }), L.pending.length !== F && (a || ad([c], C.id), C.callback(
        L.loaded.slice(0),
        L.missing.slice(0),
        L.pending.slice(0),
        C.abort
      ));
    });
  }));
}
let Ey = 0;
function My(c, p, a) {
  const x = Ey++, w = ad.bind(null, a, x);
  if (!p.pending.length)
    return w;
  const C = {
    id: x,
    icons: p,
    callback: c,
    abort: w
  };
  return a.forEach((L) => {
    (L.loaderCallbacks || (L.loaderCallbacks = [])).push(C);
  }), w;
}
const Ec = /* @__PURE__ */ Object.create(null);
function Mh(c, p) {
  Ec[c] = p;
}
function Mc(c) {
  return Ec[c] || Ec[""];
}
function Iy(c, p = !0, a = !1) {
  const x = [];
  return c.forEach((w) => {
    const C = typeof w == "string" ? Cu(w, p, a) : w;
    C && x.push(C);
  }), x;
}
var Oy = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Ny(c, p, a, x) {
  const w = c.resources.length, C = c.random ? Math.floor(Math.random() * w) : c.index;
  let L;
  if (c.random) {
    let Ee = c.resources.slice(0);
    for (L = []; Ee.length > 1; ) {
      const le = Math.floor(Math.random() * Ee.length);
      L.push(Ee[le]), Ee = Ee.slice(0, le).concat(Ee.slice(le + 1));
    }
    L = L.concat(Ee);
  } else
    L = c.resources.slice(C).concat(c.resources.slice(0, C));
  const F = Date.now();
  let D = "pending", P = 0, R, $ = null, V = [], pe = [];
  typeof x == "function" && pe.push(x);
  function ce() {
    $ && (clearTimeout($), $ = null);
  }
  function Le() {
    D === "pending" && (D = "aborted"), ce(), V.forEach((Ee) => {
      Ee.status === "pending" && (Ee.status = "aborted");
    }), V = [];
  }
  function We(Ee, le) {
    le && (pe = []), typeof Ee == "function" && pe.push(Ee);
  }
  function Ze() {
    return {
      startTime: F,
      payload: p,
      status: D,
      queriesSent: P,
      queriesPending: V.length,
      subscribe: We,
      abort: Le
    };
  }
  function De() {
    D = "failed", pe.forEach((Ee) => {
      Ee(void 0, R);
    });
  }
  function we() {
    V.forEach((Ee) => {
      Ee.status === "pending" && (Ee.status = "aborted");
    }), V = [];
  }
  function Ke(Ee, le, yt) {
    const mt = le !== "success";
    switch (V = V.filter((Qt) => Qt !== Ee), D) {
      case "pending":
        break;
      case "failed":
        if (mt || !c.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (le === "abort") {
      R = yt, De();
      return;
    }
    if (mt) {
      R = yt, V.length || (L.length ? Te() : De());
      return;
    }
    if (ce(), we(), !c.random) {
      const Qt = c.resources.indexOf(Ee.resource);
      Qt !== -1 && Qt !== c.index && (c.index = Qt);
    }
    D = "completed", pe.forEach((Qt) => {
      Qt(yt);
    });
  }
  function Te() {
    if (D !== "pending")
      return;
    ce();
    const Ee = L.shift();
    if (Ee === void 0) {
      if (V.length) {
        $ = setTimeout(() => {
          ce(), D === "pending" && (we(), De());
        }, c.timeout);
        return;
      }
      De();
      return;
    }
    const le = {
      status: "pending",
      resource: Ee,
      callback: (yt, mt) => {
        Ke(le, yt, mt);
      }
    };
    V.push(le), P++, $ = setTimeout(Te, c.rotate), a(Ee, p, le.callback);
  }
  return setTimeout(Te), Ze;
}
function fd(c) {
  const p = {
    ...Oy,
    ...c
  };
  let a = [];
  function x() {
    a = a.filter((F) => F().status === "pending");
  }
  function w(F, D, P) {
    const R = Ny(
      p,
      F,
      D,
      ($, V) => {
        x(), P && P($, V);
      }
    );
    return a.push(R), R;
  }
  function C(F) {
    return a.find((D) => F(D)) || null;
  }
  return {
    query: w,
    find: C,
    setIndex: (F) => {
      p.index = F;
    },
    getIndex: () => p.index,
    cleanup: x
  };
}
function Hc(c) {
  let p;
  if (typeof c.resources == "string")
    p = [c.resources];
  else if (p = c.resources, !(p instanceof Array) || !p.length)
    return null;
  return {
    resources: p,
    path: c.path || "/",
    maxURL: c.maxURL || 500,
    rotate: c.rotate || 750,
    timeout: c.timeout || 5e3,
    random: c.random === !0,
    index: c.index || 0,
    dataAfterTimeout: c.dataAfterTimeout !== !1
  };
}
const pf = /* @__PURE__ */ Object.create(null), cu = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], nf = [];
for (; cu.length > 0; )
  cu.length === 1 || Math.random() > 0.5 ? nf.push(cu.shift()) : nf.push(cu.pop());
pf[""] = Hc({
  resources: ["https://api.iconify.design"].concat(nf)
});
function Ih(c, p) {
  const a = Hc(p);
  return a === null ? !1 : (pf[c] = a, !0);
}
function gf(c) {
  return pf[c];
}
function Py() {
  return Object.keys(pf);
}
function Oh() {
}
const Lc = /* @__PURE__ */ Object.create(null);
function Ry(c) {
  if (!Lc[c]) {
    const p = gf(c);
    if (!p)
      return;
    const a = fd(p), x = {
      config: p,
      redundancy: a
    };
    Lc[c] = x;
  }
  return Lc[c];
}
function cd(c, p, a) {
  let x, w;
  if (typeof c == "string") {
    const C = Mc(c);
    if (!C)
      return a(void 0, 424), Oh;
    w = C.send;
    const L = Ry(c);
    L && (x = L.redundancy);
  } else {
    const C = Hc(c);
    if (C) {
      x = fd(C);
      const L = c.resources ? c.resources[0] : "", F = Mc(L);
      F && (w = F.send);
    }
  }
  return !x || !w ? (a(void 0, 424), Oh) : x.query(p, w, a)().abort;
}
const Nh = "iconify2", yu = "iconify", hd = yu + "-count", Ph = yu + "-version", dd = 36e5, Wy = 168;
function Ic(c, p) {
  try {
    return c.getItem(p);
  } catch {
  }
}
function zc(c, p, a) {
  try {
    return c.setItem(p, a), !0;
  } catch {
  }
}
function Rh(c, p) {
  try {
    c.removeItem(p);
  } catch {
  }
}
function Oc(c, p) {
  return zc(c, hd, p.toString());
}
function Nc(c) {
  return parseInt(Ic(c, hd)) || 0;
}
const Go = {
  local: !0,
  session: !0
}, pd = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let Uc = !1;
function By(c) {
  Uc = c;
}
let ja = typeof window > "u" ? {} : window;
function gd(c) {
  const p = c + "Storage";
  try {
    if (ja && ja[p] && typeof ja[p].length == "number")
      return ja[p];
  } catch {
  }
  Go[c] = !1;
}
function vd(c, p) {
  const a = gd(c);
  if (!a)
    return;
  const x = Ic(a, Ph);
  if (x !== Nh) {
    if (x) {
      const F = Nc(a);
      for (let D = 0; D < F; D++)
        Rh(a, yu + D.toString());
    }
    zc(a, Ph, Nh), Oc(a, 0);
    return;
  }
  const w = Math.floor(Date.now() / dd) - Wy, C = (F) => {
    const D = yu + F.toString(), P = Ic(a, D);
    if (typeof P == "string") {
      try {
        const R = JSON.parse(P);
        if (typeof R == "object" && typeof R.cached == "number" && R.cached > w && typeof R.provider == "string" && typeof R.data == "object" && typeof R.data.prefix == "string" && p(R, F))
          return !0;
      } catch {
      }
      Rh(a, D);
    }
  };
  let L = Nc(a);
  for (let F = L - 1; F >= 0; F--)
    C(F) || (F === L - 1 ? (L--, Oc(a, L)) : pd[c].add(F));
}
function yd() {
  if (!Uc) {
    By(!0);
    for (const c in Go)
      vd(c, (p) => {
        const a = p.data, x = p.provider, w = a.prefix, C = Vi(
          x,
          w
        );
        if (!Bc(C, a).length)
          return !1;
        const L = a.lastModified || -1;
        return C.lastModifiedCached = C.lastModifiedCached ? Math.min(C.lastModifiedCached, L) : L, !0;
      });
  }
}
function Hy(c, p) {
  const a = c.lastModifiedCached;
  if (a && a >= p)
    return a === p;
  if (c.lastModifiedCached = p, a)
    for (const x in Go)
      vd(x, (w) => {
        const C = w.data;
        return w.provider !== c.provider || C.prefix !== c.prefix || C.lastModified === p;
      });
  return !0;
}
function zy(c, p) {
  Uc || yd();
  function a(x) {
    let w;
    if (!Go[x] || !(w = gd(x)))
      return;
    const C = pd[x];
    let L;
    if (C.size)
      C.delete(L = Array.from(C).shift());
    else if (L = Nc(w), !Oc(w, L + 1))
      return;
    const F = {
      cached: Math.floor(Date.now() / dd),
      provider: c.provider,
      data: p
    };
    return zc(
      w,
      yu + L.toString(),
      JSON.stringify(F)
    );
  }
  p.lastModified && !Hy(c, p.lastModified) || !Object.keys(p.icons).length || (p.not_found && (p = Object.assign({}, p), delete p.not_found), a("local") || a("session"));
}
function Wh() {
}
function Uy(c) {
  c.iconsLoaderFlag || (c.iconsLoaderFlag = !0, setTimeout(() => {
    c.iconsLoaderFlag = !1, Dy(c);
  }));
}
function Gy(c, p) {
  c.iconsToLoad ? c.iconsToLoad = c.iconsToLoad.concat(p).sort() : c.iconsToLoad = p, c.iconsQueueFlag || (c.iconsQueueFlag = !0, setTimeout(() => {
    c.iconsQueueFlag = !1;
    const { provider: a, prefix: x } = c, w = c.iconsToLoad;
    delete c.iconsToLoad;
    let C;
    if (!w || !(C = Mc(a)))
      return;
    C.prepare(a, x, w).forEach((F) => {
      cd(a, F, (D) => {
        if (typeof D != "object")
          F.icons.forEach((P) => {
            c.missing.add(P);
          });
        else
          try {
            const P = Bc(
              c,
              D
            );
            if (!P.length)
              return;
            const R = c.pendingIcons;
            R && P.forEach(($) => {
              R.delete($);
            }), zy(c, D);
          } catch (P) {
            console.error(P);
          }
        Uy(c);
      });
    });
  }));
}
const Gc = (c, p) => {
  const a = Iy(c, !0, sd()), x = Fy(a);
  if (!x.pending.length) {
    let D = !0;
    return p && setTimeout(() => {
      D && p(
        x.loaded,
        x.missing,
        x.pending,
        Wh
      );
    }), () => {
      D = !1;
    };
  }
  const w = /* @__PURE__ */ Object.create(null), C = [];
  let L, F;
  return x.pending.forEach((D) => {
    const { provider: P, prefix: R } = D;
    if (R === F && P === L)
      return;
    L = P, F = R, C.push(Vi(P, R));
    const $ = w[P] || (w[P] = /* @__PURE__ */ Object.create(null));
    $[R] || ($[R] = []);
  }), x.pending.forEach((D) => {
    const { provider: P, prefix: R, name: $ } = D, V = Vi(P, R), pe = V.pendingIcons || (V.pendingIcons = /* @__PURE__ */ new Set());
    pe.has($) || (pe.add($), w[P][R].push($));
  }), C.forEach((D) => {
    const { provider: P, prefix: R } = D;
    w[P][R].length && Gy(D, w[P][R]);
  }), p ? My(p, x, C) : Wh;
}, qy = (c) => new Promise((p, a) => {
  const x = typeof c == "string" ? Cu(c, !0) : c;
  if (!x) {
    a(c);
    return;
  }
  Gc([x || c], (w) => {
    if (w.length && x) {
      const C = vu(x);
      if (C) {
        p({
          ...Su,
          ...C
        });
        return;
      }
    }
    a(c);
  });
});
function Ky(c) {
  try {
    const p = typeof c == "string" ? JSON.parse(c) : c;
    if (typeof p.body == "string")
      return {
        ...p
      };
  } catch {
  }
}
function $y(c, p) {
  const a = typeof c == "string" ? Cu(c, !0, !0) : null;
  if (!a) {
    const C = Ky(c);
    return {
      value: c,
      data: C
    };
  }
  const x = vu(a);
  if (x !== void 0 || !a.prefix)
    return {
      value: c,
      name: a,
      data: x
    };
  const w = Gc([a], () => p(c, a, vu(a)));
  return {
    value: c,
    name: a,
    loading: w
  };
}
function Tc(c) {
  return c.hasAttribute("inline");
}
let md = !1;
try {
  md = navigator.vendor.indexOf("Apple") === 0;
} catch {
}
function Xy(c, p) {
  switch (p) {
    case "svg":
    case "bg":
    case "mask":
      return p;
  }
  return p !== "style" && (md || c.indexOf("<a") === -1) ? "svg" : c.indexOf("currentColor") === -1 ? "bg" : "mask";
}
const Yy = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Zy = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Pc(c, p, a) {
  if (p === 1)
    return c;
  if (a = a || 100, typeof c == "number")
    return Math.ceil(c * p * a) / a;
  if (typeof c != "string")
    return c;
  const x = c.split(Yy);
  if (x === null || !x.length)
    return c;
  const w = [];
  let C = x.shift(), L = Zy.test(C);
  for (; ; ) {
    if (L) {
      const F = parseFloat(C);
      isNaN(F) ? w.push(C) : w.push(Math.ceil(F * p * a) / a);
    } else
      w.push(C);
    if (C = x.shift(), C === void 0)
      return w.join("");
    L = !L;
  }
}
const Qy = (c) => c === "unset" || c === "undefined" || c === "none";
function xd(c, p) {
  const a = {
    ...Su,
    ...c
  }, x = {
    ...rd,
    ...p
  }, w = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let C = a.body;
  [a, x].forEach((ce) => {
    const Le = [], We = ce.hFlip, Ze = ce.vFlip;
    let De = ce.rotate;
    We ? Ze ? De += 2 : (Le.push(
      "translate(" + (w.width + w.left).toString() + " " + (0 - w.top).toString() + ")"
    ), Le.push("scale(-1 1)"), w.top = w.left = 0) : Ze && (Le.push(
      "translate(" + (0 - w.left).toString() + " " + (w.height + w.top).toString() + ")"
    ), Le.push("scale(1 -1)"), w.top = w.left = 0);
    let we;
    switch (De < 0 && (De -= Math.floor(De / 4) * 4), De = De % 4, De) {
      case 1:
        we = w.height / 2 + w.top, Le.unshift(
          "rotate(90 " + we.toString() + " " + we.toString() + ")"
        );
        break;
      case 2:
        Le.unshift(
          "rotate(180 " + (w.width / 2 + w.left).toString() + " " + (w.height / 2 + w.top).toString() + ")"
        );
        break;
      case 3:
        we = w.width / 2 + w.left, Le.unshift(
          "rotate(-90 " + we.toString() + " " + we.toString() + ")"
        );
        break;
    }
    De % 2 === 1 && (w.left !== w.top && (we = w.left, w.left = w.top, w.top = we), w.width !== w.height && (we = w.width, w.width = w.height, w.height = we)), Le.length && (C = '<g transform="' + Le.join(" ") + '">' + C + "</g>");
  });
  const L = x.width, F = x.height, D = w.width, P = w.height;
  let R, $;
  L === null ? ($ = F === null ? "1em" : F === "auto" ? P : F, R = Pc($, D / P)) : (R = L === "auto" ? D : L, $ = F === null ? Pc(R, P / D) : F === "auto" ? P : F);
  const V = {}, pe = (ce, Le) => {
    Qy(Le) || (V[ce] = Le.toString());
  };
  return pe("width", R), pe("height", $), V.viewBox = w.left.toString() + " " + w.top.toString() + " " + D.toString() + " " + P.toString(), {
    attributes: V,
    body: C
  };
}
const Jy = () => {
  let c;
  try {
    if (c = fetch, typeof c == "function")
      return c;
  } catch {
  }
};
let cf = Jy();
function Vy(c) {
  cf = c;
}
function jy() {
  return cf;
}
function e1(c, p) {
  const a = gf(c);
  if (!a)
    return 0;
  let x;
  if (!a.maxURL)
    x = 0;
  else {
    let w = 0;
    a.resources.forEach((L) => {
      w = Math.max(w, L.length);
    });
    const C = p + ".json?icons=";
    x = a.maxURL - w - a.path.length - C.length;
  }
  return x;
}
function t1(c) {
  return c === 404;
}
const n1 = (c, p, a) => {
  const x = [], w = e1(c, p), C = "icons";
  let L = {
    type: C,
    provider: c,
    prefix: p,
    icons: []
  }, F = 0;
  return a.forEach((D, P) => {
    F += D.length + 1, F >= w && P > 0 && (x.push(L), L = {
      type: C,
      provider: c,
      prefix: p,
      icons: []
    }, F = D.length), L.icons.push(D);
  }), x.push(L), x;
};
function r1(c) {
  if (typeof c == "string") {
    const p = gf(c);
    if (p)
      return p.path;
  }
  return "/";
}
const i1 = (c, p, a) => {
  if (!cf) {
    a("abort", 424);
    return;
  }
  let x = r1(p.provider);
  switch (p.type) {
    case "icons": {
      const C = p.prefix, F = p.icons.join(","), D = new URLSearchParams({
        icons: F
      });
      x += C + ".json?" + D.toString();
      break;
    }
    case "custom": {
      const C = p.uri;
      x += C.slice(0, 1) === "/" ? C.slice(1) : C;
      break;
    }
    default:
      a("abort", 400);
      return;
  }
  let w = 503;
  cf(c + x).then((C) => {
    const L = C.status;
    if (L !== 200) {
      setTimeout(() => {
        a(t1(L) ? "abort" : "next", L);
      });
      return;
    }
    return w = 501, C.json();
  }).then((C) => {
    if (typeof C != "object" || C === null) {
      setTimeout(() => {
        C === 404 ? a("abort", C) : a("next", w);
      });
      return;
    }
    setTimeout(() => {
      a("success", C);
    });
  }).catch(() => {
    a("next", w);
  });
}, o1 = {
  prepare: n1,
  send: i1
};
function Bh(c, p) {
  switch (c) {
    case "local":
    case "session":
      Go[c] = p;
      break;
    case "all":
      for (const a in Go)
        Go[a] = p;
      break;
  }
}
const Ac = "data-style";
let wd = "";
function l1(c) {
  wd = c;
}
function Hh(c, p) {
  let a = Array.from(c.childNodes).find((x) => x.hasAttribute && x.hasAttribute(Ac));
  a || (a = document.createElement("style"), a.setAttribute(Ac, Ac), c.appendChild(a)), a.textContent = ":host{display:inline-block;vertical-align:" + (p ? "-0.125em" : "0") + "}span,svg{display:block}" + wd;
}
function bd() {
  Mh("", o1), sd(!0);
  let c;
  try {
    c = window;
  } catch {
  }
  if (c) {
    if (yd(), c.IconifyPreload !== void 0) {
      const a = c.IconifyPreload, x = "Invalid IconifyPreload syntax.";
      typeof a == "object" && a !== null && (a instanceof Array ? a : [a]).forEach((w) => {
        try {
          (typeof w != "object" || w === null || w instanceof Array || typeof w.icons != "object" || typeof w.prefix != "string" || !Eh(w)) && console.error(x);
        } catch {
          console.error(x);
        }
      });
    }
    if (c.IconifyProviders !== void 0) {
      const a = c.IconifyProviders;
      if (typeof a == "object" && a !== null)
        for (const x in a) {
          const w = "IconifyProviders[" + x + "] is invalid.";
          try {
            const C = a[x];
            if (typeof C != "object" || !C || C.resources === void 0)
              continue;
            Ih(x, C) || console.error(w);
          } catch {
            console.error(w);
          }
        }
    }
  }
  return {
    enableCache: (a) => Bh(a, !0),
    disableCache: (a) => Bh(a, !1),
    iconExists: Ay,
    getIcon: ky,
    listIcons: Ty,
    addIcon: ud,
    addCollection: Eh,
    calculateSize: Pc,
    buildIcon: xd,
    loadIcons: Gc,
    loadIcon: qy,
    addAPIProvider: Ih,
    appendCustomStyle: l1,
    _api: {
      getAPIConfig: gf,
      setAPIModule: Mh,
      sendAPIQuery: cd,
      setFetch: Vy,
      getFetch: jy,
      listAPIProviders: Py
    }
  };
}
function Sd(c, p) {
  let a = c.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const x in p)
    a += " " + x + '="' + p[x] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + a + ">" + c + "</svg>";
}
function s1(c) {
  return c.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function u1(c) {
  return 'url("data:image/svg+xml,' + s1(c) + '")';
}
const Rc = {
  "background-color": "currentColor"
}, Cd = {
  "background-color": "transparent"
}, zh = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
}, Uh = {
  "-webkit-mask": Rc,
  mask: Rc,
  background: Cd
};
for (const c in Uh) {
  const p = Uh[c];
  for (const a in zh)
    p[c + "-" + a] = zh[a];
}
function Gh(c) {
  return c ? c + (c.match(/^[-0-9.]+$/) ? "px" : "") : "inherit";
}
function a1(c, p, a) {
  const x = document.createElement("span");
  let w = c.body;
  w.indexOf("<a") !== -1 && (w += "<!-- " + Date.now() + " -->");
  const C = c.attributes, L = Sd(w, {
    ...C,
    width: p.width + "",
    height: p.height + ""
  }), F = u1(L), D = x.style, P = {
    "--svg": F,
    width: Gh(C.width),
    height: Gh(C.height),
    ...a ? Rc : Cd
  };
  for (const R in P)
    D.setProperty(R, P[R]);
  return x;
}
function f1(c) {
  const p = document.createElement("span"), a = c.attributes;
  let x = "";
  return a.width || (x = "width: inherit;"), a.height || (x += "height: inherit;"), x && (a.style = x), p.innerHTML = Sd(c.body, a), p.firstChild;
}
function qh(c, p) {
  const a = p.icon.data, x = p.customisations, w = xd(a, x);
  x.preserveAspectRatio && (w.attributes.preserveAspectRatio = x.preserveAspectRatio);
  const C = p.renderedMode;
  let L;
  switch (C) {
    case "svg":
      L = f1(w);
      break;
    default:
      L = a1(w, {
        ...Su,
        ...a
      }, C === "mask");
  }
  const F = Array.from(c.childNodes).find((D) => {
    const P = D.tagName && D.tagName.toUpperCase();
    return P === "SPAN" || P === "SVG";
  });
  F ? L.tagName === "SPAN" && F.tagName === L.tagName ? F.setAttribute("style", L.getAttribute("style")) : c.replaceChild(L, F) : c.appendChild(L);
}
function Kh(c, p, a) {
  const x = a && (a.rendered ? a : a.lastRender);
  return {
    rendered: !1,
    inline: p,
    icon: c,
    lastRender: x
  };
}
function c1(c = "iconify-icon") {
  let p, a;
  try {
    p = window.customElements, a = window.HTMLElement;
  } catch {
    return;
  }
  if (!p || !a)
    return;
  const x = p.get(c);
  if (x)
    return x;
  const w = [
    "icon",
    "mode",
    "inline",
    "width",
    "height",
    "rotate",
    "flip"
  ], C = class extends a {
    constructor() {
      super();
      Ja(this, "_shadowRoot");
      Ja(this, "_state");
      Ja(this, "_checkQueued", !1);
      const D = this._shadowRoot = this.attachShadow({
        mode: "open"
      }), P = Tc(this);
      Hh(D, P), this._state = Kh({
        value: ""
      }, P), this._queueCheck();
    }
    static get observedAttributes() {
      return w.slice(0);
    }
    attributeChangedCallback(D) {
      if (D === "inline") {
        const P = Tc(this), R = this._state;
        P !== R.inline && (R.inline = P, Hh(this._shadowRoot, P));
      } else
        this._queueCheck();
    }
    get icon() {
      const D = this.getAttribute("icon");
      if (D && D.slice(0, 1) === "{")
        try {
          return JSON.parse(D);
        } catch {
        }
      return D;
    }
    set icon(D) {
      typeof D == "object" && (D = JSON.stringify(D)), this.setAttribute("icon", D);
    }
    get inline() {
      return Tc(this);
    }
    set inline(D) {
      D ? this.setAttribute("inline", "true") : this.removeAttribute("inline");
    }
    restartAnimation() {
      const D = this._state;
      if (D.rendered) {
        const P = this._shadowRoot;
        if (D.renderedMode === "svg")
          try {
            P.lastChild.setCurrentTime(0);
            return;
          } catch {
          }
        qh(P, D);
      }
    }
    get status() {
      const D = this._state;
      return D.rendered ? "rendered" : D.icon.data === null ? "failed" : "loading";
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
      const D = this._state, P = this.getAttribute("icon");
      if (P !== D.icon.value) {
        this._iconChanged(P);
        return;
      }
      if (!D.rendered)
        return;
      const R = this.getAttribute("mode"), $ = Fh(this);
      (D.attrMode !== R || xy(D.customisations, $)) && this._renderIcon(D.icon, $, R);
    }
    _iconChanged(D) {
      const P = $y(D, (R, $, V) => {
        const pe = this._state;
        if (pe.rendered || this.getAttribute("icon") !== R)
          return;
        const ce = {
          value: R,
          name: $,
          data: V
        };
        ce.data ? this._gotIconData(ce) : pe.icon = ce;
      });
      P.data ? this._gotIconData(P) : this._state = Kh(P, this._state.inline, this._state);
    }
    _gotIconData(D) {
      this._checkQueued = !1, this._renderIcon(D, Fh(this), this.getAttribute("mode"));
    }
    _renderIcon(D, P, R) {
      const $ = Xy(D.data.body, R), V = this._state.inline;
      qh(this._shadowRoot, this._state = {
        rendered: !0,
        icon: D,
        inline: V,
        customisations: P,
        attrMode: R,
        renderedMode: $
      });
    }
  };
  w.forEach((F) => {
    F in C.prototype || Object.defineProperty(C.prototype, F, {
      get: function() {
        return this.getAttribute(F);
      },
      set: function(D) {
        D !== null ? this.setAttribute(F, D) : this.removeAttribute(F);
      }
    });
  });
  const L = bd();
  for (const F in L)
    C[F] = C.prototype[F] = L[F];
  return p.define(c, C), C;
}
const h1 = c1() || bd(), { enableCache: R1, disableCache: W1, iconExists: B1, getIcon: H1, listIcons: z1, addIcon: d1, addCollection: U1, calculateSize: G1, buildIcon: q1, loadIcons: K1, loadIcon: $1, addAPIProvider: X1, _api: Y1 } = h1, p1 = /* @__PURE__ */ Jl("<iconify-icon>", !0, !1);
function g1(c) {
  let {
    icon: p,
    mode: a,
    inline: x,
    rotate: w,
    flip: C,
    width: L,
    height: F,
    preserveAspectRatio: D
  } = c;
  return typeof p == "object" && (p = JSON.stringify(p)), (() => {
    const P = p1();
    return mr(P, "icon", p), mr(P, "mode", a), mr(P, "inline", x), mr(P, "rotate", w), mr(P, "flip", C), mr(P, "width", L), mr(P, "height", F), mr(P, "preserveaspectratio", D), ey(P, c, !1, !1), P._$owner = M0(), P;
  })();
}
const v1 = {
  width: 24,
  height: 24,
  body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-4.182 0-7.028-2.5-8.725-4.704Z"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g>'
}, y1 = "gedi_3c34e", m1 = {
  icon: y1
};
d1("solar:eye", v1);
function x1(c) {
  return Vt(g1, {
    get icon() {
      return c.icon;
    },
    width: "1.3em",
    get class() {
      return m1.icon;
    }
  });
}
const w1 = `<ul id="g-panel-emotions-TyUh" class="g-panel-content-emotion"><li>\u{1F600}</li><li>\u{1F603}</li><li>\u{1F604}</li><li>\u{1F601}</li><li>\u{1F606}</li><li>\u{1F605}</li><li>\u{1F602}</li><li>\u{1F923}</li><li>\u{1F60A}</li><li>\u{1F607}</li><li>\u{1F642}</li><li>\u{1F643}</li><li>\u{1F609}</li><li>\u{1F60C}</li><li>\u{1F60D}</li><li>\u{1F618}</li><li>\u{1F617}</li><li>\u{1F619}</li><li>\u{1F61A}</li><li>\u{1F60B}</li><li>\u{1F61B}</li><li>\u{1F61D}</li><li>\u{1F61C}</li><li>\u{1F913}</li><li>\u{1F60E}</li><li>\u{1F60F}</li><li>\u{1F612}</li><li>\u{1F61E}</li><li>\u{1F614}</li><li>\u{1F61F}</li><li>\u{1F615}</li><li>\u{1F641}</li><li>\u{1F623}</li><li>\u{1F616}</li><li>\u{1F62B}</li><li>\u{1F629}</li><li>\u{1F622}</li><li>\u{1F62D}</li><li>\u{1F624}</li><li>\u{1F620}</li><li>\u{1F621}</li><li>\u{1F633}</li><li>\u{1F631}</li><li>\u{1F628}</li><li>\u{1F917}</li><li>\u{1F914}</li><li>\u{1F636}</li><li>\u{1F611}</li><li>\u{1F62C}</li><li>\u{1F644}</li><li>\u{1F62F}</li><li>\u{1F634}</li><li>\u{1F637}</li><li>\u{1F911}</li><li>\u{1F608}</li><li>\u{1F921}</li><li>\u{1F4A9}</li><li>\u{1F47B}</li><li>\u{1F480}</li><li>\u{1F440}</li><li>\u{1F463}</li><li>\u{1F450}</li><li>\u{1F64C}</li><li>\u{1F44F}</li><li>\u{1F91D}</li><li>\u{1F44D}</li><li>\u{1F44E}</li><li>\u{1F44A}</li><li>\u270A</li><li>\u{1F91B}</li><li>\u{1F91C}</li><li>\u{1F91E}</li><li>\u270C\uFE0F</li><li>\u{1F918}</li><li>\u{1F44C}</li><li>\u{1F448}</li><li>\u{1F449}</li><li>\u{1F446}</li><li>\u{1F447}</li><li>\u261D\uFE0F</li><li>\u270B</li><li>\u{1F91A}</li><li>\u{1F590}</li><li>\u{1F596}</li><li>\u{1F44B}</li><li>\u{1F919}</li><li>\u{1F4AA}</li><li>\u{1F595}</li><li>\u270D\uFE0F</li><li>\u{1F64F}</li>
</ul>`, b1 = {
  title: "\u8868\u60C5",
  icon: "solar:emoji-funny-circle-linear",
  menu: {
    innerHTML: w1,
    onMount(c) {
      const p = c.cm, a = c.$element.querySelector(
        "#g-panel-emotions-TyUh"
      );
      a && a.addEventListener("click", (x) => {
        const w = x.target;
        w.tagName === "LI" && (p.replaceSelection(w.textContent || ""), p.refresh(), p.focus());
      });
    }
  }
};
function S1(c, p) {
  c.$element.classList.contains(Xn["show-preview"]) ? (c.$element.classList.remove(Xn["show-preview"]), p.changeTitle("\u9884\u89C8"), p.active(!1)) : (c.$preview.innerHTML = c.getPreview(), c.$element.classList.add(Xn["show-preview"]), p.changeTitle("\u53D6\u6D88\u9884\u89C8"), p.active(!0));
}
const C1 = {
  title: "\u9884\u89C8",
  icon: "solar:eye-linear",
  action: S1
}, _1 = {
  title: "\u56DE\u9000",
  icon: "solar:undo-left-round-linear",
  action(c) {
    const p = c.cm;
    p.undo(), p.refresh(), p.focus();
  }
}, L1 = {
  title: "\u91CD\u505A",
  icon: "solar:undo-right-round-linear",
  action(c) {
    const p = c.cm;
    p.redo(), p.refresh(), p.focus();
  }
}, T1 = {
  title: "\u6E05\u7A7A",
  icon: "solar:eraser-linear",
  action(c) {
    const p = c.cm;
    p.setValue(""), p.refresh(), p.focus();
  }
}, A1 = {
  title: "",
  icon: ""
}, k1 = [
  b1,
  "|",
  _1,
  L1,
  "|",
  T1,
  "|",
  C1
], F1 = /* @__PURE__ */ Jl("<div>");
function D1(c) {
  let p;
  return mu(() => {
    lf(() => {
      p.style.bottom = c.pos[0], p.style.right = c.pos[1];
    });
  }), (() => {
    const a = F1(), x = p;
    return typeof x == "function" ? bu(x, a) : p = a, Ji(a, () => c.content), Yn(() => wn(a, mi.tooltip)), a;
  })();
}
const _d = /* @__PURE__ */ Jl("<div><div>"), Ld = /* @__PURE__ */ Jl("<div>");
function Td(c) {
  const p = c.item;
  let a;
  const [x, w] = Zl(p.title), [C, L] = Zl({
    $element: a,
    active(F) {
      F ? C().$element.classList.add(mi.active) : C().$element.classList.remove(mi.active);
    },
    changeTitle(F) {
      w(F);
    }
  });
  return mu(() => {
    const F = C();
    F.$element = a, L(F);
  }), Vt(Va, {
    get when() {
      return p.title;
    },
    get fallback() {
      return Vt(M1, {});
    },
    get children() {
      const F = _d(), D = F.firstChild, P = a;
      return typeof P == "function" ? bu(P, D) : a = D, D.$$click = () => {
        const R = c.item.action;
        R && c.inst && !c.item.menu && R(c.inst, C());
      }, Ji(D, Vt(x1, {
        get icon() {
          return c.item.icon;
        }
      })), Ji(F, Vt(D1, {
        get content() {
          return x();
        },
        pos: ["-140%", "-50%"]
      }), null), Ji(F, Vt(Va, {
        get when() {
          return p.menu;
        },
        get children() {
          return Vt(py, {
            trigger: a,
            get children() {
              return [Vt(Va, {
                get when() {
                  return pu.exports.isArray(p.menu);
                },
                get children() {
                  return Vt(jh, {
                    get each() {
                      return p.menu;
                    },
                    children: (R) => Vt(Td, {
                      item: R,
                      get inst() {
                        return c.inst;
                      }
                    })
                  });
                }
              }), Vt(Va, {
                get when() {
                  return !pu.exports.isArray(p.menu);
                },
                get children() {
                  return Vt(E1, {
                    get item() {
                      return p.menu;
                    },
                    get inst() {
                      return c.inst;
                    }
                  });
                }
              })];
            }
          });
        }
      }), null), Yn((R) => {
        const $ = mi["toolbar-item-wrapper"], V = mi["toolbar-item"];
        return $ !== R._v$ && wn(F, R._v$ = $), V !== R._v$2 && wn(D, R._v$2 = V), R;
      }, {
        _v$: void 0,
        _v$2: void 0
      }), F;
    }
  });
}
function E1(c) {
  let p;
  return mu(() => {
    p.innerHTML = c.item.innerHTML, c.inst && c.item.onMount(c.inst);
  }), (() => {
    const a = Ld(), x = p;
    return typeof x == "function" ? bu(x, a) : p = a, a;
  })();
}
function M1() {
  return (() => {
    const c = Ld();
    return Yn(() => wn(c, mi.vr)), c;
  })();
}
function I1(c) {
  return (() => {
    const p = _d(), a = p.firstChild;
    return Ji(a, Vt(jh, {
      get each() {
        return c.items || k1;
      },
      children: (x) => (x === "|" && (x = A1), Vt(Td, {
        item: x,
        get inst() {
          return c.inst;
        }
      }))
    })), Yn(() => wn(p, mi["toolbar-wrapper"])), p;
  })();
}
ed(["click"]);
const O1 = /* @__PURE__ */ Jl("<div><div></div><div><div></div><div><div>");
function N1(c) {
  const [p, a] = Zl();
  let x;
  return mu(() => {
    if (!x)
      return;
    const w = x.querySelector(`.${Xn.editor}`), C = x.querySelector(`.${Xn["preview-content"]}`);
    if (w && C) {
      const L = Nn(w, {
        mode: "markdown",
        lineWrapping: !0,
        value: c.value,
        scrollbarStyle: "overlay"
      });
      a({
        cm: L,
        $element: x,
        $editor: w,
        $preview: C,
        getPreview() {
          const D = L.getValue();
          return c.handelPreview ? c.handelPreview(D) : D;
        }
      }), L.on("change", pu.exports.debounce(() => {
        const D = L.getValue();
        c.onChange(D);
      }, 200)), lf(() => {
        c.theme === "dark" ? L.setOption("theme", "blackboard") : L.setOption("theme", "default");
      }), lf(() => {
        L.setValue(c.value), L.refresh(), L.focus();
      });
    }
  }), (() => {
    const w = O1(), C = w.firstChild, L = C.nextSibling, F = L.firstChild, D = F.nextSibling, P = D.firstChild, R = x;
    return typeof R == "function" ? bu(R, w) : x = w, Ji(C, Vt(I1, {
      get inst() {
        return p();
      }
    })), Yn(($) => {
      const V = `${Xn["out-wrapper"]} ${c.theme === "dark" ? Xn.dark : ""}`, pe = Xn.toolbar, ce = Xn["editor-wrapper"], Le = c.height || "300px", We = Xn.editor, Ze = Xn.preview, De = `${Xn["preview-content"]} markdown-body`;
      return V !== $._v$ && wn(w, $._v$ = V), pe !== $._v$2 && wn(C, $._v$2 = pe), ce !== $._v$3 && wn(L, $._v$3 = ce), Le !== $._v$4 && (($._v$4 = Le) != null ? L.style.setProperty("height", Le) : L.style.removeProperty("height")), We !== $._v$5 && wn(F, $._v$5 = We), Ze !== $._v$6 && wn(D, $._v$6 = Ze), De !== $._v$7 && wn(P, $._v$7 = De), $;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0,
      _v$7: void 0
    }), w;
  })();
}
function Z1(c) {
  if (!c.target)
    return;
  const [p, a] = Zl(c.theme), [x, w] = Zl("");
  return Z0(() => Vt(N1, {
    get onChange() {
      return c.onChange;
    },
    get handelPreview() {
      return c.handelPreview;
    },
    get height() {
      return c.height;
    },
    get theme() {
      return p();
    },
    get value() {
      return x();
    }
  }), c.target), {
    setTheme: a,
    setVal: w
  };
}
export {
  Z1 as Editor,
  N1 as MdEditor
};
