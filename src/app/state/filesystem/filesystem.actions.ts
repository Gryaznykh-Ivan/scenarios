import { createAction, props } from '@ngrx/store';
import { IError } from '../../models/error.model'
import { IFolder, IFile, IRemoveFileRequest, IRenameFileRequest, IRenameFolderRequest, IRemoveFolderRequest, ICreateFileRequest, ICreateFolderRequest, IGetFilesystemRequest, IGetFilesystemResponse, IIsFolderExistRequest } from '../../models/filesystem.model';

export const getFilesystemInitiated = createAction(
  '[Get Filesystem] Get Filesystem Initiated'
);

export const getFilesystemSuccess = createAction(
  '[Get Filesystem] Get Filesystem Success',
  props<IFolder>()
);

export const getFilesystemFailed = createAction(
  '[Get Filesystem] Get Filesystem Failed',
  props<IError>()
);



export const isFolderExistInitiated = createAction(
  '[Get Is Exist Folder] Get Is Exist Folder Initiated',
  props<IIsFolderExistRequest>()
);

export const isFolderExistSuccess = createAction(
  '[Get Is Exist Folder] Get Is Exist Folder Success',
  props<any>() // TODO попросить Артема возвращать объекты
);

export const isFolderExistFailed = createAction(
  '[Get Is Exist Folder] Get Is Exist Folder Failed',
  props<IError>()
);



export const createFolderInitiated = createAction(
  '[Create Folder] Create Folder Initiated',
  props<ICreateFolderRequest>()
);

export const createFolderSuccess = createAction(
  '[Create Folder] Create Folder Success',
  props<IFolder>()
);

export const createFolderFailed = createAction(
  '[Create Folder] Create Folder Failed',
  props<IError>()
);



export const createFileInitiated = createAction(
  '[Create File] Create File Initiated',
  props<ICreateFileRequest>()
);

export const createFileSuccess = createAction(
  '[Create File] Create File Success',
  props<IFile>()
);

export const createFileFailed = createAction(
  '[Create File] Create File Failed',
  props<IError>()
);



export const removeFileInitiated = createAction(
  '[Remove File] Remove File Initiated',
  props<IRemoveFileRequest>()
);

export const removeFileSuccess = createAction(
  '[Remove File] Remove File Success'
);

export const removeFileFailed = createAction(
  '[Remove File] Remove File Failed',
  props<IError>()
);



export const removeFolderInitiated = createAction(
  '[Remove Folder] Remove Folder Initiated',
  props<IRemoveFolderRequest>()
);

export const removeFolderSuccess = createAction(
  '[Remove Folder] Remove Folder Success'
);

export const removeFolderFailed = createAction(
  '[Remove Folder] Remove Folder Failed',
  props<IError>()
);



export const renameFolderInitiated = createAction(
  '[Rename Folder] Rename Folder Initiated',
  props<IRenameFolderRequest>()
);

export const renameFolderSuccess = createAction(
  '[Rename Folder] Rename Folder Success',
  props<IFolder>()
);

export const renameFolderFailed = createAction(
  '[Rename Folder] Rename Folder Failed',
  props<IError>()
);



export const renameFileInitiated = createAction(
  '[Rename File] Rename File Initiated',
  props<IRenameFileRequest>()
);

export const renameFileSuccess = createAction(
  '[Rename File] Rename File Success',
  props<IFile>()
);

export const renameFileFailed = createAction(
  '[Rename File] Rename File Failed',
  props<IError>()
);