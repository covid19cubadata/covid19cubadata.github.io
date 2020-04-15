import os
import requests  # noqa We are just importing this to prove the dependency installed correctly
import json
import csv


def change_date(dat):
    t = dat.split('-')
    m = t[1]
    if len(m) == 1:
        m = '0'+m
    return t[0]+'/'+m+'/'+t[2]


def get_json_info():
    countries = requests.get(
        'https://pomber.github.io/covid19/timeseries.json').json()
    inf = {}
    back_inf = {}
    fecha = '2020-1-22'
    for c in countries:
        data = []
        deaths = []
        recovered = []
        started = False
        for day in countries[c]:
            if not started:
                if day['confirmed'] != 0:
                    started = True
                    data.append(day['confirmed'])
                    deaths.append(day['deaths'])
                    recovered.append(day['recovered'])
                    fecha = day["date"]
            else:
                data.append(day['confirmed'])
                deaths.append(day['deaths'])
                recovered.append(day['recovered'])
                fecha = day["date"]
        back_inf[c] = data
        inf[c] = {'confirmed': data, 'deaths': deaths, 'recovered': recovered}
    c = {"paises": back_inf, "paises_info": inf,
         "dia-actualizacion": change_date(fecha)}
    return c


def generate_csv():
    f = open(os.path.join('data', 'covid19-casos.csv'), 'w')
    rows = [['caso', 'sexo', 'edad', 'pais', 'municipio', 'provincia',
             'fecha_confirmacion', 'fecha_ingreso', 'tipo_contagio']]
    cuba = json.load(open('data/covid19-cuba.json', 'r'))
    for day in cuba['casos']['dias'].values():
        if 'diagnosticados' not in day:
            continue
        for case in day['diagnosticados']:
            row = []
            row.append('')
            row.append(case['sexo'])
            row.append(case['edad'])
            row.append(case['pais'])
            row.append(case['municipio_detección'])
            row.append(case['provincia_detección'])
            row.append(day['fecha'])
            if case['consulta_medico'] != None:
                row.append(case['consulta_medico'])
            else:
                row.append('')
            if case['contagio'] == 'importado':
                row.append('primario')
            elif case['contagio'] == 'introducido':
                row.append('secundario')
            else:
                row.append('desconocido')
            rows.append(row)
    w = csv.writer(f)
    w.writerows(rows)
    f.flush()
    f.close()


def main():

    data = get_json_info()
    path = os.path.join('data', 'paises-info-dias.json')
    json.dump(data, open(path, 'w'))

    print(json.dumps(data, indent=2))

    generate_csv()
    print('CSV generated')


if __name__ == "__main__":
    main()
