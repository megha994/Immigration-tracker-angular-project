import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layoutcomponent.html',
  styleUrls: ['./layoutcomponent.css'],
})
export class LayoutComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
