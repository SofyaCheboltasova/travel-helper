import ModalProps from "../../../utils/interfaces/ModalProps";
import style from "./Modal.module.scss";

export default function Modal({ props }: { props: ModalProps }) {
  console.error(props);
  const {
    title,
    description,
    theme,
    onClick,
    link = "",
    color,
    image,
    opened,
  } = props;

  const labelStyle = {
    "--label-bg-color": color,
  } as React.CSSProperties;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onClick) onClick(link);
  };

  return (
    <div className={`${opened && style.wrapper_opened}`} onClick={handleClick}>
      <div
        className={`${style.modal__content} ${opened && style.content_opened}`}
        style={labelStyle}
      >
        {image && <img src={image} className={style.modal__img} />}
        <h2 className={style.modal__header}>{title}</h2>
        {description && (
          <p className={style.modal__description}>{description}</p>
        )}
        <div className={style.modal__label} style={labelStyle}>
          {theme}
        </div>
      </div>
    </div>
  );
}

