export interface IScenario {
  id: number;
  fileId: number;
  name: string;
  orTerm: boolean;
  relations: IRelation[];
  nodes: INode[];
  visibility: boolean;
  description: string | null;
}

export interface INode {
  id: number;
  actionId: number;
  actionName: string;
  label: string;
  editableLabel: boolean;
  srcRelation: boolean;
  dstRelation: boolean;
  shape: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  description: any;
  width: number;
  height: number;
  posX: number;
  posY: number;
  parentNodes: string[];
  childNodes: string[];
  nodeValues: any;
  outputList: any;
}

export interface IRelation {
  id: number;
  srcNodeId: number;
  srcPosX: number;
  srcPosY: number;
  dstNodeId: number;
  dstPosX: number;
  dstPosY: number;
}

export type IScenarioPreview = Omit<IScenario, 'nodes' | 'relations'>;

export type ICreateScenarioResponse = number;
export interface ICreateScenarioRequest {
  name: string;
  description: string;
}

export type IRemoveScenarioResponse = number;
export interface IRemoveScenarioRequest {
  id: number;
}
