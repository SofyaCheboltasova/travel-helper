import CategoryEnum from "../../utils/enums/CategoryEnum";

import amusementIcon from "../images/icons/Amusements.svg";
import museumIcon from "../images/icons/Museum.svg";
import beachIcon from "../images/icons/Beach.svg";
import mallIcon from "../images/icons/Mall.svg";
import foodIcon from "../images/icons/Food.svg";

export const pages = {
  home: {
    path: "/",
    name: "home",
  },
  newRoute: {
    path: "/routes",
    name: "Маршруты",
  },
  savedRoutes: { path: "/sights", name: "Достопримечательности" },
  tickets: { path: "/resources", name: "Ресурсы для путешественников" },
};

export const categories = [
  {
    id: 1,
    name: CategoryEnum.Museums,
    isActive: false,
    iconPath: museumIcon,
    rubricId: "193", // Музеи,
  },
  {
    id: 2,
    name: CategoryEnum.Entertainment,
    isActive: false,
    iconPath: amusementIcon,
    rubricId: "173,110358", // Клубы, аттракционы
  },
  {
    id: 3,
    name: CategoryEnum.Beach,
    isActive: false,
    iconPath: beachIcon,
    rubricId: "19601,24353", // Речные прогулки, пляжи
  },
  {
    id: 4,
    name: CategoryEnum.Mall,
    isActive: false,
    iconPath: mallIcon,
    rubricId: "19499,611", // ТРЦ, ТЦ
  },
  {
    id: 5,
    name: CategoryEnum.Food,
    isActive: false,
    iconPath: foodIcon,
    rubricId: "165", // Быстрое питание
  },
];

