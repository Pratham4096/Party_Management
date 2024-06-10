// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    console.log('AuthInterceptor - token:', authToken); // Debug log to check the token
    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Token ${authToken}`)
      });
      console.log('AuthInterceptor - cloned headers:', cloned.headers); // Debug log to check the headers
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
