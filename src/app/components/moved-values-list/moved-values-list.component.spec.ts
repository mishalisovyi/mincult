import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovedValuesListComponent } from './moved-values-list.component';

describe('MovedValuesListComponent', () => {
  let component: MovedValuesListComponent;
  let fixture: ComponentFixture<MovedValuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovedValuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovedValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
