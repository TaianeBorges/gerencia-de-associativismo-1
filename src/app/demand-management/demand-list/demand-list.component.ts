import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedsService } from 'src/app/shared/shareds.service';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.scss']
})
export class DemandListComponent implements OnInit {

  demands: any;
  constructor(private sharedService: SharedsService, private demandService: DemandService) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de demandas');
    this.listDemands();
  }


  listDemands() {
    this.demandService.getDemands()
      .subscribe(res => {
        this.demands = res;
        console.log(res);
      });

  }
}
