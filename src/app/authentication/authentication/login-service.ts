import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './../authentication/services/auth-service';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private authService: AuthService) { }

  signup(email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((u: any) => u.email === email)) {
      return throwError(() => ({ code: 'email-exists' }));
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    return of({ message: 'Signup successful' });
  }

  login(email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return throwError(() => ({ code: 'invalid-credentials' }));
    }

    const token = this.authService.generateToken(email);
    this.authService.saveToken(token);

    return of({ message: 'Login successful', token });
  }

}

