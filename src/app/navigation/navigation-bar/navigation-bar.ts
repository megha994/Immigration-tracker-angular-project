import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  templateUrl: './navigation-bar.html',
  styleUrls: ['./navigation-bar.css'],
})
export class NavigationBarComponent {
  expandedCategory: string | null = null;
  isNavOpen: boolean = false;

  toggleCategory(category: string): void {
    this.expandedCategory = this.expandedCategory === category ? null : category;
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }
}
