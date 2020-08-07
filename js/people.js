let dateFormat = "yy/mm/dd";
let domains = {
    'cu': 'Cuba',
    'it': 'Italia',
    'be': 'Bélgica',
    'us': 'USA',
    'fr': 'Francia',
    'ca': 'Canadá',
    'es': 'España',
    'cn': 'China',
    'ru': 'Rusia',
    'uy': 'Uruguay',
    'do': 'R.Dominicana',
    'hr': 'Croacia',
    'co': 'Colombia',
    'pe': 'Perú',
    'tz': 'Tanzania',
    'pa': 'Panamá',
    'bo': 'Bolivia',
    'cg': 'Congo',
    'mx': 'México'
};

$(function () {
    $.getJSON('data/provincias.geojson', function (provincias) {
        $.getJSON('data/municipios.geojson', function (municipios) {
            $.getJSON('data/covid19-cuba.json', function (data) {

                $.fn.DataTable.ext.pager.numbers_length = 5;
                let $datatable = $('#datatable').DataTable({
                    'responsive': true,
                    'searching': true,
                    'pageLength': 25,
                    "lengthMenu": [25, 50, 100, 500, 1000],
                    "language": {
                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar:",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "<<",
                            "sLast": ">>",
                            "sNext": ">",
                            "sPrevious": "<"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        },
                        "buttons": {
                            "copy": "Copiar",
                            "colvis": "Visibilidad"
                        }
                    },
                    data: [],
                    columns: [
                        {title: ""},
                        {title: "Fecha"},
                        {title: "País"},
                        {title: "Prov."},
                        {title: "Mun."},
                        {title: "Sexo"},
                        {title: "Edad"},
                        {title: "Info"}
                    ],
                    "columnDefs": [
                        {"orderable": false, "targets": [0], "searchable": false, "width": "20"},
                        {"targets": [7], "visible": false},
                        {responsivePriority: 1, targets: 0},
                        {responsivePriority: 2, targets: -1}
                    ],
                    "drawCallback": function (settings) {
                        $('#datatable a[data-text]').each(function () {
                            if ($(this).html() === '-')
                                $(this).trigger('enhance');
                        });
                    }
                });

                new $.fn.dataTable.FixedHeader($datatable);

                let $dateStart = $("#date-start");
                let $dateEnd = $("#date-end");

                $dateStart.val("2020/03/11");
                let today = new Date();
                $dateEnd.val(today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate());

                let startDatePicker = $dateStart.datepicker({
                    defaultDate: "2020/03/11",
                    dateFormat: "yy/mm/dd",
                    minDate: "2020/03/11",
                }).on("change", function () {
                    endDatePicker.datepicker("option", "minDate", getDate(this));
                });

                let endDatePicker = $dateEnd.datepicker({
                    defaultDate: 0,
                    dateFormat: "yy/mm/dd",
                    maxDate: new Date(),
                }).on("change", function () {
                    startDatePicker.datepicker("option", "maxDate", getDate(this));
                });

                let $nationality = $('#nationality');
                _.each(domains, function (item, index) {
                    $nationality.append($('<option></option>').attr('value', index).text(item));
                });

                let $province = $('#province');
                _.each(provincias.features, function (item) {
                    $province.append($('<option></option>').attr('value', item.properties.DPA_province_code).text(item.properties.province));
                });

                let $municipe = $('#municipe');
                $province.change(function (e) {
                    let id = $(this).val();
                    $municipe.empty();
                    $municipe.append($('<option></option>').attr('value', "").text('-- Cualquiera --'));
                    _.each(_.filter(municipios.features, function (item) {
                        return item.properties.DPA_province_code == id;
                    }), function (item) {
                        if ($municipe.find('option[value="' + item.properties.DPA_municipality_code + '"]').length === 0)
                            $municipe.append($('<option></option>').attr('value', item.properties.DPA_municipality_code).text(item.properties.municipality));
                    });
                });

                let $ageStart = $("#age-start");
                let $ageEnd = $("#age-end");

                $("#slider-age").slider({
                    range: true,
                    min: 1,
                    max: 120,
                    values: [1, 120],
                    slide: function (event, ui) {
                        $ageStart.val(ui.values[0]);
                        $ageEnd.val(ui.values[1]);
                    }
                });

                $(document).on('submit', '#filter-form', function (e) {
                    e.preventDefault();
                    let filter = {};
                    _.each($(this).serializeArray(), function (item) {
                        filter[item.name] = item.value;
                    });

                    let dataSet = [];
                    _.each(data.casos.dias, function (dia) {
                        let fecha = dia.fecha;
                        if (
                            true
                            && (filter.date_start == '' || fecha >= filter.date_start)
                            && (filter.date_end == '' || fecha <= filter.date_end)
                        ) {
                            _.each(dia.diagnosticados, function (diag) {
                                if (
                                    true
                                    && (filter.nationality == "" || diag.pais == filter.nationality)
                                    && (filter.province == "" || diag.dpacode_provincia_deteccion == filter.province)
                                    && (filter.municipe == "" || diag.dpacode_municipio_deteccion == filter.municipe)
                                    && (filter.age_start == "" || diag.edad >= filter.age_start)
                                    && (filter.age_end == "" || diag.edad <= filter.age_end)
                                    && (filter.sexo == "" || diag.sexo == filter.sexo)
                                ) {
                                    dataSet.push([
                                        $('<a></a>').attr({
                                            'class': 'btn btn-primary btn-block btn-sm',
                                            'href': '#case-details',
                                            'data-text': diag.info,
                                            'data-note': diag.nota != undefined ? diag.nota : '',
                                            'data-title': diag.id,
                                        }).text('+').prop('outerHTML'),
                                        fecha,
                                        domains[diag.pais],
                                        diag['provincia_detección'],
                                        diag['municipio_detección'],
                                        diag.sexo,
                                        diag.edad,
                                        diag.info,
                                    ]);
                                }
                            });
                        }
                    });

                    $datatable.clear();
                    $datatable.rows.add(dataSet);
                    $datatable.draw();

                });
                $('#filter-form').submit();

            });
        });
    });

    $(document).on('click', 'a[href="#case-details"]', function (evt) {
        evt.preventDefault();
        const $info = $('[data-info="' + $(this).data('title') + '"]');
        $(this).html('-');
        if ($info.length) {
            $info.remove();
            $(this).html('+');
        } else
            $(this).trigger('enhance');
    });

    $(document).on('enhance', 'a[href="#case-details"]', function () {
        const search = $('[type="search"]').val();
        let content = $(this).data('text');
        if (search)
            content = content.replace(new RegExp(search), "<span style='color:#005778;'>" + search + "</span>");
        let $tr = $(this).closest('tr');
        const $sender = $(this);
        setTimeout(function () {
            if ($tr.next().hasClass('child'))
                $tr = $tr.next();
            $tr.after('<tr data-info="' + $sender.data('title') + '"><td colspan="7" style="white-space: normal;"><p>' + content + '</p><p class="text-danger font-italic" style="font-size: .75em">' + $sender.data('note') + '</p></td></tr>');
        }, 100);
    });
});

function getDate(element) {
    var date;
    try {
        date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
        date = null;
    }

    return date;
}

