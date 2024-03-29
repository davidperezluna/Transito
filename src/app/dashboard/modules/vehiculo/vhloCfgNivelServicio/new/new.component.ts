import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgNivelServicio } from '../vhloCfgNivelServicio.modelo';
import { VhloCfgNivelServicioService } from '../../../../../services/vhloCfgNivelServicio.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgnivelservicio',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public nivelServicio: VhloCfgNivelServicio;
public errorMessage;

constructor(
  private _NivelServicioService: VhloCfgNivelServicioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.nivelServicio = new VhloCfgNivelServicio(null,null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._NivelServicioService.register(this.nivelServicio, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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