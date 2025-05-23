import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // JWT varsa giriş yapılmış demektir.
  }

  redirect(page: string) {
    this.router.navigate([page]);
  }

  logout() {
    localStorage.removeItem('token'); // Kullanıcıyı çıkış yaptır.
    this.router.navigate(['/login']); // Giriş ekranına yönlendir.
  }
}