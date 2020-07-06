import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardService} from '../dashboard.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

    destroyOverviewStatusSubscribe: Subscription;
    // status: any;
    @Input('status') status;

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.overviewStatus();
    }

    overviewStatus() {
        this.destroyOverviewStatusSubscribe = this.dashboardService.overviewStatus().subscribe(res => {
            this.status = res;
        });
    }

    ngOnDestroy() {
        if (this.destroyOverviewStatusSubscribe) {
            this.destroyOverviewStatusSubscribe.unsubscribe();
        }
    }

}
