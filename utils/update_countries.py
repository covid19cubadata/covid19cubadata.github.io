import os
import requests  # noqa We are just importing this to prove the dependency installed correctly
import json

def change_date(dat):
    t = dat.split('-')
    m = t[1]
    if len(m)==1:
        m= '0'+m
    return t[0]+'/'+m+'/'+t[2]

def get_json_info():
    countries = requests.get('https://pomber.github.io/covid19/timeseries.json').json()
    inf =  {}
    back_inf = {}
    fecha = '2020-1-22'
    for c in countries:
        data = []
        deaths = []
        recovered = []
        started = False
        for day in countries[c]:
            if not started:
                if day['confirmed']!=0:
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
        inf[c] = {'confirmed':data,'deaths':deaths,'recovered':recovered}
    c = {"paises":back_inf,"paises_info": inf, "dia-actualizacion": change_date(fecha)}
    return c

def main():

    data = get_json_info()
    path = 'data/paises-info-dias.json'
    json.dump(data, open(path, 'w'))

    print(json.dumps(data, indent=2))

if __name__ == "__main__":
    main()
