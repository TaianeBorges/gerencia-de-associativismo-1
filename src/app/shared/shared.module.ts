import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


//modules
import { MatIconModule } from '@angular/material/icon';

//components
import { BadgeCreditComponent } from './badge-credit/badge-credit.component';
import { AlertsComponent } from './alerts/alerts.component';

//services
import { AlertService } from './alerts/alert.service';

@NgModule({
  declarations: [
    BadgeCreditComponent,
    AlertsComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  providers: [
    AlertService
  ],
  exports: [
    BadgeCreditComponent,
    AlertsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
