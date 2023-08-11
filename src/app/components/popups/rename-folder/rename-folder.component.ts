import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRenameFolderRequest } from 'src/app/models/filesystem.model';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
  selector: 'app-rename-folder',
  templateUrl: './rename-folder.component.html',
})
export class RenameFolderComponent {
  constructor(
    public dialogRef: MatDialogRef<RenameFolderComponent>,
    public filesystem: FilesystemService,
    @Inject(MAT_DIALOG_DATA) public data: IRenameFolderRequest
  ) {}

  ngOnInit(): void {}

  form = new FormGroup({
    name: new FormControl<string>(this.data.name, [Validators.required]),
  });

  get name() {
    return this.form.controls.name as FormControl;
  }

  submit() {
    if (this.form.valid === false) return;
    if (this.data.id === undefined) return;

    this.filesystem
      .renameFolder({
        id: this.data.id,
        name: this.form.value.name as string,
      })
      .subscribe(() => this.dialogRef.close());
  }
}
