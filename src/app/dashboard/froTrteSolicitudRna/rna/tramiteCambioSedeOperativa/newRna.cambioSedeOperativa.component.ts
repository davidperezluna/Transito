import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import {VehiculoService} from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-sedeOperativa',
    templateUrl: './newRna.cambioSedeOperativa.html'
})
export class NewRnaCambioSedeOperativaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;
    public organismosTransito: any;
    public tramiteFacturaSelected: any;
    public sedeOperativaSelected: any;

    public datos = {
        'idTramiteFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idSedeOperativa': null,
        'tramiteFormulario': null,
        'numeroRunt': null,
        
    };

    constructor(
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.vehiculo.sedeOperativaId = 4;
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
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
    
   
    onEnviar(){
        
        let token = this._loginService.getToken();

        this._OrganismoTransitoService.show(token, this.sedeOperativaSelected).subscribe(
            sedeOperativaResponse => {
                 this.datos.idTramiteFactura = this.tramiteFactura.id;
                this.datos.tramiteFormulario = 'rna-cambiosedeoperativa';
                this.datos.idSedeOperativa = this.sedeOperativaSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['sedeOperativa'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'sede operativa anterior': this.vehiculo.sedeOperativa.nombre,
                                'nuevo sede operativa': sedeOperativaResponse.data.nombre,
                            };
                            this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                        }
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    });
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}