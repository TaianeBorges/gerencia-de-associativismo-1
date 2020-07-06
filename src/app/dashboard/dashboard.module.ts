import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Ng2SelectizeModule} from 'ng2-selectize';

import {DASHBOARD_ROUTES} from './dashboard-routing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {OverviewComponent} from './overview/overview.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CardStatusComponent} from './overview/card-status/card-status.component';
import {DemandService} from '../demand-management/demand.service';

@NgModule({
    declarations: [
        OverviewComponent,
        CardStatusComponent
    ],
    imports: [
        CommonModule,
        Ng2SelectizeModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        RouterModule.forChild(DASHBOARD_ROUTES),
        SharedModule,
        NgxChartsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [DemandService]
})
export class DashboardModule {
}
