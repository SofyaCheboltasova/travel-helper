import { useNavigate } from "react-router";

import style from "./Nav.module.scss";
import Button from "../Button/Button";
import { pages } from "../../../assets/consts/pages";
import { useState } from "react";
import ExpandedNav from "./ExpandedNav";

export default function Nav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isExpanded) {
    return <ExpandedNav onClose={() => setIsExpanded(false)} />;
  }

  return (
    <nav className={style.nav}>
      <Button
        text={pages.newRoute.name}
        onClick={() => {
          navigate(pages.newRoute.path);
        }}
      ></Button>

      <Button
        text={pages.savedRoutes.name}
        onClick={() => {
          toggleExpanded();
          navigate(pages.savedRoutes.path);
        }}
      ></Button>

      <Button
        text={pages.tickets.name}
        onClick={() => navigate(pages.tickets.path)}
      ></Button>
    </nav>
  );
}

