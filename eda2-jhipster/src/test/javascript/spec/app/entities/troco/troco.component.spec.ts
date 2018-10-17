/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Eda2TestModule } from '../../../test.module';
import { TrocoComponent } from 'app/entities/troco/troco.component';
import { TrocoService } from 'app/entities/troco/troco.service';
import { Troco } from 'app/shared/model/troco.model';

describe('Component Tests', () => {
    describe('Troco Management Component', () => {
        let comp: TrocoComponent;
        let fixture: ComponentFixture<TrocoComponent>;
        let service: TrocoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Eda2TestModule],
                declarations: [TrocoComponent],
                providers: []
            })
                .overrideTemplate(TrocoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrocoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrocoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Troco(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.trocos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
