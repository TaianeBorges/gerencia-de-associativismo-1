import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  permissionLogin: any = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authorizationLogin.subscribe(res => {
      this.permissionLogin = res;
    });
  }

}
