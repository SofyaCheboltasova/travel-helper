import { useEffect, useState } from "react";

import style from "./ExpandedNav.module.scss";

import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import { Coordinates } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";

export default function ExpandedNav({ onClose }: { onClose: () => void }) {
  const [city, setCity] = useState<string>("Москва");
  const [, setCoords] = useState<Coordinates>({ lon: 0, lat: 0 });
  const [, setIsLoading] = useState<boolean>(true);

  const api = new OpenTripMapApi();

  useEffect(() => {
    async function fetchCity() {
      setIsLoading(true);
      try {
        const fetchedCoords = await api.getCityCoordinates(city);
        setCoords(fetchedCoords);
      } catch (error) {
        console.error("Error fetching city data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCity();
  }, [city]);

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

