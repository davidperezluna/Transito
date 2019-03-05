import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MsvRevisionService } from '../../../services/msvRevision.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { MsvResultadoService } from "../../../services/msvResultado.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-revision',
    templateUrl: './editRevision.component.html'
})
export class EditRevisionComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() msvRevision: any = null;
    public errorMessage;
    public contratistas: any;
    public contratistaSelected: any;
    public formReady = false;
    public aval;

    constructor(
        private _RevisionService: MsvRevisionService,
        private _MsvPersonalFuncionarioService: MpersonalFuncionarioService,
        private _MsvResultadoService: MsvResultadoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        let token = this._LoginService.getToken();
        this._MsvResultadoService.findAvalByEvaluacion(this.msvRevision, token).subscribe(
            response => {
                this.aval = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
        
        this._MsvPersonalFuncionarioService.selectContratistas().subscribe(
            response => {
                this.contratistas = response;
                setTimeout(() => {
                    this.contratistaSelected = [this.msvRevision.funcionario.id];
                });
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._LoginService.getToken();
        this._RevisionService.editRevision(this.msvRevision, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: 'El registro se ha modificado con éxito.',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición.");
                    }
                }

            });
    }

}