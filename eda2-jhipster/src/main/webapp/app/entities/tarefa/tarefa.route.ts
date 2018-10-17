import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tarefa } from 'app/shared/model/tarefa.model';
import { TarefaService } from './tarefa.service';
import { TarefaComponent } from './tarefa.component';
import { TarefaDetailComponent } from './tarefa-detail.component';
import { TarefaUpdateComponent } from './tarefa-update.component';
import { TarefaDeletePopupComponent } from './tarefa-delete-dialog.component';
import { ITarefa } from 'app/shared/model/tarefa.model';

@Injectable({ providedIn: 'root' })
export class TarefaResolve implements Resolve<ITarefa> {
    constructor(private service: TarefaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tarefa: HttpResponse<Tarefa>) => tarefa.body));
        }
        return of(new Tarefa());
    }
}

export const tarefaRoute: Routes = [
    {
        path: 'tarefa',
        component: TarefaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarefas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tarefa/:id/view',
        component: TarefaDetailComponent,
        resolve: {
            tarefa: TarefaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarefas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tarefa/new',
        component: TarefaUpdateComponent,
        resolve: {
            tarefa: TarefaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarefas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tarefa/:id/edit',
        component: TarefaUpdateComponent,
        resolve: {
            tarefa: TarefaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarefas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tarefaPopupRoute: Routes = [
    {
        path: 'tarefa/:id/delete',
        component: TarefaDeletePopupComponent,
        resolve: {
            tarefa: TarefaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarefas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
