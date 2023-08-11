import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
})
export class CreateFolderComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateFolderComponent>,
    public filesystem: FilesystemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }

  submit() {
    if (this.form.valid === false) return
    if (this.data.parentFolderId === undefined) return

    this.filesystem.createFolder({
      parentFolderId: this.data.parentFolderId,
      name: this.form.value.name as string
    }).subscribe(() => this.dialogRef.close())
  }
}
