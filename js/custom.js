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
    'pe': 'Perú',
    'tz': 'Tanzania',
    'pa': 'Panamá',
    'bo': 'Bolivia'
};

countries_codes = {
    "AFG": "Afghanistan",
    "ALB": "Albania",
    "DZA": "Algeria",
    "AND": "Andorra",
    "AGO": "Angola",
    "ATG": "Antigua and Barbuda",
    "ARG": "Argentina",
    "ARM": "Armenia",
    "AUS": "Australia",
    "AUT": "Austria",
    "AZE": "Azerbaijan",
    "BHS": "Bahamas",
    "BHR": "Bahrain",
    "BGD": "Bangladesh",
    "BRB": "Barbados",
    "BLR": "Belarus",
    "BEL": "Belgium",
    "BLZ": "Belize",
    "BTN": "Bhutan",
    "BOL": "Bolivia",
    "BIH": "Bosnia and Herzegovina",
    "BRA": "Brazil",
    "BGR": "Bulgaria",
    "BFA": "Burkina Faso",
    "CPV": "Cabo Verde",
    "KHM": "Cambodia",
    "CMR": "Cameroon",
    "CAN": "Canada",
    "CAF": "Central African Republic",
    "TCD": "Chad",
    "CHL": "Chile",
    "CHN": "China",
    "COL": "Colombia",
    "CRI": "Costa Rica",
    "CIV": "Cote d'Ivoire",
    "HRV": "Croatia",
    "CUB": "Cuba",
    "CYP": "Cyprus",
    "DNK": "Denmark",
    "DMA": "Dominica",
    "DOM": "Dominican Republic",
    "ECU": "Ecuador",
    "EGY": "Egypt",
    "SLV": "El Salvador",
    "GNQ": "Equatorial Guinea",
    "ERI": "Eritrea",
    "EST": "Estonia",
    "ETH": "Ethiopia",
    "FJI": "Fiji",
    "FIN": "Finland",
    "FRA": "France",
    "GAB": "Gabon",
    "GMB": "Gambia",
    "GEO": "Georgia",
    "DEU": "Germany",
    "GHA": "Ghana",
    "GRC": "Greece",
    "GRD": "Grenada",
    "GTM": "Guatemala",
    "GIN": "Guinea",
    "GNB": "Guinea-Bissau",
    "GUY": "Guyana",
    "HTI": "Haiti",
    "HND": "Honduras",
    "HUN": "Hungary",
    "ISL": "Iceland",
    "IND": "India",
    "IDN": "Indonesia",
    "IRQ": "Iraq",
    "IRL": "Ireland",
    "ISR": "Israel",
    "ITA": "Italy",
    "JAM": "Jamaica",
    "JPN": "Japan",
    "JOR": "Jordan",
    "KAZ": "Kazakhstan",
    "KEN": "Kenya",
    "KOR": "Korea, South",
    "KWT": "Kuwait",
    "KGZ": "Kyrgyzstan",
    "LAO": "Laos",
    "LVA": "Latvia",
    "LBN": "Lebanon",
    "LBR": "Liberia",
    "LBY": "Libya",
    "LIE": "Liechtenstein",
    "LTU": "Lithuania",
    "LUX": "Luxembourg",
    "MDG": "Madagascar",
    "MYS": "Malaysia",
    "MDV": "Maldives",
    "MLI": "Mali",
    "MLT": "Malta",
    "MRT": "Mauritania",
    "MUS": "Mauritius",
    "MDA": "Moldova",
    "MCO": "Monaco",
    "MNG": "Mongolia",
    "MNE": "Montenegro",
    "MAR": "Morocco",
    "MOZ": "Mozambique",
    "NAM": "Namibia",
    "NPL": "Nepal",
    "NLD": "Netherlands",
    "NZL": "New Zealand",
    "NIC": "Nicaragua",
    "NER": "Niger",
    "NGA": "Nigeria",
    "NOR": "Norway",
    "OMN": "Oman",
    "PAK": "Pakistan",
    "PAN": "Panama",
    "PNG": "Papua New Guinea",
    "PRY": "Paraguay",
    "PER": "Peru",
    "PHL": "Philippines",
    "POL": "Poland",
    "PRT": "Portugal",
    "ROU": "Romania",
    "RUS": "Russia",
    "RWA": "Rwanda",
    "KNA": "Saint Kitts and Nevis",
    "LCA": "Saint Lucia",
    "VCT": "Saint Vincent and the Grenadines",
    "SMR": "San Marino",
    "SAU": "Saudi Arabia",
    "SEN": "Senegal",
    "SRB": "Serbia",
    "SYC": "Seychelles",
    "SGP": "Singapore",
    "SVK": "Slovakia",
    "SVN": "Slovenia",
    "SOM": "Somalia",
    "ZAF": "South Africa",
    "ESP": "Spain",
    "LKA": "Sri Lanka",
    "SDN": "Sudan",
    "SUR": "Suriname",
    "SWE": "Sweden",
    "CHE": "Switzerland",
    "SYR": "Syria",
    "TZA": "Tanzania",
    "THA": "Thailand",
    "TTO": "Trinidad and Tobago",
    "TUN": "Tunisia",
    "TUR": "Turkey",
    "UGA": "Uganda",
    "UKR": "Ukraine",
    "ARE": "United Arab Emirates",
    "GBR": "United Kingdom",
    "USA": "US",
    "URY": "Uruguay",
    "UZB": "Uzbekistan",
    "VEN": "Venezuela",
    "VNM": "Vietnam",
    "ZMB": "Zambia",
    "ZWE": "Zimbabwe"
   };

