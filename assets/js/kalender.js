/* ==========================================================================
   kalender.js — beschikbaarheidskalender op een huurcamperpagina

   Werkt met gegevens uit het HTML-element zelf:
     data-boekingen  JSON-lijst [{van, tot, status, reden}]
     data-tarieven   JSON-object per seizoen
   Zolang er geen backend is, staat die JSON gewoon in de pagina. Komt er
   later Sanity bij, dan haalt deze module dezelfde structuur op via fetch —
   de rest van het bestand hoeft niet te wijzigen.

   Belangrijk: de wisseldag. De camper komt om 10u binnen en vertrekt om 15u,
   dus dezelfde dag kan terugkeerdag van de ene en vertrekdag van de volgende
   huur zijn. Vandaar strikte vergelijkingen bij het bepalen van overlap.
   ========================================================================== */
(function () {
  "use strict";

  var wortel = document.querySelector("[data-kalender]");
  if (!wortel) return;

  var DAG = 86400000;
  var MAANDEN = ["januari","februari","maart","april","mei","juni","juli",
                 "augustus","september","oktober","november","december"];
  var WEEKDAGEN = ["ma","di","wo","do","vr","za","zo"];

  var vandaagLokaal = new Date();
  var VANDAAG = new Date(Date.UTC(vandaagLokaal.getFullYear(), vandaagLokaal.getMonth(), vandaagLokaal.getDate()));

  function datum(s) {
    var d = s.split("-").map(Number);
    return new Date(Date.UTC(d[0], d[1] - 1, d[2]));
  }
  function iso(d) { return d.toISOString().slice(0, 10); }
  function nachten(a, b) { return Math.round((b.getTime() - a.getTime()) / DAG); }
  function toon(d) { return d.getUTCDate() + " " + MAANDEN[d.getUTCMonth()].slice(0, 3); }
  function euro(n) { return "€ " + n.toLocaleString("nl-BE"); }

  var boekingen = JSON.parse(wortel.getAttribute("data-boekingen") || "[]");
  var tarieven = JSON.parse(wortel.getAttribute("data-tarieven") || "{}");
  var BLOKNAAM = { 2: "Weekend", 7: "1 week", 14: "2 weken", 21: "3 weken", 28: "4 weken" };

  /* Seizoensbereiken van de tarievenkaart. September en oktober staan er
     niet in; die worden hier als laag gerekend en zo ook benoemd. */
  function seizoenVan(d) {
    var m = d.getUTCMonth() + 1;
    if (m === 7 || m === 8) return { sleutel: "hoog", naam: "Hoogseizoen", zaterdag: true };
    if (m === 5 || m === 6) return { sleutel: "midden", naam: "Midden seizoen" };
    if (m === 9 || m === 10) return { sleutel: "laag", naam: "Laag seizoen (niet in de tarievenkaart)" };
    return { sleutel: "laag", naam: "Laag seizoen" };
  }

  /* Voordeligste formule: de kaart kent vaste blokken plus een tarief per
     extra dag. Zes nachten kost een volle week, want dat is goedkoper dan
     een weekend met vier losse dagen erbij. */
  function berekenPrijs(van, tot) {
    var n = nachten(van, tot);
    var s = seizoenVan(van);
    var t = tarieven[s.sleutel];
    if (!t) return null;
    var beste = null;
    Object.keys(t).filter(function (k) { return k !== "extra"; })
      .map(Number).sort(function (a, b) { return a - b; })
      .forEach(function (blok) {
        if (blok <= n && typeof t.extra === "number") {
          var bedrag = t[blok] + (n - blok) * t.extra;
          if (!beste || bedrag < beste.bedrag) beste = { blok: blok, extra: n - blok, bedrag: bedrag };
        }
        if (blok >= n && (!beste || t[blok] < beste.bedrag)) {
          beste = { blok: blok, extra: 0, bedrag: t[blok] };
        }
      });
    if (beste) { beste.nachten = n; beste.seizoen = s; }
    return beste;
  }

  function dagInfo(d) {
    var t = d.getTime();
    var midden = false, start = false, eind = false, aangevraagd = false, reden = null;
    boekingen.forEach(function (b) {
      var v = datum(b.van).getTime(), e = datum(b.tot).getTime();
      if (b.status === "aangevraagd") { if (t >= v && t <= e) aangevraagd = true; return; }
      if (b.status !== "goedgekeurd" && b.status !== "geblokkeerd") return;
      if (t > v && t < e) { midden = true; if (b.reden) reden = b.reden; }
      if (t === v) { start = true; if (b.reden) reden = b.reden; }
      if (t === e) { eind = true; if (b.reden) reden = b.reden; }
    });
    var staat = "vrij";
    if (midden || (start && eind)) staat = "bezet";
    else if (eind) staat = "vertrek";      /* vrij vanaf 15u → mag vertrekdag zijn */
    else if (start) staat = "terugkeer";   /* bezet vanaf 15u → mag terugkeerdag zijn */
    return { staat: staat, aangevraagd: aangevraagd, reden: reden, verleden: t < VANDAAG.getTime() };
  }

  /* ── Toestand ────────────────────────────────────────────────────────── */
  var basis = new Date(Date.UTC(VANDAAG.getUTCFullYear(), VANDAAG.getUTCMonth(), 1));
  var keuze = { van: null, tot: null };
  var melding = null;

  var maandenEl = wortel.querySelector("[data-maanden]");
  var meldingEl = wortel.querySelector("[data-melding]");
  var samenvattingEl = wortel.querySelector("[data-samenvatting]");
  var vorigeKnop = wortel.querySelector("[data-vorige]");
  var volgendeKnop = wortel.querySelector("[data-volgende]");
  var periodeVeld = document.querySelector("[data-periodeveld]");
  var berichtVeld = document.querySelector("[data-berichtveld]");

  function hoogseizoenRegel(van, tot) {
    var s = seizoenVan(van);
    if (!s.zaterdag) return null;
    if (van.getUTCDay() !== 6) return "In hoogseizoen start elke verhuur op zaterdag om 15u.";
    if (nachten(van, tot) % 7 !== 0) return "In hoogseizoen verhuren wij per volledige week, van zaterdag tot zaterdag.";
    return null;
  }

  function kiesDag(d) {
    var info = dagInfo(d);
    if (info.verleden) return;

    if (!keuze.van || keuze.tot) {
      if (info.staat === "bezet" || info.staat === "terugkeer") {
        melding = "Die dag is de camper nog onderweg. Kies een vrije dag of een wisseldag.";
        return teken();
      }
      melding = null;
      keuze = { van: d, tot: null };
      return teken();
    }

    if (d.getTime() <= keuze.van.getTime()) { keuze = { van: d, tot: null }; melding = null; return teken(); }

    var n = nachten(keuze.van, d);
    if (n < 2) { melding = "De kortste formule is een weekend, dus minstens twee nachten."; return teken(); }
    if (info.staat === "bezet" || info.staat === "vertrek") {
      melding = "De camper is op die einddatum al opnieuw verhuurd."; return teken();
    }
    for (var t = keuze.van.getTime() + DAG; t < d.getTime(); t += DAG) {
      if (dagInfo(new Date(t)).staat !== "vrij") {
        melding = "Er zit een bezette dag in deze periode."; return teken();
      }
    }
    var regel = hoogseizoenRegel(keuze.van, d);
    if (regel) { melding = regel; return teken(); }

    melding = null;
    keuze.tot = d;
    teken();
  }

  function tekenMaand(maand) {
    var eersteDag = (maand.getUTCDay() + 6) % 7;
    var aantal = new Date(Date.UTC(maand.getUTCFullYear(), maand.getUTCMonth() + 1, 0)).getUTCDate();

    var blok = document.createElement("div");
    blok.className = "maand";

    var titel = document.createElement("h3");
    titel.textContent = MAANDEN[maand.getUTCMonth()] + " " + maand.getUTCFullYear();
    blok.appendChild(titel);

    var raster = document.createElement("div");
    raster.className = "maand-raster";
    WEEKDAGEN.forEach(function (w) {
      var cel = document.createElement("div");
      cel.className = "dagnaam";
      cel.textContent = w;
      raster.appendChild(cel);
    });
    for (var i = 0; i < eersteDag; i++) raster.appendChild(document.createElement("div"));

    for (var dagNr = 1; dagNr <= aantal; dagNr++) {
      (function (dagNr) {
        var d = new Date(Date.UTC(maand.getUTCFullYear(), maand.getUTCMonth(), dagNr));
        var info = dagInfo(d);
        var knop = document.createElement("button");
        knop.type = "button";
        knop.className = "dag";
        knop.textContent = String(dagNr);
        knop.setAttribute("aria-label", dagNr + " " + MAANDEN[maand.getUTCMonth()] +
          (info.staat === "bezet" ? ", niet beschikbaar" : ""));

        var inKeuze = keuze.van && (
          (!keuze.tot && d.getTime() === keuze.van.getTime()) ||
          (keuze.tot && d.getTime() >= keuze.van.getTime() && d.getTime() <= keuze.tot.getTime())
        );
        var isRand = keuze.van && (d.getTime() === keuze.van.getTime() ||
          (keuze.tot && d.getTime() === keuze.tot.getTime()));

        if (info.verleden) { knop.classList.add("is-verleden"); knop.disabled = true; }
        else if (isRand) knop.classList.add("is-rand");
        else if (inKeuze) knop.classList.add("is-gekozen");
        else if (info.staat === "bezet") {
          knop.classList.add(info.reden ? "is-geblokkeerd" : "is-bezet");
          knop.disabled = true;
          if (info.reden) knop.title = info.reden;
        }
        else if (info.staat === "vertrek") knop.classList.add("is-vertrek");
        else if (info.staat === "terugkeer") knop.classList.add("is-terugkeer");
        else if (info.aangevraagd) {
          knop.classList.add("is-aangevraagd");
          knop.title = "Er ligt al een aanvraag voor deze dag";
        }

        if (d.getTime() === VANDAAG.getTime()) {
          var punt = document.createElement("span");
          punt.className = "vandaag-punt";
          knop.appendChild(punt);
        }

        knop.addEventListener("click", function () { kiesDag(d); });
        raster.appendChild(knop);
      })(dagNr);
    }

    blok.appendChild(raster);
    return blok;
  }

  function tekenSamenvatting() {
    samenvattingEl.innerHTML = "";
    if (!keuze.van) { samenvattingEl.hidden = true; return; }

    if (!keuze.tot) {
      samenvattingEl.hidden = false;
      samenvattingEl.className = "notitie notitie-stil kalender-melding";
      samenvattingEl.setAttribute("role", "status");
      samenvattingEl.innerHTML = "Vertrek op <strong>" + toon(keuze.van) +
        "</strong>. Kies nu uw terugkeerdag.";
      return;
    }

    var p = berekenPrijs(keuze.van, keuze.tot);
    if (!p) { samenvattingEl.hidden = true; return; }

    samenvattingEl.hidden = false;
    samenvattingEl.className = "kalender-samenvatting";
    samenvattingEl.removeAttribute("role");

    var tarief = tarieven[p.seizoen.sleutel];
    var regels = "<div><dt>" + BLOKNAAM[p.blok] + "</dt><dd>" + euro(tarief[p.blok]) + "</dd></div>";
    if (p.extra > 0) {
      regels += "<div><dt>" + p.extra + " extra " + (p.extra === 1 ? "dag" : "dagen") +
        " × " + euro(tarief.extra) + "</dt><dd>" + euro(p.extra * tarief.extra) + "</dd></div>";
    }
    regels += "<div><dt>Waarborg (terugbetaald)</dt><dd>€ 1.500</dd></div>";
    regels += "<div><dt>Wassen buiten, verplicht bij terugkeer</dt><dd>€ 100</dd></div>";

    samenvattingEl.innerHTML =
      '<div class="boven">' +
        '<div>' +
          '<p class="label label-stil">Uw periode</p>' +
          '<p class="periode">' + toon(keuze.van) + " → " + toon(keuze.tot) + '</p>' +
          '<p class="detail">' + p.nachten + " nachten · " + p.seizoen.naam + '</p>' +
        '</div>' +
        '<div class="rechts">' +
          '<p class="label label-stil">Richtprijs</p>' +
          '<p class="totaal">' + euro(p.bedrag) + '</p>' +
          '<p class="detail">incl. 21 % btw</p>' +
        '</div>' +
      '</div>' +
      '<dl>' + regels + '</dl>' +
      '<button type="button" class="periode-wissen" data-wis>Periode wissen</button>';

    samenvattingEl.querySelector("[data-wis]").addEventListener("click", function () {
      keuze = { van: null, tot: null };
      melding = null;
      teken();
    });

    var tekst = iso(keuze.van) + " → " + iso(keuze.tot);
    if (periodeVeld) periodeVeld.value = tekst;
    if (berichtVeld && !berichtVeld.dataset.aangeraakt) {
      berichtVeld.value = "Ik wil deze camper graag huren van " + tekst + ".";
    }
  }

  function teken() {
    maandenEl.innerHTML = "";
    maandenEl.appendChild(tekenMaand(basis));
    maandenEl.appendChild(tekenMaand(new Date(Date.UTC(basis.getUTCFullYear(), basis.getUTCMonth() + 1, 1))));

    if (melding) {
      meldingEl.hidden = false;
      meldingEl.textContent = melding;
    } else {
      meldingEl.hidden = true;
    }

    vorigeKnop.disabled = basis.getTime() <=
      Date.UTC(VANDAAG.getUTCFullYear(), VANDAAG.getUTCMonth(), 1);

    tekenSamenvatting();
  }

  vorigeKnop.addEventListener("click", function () {
    basis = new Date(Date.UTC(basis.getUTCFullYear(), basis.getUTCMonth() - 1, 1));
    teken();
  });
  volgendeKnop.addEventListener("click", function () {
    basis = new Date(Date.UTC(basis.getUTCFullYear(), basis.getUTCMonth() + 1, 1));
    teken();
  });
  if (berichtVeld) {
    berichtVeld.addEventListener("input", function () { berichtVeld.dataset.aangeraakt = "1"; });
  }

  teken();
})();
