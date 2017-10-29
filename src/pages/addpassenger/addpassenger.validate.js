export function PasValidate(type, PasValidate) {
    return function (control) {
        var str = control.value;
        var res = {};
        res[type] = { str: str };
        return PasValidate.test(str) ? null : res;
    };
}
//# sourceMappingURL=addpassenger.validate.js.map