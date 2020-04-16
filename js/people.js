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
    'bo': 'Bolivia'
};

$(function () {

    $.get('data/provincias.geojson', function (provincias) {
        $.get('data/municipios.geojson', function (municipios) {
            $.get('data/covid19-cuba.json', function (data) {

                $datatable = $('#datatable').DataTable({
                    data: [],
                    columns: [
                        {title: "Fecha"},
                        {title: "Nacionalidad"},
                        {title: "Provincia"},
                        {title: "Municipio"},
                        {title: "Sexo"},
                        {title: "Edad"},
                        {title: ""}
                    ]
                });

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

                let $modal = $('#modal-details');
                $(document).on('click', 'a[data-action="show-details"]', function (e) {
                    $modal.find('.modal-title').text($(this).data('title'));
                    $modal.find('.modal-body').html($('<p></p>').text($(this).data('text')));
                    // $('#modal-details').modal('show');
                    console.log($modal);
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
                                    && (filter.province == "" || diag.DPA_province_code == filter.province)
                                    && (filter.municipe == "" || diag.DPA_municipality_code == filter.municipe)
                                    && (filter.age_start == "" || diag.edad >= filter.age_start)
                                    && (filter.age_end == "" || diag.edad <= filter.age_end)
                                    && (filter.sexo == "" || diag.sexo == filter.sexo)
                                ) {
                                    dataSet.push([
                                        fecha, domains[diag.pais],
                                        diag['provincia_detección'],
                                        diag['municipio_detección'],
                                        diag.sexo,
                                        diag.edad,
                                        $('<a></a>').attr({
                                            'class': 'btn btn-primary btn-block btn-sm',
                                            'href': '#case-details',
                                            'data-text': diag.info,
                                            'data-title': diag.id,
                                        }).text('+').prop('outerHTML'),
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
        })
    });

    $(document).on('click', 'a[href="#case-details"]', function (evt) {
        evt.preventDefault();
        const $info = $('[data-info="' + $(this).data('title') + '"]');
        $(this).html('-');
        if ($info.length) {
            $info.remove();
            $(this).html('+');
        } else
            $(this).closest('tr').after('<tr data-info="' + $(this).data('title') + '"><td></td><td colspan="6">' + $(this).data('text') + '</td></tr>');
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

