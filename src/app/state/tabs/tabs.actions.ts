import { createAction, props } from '@ngrx/store';
import { IRearrangeTabs, IRemoveTab, ISelectTab, IToggleTabToolbar, IUpdateTab } from 'src/app/models/tab.model';

export const createTabInitiated = createAction(
  '[Create Tab] Create Tab Initiated'
);

export const removeTabInitiated = createAction(
  '[Remove Tab] Remove Tab Initiated',
  props<IRemoveTab>()
);

export const updateActiveTabInitiated = createAction(
  '[Update Tab] Update Tab Initiated',
  props<IUpdateTab>()
);

export const selectTabInitiated = createAction(
  '[Select Tab] Select Tab Initiated',
  props<ISelectTab>()
);

export const rearrangeTabInitiated = createAction(
  '[Rearrange Tabs] Rearrange Tab Initiated',
  props<IRearrangeTabs>()
);

export const toggleTabToolbarInitiated = createAction(
  '[Toggle Tab Toolbar] Toggle Tab Toolbar Initiated',
  props<IToggleTabToolbar>()
)