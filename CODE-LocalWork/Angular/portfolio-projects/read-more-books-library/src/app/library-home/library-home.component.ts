import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BookSearchComponent } from '../book-search/book-search.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDivider } from '@angular/material/divider';


@Component({
  selector: 'app-library-home',
  standalone: true,
  imports: [
    BookSearchComponent,
    MatDividerModule,
    MatDivider,
  ],
  templateUrl: './library-home.component.html',
  styleUrl: './library-home.component.scss'
})
export class LibraryHomeComponent {

}
