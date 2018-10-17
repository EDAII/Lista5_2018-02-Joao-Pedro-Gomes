import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITroco } from 'app/shared/model/troco.model';
import { Principal } from 'app/core';
import { TrocoService } from './troco.service';

let moedas = [0.5,1.0,2.5,5,1];

@Component({
    selector: 'jhi-troco',
    templateUrl: './troco.component.html'
})
export class TrocoComponent implements OnInit, OnDestroy {
    trocos: ITroco[];
    currentAccount: any;
    eventSubscriber: Subscription;
    

    constructor(
        private trocoService: TrocoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.trocoService.query().subscribe(
            (res: HttpResponse<ITroco[]>) => {
                this.trocos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTrocos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITroco) {
        return item.id;
    }

    registerChangeInTrocos() {
        this.eventSubscriber = this.eventManager.subscribe('trocoListModification', response => this.loadAll());
    }

    calculaTroco(valor){
        let moedas2 = [0.05, 0.10, 0.25, 0.50, 1];   
            if(valor == 0){
                return [];
            }
        for (var i = 0; i<moedas2.length; i++){
            if(moedas2[i] <= valor){
                return moedas2[i] + this.calculaTroco(valor);
            }

        }

        alert('Troco: ' + this.calculaTroco(valor))

    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
