import { inject, Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private _isLoggedIn = signal(!!localStorage.getItem('token'));
  user = new BehaviorSubject<any>(this.getCurrentUser());

checkTokenExpiration() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const decoded: any = jwtDecode(token);

  const exp = decoded.exp * 1000;
  const now = Date.now();

  if (now > exp) {
    this.logout();
  }
}

  get isLoggedIn() {
    return this._isLoggedIn()
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn.set(value);
  }
  
  constructor(private firestore: Firestore) {}

    login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  saveSession(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.user.next(data.user);
    this._isLoggedIn.set(true);
  }

    getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.clear();
    this._isLoggedIn.set(false);
    this.user.next(null);
  }
}