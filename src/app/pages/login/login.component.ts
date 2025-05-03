import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  #authService = inject(AuthService)
  #router = inject(Router)
  loginForm: FormGroup;
  error: string = ''

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
  
    this.#authService.login(username, password).subscribe(user => {      
      if (user) {
        localStorage.setItem('user', JSON.stringify(username));
        this.#router.navigate(['home'])
        
      } else {
        this.error = 'Credenziali errate';
      }
    });
  }
}