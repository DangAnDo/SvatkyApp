import { Component } from '@angular/core';
import { SvatkyapiService  } from '../services/svatkyapi.service';    // Import služby pro získání svátků
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

  constructor(private namedayService: SvatkyapiService ) {}

  // Automaticky zobrazí dnešní svátky
  ngOnInit() {
    this.todayNameday();
  }

  // Načtění dnešních svátků
  todayNameday() {
    this.namedayService.getTodayNameday().subscribe(
      (data: any) => {this.nameday = data.name; }
    );
  }

  // Načtění svátky na základě zvoleného datumu
  dateNameday(event: any) {
    const selectedDate = new Date(event.detail.value);
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Formát 2025-01-05T01:20:00.000Z -> 2025-01-05

    this.namedayService.getNamedayForDate(formattedDate).subscribe(
      (data: any) => { this.nameday = data.name; }
    );
  }
}
