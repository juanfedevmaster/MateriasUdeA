(function () {
  var STORAGE_KEY = "site-lang";
  var scriptEl = document.currentScript;
  var i18nBase = scriptEl.src.replace(/assets\/js\/i18n\.js.*$/, "assets/i18n/");
  var page = document.body.getAttribute("data-i18n-page");

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "es";
  }

  function resolve(dict, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, dict);
  }

  function applyDict(dict) {
    document.documentElement.lang = dict.htmlLang;

    var pageDict = dict[page];
    if (pageDict && pageDict.title) {
      document.title = pageDict.title;
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = resolve(dict, el.getAttribute("data-i18n"));
      if (value !== undefined) {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var value = resolve(dict, el.getAttribute("data-i18n-title"));
      if (value !== undefined) {
        el.setAttribute("title", value);
      }
    });

    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      var label = toggle.querySelector(".label");
      if (label) {
        label.textContent = dict.common.langToggle;
      }
    }
  }

  function loadLang(lang) {
    return fetch(i18nBase + lang + ".json")
      .then(function (res) { return res.json(); })
      .then(applyDict);
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    loadLang(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadLang(getLang());

    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        setLang(getLang() === "es" ? "en" : "es");
      });
    }
  });
})();
