import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMoveRequestComponent } from './create-move-request.component';

describe('CreateMoveRequestComponent', () => {
  let component: CreateMoveRequestComponent;
  let fixture: ComponentFixture<CreateMoveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMoveRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMoveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
