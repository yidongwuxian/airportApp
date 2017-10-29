import { Component, OnInit } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { LoginPage } from '../../pages/login/login';

@Component({
	  selector: 'page-usercenter',
	  templateUrl: 'usercenter.html',
    providers:[HttpService]
	})

export class UserCenterPage implements OnInit {
  isMsg: number = 2;
  userSwitch: string = 'loginTab';  
  isSign: boolean = true;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {}

  ngOnInit(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(userInfo){
       this.isSign = false;
    }else{
       this.isSign = true;
    }

  }

  goLogin(){
     this.navCtrl.push(LoginPage,{'jumpTo':'logintouc'});
  }

  goReg(){
    this.navCtrl.push(LoginPage,{'jumpTo':'regtouc'});
  }

}
