export interface IFile {
    id: number;
    name: string;
    description: string | null;
}

export interface IFolder {
    id: number;
    name: string;
    description: string | null;
    files: IFile[];
    childFolders: IFolder[];
}



export type IGetFilesystemResponse = IFolder
export interface IGetFilesystemRequest {
    id: number;
}

export type IIsFolderExistResponse = boolean
export interface IIsFolderExistRequest {
    id: number;
}



export type ICreateFolderResponse = IFolder
export interface ICreateFolderRequest {
    parentFolderId: number;
    name: string;
}

export type ICreateFileResponse = IFile
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


export type IRenameFileResponse = IFile
export interface IRenameFileRequest {
    id: number;
    name: string;
}

export type IRenameFolderResponse = IFolder
export interface IRenameFolderRequest {
    id: number;
    name: string;
}