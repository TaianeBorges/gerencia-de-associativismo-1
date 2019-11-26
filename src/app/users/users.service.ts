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

  getLotacoes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/lotacoes`, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getGeneralManagement(lotacaoId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/lotacoes/${lotacaoId}/gerencias-gerais`, this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  getManagements(data: any): Observable<any> {
    const url = `${environment.apiUrl}/lotacoes/${data.lotacao_id}/gerencias-gerais/${data.general_management_id}/gerencias`;
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

  getDivisions(data: any): Observable<any> {
    const url = `${environment.apiUrl}/lotacoes/${data.lotacao_id}/gerencias-gerais/${data.gerenal_management_id}/gerencias/${data.general_id}/divisoes`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getUnions(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/regionais/sindicatos`, data, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getSectors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/setores_sindicato`)
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
}
