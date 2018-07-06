import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgPlacaService } from '../../../services/cfgPlaca.service';
import { LoginService } from '../../../services/login.service';
import { ClaseService } from '../../../services/clase.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() cfgPlaca: any = null;
  public errorMessage;
  public respuesta;
  public clases: any;
  public claseSelected: any;
  public sedesOperativas: any;
  public sedeOperativaSelected: any;
  // public tipoIdentificacion: Array<any>

  constructor(
    private _CfgPlacaService: CfgPlacaService,
    private _loginService: LoginService,
    private _claseService: ClaseService,
    private _sedeOperativaService: SedeOperativaService,
  ) {
    //   this.tipoIdentificacion = [
    //     {value: 'CC', label: 'Cédula de ciudadanía'},
    //     {value: 'TE', label: 'Tarjeta de extranjería'},
    //     {value: 'CE', label: 'Cédula de extranjería'},
    //     {value: 'P', label: 'Pasaporte'},
    // ];
  }

  ngOnInit() {

    this._claseService.getClaseSelect().subscribe(
      response => {
        this.clases = response;
        setTimeout(() => {
          this.claseSelected = [this.cfgPlaca.clase.id];
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._sedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
        setTimeout(() => {
          this.sedeOperativaSelected = [this.cfgPlaca.sedeOperativa.id];
        });
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


  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    this.cfgPlaca.claseId = this.claseSelected;
    this.cfgPlaca.sedeOperativaId = this.sedeOperativaSelected;
    this._CfgPlacaService.editCfgPlaca(this.cfgPlaca, token).subscribe(
      response => {
        //console.log(response);
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
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

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });
  }

}