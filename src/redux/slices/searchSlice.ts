import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates } from "../../utils/interfaces/OpenTripMapApi/QueryCity";

const initialState: Coordinates = { lon: 37.6176, lat: 55.7558 };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<Coordinates>) {
      state.lon = action.payload.lon;
      state.lat = action.payload.lat;
    },
  },
});

export const { setCity } = searchSlice.actions;
export default searchSlice;

