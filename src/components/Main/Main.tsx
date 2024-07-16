import { ReactNode } from "react";

import styles from "./Main.module.scss";

export default function Main({ children }: { children?: ReactNode }) {
  return <section className={styles.main}>{children}</section>;
}

