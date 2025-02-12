import { Routes } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { MyBookListsComponent } from './my-book-lists/my-book-lists.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LibraryHomeComponent },
  { path: 'my-library', component: MyBookListsComponent },
];
