import categoriesSlice from "./slices/categoriesSlice";
import mapSlice from "./slices/mapSlice";
import searchSlice from "./slices/searchSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  search: searchSlice.reducer,
  categories: categoriesSlice.reducer,
  map: mapSlice.reducer,
});

export default rootReducer;

