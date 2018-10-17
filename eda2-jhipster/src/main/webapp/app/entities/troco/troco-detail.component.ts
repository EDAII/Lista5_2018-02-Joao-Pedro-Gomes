import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITroco } from 'app/shared/model/troco.model';

@Component({
    selector: 'jhi-troco-detail',
    templateUrl: './troco-detail.component.html'
})
export class TrocoDetailComponent implements OnInit {
    troco: ITroco;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ troco }) => {
            this.troco = troco;
        });
    }

    previousState() {
        window.history.back();
    }
}