var trans_countries = {
    'Vietnam': 'Vietnam',
    'Austria': 'Austria',
    'Cambodia': 'Camboya',
    'Kazakhstan': 'Kazajstán',
    "Cote d'Ivoire": 'Costa de Marfil',
    'Spain': 'España',
    'Serbia': 'Serbia',
    'Ethiopia': 'Etiopía',
    'Brazil': 'Brasil',
    'Pakistan': 'Pakistán',
    'Panama': 'Panamá',
    'Syria': 'Siria',
    'France': 'Francia',
    'Germany': 'Alemania',
    'Montenegro': 'Montenegro',
    'Switzerland': 'Suiza',
    'Paraguay': 'Paraguay',
    'Holy See': 'Santa Sede',
    'Nepal': 'Nepal',
    'Norway': 'Noruega',
    'Afghanistan': 'Afganistán',
    'Djibouti': 'Yitubi',
    'Ireland': 'Irlanda',
    'United Arab Emirates': 'Emiratos Árabes Unidos',
    'Israel': 'Israel',
    'Bulgaria': 'Bulgaria',
    'Korea, South': 'Corea del Sur',
    'Cyprus': 'Chipre',
    'Peru': 'Perú',
    'Azerbaijan': 'Azerbaiyán',
    'Philippines': 'Filipinas',
    'Bahamas': 'Bahamas',
    'India': 'India',
    'MS Zaandam': 'MS Zaandam',
    'Canada': 'Canadá',
    'Rwanda': 'Ruanda',
    'Cuba': 'Cuba',
    'Thailand': 'Tailandia',
    'Brunei': 'Brunéi',
    'El Salvador': 'El Salvador',
    'North Macedonia': 'Macedonia del Norte',
    'Saint Vincent and the Grenadines': 'San Vicente y las Granadinas',
    'Jamaica': 'Jamaica',
    'Greece': 'Grecia',
    'Bolivia': 'Bolivia',
    'Dominica': 'Dominica',
    'Togo': 'Togo',
    'Mauritius': 'Mauricio',
    'Russia': 'Rusia',
    'Lebanon': 'Líbano',
    'Zimbabwe': 'Zimbabue',
    'Nigeria': 'Nigeria',
    'Finland': 'Finlandia',
    'Burma': 'Birmania',
    'Iraq': 'Irak',
    'United Kingdom': 'Reino Unido',
    'Tanzania': 'Tanzania',
    'Uruguay': 'Uruguay',
    'South Africa': 'Sudáfrica',
    'Somalia': 'Somalia',
    'Algeria': 'Argelia',
    'Benin': 'Benín',
    'Niger': 'Níger',
    'West Bank and Gaza': 'Cisjordania',
    'Uganda': 'Uganda',
    'San Marino': 'San Marino',
    'Liberia': 'Liberia',
    'Iran': 'Irán',
    'Mexico': 'México',
    'Honduras': 'Honduras',
    'Burkina Faso': 'Burkina Faso',
    'Australia': 'Australia',
    'Chile': 'Chile',
    'Haiti': 'Haití',
    'Turkey': 'Turquía',
    'Madagascar': 'Madagascar',
    'Saint Lucia': 'Santa Lucía',
    'Papua New Guinea': 'Papúa Nueva Guinea',
    'Central African Republic': 'República Centroafricana',
    'Eritrea': 'Eritrea',
    'Lithuania': 'Lituania',
    'Kyrgyzstan': 'Kirguistán',
    'Andorra': 'Andorra',
    'Laos': 'Laos',
    'Mali': 'Mali',
    'Guinea': 'Guinea',
    'Luxembourg': 'Luxemburgo',
    'Gambia': 'Gambia',
    'Mongolia': 'Mongolia',
    'Costa Rica': 'Costa Rica',
    'Trinidad and Tobago': 'Trinidad y Tobago',
    'Mauritania': 'Mauritania',
    'Antigua and Barbuda': 'Antigua y Barbuda',
    'Libya': 'Libia',
    'Zambia': 'Zambia',
    'Timor-Leste': 'Timor-Leste',
    'Guyana': 'Guayana',
    'Tunisia': 'Túnez',
    'Japan': 'Japón',
    'Liechtenstein': 'Liechtenstein',
    'Saint Kitts and Nevis': 'San Cristóbal y Nieves',
    'Senegal': 'Senegal',
    'Hungary': 'Hungría',
    'Moldova': 'Moldavia',
    'Qatar': 'Qatar',
    'US': 'Estados Unidos',
    'Belarus': 'Bielorrusia',
    'Chad': 'Chad',
    'Malaysia': 'Malasia',
    'Romania': 'Rumania',
    'Argentina': 'Argentina',
    'Belize': 'Belice',
    'Angola': 'Angola',
    'Sweden': 'Suecia',
    'China': 'China',
    'Jordan': 'Jordán',
    'Italy': 'Italia',
    'Latvia': 'Letonia',
    'Seychelles': 'Seychelles',
    'Ghana': 'Ghana',
    'Colombia': 'Colombia',
    'Albania': 'Albania',
    'Saudi Arabia': 'Arabia Saudita',
    'Estonia': 'Estonia',
    'Monaco': 'Mónaco',
    'Ukraine': 'Ucrania',
    'Uzbekistan': 'Uzbekistán',
    'Maldives': 'Maldivas',
    'Morocco': 'Marruecos',
    'Portugal': 'Portugal',
    'Kenya': 'Kenia',
    'Guatemala': 'Guatemala',
    'Gabon': 'Gabón',
    'Belgium': 'Bélgica',
    'Iceland': 'Islandia',
    'Cabo Verde': 'Cabo Verde',
    'Mozambique': 'Mozambique',
    'Indonesia': 'Indonesia',
    'Egypt': 'Egipto',
    'Taiwan*': 'Taiwán *',
    'Netherlands': 'Países Bajos',
    'Slovakia': 'Eslovaquia',
    'Bosnia and Herzegovina': 'Bosnia y Herzegovina',
    'Cameroon': 'Camerún',
    'Venezuela': 'Venezuela',
    'Kuwait': 'Kuwait',
    'Malta': 'Malta',
    'Nicaragua': 'Nicaragua',
    'Congo (Kinshasa)': 'Congo (Kinshasa)',
    'Singapore': 'Singapur',
    'Bhutan': 'Bután',
    'Bangladesh': 'Bangladesh',
    'Ecuador': 'Ecuador',
    'Georgia': 'Georgia',
    'Namibia': 'Namibia',
    'Denmark': 'Dinamarca',
    'Poland': 'Polonia',
    'Suriname': 'Surinam',
    'Slovenia': 'Eslovenia',
    'Congo (Brazzaville)': 'Congo (Brazzaville)',
    'Guinea-Bissau': 'Guinea-Bissau',
    'Dominican Republic': 'República Dominicana',
    'Diamond Princess': 'Princesa del Diamante',
    'Grenada': 'Granada',
    'Barbados': 'Barbados',
    'New Zealand': 'Nueva Zelanda',
    'Eswatini': 'Eswatini',
    'Czechia': 'Chequia',
    'Kosovo': 'Kosovo',
    'Sudan': 'Sudán',
    'Armenia': 'Armenia',
    'Bahrain': 'Bahrein',
    'Sri Lanka': 'Sri Lanka',
    'Equatorial Guinea': 'Guinea Ecuatorial',
    'Croatia': 'Croacia',
    'Oman': 'Omán',
    'Fiji': 'Fiyi',
};


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

