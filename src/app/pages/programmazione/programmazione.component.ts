import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-programmazione',
  templateUrl: './programmazione.component.html',
  styleUrls: ['./programmazione.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProgrammazioneComponent {
    eventoForm: FormGroup;
    eventi: any[] = [];
  
    eventoSelezionato: any = null;
  
    constructor(private fb: FormBuilder) {
      this.eventoForm = this.fb.group({
        nome: ['', Validators.required],
        descrizione: ['', Validators.required],
        luogo: ['', Validators.required],
        data: ['', Validators.required],
        orario: ['', Validators.required]
      });
    }
  
    aggiungiEvento() {
      if (this.eventoForm.valid) {
        this.eventi.push(this.eventoForm.value);
        
        this.eventoForm.reset();
      }
    }
  
    apriDettagli(evento: any) {
      this.eventoSelezionato = evento;
      const modal = new bootstrap.Modal(document.getElementById('eventoModal')!);
      modal.show();
    }

    eventoScaduto(dataEvento: string): boolean {
      const oggi = new Date();
      const data = new Date(dataEvento);
      // Consideriamo solo la data, non l'orario
      data.setHours(0, 0, 0, 0);
      oggi.setHours(0, 0, 0, 0);
      return data < oggi;
    }
}
