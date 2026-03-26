import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseCurrentUserGames, IResponseFriendsGames } from '../models/user.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  //docData: lettura della collection
  //setDoc: scrittura che sovrascrive l'intera collection
  //updateDoc: scrittura che non sovrascrive l'intera collection ma aggiorna solo alcuni campi

  getFriendsWithGames(): Observable<IResponseFriendsGames[]> {
  return this.http.get<IResponseFriendsGames[]>(`${this.apiUrl}/usersFriendship`);
}

  getCurrentUserGames(): Observable<IResponseCurrentUserGames[]> {
  return this.http.get<IResponseCurrentUserGames[]>(`${this.apiUrl}/currentUserGames`);
}

  addNewGame(body: any): Observable<any> {    
    return this.http.post(`${this.apiUrl}/addNewGame`, body)
  }

  removeGameFromCurrentUser(idGame: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteGame/${idGame}`)
  }
}