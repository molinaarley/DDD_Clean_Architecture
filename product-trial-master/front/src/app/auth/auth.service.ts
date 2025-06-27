import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
} 
