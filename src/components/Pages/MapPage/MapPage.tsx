import { load } from "@2gis/mapgl";
import { Map } from "@2gis/mapgl/types";
import { memo, useEffect } from "react";

import style from "./MapPage.module.scss";

const MapWrapper = memo(() => {
  return <div id="map-container" className={style.map}></div>;
});

/*
TODO: 
- Строка поиска
- Определение местоположения
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
export default function MapPage() {
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

