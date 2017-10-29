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
import { NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
    }
    HomePage.prototype.doAlert = function () {
        var alert = this.alertCtrl.create({
            title: '标题',
            message: '你真棒',
            buttons: ['Ok']
        });
        alert.present();
    };
    HomePage.prototype.ngOnInit = function () {
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
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [HttpService]
        }),
        __metadata("design:paramtypes", [NavController, AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map