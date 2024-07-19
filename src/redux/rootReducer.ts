import searchSlice from "./slices/searchSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  search: searchSlice.reducer,
});

export default rootReducer;

