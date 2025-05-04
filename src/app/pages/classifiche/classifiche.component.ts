import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-classifiche',
  templateUrl: './classifiche.component.html',
  styleUrls: ['./classifiche.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ClassificheComponent {
  giocoSelezionato: string = '';
  giochiDisponibili: string[] = ['Monopoli', 'Catan', 'Carcassonne'];

  utentiDisponibili: string[] = ['Luca', 'Maria', 'Giulia', 'Paolo'];

  partite: any[] = [];

  partitaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.partitaForm = this.fb.group({
      partecipanti: [[]],
      vincitore: [''],
      tempo: [0]
    });
  }

  get partitePerGioco() {
    return this.partite.filter(p => p.gioco === this.giocoSelezionato);
  }

  get classifica() {
    const stats: { [nome: string]: { vittorie: number; giocate: number } } = {};

    this.partitePerGioco.forEach(p => {
      p.partecipanti.forEach((nome: string) => {
        if (!stats[nome]) stats[nome] = { vittorie: 0, giocate: 0 };
        stats[nome].giocate++;
      });

      if (p.vincitore && stats[p.vincitore]) {
        stats[p.vincitore].vittorie++;
      }
    });

    return Object.entries(stats)
      .map(([nome, dati]) => ({
        nome,
        vittorie: dati.vittorie,
        giocate: dati.giocate
      }))
      .sort((a, b) => b.vittorie - a.vittorie || a.nome.localeCompare(b.nome));
  }

  aggiungiPartita() {
    const { partecipanti, vincitore, tempo } = this.partitaForm.value;

    if (!this.giocoSelezionato || !partecipanti.length || !vincitore) return;

    this.partite.push({
      gioco: this.giocoSelezionato,
      partecipanti,
      vincitore,
      tempo
    });

    this.partitaForm.reset({ partecipanti: [], vincitore: '', tempo: 0 });
    // Chiudi drawer
    const drawerEl = document.getElementById('drawerPartita');
if (drawerEl) {
  const drawerInstance = bootstrap.Offcanvas.getInstance(drawerEl);
  drawerInstance?.hide();
}
  }
}