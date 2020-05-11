import os
import io
import requests  # noqa We are just importing this to prove the dependency installed correctly
import json
import csv
from datetime import datetime
from collections import defaultdict


def change_date(dat):
    t = dat.split('-')
    m = t[1]
    if len(m) == 1:
        m = '0'+m
    return t[0]+'/'+m+'/'+t[2]

def load_index_backup():
    path = os.path.join('data', 'oxford-indexes-backup.json')
    return json.load(open(path))

def get_oxford_index():
    now = datetime.now()
    indexes = requests.get('https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-1-27/'+str(now.year)+'-'+str(now.month)+'-'+str(now.day)).json()
    data = {'data':{},'countries': indexes['countries']}
    for day,countries in indexes['data'].items():
        data['data'][day] = {}
        for country in countries:
            #print(day,country,countries[country]['stringency'])
            data['data'][day][country] = {'stringency':countries[country]['stringency'],'stringency_actual':countries[country]['stringency_actual'], 'stringency_legacy': countries[country]['stringency_legacy'], 'stringency_legacy_disp': countries[country]['stringency_legacy_disp']}
    path = os.path.join('data', 'oxford-indexes.json')
    json.dump(data, open(path, 'w'))
    return data



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

def get_countries_test():
    data2 = requests.get('https://covid.ourworldindata.org/data/owid-covid-data.csv').content
    data2 = io.StringIO(data2.decode('utf8'))
    reader = csv.reader(data2)
    data = defaultdict(lambda : defaultdict(list))
    next(reader)
    for i in reader:
        if i[15]:
            percent = int(i[3])/float(i[11])*100
            data[i[0]]['test_efectivity'].append(percent)
            data[i[0]]['total_tests_per_million'].append(float(i[13])*1000)
    path = os.path.join('data', 'countries_test.json')
    json.dump(data,open(path,'w'))
    for i in data.keys():
        data[i]['test_efectivity']=data[i]['test_efectivity'][-1]
        data[i]['total_tests_per_million']=data[i]['total_tests_per_million'][-1]
    return data


def main():

    indexs = get_oxford_index()
    #indexs = load_index_backup()
    print('Oxford Index generated')

    tests = get_countries_test()
    print('Countries tests generated')

    data = get_json_info()
    data['indexes'] = indexs
    data['tests'] = tests
    path = os.path.join('data', 'paises-info-dias.json')
    json.dump(data, open(path, 'w'))

    #print(json.dumps(data, indent=2))

    generate_csv()
    print('CSV generated')




if __name__ == "__main__":
    main()
