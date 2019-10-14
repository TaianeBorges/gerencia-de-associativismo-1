import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'cadastro'
  },
  {
    path: 'cadastro',
    component: RegisterComponent
  },
  {
    path: 'register',
    redirectTo: 'cadastro'
  }
];
