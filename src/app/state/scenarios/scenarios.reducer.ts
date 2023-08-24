import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { IScenarioPreview } from 'src/app/models/scenarios.model';
import { getScenariosFailed, getScenariosInitiated, getScenariosSuccess } from './scenarios.actions';


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
    }))
  ),
});
