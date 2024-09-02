import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthConfig } from "../../utils/_apiConfig";

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (users, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.post(
        `${baseUrl}User/NewRecord`,
        users,
        config
      );
      const responseBack = processApiResponse(
        response,
        dispatch,
        getState().authentication?.userAuth
      );
      if (response?.data?.isSuccess) {
        toast.success(response?.data?.message);
      }
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);

export const getUserRecords = createAsyncThunk(
  "user/getUserRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.post(
        `${baseUrl}User/GetAllRecords?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
        null,
        config
      );
      const responseBack = processApiResponse(
        response,
        dispatch,
        getState().authentication?.userAuth
      );
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    appErr: null,
    appStatus: null,
    appStatusCode: null,
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

export default userSlice.reducer;
