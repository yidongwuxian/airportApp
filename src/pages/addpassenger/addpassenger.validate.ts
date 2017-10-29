import { ValidatorFn, AbstractControl } from '@angular/forms';

 export function PasValidate(type: string, PasValidate: RegExp): ValidatorFn {
   return (control: AbstractControl): {[key: string]: any} => {
     const str = control.value;
     const res = {};
     res[type] = {str}
     return PasValidate.test(str) ? null : res;
   }
 }