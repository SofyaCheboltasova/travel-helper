import { load } from "@2gis/mapgl";
import { Map, Marker } from "@2gis/mapgl/types";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useRef } from "react";

import style from "./MapPage.module.scss";
import { RootState } from "../../../redux/types";
import mapSlice from "../../../redux/slices/mapSlice";
import { Coordinates } from "../../../utils/interfaces/OpenTripMapApi/QueryCity";
// import Category from "../../../utils/interfaces/Category";
import categoriesSlice from "../../../redux/slices/categoriesSlice";
import PlacesApi from "../../api/2GisPlacesApi";

const MapContent = memo(() => {
  return <div id="map-container" className={style.map__content}></div>;
});

const MapPage = memo(() => {
  const dispatch = useDispatch();
  const { city, zoom, boundingBox } = useSelector(
    (state: RootState) => state.map
  );
  const mapRef = useRef<Map | null>(null);
  // const [previousZoom, setPreviousZoom] = useState<number>(zoom);

  const { categoriesToAdd, categoriesToRemove } = useSelector(
    (state: RootState) => state.categories
  );

  const api = new PlacesApi();

  const API_KEY = "-";
  // const API_KEY = import.meta.env.VITE_2GIS_KEY;

  /**
   * Init 2Gis Map
   */
  useEffect(() => {
    const initializeMap = async () => {
      const mapglAPI = await load();

      mapRef.current = new mapglAPI.Map("map-container", {
        center: [city.lon, city.lat],
        zoom: zoom,
        key: API_KEY,
      });

      resizeMap(mapRef.current);
      updateBoundingBox();
      mapRef.current.on("zoomend", handleZoomChange);
      mapRef.current.on("moveend", handleMoveChange);
    };

    if (!mapRef.current) {
      initializeMap();
    } else {
      mapRef.current.setCenter([city.lon, city.lat]);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [city.lon]);

  useEffect(() => {
    if (categoriesToAdd.length === 0) return;

    async function getCompaniesInCategory() {
      const locations: Coordinates[] | undefined =
        await api.getCompaniesLocations(
          city.name,
          categoriesToAdd,
          boundingBox
        );

      if (locations)
        locations.forEach((location: Coordinates) => {
          addMarker(location);
        });

      dispatch(categoriesSlice.actions.resetCategoriesToAdd());
    }

    getCompaniesInCategory();
  }, [categoriesToAdd]);

  /**
   * Remove new categories on Map
   */
  useEffect(() => {
    if (categoriesToRemove.length === 0) return;

    dispatch(categoriesSlice.actions.resetCategoriesToRemove());
  }, [categoriesToRemove]);

  const resizeMap = (
    map: Map,
    width: string = "100%",
    height: string = "100%"
  ) => {
    const mapCanvas = map.getCanvas();
    const mapContainer = map.getContainer();

    mapCanvas.style.width = width;
    mapCanvas.style.height = height;
    mapContainer.style.width = width;
    mapContainer.style.height = height;

    map.invalidateSize();

    window.addEventListener("resize", () => {
      map.invalidateSize();
    });
  };

  const handleMoveChange = () => {
    updateBoundingBox();
  };

  const handleZoomChange = () => {
    updateZoom();
    updateBoundingBox();
  };

  const updateBoundingBox = () => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();

      const serializedBounds = {
        southWest: [...bounds.southWest],
        northEast: [...bounds.northEast],
      };

      dispatch(mapSlice.actions.setBoundingBox(serializedBounds));
    }
  };

  const updateZoom = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      // setPreviousZoom(newZoom);
      dispatch(mapSlice.actions.setZoom(newZoom));
    }
  };

  /**
   * Called when:
   * - Category added
   * - Zoom out
   * - Map moved
   */
  const addMarker = async (coords: Coordinates) => {
    if (!mapRef.current) return;
    const mapglAPI = await load();
    const marker = new mapglAPI.Marker(mapRef.current, {
      coordinates: [coords.lon, coords.lat],
    });

    marker.show();
  };

  /**
   * Called when:
   * - Category removed
   * - Zoom in
   * - Map moved
   */

  // const removeMarkers = (category: Category[]) => {
  //   if (mapRef.current && mapRef.current.getZoom() < previousZoom) {
  //   }
  //   category.forEach((category) => {});
  // };

  return (
    <div className={style.map__wrapper}>
      <MapContent />
    </div>
  );
});

export default MapPage;

/*
TODO: 
- Строка поиска
- Определение местоположения - https://docs.2gis.com/ru/mapgl/examples/layers/geolocation
- Кнопка сохранить:
	- Модалка: название

МЕТКИ:
- Добавление метки: 
	- Изменение значка
	- Добавление названия
	- Добавление note
	- Сохранение меток

- Карта на всю ширину экрана

*/

