import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { ListSiteComponent } from './list-site/list-site.component';


@NgModule({
  declarations: [ListSiteComponent],
  imports: [
    CommonModule,
    SitesRoutingModule
  ]
})
export class SitesModule { }
