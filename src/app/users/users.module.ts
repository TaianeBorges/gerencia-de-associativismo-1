import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

import { USER_ROUTES } from './users-routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TelephonePipe } from '../shared/pipes/telephone.pipe';

@NgModule({
  declarations: [RegisterComponent, TelephonePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(USER_ROUTES)
  ]
})
export class UsersModule { }
