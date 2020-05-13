import {Routes} from '@angular/router';
import {DemandListComponent} from './demand-list/demand-list.component';
import {DemandDetailComponent} from './demand-detail/demand-detail.component';
import {DemandAddComponent} from './demand-add/demand-add.component';
import {DemandEditComponent} from './demand-edit/demand-edit.component';

export const DEMAND_MANAGEMENT_ROUTES: Routes = [
    {path: '', redirectTo: 'lista-de-demandas'},
    {
        path: 'lista-de-demandas', component: DemandListComponent
    },
    {
        path: 'demanda/:demandaId', component: DemandDetailComponent
    },
    {
        path: 'demanda/:demandaId/editar', component: DemandEditComponent
    },
    {
        path: 'nova-demanda', component: DemandAddComponent
    }
];
