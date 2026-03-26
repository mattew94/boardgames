import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { IResponseCurrentUserGames } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NgbCollapseModule],
  providers: [UserService],
  standalone: true
})
export class ProfiloComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  giochi: WritableSignal<IResponseCurrentUserGames[]> = signal([]);
  giocoForm: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;

  filtroForm: FormGroup;
  giocoSelezionato: any = null;

  amici = [
    { id: 1, nome: 'Luca' },
    { id: 2, nome: 'Giulia' },
    { id: 3, nome: 'Paolo' }
  ];

  amicoDaRimuovere: any = null;

  constructor(private fb: FormBuilder) {
    this.giocoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      min_players: [2, [Validators.required, Validators.min(1)]],
      max_players: [4, [Validators.required, Validators.min(1)]],
      duration: [30, [Validators.required, Validators.min(1)]], // durata in minuti
      genre: ['', Validators.required]
    });

    this.filtroForm = this.fb.group({
      name: [''],
      genre: [''],
      min_players: [''],
      max_players: ['']
    });
  }

  ngOnInit() {
    this.userService.getCurrentUserGames().subscribe((res: IResponseCurrentUserGames[]) => this.giochi.set(res))
  }

  confermaRimozione(amico: any) {
    this.amicoDaRimuovere = amico;
    const modalEl = document.getElementById('modalConfermaEliminazione');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  rimuoviAmico() {
    if (!this.amicoDaRimuovere) return;
    this.amici = this.amici.filter(a => a.id !== this.amicoDaRimuovere.id);
    const modalEl = document.getElementById('modalConfermaEliminazione');
    if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
    this.amicoDaRimuovere = null;
  }

apriConfermaEliminazione(gioco: any) {
  console.log(gioco);
  
  this.giocoSelezionato = gioco;
  const modalEl = document.getElementById('confermaEliminazioneModal');
  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

confermaEliminazione() {
  if (this.giocoSelezionato.id) {
    this.eliminaGioco(this.giocoSelezionato.id);
    const modalEl = document.getElementById('confermaEliminazioneModal');
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    bsModal.hide();
  }
}

  aggiungiGioco() {
    if (this.giocoForm.invalid) return;
    
    this.userService.addNewGame({ ...this.giocoForm.getRawValue()})
      .subscribe(res => {
        if(res.message === "Game added") {
              this.userService.getCurrentUserGames().subscribe((res: IResponseCurrentUserGames[]) => this.giochi.set(res))
              this.giocoForm.reset();
        }
      });
    

    /* if (this.isEditing && this.editingId !== null) {
      // Modifica
      const index = this.giochi.findIndex(g => g.id === this.editingId);
      if (index > -1) {
        this.giochi[index] = {
          id: this.editingId,
          ...this.giocoForm.value,
        };
      }
      this.isEditing = false;
      this.editingId = null;
    } else {
      // Aggiunta
      const nuovoGioco: Gioco = {
        id: Date.now(),
        ...this.giocoForm.value,
      };
      this.giochi.push(nuovoGioco);
    }

    this.giocoForm.reset();
    if (this.giocoForm.invalid) return;

  if (this.isEditing && this.editingId !== null) {
    const index = this.giochi().findIndex(g => g.id === this.editingId);
    if (index > -1) {
      const giocoEsistente = this.giochi()[index];
      this.giochi()[index] = {
        id: this.editingId,
        ...this.giocoForm.value,
        owners: giocoEsistente.owners
      };
    }
    this.isEditing = false;
    this.editingId = null;
  } */ 
 
    /* 
  TODO: rivedere questa logica
  else {
    const nuovoGioco: Gioco = {
      id: Date.now(),
      ...this.giocoForm.value,
      owners: [this.authService.getCurrentUser()] // <-- o quello che serve
    };
    this.giochi.push(nuovoGioco);
  } */
  }

  modificaGioco(gioco: IResponseCurrentUserGames) {
    this.giocoForm.setValue({
      name: gioco.name,
      description: gioco.description,
      min_players: gioco.min_players,
      max_players: gioco.max_players,
      duration: gioco.duration,
      genre: gioco.genre,
    });
    this.isEditing = true;
    /* this.editingId = gioco.id; */

    const collapseElement = document.getElementById('collapseForm');
  if (collapseElement && !collapseElement.classList.contains('show')) {
    const collapseInstance = new bootstrap.Collapse(collapseElement, {
      toggle: true,
    });
    collapseInstance.show();
  }
  }

  eliminaGioco(id: string) {
    this.userService.removeGameFromCurrentUser(id).subscribe(res => {
      if(res.message === "Game removed") {
        this.giocoSelezionato = null;
        this.userService.getCurrentUserGames().subscribe((res: IResponseCurrentUserGames[]) => this.giochi.set(res))
      }
    })
  }

  annullaModifica() {
    this.giocoForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }

  apriDrawer() {
    const drawerElement = document.getElementById('drawerFiltri');
    const bsDrawer = new bootstrap.Offcanvas(drawerElement);
    bsDrawer.show();
  }

  applicaFiltri() {
    const filtri = this.filtroForm.value;
    const giochiOriginali = this.giochi;
  
  /* TODO: rivedere questa logica */
    /* this.giochi = giochiOriginali.filter((g: any) => {
      return (!filtri.nome || g.nome.toLowerCase().includes(filtri.nome.toLowerCase())) &&
             (!filtri.genere || g.genere === filtri.genere) &&
             (!filtri.partecipantiMin || g.partecipantiMin >= +filtri.partecipantiMin) &&
             (!filtri.partecipantiMax || g.partecipantiMax <= +filtri.partecipantiMax);
    }); */
  }
}
