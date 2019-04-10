import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloValorService } from '../../../services/vholCfgValor.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() cfgValorVehiculo: any = null;
  public errorMessage;
  public respuesta;
  public clases: any;
  public claseSelected: any;
  public lineaSelected: any;
  public marcaSelected: any;
  public lineas: any;
  public marcas: any;
  // public tipoIdentificacion: Array<any>

  constructor(
    private _VhloValorService: VhloValorService,
    private _loginService: LoginService,
    private _claseService: VhloCfgClaseService,
    private _MarcaService: VhloCfgMarcaService,
    private _lineaService: VhloCfgLineaService,  
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
  ) {
    //   this.tipoIdentificacion = [
    //     {value: 'CC', label: 'Cédula de ciudadanía'},
    //     {value: 'TE', label: 'Tarjeta de extranjería'},
    //     {value: 'CE', label: 'Cédula de extranjería'},
    //     {value: 'P', label: 'Pasaporte'},
    // ];
  }

  ngOnInit() {
    console.log(this.cfgValorVehiculo);
    this._lineaService.select().subscribe(
      response => {
        this.lineas = response;
        setTimeout(() => {
            this.lineaSelected = [this.cfgValorVehiculo.linea.id]; 
        });
      }, 
      error => { 
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._MarcaService.getMarcaSelect().subscribe(
      response => {
        this.marcas = response; 
        setTimeout(() => {
            this.marcaSelected = [this.cfgValorVehiculo.linea.marca.id];
        })
      }, 
      error => { 
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._claseService.select().subscribe(
      response => {
        this.clases = response;
        setTimeout(() => {
          this.claseSelected = [this.cfgValorVehiculo.clase.id];
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
    this.cfgValorVehiculo.claseId = this.claseSelected;
    this.cfgValorVehiculo.lineaId = this.lineaSelected;
    this._VhloValorService.edit(this.cfgValorVehiculo, token).subscribe(
      response => {
        this.respuesta = response;
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

  changedMarca(e){
      if (this.marcaSelected) {
        let token = this._loginService.getToken()
          this._lineaService.selectByMarca(this.marcaSelected, token).subscribe(
            response => {
              if (response != null) {
                this.lineas = response;
              }else{
                this.lineas = [];
              }
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
    }

}