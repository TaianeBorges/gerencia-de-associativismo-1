import {Injectable, EventEmitter} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {
    }

    getCapacities(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/lotacoes`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getGeneralManagement(capacity_id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/lotacoes/${capacity_id}/gerencias-gerais`, this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }

    getManagements(data: any): Observable<any> {
        const url = `${environment.apiUrl}/lotacoes/${data.capacity_id}/gerencias-gerais/${data.general_management_id}/gerencias`;
        return this.http.get(url, this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }

    getRegionals(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/regionais`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDepartments(data: any): Observable<any> {

        if (typeof data.management_id === 'object') {
            data.management_id = data.management_id[0];
        }

        const url = `${environment.apiUrl}/lotacoes/${data.capacity_id}/gerencias-gerais/${data.general_management_id}/gerencias/${data.management_id}/divisoes`;
        return this.http.get(url, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getSyndicatesBySectors(data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/sindicatos`, data, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getSectorsService(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/sindicatos/setores`)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getUserAuthenticated(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/auth/usuario`, this.httpOptions)
            .pipe(map(res => {
                return res;
            }));
    }

    registerUser(data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/usuarios/cadastro`, data, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getUsers(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/usuarios`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    enableUser(data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/usuario/habilitar`, data, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }
}
