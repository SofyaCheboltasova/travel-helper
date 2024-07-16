import style from "./Button.module.scss";

import ButtonProps from "../../utils/interfaces/ButtonProps";
import { ButtonColor, ButtonState } from "../../utils/enums/ButtonEnums";

export default function Button({
  text,
  color = ButtonColor.light,
  state = ButtonState.enabled,
  onClick,
}: ButtonProps) {
  const buttonClass = `${style.button} ${style[color]} ${style[state]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}

