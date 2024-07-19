import ModalProps from "../../../utils/interfaces/ModalProps";
import style from "./Modal.module.scss";

export default function Modal({ data }: { data: ModalProps }) {
  const { title, theme, link, description } = data;

  return (
    <a href={link} target="_blank">
      <div className={style.modal__wrapper}>
        <h2 className={style.modal__header}>{title}</h2>
        <p className={style.modal__description}>{description}</p>
        <div className={style.modal__label}>{theme}</div>
      </div>
    </a>
  );
}

