import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SitesRoutingModule } from './sites-routing';
import { ListSiteComponent } from './list-site/list-site.component';

import {SITE_ROUTES} from './sites-routing';

@NgModule({
  declarations: [ListSiteComponent],
  imports: [
    CommonModule,
    SitesRoutingModule,
    RouterModule.forChild(SITE_ROUTES)
  ]
})
export class SitesModule { }
