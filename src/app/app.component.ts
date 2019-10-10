import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gerencia-de-associativismo';
  permissionLogin: any = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authorizationLogin.subscribe(res => {
      this.permissionLogin = res;
    });
  }
}
