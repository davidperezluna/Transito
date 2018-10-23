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
var http_1 = require("@angular/http");
var logger_service_1 = require("../logger/services/logger.service");
var environment_1 = require("environments/environment");
require("rxjs/add/operator/map");
var VhloCfgTipoMaquinariaService = (function () {
    function VhloCfgTipoMaquinariaService(_http, _loogerService) {
        this._http = _http;
        this._loogerService = _loogerService;
        this.url = environment_1.environment.apiUrl + 'vehiculo/vhlocfgtipomaquinaria';
    }
    VhloCfgTipoMaquinariaService.prototype.index = function () {
        return this._http.get(this.url + "/").map(function (res) { return res.json(); });
    };
    VhloCfgTipoMaquinariaService.prototype.register = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/new", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'INSERT', json, this.url));
    };
    VhloCfgTipoMaquinariaService.prototype.delete = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/delete", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'DELETE', json, this.url));
    };
    VhloCfgTipoMaquinariaService.prototype.show = function (token, id) {
        var params = "authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/" + id + "/show", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    VhloCfgTipoMaquinariaService.prototype.edit = function (datos, token) {
        var json = JSON.stringify(datos);
        var params = "data=" + json + "&authorization=" + token;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + "/edit", params, { headers: headers }).map(function (res) { return res.json(); }, this._loogerService.registerLog(token, 'UPDATE', json, this.url));
    };
    VhloCfgTipoMaquinariaService.prototype.select = function () {
        return this._http.get(this.url + "/select").map(function (res) { return res.json(); });
    };
    return VhloCfgTipoMaquinariaService;
}());
VhloCfgTipoMaquinariaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        logger_service_1.LoggerService])
], VhloCfgTipoMaquinariaService);
exports.VhloCfgTipoMaquinariaService = VhloCfgTipoMaquinariaService;
//# sourceMappingURL=vhloCfgTipoMaquinaria.service.js.map