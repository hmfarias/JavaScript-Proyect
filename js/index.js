document.addEventListener('DOMContentLoaded', () => {
	const loginButton = document.getElementById('loginButton');
	const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
	const loginForm = document.getElementById('loginForm');
	const navItemAdmin = document.getElementById('nav-item-admin');

	//Se abre la ventana modal cuando se hace click en la opción del menú "Login"
	loginButton.addEventListener('click', () => {
		loginModal.show();
	});

	//Acá se hace el manejo del formulario de login, al hacer submit
	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();
		//Acá se agregaría la lógica de autenticación mas fuerte
		//Para el trabajo práctico voy a asumir que el login es exitoso
		loginModal.hide();
		navItemAdmin.classList.remove('disabled');
		navItemAdmin.classList.add('enabled');
		// navItemAdmin.href = '#';
	});
});
