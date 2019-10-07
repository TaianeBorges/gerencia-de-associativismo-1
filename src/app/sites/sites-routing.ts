import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSiteComponent } from './list-site/list-site.component';


export const SITE_ROUTES: Routes = [
  {
    path: '', component: ListSiteComponent
  }
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
