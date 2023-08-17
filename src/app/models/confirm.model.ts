export interface IConfirm {
  title: string;
  message: string;
  NO?: string;
  YES?: string;
}

export type IConfirmWithNameResult = Required<Pick<IConfirmWithName, "name">>
export interface IConfirmWithName {
  title: string;
  name?: string;
  NO?: string;
  YES?: string;
}
