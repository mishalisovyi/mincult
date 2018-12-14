import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertRequestsListComponent } from './expert-requests-list.component';

describe('ExpertRequestsListComponent', () => {
  let component: ExpertRequestsListComponent;
  let fixture: ComponentFixture<ExpertRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
