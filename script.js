// Selector de idioma: traduce los textos marcados con data-i18n
// y recuerda el idioma elegido para la próxima visita.
(function () {
  var textos = {
    es: {
      subtitle: "Profesor de arte — ilustración, diseño, herramientas digitales, emprendedor en JK Corte Láser",
      navPortfolio: "Portfolio",
      navCursos: "Cursos",
      footerPhrase: "Este sitio está hecho con muy poco conocimiento sobre código, algo de inteligencia natural y bastante inteligencia artificial.",
      portfolioTitle: "Portfolio",
      portfolioSubtitle: "Trabajos, ilustración y proyectos",
      back: "◂ volver al menú"
    },
    en: {
      subtitle: "Art teacher — illustration, design, digital tools, entrepreneur at JK Laser Cutting",
      navPortfolio: "Portfolio",
      navCursos: "Courses",
      footerPhrase: "This site is made with very little coding knowledge, some natural intelligence and quite a bit of artificial intelligence.",
      portfolioTitle: "Portfolio",
      portfolioSubtitle: "Work, illustration and projects",
      back: "◂ back to menu"
    },
    de: {
      subtitle: "Kunstlehrer — Illustration, Design, digitale Werkzeuge, Unternehmer bei JK Laserschneiden",
      navPortfolio: "Portfolio",
      navCursos: "Kurse",
      footerPhrase: "Diese Seite wurde mit sehr wenig Programmierkenntnissen, etwas natürlicher Intelligenz und ziemlich viel künstlicher Intelligenz erstellt.",
      portfolioTitle: "Portfolio",
      portfolioSubtitle: "Arbeiten, Illustration und Projekte",
      back: "◂ zurück zum Menü"
    }
  };

  var buttons = document.querySelectorAll('[data-lang]');
  var fields = document.querySelectorAll('[data-i18n]');
  if (!buttons.length || !fields.length) return;

  function aplicar(lang) {
    if (!textos[lang]) return;
    fields.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (textos[lang][key]) el.textContent = textos[lang][key];
    });
    buttons.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('idioma', lang); } catch (e) {}
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      aplicar(btn.getAttribute('data-lang'));
    });
  });

  var guardado = 'es';
  try { guardado = localStorage.getItem('idioma') || 'es'; } catch (e) {}
  aplicar(guardado);
})();

// Visor de imágenes del portfolio: al tocar una tarjeta se abre la obra
// en pantalla grande, con un enlace para ver el archivo original completo.
(function () {
  var cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Cerrar">✕ cerrar</button>' +
    '<img alt="">' +
    '<div class="lightbox-bar">' +
      '<span class="lightbox-caption"></span>' +
      '<a class="lightbox-original" target="_blank" rel="noopener">ver tamaño original ↗</a>' +
    '</div>';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('img');
  var caption = overlay.querySelector('.lightbox-caption');
  var original = overlay.querySelector('.lightbox-original');
  var closeBtn = overlay.querySelector('.lightbox-close');

  function open(card) {
    var thumb = card.querySelector('img');
    var label = card.querySelector('.card-label');
    img.src = thumb.currentSrc || thumb.src;
    img.alt = thumb.alt;
    caption.textContent = label ? label.textContent : '';
    original.href = img.src;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    img.removeAttribute('src');
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      open(card);
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();
