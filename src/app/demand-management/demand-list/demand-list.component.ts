import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedsService } from 'src/app/shared/shareds.service';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.scss']
})
export class DemandListComponent implements OnInit {
  demandOpened = true;
  demands: any;
  constructor(
    private sharedService: SharedsService,
    private demandService: DemandService,
    private elRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de demandas');
    this.listDemands();
  }

  openDemand(demand) {
    const element = this.elRef.nativeElement.querySelector(`.demand-${demand} .extended-items`);
    if (element.getAttribute('class').indexOf('display-none') !== -1) {
      this.renderer.removeClass(element, 'display-none');
    } else {
      this.renderer.addClass(element, 'display-none');
    }
  }

  getDemand(page) {
    console.log(page);
  }

  listDemands() {
    this.demandService.getDemands()
      .subscribe(res => {
        this.demands = res;
        console.log(res);
      });

  }
}
