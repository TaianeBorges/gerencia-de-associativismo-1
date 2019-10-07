import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge-credit',
  templateUrl: './badge-credit.component.html',
  styleUrls: ['./badge-credit.component.scss']
})
export class BadgeCreditComponent implements OnInit {

  @Input() url: string;
  @Input() author: string;

  constructor() { }

  ngOnInit() {
  }

}
