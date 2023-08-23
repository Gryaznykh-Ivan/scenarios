import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilesystemFeature } from "./filesystem.reducer";

export const {
    selectFilesystemState,
    selectFolder,
    selectLoading,
    selectError,
} = FilesystemFeature