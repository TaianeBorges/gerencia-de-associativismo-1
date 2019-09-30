import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };

    getAuthorizationToken() {
        return localStorage.getItem('token') ? localStorage.getItem('token') : '';
    }

    checkAuthorization(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/user`);
    }

    storeAuthorizationToken(token: string) {
        localStorage.setItem('token', 'bearer ' + token);
    }

    login(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/login`, data, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    logout(token): Observable<any> {
        return this.http.post(`${environment.apiUrl}/logout`, token, this.httpOptions);
    }

}
