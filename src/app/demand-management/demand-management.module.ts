import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandListComponent } from './demand-list/demand-list.component';
import { RouterModule } from '@angular/router';
import { DEMAND_MANAGEMENT_ROUTES } from './demand-routing';
import { AuthGuardService } from '../guards/auth-guard.service';

@NgModule({
  declarations: [DemandListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DEMAND_MANAGEMENT_ROUTES)
  ],
  providers: [
    AuthGuardService
  ]
})
export class DemandManagementModule { }
