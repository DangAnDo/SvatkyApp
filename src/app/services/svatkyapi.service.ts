import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SvatkyapiService {
  private baseUrl = 'https://svatkyapi.cz/api/day';

  constructor(private http: HttpClient) {}

  // Získat dnešní svátek
  getTodayNameday(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
    // Reguest URL: https://svatkyapi.cz/api/day
  }

  // Získat svátek pro konkrétní datum
  getNamedayForDate(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${date}`);
    // Reguest URL: https://svatkyapi.cz/api/day/YYYY-MM-DD
  }
}
