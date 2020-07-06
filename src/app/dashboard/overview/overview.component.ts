import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardService} from '../dashboard.service';
import {SharedsService} from '../../shared/shareds.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

    destroyOverviewStatusSubscribe: Subscription;
    destroyOverviewEntitySubscribe: Subscription;
    status: any;
    entities: any;

    constructor(
        private dashboardService: DashboardService,
        private sharedService: SharedsService
    ) {
    }

    ngOnInit() {
        this.sharedService.setTitle('Dashboard');

        this.overviewStatus();
        this.overViewEntities();
    }

    overviewStatus() {
        this.destroyOverviewStatusSubscribe = this.dashboardService.overviewStatus().subscribe(res => {
            this.status = res;
        });
    }

    overViewEntities() {
        this.destroyOverviewEntitySubscribe = this.dashboardService.overviewEntity().subscribe(res => {
            this.entities = res;
        });
    }

    ngOnDestroy() {
        if (this.destroyOverviewStatusSubscribe) {
            this.destroyOverviewStatusSubscribe.unsubscribe();
        }

        if (this.destroyOverviewEntitySubscribe) {
            this.destroyOverviewEntitySubscribe.unsubscribe();
        }
    }

}
