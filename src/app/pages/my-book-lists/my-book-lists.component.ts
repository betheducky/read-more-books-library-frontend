import { Component, OnInit } from '@angular/core';
import { SiteNavComponent } from '../../components/site-nav/site-nav.component';

import { BookListService } from '../../services/book-list-service/book-list.service';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { Book } from '../../models/book-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-book-lists',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    SiteNavComponent,
    RouterLink,
  ],
  templateUrl: './my-book-lists.component.html',
  styleUrl: './my-book-lists.component.scss',
})
export class MyBookListsComponent implements OnInit {
  myBooks: Book[] = [];
  myPaginatedBooks: Book[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(
    private bookListService: BookListService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.bookListService.getBooks().subscribe(() => {
      this.bookListService.bookList$.subscribe((books: Book[]) => {
        this.myBooks = books;
        this.paginateResults();
        console.log('Here is your current list of books...', [...this.myBooks]);
      });
    });
  }

  removeBook(bookId: number): void {
    this.bookListService.removeBook(bookId).subscribe();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateResults();
  }

  paginateResults(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.myPaginatedBooks = this.myBooks.slice(startIndex, endIndex);
  }
}
