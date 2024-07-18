/**IMPORTO FUNCIONES A UTILIZAR -----------------------------------*/
import { renderizaEmpleados, inactivityTime } from './functions.js';
/**FIN IMPORTO FUNCIONES A UTILIZAR --------------------------------*/

// habilito el menú de Administración y desabilito el Login
document.getElementById('nav-item-admin').classList.remove('disabled');
document.getElementById('nav-item-admin').classList.add('enabled');
document.getElementById('loginButton').classList.remove('enabled');
document.getElementById('loginButton').classList.add('disabled');

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

//Agrego listener para el boton que carga desde el local Storage el ultimo periodo trabajado
BTN_ULTIMO_LOTE.addEventListener('click', () => {
	let ultimoAno = localStorage.getItem('ultimoAno');
	let ultimoMes = localStorage.getItem('ultimoMes');
	BTN_ULTIMO_LOTE.disabled = true;
	MES.value = ultimoMes;
	ANO.value = ultimoAno;
	renderizaEmpleados(ultimoMes, ultimoAno);
});

// Llamo a la función que controla inactividad
inactivityTime();

// START Para el manejo de CERRAR SESION-----------------------------------------
// Traigo del DOM la opción de Cerrar Sesion y la opcion Administracion del menu
//Acá manejo lo que pasa al clickear la opcion de cerrar sesión
logoutButton.addEventListener('click', () => {
	localStorage.removeItem('login');
	document.getElementById('nav-item-admin').classList.remove('enabled');
	document.getElementById('nav-item-admin').classList.add('disabled');
	document.getElementById('loginButton').classList.remove('disabled');
	document.getElementById('loginButton').classList.add('enabled');
});
// END Para el manejo de CERRAR SESION------------------------------------------
