import { load } from "@2gis/mapgl";
import { Map } from "@2gis/mapgl/types";
import { memo, useEffect } from "react";

import style from "./Map.module.scss";

const MapWrapper = memo(() => {
  return <div id="map-container" className={style.mapWrapper}></div>;
});

export default function MapComponent() {
  // const API_KEY = "32638050-486e-4b6c-8a1a-600e7fd4b48d";
  const API_KEY = "-";

  useEffect(() => {
    let map: Map;

    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map-container", {
        center: [55.31878, 25.23584],
        zoom: 13,
        key: API_KEY,
      });
    });

    return () => map && map.destroy();
  }, []);

  return (
    <div className={style.map}>
      <MapWrapper />
    </div>
  );
}

