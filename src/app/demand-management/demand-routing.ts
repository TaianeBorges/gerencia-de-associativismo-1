import { Routes } from '@angular/router';
import { DemandListComponent } from './demand-list/demand-list.component';

export const DEMAND_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'lista-de-demandas' },
  {
    path: 'lista-de-demandas', component: DemandListComponent
  }
];
