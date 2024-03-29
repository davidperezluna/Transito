import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PqoCfgPatio } from './pqoCfgPatio.modelo';
import { PqoCfgPatioService } from '../../../../services/pqoCfgPatio.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './pqoCfgPatio.component.html'
})
export class PqoCfgPatioComponent implements OnInit {
  public errorMessage;

  public patios;
  
	public formNew = false;
	public formEdit = false;
  public formShow = false;
  public formIndex = true;

  public table:any; 
  public patio: any;

  constructor(
    private _PatioService: PqoCfgPatioService,
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

    this._PatioService.index().subscribe(
      response => {
        this.patios = response.data;

        let timeoutId = setTimeout(() => {  
          this.onInitTable();
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

  onInitTable(){
    if (this.table) {
      this.table.destroy();
    }
    
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
    this.formEdit = false;
    this.formShow = false;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
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
        this._PatioService.delete(token,id).subscribe(
          response => {
              swal({
                    title: 'Eliminado!',
                    text:'Registro eliminado correctamente.',
                    type:'success',
                    confirmButtonColor: '#15d4be',
                  })
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
    });
  }

  onEdit(patio:any){
    this.patio = patio;

    this.formEdit = true;
    this.formIndex = false;
    this.formShow = false;
  }
  
  onShow(patio:any){
    this.patio = patio;

    this.formEdit = false;
    this.formIndex = false;
    this.formShow = true;
  }
}