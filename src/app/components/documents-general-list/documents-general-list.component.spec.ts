import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsGeneralListComponent } from './documents-general-list.component';

describe('DocumentsGeneralListComponent', () => {
  let component: DocumentsGeneralListComponent;
  let fixture: ComponentFixture<DocumentsGeneralListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsGeneralListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsGeneralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
