import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { appRoutes } from './app.routes';

//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

//Components
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//Services
import { AuthGuardService } from './guards/auth-guard.service';
import { LoaderService } from './loader/loader.service';
import { AlertService } from './alerts/alert.service';

//Interceptors
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { LoaderInterceptor } from './http-interceptors/loader.interceptor';
import { ResponseInterceptor } from './http-interceptors/response.interceptor';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoaderComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [
    AuthGuardService,
    LoaderService,
    AlertService,
    [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
