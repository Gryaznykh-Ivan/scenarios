import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, pipe, switchMap } from 'rxjs';
import {
  getActionsFailed,
  getActionsInitiated,
  getActionsSuccess,
  getGroupedActionsFailed,
  getGroupedActionsInitiated,
  getGroupedActionsSuccess,
} from './actions.actions';
import { ActionService } from 'src/app/services/action.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  selectFileId,
  selectFileInitiated,
  selectTabInitiated,
  updateActiveTabInitiated,
} from '../tabs';
import { Store } from '@ngrx/store';

@Injectable()
export class ActionsEffects {
  constructor(
    private actions$: Actions<any>,
    private actionService: ActionService,
    private store: Store
  ) {}

  refetchActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectTabInitiated, selectFileInitiated),
      concatLatestFrom(() => this.store.select(selectFileId)),
      filter(([_, fileId]) => fileId !== null),
      switchMap(() => of(getGroupedActionsInitiated()))
    )
  );

  getActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActionsInitiated),
      switchMap(() =>
        this.actionService.getActions().pipe(
          map((next) => getActionsSuccess({ payload: next })),
          catchError((error: HttpErrorResponse) =>
            of(
              getActionsFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );

  getGroupedActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGroupedActionsInitiated),
      switchMap(() =>
        this.actionService.getGroupedActions().pipe(
          map((next) => getGroupedActionsSuccess({ payload: next })),
          catchError((error: HttpErrorResponse) =>
            of(
              getGroupedActionsFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );
}
