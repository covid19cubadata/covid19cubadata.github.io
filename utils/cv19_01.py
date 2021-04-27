# Copyright (C) 2021, J.A. Mesejo-Chiong & A.M. León-Mecías
# mesejo@matcom.uh.cu, angela@matcom.uh.cu
# All rights reserved. Todos los derechos reservados.
# BSD 4-Clause License (See LICENSE.txt, Vea LICENCIA.txt)
# Modified by covid19cubadata group

import os
import json
import numpy as np
from csaps import CubicSmoothingSpline
from scipy.optimize import least_squares, basinhopping
#import plotly
#import plotly.graph_objs as go
import datetime as dt
import warnings
import math
import fire
import multiprocessing
import time

warnings.filterwarnings('ignore')


def parsejson(jsonfile):
    with open(jsonfile, 'r', encoding='utf8') as json_file:
        data = json.load(json_file)
    cpd = data['casos']['dias']

    cv19_cuba = np.zeros((len(cpd), 4))
    cv19_prov = np.zeros((len(cpd), 17))
    cv19_mun = np.zeros((len(cpd), 169))
    data_keys = ['recuperados_numero', 'muertes_numero', 'evacuados_numero']
    pr_map = {}
    mun_map = {}
    visited_mun = {}
    mun_counter = 0
    for i in range(len(cpd)):
        dkey = str(i + 1)
        if 'diagnosticados' in cpd[dkey]:
            diag = cpd[dkey]['diagnosticados']
            ndiag = len(diag)
            prvcode = np.zeros(17)
            muncode = np.zeros(169)
            cv19_cuba[i, 0] = ndiag
            for j in range(ndiag):
                prvstr = diag[j]['dpacode_provincia_deteccion']
                if (prvstr != '00') and (prvstr != '40.01'):
                    prvint = int(prvstr) - 21
                    prvcode[prvint] += 1
                    pr_map[prvint] = {
                        'name': diag[j]['provincia_detección'],
                        'code': diag[j]['dpacode_provincia_deteccion'],
                    }
                else:
                    if prvstr != '40.01':
                        prvcode[16] += 1
                        pr_map[16] = {
                            'name': diag[j]['provincia_detección'],
                            'code': diag[j]['dpacode_provincia_deteccion'],
                        }
                    else:
                        prvcode[15] += 1
                        pr_map[15] = {
                            'name': diag[j]['provincia_detección'],
                            'code': diag[j]['dpacode_provincia_deteccion'],
                        }

                munstr = diag[j]['dpacode_municipio_deteccion']
                if munstr in visited_mun:
                    munint = visited_mun[munstr]
                else:
                    munint = mun_counter
                    visited_mun[munstr] = munint
                    mun_map[munint] = {
                        'name': diag[j]['municipio_detección'],
                        'code': diag[j]['dpacode_municipio_deteccion'],
                    }
                    mun_counter += 1
                muncode[munint] += 1

        cv19_prov[i, :] = prvcode
        cv19_mun[i, :] = muncode
        for j in range(len(data_keys)):
            if data_keys[j] in cpd[dkey]:
                cv19_cuba[i, j + 1] = cpd[dkey][data_keys[j]]
    return cv19_cuba, cv19_prov, pr_map, cv19_mun, mun_map


def find_waves(y, dbefore, dafter):
    t = np.arange(y.size)
    s = CubicSmoothingSpline(t, y, smooth=0.015).spline
    ds2 = s.derivative(nu=2)
    yd2 = np.sign(ds2(t))
    seq = list(yd2)
    sub = list(np.concatenate([-1 * np.ones(dbefore), np.ones(dafter)]))
    res = [i for i in range(len(seq) - len(sub)) if seq[i:i + len(sub)] == sub]
    return np.array(res) + dbefore


