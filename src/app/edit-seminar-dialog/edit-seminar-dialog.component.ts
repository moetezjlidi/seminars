import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-seminar-dialog',
  templateUrl: './edit-seminar-dialog.component.html',
})
export class EditSeminarDialogComponent {
    editForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title),
    presenter: new FormControl(this.data.presenter),
    date: new FormControl(this.data.date),
    description: new FormControl(this.data.description)
  });

  constructor(
    public dialogRef: MatDialogRef<EditSeminarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.editForm.value);
  }
}
