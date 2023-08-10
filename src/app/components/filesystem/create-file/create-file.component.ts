import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IModal } from 'src/app/models/modal.model';
import { FilesystemService } from 'src/app/services/filesystem.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
})
export class CreateFileComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    public filesystem: FilesystemService
  ) {}
  
  modal: IModal

  ngOnInit(): void {
    this.modalService.modal$.subscribe(modal => this.modal = modal)
  }

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
    this.filesystem.createFile({
      parentFolderId: this.modal.data.parentFolderId,
      name: this.form.value.name as string
    }).subscribe(() => this.modalService.close())
  }
}
