import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegularRequestComponent } from './create-regular-request.component';

describe('CreateRegularRequestComponent', () => {
  let component: CreateRegularRequestComponent;
  let fixture: ComponentFixture<CreateRegularRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRegularRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRegularRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
