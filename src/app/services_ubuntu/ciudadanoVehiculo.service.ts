import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class CiudadanoVehiculoService {
	public url = "http://190.146.7.242/colossus-sit/web/app.php/propietariovehiculo";
	public identity;
	public token;

	constructor(private _http: Http){}

	getCiudadanoVehiculo(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(token,datosT,tipoTraspaso){
		
		let json = JSON.stringify(datosT);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new/"+tipoTraspaso, params, {headers: headers})
							  .map(res => res.json());
 
	}

	registerPropietario(ciudadanoVehiculo,token){
		
		let json = JSON.stringify(ciudadanoVehiculo);
		let params = "json="+json+"&authorization="+token;
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new/propietario/vehiculo", params, {headers: headers})
							  .map(res => res.json());

	}

	deleteCiudadanoVehiculo(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());

	}

	showCiudadanoVehiculo(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}


	editCiudadanoVehiculo(ciudadanoVehiculo,token){

		let json = JSON.stringify(ciudadanoVehiculo);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	showCiudadanoVehiculoId(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/ciudadano/vehiculo/"+id, params, {headers: headers})
							  .map(res => res.json());

	}
	
}