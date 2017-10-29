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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { baseUrl, refundPolicy } from '../../providers/url';
var RefundrulePage = /** @class */ (function () {
    function RefundrulePage(navCtrl, navParams, loadingCtrl, _HttpService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this._HttpService = _HttpService;
    }
    RefundrulePage.prototype.ngOnInit = function () {
        var refundPolicyParam = JSON.parse(sessionStorage.getItem('refundPolicyParam'));
        this.QUERY_URL = baseUrl + refundPolicy + '?temp=' + Math.random().toString();
        this._HttpService.post(this.QUERY_URL, refundPolicyParam)
            .subscribe(function (res) {
            console.log('res:' + res);
        }, function (err) {
            console.log('err:' + err);
        });
    };
    RefundrulePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-refundrule',
            templateUrl: 'refundrule.html',
            providers: [HttpService]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            HttpService])
    ], RefundrulePage);
    return RefundrulePage;
}());
export { RefundrulePage };
//# sourceMappingURL=refundrule.js.map