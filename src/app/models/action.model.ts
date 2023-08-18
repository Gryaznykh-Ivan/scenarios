export interface IAction {
  id: number;
  name: string;
  description: string | null;
  label: string;
  editableLabel: boolean;
  shape: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  srcRelation: boolean;
  dstRelation: boolean;
}

export interface IActionGroup {
  name: string;
  actionList: IAction[];
}
