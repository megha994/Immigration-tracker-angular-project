import { Component, ChangeDetectionStrategy } from '@angular/core';
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
import { LoginService } from "./../authentication/login-service"

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
  styleUrl: './logincomponent.css',
  providers: [MessageService]
})
export class LoginComponent {

  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid login details.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login(email!, password!).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Log In successful!'
        });

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        const msg = error.code === 'invalid-credentials'
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