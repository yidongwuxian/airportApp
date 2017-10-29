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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
var AddpassengerPage = /** @class */ (function () {
    function AddpassengerPage(navCtrl, navParams, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.isShow = false;
        this.isInland = true;
        this.typeBtn = false;
        this.formErrors = {
            chineseName: ''
        };
        this.validationMessage = {
            'chineseName': {
                'required': '请填写用户名'
            }
        };
    }
    AddpassengerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddpassengerPage');
    };
    AddpassengerPage.prototype.ngOnInit = function () {
        var countryType = sessionStorage.getItem('countryType');
        if (countryType === 'inland') {
        }
        else {
        }
        if (this.typeBtn === true) {
            console.log(this.typeBtn);
            this.telTx = '大陆手机';
            this.isShow = false;
        }
        else {
            console.log(this.typeBtn);
            this.telTx = '手机号码';
            this.isShow = true;
        }
        if (this.sex == '男') {
            this.sexVal = 1;
        }
        else {
            this.sexVal = 2;
        }
        this.buildForm();
    };
    AddpassengerPage.prototype.buildForm = function () {
        var _this = this;
        this.Passenger = this.fb.group({
            chineseName: ['', [
                    Validators.required
                ]],
            sureName: ['', Validators.required],
            givenName: ['', Validators.required],
            typeBtn: [false, Validators.required],
            sex: ['', Validators.required],
            nationality: ['', Validators.required],
            birthDate: ['', Validators.required],
            passenger: ['', Validators.required],
            certificate: ['', Validators.required],
            docExpireDate: ['', Validators.required],
            docId: ['', Validators.required],
            mobile: ['', Validators.required]
        });
        this.Passenger.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    AddpassengerPage.prototype.onValueChanged = function (data) {
        if (!this.Passenger)
            return;
        var form = this.Passenger;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessage[field];
                console.log(messages);
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + '\n';
                }
            }
        }
    };
    AddpassengerPage.prototype.createPas = function (_a) {
        var value = _a.value, valid = _a.valid;
        console.log(value);
        console.log('yan:' + valid);
    };
    AddpassengerPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-addpassenger',
            templateUrl: 'addpassenger.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder])
    ], AddpassengerPage);
    return AddpassengerPage;
}());
export { AddpassengerPage };
//# sourceMappingURL=addpassenger.js.map