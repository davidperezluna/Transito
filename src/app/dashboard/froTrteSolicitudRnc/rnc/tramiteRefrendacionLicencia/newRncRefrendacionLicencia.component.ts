import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-refrendacion-licencia',
    templateUrl: './newRncRefrendacionLicencia.html'
})
export class NewRncRefrendacionLicenciaComponent implements OnInit {
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

    public datos = {
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'vigencia': null,
        'idPais': null,
        'idClase': null,
        'idServicio': null,
        'idCategoria': null,
        'idTramite': null,
        'idFactura': null,
        'idSolicitante': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgPaisService: CfgPaisService,
        private _CategoriaService: CfgLicenciaConduccionCategoriaService,
    ) { }

    ngOnInit() {
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

        this._CategoriaService.select().subscribe(
            response => {
                this.categorias = response;
                //this.datos.idCategoriaActual = [this.tramitePrecio.modulo.id];
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
        let token = this._LoginService.getToken();

        this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
        this.datos.idFactura = this.factura.id;
        this.datos.idTramite = 59;
        this.datos.idSolicitante = this.solicitante.id;

        let resumen = "<b>No. factura</b>" + this.factura.numero;

        this.readyTramite.emit({'foraneas':this.datos, 'resumen':resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}