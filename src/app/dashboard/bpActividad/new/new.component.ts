import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { BpActividad } from '../bpActividad.modelo';
import { BpActividadService } from '../../../services/bpActividad.service';
import { PqoCfgPatioService } from '../../../services/pqoCfgPatio.service';
import { VhloCfgTipoVehiculoService } from '../../../services/vhloCfgTipoVehiculo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-actividad',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tarifa: BpActividad;
public errorMessage;

public patios: any;
public tiposVehiculo: any;

constructor(
  private _TarifaService: BpActividadService,
  private _PatioService: PqoCfgPatioService,
  private _TipoVehiculoService: VhloCfgTipoVehiculoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tarifa = new BpActividad(null, null, null);

    this._PatioService.select().subscribe(
      response => {
        this.patios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoVehiculoService.select().subscribe(
      response => {
        this.tiposVehiculo = response;
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
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TarifaService.register(this.tarifa,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
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

}