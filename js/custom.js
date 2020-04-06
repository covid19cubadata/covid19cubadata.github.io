var domains = {
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
    'pe': 'Perú'
};



var contagio = {
    'importado': 0,
    'introducido': 0,
    'autoctono': 0,
    'desconocido': 0
}

$.getJSON("data/paises-info-dias.json", function (countriesdays) {
    $.getJSON("data/covid19-cuba.json", function (data) {
        $.getJSON("data/provincias.geojson", function (provincias) {
            $.getJSON("data/municipios.geojson",
                function (municipios) {

                    function getMunicipeByCode(code) {
                        for (m in municipios.features) {
                            if (municipios.features[m].properties.DPA_municipality_code == code) {
                                return municipios.features[m];
                                break;
                            }
                        }
                    }

                    function getCodeByMunicipeName(name) {
                        for (m in municipios.features) {
                            if (municipios.features[m].properties.municipality == name) {
                                return municipios.features[m];
                                break;
                            }
                        }
                    }

                    function getProvinceByCode(code) {
                        for (p in provincias.features) {
                            if (provincias.features[p].properties.DPA_province_code === code) {
                                return provincias.features[p];
                                break;
                            }
                        }
                    }

                    function getCodeByProvinceName(name) {
                        for (p in provincias.features) {
                            if (provincias.features[p].properties.province === name) {
                                return provincias.features[p];
                                break;
                            }
                        }
                    }

                    var factor = 100;

                    var curves = {};

                    function logx(base, x){
                        if(base == 10){
                            return Math.log10(x);
                        }
                        return Math.log10(x)/Math.log10(base);
                    }

                    function getCountryFromDomain(dom) {
                        if (dom in domains) {
                            return domains[dom];
                        }
                        if (dom == 'unknown') {
                            return 'Desconocido';
                        }
                        return dom;
                    }

                    function getAllCasesAndSimpleGraphics() {
                        var cases = {};
                        var deaths = 0;
                        var gone = 0;
                        var recov = 0;
                        var sex_male = 0;
                        var sex_female = 0;
                        var sex_unknown = 0;
                        var countries = {};
                        var ages = {
                            '0-18': 0,
                            '19-40': 0,
                            '41-60': 0,
                            '61 o más': 0,
                            'Desconocido': 0
                        }
                        var total_cu = 0;
                        var total_no_cu = 0;
                        var total_unk = 0;
                        var total_tests = 0;

                        for (var day in data.casos.dias) {
                            if ('diagnosticados' in data.casos.dias[day]) {
                                var diag = data.casos.dias[day].diagnosticados;
                                for (var p in diag) {
                                    cases[diag[p].id] = diag[p];
                                    cases[diag[p].id]['fecha'] = data.casos.dias[day].fecha;

                                    //cuban/no cuban
                                    if (diag[p].pais == 'cu') {
                                        total_cu += 1;
                                    } else {
                                        if (diag[p].pais == 'unknown') {
                                            total_unk += 1;
                                        } else {
                                            total_no_cu += 1;
                                        }
                                    }

                                    //sex
                                    if (diag[p].sexo == 'hombre') {
                                        sex_male += 1;
                                    } else {
                                        if (diag[p].sexo == 'mujer') {
                                            sex_female += 1;
                                        } else {
                                            sex_unknown += 1;
                                        }
                                    }

                                    //countries
                                    if (!(diag[p].pais in countries)) {
                                        countries[diag[p].pais] = 1;
                                    } else {
                                        countries[diag[p].pais] += 1;
                                    }

                                    //ages
                                    if (diag[p].edad == null) {
                                        ages['Desconocido'] += 1
                                    } else if ((diag[p].edad >= 0) && (diag[p].edad < 19)) {
                                        ages['0-18'] += 1
                                    } else if ((diag[p].edad >= 19) && (diag[p].edad <= 40)) {
                                        ages['19-40'] += 1
                                    } else if ((diag[p].edad >= 41) && (diag[p].edad <= 60)) {
                                        ages['41-60'] += 1
                                    } else {
                                        ages['61 o más'] += 1
                                    }

                                    //contagio
                                    if (diag[p].contagio == null) {
                                        contagio.desconocido += 1;
                                    } else {
                                        contagio[diag[p].contagio] += 1;
                                    }

                                }
                            }
                            if ('muertes_numero' in data.casos.dias[day]) {
                                deaths += data.casos.dias[day].muertes_numero;
                            }
                            if ('evacuados_numero' in data.casos.dias[day]) {
                                gone += data.casos.dias[day].evacuados_numero;
                            }
                            if ('recuperados_numero' in data.casos.dias[day]) {
                                recov += data.casos.dias[day].recuperados_numero;
                            }

                            if ('tests_total' in data.casos.dias[day]) {
                                if (total_tests <= data.casos.dias[day].tests_total) {
                                    total_tests = data.casos.dias[day].tests_total;
                                }
                            }
                        }

                        //Pie for sex
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


                        //Pie for cubans/no cubans
                        c3.generate({
                            bindto: "#countries-info-pie",
                            data: {
                                columns: [['cubanos', total_cu], ['extranjeros', total_no_cu], ['no reportado', total_unk]],
                                type: 'pie',
                                colors: {
                                    'cubanos': '#B01E22',
                                    'extranjeros': '#1C1340',
                                    'no reportado': '#1A8323'
                                }
                            }
                        });

                        //Donut for tests
                        c3.generate({
                            bindto: "#tests-donut-info",
                            data: {
                                columns: [['Tests Positivos', total_cu + total_no_cu + total_unk], ['Tests Negativos', total_tests - (total_cu + total_no_cu + total_unk)]],
                                type: 'donut',
                                colors: {
                                    'Tests Positivos': '#B01E22',
                                    'Tests Negativos': '#1C1340',
                                }
                            },
                            donut: {
                                title: total_tests + " tests",
                            }
                        });

                        //Bar for countries
                        var country = ['País'];
                        var countryDiagnoses = ['Diagnosticados'];
                        for (var c in countries) {
                            if (c != 'cu') {
                                country.push(getCountryFromDomain(c));
                                countryDiagnoses.push(countries[c]);
                            }
                        }
                        c3.generate({
                            bindto: "#countries-info",
                            data: {
                                x: country[0],
                                columns: [
                                    country,
                                    countryDiagnoses
                                ],
                                type: 'bar',
                                colors: {
                                    'Diagnosticados': '#B01E22'
                                }
                            },
                            axis: {
                                x: {
                                    label: 'País',
                                    type: 'categorical',
                                    tick: {
                                        rotate: -30,
                                        multiline: false
                                    },
                                    height: 45
                                },
                                y: {
                                    label: 'Casos',
                                    position: 'outer-middle',
                                }
                            }
                        });

                        //Bar for ages
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

                        //Pie for contagio
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

                        //Lines for contagio evolution
                        var dates = ['Fecha'];
                        var dias = ['Días'];
                        var dailySingle = ['Casos en el día'];
                        var dailySum = ['Casos acumulados'];
                        var dailyActive = ['Casos activos']
                        var cuba = ['Cuba'];
                        var deadsSum = ['Muertes acumuladas'];
                        var deadsSingle = ['Muertes en el día'];
                        var recoversSum = ['Altas acumuladas'];
                        var recoversSingle = ['Altas en el día'];
                        var test_days = [];
                        var test_negative = [];
                        var test_positive = [];
                        var test_cases = [];
                        var total = 0;
                        var active = 0;
                        var deads = 0;
                        var recover = 0;
                        var evac = 0;


                        for (var i = 1; i <= Object.keys(data.casos.dias).length; i++) {
                            dias.push('Día ' + i);
                            dates.push(data.casos.dias[i].fecha.replace('2020/', ''));
                            if ('diagnosticados' in data.casos.dias[i]) {
                                dailySingle.push(data.casos.dias[i]['diagnosticados'].length);
                                total += data.casos.dias[i]['diagnosticados'].length;
                            } else {
                                dailySingle.push(0);
                            }
                            if ('tests_total' in data.casos.dias[i]) {
                                test_days.push(data.casos.dias[i].fecha.replace('2020/', ''));
                                test_cases.push(data.casos.dias[i].tests_total);
                                test_negative.push(data.casos.dias[i].tests_total - total);
                                test_positive.push(total);
                            }
                            if ('recuperados_numero' in data.casos.dias[i]) {
								recover += data.casos.dias[i].recuperados_numero;
								recoversSingle.push(data.casos.dias[i].recuperados_numero);
							} else {
								recoversSingle.push(0);
							}
							if ('muertes_numero' in data.casos.dias[i]) {
								deads += data.casos.dias[i].muertes_numero;
								deadsSingle.push(data.casos.dias[i].muertes_numero);
							} else {
								deadsSingle.push(0);	
							}
							if ('evacuados_numero' in data.casos.dias[i]) {
								evac += data.casos.dias[i].evacuados_numero;
							}
                            
                            dailySum.push(total);
                            dailyActive.push(total-(recover+deads+evac));
                            recoversSum.push(recover);
                            deadsSum.push(deads);
                            cuba.push(total);
                        }
                        
                        console.log(deadsSingle);

                        var ntest_days = ['Fecha'];
                        var ntest_negative = ['Tests Negativos'];
                        var ntest_positive = ['Tests Positivos'];
                        var ntest_cases = ['Total de Tests'];
                        for (var i = 1; i < test_cases.length; i++) {
                            ntest_days.push(test_days[i]);
                            ntest_cases.push(test_cases[i] - test_cases[i - 1]);
                            ntest_negative.push(test_negative[i] - test_negative[i - 1]);
                            ntest_positive.push(test_positive[i] - test_positive[i - 1]);
                        }


                        $('[data-content=update]').html(dates[dates.length - 1]);


                        tests = c3.generate({
                            bindto: "#tests-line-info",
                            data: {
                                x: ntest_days[0],
                                columns: [
                                    ntest_days,
                                    ntest_negative,
                                    ntest_positive,
                                    ntest_cases
                                ],
                                type: 'bar',
                                groups: [['Tests Negativos', 'Tests Positivos']],
                                colors: {
                                    'Tests Negativos': '#1C1340',
                                    'Tests Positivos': '#B01E22',
                                    'Total de Tests': '#1A8323'
                                }
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    //show: false
                                },
                                y: {
                                    label: 'Tests en el día',
                                    position: 'outer-middle'
                                }
                            }
                        });

                        var countrysorted = [];
                        for (var c in countriesdays.paises) {
                            if ((countriesdays.paises[c].length + 1) >= cuba.length) {

                                var c_temp = [c];
                                var d_temp = ['Días'];
                                for (var i = 1; i < countriesdays.paises[c].length; i++) {
                                    c_temp.push(countriesdays.paises[c][i]);
                                    d_temp.push('Día ' + i);
                                }
                                curves[c] = {'dias': d_temp, 'data': c_temp};
                                countrysorted.push(c);
                            }
                        }
                        countrysorted.sort();
                        for (var c = 0; c < countrysorted.length; c++) {
                            var cc = curves[countrysorted[c]]['data'][0];
                            $('#countrycurve-select').append('<option value="' + cc + '">' + cc + '</option>');
                        }
                        var countryselected = 'Hungary';
                        $('#countrycurve-select').val(countryselected);
                        $('#countries-date').html(countriesdays['dia-actualizacion']);

                        $('#countrycurve-select').on('change', function () {
                            var val = $('#countrycurve-select').val();
                            comparison.unload({ids: countryselected});
                            curve.unload({ids: countryselected});
                            countryselected = val;
                            comparison.load({columns: [curves[countryselected]['data']]});
                            curve.load({columns: [curves[countryselected]['data']]});

                            comparison = c3.generate({
                                bindto: "#countries-comparison",
                                data: {
                                    x: dias[0],
                                    columns: [
                                        dias,
                                        cuba,
                                        curves[countryselected]['data']
                                    ],
                                    type: 'line',
                                    colors: {
                                        'Cuba': '#B01E22'
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
                                        position: 'outer-middle'
                                    }
                                }
                            });

                            curve = c3.generate({
                                bindto: "#countries-curve",
                                data: {
                                    x: 'Días',
                                    columns: [
                                        curves[countryselected]['dias'],
                                        curves[countryselected]['data'],
                                        cuba,
                                    ],
                                    type: 'line',
                                    colors: {
                                        'Cuba': '#B01E22'
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
                                        position: 'outer-middle'
                                    }
                                },
                                grid: {
                                    x: {
                                        lines: [{'value': dias[dias.length - 1], 'text': dias[dias.length - 1]}]
                                    }
                                }
                            });

                        });

                        c3.generate({
                            bindto: "#daily-single-info",
                            data: {
                                x: dates[0],
                                columns: [
                                    dates,
                                    dailySingle,
                                    dailyActive,
                                    dailySum
                                ],
                                type: 'line',
                                colors: {
                                    'Casos en el día': '#00577B',
                                    'Casos activos': '#B11116',
                                    'Casos acumulados': '#D0797C'
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
                        
                        c3.generate({
                            bindto: "#daily-deads-info",
                            data: {
                                x: dates[0],
                                columns: [
                                    dates,
                                    deadsSingle,
                                    deadsSum
                                ],
                                type: 'line',
                                colors: {
                                    'Muertes en el día': '#00577B',
                                    'Muertes acumuladas': '#1C1340'
                                }
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: 'Muertes',
                                    position: 'outer-middle',
                                }
                            }
                        });
                        
                        c3.generate({
                            bindto: "#daily-recovers-info",
                            data: {
                                x: dates[0],
                                columns: [
                                    dates,
                                    recoversSingle,                                    
                                    recoversSum
                                ],
                                type: 'line',
                                colors: {
                                    'Altas en el día': '#00577B',
                                    'Altas acumuladas': '#00AEEF'
                                }
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: 'Altas',
                                    position: 'outer-middle',
                                }
                            }
                        });

                        comparison = c3.generate({
                            bindto: "#countries-comparison",
                            data: {
                                x: dias[0],
                                columns: [
                                    dias,
                                    cuba,
                                    curves[countryselected]['data'].slice(0, cuba.length)
                                ],
                                type: 'line',
                                colors: {
                                    'Cuba': '#B01E22'
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
                                    position: 'outer-middle'
                                }
                            }
                        });

                        curve = c3.generate({
                            bindto: "#countries-curve",
                            data: {
                                x: 'Días',
                                columns: [
                                    curves[countryselected]['dias'],
                                    curves[countryselected]['data'],
                                    cuba,
                                ],
                                type: 'line',
                                colors: {
                                    'Cuba': '#B01E22'
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
                                    position: 'outer-middle'
                                }
                            },
                            grid: {
                                x: {
                                    lines: [{'value': dias[dias.length - 1], 'text': dias[dias.length - 1]}]
                                }
                            }
                        });

                        return {"cases": cases, "deaths": deaths, "gone": gone, "recov": recov, "female": sex_female, "male": sex_male, "unknownsex": sex_unknown};
                    }


                    var globalInfo = getAllCasesAndSimpleGraphics();


                    var casos = globalInfo.cases;


                    function getAllRegions() {
                        var muns = {};
                        var pros = {};
                        for (var c in casos) {

                            if (!(casos[c].dpacode_municipio_deteccion in muns)) {
                                muns[casos[c].dpacode_municipio_deteccion] = {"total": 1}
                            } else {
                                muns[casos[c].dpacode_municipio_deteccion].total += 1;
                            }
                            if (!(casos[c].dpacode_provincia_deteccion in pros)) {
                                pros[casos[c].dpacode_provincia_deteccion] = {"total": 1}
                            } else {
                                pros[casos[c].dpacode_provincia_deteccion].total += 1;
                            }
                        }
                        return {'muns': muns, 'pros': pros};
                    }

                    var regions = getAllRegions();
                    var muns = regions.muns;
                    var pros = regions.pros;

                    function resumeCases() {
                        var max_muns = 0;
                        var max_pros = 0;
                        var total = 0;
                        for (var m in muns) {
                            if (max_muns < muns[m].total) {
                                max_muns = muns[m].total;
                            }
                            total += muns[m].total;
                        }
                        for (var p in pros) {
                            if (max_pros < pros[p].total) {
                                max_pros = pros[p].total;
                            }
                        }


                        return {
                            'max_muns': max_muns,
                            'max_pros': max_pros,
                            'total': total,
                            "deaths": globalInfo.deaths,
                            "gone": globalInfo.gone,
                            "recov": globalInfo.recov,
                            "male": globalInfo.male,
                            "female": globalInfo.female,
                            "sexunknown": globalInfo.sex_unknown
                        };
                    }

                    var genInfo = resumeCases();

                    var MAX_LISTS = 10;

                    muns_array = [];
                    for (var m in muns) {
                        muns_array.push({cod: m, total: muns[m].total});
                    }
                    muns_array.sort(function (a, b) {
                        return b.total - a.total
                    });

                    var $table_mun = $('#table-mun > tbody');
                    var mun_ranking = 1;
                    $(muns_array.slice(0, MAX_LISTS)).each(function (index, item) {
                        municipe = getMunicipeByCode(item.cod);
                        var row = ("<tr><td>{ranking}</td>" +
                            "<td>{cod} ({pro})</td>" +
                            // "<td>{total}</td>" +
                            "<td>{rate}%</td></tr>")
                            .replace("{ranking}", mun_ranking)
                            .replace("{cod}", municipe.properties.municipality)
                            .replace("{pro}", municipe.properties.province)
                            // .replace('{total}', item.total)
                            .replace('{rate}', (item.total * 100 / genInfo.total).toFixed(2));
                        $table_mun.append(row);
                        mun_ranking += 1;
                    });

                    pros_array = [];
                    for (var m in pros) {
                        pros_array.push({cod: m, total: pros[m].total});
                    }
                    pros_array.sort(function (a, b) {
                        return b.total - a.total
                    });

                    var $table_pro = $('#table-pro > tbody');
                    var pro_ranking = 1;
                    $(pros_array.slice(0, MAX_LISTS)).each(function (index, item) {
                        var row = ("<tr><td>{ranking}</td>" +
                            "<td>{cod}</td>" +
                            // "<td>{total}</td>" +
                            "<td>{rate}%</td></tr>")
                            .replace("{ranking}", pro_ranking)
                            .replace("{cod}", getProvinceByCode(item.cod).properties.province)
                            // .replace('{total}', item.total)
                            .replace('{rate}', (item.total * 100 / genInfo.total).toFixed(2));
                        $table_pro.append(row);
                        pro_ranking += 1;
                    });

		$('[data-content=diagno]').html(genInfo.total);
		$('[data-content=activo]').html(genInfo.total -(genInfo.deaths + genInfo.gone +genInfo.recov));
		$('[data-content=fallec]').html(genInfo.deaths);
		$('[data-content=evacua]').html(genInfo.gone);
		$('[data-content=recupe]').html(genInfo.recov);

                    var geojsonM = L.geoJSON(municipios, {style: styleM});

                    var geojsonP = L.geoJSON(provincias, {style: styleP});

                    geojsonM.bindTooltip(function (layer) {
                        return '<span class="bd">' + layer.feature.properties.province + '</span> - ' + layer.feature.properties.municipality;
                    }, {'sticky': true});

                    geojsonP.bindTooltip(function (layer) {
                        return '<span class="bd">' + layer.feature.properties.province + '</span>';
                    }, {'sticky': true});

                    function getMunProfile(code, mun, pro) {
                        var t = '';
                        t += '<div class="small-pname"><span class="bd">' + pro + '</span> - <span>' + mun + '</span></div>';
                        if (code in muns) {
                            t += '<div class="small-content"><span class="bd">Diagnosticados:</span> <span>' + muns[code].total + '</span></div>';
                        } else {
                            t += '<div class="small-content">No hay casos diagnosticados</div>';
                        }
                        t += '<div class="small-plink">&nbsp;</div>';

                        return t;
                    }

                    function getProProfile(code, pro) {
                        var t = '';
                        t += '<div class="small-pname"><span class="bd">' + pro + '</span></div>';
                        if (code in pros) {
                            t += '<div class="small-content"><span class="bd">Diagnosticados:</span> <span>' + pros[code].total + '</span></div>';
                        } else {
                            t += '<div class="small-content">Sin casos reportados aún</div>';
                        }
                        t += '<div class="small-plink">&nbsp;</div>';

                        return t;
                    }

                    geojsonM.bindPopup(function (layer) {
                        var mcode = layer.feature.properties.DPA_municipality_code;
                        var mun = layer.feature.properties.municipality;
                        var pro = layer.feature.properties.province;
                        return getMunProfile(mcode, mun, pro);
                    });

                    geojsonP.bindPopup(function (layer) {
                        var pcode = layer.feature.properties.DPA_province_code;
                        var pro = layer.feature.properties.province;
                        return getProProfile(pcode, pro);
                    });

                    function styleM(feature) {
                        return {
                            weight: 0.5,
                            opacity: 0.8,
                            color: '#f5f1f1',
                            fillOpacity: 1,
                            fillColor: getColorM(feature.properties.DPA_municipality_code)
                        };
                    }

                    function styleP(feature) {
                        return {
                            weight: 0.5,
                            opacity: 0.8,
                            color: '#f5f1f1',
                            fillOpacity: 1,
                            fillColor: getColorP(feature.properties.DPA_province_code)
                        };
                    }

                    $('#cases1').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.2 / genInfo.max_muns) + ")");
                    $('#cases2').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.4 / genInfo.max_muns) + ")");
                    $('#cases3').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.6 / genInfo.max_muns) + ")");
                    $('#cases4').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.8 / genInfo.max_muns) + ")");
                    $('#cases5').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor / genInfo.max_muns) + ")");
                    $('#cases').html(genInfo.max_muns);

                    function getColorM(code) {
                        if (code in muns) {
                            var opac = logx(factor, muns[code].total * factor / genInfo.max_muns);
                            return "rgba(176,30,34," + opac + ")";
                        }
                        return '#D1D2D4';
                    }

                    function getColorP(code) {
                        if (code in pros) {
                            var opac = logx(factor, pros[code].total * factor / genInfo.max_pros);
                            return "rgba(176,30,34," + opac + ")";
                        }
                        return '#D1D2D4';
                    }

                    var map_mun = L.map('map-mun', {
                        center: [21.5, -79.371124],
                        zoom: 15,
                        layers: [geojsonM],
                        keyboard: false,
                        dragging: true,
                        zoomControl: true,
                        boxZoom: false,
                        doubleClickZoom: false,
                        scrollWheelZoom: false,
                        tap: true,
                        touchZoom: true,
                        zoomSnap: 0.05,
                        maxBounds: geojsonM.getBounds()
                    });
                    map_mun.zoomControl.setPosition('topright');
                    map_mun.fitBounds(geojsonM.getBounds());

                    var map_pro = L.map('map-pro', {
                        center: [21.5, -79.371124],
                        zoom: 15,
                        layers: [geojsonP],
                        keyboard: false,
                        dragging: true,
                        zoomControl: true,
                        boxZoom: false,
                        doubleClickZoom: false,
                        scrollWheelZoom: false,
                        tap: true,
                        touchZoom: true,
                        zoomSnap: 0.05,
                        maxBounds: geojsonP.getBounds()
                    });
                    map_pro.zoomControl.setPosition('topright');
                    map_pro.fitBounds(geojsonP.getBounds());

                    $('#select-map').on('change', function (e) {
                        var val = $('#select-map').val();
                        if (val === 'map-mun') {
                            $('#cases1').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.2 / genInfo.max_muns) + ")");
                            $('#cases2').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.4 / genInfo.max_muns) + ")");
                            $('#cases3').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.6 / genInfo.max_muns) + ")");
                            $('#cases4').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.8 / genInfo.max_muns) + ")");
                            $('#cases5').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor / genInfo.max_muns) + ")");
                            $('#cases').html(genInfo.max_muns);
                            $('#map-pro').hide();
                            $('#map-mun').show();
                            map_mun.invalidateSize();
                        } else {
                            $('#cases1').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.2 / genInfo.max_pros) + ")");
                            $('#cases2').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.4 / genInfo.max_pros) + ")");
                            $('#cases3').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.6 / genInfo.max_pros) + ")");
                            $('#cases4').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.8 / genInfo.max_pros) + ")");
                            $('#cases5').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor / genInfo.max_pros) + ")");
                            $('#cases').html(genInfo.max_pros);
                            $('#map-mun').hide();
                            $('#map-pro').show();
                            map_pro.invalidateSize();
                        }
                    }).change();
                });
        });
    });
}); 
