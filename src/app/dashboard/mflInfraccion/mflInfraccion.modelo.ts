export class MflInfraccion{
	constructor(
		public codigo: string,
		public nombre: string,
		public descripcion: string,
		public retiene: boolean,
		public inmoviliza: boolean,
		public dias: number,
		public id:number,
		public infraccionCategoriaId: number,
	){}
}