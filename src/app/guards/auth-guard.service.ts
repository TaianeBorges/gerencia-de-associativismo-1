import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.isLoggedIn();
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.isLoggedIn();
    }

    login(): any {
        return this.isLoggedIn();
    }

    isLoggedIn(): boolean {

        this.authService.checkAuthorization().subscribe(res => {
            if (!res.authenticate) {
                this.router.navigate(['/login']);
                this.authService.authorizationLogin.emit(res);
                return false;
            } else {
                return true;
            }
        }, error1 => {

            this.authService.authorizationLogin.emit({authenticate: false});
            this.router.navigate(['/login']);
            return false;
        });

        return true;
    }
}
