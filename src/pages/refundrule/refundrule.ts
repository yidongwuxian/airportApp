import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { baseUrl,refundPolicy } from '../../providers/url';
@IonicPage()
@Component({
  selector: 'page-refundrule',
  templateUrl: 'refundrule.html',
  providers:[HttpService]
})
export class RefundrulePage implements OnInit {
  QUERY_URL: string;
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public loadingCtrl: LoadingController,
  	          private _HttpService: HttpService) {
  }
  ngOnInit(){
    let refundPolicyParam = JSON.parse(sessionStorage.getItem('refundPolicyParam'));
    this.QUERY_URL = baseUrl+refundPolicy+'?temp='+Math.random().toString();
  	this._HttpService.post(this.QUERY_URL,refundPolicyParam)
      .subscribe(
        (res) => { 
        	console.log('res:'+res);
        },
        (err) => {
           console.log('err:'+err) 
        }
      )  
  }
}
