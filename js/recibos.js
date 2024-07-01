/**IMPORTO FUNCIONES A UTILIZAR -----------------------------------*/
import { renderizaEmpleados } from './functions.js';
/**FIN IMPORTO FUNCIONES A UTILIZAR --------------------------------*/

// Tomo elementos del DOM necesarios para el proceso ( FORMULARIO, AÑO y MES)
const ANO = document.getElementById('ano');
const MES = document.getElementById('mes');
const ANO_MES_FORM = document.getElementById('anoMesForm');

// Agrego listener para el evento submit del formulario en el que se selecciona MES y AÑO a consultar
ANO_MES_FORM.addEventListener('submit', (evento) => {
	evento.preventDefault();
	renderizaEmpleados(MES.value, ANO.value);
});
