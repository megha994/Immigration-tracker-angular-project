import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './../authentication/services/auth-service';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private authService: AuthService) {}

  /** ---------------------------
   *  SIGNUP
   *  --------------------------- */
  signup(name:string, email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((u: any) => u.email === email)) {
      return throwError(() => ({ code: 'email-exists' }));
    }

    // Store username as the part before @
    const username = name;

    users.push({name, email, password, username });
    localStorage.setItem('users', JSON.stringify(users));

    return of({ message: 'Signup successful' });
  }

  /** ---------------------------
   *  LOGIN
   *  --------------------------- */
  login(email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return throwError(() => ({ code: 'invalid-credentials' }));
    }

    // Generate + store token
    const token = this.authService.generateToken(email);
    this.authService.saveToken(token);

    // Store username in AuthService
    this.authService.setUsername(user.username);

    return of({
      message: 'Login successful',
      token,
      username: user.username
    });
  }
}
