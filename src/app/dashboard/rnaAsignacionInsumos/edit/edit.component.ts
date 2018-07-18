import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {rnaAsignacionInsumos} from '../rnaAsignacionInsumos.modelo';
import {RnaLoteInsumoService} from '../../../services/rnaloteInsumos.service';
import { EmpresaService } from '../../../services/empresa.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { CasoInsumoService } from '../../../services/casoInsumo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() loteInsumoInsumo:any = null;
@Input() tipoInsumo:any = null;

public errorMessage;
public respuesta;
public formReady = false;
public sedeSelected:any;
public insumoSelected:any;
public empresaSelected:any;
public insumos:any;
public sedes:any;
public empresas:any;
public sustratos:any;

constructor(
  private _rnaloteInsumosService: RnaLoteInsumoService,
  private _rnaRegistroInsumosService: RnaLoteInsumoService,
  private _loginService: LoginService,
  private _EmpresaService: EmpresaService,
  private _SedeOperativaService: SedeOperativaService,
  private _CasoInsumoService: CasoInsumoService,
  ){}

  ngOnInit(){ 

    this._EmpresaService.getEmpresaSelect().subscribe(
      response => {
        this.empresas = response;
        setTimeout(() => {
           this.empresaSelected = [this.loteInsumoInsumo.empresa.id];
        });
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._CasoInsumoService.getCasoInsumoInsumoSelect().subscribe(
      response => {
        this.insumos = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CasoInsumoService.getCasoInsumoSustratoSelect().subscribe(
      response => {
        this.sustratos = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    if (this.tipoInsumo == 'sustrato') {
      this._SedeOperativaService.getSedeOperativaSelect().subscribe(
        response => {
          this.sedes = response;
          setTimeout(() => {
            this.sedeSelected = [this.loteInsumoInsumo.sedeOperativa.id];
          });
        }, 
        error => {
          this.errorMessage = <any>error;
  
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    this.loteInsumoInsumo.empresaId = this.empresaSelected;
    this.loteInsumoInsumo.sedeOperativaId = this.sedeSelected;
    this.loteInsumoInsumo.casoInsumoId = this.insumoSelected;
    let token = this._loginService.getToken();
		this._rnaloteInsumosService.edit(this.loteInsumoInsumo,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
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
  isFin() {
    this.loteInsumoInsumo.cantidad = parseInt(this.loteInsumoInsumo.rangoFin) - parseInt(this.loteInsumoInsumo.rangoInicio)+1;
   }

}