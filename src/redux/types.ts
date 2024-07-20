import Category from "../utils/interfaces/Category";
import { CityIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryCity";
import { PlaceIdentifier } from "../utils/interfaces/OpenTripMapApi/QueryPlace";
import store from "./store";

export interface SearchState {
  city: CityIdentifier;
  allPlaces: PlaceIdentifier[];
  currentPlaces: PlaceIdentifier[];
  openedPlaceLink: string;
  currentPage: number;
  itemsPerPage: number;
}

export interface CategoriesState {
  allCategories: Category[];
  selectedCategories: Category[];
}

export type RootState = ReturnType<typeof store.getState>;

