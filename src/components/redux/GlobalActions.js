import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError, getResponse } from "../Handler/ExceptionHandler";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_API_URL;

//#region Global-API's
export const getById = createAsyncThunk(
  "user/getById",
  async (endPoint, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.authentication?.userAuth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${users?.token}`,
      },
    };

    try {
      const response = await axios.get(`${baseUrl}${endPoint}`, config);
      const responseBack = getResponse(response, dispatch, users);
      return responseBack;
    } catch (error) {
      handleApiError(error?.response?.data, dispatch, users);
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "user/deleteRecord",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.authentication?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${users?.token}`,
      },
    };

    try {
      const url = baseUrl + endpoint;
      const response = await axios.delete(url, config);
      const responseBack = getResponse(response, dispatch, users);
      if (responseBack.status) {
        toast.success(responseBack.message);
      }
    } catch (error) {
      handleApiError(error?.response?.data, dispatch, users);
    }
  }
);

export const generateSalarySlip = createAsyncThunk(
  "user/generateSalarySlip",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.authentication?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${users?.token}`,
      },
    };

    try {
      const url = `${baseUrl}Admin/PostAddSalarySlips`;
      const response = await axios.post(url, null, config);
      const responseBack = getResponse(response, dispatch, users);
      if (responseBack.status) {
        toast.success(responseBack.message);
        return true;
      }
    } catch (error) {
      handleApiError(error?.response?.data, dispatch, users);
    }
  }
);

export const downloadSalarySlip = createAsyncThunk(
  "user/downloadSalarySlip",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.authentication?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${users?.token}`,
      },
    };

    try {
      const url = `${baseUrl}Reports/sendPaySlip?slipId=${id}`;
      const response = await axios.get(url, config);
      const responseBack = getResponse(response, dispatch, users);
      if (responseBack.status) {
        toast.success(responseBack.message);
        return true;
      }
    } catch (error) {
      handleApiError(error?.response?.data, dispatch, users);
    }
  }
);
//#endregion

const globalActions = createSlice({
  name: "globalActions",
  initialState: {
    loading: false,
    appErr: null,
    appStatus: null,
    appStatusCode: null,
    serverErr: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getById.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.appStatus = undefined;
      state.appStatusCode = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.appStatus = false;
      state.appStatusCode = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getById.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
      state.serverErr = undefined;
    });

    builder.addCase(deleteRecord.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.appStatus = undefined;
      state.appStatusCode = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.appStatus = false;
      state.appStatusCode = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteRecord.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
      state.serverErr = undefined;
    });

    builder.addCase(generateSalarySlip.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.appStatus = undefined;
      state.appStatusCode = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(generateSalarySlip.fulfilled, (state, action) => {
      state.loading = false;
      state.appErr = undefined;
      state.appStatus = false;
      state.appStatusCode = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(generateSalarySlip.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
      state.serverErr = undefined;
    });
  },
});

export default globalActions.reducer;
