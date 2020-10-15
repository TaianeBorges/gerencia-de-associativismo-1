import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardService} from '../dashboard.service';
import {SharedService} from '../../shared/shared.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

    destroyOverviewStatusSubscribe: Subscription;
    destroyOverviewEntitySubscribe: Subscription;
    destroyOverviewTechnicalAreaSubscribe: Subscription;
    status: any;
    entities: any;
    technicalArea: any;

    constructor(
        private dashboardService: DashboardService,
        private sharedService: SharedService
    ) {
    }

    ngOnInit() {
        this.sharedService.setTitle('Dashboard');

        this.overviewStatus();
        this.overViewEntities();
        this.overViewTechnicalArea();
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

    overViewTechnicalArea() {
        this.destroyOverviewTechnicalAreaSubscribe = this.dashboardService.overviewTechnicalAreas().subscribe(res => {
            this.technicalArea = res;
        });
    }

    ngOnDestroy() {
        if (this.destroyOverviewStatusSubscribe) {
            this.destroyOverviewStatusSubscribe.unsubscribe();
        }

        if (this.destroyOverviewEntitySubscribe) {
            this.destroyOverviewEntitySubscribe.unsubscribe();
        }

        if (this.destroyOverviewTechnicalAreaSubscribe) {
            this.destroyOverviewTechnicalAreaSubscribe.unsubscribe();
        }
    }

}
