import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemandListComponent} from './demand-list/demand-list.component';
import {RouterModule} from '@angular/router';
import {DEMAND_MANAGEMENT_ROUTES} from './demand-routing';
import {AuthGuardService} from '../guards/auth-guard.service';
import {SharedModule} from '../shared/shared.module';
import {DemandPaginationComponent} from './demand-pagination/demand-pagination.component';
import {DemandDetailComponent} from './demand-detail/demand-detail.component';
import {DemandHistoryComponent} from './demand-history/demand-history.component';
import {DemandFilterComponent} from './demand-filter/demand-filter.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Ng2SelectizeModule} from 'ng2-selectize';
import {DemandAddHistoryComponent} from './demand-add-history/demand-add-history.component';
import {DemandAddComponent} from './demand-add/demand-add.component';
import {DemandExcelComponent} from './demand-excel/demand-excel.component';
import {ExcelService} from './demand-excel/demand-excel.service';
import {MatTooltipModule} from '@angular/material';
import {DemandEditComponent} from './demand-edit/demand-edit.component';


@NgModule({
    declarations: [
        DemandListComponent,
        DemandPaginationComponent,
        DemandDetailComponent,
        DemandHistoryComponent,
        DemandFilterComponent,
        DemandAddHistoryComponent,
        DemandAddComponent,
        DemandExcelComponent,
        DemandEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DEMAND_MANAGEMENT_ROUTES),
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2SelectizeModule,
        MatTooltipModule
    ],
    exports: [
        MatTooltipModule
    ],
    providers: [
        AuthGuardService,
        ExcelService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemandManagementModule {
}
