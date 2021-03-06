import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {Ng2SelectizeModule} from 'ng2-selectize';

import {USER_ROUTES} from './users-routing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {UsersListComponent} from './users-list/users-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    RegisterComponent,
    UsersListComponent,
    UserDetailComponent
  ],
    imports: [
        CommonModule,
        Ng2SelectizeModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        RouterModule.forChild(USER_ROUTES),
        SharedModule
    ]
})
export class UsersModule {
}
