export interface IFile {
  id: number;
  modelId: number;
  name: string;
  orTerm: boolean;
  visibility: boolean;
  description: string | null;
}