import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public apiURL = 'http://localhost/associativismo-api/public';

  constructor(private http: HttpClient) { }

  login(data) {

    return this.http.post(this.apiURL + '/token', data);
  }
}
