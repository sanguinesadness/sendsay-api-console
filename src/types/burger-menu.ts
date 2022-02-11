import { SvgIconType } from "./svg-icon";

export interface BurgerMenuOption {
  id: string;
  icon: SvgIconType;
  text: string;
  onClick: () => void;
}
