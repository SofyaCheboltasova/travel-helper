import { useMemo } from "react";
import ModalProps from "../../../utils/interfaces/ModalProps";
import Modal from "../Modal/Modal";
import style from "./List.module.scss";

function generateColor(index: number): string {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 50%, 60%)`;
}

export default function List({ elements }: { elements: ModalProps[] }) {
  const themeColors = useMemo(() => {
    const map = new Map<string, string>();

    elements.forEach((element, i) => {
      if (!map.has(element.theme)) {
        map.set(element.theme, generateColor(i));
      }
    });

    return map;
  }, [elements.forEach((element) => element.theme)]);

  const sortedElements = useMemo(() => {
    return [...elements].sort((a, b) => a.theme.localeCompare(b.theme));
  }, [elements]);

  const elementsWithColors = sortedElements.map((element) => ({
    ...element,
    color: themeColors.get(element.theme),
  }));

  const isNewTheme = (curId: number) => {
    if (curId === 0) return true;
    const prevId: number = curId - 1;
    return elementsWithColors[prevId].theme !== elementsWithColors[curId].theme;
  };

  return (
    <ul className={style.list}>
      {elementsWithColors.map((data, i) => (
        <>
          {isNewTheme(i) && (
            <li
              key={`divider-${data.id}`}
              className={data.hidden ? style.hidden : ""}
            >
              <hr
                className={style.divider}
                style={{ borderColor: data.color }}
              />
            </li>
          )}
          <li key={data.id} className={data.hidden ? style.hidden : ""}>
            <Modal data={data} />
          </li>
        </>
      ))}
    </ul>
  );
}

