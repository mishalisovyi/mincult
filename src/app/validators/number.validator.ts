import { FormControl } from '@angular/forms';
import * as _ from "lodash";

export class NumberValidator {

  public static count(control: FormControl) {
    let numberErrors: any = {};
    if (control.value !== "") {
      if (!isNaN(parseFloat(control.value)) && isFinite(control.value)) {
        const number = parseFloat(control.value);
        const stringNumber = number.toString();
        if (number <= 0) numberErrors.smallNumber = true;
        if (stringNumber.includes(".")) numberErrors.floatNumber = true;
      } else {
        numberErrors.notNumber = true;
      }
      if (_.size(numberErrors) > 0) return numberErrors;
      return null;
    }
    return null;
  }
}