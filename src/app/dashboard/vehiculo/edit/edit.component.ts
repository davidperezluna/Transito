import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Vehiculo} from '../vehiculo.modelo';
import {DepartamentoService} from "../../../services/departamento.service";
import {LoginService} from '../../../services/login.service';
import {MunicipioService} from '../../../services/municipio.service';
import {LineaService} from '../../../services/linea.service';
import {ClaseService} from '../../../services/clase.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {ServicioService} from '../../../services/servicio.service';
import {ColorService} from '../../../services/color.service';
import {CombustibleService} from '../../../services/combustible.service';
import {VehiculoService} from '../../../services/vehiculo.service';
import {OrganismoTransitoService} from '../../../services/organismoTransito.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() vehiculo:any = null;
public municipios:any;
public errorMessage:any;
public habilitar:any;
public lineas:any;
public clases:any;
public carrocerias:any;
public servicios:any;
public colores:any;
public combustibles:any;
public municipioSelected:any;
public lineaSelected:any;
public claseSelected:any;
public carroceriaSelected:any;
public servicioSelected:any;
public colorSelected:any;
public organismoTransitoSelected:any;
public combustibleSelected:any;
public respuesta:any;
public organismosTransito:any;

constructor(
  private _departamentoService: DepartamentoService,
  private _loginService: LoginService,
  private _MunicipioService: MunicipioService,
  private _lineaService: LineaService,
  private _ClaseService: ClaseService,
  private _CarroceriaService: CarroceriaService,
  private _ServicioService: ServicioService,
  private _ColorService: ColorService,
  private _CombustibleService: CombustibleService,
  private _VehiculoService: VehiculoService,
  private _OrganismoTransitoService: OrganismoTransitoService,
  ){}

  ngOnInit() {
  
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 3000,
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
    this._lineaService.getLineaSelect().subscribe(
      response => {
        this.lineas = response;
        setTimeout(() => {
            this.lineaSelected = [this.vehiculo.linea.id];
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
    this._MunicipioService.getMunicipioSelect().subscribe(
      response => {
        this.municipios = response;
        setTimeout(() => {
            this.municipioSelected = [this.vehiculo.municipio.id];
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
    this._OrganismoTransitoService.getOrganismoTransitoSelect().subscribe(
      response => {
        this.organismosTransito = response;
        setTimeout(() => {
            this.organismoTransitoSelected = [this.vehiculo.organismoTransito.id];
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
    this._ClaseService.getClaseSelect().subscribe(
      response => {
        this.clases = response;
        setTimeout(() => {
            this.claseSelected = [this.vehiculo.clase.id];
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
    this._CarroceriaService.getCarroceriaSelect().subscribe(
      response => {
        this.carrocerias = response;
        setTimeout(() => {
            this.carroceriaSelected = [this.vehiculo.carroceria.id];
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
    this._ServicioService.getServicioSelect().subscribe(
      response => {
        this.servicios = response;
        setTimeout(() => {
            this.servicioSelected = [this.vehiculo.servicio.id];
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
    this._ColorService.getColorSelect().subscribe(
      response => {
        this.colores = response;
        setTimeout(() => {
            this.colorSelected = [this.vehiculo.color.id];
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
    this._CombustibleService.getCombustibleSelect().subscribe(
      response => {
        this.combustibles = response;
        setTimeout(() => {
            this.combustibleSelected = [this.vehiculo.combustible.id];
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

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){

    this.vehiculo.municipioId = this.municipioSelected;
    this.vehiculo.lineaId = this.lineaSelected;
    this.vehiculo.claseId = this.claseSelected;
    this.vehiculo.carroceriaId = this.carroceriaSelected;
    this.vehiculo.servicioId = this.servicioSelected;
    this.vehiculo.colorId = this.colorSelected;
    this.vehiculo.combustibleId = this.combustibleSelected;
    this.vehiculo.organismoTransitoId = this.organismoTransitoSelected;
    console.log(this.vehiculo);  
    let token = this._loginService.getToken();
    this._VehiculoService.register(this.vehiculo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Echo!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El vehiculo '+ this.vehiculo.placa +' ya se encuentra registrado',
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

  // changedDepartamento(e){
  //   let token = this._loginService.getToken();
  //   alert(e);
  //   }

}