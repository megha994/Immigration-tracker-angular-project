import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  selector: 'app-signup',
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
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  errorMessage: string = '';
  successMessage: string = '';

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.loginService.signup(email!, password!).subscribe({
        next: (userCredential) => {
          console.log('Signup successful', userCredential.user);
          this.errorMessage = '';
          this.successMessage = 'Account created successfully! You can now log in.';
          setTimeout(() => this.router.navigate(['/login-in']), 2000);
        },
        error: (error) => {
          console.error('Signup failed', error);
          this.handleSignupError(error);
        }
      });
    }
  }

  private handleSignupError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'An account with this email already exists.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'Password is too weak. Please choose a stronger password.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'Invalid email address.';
        break;
      default:
        this.errorMessage = 'An error occurred during signup. Please try again.';
    }
  }
}