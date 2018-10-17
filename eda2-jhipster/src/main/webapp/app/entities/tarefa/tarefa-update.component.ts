import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITarefa } from 'app/shared/model/tarefa.model';
import { TarefaService } from './tarefa.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-tarefa-update',
    templateUrl: './tarefa-update.component.html'
})
export class TarefaUpdateComponent implements OnInit {
    tarefa: ITarefa;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private tarefaService: TarefaService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tarefa }) => {
            this.tarefa = tarefa;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        console.log('teste', this.tarefa)
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tarefa.id !== undefined) {
            this.subscribeToSaveResponse(this.tarefaService.update(this.tarefa));
        } else {
            this.subscribeToSaveResponse(this.tarefaService.create(this.tarefa));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITarefa>>) {
        result.subscribe((res: HttpResponse<ITarefa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
