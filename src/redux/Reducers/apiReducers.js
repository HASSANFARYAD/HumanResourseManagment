import { createSlice } from "@reduxjs/toolkit";
import { deleteRecord, getDropdowns } from "../Actions/apiActions";
import {
  addUpdateCategory,
  getCategoriesRecords,
} from "../Actions/categoryAction";
import { addUpdateBrand, getRecords } from "../Actions/brandActions";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: false,
    appStatus: null,
    serverErr: null,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.serverErr = undefined;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, { payload }) => {
          state.message = payload?.message;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.loading = false;
          state.serverErr = payload?.message || "Something went wrong";
        }
      );
  },
});

export default apiSlice.reducer;
