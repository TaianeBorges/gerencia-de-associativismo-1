import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demand-pagination',
  templateUrl: './demand-pagination.component.html',
  styleUrls: ['./demand-pagination.component.scss']
})
export class DemandPaginationComponent implements OnInit {

  nextButton: boolean;
  beforeButton: boolean;
  filtersParams: any;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute) {
      
    this.activatedRoute.queryParams.subscribe(params => {
        this.filtersParams = params;

    });
   }

  @Input('demands') demands: any;
  @Output('pagination') pagination = new EventEmitter();
  @Input('currentPage') currentPage: number;

  ngOnInit() {
      
      this.currentPage = this.filtersParams.page ? this.filtersParams.page : 1;

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
