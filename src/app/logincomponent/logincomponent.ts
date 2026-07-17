import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logincomponent',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    CommonModule,
  ],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {
  constructor(private loginService: LoginService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email!, password!).subscribe({
        next: (userCredential) => {
          console.log('Login successful', userCredential.user);
          this.errorMessage = '';
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.handleLoginError(error);
        }
      });
    }
  }

  private handleLoginError(error: any) {
    switch (error.code) {
      case 'auth/invalid-credential':
        this.errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        break;
      case 'auth/user-disabled':
        this.errorMessage = 'This account has been disabled. Please contact support.';
        break;
      case 'auth/user-not-found':
        this.errorMessage = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/too-many-requests':
        this.errorMessage = 'Too many failed login attempts. Please try again later.';
        break;
      default:
        this.errorMessage = 'An error occurred during login. Please try again.';
    }
  }
}
