import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatDivider } from '@angular/material/divider';

import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, MatDivider, MatDividerModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  view: 'login' | 'register' | 'forgot' = 'forgot';

  message: string | null = null;
  errorMessage: string | null = null;

  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  switchView(view: 'login' | 'register' | 'forgot') {
    this.view = view;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) =>
          (this.errorMessage = err.error.message || 'Login Failed'),
      });
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.login(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) =>
          (this.errorMessage = err.error.message || 'Registration Failed'),
      });
    }
  }

  resetPassword(): void {
    if (this.forgotPasswordForm.valid) {
      this.authService
        .requestPasswordReset(this.forgotPasswordForm.value)
        .subscribe({
          next: (response) => {
            console.log('Reset email sent!', response);
            this.message = 'Password reset email sent. Check your inbox!';
            this.errorMessage = null;
          },
          error: (error) => {
            console.log('Error:', error);
            this.errorMessage =
              'There was an issue sending your reset email. Please try again.';
            this.message = null;
          },
          complete: () => console.log('Request complete!'),
        });
    }
  }
}
