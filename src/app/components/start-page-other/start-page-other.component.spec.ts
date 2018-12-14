import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageOtherComponent } from './start-page-other.component';

describe('StartPageOtherComponent', () => {
  let component: StartPageOtherComponent;
  let fixture: ComponentFixture<StartPageOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPageOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
