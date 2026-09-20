/* ==========================================================================
   aanbod.js — filters op /verkoop/ en de zoekbalk in de hero

   De kaarten staan gewoon in de HTML; dit script verbergt ze alleen. Bij een
   handvol campers is dat sneller dan ze met JavaScript aanmaken, en elke
   camper blijft in de broncode staan voor Google.
   ========================================================================== */
(function () {
  "use strict";

  /* ── Filterbalk op het overzicht ─────────────────────────────────────── */
  var balk = document.querySelector("[data-filters]");
  if (balk) {
    var kaarten = Array.prototype.slice.call(document.querySelectorAll("[data-camper]"));
    var selects = Array.prototype.slice.call(balk.querySelectorAll("select"));
    var wissen = balk.querySelector("[data-wissen]");
    var telling = document.querySelector("[data-telling]");
    var leeg = document.querySelector("[data-leeg]");

    var binnenPrijs = function (prijs, bereik) {
      if (bereik === "tot50") return prijs < 50000;
      if (bereik === "50tot65") return prijs >= 50000 && prijs <= 65000;
      if (bereik === "vanaf65") return prijs > 65000;
      return true;
    };

    var pas = function () {
      var zichtbaar = 0;
      kaarten.forEach(function (kaart) {
        var toon = selects.every(function (sel) {
          if (!sel.value) return true;
          if (sel.name === "prijs") {
            return binnenPrijs(parseInt(kaart.getAttribute("data-prijs") || "0", 10), sel.value);
          }
          return (kaart.getAttribute("data-" + sel.name) || "") === sel.value;
        });
        kaart.hidden = !toon;
        if (toon) zichtbaar++;
      });
      if (telling) telling.textContent = String(zichtbaar);
      if (leeg) leeg.hidden = zichtbaar !== 0;
      if (wissen) wissen.hidden = !selects.some(function (s) { return s.value; });
    };

    selects.forEach(function (sel) { sel.addEventListener("change", pas); });
    if (wissen) {
      wissen.addEventListener("click", function () {
        selects.forEach(function (sel) { sel.value = ""; });
        pas();
      });
    }

    /* De zoekbalk op de home stuurt een prijsbereik mee in de URL. */
    var gevraagd = new URLSearchParams(window.location.search).get("prijs");
    if (gevraagd) {
      var prijsSelect = balk.querySelector("select[name='prijs']");
      if (prijsSelect) {
        var bestaat = Array.prototype.some.call(prijsSelect.options, function (o) { return o.value === gevraagd; });
        if (bestaat) prijsSelect.value = gevraagd;
      }
    }

    pas();
  }

  /* ── Zoekbalk in de hero ─────────────────────────────────────────────── */
  var zoek = document.querySelector("[data-zoekbalk]");
  if (zoek) {
    var segment = zoek.querySelector("[name='segment']");
    var budget = zoek.querySelector("[name='budget']");
    var budgetLabel = zoek.querySelector("[data-budget-label]");
    var groepen = {
      koop: zoek.querySelector("[data-opties='koop']"),
      huur: zoek.querySelector("[data-opties='huur']")
    };

    var wissel = function () {
      var koop = segment.value === "koop";
      if (budgetLabel) budgetLabel.textContent = koop ? "Budget" : "Periode";
      if (groepen.koop) groepen.koop.hidden = !koop;
      if (groepen.huur) groepen.huur.hidden = koop;
      budget.value = "";
    };
    segment.addEventListener("change", wissel);
    wissel();

    zoek.addEventListener("submit", function (e) {
      e.preventDefault();
      if (segment.value === "koop") {
        window.location.href = "verkoop/" + (budget.value ? "?prijs=" + encodeURIComponent(budget.value) : "");
      } else {
        window.location.href = "verhuur/";
      }
    });
  }
})();
