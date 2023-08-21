import { IToolbar } from './toolbar.model';

export interface ITab {
  title: string;
  isActive: boolean;
  toolbar: IToolbar;
  fileId?: number;
  scenarioId?: number;
  nodeId?: number;
}
