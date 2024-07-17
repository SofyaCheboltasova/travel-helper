import { useNavigate } from "react-router";

import style from "./Nav.module.scss";
import Button from "../Button/Button";
import { pages } from "../../../assets/consts/pages";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <nav className={style.nav}>
      <Button
        text={pages.newRoute.name}
        onClick={() => navigate(pages.newRoute.path)}
      ></Button>

      <Button
        text={pages.savedRoutes.name}
        onClick={() => navigate(pages.savedRoutes.path)}
      ></Button>

      <Button
        text={pages.tickets.name}
        onClick={() => navigate(pages.tickets.path)}
      ></Button>
    </nav>
  );
}

