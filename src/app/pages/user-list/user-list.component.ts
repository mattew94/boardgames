import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IResponseFriendsGames, Utente } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserListComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  utenti: WritableSignal<Utente[]> = signal([]);

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

  ngOnInit() {
    this.userService.getFriendsWithGames().subscribe(res => this.mapUsersAndGamesList(res))
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

  mapUsersAndGamesList(friendsList: IResponseFriendsGames[]) {
  friendsList.forEach(list => {
    this.utenti.set([
      ...this.utenti(),
      {
      nome: list.display_name,
      giochi: list.games
    }])
  })

  console.log(this.utenti());
  
  /* const listaGiochi = response;
  const mappaUtenti = new Map<string, Gioco[]>();
  
  for (const gioco of listaGiochi) {
    const {
      game,
      description,
      type,
      duration,
      players,
      owners,
    } = gioco;

    const [min, max] = players.split('/').map(Number);

    const giocoDettaglio: Gioco = {
      nome: game,
      descrizione: description,
      genere: type,
      durata: duration,
      partecipantiMin: min,
      partecipantiMax: max,
    };

    owners.forEach((owner: string) => {
      if (!mappaUtenti.has(owner)) {
        mappaUtenti.set(owner, []);
      }
      mappaUtenti.get(owner)?.push(giocoDettaglio);
    });
  }

  // Converti la mappa in array finale
  const utenti: Utente[] = Array.from(mappaUtenti.entries()).map(
    ([nome, giochi]) => ({
      nome,
      giochi,
    })
  );

  this.utenti.set(utenti); */
  }
  
}