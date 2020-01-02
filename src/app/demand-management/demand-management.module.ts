import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandListComponent } from './demand-list/demand-list.component';
import { RouterModule } from '@angular/router';
import { DEMAND_MANAGEMENT_ROUTES } from './demand-routing';
import { AuthGuardService } from '../guards/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { DemandPaginationComponent } from './demand-pagination/demand-pagination.component';

@NgModule({
  declarations: [
    DemandListComponent,
    DemandPaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DEMAND_MANAGEMENT_ROUTES),
    SharedModule
  ],
  providers: [
    AuthGuardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemandManagementModule { }
