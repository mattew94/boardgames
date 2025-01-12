import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  
  #router = inject(Router)

  constructor() {}



  goTo(path: string) {
    this.#router.navigate([path])    
  }
}
