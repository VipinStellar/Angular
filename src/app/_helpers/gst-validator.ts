import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class GstValidator {
  static validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // No value provided, so validation passes.
      }

      // Define a regular expression pattern to match GST numbers
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}$/;

      if (!gstPattern.test(control.value)) {
        return { gstInvalid: 'Invalid GST number' }; // GST number doesn't match the pattern
      }
      return null; // GST number is valid
    };
  }
}
