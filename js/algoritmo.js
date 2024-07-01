/**
 * * SIMULADOR LIQUIDACIÓN DE SUELDOS DE UN EMPLEADO DE SEGURIDAD PRIVADA
 *
 * ! PROCURAR TENER LO SUFICIENTEMENTE ANCHA LA ZONA DONDE SE MUESTRA LA CONSOLA PARA QUE EL RECIBO DE LIQUIDACION SE MUESTRE CORRECTAMENTE
 *
 * * Se debe ingresar por prompt:
 * - número de mes del 1 al  12 (cero para salir)
 *
 * - número de año de cuatro digitos (cero para salir)
 *
 * - número de DNI del empleado : son 8 dígitos y deben corresponder a los empleados que están cargados en el Array Empleados que se encuentra en el archivo data.js (los DNI ejemplo son 11111111, 22222222, ... al 77777777). Si no se coloca el DNI de uno de los empleados que existen en el array, se muestra una alerta informando
 *
 * - horas trabajadas teniendo en cuenta que en meses de 30 dias las horas base son 208, en meses de 31 dias las horas base son 216 y todo lo que excede de esas horas son horas extra. El simulador busca las horas base correspondientes al mes ingresado y en base a eso establece los dias trabajados a los que equivalen las horas ingresadas
 * Si las horas ingresadas no son iguales o mayores a las horas base, se liquidará un proporcional
 *
 * - número de dias feriados trabajados. Estos feriados se encuentran previamente cargados de acuerdo al mes y el simulador no permitirá cargar una cantidad de feriados que no coincida con la cantidad maxima de feriados precargada para ese mes
 *
 * Se ha creado una clase Empleado y se han generado siete instancias de esa clase, dentro del array de objetos EMPLEADOS
 *
 * *El simulador muestra la liquidación para el empleado cuyo DNI se haya ingresado por prompt haciendo todos los cálculos (completos o proporcionales) en base a la fecha de ingreso que tenga el empleado y la cantidad de horas que ha cubierto en el mes.
 *
 * TODO: EN EL FUTURO, la idea es hacer la liquidación de TODOS LOS EMPLEADOS si así lo quisiera el usuario. Para ello se irá recorridendo el array de objetos EMPLEADOS donde se encuentran los datos de todos los empleados e ir liquidando sus haberes en función de las horas que hayan cubierto.
 *
 * TODO: Sobre las horas que haya cubierto, la idea en futuros avances, es generar arrays de objetos con los datos de cada mes y las horas que el empleado cubrió en cada uno, de modo que al seleccionar el mes y el año, y en base al DNI ingresado, se busque en el array correspondiente, las horas cubiertas para ese DNI y con ello hacer la liquidacion.
 *
 */

/**IMPORTO CONSTANTES Y DATOS DE EMPLEADOS ---------------------- */
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
} from './data.js';
/**FIN IMPORTO CONSTANTES Y DATOS DE EMPLEADOS ------------------- */

/**IMPORTO FUNCIONES A UTILIZAR -----------------------------------*/
import {
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
} from './functions.js';
/**FIN IMPORTO FUNCIONES A UTILIZAR --------------------------------*/

console.log('Lista de Empleados:');
console.log(EMPLEADOS);

// ALGORITMO *******************************************************************************************************

//PIDO MES A LIQUIDAR VALIDO -------------------------------------------------
const MES = pedirValor('MES');

