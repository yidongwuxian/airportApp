var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var AirportPipe = /** @class */ (function () {
    function AirportPipe() {
    }
    AirportPipe.prototype.transform = function (val, airport, input) {
        for (var _i = 0, airport_1 = airport; _i < airport_1.length; _i++) {
            var val_1 = airport_1[_i];
            if (input == val_1.airportCode) {
                return val_1.airportCn;
            }
        }
    };
    AirportPipe = __decorate([
        Pipe({
            name: 'airport'
        })
    ], AirportPipe);
    return AirportPipe;
}());
export { AirportPipe };
//# sourceMappingURL=airport.pipe.js.map