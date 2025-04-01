!(function () {
    "use strict";
    function t(t, r) {
        (null == r || r > t.length) && (r = t.length);
        for (var e = 0, o = new Array(r); e < r; e++) o[e] = t[e];
        return o;
    }
    function r(r, e) {
        var o = ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
        if (!o) {
            if (
                Array.isArray(r) ||
                (o = (function (r, e) {
                    if (r) {
                        if ("string" == typeof r) return t(r, e);
                        var o = Object.prototype.toString.call(r).slice(8, -1);
                        return "Object" === o && r.constructor && (o = r.constructor.name), "Map" === o || "Set" === o ? Array.from(r) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? t(r, e) : void 0;
                    }
                })(r)) ||
                (e && r && "number" == typeof r.length)
            ) {
                o && (r = o);
                var n = 0,
                    i = function () {};
                return {
                    s: i,
                    n: function () {
                        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
                    },
                    e: function (t) {
                        throw t;
                    },
                    f: i,
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var a,
            c = !0,
            s = !1;
        return {
            s: function () {
                o = o.call(r);
            },
            n: function () {
                var t = o.next();
                return (c = t.done), t;
            },
            e: function (t) {
                (s = !0), (a = t);
            },
            f: function () {
                try {
                    c || null == o.return || o.return();
                } finally {
                    if (s) throw a;
                }
            },
        };
    }
    var e = [],
        o = "import-map-injector:";
    function n(t) {
        var e,
            o = { imports: {}, scopes: {} },
            n = r(t);
        try {
            for (n.s(); !(e = n.n()).done; ) {
                var i = e.value;
                if (i.imports) for (var a in i.imports) o.imports[a] = i.imports[a];
                if (i.scopes) for (var c in i.scopes) o.scopes[c] = i.scopes[c];
            }
        } catch (t) {
            n.e(t);
        } finally {
            n.f();
        }
        var s = document.createElement("script");
        (s.type = "importmap"), (s.textContent = JSON.stringify(o)), document.head.appendChild(s), window.importMapOverrides && window.importMapOverrides.resetDefaultMap();
    }
    function i(t, r) {
        var e = function () {
            var e = t[o];
            ["/", "./", "../"].some(function (t) {
                return e.startsWith(t);
            }) && (t[o] = new URL(e, r).href);
        };
        for (var o in t) e();
    }
    document.querySelectorAll("script[type=injector-importmap]").forEach(function (t) {
        if (t.src)
            e.push(
                fetch(t.src)
                    .then(function (r) {
                        console.log(r)
                        if (r.ok) {
                            // if ("application/importmap+json" !== r.headers.get("content-type").toLowerCase())
                                // throw Error("".concat(o, " Import map at url '").concat(t.src, "' does not have the required content-type http response header. Must be 'application/importmap+json'"));
                            return r.json();
                        }
                        throw Error("".concat(o, " import map at url '").concat(t.src, "' must respond with a success HTTP status, but responded with HTTP ").concat(r.status, " ").concat(r.statusText));
                    })
                    .then(function (r) {
                        var e;
                        i(null !== (e = r.imports) && void 0 !== e ? e : {}, t.src);
                        var o = function (e) {
                            i(r.scopes[e], t.src),
                                ["/", "./", "../"].some(function (t) {
                                    return e.startsWith(t);
                                }) && ((r.scopes[new URL(e, t.src).href] = r.scopes[e]), delete r.scopes[e]);
                        };
                        for (var n in null !== (a = r.scopes) && void 0 !== a ? a : {}) {
                            var a;
                            o(n);
                        }
                        return r;
                    })
                    .catch(function (r) {
                        throw (console.error("".concat(o, " Error loading import map from URL '").concat(t.src, "'")), r);
                    })
            );
        else {
            if (!(t.textContent.length > 0)) throw Error("".concat(o, ' Script with type "injector-importmap" does not contain an importmap'));
            var r;
            try {
                r = JSON.parse(t.textContent);
            } catch (t) {
                throw (console.error(t), Error("".concat(o, ' A <script type="injector-importmap"> element contains invalid JSON')));
            }
            e.push(r);
        }
    }),
        window.importMapOverrides && (e.push(window.importMapOverrides.getOverrideMap()), e.push(window.importMapOverrides.getOverrideScopes())),
        e.some(function (t) {
            return t instanceof Promise;
        })
            ? (window.importMapInjector = {
                  initPromise: Promise.all(e)
                      .then(function (t) {
                          n(t);
                      })
                      .catch(function (t) {
                          throw (console.error("".concat(o, ": Unable to generate and inject final import map"), t), t);
                      }),
              })
            : (n(e), (window.importMapInjector = { initPromise: Promise.resolve() }));
})();
//# sourceMappingURL=import-map-injector.js.map
