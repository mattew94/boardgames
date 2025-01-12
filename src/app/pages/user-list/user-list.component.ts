import { Component, OnInit, signal, Signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
})
export class GameListComponent implements OnInit {
  users = signal([] as any);
  isOpenUserDropdown: boolean[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      console.log(data);
      
      this.users.set(data);
      this.users()[0].utenti.forEach((el: any) => {
        this.isOpenUserDropdown.push(false)
      });
    });
  }

  openDropdownUser(indexDropdown: number) {
    this.isOpenUserDropdown = [...this.isOpenUserDropdown.map((isOpen, index) => {
      if(indexDropdown === index) {        
        return !isOpen
      } else {
        return isOpen
      }
    })];


  }
}
