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
