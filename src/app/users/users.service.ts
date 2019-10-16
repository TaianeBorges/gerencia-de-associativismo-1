import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };
  constructor(private http: HttpClient) { }

  getRegionals(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/regionais`, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getDivisions(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/regionais/${id}/gerencias/1/divisoes`, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
