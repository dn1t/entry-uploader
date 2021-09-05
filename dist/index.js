(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/vhtml/dist/vhtml.js
  var require_vhtml = __commonJS({
    "node_modules/vhtml/dist/vhtml.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.vhtml = factory();
      })(exports, function() {
        "use strict";
        var emptyTags = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
        var esc = function esc2(str) {
          return String(str).replace(/[&<>"']/g, function(s) {
            return "&" + map[s] + ";";
          });
        };
        var map = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" };
        var setInnerHTMLAttr = "dangerouslySetInnerHTML";
        var DOMAttributeNames = {
          className: "class",
          htmlFor: "for"
        };
        var sanitized = {};
        function h(name2, attrs) {
          var stack = [], s = "";
          attrs = attrs || {};
          for (var i = arguments.length; i-- > 2; ) {
            stack.push(arguments[i]);
          }
          if (typeof name2 === "function") {
            attrs.children = stack.reverse();
            return name2(attrs);
          }
          if (name2) {
            s += "<" + name2;
            if (attrs)
              for (var _i in attrs) {
                if (attrs[_i] !== false && attrs[_i] != null && _i !== setInnerHTMLAttr) {
                  s += " " + (DOMAttributeNames[_i] ? DOMAttributeNames[_i] : esc(_i)) + '="' + esc(attrs[_i]) + '"';
                }
              }
            s += ">";
          }
          if (emptyTags.indexOf(name2) === -1) {
            if (attrs[setInnerHTMLAttr]) {
              s += attrs[setInnerHTMLAttr].__html;
            } else
              while (stack.length) {
                var child = stack.pop();
                if (child) {
                  if (child.pop) {
                    for (var _i2 = child.length; _i2--; ) {
                      stack.push(child[_i2]);
                    }
                  } else {
                    s += sanitized[child] === true ? child : esc(child);
                  }
                }
              }
            s += name2 ? "</" + name2 + ">" : "";
          }
          sanitized[s] = true;
          return s;
        }
        return h;
      });
    }
  });

  // src/manifest.json
  var manifest_version = 2;
  var name = "entry-uploader";
  var version = "0.1.0";
  var description = "Upload files in entry community.";
  var content_scripts = [
    {
      matches: [
        "https://playentry.org/community/entrystory/*",
        "https://playentry.org/profile/*/community/entrystory*"
      ],
      js: ["index.js"],
      css: ["index.css"],
      run_at: "document_start"
    }
  ];
  var background = {
    scripts: ["background.js"]
  };
  var permissions = ["https://playentry.org/*"];
  var icons = {
    "64": "icons/icon-64.png",
    "128": "icons/icon-128.png",
    "256": "icons/icon-256.png"
  };
  var applications = {
    gecko: {
      id: "entry-uploader@tica.fun"
    }
  };
  var manifest_default = {
    manifest_version,
    name,
    version,
    description,
    content_scripts,
    background,
    permissions,
    icons,
    applications
  };

  // node_modules/htm/dist/htm.module.js
  var n = function(t2, s, r, e) {
    var u;
    s[0] = 0;
    for (var h = 1; h < s.length; h++) {
      var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
      p === 3 ? e[0] = a : p === 4 ? e[1] = Object.assign(e[1] || {}, a) : p === 5 ? (e[1] = e[1] || {})[s[++h]] = a : p === 6 ? e[1][s[++h]] += a + "" : p ? (u = t2.apply(a, n(t2, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
    }
    return e;
  };
  var t = new Map();
  function htm_module_default(s) {
    var r = t.get(this);
    return r || (r = new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n2) {
      for (var t2, s2, r2 = 1, e = "", u = "", h = [0], p = function(n3) {
        r2 === 1 && (n3 || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n3, e) : r2 === 3 && (n3 || e) ? (h.push(3, n3, e), r2 = 2) : r2 === 2 && e === "..." && n3 ? h.push(4, n3, 0) : r2 === 2 && e && !n3 ? h.push(5, 0, true, e) : r2 >= 5 && ((e || !n3 && r2 === 5) && (h.push(r2, 0, e, s2), r2 = 6), n3 && (h.push(r2, n3, 0, s2), r2 = 6)), e = "";
      }, a = 0; a < n2.length; a++) {
        a && (r2 === 1 && p(), p(a));
        for (var l = 0; l < n2[a].length; l++)
          t2 = n2[a][l], r2 === 1 ? t2 === "<" ? (p(), h = [h], r2 = 3) : e += t2 : r2 === 4 ? e === "--" && t2 === ">" ? (r2 = 1, e = "") : e = t2 + e[0] : u ? t2 === u ? u = "" : e += t2 : t2 === '"' || t2 === "'" ? u = t2 : t2 === ">" ? (p(), r2 = 1) : r2 && (t2 === "=" ? (r2 = 5, s2 = e, e = "") : t2 === "/" && (r2 < 5 || n2[a][l + 1] === ">") ? (p(), r2 === 3 && (h = h[0]), r2 = h, (h = h[0]).push(2, 0, r2), r2 = 0) : t2 === " " || t2 === "	" || t2 === "\n" || t2 === "\r" ? (p(), r2 = 2) : e += t2), r2 === 3 && e === "!--" && (r2 = 4, h = h[0]);
      }
      return p(), h;
    }(s)), r), arguments, [])).length > 1 ? r : r[0];
  }

  // src/popup.ts
  var import_vhtml = __toModule(require_vhtml());
  var _a;
  if (document.querySelector(".uploaderPopupContainer") !== null)
    (_a = document.querySelector(".uploaderPopupContainer")) == null ? void 0 : _a.remove();
  var html = htm_module_default.bind(import_vhtml.default);
  var popup = document.createElement("div");
  var isOpen = false;
  var togglePopup = (type) => {
    const open = (() => type === void 0 ? !isOpen : type === "open")();
    if (open)
      document.querySelector(".uploaderPopupContainer").style.display = "flex";
    else
      document.querySelector(".uploaderPopupContainer").style.display = "none";
    isOpen = open;
  };
  popup.className = "uploaderPopupContainer";
  popup.innerHTML = html`<>
  <div class="popupBackground"></div>
  <div class="popup">
    <div class="title">
      파일 선택
      <div class="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
    <div class="tab">
      <div class="item selected">이미지</div>
      <div class="item">파일</div>
    </div>
    <div class="content">
      <input type="file" id="file" style="display: none;" />
      <label for="file">
        <a class="uploadButton">내 컴퓨터에서 선택</a> 
      </label>
      <div class="useUrl">
        <div class="divider" />
        <div class="or">또는</div>
        <div class="divider" />
      </div>
    </div>
  </div>
</>`.toString();
  var _a2;
  (_a2 = popup.querySelector(".popup .title .close")) == null ? void 0 : _a2.addEventListener("click", () => togglePopup("close"));
  Array.from(popup.querySelectorAll(".popup .tab .item")).forEach((el) => el.addEventListener("click", () => {
    var _a3;
    if (!el.classList.contains("selected")) {
      (_a3 = popup.querySelector(".popup .tab .item.selected")) == null ? void 0 : _a3.classList.remove("selected");
      el.classList.add("selected");
    }
  }));
  document.documentElement.insertBefore(popup, document.head);

  // src/index.ts
  var main = () => {
    const buttonContainer = document.querySelector(".css-5aeyry.e1h77j9v3");
    const buttonList = buttonContainer.querySelectorAll(".css-16523bz.e1h77j9v5");
    const templateButton = buttonList[0];
    const info = document.querySelector(".css-1lpaq59.e1h77j9v12 .link");
    if (buttonList.length === 2)
      buttonList[1].remove();
    const button = templateButton.cloneNode(true);
    info.textContent = `entry-uploader v${manifest_default.version}`;
    button.classList.add("upload");
    buttonContainer.insertBefore(button, templateButton.nextSibling);
    button.onclick = () => togglePopup();
    window.removeEventListener("load", main);
  };
  window.addEventListener("load", () => main());
  var lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      main();
    }
  }).observe(document, { subtree: true, childList: true });
})();
