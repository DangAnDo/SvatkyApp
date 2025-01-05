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

    // Naformátování datumu, pokud uživatel nezadá rok
    const formattedDate = this.formatDateWithYear(this.inputDate);
    if (!formattedDate) {
      this.result = 'Nepodporovaný datum.';
      return;
    }
  
    // Zavolej službu pro získání svátku na zadané datum
    this.svatkyapiService.getNamedayForDate(formattedDate).subscribe({
      next: (data: any) => { this.result = data.name ? data.name : 'Jméno nenalezeno pro zadané datum.'; },   // Vrátí jméno nebo chybovou hlášku

      error: (err: any) => { this.result = 'Datum není podle formátu.'; },                                    // V případě chyby zobrazí chybovou hlášku
    });
  }

  private formatDateWithYear(input: string): string | null {
    const fixedYear = 2024; // Pevně nastavíme přestupný rok 2024
    let formattedDate = null;
  
    const ddMmRegex = /^\d{1,2}\.\d{1,2}\.$/;                   // Např. "29.6."
    if (ddMmRegex.test(input)) {
      const [day, month] = input.split('.');
      const paddedDay = day.padStart(2, '0');                   // Přidá nulu, pokud je den jednociferný
      const paddedMonth = month.padStart(2, '0');               // Přidá nulu, pokud je měsíc jednociferný
      formattedDate = `${fixedYear}-${paddedMonth}-${paddedDay}`;
    }
  
    // Ověří, zda je datum validní
    if (formattedDate && this.isValidDate(formattedDate)) {
      return formattedDate;
    }
    return null;
  }

  private isValidDate(date: string): boolean {
    const parsedDate = new Date(date);

    // Datum je platný objekt typu Date && Datum není "NaN" (neplatné datum) && Datum odpovídá přesně vstupnímu formátu YYYY-MM-DD.
    const isValid = parsedDate instanceof Date &&  !isNaN(parsedDate.getTime()) &&  parsedDate.toISOString().startsWith(date);
    return isValid;
  }
}
  