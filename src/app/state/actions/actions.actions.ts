import { createAction, props } from "@ngrx/store";
import { IAction, IActionGroup } from "src/app/models/action.model";
import { IError } from "src/app/models/error.model";


export const getActionsInitiated = createAction(
    '[Get Actions] Get Actions Initiated',
)

export const getActionsFailed = createAction(
    '[Get Actions] Get Actions Failed',
    props<{ payload: IError }>()
)

export const getActionsSuccess = createAction(
    '[Get Actions] Get Actions Success',
    props<{ payload: IAction[] }>()
)



export const getGroupedActionsInitiated = createAction(
    '[Get Grouped Actions] Get Grouped Actions Initiated',
)

export const getGroupedActionsFailed = createAction(
    '[Get Grouped Actions] Get Grouped Actions Failed',
    props<{ payload: IError }>()
)

export const getGroupedActionsSuccess = createAction(
    '[Get Grouped Actions] Get Grouped Actions Success',
    props<{ payload: IActionGroup[] }>()
)