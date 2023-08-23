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
          map((next) => FilesystemActions.getFilesystemSuccess({payload: next})),
          catchError((error: HttpErrorResponse) =>
            of(
              FilesystemActions.getFilesystemFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );

  isFolderExist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.isFolderExistInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .isFolderEmpty({
            id: payload.id,
          })
          .pipe(
            map((next) =>
              FilesystemActions.isFolderExistSuccess({ payload: next })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                FilesystemActions.isFolderExistFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );

  createFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.createFileInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .createFile({
            parentFolderId: payload.parentFolderId,
            name: payload.name,
          })
          .pipe(
            map((next) => FilesystemActions.createFileSuccess({payload: next})),
            catchError((error: HttpErrorResponse) =>
              of(
                FilesystemActions.createFileFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );

  createFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.createFolderInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .createFolder({
            parentFolderId: payload.parentFolderId,
            name: payload.name,
          })
          .pipe(
            map((next) => FilesystemActions.createFolderSuccess({payload: next})),
            catchError((error: HttpErrorResponse) =>
              of(
                FilesystemActions.createFolderFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );

  renameFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.renameFolderInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .renameFolder({ id: payload.id, name: payload.name })
          .pipe(
            map((next) => FilesystemActions.renameFolderSuccess({payload: next})),
            catchError((error: HttpErrorResponse) =>
              of(
                FilesystemActions.renameFolderFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );

  renameFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.renameFileInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .renameFile({ id: payload.id, name: payload.name })
          .pipe(
            map((next) => FilesystemActions.renameFileSuccess({payload: next})),
            catchError((error: HttpErrorResponse) =>
              of(
                FilesystemActions.renameFileFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );

  removeFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.removeFileInitiated),
      switchMap(({ payload }) =>
        this.filesystemService.removeFile({ id: payload.id }).pipe(
          map(() => FilesystemActions.removeFileSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              FilesystemActions.removeFileFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );

  removeFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesystemActions.removeFolderInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .removeFolder({ id: payload.id, cascade: payload.cascade })
          .pipe(
            map(() => FilesystemActions.removeFolderSuccess()),
            catchError((error: HttpErrorResponse) =>
              of(
                FilesystemActions.removeFolderFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );
}
