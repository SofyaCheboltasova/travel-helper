import ModalProps from "../../../utils/interfaces/ModalProps";
import style from "./Modal.module.scss";

export default function Modal({ data }: { data: ModalProps }) {
  const { title, theme, link = "", description, onClick, color } = data;

  const labelStyle = {
    "--label-bg-color": color,
  } as React.CSSProperties;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClick(link);
  };

  return (
    <div
      className={style.modal__wrapper}
      onClick={handleClick}
      style={labelStyle}
    >
      <h2 className={style.modal__header}>{title}</h2>
      <p className={style.modal__description}>{description}</p>
      <div className={style.modal__label} style={labelStyle}>
        {theme}
      </div>
    </div>
  );
}

