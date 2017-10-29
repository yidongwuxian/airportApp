var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var CountComponent = /** @class */ (function () {
    function CountComponent() {
        this.change = new EventEmitter();
        this.flag = false;
        if (this.count === 1) {
            this.flag = true;
        }
        else {
            this.flag = false;
        }
    }
    CountComponent.prototype.increment = function () {
        console.log(this.flag);
        if (this.flag === true) {
            if (this.count > 0 && this.count < 9) {
                this.count++;
            }
        }
        else {
            if (this.count > -1 && this.count < 9) {
                this.count++;
            }
        }
        this.change.emit(this.count);
    };
    CountComponent.prototype.decrement = function () {
        this.count--;
        if (this.count < 1) {
            this.count = 0;
        }
        this.change.emit(this.count);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CountComponent.prototype, "count", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CountComponent.prototype, "change", void 0);
    CountComponent = __decorate([
        Component({
            selector: 'ex-counter',
            templateUrl: './counter.html'
        }),
        __metadata("design:paramtypes", [])
    ], CountComponent);
    return CountComponent;
}());
export { CountComponent };
//# sourceMappingURL=counter.js.map