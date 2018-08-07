import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvRegistroIpatService } from '../../../services/msvRegistroIpat.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { MsvConsecutivoService } from '../../../services/msvConsecutivo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { MunicipioService } from '../../../services/municipio.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { CfgGravedadService } from '../../../services/cfgGravedad.service';
import { CfgClaseAccidenteService } from '../../../services/cfgClaseAccidente.service';
import { CfgChoqueConService } from '../../../services/cfgChoqueCon.service';
import { CfgObjetoFijoService } from '../../../services/cfgObjetoFijo.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { MsvRegistroIpat } from '../msvRegistroIpat.modelo';
import { Ciudadano } from '../../ciudadano/ciudadano.modelo';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public msvRegistroIpat: MsvRegistroIpat;
  public sedeOperativa: any;
  public errorMessage;
  public respuesta;
  public nroIpat: any;
  public consecutivo: any;
  public ipatEncontrado = 1;
  public ipats = false;
  public identity: any;
  public gravedades: any;
  public gravedadSelected: any;
  public clasesAccidente: any;
  public claseAccidenteSelected: any;
  public choquesCon: any;
  public choqueConSelected: any;
  public objetosFijos: any;
  public objetoFijoSelected: any;
  public datos = {
  }
  public datos2 = {
    'vehiculos': [],
    'cDemandante': [],
    'cDemandado': [],
  }

  constructor(
    private _MsvRegistroIpatService: MsvRegistroIpatService,
    private _FuncionarioService: MpersonalFuncionarioService,
    private _MsvConsecutivoService: MsvConsecutivoService,
    private _CiudadanoService: CiudadanoService,
    private _loginService: LoginService,
    private _MunicipioService: MunicipioService,
    private _DepartamentoService: DepartamentoService,
    private _GravedadService: CfgGravedadService,
    private _ClaseAccidenteService: CfgClaseAccidenteService,
    private _ChoqueConService: CfgChoqueConService,
    private _ObjetoFijoService: CfgObjetoFijoService,
  ) { }

  ngOnInit() {
    this.msvRegistroIpat = new MsvRegistroIpat(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this._GravedadService.getGravedadSelect().subscribe(
      response => {
        this.gravedades = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._ClaseAccidenteService.getClaseAccidenteSelect().subscribe(
      response => {
        this.clasesAccidente = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._ChoqueConService.getChoqueConSelect().subscribe(
      response => {
        this.choquesCon = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._ObjetoFijoService.getObjetoFijoSelect().subscribe(
      response => {
        this.objetosFijos = response;
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


  onEnviar(){
    
  }

  onCancelar() {
    this.ready.emit(true);
  }
  enviarTramite() {
    let token = this._loginService.getToken();

    let data =[
      {'datosLimitacion': this.msvRegistroIpat},

      {'vehiculosLimitacionArray': this.datos2}
    ]
    this._MsvRegistroIpatService.register(data, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          
        } else {
          
          swal({
            title: 'Error!',
            text: 'La limitacion a la propiedad ' + this.consecutivo + ', con la fecha: ' + this.msvRegistroIpat.fechaAccidente ,
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

      });


  }



  onKeyIpat() {
    let token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();
    let datos = {
      'nroIpat': this.nroIpat,
      'identificacionUsuario': this.identity.identificacion,
    };
    this._MsvConsecutivoService.showBySedeConsecutivo(token, datos).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          this.consecutivo = this.respuesta.data;
          
          this.ipatEncontrado = 2;
        } else {
          this.ipatEncontrado = 3;
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });
    this._FuncionarioService.searchLogin(this.identity, token).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          this.sedeOperativa = this.respuesta.data.sedeOperativa;

          this.ipatEncontrado = 2;
        } else {
          this.ipatEncontrado = 3;
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });
  }


  delete(vehiculo: any): void {
    this.datos2.vehiculos = this.datos2.vehiculos.filter(h => h !== vehiculo);
    if (this.datos2.vehiculos.length === 0) {
      this.ipats = false;
    }
  }


  btnNewVehiculo() {

    this.datos2.vehiculos.push(
      {
        'placa': this.consecutivo,
        'sedeOperativa': this.consecutivo
      }
    );

    this.ipatEncontrado = 1;
    this.ipats = true;
  }

  btnCancelarVehiculo() {
    this.ipatEncontrado = 1
  }


}