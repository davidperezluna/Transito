export class FroTrteSolicitudRnc{
	constructor(
		public observacion: string,
		public documentacion: boolean,
		public foraneas: string,
		public resumen: string,
		public idTramiteFactura: number,
		public idSolicitante: number,
		public id: number,
	){}
}