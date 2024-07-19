import { useEffect, useState } from "react";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";
import { RadiusResponse } from "../../../utils/interfaces/OpenTripMapApi/QueryRadius";
// import List from "../../Elements/List/List";

export default function PlacesList() {
  const { lon, lat } = useSelector((state: RootState) => state.search);
  const [, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<RadiusResponse[]>();

  /*
		НУЖЕН ЛИ USEEFFECT?

		Места в радиусе
	*/
  useEffect(() => {
    const api = new OpenTripMapApi();
    async function fetchPlacesInRadius() {
      setIsLoading(true);
      try {
        const places = await api.getPlacesInRadius(lon, lat);

        setPlaces(places);
      } catch (error) {
        console.error("Error fetching places data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlacesInRadius();
  }, []);

  useEffect(() => {}, [places]);

  // return (
  // 	<List elements={places}/>
  // )
}

