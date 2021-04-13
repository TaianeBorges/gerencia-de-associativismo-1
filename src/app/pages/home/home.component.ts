import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SharedService} from 'src/app/shared/shared.service';
import {AuthService} from 'src/app/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser;
    auth;
    loaderDemand = false;
    loaderUser = false;
    loaderDashboard = false;
    loaderMarketing = false;

    constructor(
        private titleService: Title,
        private sharedService: SharedService,
        private authService: AuthService) {

        this.authService.authorizationLogin.subscribe(res => {
            this.auth = res;
            this.currentUser = this.authService.getUser();
        });
    }

    ngOnInit() {
        this.sharedService.setTitle('Gerencia de associativismo');
    }

    setLoader(e: string) {
        if (e === 'demand') {
            this.loaderDemand = true;
        }

        if (e === 'user') {
            this.loaderUser = true;
        }

        if (e === 'dashboard') {
            this.loaderDashboard = true;
        }

        if (e === 'loaderMarketing') {
            this.loaderMarketing = true;
        }
    }
}
