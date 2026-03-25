import { Component, inject, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgbCollapseModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  protected authService = inject(AuthService);
  #router = inject(Router)
  isCollapsed = true;
  title = 'boardgames';
  currentUser = this.authService.getCurrentUser()

  goTo(path: string) {
    this.#router.navigate([path+'/'+ this.authService.getCurrentUser()])    
  }

  logOut() {
    this.isCollapsed = true;
    localStorage.clear();
    this.#router.navigate(['login']);
    this.authService.isLoggedIn = false
  }
}
