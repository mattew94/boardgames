import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './shared/auth.guard';
import { ProfiloComponent } from './pages/profilo/profilo.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'utenti', component: UserListComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profilo/:id', component: ProfiloComponent },
  { path: '**', redirectTo: 'home' },
];
