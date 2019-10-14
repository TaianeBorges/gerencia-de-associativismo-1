import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
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
    {path: 'cadastro', redirectTo: 'usuario'},
    { path: 'login', redirectTo: 'auth/login' },
    { path: 'logout', redirectTo: 'auth/logout' },
    { path: '**', component: PageNotFoundComponent }
];
