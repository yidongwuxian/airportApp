import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';   
import { HttpService } from './http.service';
import 'rxjs/add/operator/toPromise';
@Injectable()  

export class AirportService{
  constructor(private _HttpService: HttpService){}
    getAirData(): Promise<any[]> {  
        let countryEn = '';
        let AIRPORT_URL = '../assets/data/airport.json';
	    return this._HttpService.get(AIRPORT_URL)
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

	
 