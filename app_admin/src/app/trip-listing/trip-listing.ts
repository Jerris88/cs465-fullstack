import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {

  // Holds the trips displayed on the page
  trips: any[] = [];

  // Loads trip data and refreshes the view
  constructor(
    private tripDataService: TripDataService,
    private cdr: ChangeDetectorRef
  ) {}

  // Loads trips when the page initializes
  ngOnInit(): void {
    this.loadTrips();
  }

  // Retrieves trips from the API and updates the view
  loadTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading trips', err);
      }
    });
  }

  // Updates the list after a trip is deleted
  onTripDeleted(code: string): void {
    this.trips = this.trips.filter(trip => trip.code !== code);
    this.cdr.detectChanges();
  }
}