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
  selectedCategoriesIds: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<Category>) {
      const categoryId = state.allCategories.findIndex(
        (c) => c.id === action.payload.id
      );
      if (categoryId === -1) return;

      const category = state.allCategories[categoryId];
      state.allCategories[categoryId] = {
        ...category,
        isActive: !category.isActive,
      };

      const wasSelected = state.selectedCategoriesIds.findIndex(
        (i) => i === categoryId
      );
      if (wasSelected === -1) {
        state.selectedCategoriesIds.push(categoryId);
      } else {
        state.selectedCategoriesIds = state.selectedCategoriesIds.filter(
          (c) => c !== categoryId
        );
      }
    },
  },
});

export const { toggleCategory } = categoriesSlice.actions;
export default categoriesSlice;

