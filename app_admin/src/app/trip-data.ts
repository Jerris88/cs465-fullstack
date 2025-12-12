import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiBaseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http: HttpClient) {}

  public getTrips(): Observable<any[]> {
    const url = `${apiBaseUrl}/trips`;
    return this.http.get<any[]>(url);
  }

  public getTripByCode(tripCode: string): Observable<any> {
    const url = `${apiBaseUrl}/trips/${tripCode}`;
    return this.http.get<any>(url);
  }

  public addTrip(trip: any): Observable<any> {
    const url = `${apiBaseUrl}/trips`;
    return this.http.post<any>(url, trip);
  }

  public updateTrip(tripCode: string, trip: any): Observable<any> {
    const url = `${apiBaseUrl}/trips/${tripCode}`;
    return this.http.put<any>(url, trip);
  }

  public deleteTrip(tripCode: string): Observable<any> {
    const url = `${apiBaseUrl}/trips/${tripCode}`;
    return this.http.delete<any>(url);
  }
}