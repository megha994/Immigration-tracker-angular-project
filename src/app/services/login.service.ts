
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  getCurrentUser(): any {
    return this.auth.currentUser;
  }
}
