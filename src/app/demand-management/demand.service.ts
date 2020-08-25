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


        return this.http.post(`${environment.apiUrl}/demandas`, filters, this.httpOptions)
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

    getUnions(sector_id?): Observable<any> {
        let data = {};

        if (sector_id) {
            data = {
                sector_id
            };
        }

        return this.http.post(`${environment.apiUrl}/sindicatos`, data, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDemandStatus(data = {}): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/status`, data, this.httpOptions)
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

    getCouncils(entity_id?): Observable<any> {
        let data = {};
        if (entity_id) {
            data = {
                entity_id
            };
        }
        return this.http.post(`${environment.apiUrl}/conselhos`, data, this.httpOptions)
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
            );
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
        );
    }

    updateDemand(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/editar`, data, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    getAreasTecnicas(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/areas_tecnicas`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getEmails(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/usuarios/emails`, data, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    getManagements(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/lotacoes/gerencias-gerais/gerencias`, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    getAdvices(data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/conselhos`, {entity_id: data}, this.httpOptions).pipe(
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

    getSectors(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/sindicatos/setores`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    setHistory(data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/status/novo`, data, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    getRegionals(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/regionais`, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    getDemandsExcel(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/excel`, data, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    destroyDemand(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/excluir`, data, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }

    destroyStatus(id): Observable<any> {
        return this.http.post(`${environment.apiUrl}/demandas/status/excluir`, id, this.httpOptions).pipe(
            map(res => {
                return res;
            })
        );
    }
}