def find_lastwave(y, waves_ini):
    ywaves = np.split(y, waves_ini)
    cases = [np.sum(ywaves[i]) for i in range(len(ywaves))]
    if (cases[-1] < cases[-2]) and (ywaves[-1].size < ywaves[-2].size):
        lwini = waves_ini[-2]
    else:
        lwini = waves_ini[-1]
    while(y[lwini] == 0):
        lwini += 1
    return lwini


def smooth(y, n):
    out0 = np.convolve(y, np.ones(n, dtype=int), 'valid') / n
    r = np.arange(1, n - 1, 2)
    start = np.cumsum(y[:n - 1])[::2] / r
    stop = (np.cumsum(y[:-n:-1])[::2] / r)[::-1]
    return np.concatenate((start, out0, stop))


def growthmodels(x, t, model):

    if (model == 'mceg'):
        x0 = 1.0 - x[0]
        return (x[2]**x0 + x0 * x[1] * t)**(1.0 / x0)
    elif (model == 'mcl'):
        return x[1] / (1.0 + (x[1] / x[2] - 1.0) * np.exp(-x[0] * t))
    elif (model == 'mcr'):
        return x[2] / ((1.0 + ((x[2] / x[3])**x[0] - 1.0) * np.exp(-x[0] * x[1] * t))**(1.0 / x[0]))
    elif (model == 'mcg'):
        x10 = x[1] / x[0]
        return x[2] * np.exp(x10) * np.exp(-x10 * np.exp(-x[0] * t))
    elif (model == 'mcgg'):
        x1 = 1.0 - x[1]
        return (x[3]**x1 + ((x1 * x[2]) / x[0]) * (1.0 - np.exp(-x[0] * t)))**(1.0 / x1)
    elif (model == 'mcs'):
        x201 = x[2] / (x[0] * x[1])
        return x[3] * np.exp(x201) * np.exp(-x201 * np.exp(-x[0] * (t**x[1])))
    else:
        tp1 = t + 1.0
        x0 = 1.0 - x[0]
        return x[2] / (1.0 + (x[2] / x[3] - 1.0) * np.exp(-x[1] * (tp1**x0 - 1.0)))


def gmodelsder(x, t, y, model):

    if (model == 'mceg'):
        return x[1] * (y**x[0])
    elif (model == 'mcl'):
        return x[0] * y * (1.0 - y / x[1])
    elif (model == 'mcr'):
        return x[1] * y * (1.0 - (y / x[2])**x[0])
    elif (model == 'mcg'):
        return x[1] * np.exp(-x[0] * t) * y
    elif (model == 'mcgg'):
        x1 = 1.0 - x[1]
        return x[2] * np.exp(-x[0] * t) * (y**x[1])
    elif (model == 'mcs'):
        return x[2] * (t**(x[1] - 1.0)) * np.exp(-x[0] * (t**x[1])) * y
    else:
        tp1 = t + 1
        return ((1 - x[0]) * x[1]) * (tp1**(-x[0])) * y * (1.0 - y / x[2])


def bounds(y, model, kfactor=5, c0factor=4, gmax=2):

    near0 = 1.0e-8
    kmin = y[-1]
    kmax = kfactor * kmin
    c0min = y[0]
    c0max = c0factor * c0min
    bmax = 1

    if (model == 'mceg'):
        lb = np.array([near0, near0, c0min])
        ub = np.array([bmax, gmax, c0max])
    elif (model == 'mcl'):
        lb = np.array([near0, kmin, c0min])
        ub = np.array([gmax, kmax, c0max])
    elif (model == 'mcr'):
        lb = np.array([near0, near0, kmin, c0min])
        ub = np.array([bmax, gmax, kmax, c0max])
    elif (model == 'mcg'):
        lb = np.array([near0, near0, c0min])
        ub = np.array([bmax, gmax, c0max])
    elif (model == 'mcgg'):
        lb = np.array([near0, near0, near0, c0min])
        ub = np.array([bmax, bmax, gmax, c0max])
    elif (model == 'mcs'):
        lb = np.array([near0, near0, near0, c0min])
        ub = np.array([bmax, 2, gmax, c0max])
    else:
        lb = np.array([near0, near0, kmin, c0min])
        ub = np.array([bmax, gmax, kmax, c0max])
    return lb, ub


