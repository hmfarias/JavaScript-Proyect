import { Empleado, Cobertura } from './classes.js';

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
		'SI',
		'employee1.webp'
	),
	new Empleado(
		'2',
		'20-22222222-7',
		'22222222',
		'ORTEGA',
		'ANDREA',
		'VIGILADOR',
		'ACTIVO',
		'1980-01-01',
		'2020-05-15',
		'',
		'orteganestor@gmail.com',
		'1234567890123456789012',
		'NO',
		'employee2.webp'
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
		'SI',
		'employee3.webp'
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
		'NO',
		'employee4.webp'
	),
	new Empleado(
		'5',
		'20-55555555-7',
		'55555555',
		'CARRANZA',
		'MONICA',
		'VIGILADOR',
		'ACTIVO',
		'1982-12-11',
		'2019-08-19',
		'',
		'luis.garcia@example.com',
		'1234567890123456789012',
		'SI',
		'employee5.webp'
	),
	new Empleado(
		'6',
		'20-66666666-7',
		'66666666',
		'ALVAREZ',
		'ANALIA',
		'VIGILADOR',
		'ACTIVO',
		'1988-07-07',
		'2016-01-15',
		'',
		'ana.sanchez@example.com',
		'1234567890123456789012',
		'NO',
		'employee6.webp'
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
		'SI',
		'employee7.webp'
	),
	new Empleado(
		'8',
		'20-88888888-7',
		'88888888',
		'DELSERI',
		'CRISTIAN',
		'VIGILADOR',
		'ACTIVO',
		'1993-04-17',
		'2007-17-03',
		'',
		'cdelseri@gmail.com',
		'1234567890123456789012',
		'SI',
		'employee8.webp'
	),
	new Empleado(
		'9',
		'20-99999999-7',
		'99999999',
		'ECHENIQUE',
		'ALFONSO',
		'VIGILADOR',
		'ACTIVO',
		'1990-08-17',
		'2020-01-03',
		'',
		'echeniquealfonso@gmail.com',
		'1234567890123456789012',
		'NO',
		'employee9.webp'
	),
	new Empleado(
		'10',
		'27-10101101-7',
		'10101101',
		'RAMONDA',
		'CONSTANZA',
		'VIGILADOR',
		'ACTIVO',
		'1996-09-11',
		'2023-01-03',
		'',
		'cotiramonda@gmail.com',
		'1234567890123456789012',
		'NO',
		'employee10.webp'
	),
];
/**FIN CREO ARRAY DE EMPLEADOS ---------------------------------- */

/**CREO ARRAY DE COBERTURAS ------------------------------------- */

const COBERTURAS = [
	new Cobertura('1', '2024', '01', '11111111', 216, 1, 100),
	new Cobertura('2', '2024', '01', '22222222', 240, 1, 75),
	new Cobertura('3', '2024', '01', '33333333', 232, 0, 0),
	new Cobertura('4', '2024', '01', '44444444', 216, 0, 0),
	new Cobertura('5', '2024', '01', '55555555', 198, 1, 0),
	new Cobertura('6', '2024', '01', '77777777', 252, 2, 125),
	new Cobertura('7', '2024', '02', '11111111', 125, 0, 100),
	new Cobertura('8', '2024', '02', '22222222', 232, 1, 75),
	new Cobertura('9', '2024', '02', '33333333', 208, 0, 0),
	new Cobertura('10', '2024', '02', '44444444', 216, 0, 0),
	new Cobertura('11', '2024', '02', '55555555', 208, 0, 0),
	new Cobertura('12', '2024', '02', '66666666', 200, 0, 0),
	new Cobertura('13', '2024', '02', '77777777', 220, 1, 100),
	new Cobertura('14', '2024', '02', '88888888', 200, 0, 0),
	new Cobertura('15', '2024', '02', '99999999', 220, 1, 100),
	new Cobertura('16', '2024', '03', '11111111', 232, 0, 0),
	new Cobertura('17', '2024', '03', '22222222', 232, 1, 75),
	new Cobertura('18', '2024', '03', '33333333', 208, 1, 100),
	new Cobertura('19', '2024', '03', '44444444', 216, 0, 0),
	new Cobertura('20', '2024', '03', '55555555', 208, 1, 0),
	new Cobertura('21', '2024', '03', '66666666', 200, 0, 0),
	new Cobertura('22', '2024', '03', '77777777', 220, 1, 100),
	new Cobertura('23', '2024', '03', '88888888', 200, 0, 0),
	new Cobertura('24', '2024', '03', '99999999', 220, 1, 100),
	new Cobertura('25', '2024', '03', '10101101', 220, 1, 100),
	new Cobertura('26', '2024', '04', '11111111', 232, 0, 0),
	new Cobertura('27', '2024', '04', '22222222', 232, 1, 75),
	new Cobertura('28', '2024', '04', '33333333', 208, 1, 100),
	new Cobertura('29', '2024', '04', '44444444', 216, 0, 0),
	new Cobertura('30', '2024', '04', '55555555', 208, 1, 0),
	new Cobertura('31', '2024', '04', '66666666', 200, 0, 0),
	new Cobertura('32', '2024', '04', '77777777', 220, 1, 100),
	new Cobertura('33', '2024', '04', '88888888', 200, 0, 0),
	new Cobertura('34', '2024', '04', '99999999', 220, 1, 100),
	new Cobertura('35', '2024', '04', '10101101', 220, 1, 100),
	new Cobertura('36', '2024', '05', '11111111', 232, 0, 0),
	new Cobertura('37', '2024', '05', '33333333', 208, 1, 100),
	new Cobertura('38', '2024', '05', '44444444', 216, 0, 0),
	new Cobertura('39', '2024', '05', '55555555', 208, 1, 0),
	new Cobertura('40', '2024', '05', '77777777', 220, 1, 100),
	new Cobertura('41', '2024', '05', '88888888', 200, 0, 0),
	new Cobertura('42', '2024', '05', '10101101', 220, 1, 100),
];
/**FIN CREO ARRAY DE COBERTURAS ---------------------------------- */

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
	EMPLEADOS,
	COBERTURAS,
};
