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
var sustrato_service_1 = require("../../../../services/sustrato.service");
var login_service_1 = require("../../../../services/login.service");
var vehiculo_service_1 = require("../../../../services/vehiculo.service");
var NewRnaBlindajeComponent = (function () {
    function NewRnaBlindajeComponent(_TramiteSolicitudService, _loginService, _SustratoService, _VehiculoService) {
        this._TramiteSolicitudService = _TramiteSolicitudService;
        this._loginService = _loginService;
        this._SustratoService = _SustratoService;
        this._VehiculoService = _VehiculoService;
        this.readyTramite = new core_1.EventEmitter();
        this.cancelarTramite = new core_1.EventEmitter();
        this.vehiculo = null;
        this.factura = null;
        this.entregada = false;
        this.resumen = {};
        this.datos = {
            'tipoBlindaje': null,
            'nivelBlindaje': null,
            'empresaBlindadora': null,
            'numeroRunt': null,
            'sustrato': null,
            'tramiteFormulario': null,
            'facturaId': null,
        };
    }
    NewRnaBlindajeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nivelBlindajeList = ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO'];
        this.tipoBlindajeList = ['Blindaje de un vehículo', 'Desblindaje de un vehículo'];
        this._SustratoService.getSustratoSelect().subscribe(function (response) {
            _this.sustratos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    NewRnaBlindajeComponent.prototype.enviarTramite = function () {
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rna-blindaje';
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
    };
    NewRnaBlindajeComponent.prototype.onCancelar = function () {
        this.cancelarTramite.emit(true);
    };
    return NewRnaBlindajeComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaBlindajeComponent.prototype, "readyTramite", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NewRnaBlindajeComponent.prototype, "cancelarTramite", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaBlindajeComponent.prototype, "vehiculo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NewRnaBlindajeComponent.prototype, "factura", void 0);
NewRnaBlindajeComponent = __decorate([
    core_1.Component({
        selector: 'appRna-blindaje',
        templateUrl: './newRna.Blindaje.html'
    }),
    __metadata("design:paramtypes", [tramiteSolicitud_service_1.TramiteSolicitudService,
        login_service_1.LoginService,
        sustrato_service_1.SustratoService,
        vehiculo_service_1.VehiculoService])
], NewRnaBlindajeComponent);
exports.NewRnaBlindajeComponent = NewRnaBlindajeComponent;
//# sourceMappingURL=newRna.blindaje.component.js.map