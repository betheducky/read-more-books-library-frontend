import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  private bookList: any[] = [];
  private bookListSubject = new BehaviorSubject<any[]>(this.bookList);
  bookList$ = this.bookListSubject.asObservable();

  addBook(book: any): void {
    if (!this.bookList.some((b) => b.title === book.title && b.author === book.author)){
      this.bookList.push(book);
      this.bookListSubject.next([...this.bookList])
    }
  }

  getBooks(): any[] {
    return this.bookList;
  }

  removeBook(title: any[]): void {
    this.bookList = this.bookList.filter((book) => book.title !== title);
    this.bookListSubject.next([...this.bookList]);
  }

  constructor() { }
}

// Troubleshoot removeBook method across app
