import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/types";

import searchSlice from "../../../redux/slices/searchSlice";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import {
  PlaceIdentifier,
  PlaceResponse,
} from "../../../utils/interfaces/OpenTripMapApi/QueryPlace";
import List from "../../Elements/List/List";
import ModalProps from "../../../utils/interfaces/ModalProps";

export default function PlacesList() {
  const dispatch = useDispatch();
  const { currentPlaces } = useSelector((state: RootState) => state.search);
  const { city } = useSelector((state: RootState) => state.map);
  const [places, setPlacess] = useState<ModalProps[]>();

  const api = new OpenTripMapApi();

  useEffect(() => {
    async function fetchPlacesInRadius() {
      try {
        const allPlaces: PlaceIdentifier[] = await api.getAllPlaces(city);
        dispatch(searchSlice.actions.setPlaces(allPlaces));
      } catch (error) {
        console.error("Error fetching places in radius", error);
      } finally {
      }
    }

    fetchPlacesInRadius();
  }, [city.lon]);

  useEffect(() => {
    async function getPlacesData() {
      try {
        const curPlacesData: PlaceResponse[] = await api.getPlacesData(
          currentPlaces
        );
        const curPlacesModalProps: ModalProps[] = curPlacesData.map((p) =>
          getModalProps(p)
        );
        setPlacess(curPlacesModalProps);
      } catch (error) {
        console.error("Error current places data", error);
      }
    }
    if (currentPlaces.length > 0) getPlacesData();
  }, [currentPlaces]);

  const getModalProps = (place: PlaceResponse): ModalProps => {
    const { xid, name, wikipedia, rate, preview, wikipedia_extracts } = place;

    const getTheme = () => {
      const isHistorical = rate[rate.length - 1] === "h";
      return isHistorical ? "Объект культурного наследия" : "Популярное место";
    };

    const onClick = () => {
      dispatch(searchSlice.actions.setOpenedPlace(wikipedia || ""));
    };

    return {
      id: xid,
      title: name,
      description: wikipedia_extracts?.text || "Описание отсутствует",
      onClick: onClick,
      link: wikipedia,
      theme: getTheme(),
      image: preview?.sources || "https://via.placeholder.com/150",
    };
  };
  return places && <List elements={places} />;
}

