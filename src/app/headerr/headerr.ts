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

  /** Check if user is logged in */
  get isLoggedIn(): boolean {
    return this.authService.isTokenValid();
  }

  /** Get username from AuthService */
  get username(): string | null {
    return this.authService.getUsername();
  }

  /** Navigate to login page */
  onLogin(): void {
    this.router.navigate(['/login-in']);
  }

  /** Logout + redirect */
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login-in']);
  }

  /** Navigate to dashboard */
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
