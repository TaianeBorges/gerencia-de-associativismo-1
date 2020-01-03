import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SharedsService } from '../shareds.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() permission: boolean;
  auth = {};

  routeDemandManagement = false;
  routeWhoIs = false;
  routeSites = false;
  titlePage;
  menuActivate = true;
  menuMobileActivate = false;
  menuPerfilActivate = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
    private sharedsService: SharedsService
  ) {

    router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.routeDemandManagement = res.url.indexOf('/gestao-de-demandas') !== (-1);
        this.routeWhoIs = res.url.indexOf('/quem-e-quem/') !== (-1);
        this.routeSites = res.url.indexOf('/sites/') !== (-1);
      }
    });
  }

  ngOnInit() {
    this.authService.authorizationLogin.subscribe(res => {
      this.auth = res;
    });

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
