import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { SedeOperativaService } from '../../../../services/sedeOperativa.service';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteTrasladoService } from '../../../../services/tramiteTraslado.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-traslado',
  templateUrl: './newTraslado.component.html'
})
export class NewTrasladoComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() readyTramite = new EventEmitter<any>();
@Input() vehiculo: any = null;
@Input() factura: any = null;
@Input() tramiteTraslado: any = null;
public sedeOperativaSelected: any;
public sedes: any;
public tramitesFactura: any = null;
public tramiteFacturaSelected: any;
public tramiteRealizado: any = false;
public errorMessage;
public resumen = {};

public datos = {
    'sedeOperativaIdNew': null,
    'sedeOperativaIdOld': null,
    'fechaSalida': null,
    'numeroRunt': null,
    'numeroGuia': null,
    'nombreEmpresa': null,
    'tramiteFormulario': null,
    'idFactura': null,
    'idVehiculo': null,
    'campos': null,
  };

constructor(
  private _loginService: LoginService,
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _TramiteTrasladoService: TramiteTrasladoService,
  private _TramiteFacturaService: TramiteFacturaService,
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService
  ){}

  ngOnInit() {
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedes = response;
        console.log(this.sedes);
        
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._TramiteFacturaService.getTramitesByFacturaSelect(this.factura.id).subscribe(
      response => {
        
      this.tramitesFactura = response;
      
      this.tramitesFactura.forEach(tramiteFactura => {
        if (tramiteFactura.realizado == 1) {
          if (tramiteFactura.tramitePrecio.tramite.id == 3) {
            this.tramiteRealizado = tramiteFactura;
            console.log(this.tramiteRealizado);
          }
        }
      });
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    });

    
  //consultar tramite solicitud con tramiterealizado.id
  let token = this._loginService.getToken();
  if(this.tramiteRealizado != false ){
    this._TramiteSolicitudService.showTramiteSolicitudByTamiteFactura(token,this.tramiteRealizado.id).subscribe(
      response => {
          this.datos = response.data.datos
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
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected
    
    this._VehiculoService.editSedeOperativaVehiculo(this.vehiculo,token).subscribe(
      response => {
          response = response; 
          if(response.status == 'success'){
              this.datos.sedeOperativaIdNew = this.sedeOperativaSelected;
              this.datos.sedeOperativaIdOld = this.vehiculo.sedeOperativa.id;
              this.datos.idFactura = this.factura.id;
              this.datos.tramiteFormulario = 'rna-traslado';
              this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
          }
          error => {
                  this.errorMessage = <any>error;

                  if(this.errorMessage != null){
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                  }
              }
      }); 

        this.datos.sedeOperativaIdNew = this.sedeOperativaSelected;
        this.datos.idVehiculo = this.vehiculo.id;
        this._TramiteTrasladoService.register(this.datos,token).subscribe(response => {
        if(response.status == 'success'){
          alert("Datos enviados con éxito");
        }
        error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
    });

    this.ngOnInit();
		
  }

}