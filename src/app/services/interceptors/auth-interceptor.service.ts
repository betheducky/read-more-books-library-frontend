import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken =
      this.authService.getToken() || localStorage.getItem('auth_token');
    console.log('Interceptor running for URL: ', req.url);
    console.log('Auth token present:', !!authToken);

    if (req.url.startsWith(environment.apiUrl) && authToken) {
      const authReq = req.clone({
        setHeaders: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
