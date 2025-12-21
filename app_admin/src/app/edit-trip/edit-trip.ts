import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,

  // CommonModule enables directives and FormsModule supports ngModel binding
  imports: [CommonModule, FormsModule, RouterLink],

  // Template and styles for the edit form
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTripComponent implements OnInit {

  // Stores the route parameter used to load the correct trip
  tripCode = '';

  // Holds the trip data bound to the form fields
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

  // Displays a message when validation or API calls fail
  formError = '';

  // ActivatedRoute reads the tripCode and ChangeDetectorRef forces the form to refresh
  constructor(
    private route: ActivatedRoute,
    private tripDataService: TripDataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Loads the trip record when the edit page opens
  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';

    if (this.tripCode) {
      this.tripDataService.getTripByCode(this.tripCode).subscribe({
        // Populates the form model with the trip data from the API
        next: (data) => {
          this.trip = data;

          // Forces the form inputs to update immediately after async load
          this.cdr.detectChanges();
        },

        // Handles failed API calls
        error: (err) => {
          console.error('Error loading trip for edit', err);
          this.formError = 'Could not load trip.';
        }
      });
    }
  }

  // Submits updated trip data back to the API
  onSubmit(): void {
    this.formError = '';

    // Basic required field checks before saving
    if (
      !this.trip.code ||
      !this.trip.name ||
      !this.trip.length ||
      !this.trip.start ||
      !this.trip.resort ||
      !this.trip.perPerson
    ) {
      this.formError = 'Please fill in all required fields.';
      return;
    }

    // Sends the update request to the backend
    this.tripDataService.updateTrip(this.tripCode, this.trip).subscribe({
      // Returns to trip listing on success
      next: () => {
        this.router.navigate(['/trips']);
      },

      // Displays an error if the update fails
      error: (err) => {
        console.error('Error updating trip', err);
        this.formError = 'There was a problem saving the trip.';
      }
    });
  }
}