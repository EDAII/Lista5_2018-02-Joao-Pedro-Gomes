/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Eda2TestModule } from '../../../test.module';
import { TrocoUpdateComponent } from 'app/entities/troco/troco-update.component';
import { TrocoService } from 'app/entities/troco/troco.service';
import { Troco } from 'app/shared/model/troco.model';

describe('Component Tests', () => {
    describe('Troco Management Update Component', () => {
        let comp: TrocoUpdateComponent;
        let fixture: ComponentFixture<TrocoUpdateComponent>;
        let service: TrocoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Eda2TestModule],
                declarations: [TrocoUpdateComponent]
            })
                .overrideTemplate(TrocoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrocoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrocoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Troco(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.troco = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Troco();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.troco = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
