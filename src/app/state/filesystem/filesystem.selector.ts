import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilesystemState } from "./filesystem.state";

export const selectFilesystem = createFeatureSelector<FilesystemState>("filesystem")

export const selectFilesystemFolder = createSelector(
    selectFilesystem,
    (state: FilesystemState) => state.folder
)

export const selectFilesystemLoading = createSelector(
    selectFilesystem,
    (state: FilesystemState) => state.loading
)

export const selectFilesystemError = createSelector(
    selectFilesystem,
    (state: FilesystemState) => state.error
)