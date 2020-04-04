/**
 * Estadísticas de casos detectados hasta un día.
 *
 * @typedef {Object} DayStats
 * @property {TerritoryStats} mun Estadísticas de municipios.
 * @property {TerritoryStats} pros Estadísticas de provincias.
 */

/**
 * Estadísticas hasta un día agrupadas por territorio. Puede verse como un diccionario donde las
 * llaves son los identificadores de territorio y su valor asociado las estadísticas del mismo.
 *
 * @typedef {Object<string, Stat>} TerritoryStats
 * @property {int} max Cantidad máxima de casos detectada en los territorios.
 */

/**
 * Estadísticas de un territorio.
 *
 * @typedef {Object} Stat
 * @property {int} total Cantidad de casos del territorio hasta el día.
 */

/**
 * Contiene las estadísticas por día necesarias para renderizar el mapa.
 *
 * @param {CubaData} data Datos de Cuba.
 * @constructor
 */
function DataHistory (data) {
    /**
     * Datos acumulados por día.
     *
     * @type {DayStats[]}
     */
    this.days = [];
    // Hack: agregar un primer elemento para que coincidan los índices con el día en los datos
    // originales y simplificar el algoritmo de llenado de datos.
    this.days.push({
        mun: { max: 0 },
        pros: {max: 0}
    });
    for (var dayIndex in data.casos.dias) {
        var dayData = data.casos.dias[dayIndex];
        /**
         * Datos del día
         * @type {DayStats}
         */
        var stats = {
            mun: { max: 0 },
            pros: { max: 0 }
        };

        // Computar totales si existen casos diagnosticados
        if (dayData.diagnosticados) {
            for (var i = 0; i < dayData.diagnosticados.length; i++) {
                var subject = dayData.diagnosticados[i];

                stats.mun[subject.dpacode_municipio_deteccion] |= 0;
                stats.mun[subject.dpacode_municipio_deteccion] += 1;
                stats.mun.max = Math.max(stats.mun[subject.dpacode_municipio_deteccion], stats.mun.max);

                stats.pros[subject.dpacode_provincia_deteccion] |= 0;
                stats.pros[subject.dpacode_provincia_deteccion] += 1;
                stats.pros.max = Math.max(stats.pros[subject.dpacode_provincia_deteccion], stats.pros.max);
            }
        }

        // Sumar acumulados del día anterior
        var dayBefore = this.days[dayIndex - 1];
        for (var mun in dayBefore.mun) {
            if (mun !== 'max') {
                stats.mun[mun] |= 0;
                stats.mun[mun] += dayBefore.mun[mun];
                stats.mun.max = Math.max(stats.mun[mun], stats.mun.max);
            }
        }
        for (var prov in dayBefore.pros) {
            if (prov !== 'max') {
                stats.pros[prov] |= 0;
                stats.pros[prov] += dayBefore.pros[prov];
                stats.pros.max = Math.max(stats.pros[prov], stats.pros.max);
            }
        }

        this.days.push(stats);
    }

}

/**
 * Obtiene la cantidad de casos de un municipio hasta un día.
 *
 * @param {string} code Identificador del municipio según la división político-administrativa.
 * @param {int|undefined} day Día hasta el que se obtendrán los casos del municipio. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getMunicipalityTotal = function (code, day) {
    if (day === undefined) {
        // Por defecto usar información del último día
        day = Object.keys(this.days).length - 1;
    }
    return this.days[day].mun[code];
};

/**
 * Obtiene el número de casos del municipio con mayor cantidad de casos.
 *
 * @param {int|undefined} day Día hasta el que se obtendrán los casos del municipio. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getMunicipalityMax = function (day) {
    if (day === undefined) {
        // Por defecto usar información del último día
        day = Object.keys(this.days).length - 1;
    }
    return this.days[day].mun.max;
};

/**
 * Obtiene la cantidad de casos de una provincia hasta un día.
 *
 * @param {string} code Identificador de la provincia según la división político-administrativa.
 * @param {int|undefined} day Día hasta el que se obtendrán los casos de la provincia. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getProvinceTotal = function (code, day) {
    if (day === undefined) {
        // Por defecto usar información del último día
        day = Object.keys(this.days).length - 1;
    }
    return this.days[day].pros[code];
};

/**
 * Obtiene el número de casos de laprovincia con mayor cantidad de casos.
 *
 * @param {int|undefined} day Día hasta el que se obtendrán los casos de la provincia. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getProvinceMax = function (day) {
    if (day === undefined) {
        // Por defecto usar información del último día
        day = Object.keys(this.days).length - 1;
    }
    return this.days[day].pros.max;
};
