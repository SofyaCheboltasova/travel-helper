import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapState } from "../types";
import { CityIdentifier } from "../../utils/interfaces/OpenTripMapApi/QueryCity";

const centerLat = 55.7558;
const centerLon = 37.6176;

const initialState: MapState = {
  city: { lon: centerLon, lat: centerLat, name: "Москва" },
  zoom: 15,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<CityIdentifier>) {
      state.city = action.payload;
    },
  },
});

export default mapSlice;

