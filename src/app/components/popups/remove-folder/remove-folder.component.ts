import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRemoveFolderRequest } from 'src/app/models/filesystem.model';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
  selector: 'app-remove-folder',
  templateUrl: './remove-folder.component.html',
})
export class RemoveFolderComponent {
  isFolderEmpty = true

  constructor(
    public dialogRef: MatDialogRef<RemoveFolderComponent>,
    public filesystem: FilesystemService,
    @Inject(MAT_DIALOG_DATA) public data: IRemoveFolderRequest
  ) { }

  ngOnInit(): void {
    this.filesystem.isFolderEmpty({ id: this.data.id }).subscribe(result => this.isFolderEmpty = result)
  }

  removeFolderCascade() {
    this.filesystem.removeFolder({ id: this.data.id, cascade: true }).subscribe(() => this.dialogRef.close())
  }

  removeFolder() {
    this.filesystem.removeFolder({ id: this.data.id, cascade: false }).subscribe(() => this.dialogRef.close())
  }
}
