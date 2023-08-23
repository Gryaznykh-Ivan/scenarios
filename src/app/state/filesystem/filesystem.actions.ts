import { createAction, props } from '@ngrx/store';
import { IError } from '../../models/error.model'
import { IFolder, IFile, IRemoveFileRequest, IRenameFileRequest, IRenameFolderRequest, IRemoveFolderRequest, ICreateFileRequest, ICreateFolderRequest, IGetFilesystemRequest, IGetFilesystemResponse, IIsFolderExistRequest, IRenameFileResponse, IRenameFolderResponse, ICreateFileResponse, ICreateFolderResponse, IIsFolderExistResponse } from '../../models/filesystem.model';

export const getFilesystemInitiated = createAction(
  '[Get Filesystem] Get Filesystem Initiated'
);

export const getFilesystemSuccess = createAction(
  '[Get Filesystem] Get Filesystem Success',
  props<{payload: IGetFilesystemResponse}>()
);

export const getFilesystemFailed = createAction(
  '[Get Filesystem] Get Filesystem Failed',
  props<{payload: IError}>()
);



export const isFolderExistInitiated = createAction(
  '[Get Is Exist Folder] Get Is Exist Folder Initiated',
  props<{payload: IIsFolderExistRequest}>()
);

export const isFolderExistSuccess = createAction(
  '[Get Is Exist Folder] Get Is Exist Folder Success',
  props<{payload: IIsFolderExistResponse}>()
);

export const isFolderExistFailed = createAction(
  '[Get Is Exist Folder] Get Is Exist Folder Failed',
  props<{payload: IError}>()
);



export const createFolderInitiated = createAction(
  '[Create Folder] Create Folder Initiated',
  props<{payload:ICreateFolderRequest}>()
);

export const createFolderSuccess = createAction(
  '[Create Folder] Create Folder Success',
  props<{payload:ICreateFolderResponse}>()
);

export const createFolderFailed = createAction(
  '[Create Folder] Create Folder Failed',
  props<{payload: IError}>()
);



export const createFileInitiated = createAction(
  '[Create File] Create File Initiated',
  props<{payload:ICreateFileRequest}>()
);

export const createFileSuccess = createAction(
  '[Create File] Create File Success',
  props<{payload:ICreateFileResponse}>()
);

export const createFileFailed = createAction(
  '[Create File] Create File Failed',
  props<{payload: IError}>()
);



export const removeFileInitiated = createAction(
  '[Remove File] Remove File Initiated',
  props<{payload:IRemoveFileRequest}>()
);

export const removeFileSuccess = createAction(
  '[Remove File] Remove File Success'
);

export const removeFileFailed = createAction(
  '[Remove File] Remove File Failed',
  props<{payload: IError}>()
);



export const removeFolderInitiated = createAction(
  '[Remove Folder] Remove Folder Initiated',
  props<{payload:IRemoveFolderRequest}>()
);

export const removeFolderSuccess = createAction(
  '[Remove Folder] Remove Folder Success'
);

export const removeFolderFailed = createAction(
  '[Remove Folder] Remove Folder Failed',
  props<{payload: IError}>()
);



export const renameFolderInitiated = createAction(
  '[Rename Folder] Rename Folder Initiated',
  props<{payload:IRenameFolderRequest}>()
);

export const renameFolderSuccess = createAction(
  '[Rename Folder] Rename Folder Success',
  props<{payload:IRenameFolderResponse}>()
);

export const renameFolderFailed = createAction(
  '[Rename Folder] Rename Folder Failed',
  props<{payload: IError}>()
);



export const renameFileInitiated = createAction(
  '[Rename File] Rename File Initiated',
  props<{payload:IRenameFileRequest}>()
);

export const renameFileSuccess = createAction(
  '[Rename File] Rename File Success',
  props<{payload:IRenameFileResponse}>()
);

export const renameFileFailed = createAction(
  '[Rename File] Rename File Failed',
  props<{payload: IError}>()
);