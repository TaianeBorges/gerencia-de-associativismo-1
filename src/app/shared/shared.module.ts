import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

//components
import { BadgeCreditComponent } from './badge-credit/badge-credit.component';
import { AlertsComponent } from './alerts/alerts.component';

//services
import { AlertService } from './alerts/alert.service';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { TelephonePipe } from './pipes/telephone.pipe';
import { InitialName } from './pipes/initial-name.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';


//Pipes

@NgModule({
  declarations: [
    BadgeCreditComponent,
    AlertsComponent,
    MenuComponent,
    ModalComponent,
    TelephonePipe,
    InitialName,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    NgbTooltipModule,
    
  ],
  providers: [
    AlertService
  ],
  exports: [
    BadgeCreditComponent,
    AlertsComponent,
    MenuComponent,
    ModalComponent,
    TelephonePipe,
    InitialName,
    CapitalizePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
