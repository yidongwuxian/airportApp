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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldText } from '../components/field/field-text';
import { FieldValidators } from '../components/field/field-validators';
var LoginService = /** @class */ (function () {
    function LoginService() {
    }
    LoginService.prototype.getFields = function () {
        var fields = [
            new FieldText({
                key: 'username',
                label: '用户名',
                value: '',
                required: true,
                pattern: 'username',
                order: 1
            }),
            new FieldText({
                key: 'password',
                label: '密码',
                type: 'password',
                value: '',
                required: true,
                pattern: 'password',
                order: 2
            }),
        ];
        return fields.sort(function (a, b) { return a.order - b.order; });
    };
    LoginService.prototype.toFormGroup = function (fields) {
        var group = {};
        fields.forEach(function (field) {
            group[field.key] =
                field.pattern ?
                    new FormControl(field.value || '', FieldValidators[field.pattern]) :
                    field.required ?
                        new FormControl(field.value || '', Validators.required) :
                        new FormControl(field.value || '');
        });
        return new FormGroup(group);
    };
    LoginService.prototype.logout = function () {
        //this.userService.isLogin = false;
        //this.userService.userName = '';
    };
    LoginService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map