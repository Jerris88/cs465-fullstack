import { Routes } from '@angular/router';

// Application routes for the admin SPA
export const routes: Routes = [
  // Default route sends users to the login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login route (standalone component file is login.ts)
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.LoginComponent)
  },

  // Trip listing route (post-login destination)
  {
    path: 'trips',
    loadComponent: () =>
      import('./trip-listing/trip-listing').then(m => m.TripListingComponent)
  },

  // Add trip route (admin only)
  {
    path: 'add-trip',
    loadComponent: () =>
      import('./add-trip/add-trip').then(m => m.AddTripComponent)
  },

  // Edit trip route (admin only)
  {
    path: 'edit-trip/:tripCode',
    loadComponent: () =>
      import('./edit-trip/edit-trip').then(m => m.EditTripComponent)
  },

  // Catch-all route redirects back to login
  { path: '**', redirectTo: 'login' }
];