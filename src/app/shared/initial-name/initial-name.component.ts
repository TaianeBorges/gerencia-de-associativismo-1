import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-initial-name',
  templateUrl: './initial-name.component.html',
  styleUrls: ['./initial-name.component.scss']
})
export class InitialNameComponent implements OnInit {

  @Input('user') user;
  userHover: boolean;
  
  constructor() { }

  ngOnInit() {

  }

}
