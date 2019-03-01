import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { LoginService } from '../../../../services/login.service';

@Component({
    selector: 'appRna-cambio-motor',
    templateUrl: './newRna.cambioMotor.html'
})
export class NewRnaCambioMotorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;
    public tipoIngresoList: string[];
    public tipoIngresoSelected: any;
    public tipoIdentificacion: any;
    public numeroIdentificacion: any;
    public combustibles: any;
    public combustibleSelected: any;
    public datos = {
        'numeroMotor': null,
        'numeroAceptacion': null,
        'numeroFactura': null,
        'fecha': null,
        'tipoIdentificacion': null,
        'numeroIdentificacion': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'combustibleId': null,
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idTipoIngreso': null,
        'idCombustible': null,
    };

    public tiposIngreso = [
        { value: 'NUEVO', label: 'NUEVO' },
        { value: 'USADO', label: 'USADO' },
    ];

    constructor(
        private _loginService: LoginService,
        private _CombustibleService: VhloCfgCombustibleService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this._CombustibleService.getCombustibleSelect().subscribe(
            response => {
                this.combustibles = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
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

    enviarTramite() {
        let token = this._loginService.getToken();

        this.datos.tramiteFormulario = 'rna-cambiomotor';
        this.datos.idTipoIngreso = this.tipoIngresoSelected;
        this.tipoIdentificacion = this.tipoIdentificacionSelected;
        this.datos.idCombustible = this.combustibleSelected;
        this.datos.campos = ['motor'];
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idFactura = this.factura.id;

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = {
                        'motor anterior': this.vehiculo.motor.nombre,
                        'nuevo motor': this.datos.numeroMotor,
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
            }
        );  
            
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}