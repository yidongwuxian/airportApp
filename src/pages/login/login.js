var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
import { LoginService } from '../../service/login.service';
import { FlightdetailPage } from '../../pages/flightdetail/flightdetail';
import { FieldComponent } from '../../components/field/field.component';
import { MsgTipComponent } from '../../components/msgtip/msgtip';
import { MsgIconComponent } from '../../components/msgicon/msgicon';
import { baseUrl, loginUrl } from '../../providers/url';
import { UserCenterPage } from '../../pages/usercenter/usercenter';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, _HttpService, rs, _UtilsService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._HttpService = _HttpService;
        this.rs = rs;
        this._UtilsService = _UtilsService;
        this.userSwitch = 'loginTab';
        this.fields = [];
        this.isLogin = false;
        this.flag = false;
        this.isPwd = true;
        this.fields = rs.getFields();
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.ngOnInit = function () {
        this.msg = 2;
        this.pasType = 'password';
        var jumpTo = this.navParams.get('jumpTo');
        if (jumpTo == 'regtouc') {
            this.userSwitch = 'segTab';
        }
        else {
            this.userSwitch = 'loginTab';
        }
    };
    LoginPage.prototype.switchPwd = function () {
        this.isPwd = !this.isPwd;
        if (this.pasType === 'password') {
            this.pasType = 'text';
        }
        else {
            this.pasType = 'password';
        }
    };
    LoginPage.prototype.validate = function () {
        var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        var pPattern = /^[A-Za-z0-9]{6,20}$/;
        if (this.username === '' || this.password === '') {
            this._UtilsService.presentToast('userTip', '用户名密码不能为空！');
            this.flag = false;
            return false;
        }
        else {
            if (this.username != '' && uPattern.test(this.username) === false) {
                this._UtilsService.presentToast('userTip', '用户名长度应为4-16位！');
                this.flag = false;
                return false;
            }
            if (this.password != '' && pPattern.test(this.password) === false) {
                this._UtilsService.presentToast('userTip', '密码长度应为6-20位！');
                this.flag = false;
                return false;
            }
            if (uPattern.test(this.username) === true && pPattern.test(this.password) === true) {
                this.flag = true;
                this.submitLogin();
            }
        }
    };
    LoginPage.prototype.login = function () {
        localStorage.removeItem('token');
        this.validate();
    };
    LoginPage.prototype.submitLogin = function () {
        var _this = this;
        var param = {
            'username': this.username,
            'password': this.password
        };
        this.QUERY_URL = baseUrl + loginUrl;
        this._HttpService.post(this.QUERY_URL, param, {})
            .subscribe(function (res) {
            if (res.code === 200 && res.msg === 'success') {
                _this.isLogin = true;
                localStorage.setItem('userInfo', JSON.stringify(res));
                var jumpTo = _this.navParams.get('jumpTo');
                if (jumpTo == 'flightDetailToLogin') {
                    _this.navCtrl.push(FlightdetailPage);
                }
                if (_this.userSwitch == 'loginTab') {
                    _this.navCtrl.push(UserCenterPage);
                }
            }
            else {
                _this.isLogin = false;
                localStorage.removeItem('userInfo');
            }
        }, function (err) {
            console.log('err:' + err);
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
            providers: [HttpService, UtilsService, LoginService, FieldComponent, MsgTipComponent, MsgIconComponent]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            HttpService,
            LoginService,
            UtilsService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map