import { ButtonColor, ButtonState } from "../enums/ButtonEnums";

export default interface ButtonProps {
  text: string;
  color?: ButtonColor;
  state?: ButtonState;
  onClick: () => void;
}

