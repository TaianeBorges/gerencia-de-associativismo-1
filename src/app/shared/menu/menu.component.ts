import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() permission: boolean;
  auth = {};

  routeDemandManagement = false;
  routeWhoIs = false;
  routeSites = false;

  constructor(private authService: AuthService, private router: Router, activatedRoute: ActivatedRoute) {

    router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.routeDemandManagement = res.url.indexOf('/gestao-de-demandas/') !== (-1);
        this.routeWhoIs = res.url.indexOf('/quem-e-quem/') !== (-1);
        this.routeSites = res.url.indexOf('/sites/') !== (-1);
      } 
    });
  }

  ngOnInit() {
    this.authService.authorizationLogin.subscribe(res => {
      this.auth = res;
    });


  }

  linkMenu(value) {
    this.router.navigate([value]);
  }
}
