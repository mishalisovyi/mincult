import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularValuesListComponent } from './regular-values-list.component';

describe('RegularValuesListComponent', () => {
  let component: RegularValuesListComponent;
  let fixture: ComponentFixture<RegularValuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularValuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
