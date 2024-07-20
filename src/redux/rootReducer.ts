import categoriesSlice from "./slices/categoriesSlice";
import searchSlice from "./slices/searchSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  search: searchSlice.reducer,
  categories: categoriesSlice.reducer,
});

export default rootReducer;

