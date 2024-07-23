import { ReactNode } from "react";

import style from "./Header.module.scss";

interface HeaderProps {
  children: ReactNode;
  borders?: boolean;
}

export default function Header(props: HeaderProps) {
  return (
    <div
      className={`${style.header} ${props.borders ? style.header_borders : ""}`}
    >
      {props.children}
    </div>
  );
}

