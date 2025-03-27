// app.component.ts
import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, RouterModule } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent,RouterModule,CommonModule]
})
export class AppComponent {
  showNavbar = true;

  constructor(private router: Router) {
    // Angular'ın router events'ini dinleyerek navbar'ın görünürlüğünü kontrol et
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      debugger
        this.showNavbar = !event.url.includes('/admin');
      }
    });
  }
}
