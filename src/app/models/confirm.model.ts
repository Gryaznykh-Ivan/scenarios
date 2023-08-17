export interface IConfirm {
  title: string;
  message: string;
  NO?: string;
  YES?: string;
}

export interface IConfirmWithName {
  title: string;
  name?: string;
  NO?: string;
  YES?: string;
}

export interface IConfirmWithCheckbox {
  title: string;
  message: string;
  checkedLabel: string;
  checked?: boolean;
  NO?: string;
  YES?: string;
}
