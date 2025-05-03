import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'utenti', component: GameListComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];
