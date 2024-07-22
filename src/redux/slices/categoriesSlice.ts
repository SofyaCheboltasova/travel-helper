import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CategoryEnum from "../../utils/enums/CategoryEnum";
import { CategoriesState } from "../types";
import Category from "../../utils/interfaces/Category";

const initialState: CategoriesState = {
  allCategories: [
    { id: 1, name: CategoryEnum.Museums, isActive: false },
    { id: 2, name: CategoryEnum.Entertainment, isActive: false },
    { id: 3, name: CategoryEnum.Tours, isActive: false },
    { id: 4, name: CategoryEnum.Monuments, isActive: false },
    { id: 5, name: CategoryEnum.Viewpoints, isActive: false },
  ],
  categoryToAdd: null,
  categoryToRemove: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<Category>) {
      state.allCategories = state.allCategories.map((category) => {
        return category.id === action.payload.id
          ? {
              ...category,
              isActive: !category.isActive,
            }
          : category;
      });

      !action.payload.isActive
        ? (state.categoryToAdd = action.payload)
        : (state.categoryToRemove = action.payload);
    },
  },
});

export const { toggleCategory } = categoriesSlice.actions;
export default categoriesSlice;

