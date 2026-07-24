import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/authentication/services/auth-service';

@Component({
  selector: 'app-headerr',
  templateUrl: './headerr.html',
  standalone: false,
  styleUrls: ['./headerr.css'],
})
export class Headerr {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // Dynamically checks if user is logged in
  get isLoggedIn(): boolean {
    return this.authService.isTokenValid();
  }

  onLogin(): void {
    this.router.navigate(['/login-in']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login-in']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}