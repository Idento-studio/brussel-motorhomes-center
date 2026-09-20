/* ==========================================================================
   site.js — sitebreed gedrag: header, mobiel menu, accordeon, tabs, jaartal
   Geen frameworks, geen afhankelijkheden.
   ========================================================================== */
(function () {
  "use strict";

  /* ── Header ─────────────────────────────────────────────────────────────
     De servicebalk klapt dicht bij het scrollen. Met één drempel verschuift
     de pagina-inhoud mee bij het in- en uitklappen, waardoor scrollY er
     opnieuw overheen springt en de balk begint te knipperen. Vandaar
     hysterese: dicht vanaf 140px, pas terug open onder 60px. Die marge is
     ruim groter dan de hoogte van de balk, dus de lus kan niet ontstaan. */
  var header = document.querySelector(".site-header");
  if (header) {
    var vast = false;
    var wachtend = false;
    var meet = function () {
      wachtend = false;
      var y = window.scrollY;
      var nieuw = vast ? y > 60 : y > 140;
      if (nieuw !== vast) {
        vast = nieuw;
        header.classList.toggle("is-vast", vast);
      }
    };
    window.addEventListener("scroll", function () {
      if (!wachtend) { wachtend = true; window.requestAnimationFrame(meet); }
    }, { passive: true });
    meet();
  }

  /* ── Mobiel menu ─────────────────────────────────────────────────────── */
  var navKnop = document.querySelector("[data-nav-toggle]");
  var mobieleNav = document.getElementById("mobiele-nav");
  if (navKnop && mobieleNav) {
    navKnop.addEventListener("click", function () {
      var open = mobieleNav.classList.toggle("is-open");
      navKnop.setAttribute("aria-expanded", String(open));
      navKnop.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    });
    mobieleNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        mobieleNav.classList.remove("is-open");
        navKnop.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── Accordeon ───────────────────────────────────────────────────────── */
  document.querySelectorAll(".accordeon").forEach(function (blok) {
    blok.addEventListener("click", function (e) {
      var knop = e.target.closest("button[aria-expanded]");
      if (!knop || !blok.contains(knop)) return;
      var open = knop.getAttribute("aria-expanded") === "true";
      blok.querySelectorAll("button[aria-expanded]").forEach(function (k) {
        k.setAttribute("aria-expanded", "false");
        var p = document.getElementById(k.getAttribute("aria-controls"));
        if (p) p.hidden = true;
      });
      if (!open) {
        knop.setAttribute("aria-expanded", "true");
        var paneel = document.getElementById(knop.getAttribute("aria-controls"));
        if (paneel) paneel.hidden = false;
      }
    });
  });

  /* ── Tabs (FAQ-categorieën) ──────────────────────────────────────────── */
  document.querySelectorAll("[data-tabs]").forEach(function (lijst) {
    lijst.addEventListener("click", function (e) {
      var tab = e.target.closest("[role='tab']");
      if (!tab) return;
      lijst.querySelectorAll("[role='tab']").forEach(function (t) {
        var actief = t === tab;
        t.setAttribute("aria-selected", String(actief));
        var paneel = document.getElementById(t.getAttribute("aria-controls"));
        if (paneel) paneel.hidden = !actief;
      });
    });
  });

  /* ── Jaartal in de footer ────────────────────────────────────────────── */
  document.querySelectorAll("[data-jaar]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
