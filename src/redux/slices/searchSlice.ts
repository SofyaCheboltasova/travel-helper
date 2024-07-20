import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityIdentifier } from "../../utils/interfaces/OpenTripMapApi/QueryCity";
import SearchState from "../types";
import { PlaceIdentifier } from "../../utils/interfaces/OpenTripMapApi/QueryPlace";

const initialState: SearchState = {
  city: { lon: 37.6176, lat: 55.7558, name: "Москва" },
  allPlaces: [],
  currentPlaces: [],
  openedPlaceLink: "",
  currentPage: 0,
  itemsPerPage: 10,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<CityIdentifier>) {
      state.city = action.payload;
    },
    setPlaces(state, action: PayloadAction<PlaceIdentifier[]>) {
      state.allPlaces = action.payload;
      state.currentPage = 0;
      state.currentPlaces = state.allPlaces.slice(0, state.itemsPerPage);
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      const start = state.currentPage * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      state.currentPlaces = state.allPlaces.slice(start, end);
    },
    setOpenedPlace(state, action: PayloadAction<string>) {
      state.openedPlaceLink = action.payload;
    },
  },
});

export const { setCity } = searchSlice.actions;
export default searchSlice;

