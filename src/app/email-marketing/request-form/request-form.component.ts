import { Component, OnInit } from '@angular/core';
import { SharedsService } from 'src/app/shared/shareds.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  constructor(
    private sharedService: SharedsService
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de E-mails');
  }

}
