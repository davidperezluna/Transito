import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-rematricula',
    templateUrl: './new.rematricula.html'
})
export class NewRematriculaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Input() tramiteSolicitud: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public entidadList: string[];
    public entidadSelected: any;
    public numeroRunt: any;
    public numeroActa: any;
    public fechaActa: any;
    public municipios: any;
    public municipioActaSelected: any;
    public municipioEntregaSelected: any;
    public fechaEntrega: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionEntregaSelected: any;
    public numeroIdentificacionEntrega: any;
    public nombreEntrega: any;
    public estado: any;
    public datos = {
        'entidad': null,
        'numeroActa': null,
        'fechaActa': null,
        'municipioActa': null,
        'numeroRunt': null,
        'fechaEntrega': null,
        'municipioEntrega': null,
        'tipoIdentificacionEntrega': null,
        'numeroIdentificacionEntrega': null,
        'nombreEntrega': null,
        'estado': null
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
        private _MunicipioService: MunicipioService,
        private _TipoIdentificacionService: TipoIdentificacionService,
    ) { }

    ngOnInit() {
        console.log(this.tramiteSolicitud);
        this.entidadList = ['Fiscalía,', 'SIJIN', 'DIJIN'];

        this._SustratoService.getSustratoSelect().subscribe(
            response => {
                this.sustratos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._MunicipioService.getMunicipioSelect().subscribe(
            response => {
                this.municipios = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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

    onEnviar() {
        let token = this._loginService.getToken();

        console.log(this.tramiteSolicitud);
        this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
            response => {
                this.respuesta = response;
                console.log(this.respuesta);
                if (this.respuesta.status == 'success') {
                    swal({
                        title: 'Pefecto!',
                        text: 'El registro se ha registrado con exito',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: 'Error!',
                        text: 'El tramiteSolicitud ' + +' ya se encuentra registrada',
                        type: 'error',
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

    enviarTramite() {
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.entidad = this.entidadSelected;
        this.datos.numeroActa = this.numeroActa;
        this.datos.fechaActa = this.fechaActa;
        this.datos.municipioActa = this.municipioActaSelected;
        this.datos.municipioEntrega = this.municipioEntregaSelected;
        this.datos.fechaEntrega = this.fechaEntrega;
        this.datos.tipoIdentificacionEntrega = this.tipoIdentificacionEntregaSelected;
        this.datos.numeroIdentificacionEntrega = this.numeroIdentificacionEntrega;
        this.datos.nombreEntrega = this.nombreEntrega;
        this.datos.estado = this.estado;
        this.readyTramite.emit(this.datos);
    }

}