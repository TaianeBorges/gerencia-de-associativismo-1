import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WHO_IS_ROUTES } from './who-is-routing';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(WHO_IS_ROUTES)
  ],
  providers: [
    AuthGuardService
  ]
})
export class WhoIsModule { }
