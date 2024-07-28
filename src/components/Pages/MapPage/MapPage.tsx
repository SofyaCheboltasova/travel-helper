import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { Map as GisMap, Marker as GisMarker } from "@2gis/mapgl/types";
import { load } from "@2gis/mapgl";

import style from "./MapPage.module.scss";
import styleModal from "./MapPage.module.scss";

import PlacesApi from "../../api/2GisPlacesApi";
import { RootState } from "../../../redux/types";
import Modal from "../../Elements/Modal/Modal";
import Marker, { CompanyData } from "./Marker";
import { useMapContext } from "../../../context/MapContext";
import ModalProps from "../../../utils/interfaces/ModalProps";
import categoriesSlice from "../../../redux/slices/categoriesSlice";

const MapContent = () => {
  return <div id="map-container" className={style.map__content}></div>;
};

const MapPage = () => {
  const { markersDataCache, setMarkersDataCache } = useMapContext();
  const { city, zoom } = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();
  const { categoryToAdd, categoryToRemove } = useSelector(
    (state: RootState) => state.categories
  );

  const [openedModal, setOpenedModal] = useState<ModalProps | null>(null);

  const mapRef = useRef<GisMap>();
  const api = new PlacesApi();
  const markerClass = new Marker();
  const API_KEY = import.meta.env.VITE_2GIS_TOKEN;
  const MAP_STYLE_ID = "1b42a0a1-e85f-45c2-8d7b-693baf76490f";

  useEffect(() => {
    if (!mapRef.current) {
      initializeMap();
    } else {
      setMapLocation();
    }

    dispatch(categoriesSlice.actions.resetSelectedCategories());
    window.addEventListener("resize", () => {
      mapRef.current && mapRef.current.invalidateSize();
    });
  }, [city.lon]);

  const setMarkers = useCallback(async () => {
    if (!categoryToAdd) return;
    const markers = getMarkersFromCache(categoryToAdd.id);

    if (markers && markers.length) {
      markers.forEach((marker) => marker.show());
    } else {
      const companies = await api.getCompaniesData(city, categoryToAdd);

      if (mapRef.current && companies) {
        const markers = await markerClass.getMarkers(
          mapRef.current,
          companies,
          categoryToAdd.iconPath,
          handleMarkerClick
        );

        setMarkersToCache(categoryToAdd.id, markers);
      }
    }

    dispatch(categoriesSlice.actions.resetCategoriesToAdd());
  }, [categoryToAdd]);

  useEffect(() => {
    setMarkers();
  }, [setMarkers]);

  useEffect(() => {
    if (!categoryToRemove) return;

    const markers = getMarkersFromCache(categoryToRemove.id);
    markerClass.removeMarkers(markers!);

    dispatch(categoriesSlice.actions.resetCategoriesToRemove());
  }, [categoryToRemove]);

  const initializeMap = async () => {
    const mapglAPI = await load();

    mapRef.current = new mapglAPI.Map("map-container", {
      center: [city.lon, city.lat],
      zoom: zoom,
      key: API_KEY,
      style: MAP_STYLE_ID, // custom style for faster loading
    });
  };

  const setMapLocation = () => {
    if (mapRef.current) {
      mapRef.current.setCenter([city.lon, city.lat]);
      mapRef.current.setZoom(zoom);
    }
  };

  const getMarkersFromCache = (categoryId: number) => {
    const cacheKey = JSON.stringify({ city, categoryId });
    return markersDataCache.get(cacheKey);
  };

  const setMarkersToCache = (categoryId: number, data: GisMarker[]) => {
    const cacheKey = JSON.stringify({ city, categoryId });
    setMarkersDataCache((prevCache) => {
      return new Map(prevCache).set(cacheKey, data);
    });
  };

  const handleMarkerClick = (marker: CompanyData) => {
    const modalProps: ModalProps = {
      title: marker.name,
      theme: marker.rubrics[0].name,
      image: marker.external_content[0].main_photo_url,
      opened: true,
      onClick: () => setOpenedModal(null),
    };
    setOpenedModal(modalProps);
  };

  return (
    <div className={style.map__wrapper}>
      <MapContent />

      <div className={styleModal.modal__wrapper}>
        {openedModal && <Modal props={openedModal} />}
      </div>
    </div>
  );
};

export default MapPage;
