import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    const permission = this.isLoggedIn();

    if (!permission) {
      this.router.navigate(['/login']);
    }

    return permission;
  }

  isLoggedIn() {
    return this.authService.checkAuthorization();
  }
}
