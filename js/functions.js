/**IMPORTO CONSTANTES Y DATOS DE EMPLEADOS ---------------------- */
import {
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
} from './data.js';
/**FIN IMPORTO CONSTANTES Y DATOS DE EMPLEADOS ------------------- */

//FUNCIONES A UTILIZAR ----------------------------------------------------------------------------------------------
/**
 * *FUNCION: ordenarArray ordena un array de acuerdo a un campo indicado por parámetro
 * @param array (es el array que se desea ordenar)
 * @param campo (es el campo del array por el que se quiere ordenar)
 */
const ordenarArray = (array, campo) => {
	return array.sort((a, b) => {
		if (a[campo] < b[campo]) {
			return -1;
		}
		if (a[campo] > b[campo]) {
			return 1;
		}
		return 0;
	});
};

/**
 * *FUNCION generarRecibo: genera el recibo cuando se hace click en la card de un empleado
 *@param: event (es el evento disparado al hacer click en el boton de la card de un empleado)
 * dentro de este evento, se encuentran los atributos creados dentro del boton para trasladar
 * los datos necesarios para generar el recibo: mes. año, dni, horas trabajadas, feriados trabajados y horas nocturnas
 * con esos datos ya se puede calcular el recibo de ese período
 */

const generarRecibo = (event) => {
	//tomo las keys que vienen en el evento click y que son necesarias para las busquedas en los arrays empleados y coberturas
	const MES = event.target.getAttribute('keyMes');
	const ANO = event.target.getAttribute('keyAno');
	const DNI = event.target.getAttribute('keyDni');

	//Busco el empleado en el array de empleados
	const EMPLEADO_ACTIVO = EMPLEADOS.find((empleado) => empleado.dni === DNI);

	//Busco la cobertura del empleado en el array de coberturas
	const COBERTURA_ACTIVA = COBERTURAS.find(
		(cobertura) => cobertura.mes === MES && cobertura.ano === ANO && cobertura.dni === DNI
	);

	//A partir de aquí comienzo a calcular todos los conceptos necesarios para el recibo ----
	//START CALCULO DE CONCEPTOS PARA EL RECIBO ----------------------------------------------------------

	//establezco la cantidad de dias que tiene el mes seleccionado---------------
	const DIAS_MES = new Date(ANO, MES, 0).getDate();

	//FECHA FIN DE MES
	const FECHA_FIN_MES = new Date(ANO, MES, 0);

	//ESTABLEZCO HORAS BASE PARA EL MES Y AÑO SELECCIONADOS ----------------------
	const HORAS_BASE = calculaHorasBase(DIAS_MES);

	//CALCULO EQUIVALENCIA EN DIAS PARA LAS HORAS TRABAJADAS EN BASE A LAS HORAS BASE
	const DIAS_TRABAJADOS = calcularDiasTrabajados(
		COBERTURA_ACTIVA.horas,
		HORAS_BASE,
		DIAS_MES
	);

	//CALCULO HORAS EXTRA - (horas cubiertas que excedan las horas base) --------
	const HORAS_EXTRA = calcularExtras(COBERTURA_ACTIVA.horas, HORAS_BASE);

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
	const VIATICOS_LIQUIDACION = calcularProporcional(DIAS_MES, DIAS_TRABAJADOS, VIATICOS);

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
		COBERTURA_ACTIVA.feriados,
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
	let aporteSuvicoLiquidacion =
		EMPLEADO_ACTIVO.suvico === 'SI'
			? (TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_SUVICO
			: (TOTAL_REMUNERATIVO + NO_REMUNETATIVO_LIQUIDACION) * PORCE_APORTE_SOLIDARIO;

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
	const TOTAL_BOLSILLO = TOTAL_REMUNERATIVO + TOTAL_NO_REMUNERATIVO - TOTAL_DESCUENTOS;

	//END CALCULO DE CONCEPTOS PARA EL RECIBO ----------------------------------------------------------

	//START ARMADO DEL HTML A RENDERIZAR ---------------------------------------------------------------
	const HTML = `
	<h5>Nombre: ${EMPLEADO_ACTIVO.nombre} DNI: ${EMPLEADO_ACTIVO.dni} CUIL: ${
		EMPLEADO_ACTIVO.cuil
	} </h5> 
	
	<p>
	LEGAJO: ${EMPLEADO_ACTIVO.id}<br />
	CUIL: ${EMPLEADO_ACTIVO.cuil} <br />
	DNI: ${EMPLEADO_ACTIVO.dni}<br />
	FECHA NACIMIENTO: ${EMPLEADO_ACTIVO.fechaNacimiento}<br />
	FECHA ALTA: ${
		EMPLEADO_ACTIVO.fechaAlta
	} Antiguedad: ${ANOS_ANTIGUEDAD} años Pje: ${formatearNumero(
		PORCENTAJE_ANTIGUEDAD * 100
	)}%<br />
	FECHA BAJA: ${EMPLEADO_ACTIVO.fechaBaja} <br />
	EMAIL: ${EMPLEADO_ACTIVO.email} <br />
	CATEGORIA: ${EMPLEADO_ACTIVO.tipo} Estado: ${EMPLEADO_ACTIVO.estado}
	SUVICO: ${EMPLEADO_ACTIVO.suvico} <br />
	----------------------------------------------------------------------
	</p>
	<h5>Mes: ${MES}  Año: ${ANO}</h5>
	<p>
	<strong>DATOS PARA LIQUIDACIÓN:</strong><br />                 
	Fecha de proceso: ${FECHA_HOY}
	COBERTURA: <br />
	Días del mes: ${DIAS_MES}<br />
	Horas base: ${HORAS_BASE}<br />
	HORAS TRABAJADAS: ${COBERTURA_ACTIVA.horas}<br />
	DIAS A LIQUIDAR: ${DIAS_TRABAJADOS}<br />
	FERIADOS TRABAJADOS: ${COBERTURA_ACTIVA.feriados}<br />
	HORAS EXTRA: ${HORAS_EXTRA}<br/>
	HORAS NOCTURNAS: ${COBERTURA_ACTIVA.horasNocturnas} <br />
	</p>
	<p>
	-----------------------------------------------------------------------------<br />
	Liquidación:  Cant   REMUNERATIVOS  NO REMUNERATIVOS   DESCUENTOS<br />
	-----------------------------------------------------------------------------<br />
	Sueldo Básico: ${DIAS_TRABAJADOS}      $ ${formatearNumero(
		SUELDO_BASICO_LIQUIDACION
	)}<br />
	Antiguedad   : ${formatearNumero(PORCENTAJE_ANTIGUEDAD * 100)}%     $ ${formatearNumero(
		ANTIGUEDAD_LIQUIDACION
	)}<br />
	Remunerativo : ${DIAS_TRABAJADOS}      $ ${formatearNumero(
		REMUNERATIVO_LIQUIDACION
	)}<br />
	Presentismo  : ${DIAS_TRABAJADOS}      $ ${formatearNumero(PRESENTISMO_LIQUIDACION)}<br />
	Feriados     :  ${COBERTURA_ACTIVA.feriados}      $ ${formatearNumero(
		FERIADOS_LIQUIDACION
	)}<br />
	Horas Extra  : ${HORAS_EXTRA}      $ ${formatearNumero(HORAS_EXTRA_LIQUIDACION)}<br />
	Viáticos     : ${DIAS_TRABAJADOS}    			 	     $ ${formatearNumero(
		VIATICOS_LIQUIDACION
	)}<br />
	Suma No Remun: ${DIAS_TRABAJADOS}    				     $ ${formatearNumero(
		NO_REMUNETATIVO_LIQUIDACION
	)}<br />
	-----------------------------------------------------------------------------<br />
	TOTAL BONIFIC:         $ ${formatearNumero(TOTAL_REMUNERATIVO)}  $ ${formatearNumero(
		TOTAL_NO_REMUNERATIVO
	)}<br /> 
	-----------------------------------------------------------------------------<br />
	Jubilación  :     								      $ ${formatearNumero(APORTE_JUBILATORIO_LIQUIDACION)}<br />
	Ley 19.032  :     								      $ ${formatearNumero(APORTE_LEY19032_LIQUIDACION)}<br />
	SUVICO      :     								      $ ${formatearNumero(aporteSuvicoLiquidacion)}<br />
	Obra Social:     								      $ ${formatearNumero(APORTE_OBRA_SOCIAL_LIQUIDACION)}<br />
	-----------------------------------------------------------------------------<br />
	TOTAL DESCUENTOS:       						     $ ${formatearNumero(TOTAL_DESCUENTOS)}<br />
	-----------------------------------------------------------------------------<br />
	TOTAL DE BOLSILLO:       $ ${formatearNumero(TOTAL_BOLSILLO)}<br />
	</p>`;
	//END ARMADO EL HTML A RENDERIZAR ------------------------------------------------------------

	//tomo el elemento del DOM donde se va a renderizar el recibo dentro del modal
	let DOMreciboContent = document.getElementById('recibo-content');
	DOMreciboContent.innerHTML = ''; //elimino lo que pudiera tener
	//renderizo el DOM
	DOMreciboContent.innerHTML += HTML;

	//muestro ventana modal para poder solicitar la descarga del pdf
	const modal = new bootstrap.Modal(document.getElementById('reciboModal'));
	modal.show();

	//tomo el boton de descarga de la ventana modal y le asigno un listener para el evento click
	document.getElementById('download-pdf').addEventListener('click', downloadReceipt);
};

/**
 * * FUNCION: downloadReceipt genera la descarga del recibo en formato pdf (utiliza libreria htm2pdf())
 * @param elemento (es el elemento que se desa imprimr)
 */
const downloadReceipt = () => {
	const element = document.getElementById('recibo-content');
	const opt = {
		margin: 1,
		filename: 'recibo_de_sueldo.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: { scale: 2 },
		jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
	};
	html2pdf().set(opt).from(element).save();
};

/**
 * * FUNCION: renderizarEmpleados renderiza en el DOM el detalle de cards de empleados mostrándolos en orden alfabético
 * Para poder mostrar el listado de empleados ordenado por nombre, es necesario construir un nuevo array con los datos de los empleados y las coberturas unidas, para luego ordenarlo por nombre utilizando SORT
 * PARÁMETROS:
 * @param mes (es el numero de mes ingresado en el formulario)
 * @param ano (es el numero de año ingresado en el formulario)
 */
const renderizaEmpleados = (mes, ano) => {
	let DOMdetalleRecibos = document.getElementById('detalleRecibos'); //traigo el objeto contenedor del DOM
	DOMdetalleRecibos.innerHTML = ''; //elimino lo que pudiera tener

	let datosRecibos = []; //en este array estarán los datos de cada recibo - resultado de unir COBERTURAS Y EMPLEADOS

	//recorro el array de coberturas, operando sobre las que correspondan al mes y año ingresados
	COBERTURAS.forEach((coberturaElemento) => {
		if (coberturaElemento.mes === mes && coberturaElemento.ano === ano) {
			//objeto cobertura individual
			let coberturaRecibo = {
				horas: coberturaElemento.horas,
				feriados: coberturaElemento.feriados,
				horasNocturnas: coberturaElemento.horasNocturnas,
			};
			//objeto empleado individual
			let empleadoRecibo = EMPLEADOS.find(
				(empleado) => empleado.dni === coberturaElemento.dni
			);
			//uno los dos objetos anteriores
			let recibo = { ...empleadoRecibo, ...coberturaRecibo }; //uno los objetos
			//agrego el nuevo objeto al array datosRecibos que sera el que despues voy a ordenar por nombre
			datosRecibos.push(recibo);
		}
	});

	//ordeno por nombre el array con los datos de los recibos para el mes y año solicitados
	//una visualizacion alfabetica es mejor en el caso de que sean muchos los empleados
	const datosRecibosOrdenados = ordenarArray(datosRecibos, 'nombre');

	// guardo el conjunto de recibos en local storage por si se lo quiere volver a procesar
	localStorage.setItem('ultimoLote', JSON.stringify(datosRecibosOrdenados));

	//modifico el DOM
	datosRecibosOrdenados.forEach((element) => {
		const HTML = `
			<!-- Start employee ----------------------------------->
			<article class="col-md-4 receipt my-4">
				<div class="card pt-2 px-2 mt-1 rounded-3 bg-secondary-subtle h-100">
					<img
						src="../assets/images/${element.foto}"
						class="card-img-top rounded-3"
						alt="imagen empleado"
					/>
					<div class="card-body">
						<h5 class="card-title">${element.nombre}</h5>
						<p class="card-text justified">
							ID: ${element.id}<br />
							CUIL: ${element.cuil} <br />
							DNI: ${element.dni}<br />
							FECHA NACIMIENTO: ${element.fechaNacimiento}<br />
							FECHA ALTA: ${element.fechaAlta} <br />
							FECHA BAJA: ${element.fechaBaja} <br />
							EMAIL: ${element.email} <br />
							SUVICO: ${element.suvico} <br />
							------------------- <br />
							COBERTURA: <br />
							HORAS TRABAJADAS:  ${element.horas}<br />
							FERIADOS TRABAJADOS: ${element.feriados}<br />
							HORAS NOCTURNAS: ${element.horasNocturnas} <br />
						</p>
						<button class="btn btn-primary btn-recibo" keyMes=${mes} keyAno= ${ano} keyDni=${element.dni}>Recibo</button>
					</div>
				</div>
			</article>
			<!-- End employee -------------------------------------->
			`;
		DOMdetalleRecibos.innerHTML += HTML;
	});
	document.querySelectorAll('.btn-recibo').forEach((boton) => {
		boton.addEventListener('click', generarRecibo);
	});
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
};
