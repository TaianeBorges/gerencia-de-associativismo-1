import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {BUSINESS_DIAGNOSTICS_ROUTES} from './business-diagnostics-routing';
import {OverviewComponent} from './overview/overview.component';
import {BusinessDiagnosticsService} from './business-diagnostics.service';

@NgModule({
    declarations: [OverviewComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        RouterModule.forChild(BUSINESS_DIAGNOSTICS_ROUTES),
        SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BusinessDiagnosticsService
    ]
})
export class BusinessDiagnosticsModule {
}
