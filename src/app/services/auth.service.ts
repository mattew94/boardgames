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
  _isLoggedIn = signal(!!localStorage.getItem('user'));
  username = new BehaviorSubject(localStorage.getItem('user')?.slice(1,-1))

  get isLoggedIn() {
    return this._isLoggedIn()
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn.set(value);
  }
  
  constructor(private firestore: Firestore) {}

    login(username: string, password: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/users`).pipe(
        map((data: any) => {
          if (!data) return false;  
          const isLoggedIn = data.some((user: any) =>
            {              
              if(user.username === username && user.password_hash === password) {                
                this.isLoggedIn = true  
                this.username.next(user.id);             
              }
              return user.username === username && user.password_hash === password
            }
          );
          if(isLoggedIn) {
            return data.find((user: any) => user.username === username)
          }
        })
        
      );
    }

    getCurrentUser(): any | null {
      const userJson = localStorage.getItem('user');      
      return userJson ? JSON.parse(userJson) : null;
    }

    getCurrentUserId(): any | null {
      const userJson = localStorage.getItem('userId');      
      return userJson ? JSON.parse(userJson) : null;
    }
}