import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_ROUTES } from './auth-routing';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTES),
    RecaptchaModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'pt-BR', // use French language
    }
  ]
})
export class AuthModule { }
