import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as ScenarioActions from './scenarios.actions';
import { IScenarioPreview } from 'src/app/models/scenarios.model';

export interface ScenarioState {
  loading: boolean;
  scenarios: IScenarioPreview[];
  error: string;
}

export const initialState: ScenarioState = {
  loading: false,
  scenarios: [],
  error: '',
};

export const ScenariosFeature = createFeature({
  name: 'scenarios',
  reducer: createReducer(
    initialState,
    on(ScenarioActions.getScenariosInitiated, (state) => ({
      ...state,
      loading: true,
    })),
    on(ScenarioActions.getScenariosSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      scenarios: payload,
    })),
    on(ScenarioActions.getScenariosFailed, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
  ),
});
