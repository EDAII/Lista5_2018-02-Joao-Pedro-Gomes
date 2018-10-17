/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Eda2TestModule } from '../../../test.module';
import { TrocoDeleteDialogComponent } from 'app/entities/troco/troco-delete-dialog.component';
import { TrocoService } from 'app/entities/troco/troco.service';

describe('Component Tests', () => {
    describe('Troco Management Delete Component', () => {
        let comp: TrocoDeleteDialogComponent;
        let fixture: ComponentFixture<TrocoDeleteDialogComponent>;
        let service: TrocoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Eda2TestModule],
                declarations: [TrocoDeleteDialogComponent]
            })
                .overrideTemplate(TrocoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrocoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrocoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
