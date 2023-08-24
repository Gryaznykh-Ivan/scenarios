import { createAction, props } from '@ngrx/store';
import { IRearrangeTabs, IRemoveTab, ISelectFile, ISelectNode, ISelectScenario, ISelectTab, IToggleTabToolbar, IUpdateTab } from 'src/app/models/tab.model';

export const createTabInitiated = createAction(
  '[Create Tab] Create Tab Initiated'
);

export const removeTabInitiated = createAction(
  '[Remove Tab] Remove Tab Initiated',
  props<{ payload: IRemoveTab }>()
);

export const updateActiveTabInitiated = createAction(
  '[Update Tab] Update Tab Initiated',
  props<{ payload: IUpdateTab }>()
);

export const selectTabInitiated = createAction(
  '[Select Tab] Select Tab Initiated',
  props<{ payload: ISelectTab }>()
);

export const rearrangeTabInitiated = createAction(
  '[Rearrange Tabs] Rearrange Tab Initiated',
  props<{ payload: IRearrangeTabs }>()
);

export const toggleTabToolbarInitiated = createAction(
  '[Toggle Tab Toolbar] Toggle Tab Toolbar Initiated',
  props<{ payload: IToggleTabToolbar }>()
)

export const selectFileInitiated = createAction(
  '[Select File] Select File Initiated',
  props<{ payload: ISelectFile }>()
);

export const selectScenarioInitiated = createAction(
  '[Select Scenario] Select Scenario Initiated',
  props<{ payload: ISelectScenario }>()
);

export const selectNodeInitiated = createAction(
  '[Select Node] Select Node Initiated',
  props<{ payload: ISelectNode }>()
);
