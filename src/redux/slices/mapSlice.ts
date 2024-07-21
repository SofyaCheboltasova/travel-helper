import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoundingBox, MapState } from "../types";
import { CityIdentifier } from "../../utils/interfaces/OpenTripMapApi/QueryCity";

const centerLat = 55.7558;
const centerLon = 37.6176;
const radius = 250;

const latChange = radius / 111000;
const lonChange = radius / (111000 * Math.cos((centerLat * Math.PI) / 180));

const initialState: MapState = {
  city: { lon: centerLon, lat: centerLat, name: "Москва" },
  zoom: 15,
  boundingBox: {
    southWest: [centerLon - lonChange, centerLat - latChange],
    northEast: [centerLon + lonChange, centerLat + latChange],
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<CityIdentifier>) {
      state.city = action.payload;
    },
    setBoundingBox(state, action: PayloadAction<BoundingBox>) {
      state.boundingBox = action.payload;
    },
    setZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
    },
  },
});

export default mapSlice;

