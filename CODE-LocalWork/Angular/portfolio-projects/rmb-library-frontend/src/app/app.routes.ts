import { Routes } from '@angular/router';
import { LibraryHomeComponent } from './pages/library-home/library-home.component';
import { MyBookListsComponent } from './pages/my-book-lists/my-book-lists.component';
import { authGuard } from './guards/auth-guard';
import { AuthComponent } from './pages/auth/auth.component';
import { SavedBooksComponent } from './pages/saved-books/saved-books.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LibraryHomeComponent },
  {
    path: 'my-library',
    component: MyBookListsComponent,
    canActivate: [authGuard],
  },
  {path: 'saved-books', component: SavedBooksComponent},
{path: 'authorize', component: AuthComponent}
];
