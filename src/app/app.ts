import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('immigration-tracker');
}
