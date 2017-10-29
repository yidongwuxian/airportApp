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
import { NavController, NavParams, ModalController, AlertController, Slides } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { AirportService } from '../../service/airport.service';
import { UtilsService } from '../../service/utils.service';
import { CalendarModal } from "ion2-calendar";
import { CityselComponent } from '../../components/citysel/citysel';
import { MsgTipComponent } from '../../components/msgtip/msgtip';
import { MsgTipBdComponent } from '../../components/msgtipbd/msgtipbd';
import { MsgIconComponent } from '../../components/msgicon/msgicon';
import { FlightqueryPage } from '../flightquery/flightquery';
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, modalCtrl, alertCtrl, _AirportService, _UtilsService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this._AirportService = _AirportService;
        this._UtilsService = _UtilsService;
        this.searchView = {
            msg: 0,
            aducount: 1,
            chdcount: 0,
            singleAduNum: 1,
            aduNum: 1,
            chdNum: 0,
            depCity: '出发城市',
            arrCity: '到达城市',
            isEx: true,
            dependentColumns: [],
            currentDate: '',
            rountingType: 'OW',
            depCityCode: '',
            arrCityCode: '',
            depCityNameEn: null,
            isRT: false,
            isShow: false,
            isAdult: false,
            isChd: true,
            cabin: 'Y',
            countryEn: '',
            formCityCode: '',
            toCityCode: null,
            diffType: '',
            undeTx: '',
            depTimePost: '',
            arrTimePost: '',
            calNumber: {}
        };
        this.judgeGnorGj();
    }
    SearchPage.prototype.ionViewDidLoad = function () {
    };
    SearchPage.prototype.ionViewWillEnter = function () {
        this.slides.startAutoplay();
    };
    SearchPage.prototype.ionViewWillLeave = function () {
        this.slides.stopAutoplay();
    };
    SearchPage.prototype.ngOnInit = function () {
        this.searchView.msg = 2;
        var fromCity = JSON.parse(localStorage.getItem('fromCity'));
        var toCity = JSON.parse(localStorage.getItem('toCity'));
        // const historyDep = JSON.parse(localStorage.getItem('historyDep'));
        // const historyArr   = JSON.parse(localStorage.getItem('historyArr'));
        var countryType = sessionStorage.getItem('countryType');
        var depTime = sessionStorage.getItem('depTime');
        var arrTime = sessionStorage.getItem('arrTime');
        if (fromCity) {
            if (fromCity.cityName) {
                this.searchView.depCity = fromCity.cityName;
                this.searchView.depCityCode = fromCity.cityCode;
            }
            else {
                this.searchView.depCity = '出发城市';
            }
        }
        // else if(historyDep){
        //   if(historyDep.cityName){
        //      this.searchView.depCity = historyDep.cityName;
        //      this.searchView.depCityCode = historyDep.cityCode;
        //   }else{
        //      this.searchView.depCity = '出发城市';
        //   }
        // }
        if (toCity) {
            if (toCity.cityName) {
                this.searchView.arrCity = toCity.cityName;
                this.searchView.arrCityCode = toCity.cityCode;
            }
            else {
                this.searchView.arrCity = '到达城市';
            }
        }
        // else if(historyArr){
        //   if(historyArr.cityName){
        //      this.searchView.arrCity = historyArr.cityName;
        //      this.searchView.arrCityCode = historyArr.cityCode;
        //   }else{
        //      this.searchView.arrCity = '到达城市';
        //   }
        // }
        if (countryType) {
            if (countryType === 'inland') {
                this.searchView.isAdult = false;
                this.searchView.isChd = true;
            }
            if (countryType === 'international') {
                this.searchView.isAdult = true;
                this.searchView.isChd = false;
            }
        }
        if (depTime) {
            var depTimeStr = JSON.parse(depTime);
            this.dep.nativeElement.value = depTimeStr.string.substr(5, 2) + '月' + depTimeStr.string.substr(8, 2) + '日';
            this.searchView.depTimePost = depTimeStr.string;
            this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(depTimeStr.string, '');
        }
        else {
            this.searchView.undeTx = this._UtilsService.addDate(1, '');
            this.dep.nativeElement.value = this._UtilsService.addDate(1, 'months');
            this.searchView.depTimePost = this._UtilsService.addDate(1, '');
            this.depWeek.nativeElement.innerHTML = this._UtilsService.getWeek(this.searchView.undeTx, '');
        }
        if (arrTime) {
            var arrTimeStr = JSON.parse(arrTime);
            this.arr.nativeElement.value = arrTimeStr.string.substr(5, 2) + '月' + arrTimeStr.string.substr(8, 2) + '日';
            this.searchView.arrTimePost = arrTimeStr.string;
            this.arrWeek.nativeElement.innerHTML = this._UtilsService.getWeek(arrTimeStr.string, '');
        }
        var type = this.navParams.get('type');
        if (type == 'depback') {
            this.judgeGnorGj();
        }
        if (type == 'arrback') {
            this.judgeGnorGj();
        }
    };
    SearchPage.prototype.exchange = function () {
        this.searchView.depCity = this.cityBack.nativeElement.innerText;
        this.searchView.arrCity = this.cityGo.nativeElement.innerText;
        this.searchView.isEx = !this.searchView.isEx;
    };
    SearchPage.prototype.depCityGo = function () {
        this.navCtrl.push(CityselComponent, {
            'type': 'dep'
        });
    };
    SearchPage.prototype.arrCityGo = function () {
        this.navCtrl.push(CityselComponent, {
            'type': 'arr'
        });
    };
    SearchPage.prototype.fromDate = function () {
        var _this = this;
        var _daysConfig = [];
        for (var i = 0; i < 31; i++) {
            _daysConfig.push({
                date: new Date(),
                title: "\u4ECA\u5929"
            }, {
                date: new Date(2017, 11, 15),
                subTitle: "\u00A5500"
            }, {
                date: new Date(2017, 10, 25),
                subTitle: "\u00A51500"
            });
        }
        var options = {
            monthFormat: 'yyyy 年 MM 月 ',
            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
            weekStart: 1,
            defaultDate: new Date(),
            title: '出发时间',
            closeLabel: '取消',
            doneLabel: '确定',
            autoDone: true,
            daysConfig: _daysConfig
        };
        var myCalendar = this.modalCtrl.create(CalendarModal, {
            options: options
        });
        myCalendar.present();
        myCalendar.onDidDismiss(function (date) {
            if (date) {
                _this.dep.nativeElement.value = date.string.substr(5, 2) + '月' + date.string.substr(8, 2) + '日';
                _this.depWeek.nativeElement.innerHTML = _this._UtilsService.getWeek(date.string, '');
                _this.searchView.depTimePost = date.string;
                sessionStorage.setItem('depTime', JSON.stringify(date));
            }
            else {
                _this.dep.nativeElement.value = '出发时间';
                _this.depWeek.nativeElement.innerHTML = '';
            }
        });
    };
    SearchPage.prototype.toDate = function () {
        var _this = this;
        var _daysConfig1 = [];
        for (var i = 0; i < 31; i++) {
            _daysConfig1.push({
                date: new Date(),
                title: "\u4ECA\u5929"
            }, {
                date: new Date(2017, 12, 15),
                subTitle: "\u00A5800"
            }, {
                date: new Date(2017, 11, 5),
                subTitle: "\u00A5730"
            });
        }
        var options1 = {
            from: new Date(),
            monthFormat: 'yyyy 年 MM 月 ',
            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
            weekStart: 1,
            defaultDate: new Date(),
            title: '返回时间',
            closeLabel: '取消',
            doneLabel: '确定',
            autoDone: true,
            daysConfig: _daysConfig1
        };
        var myCalendar = this.modalCtrl.create(CalendarModal, {
            options: options1
        });
        myCalendar.present();
        myCalendar.onDidDismiss(function (date) {
            if (date) {
                _this.arr.nativeElement.value = date.string.substr(5, 2) + '月' + date.string.substr(8, 2) + '日';
                _this.arrWeek.nativeElement.innerHTML = _this._UtilsService.getWeek(date.string, '');
                _this.searchView.arrTimePost = date.string;
                sessionStorage.setItem('arrTime', JSON.stringify(date));
            }
            else {
                _this.arr.nativeElement.value = '请选择返回日期';
            }
        });
    };
    SearchPage.prototype.updateRT = function () {
        if (this.searchView.isRT == true) {
            this.searchView.isShow = true;
            this.searchView.rountingType = 'RT';
        }
        else {
            this.searchView.isShow = false;
            this.searchView.rountingType = 'OW';
        }
    };
    SearchPage.prototype.judgeGnorGj = function () {
        var _this = this;
        var AIRPORT_URL = '../assets/data/airport.json';
        this._AirportService.getAirData(AIRPORT_URL)
            .then(function (res) {
            var formCityCode = '';
            var toCityCode = '';
            for (var i = 0; i < res.length; i++) {
                if (res[i].cityCode === _this.searchView.depCityCode || res[i].cityCode === _this.searchView.arrCityCode) {
                    formCityCode = res[i].countryEn;
                    toCityCode = res[i].countryEn;
                }
            }
            if (formCityCode != "CHINA") {
                if (_this.searchView.rountingType == 'OW') {
                    _this.searchView.calNumber = {
                        'adtCnt': _this.searchView.singleAduNum,
                        'chdCnt': 0,
                        'infCnt': 0
                    };
                }
                else {
                    _this.searchView.calNumber = {
                        'adtCnt': _this.searchView.aduNum,
                        'chdCnt': _this.searchView.chdNum,
                        'infCnt': 0
                    };
                }
                localStorage.removeItem('inlandCount');
                localStorage.setItem('internaCount', JSON.stringify(_this.searchView.calNumber));
                sessionStorage.setItem('countryType', 'international');
                _this.searchView.isAdult = false;
                _this.searchView.isChd = true;
            }
            else {
                _this.searchView.calNumber = {
                    'adtCnt': _this.searchView.singleAduNum,
                    'chdCnt': 0,
                    'infCnt': 0
                };
                localStorage.removeItem('internaCount');
                localStorage.setItem('inlandCount', JSON.stringify(_this.searchView.calNumber));
                sessionStorage.setItem('countryType', 'inland');
                _this.searchView.isAdult = true;
                _this.searchView.isChd = false;
            }
            if (toCityCode != "CHINA") {
                if (_this.searchView.rountingType == 'OW') {
                    _this.searchView.calNumber = {
                        'adtCnt': _this.searchView.singleAduNum,
                        'chdCnt': 0,
                        'infCnt': 0
                    };
                }
                else {
                    _this.searchView.calNumber = {
                        'adtCnt': _this.searchView.aduNum,
                        'chdCnt': _this.searchView.chdNum,
                        'infCnt': 0
                    };
                }
                localStorage.removeItem('inlandCount');
                localStorage.setItem('internaCount', JSON.stringify(_this.searchView.calNumber));
                sessionStorage.setItem('countryType', 'international');
                _this.searchView.isAdult = false;
                _this.searchView.isChd = true;
            }
            else {
                _this.searchView.calNumber = {
                    'adtCnt': _this.searchView.singleAduNum,
                    'chdCnt': 0,
                    'infCnt': 0
                };
                localStorage.removeItem('internaCount');
                localStorage.setItem('inlandCount', JSON.stringify(_this.searchView.calNumber));
                sessionStorage.setItem('countryType', 'inland');
                _this.searchView.isAdult = true;
                _this.searchView.isChd = false;
            }
        }, function (err) { return console.log('err:' + err); });
    };
    SearchPage.prototype.aduChange = function (event) {
        this.searchView.aduNum = "" + event;
    };
    SearchPage.prototype.chdChange = function (event) {
        this.searchView.chdNum = "" + event;
        if (this.searchView.chdNum > this.searchView.aduNum) {
            var tipAlert = this.alertCtrl.create({
                title: '一成人最多能携带两名儿童！请重新选择!',
                buttons: ['确定']
            });
            tipAlert.present();
        }
    };
    SearchPage.prototype.searchbtn = function () {
        if (this.searchView.rountingType == 'OW') {
            sessionStorage.setItem('routingType', 'OW');
            if (this.searchView.depCity === '出发城市' || this.searchView.arrCity === '到达城市' || this.searchView.depCityCode === '' || this.searchView.arrCityCode === '' ||
                this.searchView.cabin === undefined || this.dep.nativeElement.value === '出发时间') {
                var msgAlert = this.alertCtrl.create({
                    title: '请填写完整信息!',
                    buttons: ['确定']
                });
                msgAlert.present();
            }
            else if (this.searchView.depCity === this.searchView.arrCity) {
                var msgAlert = this.alertCtrl.create({
                    title: '出发到达城市不能相同!',
                    buttons: ['确定']
                });
                msgAlert.present();
            }
            else {
                this.navCtrl.push(FlightqueryPage, {
                    'routingType': this.searchView.rountingType,
                    'deptCity': this.searchView.depCityCode,
                    'arrCity': this.searchView.arrCityCode,
                    'deptStartDate': this.searchView.depTimePost,
                    'seatClass': this.searchView.cabin,
                    'adtCnt': this.searchView.singleAduNum,
                    'chdCnt': 0,
                    'infCnt': 0,
                    'deptCityName': this.searchView.depCity,
                    'arrCityName': this.searchView.arrCity
                });
            }
        }
        else {
            sessionStorage.setItem('routingType', 'RT');
            if (this.arr.nativeElement.value == '请选择返回日期') {
                var msgAlert = this.alertCtrl.create({
                    title: '请填写完整信息!',
                    buttons: ['确定']
                });
                msgAlert.present();
            }
            else if (this._UtilsService.datediff(this.searchView.depTimePost, this.searchView.arrTimePost, "day") < 0) {
                var msgAlert = this.alertCtrl.create({
                    title: '到达时间应大于出发时间!',
                    buttons: ['确定']
                });
                msgAlert.present();
            }
            else {
                this.navCtrl.push(FlightqueryPage, {
                    'routingType': this.searchView.rountingType,
                    'deptCity': this.searchView.depCityCode,
                    'arrCity': this.searchView.arrCityCode,
                    'deptStartDate': this.searchView.depTimePost,
                    'deptEndDate': this.searchView.arrTimePost,
                    'seatClass': this.searchView.cabin,
                    'adtCnt': this.searchView.aduNum,
                    'chdCnt': this.searchView.chdNum,
                    'infCnt': 0,
                    'deptCityName': this.searchView.depCity,
                    'arrCityName': this.searchView.arrCity
                });
            }
        }
    };
    __decorate([
        ViewChild('cityGo'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "cityGo", void 0);
    __decorate([
        ViewChild('cityBack'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "cityBack", void 0);
    __decorate([
        ViewChild('dep'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "dep", void 0);
    __decorate([
        ViewChild('arr'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "arr", void 0);
    __decorate([
        ViewChild('depWeek'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "depWeek", void 0);
    __decorate([
        ViewChild('arrWeek'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "arrWeek", void 0);
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], SearchPage.prototype, "slides", void 0);
    SearchPage = __decorate([
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
            providers: [HttpService, AirportService, UtilsService, MsgTipComponent, MsgTipBdComponent, MsgIconComponent]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ModalController,
            AlertController,
            AirportService,
            UtilsService])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map