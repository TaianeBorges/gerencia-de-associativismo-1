import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public authorizationLogin: any = new EventEmitter();
    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };

    getAuthorizationToken() {
        return localStorage.getItem('token') ? localStorage.getItem('token') : '';
    }

    checkAuthorization(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/auth/usuario`).pipe(
            map(res => {
                this.authorizationLogin.emit(res);
                return res;
            })
        );
    }

    storeAuthorizationToken(token: string) {
        localStorage.setItem('token', 'bearer ' + token);
    }

    storeUser(res: any) {
        localStorage.setItem('user', JSON.stringify(res));
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    login(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/login`, data, this.httpOptions)
            .pipe(
                map(res => {
                    this.authorizationLogin.emit(res);
                    return res;
                })
            );
    }

    logout(token): Observable<any> {
        return this.http.post(`${environment.apiUrl}/logout`, token, this.httpOptions)
            .pipe(
                map(res => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    this.authorizationLogin.emit(res);
                    return res;
                })
            );
    }
}
