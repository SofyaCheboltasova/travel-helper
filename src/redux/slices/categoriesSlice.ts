import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState } from "../types";
import Category from "../../utils/interfaces/Category";
import { categories } from "../../assets/consts/consts";

const initialState: CategoriesState = {
  allCategories: categories,
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

    resetSelectedCategories: (state) => {
      state.allCategories = state.allCategories.map((category) => {
        return { ...category, isActive: false };
      });
    },

    resetCategoriesToAdd: (state) => {
      state.categoryToAdd = null;
    },

    resetCategoriesToRemove: (state) => {
      state.categoryToRemove = null;
    },
  },
});

export const { toggleCategory } = categoriesSlice.actions;
export default categoriesSlice;

