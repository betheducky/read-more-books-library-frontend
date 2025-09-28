import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookListService } from '../book-list-service/book-list.service';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { switchMap, map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url = environment.baseUrl;
  private apiUrl = environment.apiUrl;
  private authToken = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('auth_token')
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private injector: Injector,
    private router: Router
  ) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.authToken.next(token);
    }
  }

  initCsrfProtection(): Observable<any> {
    return this.http
      .get(`${this.url}/sanctum/csrf-cookie`, { withCredentials: true })
      .pipe(map(() => void 0));
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private setAuthState(isAuthenticated: boolean, token?: string): void {
    if (isAuthenticated && token) {
      this.authToken.next(token);
      localStorage.setItem('auth_token', token);
    } else {
      this.authToken.next(null);
      localStorage.removeItem('auth_token');
    }

    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.initCsrfProtection().pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/register`, userData).pipe(
          tap((response: any) => {
            this.setAuthState(true, response.token);
          })
        )
      )
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.initCsrfProtection().pipe(
      switchMap(() =>
        this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials, {
          withCredentials: true,
        })
      ),
      tap((response: any) => {
        console.log('Login response: ', response);
        if (response.token) {
          this.setAuthState(true, response.token);

          const bookListService = this.injector.get(BookListService);
          bookListService.syncBooksToBackend();

          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    this.http
      .post(
        `${this.apiUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      )
      .subscribe(() => {
        this.setAuthState(false);
        this.router.navigate(['/home']);
        const bookListService = this.injector.get(BookListService);
        bookListService.getBooks().subscribe();
      });
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.initCsrfProtection().pipe(
      switchMap(() =>
        this.http.post(`${environment.apiUrl}/reset-password`, { email })
      )
    );
  }

  getToken(): string | null {
    return this.authToken.value;
  }
}
