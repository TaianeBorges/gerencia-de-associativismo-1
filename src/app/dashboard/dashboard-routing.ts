import {Routes} from '@angular/router';
import {AuthGuardService} from '../guards/auth-guard.service';
import {OverviewComponent} from './overview/overview.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: 'visao-geral',
        component: OverviewComponent,
        canActivate: [AuthGuardService]
    }
];
