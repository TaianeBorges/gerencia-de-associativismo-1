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
import { InitialName } from './pipes/initial-name.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InitialNameComponent } from './initial-name/initial-name.component';

//Pipes
import { TelephonePipe } from './pipes/telephone.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { CNPJPipe } from './pipes/cnpj.pipe';

@NgModule({
  declarations: [
    BadgeCreditComponent,
    AlertsComponent,
    MenuComponent,
    ModalComponent,
    TelephonePipe,
    InitialName,
    CapitalizePipe,
    CurrencyPipe,
    InitialNameComponent,
    CNPJPipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    NgbTooltipModule,
    ModalModule.forRoot()
  ],
  providers: [
    AlertService,
    CNPJPipe
  ],
  exports: [
    BadgeCreditComponent,
    AlertsComponent,
    MenuComponent,
    ModalComponent,
    TelephonePipe,
    InitialName,
    CapitalizePipe,
    CurrencyPipe,
    InitialNameComponent,
    CNPJPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
