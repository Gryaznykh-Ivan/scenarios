import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { IScenario, IScenarioPreview } from 'src/app/models/scenarios.model';
import { getScenarioFailed, getScenarioInitiated, getScenarioSuccess, getScenariosFailed, getScenariosInitiated, getScenariosSuccess } from './scenario.actions';


export interface ScenarioState {
  loading: boolean;
  scenarios: IScenarioPreview[];
  scenario: IScenario | null;
  error: string;
}

export const initialState: ScenarioState = {
  loading: false,
  scenarios: [],
  scenario: null,
  error: '',
};


export const ScenariosFeature = createFeature({
  name: 'scenarios',
  reducer: createReducer(
    initialState,
    on(getScenariosInitiated, (state) => ({
      ...state,
      loading: true,
    })),
    on(getScenariosSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      scenarios: payload,
    })),
    on(getScenariosFailed, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
    })),
    on(getScenarioInitiated, (state) => ({
      ...state,
      loading: true,
    })),
    on(getScenarioSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      scenario: payload,
    })),
    on(getScenarioFailed, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error,
    }))
  ),
});
