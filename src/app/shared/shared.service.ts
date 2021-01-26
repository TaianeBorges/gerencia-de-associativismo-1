import {Injectable, EventEmitter} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    public stateMenu: any = new EventEmitter();
    public titlePage: any = new EventEmitter();
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private titleService: Title,
                private http: HttpClient) {
    }

    actionMenu(value) {
        this.stateMenu.emit({open: value});
    }

    setTitle(value) {

        let title = value;

        if (value.indexOf('<p matTooltip') !== -1) {
            title = value.substr(0, value.indexOf('<p matTooltip'));
        }

        this.titleService.setTitle(title);
        this.titlePage.emit(value);
    }

    getDemandsNotifications(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/notificacoes`, data, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    setUnreadDemandsNotifications(id): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/notificacoes/lido`, id, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    updatePasswordUser(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/usuario/atualizar-senha`, data, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

}
