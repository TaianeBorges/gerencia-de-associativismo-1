import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-pagination',
  templateUrl: './demand-pagination.component.html',
  styleUrls: ['./demand-pagination.component.scss']
})
export class DemandPaginationComponent implements OnInit {

  page = 1;
  nextButton: boolean;
  beforeButton: boolean;

  constructor(
    private route: Router
  ) { }

  @Input('demands') demands: any;
  @Output('pagination') pagination = new EventEmitter();

  ngOnInit() {
    if (window.location.search.indexOf('page=') !== -1)
      this.page = parseInt(window.location.search.substr((window.location.search.indexOf('page=') + 5), 1));

  }

  getDemand(direction: string) {
    if (direction === 'next') {
      this.page++;
    } else {
      this.page--;
    }

    this.permissionButton();

    this.route.navigate(['gestao-de-demandas/lista-de-demandas'], { queryParams: { page: this.page } });
    this.pagination.emit({ page: this.page });
  }

  permissionButton() {
    if (this.page <= 1) {
      this.beforeButton = true;
      this.page = 1;
    } else {
      this.beforeButton = false;
    }

    if (this.demands && (this.demands.offset + this.demands.limit) >= this.demands.total) {
      this.nextButton = true;
      this.page = this.page - 1;
    } else {
      this.nextButton = false;
    }
  }
}
