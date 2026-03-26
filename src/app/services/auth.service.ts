import { inject, Injectable, signal } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { doc } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private _isLoggedIn = signal(!!localStorage.getItem('token'));
  user = new BehaviorSubject<any>(this.getCurrentUser());
  //username = new BehaviorSubject(localStorage.getItem('user')?.slice(1,-1))

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