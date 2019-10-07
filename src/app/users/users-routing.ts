import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const USER_ROUTES: Routes = [
  {
    path: 'cadastro',
    component: RegisterComponent
  },
  {
    path: 'register',
    redirectTo: 'cadastro'
  }
];
