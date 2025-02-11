import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibraryHomeComponent } from './library-home/library-home.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'read-more-books-library';
}
