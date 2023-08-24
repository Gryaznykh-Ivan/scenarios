import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ScenarioService } from 'src/app/services/scenario.service';
import { Store } from '@ngrx/store';
import {
  selectFileId,
  selectFileInitiated,
  selectScenarioId,
  selectScenarioInitiated,
  selectTabInitiated,
  updateActiveTabInitiated,
} from '../tabs';
import {
  createScenarioFailed,
  createScenarioInitiated,
  createScenarioSuccess,
  getScenarioFailed,
  getScenarioInitiated,
  getScenarioSuccess,
  getScenariosFailed,
  getScenariosInitiated,
  getScenariosSuccess,
  removeScenarioFailed,
  removeScenarioInitiated,
  removeScenarioSuccess,
} from './scenario.actions';

@Injectable()
export class ScenariosEffects {
  constructor(
    private store: Store,
    private actions$: Actions<any>,
    private scenarioService: ScenarioService
  ) {}

  refetchScenarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        selectTabInitiated,
        selectFileInitiated,
        createScenarioSuccess,
        removeScenarioSuccess
      ),
      concatLatestFrom(() => this.store.select(selectFileId)),
      filter(([_, fileId]) => fileId !== null),
      switchMap(([_, fileId]) =>
        of(getScenariosInitiated({ payload: { id: fileId! } }))
      )
    )
  );

  refetchScenario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectScenarioInitiated),
      switchMap(({ payload }) =>
        of(getScenarioInitiated({ payload: { id: payload.scenarioId } }))
      )
    )
  );

  autoSelectFirstScenario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getScenariosSuccess),
      concatLatestFrom(() => this.store.select(selectScenarioId)),
      filter(
        ([{ payload }, scenarioId]) =>
          payload.length !== 0 && scenarioId === null
      ),
      switchMap(([{ payload }, _]) =>
        of(selectScenarioInitiated({ payload: { scenarioId: payload[0].id } }))
      )
    )
  );


  getScenarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getScenariosInitiated),
      switchMap(({ payload }) =>
        this.scenarioService.getScenarios({ id: payload.id! }).pipe(
          map((next) => getScenariosSuccess({ payload: next })),
          catchError((error: HttpErrorResponse) =>
            of(
              getScenariosFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );

  getScenario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getScenarioInitiated),
      switchMap(({ payload }) =>
        this.scenarioService.getScenario({ id: payload.id! }).pipe(
          map((next) => getScenarioSuccess({ payload: next })),
          catchError((error: HttpErrorResponse) =>
            of(
              getScenarioFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );

  createScenario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createScenarioInitiated),
      concatLatestFrom(() => this.store.select(selectFileId)),
      filter(([_, fileId]) => fileId !== null),
      switchMap(([{ payload }, fileId]) =>
        this.scenarioService
          .createScenario({
            id: fileId!,
            name: payload.name,
            description: payload.description,
          })
          .pipe(
            map((next) => createScenarioSuccess({ payload: next })),
            catchError((error: HttpErrorResponse) =>
              of(
                createScenarioFailed({
                  payload: { error: error.message },
                })
              )
            )
          )
      )
    )
  );

  removeScenario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeScenarioInitiated),
      switchMap(({ payload }) =>
        this.scenarioService.removeScenario({ id: payload.id }).pipe(
          map((next) => removeScenarioSuccess({ payload: next })),
          catchError((error: HttpErrorResponse) =>
            of(
              removeScenarioFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );
}
