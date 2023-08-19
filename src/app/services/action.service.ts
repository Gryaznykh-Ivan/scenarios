import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, finalize, of, switchMap, tap, throwError } from 'rxjs';
import { IAction, IActionGroup } from '../models/action.model';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  _refetch$ = new BehaviorSubject<boolean>(true);
  _error$ = new BehaviorSubject<string>('');

  private _loading$ = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this._loading$.asObservable().pipe(
    switchMap((loading) => {
      if (loading === false) {
        return of(false);
      }

      return of(true).pipe(delay(500));
    })
  );

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  get refetch$() {
    return this._refetch$.asObservable();
  }

  get error$() {
    return this._error$.asObservable();
  }

  getActions() {
    setTimeout(() => this._loading$.next(true), 0);

    return this.http.get<IAction[]>(`${environment.BASE_URL}/action`).pipe(
      tap(() => this._error$.next('')),
      finalize(() => this._loading$.next(false)),
      catchError(this.errorHandler.bind(this))
    );
  }

  getGroupedActions() {
    setTimeout(() => this._loading$.next(true), 0);

    return this.http
      .get<IActionGroup[]>(`${environment.BASE_URL}/action/group`)
      .pipe(
        tap(() => this._error$.next('')),
        finalize(() => this._loading$.next(false)),
        catchError(this.errorHandler.bind(this))
      );
  }

  createActionPreview(action: IAction) {
    let shape;

    switch (action.shape) {
      case 'circle':
        shape = `<ellipse cx="250" cy="250" rx="240" ry="240" fill="${action.backgroundColor}" stroke-width="20" stroke="${action.borderColor}"/>`;
        break;
      case 'triangle':
        shape = `<polygon points="0,500 250,0 500,500" fill="${action.borderColor}"/>
                   <polygon points="250,44.5 467.8,480.1 32.2,480.1" fill="${action.backgroundColor}"/>`;
        break;
      case 'triangle180':
        shape = `<polygon points="0,0 250,500 500,0" fill="${action.borderColor}"/>
                   <polygon points="32.2,19.9 250,455.5 467.8,19.9" fill="${action.backgroundColor}"/>`;
        break;
      case 'rhomb':
        shape = `<path d="M 250,486 14,250 250,14 486,250 Z" fill="${action.backgroundColor}" stroke-width="19.8" stroke="${action.borderColor}"/>`;
        break;
      case 'rectangle':
        shape = `<rect width="480" height="480" x="10" y="10" rx="65" ry="65" fill="${action.backgroundColor}" stroke-width="20" stroke="${action.borderColor}"/>`;
        break;
      case 'pentagon':
        shape = `<path d="M 400,490 H 100 L 12,225 250,14 488,225 Z" fill="${action.backgroundColor}" stroke-width="20" stroke="${action.borderColor}"/>`;
        break;
      case 'hexagon':
        shape = `<path d="M 490,150 490.41631,348.99495 350,490 151.00505,490.41631 10,350 9.5836944,151.00505 150,10 348.99495,9.5836944 Z" fill="${action.backgroundColor}" stroke-width="19.8" stroke="${action.borderColor}"/>`;
        break;
    }

    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="100%" height="100%" viewBox="0 0 500.0 500.0" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          ${shape}
        </g>
      </svg>`
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this._error$.next(error.message);
    return throwError(() => error.message);
  }
}
