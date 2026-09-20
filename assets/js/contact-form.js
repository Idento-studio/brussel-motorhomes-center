/* ==========================================================================
   contact-form.js — afhandeling van alle formulieren op de site

   Elk formulier met [data-formulier] wordt hier opgepakt. Zolang er geen
   endpoint ingesteld is, toont het formulier enkel de bevestiging: handig om
   het gedrag te tonen zonder dat er iets verstuurd wordt.

   Aansluiten op Formspree: zet op het <form> het attribuut
     data-endpoint="https://formspree.io/f/xxxxxxxx"
   en de inzending gaat er als JSON naartoe.
   ========================================================================== */
(function () {
  "use strict";

  function toonBedankt(form) {
    var bedankt = form.querySelector("[data-bedankt]");
    if (!bedankt) return;
    form.querySelectorAll(".velden, .btn, .intro").forEach(function (el) { el.hidden = true; });
    bedankt.hidden = false;
    bedankt.setAttribute("tabindex", "-1");
    bedankt.focus();
  }

  function fout(form, tekst) {
    var melding = form.querySelector("[data-fout]");
    if (!melding) return;
    melding.textContent = tekst;
    melding.hidden = false;
  }

  document.querySelectorAll("form[data-formulier]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var melding = form.querySelector("[data-fout]");
      if (melding) melding.hidden = true;

      /* Honeypot: onzichtbaar veld dat enkel bots invullen. */
      var val = form.querySelector("input[name='website']");
      if (val && val.value.trim() !== "") { toonBedankt(form); return; }

      if (!form.reportValidity()) return;

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) { toonBedankt(form); return; }

      var knop = form.querySelector("button[type='submit']");
      if (knop) { knop.disabled = true; knop.dataset.tekst = knop.textContent; knop.textContent = "Bezig…"; }

      var data = {};
      new FormData(form).forEach(function (waarde, naam) { data[naam] = waarde; });
      data.pagina = window.location.pathname;

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) {
          if (!r.ok) throw new Error("verzenden mislukt");
          toonBedankt(form);
        })
        .catch(function () {
          fout(form, "Het versturen lukte niet. Probeer opnieuw of bel ons op +32 471 40 79 49.");
          if (knop) { knop.disabled = false; knop.textContent = knop.dataset.tekst; }
        });
    });
  });
})();
