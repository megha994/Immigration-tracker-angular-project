import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {

  signup(email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some((u: any) => u.email === email);
    if (userExists) {
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

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', email);

    return of({ message: 'Login successful' });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}