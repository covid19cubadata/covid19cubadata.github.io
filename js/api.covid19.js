(function ($) {
    var base_options = {
        'language': 'es',
        'image': 'top',
    };

    var methods = {
        init: function (options) {
            if (options && typeof (options) == 'object')
                options = $.extend({}, base_options, options);
            else
                options = base_options;

            var total = 0;
            var recuperados = 0;
            var evacuados = 0;
            var muertes = 0;
            var ultima_fecha = '';

            $.ajax({
                type: 'GET',
                url: 'https://www.cusobu.nat.cu/covid/data/covid19-cuba.json',
                dataType: 'json',
                cache: false,
                crossDomain: true,
                async: false,
                success: function (result) {
                    $.each(result.casos.dias, function (i, item) {
                        if (typeof item.diagnosticados != "undefined")
                            total = total + item.diagnosticados.length;
                        if (typeof item.recuperados_numero != "undefined")
                            recuperados = recuperados + item.recuperados_numero;
                        if (typeof item.evacuados_numero != "undefined")
                            evacuados = evacuados + item.evacuados_numero;
                        if (typeof item.muertes_numero != "undefined")
                            muertes = muertes + item.muertes_numero;
                        ultima_fecha = item.fecha;
                    });
                }
            });

            var activos = total - recuperados - evacuados - muertes;
            var html = '<div style="border-radius: 10px;padding: 10px;background-color: #212529;color: #FFF;font-size: 1.1em;">';
            if (options.image === 'top')
                html += '<a href="https://cusobu.nat.cu/covid/" target="_blank"><img src="https://cusobu.nat.cu/covid/images/logo.jpg" width="100%" /></a>';
            html += '<p style="margin: 0;"><strong>' + (options.language === 'en' ? 'Diagnosed' : 'Diagnosticados') + ':</strong> ' + total + '</p>';
            html += '<p style="margin: 0;"><strong>' + (options.language === 'en' ? 'Active' : 'Activos') + ':</strong> ' + activos + '</p>';
            html += '<p style="margin: 0;"><strong>' + (options.language === 'en' ? 'Recovered' : 'Recuperados') + ':</strong> ' + recuperados + '</p>';
            html += '<p style="margin: 0;"><strong>' + (options.language === 'en' ? 'Evacuees' : 'Evacuados') + ':</strong> ' + evacuados + '</p>';
            html += '<p style="margin: 0;"><strong>' + (options.language === 'en' ? 'Deaths' : 'Muertes') + ':</strong> ' + muertes + '</p>';
            html += '<p style="margin: 0;"><strong>' + (options.language === 'en' ? 'Updated' : 'Actualizado') + ':</strong> ' + ultima_fecha;
            html += '<br /><br />';
            html += '<p style="margin: 0;"><a style="color: #FFF;text-decoration: none;" href="https://cusobu.nat.cu/covid/" target="black">' + (options.language === 'en' ? 'Click here for more info' : 'Para m&aacute;s informaci&oacute;n click aqu&iacute;') + '</a></p>';
            if (options.image === 'bottom')
                html += '<div style="margin: 0;padding: 5px;text-align: center;"><a href="https://cusobu.nat.cu/covid/" target="black"><img src="https://cusobu.nat.cu/covid/images/logo.jpg" width="50%" /></a></div>';
            html += '<p style="margin: 0;"><strong>' + (options.language === 'en' ? 'Source' : 'Fuente') + ':</strong> <a style="color: #FFF;text-decoration: none;" href="https://salud.msp.gob.cu/" target="black">MINSAP</a></p>';
            html += '</div>';

            $(this).html(html);
        },
    };

    $.fn.covid19cuba = function (methodOrOptions) {
        if (methods[methodOrOptions])
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof methodOrOptions === 'object' || !methodOrOptions)
            return methods.init.apply(this, arguments);
        else
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
    };
})(jQuery);