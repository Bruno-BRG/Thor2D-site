/* Thor2D-site: pull live release info from GitHub so the site tracks
 * framework updates automatically. All calls are unauthenticated
 * (60 req/hour/IP) and every slot has a static fallback in the HTML. */
(function () {
  "use strict";
  var REPO = "Bruno-BRG/Thor2D";
  var API = "https://api.github.com/repos/" + REPO + "/releases";

  function getJSON(url) {
    return fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
  }

  function fmtDate(iso) {
    try { return new Date(iso).toISOString().slice(0, 10); }
    catch (e) { return ""; }
  }

  // ---- index.html download slots: [data-release-tag], [data-release-url], [data-release-asset] ----
  function hydrateDownload() {
    var need = document.querySelector("[data-release-tag], [data-release-url], [data-release-asset]");
    if (!need) return;
    getJSON(API + "/latest").then(function (rel) {
      document.querySelectorAll("[data-release-tag]").forEach(function (el) {
        el.textContent = rel.tag_name;
      });
      document.querySelectorAll("[data-release-url]").forEach(function (el) {
        el.setAttribute("href", rel.html_url);
      });
      document.querySelectorAll("[data-release-asset]").forEach(function (el) {
        var suffix = el.getAttribute("data-release-asset") || ".tar.gz";
        var hit = (rel.assets || []).filter(function (a) {
          return a.name.slice(-suffix.length) === suffix;
        })[0];
        if (hit) {
          el.setAttribute("href", hit.browser_download_url);
          el.style.display = "";
        }
      });
    }).catch(function () { /* static fallback stays */ });
  }

  // ---- changelog.html: render release timeline from the API ----
  function renderChangelog() {
    var box = document.getElementById("releases-dynamic");
    if (!box) return;
    getJSON(API + "?per_page=20").then(function (rels) {
      if (!rels.length) return;
      box.innerHTML = "";
      rels.forEach(function (rel, i) {
        var div = document.createElement("div");
        div.className = "release" + (i === 0 ? " latest" : "");
        var head = document.createElement("div");
        head.className = "release-head";
        var h3 = document.createElement("h3");
        h3.textContent = rel.tag_name;
        head.appendChild(h3);
        if (i === 0) {
          var b = document.createElement("span");
          b.className = "badge gold";
          b.textContent = "latest";
          head.appendChild(b);
        }
        var t = document.createElement("time");
        t.textContent = fmtDate(rel.published_at || rel.created_at);
        head.appendChild(t);
        var a = document.createElement("a");
        a.href = rel.html_url;
        a.textContent = (rel.name || rel.tag_name) + " →";
        head.appendChild(a);
        div.appendChild(head);
        if (rel.body) {
          var pre = document.createElement("pre");
          pre.style.whiteSpace = "pre-wrap";
          pre.textContent = rel.body.slice(0, 2000);
          div.appendChild(pre);
        }
        box.appendChild(div);
      });
      var fb = document.getElementById("releases-static");
      if (fb) fb.style.display = "none";
    }).catch(function () { /* static timeline stays */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { hydrateDownload(); renderChangelog(); });
  } else {
    hydrateDownload(); renderChangelog();
  }
})();
