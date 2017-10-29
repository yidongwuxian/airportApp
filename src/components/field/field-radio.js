var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { FieldBase } from './field-base';
var FieldRadio = /** @class */ (function (_super) {
    __extends(FieldRadio, _super);
    function FieldRadio(options) {
        var _this = _super.call(this, options) || this;
        _this.controlType = 'radio';
        _this.items = [];
        _this.items = options['items'] || [];
        _this.type = 'radio';
        return _this;
    }
    return FieldRadio;
}(FieldBase));
export { FieldRadio };
//# sourceMappingURL=field-radio.js.map