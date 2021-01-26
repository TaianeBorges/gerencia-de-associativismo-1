import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

// modules
import {MatIconModule} from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// components
import {BadgeCreditComponent} from './badge-credit/badge-credit.component';
import {AlertsComponent} from './alerts/alerts.component';
import { InfiniteScrollComponent } from './infinite-scroll/ininite-scroll.component';

// services
import {AlertService} from './alerts/alert.service';
import {MenuComponent} from './menu/menu.component';
import {RouterModule} from '@angular/router';
import {ModalComponent} from './modal/modal.component';
import {InitialName} from './pipes/initial-name.pipe';
import {ModalModule} from 'ngx-bootstrap/modal';
import {InitialNameComponent} from './initial-name/initial-name.component';

// pipes
import {TelephonePipe} from './pipes/telephone.pipe';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {CurrencyPipe} from './pipes/currency.pipe';
import {CNPJPipe} from './pipes/cnpj.pipe';
import {MomentPipe} from './pipes/moment.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
        CNPJPipe,
        MomentPipe,
        InfiniteScrollComponent,
        DateAgoPipe
    ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        ModalModule.forRoot(),
        InfiniteScrollModule,
        FormsModule,
        ReactiveFormsModule
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
        CNPJPipe,
        InfiniteScrollComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
