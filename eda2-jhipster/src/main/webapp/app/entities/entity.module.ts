import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Eda2TarefaModule } from './tarefa/tarefa.module';
import { Eda2TrocoModule } from './troco/troco.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Eda2TarefaModule,
        Eda2TrocoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Eda2EntityModule {}
