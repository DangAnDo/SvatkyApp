import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})

export class Tab3Page {
  favoriteNames: { name: string; date: string }[] = [];                  // Pole oblíbených jmen

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteService.favoriteNames$.subscribe((favorites) => {
      this.favoriteNames = favorites;
    });
  }
}
