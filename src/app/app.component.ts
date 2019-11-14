import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SharedsService } from './shared/shareds.service';

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

  constructor(
    private authService: AuthService,
    private sharedService: SharedsService
  ) {

  }

  ngOnInit() {
    this.permissionLogin = this.authService.authorizationLogin.subscribe(res => {
      return res;
    });

    this.sharedService.stateMenu.subscribe(res => {
      this.widthContent = res.open;
    });
  }
}
