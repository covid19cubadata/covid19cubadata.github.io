var province_order = {
    'unk': 16,
    'lha': 2,
    'mat': 4,
    'cfg': 6,
    'ssp': 7,
    'ltu': 10,
    'hol': 12,
    'gra': 11,
    'stg': 13,
    'ijv': 15,
    'cam': 9,
    'cav': 8,
    'vcl': 5,
    'gtm': 14,
    'pri': 0,
    'art': 1,
    'may': 3
}

var provinces_codes = {
    'lha': "23",
    'mat': "25",
    'cfg': "27",
    'ssp': "28",
    'ltu': "31",
    'hol': "32",
    'gra': "33",
    'stg': "34",
    'ijv': "40.01",
    'cam': "30",
    'cav': "29",
    'vcl': "26",
    'gtm': "35",
    'pri': "21",
    'art': "22",
    'may': "24"
}

var population = {
    'cuba': 11209628,
    '21': 588555,//PRI
    '22': 511079,//ART
    '23': 2131480,//LHA
    '24': 383043,//MAY
    '25': 714843,//MAT
    '26': 780749,//VCL
    '27': 406751,//CFG
    '28': 465780,//SSP
    '29': 435006,//CAV
    '30': 767138,//CAM
    '31': 535335,//LTU
    '32': 1027249,//HOL
    '33': 823651,//GRA
    '34': 1049256,//STG
    '35': 508552,//GTM
    '40.01': 83801,//IJV
}


