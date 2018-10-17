import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITroco } from 'app/shared/model/troco.model';
import { TrocoService } from './troco.service';

@Component({
    selector: 'jhi-troco-update',
    templateUrl: './troco-update.component.html'
})
export class TrocoUpdateComponent implements OnInit {
    troco: ITroco;
    isSaving: boolean;

    constructor(private trocoService: TrocoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ troco }) => {
            this.troco = troco;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.troco.id !== undefined) {
            this.subscribeToSaveResponse(this.trocoService.update(this.troco));
        } else {
            this.subscribeToSaveResponse(this.trocoService.create(this.troco));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITroco>>) {
        result.subscribe((res: HttpResponse<ITroco>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
