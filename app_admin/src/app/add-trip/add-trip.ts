import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTripComponent {
  trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  formError = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.formError = '';

    // very basic required-fields check
    if (!this.trip.code || !this.trip.name || !this.trip.length ||
        !this.trip.start || !this.trip.resort || !this.trip.perPerson) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        // after successful save, go back to the list
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        console.error('Error adding trip', err);
        this.formError = 'There was a problem saving the trip.';
      }
    });
  }
}