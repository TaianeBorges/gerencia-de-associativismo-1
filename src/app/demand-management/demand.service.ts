import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DemandService {

    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };

    constructor(private http: HttpClient) {
    }

    getDemands(filters): Observable<any> {

        const data = {};

        for (const key in filters) {
            if (filters[key]) {
                data[key] = filters[key];
            }
        }

        return this.http.get(`${environment.apiUrl}/demandas`, {
            params: data,
            headers: this.httpOptions.headers
        })
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDemand(id): Observable<any> {
        return this.http.get(`${environment.apiUrl}/demandas/${id}`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getEntity(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/entidades`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getUnions(): Observable<any> {
        return this.http.post(`${environment.apiUrl}/sindicatos`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDemandStatus(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/demandas/status`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDemandCategories(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/demandas/categorias`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getSectors(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/sindicatos/setores`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }
}
