import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthServiceService } from '../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authServiceService: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authService = Inject(AuthServiceService);
    const authToken = authService.getToken();

    if (authToken && !req.url.includes('openlibrary.org')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}`}
      })
    }
    return next.handle(req);
  } 
}
