import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  email: string;
  password: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { email: 'admin@tradeflow.com', password: 'admin123', role: 'ADMIN' },
    { email: 'user@tradeflow.com', password: 'user123', role: 'USER' },
    { email: 'manager@tradeflow.com', password: 'manager123', role: 'MANAGER' }
  ];

  private STORAGE_KEY = 'loggedInUser';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(
      u => u.email === email && u.password === password
    );

    if (user && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  getUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  getRole(): User['role'] | null {
    return this.getUser()?.role || null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
