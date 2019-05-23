import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloRnaTramiteInscripcionLimitacion } from '../vhloRnaTramiteInscripcionLimitacion.modelo';
import { VhloCfgLimitacionTipoProcesoService } from '../../../services/vhloCfgLimitacionTipoProceso.service';
import { VhloCfgLimitacionCausalService } from '../../../services/vhloCfgLimitacionCausal.service';
import { VhloCfgLimitacionTipoService } from '../../../services/vhloCfgLimitacionTipo.service';
import { VhloLimitacionService } from '../../../services/vhloLimitacion.service';
import { VhloVehiculoService } from '../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() onReady = new EventEmitter<any>();
  public inscripcionLimitacion: VhloRnaTramiteInscripcionLimitacion;
  public errorMessage;

  public idTipoIdentificacionDemandante:any;
  public idTipoIdentificacionDemandado:any;
  public identificacionDemandado: any;
  public identificacionDemandante: any;

  public entidadesJudiciales;
  public municipios;
  public departamentos;
  public limitaciones;
  public tiposProceso;
  public causalesLimitacion;
  public tiposIdentificacion;

  public vehiculos: any;
  public idVehiculo: any;
  public demandado:any;
  public demandante:any;

  public datos = {
    'vehiculos': [],
    'demandantes': [],
    'limitacion': null,
    'idDemandado': null,
  }

  constructor(
    private _LimitacionService: VhloLimitacionService,
    private _VehiculoService: VhloVehiculoService,
    private _PropietarioService: VhloPropietarioService,
    private _UserCiudadanoService: UserCiudadanoService,
    private _DepartamentoService: CfgDepartamentoService,
    private _MunicipioService: CfgMunicipioService,
    private _EntidadJuducialService: CfgEntidadJudicialService,
    private _TipoLimitacionService: VhloCfgLimitacionTipoService,
    private _TipoProcesoLimitacionService: VhloCfgLimitacionTipoProcesoService,
    private _CausalLimitacionService: VhloCfgLimitacionCausalService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.inscripcionLimitacion = new VhloRnaTramiteInscripcionLimitacion(null, null, null, null, null, null, null, null, null, null, null, null, null);

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCancelar() {
    this.onReady.emit(true);
  }

  onSearchDemandado() {
    swal({
      title: 'Buscando demandado!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.identificacionDemandado) {
      swal({
        title: 'Error!',
        text: 'El número de identificación del demandado no puede estar vacio.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();

      let datos = {
        'idTipoIdentificacion': this.idTipoIdentificacionDemandado,
        'identificacion': this.identificacionDemandado,
      };

      this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.ciudadano) {
              this._CausalLimitacionService.select().subscribe(
                response => {
                  this.causalesLimitacion = response;
                },
                error => {
                  this.errorMessage = <any>error;
          
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                  }
                }
              );
          
              this._DepartamentoService.select().subscribe(
                response => {
                  this.departamentos = response;
                },
                error => {
                  this.errorMessage = <any>error;
          
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              );
          
              this._EntidadJuducialService.select().subscribe( 
                response => {
                  this.entidadesJudiciales = response;
                },
                error => {
                  this.errorMessage = <any>error;
          
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              );
          
              this._TipoLimitacionService.select().subscribe(
                response => {
                  this.limitaciones = response;
                },
                error => {
                  this.errorMessage = <any>error;
          
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              );
          
              this._TipoProcesoLimitacionService.select().subscribe(
                response => {
                  this.tiposProceso = response;
                },
                error => {
                  this.errorMessage = <any>error;
          
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              );

              this.demandado = response.data.ciudadano;
              this.datos.idDemandado = response.data.ciudadano.id;

              this._VehiculoService.searchByParameters({ 'propietario': response.data.ciudadano.identificacion }, token).subscribe(
                response => {
                    if (response.code == 200) {
                      this.datos.vehiculos = response.data;

                      swal.close();
                    } else {
                      this.datos.vehiculos = null;
                      
                      swal({
                          title: 'Error!',
                          text: response.message,
                          type: 'error',
                          confirmButtonText: 'Aceptar'
                      });
                    }
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                }
              ); 
            }else{
              this.demandado = null;
              this.datos.idDemandado = null;

              swal({
                title: 'Error!',
                text: 'Ciudadano no encontrado',
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            }

            swal.close();
          } else {
            this.demandado = null;
            this.datos.idDemandado = null;

            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
          error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    }
  }

  onVehiculoSelect(idVehiculo: any){
    if (idVehiculo.target.checked) {
      this.datos.vehiculos.push(idVehiculo);
    }else{
      this.datos.vehiculos =  this.datos.vehiculos.filter(h => h !== idVehiculo);
    }
  }

  onSearchDemandante() {
    swal({
      title: 'Buscando demandante!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.idTipoIdentificacionDemandante) {
      swal({
        title: 'Error!',
        text: 'El número de identificación del demandante no puede estar vacio.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();
  
      let identificacion = {
        'identificacion': this.identificacionDemandante,
        'idTipoIdentificacion': this.idTipoIdentificacionDemandante,
      };
  
      this._UserCiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.ciudadano) {
              this.demandante = response.data.ciudadano;

              this.datos.demandantes.push(
                {
                  'id': this.demandante.id,
                  'nombre': this.demandante.primerNombre,
                  'identificacion': this.demandante.identificacion,
                  'tipo': 'CIUDADANO'
                }
              );
            }else if(response.data.empresa) {
              this.demandante = response.data.empresa;
  
              this.datos.demandantes.push(
                {
                  'id': this.demandante.id,
                  'nombre': this.demandante.nombre,
                  'identificacion': this.demandante.nit,
                  'tipo': 'EMPRESA'
                }
              );
            }
  
            swal.close();
          } else {
            this.demandante = null;
  
            swal({
              title: 'Error!',
              text: response.messsage,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
          error => {
            this.errorMessage = <any>error;
  
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    }
  }

  onRemoveDemandante(demandante: any): void {
    this.datos.demandantes = this.datos.demandantes.filter(h => h !== demandante);
  }

  changedDepartamento(e) {
    if (this.inscripcionLimitacion.idDepartamento) {
      let token = this._LoginService.getToken();
      this._MunicipioService.selectByDepartamento({ 'idDepartamento':this.inscripcionLimitacion.idDepartamento }, token).subscribe(
        response => {
          this.municipios = response;
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
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.datos.limitacion = this.inscripcionLimitacion;

    this._LimitacionService.register(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.onReady.emit(true);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          
        } else {
          /*let entidadJudicial = this.entidadesJudiciales[this.inscripcionLimitacion.idEntidadJudicial - 1].label;
          
          swal({
            title: 'Error!',
            text: 'La limitacion a la propiedad ' + this.vehiculo.placa.numero + ', con la fecha: ' + this.inscripcionLimitacion.fechaExpedicion + ', expedido por la entidad judicial: ' + entidadJudicial+' ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })*/
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      }
    );
  }
}