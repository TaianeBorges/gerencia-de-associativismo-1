import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {SharedService} from './shared/shared.service';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'gerencia-de-associativismo';
    permissionLogin: any = {
        authenticate: false
    };
    widthContent = true;
    urlRegister = false;
    sharedServiceSubscription: Subscription;
    environmentStatus;
    auth;
    currentUser;

    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private route: Router
    ) {
        this.routeEvent(this.route);

        this.authService.authorizationLogin.subscribe(res => {
            this.auth = res;
            this.currentUser = this.authService.getUser();
        });
    }

    ngOnInit() {
        this.sharedServiceSubscription = this.sharedService.stateMenu.subscribe(res => {
            this.widthContent = res.open;
        });

        this.environmentStatus = environment;
    }

    routeEvent(router: Router) {
        router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                if (e.url === '/cadastro' || e.url === '/usuarios/cadastro') {

                    this.widthContent = false;
                    this.urlRegister = true;
                } else {
                    this.urlRegister = false;
                }
            }
        });
    }

    ngOnDestroy() {
        this.sharedServiceSubscription.unsubscribe();
    }
}
