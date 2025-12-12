import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Travlr Getaways Admin';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Force the initial view to /trips so the list shows without clicking
    if (this.router.url === '/' || this.router.url === '') {
      this.router.navigate(['/trips']);
    }
  }
}