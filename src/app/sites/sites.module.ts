import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListSiteComponent } from './list-site/list-site.component';

import {SITE_ROUTES} from './sites-routing';
import { AuthGuardService } from '../guards/auth-guard.service';

@NgModule({
  declarations: [ListSiteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SITE_ROUTES)
  ],
  providers: [
    AuthGuardService
  ]
})
export class SitesModule { }
