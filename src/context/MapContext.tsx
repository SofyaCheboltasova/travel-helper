import React, { createContext, useContext, useState, ReactNode } from "react";
import { Marker } from "@2gis/mapgl/types";

type MapCacheType = Map<string, Marker[] | undefined>;

interface MapCacheContext {
  markersDataCache: MapCacheType;
  setMarkersDataCache: React.Dispatch<React.SetStateAction<MapCacheType>>;
}

const MapContext = createContext<MapCacheContext | null>(null);

export function MapProvider({ children }: { children: ReactNode }) {
  const [markersDataCache, setMarkersDataCache] = useState<MapCacheType>(
    new Map()
  );

  return (
    <MapContext.Provider value={{ markersDataCache, setMarkersDataCache }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext(): MapCacheContext {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext должен использоваться внутри MapProvider");
  }
  return context;
}

