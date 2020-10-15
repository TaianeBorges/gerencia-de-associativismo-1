import { Component, OnInit} from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {


  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de E-mails');
  }

  getEmailMarketing(event) {
    console.log(event);
  }
}
