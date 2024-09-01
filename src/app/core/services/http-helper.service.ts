// import { HttpHeaders } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor() { }

  formDataConverter(data: any) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] !== undefined) {
        if(data[key] !== null){
          formData.append(key, data[key]);
        }
      }
    }
    return formData;
  }

}
