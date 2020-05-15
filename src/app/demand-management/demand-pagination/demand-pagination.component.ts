import {Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-demand-pagination',
    templateUrl: './demand-pagination.component.html',
    styleUrls: ['./demand-pagination.component.scss']
})
export class DemandPaginationComponent implements OnInit, OnChanges {

    nextButton: boolean;
    beforeButton: boolean;
    filtersParams: any;

    constructor() {
    }

    @Input('demands') demands: any;
    @Output('pagination') pagination = new EventEmitter();
    @Input('currentPage') currentPage: number;

    ngOnInit() {
        this.currentPage = 1;
        this.permissionButton();
    }

    getDemand(direction: string) {
        if (direction === 'next') {
            this.currentPage++;
        } else {
            this.currentPage--;
        }

        this.permissionButton();

        this.pagination.emit({page: this.currentPage});
    }

    refreshDemand() {
        this.pagination.emit({page: this.currentPage});

    }


    ngOnChanges(changes) {
        if (changes && changes.demands) {
            if (this.demands) {
                this.currentPage = this.demands.page;
            }
            this.demands = changes.demands.currentValue;
            this.permissionButton();
        }
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
        } else {
            this.nextButton = false;
        }
    }
}
