import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';
import { VhloCfgPlacaService } from '../../services/vhloCfgPlaca.service';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnaPreasignacionPlaca.component.html'
})
export class VhloRnaPreasignacionPlacaComponent implements OnInit {
  public errorMessage;

  public vehiculoFiltro:any; 
  public vehiculos:any = null;
  public vehiculo:any = null;
  public placa:any = null;
  public formSearch = true; 
  public formIndex = true; 
  public formShow = true; 
  public table: any; 

  public organismosTransito:any = null;
  public organismoTransito:any = null;
  public funcionario:any = null;
  public placas:any = null;

  public datos = {
    'idVehiculo': null,
    'idOrganismoTransito': null,
    'idPlaca': null,
  };

  constructor(
    private _VehiculoService: VhloVehiculoService,
    private _PlacaService: VhloCfgPlacaService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
        response => {
          if (response.code == 200) {
              this.funcionario = response.data;
              this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
              
              this._PlacaService.selectByOrganismoTransito({ 'idOrganismoTransito': this.funcionario.organismoTransito.id }, token).subscribe(
                response => {
                  this.placas = response;
                }, 
                error => {
                  this.errorMessage = <any>error;
          
                  if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              );
            } else {
              this.funcionario = null;
              this.datos.idOrganismoTransito = null;

              swal({
                  title: 'Error!',
                  text: 'Usted no tiene permisos para realizar la preasigcón de placa',
                  type: 'error',
                  confirmButtonText: 'Aceptar'
              });
          }
          error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert('Error en la petición');
              }
          }
      }
    );
  }

  onSearchVehiculo() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._VehiculoService.searchByFilter({ 'filtro': this.vehiculoFiltro }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculos = response.data; 
          this.formIndex = true; 
          this.formShow = false; 

          let timeoutId = setTimeout(() => {  
            this.onInitTable();
          }, 100);

          swal.close();
        } else {
          this.vehiculos = null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
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

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
  }

  onShow(vehiculo:any){
    this.vehiculo = vehiculo;
    this.datos.idVehiculo = this.vehiculo.id;

    if (this.vehiculo.placa) {
      this.formIndex = false;
      this.formShow = true;
    }else{
      this.formIndex = false;

      swal({
        title: 'Error!',
        text: 'El vehiculo seleccionado ya tiene una placa asignada.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    this._PlacaService.show({ 'id': this.datos.idPlaca }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.placa = response.data;

          var html = 'El vehiculo con:<br> numero de chasis:  <b>'+ this.vehiculo.chasis +
                '</b><br>numero de motor:  <b>'+ this.vehiculo.motor +
                '</b><br>numero de serie:  <b>'+ this.vehiculo.serie +
                '</b><br>fue asignada La placa:<br><b><h2>'+ this.placa.numero +
                '</h2></b>con exitosamente durante 60 días';

          swal({
            title: '¿Estás seguro?',
            type: 'info',
            html:html,
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              this._VehiculoService.assign(this.datos, token).subscribe(
                response => {
                  if(response.status == 'success'){
                    this.formShow = false; 
                    
                    swal({
                      title: 'Perfecto!',
                      html: html,
                      type: 'success',
                      confirmButtonText: 'Aceptar',
                    }).then((result) => {
                      if (result.value) {
                        this.onCancelar();
                      }
                    });          
                  }else{
                    this.formShow = false;

                    swal({
                      title: 'Error!',
                      text: response.message,
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                    });
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
          });
        }else{
          this.placa = null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
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
    this.ngOnInit();
  }
}