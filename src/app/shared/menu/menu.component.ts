import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() permission: boolean;
  userProfile = {};
  constructor(private user: UsersService, private auth: AuthService) { }

  ngOnInit() {
    this.user.getUserAuthenticated().subscribe((res: any) => {
      this.userProfile = res.user;
    });
  }

}
