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
import { UtilsService } from '../../service/utils.service';
var FlightTabComponent = /** @class */ (function () {
    function FlightTabComponent(_UtilsService) {
        this._UtilsService = _UtilsService;
        this.switchFlight = new EventEmitter();
    }
    FlightTabComponent.prototype.prevDate = function () {
        if (this.date > this._UtilsService.getNow()) {
            var deptPrevDate = this._UtilsService.addDateStr(this.date, -1, 2);
            var deptPrevDateStr = this._UtilsService.addDateStr(this.date, -1, '');
            this.date = deptPrevDate;
            this.switchFlight.emit(deptPrevDateStr);
        }
    };
    FlightTabComponent.prototype.nextDate = function () {
        var deptNextDate = this._UtilsService.addDateStr(this.date, 1, 2);
        var deptNextDateStr = this._UtilsService.addDateStr(this.date, 1, '');
        this.date = deptNextDate;
        this.switchFlight.emit(deptNextDateStr);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FlightTabComponent.prototype, "date", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FlightTabComponent.prototype, "week", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FlightTabComponent.prototype, "switchFlight", void 0);
    FlightTabComponent = __decorate([
        Component({
            selector: 'flightTab',
            templateUrl: './flighttab.html',
            providers: [UtilsService]
        }),
        __metadata("design:paramtypes", [UtilsService])
    ], FlightTabComponent);
    return FlightTabComponent;
}());
export { FlightTabComponent };
//# sourceMappingURL=flighttab.js.map