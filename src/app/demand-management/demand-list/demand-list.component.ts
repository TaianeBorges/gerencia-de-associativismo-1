import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedsService } from 'src/app/shared/shareds.service';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.scss']
})
export class DemandListComponent implements OnInit {

  constructor(private sharedService: SharedsService) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de demandas');
  }

}
