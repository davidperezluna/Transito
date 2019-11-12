export class SvCaracterizacion{
	constructor(
		public id:number,

		public placa: string,
		public idTipoVehiculo: number,
		public idLinea: number,
		public idMarca: number,
		public idColor: number,
		public chasis: number,
		public motor: number,
		public cilindraje: number,
		public usoVehiculo: string,
		public numeroInternoDpn: number,
		public fechaVencimientoSoat: string,
		public fechaVencimientoTecnomecanica: string,
		public numeroLicTransito: number,
		public numeroValvulasCilindro: number,
		public numeroCilindros: number,
		public turbo: number,
		public tipoDireccion: string,
		public tipoTransicion: string,
		public tipoRodamiento: string,
		public numeroVelocidades: number,
		public suspensionDelantera: string,
		public suspensionTrasera: string,
		public numeroLlantas: number,
		public dimensionRines: number,
		public materialRines: number,
		public tipoFrenosDelanteros: string,
		public tipoFrenosTraseros: string,
		public arrayEquipoPrevencion: string,
		public arrayRelacionMantenimiento: any,

		public nit:number,		
		public fecha: string,
		public municipio: string,
		public nombres: string,
		public apellidos: string,
		public identificacion: number,
		public idLugarExpedicionDocumento: string,
		public idGrupoSanguineo: number,
		public clc: string,
		public fechaVigencia: string,
		public fechaNacimiento: string,
		public genero: string,
		public nivelEducativo: string,
		public grupoTrabajo: string,
		public otroGrupoTrabajo: string,
		public tipoContrato: string,
		public otroTipoContrato: string,
		public cargo: string,
		public experienciaConduccion: string,
		public accidente: string,
		public circunstancias: string,
		public incidente: string,
		public frecuenciaDesplazamiento: string,
		public propioVehiculo: string,
		public desplazamientoPlanificado: string,
		public antelacion: string,
		public medioDesplazamiento: string,
		public trayecto: number,
		public tiempoTrayecto: string,
		public kmMensualTrayecto: string,
		public arrayFactoresRiesgo: string,
		public otroFactorRiesgo: string,
		public arrayCausasRiesgo: string,
		public otraCausaRiesgo: string,
		public riesgoPercibido: string,
		public propuestaReduccion: string,
	){}
}