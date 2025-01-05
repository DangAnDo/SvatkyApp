import { Component } from '@angular/core';
import { SvatkyapiService } from '../services/svatkyapi.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})

export class Tab2Page {
  inputDate: string = ''; // Uživatelem zadané datum
  result: string | null = null; // Výsledek vyhledávání

  constructor(private svatkyapiService: SvatkyapiService) {}

  // Vyhledávání podle datumu
  searchByDate() {
    // Zkontroluj, zda uživatel zadal datum
    if (!this.inputDate) {
      this.result = 'Zadejte prosím datum.';
      return;
    }
  
    // Zavolej službu pro získání svátku na zadané datum
    this.svatkyapiService.getNamedayForDate(this.inputDate).subscribe({
      next: (data: any) => { this.result = data.name ? data.name : 'Jméno nenalezeno pro zadané datum.'; },   // Vrátí jméno nebo chybovou hlášku

      error: (err: any) => { this.result = 'Datum není podle formátu.'; },                                    // V případě chyby zobrazí chybovou hlášku
    });
  }
}
  
