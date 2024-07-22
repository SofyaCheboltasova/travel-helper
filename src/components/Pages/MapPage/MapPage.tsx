import { load } from "@2gis/mapgl";
import { useSelector } from "react-redux";
import { memo, useCallback, useEffect, useRef } from "react";
import { Map as GisMap, Marker as GisMarker } from "@2gis/mapgl/types";

import Marker from "./Marker";
import style from "./MapPage.module.scss";
import PlacesApi from "../../api/2GisPlacesApi";
import { RootState } from "../../../redux/types";
import { useMapContext } from "../../../context/MapContext";

const MapContent = memo(() => {
  return <div id="map-container" className={style.map__content}></div>;
});

const MapPage = memo(() => {
  const mapRef = useRef<GisMap | null>(null);

  const { categoryToAdd, categoryToRemove } = useSelector(
    (state: RootState) => state.categories
  );
  const { markersDataCache, setMarkersDataCache } = useMapContext();
  const { city, zoom } = useSelector((state: RootState) => state.map);

  const api = new PlacesApi();
  const markerClass = new Marker();
  const API_KEY = "-";
  // const API_KEY = import.meta.env.VITE_2GIS_KEY;

  useEffect(() => {
    !mapRef.current
      ? initializeMap()
      : mapRef.current.setCenter([city.lon, city.lat]);

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [city.lon]);

  const setMarkers = useCallback(async () => {
    if (!categoryToAdd) return;

    const markers = getFromCache(categoryToAdd.id);

    if (markers && markers.length !== 0) {
      markers.forEach((marker) => marker.show());
    } else {
      const locations = await api.getCompaniesLocations(city, categoryToAdd);
      if (mapRef.current && locations) {
        const markers = await markerClass.getMarkers(mapRef.current, locations);
        setCache(categoryToAdd.id, markers);
      }
    }
  }, [categoryToAdd]);

  useEffect(() => {
    setMarkers();
  }, [setMarkers]);

  useEffect(() => {
    if (!categoryToRemove) return;
    const markers = getFromCache(categoryToRemove.id);
    markerClass.removeMarkers(markers!);
  }, [categoryToRemove]);

  const initializeMap = async () => {
    const mapglAPI = await load();

    mapRef.current = new mapglAPI.Map("map-container", {
      center: [city.lon, city.lat],
      zoom: zoom,
      key: API_KEY,
    });

    resizeMap(mapRef.current);
  };

  const resizeMap = (map: GisMap) => {
    map.getCanvas().style.width = map.getContainer().style.width = "100%";
    map.getCanvas().style.height = map.getContainer().style.height = "100%";

    map.invalidateSize();

    window.addEventListener("resize", () => {
      map.invalidateSize();
    });
  };

  const getFromCache = (categoryId: number) => {
    const cacheKey = JSON.stringify({ city, categoryId });
    return markersDataCache.get(cacheKey);
  };

  const setCache = (categoryId: number, data: GisMarker[]) => {
    const cacheKey = JSON.stringify({ city, categoryId });
    setMarkersDataCache((prevCache) => {
      return new Map(prevCache).set(cacheKey, data);
    });
  };

  return (
    <div className={style.map__wrapper}>
      <MapContent />
    </div>
  );
});

export default MapPage;

