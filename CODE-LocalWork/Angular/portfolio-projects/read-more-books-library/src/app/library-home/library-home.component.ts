import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BookSearchComponent } from '../book-search/book-search.component';

@Component({
  selector: 'app-library-home',
  standalone: true,
  imports: [
    BookSearchComponent
  ],
  templateUrl: './library-home.component.html',
  styleUrl: './library-home.component.scss'
})
export class LibraryHomeComponent {

}
