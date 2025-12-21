import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiBaseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  // HttpClient used to call the backend API
  constructor(private http: HttpClient) {}

  // Gets all trips (adds a cache-buster to avoid stale responses)
  public getTrips(): Observable<any[]> {
    const cacheBuster = Date.now();
    const url = `${apiBaseUrl}/trips?cb=${cacheBuster}`;
    return this.http.get<any[]>(url);
  }

  // Gets one trip by trip code
  public getTripByCode(tripCode: string): Observable<any> {
    const cacheBuster = Date.now();
    const url = `${apiBaseUrl}/trips/${tripCode}?cb=${cacheBuster}`;
    return this.http.get<any>(url);
  }

  // Adds a new trip (secured endpoint later)
  public addTrip(trip: any): Observable<any> {
    const url = `${apiBaseUrl}/trips`;
    return this.http.post<any>(url, trip);
  }

  // Updates an existing trip (secured endpoint later)
  public updateTrip(tripCode: string, trip: any): Observable<any> {
    const url = `${apiBaseUrl}/trips/${tripCode}`;
    return this.http.put<any>(url, trip);
  }

  // Deletes an existing trip (secured endpoint later)
  public deleteTrip(tripCode: string): Observable<any> {
    const url = `${apiBaseUrl}/trips/${tripCode}`;
    return this.http.delete<any>(url);
  }
}