import { Injectable, signal } from '@angular/core';
import { Firestore, collectionData, collection, query, where, docData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { doc, getDocs, QuerySnapshot } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  _isLoggedIn = signal(!!localStorage.getItem('user'));

  get isLoggedIn() {
    return this._isLoggedIn()
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn.set(value);
  }
  
  constructor(private firestore: Firestore) {}

    login(username: string, password: string): Observable<boolean> {
      const docRef = doc(this.firestore, 'login_users/OVT5tV8MeuWqpS3p5Bt2');
      return docData(docRef).pipe(
        map((data: any) => {
          if (!data || !data.utenti) return false;
          return data.utenti.some((user: any) =>
            {
              if(user.username === username && user.password === password) {
                this.isLoggedIn = true                
              }
              return user.username === username && user.password === password
            }
          );
        })
      );
    }

    getCurrentUser(): any | null {
      const userJson = localStorage.getItem('user');
      console.log(userJson ? JSON.parse(userJson) : null);
      
      return userJson ? JSON.parse(userJson) : null;
    }
}