import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Troco } from 'app/shared/model/troco.model';
import { TrocoService } from './troco.service';
import { TrocoComponent } from './troco.component';
import { TrocoDetailComponent } from './troco-detail.component';
import { TrocoUpdateComponent } from './troco-update.component';
import { TrocoDeletePopupComponent } from './troco-delete-dialog.component';
import { ITroco } from 'app/shared/model/troco.model';

@Injectable({ providedIn: 'root' })
export class TrocoResolve implements Resolve<ITroco> {
    constructor(private service: TrocoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((troco: HttpResponse<Troco>) => troco.body));
        }
        return of(new Troco());
    }
}

export const trocoRoute: Routes = [
    {
        path: 'troco',
        component: TrocoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trocos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'troco/:id/view',
        component: TrocoDetailComponent,
        resolve: {
            troco: TrocoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trocos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'troco/new',
        component: TrocoUpdateComponent,
        resolve: {
            troco: TrocoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trocos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'troco/:id/edit',
        component: TrocoUpdateComponent,
        resolve: {
            troco: TrocoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trocos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trocoPopupRoute: Routes = [
    {
        path: 'troco/:id/delete',
        component: TrocoDeletePopupComponent,
        resolve: {
            troco: TrocoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trocos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
