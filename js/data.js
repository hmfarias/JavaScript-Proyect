// START IMPORTO LAS CLASES QUE VOY A NECESITAR */ --------------
import { Empleado, Cobertura } from './classes.js';
// END IMPORTO LAS CLASES QUE VOY A NECESITAR */ --------------

const CANTIDAD_EMPLEADOS = 100; // Esta constante define la cantidad de empleados que utilizará la simulación

//************************************************************************************** */
/**
 * *FUNCIÓN: pedirEmpleadosAPI, pide a la API Random User Gerator API https://randomuser.me, un conjunto de datos de usuarios segun la cantidad definida en CANTIDAD_EMPLEADOS
 * los datos se piden con nacionalidad Estados Unidos, ya que no hay en la api, datos de Argentina
 * Igualemnte con fines didácticos está bien
 */
const pedirEmpleados = async () => {
	const EMPLEADOS_RANDOM = await fetch(
		`https://randomuser.me/api/?results=${CANTIDAD_EMPLEADOS}&nat=us`
	);
	const DATA = await EMPLEADOS_RANDOM.json();
	// const RESULT = DATA.results[0];

	return DATA.results;
};
//************************************************************************************** */
const EMPLEADOS_RESULT = await pedirEmpleados(); //pido los empleados a la API

// START CREO EL ARRAY DE EMPLEADOS USANDO EL ARRAY OBTENIDO DE LA API
//************************************************************************************** */
/**
 * *FUNCION: crearEmpleados crea un array de empleados utilizando el array de objetos pedido a la API Random User Generator API https://randomuser.me
 */
const crearEmpleados = () => {
	const EMPLEADOS_RANDOM = [];
	let id = 1; //el id para cada empleado
	EMPLEADOS_RESULT.forEach((element) => {
		let newEmpleadoRandom = new Empleado(
			id.toString(),
			element.id.name + element.id.value,
			element.id.value,
			element.name.last,
			element.name.first,
			'VIGILADOR',
			'ACTIVO',
			element.dob.date,
			element.registered.date,
			'',
			element.email,
			'1234567890123456789012',
			'SI',
			element.picture.large
		);
		id++;

		EMPLEADOS_RANDOM.push(newEmpleadoRandom);
	});

	return EMPLEADOS_RANDOM;
};

//CREO EL ARRAY DE EMPLEADOS CON EL QUE TRABAJARÁ LA SIMULACION
const EMPLEADOS_API = crearEmpleados();
//************************************************************************************** */
// END CREO EL ARRAY DE EMPLEADOS USANDO LA API Random User -----------------------------------

// START CREO EL ARRAY DE COBERTURAS ----------------------------------------------------------
//************************************************************************************** */
/**
 * *FUNCION: crearCoberturas crea un array de coberturas para los empleados creados con la API Random User Gerator API https://randomuser.me
 */
const crearCoberturas = () => {
	const COBERTURAS_API = [];
	let idCobertura = 1;
	EMPLEADOS_API.forEach((empleado) => {
		for (let i = 1; i <= 6; i++) {
			let newCobertura = new Cobertura(
				idCobertura.toString(),
				'2024',
				i.toString().padStart(2, '0'),
				empleado.id,
				generarNumeroRandom(180, 232),
				generarNumeroRandom(0, 1),
				generarNumeroRandom(0, 180)
			);
			idCobertura++;
			COBERTURAS_API.push(newCobertura);
		}
	});
	return COBERTURAS_API;
};

const generarNumeroRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
const COBERTURAS_API = crearCoberturas(); //instancio la funcion para que se creen las coberturas
//************************************************************************************** */
// END CREO EL ARRAY DE COBERTURAS -----------------------------------

//ESCALA DE SUELDOS VIGENTE
//CONCEPTOS REMUNERATIVOS
const SUELDO_BASICO = 356000;
const PRESENTISMO = 112000;
const REMUNERATIVO = 123000;

const VIATICOS = 219000;

//CONCEPTOS NO REMUNERATIVOS
const NO_REMUNERATIVO = 30000;

//DESCUENTOS DE LEY - aplican solo sobre conceptos REMUNERATIVOS
const PORCE_JUBILACION = 0.11;
const PORCE_LEY19032 = 0.03;
const PORCE_OBRA_SOCIAL = 0.03;
const PORCE_SUVICO = 0.03;
const PORCE_APORTE_SOLIDARIO = 0.02;

const FECHA_HOY = new Date().toLocaleDateString();

export {
	SUELDO_BASICO,
	PRESENTISMO,
	REMUNERATIVO,
	VIATICOS,
	NO_REMUNERATIVO,
	PORCE_JUBILACION,
	PORCE_LEY19032,
	PORCE_OBRA_SOCIAL,
	PORCE_SUVICO,
	PORCE_APORTE_SOLIDARIO,
	FECHA_HOY,
	EMPLEADOS_API,
	COBERTURAS_API,
};
