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
var tramiteSolicitud_service_1 = require("../../../../services/tramiteSolicitud.service");
var tramiteFactura_service_1 = require("../../../../services/tramiteFactura.service");
var login_service_1 = require("../../../../services/login.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var municipio_service_1 = require("../../../../services/municipio.service");
var tipoIdentificacion_service_1 = require("../../../../services/tipoIdentificacion.service");
var NewRnaRadicadoCuentaComponent = (function () {
    function NewRnaRadicadoCuentaComponent(_TramiteSolicitudService, _loginService, _tramiteFacturaService, _VehiculoService, _MunicipioService, _tipoIdentificacionService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._tramiteFacturaService = _tramiteFacturaService;
        this._VehiculoService = _VehiculoService;
        this._MunicipioService = _MunicipioService;
        this._tipoIdentificacionService = _tipoIdentificacionService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.resumen = {};
        this.datos = {
            'municipioSelected': null,
            'tipoIdentificacionSelected': null,
            'numeroDocumento': null,
            'fechaIngreso': null,
            'guiaLlegada': null,
            'empresaEnvio': null,
            'rut': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnaRadicadoCuentaComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this._MunicipioService.getMunicipioSelect().subscribe(function (response) {
            _this.municipios = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
        this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(function (response) {
            _this.tiposIdentificacion = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnaRadicadoCuentaComponent.prototype.enviarTramite = function () {
        var token = this._loginService.getToken();
        this.datos.municipioSelected = this.municipioSelected;
        this.datos.tipoIdentificacionSelected = this.tipoIdentificacionSelected;
        this.datos.numeroDocumento = this.numeroDocumento;
        this.datos.fechaIngreso = this.fechaIngreso;
        this.datos.guiaLlegada = this.guiaLlegada;
        this.datos.empresaEnvio = this.empresaEnvio;
        this.datos.rut = this.rut;
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rna-radicadocuenta';
        console.log(this.datos);
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnaRadicadoCuentaComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnaRadicadoCuentaComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaRadicadoCuentaComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaRadicadoCuentaComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaRadicadoCuentaComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaRadicadoCuentaComponent.prototype, "factura", void 0);
NewRnaRadicadoCuentaComponent = __decorate([
    core_1.Component({
        selector: 'appRna-radicado-cuenta',
        templateUrl: './newRna.radicadoCuenta.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        tramiteFactura_service_1.TramiteFacturaService,
        vehiculo_service_1.VehiculoService,
        municipio_service_1.MunicipioService,
        tipoIdentificacion_service_1.TipoIdentificacionService])
], NewRnaRadicadoCuentaComponent);
exports.NewRnaRadicadoCuentaComponent = NewRnaRadicadoCuentaComponent;
//# sourceMappingURL=newRna.radicadoCuenta.component.js.map