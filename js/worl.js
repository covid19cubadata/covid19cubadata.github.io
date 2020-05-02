
var countries_codes = {
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

$.c3 = c3;

var cuba_population = 11209628;

function paint_comparison(label, c1, c2, c3, y_conf=null, x_conf=null){
    var yconfig = {
        label: 'Casos',
        position: 'outer-middle'
    };
    if(y_conf){
        yconfig=y_conf;
    }
    var xconfig =   {
        label: 'Fecha',
        type: 'categorical',
        show: false
    };
    if(x_conf){
        yconfig=x_conf;
    }
    var comparison = $.c3.generate({
        bindto: label,
        data: {
            x: c1[0],
            columns: [
                c1,
                c2,
                c3
            ],
            type: 'line',
            colors: {
                'Cuba': '#B01E22'
            }
        },
        axis: {
            x: xconfig,
            y: yconfig
        }
    });
    return comparison;
}

function paint_curve(label, c1, c2, c3, lines_data, y_conf=null){
    var yconfig = {
        label: 'Casos',
        position: 'outer-middle'
    };
    if(y_conf){
        yconfig=y_conf;
    }
    var curve = $.c3.generate({
        bindto: label,
        data: {
            x: 'Días',
            columns: [
                c1,
                c2,
                c3,
            ],
            type: 'line',
            colors: {
                'Cuba': '#B01E22'
            },
        },
        axis: {
            x: {
                label: 'Fecha',
                type: 'categorical',
                show: false
            },
            y: yconfig
        },
        grid: {
            x: {
                lines: [{'value': lines_data[lines_data.length - 1], 'text': lines_data[lines_data.length - 1]}]
            }
        }
    });
    return curve;
}

function paint_comparison_countries(label, x_data, col_data, type_plot='line', y_conf=null, x_conf=null, points_cfg=null,tooltip_cfg=null){
    var yconfig = {
        label: 'Casos nuevos  (log scale)',
        position: 'outer-middle'
    };
    if(y_conf){
        yconfig=y_conf;
    }
    var xconfig = {
        label: "Casos confirmados (log scale)",
        tick: {
            format: d3.format('.1f')
        }
    };
    if(x_conf){
        xconfig=x_conf;
    }
    points = {};
    if(points_cfg){
        points=points_cfg;
    }
    tooltip = {
        show: false
    };
    if(tooltip_cfg){
        tooltip=tooltip_cfg;
    }
    var comparison = $.c3.generate({
        bindto: label,
        data: {
            xs: x_data,
            columns: col_data,
            type: type_plot,
            colors: {
                'Cuba': '#B01E22'
            }
        },
        point: points,
        tooltip: tooltip,
        axis: {
            x: xconfig,
            y: yconfig
        }
    });
    return comparison;
}

function scatter_plot(label, x_data, col_data){
    xconf = {
        label: {
            text: 'Tests por millón de habitantes',
            position: 'outer-middle'
        },
        tick: {
            format: d3.format('.0f')
        }
    };
    yconf = {
        label: {
            text: '% de tests positivos',
            position: 'outer-middle'
        },
        tick: {
            format: d3.format('.0f')
        }
    };
    points = {
        r: function(d) {
            if(d['id']==='Cuba')
                return 10;
            return 5;
        }
    };
    tooltip={
        format: {
            title: function (d) {return 'Test por millón de habitantes ' + d3.format('.0f')(d); },
            value: function (value, ratio, id) {
                return d3.format('.2f')(value)+'%';
            }
//            value: d3.format(',') // apply this format to both y and y2
        }
    };
    return paint_comparison_countries(label, x_data, col_data, 'scatter', yconf, xconf, points, tooltip);
}

function scaleX(num) {
    if (num === 0) {
        return 0;
    }
    return Math.log10(num);
}

function scaleY(num) {
    if (num === 0) {
        return 0;
    }
    return Math.log10(num);
}

function load(url, callback) {
    cache = false;
    $.ajax({
        url: url,
        dataType: 'json',
        cache: cache,
        success: callback
      });
}

function run_calculations() {

    var curves = {};
    var curves_recover = {};
    var curves_death = {};
    var curves_active = {};
    var curves_daily = {};
    var curves2 = {};
    var countrysorted2 = [];

    load("data/paises-info-dias.json", function (countriesdays) {
        load("data/covid19-cuba.json", function (data) {

            var dias = ['Días'];
            var cuba = ['Cuba'];
            var dailyActive = ['Casos activos'];
            var dailySum = ['Casos acumulados'];
            var deadsSum = ['Muertes acumuladas'];
            var recoversSum = ['Altas acumuladas'];
            var dailySingle = ['Casos en el día'];
            var total = 0;
            var deads = 0;
            var recover = 0;
            var evac = 0;
            let weeksum = 0;
            let prevweek = 0;
            var weeks_cuba = ['Cuba'];
            var accum_cuba = ['Confirmados-Cuba'];
            var test_cases_per_million = ['Cuba-per-million'];
            var test_effective = ['Cuba']

            for (var i = 1; i <= Object.keys(data.casos.dias).length; i++) {
                dias.push('Día ' + i);
                if ('diagnosticados' in data.casos.dias[i]) {
                    let report_day = 0;
                    for (const j in data.casos.dias[i].diagnosticados) {
                            report_day++;
                    }
                    dailySingle.push(report_day);
                    total += report_day;
                }else{
                    dailySingle.push(0);
                }
                if ('recuperados_numero' in data.casos.dias[i]) {
                    recover += data.casos.dias[i].recuperados_numero;
                }
                if ('muertes_numero' in data.casos.dias[i]) {
                    deads += data.casos.dias[i].muertes_numero;
                }
                if ('evacuados_numero' in data.casos.dias[i]) {
                    evac += data.casos.dias[i].evacuados_numero;
                }
                if (i % 7 === 0) {
                    let ttotal = dailySum[dailySum.length-1];
                    if (ttotal > 30) {
                        weeksum = ttotal - prevweek;
                        weeks_cuba.push(scaleY(weeksum));
                        weeksum = 0;
                        accum_cuba.push(scaleX(ttotal));
                        prevweek = ttotal;
                    }
                }
                if ('tests_total' in data.casos.dias[i]) {
                    test_cases_per_million.push(data.casos.dias[i].tests_total/cuba_population*10**6);
                    test_effective.push(total/data.casos.dias[i].tests_total*100);
                }
                dailySum.push(total);
                dailyActive.push(total - (recover + deads + evac));
                recoversSum.push(recover);
                deadsSum.push(deads);
                cuba.push(total);
            }
            test_cases_per_million = ['Cuba-per-million',test_cases_per_million[test_cases_per_million.length-1]];
            test_effective = ['Cuba', test_effective[test_effective.length-1]];

            var countrysorted = [];
            for (var c in countriesdays.paises_info) {
                let c_trans = c in trans_countries ? trans_countries[c] : c;
                let weeksum = 0;
                let weeks = [c_trans];
                let accum = ['Confirmados-' + c_trans];
                let prevweek = 0;
                let ctotal = 0;
                //if ((countriesdays.paises_info[c].confirmed.length + 1) >= cuba.length) {
                    if (!(c in trans_countries))
                        trans_countries[c] = c;
                    let c_temp = [trans_countries[c]];
                    let c_r_temp = [trans_countries[c]];
                    let c_d_temp = [trans_countries[c]];
                    let c_a_temp = [trans_countries[c]];
                    let c_day_temp = [trans_countries[c]];
                    let d_temp = ['Días'];
                    for (var i = 0; i < countriesdays.paises_info[c].confirmed.length; i++) {
                        c_temp.push(countriesdays.paises_info[c].confirmed[i]);
                        c_r_temp.push(countriesdays.paises_info[c].recovered[i]);
                        c_d_temp.push(countriesdays.paises_info[c].deaths[i]);
                        c_a_temp.push(countriesdays.paises_info[c].confirmed[i] -
                            countriesdays.paises_info[c].deaths[i] -
                            countriesdays.paises_info[c].recovered[i]);
                        if (i > 0) {
                            c_day_temp.push(countriesdays.paises_info[c].confirmed[i] -
                                countriesdays.paises_info[c].confirmed[i - 1]);
                        } else {
                            c_day_temp.push(countriesdays.paises_info[c].confirmed[i]);
                        }
                        d_temp.push('Día ' + (i + 1));
                        ctotal = countriesdays.paises_info[c].confirmed[i];
                        crecovered = countriesdays.paises_info[c].recovered[i];
                        cdeaths = countriesdays.paises_info[c].deaths[i];
                        if (i % 7 === 0) {
                            total = countriesdays.paises_info[c].confirmed[i - 1];
                            if (total > 30) {
                                weeksum = total - prevweek;
                                weeks.push(scaleY(weeksum));
                                weeksum = 0;
                                accum.push(scaleX(total));
                                prevweek = total;
                            }
                        }
                    }
                    curves[trans_countries[c]] = {'dias': d_temp, 'data': c_temp};
                    curves_recover[trans_countries[c]] = {'dias': d_temp, 'data': c_r_temp};
                    curves_death[trans_countries[c]] = {'dias': d_temp, 'data': c_d_temp};
                    curves_active[trans_countries[c]] = {'dias': d_temp, 'data': c_a_temp};
                    curves_daily[trans_countries[c]] = {'dias': d_temp, 'data': c_day_temp};
                    countrysorted.push(trans_countries[c]);
                    curves2[c_trans] = {'weeks': weeks, 'cummulative_sum': accum, 'total': total, 'ctotal': ctotal, 'crecovered': crecovered, 'cdeaths': cdeaths};
                    if(c_trans!=='Cuba')
                    countrysorted2.push(c_trans);
                //} else{
                    //for (var i = 1; i < countriesdays.paises_info[c].confirmed.length; i++) {
                        //ctotal = countriesdays.paises_info[c].confirmed[i];
                        //crecovered = countriesdays.paises_info[c].recovered[i];
                        //cdeaths = countriesdays.paises_info[c].deaths[i];
                        //if (i % 7 === 0) {
                            //total = countriesdays.paises_info[c].confirmed[i - 1];
                            //if (total > 30) {
                                //weeksum = countriesdays.paises_info[c].confirmed[i - 1] - prevweek;
                                //weeks.push(scaleY(weeksum));
                                //weeksum = 0;
                                //accum.push(scaleX(total));
                                //prevweek = countriesdays.paises_info[c].confirmed[i - 1];
                            //}
                        //}
                    //}
                    //curves2[c_trans] = {'weeks': weeks, 'cummulative_sum': accum, 'total': total, 'ctotal': ctotal, 'crecovered': crecovered, 'cdeaths': cdeaths};
                    //if(c_trans!=='Cuba')
                        //countrysorted2.push(c_trans);
                //}
            }
            curves2['Cuba']['weeks']=weeks_cuba;
            curves2['Cuba']['cummulative_sum']=accum_cuba;
            curves2['Cuba']['ctotal']=cuba[cuba.length-1];
            curves2['Cuba']['crecovered']=recoversSum[recoversSum.length-1];
            curves2['Cuba']['cdeaths']=deadsSum[deadsSum.length-1];

            countrysorted.sort();

            let index_days = [];
            for(var d in countriesdays.indexes.data){
                index_days.push(d.replace(/-/g,'/').replace('2020/',''));
            }
            index_days.sort();
            let index_values_cuba = [];
            let index_values_cuba_all = [];
            let verif=false;
            let stringency_countries = [];
            for(var i=0;i<countriesdays.indexes.countries.length;i++){
                if(countriesdays.indexes.countries[i] in countries_codes){
                    stringency_countries.push(countriesdays.indexes.countries[i]);
                }
            }
            var curves_stringency = {};
            for(var i in index_days){
                var idx = '2020-'+index_days[i].replace('/','-');
                var idx2 = idx.replace(/-/g,'/');
                if(!verif && idx2==='2020/03/11'){verif=true;}
                if(verif && index_values_cuba.length<=(cuba.length-1)){
                    if ('CUB' in countriesdays.indexes.data[idx]){
                        var val = countriesdays.indexes.data[idx].CUB.stringency;
                        index_values_cuba.push(val);
                        index_last_value = val;
                    } else {
                        index_values_cuba.push(null);
                    }
                }
                if ('CUB' in countriesdays.indexes.data[idx]){
                    var val = countriesdays.indexes.data[idx].CUB.stringency;
                    index_values_cuba_all.push(val);
                } else {
                    index_values_cuba_all.push(null);
                }
                for(var j=0;j<stringency_countries.length;j++){
                    let code = stringency_countries[j];
                    let name = trans_countries[countries_codes[code]];
                    if(code in countriesdays.indexes.data[idx]){
                        if(name in curves_stringency){
                            curves_stringency[name]['data'].push(countriesdays.indexes.data[idx][code].stringency);
                        }else{
                            curves_stringency[name]={data: [countriesdays.indexes.data[idx][code].stringency]};
                        }
                    }else{
                        if(name in curves_stringency){
                            curves_stringency[name]['data'].push(null);
                        }else{
                            curves_stringency[name]={data: [null]};
                        }
                    }
                }
            }
            for(var cid in curves_stringency){
                curves_stringency[cid]['data']=curves_stringency[cid]['data'].slice(1);
            }

            for (var c = 0; c < countrysorted.length; c++) {
                let cc = curves[countrysorted[c]]['data'][0];
                $('#countrycurve-select').append('<option value="' + cc + '">' + cc + '</option>');
            }

            var tab_selected = 'confirmados';
            var countryselected = 'Hungría';
            $('#countrycurve-select').val(countryselected);
            $('.countries-date').html(countriesdays['dia-actualizacion']);

            $('#countrycurve-select').off('change').on('change', function () {
                var val = $('#countrycurve-select').val();
                countryselected = val;
                if (tab_selected == 'confirmados') {
                    comparison = paint_comparison("#countries-comparison-confirmados",dias,cuba,curves[countryselected]['data']);
                    curve = paint_curve("#countries-curve-confirmados", curves[countryselected]['dias'], curves[countryselected]['data'], cuba, dias);
                }
                if (tab_selected == 'recuperados') {
                    comparison_recover = paint_comparison("#countries-comparison-recuperados", dias, ['Cuba'].concat(recoversSum.slice(1)), curves_recover[countryselected]['data']);
                    curve_recover = paint_curve("#countries-curve-recuperados", curves_recover[countryselected]['dias'], curves_recover[countryselected]['data'], ['Cuba'].concat(recoversSum.slice(1)), dias);
                }
                if (tab_selected == 'fallecidos') {
                    comparison_death = paint_comparison("#countries-comparison-fallecidos", dias, ['Cuba'].concat(deadsSum.slice(1)), curves_death[countryselected]['data']);
                    curve_death = paint_curve("#countries-curve-fallecidos", curves_death[countryselected]['dias'], curves_death[countryselected]['data'], ['Cuba'].concat(deadsSum.slice(1)),dias);
                }
                if (tab_selected == 'activos') {
                    comparison_active = paint_comparison("#countries-comparison-activos", dias, ['Cuba'].concat(dailyActive.slice(1)), curves_active[countryselected]['data']);
                    curve_active = paint_curve("#countries-curve-activos", curves_active[countryselected]['dias'], curves_active[countryselected]['data'], ['Cuba'].concat(dailyActive.slice(1)), dias);
                }
                if (tab_selected == 'diarios') {
                    comparison_daily = paint_comparison("#countries-comparison-diarios", dias, ['Cuba'].concat(dailySingle.slice(1)), curves_daily[countryselected]['data']);
                    curve_daily = paint_curve("#countries-curve-diarios", curves_daily[countryselected]['dias'], curves_daily[countryselected]['data'], ['Cuba'].concat(dailySingle.slice(1)), dias);

                }
                if(tab_selected=='stringency'){
                    if(countryselected in curves_stringency){
                        $('#countries-curve-stringency-no-data').hide();
                        $('#countries-curve-stringency-no-data2').hide();
                        $('#countries-curve-stringency').show();
                        $('#countries-comparison-stringency').show();
                        let index_slice = curves_stringency[countryselected]['data'].length-curves[countryselected]['data'].length;
                        index_slice = Math.max(index_slice,0);
                        curve_stringency = paint_curve("#countries-curve-stringency", curves[countryselected]['dias'], [countryselected].concat(curves_stringency[countryselected]['data'].slice(index_slice)), ['Cuba'].concat(index_values_cuba).slice(0,index_values_cuba.length), dias, {label: 'Valor del índice', position: 'outer-middle' });
                        comparison_stringency = paint_comparison("#countries-comparison-stringency", dias, ['Cuba'].concat(index_values_cuba), [countryselected].concat(curves_stringency[countryselected]['data'].slice(index_slice)),{label: 'Valor del índice', position: 'outer-middle' });
                    }else{
                        $('#countries-curve-stringency').hide();
                        $('#countries-comparison-stringency').hide();
                        $('#countries-curve-stringency-no-data').show();
                        $('#countries-curve-stringency-no-data2').show();
                    }
                }
            });

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                e.target // newly activated tab
                e.relatedTarget // previous active tab
                let reff = e.target.attributes.href.value;
                if (reff == '#tab-confirmados') {
                    tab_selected = 'confirmados';
                    comparison = paint_comparison("#countries-comparison-confirmados",dias,cuba,curves[countryselected]['data']);
                    curve = paint_curve("#countries-curve-confirmados", curves[countryselected]['dias'], curves[countryselected]['data'], cuba, dias);
                }
                if (reff == '#tab-recuperados') {
                    tab_selected = 'recuperados';
                    comparison_recover = paint_comparison("#countries-comparison-recuperados", dias, ['Cuba'].concat(recoversSum.slice(1)), curves_recover[countryselected]['data']);
                    curve_recover = paint_curve("#countries-curve-recuperados", curves_recover[countryselected]['dias'], curves_recover[countryselected]['data'], ['Cuba'].concat(recoversSum.slice(1)), dias);
                }
                if (reff == '#tab-fallecidos') {
                    tab_selected = 'fallecidos';
                    comparison_death = paint_comparison("#countries-comparison-fallecidos", dias, ['Cuba'].concat(deadsSum.slice(1)), curves_death[countryselected]['data']);
                    curve_death = paint_curve("#countries-curve-fallecidos", curves_death[countryselected]['dias'], curves_death[countryselected]['data'], ['Cuba'].concat(deadsSum.slice(1)),dias);
                }
                if (reff == '#tab-activos') {
                    tab_selected = 'activos';
                    comparison_active = paint_comparison("#countries-comparison-activos", dias, ['Cuba'].concat(dailyActive.slice(1)), curves_active[countryselected]['data']);
                    curve_active = paint_curve("#countries-curve-activos", curves_active[countryselected]['dias'], curves_active[countryselected]['data'], ['Cuba'].concat(dailyActive.slice(1)), dias);
                }
                if (reff == '#tab-diarios') {
                    tab_selected = 'diarios';
                    comparison_daily = paint_comparison("#countries-comparison-diarios", dias, ['Cuba'].concat(dailySingle.slice(1)), curves_daily[countryselected]['data']);
                    curve_daily = paint_curve("#countries-curve-diarios", curves_daily[countryselected]['dias'], curves_daily[countryselected]['data'], ['Cuba'].concat(dailySingle.slice(1)), dias);
                }
                if (reff == '#tab-stringency') {
                    tab_selected = 'stringency';
                    if(countryselected in curves_stringency){
                        $('#countries-curve-stringency-no-data').hide();
                        $('#countries-curve-stringency-no-data2').hide();
                        $('#countries-curve-stringency').show();
                        $('#countries-comparison-stringency').show();
                        let index_slice = curves_stringency[countryselected]['data'].length-curves[countryselected]['data'].length;
                        index_slice = Math.max(index_slice,0);
                        curve_stringency = paint_curve("#countries-curve-stringency", curves[countryselected]['dias'], [countryselected].concat(curves_stringency[countryselected]['data'].slice(index_slice)), ['Cuba'].concat(index_values_cuba).slice(0,index_values_cuba.length), dias, {label: 'Valor del índice', position: 'outer-middle' });
                        comparison_stringency = paint_comparison("#countries-comparison-stringency", dias, ['Cuba'].concat(index_values_cuba), [countryselected].concat(curves_stringency[countryselected]['data'].slice(index_slice)),{label: 'Valor del índice', position: 'outer-middle' });
                    }else{
                        $('#countries-curve-stringency').hide();
                        $('#countries-comparison-stringency').hide();
                        $('#countries-curve-stringency-no-data').show();
                        $('#countries-curve-stringency-no-data2').show();
                    }
                }
            });
            if(countryselected in curves_stringency){
                $('#countries-curve-stringency-no-data').hide();
                $('#countries-curve-stringency-no-data2').hide();
                $('#countries-curve-stringency').show();
                $('#countries-comparison-stringency').show();
                let index_slice = curves_stringency[countryselected]['data'].length-curves[countryselected]['data'].length;
                index_slice = Math.max(index_slice,0);
                curve_stringency = paint_curve("#countries-curve-stringency", curves[countryselected]['dias'], [countryselected].concat(curves_stringency[countryselected]['data'].slice(index_slice)), ['Cuba'].concat(index_values_cuba).slice(0,index_values_cuba.length), dias, {label: 'Valor del índice', position: 'outer-middle' });
                comparison_stringency = paint_comparison("#countries-comparison-stringency", dias, ['Cuba'].concat(index_values_cuba), [countryselected].concat(curves_stringency[countryselected]['data'].slice(index_slice)),{label: 'Valor del índice', position: 'outer-middle' });
            }else{
                $('#countries-curve-stringency').hide();
                $('#countries-comparison-stringency').hide();
                $('#countries-curve-stringency-no-data').show();
                $('#countries-curve-stringency-no-data2').show();
            }
            comparison = paint_comparison("#countries-comparison-confirmados",dias,cuba,curves[countryselected]['data']);
            curve = paint_curve("#countries-curve-confirmados", curves[countryselected]['dias'], curves[countryselected]['data'], cuba, dias);

            var $country_selector = $('#country_selector').select2({
                data: countrysorted,
                closeOnSelect: true
            });

            $("#country_selector").on("select2:unselect", function (evt) {
                if (!evt.params.originalEvent) {
                  return;
                }
                evt.params.originalEvent.stopPropagation();
                let columdata = [];
                let xaxisdata = {};

                let selection = $('#country_selector').select2('data');

                for (var i = 0; i < selection.length; i++) {
                    xaxisdata[selection[i]['id']] = 'Confirmados-' + selection[i]['id'];
                    columdata.push(curves2[selection[i]['id']]['weeks']);
                    columdata.push(curves2[selection[i]['id']]['cummulative_sum']);

                }
                xaxisdata['Cuba'] = 'Confirmados-Cuba';
                columdata.push(curves2['Cuba']['weeks']);
                columdata.push(curves2['Cuba']['cummulative_sum']);
                curve3 = paint_comparison_countries("#curves-evolution", xaxisdata, columdata);
            });

            $("#country_selector").on("select2:select", function (evt) {
                let columdata = [];
                let xaxisdata = {};

                let selection = $('#country_selector').select2('data');

                for (var i = 0; i < selection.length; i++) {
                    xaxisdata[selection[i]['id']] = 'Confirmados-' + selection[i]['id'];
                    columdata.push(curves2[selection[i]['id']]['weeks']);
                    columdata.push(curves2[selection[i]['id']]['cummulative_sum']);

                }
                xaxisdata['Cuba'] = 'Confirmados-Cuba';
                columdata.push(curves2['Cuba']['weeks']);
                columdata.push(curves2['Cuba']['cummulative_sum']);
                curve3 = paint_comparison_countries("#curves-evolution", xaxisdata, columdata);
            });


            let topn = 30;
            countrysorted2.sort((a, b) => curves2[b]['ctotal'] - curves2[a]['ctotal']);
            $country_selector.val(countrysorted2.slice(0,topn)).trigger("change");

            let columdata = [];
            let xaxisdata = {};

            let selection = $('#country_selector').select2('data');

            for (var i = 0; i < selection.length; i++) {
                xaxisdata[selection[i]['id']] = 'Confirmados-' + selection[i]['id'];
                columdata.push(curves2[selection[i]['id']]['weeks']);
                columdata.push(curves2[selection[i]['id']]['cummulative_sum']);

            }
            xaxisdata['Cuba'] = 'Confirmados-Cuba';
            columdata.push(curves2['Cuba']['weeks']);
            columdata.push(curves2['Cuba']['cummulative_sum']);

            curve3 = paint_comparison_countries("#curves-evolution", xaxisdata, columdata);

            function plot_all_countries_curves(){
                $country_selector.val(countrysorted2).trigger("change");
                let xaxisdata2 = {};
                let columdata2 = [];
                for (var i = 0; i < countrysorted2.length; i++) {
                    xaxisdata2[countrysorted2[i]]='Confirmados-' + countrysorted2[i];
                    columdata2.push(curves2[countrysorted2[i]]['weeks']);
                    columdata2.push(curves2[countrysorted2[i]]['cummulative_sum']);
                }
                xaxisdata2['Cuba'] = 'Confirmados-Cuba';
                columdata2.push(curves2['Cuba']['weeks']);
                columdata2.push(curves2['Cuba']['cummulative_sum']);

                curve3 = paint_comparison_countries("#curves-evolution", xaxisdata2, columdata2);
            }

            function reset_countries_curves(){
                $country_selector.val(countrysorted2.slice(0,topn)).trigger("change");
                let xaxisdata2 = {};
                let columdata2 = [];
                for (var i = 0; i < topn; i++) {
                    xaxisdata2[countrysorted2[i]]='Confirmados-' + countrysorted2[i];
                    columdata2.push(curves2[countrysorted2[i]]['weeks']);
                    columdata2.push(curves2[countrysorted2[i]]['cummulative_sum']);
                }
                xaxisdata2['Cuba'] = 'Confirmados-Cuba';
                columdata2.push(curves2['Cuba']['weeks']);
                columdata2.push(curves2['Cuba']['cummulative_sum']);

                curve3 = paint_comparison_countries("#curves-evolution", xaxisdata2, columdata2);
            }

            $.plotAllCountriesCurves = plot_all_countries_curves;
            $.resetCountriesCurves = reset_countries_curves;


            var test_countries = [];
            var curves_test = {};

            for(i in  countriesdays.tests){
                if(i in countries_codes && i!=='CUB'){
                    let c_trans = trans_countries[countries_codes[i]];
                    test_countries.push(c_trans);
                    curves_test[c_trans]={x:[c_trans+'-per-million',countriesdays.tests[i]['total_tests_per_million']],
                                        y:[c_trans,countriesdays.tests[i]['test_efectivity']]};
                }
            }

            var $country_selector2 = $('#country_selector_2').select2({
                data: test_countries,
                closeOnSelect: true
            });

            var test_countries_top=[];
            for (var i = 0; i < countrysorted2.length; i++) {
                if(countrysorted2[i] in curves_test){
                    test_countries_top.push(countrysorted2[i]);
                }
                if(test_countries_top.length>=topn){
                    break;
                }
            }
            $country_selector2.val(test_countries_top).trigger("change");

            let selection2 = $('#country_selector_2').select2('data');

            let xaxisdata2 = {};
            let columdata2 = [];
            for (var i = 0; i < selection2.length; i++) {
                xaxisdata2[selection2[i]['id']]=selection2[i]['id']+'-per-million';
                columdata2.push(curves_test[selection2[i]['id']].x);
                columdata2.push(curves_test[selection2[i]['id']].y);
            }
            xaxisdata2[test_effective[0]] = test_cases_per_million[0];
            columdata2.push(test_cases_per_million);
            columdata2.push(test_effective);

            curve4 = scatter_plot("#scatter-plot", xaxisdata2, columdata2);

            function plot_all_countries(){
                $country_selector2.val(test_countries).trigger("change");
                let xaxisdata2 = {};
                let columdata2 = [];
                for (var i = 0; i < test_countries.length; i++) {
                    xaxisdata2[test_countries[i]]=test_countries[i]+'-per-million';
                    columdata2.push(curves_test[test_countries[i]].x);
                    columdata2.push(curves_test[test_countries[i]].y);
                }
                xaxisdata2[test_effective[0]] = test_cases_per_million[0];
                columdata2.push(test_cases_per_million);
                columdata2.push(test_effective);

                curve4 = scatter_plot("#scatter-plot", xaxisdata2, columdata2);
            }

            function reset_countries(){
                $country_selector2.val(test_countries_top).trigger("change");
                let xaxisdata2 = {};
                let columdata2 = [];
                for (var i = 0; i < test_countries_top.length; i++) {
                    xaxisdata2[test_countries_top[i]]=test_countries_top[i]+'-per-million';
                    columdata2.push(curves_test[test_countries_top[i]].x);
                    columdata2.push(curves_test[test_countries_top[i]].y);
                }
                xaxisdata2[test_effective[0]] = test_cases_per_million[0];
                columdata2.push(test_cases_per_million);
                columdata2.push(test_effective);

                curve4 = scatter_plot("#scatter-plot", xaxisdata2, columdata2);
            }

            $.plotAllCountries = plot_all_countries;
            $.resetCountries = reset_countries;

            $country_selector2.val(countrysorted2.slice(0,topn)).trigger("change");
            $("#country_selector_2").on("select2:unselect", function (evt) {
                if (!evt.params.originalEvent) {
                  return;
                }
                evt.params.originalEvent.stopPropagation();
                let selection2 = $('#country_selector_2').select2('data');

                let xaxisdata2 = {};
                let columdata2 = [];
                for (var i = 0; i < selection2.length; i++) {
                    xaxisdata2[selection2[i]['id']]=selection2[i]['id']+'-per-million';
                    columdata2.push(curves_test[selection2[i]['id']].x);
                    columdata2.push(curves_test[selection2[i]['id']].y);

                }
                xaxisdata2[test_effective[0]] = test_cases_per_million[0];
                columdata2.push(test_cases_per_million);
                columdata2.push(test_effective);

                curve4 = scatter_plot("#scatter-plot", xaxisdata2, columdata2);
            });

            $("#country_selector_2").on("select2:select", function (evt) {
                let selection2 = $('#country_selector_2').select2('data');

                let xaxisdata2 = {};
                let columdata2 = [];
                for (var i = 0; i < selection2.length; i++) {
                    xaxisdata2[selection2[i]['id']]=selection2[i]['id']+'-per-million';
                    columdata2.push(curves_test[selection2[i]['id']].x);
                    columdata2.push(curves_test[selection2[i]['id']].y);

                }
                xaxisdata2[test_effective[0]] = test_cases_per_million[0];
                columdata2.push(test_cases_per_million);
                columdata2.push(test_effective);

                curve4 = scatter_plot("#scatter-plot", xaxisdata2, columdata2);
            });

            $.fn.DataTable.ext.pager.numbers_length = 5;
            let $datatable = $('#datatable').DataTable({
                'responsive': true,
                'searching': true,
                'scaleX': false,
                'scaleY': false,
                'pageLength': 20,
                "lengthMenu": [20, 50 , 100, 200],
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
                    {title: "País"},
                    {title: "Casos."},
                    {title: "Recuperados."},
                    {title: "Fallecidos"},
                ],
                "columnDefs": [
                    {responsivePriority: 1, targets: 0, "orderable": false},
                    {responsivePriority: 2, targets: 1},
                    {responsivePriority: 3, targets: 2},
                    {responsivePriority: 4, targets: 3}
                ]
            });

            new $.fn.dataTable.FixedHeader($datatable);

            for (var i = 0; i < countrysorted2.length; i++) {
                let rowdat = [curves2[countrysorted2[i]]['weeks'][0] in trans_countries ? trans_countries[curves2[countrysorted2[i]]['weeks'][0]] : curves2[countrysorted2[i]]['weeks'][0], curves2[countrysorted2[i]]['ctotal'], curves2[countrysorted2[i]]['crecovered'], curves2[countrysorted2[i]]['cdeaths']];
                $datatable.row.add(rowdat);
            }
            let rowdat = [curves2['Cuba']['weeks'][0] in trans_countries ? trans_countries[curves2['Cuba']['weeks'][0]] : curves2['Cuba']['weeks'][0], curves2['Cuba']['ctotal'], curves2['Cuba']['crecovered'], curves2['Cuba']['cdeaths']];
            $datatable.row.add(rowdat);
            $datatable.order([2, 'desc']).draw();
        });
    });
}

run_calculations();
