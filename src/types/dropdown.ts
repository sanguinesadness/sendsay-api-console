export type OptionColor = "blue" | "red";

export interface Option {
  id: string;
  text: string;
  onClick: () => void;
  color?: OptionColor;
}

// null - means Separator
export type DropdownOption = Option | null;
