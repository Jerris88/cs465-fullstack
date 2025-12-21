import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,

  // Import common directives and template-driven forms
  imports: [CommonModule, FormsModule],

  // HTML and CSS files for the login component
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  // Object bound to the login form inputs
  credentials = {
    email: '',
    password: ''
  };

  // Message displayed when login fails
  errorMessage = '';

  // Inject HTTP client for API calls and router for navigation
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Returns to the trip listing screen (no login required)
  goToTrips(): void {
    this.router.navigate(['/trips']);
  }

  // Called when the login form is submitted
  onLogin(): void {
    // Clear any previous error message
    this.errorMessage = '';

    // Send login credentials to the backend API
    this.http
      .post<{ token: string }>(
        'http://localhost:3000/api/login',
        this.credentials
      )
      .subscribe({
        // Successful authentication
        next: (res) => {
          // Store JWT for use in protected requests
          localStorage.setItem('travlr-token', res.token);

          // Redirect to the trips page after login
          this.router.navigate(['/trips']);
        },

        // Failed authentication or server error
        error: () => {
          this.errorMessage = 'Login failed. Check email and password.';
        }
      });
  }
}