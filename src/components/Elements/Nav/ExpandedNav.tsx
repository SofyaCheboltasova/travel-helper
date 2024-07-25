import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Nav.module.scss";

import Header from "../Header/Header";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import { RootState } from "../../../redux/types";
import mapSlice from "../../../redux/slices/mapSlice";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import { CityIdentifier } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";
import Loader from "../Loader/Loader";

interface ExpandedNavProps {
  content: ReactElement | undefined;
  onClose: () => void;
  placeholder?: string;
}

export default function ExpandedNav(props: ExpandedNavProps) {
  const { city } = useSelector((state: RootState) => state.map);
  const [cityName, setCity] = useState<string>(city.name);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const api = new OpenTripMapApi();

  useEffect(() => {
    async function fetchCityCoordinates() {
      setIsLoading(true);
      try {
        const fetchedCityData: CityIdentifier | undefined =
          await api.getCityCoordinates(cityName);
        if (fetchedCityData)
          dispatch(mapSlice.actions.setCity(fetchedCityData));
      } catch (error) {
        console.error("Error fetching city data");
      }
      setIsLoading(false);
    }
    if (cityName) fetchCityCoordinates();
  }, [cityName]);

  const handleEnterPressed = (city: string) => {
    if (city) setCity(city);
  };

  return (
    <nav className={`${style.nav} ${style.nav_expanded}`}>
      <div className={style.header}>
        <Header
          children={
            <>
              <div className={style.searchBar}>
                <Button text={"<"} onClick={props.onClose} />
                <SearchBar
                  onKeyDown={handleEnterPressed}
                  placeholder={props.placeholder || "Введите город"}
                />
              </div>
              <h2>{city.name}</h2>
            </>
          }
        />
      </div>
      {isLoading ? <Loader text={"Загружаем места..."} /> : props.content}
    </nav>
  );
}
