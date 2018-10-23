"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var facturaInfraccion_component_1 = require("./facturaInfraccion.component");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var facturaInfraccion_service_1 = require("../../services/facturaInfraccion.service");
var mflTipoRecaudo_service_1 = require("../../services/mflTipoRecaudo.service");
var angular2_select_1 = require("angular2-select");
var FacturaInfraccionModule = (function () {
    function FacturaInfraccionModule() {
    }
    return FacturaInfraccionModule;
}());
FacturaInfraccionModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, ng2_bootstrap_1.Ng2BootstrapModule.forRoot(), angular2_select_1.SelectModule],
        declarations: [facturaInfraccion_component_1.FacturaInfraccionComponent],
        exports: [facturaInfraccion_component_1.FacturaInfraccionComponent],
        providers: [facturaInfraccion_service_1.FacturaInfraccionService, mflTipoRecaudo_service_1.MflTipoRecaudoService]
    })
], FacturaInfraccionModule);
exports.FacturaInfraccionModule = FacturaInfraccionModule;
//# sourceMappingURL=facturaInfraccion.module.js.map