var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
var FlightFilterComponent = /** @class */ (function () {
    function FlightFilterComponent(navCtrl, _HttpService, _UtilsService) {
        this.navCtrl = navCtrl;
        this._HttpService = _HttpService;
        this._UtilsService = _UtilsService;
        this.filterChange = new EventEmitter();
        this.Filters = [];
        this.selItem = 0;
        this.result = [];
        this.cabinArrs = [];
        this.timeDepArrs = [];
        this.timeArrArrs = [];
        this.isTimeIco = false;
        this.isAirCompanyIco = false;
        this.isCabinIco = false;
        this.isAirportIco = false;
        this.timeArrs = [];
        this.timeOption = false;
        this.airDepArr = [];
        this.airArrArr = [];
        this.airCompanyDepArr = [];
        this.airCompanyArrArr = [];
        this.isDireFlight = true;
        this.isShareFlight = true;
        this.timeUp = '';
        this.timeDown = '';
        this.flag = false;
        this.temporaryData = [];
    }
    FlightFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        sessionStorage.removeItem("resultData");
        this.flightData = JSON.parse(sessionStorage.getItem('flightData'));
        if (this.flightData) {
            this.flightData.slice().forEach(function (k, i) {
                if (k.rangeSegmentCount.length > 3) {
                    _this.flightCount = k.rangeSegmentCount.split(",")[0].substr(-1);
                }
                else {
                    _this.flightCount = k.rangeSegmentCount.split("-")[1].substr(-1);
                }
                if (_this.flightCount > 1) {
                    _this.isDireFlight = false;
                }
                else {
                    _this.isDireFlight = true;
                }
                _this.flightSegs = k.segments;
                _this.flightSegs.slice().forEach(function (item, n) {
                    var fromCity = JSON.parse(localStorage.getItem('fromCity'));
                    var toCity = JSON.parse(localStorage.getItem('toCity'));
                    if (item.fromCityCn === fromCity.cityName) {
                        var airCompanyDepObj = {
                            "value": item.airlineChn,
                            "images": item.flightNo.substr(0, 2),
                            "airportcode": item.flightNo.substr(0, 2),
                            "airportOption": false
                        };
                        var airCompanyArrAll = {
                            "value": '不限',
                            "airportcode": 'ALL',
                            "airportOption": true
                        };
                        _this.airCompanyDepArr.push(airCompanyDepObj);
                        var uniqueObj = _this._UtilsService.unique(_this.airCompanyDepArr, 'value');
                        var underDatas = _this._UtilsService.preArrays(uniqueObj, airCompanyArrAll);
                        _this.Filters = underDatas;
                        var airDepObject = {
                            "value": item.fromAirportCn,
                            "depcode": item.fromAirport,
                            "airDepOption": false
                        };
                        var airDepAll = {
                            "value": '不限',
                            "depcode": 'ALL',
                            "airDepOption": true
                        };
                        _this.airDepArr.push(airDepObject);
                        var uniqueData = _this._UtilsService.unique(_this.airDepArr, 'value');
                        var underData = _this._UtilsService.preArrays(uniqueData, airDepAll);
                        _this.airDepArrs = underData;
                    }
                    if (item.toCityCn === toCity.cityName) {
                        var airCompanyArrObj = {
                            "value": item.airlineChn,
                            "images": item.flightNo.substr(0, 2),
                            "airportcode": item.flightNo.substr(0, 2),
                            "airportOption": false
                        };
                        var airCompanyArrAll = {
                            "value": '不限',
                            "airportcode": 'ALL',
                            "airportOption": true
                        };
                        _this.airCompanyArrArr.push(airCompanyArrObj);
                        var uniqueObj = _this._UtilsService.unique(_this.airCompanyArrArr, 'value');
                        var underDatas = _this._UtilsService.preArrays(uniqueObj, airCompanyArrAll);
                        _this.Filters = underDatas;
                        var airArrObject = {
                            "value": item.toAirportCn,
                            "arrcode": item.toAirport,
                            "airArrOption": false
                        };
                        var airArrAll = {
                            "value": '不限',
                            "arrcode": 'ALL',
                            "airDepOption": true
                        };
                        _this.airArrArr.push(airArrObject);
                        var uniqueData = _this._UtilsService.unique(_this.airArrArr, 'value');
                        var underData = _this._UtilsService.preArrays(uniqueData, airArrAll);
                        _this.airArrArrs = underData;
                    }
                    if (item.shareFlightNo != '') {
                        _this.isShareFlight = false;
                    }
                    else {
                        _this.isShareFlight = true;
                    }
                });
            });
        }
        this.cabinArrs = [
            {
                'value': '经济舱',
                'cabincode': 'Y',
                'cabinOption': true
            },
            {
                'value': '头等舱/商务舱',
                'cabincode': 'F/C',
                'cabinOption': false
            }
        ];
        this.timeArrs = [
            {
                "timeDate": "不限",
                "time": "ALL",
                "timeOption": true
            },
            {
                "timeDate": "00:00-06:00",
                "time": "",
                "timeOption": false
            },
            {
                "timeDate": "06:00-12:00",
                "time": "",
                "timeOption": false
            },
            {
                "timeDate": "12:00-18:00",
                "time": "",
                "timeOption": false
            },
            {
                "timeDate": "18:00-24:00",
                "time": "",
                "timeOption": false
            }
        ];
        this.filter('ALL');
    };
    FlightFilterComponent.prototype.onItem = function (type) {
        this.selItem = type;
    };
    FlightFilterComponent.prototype.flightType = function (item, n) {
        if (item === true) {
            var flightTypeObj = {
                "value": '直飞'
            };
            this.result.push(flightTypeObj);
        }
        else {
            this.result.splice(n, 1);
        }
    };
    FlightFilterComponent.prototype.flightShare = function (item, n) {
        if (item === true) {
            var flightShareObj = {
                "value": '隐藏共享'
            };
            this.result.push(flightShareObj);
        }
        else {
            this.result.splice(n, 1);
        }
    };
    FlightFilterComponent.prototype.updateDepAir = function (item, n) {
        if (item == true) {
            for (var i = 0; i < this.airDepArrs.length; i++) {
                if (i == n) {
                    var airDepArrsObj = {
                        "value": this.airDepArrs[i].value,
                        "depcode": this.airDepArrs[i].depcode
                    };
                    this.result.push(airDepArrsObj);
                }
            }
            sessionStorage.setItem("resultData", JSON.stringify(this.result));
            this.filter(this.result);
            this.isAirCompanyIco = true;
            this.airDepArrs[0].airDepOption = false;
        }
        else {
            this.result.splice(n - 1, 1);
            if (n === 1) {
                var airDepObj = {
                    "value": this.airDepArrs[0].value,
                    "depcode": this.airDepArrs[0].depcode
                };
                sessionStorage.setItem("resultData", JSON.stringify(airDepObj));
                this.resultLen = this.flightData.length;
                this.airDepArrs[0].airDepOption = true;
                this.isAirCompanyIco = false;
            }
        }
    };
    FlightFilterComponent.prototype.updateArrAir = function (item, n) {
        if (item == true) {
            for (var i = 0; i < this.airArrArrs.length; i++) {
                if (i == n) {
                    var airArrArrsObj = {
                        "value": this.airArrArrs[i].value,
                        "arrcode": this.airArrArrs[i].arrcode
                    };
                    this.result.push(airArrArrsObj);
                }
            }
            sessionStorage.setItem("resultData", JSON.stringify(this.result));
            this.filter(this.result);
            this.isAirCompanyIco = true;
            this.airArrArrs[0].airArrOption = false;
        }
        else {
            this.result.splice(n - 1, 1);
            if (n === 1) {
                var airArrObj = {
                    "value": this.airArrArrs[0].value,
                    "arrcode": this.airArrArrs[0].arrcode
                };
                sessionStorage.setItem("resultData", JSON.stringify(airArrObj));
                this.resultLen = this.flightData.length;
                this.airArrArrs[0].airArrOption = true;
                this.isAirCompanyIco = false;
            }
        }
    };
    FlightFilterComponent.prototype.updateTime = function (item, n) {
        if (item == true) {
            for (var i = 1; i < this.timeArrs.length; i++) {
                if (i == n) {
                    var timeArrsObj = {
                        "timeDate": this.timeArrs[i].timeDate,
                        "time": this.timeArrs[i].time
                    };
                    this.result.push(timeArrsObj);
                }
            }
            sessionStorage.setItem("resultData", JSON.stringify(this.result));
            this.filter(this.result);
            this.isTimeIco = true;
            this.timeArrs[0].timeOption = false;
        }
        else {
            this.result.splice(n - 1, 1);
            if (n === 1) {
                var timeObj = {
                    "timeDate": this.timeArrs[0].timeDate,
                    "time": this.timeArrs[0].time
                };
                sessionStorage.setItem("resultData", JSON.stringify(timeObj));
                this.resultLen = this.flightData.length;
                this.timeArrs[0].timeOption = true;
                this.isTimeIco = false;
            }
        }
    };
    FlightFilterComponent.prototype.getCabinCheck = function (item, n) {
        console.log('n:' + n);
        if (item == true) {
            for (var i = 0; i < this.cabinArrs.length; i++) {
                if (i == n) {
                    var cabinObj = {
                        "value": this.cabinArrs[i].value,
                        "cabincode": this.cabinArrs[i].cabincode
                    };
                    this.result.push(cabinObj);
                }
            }
            sessionStorage.setItem("resultData", JSON.stringify(this.result));
            this.filter(this.result);
            this.isCabinIco = true;
            this.cabinArrs[0].cabinOption = false;
        }
        else {
            this.result.splice(n - 1, 1);
            if (n === 1) {
                var cabinObj = {
                    "value": this.cabinArrs[0].value,
                    "cabincode": this.cabinArrs[0].cabincode
                };
                sessionStorage.setItem("resultData", JSON.stringify(cabinObj));
                this.resultLen = this.flightData.length;
                this.cabinArrs[0].cabinOption = true;
                this.isCabinIco = false;
            }
        }
    };
    FlightFilterComponent.prototype.getAirportCheck = function (item, n) {
        if (item == true) {
            for (var i = 0; i < this.Filters.length; i++) {
                if (i == n) {
                    var filtersObj = {
                        "value": this.Filters[i].value,
                        "airportcode": this.Filters[i].airportcode
                    };
                    this.result.push(filtersObj);
                }
            }
            sessionStorage.setItem("resultData", JSON.stringify(this.result));
            this.filter(this.result);
            this.isAirportIco = true;
            this.Filters[0].airportOption = false;
        }
        else {
            this.result.splice(n - 1, 1);
            if (n === 1) {
                var filtersObj = {
                    "value": this.Filters[0].value,
                    "airportcode": this.Filters[0].airportcode
                };
                sessionStorage.setItem("resultData", JSON.stringify(filtersObj));
                this.resultLen = this.flightData.length;
                this.Filters[0].airportOption = true;
                this.isAirportIco = false;
            }
        }
    };
    FlightFilterComponent.prototype.delSelItem = function (item, m) {
        if (this.direFlight === true) {
            if (item == this.direFlight) {
                this.result.splice(m, 1);
                this.direFlight = false;
            }
        }
        if (this.shareFlight === true) {
            if (item == this.shareFlight) {
                this.result.splice(m, 1);
                this.shareFlight = false;
            }
        }
        for (var i = 0; i < this.timeArrs.length; i++) {
            if (this.timeArrs[i].timeOption === true) {
                if (item == this.timeArrs[i].value) {
                    this.result.splice(m, 1);
                    this.timeArrs[i].timeOption = false;
                }
            }
        }
        for (var i = 0; i < this.cabinArrs.length; i++) {
            if (this.cabinArrs[i].cabinOption === true) {
                if (item == this.cabinArrs[i].value) {
                    this.result.splice(m, 1);
                    this.cabinArrs[i].cabinOption = false;
                }
            }
        }
        for (var i = 0; i < this.airDepArrs.length; i++) {
            if (this.airDepArrs[i].airDepOption === true) {
                if (item == this.airDepArrs[i].value) {
                    this.result.splice(m, 1);
                    this.airDepArrs[i].airDepOption = false;
                }
            }
        }
        for (var i = 0; i < this.airArrArrs.length; i++) {
            if (this.airArrArrs[i].airArrOption === true) {
                if (item == this.airArrArrs[i].value) {
                    this.result.splice(m, 1);
                    this.airArrArrs[i].airArrOption = false;
                }
            }
        }
        for (var i = 0; i < this.Filters.length; i++) {
            if (this.Filters[i].airportOption === true) {
                if (item == this.Filters[i].value) {
                    this.result.splice(m, 1);
                    this.Filters[i].airportOption = false;
                }
            }
        }
    };
    FlightFilterComponent.prototype.filter = function (options) {
        if (options == 'ALL') {
            this.resultLen = this.flightData.length;
        }
        else {
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var item = options_1[_i];
                this.filterData(this.flightData, item);
            }
        }
    };
    FlightFilterComponent.prototype.filterData = function (objData, item) {
        var _this = this;
        this.temporaryData = [];
        objData.slice().forEach(function (items, o) {
            var segs = items.segments;
            var prices = items.prices;
            if (item.time === 'ALL' || item.depcode === 'ALL' || item.arrcode === 'ALL' || item.cabincode === 'Y' || item.airportcode === 'ALL') {
                _this.resultLen = _this.flightData.length;
            }
            _this.timeUp = item.value.split('-')[0];
            _this.timeDown = item.value.split('-')[1];
            //判断是筛选一个或多个
            // if(item.length<=1){
            //   this.filterLen = 1;
            // }else{
            //   this.filterLen = 2;
            // }
            //起飞时间
            if (item.value) {
                for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                    var k = segs_1[_i];
                    var singSel = k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown;
                    if (singSel ||
                        (singSel && k.fromAirport === item.depcode) ||
                        (singSel && k.toAirport === item.arrcode) ||
                        (singSel && k.fromAirport === item.depcode && k.toAirport === item.arrcode) ||
                        (singSel && k.flightNo.substr(0, 2) === item.airportcode) ||
                        (singSel && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (singSel && k.fromAirport === item.depcode && k.toAirport === item.arrcode && k.flightNo.substr(0, 2) === item.airportcode) ||
                        (singSel && k.fromAirport === item.depcode && k.toAirport === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (singSel && k.fromAirport === item.depcode && k.toAirport === item.arrcode && k.flightNo.substr(0, 2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode)) {
                        _this.flag = true;
                    }
                    else {
                        _this.flag = false;
                    }
                }
            }
            //出发机场三字码
            if (item.depcode) {
                for (var _a = 0, segs_2 = segs; _a < segs_2.length; _a++) {
                    var k = segs_2[_a];
                    if (k.fromAirport === item.depcode ||
                        (k.fromAirport === item.depcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown)) ||
                        (k.fromAirport === item.depcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.toAirport === item.arrcode) ||
                        (k.fromAirport === item.depcode && k.flightNo.substr(0, 2) === item.airportcode) ||
                        (k.fromAirport === item.depcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (k.fromAirport === item.depcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.toAirport === item.arrcode && k.flightNo.substr(0, 2) === item.airportcode) ||
                        (k.fromAirport === item.depcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.toAirport === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (k.fromAirport === item.depcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.toAirport === item.arrcode && k.flightNo.substr(0, 2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode)) {
                        _this.flag = true;
                    }
                    else {
                        _this.flag = false;
                    }
                }
            }
            //到达机场三字码
            if (item.arrcode) {
                for (var _b = 0, segs_3 = segs; _b < segs_3.length; _b++) {
                    var k = segs_3[_b];
                    if (k.toAirport === item.arrcode ||
                        (k.toAirport === item.arrcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown)) ||
                        (k.toAirport === item.arrcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.fromAirport === item.depcode) ||
                        (k.toAirport === item.arrcode && k.flightNo.substr(0, 2) === item.airportcode) ||
                        (k.toAirport === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (k.toAirport === item.arrcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.fromAirport === item.depcode && k.flightNo.substr(0, 2) === item.airportcode) ||
                        (k.toAirport === item.arrcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.fromAirport === item.depcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (k.toAirport === item.arrcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.fromAirport === item.depcode && k.flightNo.substr(0, 2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode)) {
                        _this.flag = true;
                    }
                    else {
                        _this.flag = false;
                    }
                }
            }
            //航空公司二字码
            if (item.airportcode) {
                for (var _c = 0, segs_4 = segs; _c < segs_4.length; _c++) {
                    var k = segs_4[_c];
                    if (k.flightNo.substr(0, 2) === item.airportcode ||
                        (k.flightNo.substr(0, 2) === item.airportcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown)) ||
                        (k.flightNo.substr(0, 2) === item.airportcode && k.fromAirport === item.depcode) ||
                        (k.flightNo.substr(0, 2) === item.airportcode && k.toAirport === item.arrcode) ||
                        (k.flightNo.substr(0, 2) === item.airportcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (k.flightNo.substr(0, 2) === item.airportcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.fromAirport === item.depcode) ||
                        (k.flightNo.substr(0, 2) === item.airportcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.toAirport === item.arrcode) ||
                        (k.flightNo.substr(0, 2) === item.airportcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.fromAirport === item.depcode && prices[0].cabinList[0].cabinRank === item.cabincode) ||
                        (k.flightNo.substr(0, 2) === item.airportcode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.toAirport === item.arrcode && prices[0].cabinList[0].cabinRank === item.cabincode)) {
                        _this.flag = true;
                    }
                    else {
                        _this.flag = false;
                    }
                }
            }
            //舱位三字码
            if (item.cabincode) {
                for (var _d = 0, segs_5 = segs; _d < segs_5.length; _d++) {
                    var k = segs_5[_d];
                    if (prices[0].cabinList[0].cabinRank === item.cabincode ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown)) ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && k.fromAirport === item.depcode) ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && k.toAirport === item.arrcode) ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && k.flightNo.substr(0, 2) === item.airportcode) ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.fromAirport === item.depcode) ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.toAirport === item.arrcode) ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.flightNo.substr(0, 2) === item.airportcode && k.fromAirport === item.depcode) ||
                        (prices[0].cabinList[0].cabinRank === item.cabincode && (k.fromDate.substr(-5, 5) >= _this.timeUp && k.toDate.substr(-5, 5) <= _this.timeDown) && k.flightNo.substr(0, 2) === item.airportcode && k.toAirport === item.arrcode)) {
                        _this.flag = true;
                    }
                    else {
                        _this.flag = false;
                    }
                }
            }
            if (_this.flag) {
                _this.temporaryData.push(items);
                _this.resultData = _this.temporaryData;
                _this.resultLen = _this.temporaryData.length;
                console.log('len:' + _this.resultLen);
            }
        });
        //console.log('data:'+JSON.stringify(this.temporaryData));
    };
    FlightFilterComponent.prototype.cancelFilter = function () {
        this.filterChange.emit(this.resultData);
        //console.log('cancel');
    };
    FlightFilterComponent.prototype.updateFilter = function () {
        //console.log('temp:'+JSON.stringify(this.resultData));
        this.filterChange.emit(this.resultData);
        //console.log('success');
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FlightFilterComponent.prototype, "filterChange", void 0);
    FlightFilterComponent = __decorate([
        Component({
            selector: 'ex-filter',
            templateUrl: './flightfilter.html',
            providers: [HttpService, UtilsService]
        }),
        __metadata("design:paramtypes", [NavController,
            HttpService,
            UtilsService])
    ], FlightFilterComponent);
    return FlightFilterComponent;
}());
export { FlightFilterComponent };
//# sourceMappingURL=flightfilter.js.map