var openIcon = new L.Icon({
	iconUrl: 'images/marker-icon-2x-gold.png',
	shadowUrl: 'images/marker-shadow.png',
	iconSize: [15, 24],
	iconAnchor: [7, 24],
	popupAnchor: [1, -34],
	shadowSize: [24, 24]
});

var closeIcon = new L.Icon({
	iconUrl: 'images/marker-icon-2x-green.png',
	shadowUrl: 'images/marker-shadow.png',
	iconSize: [15, 24],
	iconAnchor: [7, 24],
	popupAnchor: [1, -34],
	shadowSize: [24, 24]
});

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
        gen_markers: function(data){
            function getMarkerProfile(title, pro, mun) {
                var t = '';
                t += '<div class="small-pname"><span class="bd">' + title + '</span></div>';
                t += '<div class="small-content"><span class="bd">' + pro + '</span> - <span>' + mun + '</span></div>';
                t += '<div class="small-plink">&nbsp;</div>';
                return t;
            }
            for(var i in data.eventos){
                event = data.eventos[i];
                if(event['lat']===0 && event['lon']===0){
                    continue;
                }
                if(event['abierto']===false){
                    var marker = L.marker([event['lat'],event['lon']],{icon: closeIcon,
                        title: event['identificador'], riseOnHover: true});
                }else{
                    var marker = L.marker([event['lat'],event['lon']],{icon: openIcon,
                        title: event['identificador'], riseOnHover: true});
                }
                if(event['dpacode_provincia'] in markers){
                    markers[event['dpacode_provincia']].push(marker);
                }else{
                    markers[event['dpacode_provincia']]=[];
                    markers[event['dpacode_provincia']].push(marker);
                }
                marker.bindPopup(getMarkerProfile(event['identificador'],event['provincia'],event['municipio']));

            }
        },
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
            $selector_span.html('Distribución por');
            $('[data-class]').each(function () {
                $(this).attr('class', $(this).data('class'));
            });
            if ($locator.val() !== 'cuba') {
                $selector_span.html('Distribución por municipios en ' + $locator.find('option[value="' + $locator.val() + '"]').html());
                $cards.hide();
                $selector.val("map-mun");
                $selector.hide();
                $('[data-class]').attr('class', '');
            }
            $('[data-content=diagno]').html('<i class="fa fa-spinner fa-spin"></i>');
            $('[data-content=activo]').html('<i class="fa fa-spinner fa-spin"></i>');
            $('[data-content=fallec]').html('<i class="fa fa-spinner fa-spin"></i>');
            $('[data-content=evacua]').html('<i class="fa fa-spinner fa-spin"></i>');
            $('[data-content=recupe]').html('<i class="fa fa-spinner fa-spin"></i>');

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

