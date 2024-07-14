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

//Agrego listener para el boton que carga desde el local Storage el ultimo periodo trabajado
BTN_ULTIMO_LOTE.addEventListener('click', () => {
	let ultimoAno = localStorage.getItem('ultimoAno');
	let ultimoMes = localStorage.getItem('ultimoMes');
	BTN_ULTIMO_LOTE.disabled = true;
	MES.value = ultimoMes;
	ANO.value = ultimoAno;
	renderizaEmpleados(ultimoMes, ultimoAno);
});

// Para el manejo del login
const logoutButton = document.getElementById('logoutButton');
const navItemAdmin = document.getElementById('nav-item-admin');
const loginButton = document.getElementById('loginButton');

// Primero chequeo es estatus de login desde el local storage
// si está logeado habilito el menú de Administración y desabilito el Login
const loginStatus = localStorage.getItem('login');
if (loginStatus) {
	console.log('loginStatus');
	console.log(loginStatus);
	navItemAdmin.classList.remove('disabled');
	navItemAdmin.classList.add('enabled');
	loginButton.classList.remove('enabled');
	loginButton.classList.add('disabled');
}

//Acá manejo lo que pasa al clickear la opcion de cerrar sesión
logoutButton.addEventListener('click', () => {
	localStorage.removeItem('login');
	navItemAdmin.classList.remove('enabled');
	navItemAdmin.classList.add('disabled');
});
