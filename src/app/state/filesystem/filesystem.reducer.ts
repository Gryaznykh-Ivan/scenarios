import { Action, createFeature, createReducer, on } from "@ngrx/store"
import * as FilesystemActions from "./filesystem.actions"
import { IFolder } from "src/app/models/filesystem.model";

export interface FilesystemState {
    loading: boolean;
    folder: IFolder | null;
    error: string;
}

export const initialState: FilesystemState = {
    loading: false,
    folder: null,
    error: ""
}

export const FilesystemFeature = createFeature({
    name: "filesystem",
    reducer: createReducer(
        initialState,
        on(FilesystemActions.getFilesystemInitiated, (state) => ({
            ...state,
            loading: true
        })),
        on(FilesystemActions.getFilesystemSuccess, (state, { payload: folder }) => ({
            ...state,
            loading: false,
            folder: folder
        })),
        on(FilesystemActions.getFilesystemFailed, (state, { payload }) => ({
            ...state,
            loading: false,
            error: payload.error
        })),
    )
})