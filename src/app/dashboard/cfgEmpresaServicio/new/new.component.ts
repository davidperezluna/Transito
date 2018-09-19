import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgEmpresaServicio } from '../cfgEmpresaServicio.modelo';
import { CfgEmpresaServicioService } from '../../../services/cfgEmpresaServicio.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public empresaServicio: CfgEmpresaServicio;
public errorMessage;
public respuesta;

constructor(
  private _CargoService: CfgEmpresaServicioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.empresaServicio = new CfgEmpresaServicio(null, null,null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
		this._CargoService.register(this.empresaServicio,token).subscribe(
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