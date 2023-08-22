import { IFolder } from "src/app/models/filesystem.model";

export interface FilesystemState {
    loading: boolean;
    folder?: IFolder;
    error: string;
}

export const initialState: FilesystemState = {
    loading: false,
    folder: undefined,
    error: ""
}