(function ($) {
    let map_mun = L.map('province-map', {
        center: [21.5, -79.371124],
        zoom: 15,
        layers: [],
        keyboard: false,
        dragging: true,
        zoomControl: true,
        boxZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        tap: true,
        touchZoom: true,
        zoomSnap: 0.05,
    });
    var locations = null;

    $.walker = {
        loaded: {},
        load: function (url, callback) {
            if (url in $.walker.loaded)
                return callback(Object.assign({}, $.walker.loaded[url]));
            $.getJSON(url, function (data) {
                $.walker.loaded[url] = Object.assign({}, data);
                callback(data);
            });
        },
        province: {
            list: {features: []},
            createLinks: function (active, target) {
                const $target = $(target);
                for (const i in $.walker.province.list.features) {
                    const province = $.walker.province.list.features[i].properties;
                    if ($target.find('a[href="#' + province.province_id + '"]').length === 0)
                        $target.append('<a href="#' + province.province_id + '" class="list-group-item list-group-item-action">' + province.province + '</a>');
                }

                $target.find('a[href="#' + active + '"]').addClass('active').siblings().removeClass('active');
            },
            findById: function (id) {
                return $.walker.province.matchByField('province_id', id);
            },
            matchByField: function (field, value) {
                for (const i in $.walker.province.list.features) {
                    const province = $.walker.province.list.features[i];
                    if (province.properties[field] === value)
                        return province;
                }
                return false;
            }
        },
        municipality: {
            list: {features: []},
            filterByProvince: function (province_id) {
                let features = [], remaining = {};
                for (const i in $.walker.municipality.list.features) {
                    const province = $.walker.municipality.list.features[i];
                    if (province.properties.province_id === province_id) {
                        features.push($.walker.municipality.list.features[i]);
                        remaining[$.walker.municipality.list.features[i].properties.DPA_municipality_code] = {"total": 0};
                    }
                }
                $.walker.municipality.list.features = features;
                return remaining;
            }
        }
    };

    $(window).on('hashchange', function () {
        const province_id = window.location.hash.replace("#", "");

        $.walker.load('data/provincias.geojson', function (provincias) {
            $.walker.province.list = provincias;
            $.walker.province.createLinks(province_id, '[data-region="province"]');
            if (!$.walker.province.findById(province_id))
                return $('#province-map').html('Province ' + province_id + ' not found!!');

            $.walker.load("data/municipios.geojson", function (municipios) {
                $.walker.municipality.list = municipios;
                let muns = $.walker.municipality.filterByProvince(province_id);

                $.walker.load("data/covid19-cuba.json", function (data) {
                    let max = 0, total = 0, days = [], sex_male = 0, sex_female = 0, sex_unknown = 0;
                    let contagio = {
                        'importado': 0,
                        'introducido': 0,
                        'autoctono': 0,
                        'desconocido': 0
                    };
                    let ages = {
                        '0-18': 0,
                        '19-40': 0,
                        '41-60': 0,
                        '61 o más': 0,
                        'Desconocido': 0
                    };
                    var dates = ['Fecha'];
                    var dias = ['Días'];
                    var dailySingle = ['Casos en el día'];
                    var dailySum = ['Casos acumulados'];
                    var report_ac = 0;

                    for (const i in data.casos.dias) {
                        dias.push('Día ' + i);
                        dates.push(data.casos.dias[i].fecha.replace('2020/', ''));
                        days.push(data.casos.dias[i].fecha);

                        let report_day = 0;
                        for (const j in data.casos.dias[i].diagnosticados) {
                            const entry = data.casos.dias[i].diagnosticados[j];
                            if (entry.dpacode_municipio_deteccion in muns) {
                                muns[entry.dpacode_municipio_deteccion].total++;
                                total++;
                                if (muns[entry.dpacode_municipio_deteccion].total > max)
                                    max = muns[entry.dpacode_municipio_deteccion].total;

                                if (entry.sexo === 'hombre')
                                    sex_male++;
                                else if (entry.sexo === 'mujer')
                                    sex_female++;
                                else
                                    sex_unknown++;


                                if (entry.contagio == null)
                                    contagio.desconocido++;
                                else
                                    contagio[entry.contagio]++;

                                if (entry.edad == null)
                                    ages['Desconocido']++;
                                else if (entry.edad >= 0 && entry.edad < 19)
                                    ages['0-18']++;
                                else if (entry.edad >= 19 && entry.edad <= 40)
                                    ages['19-40']++;
                                else if (entry.edad >= 41 && entry.edad <= 60)
                                    ages['41-60']++;
                                else
                                    ages['61 o más']++;

                                report_day++;
                            }
                        }

                        dailySingle.push(report_day);
                        dailySum.push(report_ac += report_day);
                    }

                    const factor = 100;

                    function logx(base, x) {
                        if (base === 10) {
                            return Math.log10(x);
                        }
                        return Math.log10(x) / Math.log10(base);
                    }

                    function getColorM(code) {
                        var opac = logx(factor, muns[code].total * factor / max);
                        return (muns[code].total === 0 || !(code in muns)) ? '#D1D2D4' : "rgba(176,30,34," + opac + ")";
                    }

                    function styleM(feature) {
                        return {
                            weight: 0.5,
                            opacity: 0.8,
                            color: '#f5f1f1',
                            fillOpacity: 1,
                            fillColor: getColorM(feature.properties.DPA_municipality_code)
                        };
                    }

                    c3.generate({
                        bindto: "#sex-info",
                        data: {
                            columns: [['Hombres', sex_male], ['Mujeres', sex_female], ['No reportado', sex_unknown]],
                            type: 'pie',
                            colors: {
                                'Mujeres': '#B01E22',
                                'Hombres': '#1C1340',
                                'No reportado': '#1A8323'
                            }
                        }
                    });

                    c3.generate({
                        bindto: "#contagio-info",
                        data: {
                            columns: [['Importado', contagio.importado], ['Introducido', contagio.introducido], ['Autóctono', contagio.autoctono], ['Desconocido', contagio.desconocido]],
                            type: 'pie',
                            colors: {
                                'Introducido': '#B01E22',
                                'Importado': '#1C1340',
                                'Autóctono': '#1A8323',
                                'Desconocido': '#CA9F31'
                            }
                        }
                    });

                    var range = ['Rango Etario'];
                    var rangeDiagnoses = ['Diagnosticados'];
                    for (var r in ages) {
                        range.push(r);
                        rangeDiagnoses.push(ages[r]);
                    }
                    c3.generate({
                        bindto: "#ages-info",
                        data: {
                            x: range[0],
                            columns: [
                                range,
                                rangeDiagnoses
                            ],
                            type: 'bar',
                            colors: {
                                'Diagnosticados': '#B01E22'
                            }
                        },
                        axis: {
                            x: {
                                label: 'Rango etario',
                                type: 'categorical'
                            },
                            y: {
                                label: 'Casos',
                                position: 'outer-middle',
                            }
                        }
                    });

                    c3.generate({
                        bindto: "#daily-single-info",
                        data: {
                            x: dates[0],
                            columns: [
                                dates,
                                dailySingle,
                                dailySum
                            ],
                            type: 'line',
                            colors: {
                                'Casos en el día': '#B01E22',
                                'Casos acumulados': '#1C1340'
                            }
                        },
                        axis: {
                            x: {
                                label: 'Fecha',
                                type: 'categorical',
                                show: false
                            },
                            y: {
                                label: 'Casos',
                                position: 'outer-middle',
                            }
                        }
                    });

                    $('#cases1').css('color', "rgba(176,30,34," + logx(factor, max * factor * 0.2 / max) + ")");
                    $('#cases2').css('color', "rgba(176,30,34," + logx(factor, max * factor * 0.4 / max) + ")");
                    $('#cases3').css('color', "rgba(176,30,34," + logx(factor, max * factor * 0.6 / max) + ")");
                    $('#cases4').css('color', "rgba(176,30,34," + logx(factor, max * factor * 0.8 / max) + ")");
                    $('#cases5').css('color', "rgba(176,30,34," + logx(factor, max * factor / max) + ")");
                    $('#cases').html(max);

                    $('#gen-info-diagn-data').html(total);
                    $('#update').html(days[days.length - 1]);

                    if (locations)
                        map_mun.removeLayer(locations);
                    locations = L.geoJSON($.walker.municipality.list, {style: styleM});
                    locations.bindTooltip(function (layer) {
                        return '<span class="bd">' + layer.feature.properties.province + '</span> - ' + layer.feature.properties.municipality + '<br>Diagnosticados: ' + muns[layer.feature.properties.DPA_municipality_code].total;
                    }, {'sticky': true});
                    locations.bindPopup(function (layer) {
                        let mcode = layer.feature.properties.DPA_municipality_code;
                        let mun = layer.feature.properties.municipality;

                        return '<div class="small-pname"><span class="bd">' + mun + '</span></div>' +
                            '<div class="small-content"><span class="bd">Diagnosticados:</span> <span>' + muns[mcode].total + '</span></div>' +
                            '<div class="small-plink">&nbsp;</div>';
                    });

                    map_mun.addLayer(locations);
                    map_mun.zoomControl.setPosition('topright');
                    map_mun.fitBounds(locations.getBounds());
                });
            });
        });
    }).trigger('hashchange');
})(jQuery);