import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';             // Importujeme BehaviorSubject
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})

export class FavoriteService {
  private favoriteNamesSubject = new BehaviorSubject<string[]>([]);
  favoriteNames$ = this.favoriteNamesSubject.asObservable();

  constructor(private storage: Storage) {}

  // Inicializace perzistentní paměti
  async initStorage() {
    await this.storage.create();
    const favorites = (await this.storage.get('favorites')) || [];
    this.favoriteNamesSubject.next(favorites);
  }

  // Načtení oblíbených jmen z paměti
  getFavoriteNames(): string[] {
    return this.favoriteNamesSubject.getValue();
  }

  // Přidání nebo odebrání jména z oblíbených
  async toggleFavorite(name: string) {
    const currentFavorites = this.getFavoriteNames();
    let updatedFavorites: string[];

    if (currentFavorites.includes(name)) {
      updatedFavorites = currentFavorites.filter((fav) => fav !== name);
    } else {
      updatedFavorites = [...currentFavorites, name];
    }

    this.favoriteNamesSubject.next(updatedFavorites);
    await this.storage.set('favorites', updatedFavorites);
  }
}
