import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookListService } from '../book-list-service/book-list.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://127.0.0.1:8003/api';
  private authToken = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private injector: Injector) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.authToken.next(token);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        this.authToken.next(response.token);
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.authToken.next(response.token);
        localStorage.setItem('auth_token', response.token);

        const bookListService = this.injector.get(BookListService)
        bookListService.syncBooksToBackend();
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
      this.authToken.next(null);
      localStorage.removeItem('auth_token');
    })
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/password-reset`, {email});
  }

  getToken(): string | null {
    return this.authToken.value;
  }

}
