import { NgModule } from '@angular/core';

import { Eda2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Eda2SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Eda2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Eda2SharedCommonModule {}
