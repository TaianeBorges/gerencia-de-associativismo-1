import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnionsListComponent } from './unions-list/unions-list.component';
import { RouterModule } from '@angular/router';
import { UNIONS_ROUTES } from './unions-routing';



@NgModule({
  declarations: [UnionsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UNIONS_ROUTES)
  ]
})
export class UnionsModule { }
