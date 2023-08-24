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
import { IScenario } from '../models/scenarios.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITab } from '../models/tab.model';

@Injectable({ providedIn: 'root' })
export class EditorService {
  constructor(private http: HttpClient) {
  }
}
