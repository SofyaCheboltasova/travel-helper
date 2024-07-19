import { useEffect, useState } from "react";

import style from "./ExpandedNav.module.scss";

import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import { Coordinates } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";
import store from "../../../redux/store";
import searchSlice from "../../../redux/slices/searchSlice";

export default function ExpandedNav({ onClose }: { onClose: () => void }) {
  const [city, setCity] = useState<string>("Москва");
  const [, setIsLoading] = useState<boolean>(true);
  const [cityCoordinates, setCityCoordinates] = useState<Coordinates>({
    lon: 0,
    lat: 0,
  });

  const api = new OpenTripMapApi();

  useEffect(() => {
    async function fetchCityCoordinates() {
      setIsLoading(true);
      try {
        const fetchedCityData = await api.getCityCoordinates(city);
        setCityCoordinates(fetchedCityData);
      } catch (error) {
        console.error("Error fetching city data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityCoordinates();
  }, [city]);

  useEffect(() => {
    store.dispatch(searchSlice.actions.setCity(cityCoordinates));
  }, [cityCoordinates]);

  const handleEnterPressed = (city: string) => {
    setCity(city);
  };

  return (
    <nav className={style.expandedNav}>
      <div className={style.expandedNav__header}>
        <Button text={"<"} onClick={onClose} />
        <SearchBar onKeyDown={handleEnterPressed} placeholder="Введите город" />
      </div>
    </nav>
  );
}

