var REG = {
    USERNAME: /^\w{1,20}$/,
    PASSWORD: /^\w{6,20}$/
};
var FieldValidators = /** @class */ (function () {
    function FieldValidators() {
    }
    FieldValidators.username = function (control) {
        if (control.value.length === 0) {
            return {
                empty: true
            };
        }
        if (REG.USERNAME.test(control.value)) {
            return null;
        }
        return { 'invalid': true };
    };
    FieldValidators.password = function (control) {
        if (control.value.length === 0) {
            return {
                empty: true
            };
        }
        if (REG.PASSWORD.test(control.value)) {
            return null;
        }
        return { 'invalid': true };
    };
    return FieldValidators;
}());
export { FieldValidators };
//# sourceMappingURL=field-validators.js.map