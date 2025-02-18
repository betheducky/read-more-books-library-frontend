import { Routes } from '@angular/router';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { LibraryHomeComponent } from './pages/library-home/library-home.component';
import { MyBookListsComponent } from './pages/my-book-lists/my-book-lists.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LibraryHomeComponent },
  { path: 'my-library', component: MyBookListsComponent },
];
