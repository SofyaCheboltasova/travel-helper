import style from "./Loader.module.scss";

export default function Loader({ text }: { text: string }) {
  return <h2 className={style.loader}>{text}</h2>;
}
