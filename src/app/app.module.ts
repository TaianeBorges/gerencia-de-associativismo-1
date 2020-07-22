import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {APP_ROUTES} from './app.routes';
import {registerLocaleData} from '@angular/common';
import localeBr from '@angular/common/locales/pt';

registerLocaleData(localeBr, 'pt');

// Modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material';
import {LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from './shared/shared.module';
import {WhoIsModule} from './who-is/who-is.module';
import {DashboardModule} from './dashboard/dashboard.module';

// Components
import {AppComponent} from './app.component';
import {LoaderComponent} from './loader/loader.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

// Services
import {AuthGuardService} from './guards/auth-guard.service';
import {LoaderService} from './loader/loader.service';

// Interceptors
import {AuthInterceptor} from './http-interceptors/auth-interceptor';
import {LoaderInterceptor} from './http-interceptors/loader.interceptor';
import {ResponseInterceptor} from './http-interceptors/response.interceptor';
import {CommonModule} from '@angular/common';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {BusinessDiagnosticsModule} from './business-diagnostics/business-diagnostics.module';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoaderComponent,
        UnauthorizedComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(APP_ROUTES),
        HttpClientModule,
        MatProgressSpinnerModule,
        MatIconModule,
        SharedModule,
        WhoIsModule,
        DashboardModule,
        BusinessDiagnosticsModule
    ],
    providers: [
        AuthGuardService,
        LoaderService,
        [
            {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
            {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
            {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
        ],
        {provide: LOCALE_ID, useValue: 'pt'}
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {
}
