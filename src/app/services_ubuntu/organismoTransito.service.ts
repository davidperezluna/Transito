import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class OrganismoTransitoService {
	public url = "http://190.146.7.242/colossus-sit/web/app.php/organismotransito";
	public identity;
	public token;

	constructor(private _http: Http){}

	getOrganismoTransito(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(organismoTransito,token){
		
		let json = JSON.stringify(organismoTransito);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	deleteOrganismoTransito(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showOrganismoTransito(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editOrganismoTransito(organismoTransito,token){

		let json = JSON.stringify(organismoTransito);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getOrganismoTransitoSelect(){
		
		return this._http.get(this.url+"/select").map(res => res.json());
	}
	
}