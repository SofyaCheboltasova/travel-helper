import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/types";

import searchSlice from "../../../redux/slices/searchSlice";
import OpenTripMapApi from "../../api/OpenTripMapApi";
import {
  PlaceIdentifier,
  PlaceResponse,
} from "../../../utils/interfaces/OpenTripMapApi/QueryPlace";
import List, { ListProps } from "../../Elements/List/List";

export default function PlacesList() {
  const dispatch = useDispatch();
  const { currentPlaces } = useSelector((state: RootState) => state.search);
  const { city } = useSelector((state: RootState) => state.map);
  const [places, setPlaces] = useState<ListProps[]>();

  const api = new OpenTripMapApi();

  useEffect(() => {
    async function getAllPlaces() {
      try {
        const allPlaces: PlaceIdentifier[] | [] = await api.getAllPlaces(city);
        allPlaces && dispatch(searchSlice.actions.setPlaces(allPlaces));
      } catch (error) {
        console.error("Error fetching places in radius", error);
      }
    }

    getAllPlaces();
  }, [city.lon]);

  useEffect(() => {
    async function getCurrentPlacesData() {
      try {
        const curPlacesData: PlaceResponse[] = await api.getPlacesData(
          currentPlaces!
        );
        const listProps: ListProps[] = curPlacesData.map((p) =>
          getListProps(p)
        );

        setPlaces(listProps);
        dispatch(searchSlice.actions.resetCurrentPlaces());
      } catch (error) {
        console.error("Error current places data", error);
      }
    }
    currentPlaces && getCurrentPlacesData();
  }, [currentPlaces]);

  const getListProps = (place: PlaceResponse): ListProps => {
    const { xid, name, wikipedia, rate, preview, wikipedia_extracts } = place;

    const getTheme = () => {
      const isHistorical = rate[rate.length - 1] === "h";
      return isHistorical ? "Объект культурного наследия" : "Популярное место";
    };

    const onClick = () => {
      dispatch(searchSlice.actions.setOpenedPlace(wikipedia || ""));
    };

    return {
      modal: {
        id: xid,
        title: name,
        description: wikipedia_extracts?.text || "Описание отсутствует",
        onClick: onClick,
        link: wikipedia,
        theme: getTheme(),
        image: preview?.source || undefined,
      },
    };
  };
  return places && <List props={places} />;
}
