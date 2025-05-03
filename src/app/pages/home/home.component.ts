import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  protected authService = inject(AuthService);
  #router = inject(Router)

  constructor() {}



  goTo(path: string) {
    this.#router.navigate([path])    
  }
}
