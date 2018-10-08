import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RnaPreregistroService} from '../../services/rnaPreregistro.service';
import {VehiculoService} from '../../services/vehiculo.service';
import {LoginService} from '../../services/login.service';
import {RnaPreregistro} from './rnaPreregistro.modelo';
import { NewRnaPreregistroComponent } from './new/new.component';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './rnaPreregistro.component.html'
})
export class RnaPreregistroComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public vehiculos;
  public formIndex = true;
  public formNew = false;
  public formEdit= false;
  public table:any; 
  public vehiculo: RnaPreregistro;

  constructor(
		private _VehiculoService: VehiculoService,
		private _RnaPreregistroService: RnaPreregistroService,
		private _loginService: LoginService,
	
		
		){}
  ngOnInit() {
    swal({
      title: 'Cargando información!',
      text: 'Solo tardara unos segundos por favor espere.',
      type: 'info'
    });

    this.formEdit=false;
    this.formNew=false;
		this._RnaPreregistroService.index().subscribe(
				response => {
          this.vehiculos = response.data;
      
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
            swal.close();
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
        this.formIndex = true;
        this.ngOnInit();
      }
  }

  editVehiculo(vehiculo:any){
    this.vehiculo = vehiculo;
    this.formIndex = false;
    this.formEdit = true;
  }

  
  deleteVehiculo(id:any){
    console.log(this.id);
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
        this._VehiculoService.deleteVehiculo(token,id).subscribe(
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
}