import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedValuesListComponent } from './missed-values-list.component';

describe('MissedValuesListComponent', () => {
  let component: MissedValuesListComponent;
  let fixture: ComponentFixture<MissedValuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissedValuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissedValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
