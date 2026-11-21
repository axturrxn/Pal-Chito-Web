function marcarPagina() {
  var ruta = location.hash.replace(/^#\/?/, '').split(/[/?]/)[0];
  document.body.dataset.pagina = ruta || 'inicio';
}
addEventListener('hashchange', marcarPagina);
marcarPagina();