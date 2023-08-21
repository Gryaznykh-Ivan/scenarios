import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  finalize,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IScenario } from '../models/scenario.model';
import { TabService } from './tab.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITab } from '../models/tab.model';

@Injectable({ providedIn: 'root' })
export class EditorService {
  private _refetch$ = new BehaviorSubject<boolean>(true);
  private _error$ = new BehaviorSubject<string>('');
  private _activeTab?: ITab;

  private _loading$ = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this._loading$.asObservable().pipe(
    switchMap((loading) => {
      if (loading === false) {
        return of(false);
      }

      return of(true).pipe(delay(500));
    })
  );

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
        typeof activeTab.scenarioId === 'number' &&
        activeTab.scenarioId !== currentActiveTab?.scenarioId
        ) {
        console.log("EDITOR", this._activeTab)
        this._refetch$.next(false);
      }
    });
  }

  get refetch$() {
    return this._refetch$.asObservable();
  }

  get error$() {
    return this._error$.asObservable();
  }

  getScenario() {
    if (this._activeTab?.scenarioId === undefined) {
      return throwError(() => 'scenarioId не найден');
    }

    this._loading$.next(true);

    return this.http
      .get<IScenario>(`${environment.BASE_URL}/scenario`, {
        params: new HttpParams({
          fromObject: {
            id: this._activeTab.scenarioId,
          },
        }),
      })
      .pipe(
        tap(() => this._error$.next('')),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this._error$.next(error.message);
    return throwError(() => error.message);
  }
}
