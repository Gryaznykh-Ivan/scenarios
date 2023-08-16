import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  finalize,
  tap,
  throwError,
} from 'rxjs';
import {
  ICreateScenarioRequest,
  ICreateScenarioResponse,
  IRemoveScenarioRequest,
  IRemoveScenarioResponse,
  IScenario,
} from '../models/scenario.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
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

  getScenarios(data: Pick<IScenario, 'id'>): Observable<IScenario[]> {
    this._loading$.next(true);

    return this.http
      .get<IScenario[]>(`${environment.BASE_URL}/file/scenarios`, {
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

  createScenario(
    data: ICreateScenarioRequest
  ): Observable<ICreateScenarioResponse> {
    this._loading$.next(true);

    return this.http
      .post<ICreateScenarioResponse>(
        `${environment.BASE_URL}/scenario`,
        {
          name: data.name,
          description: data.description
        },
        {
          params: new HttpParams({
            fromObject: {
              id: data.modelId,
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

  removeScenario(
    data: IRemoveScenarioRequest
  ): Observable<IRemoveScenarioResponse> {
    this._loading$.next(true);

    return this.http
      .delete<IRemoveScenarioResponse>(`${environment.BASE_URL}/scenario`, {
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

  private errorHandler(_error: HttpErrorResponse) {
    this._error$.next(_error.message);
    return throwError(() => _error.message);
  }
}
