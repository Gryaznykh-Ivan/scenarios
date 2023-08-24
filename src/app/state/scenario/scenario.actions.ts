import { createAction, props } from '@ngrx/store';
import { IError } from '../../models/error.model';
import {
  ICreateScenarioRequest,
  ICreateScenarioResponse,
  IGetScenarioRequest,
  IGetScenarioResponse,
  IGetScenariosRequest,
  IGetScenariosResponse,
  IRemoveScenarioRequest,
  IRemoveScenarioResponse,
} from 'src/app/models/scenarios.model';
import { ISelectFile, ISelectNode, ISelectScenario } from 'src/app/models/tab.model';

export const getScenariosInitiated = createAction(
  '[Get Scenarios] Get Scenarios Initiated',
  props<{ payload: IGetScenariosRequest }>()
);

export const getScenariosSuccess = createAction(
  '[Get Scenarios] Get Scenarios Success',
  props<{ payload: IGetScenariosResponse }>()
);

export const getScenariosFailed = createAction(
  '[Get Scenarios] Get Scenarios Failed',
  props<{ payload: IError }>()
);



export const getScenarioInitiated = createAction(
  '[Get Scenario] Get Scenario Initiated',
  props<{ payload: IGetScenarioRequest }>()
);

export const getScenarioSuccess = createAction(
  '[Get Scenario] Get Scenario Success',
  props<{ payload: IGetScenarioResponse }>()
);

export const getScenarioFailed = createAction(
  '[Get Scenario] Get Scenario Failed',
  props<{ payload: IError }>()
);




export const createScenarioInitiated = createAction(
  '[Create Scenario] Create Scenario Initiated',
  props<{ payload: Omit<ICreateScenarioRequest, 'id'> }>()
);

export const createScenarioSuccess = createAction(
  '[Create Scenario] Create Scenario Success',
  props<{ payload: ICreateScenarioResponse }>()
);

export const createScenarioFailed = createAction(
  '[Create Scenario] Create Scenario Failed',
  props<{ payload: IError }>()
);

export const removeScenarioInitiated = createAction(
  '[Remove Scenario] Remove Scenario Initiated',
  props<{ payload: IRemoveScenarioRequest }>()
);

export const removeScenarioSuccess = createAction(
  '[Remove Scenario] Remove Scenario Success',
  props<{ payload: IRemoveScenarioResponse }>()
);

export const removeScenarioFailed = createAction(
  '[Remove Scenario] Remove Scenario Failed',
  props<{ payload: IError }>()
);