import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import { RncLicenciaConduccionService } from '../../services/rncLicenciaConduccion.service';
import { LoginService } from '../../services/login.service';
import { TipoIdentificacionService } from '../../services/tipoIdentificacion.service';
import { SedeOperativaService } from '../../services/sedeOperativa.service';
import { CiudadanoService } from '../../services/ciudadano.service';
import { RncLicenciaConduccion } from './rncLicenciaConduccion.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './rncLicenciaConduccion.component.html'
})
export class RncLicenciaConduccionComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public licencias;
	public ciudadano;
	public formNew = false;
	public formEdit = false;
	public formIndex = false;
  public formSearch = true;
  public table: any = null;
  public licenciaConduccion: RncLicenciaConduccion;
  public identificacion:any;
  public tiposIdentificacion: any;
  public tipoIdentificacionSelected: any;
  public sedesOperativas: any;
  public sedeOperativaSelected: any;

  constructor(
    private _LicenciaConduccionService: RncLicenciaConduccionService,
    private _TipoIdentificacionService: TipoIdentificacionService,
    private _SedeOperativaService: SedeOperativaService,
    private _CiudadanoService: CiudadanoService,
    private _loginService: LoginService,
    private router: Router
    ){}
    
  ngOnInit() {
    this._TipoIdentificacionService.getTipoIdentificacion().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
  
  onNew(){
    this.formNew = true;
    this.formSearch = false;
    this.formIndex = false;
    if(this.table){
      this.table.destroy();
    }

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
 
  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = false;
      this.formSearch = true;
      this.ngOnInit();
    }
  }
  
  onSearchCiudadano(){
    let token = this._loginService.getToken();

		this._CiudadanoService.searchByIdentificacion(token, {'numeroIdentificacion':this.identificacion}).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ciudadano = response.data;

          this._LicenciaConduccionService.recordByCiudadanoId({ 'ciudadanoId': this.ciudadano.id },token).subscribe(
            response => {
              this.respuesta = response;
              if (this.respuesta.status == 'success') {
                this.licencias = response.data;

                this.iniciarTabla();
                this.formIndex = true;

                swal({
                  title: 'Perfecto',
                  text: response.message,
                  type: 'info'
                });
              }else{
                swal({
                  title: 'Alerta',
                  text: response.message,
                  type: 'warning'
                });
              }
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
          }); 
          
        }else{
          swal({
            title: 'Alerta',
            text: response.msj,
            type: 'warning'
          });
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
		}); 
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

  delete(id:any){
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
        this._LicenciaConduccionService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
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

  edit(licenciaConduccion:any){
    this.licenciaConduccion = licenciaConduccion;
    this.formEdit = true;
    this.formSearch = false;
  }
}