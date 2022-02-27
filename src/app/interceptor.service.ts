import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      setHeaders: {
        "apikey": "bEerX@pe.RT!"
      }
    })
    console.log(req.headers);

    return next.handle(req);
  }
}
