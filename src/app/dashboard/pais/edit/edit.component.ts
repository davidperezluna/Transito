import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Pais } from '../pais.modelo';
import { PaisService } from '../../../services/pais.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() pais:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _paisService: PaisService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.pais);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._paisService.editPais(this.pais,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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