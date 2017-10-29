var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var OtherStatusPipe = /** @class */ (function () {
    function OtherStatusPipe() {
    }
    OtherStatusPipe.prototype.transform = function (val) {
        var str = '';
        switch (val) {
            case 'WAIT_AUDIT':
                str = '退票待审核';
                break;
            case 'WAIT_REFUND':
                str = '退票中';
                break;
            case 'REFUND_SUCCESS':
                str = '退票成功';
                break;
            case 'REFUND_FAILURE':
                str = '退票失败';
                break;
            case 'REFUND_OVER':
                str = '已退票';
                break;
            case 'waiting_for_review':
                str = '改签待审核';
                break;
            case 'waiting_for_process':
                str = '改签待处理';
                break;
            case 'payed':
                str = '改签已支付';
                break;
            case 'gathering_success':
                str = '改签成功';
                break;
            case 'review_fail':
                str = '改签审核不通过';
                break;
            case 'returned':
                str = '改签退回';
                return;
            case 'cancel':
                str = '改签取消';
                return;
            default:
                str = '未知';
                break;
        }
        return str;
    };
    OtherStatusPipe = __decorate([
        Pipe({
            name: 'otherStatus'
        })
    ], OtherStatusPipe);
    return OtherStatusPipe;
}());
export { OtherStatusPipe };
//# sourceMappingURL=otherStatus.pipe.js.map