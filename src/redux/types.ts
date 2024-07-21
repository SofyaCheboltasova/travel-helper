import Category from "../utils/interfaces/Category";
import { CityIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryCity";
import { PlaceIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryPlace";
import store from "./store";

export interface SearchState {
  allPlaces: PlaceIdentifier[];
  currentPlaces: PlaceIdentifier[];
  openedPlaceLink: string;
  currentPage: number;
  itemsPerPage: number;
}
export interface CategoriesState {
  allCategories: Category[];
  selectedCategoriesIds: number[];
}

export interface MapState {
  city: CityIdentifier;
  zoom: number;
  boundingBox: BoundingBox;
}

export interface BoundingBox {
  southWest: number[];
  northEast: number[];
}

export type RootState = ReturnType<typeof store.getState>;

