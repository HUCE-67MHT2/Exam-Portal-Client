import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExamComponent} from './exam.component';
import {FindButtonComponent} from "../../../layout/button/find-button/find-button.component"

describe('ExamComponent', () => {
  let component: ExamComponent;
  let fixture: ComponentFixture<ExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
