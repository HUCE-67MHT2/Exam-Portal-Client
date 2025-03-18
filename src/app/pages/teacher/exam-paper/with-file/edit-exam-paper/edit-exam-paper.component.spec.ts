import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditExamPaperComponent} from './edit-exam-paper.component';

describe('EditExamPaperComponent', () => {
    let component: EditExamPaperComponent;
    let fixture: ComponentFixture<EditExamPaperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditExamPaperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EditExamPaperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
