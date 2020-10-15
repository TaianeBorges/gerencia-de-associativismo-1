import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de E-mails');
  }

}
