import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCfgEmpresaServicio } from '../userCfgEmpresaServicio.modelo';
import { UserCfgEmpresaServicioService } from '../../../../../services/userCfgEmpresaServicio.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-usercfgempresaservicio',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public empresaServicio: UserCfgEmpresaServicio;
public errorMessage;
public respuesta;

constructor(
  private _EmpresaServicioService: UserCfgEmpresaServicioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.empresaServicio = new UserCfgEmpresaServicio(null, null,null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
		this._EmpresaServicioService.register(this.empresaServicio,token).subscribe(
			response => {
        if(response.code == 200){
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