let factor = 150, muns = [], pros = [], genInfo = {}, $selector = $('#select-map'), $selector_span = $selector.closest('.card').find('.card-header label'), $locator = $('#location-select');

function logx(base, x) {
    return (base === 10) ? Math.log10(x) : Math.log10(x) / Math.log10(base);
}

function run_calculations() {
    let province_id = $locator.val();
    let general_view = $locator.val() === 'cuba';
    if (general_view)
        province_id = $selector.val();

    $.walker.view.update();
    let contagio = {
        'importado': 0,
        'introducido': 0,
        'autoctono': 0,
        'desconocido': 0
    };

    $.walker.load("data/oxford-indexes.json", function (oxford_index) {
        $.walker.load("data/covid19-cuba.json", function (data) {
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

                let nre_id = 'cu';
                if (!(general_view)){
					nre_id = provinces_codes[province_id];
				}

				if (nre_id in data['numero-reproductivo']){
					var nre_dates = ['Fecha'].concat(data['numero-reproductivo'][nre_id]['dates']);
					var nre_value = ['Número Reproductivo Efectivo'].concat(data['numero-reproductivo'][nre_id]['value']);
					var nre_lower = ['Margen inferior'].concat(data['numero-reproductivo'][nre_id]['lower']);
					var nre_upper = ['Margen superior'].concat(data['numero-reproductivo'][nre_id]['upper']);
					c3.generate({
						bindto: "#repnumber-chart",
						data: {
							x: nre_dates[0],
							columns: [
								nre_dates,
								nre_value,
								nre_lower,
								nre_upper
							],
							type: 'line',
							colors: {
								'Número Reproductivo Efectivo': '#B01E22',
								'Margen inferior': '#D0797C',
								'Margen superior': '#D0797C'
							}
						},
						axis: {
							x: {
								padding: {
							      left: 1,
							      right: 1
							    },
								label: 'Fecha',
								type: 'categorical',
								tick: {
									values: [0,nre_dates.length/2,nre_dates.length-2]
								}
							},
							y: {
								label: 'Número Reproductivo Efectivo',
								position: 'outer-middle',
							}
						}
						,
					    grid: {
					        y: {
					            lines: [
					                {value: 1, text: ''}
					            ]
					        }
					    }
					});
				} else {
					$('#repnumber-chart').html('<h2 id="repnumber_nodata"><span>No hay datos suficientes para su cálculo</span></h2>');
				}

                $.walker.map.gen_markers(data);

                $.walker.load("data/municipios.geojson", function (municipios) {
                    $.walker.municipality.list = municipios;
                    muns = $.walker.municipality.filterByProvince(province_id);

                    /*var curves = {};
                    var curves_recover = {};
                    var curves_death = {};
                    var curves_active = {};
                    var curves_daily = {};*/

                    function getCountryFromDomain(dom) {
                        if (dom in domains) {
                            return domains[dom];
                        }
                        if (dom === 'unknown') {
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
                        var total_tests = 0;

                        for (var day in data.casos.dias) {
                            if ('diagnosticados' in data.casos.dias[day]) {
                                var diag = data.casos.dias[day].diagnosticados;
                                for (var p in diag) {
                                    cases[diag[p].id] = diag[p];
                                    cases[diag[p].id]['fecha'] = data.casos.dias[day].fecha;

                                    if (!(diag[p].dpacode_municipio_deteccion in muns))
                                        continue;

                                    muns[diag[p].dpacode_municipio_deteccion].total++;
                                    pros[diag[p].dpacode_provincia_deteccion].total++;

                                    //cuban/no cuban
                                    if (diag[p].pais === 'cu') {
                                        total_cu += 1;
                                    } else {
                                        if (diag[p].pais === 'unknown') {
                                            total_unk += 1;
                                        } else {
                                            total_no_cu += 1;
                                        }
                                    }

                                    //sex
                                    if (diag[p].sexo === 'hombre') {
                                        sex_male += 1;
                                    } else {
                                        if (diag[p].sexo === 'mujer') {
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
                                    } else if ((diag[p].edad >= 0) && (diag[p].edad < 10)) {
                                        ages['0-9'] += 1
                                    } else if ((diag[p].edad >=10) && (diag[p].edad < 20)) {
                                        ages['10-19'] += 1
                                    } else if ((diag[p].edad >= 20) && (diag[p].edad < 30)) {
                                        ages['20-29'] += 1
                                    } else if ((diag[p].edad >= 30) && (diag[p].edad < 40)) {
                                        ages['30-39'] += 1
                                    } else if ((diag[p].edad >= 40) && (diag[p].edad < 50)) {
                                        ages['40-49'] += 1
                                    } else if ((diag[p].edad >= 50) && (diag[p].edad < 60)) {
                                        ages['50-59'] += 1
                                    } else if ((diag[p].edad >= 60) && (diag[p].edad < 70)) {
                                        ages['60-69'] += 1
                                    } else if ((diag[p].edad >= 70) && (diag[p].edad < 80)) {
                                        ages['70-79'] += 1
                                    } else {
                                        ages['80 o más'] += 1
                                    }

                                    //contagio
                                    if (diag[p].contagio == null) {
                                        contagio.desconocido += 1;
                                    } else {
                                        contagio[diag[p].contagio] += 1;
                                    }

                                }
                            }
                            if ('muertes_numero' in data.casos.dias[day] && general_view) {
                                deaths += data.casos.dias[day].muertes_numero;
                            }
                            if ('evacuados_numero' in data.casos.dias[day] && general_view) {
                                gone += data.casos.dias[day].evacuados_numero;
                            }
                            if ('recuperados_numero' in data.casos.dias[day] && general_view) {
                                recov += data.casos.dias[day].recuperados_numero;
                            }

                            if ('tests_total' in data.casos.dias[day] && general_view) {
                                if (total_tests <= data.casos.dias[day].tests_total) {
                                    total_tests = data.casos.dias[day].tests_total;
                                }
                            }
                        }

                        //Bar for countries
                        var country = ['País'];
                        var countryDiagnoses = ['Diagnosticados'];
                        for (var c in countries) {
                            if (c !== 'cu') {
                                country.push(getCountryFromDomain(c));
                                countryDiagnoses.push(countries[c]);
                            }
                        }

                        $("#countries-info-sep").attr('class', 'w-100 d-none d-sm-block');
                        $("#countries-info").closest('section').show();
                        $('#topmuni').css({'margin-left': '7px'});
                        if (countryDiagnoses.length === 1) {
                            $("#countries-info").closest('section').hide();
                            $("#countries-info-sep").attr('class', '');
                        } else {
                            if (!general_view)
                                $('#topmuni').css({'margin-left': '15px'});
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
                        var dailyActive = ['Casos activos'];
                        var dailyPorcientoPositivoAcumulado = ['% de Tests Positivos Acumulados'];
                        var dailyPorcientoPositivo = ['% de Tests Positivos en el Día'];
                        var cuba = ['Cuba'];
                        var deadsSum = ['Total de fallecidos'];
                        var deadsSingle = ['Fallecidos en el día'];
                        var recoversSum = ['Altas acumuladas'];
                        var recoversSingle = ['Altas en el día'];
                        var test_days = [];
                        var test_negative = [];
                        var test_positive = [];
                        var test_cases = [];
                        var total = 0;
                        //var active = 0;
                        var deads = 0;
                        var recover = 0;
                        var evac = 0;
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

                            if ('diagnosticados' in data.casos.dias[i]) {
                                let report_day = 0;
                                for (const j in data.casos.dias[i].diagnosticados) {
                                    if (data.casos.dias[i].diagnosticados[j].dpacode_municipio_deteccion in muns) {
                                        report_day++;
                                        let tt = munscurves[data.casos.dias[i].diagnosticados[j].dpacode_municipio_deteccion]['data'].length;
                                        munscurves[data.casos.dias[i].diagnosticados[j].dpacode_municipio_deteccion]['data'][tt - 1]++;
                                    }
                                    if (data.casos.dias[i].diagnosticados[j].dpacode_provincia_deteccion in pros) {
                                        let tt = proscurves[data.casos.dias[i].diagnosticados[j].dpacode_provincia_deteccion]['data'].length;
                                        proscurves[data.casos.dias[i].diagnosticados[j].dpacode_provincia_deteccion]['data'][tt - 1]++;
                                    }
                                }

                                dailySingle.push(report_day);
                                total += report_day;
                            } else {
                                dailySingle.push(0);
                            }
                            if ('tests_total' in data.casos.dias[i] && general_view) {
                                test_days.push(data.casos.dias[i].fecha.replace('2020/', ''));
                                test_cases.push(data.casos.dias[i].tests_total);
                                test_negative.push(data.casos.dias[i].tests_total - total);
                                test_positive.push(total);
                            }
                            if ('recuperados_numero' in data.casos.dias[i] && general_view) {
                                recover += data.casos.dias[i].recuperados_numero;
                                recoversSingle.push(data.casos.dias[i].recuperados_numero);
                            } else {
                                recoversSingle.push(0);
                            }
                            if ('muertes_numero' in data.casos.dias[i] && general_view) {
                                deads += data.casos.dias[i].muertes_numero;
                                deadsSingle.push(data.casos.dias[i].muertes_numero);
                            } else {
                                deadsSingle.push(0);
                            }
                            if ('evacuados_numero' in data.casos.dias[i] && general_view) {
                                evac += data.casos.dias[i].evacuados_numero;
                            }

                            dailySum.push(total);
                            dailyActive.push(total - (recover + deads + evac));
                            recoversSum.push(recover);
                            deadsSum.push(deads);
                            cuba.push(total);
                        }

                        // Por ciento de Tests Positivos en el Día y Acumulado

                        for (var i = 1; i < test_days.length; i++) {
                            dailyPorcientoPositivo.push(((test_positive[i] - test_positive[i - 1]) * 100.0 / (test_cases[i] - test_cases[i - 1])).toFixed(2));
                            dailyPorcientoPositivoAcumulado.push((test_positive[i] * 100.0 / test_cases[i]).toFixed(2));
                        }

                        var ntest_days = ['Fecha'];
                        var ntest_negative = ['Tests Negativos'];
                        var ntest_positive = ['Tests Positivos'];
                        var ntest_cases = ['Total de Tests en el día'];
                        for (var i = 1; i < test_cases.length; i++) {
                            ntest_days.push(test_days[i]);
                            ntest_cases.push(test_cases[i] - test_cases[i - 1]);
                            ntest_negative.push(test_negative[i] - test_negative[i - 1]);
                            ntest_positive.push(test_positive[i] - test_positive[i - 1]);
                        }
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

                        tests = c3.generate({
                            bindto: "#tests-line-info",
                            data: {
                                x: ntest_days[0],
                                columns: [
                                    ntest_days,
                                    //ntest_negative,
                                    ntest_positive,
                                    ntest_cases
                                ],
                                type: 'line',
                                //groups: [['Tests Negativos', 'Tests Positivos']],
                                colors: {
                                    //'Tests Negativos': '#1C1340',
                                    'Tests Positivos': '#B01E22',
                                    'Total de Tests en el día': '#1A8323'
                                }
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: 'Tests en el día',
                                    position: 'outer-middle'
                                }
                            }
                        });

                        let index_days = [];
                        for(var d in oxford_index.data){
                            index_days.push(d.replace(/-/g,'/').replace('2020/',''));
                        }
                        index_days.sort();
                        let index_values_cuba_all = [];
                        let index_values_cuba_legacy_all = [];
                        let index_last_value = 0;
                        let index_last_value_legacy = 0;

                        for(var i in index_days){
                            var idx = '2020-'+index_days[i].replace('/','-');
                            if ('CUB' in oxford_index.data[idx]){
                                var val = oxford_index.data[idx].CUB.stringency;
                                index_values_cuba_all.push(val);
                                index_last_value = val;
                                val = oxford_index.data[idx].CUB['stringency_legacy_disp'];
                                index_values_cuba_legacy_all.push(val);
                                index_last_value_legacy = val;
                            } else {
                                index_values_cuba_all.push(null);
                                index_values_cuba_legacy_all.push(null);
                            }
                        }
                        $('#stringencycub-idx').html(index_last_value);


                        let index_slice2 = index_days.length-cuba.length-1;
                        index_slice2 = Math.max(index_slice2,0);
                        stringency = c3.generate({
                            bindto: "#stringencycub-evol",
                            data: {
                                x: 'Fecha',
                                columns: [
                                    ['Fecha'].concat(index_days.slice(index_slice2)),
                                    ['Stringency actual (v2)'].concat(index_values_cuba_all.slice(index_slice2)),
                                    ['Stringency previo (v1)'].concat(index_values_cuba_legacy_all.slice(index_slice2)),
                                    //['Casos confirmados'].concat(cuba),
                                ],
                                type: 'line',
                                colors: {
                                    'Stringency actual (v2)': '#B01E22',
                                    'Stringency previo (v1)': '#1C1340'//,
                                    //'Casos confirmados': '#1C1340'
                                },
                                axes: {
                                    Stringency: 'y',
                                    Confirmados: 'y2',
                                    Stringency_legacy: 'y',
                                }
                            },
                            axis: {
                                x: {
									padding: {
								      left: 1,
								      right: 1
								    },
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: {
                                        text: 'Valor del índice',
                                        position: 'outer-middle'
                                    }
                                },
                                //y2: {
                                    //show: true,
                                    //label: {
                                        //text: 'Casos confirmados',
                                        //position: 'outer-middle'
                                    //}
                                //}
                            },
								grid: {
									x: {
										lines: [
											{'value': '03/11' , 'text': 'Primeros casos confirmados'},
											{'value': '03/20' , 'text': 'Anuncio de medidas generalizadas'},
											{'value': '03/24' , 'text': 'Fronteras reguladas y cierre de escuelas'},
											//{'value': '03/25' , 'text': 'Cierre de universidades'},
											{'value': '04/11' , 'text': 'Cese de trasnporte público'}
										]
									}
								}
                        });

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
                                        label: 'Casos',
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
                                        label: 'Casos',
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
                                        label: 'Casos',
                                        position: 'outer-middle'
                                    }
                                }
                            });
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
                                        label: 'Casos',
                                        position: 'outer-middle'
                                    }
                                }
                            });
                        });

                        let colors = {
                            'Casos en el día': '#00577B',
                            'Casos acumulados': '#D0797C'
                        };

                        let columns = [
                            dates,
                            dailySingle,
                            dailySum,
                        ];

                        if (general_view) {
                            colors['Casos activos'] = '#B11116';
                            columns.push(dailyActive);
                        }

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
                                    label: 'Casos',
                                    position: 'outer-middle',
                                }
                            }
                        });

                        let porciento = [
                            ntest_days,
                            dailyPorcientoPositivoAcumulado,
                            dailyPorcientoPositivo,
                        ];

                        c3.generate({
                            bindto: "#daily-porciento-positivos",
                            data: {
                                x: ntest_days[0],
                                columns: porciento,
                                type: 'line',
                                colors: {
                                    '% de Tests Positivos Acumulados': '#1C1340',
                                    '% de Tests Positivos en el Día': '#B01E22'
                                }
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: 'Por ciento (%)',
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
                                    'Fallecidos en el día': '#00577B',
                                    'Total de fallecidos': '#1C1340'
                                }
                            },
                            axis: {
                                x: {
                                    label: 'Fecha',
                                    type: 'categorical',
                                    show: false
                                },
                                y: {
                                    label: 'Fallecidos',
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
                        
                        c3.generate({
                            bindto: "#daily-actalt-info",
                            data: {
                                x: dates[0],
                                columns: [
                                    dates,
                                    dailyActive,
                                    recoversSum
                                ],
                                type: 'line',
                                colors: {
                                    'Casos activos': '#B01E22',
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
                                    label: 'Casos',
                                    position: 'outer-middle'
                                }
                            }
                        });

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
                                    label: 'Casos',
                                    position: 'outer-middle'
                                }
                            }
                        });
                        
                        //Donut for cases info
						c3.generate({
							bindto: "#cases-pie-info",
							data: {
								columns: [['Fallecidos', deaths], ['Evacuados', gone], ['Recuperados', recov],['Activos', Object.keys(cases).length - (deaths+gone+recov)]],
								type: 'donut',
								colors: {
									'Fallecidos': '#1C1340',
									'Evacuados': '#939393',
									'Recuperados': '#00AEEF',
									'Activos': '#B11116'
								}
							},
							donut: {
								title: Object.keys(cases).length + " casos",
							}
						});

                        return {"cases": cases, "deaths": deaths, "gone": gone, "recov": recov, "female": sex_female, "male": sex_male, "unknownsex": sex_unknown};
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
                            'total': total,
                            "deaths": globalInfo.deaths,
                            "gone": globalInfo.gone,
                            "recov": globalInfo.recov,
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

                    $('[data-content=diagno]').html(genInfo.total);
                    $('[data-content=activo]').html(genInfo.deaths + genInfo.gone + genInfo.recov ? genInfo.total - (genInfo.deaths + genInfo.gone + genInfo.recov) : '-');
                    $('[data-content=fallec]').html(genInfo.deaths ? genInfo.deaths : '-');
                    $('[data-content=evacua]').html(genInfo.gone ? genInfo.gone : '-');
                    $('[data-content=recupe]').html(genInfo.recov ? genInfo.recov : '-');
                    
                    

                    function getMunProfile(code, mun, pro) {
                        var t = '';
                        t += '<div class="small-pname"><span class="bd">' + pro + '</span> - <span>' + mun + '</span></div>';
                        if (code in muns) {
                            if (muns[code].total)
                                t += '<div class="small-content"><span class="bd">Diagnosticados:</span> <span>' + muns[code].total + '</span></div>';
                            else
                                t += '<div class="small-content">No hay casos diagnosticados</div>';
                        }
                        t += '<div class="small-plink">&nbsp;</div>';

                        return t;
                    }

                    function getProProfile(code, pro) {
                        var t = '';
                        t += '<div class="small-pname"><span class="bd">' + pro + '</span></div>';
                        if (code in pros) {
                            if (pros[code].total)
                                t += '<div class="small-content"><span class="bd">Diagnosticados:</span> <span>' + pros[code].total + '</span></div>';
                            else
                                t += '<div class="small-content">Sin casos reportados aún</div>';
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
                                return "rgba(176,30,34," + opac + ")";
                            }
                        }
                        return '#D1D2D4';
                    }

                    function getColorP(code) {
                        if (code in pros) {
                            if (pros[code].total > 0) {
                                var opac = logx(factor, pros[code].total * factor / genInfo.max_pros);
                                return "rgba(176,30,34," + opac + ")";
                            }
                        }
                        return '#D1D2D4';
                    }

                    let province_code = -1;
                    if(general_view===false){
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

                });

            });
        });
    });

}

$('[data-class]').each(function () {
    $(this).data('class', $(this).attr('class'));
});

let $cards = $('[data-content=activo],[data-content=fallec],[data-content=evacua],[data-content=recupe]').parent();
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
