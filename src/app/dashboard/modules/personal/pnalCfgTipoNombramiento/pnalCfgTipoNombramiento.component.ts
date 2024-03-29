import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { PnalCfgTipoNombramientoService } from '../../../../services/pnalCfgTipoNombramiento.service';
import { LoginService } from '../../../../services/login.service';
import { PnalCfgTipoNombramiento } from './pnalCfgTipoNombramiento.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './pnalCfgTipoNombramiento.component.html'
})
export class PnalCfgTipoNombramientoComponent implements OnInit, AfterViewInit {
  public errorMessage;
	public id;

	public tiposNombramiento;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public tipoNombramiento: PnalCfgTipoNombramiento;

  constructor(
    private _TipoNombramientoService: PnalCfgTipoNombramientoService,
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

      this._TipoNombramientoService.index().subscribe(
        response => {
          this.tiposNombramiento = response.data;

          let timeoutId = setTimeout(() => {  
            this.onInitTable();
          }, 100);
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

  ngAfterViewInit(){
    swal.close();
  }

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
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
        this._TipoNombramientoService.delete({ 'id': id }, token).subscribe(
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

  onEdit(tipoNombramientoSelected:any){
    this.tipoNombramiento = tipoNombramientoSelected;
    this.formEdit = true;
    this.formIndex = false;
  }
}