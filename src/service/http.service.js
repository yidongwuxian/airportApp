var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
var HttpService = /** @class */ (function () {
    function HttpService(http, loadingCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
    }
    //获取(get)数据  
    HttpService.prototype.get = function (url) {
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //新增(POST)数据
    HttpService.prototype.post = function (url, params, options) {
        return this.http.post(url, JSON.stringify(params), this.getOptions(options))
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HttpService.prototype.getOptions = function (options) {
        if (!options) {
            options = new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            });
            return options;
        }
        else {
            options = new RequestOptions({
                headers: options
            });
            return options;
        }
    };
    HttpService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message : error.status ? error.status + " -" + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    HttpService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            LoadingController])
    ], HttpService);
    return HttpService;
}());
export { HttpService };
//# sourceMappingURL=http.service.js.map