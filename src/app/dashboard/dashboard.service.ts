import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {
    }

    overviewStatus(): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/overview/status`, {}, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    overviewEntity(): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/overview/entity`, {}, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

}
