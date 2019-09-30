import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
    },
    {
        path: 'sites',
        loadChildren: () => import('./sites/sites.module').then(mod => mod.SitesModule),
        canActivateChild: [AuthGuardService]
    },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'login', redirectTo: 'auth' },
    { path: 'logout', redirectTo: 'auth/logout' },
    { path: '**', component: PageNotFoundComponent }
];
