import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class SustratoService {
	private url = environment.apiUrl + "sustrato";
	public identity;
	public token;

	constructor(private _http: Http) { }

	getSustrato() {
		return this._http.get(this.url + '/').map(res => res.json());
	}

	register(tramiteSolicitud, token) {
		let json = JSON.stringify(tramiteSolicitud);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/new', params, { headers: headers }).map(res => res.json());
	}

	deleteSustrato(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/' + id + '/delete', params, { headers: headers }).map(res => res.json());
	}

	showSustrato(token, id) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/' + id, params, { headers: headers }).map(res => res.json());
	}

	showNombreSustrato(token, consecutivo) {
		let params = 'authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/show/consecutivo/' + consecutivo, params, { headers: headers }).map(res => res.json());
	}

	editSustrato(tramiteSolicitud, token) {
		let json = JSON.stringify(tramiteSolicitud);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/edit', params, { headers: headers }).map(res => res.json());
	}

	editEstado(datos, token) {
		let json = JSON.stringify(datos);
		let params = 'json=' + json + '&authorization=' + token;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + '/edit/estado', params, { headers: headers }).map(res => res.json());
	}

	getSustratoSelect() {
		return this._http.get(this.url + '/select').map(res => res.json());
	}
}