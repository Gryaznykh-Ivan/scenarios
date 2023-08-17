import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmWithCheckbox, IConfirmWithName } from 'src/app/models/confirm.model';

@Component({
  selector: 'app-confirm-with-checkbox',
  templateUrl: './confirm-with-checkbox.component.html',
})
export class ConfirmWithCheckboxComponent {
  constructor(
    public dialogRef: MatDialogRef<IConfirmWithName>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmWithCheckbox
  ) { }

  ngOnInit(): void { }

  form = new FormGroup({
    checked: new FormControl<boolean>(this.data.checked ?? false)
  })

  get checked() {
    return this.form.controls.checked as FormControl
  }

  submit() {
    if (this.form.valid === false) return

    this.dialogRef.close({ checked: this.checked.value })
  }
}
