import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  debounceTime,
  finalize,
  tap,
  throwError,
  timeout,
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
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TabService } from './tab.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _refetch$ = new BehaviorSubject<boolean>(true);
  private _error$ = new BehaviorSubject<string>('');

  fileId?: number;

  constructor(private http: HttpClient, private tabService: TabService) {
    this.tabService.tabs$.pipe(takeUntilDestroyed()).subscribe((tabs) => {
      const activeTab = tabs.find((c) => c.isActive === true);
      if (activeTab === undefined) return;
      if (this.fileId === activeTab.fileId) return;

      this.fileId = activeTab.fileId;

      if (typeof this.fileId === 'number') {
        this._refetch$.next(false);
      }
    });
  }

  get refetch$() {
    return this._refetch$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get error$() {
    return this._error$.asObservable();
  }

  getScenarios(): Observable<IScenario[]> {
    if (this.fileId === undefined) return throwError(() => 'FileId не найден');

    setTimeout(() => this._loading$.next(true), 0);

    return this.http
      .get<IScenario[]>(`${environment.BASE_URL}/file/scenarios`, {
        params: new HttpParams({
          fromObject: {
            id: this.fileId,
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
    if (this.fileId === undefined) return throwError(() => 'FileId не найден');

    setTimeout(() => this._loading$.next(true), 0);

    return this.http
      .post<ICreateScenarioResponse>(
        `${environment.BASE_URL}/scenario`,
        {
          name: data.name,
          description: data.description,
        },
        {
          params: new HttpParams({
            fromObject: {
              fileId: this.fileId,
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
    if (this.fileId === undefined) return throwError(() => 'FileId не найден');

    setTimeout(() => this._loading$.next(true), 0);

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

  private errorHandler(error: HttpErrorResponse) {
    this._error$.next(error.message);
    return throwError(() => error.message);
  }
}
