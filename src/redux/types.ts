import Category from "../utils/interfaces/Category";
import { CityIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryCity";
import { PlaceIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryPlace";
import store from "./store";

export interface SearchState {
  allPlaces: PlaceIdentifier[];
  currentPlaces: PlaceIdentifier[] | undefined;
  openedPlaceLink: string;
  currentPage: number;
  itemsPerPage: number;
}
export interface CategoriesState {
  allCategories: Category[];
  categoryToAdd: Category | null;
  categoryToRemove: Category | null;
}

export interface MapState {
  city: CityIdentifier;
  zoom: number;
}

export type RootState = ReturnType<typeof store.getState>;
