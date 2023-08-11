import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RenameFolderComponent } from '../rename-folder/rename-folder.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IConfirm {
  title: string;
  message: string;
  NO?: string;
  YES?: string;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirm
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.dialogRef.close(true)
  }
}
