import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { LoggerService } from "../logger/services/logger.service";
import { environment } from 'environments/environment';
import "rxjs/add/operator/map";

@Injectable()
export class ImoCfgTipoService {
	private url = environment.apiUrl + "insumo/imocfgtipo";
	public identity;
	public token;

	constructor(
		private _http: Http,
		private _loogerService: LoggerService
	) { }

	index(){
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/new", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'INSERT', json, this.url)
		);
	}

	delete(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/delete", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'DELETE', json, this.url)
		);
	}

	show(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/show", params, { headers: headers }).map(res => res.json());
	}

	edit(datos, token) {
		let json = JSON.stringify(datos);
		let params = "data=" + json + "&authorization=" + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/edit", params, { headers: headers }).map(
			res => res.json(),
			this._loogerService.registerLog(token, 'UPDATE', json, this.url)
		);
	}

	select() {
		return this._http.get(this.url + "/select").map(res => res.json());
	}

	getCasoInsumoInsumoSelect() {
		return this._http.get(this.url + "/select/insumo").map(res => res.json());
	}

	getCasoInsumoSustratoSelect() {
		return this._http.get(this.url + "/select/sustrato").map(res => res.json());
	}
} 