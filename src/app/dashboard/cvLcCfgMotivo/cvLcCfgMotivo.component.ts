import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CvLcCfgMotivoService } from '../../services/cvLcCfgMotivo.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cvLcCfgMotivo.component.html'
})
export class CvLcCfgMotivoComponent implements OnInit {
  public errorMessage;
	public id;

	public motivos;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any;
  public motivo: any;

  constructor(
    private _CvLcCfgMotivoService: CvLcCfgMotivoService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._CvLcCfgMotivoService.index().subscribe(
				response => {
          this.motivos = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
          swal.close();
				}, 
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      );
  }

  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
           oPaginate: {
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onDelete(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._CvLcCfgMotivoService.delete({ 'id': id }, token).subscribe(
          response => {
              swal({
                title: 'Eliminado!',
                text:'Registro eliminado correctamente.',
                type:'success',
                confirmButtonColor: '#15d4be',
              });
              this.table.destroy();
              this.ngOnInit();
            }, 
          error => {
            this.errorMessage = <any>error;

            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }
    })
  }

  onEdit(motivo:any){
    this.motivo = motivo;
    this.formEdit = true;
    this.formIndex = false;
  }
}