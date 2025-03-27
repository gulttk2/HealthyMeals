import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(private router: Router) {}

  redirect(page: string) {
    this.router.navigate([page]);
  }
  logout() {
    localStorage.removeItem('token'); // Kullanıcıyı çıkış yaptır.
    this.router.navigate(['/login']); // Giriş ekranına yönlendir.
  }
}
