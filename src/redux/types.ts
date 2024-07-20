import { CityIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryCity";
import { PlaceIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryPlace";
import store from "./store";

export default interface SearchState {
  city: CityIdentifier;
  allPlaces: PlaceIdentifier[];
  currentPlaces: PlaceIdentifier[];
  currentPage: number;
  itemsPerPage: number;
}

export type RootState = ReturnType<typeof store.getState>;

