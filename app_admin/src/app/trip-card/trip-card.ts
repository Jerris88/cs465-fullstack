import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent {
  @Input() trip: any;
  @Output() deleted = new EventEmitter<string>();

  constructor(private tripDataService: TripDataService) {}

  deleteTrip(): void {
    if (!confirm('Are you sure you want to delete this trip?')) {
      return;
    }

    this.tripDataService.deleteTrip(this.trip.code).subscribe({
      next: () => {
        this.deleted.emit(this.trip.code);
      },
      error: (err) => {
        console.error('Error deleting trip', err);
        alert('There was a problem deleting this trip.');
      }
    });
  }
}