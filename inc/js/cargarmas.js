jQuery(document).ready(function($) {
  var page = 1; // Página de la que se cargarán más entradas
  var loading = false; // Bandera para evitar múltiples cargas simultáneas
requestAjax(page);
page++;

  $('#load-more-btn').on('click', function() {
      if (!loading) {
          loading = true;
          $(this).text('Cargando...');

          requestAjax(page);
    page++;
      }
  });

function requestAjax(page) {
  var number_posts = ($(window).width() >= 1920) ? 39 : 33;
  return ($.ajax({
    url: wp_ajax.ajax_url,
    type: 'post',
    data: {
      action: 'cargar_mas_entradas',
      page: page,
      nonce: wp_ajax.nonce,
      color_sets: wp_ajax.color_sets, // Asegúrate de incluir color_sets en los datos enviados
      number_posts
    },
    success: function(response) {
      $('#grid-container-global #grid-content-post').append(response);
      $('#load-more-btn').text('Cargar más');
      loading = false;
    }
  }));
}
});