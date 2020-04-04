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
        if (data.casos.dias.hasOwnProperty(dayIndex)) {
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

            /**
             * Suma la cantidad de casos detectados al acumulado registrado hasta el día anterior.
             *
             * @param {'mun'|'pros'} store `mun` indicando que debe utilizarse municipios, `pros`
             *                             indicando que debe utilizarse provincias.
             * @param {DayStats} stat Datos del día a mezclar.
             * @param {DayStats} dayBefore Datos acumulados hasta el día anterior.
             */
            function mergeData (store, stat, dayBefore) {
                for (var territory in dayBefore[store]) {
                    if (dayBefore[store].hasOwnProperty(territory)) {
                        if (territory !== 'max') {
                            stat[store][territory] |= 0;
                            stat[store][territory] += dayBefore[store][territory];
                            stat[store].max = Math.max(stat[store][territory], stat[store].max);
                        }
                    }
                }
            }

            // Sumar acumulados del día anterior
            var dayBefore = this.days[dayIndex - 1];
            mergeData('mun', stats, dayBefore);
            mergeData('pros', stats, dayBefore);
            this.days.push(stats);
        }

    }
}

/**
 * Obtiene la cantidad de casos de un territorio hasta un día.
 *
 * @param {'mun'|'pros'} type `mun` para indicar que el territorio es un municipio, `pros` para
 *                            indicar que es una provincia.
 * @param {string} code Identificador del territorio según la división político-administrativa.
 * @param {int|undefined} day Día hasta el que se obtendrán los casos del territorio. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getTerritoryTotal = function (type, code, day) {
    if (day === undefined) {
        // Por defecto usar información del último día
        day = Object.keys(this.days).length - 1;
    }
    return this.days[day][type][code];
};

/**
 * Obtiene el número de casos del territorio con mayor cantidad de casos.
 *
 * @param {'mun'|'pros'} type `mun` para indicar que el territorio es un municipio, `pros` para
 *                            indicar que es una provincia.
 * @param {int|undefined} day Día hasta el que se obtendrán los casos del territorio. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getTerritoryMax = function (type, day) {
    if (day === undefined) {
        // Por defecto usar información del último día
        day = Object.keys(this.days).length - 1;
    }
    return this.days[day][type].max;
};

/**
 * Obtiene la cantidad de casos de un municipio hasta un día.
 *
 * @param {string} code Identificador del municipio según la división político-administrativa.
 * @param {int|undefined} day Día hasta el que se obtendrán los casos del municipio. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getMunicipalityTotal = function (code, day) {
    return this.getTerritoryTotal('mun', code, day);
};

/**
 * Obtiene el número de casos del municipio con mayor cantidad de casos.
 *
 * @param {int|undefined} day Día hasta el que se obtendrán los casos del municipio. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getMunicipalityMax = function (day) {
    return this.getTerritoryMax('mun', day);
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
    return this.getTerritoryTotal('pros', code, day);
};

/**
 * Obtiene el número de casos de laprovincia con mayor cantidad de casos.
 *
 * @param {int|undefined} day Día hasta el que se obtendrán los casos de la provincia. `undefined`
 *                            indica que se debe utilizar la información del último día disponible.
 * @return {int}
 */
DataHistory.prototype.getProvinceMax = function (day) {
    return this.getTerritoryMax('pros', day);
};
