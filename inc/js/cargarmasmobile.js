jQuery(document).ready(function($) {
    var page = 2; // Página de la que se cargarán más entradas
    var loading = false; // Bandera para evitar múltiples cargas simultáneas

    $('#load-more-btn-mobile').on('click', function() {
        if (!loading) {
            loading = true;
            $(this).text('Cargando...');

            $.ajax({
                url: wp_ajax.ajax_url,
                type: 'post',
                data: {
                    action: 'cargar_mas_entradas_mobile',
                    page: page,
                    nonce: wp_ajax.nonce,
                    color_sets: wp_ajax.color_sets, // Asegúrate de incluir color_sets en los datos enviados
                },
                success: function(response) {
                    $('#grid-content-post-mobile #entries-container').append(response);
                    $('#load-more-btn-mobile').text('Cargar más');
                    page++;
                    loading = false;
                }
            });
        }
    });
});
