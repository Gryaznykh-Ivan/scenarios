import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
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
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TabService } from './tab.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITab } from '../models/tab.model';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _refetch$ = new BehaviorSubject<boolean>(true);
  private _error$ = new BehaviorSubject<string>('');
  private _activeTab?: ITab;

  constructor(private http: HttpClient, private tabService: TabService) {
    this.tabService.tabs$.pipe(takeUntilDestroyed()).subscribe((tabs) => {
      const activeTab = tabs.find((c) => c.isActive === true);
      const currentActiveTab = this._activeTab;

      if (activeTab === undefined) return;
      if (
        currentActiveTab?.fileId === activeTab.fileId &&
        currentActiveTab?.nodeId === activeTab.nodeId &&
        currentActiveTab?.scenarioId === activeTab.scenarioId
      ) {
        return;
      }

      this._activeTab = activeTab;

      if (
        typeof activeTab.fileId === 'number' &&
        activeTab.fileId !== currentActiveTab?.fileId
      ) {
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
    if (this._activeTab?.fileId === undefined)
      return throwError(() => 'fileId не найден');

    setTimeout(() => this._loading$.next(true), 0);

    return this.http
      .get<IScenario[]>(`${environment.BASE_URL}/file/scenarios`, {
        params: new HttpParams({
          fromObject: {
            id: this._activeTab.fileId,
          },
        }),
      })
      .pipe(
        tap((next) => {
          this._error$.next('');

          const firstScenarioId = next[0]?.id;

          if (firstScenarioId === undefined) return;
          if (this._activeTab?.scenarioId !== undefined) return;
          if (this._activeTab?.scenarioId === firstScenarioId) return;

          this.tabService.updateActiveTab({ scenarioId: firstScenarioId });
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  createScenario(
    data: ICreateScenarioRequest
  ): Observable<ICreateScenarioResponse> {
    if (this._activeTab?.fileId === undefined)
      return throwError(() => 'fileId не найден');

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
              fileId: this._activeTab.fileId,
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
    if (this._activeTab?.fileId === undefined)
      return throwError(() => 'fileId не найден');

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
          this.tabService.maintainIntegrity('scenarioId', data.id);

          this._refetch$.next(true);
          this._error$.next('');
        }),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  selectScenario(id: number) {
    this.tabService.updateActiveTab({ scenarioId: id });
  }

  private errorHandler(error: HttpErrorResponse) {
    this._error$.next(error.message);
    return throwError(() => error.message);
  }
}
