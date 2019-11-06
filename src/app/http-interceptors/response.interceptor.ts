import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../shared/alerts/alert.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};

                if (error.error && error.error.type && error.error.type === 'validation') {
                    const validations = error.error[0];
                    let msg = '';

                    for (const key in validations) {
                        if (validations.hasOwnProperty(key)) {
                            validations[key].forEach((element: string) => {
                                msg += `<li>${element}</li>`;
                            });
                        }
                    }

                    data = {
                        reason: error && error.error.reason ? error.error.reason : '',
                        status: error.status,
                        icon: 'warning',
                        color: 'warning',
                        title: 'Não foi possivel efetuar o cadastro',
                        message: `<ul class="alert-list">${msg}</ul>`,
                        copy: false,
                        error
                    };
                } else {

                    data = {
                        reason: error && error.error.reason ? error.error.reason : '',
                        status: error.status,
                        icon: 'report',
                        color: 'error',
                        title: 'Ops! Ocorreu um erro.',
                        message: 'Não foi possível se conectar com o servidor.',
                        copy: true,
                        actions: {
                            close: true,
                            copy: true
                        },
                        error
                    };
                }

                this.alertService.alertShow(data);
                return throwError(error);
            }));
    }
}