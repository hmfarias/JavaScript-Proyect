import { Empleado } from './classes.js';

//ESCALA DE SUELDOS VIGENTE
//CONCEPTOS REMUNERATIVOS
const SUELDO_BASICO = 356000;
const PRESENTISMO = 112000;
const REMUNERATIVO = 123000;
const FERIADO = 0;
const NOCTURNIDAD = 0;

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

/**CREO ARRAY DE EMPLEADOS ------------------------------------- */

const EMPLEADOS = [
	new Empleado(
		'1',
		'20-11111111-7',
		'11111111',
		'HERNANDEZ',
		'JUAN',
		'VIGILADOR',
		'ACTIVO',
		'1971-01-01',
		'2023-12-16',
		'',
		'juan.hernandez@example.com',
		'1234567890123456789012',
		'SI'
	),
	new Empleado(
		'2',
		'20-22222222-7',
		'22222222',
		'ORTEGA',
		'NESTOR',
		'VIGILADOR',
		'ACTIVO',
		'1980-01-01',
		'2020-05-15',
		'',
		'orteganestor@gmail.com',
		'1234567890123456789012',
		'NO'
	),
	new Empleado(
		'3',
		'20-33333333-7',
		'33333333',
		'RODRIGUEZ',
		'CARLOS',
		'VIGILADOR',
		'ACTIVO',
		'1985-11-15',
		'2018-07-10',
		'',
		'carlos.rodriguez@example.com',
		'1234567890123456789012',
		'SI'
	),
	new Empleado(
		'4',
		'20-44444444-7',
		'44444444',
		'LOPEZ',
		'MARTIN',
		'VIGILADOR',
		'ACTIVO',
		'1990-05-21',
		'2017-03-05',
		'',
		'martin.lopez@example.com',
		'1234567890123456789012',
		'NO'
	),
	new Empleado(
		'5',
		'20-55555555-7',
		'55555555',
		'GARCIA',
		'LUIS',
		'VIGILADOR',
		'ACTIVO',
		'1982-12-11',
		'2019-08-19',
		'',
		'luis.garcia@example.com',
		'1234567890123456789012',
		'SI'
	),
	new Empleado(
		'6',
		'20-66666666-7',
		'66666666',
		'SANCHEZ',
		'ANA',
		'VIGILADOR',
		'ACTIVO',
		'1988-07-07',
		'2016-01-15',
		'',
		'ana.sanchez@example.com',
		'1234567890123456789012',
		'NO'
	),
	new Empleado(
		'7',
		'20-77777777-7',
		'77777777',
		'FARIAS',
		'MARCELO',
		'VIGILADOR',
		'ACTIVO',
		'1993-09-30',
		'2004-07-07',
		'',
		'hmfarias@gmail.com',
		'1234567890123456789012',
		'SI'
	),
];
/**FIN CREO ARRAY DE EMPLEADOS ---------------------------------- */

export {
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
};
