export interface IScenario {
  id: number;
  fileId: number;
  name: string;
  orTerm: boolean;
  visibility: boolean;
  description: string | null;
}

export type ICreateScenarioResponse = number
export interface ICreateScenarioRequest {
    modelId: number;
    name: string;
    description: string;
}

export type IRemoveScenarioResponse = number
export interface IRemoveScenarioRequest {
    id: number;
}