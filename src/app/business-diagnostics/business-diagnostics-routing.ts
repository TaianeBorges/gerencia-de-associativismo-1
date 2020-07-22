import {Routes} from '@angular/router';
import {AuthGuardService} from '../guards/auth-guard.service';
import {OverviewComponent} from './overview/overview.component';

export const BUSINESS_DIAGNOSTICS_ROUTES: Routes = [
    {
        path: 'visao-geral',
        component: OverviewComponent,
        canActivate: [AuthGuardService]
    }
];
