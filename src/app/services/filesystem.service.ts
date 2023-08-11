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
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class FilesystemService {
  private refetch$ = new BehaviorSubject(true);

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  get refetch() {
    return this.refetch$.asObservable();
  }

  getFolder(data: Pick<IFolder, 'id'>): Observable<IFolder> {
    return this.http
      .get<IFolder>(`${environment.BASE_URL}/folder`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      })
      .pipe(
        tap(() => this.errorService.clear()),
        catchError(this.errorHandler.bind(this))
      );
  }

  isFolderEmpty(data: Pick<IFolder, 'id'>): Observable<boolean> {
    return this.http
      .get<boolean>(`${environment.BASE_URL}/folder/isEmpty`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      })
      .pipe(
        tap(() => this.errorService.clear()),
        catchError(this.errorHandler.bind(this))
      );
  }

  createFolder(data: ICreateFolderRequest): Observable<ICreateFolderResponse> {
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
          this.refetch$.next(true);
          this.errorService.clear();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  createFile(data: ICreateFileRequest): Observable<ICreateFileResponse> {
    return this.http
      .post<ICreateFileResponse>(
        `${environment.BASE_URL}/model`,
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
          this.refetch$.next(true);
          this.errorService.clear();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  removeFile(data: IRemoveFileRequest): Observable<IRemoveFileResponse> {
    return this.http
      .delete<IRemoveFileResponse>(`${environment.BASE_URL}/model`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      })
      .pipe(
        tap(() => {
          this.refetch$.next(true);
          this.errorService.clear();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  removeFolder(data: IRemoveFolderRequest): Observable<IRemoveFolderResponse> {
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
          this.refetch$.next(true);
          this.errorService.clear();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  renameFolder(data: IRenameFolderRequest): Observable<IRenameFolderResponse> {
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
          this.refetch$.next(true);
          this.errorService.clear();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  renameFile(data: IRenameFileRequest): Observable<IRenameFileResponse> {
    return this.http
      .patch<IRenameFileResponse>(
        `${environment.BASE_URL}/model`,
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
          this.refetch$.next(true);
          this.errorService.clear();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
