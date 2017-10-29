var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var OrderStatusPipe = /** @class */ (function () {
    function OrderStatusPipe() {
    }
    OrderStatusPipe.prototype.transform = function (val) {
        var str = '';
        switch (val) {
            case '0':
                str = '待支付';
                break;
            case '1':
                str = '已支付';
                break;
            case '2':
                str = '待出票';
                break;
            case '4':
                str = '出票完成';
                break;
            case '5':
                str = '已取消';
                break;
            case '6':
                str = '待确认人数';
                break;
            case '9':
                str = '已退款';
                break;
            case '-1':
                str = '押金未支付';
                break;
            default:
                str = '未知';
                break;
        }
        return str;
    };
    OrderStatusPipe = __decorate([
        Pipe({
            name: 'orderStatus'
        })
    ], OrderStatusPipe);
    return OrderStatusPipe;
}());
export { OrderStatusPipe };
//# sourceMappingURL=orderStatus.pipe.js.map