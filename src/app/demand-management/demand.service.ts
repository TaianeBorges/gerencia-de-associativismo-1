import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DemandService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
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
        return this.http.post(`${environment.apiUrl}/sindicatos`, {}, this.httpOptions)
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

    getCouncils(): Observable<any> {
        return this.http.post(`${environment.apiUrl}/conselhos`, {}, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDemandSubcategories(id): Observable<any> {
        return this.http.get(`${environment.apiUrl}/demandas/categorias/${id}/subcategorias`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getScope(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/demandas/escopos`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDemandCategoriesEO(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/demandas/categorias_oe`)
            .pipe(
                map(res => {
                    return res;
                })
            )
    }

    getDemandSubcategoriesOE(id): Observable<any> {
        return this.http.get(`${environment.apiUrl}/demandas/categorias_oe/${id}/subcategorias_oe`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    setDemand(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/nova`, data, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        )
    }

    getAreasTecnicas(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/areas_tecnicas`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getEmailsByManagements(data: Array<any>): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lotacoes/gerencias-gerais/gerencias/emails`, { managements_ids: data }, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        )
    }

    getManagements(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/lotacoes/gerencias-gerais/gerencias`, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    getAdvices(data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/conselhos`, { entity_id: data }, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    getState(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/entidades/poder_publico`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }
}
