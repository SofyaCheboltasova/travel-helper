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
  categoriesToAdd: [],
  categoriesToRemove: [],
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

      state.allCategories.forEach((c) => {
        if (c.isActive && !state.categoriesToAdd.includes(c)) {
          state.categoriesToAdd.push(c);
        }

        if (!c.isActive && !state.categoriesToRemove.includes(c)) {
          state.categoriesToRemove.push(c);
        }
      });
    },
    resetCategoriesToAdd(state) {
      state.categoriesToAdd = [];
    },
    resetCategoriesToRemove(state) {
      state.categoriesToRemove = [];
    },
  },
});

export const { toggleCategory } = categoriesSlice.actions;
export default categoriesSlice;

