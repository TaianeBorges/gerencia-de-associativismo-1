import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { SharedsService } from 'src/app/shared/shareds.service';
import { DemandService } from '../demand.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.scss']
})
export class DemandListComponent implements OnInit {
  demandOpened = true;
  demands: any;
  page = 1;
  demandSelected: any;
  demandServiceSubscribe: Subscription;

  constructor(
    private sharedService: SharedsService,
    private demandService: DemandService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sharedService.setTitle('Lista de demandas');
    console.log(this.activatedRoute.snapshot.params);
    if (window.location.search.indexOf('page=') !== -1)
      this.page = parseInt(window.location.search.substr((window.location.search.indexOf('page=') + 5), 1));

    if (isNaN(this.page))
      this.page = 1;

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

  historyDemand(event, demand) {
    event.stopPropagation();
  }

  listDemands(filters = null) {
    if (!filters) {
      filters = {
        page: this.page
      };
    } else {
      filters['page'] = this.page;
    }

    this.route.navigate(['gestao-de-demandas/lista-de-demandas'], { queryParams: filters });

    this.demandServiceSubscribe = this.demandService.getDemands(filters)
      .subscribe(res => {
        this.demands = res;
      });
  }

  closeModal(event) {
    console.log(event);
  }

  filterSubmit(event) {
    this.listDemands(event.filters);
  }

  ngOnDestroy() {
    this.demandServiceSubscribe.unsubscribe();
  }
}
