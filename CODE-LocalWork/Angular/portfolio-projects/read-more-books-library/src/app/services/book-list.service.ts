import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookListService {

  private storageKey: string = 'myBookList';
  private bookListSubject = new BehaviorSubject<any[]>(this.loadBooksFromLocalStorage());
  bookList$ = this.bookListSubject.asObservable();

  private loadBooksFromLocalStorage(): any[] {
    const savedBooks = localStorage.getItem(this.storageKey);
    return savedBooks ? JSON.parse(savedBooks) : [];
  }

  private saveBooksToStorage(books: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }

  addBook(book: any): void {
   
    const currentBooks = this.bookListSubject.value;
    const updatedBooks = [...currentBooks, book];
    this.bookListSubject.next(updatedBooks);
    this.saveBooksToStorage(updatedBooks);
    console.log('addBook() triggered in service...', [...updatedBooks]);
  }

  removeBook(title: string): void {
    const updatedBooks = this.bookListSubject.value.filter(book => book.title !== title);
    this.bookListSubject.next(updatedBooks);
    this.saveBooksToStorage(updatedBooks);
  }

  constructor() {}
}
