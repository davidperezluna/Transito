import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PnalComparendo } from '../pnalComparendo.modelo';
import { PnalComparendoService } from '../../../services/pnalComparendo.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public comparendo: PnalComparendo;
public funcionarios: any;
public funcionarioSelected: any;
public errorMessage;
public respuesta: any = null;

constructor(
  private _ComparendoService: PnalComparendoService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.comparendo = new PnalComparendo(null, null, null);

    this._FuncionarioService.select().subscribe(
      response => {
        this.funcionarios = response;
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
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    this.comparendo.idFuncionario = this.funcionarioSelected;

    this._ComparendoService.register(this.comparendo,token).subscribe(
      response => {
        this.respuesta = response;
        
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha realizado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: 'El comparendo ya se encuentra registrado',
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