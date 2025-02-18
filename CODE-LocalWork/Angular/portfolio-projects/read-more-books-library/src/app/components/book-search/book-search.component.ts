import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BookListService } from '../../services/book-list.service';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss',
})
export class BookSearchComponent {
  searchQuery: string = '';
  noResultsFound: boolean = false;
  queryComplete: boolean = false;
  books: {
    title: string;
    author: string;
    coverUrl: string;
    yearPublished: string;
    linkToMore: string;
  }[] = [];
  paginatedBooks: {
    title: string;
    author: string;
    coverUrl: string;
    yearPublished: string;
    linkToMore: string;
  }[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private http: HttpClient, private bookListService: BookListService) {}

  searchBooks(): void {
    const query = this.searchQuery;
    function formatLineValue(lineValue: string[], limit: number = 20) {
      return lineValue.length > limit ? lineValue.slice(0, limit) + '...' : lineValue;
    }
    if (!query.trim() || query === '') {
      window.alert('Please enter a search query!');
      return;
    }

    const url = `https://openlibrary.org/search.json?q=${query}`;
    this.http.get<any>(url).subscribe((data) => {
      console.log(data.docs);
      this.books = data.docs.map((doc: any) => ({
        title: doc.title
        ? formatLineValue(doc.title)
        : 'Title Unknown',
        author: doc.author_name
          ? formatLineValue(doc.author_name.join(', '))
          : 'Author Unknown',
        coverUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : '',
        yearPublished: doc.first_publish_year,
        linkToMore: `https://www.google.com/search?q=${encodeURIComponent(
          doc.title + ' ' + doc.author_name
        )}`,
      }));
      this.paginateResults();
      console.log(this.currentPage * this.pageSize, this.paginatedBooks);
      this.noResultsFound = this.books.length === 0;
      this.queryComplete = true;
    });

    console.log('Search executed!', query);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateResults();
  }

  paginateResults(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }

  addToBookList(book: any): void {
    this.bookListService.addBook(book);
  }
}
