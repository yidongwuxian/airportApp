var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from './field-base';
var FieldComponent = /** @class */ (function () {
    function FieldComponent() {
    }
    Object.defineProperty(FieldComponent.prototype, "isValid", {
        get: function () {
            return this.form.controls[this.field.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldComponent.prototype, "isEmpty", {
        get: function () {
            var errors = this.form.controls[this.field.key].errors || {};
            return errors['empty'];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", FieldBase)
    ], FieldComponent.prototype, "field", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FieldComponent.prototype, "form", void 0);
    FieldComponent = __decorate([
        Component({
            selector: 'field',
            templateUrl: 'field.component.html'
        })
    ], FieldComponent);
    return FieldComponent;
}());
export { FieldComponent };
//# sourceMappingURL=field.component.js.map