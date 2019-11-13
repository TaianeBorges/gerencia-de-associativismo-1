import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { HOME_ROUTES } from './pages-routing';
import { AuthGuardService } from '../guards/auth-guard.service';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ],
  providers: [
    AuthGuardService
  ]
})
export class PagesModule { }
