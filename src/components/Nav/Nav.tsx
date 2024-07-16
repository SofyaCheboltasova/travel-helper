import style from "./Nav.module.scss";
import Button from "../Button/Button";

export default function Nav() {
  return (
    <nav className={style.nav}>
      <Button text="Create route" onClick={() => {}}></Button>
      <Button text="Saved routes" onClick={() => {}}></Button>
      <Button text="Search tickets" onClick={() => {}}></Button>
    </nav>
  );
}

