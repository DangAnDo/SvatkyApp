import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FavoriteService } from './services/favorite.service'; // Import ručně FavoriteService
import { SvatkyapiService } from './services/svatkyapi.service'; // Import ručně SvatkyapiService


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),     // Přidání Ionic Storage
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    FavoriteService,
    SvatkyapiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// ionic capacitor run android -l --external
