import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }


    getAuthorizationToken() {
        return localStorage.getItem('token');
    }

    storeAuthorizationToken(token: string) {
        localStorage.setItem('token', token);
    }
}
