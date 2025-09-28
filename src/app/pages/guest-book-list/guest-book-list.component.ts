import { Component, OnInit } from '@angular/core';
import { SiteNavComponent } from '../../components/site-nav/site-nav.component';

import { BookListService } from '../../services/book-list-service/book-list.service';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { Book } from '../../models/book-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guest-book-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    SiteNavComponent,
    RouterLink,
  ],
  templateUrl: './guest-book-list.component.html',
  styleUrl: './guest-book-list.component.scss',
})
export class GuestBookListComponent implements OnInit {
  guestBooks: Book[] = [];
  myPaginatedBooks: Book[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private bookListService: BookListService) {}

  ngOnInit(): void {
    this.bookListService.bookList$.subscribe((books) => {
      this.guestBooks = books;
      this.paginateResults();
    });
    console.log("Trying to access 'bookList'...", [...this.guestBooks]);
  }

  removeBook(bookId: number): void {
    console.log('book id to remove:', bookId);
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
    this.myPaginatedBooks = this.guestBooks.slice(startIndex, endIndex);
  }
}
