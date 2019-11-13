import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '../guards/auth-guard.service';

export const HOME_ROUTES: Routes = [
  {
    path: '', component: HomeComponent
  }
];
