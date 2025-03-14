import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCreatedDetailComponent } from './exam-created-detail.component';

describe('ExamCreatedDetailComponent', () => {
  let component: ExamCreatedDetailComponent;
  let fixture: ComponentFixture<ExamCreatedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamCreatedDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamCreatedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
