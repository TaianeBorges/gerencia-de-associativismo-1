import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {SharedsService} from './shared/shareds.service';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';

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

    constructor(
        private authService: AuthService,
        private sharedService: SharedsService,
        private route: Router
    ) {
        this.routeEvent(this.route);
    }

    ngOnInit() {
        this.permissionLogin = this.authService.authorizationLogin.subscribe(res => {
            return res;
        });

        this.sharedServiceSubscription = this.sharedService.stateMenu.subscribe(res => {
            this.widthContent = res.open;
        });
    }

    routeEvent(router: Router) {
        router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                if (e.url === '/cadastro' || e.url === '/usuarios/cadastro') {

                    this.widthContent = false;
                    this.urlRegister = true;
                }
            }
        });
    }

    ngOnDestroy() {
        this.sharedServiceSubscription.unsubscribe();
    }
}
