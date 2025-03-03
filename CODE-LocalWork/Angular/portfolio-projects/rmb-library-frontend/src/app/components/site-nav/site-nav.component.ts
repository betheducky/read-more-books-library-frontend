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

  constructor(
    public authService: AuthServiceService,
    private bookListService: BookListService,
  ) {}

  ngOnInit(): void {
    const books = this.bookListService.books$.subscribe((books) => {
      console.log('Books retrieved!', books);
      this.books = books;
      this.hasLocallyStoredBooks = Array.isArray(books) && books.length > 0;
    });

    console.log('Books in local storage:', this.books);
  }

  logMeOut(): void {
    this.authService.logout();
    console.log("User has been logged out!");
  }

  testFunc(): void {
    console.log('Button works!');
  }

}
