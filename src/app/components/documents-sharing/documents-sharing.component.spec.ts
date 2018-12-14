import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsSharingComponent } from './documents-sharing.component';

describe('DocumentsSharingComponent', () => {
  let component: DocumentsSharingComponent;
  let fixture: ComponentFixture<DocumentsSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
