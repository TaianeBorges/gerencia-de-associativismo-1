import { Routes } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';

export const WHO_IS_ROUTES: Routes = [
    {
        path: 'sindicatos',
        loadChildren: () => import('./unions/unions.module').then(mod => mod.UnionsModule),
        canActivateChild: [AuthGuardService]
    }
];
