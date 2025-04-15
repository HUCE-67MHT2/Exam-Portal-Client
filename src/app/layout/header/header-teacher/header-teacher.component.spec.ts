import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderTeacherComponent} from './header-teacher.component';

describe('HeaderTeacherComponent', () => {
  let component: HeaderTeacherComponent;
  let fixture: ComponentFixture<HeaderTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTeacherComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
