import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FilesystemService } from 'src/app/services/filesystem.service';
import {
  createFileFailed,
  createFileInitiated,
  createFileSuccess,
  createFolderFailed,
  createFolderInitiated,
  createFolderSuccess,
  getFilesystemFailed,
  getFilesystemInitiated,
  getFilesystemSuccess,
  isFolderExistFailed,
  isFolderExistInitiated,
  isFolderExistSuccess,
  removeFileFailed,
  removeFileInitiated,
  removeFileSuccess,
  removeFolderFailed,
  removeFolderInitiated,
  removeFolderSuccess,
  renameFileFailed,
  renameFileInitiated,
  renameFileSuccess,
  renameFolderFailed,
  renameFolderInitiated,
  renameFolderSuccess,
} from './filesystem.actions';

@Injectable()
export class FilesystemEffects {
  constructor(
    private actions$: Actions<any>,
    private filesystemService: FilesystemService
  ) {}

  refetchFilesystem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        renameFileSuccess,
        renameFolderSuccess,
        createFileSuccess,
        createFolderSuccess,
        removeFileSuccess,
        removeFolderSuccess
      ),
      switchMap(() => of(getFilesystemInitiated()))
    )
  );

  getFilesystem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilesystemInitiated),
      switchMap((action) =>
        this.filesystemService.getFolder({ id: 0 }).pipe(
          map((next) => getFilesystemSuccess({ payload: next })),
          catchError((error: HttpErrorResponse) =>
            of(
              getFilesystemFailed({
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
      ofType(isFolderExistInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .isFolderEmpty({
            id: payload.id,
          })
          .pipe(
            map((next) => isFolderExistSuccess({ payload: next })),
            catchError((error: HttpErrorResponse) =>
              of(
                isFolderExistFailed({
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
      ofType(createFileInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .createFile({
            parentFolderId: payload.parentFolderId,
            name: payload.name,
          })
          .pipe(
            map((next) => createFileSuccess({ payload: next })),
            catchError((error: HttpErrorResponse) =>
              of(
                createFileFailed({
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
      ofType(createFolderInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .createFolder({
            parentFolderId: payload.parentFolderId,
            name: payload.name,
          })
          .pipe(
            map((next) => createFolderSuccess({ payload: next })),
            catchError((error: HttpErrorResponse) =>
              of(
                createFolderFailed({
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
      ofType(renameFolderInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .renameFolder({ id: payload.id, name: payload.name })
          .pipe(
            map((next) => renameFolderSuccess({ payload: next })),
            catchError((error: HttpErrorResponse) =>
              of(
                renameFolderFailed({
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
      ofType(renameFileInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .renameFile({ id: payload.id, name: payload.name })
          .pipe(
            map((next) => renameFileSuccess({ payload: next })),
            catchError((error: HttpErrorResponse) =>
              of(
                renameFileFailed({
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
      ofType(removeFileInitiated),
      switchMap(({ payload }) =>
        this.filesystemService.removeFile({ id: payload.id }).pipe(
          map(() => removeFileSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              removeFileFailed({
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
      ofType(removeFolderInitiated),
      switchMap(({ payload }) =>
        this.filesystemService
          .removeFolder({ id: payload.id, cascade: payload.cascade })
          .pipe(
            map(() => removeFolderSuccess()),
            catchError((error: HttpErrorResponse) =>
              of(
                removeFolderFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );
}
