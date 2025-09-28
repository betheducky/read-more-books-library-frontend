import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  throwError,
  map,
  tap,
} from 'rxjs';
import { Book } from '../../models/book-model';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  private guestStorageKey: string = 'guest_book_list';
  private bookApiUrl: string = `${environment.apiUrl}/book-list`;
  private bookListSubject = new BehaviorSubject<Book[]>(
    this.getLocallyStoredBooks()
  );
  bookList$ = this.bookListSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  getBooks(): Observable<Book[]> {
    if (this.authService.isLoggedIn()) {
      return this.http
        .get<{ message: string; books: Book[] }>(this.bookApiUrl)
        .pipe(
          tap((response) => {
            this.bookListSubject.next(response.books);
          }),
          map((response) => response.books)
        );
    } else {
      const books = this.getLocallyStoredBooks();
      this.bookListSubject.next(books);
      return of(books);
    }
  }

  addBook(book: Book): Observable<Book> {
    if (this.authService.isLoggedIn()) {
      return this.http
        .post<{ message: string; book: Book }>(this.bookApiUrl, book)
        .pipe(
          tap(() => this.getBooks().subscribe()),
          map((response) => response.book),
          catchError((err) => throwError(() => err))
        );
    } else {
      const books = this.getLocallyStoredBooks();
      const duplicateBook = books.some((b) => b.id === book.id);

      if (duplicateBook) {
        console.log('Book already added to list!');
        alert("You've already added this book!");
        return of(book);
      }

      books.push(book);
      this.saveBooksToLocalStorage(books);
      return of(book);
    }
  }

  removeBook(bookId: number): Observable<any> {
    if (this.authService.isLoggedIn()) {
      return this.http.delete(`${this.bookApiUrl}/${bookId}`).pipe(
        tap(() => {
          const currentBooks = this.bookListSubject.getValue();
          const updatedBooks = currentBooks.filter(b => b.id !== bookId);
          this.bookListSubject.next(updatedBooks);
        })
      );

    } else {
      const books = this.getLocallyStoredBooks().filter((b) => b.id !== bookId);
      this.saveBooksToLocalStorage(books);
      return of(null);
    }
  }

  syncBooksToBackend(): void {
    console.log(
      'Sync books called, authenticated:',
      this.authService.isLoggedIn()
    );
    console.log('Books to sync:', this.getLocallyStoredBooks().length);

    if (this.authService.isLoggedIn()) {
      const books = this.getLocallyStoredBooks();
      if (books.length > 0) {
        this.http.post(this.bookApiUrl, { books }).subscribe({
          next: () => {
            sessionStorage.removeItem(this.guestStorageKey);
            localStorage.removeItem(this.guestStorageKey);
            this.getBooks().subscribe();
          },
          error: (err) => console.error('Sync failed:', err),
        });
      }
    }
  }

  getLocallyStoredBooks(): Book[] {
    const savedBooks = localStorage.getItem(this.guestStorageKey);
    return savedBooks ? JSON.parse(savedBooks) : [];
  }

  saveBooksToLocalStorage(books: Book[]): void {
    localStorage.setItem(this.guestStorageKey, JSON.stringify(books));
    this.bookListSubject.next(books);
  }
}
