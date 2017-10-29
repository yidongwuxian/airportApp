import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FieldBase } from '../../components/field/field-base';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
import { LoginService } from '../../service/login.service';
import { FlightdetailPage } from '../../pages/flightdetail/flightdetail';
import { FieldComponent } from '../../components/field/field.component';
import { MsgTipComponent } from '../../components/msgtip/msgtip';
import { MsgIconComponent } from '../../components/msgicon/msgicon';
import { baseUrl,loginUrl } from '../../providers/url';
import { UserCenterPage } from '../../pages/usercenter/usercenter';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[HttpService,UtilsService,LoginService,FieldComponent,MsgTipComponent,MsgIconComponent]
})
export class LoginPage implements OnInit{
  userSwitch: string = 'loginTab';
  msg: any;
  QUERY_URL: string;
  form: FormGroup;
  fields: FieldBase<any>[] = [];
  isLogin: boolean = false;
  username: string;
  password: string;
  flag: boolean = false;
  isPwd: boolean = true;
  pasType: any;
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          private _HttpService: HttpService,
              private rs: LoginService,
              private _UtilsService: UtilsService) {
    this.fields = rs.getFields();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit(){
    this.msg = 2;
    this.pasType = 'password';
    let jumpTo = this.navParams.get('jumpTo'); 
    if(jumpTo == 'regtouc'){
       this.userSwitch = 'segTab';
    }else{
       this.userSwitch = 'loginTab';
    }
  }

  switchPwd(){
    this.isPwd = !this.isPwd;
    if(this.pasType === 'password'){
      this.pasType = 'text'
    }else{
      this.pasType = 'password'
    }
  }

  validate(){
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    let pPattern = /^[A-Za-z0-9]{6,20}$/;
    if(this.username === '' || this.password === ''){
        this._UtilsService.presentToast('userTip','用户名密码不能为空！');
        this.flag = false;
        return false;
    }else{
      if(this.username != '' && uPattern.test(this.username) === false){
        this._UtilsService.presentToast('userTip','用户名长度应为4-16位！');
        this.flag = false;
        return false;
      }
      if(this.password != '' && pPattern.test(this.password) === false){
        this._UtilsService.presentToast('userTip','密码长度应为6-20位！');
        this.flag = false;
        return false;
      } 
      if(uPattern.test(this.username) === true && pPattern.test(this.password) === true){
        this.flag = true;
        this.submitLogin();
      }
    }
      
  }

  login(){
    localStorage.removeItem('token')
    this.validate();
  }

  submitLogin(){
    let param = {
      'username': this.username,
      'password': this.password
    }
    this.QUERY_URL = baseUrl+loginUrl;
    this._HttpService.post(this.QUERY_URL,param,{})
        .subscribe(
          (res) => { 
            if(res.code === 200 && res.msg=== 'success'){
              this.isLogin = true;
              localStorage.setItem('userInfo', JSON.stringify(res));
              const jumpTo = this.navParams.get('jumpTo');
              if(jumpTo == 'flightDetailToLogin'){
                 this.navCtrl.push(FlightdetailPage);
              }
              if(this.userSwitch == 'loginTab'){
                 this.navCtrl.push(UserCenterPage);
              }   
            }else{
              this.isLogin = false;
              localStorage.removeItem('userInfo');
            }
          },
          (err) => {
             console.log('err:'+err) 
          }
        )
  }
}
