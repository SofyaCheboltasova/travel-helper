import React from "react";

import style from "./SearchBar.module.scss";
import SearchBarProps from "../../../utils/interfaces/SearchBarProps";

export default function SearchBar({
  onChange,
  onKeyDown,
  placeholder = "Поиск TG канала по названию, описанию или теме",
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value[0].toUpperCase() + e.target.value.slice(1);
    if (onChange) onChange(e);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && onKeyDown) {
      onKeyDown(e.currentTarget.value);
    }
  };

  return (
    <input
      type="search"
      placeholder={placeholder}
      className={style.searchBar}
      onChange={handleChange}
      onKeyDown={handleKeydown}
    />
  );
}

