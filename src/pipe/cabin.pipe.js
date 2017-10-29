var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var CabinPipe = /** @class */ (function () {
    function CabinPipe() {
    }
    CabinPipe.prototype.transform = function (val) {
        var str = '';
        switch (val) {
            case 'Y':
                str = '经济舱';
                break;
            case 'F':
                str = '头等舱';
                break;
            case 'C':
                str = '商务舱';
                break;
            default:
                str = val;
                break;
        }
        return str;
    };
    CabinPipe = __decorate([
        Pipe({
            name: 'cabin'
        })
    ], CabinPipe);
    return CabinPipe;
}());
export { CabinPipe };
//# sourceMappingURL=cabin.pipe.js.map