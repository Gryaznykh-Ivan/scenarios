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
import { getFilesystemInitiated, selectError, selectFolder, selectLoading } from 'src/app/state/filesystem';
import { selectTabInitiated, updateActiveTabInitiated } from 'src/app/state/tabs';

@Component({
  selector: 'app-filesystem-form',
  templateUrl: 'filesystem-form.component.html',
})
export class FilesystemFormComponent implements OnInit {
  loading$ = this.store.select(selectLoading)
  folder$ = this.store.select(selectFolder)
  error$ = this.store.select(selectError)

  constructor(
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
    this.store.dispatch(updateActiveTabInitiated({ fileId: data.id, title: data.name }))
  };
}
