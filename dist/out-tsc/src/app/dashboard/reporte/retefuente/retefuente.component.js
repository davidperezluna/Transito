"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var login_service_1 = require("../../../services/login.service");
var comparendo_service_1 = require("../../../services/comparendo.service");
var sweetalert2_1 = require("sweetalert2");
var RetefuenteComponent = (function () {
    function RetefuenteComponent(_ComparendoService, _loginService) {
        this._ComparendoService = _ComparendoService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.formIndex = true;
        this.tramite = false;
        this.infraccion = false;
        this.retefuente = false;
        this.retefuentes = [
            { 'value': "contaduria", 'label': "Reporte exógena para contaduría" },
            { 'value': "tesoreria", 'label': "Reporte para tesorería" }
        ];
    }
    RetefuenteComponent.prototype.ngOnInit = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: function () {
                sweetalert2_1.default.showLoading();
            }
        }).then(function (result) {
            if (
            // Read more about handling dismissals
            result.dismiss === sweetalert2_1.default.DismissReason.timer) {
            }
        });
        this._ComparendoService.getComparendo().subscribe(function (response) {
            _this.comparendos = response.data;
            console.log(_this.comparendos);
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
                sweetalert2_1.default.close();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    RetefuenteComponent.prototype.iniciarTabla = function () {
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
    };
    RetefuenteComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    RetefuenteComponent.prototype.onEnviar = function () {
        // let token = this._loginService.getToken();
        // this.registroMaquinaria.tipoVehiculoId = this.combustibleSelected;
        // this.registroMaquinaria.cfgOrigenVehiculoId = this.cfgOrigenRegistroSelected;
        // this.registroMaquinaria.vehiculoColorId = this.colorSelected;
        // this.registroMaquinaria.vehiculoMarcaId = this.marcaSelected;
        // this.registroMaquinaria.vehiculoClaseId = this.claseSelected;
        // this.registroMaquinaria.vehiculoLineaId = this.lineaSelected;
        // this.registroMaquinaria.vehiculoCarroceriaId = this.carroceriaSelected;
        // this.registroMaquinaria.vehiculoCombustibleId = this.combustibleSelected;
        // this.registroMaquinaria.condicionSelected = this.condicionSelected;
        // this.registroMaquinaria.fechaIngreso = this.fechaIngreso;
        // this.registroMaquinaria.pesoBruto = this.pesoBruto;
        // this.registroMaquinaria.cargaUtilMaxima = this.cargaUtilMaxima;
        // this.registroMaquinaria.rodajeSelected = this.rodajeSelected;
        // this.registroMaquinaria.numeroEjes = this.numeroEjes;
        // this.registroMaquinaria.numeroLlantas = this.numeroLlantas;
        // this.registroMaquinaria.tipoCabinaSelected = this.tipoCabinaSelected;
        // this.registroMaquinaria.altoTotal = this.altoTotal;
        // this.registroMaquinaria.largoTotal = this.largoTotal;
        // this.registroMaquinaria.anchoTotal = this.anchoTotal;
        // this.registroMaquinaria.subpartidaArancelaria = this.subpartidaArancelaria;
        // console.log(this.registroMaquinaria);  
        // var html = 'los datos de la maquinaria a ingresar son:<br>'+
        //            'Placa: <b>'+this.registroMaquinaria.vehiculoPlaca+'</b><br>'+
        //            'Condicon ingreso: <b>'+this.registroMaquinaria.condicionSelected+'</b><br>'+
        //            'Motor: <b>'+this.registroMaquinaria.vehiculoMotor+'</b><br>'+
        //            'Serie: <b>'+this.registroMaquinaria.vehiculoSerie+'</b><br>'+
        //            'Chasis: <b>'+this.registroMaquinaria.vehiculoChasis+'</b><br>'+
        //            'Fecha ingreso: <b>'+this.registroMaquinaria.fechaIngreso+'</b><br>';
        //  swal({
        //     title: 'Preregistro de maquinaria!',
        //     type: 'warning',
        //     html:html,
        //     showCancelButton: true,
        //     focusConfirm: false,
        //     confirmButtonText:
        //       '<i class="fa fa-thumbs-up"></i> Crear!',
        //     confirmButtonAriaLabel: 'Thumbs up, great!',
        //     cancelButtonText:
        //     '<i class="fa fa-thumbs-down"></i> No crear',
        //     cancelButtonAriaLabel: 'Thumbs down',
        //   }).then((result) => {
        //       if (result.value) {
        //   this._RegistroMaquinariaService.register(this.registroMaquinaria,token).subscribe(
        // 		response => {
        //       this.respuesta = response;
        //       console.log(this.respuesta);
        //       if(this.respuesta.status == 'success'){
        //         this.ready.emit(true);
        //         swal({
        //           title: 'Perfecto!',
        //           text: 'Registro exitoso!',
        //           type: 'success',
        //           confirmButtonText: 'Aceptar'
        //         })
        //       }else{
        //         swal({
        //           title: 'Error!',
        //           text: 'El vehiculo '+ this.registroMaquinaria.altoTotal +' ya se encuentra registrado',
        //           type: 'error',
        //           confirmButtonText: 'Aceptar'
        //         })
        //       }
        // 		error => {
        // 				this.errorMessage = <any>error;
        // 				if(this.errorMessage != null){
        // 					console.log(this.errorMessage);
        // 					alert("Error en la petición");
        // 				}
        // 			}
        // }); 
        //     } else if (
        //       // Read more about handling dismissals
        //       result.dismiss === swal.DismissReason.cancel
        //     ) {
        //     }
        //   })
    };
    RetefuenteComponent.prototype.changedMarca = function (e) {
        // if (this.marcaSelected) {
        //   let token = this._loginService.getToken()
        //     this._lineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
        //       response => { 
        //         if (response.data[0] != null) {
        //           this.lineas = response.data;
        //         }else{
        //           this.lineas = [];
        //         }
        //       }, 
        //       error => { 
        //         this.errorMessage = <any>error;
        //         if(this.errorMessage != null){
        //           console.log(this.errorMessage);
        //           alert("Error en la petición");
        //         }
        //       }
        //     );
        // }
    };
    RetefuenteComponent.prototype.changedDepartamento = function (e) {
        // if (this.marcaSelected) {
        //   let token = this._loginService.getToken()
        //     this._lineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
        //       response => {
        //         console.log(response.data[0]);
        //         if (response.data[0] != null) {
        //           this.lineas = response.data;
        //         }else{
        //           this.lineas = [];
        //         }
        //       }, 
        //       error => { 
        //         this.errorMessage = <any>error;
        //         if(this.errorMessage != null){
        //           console.log(this.errorMessage);
        //           alert("Error en la petición");
        //         }
        //       }
        //     );
        // }
    };
    return RetefuenteComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RetefuenteComponent.prototype, "ready", void 0);
RetefuenteComponent = __decorate([
    core_1.Component({
        selector: 'app-retefuente',
        templateUrl: './retefuente.component.html'
    }),
    __metadata("design:paramtypes", [comparendo_service_1.ComparendoService,
        login_service_1.LoginService])
], RetefuenteComponent);
exports.RetefuenteComponent = RetefuenteComponent;
//# sourceMappingURL=retefuente.component.js.map