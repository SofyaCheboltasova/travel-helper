import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import style from "./ExpandedNav.module.scss";

import searchSlice from "../../../redux/slices/searchSlice";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import PlacesList from "../../Pages/PlacesList/PlacesList";
import { Coordinates } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";

export default function ExpandedNav({ onClose }: { onClose: () => void }) {
  const [city, setCity] = useState<string>("Москва");
  const dispatch = useDispatch();
  const api = new OpenTripMapApi();

  useEffect(() => {
    async function fetchCityCoordinates() {
      try {
        const fetchedCityData: Coordinates = await api.getCityCoordinates(city);
        dispatch(searchSlice.actions.setCity(fetchedCityData));
      } catch (error) {
        console.error("Error fetching city data");
      }
    }
    if (city) fetchCityCoordinates();
  }, [city, dispatch]);

  const handleEnterPressed = (city: string) => {
    setCity(city);
  };

  return (
    <nav className={style.expandedNav}>
      <div className={style.expandedNav__header}>
        <Button text={"<"} onClick={onClose} />
        <SearchBar onKeyDown={handleEnterPressed} placeholder="Введите город" />
      </div>
      <PlacesList />
    </nav>
  );
}

