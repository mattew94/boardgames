import { Component, inject } from '@angular/core';
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
  username: string = localStorage.getItem('user')?.slice(1,-1) || 'User';
  isCollapsed = true;
  title = 'boardgames';


  goTo(path: string) {
    console.log(path);
    
    this.#router.navigate([path+'/'+this.username])    
  }
}
