import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCreatesFilterComponent } from './courses-creates-filter.component';

describe('CoursesCreatesFilterComponent', () => {
  let component: CoursesCreatesFilterComponent;
  let fixture: ComponentFixture<CoursesCreatesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesCreatesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCreatesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
