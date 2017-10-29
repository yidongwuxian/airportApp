var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChildren, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { Contacts } from '../../service/contacts.service';
import { HttpService } from '../../service/http.service';
import { SearchPage } from '../../pages/search/search';
var CityselComponent = /** @class */ (function () {
    function CityselComponent(navCtrl, contactsSev, _HttpService, alertCtrl, navParams, ref) {
        this.navCtrl = navCtrl;
        this.contactsSev = contactsSev;
        this._HttpService = _HttpService;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.change = 'internal';
        this.index = 'A';
        this.showModal = false;
        this.indexes = "#热ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        this.offsetTops = [];
        this.contactsGN = [];
        this.contactsGJ = [];
        this.contactsData = [];
        this.contactsStorage = [];
        this.inlandHotCitys = [];
        this.curCountry = [];
        this.stockpileFlag = true;
        this.getCountry('currentCountryGN');
        var localCountry = localStorage.getItem('localCountry');
        if (localCountry) {
            this.localCountry = localCountry;
        }
    }
    CityselComponent.prototype.ionViewDidEnter = function () {
        this.getOffsetTops();
    };
    CityselComponent.prototype.ngOnInit = function () {
        this.type = this.navParams.get('type');
        if (this.change === 'internal') {
            this.initializeGnItems();
            if (this.type == 'dep') {
                this.addHistory('historyCityDep');
            }
            else {
                this.addHistory('historyCityArr');
            }
        }
        else {
            this.initializeGjItems();
            if (this.type == 'dep') {
                this.addHistory('historyCityDep');
            }
            else {
                this.addHistory('historyCityArr');
            }
        }
    };
    CityselComponent.prototype.getCountry = function (name) {
        var citysearch = new AMap.CitySearch();
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city) {
                    var cityinfo = result.city;
                    document.getElementById(name).innerHTML = cityinfo;
                    localStorage.setItem('localCountry', cityinfo);
                }
            }
            else {
                document.getElementById(name).innerHTML = result.info;
            }
        });
    };
    CityselComponent.prototype.initializeItems = function (dataUrl) {
        var _this = this;
        this.contactsSev.getContacts(dataUrl)
            .then(function (res) {
            _this.contactsData = res;
            _this.initialData(res);
        });
    };
    CityselComponent.prototype.initialData = function (res) {
        if (this.change === 'internal') {
            this.contactsGN = this.contactsSev.grouping(res);
            sessionStorage.removeItem('gj-country');
            this.initialView('gn', this.contactsGN);
        }
        else {
            this.contactsGJ = this.contactsSev.grouping(res);
            sessionStorage.removeItem('gn-country');
            this.initialView('gj', this.contactsGJ);
        }
    };
    CityselComponent.prototype.initialView = function (name, objName) {
        var indexsData = [];
        for (var i = 0; i < objName.length; i++) {
            indexsData.push(objName[i].groupName);
        }
        this._indexes = indexsData;
        sessionStorage.setItem(name + '-country', JSON.stringify(objName));
    };
    CityselComponent.prototype.initialCountry = function (dataUrl) {
        var _this = this;
        this._HttpService.get(dataUrl)
            .subscribe(function (res) {
            _this.inlandHotCitys = res;
        }, function (err) { return console.log('err:' + err); });
    };
    CityselComponent.prototype.initializeGnItems = function () {
        var dataUrl = '../assets/data/inlandData.json';
        var gnCountryUrl = '../assets/data/inlandHotCity.json';
        this.initializeItems(dataUrl);
        this.initialCountry(gnCountryUrl);
    };
    CityselComponent.prototype.initializeGjItems = function () {
        var dataUrl = '../assets/data/internationalData.json';
        var gjCountryUrl = '../assets/data/interHotCity.json';
        this.initializeItems(dataUrl);
        this.initialCountry(gjCountryUrl);
    };
    CityselComponent.prototype.switchTab = function () {
        if (this.change === 'internal') {
            this.getCountry('currentCountryGN');
            this.initializeGnItems();
        }
        else {
            this.getCountry('currentCountryGJ');
            this.initializeGjItems();
        }
    };
    CityselComponent.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            var tempData = [];
            for (var i = 0; i < this.contactsData.length; i++) {
                if (this.contactsData[i].match.indexOf(val.toUpperCase()) > -1) {
                    tempData.push(this.contactsData[i]);
                }
            }
            if (this.change === 'internal') {
                this.contactsGN = this.contactsSev.grouping(tempData);
            }
            else {
                this.contactsGJ = this.contactsSev.grouping(tempData);
            }
        }
    };
    CityselComponent.prototype.onCancel = function (ev) {
        if (this.change === 'internal') {
            this.contactsGN = JSON.parse(sessionStorage.getItem('gn-country'));
        }
        else {
            this.contactsGJ = JSON.parse(sessionStorage.getItem('gj-country'));
        }
    };
    CityselComponent.prototype.saveHistory = function (obj) {
        var _this = this;
        var historyCity = JSON.parse(localStorage.getItem(obj));
        if (!historyCity) {
            historyCity = [];
        }
        else {
            historyCity.forEach(function (item, n) {
                if (item.cityCode === _this.cityParam.cityCode) {
                    _this.stockpileFlag = false;
                }
            });
        }
        if (this.stockpileFlag && historyCity.length < 3) {
            historyCity.push(this.cityParam);
        }
        else {
            historyCity.shift();
            historyCity.push(this.cityParam);
        }
        localStorage.setItem(obj, JSON.stringify(historyCity));
    };
    CityselComponent.prototype.calling = function (contactItem) {
        console.log(contactItem);
        this.cityParam = {
            'cityName': contactItem.name,
            'cityCode': contactItem.sanzima
        };
        if (this.cityParam.cityCode === '') {
            var cityParAlert_1 = this.alertCtrl.create({
                title: '您选择的城市还没有开通机场哦!',
                buttons: ['确定']
            });
            cityParAlert_1.present();
            setTimeout(function () {
                cityParAlert_1.dismiss();
            }, 2000);
            return false;
        }
        if (this.type == 'dep') {
            localStorage.setItem('fromCity', JSON.stringify(this.cityParam));
            this.saveHistory('historyCityDep');
            this.navCtrl.push(SearchPage, { 'type': 'depback' });
        }
        if (this.type == 'arr') {
            localStorage.setItem('toCity', JSON.stringify(this.cityParam));
            this.saveHistory('historyCityArr');
            this.navCtrl.push(SearchPage, { 'type': 'arrback' });
        }
    };
    // hisData(obj){
    //   console.log(obj);
    //   if(this.type == 'dep'){
    //     localStorage.setItem('historyDep', obj);  
    //     //this.saveHistory('historyCityDep');
    //     this.navCtrl.push(SearchPage,{'type':'depback'});
    //   }
    //   if(this.type == 'arr'){
    //     localStorage.setItem('historyArr', obj);
    //     //this.saveHistory('historyCityArr');
    //     this.navCtrl.push(SearchPage,{'type':'arrback'});
    //   } 
    // }
    CityselComponent.prototype.addHistory = function (historyCity) {
        var _this = this;
        var historyCity = JSON.parse(localStorage.getItem(historyCity));
        if (!historyCity) {
            historyCity = [];
        }
        ;
        historyCity.forEach(function (item, n) {
            if (item.cityName == undefined) {
                return;
            }
            else {
                if (_this.type == 'dep') {
                    var CountryGN = {
                        'cityName': item.cityName,
                        'cityCode': item.sanzima
                    };
                    _this.curCountry.push(CountryGN);
                }
                else {
                    var CountryGJ = {
                        'cityName': item.cityName,
                        'cityCode': item.sanzima
                    };
                    //this.curCountryGJ=item.cityName;
                    _this.curCountry.push(CountryGJ);
                    console.log(_this.curCountry);
                }
            }
        });
    };
    ;
    CityselComponent.prototype.getOffsetTops = function () {
        this.offsetTops = this.ionItemGroup._results.map(function (ele) {
            return ele.nativeElement.offsetTop;
        });
    };
    CityselComponent.prototype.selectIndex = function (index) {
        this.getOffsetTops();
        this.index = this._indexes[index];
        var offsetTop = this.offsetTops[index];
        this.content.scrollTo(0, offsetTop, 300);
        this.createModal();
    };
    CityselComponent.prototype.onScroll = function () {
        var threshold = 42;
        if (this.content.scrollTop < threshold) {
            this.index = this._indexes[0];
            return;
        }
        for (var i = this.offsetTops.length; i > 0; i--) {
            if (this.content.scrollTop + threshold >= this.offsetTops[i]) {
                this.index = this._indexes[i];
                this.ref.detectChanges();
                return;
            }
        }
    };
    CityselComponent.prototype.createModal = function () {
        var _this = this;
        clearTimeout(this.timeout);
        this.showModal = true;
        this.timeout = setTimeout(function () {
            _this.showModal = false;
            _this.ref.detectChanges();
        }, 800);
    };
    __decorate([
        ViewChildren('IonItemGroup'),
        __metadata("design:type", Object)
    ], CityselComponent.prototype, "ionItemGroup", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], CityselComponent.prototype, "content", void 0);
    __decorate([
        ViewChild('mydiv'),
        __metadata("design:type", ElementRef)
    ], CityselComponent.prototype, "mydiv", void 0);
    __decorate([
        ViewChild('currentCountry'),
        __metadata("design:type", ElementRef)
    ], CityselComponent.prototype, "currentCountry", void 0);
    CityselComponent = __decorate([
        IonicPage(),
        Component({
            selector: 'citysel',
            templateUrl: 'citysel.html',
            providers: [Contacts, HttpService]
        }),
        __metadata("design:paramtypes", [NavController,
            Contacts,
            HttpService,
            AlertController,
            NavParams,
            ChangeDetectorRef])
    ], CityselComponent);
    return CityselComponent;
}());
export { CityselComponent };
//# sourceMappingURL=citysel.js.map