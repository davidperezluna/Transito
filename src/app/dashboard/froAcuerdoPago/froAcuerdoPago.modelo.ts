export class FroAcuerdoPago{
	constructor(
		public numeroCuotas: number,
		public valorCapital: number,
		public valorCuotaInicial: number,
		public porcentajeInicial: number,
		public comparendos: string,
		public idInteres: number,
		public id: number
	){}
}