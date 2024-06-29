//FUNCIONES A UTILIZAR ----------------------------------------------------------------------------------------------
/**
 * *FUNCIÓN: pedirValor solicita mediante prompt un determinado valor.
 * PARÁMETROS:
 * 	@param nombreValor (es el nombre del valor a solicitar que se mostrará en el prompt)
 *  @param mes (es opcional y corresponde al numero del mes con el que se está trabajando)
 * * Devuelve el valor para el nombreValor ingresado, luego de validarlo
 *
 */

/**IMPORTO EL ARRAY DE EMPLEADOS pues lo necesito para hacer validaciones */
import { EMPLEADOS } from './data.js';

const pedirValor = (nombreValor, mes) => {
	let continuar;
	let valor;
	do {
		valor = parseInt(prompt(`Ingrese ${nombreValor} o CERO para cancelar:`));
		switch (nombreValor.toUpperCase()) {
			case 'MES':
				if (isNaN(valor) || valor < 0 || valor > 12) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;
			case 'AÑO':
				if (isNaN(valor) || valor < 0) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;
			case 'DNI':
				if (!EMPLEADOS.some((empleado) => empleado.dni === valor.toString())) {
					alert(`El empleado no está en la base de datos - Ingrese ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;
			case 'HORAS TRABAJADAS':
				if (isNaN(valor) || valor < 0) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;
			case 'FERIADOS TRABAJADOS':
				if (isNaN(valor) || valor < 0 || valor > calcularFeriados(mes)) {
					alert(`Ingrese un valor válido para ${nombreValor}`);
					continuar = 'si';
				} else {
					continuar = 'no';
				}
				break;

			default:
				break;
		}

		if (valor === 0) continuar = 'no';
	} while (continuar === 'si');
	return valor;
};

/**
 * * FUNCIÓN: calcularHorasBase devuelve las horas base del mes
 * PARÁMETROS:
 * 	@param diasMes (es el número que representa la cantidad de dias del mes con el que se está trabajando)
 * SOBRE LAS HORAS DE TRABAJO
 * En los meses de 30 días las horas base son 208.
 * En los meses de 31 días las horas base son 216.
 * En los meses de 28 días las horas base son 192.
 * En los meses de 29 días las horas base son 200.
 * Cuando el empleado trabaja las horas base del mes, le corresponde cobrar todos los conceptos integramente.
 * Cuando el empleado NO trabaja las horas base del mes, le corresponde cobrar un PROPORCIONAL a las horas trabajadas
 * Cuando el empleado supera las horas base del mes, el excedente se considera HORAS EXTRA
 */
const calculaHorasBase = (diasMes) => {
	let horasBase;
	switch (diasMes) {
		case 31:
			horasBase = 216;
			break;

		case 29:
			horasBase = 200;
			break;

		case 28:
			horasBase = 192;
			break;

		default:
			horasBase = 208;
	}
	return horasBase;
};

/**
 * * FUNCIÓN: calcularDiasTrabajados devuelve la equivalencia en días de trabajo en base a las horas base del mes
 * PARÁMETROS:
 * 	@param horasTrabajadas (número dehoras trabajadas por el empleado)
 * 	@param horasBase (número de horas base del mes seleccionado)
 * 	@param diasMes (es el número que representa la cantidad de dias del mes con el que se está trabajando)
 */

const calcularDiasTrabajados = (horasTrabajadas, horasBase, diasMes) => {
	const DIAS_TRABAJADOS = Math.ceil((horasTrabajadas / horasBase) * diasMes); //redondeo hacia arriba en favor del empleado
	if (DIAS_TRABAJADOS > diasMes) {
		return diasMes;
	}
	return DIAS_TRABAJADOS;
};

/**
 * * FUNCIÓN: calcularExtras devuelve las horas extras trabajadas en caso de corresponder
 * las horas extras son aquellas que exceden las horas base del mes
 * ej: si las horas base del mes son 208 y el empleado trabajo 216, le corresponden 8 horas extra
 * si el empleado trabajó menos de las horas base, la función devuelve cero
 * PARÁMETROS:
 * @param horasTrabajadas (número de horas trabajadas)
 * @param horasBase (número de horas base del mes)
 */
const calcularExtras = (horasTrabajadas, horasBase) => {
	const HORAS_EXTRA = horasTrabajadas - horasBase;
	if (HORAS_EXTRA >= 0) {
		return HORAS_EXTRA;
	}
	return 0;
};

/**
 * * FUNCIÓN: calcularFeriados devuelve el numero de feriados correspondiente al mes y año que se pasa por parámetro
 * PARÁMETROS:
 * 	@param mes (es el número de mes) Hay que mejorar luego esta función agregando el numero de año
 */
const calcularFeriados = (mes) => {
	let cantidadFeriados;
	switch (mes) {
		case 1:
		case 7:
		case 8:
		case 11:
			cantidadFeriados = 1;
			break;

		case 2:
		case 4:
		case 5:
		case 10:
		case 12:
			cantidadFeriados = 2;
			break;

		case 3:
		case 6:
			cantidadFeriados = 3;
			break;

		default:
			cantidadFeriados = 0;
			break;
	}
	return cantidadFeriados;
};

/**
 * * FUNCIÓN:: calcularConceptoProporcional, devuelve el importe proporcional correspondiente al
 * concepto solicitado por argumento;
 * Si el empleado trabajó todos los dias se cobra el 100% del concepto; en caso contrario cobrará un
 * proporcional segun los dias trabajados
 * PARÁMETROS:
 * 	@param diasMes (numero que representa la cantidad de dias del mes)
 * 	@param diasTrabajados (numero que representa los dias efectivamente trabajados por el empleado)
 * 	@param importeConcepto (es el importe del concepto sobre el cual se desea calcular el importe a liquidar)
 */
const calcularProporcional = (diasMes, diasTrabajados, importeConcepto) => {
	const IMPORTE_LIQUIDACION = (importeConcepto / diasMes) * diasTrabajados;
	return IMPORTE_LIQUIDACION;
};

/**
 * * FUNCIÓN:: calcularTiempoAntiguedad, calcula y devuelve la cantidad de años, meses y dias
 * transcurridos desde la fecha de ingreso del empleado hasta el ultimo día del mes con el que se está trabajando
 * PARÁMETROS:
 * @param fechaAlta (fecha de ingreso del empleado)
 * @param fechaCalculo (fecha contra la cual se desea calcular el tiempo transcurrido)
 */
const calcularTiempoAntiguedad = (fechaAlta, fechaCalculo) => {
	const FECHA_CALCULO = new Date(fechaCalculo);
	const FECHA_ALTA = new Date(fechaAlta);

	let anos = FECHA_CALCULO.getFullYear() - FECHA_ALTA.getFullYear();
	let meses = FECHA_CALCULO.getMonth() - FECHA_ALTA.getMonth();
	let dias = FECHA_CALCULO.getDate() - FECHA_ALTA.getDate();

	// Ahora ajusto los meses y años si el mes actual es menor que el mes de la fecha inicial
	if (meses < 0) {
		anos--;
		meses += 12;
	}

	// Ahora ajusto los días y meses si el día fecha de cálculo es menor que el día de la fecha inicial
	if (dias < 0) {
		meses--;
		// obtengo el último día del mes anterior
		const ultimoDiaMesAnterior = new Date(
			FECHA_CALCULO.getFullYear(),
			FECHA_CALCULO.getMonth(),
			0
		).getDate();
		dias += ultimoDiaMesAnterior;
	}
	// todavía no se como devolver los tres valores juntos
	//por ahora me sirve devolver los años que son los que se usan para calcular
	//el procentaje de antiguedad que debo aplicar sobre el sueldo básico
	return anos;
};
/**
 * * FUNCIÓN:: calcularPorcentajeAntiguedad, devuelve el porcentaje que corresponde aplicar para el cálculo del concepto antiguead, en función de la fecha de alta que tenga el empleado
 *
 * El PORCENTAJE a aplicar se basa en el siguiente esquema:
 * Desde el año 1 al  5 corresponde un 2% por año
 * Desde el año 6 al 10 corresponde un 1.5% por año
 * Dese el año 11 en adelante corresponde un 1% por año
 * PARÁMETROS:
 * 	@param anosAntiguedad (es la cantidad de años que tenga el empleado desde el alta en la empresa)
 */

const calcularPorcentajeAntiguedad = (anosAntiguedad) => {
	let porcentajeAno;
	let porcentajeAntiguedad = 0;

	for (let ano = 1; ano <= anosAntiguedad; ano++) {
		if (ano <= 5) {
			porcentajeAno = 2;
		} else if (ano <= 10) {
			porcentajeAno = 1.5;
		} else {
			porcentajeAno = 1;
		}
		porcentajeAntiguedad += porcentajeAno / 100;
	}
	return porcentajeAntiguedad;
};

/**
 * * FUNCIÓN:: calcularImporteAntiguedad, devuelve el importe correspondiente al
 * concepto antiguead, en función de la fecha
 * de alta que tenga el empleado
 * Antiguedad es igual a ((Sueldo Bascio de escala + remunerativo de escala) /
 * total dias del mes * dias trabajados) * Porcentaje correspondiente de acuerdo
 * a los años transcurridos desde su fecha de alta.
 *
 * El PORCENTAJE a aplicar se basa en el siguiente esquema:
 * Desde el año 1 al  5 corresponde un 2% por año
 * Desde el año 6 al 10 corresponde un 1.5% por año
 * Dese el año 11 en adelante corresponde un 1% por año
 * PARÁMETROS:
 * 	@param anosAntiguedad (es la cantidad de años que tenga el empleado desde el alta en la empresa)
 * 	@param diasMes (es el número que representa la cantidad de dias del mes con el que se está trabajando)
 *  @param diasTrabajados (cantidad de dias que se calcularon en base a las horas trabajadas durante el mes)
 *  @param sueldoBasico (importe correspondiente al concepto sueldo basico de escala - si bien es una variable global, la envío por parámetro para que la funcion sea independiente)
 * 	@param remunerativo (importe correspondiente al concepto remunerativo de escala - si bien es una variable global, la envío por parámetro para que la funcion sea independiente)
 */

const calcularImporteAntiguedad = (
	anosAntiguedad,
	diasMes,
	diasTrabajados,
	sueldoBasico,
	remunerativo
) => {
	// calculo el porcentaje a aplicar
	let porcentajeAntiguedad = calcularPorcentajeAntiguedad(anosAntiguedad);

	// ahora calculo el importe de la antiguedad
	const ANTIGUEDAD_LIQUIDACION =
		((sueldoBasico + remunerativo) / diasMes) * diasTrabajados * porcentajeAntiguedad;

	return ANTIGUEDAD_LIQUIDACION;
};

/**
 * * FUNCIÓN:: calcularImporteHorasExtra, devuelve el importe correspondiente a las horas extra trabajadas;
 * La hora normal equivale a: (Sueldo Basico de escala + Antiguedad del empleado + Remunerativo de escala) /200
 * La hora extra equivale a la hora normal mas un 50% de su valor.
 * Hora extra = (hora normal + 50%) * 1.5
 * PARÁMETROS:
 * 	@param horasExtraTrabajadas (cantidad de horas extra que trabajó el empleado en el mes)
 * 	@param importeAntiguedad (importe correspondiente al concepto antiguedad del empleado)
 *  @param sueldoBasico (importe correspondiente al concepto sueldo basico de escala - si bien es una variable global, la envío por parámetro para que la funcion sea independiente)
 * 	@param remunerativo (importe correspondiente al concepto remunerativo de escala - si bien es una variable global, la envío por parámetro para que la funcion sea independiente)
 */
const calcularImporteHorasExtra = (
	horasExtraTrabajadas,
	importeAntiguedad,
	sueldoBasico,
	remunerativo
) => {
	const HORA_NORMAL = (sueldoBasico + importeAntiguedad + remunerativo) / 200;
	const HORA_EXTRA = HORA_NORMAL * 1.5;
	const IMPORTE_HORAS_EXTRA = HORA_EXTRA * horasExtraTrabajadas;
	return IMPORTE_HORAS_EXTRA;
};

/**
 * * FUNCIÓN:: calcularImporteFeriados, devuelve el importe correspondiente a los dias feriados trabajados;
 * El día feriado se calcula: (Sueldo Basico de escala + Antiguedad del empleado + Remunerativo de escala) /25 * Cantidad de
 * feriados trabajados
 * PARÁMETROS:
 * 	@param feriadosTrabajados (cantidad de dias feriados que trabajó el empleado en el mes)
 * 	@param importeAntiguedad (importe correspondiente al concepto antiguedad del empleado)
 * 	@param sueldoBasico (importe correspondiente al concepto sueldo basico de escala - si bien es una variable global, la envío por parámetro para que la funcion sea independiente)
 * 	@param remunerativo (importe correspondiente al concepto remunerativo de escala - si bien es una variable global, la envío por parámetro para que la funcion sea independiente)
 */
const calcularImporteFeriados = (
	feriadosTrabados,
	importeAntiguedad,
	sueldoBasico,
	remunerativo
) => {
	const DIA_FERIADO = (sueldoBasico + importeAntiguedad + remunerativo) / 25;
	const IMPORTE_FERIADOS = DIA_FERIADO * feriadosTrabados;

	return IMPORTE_FERIADOS;
};

const formatearNumero = (numero) => {
	return numero.toLocaleString('de-DE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

//FIN FUNCIONES A UTILIZAR ------------------------------------------------------------------------------------------
export {
	pedirValor,
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
};
