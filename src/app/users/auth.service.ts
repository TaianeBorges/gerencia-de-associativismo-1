import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }


    getAuthorizationToken() {
        return localStorage.getItem('token') ? localStorage.getItem('token') : '';
    }

    checkAuthorization() {
        return this.http.get(`${environment.apiUrl}/user`);
    }

    storeAuthorizationToken(token: string) {
        localStorage.setItem('token', 'bearer ' + token);
    }
}
