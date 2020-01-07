import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandListComponent } from './demand-list/demand-list.component';
import { RouterModule } from '@angular/router';
import { DEMAND_MANAGEMENT_ROUTES } from './demand-routing';
import { AuthGuardService } from '../guards/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { DemandPaginationComponent } from './demand-pagination/demand-pagination.component';
import { DemandDetailComponent } from './demand-detail/demand-detail.component';
import { DemandHistoryComponent } from './demand-history/demand-history.component';
import { DemandFilterComponent } from './demand-filter/demand-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SelectizeModule } from 'ng2-selectize';

@NgModule({
  declarations: [
    DemandListComponent,
    DemandPaginationComponent,
    DemandDetailComponent,
    DemandHistoryComponent,
    DemandFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DEMAND_MANAGEMENT_ROUTES),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SelectizeModule
  ],
  providers: [
    AuthGuardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemandManagementModule { }
