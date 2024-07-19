import { useEffect, useState } from "react";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";
import { PlaceResponse } from "../../../utils/interfaces/OpenTripMapApi/QueryPlace";
import List from "../../Elements/List/List";
import ModalProps from "../../../utils/interfaces/ModalProps";
import Loader from "../../Elements/Loader/Loader";

export default function PlacesList() {
  const { lon, lat } = useSelector((state: RootState) => state.search);
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<ModalProps[]>();

  const api = new OpenTripMapApi();

  useEffect(() => {
    async function fetchPlacesInRadius() {
      setIsLoading(true);
      try {
        const places: PlaceResponse[] = await api.getPlacesInRadius(lon, lat);
        const placesData: ModalProps[] = places.map((p) => setModalProps(p));
        setPlaces(placesData);
      } catch (error) {
        console.error("Error fetching places data", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlacesInRadius();
  }, [lon, lat]);

  const setModalProps = (place: PlaceResponse): ModalProps => {
    const { xid, name, wikipedia, rate, preview, wikipedia_extracts } = place;

    const getTheme = () => {
      const isHistorical = rate[rate.length - 1] === "h";
      return isHistorical ? "Объект культурного наследия" : "Популярное место";
    };

    return {
      id: xid,
      title: name,
      description: wikipedia_extracts?.text || "Описание отсутствует",
      link: wikipedia,
      theme: getTheme(),
      image: preview?.sources || "https://via.placeholder.com/150",
    };
  };

  if (isLoading) {
    return <Loader text={"Загружаем места..."} />;
  } else {
    return places && <List elements={places} />;
  }
}

