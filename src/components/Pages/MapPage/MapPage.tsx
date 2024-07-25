import { useSelector } from "react-redux";
import { memo, useCallback, useEffect, useRef } from "react";
import { Map as GisMap, Marker as GisMarker } from "@2gis/mapgl/types";

import Marker, { CompanyData } from "./Marker";
import style from "./MapPage.module.scss";
import PlacesApi from "../../api/2GisPlacesApi";
import { RootState } from "../../../redux/types";
import { useMapContext } from "../../../context/MapContext";
import { load } from "@2gis/mapgl";

const MapContent = memo(() => {
  return <div id="map-container" className={style.map__content}></div>;
});

const MapPage = memo(() => {
  const { markersDataCache, setMarkersDataCache } = useMapContext();
  const { city, zoom } = useSelector((state: RootState) => state.map);
  const { categoryToAdd, categoryToRemove } = useSelector(
    (state: RootState) => state.categories
  );

  const mapRef = useRef<GisMap>();

  const api = new PlacesApi();
  const markerClass = new Marker();
  const API_KEY = import.meta.env.VITE_2GIS_KEY;
  const MAP_STYLE_ID = "1b42a0a1-e85f-45c2-8d7b-693baf76490f";

  useEffect(() => {
    if (!mapRef.current) {
      initializeMap();
    } else {
      setMapLocation();
    }
    mapRef.current && resizeMap(mapRef.current);
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
  }, [categoryToAdd]);

  useEffect(() => {
    setMarkers();
  }, [setMarkers]);

  useEffect(() => {
    if (!categoryToRemove) return;
    const markers = getMarkersFromCache(categoryToRemove.id);
    markerClass.removeMarkers(markers!);
  }, [categoryToRemove]);

  const initializeMap = async () => {
    const mapglAPI = await load();
    mapRef.current = new mapglAPI.Map("map-container", {
      center: [city.lon, city.lat],
      zoom: zoom,
      key: API_KEY,
      style: MAP_STYLE_ID, // custom style for faster loading
      disableRotationByUserInteraction: true,
      disablePitchByUserInteraction: true,
      trafficControl: false,
      floorControl: false,
    });
  };

  const resizeMap = (map: GisMap) => {
    map.getCanvas().style.width = map.getContainer().style.width = "100%";
    map.getCanvas().style.height = map.getContainer().style.height = "100%";

    map.invalidateSize();

    window.addEventListener("resize", () => {
      map.invalidateSize();
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
    console.error(marker);
  };

  return (
    <div className={style.map__wrapper}>
      <MapContent />
    </div>
  );
});

export default MapPage;

