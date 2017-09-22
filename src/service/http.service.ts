import { Injectable } from '@angular/core';   
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()  

export class HttpService{  
  private headers = new Headers({'Content-type': 'application/x-www-form-urlencoded'});   
  constructor(private http:Http,
  	          public loadingCtrl:LoadingController){}
  
    //获取(get)数据  
    get(url): Observable<any> { 
	    return this.http.get(url)  
	         .map(response => response.json())
	         .catch(this.handleError);
	    }     
    //新增(POST)数据
    post(url,params): Observable<any> {   
        return this.http.post(url, JSON.stringify(params), {headers: this.headers})   
            .map(response => response.json())
            .catch(this.handleError);     
    }
    //更新(update)数据
    update(url,params): Observable<any>{   
	    return this.http.put(url, JSON.stringify(params), {headers: this.headers})   
	         .map(response => response.json())
	         .catch(this.handleError);
	}

	private handleError(error: any) {   
	  	let errMsg = (error.message) ? error.message : error.status ? `${error.status} -${error.statusText}`:'Server error';
	  	console.error(errMsg);   
	  	return Observable.throw(errMsg);  
	}
}

	
 