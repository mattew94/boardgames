/* import { Component, OnInit, signal, Signal } from '@angular/core';
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
 */

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

interface Gioco {
  nome: string;
  descrizione: string;
  partecipantiMin: number;
  partecipantiMax: number;
  durata: number;
  genere: string;
}

interface Utente {
  id: number;
  nome: string;
  giochi: Gioco[];
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserListComponent {
  utenti = [
    {
      nome: 'Mario Rossi',
      giochi: [
        { nome: 'Catan', descrizione: 'Un gioco di strategia', genere: 'strategia', durata: 60, partecipantiMin: 3, partecipantiMax: 4 },
        { nome: 'Dixit', descrizione: 'Gioco creativo', genere: 'party', durata: 30, partecipantiMin: 3, partecipantiMax: 6 }
      ]
    },
    {
      nome: 'Lucia Bianchi',
      giochi: []
    }
  ];

  filtroForm: FormGroup;
  utenteCorrente: any;
  
  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      nome: [''],
      genere: [''],
      partecipantiMin: [''],
      partecipantiMax: ['']
    });
  }
  
  apriDrawer(utente: any) {
    this.utenteCorrente = utente;
    this.filtroForm.reset();
    const offcanvasElement = document.getElementById('drawerFiltri');
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement!);
    offcanvas.show();
  }
  
  applicaFiltri() {
    const filtri = this.filtroForm.value;
    const giochiOriginali = this.utenteCorrente.giochiOriginali || this.utenteCorrente.giochi;
    
    this.utenteCorrente.giochiOriginali = giochiOriginali; // salvataggio originale
  
    this.utenteCorrente.giochi = giochiOriginali.filter((g: any) => {
      return (!filtri.nome || g.nome.toLowerCase().includes(filtri.nome.toLowerCase())) &&
             (!filtri.genere || g.genere === filtri.genere) &&
             (!filtri.partecipantiMin || g.partecipantiMin >= +filtri.partecipantiMin) &&
             (!filtri.partecipantiMax || g.partecipantiMax <= +filtri.partecipantiMax);
    });
  }
  
}