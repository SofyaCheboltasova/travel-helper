import { useSelector } from "react-redux";
import style from "./SightsPage.module.scss";
import { RootState } from "../../../redux/types";
import { useEffect, useState } from "react";

export default function SightsPage() {
  const { openedPlaceLink } = useSelector((state: RootState) => state.search);
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (openedPlaceLink) {
      setLink(openedPlaceLink);
    }
  }, [openedPlaceLink]);

  return <iframe className={style.sights__container} src={link}></iframe>;
}

