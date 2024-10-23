export interface IOption {
  value: string;
  label: string;
}

export interface IField {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "time";
  value: string;
  options?: IOption[];
  required?: boolean;
}
