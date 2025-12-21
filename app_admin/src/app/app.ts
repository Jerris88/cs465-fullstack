import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Enables NgIf and common directives
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,

  // CommonModule is required for *ngIf in app.html
  imports: [CommonModule, RouterOutlet, RouterLink],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Travlr Getaways Admin';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Removed auto-redirect to /login so the default route can land on /trips
  }

  // True when a JWT token is stored (basic logged-in check)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('travlr-token');
  }

  // True when the current route is the login page (prevents duplicate login UI)
  isLoginRoute(): boolean {
    return this.router.url.startsWith('/login');
  }

  // Clears token and returns user to login screen
  logout(): void {
    localStorage.removeItem('travlr-token');
    this.router.navigate(['/login']);
  }
}