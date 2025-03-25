import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Token kontrolü yapıyoruz
    if (this.authService.isAuthenticated()) {
      // Token varsa, home sayfasına yönlendiriyoruz
      return true;
    } else {
      // Token yoksa, login sayfasına yönlendiriyoruz
      this.router.navigate(['/login']);
      return false;
    }
  }
}
