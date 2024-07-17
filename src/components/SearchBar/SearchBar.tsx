import React, { useState, useRef } from "react";

import style from "./SearchBar.module.scss";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pattern: string = "^@[a-zA-Z0-9_]{5,32}$";
  const placeholder: string = "@channelName";

  const handleFocus = () => {
    if (!inputValue && inputRef.current) {
      setInputValue("@");
      inputRef.current.setSelectionRange(1, 1);
    }
  };

  const handleBlur = () => {
    if (inputValue === "@") {
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.startsWith("@")
      ? e.target.value
      : "@" + e.target.value;

    setInputValue(value);
  };

  return (
    <input
      ref={inputRef}
      type="search"
      pattern={pattern}
      value={inputValue}
      placeholder={placeholder}
      className={style.searchBar}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
    />
  );
}

