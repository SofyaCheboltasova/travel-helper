import { useEffect, useState } from "react";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";
import { PlaceResponse } from "../../../utils/interfaces/OpenTripMapApi/QueryPlace";
import List from "../../Elements/List/List";
import ModalProps from "../../../utils/interfaces/ModalProps";

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

    if (lon && lat) fetchPlacesInRadius();
  }, [lon, lat]);

  const setModalProps = (place: PlaceResponse): ModalProps => {
    const { xid, name, info, wikipedia, kinds, image } = place;
    return {
      id: xid,
      title: name,
      description: info.descr || "Описание отсутствует",
      link: wikipedia,
      theme: kinds,
      image: image || "https://via.placeholder.com/150",
    };
  };

  if (isLoading) {
    return <h2>Загружаем места...</h2>;
  }

  return places && <List elements={places} />;
}

