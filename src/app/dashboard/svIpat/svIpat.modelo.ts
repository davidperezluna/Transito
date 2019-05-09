export class SvIpat{
	constructor(
		public idOrganismoTransito:number,
		public numeroConsecutivo:string,

		public idGravedad:number,
		public lugar: string,
		public fechaAccidente:string,
		public horaAccidente:string,
		public fechaLevantamiento:string,
		public horaLevantamiento:string,
		public idClaseAccidente: number,
		public otroClaseAccidente:string,
		public idClaseChoque:number,
		public idObjetoFijo:number,
		public otroObjetoFijo:string,
		public idArea:number,
		public idSector:number,
		public idZona:number,
		public idDisenio:number,
		public arrayEstadosTiempo:number,
		public idGeometria:number,
		public idUtilizacion:number,
		public idCalzada:number,
		public idCarril:number,
		public idMaterial:number,
		public otroMaterial: string,
		public idEstadoVia:number,
		public idCondicionVia:number,
		public otraCondicionVia: string,
		public idIluminacion:number,
		public idEstadoIluminacion:number,
		public idVisual:number,
		public idVisualDisminuida:number,
		public otraVisualDisminuida: string,
		public semaforo: string,
		
		public idEstadoSemaforo: number,
		public arraySenialesVerticales: number,
		public arraySenialesHorizontales: number,
		public arrayReductoresVelocidad: number,
		public otroReductorVelocidad: string,
		public arrayDelineadoresPiso: number,
		public otroDelineadorPiso: string,


		/* //campos vehiculo
		public portaPlaca: string,
		public placa: string,
		public placaRemolque: string,
		public nacionalidadVehiculo: string,
		public marca: string,
		public linea: string,
		public color: string,
		public modelo: string,
		public carroceria: string,
		public ton: string,
		public pasajeros: string,
		
		public empresa:string,
		public nitEmpresa: number,
		
		public matriculadoEn: string,
		public inmovilizado: string,
		public inmovilizadoEn: string,
		public aDisposicionDe: string,
		public portaTarjetaRegistro: string, 
		public tarjetaRegistro: string,
		public organismoTransitoTarjetaRegistro: string,
		
		//revision tecnomecanica
		public revisionTecnomecanica: string,
		public numeroTecnoMecanica: number,
		public cantidadAcompaniantes: number,
		
		//soat
		public portaSoat: string,
		public soat:number,
		public numeroPoliza: number,
		public aseguradoraSoat: string,
		public fechaVencimientoSoat: string,
		
		//seguro de responsabilidad civil contractual
		public portaSeguroResponsabilidadCivil: string,
		public numeroSeguroResponsabilidadCivil: number,
		public idAseguradoraSeguroResponsabilidadCivil: string,
		public fechaVencimientoSeguroResponsabilidadCivil: string,
		
		//seguro de responsabilidad extracontractual
		public portaSeguroExtracontractual: string,
		public numeroSeguroExtracontractual: number,
		public idAseguradoraSeguroExtracontractual: string,
		public fechaVencimientoSeguroExtracontractual: string, */
		
		//propietario
		public mismoConductor: string,
		public nombresPropietario: string,
		public apellidosPropietario: string,
		public tipoIdentificacionPropietario: string,
		public identificacionPropietario: string,

		/* public clase:number,
		public servicio:number,
		public modalidadTransporte:number,
		public radioAccion:number,
		public descripcionDanios: string,
		public arrayFallas: string,
		public otraFalla: string,
		public arrayLugaresImpacto: string, */
		
		//Datos Conductor
		/* public nombresConductor: string,
		public apellidosConductor: string,
		public tipoIdentificacionConductor: string,
		public identificacionConductor: string,
		public nacionalidadConductor: string,
		public fechaNacimientoConductor: string,
		public sexoConductor: string,
		public idGravedadConductor: number,
		public direccionResidenciaConductor: string,
		public ciudadResidenciaConductor: number,
		public telefonoConductor: string,
		public practicoExamenConductor: string,
		public autorizoConductor: string,
		public idResultadoExamenConductor: string,
		public idGradoExamenConductor: string,
		public sustanciasPsicoactivasConductor: string,
		public portaLicencia: string,
		public numeroLicenciaConduccion: number,
		public categoriaLicenciaConduccion: string,
		public restriccionConductor: string,
		public fechaExpedicionLicenciaConduccion: string,
		public fechaVencimientoLicenciaConduccion: string,
		public organismoTransito: string,
		public chalecoConductor: string,
		public cascoConductor: string,
		public cinturonConductor: string,
		public idHospitalConductor:number,
		public descripcionLesionConductor: string, */


		/* //datos victima
		public victima: string,
		public nombresVictima: string,
		public apellidosVictima: string,
		public tipoIdentificacionVictima: string,
		public identificacionVictima: string,
		public nacionalidadVictima: string,
		public fechaNacimientoVictima: string,
		public sexoVictima: string,
		public direccionResidenciaVictima: string,
		public ciudadResidenciaVictima: string,
		public telefonoVictima: string,
		public idHospitalVictima: string,
		public placaVehiculoVictima: string,
		public practicoExamenVictima: string,
		public autorizoVictima: string,
		public idResultadoExamenVictima: string,
		public idGradoExamenVictima: string,
		public sustanciasPsicoactivasVictima: string,
		public chalecoVictima: string,
		public cascoVictima: string,
		public cinturonVictima: string,
		public idTipoVictima:number,
		public idGravedadVictima:number,
		public descripcionLesionVictima: string, */

		public observaciones:string,

		//correspondio
		public idMunicipio: number,
		public idEntidad: number,
		public idUnidad: number,
		public idAnio: number,
		public consecutivo: number,
		public correspondio: string,


		//total victimas
		public totalPeatones: number,
		public totalAcompaniantes: number,
		public totalPasajeros: number,
		public totalConductores: number,
		public totalHeridos: number,
		public totalMuertos: number,

		// información testigo
		public tipoIdentificacionTestigo: number,
		public identificacionTestigo: number,
		public nombresTestigo: string,
		public apellidosTestigo: string,
		public departamentoResidenciaTestigo: string,
		public direccionTestigo: string,
		public ciudadResidenciaTestigo: string,
		public telefonoTestigo: string,
		
		public idHipotesis: string,
		
		//datos agente de transito
		public gradoAgente: string,
		public tipoIdentificacionAgente: string,
		public identificacionAgente: string,
		public nombresAgente: string,
		public apellidosAgente: string,
		public placaAgente: string,
		public entidadAgente: string,

		/*public limitacionId:number,
		public tipoProcesoId:number,
		public entidadJudicialId:number,
		public causalLimitacionId:number,
		public datos:string,*/
	){}
}