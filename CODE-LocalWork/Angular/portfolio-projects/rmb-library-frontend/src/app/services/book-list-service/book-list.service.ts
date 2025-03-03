import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Book } from '../../models/book-model';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookListService {

  private storageKey: string = 'myBookList';
  private apiUrl: string = `/api/book-list`;

  constructor(private http:HttpClient, private authService: AuthServiceService){}

  getBooks(): Observable<Book[]> {
    if(this.authService.isLoggedIn()) {
      return this.http.get<Book[]>(this.apiUrl);
    } else {
      const locallyStoredBooks = sessionStorage.getItem(this.storageKey);
      return of(locallyStoredBooks ? JSON.parse(locallyStoredBooks) : [])
    }
  }

  addBook(book: Book): Observable<any> {
    if(this.authService.isLoggedIn()) {
      return this.http.post(this.apiUrl, book)
    } else {
      const books = this.getLocallyStoredBooks();
      books.push(book);
      sessionStorage.setItem(this.storageKey, JSON.stringify(books));
      return of(null);
    }
  }


  removeBook(title: string): Observable<any> {
    if(this.authService.isLoggedIn()) {
      return this.http.delete(`${this.apiUrl}/${title}`);
    } else {
      const books = this.getLocallyStoredBooks().filter((b) => b.title !== title);
      sessionStorage.setItem(this.storageKey, JSON.stringify(books));
      return of(null);
    }
  }

  syncBooksToBackend(): void {
    if(this.authService.isLoggedIn()) {
      const books = this.getLocallyStoredBooks();
      if(books.length > 0) {
        books.forEach((book: Book) => this.http.post(this.apiUrl, book).subscribe());
        sessionStorage.removeItem(this.storageKey);
      }
    }
  }

  private getLocallyStoredBooks(): Book[] {
    const locallyStoredBooks = sessionStorage.getItem(this.storageKey);
    return locallyStoredBooks ? JSON.parse(locallyStoredBooks) : [];
  }

  

  private loadBooksFromLocalStorage(): Book[] {
    if (typeof window !== 'undefined') {
      const savedBooks = localStorage.getItem(this.storageKey);
      return savedBooks ? JSON.parse(savedBooks) : [];
    }
    return [];
  }

  // private saveBooksToStorage(books: Book[]): void {
  //   localStorage.setItem(this.storageKey, JSON.stringify(books));
  // }

// private bookListSubject = new BehaviorSubject<Book[]>(
  //   this.loadBooksFromLocalStorage()
  // );
  // bookList$ = this.bookListSubject.asObservable();
  
}
