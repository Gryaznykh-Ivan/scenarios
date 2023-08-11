import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
})
export class CreateFileComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateFileComponent>,
    public filesystem: FilesystemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4)
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }

  submit() {
    if (this.form.valid === false) return
    if (this.data.parentFolderId === undefined) return

    this.filesystem.createFile({
      parentFolderId: this.data.parentFolderId,
      name: this.form.value.name as string
    }).subscribe(() => this.dialogRef.close())
  }
}
