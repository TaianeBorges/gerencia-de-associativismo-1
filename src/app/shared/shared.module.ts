import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

//components
import { BadgeCreditComponent } from './badge-credit/badge-credit.component';
import { AlertsComponent } from './alerts/alerts.component';

//services
import { AlertService } from './alerts/alert.service';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';

//Pipes

@NgModule({
  declarations: [
    BadgeCreditComponent,
    AlertsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  providers: [
    AlertService
  ],
  exports: [
    BadgeCreditComponent,
    AlertsComponent,
    MenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