if (MES != 0) {
	//PIDO AÑO A LIQUIDAR VALIDO -------------------------------------------------
	const ANO = pedirValor('AÑO');
	if (ANO != 0) {
		//establezco la cantidad de dias que tiene el mes seleccionado---------------
		const DIAS_MES = new Date(ANO, MES, 0).getDate();

		//FECHA FIN DE MES
		const FECHA_FIN_MES = new Date(ANO, MES, 0);

		//ESTABLEZCO HORAS BASE PARA EL MES Y AÑO SELECCIONADOS ----------------------
		const HORAS_BASE = calculaHorasBase(DIAS_MES);

		//PIDO DNI DEL EMPLEADO
		const DNI = pedirValor('DNI').toString();
		if (DNI != 0) {
			const EMPLEADO_ACTIVO = EMPLEADOS.find((empleado) => empleado.dni === DNI);

			//PIDO LAS HORAS TRABAJADAS POR EL EMPLEADO DURANTE EL MES Y AÑO SELECCIONADO-
			const HORAS_TRABAJADAS = pedirValor('HORAS TRABAJADAS');

			//CALCULO EQUIVALENCIA EN DIAS PARA ESAS HORAS TRABAJADAS EN BASE A LAS HORAS BASE
			const DIAS_TRABAJADOS = calcularDiasTrabajados(
				HORAS_TRABAJADAS,
				HORAS_BASE,
				DIAS_MES
			);

			//CALCULO HORAS EXTRA - (horas cubiertas que excedan las horas base) --------
			const HORAS_EXTRA = calcularExtras(HORAS_TRABAJADAS, HORAS_BASE);

			//PIDO CANTIDAD DE FERIADOS TRABAJADOS POR EL EMPLEADO PARA EL MES Y AÑO SELECCIONADOS
			const FERIADOS_TRABAJADOS = pedirValor('FERIADOS TRABAJADOS', MES);

			//CALCULO SUELDO BÁSICO
			const SUELDO_BASICO_LIQUIDACION = calcularProporcional(
				DIAS_MES,
				DIAS_TRABAJADOS,
				SUELDO_BASICO
			);

			//CALCULO PRESENTISMO
			const PRESENTISMO_LIQUIDACION = calcularProporcional(
				DIAS_MES,
				DIAS_TRABAJADOS,
				PRESENTISMO
			);

			//CALCULO REMUNERATIVO
			const REMUNERATIVO_LIQUIDACION = calcularProporcional(
				DIAS_MES,
				DIAS_TRABAJADOS,
				REMUNERATIVO
			);

			//CALCULO VIATICOS
			const VIATICOS_LIQUIDACION = calcularProporcional(
				DIAS_MES,
				DIAS_TRABAJADOS,
				VIATICOS
			);

			//CALCULO ANTIGUEDAD PARA UN DETERMINADO EMPLEADO
			const ANOS_ANTIGUEDAD = calcularTiempoAntiguedad(
				EMPLEADO_ACTIVO.fechaAlta,
				FECHA_FIN_MES
			);
			const PORCENTAJE_ANTIGUEDAD = calcularPorcentajeAntiguedad(ANOS_ANTIGUEDAD);
			const ANTIGUEDAD_LIQUIDACION = calcularImporteAntiguedad(
				ANOS_ANTIGUEDAD,
				DIAS_MES,
				DIAS_TRABAJADOS,
				SUELDO_BASICO,
				REMUNERATIVO
			);
			//FIN CALCULO ANTIGUEDAD PARA UN DETERMINADO EMPLEADO

			//CALCULO HORAS EXTRA
			const HORAS_EXTRA_LIQUIDACION = calcularImporteHorasExtra(
				HORAS_EXTRA,
				ANTIGUEDAD_LIQUIDACION,
				SUELDO_BASICO,
				REMUNERATIVO
			);

			//CALCULO IMPORTE FERIADOS
			const FERIADOS_LIQUIDACION = calcularImporteFeriados(
				FERIADOS_TRABAJADOS,
				ANTIGUEDAD_LIQUIDACION,
				SUELDO_BASICO,
				REMUNERATIVO
			);

			//CALCULO SUMA NO REMUNERATIVA
			const NO_REMUNETATIVO_LIQUIDACION = calcularProporcional(
				DIAS_MES,
				DIAS_TRABAJADOS,
				NO_REMUNERATIVO
			);

			// CALCULO EL TOTAL DE BONIFICACIONES REMUNERATIVAS
			const TOTAL_REMUNERATIVO =
				SUELDO_BASICO_LIQUIDACION +
				ANTIGUEDAD_LIQUIDACION +
				REMUNERATIVO_LIQUIDACION +
				PRESENTISMO_LIQUIDACION +
				FERIADOS_LIQUIDACION +
				HORAS_EXTRA_LIQUIDACION;

			// CALCULO EL TOTAL DE BONIFICACIONES NO REMUNERATIVAS
			const TOTAL_NO_REMUNERATIVO = VIATICOS_LIQUIDACION + NO_REMUNETATIVO_LIQUIDACION;

			// CALCULO DE LOS APORTES --------------------------------------------------
			// CALCULO IMPORTE APORTE JUBILATORIO
			const APORTE_JUBILATORIO_LIQUIDACION = TOTAL_REMUNERATIVO * PORCE_JUBILACION;

			// CALCULO IMPORTE APORTE LEY 19.032
			const APORTE_LEY19032_LIQUIDACION = TOTAL_REMUNERATIVO * PORCE_LEY19032;

			// CALCULO IMPORTE APORTE SUVICO
			// si el empleado es socio de SUVICO corresponde un 3% en caso contratio 2%
			let aporteSuvicoLiquidacion;

			switch (EMPLEADO_ACTIVO.suvico) {
				case 'SI':
					aporteSuvicoLiquidacion =
						(TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_SUVICO;
					break;

				default:
					aporteSuvicoLiquidacion =
						(TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_APORTE_SOLIDARIO;
					break;
			}

			// CALCULO IMPORTE APORTE OBRA SOCIAL
			const APORTE_OBRA_SOCIAL_LIQUIDACION =
				(TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_OBRA_SOCIAL;

			// FIN CALCULO DE LOS APORTES ----------------------------------------------

			// CALCULO EL TOTAL DE DESCUENTOS
			const TOTAL_DESCUENTOS =
				APORTE_JUBILATORIO_LIQUIDACION +
				APORTE_LEY19032_LIQUIDACION +
				aporteSuvicoLiquidacion +
				APORTE_OBRA_SOCIAL_LIQUIDACION;

			// CALCULO EL TOTAL DE BOLSILLO
			const TOTAL_BOLSILLO =
				TOTAL_REMUNERATIVO + TOTAL_NO_REMUNERATIVO - TOTAL_DESCUENTOS;

			//MUESTRO LA LIQUIDACIÓN POR CONSOLA (procurar que sea ancha el area de consola------
			console.log(
				`   Fecha de proceso: ${FECHA_HOY}
				------------------------------------------------------------
				Datos ingresados:
				Mes a Liquidar: ${MES} | Año a liquidar: ${ANO}
				Días del mes: ${DIAS_MES}
				Legajo: ${EMPLEADO_ACTIVO.legajo}
				DNI: ${EMPLEADO_ACTIVO.dni} CUIL: ${EMPLEADO_ACTIVO.cuil}
				Nombre: ${EMPLEADO_ACTIVO.nombre}
				Categoría: ${EMPLEADO_ACTIVO.tipo} Estado: ${EMPLEADO_ACTIVO.estado}
				Fecha Nacimiento: ${EMPLEADO_ACTIVO.fechaNacimiento}
				Fecha Alta: ${EMPLEADO_ACTIVO.fechaAlta}  Fecha Baja: ${EMPLEADO_ACTIVO.fechaBaja}
				Email: ${EMPLEADO_ACTIVO.email}
				Antiguedad: ${ANOS_ANTIGUEDAD} años Porcentaje: ${formatearNumero(
					PORCENTAJE_ANTIGUEDAD * 100
				)}%
				Horas base: ${HORAS_BASE}
				Horas Trabajadas: ${HORAS_TRABAJADAS}
				Dias a liquidar: ${DIAS_TRABAJADOS}
				Horas Extra: ${HORAS_EXTRA}
				Feriados Trabajados: ${FERIADOS_TRABAJADOS} \n
				-------------------------------------------------------------------
				Liquidación:  Cant   REMUNERATIVOS  NO REMUNERATIVOS   DESCUENTOS
				-------------------------------------------------------------------
				Sueldo Básico: ${DIAS_TRABAJADOS}      $ ${formatearNumero(SUELDO_BASICO_LIQUIDACION)}
				Antiguedad   : ${formatearNumero(PORCENTAJE_ANTIGUEDAD * 100)}%     $ ${formatearNumero(
					ANTIGUEDAD_LIQUIDACION
				)}
				Remunerativo : ${DIAS_TRABAJADOS}      $ ${formatearNumero(REMUNERATIVO_LIQUIDACION)}
				Presentismo  : ${DIAS_TRABAJADOS}      $ ${formatearNumero(PRESENTISMO_LIQUIDACION)}
				Feriados     :  ${FERIADOS_TRABAJADOS}      $ ${formatearNumero(FERIADOS_LIQUIDACION)}
				Horas Extra  : ${HORAS_EXTRA}      $ ${formatearNumero(HORAS_EXTRA_LIQUIDACION)}
				Viáticos     : ${DIAS_TRABAJADOS}    			 	     $ ${formatearNumero(VIATICOS_LIQUIDACION)}
				Suma No Remun: ${DIAS_TRABAJADOS}    				     $ ${formatearNumero(
					NO_REMUNETATIVO_LIQUIDACION
				)}
				-------------------------------------------------------------------
				TOTAL BONIFIC:         $ ${formatearNumero(TOTAL_REMUNERATIVO)}  $ ${formatearNumero(
					TOTAL_NO_REMUNERATIVO
				)}     
				-------------------------------------------------------------------
				Jubilación  :     								      $ ${formatearNumero(APORTE_JUBILATORIO_LIQUIDACION)}
				Ley 19.032  :     								      $ ${formatearNumero(APORTE_LEY19032_LIQUIDACION)}
				SUVICO      :     								      $ ${formatearNumero(aporteSuvicoLiquidacion)}
				Obra Social:     								      $ ${formatearNumero(APORTE_OBRA_SOCIAL_LIQUIDACION)}
				-------------------------------------------------------------------
				TOTAL DESCUENTOS:       						     $ ${formatearNumero(TOTAL_DESCUENTOS)}
				-------------------------------------------------------------------
				TOTAL DE BOLSILLO:       $ ${formatearNumero(TOTAL_BOLSILLO)}
				`
			);

			// FIN ALGORITMO ***************************************************************************************************
		}
	}
}
