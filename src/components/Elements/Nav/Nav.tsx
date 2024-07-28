import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { ReactElement, useState } from "react";

import style from "./Nav.module.scss";
import Button from "../Button/Button";
import ExpandedNav from "./ExpandedNav";
import Selector from "../Selector/Selector";
import { pages } from "../../../assets/consts/consts";
import Category from "../../../utils/interfaces/Category";
import PlacesList from "../../Pages/PlacesList/PlacesList";
import searchSlice from "../../../redux/slices/searchSlice";
import categoriesSlice from "../../../redux/slices/categoriesSlice";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedContent, setExpandedNavContent] = useState<
    ReactElement | undefined
  >(undefined);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const closeExpandedNav = () => {
    dispatch(searchSlice.actions.setOpenedPlace(""));
    setIsExpanded(false);
  };

  const onCategoryChange = (category: Category) => {
    dispatch(categoriesSlice.actions.toggleCategory(category));
  };

  const handleClick = (content: ReactElement, navigateTo: string) => {
    toggleExpanded();
    setExpandedNavContent(content);
    navigate(navigateTo);
  };

  if (isExpanded) {
    return <ExpandedNav onClose={closeExpandedNav} content={expandedContent} />;
  }

  return (
    <nav className={style.nav}>
      <Button
        text={pages.home.name}
        onClick={() => navigate(pages.home.path)}
      ></Button>
      <Button
        text={pages.newRoute.name}
        onClick={() => {
          handleClick(
            <Selector onSelectionChange={onCategoryChange} />,
            pages.newRoute.path
          );
        }}
      ></Button>

      <Button
        text={pages.savedRoutes.name}
        onClick={() => handleClick(<PlacesList />, pages.savedRoutes.path)}
      ></Button>

      <Button
        text={pages.tickets.name}
        onClick={() => navigate(pages.tickets.path)}
      ></Button>
    </nav>
  );
}

