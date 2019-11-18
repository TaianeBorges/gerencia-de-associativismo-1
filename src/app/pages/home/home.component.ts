import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { SharedsService } from 'src/app/shared/shareds.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, private sharedService: SharedsService) {

  }

  ngOnInit() {
    this.sharedService.setTitle('Gerencia de associativismo');
  }

}
