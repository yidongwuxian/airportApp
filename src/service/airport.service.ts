import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';   
import { HttpService } from './http.service';
import 'rxjs/add/operator/toPromise';
@Injectable()  

export class AirportService{
  constructor(private _HttpService: HttpService){}
    getAirData(url): Promise<any[]> {  
        let countryEn = '';
	    return this._HttpService.get(url)
	       .toPromise()
	       .then(this.extractData)
           .catch(this.handleError)
    }

    private extractData(res: Response){
    	return res || {};
    }

    private handleError(error: any){
    	let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    	console.error(errMsg);
    }
}

	
 