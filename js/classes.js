//CLASES ----------------------------------------------------------
class Empleado {
	constructor(
		id,
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
		suvico,
		foto
	) {
		this.id = id;
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
		this.foto = foto;
	}
}

class Cobertura {
	constructor(id, ano, mes, idEmpleado, horas, feriados, horasNocturnas) {
		this.id = id;
		this.ano = ano;
		this.mes = mes;
		this.idEmpleado = idEmpleado;
		this.horas = horas;
		this.feriados = feriados;
		this.horasNocturnas = horasNocturnas;
	}
}

//FIN CLASES -------------------------------------------------------

export { Empleado, Cobertura };
