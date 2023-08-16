export interface IFilesystemFile {
    id: number;
    name: string;
    description: string | null;
}

export interface IFilesystemFolder {
    id: number;
    name: string;
    description: string | null;
    files: IFilesystemFile[];
    childFolders: IFilesystemFolder[];
}

export type ICreateFolderResponse = IFilesystemFolder
export interface ICreateFolderRequest {
    parentFolderId: number;
    name: string;
}

export type ICreateFileResponse = IFilesystemFile
export interface ICreateFileRequest {
    parentFolderId: number;
    name: string;
}

export type IRemoveFolderResponse = number
export interface IRemoveFolderRequest {
    id: number;
    cascade: boolean;
}

export type IRemoveFileResponse = number
export interface IRemoveFileRequest {
    id: number;
}


export type IRenameFileResponse = IFilesystemFile
export interface IRenameFileRequest {
    id: number;
    name: string;
}

export type IRenameFolderResponse = IFilesystemFolder
export interface IRenameFolderRequest {
    id: number;
    name: string;
}