def residuals(x, t, y, model):
    return growthmodels(x, t, model) - y


def fitrobustlsq(t, y, model):

    lb, ub = bounds(y, model)

    def objfun(x, t, y, model):
        res = residuals(x, t, y, model)
        np.nan_to_num(res, copy=False)
        return res

    def objlsq(x, t, y, model): return 0.5 * \
        np.sum(residuals(x, t, y, model)**2)
    def objlar(x, t, y, model): return np.sum(
        np.abs(residuals(x, t, y, model)))

    lbub = [(lb[i], ub[i]) for i in range(lb.size)]
    x0 = 0.5 * (lb + ub)
    loss = ['linear', 'soft_l1']
    minimizer_kwargs = {"method": "L-BFGS-B",
                        "args": (t, y, model), "bounds": lbub}
    resl = []
    for i in range(len(loss)):
        res0 = least_squares(objfun, x0, bounds=(lb, ub), method='trf', ftol=1e-10, xtol=1e-10,
                             gtol=1e-10, loss=loss[i], args=(t, y, model))
        resl.append(res0)
    res1 = basinhopping(
        objlsq, x0, minimizer_kwargs=minimizer_kwargs, niter=500)
    resl.append(res1)
    res2 = basinhopping(
        objlar, x0, minimizer_kwargs=minimizer_kwargs, niter=500)
    resl.append(res2)
    return resl


def metrics(x, t, y, model):
    npts = y.size
    resid = residuals(x, t, y, model)
    mae = np.sum(np.abs(resid)) / npts
    mre = np.sum(np.abs(resid) / y) / npts
    mse = np.sum(resid**2) / npts
    return np.array([mae, mre, mse, np.sqrt(mse)])


def metrics14(x, t, y, model):
    npts = 14
    resid = residuals(x, t, y, model)
    resid = resid[-14:]
    mae = np.sum(np.abs(resid)) / npts
    mre = np.sum(np.abs(resid) / y[-14:]) / npts
    mse = np.sum(resid**2) / npts
    return np.array([mae, mre, mse, np.sqrt(mse)])


def getlastwave(y):
    ydcum = np.cumsum(y)
    waves_ini = find_waves(smooth(ydcum, 15), 14, 7)
    lwave_ini = find_lastwave(y, waves_ini)
    ywaves = np.split(ydcum, [lwave_ini])
    ycum = ywaves[-1] - ywaves[-2][-1]
    ywaves = np.split(y, [lwave_ini])
    yinc = ywaves[-1]
    return yinc, ycum, lwave_ini


def getbest(rfit, tcum, ycum, cmod):
    mets = np.zeros((len(rfit), 4))
    for i in range(len(rfit)):
        mets[i, :] = metrics14(rfit[i].x, tcum, ycum, cmod)
    bpc = np.zeros(4, dtype=int)
    for i in range(4):
        bpc[i] = np.argmin(mets[:, i])
    return np.argmax(np.bincount(bpc))


def removeNaN(array):
    return list(map(lambda x: x if not math.isnan(x) else None, array))


