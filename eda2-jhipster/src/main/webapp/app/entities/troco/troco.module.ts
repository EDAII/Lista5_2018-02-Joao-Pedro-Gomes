import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Eda2SharedModule } from 'app/shared';
import {
    TrocoComponent,
    TrocoDetailComponent,
    TrocoUpdateComponent,
    TrocoDeletePopupComponent,
    TrocoDeleteDialogComponent,
    trocoRoute,
    trocoPopupRoute
} from './';

const ENTITY_STATES = [...trocoRoute, ...trocoPopupRoute];

@NgModule({
    imports: [Eda2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TrocoComponent, TrocoDetailComponent, TrocoUpdateComponent, TrocoDeleteDialogComponent, TrocoDeletePopupComponent],
    entryComponents: [TrocoComponent, TrocoUpdateComponent, TrocoDeleteDialogComponent, TrocoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Eda2TrocoModule {}
