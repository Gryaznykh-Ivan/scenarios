import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
import { TabService } from 'src/app/services/tab.service';
import { getFilesystemInitiated, selectFilesystem, selectFilesystemError, selectFilesystemFolder, selectFilesystemLoading } from 'src/app/state/filesystem';

@Component({
  selector: 'app-filesystem-form',
  templateUrl: 'filesystem-form.component.html',
})
export class FilesystemFormComponent implements OnInit {
  loading$ = this.store.select(selectFilesystemLoading)
  folder$ = this.store.select(selectFilesystemFolder)
  error$ = this.store.select(selectFilesystemError)

  constructor(
    public tabService: TabService,
    public router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.getFolder();
  }

  getFolder() {
    this.store.dispatch(getFilesystemInitiated())
  }

  selectFile = (data: IFile) => {
    this.tabService.updateActiveTab({ title: data.name, fileId: data.id })
  };
}
