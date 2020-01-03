import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
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
  page = 1;

  constructor(
    private sharedService: SharedsService,
    private demandService: DemandService,
    private elRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de demandas');
    if (window.location.search.indexOf('page=') !== -1)
      this.page = parseInt(window.location.search.substr((window.location.search.indexOf('page=') + 5), 1));

    if (this.page < 1) {
      this.page = 1;
    }

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

  onPagination(event) {
    this.page = event.page;
    this.listDemands();
  }

  usersDemand(items) {
    let result = [];

    items.forEach(function (item, itemIndex) {
      let permission = true;

      result.forEach(function (value, i) {
        if (value.id === item.user.id) {
          permission = false;
        }
      });

      if (permission)
        result.push(item.user);
    });

    return result;
  }

  historyDemand(event, id) {
    console.log(id);
    event.stopPropagation();
  }

  listDemands() {
    this.demandService.getDemands(this.page)
      .subscribe(res => {
        this.demands = res;
      });
  }
}
