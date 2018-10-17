import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITroco } from 'app/shared/model/troco.model';

type EntityResponseType = HttpResponse<ITroco>;
type EntityArrayResponseType = HttpResponse<ITroco[]>;

@Injectable({ providedIn: 'root' })
export class TrocoService {
    private resourceUrl = SERVER_API_URL + 'api/trocos';

    constructor(private http: HttpClient) {}

    create(troco: ITroco): Observable<EntityResponseType> {
        return this.http.post<ITroco>(this.resourceUrl, troco, { observe: 'response' });
    }

    update(troco: ITroco): Observable<EntityResponseType> {
        return this.http.put<ITroco>(this.resourceUrl, troco, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITroco>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITroco[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
