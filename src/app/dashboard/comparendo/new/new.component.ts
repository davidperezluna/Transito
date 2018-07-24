import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Comparendo } from '../comparendo.modelo';
import { Inmovilizacion } from '../inmovilizacion.modelo';
import { ComparendoService } from '../../../services/comparendo.service';
import { LoginService } from '../../../services/login.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { MunicipioService } from '../../../services/municipio.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public comparendo: Comparendo;
public inmovilizacion: Inmovilizacion;
public errorMessage;
public respuesta;
public agentesTransito: any;
public sedesOperativas: any;
public municipios: any;
public funcionarioSelected: any;
public municipioSelected: any;
public sedeOperativaSelected: any;
public funcionario: any;
public sedeOperativa: any;
public funcionarioReady = false;
public sedeOperativaReady = false;
public validado = false;
public comparendoExistente = false;
public placa: any;
public identificacion: any;
public vehiculo: any;
public municipioId: any;
public ciudadano: any;
public ciudadanosVehiculo: any;
public vehiculoNoEncontrado = false;
public ciudadanoNoEncontrado = false;
public formCiudadano = false;
public inmovilizacionForm = false;
public tipoIdentificacionSelected: any;
public tiposIdentificacion: any;
public municipioNacimientoSelected: any;

constructor(
  private _ComparendoService: ComparendoService,
  private _loginService: LoginService,
  private _mpersonalFuncionarioService: MpersonalFuncionarioService,
  private _sedeOperativaService: SedeOperativaService,
  private _municipioService: MunicipioService,
  private _vechiculoService: VehiculoService,
  private _ciudadanoService: CiudadanoService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  ){}

  ngOnInit() {
   this.placa = {
     'placa' : this.placa,
   }; 
   this.identificacion = {
     'numeroIdentificacion' : this.identificacion,
   }; 
    this.comparendo = new Comparendo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.inmovilizacion = new Inmovilizacion(null,null,null,null,null,null,null,null);

    this._mpersonalFuncionarioService.selectAgentes().subscribe(
        response => {
          this.agentesTransito = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    this._municipioService.getMunicipioSelect().subscribe(
        response => {
          this.municipios = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    this._sedeOperativaService.getSedeOperativaSelect().subscribe(
        response => {
          this.sedesOperativas = response;
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
  onEnviar(){
    let token = this._loginService.getToken();
    this.comparendo.funcionarioId = this.funcionarioSelected;
    this.comparendo.municipioId = this.municipioSelected;
    this.comparendo.vehiculoId = this.vehiculo.id;
    this.comparendo.ciudadanoId = this.ciudadano.id;
    
    console.log(this.comparendo);
		this._ComparendoService.register(this.comparendo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'la comparendo '+ this.comparendo.numeroOrden +' ya se encuentra registrado',
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

  changedMpersonalFuncionario(e){
    if (e) {
     let token = this._loginService.getToken();
     /*this._mpersonalFuncionarioService.showMpersonalFuncionario(token,e).subscribe(
        response => {
          this.mpersonalFuncionario = response;
          this.funcionarioReady = true;
          console.log(this.mpersonalFuncionario);
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );*/
    }
  }

  changedSedeOperativa(e){
    this.validado = false;
    if (e) {
     let token = this._loginService.getToken();
     this._sedeOperativaService.showSedeOperativa(token,e).subscribe(
        response => {
          this.sedeOperativa = response;
          this.sedeOperativaReady = true;
          this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
          console.log(this.sedeOperativa);
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

  onValidarNumeroOrden(){
    let token = this._loginService.getToken();
    this._ComparendoService.serchComparendo(this.comparendo,token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.validado = true;
          this.comparendoExistente = false;
        }else{
          this.comparendoExistente = true;
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


  onKeyPlaca(){
  swal({
    title: 'Cargando Datos del Vehiculo!',
    text: 'Solo tardara unos segundos por favor espere.',
    timer: 2500,
    onOpen: () => {
      swal.showLoading()
    }
  }).then((result) => {
    if (
      // Read more about handling dismissals
      result.dismiss === swal.DismissReason.timer
    ) {
    }
  });
  
  this.vehiculoNoEncontrado = false;
  let token = this._loginService.getToken();
  this._vechiculoService.showVehiculoPlaca(token,this.placa).subscribe(
    response => {
        if (response.status == "success") {
        this.vehiculo = response.data;
        this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.vehiculo.id).subscribe(
            response => {
              this.ciudadanosVehiculo = response.data;
              console.log(this.ciudadanosVehiculo);
            error => { 
                this.errorMessage = <any>error;
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición"); 
                }
              }
          });
        }else{
        this.vehiculoNoEncontrado = true;
        this.vehiculo = false;
        }
        console.log(this.vehiculo);
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición"); 
          }
        }

    }); 
    
  }

  clickOnmovilizacion(){
    if (this.inmovilizacionForm) {
      this.inmovilizacionForm = false;
    }else{
      this.inmovilizacionForm = true;
    }
  }
  onKeyIdentificacion(){
    swal({
    title: 'Cargando Datos del Ciudadano!',
    text: 'Solo tardara unos segundos por favor espere.',
    timer: 1000,
    onOpen: () => {
      swal.showLoading()
    }
  }).then((result) => {
    if (
      // Read more about handling dismissals
      result.dismiss === swal.DismissReason.timer
    ) {
    }
  })
    this.formCiudadano = true;
    this.ciudadanoNoEncontrado = false;
    let token = this._loginService.getToken();
    this._ciudadanoService.searchByIdentificacion(token,this.identificacion).subscribe(
      response => {
        if (response.status == "success") {
        this.ciudadano = response.data;
        console.log(this.ciudadano);
        }else{
          this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
            response => {
              this.tiposIdentificacion = response;
            }, 
            error => {
              this.errorMessage = <any>error;
    
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
          this._municipioService.getMunicipioSelect().subscribe(
            response => {
              this.municipios = response;
            }, 
            error => {
              this.errorMessage = <any>error;
              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
        this.ciudadanoNoEncontrado = true;
        this.ciudadano = false;
        }
        console.log(this.vehiculo);
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