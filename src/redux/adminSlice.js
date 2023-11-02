import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://usman78056-001-site7.gtempurl.com/api/";

//Get Count
export const dashboardCounts = createAsyncThunk(
  "admin/postIndex",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth?.userAuth?.data;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.get(`${baseUrl}Admin/PostIndex`, config);
      const data = response?.data?.data;
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const adminSlices = createSlice({
  name: "admin",
  initialState: {
    values: null,
    loading: false,
    appErr: null,
    serverErr: null,
  },
  extraReducers: (builder) => {
    //MiddleWare

    //dashboard
    builder.addCase(dashboardCounts.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(dashboardCounts.fulfilled, (state, action) => {
      state.values = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(dashboardCounts.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default adminSlices.reducer;
