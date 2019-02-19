import { Component, OnInit } from '@angular/core';
import { FroReporteIngresosService } from '../../services/froReporteIngresos.service';
import { LoginService } from '../../services/login.service';
import { FroReporteIngresos } from "./froReporteIngresos.modelo";
import { FroCfgTipoRecaudoService } from "../../services/froCfgTipoRecaudo.service";
import { SedeOperativaService } from "../../services/sedeOperativa.service";

import { FroTramiteService } from "../../services/froTramite.service";
import { ComparendoService } from "../../services/comparendo.service";
import { FroAcuerdoPagoService } from "../../services/froAcuerdoPago.service";

import swal from 'sweetalert2';

import { DatePipe, CurrencyPipe } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './froReporteIngresos.component.html',
    providers: [DatePipe]
})
export class FroReporteIngresosComponent implements OnInit {
    public errorMessage;
    public respuesta;
    public reporteIngresoss;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any;
    public tiposRecaudo;
    public tipoRecaudoSelected;
    public froReporteIngresos: FroReporteIngresos;
    public fecha;
    public date;
    public tablaTramites = false;
    public tablaComparendos = false;
    
    public sedeOperativaSelected;
    public sedes;

    public tramites;
    public comparendos;
    public cant;

    constructor(
        private _FroReporteIngresosService: FroReporteIngresosService,
        private _FroCfgTipoRecaudoService: FroCfgTipoRecaudoService,
        private _SedeOperativaService: SedeOperativaService,

        private _FroTramiteService: FroTramiteService,
        private _ComparendoService: ComparendoService,
        private _FroAcuerdoPagoServie: FroAcuerdoPagoService,

        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.froReporteIngresos = new FroReporteIngresos(null, null, null, null);

        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'dd/MM/yyyy HH:mm:ss a');

        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardará unos segundos, por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading();
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        });
        this._FroCfgTipoRecaudoService.select().subscribe(
            response => {
                this.tiposRecaudo = response;

                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedes = response;

                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
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

    iniciarTabla() {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            buttons: [
                {
                    extend: 'excel',
                    text: 'Excel',
                    title: 'xls',
                    filename: 'Reporte_Ingresos' + this.fecha,
                },
                {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    filename: 'Reporte_IngresosPDF_' + this.fecha,
                }
            ],
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    }

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onEnviar(){
        let token = this._LoginService.getToken();
        this.froReporteIngresos.idSedeOperativa = this.sedeOperativaSelected;
        if(this.tipoRecaudoSelected == 1){
            this._FroTramiteService.getTramitePorFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.tramites = response.data;
                        this.cant = response.cant;
                        this.tablaTramites = true;
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        })
                    } else {
                        swal({
                            title: 'Error!',
                            text: response.message,
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
                }
            );
        } else if(this.tipoRecaudoSelected == 2) {
            this._ComparendoService.getComparendoByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.comparendos = response.data;
                        this.tablaComparendos = true;
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        })
                    } else {
                        swal({
                            title: 'Error!',
                            text: response.message,
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
                }
            );
        }
    }
}
