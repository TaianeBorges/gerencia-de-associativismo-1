import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SharedsService} from '../shareds.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() permission: boolean;
    auth: any;

    routeDemandManagement = false;
    routeWhoIs = false;
    routeSites = false;
    titlePage;
    menuActivate = false;
    menuMobileActivate = false;
    menuPerfilActivate = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private sharedsService: SharedsService
    ) {

        router.events.subscribe((res) => {
            if (res instanceof NavigationEnd) {
                this.routeDemandManagement = (res.url.indexOf('/gestao-de-demandas') !== (-1) || res.url.indexOf('/usuarios') !== (-1));
                this.routeWhoIs = res.url.indexOf('/quem-e-quem/') !== (-1);
                this.routeSites = res.url.indexOf('/sites/') !== (-1);
            }
        });

        this.authService.authorizationLogin.subscribe(res => {
            this.auth = res;
        });
    }

    ngOnInit() {
        this.sharedsService.actionMenu(this.menuActivate);

        this.sharedsService.titlePage.subscribe(res => {
            this.titlePage = res;
        });

    }

    changeMenu() {
        this.menuActivate = !this.menuActivate;
        this.sharedsService.actionMenu(this.menuActivate);
    }


    linkMenu(value) {
        this.router.navigate([value]);
    }
}
