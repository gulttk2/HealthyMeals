import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoNavbarGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (state.url.includes('/admin')) {
        // Admin paneline giriliyorsa navbar'ı gizleyebilirsiniz
        return false; // Navbar gösterilmesin
      }
      return true; // Diğer sayfalarda navbar gösterilsin
  }
}
