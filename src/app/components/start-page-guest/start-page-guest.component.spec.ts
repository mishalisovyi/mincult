import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageGuestComponent } from './start-page-guest.component';

describe('StartPageGuestComponent', () => {
  let component: StartPageGuestComponent;
  let fixture: ComponentFixture<StartPageGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPageGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
