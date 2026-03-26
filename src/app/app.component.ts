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
  currentUser = this.authService.getCurrentUser();

  ngOnInit() {
    this.authService.user.subscribe(user => {
    this.currentUser = user;
  });
  }

logOut() {
  this.authService.logout();
  this.#router.navigate(['login']);
  this.isCollapsed = true
}

  goTo(path: string) {
    this.#router.navigate([path+'/'+ this.authService.getCurrentUser().display_name.toLowerCase()])    
  }
}
