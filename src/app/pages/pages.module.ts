import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { HOME_ROUTES } from './pages-routing';
import { AuthGuardService } from '../guards/auth-guard.service';
import { MenuLoaderComponent } from './menu-loader/menu-loader.component';


@NgModule({
  declarations: [HomeComponent, MenuLoaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ],
  providers: [
    AuthGuardService
  ]
})
export class PagesModule { }
