import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private firestore: Firestore) {}

  // Metodo per recuperare gli utenti dalla raccolta 'utenti'
  getUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'users'); // Nome della raccolta
    return collectionData(usersCollection);
  }

  // Metodo per recuperare utenti (alternativa senza Observable)
  async fetchUsers() {
    const usersCollection = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => doc.data());
  }
}