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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { LoginPage } from '../../pages/login/login';
var UserCenterPage = /** @class */ (function () {
    function UserCenterPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.isMsg = 2;
        this.userSwitch = 'loginTab';
        this.isSign = true;
    }
    UserCenterPage.prototype.ngOnInit = function () {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.isSign = false;
        }
        else {
            this.isSign = true;
        }
    };
    UserCenterPage.prototype.goLogin = function () {
        this.navCtrl.push(LoginPage, { 'jumpTo': 'logintouc' });
    };
    UserCenterPage.prototype.goReg = function () {
        this.navCtrl.push(LoginPage, { 'jumpTo': 'regtouc' });
    };
    UserCenterPage = __decorate([
        Component({
            selector: 'page-usercenter',
            templateUrl: 'usercenter.html',
            providers: [HttpService]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController])
    ], UserCenterPage);
    return UserCenterPage;
}());
export { UserCenterPage };
//# sourceMappingURL=usercenter.js.map