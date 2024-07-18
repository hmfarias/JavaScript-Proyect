document.addEventListener('DOMContentLoaded', () => {
	localStorage.removeItem('login');
	navItemAdmin.classList.remove('enabled');
	navItemAdmin.classList.add('disabled');
});
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const loginForm = document.getElementById('loginForm');
const navItemAdmin = document.getElementById('nav-item-admin');

// Primero chequeo es estatus de login desde el local storage
// si está logeado habilito el menú de Administración y desabilito el Login
const loginStatus = localStorage.getItem('login');
if (loginStatus) {
	navItemAdmin.classList.remove('disabled');
	navItemAdmin.classList.add('enabled');
	loginButton.classList.remove('enabled');
	loginButton.classList.add('disabled');
}

//Se abre la ventana modal cuando se hace click en la opción del menú "Login"
loginButton.addEventListener('click', () => {
	loginModal.show();
});

//Acá se hace el manejo del formulario de login, al hacer submit
loginForm.addEventListener('submit', (event) => {
	event.preventDefault();
	//Acá se agregaría la lógica de autenticación mas fuerte
	//Para el trabajo práctico voy a asumir que el login es exitoso
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});
	Toast.fire({
		icon: 'success',
		title: 'Sesión iniciada con éxito',
	});

	loginModal.hide();
	navItemAdmin.classList.remove('disabled');
	navItemAdmin.classList.add('enabled');
	loginButton.classList.remove('enabled');
	loginButton.classList.add('disabled');
	localStorage.setItem('login', true);
});

//Acá manejo lo que pasa al clickear la opcion de cerrar sesión
logoutButton.addEventListener('click', () => {
	localStorage.removeItem('login');
	navItemAdmin.classList.remove('enabled');
	navItemAdmin.classList.add('disabled');
});
