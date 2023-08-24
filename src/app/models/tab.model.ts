import { IToolbar } from './toolbar.model';

export interface ITab {
  title: string;
  isActive: boolean;
  toolbar: IToolbar;
  fileId: number | null;
  scenarioId: number | null;
  nodeId: number | null;
}


export interface ISelectTab {
  index: number;
}

export interface IRemoveTab {
  index: number;
}

export interface IRearrangeTabs {
  previousIndex: number;
  currentIndex: number;
}

export interface IToggleTabToolbar {
  toolbar: keyof IToolbar;
}

export interface ISelectFile {
  fileId: number;
}

export interface ISelectScenario {
  scenarioId: number;
}

export interface ISelectNode {
  nodeId: number;
}

export type IUpdateTab = Partial<Pick<ITab, "title" | "isActive" | "toolbar">>