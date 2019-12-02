import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SharedsService } from './shared/shareds.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gerencia-de-associativismo';
  permissionLogin: any = {
    authenticate: false
  };
  widthContent = true;
  urlRegister = false;

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

    this.sharedService.stateMenu.subscribe(res => {
      this.widthContent = res.open;
    });
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/cadastro' || e.url === '/usuario/cadastro') {

          this.widthContent = false;
          this.urlRegister = true;
        }
      }
    });
  }
}
