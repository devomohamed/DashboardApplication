import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SetHeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      setHeaders: {
        'Accept':'application/json',
        'Accept-Language':'en',
        'App-Version':'11',
        'Device-Name': 'chrome',
        'Device-OS-Version':'13',
        'Device-UDID':'1234',
        'Device-Push-Token':'123456',
        'Device-Type':'web'
      }
    });
    return next.handle(clonedRequest);
  }
}
