import { ReactNode } from "react";

import style from "./Header.module.scss";

export default function Header({ children }: { children: ReactNode }) {
  return <div className={style.header}>{children}</div>;
}

