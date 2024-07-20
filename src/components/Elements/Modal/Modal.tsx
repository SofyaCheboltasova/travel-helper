import ModalProps from "../../../utils/interfaces/ModalProps";
import style from "./Modal.module.scss";

export default function Modal({ data }: { data: ModalProps }) {
  const { title, theme, link = "", description, onClick } = data;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClick(link);
  };

  return (
    <div className={style.modal__wrapper} onClick={handleClick}>
      <h2 className={style.modal__header}>{title}</h2>
      <p className={style.modal__description}>{description}</p>
      <div className={style.modal__label}>{theme}</div>
    </div>
  );
}

