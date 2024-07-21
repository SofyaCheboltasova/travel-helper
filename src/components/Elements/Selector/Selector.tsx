import { useState } from "react";

import style from "./Selector.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";
import Category from "../../../utils/interfaces/Category";

interface CategorySelectorProps {
  onSelectionChange: (category: Category) => void;
}

export default function Selector({ onSelectionChange }: CategorySelectorProps) {
  const { allCategories } = useSelector((state: RootState) => state.categories);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getClassName = (category: Category): string => {
    return category.isActive ? `${style.list} ${style.selected}` : style.list;
  };

  const getOptionTag = (option: Category) => {
    return (
      <div
        key={option.id}
        className={getClassName(option)}
        onClick={() => onSelectionChange(option)}
      >
        {option.name}
      </div>
    );
  };

  return (
    <div className={style.selector__wrapper}>
      <button className={style.selector__button} onClick={handleToggle}>
        {isOpen ? "Скрыть категории" : "Выбрать категории"}
      </button>
      {isOpen && (
        <div className={style.selector__options}>
          {allCategories.map((option) => getOptionTag(option))}
        </div>
      )}
    </div>
  );
}

