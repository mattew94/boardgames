import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { ClassificheComponent } from './pages/classifiche/classifiche.component';
import { ProgrammazioneComponent } from './pages/programmazione/programmazione.component';
import { UserService } from './services/user.service';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'utenti', component: UserListComponent, canActivate: [authGuard], providers: [UserService] },
  { path: 'login', component: LoginComponent },
  { path: 'classifiche', component: ClassificheComponent, canActivate: [authGuard] },
  { path: 'programmazione', component: ProgrammazioneComponent, canActivate: [authGuard] },
  { path: 'profilo/:id', component: ProfiloComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];