def predict(ydata, name):
    #ydata = cv19_prov[:, 0]
    yinc, ycum, lwini = getlastwave(ydata)
    ndays = ycum.size
    tcum = np.arange(ndays)
    mods = ['mcl', 'mcr', 'mcg', 'mcgg', 'mcs', 'mcls']
    brfit = []
    for i in range(len(mods)):
        rfit = fitrobustlsq(tcum, ycum, mods[i])
        bmet = getbest(rfit, tcum, ycum, mods[i])
        brfit.append(rfit[bmet].x)

    weeks = 4
    yfit_cum = np.zeros((ndays + weeks * 7, len(mods)))
    yfit_inc = np.zeros((ndays + weeks * 7, len(mods)))
    tfit = np.arange(ndays + weeks * 7)
    for i in range(len(mods)):
        yfit_cum[:, i] = growthmodels(brfit[i], tfit, mods[i])
        yfit_inc[:, i] = gmodelsder(brfit[i], tfit, yfit_cum[:, i], mods[i])
    lwdate = dt.datetime(2020, 3, 11) + dt.timedelta(int(lwini))

    datesticks = []
    for i in range(0, tfit[-1]):
        cdate = lwdate + dt.timedelta(i)
        datesticks.append(cdate.strftime("%y/%m/%d"))

    data = []
    yinc[yinc == np.infty] = None
    data.append({
        'name': f'Datos {name}',
        'y': removeNaN(yinc.tolist()),
        'c3-plot': 'scatter'
    })
    smooth_r = smooth(yinc, 13)
    smooth_r[smooth_r == np.infty] = None
    data.append({
        'name': f'Datos {name} Suavizados',
        'y': removeNaN(smooth_r.tolist()),
        'c3-plot': 'scatter'
    })
    yfit_inc[yfit_inc == np.infty] = None
    for i in range(len(mods)):
        data.append({
            'name': mods[i],
            'y': removeNaN(yfit_inc[:, i].tolist()),
            'c3-plot': 'spline'
        })
    return {'data': data, 'days': datesticks}


def compute_specific(ydata, name, code, BASE_PATH):
    print(f'Computing {name}')
    tt = time.time()
    pr = predict(ydata, name)
    json.dump(pr, open(os.path.join(
        BASE_PATH, f'{code}.json'), 'w'))
    duration = time.time() - tt
    print(f'Finish computing {name}: {duration}s , {duration / 60}m')


def compute():
    tt = time.time()
    BASE_PATH = 'data/predictions'
    os.makedirs(BASE_PATH, exist_ok=True)
    jsonfile = 'data/covid19-cuba.json'
    cv19_cuba, cv19_prov, pr_map, cv19_mun, mun_map = parsejson(jsonfile)

    compute_specific(cv19_cuba[:, 0], 'Cuba', 'cuba', BASE_PATH)

    for i in range(cv19_prov.shape[1]):
        if(pr_map[i]['code'] == '00'):
            continue
        compute_specific(cv19_prov[:, i], pr_map[i]
                         ['name'], pr_map[i]["code"], BASE_PATH)

    for i in range(cv19_mun.shape[1]):
        if(mun_map[i]['code'] == '00'):
            continue

        compute_specific(cv19_mun[:, i], mun_map[i]
                         ['name'], mun_map[i]["code"], BASE_PATH)


class Menu:

    def compute(self):
        compute()

    def compute_parallel(self):
        BASE_PATH = 'data/predictions'
        jsonfile = 'data/covid19-cuba.json'
        print('parallel')
        cv19_cuba, cv19_prov, pr_map, cv19_mun, mun_map = parsejson(jsonfile)
        cpu = multiprocessing.cpu_count() // 2
        if cpu == 0:
            cpu = 1
        with multiprocessing.Pool(cpu) as pp:
            res = []

            res.append(pp.apply_async(compute_specific,
                                      (cv19_cuba[:, 0], 'Cuba', 'cuba', BASE_PATH,)))

            for i in range(cv19_prov.shape[1]):
                if(pr_map[i]['code'] == '00'):
                    continue
                res.append(pp.apply_async(compute_specific, (cv19_prov[:, i], pr_map[i]
                                                             ['name'], pr_map[i]["code"], BASE_PATH,)))

            for i in range(cv19_mun.shape[1]):
                if(mun_map[i]['code'] == '00'):
                    continue
                res.append(pp.apply_async(compute_specific, (cv19_mun[:, i], mun_map[i]
                                                             ['name'], mun_map[i]["code"], BASE_PATH,)))

            for i in res:
                i.wait()


if __name__ == '__main__':
    fire.Fire(Menu)


# if __name__ == '__main__':
#     compute()
