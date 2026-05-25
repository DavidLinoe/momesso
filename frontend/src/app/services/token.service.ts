import { Injectable } from '@angular/core';

export interface DecodedToken {
  userId: string;
  role: string;
  companyId?: string;
  iat: number;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly STORAGE_KEY = 'auth_token';

  setToken(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  decodeToken(token?: string): DecodedToken | null {
    const value = token ?? this.getToken();
    if (!value) return null;
    try {
      const payload = value.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as DecodedToken;
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }
}
