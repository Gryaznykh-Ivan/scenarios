import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as ScenarioActions from './scenarios.actions';
import * as TabsActions from '../tabs/tabs.actions';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ScenarioService } from 'src/app/services/scenario.service';
import { Store } from '@ngrx/store';
import { selectFileId } from '../tabs';

@Injectable()
export class ScenarioEffects {
  constructor(
    private store: Store,
    private actions$: Actions<any>,
    private scenarioService: ScenarioService
  ) {}

  getScenarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ScenarioActions.getScenariosInitiated,
        ScenarioActions.createScenarioSuccess,
        ScenarioActions.removeScenarioSuccess,
        TabsActions.selectTabInitiated,
        TabsActions.updateActiveTabInitiated
      ),
      concatLatestFrom(() => this.store.select(selectFileId)),
      filter(([_, fileId]) => fileId !== null),
      switchMap(([_, fileId]) =>
        this.scenarioService.getScenarios({ id: fileId! }).pipe(
          map((next) => ScenarioActions.getScenariosSuccess({ payload: next })),
          catchError((error: HttpErrorResponse) =>
            of(
              ScenarioActions.getScenariosFailed({
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
      ofType(ScenarioActions.createScenarioInitiated),
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
            map((next) =>
              ScenarioActions.createScenarioSuccess({ payload: next })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                ScenarioActions.createScenarioFailed({
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
      ofType(ScenarioActions.removeScenarioInitiated),
      switchMap(({ payload }) =>
        this.scenarioService.removeScenario({ id: payload.id }).pipe(
          map((next) =>
            ScenarioActions.removeScenarioSuccess({ payload: next })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              ScenarioActions.removeScenarioFailed({
                payload: { error: error.message },
              })
            )
          )
        )
      )
    )
  );
}
