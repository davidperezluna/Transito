import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloTpTarjetaOperacionService } from "../../../../../../services/vhloTpTarjetaOperacion.service";
import { LoginService } from '../../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-duplicado-tarjeta-operacion',
    templateUrl: './new.duplicadoTarjetaOperacion.html',
    providers: [DatePipe]
})

export class NewRnetDuplicadoTarjetaOperacionComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public tarjetaOperacion; 

    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public motivoList: string[];
    public motivoSelected: any;
    public mostrarFormulario = false;
    
    public datos = {
        'documentacion': true,
        'observacion': null,
        'campos': null,
        'nuevoNumeroTarjetaOperacion': null,
        'idTarjetaOperacion': null,
        'fechaVencimiento': null,
        'idVehiculo': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TarjetaOperacionService: VhloTpTarjetaOperacionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {

        let token = this._LoginService.getToken();

        this.datos.idFuncionario  = this.funcionario.id;

        this._TarjetaOperacionService.searchTarjetaOperacionByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
                if(response.code = 200){
                    this.mostrarFormulario = true;
                    this.tarjetaOperacion = response.data;
    
                    var datePiper = new DatePipe('en-US');
                    var date = new Date();
    
                    date.setTime(this.tarjetaOperacion.fechaVencimiento.timestamp * 1000);
    
                    this.tarjetaOperacion.fechaVencimiento = datePiper.transform(
                        date, 'yyyy-MM-dd'
                    );
                } else {
                    this.mostrarFormulario = false;

                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.satatus,
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        
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
        }
    }

   
    onEnviar() {  
        this.datos.campos = ['duplicadoTarjetaOperacion'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTarjetaOperacion = this.tarjetaOperacion.id;
        this.datos.fechaVencimiento = this.tarjetaOperacion.fechaVencimiento;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
                ',Tarjeta Operación anterior: ' + this.tarjetaOperacion.numeroTarjetaOperacion;

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
    }
}