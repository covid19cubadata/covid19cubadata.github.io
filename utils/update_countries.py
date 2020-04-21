import os
import requests  # noqa We are just importing this to prove the dependency installed correctly
import json
import csv
from datetime import datetime
import psycopg2

import logging
from dotenv import load_dotenv
load_dotenv()
logging.basicConfig(level=logging.DEBUG, format='%(threadName)s: %(message)s')

DB_POSTGRES_URI = os.getenv("DB_POSTGRES_URI")
OUTPUT_TYPE = os.getenv("OUTPUT_TYPE")


def change_date(dat):
    t = dat.split('-')
    m = t[1]
    if len(m) == 1:
        m = '0'+m
    return t[0]+'/'+m+'/'+t[2]


def get_oxford_index():
    now = datetime.now()
    indexes = requests.get('https://covidtrackerapi.bsg.ox.ac.uk/api/stringency/date-range/2020-1-27/' +
                           str(now.year)+'-'+str(now.month)+'-'+str(now.day)).json()
    data = {'data': {}}
    for day, countries in indexes['data'].items():
        data['data'][day] = {}
        for country in countries:
            print(day, country, countries[country]['stringency'])
            data['data'][day][country] = {'stringency': countries[country]['stringency'],
                                          'stringency_actual': countries[country]['stringency_actual']}
    path = os.path.join('data', 'oxford-indexes.json')
    json.dump(data, open(path, 'w'))


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
    if OUTPUT_TYPE == "json":
        data = get_json_info()
        path = os.path.join('data', 'paises-info-dias.json')
        json.dump(data, open(path, 'w'))

        print(json.dumps(data, indent=2))

        generate_csv()
        print('CSV generated')

        get_oxford_index()
        print('Oxford Index generated')
    elif OUTPUT_TYPE == "db":
        data = get_json_info()
        pgclient = psycopg2.connect(DB_POSTGRES_URI)
        cur = pgclient.cursor()
        fecha = datetime.strptime(data['dia-actualizacion'], '%Y/%m/%d')
        cur.execute("""
        CREATE TABLE IF NOT EXISTS paises_info_dias (
                id uuid not null default uuid_generate_v4() primary key,
                data jsonb not null,
                fecha date not null
        );
        """)
        cur.execute("INSERT INTO paises_info_dias (data,fecha) VALUES (%s,%s)",
                    (json.dumps(data, indent=2),
                     fecha)
                    )
        pgclient.commit()
        cur.close()
        pgclient.close()


if __name__ == "__main__":
    main()
