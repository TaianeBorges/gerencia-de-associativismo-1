import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandService } from '../demand.service';
import { SharedsService } from 'src/app/shared/shareds.service';

@Component({
  selector: 'app-demand-detail',
  templateUrl: './demand-detail.component.html',
  styleUrls: ['./demand-detail.component.scss']
})
export class DemandDetailComponent implements OnInit {

  demandId: number;
  demand: any;
  currentUrl;
  previousUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandService: DemandService,
    private sharedService: SharedsService
  ) {
  }

  ngOnInit() {
    this.demandId = parseInt(this.route.snapshot.paramMap.get('demandaId'));
    this.sharedService.setTitle(`Demanda #${this.demandId}`);

    if (this.demandId)
      this.getDemand(this.demandId);
  }

  getDemand(id: number) {
    this.demandService.getDemand(id)
      .subscribe(res => {
        this.demand = res.data[0];
        console.log(this.demand);
      });
  }

}