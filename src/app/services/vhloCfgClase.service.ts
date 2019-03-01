import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import { environment } from 'environments/environment';

@Injectable()
export class VhloCfgClaseService {
	private url = environment.apiUrl + "vehiculo/vhlocfgclase";
	public identity;
	public token;

	constructor(private _http: Http){}

	getClase(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(clase,token){
		
		let json = JSON.stringify(clase);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteClase(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showClase(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editClase(clase,token){

		let json = JSON.stringify(clase);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getClaseSelect(){
		return this._http.get(this.url+"/select").map(res => res.json());
	}

	getClasePorModuloSelect(id){
		return this._http.get(this.url+"/"+id+"/select/clases/por/modulo").map(res => res.json());
	}

	getClaseParaMaquinariaSelect(){
		
		return this._http.get(this.url+"/maquinaria/select").map(res => res.json());
	}


	
}