export class FroFactura{
	constructor(
		public valor: number,
		public interes: number,
		public comparendos: string,
		public idOrganismoTransito: number,
		public idTipoRecaudo: number,
		public id: number
	){}
}