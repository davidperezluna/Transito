import { Component, OnInit } from '@angular/core';
import { SvCfgTemaCapacitacionService } from '../../services/svCfgTemaCapacitacion.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTemaCapacitacion } from './svCfgTemaCapacitacion.modelo';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgTemaCapacitacion.component.html'
})
export class SvCfgTemaCapacitacionComponent implements OnInit {
    public errorMessage;
    public table: any;
    public temas;
    public respuesta;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public tema = SvCfgTemaCapacitacion;

    constructor(
        private _SvCfgTemaCapacitacionService: SvCfgTemaCapacitacionService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
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
        this._SvCfgTemaCapacitacionService.index().subscribe(
            response => {
                this.temas = response.data;
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

    onNew() {
        this.formNew = true;
        this.formIndex = false;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    iniciarTabla() {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
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

    onDelete(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminará este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._loginService.getToken();

                this._SvCfgTemaCapacitacionService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
                        this.table.destroy();
                        this.respuesta = response;
                        this.ngOnInit();
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
        });
    }
    onEdit(tema: any) {
        this.tema = tema;
        this.formEdit = true;
        this.formIndex = false;
    }
}
