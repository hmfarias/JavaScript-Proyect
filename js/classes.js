//CLASES ----------------------------------------------------------
class Empleado {
	constructor(
		legajo,
		cuil,
		dni,
		apellido,
		nombre,
		tipo,
		estado,
		fechaNacimiento,
		fechaAlta,
		fechaBaja,
		email,
		CBU,
		suvico
	) {
		this.legajo = legajo;
		this.cuil = cuil;
		this.dni = dni;
		this.nombre = `${apellido} ${nombre}`;
		this.tipo = tipo;
		this.estado = estado;
		this.fechaNacimiento = fechaNacimiento;
		this.fechaAlta = fechaAlta;
		this.fechaBaja = fechaBaja;
		this.email = email;
		this.CBU = CBU;
		this.suvico = suvico;
	}
}

//FIN CLASES -------------------------------------------------------

export { Empleado };
