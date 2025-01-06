import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';             // Importujeme BehaviorSubject
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})

export class FavoriteService {
  private favoriteNamesSubject = new BehaviorSubject<{ name: string; date: string }[]>([]);
  favoriteNames$ = this.favoriteNamesSubject.asObservable();

  constructor(private storage: Storage) {}

  // Inicializace perzistentní paměti
  async initStorage() {
    await this.storage.create();
    const favorites = (await this.storage.get('favorites')) || [];
    this.favoriteNamesSubject.next(favorites);
  }

  // Načtení oblíbených jmen z paměti
  getFavoriteNames(): { name: string; date: string }[] {
    return this.favoriteNamesSubject.getValue();
  }

  // Přidání nebo odebrání jména z oblíbených
  async toggleFavorite(name: string, date: string) {
    const currentFavorites = this.getFavoriteNames();
    let updatedFavorites: { name: string; date: string }[];

    const index = currentFavorites.findIndex((fav) => fav.name === name);
    if (index > -1) {
      // Odebrat, pokud už je v oblíbených
      updatedFavorites = currentFavorites.filter((fav) => fav.name !== name);
    } else {
      // Přidat nové jméno a datum
      updatedFavorites = [...currentFavorites, { name, date }];
    }

    this.favoriteNamesSubject.next(updatedFavorites);
    await this.storage.set('favorites', updatedFavorites);
  }
}
