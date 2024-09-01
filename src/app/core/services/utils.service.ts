import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getChangesValueFromFormGroup(formGroup: FormGroup, initialValues: any): any {
    const currentValues = formGroup.getRawValue();
    const changedValues: { [key: string]: any } = {};

    Object.keys(currentValues).forEach(key => {
      if (currentValues[key] !== initialValues[key]) {
        changedValues[key] = currentValues[key];
      }
    });

    return changedValues;
  }

  convertDateToFormat(dateString: string): string {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Get the year, month, and day components
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString(); // Months are 0-based, so add 1
    let day = date.getDate().toString();

    // Ensure two-digit month and day
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    // Return the formatted date string
    return `${year}-${month}-${day}`;
  }
}
