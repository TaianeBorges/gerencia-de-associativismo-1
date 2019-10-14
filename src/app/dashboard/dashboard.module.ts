import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import {DASHBOARD_ROUTES} from './dashboard-routing';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTES)

  ]
})
export class DashboardModule { }
