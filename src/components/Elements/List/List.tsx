import { useMemo } from "react";
import ModalProps from "../../../utils/interfaces/ModalProps";
import Modal from "../Modal/Modal";
import style from "./List.module.scss";

export interface ListProps {
  modal: ModalProps;
  hidden?: boolean;
}

function generateColor(index: number): string {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 50%, 60%)`;
}

export default function List({ props }: { props: ListProps[] }) {
  const themeColors = useMemo(() => {
    const map = new Map<string, string>();

    props.forEach((element, i) => {
      if (!map.has(element.modal.theme)) {
        map.set(element.modal.theme, generateColor(i));
      }
    });

    return map;
  }, [props.forEach((element) => element.modal.theme)]);

  const sortedElements = useMemo(() => {
    return [...props].sort((a, b) =>
      a.modal.theme.localeCompare(b.modal.theme)
    );
  }, [props]);

  const elementsWithColors = sortedElements.map((element) => ({
    ...element,
    modal: {
      ...element.modal,
      color: themeColors.get(element.modal.theme),
    },
  }));

  console.error("LALALAA", elementsWithColors);
  const isNewTheme = (curId: number) => {
    if (curId === 0) return true;
    const prevId: number = curId - 1;
    return (
      elementsWithColors[prevId].modal.theme !==
      elementsWithColors[curId].modal.theme
    );
  };

  return (
    <ul className={style.list}>
      {elementsWithColors.map((data, i) => (
        <>
          {isNewTheme(i) && (
            <li
              key={`divider-${data.modal.id}`}
              className={data.hidden ? style.hidden : ""}
            >
              <hr
                className={style.divider}
                style={{ borderColor: data.modal.color }}
              />
            </li>
          )}
          <li key={data.modal.id} className={data.hidden ? style.hidden : ""}>
            <Modal props={data.modal} />
          </li>
        </>
      ))}
    </ul>
  );
}

