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
      this.loadLinearNamedays();
    }
  }

  // Načtení svátků pro řádkové zobrazení (např. celý měsíc)
  loadLinearNamedays() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Indexování od 0
    const daysInMonth = new Date(year, month, 0).getDate();

    // Pro všechny dny v měsíci voláme API
    this.rowNamedays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;   // Formát YYYY-MM-DD
      this.namedayService.getNamedayForDate(date).subscribe(
        (data: any) => { this.rowNamedays.push({ date, name: data.name }); });                    // Uložení do pole (push) s datum, jméno: API odpověď
    }
  }
}
