import ChannelData from "../../../utils/interfaces/ChannelData";
import style from "./Modal.module.scss";

export default function Modal({ data }: { data: ChannelData }) {
  const { title, theme, name, description } = data;

  return (
    <a href={name} target="_blank">
      <div className={style.modal}>
        <h2 className={style.header}>{title}</h2>
        <p className={style.description}>{description}</p>
        <div className={style.label}>{theme}</div>
      </div>
    </a>
  );
}

