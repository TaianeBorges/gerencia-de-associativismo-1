import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() permission: boolean;
  auth = {};
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authorizationLogin.subscribe(res => {
      this.auth = res;
    });
  }

  linkMenu(value) {
    this.router.navigate([value]);
  }
}
