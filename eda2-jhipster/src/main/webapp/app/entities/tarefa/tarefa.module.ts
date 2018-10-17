import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Eda2SharedModule } from 'app/shared';
import { Eda2AdminModule } from 'app/admin/admin.module';
import {
    TarefaComponent,
    TarefaDetailComponent,
    TarefaUpdateComponent,
    TarefaDeletePopupComponent,
    TarefaDeleteDialogComponent,
    tarefaRoute,
    tarefaPopupRoute
} from './';

const ENTITY_STATES = [...tarefaRoute, ...tarefaPopupRoute];

@NgModule({
    imports: [Eda2SharedModule, Eda2AdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TarefaComponent, TarefaDetailComponent, TarefaUpdateComponent, TarefaDeleteDialogComponent, TarefaDeletePopupComponent],
    entryComponents: [TarefaComponent, TarefaUpdateComponent, TarefaDeleteDialogComponent, TarefaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Eda2TarefaModule {}
