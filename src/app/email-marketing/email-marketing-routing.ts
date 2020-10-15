import {Routes} from '@angular/router';
import { EmailListComponent } from './email-list/email-list.component';
import { RequestFormComponent } from './request-form/request-form.component';

export const EMAIL_MARKETING_ROUTES: Routes = [
    {
        path: '', redirectTo: 'lista-de-emails'
    },
    {
        path: 'lista-de-emails', component: EmailListComponent
    },
    {
        path: 'formulario-de-solicitacao', component: RequestFormComponent
    }
];
