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
var mparqGruaCiudadano_service_1 = require("../../../services/mparqGruaCiudadano.service");
var ciudadano_service_1 = require("../../../services/ciudadano.service");
var mparqGruaCiudadano_modelo_1 = require("../mparqGruaCiudadano.modelo");
var login_service_1 = require("../../../services/login.service");
var sweetalert2_1 = require("sweetalert2");
var ShowComponent = (function () {
    function ShowComponent(_GruaCiudadanoService, _CiudadanoService, _loginService) {
        this._GruaCiudadanoService = _GruaCiudadanoService;
        this._CiudadanoService = _CiudadanoService;
        this._loginService = _loginService;
        this.ready = new core_1.EventEmitter();
        this.grua = null;
    }
    ShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gruaCiudadano = new mparqGruaCiudadano_modelo_1.MparqGruaCiudadano(null, null, null, null, null, null);
        this._CiudadanoService.getCiudadanoSelect().subscribe(function (response) {
            _this.ciudadanos = response;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
        this._GruaCiudadanoService.index(this.grua.id).subscribe(function (response) {
            _this.gruaCiudadanos = response.data;
            var timeoutId = setTimeout(function () {
                _this.iniciarTabla();
            }, 100);
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    ShowComponent.prototype.iniciarTabla = function () {
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
    ShowComponent.prototype.onCancelar = function () {
        this.ready.emit(true);
    };
    ShowComponent.prototype.onEnviar = function () {
        var _this = this;
        var token = this._loginService.getToken();
        this.gruaCiudadano.gruaId = this.grua.id;
        this.gruaCiudadano.ciudadanoId = this.ciudadanoSelected;
        this._GruaCiudadanoService.register(this.gruaCiudadano, token).subscribe(function (response) {
            _this.respuesta = response;
            console.log(_this.respuesta);
            if (_this.respuesta.status == 'success') {
                _this.ready.emit(true);
                sweetalert2_1.default({
                    title: 'Perfecto!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
            else {
                sweetalert2_1.default({
                    title: 'Error!',
                    text: 'El grua ' + +' ya se encuentra registrado',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            (function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    return ShowComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "ready", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ShowComponent.prototype, "grua", void 0);
ShowComponent = __decorate([
    core_1.Component({
        selector: 'app-show',
        templateUrl: './show.component.html'
    }),
    __metadata("design:paramtypes", [mparqGruaCiudadano_service_1.MparqGruaCiudadanoService,
        ciudadano_service_1.CiudadanoService,
        login_service_1.LoginService])
], ShowComponent);
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=show.component.js.map