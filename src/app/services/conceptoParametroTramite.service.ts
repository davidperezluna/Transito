import  {Injectable} from "@angular/core";
import  {Http, Response,Headers} from "@angular/http";
import  "rxjs/add/operator/map";
import  {Observable} from "rxjs/Observable";

@Injectable()
export class ConceptoParametroTramiteService {
	public url = "http://localhost/GitHub/colossus-sit/web/app_dev.php/conceptoparametrotramite";
	public identity;
	public token;

	constructor(private _http: Http){}

	getConceptoParametroTramite(){
		
		return this._http.get(this.url+"/").map(res => res.json());
	}

	register(ConceptoParametroTramiteService,token){
		
		let json = JSON.stringify(ConceptoParametroTramiteService);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/new", params, {headers: headers})
							  .map(res => res.json());
	}

	

	deleteConceptoParametro(token,id){

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/"+id+"/delete", params, {headers: headers})
							  .map(res => res.json());
	}

	showConceptoParametro(token,id){
		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+"/show/"+id, params, {headers: headers})
							  .map(res => res.json());

	}

	editConceptoParametro(ConceptoParametroTramiteService,token){

		let json = JSON.stringify(ConceptoParametroTramiteService);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
 			return this._http.post(this.url+"/edit", params, {headers: headers})
							  .map(res => res.json());

	}

	getConceptoParametroSelect(){
		return this._http.get(this.url+"/select/concepto").map(res => res.json());
	} 
	
}