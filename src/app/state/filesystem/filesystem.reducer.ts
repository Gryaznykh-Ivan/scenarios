import { Action, createFeature, createReducer, on } from "@ngrx/store"
import { IFolder } from "src/app/models/filesystem.model";
import { getFilesystemFailed, getFilesystemInitiated, getFilesystemSuccess } from "./filesystem.actions";

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
        on(getFilesystemInitiated, (state) => ({
            ...state,
            loading: true
        })),
        on(getFilesystemSuccess, (state, { payload: folder }) => ({
            ...state,
            loading: false,
            folder: folder
        })),
        on(getFilesystemFailed, (state, { payload }) => ({
            ...state,
            loading: false,
            error: payload.error
        })),
    )
})