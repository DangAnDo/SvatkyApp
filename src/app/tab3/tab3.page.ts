import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})

export class Tab3Page {
  favoriteNames: string[] = [];                  // Pole oblíbených jmen

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.initStorage();
    this.loadFavorites();
  }

  private async initStorage() {
    await this.storage.create();
  }

  private async loadFavorites() {
    const favorites = await this.storage.get('favorites');
    this.favoriteNames = favorites || [];
  }
}