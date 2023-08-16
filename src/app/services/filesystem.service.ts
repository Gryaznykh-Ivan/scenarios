import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  first,
  tap,
  throwError,
  BehaviorSubject,
  delay,
  finalize,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IFolder,
  ICreateFileRequest,
  ICreateFileResponse,
  ICreateFolderRequest,
  ICreateFolderResponse,
  IRemoveFileRequest,
  IRemoveFileResponse,
  IRemoveFolderRequest,
  IRemoveFolderResponse,
  IRenameFileRequest,
  IRenameFileResponse,
  IRenameFolderRequest,
  IRenameFolderResponse,
} from '../models/filesystem.model';

@Injectable({ providedIn: 'root' })
export class FilesystemService {
  _refetch$ = new BehaviorSubject<boolean>(false);
  _loading$ = new BehaviorSubject<boolean>(false);
  _error$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  get refetch$(){
    return this._refetch$.asObservable()
  }

  get loading$(){
    return this._loading$.asObservable()
  }

  get error$(){
    return this._error$.asObservable()
  }

  getFolder(data: Pick<IFolder, 'id'>): Observable<IFolder> {
    this._loading$.next(true);

    return this.http
      .get<IFolder>(`${environment.BASE_URL}/folder`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      })
      .pipe(
        tap(() => this._error$.next('')),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  isFolderEmpty(data: Pick<IFolder, 'id'>): Observable<boolean> {
    this._loading$.next(true);

    return this.http
      .get<boolean>(`${environment.BASE_URL}/folder/isEmpty`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      })
      .pipe(
        tap(() => this._error$.next('')),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  createFolder(data: ICreateFolderRequest): Observable<ICreateFolderResponse> {
    this._loading$.next(true);

    return this.http
      .post<ICreateFolderResponse>(
        `${environment.BASE_URL}/folder`,
        {
          name: data.name,
        },
        {
          params: new HttpParams({
            fromObject: {
              parentFolderId: data.parentFolderId,
            },
          }),
        }
      )
      .pipe(
        tap(() => {
          this._refetch$.next(true);
          this._error$.next('');
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  createFile(data: ICreateFileRequest): Observable<ICreateFileResponse> {
    this._loading$.next(true);

    return this.http
      .post<ICreateFileResponse>(
        `${environment.BASE_URL}/file`,
        {
          name: data.name,
        },
        {
          params: new HttpParams({
            fromObject: {
              parentFolderId: data.parentFolderId,
            },
          }),
        }
      )
      .pipe(
        tap(() => {
          this._refetch$.next(true);
          this._error$.next('');
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  removeFile(data: IRemoveFileRequest): Observable<IRemoveFileResponse> {
    this._loading$.next(true);

    return this.http
      .delete<IRemoveFileResponse>(`${environment.BASE_URL}/file`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      })
      .pipe(
        tap(() => {
          this._refetch$.next(true);
          this._error$.next('');
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  removeFolder(data: IRemoveFolderRequest): Observable<IRemoveFolderResponse> {
    this._loading$.next(true);

    return this.http
      .delete<IRemoveFolderResponse>(`${environment.BASE_URL}/folder`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
            cascade: data.cascade,
          },
        }),
      })
      .pipe(
        tap(() => {
          this._refetch$.next(true);
          this._error$.next('');
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  renameFolder(data: IRenameFolderRequest): Observable<IRenameFolderResponse> {
    this._loading$.next(true);

    return this.http
      .patch<IRenameFolderResponse>(
        `${environment.BASE_URL}/folder`,
        {
          name: data.name,
        },
        {
          params: new HttpParams({
            fromObject: {
              id: data.id,
            },
          }),
        }
      )
      .pipe(
        tap(() => {
          this._refetch$.next(true);
          this._error$.next('');
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  renameFile(data: IRenameFileRequest): Observable<IRenameFileResponse> {
    this._loading$.next(true);

    return this.http
      .patch<IRenameFileResponse>(
        `${environment.BASE_URL}/file`,
        {
          name: data.name,
        },
        {
          params: new HttpParams({
            fromObject: {
              id: data.id,
            },
          }),
        }
      )
      .pipe(
        tap(() => {
          this._refetch$.next(true);
          this._error$.next('');
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(_error: HttpErrorResponse) {
    this._error$.next(_error.message);
    return throwError(() => _error.message);
  }
}
