import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'user-list', component: GameListComponent },
  { path: '**', redirectTo: 'home' },
];
