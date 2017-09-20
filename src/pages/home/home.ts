import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';

@Component({
	  selector: 'page-home',
	  templateUrl: 'home.html',
    providers:[HttpService]
	})

export class HomePage implements OnInit {
  
  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {}
  doAlert(){
  	let alert = this.alertCtrl.create({
  		title:'标题',
  		message: '你真棒',
  		buttons:['Ok']
  	})
  	alert.present();
  }

  ngOnInit(){
    // const QUERY_URL = 'http://192.168.1.252:3000/shopping/query';
    // const OrderConfirm_URL = 'http://192.168.1.252:3000/shopping/orderConfirm';
    // this._HttpService.get(QUERY_URL)
    // .then(res => {
    //   console.log(res);
    // });

    // this._HttpService.post(OrderConfirm_URL,{})
    // .then(res => {
    //   console.log(res);
    // });
  }


  
}
