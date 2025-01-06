import { Component } from '@angular/core';
import { SvatkyapiService } from '../services/svatkyapi.service'; // Import služby pro získání svátků
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class Tab1Page {
  nameday: string | null = null;
  showRowView: boolean = false;    // Stav, zda zobrazovat řádkový kalendář
  rowNamedays: any[] = [];         // Svátky pro zobrazení v řádkovém kalendáři
  currentYear: number = new Date().getFullYear();  // Aktuální rok

  constructor(private namedayService: SvatkyapiService) {}

  // Automaticky zobrazí dnešní svátky
  ngOnInit() {
    this.todayNameday();
  }

  // Načtění dnešních svátků
  todayNameday() {
    this.namedayService.getTodayNameday().subscribe(
      (data: any) => {
        this.nameday = data.name;
      }
    );
  }

  // Načtění svátků na základě zvoleného datumu
  dateNameday(event: any) {
    const selectedDate = new Date(event.detail.value);
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Formát YYYY-MM-DD

    this.namedayService.getNamedayForDate(formattedDate).subscribe(
      (data: any) => {
        this.nameday = data.name;
      }
    );
  }

  // Přepnutí mezi klasickým kalendářem a řádkovým zobrazením
  toggleView() {
    this.showRowView = !this.showRowView;
    if (this.showRowView) {
      this.loadLinearNamedays(new Date().getMonth() + 1); // Načtení aktuálního měsíce
    }
  }

  // Načtení svátků pro řádkové zobrazení (např. celý měsíc)
  loadLinearNamedays(month: number) {
    const daysInMonth = new Date(this.currentYear, month, 0).getDate();

    // Pro všechny dny v měsíci voláme API
    this.rowNamedays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${this.currentYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Formát YYYY-MM-DD
      this.namedayService.getNamedayForDate(date).subscribe(
        (data: any) => { this.rowNamedays.push({ date: this.formatedDate(date), name: data.name });   // Uložení do pole (push) CZ formát datum, jméno: API odpověď

        // Seřazení svátků podle data
        this.rowNamedays.sort((a, b) => {
          return this.parseDate(a.date) - this.parseDate(b.date);       // Vrátí a, pokud je výsledek záporný, jinak b
        });
      });                    
    }
  }

    // Převod datumu z formátu YYYY-MM-DD na DD.MM.YYYY
    private formatedDate(date: string): string {
      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    }

    // Převod datumu z formátu DD.MM.YYYY na timestamp pro řazení (timestamp udává počet milisekund od 1.1.1970)
    private parseDate(date: string): number {
      const [day, month, year] = date.split('.');
      return new Date(`${year}-${month}-${day}`).getTime();
    }
}
