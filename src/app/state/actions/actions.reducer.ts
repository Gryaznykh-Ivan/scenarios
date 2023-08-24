import { createFeature, createReducer, on } from '@ngrx/store';
import { IAction, IActionGroup } from 'src/app/models/action.model';
import { getActionsFailed, getActionsInitiated, getActionsSuccess, getGroupedActionsFailed, getGroupedActionsInitiated, getGroupedActionsSuccess } from './actions.actions';

export interface ActionsState {
  loading: boolean;
  actions: IAction[];
  groupedActions: IActionGroup[];
  error: string;
}

export const initialState: ActionsState = {
  loading: false,
  actions: [],
  groupedActions: [],
  error: '',
};

export const ActionsFeature = createFeature({
  name: 'actions',
  reducer: createReducer(
    initialState,
    on(getGroupedActionsInitiated, (state) => ({
      ...state,
      loading: true
    })),
    on(getActionsInitiated, (state) => ({
      ...state,
      loading: true
    })),
    on(getGroupedActionsSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      groupedActions: payload
    })),
    on(getGroupedActionsFailed, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error
    })),
    on(getActionsSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      actions: payload
    })),
    on(getActionsFailed, (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.error
    })),
  ),
});
