import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTripComponent implements OnInit {
  tripCode = '';
  trip: any = {
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
    private route: ActivatedRoute,
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';

    if (this.tripCode) {
      this.tripDataService.getTripByCode(this.tripCode).subscribe({
        next: (data) => {
          this.trip = data;
        },
        error: (err) => {
          console.error('Error loading trip for edit', err);
          this.formError = 'Could not load trip.';
        }
      });
    }
  }

  onSubmit(): void {
    this.formError = '';

    if (!this.trip.code || !this.trip.name || !this.trip.length ||
        !this.trip.start || !this.trip.resort || !this.trip.perPerson) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    this.tripDataService.updateTrip(this.tripCode, this.trip).subscribe({
      next: () => {
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        console.error('Error updating trip', err);
        this.formError = 'There was a problem saving the trip.';
      }
    });
  }
}