import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeminarDialogComponent } from './edit-seminar-dialog.component';

describe('EditSeminarDialogComponent', () => {
  let component: EditSeminarDialogComponent;
  let fixture: ComponentFixture<EditSeminarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSeminarDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSeminarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
