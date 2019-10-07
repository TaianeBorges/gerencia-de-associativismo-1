import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    this.isLoggedIn().subscribe(res => {
      if (!res.authenticate) {
        this.router.navigate(['/login']);
        return false;
      }
    },
      error => {
        console.log(`Ocorreu o seguinte erro: ${error}`);
        return false;
      });

    return true;
  }

  canActivate() {
    this.isLoggedIn().subscribe(res => {
      if (!res.authenticate) {
        this.router.navigate(['/login']);
        return false;
      }
    },
      error => {
        console.log(`Ocorreu o seguinte erro: ${error}`);
        return false;
      });
  }

  isLoggedIn(): Observable<any> {
    return this.authService.checkAuthorization();
  }
}
