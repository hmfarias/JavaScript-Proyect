/**IMPORTO CONSTANTES Y DATOS DE EMPLEADOS ---------------------- */
import { Cobertura } from './classes.js';
import {
	SUELDO_BASICO,
	PRESENTISMO,
	REMUNERATIVO,
	FERIADO,
	NOCTURNIDAD,
	VIATICOS,
	NO_REMUNERATIVO,
	PORCE_JUBILACION,
	PORCE_LEY19032,
	PORCE_OBRA_SOCIAL,
	PORCE_SUVICO,
	PORCE_APORTE_SOLIDARIO,
	FECHA_HOY,
	EMPLEADOS,
	COBERTURAS,
} from './data.js';
/**FIN IMPORTO CONSTANTES Y DATOS DE EMPLEADOS ------------------- */

/**IMPORTO FUNCIONES A UTILIZAR -----------------------------------*/
import {
	renderizaEmpleados,
	calculaHorasBase,
	calcularDiasTrabajados,
	calcularExtras,
	calcularProporcional,
	calcularImporteAntiguedad,
	calcularImporteHorasExtra,
	calcularImporteFeriados,
	formatearNumero,
	calcularTiempoAntiguedad,
	calcularPorcentajeAntiguedad,
} from './functions.js';
/**FIN IMPORTO FUNCIONES A UTILIZAR --------------------------------*/

console.log('Lista de Empleados:');
console.log(EMPLEADOS);

// Tomo elementos del DOM necesarios para el proceso ( FORMULARIO, AÑO y MES)
const ANO = document.getElementById('ano');
const MES = document.getElementById('mes');
const ANO_MES_FORM = document.getElementById('anoMesForm');

ANO_MES_FORM.addEventListener('submit', (evento) => {
	evento.preventDefault();
	renderizaEmpleados(MES.value, ANO.value);

	const DIAS_MES = new Date(ANO.value, MES.value, 0).getDate();

	//FECHA FIN DE MES
	const FECHA_FIN_MES = new Date(ANO.value, MES.value, 0);

	//ESTABLEZCO HORAS BASE PARA EL MES Y AÑO SELECCIONADOS ----------------------
	const HORAS_BASE = calculaHorasBase(DIAS_MES);

	console.log('datos para el recibo');
	console.log(datosRecibos);
});
