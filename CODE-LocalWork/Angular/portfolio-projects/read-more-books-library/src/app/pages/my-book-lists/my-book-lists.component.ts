import { Component, OnInit } from '@angular/core';
import { BookListService } from '../../services/book-list.service';


import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-book-lists',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './my-book-lists.component.html',
  styleUrl: './my-book-lists.component.scss'
})

export class MyBookListsComponent implements OnInit {

  myBooks: {
    title: string;
    author: string;
    coverUrl: string;
    yearPublished: string;
    linkToMore: string;
  }[] = [];

  myPaginatedBooks: {
    title: string;
    author: string;
    coverUrl: string;
    yearPublished: string;
    linkToMore: string;
  }[] = [];

  currentPage: number = 0;
  pageSize: number = 10;


  constructor(private bookListService: BookListService) {}

  ngOnInit(): void {
      this.bookListService.bookList$.subscribe((bookList: any[]) => {
        this.myBooks = bookList;
      });
      this.paginateResults();
      console.log("Trying to access 'bookList'...", [...this.myBooks]);
  }

  removeBook(title: string): void {
    this.bookListService.removeBook(title);
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
