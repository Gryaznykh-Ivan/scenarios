export interface IFile {
    id: number;
    name: string;
    description: string | null;
}

export interface IFolder {
    id: number;
    name: string;
    description: string | null;
    models: IFile[];
    childFolders: IFolder[];
}