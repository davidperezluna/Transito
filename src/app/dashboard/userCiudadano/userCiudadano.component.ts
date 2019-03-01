import { Component, OnInit } from '@angular/core';
import { UserCiudadano } from './userCiudadano.modelo';
import { NewCiudadanoComponent } from './new/new.component';
import { UserCiudadanoService } from '../../services/userCiudadano.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './userCiudadano.component.html',
  providers: [NewCiudadanoComponent],
})
export class UserCiudadanoComponent implements OnInit {
  public errorMessage;
	public id;
	public ciudadanos: any = null;
	public formNew = false;
	public formEdit = false;
	public formIndex = false;
	public formSearch = true;
  public table:any = null; 
  public ciudadano: UserCiudadano;

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'Identificación' },
    { 'value': '2', 'label': 'Nombres y/o apellidos' },
  ];

  constructor(
		private _UserCiudadanoService: UserCiudadanoService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() { }

  onSearch() {
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._UserCiudadanoService.searchByFiltros(this.search, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ciudadanos = response.data;
          this.formIndex = true;
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
        }else{
          this.ciudadanos =null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }

      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  iniciarTabla() {
    if (this.table) {
      this.table.destroy();
    }

    $('#dataTables-example').DataTable({
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

    this.table = $('#dataTables-example').DataTable();
  }
  
  onNew(){
    this.formNew = true;
    this.formEdit = false;
    this.formIndex = false;
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = false;
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
        let token = this._LoginService.getToken();

        this._UserCiudadanoService.delete(token,id).subscribe(
            response => {
                swal({
                  title: 'Eliminado!',
                  text:'Registro eliminado correctamente.',
                  type:'success',
                  confirmButtonColor: '#15d4be',
                });

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

  onEdit(ciudadano:any){
    this.ciudadano = ciudadano;
    this.formEdit = true;
    this.formIndex = false;
    this.formNew = false;
  }
}