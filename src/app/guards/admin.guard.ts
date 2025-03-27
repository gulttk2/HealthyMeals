import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getUserRole();
    if (role !== 'Admin') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
