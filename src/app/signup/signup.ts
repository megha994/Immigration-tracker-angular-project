import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {

  errorMessage = '';
  successMessage = '';

  constructor(private loginService: LoginService, private router: Router) {}

  // Custom validator: password === confirmPassword
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: this.passwordMatchValidator }
  );

  onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      this.successMessage = '';
      return;
    }

    const { email, password } = this.signupForm.value;

    this.loginService.signup(email!, password!).subscribe({
      
      next: () => {
        debugger;
        this.errorMessage = '';
        this.successMessage = 'Account created successfully! You can now log in.';
        setTimeout(() => this.router.navigate(['/login-in']), 2000);
      },
      error: (error) => {
        if (error.code === 'email-exists') {
          this.errorMessage = 'An account with this email already exists.';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
        this.successMessage = '';
      }
    });
  }

  // Getters for template validation
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}