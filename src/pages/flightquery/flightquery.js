var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
import { FlightTabComponent } from '../../components/flighttab/flighttab';
import { FlightdetailPage } from '../../pages/flightdetail/flightdetail';
import { baseUrl, shoppingUrl } from '../../providers/url';
var FlightqueryPage = /** @class */ (function () {
    function FlightqueryPage(navCtrl, navParams, alertCtrl, _HttpService, loadingCtrl, _UtilsService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this._HttpService = _HttpService;
        this.loadingCtrl = loadingCtrl;
        this._UtilsService = _UtilsService;
        this.isMsg = 2;
        this.flightData = [];
        this.loadingSpnner = true;
        this.istranCity = false;
        this.isstopCity = false;
        this.isShareIco = false;
        this.timeFlag = 0;
        this.priceFlag = 1;
        this.sortType = "price_asc";
        this.isShowPrices = true;
        this.isShowSinglePrices = false;
        this.isNoTrans = false;
        this.isTrans = true;
        this.isFilter = false;
        this.isModal = false;
        this.isSupplierId = false;
        this.isMinus = false;
        this.minusType = '';
    }
    FlightqueryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FlightqueryPage');
        this.createLoader();
    };
    FlightqueryPage.prototype.ngOnInit = function () {
        this.jumpTo = this.navParams.get('jumpTo');
        this.countryType = sessionStorage.getItem('countryType');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
        this.dateTx.nativeElement.innerText = '时间';
        this.priceTx.nativeElement.innerText = '从低到高';
        var deptStartDate = this.navParams.get('deptStartDate');
        this.deptStartDateStr = deptStartDate;
        this.routingType = this.navParams.get('routingType');
        this.deptCity = this.navParams.get('deptCity');
        this.arrCity = this.navParams.get('arrCity');
        this.deptEndDate = this.navParams.get('deptEndDate');
        this.seatClass = this.navParams.get('seatClass');
        this.adtCnt = this.navParams.get('adtCnt');
        this.chdCnt = this.navParams.get('chdCnt');
        this.infCnt = 0;
        if (this.countryType == 'international') {
            this.isShowPrices = false;
            this.isShowSinglePrices = true;
        }
        else {
            this.isShowPrices = true;
            this.isShowSinglePrices = false;
        }
        this.query(this.deptStartDateStr, this.sortType, this.routingType);
        var flightQueryInfo = {
            'routingType': this.routingType,
            'deptCity': this.deptCity,
            'arrCity': this.arrCity,
            'deptStartDate': this.deptStartDateStr,
            'deptEndDate': this.deptEndDate,
            'seatClass': this.seatClass,
            'adtCnt': this.adtCnt,
            'chdCnt': this.chdCnt,
            'infCnt': this.infCnt
        };
        sessionStorage.setItem("flightQueryInfo", JSON.stringify(flightQueryInfo));
    };
    FlightqueryPage.prototype.createLoader = function () {
        this.loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: "<img src='../assets/img/loading/loading.gif'>",
            duration: 1000
        });
    };
    FlightqueryPage.prototype.query = function (deptStartDate, sortType, routingType) {
        var _this = this;
        this.flightDate = this._UtilsService.addDateStr(deptStartDate, -1, 2);
        this.flightWeek = this._UtilsService.getWeek(deptStartDate, 1);
        if (routingType == 'OW') {
            this.QUERY_URL = baseUrl + shoppingUrl + '?routingType=' + this.routingType + '&deptCity=' + this.deptCity + '&arrCity=' + this.arrCity + '&deptStartDate=' +
                this.deptStartDateStr + '&seatClass=' + this.seatClass + '&adtCnt=' + this.adtCnt + '&chdCnt=' + this.chdCnt + '&infCnt=' + this.infCnt + '&sortType=' + sortType + '&temp=' + Math.random().toString();
            //this.QUERY_URL = '../assets/data/ae.json';
        }
        else {
            //this.QUERY_URL = '../assets/data/ae.json';
            this.QUERY_URL = baseUrl + shoppingUrl + '?routingType=' + this.routingType + '&deptCity=' + this.deptCity + '&arrCity=' + this.arrCity + '&deptStartDate=' +
                this.deptStartDateStr + '&deptEndDate=' + this.deptEndDate + '&seatClass=' + this.seatClass + '&adtCnt=' + this.adtCnt + '&chdCnt=' + this.chdCnt + '&infCnt=' + this.infCnt + '&sortType=' + sortType + '&temp=' + Math.random().toString();
        }
        var flightData = JSON.parse(sessionStorage.getItem('flightData'));
        // if(flightData){
        //   this.flightQuery(flightData);
        // }else{
        this.createLoader();
        this.loader.present().then(function () {
            _this._HttpService.get(_this.QUERY_URL)
                .subscribe(function (res) {
                if (res.status == '1001') {
                    _this.loader.dismiss();
                    _this.flightData = res.data;
                    sessionStorage.setItem('flightData', JSON.stringify(res.data));
                    _this.flightQuery(res.data);
                }
                else if (res.status == '1002') {
                    _this.promptInfo.nativeElement.innerText = '没有找到相匹配的航班信息!';
                    return false;
                }
                else {
                    var msgAlert_1 = _this.alertCtrl.create({
                        title: res.message,
                        buttons: ['确定']
                    });
                    msgAlert_1.present();
                    setTimeout(function () {
                        msgAlert_1.dismiss();
                    }, 2000);
                }
            }, function (err) {
                _this.loader.dismiss();
                _this.promptInfo.nativeElement.innerText = '请求发生错误!';
                console.log('err:' + err);
            });
        });
        //}
    };
    FlightqueryPage.prototype.flightQuery = function (objData) {
        for (var _i = 0, objData_1 = objData; _i < objData_1.length; _i++) {
            var value = objData_1[_i];
            var segments = value.segments[0];
            this.forDate = segments.fromDate.substr(-5, 5);
            this.toDate = segments.toDate.substr(-5, 5);
            var prices = value.prices;
            var activity = value.activity;
            var minAdultFacePrice = value.minAdultFacePrice;
            var stopOver = segments.stopOver;
            var shareFlightNo = segments.shareFlightNo;
            if (shareFlightNo) {
                this.isShareIco = true;
            }
            else {
                this.isShareIco = false;
            }
            var rangeSegmentCount = value.rangeSegmentCount;
            var flightCount = void 0;
            if (rangeSegmentCount.length > 3) {
                flightCount = rangeSegmentCount.split(',')[0].substr(-1);
            }
            else {
                flightCount = rangeSegmentCount.substr(-1);
            }
            if (flightCount != 1) {
                this.zhuangIndex = flightCount - 1;
                this.isTrans = false;
                this.isNoTrans = true;
                for (var _a = 0, _b = value.segments; _a < _b.length; _a++) {
                    var h = _b[_a];
                    if (h < this.zhuangIndex) {
                        this.tranCity += value.segments[h].toAirportCn;
                        this.istranCity = true;
                    }
                }
            }
            else {
                this.isTrans = true;
                this.isNoTrans = false;
                if (stopOver && stopOver.length != 0) {
                    var stopoverCity = '';
                    for (var _c = 0, stopOver_1 = stopOver; _c < stopOver_1.length; _c++) {
                        var stopItem = stopOver_1[_c];
                        stopoverCity += stopItem.stopAirport;
                    }
                    this.stopoverCityName = stopoverCity;
                    this.isstopCity = true;
                }
            }
            for (var _d = 0, prices_1 = prices; _d < prices_1.length; _d++) {
                var item = prices_1[_d];
                if (minAdultFacePrice == item.adultFacePrice) {
                    var showPriceStr = '';
                    if (this.countryType == 'international') {
                        showPriceStr += value.minAdultFacePrice + item.adultTax;
                    }
                    else {
                        showPriceStr += value.minAdultFacePrice;
                    }
                    this.showPricesVal = showPriceStr;
                    var supplierId = item.supplierId;
                    if (supplierId == 'JHAD') {
                        this.isSupplierId = true;
                        this.supplierIdIcon = '航司直销';
                    }
                }
            }
            console.log(this.showPrices);
            //活动优惠
            if (activity) {
                if (activity.actContent == 0) {
                    this.minusType = '票面立减';
                }
                if (activity.actContent == 1) {
                    this.minusType = '保险立减';
                }
                this.minusAmount = activity.actMoney;
                this.isMinus = true;
            }
        }
    };
    FlightqueryPage.prototype.tabData = function (event) {
        this.deptStartDateStr = event;
        this.query(event, this.sortType, this.routingType);
    };
    FlightqueryPage.prototype.filterBox = function () {
        this.isFilter = true;
        this.isModal = true;
    };
    FlightqueryPage.prototype.filterResult = function ($event) {
        this.flightData = $event;
        this.flightQuery(this.flightData);
        console.log('flightdata:' + JSON.stringify(this.flightData));
        this.isFilter = false;
        this.isModal = false;
    };
    FlightqueryPage.prototype.filterAsDate = function () {
        this.priceTx.nativeElement.innerText = '价格';
        if (this.timeFlag % 2 === 0) {
            this.dateTx.nativeElement.innerText = '从早到晚';
            this.sortType = "date_asc";
        }
        else {
            this.dateTx.nativeElement.innerText = '从晚到早';
            this.sortType = "date_desc";
        }
        this.timeFlag++;
        this.query(this.deptStartDateStr, this.sortType, this.routingType);
    };
    FlightqueryPage.prototype.filterAsPrice = function () {
        this.dateTx.nativeElement.innerText = '时间';
        if (this.priceFlag % 2 === 0) {
            this.priceTx.nativeElement.innerText = '从低到高';
            this.sortType = "price_asc";
        }
        else {
            this.priceTx.nativeElement.innerText = '从高到低';
            this.sortType = "price_desc";
        }
        this.priceFlag++;
        this.query(this.deptStartDateStr, this.sortType, this.routingType);
    };
    FlightqueryPage.prototype.selectTheFlight = function (flight) {
        var flightObjFrom = { 'data': flight };
        flightObjFrom.data.prices = this._UtilsService.filterPrice(flightObjFrom.data.prices);
        sessionStorage.setItem("flightObjFrom", JSON.stringify(flightObjFrom));
        this.navCtrl.push(FlightdetailPage, { 'type': 'from' });
    };
    FlightqueryPage.prototype.ionViewWillLeave = function () {
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'flex';
            });
        }
    };
    __decorate([
        ViewChild('dateTx'),
        __metadata("design:type", ElementRef)
    ], FlightqueryPage.prototype, "dateTx", void 0);
    __decorate([
        ViewChild('priceTx'),
        __metadata("design:type", ElementRef)
    ], FlightqueryPage.prototype, "priceTx", void 0);
    __decorate([
        ViewChild('promptInfo'),
        __metadata("design:type", ElementRef)
    ], FlightqueryPage.prototype, "promptInfo", void 0);
    FlightqueryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-flightquery',
            templateUrl: 'flightquery.html',
            providers: [HttpService, UtilsService, FlightTabComponent]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            HttpService,
            LoadingController,
            UtilsService])
    ], FlightqueryPage);
    return FlightqueryPage;
}());
export { FlightqueryPage };
//# sourceMappingURL=flightquery.js.map