import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private TOKEN_KEY = 'auth_token';
  private USERNAME_KEY = 'auth_username';

  constructor() {}

  /** ---------------------------
   *  TOKEN GENERATION + STORAGE
   *  --------------------------- */
  generateToken(email: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      email,
      exp: Date.now() + 1000 * 60 * 60 // 1 hour expiry
    }));
    const signature = btoa('local-secret'); // mock signature

    return `${header}.${payload}.${signature}`;
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** ---------------------------
   *  TOKEN VALIDATION
   *  --------------------------- */
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  /** ---------------------------
   *  USERNAME MANAGEMENT
   *  --------------------------- */
  setUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  /** ---------------------------
   *  LOGOUT
   *  --------------------------- */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
  }
}
