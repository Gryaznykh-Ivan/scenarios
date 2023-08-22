import { ActionReducerMap, MetaReducer } from "@ngrx/store"
import { State } from "./core.state";
import * as filesystemReducer from "./filesystem/filesystem.reducer";

export const reducers: ActionReducerMap<State> = {
  filesystem: filesystemReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];