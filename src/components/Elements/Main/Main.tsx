import { ReactElement } from "react";

import styles from "./Main.module.scss";

export default function Main({ children }: { children: ReactElement }) {
  return <section className={styles.main}>{children}</section>;
}

