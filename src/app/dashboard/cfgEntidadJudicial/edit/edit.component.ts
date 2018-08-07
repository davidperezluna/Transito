import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() cfgEntidadJudicial: any = null;
  public errorMessage;
  public respuesta;
  public municipios: any;
  public municipioSelected: any;

  constructor(
    private _CfgEntidadJudicialService: CfgEntidadJudicialService,
    private _loginService: LoginService,
    private _municipioService: MunicipioService,
  ) {
  
  }

  ngOnInit() {
    console.log(this.cfgEntidadJudicial);

    this._municipioService.getMunicipioSelect().subscribe(
      response => {
        this.municipios = response;
        setTimeout(() => {
          this.municipioSelected = [this.cfgEntidadJudicial.municipio.id];
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
    this.cfgEntidadJudicial.municipioId = this.municipioSelected;
    this._CfgEntidadJudicialService.editCfgEntidadJudicial(this.cfgEntidadJudicial, token).subscribe(
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