import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./ExpandedNav.module.scss";

import searchSlice from "../../../redux/slices/searchSlice";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import { CityIdentifier } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";
import Header from "../Header/Header";
import { RootState } from "../../../redux/types";

interface ExpandedNavProps {
  content: ReactElement | undefined;
  onClose: () => void;
}

export default function ExpandedNav(props: ExpandedNavProps) {
  const { city } = useSelector((state: RootState) => state.search);
  const [cityName, setCity] = useState<string>(city.name);
  const dispatch = useDispatch();
  const api = new OpenTripMapApi();

  useEffect(() => {
    async function fetchCityCoordinates() {
      try {
        const fetchedCityData: CityIdentifier = await api.getCityCoordinates(
          cityName
        );
        dispatch(searchSlice.actions.setCity(fetchedCityData));
      } catch (error) {
        console.error("Error fetching city data");
      }
    }
    if (cityName) fetchCityCoordinates();
  }, [cityName]);

  const handleEnterPressed = (city: string) => {
    if (city) setCity(city);
  };

  return (
    <nav className={style.expandedNav}>
      <Header
        children={
          <>
            <div className={style.expandedNav__header}>
              <Button text={"<"} onClick={props.onClose} />
              <SearchBar
                onKeyDown={handleEnterPressed}
                placeholder="Введите город"
              />
            </div>
            <h2>{city.name}</h2>
          </>
        }
      />
      {props.content}
    </nav>
  );
}