var map_mun = L.map('map-mun', {
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
var geojsonM = null, geojsonP = null, start_selection = window.location.hash.replace('#', '');
map_mun.zoomControl.setPosition('topright');
var markers = {};

$.walker = {
    loaded: {},
    map: {
        clear: function () {
            if (geojsonM)
                map_mun.removeLayer(geojsonM);
            if (geojsonP)
                map_mun.removeLayer(geojsonP);
            for(var i in markers){
                for(var j=0;j<markers[i].length;j++){
                    marker = markers[i][j];
                    map_mun.removeLayer(marker);
                }
            }
        }
    },

    view: {
        addOptionToSelect: function (select, value, text) {
            if ($(select).find('option[value="' + value + '"]').length)
                return;
            $(select).append('<option value="' + value + '">' + text + '</option>')
        },
        update: function () {
            $cards.show();
            $selector.show();
            $selector_span.html('Distribución de fallecidos por');
            $('[data-class]').each(function () {
                $(this).attr('class', $(this).data('class'));
            });
            if ($locator.val() !== 'cuba') {
                $selector_span.html('Distribución de fallecidos por municipios en ' + $locator.find('option[value="' + $locator.val() + '"]').html());
                $cards.hide();
                $selector.val("map-mun");
                $selector.hide();
                $('[data-class]').attr('class', '');
            }
            $('[data-content=fallec]').html('<i class="fa fa-spinner fa-spin"></i>');

            const general_view = $locator.val() === 'cuba';
            let $generals = $('#recdist, #deadist, #tesmade-pcr, #tesacum, #topprov, #compari, #topn-n-countries, #evomade, #proscurves, #testspor, #stringencycub, #casinfo, #actalt');
            if (general_view) {
                $('#munscurves').css({'margin-left': ''});
                $generals.show();
            } else {
                $('#munscurves').css({'margin-left': '15px'});
                $generals.hide();
            }
        }
    },
    load: function (url, callback) {
        if (url in $.walker.loaded)
            return callback(Object.assign({}, $.walker.loaded[url]), false);
        cache = false;
        if(url.search('provincias.geojson')!==-1 || url.search('municipios.geojson')!==-1){
            cache=true;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            cache: cache,
            success: function (data) {
                $.walker.loaded[url] = Object.assign({}, data);
                callback(data, true);
            }
          });
    },
    province: {
        list: {features: []},
        prepare: function (target) {
            const $target = $(target);
            let remaining = {};
            let sorteddata = [];
            let prob_set={};
            for (const i in $.walker.province.list.features) {
                const province = $.walker.province.list.features[i].properties;
                if (!(province.DPA_province_code in prob_set) && province.province !== 'Desconocida') {
                    sorteddata.push($.walker.province.list.features[i].properties);
                    prob_set[province.DPA_province_code]=0;
                    //$.walker.view.addOptionToSelect('#proscurve-select1', province.DPA_province_code, province.province);
                }
                remaining[$.walker.province.list.features[i].properties.DPA_province_code] = {"total": 0};
            }
            // $('#proscurve-select1').find('option').remove();
            sorteddata.sort(function (a, b) {
                if (province_order[a.province_id] < province_order[b.province_id])
                    return -1;
                else if (province_order[a.province_id] == province_order[b.province_id])
                    return 0;
                else
                    return 1;
            });
            for (var j = 0; j < sorteddata.length; j++) {
                const province2 = sorteddata[j];
                $.walker.view.addOptionToSelect($target, province2.province_id, province2.province);
                $.walker.view.addOptionToSelect('#proscurve-select1', province2.DPA_province_code, province2.province);
                $.walker.view.addOptionToSelect('#proscurve-select2', province2.DPA_province_code, province2.province);
            }
            return remaining;
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
            let sorteddata = [];
            $('#munscurve-select1').find('option').remove();
            $('#munscurve-select2').find('option').remove();
            let set_mun = {}
            for (const i in $.walker.municipality.list.features) {
                const municipality = $.walker.municipality.list.features[i].properties;
                if (municipality.province_id === province_id || province_id === 'map-pro' || province_id === 'map-mun') {
                    features.push($.walker.municipality.list.features[i]);
                    remaining[municipality.DPA_municipality_code] = {"total": 0};
                    if ( !(municipality.DPA_municipality_code in set_mun) && municipality.municipality !== 'Desconocido') {
                        sorteddata.push($.walker.municipality.list.features[i].properties);
                        set_mun[municipality.DPA_municipality_code]=0;
                    }
                }
            }
            $('#munscurve-select1').find('option').remove();
            sorteddata.sort(function (a, b) {
                if (province_order[a.province_id] < province_order[b.province_id])
                    return -1;
                else if (province_order[a.province_id] == province_order[b.province_id])
                    return 0;
                else
                    return 1;
            });
            let dom_data = '';
            for (var j = 0; j < sorteddata.length; j++) {
                const municipality2 = sorteddata[j];
                dom_data += '<option value="' + municipality2.DPA_municipality_code + '">' + municipality2.province + ' - ' + municipality2.municipality + '</option>\n';
            }
            $('#munscurve-select1').append(dom_data);
            $('#munscurve-select2').append(dom_data);
            $.walker.municipality.list.features = features;
            return remaining;
        },
        matchByField: function (field, value) {
            for (const i in $.walker.municipality.list.features) {
                const municipality = $.walker.municipality.list.features[i];
                if (municipality.properties[field] === value)
                    return municipality;
            }
            return false;
        }
    }
};

let factor = 100, muns = [], pros = [], genInfo = {}, $selector = $('#select-map'), $selector_span = $selector.closest('.card').find('.card-header label'), $locator = $('#location-select');

function logx(base, x) {
    return (base === 10) ? Math.log10(x) : Math.log10(x) / Math.log10(base);
}

function run_calculations() {
    let province_id = $locator.val();
    let general_view = $locator.val() === 'cuba';
    if (general_view)
        province_id = $selector.val();

    $.walker.view.update();

    $.walker.load("data/oxford-indexes.json", function (oxford_index) {
        $.walker.load("data/covid19-fallecidos.json", function (data) {
            $.walker.load("data/provincias.geojson", function (provincias) {

                $.walker.province.list = provincias;
                pros = $.walker.province.prepare('#location-select');

                if (start_selection !== 'cuba' && $.walker.province.findById(start_selection)) {
                    province_id = start_selection;
                    $locator.val(province_id);
                }
                start_selection = false;
                $.walker.view.update();
                general_view = $locator.val() === 'cuba';


                $.walker.load("data/municipios.geojson", function (municipios) {
                    $.walker.municipality.list = municipios;
                    muns = $.walker.municipality.filterByProvince(province_id);

                    function getAllCasesAndSimpleGraphics() {
                        var cases = {};
                        var total = 0;
                        var sex_male = 0;
                        var sex_female = 0;
                        var sex_unknown = 0;
                        var ages = {
                            '0-9': 0,
                            '10-19': 0,
                            '20-29': 0,
                            '30-39': 0,
                            '40-49': 0,
                            '50-59': 0,
                            '60-69': 0,
                            '70-79': 0,
                            '80 o más': 0,
                            'Desconocido': 0
                        }
                        var agesM = {
                            '0-9': 0,
                            '10-19': 0,
                            '20-29': 0,
                            '30-39': 0,
                            '40-49': 0,
                            '50-59': 0,
                            '60-69': 0,
                            '70-79': 0,
                            '80 o más': 0,
                            'Desconocido': 0
                        }
                        var agesF = {
                            '0-9': 0,
                            '10-19': 0,
                            '20-29': 0,
                            '30-39': 0,
                            '40-49': 0,
                            '50-59': 0,
                            '60-69': 0,
                            '70-79': 0,
                            '80 o más': 0,
                            'Desconocido': 0
                        }
                        var total_cu = 0;
                        var total_no_cu = 0;
                        var total_unk = 0;
                        var morbilities = {};
                        var total_morb = {};

                        for (var day in data.casos.dias) {
                            if ('fallecidos' in data.casos.dias[day]) {
                                var dead = data.casos.dias[day].fallecidos;
                                for (var p in dead) {
                                    cases[dead[p].id] = dead[p];
                                    cases[dead[p].id]['fecha'] = data.casos.dias[day].fecha;

                                    if (!(dead[p].dpacode_municipio_deteccion in muns))
                                        continue;

                                    muns[dead[p].dpacode_municipio_deteccion].total++;
                                    pros[dead[p].dpacode_provincia_deteccion].total++;
                                    if ('enfermedades' in dead[p]){
										for(var e in dead[p].enfermedades){
											if (dead[p].enfermedades[e] in morbilities) {
												morbilities[dead[p].enfermedades[e]]+=1;
											} else {
												morbilities[dead[p].enfermedades[e]]=1;
											}
										}
										if (dead[p].enfermedades.length in total_morb){
											total_morb[dead[p].enfermedades.length]+=1;
										} else {
											total_morb[dead[p].enfermedades.length] = 1;
										}
									} else {
											if (0 in total_morb) {
												total_morb[0]+=1;
											} else {
												total_morb[0] = 1;
											}
										}

                                    //cuban/no cuban
                                    if (dead[p].pais === 'cu') {
                                        total_cu += 1;
                                    } else {
                                        if (dead[p].pais === 'unknown') {
                                            total_unk += 1;
                                        } else {
                                            total_no_cu += 1;
                                        }
                                    }

                                    //sex
                                    if (dead[p].sexo === 'hombre') {
                                        sex_male += 1;
                                    } else {
                                        if (dead[p].sexo === 'mujer') {
                                            sex_female += 1;
                                        } else {
                                            sex_unknown += 1;
                                        }
                                    }

                                    //ages
                                    if (dead[p].edad == null) {
                                        ages['Desconocido'] += 1
                                        if(diag[p].sexo==='mujer'){
                                            agesF['Desconocido'] += 1
                                        }else{
                                            agesM['Desconocido'] += 1
                                        }
                                    } else if ((dead[p].edad >= 0) && (dead[p].edad < 10)) {
                                        ages['0-9'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['0-9'] += 1
                                        }else{
                                            agesM['0-9'] += 1
                                        }
                                    } else if ((dead[p].edad >=10) && (dead[p].edad < 20)) {
                                        ages['10-19'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['10-19'] += 1
                                        }else{
                                            agesM['10-19'] += 1
                                        }
                                    } else if ((dead[p].edad >= 20) && (dead[p].edad < 30)) {
                                        ages['20-29'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['20-29'] += 1
                                        }else{
                                            agesM['20-29'] += 1
                                        }
                                    } else if ((dead[p].edad >= 30) && (dead[p].edad < 40)) {
                                        ages['30-39'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['30-39'] += 1
                                        }else{
                                            agesM['30-39'] += 1
                                        }
                                    } else if ((dead[p].edad >= 40) && (dead[p].edad < 50)) {
                                        ages['40-49'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['40-49'] += 1
                                        }else{
                                            agesM['40-49'] += 1
                                        }
                                    } else if ((dead[p].edad >= 50) && (dead[p].edad < 60)) {
                                        ages['50-59'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['50-59'] += 1
                                        }else{
                                            agesM['50-59'] += 1
                                        }
                                    } else if ((dead[p].edad >= 60) && (dead[p].edad < 70)) {
                                        ages['60-69'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['60-69'] += 1
                                        }else{
                                            agesM['60-69'] += 1
                                        }
                                    } else if ((dead[p].edad >= 70) && (dead[p].edad < 80)) {
                                        ages['70-79'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['70-79'] += 1
                                        }else{
                                            agesM['70-79'] += 1
                                        }
                                    } else {
                                        ages['80 o más'] += 1
                                        if(dead[p].sexo==='mujer'){
                                            agesF['80 o más'] += 1
                                        }else{
                                            agesM['80 o más'] += 1
                                        }
                                    }

                                }
                            }
                        }
                        tmorb_a = []
                        for(var e in total_morb){
							var key = e+' enfermedades';
							if (e==0){
								key = "ninguna";
							} else {
								if (e==1){
									key = "1 enfermedad";
								}
							}
							tmorb_a.push([key,total_morb[e]]);
						}

                        var morb_a = [];
                        for(var m in morbilities){
							morb_a.push([data.enfermedades[m],morbilities[m]]);
						}
						morb_a.sort(function compare(kv1, kv2) { return kv2[1] - kv1[1]});

						var mrange = ['Enfermedades'];
						var mfalle = ['Fallecidos'];

						for(var i=0;(i<morb_a.length)&&(i<8);i++){
							mrange.push(morb_a[i][0]);
							mfalle.push(morb_a[i][1]);
						}

                        //Lines for contagio evolution
                        var dates = ['Fecha'];
                        var dias = ['Días'];
                        var dailySingle = ['Fallecidos en el día'];
                        var dailySum = ['Fallecidos acumulados'];

                        var total = 0;
                        var nodeathd=0;

                        var munscurves = {};
                        var proscurves = {};
                        for (const j in muns) {
                            munscurves[j] = {data: [0]};
                        }
                        for (const j in pros) {
                            proscurves[j] = {data: [0]};
                        }



                        for (var i = 1; i <= Object.keys(data.casos.dias).length; i++) {
                            dias.push('Día ' + i);
                            dates.push(data.casos.dias[i].fecha.replace('2020/', ''));
                            for (const j in muns) {
                                let tt = munscurves[j]['data'].length;
                                let val = munscurves[j]['data'][tt - 1];
                                munscurves[j]['data'].push(val);
                            }
                            for (const j in pros) {
                                let tt = proscurves[j]['data'].length;
                                let val = proscurves[j]['data'][tt - 1];
                                proscurves[j]['data'].push(val);
                            }

                            if ('fallecidos' in data.casos.dias[i]) {
                                let report_day = 0;
                                for (const j in data.casos.dias[i].fallecidos) {
                                    if (data.casos.dias[i].fallecidos[j].dpacode_municipio_deteccion in muns) {
                                        report_day++;
                                        let tt = munscurves[data.casos.dias[i].fallecidos[j].dpacode_municipio_deteccion]['data'].length;
                                        munscurves[data.casos.dias[i].fallecidos[j].dpacode_municipio_deteccion]['data'][tt - 1]++;
                                    }
                                    if (data.casos.dias[i].fallecidos[j].dpacode_provincia_deteccion in pros) {
                                        let tt = proscurves[data.casos.dias[i].fallecidos[j].dpacode_provincia_deteccion]['data'].length;
                                        proscurves[data.casos.dias[i].fallecidos[j].dpacode_provincia_deteccion]['data'][tt - 1]++;
                                    }
                                }

                                dailySingle.push(report_day);
                                total += report_day;
                            } else {
                                dailySingle.push(0);
                                nodeathd+=1;
                            }

                            dailySum.push(total);
                        }

                        fallecContent = total ? total : '0';

                        $('[data-content=fallec]').html(fallecContent);
                        $('[data-content=nofallecd]').html(nodeathd);

						if (fallecContent==='0') {
							$('#top-row').hide();
							$('#line-charts').hide();
							$('#national-comparison').hide();
						} else {
							factor = 100;
							$('#top-row').show();
							$('#line-charts').show();
							$('#national-comparison').show();
						}


                        //Pie for sex
                        c3.generate({
                            bindto: "#fsex-info",
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
                            bindto: "#dis-bar",
                            data: {
                                x: mrange[0],
                                columns: [
                                    mrange,
                                    mfalle
                                ],
                                type: 'bar',
                                colors: {
                                    'Fallecidos': '#B01E22'
                                }
                            },
                            legend: {
								show: false
							},
                            axis: {
                                x: {
                                    label: {
                                        text: 'Enfermedades'
                                    },
                                    type: 'categorical',
                                    tick: {
										rotate: -45,
										multiline: false
									},
									height: 120
                                },
                                y: {
                                    label: 'Fallecidos',
                                    position: 'outer-middle',
                                }
                            }
                        });

                         //Pie for disease quantity
                        c3.generate({
                            bindto: "#dis-quantity-pie",
                            data: {
                                columns: tmorb_a,
                                type: 'pie',
                                colors: {
                                    'ninguna': '#1A8323',
                                    '1 enfermedad': '#B01E22',
                                    '2 enfermedades': '#1C1340',
                                    '3 enfermedades' : '#CA9F31',
                                    '4 enfermedades' : '#00AEEF',
                                    '5 enfermedades' : '#939393'
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


                        //Bar for ages
                        var range = ['Rango Etario'];
                        var rangeDiagnoses = ['Fallecidos'];
                        var rangeDiagnosesM = ['Fallecidos Hombres'];
                        var rangeDiagnosesF = ['Fallecidos Mujeres'];
                        for (var r in ages) {
                            range.push(r);
                            rangeDiagnosesM.push(agesM[r]);
                            rangeDiagnosesF.push(agesF[r]);
                            rangeDiagnoses.push(ages[r]);
                        }
                        c3.generate({
                            bindto: "#ages-info",
                            data: {
                                x: range[0],
                                columns: [
                                    range,
                                    rangeDiagnosesM,
                                    rangeDiagnosesF,
                                    rangeDiagnoses
                                ],
                                groups: [
                                    ['Fallecidos Hombres', 'Fallecidos Mujeres']
                                ],
                                type: 'bar',
                                colors: {
									'Fallecidos Mujeres': '#B01E22',
									'Fallecidos Hombres': '#1C1340',
                                    'Fallecidos': '#939393'
                                }
                            },
                            axis: {
                                x: {
                                    label: {
                                        text: 'Rango etario',
                                        position: 'outer-center',
                                    },
                                    type: 'categorical',
                                    tick: {
										rotate: -30,
										multiline: false
									},
									height: 45
                                },
                                y: {
                                    label: 'Fallecidos',
                                    position: 'outer-middle',
                                }
                            }
                        });




                        for (const j in muns) {
                            const municipality = $.walker.municipality.matchByField('DPA_municipality_code', j).properties;
                            munscurves[j]['data'][0] = municipality.municipality;
                            let tt = munscurves[j]['data'].length;
                            let val = munscurves[j]['data'][tt - 1];
                            if (val === 0) {
                                $('#munscurve-select1').find('option[value="' + municipality.DPA_municipality_code + '"]').remove();
                                $('#munscurve-select2').find('option[value="' + municipality.DPA_municipality_code + '"]').remove();
                            }
                        }
                        for (const j in pros) {
                            proscurves[j]['data'][0] = $.walker.province.matchByField('DPA_province_code', j).properties.province;
                        }

                        $('[data-content=update]').html(dates[dates.length - 1]);

                        var provinceslectd1 = $.walker.province.findById('lha').properties.DPA_province_code;
                        $('#proscurve-select1').val(provinceslectd1);
                        var provinceslectd2 = $.walker.province.findById('mat').properties.DPA_province_code;
                        $('#proscurve-select2').val(provinceslectd2);

                        $('#proscurve-select1').off('change').on('change', function () {
                            var val = $('#proscurve-select1').val();
                            provinceslectd1 = val;

                            comparison2 = c3.generate({
                                bindto: "#provinces-curve",
                                data: {
                                    x: dias[0],
                                    columns: [
                                        dias,
                                        proscurves[provinceslectd1]['data'],
                                        proscurves[provinceslectd2]['data']
                                    ],
                                    type: 'line',
                                },
                                axis: {
                                    x: {
                                        label: 'Fecha',
                                        type: 'categorical',
                                        show: false
                                    },
                                    y: {
                                        label: 'Fallecidos',
                                        position: 'outer-middle'
                                    }
                                }
                            });
                        });

                        $('#proscurve-select2').off('change').on('change', function () {
                            var val = $('#proscurve-select2').val();
                            provinceslectd2 = val;

                            comparison2 = c3.generate({
                                bindto: "#provinces-curve",
                                data: {
                                    x: dias[0],
                                    columns: [
                                        dias,
                                        proscurves[provinceslectd1]['data'],
                                        proscurves[provinceslectd2]['data']
                                    ],
                                    type: 'line',
                                },
                                axis: {
                                    x: {
                                        label: 'Fecha',
                                        type: 'categorical',
                                        show: false
                                    },
                                    y: {
                                        label: 'Fallecidos',
                                        position: 'outer-middle'
                                    }
                                }
                            });
                        });

                        var municipalitylectd1 = '23.02';
                        if (!(municipalitylectd1 in muns)) {
                            for (const j in muns) {
                                let tt = munscurves[j]['data'].length;
                                let val = munscurves[j]['data'][tt - 1];
                                if (!(val === 0)) {
                                    municipalitylectd1 = j;
                                    break;
                                }
                            }
                        }
                        $('#munscurve-select1').val(municipalitylectd1);

                        var municipalitylectd2 = '25.01';
                        if (!(municipalitylectd2 in muns)) {
                            for (const j in muns) {
                                let tt = munscurves[j]['data'].length;
                                let val = munscurves[j]['data'][tt - 1];
                                if (!(val === 0))
                                    municipalitylectd2 = j;
                            }
                        }
                        $('#munscurve-select2').val(municipalitylectd2);

                        $('#munscurve-select1').off('change').on('change', function () {
                            var val = $('#munscurve-select1').val();
                            municipalitylectd1 = val;

							if (municipalitylectd1 in munscurves){
								comparison3 = c3.generate({
									bindto: "#municipalyties-curve",
									data: {
										x: dias[0],
										columns: [
											dias,
											munscurves[municipalitylectd1]['data'],
											munscurves[municipalitylectd2]['data']
										],
										type: 'line',
									},
									axis: {
										x: {
											label: 'Fecha',
											type: 'categorical',
											show: false
										},
										y: {
											label: 'Fallecidos',
											position: 'outer-middle'
										}
									}
								});
							}
						});


                        $('#munscurve-select2').off('change').on('change', function () {
                            var val = $('#munscurve-select2').val();
                            municipalitylectd2 = val;

                            comparison3 = c3.generate({
                                bindto: "#municipalyties-curve",
                                data: {
                                    x: dias[0],
                                    columns: [
                                        dias,
                                        munscurves[municipalitylectd1]['data'],
                                        munscurves[municipalitylectd2]['data']
                                    ],
                                    type: 'line',
                                },
                                axis: {
                                    x: {
                                        label: 'Fecha',
                                        type: 'categorical',
                                        show: false
                                    },
                                    y: {
                                        label: 'Fallecidos',
                                        position: 'outer-middle'
                                    }
                                }
                            });
                        });

                        let colors = {
                            'Fallecidos en el día': '#00577B',
                            'Fallecidos acumulados': '#D0797C'
                        };

                        let columns = [
                            dates,
                            dailySingle,
                            dailySum,
                        ];



                        c3.generate({
                            bindto: "#daily-single-info",
                            data: {
                                x: dates[0],
                                columns: columns,
                                type: 'line',
                                colors: colors
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: 'Falledicos',
                                    position: 'outer-middle',
                                }
                            }
                        });

                        comparison2 = c3.generate({
                            bindto: "#provinces-curve",
                            data: {
                                x: dias[0],
                                columns: [
                                    dias,
                                    proscurves[provinceslectd1]['data'],
                                    proscurves[provinceslectd2]['data']
                                ],
                                type: 'line',
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: 'Fallecidos',
                                    position: 'outer-middle'
                                }
                            }
                        });

						if (municipalitylectd1 in munscurves) {
	                        comparison3 = c3.generate({
	                            bindto: "#municipalyties-curve",
	                            data: {
	                                x: dias[0],
	                                columns: [
	                                    dias,
	                                    munscurves[municipalitylectd1]['data'],
	                                    munscurves[municipalitylectd2]['data']
	                                ],
	                                type: 'line',
	                            },
	                            axis: {
	                                x: {
	                                    label: 'Fecha',
	                                    type: 'categorical',
	                                    show: false
	                                },
	                                y: {
	                                    label: 'Falledidos',
	                                    position: 'outer-middle'
	                                }
	                            }
	                        });
						}

                        return { "total": total, "female": sex_female, "male": sex_male, "unknownsex": sex_unknown};
                    }

                    var globalInfo = getAllCasesAndSimpleGraphics();



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
                            "total": globalInfo.total,
                            "male": globalInfo.male,
                            "female": globalInfo.female,
                            "sexunknown": globalInfo.sex_unknown
                        };
                    }

                    genInfo = resumeCases();

                    var MAX_LISTS = 16;

                    muns_array = [];
                    for (var m in muns) {
                        muns_array.push({cod: m, total: muns[m].total});
                    }
                    muns_array.sort(function (a, b) {
                        return b.total - a.total
                    });

                    var $table_mun = $('#table-mun > tbody').html('');
                    var mun_ranking = 1;
                    $(muns_array.slice(0, MAX_LISTS)).each(function (index, item) {
                        municipe = $.walker.municipality.matchByField('DPA_municipality_code', item.cod);
                        var row = ("<tr><td>{ranking}</td>" +
                            "<td>{cod} ({pro})</td>" +
                            "<td>{total}</td>" +
                            "<td>{rate}%</td></tr>")
                            .replace("{ranking}", mun_ranking)
                            .replace("{cod}", municipe.properties.municipality)
                            .replace("{pro}", municipe.properties.province)
                            .replace('{total}', item.total)
                            .replace('{rate}', (item.total * 100 / genInfo.total).toFixed(2));
                        $table_mun.append(row);
                        mun_ranking += 1;
                    });

                    let pros_array = [];
                    for (var m in pros) {
                        pros_array.push({cod: m, total: pros[m].total});
                    }
                    pros_array.sort(function (a, b) {
                        return b.total - a.total
                    });

                    var $table_pro = $('#table-pro > tbody').html('');
                    var pro_ranking = 1;
                    $(pros_array.slice(0, MAX_LISTS)).each(function (index, item) {
                        var row = ("<tr><td>{ranking}</td>" +
                            "<td>{cod}</td>" +
                            "<td>{total}</td>" +
                            "<td>{rate}%</td>" +
                            "<td>{tasa}</td></tr>")
                            .replace("{ranking}", pro_ranking)
                            .replace("{cod}", $.walker.province.matchByField('DPA_province_code', item.cod).properties.province)
                            .replace('{total}', item.total)
                            .replace('{rate}', (item.total * 100 / genInfo.total).toFixed(2))
                            .replace('{tasa}', (item.total * 100000 / population[item.cod]).toFixed(2));
                        $table_pro.append(row);
                        pro_ranking += 1;
                    });





                    function getMunProfile(code, mun, pro) {
                        var t = '';
                        t += '<div class="small-pname"><span class="bd">' + pro + '</span> - <span>' + mun + '</span></div>';
                        if (code in muns) {
                            if (muns[code].total)
                                t += '<div class="small-content"><span class="bd">Fallecidos:</span> <span>' + muns[code].total + '</span></div>';
                            else
                                t += '<div class="small-content">No hay fallecidos</div>';
                        }
                        t += '<div class="small-plink">&nbsp;</div>';

                        return t;
                    }

                    function getProProfile(code, pro) {
                        var t = '';
                        t += '<div class="small-pname"><span class="bd">' + pro + '</span></div>';
                        if (code in pros) {
                            if (pros[code].total)
                                t += '<div class="small-content"><span class="bd">Fallecidos:</span> <span>' + pros[code].total + '</span></div>';
                            else
                                t += '<div class="small-content">Sin fallecidos reportados aún</div>';
                        }
                        t += '<div class="small-plink">&nbsp;</div>';

                        return t;
                    }

                    geojsonP = L.geoJSON($.walker.province.list, {style: styleP});

                    geojsonP.bindTooltip(function (layer) {
                        return '<span class="bd">' + layer.feature.properties.province + '</span>';
                    }, {'sticky': true});

                    geojsonP.bindPopup(function (layer) {
                        var pcode = layer.feature.properties.DPA_province_code;
                        var pro = layer.feature.properties.province;
                        return getProProfile(pcode, pro);
                    });

                    geojsonM = L.geoJSON($.walker.municipality.list, {style: styleM});

                    geojsonM.bindTooltip(function (layer) {
                        return '<span class="bd">' + layer.feature.properties.province + '</span> - ' + layer.feature.properties.municipality;
                    }, {'sticky': true});

                    factor = 1.00005*10**(Math.floor(Math.log10(genInfo.max_pros)));

                    geojsonM.bindPopup(function (layer) {
                        var mcode = layer.feature.properties.DPA_municipality_code;
                        var mun = layer.feature.properties.municipality;
                        var pro = layer.feature.properties.province;
                        return getMunProfile(mcode, mun, pro);
                    });

                    $selector.change();

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

                    function getColorM(code) {
                        if (code in muns) {
                            if (muns[code].total > 0) {
                                var opac = logx(factor, muns[code].total * factor / genInfo.max_muns);
                                if(opac<0.07){opac=0.07;}
                                return "rgba(176,30,34," + opac + ")";
                            }
                        }
                        return '#D1D2D4';
                    }

                    function getColorP(code) {
                        if (code in pros) {
                            if (pros[code].total > 0) {
                                var opac = logx(factor, pros[code].total * factor / genInfo.max_pros);
                                if(opac<0.07){opac=0.07;}
                                return "rgba(176,30,34," + opac + ")";
                            }
                        }
                        return '#D1D2D4';
                    }

                    let province_code = -1;
                    if(general_view===false){
                        province_code = $.walker.province.findById(province_id)['properties']['DPA_province_code'];
                    }

                });

            });
        });
    });

}

$('[data-class]').each(function () {
    $(this).data('class', $(this).attr('class'));
});

let $cards = $('[data-content=activo],[data-content=evacua],[data-content=recupe]').parent();
$locator.change(function () {
    $.walker.view.update();
    if (!start_selection)
        window.location.hash = this.value;

    setTimeout(function () {
        $.walker.map.clear();

        run_calculations();
    }, 200);
}).change();

$selector.on('change', function (e) {
    $.walker.map.clear();
    let general_view = $locator.val() === 'cuba';
    let province_code = -1;
    if(general_view===false){
        let province_id = $locator.val();
        province_code = $.walker.province.findById(province_id)['properties']['DPA_province_code'];
    }
    for(var i in markers){

        if(general_view===false && i!==province_code){
            continue;
        }
        for(var j=0;j<markers[i].length;j++){
            markers[i][j].addTo(map_mun);
        }
    }

    let ratio = (geojsonP.getBounds().getNorthEast().lat - geojsonP.getBounds().getSouthWest().lat) * 0.05;

    if (this.value === 'map-pro') {
        map_mun.addLayer(geojsonP);
        map_mun.fitBounds(geojsonP.getBounds());
        map_mun.setMaxBounds(geojsonP.getBounds().pad(ratio));

        $('#cases1').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.2 / genInfo.max_pros) + ")");
        $('#cases2').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.4 / genInfo.max_pros) + ")");
        $('#cases3').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.6 / genInfo.max_pros) + ")");
        $('#cases4').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor * 0.8 / genInfo.max_pros) + ")");
        $('#cases5').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_pros * factor / genInfo.max_pros) + ")");
        $('#cases').html(genInfo.max_pros);
    } else {
        map_mun.addLayer(geojsonM);
        map_mun.fitBounds(geojsonM.getBounds());
        map_mun.setMaxBounds(geojsonM.getBounds().pad(ratio));

        $('#cases1').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.2 / genInfo.max_muns) + ")");
        $('#cases2').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.4 / genInfo.max_muns) + ")");
        $('#cases3').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.6 / genInfo.max_muns) + ")");
        $('#cases4').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor * 0.8 / genInfo.max_muns) + ")");
        $('#cases5').css('color', "rgba(176,30,34," + logx(factor, genInfo.max_muns * factor / genInfo.max_muns) + ")");
        $('#cases').html(genInfo.max_muns);
    }
});
