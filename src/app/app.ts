import { Component, signal } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('immigration-tracker');
}
