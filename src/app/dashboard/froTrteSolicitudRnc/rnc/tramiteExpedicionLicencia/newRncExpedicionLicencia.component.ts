import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { MpersonalFuncionarioService } from '../../../../services/mpersonalFuncionario.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { RncLicenciaConduccionService } from '../../../../services/rncLicenciaConduccion.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia',
    templateUrl: './newRncExpedicionLicencia.html'
})
export class NewRncExpedicionLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() factura: any = null;
    public errorMessage;

    public clases: any;
    public servicios: any;
    public paises: any;
    public categorias: any;
    public tramiteFacturaSelected: any;
    public ciudadanoEncontrado=1;
    public tipoCambioSelected: any;
    public identificacion: any;
    public resumen = {};     public datos = {
        'tramiteFormulario': null,
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'fechaExpedicion': null,
        'idFactura': null,
        'idPais': null,
        'idCategoria': null,
        'idClase': null,
        'idServicio': null,
        'idSedeOperativa': null,
        'ciudadanoId': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _CiudadanoService: UserCiudadanoService,
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgPaisService: CfgPaisService,
        private _MpersonalFuncionarioService: MpersonalFuncionarioService,
        private _CfgLicenciaConduccionCategoriaService: CfgLicenciaConduccionCategoriaService,
        private _RncLicenciaConduccionService: RncLicenciaConduccionService,
    ) { }

    ngOnInit() {
        this._CfgLicenciaConduccionCategoriaService.select().subscribe(
            response => {
                this.categorias = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._ClaseService.getClaseSelect().subscribe(
            response => {
              this.clases = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
        );

        this._ServicioService.getServicioSelect().subscribe(
            response => {
              this.servicios = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
        );

        this._CfgPaisService.select().subscribe(
            response => {
              this.paises = response;
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
    
    onEnviarTramite() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._MpersonalFuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.idSedeOperativa = response.data.sedeOperativa.id;
                    this.datos.idFactura = this.factura.id;
                    this.datos.tramiteFormulario = 'rnc-expedicionlicencia';
                    this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
                    this.datos.ciudadanoId = this.solicitante.id;

                    this._RncLicenciaConduccionService.register(this.datos, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                            } else {
                                swal({
                                    type: 'warning',
                                    title: 'Alerta!',
                                    text: "No se registro el trámite."
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
                    swal({
                        type: 'warning',
                        title: 'Alerta!',
                        text: "Usted no tiene permisos para este trámite."
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
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onSearchCiudadano(){
        let token = this._LoginService.getToken();
        this._CiudadanoService.searchByIdentificacion({'numeroIdentificacion':this.solicitante.identificacion},token).subscribe(
            response => {
                if(response.status == 'success'){
                    this.solicitante = response.data;
                    this.ciudadanoEncontrado= 2;
                }else{
                    this.ciudadanoEncontrado=3;
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