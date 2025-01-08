import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log('rpaspdnmaksdms');
    
    this.userService.getUsers().subscribe((data) => {
      console.log(data);
      
      this.users = data;
    });
  }
}
