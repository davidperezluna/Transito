import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {rnaAsignacionInsumos} from '../imoAsignacion.modelo';
import { ImoLoteService } from '../../../services/imoLote.service';
import {LoginService} from '../../../services/login.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../services/imoCfgTipo.service';
import {ImoInsumoService} from '../../../services/imoInsumo.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public rnaAsignacionInsumos: rnaAsignacionInsumos;
public errorMessage;
public respuesta;
public empresas:any;
public empresaSelected:any;
public sedes:any;
public sedeSelected:any;
public sedeSelectedInsumo:any;
public frmInsumoSelectInsumo:any=true;
public insumos:any;
public sustratos:any;
public insumoSelect:any;
public loteInsumo:any;
public insumoSelected:any;
public lotes:any;
public lotesSelecionados:any=[];
public insumoSelectedInsumo:any;
public date:any;
public numero:any;
public frmInsumo:any=false;
public frmInsumoSelect:any=true; 
public table:any; 
constructor(
  private _ImoLoteService: ImoLoteService,
  private _loginService: LoginService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _CasoInsumoService: ImoCfgTipoService,
  private _ImoInsumoService: ImoInsumoService,
  ){}

  ngOnInit() {
    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.rnaAsignacionInsumos = new rnaAsignacionInsumos(null,null,null,null,null,null,null,null,null,null);
    this.rnaAsignacionInsumos.fecha = datePiper.transform(this.date,'yyyy-MM-dd');

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

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.sedes = response;
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
  onCancelar(){
    this.ready.emit(true);
  }

 

  isFin() {
   this.rnaAsignacionInsumos.numero = parseInt(this.rnaAsignacionInsumos.rangoFin) - parseInt(this.rnaAsignacionInsumos.rangoInicio)+1;
  }

  changedSedeOperativa(e){
    if (e) {  
      this.frmInsumoSelect = false;
    }
  }

  changedSedeOperativaInsumo(e){
    if (e) {
      this.frmInsumoSelectInsumo = false;
    }
  }

  changedInsumoInsumo(e){
    if (e) {
      let datos={
        'tipoInsumo':this.insumoSelectedInsumo,
      }
      let token = this._loginService.getToken();
      this._ImoLoteService.show(datos,token).subscribe(
        response => {
          this.loteInsumo = response.data;
          if (response.status == 'success') {
            console.log(this.loteInsumo);
            this.numero = this.loteInsumo.cantidad;
          }else{
            swal({
              title: 'Error!',
              text: 'No existen insumos para esta sede',
              type: 'error',
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
  }

  onSearchLote(){
      if (this.table) {
        this.table.destroy()
      }
      let datos={
        'tipoInsumo':this.insumoSelected,
        'idOrganismoTransito':this.sedeSelected,
      }
      let token = this._loginService.getToken();
      this._ImoLoteService.show(datos,token).subscribe( 
        response => {
          
          if (response.status == 'success') {
            this.lotes = response.data;
            console.log(this.lotes);
            setTimeout(() => {
              this.iniciarTabla();
            });
          }else{
            this.lotes = null;
            swal({
              title: 'Error!',
              text: 'No existen sustratos para esta sede',
              type: 'error',
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

  onInsumo() {
    this.frmInsumo = true;
  }
  onSustrato() {
    this.frmInsumo = false;
  }

  iniciarTabla(){
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

  onAsignarLote(lote){
   
    this.lotesSelecionados.push(
        {
          'idLote':lote.id,
          'tipo':lote.tipoInsumo.nombre,
          'idTipo':lote.tipoInsumo.id,
          'cantidad':lote.cantidad,
        }   
    );
  }

  onAsignarLoteInsumo(){
    if (this.loteInsumo) {
      this.lotesSelecionados.push(
          {
            'idLote':this.loteInsumo.id,
            'tipo':this.loteInsumo.tipoInsumo.nombre,
            'idTipo':this.loteInsumo.tipoInsumo.id,
            'cantidad':this.loteInsumo.cantidad,
          }   
      );
    }
    this.loteInsumo = false;
  }

  onEliminarLoteSelecionado(lote){
    this.lotesSelecionados = this.lotesSelecionados.filter(h => h !== lote);
  }


  onEnviarArray(lote){
    swal({
      title: '¿Confirmar?',
      text: "¿Desea asignar los sustratos?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      swal.close();
      if (result.value) {
        let token = this._loginService.getToken();
        this.rnaAsignacionInsumos.sedeOperativaId = this.sedeSelected;
        let datos={
          'asignacionInsumos' : this.rnaAsignacionInsumos,
          'array': this.lotesSelecionados
        };
        this._ImoInsumoService.register(datos,token).subscribe(
          response => {
            this.respuesta = response;
            if(this.respuesta.status == 'success'){
              this.lotesSelecionados = null;
              this.lotes = null;
              this.ready.emit(true);
              swal({
                title: 'Perfecto!',
                text: 'Registro exitoso!',
                type: 'success',
                confirmButtonText: 'Aceptar'
              })
            }else{
              swal({
                title: 'Error!',
                text: 'El codigo ya se encuentra registrado',
                type: 'error',
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
    })   
  }

}