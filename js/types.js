/**
 * Datos obtenidos de /data/covid19-cuba.json
 *
 * @typedef {Object} CubaData
 * @property {string} schema-version
 * @property {string} note-text
 * @property {Object<string, IsolationCenter>} centros_aislamiento Información de los centros de
 *                                                                 aislamiento.
 * @property {Object<string, DiagnosticCenter>} centros_diagnostico Información de  los centros de
 *                                                                   diagnóstico.
 * @property {{dias: Object<int,DayReport>}} casos Información de los casos, agrupados por día de
 *                                                 reporte.
 */

/**
 * Datos de un centro de aislamiento o diagnóstico.
 *
 * @typedef {Object} Facility
 * @property {string} id Identificador del centro.
 * @property {string} nombre Nombre del centro.
 * @property {string} provincia Nombre de la provincia donde se encuentra el centro.
 * @property {string} dpacode_provincia Código en la división político-administrativa que identifica
 *                                      la provincia en que esta ubicado el centro.
 */

/**
 * Datos de un centro de aislamiento.
 *
 * @typedef {Facility} IsolationCenter
 */

/**
 * Datos de un centro de diagnóstico.
 *
 * @typedef {Facility} DiagnosticCenter
 */

/**
 * Datos reportados en un día.
 *
 * @typedef {Object} DayReport
 * @property {string} fecha Fecha del reporte en formato YYYY/MM/DD.
 * @property {Subject[]|undefined} diagnosticados Datos de los casos diagnosticados reportados.
 * @property {int|undefined} sujetos_riesgo
 * @property {int|undefined} graves_numero Cantidad de casos graves reportados.
 * @property {string[]|undefined} Identificador de los pacientes que pasaron a estado grave.
 * @property {int|undefined} muertes_numero Cantidad de personas fallecidas reportadas.
 * @property {string[]|undefined} muertes_id Identificador de los pacientes fallecidos.
 * @property {int|undefined} evacuados_numero Cantidad de pacientes evacuados.
 * @property {string[]|undefined} evacuados_id Identificador de los pacientes evacuados.
 * @property {int|undefined} tests_total Cantidad de tests realizados.
 * @property {int|undefined} recuperados_numero Cantidad de pacientes recuperados.
 * @property {string[]|undefined} recuperados_id Identificador de los pacientes recuperados.
 *
 */

/**
 * Datos de un paciente.
 *
 * @typedef {Object} Subject
 * @property {string} id Identificador del paciente.
 * @property {string} pais Identificador del país de la nacionalidad del paciente.
 * @property {int} edad Edad del paciente (en años).
 * @property {'hombre'|'mujer'|'desconocido'} sexo Sexo del paciente.
 * @property {*|null} arribo_a_cuba_foco
 * @property {string} consulta_medico Fecha en que el paciente acudió al médico, en formato
 *                                    YYYY/MM/DD
 * @property {string} municipio_detección Nombre del municipio en que fue detectado el paciente.
 * @property {string} provincia_detección Nombre de la provincia en que fue detectado el paciente.
 * @property {string} dpacode_municipio_deteccion Código según la división político-administrativa
 *                                                del municipio donde fue detectado el paciente.
 * @property {string} dpacode_provincia_deteccion Código según la división político-administrativa
 *                                                de la provincia donde fue detectado el paciente.
 * @property {'introducido'|'importado'|'autóctono'|'desconocido'} contagio FOrma de contagio.
 * @property {int} contacto_focal
 * @property {string} centro_aislamiento Identificador del centro de aislamiento al que se trasladó
 *                                       al paciente.
 * @property {string|null} centro_diagnostico Identificador del centro que diagnosticó al paciente.
 * @property {string[]} posible_procedencia_contagio Identificadores de los países de los que
 *                                                   posiblemente provenga el contagio.
 * @property {string} info Datos del paciente según el reporte.
 * @property {*[]} provincias_visitadas
 * @property {*[]} dpacode_provincias_visitadas
 */
