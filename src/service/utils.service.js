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
import { ToastController } from 'ionic-angular';
var UtilsService = /** @class */ (function () {
    function UtilsService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    UtilsService.prototype.zerofill = function (n) {
        if (n < 10) {
            return n = '0' + n;
        }
        else {
            return n;
        }
    };
    UtilsService.prototype.datediff = function (startTime, endTime, diffType) {
        var _startTime = startTime.replace(/\-/g, "/");
        var _endTime = endTime.replace(/\-/g, "/");
        var _diffType = diffType.toLowerCase();
        var sTime = new Date(_startTime);
        var eTime = new Date(_endTime);
        var divNum = 1;
        switch (_diffType) {
            case "second":
                divNum = 1000;
                break;
            case "minute":
                divNum = 1000 * 60;
                break;
            case "hour":
                divNum = 1000 * 3600;
                break;
            case "day":
                divNum = 1000 * 3600 * 24;
                break;
            default:
                break;
        }
        return (eTime.getTime() - sTime.getTime()) / divNum;
    };
    UtilsService.prototype.addDate = function (days, type) {
        var d = new Date();
        d.setDate(d.getDate() + days);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var val;
        if (type === 'str') {
            val = d.getFullYear() + "年" + this.zerofill(month) + "月" + this.zerofill(day) + "日";
        }
        else if (type === 'months') {
            val = this.zerofill(month) + "月" + this.zerofill(day) + "日";
        }
        else {
            val = d.getFullYear() + "-" + this.zerofill(month) + "-" + this.zerofill(day);
        }
        return val;
    };
    UtilsService.prototype.getWeek = function (d, isWeek) {
        var date = d.replace(/-/g, '/');
        var day = new Date(date).getDay();
        var fullWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var tinyWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var week;
        switch (isWeek) {
            case 1:
                week = tinyWeek[day];
                break;
            default:
                week = fullWeek[day];
                break;
        }
        return week;
    };
    UtilsService.prototype.getNow = function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var val = d.getFullYear() + '-' + this.zerofill(month) + '-' + this.zerofill(day);
        return val;
    };
    UtilsService.prototype.addDateStr = function (date, days, isYear) {
        var d = new Date(date);
        var val;
        if (days < 0) {
            if (d > new Date()) {
                d.setDate(d.getDate() + days);
            }
        }
        else {
            d.setDate(d.getDate() + days);
        }
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        switch (isYear) {
            case 1:
                val = d.getFullYear() + '年' + month + '月' + day + '日';
                break;
            case 2:
                val = month + '月' + day + '日';
                break;
            default:
                val = d.getFullYear() + '-' + month + '-' + day;
                break;
        }
        return val;
    };
    UtilsService.prototype.getCurrentDate = function (date, isYear) {
        var today = new Date(date);
        var d = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var mon = today.getMonth() + 1;
        var day = today.getDate();
        var val;
        if (isYear == true) {
            val = today.getFullYear() + "年" + this.zerofill(mon) + "月" + this.zerofill(day) + "日　" + d[today.getDay()];
        }
        else {
            val = this.zerofill(mon) + "月" + this.zerofill(day) + "日　" + d[today.getDay()];
        }
        return val;
    };
    UtilsService.prototype.filterPrice = function (prices) {
        var len = prices.length;
        if (len < 2) {
            return prices;
        }
        var pricess = [];
        if (len == 2) {
            var p1 = prices[0];
            var p2 = prices[1];
            var supplierId1 = p1.supplierId;
            var supplierId2 = p2.supplierId;
            var price1 = p1.adultFacePrice;
            var price2 = p2.adultFacePrice;
            if (price1 == price2) {
                if (supplierId1 == supplierId2) {
                    pricess.push(p1);
                }
                else {
                    if (supplierId1 == "TDXD") {
                        pricess.push(p1);
                    }
                    if (supplierId2 == "TDXD") {
                        pricess.push(p2);
                    }
                }
                return pricess;
            }
            else {
                return prices;
            }
        }
        else if (len > 2) {
            var isjh = false;
            var p1 = prices[0];
            var p2 = prices[1];
            var supplierId1 = p1.supplierId;
            var supplierId2 = p2.supplierId;
            var price1 = p1.adultFacePrice;
            var price2 = p2.adultFacePrice;
            if (price1 == price2) {
                if (supplierId1 == supplierId2) {
                    pricess.push(p1);
                }
                else {
                    if (supplierId1 == "TDXD") {
                        pricess.push(p1);
                    }
                    if (supplierId2 == "TDXD") {
                        pricess.push(p2);
                    }
                }
            }
            else {
                if (price1 > price2) {
                    pricess.push(p2);
                    if (supplierId2 == "JHAD") {
                        isjh = true;
                    }
                }
                else {
                    pricess.push(p1);
                    if (supplierId1 == "JHAD") {
                        isjh = true;
                    }
                }
            }
            if (isjh) {
                for (var i = 0; i < prices.length; i++) {
                    var supplierId = prices[i].supplierId;
                    var price = prices[i].adultFacePrice;
                    if (supplierId == "TDXD") {
                        pricess.push(prices[i]);
                        return false;
                    }
                }
            }
            var p3 = prices[len - 2];
            var p4 = prices[len - 1];
            var supplierId3 = p3.supplierId;
            var supplierId4 = p4.supplierId;
            var price3 = p3.adultFacePrice;
            var price4 = p4.adultFacePrice;
            if (price3 == price4) {
                if (supplierId3 == supplierId4) {
                    pricess.push(p3);
                }
                else {
                    if (supplierId3 == "TDXD") {
                        pricess.push(p3);
                    }
                    if (supplierId4 == "TDXD") {
                        pricess.push(p4);
                    }
                }
            }
            else {
                if (price3 > price4) {
                    pricess.push(p3);
                }
                else {
                    pricess.push(p4);
                }
            }
            return pricess;
        }
    };
    UtilsService.prototype.presentToast = function (obj, str) {
        obj = this.toastCtrl.create({
            message: str,
            duration: 1000,
            position: 'middle'
        });
        obj.present();
        setTimeout(function () {
            obj.dismiss();
        }, 1000);
    };
    //数组去重
    UtilsService.prototype.unique = function (arr, key) {
        var tempArr = arr;
        for (var i = 0; i < tempArr.length; i++) {
            for (var j = i + 1; j < tempArr.length; j++) {
                if (tempArr[i][key] == tempArr[j][key]) {
                    arr.splice(j, 1);
                }
            }
        }
        return arr;
    };
    //将一个item合并到数组的头部
    UtilsService.prototype.preArrays = function (arr, item) {
        return [item].concat(arr);
    };
    UtilsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastController])
    ], UtilsService);
    return UtilsService;
}());
export { UtilsService };
//# sourceMappingURL=utils.service.js.map