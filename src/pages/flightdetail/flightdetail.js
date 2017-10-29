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
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UtilsService } from '../../service/utils.service';
import { HttpService } from '../../service/http.service';
import { CabinPipe } from '../../pipe/cabin.pipe';
import { OrderflightPage } from '../../pages/orderflight/orderflight';
import { RefundrulePage } from '../../pages/refundrule/refundrule';
import { FlightqueryPage } from '../../pages/flightquery/flightquery';
import { LoginPage } from '../../pages/login/login';
import { baseUrl, ordercmUrl } from '../../providers/url';
var FlightdetailPage = /** @class */ (function () {
    function FlightdetailPage(navCtrl, navParams, alertCtrl, _HttpService, loadingCtrl, _UtilsService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this._HttpService = _HttpService;
        this.loadingCtrl = loadingCtrl;
        this._UtilsService = _UtilsService;
        this.istranCity = false;
        this.isstopCity = false;
        this.flightRangeArrayGo = [];
        this.flightRangeArrayBack = [];
        this.isMinus = true;
        this.minusType = '';
    }
    FlightdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FlightdetailPage');
    };
    FlightdetailPage.prototype.ngOnInit = function () {
        sessionStorage.removeItem('flightData');
        this.type = this.navParams.get('type');
        this.flightObjFrom = JSON.parse(sessionStorage.getItem("flightObjFrom"));
        this.flightObjTo = JSON.parse(sessionStorage.getItem("flightObjTo"));
        this.routingType = sessionStorage.getItem('routingType');
        this.internaCount = JSON.parse(localStorage.getItem('internaCount'));
        this.countryType = sessionStorage.getItem('countryType');
        this.flightQueryInfo = sessionStorage.getItem('flightQueryInfo');
        this.flightSegs = this.flightObjFrom.data.segments;
        this.flightPrices = this.flightObjFrom.data.prices;
        this.fromDate = this._UtilsService.getCurrentDate(this.flightSegs[0].fromDate, false);
        this.activity = this.flightObjFrom.data.activity;
        //活动优惠 start
        if (this.activity) {
            if (this.activity.actContent == 0) {
                this.minusType = '票面立减';
            }
            if (this.activity.actContent == 1) {
                this.minusType = '保险立减';
            }
            this.minusAmount = this.activity.actMoney;
            this.isMinus = true;
        }
        //活动优惠 end
        console.log('item:' + JSON.stringify(this.activity));
        if (this.routingType == 'OW') {
            this.flightData = this.flightObjFrom.data;
        }
        if (this.routingType == 'RT') {
            this.flightData = this.flightObjTo.data;
        }
        for (var _i = 0, _a = this.flightSegs; _i < _a.length; _i++) {
            var value = _a[_i];
            this.fromDateStr = value.fromDate.substr(-5, 5);
            this.toDateStr = value.toDate.substr(-5, 5);
            var rangeSegmentCount = this.flightObjFrom.data.rangeSegmentCount;
            var stopOver = value.stopOver;
            var flightCount = void 0;
            if (rangeSegmentCount.length > 3) {
                if (this.routingType == 'OW') {
                    flightCount = rangeSegmentCount.split(',')[0].substr(-1);
                }
                else {
                    flightCount = rangeSegmentCount.split(',')[1].substr(-1);
                }
            }
            else {
                flightCount = rangeSegmentCount.substr(-1);
            }
            if (flightCount > 1) {
                this.tranCity = this.flightSegs[0].toAirport;
                this.istranCity = true;
            }
            else {
                if (stopOver && stopOver.length != 0) {
                    var stopoverCity = '';
                    for (var _b = 0, stopOver_1 = stopOver; _b < stopOver_1.length; _b++) {
                        var stopItem = stopOver_1[_b];
                        stopoverCity += stopItem.stopAirport;
                    }
                    this.stopoverCityName = stopoverCity;
                    this.isstopCity = true;
                }
            }
        }
    };
    FlightdetailPage.prototype.booking = function (price, priceIndex) {
        this.flightPrice = {
            "prices": price
        };
        if (this.routingType == 'OW') {
            var adultPrice = this.flightData.prices.adultFacePrice;
            this.goPrice(adultPrice, priceIndex, this.flightPrice, price, 'from');
        }
        else if (this.routingType == 'RT') {
            var adultPrice = this.flightData.prices.adultFacePrice;
            this.goPrice(adultPrice, priceIndex, this.flightPrice, price, 'to');
        }
        else {
            sessionStorage.setItem("flightPriceFrom", JSON.stringify(this.flightPrice));
            this.jumpUrl();
        }
    };
    FlightdetailPage.prototype.createLoader = function () {
        this.loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: "<img src='../assets/img/loading/loading.gif'>",
            duration: 1000
        });
    };
    FlightdetailPage.prototype.goPrice = function (adultPrice, priceIndex, flightPrice, price, type) {
        var _this = this;
        var params;
        if (this.routingType == 'OW') {
            this.getConfirmJson(this.flightObjFrom, priceIndex, price);
        }
        if (this.routingType == 'RT') {
            this.getConfirmJson(this.flightObjTo, priceIndex, price);
        }
        this.QUERY_URL = baseUrl + ordercmUrl + '?temp=' + Math.random().toString();
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.token = userInfo.token;
        }
        else {
            this.navCtrl.push(LoginPage, { 'jumpTo': 'flightDetailToLogin' });
        }
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'authorization': this.token
        });
        this.createLoader();
        this.loader.present().then(function () {
            _this._HttpService.post(_this.QUERY_URL, _this.flightInfo, _this.headers)
                .subscribe(function (res) {
                _this.loader.dismiss();
                if (res.status == '1001') {
                    _this.resData = res.data;
                    var pssPrice = res.data.adultFacePrice;
                    if (adultPrice != pssPrice) {
                        if (_this.type == 'from') {
                            _this.writeStr = '去';
                        }
                        if (_this.type == 'to') {
                            _this.writeStr = '回';
                        }
                        var priceAlert = _this.alertCtrl.create({
                            title: '提示',
                            message: _this.writeStr + "程舱位价格有变动，最新价格为" + pssPrice + "，<br>是否确认购买？",
                            buttons: [
                                {
                                    text: '确定购买',
                                    handler: function () {
                                        if (_this.type == 'from') {
                                            _this.savePrice(_this.resData, _this.flightPriceFrom);
                                        }
                                        if (_this.type == 'to') {
                                            _this.savePrice(_this.resData, _this.flightPriceTo);
                                        }
                                    }
                                }, {
                                    text: '重新检索',
                                    handler: function () {
                                        if (_this.type == 'from') {
                                            _this.reSavePrice(_this.resData, _this.flightPriceFrom);
                                        }
                                        if (_this.type == 'to') {
                                            _this.reSavePrice(_this.resData, _this.flightPriceTo);
                                        }
                                    }
                                }
                            ]
                        });
                        priceAlert.present();
                    }
                }
                else {
                    var msgAlert = _this.alertCtrl.create({
                        title: '价格过期，请选择其他价格',
                        buttons: ['确定']
                    });
                    msgAlert.present();
                }
            }, function (err) {
                var msgAlert = _this.alertCtrl.create({
                    title: err + '请检查网络连接，稍后重试',
                    buttons: ['确定']
                });
                msgAlert.present();
                console.log('err:' + err);
            });
        });
    };
    FlightdetailPage.prototype.savePrice = function (res, objPrices) {
        var obj = res;
        var PriceObj = {};
        PriceObj = {
            'adultFacePrice': obj.adultFacePrice,
            'childFacePrice': obj.childFacePrice,
            'infantFacePrice': obj.infantFacePrice,
            'adultFuelTax': obj.adultFuelTax,
            'childFuelTax': obj.childFuelTax,
            'infantFuelTax': obj.infantFuelTax,
            'adultAirportTax': obj.adultAirportTax,
            'childAirportTax': obj.childAirportTax,
            'infantAirportTax': obj.infantAirportTax,
            'adultSettlePrice': obj.adultSettlePrice,
            'childSettlePrice': obj.childSettlePrice,
            'infantSettlePrice': obj.infantSettlePrice,
            'adultPolicyId': obj.adultPolicyId
        };
        if (this.type == 'from') {
            var flightPriceFromObj = {
                'prices': PriceObj
            };
            sessionStorage.setItem(objPrices, JSON.stringify(flightPriceFromObj));
        }
        else {
            var flightPriceToObj = {
                'prices': PriceObj
            };
            sessionStorage.setItem(objPrices, JSON.stringify(flightPriceToObj));
        }
        this.jumpUrl();
    };
    FlightdetailPage.prototype.reSavePrice = function (res, objPrices) {
        var obj = res;
        objPrices.prices = {
            'adultSettlePrice': obj.adultSettlePrice,
            'childSettlePrice': obj.childSettlePrice,
            'infantSettlePrice': obj.infantSettlePrice,
            'adultPolicyId': obj.adultPolicyId,
        };
        sessionStorage.setItem("objPrices", JSON.stringify(objPrices));
        this.jumpUrl();
    };
    FlightdetailPage.prototype.getConfirmJson = function (flight, priceIndex, pro) {
        if (this.countryType == 'inland') {
            this.calNumbers = localStorage.getItem('inlandCount');
        }
        if (this.countryType == 'international') {
            this.calNumbers = localStorage.getItem('internaCount');
        }
        var rangeSegmentData = "";
        var rangeSegmentCount = flight.data.rangeSegmentCount;
        var re = /[，,]/g;
        if (re.test(rangeSegmentCount)) {
            rangeSegmentData = rangeSegmentCount.split(',')[0].split('-')[1]; //多段
        }
        else {
            rangeSegmentData = rangeSegmentCount.split('-')[1]; //单段
        }
        var value = flight.data.segments;
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var flightItem = value_1[_i];
            this.flightItem = flightItem;
        }
        this.saveConFirm(flight, this.flightItem, pro);
    };
    FlightdetailPage.prototype.saveConFirm = function (flight, item, pro) {
        var flightNo = item.flightNo;
        this.shareFlightNo = item.shareFlightNo;
        if (item.airlineCompany) {
            this.airlineCompany = item.airlineCompany;
        }
        ;
        var fromAirport = item.fromAirport;
        var toAirport = item.toAirport;
        var fromCity = item.fromAirportCn;
        var toCity = item.toAirportCn;
        var departTime = item.fromDate; //出发日期加时间
        var departureDate = departTime.substr(0, 10); //出发日期
        var departureTime = departTime.substr(-5, 5); //出发时间
        var arriveTime = item.toDate; //到达日期加时间
        var arrivalDate = arriveTime.substr(0, 10); //到达日期
        var arrivalTime = arriveTime.substr(-5, 5); //到达时间
        var freightLimitQueryID = flight.data.prices[0].freightLimitQueryID;
        var freightRuleQueryIDChd = flight.data.prices[0].freightRuleQueryIDChd;
        var flightScheduled = [];
        var fromCityGo = '';
        var departureDateGo = '';
        var toAirportGo = '';
        var fromAirportBack = '';
        var departureDateBack = '';
        var toAirportBack = '';
        this.cabinCode = pro.cabinList[0].cabinCode;
        this.cabinRank = pro.cabinList[0].cabinRank;
        //价格参数
        this.adultFacePrice = pro.adultFacePrice;
        this.childFacePrice = pro.childFacePrice;
        this.infantFacePrice = pro.infantFacePrice;
        this.policyId = pro.policy[0].policyId;
        this.chdPolicyID = pro.policy[0].policyIdChd;
        this.confirmParam = {
            "fromAirport": fromAirport,
            "toAirport": toAirport,
            "flightNo": flightNo,
            "cabin": this.cabinCode,
            "departTime": departTime,
            "arriveTime": arriveTime,
            "shareFlightNo": this.shareFlightNo,
            "cabinRank": this.cabinRank
        };
        if (this.flightItem.correspondRange == '1') {
            this.flightRangeArrayGo.push(this.confirmParam);
        }
        if (this.flightItem.correspondRange == '2') {
            this.adultTFC = pro.adultTFC;
            this.flightRangeArrayBack.push(this.confirmParam);
        }
        for (var _i = 0, _a = this.flightRangeArrayGo; _i < _a.length; _i++) {
            var arrayGo = _a[_i];
            fromCityGo = this.flightRangeArrayGo[0].fromAirport;
            toAirportGo = this.flightRangeArrayGo[0].toAirport;
            departureDateGo = this.flightRangeArrayGo[0].departTime.substr(0, 10);
        }
        for (var _b = 0, _c = this.flightRangeArrayBack; _b < _c.length; _b++) {
            var arrayBack = _c[_b];
            fromAirportBack = this.flightRangeArrayBack[0].fromAirport;
            toAirportBack = this.flightRangeArrayBack[0].toAirport;
            departureDateBack = this.flightRangeArrayBack[0].departTime.substr(0, 10);
        }
        if (this.routingType == 'RT') {
            this.flightInfo = {
                "flightRangeType": this.routingType,
                "cabinRank": this.cabinRank,
                "passengerNature": "",
                "airlineCompany": this.airlineCompany,
                "policyID": this.policyId,
                "chdPolicyID": this.chdPolicyID,
                "adultFacePrice": this.adultFacePrice,
                "childFacePrice": this.childFacePrice,
                "infantFacePrice": "0.0",
                "adultTFC": this.adultTFC,
                "freightLimitQueryID": freightLimitQueryID,
                "freightLimitQueryIDChd": freightRuleQueryIDChd,
                "flightRange": [
                    {
                        "flightScheduled": this.flightRangeArrayGo,
                        "fromCity": fromCityGo,
                        "fromDate": departureDateGo,
                        "toCity": toAirportGo
                    },
                    {
                        "flightScheduled": this.flightRangeArrayBack,
                        "fromCity": fromAirportBack,
                        "fromDate": departureDateBack,
                        "toCity": toAirportBack
                    }
                ]
            };
        }
        else {
            this.flightInfo = {
                "flightRangeType": this.routingType,
                "cabinRank": this.cabinRank,
                "passengerNature": "",
                "airlineCompany": "",
                "policyID": this.policyId,
                "chdPolicyID": this.chdPolicyID,
                "adultFacePrice": this.adultFacePrice,
                "childFacePrice": this.childFacePrice,
                "infantFacePrice": "0.0",
                "freightLimitQueryID": freightLimitQueryID,
                "freightLimitQueryIDChd": freightRuleQueryIDChd,
                "flightRange": [
                    {
                        "flightScheduled": this.flightRangeArrayGo,
                        "fromCity": fromCityGo,
                        "fromDate": departureDateGo,
                        "toCity": toAirportGo
                    }
                ]
            };
        }
    };
    FlightdetailPage.prototype.jumpUrl = function () {
        if (this.routingType == 'RT') {
            if (this.type == 'from') {
                this.navCtrl.push(FlightqueryPage, { 'jumpTo': 'flightdatilToQuery' });
            }
            else {
                this.navCtrl.push(OrderflightPage, {
                    'urlType': 'RT'
                });
            }
        }
        else if (this.routingType == 'OW') {
            this.navCtrl.push(OrderflightPage, {
                'urlType': 'OW'
            });
        }
    };
    FlightdetailPage.prototype.endorse = function (price) {
        var endorseSeg = this.flightData.segments[0];
        var airCompany = endorseSeg.flightNo.substr(0, 2);
        var fromAirport = endorseSeg.fromAirport;
        var toAirport = endorseSeg.toAirport;
        var fromDate = endorseSeg.fromDate.substr(0, 10);
        var cabinInfo = price.cabinList[0].cabinCode;
        var endorseParam = {
            'airCompany': airCompany,
            'fromAirport': fromAirport,
            'toAirport': toAirport,
            'cabinInfo': cabinInfo,
            'fromDate': fromDate,
            'lastUpateTime': null,
            'pageNo': 1,
            'countPerPage': 10
        };
        sessionStorage.setItem('refundPolicyParam', JSON.stringify(endorseParam));
        this.navCtrl.push(RefundrulePage);
    };
    FlightdetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-flightdetail',
            templateUrl: 'flightdetail.html',
            providers: [UtilsService, HttpService, CabinPipe]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            HttpService,
            LoadingController,
            UtilsService])
    ], FlightdetailPage);
    return FlightdetailPage;
}());
export { FlightdetailPage };
//# sourceMappingURL=flightdetail.js.map