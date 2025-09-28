import { Component, OnInit } from '@angular/core';
import { BookSearchComponent } from '../../components/book-search/book-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { SiteNavComponent } from '../../components/site-nav/site-nav.component';

import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { BookListService } from '../../services/book-list-service/book-list.service';
import { Book } from '../../models/book-model';

@Component({
  selector: 'app-library-home',
  standalone: true,
  imports: [
    BookSearchComponent,
    MatDividerModule,
    MatButtonModule,
    MatDivider,
    RouterLink,
    SiteNavComponent
  ],
  templateUrl: './library-home.component.html',
  styleUrl: './library-home.component.scss',
})
export class LibraryHomeComponent {
  
}
