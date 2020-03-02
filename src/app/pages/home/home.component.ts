import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { SharedsService } from 'src/app/shared/shareds.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser;

  constructor(
    private titleService: Title,
    private sharedService: SharedsService,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.sharedService.setTitle('Gerencia de associativismo');

    this.currentUser = JSON.parse(localStorage.getItem('user'));
    
  }

}
