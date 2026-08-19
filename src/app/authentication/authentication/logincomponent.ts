import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';

import { LoginService } from './../authentication/login-service';
import { AuthService } from './../authentication/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    FloatLabelModule
  ],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css'
})
export class LoginComponent implements OnInit {

  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
   
    if (this.authService.consumeLogoutToast()) {
      this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You have been logged out successfully!"
        });
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid login details.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login(email!, password!).subscribe({
      next: (response) => {

        // Save username in AuthService
        this.authService.setUsername(response.username);

        // Save token (already done inside LoginService, but safe)
        if (response.token) {
          this.authService.saveToken(response.token);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Welcome ${response.username}!`
        });

        this.authService.triggerLoginToast();
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        const msg =
          error.code === 'invalid-credentials'
            ? 'Invalid email or password.'
            : 'Login failed. Please try again.';
        this.errorMessage = msg;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: msg
        });
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
