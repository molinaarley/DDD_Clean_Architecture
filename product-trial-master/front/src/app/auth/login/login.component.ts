import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  standalone: true, // 🔹 importante para standalone components
  templateUrl: './login.component.html',

  imports: [CommonModule, ReactiveFormsModule] // 🔹 se agregan los módulos necesarios
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.http.post<{ token: string }>(`${environment.apiUrl}/api/auth/token`, { email, password })
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/products']);
        },
        error: () => {
          this.error = 'Email ou mot de passe invalide';
        }
      });
  }
}
