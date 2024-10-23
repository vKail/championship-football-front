import { IField } from "./InputField.interface";

export interface IModal {
  fields: IField[];
  data?: { [key: string]: string };
  onSubmit: (data: { [key: string]: string }) => void;
}
