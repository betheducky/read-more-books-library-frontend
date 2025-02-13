import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
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
  books: { title: string; author: string; coverUrl: string, yearPublished: string }[] = [];

  constructor(private http: HttpClient) {}

  searchBooks(): void {
    const query = this.searchQuery;
    if (!query.trim() || query === '') {
      window.alert('Please enter a search query!');
      return;
    }

    const url = `https://openlibrary.org/search.json?q=${query}`;
    this.http.get<any>(url).subscribe((data) => {
      console.log(data.docs);
      this.books = data.docs.map((doc: any) => ({
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(', ') : 'unknown',
        coverUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : '',
        yearPublished: doc.first_publish_year,
      }));
      if (this.books.length === 0) {
        this.noResultsFound = true;
      }
    });

   

    console.log('Search executed!', query, );
  }
}
