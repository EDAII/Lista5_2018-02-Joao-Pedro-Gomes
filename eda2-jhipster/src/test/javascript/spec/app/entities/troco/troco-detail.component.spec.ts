/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Eda2TestModule } from '../../../test.module';
import { TrocoDetailComponent } from 'app/entities/troco/troco-detail.component';
import { Troco } from 'app/shared/model/troco.model';

describe('Component Tests', () => {
    describe('Troco Management Detail Component', () => {
        let comp: TrocoDetailComponent;
        let fixture: ComponentFixture<TrocoDetailComponent>;
        const route = ({ data: of({ troco: new Troco(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Eda2TestModule],
                declarations: [TrocoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrocoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrocoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.troco).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
