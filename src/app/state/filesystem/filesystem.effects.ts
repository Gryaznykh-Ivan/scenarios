import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FilesystemActions from './filesystem.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Injectable()
export class FilesystemEffects {
  constructor(
    private actions$: Actions<any>,
    private filesystemService: FilesystemService
  ) {}

  getFilesystem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FilesystemActions.getFilesystemInitiated,
        FilesystemActions.renameFileSuccess,
        FilesystemActions.renameFolderSuccess,
        FilesystemActions.createFileSuccess,
        FilesystemActions.createFolderSuccess,
        FilesystemActions.removeFileSuccess,
        FilesystemActions.removeFolderSuccess
      ),
      switchMap((action) =>
        this.filesystemService.getFolder({ id: 0 }).pipe(
          map((next) => FilesystemActions.getFilesystemSuccess(next)),
          catchError((error: HttpErrorResponse) =>
            of(FilesystemActions.getFilesystemFailed({ error: error.message }))
          )
        )
      )
    )
  );

  isFolderExist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.isFolderExistInitiated),
      switchMap((action) =>
        this.filesystemService
          .isFolderEmpty({
            id: action.id,
          })
          .pipe(
            map((next) => FilesystemActions.isFolderExistSuccess(next)),
            catchError((error: HttpErrorResponse) =>
              of(
                FilesystemActions.isFolderExistFailed({ error: error.message })
              )
            )
          )
      )
    )
  );

  createFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.createFileInitiated),
      switchMap((action) =>
        this.filesystemService
          .createFile({
            parentFolderId: action.parentFolderId,
            name: action.name,
          })
          .pipe(
            map((next) => FilesystemActions.createFileSuccess(next)),
            catchError((error: HttpErrorResponse) =>
              of(FilesystemActions.createFileFailed({ error: error.message }))
            )
          )
      )
    )
  );

  createFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.createFolderInitiated),
      switchMap((action) =>
        this.filesystemService
          .createFolder({
            parentFolderId: action.parentFolderId,
            name: action.name,
          })
          .pipe(
            map((next) => FilesystemActions.createFolderSuccess(next)),
            catchError((error: HttpErrorResponse) =>
              of(FilesystemActions.createFolderFailed({ error: error.message }))
            )
          )
      )
    )
  );

  renameFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.renameFolderInitiated),
      switchMap((action) =>
        this.filesystemService
          .renameFolder({ id: action.id, name: action.name })
          .pipe(
            map((next) => FilesystemActions.renameFolderSuccess(next)),
            catchError((error: HttpErrorResponse) =>
              of(FilesystemActions.renameFolderFailed({ error: error.message }))
            )
          )
      )
    )
  );

  renameFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.renameFileInitiated),
      switchMap((action) =>
        this.filesystemService
          .renameFile({ id: action.id, name: action.name })
          .pipe(
            map((next) => FilesystemActions.renameFileSuccess(next)),
            catchError((error: HttpErrorResponse) =>
              of(FilesystemActions.renameFileFailed({ error: error.message }))
            )
          )
      )
    )
  );

  removeFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.removeFileInitiated),
      switchMap((action) =>
        this.filesystemService.removeFile({ id: action.id }).pipe(
          map(() => FilesystemActions.removeFileSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(FilesystemActions.removeFileFailed({ error: error.message }))
          )
        )
      )
    )
  );

  removeFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.removeFolderInitiated),
      switchMap((action) =>
        this.filesystemService
          .removeFolder({ id: action.id, cascade: action.cascade })
          .pipe(
            map(() => FilesystemActions.removeFolderSuccess()),
            catchError((error: HttpErrorResponse) =>
              of(FilesystemActions.removeFolderFailed({ error: error.message }))
            )
          )
      )
    )
  );
}
