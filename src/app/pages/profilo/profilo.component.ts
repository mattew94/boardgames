import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;

interface Gioco {
  id: number;
  nome: string;
  descrizione: string;
  partecipantiMin: number;
  partecipantiMax: number;
  durata: number;
  genere: string;
}

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, NgbCollapseModule],
  standalone: true
})
export class ProfiloComponent {
  giochi: Gioco[] = [];
  giocoForm: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.giocoForm = this.fb.group({
      nome: ['', Validators.required],
      descrizione: ['', Validators.required],
      partecipantiMin: [2, [Validators.required, Validators.min(1)]],
      partecipantiMax: [4, [Validators.required, Validators.min(1)]],
      durata: [30, [Validators.required, Validators.min(1)]], // durata in minuti
      genere: ['', Validators.required]
    });
  }

  aggiungiGioco() {
    if (this.giocoForm.invalid) return;

    if (this.isEditing && this.editingId !== null) {
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
  }

  modificaGioco(gioco: Gioco) {
    this.giocoForm.setValue({
      nome: gioco.nome,
      descrizione: gioco.descrizione,
      partecipantiMin: gioco.partecipantiMin,
      partecipantiMax: gioco.partecipantiMax,
      durata: gioco.durata,
      genere: gioco.genere,
    });
    this.isEditing = true;
    this.editingId = gioco.id;

    const collapseElement = document.getElementById('collapseForm');
  if (collapseElement && !collapseElement.classList.contains('show')) {
    const collapseInstance = new bootstrap.Collapse(collapseElement, {
      toggle: true,
    });
    collapseInstance.show();
  }
  }

  eliminaGioco(id: number) {
    this.giochi = this.giochi.filter(g => g.id !== id);
    if (this.editingId === id) {
      this.giocoForm.reset();
      this.isEditing = false;
      this.editingId = null;
    }
  }

  annullaModifica() {
    this.giocoForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }
}
