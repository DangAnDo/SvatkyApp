import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';

import { FormsModule } from '@angular/forms'; // Import FormsModule pro ngModel


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})

export class Tab3Page {
  favoriteNames: { name: string; date: string }[] = [];                  // Pole oblíbených jmen
  sortBy: string = 'date-asc';                                          // Výchozí způsob řazení: podle data vzestupně

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteService.favoriteNames$.subscribe((favorites) => {
      this.favoriteNames = favorites;
      this.sortFavorites(); // Seřadit podle aktuálního způsobu
    });
  }

  // Seřazení oblíbených podle zvoleného způsobu
  sortFavorites() {
    if (this.sortBy === 'date-asc') {
      this.favoriteNames.sort((a, b) => this.compareDates(a.date, b.date));     // Podle data vzestupně
    } else if (this.sortBy === 'date-desc') {
      this.favoriteNames.sort((a, b) => this.compareDates(b.date, a.date));     // Podle data sestupně
    } else if (this.sortBy === 'name-asc') {
      this.favoriteNames.sort((a, b) => a.name.localeCompare(b.name));          // Podle jména vzestupně
    } else if (this.sortBy === 'name-desc') {
      this.favoriteNames.sort((a, b) => b.name.localeCompare(a.name));          // Podle jména sestupně
    }
  }

  // Funkce pro porovnání dat ve formátu DD.MM.YYYY
  private compareDates(dateA: string, dateB: string): number {
    const [dayA, monthA, yearA] = dateA.split('.').map(Number);
    const [dayB, monthB, yearB] = dateB.split('.').map(Number);

    // Převod na timestamp
    const timestampA = new Date(yearA, monthA - 1, dayA).getTime(); 
    const timestampB = new Date(yearB, monthB - 1, dayB).getTime();

    // Vrátí timestampA, pokud je kladný, jinak timestampB
    return timestampA - timestampB;
  }

  // Aktualizace způsobu řazení na základě volby uživatele
  onSortChange(event: any) {
    this.sortBy = event.detail.value; // Získat novou hodnotu z dropdown menu
    this.sortFavorites();             // Přerovnat seznam
  }
}
