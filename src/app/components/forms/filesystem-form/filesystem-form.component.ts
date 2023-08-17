import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  catchError,
  delay,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { IFile, IFolder } from 'src/app/models/filesystem.model';
import { FilesystemService } from 'src/app/services/filesystem.service';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-filesystem-form',
  templateUrl: 'filesystem-form.component.html',
})
export class FilesystemFormComponent implements OnInit {
  folder$: Observable<IFolder>;

  constructor(
    public tabService: TabService,
    public filesystemService: FilesystemService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getFolder();
  }

  getFolder() {
    this.folder$ = this.filesystemService.refetch$.pipe(
      switchMap(() => this.filesystemService.getFolder({ id: 0 }))
    );
  }

  selectFile = (data: IFile) => {
    this.tabService.updateActiveTab({ title: data.name, fileId: data.id })
  };
}