import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCreatesFormComponent } from './courses-creates-form.component';

describe('CoursesCreatesFormComponent', () => {
  let component: CoursesCreatesFormComponent;
  let fixture: ComponentFixture<CoursesCreatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesCreatesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCreatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
