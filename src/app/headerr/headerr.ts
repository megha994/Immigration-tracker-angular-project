import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerr',
  standalone: false,
  templateUrl: './headerr.html',
  styleUrls: ['./headerr.css'],
})
export class Headerr {
  constructor(private router: Router) {}
  onLogin(): void {
    // console.log('Login button     clicked');
    this.router.navigate(['/login-in']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
