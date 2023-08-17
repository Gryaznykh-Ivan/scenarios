import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmWithName } from 'src/app/models/confirm.model';

@Component({
  selector: 'app-confirm-with-name',
  templateUrl: './confirm-with-name.component.html',
})
export class ConfirmWithNameComponent {
  constructor(
    public dialogRef: MatDialogRef<IConfirmWithName>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmWithName
  ) { }

  ngOnInit(): void { }

  form = new FormGroup({
    name: new FormControl<string>(this.data.name ?? "", [
      Validators.required
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }

  submit() {
    if (this.form.valid === false) return

    this.dialogRef.close({ name: this.name.value })
  }
}
