import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloPropietarioService} from '../../../../services/vhloPropietario.service';
//import { VhloActaTraspasoService } from '../../../../services/vhloActaTraspaso.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-traspaso-indeterminada',
    templateUrl: './new.traspasoIndeterminada.html',
    providers: [DatePipe]
})
export class NewTraspasoIndeterminadaComponent implements OnInit {
  @Output() onReadyTramite = new EventEmitter<any>();
  @Input() vehiculo: any = null; 
  @Input() tramiteFactura: any = null;
  @Input() funcionario: any = null;
  @Input() tramitesRealizados: any = null;
  @Input() idPropietario: any = null;
  public errorMessage; 
  
  public realizado: any = false;
  public tramiteSolicitud: any = null;

  public date:any;
  public entidadesJudiciales:any;    
  public vehiculos: any = false;
  public propietario;

  public table:any;    

  public tipos =[
    {'value': "Declaración", 'label': "Declaración"},
    {'value': "Manifestación", 'label': "Manifestación"}
  ];

  public datos = {
    'documentacion': true,
    'observacion': null,
    'permiso': true,
    'fecha': null,
    'fechaActa': null,
    'numeroActa': null,
    'tipoPropiedad': 2,
    'tipoTraspaso': null,
    'idFuncionario': null,
    'idVehiculo': null,
    'idEntidadJudicial': null,
    'idPropietario': null,
    'idCiudadano': null,
    'idEmpresa': null,
    'idTramiteFactura': null,
  };

  constructor(
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _TramiteFacturaService: FroFacTramiteService,
    private _CfgEntidadJudicialService: CfgEntidadJudicialService,
    //private _ActaTraspasoService: VhloActaTraspasoService,
    private _PropietarioService: VhloPropietarioService,
    private _CiudadanoService: UserCiudadanoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    this.datos.idFuncionario  = this.funcionario.id;
        
    if ( this.tramitesRealizados.length > 0) {
        this.tramitesRealizados.forEach(tramiteRealizado => {
            tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                return tramiteRealizado[key];
            });
            
            if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                this.realizado = true;
            }
        });
    }

    if (this.realizado) {
        swal({
            title: 'Atención!',
            text: 'El trámite seleccionado ya fue realizado.',
            type: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }else{
      this._CfgEntidadJudicialService.select().subscribe( 
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
      
      this.date = new Date();
      var datePiper = new DatePipe(this.date);
      this.datos.fecha = datePiper.transform(this.date,'yyyy-MM-dd');
    }
  }
  

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.datos.idVehiculo = this.vehiculo.id;
    this.datos.idTramiteFactura = this.tramiteFactura.id;

    this._PropietarioService.show({ 'id': this.idPropietario }, token ).subscribe(
      response => {
          this.propietario = response.data;
          this.datos.idPropietario = this.propietario.id;

          let datos = {
            'identificacion': 99,
            'idTipoIdentificacion': 1,
          }

          this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
              if (response.code == 200) {
                if (response.data.ciudadano) {
                  this.datos.idCiudadano = response.data.ciudadano.id;
                  let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

                  this.realizado = true;
    
                  this.onReadyTramite.emit(
                    {
                        'documentacion':this.datos.documentacion, 
                        'observacion':this.datos.observacion, 
                        'foraneas':this.datos, 
                        'resumen':resumen,
                        'idTramiteFactura': this.tramiteFactura.id,
                    }
                  );

                  /*this._TramiteSolicitudService.validations(this.datos, token).subscribe(
                    response => {
                      if (response.code == 200) {
                        this._PropietarioService.update(this.datos, token).subscribe(
                          response => {
                            if (response.code == 200) {
                              
                            }else{
                              swal({
                                title: 'Error!',
                                text: response.message,
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                              });
                            }
                          },
                          error => {
                              this.errorMessage = <any>error;
    
                              if (this.errorMessage != null) {
                                  console.log(this.errorMessage);
                                  alert('Error en la petición');
                              }
                          }
                        );
                      }else{
                        swal({
                          title: 'Error!',
                          text: response.message,
                          type: 'error',
                          confirmButtonText: 'Aceptar'
                        });
                      }
                    },
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                  );*/
                }
              } else {
                this.datos.idCiudadano = null;

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
}