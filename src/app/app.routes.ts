import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './guards/auth-guard.service';

export const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
    },
    {
        path: 'sites',
        loadChildren: () => import('./sites/sites.module').then(mod => mod.SitesModule),
        canActivateChild: [AuthGuardService]
    },
    { path: '**', redirectTo: 'sites' }
];