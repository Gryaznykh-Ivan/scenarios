import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  tap,
  throwError,
} from 'rxjs';
import { IFile } from '../models/file.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  _refetch$ = new BehaviorSubject<boolean>(false);
  _loading$ = new BehaviorSubject<boolean>(false);
  _error$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  get refetch$() {
    return this._refetch$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get error$() {
    return this._error$.asObservable();
  }

  getScenarios(data: Pick<IFile, 'id'>): Observable<IFile[]> {
    this._loading$.next(true);

    return this.http
      .get<IFile[]>(`${environment.BASE_URL}/file/scenarios`, {
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

  private errorHandler(_error: HttpErrorResponse) {
    this._error$.next(_error.message);
    return throwError(() => _error.message);
  }
}
