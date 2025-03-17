import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCreatedAutoDetailComponent } from './exam-created-auto-detail.component';

describe('ExamCreatedAutoDetailComponent', () => {
  let component: ExamCreatedAutoDetailComponent;
  let fixture: ComponentFixture<ExamCreatedAutoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamCreatedAutoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamCreatedAutoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
