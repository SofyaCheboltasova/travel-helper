import ModalProps from "../../../utils/interfaces/ModalProps";
import Modal from "../Modal/Modal";
import style from "./List.module.scss";

export default function List({ elements }: { elements: ModalProps[] }) {
  return (
    <ul className={style.list}>
      {elements.map((data) => (
        <li key={data.id} className={data.hidden ? style.hidden : ""}>
          <Modal data={data} />
        </li>
      ))}
    </ul>
  );
}

