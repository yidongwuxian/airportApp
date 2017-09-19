import { Injectable } from '@angular/core';   
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()  

export class HttpService{    
  constructor(private http:Http){}
  private headers = new Headers({'Content-type': 'application/x-www-form-urlencoded'}); 
    //获取(get)数据  
    get(url){   
	    return this.http.get(url)   
	         .toPromise()   
	         .then(response => response.json() )   
	         .catch(this.handleError); 
	    }     
    //新增(POST)数据
    create(url,params){   
        return this.http.post(url, JSON.stringify(params), {headers: this.headers})   
            .toPromise()   
            .then(response => response.json())   
            .catch(this.handleError);      
    }
    //更新(update)数据
    update(url,params){   
	    return this.http.put(url, JSON.stringify(params), {headers: this.headers})   
	         .toPromise()   
	         .then(response => response.json())   
	         .catch(this.handleError);  
	}
	//删除(DELETE)数据
	delete(url) {   
	    return this.http.delete(url, {headers: this.headers})   
	        .toPromise()   
	        .then(() => null)   
	        .catch(this.handleError);  
	}

	private handleError(error: any): Promise<any> {   
	  	console.error('An error occurred', error);   
	  	return Promise.reject(error.message || error);  
	}
}

	
 