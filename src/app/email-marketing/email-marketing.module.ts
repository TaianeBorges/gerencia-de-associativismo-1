import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EMAIL_MARKETING_ROUTES} from './email-marketing-routing';
import {RouterModule} from '@angular/router';
import { EmailMarketingService } from './email-marketing.service';
import { EmailListComponent } from './email-list/email-list.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { EmailListFilterComponent } from './email-list-filter/email-list-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SelectizeModule } from 'ng2-selectize';


@NgModule({
  declarations: [EmailListComponent, RequestFormComponent, EmailListFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(EMAIL_MARKETING_ROUTES),
    Ng2SelectizeModule
  ],
  providers: [
    EmailMarketingService
  ]
})
export class EmailMarketingModule { }
