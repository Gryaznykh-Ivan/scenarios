import { Action, createReducer, on } from "@ngrx/store"
import * as FilesystemActions from "./filesystem.actions"
import { FilesystemState, initialState } from "./filesystem.state"


const filesystemReducer = createReducer(
    initialState,
    on(FilesystemActions.getFilesystemInitiated, (state) => ({
        ...state,
        loading: true
    })),
    on(FilesystemActions.getFilesystemSuccess, (state, folder) => ({
        ...state,
        loading: false,
        folder: folder
    })),
    on(FilesystemActions.getFilesystemFailed, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),
)

export function reducer(state: FilesystemState | undefined, action: Action) {
    return filesystemReducer(state, action)
}