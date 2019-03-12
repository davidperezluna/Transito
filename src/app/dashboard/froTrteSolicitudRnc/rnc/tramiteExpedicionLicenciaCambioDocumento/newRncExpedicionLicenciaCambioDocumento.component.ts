import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia-cambio-documento',
    templateUrl: './newRncExpedicionLicenciaCambioDocumento.html'
})
export class NewRncExpedicionLicenciaCambioDocumentoComponent implements OnInit {
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
        'tramiteFormulario': null,
        'idFactura': null,
        'numeroLicenciaConduccion': null,
        'identificacionAnterior': null,
        'identificacionActual': null,
        'numeroRunt': null,
        'vigencia': null,
        'idPais': null,
        'idClase': null,
        'idServicio': null,
        'idCategoria': null,
        'ciudadanoId': null,
    };

    public resumen = {
        'Numero licencia conduccion actual': null,
        'Numero licencia conduccion anterior': null,
        'identificacion Anterior': null,
        'identificacion Actual': null,
        'Nombre Solicitante': null,
    };

    constructor(
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgPaisService: CfgPaisService,
        private _CategoriaService: CfgLicenciaConduccionCategoriaService,
    ) { }

    ngOnInit() {
        this.datos.identificacionAnterior = this.solicitante.identificacion;

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
    
    enviarTramite() {
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnc-expedicioncambiodocumento';
        this.datos.numeroLicenciaConduccion = this.datos.identificacionActual;
        this.datos.ciudadanoId = this.solicitante.id;
        this.resumen["identificacion Actual"] = this.datos.identificacionActual;
        this.resumen["identificacion Anterior"] = this.datos.identificacionAnterior;
        this.resumen["Nombre Solicitante"]= this.solicitante.primerNombre+' '+this.solicitante.segundoNombre+' '+this.solicitante.primerApellido+' '+this.solicitante.segundoApellido;
        this.resumen["Numero licencia conduccion actual"] = this.datos.identificacionActual;
        this.resumen["Numero licencia conduccion anterior"] = this.datos.identificacionAnterior;
        
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}