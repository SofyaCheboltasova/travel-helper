import React from "react";

import style from "./SearchBar.module.scss";

export default function SearchBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const pattern: string = "^@[a-zA-Z0-9_]{5,32}$";
  const placeholder: string = "Поиск TG канала по названию, описанию или теме";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value[0].toUpperCase() + e.target.value.slice(1);
    onChange(e);
  };

  return (
    <input
      type="search"
      pattern={pattern}
      placeholder={placeholder}
      className={style.searchBar}
      onChange={handleChange}
    />
  );
}

