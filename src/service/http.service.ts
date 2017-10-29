import { Injectable } from '@angular/core';   
import { Http, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()  

export class HttpService{    
  constructor(private http:Http,
  	          public loadingCtrl:LoadingController){}
  	          	   
    //获取(get)数据  
    get(url): Observable<any> { 
	    return this.http.get(url)  
	         .map(response => response.json())
	         .catch(this.handleError);
	    }     
    //新增(POST)数据
    post(url,params,options?: RequestOptionsArgs): Observable<any> {   
        return this.http.post(url, JSON.stringify(params), this.getOptions(options))   
            .map(response => response.json())
            .catch(this.handleError);     
    }

    private getOptions(options): RequestOptionsArgs {
      if (!options) {
        options = new RequestOptions({
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          })
        });
        return options;
      }else{
        options = new RequestOptions({
          headers: options
         })
        return options; 
      }
    }

	private handleError(error: any) {   
	  	let errMsg = (error.message) ? error.message : error.status ? `${error.status} -${error.statusText}`:'Server error';
	  	console.error(errMsg);   
	  	return Observable.throw(errMsg);  
	}
}

	
 