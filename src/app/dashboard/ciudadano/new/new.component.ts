import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Ciudadano } from '../ciudadano.modelo';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { LoginService } from '../../../services/login.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { GeneroService } from '../../../services/genero.service';
import { GrupoSanguineoService } from '../../../services/grupoSanguineo.service';
import { MunicipioService } from '../../../services/municipio.service';
import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public ciudadano: Ciudadano;
public errorMessage;
public respuesta;
public tiposIdentificacion:any;
public generos:any;
public gruposSanguineos:any;
public municipios:any;
public tipoIdentificacionSelected:any;
public generoSelected:any;
public grupoSanguineoSelected:any;
public municipioResidenciaSelected:any;
public municipioNacimientoSelected:any;


constructor(
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _generoService: GeneroService,
  private _grupoSanguineoService: GrupoSanguineoService,
  private _municipioService: MunicipioService,
 
  ){}

  ngOnInit() {
    this.ciudadano = new Ciudadano(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

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

    this._generoService.getGeneroSelect().subscribe(
      response => {
        this.generos = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._grupoSanguineoService.getGrupoSanguineoSelect().subscribe(
      response => {
        this.gruposSanguineos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
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
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.ciudadano.tipoIdentificacionId = this.tipoIdentificacionSelected;
    this.ciudadano.generoId = this.generoSelected;
    this.ciudadano.grupoSanguineoId = this.grupoSanguineoSelected;
    this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
    this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;

    var html = 'Se va a registrar el usuario:<br>'+
               'Primer Nombre: <b>'+this.ciudadano.primerNombre+'</b><br>'+
               'Tipo Identificacion: <b>'+this.ciudadano.tipoIdentificacionId+'</b><br>'+
               'Identificacion: <b>'+this.ciudadano.numeroIdentificacion+'</b><br>'+
               'Genero: <b>'+this.ciudadano.generoId+'</b><br>'+
               'Grupo Sanguineo: <b>'+this.ciudadano.grupoSanguineoId+'</b><br>'+
               'Direccion: <b>'+this.ciudadano.direccion+'</b><br>'+
               'Telefono: <b>'+this.ciudadano.telefono+'</b><br>';

   swal({
      title: 'Creacion de persona natural',
      type: 'warning',
      html:html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Crear!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No crear',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
        if (result.value) {
         console.log(this.ciudadano);
    this._CiudadanoService.register(this.ciudadano,token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El ciudadano ya se encuentra registrado',
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
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          
        }
      })
    
    
  }

}