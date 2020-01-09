import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-pagination',
  templateUrl: './demand-pagination.component.html',
  styleUrls: ['./demand-pagination.component.scss']
})
export class DemandPaginationComponent implements OnInit {

  nextButton: boolean;
  beforeButton: boolean;

  constructor(
    private route: Router
  ) { }

  @Input('demands') demands: any;
  @Output('pagination') pagination = new EventEmitter();
  @Input('currentPage') currentPage: number;

  ngOnInit() {
    if (window.location.search.indexOf('page=') !== -1)
      this.currentPage = parseInt(window.location.search.substr((window.location.search.indexOf('page=') + 5), 1));

    if (isNaN(this.currentPage))
      this.currentPage = 1;

    if (typeof this.currentPage === 'number' && this.currentPage === 1)
      this.permissionButton();
  }

  getDemand(direction: string) {
    if (direction === 'next') {
      this.currentPage++;
    } else {
      this.currentPage--;
    }

    this.permissionButton();
    this.pagination.emit({ page: this.currentPage });
  }

  permissionButton() {
    if (this.currentPage <= 1) {
      this.beforeButton = true;
      this.currentPage = 1;
    } else {
      this.beforeButton = false;
    }

    if (this.demands && (this.demands.offset + this.demands.limit) >= this.demands.total) {
      this.nextButton = true;
      this.currentPage = this.currentPage - 1;
    } else {
      this.nextButton = false;
    }
  }
}
