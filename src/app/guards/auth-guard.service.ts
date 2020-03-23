import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {
    private isAuthenticated = false;
    private currentUrl: string;

    constructor(
        private router: Router,
        private authService: AuthService) {

        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
            }
        });
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
                this.router.navigate(['/login'], {queryParams: {url: btoa(this.currentUrl)}});
                this.authService.authorizationLogin.emit(res);
                return false;
            } else {
                return true;
            }
        }, error1 => {
            this.authService.authorizationLogin.emit({authenticate: false});
            this.router.navigate(['/login'], {queryParams: {url: btoa(this.currentUrl)}});
            return false;
        });

        return true;
    }
}
