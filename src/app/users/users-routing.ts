import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {UsersListComponent} from './users-list/users-list.component';
import {AuthGuardService} from '../guards/auth-guard.service';

export const USER_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'lista-de-usuarios'
    },
    {
        path: 'cadastro',
        component: RegisterComponent
    },
    {
        path: 'register',
        redirectTo: 'cadastro'
    },
    {
        path: 'lista-de-usuarios',
        component: UsersListComponent,
        canActivate: [AuthGuardService]
    }
];
