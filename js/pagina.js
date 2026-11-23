function marcarPagina() {
  var ruta = location.hash.replace(/^#\/?/, '').split(/[/?]/)[0];
  document.body.dataset.pagina = ruta || 'inicio';
}
addEventListener('hashchange', marcarPagina);
marcarPagina();

/* Tema claro / oscuro */
(function () {
  var raiz = document.documentElement;
  var boton = document.getElementById('tema');

  function aplicar(tema) {
    raiz.dataset.tema = tema;
    if (!boton) return;
    var oscuro = tema === 'dark';
    boton.textContent = oscuro ? '☀️' : '🌙';
    boton.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }

  aplicar(raiz.dataset.tema || 'light');

  if (boton) {
    boton.addEventListener('click', function () {
      var nuevo = raiz.dataset.tema === 'dark' ? 'light' : 'dark';
      aplicar(nuevo);
      try { localStorage.setItem('tema', nuevo); } catch (e) {}
    });
  }
})();