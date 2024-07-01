/**IMPORTO FUNCIONES A UTILIZAR -----------------------------------*/
import { renderizaEmpleados } from './functions.js';
/**FIN IMPORTO FUNCIONES A UTILIZAR --------------------------------*/

// Tomo elementos del DOM necesarios para el proceso ( FORMULARIO, AÑO y MES)
const ANO = document.getElementById('ano');
const MES = document.getElementById('mes');
const ANO_MES_FORM = document.getElementById('anoMesForm');
const BTN_ULTIMO_LOTE = document.getElementById('btnCargarUltimoLote');

// Agrego listener para el evento submit del formulario en el que se selecciona MES y AÑO a consultar
ANO_MES_FORM.addEventListener('submit', (evento) => {
	evento.preventDefault();
	renderizaEmpleados(MES.value.padStart(2, '0'), ANO.value);
});

//Agrego listener para el boton que carga desde el local Storage el ultimo lote trabajado
BTN_ULTIMO_LOTE.addEventListener('click', () => {});
