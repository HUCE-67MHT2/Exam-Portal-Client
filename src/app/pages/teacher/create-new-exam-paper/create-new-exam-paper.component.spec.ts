import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewExamPaperComponent } from './create-new-exam-paper.component';

describe('CreateNewExamPaperComponent', () => {
  let component: CreateNewExamPaperComponent;
  let fixture: ComponentFixture<CreateNewExamPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewExamPaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewExamPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
