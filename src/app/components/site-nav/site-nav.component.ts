import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

import { OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { BookListService } from '../../services/book-list-service/book-list.service';

import { Book } from '../../models/book-model';

@Component({
  selector: 'app-site-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatDivider,
    RouterLink
  ],
  templateUrl: './site-nav.component.html',
  styleUrl: './site-nav.component.scss'
})
export class SiteNavComponent implements OnInit{

  books: Book[] = [];
  hasLocallyStoredBooks: boolean = false;
  isAuthenticated = false;

  constructor(
    public authService: AuthServiceService,
    private bookListService: BookListService,
  ) {}

  ngOnInit(): void {
    const books = this.bookListService.bookList$.subscribe((books) => {
      console.log('Books retrieved!', books);
      this.books = books;
      this.hasLocallyStoredBooks = Array.isArray(books) && books.length > 0;
    });

    this.authService.isAuthenticated$.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
    console.log('Current authorization status is:', this.isAuthenticated);
    console.log('There are ' + this.books.length + ' books in local storage.');
  }

  logMeOut(): void {
    this.authService.logout();
    console.log("User has been logged out!");
  }
}
