import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule),
        canActivateChild: [AuthGuardService]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
    },
    {
        path: 'sites',
        loadChildren: () => import('./sites/sites.module').then(mod => mod.SitesModule),
        canActivateChild: [AuthGuardService]
    },
    {
        path: 'usuario',
        loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
    },
    {
        path: 'gestao-de-demandas',
        loadChildren: () => import('./demand-management/demand-management.module').then(mod => mod.DemandManagementModule),
        canActivateChild: [AuthGuardService]
    },
    {
        path: 'quem-e-quem',
        loadChildren: () => import('./who-is/who-is.module').then(mod => mod.WhoIsModule),
        canActivateChild: [AuthGuardService]
    },
    { path: 'cadastro', redirectTo: 'usuario' },
    { path: 'login', redirectTo: 'auth/login' },
    { path: 'logout', redirectTo: 'auth/logout' },
    { path: '**', component: PageNotFoundComponent }
];
